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

// ─── Shared image component ───────────────────────────────────────────────────

function CoverImage({
  src,
  alt,
  icon,
  className = "",
}: {
  src: string;
  alt: string;
  icon: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#e8f4fd] via-[#eef6ff] to-[#e2eefe] ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-[0.12] select-none pointer-events-none">
        {icon}
      </span>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({
  name,
  color,
  size = "sm",
}: {
  name: string;
  color: string;
  size?: "xs" | "sm";
}) {
  return (
    <span
      className={`inline-block font-black uppercase tracking-wider ${
        size === "xs" ? "text-[9px]" : "text-[10px]"
      }`}
      style={{ color }}
    >
      {name}
    </span>
  );
}

// ─── CardHero (large featured — left 60% of hero grid) ───────────────────────

export function CardHero({ blog }: { blog: BlogSummary }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <article className="relative h-full min-h-[420px] overflow-hidden rounded-none bg-[#0a1628]">
        {/* Full-bleed image */}
        <CoverImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
          className="absolute inset-0 h-full w-full"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Category badge — top left */}
        <div className="absolute left-4 top-4 z-10">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white"
            style={{ backgroundColor: blog.category.color + "dd" }}
          >
            {blog.category.icon} {blog.category.name}
          </span>
        </div>

        {/* Content overlay — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-7">
          <h2 className="mb-2 text-[22px] font-black leading-tight text-white md:text-[26px] line-clamp-3 group-hover:text-[#1677f2] transition-colors duration-200">
            {blog.title}
          </h2>
          <div className="flex items-center gap-3 text-[12px] text-white/70">
            <span className="font-semibold">{authorDisplay(blog)}</span>
            <span className="opacity-50">·</span>
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── CardFeaturedSide (right column — compact horizontal) ────────────────────

export function CardFeaturedSide({ blog }: { blog: BlogSummary }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group flex gap-3 py-3 border-b border-[#f0f0f0] last:border-b-0">
      {/* Image left */}
      <div className="relative h-[80px] w-[110px] shrink-0 overflow-hidden rounded">
        <CoverImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
          className="h-full w-full"
        />
      </div>

      {/* Text right */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <CategoryBadge name={blog.category.name} color={blog.category.color} size="xs" />
          <h3 className="mt-0.5 text-[13px] font-bold leading-snug text-[#111] line-clamp-2 group-hover:text-[#0096D6] transition-colors duration-150">
            {blog.title}
          </h3>
        </div>
        <span className="text-[11px] text-[#6b7280]">{formatDate(blog.publishedAt)}</span>
      </div>
    </Link>
  );
}

// ─── CardStandard (main grid card) ───────────────────────────────────────────

export function CardStandard({ blog }: { blog: BlogSummary }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group flex flex-col overflow-hidden bg-white border border-[#e8e8e8] hover:border-[#d0d0d0] transition-all duration-200">
      {/* Image top — 16:9 */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        <CoverImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
          className="h-full w-full"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <div className="mb-2">
          <CategoryBadge name={blog.category.name} color={blog.category.color} />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#111827] line-clamp-3 group-hover:text-[#0096D6] transition-colors duration-150">
          {blog.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 flex-1 text-[13px] leading-[1.65] text-[#6b7280] line-clamp-2">
          {blog.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-[#9ca3af] pt-3 border-t border-[#f3f4f6]">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[9px] font-black text-white">
              {blog.author.firstName[0]}
            </div>
            <span className="font-medium text-[#374151]">{authorDisplay(blog)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{formatDate(blog.publishedAt)}</span>
            <span className="opacity-40">·</span>
            <span>{blog.readingTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── CardList (list view — horizontal, full width) ────────────────────────────

export function CardList({ blog }: { blog: BlogSummary }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex items-start gap-4 py-4 border-b border-[#f0f0f0] last:border-b-0"
    >
      {/* Text left */}
      <div className="flex-1 min-w-0">
        <CategoryBadge name={blog.category.name} color={blog.category.color} size="xs" />
        <h3 className="mt-1 text-[15px] font-bold leading-snug text-[#111] line-clamp-2 group-hover:text-[#0096D6] transition-colors duration-150">
          {blog.title}
        </h3>
        <span className="mt-1 block text-[11px] text-[#9ca3af]">{formatDate(blog.publishedAt)}</span>
      </div>

      {/* Image right */}
      <div className="relative h-[80px] w-[120px] shrink-0 overflow-hidden rounded">
        <CoverImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
          className="h-full w-full"
        />
      </div>
    </Link>
  );
}

// ─── CardMini (tiny — title + date, no image) ────────────────────────────────

export function CardMini({ blog }: { blog: BlogSummary }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex items-start gap-3 py-2.5 border-b border-[#f0f0f0] last:border-b-0"
      style={{ borderLeftColor: blog.category.color }}
    >
      <span
        className="mt-1 block h-full w-[3px] shrink-0 rounded-full self-stretch min-h-[32px]"
        style={{ backgroundColor: blog.category.color }}
      />
      <div className="min-w-0">
        <h4 className="text-[13px] font-bold leading-snug text-[#111] line-clamp-2 group-hover:text-[#0096D6] transition-colors duration-150">
          {blog.title}
        </h4>
        <span className="mt-0.5 block text-[11px] text-[#9ca3af]">{formatDate(blog.publishedAt)}</span>
      </div>
    </Link>
  );
}

// ─── CardHorizontal (Featured Analysis — large horizontal thought-leadership) ─

export function CardHorizontal({
  blog,
  label = "Expert View",
}: {
  blog: BlogSummary;
  label?: string;
}) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col overflow-hidden border border-[#e8e8e8] bg-white transition-all duration-200 hover:border-[#d0d0d0] hover:shadow-[0_8px_30px_rgba(10,22,40,0.08)] sm:flex-row"
    >
      {/* Image left — 42% on desktop */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-[42%]">
        <CoverImage
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt}
          icon={blog.category.icon}
          className="h-full min-h-[200px] w-full"
        />
        {/* Editorial label badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1 rounded-sm bg-[#0a1628] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#1677f2]">
            {label}
          </span>
        </div>
      </div>

      {/* Content right */}
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">
        <CategoryBadge name={blog.category.name} color={blog.category.color} />
        <h3 className="mb-2.5 mt-1.5 text-[18px] font-black leading-snug text-[#0a1628] line-clamp-3 group-hover:text-[#0096D6] transition-colors duration-150 sm:text-[21px]">
          {blog.title}
        </h3>
        <p className="mb-4 text-[13.5px] leading-[1.7] text-[#6b7280] line-clamp-3">
          {blog.summary}
        </p>
        <div className="flex items-center gap-2.5 text-[11.5px] text-[#9ca3af]">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] text-[9px] font-black text-white">
            {blog.author.firstName[0]}
          </div>
          <span className="font-medium text-[#374151]">{authorDisplay(blog)}</span>
          <span className="opacity-40">·</span>
          <span>{formatDate(blog.publishedAt)}</span>
          <span className="opacity-40">·</span>
          <span>{blog.readingTime} min</span>
        </div>
      </div>
    </Link>
  );
}

// ─── CardPopularRank (Most Popular — ranked 1..5, no image) ──────────────────

export function CardPopularRank({ blog, rank }: { blog: BlogSummary; rank: number }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex items-start gap-4 border-b border-[#f0f0f0] py-3.5 last:border-b-0"
    >
      {/* Rank number */}
      <span className="shrink-0 text-[26px] font-black leading-none text-[#e2e8f0] transition-colors duration-150 group-hover:text-[#1677f2]">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <CategoryBadge name={blog.category.name} color={blog.category.color} size="xs" />
        <h4 className="mt-0.5 text-[13.5px] font-bold leading-snug text-[#111] line-clamp-2 group-hover:text-[#0096D6] transition-colors duration-150">
          {blog.title}
        </h4>
        <span className="mt-1 block text-[11px] text-[#9ca3af]">{blog.readingTime} min read</span>
      </div>
    </Link>
  );
}

// ─── BlogCard (backwards-compatible default export — CardStandard) ────────────

export function BlogCard({ blog }: { blog: BlogSummary }) {
  return <CardStandard blog={blog} />;
}

export default BlogCard;
