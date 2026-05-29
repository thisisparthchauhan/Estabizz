"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { BlogSummary, BlogCategory } from "@/lib/blog/types";
import {
  CardHero,
  CardFeaturedSide,
  CardStandard,
  CardMini,
} from "@/components/blog/BlogCard";

interface Props {
  initialBlogs: BlogSummary[];
  categories: BlogCategory[];
}

// ─── Section heading with gold underline ──────────────────────────────────────

function SectionHeading({
  title,
  href,
  hrefLabel,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="text-[20px] font-black text-[#0a1628] leading-tight">
          {title}
        </h2>
        <div className="mt-1 h-[3px] w-10 rounded-full bg-[#d9a938]" />
      </div>
      {href && hrefLabel && (
        <Link
          href={href}
          className="text-[12px] font-bold text-[#0096D6] hover:text-[#0077B6] transition-colors"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <hr className="border-t border-[#e8e8e8] my-10" />;
}

// ─── Main BlogsClient ─────────────────────────────────────────────────────────

export default function BlogsClient({ initialBlogs, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs = useMemo<BlogSummary[]>(() => {
    let result = initialBlogs;
    if (activeCategory !== "all")
      result = result.filter((b) => b.category.slug === activeCategory);
    const q = search.trim().toLowerCase();
    if (q)
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q) ||
          b.category.name.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    return result;
  }, [initialBlogs, search, activeCategory]);

  const isFiltered = activeCategory !== "all" || search.trim().length > 0;
  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("all");
  }, []);

  // Categories that actually have published blogs
  const activeCats = useMemo(() => {
    const slugs = new Set(initialBlogs.map((b) => b.category.slug));
    return categories.filter((c) => slugs.has(c.slug));
  }, [initialBlogs, categories]);

  // Hero section data (only when not filtered, 2+ blogs)
  const heroBlogs = !isFiltered ? initialBlogs : [];
  const heroPrimary =
    heroBlogs.find((b) => b.featured) ?? heroBlogs[0] ?? null;
  const heroSide = heroPrimary
    ? heroBlogs.filter((b) => b.id !== heroPrimary.id).slice(0, 3)
    : [];

  // Latest section — first 6 blogs (excluding hero)
  const latestBlogs = !isFiltered
    ? initialBlogs.filter((b) => b.id !== heroPrimary?.id).slice(0, 6)
    : [];

  // Per-category sections — categories with 3+ blogs
  const categorySections = useMemo(() => {
    if (isFiltered) return [];
    return activeCats
      .map((cat) => ({
        cat,
        blogs: initialBlogs.filter((b) => b.category.slug === cat.slug),
      }))
      .filter(({ blogs }) => blogs.length >= 3);
  }, [initialBlogs, activeCats, isFiltered]);

  // Trending sidebar section — picks 6 standard + 5 mini
  const trendingStandard = !isFiltered ? initialBlogs.slice(0, 6) : [];
  const trendingMini = !isFiltered ? initialBlogs.slice(0, 5) : [];

  return (
    <main className="min-h-screen bg-white pt-[64px]">

      {/* ── STICKY CATEGORY NAV BAR ─────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#e8e8e8] shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-[#0a1628] text-white"
                  : "text-[#374151] hover:text-[#0a1628] hover:bg-[#f7f8fc]"
              }`}
            >
              All
            </button>
            {activeCats.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                  activeCategory === cat.slug
                    ? "text-white"
                    : "text-[#374151] hover:text-[#0a1628] hover:bg-[#f7f8fc]"
                }`}
                style={
                  activeCategory === cat.slug
                    ? { backgroundColor: cat.color }
                    : {}
                }
              >
                <span className="text-[12px]">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH BAR ──────────────────────────────────────────────────────── */}
      <div className="bg-[#f7f8fc] border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-screen-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-lg">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, regulations..."
                className="h-9 w-full rounded-lg border border-[#e0e0e0] bg-white pl-9 pr-4 text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/10"
              />
            </div>
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="text-[12px] font-bold text-[#6b7280] hover:text-[#0a1628] transition-colors whitespace-nowrap"
              >
                Clear ×
              </button>
            )}
            <p className="hidden sm:block text-[12px] text-[#9ca3af]">
              {filteredBlogs.length === 1
                ? "1 article"
                : `${filteredBlogs.length} articles`}
              {activeCategory !== "all" && (
                <span>
                  {" "}
                  in{" "}
                  <strong className="text-[#374151]">
                    {categories.find((c) => c.slug === activeCategory)?.name}
                  </strong>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── EMPTY STATE ─────────────────────────────────────────────────────── */}
      {filteredBlogs.length === 0 && (
        <div className="mx-auto max-w-screen-xl px-4 py-24 text-center">
          <div className="mb-5 text-5xl opacity-30">🔍</div>
          <h2 className="mb-2 text-[22px] font-black text-[#0a1628]">
            No articles found
          </h2>
          <p className="mb-8 text-[14px] text-[#6b7280]">
            Try a different keyword or browse all categories.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-[#0a1628] px-6 py-2.5 text-[13px] font-bold text-white hover:bg-[#0a1628]/90 transition-colors"
          >
            View all articles
          </button>
        </div>
      )}

      {/* ── FILTERED RESULTS GRID ───────────────────────────────────────────── */}
      {isFiltered && filteredBlogs.length > 0 && (
        <div className="mx-auto max-w-screen-xl px-4 py-10">
          <div className="grid grid-cols-1 gap-0 divide-y divide-[#f0f0f0] sm:grid-cols-2 sm:divide-y-0 sm:gap-5 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <CardStandard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      {/* ── UNFILTERED EDITORIAL LAYOUT ─────────────────────────────────────── */}
      {!isFiltered && initialBlogs.length > 0 && (
        <div className="mx-auto max-w-screen-xl px-4">

          {/* ── HERO SECTION ── */}
          {heroPrimary && (
            <>
              <div className="pt-8 pb-0">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[3fr_2fr]">
                  {/* Left — large card */}
                  <div className="border border-[#e8e8e8]">
                    <CardHero blog={heroPrimary} />
                  </div>

                  {/* Right — stack of compact cards */}
                  {heroSide.length > 0 && (
                    <div className="border border-l-0 border-[#e8e8e8] px-5 py-4">
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#9ca3af]">
                        Latest
                      </p>
                      {heroSide.map((blog) => (
                        <CardFeaturedSide key={blog.id} blog={blog} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Divider />
            </>
          )}

          {/* ── LATEST SECTION ── */}
          {latestBlogs.length > 0 && (
            <>
              <div>
                <SectionHeading title="Latest" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {latestBlogs.map((blog) => (
                    <CardStandard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>

              <Divider />
            </>
          )}

          {/* ── PER-CATEGORY SECTIONS ── */}
          {categorySections.map(({ cat, blogs }) => (
            <div key={cat.slug}>
              <SectionHeading
                title={cat.name}
                href={`/blogs/category/${cat.slug}`}
                hrefLabel="See all →"
              />
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.slice(0, 3).map((blog) => (
                  <CardStandard key={blog.id} blog={blog} />
                ))}
              </div>
              <Divider />
            </div>
          ))}

          {/* ── TRENDING SIDEBAR SECTION ── */}
          {(trendingStandard.length > 0 || trendingMini.length > 0) && (
            <>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
                {/* Left — 3 standard cards */}
                <div>
                  <SectionHeading title="More to Read" />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {trendingStandard.slice(0, 3).map((blog) => (
                      <CardStandard key={blog.id} blog={blog} />
                    ))}
                  </div>
                </div>

                {/* Right — trending mini list */}
                {trendingMini.length > 0 && (
                  <div className="bg-[#f7f8fc] p-5 rounded-none border border-[#e8e8e8]">
                    <SectionHeading title="Trending" />
                    <div>
                      {trendingMini.slice(0, 5).map((blog) => (
                        <CardMini key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Divider />
            </>
          )}

          {/* ── CTA BLOCK ── */}
          <div className="mb-16">
            <div className="bg-[#0a1628] px-8 py-10 md:py-14 text-center">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d9a938]">
                Expert Regulatory Advisory
              </p>
              <h2 className="mb-3 text-[24px] font-black leading-tight text-white md:text-[30px]">
                Need regulatory guidance for your business?
              </h2>
              <p className="mb-7 mx-auto max-w-xl text-[14px] leading-relaxed text-white/60">
                RBI, SEBI, IRDAI, IFSCA licensing and compliance — handled
                end-to-end by India&apos;s leading regulatory advisory team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-[#d9a938] px-7 py-3 text-[14px] font-black text-[#071224] hover:bg-[#f0c040] transition-colors"
                >
                  Book Consultation →
                </Link>
                <Link
                  href="/services"
                  className="rounded-lg border border-white/20 px-7 py-3 text-[14px] font-bold text-white/80 hover:border-white/40 hover:text-white transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
