import type { Metadata } from "next";
import Link from "next/link";
import { LANDING_PAGES } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Corporate Services | MCA & ROC Compliance — Estabizz Fintech",
  description:
    "Estabizz Fintech corporate services — company registration, change of company name, appointment of directors and allied MCA/ROC compliance support for Indian businesses.",
  alternates: { canonical: "/19-5" },
  robots: { index: true, follow: true },
};

export default function CorporateServicesIndex() {
  return (
    <main className="min-h-screen bg-white pt-[64px]">
      {/* Hero */}
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#374151]">Corporate Services</span>
          </nav>
          <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
            MCA / ROC Compliance
          </div>
          <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[46px]">
            Corporate <span className="text-[#1677f2]">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
            Practical, compliance-first support for company incorporation, structural
            changes and board governance under the Companies Act, 2013.
          </p>
        </div>
      </header>

      {/* Cards */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {LANDING_PAGES.map((page) => (
            <Link
              key={page.slug}
              href={`/19-5/${page.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]"
            >
              <div>
                <span className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-3 py-1 text-[10.5px] font-black uppercase tracking-wider text-[#0077B6]">
                  {page.category}
                </span>
                <h2 className="mt-4 text-[19px] font-black leading-snug text-[#0a1628] group-hover:text-[#1677f2] transition-colors">
                  {page.title}
                </h2>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-[#64748b] line-clamp-3">
                  {page.tagline}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-black text-[#1677f2]">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
