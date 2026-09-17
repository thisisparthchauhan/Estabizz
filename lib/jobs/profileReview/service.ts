import { buildProfileProposalEnvelopes } from "./mapping";
import type {
  CandidateCanonicalPatch,
  CandidateProposalEditInput,
  CandidateProposalRejectInput,
  CandidateProposalReviewInput,
  CandidateProposalReviewResult,
  ProfileProposalEnvelope,
  ProfileProposalPersistenceInput,
  ProfileProposalPersistenceResult,
  ProfileProposalRecord,
  ProfileProposalRepository,
} from "./types";
import {
  ProfileReviewAuthorizationError,
  ProfileReviewNotFoundError,
} from "./types";

export async function persistAiProfileProposals(
  input: ProfileProposalPersistenceInput,
  repository: ProfileProposalRepository,
): Promise<ProfileProposalPersistenceResult> {
  const context = await repository.getCandidateResumeContext(input.candidateId, input.resumeVersionId);

  if (!context) {
    throw new ProfileReviewNotFoundError("Candidate resume context was not found.");
  }

  const envelopes = buildProfileProposalEnvelopes(input);
  const proposals: ProfileProposalRecord[] = [];
  let created = 0;
  let updated = 0;
  let skippedReviewed = 0;
  let superseded = 0;

  for (const envelope of envelopes) {
    const existing = await repository.findProposalByRunField({
      candidateId: input.candidateId,
      resumeVersionId: input.resumeVersionId,
      aiProcessingRunId: input.aiProcessingRunId,
      fieldPath: envelope.fieldPath,
    });

    if (existing && existing.extractedValue.reviewStatus !== "ai_proposed") {
      skippedReviewed += 1;
      proposals.push(existing);
      continue;
    }

    const proposal = existing
      ? await repository.updateProposal(existing.id, {
          extractedValue: envelope,
          confidenceScore: envelope.confidence,
        })
      : await repository.createProposal({
          candidateId: input.candidateId,
          resumeVersionId: input.resumeVersionId,
          aiProcessingRunId: input.aiProcessingRunId,
          fieldPath: envelope.fieldPath,
          extractedValue: envelope,
          confidenceScore: envelope.confidence,
        });

    if (existing) {
      updated += 1;
    } else {
      created += 1;
      await repository.writeAuditEvent({
        candidateId: input.candidateId,
        proposalId: proposal.id,
        action: "ai_profile_proposal_created",
        actorType: "ai_service",
        changedFields: [proposal.fieldPath],
        newValues: safeAuditValue(proposal.extractedValue),
        context: {
          resumeVersionId: input.resumeVersionId,
          aiProcessingRunId: input.aiProcessingRunId,
          provider: input.provider,
          model: input.model,
        },
      });
    }

    const openPrevious = await repository.listOpenProposalsForField({
      candidateId: input.candidateId,
      fieldPath: envelope.fieldPath,
      excludeProposalId: proposal.id,
    });

    for (const previous of openPrevious) {
      await repository.updateProposal(previous.id, {
        supersededById: proposal.id,
        extractedValue: {
          ...previous.extractedValue,
          reviewStatus: "superseded",
        },
      });
      superseded += 1;
      await repository.writeAuditEvent({
        candidateId: input.candidateId,
        proposalId: previous.id,
        action: "ai_profile_proposal_superseded",
        actorType: "ai_service",
        changedFields: [previous.fieldPath],
        context: {
          supersededById: proposal.id,
          resumeVersionId: input.resumeVersionId,
          aiProcessingRunId: input.aiProcessingRunId,
        },
      });
    }

    proposals.push(proposal);
  }

  return {
    created,
    updated,
    skippedReviewed,
    superseded,
    proposals,
  };
}

export async function listCandidateProfileProposals(
  candidateId: string,
  actorCandidateId: string,
  repository: ProfileProposalRepository,
): Promise<ProfileProposalRecord[]> {
  assertCandidateScope(candidateId, actorCandidateId);
  return repository.listProposalsForCandidate(candidateId);
}

export async function confirmCandidateProfileProposal(
  input: CandidateProposalReviewInput,
  repository: ProfileProposalRepository,
): Promise<CandidateProposalReviewResult> {
  const proposal = await getAuthorizedProposal(input.proposalId, input.candidateId, input.actorCandidateId, repository);
  const envelope = markEnvelopeConfirmed(proposal.extractedValue);
  const canonicalPatch = buildCanonicalPatch(envelope);

  if (canonicalPatch) {
    await repository.applyCanonicalPatch(input.candidateId, canonicalPatch);
  }

  const updated = await repository.updateProposal(proposal.id, {
    extractedValue: envelope,
    candidateVerified: true,
    isApplied: Boolean(canonicalPatch),
  });

  await repository.writeAuditEvent({
    candidateId: input.candidateId,
    proposalId: proposal.id,
    action: "candidate_profile_proposal_confirmed",
    actorType: "candidate_user",
    actorRefId: input.actorRefId,
    changedFields: [proposal.fieldPath],
    previousValues: safeAuditValue(proposal.extractedValue),
    newValues: safeAuditValue(envelope),
  });

  return {
    proposal: updated,
    canonicalPatch,
  };
}

