import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import { completeTask, reopenTask } from "@/lib/jobs/recruitmentOps/tasksRepository";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const body = await req.json();
    const { action } = body;

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);

    let ok = false;
    if (action === "complete") {
      ok = await completeTask(id, adminRefId);
    } else if (action === "reopen") {
      ok = await reopenTask(id);
    } else {
      return NextResponse.json({ error: "Invalid action. Use complete or reopen." }, { status: 400 });
    }

    if (!ok) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/tasks/[id] PATCH]", err);
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}
