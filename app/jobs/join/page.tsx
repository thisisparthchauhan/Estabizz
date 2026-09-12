import type { Metadata } from "next";
import Link from "next/link";

import { getAuthSession } from "@/lib/auth/session";
import { buildSignupHref } from "@/lib/jobs/candidateIdentity/redirects";

// "Join Estabizz" — Phase 7A.
//
// WHY THIS PAGE EXISTS RATHER THAN A NEW /careers ROUTE OR AN "Estabizz-only"
// FILTER ON /jobs: neither is possible without inventing something unreliable.
//
//   - A /careers page reading the same Jobs source of truth would render
//     IDENTICAL content to /jobs (there is no field that reliably marks a job
//     as an Estabizz-internal vacancy vs a client vacancy -- see below), so it
//     would be pure duplication with nothing of its own to show.
//   - A "client vs internal" filter on /jobs is not supported by the data:
//     Job.organization_id exists in the schema but has NO admin UI to set it
//     and is never read anywhere in the application. Every job in the
//     database has organization_id = NULL, client and internal alike, so NULL
//     cannot distinguish anything. Building a filter on it would be inventing
//     unreliable logic on top of an unpopulated field.
//
// "Join Estabizz" is therefore reframed as what the architecture actually
// supports today: joining the CANDIDATE talent network -- creating a profile
// so the Estabizz recruitment team can consider you for current and future
// roles, not just ones open right now. This uses the existing candidate
// signup + profile system exactly as built. No new backend, no duplicate job
// records, no invented data model.
export const metadata: Metadata = {
  title: "Join Estabizz — Talent Network",
  description:
    "Create your Estabizz Jobs candidate profile once and be considered for current and future roles across regulated financial services, fintech and technology.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function JoinEstabizzPage() {
  // A peek, not an enforced gate -- this page is public. getAuthSession()
  // returns null rather than redirecting, so a logged-out visitor still sees
  // the page and gets routed to signup (with a safe return path back to
  // profile completion) instead of straight into a protected route.
  const session = await getAuthSession();
  const primaryCtaHref = session ? "/jobs/account/profile" : buildSignupHref("/jobs/account/profile");
  const primaryCtaLabel = session ? "Complete Your Profile" : "Create Your Profile";

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[64px]">
      {/* Header */}
      <div className="bg-[#0a1628] px-6 py-14 text-center">
        <div className="mb-3 inline-block rounded-full bg-[#1677f2]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#60a5fa]">
          Estabizz Talent Network
        </div>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px]">
          Join Estabizz
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
          Create your candidate profile once, and the Estabizz recruitment team can consider you for
          current openings and roles that open later — without you needing to reapply from scratch each time.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white hover:bg-[#1260d4] transition-colors shadow-lg shadow-[#1677f2]/30"
          >
            {primaryCtaLabel} →
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-black text-white hover:bg-white/10 transition-colors"
          >
            Browse Open Roles
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <Step
            n="1"
            title="Create your profile"
            body="Sign up and complete your candidate profile — experience, skills and preferences."
          />
          <Step
            n="2"
            title="Upload your resume"
            body="Add your resume once. It's scanned, parsed and kept on file for the roles you apply to."
          />
          <Step
            n="3"
            title="Get matched"
            body="Apply to open roles directly, or stay in the network for the Estabizz team to reach out about future ones."
          />
        </div>

        <div className="mt-10 rounded-2xl border border-[#dbe7f3] bg-white p-8 text-center">
          <p className="text-[15px] font-bold text-[#0a1628]">Already have an account?</p>
          <p className="mt-2 text-[13px] text-[#64748b]">
            Sign in to pick up where you left off on your profile.
          </p>
          <Link
            href="/jobs/account"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-6 py-3 text-[14px] font-bold text-[#334155] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
          >
            Go to Candidate Account
          </Link>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf2ff] text-[13px] font-black text-[#1677f2]">
        {n}
      </div>
      <h2 className="mt-3 text-[14px] font-black text-[#0a1628]">{title}</h2>
      <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{body}</p>
    </div>
  );
}
