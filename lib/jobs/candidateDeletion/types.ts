/**
 * Candidate privacy deletion.
 *
 * THE POLICY, in one sentence: everything that is the candidate's personal data
 * is hard-deleted; the records Estabizz must keep are anonymised in place; the
 * security audit trail survives with its personal data stripped.
 *
 * Why the Candidate row is anonymised rather than deleted: Application,
 * Placement and AIScore carry recruitment and commercial history Estabizz has a
 * legitimate basis to retain. Deleting the row would either destroy that
 * history or be blocked outright, since those relations are onDelete: NoAction.
 * Anonymising removes the person while leaving the business record intact.
 */

export interface CandidateDeletionRequest {
  candidateId: string;
  /** Server-resolved. Never accepted from a request body. */
  actorCandidateId: string;
  actorRefId: string;
  reason: "candidate_request" | "admin_request" | "retention_policy";
}

export type CandidateDeletionStatus = "deleted" | "already_deleted";

export interface CandidateDeletionResult {
  status: CandidateDeletionStatus;
  /** Storage objects removed before their rows were deleted. */
  storageObjectsDeleted: number;
  /** Objects whose deletion failed; their rows are deliberately kept. */
  storageObjectsFailed: number;
  rowsDeleted: Record<string, number>;
  rowsAnonymised: Record<string, number>;
  auditEventsMinimised: number;
}

export class CandidateDeletionAuthorizationError extends Error {
  constructor(message = "You can only delete your own candidate account.") {
    super(message);
    this.name = "CandidateDeletionAuthorizationError";
  }
}

export class CandidateDeletionNotFoundError extends Error {
  constructor(message = "Candidate account was not found.") {
    super(message);
    this.name = "CandidateDeletionNotFoundError";
  }
}

/**
 * Raised when a storage object could not be removed.
 *
 * Deliberately fatal: if the bytes survive, the database row that names them
 * must survive too, or the object becomes an untraceable orphan.
 */
export class CandidateDeletionStorageError extends Error {
  constructor(readonly failedCount: number) {
    super(`Could not delete ${failedCount} stored document(s).`);
    this.name = "CandidateDeletionStorageError";
  }
}

/** Replaces a deleted person's name wherever a non-null value must remain. */
export const ANONYMISED_NAME = "Deleted";
export const ANONYMISED_AUDIT_TOMBSTONE = { redacted: "candidate_deleted" } as const;

export interface CandidateDeletionRepository {
  /** Returns null when no such candidate exists. Staff records are never candidates. */
  loadCandidate(_candidateId: string): Promise<{
    id: string;
    deletedAt: Date | null;
    identityRefId: string | null;
  } | null>;
  listStoredObjectKeys(_candidateId: string): Promise<string[]>;
  purgeCandidateOwnedData(_candidateId: string): Promise<Record<string, number>>;
  anonymiseRetainedRecords(_input: {
    candidateId: string;
    actorRefId: string;
    reason: string;
  }): Promise<Record<string, number>>;
  minimiseAuditEvents(_candidateId: string): Promise<number>;
}

export interface CandidateDeletionStorage {
  deleteObject(_objectKey: string): Promise<void>;
}
