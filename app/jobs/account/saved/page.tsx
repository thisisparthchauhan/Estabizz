import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { loadCandidateAccountDashboard } from "@/lib/jobs/candidateAccount/data";
import { buildLoginHref } from "@/lib/jobs/candidateIdentity/redirects";
import { requireCandidateProfileSessionForPage } from "@/lib/jobs/profileReview/candidateAccess";

export const metadata: Metadata = {
  title: "Saved Jobs — Estabizz Jobs",
  description: "View saved jobs in your Estabizz Jobs candidate account.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidateSavedJobsPage() {
  const session = await requireCandidateProfileSessionForPage();

  if (!session) {
    redirect(buildLoginHref("/jobs/account/saved"));
  }

  const dashboard = await loadCandidateAccountDashboard(session);

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
            Saved Jobs
          </div>
          <h1 className="text-[34px] font-black leading-tight tracking-tight text-[#120b45] md:text-[44px]">
            Your saved roles
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#64748b]">
            Save roles for later review once public job listings and saved-job persistence are connected.
          </p>
        </div>

        <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
          <div className="rounded-lg bg-[#f5fbff] p-6 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1677f2]">
              {dashboard.savedJobsCount} saved jobs
            </p>
            <h2 className="mt-3 text-2xl font-black text-[#120b45]">No saved jobs yet</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#64748b]">
              Saved jobs will appear here. Each saved job can later be opened, removed or used as the starting point for an application.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/jobs/account"
                className="rounded-lg bg-[#1677f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0866d9]"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/jobs/account/profile"
                className="rounded-lg border border-blue-100 bg-white px-5 py-3 text-sm font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2]"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
