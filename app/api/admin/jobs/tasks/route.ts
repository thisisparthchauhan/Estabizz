import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import { listAllTasks, createTask } from "@/lib/jobs/recruitmentOps/tasksRepository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import type { JobsEntityType, TaskType, TaskPriority } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const tasks = await listAllTasks();
    return NextResponse.json(tasks);
  } catch (err) {
    console.error("[admin/tasks GET]", err);
    return NextResponse.json({ error: "Failed to load tasks." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const { title, description, taskType, entityType, entityId, dueAt, priority } = body;

    if (!title?.trim()) return NextResponse.json({ error: "title required." }, { status: 400 });

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    const task = await createTask({
      taskType: (taskType as TaskType) ?? "follow_up",
      title: title.trim(),
      description: description?.trim() || undefined,
      entityType: entityType as JobsEntityType | undefined,
      entityId: entityId || undefined,
      assignedToRefId: adminRefId,
      createdByRefId: adminRefId,
      dueAt: dueAt ? new Date(dueAt) : undefined,
      priority: (priority as TaskPriority) ?? "normal",
    });

    await recordJobsAuditEvent({
      entityType: "task",
      entityId: task.id,
      action: "task.created",
      actorType: "admin_user",
      actorRefId: adminRefId ?? undefined,
      metadata: { title: task.title, taskType: task.taskType },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (err) {
    console.error("[admin/tasks POST]", err);
    return NextResponse.json({ error: "Failed to create task." }, { status: 500 });
  }
}
