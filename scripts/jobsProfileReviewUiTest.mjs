import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-profile-review-ui-"));

try {
  execFileSync(
    "npx",
    [
      "tsc",
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--moduleResolution",
      "node",
      "--esModuleInterop",
      "--skipLibCheck",
      "--outDir",
      outDir,
      "lib/jobs/resumeParsing/structuredExtraction.ts",
      "lib/jobs/profileReview/types.ts",
      "lib/jobs/profileReview/mapping.ts",
      "lib/jobs/profileReview/service.ts",
      "lib/jobs/profileReview/inMemoryRepository.ts",
      "lib/jobs/profileReview/viewTypes.ts",
      "lib/jobs/profileReview/reviewState.ts",
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const service = require(path.join(outDir, "profileReview/service.js"));
  const { InMemoryProfileProposalRepository } = require(
    path.join(outDir, "profileReview/inMemoryRepository.js"),
  );
  const { buildCandidateProfileReviewState } = require(path.join(outDir, "profileReview/reviewState.js"));
  const {
    ProfileReviewAuthorizationError,
  } = require(path.join(outDir, "profileReview/types.js"));

  await runTests(service, InMemoryProfileProposalRepository, buildCandidateProfileReviewState, ProfileReviewAuthorizationError);
  console.log("Jobs candidate profile review UI synthetic tests: PASS");
} finally {
  rmSync(outDir, { force: true, recursive: true });
}

async function runTests(service, InMemoryProfileProposalRepository, buildState, ProfileReviewAuthorizationError) {
  const candidateA = "11111111-1111-4111-8111-111111111111";
  const candidateB = "22222222-2222-4222-8222-222222222222";
  const resumeA1 = "33333333-3333-4333-8333-333333333333";
  const resumeA2 = "44444444-4444-4444-8444-444444444444";
  const resumeB1 = "55555555-5555-4555-8555-555555555555";
  const run1 = "66666666-6666-4666-8666-666666666666";
  const run2 = "77777777-7777-4777-8777-777777777777";
  const sessionLoginEmail = "login-only@example.test";

  const repository = new InMemoryProfileProposalRepository({
    candidates: [
      { candidateId: candidateA, resumeVersionId: resumeA1, profile: { currentEmployer: "Confirmed Employer Ltd" } },
      { candidateId: candidateA, resumeVersionId: resumeA2, profile: { currentEmployer: "Confirmed Employer Ltd" } },
      { candidateId: candidateB, resumeVersionId: resumeB1, profile: {} },
    ],
  });

  const noResume = buildState({ resumeStatus: "none", proposals: [] });
  assert.equal(noResume.status, "no_resume");
  assert.equal(noResume.showUploadCta, true);

  const processing = buildState({ resumeStatus: "processing", proposals: [] });
  assert.equal(processing.status, "processing");

  const failed = buildState({ resumeStatus: "failed", proposals: [] });
  assert.equal(failed.status, "recovery");
  assert.equal(failed.showRetryCta, true);

  await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateA,
      resumeVersionId: resumeA1,
      aiProcessingRunId: run1,
      extraction: syntheticExtraction(),
    }),
    repository,
  );

  let state = buildState({
    resumeStatus: "completed",
    proposals: await repository.listProposalsForCandidate(candidateA),
    canonicalProfile: repository.profiles.get(candidateA),
    contacts: repository.contacts.get(candidateA),
  });

  assert.equal(state.status, "review");
  assert(state.sections.find((section) => section.id === "personal"));
  assert(state.sections.find((section) => section.id === "professional"));
  assert(state.sections.find((section) => section.id === "employment"));
  assert(state.sections.find((section) => section.id === "education"));
  assert(state.sections.find((section) => section.id === "skills"));
  assert(state.sections.find((section) => section.id === "domains"));
  assert(state.sections.find((section) => section.id === "certifications"));
  assert(state.sections.find((section) => section.id === "languages"));
  assert.equal(JSON.stringify(state).includes(resumeA1), false, "resumeVersionId must not be returned to browser state");
  assert.equal(JSON.stringify(state).includes(run1), false, "AIProcessingRun id must not be returned to browser state");
  assert.equal(JSON.stringify(state).includes("providerResponse"), false);
  assert.equal(JSON.stringify(state).includes("rawResumeText"), false);
  assert.equal(JSON.stringify(state).includes("Ignore all previous instructions"), false);

  const employerProposal = repository.proposals.find((proposal) => proposal.fieldPath === "professional.currentEmployer");
  assert(employerProposal);
  await service.confirmCandidateProfileProposal(
    reviewInput(candidateA, employerProposal.id),
    repository,
  );
  assert.equal(repository.profiles.get(candidateA).currentEmployer, "FinNova Services Private Limited");

  const titleProposal = repository.proposals.find((proposal) => proposal.fieldPath === "professional.currentDesignation");
  assert(titleProposal);
  await service.editCandidateProfileProposal(
    {
      ...reviewInput(candidateA, titleProposal.id),
      editedValue: "Senior Compliance Manager",
      confirmAfterEdit: true,
    },
    repository,
  );
  assert.equal(repository.profiles.get(candidateA).currentTitle, "Senior Compliance Manager");

  const educationProposal = repository.proposals.find((proposal) => proposal.fieldPath.startsWith("education."));
  assert(educationProposal);
  await service.rejectCandidateProfileProposal(
    {
      ...reviewInput(candidateA, educationProposal.id),
      reason: "Candidate prefers to complete this later.",
    },
    repository,
  );
  assert.equal((await repository.getProposalById(educationProposal.id)).extractedValue.reviewStatus, "candidate_rejected");

  await confirmSection(service, repository, candidateA, "skills.");
  const skillsState = buildState({
    resumeStatus: "completed",
    proposals: await repository.listProposalsForCandidate(candidateA),
    canonicalProfile: repository.profiles.get(candidateA),
  });
  const skillsSection = skillsState.sections.find((section) => section.id === "skills");
  assert(skillsSection);
  assert.equal(skillsSection.reviewedCount, skillsSection.totalCount);

  const emailProposal = repository.proposals.find((proposal) => proposal.fieldPath === "contact.email");
  assert(emailProposal);
  await service.editCandidateProfileProposal(
    {
      ...reviewInput(candidateA, emailProposal.id),
      editedValue: "aarav.profile@example.test",
      confirmAfterEdit: true,
    },
    repository,
  );
  assert.equal(sessionLoginEmail, "login-only@example.test", "profile contact edits must not mutate login identity");
  assert(repository.contacts.get(candidateA).some((contact) => contact.value === "aarav.profile@example.test"));

  await assert.rejects(
    () => service.listCandidateProfileProposals(candidateA, candidateB, repository),
    ProfileReviewAuthorizationError,
  );

  await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateA,
      resumeVersionId: resumeA2,
      aiProcessingRunId: run2,
      extraction: syntheticExtraction({ currentEmployer: "Conflicting Employer Private Limited" }),
    }),
    repository,
  );
  assert.equal(repository.profiles.get(candidateA).currentEmployer, "FinNova Services Private Limited");
  state = buildState({
    resumeStatus: "completed",
    proposals: await repository.listProposalsForCandidate(candidateA),
    canonicalProfile: repository.profiles.get(candidateA),
  });
  assert(
    state.sections.some((section) =>
      section.fields.some(
        (field) =>
          field.fieldPath === "professional.currentEmployer" &&
          field.displayValue === "Conflicting Employer Private Limited" &&
          field.statusLabel === "AI Suggested",
      ),
    ),
    "conflicting newer proposal should remain visible as a suggestion",
  );

  await confirmAll(service, repository, candidateA);
  state = buildState({
    resumeStatus: "completed",
    proposals: await repository.listProposalsForCandidate(candidateA),
    canonicalProfile: repository.profiles.get(candidateA),
    contacts: repository.contacts.get(candidateA),
  });
  assert.equal(state.status, "confirmed");

  const lowConfidenceRepository = new InMemoryProfileProposalRepository({
    candidates: [{ candidateId: candidateB, resumeVersionId: resumeB1, profile: {} }],
  });
  await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateB,
      resumeVersionId: resumeB1,
      aiProcessingRunId: "99999999-9999-4999-8999-999999999999",
      extraction: syntheticExtraction({ confidence: 0.05 }),
    }),
    lowConfidenceRepository,
  );
  const lowConfidenceState = buildState({
    resumeStatus: "completed",
    proposals: await lowConfidenceRepository.listProposalsForCandidate(candidateB),
  });
  assert.equal(lowConfidenceState.status, "review");
  assert(lowConfidenceState.sections.some((section) => section.fields.some((field) => field.pleaseCheck)));
}

