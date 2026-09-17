import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategory, getServicePage, allServicePages } from "@/lib/content/services/registry";
import ServicePageView from "@/components/services/ServicePageView";

// /solutions/<category>/<slug> — long-form service pages.
//
// One dynamic route rather than a folder per page: every one of these renders
// from the same machine-generated content shape (lib/content/services/types),
// so a hand-written page.tsx per service would be the same file copied with a
// different import, and the twentieth copy would be the one that quietly
// forgets the JSON-LD or the canonical.

type Params = Promise<{ category: string; slug: string }>;

export function generateStaticParams() {
  return allServicePages().map(({ category, page }) => ({ category, slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, slug } = await params;
  const page = getServicePage(category, slug);
  if (!page) return {};

  const url = `/solutions/${category}/${slug}`;
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.focusKeyword ? [page.seo.focusKeyword] : undefined,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      title: page.seo.title,
      description: page.seo.description,
      // The source document supplies alt text for the page image; carrying it
      // here is the only place it has a job to do.
      images: page.seo.imageAlt
        ? [{ url: "/opengraph-image.png", alt: page.seo.imageAlt }]
        : undefined,
    },
  };
}

export default async function SolutionServicePage({ params }: { params: Params }) {
  const { category: categorySlug, slug } = await params;
  const category = getCategory(categorySlug);
  const page = category ? getServicePage(categorySlug, slug) : undefined;
  if (!category || !page) notFound();

  const base = "https://www.estabizz.com";
  // FAQPage is built from the SAME faqs array the page renders, so the markup
  // cannot describe questions the page does not show. Service + BreadcrumbList
  // complete the graph.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.hero.heading,
        serviceType: page.seo.focusKeyword || page.docTitle,
        description: page.seo.description,
        url: `${base}/solutions/${categorySlug}/${slug}`,
        areaServed: { "@type": "Country", name: "India" },
        provider: {
          "@type": "Organization",
          name: "Estabizz Fintech Private Limited",
          url: base,
          telephone: "+91-98256-00907",
          email: "info@estabizz.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${base}/solutions` },
          { "@type": "ListItem", position: 3, name: category.label, item: `${base}/solutions/${categorySlug}` },
          { "@type": "ListItem", position: 4, name: page.hero.heading, item: `${base}/solutions/${categorySlug}/${slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageView page={page} category={category} />
    </>
  );
}
