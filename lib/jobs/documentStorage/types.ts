export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export type AllowedDocumentMimeType = (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number];
export type AllowedDocumentExtension = (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number];

export type DocumentStorageProvider = "s3-compatible";

export type DocumentStorageEnvironment = "development" | "staging" | "production";

export type StoredDocumentKind = "resume_version" | "candidate_document";

export type TemporaryUploadKind = "resume" | "candidate_document";

/**
 * `not_scanned` is the honest state for an object that no scanner has ever
 * looked at. It is NOT a pass. `pending` means a scan was requested and has not
 * finished; no code path currently produces it, but it is retained so objects
 * uploaded before this change keep their meaning.
 */
export type MalwareScanStatus =
  | "not_scanned"
  | "pending"
  | "clean"
  | "infected"
  | "failed"
  | "skipped";

export type DocumentAuditAction =
  | "document_upload_requested"
  | "document_upload_completed"
  | "document_upload_failed"
  | "document_view_presigned"
  | "document_download_presigned"
  | "document_deleted"
  | "document_scan_completed"
  | "document_scan_failed";

export interface DocumentStorageConfig {
  configured: boolean;
  provider: DocumentStorageProvider | null;
  environment: DocumentStorageEnvironment;
  bucket: string;
  region: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  forcePathStyle: boolean;
  maxUploadBytes: number;
  presignedUploadTtlSeconds: number;
  presignedDownloadTtlSeconds: number;
  temporaryUploadTtlMinutes: number;
  malwareScanningRequired: boolean;
}

export interface DocumentStorageValidationResult {
  ok: boolean;
  errors: string[];
}

export interface NormalizedDocumentFilename {
  originalName: string;
  safeName: string;
  extension: AllowedDocumentExtension;
}

export interface TemporaryDocumentUploadRequest {
  candidateId: string;
  uploadId: string;
  uploadKind: TemporaryUploadKind;
  originalFilename: string;
  contentType: AllowedDocumentMimeType;
  contentLengthBytes: number;
  requestedByRefId: string;
  sha256Hex?: string;
}

export interface PresignedUploadTarget {
  objectKey: string;
  uploadUrl: string;
  expiresAt: Date;
  requiredHeaders: Record<string, string>;
}

export interface PresignedDownloadRequest {
  objectKey: string;
  candidateId: string;
  requestedByRefId: string;
  reason:
    | "candidate_view"
    | "candidate_download"
    | "recruiter_view"
    | "resume_parse"
    | "system_verification";
}

export interface PresignedDownloadTarget {
  objectKey: string;
  downloadUrl: string;
  expiresAt: Date;
  responseContentDisposition: "inline" | "attachment";
}

export interface StoredDocumentObjectKeyParts {
  candidateId: string;
  recordId: string;
  sha256Hex: string;
  extension: AllowedDocumentExtension;
}

export interface TemporaryDocumentObjectKeyParts {
  candidateId: string;
  uploadId: string;
  extension: AllowedDocumentExtension;
}

export interface PrivateObjectMetadata {
  objectKey: string;
  contentType: AllowedDocumentMimeType;
  contentLengthBytes: number;
  sha256Hex?: string;
  uploadedAt: Date;
  malwareScanStatus: MalwareScanStatus;
}

export interface MalwareScanRequest {
  objectKey: string;
  candidateId: string;
  contentType: AllowedDocumentMimeType;
  sha256Hex: string;
}

export interface MalwareScanResult {
  objectKey: string;
  status: MalwareScanStatus;
  providerReference?: string;
  completedAt?: Date;
  message?: string;
}

export interface MalwareScanner {
  requestScan(_request: MalwareScanRequest): Promise<void>;
  getScanResult(_objectKey: string): Promise<MalwareScanResult | null>;
}

export interface PrivateDocumentStorage {
  validateConfiguredBucket(): Promise<void>;
  createPresignedUpload(
    _request: TemporaryDocumentUploadRequest,
  ): Promise<PresignedUploadTarget>;
  createPresignedDownload(
    _request: PresignedDownloadRequest,
  ): Promise<PresignedDownloadTarget>;
  getObjectMetadata(_objectKey: string): Promise<PrivateObjectMetadata | null>;
  /**
   * Reads a byte range from a private object. Used by the file-security gate so
   * a header/trailer check does not have to pull a whole 10 MB document into a
   * serverless function. `endInclusive` follows HTTP Range semantics.
   */
  getObjectRange(
    _objectKey: string,
    _start: number,
    _endInclusive: number,
  ): Promise<Uint8Array | null>;
  deleteObject(_objectKey: string): Promise<void>;
}
