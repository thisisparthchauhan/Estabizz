"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
interface InterviewRow { id: string; applicationId: string; jobTitle: string; candidateName: string; interviewType: string; roundNumber: number; status: string; scheduledAt: Date | null; durationMinutes: number | null; locationOrLink: string | null; format: string | null; notes: string | null; createdAt: Date; }

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
  scheduled: "bg-blue-50 text-blue-700 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
  no_show: "bg-orange-50 text-orange-700 border border-orange-200",
};

interface Props {
  interviews: InterviewRow[];
}

const STATUSES = ["all", "scheduled", "completed", "cancelled", "no_show"];

export default function AdminInterviewsClient({ interviews }: Props) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = interviews;
    if (statusFilter !== "all") list = list.filter((i) => i.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.candidateName.toLowerCase().includes(q) ||
          i.jobTitle.toLowerCase().includes(q) ||
          i.interviewType.toLowerCase().includes(q),
      );
    }
    return list;
  }, [interviews, statusFilter, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[26px] font-black text-[#0a1628]">Interviews</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">{interviews.length} total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="w-56 rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none"
          placeholder="Search candidate or job…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#334155] focus:border-[#1677f2] focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All Statuses" : s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[13px] text-[#94a3b8]">No interviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#dbe7f3] bg-white">
          <table className="w-full min-w-[640px] text-[13px]">
            <thead>
              <tr className="border-b border-[#dbe7f3] text-left text-[11px] font-black uppercase tracking-widest text-[#64748b]">
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
              {filtered.map((iv) => (
                <tr key={iv.id} className="border-b border-[#dbe7f3] last:border-0 hover:bg-[#f8fbff] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#0a1628]">
                    <Link href={`/admin/jobs/applications/${iv.applicationId}`}
                      className="hover:text-[#1677f2] hover:underline">
                      {iv.candidateName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#334155]">{iv.jobTitle}</td>
                  <td className="px-4 py-3 text-[#334155]">{TYPE_LABELS[iv.interviewType] ?? iv.interviewType}</td>
                  <td className="px-4 py-3 text-[#64748b]">{iv.roundNumber}</td>
                  <td className="px-4 py-3 text-[#64748b]">{fmt(iv.scheduledAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_COLOURS[iv.status] ?? ""}`}>
                      {iv.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">
                    {iv.durationMinutes ? `${iv.durationMinutes} min` : "—"}
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
