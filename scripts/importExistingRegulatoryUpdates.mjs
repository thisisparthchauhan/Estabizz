/**
 * Import existing published regulatory updates into the Regulatory Update Desk.
 *
 * The public Regulatory Updates page falls back to a small set of illustrative
 * updates defined in `lib/regulatoryUpdates.ts` when the database has no
 * published updates. This one-time, IDEMPOTENT backfill copies those existing
 * published items into the `regulatory_updates` collection so the admin team
 * can manage them from /admin/regulatory-updates.
 *
 * Safety:
 *   • DEFAULTS TO DRY RUN. Nothing is written unless you pass --apply.
 *   • Idempotent: skips an item if the same slug, the same sourceUrl, or the
 *     same title + sourceDate already exists. Safe to run repeatedly.
 *   • Imported items are status: published, created/published by "system:import".
 *
 * Usage:
 *   node scripts/importExistingRegulatoryUpdates.mjs            # dry run (default)
 *   node scripts/importExistingRegulatoryUpdates.mjs --dry-run  # dry run (explicit)
 *   node scripts/importExistingRegulatoryUpdates.mjs --apply    # write to MongoDB
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

// ── Load .env.local ────────────────────────────────────────────────────────────

function loadEnv() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();

// ── Args ───────────────────────────────────────────────────────────────────────

const APPLY = process.argv.includes('--apply');
const DRY_RUN = !APPLY; // dry run unless explicitly applying

// ── Existing static/fallback updates ───────────────────────────────────────────
// Mirrors the published items in lib/regulatoryUpdates.ts. Keep in sync if that
// file changes. Standalone (.mjs) so we inline the data rather than import TS.

const STATIC_UPDATES = [
  {
    slug: 'sebi-master-circular-update-for-rtas',
    regulator: 'SEBI',
    title: 'SEBI Master Circular Update for RTAs',
    subtitle: 'Investor service, grievance and record-retention expectations require stronger operational readiness.',
    summary: 'The circular strengthens expectations around investor service portals, grievance timelines, cyber resilience and record retention.',
    date: '2026-04-18',
    regulation: 'SEBI RTA framework and related circulars',
    affectedEntities: ['RTAs', 'Listed entities', 'Capital market intermediaries'],
    riskRating: 'High',
  },
  {
    slug: 'rbi-digital-lending-compliance-review',
    regulator: 'RBI',
    title: 'RBI Digital Lending Compliance Review',
    subtitle: 'Digital lending arrangements should be reviewed for disclosure, data and outsourcing controls.',
    summary: 'Digital lending entities should review KFS delivery, fund-flow controls, consent architecture, outsourcing contracts and customer grievance mechanisms.',
    date: '2026-03-28',
    regulation: 'RBI Digital Lending and outsourcing framework',
    affectedEntities: ['NBFCs', 'Banks', 'Digital lending platforms', 'LSPs'],
    riskRating: 'High',
  },
  {
    slug: 'ifsca-entity-compliance-calendar-readiness',
    regulator: 'IFSCA',
    title: 'IFSCA Entity Compliance Calendar Readiness',
    subtitle: 'IFSC entities should map recurring regulatory, governance and reporting timelines early.',
    summary: 'Entities operating in GIFT City should maintain a board-approved compliance calendar and evidence of filings, audits and policy reviews.',
    date: '2026-02-12',
    regulation: 'IFSCA entity-specific regulations and circulars',
    affectedEntities: ['Finance Companies', 'PSPs', 'FMEs', 'ITFS operators', 'BATF service providers'],
    riskRating: 'Moderate',
  },
];

// ── Mapping helpers ─────────────────────────────────────────────────────────────

const REGULATOR_MAP = {
  'RBI': 'RBI', 'SEBI': 'SEBI', 'IRDAI': 'IRDAI', 'IFSCA': 'IFSCA',
  'FIU / AML': 'FIU-IND', 'MCA / ROC': 'MCA', 'Government Licences': 'Other',
};

function inferRegulator(r) { return REGULATOR_MAP[r] ?? 'Other'; }

function inferCategory(title) {
  const t = (title || '').toLowerCase();
  if (/master direction/.test(t)) return 'Master Direction';
  if (/circular/.test(t))         return 'Circular';
  if (/notification/.test(t))     return 'Notification';
  if (/press release/.test(t))    return 'Press Release';
  if (/guideline/.test(t))        return 'Guideline';
  if (/alert/.test(t))            return 'Regulatory Alert';
  return 'Compliance Update';
}

function inferImpact(riskRating) {
  if (riskRating === 'High')     return 'High';
  if (riskRating === 'Critical') return 'Critical';
  if (riskRating === 'Low')      return 'Low';
  return 'Medium'; // Moderate / unknown
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildDetailedContent(u) {
  const parts = [];
  if (u.subtitle) parts.push(`<p>${escapeHtml(u.subtitle)}</p>`);
  if (u.summary)  parts.push(`<p>${escapeHtml(u.summary)}</p>`);
  if (u.regulation) parts.push(`<p><strong>Reference:</strong> ${escapeHtml(u.regulation)}</p>`);
  return parts.join('');
}

function uniq(arr) { return [...new Set(arr.filter(Boolean))]; }

// ── Main ─────────────────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not found. Add it to .env.local and retry.');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');
  console.log(DRY_RUN
    ? 'DRY RUN — no changes will be written. Pass --apply to import.\n'
    : 'APPLY MODE — importing existing published regulatory updates.\n');

  const col = mongoose.connection.collection('regulatory_updates');
  const auditCol = mongoose.connection.collection('regulatory_update_audit');

  let wouldImport = 0;
  let imported = 0;
  let skipped = 0;
  const now = new Date();

  for (const u of STATIC_UPDATES) {
    const regulator = inferRegulator(u.regulator);
    const category = inferCategory(u.title);
    const sourceDate = u.date ? new Date(u.date) : null;
    const sourceUrl = u.sourceUrl ? String(u.sourceUrl) : '';

    // ── Idempotency: slug OR sourceUrl OR (title + sourceDate) ──
    const orClauses = [{ slug: u.slug }, { title: u.title, sourceDate }];
    if (sourceUrl) orClauses.push({ sourceUrl });
    const existing = await col.findOne({ $or: orClauses });

    if (existing) {
      skipped++;
      console.log(`  • SKIP  "${u.title}" — already present (${existing.slug}).`);
      continue;
    }

    wouldImport++;
    console.log(`  • IMPORT "${u.title}" → /${u.slug} [${regulator} · ${category} · ${inferImpact(u.riskRating)}]`);

    if (DRY_RUN) continue;

    const doc = {
      title: u.title,
      slug: u.slug,
      regulator,
      category,
      summary: u.summary || '',
      detailedContent: buildDetailedContent(u),
      sourceTitle: u.regulation || '',
      sourceUrl,
      sourceDate,
      publishedDate: sourceDate,
      effectiveDate: null,
      impactLevel: inferImpact(u.riskRating),
      applicableTo: Array.isArray(u.affectedEntities) ? u.affectedEntities : [],
      tags: uniq([regulator, category, 'compliance']),
      status: 'published',
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      featuredImageUrl: '',
      createdBy: 'system:import',
      createdByRole: 'system',
      updatedBy: 'system:import',
      reviewedBy: '',
      reviewComment: '',
      publishedBy: 'system:import',
      archivedBy: '',
      publishedAt: sourceDate || now,
      archivedAt: null,
      pendingRevision: null,
      hasPendingChanges: false,
      pendingSubmittedBy: '',
      pendingReviewComment: '',
      deletedFromStatus: '',
      deletedBy: '',
      createdAt: now,
      updatedAt: now,
    };

    const res = await col.insertOne(doc);
    await auditCol.insertOne({
      action: 'create',
      updateId: String(res.insertedId),
      title: u.title,
      actor: 'system:import',
      actorRole: 'system',
      detail: 'Imported existing published regulatory update.',
      createdAt: now,
    });
    imported++;
  }

  // ── Summary ──
  console.log('\n' + '─'.repeat(52));
  console.log('Summary' + (DRY_RUN ? ' (dry run — nothing written)' : ''));
  console.log('─'.repeat(52));
  console.log(`  Existing static updates checked: ${STATIC_UPDATES.length}`);
  console.log(`  Already present (skipped):       ${skipped}`);
  if (DRY_RUN) {
    console.log(`  Would import:                    ${wouldImport}`);
    console.log('\nNo changes written. Re-run with --apply to import.');
  } else {
    console.log(`  Imported:                        ${imported}`);
  }

  console.log('\nDone.');
  await mongoose.disconnect();
}

run().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err);
  const safe = msg.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]');
  console.error('❌  Error:', safe);
  process.exit(1);
});
