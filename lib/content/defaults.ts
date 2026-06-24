import type { ContentDefault } from '@/lib/content/types';
import { FOOTER_DEFAULTS } from '@/lib/content/footerDefaults';
import { NAVBAR_DEFAULTS } from '@/lib/content/navbarDefaults';

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
