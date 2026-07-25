/**
 * lib/globalMarkets/types.ts
 *
 * Type definitions for the Global Markets V2 system.
 * Three-tier model: active | developing | planned
 * Page depth: full | standard | compact
 */

export type GlobalMarketTier = "active" | "developing" | "planned";
export type GlobalPageDepth  = "full" | "standard" | "compact";

export interface GlobalSupportArea {
  /** Lucide icon name — e.g. "Building2", "ClipboardCheck" */
  icon: string;
  label: string;
  description?: string;
}

export interface GlobalProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface GlobalRegulator {
  name: string;
  acronym?: string;
  area: string;
  whenItMayApply: string;
  officialUrl?: string;
  verified: boolean;
}

export interface GlobalMarketFaq {
  question: string;
  answer: string;
}

export interface GlobalMarketConfig {
  name: string;
  slug: string;
  iso2: string;
  callingCode?: string;
  region: string;
  subregion?: string;

  tier: GlobalMarketTier;
  pageDepth: GlobalPageDepth;

  indexable: boolean;
  includeInSitemap: boolean;

  headline?: string;
  subheadline?: string;
  marketStatusLabel: string;
  marketStatusDescription: string;

  overview?: string;
  businessEnvironment?: string;
  regulatoryOverview?: string;
  crossBorderOverview?: string;
  localCoordinationOverview?: string;

  supportAreas: GlobalSupportArea[];
  audiences: string[];
  deliverables?: string[];
  processSteps?: GlobalProcessStep[];

  corridor?: {
    indiaToMarket?: string[];
    marketToIndia?: string[];
  };

  regulators?: GlobalRegulator[];
  faqs?: GlobalMarketFaq[];

  relatedSlugs: string[];

  seoTitle: string;
  seoDescription: string;

  contentReviewedAt?: string;
  contentReviewedBy?: string;
  sourceNotes?: string[];
}
