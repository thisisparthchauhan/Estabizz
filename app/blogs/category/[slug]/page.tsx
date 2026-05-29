/**
 * /blogs/category/[slug] — Category-filtered blog listing
 *
 * Shows all published blogs in a given category.
 * Invalid category slugs return a 404.
 *
 * SEO:
 *   - Dynamic title + description per category
 *   - Canonical URL, Open Graph, Twitter card
 *   - BreadcrumbList JSON-LD
 *   - generateStaticParams pre-renders all valid category routes at build time
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPublishedBlogSummaries,
  getAllCategories,
  getCategoryBySlug,
} from "@/lib/blog/repository";
import { CardStandard } from "@/components/blog/BlogCard";
import type { BlogSummary } from "@/lib/blog/types";

// ─── Params ───────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

// ─── Pre-render all category routes at build time ─────────────────────────────

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.name} | Estabizz Regulatory Insights`;
  const description = category.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/category/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/blogs/category/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function buildBreadcrumbSchema(categoryName: string, categorySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.estabizz.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Regulatory Insights",
        item: "https://www.estabizz.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://www.estabizz.com/blogs/category/${categorySlug}`,
      },
    ],
  };
}

export const dynamic = "force-dynamic";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryBlogsPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  const blogs: BlogSummary[] = await getPublishedBlogSummaries({
    category: slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbSchema(category.name, category.slug)
          ),
        }}
      />

      <main className="min-h-screen bg-white pt-[64px]">

        {/* ── Category hero — white bg, editorial style ── */}
        <div className="border-b border-[#e8e8e8] bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="mb-5 flex items-center gap-2 text-[12px] text-[#9ca3af]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-[#374151] transition-colors">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <Link
                href="/blogs"
                className="hover:text-[#374151] transition-colors"
              >
                Regulatory Insights
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-[#374151]">{category.name}</span>
            </nav>

            {/* Category badge */}
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white"
                style={{ backgroundColor: category.color }}
              >
                <span className="text-[16px]">{category.icon}</span>
                {category.name}
              </span>
            </div>

            {/* Large category title */}
            <h1 className="mb-3 text-[32px] font-black leading-tight text-[#0a1628] md:text-[40px] lg:text-[48px]">
              {category.name}
            </h1>

            {/* Gold underline accent */}
            <div className="mb-4 h-[4px] w-14 rounded-full bg-[#d9a938]" />

            <p className="max-w-2xl text-[15px] leading-7 text-[#6b7280]">
              {category.description}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-[13px] text-[#9ca3af]">
                {blogs.length} published article
                {blogs.length !== 1 ? "s" : ""}
              </span>
              <Link
                href="/blogs"
                className="text-[12px] font-bold text-[#0096D6] hover:text-[#0077B6] transition-colors"
              >
                ← All Categories
              </Link>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

          {blogs.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 text-5xl opacity-20">{category.icon}</div>
              <h2 className="mb-2 text-[20px] font-black text-[#0a1628]">
                No articles yet
              </h2>
              <p className="mb-6 max-w-sm text-[13px] leading-6 text-[#6b7280]">
                No published articles in <strong>{category.name}</strong> yet.
                Check back soon or explore other categories.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0a1628] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors"
              >
                ← Browse All Articles
              </Link>
            </div>
          ) : (
            /* Blog grid — 3 columns */
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <CardStandard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {/* Other categories strip */}
          <OtherCategories currentSlug={slug} />
        </div>
      </main>
    </>
  );
}

// ─── Other categories strip ───────────────────────────────────────────────────

async function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const categories = await getAllCategories();
  const others = categories.filter((c) => c.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[#e8e8e8] pt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-[18px] font-black text-[#0a1628]">
            Browse Other Topics
          </h2>
          <div className="mt-1 h-[3px] w-8 rounded-full bg-[#d9a938]" />
        </div>
        <Link
          href="/blogs"
          className="text-[12px] font-bold text-[#0096D6] hover:text-[#0077B6] transition-colors"
        >
          All Articles →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {others.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blogs/category/${cat.slug}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#374151] hover:border-[#0096D6]/40 hover:text-[#0096D6] transition-all"
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
