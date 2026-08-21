import { NextRequest, NextResponse } from "next/server";

import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import { getResumeUploadDependencies } from "@/lib/jobs/resumeUpload";
import {
  createResumeUploadIntent,
  parseResumeUploadIntentBody,
  ResumeUploadValidationError,
} from "@/lib/jobs/resumeUpload";
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
      return NextResponse.json({ error: "Please log in to upload your resume." }, { status: 401 });
    }

    const rateLimit = await limitRequest(
      {
        namespace: "jobs-resume-upload-intent",
        identifier: hashIdentifier(`${session.candidateId}:${getClientIp(request)}`),
        limit: 8,
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
      return rateLimitResponse(rateLimit, "Too many resume upload requests. Please try again later.");
    }

    const body = await request.json();
    const uploadIntent = await createResumeUploadIntent(
      session,
      parseResumeUploadIntentBody(body),
      getResumeUploadDependencies(),
    );

    return NextResponse.json({ ok: true, uploadIntent }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ResumeUploadValidationError) {
      return NextResponse.json(
        { error: "Please choose a valid PDF or DOCX resume.", issues: error.issues },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { error: "We could not prepare your resume upload right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
