"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ApplicationAdminRow } from "@/lib/jobs/applicationManagement/repository";

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
  applications: ApplicationAdminRow[];
}

export default function AdminApplicationsClient({ applications }: Props) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  const stages = useMemo(() => {
    const set = new Set(applications.map((a) => a.currentStageName));
    return Array.from(set).sort();
  }, [applications]);

  const filtered = useMemo(() => {
    let list = applications;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.candidateName.toLowerCase().includes(q) ||
          a.jobTitle.toLowerCase().includes(q) ||
          (a.candidateEmail ?? "").toLowerCase().includes(q)
      );
    }
    if (stageFilter) list = list.filter((a) => a.currentStageName === stageFilter);
    return list;
  }, [applications, search, stageFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-black text-[#0a1628]">Applications</h1>
          <p className="mt-1 text-[13px] text-[#64748b]">{applications.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
          placeholder="Search name, job, email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#334155] focus:border-[#1677f2] focus:outline-none"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="">All Stages</option>
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {(search || stageFilter) && (
          <button
            type="button"
            onClick={() => { setSearch(""); setStageFilter(""); }}
            className="text-[12px] font-bold text-[#1677f2] hover:underline self-center"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#dbe7f3] bg-white py-16 text-center text-[14px] text-[#94a3b8]">
          {applications.length === 0 ? "No applications yet." : "No results match your filters."}
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
              {filtered.map((app) => (
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
    </div>
  );
}
