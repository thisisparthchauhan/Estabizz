import type { Metadata } from "next";
import Link from "next/link";

import { SOLUTION_CATEGORIES } from "@/lib/content/services/registry";

// /solutions — the practice-area hub.
//
// Solutions answers "what kind of help do I need?" (IPR, Legal, Compliance
// Calendar, CFO); /regulatory answers "which licence do I hold?" (RBI, SEBI,
// IRDAI, IFSCA). Keeping the two hierarchies distinct is why the Solutions
// navbar dropdown no longer repeats the regulator verticals.

export const metadata: Metadata = {
  // The root layout applies the "%s | Estabizz Fintech" template, so the
  // brand suffix must not be repeated here.
  title: "Solutions — IPR, Legal, Compliance Calendar & CFO Services",
  description:
    "Estabizz practice areas beyond licensing: intellectual property protection, legal advisory and diligence, compliance calendar and regulatory tracking, and outsourced CFO services.",
  alternates: { canonical: "/solutions" },
  robots: { index: true, follow: true },
};

export default function SolutionsHubPage() {
  return (
    <main className="min-h-screen bg-white pt-[64px]">
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-8%,rgba(22,119,242,0.12),transparent_46%),radial-gradient(circle_at_88%_84%,rgba(217,169,56,0.08),transparent_32%)]" />
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <nav className="mb-6 flex items-center gap-2 text-[12px] font-medium text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#475569]">Home</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#475569]">Solutions</span>
          </nav>
          <div className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
            Practice areas
          </div>
          <h1 className="mt-4 max-w-[900px] text-[clamp(32px,4vw,52px)] font-black leading-[1.07] tracking-[-0.04em] text-[#071426]">
            Solutions beyond the licence.
          </h1>
          <p className="mt-5 max-w-[720px] text-[17px] font-medium leading-[1.9] text-[#475569]">
            Regulatory registrations are only part of what a business needs. These are the practice
            areas Estabizz runs alongside them — protecting what you create, handling the legal
            work, tracking what falls due, and holding the finance function together.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
            >
              Speak with Expert →
            </Link>
            <Link
              href="/regulatory"
              className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-8 py-3.5 text-[15px] font-bold text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]"
            >
              Looking for a licence? Regulatory →
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {SOLUTION_CATEGORIES.map((category) => {
            const count = category.pages.length + category.externalServices.length;
            return (
              <Link
                key={category.slug}
                href={`/solutions/${category.slug}`}
                className="group flex flex-col rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(0,80,140,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1677f2]/40"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef5ff] text-[22px]"
                  aria-hidden="true"
                >
                  {category.icon}
                </span>
                <h2 className="mt-4 text-[20px] font-black leading-tight text-[#071426] transition-colors group-hover:text-[#1677f2]">
                  {category.label}
                </h2>
                <p className="mt-3 flex-1 text-[14px] font-medium leading-[1.8] text-[#64748b]">
                  {category.tagline}
                </p>
                <span className="mt-5 flex items-center justify-between text-[13px] font-bold">
                  <span className="text-[#94a3b8]">
                    {count} {count === 1 ? "service" : "services"}
                  </span>
                  <span className="text-[#1677f2]">Explore →</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
