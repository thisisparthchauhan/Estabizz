import "server-only";

import type { Metadata } from "next";
import {
  listApplicationsForAdminPaginated,
  listApplicationStages,
} from "@/lib/jobs/applicationManagement/repository";
import AdminApplicationsClient from "./AdminApplicationsClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Applications — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ page?: string; search?: string; stageId?: string }>;

export default async function AdminApplicationsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const search = sp.search ?? "";
  const stageId = sp.stageId ?? "";

  const [result, stages] = await Promise.all([
    listApplicationsForAdminPaginated({ page, pageSize: 25, search, stageId }),
    listApplicationStages(),
  ]);

  return (
    <AdminPageContainer>
      <AdminApplicationsClient
        result={result}
        stages={stages}
        initialSearch={search}
        initialStageId={stageId}
      />
    </AdminPageContainer>
  );
}
