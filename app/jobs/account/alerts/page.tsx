import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { loadCandidateAccountDashboard } from "@/lib/jobs/candidateAccount/data";
import { buildLoginHref } from "@/lib/jobs/candidateIdentity/redirects";
import { requireCandidateProfileSessionForPage } from "@/lib/jobs/profileReview/candidateAccess";

export const metadata: Metadata = {
  title: "Job Alerts — Estabizz Jobs",
  description: "Manage job alert preferences in your Estabizz Jobs candidate account.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CandidateJobAlertsPage() {
  const session = await requireCandidateProfileSessionForPage();

  if (!session) {
    redirect(buildLoginHref("/jobs/account/alerts"));
  }

  const dashboard = await loadCandidateAccountDashboard(session);

  return (
    <main className="min-h-screen bg-[#f8fbff] px-4 py-10 text-[#0a1628] sm:px-6 lg:px-8 dark:bg-[#141417] dark:text-[#fafafa]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-full bg-[#eaf2ff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1677f2] dark:bg-[#1c1c20] dark:text-[#4f9dfb]">
            Job Alerts
          </div>
          <h1 className="text-[34px] font-black leading-tight tracking-tight text-[#120b45] md:text-[44px] dark:text-[#fafafa]">
            Manage job alerts
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#64748b] dark:text-[#a1a1aa]">
            Prepare keyword, location and frequency preferences for future job alerts. AI alerts are not enabled in this phase.
          </p>
        </div>

        <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] dark:bg-[#141417] dark:border-[#27272b]">
          <div className="mb-5 rounded-lg bg-[#f5fbff] p-4 dark:bg-[#141417]">
            <p className="text-sm font-bold text-[#334155] dark:text-[#a1a1aa]">
              Active alerts: <span className="text-[#1677f2] dark:text-[#4f9dfb]">{dashboard.alertsCount}</span>
            </p>
            <p className="mt-1 text-sm text-[#64748b] dark:text-[#a1a1aa]">
              Alert persistence will connect in a later phase. These controls define the V1 account surface.
            </p>
          </div>

          <form className="grid gap-5 md:grid-cols-2">
            <Field label="Alert name" placeholder="NBFC compliance roles" />
            <Field label="Keywords" placeholder="RBI, NBFC, compliance, risk" />
            <Field label="Preferred location" placeholder="Mumbai, GIFT City, Bengaluru" />
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a1a1aa]">
                Frequency
              </span>
              <select
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/15 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]"
                defaultValue="weekly"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="paused">Paused</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a1a1aa]">
                Domain filters
              </span>
              <input
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/15 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]"
                placeholder="RBI, SEBI, IFSCA, Banking, Fintech, Compliance"
              />
            </label>
            <div className="md:col-span-2">
              <button
                type="button"
                disabled
                className="rounded-lg bg-[#9dbff4] px-5 py-3 text-sm font-black text-white"
              >
                Save Alert Preferences
              </button>
              <p className="mt-2 text-xs text-[#64748b] dark:text-[#a1a1aa]">
                Saving will be enabled after alert persistence is introduced.
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a1a1aa]">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-blue-100 bg-white px-3 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/15 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#fafafa]"
        placeholder={placeholder}
      />
    </label>
  );
}
