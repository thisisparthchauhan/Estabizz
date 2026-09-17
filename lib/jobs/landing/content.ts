// ─────────────────────────────────────────────────────────────────────────────
// Static content for the public /jobs landing page.
//
// Kept as plain data (no JSX, no "use client") for the same reason
// lib/jobs/navigation/jobsMenu.ts is: it can be imported by server components
// AND asserted against directly from a plain Node test with tsc + require,
// which is the only test infrastructure this repo has for non-rendered logic.
//
// WHY EVERY TAXONOMY LINK POINTS BACK AT /jobs?q=… RATHER THAN AT ITS OWN PAGE:
// the source design for this page linked licence-wise, designation-wise and
// city-wise taxonomies to ~2,400 dedicated URLs (/jobs/nbfc-jobs-in-surat,
// /jobs/leadership/cfo, /jobs/rbi/account-aggregator …). None of those routes
// exist, and there is no content source that could fill them -- jobs live in
// Postgres and are written by the admin ATS, not by a per-city page. Shipping
// them would mean thousands of soft-404s on an indexed domain and a directory
// where every link is a dead end.
//
// So each entity chip carries a SEARCH TERM run against the live board on this
// same page. The links work, they return real records, and they stay correct
// as the database changes.
// ─────────────────────────────────────────────────────────────────────────────

/** Anchor for the live job board section, so every CTA on the page can jump
 *  to it. Exported rather than hard-coded in four components. */
export const OPENINGS_ANCHOR = "openings";

/**
 * Deep-links a taxonomy term into the live board on this page.
 *
 * The board's free-text search matches title, department, location AND skills
 * (see PublicJobsClient), which is why every chip uses `q` rather than the
 * `location`/`department` selects: those are exact-match dropdowns built from
 * the values actually present in the data, so a term with no current opening
 * would not even be an option and the filter would silently do nothing. A
 * substring search degrades honestly instead -- it shows the "no match" state
 * with a route into the talent network.
 */
