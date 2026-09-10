import "server-only";

import { randomUUID } from "crypto";

import {
  createJobsQueue,
  createJobsQueueIdempotencyKey,
  getJobsQueueConfig,
} from "@/lib/jobs/queue";

/**
 * The processing identity of a resume is the resume version itself, not the
 * dispatch attempt. A random correlation id per call produced a fresh QStash
 * deduplicationId on every retry of the (idempotent) confirm endpoint, so one
 * upload could be delivered to the worker several times over.
 */
export function buildResumeParseCorrelationId(resumeVersionId: string): string {
  return `resume-parse-${resumeVersionId}`;
}

export interface DispatchResumeParseInput {
  resumeVersionId: string;
  candidateId: string;
  actorRefId: string;
  correlationId?: string;
}

export interface DispatchResumeParseResult {
  dispatched: boolean;
  blocked: boolean;
  messageId?: string;
  jobId?: string;
  errorMessage?: string;
}

export async function dispatchResumeParse(
  input: DispatchResumeParseInput,
): Promise<DispatchResumeParseResult> {
  const config = getJobsQueueConfig();

  if (!config.configured) {
    return { dispatched: false, blocked: true };
  }

  const correlationId = input.correlationId ?? buildResumeParseCorrelationId(input.resumeVersionId);
  const jobId = randomUUID();
  const idempotencyKey = createJobsQueueIdempotencyKey({
    jobType: "RESUME_PARSE",
    entityId: input.resumeVersionId,
    correlationId,
  });

  let queue: ReturnType<typeof createJobsQueue>;

  try {
    queue = createJobsQueue(config);
  } catch {
    return {
      dispatched: false,
      blocked: false,
      errorMessage: "Jobs queue initialisation failed.",
    };
  }

  const result = await queue.dispatch(
    {
      jobType: "RESUME_PARSE",
      jobId,
      entityId: input.resumeVersionId,
      idempotencyKey,
      attempt: { attempt: 1, maxAttempts: config.defaultRetries + 1 },
      requestedBy: { type: "system", id: input.actorRefId },
      createdAt: new Date().toISOString(),
      payload: {
        resumeVersionId: input.resumeVersionId,
        candidateId: input.candidateId,
      },
      correlationId,
      environment: config.environment,
    },
    {
      destinationPath: "/api/jobs/queue/resume-parse",
      flowControlKey: `resume-parse-candidate-${input.candidateId}`,
      maxParallelism: 1,
    },
  );

  if (result.status === "queued") {
    return { dispatched: true, blocked: false, messageId: result.messageId, jobId };
  }

  if (result.status === "blocked") {
    return { dispatched: false, blocked: true, jobId };
  }

  return {
    dispatched: false,
    blocked: false,
    jobId,
    errorMessage: result.errorMessage ?? "Resume parse dispatch failed.",
  };
}
