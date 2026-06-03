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
import { indianSubsidiary } from "./pages/indianSubsidiary";
import { increaseAuthorisedCapital } from "./pages/increaseAuthorisedCapital";
import { dinEkyc } from "./pages/dinEkyc";
import { llpRegistration } from "./pages/llpRegistration";
import { llpWindingUp } from "./pages/llpWindingUp";
import { moaPrivate } from "./pages/moaPrivate";
import { moaPublic } from "./pages/moaPublic";
import { moaSection8 } from "./pages/moaSection8";
import { ngoRegistration } from "./pages/ngoRegistration";
import { opcRegistration } from "./pages/opcRegistration";
import { opcConversion } from "./pages/opcConversion";
import { nidhiCompany } from "./pages/nidhiCompany";
import { publicRegistration } from "./pages/publicRegistration";
import { privateWindingUp } from "./pages/privateWindingUp";
import { removalOfDirector } from "./pages/removalOfDirector";
import { registeredOfficeChange } from "./pages/registeredOfficeChange";

export const LANDING_PAGES: LandingPage[] = [
  companyRegistration,
  publicRegistration,
  indianSubsidiary,
  opcRegistration,
  llpRegistration,
  nidhiCompany,
  changeCompanyName,
  increaseAuthorisedCapital,
  appointmentOfDirectors,
  removalOfDirector,
  registeredOfficeChange,
  dinEkyc,
  opcConversion,
  privateWindingUp,
  llpWindingUp,
  moaPrivate,
  moaPublic,
  moaSection8,
  ngoRegistration,
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function getAllLandingSlugs(): string[] {
  return LANDING_PAGES.map((p) => p.slug);
}
