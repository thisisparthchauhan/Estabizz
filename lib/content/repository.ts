/**
 * Content repository — server-side data access for the CMS admin.
 *
 * Responsibilities:
 *   • Read a block for editing (any status, merged over defaults).
 *   • List all known blocks for the admin index.
 *   • Save a block with: version snapshot + audit log + approval workflow.
 *   • Read version history.
 *
 * SERVER-SIDE ONLY — never import from a "use client" component.
 */

import { connectDB } from '@/lib/db';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentVersion from '@/lib/models/ContentVersion';
import ContentAudit from '@/lib/models/ContentAudit';
import { CONTENT_DEFAULTS, getDefaultFields } from '@/lib/content/defaults';
import type {
  ContentFields,
  ContentStatus,
  ContentAuditAction,
} from '@/lib/content/types';
import type { AdminRole } from '@/lib/admin/types';
import { canPublishInstantly } from '@/lib/admin/requirePermission';

// ─── Shapes returned to the admin UI ──────────────────────────────────────────

export interface AdminContentBlock {
  key: string;
  label: string;
  group: string;
  fields: ContentFields;      // current (DB over defaults)
  status: ContentStatus;
  isLive: boolean;            // true when a published DB record exists
  updatedBy: string;
  updatedAt: string | null;   // ISO
}

// ─── Read: a single block for the editor form ─────────────────────────────────

export async function getContentForEdit(key: string): Promise<AdminContentBlock | null> {
  const def = CONTENT_DEFAULTS[key];
  if (!def) return null;

  const defaults = def.fields;

  try {
    await connectDB();
    const block = await ContentBlock.findOne({ key }).lean<{
      fields?: ContentFields;
      status?: ContentStatus;
      updatedBy?: string;
      updatedAt?: Date;
    }>();

    return {
      key,
      label: def.label,
      group: def.group,
      fields: block?.fields ? { ...defaults, ...block.fields } : { ...defaults },
      status: block?.status ?? 'published',
      isLive: !!block,
      updatedBy: block?.updatedBy ?? '',
      updatedAt: block?.updatedAt ? new Date(block.updatedAt).toISOString() : null,
    };
  } catch (err) {
    console.error(`[getContentForEdit] "${key}" — using defaults:`, err);
    return {
      key, label: def.label, group: def.group,
      fields: { ...defaults }, status: 'published', isLive: false,
      updatedBy: '', updatedAt: null,
    };
  }
}

// ─── Read: list every known block ─────────────────────────────────────────────

export async function listContentBlocks(): Promise<AdminContentBlock[]> {
  const defs = Object.values(CONTENT_DEFAULTS);
  let dbBlocks: Record<string, { status?: ContentStatus; updatedBy?: string; updatedAt?: Date }> = {};

  try {
    await connectDB();
    const docs = await ContentBlock.find({})
      .select('key status updatedBy updatedAt')
      .lean<{ key: string; status?: ContentStatus; updatedBy?: string; updatedAt?: Date }[]>();
    dbBlocks = Object.fromEntries(docs.map((d) => [d.key, d]));
  } catch (err) {
    console.error('[listContentBlocks] DB read failed, listing defaults only:', err);
  }

  return defs.map((def) => {
    const db = dbBlocks[def.key];
    return {
      key: def.key,
      label: def.label,
      group: def.group,
      fields: def.fields,
      status: db?.status ?? 'published',
      isLive: !!db,
      updatedBy: db?.updatedBy ?? '',
      updatedAt: db?.updatedAt ? new Date(db.updatedAt).toISOString() : null,
    };
  });
}

// ─── Write: save a block (with versioning, audit, workflow) ───────────────────

export interface SaveContentArgs {
  key: string;
  fields: ContentFields;
  actorEmail: string;
  actorRole: AdminRole;
}

export interface SaveContentResult {
  status: ContentStatus;
  wentLive: boolean;
}

export async function saveContent(args: SaveContentArgs): Promise<SaveContentResult> {
  const { key, fields, actorEmail, actorRole } = args;

  if (!CONTENT_DEFAULTS[key]) {
    throw new Error(`Unknown content key: ${key}`);
  }

  await connectDB();

  // Workflow: admins/super_admins publish instantly; staff go to approval.
  const instant = canPublishInstantly(actorRole);
  const status: ContentStatus = instant ? 'published' : 'pending_approval';
  const action: ContentAuditAction = instant ? 'publish' : 'submit';

  const existing = await ContentBlock.findOne({ key });
  const isNew = !existing;

  // Merge over current/default so partial saves keep prior values.
  const baseFields = existing?.fields ?? getDefaultFields(key);
  const mergedFields = { ...baseFields, ...fields };

  const update: Record<string, unknown> = {
    fields: mergedFields,
    status,
    updatedBy: actorEmail,
  };
  if (!instant) update.submittedBy = actorEmail;

  await ContentBlock.findOneAndUpdate({ key }, update, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  // Version snapshot (history / restore)
  await ContentVersion.create({
    blockKey: key,
    snapshot: mergedFields,
    status,
    changedBy: actorEmail,
    note: isNew ? 'created' : instant ? 'edited & published' : 'submitted for approval',
  });

  // Audit trail
  await ContentAudit.create({
    action: isNew ? 'create' : action,
    blockKey: key,
    actor: actorEmail,
  });

  return { status, wentLive: instant };
}

// ─── Read: version history ────────────────────────────────────────────────────

export interface VersionEntry {
  id: string;
  snapshot: ContentFields;
  status: ContentStatus;
  changedBy: string;
  changedAt: string;  // ISO
  note?: string;
}

export async function getVersions(key: string, limit = 20): Promise<VersionEntry[]> {
  try {
    await connectDB();
    const docs = await ContentVersion.find({ blockKey: key })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<{ _id: unknown; snapshot: ContentFields; status: ContentStatus; changedBy: string; createdAt: Date; note?: string }[]>();

    return docs.map((d) => ({
      id: String(d._id),
      snapshot: d.snapshot,
      status: d.status,
      changedBy: d.changedBy,
      changedAt: new Date(d.createdAt).toISOString(),
      note: d.note,
    }));
  } catch (err) {
    console.error(`[getVersions] "${key}":`, err);
    return [];
  }
}
