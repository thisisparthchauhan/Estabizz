"use client";
/**
 * GlobalMarketsClient.tsx — Global Markets Directory
 *
 * Searchable, filterable list of all markets Estabizz covers.
 * India links to / (homepage), not /global/india.
 * Correct positioning: market-entry intelligence and advisory coordination,
 * NOT "active offices in X countries."
 */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Globe2, Building2, ChevronRight, ArrowRight,
} from "@/components/globalMarkets/Icons";
import { GLOBAL_COUNTRIES, flagEmoji } from "@/lib/globalMarkets/countries";
import type { GlobalMarketConfig } from "@/lib/globalMarkets/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_REGIONS = Array.from(new Set(GLOBAL_COUNTRIES.map(c => c.region)));

const TIER_CONFIG = {
  active: {
    label: "Active",
    description: "Active Market Support",
    dot:   "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
  },
  developing: {
    label: "Developing",
    description: "Market Coverage Under Development",
    dot:   "bg-blue-500",
    badge: "bg-blue-100 text-blue-800",
  },
  planned: {
    label: "Planned",
    description: "Market Entry Desk Planned",
    dot:   "bg-amber-400",
    badge: "bg-amber-100 text-amber-800",
  },
};

// ─── Country card ─────────────────────────────────────────────────────────────

