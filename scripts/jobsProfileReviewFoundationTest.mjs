import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-profile-review-"));

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
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const service = require(path.join(outDir, "profileReview/service.js"));
  const { InMemoryProfileProposalRepository } = require(
    path.join(outDir, "profileReview/inMemoryRepository.js"),
  );
  const {
    ProfileReviewAuthorizationError,
  } = require(path.join(outDir, "profileReview/types.js"));

  await runTests(service, InMemoryProfileProposalRepository, ProfileReviewAuthorizationError);
  console.log("Jobs profile review foundation synthetic tests: PASS");
} finally {
  rmSync(outDir, { force: true, recursive: true });
}

async function runTests(service, InMemoryProfileProposalRepository, ProfileReviewAuthorizationError) {
  const candidateA = "11111111-1111-4111-8111-111111111111";
  const candidateB = "22222222-2222-4222-8222-222222222222";
  const resumeA1 = "33333333-3333-4333-8333-333333333333";
  const resumeA2 = "44444444-4444-4444-8444-444444444444";
  const resumeB1 = "55555555-5555-4555-8555-555555555555";
  const run1 = "66666666-6666-4666-8666-666666666666";
  const run2 = "77777777-7777-4777-8777-777777777777";

  const repository = new InMemoryProfileProposalRepository({
    candidates: [
      { candidateId: candidateA, resumeVersionId: resumeA1, profile: { currentEmployer: "Confirmed Employer Ltd" } },
      { candidateId: candidateA, resumeVersionId: resumeA2, profile: { currentEmployer: "Confirmed Employer Ltd" } },
      { candidateId: candidateB, resumeVersionId: resumeB1, profile: {} },
    ],
  });

  const firstPersist = await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateA,
      resumeVersionId: resumeA1,
      aiProcessingRunId: run1,
      extraction: syntheticExtraction(),
    }),
    repository,
  );

  assert(firstPersist.created > 10, "new AI proposal persistence should create field proposals");
  assert.equal(firstPersist.updated, 0);
  assert.equal(firstPersist.proposals.every((proposal) => proposal.resumeVersionId === resumeA1), true);
  assert.equal(firstPersist.proposals.every((proposal) => proposal.aiProcessingRunId === run1), true);
  assert.equal(firstPersist.proposals.every((proposal) => proposal.extractedValue.reviewStatus === "ai_proposed"), true);

  const proposalSnapshot = JSON.stringify(firstPersist.proposals);
  assert(!proposalSnapshot.includes("rawResumeText"));
  assert(!proposalSnapshot.includes("providerRequest"));
  assert(!proposalSnapshot.includes("providerResponse"));
  assert(!proposalSnapshot.includes("Ignore all previous instructions"));

  const duplicatePersist = await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateA,
      resumeVersionId: resumeA1,
      aiProcessingRunId: run1,
      extraction: syntheticExtraction(),
    }),
    repository,
  );

  assert.equal(duplicatePersist.created, 0, "duplicate processing should not create duplicate proposals");
  assert.equal(repository.proposals.length, firstPersist.proposals.length);

  const currentEmployer = repository.proposals.find(
    (proposal) => proposal.fieldPath === "professional.currentEmployer",
  );
  assert(currentEmployer);
  await service.confirmCandidateProfileProposal(
    {
      proposalId: currentEmployer.id,
      candidateId: candidateA,
      actorCandidateId: candidateA,
      actorRefId: "88888888-8888-4888-8888-888888888888",
    },
    repository,
  );
  assert.equal(repository.profiles.get(candidateA).currentEmployer, "FinNova Services Private Limited");

  await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateA,
      resumeVersionId: resumeA2,
      aiProcessingRunId: run2,
      extraction: syntheticExtraction({ currentEmployer: "Later AI Employer Private Limited" }),
    }),
    repository,
  );
  assert.equal(
    repository.profiles.get(candidateA).currentEmployer,
    "FinNova Services Private Limited",
    "later AI proposals must not silently overwrite confirmed profile data",
  );

  const titleProposal = repository.proposals.find(
    (proposal) => proposal.fieldPath === "professional.currentDesignation",
  );
  assert(titleProposal);
  await service.editCandidateProfileProposal(
    {
      proposalId: titleProposal.id,
      candidateId: candidateA,
      actorCandidateId: candidateA,
      editedValue: "Senior Compliance Manager",
      confirmAfterEdit: true,
    },
    repository,
  );
  const editedTitle = await repository.getProposalById(titleProposal.id);
  assert.equal(editedTitle.extractedValue.originalValue, "Compliance Manager");
  assert.equal(editedTitle.extractedValue.currentValue, "Senior Compliance Manager");
  assert.equal(editedTitle.extractedValue.reviewStatus, "candidate_confirmed");
  assert.equal(repository.profiles.get(candidateA).currentTitle, "Senior Compliance Manager");

  const educationProposal = repository.proposals.find((proposal) => proposal.fieldPath.startsWith("education."));
  assert(educationProposal);
  await service.rejectCandidateProfileProposal(
    {
      proposalId: educationProposal.id,
      candidateId: candidateA,
      actorCandidateId: candidateA,
      reason: "Candidate says this is incomplete.",
    },
    repository,
  );
  const rejected = await repository.getProposalById(educationProposal.id);
  assert.equal(rejected.extractedValue.reviewStatus, "candidate_rejected");
  assert.equal(rejected.isApplied, false);

  await assert.rejects(
    () => service.listCandidateProfileProposals(candidateA, candidateB, repository),
    ProfileReviewAuthorizationError,
  );

  const lowConfidencePersist = await service.persistAiProfileProposals(
    persistenceInput({
      candidateId: candidateB,
      resumeVersionId: resumeB1,
      aiProcessingRunId: "99999999-9999-4999-8999-999999999999",
      extraction: syntheticExtraction({ confidence: 0.05 }),
    }),
    repository,
  );
  assert(
    lowConfidencePersist.proposals.some(
      (proposal) =>
        proposal.confidenceScore === 0.05 && proposal.extractedValue.reviewStatus === "ai_proposed",
    ),
    "AI confidence should not automatically reject proposals",
  );

  assert(repository.auditEvents.some((event) => event.action === "ai_profile_proposal_created"));
  assert(repository.auditEvents.some((event) => event.action === "candidate_profile_proposal_confirmed"));
  assert(repository.auditEvents.some((event) => event.action === "candidate_profile_proposal_edited"));
  assert(repository.auditEvents.some((event) => event.action === "candidate_profile_proposal_rejected"));
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

