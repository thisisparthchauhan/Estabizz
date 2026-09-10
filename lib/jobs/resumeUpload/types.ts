import type {
  AllowedDocumentMimeType,
  PrivateDocumentStorage,
  PrivateObjectMetadata,
} from "../documentStorage/types";
import type { CandidateAccountSession } from "../candidateIdentity/types";

export const RESUME_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const RESUME_UPLOAD_EXTENSIONS = ["pdf", "docx"] as const;

export type ResumeUploadMimeType = (typeof RESUME_UPLOAD_MIME_TYPES)[number];
export type ResumeUploadExtension = (typeof RESUME_UPLOAD_EXTENSIONS)[number];

export interface ResumeUploadIntentRequest {
  fileName: string;
  contentType: ResumeUploadMimeType;
  contentLengthBytes: number;
}

export interface ResumeUploadIntentResult {
  uploadRef: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
  maxUploadBytes: number;
  allowedMimeTypes: ResumeUploadMimeType[];
  allowedExtensions: ResumeUploadExtension[];
}

export interface ResumeUploadConfirmRequest {
  uploadRef: string;
}

export interface ResumeUploadConfirmResult {
  ok: true;
  resumeVersionId: string;
  versionNumber: number;
  fileName: string;
  fileType: ResumeUploadMimeType;
  fileSizeBytes: number;
  uploadedAt: string;
  parseStatus: "pending";
  /**
   * False when an idempotent retry returned the existing version. Server-side
   * only -- it is stripped before the response is serialised, and exists so the
   * route does not record a duplicate `resume.uploaded` audit event for a retry.
   */
  created: boolean;
}

export interface ResumeUploadTokenPayload {
  candidateId: string;
  actorRefId: string;
  objectKey: string;
  fileName: string;
  contentType: ResumeUploadMimeType;
  contentLengthBytes: number;
  uploadKind: "resume";
  expiresAt: string;
}

export interface ResumeUploadRepositoryResult {
  resumeVersionId: string;
  versionNumber: number;
  fileName: string;
  fileType: ResumeUploadMimeType;
  fileSizeBytes: number;
  uploadedAt: Date;
  created: boolean;
}

export interface ResumeUploadRepository {
  confirmUploadedResume(input: {
    session: CandidateAccountSession;
    token: ResumeUploadTokenPayload;
    metadata: PrivateObjectMetadata;
  }): Promise<ResumeUploadRepositoryResult>;
}

export interface ResumeUploadDependencies {
  storage: PrivateDocumentStorage;
  repository: ResumeUploadRepository;
  maxUploadBytes: number;
  presignedUploadTtlSeconds: number;
  tokenSecret: string;
}

export interface ResumeUploadValidationIssue {
  field: "fileName" | "contentType" | "contentLengthBytes" | "uploadRef";
  message: string;
}

export class ResumeUploadValidationError extends Error {
  constructor(
    message: string,
    readonly issues: ResumeUploadValidationIssue[] = [],
  ) {
    super(message);
    this.name = "ResumeUploadValidationError";
  }
}

export class ResumeUploadAuthorizationError extends Error {
  constructor(message = "You can only upload a resume for your own account.") {
    super(message);
    this.name = "ResumeUploadAuthorizationError";
  }
}

/**
 * Raised when the uploaded bytes are not the document type the upload claimed.
 * Structural validation only -- this is not a malware-scan verdict.
 */
export class ResumeUploadFileSecurityError extends Error {
  constructor(
    readonly candidateMessage: string,
    readonly securityStatus: string,
  ) {
    super(`Resume file validation rejected the upload: ${securityStatus}`);
    this.name = "ResumeUploadFileSecurityError";
  }
}

export class ResumeUploadStorageError extends Error {
  constructor(message = "We could not verify the uploaded resume.") {
    super(message);
    this.name = "ResumeUploadStorageError";
  }
}
