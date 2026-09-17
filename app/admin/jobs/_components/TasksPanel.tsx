"use client";

import { useState } from "react";

interface TaskRow {
  id: string;
  taskType: string;
  title: string;
  description: string | null;
  entityType: string | null;
  entityId: string | null;
  assignedToRefId: string;
  assignedToName: string;
  createdByRefId: string;
  dueAt: Date | null;
  status: string;
  priority: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

function fmt(d: Date | string | null) {
  if (!d) return "No due date";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
}

const PRIORITY_COLOURS: Record<string, string> = {
  high: "text-red-600 bg-red-50 border-red-200",
  normal: "text-[#1677f2] bg-[#eaf2ff] border-blue-200",
  low: "text-[#64748b] bg-[#f1f5f9] border-[#dbe7f3]",
};

interface Props {
  entityType: string;
  entityId: string;
  initialTasks: TaskRow[];
}

export default function TasksPanel({ entityType, entityId, initialTasks }: Props) {
  const [tasks, setTasks] = useState<TaskRow[]>(initialTasks);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [priority, setPriority] = useState("normal");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/jobs/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          taskType: "follow_up",
          entityType,
          entityId,
          dueAt: dueAt || undefined,
          priority,
        }),
      });
      if (!res.ok) { setError("Failed to create task."); return; }
      const data = await res.json();
      setTasks([...tasks, data.task]);
      setTitle(""); setDueAt(""); setPriority("normal"); setAdding(false);
    } catch { setError("Network error."); }
    finally { setSaving(false); }
  }

  async function handleComplete(id: string) {
    try {
      const res = await fetch(`/api/admin/jobs/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete" }),
      });
      if (res.ok) {
        setTasks(tasks.map((t) => t.id === id ? { ...t, status: "completed" } : t));
      }
    } catch { /* ignore */ }
  }

  const open = tasks.filter((t) => t.status === "open");
  const done = tasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-black uppercase tracking-widest text-[#64748b]">Follow-up Tasks</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-lg bg-[#1677f2] px-3 py-1.5 text-[12px] font-bold text-white hover:bg-[#1260d4] transition-colors"
          >
            + Add Task
          </button>
        )}
      </div>

      {adding && (
        <div className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-4 space-y-3">
          <input
            className="w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13.5px] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none"
            placeholder="Task title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            disabled={saving}
          />
          <div className="flex gap-3">
            <input
              type="date"
              className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              disabled={saving}
            />
            <select
              className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] focus:border-[#1677f2] focus:outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={saving}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          {error && <p className="text-[12px] font-bold text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              disabled={saving || !title.trim()}
              className="rounded-lg bg-[#1677f2] px-4 py-2 text-[12px] font-bold text-white disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Task"}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setTitle(""); setError(null); }}
              className="rounded-lg border border-[#dbe7f3] bg-white px-4 py-2 text-[12px] font-bold text-[#64748b]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {tasks.length === 0 && !adding && (
        <p className="text-[13px] text-[#94a3b8]">No tasks yet.</p>
      )}

      {open.length > 0 && (
        <div className="space-y-2">
          {open.map((t) => (
            <div key={t.id} className="flex items-start gap-3 rounded-xl border border-[#dbe7f3] bg-white p-3">
              <button
                type="button"
                onClick={() => handleComplete(t.id)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-2 border-[#cbd5e1] hover:border-[#1677f2] transition-colors"
                title="Mark complete"
              />
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-[#0a1628]">{t.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className={`rounded-full border px-2 py-0.5 font-bold ${PRIORITY_COLOURS[t.priority] ?? ""}`}
                  >
                    {t.priority}
                  </span>
                  <span className={t.dueAt && new Date(t.dueAt) < new Date() ? "font-bold text-red-600" : "text-[#94a3b8]"}>
                    Due {fmt(t.dueAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {done.length > 0 && (
        <details className="rounded-xl border border-[#dbe7f3] bg-white">
          <summary className="cursor-pointer px-4 py-3 text-[12px] font-bold text-[#64748b]">
            {done.length} completed task{done.length !== 1 ? "s" : ""}
          </summary>
          <div className="space-y-2 border-t border-[#dbe7f3] p-3">
            {done.map((t) => (
              <p key={t.id} className="text-[13px] text-[#94a3b8] line-through">{t.title}</p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
