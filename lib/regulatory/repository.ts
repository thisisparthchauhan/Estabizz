// ─────────────────────────────────────────────────────────────────────────────
// Regulatory Update Desk — server-side data access layer.
//
// Responsibilities:
//   • List / read updates for the admin desk (any status).
//   • Create / edit / submit / publish / reject / archive with a module-level
//     status workflow that does NOT bypass approval.
//   • Generate safe, unique slugs.
//   • Sanitise detailed content (no script / unsafe HTML).
//   • Write an accountability record on every important action.
//   • Read ONLY published updates for the public website.
//
// SERVER-SIDE ONLY — never import from a "use client" component.
// ─────────────────────────────────────────────────────────────────────────────

import { connectDB } from '@/lib/db';
import RegulatoryUpdate from '@/lib/models/RegulatoryUpdate';
import RegulatoryUpdateAudit from '@/lib/models/RegulatoryUpdateAudit';
import type { RegulatoryAuditAction } from '@/lib/models/RegulatoryUpdateAudit';
import { sanitizeBlogHtml } from '@/lib/blog/sanitize';
import {
  REGULATOR_OPTIONS, CATEGORY_OPTIONS, IMPACT_LEVEL_OPTIONS,
} from '@/lib/regulatory/types';
import type {
  RegulatoryUpdateRecord, PublicRegulatoryUpdate, RegulatoryUpdateInput,
  RegulatorOption, CategoryOption, ImpactLevel, RegulatoryUpdateStatus,
  RegulatoryPendingRevision,
} from '@/lib/regulatory/types';

// ─── Validation error (carries a friendly message + HTTP 400) ─────────────────

export class RegulatoryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegulatoryValidationError';
  }
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // strip anything unsafe
    .replace(/[\s_]+/g, '-')        // spaces → hyphen
    .replace(/-+/g, '-')            // collapse repeats
    .replace(/^-+|-+$/g, '')        // trim hyphens
    .slice(0, 90);
}

/** True for a syntactically valid http/https URL. Empty strings are allowed by callers. */
function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function parseDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => String(v).trim())
    .filter(Boolean)
    .slice(0, 40);
}