async function confirmSection(service, repository, candidateId, fieldPrefix) {
  const proposals = await repository.listProposalsForCandidate(candidateId);
  for (const proposal of proposals) {
    if (
      proposal.fieldPath.startsWith(fieldPrefix) &&
      (proposal.extractedValue.reviewStatus === "ai_proposed" ||
        proposal.extractedValue.reviewStatus === "candidate_edited")
    ) {
      await service.confirmCandidateProfileProposal(reviewInput(candidateId, proposal.id), repository);
    }
  }
}

async function confirmAll(service, repository, candidateId) {
  const proposals = await repository.listProposalsForCandidate(candidateId);
  for (const proposal of proposals) {
    if (
      proposal.extractedValue.reviewStatus === "ai_proposed" ||
      proposal.extractedValue.reviewStatus === "candidate_edited"
    ) {
      await service.confirmCandidateProfileProposal(reviewInput(candidateId, proposal.id), repository);
    }
  }
}

function reviewInput(candidateId, proposalId) {
  return {
    proposalId,
    candidateId,
    actorCandidateId: candidateId,
    actorRefId: "88888888-8888-4888-8888-888888888888",
  };
}

function persistenceInput({ candidateId, resumeVersionId, aiProcessingRunId, extraction }) {
  return {
    candidateId,
    resumeVersionId,
    aiProcessingRunId,
    provider: "openai",
    model: "gpt-5.6-luna",
    modelVersion: "gpt-5.6-luna",
    extractionTimestamp: new Date("2026-08-21T00:00:00.000Z"),
    extraction,
  };
}

