import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  ALLOWED_DOCUMENT_MIME_TYPES,
  type AllowedDocumentExtension,
  type AllowedDocumentMimeType,
  type NormalizedDocumentFilename,
  type StoredDocumentObjectKeyParts,
  type TemporaryDocumentObjectKeyParts,
} from "./types";

const MAX_SAFE_FILENAME_LENGTH = 180;

const MIME_TYPE_TO_EXTENSION: Record<AllowedDocumentMimeType, AllowedDocumentExtension> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export function isAllowedDocumentMimeType(
  contentType: string,
): contentType is AllowedDocumentMimeType {
  return ALLOWED_DOCUMENT_MIME_TYPES.includes(contentType as AllowedDocumentMimeType);
}

export function isAllowedDocumentExtension(
  extension: string,
): extension is AllowedDocumentExtension {
  return ALLOWED_DOCUMENT_EXTENSIONS.includes(extension as AllowedDocumentExtension);
}

export function extensionForMimeType(
  contentType: AllowedDocumentMimeType,
): AllowedDocumentExtension {
  return MIME_TYPE_TO_EXTENSION[contentType];
}

export function normalizeDocumentFilename(
  originalName: string,
  contentType: AllowedDocumentMimeType,
): NormalizedDocumentFilename {
  const expectedExtension = extensionForMimeType(contentType);
  const basename = originalName
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    ?.replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();

  const fallbackName = `document.${expectedExtension}`;
  const name = basename || fallbackName;
  const lastDot = name.lastIndexOf(".");
  const rawStem = lastDot > 0 ? name.slice(0, lastDot) : name;
  const rawExtension = lastDot > 0 ? name.slice(lastDot + 1).toLowerCase() : expectedExtension;
  const extension = isAllowedDocumentExtension(rawExtension) ? rawExtension : expectedExtension;

  const safeStem =
    rawStem
      .normalize("NFKC")
      .replace(/[^a-zA-Z0-9._ -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[._-]+|[._-]+$/g, "")
      .slice(0, MAX_SAFE_FILENAME_LENGTH) || "document";

  return {
    originalName,
    safeName: `${safeStem}.${extension}`,
    extension,
  };
}

export function assertDocumentWithinLimit(
  contentLengthBytes: number,
  maxUploadBytes: number,
): void {
  if (!Number.isInteger(contentLengthBytes) || contentLengthBytes <= 0) {
    throw new Error("Document upload size must be a positive integer.");
  }

  if (contentLengthBytes > maxUploadBytes) {
    throw new Error("Document upload is larger than the configured limit.");
  }
}

export function isSha256Hex(value: string): boolean {
  return /^[a-f0-9]{64}$/i.test(value);
}

export function buildResumeVersionObjectKey(parts: StoredDocumentObjectKeyParts): string {
  assertObjectKeyParts(parts);
  return `candidates/${parts.candidateId}/resumes/${parts.recordId}/${parts.sha256Hex.toLowerCase()}.${parts.extension}`;
}

export function buildCandidateDocumentObjectKey(parts: StoredDocumentObjectKeyParts): string {
  assertObjectKeyParts(parts);
  return `candidates/${parts.candidateId}/documents/${parts.recordId}/${parts.sha256Hex.toLowerCase()}.${parts.extension}`;
}

export function buildTemporaryUploadObjectKey(parts: TemporaryDocumentObjectKeyParts): string {
  if (!parts.candidateId || !parts.uploadId || !isAllowedDocumentExtension(parts.extension)) {
    throw new Error("Temporary upload object key parts are invalid.");
  }

  return `tmp/candidates/${parts.candidateId}/${parts.uploadId}.${parts.extension}`;
}

function assertObjectKeyParts(parts: StoredDocumentObjectKeyParts): void {
  if (
    !parts.candidateId ||
    !parts.recordId ||
    !isSha256Hex(parts.sha256Hex) ||
    !isAllowedDocumentExtension(parts.extension)
  ) {
    throw new Error("Stored document object key parts are invalid.");
  }
}
