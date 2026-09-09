import "server-only";
import type { Metadata } from "next";
import { getRecruitmentDashboard } from "@/lib/jobs/recruitmentOps/dashboardRepository";

export const metadata: Metadata = {
  title: "Recruitment Dashboard — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Stat({ label, value, colour }: { label: string; value: number; colour?: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe7f3] bg-white p-5">
      <p className="text-[11px] font-black uppercase tracking-widest text-[#64748b]">{label}</p>
      <p
        className="mt-2 text-[34px] font-black"
        style={{ color: colour ?? "#0a1628" }}
      >
        {value}
      </p>
    </div>
  );
}

export default async function RecruitmentDashboardPage() {
  const data = await getRecruitmentDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[24px] font-black text-[#0a1628]">Recruitment Dashboard</h1>
        <p className="mt-1 text-[13px] text-[#64748b]">Live counts from staging database.</p>
      </div>

      {/* Top-line KPIs */}
      <section>
        <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Open Jobs" value={data.openJobs} colour="#1677f2" />
          <Stat label="Total Candidates" value={data.totalCandidates} />
          <Stat label="Total Applications" value={data.totalApplications} />
          <Stat label="Interviews Today" value={data.interviewsTodayCount} colour="#f59e0b" />
        </div>
      </section>

      {/* Stage pipeline */}
      <section>
        <h2 className="mb-4 text-[12px] font-black uppercase tracking-widest text-[#64748b]">Pipeline by Stage</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.byStage.map((s) => (
            <div key={s.stageSlug} className="rounded-2xl border border-[#dbe7f3] bg-white p-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.colour ?? "#94a3b8" }}
                />
                <p className="text-[12px] font-black uppercase tracking-widest text-[#64748b]">{s.stageName}</p>
              </div>
              <p className="mt-2 text-[32px] font-black text-[#0a1628]">{s.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alerts */}
      {data.overdueTasksCount > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="font-black text-red-700">
            ⚠ {data.overdueTasksCount} overdue task{data.overdueTasksCount !== 1 ? "s" : ""} —{" "}
            <a href="/admin/jobs/tasks" className="underline hover:no-underline">
              view tasks
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
