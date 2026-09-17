/**
 * schema.org markup for the /jobs landing page: FAQPage + BreadcrumbList.
 *
 * Built from the SAME JOBS_FAQS array the page renders, never a hand-written
 * copy. Google treats FAQ markup describing questions the page does not
 * actually show as a structured-data violation, and the only reliable way to
 * keep the two in step is to give them one source.
 *
 * Deliberately NOT emitted here:
 *   - Organization / WebSite. Those describe the site, not this page, and
 *     duplicating them per-route is how conflicting entity graphs happen.
 *   - JobPosting. Individual postings carry their own markup on their own
 *     detail pages (lib/jobs/structuredData/jobPosting.ts). Emitting a
 *     summary ItemList of jobs here would mean re-publishing posting data on
 *     a page that only shows a filtered slice of it.
 */
import { JOBS_FAQS } from "@/lib/jobs/landing/content";

const BASE = "https://www.estabizz.com";

export function buildJobsLandingJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: JOBS_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Jobs", item: `${BASE}/jobs` },
        ],
      },
    ],
  };
}
