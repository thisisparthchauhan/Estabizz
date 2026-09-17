/**
 * Synthetic tests for the /solutions service-page system.
 *
 * The nine IPR pages are GENERATED from Word documents and rendered by one
 * shared component, which means a single malformed content file or a stale
 * registry entry breaks a page nobody is looking at. Three properties matter:
 *
 *   1. THE CONTENT SHAPE MUST HOLD. Every page needs a slug, a hero heading,
 *      sections with non-empty headings, unique section ids (they are the TOC
 *      anchors -- duplicates silently send the reader to the wrong section),
 *      and tables whose rows all match their header width.
 *
 *   2. THE THREE PLACES THAT LIST A PAGE MUST AGREE. The registry, the
 *      sitemap and the navbar's linkMap are maintained separately; a page can
 *      be published and left out of one of them without anything failing to
 *      build. A linkMap entry pointing at a /solutions URL with no registered
 *      page is a dead nav link.
 *
 *   3. THE GENERATED FILES MUST STAY GENERATED. They carry a "do not edit by
 *      hand" header; losing it invites someone to edit a file that the next
 *      regeneration will overwrite.
 *
 * No network, no database, no browser.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import Module, { createRequire } from "node:module";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = mkdtempSync(path.join(tmpdir(), "estabizz-solutions-"));

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

function read(rel) {
  return readFileSync(path.join(repoRoot, rel), "utf8");
}

function main() {
  const tsconfigPath = path.join(outDir, "tsconfig.json");
  writeFileSync(tsconfigPath, JSON.stringify({
    compilerOptions: {
      module: "commonjs", target: "es2020", moduleResolution: "node",
      esModuleInterop: true, skipLibCheck: true, resolveJsonModule: true,
      outDir: path.join(outDir, "out"), rootDir: repoRoot, baseUrl: repoRoot,
      paths: { "@/*": ["./*"] },
      typeRoots: [path.join(repoRoot, "node_modules/@types")], types: ["node"],
    },
    files: [path.join(repoRoot, "lib/content/services/registry.ts")],
  }));
  execFileSync("npx", ["tsc", "-p", tsconfigPath], { cwd: repoRoot, stdio: "pipe" });

  // tsc resolves the "@/" alias at compile time but emits it verbatim into the
  // require() calls, so the alias has to be taught to the CJS loader too --
  // same shim jobsSiteIntegrationTest.mjs uses.
  const outRoot = path.join(outDir, "out");
  const originalResolve = Module._resolveFilename;
  Module._resolveFilename = function (request, ...rest) {
    if (request.startsWith("@/")) {
      return originalResolve.call(this, path.join(outRoot, request.slice(2)), ...rest);
    }
    return originalResolve.call(this, request, ...rest);
  };

  const require = createRequire(import.meta.url);
  const { SOLUTION_CATEGORIES, getCategory, getServicePage, allServicePages } =
    require(path.join(outDir, "out", "lib/content/services/registry.js"));

  const pages = allServicePages();

  // ── 1. Content shape ──────────────────────────────────────────────────────
  console.log("\nEvery service page has a usable shape:");

  check("the registry actually contains pages", () => {
    assert.ok(pages.length > 0, "no service pages registered at all");
  });

  check("every page has a slug, a doc title and a hero heading", () => {
    for (const { category, page } of pages) {
      assert.ok(page.slug?.trim(), `${category}: a page has no slug`);
      assert.ok(page.docTitle?.trim(), `${category}/${page.slug}: no docTitle`);
      assert.ok(page.hero?.heading?.trim(), `${category}/${page.slug}: no hero heading`);
    }
  });

  check("slugs are URL-safe and unique within their category", () => {
    for (const category of SOLUTION_CATEGORIES) {
      const seen = new Set();
      for (const page of category.pages) {
        assert.match(page.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/,
          `${category.slug}/${page.slug}: slug is not lowercase-kebab`);
        assert.ok(!seen.has(page.slug),
          `${category.slug}: duplicate slug "${page.slug}" -- one page would shadow the other`);
        seen.add(page.slug);
      }
    }
  });

  check("section ids are unique per page (they are the TOC anchors)", () => {
    for (const { category, page } of pages) {
      const seen = new Set();
      for (const s of page.sections) {
        assert.ok(!seen.has(s.id),
          `${category}/${page.slug}: duplicate section id "${s.id}" -- the TOC link would jump to the wrong section`);
        seen.add(s.id);
      }
    }
  });

  check("no section id collides with the reserved FAQ anchor", () => {
    // ServicePageView renders the FAQ block at id="faqs"; a section that
    // slugified to the same value would produce two elements with one id.
    for (const { category, page } of pages) {
      for (const s of page.sections) {
        assert.notEqual(s.id, "faqs",
          `${category}/${page.slug}: a section uses the reserved id "faqs"`);
      }
    }
  });

  check("every section has a non-empty heading and at least one block", () => {
    for (const { category, page } of pages) {
      for (const s of page.sections) {
        assert.ok(s.heading?.trim(), `${category}/${page.slug}: section "${s.id}" has no heading`);
        assert.ok(Array.isArray(s.blocks), `${category}/${page.slug}: section "${s.id}" has no blocks array`);
      }
    }
  });

  check("every block is a known kind, and no paragraph is blank", () => {
    for (const { category, page } of pages) {
      for (const s of page.sections) {
        for (const b of s.blocks) {
          assert.ok(b.kind === "p" || b.kind === "table",
            `${category}/${page.slug}/${s.id}: unknown block kind "${b.kind}"`);
          if (b.kind === "p") {
            assert.ok(b.text?.trim(), `${category}/${page.slug}/${s.id}: empty paragraph`);
          }
        }
      }
    }
  });

  check("every table row matches its header width", () => {
    // A short row renders as a table with a missing cell; a long one spills
    // past the header and loses its column meaning.
    for (const { category, page } of pages) {
      for (const s of page.sections) {
        for (const b of s.blocks) {
          if (b.kind !== "table") continue;
          assert.ok(b.headers.length > 0, `${category}/${page.slug}/${s.id}: table with no headers`);
          b.rows.forEach((row, i) => {
            assert.equal(row.length, b.headers.length,
              `${category}/${page.slug}/${s.id}: row ${i} has ${row.length} cells, header has ${b.headers.length}`);
          });
        }
      }
    }
  });

  check("every page has FAQs, and each has both a question and an answer", () => {
    for (const { category, page } of pages) {
      assert.ok(page.faqs.length > 0, `${category}/${page.slug}: no FAQs -- the FAQPage markup would be empty`);
      for (const f of page.faqs) {
        assert.ok(f.question?.trim(), `${category}/${page.slug}: an FAQ has no question`);
        assert.ok(f.answer?.trim(), `${category}/${page.slug}: FAQ "${f.question}" has no answer`);
      }
    }
  });

  check("FAQ questions carry no leading source numbering", () => {
    // The Word documents number them ("1. What is …"); the renderer adds its
    // own index, so a surviving "1." would print as "1. 1. What is …".
    for (const { category, page } of pages) {
      for (const f of page.faqs) {
        assert.ok(!/^\d+\.\s/.test(f.question),
          `${category}/${page.slug}: FAQ question still carries its source number: "${f.question}"`);
      }
    }
  });

  check("every page carries the SEO fields its metadata needs", () => {
    for (const { category, page } of pages) {
      assert.ok(page.seo?.title?.trim(), `${category}/${page.slug}: no SEO title`);
      assert.ok(page.seo?.description?.trim(), `${category}/${page.slug}: no meta description`);
    }
  });

  // ── 2. Registry lookups ───────────────────────────────────────────────────
  console.log("\nRegistry lookups behave:");

  check("getCategory and getServicePage resolve every registered page", () => {
    for (const { category, page } of pages) {
      assert.ok(getCategory(category), `getCategory("${category}") returned nothing`);
      assert.ok(getServicePage(category, page.slug),
        `getServicePage("${category}", "${page.slug}") returned nothing`);
    }
  });

  check("unknown category and slug resolve to undefined, not a throw", () => {
    // The route calls notFound() on undefined; a throw would be a 500.
    assert.equal(getCategory("no-such-category"), undefined);
    assert.equal(getServicePage("ipr", "no-such-page"), undefined);
    assert.equal(getServicePage("no-such-category", "no-such-page"), undefined);
  });

  check("category slugs are unique and URL-safe", () => {
    const seen = new Set();
    for (const c of SOLUTION_CATEGORIES) {
      assert.match(c.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `category slug "${c.slug}" is not lowercase-kebab`);
      assert.ok(!seen.has(c.slug), `duplicate category slug "${c.slug}"`);
      seen.add(c.slug);
      assert.ok(c.label?.trim() && c.tagline?.trim(), `category "${c.slug}" is missing label or tagline`);
    }
  });

  check("every external service link is an internal absolute path", () => {
    for (const c of SOLUTION_CATEGORIES) {
      for (const svc of c.externalServices) {
        assert.ok(svc.href.startsWith("/"),
          `${c.slug}: external service "${svc.title}" points off-site: ${svc.href}`);
        assert.ok(svc.title?.trim() && svc.description?.trim(),
          `${c.slug}: external service is missing title or description`);
      }
    }
  });

  // ── 3. The three listings agree ───────────────────────────────────────────
  console.log("\nRegistry, sitemap and navbar agree:");

  check("the sitemap is built from the registry, not a hand-maintained list", () => {
    const src = read("app/sitemap.ts");
    assert.ok(src.includes("allServicePages"),
      "app/sitemap.ts does not call allServicePages() -- pages could be published and never listed");
    assert.ok(src.includes("SOLUTION_CATEGORIES"),
      "app/sitemap.ts does not enumerate SOLUTION_CATEGORIES");
  });

  check("every navbar linkMap /solutions URL resolves to a registered page", () => {
    const nav = read("components/layout/Navbar.tsx");
    const hrefs = [...nav.matchAll(/"([^"]*)":\s*"(\/solutions\/[^"]+)"/g)].map((m) => m[2]);
    assert.ok(hrefs.length > 0, "no /solutions entries found in linkMap at all");
    for (const href of hrefs) {
      const [, , category, slug] = href.split("/");
      assert.ok(getServicePage(category, slug),
        `linkMap points at ${href}, which is not a registered page -- dead nav link`);
    }
  });

  check("every registered page is reachable from the navbar linkMap", () => {
    const nav = read("components/layout/Navbar.tsx");
    for (const { category, page } of pages) {
      assert.ok(nav.includes(`/solutions/${category}/${page.slug}`),
        `/solutions/${category}/${page.slug} is registered but absent from the navbar`);
    }
  });

  check("every label used in a Solutions menu category exists in linkMap", () => {
    // An item with no linkMap entry renders grey with href="#".
    const nav = read("components/layout/Navbar.tsx");
    const solutionsBlock = nav.slice(nav.indexOf("Solutions: {"), nav.indexOf("};", nav.indexOf("Solutions: {")));
    const labels = [...solutionsBlock.matchAll(/items:\s*\[([^\]]*)\]/g)]
      .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
    assert.ok(labels.length > 0, "no menu items parsed from the Solutions block");
    for (const label of labels) {
      assert.ok(new RegExp(`"${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}":\\s*"`).test(nav),
        `Solutions menu shows "${label}" but linkMap has no entry -- it renders as a dead grey link`);
    }
  });

  // ── 4. Generated files stay generated ─────────────────────────────────────
  console.log("\nGenerated content files are marked as generated:");

  check("every content file under lib/content/services/*/ carries the header", () => {
    const base = path.join(repoRoot, "lib/content/services");
    const dirs = readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory());
    let seen = 0;
    for (const dir of dirs) {
      for (const file of readdirSync(path.join(base, dir.name)).filter((f) => f.endsWith(".ts"))) {
        const src = read(path.join("lib/content/services", dir.name, file));
        assert.ok(src.startsWith("// GENERATED FILE"),
          `${dir.name}/${file} is missing the "GENERATED FILE" header`);
        assert.ok(src.includes("Source:"), `${dir.name}/${file} does not record its source document`);
        seen += 1;
      }
    }
    assert.ok(seen > 0, "no content files found to check");
  });

  console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

main();
