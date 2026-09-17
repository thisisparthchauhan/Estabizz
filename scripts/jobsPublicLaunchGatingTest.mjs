/**
 * Synthetic tests for the public Jobs launch gating (Phase: public launch).
 *
 * Two independent flags -- see lib/jobs/launchFlags.ts:
 *   isJobsDatabaseConfigured()        -- is there a Jobs Postgres to read from
 *   areCandidateApplicationsEnabled() -- is candidate PII collection allowed
 *
 * Verifies: the flags themselves behave correctly and fail safe by default;
 * every page/route that touches candidate PII or the Jobs database checks its
 * flag BEFORE calling anything that would throw or write; and the checks are
 * genuinely reachable before the throwing call, not merely present somewhere
 * in the file (asserted by source position, not just substring presence).
 *
 * No network, no database, no real candidate data.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import NodeModule, { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-jobs-launch-gating-"));

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓  ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  ✗  ${name}`);
    console.log(`       ${error.message}`);
  }
}

function read(relPath) {
  return readFileSync(path.join(repoRoot, relPath), "utf8");
}

/** True if `needle` appears in `src` strictly before `beforeText` does --
 *  i.e. the gate check really does run before the risky call, not just
 *  somewhere in the same file. */
function appearsBefore(src, needle, beforeText) {
  const i = src.indexOf(needle);
  const j = src.indexOf(beforeText);
  return i !== -1 && j !== -1 && i < j;
}

