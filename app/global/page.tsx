/**
 * app/global/page.tsx — Global Markets Directory
 *
 * Presents Estabizz's international market coverage:
 * - Premium Global Market Desk introduction
 * - Searchable, filterable country list with tier labels
 * - India links to / (not /global/india)
 * - Correct positioning: "market-entry intelligence, regulatory pathway assessment
 *   and advisory coordination" — NOT "operating in 195 countries"
 */

import type { Metadata } from "next";
import GlobalMarketsClient from "./GlobalMarketsClient";
import { getSiteUrl } from "@/lib/seo/siteUrl";

const BASE = getSiteUrl();
const canonical = `${BASE}/global`;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",          item: BASE },
    { "@type": "ListItem", position: 2, name: "Global Markets",item: canonical },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Global Markets | Estabizz International Market-Entry Advisory",
  description:
    "Estabizz provides market-entry intelligence, regulatory pathway assessment and advisory coordination across international jurisdictions through its India-based Global Market Desk.",
  url: canonical,
  publisher: {
    "@type": "Organization",
    name: "Estabizz Fintech Private Limited",
    url: BASE,
    logo: `${BASE}/estabizz-logo.png`,
  },
};

export const metadata: Metadata = {
  title: "Global Markets | Estabizz International Market-Entry Advisory",
  description:
    "Estabizz provides market-entry intelligence, regulatory pathway assessment and advisory coordination across international jurisdictions through its India-based Global Market Desk.",
  robots: { index: true, follow: true },
  alternates: { canonical },
  openGraph: {
    title:       "Global Markets | Estabizz",
    description: "Market-entry intelligence and regulatory pathway assessment across international jurisdictions.",
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

export default function GlobalMarketsPage() {
  return <GlobalMarketsClient />;
}
