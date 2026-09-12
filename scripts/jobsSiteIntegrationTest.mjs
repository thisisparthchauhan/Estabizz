/**
 * Synthetic tests for Phase 7A — Jobs/Candidate/Recruitment site integration.
 *
 * Covers the navigation DATA (JOBS_MENU_ITEMS, the candidate user-menu items,
 * the global search entries) and the FOOTER data as plain, pure-function
 * checks -- the same technique every other jobs*Test.mjs uses, since this repo
 * has no React rendering test infrastructure (no jsdom / testing-library /
 * jest / vitest) to mount Navbar.tsx itself.
 *
 * Where a property genuinely lives in JSX (mobile reusing the same desktop
 * data source; no legacy mailto CV bypass) this asserts against the actual
 * page/component source text instead of guessing -- a real regression in
 * either would fail these checks the same day it happened.
 *
 * No network, no database, no browser.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import Module, { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-jobs-site-integration-"));

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

/** Mirrors Navbar's own search-matching algorithm exactly (see
 *  components/layout/Navbar.tsx searchResults useMemo): substring match
 *  against `${label} ${href} ${group}`.toLowerCase(). Re-implemented here
 *  rather than imported because it lives inline in a "use client" component
 *  with no exported function to call. */
function matchesQuery(entry, query) {
  const keywords = `${entry.label} ${entry.href} ${entry.group}`.toLowerCase();
  return keywords.includes(query.toLowerCase());
}

