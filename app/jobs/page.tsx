import type { Metadata } from "next";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";
import { isJobsDatabaseConfigured } from "@/lib/jobs/launchFlags";
import { JobListingsUnavailable } from "@/components/jobs/JobListingsUnavailable";
import PublicJobsClient from "./PublicJobsClient";

export const metadata: Metadata = {
  title: "Estabizz Jobs — Regulated Finance, Fintech & Technology Roles",
  description:
    "Find opportunities across regulated financial services, fintech, technology and growing businesses. Search roles managed by the Estabizz recruitment team, or join our talent network.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  // Checked before calling listPublicJobs(), not caught after: that function
  // (via getJobsPrismaClient()) throws synchronously when DATABASE_URL is
  // absent, and a genuine future connection failure once it IS configured
  // should still surface as a real error rather than be read as "not launched
  // yet". See lib/jobs/launchFlags.ts.
  if (!isJobsDatabaseConfigured()) {
    return <JobListingsUnavailable />;
  }

  const jobs = await listPublicJobs();
  return <PublicJobsClient jobs={jobs} />;
}
