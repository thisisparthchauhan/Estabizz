import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { ensureAdminIdentityRef } from "@/lib/jobs/jobManagement/repository";
import { updateNote, deleteNote } from "@/lib/jobs/recruitmentOps/notesRepository";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const body = await req.json();
    const { content } = body;
    if (!content?.trim()) return NextResponse.json({ error: "content required." }, { status: 400 });

    const note = await updateNote(id, content.trim());
    if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    await recordJobsAuditEvent({
      entityType: "note",
      entityId: id,
      action: "note.edited",
      actorType: "admin_user",
      actorRefId: adminRefId ?? undefined,
    });

    return NextResponse.json({ note });
  } catch (err) {
    console.error("[admin/notes/[id] PATCH]", err);
    return NextResponse.json({ error: "Failed to update note." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, "manage_jobs");
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const ok = await deleteNote(id);
    if (!ok) return NextResponse.json({ error: "Note not found." }, { status: 404 });

    const adminRefId = await ensureAdminIdentityRef(auth.admin.email, auth.admin.email);
    await recordJobsAuditEvent({
      entityType: "note",
      entityId: id,
      action: "note.deleted",
      actorType: "admin_user",
      actorRefId: adminRefId ?? undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/notes/[id] DELETE]", err);
    return NextResponse.json({ error: "Failed to delete note." }, { status: 500 });
  }
}
