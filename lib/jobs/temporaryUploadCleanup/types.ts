/**
 * Orphan reaper for the temporary upload prefix.
 *
 * An upload reaches private storage via a presigned PUT before `confirm`
 * creates the ResumeVersion. When confirm never happens -- the candidate closes
 * the tab, or dispatch fails -- the object is left with no database row and
 * nothing ever removes it. Phase 5 found a real one.
 *
 * Backblaze lifecycle rules cannot solve this: their granularity is whole days
 * (minimum 1) against a 60-minute retention target, and confirmed resumes also
 * live under `tmp/`, so a prefix rule would delete real candidate documents.
 * Hence an application-level sweep that checks each key against the database.
 */

export interface TemporaryUploadCleanupConfig {
  /** Objects younger than this are never considered. */
  minimumAgeMinutes: number;
  /** Upper bound on deletions per run. */
  maxDeletions: number;
  /** Upper bound on objects examined per run. */
  maxScanned: number;
  /** When true, nothing is deleted; the plan is still computed and reported. */
  dryRun: boolean;
  environment: "development" | "staging" | "production";
}

export type TemporaryUploadSkipReason =
  | "too_young"
  | "referenced_by_resume_version"
  | "reference_check_failed"
  | "outside_temporary_prefix";

export interface TemporaryUploadCleanupResult {
  scanned: number;
  deleted: number;
  skipped: Record<TemporaryUploadSkipReason, number>;
  /** True when the scan budget stopped the sweep before the listing ended. */
  truncated: boolean;
  dryRun: boolean;
  durationMs: number;
  errors: number;
}

/**
 * Hard floor, independent of configuration.
 *
 * A presigned upload URL may live up to 600s, and confirm runs after the PUT
 * completes. Deleting anything near that window could race a candidate who is
 * mid-upload, so no configured value may lower this.
 */
export const MINIMUM_AGE_FLOOR_MINUTES = 30;

/** Every temporary upload key is built under this prefix. */
export const TEMPORARY_UPLOAD_PREFIX = "tmp/candidates/";

export function resolveMinimumAgeMinutes(configuredMinutes: number): number {
  if (!Number.isFinite(configuredMinutes)) {
    return MINIMUM_AGE_FLOOR_MINUTES;
  }

  return Math.max(MINIMUM_AGE_FLOOR_MINUTES, Math.floor(configuredMinutes));
}

export function emptyCleanupResult(dryRun: boolean): TemporaryUploadCleanupResult {
  return {
    scanned: 0,
    deleted: 0,
    skipped: {
      too_young: 0,
      referenced_by_resume_version: 0,
      reference_check_failed: 0,
      outside_temporary_prefix: 0,
    },
    truncated: false,
    dryRun,
    durationMs: 0,
    errors: 0,
  };
}
