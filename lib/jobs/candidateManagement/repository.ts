import "server-only";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { Prisma } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CandidateAdminRow {
  id: string;
  candidateCode: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  currentCity: string | null;
  currentTitle: string | null;
  currentEmployer: string | null;
  yearsOfExperience: number | null;
  profileCompletenessPct: number;
  applicationCount: number;
  latestStageName: string | null;
  latestStageSlug: string | null;
  createdAt: Date;
}

export interface CandidateAdminDetail {
  id: string;
  candidateCode: string;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  currentTitle: string | null;
  currentEmployer: string | null;
  currentCity: string | null;
  currentState: string | null;
  yearsOfExperience: number | null;
  profileCompletenessPct: number;
  noticePeriodDays: number | null;
  remotePreference: string | null;
  prefCities: string[];
  pref_job_types: string[];
  openToRelocation: boolean | null;
  contacts: Array<{ type: string; value: string; isPrimary: boolean }>;
  employments: Array<{
    id: string;
    employerName: string;
    title: string;
    isCurrent: boolean;
    startDate: Date;
    endDate: Date | null;
  }>;
  educations: Array<{
    id: string;
    institutionName: string;
    degree: string | null;
    fieldOfStudy: string | null;
    endYear: number | null;
  }>;
  skills: Array<{ id: string; skillName: string; proficiency: string | null }>;
  applications: Array<{
    id: string;
    jobTitle: string;
    jobSlug: string;
    stageName: string;
    stageSlug: string;
    stageColour: string | null;
    appliedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listCandidatesForAdmin(): Promise<CandidateAdminRow[]> {
  const prisma = getJobsPrismaClient();

  const candidates = await prisma.candidate.findMany({
    where: { deleted_at: null },
    select: {
      id: true,
      candidate_code: true,
      first_name: true,
      last_name: true,
      current_city: true,
      current_title: true,
      current_employer: true,
      years_of_experience: true,
      profile_completeness_pct: true,
      created_at: true,
      contacts: {
        where: { opt_out: false },
        select: { contact_type: true, value: true, is_primary: true },
        orderBy: [{ is_primary: "desc" }, { created_at: "asc" }],
      },
      applications: {
        where: { deleted_at: null },
        select: {
          id: true,
          current_stage: { select: { name: true, slug: true } },
        },
        orderBy: { created_at: "desc" },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return candidates.map((c) => {
    const email = c.contacts.find((ct) => ct.contact_type === "email")?.value ?? null;
    const phone = c.contacts.find(
      (ct) => ct.contact_type === "phone_mobile" || ct.contact_type === "phone_work",
    )?.value ?? null;
    const latestApp = c.applications[0] ?? null;

    return {
      id: c.id,
      candidateCode: c.candidate_code,
      firstName: c.first_name,
      lastName: c.last_name,
      email,
      phone,
      currentCity: c.current_city,
      currentTitle: c.current_title,
      currentEmployer: c.current_employer,
      yearsOfExperience: c.years_of_experience,
      profileCompletenessPct: c.profile_completeness_pct,
      applicationCount: c.applications.length,
      latestStageName: latestApp?.current_stage.name ?? null,
      latestStageSlug: latestApp?.current_stage.slug ?? null,
      createdAt: c.created_at,
    };
  });
}

// ─── Detail ───────────────────────────────────────────────────────────────────

export async function getCandidateForAdmin(id: string): Promise<CandidateAdminDetail | null> {
  const prisma = getJobsPrismaClient();

  const c = await prisma.candidate.findFirst({
    where: { id, deleted_at: null },
    select: {
      id: true,
      candidate_code: true,
      first_name: true,
      last_name: true,
      preferred_name: true,
      current_title: true,
      current_employer: true,
      current_city: true,
      current_state: true,
      years_of_experience: true,
      profile_completeness_pct: true,
      notice_period_days: true,
      remote_preference: true,
      pref_cities: true,
      pref_job_types: true,
      open_to_relocation: true,
      created_at: true,
      updated_at: true,
      contacts: {
        where: { opt_out: false },
        select: { contact_type: true, value: true, is_primary: true },
        orderBy: [{ is_primary: "desc" }, { created_at: "asc" }],
      },
      employments: {
        select: {
          id: true,
          employer_name: true,
          title: true,
          is_current: true,
          start_date: true,
          end_date: true,
        },
        orderBy: [{ is_current: "desc" }, { start_date: "desc" }],
      },
      educations: {
        select: {
          id: true,
          institution_name: true,
          degree: true,
          field_of_study: true,
          end_year: true,
        },
        orderBy: { end_year: "desc" },
      },
      skills: {
        select: {
          id: true,
          proficiency: true,
          skill: { select: { name: true } },
        },
        orderBy: { is_primary: "desc" },
        take: 30,
      },
      applications: {
        where: { deleted_at: null },
        select: {
          id: true,
          created_at: true,
          job: { select: { title: true, slug: true } },
          current_stage: { select: { name: true, slug: true, colour_hex: true } },
        },
        orderBy: { created_at: "desc" },
      },
    },
  });

  if (!c) return null;

  return {
    id: c.id,
    candidateCode: c.candidate_code,
    firstName: c.first_name,
    lastName: c.last_name,
    preferredName: c.preferred_name,
    currentTitle: c.current_title,
    currentEmployer: c.current_employer,
    currentCity: c.current_city,
    currentState: c.current_state,
    yearsOfExperience: c.years_of_experience,
    profileCompletenessPct: c.profile_completeness_pct,
    noticePeriodDays: c.notice_period_days,
    remotePreference: c.remote_preference,
    prefCities: c.pref_cities,
    pref_job_types: c.pref_job_types,
    openToRelocation: c.open_to_relocation,
    contacts: c.contacts.map((ct) => ({
      type: ct.contact_type,
      value: ct.value,
      isPrimary: ct.is_primary,
    })),
    employments: c.employments.map((e) => ({
      id: e.id,
      employerName: e.employer_name,
      title: e.title,
      isCurrent: e.is_current,
      startDate: e.start_date,
      endDate: e.end_date,
    })),
    educations: c.educations.map((ed) => ({
      id: ed.id,
      institutionName: ed.institution_name,
      degree: ed.degree,
      fieldOfStudy: ed.field_of_study,
      endYear: ed.end_year,
    })),
    skills: c.skills.map((sk) => ({
      id: sk.id,
      skillName: sk.skill.name,
      proficiency: sk.proficiency,
    })),
    applications: c.applications.map((app) => ({
      id: app.id,
      jobTitle: app.job.title,
      jobSlug: app.job.slug,
      stageName: app.current_stage.name,
      stageSlug: app.current_stage.slug,
      stageColour: app.current_stage.colour_hex,
      appliedAt: app.created_at,
    })),
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  };
}

// ─── Paginated list ───────────────────────────────────────────────────────────

import type { PaginatedResult } from "@/lib/jobs/applicationManagement/repository";

export async function listCandidateCities(): Promise<string[]> {
  const prisma = getJobsPrismaClient();
  const rows = await prisma.candidate.findMany({
    where: { deleted_at: null, current_city: { not: null } },
    select: { current_city: true },
    distinct: ["current_city"],
    orderBy: { current_city: "asc" },
  });
  return rows.map((r) => r.current_city!).filter(Boolean);
}

function buildExpWhere(expFilter: string): Prisma.CandidateWhereInput {
  if (!expFilter) return {};
  if (expFilter === "10+") return { years_of_experience: { gte: 10 } };
  const [lo, hi] = expFilter.split("-").map(Number);
  return { years_of_experience: { gte: lo, lte: hi } };
}

export async function listCandidatesForAdminPaginated(opts: {
  page?: number;
  pageSize?: number;
  search?: string;
  city?: string;
  expFilter?: string;
}): Promise<PaginatedResult<CandidateAdminRow>> {
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 25));
  const skip = (page - 1) * pageSize;
  const prisma = getJobsPrismaClient();

  const where: Prisma.CandidateWhereInput = {
    deleted_at: null,
    ...(opts.city ? { current_city: opts.city } : {}),
    ...buildExpWhere(opts.expFilter ?? ""),
  };
  if (opts.search?.trim()) {
    const q = opts.search.trim();
    where.OR = [
      { first_name: { contains: q, mode: "insensitive" } },
      { last_name: { contains: q, mode: "insensitive" } },
      {
        contacts: {
          some: { value: { contains: q, mode: "insensitive" }, opt_out: false },
        },
      },
    ];
  }

  const [total, candidates] = await Promise.all([
    prisma.candidate.count({ where }),
    prisma.candidate.findMany({
      where,
      select: {
        id: true,
        candidate_code: true,
        first_name: true,
        last_name: true,
        current_city: true,
        current_title: true,
        current_employer: true,
        years_of_experience: true,
        profile_completeness_pct: true,
        created_at: true,
        contacts: {
          where: { opt_out: false },
          select: { contact_type: true, value: true, is_primary: true },
          orderBy: [{ is_primary: "desc" }, { created_at: "asc" }],
        },
        applications: {
          where: { deleted_at: null },
          select: { id: true, current_stage: { select: { name: true, slug: true } } },
          orderBy: { created_at: "desc" },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  const items: CandidateAdminRow[] = candidates.map((c) => {
    const email = c.contacts.find((ct) => ct.contact_type === "email")?.value ?? null;
    const phone = c.contacts.find(
      (ct) => ct.contact_type === "phone_mobile" || ct.contact_type === "phone_work",
    )?.value ?? null;
    const latestApp = c.applications[0] ?? null;
    return {
      id: c.id,
      candidateCode: c.candidate_code,
      firstName: c.first_name,
      lastName: c.last_name,
      email,
      phone,
      currentCity: c.current_city,
      currentTitle: c.current_title,
      currentEmployer: c.current_employer,
      yearsOfExperience: c.years_of_experience,
      profileCompletenessPct: c.profile_completeness_pct,
      applicationCount: c.applications.length,
      latestStageName: latestApp?.current_stage.name ?? null,
      latestStageSlug: latestApp?.current_stage.slug ?? null,
      createdAt: c.created_at,
    };
  });

  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}
