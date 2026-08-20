import type {
  JobsQueueConfig,
  JobsQueueDispatchOptions,
  JobsQueueEnvelope,
} from "./types";

export function assertJobsQueueEnvironmentSafe(config: JobsQueueConfig): void {
  if (config.environment === "production" && !config.baseUrl.startsWith("https://")) {
    throw new Error("Production queue callbacks must use HTTPS.");
  }

  if (config.environment !== "production" && /prod/i.test(config.baseUrl)) {
    throw new Error("Non-production queue callbacks must not point at production URLs.");
  }
}

export function assertJobsQueuePayloadSafe(
  envelope: JobsQueueEnvelope,
  config: JobsQueueConfig,
): void {
  const payloadBytes = Buffer.byteLength(JSON.stringify(envelope), "utf8");

  if (payloadBytes > config.maxPayloadBytes) {
    throw new Error("Jobs queue payload exceeds the configured size limit.");
  }

  if (envelope.environment !== config.environment) {
    throw new Error("Jobs queue envelope environment does not match configured environment.");
  }

  if (!envelope.idempotencyKey || !envelope.correlationId || !envelope.jobId) {
    throw new Error("Jobs queue envelope must include jobId, idempotencyKey, and correlationId.");
  }
}

export function normalizeJobsQueueDispatchOptions(
  options: JobsQueueDispatchOptions,
  config: JobsQueueConfig,
): JobsQueueDispatchOptions {
  return {
    ...options,
    retries: options.retries ?? config.defaultRetries,
    retryDelayExpression: options.retryDelayExpression || config.retryDelayExpression,
  };
}

export function createJobsQueueIdempotencyKey(parts: {
  jobType: string;
  entityId?: string;
  correlationId: string;
}): string {
  return [parts.jobType, parts.entityId || "none", parts.correlationId]
    .map((part) => part.replace(/[^A-Za-z0-9_.-]/g, "-"))
    .join("-");
}
