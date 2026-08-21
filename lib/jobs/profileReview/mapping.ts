import type {
  ProposedCertificationItem,
  ProposedEducationItem,
  ProposedEmploymentHistoryItem,
  ProposedExtractedField,
  ProposedResumeStructuredExtraction,
  ProposedSkillItem,
  RegulatoryFinancialDomain,
} from "../resumeParsing/structuredExtraction";

import type {
  ProfileProposalCategory,
  ProfileProposalEnvelope,
  ProfileProposalPersistenceInput,
  ProfileProposalProvenance,
} from "./types";

interface PendingProposalValue {
  fieldPath: string;
  category: ProfileProposalCategory;
  value: unknown;
  confidence: number | null;
  provenance: ProfileProposalProvenance[];
}

export function buildProfileProposalEnvelopes(
  input: ProfileProposalPersistenceInput,
): ProfileProposalEnvelope[] {
  return flattenStructuredExtraction(input.extraction).map((proposal) => ({
    schemaVersion: 1,
    fieldPath: proposal.fieldPath,
    category: proposal.category,
    originalValue: proposal.value,
    currentValue: proposal.value,
    confidence: proposal.confidence,
    provenance: proposal.provenance.map((item) => ({
      ...item,
      resumeVersionId: input.resumeVersionId,
      aiProcessingRunId: input.aiProcessingRunId,
    })),
    reviewStatus: "ai_proposed",
    provider: input.provider,
    model: input.model,
    modelVersion: input.modelVersion,
    extractionTimestamp: input.extractionTimestamp.toISOString(),
    candidateId: input.candidateId,
    resumeVersionId: input.resumeVersionId,
    aiProcessingRunId: input.aiProcessingRunId,
  }));
}

export function flattenStructuredExtraction(
  extraction: ProposedResumeStructuredExtraction,
): PendingProposalValue[] {
  const proposals: PendingProposalValue[] = [];

  pushField(proposals, "identity.candidateName", "identity", extraction.identity.candidateName);
  pushField(proposals, "contact.email", "contact", extraction.contact.email);
  pushField(proposals, "contact.mobile", "contact", extraction.contact.mobile);
  pushField(proposals, "contact.location", "contact", extraction.contact.location);
  pushField(
    proposals,
    "professional.currentDesignation",
    "professional",
    extraction.professional.currentDesignation,
  );
  pushField(
    proposals,
    "professional.currentEmployer",
    "professional",
    extraction.professional.currentEmployer,
  );
  pushField(
    proposals,
    "professional.totalExperienceYears",
    "professional",
    extraction.professional.totalExperienceYears,
  );

  extraction.professional.employmentHistory.forEach((item) => {
    pushComposite(proposals, "professional.employmentHistory", "employment", item, employmentValue);
  });
  extraction.education.forEach((item) => {
    pushComposite(proposals, "education", "education", item, educationValue);
  });
  extraction.skills.skills.forEach((item) => pushSkill(proposals, "skills.skills", item));
  extraction.skills.tools.forEach((item) => pushSkill(proposals, "skills.tools", item));
  extraction.skills.technologies.forEach((item) => pushSkill(proposals, "skills.technologies", item));

  for (const [domain, field] of Object.entries(extraction.regulatoryFinancialDomain) as Array<
    [RegulatoryFinancialDomain, ProposedExtractedField<boolean> | undefined]
  >) {
    if (field?.value === true) {
      pushField(proposals, `regulatoryFinancialDomain.${domain}`, "domain", field);
    }
  }

  extraction.other.certifications.forEach((item) => {
    pushComposite(proposals, "other.certifications", "certification", item, certificationValue);
  });
  extraction.other.languages.forEach((field) => {
    pushField(proposals, `other.languages.${slugify(String(field.value ?? ""))}`, "language", field);
  });
  pushField(proposals, "other.noticePeriod", "preference", extraction.other.noticePeriod);
  pushField(proposals, "other.currentCompensation", "preference", extraction.other.currentCompensation);
  pushField(proposals, "other.expectedCompensation", "preference", extraction.other.expectedCompensation);

  return proposals;
}

function pushField<T>(
  proposals: PendingProposalValue[],
  fieldPath: string,
  category: ProfileProposalCategory,
  field?: ProposedExtractedField<T>,
): void {
  if (!field || field.value === null || field.value === undefined || field.value === "") {
    return;
  }

  proposals.push({
    fieldPath: clampFieldPath(fieldPath),
    category,
    value: field.value,
    confidence: normalizeConfidence(field.confidence),
    provenance: normalizeProvenance(field.provenance),
  });
}

