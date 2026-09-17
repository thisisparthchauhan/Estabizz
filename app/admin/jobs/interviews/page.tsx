import "server-only";

import type { Metadata } from "next";
import { listAllInterviewsPaginated } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import AdminInterviewsClient from "./AdminInterviewsClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Interviews — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ page?: string; search?: string; status?: string }>;

export default async function AdminInterviewsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const search = sp.search ?? "";
  const status = sp.status ?? "all";

  const result = await listAllInterviewsPaginated({ page, pageSize: 25, search, status });

  return (
    <AdminPageContainer>
      <AdminInterviewsClient
        result={result}
        initialSearch={search}
        initialStatus={status}
      />
    </AdminPageContainer>
  );
}
