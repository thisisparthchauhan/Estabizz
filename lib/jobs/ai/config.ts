import type { JobsAiServiceConfig, JobsAiServiceConfigValidationResult } from "./types";

const DEFAULT_TIMEOUT_MS = 5000;

export function getJobsAiServiceConfig(
  env: NodeJS.ProcessEnv = process.env,
): JobsAiServiceConfig {
  const serviceUrl = normalizeServiceUrl(env.JOBS_AI_SERVICE_URL);
  const serviceSecret = env.AI_SERVICE_SECRET?.trim() || "";
  const environment = parseEnvironment(env.APP_ENV || env.NEXT_PUBLIC_APP_ENV);

  return {
    configured: Boolean(serviceUrl && serviceSecret),
    environment,
    serviceUrl,
    serviceSecret,
    timeoutMs: parsePositiveInteger(env.JOBS_AI_REQUEST_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  };
}

export function validateJobsAiServiceConfig(
  config: JobsAiServiceConfig,
): JobsAiServiceConfigValidationResult {
  const errors: string[] = [];

  if (!config.serviceUrl) {
    errors.push("JOBS_AI_SERVICE_URL is required.");
  }

  if (!config.serviceSecret) {
    errors.push("AI_SERVICE_SECRET is required.");
  }

  if (
    config.environment === "production" &&
    /localhost|127\.0\.0\.1|staging|preview/i.test(config.serviceUrl)
  ) {
    errors.push("Production AI service configuration must not point at local or staging URLs.");
  }

  if (
    config.environment !== "production" &&
    /(^|[-_.])prod(uction)?($|[-_.])/i.test(config.serviceUrl)
  ) {
    errors.push("Non-production AI service configuration must not point at production URLs.");
  }

  if (config.timeoutMs <= 0 || config.timeoutMs > 30000) {
    errors.push("JOBS_AI_REQUEST_TIMEOUT_MS must be between 1 and 30000.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function buildJobsAiServiceUrl(config: JobsAiServiceConfig, path: string): string {
  const baseUrl = config.serviceUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

function normalizeServiceUrl(value: string | undefined): string {
  const serviceUrl = value?.trim().replace(/\/+$/, "");

  if (!serviceUrl) {
    return "";
  }

  try {
    return new URL(serviceUrl).toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function parseEnvironment(value: string | undefined): JobsAiServiceConfig["environment"] {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
