import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-candidate-account-"));

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
      "--rootDir",
      "lib/jobs",
      "--outDir",
      outDir,
      "lib/jobs/candidateAccount/types.ts",
      "lib/jobs/candidateAccount/navigation.ts",
      "lib/jobs/candidateAccount/service.ts",
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const service = require(path.join(outDir, "candidateAccount/service.js"));
  const { CANDIDATE_ACCOUNT_NAV_ITEMS } = require(path.join(outDir, "candidateAccount/navigation.js"));

  runTests(service, CANDIDATE_ACCOUNT_NAV_ITEMS);
  console.log("Jobs candidate account synthetic tests: PASS");
} finally {
  rmSync(outDir, { force: true, recursive: true });
}

function runTests(service, navItems) {
  assert.deepEqual(
    navItems.map((item) => item.href),
    [
      "/jobs/account",
      "/jobs/account/profile",
      "/jobs/account/applications",
      "/jobs/account/saved",
      "/jobs/account/alerts",
    ],
    "candidate navigation must use frozen account routes",
  );

  const dashboard = service.buildCandidateAccountDashboardViewModel(syntheticDashboardInput());
  assert.equal(dashboard.candidateName, "Aarav Mehta");
  assert.equal(dashboard.profileCompletion.percentage, 100);
  assert.equal(dashboard.resumeState.state, "review_required");
  assert.equal(dashboard.resumeState.ctaHref, "/jobs/account/profile");
  assert.equal(dashboard.applicationSummary.total, 4);
  assert.equal(dashboard.applicationSummary.underReview, 1);
  assert.equal(dashboard.applicationSummary.interview, 1);
  assert.equal(dashboard.applicationSummary.offeredOrSelected, 1);
  assert.equal(dashboard.applicationSummary.rejectedOrClosed, 1);
  assert.equal(dashboard.savedJobsCount, 2);
  assert.equal(dashboard.alertsCount, 1);
  assert.equal(dashboard.upcomingInterviews.length, 1);
  assert.equal(dashboard.nextAction.ctaHref, "/jobs/account/profile");
  assert.equal(dashboard.recommendedJobsEnabled, false);

  const serialized = JSON.stringify(dashboard);
  assert.equal(serialized.includes("internal recruiter note"), false);
  assert.equal(serialized.includes("aiScore"), false);
  assert.equal(serialized.includes("ranking"), false);
  assert.equal(serialized.includes("other candidate"), false);

  const empty = service.buildCandidateAccountDashboardViewModel({
    candidate: {
      firstName: "Aarav",
      contacts: [{ type: "email", value: "aarav.synthetic@example.test" }],
      hasResume: false,
    },
    resume: {
      hasResume: false,
      parseStatus: null,
      hasOpenProfileSuggestions: false,
    },
    applications: [],
    savedJobsCount: 0,
    alertsCount: 0,
    upcomingInterviews: [],
  });
  assert.equal(empty.resumeState.state, "no_resume");
  assert.equal(empty.applicationSummary.total, 0);
  assert.equal(empty.upcomingInterviews.length, 0);
  assert.equal(empty.nextAction.title, "Upload your resume");

  const uploaded = service.buildCandidateAccountDashboardViewModel({
    ...syntheticDashboardInput(),
    resume: {
      hasResume: true,
      parseStatus: "processing",
      hasOpenProfileSuggestions: false,
    },
  });
  assert.equal(uploaded.resumeState.state, "uploaded");
  assert.equal(uploaded.resumeState.label, "Resume Uploaded");

  const profileCompleteness = service.calculateProfileCompleteness({
    firstName: "Aarav",
    contacts: [{ type: "email", value: "aarav.synthetic@example.test" }],
    hasResume: false,
  });
  assert(profileCompleteness.percentage > 0);
  assert(profileCompleteness.percentage < 100);
  assert(profileCompleteness.missingItems.includes("Resume"));
}

function syntheticDashboardInput() {
  return {
    candidate: {
      firstName: "Aarav",
      lastName: "Mehta",
      currentTitle: "Compliance Manager",
      currentEmployer: "FinNova Services Private Limited",
      yearsOfExperience: 5,
      currentCity: "Mumbai",
      currentState: "Maharashtra",
      contacts: [
        { type: "email", value: "aarav.synthetic@example.test" },
        { type: "phone_mobile", value: "+91 90000 00000" },
      ],
      employmentCount: 2,
      educationCount: 1,
      skillCount: 5,
      domainCount: 4,
      hasResume: true,
    },
    resume: {
      hasResume: true,
      parseStatus: "completed",
      hasOpenProfileSuggestions: true,
    },
    applications: [
      application("app-1", "NBFC Compliance Manager", "under-review", "New Application", false, false),
      application("app-2", "RBI Reporting Lead", "interview-round", "Interview Round", false, false),
      application("app-3", "Fintech Risk Manager", "offer", "Offer", false, false),
      application("app-4", "SEBI Compliance Analyst", "rejected", "Rejected", true, false),
    ],
    savedJobsCount: 2,
    alertsCount: 1,
    upcomingInterviews: [
      {
        id: "interview-1",
        jobTitle: "RBI Reporting Lead",
        organizationName: "Fictional Bank Services Private Limited",
        scheduledAt: "2026-09-01T10:30:00.000Z",
        interviewType: "video_call",
        status: "scheduled",
        format: "video",
        notes: "internal recruiter note",
      },
    ],
  };
}

function application(id, jobTitle, stageSlug, stageName, isTerminal, isPositiveTerminal) {
  return {
    id,
    jobTitle,
    organizationName: "Fictional Financial Services Private Limited",
    appliedAt: "2026-08-20T10:00:00.000Z",
    stageSlug,
    stageName,
    isTerminal,
    isPositiveTerminal,
    recruiterNotes: "internal recruiter note",
    aiScore: 0.99,
    ranking: 1,
  };
}
