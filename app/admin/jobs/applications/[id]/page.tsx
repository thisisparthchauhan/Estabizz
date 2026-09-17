import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApplicationForAdmin } from "@/lib/jobs/applicationManagement/repository";
import { listNotes } from "@/lib/jobs/recruitmentOps/notesRepository";
import { listTasksForEntity } from "@/lib/jobs/recruitmentOps/tasksRepository";
import { listInterviewsForApplication } from "@/lib/jobs/recruitmentOps/interviewsRepository";
import AdminApplicationDetailClient from "./AdminApplicationDetailClient";
import AdminPageContainer from "@/app/admin/_components/AdminPageContainer";

export const metadata: Metadata = {
  title: "Application Detail — Estabizz Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const [application, notes, tasks, interviews] = await Promise.all([
    getApplicationForAdmin(id),
    listNotes("application", id),
    listTasksForEntity("application", id),
    listInterviewsForApplication(id),
  ]);
  if (!application) notFound();

  return (
    <AdminPageContainer>
      <AdminApplicationDetailClient application={application} notes={notes} tasks={tasks} interviews={interviews} />
    </AdminPageContainer>
  );
}
