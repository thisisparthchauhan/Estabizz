// ─────────────────────────────────────────────────────────────────────────────
// Landing-page content model — drives the "19/5" service-landing section.
//
// Each page is a data object rendered by components/landing/LandingRenderer.tsx.
// Adding a new page = add one file under lib/landing/pages and register it in
// lib/landing/index.ts. No template changes needed.
// ─────────────────────────────────────────────────────────────────────────────

export type Block =
  | { type: "p"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "checks"; items: string[] }           // ✓-style list
  | { type: "numbered"; items: { lead?: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; tone?: "blue" | "navy" | "amber"; label?: string; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "faqs"; items: { q: string; a: string }[] }
  | { type: "contact"; phone: string; web?: string; email?: string; text?: string };

export interface Section {
  heading?: string;
  blocks: Block[];
}

export interface LandingPage {
  slug: string;
  /** Big H1 shown in the hero */
  title: string;
  /** One-line tagline under the H1 */
  tagline: string;
  /** Short label shown in the hero badge / breadcrumb (e.g. "MCA / ROC Service") */
  category: string;

  // SEO
  seoTitle: string;
  metaDescription: string;
  focusKeyword?: string;

  // Hero CTAs
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional urgency line shown as a banner under the hero CTAs */
  urgency?: string;

  sections: Section[];
}
