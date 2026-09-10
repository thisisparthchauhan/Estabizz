import { NextRequest, NextResponse } from "next/server";

import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import { getCandidateResumeStatus } from "@/lib/jobs/resumeStatus";
import {
  getClientIp,
  hashIdentifier,
  limitRequest,
  rateLimitResponse,
} from "@/lib/security/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireCandidateAccountSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: "Please log in to check your resume status." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    // This endpoint is polled while a resume processes, so the budget is far
    // wider than the upload endpoints. It is fail-open: a rate-limit store
    // outage should not make a candidate's page look stuck, and the endpoint is
    // a cheap read of the caller's own row.
    const rateLimit = await limitRequest(
      {
        namespace: "jobs-resume-status",
        identifier: hashIdentifier(`${session.candidateId}:${getClientIp(request)}`),
        limit: 120,
        windowSeconds: 300,
      },
      "fail-open",
    );

    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit, "Too many status checks. Please wait a moment.");
    }

    const status = await getCandidateResumeStatus(session);

    return NextResponse.json(
      { ok: true, ...status },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "We could not check your resume status right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
