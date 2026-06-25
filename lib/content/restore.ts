import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentVersion from '@/lib/models/ContentVersion';
import ContentAudit from '@/lib/models/ContentAudit';
import { getAdminUserByEmail } from '@/lib/admin/repository';
import { ROLE_LABELS } from '@/lib/admin/types';
import type { AdminContext } from '@/lib/admin/requirePermission';
import type { AdminPermission } from '@/lib/admin/types';
import { CONTENT_DEFAULTS, getDefaultFields } from '@/lib/content/defaults';
import { PAGES } from '@/lib/content/pageCatalog';
import type { ContentFields, ContentStatus } from '@/lib/content/types';
import type {
  RestoreActionResult,
  RestoreFieldChange,
  RestoreFilters,
  RestoreItemType,
  RestoreListResult,
  RestoreSnapshotField,
  RestoreVersionItem,
} from '@/lib/content/restoreTypes';

type VersionDoc = {
  _id: unknown;
  blockKey: string;
  snapshot?: ContentFields;
  status: ContentStatus;
  changedBy: string;
  note?: string;
  createdAt: Date;
};

type BlockDoc = {
  key: string;
  fields?: ContentFields;
  status?: ContentStatus;
  updatedAt?: Date;
};

const MAX_RESTORE_SCAN = 500;

const contentMetaByKey = new Map(
  PAGES.flatMap((page) => page.sections.map((section) => [
    section.key,
    { pageName: page.name, sectionName: section.name, path: page.path },
  ] as const))
);

function hasPermission(admin: AdminContext, permission: AdminPermission): boolean {
  return admin.permissions.includes(permission);
}

function isElevatedAdmin(admin: AdminContext): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

function itemTypeForKey(key: string): RestoreItemType {
  return key.startsWith('seo.') ? 'seo' : 'content';
}

function canSeeType(admin: AdminContext, type: RestoreItemType): boolean {
  if (isElevatedAdmin(admin) || admin.role === 'admin_viewer') return true;
  if (type === 'seo') return hasPermission(admin, 'manage_seo');
  return hasPermission(admin, 'manage_content') || hasPermission(admin, 'publish_content');
}

export function canRestoreKey(admin: AdminContext, key: string): boolean {
  if (isElevatedAdmin(admin)) return true;
  if (key.startsWith('seo.')) return hasPermission(admin, 'manage_seo');
  return hasPermission(admin, 'publish_content');
}

