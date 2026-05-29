"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { BlogSummary, BlogCategory } from "@/lib/blog/types";
import {
  CardHero,
  CardFeaturedSide,
  CardStandard,
  CardHorizontal,
  CardPopularRank,
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
        <h2 className="text-[20px] font-black tracking-tight text-[#0a1628] leading-tight">
          {title}
        </h2>
        <div className="mt-1.5 h-[3px] w-12 rounded-full bg-[#d9a938]" />
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

function Divider() {
  return <hr className="border-t border-[#e8e8e8] my-10" />;
}

function fmtShort(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ─── Newsletter / CTA block ───────────────────────────────────────────────────

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to real newsletter endpoint (Resend / Mailchimp / DB)
    setDone(true);
  };

  return (
    <div className="mb-16 overflow-hidden border border-[#e8e8e8] bg-[#0a1628]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* Left — copy + form */}
        <div className="px-7 py-10 md:px-10 md:py-12">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d9a938]">
            Estabizz Regulatory Intelligence
          </p>
          <h2 className="mb-3 text-[24px] font-black leading-tight text-white md:text-[28px]">
            Stay Updated with Estabizz Regulatory Insights
          </h2>
          <p className="mb-6 max-w-lg text-[13.5px] leading-relaxed text-white/55">
            Receive curated updates on RBI, SEBI, IRDAI, IFSCA and financial
            compliance directly from Estabizz professionals.
          </p>

          {done ? (
            <div className="flex items-center gap-2 rounded-lg border border-[#d9a938]/40 bg-[#d9a938]/10 px-4 py-3 text-[13px] font-bold text-[#d9a938]">
              ✓ You&apos;re subscribed. Watch your inbox for regulatory updates.
            </div>
          ) : (
            <form onSubmit={submit} className="flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-11 flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-4 text-[13.5px] text-white placeholder:text-white/35 outline-none focus:border-[#d9a938]/50 focus:ring-2 focus:ring-[#d9a938]/15"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-lg bg-[#d9a938] px-6 text-[13.5px] font-black text-[#071224] hover:bg-[#f0c040] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Right — speak to an expert */}
        <div className="flex flex-col justify-center gap-4 border-t border-white/10 bg-white/[0.02] px-7 py-10 md:px-10 lg:border-l lg:border-t-0">
          <div>
            <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-white/40">
              Need professional help?
            </p>
            <p className="text-[14px] font-bold leading-snug text-white">
              Speak to an Estabizz regulatory expert
            </p>
          </div>
          <a
            href="tel:9825600907"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.05] px-5 py-3 text-[15px] font-black text-white transition-colors hover:border-[#d9a938]/50 hover:text-[#d9a938]"
          >
            <svg className="h-4 w-4 text-[#d9a938]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Estabizz Team 9825600907
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d9a938] px-5 py-3 text-[13.5px] font-black text-[#071224] hover:bg-[#f0c040] transition-colors"
          >
            Speak to an Expert →
          </Link>
        </div>
      </div>
    </div>
  );
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

  // Categories that actually have published blogs (for per-category sections)
  const activeCats = useMemo(() => {
    const slugs = new Set(initialBlogs.map((b) => b.category.slug));
    return categories.filter((c) => slugs.has(c.slug));
  }, [initialBlogs, categories]);

  // ── Layout slices ──
  const heroPrimary = !isFiltered
    ? (initialBlogs.find((b) => b.featured) ?? initialBlogs[0] ?? null)
    : null;
  const heroSide = heroPrimary
    ? initialBlogs.filter((b) => b.id !== heroPrimary.id).slice(0, 4)
    : [];

  const usedIds = new Set<string>(heroPrimary ? [heroPrimary.id] : []);

  const latestBlogs = !isFiltered
    ? initialBlogs.filter((b) => !usedIds.has(b.id)).slice(0, 6)
    : [];
  latestBlogs.forEach((b) => usedIds.add(b.id));

  // Featured analysis — 2 horizontal thought-leadership pieces
  const featuredAnalysis = !isFiltered
    ? initialBlogs.filter((b) => !usedIds.has(b.id)).slice(0, 2)
    : [];

  // Most popular — ranked 1..5 (by views, fallback to recency)
  const mostPopular = !isFiltered
    ? [...initialBlogs]
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        .slice(0, 5)
    : [];

  // Latest ticker — 5 most recent titles
  const tickerItems = !isFiltered ? initialBlogs.slice(0, 5) : [];

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

  // "More to read" grid (3 standard) beside Most Popular sidebar
  const moreToRead = !isFiltered ? initialBlogs.slice(0, 3) : [];

  return (
    <main className="min-h-screen bg-white pt-[64px]">

      {/* ── BLOG HEADER AREA ────────────────────────────────────────────────── */}
      <header className="border-b border-[#e8e8e8] bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-10">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#d9a938]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9a938]" />
            Estabizz Regulatory Intelligence
          </div>
          <h1 className="mt-2 text-[32px] font-black leading-none tracking-tight text-[#0a1628] sm:text-[42px]">
            Estabizz Insights
          </h1>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#6b7280] sm:text-[16px]">
            Regulatory updates, licensing insights and financial compliance
            intelligence for Indian businesses.
          </p>
        </div>
      </header>

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
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                  activeCategory === cat.slug
                    ? "text-white"
                    : "text-[#374151] hover:text-[#0a1628] hover:bg-[#f7f8fc]"
                }`}
                style={activeCategory === cat.slug ? { backgroundColor: cat.color } : {}}
              >
                <span className="text-[12px]">{cat.icon}</span>
                <span className="whitespace-nowrap">{cat.name}</span>
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
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
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
              {filteredBlogs.length === 1 ? "1 article" : `${filteredBlogs.length} articles`}
              {activeCategory !== "all" && (
                <span> in <strong className="text-[#374151]">
                  {categories.find((c) => c.slug === activeCategory)?.name}
                </strong></span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── LATEST REGULATORY UPDATE TICKER ─────────────────────────────────── */}
      {!isFiltered && tickerItems.length > 0 && (
        <div className="border-b border-[#e8e8e8] bg-white">
          <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-2.5">
            <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-[#0a1628] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#d9a938]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9a938] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d9a938]" />
              </span>
              Latest Update
            </span>
            <div className="flex flex-1 items-center gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-hide">
              {tickerItems.map((b) => (
                <Link
                  key={b.id}
                  href={`/blogs/${b.slug}`}
                  className="group flex shrink-0 items-center gap-2 text-[12.5px] whitespace-nowrap"
                >
                  <span className="font-black uppercase tracking-wide" style={{ color: b.category.color }}>
                    {b.category.name.split(" ")[0]}
                  </span>
                  <span className="font-semibold text-[#374151] group-hover:text-[#0096D6] transition-colors">
                    {b.title}
                  </span>
                  <span className="text-[#cbd5e1]">·</span>
                  <span className="text-[#9ca3af]">{fmtShort(b.publishedAt)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── EMPTY STATE ─────────────────────────────────────────────────────── */}
      {filteredBlogs.length === 0 && (
        <div className="mx-auto max-w-screen-xl px-4 py-24 text-center">
          <div className="mb-5 text-5xl opacity-30">🔍</div>
          <h2 className="mb-2 text-[22px] font-black text-[#0a1628]">No regulatory insight found</h2>
          <p className="mb-8 text-[14px] text-[#6b7280]">
            {search.trim()
              ? <>No results for &quot;{search}&quot;. Try RBI, SEBI, NBFC, Insurance or Fintech.</>
              : "No articles in this category yet. Check back soon or browse all insights."}
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
          <div className="mb-6">
            <h2 className="text-[18px] font-black text-[#0a1628]">
              {search.trim()
                ? <>Results for &quot;{search}&quot;</>
                : categories.find((c) => c.slug === activeCategory)?.name}
            </h2>
            <p className="mt-1 text-[12.5px] text-[#9ca3af]">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"} found
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <CardStandard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      {/* ── UNFILTERED EDITORIAL LAYOUT ─────────────────────────────────────── */}
      {!isFiltered && initialBlogs.length > 0 && (
        <div className="mx-auto max-w-screen-xl px-4">

          {/* ── TOP REGULATORY STORIES (HERO) ── */}
          {heroPrimary && (
            <>
              <div className="pt-8">
                <SectionHeading title="Top Regulatory Stories" />
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[3fr_2fr]">
                  <div className="border border-[#e8e8e8]">
                    <CardHero blog={heroPrimary} />
                  </div>
                  {heroSide.length > 0 && (
                    <div className="border border-t-0 border-[#e8e8e8] px-5 py-4 lg:border-l-0 lg:border-t">
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#9ca3af]">
                        More Top Stories
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

          {/* ── LATEST REGULATORY INSIGHTS ── */}
          {latestBlogs.length > 0 && (
            <>
              <SectionHeading title="Latest Regulatory Insights" />
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {latestBlogs.map((blog) => (
                  <CardStandard key={blog.id} blog={blog} />
                ))}
              </div>
              <Divider />
            </>
          )}

          {/* ── FEATURED ANALYSIS ── */}
          {featuredAnalysis.length > 0 && (
            <>
              <SectionHeading title="Featured Analysis" />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {featuredAnalysis.map((blog, i) => (
                  <CardHorizontal
                    key={blog.id}
                    blog={blog}
                    label={i === 0 ? "Expert View" : "Regulatory Analysis"}
                  />
                ))}
              </div>
              <Divider />
            </>
          )}

          {/* ── MORE TO READ + MOST POPULAR SIDEBAR ── */}
          {mostPopular.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
                {/* Left — more standard cards */}
                <div>
                  <SectionHeading title="Compliance Guides" />
                  <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {moreToRead.map((blog) => (
                      <CardStandard key={blog.id} blog={blog} />
                    ))}
                  </div>
                </div>

                {/* Right — Most Popular ranked */}
                <div>
                  <SectionHeading title="Most Popular" />
                  <div className="border border-[#e8e8e8] bg-[#f7f8fc] px-5 py-2">
                    {mostPopular.map((blog, i) => (
                      <CardPopularRank key={blog.id} blog={blog} rank={i + 1} />
                    ))}
                  </div>
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
                hrefLabel="View All →"
              />
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {blogs.slice(0, 4).map((blog) => (
                  <CardStandard key={blog.id} blog={blog} />
                ))}
              </div>
              <Divider />
            </div>
          ))}

          {/* ── NEWSLETTER / CTA ── */}
          <NewsletterCTA />
        </div>
      )}
    </main>
  );
}