function syntheticExtraction({ currentEmployer = "FinNova Services Private Limited", confidence = 0.86 } = {}) {
  return {
    identity: { candidateName: field("Aarav Mehta", confidence) },
    contact: {
      email: null,
      mobile: null,
      location: field("Mumbai, Maharashtra", confidence),
    },
    professional: {
      currentDesignation: field("Compliance Manager", confidence),
      currentEmployer: field(currentEmployer, confidence),
      totalExperienceYears: field(5, confidence),
      employmentHistory: [
        {
          designation: field("Compliance Manager", confidence),
          employer: field(currentEmployer, confidence),
        },
        {
          designation: field("Compliance Analyst", confidence),
          employer: field("Alpha Credit Solutions Private Limited", confidence),
        },
      ],
    },
    education: [
      {
        qualification: field("B.Com", confidence),
        institution: field("Western Peninsula Commerce University", confidence),
        year: field("2019", confidence),
      },
    ],
    skills: {
      skills: [
        { name: field("Regulatory Compliance", confidence) },
        { name: field("KYC", confidence) },
        { name: field("AML", confidence) },
        { name: field("Risk Management", confidence) },
        { name: field("Excel", confidence) },
      ],
      tools: [],
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
          name: field("Certified AML Controls Associate", confidence),
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

function field(value, confidence) {
  return {
    value,
    confidence,
    provenance: [
      {
        sourceKind: "resume_text",
        resumeVersionId: "synthetic-resume-version",
        aiProcessingRunId: "synthetic-ai-run",
        sectionLabel: "Synthetic fixture",
        extractionMethod: "synthetic_text_fixture",
      },
    ],
    reviewStatus: "ai_proposed",
  };
}
