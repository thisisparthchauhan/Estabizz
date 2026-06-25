import type { Metadata } from "next";
import type { SeoContent } from "@/lib/content/seoDefaults";

// Builds a Next.js Metadata object from page-wise SEO content.
//
// Safety:
// - Empty SEO title or meta description fall back to `fallback` values, so a
//   blank field can never produce empty/broken metadata.
// - Canonical defaults to the supplied route path; an editable slug is NOT used
//   for routing (the homepage route always stays "/").
// - OG image is only set when explicitly provided, preserving Next's
//   file-convention opengraph-image.png fallback otherwise.

export function buildPageMetadata(
  seo: Partial<SeoContent>,
  fallback: SeoContent,
  canonicalPath: string
): Metadata {
  const s: SeoContent = { ...fallback, ...seo };

  const title = s.seoTitle?.trim() || fallback.seoTitle;
  const description = s.metaDescription?.trim() || fallback.metaDescription;
  const canonical = s.canonicalUrl?.trim() || canonicalPath;

  const ogTitle = s.ogTitle?.trim() || title;
  const ogDescription = s.ogDescription?.trim() || description;
  const twTitle = s.twitterTitle?.trim() || ogTitle;
  const twDescription = s.twitterDescription?.trim() || ogDescription;

  const index = s.robotsIndex !== false;
  const follow = s.robotsFollow !== false;

  const metadata: Metadata = {
    title,
    description,
    keywords: s.focusKeyword?.trim() || undefined,
    alternates: { canonical },
    robots: { index, follow, googleBot: { index, follow } },
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      ...(s.ogImage?.trim() ? { images: [{ url: s.ogImage.trim() }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDescription,
      ...(s.ogImage?.trim() ? { images: [s.ogImage.trim()] } : {}),
    },
  };

  return metadata;
}
