/**
 * Estabizz Jobs — Resume Processing Orchestration V1 synthetic test suite.
 *
 * Zero live calls: no QStash messages, no OpenAI calls, no real DB writes.
 * Tests the orchestration logic using fake/stub implementations.
 */

import assert from "node:assert/strict";

// ─── Fake primitives ─────────────────────────────────────────────────────────

const FAKE_CANDIDATE_ID = "00000000-0000-0000-0000-000000000001";
const FAKE_RESUME_VERSION_ID = "00000000-0000-0000-0000-000000000002";
const FAKE_ACTOR_REF_ID = "00000000-0000-0000-0000-000000000004";

// ─── 1. Security gate ─────────────────────────────────────────────────────────

function checkResumeProcessingGate(metadata, config) {
  if (!config.malwareScanningRequired) {
    if (metadata.malwareScanStatus === "infected") {
      return { eligible: false, eligibility: "infected", retryable: false, reason: "Resume document was flagged as infected." };
    }
    return { eligible: true, eligibility: "eligible", retryable: false, reason: "" };
  }

  switch (metadata.malwareScanStatus) {
    case "clean":
    case "skipped":
      return { eligible: true, eligibility: "eligible", retryable: false, reason: "" };
    case "pending":
      return { eligible: false, eligibility: "awaiting_scan", retryable: true, reason: "Resume document is awaiting security scan." };
    case "infected":
      return { eligible: false, eligibility: "infected", retryable: false, reason: "Resume document was flagged as infected." };
    case "failed":
      return { eligible: false, eligibility: "scan_failed", retryable: false, reason: "Resume document security scan failed." };
    default:
      return { eligible: false, eligibility: "awaiting_scan", retryable: true, reason: "Resume document security scan status is unknown." };
  }
}

// ─── 2. Queue idempotency key ─────────────────────────────────────────────────

function createJobsQueueIdempotencyKey({ jobType, entityId, correlationId }) {
  return [jobType, entityId || "none", correlationId]
    .map((part) => part.replace(/[^A-Za-z0-9_.-]/g, "-"))
    .join("-");
}

// ─── 3. OCR detection helper ──────────────────────────────────────────────────

function deriveResumeParseStatus(status, errorDetail) {
  if (!status) return null;
  if (status === "failed" && errorDetail && errorDetail.toLowerCase().includes("ocr_required")) {
    return "ocr_required";
  }
  if (["pending", "processing", "completed", "failed"].includes(status)) return status;
  return null;
}

// ─── 4. Dispatch input validation ────────────────────────────────────────────

function validateDispatchInput(input) {
  const errors = [];
  if (!input.resumeVersionId || !/^[0-9a-f-]{36}$/.test(input.resumeVersionId)) {
    errors.push("resumeVersionId must be a valid UUID");
  }
  if (!input.candidateId || !/^[0-9a-f-]{36}$/.test(input.candidateId)) {
    errors.push("candidateId must be a valid UUID");
  }
  if (!input.actorRefId || !/^[0-9a-f-]{36}$/.test(input.actorRefId)) {
    errors.push("actorRefId must be a valid UUID");
  }
  return errors;
}

// ─── Test assertions ──────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓  ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗  ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

console.log("\nEstabizz Jobs — Resume Parse Orchestration V1 Test Suite\n");

// ─── Security gate tests ──────────────────────────────────────────────────────

console.log("Security gate:");

test("eligible when malware scanning disabled and status=pending", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "pending" },
    { malwareScanningRequired: false },
  );
  assert.equal(result.eligible, true);
});

test("eligible when malware scanning disabled and status=skipped", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "skipped" },
    { malwareScanningRequired: false },
  );
  assert.equal(result.eligible, true);
});

test("blocked when malware scanning disabled but status=infected", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "infected" },
    { malwareScanningRequired: false },
  );
  assert.equal(result.eligible, false);
  assert.equal(result.retryable, false);
  assert.equal(result.eligibility, "infected");
});

test("eligible when scanning required and status=clean", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "clean" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, true);
});

test("eligible when scanning required and status=skipped", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "skipped" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, true);
});

test("retryable awaiting_scan when scanning required and status=pending", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "pending" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, false);
  assert.equal(result.retryable, true);
  assert.equal(result.eligibility, "awaiting_scan");
});

test("permanent block when scanning required and status=infected", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "infected" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, false);
  assert.equal(result.retryable, false);
  assert.equal(result.eligibility, "infected");
});

test("permanent block when scanning required and status=failed", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "failed" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, false);
  assert.equal(result.retryable, false);
  assert.equal(result.eligibility, "scan_failed");
});

test("retryable awaiting_scan for unknown malware status", () => {
  const result = checkResumeProcessingGate(
    { malwareScanStatus: "unknown_value" },
    { malwareScanningRequired: true },
  );
  assert.equal(result.eligible, false);
  assert.equal(result.retryable, true);
});

// ─── Dispatch idempotency key tests ───────────────────────────────────────────

console.log("\nDispatch idempotency key:");

test("key is deterministic for same inputs", () => {
  const correlationId = "corr-1234";
  const key1 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId });
  const key2 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId });
  assert.equal(key1, key2);
});

