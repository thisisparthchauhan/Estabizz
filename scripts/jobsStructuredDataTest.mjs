/**
 * Synthetic tests for JobPosting structured data.
 *
 * Two properties matter here and neither is cosmetic:
 *   1. INVALID MARKUP IS WORSE THAN NONE. Google penalises expired or
 *      incomplete postings, so a missing required field must produce null, not
 *      a partial object.
 *   2. THE BLOCK MUST NOT BE ESCAPABLE. Descriptions are admin-authored
 *      database content injected via dangerouslySetInnerHTML.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-jsonld-"));

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

const SITE = "https://staging.example";

function baseJob(overrides = {}) {
  return {
    title: "Compliance Analyst",
    slug: "compliance-analyst",
    description: "Own regulatory filings end to end.",
    department: "Compliance",
    location_text: "Mumbai, India",
    employment_type: "permanent",
    remote_policy: "on_site",
    min_years_experience: 3,
    salary_min: null,
    salary_max: null,
    salary_currency: null,
    salary_disclosed: false,
    closes_at: null,
    published_at: new Date("2026-09-01T00:00:00Z"),
    ...overrides,
  };
}

function main() {
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
      path.join(repoRoot, "lib/jobs/structuredData/jobPosting.ts"),
      path.join(repoRoot, "lib/seo/crawlPolicy.ts"),
    ],
  }));
  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  const require = createRequire(import.meta.url);
  const { buildJobPostingJsonLd, serializeJsonLd } =
    require(path.join(outDir, "out", "lib/jobs/structuredData/jobPosting.js"));
  const { isIndexableDeployment } =
    require(path.join(outDir, "out", "lib/seo/crawlPolicy.js"));

  const NOW = new Date("2026-09-12T00:00:00Z");

  console.log("\nRefuses to emit invalid markup:");
  check("an unpublished job produces no markup at all", () => {
    assert.equal(buildJobPostingJsonLd(baseJob({ published_at: null }), SITE, NOW), null);
  });
  check("a job with no title or no description produces nothing", () => {
    assert.equal(buildJobPostingJsonLd(baseJob({ title: "   " }), SITE, NOW), null);
    assert.equal(buildJobPostingJsonLd(baseJob({ description: "" }), SITE, NOW), null);
  });
  check("an already-closed job omits validThrough rather than publishing it", () => {
    // An expired validThrough makes Google drop the posting outright.
    const past = buildJobPostingJsonLd(baseJob({ closes_at: new Date("2026-08-01") }), SITE, NOW);
    assert.ok(!("validThrough" in past), "expired closing date was published");
  });
  check("a future closing date is published", () => {
    const future = buildJobPostingJsonLd(baseJob({ closes_at: new Date("2026-12-31") }), SITE, NOW);
    assert.equal(future.validThrough, "2026-12-31");
  });

  console.log("\nSalary is never published:");
  check("an undisclosed salary never reaches the markup", () => {
    const o = buildJobPostingJsonLd(baseJob({
      salary_disclosed: false, salary_min: "1200000", salary_max: "1800000", salary_currency: "INR",
    }), SITE, NOW);
    assert.ok(!("baseSalary" in o), "withheld salary leaked into structured data");
    assert.ok(!JSON.stringify(o).includes("1200000"), "salary figure leaked");
  });
  check("a DISCLOSED salary is not published either", () => {
    // Deliberate. salary_min/max are stored WITHOUT A UNIT and the page renders
    // them with a hard-coded "LPA" suffix, so a stored 8 means 8 lakh per annum.
    // Publishing that as a MonetaryAmount claimed the job paid 8 rupees a year
    // -- observed on deployed staging before this was removed. A wrong salary
    // in machine-readable markup is worse than none.
    const o = buildJobPostingJsonLd(baseJob({
      salary_disclosed: true, salary_min: "8", salary_max: "16", salary_currency: "INR",
    }), SITE, NOW);
    assert.ok(!("baseSalary" in o), "unit-less salary was published as a currency amount");
    const blob = JSON.stringify(o);
    assert.ok(!blob.includes("MonetaryAmount"), "a MonetaryAmount was emitted");
    assert.ok(!blob.includes("INR"), "a currency was emitted without a trustworthy amount");
  });
  check("the internal UUID is never published; identifier is the slug", () => {
    const o = buildJobPostingJsonLd(baseJob(), SITE, NOW);
    assert.equal(o.identifier.value, "compliance-analyst");
    assert.ok(
      !/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(JSON.stringify(o)),
      "a UUID appeared in the markup",
    );
  });

  console.log("\nField mapping:");
  check("employment types map onto Google's closed vocabulary", () => {
    const t = (v) => buildJobPostingJsonLd(baseJob({ employment_type: v }), SITE, NOW).employmentType;
    assert.equal(t("permanent"), "FULL_TIME");
    assert.equal(t("contract"), "CONTRACTOR");
    assert.equal(t("consulting"), "CONTRACTOR");
    assert.equal(t("fixed_term"), "TEMPORARY");
  });
  check("a remote job is flagged TELECOMMUTE", () => {
    assert.equal(
      buildJobPostingJsonLd(baseJob({ remote_policy: "remote" }), SITE, NOW).jobLocationType,
      "TELECOMMUTE",
    );
    assert.ok(!("jobLocationType" in buildJobPostingJsonLd(baseJob(), SITE, NOW)));
  });
  check("experience is expressed in months", () => {
    assert.equal(
      buildJobPostingJsonLd(baseJob({ min_years_experience: 3 }), SITE, NOW)
        .experienceRequirements.monthsOfExperience,
      36,
    );
    assert.ok(!("experienceRequirements" in buildJobPostingJsonLd(
      baseJob({ min_years_experience: null }), SITE, NOW)));
  });
  check("no country is invented from free-text location", () => {
    const o = buildJobPostingJsonLd(baseJob({ location_text: "Mumbai, India" }), SITE, NOW);
    assert.equal(o.jobLocation.address.addressLocality, "Mumbai, India");
    assert.ok(
      !("addressCountry" in o.jobLocation.address),
      "a country code was guessed from free text",
    );
  });
  check("url is absolute and built from the canonical site URL", () => {
    assert.equal(
      buildJobPostingJsonLd(baseJob(), "https://staging.example/", NOW).url,
      "https://staging.example/jobs/compliance-analyst",
    );
  });
  check("datePosted is present and ISO", () => {
    assert.equal(buildJobPostingJsonLd(baseJob(), SITE, NOW).datePosted, "2026-09-01");
  });

  console.log("\nThe script block cannot be escaped:");
  check("a description containing </script> cannot close the block", () => {
    const hostile = 'Great role.</script><script>fetch("https://evil.test")</script>';
    const html = serializeJsonLd(buildJobPostingJsonLd(baseJob({ description: hostile }), SITE, NOW));
    assert.ok(!html.includes("</script>"), "BREAKOUT: a closing script tag survived serialisation");
    assert.ok(!html.includes("<script"), "BREAKOUT: an opening script tag survived serialisation");
    assert.ok(!html.includes("<"), "a raw < survived serialisation");
  });
  check("escaping is lossless — a consumer still reads the original text", () => {
    const hostile = 'Great role.</script><x a="1" b=\'2\'>&amp;';
    const html = serializeJsonLd(buildJobPostingJsonLd(baseJob({ description: hostile }), SITE, NOW));
    assert.equal(JSON.parse(html).description, hostile, "escaping corrupted the payload");
  });
  check("U+2028 / U+2029 are escaped", () => {
    const html = serializeJsonLd(
      buildJobPostingJsonLd(baseJob({ description: "a b c" }), SITE, NOW));
    assert.ok(!html.includes(" ") && !html.includes(" "));
    assert.equal(JSON.parse(html).description, "a b c");
  });
  check("the serialised block is valid JSON", () => {
    const html = serializeJsonLd(buildJobPostingJsonLd(baseJob(), SITE, NOW));
    const parsed = JSON.parse(html);
    assert.equal(parsed["@context"], "https://schema.org");
    assert.equal(parsed["@type"], "JobPosting");
  });

  console.log("\nStaging must not be crawlable:");
  check("a Vercel preview deployment is not indexable", () => {
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "preview" }), false);
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "development" }), false);
  });
  check("an explicit staging APP_ENV is not indexable", () => {
    assert.equal(isIndexableDeployment({ APP_ENV: "staging" }), false);
    assert.equal(isIndexableDeployment({ NEXT_PUBLIC_APP_ENV: "staging" }), false);
    assert.equal(isIndexableDeployment({ APP_ENV: "development" }), false);
  });
  check("VERCEL_ENV=preview wins even if APP_ENV claims production", () => {
    // A preview deployment that inherited production env vars is exactly the
    // case worth catching.
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "preview", APP_ENV: "production" }), false);
  });
  check("production is indexable", () => {
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "production", APP_ENV: "production" }), true);
  });
  check("FAIL-SAFE: an unknown or empty environment stays indexable", () => {
    // The opposite default would deindex the live marketing site the day
    // someone mistypes a variable. That is the worse failure.
    assert.equal(isIndexableDeployment({}), true);
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "", APP_ENV: "" }), true);
    assert.equal(isIndexableDeployment({ VERCEL_ENV: "something-new" }), true);
  });
  check("casing and whitespace do not defeat the check", () => {
    assert.equal(isIndexableDeployment({ VERCEL_ENV: " Preview " }), false);
    assert.equal(isIndexableDeployment({ APP_ENV: "STAGING" }), false);
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

try { main(); } finally { rmSync(outDir, { recursive: true, force: true }); }
