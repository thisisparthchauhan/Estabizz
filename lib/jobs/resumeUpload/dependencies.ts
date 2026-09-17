import "server-only";

import { getDocumentStorageConfig, createS3CompatibleDocumentStorage } from "@/lib/jobs/documentStorage";
import { PrismaResumeUploadRepository } from "./prismaRepository";
import type { ResumeUploadDependencies } from "./types";

export function getResumeUploadDependencies(): ResumeUploadDependencies {
  const config = getDocumentStorageConfig();
  const tokenSecret = process.env.JOBS_RESUME_UPLOAD_TOKEN_SECRET || process.env.JWT_SECRET || "";

  return {
    storage: createS3CompatibleDocumentStorage(config),
    repository: new PrismaResumeUploadRepository(),
    maxUploadBytes: config.maxUploadBytes,
    presignedUploadTtlSeconds: config.presignedUploadTtlSeconds,
    tokenSecret,
  };
}
