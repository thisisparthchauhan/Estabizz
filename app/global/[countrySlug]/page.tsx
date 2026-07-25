/**
 * app/global/[countrySlug]/page.tsx
 *
 * Dynamic country landing page for the Global Markets system.
 *
 * SEO / indexing policy (Phase 25):
 *   active markets    → index, follow — included in sitemap
 *   developing markets → noindex, follow — excluded from sitemap
 *   planned markets   → noindex, follow — excluded from sitemap
 *
 * Structured data:
 *   - BreadcrumbList (all tiers)
 *   - WebPage (all tiers)
 *   - Organization reference (all tiers)
 *
 * NOT included: LocalBusiness schema (no local offices claimed),
 * fake address schema, or fake regulator associations.
 */
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { COUNTRY_BY_SLUG, getAllCountrySlugs } from "@/lib/globalMarkets/countries";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import CountryLandingClient from "./CountryLandingClient";

interface Props {
  params: Promise<{ countrySlug: string }>;
}

export async function generateStaticParams() {
  // Generate routes for all known country slugs
  return getAllCountrySlugs()
    .filter(slug => slug !== "india") // india redirects to /
    .map(slug => ({ countrySlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = COUNTRY_BY_SLUG.get(countrySlug.toLowerCase());

  if (!country || country.slug === "india") return {};

  const BASE = getSiteUrl();
  const canonical = `${BASE}/global/${country.slug}`;

  // Structured data: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",           item: BASE },
      { "@type": "ListItem", position: 2, name: "Global Markets", item: `${BASE}/global` },
      { "@type": "ListItem", position: 3, name: country.region,   item: `${BASE}/global?region=${encodeURIComponent(country.region)}` },
      { "@type": "ListItem", position: 4, name: country.name,     item: canonical },
    ],
  };

  // Structured data: WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: country.seoTitle,
    description: country.seoDescription,
    url: canonical,
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    publisher: {
      "@type": "Organization",
      name: "Estabizz Fintech Private Limited",
      url: BASE,
      logo: `${BASE}/estabizz-logo.png`,
    },
  };

  return {
    title:       country.seoTitle,
    description: country.seoDescription,
    robots: {
      index:  country.indexable,
      follow: true,
    },
    alternates: { canonical },
    openGraph: {
      title:       country.seoTitle,
      description: country.seoDescription,
      url:         canonical,
      siteName:    "Estabizz",
      locale:      "en_IN",
      type:        "website",
    },
    other: {
      "script:ld+json:breadcrumb": JSON.stringify(breadcrumbSchema),
      "script:ld+json:webpage":    JSON.stringify(webPageSchema),
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { countrySlug } = await params;

  // Normalise slug (reject uppercase slugs — always use lowercase)
  const normalised = countrySlug.toLowerCase();

  // India routes to homepage
  if (normalised === "india") redirect("/");

  // Unknown slugs → 404
  const country = COUNTRY_BY_SLUG.get(normalised);
  if (!country) notFound();

  // If the URL had uppercase, redirect to canonical lowercase
  if (countrySlug !== normalised) redirect(`/global/${normalised}`);

  return <CountryLandingClient country={country} />;
}