function iso(d: unknown): string | null {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** Generate a unique slug, suffixing -2, -3, … on collision. */
async function generateUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || 'regulatory-update';
  let candidate = root;
  let n = 1;
  // Loop until no other document holds this slug.
  // (Bounded in practice; the suffix grows monotonically.)
  while (true) {
    const clash = await RegulatoryUpdate.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select('_id').lean();
    if (!clash) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

// ─── Serialisers ──────────────────────────────────────────────────────────────

type RawDoc = Record<string, unknown>;

/** Convert a stored pendingRevision (may hold Date values) into a client-safe shape. */
function jsonSafePending(raw: unknown): RegulatoryPendingRevision | null {
  if (!raw || typeof raw !== 'object') return null;
  const src = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(src)) {
    if (v instanceof Date) out[k] = v.toISOString();
    else out[k] = v;
  }
  return out as RegulatoryPendingRevision;
}

function toRecord(doc: RawDoc): RegulatoryUpdateRecord {
  return {
    id:               String(doc._id),
    title:            String(doc.title ?? ''),
    slug:             String(doc.slug ?? ''),
    regulator:        (doc.regulator as RegulatorOption) ?? 'Other',
    category:         (doc.category as CategoryOption) ?? 'Other',
    summary:          String(doc.summary ?? ''),
    detailedContent:  String(doc.detailedContent ?? ''),
    sourceTitle:      String(doc.sourceTitle ?? ''),
    sourceUrl:        String(doc.sourceUrl ?? ''),
    sourceDate:       iso(doc.sourceDate),
    publishedDate:    iso(doc.publishedDate),
    effectiveDate:    iso(doc.effectiveDate),
    impactLevel:      (doc.impactLevel as ImpactLevel) ?? 'Medium',
    applicableTo:     Array.isArray(doc.applicableTo) ? (doc.applicableTo as unknown[]).map(String) : [],
    tags:             Array.isArray(doc.tags) ? (doc.tags as unknown[]).map(String) : [],
    status:           (doc.status as RegulatoryUpdateStatus) ?? 'draft',
    seoTitle:         String(doc.seoTitle ?? ''),
    seoDescription:   String(doc.seoDescription ?? ''),
    canonicalUrl:     String(doc.canonicalUrl ?? ''),
    featuredImageUrl: String(doc.featuredImageUrl ?? ''),
    createdBy:        String(doc.createdBy ?? ''),
    createdByRole:    String(doc.createdByRole ?? ''),
    updatedBy:        String(doc.updatedBy ?? ''),
    reviewedBy:       String(doc.reviewedBy ?? ''),
    reviewComment:    String(doc.reviewComment ?? ''),
    publishedBy:      String(doc.publishedBy ?? ''),
    archivedBy:       String(doc.archivedBy ?? ''),
    publishedAt:      iso(doc.publishedAt),
    archivedAt:       iso(doc.archivedAt),
    createdAt:        iso(doc.createdAt) ?? new Date().toISOString(),
    updatedAt:        iso(doc.updatedAt) ?? new Date().toISOString(),

    hasPendingChanges:    !!doc.hasPendingChanges,
    pendingRevision:      jsonSafePending(doc.pendingRevision),
    pendingSubmittedBy:   String(doc.pendingSubmittedBy ?? ''),
    pendingSubmittedAt:   iso(doc.pendingSubmittedAt),
    pendingReviewComment: String(doc.pendingReviewComment ?? ''),

    deletedFromStatus: String(doc.deletedFromStatus ?? ''),
    deletedAt:         iso(doc.deletedAt),
    deletedBy:         String(doc.deletedBy ?? ''),
  };
}

function toPublic(doc: RawDoc): PublicRegulatoryUpdate {
  const r = toRecord(doc);
  return {
    title:            r.title,
    slug:             r.slug,
    regulator:        r.regulator,
    category:         r.category,
    summary:          r.summary,
    detailedContent:  r.detailedContent,
    sourceTitle:      r.sourceTitle,
    sourceUrl:        r.sourceUrl,
    sourceDate:       r.sourceDate,
    publishedDate:    r.publishedDate,
    effectiveDate:    r.effectiveDate,
    impactLevel:      r.impactLevel,
    applicableTo:     r.applicableTo,
    tags:             r.tags,
    seoTitle:         r.seoTitle,
    seoDescription:   r.seoDescription,
    canonicalUrl:     r.canonicalUrl,
    featuredImageUrl: r.featuredImageUrl,
    publishedAt:      r.publishedAt,
  };
}

// ─── Audit ────────────────────────────────────────────────────────────────────

async function writeAudit(
  action: RegulatoryAuditAction,
  updateId: string,
  title: string,
  actor: string,
  actorRole: string,
  detail?: string,
): Promise<void> {
  try {
    await RegulatoryUpdateAudit.create({ action, updateId, title, actor, actorRole, detail });
  } catch (err) {
    // Auditing must never block the primary action; log and continue.
    console.error('[regulatory] audit write failed:', err);
  }
}

// ─── Field normalisation / validation ─────────────────────────────────────────

interface NormalisedFields {
  set: Record<string, unknown>;
  titleForSlug?: string;
}

/**
 * Validate & normalise an input payload into a `$set` object.
 * `requireCore` enforces the mandatory fields (title/regulator/category/summary)
 * — used on create. On partial edits, only provided fields are validated.
 */
function normaliseInput(input: RegulatoryUpdateInput, requireCore: boolean): NormalisedFields {
  const set: Record<string, unknown> = {};

  if (input.title !== undefined) {
    const title = String(input.title).trim();
    if (requireCore && !title) throw new RegulatoryValidationError('Title is required.');
    if (title) set.title = title;
  } else if (requireCore) {
    throw new RegulatoryValidationError('Title is required.');
  }

  if (input.regulator !== undefined) {
    if (!REGULATOR_OPTIONS.includes(input.regulator)) {
      throw new RegulatoryValidationError('Please choose a valid regulator.');
    }
    set.regulator = input.regulator;
  } else if (requireCore) {
    throw new RegulatoryValidationError('Regulator is required.');
  }

  if (input.category !== undefined) {
    if (!CATEGORY_OPTIONS.includes(input.category)) {
      throw new RegulatoryValidationError('Please choose a valid category.');
    }
    set.category = input.category;
  } else if (requireCore) {
    throw new RegulatoryValidationError('Category is required.');
  }

  if (input.summary !== undefined) {
    const summary = String(input.summary).trim();
    if (requireCore && !summary) throw new RegulatoryValidationError('Summary is required.');
    if (summary) set.summary = summary;
  } else if (requireCore) {
    throw new RegulatoryValidationError('Summary is required.');
  }

  if (input.detailedContent !== undefined) {
    // Safe controlled rich text only — strips <script>, event handlers, etc.
    set.detailedContent = sanitizeBlogHtml(String(input.detailedContent));
  }

  if (input.sourceTitle !== undefined) set.sourceTitle = String(input.sourceTitle).trim();

  if (input.sourceUrl !== undefined) {
    const url = String(input.sourceUrl).trim();
    if (url && !isValidUrl(url)) {
      throw new RegulatoryValidationError('Source link must be a valid http(s) URL.');
    }
    set.sourceUrl = url;
  }

  if (input.canonicalUrl !== undefined) {
    const url = String(input.canonicalUrl).trim();
    if (url && !isValidUrl(url)) {
      throw new RegulatoryValidationError('Canonical link must be a valid http(s) URL.');
    }
    set.canonicalUrl = url;
  }

  if (input.featuredImageUrl !== undefined) {
    const url = String(input.featuredImageUrl).trim();
    if (url && !isValidUrl(url)) {
      throw new RegulatoryValidationError('Image link must be a valid http(s) URL.');
    }
    set.featuredImageUrl = url;
  }

  if (input.sourceDate !== undefined)    set.sourceDate    = parseDate(input.sourceDate) ?? null;
  if (input.publishedDate !== undefined) set.publishedDate = parseDate(input.publishedDate) ?? null;
  if (input.effectiveDate !== undefined) set.effectiveDate = parseDate(input.effectiveDate) ?? null;

  if (input.impactLevel !== undefined) {
    if (!IMPACT_LEVEL_OPTIONS.includes(input.impactLevel)) {
      throw new RegulatoryValidationError('Please choose a valid impact level.');
    }
    set.impactLevel = input.impactLevel;
  }

  if (input.applicableTo !== undefined) set.applicableTo = cleanList(input.applicableTo);
  if (input.tags !== undefined)         set.tags         = cleanList(input.tags);

  if (input.seoTitle !== undefined)       set.seoTitle       = String(input.seoTitle).trim().slice(0, 70);
  if (input.seoDescription !== undefined) set.seoDescription = String(input.seoDescription).trim().slice(0, 200);

  return { set, titleForSlug: set.title as string | undefined };
}

// ─── Admin: list ──────────────────────────────────────────────────────────────

export interface ListFilters {
  search?: string;
  regulator?: string;
  category?: string;
  status?: string;
  impactLevel?: string;
}

export async function listUpdatesForAdmin(filters: ListFilters): Promise<RegulatoryUpdateRecord[]> {
  await connectDB();
  const query: Record<string, unknown> = {};

  if (filters.regulator && filters.regulator !== 'all')   query.regulator   = filters.regulator;
  if (filters.category && filters.category !== 'all')     query.category    = filters.category;
  if (filters.impactLevel && filters.impactLevel !== 'all') query.impactLevel = filters.impactLevel;

  // Deleted items live in the Recycle Bin: exclude them from the default ("all")
  // desk view, but allow an explicit "Deleted" filter to surface them here too.
  if (filters.status && filters.status !== 'all') {
    query.status = filters.status;
  } else {
    query.status = { $ne: 'deleted' };
  }

  const search = filters.search?.trim();
  if (search) {
    const rx = { $regex: search, $options: 'i' };
    query.$or = [
      { title: rx }, { summary: rx }, { regulator: rx }, { category: rx },
      { sourceTitle: rx }, { tags: rx },
    ];
  }

  const docs = await RegulatoryUpdate.find(query).sort({ updatedAt: -1 }).limit(500).lean();
  return (docs as unknown as RawDoc[]).map(toRecord);
}

export async function getUpdateForAdmin(id: string): Promise<RegulatoryUpdateRecord | null> {
  await connectDB();
  const doc = await RegulatoryUpdate.findById(id).lean();
  return doc ? toRecord(doc as unknown as RawDoc) : null;
}

// ─── Admin: create ────────────────────────────────────────────────────────────

export async function createUpdate(
  input: RegulatoryUpdateInput,
  actor: string,
  actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const { set } = normaliseInput(input, true);

  const slug = await generateUniqueSlug(
    (input.slug && input.slug.trim()) || (set.title as string),
  );

  const doc = await RegulatoryUpdate.create({
    ...set,
    slug,
    status: 'draft',
    createdBy: actor,
    createdByRole: actorRole,
    updatedBy: actor,
  });

  const record = toRecord(doc.toObject() as unknown as RawDoc);
  await writeAudit('create', record.id, record.title, actor, actorRole, 'Draft created.');
  return record;
}

// ─── Admin: edit ──────────────────────────────────────────────────────────────

export async function updateUpdate(
  id: string,
  input: RegulatoryUpdateInput,
  actor: string,
  actorRole: string,
  canPublish: boolean,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') {
    throw new RegulatoryValidationError('This update is in the Recycle Bin. Restore it before editing.');
  }

  const { set } = normaliseInput(input, false);

  // ── CRITICAL LIFECYCLE RULE ────────────────────────────────────────────────
  // A live published update must STAY public while edits are under review.
  // If a non-publisher edits a published item, the edits are stored as a
  // PENDING REVISION and the live published fields are left untouched, so the
  // public website keeps showing the last approved version.
  if (existing.status === 'published' && !canPublish) {
    const merged = { ...(existing.pendingRevision ?? {}), ...set };
    await RegulatoryUpdate.findByIdAndUpdate(id, {
      $set: {
        pendingRevision:      merged,
        hasPendingChanges:    true,
        pendingSubmittedBy:   actor,
        pendingSubmittedAt:   new Date(),
        pendingReviewComment: '',
        updatedBy:            actor,
      },
    });
    const fresh = await RegulatoryUpdate.findById(id).lean();
    const record = toRecord(fresh as unknown as RawDoc);
    await writeAudit('save_pending_revision', record.id, record.title, actor, actorRole,
      'Edits saved as pending changes. The published version stays live until approved.');
    return record;
  }

  // ── Direct edit (publisher on a published item, or any edit on a non-published
  //    item) — applies straight to the live fields. ───────────────────────────
  set.updatedBy = actor;

  // Explicit slug change, or regenerate when the title changes and no slug exists.
  if (input.slug !== undefined && String(input.slug).trim()) {
    set.slug = await generateUniqueSlug(String(input.slug), id);
  } else if (set.title && set.title !== existing.title && !existing.slug) {
    set.slug = await generateUniqueSlug(String(set.title), id);
  }

  // A publisher's direct edit of a published item supersedes any staged
  // pending revision, so clear it.
  if (existing.status === 'published' && canPublish && existing.hasPendingChanges) {
    set.hasPendingChanges = false;
    set.pendingRevision = null;
    set.pendingSubmittedBy = '';
    set.pendingReviewComment = '';
  }

  const updated = await RegulatoryUpdate.findByIdAndUpdate(id, { $set: set }, { new: true }).lean();
  const record = toRecord(updated as unknown as RawDoc);
  await writeAudit('update', record.id, record.title, actor, actorRole, 'Details updated.');
  return record;
}

