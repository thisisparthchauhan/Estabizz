"use client";

import { useState } from "react";
import Link from "next/link";
interface TaskRow { id: string; taskType: string; title: string; description: string | null; entityType: string | null; entityId: string | null; assignedToRefId: string; assignedToName: string; createdByRefId: string; dueAt: Date | null; status: string; priority: string; completedAt: Date | null; createdAt: Date; updatedAt: Date; }

function fmt(d: Date | string | null) {
  if (!d) return "No due date";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
}

const PRIORITY_COLOURS: Record<string, string> = {
  high: "text-red-600 bg-red-50 border border-red-200",
  normal: "text-[#1677f2] bg-[#eaf2ff] border border-blue-200",
  low: "text-[#64748b] bg-[#f1f5f9] border border-[#dbe7f3]",
};

function entityLink(task: TaskRow) {
  if (!task.entityType || !task.entityId) return null;
  if (task.entityType === "application") return `/admin/jobs/applications/${task.entityId}`;
  if (task.entityType === "candidate") return `/admin/jobs/candidates/${task.entityId}`;
  return null;
}

interface SectionProps {
  title: string;
  tasks: TaskRow[];
  accent?: string;
  onComplete?: (id: string) => void;
  onReopen?: (id: string) => void;
}

function TaskSection({ title, tasks, accent, onComplete, onReopen }: SectionProps) {
  if (tasks.length === 0) return null;
  return (
    <div>
      <h2 className={`mb-3 text-[12px] font-black uppercase tracking-widest ${accent ?? "text-[#64748b]"}`}>
        {title} ({tasks.length})
      </h2>
      <div className="space-y-2">
        {tasks.map((t) => {
          const link = entityLink(t);
          return (
            <div key={t.id} className="flex items-start gap-3 rounded-xl border border-[#dbe7f3] bg-white p-4">
              <div className="mt-0.5 shrink-0">
                {onComplete && t.status === "open" && (
                  <button
                    type="button"
                    onClick={() => onComplete(t.id)}
                    className="h-4 w-4 rounded border-2 border-[#cbd5e1] hover:border-[#1677f2] transition-colors"
                    title="Mark complete"
                  />
                )}
                {onReopen && t.status === "completed" && (
                  <button
                    type="button"
                    onClick={() => onReopen(t.id)}
                    className="h-4 w-4 rounded bg-emerald-400 hover:bg-emerald-500 transition-colors flex items-center justify-center"
                    title="Reopen"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-[#0a1628] text-[13.5px] ${t.status === "completed" ? "line-through text-[#94a3b8]" : ""}`}>
                  {t.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className={`rounded-full px-2 py-0.5 font-bold ${PRIORITY_COLOURS[t.priority] ?? ""}`}>
                    {t.priority}
                  </span>
                  <span className={t.dueAt && new Date(t.dueAt) < new Date() && t.status !== "completed" ? "font-bold text-red-600" : "text-[#94a3b8]"}>
                    Due {fmt(t.dueAt)}
                  </span>
                  <span className="text-[#94a3b8]">→ {t.assignedToName}</span>
                  {link && (
                    <Link href={link} className="text-[#1677f2] hover:underline">
                      View {t.entityType}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  tasks: {
    overdue: TaskRow[];
    today: TaskRow[];
    upcoming: TaskRow[];
    completed: TaskRow[];
  };
}

export default function AdminTasksClient({ tasks: initial }: Props) {
  const [overdue, setOverdue] = useState(initial.overdue);
  const [today, setToday] = useState(initial.today);
  const [upcoming, setUpcoming] = useState(initial.upcoming);
  const [completed, setCompleted] = useState(initial.completed);

  async function handleComplete(id: string) {
    await fetch(`/api/admin/jobs/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "complete" }),
    });
    const move = (arr: TaskRow[]) => arr.filter((t) => t.id !== id);
    const task = [...overdue, ...today, ...upcoming].find((t) => t.id === id);
    if (task) {
      setOverdue(move(overdue));
      setToday(move(today));
      setUpcoming(move(upcoming));
      setCompleted([{ ...task, status: "completed" }, ...completed]);
    }
  }

  async function handleReopen(id: string) {
    await fetch(`/api/admin/jobs/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reopen" }),
    });
    const task = completed.find((t) => t.id === id);
    if (task) {
      setCompleted(completed.filter((t) => t.id !== id));
      setUpcoming([{ ...task, status: "open" }, ...upcoming]);
    }
  }

  const totalOpen = overdue.length + today.length + upcoming.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[26px] font-black text-[#0a1628]">Tasks</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">{totalOpen} open · {completed.length} completed</p>
      </div>

      <TaskSection
        title="Overdue"
        tasks={overdue}
        accent="text-red-600"
        onComplete={handleComplete}
      />
      <TaskSection
        title="Due Today"
        tasks={today}
        accent="text-[#b8860b]"
        onComplete={handleComplete}
      />
      <TaskSection
        title="Upcoming"
        tasks={upcoming}
        onComplete={handleComplete}
      />

      {completed.length > 0 && (
        <details className="rounded-2xl border border-[#dbe7f3] bg-white">
          <summary className="cursor-pointer px-5 py-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">
            Completed ({completed.length})
          </summary>
          <div className="border-t border-[#dbe7f3] p-4 space-y-2">
            {completed.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-[#94a3b8] line-through">{t.title}</p>
                <button
                  type="button"
                  onClick={() => handleReopen(t.id)}
                  className="shrink-0 rounded-lg border border-[#dbe7f3] px-2.5 py-1 text-[11px] font-bold text-[#64748b] hover:border-[#1677f2] hover:text-[#1677f2] transition-colors"
                >
                  Reopen
                </button>
              </div>
            ))}
          </div>
        </details>
      )}

      {totalOpen === 0 && completed.length === 0 && (
        <p className="text-[13px] text-[#94a3b8]">No tasks yet.</p>
      )}
    </div>
  );
}
