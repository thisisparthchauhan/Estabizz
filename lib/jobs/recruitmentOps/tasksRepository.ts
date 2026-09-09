import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { JobsEntityType, TaskType, TaskPriority } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TaskRow {
  id: string;
  taskType: TaskType;
  title: string;
  description: string | null;
  entityType: JobsEntityType | null;
  entityId: string | null;
  assignedToRefId: string;
  assignedToName: string;
  createdByRefId: string;
  dueAt: Date | null;
  status: string;
  priority: TaskPriority;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  taskType: TaskType;
  title: string;
  description?: string;
  entityType?: JobsEntityType;
  entityId?: string;
  assignedToRefId: string;
  createdByRefId: string;
  dueAt?: Date;
  priority?: TaskPriority;
}

// ─── Reads ────────────────────────────────────────────────────────────────────

function mapTask(t: {
  id: string;
  task_type: TaskType;
  title: string;
  description: string | null;
  entity_type: JobsEntityType | null;
  entity_id: string | null;
  assigned_to_ref_id: string;
  assigned_to: { display_name_cache: string | null };
  created_by_ref_id: string;
  due_at: Date | null;
  status: string;
  priority: TaskPriority;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}): TaskRow {
  return {
    id: t.id,
    taskType: t.task_type,
    title: t.title,
    description: t.description,
    entityType: t.entity_type,
    entityId: t.entity_id,
    assignedToRefId: t.assigned_to_ref_id,
    assignedToName: t.assigned_to.display_name_cache ?? "Admin",
    createdByRefId: t.created_by_ref_id,
    dueAt: t.due_at,
    status: t.status,
    priority: t.priority,
    completedAt: t.completed_at,
    createdAt: t.created_at,
    updatedAt: t.updated_at,
  };
}

const TASK_SELECT = {
  id: true,
  task_type: true,
  title: true,
  description: true,
  entity_type: true,
  entity_id: true,
  assigned_to_ref_id: true,
  assigned_to: { select: { display_name_cache: true } },
  created_by_ref_id: true,
  due_at: true,
  status: true,
  priority: true,
  completed_at: true,
  created_at: true,
  updated_at: true,
} as const;

export async function listAllTasks(): Promise<{
  overdue: TaskRow[];
  today: TaskRow[];
  upcoming: TaskRow[];
  completed: TaskRow[];
}> {
  const prisma = getJobsPrismaClient();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 86400000);

  const [open, completed] = await Promise.all([
    prisma.task.findMany({
      where: { status: "open", deleted_at: null },
      select: TASK_SELECT,
      orderBy: { due_at: "asc" },
    }),
    prisma.task.findMany({
      where: { status: "completed", deleted_at: null },
      select: TASK_SELECT,
      orderBy: { completed_at: "desc" },
      take: 50,
    }),
  ]);

  const overdue = open.filter((t) => t.due_at && t.due_at < startOfToday).map(mapTask);
  const today = open
    .filter((t) => t.due_at && t.due_at >= startOfToday && t.due_at < endOfToday)
    .map(mapTask);
  const upcoming = open
    .filter((t) => !t.due_at || t.due_at >= endOfToday)
    .map(mapTask);

  return { overdue, today, upcoming, completed: completed.map(mapTask) };
}

export async function listTasksForEntity(
  entityType: JobsEntityType,
  entityId: string,
): Promise<TaskRow[]> {
  const prisma = getJobsPrismaClient();
  const tasks = await prisma.task.findMany({
    where: { entity_type: entityType, entity_id: entityId, deleted_at: null },
    select: TASK_SELECT,
    orderBy: [{ status: "asc" }, { due_at: "asc" }],
  });
  return tasks.map(mapTask);
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function createTask(input: CreateTaskInput): Promise<TaskRow> {
  const prisma = getJobsPrismaClient();
  const task = await prisma.task.create({
    data: {
      task_type: input.taskType,
      title: input.title,
      description: input.description ?? null,
      entity_type: input.entityType ?? null,
      entity_id: input.entityId ?? null,
      assigned_to_ref_id: input.assignedToRefId,
      created_by_ref_id: input.createdByRefId,
      due_at: input.dueAt ?? null,
      priority: input.priority ?? "normal",
    },
    select: TASK_SELECT,
  });
  return mapTask(task);
}

export async function completeTask(id: string, completedByRefId: string): Promise<boolean> {
  const prisma = getJobsPrismaClient();
  const existing = await prisma.task.findFirst({
    where: { id, deleted_at: null },
    select: { id: true },
  });
  if (!existing) return false;
  await prisma.task.update({
    where: { id },
    data: { status: "completed", completed_at: new Date(), completed_by_ref_id: completedByRefId },
  });
  return true;
}

export async function reopenTask(id: string): Promise<boolean> {
  const prisma = getJobsPrismaClient();
  const existing = await prisma.task.findFirst({
    where: { id, deleted_at: null },
    select: { id: true },
  });
  if (!existing) return false;
  await prisma.task.update({
    where: { id },
    data: { status: "open", completed_at: null, completed_by_ref_id: null },
  });
  return true;
}
