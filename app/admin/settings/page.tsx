import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Estabizz Admin",
  robots: { index: false, follow: false },
};

const SETTING_GROUPS = [
  {
    title: "General",
    items: [
      { label: "Site Name",            value: "Estabizz Fintech Private Limited" },
      { label: "Blog Section Name",    value: "Regulatory Insights" },
      { label: "Blog URL Prefix",      value: "/blogs" },
      { label: "Posts per page",       value: "9" },
    ],
  },
  {
    title: "Submissions",
    items: [
      { label: "Accept external submissions", value: "Enabled" },
      { label: "Submission notification email", value: "editorial@estabizz.com" },
      { label: "Auto-approve threshold",       value: "Manual review required" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "Email on new submission",  value: "TODO: configure SMTP" },
      { label: "Slack channel",            value: "TODO: configure webhook" },
      { label: "Publish notification",     value: "TODO: submitter email" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">Settings</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          Global configuration for the Estabizz admin panel and blog module.
        </p>
      </div>

      <div className="space-y-5">
        {SETTING_GROUPS.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_10px_rgba(10,22,40,0.04)] overflow-hidden"
          >
            <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
                {group.title}
              </span>
            </div>
            <div className="divide-y divide-[#f8fafc]">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-3.5">
                  <span className="text-[13px] font-semibold text-[#0a1628]">{item.label}</span>
                  <span className="rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-3 py-1.5 text-[12px] text-[#475569] font-medium max-w-[50%] truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#1677f2]/30 bg-[#1677f2]/8 px-6 py-4">
        <div className="flex items-start gap-3">
          <span className="text-[#1677f2] text-lg mt-0.5 shrink-0">ℹ</span>
          <p className="text-[12px] text-[#b8860b] font-medium leading-5">
            Settings are currently read-only / informational. A fully editable settings
            panel with database persistence is planned. For now, site configuration lives
            in environment variables and{" "}
            <code className="rounded bg-[#1677f2]/15 px-1 py-0.5 font-mono text-[11px]">
              lib/blog/
            </code>{" "}
            source files.
          </p>
        </div>
      </div>
    </div>
  );
}
