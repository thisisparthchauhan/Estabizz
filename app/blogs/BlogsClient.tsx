"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { BlogCard, BlogHeroCard } from "@/components/blog/BlogCard";
import type { BlogSummary, BlogCategory } from "@/lib/blog/types";

interface Props {
  initialBlogs: BlogSummary[];
  categories: BlogCategory[];
}

export default function BlogsClient({ initialBlogs, categories }: Props) {
  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredBlogs = useMemo<BlogSummary[]>(() => {
    let result = initialBlogs;
    if (activeCategory !== "all") {
      result = result.filter((b) => b.category.slug === activeCategory);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q) ||
          b.category.name.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [initialBlogs, search, activeCategory]);

  const isFiltered = activeCategory !== "all" || search.trim().length > 0;
  const heroCard   = !isFiltered ? (initialBlogs.find((b) => b.featured) ?? null) : null;
  const gridCards  = useMemo<BlogSummary[]>(
    () => (heroCard ? filteredBlogs.filter((b) => b.id !== heroCard.id) : filteredBlogs),
    [filteredBlogs, heroCard]
  );

  const clearFilters = useCallback(() => { setSearch(""); setActiveCategory("all"); }, []);

  return (
    <main className="min-h-screen bg-[#f5f7fa] pt-[64px]">

      {/* ── Hero — dark navy with premium gold accents ──────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071224] via-[#0a1e3a] to-[#091730]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#0096D6]/10 blur-[130px]" />
          <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[#d9a938]/8 blur-[120px]" />
          {/* Subtle grid texture */}
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:48px_48px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[12.5px] font-medium text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/25">/</span>
            <span className="text-[#d9a938]">Regulatory Insights</span>
          </nav>

          {/* Gold badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a938]/35 bg-[#d9a938]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#d9a938]">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Estabizz Regulatory Insights
          </div>

          {/* Title */}
          <h1 className="mb-5 max-w-4xl text-[38px] font-black leading-[1.08] tracking-tight text-white md:text-[54px]">
            Estabizz{" "}
            <span className="text-[#d9a938]">Regulatory</span>{" "}
            Insights
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-3xl text-[16px] leading-[1.85] text-white/62 md:text-[18px]">
            Practical updates, licensing guides and compliance explainers for founders,
            CFOs, fintechs and regulated businesses.
          </p>

          {/* Stats chips — navy border, gold icon */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: `${initialBlogs.length} Articles`,  icon: "📄" },
              { label: `${categories.length} Categories`,  icon: "🗂" },
              { label: "Expert Analysis",                  icon: "🔍" },
              { label: "Updated Regularly",                icon: "🔔" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[12.5px] font-bold text-white/75 backdrop-blur-sm">
                <span className="text-[#d9a938]">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky search + filter bar ───────────────────────────────────── */}
      <div className="sticky top-[64px] z-[200] border-b border-[#e2eaf2] bg-white/96 px-6 py-4 shadow-[0_4px_16px_rgba(10,22,40,0.06)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-3">

          {/* Search */}
          <div className="relative">
            <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, regulator, keyword…"
              className="h-11 w-full rounded-xl border border-[#dbe7f3] bg-[#f5f7fa] pl-11 pr-10 text-[13.5px] font-medium text-[#0a1628] outline-none placeholder:text-[#94a3b8] focus:border-[#0096D6] focus:bg-white focus:ring-3 focus:ring-[#0096D6]/10 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#94a3b8] hover:text-[#334155] hover:bg-gray-100 transition-colors"
                aria-label="Clear search">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category tabs — gold active state */}
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-0.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[11.5px] font-black transition-all ${
                activeCategory === "all"
                  ? "border-[#0a1628] bg-[#0a1628] text-[#d9a938] shadow-sm"
                  : "border-[#dbe7f3] bg-white text-[#334155] hover:border-[#0a1628] hover:text-[#0a1628]"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[11.5px] font-bold transition-all ${
                  activeCategory === cat.slug
                    ? "border-[#d9a938] bg-[#d9a938] text-[#071224] shadow-sm"
                    : "border-[#dbe7f3] bg-white text-[#334155] hover:border-[#d9a938]/60 hover:text-[#0a1628]"
                }`}
              >
                <span className="text-[11px]">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* Results count row */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#64748b]">
            {filteredBlogs.length === 0 ? "No articles found"
              : filteredBlogs.length === 1 ? "1 article"
              : `${filteredBlogs.length} articles`}
            {activeCategory !== "all" && (
              <span className="ml-1">in <span className="font-black text-[#0a1628]">{categories.find((c) => c.slug === activeCategory)?.name}</span></span>
            )}
            {search.trim() && (
              <span className="ml-1">matching <span className="font-black text-[#0096D6]">&ldquo;{search.trim()}&rdquo;</span></span>
            )}
          </p>
          {isFiltered && (
            <button onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-full border border-[#dbe7f3] bg-white px-3 py-1.5 text-[12px] font-bold text-[#64748b] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>

        {filteredBlogs.length === 0 ? (
          /* ── Empty state ── */
          <div className="rounded-2xl border border-[#e2eaf2] bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f9ff] text-3xl">🔍</div>
            <h2 className="mb-2 text-[20px] font-black text-[#0a1628]">No articles found</h2>
            <p className="mx-auto mb-6 max-w-md text-[14px] leading-6 text-[#64748b]">
              Try a different keyword or browse all categories. Our team publishes new regulatory insights regularly.
            </p>
            <button onClick={clearFilters} className="rounded-xl bg-[#0a1628] px-6 py-2.5 text-[13px] font-bold text-white hover:bg-[#1a2638] transition-colors">
              View all articles
            </button>
          </div>
        ) : (
          <>
            {/* ── Featured / Hero card ── */}
            {heroCard && (
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[10.5px] font-black uppercase tracking-[0.2em] text-[#d9a938]">✦ Featured Article</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#d9a938]/30 to-transparent" />
                </div>
                <BlogHeroCard blog={heroCard} />
              </div>
            )}

            {/* ── Grid ── */}
            {filteredBlogs.length > 0 && (
              <>
                {heroCard && gridCards.length > 0 && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[10.5px] font-black uppercase tracking-[0.2em] text-[#64748b]">All Articles</span>
                    <div className="h-px flex-1 bg-[#e2eaf2]" />
                  </div>
                )}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gridCards.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {/* ── CTA — dark navy with gold accents ────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071224] via-[#0a1e3a] to-[#091730]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#0096D6]/10 blur-[130px]" />
          <div className="absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-[#d9a938]/8 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9a938]/35 bg-[#d9a938]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#d9a938]">
            Expert Regulatory Support
          </div>

          <h2 className="mb-4 text-[30px] font-black leading-tight tracking-tight text-white md:text-[42px]">
            Need help with regulatory<br className="hidden sm:block" /> licensing or compliance?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-[1.85] text-white/60 md:text-[17px]">
            Estabizz Fintech Private Limited assists businesses with RBI, SEBI, IRDAI, IFSCA,
            MCA, FIU-IND and allied regulatory matters.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[13.5px] font-black text-[#0a1628] shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:bg-[#f0f4f8] hover:-translate-y-0.5 transition-all">
              Book Consultation
            </Link>
            <a href="https://wa.me/919825600907" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10b981] px-7 py-3.5 text-[13.5px] font-black text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:bg-[#059669] hover:-translate-y-0.5 transition-all">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Estabizz Team
            </a>
          </div>

          <p className="mt-6 text-[11.5px] font-medium text-white/35">
            Trusted by 500+ regulated businesses · RBI · SEBI · IRDAI · IFSCA · MCA · FIU-IND
          </p>
        </div>
      </section>

    </main>
  );
}
