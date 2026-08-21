import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { loadCandidateAccountDashboard } from "@/lib/jobs/candidateAccount/data";
import type { CandidateAccountDashboardViewModel } from "@/lib/jobs/candidateAccount/types";
import { requireCandidateProfileSessionForPage } from "@/lib/jobs/profileReview/candidateAccess";

export const metadata: Metadata = {
  title: "Candidate Dashboard — Estabizz Jobs",
  description: "Manage your Estabizz Jobs candidate profile, applications, saved jobs and alerts.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidateAccountDashboardPage() {
  const session = await requireCandidateProfileSessionForPage();

  if (!session) {
    redirect("/login");
  }

  const dashboard = await loadCandidateAccountDashboard(session);

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2]">
              Dashboard
            </div>
            <h1 className="text-[34px] font-black leading-tight tracking-tight text-[#120b45] md:text-[46px]">
              Welcome, {dashboard.candidateName}
            </h1>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#64748b] md:text-[17px]">
              Track your profile, applications and job-search activity from one professional workspace.
            </p>
          </div>
          <Link
            href={dashboard.nextAction.ctaHref}
            className="inline-flex rounded-lg bg-[#1677f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0866d9]"
          >
            {dashboard.nextAction.ctaLabel}
          </Link>
        </div>

        <section className="mb-8 rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-black text-[#120b45]">{dashboard.nextAction.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#64748b]">{dashboard.nextAction.description}</p>
            </div>
            <Link
              href={dashboard.nextAction.ctaHref}
              className="rounded-lg border border-blue-100 bg-[#f5fbff] px-5 py-3 text-center text-sm font-black text-[#1677f2] transition hover:border-[#1677f2]/40"
            >
              {dashboard.nextAction.ctaLabel}
            </Link>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Profile Completion"
            value={`${dashboard.profileCompletion.percentage}%`}
            description={`${dashboard.profileCompletion.completedItems}/${dashboard.profileCompletion.totalItems} profile areas complete`}
            href="/jobs/account/profile"
            cta="Complete Profile"
          />
          <MetricCard
            title="Resume"
            value={dashboard.resumeState.label}
            description={dashboard.resumeState.description}
            href={dashboard.resumeState.ctaHref}
            cta={dashboard.resumeState.ctaLabel}
          />
          <MetricCard
            title="Applications"
            value={String(dashboard.applicationSummary.total)}
            description={`${dashboard.applicationSummary.underReview} under review · ${dashboard.applicationSummary.interview} interview`}
            href="/jobs/account/applications"
            cta="View Applications"
          />
          <MetricCard
            title="Saved Jobs"
            value={String(dashboard.savedJobsCount)}
            description="Saved-job storage will connect in a later phase."
            href="/jobs/account/saved"
            cta="View Saved Jobs"
          />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <RecentApplications dashboard={dashboard} />
          <UpcomingInterviews dashboard={dashboard} />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <MetricCard
            title="Job Alerts"
            value={String(dashboard.alertsCount)}
            description="Create keyword and location alerts once alert persistence is connected."
            href="/jobs/account/alerts"
            cta="Manage Job Alerts"
          />
          <section className="rounded-lg border border-dashed border-blue-200 bg-white p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1677f2]">
              Recommended Jobs
            </p>
            <h2 className="mt-3 text-xl font-black text-[#120b45]">Recommendations are not enabled yet</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              AI matching has not started, so this dashboard does not label any role as recommended.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  description,
  href,
  cta,
}: {
  title: string;
  value: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1677f2]">{title}</p>
      <p className="mt-4 text-3xl font-black text-[#120b45]">{value}</p>
      <p className="mt-2 min-h-[44px] text-sm leading-6 text-[#64748b]">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-lg border border-blue-100 px-4 py-2 text-xs font-black text-[#334155] transition hover:border-[#1677f2]/40 hover:text-[#1677f2]"
      >
        {cta}
      </Link>
    </section>
  );
}

function RecentApplications({ dashboard }: { dashboard: CandidateAccountDashboardViewModel }) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-[#120b45]">Recent Applications</h2>
        <Link href="/jobs/account/applications" className="text-sm font-black text-[#1677f2]">
          View All
        </Link>
      </div>
      {dashboard.recentApplications.length === 0 ? (
        <p className="mt-5 rounded-lg bg-[#f5fbff] p-4 text-sm text-[#64748b]">
          No applications yet. Your submitted applications will appear here.
        </p>
      ) : (
        <div className="mt-5 grid gap-3">
          {dashboard.recentApplications.slice(0, 3).map((application) => (
            <div key={application.id} className="rounded-lg border border-[#e2ecf7] bg-[#fbfdff] p-4">
              <p className="font-black text-[#0f172a]">{application.jobTitle}</p>
              <p className="mt-1 text-sm text-[#64748b]">{application.organizationName}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#64748b]">
                <span>{formatDate(application.appliedDate)}</span>
                <span className="rounded-full bg-[#eef6ff] px-2 py-0.5 text-[#1677f2]">
                  {application.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function UpcomingInterviews({ dashboard }: { dashboard: CandidateAccountDashboardViewModel }) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
      <h2 className="text-xl font-black text-[#120b45]">Upcoming Interviews</h2>
      {dashboard.upcomingInterviews.length === 0 ? (
        <p className="mt-5 rounded-lg bg-[#f5fbff] p-4 text-sm text-[#64748b]">
          No upcoming interviews yet. Interview updates will appear here when scheduled.
        </p>
      ) : (
        <div className="mt-5 grid gap-3">
          {dashboard.upcomingInterviews.map((interview) => (
            <div key={interview.id} className="rounded-lg border border-[#e2ecf7] bg-[#fbfdff] p-4">
              <p className="font-black text-[#0f172a]">{interview.jobTitle}</p>
              <p className="mt-1 text-sm text-[#64748b]">{interview.organizationName}</p>
              <p className="mt-3 text-sm font-bold text-[#1677f2]">{formatDate(interview.scheduledLabel)}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                {interview.typeLabel} · {interview.statusLabel}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

