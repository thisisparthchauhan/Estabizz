export type CandidateAccountRoute =
  | "/jobs/account"
  | "/jobs/account/profile"
  | "/jobs/account/applications"
  | "/jobs/account/saved"
  | "/jobs/account/alerts";

export type ResumeDashboardState =
  | "no_resume"
  | "uploaded"
  | "processing"
  | "review_required"
  | "profile_ready"
  | "failed";

export type CandidateFacingApplicationStatus =
  | "under_review"
  | "interview"
  | "offered"
  | "selected"
  | "rejected"
  | "closed";

export interface CandidateAccountProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  currentTitle?: string | null;
  currentEmployer?: string | null;
  yearsOfExperience?: number | null;
  currentCity?: string | null;
  currentState?: string | null;
  contacts?: Array<{ type: "email" | "phone_mobile"; value: string }>;
  employmentCount?: number;
  educationCount?: number;
  skillCount?: number;
  domainCount?: number;
  hasResume?: boolean;
  profileReviewProgress?: {
    reviewedCount: number;
    totalCount: number;
  };
}

export interface CandidateAccountApplicationInput {
  id: string;
  jobTitle: string;
  organizationName: string | null;
  appliedAt: Date | string;
  stageName: string;
  stageSlug: string;
  isTerminal?: boolean;
  isPositiveTerminal?: boolean;
}

export interface CandidateAccountInterviewInput {
  id: string;
  jobTitle: string;
  organizationName: string | null;
  scheduledAt: Date | string | null;
  interviewType: string;
  status: string;
  format?: string | null;
}

export interface CandidateAccountDashboardInput {
  candidate: CandidateAccountProfileInput;
  resume: {
    hasResume: boolean;
    parseStatus?: "pending" | "processing" | "completed" | "failed" | null;
    hasOpenProfileSuggestions: boolean;
  };
  applications: CandidateAccountApplicationInput[];
  savedJobsCount: number;
  alertsCount: number;
  upcomingInterviews: CandidateAccountInterviewInput[];
}

export interface ProfileCompletenessResult {
  percentage: number;
  completedItems: number;
  totalItems: number;
  missingItems: string[];
}

export interface CandidateAccountApplicationView {
  id: string;
  jobTitle: string;
  organizationName: string;
  appliedDate: string;
  candidateStatus: CandidateFacingApplicationStatus;
  statusLabel: string;
  nextStep: string;
}

export interface CandidateAccountInterviewView {
  id: string;
  jobTitle: string;
  organizationName: string;
  scheduledLabel: string;
  typeLabel: string;
  statusLabel: string;
}

export interface CandidateAccountDashboardViewModel {
  candidateName: string;
  profileCompletion: ProfileCompletenessResult;
  resumeState: {
    state: ResumeDashboardState;
    label: string;
    description: string;
    ctaLabel: string;
    ctaHref: CandidateAccountRoute;
  };
  applicationSummary: {
    total: number;
    underReview: number;
    interview: number;
    offeredOrSelected: number;
    rejectedOrClosed: number;
  };
  recentApplications: CandidateAccountApplicationView[];
  savedJobsCount: number;
  alertsCount: number;
  upcomingInterviews: CandidateAccountInterviewView[];
  nextAction: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: CandidateAccountRoute;
  };
  recommendedJobsEnabled: false;
}