// ─── Admin: pending-revision approval / rejection ─────────────────────────────

/** Apply a published item's staged pending changes to the live fields. */
export async function approvePendingChanges(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (!existing.hasPendingChanges || !existing.pendingRevision) {
    throw new RegulatoryValidationError('There are no pending changes to approve.');
  }

  const pending = existing.pendingRevision as Record<string, unknown>;
  await RegulatoryUpdate.findByIdAndUpdate(id, {
    $set: {
      ...pending,                 // apply staged edits to live fields
      hasPendingChanges:    false,
      pendingRevision:      null,
      pendingSubmittedBy:   '',
      pendingReviewComment: '',
      reviewedBy:           actor,
      updatedBy:            actor,
    },
    $unset: { pendingSubmittedAt: 1 },
  });

  const fresh = await RegulatoryUpdate.findById(id).lean();
  const record = toRecord(fresh as unknown as RawDoc);
  await writeAudit('approve_pending_revision', record.id, record.title, actor, actorRole,
    'Pending changes approved and applied to the live version.');
  return record;
}

/** Discard a published item's staged pending changes; the live version is unchanged. */
export async function rejectPendingChanges(
  id: string, actor: string, actorRole: string, comment: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (!existing.hasPendingChanges) {
    throw new RegulatoryValidationError('There are no pending changes to reject.');
  }

  const note = String(comment ?? '').trim().slice(0, 1000);
  await RegulatoryUpdate.findByIdAndUpdate(id, {
    $set: {
      hasPendingChanges:    false,
      pendingRevision:      null,
      pendingSubmittedBy:   '',
      pendingReviewComment: note,
      reviewedBy:           actor,
      updatedBy:            actor,
    },
    $unset: { pendingSubmittedAt: 1 },
  });

  const fresh = await RegulatoryUpdate.findById(id).lean();
  const record = toRecord(fresh as unknown as RawDoc);
  await writeAudit('reject', record.id, record.title, actor, actorRole,
    note ? `Pending changes rejected: ${note}` : 'Pending changes rejected. Live version unchanged.');
  return record;
}

