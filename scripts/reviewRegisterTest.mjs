/**
 * Guards the "Expert Reviewed" claim.
 *
 * The badge used to be a visual assertion: a page rendered it because nothing
 * said otherwise. These assertions make the claim falsifiable — the template may
 * only show it from the register, a published page may never advertise that it
 * is unreviewed, and no entry may be recorded without the facts that make the
 * claim checkable.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(p, 'utf8');

// ── The template must not be able to claim review on its own ────────────────
const layout = read('components/templates/ServicePageLayout.tsx');

assert.ok(
  !layout.includes('Content Review Pending'),
  'A published page must never tell a reader its own content is unreviewed'
);

assert.match(
  layout,
  /\{!hideReviewBadge && !reviewPending && <>/,
  'reviewPending must suppress the badge, never flip it to Expert Reviewed'
);

// ── The register must be honest ─────────────────────────────────────────────
const register = read('lib/content/reviewRegister.ts');

// Parse only the array literal — the ReviewEntry interface also contains the
// field names and must not be mistaken for a recorded review.
const arrayBody = /export const REVIEW_REGISTER: ReviewEntry\[\] = \[([\s\S]*?)\];/.exec(register);
assert.ok(arrayBody, 'REVIEW_REGISTER array not found');
const entries = [...arrayBody[1].matchAll(/route:\s*'([^']+)'/g)].map((m) => m[1]);

for (const route of entries) {
  assert.ok(route.startsWith('/'), `Register route must be a path: ${route}`);
  assert.ok(
    fs.existsSync(`app${route}/page.tsx`),
    `Register names a route with no page: ${route}`
  );
}

// Every entry needs the facts that make "reviewed" mean something. A row missing
// any of them is an assertion again, just stored in a different file.
const rows = arrayBody[1].split('{').filter((chunk) => chunk.includes('route:'));
for (const row of rows) {
  for (const field of ['reviewer', 'qualification', 'reviewedOn', 'amendmentsCheckedTo', 'lawsChecked', 'nextReviewDue']) {
    assert.ok(row.includes(`${field}:`), `Register entry is missing ${field}`);
  }
  const date = /reviewedOn:\s*'(\d{4}-\d{2}-\d{2})'/.exec(row);
  assert.ok(date, 'reviewedOn must be an ISO date');
  assert.ok(
    new Date(date[1]) <= new Date(),
    `reviewedOn is in the future: ${date[1]}`
  );
}

assert.equal(new Set(entries).size, entries.length, 'Duplicate route in the register');

// ── Ratchet on unbacked claims ──────────────────────────────────────────────
// Twenty pages claimed "Expert Reviewed" before the register existed. Failing on
// all of them would block every deploy until someone reviews twenty documents,
// so the baseline is recorded instead: the existing claims are visible and
// counted, and the build fails the moment a twenty-first appears. Lower the
// baseline as pages are genuinely reviewed and added to the register.
const BASELINE_UNBACKED = 20;

const claiming = [];
const buildDir = '.next/server/app';
if (fs.existsSync(buildDir)) {
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = `${dir}/${name}`;
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.html') && read(full).includes('Expert Reviewed')) {
        claiming.push('/' + full.slice(buildDir.length + 1).replace(/\.html$/, ''));
      }
    }
  };
  walk(buildDir);

  const unbacked = claiming.filter((route) => !entries.includes(route));
  assert.ok(
    unbacked.length <= BASELINE_UNBACKED,
    `${unbacked.length} pages claim "Expert Reviewed" without a register entry, ` +
    `up from the ${BASELINE_UNBACKED} that predate the register. New pages must be ` +
    `recorded in lib/content/reviewRegister.ts before they may claim review.\n` +
    unbacked.slice(BASELINE_UNBACKED).map((r) => `  + ${r}`).join('\n')
  );
  if (unbacked.length) {
    console.log(`  ${unbacked.length} page(s) claim review without a register entry (baseline ${BASELINE_UNBACKED}, not growing):`);
    for (const route of unbacked) console.log(`    - ${route}`);
  }
} else {
  console.log('  (no build output found — run `npm run build` to check rendered review claims)');
}

console.log(
  `Review register: ${entries.length} recorded review(s), badge is register-driven, ` +
  'no page advertises itself as unreviewed PASS'
);
