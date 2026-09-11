/**
 * Operational dry-run of the temporary-upload orphan reaper.
 *
 * Reports what the sweep WOULD remove from the configured bucket. Never
 * deletes: dryRun is forced on regardless of environment configuration, and the
 * script refuses to run against production.
 *
 * Prints counts only -- never an object key, never a URL, never content.
 */
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
} from "../lib/jobs/documentStorage";
import { cleanupTemporaryUploads } from "../lib/jobs/temporaryUploadCleanup/service";
import { resolveMinimumAgeMinutes } from "../lib/jobs/temporaryUploadCleanup/types";

loadEnv({ path: ".env.local", quiet: true });

async function main() {
  const storageConfig = getDocumentStorageConfig();

  if (storageConfig.environment === "production") {
    throw new Error("Refused: this dry-run tool does not target production.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }),
  });

  const result = await cleanupTemporaryUploads({
    storage: createS3CompatibleDocumentStorage(storageConfig),
    findReferencedKeys: async (objectKeys) => {
      const rows = await prisma.resumeVersion.findMany({
        where: { file_storage_key: { in: objectKeys } },
        select: { file_storage_key: true },
      });
      return new Set(rows.map((row) => row.file_storage_key));
    },
    config: {
      minimumAgeMinutes: resolveMinimumAgeMinutes(storageConfig.temporaryUploadTtlMinutes),
      maxDeletions: 200,
      maxScanned: 2000,
      dryRun: true,
      environment: storageConfig.environment,
    },
  });

  console.log(JSON.stringify({ environment: storageConfig.environment, ...result }, null, 2));
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