// ─── Admin: move a published item back to draft (unpublish) ───────────────────

export async function moveToDraft(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') {
    throw new RegulatoryValidationError('This update is in the Recycle Bin.');
  }
  existing.status = 'draft';
  // Becoming a draft means edits apply directly, so drop any staged revision.
  existing.hasPendingChanges = false;
  existing.pendingRevision = null;
  existing.pendingSubmittedBy = '';
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('move_to_draft', record.id, record.title, actor, actorRole,
    'Moved to Draft (removed from the public website).');
  return record;
}

// ─── Admin: soft-delete / restore / purge (Recycle Bin) ───────────────────────

export async function deleteUpdate(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') {
    throw new RegulatoryValidationError('This update is already in the Recycle Bin.');
  }
  existing.deletedFromStatus = existing.status;   // remember where to restore to
  existing.status = 'deleted';
  existing.deletedAt = new Date();
  existing.deletedBy = actor;
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('delete', record.id, record.title, actor, actorRole,
    `Moved to Recycle Bin (was ${record.deletedFromStatus || 'unknown'}).`);
  return record;
}

/** Valid statuses an item may be restored back into. */
const RESTORABLE: RegulatoryUpdateStatus[] = [
  'published', 'draft', 'pending_approval', 'rejected', 'archived',
];

