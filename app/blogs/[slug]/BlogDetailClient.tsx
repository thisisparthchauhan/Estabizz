"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Blog, BlogSummary } from "@/lib/blog/types";
import { CardFeaturedSide, CardStandard } from "@/components/blog/BlogCard";

// ─── Fixed brand copy ─────────────────────────────────────────────────────────

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
// Injects unique id="" into every <h2>/<h3> and returns the TOC list.

function processArticleHtml(rawHtml: string): {
  processedHtml: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  let counter = 0;

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

  html = html.replace(
    /<img(?![^>]*\bloading=)([^>]*?)(\s*\/?>)/gi,
    '<img$1 loading="lazy"$2'
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

// ─── Smooth-scroll helper ────────────────────────────────────────────────────

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ─── Copy-link share button ───────────────────────────────────────────────────

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      title="Copy link"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#374151] hover:border-[#1677f2] hover:text-[#1677f2] transition-colors"
    >
      {copied ? (
        <svg className="h-4 w-4 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )}
    </button>
  );
}

// ─── Share buttons ────────────────────────────────────────────────────────────

function ShareButtons({ title }: { title: string }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="mt-5">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#9ca3af]">
        Share
      </p>
      <div className="flex gap-2">
        <CopyLinkButton />
        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#374151] hover:border-[#0a1628] hover:text-[#0a1628] transition-colors"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#374151] hover:border-[#0077b5] hover:text-[#0077b5] transition-colors"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#374151] hover:border-[#25d366] hover:text-[#25d366] transition-colors"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Left sidebar: TOC + Share ────────────────────────────────────────────────

function LeftSidebar({
  items,
  activeId,
  title,
}: {
  items: TocItem[];
  activeId: string;
  title: string;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {items.length >= 2 && (
          <div className="mb-6 rounded-sm border border-[#e8e8e8] bg-white p-5">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#9ca3af]">
              Contents
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
                      className={`flex rounded px-2 py-1.5 text-[12px] leading-snug transition-all ${
                        item.level === 3 ? "ml-3 text-[11px]" : ""
                      } ${
                        activeId === item.id
                          ? "bg-[#1677f2]/8 font-bold text-[#1677f2] border-l-2 border-[#1677f2] pl-[6px]"
                          : "text-[#6b7280] hover:text-[#111827]"
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
        )}

        <ShareButtons title={title} />
      </div>
    </aside>
  );
}

// ─── Mobile TOC (collapsible) ─────────────────────────────────────────────────

function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;

  return (
    <div className="mb-7 overflow-hidden rounded-sm border border-[#e0e0e0] bg-[#f7f8fc] lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-[13px] font-bold text-[#0a1628]"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-[#1677f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h12M4 14h8" />
          </svg>
          Table of Contents
        </span>
        <svg
          className={`h-4 w-4 text-[#1677f2] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <nav className="border-t border-[#e0e0e0] px-4 pb-4 pt-3" aria-label="Article sections">
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
                  className={`block text-[13px] leading-snug text-[#374151] transition-colors hover:text-[#1677f2] ${
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

// ─── Right sidebar ────────────────────────────────────────────────────────────

function RightSidebar({
  relatedBlogs,
  categoryName,
  categorySlug,
}: {
  relatedBlogs: BlogSummary[];
  categoryName: string;
  categorySlug: string;
}) {
  if (relatedBlogs.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="rounded-sm border border-[#e8e8e8] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9ca3af]">
              More in {categoryName}
            </p>
            <Link
              href={`/blogs/category/${categorySlug}`}
              className="text-[11px] font-bold text-[#1677f2] hover:text-[#0077B6] transition-colors"
            >
              See all →
            </Link>
          </div>
          <div>
            {relatedBlogs.slice(0, 4).map((blog) => (
              <CardFeaturedSide key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {/* Subscribe box */}
        <div className="mt-5 rounded-sm bg-[#0a1628] p-5 text-center">
          <p className="mb-2 text-[13px] font-black text-white">
            Stay Updated
          </p>
          <p className="mb-4 text-[11px] leading-relaxed text-white/60">
            Get the latest regulatory updates delivered to your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-block w-full rounded-lg bg-[#1677f2] py-2 text-[12px] font-black text-white hover:bg-[#3b8ef5] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </aside>
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

// ─── Hero image ───────────────────────────────────────────────────────────────

function HeroImage({ src, alt, icon }: { src: string; alt: string; icon: string }) {
  return (
    <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[#eef4fb] via-[#f7f8fc] to-[#eaf2fb] md:h-[400px] lg:h-[460px]">
      <span className="absolute inset-0 flex items-center justify-center text-[100px] opacity-[0.10] select-none pointer-events-none">
        {icon}
      </span>
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </>
      ) : null}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  blog: Blog;
  relatedBlogs: BlogSummary[];
}

export default function BlogDetailClient({ blog, relatedBlogs }: Props) {
  const { processedHtml, toc } = useMemo(
    () => processArticleHtml(blog.content),
    [blog.content]
  );

  const tocIds = useMemo(() => toc.map((t) => t.id), [toc]);
  const activeId = useActiveHeading(tocIds);

  return (
    <main className="relative z-[1] min-h-screen bg-white pt-[64px]">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-blue-100 bg-[#f5fbff]">
        <div className="mx-auto max-w-screen-xl px-4 py-2.5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#9ca3af]">
            <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/blogs" className="hover:text-[#374151] transition-colors">Regulatory Insights</Link>
            <span className="opacity-40">/</span>
            <Link href={`/blogs/category/${blog.category.slug}`} className="hover:text-[#374151] transition-colors">
              {blog.category.name}
            </Link>
            <span className="opacity-40">/</span>
            <span className="max-w-[200px] truncate text-[#374151] sm:max-w-none">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Article header ── */}
      <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        {/* Category badge */}
        <div className="mb-3">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white"
            style={{ backgroundColor: blog.category.color }}
          >
            {blog.category.icon} {blog.category.name}
          </span>
          {blog.featured && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#1677f2]/50 bg-[#1677f2]/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0866d9]">
              ★ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-4 max-w-3xl text-[26px] font-black leading-tight tracking-[-0.02em] text-[#120b45] sm:text-[30px] lg:text-[36px]">
          {blog.title}
        </h1>

        {/* Summary */}
        <p className="mb-5 max-w-2xl text-[16px] italic leading-7 text-[#6b7280]">
          {blog.summary}
        </p>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[#e0e0e0] bg-[#f7f8fc] px-2.5 py-0.5 text-[11px] font-semibold text-[#374151]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-b border-[#f0f0f0] py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] text-[13px] font-black text-white">
              {blog.author.firstName[0]}
            </div>
            <div>
              <span className="block text-[13px] font-bold leading-tight text-[#0a1628]">
                {blog.author.firstName} {blog.author.lastName}
              </span>
              <span className="block text-[11px] leading-tight text-[#9ca3af]">
                {blog.author.designation}
              </span>
            </div>
          </div>

          <span className="text-[12px] text-[#6b7280]">{fmt(blog.publishedAt)}</span>

          {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
            <span className="hidden text-[12px] text-[#9ca3af] sm:block">
              Updated {fmt(blog.updatedAt)}
            </span>
          )}

          <span className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#e0e0e0] bg-[#f7f8fc] px-2.5 py-1 text-[12px] font-bold text-[#374151]">
            <svg className="h-3.5 w-3.5 text-[#1677f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {blog.readingTime} min read
          </span>
        </div>
      </div>

      {/* ── Featured image (full width) ── */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-8">
        <HeroImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
        />
        {blog.featuredImage.caption && (
          <p className="mt-2 text-center text-[12px] italic text-[#9ca3af]">
            {blog.featuredImage.caption}
          </p>
        )}
      </div>

      {/* ── Three-column layout: TOC left | Article | Related right ── */}
      <div className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[220px_1fr_260px] lg:grid-cols-[220px_1fr]">

          {/* Left sidebar — TOC + Share */}
          <LeftSidebar items={toc} activeId={activeId} title={blog.title} />

          {/* Article column */}
          <article className="min-w-0">
            {/* Mobile TOC */}
            <MobileToc items={toc} />

            {/* Article body */}
            {/*
              SECURITY NOTE: Sanitize processedHtml with DOMPurify or sanitize-html
              before going live with user-submitted content.
            */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* FAQ section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="mt-10 rounded-sm border border-[#e8e8e8] bg-[#f7f8fc] p-6 lg:p-8">
                <h2 className="mb-6 text-[20px] font-black text-[#0a1628]">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {[...blog.faqs]
                    .sort((a, b) => a.order - b.order)
                    .map((faq, i) => (
                      <details
                        key={i}
                        className="group overflow-hidden rounded-sm border border-[#e0e0e0] bg-white"
                      >
                        <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 text-[14px] font-bold text-[#0a1628] transition-colors hover:text-[#1677f2] [list-style:none] [&::-webkit-details-marker]:hidden">
                          <span className="flex-1 leading-snug">{faq.question}</span>
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#1677f2] transition-transform duration-200 group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="border-t border-[#f0f0f0] px-5 py-4 text-[13px] leading-6 text-[#374151]">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                </div>
              </section>
            )}

            {/* Author box */}
            <div className="mt-10 overflow-hidden rounded-sm border border-[#e8e8e8] bg-white">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] text-[17px] font-black text-white">
                  {blog.author.firstName[0]}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#9ca3af]">
                    Written by
                  </p>
                  <p className="mt-0.5 text-[15px] font-black text-[#0a1628]">
                    {blog.author.firstName} {blog.author.lastName}
                  </p>
                  {blog.author.designation && (
                    <p className="text-[12px] font-semibold text-[#1677f2]">
                      {blog.author.designation}
                    </p>
                  )}
                  <p className="mt-2 text-[13px] leading-6 text-[#6b7280]">
                    Estabizz Research Team prepares regulatory and compliance
                    insights covering RBI, SEBI, IRDAI, IFSCA, MCA, FEMA and
                    fintech licensing matters.
                  </p>
                  <p className="mt-3 text-[12.5px] font-semibold text-[#374151]">
                    Need professional assistance? Contact the Estabizz Team at{" "}
                    <a href="tel:9825600907" className="font-black text-[#1677f2] hover:text-[#0077B6]">
                      9825600907
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 rounded-sm border border-[#e8e8e8] bg-[#f7f8fc] p-4 sm:p-5">
              <div className="flex gap-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="mb-0.5 text-[10px] font-black uppercase tracking-wide text-[#9ca3af]">
                    Disclaimer
                  </p>
                  <p className="text-[12px] leading-5 text-[#6b7280]">
                    {DISCLAIMER}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="mt-10 overflow-hidden rounded-sm bg-[#0a1628] p-6 sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1677f2]/35 bg-[#1677f2]/10 px-3 py-1 text-[11px] font-bold text-[#1677f2]">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1677f2] px-5 py-2.5 text-[13px] font-black text-white hover:bg-[#3b8ef5] transition-colors"
                >
                  Book Consultation →
                </Link>
                <a
                  href="https://wa.me/919825600907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#059669] transition-colors"
                >
                  WhatsApp Estabizz
                </a>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8 flex items-center justify-between border-t border-[#f0f0f0] pt-6">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1677f2] hover:text-[#0077B6] transition-colors"
              >
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Back to Regulatory Insights
              </Link>
              {/* Mobile share */}
              <div className="flex gap-2 xl:hidden">
                <ShareButtons title={blog.title} />
              </div>
            </div>
          </article>

          {/* Right sidebar */}
          <RightSidebar
            relatedBlogs={relatedBlogs}
            categoryName={blog.category.name}
            categorySlug={blog.category.slug}
          />
        </div>
      </div>

      {/* Related blogs section (below main content) */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-[#e8e8e8] bg-[#f7f8fc] py-12">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-[20px] font-black text-[#0a1628]">
                  More in {blog.category.name}
                </h2>
                <div className="mt-1 h-[3px] w-10 rounded-full bg-[#1677f2]" />
              </div>
              <Link
                href={`/blogs/category/${blog.category.slug}`}
                className="text-[12px] font-bold text-[#1677f2] hover:text-[#0077B6] transition-colors"
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.slice(0, 3).map((rb) => (
                <CardStandard key={rb.id} blog={rb} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
