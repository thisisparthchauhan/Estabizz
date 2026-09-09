import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { updateInterview } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import type { InterviewStatus, InterviewFormat } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const body = await req.json();

    const updated = await updateInterview(id, {
      status: body.status as InterviewStatus | undefined,
      scheduledAt: body.scheduledAt !== undefined
        ? (body.scheduledAt ? new Date(body.scheduledAt) : null)
        : undefined,
      durationMinutes: body.durationMinutes !== undefined
        ? (body.durationMinutes ? Number(body.durationMinutes) : null)
        : undefined,
      locationOrLink: body.locationOrLink !== undefined
        ? (body.locationOrLink?.trim() || null)
        : undefined,
      notes: body.notes !== undefined ? (body.notes?.trim() || null) : undefined,
      format: body.format as InterviewFormat | undefined,
    });

    if (!updated) return NextResponse.json({ error: "Interview not found." }, { status: 404 });
    return NextResponse.json({ interview: updated });
  } catch (err) {
    console.error("[admin/interviews/[id] PATCH]", err);
    return NextResponse.json({ error: "Failed to update interview." }, { status: 500 });
  }
}
