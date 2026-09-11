/**
 * Synthetic tests for the temporary-upload orphan reaper.
 *
 * Verifies the safety properties that matter: a confirmed resume is never
 * removed, a recent upload is never raced, an uncertain database answer deletes
 * nothing, and dry-run deletes nothing at all.
 *
 * No network, no database, no real file.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-temp-cleanup-"));

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

const PREFIX = "tmp/candidates/";
const minutesAgo = (n) => new Date(Date.now() - n * 60_000);

function fakeStorage(objects) {
  const deleted = [];
  const listedPrefixes = [];
  return {
    deleted,
    listedPrefixes,
    async listTemporaryObjects({ prefix, limit, cursor }) {
      listedPrefixes.push(prefix);
      const start = cursor ? Number(cursor) : 0;
      const slice = objects.slice(start, start + limit);
      const next = start + limit;
      return { objects: slice, cursor: next < objects.length ? String(next) : undefined };
    },
    async deleteObject(key) {
      deleted.push(key);
    },
  };
}

const baseConfig = {
  minimumAgeMinutes: 60,
  maxDeletions: 200,
  maxScanned: 2000,
  dryRun: false,
  environment: "staging",
};

async function main() {
  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        module: "commonjs", target: "es2020", moduleResolution: "node",
        esModuleInterop: true, skipLibCheck: true,
        outDir: path.join(outDir, "out"), rootDir: repoRoot, baseUrl: repoRoot,
        paths: { "@/*": ["./*"] },
        typeRoots: [path.join(repoRoot, "node_modules/@types")], types: ["node"],
      },
      files: [
        path.join(repoRoot, "lib/jobs/temporaryUploadCleanup/service.ts"),
        path.join(repoRoot, "lib/jobs/temporaryUploadCleanup/types.ts"),
      ],
    }),
  );
  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  const require = createRequire(import.meta.url);
  const compiled = path.join(outDir, "out", "lib/jobs/temporaryUploadCleanup");
  const { cleanupTemporaryUploads } = require(path.join(compiled, "service.js"));
  const types = require(path.join(compiled, "types.js"));

  console.log("\nAge floor:");
  await check("a configured age below the floor is raised to it", () => {
    assert.equal(types.resolveMinimumAgeMinutes(1), types.MINIMUM_AGE_FLOOR_MINUTES);
    assert.equal(types.resolveMinimumAgeMinutes(0), types.MINIMUM_AGE_FLOOR_MINUTES);
    assert.equal(types.resolveMinimumAgeMinutes(-99), types.MINIMUM_AGE_FLOOR_MINUTES);
    assert.equal(types.resolveMinimumAgeMinutes(NaN), types.MINIMUM_AGE_FLOOR_MINUTES);
  });
  await check("the floor comfortably exceeds the 600s presigned upload window", () => {
    assert.ok(types.MINIMUM_AGE_FLOOR_MINUTES * 60 > 600 * 2, "floor too close to the upload window");
  });
  await check("a larger configured age is honoured", () => {
    assert.equal(types.resolveMinimumAgeMinutes(180), 180);
  });

  console.log("\nWhat gets deleted:");
  await check("an old unreferenced orphan is deleted", async () => {
    const storage = fakeStorage([{ objectKey: PREFIX + "c/orphan.pdf", sizeBytes: 10, lastModified: minutesAgo(120) }]);
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r.deleted, 1);
    assert.deepEqual(storage.deleted, [PREFIX + "c/orphan.pdf"]);
  });
  await check("a CONFIRMED resume is never deleted, however old", async () => {
    const key = PREFIX + "c/confirmed.pdf";
    const storage = fakeStorage([{ objectKey: key, sizeBytes: 10, lastModified: minutesAgo(60 * 24 * 365) }]);
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set([key]), config: baseConfig });
    assert.equal(r.deleted, 0);
    assert.equal(r.skipped.referenced_by_resume_version, 1);
    assert.deepEqual(storage.deleted, []);
  });
  await check("a recent upload is never raced", async () => {
    const storage = fakeStorage([{ objectKey: PREFIX + "c/inflight.pdf", sizeBytes: 10, lastModified: minutesAgo(2) }]);
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r.deleted, 0);
    assert.equal(r.skipped.too_young, 1);
    assert.deepEqual(storage.deleted, []);
  });
  await check("an object just under the floor is still protected", async () => {
    const storage = fakeStorage([{ objectKey: PREFIX + "c/edge.pdf", sizeBytes: 10, lastModified: minutesAgo(59) }]);
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r.deleted, 0);
    assert.equal(r.skipped.too_young, 1);
  });

  console.log("\nUncertainty deletes nothing:");
  await check("a failed reference lookup deletes nothing", async () => {
    const storage = fakeStorage([
      { objectKey: PREFIX + "c/a.pdf", sizeBytes: 10, lastModified: minutesAgo(120) },
      { objectKey: PREFIX + "c/b.pdf", sizeBytes: 10, lastModified: minutesAgo(120) },
    ]);
    const r = await cleanupTemporaryUploads({
      storage,
      findReferencedKeys: async () => { throw new Error("database unavailable"); },
      config: baseConfig,
    });
    assert.equal(r.deleted, 0);
    assert.equal(r.skipped.reference_check_failed, 2);
    assert.equal(r.errors, 1);
    assert.deepEqual(storage.deleted, []);
  });
  await check("a delete failure is counted, not retried blindly", async () => {
    const storage = fakeStorage([{ objectKey: PREFIX + "c/x.pdf", sizeBytes: 10, lastModified: minutesAgo(120) }]);
    storage.deleteObject = async () => { throw new Error("storage error"); };
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r.deleted, 0);
    assert.equal(r.errors, 1);
  });

  console.log("\nDry run:");
  await check("dry run reports a plan and deletes nothing", async () => {
    const storage = fakeStorage([
      { objectKey: PREFIX + "c/a.pdf", sizeBytes: 10, lastModified: minutesAgo(120) },
      { objectKey: PREFIX + "c/b.pdf", sizeBytes: 10, lastModified: minutesAgo(120) },
    ]);
    const r = await cleanupTemporaryUploads({
      storage, findReferencedKeys: async () => new Set(),
      config: { ...baseConfig, dryRun: true },
    });
    assert.equal(r.dryRun, true);
    assert.equal(r.deleted, 2, "dry run should still report what it would remove");
    assert.deepEqual(storage.deleted, [], "dry run must not delete");
  });

  console.log("\nBounds and scope:");
  await check("deletions are capped per run", async () => {
    const objects = Array.from({ length: 50 }, (_, i) => ({
      objectKey: `${PREFIX}c/${i}.pdf`, sizeBytes: 10, lastModified: minutesAgo(120),
    }));
    const r = await cleanupTemporaryUploads({
      storage: fakeStorage(objects), findReferencedKeys: async () => new Set(),
      config: { ...baseConfig, maxDeletions: 5 },
    });
    assert.equal(r.deleted, 5);
    assert.equal(r.truncated, true);
  });
  await check("the scan budget bounds the sweep", async () => {
    const objects = Array.from({ length: 500 }, (_, i) => ({
      objectKey: `${PREFIX}c/${i}.pdf`, sizeBytes: 10, lastModified: minutesAgo(2),
    }));
    const r = await cleanupTemporaryUploads({
      storage: fakeStorage(objects), findReferencedKeys: async () => new Set(),
      config: { ...baseConfig, maxScanned: 37 },
    });
    assert.equal(r.scanned, 37);
    assert.equal(r.truncated, true);
  });
  await check("only the temporary prefix is ever listed", async () => {
    const storage = fakeStorage([]);
    await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.ok(storage.listedPrefixes.every((p) => p === types.TEMPORARY_UPLOAD_PREFIX), "listed outside the temp prefix");
  });
  await check("a key outside the temporary prefix is refused, not deleted", async () => {
    const storage = fakeStorage([{ objectKey: "candidates/c/stored.pdf", sizeBytes: 10, lastModified: minutesAgo(120) }]);
    const r = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r.deleted, 0);
    assert.equal(r.skipped.outside_temporary_prefix, 1);
    assert.deepEqual(storage.deleted, []);
  });
  await check("pagination is followed across pages when budgets allow", async () => {
    // 450 objects over a 200-per-page listing: three pages must be walked.
    const objects = Array.from({ length: 450 }, (_, i) => ({
      objectKey: `${PREFIX}c/${i}.pdf`, sizeBytes: 10, lastModified: minutesAgo(120),
    }));
    const storage = fakeStorage(objects);
    const r = await cleanupTemporaryUploads({
      storage, findReferencedKeys: async () => new Set(),
      config: { ...baseConfig, maxDeletions: 1000 },
    });
    assert.equal(r.scanned, 450, "did not walk every page");
    assert.equal(r.deleted, 450);
    assert.equal(r.truncated, false);
  });
  await check("hitting the deletion cap stops the sweep instead of scanning on", async () => {
    const objects = Array.from({ length: 450 }, (_, i) => ({
      objectKey: `${PREFIX}c/${i}.pdf`, sizeBytes: 10, lastModified: minutesAgo(120),
    }));
    const r = await cleanupTemporaryUploads({
      storage: fakeStorage(objects), findReferencedKeys: async () => new Set(),
      config: { ...baseConfig, maxDeletions: 200 },
    });
    assert.equal(r.deleted, 200);
    assert.ok(r.scanned <= 250, `scanned ${r.scanned}: should stop promptly after the cap`);
    assert.equal(r.truncated, true, "a capped run must report truncation so the next run resumes");
  });

  console.log("\nIdempotency:");
  await check("a second sweep over an already-clean prefix deletes nothing", async () => {
    const storage = fakeStorage([]);
    const r1 = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    const r2 = await cleanupTemporaryUploads({ storage, findReferencedKeys: async () => new Set(), config: baseConfig });
    assert.equal(r1.deleted, 0);
    assert.equal(r2.deleted, 0);
  });

  console.log("\nMixed realistic sweep:");
  await check("confirmed, in-flight and orphaned objects are handled correctly together", async () => {
    const confirmed = PREFIX + "c/confirmed.pdf";
    const storage = fakeStorage([
      { objectKey: confirmed, sizeBytes: 10, lastModified: minutesAgo(500) },
      { objectKey: PREFIX + "c/orphan1.pdf", sizeBytes: 10, lastModified: minutesAgo(500) },
      { objectKey: PREFIX + "c/inflight.pdf", sizeBytes: 10, lastModified: minutesAgo(1) },
      { objectKey: PREFIX + "c/orphan2.pdf", sizeBytes: 10, lastModified: minutesAgo(90) },
    ]);
    const r = await cleanupTemporaryUploads({
      storage, findReferencedKeys: async (keys) => new Set(keys.filter((k) => k === confirmed)),
      config: baseConfig,
    });
    assert.equal(r.scanned, 4);
    assert.equal(r.deleted, 2);
    assert.equal(r.skipped.referenced_by_resume_version, 1);
    assert.equal(r.skipped.too_young, 1);
    assert.ok(!storage.deleted.includes(confirmed), "confirmed resume was deleted");
    assert.deepEqual(storage.deleted.sort(), [PREFIX + "c/orphan1.pdf", PREFIX + "c/orphan2.pdf"]);
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => rmSync(outDir, { recursive: true, force: true }));
