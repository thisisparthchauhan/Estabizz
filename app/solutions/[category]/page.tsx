import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SOLUTION_CATEGORIES, getCategory } from "@/lib/content/services/registry";

// /solutions/<category> — the index for one practice area.
//
// Exists so the URL is not a 404 when someone trims a path or a crawler walks
// up the hierarchy, and so each category has one page that owns its internal
// links -- both the long-form pages in this repo and the related services that
// still live at their original URLs.

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return SOLUTION_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.label} Services in India`,
    description: category.tagline,
    alternates: { canonical: `/solutions/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function SolutionCategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const hasAnything = category.pages.length + category.externalServices.length > 0;

  return (
    <main className="min-h-screen bg-white pt-[64px]">
      <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-8%,rgba(22,119,242,0.12),transparent_46%)]" />
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <nav className="mb-6 flex items-center gap-2 text-[12px] font-medium text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#475569]">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/solutions" className="transition-colors hover:text-[#475569]">Solutions</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#475569]">{category.label}</span>
          </nav>
          <div className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">
            {category.icon} Solutions
          </div>
          <h1 className="mt-4 max-w-[860px] text-[clamp(32px,4vw,52px)] font-black leading-[1.07] tracking-[-0.04em] text-[#071426]">
            {category.label}
          </h1>
          <p className="mt-5 max-w-[720px] text-[17px] font-medium leading-[1.9] text-[#475569]">
            {category.tagline}
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
        {!hasAnything ? (
          <div className="rounded-[28px] border border-dashed border-blue-100 bg-[#f7fbff] px-6 py-16 text-center">
            <p className="text-[20px] font-black text-[#071426]">Pages are being published</p>
            <p className="mx-auto mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b]">
              We are finalising the {category.label} guides. Talk to the team in the meantime and we
              will walk you through the position for your business.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(22,119,242,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]"
            >
              Speak with Expert →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {category.pages.map((page) => (
              <Link
                key={page.slug}
                href={`/solutions/${category.slug}/${page.slug}`}
                className="group flex flex-col rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(0,80,140,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1677f2]/40"
              >
                <span className="text-[11.5px] font-black uppercase tracking-[0.18em] text-[#1677f2]">
                  Full guide
                </span>
                <h2 className="mt-3 text-[20px] font-black leading-tight text-[#071426] transition-colors group-hover:text-[#1677f2]">
                  {page.hero.heading}
                </h2>
                <p className="mt-3 flex-1 text-[14px] font-medium leading-[1.8] text-[#64748b]">
                  {page.seo.description}
                </p>
                <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] font-bold text-[#94a3b8]">
                  <span>{page.sections.length} sections</span>
                  <span className="text-[#cbd5e1]">·</span>
                  <span>{page.faqs.length} FAQs</span>
                  <span className="ml-auto text-[#1677f2]">Read the guide →</span>
                </span>
              </Link>
            ))}

            {category.externalServices.map((svc) => (
              <Link
                key={svc.href + svc.title}
                href={svc.href}
                className="group flex flex-col rounded-[28px] border border-blue-100 bg-[#f7fbff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#1677f2]/40 hover:bg-white"
              >
                <span className="text-[11.5px] font-black uppercase tracking-[0.18em] text-[#94a3b8]">
                  Service
                </span>
                <h2 className="mt-3 text-[18px] font-black leading-tight text-[#071426] transition-colors group-hover:text-[#1677f2]">
                  {svc.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] font-medium leading-[1.8] text-[#64748b]">
                  {svc.description}
                </p>
                <span className="mt-5 text-[13px] font-bold text-[#1677f2]">Open →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
