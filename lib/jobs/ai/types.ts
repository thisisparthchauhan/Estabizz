export interface JobsAiServiceConfig {
  configured: boolean;
  environment: "development" | "staging" | "production";
  serviceUrl: string;
  serviceSecret: string;
  timeoutMs: number;
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

export interface JobsAiClientResult<TData> {
  ok: boolean;
  status: number | null;
  data?: TData;
  errorMessage?: string;
}
