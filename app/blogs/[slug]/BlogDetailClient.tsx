"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Blog, BlogSummary } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/BlogCard";

// ─── Fixed brand copy (spec-locked) ──────────────────────────────────────────

const CTA_TITLE = "Need help with regulatory licensing or compliance?";
const CTA_BODY =
  "Estabizz Fintech Private Limited assists businesses with RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and allied regulatory matters.";
const DISCLAIMER =
  "This article is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. Readers should consult qualified professionals before taking any business or regulatory decision.";

// ─── Table-of-contents types ──────────────────────────────────────────────────

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// ─── Content processor ────────────────────────────────────────────────────────
// Scans the raw HTML string, injects unique id="" into every <h2>/<h3>,
// and returns both the patched HTML and the ordered TOC list.

function processArticleHtml(rawHtml: string): {
  processedHtml: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  let counter = 0;

  // Step 1 — inject anchor IDs into h2/h3 headings for the TOC
  let html = rawHtml.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1], 10) as 2 | 3;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = `toc-${counter++}`;
      toc.push({ id, text, level });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    }
  );

  // Step 2 — add loading="lazy" to inline <img> tags that don't already have it.
  // This defers off-screen images inside the article body, improving LCP and FCP.
  html = html.replace(
    /<img(?![^>]*\bloading=)([^>]*?)(\s*\/?>)/gi,
    "<img$1 loading=\"lazy\"$2"
  );

  return { processedHtml: html, toc };
}

// ─── Active-heading tracker (IntersectionObserver) ────────────────────────────

function useActiveHeading(ids: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries.find((e) => e.isIntersecting);
        if (first) setActiveId(first.target.id);
      },
      // Trigger when heading crosses 88 px from top (navbar + gap)
      { rootMargin: "-88px 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

// ─── Smooth-scroll helper (accounts for fixed navbar) ────────────────────────

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ─── Desktop TOC sidebar ──────────────────────────────────────────────────────

function DesktopToc({
  items,
  activeId,
}: {
  items: TocItem[];
  activeId: string;
}) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[88px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-[#e8edf5] bg-[#f8faff] p-5 [&::-webkit-scrollbar]:hidden shadow-[0_2px_10px_rgba(10,22,40,0.05)]">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#b8860b]">
          ✦ Table of Contents
        </p>
        <nav aria-label="Article sections">
          <ol className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id);
                  }}
                  className={`flex rounded-lg px-2 py-1.5 text-[12px] leading-snug transition-all ${
                    item.level === 3 ? "ml-3 text-[11px]" : ""
                  } ${
                    activeId === item.id
                      ? "bg-[#d9a938]/10 font-bold text-[#b8860b] border-l-2 border-[#d9a938] pl-[6px]"
                      : "text-[#64748b] hover:text-[#0a1628] pl-2"
                  }`}
                >
                  {item.level === 3 && (
                    <span className="mr-1.5 mt-px shrink-0 opacity-30 text-[10px]">
                      └
                    </span>
                  )}
                  <span>{item.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}

// ─── Mobile TOC (collapsible card) ───────────────────────────────────────────