export async function restoreDeletedUpdate(
  id: string, actor: string, actorRole: string,
): Promise<{ record: RegulatoryUpdateRecord; name: string }> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Item not found in Recycle Bin.');
  if (existing.status !== 'deleted') {
    throw new RegulatoryValidationError('This update is not in the Recycle Bin.');
  }

  const prior = String(existing.deletedFromStatus ?? '') as RegulatoryUpdateStatus;
  const target: RegulatoryUpdateStatus = RESTORABLE.includes(prior) ? prior : 'draft';

  existing.status = target;
  existing.deletedFromStatus = '';
  existing.deletedBy = '';
  existing.deletedAt = undefined;
  existing.updatedBy = actor;
  await existing.save();

  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('restore', record.id, record.title, actor, actorRole,
    `Restored from Recycle Bin to ${target}.`);
  return { record, name: record.title };
}

export async function purgeDeletedUpdate(
  id: string, actor: string, actorRole: string,
): Promise<{ name: string }> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Item not found in Recycle Bin.');

  const title = existing.title;
  // Write the audit record BEFORE deleting so the purge stays accountable.
  await writeAudit('purge', String(existing._id), title, actor, actorRole,
    'Permanently deleted from the Recycle Bin.');
  await RegulatoryUpdate.findByIdAndDelete(id);
  return { name: title };
}

