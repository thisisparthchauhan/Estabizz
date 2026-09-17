import "server-only";

import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
} from "@/lib/jobs/documentStorage";
import { getJobsPrismaClient } from "@/lib/jobs/prisma";

import type { ReferencedKeyLookup, TemporaryUploadCleanupDependencies } from "./service";
import { resolveMinimumAgeMinutes, type TemporaryUploadCleanupConfig } from "./types";

const DEFAULT_MAX_DELETIONS = 200;
const DEFAULT_MAX_SCANNED = 2000;

export function getTemporaryUploadCleanupConfig(
  env: NodeJS.ProcessEnv = process.env,
): TemporaryUploadCleanupConfig {
  const storage = getDocumentStorageConfig(env);

  return {
    // The previously dead JOBS_DOCUMENT_TEMP_TTL_MINUTES finally drives
    // something, floored so configuration cannot create an upload race.
    minimumAgeMinutes: resolveMinimumAgeMinutes(storage.temporaryUploadTtlMinutes),
    maxDeletions: parsePositiveInteger(env.JOBS_DOCUMENT_CLEANUP_MAX_DELETIONS, DEFAULT_MAX_DELETIONS),
    maxScanned: parsePositiveInteger(env.JOBS_DOCUMENT_CLEANUP_MAX_SCANNED, DEFAULT_MAX_SCANNED),
    // Opt-in destructive mode: a deployment that has not explicitly set this
    // reports what it would remove and removes nothing.
    dryRun: env.JOBS_DOCUMENT_CLEANUP_ENABLED !== "true",
    environment: storage.environment,
  };
}

export function getTemporaryUploadCleanupDependencies(): TemporaryUploadCleanupDependencies {
  const storageConfig = getDocumentStorageConfig();

  return {
    storage: createS3CompatibleDocumentStorage(storageConfig),
    findReferencedKeys: createPrismaReferencedKeyLookup(),
    config: getTemporaryUploadCleanupConfig(),
  };
}

/**
 * Looks up which keys a ResumeVersion still points at.
 *
 * Deliberately ignores `deleted_at`: a soft-deleted resume still owns its
 * object, and this sweep is only ever meant to remove objects nothing knows
 * about.
 */
export function createPrismaReferencedKeyLookup(
  prisma = getJobsPrismaClient(),
): ReferencedKeyLookup {
  return async (objectKeys: string[]) => {
    if (objectKeys.length === 0) {
      return new Set<string>();
    }

    const rows = await prisma.resumeVersion.findMany({
      where: { file_storage_key: { in: objectKeys } },
      select: { file_storage_key: true },
    });

    return new Set(rows.map((row) => row.file_storage_key));
  };
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
