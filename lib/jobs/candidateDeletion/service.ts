import {
  CandidateDeletionAuthorizationError,
  CandidateDeletionNotFoundError,
  CandidateDeletionStorageError,
  type CandidateDeletionRepository,
  type CandidateDeletionRequest,
  type CandidateDeletionResult,
  type CandidateDeletionStorage,
} from "./types";

export interface CandidateDeletionDependencies {
  repository: CandidateDeletionRepository;
  storage: CandidateDeletionStorage;
}

/**
 * Deletes a candidate's personal data.
 *
 * ORDER MATTERS. Storage objects are removed FIRST, while the rows that name
 * their keys still exist. Deleting rows first would leave any object whose
 * delete failed as an orphan nobody can find -- exactly the failure Phase 5
 * discovered and Phase 6 built a reaper for. If any object fails to delete, the
 * operation aborts before touching the database, so a retry can still find it.
 */
export async function deleteCandidateData(
  request: CandidateDeletionRequest,
  dependencies: CandidateDeletionDependencies,
): Promise<CandidateDeletionResult> {
  assertSelfService(request);

  const candidate = await dependencies.repository.loadCandidate(request.candidateId);

  if (!candidate) {
    // Covers a genuinely missing candidate and, importantly, a staff or admin
    // identity: those are not candidates and can never be reached here.
    throw new CandidateDeletionNotFoundError();
  }

  // 1. Storage first, always -- including on a repeat request, so an object
  //    left behind by an earlier partial failure is still swept up.
  const objectKeys = await dependencies.repository.listStoredObjectKeys(request.candidateId);
  let storageObjectsDeleted = 0;
  let storageObjectsFailed = 0;

  for (const objectKey of objectKeys) {
    try {
      await dependencies.storage.deleteObject(objectKey);
      storageObjectsDeleted += 1;
    } catch {
      storageObjectsFailed += 1;
    }
  }

  if (storageObjectsFailed > 0) {
    // Abort before any row is removed. The rows still name these keys, so a
    // retry can find them; proceeding would strand the bytes permanently.
    throw new CandidateDeletionStorageError(storageObjectsFailed);
  }

  // 2. A repeat request is a safe no-op beyond the storage sweep above.
  if (candidate.deletedAt) {
    return {
      status: "already_deleted",
      storageObjectsDeleted,
      storageObjectsFailed,
      rowsDeleted: {},
      rowsAnonymised: {},
      auditEventsMinimised: 0,
    };
  }

  // 3. Hard-delete the candidate's own personal data.
  const rowsDeleted = await dependencies.repository.purgeCandidateOwnedData(request.candidateId);

  // 4. Anonymise the records Estabizz must retain.
  const rowsAnonymised = await dependencies.repository.anonymiseRetainedRecords({
    candidateId: request.candidateId,
    actorRefId: request.actorRefId,
    reason: request.reason,
  });

  // 5. Keep the audit trail, strip the personal data out of it.
  const auditEventsMinimised = await dependencies.repository.minimiseAuditEvents(request.candidateId);

  return {
    status: "deleted",
    storageObjectsDeleted,
    storageObjectsFailed,
    rowsDeleted,
    rowsAnonymised,
    auditEventsMinimised,
  };
}

/**
 * A candidate may only erase themselves.
 *
 * Admin-initiated deletion is a separate, permission-checked entry point; it
 * must never be reachable by a candidate simply naming another candidate id.
 */
function assertSelfService(request: CandidateDeletionRequest): void {
  if (request.reason !== "candidate_request") {
    return;
  }

  if (!request.candidateId || request.candidateId !== request.actorCandidateId) {
    throw new CandidateDeletionAuthorizationError();
  }
}
