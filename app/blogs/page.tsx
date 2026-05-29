import type { Metadata } from "next";
import { getPublishedBlogSummaries, getAllCategories } from "@/lib/blog/repository";
import BlogsClient from "./BlogsClient";

// ─── SEO metadata ─────────────────────────────────────────────────────────────
// metadataBase is set in app/layout.tsx — relative URLs here resolve to
// https://www.estabizz.com/... automatically.

export const metadata: Metadata = {
  title: "Regulatory Insights | RBI, SEBI, IRDAI, IFSCA & Fintech Blogs",
  description:
    "Expert regulatory insights, licensing guides and compliance updates on RBI, SEBI, IRDAI, IFSCA, NBFC, fintech, insurance and corporate compliance. Published by Estabizz Fintech.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Estabizz Regulatory Insights | RBI, SEBI, IRDAI, IFSCA & Fintech Blogs",
    description:
      "Professional regulatory insights and compliance guides for founders, CFOs, fintechs and regulated businesses in India and globally.",
    type: "website",
    url: "/blogs",
    // TODO: Add /public/images/og-blogs.png (1200×630) and un-comment below
    // images: [{ url: "/images/og-blogs.png", width: 1200, height: 630, alt: "Estabizz Regulatory Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estabizz Regulatory Insights",
    description:
      "Licensing guides, compliance explainers and regulatory updates for Indian and global fintech businesses.",
    // TODO: add image once /public/images/og-blogs.png is created
  },
  // Allow crawling — the listing page is fully public and indexable
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Breadcrumb JSON-LD for the blog index ───────────────────────────────────

const BREADCRUMB_SCHEMA = {
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
  ],
};

// Force fresh render on every request so newly published blogs appear immediately
export const dynamic = 'force-dynamic';

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogsPage() {
  const [blogs, categories] = await Promise.all([
    getPublishedBlogSummaries(),
    getAllCategories(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <BlogsClient initialBlogs={blogs} categories={categories} />
    </>
  );
}
