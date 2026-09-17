import Link from "next/link";

/**
 * Shown in place of any candidate-PII-collecting flow (apply, join the
 * talent network, the candidate account/dashboard) while
 * JOBS_CANDIDATE_APPLICATIONS_ENABLED is not "true" -- see
 * lib/jobs/launchFlags.ts for why this is a separate gate from whether job
 * listings themselves are live.
 *
 * Deliberately reused as one component across every gated entry point
 * (app/jobs/[slug]/apply, app/jobs/join, app/jobs/account/layout.tsx) rather
 * than four hand-written pages, so the message and its styling can only ever
 * say the same thing.
 */
export function CandidateApplicationsGate({
  heading = "Applications Opening Shortly",
}: {
  heading?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      <div className="bg-[#0a1628] px-6 py-14 text-center">
        <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
          Estabizz Jobs
        </div>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px]">
          {heading}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
          Online applications and candidate profiles will be available here shortly. We&apos;re finishing
          the secure infrastructure that keeps your information protected before opening this up.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
        <div className="rounded-2xl border border-[#dbe7f3] bg-white p-8">
          <p className="text-[15px] font-bold text-[#0a1628]">In the meantime</p>
          <p className="mt-2 text-[13px] leading-6 text-[#64748b]">
            You can still browse every open role we&apos;re managing. Check back soon to apply directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-6 py-3 text-[14px] font-black text-white hover:bg-[#1260d4] transition-colors"
            >
              Browse Open Roles
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
