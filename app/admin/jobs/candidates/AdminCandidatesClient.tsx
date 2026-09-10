"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CandidateAdminRow } from "@/lib/jobs/candidateManagement/repository";
import type { PaginatedResult } from "@/lib/jobs/applicationManagement/repository";

function fmt(d: Date | string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
}

const EXP_FILTERS = [
  { label: "Any", value: "" },
  { label: "0–2 yrs", value: "0-2" },
  { label: "2–5 yrs", value: "2-5" },
  { label: "5–10 yrs", value: "5-10" },
  { label: "10+", value: "10+" },
];

interface Props {
  result: PaginatedResult<CandidateAdminRow>;
  cities: string[];
  initialSearch: string;
  initialCity: string;
  initialExpFilter: string;
}

export default function AdminCandidatesClient({
  result,
  cities,
  initialSearch,
  initialCity,
  initialExpFilter,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams(params);
    startTransition(() => router.push(`?${sp.toString()}`));
  }

  function handleSearchSubmit() {
    navigate({ search, city: initialCity, expFilter: initialExpFilter, page: "1" });
  }

  function handleCityChange(city: string) {
    navigate({ search, city, expFilter: initialExpFilter, page: "1" });
  }

  function handleExpChange(expFilter: string) {
    navigate({ search, city: initialCity, expFilter, page: "1" });
  }

  function handlePage(p: number) {
    navigate({ search, city: initialCity, expFilter: initialExpFilter, page: String(p) });
  }

  const { items: candidates, total, page, totalPages } = result;
  const selectCls = "rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#334155] focus:border-[#1677f2] focus:outline-none";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-black text-[#0a1628]">Candidates</h1>
          <p className="mt-0.5 text-[13px] text-[#64748b]">{total} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13px] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          onBlur={handleSearchSubmit}
        />
        <select className={selectCls} value={initialCity} onChange={(e) => handleCityChange(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className={selectCls} value={initialExpFilter} onChange={(e) => handleExpChange(e.target.value)}>
          {EXP_FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        {(search || initialCity || initialExpFilter) && (
          <button type="button" onClick={() => { setSearch(""); navigate({ search: "", city: "", expFilter: "", page: "1" }); }}
            className="self-center text-[12px] font-bold text-[#1677f2] hover:underline">
            Clear
          </button>
        )}
        {isPending && <span className="self-center text-[12px] text-[#94a3b8]">Loading…</span>}
      </div>

      {candidates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#dbe7f3] bg-white py-16 text-center text-[14px] text-[#94a3b8]">
          {total === 0 ? "No candidates yet." : "No results."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#dbe7f3] bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#dbe7f3] bg-[#f8fbff] text-left text-[11px] font-black uppercase tracking-widest text-[#64748b]">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Current Role</th>
                <th className="px-4 py-3">Exp</th>
                <th className="px-4 py-3">Profile</th>
                <th className="px-4 py-3">Apps</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fbff] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#0a1628]">{c.firstName} {c.lastName}</p>
                    <p className="text-[11px] text-[#94a3b8]">{c.candidateCode}</p>
                  </td>
                  <td className="px-4 py-3">
                    {c.email && <p className="text-[#64748b]">{c.email}</p>}
                    {c.phone && <p className="text-[12px] text-[#94a3b8]">{c.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">{c.currentCity ?? "—"}</td>
                  <td className="px-4 py-3">
                    {c.currentTitle && <p className="text-[#0a1628]">{c.currentTitle}</p>}
                    {c.currentEmployer && <p className="text-[12px] text-[#64748b]">{c.currentEmployer}</p>}
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">
                    {c.yearsOfExperience != null ? `${c.yearsOfExperience} yr` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-[#e2e8f0]">
                        <div
                          className="h-1.5 rounded-full bg-[#1677f2]"
                          style={{ width: `${c.profileCompletenessPct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#64748b]">{c.profileCompletenessPct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-[#64748b]">{c.applicationCount}</td>
                  <td className="px-4 py-3">
                    {c.latestStageName ? (
                      <span className="rounded-full bg-[#eaf2ff] px-2.5 py-0.5 text-[11px] font-bold text-[#1677f2]">
                        {c.latestStageName}
                      </span>
                    ) : (
                      <span className="text-[#94a3b8]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#94a3b8]">{fmt(c.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/jobs/candidates/${c.id}`}
                      className="text-[12px] font-bold text-[#1677f2] hover:underline whitespace-nowrap"
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
          <span className="text-[#64748b]">Page {page} of {totalPages}</span>
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
