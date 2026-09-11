import { NextRequest, NextResponse } from "next/server";

import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import {
  createS3CompatibleDocumentStorage,
  getDocumentStorageConfig,
} from "@/lib/jobs/documentStorage";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import {
  CandidateDeletionAuthorizationError,
  CandidateDeletionNotFoundError,
  CandidateDeletionStorageError,
  deleteCandidateData,
  PrismaCandidateDeletionRepository,
} from "@/lib/jobs/candidateDeletion";
import {
  getClientIp,
  hashIdentifier,
  limitRequest,
  rateLimitResponse,
} from "@/lib/security/rateLimit";

/**
 * Candidate self-service account deletion.
 *
 * The candidate id comes from the server-resolved session and is never read
 * from the request body, so there is no addressable way to erase someone else.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  let session: Awaited<ReturnType<typeof requireCandidateAccountSessionFromRequest>> = null;

  try {
    session = await requireCandidateAccountSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: "Please log in to delete your account." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    // Erasure is irreversible, so the budget is deliberately tight. Fail-closed
    // matches the other destructive candidate endpoints.
    const rateLimit = await limitRequest(
      {
        namespace: "jobs-account-delete",
        identifier: hashIdentifier(`${session.candidateId}:${getClientIp(request)}`),
        limit: 3,
        windowSeconds: 3600,
      },
      "fail-closed",
    );

    if (rateLimit.configMissing) {
      return NextResponse.json(
        { error: "Account deletion is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit, "Too many deletion requests. Please try again later.");
    }

    const result = await deleteCandidateData(
      {
        candidateId: session.candidateId,
        actorCandidateId: session.candidateId,
        actorRefId: session.actorRefId,
        reason: "candidate_request",
      },
      {
        repository: new PrismaCandidateDeletionRepository(),
        storage: createS3CompatibleDocumentStorage(getDocumentStorageConfig()),
      },
    );

    // Counts only. The audit row proves an erasure happened without
    // reintroducing any of the data that was just erased.
    await recordJobsAuditEvent({
      entityType: "candidate",
      entityId: session.candidateId,
      action: "candidate.account_deleted",
      actorType: "candidate_user",
      actorRefId: session.actorRefId,
      metadata: {
        status: result.status,
        storageObjectsDeleted: result.storageObjectsDeleted,
        rowsDeletedTotal: Object.values(result.rowsDeleted).reduce((sum, n) => sum + n, 0),
        rowsAnonymisedTotal: Object.values(result.rowsAnonymised).reduce((sum, n) => sum + n, 0),
        auditEventsMinimised: result.auditEventsMinimised,
      },
    });

    const response = NextResponse.json(
      { ok: true, status: result.status },
      { headers: { "Cache-Control": "no-store" } },
    );

    // The session now points at an account that no longer exists.
    response.cookies.set("auth_token", "", { httpOnly: true, path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    if (error instanceof CandidateDeletionAuthorizationError) {
      return NextResponse.json(
        { error: "You can only delete your own account." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof CandidateDeletionNotFoundError) {
      return NextResponse.json(
        { error: "Account was not found." },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof CandidateDeletionStorageError) {
      // Nothing was removed from the database, so a retry can still find the
      // objects. Surfaced as retryable rather than a silent partial deletion.
      console.error(
        `[account/delete] aborted: ${error.failedCount} stored document(s) could not be deleted`,
      );

      return NextResponse.json(
        { error: "We could not complete the deletion. Please try again." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error(
      "[account/delete] failed —",
      error instanceof Error ? error.message.slice(0, 200) : "unknown error",
    );

    return NextResponse.json(
      { error: "We could not delete your account right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
