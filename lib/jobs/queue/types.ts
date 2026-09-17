export const JOBS_QUEUE_JOB_TYPES = [
  "RESUME_PARSE",
  "AI_EXTRACTION",
  "GENERATE_EMBEDDING",
  "CANDIDATE_MATCH",
  "SEND_EMAIL",
  "PROFILE_COMPLETENESS_RECALCULATE",
  "INTERVIEW_REMINDER",
  "JOB_ALERT",
  "QUEUE_SMOKE_TEST",
] as const;

export type JobsQueueJobType = (typeof JOBS_QUEUE_JOB_TYPES)[number];

export type JobsQueueProvider = "qstash";

export type JobsQueueEnvironment = "development" | "staging" | "production";

export type JobsQueueDispatchStatus = "queued" | "blocked" | "failed";

export interface JobsQueueConfig {
  configured: boolean;
  provider: JobsQueueProvider | null;
  environment: JobsQueueEnvironment;
  baseUrl: string;
  qstashToken: string;
  currentSigningKey: string;
  nextSigningKey: string;
  vercelAutomationBypassSecret: string;
  defaultRetries: number;
  retryDelayExpression: string;
  maxPayloadBytes: number;
  smokeTestEnabled: boolean;
}

export interface JobsQueueConfigValidationResult {
  ok: boolean;
  errors: string[];
}

export interface JobsQueueActor {
  type: "candidate" | "admin" | "system";
  id: string;
}

export interface JobsQueueAttemptMetadata {
  attempt: number;
  maxAttempts: number;
  previousMessageId?: string;
}

export interface JobsQueueEnvelope<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  jobType: JobsQueueJobType;
  jobId: string;
  entityId?: string;
  idempotencyKey: string;
  attempt: JobsQueueAttemptMetadata;
  requestedBy: JobsQueueActor;
  createdAt: string;
  scheduledAt?: string;
  payload: TPayload;
  correlationId: string;
  environment: JobsQueueEnvironment;
}

export interface JobsQueueDispatchOptions {
  destinationPath: string;
  scheduledAt?: Date;
  delaySeconds?: number;
  retries?: number;
  retryDelayExpression?: string;
  failureCallbackPath?: string;
  flowControlKey?: string;
  maxParallelism?: number;
  ratePerSecond?: number;
}

export interface JobsQueueDispatchResult {
  status: JobsQueueDispatchStatus;
  provider: JobsQueueProvider | null;
  messageId?: string;
  jobId: string;
  blockedReason?: string;
  errorMessage?: string;
}

export interface JobsQueueSignatureVerificationRequest {
  signature: string | null;
  body: string;
  url?: string;
  upstashRegion?: string | null;
}

export interface JobsQueueSignatureVerificationResult {
  ok: boolean;
  errorMessage?: string;
}

export interface JobsQueueFailureRecord {
  messageId: string;
  jobId?: string;
  jobType?: JobsQueueJobType;
  reason: string;
  recordedAt: string;
}

export interface JobQueue {
  dispatch<TPayload extends Record<string, unknown>>(
    _envelope: JobsQueueEnvelope<TPayload>,
    _options: JobsQueueDispatchOptions,
  ): Promise<JobsQueueDispatchResult>;
  retry(_messageId: string): Promise<void>;
  deadLetter(_messageId: string, _reason: string): Promise<JobsQueueFailureRecord>;
  verifySignature(
    _request: JobsQueueSignatureVerificationRequest,
  ): Promise<JobsQueueSignatureVerificationResult>;
}
