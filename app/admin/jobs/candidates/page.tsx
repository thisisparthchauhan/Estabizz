import "server-only";
import type { Metadata } from "next";
import { listCandidatesForAdmin } from "@/lib/jobs/candidateManagement/repository";
import AdminCandidatesClient from "./AdminCandidatesClient";

export const metadata: Metadata = {
  title: "Candidates — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCandidatesPage() {
  const candidates = await listCandidatesForAdmin();
  return <AdminCandidatesClient candidates={candidates} />;
}
