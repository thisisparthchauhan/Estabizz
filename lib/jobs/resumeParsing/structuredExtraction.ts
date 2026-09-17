export type CandidateReviewStatus =
  | "ai_proposed"
  | "candidate_confirmed"
  | "candidate_edited"
  | "candidate_rejected"
  | "recruiter_reviewed";

export type ExtractionSourceKind =
  | "resume_text"
  | "resume_metadata"
  | "candidate_supplied"
  | "recruiter_supplied";

export interface ResumeFieldProvenance {
  sourceKind: ExtractionSourceKind;
  resumeVersionId: string;
  aiProcessingRunId: string;
  pageNumber?: number;
  sectionLabel?: string;
  extractionMethod?: string;
}

export interface ProposedExtractedField<TValue> {
  value: TValue;
  confidence: number | null;
  provenance: ResumeFieldProvenance[];
  reviewStatus: CandidateReviewStatus;
}

export interface ProposedEmploymentHistoryItem {
  designation?: ProposedExtractedField<string>;
  employer?: ProposedExtractedField<string>;
  startDate?: ProposedExtractedField<string>;
  endDate?: ProposedExtractedField<string>;
  description?: ProposedExtractedField<string>;
}

export interface ProposedEducationItem {
  qualification?: ProposedExtractedField<string>;
  institution?: ProposedExtractedField<string>;
  year?: ProposedExtractedField<string>;
}

export interface ProposedSkillItem {
  name: ProposedExtractedField<string>;
  category?: ProposedExtractedField<string>;
}

export interface ProposedCertificationItem {
  name: ProposedExtractedField<string>;
  issuer?: ProposedExtractedField<string>;
  year?: ProposedExtractedField<string>;
}

export const REGULATORY_FINANCIAL_DOMAINS = [
  "RBI",
  "SEBI",
  "IRDAI",
  "IFSCA",
  "NBFC",
  "Insurance",
  "Banking",
  "Fintech",
  "Capital Markets",
  "Compliance",
  "Risk",
  "Audit",
  "Legal/CS",
  "Other",
] as const;

export type RegulatoryFinancialDomain = (typeof REGULATORY_FINANCIAL_DOMAINS)[number];

export interface ProposedResumeStructuredExtraction {
  identity: {
    candidateName?: ProposedExtractedField<string>;
  };
  contact: {
    email?: ProposedExtractedField<string>;
    mobile?: ProposedExtractedField<string>;
    location?: ProposedExtractedField<string>;
  };
  professional: {
    currentDesignation?: ProposedExtractedField<string>;
    currentEmployer?: ProposedExtractedField<string>;
    totalExperienceYears?: ProposedExtractedField<number>;
    employmentHistory: ProposedEmploymentHistoryItem[];
  };
  education: ProposedEducationItem[];
  skills: {
    skills: ProposedSkillItem[];
    tools: ProposedSkillItem[];
    technologies: ProposedSkillItem[];
  };
  regulatoryFinancialDomain: Partial<
    Record<RegulatoryFinancialDomain, ProposedExtractedField<boolean>>
  >;
  other: {
    certifications: ProposedCertificationItem[];
    languages: ProposedExtractedField<string>[];
    noticePeriod?: ProposedExtractedField<string>;
    currentCompensation?: ProposedExtractedField<string>;
    expectedCompensation?: ProposedExtractedField<string>;
  };
}
