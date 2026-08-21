import type {
  CandidateProfileReviewCanonicalView,
  CandidateProfileReviewFieldView,
  CandidateProfileReviewSectionId,
  CandidateProfileReviewSectionView,
  CandidateProfileReviewState,
} from "./viewTypes";
import type {
  CandidateCanonicalProfileSnapshot,
  ProfileProposalEnvelope,
  ProfileProposalRecord,
  ProfileProposalReviewStatus,
} from "./types";
import { buildCanonicalPatch } from "./service";

export interface CandidateProfileReviewStateInput {
  resumeStatus: "none" | "pending" | "processing" | "completed" | "failed" | "ocr_required";
  proposals: ProfileProposalRecord[];
  canonicalProfile?: CandidateCanonicalProfileSnapshot;
  contacts?: Array<{ type: "email" | "phone_mobile"; value: string }>;
}

const SECTION_META: Record<CandidateProfileReviewSectionId, { title: string; description: string }> = {
  personal: {
    title: "Personal Details",
    description: "Confirm the basic details extracted from your resume.",
  },
  professional: {
    title: "Professional Summary",
    description: "Review your current role, employer and overall experience.",
  },
  employment: {
    title: "Employment History",
    description: "Check each role before it becomes part of your profile.",
  },
  education: {
    title: "Education",
    description: "Confirm qualifications, institutions and completion years.",
  },
  skills: {
    title: "Skills",
    description: "Review skills, tools and technologies found in your resume.",
  },
  domains: {
    title: "Regulatory & Financial Expertise",
    description: "Confirm domain expertise such as RBI, NBFC, compliance and risk.",
  },
  certifications: {
    title: "Certifications",
    description: "Review certifications before adding them to your profile.",
  },
  languages: {
    title: "Languages",
    description: "Confirm the languages listed in your resume.",
  },
  additional: {
    title: "Additional Career Information",
    description: "Review notice period and compensation details only when present.",
  },
};

const SECTION_ORDER: CandidateProfileReviewSectionId[] = [
  "personal",
  "professional",
  "employment",
  "education",
  "skills",
  "domains",
  "certifications",
  "languages",
  "additional",
];

export function buildCandidateProfileReviewState(
  input: CandidateProfileReviewStateInput,
): CandidateProfileReviewState {
  const fields = input.proposals
    .filter((proposal) => proposal.extractedValue.reviewStatus !== "superseded")
    .map(toFieldView)
    .sort((left, right) => SECTION_ORDER.indexOf(left.sectionId) - SECTION_ORDER.indexOf(right.sectionId));

  const sections = SECTION_ORDER.map((sectionId) => buildSection(sectionId, fields)).filter(
    (section) => section.fields.length > 0,
  );

  const progressFields = fields.filter((field) => field.reviewStatus !== "candidate_rejected");
  const totalCount = progressFields.length;
  const reviewedCount = progressFields.filter((field) => isReviewed(field.reviewStatus)).length;
  const percentage = totalCount ? Math.round((reviewedCount / totalCount) * 100) : 0;
  const confirmedProfile = buildConfirmedProfile(input.canonicalProfile, input.contacts);
  const progress = { reviewedCount, totalCount, percentage };

  if (input.resumeStatus === "none") {
    return {
      status: "no_resume",
      heading: "Upload your resume to create your profile faster.",
      message: "Your candidate profile will be easier to complete once your resume is available.",
      progress,
      sections,
      confirmedProfile,
      canConfirmProfile: false,
      showUploadCta: true,
      showManualProfileCta: true,
      showRetryCta: false,
    };
  }

  if (input.resumeStatus === "pending" || input.resumeStatus === "processing" || (input.resumeStatus === "completed" && fields.length === 0)) {
    return {
      status: "processing",
      heading: "We're preparing your profile.",
      message: "We will show suggested details here once your resume review is ready.",
      progress,
      sections,
      confirmedProfile,
      canConfirmProfile: false,
      showUploadCta: false,
      showManualProfileCta: true,
      showRetryCta: false,
    };
  }

  if (input.resumeStatus === "failed" || input.resumeStatus === "ocr_required") {
    return {
      status: "recovery",
      heading: "We couldn't prepare your profile from this resume.",
      message: "You can upload another CV or complete your profile manually.",
      progress,
      sections,
      confirmedProfile,
      canConfirmProfile: false,
      showUploadCta: true,
      showManualProfileCta: true,
      showRetryCta: true,
    };
  }

  const allReviewed = totalCount > 0 && reviewedCount === totalCount;

  return {
    status: allReviewed ? "confirmed" : "review",
    heading: allReviewed ? "Profile confirmed" : "Review your profile",
    message: allReviewed
      ? "Your confirmed profile is ready. You can still edit details when needed."
      : "We extracted these details from your resume. Please review and correct anything before confirming.",
    progress,
    sections,
    confirmedProfile,
    canConfirmProfile: totalCount > 0 && reviewedCount < totalCount,
    showUploadCta: false,
    showManualProfileCta: false,
    showRetryCta: false,
  };
}

