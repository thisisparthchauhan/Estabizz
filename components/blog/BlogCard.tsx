"use client";

import Link from "next/link";
import type { BlogSummary } from "@/lib/blog/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function authorDisplay(b: BlogSummary): string {
  return `${b.author.firstName} ${b.author.lastName}`.trim();
}

// ─── Image placeholder box ────────────────────────────────────────────────────

function ImageBox({ src, alt, icon }: { src: string; alt: string; icon: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#e8f4fd] via-[#eef6ff] to-[#e2eefe]">
      {src ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center text-[56px] opacity-[0.15] select-none pointer-events-none">
            {icon}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[56px] opacity-[0.15] select-none pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  );
}

// ─── Featured badge ───────────────────────────────────────────────────────────

function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#d9a938]/15 border border-[#d9a938]/50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#b8860b]">
      <span>★</span> Featured
    </span>
  );
}

// ─── Standard card (3-column grid) ───────────────────────────────────────────

export function BlogCard({ blog }: { blog: BlogSummary }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`
        group flex flex-col overflow-hidden rounded-2xl bg-white
        border border-[#e2eaf2]
        shadow-[0_2px_12px_rgba(10,22,40,0.06)]
        hover:shadow-[0_12px_40px_rgba(10,22,40,0.13)]
        hover:-translate-y-1.5
        hover:border-[#d9a938]/50
        transition-all duration-300
      `}
    >
      {/* Image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <ImageBox src={blog.featuredImage.url} alt={blog.featuredImage.alt} icon={blog.category.icon} />

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-[#071224]/85 backdrop-blur-sm px-2.5 py-1 text-[10.5px] font-bold text-white border border-white/10">
            {blog.category.icon} {blog.category.name}
          </span>
        </div>

        {/* Gold featured badge */}
        {blog.featured && (
          <div className="absolute right-3 top-3 z-10">
            <FeaturedBadge />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-3">
        <h3 className="mb-2 text-[15px] font-black leading-snug text-[#0a1628] line-clamp-2 group-hover:text-[#0096D6] transition-colors duration-200">
          {blog.title}
        </h3>
        <p className="mb-4 flex-1 text-[13px] leading-[1.75] text-[#475569] line-clamp-3">
          {blog.summary}
        </p>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full border border-[#dbe7f3] bg-[#f4f9ff] px-2 py-0.5 text-[10.5px] font-semibold text-[#0077B6]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author + date */}
        <div className="flex items-center justify-between border-t border-[#f0f4f8] pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[11px] font-black text-white shadow-sm">
              {blog.author.firstName[0]}
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[#0a1628] leading-none">{authorDisplay(blog)}</span>
              <span className="block text-[10px] text-[#94a3b8] leading-none mt-0.5">{formatDate(blog.publishedAt)}</span>
            </div>
          </div>
          <span className="rounded-lg border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 text-[10.5px] font-bold text-[#0096D6]">
            {blog.readingTime} min read
          </span>
        </div>
      </div>

      {/* Read More footer — gold accent on hover */}
      <div className="border-t border-[#f0f4f8] bg-[#f8fbff] group-hover:bg-[#fffbf0] group-hover:border-[#d9a938]/20 px-5 py-3 transition-colors duration-200">
        <span className="flex items-center gap-1.5 text-[12px] font-black text-[#0096D6] group-hover:text-[#b8860b] group-hover:gap-2.5 transition-all duration-200">
          Read Article
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Hero / featured card (full-width) ───────────────────────────────────────

export function BlogHeroCard({ blog }: { blog: BlogSummary }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_4px_24px_rgba(10,22,40,0.08)] hover:shadow-[0_16px_56px_rgba(10,22,40,0.14)] hover:border-[#d9a938]/50 transition-all duration-300 lg:flex-row"
    >
      {/* Image — 45% on desktop */}
      <div className="relative h-64 shrink-0 overflow-hidden lg:h-auto lg:w-[45%]">
        <ImageBox src={blog.featuredImage.url} alt={blog.featuredImage.alt} icon={blog.category.icon} />
        {/* Subtle right-edge gradient for blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5 hidden lg:block pointer-events-none" />

        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#071224]/85 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white border border-white/10">
            {blog.category.icon} {blog.category.name}
          </span>
          {blog.featured && <FeaturedBadge />}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#0077B6]">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mb-3 text-[22px] font-black leading-tight text-[#0a1628] group-hover:text-[#0096D6] transition-colors lg:text-[26px]">
          {blog.title}
        </h2>
        <p className="mb-5 text-[14px] leading-[1.8] text-[#475569] line-clamp-3 lg:line-clamp-4">
          {blog.summary}
        </p>

        {/* Author + meta */}
        <div className="flex items-center justify-between border-t border-[#f0f4f8] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[13px] font-black text-white shadow-sm">
              {blog.author.firstName[0]}
            </div>
            <div>
              <span className="block text-[13px] font-bold text-[#0a1628]">{authorDisplay(blog)}</span>
              <span className="text-[11px] text-[#94a3b8]">{blog.author.designation}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-[#94a3b8]">
            <span>{formatDate(blog.publishedAt)}</span>
            <span className="rounded-lg border border-[#dbe7f3] bg-[#f4f9ff] px-2.5 py-1 font-bold text-[#0096D6]">
              {blog.readingTime} min read
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#0a1628] group-hover:bg-[#d9a938] px-5 py-2.5 text-[13px] font-bold text-white group-hover:text-[#071224] shadow-md transition-all duration-300">
            Read Full Article
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
