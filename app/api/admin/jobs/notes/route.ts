import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import { listNotes, createNote } from "@/lib/jobs/recruitmentOps/notesRepository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import type { JobsEntityType } from "@prisma/client";

export const dynamic = "force-dynamic";

const VALID_ENTITY_TYPES: JobsEntityType[] = [
  "candidate", "application", "job", "organization", "interview",
];

export async function GET(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get("entityType") as JobsEntityType | null;
    const entityId = searchParams.get("entityId");

    if (!entityType || !VALID_ENTITY_TYPES.includes(entityType) || !entityId) {
      return NextResponse.json({ error: "entityType and entityId are required." }, { status: 400 });
    }

    const notes = await listNotes(entityType, entityId);
    return NextResponse.json({ notes });
  } catch (err) {
    console.error("[admin/notes GET]", err);
    return NextResponse.json({ error: "Failed to load notes." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const { entityType, entityId, content } = body;

    if (!entityType || !VALID_ENTITY_TYPES.includes(entityType as JobsEntityType)) {
      return NextResponse.json({ error: "Invalid entityType." }, { status: 400 });
    }
    if (!entityId) return NextResponse.json({ error: "entityId required." }, { status: 400 });
    if (!content?.trim()) return NextResponse.json({ error: "content required." }, { status: 400 });

    const authorRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    const note = await createNote(entityType as JobsEntityType, entityId, content.trim(), authorRefId);

    await recordJobsAuditEvent({
      entityType: "note",
      entityId: note.id,
      action: "note.created",
      actorType: "admin_user",
      actorRefId: authorRefId ?? undefined,
      metadata: { parentEntityType: entityType, parentEntityId: entityId },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (err) {
    console.error("[admin/notes POST]", err);
    return NextResponse.json({ error: "Failed to create note." }, { status: 500 });
  }
}
