/**
 * Inventory/import foundation for existing public content pages.
 *
 * Safety:
 *   - DEFAULTS TO DRY RUN. Nothing is written unless --apply is passed.
 *   - Public rendering is not changed by this script.
 *   - If a future DB-first renderer is added, it must check for any DB record
 *     by fullPath before falling back to hardcoded content. If a record exists
 *     with deleted/archived/draft/rejected/pending status, do NOT fall back to
 *     the hardcoded page. This tombstone check prevents deleted CMS pages from
 *     reappearing from the old source file.
 *
 * Usage:
 *   node scripts/importExistingPublicContentPages.mjs
 *   node scripts/importExistingPublicContentPages.mjs --dry-run
 *   node scripts/importExistingPublicContentPages.mjs --dry-run --only=/rbi/nbfc-registration-in-india
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-registration-in-india
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/payment-aggregator-license-in-india
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/ppi-registration-in-india
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/arc-registration-in-india
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-sro-registration
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/lendtech-services
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-aa-license-guide
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-account-aggregator-license
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/full-fledged-money-changers
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-financial-modeling
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-for-sale
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-legal-support
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-marketing-strategy
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/nbfc-takeover
 *   node scripts/importExistingPublicContentPages.mjs --apply --only=/rbi/rbi-services
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { discoverExistingPublicContentPages } from '../lib/publicContent/discovery.mjs';

const APPLY = process.argv.includes('--apply');
const DRY_RUN = !APPLY;
const SAMPLE_FULL_PATH = '/rbi/nbfc-registration-in-india';
const APPROVED_IMPORT_PATHS = [
  SAMPLE_FULL_PATH,
  '/rbi/payment-aggregator-license-in-india',
  '/rbi/ppi-registration-in-india',
  '/rbi/arc-registration-in-india',
  '/rbi/nbfc-sro-registration',
  '/rbi/lendtech-services',
  '/rbi/nbfc-aa-license-guide',
  '/rbi/nbfc-account-aggregator-license',
  // Phase 4N additions
  '/rbi/full-fledged-money-changers',
  '/rbi/nbfc-financial-modeling',
  '/rbi/nbfc-for-sale',
  '/rbi/nbfc-legal-support',
  '/rbi/nbfc-marketing-strategy',
  '/rbi/nbfc-takeover',
  '/rbi/rbi-services',
  // Phase 4O additions
  '/sebi/aif-registration-in-india',
  '/sebi/pms-registration-in-india',
  '/sebi/mutual-fund-registration',
  '/sebi/ria-registration-in-india',
  '/sebi/stock-broker-registration-in-india',
  // Phase 4P additions
  '/irdai/insurance-broker-registration-in-india',
  '/irdai/reinsurance-broker-registration-in-india',
  '/ifsca/aircraft-leasing-registration-in-ifsc',
  '/ifsca/psp-license-ifsca',
  '/fema/compliance-under-fema',
  '/fema/fema-registration',
];
const ONLY_FULL_PATH = parseOnlyArg();

const DEFAULT_PAGE_DESIGN = {
  themePreset: 'default',
  accentPreset: 'navy',
  textScale: 'standard',
  headingStyle: 'classic',
  sectionSpacing: 'standard',
  cardStyle: 'flat',
  heroLayout: 'image_top',
};

const DEFAULT_SECTION_DESIGN = {
  stylePreset: 'standard',
  imagePosition: 'top',
};

function parseOnlyArg() {
  const equalsArg = process.argv.find((arg) => arg.startsWith('--only='));
  if (equalsArg) return equalsArg.slice('--only='.length).trim();

  const onlyIndex = process.argv.indexOf('--only');
  if (onlyIndex !== -1) return String(process.argv[onlyIndex + 1] ?? '').trim();

  return '';
}

function loadEnv() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function truncate(value, width) {
  const s = String(value ?? '');
  if (s.length <= width) return s.padEnd(width, ' ');
  return `${s.slice(0, Math.max(0, width - 1))}…`;
}

function printTable(items) {
  const header = [
    truncate('fullPath', 42),
    truncate('title', 48),
    truncate('pageType', 16),
    truncate('menuGroup', 12),
    truncate('regulator', 9),
    truncate('importStatus', 20),
    'reason',
  ].join('  ');

  console.log(header);
  console.log('-'.repeat(180));
  for (const item of items) {
    console.log([
      truncate(item.fullPath, 42),
      truncate(item.title, 48),
      truncate(item.pageType, 16),
      truncate(item.menuGroup, 12),
      truncate(item.regulator, 9),
      truncate(item.importStatus, 20),
      `${item.reason} Source: ${item.sourceFile}`,
    ].join('  '));
  }
}

function buildSummaryForItems(items, dbChecked) {
  const count = (status) => items.filter((c) => c.importStatus === status).length;
  return {
    total: items.length,
    importable: count('importable'),
    needsManualMapping: count('needs_manual_mapping'),
    redirectsAliases: count('redirect/alias'),
    skipped: count('excluded_for_now') + count('skipped_existing'),
    existingDbMatches: dbChecked
      ? items.filter((c) => c.existingDbMatch).length
      : 0,
    dbChecked,
  };
}

function extractNbfcSections() {
  const file = path.join(process.cwd(), 'app/rbi/nbfc-registration-in-india/PageClient.tsx');
  const text = fs.readFileSync(file, 'utf8');
  const sections = [];
  const pattern = /\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'([^']+)'\s*,\s*content:\s*`([\s\S]*?)`\s*\}/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    sections.push({
      id: match[1],
      title: match[2],
      body: match[3].trim(),
    });
  }

  if (!sections.length) {
    throw new Error('Unable to extract NBFC Registration baseline sections from PageClient.tsx.');
  }

  return sections;
}

function decodeText(value) {
  return String(value ?? '')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractStringProp(text, prop) {
  const match = text.match(new RegExp(`${prop}=["'\`]([^"'\`]+)["'\`]`));
  return decodeText(match?.[1] ?? '');
}

function extractObjectPairs(text, keys) {
  const items = [];
  const objectPattern = /\{([\s\S]*?)\}/g;
  let match;
  while ((match = objectPattern.exec(text)) !== null) {
    const raw = match[1];
    const item = {};
    for (const key of keys) {
      const keyMatch = raw.match(new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`));
      if (keyMatch?.[1]) item[key] = decodeText(keyMatch[1]);
    }
    if (Object.keys(item).length === keys.length) items.push(item);
  }
  return items;
}

function extractPropObjectArray(clientText, prop, keys) {
  const marker = `${prop}={[`;
  const start = clientText.indexOf(marker);
  if (start === -1) return [];
  const bodyStart = start + marker.length;
  const end = clientText.indexOf(']}', bodyStart);
  if (end === -1) return [];
  return extractObjectPairs(clientText.slice(bodyStart, end), keys);
}

function extractVariableCards(clientText, variableName) {
  const marker = `const ${variableName}`;
  const start = clientText.indexOf(marker);
  if (start === -1) return '';
  const arrayStart = clientText.indexOf('[', start);
  const arrayEnd = clientText.indexOf('];', arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return '';

  return extractObjectPairs(clientText.slice(arrayStart, arrayEnd), ['title', 'body'])
    .map((card) => `${card.title}: ${card.body}`)
    .join('\n');
}

function extractRows(tableMarkup) {
  const rowsStart = tableMarkup.indexOf('rows={[');
  if (rowsStart === -1) return '';
  const rowsEnd = tableMarkup.indexOf(']}', rowsStart);
  if (rowsEnd === -1) return '';
  const rawRows = tableMarkup.slice(rowsStart + 'rows={['.length, rowsEnd);
  const rows = [];
  const rowPattern = /\[([^\[\]]+)\]/g;
  let rowMatch;
  while ((rowMatch = rowPattern.exec(rawRows)) !== null) {
    const values = [...rowMatch[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((m) => decodeText(m[1]));
    if (values.length >= 2) rows.push(`${values[0]}: ${values.slice(1).join(' - ')}`);
  }
  return rows.join('\n');
}

function extractBulletItems(listMarkup) {
  const itemsStart = listMarkup.indexOf('items={[');
  if (itemsStart === -1) return '';
  const itemsEnd = listMarkup.lastIndexOf(']}');
  if (itemsEnd === -1 || itemsEnd <= itemsStart) return '';
  return listMarkup
    .slice(itemsStart + 'items={['.length, itemsEnd)
    .split(/\n\s*,\s*\n/)
    .map((item) => cleanSectionMarkup(item))
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join('\n');
}

function cleanSectionMarkup(markup) {
  return decodeText(markup)
    .replace(/<Link\b[^>]*>([\s\S]*?)<\/Link>/g, '$1')
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, '$1')
    .replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/g, '$1')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '\n')
    .replace(/[{}]/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sectionBodyFromMarkup(markup, clientText) {
  let text = markup;

  text = text.replace(/<CardGrid\s+cards=\{([A-Za-z0-9_]+)\}[^/]*\/>/g, (_match, variableName) => {
    return `\n${extractVariableCards(clientText, variableName)}\n`;
  });

  text = text.replace(/<DataTable[\s\S]*?\/>/g, (match) => `\n${extractRows(match)}\n`);
  text = text.replace(/<BulletList[\s\S]*?\/>/g, (match) => `\n${extractBulletItems(match)}\n`);
  text = text.replace(/<FormulaCard>([\s\S]*?)<\/FormulaCard>/g, (_match, inner) => `\n${cleanSectionMarkup(inner)}\n`);

  return cleanSectionMarkup(text);
}

function extractHeadingSections(clientText) {
  const layoutStart = clientText.indexOf('<ServicePageLayout');
  const layoutEnd = clientText.lastIndexOf('</ServicePageLayout>');
  if (layoutStart === -1 || layoutEnd === -1 || layoutEnd <= layoutStart) return [];

  const content = clientText.slice(layoutStart, layoutEnd);
  const sections = [];
  const h2Pattern = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
  const matches = [...content.matchAll(h2Pattern)];

  for (let index = 0; index < matches.length; index++) {
    const current = matches[index];
    const next = matches[index + 1];
    const bodyStart = (current.index ?? 0) + current[0].length;
    const bodyEnd = next?.index ?? content.length;
    const body = sectionBodyFromMarkup(content.slice(bodyStart, bodyEnd), clientText);
    sections.push({
      id: current[1],
      title: decodeText(cleanSectionMarkup(current[2])),
      body,
      design: { ...DEFAULT_SECTION_DESIGN },
    });
  }

  return sections;
}

function extractServiceLayoutSections(fullPath) {
  const file = path.join(process.cwd(), fullPath.replace(/^\//, 'app/'), 'PageClient.tsx');
  const clientText = fs.readFileSync(file, 'utf8');
  const sections = [];
  const pattern = /<Section\s+id="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/Section>/g;
  let match;

  while ((match = pattern.exec(clientText)) !== null) {
    const body = sectionBodyFromMarkup(match[3], clientText);
    sections.push({
      id: match[1],
      title: decodeText(match[2]),
      body,
      design: { ...DEFAULT_SECTION_DESIGN },
    });
  }

  if (sections.length) return sections;

  const lowerSectionPattern = /<section\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
  while ((match = lowerSectionPattern.exec(clientText)) !== null) {
    const h2Match = match[2].match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    const title = decodeText(cleanSectionMarkup(h2Match?.[1] ?? match[1]));
    const bodyMarkup = h2Match ? match[2].replace(h2Match[0], '') : match[2];
    const body = sectionBodyFromMarkup(bodyMarkup, clientText);
    sections.push({
      id: match[1],
      title,
      body,
      design: { ...DEFAULT_SECTION_DESIGN },
    });
  }

  if (sections.length) return sections;

  const headingSections = extractHeadingSections(clientText);
  if (headingSections.length) return headingSections;

  return [...clientText.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'([^']+)'/g)].map((tocMatch) => ({
    id: tocMatch[1],
    title: decodeText(tocMatch[2]),
    body: '',
    design: { ...DEFAULT_SECTION_DESIGN },
  }));
}

function buildServiceLayoutBaseline(item, now) {
  const file = path.join(process.cwd(), item.fullPath.replace(/^\//, 'app/'), 'PageClient.tsx');
  const clientText = fs.readFileSync(file, 'utf8');
  const sections = extractServiceLayoutSections(item.fullPath);
  const title = extractStringProp(clientText, 'title') || item.title;
  const trustLine = extractStringProp(clientText, 'trustLine');
  const readingTime = extractStringProp(clientText, 'readTime') || '20 min read';
  const summary = item.seoDescription || title;
  const quickFacts = extractPropObjectArray(clientText, 'quickFacts', ['label', 'value']);
  const relatedPages = extractPropObjectArray(clientText, 'relatedArticles', ['title', 'href', 'category', 'description']);
  const ctaTitle = extractStringProp(clientText, 'ctaTitle') || 'Need Expert Support?';
  const ctaDescription = extractStringProp(clientText, 'ctaDescription') || summary;
  const finalCtaTitle = extractStringProp(clientText, 'finalCtaTitle') || ctaTitle;
  const finalCtaDescription = extractStringProp(clientText, 'finalCtaDescription') || ctaDescription;
  const serviceBadge = title.includes('NBFC')
    ? 'NBFC'
    : title.includes('ARC')
      ? 'ARC'
      : title.includes('LendTech')
        ? 'LendTech'
        : title.includes('PPI')
          ? 'PPI'
          : title.includes('Payment Aggregator')
            ? 'Payment Aggregator'
            : 'RBI Guide';

  return {
    title,
    slug: item.slug,
    fullPath: item.fullPath,
    pageType: item.pageType,
    menuGroup: item.menuGroup,
    category: 'RBI Guide',
    regulator: item.regulator,
    serviceType: title,
    summary,
    hero: {
      title,
      description: summary,
      trustLine,
    },
    heroImage: null,
    pageDesign: { ...DEFAULT_PAGE_DESIGN },
    badges: [
      { emoji: '', label: 'RBI' },
      { emoji: '', label: serviceBadge },
      { emoji: '', label: 'Guide' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'RBI Services', href: '/rbi' },
      { label: title },
    ],
    sections,
    snapshotCards: quickFacts,
    quickFacts,
    ctaCards: [
      { title: ctaTitle, description: ctaDescription },
      { title: finalCtaTitle, description: finalCtaDescription },
    ],
    expertProfile: {
      name: 'CS Devyani Khambhati',
      role: 'Compliance Expert',
      initials: 'DK',
      bio: 'Specialist in fintech regulatory compliance, government licenses and RBI, SEBI, IRDAI frameworks.',
      email: 'contact@estabizz.com',
    },
    relatedPages,
    sourceReferences: [],
    reviewedBy: 'CS Devyani Khambhati',
    lastReviewedAt: new Date('2025-07-17T00:00:00.000Z'),
    readingTime,
    status: 'published',
    publishedAt: now,
    createdBy: 'system:import',
    updatedBy: 'system:import',
    publishedBy: 'system:import',
    seoTitle: item.seoTitle || title,
    seoDescription: item.seoDescription || summary,
    canonicalUrl: item.fullPath,
    ogImage: '',
    pendingRevision: null,
    hasPendingChanges: false,
    pendingSubmittedBy: '',
    pendingReviewComment: '',
    deletedFromStatus: '',
    deletedBy: '',
    createdAt: now,
    updatedAt: now,
  };
}

function buildNbfcBaseline(item, now) {
  const sections = extractNbfcSections();
  const summary = item.seoDescription || 'Complete RBI NBFC registration guide covering eligibility, Net Owned Fund, COSMOS filing, documentation, approval process and post-registration compliance.';

  return {
    title: 'NBFC Registration in India',
    slug: 'nbfc-registration-in-india',
    fullPath: SAMPLE_FULL_PATH,
    pageType: 'guide',
    menuGroup: 'regulatory',
    category: 'RBI Licensing',
    regulator: 'RBI',
    serviceType: 'NBFC Registration',
    summary,
    hero: {
      title: 'NBFC Registration in India',
      description: summary,
      trustLine: 'RBI licensing support for NBFC-ICC, Base Layer structuring, COSMOS filing and post-registration compliance planning.',
    },
    heroImage: null,
    pageDesign: { ...DEFAULT_PAGE_DESIGN },
    badges: [
      { emoji: '', label: 'RBI' },
      { emoji: '', label: 'NBFC' },
      { emoji: '', label: 'SBR Master Direction 2023' },
      { emoji: '', label: 'Section 45-IA' },
      { emoji: '', label: 'NBFC-ICC' },
      { emoji: '', label: 'Base Layer' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'RBI Services', href: '/rbi' },
      { label: 'NBFC Registration' },
    ],
    sections: sections.map((section) => ({ ...section, design: { ...DEFAULT_SECTION_DESIGN } })),
    snapshotCards: [
      { label: 'Regulator', value: 'Reserve Bank of India (RBI)' },
      { label: 'Governing Law', value: 'RBI Act, 1934 - Section 45-IA' },
      { label: 'Master Direction', value: 'SBR Directions 2023 (Updated July 17, 2025)' },
      { label: 'Eligible Entity', value: 'Company (Companies Act 2013)' },
    ],
    quickFacts: [
      { label: 'Regulator', value: 'Reserve Bank of India (RBI)' },
      { label: 'Governing Law', value: 'RBI Act, 1934 - Section 45-IA' },
      { label: 'Master Direction', value: 'SBR Directions 2023 (Updated July 17, 2025)' },
      { label: 'Eligible Entity', value: 'Company (Companies Act 2013)' },
      { label: 'NBFC-ICC NOF', value: 'Rs. 10 Crore (by March 31, 2027)' },
      { label: 'NBFC-P2P / AA NOF', value: 'Rs. 2 Crore' },
      { label: 'NBFC-IFC / IDF NOF', value: 'Rs. 300 Crore' },
      { label: 'Principal Business Test', value: '50-50 Rule' },
      { label: 'Leverage Ratio (BL)', value: 'Max 7x owned fund' },
      { label: 'NPA Classification', value: '90 days overdue (from Mar 31, 2026)' },
      { label: 'Approval Timeline', value: '4-8 months (well-prepared)' },
      { label: 'Application Portal', value: 'RBI COSMOS' },
    ],
    ctaCards: [
      {
        title: 'Ready to Launch Your NBFC?',
        description: 'Get expert guidance on Rs. 10 Crore NOF structuring, COSMOS portal filing, business plan drafting, Annex XII director documentation, and end-to-end RBI Certificate of Registration process.',
      },
      {
        title: 'Need Expert Support for NBFC Registration?',
        description: 'Our compliance specialists provide end-to-end NBFC registration support - pre-filing audit, NOF computation, COSMOS portal filing, Annex XII documentation, business plan, Board-approved policies, query handling, and ongoing post-registration compliance.',
      },
    ],
    expertProfile: {
      name: 'CS Devyani Khambhati',
      role: 'Compliance Expert',
      initials: 'DK',
      bio: 'Specialist in fintech regulatory compliance, government licenses and RBI, SEBI, IRDAI frameworks.',
      email: 'contact@estabizz.com',
    },
    relatedPages: [
      { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'NBFC Account Aggregator License - complete regulatory guide.' },
      { title: 'NBFC Business Plan', href: '/rbi/nbfc-business-plan', category: 'RBI', description: 'NBFC Business Plan - complete regulatory guide.' },
      { title: 'NBFC Takeover', href: '/rbi/nbfc-takeover', category: 'RBI', description: 'NBFC Takeover - complete regulatory guide.' },
      { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support', category: 'RBI', description: 'NBFC Legal Support Services - complete regulatory guide.' },
      { title: 'NBFC Financial Modeling', href: '/rbi/nbfc-financial-modeling', category: 'RBI', description: 'NBFC Financial Modeling - complete regulatory guide.' },
      { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india', category: 'RBI', description: 'ARC Registration in India - complete regulatory guide.' },
    ],
    sourceReferences: [
      { title: 'RBI COSMOS Portal', url: 'https://cosmos.rbi.org.in', regulator: 'RBI' },
    ],
    reviewedBy: 'CS Devyani Khambhati',
    lastReviewedAt: new Date('2025-07-17T00:00:00.000Z'),
    readingTime: '25 min read',
    status: 'published',
    publishedAt: now,
    createdBy: 'system:import',
    updatedBy: 'system:import',
    publishedBy: 'system:import',
    seoTitle: item.seoTitle || 'NBFC Registration in India - Complete RBI Approval Guide',
    seoDescription: item.seoDescription || summary,
    canonicalUrl: SAMPLE_FULL_PATH,
    ogImage: '',
    pendingRevision: null,
    hasPendingChanges: false,
    pendingSubmittedBy: '',
    pendingReviewComment: '',
    deletedFromStatus: '',
    deletedBy: '',
    createdAt: now,
    updatedAt: now,
  };
}

function buildImportRecord(item, now) {
  if (item.fullPath === SAMPLE_FULL_PATH) return buildNbfcBaseline(item, now);
  if (APPROVED_IMPORT_PATHS.includes(item.fullPath)) return buildServiceLayoutBaseline(item, now);

  return {
    title: item.title,
    slug: item.slug,
    fullPath: item.fullPath,
    pageType: item.pageType,
    menuGroup: item.menuGroup,
    category: '',
    regulator: item.regulator,
    serviceType: '',
    summary: item.seoDescription || '',
    hero: null,
    heroImage: null,
    pageDesign: { ...DEFAULT_PAGE_DESIGN },
    badges: [],
    breadcrumbs: [],
    sections: [],
    snapshotCards: [],
    quickFacts: [],
    ctaCards: [],
    expertProfile: null,
    relatedPages: [],
    sourceReferences: [],
    reviewedBy: '',
    readingTime: '',
    status: 'published',
    publishedAt: now,
    createdBy: 'system:import',
    updatedBy: 'system:import',
    publishedBy: 'system:import',
    seoTitle: item.seoTitle || '',
    seoDescription: item.seoDescription || '',
    canonicalUrl: item.fullPath,
    ogImage: '',
    pendingRevision: null,
    hasPendingChanges: false,
    pendingSubmittedBy: '',
    pendingReviewComment: '',
    deletedFromStatus: '',
    deletedBy: '',
    createdAt: now,
    updatedAt: now,
  };
}

async function applyImport(items) {
  const importable = items.filter((c) => c.importStatus === 'importable');
  const col = mongoose.connection.collection('public_content_pages');
  const now = new Date();
  let imported = 0;
  let skippedExisting = items.filter((c) => c.importStatus === 'skipped_existing').length;
  const inserted = [];

  for (const item of importable) {
    const existing = await col.findOne({ $or: [{ fullPath: item.fullPath }, { slug: item.slug }] });
    if (existing) {
      skippedExisting++;
      continue;
    }

    const record = buildImportRecord(item, now);
    const result = await col.insertOne(record);
    imported++;
    inserted.push({
      id: String(result.insertedId),
      title: record.title,
      slug: record.slug,
      fullPath: record.fullPath,
      status: record.status,
      sections: record.sections.length,
    });
  }

  return { imported, skippedExisting, inserted };
}

async function run() {
  loadEnv();
  if (APPLY && !ONLY_FULL_PATH) {
    throw new Error(`Broad apply is blocked. Pass --only for one approved managed path only: ${APPROVED_IMPORT_PATHS.join(', ')}.`);
  }
  if (APPLY && ONLY_FULL_PATH && !APPROVED_IMPORT_PATHS.includes(ONLY_FULL_PATH)) {
    throw new Error(`Apply is limited to approved managed paths only: ${APPROVED_IMPORT_PATHS.join(', ')}.`);
  }

  const { summary, items } = await discoverExistingPublicContentPages();
  const targetItems = ONLY_FULL_PATH
    ? items.filter((item) => item.fullPath === ONLY_FULL_PATH)
    : items;

  if (ONLY_FULL_PATH && targetItems.length === 0) {
    throw new Error(`No discovered public content page matched --only=${ONLY_FULL_PATH}.`);
  }

  const displaySummary = ONLY_FULL_PATH
    ? buildSummaryForItems(targetItems, summary.dbChecked)
    : summary;

  console.log(DRY_RUN
    ? 'DRY RUN - no changes will be written. Pass --apply to import.\n'
    : 'APPLY MODE - writing importable public content pages.\n');

  if (ONLY_FULL_PATH) {
    console.log(`Only filter: ${ONLY_FULL_PATH}`);
    console.log(`Matched pages: ${targetItems.length}\n`);
  }

  console.log('Summary');
  console.log('-'.repeat(72));
  console.log(`Total routes/content records scanned: ${displaySummary.total}`);
  console.log(`Importable pages:                    ${displaySummary.importable}`);
  console.log(`Needs manual mapping:                ${displaySummary.needsManualMapping}`);
  console.log(`Redirects/aliases:                   ${displaySummary.redirectsAliases}`);
  console.log(`Skipped/excluded:                    ${displaySummary.skipped}`);
  console.log(`Existing DB matches:                 ${displaySummary.dbChecked ? displaySummary.existingDbMatches : 'not checked (MONGODB_URI missing)'}`);
  console.log(`MongoDB writes:                      ${DRY_RUN ? 0 : 'pending apply'}\n`);

  printTable(targetItems);

  const nbfc = items.find((c) => c.fullPath === SAMPLE_FULL_PATH);
  console.log('\nKey check');
  console.log('-'.repeat(72));
  if (nbfc) {
    console.log(`${SAMPLE_FULL_PATH} detected as ${nbfc.importStatus} (${nbfc.pageType}, ${nbfc.menuGroup}, ${nbfc.regulator}).`);
    if (ONLY_FULL_PATH === SAMPLE_FULL_PATH) {
      const baselineSections = extractNbfcSections().length;
      console.log(`Sample baseline sections ready: ${baselineSections}`);
    }
  } else {
    console.log(`${SAMPLE_FULL_PATH} was NOT detected.`);
  }

  if (DRY_RUN) {
    console.log('\nDry run complete. No MongoDB writes occurred.');
  } else {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required for --apply.');
    const result = await applyImport(targetItems);
    console.log(`\nApply complete. Imported ${result.imported} public content pages. Skipped existing: ${result.skippedExisting}.`);
    for (const doc of result.inserted) {
      console.log(`Imported: ${doc.title} | ${doc.fullPath} | ${doc.slug} | ${doc.status} | sections=${doc.sections}`);
    }
  }

  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
}

run().catch(async (err) => {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  const msg = err instanceof Error ? err.message : String(err);
  const safe = msg.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]');
  console.error('Error:', safe);
  process.exit(1);
});
