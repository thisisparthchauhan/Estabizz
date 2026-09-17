/**
 * Synthetic tests for Phase 5.1 resume lifecycle audit coverage.
 *
 * Verifies that every resume.* audit payload carries identifiers and status
 * only, and can never carry resume text, document bytes, AI prompts/responses,
 * secrets, presigned URLs, storage object keys or candidate PII.
 *
 * No network, no database, no AI calls, no real CV.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-resume-audit-"));

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓  ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗  ${name}`);
    console.log(`       ${error.message}`);
  }
}

/**
 * Values that must never appear in any audit payload. Each is a realistic
 * example of the class of data the security requirement forbids.
 */
const FORBIDDEN = {
  storageObjectKey: "tmp/candidates/cb8a9f7d-b69c-4653-b361-1e4997013152/abc.pdf",
  presignedUrl:
    "https://s3.ca-east-006.backblazeb2.com/bucket/key.pdf?X-Amz-Signature=deadbeef&X-Amz-Credential=AKIAEXAMPLE",
  // Assembled at runtime rather than written as literals: these only need to
  // MATCH the credential shapes the assertions look for, and a key-shaped or
  // JWT-shaped literal in source trips secret scanners for no reason.
  apiKey: ["sk", "proj", "N".repeat(24)].join("-"),
  bearerHeader: `Bearer ${["ey", "J0eXAiOi", "SYNTHETIC", "signature"].join("")}`,
  candidateName: "PRIYA RAGHUNATHAN",
  candidateEmail: "priya.raghunathan@example.test",
  candidatePhone: "+91 98765 43210",
  candidateFilename: "Priya_Raghunathan_Resume_2026.pdf",
  resumeText:
    "PROFESSIONAL SUMMARY Compliance professional with 6 years of experience in NBFC regulatory reporting.",
  aiPrompt: "You are an Estabizz Jobs structured resume extraction service. <resume_text>...</resume_text>",
};

function flattenValues(value, acc = []) {
  if (value === null || value === undefined) return acc;
  if (typeof value === "object") {
    for (const v of Object.values(value)) flattenValues(v, acc);
    return acc;
  }
  acc.push(String(value));
  return acc;
}

