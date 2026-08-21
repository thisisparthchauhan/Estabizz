import type {
  CandidateProposalEditInput,
  CandidateProposalRejectInput,
  CandidateProposalReviewInput,
  ProfileProposalPersistenceInput,
  ProfileProposalRecord,
} from "./types";

export type CandidateProfileReviewSection =
  | "identity"
  | "contact"
  | "professional"
  | "employment"
  | "education"
  | "skills"
  | "domains"
  | "certifications"
  | "languages"
  | "preferences";

export interface PersistAiProfileProposalsCommand extends ProfileProposalPersistenceInput {}

export interface CandidateProfileProposalListQuery {
  candidateId: string;
  actorCandidateId: string;
  section?: CandidateProfileReviewSection;
}

export interface CandidateProfileProposalListResponse {
  candidateId: string;
  proposals: ProfileProposalRecord[];
  needsReviewCount: number;
}

export interface CandidateConfirmProfileProposalCommand extends CandidateProposalReviewInput {}

export interface CandidateEditProfileProposalCommand extends CandidateProposalEditInput {}

export interface CandidateRejectProfileProposalCommand extends CandidateProposalRejectInput {}

export interface CandidateConfirmProfileSectionCommand {
  candidateId: string;
  actorCandidateId: string;
  section: CandidateProfileReviewSection;
  proposalIds: string[];
  actorRefId?: string;
}
