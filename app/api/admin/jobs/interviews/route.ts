import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import { listAllInterviews, createInterview } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import type { InterviewType, InterviewFormat } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const interviews = await listAllInterviews();
    return NextResponse.json({ interviews });
  } catch (err) {
    console.error("[admin/interviews GET]", err);
    return NextResponse.json({ error: "Failed to load interviews." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const {
      applicationId, interviewType, roundNumber,
      scheduledAt, durationMinutes, locationOrLink, format, notes,
    } = body;

    if (!applicationId) return NextResponse.json({ error: "applicationId required." }, { status: 400 });
    if (!interviewType) return NextResponse.json({ error: "interviewType required." }, { status: 400 });

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    const interview = await createInterview({
      applicationId,
      interviewType: interviewType as InterviewType,
      roundNumber: roundNumber ? Number(roundNumber) : 1,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
      locationOrLink: locationOrLink?.trim() || undefined,
      format: format as InterviewFormat | undefined,
      notes: notes?.trim() || undefined,
      createdByRefId: adminRefId,
    });

    return NextResponse.json({ interview }, { status: 201 });
  } catch (err) {
    console.error("[admin/interviews POST]", err);
    return NextResponse.json({ error: "Failed to create interview." }, { status: 500 });
  }
}
