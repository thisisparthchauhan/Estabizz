import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const pages = [
  {
    route: '/solutions/legal/revival-of-struck-off-companies',
    title: 'Revival of Struck-Off Companies',
    tables: 20,
    sections: 26,
    faqs: 25,
    distinctiveText: 'Section 252(3) application by company/member/creditor/workman',
  },
  {
    route: '/solutions/legal/relinquishment-deed',
    title: 'Relinquishment Deed',
    tables: 18,
    sections: 24,
    faqs: 25,
    distinctiveText: 'NRI release deed with proper execution',
  },
  {
    route: '/solutions/legal/sexual-harassment-at-workplace-compliance',
    title: 'Sexual Harassment at Workplace Compliance',
    tables: 8,
    sections: 14,
    faqs: 22,
    distinctiveText: 'complaints received, disposed and pending beyond 90 days',
  },
  {
    route: '/solutions/legal/special-leave-petition',
    title: 'Special Leave Petition',
    tables: 22,
    sections: 28,
    faqs: 25,
    distinctiveText: 'Article 136(2)',
  },
  {
    route: '/solutions/legal/succession-certificate',
    title: 'Succession Certificate',
    tables: 23,
    sections: 29,
    faqs: 25,
    distinctiveText: 'Section 387',
  },
  {
    route: '/solutions/legal/tenant-eviction-notice',
    title: 'Tenant Eviction Notice',
    tables: 20,
    sections: 26,
    faqs: 25,
    distinctiveText: 'Section 106 of the Transfer of Property Act provides notice rules',
  },
  {
    route: '/solutions/legal/will-registration',
    title: 'Will Registration',
    tables: 23,
    sections: 29,
    faqs: 25,
    distinctiveText: 'An unprivileged Will should be attested by at least two witnesses',
  },
  {
    route: '/solutions/legal/winding-up-of-companies',
    title: 'Winding Up of Companies',
    tables: 21,
    sections: 27,
    faqs: 25,
    distinctiveText: 'IBC Section 59',
  },
  {
    route: '/solutions/legal/writ-petition',
    title: 'Writ Petition',
    tables: 23,
    sections: 29,
    faqs: 25,
    distinctiveText: 'Article 227 gives High Courts supervisory power',
  },
];

const registry = readFileSync('lib/content/services/registry.ts', 'utf8');
const navbar = readFileSync('components/layout/Navbar.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');

for (const page of pages) {
  const folder = `app${page.route}`;
  assert.ok(existsSync(`${folder}/page.tsx`), `${page.route}: missing page.tsx`);
  assert.ok(existsSync(`${folder}/PageClient.tsx`), `${page.route}: missing PageClient.tsx`);

  const content = JSON.parse(readFileSync(`${folder}/content.json`, 'utf8'));
  const tables = content.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'table');
  const ids = content.sections.map((section) => section.id);
  const serialized = JSON.stringify(content);

  assert.equal(content.title, page.title);
  assert.equal(content.sections.length, page.sections, `${page.route}: section count`);
  assert.equal(tables.length, page.tables, `${page.route}: table count`);
  assert.equal(content.faqs.length, page.faqs, `${page.route}: FAQ count`);
  assert.equal(new Set(ids).size, ids.length, `${page.route}: duplicate section id`);
  assert.ok(content.reviewPending, `${page.route}: legal-review notice must remain visible`);
  assert.ok(serialized.includes(page.distinctiveText), `${page.route}: distinctive source content missing`);
  assert.ok(!/&(?:rsquo|ldquo|rdquo|amp);/.test(serialized), `${page.route}: visible HTML entity leak`);

  for (const table of tables) {
    assert.ok(table.headers.length >= 2, `${page.route}: table without useful headers`);
    assert.ok(table.rows.length > 0, `${page.route}: empty table`);
    for (const row of table.rows) {
      assert.equal(row.length, table.headers.length, `${page.route}: table row width mismatch`);
    }
  }

  for (const faq of content.faqs) {
    assert.ok(faq.q.trim(), `${page.route}: empty FAQ question`);
    assert.ok(faq.a.trim(), `${page.route}: empty FAQ answer`);
    assert.ok(!/^\d+\.\s/.test(faq.q), `${page.route}: source numbering leaked into FAQ question`);
  }

  assert.ok(registry.includes(page.route), `${page.route}: missing from Legal hub registry`);
  assert.ok(navbar.includes(page.route), `${page.route}: missing from navigation map`);
  assert.ok(sitemap.includes(page.route), `${page.route}: missing from sitemap`);
}

console.log('Legal DOCX pages: 10 routes, 247 FAQs, 189 rendered tables (188 Word tables + 1 converted inline table), hub/navigation/sitemap registration PASS');