export function jobsQueryHref(term: string): string {
  return `/jobs?q=${encodeURIComponent(term)}#${OPENINGS_ANCHOR}`;
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export interface TrustStat {
  value: string;
  label: string;
}

/** Deliberately the SAME figures the homepage hero publishes
 *  (lib/content/heroDefaults.ts trustStats) rather than a second, different
 *  set of client counts. Two conflicting numbers on one domain is a
 *  credibility problem, not a marketing choice. */
export const TRUST_STATS: TrustStat[] = [
  { value: "500+",  label: "Licences obtained" },
  { value: "1000+", label: "Businesses served" },
  { value: "100+",  label: "Associate professionals" },
  { value: "4",     label: "RBI · SEBI · IRDAI · IFSCA" },
];

// ── Licence-wise taxonomy ────────────────────────────────────────────────────

export interface LicenceGroup {
  regulator: string;
  title: string;
  authority: string;
  /** The existing regulatory service page for this authority. Recruitment and
   *  licensing are the same conversation for these clients -- an employer
   *  reading about NBFC hiring is very often the entity still securing the
   *  licence -- so every card offers both doors rather than stranding the
   *  visitor inside /jobs. */
  servicePath: string;
  serviceLabel: string;
  /** Entity types, shown as chips. Each chip's own text is the search term. */
  entities: string[];
}

export const LICENCE_GROUPS: LicenceGroup[] = [
  {
    regulator: "RBI",
    title: "Lending & payments",
    authority: "Reserve Bank of India",
    servicePath: "/rbi",
    serviceLabel: "RBI licensing & compliance",
    entities: [
      "NBFC", "ARC", "Microfinance", "Payment Aggregator", "PPI",
      "Account Aggregator", "Housing Finance", "P2P Lending", "Cross-Border PA",
    ],
  },
  {
    regulator: "SEBI",
    title: "Capital markets",
    authority: "Securities and Exchange Board of India",
    servicePath: "/sebi",
    serviceLabel: "SEBI registrations",
    entities: [
      "Stock Broker", "AIF", "PMS", "RIA", "Research Analyst", "RTA",
      "Merchant Banker", "Depository Participant", "Mutual Fund", "Custodian",
    ],
  },
  {
    regulator: "IRDAI",
    title: "Insurance & risk",
    authority: "Insurance Regulatory & Development Authority",
    servicePath: "/irdai",
    serviceLabel: "IRDAI licensing",
    entities: [
      "Insurance Broker", "Corporate Agent", "Insurance Marketing Firm",
      "Web Aggregator", "Surveyor", "TPA", "Insurance Company",
    ],
  },
  {
    regulator: "IFSCA",
    title: "Global finance · GIFT City",
    authority: "International Financial Services Centres Authority",
    servicePath: "/ifsca",
    serviceLabel: "IFSCA & GIFT City",
    entities: [
      "FME", "Broker Dealer", "IBU", "Finance Company", "Fund Administrator",
      "ITFS", "PSP", "Insurance Intermediary", "Bullion Trading",
    ],
  },
];

// ── How it works ─────────────────────────────────────────────────────────────

export interface ProcessStep {
  title: string;
  body: string;
}

export const EMPLOYER_STEPS: ProcessStep[] = [
  { title: "Share your mandate",           body: "Tell us the licence, the role and the stage — registration or scale. We map it to the regulatory brief." },
  { title: "Receive a screened shortlist", body: "Candidates assessed for qualification, fit-and-proper suitability and growth impact." },
  { title: "Interview with clarity",       body: "We brief you on each candidate's regulatory standing and what they add to the business." },
  { title: "Appoint & file",               body: "Estabizz supports the KMP intimation, Principal Officer or director approval that follows." },
];

export const CANDIDATE_STEPS: ProcessStep[] = [
  { title: "Create your profile", body: "Qualifications, certifications and licence-domain experience in a regulator-friendly format." },
  { title: "Choose your domain",  body: "Select RBI, SEBI, IRDAI or IFSCA entities, designations and preferred cities." },
  { title: "Get matched",         body: "Verified employers view your profile; you apply directly to roles that fit." },
  { title: "Join with clarity",   body: "Understand the regulatory responsibilities of your role before day one." },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────

export interface JobsFaq {
  question: string;
  answer: string;
}

/** Rendered on the page AND emitted as FAQPage structured data, from this one
 *  source -- so the markup can never describe questions the page does not
 *  show, which is exactly what Google penalises. */
export const JOBS_FAQS: JobsFaq[] = [
  {
    question: "Who is this portal for?",
    answer: "For regulated financial intermediaries of every stage — whether you are applying for a fresh registration or scaling an established licence — and for professionals who want to build a career within this domain.",
  },
  {
    question: "How is Estabizz different from a general recruiter?",
    answer: "We are a Company Secretary-led compliance firm first. We understand the regulation, the role and the fit-and-proper expectations, so we place people who strengthen the business, not merely fill a vacancy.",
  },
  {
    question: "Which roles do you place?",
    answer: "Directors, Independent Directors and the full Key Managerial Personnel spectrum — CEO/MD, CFO, CMO, CTO, CRO, Compliance Officer, Principal Officer and Company Secretary — alongside dealing, credit, risk, KYC, collections and operations talent.",
  },
  {
    question: "Do you assess fit-and-proper suitability?",
    answer: "We screen candidates against the qualification, certification, experience and declaration expectations of the applicable RBI, SEBI, IRDAI or IFSCA framework before they reach an employer. The final determination always rests with the employer and the regulator.",
  },
  {
    question: "Is your recruitment support expensive?",
    answer: "No. Because we already know the domain and the talent pool, our solution is deliberately cost-effective — typically lighter than a generic executive search, with a more precise result.",
  },
  {
    question: "Can Estabizz assist with appointment filings after hiring?",
    answer: "Yes. Post-hiring intimations, KMP changes, Principal Officer approvals and related regulatory filings can all be handled under our compliance services.",
  },
  {
    question: "Which cities do you cover?",
    answer: "All states and union territories of India — from Mumbai and GIFT City to Surat, Indore, Kochi and Guwahati. Search the board by city to see what is open in a given location.",
  },
  {
    question: "How do employers and candidates get started?",
    answer: "Employers submit a hiring requirement through the Hire Talent page, or call +91 98256 00907. Candidates join the Estabizz talent network and build a regulator-ready profile so verified intermediaries can discover them.",
  },
];

/** Estabizz is an advisory firm, not a regulator, and recruits FOR regulated
 *  entities rather than for RBI/SEBI/IRDAI/IFSCA themselves. Published on the
 *  page because a jobs page in this domain is a magnet for exactly that
 *  misunderstanding. */
export const JOBS_DISCLAIMER =
  "Estabizz does not provide, advertise or guarantee jobs within any regulator (RBI, SEBI, IRDAI, IFSCA or MCA). We assist regulated intermediary companies in identifying and placing the right candidate. Estabizz Fintech Private Limited is an independent regulatory advisory and compliance support organisation and does not represent any statutory or regulatory authority. Fit-and-proper determinations, appointments and approvals rest solely with the employer and the concerned regulator.";
