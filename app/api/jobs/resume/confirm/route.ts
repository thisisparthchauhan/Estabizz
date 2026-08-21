import { NextRequest, NextResponse } from "next/server";

import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import { getResumeUploadDependencies } from "@/lib/jobs/resumeUpload";
import {
  confirmResumeUpload,
  parseResumeUploadConfirmBody,
  ResumeUploadAuthorizationError,
  ResumeUploadStorageError,
  ResumeUploadValidationError,
} from "@/lib/jobs/resumeUpload";
import { dispatchResumeParse } from "@/lib/jobs/resumeParsing/dispatch";
import {
  getClientIp,
  hashIdentifier,
  limitRequest,
  rateLimitResponse,
} from "@/lib/security/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateAccountSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Please log in to confirm your resume upload." }, { status: 401 });
    }

    const rateLimit = await limitRequest(
      {
        namespace: "jobs-resume-upload-confirm",
        identifier: hashIdentifier(`${session.candidateId}:${getClientIp(request)}`),
        limit: 12,
        windowSeconds: 900,
      },
      "fail-closed",
    );

    if (rateLimit.configMissing) {
      return NextResponse.json(
        { error: "Resume upload is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit, "Too many resume upload confirmations. Please try again later.");
    }

    const body = await request.json();
    const result = await confirmResumeUpload(
      session,
      parseResumeUploadConfirmBody(body),
      getResumeUploadDependencies(),
    );

    // Dispatch RESUME_PARSE job. If queue is not configured (blocked), return success — the
    // upload succeeded and processing will be triggered when the queue is configured.
    // If dispatch fails with an actual error, return 503 so the browser can retry the
    // confirm endpoint (which is idempotent) until dispatch succeeds.
    const dispatch = await dispatchResumeParse({
      resumeVersionId: result.resumeVersionId,
      candidateId: session.candidateId,
      actorRefId: session.actorRefId,
    });

    if (!dispatch.dispatched && !dispatch.blocked) {
      return NextResponse.json(
        { error: "Resume upload was saved but could not be queued for processing. Please try again." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ResumeUploadValidationError) {
      return NextResponse.json(
        { error: "Resume upload reference is invalid or expired." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof ResumeUploadAuthorizationError) {
      return NextResponse.json(
        { error: "You can only confirm uploads for your own account." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (error instanceof ResumeUploadStorageError) {
      return NextResponse.json(
        { error: "We could not verify the uploaded resume. Please try again." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { error: "We could not save your resume upload right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
