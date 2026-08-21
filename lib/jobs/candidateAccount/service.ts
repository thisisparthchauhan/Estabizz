import type {
  CandidateAccountApplicationInput,
  CandidateAccountApplicationView,
  CandidateAccountDashboardInput,
  CandidateAccountDashboardViewModel,
  CandidateAccountInterviewInput,
  CandidateAccountInterviewView,
  CandidateAccountProfileInput,
  CandidateFacingApplicationStatus,
  ProfileCompletenessResult,
  ResumeDashboardState,
} from "./types";

const COMPLETENESS_ITEMS: Array<{
  label: string;
  isComplete: (profile: CandidateAccountProfileInput) => boolean;
}> = [
  { label: "Name", isComplete: (profile) => Boolean(profile.firstName || profile.lastName) },
  { label: "Contact information", isComplete: (profile) => Boolean(profile.contacts?.length) },
  { label: "Current role", isComplete: (profile) => Boolean(profile.currentTitle) },
  { label: "Current employer", isComplete: (profile) => Boolean(profile.currentEmployer) },
  { label: "Experience", isComplete: (profile) => typeof profile.yearsOfExperience === "number" },
  { label: "Location", isComplete: (profile) => Boolean(profile.currentCity || profile.currentState) },
  { label: "Employment history", isComplete: (profile) => Number(profile.employmentCount ?? 0) > 0 },
  { label: "Education", isComplete: (profile) => Number(profile.educationCount ?? 0) > 0 },
  { label: "Skills", isComplete: (profile) => Number(profile.skillCount ?? 0) > 0 },
  { label: "Regulatory/domain expertise", isComplete: (profile) => Number(profile.domainCount ?? 0) > 0 },
  { label: "Resume", isComplete: (profile) => profile.hasResume === true },
];

export function buildCandidateAccountDashboardViewModel(
  input: CandidateAccountDashboardInput,
): CandidateAccountDashboardViewModel {
  const profileCompletion = calculateProfileCompleteness(input.candidate);
  const resumeState = buildResumeState(input.resume);
  const applications = input.applications
    .map(toApplicationView)
    .sort((left, right) => Date.parse(right.appliedDate) - Date.parse(left.appliedDate));
  const applicationSummary = summarizeApplications(applications);
  const upcomingInterviews = input.upcomingInterviews
    .filter((interview) => interview.scheduledAt)
    .map(toInterviewView)
    .sort((left, right) => Date.parse(left.scheduledLabel) - Date.parse(right.scheduledLabel))
    .slice(0, 3);

  return {
    candidateName: formatCandidateName(input.candidate),
    profileCompletion,
    resumeState,
    applicationSummary,
    recentApplications: applications.slice(0, 5),
    savedJobsCount: Math.max(0, input.savedJobsCount),
    alertsCount: Math.max(0, input.alertsCount),
    upcomingInterviews,
    nextAction: buildNextAction(profileCompletion, resumeState),
    recommendedJobsEnabled: false,
  };
}

export function calculateProfileCompleteness(
  profile: CandidateAccountProfileInput,
): ProfileCompletenessResult {
  const completed = COMPLETENESS_ITEMS.filter((item) => item.isComplete(profile));
  const missing = COMPLETENESS_ITEMS.filter((item) => !item.isComplete(profile)).map((item) => item.label);
  const percentage = Math.round((completed.length / COMPLETENESS_ITEMS.length) * 100);

  return {
    percentage,
    completedItems: completed.length,
    totalItems: COMPLETENESS_ITEMS.length,
    missingItems: missing,
  };
}

export function getCandidateFacingApplicationStatus(
  input: Pick<CandidateAccountApplicationInput, "stageName" | "stageSlug" | "isTerminal" | "isPositiveTerminal">,
): CandidateFacingApplicationStatus {
  const value = `${input.stageSlug} ${input.stageName}`.toLowerCase();

  if (value.includes("reject") || value.includes("declin") || value.includes("withdraw")) {
    return "rejected";
  }

  if (input.isTerminal && input.isPositiveTerminal) {
    return "selected";
  }

  if (value.includes("offer")) {
    return "offered";
  }

  if (value.includes("interview") || value.includes("screen") || value.includes("round")) {
    return "interview";
  }

  if (input.isTerminal) {
    return "closed";
  }

  return "under_review";
}

