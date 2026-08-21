import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-candidate-identity-"));

async function main() {
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
      "lib/jobs/candidateIdentity/types.ts",
      "lib/jobs/candidateIdentity/service.ts",
      "lib/jobs/candidateIdentity/redirects.ts",
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );

  const require = createRequire(import.meta.url);
  const service = require(path.join(outDir, "service.js"));
  const redirects = require(path.join(outDir, "redirects.js"));
  const types = require(path.join(outDir, "types.js"));

  await runTests(service, redirects, types);
  console.log("Jobs candidate identity synthetic tests: PASS");
}

async function runTests(service, redirects, types) {
  const repository = new InMemoryCandidateIdentityRepository();
  const userA = syntheticUser("aaaaaaaaaaaaaaaaaaaaaaaa", "aarav.account@example.test", "Aarav", "Mehta");
  const userB = syntheticUser("bbbbbbbbbbbbbbbbbbbbbbbb", "diya.account@example.test", "Diya", "Shah");

  const first = await service.initializeCandidateAccountIdentity({ user: userA }, repository);
  assert.equal(repository.identities.size, 1, "first visit creates one IdentityReference");
  assert.equal(repository.candidates.size, 1, "first visit creates one Candidate");
  assert.equal(repository.contacts.size, 2, "first visit creates email and mobile contact foundation");
  assert.equal(first.email, "aarav.account@example.test");

  const second = await service.initializeCandidateAccountIdentity({ user: userA }, repository);
  assert.equal(second.actorRefId, first.actorRefId, "second visit returns same IdentityReference");
  assert.equal(second.candidateId, first.candidateId, "second visit returns same Candidate");
  assert.equal(repository.identities.size, 1, "second visit must not duplicate IdentityReference");
  assert.equal(repository.candidates.size, 1, "second visit must not duplicate Candidate");
  assert.equal(repository.contacts.size, 2, "second visit must not duplicate contacts");

  const concurrent = await Promise.all([
    service.initializeCandidateAccountIdentity({ user: userA }, repository),
    service.initializeCandidateAccountIdentity({ user: userA }, repository),
  ]);
  assert.equal(concurrent[0].actorRefId, first.actorRefId);
  assert.equal(concurrent[1].candidateId, first.candidateId);
  assert.equal(repository.identities.size, 1, "concurrent retry must not duplicate identity");
  assert.equal(repository.candidates.size, 1, "concurrent retry must not duplicate candidate");
  assert.equal(repository.contacts.size, 2, "concurrent retry must not duplicate contact foundation");

  await assert.rejects(
    () => service.initializeCandidateAccountIdentity({ user: null }, repository),
    types.CandidateIdentityAuthorizationError,
    "unauthenticated access must be rejected",
  );

  const userBSession = await service.initializeCandidateAccountIdentity({ user: userB }, repository);
  assert.notEqual(userBSession.candidateId, first.candidateId, "candidate B must resolve only candidate B");
  assert.notEqual(userBSession.actorRefId, first.actorRefId, "candidate B must resolve only candidate B identity");

  const browserSuppliedCandidateId = first.candidateId;
  const userBWithBrowserCandidateId = { ...userB, candidateId: browserSuppliedCandidateId };
  const ignoredBrowserCandidate = await service.initializeCandidateAccountIdentity(
    { user: userBWithBrowserCandidateId },
    repository,
  );
  assert.equal(
    ignoredBrowserCandidate.candidateId,
    userBSession.candidateId,
    "browser-supplied candidateId must be ignored",
  );

  const staffRepository = new InMemoryCandidateIdentityRepository({ staffExternalIds: [userA.userId] });
  await assert.rejects(
    () => service.initializeCandidateAccountIdentity({ user: userA }, staffRepository),
    types.CandidateIdentityUnavailableError,
    "candidate identity initialization must not grant or accept staff permission",
  );

  assert.equal(redirects.getSafeInternalReturnPath("/jobs/account/profile"), "/jobs/account/profile");
  assert.equal(
    redirects.getSafeInternalReturnPath("/jobs/account?tab=profile#top"),
    "/jobs/account?tab=profile#top",
  );
  assert.equal(redirects.getSafeInternalReturnPath("https://evil.example/jobs/account", "/jobs/account"), "/jobs/account");
  assert.equal(redirects.getSafeInternalReturnPath("//evil.example", "/jobs/account"), "/jobs/account");
  assert.equal(redirects.buildLoginHref("/jobs/account"), "/login?redirect=%2Fjobs%2Faccount");

  const serialized = JSON.stringify(first);
  assert.equal(serialized.includes("password"), false, "password field must not be exposed");
  assert.equal(serialized.includes("auth_token"), false, "auth token must not be exposed");
  assert.equal(serialized.includes("JWT"), false, "JWT details must not be exposed");
}

function syntheticUser(userId, email, firstName, lastName) {
  return {
    userId,
    email,
    firstName,
    lastName,
    mobile: "+91 90000 00000",
  };
}

class InMemoryCandidateIdentityRepository {
  constructor({ staffExternalIds = [] } = {}) {
    this.identities = new Map();
    this.candidates = new Map();
    this.contacts = new Set();
    this.staffExternalIds = new Set(staffExternalIds);
  }

  async initializeCandidateIdentity(input) {
    const identityKey = `${input.externalCollection}:${input.externalId}`;
    let identity = this.identities.get(identityKey);

    if (!identity) {
      identity = {
        id: `identity-${this.identities.size + 1}`,
        displayName: input.displayName,
        email: input.email,
      };
      this.identities.set(identityKey, identity);
    } else {
      identity.displayName = input.displayName;
      identity.email = input.email;
    }

    let candidate = this.candidates.get(identity.id);
    if (!candidate) {
      candidate = {
        id: `candidate-${this.candidates.size + 1}`,
        identityRefId: identity.id,
        status: "active",
        deletedAt: null,
      };
      this.candidates.set(identity.id, candidate);
    }

    this.contacts.add(`${candidate.id}:email:${input.email}`);
    if (input.mobile) {
      this.contacts.add(`${candidate.id}:phone_mobile:${input.mobile}`);
    }

    return {
      identityRefId: identity.id,
      candidateId: candidate.id,
      email: identity.email,
      displayName: identity.displayName,
      candidateStatus: candidate.status,
      candidateDeletedAt: candidate.deletedAt,
      emailContactCreated: true,
      mobileContactCreated: Boolean(input.mobile),
      staffCapabilityGranted: this.staffExternalIds.has(input.externalId),
    };
  }
}

try {
  await main();
} finally {
  rmSync(outDir, { force: true, recursive: true });
}
