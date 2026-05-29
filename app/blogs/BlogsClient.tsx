"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import type { BlogSummary, BlogCategory } from "@/lib/blog/types";

interface Props {
  initialBlogs: BlogSummary[];
  categories: BlogCategory[];
}

// ─── 3D tilt card wrapper ─────────────────────────────────────────────────────

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.08s ease-out",
    });
  };

  const onLeave = () => {
    setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)", transition: "transform 0.45s ease" });
  };

  return (
    <div ref={ref} style={style} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

// ─── Floating orb background ──────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large orbs */}
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#0096D6]/12 blur-[100px] animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-[#d9a938]/10 blur-[90px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#0077B6]/10 blur-[80px] animate-[pulse_7s_ease-in-out_infinite_2s]" />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.3) 0,rgba(255,255,255,.3) 1px,transparent 0,transparent 50%)", backgroundSize: "30px 30px" }} />
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}</span>;
}

// ─── Shimmer line ─────────────────────────────────────────────────────────────

function ShimmerLine() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d9a938]/60 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
    </div>
  );
}

// ─── Blog card — 3D glass ─────────────────────────────────────────────────────

function GlassBlogCard({ blog, index }: { blog: BlogSummary; index: number }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const initials = `${blog.author.firstName?.[0] ?? "E"}${blog.author.lastName?.[0] ?? ""}`;

  return (
    <TiltCard className="h-full">
      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
        <article
          className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#d9a938]/40 hover:shadow-[0_0_40px_rgba(217,169,56,0.15),0_20px_60px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%),rgba(217,169,56,0.06),transparent 60%)" }} />

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {blog.featuredImage?.url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={blog.featuredImage.url} alt={blog.featuredImage.alt || blog.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="flex h-full w-full items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${blog.category.color}22, ${blog.category.color}08)` }}>
                <span className="text-5xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30">
                  {blog.category.icon}
                </span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/80 via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute left-3 top-3">
              <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10.5px] font-bold text-white backdrop-blur-md">
                {blog.category.icon} {blog.category.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="mb-2.5 text-[15px] font-black leading-snug text-white line-clamp-2 group-hover:text-[#d9a938] transition-colors duration-300">
              {blog.title}
            </h3>
            <p className="mb-4 text-[12.5px] leading-relaxed text-white/50 line-clamp-2">
              {blog.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/8 pt-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[9px] font-black text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-[10.5px] font-bold text-white/70 leading-none">{blog.author.firstName} {blog.author.lastName}</p>
                  <p className="text-[9.5px] text-white/35 mt-0.5">{date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#d9a938]/25 bg-[#d9a938]/8 px-2 py-0.5 text-[9.5px] font-bold text-[#d9a938]">
                  {blog.readingTime} min
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-white/40 transition-all duration-300 group-hover:border-[#d9a938]/40 group-hover:bg-[#d9a938]/10 group-hover:text-[#d9a938]">
                  →
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </TiltCard>
  );
}

// ─── Featured hero card ───────────────────────────────────────────────────────

function FeaturedCard({ blog }: { blog: BlogSummary }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <TiltCard className="w-full">
      <Link href={`/blogs/${blog.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-3xl border border-[#d9a938]/20 bg-gradient-to-br from-[#0d1f36] to-[#071224] shadow-[0_0_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(217,169,56,0.1)] transition-all duration-500 hover:shadow-[0_0_100px_rgba(217,169,56,0.2),0_40px_80px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative h-64 overflow-hidden lg:h-auto lg:w-[45%] shrink-0">
              {blog.featuredImage?.url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={blog.featuredImage.url} alt={blog.featuredImage.alt || blog.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full min-h-[300px] items-center justify-center"
                  style={{ background: `radial-gradient(circle at 40% 40%, ${blog.category.color}30, transparent 70%), linear-gradient(135deg,#0a1628,#071224)` }}>
                  <span className="text-[120px] opacity-15">{blog.category.icon}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#071224]/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/90 to-transparent lg:hidden" />
              {/* Featured badge */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d9a938] to-[#b8860b] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#071224] shadow-[0_0_20px_rgba(217,169,56,0.5)]">
                ✦ Featured
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-7 lg:p-10">
              <div>
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/70">
                  {blog.category.icon} {blog.category.name}
                </span>
                <h2 className="mb-4 text-[22px] font-black leading-tight tracking-tight text-white group-hover:text-[#d9a938] transition-colors duration-300 lg:text-[28px]">
                  {blog.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-white/55 line-clamp-3">
                  {blog.summary}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[11px] font-black text-white shadow-[0_0_14px_rgba(0,150,214,0.4)]">
                    {blog.author.firstName?.[0]}{blog.author.lastName?.[0]}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white/80">{blog.author.firstName} {blog.author.lastName}</p>
                    <p className="text-[10.5px] text-white/40">{date} · {blog.readingTime} min read</p>
                  </div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 rounded-xl border border-[#d9a938]/30 bg-[#d9a938]/10 px-4 py-2 text-[12px] font-bold text-[#d9a938]">
                  Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </TiltCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BlogsClient({ initialBlogs, categories }: Props) {
  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs = useMemo<BlogSummary[]>(() => {
    let result = initialBlogs;
    if (activeCategory !== "all") result = result.filter((b) => b.category.slug === activeCategory);
    const q = search.trim().toLowerCase();
    if (q) result = result.filter((b) =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.category.name.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
    );
    return result;
  }, [initialBlogs, search, activeCategory]);

  const isFiltered = activeCategory !== "all" || search.trim().length > 0;
  const heroCard   = !isFiltered ? (initialBlogs.find((b) => b.featured) ?? null) : null;
  const gridCards  = useMemo<BlogSummary[]>(
    () => heroCard ? filteredBlogs.filter((b) => b.id !== heroCard.id) : filteredBlogs,
    [filteredBlogs, heroCard]
  );
  const clearFilters = useCallback(() => { setSearch(""); setActiveCategory("all"); }, []);

  // Active categories that actually have blogs
  const activeCats = useMemo(() => {
    const slugs = new Set(initialBlogs.map((b) => b.category.slug));
    return categories.filter((c) => slugs.has(c.slug));
  }, [initialBlogs, categories]);

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);    }
          50%       { transform: translateY(-12px);  }
        }
        @keyframes floatYSlow {
          0%, 100% { transform: translateY(0px);    }
          50%       { transform: translateY(-20px);  }
        }
        @keyframes rotateOrb {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;  }
        }
        .fade-slide-up { animation: fadeSlideUp 0.6s ease both; }
        .card-appear   { animation: fadeSlideUp 0.5s ease both; }
      `}</style>

      <main className="min-h-screen pt-[64px]" style={{ background: "linear-gradient(180deg,#050d1a 0%,#071224 40%,#0a1628 70%,#0d1f36 100%)" }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-[520px] flex items-center">
          <FloatingOrbs />

          {/* Animated rotating ring */}
          <div className="pointer-events-none absolute right-[8%] top-[10%] h-[320px] w-[320px] opacity-[0.07] hidden lg:block"
            style={{ animation: "rotateOrb 30s linear infinite" }}>
            <div className="h-full w-full rounded-full border-2 border-dashed border-[#d9a938]" />
            <div className="absolute inset-8 rounded-full border border-[#0096D6]/60" style={{ animation: "rotateOrb 20s linear infinite reverse" }} />
          </div>
          {/* Floating 3D geometric card in background */}
          <div className="pointer-events-none absolute right-[12%] top-[15%] hidden xl:block opacity-[0.12]"
            style={{ animation: "floatYSlow 6s ease-in-out infinite", perspective: "800px" }}>
            <div className="h-32 w-48 rounded-2xl border border-[#d9a938]/40 bg-gradient-to-br from-[#d9a938]/10 to-transparent backdrop-blur-sm"
              style={{ transform: "rotateY(-20deg) rotateX(10deg)" }} />
          </div>
          <div className="pointer-events-none absolute right-[6%] top-[45%] hidden xl:block opacity-[0.08]"
            style={{ animation: "floatY 5s ease-in-out infinite 1s", perspective: "800px" }}>
            <div className="h-20 w-32 rounded-xl border border-[#0096D6]/40 bg-gradient-to-br from-[#0096D6]/10 to-transparent"
              style={{ transform: "rotateY(-15deg) rotateX(8deg)" }} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
            {/* Breadcrumb */}
            <nav className="fade-slide-up mb-6 flex items-center gap-2 text-[12px] text-white/35" style={{ animationDelay: "0ms" }}>
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#d9a938]/80">Regulatory Insights</span>
            </nav>

            {/* Badge */}
            <div className="fade-slide-up mb-5 inline-flex items-center gap-2" style={{ animationDelay: "60ms" }}>
              <div className="flex items-center gap-2 rounded-full border border-[#d9a938]/30 bg-[#d9a938]/8 px-4 py-1.5 text-[10.5px] font-black uppercase tracking-[0.22em] text-[#d9a938] shadow-[0_0_24px_rgba(217,169,56,0.15)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9a938] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d9a938]" />
                </span>
                Estabizz Regulatory Insights
              </div>
            </div>

            {/* Headline */}
            <h1 className="fade-slide-up mb-5 max-w-4xl text-[40px] font-black leading-[1.06] tracking-tight text-white md:text-[58px] lg:text-[68px]"
              style={{ animationDelay: "120ms" }}>
              <span className="relative inline-block">
                Estabizz
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#d9a938] to-transparent" />
              </span>{" "}
              <span style={{ background: "linear-gradient(135deg,#d9a938,#f0c040,#d9a938)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Regulatory
              </span>{" "}
              <span className="text-white">Insights</span>
            </h1>

            <p className="fade-slide-up mb-8 max-w-2xl text-[16px] leading-relaxed text-white/80 md:text-[18px]"
              style={{ animationDelay: "180ms" }}>
              Practical updates, licensing guides and compliance explainers for founders,
              CFOs, fintechs and regulated businesses.
            </p>

            {/* Stats row */}
            <div className="fade-slide-up flex flex-wrap items-center gap-6" style={{ animationDelay: "240ms" }}>
              {[
                { label: "Articles", value: initialBlogs.length, icon: "📄" },
                { label: "Categories", value: activeCats.length || categories.length, icon: "📂" },
                { label: "Expert Analysis", value: null, icon: "🎯" },
                { label: "Updated Regularly", value: null, icon: "🔔" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[12.5px] font-bold text-white/70 backdrop-blur-sm">
                  <span>{icon}</span>
                  {value !== null
                    ? <><Counter to={value} />&nbsp;{label}</>
                    : <span>{label}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </section>

        <ShimmerLine />

        {/* ── SEARCH + FILTER ───────────────────────────────────────────────── */}
        <section className="sticky top-[64px] z-40 border-b border-white/[0.06] bg-[#071224]/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Search */}
              <div className="relative max-w-sm flex-1">
                <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search topic, regulator, keyword..."
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-4 text-[13px] font-medium text-white placeholder:text-white/30 outline-none backdrop-blur-sm transition-all focus:border-[#d9a938]/50 focus:ring-2 focus:ring-[#d9a938]/15"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    activeCategory === "all"
                      ? "bg-[#d9a938] text-[#071224] shadow-[0_0_20px_rgba(217,169,56,0.4)]"
                      : "border border-white/10 bg-white/[0.05] text-white/60 hover:border-[#d9a938]/30 hover:text-white/90"
                  }`}
                >
                  All
                </button>
                {activeCats.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                      activeCategory === cat.slug
                        ? "bg-[#d9a938] text-[#071224] shadow-[0_0_20px_rgba(217,169,56,0.4)]"
                        : "border border-white/10 bg-white/[0.05] text-white/60 hover:border-[#d9a938]/30 hover:text-white/90"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="hidden sm:inline">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENT ───────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-12">

          {/* Result count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-white/40">
              {filteredBlogs.length === 0
                ? "No articles found"
                : filteredBlogs.length === 1
                ? "1 article"
                : `${filteredBlogs.length} articles`}
              {activeCategory !== "all" && (
                <span> in <span className="font-black text-[#d9a938]">{categories.find((c) => c.slug === activeCategory)?.name}</span></span>
              )}
              {search && <span> matching <span className="font-black text-white/80">&quot;{search}&quot;</span></span>}
            </p>
            {isFiltered && (
              <button onClick={clearFilters} className="text-[12px] font-bold text-[#d9a938]/70 hover:text-[#d9a938] transition-colors">
                Clear filters ×
              </button>
            )}
          </div>

          {/* Empty state */}
          {filteredBlogs.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/8 bg-white/[0.03] py-24 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-4xl"
                style={{ animation: "floatY 3s ease-in-out infinite" }}>🔍</div>
              <h2 className="mb-2 text-[22px] font-black text-white">No articles found</h2>
              <p className="mb-8 max-w-sm text-[14px] text-white/40">Try a different keyword or browse all categories.</p>
              <button onClick={clearFilters}
                className="rounded-xl bg-gradient-to-r from-[#d9a938] to-[#b8860b] px-6 py-2.5 text-[13px] font-black text-[#071224] shadow-[0_0_24px_rgba(217,169,56,0.35)] transition-all hover:shadow-[0_0_36px_rgba(217,169,56,0.5)] hover:scale-105">
                View all articles
              </button>
            </div>
          )}

          {/* Featured hero */}
          {heroCard && (
            <div className="card-appear mb-12" style={{ animationDelay: "0ms" }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-[10.5px] font-black uppercase tracking-[0.22em] text-[#d9a938]">✦ Featured Article</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(217,169,56,0.4),transparent)" }} />
              </div>
              <FeaturedCard blog={heroCard} />
            </div>
          )}

          {/* Grid */}
          {filteredBlogs.length > 0 && (
            <>
              {heroCard && gridCards.length > 0 && (
                <div className="mb-8 flex items-center gap-3">
                  <span className="text-[10.5px] font-black uppercase tracking-[0.22em] text-white/30">All Articles</span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridCards.map((blog, i) => (
                  <div key={blog.id} className="card-appear" style={{ animationDelay: `${i * 80}ms` }}>
                    <GlassBlogCard blog={blog} index={i} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
        <section className="relative mx-6 mb-16 overflow-hidden rounded-3xl">
          {/* bg */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg,#0d1f36 0%,#071224 50%,#0a1a2e 100%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#d9a938]/8 blur-[100px]" />
            <div className="absolute left-0 bottom-0 h-[200px] w-[200px] rounded-full bg-[#0096D6]/8 blur-[80px]" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9a938]/25 bg-[#d9a938]/8 px-4 py-1.5 text-[10.5px] font-black uppercase tracking-widest text-[#d9a938]">
              ⚡ Expert Regulatory Advisory
            </div>
            <h2 className="mb-4 text-[28px] font-black leading-tight text-white lg:text-[38px]">
              Need regulatory guidance for your business?
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-white/55">
              RBI, SEBI, IRDAI, IFSCA licensing and compliance — handled end-to-end by India&apos;s leading regulatory advisory team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="rounded-xl bg-gradient-to-r from-[#d9a938] to-[#b8860b] px-7 py-3 text-[14px] font-black text-[#071224] shadow-[0_0_30px_rgba(217,169,56,0.4)] transition-all hover:shadow-[0_0_50px_rgba(217,169,56,0.6)] hover:scale-105">
                Book Consultation →
              </Link>
              <Link href="/services"
                className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-3 text-[14px] font-bold text-white/80 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white hover:bg-white/10">
                Explore Services
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