function labelFromPath(path: string): string {
  return path
    .replace(/\.(\d+)\./g, ' $1 ')
    .replace(/\.(\d+)$/g, ' $1')
    .replace(/\./g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bOg\b/g, 'Social')
    .replace(/\bSeo\b/g, 'SEO')
    .replace(/\bUrl\b/g, 'URL');
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function valueForDisplay(value: unknown): string {
  if (value === undefined || value === null || value === '') return 'Empty';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value.length > 800 ? `${value.slice(0, 800)}...` : value;
  if (Array.isArray(value)) return `${value.length} item${value.length === 1 ? '' : 's'}`;
  return 'Multiple fields';
}

function flattenFields(value: unknown, prefix = ''): Record<string, string> {
  if (Array.isArray(value)) {
    if (!value.length && prefix) return { [prefix]: valueForDisplay(value) };
    return value.reduce<Record<string, string>>((out, item, index) => {
      const next = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      if (isPlainRecord(item) || Array.isArray(item)) {
        return { ...out, ...flattenFields(item, next) };
      }
      out[next] = valueForDisplay(item);
      return out;
    }, {});
  }

  if (isPlainRecord(value)) {
    const entries = Object.entries(value);
    if (!entries.length && prefix) return { [prefix]: valueForDisplay(value) };
    return entries.reduce<Record<string, string>>((out, [key, child]) => {
      const next = prefix ? `${prefix}.${key}` : key;
      if (isPlainRecord(child) || Array.isArray(child)) {
        return { ...out, ...flattenFields(child, next) };
      }
      out[next] = valueForDisplay(child);
      return out;
    }, {});
  }

  return prefix ? { [prefix]: valueForDisplay(value) } : {};
}

function diffFields(current: ContentFields, selected: ContentFields): RestoreFieldChange[] {
  const currentFlat = flattenFields(current);
  const selectedFlat = flattenFields(selected);
  const keys = Array.from(new Set([...Object.keys(currentFlat), ...Object.keys(selectedFlat)])).sort();

  return keys
    .filter((key) => currentFlat[key] !== selectedFlat[key])
    .map((key) => ({
      field: labelFromPath(key),
      currentValue: currentFlat[key] ?? 'Empty',
      selectedValue: selectedFlat[key] ?? 'Empty',
    }));
}

function snapshotFields(fields: ContentFields, limit = 18): RestoreSnapshotField[] {
  return Object.entries(fields)
    .slice(0, limit)
    .map(([field, value]) => ({ field: labelFromPath(field), value: valueForDisplay(value) }));
}

async function roleForEmail(email: string): Promise<string> {
  if (!email) return 'Unknown';
  const admin = await getAdminUserByEmail(email);
  return admin ? ROLE_LABELS[admin.role] : 'Unknown';
}

async function currentLiveFields(key: string, liveBlocks: Map<string, BlockDoc>): Promise<ContentFields> {
  const defaults = getDefaultFields(key);
  const block = liveBlocks.get(key);
  if (block?.fields && block.status === 'published') return { ...defaults, ...block.fields };

  const latestPublished = await ContentVersion.findOne({ blockKey: key, status: 'published' })
    .sort({ createdAt: -1 })
    .lean<{ snapshot?: ContentFields }>();

  return latestPublished?.snapshot ? { ...defaults, ...latestPublished.snapshot } : { ...defaults };
}

function pagePathForKey(key: string): string {
  return contentMetaByKey.get(key)?.path ?? '/';
}

function typeMatches(type: RestoreItemType, filter?: string): boolean {
  if (!filter || filter === 'all') return true;
  if (filter === 'website') return type === 'content';
  if (filter === 'seo') return type === 'seo';
  return false;
}

function matchesText(item: RestoreVersionItem, filters: RestoreFilters): boolean {
  const changedBy = (filters.changedBy ?? '').toLowerCase().trim();
  if (changedBy && !item.createdBy.toLowerCase().includes(changedBy)) return false;

  const search = (filters.search ?? '').toLowerCase().trim();
  if (!search) return true;

  return [
    item.pageName,
    item.sectionName,
    item.contentKey,
    item.createdBy,
    item.createdByRole,
    item.summary,
  ].some((value) => value.toLowerCase().includes(search));
}

function matchesDate(item: RestoreVersionItem, filters: RestoreFilters): boolean {
  const createdAt = new Date(item.createdAt).getTime();
  if (filters.from && createdAt < new Date(`${filters.from}T00:00:00`).getTime()) return false;
  if (filters.to && createdAt > new Date(`${filters.to}T23:59:59`).getTime()) return false;
  return true;
}

function normalisePage(value: number | undefined): number {
  return Math.max(1, Number.isFinite(value ?? 1) ? Math.floor(value ?? 1) : 1);
}

function normaliseLimit(value: number | undefined): number {
  const limit = Number.isFinite(value ?? 25) ? Math.floor(value ?? 25) : 25;
  return Math.min(50, Math.max(10, limit));
}

async function buildItem(
  admin: AdminContext,
  version: VersionDoc,
  liveBlocks: Map<string, BlockDoc>,
  latestByKey: Map<string, Date>
): Promise<RestoreVersionItem> {
  const type = itemTypeForKey(version.blockKey);
  const meta = contentMetaByKey.get(version.blockKey);
  const def = CONTENT_DEFAULTS[version.blockKey];
  const current = await currentLiveFields(version.blockKey, liveBlocks);
  const selected = { ...getDefaultFields(version.blockKey), ...(version.snapshot ?? {}) };
  const changedFields = diffFields(current, selected);
  const createdAt = new Date(version.createdAt).toISOString();

  return {
    id: `restore:${String(version._id)}`,
    versionId: String(version._id),
    type,
    contentKey: version.blockKey,
    pageName: meta?.pageName ?? def?.group ?? 'Website',
    sectionName: meta?.sectionName ?? def?.label ?? version.blockKey,
    versionStatus: 'Published',
    createdBy: version.changedBy || 'Unknown',
    createdByRole: await roleForEmail(version.changedBy || ''),
    createdAt,
    lastPublishedAt: latestByKey.get(version.blockKey)?.toISOString(),
    summary: changedFields.length
      ? `${changedFields.length} field${changedFields.length === 1 ? '' : 's'} will change`
      : 'Matches current live version',
    canRestore: canRestoreKey(admin, version.blockKey) && changedFields.length > 0,
    changedFields,
    currentSnapshot: snapshotFields(current),
    selectedSnapshot: snapshotFields(selected),
  };
}

export async function listRestoreVersions(
  admin: AdminContext,
  filters: RestoreFilters = {}
): Promise<RestoreListResult> {
  try {
    await connectDB();
    const page = normalisePage(filters.page);
    const limit = normaliseLimit(filters.limit);
    const visibleKeys = Object.keys(CONTENT_DEFAULTS).filter((key) => canSeeType(admin, itemTypeForKey(key)));

    if (!visibleKeys.length) return { items: [], page, limit, total: 0, totalPages: 1 };

    const query: Record<string, unknown> = {
      blockKey: { $in: visibleKeys },
      status: 'published',
    };
    if (filters.versionId && mongoose.Types.ObjectId.isValid(filters.versionId)) {
      query._id = new mongoose.Types.ObjectId(filters.versionId);
    }

    const versions = await ContentVersion.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.versionId ? 1 : MAX_RESTORE_SCAN)
      .lean<VersionDoc[]>();

    const blocks = await ContentBlock.find({ key: { $in: visibleKeys } })
      .select('key fields status updatedAt')
      .lean<BlockDoc[]>();

    const latestVersions = await ContentVersion.aggregate<{ _id: string; latest: Date }>([
      { $match: { blockKey: { $in: visibleKeys }, status: 'published' } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$blockKey', latest: { $first: '$createdAt' } } },
    ]);

    const liveBlocks = new Map(blocks.map((block) => [block.key, block]));
    const latestByKey = new Map(latestVersions.map((item) => [item._id, new Date(item.latest)]));
    const items = await Promise.all(versions.map((version) => buildItem(admin, version, liveBlocks, latestByKey)));

    const filtered = items
      .filter((item) => typeMatches(item.type, filters.type))
      .filter((item) => matchesText(item, filters))
      .filter((item) => matchesDate(item, filters))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;

    return {
      items: filtered.slice(start, start + limit),
      page,
      limit,
      total,
      totalPages,
    };
  } catch (err) {
    console.error('[listRestoreVersions] Error:', err);
    return { items: [], page: 1, limit: 25, total: 0, totalPages: 1 };
  }
}

export async function restoreContentVersion(
  admin: AdminContext,
  versionId: string
): Promise<RestoreActionResult> {
  if (!mongoose.Types.ObjectId.isValid(versionId)) {
    throw new Error('Selected version was not found.');
  }

  await connectDB();

  const version = await ContentVersion.findOne({ _id: versionId, status: 'published' }).lean<VersionDoc>();
  if (!version) throw new Error('Selected version was not found.');
  if (!CONTENT_DEFAULTS[version.blockKey]) throw new Error('This section cannot be restored.');
  if (!canRestoreKey(admin, version.blockKey)) {
    throw new Error('You can view this version, but you cannot restore it.');
  }

  const selected = { ...getDefaultFields(version.blockKey), ...(version.snapshot ?? {}) };

  await ContentBlock.findOneAndUpdate(
    { key: version.blockKey },
    {
      $set: {
        fields: selected,
        status: 'published',
        updatedBy: admin.email,
        reviewedBy: admin.email,
        reviewNote: `Restored from previous version ${String(version._id)}`,
      },
      $unset: {
        submittedBy: '',
        deletedBy: '',
        deletedAt: '',
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await ContentVersion.create({
    blockKey: version.blockKey,
    snapshot: selected,
    status: 'published',
    changedBy: admin.email,
    note: `restored from version ${String(version._id)}`,
  });

  await ContentAudit.create({
    action: 'restore',
    blockKey: version.blockKey,
    actor: admin.email,
    detail: `Restored from version ${String(version._id)}.`,
  });

  return {
    success: true,
    key: version.blockKey,
    restoredVersionId: String(version._id),
    restoredAt: new Date().toISOString(),
    pagePath: pagePathForKey(version.blockKey),
  };
}
