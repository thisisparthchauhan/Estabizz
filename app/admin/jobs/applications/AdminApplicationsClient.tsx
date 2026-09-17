"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  ApplicationAdminRow,
  StageOption,
  PaginatedResult,
} from "@/lib/jobs/applicationManagement/repository";

function fmt(d: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(d));
}

const SOURCE_LABELS: Record<string, string> = {
  candidate_portal: "Portal",
  recruiter_assigned: "Recruiter",
  referral: "Referral",
  imported: "Imported",
};

interface Props {
  result: PaginatedResult<ApplicationAdminRow>;
  stages: StageOption[];
  initialSearch: string;
  initialStageId: string;
}

export default function AdminApplicationsClient({
  result,
  stages,
  initialSearch,
  initialStageId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams(params);
    startTransition(() => router.push(`?${sp.toString()}`));
  }

  function handleSearchSubmit() {
    navigate({ search, stageId: initialStageId, page: "1" });
  }

  function handleStageChange(stageId: string) {
    navigate({ search, stageId, page: "1" });
  }

  function handlePage(p: number) {
    navigate({ search, stageId: initialStageId, page: String(p) });
  }

  const { items: applications, total, page, totalPages } = result;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-black text-[#0a1628]">Applications</h1>
          <p className="mt-1 text-[13px] text-[#64748b]">{total} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
          placeholder="Search name, job, email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          onBlur={handleSearchSubmit}
        />
        <select
          className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#334155] focus:border-[#1677f2] focus:outline-none"
          value={initialStageId}
          onChange={(e) => handleStageChange(e.target.value)}
        >
          <option value="">All Stages</option>
          {stages.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {(search || initialStageId) && (
          <button
            type="button"
            onClick={() => { setSearch(""); navigate({ search: "", stageId: "", page: "1" }); }}
            className="text-[12px] font-bold text-[#1677f2] hover:underline self-center"
          >
            Clear
          </button>
        )}
        {isPending && <span className="self-center text-[12px] text-[#94a3b8]">Loading…</span>}
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#dbe7f3] bg-white py-16 text-center text-[14px] text-[#94a3b8]">
          {total === 0 ? "No applications yet." : "No results match your filters."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#dbe7f3] bg-white">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-[#dbe7f3] bg-[#f8fbff] text-left text-[11px] font-black uppercase tracking-widest text-[#64748b]">
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fbff] transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#0a1628]">{app.candidateName}</p>
                    {app.candidateEmail && (
                      <p className="text-[12px] text-[#64748b]">{app.candidateEmail}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/jobs/${app.jobSlug}`}
                      target="_blank"
                      className="font-bold text-[#1677f2] hover:underline"
                    >
                      {app.jobTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                      style={{ backgroundColor: app.stageColour ?? "#64748b" }}
                    >
                      {app.currentStageName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">
                    {SOURCE_LABELS[app.source] ?? app.source}
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">{fmt(app.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/jobs/applications/${app.id}`}
                      className="text-[12px] font-bold text-[#1677f2] hover:underline"
                    >
                      View →
                    </Link>
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
          <span className="text-[#64748b]">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => handlePage(page - 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 font-bold text-[#334155] hover:bg-[#f8fbff] disabled:opacity-40"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => handlePage(page + 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 font-bold text-[#334155] hover:bg-[#f8fbff] disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
