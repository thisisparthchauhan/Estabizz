import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

// Guards the lead-attribution chain for /solutions/legal.
//
// ServicePageLayout builds its CTA as `/contact?service=<title>`, and the
// contact form pre-selects that value only when it appears in
// ALL_SERVICE_ITEMS. If a page title and its dropdown option drift apart the
// form still works -- it just opens unselected -- so nothing visibly breaks
// while every lead from that page silently arrives unattributed. That is
// exactly the failure this test exists to catch.

const LEGAL_DIR = 'app/solutions/legal';

function pageTitle(slug) {
  const contentPath = `${LEGAL_DIR}/${slug}/content.json`;
  if (existsSync(contentPath)) return JSON.parse(readFileSync(contentPath, 'utf8')).title;
  const src = readFileSync(`${LEGAL_DIR}/${slug}/PageClient.tsx`, 'utf8');
  const m = src.match(/^\s+title="([^"]+)"/m);
  return m ? m[1] : null;
}

const slugs = readdirSync(LEGAL_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
  .map((d) => d.name);

const titles = new Map(slugs.map((s) => [s, pageTitle(s)]));
const unresolved = [...titles].filter(([, t]) => !t).map(([s]) => s);
assert.deepEqual(unresolved, [], `pages with no resolvable title: ${unresolved.join(', ')}`);

// Every legal page must pass `faqs` so FAQPage schema is emitted.
const missingFaqs = slugs.filter((s) => {
  const src = readFileSync(`${LEGAL_DIR}/${s}/PageClient.tsx`, 'utf8');
  return !src.includes('faqs={') && !src.includes('SourceDocumentLegalPage');
});
assert.deepEqual(missingFaqs, [], `pages not passing faqs to the layout: ${missingFaqs.join(', ')}`);

// Every page title must be selectable in the contact form.
const contact = readFileSync('app/contact/ContactClient.tsx', 'utf8');
const grouped = contact
  .slice(contact.indexOf('const SERVICES_GROUPED'), contact.indexOf('const ALL_SERVICE_ITEMS'))
  // Strip // comments before scanning for quoted strings. An apostrophe in
  // prose ("each page's docTitle") otherwise opens a phantom string literal
  // and desynchronises every quote after it.
  .replace(/^\s*\/\/.*$/gm, '');
const options = new Set((grouped.match(/'(?:[^'\\]|\\.)*'/g) || []).map((q) => q.slice(1, -1).replace(/\\'/g, "'")));

const notSelectable = [...titles.values()].filter((t) => !options.has(t));
assert.deepEqual(
  notSelectable,
  [],
  `legal page titles with no matching contact-form option:\n  ${notSelectable.join('\n  ')}`,
);

// Same chain for the /solutions/ipr guides, which reach the form through
// ServicePageView using each page's `docTitle`.
const iprTitles = readdirSync('lib/content/services/ipr')
  .filter((f) => f.endsWith('.ts'))
  .map((f) => {
    const m = readFileSync(`lib/content/services/ipr/${f}`, 'utf8').match(/"docTitle":\s*"([^"]+)"/);
    return m ? m[1] : null;
  })
  .filter(Boolean);

assert.ok(iprTitles.length > 0, 'found no IPR docTitles to check');
const iprMissing = iprTitles.filter((t) => !options.has(t));
assert.deepEqual(
  iprMissing,
  [],
  `IPR docTitles with no matching contact-form option:\n  ${iprMissing.join('\n  ')}`,
);

console.log(
  `Contact service options: ${slugs.length} legal pages + ${iprTitles.length} IPR guides, ` +
  `all titles resolvable, all legal pages passing faqs, all selectable in the contact form PASS`,
);
