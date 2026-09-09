import { NextRequest, NextResponse } from "next/server";
import { requireCandidateAccountSessionFromRequest } from "@/lib/jobs/candidateIdentity/access";
import { getPublicJobBySlug } from "@/lib/jobs/jobManagement/repository";
import {
  findApplicationByJobAndCandidate,
  createApplication,
} from "@/lib/jobs/applicationManagement/repository";

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

  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const existing = await findApplicationByJobAndCandidate(job.id, session.candidateId);
  if (existing) {
    return NextResponse.json({ error: "Already applied", applicationId: existing.id }, { status: 409 });
  }

  let coverNote: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    coverNote = typeof body.coverNote === "string" ? body.coverNote.trim() || undefined : undefined;
  } catch {
    // no body
  }

  const application = await createApplication({
    jobId: job.id,
    candidateId: session.candidateId,
    actorRefId: session.actorRefId,
    coverNote,
  });

  return NextResponse.json({ applicationId: application.id }, { status: 201 });
}
