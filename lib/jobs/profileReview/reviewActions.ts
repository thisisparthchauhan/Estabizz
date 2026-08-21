import "server-only";

import type { PrismaClient } from "@prisma/client";

import { getJobsPrismaClient } from "@/lib/jobs/prisma";
import {
  confirmCandidateProfileProposal,
  editCandidateProfileProposal,
  listCandidateProfileProposals,
  rejectCandidateProfileProposal,
} from "./service";
import { PrismaProfileProposalRepository } from "./prismaRepository";
import type { CandidateProfileSession } from "./candidateAccess";
import { loadCandidateProfileReviewState } from "./candidateAccess";
import type { CandidateProfileReviewSectionId, CandidateProfileReviewState } from "./viewTypes";

export type CandidateProfileReviewActionInput =
  | { action: "accept"; proposalId: string }
  | { action: "edit"; proposalId: string; editedValue: unknown; confirmAfterEdit?: boolean }
  | { action: "reject"; proposalId: string; reason?: string }
  | { action: "confirm_section"; sectionId: CandidateProfileReviewSectionId }
  | { action: "confirm_profile" }
  | { action: "save_progress" };

export interface CandidateProfileReviewActionResult {
  ok: true;
  state: CandidateProfileReviewState;
}

const SECTION_FIELD_PREFIXES: Record<CandidateProfileReviewSectionId, string[]> = {
  personal: ["identity.", "contact."],
  professional: ["professional."],
  employment: ["employment."],
  education: ["education."],
  skills: ["skills.", "skill."],
  domains: ["domains.", "domain."],
  certifications: ["certifications.", "certification."],
  languages: ["languages.", "language."],
  additional: ["preferences.", "preference."],
};

export async function runCandidateProfileReviewAction(
  session: CandidateProfileSession,
  input: CandidateProfileReviewActionInput,
  prisma: PrismaClient = getJobsPrismaClient(),
): Promise<CandidateProfileReviewActionResult> {
  if (!session.candidateId) {
    throw new Error("Candidate profile was not found.");
  }

  const repository = new PrismaProfileProposalRepository(prisma);

  if (input.action === "accept") {
    await confirmCandidateProfileProposal(
      {
        candidateId: session.candidateId,
        actorCandidateId: session.candidateId,
        actorRefId: session.actorRefId,
        proposalId: input.proposalId,
      },
      repository,
    );
  }

  if (input.action === "edit") {
    await editCandidateProfileProposal(
      {
        candidateId: session.candidateId,
        actorCandidateId: session.candidateId,
        actorRefId: session.actorRefId,
        proposalId: input.proposalId,
        editedValue: sanitizeEditedValue(input.editedValue),
        confirmAfterEdit: input.confirmAfterEdit,
      },
      repository,
    );
  }

  if (input.action === "reject") {
    await rejectCandidateProfileProposal(
      {
        candidateId: session.candidateId,
        actorCandidateId: session.candidateId,
        actorRefId: session.actorRefId,
        proposalId: input.proposalId,
        reason: input.reason,
      },
      repository,
    );
  }

  if (input.action === "confirm_section") {
    await confirmOpenProposals(session, repository, input.sectionId);
  }

  if (input.action === "confirm_profile") {
    await confirmOpenProposals(session, repository);
  }

  return {
    ok: true,
    state: await loadCandidateProfileReviewState(session, prisma),
  };
}

async function confirmOpenProposals(
  session: CandidateProfileSession,
  repository: PrismaProfileProposalRepository,
  sectionId?: CandidateProfileReviewSectionId,
): Promise<void> {
  const proposals = await listCandidateProfileProposals(
    session.candidateId,
    session.candidateId,
    repository,
  );
  const prefixes = sectionId ? SECTION_FIELD_PREFIXES[sectionId] : null;

  for (const proposal of proposals) {
    if (proposal.extractedValue.reviewStatus !== "ai_proposed" && proposal.extractedValue.reviewStatus !== "candidate_edited") {
      continue;
    }

    if (prefixes && !prefixes.some((prefix) => proposal.fieldPath.startsWith(prefix))) {
      continue;
    }

    await confirmCandidateProfileProposal(
      {
        candidateId: session.candidateId,
        actorCandidateId: session.candidateId,
        actorRefId: session.actorRefId,
        proposalId: proposal.id,
      },
      repository,
    );
  }
}

export function parseCandidateProfileReviewActionBody(value: unknown): CandidateProfileReviewActionInput {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid request.");
  }

  const body = value as Record<string, unknown>;
  const action = body.action;

  if (action === "accept" && typeof body.proposalId === "string") {
    return { action, proposalId: body.proposalId };
  }

  if (action === "edit" && typeof body.proposalId === "string") {
    return {
      action,
      proposalId: body.proposalId,
      editedValue: body.editedValue,
      confirmAfterEdit: body.confirmAfterEdit === true,
    };
  }

  if (action === "reject" && typeof body.proposalId === "string") {
    return {
      action,
      proposalId: body.proposalId,
      reason: typeof body.reason === "string" ? body.reason : undefined,
    };
  }

  if (action === "confirm_section" && isSectionId(body.sectionId)) {
    return { action, sectionId: body.sectionId };
  }

  if (action === "confirm_profile" || action === "save_progress") {
    return { action };
  }

  throw new Error("Unsupported profile review action.");
}

function sanitizeEditedValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, 2_000);
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return value;
}

function isSectionId(value: unknown): value is CandidateProfileReviewSectionId {
  return (
    value === "personal" ||
    value === "professional" ||
    value === "employment" ||
    value === "education" ||
    value === "skills" ||
    value === "domains" ||
    value === "certifications" ||
    value === "languages" ||
    value === "additional"
  );
}