function field(value, confidence = 0.86) {
  return {
    value,
    confidence,
    provenance: [{ sourceKind: "resume", sectionLabel: "Synthetic resume" }],
    reviewStatus: "ai_proposed",
  };
}

function syntheticExtraction({ currentEmployer = "FinNova Services Private Limited", confidence = 0.86 } = {}) {
  return {
    identity: { candidateName: field("Aarav Mehta", confidence) },
    contact: {
      email: field("aarav.profile@example.test", confidence),
      mobile: field("+91 90000 00000", confidence),
      location: field("Mumbai, Maharashtra", confidence),
    },
    professional: {
      currentDesignation: field("Compliance Manager", confidence),
      currentEmployer: field(currentEmployer, confidence),
      totalExperienceYears: field(5, confidence),
      employmentHistory: [
        {
          designation: field("Compliance Manager", confidence),
          employer: field("FinNova Services Private Limited", confidence),
          startDate: field("2023", confidence),
          endDate: null,
          description: field("RBI regulatory reporting, NBFC compliance, KYC/AML and regulatory audits.", confidence),
        },
        {
          designation: field("Compliance Analyst", confidence),
          employer: field("Alpha Credit Solutions Private Limited", confidence),
          startDate: field("2021", confidence),
          endDate: field("2023", confidence),
          description: field("Policy drafting and compliance monitoring.", confidence),
        },
      ],
    },
    education: [
      {
        qualification: field("B.Com", confidence),
        institution: field("Western Commerce University", confidence),
        year: field("2020", confidence),
      },
    ],
    skills: {
      skills: [
        { name: field("Regulatory Compliance", confidence) },
        { name: field("KYC", confidence) },
        { name: field("AML", confidence) },
        { name: field("Risk Management", confidence) },
      ],
      tools: [{ name: field("Excel", confidence) }],
      technologies: [],
    },
    regulatoryFinancialDomain: {
      RBI: field(true, confidence),
      NBFC: field(true, confidence),
      Fintech: field(true, confidence),
      Compliance: field(true, confidence),
      Risk: field(true, confidence),
    },
    other: {
      certifications: [
        {
          name: field("Fictional AML Compliance Certificate", confidence),
          issuer: field("Fictional Institute of Financial Compliance", confidence),
        },
      ],
      languages: [field("English", confidence), field("Hindi", confidence)],
      noticePeriod: null,
      currentCompensation: null,
      expectedCompensation: null,
    },
  };
}