test("key differs for different resumeVersionId", () => {
  const correlationId = "corr-1234";
  const key1 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId });
  const key2 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: "00000000-0000-0000-0000-000000000099", correlationId });
  assert.notEqual(key1, key2);
});

test("key differs for different correlationId", () => {
  const key1 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId: "corr-A" });
  const key2 = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId: "corr-B" });
  assert.notEqual(key1, key2);
});

test("key includes jobType prefix", () => {
  const key = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: FAKE_RESUME_VERSION_ID, correlationId: "c1" });
  assert.ok(key.startsWith("RESUME_PARSE-"));
});

test("key sanitises special characters", () => {
  const key = createJobsQueueIdempotencyKey({ jobType: "RESUME_PARSE", entityId: "id/with/slashes", correlationId: "corr:colon" });
  assert.ok(!key.includes("/"));
  assert.ok(!key.includes(":"));
});

// ─── Dispatch input validation ────────────────────────────────────────────────

console.log("\nDispatch input validation:");

test("valid input passes validation", () => {
  const errors = validateDispatchInput({
    resumeVersionId: FAKE_RESUME_VERSION_ID,
    candidateId: FAKE_CANDIDATE_ID,
    actorRefId: FAKE_ACTOR_REF_ID,
  });
  assert.equal(errors.length, 0);
});

test("invalid resumeVersionId fails validation", () => {
  const errors = validateDispatchInput({
    resumeVersionId: "not-a-uuid",
    candidateId: FAKE_CANDIDATE_ID,
    actorRefId: FAKE_ACTOR_REF_ID,
  });
  assert.ok(errors.some((e) => e.includes("resumeVersionId")));
});

test("missing candidateId fails validation", () => {
  const errors = validateDispatchInput({
    resumeVersionId: FAKE_RESUME_VERSION_ID,
    candidateId: "",
    actorRefId: FAKE_ACTOR_REF_ID,
  });
  assert.ok(errors.some((e) => e.includes("candidateId")));
});

// ─── OCR detection tests ──────────────────────────────────────────────────────

console.log("\nOCR status derivation:");

test("failed + ocr_required error detail → ocr_required status", () => {
  const status = deriveResumeParseStatus("failed", "Resume text extraction returned ocr_required.");
  assert.equal(status, "ocr_required");
});

test("failed + other error detail → failed status", () => {
  const status = deriveResumeParseStatus("failed", "Resume document was not found in private storage.");
  assert.equal(status, "failed");
});

test("failed + null error detail → failed status", () => {
  const status = deriveResumeParseStatus("failed", null);
  assert.equal(status, "failed");
});

test("completed status passes through unchanged", () => {
  const status = deriveResumeParseStatus("completed", null);
  assert.equal(status, "completed");
});

test("processing status passes through unchanged", () => {
  const status = deriveResumeParseStatus("processing", null);
  assert.equal(status, "processing");
});

test("null status returns null", () => {
  const status = deriveResumeParseStatus(null, null);
  assert.equal(status, null);
});

test("unknown status returns null", () => {
  const status = deriveResumeParseStatus("unknown_value", null);
  assert.equal(status, null);
});

// ─── Worker envelope validation stubs ────────────────────────────────────────

console.log("\nWorker envelope contract:");

function validateResumeParseEnvelope(envelope) {
  const errors = [];
  if (envelope.jobType !== "RESUME_PARSE") errors.push("jobType must be RESUME_PARSE");
  if (!envelope.payload?.resumeVersionId) errors.push("payload.resumeVersionId required");
  if (!envelope.payload?.candidateId) errors.push("payload.candidateId required");
  if (!envelope.correlationId) errors.push("correlationId required");
  if (!envelope.environment) errors.push("environment required");
  return errors;
}

test("valid RESUME_PARSE envelope passes validation", () => {
  const errors = validateResumeParseEnvelope({
    jobType: "RESUME_PARSE",
    jobId: "job-1",
    idempotencyKey: "key-1",
    attempt: { attempt: 1, maxAttempts: 4 },
    requestedBy: { type: "system", id: FAKE_ACTOR_REF_ID },
    createdAt: new Date().toISOString(),
    payload: { resumeVersionId: FAKE_RESUME_VERSION_ID, candidateId: FAKE_CANDIDATE_ID },
    correlationId: "corr-1",
    environment: "development",
  });
  assert.equal(errors.length, 0);
});

test("envelope with wrong jobType fails validation", () => {
  const errors = validateResumeParseEnvelope({
    jobType: "SEND_EMAIL",
    payload: { resumeVersionId: FAKE_RESUME_VERSION_ID, candidateId: FAKE_CANDIDATE_ID },
    correlationId: "c1",
    environment: "development",
  });
  assert.ok(errors.some((e) => e.includes("jobType")));
});

test("envelope missing resumeVersionId fails validation", () => {
  const errors = validateResumeParseEnvelope({
    jobType: "RESUME_PARSE",
    payload: { candidateId: FAKE_CANDIDATE_ID },
    correlationId: "c1",
    environment: "development",
  });
  assert.ok(errors.some((e) => e.includes("resumeVersionId")));
});

// ─── Result ───────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
