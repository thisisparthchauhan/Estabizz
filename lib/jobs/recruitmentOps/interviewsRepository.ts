import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { InterviewType, InterviewStatus, InterviewFormat } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InterviewRow {
  id: string;
  applicationId: string;
  jobTitle: string;
  candidateName: string;
  interviewType: InterviewType;
  roundNumber: number;
  status: InterviewStatus;
  scheduledAt: Date | null;
  durationMinutes: number | null;
  locationOrLink: string | null;
  format: InterviewFormat | null;
  notes: string | null;
  createdAt: Date;
}

export interface CreateInterviewInput {
  applicationId: string;
  interviewType: InterviewType;
  roundNumber?: number;
  scheduledAt?: Date;
  durationMinutes?: number;
  locationOrLink?: string;
  format?: InterviewFormat;
  notes?: string;
  createdByRefId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INTERVIEW_SELECT = {
  id: true,
  application_id: true,
  interview_type: true,
  round_number: true,
  status: true,
  scheduled_at: true,
  duration_minutes: true,
  location_or_link: true,
  format: true,
  notes: true,
  created_at: true,
  application: {
    select: {
      job: { select: { title: true } },
      candidate: { select: { first_name: true, last_name: true } },
    },
  },
} as const;

function mapInterview(i: {
  id: string;
  application_id: string;
  interview_type: InterviewType;
  round_number: number;
  status: InterviewStatus;
  scheduled_at: Date | null;
  duration_minutes: number | null;
  location_or_link: string | null;
  format: InterviewFormat | null;
  notes: string | null;
  created_at: Date;
  application: {
    job: { title: string };
    candidate: { first_name: string; last_name: string };
  };
}): InterviewRow {
  return {
    id: i.id,
    applicationId: i.application_id,
    jobTitle: i.application.job.title,
    candidateName: [i.application.candidate.first_name, i.application.candidate.last_name]
      .filter(Boolean)
      .join(" "),
    interviewType: i.interview_type,
    roundNumber: i.round_number,
    status: i.status,
    scheduledAt: i.scheduled_at,
    durationMinutes: i.duration_minutes,
    locationOrLink: i.location_or_link,
    format: i.format,
    notes: i.notes,
    createdAt: i.created_at,
  };
}

// ─── Reads ────────────────────────────────────────────────────────────────────

export async function listAllInterviews(): Promise<InterviewRow[]> {
  const prisma = getJobsPrismaClient();
  const interviews = await prisma.interview.findMany({
    where: { deleted_at: null },
    select: INTERVIEW_SELECT,
    orderBy: { scheduled_at: "desc" },
  });
  return interviews.map(mapInterview);
}

export async function listInterviewsForApplication(
  applicationId: string,
): Promise<InterviewRow[]> {
  const prisma = getJobsPrismaClient();
  const interviews = await prisma.interview.findMany({
    where: { application_id: applicationId, deleted_at: null },
    select: INTERVIEW_SELECT,
    orderBy: { scheduled_at: "desc" },
  });
  return interviews.map(mapInterview);
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function createInterview(input: CreateInterviewInput): Promise<InterviewRow> {
  const prisma = getJobsPrismaClient();
  const interview = await prisma.interview.create({
    data: {
      application_id: input.applicationId,
      interview_type: input.interviewType,
      round_number: input.roundNumber ?? 1,
      scheduled_at: input.scheduledAt ?? null,
      duration_minutes: input.durationMinutes ?? null,
      location_or_link: input.locationOrLink ?? null,
      format: input.format ?? null,
      notes: input.notes ?? null,
      created_by_ref_id: input.createdByRefId,
    },
    select: INTERVIEW_SELECT,
  });
  return mapInterview(interview);
}

export async function updateInterview(
  id: string,
  data: {
    status?: InterviewStatus;
    scheduledAt?: Date | null;
    durationMinutes?: number | null;
    locationOrLink?: string | null;
    notes?: string | null;
    format?: InterviewFormat | null;
  },
): Promise<InterviewRow | null> {
  const prisma = getJobsPrismaClient();
  const existing = await prisma.interview.findFirst({
    where: { id, deleted_at: null },
    select: { id: true },
  });
  if (!existing) return null;

  const interview = await prisma.interview.update({
    where: { id },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.scheduledAt !== undefined && { scheduled_at: data.scheduledAt }),
      ...(data.durationMinutes !== undefined && { duration_minutes: data.durationMinutes }),
      ...(data.locationOrLink !== undefined && { location_or_link: data.locationOrLink }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.format !== undefined && { format: data.format }),
    },
    select: INTERVIEW_SELECT,
  });
  return mapInterview(interview);
}
