import "server-only";

import type { NextRequest } from "next/server";
import type { PrismaClient } from "@prisma/client";

import { getSessionEmail, getSessionEmailFromRequest } from "@/lib/auth/session";
import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { CandidateCanonicalProfileSnapshot, ProfileProposalRecord } from "./types";
import { PrismaProfileProposalRepository } from "./prismaRepository";
import { buildCandidateProfileReviewState } from "./reviewState";
import type { CandidateProfileReviewState } from "./viewTypes";

export interface CandidateProfileSession {
  candidateId: string;
  actorRefId?: string;
  email: string;
}

interface CandidateProfileData {
  candidateId: string;
  profile: CandidateCanonicalProfileSnapshot;
  contacts: Array<{ type: "email" | "phone_mobile"; value: string }>;
  resumeStatus: "none" | "pending" | "processing" | "completed" | "failed";
  proposals: ProfileProposalRecord[];
}

export async function requireCandidateProfileSessionFromRequest(
  request: NextRequest,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileSession | null> {
  const email = getSessionEmailFromRequest(request);
  if (!email) return null;
  return resolveCandidateProfileSession(email, prisma);
}

export async function requireCandidateProfileSessionForPage(
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileSession | null> {
  const email = await getSessionEmail();
  if (!email) return null;
  return resolveCandidateProfileSession(email, prisma);
}

export async function loadCandidateProfileReviewState(
  session: CandidateProfileSession,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileReviewState> {
  const data = await loadCandidateProfileData(session.candidateId, prisma);
  return buildCandidateProfileReviewState({
    resumeStatus: data.resumeStatus,
    proposals: data.proposals,
    canonicalProfile: data.profile,
    contacts: data.contacts,
  });
}

async function resolveCandidateProfileSession(
  email: string,
  prisma: PrismaClient,
): Promise<CandidateProfileSession> {
  const candidate = await prisma.candidate.findFirst({
    where: {
      deleted_at: null,
      contacts: {
        some: {
          contact_type: "email",
          value: email,
          opt_out: false,
        },
      },
    },
    select: {
      id: true,
      identity_ref_id: true,
    },
  });

  return {
    candidateId: candidate?.id ?? "",
    actorRefId: candidate?.identity_ref_id ?? undefined,
    email,
  };
}

async function loadCandidateProfileData(
  candidateId: string,
  prisma: PrismaClient,
): Promise<CandidateProfileData> {
  if (!candidateId) {
    return {
      candidateId,
      profile: {},
      contacts: [],
      resumeStatus: "none",
      proposals: [],
    };
  }

  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
      deleted_at: null,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      current_title: true,
      current_employer: true,
      years_of_experience: true,
      current_city: true,
      current_state: true,
      contacts: {
        where: {
          contact_type: { in: ["email", "phone_mobile"] },
          opt_out: false,
        },
        select: {
          contact_type: true,
          value: true,
          is_primary: true,
        },
        orderBy: [{ is_primary: "desc" }, { created_at: "asc" }],
      },
      current_resume: {
        select: {
          parse_status: true,
          deleted_at: true,
        },
      },
      resume_versions: {
        where: {
          deleted_at: null,
        },
        select: {
          parse_status: true,
        },
        orderBy: [{ is_current: "desc" }, { version_number: "desc" }],
        take: 1,
      },
    },
  });

  if (!candidate) {
    return {
      candidateId,
      profile: {},
      contacts: [],
      resumeStatus: "none",
      proposals: [],
    };
  }

  const repository = new PrismaProfileProposalRepository(prisma);
  const proposals = await repository.listProposalsForCandidate(candidate.id);
  const currentResumeStatus = candidate.current_resume?.deleted_at
    ? undefined
    : candidate.current_resume?.parse_status;
  const fallbackResumeStatus = candidate.resume_versions[0]?.parse_status;

  return {
    candidateId: candidate.id,
    profile: {
      firstName: candidate.first_name,
      lastName: candidate.last_name,
      currentTitle: candidate.current_title,
      currentEmployer: candidate.current_employer,
      yearsOfExperience: candidate.years_of_experience,
      currentCity: candidate.current_city,
      currentState: candidate.current_state,
    },
    contacts: candidate.contacts
      .filter((contact) => contact.contact_type === "email" || contact.contact_type === "phone_mobile")
      .map((contact) => ({
        type: contact.contact_type === "email" ? "email" : "phone_mobile",
        value: contact.value,
      })),
    resumeStatus: currentResumeStatus ?? fallbackResumeStatus ?? "none",
    proposals,
  };
}
