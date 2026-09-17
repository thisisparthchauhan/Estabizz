import type { CandidateAccountRoute } from "./types";

export const CANDIDATE_ACCOUNT_NAV_ITEMS: Array<{
  href: CandidateAccountRoute;
  label: string;
}> = [
  { href: "/jobs/account", label: "Dashboard" },
  { href: "/jobs/account/profile", label: "My Profile" },
  { href: "/jobs/account/applications", label: "My Applications" },
  { href: "/jobs/account/saved", label: "Saved Jobs" },
  { href: "/jobs/account/alerts", label: "Job Alerts" },
  { href: "/jobs/account/privacy", label: "Privacy" },
];

