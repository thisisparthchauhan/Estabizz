import type { Metadata } from "next";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";
import { isJobsDatabaseConfigured } from "@/lib/jobs/launchFlags";
import { JobListingsUnavailable } from "@/components/jobs/JobListingsUnavailable";
import { buildJobsLandingJsonLd } from "@/lib/jobs/structuredData/jobsLanding";
import { OPENINGS_ANCHOR } from "@/lib/jobs/landing/content";
import {
  JobsByLicence,
  JobsFaqSection,
  JobsFinalCta,
  JobsHero,
  JobsHowItWorks,
  JobsSafetyNotice,
} from "@/components/jobs/landing/JobsLandingSections";
import PublicJobsClient from "./PublicJobsClient";

// /jobs — the public recruitment landing page AND the live job board.
//
// One route rather than a marketing page plus a separate board, because
// splitting them would put the two halves in competition: an SEO landing page
// at /jobs with the actual openings at /jobs/board means the indexed URL is
// the one that cannot show a job, and every taxonomy link on it would leave
// the page. Here every licence-entity chip is /jobs?q=<term>#openings -- it
// scrolls to the board on this same page with the search pre-applied. See
// lib/jobs/landing/content.ts for why those are query links and not ~2,400
// dedicated per-city-per-licence routes.
//
// Six sections, deliberately: hero, board, licence-wise, how-it-works, FAQ,
// CTA. An earlier draft carried eleven -- two-doors, six "why" pillars, a
// sixteen-tile designation grid, a fit-and-proper table and a city accordion
// -- which restated the same three claims at four different densities and
// read as a wall. Everything cut is one `git log` away if it is wanted back.

export const metadata: Metadata = {
  title: "Regulatory Intermediary Recruitment — NBFC, Stock Broker, AIF, Insurance Broker & FME Talent",
  description:
    "Specialised recruitment for RBI, SEBI, IRDAI and IFSCA regulated intermediaries. Estabizz places Directors, Independent Directors and all KMP — CEO, CFO, CTO, CRO, Compliance Officer and Principal Officer — across NBFC, ARC, Microfinance, Payment Aggregator, Stock Broker, AIF, RA, RIA, RTA, Insurance Broker, Corporate Agent, FME and Broker Dealer entities.",
  keywords: [
    "regulatory intermediary recruitment", "NBFC recruitment", "compliance officer hiring",
    "principal officer", "KMP recruitment", "independent director", "GIFT City hiring",
    "FME", "payment aggregator", "RIA", "RTA", "research analyst",
  ],
  alternates: { canonical: "/jobs" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/jobs",
    title: "Regulatory Intermediary Recruitment in India | Estabizz",
    description:
      "The right candidate, placed at the right organisation. Cost-effective, growth-focused recruitment for RBI, SEBI, IRDAI and IFSCA intermediaries.",
  },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ q?: string }>;

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const initialSearch = typeof q === "string" ? q.slice(0, 100) : "";

  // Checked before calling listPublicJobs(), not caught after: that function
  // (via getJobsPrismaClient()) throws synchronously when DATABASE_URL is
  // absent, and a genuine future connection failure once it IS configured
  // should still surface as a real error rather than be read as "not launched
  // yet". See lib/jobs/launchFlags.ts.
  //
  // Unlike /jobs/[slug], a missing database does NOT replace this whole route:
  // everything except the board is static content that is true either way, so
  // only the board slot degrades. See JobListingsUnavailable's "section"
  // variant.
  const databaseReady = isJobsDatabaseConfigured();
  const jobs = databaseReady ? await listPublicJobs() : [];

  return (
    <main className="min-h-screen bg-white pt-[64px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJobsLandingJsonLd()) }}
      />

      <JobsSafetyNotice />
      <JobsHero openCount={databaseReady ? jobs.length : null} />

      <section id={OPENINGS_ANCHOR} className="scroll-mt-24 bg-[#f7fbff] py-24">
        {databaseReady ? (
          // keyed on the search term so a taxonomy link clicked FROM this page
          // actually re-seeds the board. Navigating /jobs?q=A -> /jobs?q=B
          // re-renders the server component but keeps this client component
          // mounted, so its useState(initialSearch) would hold the previous
          // term: the URL would change and the results would not. Remounting
          // also clears the location/department/experience selects and resets
          // to page 1, which is what "search this licence" should do anyway.
          <PublicJobsClient key={initialSearch} jobs={jobs} initialSearch={initialSearch} />
        ) : (
          <JobListingsUnavailable variant="section" />
        )}
      </section>

      <JobsByLicence />
      <JobsHowItWorks />
      <JobsFaqSection />
      <JobsFinalCta />
    </main>
  );
}
