import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  getDocumentStorageConfig,
  validateDocumentStorageConfig,
} from "./config";
import {
  assertDocumentWithinLimit,
  buildTemporaryUploadObjectKey,
  isAllowedDocumentMimeType,
  isSha256Hex,
  normalizeDocumentFilename,
} from "./policy";
import type {
  DocumentStorageConfig,
  MalwareScanStatus,
  PresignedDownloadRequest,
  PresignedDownloadTarget,
  PresignedUploadTarget,
  PrivateDocumentStorage,
  PrivateObjectMetadata,
  TemporaryDocumentUploadRequest,
} from "./types";

const MAX_UPLOAD_TTL_SECONDS = 600;
const MAX_DOWNLOAD_TTL_SECONDS = 300;

export class S3CompatibleDocumentStorage implements PrivateDocumentStorage {
  private readonly client: S3Client;

  constructor(private readonly config: DocumentStorageConfig) {
    const validation = validateDocumentStorageConfig(config);

    if (!validation.ok || !config.configured || !config.provider) {
      throw new Error(`Document storage is not configured: ${validation.errors.join(" ")}`);
    }

    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    });
  }

  async validateConfiguredBucket(): Promise<void> {
    await this.client.send(
      new HeadBucketCommand({
        Bucket: this.config.bucket,
      }),
    );
  }

  async createPresignedUpload(
    request: TemporaryDocumentUploadRequest,
  ): Promise<PresignedUploadTarget> {
    assertDocumentWithinLimit(request.contentLengthBytes, this.config.maxUploadBytes);

    if (request.sha256Hex && !isSha256Hex(request.sha256Hex)) {
      throw new Error("Document SHA-256 hash must be a 64-character hexadecimal value.");
    }

    const normalizedFilename = normalizeDocumentFilename(request.originalFilename, request.contentType);
    const objectKey = buildTemporaryUploadObjectKey({
      candidateId: request.candidateId,
      uploadId: request.uploadId,
      extension: normalizedFilename.extension,
    });
    const metadata = {
      "candidate-id": request.candidateId,
      "upload-kind": request.uploadKind,
      "requested-by-ref-id": request.requestedByRefId,
      "safe-filename": normalizedFilename.safeName,
      // No scanner exists. Do not imply one ran.
      "malware-scan-status": "not_scanned",
      ...(request.sha256Hex ? { sha256: request.sha256Hex.toLowerCase() } : {}),
    };
    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: objectKey,
      ContentType: request.contentType,
      ContentLength: request.contentLengthBytes,
      Metadata: metadata,
    });
    const expiresIn = Math.min(this.config.presignedUploadTtlSeconds, MAX_UPLOAD_TTL_SECONDS);
    const metadataHeaders = Object.keys(metadata).map((key) => `x-amz-meta-${key}`);
    const uploadUrl = await getSignedUrl(this.client, command, {
      expiresIn,
      unhoistableHeaders: new Set(metadataHeaders),
    });

    return {
      objectKey,
      uploadUrl,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
      requiredHeaders: {
        "Content-Type": request.contentType,
        ...toAmzMetadataHeaders(metadata),
      },
    };
  }

  async createPresignedDownload(
    request: PresignedDownloadRequest,
  ): Promise<PresignedDownloadTarget> {
    assertCandidateObjectKey(request.objectKey, request.candidateId);

    const responseContentDisposition =
      request.reason === "candidate_download" ? "attachment" : "inline";
    const command = new GetObjectCommand({
      Bucket: this.config.bucket,
      Key: request.objectKey,
      ResponseContentDisposition: `${responseContentDisposition}; filename="document"`,
    });
    const expiresIn = Math.min(this.config.presignedDownloadTtlSeconds, MAX_DOWNLOAD_TTL_SECONDS);
    const downloadUrl = await getSignedUrl(this.client, command, { expiresIn });

    return {
      objectKey: request.objectKey,
      downloadUrl,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
      responseContentDisposition,
    };
  }

  async getObjectMetadata(objectKey: string): Promise<PrivateObjectMetadata | null> {
    try {
      const response = await this.client.send(
        new HeadObjectCommand({
          Bucket: this.config.bucket,
          Key: objectKey,
        }),
      );
      const contentType = response.ContentType || "";

      if (!isAllowedDocumentMimeType(contentType)) {
        throw new Error("Stored object has an unsupported MIME type.");
      }

      return {
        objectKey,
        contentType,
        contentLengthBytes: response.ContentLength || 0,
        sha256Hex: normalizeSha256Metadata(response.Metadata?.sha256),
        uploadedAt: response.LastModified || new Date(0),
        malwareScanStatus: normalizeMalwareScanStatus(response.Metadata?.["malware-scan-status"]),
      };
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }

  async getObjectRange(
    objectKey: string,
    start: number,
    endInclusive: number,
  ): Promise<Uint8Array | null> {
    if (!Number.isInteger(start) || !Number.isInteger(endInclusive) || start < 0 || endInclusive < start) {
      throw new Error("Object byte range is invalid.");
    }

    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: this.config.bucket,
          Key: objectKey,
          Range: `bytes=${start}-${endInclusive}`,
        }),
      );

      if (!response.Body) {
        return null;
      }

      return await response.Body.transformToByteArray();
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }

  async deleteObject(objectKey: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.config.bucket,
        Key: objectKey,
      }),
    );
  }
}

export function createS3CompatibleDocumentStorage(
  config: DocumentStorageConfig = getDocumentStorageConfig(),
): PrivateDocumentStorage {
  return new S3CompatibleDocumentStorage(config);
}

function toAmzMetadataHeaders(metadata: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [`x-amz-meta-${key}`, value]),
  );
}

function assertCandidateObjectKey(objectKey: string, candidateId: string): void {
  const finalPrefix = `candidates/${candidateId}/`;
  const temporaryPrefix = `tmp/candidates/${candidateId}/`;

  if (!objectKey.startsWith(finalPrefix) && !objectKey.startsWith(temporaryPrefix)) {
    throw new Error("Document object key does not belong to the requested candidate.");
  }
}

function normalizeSha256Metadata(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return isSha256Hex(normalized) ? normalized : undefined;
}

function normalizeMalwareScanStatus(value: string | undefined): MalwareScanStatus {
  if (
    value === "not_scanned" ||
    value === "pending" ||
    value === "clean" ||
    value === "infected" ||
    value === "failed" ||
    value === "skipped"
  ) {
    return value;
  }

  // Unknown or absent metadata means nobody scanned this object.
  return "not_scanned";
}

function isNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as { name?: string; $metadata?: { httpStatusCode?: number } };
  return (
    maybeError.name === "NotFound" ||
    maybeError.name === "NoSuchKey" ||
    maybeError.$metadata?.httpStatusCode === 404
  );
}
