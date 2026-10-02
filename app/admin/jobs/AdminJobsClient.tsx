"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { JobAdminRow } from "@/lib/jobs/jobManagement/repository";
import type { JobStatus } from "@prisma/client";

// ─── Status meta ──────────────────────────────────────────────────────────────

const STATUS_META: Record<JobStatus, { label: string; cls: string; dotCls: string }> = {
  draft:     { label: "Draft",     cls: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-[#1c1c20] dark:text-[#a1a1aa] dark:border-[#27272b]",       dotCls: "bg-slate-400" },
  open:      { label: "Open",      cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#132a20] dark:text-[#6ee7b7] dark:border-[#1d4a37]",  dotCls: "bg-emerald-500" },
  on_hold:   { label: "On Hold",   cls: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-[#2a2613] dark:border-[#4a431a] dark:text-[#fde047]",     dotCls: "bg-yellow-400" },
  closed:    { label: "Closed",    cls: "bg-red-50 text-red-600 border-red-200 dark:bg-[#2a1618] dark:border-[#4a2225] dark:text-[#fca5a5]",              dotCls: "bg-red-400" },
  filled:    { label: "Filled",    cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-[#1c1c20] dark:border-[#27272b] dark:text-[#60a5fa]",           dotCls: "bg-blue-500" },
  cancelled: { label: "Cancelled", cls: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-[#231a2e] dark:text-[#c4b5fd] dark:border-[#3a2a4a]",    dotCls: "bg-purple-400" },
};

function StatusBadge({ status }: { status: JobStatus }) {
  const m = STATUS_META[status] ?? { label: status, cls: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]", dotCls: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dotCls}`} />
      {m.label}
    </span>
  );
}

function fmt(d?: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const STATUS_TABS: Array<{ key: JobStatus | "all"; label: string }> = [
  { key: "all",       label: "All" },
  { key: "open",      label: "Open" },
  { key: "draft",     label: "Draft" },
  { key: "on_hold",   label: "On Hold" },
  { key: "closed",    label: "Closed" },
  { key: "filled",    label: "Filled" },
  { key: "cancelled", label: "Cancelled" },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  initialJobs: JobAdminRow[];
}

export default function AdminJobsClient({ initialJobs }: Props) {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState<JobStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<JobAdminRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const visible = useMemo(() => {
    let list = jobs;
    if (activeTab !== "all") list = list.filter((j) => j.status === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.job_code.toLowerCase().includes(q) ||
          (j.department ?? "").toLowerCase().includes(q) ||
          (j.location_text ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [jobs, activeTab, search]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/jobs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ msg: data.error ?? "Delete failed.", type: "err" });
      } else {
        setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
        setToast({ msg: "Job deleted.", type: "ok" });
      }
    } catch {
      setToast({ msg: "Network error.", type: "err" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
      setTimeout(() => setToast(null), 4000);
    }
  }

  const tabCounts = useMemo(() => {
    const counts: Partial<Record<JobStatus | "all", number>> = { all: jobs.length };
    for (const j of jobs) counts[j.status] = (counts[j.status] ?? 0) + 1;
    return counts;
  }, [jobs]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2] dark:text-[#4f9dfb]">
            Admin · Jobs
          </div>
          <h1 className="text-[28px] font-black leading-tight tracking-tight text-[#0a1628] dark:text-[#fafafa]">
            Job Postings
          </h1>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] dark:bg-[#1c1c20] px-5 py-2.5 text-[13.5px] font-black text-white hover:bg-[#1677f2] transition-colors"
        >
          + New Job
        </Link>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-[13px] font-bold ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-[#132a20] dark:text-[#6ee7b7] dark:border-[#1d4a37]" : "border-red-200 bg-red-50 text-red-700 dark:bg-[#2a1618] dark:text-[#fca5a5] dark:border-[#4a2225]"}`}>
          <span className={`h-2 w-2 rounded-full ${toast.type === "ok" ? "bg-emerald-500" : "bg-red-500"}`} />
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const count = tabCounts[tab.key] ?? 0;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-bold transition-colors ${active ? "border-[#1677f2] bg-[#1677f2] text-white" : "border-[#dbe7f3] bg-white text-[#64748b] hover:border-[#1677f2]/40 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]"}`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-white/20 text-white dark:bg-[#141417]" : "bg-[#f1f5f9] text-[#94a3b8] dark:bg-[#1c1c20]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          className="w-full max-w-sm rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]"
          placeholder="Search jobs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {visible.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] text-[14px] text-[#94a3b8] dark:border-[#27272b]">
          {jobs.length === 0 ? "No jobs yet. Create your first one." : "No jobs match the current filter."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#dbe7f3] bg-white dark:bg-[#141417] dark:border-[#27272b]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#dbe7f3] bg-[#f8fbff] dark:bg-[#141417] dark:border-[#27272b]">
                <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-[#64748b] text-[11px] dark:text-[#a1a1aa]">Job</th>
                <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-[#64748b] text-[11px] dark:text-[#a1a1aa]">Status</th>
                <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-[#64748b] text-[11px] dark:text-[#a1a1aa]">Location</th>
                <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-[#64748b] text-[11px] dark:text-[#a1a1aa]">Deadline</th>
                <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-[#64748b] text-[11px] dark:text-[#a1a1aa]">Public</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((job) => (
                <tr key={job.id} className="border-b border-[#f1f5f9] hover:bg-[#f8fbff] transition-colors last:border-0 dark:bg-[#141417] dark:border-[#27272b]">
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#0a1628] leading-tight dark:text-[#fafafa]">{job.title}</div>
                    <div className="mt-0.5 text-[11px] text-[#94a3b8]">
                      {job.job_code}
                      {job.department && <> · {job.department}</>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-3 text-[#64748b] dark:text-[#a1a1aa]">{job.location_text || "—"}</td>
                  <td className="px-4 py-3 text-[#64748b] dark:text-[#a1a1aa]">{fmt(job.closes_at)}</td>
                  <td className="px-4 py-3">
                    {job.is_public ? (
                      <span className="text-emerald-600 font-bold text-[11px] dark:text-[#6ee7b7]">Yes</span>
                    ) : (
                      <span className="text-[#94a3b8] text-[11px]">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      {job.is_public && (
                        <Link
                          href={`/jobs/${job.slug}`}
                          target="_blank"
                          className="rounded-lg border border-[#dbe7f3] px-3 py-1.5 text-[11px] font-bold text-[#64748b] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors dark:border-[#27272b] dark:text-[#a1a1aa]"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="rounded-lg border border-[#dbe7f3] px-3 py-1.5 text-[11px] font-bold text-[#64748b] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors dark:border-[#27272b] dark:text-[#a1a1aa]"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(job)}
                        className="rounded-lg border border-red-100 px-3 py-1.5 text-[11px] font-bold text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors dark:bg-[#2a1618] dark:border-[#4a2225] dark:text-[#fca5a5]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#141417]">
            <h3 className="text-[16px] font-black text-[#0a1628] dark:text-[#fafafa]">Delete job?</h3>
            <p className="mt-2 text-[13px] text-[#64748b] dark:text-[#a1a1aa]">
              "<strong>{deleteTarget.title}</strong>" will be removed. This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-[#dbe7f3] py-2.5 text-[13px] font-bold text-[#64748b] hover:border-[#1677f2]/40 transition-colors dark:border-[#27272b] dark:text-[#a1a1aa]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-[13px] font-bold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
