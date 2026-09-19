import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const routes = ['/sebi/aif-compliance-test-report', '/fema/compliance-under-fema', '/services/finance-accounting-outsourcing', '/services/gst-appeal-services', '/services/legal-process-outsourcing', '/services/legal-due-diligence'];
const tableCounts = [12, 10, 11, 12, 5, 9];
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

for (const route of routes) {
  const source = read(`app${route}/PageClient.tsx`);
  const tree = ts.createSourceFile('PageClient.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const data = {};
  const sectionIds = [];
  let tables = 0;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ['faqGroups', 'sections'].includes(node.name.getText(tree))) {
      data[node.name.getText(tree)] = JSON.parse(node.initializer.getText(tree));
    }
    if (ts.isJsxOpeningElement(node) && node.tagName.getText(tree) === 'Section') {
      sectionIds.push(node.attributes.properties.find((p) => p.name?.getText(tree) === 'id').initializer.text);
    }
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(tree) === 'DataTable') tables++;
    ts.forEachChild(node, visit);
  }
  visit(tree);
  const faqs = data.faqGroups.flatMap((group) => group.items);
  assert.equal(faqs.length, 150);
  assert.deepEqual(faqs.map((faq) => faq.number), Array.from({ length: 150 }, (_, i) => i + 1));
  assert.equal(new Set(faqs.map((faq) => faq.q)).size, 150);
  for (const faq of faqs) {
    assert.ok(faq.q.endsWith('?') && faq.a.trim());
    assert.ok(!/\bSection \d+:|\bQ\d+\.|\nA\d*\./.test(faq.q + faq.a));
    assert.ok(!faq.a.includes('•'), 'Inline bullets must become list items');
  }
  assert.equal(tables, tableCounts[routes.indexOf(route)]);
  assert.equal(new Set(sectionIds).size, sectionIds.length);
  assert.deepEqual(data.sections.map((section) => section.id), sectionIds);
  assert.ok(source.includes('className="faq-item"'));
  assert.ok(source.includes('      hideReviewBadge'), 'Unreviewed source must not display Expert Reviewed');
  assert.ok(!/\breviewPending\b/.test(source), 'Review badge is suppressed, not flipped to reviewed');
  assert.ok(source.includes('"href": "/regulatory/compliance"'));
  assert.ok(!/&(rsquo|lsquo|rdquo|ldquo|nbsp|amp);/.test(source), 'No literal HTML entity strings');
  const page = read(`app${route}/page.tsx`);
  assert.ok(page.includes(route), 'Existing canonical route retained');
  console.log(`${route}: 150 ordered FAQs, ${tables} tables, all contents anchors and canonical route PASS`);
}

const layout = read('components/templates/ServicePageLayout.tsx');
assert.ok(layout.includes('hideReviewBadge = false'), 'Layout supports suppressing the review badge');
assert.match(layout, /\{!hideReviewBadge && <>/, 'Badge is suppressed entirely, never rendered as Expert Reviewed');
const navbar = read('components/layout/Navbar.tsx');
assert.match(navbar, /label: "Compliance",[^\n]+"Compliance Test Report for AIF", "FEMA Compliance"/);
for (const label of ["Legal Process Outsourcing", "Legal Due Diligence"]) {
  assert.match(navbar, new RegExp(`label: "Compliance",[^\\n]+"${label}"`), `${label} missing from the Compliance menu`);
}
for (const route of routes) {
  assert.ok(read('app/regulatory/page.tsx').includes(route));
  assert.ok(read('app/regulatory/compliance/page.tsx').includes(route));
}
assert.ok(navbar.includes('viewAll: "/regulatory/compliance"'));
assert.ok(read('app/sitemap.ts').includes('${BASE}/regulatory/compliance'));
for (const route of routes.slice(2)) {
  assert.ok(read(`app${route}/page.tsx`).includes('getPublicContentPageRenderState'));
  assert.ok(read('lib/publicContent/managedPaths.ts').includes(route));
}
const finance = read('app/services/finance-accounting-outsourcing/PageClient.tsx');
assert.ok(!finance.includes('Sales Script (Consultative Approach)'));
assert.ok(!finance.includes('Your content should directly solve these.'));
assert.ok(read('app/regulatory/page.tsx').includes('? "compliance" : undefined'));
assert.ok(read('app/fema/compliance-under-fema/page.tsx').includes('getPublicContentPageRenderState'));
assert.ok(read('lib/publicContent/managedPaths.ts').includes(routes[1]));
assert.ok(read('app/sitemap.ts').includes(routes[0]));
console.log('Compliance discovery, CMS guard and existing sitemap coverage PASS');
