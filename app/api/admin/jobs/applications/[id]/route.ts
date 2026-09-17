import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import {
  getApplicationForAdmin,
  updateApplicationStage,
} from "@/lib/jobs/applicationManagement/repository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const application = await getApplicationForAdmin(id);
    if (!application) return NextResponse.json({ error: "Not found." }, { status: 404 });

    return NextResponse.json({ application });
  } catch (err) {
    console.error("[admin/applications/[id] GET]", err);
    return NextResponse.json({ error: "Failed to load application." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const body = await req.json();
    const { stageId } = body;
    if (!stageId || typeof stageId !== "string") {
      return NextResponse.json({ error: "stageId is required." }, { status: 400 });
    }

    // Verify the stage exists before updating
    const { getJobsPrismaClient } = await import("@/lib/jobs/prisma");
    const stage = await getJobsPrismaClient().applicationStage.findFirst({
      where: { id: stageId, is_active: true },
      select: { id: true },
    });
    if (!stage) return NextResponse.json({ error: "Invalid stage." }, { status: 422 });

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    const updated = await updateApplicationStage(id, stageId, adminRefId);
    if (!updated) return NextResponse.json({ error: "Application not found." }, { status: 404 });

    await recordJobsAuditEvent({
      entityType: "application",
      entityId: id,
      action: "application.stage_changed",
      actorType: "admin_user",
      actorRefId: adminRefId ?? undefined,
      changedFields: ["stage_id"],
      metadata: { stageId },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/applications/[id] PATCH]", err);
    return NextResponse.json({ error: "Failed to update stage." }, { status: 500 });
  }
}
