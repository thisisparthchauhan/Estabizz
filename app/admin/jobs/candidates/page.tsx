import "server-only";

import type { Metadata } from "next";
import {
  listCandidatesForAdminPaginated,
  listCandidateCities,
} from "@/lib/jobs/candidateManagement/repository";
import AdminCandidatesClient from "./AdminCandidatesClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Candidates — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ page?: string; search?: string; city?: string; expFilter?: string }>;

export default async function AdminCandidatesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const search = sp.search ?? "";
  const city = sp.city ?? "";
  const expFilter = sp.expFilter ?? "";

  const [result, cities] = await Promise.all([
    listCandidatesForAdminPaginated({ page, pageSize: 25, search, city, expFilter }),
    listCandidateCities(),
  ]);

  return (
    <AdminPageContainer>
      <AdminCandidatesClient
        result={result}
        cities={cities}
        initialSearch={search}
        initialCity={city}
        initialExpFilter={expFilter}
      />
    </AdminPageContainer>
  );
}
