// ─────────────────────────────────────────────────────────────────────────────
// Jobs / Candidate / Recruitment entries for the global "Search pages..." box
// in the Navbar (Phase 7A).
//
// ROUTE DISCOVERY ONLY. Every entry is a static label + href pair, identical
// for every visitor — no candidate name, resume content, application status or
// any other per-user data is ever read into this list. That property is what
// makes it safe to feed straight into Navbar's client-side search: it never
// touches a database, session or API response.
//
// group text doubles as extra keyword coverage for the client-side substring
// search (Navbar builds `${label} ${href} ${group}` as the searchable string):
// "Jobs & Careers" lets a search for "career" or "careers" surface every
// candidate-facing route; "Recruitment" lets Hire Talent surface on that term
// specifically, since it is an employer entry point, not a candidate one.
// ─────────────────────────────────────────────────────────────────────────────
export interface JobsSearchEntry {
  label: string;
  href: string;
  group: string;
}

export const JOBS_SEARCH_ENTRIES: JobsSearchEntry[] = [
  { label: "Find Jobs", href: "/jobs", group: "Jobs & Careers" },
  { label: "Candidate Account", href: "/jobs/account", group: "Jobs & Careers" },
  { label: "My Profile", href: "/jobs/account/profile", group: "Jobs & Careers" },
  { label: "My Applications", href: "/jobs/account/applications", group: "Jobs & Careers" },
  { label: "Saved Jobs", href: "/jobs/account/saved", group: "Jobs & Careers" },
  { label: "Job Alerts", href: "/jobs/account/alerts", group: "Jobs & Careers" },
  { label: "Join Estabizz", href: "/jobs/join", group: "Jobs & Careers" },
  { label: "Hire Talent", href: "/jobs/hire-talent", group: "Recruitment" },
];
