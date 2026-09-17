import type { PrivateDocumentStorage, TemporaryObjectSummary } from "../documentStorage/types";
import {
  emptyCleanupResult,
  resolveMinimumAgeMinutes,
  TEMPORARY_UPLOAD_PREFIX,
  type TemporaryUploadCleanupConfig,
  type TemporaryUploadCleanupResult,
} from "./types";

/**
 * Resolves which of the given keys are still referenced by a ResumeVersion.
 *
 * Throwing is meaningful: the caller treats an unresolved batch as "uncertain"
 * and deletes nothing from it.
 */
export type ReferencedKeyLookup = (objectKeys: string[]) => Promise<Set<string>>;

export interface TemporaryUploadCleanupDependencies {
  storage: Pick<PrivateDocumentStorage, "listTemporaryObjects" | "deleteObject">;
  findReferencedKeys: ReferencedKeyLookup;
  config: TemporaryUploadCleanupConfig;
  now?: () => Date;
}

/** Objects are checked against the database in batches of this size. */
const REFERENCE_BATCH_SIZE = 100;
const LIST_PAGE_SIZE = 200;

export async function cleanupTemporaryUploads(
  dependencies: TemporaryUploadCleanupDependencies,
): Promise<TemporaryUploadCleanupResult> {
  const { storage, findReferencedKeys, config } = dependencies;
  const now = dependencies.now ?? (() => new Date());
  const startedAt = Date.now();
  const result = emptyCleanupResult(config.dryRun);

  const minimumAgeMinutes = resolveMinimumAgeMinutes(config.minimumAgeMinutes);
  const cutoff = new Date(now().getTime() - minimumAgeMinutes * 60_000);

  let cursor: string | undefined;
  let batch: TemporaryObjectSummary[] = [];

  const flush = async () => {
    if (batch.length === 0) {
      return;
    }

    const current = batch;
    batch = [];

    let referenced: Set<string>;

    try {
      referenced = await findReferencedKeys(current.map((item) => item.objectKey));
    } catch {
      // Uncertain means untouched. A database hiccup must never be the reason a
      // candidate's confirmed resume disappears.
      result.errors += 1;
      result.skipped.reference_check_failed += current.length;
      return;
    }

    for (const item of current) {
      if (referenced.has(item.objectKey)) {
        result.skipped.referenced_by_resume_version += 1;
        continue;
      }

      if (result.deleted >= config.maxDeletions) {
        result.truncated = true;
        return;
      }

      if (config.dryRun) {
        result.deleted += 1;
        continue;
      }

      try {
        await storage.deleteObject(item.objectKey);
        result.deleted += 1;
      } catch {
        result.errors += 1;
      }
    }
  };

  do {
    const page = await storage.listTemporaryObjects({
      prefix: TEMPORARY_UPLOAD_PREFIX,
      limit: LIST_PAGE_SIZE,
      cursor,
    });

    for (const object of page.objects) {
      if (result.scanned >= config.maxScanned) {
        result.truncated = true;
        break;
      }

      result.scanned += 1;

      // Belt and braces: the adapter already restricts the prefix.
      if (!object.objectKey.startsWith(TEMPORARY_UPLOAD_PREFIX)) {
        result.skipped.outside_temporary_prefix += 1;
        continue;
      }

      if (object.lastModified > cutoff) {
        result.skipped.too_young += 1;
        continue;
      }

      batch.push(object);

      if (batch.length >= REFERENCE_BATCH_SIZE) {
        await flush();
      }
    }

    cursor = page.cursor;

    if (result.scanned >= config.maxScanned || result.deleted >= config.maxDeletions) {
      result.truncated = Boolean(cursor) || result.truncated;
      break;
    }
  } while (cursor);

  await flush();

  result.durationMs = Date.now() - startedAt;
  return result;
}
