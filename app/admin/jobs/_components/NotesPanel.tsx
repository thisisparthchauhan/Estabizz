"use client";

import { useState } from "react";

interface NoteRow {
  id: string;
  content: string;
  isPinned: boolean;
  visibility: string;
  authorRefId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

function fmt(d: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));
}

interface Props {
  entityType: string;
  entityId: string;
  initialNotes: NoteRow[];
}

export default function NotesPanel({ entityType, entityId, initialNotes }: Props) {
  const [notes, setNotes] = useState<NoteRow[]>(initialNotes);
  const [newContent, setNewContent] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!newContent.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/jobs/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType, entityId, content: newContent.trim() }),
      });
      if (!res.ok) { setError("Failed to add note."); return; }
      const data = await res.json();
      setNotes([data.note, ...notes]);
      setNewContent("");
      setAdding(false);
    } catch { setError("Network error."); }
    finally { setSaving(false); }
  }

  async function handleUpdate(id: string) {
    if (!editContent.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent.trim() }),
      });
      if (!res.ok) { setError("Failed to update note."); return; }
      const data = await res.json();
      setNotes(notes.map((n) => (n.id === id ? data.note : n)));
      setEditId(null);
    } catch { setError("Network error."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;
    try {
      const res = await fetch(`/api/admin/jobs/notes/${id}`, { method: "DELETE" });
      if (res.ok) setNotes(notes.filter((n) => n.id !== id));
    } catch { /* silently ignore */ }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-black uppercase tracking-widest text-[#64748b]">Recruiter Notes</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-lg bg-[#1677f2] px-3 py-1.5 text-[12px] font-bold text-white hover:bg-[#1260d4] transition-colors"
          >
            + Add Note
          </button>
        )}
      </div>

      {adding && (
        <div className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-4 space-y-3">
          <textarea
            className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13.5px] text-[#334155] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none resize-y min-h-[80px]"
            placeholder="Add a note…"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            autoFocus
            disabled={saving}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              disabled={saving || !newContent.trim()}
              className="rounded-lg bg-[#1677f2] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#1260d4] disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setNewContent(""); setError(null); }}
              className="rounded-lg border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#64748b] hover:border-[#1677f2]/40 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[12px] font-bold text-red-600">{error}</p>
      )}

      {notes.length === 0 ? (
        <p className="text-[13px] text-[#94a3b8]">No notes yet.</p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-xl border border-[#dbe7f3] bg-white p-4">
              {editId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    className="w-full rounded-xl border border-[#dbe7f3] px-3 py-2.5 text-[13.5px] focus:border-[#1677f2] focus:outline-none resize-y min-h-[80px]"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    disabled={saving}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdate(note.id)}
                      disabled={saving || !editContent.trim()}
                      className="rounded-lg bg-[#1677f2] px-3 py-1.5 text-[12px] font-bold text-white hover:bg-[#1260d4] disabled:opacity-50"
                    >
                      {saving ? "Saving…" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      className="rounded-lg border border-[#dbe7f3] px-3 py-1.5 text-[12px] font-bold text-[#64748b]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[13.5px] leading-7 text-[#334155] whitespace-pre-line">{note.content}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[11px] text-[#94a3b8]">
                      {note.authorName} · {fmt(note.createdAt)}
                      {note.updatedAt > note.createdAt && " (edited)"}
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => { setEditId(note.id); setEditContent(note.content); }}
                        className="text-[11px] font-bold text-[#64748b] hover:text-[#1677f2]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="text-[11px] font-bold text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
