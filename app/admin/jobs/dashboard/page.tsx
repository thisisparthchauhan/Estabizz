import "server-only";
import type { Metadata } from "next";
import Link from "next/link";
import { getRecruitmentDashboard } from "@/lib/jobs/recruitmentOps/dashboardRepository";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Recruitment Dashboard — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface KpiCardProps {
  label: string;
  value: number;
  accent?: string;
  sub?: string;
  href?: string;
  alert?: boolean;
}

function KpiCard({ label, value, accent, sub, href, alert }: KpiCardProps) {
  const inner = (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] ${
        alert
          ? "border-red-200 bg-red-50"
          : "border-[#dbe7f3]"
      }`}
    >
      <p className={`text-[10.5px] font-black uppercase tracking-[0.12em] ${alert ? "text-red-500" : "text-[#64748b]"}`}>
        {label}
      </p>
      <p
        className={`mt-3 text-[40px] font-black leading-none ${alert && value > 0 ? "text-red-600" : ""}`}
        style={{ color: !alert || value === 0 ? (accent ?? "#0a1628") : undefined }}
      >
        {value}
      </p>
      {sub && <p className="mt-1.5 text-[11.5px] text-[#94a3b8]">{sub}</p>}
    </div>
  );
  if (href) return <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677f2]/60 rounded-2xl">{inner}</Link>;
  return inner;
}

export default async function RecruitmentDashboardPage() {
  const data = await getRecruitmentDashboard();

  return (
    <AdminPageContainer>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10.5px] font-black uppercase tracking-[0.14em] text-[#1677f2]/70 mb-1">
              Estabizz Jobs
            </p>
            <h1 className="text-[26px] font-black text-[#0a1628]">Recruitment Dashboard</h1>
            <p className="mt-1 text-[13px] text-[#64748b]">
              Live counts from staging database — updates on every page load.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* KPI overview */}
      <section className="mb-8">
        <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#64748b]">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard label="Open Jobs" value={data.openJobs} accent="#1677f2" sub="active listings" href="/admin/jobs" />
          <KpiCard label="Total Candidates" value={data.totalCandidates} sub="in database" href="/admin/jobs/candidates" />
          <KpiCard label="Total Applications" value={data.totalApplications} sub="all time" href="/admin/jobs/applications" />
          <KpiCard label="Interviews Today" value={data.interviewsTodayCount} accent="#f59e0b" sub="scheduled" href="/admin/jobs/interviews" />
        </div>
      </section>

      {/* Overdue tasks alert */}
      {data.overdueTasksCount > 0 && (
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="Overdue Tasks" value={data.overdueTasksCount} alert sub="require attention" href="/admin/jobs/tasks" />
          </div>
        </section>
      )}

      {/* Pipeline by stage */}
      {data.byStage.length > 0 && (
        <section>
          <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#64748b]">Pipeline by Stage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {data.byStage.map((s) => (
              <div
                key={s.stageSlug}
                className="rounded-2xl border border-[#dbe7f3] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.colour ?? "#94a3b8" }}
                  />
                  <p className="text-[10.5px] font-black uppercase tracking-[0.12em] text-[#64748b] truncate">
                    {s.stageName}
                  </p>
                </div>
                <p className="text-[36px] font-black text-[#0a1628] leading-none">{s.count}</p>
                <p className="mt-1.5 text-[11.5px] text-[#94a3b8]">
                  {s.count === 1 ? "application" : "applications"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </AdminPageContainer>
  );
}
