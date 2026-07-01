import type { Metadata } from "next";
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_BLOGS_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import { getPublishedBlogSummaries, getAllCategories } from "@/lib/blog/repository";
import BlogsClient from "./BlogsClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getContent('seo.blogs') as Partial<SeoContent>;
  return buildPageMetadata(seo, SEO_BLOGS_DEFAULTS, '/blogs');
}

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
