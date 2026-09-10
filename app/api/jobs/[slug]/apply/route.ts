import { NextRequest, NextResponse } from "next/server";
import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import { getPublicJobBySlug } from "@/lib/jobs/jobManagement/repository";
import {
  findApplicationByJobAndCandidate,
  createApplication,
} from "@/lib/jobs/applicationManagement/repository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import { limitRequest, rateLimitResponse, hashIdentifier, getClientIp } from "@/lib/security/rateLimit";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const session = await requireCandidateAccountSessionFromRequest(req);
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });

  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const existing = await findApplicationByJobAndCandidate(job.id, session.candidateId);
  return NextResponse.json({ alreadyApplied: Boolean(existing), application: existing ?? null });
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireCandidateAccountSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  // Rate limit: per-candidate (10/24h) and per-IP (30/24h) — both fail-open
  const [candidateResult, ipResult] = await Promise.all([
    limitRequest(
      { namespace: "jobs:apply:candidate", identifier: hashIdentifier(session.candidateId), limit: 10, windowSeconds: 86400 },
      "fail-open"
    ),
    limitRequest(
      { namespace: "jobs:apply:ip", identifier: hashIdentifier(getClientIp(req)), limit: 30, windowSeconds: 86400 },
      "fail-open"
    ),
  ]);
  if (!candidateResult.allowed) {
    return rateLimitResponse(candidateResult, "Application limit reached. Please wait before applying again.");
  }
  if (!ipResult.allowed) {
    return rateLimitResponse(ipResult, "Too many applications from this IP. Please try again later.");
  }

  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const existing = await findApplicationByJobAndCandidate(job.id, session.candidateId);
  if (existing) {
    return NextResponse.json({ error: "Already applied", applicationId: existing.id }, { status: 409 });
  }

  const COVER_NOTE_MAX = 5000;
  let coverNote: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body.coverNote === "string") {
      const trimmed = body.coverNote.trim();
      if (trimmed.length > COVER_NOTE_MAX) {
        return NextResponse.json({ error: `Cover note must be ${COVER_NOTE_MAX} characters or fewer.` }, { status: 422 });
      }
      coverNote = trimmed || undefined;
    }
  } catch {
    // no body
  }

  const application = await createApplication({
    jobId: job.id,
    candidateId: session.candidateId,
    actorRefId: session.actorRefId,
    coverNote,
  });

  await recordJobsAuditEvent({
    entityType: "application",
    entityId: application.id,
    action: "application.submitted",
    actorType: "candidate_user",
    actorRefId: session.actorRefId,
    metadata: { jobId: job.id, jobSlug: slug },
  });

  return NextResponse.json({ applicationId: application.id }, { status: 201 });
}
