import { NextRequest, NextResponse } from "next/server";

import {
  loadCandidateProfileReviewState,
  requireCandidateProfileSessionFromRequest,
} from "@/lib/jobs/profileReview/candidateAccess";
import {
  parseCandidateProfileReviewActionBody,
  runCandidateProfileReviewAction,
} from "@/lib/jobs/profileReview/reviewActions";
import {
  ProfileReviewAuthorizationError,
  ProfileReviewNotFoundError,
} from "@/lib/jobs/profileReview/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireCandidateProfileSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Please log in to review your profile." }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      state: await loadCandidateProfileReviewState(session),
    });
  } catch {
    return NextResponse.json(
      { error: "We could not load your profile review right now." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateProfileSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Please log in to review your profile." }, { status: 401 });
    }

    const body = await request.json();
    const action = parseCandidateProfileReviewActionBody(body);
    const result = await runCandidateProfileReviewAction(session, action);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ProfileReviewAuthorizationError) {
      return NextResponse.json({ error: "You can only review your own profile." }, { status: 403 });
    }

    if (error instanceof ProfileReviewNotFoundError) {
      return NextResponse.json({ error: "This profile suggestion could not be found." }, { status: 404 });
    }

    const message = error instanceof Error ? error.message : "";
    const status = message.includes("not found") ? 404 : 400;

    return NextResponse.json(
      { error: status === 404 ? "Candidate profile was not found." : "We could not save that profile update." },
      { status },
    );
  }
}
