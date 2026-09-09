import "server-only";
import type { Metadata } from "next";
import { listAllInterviews } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import AdminInterviewsClient from "./AdminInterviewsClient";

export const metadata: Metadata = {
  title: "Interviews — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInterviewsPage() {
  const interviews = await listAllInterviews();
  return <AdminInterviewsClient interviews={interviews} />;
}