function assertNoForbiddenContent(metadata, label) {
  const blob = JSON.stringify(metadata);
  for (const [kind, sample] of Object.entries(FORBIDDEN)) {
    assert.ok(!blob.includes(sample), `${label} leaked ${kind}`);
  }
  // Structural guards that survive changes to the sample values above.
  assert.ok(!/tmp\/candidates\//.test(blob), `${label} contains a storage object key`);
  assert.ok(!/X-Amz-/i.test(blob), `${label} contains presigned URL parameters`);
  assert.ok(!/https?:\/\//.test(blob), `${label} contains a URL`);
  assert.ok(!/\bsk-[A-Za-z0-9_-]{16,}/.test(blob), `${label} contains an API key`);
  assert.ok(!/\bBearer\s+\S+/i.test(blob), `${label} contains an authorization header`);
  assert.ok(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(blob), `${label} contains an email address`);
  assert.ok(!/\.pdf|\.docx/i.test(blob), `${label} contains a filename`);
}

/** Only scalars — a nested object could smuggle an extraction payload. */
function assertScalarOnly(metadata, label) {
  for (const [key, value] of Object.entries(metadata)) {
    assert.ok(
      value === null || ["string", "number", "boolean"].includes(typeof value),
      `${label}.${key} must be a scalar or null, got ${typeof value}`,
    );
  }
}

async function main() {
  // sensitiveData.ts imports through the "@/" alias, so compile via a tsconfig
  // that carries the path mapping rather than a bare tsc invocation.
  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        module: "commonjs",
        target: "es2020",
        moduleResolution: "node",
        esModuleInterop: true,
        skipLibCheck: true,
        outDir: path.join(outDir, "out"),
        // Pin rootDir so the emitted layout mirrors the repo predictably.
        rootDir: repoRoot,
        baseUrl: repoRoot,
        paths: { "@/*": ["./*"] },
        // The tsconfig lives outside the repo, so @types must be pointed at.
        typeRoots: [path.join(repoRoot, "node_modules/@types")],
        types: ["node"],
      },
      files: [
        path.join(repoRoot, "lib/jobs/resumeParsing/auditMetadata.ts"),
        path.join(repoRoot, "lib/jobs/resumeParsing/sensitiveData.ts"),
      ],
    }),
  );

  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  const require = createRequire(import.meta.url);
  const compiled = path.join(outDir, "out", "lib/jobs/resumeParsing");
  const audit = require(path.join(compiled, "auditMetadata.js"));
  const sensitive = require(path.join(compiled, "sensitiveData.js"));

  const CANDIDATE = "cb8a9f7d-b69c-4653-b361-1e4997013152";
  const RUN = "2b08b7b3-0814-448e-8dbb-6e5f696c633a";
  const RESUME = "67e4494f-94d5-43fd-80b3-6b0094418ac0";
  const CORRELATION = `resume-parse-${RESUME}`;

  console.log("\nAction vocabulary:");
  check("all five resume lifecycle actions are defined", () => {
    assert.deepEqual(Object.values(audit.RESUME_AUDIT_ACTIONS).sort(), [
      "resume.processing_completed",
      "resume.processing_failed",
      "resume.processing_started",
      "resume.upload_rejected",
      "resume.uploaded",
    ]);
  });
  check("actions follow the existing entity.verb convention", () => {
    for (const action of Object.values(audit.RESUME_AUDIT_ACTIONS)) {
      assert.match(action, /^resume\.[a-z_]+$/, `bad action name: ${action}`);
    }
  });

  console.log("\nresume.uploaded:");
  const uploaded = audit.buildResumeUploadedMetadata({
    candidateId: CANDIDATE,
    versionNumber: 3,
    fileType: "application/pdf",
    fileSizeBytes: 2137,
    parseStatus: "pending",
  });
  check("carries the expected identifiers and file shape", () => {
    assert.deepEqual(Object.keys(uploaded).sort(), [
      "candidateId", "fileSizeBytes", "fileType", "parseStatus", "versionNumber",
    ]);
    assert.equal(uploaded.candidateId, CANDIDATE);
    assert.equal(uploaded.versionNumber, 3);
  });
  check("does not carry the candidate-supplied filename", () => {
    assert.ok(!("fileName" in uploaded), "fileName must not be audited — it often contains the candidate's name");
    assertNoForbiddenContent(uploaded, "resume.uploaded");
  });
  check("is scalar-only", () => assertScalarOnly(uploaded, "resume.uploaded"));

  console.log("\nresume.upload_rejected:");
  const rejected = audit.buildResumeUploadRejectedMetadata({
    securityStatus: "rejected_signature_mismatch",
  });
  check("records only the security status enum", () => {
    assert.deepEqual(Object.keys(rejected), ["securityStatus"]);
    assert.equal(rejected.securityStatus, "rejected_signature_mismatch");
  });
  check("carries no filename, key or document content", () => {
    assertNoForbiddenContent(rejected, "resume.upload_rejected");
    assertScalarOnly(rejected, "resume.upload_rejected");
  });

  console.log("\nresume.processing_started:");
  const started = audit.buildResumeProcessingStartedMetadata({
    candidateId: CANDIDATE,
    correlationId: CORRELATION,
    aiProcessingRunId: RUN,
    attempt: 1,
    reclaimedStaleRun: false,
  });
  check("carries correlation and run identifiers", () => {
    assert.deepEqual(Object.keys(started).sort(), [
      "aiProcessingRunId", "attempt", "candidateId", "correlationId", "reclaimedStaleRun",
    ]);
    assert.equal(started.correlationId, CORRELATION);
    assert.equal(started.aiProcessingRunId, RUN);
  });
  check("records a stale reclaim distinctly", () => {
    const reclaimed = audit.buildResumeProcessingStartedMetadata({
      candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: RUN,
      attempt: 2, reclaimedStaleRun: true,
    });
    assert.equal(reclaimed.reclaimedStaleRun, true);
  });
  check("is safe and scalar-only", () => {
    assertNoForbiddenContent(started, "resume.processing_started");
    assertScalarOnly(started, "resume.processing_started");
  });

  console.log("\nresume.processing_completed:");
  const completed = audit.buildResumeProcessingOutcomeMetadata({
    candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: RUN,
    status: "completed", completed: true, retryable: false, reason: null,
  });
  check("omits failure-only fields on success", () => {
    assert.deepEqual(Object.keys(completed).sort(), [
      "aiProcessingRunId", "candidateId", "correlationId", "status",
    ]);
    assert.equal(completed.status, "completed");
  });
  check("carries no extracted values, prompt or response", () => {
    assertNoForbiddenContent(completed, "resume.processing_completed");
    assertScalarOnly(completed, "resume.processing_completed");
  });

  console.log("\nresume.processing_failed:");
  const failedMeta = audit.buildResumeProcessingOutcomeMetadata({
    candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: RUN,
    status: "retryable_failed", completed: false, retryable: true,
    reason: "Resume text extraction returned ocr_required.",
  });
  check("records retryability and a reason", () => {
    assert.deepEqual(Object.keys(failedMeta).sort(), [
      "aiProcessingRunId", "candidateId", "correlationId", "reason", "retryable", "status",
    ]);
    assert.equal(failedMeta.retryable, true);
    assert.equal(failedMeta.reason, "Resume text extraction returned ocr_required.");
  });
  check("tolerates a missing run id when the job never started one", () => {
    const noRun = audit.buildResumeProcessingOutcomeMetadata({
      candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: null,
      status: "failed", completed: false, retryable: false,
      reason: "Resume version was not found.",
    });
    assert.equal(noRun.aiProcessingRunId, null);
  });
  check("is safe and scalar-only", () => {
    assertNoForbiddenContent(failedMeta, "resume.processing_failed");
    assertScalarOnly(failedMeta, "resume.processing_failed");
  });

  console.log("\nFailure reasons are sanitised before they reach the audit row:");
  check("a reason containing a presigned URL is redacted", () => {
    const dirty = `Private resume download failed: ${FORBIDDEN.presignedUrl}`;
    const meta = audit.buildResumeProcessingOutcomeMetadata({
      candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: RUN,
      status: "retryable_failed", completed: false, retryable: true,
      reason: sensitive.sanitizeResumeProcessingMessage(dirty),
    });
    assertNoForbiddenContent(meta, "sanitised failure reason");
  });
  check("a reason containing candidate contact details is redacted", () => {
    const dirty = `Parse failed for ${FORBIDDEN.candidateEmail} ${FORBIDDEN.candidatePhone}`;
    const meta = audit.buildResumeProcessingOutcomeMetadata({
      candidateId: CANDIDATE, correlationId: CORRELATION, aiProcessingRunId: RUN,
      status: "failed", completed: false, retryable: false,
      reason: sensitive.sanitizeResumeProcessingMessage(dirty),
    });
    assertNoForbiddenContent(meta, "sanitised failure reason");
  });
  check("a reason containing a bearer token is redacted", () => {
    const cleaned = sensitive.sanitizeResumeProcessingMessage(
      `AI call failed with ${FORBIDDEN.bearerHeader}`,
    );
    assert.ok(!cleaned.includes(FORBIDDEN.bearerHeader), `token survived: ${cleaned}`);
    assert.ok(!/\bBearer\s+\S/i.test(cleaned), `authorization header survived: ${cleaned}`);
  });

  console.log("\nQueue dispatch failures are sanitised before logging:");
  check("a dispatch error quoting the destination URL is redacted", () => {
    // Shape of a real QStash SDK failure: it echoes the destination it tried.
    const raw =
      "Failed to publish to https://estabizz-git-staging-example.vercel.app/api/jobs/queue/resume-parse: 401 Unauthorized";
    const cleaned = sensitive.sanitizeResumeProcessingMessage(raw);
    assert.ok(!/https?:\/\//.test(cleaned), `URL survived: ${cleaned}`);
    assert.ok(cleaned.includes("401") || cleaned.includes("Failed to publish"), "diagnostic value lost");
  });
  check("a dispatch error carrying a credential is redacted", () => {
    const raw = `QStash request rejected: ${FORBIDDEN.bearerHeader}`;
    const cleaned = sensitive.sanitizeResumeProcessingMessage(raw);
    assert.ok(!cleaned.includes(FORBIDDEN.bearerHeader), `credential survived: ${cleaned}`);
    assert.ok(!/\bBearer\s+\S/i.test(cleaned), `authorization header survived: ${cleaned}`);
  });
  check("a dispatch error is length-capped so logs cannot be flooded", () => {
    const cleaned = sensitive.sanitizeResumeProcessingMessage("x".repeat(5000));
    assert.ok(cleaned.length <= 500, `not capped: ${cleaned.length}`);
  });

  console.log("\nCross-cutting guarantee:");
  check("no builder output contains any forbidden sample under any input", () => {
    const payloads = [
      audit.buildResumeUploadedMetadata({
        candidateId: CANDIDATE, versionNumber: 1,
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        fileSizeBytes: 37089, parseStatus: "pending",
      }),
      audit.buildResumeUploadRejectedMetadata({ securityStatus: "rejected_blocked_format" }),
      started, completed, failedMeta,
    ];
    for (const payload of payloads) {
      for (const value of flattenValues(payload)) {
        for (const [kind, sample] of Object.entries(FORBIDDEN)) {
          assert.ok(!value.includes(sample), `payload leaked ${kind}`);
        }
      }
    }
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => rmSync(outDir, { recursive: true, force: true }));
