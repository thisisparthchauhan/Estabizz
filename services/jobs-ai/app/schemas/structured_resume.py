from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

ReviewStatus = Literal[
    "ai_proposed",
    "candidate_confirmed",
    "candidate_edited",
    "candidate_rejected",
    "recruiter_reviewed",
]
SourceKind = Literal[
    "resume_text",
    "resume_metadata",
    "candidate_supplied",
    "recruiter_supplied",
]


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class ResumeStructuredExtractionRequest(StrictModel):
    resumeVersionId: str
    candidateId: str
    correlationId: str
    extractedText: str = Field(min_length=1, max_length=250_000)
    extractionMethod: str | None = None
    pageCount: int | None = Field(default=None, ge=0)


class ResumeFieldProvenance(StrictModel):
    sourceKind: SourceKind = "resume_text"
    resumeVersionId: str
    aiProcessingRunId: str | None = None
    pageNumber: int | None = Field(default=None, ge=1)
    sectionLabel: str | None = Field(default=None, max_length=100)
    extractionMethod: str | None = Field(default=None, max_length=100)
    sourceEvidence: str | None = Field(default=None, max_length=240)


class ExtractedField(StrictModel):
    value: Any | None = None
    confidence: float | None = Field(default=None, ge=0, le=1)
    provenance: list[ResumeFieldProvenance] = Field(default_factory=list)
    reviewStatus: ReviewStatus = "ai_proposed"

    @field_validator("reviewStatus")
    @classmethod
    def prevent_confirmed_provider_output(cls, value: ReviewStatus) -> ReviewStatus:
        if value != "ai_proposed":
            raise ValueError("AI provider output must remain candidate-reviewable proposed data.")
        return value


class EmploymentHistoryItem(StrictModel):
    designation: ExtractedField | None = None
    employer: ExtractedField | None = None
    startDate: ExtractedField | None = None
    endDate: ExtractedField | None = None
    description: ExtractedField | None = None


class EducationItem(StrictModel):
    qualification: ExtractedField | None = None
    institution: ExtractedField | None = None
    year: ExtractedField | None = None


class SkillItem(StrictModel):
    name: ExtractedField
    category: ExtractedField | None = None


class CertificationItem(StrictModel):
    name: ExtractedField
    issuer: ExtractedField | None = None
    year: ExtractedField | None = None


class IdentitySection(StrictModel):
    candidateName: ExtractedField | None = None


class ContactSection(StrictModel):
    email: ExtractedField | None = None
    mobile: ExtractedField | None = None
    location: ExtractedField | None = None


class ProfessionalSection(StrictModel):
    currentDesignation: ExtractedField | None = None
    currentEmployer: ExtractedField | None = None
    totalExperienceYears: ExtractedField | None = None
    employmentHistory: list[EmploymentHistoryItem] = Field(default_factory=list)


class SkillsSection(StrictModel):
    skills: list[SkillItem] = Field(default_factory=list)
    tools: list[SkillItem] = Field(default_factory=list)
    technologies: list[SkillItem] = Field(default_factory=list)


class RegulatoryFinancialDomainSection(StrictModel):
    RBI: ExtractedField | None = None
    SEBI: ExtractedField | None = None
    IRDAI: ExtractedField | None = None
    IFSCA: ExtractedField | None = None
    NBFC: ExtractedField | None = None
    Insurance: ExtractedField | None = None
    Banking: ExtractedField | None = None
    Fintech: ExtractedField | None = None
    CapitalMarkets: ExtractedField | None = None
    Compliance: ExtractedField | None = None
    Risk: ExtractedField | None = None
    Audit: ExtractedField | None = None
    LegalCS: ExtractedField | None = None
    Other: ExtractedField | None = None


class OtherSection(StrictModel):
    certifications: list[CertificationItem] = Field(default_factory=list)
    languages: list[ExtractedField] = Field(default_factory=list)
    noticePeriod: ExtractedField | None = None
    currentCompensation: ExtractedField | None = None
    expectedCompensation: ExtractedField | None = None


class ProposedResumeStructuredExtraction(StrictModel):
    identity: IdentitySection = Field(default_factory=IdentitySection)
    contact: ContactSection = Field(default_factory=ContactSection)
    professional: ProfessionalSection = Field(default_factory=ProfessionalSection)
    education: list[EducationItem] = Field(default_factory=list)
    skills: SkillsSection = Field(default_factory=SkillsSection)
    regulatoryFinancialDomain: RegulatoryFinancialDomainSection = Field(
        default_factory=RegulatoryFinancialDomainSection,
    )
    other: OtherSection = Field(default_factory=OtherSection)


class ProviderUsageMetadata(StrictModel):
    inputTokens: int | None = Field(default=None, ge=0)
    outputTokens: int | None = Field(default=None, ge=0)


StructuredExtractionStatus = Literal[
    "structured_extracted",
    "provider_not_configured",
    "invalid_provider_output",
    "provider_timeout",
    "provider_rate_limited",
    "provider_error",
]


class ResumeStructuredExtractionResponse(StrictModel):
    status: StructuredExtractionStatus
    provider: str | None = None
    model: str | None = None
    data: ProposedResumeStructuredExtraction | None = None
    warnings: list[str] = Field(default_factory=list)
    usage: ProviderUsageMetadata | None = None
