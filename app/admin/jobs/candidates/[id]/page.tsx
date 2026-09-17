import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCandidateForAdmin } from "@/lib/jobs/candidateManagement/repository";
import { listNotes } from "@/lib/jobs/recruitmentOps/notesRepository";
import { listTasksForEntity } from "@/lib/jobs/recruitmentOps/tasksRepository";
import AdminCandidateDetailClient from "./AdminCandidateDetailClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = await getCandidateForAdmin(id);
  if (!c) return { title: "Candidate — Estabizz Admin" };
  return {
    title: `${c.firstName} ${c.lastName} — Estabizz Admin`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminCandidateDetailPage({ params }: Props) {
  const { id } = await params;

  const [candidate, notes, tasks] = await Promise.all([
    getCandidateForAdmin(id),
    listNotes("candidate", id),
    listTasksForEntity("candidate", id),
  ]);

  if (!candidate) notFound();

  return (
    <AdminPageContainer>
      <AdminCandidateDetailClient candidate={candidate} notes={notes} tasks={tasks} />
    </AdminPageContainer>
  );
}
