import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";

export interface RecruitmentDashboardCounts {
  openJobs: number;
  totalCandidates: number;
  totalApplications: number;
  byStage: Array<{ stageName: string; stageSlug: string; colour: string | null; count: number }>;
  overdueTasksCount: number;
  interviewsTodayCount: number;
}

export async function getRecruitmentDashboard(): Promise<RecruitmentDashboardCounts> {
  const prisma = getJobsPrismaClient();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 86400000);

  const [
    openJobs,
    totalCandidates,
    stages,
    overdueTasksCount,
    interviewsTodayCount,
  ] = await Promise.all([
    prisma.job.count({ where: { status: "open", is_public: true, deleted_at: null } }),
    prisma.candidate.count({ where: { deleted_at: null } }),
    prisma.applicationStage.findMany({
      where: { is_active: true },
      select: {
        name: true,
        slug: true,
        colour_hex: true,
        sort_order: true,
        _count: { select: { applications: { where: { deleted_at: null } } } },
      },
      orderBy: { sort_order: "asc" },
    }),
    prisma.task.count({
      where: { status: "open", deleted_at: null, due_at: { lt: startOfToday } },
    }),
    prisma.interview.count({
      where: {
        deleted_at: null,
        status: "scheduled",
        scheduled_at: { gte: startOfToday, lt: endOfToday },
      },
    }),
  ]);

  const totalApplications = stages.reduce((sum, s) => sum + s._count.applications, 0);

  return {
    openJobs,
    totalCandidates,
    totalApplications,
    byStage: stages.map((s) => ({
      stageName: s.name,
      stageSlug: s.slug,
      colour: s.colour_hex,
      count: s._count.applications,
    })),
    overdueTasksCount,
    interviewsTodayCount,
  };
}
