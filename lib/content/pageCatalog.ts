// ─────────────────────────────────────────────────────────────────────────────
// Page & Section catalog — drives the admin "Website Editor".
//
// Each PAGE lists its SECTIONS in the order they appear on the live site.
// A section maps to a content-block `key` (see lib/content/defaults.ts).
// `editorReady` marks whether the section's edit form has been built yet;
// sections are wired up one at a time, and the catalog shows the rest as
// "coming soon" so the full page structure is visible from day one.
//
// Adding a new page later = add an entry here. The admin UI updates itself.
// ─────────────────────────────────────────────────────────────────────────────

export interface SectionEntry {
  /** content-block key, e.g. "homepage.hero" */
  key: string;
  /** Human-friendly name shown in admin */
  name: string;
  /** Short hint of where it appears */
  note?: string;
  /** True once the edit form exists */
  editorReady: boolean;
}

export interface PageEntry {
  /** url-safe id, e.g. "homepage" */
  id: string;
  name: string;
  /** Public path it represents */
  path: string;
  sections: SectionEntry[];
}

export const PAGES: PageEntry[] = [
  {
    id: 'homepage',
    name: 'Homepage',
    path: '/',
    sections: [
      { key: 'global.navbar',            name: 'Header / Navbar',                 note: 'Top of every page',          editorReady: true },
      { key: 'homepage.hero',            name: 'Hero Section',                    note: 'Main banner',                editorReady: true },
      { key: 'homepage.stats',           name: 'Statistics / Achievements',       note: 'Counters',                   editorReady: true },
      { key: 'homepage.trustedBy',       name: 'Client Logos / Trusted By',                                           editorReady: true },
      { key: 'homepage.globalMarkets',   name: 'Global Market Desk',                                                  editorReady: false },
      { key: 'homepage.solutions',       name: 'Business Stage Solutions',        note: 'Audience cards',             editorReady: true },
      { key: 'homepage.whyChooseUs',     name: 'Why Estabizz',                                                        editorReady: false },
      { key: 'homepage.regulatoryServices', name: 'Regulatory Services',          note: 'Service categories',         editorReady: false },
      { key: 'homepage.process',         name: 'Execution Process',                                                   editorReady: false },
      { key: 'homepage.caseStudies',     name: 'Regulatory Experience / Case Highlights',                             editorReady: false },
      { key: 'homepage.compliancePortal', name: 'Compliance Portal',                                                  editorReady: false },
      { key: 'homepage.testimonials',    name: 'Testimonials',                                                        editorReady: false },
      { key: 'homepage.contentFramework', name: 'Content, Compliance & Trust',                                        editorReady: false },
      { key: 'homepage.resources',       name: 'Resource Architecture',                                               editorReady: false },
      { key: 'homepage.finalCta',        name: 'Final CTA',                                                           editorReady: false },
      { key: 'global.footer',            name: 'Footer Section',                  note: 'Bottom of every page',       editorReady: true },
      { key: 'seo.homepage',             name: 'SEO Settings',                    note: 'Search engine listing',      editorReady: false },
    ],
  },
];

export function getPage(id: string): PageEntry | undefined {
  return PAGES.find((p) => p.id === id);
}
