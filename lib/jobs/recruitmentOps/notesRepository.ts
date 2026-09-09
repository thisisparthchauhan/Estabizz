import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { JobsEntityType } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NoteRow {
  id: string;
  content: string;
  isPinned: boolean;
  visibility: string;
  authorRefId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Reads ────────────────────────────────────────────────────────────────────

export async function listNotes(
  entityType: JobsEntityType,
  entityId: string,
): Promise<NoteRow[]> {
  const prisma = getJobsPrismaClient();
  const notes = await prisma.recruitmentNote.findMany({
    where: { entity_type: entityType, entity_id: entityId, deleted_at: null },
    select: {
      id: true,
      content: true,
      is_pinned: true,
      visibility: true,
      author_ref_id: true,
      author: { select: { display_name_cache: true } },
      created_at: true,
      updated_at: true,
    },
    orderBy: [{ is_pinned: "desc" }, { created_at: "desc" }],
  });

  return notes.map((n) => ({
    id: n.id,
    content: n.content,
    isPinned: n.is_pinned,
    visibility: n.visibility,
    authorRefId: n.author_ref_id,
    authorName: n.author.display_name_cache ?? "Admin",
    createdAt: n.created_at,
    updatedAt: n.updated_at,
  }));
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function createNote(
  entityType: JobsEntityType,
  entityId: string,
  content: string,
  authorRefId: string,
): Promise<NoteRow> {
  const prisma = getJobsPrismaClient();
  const note = await prisma.recruitmentNote.create({
    data: {
      entity_type: entityType,
      entity_id: entityId,
      content,
      author_ref_id: authorRefId,
    },
    select: {
      id: true,
      content: true,
      is_pinned: true,
      visibility: true,
      author_ref_id: true,
      author: { select: { display_name_cache: true } },
      created_at: true,
      updated_at: true,
    },
  });

  return {
    id: note.id,
    content: note.content,
    isPinned: note.is_pinned,
    visibility: note.visibility,
    authorRefId: note.author_ref_id,
    authorName: note.author.display_name_cache ?? "Admin",
    createdAt: note.created_at,
    updatedAt: note.updated_at,
  };
}

export async function updateNote(
  id: string,
  content: string,
): Promise<NoteRow | null> {
  const prisma = getJobsPrismaClient();
  const existing = await prisma.recruitmentNote.findFirst({
    where: { id, deleted_at: null },
    select: { id: true },
  });
  if (!existing) return null;

  const note = await prisma.recruitmentNote.update({
    where: { id },
    data: { content },
    select: {
      id: true,
      content: true,
      is_pinned: true,
      visibility: true,
      author_ref_id: true,
      author: { select: { display_name_cache: true } },
      created_at: true,
      updated_at: true,
    },
  });

  return {
    id: note.id,
    content: note.content,
    isPinned: note.is_pinned,
    visibility: note.visibility,
    authorRefId: note.author_ref_id,
    authorName: note.author.display_name_cache ?? "Admin",
    createdAt: note.created_at,
    updatedAt: note.updated_at,
  };
}

export async function deleteNote(id: string): Promise<boolean> {
  const prisma = getJobsPrismaClient();
  const existing = await prisma.recruitmentNote.findFirst({
    where: { id, deleted_at: null },
    select: { id: true },
  });
  if (!existing) return false;
  await prisma.recruitmentNote.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
  return true;
}
