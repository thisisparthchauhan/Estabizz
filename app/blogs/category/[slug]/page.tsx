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
import { BlogCard } from "@/components/blog/BlogCard";
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryBlogsPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  // Only published blogs — category-filtered
  const blogs: BlogSummary[] = await getPublishedBlogSummaries({ category: slug });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(category.name, category.slug)),
        }}
      />

      <main className="min-h-screen bg-[#f5f7fa] pt-[64px]">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#071224] via-[#0a1e3a] to-[#091730]" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
            <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-[#d9a938]/8 blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:48px_48px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-18">
            {/* Breadcrumb */}
            <nav className="mb-5 flex items-center gap-2 text-[12px] text-white/45" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/25">/</span>
              <Link href="/blogs" className="hover:text-white/80 transition-colors">Regulatory Insights</Link>
              <span className="text-white/25">/</span>
              <span className="text-[#d9a938]/80">{category.name}</span>
            </nav>

            {/* Category badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9a938]/35 bg-[#d9a938]/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#d9a938]">
              <span className="text-[16px]">{category.icon}</span>
              {category.name}
            </div>

            <h1 className="mb-3 text-[28px] font-black leading-tight text-white md:text-[36px] lg:text-[40px]">
              {category.name}
            </h1>
            <p className="max-w-2xl text-[15px] leading-7 text-white/60">
              {category.description}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-[13px] text-white/45">
                {blogs.length} published article{blogs.length !== 1 ? "s" : ""}
              </span>
              <Link
                href="/blogs"
                className="text-[12px] font-bold text-[#d9a938]/70 hover:text-[#d9a938] transition-colors"
              >
                ← All Categories
              </Link>
            </div>
          </div>
        </section>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">

          {blogs.length === 0 ? (
            // ── Empty state ─────────────────────────────────────────────────
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 text-5xl opacity-20">{category.icon}</div>
              <h2 className="mb-2 text-[20px] font-black text-[#0a1628]">
                No articles yet
              </h2>
              <p className="mb-6 max-w-sm text-[13px] leading-6 text-[#64748b]">
                No published articles in <strong>{category.name}</strong> yet.
                Check back soon or explore other categories.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors shadow-sm"
              >
                ← Browse All Articles
              </Link>
            </div>
          ) : (
            // ── Blog grid ───────────────────────────────────────────────────
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {/* ── Category browser ─────────────────────────────────────────── */}
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
    <section className="mt-14 border-t border-[#e8edf5] pt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[16px] font-black text-[#0a1628]">
          Browse Other Topics
        </h2>
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
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#e2eaf2] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#475569] hover:border-[#d9a938]/50 hover:bg-[#fffbf0] hover:text-[#b8860b] transition-all shadow-sm"
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
