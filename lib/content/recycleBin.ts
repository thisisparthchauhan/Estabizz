/**
 * Recycle Bin — data access layer.
 * Lists, restores and purges soft-deleted items.
 * SERVER-SIDE ONLY.
 */

import { connectDB } from '@/lib/db';
import MediaAsset from '@/lib/models/MediaAsset';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentAudit from '@/lib/models/ContentAudit';
import { CONTENT_DEFAULTS } from '@/lib/content/defaults';
import type { RecycleBinFilters, RecycleBinItem, RecycleBinResult } from './recycleBinTypes';

// ─── Internal helpers ─────────────────────────────────────────────────────────

function mediaSubType(format: string): string {
  if (['jpg', 'jpeg', 'png', 'webp'].includes(format)) return 'Image';
  if (format === 'svg') return 'Icon / SVG';
  if (format === 'pdf') return 'PDF';
  return 'Media File';
}

function contentSubType(key: string): string {
  if (key.startsWith('seo.'))    return 'SEO Block';
  if (key.startsWith('global.')) return 'Global Block';
  return 'Website Section';
}

function contentLocation(key: string): string {
  const def = CONTENT_DEFAULTS[key];
  return def ? `${def.group} — ${def.label}` : key;
}

// ─── Types for lean() results ─────────────────────────────────────────────────

interface LeanMediaDoc {
  _id:        unknown;
  title?:     string;
  fileName:   string;
  format:     string;
  secureUrl:  string;
  folder?:    string;
  updatedAt:  Date;
}