function buildSection(
  sectionId: CandidateProfileReviewSectionId,
  fields: CandidateProfileReviewFieldView[],
): CandidateProfileReviewSectionView {
  const sectionFields = fields.filter((field) => field.sectionId === sectionId);
  const reviewedCount = sectionFields.filter((field) => isReviewed(field.reviewStatus)).length;
  const meta = SECTION_META[sectionId];

  return {
    id: sectionId,
    title: meta.title,
    description: meta.description,
    fields: sectionFields,
    reviewedCount,
    totalCount: sectionFields.length,
  };
}

function toFieldView(proposal: ProfileProposalRecord): CandidateProfileReviewFieldView {
  const envelope = proposal.extractedValue;
  const valueKind = getValueKind(envelope.currentValue);

  return {
    id: proposal.id,
    proposalId: proposal.id,
    fieldPath: proposal.fieldPath,
    sectionId: getSectionId(envelope),
    label: getFieldLabel(proposal.fieldPath),
    displayValue: formatProposalValue(envelope.currentValue),
    editableValue: toEditableValue(envelope.currentValue),
    valueKind,
    reviewStatus: envelope.reviewStatus,
    statusLabel: getStatusLabel(envelope.reviewStatus),
    needsReview: envelope.reviewStatus === "ai_proposed" || envelope.reviewStatus === "candidate_edited",
    pleaseCheck: envelope.reviewStatus === "ai_proposed" && typeof envelope.confidence === "number" && envelope.confidence < 0.75,
    canApplyToProfile: Boolean(buildCanonicalPatch(envelope)),
  };
}

function getSectionId(envelope: ProfileProposalEnvelope): CandidateProfileReviewSectionId {
  if (envelope.category === "identity" || envelope.category === "contact") return "personal";
  if (envelope.category === "professional") return "professional";
  if (envelope.category === "employment") return "employment";
  if (envelope.category === "education") return "education";
  if (envelope.category === "skill") return "skills";
  if (envelope.category === "domain") return "domains";
  if (envelope.category === "certification") return "certifications";
  if (envelope.category === "language") return "languages";
  return "additional";
}

function getFieldLabel(fieldPath: string): string {
  const known: Record<string, string> = {
    "identity.candidateName": "Full name",
    "contact.email": "Email",
    "contact.mobile": "Mobile",
    "contact.location": "Location",
    "professional.currentDesignation": "Current designation",
    "professional.currentEmployer": "Current employer",
    "professional.totalExperienceYears": "Total experience",
    "preferences.noticePeriod": "Notice period",
    "preferences.currentCompensation": "Current compensation",
    "preferences.expectedCompensation": "Expected compensation",
  };

  if (known[fieldPath]) return known[fieldPath];

  const lastSegment = fieldPath.split(".").pop() ?? fieldPath;
  return lastSegment
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, (value) => value.toUpperCase());
}

function getStatusLabel(status: ProfileProposalReviewStatus): CandidateProfileReviewFieldView["statusLabel"] {
  if (status === "candidate_confirmed") return "Confirmed";
  if (status === "candidate_edited") return "Edited";
  if (status === "candidate_rejected") return "Rejected";
  return status === "ai_proposed" ? "AI Suggested" : "Needs Review";
}

function getValueKind(value: unknown): CandidateProfileReviewFieldView["valueKind"] {
  if (Array.isArray(value)) return "list";
  if (typeof value === "number") return "number";
  if (value && typeof value === "object") return "details";
  return "text";
}

function formatProposalValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(1);
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(formatProposalValue).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== null && entryValue !== undefined && entryValue !== "")
      .map(([key, entryValue]) => `${getFieldLabel(key)}: ${formatProposalValue(entryValue)}`)
      .join(" · ");
  }

  return String(value);
}

function toEditableValue(value: unknown): string {
  return formatProposalValue(value);
}

function isReviewed(status: ProfileProposalReviewStatus): boolean {
  return status === "candidate_confirmed" || status === "candidate_rejected";
}

function buildConfirmedProfile(
  profile: CandidateCanonicalProfileSnapshot | undefined,
  contacts: Array<{ type: "email" | "phone_mobile"; value: string }> | undefined,
): CandidateProfileReviewCanonicalView {
  const email = contacts?.find((contact) => contact.type === "email")?.value ?? null;
  const mobile = contacts?.find((contact) => contact.type === "phone_mobile")?.value ?? null;
  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() || null;
  const location = [profile?.currentCity, profile?.currentState].filter(Boolean).join(", ") || null;

  return {
    fullName,
    email,
    mobile,
    location,
    currentDesignation: profile?.currentTitle ?? null,
    currentEmployer: profile?.currentEmployer ?? null,
    totalExperience: typeof profile?.yearsOfExperience === "number" ? `${profile.yearsOfExperience} years` : null,
  };
}
