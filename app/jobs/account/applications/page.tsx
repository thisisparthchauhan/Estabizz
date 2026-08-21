import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { loadCandidateAccountDashboard } from "@/lib/jobs/candidateAccount/data";
import { buildLoginHref } from "@/lib/jobs/candidateIdentity/redirects";
import { requireCandidateProfileSessionForPage } from "@/lib/jobs/profileReview/candidateAccess";

export const metadata: Metadata = {
  title: "My Applications — Estabizz Jobs",
  description: "View your Estabizz Jobs applications.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidateApplicationsPage() {
  const session = await requireCandidateProfileSessionForPage();

  if (!session) {
    redirect(buildLoginHref("/jobs/account/applications"));
  }

  const dashboard = await loadCandidateAccountDashboard(session);

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
            My Applications
          </div>
          <h1 className="text-[34px] font-black leading-tight tracking-tight text-[#120b45] md:text-[44px]">
            Track your applications
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#64748b]">
            Candidate-facing application updates appear here. Internal recruiter notes, AI scores and rankings are never shown.
          </p>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-4">
          <SummaryCard label="Total" value={dashboard.applicationSummary.total} />
          <SummaryCard label="Under Review" value={dashboard.applicationSummary.underReview} />
          <SummaryCard label="Interview" value={dashboard.applicationSummary.interview} />
          <SummaryCard label="Selected / Offered" value={dashboard.applicationSummary.offeredOrSelected} />
        </div>

        <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
          {dashboard.recentApplications.length === 0 ? (
            <div className="rounded-lg bg-[#f5fbff] p-6 text-center">
              <h2 className="text-xl font-black text-[#120b45]">No applications yet</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#64748b]">
                Your submitted applications will appear here once candidate application submission is connected.
              </p>
              <Link
                href="/jobs/account/profile"
                className="mt-5 inline-flex rounded-lg bg-[#1677f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0866d9]"
              >
                Complete Profile
              </Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {dashboard.recentApplications.map((application) => (
                <article key={application.id} className="rounded-lg border border-[#e2ecf7] bg-[#fbfdff] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-lg font-black text-[#0f172a]">{application.jobTitle}</h2>
                      <p className="mt-1 text-sm text-[#64748b]">{application.organizationName}</p>
                      <p className="mt-3 text-sm leading-6 text-[#475569]">{application.nextStep}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-black text-[#1677f2]">
                        {application.statusLabel}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#64748b]">
                        Applied {formatDate(application.appliedDate)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1677f2]">{label}</p>
      <p className="mt-3 text-3xl font-black text-[#120b45]">{value}</p>
    </div>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
