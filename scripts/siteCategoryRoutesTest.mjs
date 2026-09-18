import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readData, routeExists, sourceTree } from './lib/publicRoutes.mjs';
import ts from 'typescript';

const menus = readData('components/layout/Navbar.tsx', 'menus');
const links = readData('components/layout/Navbar.tsx', 'linkMap');
let count = 0;
for (const menu of Object.values(menus)) {
  for (const category of menu.categories) {
    assert.ok(category.viewAll && !category.viewAll.includes('#'), category.label);
    assert.notEqual(category.viewAll, menu.viewAll, category.label);
    assert.ok(routeExists(category.viewAll), category.viewAll);
    for (const item of [...category.items, ...(category.groups ?? []).flatMap(group => group.items)]) {
      assert.ok(links[item] && routeExists(links[item]), item);
    }
    count++;
  }
}
for (const bad of ['/solutions/no-such-category', '/solutions/ipr/no-such-page', '/mca-roc/no-such-page']) assert.equal(routeExists(bad), false);
for (const [label, expected] of Object.entries({
  'NBFC License': '/rbi/nbfc-registration-in-india',
  'Fund Management Entity': '/ifsca',
  'TPA Licence': '/regulatory/insurance/tpa-license-india',
  'GST Registration Enquiry': '/contact?service=GST%20Registration',
  'Company Incorporation': '/mca-roc/company-registration-in-india',
})) assert.equal(links[label], expected);

for (const file of ['app/regulatory/page.tsx', 'app/regulatory/insurance/page.tsx', 'lib/content/footerDefaults.ts', 'lib/content/regulatoryServicesDefaults.ts', 'lib/content/solutionsDefaults.ts']) {
  const tree = sourceTree(file);
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(tree) === 'href' && ts.isStringLiteral(node.initializer) && node.initializer.text.startsWith('/')) {
      assert.ok(routeExists(node.initializer.text), `${file}: ${node.initializer.text}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
}
const contact = readData('app/contact/ContactClient.tsx', 'SERVICES_GROUPED');
assert.ok(contact.some(group => group.items.includes('GST Registration')));
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
assert.ok(sitemap.includes('${BASE}/regulatory/insurance'));
assert.ok(sitemap.includes('SOLUTION_CATEGORIES.map'));
assert.ok(!readFileSync('components/landing/LandingRenderer.tsx', 'utf8').includes('href="/19-5"'));
console.log(`${count} categories have dedicated, valid destinations; menu items, registered slugs, defaults and contact deep link PASS`);
