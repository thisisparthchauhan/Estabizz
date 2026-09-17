import type { JobsQueueEnvironment, JobsQueueEnvelope } from "@/lib/jobs/queue";

import type {
  ResumeParseJobPayload,
  ResumeParseValidationResult,
} from "./types";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateResumeParseEnvelope(
  envelope: Partial<JobsQueueEnvelope<Record<string, unknown>>> | null,
  expectedEnvironment: JobsQueueEnvironment,
): ResumeParseValidationResult {
  if (!envelope || typeof envelope !== "object") {
    return { ok: false, errorMessage: "Resume parse job envelope is required." };
  }

  if (envelope.jobType !== "RESUME_PARSE") {
    return { ok: false, errorMessage: "Unsupported queue job type." };
  }

  if (envelope.environment !== expectedEnvironment) {
    return { ok: false, errorMessage: "Queue job environment does not match worker environment." };
  }

  if (!isUuid(envelope.jobId) && !isSafeIdentifier(envelope.jobId)) {
    return { ok: false, errorMessage: "Queue job ID is invalid." };
  }

  if (!isSafeIdentifier(envelope.idempotencyKey)) {
    return { ok: false, errorMessage: "Queue idempotency key is invalid." };
  }

  if (!isSafeIdentifier(envelope.correlationId)) {
    return { ok: false, errorMessage: "Queue correlation ID is invalid." };
  }

  const payload = envelope.payload as Partial<ResumeParseJobPayload> | undefined;

  if (!payload || typeof payload !== "object") {
    return { ok: false, errorMessage: "Resume parse job payload is required." };
  }

  if (!isUuid(payload.resumeVersionId)) {
    return { ok: false, errorMessage: "Resume version ID is invalid." };
  }

  if (!isUuid(payload.candidateId)) {
    return { ok: false, errorMessage: "Candidate ID is invalid." };
  }

  return {
    ok: true,
    payload: {
      resumeVersionId: payload.resumeVersionId,
      candidateId: payload.candidateId,
    },
  };
}

export function isResumeParsePermanentStatus(status: string): boolean {
  return [
    "unsupported_type",
    "empty_document",
    "corrupt_document",
    "encrypted_document",
    "too_large",
    "ocr_required",
  ].includes(status);
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function isSafeIdentifier(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_.:-]{1,200}$/.test(value);
}
