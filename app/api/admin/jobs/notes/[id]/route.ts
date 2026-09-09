import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/requirePermission";
import { updateNote, deleteNote } from "@/lib/jobs/recruitmentOps/notesRepository";

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
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/notes/[id] DELETE]", err);
    return NextResponse.json({ error: "Failed to delete note." }, { status: 500 });
  }
}
