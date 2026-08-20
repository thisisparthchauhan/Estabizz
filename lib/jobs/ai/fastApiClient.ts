import "server-only";

import {
  buildJobsAiServiceUrl,
  getJobsAiServiceConfig,
  validateJobsAiServiceConfig,
} from "./config";
import type {
  JobsAiClientResult,
  JobsAiHealthResponse,
  JobsAiServiceConfig,
} from "./types";

export class JobsAiFastApiClient {
  private readonly config: JobsAiServiceConfig;

  constructor(config: JobsAiServiceConfig = getJobsAiServiceConfig()) {
    this.config = config;
  }

  async checkInternalHealth(): Promise<JobsAiClientResult<JobsAiHealthResponse>> {
    const validation = validateJobsAiServiceConfig(this.config);

    if (!validation.ok || !this.config.configured) {
      return {
        ok: false,
        status: null,
        errorMessage: `Jobs AI service is not configured: ${validation.errors.join(" ")}`,
      };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(buildJobsAiServiceUrl(this.config, "/internal/health"), {
        method: "GET",
        headers: {
          "x-estabizz-service-secret": this.config.serviceSecret,
          accept: "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      const data = await readJsonSafely<JobsAiHealthResponse>(response);

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          errorMessage: `Jobs AI service health check failed with HTTP ${response.status}.`,
        };
      }

      return {
        ok: true,
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        status: null,
        errorMessage:
          error instanceof Error && error.name === "AbortError"
            ? "Jobs AI service health check timed out."
            : "Jobs AI service health check failed.",
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function createJobsAiClient(
  config: JobsAiServiceConfig = getJobsAiServiceConfig(),
): JobsAiFastApiClient {
  return new JobsAiFastApiClient(config);
}

async function readJsonSafely<TData>(response: Response): Promise<TData | undefined> {
  try {
    return (await response.json()) as TData;
  } catch {
    return undefined;
  }
}
