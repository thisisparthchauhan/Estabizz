import "server-only";

import {
  buildJobsAiServiceUrl,
  getJobsAiServiceConfig,
  validateJobsAiServiceConfig,
} from "./config";
import type {
  JobsAiClientResult,
  JobsAiHealthResponse,
  JobsAiResumeTextExtractionRequest,
  JobsAiResumeTextExtractionResponse,
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

  async extractResumeText(
    request: JobsAiResumeTextExtractionRequest,
  ): Promise<JobsAiClientResult<JobsAiResumeTextExtractionResponse>> {
    const validation = validateJobsAiServiceConfig(this.config);

    if (!validation.ok || !this.config.configured) {
      return {
        ok: false,
        status: null,
        errorMessage: `Jobs AI service is not configured: ${validation.errors.join(" ")}`,
      };
    }

    const formData = new FormData();
    formData.append("resume_version_id", request.resumeVersionId);
    formData.append("candidate_id", request.candidateId);
    formData.append("correlation_id", request.correlationId);
    formData.append(
      "file",
      new Blob([toArrayBuffer(request.content)], { type: request.mimeType }),
      request.fileName,
    );

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(
        buildJobsAiServiceUrl(this.config, "/internal/resumes/extract-text"),
        {
          method: "POST",
          headers: {
            "x-estabizz-service-secret": this.config.serviceSecret,
            accept: "application/json",
          },
          body: formData,
          cache: "no-store",
          signal: controller.signal,
        },
      );

      const data = await readJsonSafely<JobsAiResumeTextExtractionResponse>(response);

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          errorMessage: `Jobs AI resume text extraction failed with HTTP ${response.status}.`,
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
            ? "Jobs AI resume text extraction timed out."
            : "Jobs AI resume text extraction failed.",
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

function toArrayBuffer(content: Uint8Array): ArrayBuffer {
  const copied = new Uint8Array(content.byteLength);
  copied.set(content);
  return copied.buffer;
}

async function readJsonSafely<TData>(response: Response): Promise<TData | undefined> {
  try {
    return (await response.json()) as TData;
  } catch {
    return undefined;
  }
}
