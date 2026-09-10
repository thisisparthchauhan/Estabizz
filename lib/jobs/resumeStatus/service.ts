import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import type { CandidateAccountSession } from "@/lib/jobs/candidateIdentity/types";

import {
  isResumeProcessingInProgress,
  RESUME_STATUS_MESSAGES,
  type CandidateResumeStatusResponse,
  type ResumeProcessingStatus,
} from "./types";

/**
 * Reads the resume processing status for the session's OWN candidate.
 *
 * The candidate id comes from the server-resolved session and is never accepted
 * from the request, so there is no addressable way to ask about someone else's
 * resume. Every query below is additionally scoped by that candidate id.
 */
export async function getCandidateResumeStatus(
  session: CandidateAccountSession,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateResumeStatusResponse> {
  const candidateId = session.candidateId;

  if (!candidateId) {
    return buildResponse("none", 0, null);
  }

  const resume = await prisma.resumeVersion.findFirst({
    where: { candidate_id: candidateId, deleted_at: null },
    orderBy: [{ is_current: "desc" }, { version_number: "desc" }],
    select: {
      id: true,
      parse_status: true,
      file_name_original: true,
      file_type: true,
      file_size_bytes: true,
      created_at: true,
      ai_processing_run: { select: { error_detail: true } },
    },
  });

  if (!resume) {
    return buildResponse("none", 0, null);
  }

  const needsReviewCount = await countProposalsNeedingReview(prisma, candidateId);
  const status = deriveStatus(
    resume.parse_status,
    resume.ai_processing_run?.error_detail ?? null,
    needsReviewCount,
  );

  return buildResponse(status, needsReviewCount, {
    fileName: resume.file_name_original,
    fileType: resume.file_type,
    fileSizeBytes: resume.file_size_bytes,
    uploadedAt: resume.created_at,
  });
}

async function countProposalsNeedingReview(
  prisma: PrismaClient,
  candidateId: string,
): Promise<number> {
  const rows = await prisma.aIExtraction.findMany({
    where: { candidate_id: candidateId, superseded_by_id: null, is_applied: false },
    select: { extracted_value: true },
  });

  return rows.filter((row) => {
    const envelope = row.extracted_value as { reviewStatus?: unknown } | null;
    return envelope?.reviewStatus === "ai_proposed";
  }).length;
}

export function deriveStatus(
  parseStatus: string | null,
  errorDetail: string | null,
  needsReviewCount: number,
): ResumeProcessingStatus {
  if (!parseStatus) {
    return "none";
  }

  if (parseStatus === "failed") {
    // The worker records the extraction status in error_detail; a scanned,
    // image-only PDF is a different message to the candidate than a real
    // failure, and needs a different call to action.
    return errorDetail?.toLowerCase().includes("ocr_required") ? "ocr_required" : "failed";
  }

  if (parseStatus === "completed") {
    return needsReviewCount > 0 ? "needs_review" : "completed";
  }

  if (parseStatus === "pending" || parseStatus === "processing") {
    return parseStatus;
  }

  return "none";
}

function buildResponse(
  status: ResumeProcessingStatus,
  needsReviewCount: number,
  resume: {
    fileName: string;
    fileType: string;
    fileSizeBytes: number;
    uploadedAt: Date;
  } | null,
): CandidateResumeStatusResponse {
  return {
    status,
    inProgress: isResumeProcessingInProgress(status),
    needsReviewCount,
    resume: {
      hasResume: Boolean(resume),
      fileName: resume?.fileName ?? null,
      fileType: resume?.fileType ?? null,
      fileSizeBytes: resume?.fileSizeBytes ?? null,
      uploadedAt: resume?.uploadedAt.toISOString() ?? null,
    },
    message: RESUME_STATUS_MESSAGES[status],
  };
}
