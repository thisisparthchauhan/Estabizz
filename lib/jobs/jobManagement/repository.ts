import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import { Prisma } from "@prisma/client";
import type { JobStatus, RemotePolicy, JobEmploymentType } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StructuredRequirements {
  responsibilities?: string;
  requirements_text?: string;
  qualification?: string;
  skills_list?: string[];
  regulatory_domain?: string;
}

export interface JobAdminRow {
  id: string;
  job_code: string;
  title: string;
  slug: string;
  department: string | null;
  location_text: string | null;
  status: JobStatus;
  is_public: boolean;
  employment_type: JobEmploymentType | null;
  remote_policy: RemotePolicy | null;
  min_years_experience: number | null;
  max_years_experience: number | null;
  closes_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface JobDetail extends JobAdminRow {
  description: string;
  internal_notes: string | null;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string | null;
  salary_disclosed: boolean;
  published_at: Date | null;
  structured_requirements: StructuredRequirements | null;
  seniority_level: string | null;
  priority: string;
}

export interface CreateJobInput {
  title: string;
  slug: string;
  department?: string;
  location_text?: string;
  description: string;
  status: JobStatus;
  is_public: boolean;
  employment_type?: JobEmploymentType;
  remote_policy?: RemotePolicy;
  min_years_experience?: number;
  max_years_experience?: number;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  salary_disclosed?: boolean;
  closes_at?: string;
  structured_requirements?: StructuredRequirements;
  internal_notes?: string;
  created_by_ref_id: string;
}

export type UpdateJobInput = Omit<CreateJobInput, "created_by_ref_id">;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateJobCode(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `JOB${y}${m}${d}${rand}`;
}

export async function ensureAdminIdentityRef(
  email: string,
  displayName: string
): Promise<string> {
  const prisma = getJobsPrismaClient();
  const ref = await prisma.identityReference.upsert({
    where: {
      external_collection_external_id: {
        external_collection: "admin_users",
        external_id: email,
      },
    },
    update: {
      display_name_cache: displayName,
      email_cache: email,
      is_active_cache: true,
      last_synced_at: new Date(),
    },
    create: {
      external_collection: "admin_users",
      external_id: email,
      identity_type: "admin_user",
      display_name_cache: displayName,
      email_cache: email,
      is_active_cache: true,
    },
    select: { id: true },
  });
  return ref.id;
}

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

export async function listJobsForAdmin(): Promise<JobAdminRow[]> {
  const prisma = getJobsPrismaClient();
  return prisma.job.findMany({
    where: { deleted_at: null },
    select: {
      id: true,
      job_code: true,
      title: true,
      slug: true,
      department: true,
      location_text: true,
      status: true,
      is_public: true,
      employment_type: true,
      remote_policy: true,
      min_years_experience: true,
      max_years_experience: true,
      closes_at: true,
      created_at: true,
      updated_at: true,
    },
    orderBy: { created_at: "desc" },
  });
}

export async function getJobForAdmin(id: string): Promise<JobDetail | null> {
  const prisma = getJobsPrismaClient();
  const job = await prisma.job.findFirst({
    where: { id, deleted_at: null },
  });
  if (!job) return null;

  return {
    id: job.id,
    job_code: job.job_code,
    title: job.title,
    slug: job.slug,
    department: job.department,
    location_text: job.location_text,
    status: job.status,
    is_public: job.is_public,
    employment_type: job.employment_type,
    remote_policy: job.remote_policy,
    min_years_experience: job.min_years_experience,
    max_years_experience: job.max_years_experience,
    salary_min: job.salary_min?.toString() ?? null,
    salary_max: job.salary_max?.toString() ?? null,
    salary_currency: job.salary_currency,
    salary_disclosed: job.salary_disclosed,
    description: job.description,
    internal_notes: job.internal_notes,
    published_at: job.published_at,
    closes_at: job.closes_at,
    structured_requirements: (job.structured_requirements ?? null) as StructuredRequirements | null,
    seniority_level: job.seniority_level,
    priority: job.priority,
    created_at: job.created_at,
    updated_at: job.updated_at,
  };
}

export async function createJob(input: CreateJobInput): Promise<JobDetail> {
  const prisma = getJobsPrismaClient();

  const data: Prisma.JobCreateInput = {
    job_code: generateJobCode(),
    title: input.title,
    slug: input.slug,
    department: input.department ?? null,
    location_text: input.location_text ?? null,
    description: input.description,
    status: input.status,
    is_public: input.is_public,
    employment_type: input.employment_type ?? null,
    remote_policy: input.remote_policy ?? null,
    min_years_experience: input.min_years_experience ?? null,
    max_years_experience: input.max_years_experience ?? null,
    salary_min: input.salary_min != null ? input.salary_min.toString() : null,
    salary_max: input.salary_max != null ? input.salary_max.toString() : null,
    salary_currency: input.salary_currency ?? null,
    salary_disclosed: input.salary_disclosed ?? false,
    closes_at: input.closes_at ? new Date(input.closes_at) : null,
    structured_requirements: input.structured_requirements
      ? (input.structured_requirements as Prisma.InputJsonValue)
      : Prisma.DbNull,
    internal_notes: input.internal_notes ?? null,
    published_at: input.status === "open" && input.is_public ? new Date() : null,
    created_by: { connect: { id: input.created_by_ref_id } },
  };

  const job = await prisma.job.create({ data });

  return getJobForAdmin(job.id) as Promise<JobDetail>;
}

export async function updateJob(id: string, input: UpdateJobInput): Promise<JobDetail | null> {
  const prisma = getJobsPrismaClient();

  const existing = await prisma.job.findFirst({ where: { id, deleted_at: null }, select: { status: true, is_public: true, published_at: true } });
  if (!existing) return null;

  const becomingPublic =
    !existing.published_at &&
    input.status === "open" &&
    input.is_public;

  await prisma.job.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      department: input.department ?? null,
      location_text: input.location_text ?? null,
      description: input.description,
      status: input.status,
      is_public: input.is_public,
      employment_type: input.employment_type ?? null,
      remote_policy: input.remote_policy ?? null,
      min_years_experience: input.min_years_experience ?? null,
      max_years_experience: input.max_years_experience ?? null,
      salary_min: input.salary_min != null ? input.salary_min.toString() : null,
      salary_max: input.salary_max != null ? input.salary_max.toString() : null,
      salary_currency: input.salary_currency ?? null,
      salary_disclosed: input.salary_disclosed ?? false,
      closes_at: input.closes_at ? new Date(input.closes_at) : null,
      structured_requirements: input.structured_requirements
        ? (input.structured_requirements as Prisma.InputJsonValue)
        : Prisma.DbNull,
      internal_notes: input.internal_notes ?? null,
      ...(becomingPublic ? { published_at: new Date() } : {}),
    },
  });

  return getJobForAdmin(id);
}

