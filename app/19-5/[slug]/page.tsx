import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage, getAllLandingSlugs } from "@/lib/landing";
import { LandingRenderer } from "@/components/landing/LandingRenderer";
import type { Block } from "@/lib/landing/types";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://www.estabizz.com";

export async function generateStaticParams() {
  return getAllLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: `/19-5/${page.slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      type: "website",
      url: `/19-5/${page.slug}`,
      siteName: "Estabizz Fintech",
    },
    twitter: { card: "summary_large_image", title: page.seoTitle, description: page.metaDescription },
    robots: { index: true, follow: true },
  };
}

// Collect FAQ blocks for FAQPage schema
function collectFaqs(blocks: Block[][]): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  blocks.flat().forEach((b) => {
    if (b.type === "faqs") out.push(...b.items);
  });
  return out;
}

export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return notFound();

  const faqs = collectFaqs(page.sections.map((s) => s.blocks));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    serviceType: page.focusKeyword ?? page.title,
    provider: {
      "@type": "Organization",
      name: "Estabizz Fintech Private Limited",
      url: SITE_URL,
      telephone: "+91 98256 00907",
    },
    areaServed: "IN",
    url: `${SITE_URL}/19-5/${page.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Corporate Services", item: `${SITE_URL}/19-5` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${SITE_URL}/19-5/${page.slug}` },
    ],
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <LandingRenderer page={page} />
    </>
  );
}