interface LeanContentDoc {
  _id:        unknown;
  key:        string;
  deletedBy?: string;
  deletedAt?: Date;
  updatedAt:  Date;
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listRecycleBinItems(
  filters: RecycleBinFilters = {}
): Promise<RecycleBinResult> {
  await connectDB();

  const type        = filters.type ?? 'all';
  const search      = (filters.search  ?? '').trim().toLowerCase();
  const removedByF  = (filters.removedBy ?? '').trim().toLowerCase();
  const from        = filters.from ?? '';
  const to          = filters.to   ?? '';
  const page        = Math.max(1, Number(filters.page  ?? 1));
  const limit       = Math.min(50, Math.max(5, Number(filters.limit ?? 25)));

  const items: RecycleBinItem[] = [];

  // ── Removed media ──────────────────────────────────────────────────────────
  if (type === 'all' || type === 'media') {
    const q: Record<string, unknown> = { status: 'removed' };
    if (from) q.updatedAt = { ...(q.updatedAt as object ?? {}), $gte: new Date(`${from}T00:00:00`) };
    if (to)   q.updatedAt = { ...(q.updatedAt as object ?? {}), $lte: new Date(`${to}T23:59:59`) };

    const docs = await MediaAsset.find(q).sort({ updatedAt: -1 }).lean<LeanMediaDoc[]>();

    for (const doc of docs) {
      const name = (doc.title || doc.fileName).trim();
      if (search && !name.toLowerCase().includes(search) && !doc.fileName.toLowerCase().includes(search)) continue;
      // No removedBy stored on media — skip media rows only if filter explicitly names someone
      if (removedByF) continue;

      items.push({
        id:             String(doc._id),
        type:           'media',
        name:           name || doc.fileName,
        subType:        mediaSubType(doc.format),
        location:       doc.folder || 'Media Library',
        removedBy:      'Unknown',
        removedAt:      new Date(doc.updatedAt).toISOString(),
        originalStatus: 'active',
        previewUrl:     doc.secureUrl,
        format:         doc.format,
      });
    }
  }

  // ── Deleted content blocks ─────────────────────────────────────────────────
  if (type === 'all' || type === 'content') {
    const q: Record<string, unknown> = { status: 'deleted' };
    if (from) q.deletedAt = { $gte: new Date(`${from}T00:00:00`) };
    if (to)   q.deletedAt = { $lte: new Date(`${to}T23:59:59`) };
    if (removedByF) q.deletedBy = { $regex: removedByF, $options: 'i' };

    const docs = await ContentBlock.find(q).sort({ deletedAt: -1, updatedAt: -1 }).lean<LeanContentDoc[]>();

    for (const doc of docs) {
      const def  = CONTENT_DEFAULTS[doc.key];
      const name = def?.label ?? doc.key;
      if (search && !name.toLowerCase().includes(search) && !doc.key.toLowerCase().includes(search)) continue;

      items.push({
        id:             String(doc._id),
        type:           'content',
        name,
        subType:        contentSubType(doc.key),
        location:       contentLocation(doc.key),
        removedBy:      doc.deletedBy ?? 'Unknown',
        removedAt:      doc.deletedAt
                          ? new Date(doc.deletedAt).toISOString()
                          : new Date(doc.updatedAt).toISOString(),
        originalStatus: 'published',
        contentKey:     doc.key,
      });
    }
  }

  items.sort((a, b) => new Date(b.removedAt).getTime() - new Date(a.removedAt).getTime());

  const total      = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start      = (page - 1) * limit;

  return { items: items.slice(start, start + limit), page, limit, total, totalPages };
}

// ─── Restore ──────────────────────────────────────────────────────────────────

export async function restoreRecycleBinItem(
  actor: string,
  id:    string,
  type:  'media' | 'content'
): Promise<{ name: string }> {
  await connectDB();

  if (type === 'media') {
    const doc = await MediaAsset.findByIdAndUpdate(
      id,
      { $set: { status: 'active' } },
      { new: true }
    ).lean<LeanMediaDoc | null>();

    if (!doc) throw new Error('Item not found in Recycle Bin.');

    const name = (doc.title || doc.fileName).trim();

    await ContentAudit.create({
      action:   'restore_from_bin',
      blockKey: `media:${id}`,
      actor,
      detail:   `Restored media file from Recycle Bin: ${name}`,
    });

    return { name };
  }

  // Content block
  const doc = await ContentBlock.findByIdAndUpdate(
    id,
    { $set: { status: 'draft' }, $unset: { deletedBy: 1, deletedAt: 1 } },
    { new: true }
  ).lean<LeanContentDoc | null>();

  if (!doc) throw new Error('Item not found in Recycle Bin.');

  const def  = CONTENT_DEFAULTS[doc.key ?? ''];
  const name = def?.label ?? doc.key ?? 'Content block';

  await ContentAudit.create({
    action:   'restore_from_bin',
    blockKey: doc.key ?? id,
    actor,
    detail:   `Restored content block from Recycle Bin: ${name}. Status set to Draft for review.`,
  });

  return { name };
}

// ─── Purge ────────────────────────────────────────────────────────────────────

export async function purgeRecycleBinItem(
  actor: string,
  id:    string,
  type:  'media' | 'content'
): Promise<{ name: string }> {
  await connectDB();

  if (type === 'media') {
    const doc = await MediaAsset.findById(id).lean<LeanMediaDoc | null>();
    if (!doc) throw new Error('Item not found in Recycle Bin.');

    const name = (doc.title || doc.fileName).trim();

    await ContentAudit.create({
      action:            'purge',
      blockKey:          `media:${id}`,
      actor,
      passwordConfirmed: true,
      detail: `Permanently removed media record from library: ${name}. Cloudinary asset not purged — manual cleanup may be required.`,
    });

    await MediaAsset.findByIdAndDelete(id);
    return { name };
  }

  // Content block — delete the MongoDB document; site falls back to hardcoded defaults.
  const doc = await ContentBlock.findById(id).lean<LeanContentDoc | null>();
  if (!doc) throw new Error('Item not found in Recycle Bin.');

  const def  = CONTENT_DEFAULTS[doc.key ?? ''];
  const name = def?.label ?? doc.key ?? 'Content block';

  await ContentAudit.create({
    action:            'purge',
    blockKey:          doc.key ?? id,
    actor,
    passwordConfirmed: true,
    detail: `Permanently purged content block: ${name}. Site will display the built-in default content for this section.`,
  });

  await ContentBlock.findByIdAndDelete(id);
  return { name };
}
