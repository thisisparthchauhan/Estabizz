import { randomUUID } from "crypto";

import {
  assertDocumentWithinLimit,
  normalizeDocumentFilename,
} from "../documentStorage/policy";
import type { CandidateAccountSession } from "../candidateIdentity/types";
import { signResumeUploadToken, verifyResumeUploadToken } from "./token";
import {
  RESUME_UPLOAD_EXTENSIONS,
  RESUME_UPLOAD_MIME_TYPES,
  ResumeUploadAuthorizationError,
  ResumeUploadStorageError,
  ResumeUploadValidationError,
  type ResumeUploadConfirmRequest,
  type ResumeUploadConfirmResult,
  type ResumeUploadDependencies,
  type ResumeUploadIntentRequest,
  type ResumeUploadIntentResult,
  type ResumeUploadMimeType,
  type ResumeUploadTokenPayload,
} from "./types";

const MIME_EXTENSION: Record<ResumeUploadMimeType, "pdf" | "docx"> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export function parseResumeUploadIntentBody(value: unknown): ResumeUploadIntentRequest {
  if (!value || typeof value !== "object") {
    throw new ResumeUploadValidationError("Resume upload details are required.");
  }

  const body = value as Record<string, unknown>;
  const fileName = typeof body.fileName === "string" ? body.fileName : "";
  const contentType = typeof body.contentType === "string" ? body.contentType : "";
  const contentLengthBytes = Number(body.contentLengthBytes);

  return validateResumeUploadIntent({
    fileName,
    contentType: contentType as ResumeUploadMimeType,
    contentLengthBytes,
  });
}

export function parseResumeUploadConfirmBody(value: unknown): ResumeUploadConfirmRequest {
  if (!value || typeof value !== "object" || typeof (value as { uploadRef?: unknown }).uploadRef !== "string") {
    throw new ResumeUploadValidationError("Upload reference is required.", [
      { field: "uploadRef", message: "Upload reference is required." },
    ]);
  }

  return {
    uploadRef: (value as { uploadRef: string }).uploadRef,
  };
}

export async function createResumeUploadIntent(
  session: CandidateAccountSession,
  request: ResumeUploadIntentRequest,
  dependencies: Pick<ResumeUploadDependencies, "storage" | "maxUploadBytes" | "presignedUploadTtlSeconds" | "tokenSecret">,
): Promise<ResumeUploadIntentResult> {
  const validated = validateResumeUploadIntent(request, dependencies.maxUploadBytes);
  const normalized = normalizeDocumentFilename(validated.fileName, validated.contentType);
  const expectedExtension = MIME_EXTENSION[validated.contentType];

  if (normalized.extension !== expectedExtension) {
    throw new ResumeUploadValidationError("Resume file type does not match the filename extension.", [
      { field: "fileName", message: "Resume file type does not match the filename extension." },
    ]);
  }

  const target = await dependencies.storage.createPresignedUpload({
    candidateId: session.candidateId,
    uploadId: randomUUID(),
    uploadKind: "resume",
    originalFilename: validated.fileName,
    contentType: validated.contentType,
    contentLengthBytes: validated.contentLengthBytes,
    requestedByRefId: session.actorRefId,
  });
  const uploadRef = signResumeUploadToken(
    {
      candidateId: session.candidateId,
      actorRefId: session.actorRefId,
      objectKey: target.objectKey,
      fileName: normalized.safeName,
      contentType: validated.contentType,
      contentLengthBytes: validated.contentLengthBytes,
      uploadKind: "resume",
      expiresAt: target.expiresAt.toISOString(),
    },
    dependencies.tokenSecret,
  );

  return {
    uploadRef,
    uploadUrl: target.uploadUrl,
    expiresAt: target.expiresAt.toISOString(),
    requiredHeaders: target.requiredHeaders,
    maxUploadBytes: dependencies.maxUploadBytes,
    allowedMimeTypes: [...RESUME_UPLOAD_MIME_TYPES],
    allowedExtensions: [...RESUME_UPLOAD_EXTENSIONS],
  };
}

