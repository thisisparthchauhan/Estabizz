// ─────────────────────────────────────────────────────────────────────────────
// Registry of all "19/5" service-landing pages.
//
// To add a new page: create a file under lib/landing/pages, then add it to the
// LANDING_PAGES array below. The route + index pick it up automatically.
// ─────────────────────────────────────────────────────────────────────────────

import type { LandingPage } from "./types";
import { companyRegistration } from "./pages/companyRegistration";
import { changeCompanyName } from "./pages/changeCompanyName";
import { appointmentOfDirectors } from "./pages/appointmentOfDirectors";

export const LANDING_PAGES: LandingPage[] = [
  companyRegistration,
  changeCompanyName,
  appointmentOfDirectors,
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function getAllLandingSlugs(): string[] {
  return LANDING_PAGES.map((p) => p.slug);
}
