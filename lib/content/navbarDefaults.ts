// ─────────────────────────────────────────────────────────────────────────────
// Navbar default content — SINGLE SOURCE OF TRUTH (plain data, no JSX).
//
// Covers the editable parts of the navbar:
//   • quickLinks — the standalone top-level links
//   • the "Get Started" call-to-action button
//
// The mega-menus (Services / Regulatory / Solutions / Resources) remain defined
// in Navbar.tsx — they are a large structured service taxonomy, not day-to-day
// editable marketing content. The Jobs dropdown (Find Jobs / Candidate Account /
// Join Estabizz / Hire Talent) is also defined in Navbar.tsx, for the same
// reason "Jobs" is no longer a flat quickLink here — Navbar.tsx renders it as
// its own compact dropdown instead (see JOBS_MENU_ITEMS).
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
    { label: 'Global Markets', href: '/global',  icon: '🌐', newTab: false },
    { label: 'Blogs',          href: '/blogs',   icon: '✍️', newTab: false },
  ],
  ctaLabel: 'Get Started',
  ctaHref: '/get-started',
};
