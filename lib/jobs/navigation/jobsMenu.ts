// ─────────────────────────────────────────────────────────────────────────────
// Jobs / Candidate / Recruitment navigation entries (Phase 7A).
//
// Single source of truth for what the global Navbar shows, shared between its
// desktop dropdown and mobile menu so the two cannot drift apart — Navbar.tsx
// renders JOBS_MENU_ITEMS / HIRE_TALENT_ITEM in both places from this one
// import, not two hand-maintained lists.
//
// Plain data (no JSX, no "use client") so it is importable both from the
// client Navbar component and from a plain Node test with tsc + require,
// exactly like lib/jobs/candidateAccount/navigation.ts.
//
// WHY EVERY ITEM IS SHOWN REGARDLESS OF LOGIN STATE: a candidate IS a logged-in
// website user — requireCandidateAccountSessionForPage() authenticates against
// the same auth_token cookie as /api/auth/me. There is no separate "candidate"
// role to branch on. Clicking "Candidate Account" while logged out redirects
// safely through /login with a return path (lib/jobs/candidateIdentity/
// redirects.ts) and lands back where the user clicked.
//
// Privacy is deliberately excluded from every list here: it stays reachable
// only from the in-page Candidate Account tab bar (CandidateAccountNav), not
// as a primary global navigation item.
// ─────────────────────────────────────────────────────────────────────────────
import { CANDIDATE_ACCOUNT_NAV_ITEMS } from "@/lib/jobs/candidateAccount/navigation";

export interface JobsNavItem {
  label: string;
  href: string;
  description: string;
}

/** Always-visible primary Jobs entry points — desktop dropdown and mobile menu. */
export const JOBS_MENU_ITEMS: JobsNavItem[] = [
  { label: "Find Jobs",         href: "/jobs",         description: "Browse open roles managed by Estabizz" },
  { label: "Candidate Account", href: "/jobs/account", description: "Dashboard, profile, applications and alerts" },
  { label: "Join Estabizz",     href: "/jobs/join",     description: "Add your profile to our talent network" },
];

/** Kept separate from JOBS_MENU_ITEMS because it renders with distinct
 *  (accent) styling and sits below a divider in both menus — it is an
 *  employer entry point, not a candidate one. */
export const HIRE_TALENT_ITEM: JobsNavItem = {
  label: "Hire Talent",
  href: "/jobs/hire-talent",
  description: "Submit a hiring requirement to our team",
};

/** Same source as the in-account tab bar, Privacy filtered out and the
 *  dashboard entry relabelled — "Dashboard" alone is ambiguous with the admin
 *  dashboard shown in the same menu for admin users. */
export function getCandidateUserMenuItems(): Array<{ label: string; href: string }> {
  return CANDIDATE_ACCOUNT_NAV_ITEMS
    .filter((item) => item.href !== "/jobs/account/privacy")
    .map((item) => (item.href === "/jobs/account" ? { ...item, label: "Candidate Dashboard" } : item));
}
