// ─────────────────────────────────────────────────────────────────────────────
// Shape of a long-form service page (/solutions/<category>/<slug>).
//
// These pages come from Word documents written by the compliance team, all
// built on one house template: an SEO block, a hero, ~35 headed sections that
// are mostly comparison tables, then a numbered FAQ list. The content files
// under ./ipr, ./legal, … are MACHINE-GENERATED from those .docx files rather
// than retyped, and verified unit-for-unit against the source, so the page
// cannot quietly lose a row, a clause or a caveat -- which on a page citing
// specific sections of the Copyright Act would be a correctness problem, not
// a cosmetic one.
//
// Only two things in the source document do not appear as visible copy: the
// "SEO Elements" and "Hero Section" labels. Those are instructions to the
// builder, and they become Next metadata and the hero block respectively.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceBlock =
  | { kind: "p"; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] };

export interface ServiceSection {
  /** Slug of the heading; used as the in-page anchor and TOC target. */
  id: string;
  heading: string;
  blocks: ServiceBlock[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceHero {
  heading: string;
  paragraphs: string[];
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
}

export interface ServiceSeo {
  title: string;
  description: string;
  focusKeyword: string;
  imageAlt: string;
  /** The slug the source document proposed, kept for the record. The live URL
   *  is decided by the route (see lib/content/services/registry.ts), not by
   *  this field. */
  sourceSlug: string;
}

export interface ServicePageContent {
  /** URL segment under its category, e.g. "copyright-website". */
  slug: string;
  /** Title line of the source document. */
  docTitle: string;
  seo: ServiceSeo;
  hero: ServiceHero;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
}
