import type { JobsAiServiceConfig, JobsAiServiceConfigValidationResult } from "./types";

/**
 * Timeout budget for the resume pipeline, outermost to innermost:
 *
 *   QStash delivery timeout   plan maximum (deliberately not shortened)
 *   Vercel maxDuration        300s on /api/jobs/queue/resume-parse
 *   -> text extraction call   45s  (this file)      service ceiling 30s + overhead
 *   -> structured call        75s  (this file)      service ceiling 60s + overhead
 *
 * Each caller timeout must stay ABOVE the AI service's own ceiling for the same
 * operation. The service ceilings live in services/jobs-ai (JOBS_AI_TEXT_
 * EXTRACTION_TIMEOUT_SECONDS and JOBS_AI_EXTRACTION_TIMEOUT_SECONDS); changing
 * one side without the other reintroduces the mismatch this replaced.
 */
const DEFAULT_HEALTH_TIMEOUT_MS = 10_000;
const DEFAULT_TEXT_EXTRACTION_TIMEOUT_MS = 45_000;
const DEFAULT_STRUCTURED_EXTRACTION_TIMEOUT_MS = 75_000;
const MAX_TIMEOUT_MS = 120_000;

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
    healthTimeoutMs: parsePositiveInteger(
      env.JOBS_AI_HEALTH_TIMEOUT_MS,
      DEFAULT_HEALTH_TIMEOUT_MS,
    ),
    textExtractionTimeoutMs: parsePositiveInteger(
      env.JOBS_AI_TEXT_EXTRACTION_TIMEOUT_MS,
      DEFAULT_TEXT_EXTRACTION_TIMEOUT_MS,
    ),
    structuredExtractionTimeoutMs: parsePositiveInteger(
      env.JOBS_AI_STRUCTURED_EXTRACTION_TIMEOUT_MS,
      DEFAULT_STRUCTURED_EXTRACTION_TIMEOUT_MS,
    ),
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

  for (const [name, value] of [
    ["JOBS_AI_HEALTH_TIMEOUT_MS", config.healthTimeoutMs],
    ["JOBS_AI_TEXT_EXTRACTION_TIMEOUT_MS", config.textExtractionTimeoutMs],
    ["JOBS_AI_STRUCTURED_EXTRACTION_TIMEOUT_MS", config.structuredExtractionTimeoutMs],
  ] as const) {
    if (value <= 0 || value > MAX_TIMEOUT_MS) {
      errors.push(`${name} must be between 1 and ${MAX_TIMEOUT_MS}.`);
    }
  }

  // A structured extraction calls an LLM; text extraction only parses bytes.
  // Inverting these means the LLM call is cut off before the cheap one.
  if (config.structuredExtractionTimeoutMs < config.textExtractionTimeoutMs) {
    errors.push(
      "JOBS_AI_STRUCTURED_EXTRACTION_TIMEOUT_MS must not be shorter than JOBS_AI_TEXT_EXTRACTION_TIMEOUT_MS.",
    );
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
