"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PublicJobListing } from "@/lib/jobs/jobManagement/repository";
import type { JobEmploymentType, RemotePolicy } from "@prisma/client";

// The live job board on /jobs.
//
// This used to own the whole route, hero and all. It is now ONE SECTION of the
// /jobs landing page (see app/jobs/page.tsx): the page's hero, taxonomy and FAQ
// are static server-rendered sections around it, and this component keeps
// exactly what needs client state -- search, filters and pagination.
//
// Every taxonomy link on that page deep-links here as /jobs?q=<term>#openings.
// The server reads that param and passes it in as `initialSearch` rather than
// this component calling useSearchParams(), which would force the whole board
// into a Suspense boundary for a value that is already available on the server.

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
  /** Seeded from ?q= so licence / designation / city links land pre-filtered. */
  initialSearch?: string;
}

export default function PublicJobsClient({ jobs, initialSearch = "" }: Props) {
  const [search, setSearch]   = useState(initialSearch);
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
  const hasFilters = Boolean(search || location || dept || exp);

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

  const selectCls = "rounded-xl border border-blue-100 bg-white px-4 py-3 text-[14px] font-medium text-[#475569] shadow-[0_8px_32px_rgba(0,100,200,0.05)] focus:border-[#1677f2] focus:outline-none focus:ring-4 focus:ring-[#1677f2]/10";

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6">
      <div className="mx-auto max-w-[760px] text-center">
        <div className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
          Open positions
        </div>
        <h2 className="mt-4 text-[clamp(30px,3.4vw,48px)] font-black leading-[1.06] tracking-[-0.04em] text-[#071426]">
          {jobs.length} live role{jobs.length !== 1 ? "s" : ""} on the Estabizz board
        </h2>
        <p className="mx-auto mt-6 text-[16px] font-medium leading-[1.9] text-[#475569]">
          Search by role, skill, department or city. Every listing is managed by the Estabizz
          recruitment team and links straight through to an application.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sr-only" htmlFor="jobs-search">Search jobs by title, skill, department or location</label>
        <input
          id="jobs-search"
          className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-[14px] font-medium text-[#071426] placeholder-[#94a3b8] shadow-[0_8px_32px_rgba(0,100,200,0.05)] focus:border-[#1677f2] focus:outline-none focus:ring-4 focus:ring-[#1677f2]/10"
          placeholder="Search by title, skill, department or location…"
          value={search}
          onChange={(e) => changeFilter(setSearch)(e.target.value)}
        />

        <select
          className={selectCls}
          aria-label="Filter by location"
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
          aria-label="Filter by department"
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
          aria-label="Filter by years of experience"
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
          {hasFilters && " (filtered)"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[13px] font-bold text-[#1677f2] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Job cards */}
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-blue-100 bg-white py-20 text-center">
          <div className="text-[48px]" aria-hidden="true">💼</div>
          <p className="mt-5 text-[20px] font-black text-[#071426]">No openings right now</p>
          <p className="mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
            We&apos;re growing. Join our talent network and we&apos;ll reach out when a matching role opens.
          </p>
          <Link
            href="/jobs/join"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9]"
          >
            Join Estabizz&apos;s Talent Network
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        // A taxonomy link that currently has no matching opening lands here, so
        // this is a routine state on this page rather than an edge case -- it
        // gets a real next step, not just "nothing found".
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-blue-100 bg-white px-6 py-16 text-center">
          <p className="text-[20px] font-black text-[#071426]">
            No open role matches {search.trim() ? `“${search.trim()}”` : "these filters"} today
          </p>
          <p className="mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
            Roles in this domain open regularly. Add your profile to the talent network and the
            recruitment team will consider you as soon as one does.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/jobs/join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9]"
            >
              Join Estabizz&apos;s Talent Network
            </Link>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-8 py-3.5 text-[15px] font-bold text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]"
            >
              Show all roles
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {pageJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="group block rounded-[22px] border border-blue-100 bg-white p-6 shadow-[0_8px_32px_rgba(0,100,200,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1677f2]/40 hover:shadow-[0_18px_50px_rgba(0,80,140,0.09)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-[19px] font-black leading-tight tracking-[-0.01em] text-[#071426] transition-colors group-hover:text-[#1677f2]">
                    {job.title}
                  </h3>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-[#64748b]">
                    {job.department && (
                      <span className="font-bold text-[#475569]">{job.department}</span>
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
            className="rounded-xl border border-blue-100 bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#64748b] transition-colors hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-2 text-[13.5px] font-medium text-[#64748b]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border border-blue-100 bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#64748b] transition-colors hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-14 rounded-[28px] border border-blue-100 bg-white p-10 text-center shadow-[0_18px_50px_rgba(0,80,140,0.07)]">
        <p className="text-[20px] font-black text-[#071426]">Don&apos;t see a role that fits?</p>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
          Join Estabizz&apos;s talent network — create a profile once and be considered as new roles open.
        </p>
        <Link
          href="/jobs/join"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0866d9]"
        >
          Join Estabizz
        </Link>
        <p className="mt-5 text-[13px] font-medium text-[#94a3b8]">
          Prefer not to create a profile?{" "}
          <a href="mailto:info@estabizz.com?subject=Career%20Enquiry%20-%20Estabizz" className="font-bold text-[#1677f2] hover:underline">
            Email our recruitment team
          </a>
          .
        </p>
      </div>
    </div>
  );
}
