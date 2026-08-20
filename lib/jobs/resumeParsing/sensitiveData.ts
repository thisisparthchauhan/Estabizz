import type { JobsAiResumeTextExtractionResponse } from "@/lib/jobs/ai";

const REDACTED = "[redacted]";
const MAX_SAFE_MESSAGE_LENGTH = 500;

export interface SafeResumeExtractionMetadata {
  status: string;
  pageCount: number | null;
  detectedMimeType: string;
  characterCount: number;
  extractionMethod: string;
  warnings: string[];
  requiresOcr: boolean;
}

export function buildSafeResumeExtractionMetadata(
  extraction: JobsAiResumeTextExtractionResponse,
): SafeResumeExtractionMetadata {
  const { text: _discardedRawText, warnings, ...metadata } = extraction;

  return {
    ...metadata,
    warnings: warnings.map(sanitizeResumeProcessingMessage),
  };
}

export function sanitizeResumeProcessingMessage(message: string): string {
  return redactSensitiveResumeText(message)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SAFE_MESSAGE_LENGTH);
}

export function redactSensitiveResumeText(value: string): string {
  return value
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, REDACTED)
    .replace(/\b(?:\+?\d[\s().-]?){8,}\d\b/g, REDACTED)
    .replace(/\bhttps?:\/\/\S+/gi, REDACTED)
    .replace(/\b(?:Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+/gi, REDACTED)
    .replace(/\bX-Amz-[A-Za-z0-9-]+=[^&\s]+/g, `X-Amz-${REDACTED}`)
    .replace(/\b[A-Za-z0-9+/]{80,}={0,2}\b/g, REDACTED);
}
