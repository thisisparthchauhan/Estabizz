import type { ProfileProposalReviewStatus } from "./types";

export type CandidateProfileReviewStatus =
  | "no_resume"
  | "processing"
  | "review"
  | "confirmed"
  | "recovery";

export type CandidateProfileReviewSectionId =
  | "personal"
  | "professional"
  | "employment"
  | "education"
  | "skills"
  | "domains"
  | "certifications"
  | "languages"
  | "additional";

export interface CandidateProfileReviewFieldView {
  id: string;
  proposalId: string;
  fieldPath: string;
  sectionId: CandidateProfileReviewSectionId;
  label: string;
  displayValue: string;
  editableValue: string;
  valueKind: "text" | "number" | "list" | "details";
  reviewStatus: ProfileProposalReviewStatus;
  statusLabel: "AI Suggested" | "Needs Review" | "Confirmed" | "Edited" | "Rejected";
  needsReview: boolean;
  pleaseCheck: boolean;
  canApplyToProfile: boolean;
}

export interface CandidateProfileReviewSectionView {
  id: CandidateProfileReviewSectionId;
  title: string;
  description: string;
  fields: CandidateProfileReviewFieldView[];
  reviewedCount: number;
  totalCount: number;
}

export interface CandidateProfileReviewCanonicalView {
  fullName: string | null;
  email: string | null;
  mobile: string | null;
  location: string | null;
  currentDesignation: string | null;
  currentEmployer: string | null;
  totalExperience: string | null;
}

export interface CandidateProfileReviewState {
  status: CandidateProfileReviewStatus;
  heading: string;
  message: string;
  progress: {
    reviewedCount: number;
    totalCount: number;
    percentage: number;
  };
  sections: CandidateProfileReviewSectionView[];
  confirmedProfile: CandidateProfileReviewCanonicalView;
  canConfirmProfile: boolean;
  showUploadCta: boolean;
  showManualProfileCta: boolean;
  showRetryCta: boolean;
}

