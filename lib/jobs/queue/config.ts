import type {
  JobsQueueConfig,
  JobsQueueConfigValidationResult,
  JobsQueueEnvironment,
  JobsQueueProvider,
} from "./types";

const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY_EXPRESSION = "1000 * pow(2, retried)";
const DEFAULT_MAX_PAYLOAD_BYTES = 64 * 1024;

export function getJobsQueueConfig(env: NodeJS.ProcessEnv = process.env): JobsQueueConfig {
  const provider = parseProvider(env.JOBS_QUEUE_PROVIDER);
  const environment = parseEnvironment(env.APP_ENV || env.NEXT_PUBLIC_APP_ENV);

  return {
    configured: Boolean(
      provider &&
        env.JOBS_QUEUE_BASE_URL &&
        env.QSTASH_TOKEN &&
        env.QSTASH_CURRENT_SIGNING_KEY &&
        env.QSTASH_NEXT_SIGNING_KEY,
    ),
    provider,
    environment,
    baseUrl: normalizeBaseUrl(env.JOBS_QUEUE_BASE_URL),
    qstashToken: env.QSTASH_TOKEN || "",
    currentSigningKey: env.QSTASH_CURRENT_SIGNING_KEY || "",
    nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY || "",
    defaultRetries: parsePositiveInteger(env.JOBS_QUEUE_DEFAULT_RETRIES, DEFAULT_RETRIES),
    retryDelayExpression: env.JOBS_QUEUE_RETRY_DELAY_EXPRESSION || DEFAULT_RETRY_DELAY_EXPRESSION,
    maxPayloadBytes: parsePositiveInteger(
      env.JOBS_QUEUE_MAX_PAYLOAD_BYTES,
      DEFAULT_MAX_PAYLOAD_BYTES,
    ),
    smokeTestEnabled: env.JOBS_QUEUE_SMOKE_TEST_ENABLED === "true",
  };
}

export function validateJobsQueueConfig(config: JobsQueueConfig): JobsQueueConfigValidationResult {
  const errors: string[] = [];

  if (config.provider !== "qstash") {
    errors.push("JOBS_QUEUE_PROVIDER must be qstash.");
  }

  if (!config.baseUrl) {
    errors.push("JOBS_QUEUE_BASE_URL is required.");
  }

  if (!config.qstashToken) {
    errors.push("QSTASH_TOKEN is required.");
  }

  if (!config.currentSigningKey) {
    errors.push("QSTASH_CURRENT_SIGNING_KEY is required.");
  }

  if (!config.nextSigningKey) {
    errors.push("QSTASH_NEXT_SIGNING_KEY is required.");
  }

  if (config.environment !== "production" && /(^|[-_.])prod(uction)?($|[-_.])/i.test(config.baseUrl)) {
    errors.push("Non-production queue configuration must not point at a production base URL.");
  }

  if (config.environment === "production" && /localhost|127\.0\.0\.1|staging|preview/i.test(config.baseUrl)) {
    errors.push("Production queue configuration must not point at local or staging base URLs.");
  }

  if (config.defaultRetries < 0 || config.defaultRetries > 10) {
    errors.push("JOBS_QUEUE_DEFAULT_RETRIES must be between 0 and 10.");
  }

  if (config.maxPayloadBytes <= 0 || config.maxPayloadBytes > 512 * 1024) {
    errors.push("JOBS_QUEUE_MAX_PAYLOAD_BYTES must be greater than zero and no more than 512 KiB.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function buildJobsQueueUrl(config: JobsQueueConfig, destinationPath: string): string {
  const baseUrl = config.baseUrl.replace(/\/+$/, "");
  const path = destinationPath.startsWith("/") ? destinationPath : `/${destinationPath}`;
  return `${baseUrl}${path}`;
}

function parseProvider(value: string | undefined): JobsQueueProvider | null {
  return value === "qstash" ? value : null;
}

function parseEnvironment(value: string | undefined): JobsQueueEnvironment {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

function normalizeBaseUrl(value: string | undefined): string {
  const baseUrl = value?.trim().replace(/\/+$/, "");

  if (!baseUrl) {
    return "";
  }

  try {
    return new URL(baseUrl).toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}
