import type { Metadata } from "next";
import { listJobsForAdmin } from "@/lib/jobs/jobManagement/repository";
import AdminJobsClient from "./AdminJobsClient";

export const metadata: Metadata = {
  title: "Jobs — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const jobs = await listJobsForAdmin();
  return <AdminJobsClient initialJobs={jobs} />;
}
