import type { JobsQueueEnvelope } from "@/lib/jobs/queue";

export interface ResumeParseJobPayload {
  [key: string]: unknown;
  resumeVersionId: string;
  candidateId: string;
}

export type ResumeParseJobEnvelope = JobsQueueEnvelope<ResumeParseJobPayload>;

export interface ResumeParseValidationResult {
  ok: boolean;
  payload?: ResumeParseJobPayload;
  errorMessage?: string;
}

export interface ResumeParseWorkerResult {
  ok: boolean;
  status: "completed" | "already_completed" | "already_processing" | "failed" | "retryable_failed";
  retryable: boolean;
  errorMessage?: string;
  /** Present once a run exists, so the outcome audit event can reference it. */
  aiProcessingRunId?: string;
}