function pushSkill(
  proposals: PendingProposalValue[],
  collectionPath: string,
  item: ProposedSkillItem,
): void {
  const value = skillValue(item);

  if (!value) {
    return;
  }

  proposals.push({
    fieldPath: clampFieldPath(`${collectionPath}.${slugify(String(value.name))}`),
    category: "skill",
    value,
    confidence: normalizeConfidence(item.name.confidence),
    provenance: normalizeProvenance(item.name.provenance),
  });
}

function pushComposite<TItem>(
  proposals: PendingProposalValue[],
  collectionPath: string,
  category: ProfileProposalCategory,
  item: TItem,
  buildValue: (_item: TItem) => { value: Record<string, unknown>; key: string; confidence: number | null; provenance: ProfileProposalProvenance[] } | null,
): void {
  const built = buildValue(item);

  if (!built) {
    return;
  }

  proposals.push({
    fieldPath: clampFieldPath(`${collectionPath}.${slugify(built.key)}`),
    category,
    value: built.value,
    confidence: built.confidence,
    provenance: built.provenance,
  });
}

function employmentValue(item: ProposedEmploymentHistoryItem) {
  const value = compactRecord({
    designation: item.designation?.value,
    employer: item.employer?.value,
    startDate: item.startDate?.value,
    endDate: item.endDate?.value,
    description: item.description?.value,
  });
  const key = [item.employer?.value, item.designation?.value, item.startDate?.value]
    .filter(Boolean)
    .join(" ");

  return buildCompositeValue(value, key, [
    item.employer,
    item.designation,
    item.startDate,
    item.endDate,
    item.description,
  ]);
}

function educationValue(item: ProposedEducationItem) {
  const value = compactRecord({
    qualification: item.qualification?.value,
    institution: item.institution?.value,
    year: item.year?.value,
  });
  const key = [item.qualification?.value, item.institution?.value, item.year?.value]
    .filter(Boolean)
    .join(" ");

  return buildCompositeValue(value, key, [item.qualification, item.institution, item.year]);
}

function certificationValue(item: ProposedCertificationItem) {
  const value = compactRecord({
    name: item.name?.value,
    issuer: item.issuer?.value,
    year: item.year?.value,
  });
  const key = [item.name?.value, item.issuer?.value, item.year?.value].filter(Boolean).join(" ");

  return buildCompositeValue(value, key, [item.name, item.issuer, item.year]);
}

function skillValue(item: ProposedSkillItem): Record<string, unknown> | null {
  if (!item.name?.value) {
    return null;
  }

  return compactRecord({
    name: item.name.value,
    category: item.category?.value,
  });
}

function buildCompositeValue(
  value: Record<string, unknown>,
  key: string,
  fields: Array<ProposedExtractedField<unknown> | undefined>,
) {
  if (Object.keys(value).length === 0 || !key) {
    return null;
  }

  const presentFields = fields.filter(Boolean) as ProposedExtractedField<unknown>[];
  return {
    value,
    key,
    confidence: averageConfidence(presentFields),
    provenance: presentFields.flatMap((field) => normalizeProvenance(field.provenance)),
  };
}

function compactRecord(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== null && item !== undefined && item !== ""),
  );
}

function normalizeConfidence(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : null;
}

function averageConfidence(fields: Array<ProposedExtractedField<unknown>>): number | null {
  const values = fields
    .map((field) => normalizeConfidence(field.confidence))
    .filter((value): value is number => value !== null);

  if (values.length === 0) {
    return null;
  }

  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(3));
}

function normalizeProvenance(
  value: ProposedExtractedField<unknown>["provenance"] | undefined,
): ProfileProposalProvenance[] {
  return (value ?? []).map((item) => ({
    sourceKind: item.sourceKind,
    resumeVersionId: item.resumeVersionId,
    aiProcessingRunId: item.aiProcessingRunId,
    pageNumber: item.pageNumber,
    sectionLabel: item.sectionLabel,
    extractionMethod: item.extractionMethod,
  }));
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "item";
}

function clampFieldPath(value: string): string {
  return value.length <= 200 ? value : value.slice(0, 200);
}
