import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import { getDocumentStorageConfig } from "@/lib/jobs/documentStorage";
import { RESUME_UPLOAD_EXTENSIONS, RESUME_UPLOAD_MIME_TYPES } from "@/lib/jobs/resumeUpload/types";
import {
  requireCandidateAccountSessionForPage,
  requireCandidateAccountSessionFromRequest,
  type CandidateAccountSession,
} from "@/lib/jobs/candidateIdentity/access";
import type { CandidateCanonicalProfileSnapshot, ProfileProposalRecord } from "./types";
import { PrismaProfileProposalRepository } from "./prismaRepository";
import { buildCandidateProfileReviewState } from "./reviewState";
import type { CandidateProfileReviewState } from "./viewTypes";

export type CandidateProfileSession = CandidateAccountSession;

interface CandidateProfileData {
  candidateId: string;
  profile: CandidateCanonicalProfileSnapshot;
  contacts: Array<{ type: "email" | "phone_mobile"; value: string }>;
  resumeStatus: "none" | "pending" | "processing" | "completed" | "failed" | "ocr_required";
  resume: {
    hasResume: boolean;
    fileName: string | null;
    fileType: string | null;
    fileSizeBytes: number | null;
    uploadedAt: Date | null;
  };
  proposals: ProfileProposalRecord[];
}

export async function requireCandidateProfileSessionFromRequest(
  request: Parameters<typeof requireCandidateAccountSessionFromRequest>[0],
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileSession | null> {
  return requireCandidateAccountSessionFromRequest(request, prisma);
}

export async function requireCandidateProfileSessionForPage(
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileSession | null> {
  return requireCandidateAccountSessionForPage(prisma);
}

export async function loadCandidateProfileReviewState(
  session: CandidateProfileSession,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileReviewState> {
  const data = await loadCandidateProfileData(session.candidateId, prisma);
  return buildCandidateProfileReviewState({
    resumeStatus: data.resumeStatus,
    resume: data.resume,
    resumeUploadPolicy: {
      maxUploadBytes: getDocumentStorageConfig().maxUploadBytes,
      allowedExtensions: [...RESUME_UPLOAD_EXTENSIONS],
      allowedMimeTypes: [...RESUME_UPLOAD_MIME_TYPES],
    },
    proposals: data.proposals,
    canonicalProfile: data.profile,
    contacts: data.contacts,
  });
}

function deriveProfileResumeStatus(
  rawStatus: string | null,
  errorDetail: string | null,
): CandidateProfileData["resumeStatus"] {
  if (!rawStatus) return "none";
  if (rawStatus === "failed" && errorDetail && errorDetail.toLowerCase().includes("ocr_required")) {
    return "ocr_required";
  }

  if (
    rawStatus === "pending" ||
    rawStatus === "processing" ||
    rawStatus === "completed" ||
    rawStatus === "failed"
  ) {
    return rawStatus;
  }

  return "none";
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
      resume: {
        hasResume: false,
        fileName: null,
        fileType: null,
        fileSizeBytes: null,
        uploadedAt: null,
      },
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
          file_name_original: true,
          file_type: true,
          file_size_bytes: true,
          created_at: true,
          ai_processing_run: {
            select: { error_detail: true },
          },
        },
      },
      resume_versions: {
        where: {
          deleted_at: null,
        },
        select: {
          parse_status: true,
          file_name_original: true,
          file_type: true,
          file_size_bytes: true,
          created_at: true,
          ai_processing_run: {
            select: { error_detail: true },
          },
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
      resume: {
        hasResume: false,
        fileName: null,
        fileType: null,
        fileSizeBytes: null,
        uploadedAt: null,
      },
      proposals: [],
    };
  }

  const repository = new PrismaProfileProposalRepository(prisma);
  const proposals = await repository.listProposalsForCandidate(candidate.id);
  const currentResumeRaw = candidate.current_resume?.deleted_at ? undefined : candidate.current_resume;
  const fallbackResume = candidate.resume_versions[0];
  const resume = currentResumeRaw ?? fallbackResume;
  const rawStatus = currentResumeRaw?.parse_status ?? fallbackResume?.parse_status ?? null;
  const errorDetail = currentResumeRaw
    ? currentResumeRaw.ai_processing_run?.error_detail ?? null
    : fallbackResume?.ai_processing_run?.error_detail ?? null;
  const resumeStatus = deriveProfileResumeStatus(rawStatus, errorDetail);

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
    resumeStatus,
    resume: {
      hasResume: Boolean(resume),
      fileName: resume?.file_name_original ?? null,
      fileType: resume?.file_type ?? null,
      fileSizeBytes: resume?.file_size_bytes ?? null,
      uploadedAt: resume?.created_at ?? null,
    },
    proposals,
  };
}