export async function softDeleteJob(id: string): Promise<boolean> {
  const prisma = getJobsPrismaClient();
  const job = await prisma.job.findFirst({ where: { id, deleted_at: null }, select: { id: true } });
  if (!job) return false;
  await prisma.job.update({ where: { id }, data: { deleted_at: new Date() } });
  return true;
}

// ─── Public listing ───────────────────────────────────────────────────────────

export interface PublicJobListing {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location_text: string | null;
  employment_type: JobEmploymentType | null;
  remote_policy: RemotePolicy | null;
  min_years_experience: number | null;
  max_years_experience: number | null;
  closes_at: Date | null;
  published_at: Date | null;
  // Only the skills list is surfaced to the public listing (for the "search by
  // title, skill, department or location" filter on /jobs) -- narrowed from the
  // full StructuredRequirements shape used on the detail page so a listing
  // response never carries requirements_text / qualification prose per row.
  skills_list: string[];
}

export async function listPublicJobs(): Promise<PublicJobListing[]> {
  const prisma = getJobsPrismaClient();
  const jobs = await prisma.job.findMany({
    where: {
      status: "open",
      is_public: true,
      deleted_at: null,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      department: true,
      location_text: true,
      employment_type: true,
      remote_policy: true,
      min_years_experience: true,
      max_years_experience: true,
      closes_at: true,
      published_at: true,
      structured_requirements: true,
    },
    orderBy: { published_at: "desc" },
  });

  return jobs.map(({ structured_requirements, ...job }) => ({
    ...job,
    skills_list: extractSkillsList(structured_requirements),
  }));
}

function extractSkillsList(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  const skills = (value as { skills_list?: unknown }).skills_list;
  return Array.isArray(skills) ? skills.filter((s): s is string => typeof s === "string") : [];
}

export interface PublicJobDetail {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location_text: string | null;
  employment_type: JobEmploymentType | null;
  remote_policy: RemotePolicy | null;
  min_years_experience: number | null;
  max_years_experience: number | null;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string | null;
  salary_disclosed: boolean;
  description: string;
  closes_at: Date | null;
  published_at: Date | null;
  structured_requirements: StructuredRequirements | null;
}

export async function getPublicJobBySlug(slug: string): Promise<PublicJobDetail | null> {
  const prisma = getJobsPrismaClient();
  const job = await prisma.job.findFirst({
    where: {
      slug,
      status: "open",
      is_public: true,
      deleted_at: null,
    },
  });
  if (!job) return null;

  return {
    id: job.id,
    title: job.title,
    slug: job.slug,
    department: job.department,
    location_text: job.location_text,
    employment_type: job.employment_type,
    remote_policy: job.remote_policy,
    min_years_experience: job.min_years_experience,
    max_years_experience: job.max_years_experience,
    salary_min: job.salary_disclosed ? (job.salary_min?.toString() ?? null) : null,
    salary_max: job.salary_disclosed ? (job.salary_max?.toString() ?? null) : null,
    salary_currency: job.salary_disclosed ? job.salary_currency : null,
    salary_disclosed: job.salary_disclosed,
    description: job.description,
    closes_at: job.closes_at,
    published_at: job.published_at,
    structured_requirements: (job.structured_requirements ?? null) as StructuredRequirements | null,
  };
}
