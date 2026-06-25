"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { PublicRegulatoryUpdate, ImpactLevel } from "@/lib/regulatory/types";

const IMPACT_STYLES: Record<ImpactLevel, string> = {
  Low:      "bg-green-50 text-green-700",
  Medium:   "bg-blue-50 text-blue-700",
  High:     "bg-amber-50 text-amber-700",
  Critical: "bg-red-50 text-red-600",
};

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default function RegulatoryUpdatesListClient({ updates }: { updates: PublicRegulatoryUpdate[] }) {
  const [search, setSearch] = useState("");
  const [regulator, setRegulator] = useState("All");

  const regulators = useMemo(() => {
    const set = new Set(updates.map((u) => u.regulator));
    return ["All", ...Array.from(set)];
  }, [updates]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return updates.filter((u) => {
      if (regulator !== "All" && u.regulator !== regulator) return false;
      if (!q) return true;
      return (
        u.title.toLowerCase().includes(q) ||
        u.summary.toLowerCase().includes(q) ||
        u.category.toLowerCase().includes(q) ||
        u.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [updates, search, regulator]);

  return (
    <div id="latest-updates">
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search updates…"
          aria-label="Search regulatory updates"
          className="min-w-[220px] flex-1 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm text-[#0a1628] outline-none focus:border-[#1677f2]"
        />
        <div className="flex flex-wrap gap-2">
          {regulators.map((r) => (
            <button
              key={r}
              onClick={() => setRegulator(r)}
              className={`rounded-full border px-4 py-2 text-[12px] font-bold transition-colors ${
                regulator === r
                  ? "border-[#1677f2] bg-[#1677f2] text-white"
                  : "border-blue-100 bg-white text-[#0a1628] hover:border-[#1677f2]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-blue-100 bg-white p-10 text-center text-[14px] text-[#64748b]">
          No regulatory updates match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filtered.map((u) => (
            <article key={u.slug} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-[#1677f2]">{u.regulator}</span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-black ${IMPACT_STYLES[u.impactLevel]}`}>{u.impactLevel} Impact</span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">{u.category}</p>
              <h2 className="mb-2 mt-1 text-[19px] font-black leading-snug text-[#0a1628]">{u.title}</h2>
              {(u.sourceDate || u.publishedDate) && (
                <p className="mb-3 text-[12px] font-semibold text-[#64748b]">{fmtDate(u.sourceDate ?? u.publishedDate)}</p>
              )}
              {u.applicableTo.length > 0 && (
                <p className="mb-3 text-[13px] leading-6 text-gray-600"><strong>Applicable to:</strong> {u.applicableTo.join(", ")}</p>
              )}
              <p className="mb-4 text-[14px] leading-7 text-gray-600">{u.summary}</p>
              {u.tags.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {u.tags.slice(0, 5).map((t) => (
                    <span key={t} className="rounded-full border border-blue-100 bg-[#f5fbff] px-2.5 py-0.5 text-[11px] font-semibold text-[#0077B6]">{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex flex-wrap gap-3">
                <Link href={`/resources/regulatory-updates/${u.slug}`} className="rounded-xl bg-[#0a1628] px-4 py-2 text-[13px] font-bold text-white">Read Full Update</Link>
                {u.sourceUrl && (
                  <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-[13px] font-bold text-[#1677f2]">View Source ↗</a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 text-[12px] leading-6 text-[#64748b]">
        These updates are shared for general informational purposes and do not constitute legal, regulatory, tax or financial advice.
        Regulatory requirements change from time to time — please verify the latest circular or regulator guidance before acting.
      </p>
    </div>
  );
}