// ─── Admin: workflow transitions ──────────────────────────────────────────────

export async function submitForReview(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') throw new RegulatoryValidationError('This update is in the Recycle Bin.');
  if (!existing.title || !existing.summary || !existing.regulator || !existing.category) {
    throw new RegulatoryValidationError('Add a title, regulator, category and summary before submitting.');
  }
  existing.status = 'pending_approval';
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('submit', record.id, record.title, actor, actorRole, 'Submitted for review.');
  return record;
}

export async function publishUpdate(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') throw new RegulatoryValidationError('This update is in the Recycle Bin. Restore it first.');
  if (!existing.title || !existing.summary || !existing.regulator || !existing.category) {
    throw new RegulatoryValidationError('A title, regulator, category and summary are required to publish.');
  }
  existing.status = 'published';
  existing.publishedBy = actor;
  existing.publishedAt = new Date();
  if (!existing.publishedDate) existing.publishedDate = new Date();
  existing.reviewedBy = actor;
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('publish', record.id, record.title, actor, actorRole, 'Published to the website.');
  return record;
}

export async function rejectUpdate(
  id: string, actor: string, actorRole: string, comment: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') throw new RegulatoryValidationError('This update is in the Recycle Bin.');
  existing.status = 'rejected';
  existing.reviewedBy = actor;
  existing.reviewComment = String(comment ?? '').trim().slice(0, 1000);
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('reject', record.id, record.title, actor, actorRole, record.reviewComment || 'Rejected.');
  return record;
}

export async function archiveUpdate(
  id: string, actor: string, actorRole: string,
): Promise<RegulatoryUpdateRecord> {
  await connectDB();
  const existing = await RegulatoryUpdate.findById(id);
  if (!existing) throw new RegulatoryValidationError('Update not found.');
  if (existing.status === 'deleted') throw new RegulatoryValidationError('This update is in the Recycle Bin.');
  existing.status = 'archived';
  existing.archivedBy = actor;
  existing.archivedAt = new Date();
  existing.updatedBy = actor;
  await existing.save();
  const record = toRecord(existing.toObject() as unknown as RawDoc);
  await writeAudit('archive', record.id, record.title, actor, actorRole, 'Archived (removed from the website).');
  return record;
}

// ─── Public: published-only reads ─────────────────────────────────────────────

export async function listPublishedUpdates(): Promise<PublicRegulatoryUpdate[]> {
  try {
    await connectDB();
    const docs = await RegulatoryUpdate.find({ status: 'published' })
      .sort({ publishedAt: -1, publishedDate: -1, createdAt: -1 })
      .limit(200)
      .lean();
    return (docs as unknown as RawDoc[]).map(toPublic);
  } catch (err) {
    console.error('[regulatory] listPublishedUpdates failed:', err);
    return [];
  }
}

export async function getPublishedUpdateBySlug(slug: string): Promise<PublicRegulatoryUpdate | null> {
  try {
    await connectDB();
    const doc = await RegulatoryUpdate.findOne({ slug, status: 'published' }).lean();
    return doc ? toPublic(doc as unknown as RawDoc) : null;
  } catch (err) {
    console.error('[regulatory] getPublishedUpdateBySlug failed:', err);
    return null;
  }
}
