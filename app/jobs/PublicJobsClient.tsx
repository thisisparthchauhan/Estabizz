"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PublicJobListing } from "@/lib/jobs/jobManagement/repository";
import type { JobEmploymentType, RemotePolicy } from "@prisma/client";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMPLOYMENT_LABELS: Record<JobEmploymentType, string> = {
  permanent:  "Permanent",
  contract:   "Contract",
  consulting: "Consulting",
  fixed_term: "Fixed Term",
};

const REMOTE_LABELS: Record<RemotePolicy, string> = {
  on_site: "On-site",
  hybrid:  "Hybrid",
  remote:  "Remote",
};

function expLabel(min: number | null, max: number | null): string {
  if (!min && !max) return "";
  if (min && max) return `${min}–${max} yrs`;
  if (min) return `${min}+ yrs`;
  return `Up to ${max} yrs`;
}

function fmt(d?: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const EXP_FILTERS = [
  { label: "Any experience", value: "" },
  { label: "0–2 years",      value: "0-2" },
  { label: "2–5 years",      value: "2-5" },
  { label: "5–10 years",     value: "5-10" },
  { label: "10+ years",      value: "10+" },
];

function matchExp(filter: string, min: number | null, max: number | null): boolean {
  if (!filter) return true;
  const [lo, hi] = filter === "10+" ? [10, Infinity] : filter.split("-").map(Number);
  const jobMin = min ?? 0;
  const jobMax = max ?? 50;
  return jobMin <= hi && jobMax >= lo;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

interface Props {
  jobs: PublicJobListing[];
}

export default function PublicJobsClient({ jobs }: Props) {
  const [search, setSearch]   = useState("");
  const [location, setLocation] = useState("");
  const [dept, setDept]       = useState("");
  const [exp, setExp]         = useState("");
  const [page, setPage]       = useState(1);

  // Derived filter options from job data
  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location_text).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [jobs]);

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    let list = jobs;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          (j.department ?? "").toLowerCase().includes(q) ||
          (j.location_text ?? "").toLowerCase().includes(q) ||
          j.skills_list.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (location) list = list.filter((j) => j.location_text === location);
    if (dept) list = list.filter((j) => j.department === dept);
    if (exp) list = list.filter((j) => matchExp(exp, j.min_years_experience, j.max_years_experience));
    return list;
  }, [jobs, search, location, dept, exp]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageJobs = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setSearch("");
    setLocation("");
    setDept("");
    setExp("");
    setPage(1);
  }

  function changeFilter<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const selectCls = "rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#334155] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20";

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      {/* Hero */}
      <div className="bg-[#0a1628] px-6 py-14 text-center">
        <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
          Estabizz Jobs
        </div>
        <h1 className="mt-3 text-[36px] font-black leading-tight tracking-tight text-white sm:text-[44px]">
          Find opportunities across regulated financial services, fintech, technology and growing businesses
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
          Search roles managed by the Estabizz recruitment team.
        </p>
        <p className="mt-3 text-[14px] font-bold text-[#60a5fa]">
          {jobs.length} open position{jobs.length !== 1 ? "s" : ""}
        </p>
        <p className="mt-5 text-[13px] text-[#94a3b8]">
          Don&apos;t see the right role yet?{" "}
          <Link href="/jobs/join" className="font-bold text-white underline decoration-[#60a5fa] underline-offset-4 hover:text-[#60a5fa]">
            Join Estabizz&apos;s talent network →
          </Link>
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filters */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="sr-only" htmlFor="jobs-search">Search jobs by title, skill, department or location</label>
          <input
            id="jobs-search"
            className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13.5px] text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
            placeholder="Search by title, skill, department or location…"
            value={search}
            onChange={(e) => changeFilter(setSearch)(e.target.value)}
          />

          <select
            className={selectCls}
            value={location}
            onChange={(e) => changeFilter(setLocation)(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select
            className={selectCls}
            value={dept}
            onChange={(e) => changeFilter(setDept)(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            className={selectCls}
            value={exp}
            onChange={(e) => changeFilter(setExp)(e.target.value)}
          >
            {EXP_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Results count / reset */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[13px] text-[#64748b]">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {(search || location || dept || exp) && " (filtered)"}
          </p>
          {(search || location || dept || exp) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[12px] font-bold text-[#1677f2] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Job cards */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white py-20 text-center">
            <div className="text-[48px]">💼</div>
            <p className="mt-4 text-[15px] font-bold text-[#0a1628]">No openings right now</p>
            <p className="mt-2 text-[13px] text-[#64748b]">
              We&apos;re growing. Join our talent network and we&apos;ll reach out when a matching role opens.
            </p>
            <Link
              href="/jobs/join"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1677f2] transition-colors"
            >
              Join Estabizz&apos;s Talent Network
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white text-[14px] text-[#94a3b8]">
            No jobs match your filters.
          </div>
        ) : (
          <div className="space-y-3">
            {pageJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="group block rounded-2xl border border-[#dbe7f3] bg-white p-5 transition-all hover:border-[#1677f2]/50 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h2 className="text-[17px] font-black leading-tight text-[#0a1628] group-hover:text-[#1677f2] transition-colors">
                      {job.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[#64748b]">
                      {job.department && (
                        <span className="font-bold text-[#334155]">{job.department}</span>
                      )}
                      {job.location_text && (
                        <>
                          <span className="text-[#cbd5e1]">·</span>
                          <span>📍 {job.location_text}</span>
                        </>
                      )}
                      {job.remote_policy && (
                        <>
                          <span className="text-[#cbd5e1]">·</span>
                          <span>{REMOTE_LABELS[job.remote_policy]}</span>
                        </>
                      )}
                      {job.employment_type && (
                        <>
                          <span className="text-[#cbd5e1]">·</span>
                          <span>{EMPLOYMENT_LABELS[job.employment_type]}</span>
                        </>
                      )}
                      {expLabel(job.min_years_experience, job.max_years_experience) && (
                        <>
                          <span className="text-[#cbd5e1]">·</span>
                          <span>{expLabel(job.min_years_experience, job.max_years_experience)} exp</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Open
                    </span>
                    {job.closes_at && (
                      <span className="text-[11px] text-[#94a3b8]">
                        Closes {fmt(job.closes_at)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 text-[13px] font-bold text-[#64748b] disabled:opacity-40 hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
            >
              Previous
            </button>
            <span className="text-[13px] text-[#64748b]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-[#dbe7f3] px-4 py-2 text-[13px] font-bold text-[#64748b] disabled:opacity-40 hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl border border-[#dbe7f3] bg-white p-8 text-center">
          <p className="text-[15px] font-bold text-[#0a1628]">Don&apos;t see a role that fits?</p>
          <p className="mt-2 text-[13px] text-[#64748b]">
            Join Estabizz&apos;s talent network — create a profile once and be considered as new roles open.
          </p>
          <Link
            href="/jobs/join"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1677f2] transition-colors"
          >
            Join Estabizz
          </Link>
          <p className="mt-4 text-[12px] text-[#94a3b8]">
            Prefer not to create a profile?{" "}
            <a href="mailto:info@estabizz.com?subject=Career%20Enquiry%20-%20Estabizz" className="font-bold text-[#1677f2] hover:underline">
              Email our recruitment team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
