// ─────────────────────────────────────────────────────────────────────────────
// Navbar default content — SINGLE SOURCE OF TRUTH (plain data, no JSX).
//
// Covers the editable parts of the navbar:
//   • quickLinks — the standalone top-level links (Insights, 19/5, Old Site …)
//   • the "Get Started" call-to-action button
//
// The mega-menus (Services / Regulatory / Solutions / Resources) remain defined
// in Navbar.tsx — they are a large structured service taxonomy, not day-to-day
// editable marketing content.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavQuickLink {
  label: string;
  href: string;
  /** Emoji shown before the label in the mobile menu. */
  icon: string;
  /** Open in a new tab (external links). */
  newTab: boolean;
}

export interface NavbarContent {
  quickLinks: NavQuickLink[];
  ctaLabel: string;
  ctaHref: string;
}

export const NAVBAR_DEFAULTS: NavbarContent = {
  quickLinks: [
    { label: 'Insights', href: '/blogs', icon: '✍️', newTab: false },
    { label: '19/5', href: '/19-5', icon: '🏛️', newTab: false },
    { label: 'Old Site', href: 'https://old.estabizz.com/', icon: '🗂️', newTab: true },
  ],
  ctaLabel: 'Get Started',
  ctaHref: '/get-started',
};