async function main() {
  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        module: "commonjs",
        target: "es2020",
        moduleResolution: "node",
        esModuleInterop: true,
        skipLibCheck: true,
        outDir: path.join(outDir, "out"),
        rootDir: repoRoot,
        baseUrl: repoRoot,
        paths: { "@/*": ["./*"] },
        typeRoots: [path.join(repoRoot, "node_modules/@types")],
        types: ["node"],
      },
      files: [
        path.join(repoRoot, "lib/jobs/candidateAccount/navigation.ts"),
        path.join(repoRoot, "lib/jobs/navigation/jobsMenu.ts"),
        path.join(repoRoot, "lib/jobs/navigation/searchEntries.ts"),
        path.join(repoRoot, "lib/jobs/candidateIdentity/redirects.ts"),
      ],
    }),
  );

  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  // tsc's `paths` mapping only affects TYPE CHECKING; the emitted JS still
  // contains the literal require("@/..."). jobsMenu.js has a real runtime
  // import (CANDIDATE_ACCOUNT_NAV_ITEMS), unlike the type-only "@/" imports
  // the other jobs*Test.mjs files compile against, so it needs an actual
  // runtime alias -- resolve "@/x" to the compiled "out/x" tree, mirroring
  // the same baseUrl/paths mapping tsc used to type-check it.
  const outRoot = path.join(outDir, "out");
  const originalResolve = Module._resolveFilename;
  Module._resolveFilename = function (request, ...rest) {
    if (request.startsWith("@/")) {
      return originalResolve.call(this, path.join(outRoot, request.slice(2)), ...rest);
    }
    return originalResolve.call(this, request, ...rest);
  };

  const require = createRequire(import.meta.url);
  const out = (p) => path.join(outRoot, p);
  const accountNav = require(out("lib/jobs/candidateAccount/navigation.js"));
  const jobsMenu = require(out("lib/jobs/navigation/jobsMenu.js"));
  const searchEntries = require(out("lib/jobs/navigation/searchEntries.js"));
  const redirects = require(out("lib/jobs/candidateIdentity/redirects.js"));

  console.log("\nJobs dropdown (desktop + mobile share this data):");
  check("exactly the three primary Jobs entries, in order", () => {
    const hrefs = jobsMenu.JOBS_MENU_ITEMS.map((i) => i.href);
    assert.deepEqual(hrefs, ["/jobs", "/jobs/account", "/jobs/join"]);
  });
  check("Hire Talent is a distinct item, not folded into the primary list", () => {
    assert.equal(jobsMenu.HIRE_TALENT_ITEM.href, "/jobs/hire-talent");
    assert.ok(!jobsMenu.JOBS_MENU_ITEMS.some((i) => i.href === "/jobs/hire-talent"));
  });
  check("Privacy never appears in the Jobs dropdown", () => {
    assert.ok(!jobsMenu.JOBS_MENU_ITEMS.some((i) => i.href.includes("privacy")));
    assert.ok(jobsMenu.HIRE_TALENT_ITEM.href && !jobsMenu.HIRE_TALENT_ITEM.href.includes("privacy"));
  });
  check("every item has a non-empty label, href and description", () => {
    for (const item of [...jobsMenu.JOBS_MENU_ITEMS, jobsMenu.HIRE_TALENT_ITEM]) {
      assert.ok(item.label && item.href && item.description, JSON.stringify(item));
      assert.ok(item.href.startsWith("/"), `not an internal path: ${item.href}`);
    }
  });

  console.log("\nCandidate account menu (auth-aware user dropdown):");
  const candidateMenu = jobsMenu.getCandidateUserMenuItems();
  check("Privacy is excluded from the global user-menu, unlike the in-account tab bar", () => {
    assert.ok(accountNav.CANDIDATE_ACCOUNT_NAV_ITEMS.some((i) => i.href === "/jobs/account/privacy"),
      "test assumption stale: Privacy no longer in the in-account tabs at all");
    assert.ok(!candidateMenu.some((i) => i.href === "/jobs/account/privacy"));
  });
  check("dashboard entry is relabelled for clarity outside the account area", () => {
    const dash = candidateMenu.find((i) => i.href === "/jobs/account");
    assert.equal(dash.label, "Candidate Dashboard");
  });
  check("covers Profile, Applications, Saved Jobs and Job Alerts", () => {
    const hrefs = candidateMenu.map((i) => i.href);
    assert.deepEqual(hrefs, [
      "/jobs/account",
      "/jobs/account/profile",
      "/jobs/account/applications",
      "/jobs/account/saved",
      "/jobs/account/alerts",
    ]);
  });
  check("cannot drift from the in-account tab bar: same source minus Privacy", () => {
    const inAccountHrefs = accountNav.CANDIDATE_ACCOUNT_NAV_ITEMS
      .map((i) => i.href).filter((h) => h !== "/jobs/account/privacy");
    assert.deepEqual(candidateMenu.map((i) => i.href), inAccountHrefs);
  });

  console.log("\nGlobal search — Jobs routes discoverable, no candidate data (Part 5.1):");
  const REQUIRED_QUERIES = [
    "jobs", "job", "career", "candidate", "profile", "application",
    "saved jobs", "job alerts", "join estabizz", "hire talent", "recruitment",
  ];
  for (const query of REQUIRED_QUERIES) {
    check(`"${query}" returns a meaningful Jobs destination`, () => {
      const hits = searchEntries.JOBS_SEARCH_ENTRIES.filter((e) => matchesQuery(e, query));
      assert.ok(hits.length > 0, `no search entry matched "${query}"`);
      assert.ok(hits.every((h) => h.href.startsWith("/jobs")), `matched a non-Jobs route: ${JSON.stringify(hits)}`);
    });
  }
  check("every entry is label/href/group only -- no candidate data fields", () => {
    for (const entry of searchEntries.JOBS_SEARCH_ENTRIES) {
      assert.deepEqual(Object.keys(entry).sort(), ["group", "href", "label"]);
      assert.ok(!/\d{4,}/.test(entry.label), `label looks like it might carry real data: ${entry.label}`);
    }
  });
  check("no entry duplicates an href already in the JOBS_MENU_ITEMS/candidate set", () => {
    // Not a hard requirement, but two entries with the same href and different
    // labels would be confusing in a results list -- catch it if it happens.
    const seen = new Map();
    for (const e of searchEntries.JOBS_SEARCH_ENTRIES) {
      if (seen.has(e.href)) assert.fail(`duplicate href in search entries: ${e.href}`);
      seen.set(e.href, e.label);
    }
  });

  console.log("\nAuth redirect safety (Part 12 — new /jobs/join consumer):");
  check("buildSignupHref produces a safe, internal, round-trippable path", () => {
    const href = redirects.buildSignupHref("/jobs/account/profile");
    assert.equal(href, "/signup?redirect=%2Fjobs%2Faccount%2Fprofile");
  });
  check("buildSignupHref cannot be used to redirect off-site", () => {
    const href = redirects.buildSignupHref("https://evil.example/phish");
    assert.equal(href, `/signup?redirect=${encodeURIComponent("/")}`);
  });

  console.log("\nFooter — Jobs & Careers group actually renders (Part 10 + 13):");
  const footerSrc = read("lib/content/footerDefaults.ts");
  const footerCompiled = compileAndRequire("lib/content/footerDefaults.ts", "FOOTER_DEFAULTS");
  check("a 'Jobs & Careers' column exists with the seven target links", () => {
    const col = footerCompiled.FOOTER_DEFAULTS.columns.find((c) => c.title === "Jobs & Careers");
    assert.ok(col, "Jobs & Careers column not found");
    assert.deepEqual(col.links.map((l) => l.href), [
      "/jobs",
      "/jobs/account",
      "/jobs/account/profile",
      "/jobs/account/applications",
      "/jobs/account/alerts",
      "/jobs/join",
      "/jobs/hire-talent",
    ]);
  });
  check("the column is not one of Footer.tsx's excluded titles", () => {
    // Footer.tsx hides 'Compliance Portal' and 'Company & Network' outright.
    // Cross-checked against Footer.tsx source rather than hardcoded twice.
    const footerComponentSrc = read("components/layout/Footer.tsx");
    const excludedMatch = footerComponentSrc.match(/EXCLUDED_COL_TITLES = new Set\(\[([^\]]+)\]\)/);
    assert.ok(excludedMatch, "could not locate EXCLUDED_COL_TITLES in Footer.tsx");
    assert.ok(!excludedMatch[1].includes("Jobs & Careers"), "Jobs & Careers column would be hidden");
  });
  check("the stale 'Careers' -> /contact link is corrected even though its column is hidden", () => {
    const companyCol = footerCompiled.FOOTER_DEFAULTS.columns.find((c) => c.title === "Company & Network");
    const careersLink = companyCol.links.find((l) => l.label === "Careers");
    assert.equal(careersLink.href, "/jobs");
  });
  check("no CMS-editable quickLink duplicates the new Jobs dropdown", () => {
    // navbarDefaults.ts is a separate file/compile unit; check its source text
    // directly rather than adding a second tsc invocation.
    const navDefaultsSrc = read("lib/content/navbarDefaults.ts");
    assert.ok(!/href:\s*'\/jobs'/.test(navDefaultsSrc), "a flat '/jobs' quickLink would duplicate the Jobs dropdown");
  });
  void footerSrc; // read for future assertions; keeping the read visible above.

  console.log("\nNo legacy mailto CV bypass as the primary CTA (Part 7):");
  const publicJobsSrc = read("app/jobs/PublicJobsClient.tsx");
  check("the old 'Send Your CV' label is gone", () => {
    assert.ok(!publicJobsSrc.includes("Send Your CV"));
  });
  check("the old 'Get in Touch' mailto-primary CTA label is gone", () => {
    assert.ok(!publicJobsSrc.includes(">Get in Touch<"));
  });
  check("the candidate-profile flow (Join Estabizz) is now the primary CTA", () => {
    assert.ok(publicJobsSrc.includes('href="/jobs/join"'));
    assert.ok(publicJobsSrc.includes("Join Estabizz"));
  });
  check("a secondary recruitment-email fallback still exists (Part 7 explicitly keeps it)", () => {
    const mailtoCount = (publicJobsSrc.match(/href="mailto:/g) || []).length;
    assert.equal(mailtoCount, 1, "expected exactly one secondary mailto fallback, not zero and not two primary CTAs");
  });
  check("job search now covers skill, not just title/department/location", () => {
    assert.ok(publicJobsSrc.includes("skills_list"));
  });

  console.log("\nMobile Jobs menu reuses the desktop data source (Part 4 — no desktop-only functionality):");
  const navbarSrc = read("components/layout/Navbar.tsx");
  check("mobile Jobs <details> block spreads JOBS_MENU_ITEMS + HIRE_TALENT_ITEM, not a hand-duplicated list", () => {
    assert.ok(
      navbarSrc.includes("[...JOBS_MENU_ITEMS, HIRE_TALENT_ITEM]"),
      "mobile menu does not visibly reuse the shared Jobs navigation data -- check it hasn't been hardcoded separately",
    );
  });
  check("mobile candidate-account block reuses CANDIDATE_USER_MENU_ITEMS", () => {
    const mobileAuthSection = navbarSrc.slice(navbarSrc.indexOf("Mobile Menu"));
    assert.ok(mobileAuthSection.includes("CANDIDATE_USER_MENU_ITEMS.map"));
  });
  check("logged-out mobile CTA says Sign In, matching desktop", () => {
    assert.ok(navbarSrc.includes('>Sign In</Link>'));
  });

  console.log("\nHire Talent routes into the existing contact pipeline, not a new backend (Part 9):");
  const contactSrc = read("app/contact/ContactClient.tsx");
  check("a Recruitment & Talent Acquisition service option exists", () => {
    assert.ok(contactSrc.includes("Recruitment & Talent Acquisition"));
    assert.ok(contactSrc.includes("Hire Talent / Submit a Hiring Requirement"));
  });
  check("the service query param is validated against the known list, not trusted directly", () => {
    assert.ok(contactSrc.includes("ALL_SERVICE_ITEMS.has(requested)"));
  });
  const hireTalentSrc = read("app/jobs/hire-talent/page.tsx");
  check("Hire Talent page CTA deep-links into the validated service option", () => {
    assert.ok(hireTalentSrc.includes("Hire Talent / Submit a Hiring Requirement"));
    assert.ok(hireTalentSrc.includes("encodeURIComponent"));
  });
  check("Hire Talent does not claim a client dashboard that doesn't exist", () => {
    // Check the rendered JSX only (from the `return (` onward) -- the file's
    // own explanatory comment above the component names "client dashboard"
    // as the thing NOT being built, which would otherwise false-positive here.
    const rendered = hireTalentSrc.slice(hireTalentSrc.indexOf("return ("));
    assert.ok(!/dashboard/i.test(rendered), "rendered Hire Talent page should not reference a client dashboard");
  });

  console.log("\nJoin Estabizz does not duplicate the Jobs data model (Part 8):");
  const joinSrc = read("app/jobs/join/page.tsx");
  check("uses the existing candidate signup/profile flow, not a new form", () => {
    assert.ok(joinSrc.includes("buildSignupHref"));
    assert.ok(joinSrc.includes("/jobs/account/profile"));
  });
  check("peeks at auth state without enforcing a redirect (public page)", () => {
    assert.ok(joinSrc.includes("getAuthSession()"));
    assert.ok(!joinSrc.includes("requireCandidateAccountSessionForPage"), "would incorrectly gate a public page");
  });

  console.log("\nSitemap includes the new public entry points:");
  const sitemapSrc = read("app/sitemap.ts");
  check("Join Estabizz and Hire Talent are in the sitemap", () => {
    assert.ok(sitemapSrc.includes("/jobs/join"));
    assert.ok(sitemapSrc.includes("/jobs/hire-talent"));
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

/** Compiles and requires a single plain-data .ts file that has no @/ imports
 *  of its own (footerDefaults.ts). Kept separate from the main tsconfig
 *  compile above because it exports a default-style named object under a
 *  different directory layout. */
function compileAndRequire(relPath, exportName) {
  const localOut = path.join(outDir, "footer-out");
  execFileSync(
    "npx",
    [
      "tsc", "--module", "commonjs", "--target", "es2020", "--moduleResolution", "node",
      "--esModuleInterop", "--skipLibCheck", "--outDir", localOut, path.join(repoRoot, relPath),
    ],
    { cwd: repoRoot, stdio: "pipe" },
  );
  const require = createRequire(import.meta.url);
  const mod = require(path.join(localOut, path.basename(relPath).replace(/\.ts$/, ".js")));
  assert.ok(mod[exportName], `${exportName} not found in compiled ${relPath}`);
  return mod;
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => rmSync(outDir, { recursive: true, force: true }));
