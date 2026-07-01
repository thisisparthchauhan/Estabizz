// Static catalog of all pages whose SEO is managed from /admin/seo.
// The public routes listed here must already exist in the app/ file system.
// Homepage (seo.homepage) is managed from the Website Editor and is included
// here for visibility only — its edit link points to the dedicated homepage
// SEO editor.

import {
  SEO_HOMEPAGE_DEFAULTS,
  SEO_CONTACT_DEFAULTS,
  SEO_BLOGS_DEFAULTS,
  SEO_RBI_DEFAULTS,
  SEO_SEBI_DEFAULTS,
  SEO_IRDAI_DEFAULTS,
  SEO_IFSCA_DEFAULTS,
  SEO_FEMA_DEFAULTS,
  SEO_SERVICES_DEFAULTS,
  SEO_PRICING_DEFAULTS,
  SEO_RESOURCES_DEFAULTS,
  SEO_REGULATORY_UPDATES_DEFAULTS,
  SEO_LEGAL_PRIVACY_DEFAULTS,
  SEO_LOGIN_DEFAULTS,
  type SeoContent,
} from '@/lib/content/seoDefaults';

export interface SeoPageEntry {
  key:      string;
  label:    string;
  path:     string;
  group:    string;
  defaults: SeoContent;
}

export const SEO_PAGE_CATALOG: SeoPageEntry[] = [
  // ── Main pages ─────────────────────────────────────────────────────────────
  { key: 'seo.homepage',            label: 'Homepage',               path: '/',                              group: 'Main Pages', defaults: SEO_HOMEPAGE_DEFAULTS },
  { key: 'seo.contact',             label: 'Contact',                path: '/contact',                       group: 'Main Pages', defaults: SEO_CONTACT_DEFAULTS },
  { key: 'seo.blogs',               label: 'Blogs Listing',          path: '/blogs',                         group: 'Main Pages', defaults: SEO_BLOGS_DEFAULTS },
  { key: 'seo.pricing',             label: 'Pricing',                path: '/pricing',                       group: 'Main Pages', defaults: SEO_PRICING_DEFAULTS },
  { key: 'seo.resources',           label: 'Resources',              path: '/resources',                     group: 'Main Pages', defaults: SEO_RESOURCES_DEFAULTS },
  { key: 'seo.regulatory-updates',  label: 'Regulatory Updates',     path: '/resources/regulatory-updates',  group: 'Main Pages', defaults: SEO_REGULATORY_UPDATES_DEFAULTS },
  // ── Regulatory service hubs ────────────────────────────────────────────────
  { key: 'seo.rbi',   label: 'RBI Services',   path: '/rbi',   group: 'Regulatory Hubs', defaults: SEO_RBI_DEFAULTS },
  { key: 'seo.sebi',  label: 'SEBI Services',  path: '/sebi',  group: 'Regulatory Hubs', defaults: SEO_SEBI_DEFAULTS },
  { key: 'seo.irdai', label: 'IRDAI Services', path: '/irdai', group: 'Regulatory Hubs', defaults: SEO_IRDAI_DEFAULTS },
  { key: 'seo.ifsca', label: 'IFSCA Services', path: '/ifsca', group: 'Regulatory Hubs', defaults: SEO_IFSCA_DEFAULTS },
  { key: 'seo.fema',  label: 'FEMA Services',  path: '/fema',  group: 'Regulatory Hubs', defaults: SEO_FEMA_DEFAULTS },
  // ── Business services ──────────────────────────────────────────────────────
  { key: 'seo.services', label: 'Business Services', path: '/services', group: 'Business Services', defaults: SEO_SERVICES_DEFAULTS },
  // ── Legal / system ────────────────────────────────────────────────────────
  { key: 'seo.legal-privacy', label: 'Privacy Policy', path: '/legal/privacy-policy', group: 'Legal & System', defaults: SEO_LEGAL_PRIVACY_DEFAULTS },
  { key: 'seo.login',         label: 'Login',           path: '/login',                group: 'Legal & System', defaults: SEO_LOGIN_DEFAULTS },
];

/** Quick lookup by content key. */
export const SEO_PAGE_BY_KEY: Record<string, SeoPageEntry> =
  Object.fromEntries(SEO_PAGE_CATALOG.map(e => [e.key, e]));
