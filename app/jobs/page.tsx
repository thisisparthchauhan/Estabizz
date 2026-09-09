import type { Metadata } from "next";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";
import PublicJobsClient from "./PublicJobsClient";

export const metadata: Metadata = {
  title: "Jobs — Careers at Estabizz Fintech",
  description:
    "Explore open positions at Estabizz Fintech. We are hiring regulatory advisors, compliance strategists, legal researchers and operations talent.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await listPublicJobs();
  return <PublicJobsClient jobs={jobs} />;
}