function CountryCard({ country }: { country: GlobalMarketConfig }) {
  const tc     = TIER_CONFIG[country.tier];
  const flag   = flagEmoji(country.iso2);
  const isIndia = country.slug === "india";
  const href   = isIndia ? "/" : `/global/${country.slug}`;

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-[#e2edf8] bg-white p-3.5 transition-all hover:border-[#1677f2]/40 hover:shadow-sm"
    >
      <span className="text-[26px] leading-none" aria-hidden="true">{flag}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-[#0a1628] group-hover:text-[#1677f2]">
          {country.name}
        </p>
        <p className="text-[11px] text-[#94a3b8]">{country.region}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${tc.badge}`}>
          {tc.label}
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-[#94a3b8] group-hover:text-[#1677f2]" aria-hidden="true" />
      </div>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GlobalMarketsClient() {
  const [search,        setSearch]        = useState("");
  const [activeRegion,  setActiveRegion]  = useState<string>("All");
  const [activeTier,    setActiveTier]    = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return GLOBAL_COUNTRIES.filter(c => {
      if (activeRegion !== "All" && c.region !== activeRegion) return false;
      if (activeTier   !== "All" && c.tier   !== activeTier)   return false;
      if (q && !c.name.toLowerCase().includes(q) && !c.region.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeRegion, activeTier]);

  // Counts
  const totalActive     = GLOBAL_COUNTRIES.filter(c => c.tier === "active").length;
  const totalDeveloping = GLOBAL_COUNTRIES.filter(c => c.tier === "developing").length;
  const totalPlanned    = GLOBAL_COUNTRIES.filter(c => c.tier === "planned").length;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#070d1a] pb-14 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1677f2]/10 blur-[100px]" />
          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#1677f2]/8 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[#1677f2]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#6ab4ff]">
              Global Market Desk
            </span>
          </div>
          <h1 className="max-w-2xl text-[36px] font-black leading-[1.08] tracking-tight lg:text-[48px]">
            Market-entry intelligence across international jurisdictions
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
            Estabizz provides global market-entry intelligence, regulatory pathway assessment and
            advisory coordination across international jurisdictions, managed through its
            India-based Global Market Desk and independent local professional networks where required.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Active market", count: totalActive,     dot: "bg-emerald-500", desc: "India — primary operating market" },
              { label: "Developing",    count: totalDeveloping, dot: "bg-blue-500",    desc: "Advisory capabilities in development" },
              { label: "Planned",       count: totalPlanned,    dot: "bg-amber-400",   desc: "Under evaluation" },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden="true" />
                  <span className="text-[11px] font-black uppercase tracking-wide text-white/60">{item.label}</span>
                </div>
                <p className="mt-1 text-[28px] font-black text-white">{item.count}</p>
                <p className="text-[11px] text-white/45">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-white/35">
            Coverage counts represent enquiry management and advisory coordination scope,
            not active local offices or regulatory authorisations.
          </p>
        </div>
      </section>

      {/* ── Positioning notice ────────────────────────────────────────────── */}
      <section className="border-b border-[#e2edf8] bg-[#f8fbff] py-4">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[12.5px] leading-relaxed text-[#64748b]">
            <strong className="text-[#334155]">About Global Market Desk coverage:</strong>{" "}
            Estabizz manages international market-entry enquiries through its India-based Global
            Market Desk. Country pages marked &ldquo;Developing&rdquo; or &ldquo;Planned&rdquo; reflect enquiry
            management capability, not local offices, incorporated entities or direct regulatory
            authorisations in those markets.
          </p>
        </div>
      </section>

      {/* ── Search and filters ────────────────────────────────────────────── */}
      <section className="sticky top-0 z-20 border-b border-[#e2edf8] bg-white/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search countries…"
                aria-label="Search countries"
                className="w-full rounded-xl border border-[#dbe7f3] bg-white py-2.5 pl-9 pr-4 text-[13.5px] text-[#0a1628] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/10"
              />
            </div>

            {/* Region filter */}
            <div className="flex flex-wrap gap-1.5">
              {["All", ...ALL_REGIONS].map(region => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
                    activeRegion === region
                      ? "border-[#1677f2] bg-[#1677f2] text-white"
                      : "border-[#dbe7f3] bg-white text-[#64748b] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                  }`}
                  aria-pressed={activeRegion === region}
                >
                  {region === "All" ? "All regions" : region}
                </button>
              ))}
            </div>

            {/* Tier filter */}
            <div className="flex gap-1.5">
              {["All", "active", "developing", "planned"].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTier(t)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-bold capitalize transition-all ${
                    activeTier === t
                      ? "border-[#1677f2] bg-[#1677f2] text-white"
                      : "border-[#dbe7f3] bg-white text-[#64748b] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                  }`}
                  aria-pressed={activeTier === t}
                >
                  {t === "All" ? "All tiers" : t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Country grid ──────────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          {/* India active market card (featured) */}
          {(activeRegion === "All" || activeRegion === "India & South Asia") &&
           (activeTier === "All" || activeTier === "active") &&
           (!search || "India".toLowerCase().includes(search.toLowerCase())) && (
            <div className="mb-6">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
                Primary Operating Market
              </p>
              <Link
                href="/"
                className="group flex items-center gap-4 rounded-2xl border-2 border-[#1677f2]/20 bg-gradient-to-r from-[#f0f6ff] to-white p-5 transition-all hover:border-[#1677f2]/50 hover:shadow-md"
              >
                <span className="text-[40px] leading-none" aria-hidden="true">🇮🇳</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[18px] font-black text-[#0a1628] group-hover:text-[#1677f2]">India</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800">
                      Active
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-[#64748b]">
                    Primary operating market · RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#1677f2]">
                  View India services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>
            </div>
          )}

          {/* Result count */}
          <p className="mb-4 text-[12.5px] text-[#94a3b8]">
            {filtered.filter(c => c.slug !== "india").length} markets
            {search && <> matching &ldquo;<strong className="text-[#334155]">{search}</strong>&rdquo;</>}
            {activeRegion !== "All" && <> in <strong className="text-[#334155]">{activeRegion}</strong></>}
            {activeTier !== "All" && <> · {activeTier}</>}
          </p>

          {/* Group by region */}
          {ALL_REGIONS
            .filter(region => activeRegion === "All" || activeRegion === region)
            .map(region => {
              const regionCountries = filtered.filter(
                c => c.region === region && c.slug !== "india"
              );
              if (regionCountries.length === 0) return null;
              return (
                <div key={region} className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-[#1677f2]" aria-hidden="true" />
                    <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#0a1628]">
                      {region}
                    </h2>
                    <span className="text-[11px] text-[#94a3b8]">
                      ({regionCountries.length})
                    </span>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {regionCountries.map(c => (
                      <CountryCard key={c.slug} country={c} />
                    ))}
                  </div>
                </div>
              );
            })}

          {/* No results */}
          {filtered.filter(c => c.slug !== "india").length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[15px] font-semibold text-[#64748b]">No markets match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveRegion("All"); setActiveTier("All"); }}
                className="mt-3 text-[13px] text-[#1677f2] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0a1628] py-14 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Building2 className="mx-auto mb-4 h-10 w-10 text-[#1677f2]" aria-hidden="true" />
          <h2 className="text-[26px] font-black tracking-tight">
            Planning international expansion?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/65">
            Tell us which market you are considering and what activity you plan to conduct.
            Our Global Market Desk will assess the regulatory pathway and identify the
            appropriate advisory coordination steps.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white shadow-lg shadow-[#1677f2]/30 transition-all hover:-translate-y-0.5"
            >
              Discuss Your Expansion Plan
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-[14px] font-black text-white transition-all hover:border-white/40 hover:bg-white/12"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
