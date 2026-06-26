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
 *   node scripts/importExistingPublicContentPages.mjs --apply
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { discoverExistingPublicContentPages } from '../lib/publicContent/discovery.mjs';

const APPLY = process.argv.includes('--apply');
const DRY_RUN = !APPLY;

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

async function applyImport(items) {
  const importable = items.filter((c) => c.importStatus === 'importable');
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
  const { summary, items } = await discoverExistingPublicContentPages();

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
  console.log(`Existing DB matches:                 ${summary.dbChecked ? summary.existingDbMatches : 'not checked (MONGODB_URI missing)'}`);
  console.log(`MongoDB writes:                      ${DRY_RUN ? 0 : 'pending apply'}\n`);

  printTable(items);

  const nbfc = items.find((c) => c.fullPath === '/rbi/nbfc-registration-in-india');
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
    const imported = await applyImport(items);
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
