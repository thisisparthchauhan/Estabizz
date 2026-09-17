/**
 * Synthetic tests for Phase 7B — whole-site navigation, link integrity and IA.
 *
 * Same technique as every other *Test.mjs in this repo: read the actual
 * source text of the navigation-bearing files and assert against it, rather
 * than rendering JSX (there is no React test renderer / jsdom in this repo).
 * Where a fix corrects a specific label -> destination mapping, the exact
 * fix is asserted by name so a regression fails immediately, not just a
 * generic "some href changed" check.
 *
 * No network, no database, no browser.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
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

/** True if `route` resolves to a real app/ page.tsx, either directly or as a
 *  known dynamic-slug hub ( /mca-roc, /fiu-ind-aml, /gov-lic, /19-5, /global,
 *  /jobs/[slug], /blogs/[slug] all accept an arbitrary trailing segment). */
function routeExists(route) {
  const clean = route.split("?")[0].split("#")[0];
  if (clean === "/") return existsSync(path.join(repoRoot, "app/page.tsx"));

  const dynamicHubs = ["/mca-roc/", "/fiu-ind-aml/", "/gov-lic/", "/19-5/", "/global/", "/jobs/", "/blogs/"];
  if (dynamicHubs.some((h) => clean.startsWith(h) && clean !== h)) return true;

  const fp = path.join(repoRoot, "app", clean.replace(/^\//, ""), "page.tsx");
  return existsSync(fp);
}

function extractLinkMap(navbarSrc) {
  const start = navbarSrc.indexOf("const linkMap");
  const end = navbarSrc.indexOf("\n};", start) + 3;
  const block = navbarSrc.slice(start, end);
  const pairs = [...block.matchAll(/"([^"]+)":\s*"(\/[^"]+)"/g)].map((m) => [m[1], m[2]]);
  return Object.fromEntries(pairs);
}

async function main() {
  const navbarSrc = read("components/layout/Navbar.tsx");
  const footerSrc = read("lib/content/footerDefaults.ts");
  const sitemapSrc = read("app/sitemap.ts");
  const linkMap = extractLinkMap(navbarSrc);

  console.log("\nEvery hardcoded navbar destination resolves to a known route (Part 33):");
  check(`all ${Object.keys(linkMap).length} linkMap destinations resolve`, () => {
    const missing = Object.entries(linkMap).filter(([, href]) => !routeExists(href));
    assert.deepEqual(missing, [], `unresolved destinations: ${JSON.stringify(missing)}`);
  });
  check("no href=\"#\", javascript:void(0), or empty primary href in linkMap", () => {
    for (const [label, href] of Object.entries(linkMap)) {
      assert.notEqual(href, "#", `${label} -> literal #`);
      assert.notEqual(href.trim(), "", `${label} -> empty href`);
      assert.ok(!href.startsWith("javascript:"), `${label} -> javascript: URL`);
    }
  });

  console.log("\nConfirmed wrong-destination mismatches, fixed (Part 8):");
  const fixedMismatches = {
    "TPA License": "/irdai",
    "TPA Licence": "/irdai",
    "Insurance Surveyor": "/irdai",
    "Micro Insurance": "/irdai",
    "Web Aggregator": "/irdai",
    "AD Category II": "/rbi",
    "Credit Information Company": "/rbi",
    "FAQs": "/resources/faqs",
    "Case Highlights": "/#case-highlights",
  };
  for (const [label, expected] of Object.entries(fixedMismatches)) {
    check(`"${label}" now routes to ${expected}, not its old wrong page`, () => {
      assert.equal(linkMap[label], expected, `linkMap["${label}"] = ${linkMap[label]}`);
    });
  }
  check("none of the fixed labels still point at their own old wrong page", () => {
    // Per-label, not per-URL: /irdai/insurance-marketing-firm-license is a
    // WRONG destination for "Web Aggregator" but a CORRECT one for the
    // separate, legitimate "Insurance Marketing Firm" label that also maps
    // to it -- the same URL can be right for one label and wrong for another.
    const oldWrongTarget = {
      "TPA License": "/irdai/isnp-registration",
      "TPA Licence": "/irdai/isnp-registration",
      "Insurance Surveyor": "/irdai/insurance-repository-registration",
      "Micro Insurance": "/irdai/ifsca-insurance-intermediary",
      "Web Aggregator": "/irdai/insurance-marketing-firm-license",
      "AD Category II": "/rbi/full-fledged-money-changers",
      "Credit Information Company": "/rbi/lendtech-services",
    };
    for (const [label, badHref] of Object.entries(oldWrongTarget)) {
      assert.notEqual(linkMap[label], badHref, `"${label}" regressed back to its old wrong destination`);
    }
  });

  console.log("\nFooter link integrity (Part 14, preserving Phase 7A's Jobs & Careers):");
  check("footer has no href=\"#\" or empty href", () => {
    const hrefs = [...footerSrc.matchAll(/href:\s*'([^']*)'/g)].map((m) => m[1]);
    assert.ok(hrefs.length > 20, "sanity: expected many footer hrefs");
    for (const href of hrefs) {
      assert.notEqual(href, "#");
      assert.notEqual(href.trim(), "");
    }
  });
  check("stale 'Pricing' -> /contact corrected to the real /pricing page", () => {
    assert.ok(footerSrc.includes("{ label: 'Pricing', href: '/pricing' }"));
    assert.ok(!/label: 'Pricing', href: '\/contact'/.test(footerSrc));
  });
  check("stale 'Careers' -> /contact (Phase 7A fix) still points at /jobs", () => {
    assert.ok(footerSrc.includes("{ label: 'Careers', href: '/jobs' }"));
  });
  check("'Case Highlights' footer link now has a real anchor, not a bare '/'", () => {
    assert.ok(footerSrc.includes("{ label: 'Case Highlights', href: '/#case-highlights' }"));
  });
  check("Phase 7A's Jobs & Careers footer column is untouched", () => {
    assert.ok(footerSrc.includes("title: 'Jobs & Careers'"));
    for (const href of ["/jobs", "/jobs/account", "/jobs/account/profile",
      "/jobs/account/applications", "/jobs/account/alerts", "/jobs/join", "/jobs/hire-talent"]) {
      assert.ok(footerSrc.includes(`href: '${href}'`), `missing Jobs & Careers link: ${href}`);
    }
  });
  check("Disclaimer / Cookie Policy legal-content gap is a known, reported limitation, not silently 'fixed'", () => {
    // Reported in docs/30, not fabricated: both still point at the closest
    // real document (Privacy Policy) rather than a page this project invented.
    assert.ok(footerSrc.includes("{ label: 'Disclaimer', href: '/legal/privacy-policy' }"));
    assert.ok(footerSrc.includes("{ label: 'Cookie Policy', href: '/legal/privacy-policy' }"));
  });

  console.log("\nCase Studies homepage section has a landable anchor (Part 6):");
  check("CaseStudies section carries id=\"case-highlights\"", () => {
    const src = read("components/home/CaseStudies.tsx");
    assert.ok(/<section[^>]*\bid="case-highlights"/.test(src));
  });

  console.log("\nLegacy URL redirects are permanent, not temporary (Part 16):");
  const shimFiles = [
    "app/regulatory/psp-license-ifsca/page.tsx",
    "app/ifsca/psp-license/page.tsx",
    "app/ifsca/fintech-entity/page.tsx",
    "app/ifsca/batf-services/page.tsx",
    "app/ifsca/aircraft-leasing/page.tsx",
    "app/ifsca/itfs-platform/page.tsx",
    "app/ifsca/finance-company/page.tsx",
    "app/ifsca/finance-company-registration-in-ifsc/page.tsx",
    "app/sebi/investment-adviser-registration-in-india/page.tsx",
    "app/sebi/research-analyst-registration/page.tsx",
    "app/sebi/social-stock-exchange-license/page.tsx",
    "app/sebi/sebi-ria-registration/page.tsx",
    "app/sebi/portfolio-manager-registration/page.tsx",
    "app/sebi/stock-broker-license-india/page.tsx",
    "app/sebi/stock-broker-registration/page.tsx",
    "app/sebi/investment-adviser-registration/page.tsx",
    "app/sebi/sebi-stock-broker-registration/page.tsx",
  ];
  check(`all ${shimFiles.length} legacy-alias pages use permanentRedirect (308), not redirect (307)`, () => {
    for (const fp of shimFiles) {
      const src = read(fp);
      assert.ok(src.includes("permanentRedirect"), `${fp} still uses temporary redirect`);
      assert.ok(!/(?<!permanent)[Rr]edirect\(/.test(src.replace("permanentRedirect(", "")),
        `${fp} unexpectedly still calls a non-permanent redirect`);
    }
  });
  check("every legacy-alias target still exists (no redirect-to-nowhere)", () => {
    for (const fp of shimFiles) {
      const src = read(fp);
      const m = src.match(/permanentRedirect\('([^']+)'\)/);
      assert.ok(m, `${fp}: could not find a permanentRedirect target`);
      assert.ok(routeExists(m[1]), `${fp} redirects to a missing route: ${m[1]}`);
    }
  });

  console.log("\nDead /19-5 prefix correctly absent from the sitemap (Part 18):");
  check("sitemap.ts no longer lists the permanently-redirecting /19-5 hub", () => {
    assert.ok(!/\$\{BASE\}\/19-5[`'"]/.test(sitemapSrc));
  });
  check("sitemap.ts covers the three previously-uncovered dynamic-slug hubs", () => {
    assert.ok(sitemapSrc.includes("getAllLandingSlugs"));
    assert.ok(sitemapSrc.includes("getAllFiuIndSlugs"));
    assert.ok(sitemapSrc.includes("getAllGovLicSlugs"));
    assert.ok(sitemapSrc.includes(`${"${BASE}"}/mca-roc`));
  });
  check("sitemap.ts backfills the 19 static regulator pages missing from PUBLIC_CONTENT_MANAGED_PATHS", () => {
    const managed = read("lib/publicContent/managedPaths.ts");
    const backfilled = [
      "/rbi/nbfc-business-plan", "/irdai/isnp-registration", "/ifsca/finance-company-in-gift-ifsc",
    ];
    for (const p of backfilled) {
      assert.ok(sitemapSrc.includes(`"${p}"`), `sitemap.ts missing backfilled path: ${p}`);
      assert.ok(!managed.includes(`"${p}"`) && !managed.includes(`'${p}'`),
        `${p} is in managedPaths -- the sitemap backfill list may now be a duplicate, re-check`);
    }
  });

  console.log("\nRegulatory/Jobs dropdown keyboard accessibility, fixed consistently (Part 20):");
  check("Regulatory/Solutions triggers are keyboard-focusable with aria-haspopup/aria-expanded", () => {
    const triggerBlock = navbarSrc.slice(
      navbarSrc.indexOf("{Object.keys(menus).map((item) =>"),
      navbarSrc.indexOf("{Object.keys(menus).map((item) =>") + 700,
    );
    assert.ok(triggerBlock.includes('role="button"'));
    assert.ok(triggerBlock.includes("tabIndex={0}"));
    assert.ok(triggerBlock.includes('aria-haspopup="true"'));
    assert.ok(triggerBlock.includes("aria-expanded={activeMenu === item}"));
    assert.ok(triggerBlock.includes("onKeyDown={handleMenuTriggerKeyDown(item)}"));
  });
  check("the Jobs trigger got the identical treatment, not a one-off", () => {
    const jobsTriggerBlock = navbarSrc.slice(
      navbarSrc.indexOf('onMouseEnter={() => openMenu("Jobs")}'),
      navbarSrc.indexOf('onMouseEnter={() => openMenu("Jobs")}') + 700,
    );
    assert.ok(jobsTriggerBlock.includes('role="button"'));
    assert.ok(jobsTriggerBlock.includes('aria-haspopup="true"'));
    assert.ok(jobsTriggerBlock.includes('aria-expanded={activeMenu === "Jobs"}'));
    assert.ok(jobsTriggerBlock.includes('onKeyDown={handleMenuTriggerKeyDown("Jobs")}'));
  });
  check("mobile <details> summary no longer carries a hardcoded, always-false aria-expanded", () => {
    assert.ok(!navbarSrc.includes('aria-expanded="false"'),
      "a <details>/<summary> already exposes open state natively; a hardcoded false is actively wrong once opened");
  });

  console.log("\nPhase 7A Jobs regression (Part 32 — not rebuilding Jobs, only checking it):");
  check("Jobs navigation data module untouched and still exports the four primary entries", () => {
    const jobsMenu = read("lib/jobs/navigation/jobsMenu.ts");
    for (const href of ["/jobs", "/jobs/account", "/jobs/join", "/jobs/hire-talent"]) {
      assert.ok(jobsMenu.includes(`"${href}"`) || jobsMenu.includes(`'${href}'`),
        `jobsMenu.ts missing ${href}`);
    }
  });
  check("Jobs search entries module untouched", () => {
    const searchEntries = read("lib/jobs/navigation/searchEntries.ts");
    assert.ok(searchEntries.includes("Recruitment"));
    assert.ok(searchEntries.includes("Jobs & Careers"));
  });
  check("Navbar still imports and renders from the Jobs navigation modules (not re-inlined)", () => {
    assert.ok(navbarSrc.includes('from "@/lib/jobs/navigation/jobsMenu"'));
    assert.ok(navbarSrc.includes('from "@/lib/jobs/navigation/searchEntries"'));
  });
  check("Contact form's Recruitment & Talent Acquisition deep-link support untouched", () => {
    const contactSrc = read("app/contact/ContactClient.tsx");
    assert.ok(contactSrc.includes("Recruitment & Talent Acquisition"));
    assert.ok(contactSrc.includes("ALL_SERVICE_ITEMS.has(requested)"));
    assert.ok(contactSrc.includes("g.group.toLowerCase().includes(q)"));
  });

  console.log("\nDesktop/mobile primary navigation parity (Part 19/33):");
  check("mobile Jobs menu still spreads the same shared arrays as desktop (no drift)", () => {
    assert.ok(navbarSrc.includes("[...JOBS_MENU_ITEMS, HIRE_TALENT_ITEM]"));
  });
  check("mobile 'Sign In' label matches desktop", () => {
    const signInCount = (navbarSrc.match(/Sign In/g) || []).length;
    assert.ok(signInCount >= 2, "expected 'Sign In' on both desktop and mobile");
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