function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  return (
    <div className="mb-7 overflow-hidden rounded-xl border border-blue-100 bg-[#f8faff] lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-[13px] font-bold text-[#0a1628]"
      >
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-[#0096D6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h12M4 14h8"
            />
          </svg>
          Table of Contents
        </span>
        <svg
          className={`h-4 w-4 text-[#0096D6] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <nav
          aria-label="Article sections"
          className="border-t border-blue-100 px-4 pb-4 pt-3"
        >
          <ol className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollToId(item.id);
                  }}
                  className={`block text-[13px] leading-snug text-[#475569] transition-colors hover:text-[#0096D6] ${
                    item.level === 3 ? "ml-4" : ""
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

// ─── Hero image with gradient / emoji fallback ────────────────────────────────

function HeroImage({
  src,
  alt,
  icon,
}: {
  src: string;
  alt: string;
  icon: string;
}) {
  return (
    <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#eff6ff] to-[#e0f2fe] md:h-80 lg:h-[420px]">
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[100px] opacity-10">
        {icon}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        // Hero image is the Largest Contentful Paint element — do NOT lazy-load.
        // fetchPriority hint tells the browser to fetch this early in the waterfall.
        loading="eager"
        fetchPriority="high"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 to-[#0a1628]/5" />
    </div>
  );
}

// ─── Date formatter ───────────────────────────────────────────────────────────

function fmt(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  blog: Blog;
  relatedBlogs: BlogSummary[];
}

export default function BlogDetailClient({ blog, relatedBlogs }: Props) {
  // Inject heading IDs and build TOC once per blog
  const { processedHtml, toc } = useMemo(
    () => processArticleHtml(blog.content),
    [blog.content]
  );

  const tocIds = useMemo(() => toc.map((t) => t.id), [toc]);
  const activeId = useActiveHeading(tocIds);

  return (
    <main className="relative z-[1] min-h-screen bg-white pt-[64px]">

      {/* ── 8. Featured image ─────────────────────────────────────────────── */}
      <div className="relative">
        <HeroImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
        />
        {/* ── 2. Category badge (overlaid on image) ── */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2 sm:bottom-6 sm:left-6">
          <span className="rounded-full bg-[#071224]/85 backdrop-blur-sm px-3 py-1.5 text-[12px] font-bold text-white border border-white/10">
            {blog.category.icon} {blog.category.name}
          </span>
          {blog.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#d9a938]/15 border border-[#d9a938]/50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#b8860b]">
              <span>★</span> Featured
            </span>
          )}
        </div>
        {/* ── 7. Reading time (overlaid on image) ── */}
        <div className="absolute bottom-4 right-4 z-10 sm:bottom-6 sm:right-6">
          <span className="rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-sm">
            {blog.readingTime} min read
          </span>
        </div>
      </div>

      {/* ── Header block ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1100px] px-4 pt-7 sm:px-6 lg:px-8">

        {/* ── 1. Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-1.5 text-[12px] text-[#94a3b8]"
        >
          <Link href="/" className="transition-colors hover:text-[#0096D6]">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <Link href="/blogs" className="transition-colors hover:text-[#0096D6]">
            Blogs
          </Link>
          <span className="opacity-50">/</span>
          <Link
            href={`/blogs?category=${blog.category.slug}`}
            className="transition-colors hover:text-[#0096D6]"
          >
            {blog.category.name}
          </Link>
          <span className="opacity-50">/</span>
          <span className="max-w-[220px] truncate font-medium text-[#0a1628] sm:max-w-none">
            {blog.title}
          </span>
        </nav>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-100 bg-[#f0f9ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#0077B6]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── 3. Blog title ── */}
        <h1 className="mb-4 text-[26px] font-black leading-tight text-[#0a1628] sm:text-[30px] lg:text-[36px]">
          {blog.title}
        </h1>

        {/* ── 4. Blog summary ── */}
        <p className="mb-5 text-[16px] leading-7 text-[#475569]">
          {blog.summary}
        </p>

        {/* ── 5 / 6 / 7. Author · Published date · Reading time ── */}
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-gray-100 pb-6">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0077B6] text-[13px] font-black text-white">
              {blog.author.firstName[0]}
            </div>
            <div>
              <span className="block text-[13px] font-bold leading-tight text-[#0a1628]">
                {blog.author.firstName} {blog.author.lastName}
              </span>
              <span className="block text-[11px] leading-tight text-[#94a3b8]">
                {blog.author.designation}
              </span>
            </div>
          </div>

          {/* Published date */}
          <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]">
            <svg
              className="h-3.5 w-3.5 text-[#0096D6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {fmt(blog.publishedAt)}
          </span>

          {/* Updated date */}
          {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
            <span className="hidden items-center gap-1.5 text-[12px] text-[#94a3b8] sm:flex">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Updated {fmt(blog.updatedAt)}
            </span>
          )}

          {/* Reading time */}
          <span className="ml-auto flex items-center gap-1.5 rounded-lg border border-blue-100 bg-[#f0f9ff] px-2.5 py-1 text-[12px] font-bold text-[#0096D6]">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {blog.readingTime} min read
          </span>
        </div>
      </div>

      {/* ── Two-column body: Article + TOC sidebar ───────────────────────── */}
      <div className="mx-auto max-w-[1100px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">

          {/* ── Article column ─────────────────────────────────────────────── */}
          <article>

            {/* ── 9. TOC — mobile collapsible ── */}
            <MobileToc items={toc} />

            {/* ── 10. Blog content ── */}
            {/*
              SECURITY TODO (production):
              Before going live, sanitize `processedHtml` with DOMPurify or a
              server-side HTML sanitizer (e.g. sanitize-html) to strip any
              injected <script> or event-handler attributes from untrusted
              user-submitted content.
              Example:
                import DOMPurify from 'isomorphic-dompurify';
                const safeHtml = DOMPurify.sanitize(processedHtml, { ADD_TAGS: ['iframe'] });
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              Admin-authored blogs (sampleBlogs) are trusted. User submissions
              go through the API and should be sanitized before storage or render.
            */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* ── 11. Inline images are rendered from blog.content HTML ──
                  (captions rendered via <figure><figcaption> markup in content)
                  The .blog-content CSS covers figure / figcaption / img styling. */}

            {/* ── 12. FAQ section ── */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="mt-10 rounded-2xl border border-blue-100 bg-[#f8faff] p-6 lg:p-8">
                <h2 className="mb-6 text-[20px] font-black text-[#0a1628]">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {[...blog.faqs]
                    .sort((a, b) => a.order - b.order)
                    .map((faq, i) => (
                      <details
                        key={i}
                        className="group overflow-hidden rounded-xl border border-blue-100 bg-white"
                      >
                        <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 text-[14px] font-bold text-[#0a1628] transition-colors hover:text-[#0096D6] [list-style:none] [&::-webkit-details-marker]:hidden">
                          <span className="flex-1 leading-snug">{faq.question}</span>
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#0096D6] transition-transform duration-200 group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="border-t border-blue-50 px-5 py-4 text-[13px] leading-6 text-[#475569]">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                </div>
              </section>
            )}

            {/* ── 13. Disclaimer ── */}
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
              <div className="flex gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
                <div>
                  <p className="mb-0.5 text-[11px] font-black uppercase tracking-wide text-amber-700">
                    Disclaimer
                  </p>
                  <p className="text-[12px] leading-5 text-[#92400e]">
                    {DISCLAIMER}
                  </p>
                </div>
              </div>
            </div>

            {/* ── 14. CTA box ── */}
            <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#0c2040] p-6 sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d9a938]/35 bg-[#d9a938]/10 px-3 py-1 text-[11px] font-bold text-[#d9a938]">
                <span>✦</span> REGULATORY ADVISORY
              </div>
              <h3 className="mb-2 text-[18px] font-black leading-snug text-white sm:text-[20px]">
                {CTA_TITLE}
              </h3>
              <p className="mb-6 text-[13px] leading-6 text-[#94a3b8]">
                {CTA_BODY}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0096D6] px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition-colors hover:bg-[#0077B6]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Book Consultation
                </Link>
                <a
                  href="https://wa.me/919825600907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#10b981] px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition-colors hover:bg-[#059669]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Estabizz Team
                </a>
              </div>
            </div>
          </article>

          {/* ── 9. TOC sidebar — desktop sticky ── */}
          <DesktopToc items={toc} activeId={activeId} />
        </div>
      </div>

      {/* ── 15. Related blogs from same category ─────────────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-[#e8edf5] bg-gradient-to-b from-[#f4f7fb] to-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-[#d9a938]/30 bg-[#d9a938]/8 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#b8860b]">
                  <span className="text-[#d9a938]">✦</span> Continue Reading
                </div>
                <h2 className="text-[22px] font-black text-[#0a1628]">
                  Related Articles
                </h2>
              </div>
              <Link
                href={`/blogs?category=${blog.category.slug}`}
                className="text-[12px] font-bold text-[#0096D6] transition-colors hover:text-[#0077B6]"
              >
                View all in {blog.category.name} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((rb) => (
                <BlogCard key={rb.id} blog={rb} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="border-t border-gray-100 bg-white py-6 text-center">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0096D6] transition-colors hover:text-[#0077B6]"
        >
          <svg
            className="h-3.5 w-3.5 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          Back to Estabizz Regulatory Insights
        </Link>
      </div>
    </main>
  );
}
