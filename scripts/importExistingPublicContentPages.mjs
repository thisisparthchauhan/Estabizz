/**
 * Inventory/import foundation for existing public content pages.
 *
 * Phase 4B safety:
 *   - DEFAULTS TO DRY RUN. Nothing is written unless --apply is passed.
 *   - Phase 4B must run only --dry-run.
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
 *   node scripts/importExistingPublicContentPages.mjs --apply
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

const APPLY = process.argv.includes('--apply');
const DRY_RUN = !APPLY;
const ROOT = process.cwd();

const SCAN_ROOTS = [
  'app/rbi',
  'app/sebi',
  'app/irdai',
  'app/ifsca',
  'app/fema',
  'app/services',
  'app/regulatory',
  'app/resources',
  'app/legal',
  'app/19-5',
];

function loadEnv() {
  const file = path.join(ROOT, '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'page.tsx' || entry.name === 'page.ts') out.push(full);
  }
  return out;
}

function routeFromPageFile(file) {
  let route = file.replace(/^app/, '').replace(/\/page\.tsx?$/, '');
  return route || '/';
}

function slugFromPath(fullPath) {
  const parts = fullPath.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'home';
}

function titleFromSlug(slug) {
  return slug
    .replace(/\[[^\]]+\]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase()) || 'Untitled Page';
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return cleanTitle(match[1]);
    if (match?.[2]) return cleanTitle(match[2]);
  }
  return '';
}

function cleanTitle(value) {
  return String(value ?? '')
    .replace(/\$\{[^}]+\}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferMenuGroup(fullPath) {
  if (fullPath.startsWith('/services')) return 'services';
  if (fullPath.startsWith('/resources')) return 'resources';
  if (fullPath.startsWith('/19-5')) return '19_5';
  if (fullPath.startsWith('/legal')) return 'legal';
  if (/^\/(rbi|sebi|irdai|ifsca|fema|regulatory)(\/|$)/.test(fullPath)) return 'regulatory';
  return 'other';
}

function inferRegulator(fullPath) {
  if (fullPath.startsWith('/rbi')) return 'RBI';
  if (fullPath.startsWith('/sebi')) return 'SEBI';
  if (fullPath.startsWith('/irdai')) return 'IRDAI';
  if (fullPath.startsWith('/ifsca')) return 'IFSCA';
  if (fullPath.startsWith('/fema')) return 'FEMA';
  return 'Other';
}

function inferPageType(fullPath, pageText, clientText) {
  if (fullPath.startsWith('/19-5')) return 'landing_19_5';
  if (fullPath.startsWith('/legal')) return 'legal';
  if (clientText.includes('ServicePageLayout')) return 'guide';
  if (fullPath.startsWith('/resources')) return 'resource';
  if (fullPath === '/regulatory') return 'category_landing';
  if (/^\/(rbi|sebi|irdai|ifsca|fema|services)$/.test(fullPath)) return 'service_landing';
  if (pageText.includes('redirect(') || pageText.includes('permanentRedirect(')) return 'special';
  return 'special';
}

function baseImportStatus(fullPath, pageText, clientText) {
  if (pageText.includes('redirect(') || pageText.includes('permanentRedirect(')) {
    return { importStatus: 'redirect/alias', reason: 'Route redirects to another page.' };
  }

  if (fullPath.includes('[')) {
    return { importStatus: 'excluded_for_now', reason: 'Dynamic route shell; scan concrete content source instead.' };
  }

  if (fullPath.startsWith('/resources/regulatory-updates')) {
    return { importStatus: 'excluded_for_now', reason: 'Managed by the Regulatory Update Desk module.' };
  }

  if (fullPath.startsWith('/19-5')) {
    return { importStatus: 'importable', reason: '19/5 landing content is data-driven.' };
  }

  if (clientText.includes('ServicePageLayout')) {
    return { importStatus: 'importable', reason: 'Uses ServicePageLayout guide template.' };
  }

  if (/^\/(rbi|sebi|irdai|ifsca|fema|services|regulatory|resources)$/.test(fullPath)) {
    return { importStatus: 'needs_manual_mapping', reason: 'Custom listing/landing layout needs mapping.' };
  }

  if (fullPath.startsWith('/resources') || fullPath.startsWith('/regulatory')) {
    return { importStatus: 'needs_manual_mapping', reason: 'Custom resource/regulatory page layout needs mapping.' };
  }

  return { importStatus: 'needs_manual_mapping', reason: 'Custom page structure needs manual mapping.' };
}

function detectTitle(pageText, clientText, fallbackSlug) {
  return firstMatch(pageText, [
    /title:\s*["'`]([^"'`]+)["'`]/,
    /seoTitle:\s*["'`]([^"'`]+)["'`]/,
  ])
    || firstMatch(clientText, [
      /title=["'`]([^"'`]+)["'`]/,
      /title:\s*["'`]([^"'`]+)["'`]/,
      /<h1[^>]*>([\s\S]*?)<\/h1>/,
    ])
    || titleFromSlug(fallbackSlug);
}

function detectSeoDescription(pageText) {
  return firstMatch(pageText, [
    /description:\s*["'`]([^"'`]+)["'`]/,
    /metaDescription:\s*["'`]([^"'`]+)["'`]/,
  ]);
}

function scanPageRoutes() {
  const files = SCAN_ROOTS.flatMap((root) => walk(root)).sort();
  return files.map((file) => {
    const fullPath = routeFromPageFile(file);
    const slug = slugFromPath(fullPath);
    const pageText = read(file);
    const clientFile = path.join(path.dirname(file), 'PageClient.tsx');
    const clientText = read(clientFile);
    const base = baseImportStatus(fullPath, pageText, clientText);

    return {
      fullPath,
      title: detectTitle(pageText, clientText, slug),
      slug,
      pageType: inferPageType(fullPath, pageText, clientText),
      menuGroup: inferMenuGroup(fullPath),
      regulator: inferRegulator(fullPath),
      sourceFile: file,
      importStatus: base.importStatus,
      reason: base.reason,
      seoTitle: detectTitle(pageText, clientText, slug),
      seoDescription: detectSeoDescription(pageText),
    };
  });
}

function scanLandingPages() {
  const dir = path.join(ROOT, 'lib/landing/pages');
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.ts'))
    .sort()
    .map((file) => {
      const sourceFile = path.join('lib/landing/pages', file);
      const text = read(sourceFile);
      const slug = firstMatch(text, [/slug:\s*["'`]([^"'`]+)["'`]/]) || file.replace(/\.ts$/, '');
      const title = firstMatch(text, [/title:\s*["'`]([^"'`]+)["'`]/]) || titleFromSlug(slug);
      const category = firstMatch(text, [/category:\s*["'`]([^"'`]+)["'`]/]);
      const seoTitle = firstMatch(text, [/seoTitle:\s*["'`]([^"'`]+)["'`]/]) || title;
      const seoDescription = firstMatch(text, [/metaDescription:\s*["'`]([^"'`]+)["'`]/]);

      return {
        fullPath: `/19-5/${slug}`,
        title,
        slug,
        pageType: 'landing_19_5',
        menuGroup: '19_5',
        regulator: 'Other',
        sourceFile,
        importStatus: 'importable',
        reason: category ? `19/5 landing data object (${category}).` : '19/5 landing data object.',
        seoTitle,
        seoDescription,
      };
    });
}

function applyDuplicateRisk(candidates) {
  const bySlug = new Map();
  for (const item of candidates) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, []);
    bySlug.get(item.slug).push(item);
  }

  for (const item of candidates) {
    const matches = bySlug.get(item.slug) ?? [];
    const realMatches = matches.filter((m) => m.importStatus === 'importable');
    if (realMatches.length > 1 && item.importStatus === 'importable') {
      item.importStatus = 'needs_manual_mapping';
      item.reason = `Duplicate slug risk: ${realMatches.map((m) => m.fullPath).join(', ')}.`;
    }
  }
}

async function loadDbMatches(candidates) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return { checked: false, fullPathMatches: new Map(), slugMatches: new Map() };
  }

  await mongoose.connect(uri);
  const col = mongoose.connection.collection('public_content_pages');
  const fullPaths = [...new Set(candidates.map((c) => c.fullPath))];
  const slugs = [...new Set(candidates.map((c) => c.slug))];
  const docs = await col.find({ $or: [{ fullPath: { $in: fullPaths } }, { slug: { $in: slugs } }] }).toArray();
  const fullPathMatches = new Map();
  const slugMatches = new Map();

  for (const doc of docs) {
    if (doc.fullPath) fullPathMatches.set(doc.fullPath, doc);
    if (doc.slug && !slugMatches.has(doc.slug)) slugMatches.set(doc.slug, doc);
  }

  return { checked: true, fullPathMatches, slugMatches };
}

function applyDbStatus(candidates, db) {
  if (!db.checked) return;
  for (const item of candidates) {
    const fullPathMatch = db.fullPathMatches.get(item.fullPath);
    const slugMatch = db.slugMatches.get(item.slug);
    if ((fullPathMatch || slugMatch) && item.importStatus === 'importable') {
      item.importStatus = 'skipped_existing';
      item.reason = fullPathMatch
        ? `Existing MongoDB fullPath match (${fullPathMatch.fullPath}).`
        : `Existing MongoDB slug match (${slugMatch.slug}).`;
    }
  }
}

function statusCounts(candidates, db) {
  const count = (status) => candidates.filter((c) => c.importStatus === status).length;
  const existingDbMatches = db.checked
    ? candidates.filter((c) => db.fullPathMatches.has(c.fullPath) || db.slugMatches.has(c.slug)).length
    : 0;

  return {
    total: candidates.length,
    importable: count('importable'),
    needsManualMapping: count('needs_manual_mapping'),
    redirectsAliases: count('redirect/alias'),
    skipped: count('excluded_for_now') + count('skipped_existing'),
    existingDbMatches,
  };
}

function truncate(value, width) {
  const s = String(value ?? '');
  if (s.length <= width) return s.padEnd(width, ' ');
  return `${s.slice(0, Math.max(0, width - 1))}…`;
}

function printTable(candidates) {
  const rows = candidates.slice().sort((a, b) => a.fullPath.localeCompare(b.fullPath));
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
  for (const item of rows) {
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

async function applyImport(candidates) {
  const importable = candidates.filter((c) => c.importStatus === 'importable');
  const col = mongoose.connection.collection('public_content_pages');
  const now = new Date();
  let imported = 0;

  for (const item of importable) {
    const existing = await col.findOne({ $or: [{ fullPath: item.fullPath }, { slug: item.slug }] });
    if (existing) continue;

    await col.insertOne({
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
      badges: [],
      breadcrumbs: [],
      sections: [],
      snapshotCards: [],
      quickFacts: [],
      ctaCards: [],
      expertProfile: null,
      relatedPages: [],
      sourceReferences: [{ title: 'Imported source file', url: item.sourceFile }],
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
    });
    imported++;
  }

  return imported;
}

async function run() {
  loadEnv();

  const routeCandidates = scanPageRoutes();
  const landingCandidates = scanLandingPages();
  const candidates = [...routeCandidates, ...landingCandidates];
  applyDuplicateRisk(candidates);

  const db = await loadDbMatches(candidates);
  applyDbStatus(candidates, db);
  const summary = statusCounts(candidates, db);

  console.log(DRY_RUN
    ? 'DRY RUN - no changes will be written. Pass --apply to import.\n'
    : 'APPLY MODE - writing importable public content pages.\n');

  console.log('Summary');
  console.log('-'.repeat(72));
  console.log(`Total routes/content records scanned: ${summary.total}`);
  console.log(`Importable pages:                    ${summary.importable}`);
  console.log(`Needs manual mapping:                ${summary.needsManualMapping}`);
  console.log(`Redirects/aliases:                   ${summary.redirectsAliases}`);
  console.log(`Skipped/excluded:                    ${summary.skipped}`);
  console.log(`Existing DB matches:                 ${db.checked ? summary.existingDbMatches : 'not checked (MONGODB_URI missing)'}`);
  console.log(`MongoDB writes:                      ${DRY_RUN ? 0 : 'pending apply'}\n`);

  printTable(candidates);

  const nbfc = candidates.find((c) => c.fullPath === '/rbi/nbfc-registration-in-india');
  console.log('\nKey check');
  console.log('-'.repeat(72));
  if (nbfc) {
    console.log(`/rbi/nbfc-registration-in-india detected as ${nbfc.importStatus} (${nbfc.pageType}, ${nbfc.menuGroup}, ${nbfc.regulator}).`);
  } else {
    console.log('/rbi/nbfc-registration-in-india was NOT detected.');
  }

  if (DRY_RUN) {
    console.log('\nDry run complete. No MongoDB writes occurred.');
  } else {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required for --apply.');
    const imported = await applyImport(candidates);
    console.log(`\nApply complete. Imported ${imported} public content pages.`);
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
