import "server-only";
import type { Metadata } from "next";
import { listAllInterviews } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import AdminInterviewsClient from "./AdminInterviewsClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Interviews — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInterviewsPage() {
  const interviews = await listAllInterviews();
  return (
    <AdminPageContainer>
      <AdminInterviewsClient interviews={interviews} />
    </AdminPageContainer>
  );
}
