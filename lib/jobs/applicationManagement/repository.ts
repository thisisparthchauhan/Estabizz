import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { ApplicationSource } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApplicationCreateInput {
  jobId: string;
  candidateId: string;
  actorRefId: string;
  coverNote?: string;
}

export interface ApplicationAdminRow {
  id: string;
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string | null;
  currentStageId: string;
  currentStageName: string;
  currentStageSlug: string;
  stageColour: string | null;
  isTerminal: boolean;
  source: ApplicationSource;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationAdminDetail extends ApplicationAdminRow {
  coverNote: string | null;
  stageHistory: Array<{
    id: string;
    previousStageName: string | null;
    newStageName: string;
    changedAt: Date;
    changedByName: string;
  }>;
  allStages: Array<{
    id: string;
    name: string;
    slug: string;
    isTerminal: boolean;
    sortOrder: number;
    colour: string | null;
  }>;
}

export interface ExistingApplicationSummary {
  id: string;
  createdAt: Date;
  stageName: string;
  stageSlug: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function getAppliedStage() {
  const prisma = getJobsPrismaClient();
  return prisma.applicationStage.findFirst({ where: { slug: "applied", is_active: true } });
}

export async function findApplicationByJobAndCandidate(
  jobId: string,
  candidateId: string,
): Promise<ExistingApplicationSummary | null> {
  const prisma = getJobsPrismaClient();
  const app = await prisma.application.findFirst({
    where: { job_id: jobId, candidate_id: candidateId, deleted_at: null },
    select: {
      id: true,
      created_at: true,
      current_stage: { select: { name: true, slug: true } },
    },
  });
  if (!app) return null;
  return {
    id: app.id,
    createdAt: app.created_at,
    stageName: app.current_stage.name,
    stageSlug: app.current_stage.slug,
  };
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createApplication(input: ApplicationCreateInput) {
  const prisma = getJobsPrismaClient();

  const appliedStage = await getAppliedStage();
  if (!appliedStage) {
    throw new Error("Applied stage not found — run migration 20260909000002_seed_application_stages");
  }

  const application = await prisma.application.create({
    data: {
      job_id: input.jobId,
      candidate_id: input.candidateId,
      current_stage_id: appliedStage.id,
      source: "candidate_portal",
      recruiter_notes: input.coverNote ?? null,
      created_by_ref_id: input.actorRefId,
    },
    select: { id: true, created_at: true },
  });

  await prisma.applicationStageHistory.create({
    data: {
      application_id: application.id,
      previous_stage_id: null,
      new_stage_id: appliedStage.id,
      changed_by_ref_id: input.actorRefId,
      changed_at: new Date(),
    },
  });

  return application;
}

// ─── Admin reads ──────────────────────────────────────────────────────────────

export async function listApplicationsForAdmin(): Promise<ApplicationAdminRow[]> {
  const prisma = getJobsPrismaClient();
  const apps = await prisma.application.findMany({
    where: { deleted_at: null },
    select: {
      id: true,
      job_id: true,
      candidate_id: true,
      source: true,
      created_at: true,
      updated_at: true,
      job: { select: { title: true, slug: true } },
      candidate: {
        select: {
          first_name: true,
          last_name: true,
          contacts: {
            where: { contact_type: "email", opt_out: false, is_primary: true },
            select: { value: true },
            take: 1,
          },
        },
      },
      current_stage: {
        select: { id: true, name: true, slug: true, is_terminal: true, colour_hex: true },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return apps.map((app) => ({
    id: app.id,
    jobId: app.job_id,
    jobTitle: app.job.title,
    jobSlug: app.job.slug,
    candidateId: app.candidate_id,
    candidateName:
      [app.candidate.first_name, app.candidate.last_name].filter(Boolean).join(" ") || "Unknown",
    candidateEmail: app.candidate.contacts[0]?.value ?? null,
    currentStageId: app.current_stage.id,
    currentStageName: app.current_stage.name,
    currentStageSlug: app.current_stage.slug,
    stageColour: app.current_stage.colour_hex,
    isTerminal: app.current_stage.is_terminal,
    source: app.source,
    createdAt: app.created_at,
    updatedAt: app.updated_at,
  }));
}

export async function getApplicationForAdmin(id: string): Promise<ApplicationAdminDetail | null> {
  const prisma = getJobsPrismaClient();

  const [app, stages] = await Promise.all([
    prisma.application.findFirst({
      where: { id, deleted_at: null },
      select: {
        id: true,
        job_id: true,
        candidate_id: true,
        source: true,
        recruiter_notes: true,
        created_at: true,
        updated_at: true,
        job: { select: { title: true, slug: true } },
        candidate: {
          select: {
            first_name: true,
            last_name: true,
            contacts: {
              where: { contact_type: "email", opt_out: false, is_primary: true },
              select: { value: true },
              take: 1,
            },
          },
        },
        current_stage: {
          select: { id: true, name: true, slug: true, is_terminal: true, colour_hex: true },
        },
        stage_histories: {
          select: {
            id: true,
            changed_at: true,
            previous_stage: { select: { name: true } },
            new_stage: { select: { name: true } },
            changed_by: { select: { display_name_cache: true } },
          },
          orderBy: { changed_at: "asc" },
        },
      },
    }),
    prisma.applicationStage.findMany({
      where: { is_active: true },
      select: { id: true, name: true, slug: true, is_terminal: true, sort_order: true, colour_hex: true },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  if (!app) return null;

  return {
    id: app.id,
    jobId: app.job_id,
    jobTitle: app.job.title,
    jobSlug: app.job.slug,
    candidateId: app.candidate_id,
    candidateName:
      [app.candidate.first_name, app.candidate.last_name].filter(Boolean).join(" ") || "Unknown",
    candidateEmail: app.candidate.contacts[0]?.value ?? null,
    currentStageId: app.current_stage.id,
    currentStageName: app.current_stage.name,
    currentStageSlug: app.current_stage.slug,
    stageColour: app.current_stage.colour_hex,
    isTerminal: app.current_stage.is_terminal,
    source: app.source,
    createdAt: app.created_at,
    updatedAt: app.updated_at,
    coverNote: app.recruiter_notes ?? null,
    stageHistory: app.stage_histories.map((h) => ({
      id: h.id,
      previousStageName: h.previous_stage?.name ?? null,
      newStageName: h.new_stage.name,
      changedAt: h.changed_at,
      changedByName: h.changed_by.display_name_cache ?? "Admin",
    })),
    allStages: stages.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      isTerminal: s.is_terminal,
      sortOrder: s.sort_order,
      colour: s.colour_hex,
    })),
  };
}

// ─── Stage update ─────────────────────────────────────────────────────────────

export async function updateApplicationStage(
  id: string,
  newStageId: string,
  changedByRefId: string,
): Promise<boolean> {
  const prisma = getJobsPrismaClient();

  const app = await prisma.application.findFirst({
    where: { id, deleted_at: null },
    select: { id: true, current_stage_id: true },
  });
  if (!app) return false;

  await prisma.$transaction([
    prisma.application.update({
      where: { id },
      data: { current_stage_id: newStageId },
    }),
    prisma.applicationStageHistory.create({
      data: {
        application_id: id,
        previous_stage_id: app.current_stage_id,
        new_stage_id: newStageId,
        changed_by_ref_id: changedByRefId,
        changed_at: new Date(),
      },
    }),
  ]);

  return true;
}
