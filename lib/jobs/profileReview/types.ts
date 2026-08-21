import type { ProposedResumeStructuredExtraction } from "../resumeParsing/structuredExtraction";

export type ProfileProposalReviewStatus =
  | "ai_proposed"
  | "candidate_confirmed"
  | "candidate_edited"
  | "candidate_rejected"
  | "superseded";

export type ProfileProposalCategory =
  | "identity"
  | "contact"
  | "professional"
  | "employment"
  | "education"
  | "skill"
  | "domain"
  | "certification"
  | "language"
  | "preference";

export interface ProfileProposalProvenance {
  sourceKind: string;
  resumeVersionId: string;
  aiProcessingRunId: string;
  pageNumber?: number;
  sectionLabel?: string;
  extractionMethod?: string;
}

export interface ProfileProposalEnvelope {
  schemaVersion: 1;
  fieldPath: string;
  category: ProfileProposalCategory;
  originalValue: unknown;
  currentValue: unknown;
  confidence: number | null;
  provenance: ProfileProposalProvenance[];
  reviewStatus: ProfileProposalReviewStatus;
  provider: string;
  model: string;
  modelVersion: string;
  extractionTimestamp: string;
  candidateId: string;
  resumeVersionId: string;
  aiProcessingRunId: string;
  candidateEditedAt?: string;
  candidateConfirmedAt?: string;
  candidateRejectedAt?: string;
  rejectionReason?: string;
}

export interface ProfileProposalRecord {
  id: string;
  candidateId: string;
  resumeVersionId: string;
  aiProcessingRunId: string;
  fieldPath: string;
  extractedValue: ProfileProposalEnvelope;
  confidenceScore: number | null;
  isApplied: boolean;
  candidateVerified: boolean;
  supersededById: string | null;
  createdAt: Date;
}

export interface CandidateResumeContext {
  candidateId: string;
  resumeVersionId: string;
  currentProfile: CandidateCanonicalProfileSnapshot;
}

export interface CandidateCanonicalProfileSnapshot {
  firstName?: string | null;
  lastName?: string | null;
  currentTitle?: string | null;
  currentEmployer?: string | null;
  yearsOfExperience?: number | null;
  currentCity?: string | null;
  currentState?: string | null;
}

export interface CandidateCanonicalPatch {
  candidate?: Partial<CandidateCanonicalProfileSnapshot>;
  contacts?: Array<{
    type: "email" | "phone_mobile";
    value: string;
  }>;
}

export interface ProfileProposalPersistenceInput {
  candidateId: string;
  resumeVersionId: string;
  aiProcessingRunId: string;
  provider: string;
  model: string;
  modelVersion: string;
  extractionTimestamp: Date;
  extraction: ProposedResumeStructuredExtraction;
}

export interface ProfileProposalPersistenceResult {
  created: number;
  updated: number;
  skippedReviewed: number;
  superseded: number;
  proposals: ProfileProposalRecord[];
}

export interface CandidateProposalReviewInput {
  proposalId: string;
  candidateId: string;
  actorCandidateId: string;
  actorRefId?: string;
}

export interface CandidateProposalEditInput extends CandidateProposalReviewInput {
  editedValue: unknown;
  confirmAfterEdit?: boolean;
}

export interface CandidateProposalRejectInput extends CandidateProposalReviewInput {
  reason?: string;
}

export interface CandidateProposalReviewResult {
  proposal: ProfileProposalRecord;
  canonicalPatch: CandidateCanonicalPatch | null;
}

export interface ProfileReviewAuditEvent {
  candidateId: string;
  proposalId?: string;
  action:
    | "ai_profile_proposal_created"
    | "ai_profile_proposal_updated"
    | "ai_profile_proposal_superseded"
    | "candidate_profile_proposal_confirmed"
    | "candidate_profile_proposal_edited"
    | "candidate_profile_proposal_rejected";
  actorRefId?: string;
  actorType: "candidate_user" | "system" | "ai_service";
  changedFields: string[];
  previousValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  context?: Record<string, unknown>;
}

export interface ProfileProposalRepository {
  getCandidateResumeContext(
    _candidateId: string,
    _resumeVersionId: string,
  ): Promise<CandidateResumeContext | null>;
  findProposalByRunField(_params: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
  }): Promise<ProfileProposalRecord | null>;
  createProposal(_input: {
    candidateId: string;
    resumeVersionId: string;
    aiProcessingRunId: string;
    fieldPath: string;
    extractedValue: ProfileProposalEnvelope;
    confidenceScore: number | null;
  }): Promise<ProfileProposalRecord>;
  updateProposal(
    _proposalId: string,
    _patch: Partial<Pick<ProfileProposalRecord, "extractedValue" | "confidenceScore" | "isApplied" | "candidateVerified" | "supersededById">>,
  ): Promise<ProfileProposalRecord>;
  listOpenProposalsForField(_params: {
    candidateId: string;
    fieldPath: string;
    excludeProposalId?: string;
  }): Promise<ProfileProposalRecord[]>;
  getProposalById(_proposalId: string): Promise<ProfileProposalRecord | null>;
  listProposalsForCandidate(_candidateId: string): Promise<ProfileProposalRecord[]>;
  applyCanonicalPatch(_candidateId: string, _patch: CandidateCanonicalPatch): Promise<void>;
  writeAuditEvent(_event: ProfileReviewAuditEvent): Promise<void>;
}

export class ProfileReviewAuthorizationError extends Error {
  constructor() {
    super("Candidate is not authorized to access this profile proposal.");
    this.name = "ProfileReviewAuthorizationError";
  }
}

export class ProfileReviewNotFoundError extends Error {
  constructor(message = "Profile proposal was not found.") {
    super(message);
    this.name = "ProfileReviewNotFoundError";
  }
}