export async function confirmResumeUpload(
  session: CandidateAccountSession,
  request: ResumeUploadConfirmRequest,
  dependencies: ResumeUploadDependencies,
): Promise<ResumeUploadConfirmResult> {
  const token = verifyResumeUploadToken(request.uploadRef, dependencies.tokenSecret);
  assertTokenBelongsToSession(token, session);

  const metadata = await dependencies.storage.getObjectMetadata(token.objectKey);
  if (!metadata) {
    throw new ResumeUploadStorageError("Resume upload was not found.");
  }

  validateUploadedObject(token, metadata, dependencies.maxUploadBytes);

  const result = await dependencies.repository.confirmUploadedResume({
    session,
    token,
    metadata,
  });

  return {
    ok: true,
    resumeVersionId: result.resumeVersionId,
    versionNumber: result.versionNumber,
    fileName: result.fileName,
    fileType: result.fileType,
    fileSizeBytes: result.fileSizeBytes,
    uploadedAt: result.uploadedAt.toISOString(),
    parseStatus: "pending",
  };
}

export function validateResumeUploadIntent(
  request: ResumeUploadIntentRequest,
  maxUploadBytes = Number.MAX_SAFE_INTEGER,
): ResumeUploadIntentRequest {
  const issues: ResumeUploadValidationError["issues"] = [];
  const contentType = request.contentType;

  if (!request.fileName.trim()) {
    issues.push({ field: "fileName", message: "Choose a PDF or DOCX resume." });
  }

  if (!RESUME_UPLOAD_MIME_TYPES.includes(contentType)) {
    issues.push({ field: "contentType", message: "Only PDF and DOCX resumes are supported." });
  }

  try {
    assertDocumentWithinLimit(request.contentLengthBytes, maxUploadBytes);
  } catch (error) {
    issues.push({
      field: "contentLengthBytes",
      message: error instanceof Error ? error.message : "Resume file size is invalid.",
    });
  }

  if (RESUME_UPLOAD_MIME_TYPES.includes(contentType)) {
    const extension = getFilenameExtension(request.fileName);
    if (extension !== MIME_EXTENSION[contentType]) {
      issues.push({ field: "fileName", message: "Resume file extension must match the selected file type." });
    }
  }

  if (issues.length) {
    throw new ResumeUploadValidationError("Resume upload details are invalid.", issues);
  }

  return {
    fileName: request.fileName,
    contentType,
    contentLengthBytes: request.contentLengthBytes,
  };
}

function validateUploadedObject(
  token: ResumeUploadTokenPayload,
  metadata: { contentType: string; contentLengthBytes: number; objectKey: string },
  maxUploadBytes: number,
): void {
  if (metadata.objectKey !== token.objectKey) {
    throw new ResumeUploadStorageError("Resume upload could not be verified.");
  }

  if (metadata.contentType !== token.contentType) {
    throw new ResumeUploadStorageError("Uploaded resume type does not match the upload request.");
  }

  if (metadata.contentLengthBytes !== token.contentLengthBytes) {
    throw new ResumeUploadStorageError("Uploaded resume size does not match the upload request.");
  }

  try {
    assertDocumentWithinLimit(metadata.contentLengthBytes, maxUploadBytes);
  } catch {
    throw new ResumeUploadStorageError("Uploaded resume size is not allowed.");
  }
}

function assertTokenBelongsToSession(
  token: ResumeUploadTokenPayload,
  session: CandidateAccountSession,
): void {
  if (token.candidateId !== session.candidateId || token.actorRefId !== session.actorRefId) {
    throw new ResumeUploadAuthorizationError();
  }

  if (!token.objectKey.startsWith(`tmp/candidates/${session.candidateId}/`)) {
    throw new ResumeUploadAuthorizationError("Resume upload reference does not belong to your account.");
  }
}

function getFilenameExtension(fileName: string): string {
  return fileName.replace(/\\/g, "/").split("/").pop()?.split(".").pop()?.toLowerCase() ?? "";
}