export async function editCandidateProfileProposal(
  input: CandidateProposalEditInput,
  repository: ProfileProposalRepository,
): Promise<CandidateProposalReviewResult> {
  const proposal = await getAuthorizedProposal(input.proposalId, input.candidateId, input.actorCandidateId, repository);
  const now = new Date().toISOString();
  const editedEnvelope: ProfileProposalEnvelope = {
    ...proposal.extractedValue,
    currentValue: input.editedValue,
    reviewStatus: input.confirmAfterEdit ? "candidate_confirmed" : "candidate_edited",
    candidateEditedAt: now,
    candidateConfirmedAt: input.confirmAfterEdit ? now : proposal.extractedValue.candidateConfirmedAt,
  };
  const canonicalPatch = input.confirmAfterEdit ? buildCanonicalPatch(editedEnvelope) : null;

  if (canonicalPatch) {
    await repository.applyCanonicalPatch(input.candidateId, canonicalPatch);
  }

  const updated = await repository.updateProposal(proposal.id, {
    extractedValue: editedEnvelope,
    candidateVerified: Boolean(input.confirmAfterEdit),
    isApplied: Boolean(canonicalPatch),
  });

  await repository.writeAuditEvent({
    candidateId: input.candidateId,
    proposalId: proposal.id,
    action: "candidate_profile_proposal_edited",
    actorType: "candidate_user",
    actorRefId: input.actorRefId,
    changedFields: [proposal.fieldPath],
    previousValues: safeAuditValue(proposal.extractedValue),
    newValues: safeAuditValue(editedEnvelope),
  });

  return {
    proposal: updated,
    canonicalPatch,
  };
}

export async function rejectCandidateProfileProposal(
  input: CandidateProposalRejectInput,
  repository: ProfileProposalRepository,
): Promise<CandidateProposalReviewResult> {
  const proposal = await getAuthorizedProposal(input.proposalId, input.candidateId, input.actorCandidateId, repository);
  const rejectedEnvelope: ProfileProposalEnvelope = {
    ...proposal.extractedValue,
    reviewStatus: "candidate_rejected",
    candidateRejectedAt: new Date().toISOString(),
    rejectionReason: input.reason ? sanitizeReviewNote(input.reason) : undefined,
  };
  const updated = await repository.updateProposal(proposal.id, {
    extractedValue: rejectedEnvelope,
    candidateVerified: false,
    isApplied: false,
  });

  await repository.writeAuditEvent({
    candidateId: input.candidateId,
    proposalId: proposal.id,
    action: "candidate_profile_proposal_rejected",
    actorType: "candidate_user",
    actorRefId: input.actorRefId,
    changedFields: [proposal.fieldPath],
    previousValues: safeAuditValue(proposal.extractedValue),
    newValues: safeAuditValue(rejectedEnvelope),
  });

  return {
    proposal: updated,
    canonicalPatch: null,
  };
}

async function getAuthorizedProposal(
  proposalId: string,
  candidateId: string,
  actorCandidateId: string,
  repository: ProfileProposalRepository,
): Promise<ProfileProposalRecord> {
  assertCandidateScope(candidateId, actorCandidateId);
  const proposal = await repository.getProposalById(proposalId);

  if (!proposal || proposal.candidateId !== candidateId) {
    throw new ProfileReviewAuthorizationError();
  }

  return proposal;
}

function assertCandidateScope(candidateId: string, actorCandidateId: string): void {
  if (candidateId !== actorCandidateId) {
    throw new ProfileReviewAuthorizationError();
  }
}

function markEnvelopeConfirmed(envelope: ProfileProposalEnvelope): ProfileProposalEnvelope {
  return {
    ...envelope,
    reviewStatus: "candidate_confirmed",
    candidateConfirmedAt: new Date().toISOString(),
  };
}

export function buildCanonicalPatch(envelope: ProfileProposalEnvelope): CandidateCanonicalPatch | null {
  const value = envelope.currentValue;

  if (envelope.fieldPath === "identity.candidateName" && typeof value === "string") {
    const { firstName, lastName } = splitFullName(value);
    return { candidate: { firstName, lastName } };
  }

  if (envelope.fieldPath === "contact.email" && typeof value === "string") {
    return { contacts: [{ type: "email", value }] };
  }

  if (envelope.fieldPath === "contact.mobile" && typeof value === "string") {
    return { contacts: [{ type: "phone_mobile", value }] };
  }

  if (envelope.fieldPath === "contact.location" && typeof value === "string") {
    const [city, state] = value.split(",").map((item) => item.trim()).filter(Boolean);
    return { candidate: { currentCity: city || value, currentState: state } };
  }

  if (envelope.fieldPath === "professional.currentDesignation" && typeof value === "string") {
    return { candidate: { currentTitle: value } };
  }

  if (envelope.fieldPath === "professional.currentEmployer" && typeof value === "string") {
    return { candidate: { currentEmployer: value } };
  }

  if (envelope.fieldPath === "professional.totalExperienceYears" && typeof value === "number") {
    return { candidate: { yearsOfExperience: Math.max(0, Math.round(value)) } };
  }

  return null;
}

function splitFullName(value: string): { firstName: string; lastName: string } {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || value.trim(),
    lastName: parts.slice(1).join(" "),
  };
}

function sanitizeReviewNote(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, 500);
}

function safeAuditValue(envelope: ProfileProposalEnvelope): Record<string, unknown> {
  return {
    fieldPath: envelope.fieldPath,
    reviewStatus: envelope.reviewStatus,
    originalValue: envelope.originalValue,
    currentValue: envelope.currentValue,
    confidence: envelope.confidence,
    resumeVersionId: envelope.resumeVersionId,
    aiProcessingRunId: envelope.aiProcessingRunId,
  };
}
