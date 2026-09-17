import Link from "next/link";

/**
 * Shown on /jobs and /jobs/[slug] when isJobsDatabaseConfigured() is false --
 * i.e. DATABASE_URL has not been set in this environment, so there is no
 * Postgres to read job records from at all. Distinct from the "no jobs match
 * your filters" / "no openings right now" states in PublicJobsClient, which
 * mean the database is reachable and genuinely has nothing to show; this
 * means the database itself doesn't exist yet, and conflating the two would
 * misrepresent which is true.
 *
 * This is not an error page: the route returns 200, stays indexable, and the
 * moment DATABASE_URL is added and migrated, the same route starts rendering
 * real jobs with no further deployment.
 */
export function JobListingsUnavailable() {
  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      <div className="bg-[#0a1628] px-6 py-14 text-center">
        <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
          Estabizz Jobs
        </div>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px]">
          Job Listings Coming Shortly
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
          We&apos;re finalising open roles across regulated financial services, fintech, technology and
          growing businesses. Please check back soon, or reach out directly.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
        <div className="rounded-2xl border border-[#dbe7f3] bg-white p-8">
          <p className="mt-1 text-[13px] leading-6 text-[#64748b]">
            Interested in opportunities with Estabizz? Send us a note and we&apos;ll keep you posted as
            roles open.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1260d4] transition-colors"
            >
              Back to Estabizz
            </Link>
            <a
              href="mailto:info@estabizz.com?subject=Career%20Enquiry%20-%20Estabizz"
              className="inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
            >
              Email Our Recruitment Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
