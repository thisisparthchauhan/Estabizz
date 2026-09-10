/**
 * Audit metadata builders for the resume lifecycle.
 *
 * Every `resume.*` AuditEvent payload is constructed here, in one place, so the
 * security rule is enforceable and testable rather than restated at each call
 * site.
 *
 * THE RULE: audit metadata carries identifiers, enum-valued status and
 * correlation data ONLY. It must never carry raw resume text, document bytes,
 * AI prompts or responses, API keys or tokens, presigned URLs, private storage
 * object keys, authorization headers, or extracted candidate PII (names,
 * emails, phone numbers) -- including the candidate-supplied filename, which
 * routinely contains the candidate's own name.
 */

export const RESUME_AUDIT_ACTIONS = {
  uploaded: "resume.uploaded",
  uploadRejected: "resume.upload_rejected",
  processingStarted: "resume.processing_started",
  processingCompleted: "resume.processing_completed",
  processingFailed: "resume.processing_failed",
} as const;

export type ResumeAuditAction = (typeof RESUME_AUDIT_ACTIONS)[keyof typeof RESUME_AUDIT_ACTIONS];

export type ResumeAuditMetadata = Record<string, string | number | boolean | null>;

export function buildResumeUploadedMetadata(input: {
  candidateId: string;
  versionNumber: number;
  fileType: string;
  fileSizeBytes: number;
  parseStatus: string;
}): ResumeAuditMetadata {
  return {
    candidateId: input.candidateId,
    versionNumber: input.versionNumber,
    fileType: input.fileType,
    fileSizeBytes: input.fileSizeBytes,
    parseStatus: input.parseStatus,
  };
}

export function buildResumeUploadRejectedMetadata(input: {
  securityStatus: string;
}): ResumeAuditMetadata {
  return {
    // A fixed enum value from lib/jobs/fileSecurity, never a filename or any
    // part of the document.
    securityStatus: input.securityStatus,
  };
}

export function buildResumeProcessingStartedMetadata(input: {
  candidateId: string;
  correlationId: string;
  aiProcessingRunId: string;
  attempt: number | null;
  reclaimedStaleRun: boolean;
}): ResumeAuditMetadata {
  return {
    candidateId: input.candidateId,
    correlationId: input.correlationId,
    aiProcessingRunId: input.aiProcessingRunId,
    attempt: input.attempt,
    reclaimedStaleRun: input.reclaimedStaleRun,
  };
}

export function buildResumeProcessingOutcomeMetadata(input: {
  candidateId: string;
  correlationId: string;
  aiProcessingRunId: string | null;
  status: string;
  completed: boolean;
  retryable: boolean;
  /** Already passed through sanitizeResumeProcessingMessage by the worker. */
  reason: string | null;
}): ResumeAuditMetadata {
  return {
    candidateId: input.candidateId,
    correlationId: input.correlationId,
    aiProcessingRunId: input.aiProcessingRunId,
    status: input.status,
    ...(input.completed
      ? {}
      : { retryable: input.retryable, reason: input.reason }),
  };
}
