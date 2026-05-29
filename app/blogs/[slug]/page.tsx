/**
 * /blogs/[slug] — Blog detail page
 *
 * SEO features:
 *   - Dynamic <title>, <meta description>, canonical, og:*, twitter:*
 *   - JSON-LD: BlogPosting, BreadcrumbList, FAQPage (when FAQs are present)
 *   - generateStaticParams: pre-renders every published blog at build time
 *   - Unpublished slugs → 404 (getBlogBySlug only returns status==="published")
 *   - robots: index / follow for published articles (inherited from root layout)
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogBySlug,
  getRelatedBlogs,
  getPublishedBlogSummaries,
} from "@/lib/blog/repository";
import type { Blog, BlogSummary } from "@/lib/blog/types";
import BlogDetailClient from "./BlogDetailClient";

// ─── Params type (Next.js 15+ async params) ──────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

// ─── Static params for pre-rendering ─────────────────────────────────────────
// Only published blogs are pre-rendered. Drafts / pending / rejected do not get
// a static route, and dynamic access returns 404 via notFound().

export async function generateStaticParams() {
  const blogs = await getPublishedBlogSummaries();
  return blogs.map((b) => ({ slug: b.slug }));
}

// ─── Dynamic SEO metadata ─────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  // Use the explicit seoTitle field; fall back to title if empty
  const title = blog.seoTitle || blog.title;
  const description = blog.metaDescription || blog.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blogs/${blog.slug}`,
      images: blog.featuredImage.url
        ? [
            {
              url: blog.featuredImage.url,
              alt: blog.featuredImage.alt,
              width: blog.featuredImage.width ?? 1200,
              height: blog.featuredImage.height ?? 630,
            },
          ]
        : undefined,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [`${blog.author.firstName} ${blog.author.lastName}`],
      tags: blog.tags,
      siteName: "Estabizz Fintech",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.featuredImage.url ? [blog.featuredImage.url] : undefined,
    },
    // Published blog articles are fully indexable
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

const SITE_URL = "https://www.estabizz.com";

/**
 * BlogPosting schema (richer than generic Article — preferred by Google for blog content).
 * https://schema.org/BlogPosting
 */
function buildBlogPostingSchema(blog: Blog) {
  // Rough word count from HTML content (strip tags, split on whitespace)
  const wordCount = blog.content
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blogs/${blog.slug}#article`,
    headline: blog.title,
    description: blog.metaDescription || blog.summary,
    image: blog.featuredImage.url
      ? {
          "@type": "ImageObject",
          url: blog.featuredImage.url.startsWith("http")
            ? blog.featuredImage.url
            : `${SITE_URL}${blog.featuredImage.url}`,
          description: blog.featuredImage.alt,
          width: blog.featuredImage.width ?? 1200,
          height: blog.featuredImage.height ?? 630,
        }
      : undefined,
    datePublished: blog.publishedAt ?? blog.createdAt,
    dateModified: blog.updatedAt ?? blog.publishedAt ?? blog.createdAt,
    author: {
      "@type": "Person",
      name: `${blog.author.firstName} ${blog.author.lastName}`,
      jobTitle: blog.author.designation,
    },
    publisher: {
      "@type": "Organization",
      name: "Estabizz Fintech Private Limited",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blog.slug}`,
    },
    url: `${SITE_URL}/blogs/${blog.slug}`,
    inLanguage: "en-IN",
    keywords: blog.tags.join(", "),
    articleSection: blog.category.name,
    wordCount,
    timeRequired: `PT${blog.readingTime}M`,
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blogs`,
      name: "Estabizz Regulatory Insights",
      publisher: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
      },
    },
  };
}

/**
 * FAQPage schema — only emitted when the blog has one or more FAQs.
 * https://schema.org/FAQPage
 */
function buildFAQSchema(blog: Blog) {
  if (!blog.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...blog.faqs]
      .sort((a, b) => a.order - b.order)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
  };
}

/**
 * BreadcrumbList schema — 4-level trail: Home → Blogs → Category → Article.
 * https://schema.org/BreadcrumbList
 */
function buildBreadcrumbSchema(blog: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Regulatory Insights",
        item: `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.category.name,
        item: `${SITE_URL}/blogs?category=${blog.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: blog.title,
        item: `${SITE_URL}/blogs/${blog.slug}`,
      },
    ],
  };
}

export const dynamic = 'force-dynamic';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  // getBlogBySlug returns null for any non-published blog (draft, pending, etc.)
  // — this ensures unpublished content never renders publicly.
  if (!blog) return notFound();

  // Related blogs — same category, excluding current article
  const relatedFull = await getRelatedBlogs(blog.id, blog.category.id, 3);
  const relatedBlogs: BlogSummary[] = relatedFull.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ content: _c, faqs: _f, images: _i, ...rest }) => rest
  );

  const faqSchema = buildFAQSchema(blog);

  return (
    <>
      {/* ── JSON-LD structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBlogPostingSchema(blog)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(blog)),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
