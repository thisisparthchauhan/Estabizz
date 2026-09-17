/**
 * Synthetic tests for candidate privacy deletion.
 *
 * Synthetic in-memory repository only: no database, no storage, no real
 * candidate. The properties under test are the ones that make erasure safe --
 * ordering, authorization, idempotency, and never stranding an object.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-deletion-"));

let passed = 0;
let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓  ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗  ${name}`);
    console.log(`       ${error.message}`);
  }
}

const CANDIDATE = "11111111-1111-4111-8111-111111111111";
const OTHER = "22222222-2222-4222-8222-222222222222";
const ACTOR_REF = "33333333-3333-4333-8333-333333333333";

function fakeRepo({ deletedAt = null, keys = ["tmp/candidates/x/a.pdf", "candidates/x/b.pdf"], missing = false } = {}) {
  const calls = [];
  return {
    calls,
    async loadCandidate(id) {
      calls.push(`load:${id}`);
      return missing ? null : { id, deletedAt, identityRefId: "ref" };
    },
    async listStoredObjectKeys() { calls.push("listKeys"); return keys; },
    async purgeCandidateOwnedData() { calls.push("purge"); return { resumeVersions: 2, candidateContacts: 3 }; },
    async anonymiseRetainedRecords() { calls.push("anonymise"); return { candidate: 1, applicationSnapshots: 1 }; },
    async minimiseAuditEvents() { calls.push("minimiseAudit"); return 7; },
  };
}

function fakeWebsite({ fail = false, userDeleted = true, blogs = 2 } = {}) {
  const calls = [];
  return {
    calls,
    async verifyPassword() { return true; },
    async eraseWebsiteAccount() {
      calls.push("eraseWebsite");
      if (fail) throw new Error("mongo unavailable");
      return { userDeleted, blogsAnonymised: blogs };
    },
  };
}

function fakeStorage({ failKeys = [] } = {}) {
  const deleted = [];
  return {
    deleted,
    async deleteObject(key) {
      if (failKeys.includes(key)) throw new Error("storage failure");
      deleted.push(key);
    },
  };
}

const request = (over = {}) => ({
  candidateId: CANDIDATE, actorCandidateId: CANDIDATE, actorRefId: ACTOR_REF,
  websiteUserId: "6aa0000000000000000000aa", websiteEmail: "synthetic@example.invalid",
  reason: "candidate_request", ...over,
});

async function main() {
  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(tsconfigPath, JSON.stringify({
    compilerOptions: {
      module: "commonjs", target: "es2020", moduleResolution: "node",
      esModuleInterop: true, skipLibCheck: true,
      outDir: path.join(outDir, "out"), rootDir: repoRoot, baseUrl: repoRoot,
      paths: { "@/*": ["./*"] },
      typeRoots: [path.join(repoRoot, "node_modules/@types")], types: ["node"],
    },
    files: [
      path.join(repoRoot, "lib/jobs/candidateDeletion/service.ts"),
      path.join(repoRoot, "lib/jobs/candidateDeletion/types.ts"),
    ],
  }));
  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  const require = createRequire(import.meta.url);
  const compiled = path.join(outDir, "out", "lib/jobs/candidateDeletion");
  const { deleteCandidateData } = require(path.join(compiled, "service.js"));
  const t = require(path.join(compiled, "types.js"));

  console.log("\nAuthorization:");
  await check("a candidate cannot erase another candidate", async () => {
    await assert.rejects(
      deleteCandidateData(request({ candidateId: OTHER }), { repository: fakeRepo(), storage: fakeStorage(), websiteAccount: fakeWebsite() }),
      (e) => e.name === "CandidateDeletionAuthorizationError",
    );
  });
  await check("nothing is touched when authorization fails", async () => {
    const repo = fakeRepo(); const storage = fakeStorage();
    await deleteCandidateData(request({ candidateId: OTHER }), { repository: repo, storage, websiteAccount: fakeWebsite() }).catch(() => {});
    assert.deepEqual(repo.calls, [], "repository was touched");
    assert.deepEqual(storage.deleted, [], "storage was touched");
  });
  await check("an admin-initiated deletion may target another candidate", async () => {
    const r = await deleteCandidateData(
      request({ candidateId: OTHER, reason: "admin_request" }),
      { repository: fakeRepo(), storage: fakeStorage(), websiteAccount: fakeWebsite() },
    );
    assert.equal(r.status, "deleted");
  });
  await check("a non-candidate (staff) target is not found, never deleted", async () => {
    const repo = fakeRepo({ missing: true });
    await assert.rejects(
      deleteCandidateData(request(), { repository: repo, storage: fakeStorage(), websiteAccount: fakeWebsite() }),
      (e) => e.name === "CandidateDeletionNotFoundError",
    );
    assert.ok(!repo.calls.includes("purge"), "purge ran against a missing candidate");
  });

  console.log("\nOrdering — storage before rows:");
  await check("objects are deleted before any row is removed", async () => {
    const repo = fakeRepo(); const storage = fakeStorage();
    await deleteCandidateData(request(), { repository: repo, storage, websiteAccount: fakeWebsite() });
    assert.ok(repo.calls.indexOf("listKeys") < repo.calls.indexOf("purge"), "rows purged before keys were listed");
    assert.deepEqual(repo.calls, ["load:" + CANDIDATE, "listKeys", "purge", "anonymise", "minimiseAudit"]);
  });
  await check("both resume and document objects are removed", async () => {
    const storage = fakeStorage();
    const r = await deleteCandidateData(request(), { repository: fakeRepo(), storage, websiteAccount: fakeWebsite() });
    assert.equal(r.storageObjectsDeleted, 2);
    assert.equal(storage.deleted.length, 2);
  });

  console.log("\nNo object is ever stranded:");
  await check("a failed object delete aborts before any row is removed", async () => {
    const repo = fakeRepo();
    const storage = fakeStorage({ failKeys: ["candidates/x/b.pdf"] });
    await assert.rejects(
      deleteCandidateData(request(), { repository: repo, storage, websiteAccount: fakeWebsite() }),
      (e) => e.name === "CandidateDeletionStorageError",
    );
    assert.ok(!repo.calls.includes("purge"), "rows were deleted despite a stranded object");
    assert.ok(!repo.calls.includes("anonymise"), "records were anonymised despite a stranded object");
  });
  await check("the rows that name a stranded object survive, so a retry finds it", async () => {
    const repo = fakeRepo();
    await deleteCandidateData(request(), { repository: repo, storage: fakeStorage({ failKeys: ["tmp/candidates/x/a.pdf"] }), websiteAccount: fakeWebsite() }).catch(() => {});
    assert.ok(!repo.calls.includes("purge"));
  });

  console.log("\nIdempotency:");
  await check("a repeat request is a safe no-op", async () => {
    const repo = fakeRepo({ deletedAt: new Date() });
    const r = await deleteCandidateData(request(), { repository: repo, storage: fakeStorage(), websiteAccount: fakeWebsite() });
    assert.equal(r.status, "already_deleted");
    assert.ok(!repo.calls.includes("purge"), "purge re-ran on an already-deleted candidate");
    assert.ok(!repo.calls.includes("anonymise"), "anonymise re-ran");
  });
  await check("a repeat request still sweeps objects left by a partial failure", async () => {
    const storage = fakeStorage();
    const r = await deleteCandidateData(
      request(), { repository: fakeRepo({ deletedAt: new Date(), keys: ["tmp/candidates/x/left.pdf"] }), storage, websiteAccount: fakeWebsite() },
    );
    assert.equal(r.status, "already_deleted");
    assert.equal(r.storageObjectsDeleted, 1, "a leftover object must still be swept");
    assert.deepEqual(storage.deleted, ["tmp/candidates/x/left.pdf"]);
  });
  await check("deleting a candidate with no objects at all succeeds", async () => {
    const r = await deleteCandidateData(request(), { repository: fakeRepo({ keys: [] }), storage: fakeStorage(), websiteAccount: fakeWebsite() });
    assert.equal(r.status, "deleted");
    assert.equal(r.storageObjectsDeleted, 0);
  });

  console.log("\nReported outcome:");
  await check("counts are reported for deleted, anonymised and minimised records", async () => {
    const r = await deleteCandidateData(request(), { repository: fakeRepo(), storage: fakeStorage(), websiteAccount: fakeWebsite() });
    assert.equal(r.rowsDeleted.resumeVersions, 2);
    assert.equal(r.rowsAnonymised.candidate, 1);
    assert.equal(r.auditEventsMinimised, 7);
    assert.equal(r.storageObjectsFailed, 0);
  });
  await check("the result carries no candidate personal data", async () => {
    const r = await deleteCandidateData(request(), { repository: fakeRepo(), storage: fakeStorage(), websiteAccount: fakeWebsite() });
    const blob = JSON.stringify(r);
    for (const leak of ["tmp/", ".pdf", "candidates/", CANDIDATE]) {
      assert.ok(!blob.includes(leak), `result leaked ${leak}`);
    }
  });

  console.log("\nCross-system erasure:");
  await check("the website account is erased after the Jobs data", async () => {
    const repo = fakeRepo(); const website = fakeWebsite();
    await deleteCandidateData(request(), { repository: repo, storage: fakeStorage(), websiteAccount: website });
    assert.equal(website.calls.length, 1, "website erasure did not run");
    assert.ok(repo.calls.includes("minimiseAudit"), "Jobs erasure did not complete");
  });
  await check("website results are reported", async () => {
    const r = await deleteCandidateData(request(), {
      repository: fakeRepo(), storage: fakeStorage(), websiteAccount: fakeWebsite({ blogs: 3 }),
    });
    assert.equal(r.websiteUserDeleted, true);
    assert.equal(r.blogsAnonymised, 3);
  });
  await check("a website failure surfaces after the sensitive data is already gone", async () => {
    const repo = fakeRepo();
    await assert.rejects(
      deleteCandidateData(request(), { repository: repo, storage: fakeStorage(), websiteAccount: fakeWebsite({ fail: true }) }),
    );
    // The Jobs erasure completed first, so the irrecoverable data is gone and
    // only the login remains -- which a retry resolves.
    assert.ok(repo.calls.includes("purge"), "Jobs data should already be erased");
    assert.ok(repo.calls.includes("minimiseAudit"));
  });
  await check("a retry after a website failure still erases the website account", async () => {
    const website = fakeWebsite();
    const r = await deleteCandidateData(request(), {
      repository: fakeRepo({ deletedAt: new Date() }), storage: fakeStorage(), websiteAccount: website,
    });
    assert.equal(r.status, "already_deleted");
    assert.equal(website.calls.length, 1, "retry must converge the website side");
    assert.equal(r.websiteUserDeleted, true);
  });
  await check("an already-erased website account reports false, not an error", async () => {
    const r = await deleteCandidateData(request(), {
      repository: fakeRepo({ deletedAt: new Date() }), storage: fakeStorage(),
      websiteAccount: fakeWebsite({ userDeleted: false, blogs: 0 }),
    });
    assert.equal(r.websiteUserDeleted, false);
  });
  await check("an unauthorized request never reaches the website eraser", async () => {
    const website = fakeWebsite();
    await deleteCandidateData(request({ candidateId: OTHER }), {
      repository: fakeRepo(), storage: fakeStorage(), websiteAccount: website,
    }).catch(() => {});
    assert.deepEqual(website.calls, []);
  });

  console.log("\nAnonymisation constants:");
  await check("a tombstone name is defined for retained records", () => {
    assert.equal(typeof t.ANONYMISED_NAME, "string");
    assert.ok(t.ANONYMISED_NAME.length > 0);
  });
  await check("the audit tombstone carries no personal data", () => {
    assert.deepEqual(t.ANONYMISED_AUDIT_TOMBSTONE, { redacted: "candidate_deleted" });
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => rmSync(outDir, { recursive: true, force: true }));
