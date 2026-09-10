export interface JobsAiServiceConfig {
  configured: boolean;
  environment: "development" | "staging" | "production";
  serviceUrl: string;
  serviceSecret: string;
  /**
   * Per-call caller timeouts. Each must exceed the AI service's own ceiling for
   * that operation plus network overhead, otherwise the caller aborts work the
   * service is still performing and the job fails for no real reason.
   */
  healthTimeoutMs: number;
  textExtractionTimeoutMs: number;
  structuredExtractionTimeoutMs: number;
}

export interface JobsAiServiceConfigValidationResult {
  ok: boolean;
  errors: string[];
}

export interface JobsAiHealthResponse {
  status: string;
  service: string;
  environment: string;
  ai_provider: string;
  ai_model_configured: boolean;
  database_configured: boolean;
}

export interface JobsAiResumeTextExtractionRequest {
  resumeVersionId: string;
  candidateId: string;
  correlationId: string;
  fileName: string;
  mimeType: string;
  content: Uint8Array;
}

export interface JobsAiResumeTextExtractionResponse {
  status: string;
  text: string;
  pageCount: number | null;
  detectedMimeType: string;
  characterCount: number;
  extractionMethod: string;
  warnings: string[];
  requiresOcr: boolean;
}

export interface JobsAiStructuredExtractionRequest {
  resumeVersionId: string;
  candidateId: string;
  correlationId: string;
  extractedText: string;
  extractionMethod?: string | null;
  pageCount?: number | null;
}

export interface JobsAiStructuredExtractionUsage {
  inputTokens: number | null;
  outputTokens: number | null;
}

export interface JobsAiStructuredExtractionResponse {
  status: string;
  provider: string | null;
  model: string | null;
  data: unknown;
  warnings: string[];
  usage: JobsAiStructuredExtractionUsage | null;
}

export interface JobsAiClientResult<TData> {
  ok: boolean;
  status: number | null;
  data?: TData;
  errorMessage?: string;
}