function buildResumeState(input: CandidateAccountDashboardInput["resume"]) {
  const state: ResumeDashboardState = getResumeState(input);

  if (state === "no_resume") {
    return {
      state,
      label: "No Resume",
      description: "Upload your resume to create your profile faster.",
      ctaLabel: "Upload Resume",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  if (state === "processing") {
    return {
      state,
      label: "Processing",
      description: "We're preparing your profile from your resume.",
      ctaLabel: "View Profile",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  if (state === "review_required") {
    return {
      state,
      label: "Review Required",
      description: "Review details extracted from your resume before confirming.",
      ctaLabel: "Review Profile",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  if (state === "failed") {
    return {
      state,
      label: "Needs Attention",
      description: "We could not prepare your profile from the current resume.",
      ctaLabel: "Update Resume",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  return {
    state,
    label: state === "profile_ready" ? "Profile Ready" : "Resume Uploaded",
    description: state === "profile_ready" ? "Your profile is ready for job applications." : "Your resume is available.",
    ctaLabel: "Update Resume",
    ctaHref: "/jobs/account/profile" as const,
  };
}

function getResumeState(input: CandidateAccountDashboardInput["resume"]): ResumeDashboardState {
  if (!input.hasResume) return "no_resume";
  if (input.parseStatus === "failed") return "failed";
  if (input.parseStatus === "pending" || input.parseStatus === "processing") return "processing";
  if (input.hasOpenProfileSuggestions) return "review_required";
  if (input.parseStatus === "completed") return "profile_ready";
  return "uploaded";
}

function toApplicationView(input: CandidateAccountApplicationInput): CandidateAccountApplicationView {
  const status = getCandidateFacingApplicationStatus(input);
  const labels: Record<CandidateFacingApplicationStatus, string> = {
    under_review: "Under Review",
    interview: "Interview",
    offered: "Offer Stage",
    selected: "Selected",
    rejected: "Not Selected",
    closed: "Closed",
  };
  const nextSteps: Record<CandidateFacingApplicationStatus, string> = {
    under_review: "Our team is reviewing your application.",
    interview: "Please watch for interview updates.",
    offered: "Offer details will be shared by the Estabizz team.",
    selected: "Our team will contact you with the next steps.",
    rejected: "This application is closed.",
    closed: "This application is closed.",
  };

  return {
    id: input.id,
    jobTitle: input.jobTitle,
    organizationName: input.organizationName || "Confidential organisation",
    appliedDate: toIso(input.appliedAt),
    candidateStatus: status,
    statusLabel: labels[status],
    nextStep: nextSteps[status],
  };
}

function summarizeApplications(applications: CandidateAccountApplicationView[]) {
  return {
    total: applications.length,
    underReview: applications.filter((item) => item.candidateStatus === "under_review").length,
    interview: applications.filter((item) => item.candidateStatus === "interview").length,
    offeredOrSelected: applications.filter(
      (item) => item.candidateStatus === "offered" || item.candidateStatus === "selected",
    ).length,
    rejectedOrClosed: applications.filter(
      (item) => item.candidateStatus === "rejected" || item.candidateStatus === "closed",
    ).length,
  };
}

function toInterviewView(input: CandidateAccountInterviewInput): CandidateAccountInterviewView {
  return {
    id: input.id,
    jobTitle: input.jobTitle,
    organizationName: input.organizationName || "Confidential organisation",
    scheduledLabel: input.scheduledAt ? toIso(input.scheduledAt) : "",
    typeLabel: humanize(input.format || input.interviewType),
    statusLabel: humanize(input.status),
  };
}

function buildNextAction(
  profileCompletion: ProfileCompletenessResult,
  resumeState: ReturnType<typeof buildResumeState>,
) {
  if (resumeState.state === "no_resume") {
    return {
      title: "Upload your resume",
      description: "Start with your resume so Estabizz Jobs can help you complete your profile faster.",
      ctaLabel: "Upload Resume",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  if (resumeState.state === "review_required") {
    return {
      title: "Review details extracted from your resume",
      description: "Confirm or correct your suggested profile details before applying to roles.",
      ctaLabel: "Review Profile",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  if (profileCompletion.percentage < 100) {
    return {
      title: "Complete your profile",
      description: "Add the remaining details to improve your candidate profile quality.",
      ctaLabel: "Complete Profile",
      ctaHref: "/jobs/account/profile" as const,
    };
  }

  return {
    title: "Your profile is ready",
    description: "You can review applications, saved jobs and alerts from your candidate account.",
    ctaLabel: "View Applications",
    ctaHref: "/jobs/account/applications" as const,
  };
}

function formatCandidateName(candidate: CandidateAccountProfileInput): string {
  return [candidate.firstName, candidate.lastName].filter(Boolean).join(" ").trim() || "Candidate";
}

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function humanize(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (item) => item.toUpperCase());
}

