import type { ContentDefault } from '@/lib/content/types';
import { FOOTER_DEFAULTS } from '@/lib/content/footerDefaults';
import { NAVBAR_DEFAULTS } from '@/lib/content/navbarDefaults';
import { HERO_DEFAULTS } from '@/lib/content/heroDefaults';
import { STATS_DEFAULTS } from '@/lib/content/statsDefaults';
import { TRUSTED_BY_DEFAULTS } from '@/lib/content/trustedByDefaults';
import { SOLUTIONS_DEFAULTS } from '@/lib/content/solutionsDefaults';
import { GLOBAL_MARKETS_DEFAULTS } from '@/lib/content/globalMarketsDefaults';
import { WHY_ESTABIZZ_DEFAULTS } from '@/lib/content/whyEstabizzDefaults';
import { FINAL_CTA_DEFAULTS } from '@/lib/content/finalCtaDefaults';
import { REGULATORY_SERVICES_DEFAULTS } from '@/lib/content/regulatoryServicesDefaults';
import { PROCESS_DEFAULTS } from '@/lib/content/processDefaults';
import { COMPLIANCE_PORTAL_DEFAULTS } from '@/lib/content/compliancePortalDefaults';
import { CASE_STUDIES_DEFAULTS } from '@/lib/content/caseStudiesDefaults';
import { TESTIMONIALS_DEFAULTS } from '@/lib/content/testimonialsDefaults';
import { CONTENT_FRAMEWORK_DEFAULTS } from '@/lib/content/contentFrameworkDefaults';
import { RESOURCES_DEFAULTS } from '@/lib/content/resourcesDefaults';
import { SEO_HOMEPAGE_DEFAULTS } from '@/lib/content/seoDefaults';

// ─────────────────────────────────────────────────────────────────────────────
// Content defaults registry
//
// Every editable content block declares its DEFAULT (hardcoded) values here.
// The public site reads content via getContent(key) — if the database has no
// edited version yet, these defaults are returned. This makes migrating the
// site to the CMS completely safe and gradual: a block is "live-editable" the
// moment its component reads from getContent(), and until an admin edits it the
// visitor sees exactly the same text as before.
//
// As we migrate more of the site, we add more entries here.
// ─────────────────────────────────────────────────────────────────────────────

export const CONTENT_DEFAULTS: Record<string, ContentDefault> = {
  // ── Footer (Navigation group) ───────────────────────────────────────────────
  'global.navbar': {
    key: 'global.navbar',
    label: 'Navbar',
    group: 'Navigation',
    // Sourced from the single source of truth in navbarDefaults.ts
    fields: { ...NAVBAR_DEFAULTS },
  },

  'homepage.hero': {
    key: 'homepage.hero',
    label: 'Hero Section',
    group: 'Homepage',
    fields: { ...HERO_DEFAULTS },
  },

  'homepage.stats': {
    key: 'homepage.stats',
    label: 'Statistics / Achievements',
    group: 'Homepage',
    fields: { ...STATS_DEFAULTS },
  },

  'homepage.trustedBy': {
    key: 'homepage.trustedBy',
    label: 'Client Logos / Trusted By',
    group: 'Homepage',
    fields: { ...TRUSTED_BY_DEFAULTS },
  },

  'homepage.solutions': {
    key: 'homepage.solutions',
    label: 'Business Stage Solutions',
    group: 'Homepage',
    fields: { ...SOLUTIONS_DEFAULTS },
  },

  'homepage.globalMarkets': {
    key: 'homepage.globalMarkets',
    label: 'Global Market Desk',
    group: 'Homepage',
    fields: { ...GLOBAL_MARKETS_DEFAULTS },
  },

  'homepage.whyChooseUs': {
    key: 'homepage.whyChooseUs',
    label: 'Why Estabizz',
    group: 'Homepage',
    fields: { ...WHY_ESTABIZZ_DEFAULTS },
  },

  'homepage.regulatoryServices': {
    key: 'homepage.regulatoryServices',
    label: 'Regulatory Services',
    group: 'Homepage',
    fields: { ...REGULATORY_SERVICES_DEFAULTS },
  },

  'homepage.process': {
    key: 'homepage.process',
    label: 'Execution Process',
    group: 'Homepage',
    fields: { ...PROCESS_DEFAULTS },
  },

  'homepage.compliancePortal': {
    key: 'homepage.compliancePortal',
    label: 'Compliance Portal',
    group: 'Homepage',
    fields: { ...COMPLIANCE_PORTAL_DEFAULTS },
  },

  'homepage.caseStudies': {
    key: 'homepage.caseStudies',
    label: 'Regulatory Experience / Case Highlights',
    group: 'Homepage',
    fields: { ...CASE_STUDIES_DEFAULTS },
  },

  'homepage.testimonials': {
    key: 'homepage.testimonials',
    label: 'Testimonials',
    group: 'Homepage',
    fields: { ...TESTIMONIALS_DEFAULTS },
  },

  'homepage.contentFramework': {
    key: 'homepage.contentFramework',
    label: 'Content, Compliance & Trust',
    group: 'Homepage',
    fields: { ...CONTENT_FRAMEWORK_DEFAULTS },
  },

  'homepage.resources': {
    key: 'homepage.resources',
    label: 'Resource Architecture',
    group: 'Homepage',
    fields: { ...RESOURCES_DEFAULTS },
  },

  'seo.homepage': {
    key: 'seo.homepage',
    label: 'SEO Settings',
    group: 'Homepage',
    fields: { ...SEO_HOMEPAGE_DEFAULTS },
  },

  'homepage.finalCta': {
    key: 'homepage.finalCta',
    label: 'Final CTA',
    group: 'Homepage',
    fields: { ...FINAL_CTA_DEFAULTS },
  },

  'global.footer': {
    key: 'global.footer',
    label: 'Footer',
    group: 'Navigation',
    // Sourced from the single source of truth in footerDefaults.ts
    fields: { ...FOOTER_DEFAULTS },
  },
};

/** Convenience: read just the default fields for a key (or empty object). */
export function getDefaultFields(key: string): Record<string, unknown> {
  return CONTENT_DEFAULTS[key]?.fields ?? {};
}

/** All default blocks grouped by their admin section. */
export function getDefaultsByGroup(): Record<string, ContentDefault[]> {
  const out: Record<string, ContentDefault[]> = {};
  for (const def of Object.values(CONTENT_DEFAULTS)) {
    (out[def.group] ??= []).push(def);
  }
  return out;
}
