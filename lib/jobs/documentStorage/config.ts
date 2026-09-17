import type {
  DocumentStorageConfig,
  DocumentStorageEnvironment,
  DocumentStorageProvider,
  DocumentStorageValidationResult,
} from "./types";

const DEFAULT_MAX_UPLOAD_MB = 10;
const DEFAULT_UPLOAD_TTL_SECONDS = 600;
const DEFAULT_DOWNLOAD_TTL_SECONDS = 300;
const DEFAULT_TEMPORARY_UPLOAD_TTL_MINUTES = 60;

export function getDocumentStorageConfig(
  env: NodeJS.ProcessEnv = process.env,
): DocumentStorageConfig {
  const provider = parseProvider(env.JOBS_OBJECT_STORAGE_PROVIDER);
  const environment = parseEnvironment(env.APP_ENV || env.NEXT_PUBLIC_APP_ENV);

  return {
    configured: Boolean(
      provider &&
        env.JOBS_OBJECT_STORAGE_BUCKET &&
        env.JOBS_OBJECT_STORAGE_REGION &&
        env.JOBS_OBJECT_STORAGE_ACCESS_KEY_ID &&
        env.JOBS_OBJECT_STORAGE_SECRET_ACCESS_KEY,
    ),
    provider,
    environment,
    bucket: env.JOBS_OBJECT_STORAGE_BUCKET || "",
    region: env.JOBS_OBJECT_STORAGE_REGION || "",
    endpoint: env.JOBS_OBJECT_STORAGE_ENDPOINT || "",
    accessKeyId: env.JOBS_OBJECT_STORAGE_ACCESS_KEY_ID || "",
    secretAccessKey: env.JOBS_OBJECT_STORAGE_SECRET_ACCESS_KEY || "",
    forcePathStyle: parseBoolean(env.JOBS_OBJECT_STORAGE_FORCE_PATH_STYLE, false),
    maxUploadBytes: parseByteLimit(env),
    presignedUploadTtlSeconds: parsePositiveInteger(
      env.JOBS_DOCUMENT_PRESIGNED_UPLOAD_TTL_SECONDS,
      DEFAULT_UPLOAD_TTL_SECONDS,
    ),
    presignedDownloadTtlSeconds: parsePositiveInteger(
      env.JOBS_DOCUMENT_PRESIGNED_DOWNLOAD_TTL_SECONDS,
      DEFAULT_DOWNLOAD_TTL_SECONDS,
    ),
    temporaryUploadTtlMinutes: parsePositiveInteger(
      env.JOBS_DOCUMENT_TEMP_TTL_MINUTES,
      DEFAULT_TEMPORARY_UPLOAD_TTL_MINUTES,
    ),
    malwareScanningRequired: parseBoolean(env.JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED, true),
  };
}

export function validateDocumentStorageConfig(
  config: DocumentStorageConfig,
): DocumentStorageValidationResult {
  const errors: string[] = [];

  if (!config.provider) {
    errors.push("JOBS_OBJECT_STORAGE_PROVIDER must be s3-compatible.");
  }

  if (!config.bucket) {
    errors.push("JOBS_OBJECT_STORAGE_BUCKET is required.");
  }

  if (!config.region) {
    errors.push("JOBS_OBJECT_STORAGE_REGION is required.");
  }

  if (!config.endpoint) {
    errors.push("JOBS_OBJECT_STORAGE_ENDPOINT is required for S3-compatible storage.");
  }

  if (!config.accessKeyId) {
    errors.push("JOBS_OBJECT_STORAGE_ACCESS_KEY_ID is required.");
  }

  if (!config.secretAccessKey) {
    errors.push("JOBS_OBJECT_STORAGE_SECRET_ACCESS_KEY is required.");
  }

  if (config.maxUploadBytes <= 0) {
    errors.push("JOBS_DOCUMENT_MAX_UPLOAD_BYTES must be greater than zero.");
  }

  if (config.presignedUploadTtlSeconds > 600) {
    errors.push("JOBS_DOCUMENT_PRESIGNED_UPLOAD_TTL_SECONDS must not exceed 600.");
  }

  if (config.presignedDownloadTtlSeconds > 300) {
    errors.push("JOBS_DOCUMENT_PRESIGNED_DOWNLOAD_TTL_SECONDS must not exceed 300.");
  }

  if (config.environment !== "production" && /(^|[-_])prod(uction)?($|[-_])/i.test(config.bucket)) {
    errors.push("Non-production environments must not point at a production bucket.");
  }

  if (config.environment === "production" && /(^|[-_])(dev|staging)($|[-_])/i.test(config.bucket)) {
    errors.push("Production must not point at a development or staging bucket.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function parseProvider(value: string | undefined): DocumentStorageProvider | null {
  return value === "s3-compatible" ? value : null;
}

function parseEnvironment(value: string | undefined): DocumentStorageEnvironment {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

function parseByteLimit(env: NodeJS.ProcessEnv): number {
  if (env.JOBS_DOCUMENT_MAX_UPLOAD_BYTES) {
    return parsePositiveInteger(
      env.JOBS_DOCUMENT_MAX_UPLOAD_BYTES,
      DEFAULT_MAX_UPLOAD_MB * 1024 * 1024,
    );
  }

  return parsePositiveInteger(env.JOBS_DOCUMENT_MAX_UPLOAD_MB, DEFAULT_MAX_UPLOAD_MB) * 1024 * 1024;
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}
