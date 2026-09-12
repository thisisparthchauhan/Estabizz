import type { Metadata } from "next";
import { listPublicJobs } from "@/lib/jobs/jobManagement/repository";
import PublicJobsClient from "./PublicJobsClient";

export const metadata: Metadata = {
  title: "Estabizz Jobs — Regulated Finance, Fintech & Technology Roles",
  description:
    "Find opportunities across regulated financial services, fintech, technology and growing businesses. Search roles managed by the Estabizz recruitment team, or join our talent network.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await listPublicJobs();
  return <PublicJobsClient jobs={jobs} />;
}
