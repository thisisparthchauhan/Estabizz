import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SOLUTION_CATEGORIES, getCategory, groupCategoryByTopic } from "@/lib/content/services/registry";
import CategoryBrowser from "./CategoryBrowser";

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
  const groups = groupCategoryByTopic(category);
  const total = groups.reduce((n, g) => n + g.entries.length, 0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#09090b] pt-[64px]">
      <header className="relative isolate overflow-hidden border-b border-blue-100 dark:border-[#27272b] bg-white dark:bg-[#141417]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-8%,rgba(22,119,242,0.12),transparent_46%)]" />
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <nav className="mb-6 flex items-center gap-2 text-[12px] font-medium text-[#94a3b8] dark:text-[#8b8b94]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#475569] dark:text-[#a1a1aa]">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/solutions" className="transition-colors hover:text-[#475569] dark:text-[#a1a1aa]">Solutions</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#475569] dark:text-[#a1a1aa]">{category.label}</span>
          </nav>
          <div className="text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2] dark:text-[#4f9dfb]">
            {category.icon} Solutions
          </div>
          <h1 className="mt-4 max-w-[860px] text-[clamp(32px,4vw,52px)] font-black leading-[1.07] tracking-[-0.04em] text-[#071426] dark:text-[#fafafa]">
            {category.label}
          </h1>
          <p className="mt-5 max-w-[720px] text-[17px] font-medium leading-[1.9] text-[#475569] dark:text-[#a1a1aa]">
            {category.tagline}
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
        {!hasAnything ? (
          <div className="rounded-[28px] border border-dashed border-blue-100 dark:border-[#27272b] bg-[#f7fbff] dark:bg-[#1c1c20] px-6 py-16 text-center">
            <p className="text-[20px] font-black text-[#071426] dark:text-[#fafafa]">Pages are being published</p>
            <p className="mx-auto mt-3 max-w-md text-[14.5px] font-medium leading-[1.8] text-[#64748b] dark:text-[#a1a1aa]">
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
          <CategoryBrowser
            groups={groups}
            categoryLabel={category.label}
            showFilter={total >= 10}
          />
        )}
      </section>
    </main>
  );
}