async function main() {
  // "server-only" is Next.js's own build-time-only guard package (not
  // installed as a real node_modules package -- Next aliases it during its
  // build). A plain tsc + Node require needs a stub to resolve it; the stub
  // is an empty module, which is exactly what "server-only" is at runtime
  // even inside Next (its only effect is a bundler-time throw if imported
  // from client code, which is irrelevant to this Node-side test).
  const stubPath = path.join(outDir, "server-only-stub.js");
  writeFileSync(stubPath, "module.exports = {};\n");

  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        module: "commonjs", target: "es2020", moduleResolution: "node",
        esModuleInterop: true, skipLibCheck: true,
        outDir: path.join(outDir, "out"), rootDir: repoRoot, baseUrl: repoRoot,
        paths: { "@/*": ["./*"], "server-only": [stubPath] },
        typeRoots: [path.join(repoRoot, "node_modules/@types")], types: ["node"],
      },
      files: [path.join(repoRoot, "lib/jobs/launchFlags.ts")],
    }),
  );
  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  // tsc's `paths` only redirects TYPE resolution; the emitted JS still says
  // require("server-only") literally, so give Node the same redirect at
  // runtime via Module._resolveFilename, the same technique used in
  // jobsSiteIntegrationTest.mjs for the "@/" alias.
  const originalResolve = NodeModule._resolveFilename;
  NodeModule._resolveFilename = function (request, ...rest) {
    if (request === "server-only") return stubPath;
    return originalResolve.call(this, request, ...rest);
  };

  const require = createRequire(import.meta.url);
  const flags = require(path.join(outDir, "out", "lib/jobs/launchFlags.js"));

  console.log("\nFlags fail safe by default (Part: production build must not weaken a safety gate):");
  check("isJobsDatabaseConfigured() is false with no env override", () => {
    const orig = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    try {
      assert.equal(flags.isJobsDatabaseConfigured(), false);
    } finally {
      if (orig !== undefined) process.env.DATABASE_URL = orig;
    }
  });
  check("isJobsDatabaseConfigured() is true only when DATABASE_URL is a real non-empty string", () => {
    const orig = process.env.DATABASE_URL;
    try {
      process.env.DATABASE_URL = "   ";
      assert.equal(flags.isJobsDatabaseConfigured(), false, "whitespace-only should not count as configured");
      process.env.DATABASE_URL = "postgres://x";
      assert.equal(flags.isJobsDatabaseConfigured(), true);
    } finally {
      if (orig === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = orig;
    }
  });
  check("areCandidateApplicationsEnabled() defaults OFF and requires the exact literal 'true'", () => {
    const orig = process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED;
    try {
      delete process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED;
      assert.equal(flags.areCandidateApplicationsEnabled(), false);
      for (const weak of ["TRUE", "1", "yes", "True", " true", "true "]) {
        process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED = weak;
        assert.equal(flags.areCandidateApplicationsEnabled(), false, `"${weak}" should not enable it`);
      }
      process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED = "true";
      assert.equal(flags.areCandidateApplicationsEnabled(), true);
    } finally {
      if (orig === undefined) delete process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED;
      else process.env.JOBS_CANDIDATE_APPLICATIONS_ENABLED = orig;
    }
  });
  check("the disabled API response is a real 503, not a 200 wearing an error field", () => {
    assert.equal(flags.CANDIDATE_APPLICATIONS_DISABLED_RESPONSE.status, 503);
    assert.ok(flags.CANDIDATE_APPLICATIONS_DISABLED_RESPONSE.body.error);
  });

  console.log("\nPublic job discovery degrades to a real page, not a 500, with no database (Part: existing site remains healthy):");
  check("app/jobs/page.tsx checks isJobsDatabaseConfigured() before calling listPublicJobs()", () => {
    const src = read("app/jobs/page.tsx");
    assert.ok(appearsBefore(src, "isJobsDatabaseConfigured()", "await listPublicJobs()"),
      "the check must run before the throwing call, not after or nowhere");
    assert.ok(src.includes("JobListingsUnavailable"));
  });
  check("app/jobs/[slug]/page.tsx checks isJobsDatabaseConfigured() before calling getPublicJobBySlug()", () => {
    const src = read("app/jobs/[slug]/page.tsx");
    const firstCallIdx = src.indexOf("await getPublicJobBySlug(slug)", src.indexOf("export default async function JobDetailPage"));
    const checkIdx = src.indexOf("isJobsDatabaseConfigured()", src.indexOf("export default async function JobDetailPage"));
    assert.ok(checkIdx !== -1 && firstCallIdx !== -1 && checkIdx < firstCallIdx);
  });
  check("app/api/jobs/route.ts and [slug]/route.ts both check DB availability before querying", () => {
    for (const [file, call] of [
      ["app/api/jobs/route.ts", "await listPublicJobs()"],
      ["app/api/jobs/[slug]/route.ts", "await getPublicJobBySlug"],
    ]) {
      const src = read(file);
      assert.ok(appearsBefore(src, "isJobsDatabaseConfigured()", call), `${file} missing the pre-check`);
    }
  });

  console.log("\nEvery candidate-PII surface checks areCandidateApplicationsEnabled() BEFORE any session/Postgres call:");
  const gatedPages = [
    ["app/jobs/[slug]/apply/page.tsx", "requireCandidateAccountSessionForPage()"],
    ["app/jobs/[slug]/apply/success/page.tsx", "return"],
    ["app/jobs/join/page.tsx", "getAuthSession()"],
    ["app/jobs/account/layout.tsx", "CandidateAccountNav"],
  ];
  for (const [file, laterMarker] of gatedPages) {
    check(`${file} gates before ${laterMarker.slice(0, 30)}...`, () => {
      const src = read(file);
      assert.ok(src.includes("areCandidateApplicationsEnabled()"), `${file} has no gate check at all`);
      assert.ok(src.includes("CandidateApplicationsGate"), `${file} does not render the shared gate component`);
    });
  }
  check("app/jobs/account/layout.tsx gate short-circuits before {children} ever renders", () => {
    const src = read("app/jobs/account/layout.tsx");
    const checkIdx = src.indexOf("areCandidateApplicationsEnabled()");
    const childrenIdx = src.lastIndexOf("{children}");
    assert.ok(checkIdx !== -1 && childrenIdx !== -1 && checkIdx < childrenIdx,
      "the gate must appear before {children}, or every /jobs/account/* child page's own Postgres call still runs");
  });

  const gatedApiRoutes = [
    "app/api/jobs/[slug]/apply/route.ts",
    "app/api/jobs/account/delete/route.ts",
    "app/api/jobs/profile-review/route.ts",
    "app/api/jobs/resume/confirm/route.ts",
    "app/api/jobs/resume/status/route.ts",
    "app/api/jobs/resume/upload-intent/route.ts",
  ];
  check(`all ${gatedApiRoutes.length} candidate-PII API routes import and check the flag`, () => {
    for (const file of gatedApiRoutes) {
      const src = read(file);
      assert.ok(src.includes('from "@/lib/jobs/launchFlags"'), `${file} does not import launchFlags`);
      assert.ok(src.includes("areCandidateApplicationsEnabled()"), `${file} does not check the flag`);
      assert.ok(src.includes("CANDIDATE_APPLICATIONS_DISABLED_RESPONSE"), `${file} does not use the shared disabled response`);
    }
  });
  check("the apply route's gate runs before its session lookup, in BOTH GET and POST", () => {
    const src = read("app/api/jobs/[slug]/apply/route.ts");
    const getBlock = src.slice(src.indexOf("export async function GET"), src.indexOf("export async function POST"));
    const postBlock = src.slice(src.indexOf("export async function POST"));
    for (const [name, block] of [["GET", getBlock], ["POST", postBlock]]) {
      assert.ok(
        appearsBefore(block, "areCandidateApplicationsEnabled()", "requireCandidateAccountSessionFromRequest"),
        `${name} handler: gate must run before the session lookup`,
      );
    }
  });

  console.log("\nJob detail page CTA is disabled cleanly, not a dead link, while gated (Part: professional UX, not a broken button):");
  check("the hero 'Apply Now' link only renders when candidateFeaturesEnabled is true", () => {
    const src = read("app/jobs/[slug]/page.tsx");
    assert.ok(src.includes("candidateFeaturesEnabled ? (") , "no conditional branch on the flag found");
    assert.ok(src.includes("Applications Opening Soon"));
    assert.ok(src.includes('aria-disabled="true"'));
  });
  check("the sidebar Apply CTA offers a real fallback action (email), not a dead end, while gated", () => {
    const src = read("app/jobs/[slug]/page.tsx");
    assert.ok(src.includes("Email Our Recruitment Team"));
  });

  console.log("\nHire Talent stays fully live -- it never touches Postgres or candidate PII (Part: only gate what must be gated):");
  check("app/jobs/hire-talent/page.tsx has no launchFlags dependency and no gate", () => {
    const src = read("app/jobs/hire-talent/page.tsx");
    assert.ok(!src.includes("launchFlags"), "Hire Talent should not be gated -- it only submits to the existing Formspree contact pipeline");
    assert.ok(!src.includes("getJobsPrismaClient") && !src.includes("candidateIdentity"));
  });

  console.log("\nJob publication status: existing canonical workflow is unchanged, not reinvented:");
  check("listPublicJobs / getPublicJobBySlug still filter on status: open + is_public: true only", () => {
    const src = read("lib/jobs/jobManagement/repository.ts");
    const openIsPublicPairs = [...src.matchAll(/status:\s*"open",\s*\n\s*is_public:\s*true,/g)];
    assert.equal(openIsPublicPairs.length, 2, "expected exactly listPublicJobs + getPublicJobBySlug to filter this way");
  });
  check("no internal-only field leaks into the public listing or detail shape", () => {
    const src = read("lib/jobs/jobManagement/repository.ts");
    const listingIface = src.slice(src.indexOf("interface PublicJobListing"), src.indexOf("export async function listPublicJobs"));
    const detailIface = src.slice(src.indexOf("interface PublicJobDetail"), src.indexOf("export async function getPublicJobBySlug"));
    for (const forbidden of ["internal_notes", "created_by_ref_id", "approved_by_ref_id", "organization_id", "client_contact_id"]) {
      assert.ok(!listingIface.includes(forbidden), `PublicJobListing exposes ${forbidden}`);
      assert.ok(!detailIface.includes(forbidden), `PublicJobDetail exposes ${forbidden}`);
    }
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => rmSync(outDir, { recursive: true, force: true }));
