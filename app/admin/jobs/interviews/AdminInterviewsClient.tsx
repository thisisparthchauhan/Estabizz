"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { InterviewRow } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import type { PaginatedResult } from "@/lib/jobs/applicationManagement/repository";

function fmt(d: Date | string | null) {
  if (!d) return "TBD";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));
}

const TYPE_LABELS: Record<string, string> = {
  phone_screen: "Phone Screen",
  video_call: "Video Call",
  in_person: "In-Person",
  panel: "Panel",
  technical: "Technical",
  hr: "HR",
  final: "Final",
};

const STATUS_COLOURS: Record<string, string> = {
  scheduled: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-[#1c1c20] dark:border-[#27272b] dark:text-[#60a5fa]",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#132a20] dark:text-[#6ee7b7] dark:border-[#1d4a37]",
  cancelled: "bg-red-50 text-red-600 border border-red-200 dark:bg-[#2a1618] dark:text-[#fca5a5] dark:border-[#4a2225]",
  no_show: "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-[#2a1d13] dark:text-[#fdba74] dark:border-[#4a3320]",
};

const STATUSES = ["all", "scheduled", "completed", "cancelled", "no_show"];

interface Props {
  result: PaginatedResult<InterviewRow>;
  initialSearch: string;
  initialStatus: string;
}

export default function AdminInterviewsClient({ result, initialSearch, initialStatus }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams(params);
    startTransition(() => router.push(`?${sp.toString()}`));
  }

  function handleSearchSubmit() {
    navigate({ search, status: initialStatus, page: "1" });
  }

  function handleStatusChange(status: string) {
    navigate({ search, status, page: "1" });
  }

  function handlePage(p: number) {
    navigate({ search, status: initialStatus, page: String(p) });
  }

  const { items: interviews, total, page, totalPages } = result;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[26px] font-black text-[#0a1628] dark:text-[#fafafa]">Interviews</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b] dark:text-[#a1a1aa]">{total} total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="w-56 rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none dark:bg-[#141417] dark:border-[#27272b]"
          placeholder="Search candidate or job…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          onBlur={handleSearchSubmit}
        />
        <select
          className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#334155] focus:border-[#1677f2] focus:outline-none dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]"
          value={initialStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All Statuses" : s.replace("_", " ")}</option>
          ))}
        </select>
        {isPending && <span className="self-center text-[12px] text-[#94a3b8] dark:text-[#71717a]">Loading…</span>}
      </div>

      {interviews.length === 0 ? (
        <p className="text-[13px] text-[#94a3b8] dark:text-[#71717a]">No interviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#dbe7f3] bg-white dark:bg-[#141417] dark:border-[#27272b]">
          <table className="w-full min-w-[640px] text-[13px]">
            <thead>
              <tr className="border-b border-[#dbe7f3] text-left text-[11px] font-black uppercase tracking-widest text-[#64748b] dark:border-[#27272b] dark:text-[#a1a1aa]">
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Round</th>
                <th className="px-4 py-3">Scheduled</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((iv) => (
                <tr key={iv.id} className="border-b border-[#dbe7f3] last:border-0 hover:bg-[#f8fbff] transition-colors dark:bg-[#141417] dark:border-[#27272b]">
                  <td className="px-4 py-3 font-bold text-[#0a1628] dark:text-[#fafafa]">
                    <Link href={`/admin/jobs/applications/${iv.applicationId}`}
                      className="hover:text-[#1677f2] hover:underline dark:text-[#4f9dfb]">
                      {iv.candidateName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#334155] dark:text-[#a1a1aa]">{iv.jobTitle}</td>
                  <td className="px-4 py-3 text-[#334155] dark:text-[#a1a1aa]">{TYPE_LABELS[iv.interviewType] ?? iv.interviewType}</td>
                  <td className="px-4 py-3 text-[#64748b] dark:text-[#a1a1aa]">{iv.roundNumber}</td>
                  <td className="px-4 py-3 text-[#64748b] dark:text-[#a1a1aa]">{fmt(iv.scheduledAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_COLOURS[iv.status] ?? ""}`}>
                      {iv.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748b] dark:text-[#a1a1aa]">
                    {iv.durationMinutes ? `${iv.durationMinutes} min` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#64748b] dark:text-[#a1a1aa]">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => handlePage(page - 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 font-bold text-[#334155] hover:bg-[#f8fbff] disabled:opacity-40 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => handlePage(page + 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 font-bold text-[#334155] hover:bg-[#f8fbff] disabled:opacity-40 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#a1a1aa]"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
