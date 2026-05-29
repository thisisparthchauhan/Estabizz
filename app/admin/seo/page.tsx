import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Settings — Estabizz Admin",
  robots: { index: false, follow: false },
};

const SEO_FIELDS = [
  {
    label: "Default Meta Title Template",
    value: "%s | Estabizz Regulatory Insights",
    note: "%s is replaced with each page's title",
  },
  {
    label: "Default Meta Description",
    value:
      "Expert insights on RBI, SEBI, IRDAI, IFSCA, MCA and allied regulatory matters for Indian fintech and financial services businesses.",
    note: "Used when individual articles do not define their own description",
  },
  {
    label: "OG Image (default)",
    value: "/images/og-default.png",
    note: "Displayed when sharing on social platforms",
  },
  {
    label: "Canonical Domain",
    value: "https://www.estabizz.com",
    note: "Used in sitemap and structured data",
  },
  {
    label: "Sitemap Regeneration",
    value: "On publish (manual trigger)",
    note: "TODO: wire revalidatePath + next-sitemap once DB layer is added",
  },
];

export default function SeoSettingsPage() {
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[21px] font-black text-[#0a1628]">SEO Settings</h1>
        <p className="mt-0.5 text-[13px] text-[#64748b]">
          Global defaults for blog meta tags, Open Graph and sitemap configuration.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
        <div className="border-b border-[#f0f4f8] bg-[#f8fafc] px-6 py-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
            Global SEO Defaults
          </span>
        </div>

        <div className="divide-y divide-[#f8fafc]">
          {SEO_FIELDS.map((field) => (
            <div key={field.label} className="px-6 py-4">
              <div className="text-[12px] font-black uppercase tracking-wider text-[#94a3b8] mb-1.5">
                {field.label}
              </div>
              <div className="rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-4 py-2.5 text-[13px] text-[#0a1628] font-medium">
                {field.value}
              </div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">{field.note}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#f0f4f8] bg-[#fffbf0] px-6 py-4">
          <div className="flex items-start gap-3 rounded-xl border border-[#d9a938]/30 bg-[#d9a938]/8 px-4 py-3">
            <span className="text-[#d9a938] text-lg mt-0.5 shrink-0">ℹ</span>
            <p className="text-[12px] text-[#b8860b] font-medium leading-5">
              These settings are currently read-only / informational. Editable global
              SEO configuration (with sitemap regeneration and search-console integration)
              is on the development roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
