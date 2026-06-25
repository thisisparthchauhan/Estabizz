import { connectDB } from '@/lib/db';
import { getAdminUserByEmail } from '@/lib/admin/repository';
import { ROLE_LABELS } from '@/lib/admin/types';
import type { AdminContext } from '@/lib/admin/requirePermission';
import type { AdminPermission } from '@/lib/admin/types';
import { CONTENT_DEFAULTS, getDefaultFields } from '@/lib/content/defaults';
import { PAGES } from '@/lib/content/pageCatalog';
import ContentVersion from '@/lib/models/ContentVersion';
import ContentAudit from '@/lib/models/ContentAudit';
import { getAllBlogsForAdmin } from '@/lib/blog/repository';
import type { Blog } from '@/lib/blog/types';
import type { ContentAuditAction, ContentFields, ContentStatus } from '@/lib/content/types';
import type {
  ChangeHistoryFilters,
  ChangeHistoryItem,
  ChangeHistoryResult,
  ChangeHistoryStatus,
  ChangeHistoryType,
  HistoryFieldChange,
  HistorySnapshotField,
} from '@/lib/content/changeHistoryTypes';

type VersionDoc = {
  _id: unknown;
  blockKey: string;
  snapshot?: ContentFields;
  status: ContentStatus;
  changedBy: string;
  note?: string;
  createdAt: Date;
};

type AuditDoc = {
  action: ContentAuditAction;
  blockKey: string;
  actor: string;
  detail?: string;
  createdAt: Date;
};

const MAX_HISTORY_SCAN = 500;
const MAX_BLOG_SCAN = 200;

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

function canSeeType(admin: AdminContext, type: ChangeHistoryType): boolean {
  if (isElevatedAdmin(admin) || admin.role === 'admin_viewer') return true;
  if (admin.role === 'seo_manager') return type === 'seo';
  if (admin.role === 'website_editor') return type === 'content';
  if (admin.role === 'content_writer') return type === 'content' || type === 'blog';
  if (admin.role === 'compliance_reviewer') return type === 'content' || type === 'blog';
  if (type === 'seo') return hasPermission(admin, 'manage_seo');
  if (type === 'blog') return hasPermission(admin, 'manage_blogs') || hasPermission(admin, 'approve_blog');
  return hasPermission(admin, 'manage_content') || hasPermission(admin, 'publish_content');
}

function itemTypeForKey(key: string): ChangeHistoryType {
  return key.startsWith('seo.') ? 'seo' : 'content';
}

function statusLabel(status: ChangeHistoryStatus): string {
  const labels: Record<ChangeHistoryStatus, string> = {
    published: 'Published',
    draft: 'Draft',
    pending_approval: 'Pending approval',
    pending_review: 'Pending approval',
    approved: 'Approved',
    restored: 'Restored',
    rejected: 'Rejected',
    requested_changes: 'Requested changes',
    deleted: 'Deleted',
    archived: 'Archived',
  };
  return labels[status];
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
  if (typeof value === 'string') return value.length > 600 ? `${value.slice(0, 600)}...` : value;
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

function diffFields(before: ContentFields, after: ContentFields): HistoryFieldChange[] {
  const oldFlat = flattenFields(before);
  const newFlat = flattenFields(after);
  const keys = Array.from(new Set([...Object.keys(oldFlat), ...Object.keys(newFlat)])).sort();

  return keys
    .filter((key) => oldFlat[key] !== newFlat[key])
    .map((key) => ({
      field: labelFromPath(key),
      oldValue: oldFlat[key] ?? 'Empty',
      newValue: newFlat[key] ?? 'Empty',
    }));
}

function snapshotFields(fields: ContentFields, limit = 16): HistorySnapshotField[] {
  return Object.entries(fields)
    .slice(0, limit)
    .map(([field, value]) => ({ field: labelFromPath(field), value: valueForDisplay(value) }));
}

function commentFromNote(note = ''): string {
  const index = note.indexOf(':');
  if (index === -1) return '';
  return note.slice(index + 1).trim();
}

function actionForVersion(version: VersionDoc): { action: string; status: ChangeHistoryStatus } {
  const note = (version.note ?? '').toLowerCase();
  if (version.status === 'pending_approval') return { action: 'Submitted', status: 'pending_approval' };
  if (version.status === 'rejected') return { action: 'Rejected', status: 'rejected' };
  if (version.status === 'draft' && note.includes('changes requested')) return { action: 'Requested changes', status: 'requested_changes' };
  if (version.status === 'draft') return { action: 'Saved draft', status: 'draft' };
  if (version.status === 'deleted') return { action: 'Deleted', status: 'deleted' };
  if (note.startsWith('restored')) return { action: 'Restored', status: 'restored' };
  if (note.startsWith('approved')) return { action: 'Approved', status: 'approved' };
  if (note.includes('created')) return { action: 'Created', status: 'published' };
  return { action: 'Published', status: 'published' };
}

function actionForBlog(blog: Blog): { action: string; status: ChangeHistoryStatus } {
  if (blog.status === 'pending_review') return { action: 'Submitted', status: 'pending_review' };
  if (blog.status === 'approved') return { action: 'Approved', status: 'approved' };
  if (blog.status === 'rejected') return { action: 'Rejected', status: 'rejected' };
  if (blog.status === 'published') return { action: 'Published', status: 'published' };
  if (blog.status === 'archived') return { action: 'Archived', status: 'archived' };
  return { action: 'Saved draft', status: 'draft' };
}

async function roleForEmail(email: string): Promise<string> {
  if (!email) return 'Unknown';
  const admin = await getAdminUserByEmail(email);
  return admin ? ROLE_LABELS[admin.role] : 'Unknown';
}

function auditMatches(version: VersionDoc, audit: AuditDoc): boolean {
  const createdAt = new Date(version.createdAt).getTime();
  const auditAt = new Date(audit.createdAt).getTime();
  const closeEnough = Math.abs(createdAt - auditAt) <= 5 * 60 * 1000;
  if (!closeEnough) return false;
  if (version.status === 'pending_approval') return audit.action === 'submit' || audit.action === 'create';
  if (version.status === 'rejected') return audit.action === 'reject';
  if ((version.note ?? '').toLowerCase().includes('changes requested')) return audit.action === 'reject';
  if ((version.note ?? '').toLowerCase().startsWith('approved')) return audit.action === 'approve';
  if ((version.note ?? '').toLowerCase().startsWith('restored')) return audit.action === 'restore';
  return audit.action === 'publish' || audit.action === 'edit' || audit.action === 'create';
}

async function previousFields(version: VersionDoc): Promise<ContentFields> {
  const previous = await ContentVersion.findOne({
    blockKey: version.blockKey,
    createdAt: { $lt: version.createdAt },
  })
    .sort({ createdAt: -1 })
    .lean<{ snapshot?: ContentFields }>();

  return previous?.snapshot ? { ...getDefaultFields(version.blockKey), ...previous.snapshot } : { ...getDefaultFields(version.blockKey) };
}

function matchesStatus(item: ChangeHistoryItem, status?: string): boolean {
  if (!status || status === 'all') return true;
  if (status === 'published') return item.status === 'published';
  if (status === 'draft') return item.status === 'draft';
  if (status === 'pending') return item.status === 'pending_approval' || item.status === 'pending_review';
  if (status === 'approved') return item.status === 'approved';
  if (status === 'restored') return item.status === 'restored';
  if (status === 'rejected') return item.status === 'rejected';
  if (status === 'requested_changes') return item.status === 'requested_changes';
  return true;
}

function matchesType(item: ChangeHistoryItem, type?: string): boolean {
  if (!type || type === 'all') return true;
  if (type === 'website') return item.type === 'content';
  if (type === 'seo') return item.type === 'seo';
  if (type === 'blogs') return item.type === 'blog';
  return true;
}

function matchesText(item: ChangeHistoryItem, filters: ChangeHistoryFilters): boolean {
  const changedBy = (filters.changedBy ?? '').toLowerCase().trim();
  if (changedBy && !item.changedBy.toLowerCase().includes(changedBy)) return false;

  const search = (filters.search ?? '').toLowerCase().trim();
  if (!search) return true;

  return [
    item.pageName,
    item.sectionName,
    item.contentKey,
    item.changedBy,
    item.changedByRole,
    item.action,
    item.summary,
  ].some((value) => value.toLowerCase().includes(search));
}

function matchesDate(item: ChangeHistoryItem, filters: ChangeHistoryFilters): boolean {
  const changedAt = new Date(item.changedAt).getTime();
  if (filters.from && changedAt < new Date(`${filters.from}T00:00:00`).getTime()) return false;
  if (filters.to && changedAt > new Date(`${filters.to}T23:59:59`).getTime()) return false;
  return true;
}

function blogFields(blog: Blog): ContentFields {
  return {
    title: blog.title,
    summary: blog.summary,
    category: blog.category.name,
    author: `${blog.author.firstName} ${blog.author.lastName}`.trim(),
    status: statusLabel(actionForBlog(blog).status),
    focusKeyword: blog.focusKeyword,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
  };
}

async function contentItems(admin: AdminContext): Promise<ChangeHistoryItem[]> {
  await connectDB();

  const visibleKeys = Object.keys(CONTENT_DEFAULTS).filter((key) => canSeeType(admin, itemTypeForKey(key)));
  if (!visibleKeys.length) return [];

  const versions = await ContentVersion.find({ blockKey: { $in: visibleKeys } })
    .sort({ createdAt: -1 })
    .limit(MAX_HISTORY_SCAN)
    .lean<VersionDoc[]>();

  const audits = await ContentAudit.find({ blockKey: { $in: visibleKeys } })
    .sort({ createdAt: -1 })
    .limit(MAX_HISTORY_SCAN)
    .lean<AuditDoc[]>();

  return Promise.all(versions.map(async (version) => {
    const type = itemTypeForKey(version.blockKey);
    const meta = contentMetaByKey.get(version.blockKey);
    const def = CONTENT_DEFAULTS[version.blockKey];
    const previous = await previousFields(version);
    const snapshot = { ...getDefaultFields(version.blockKey), ...(version.snapshot ?? {}) };
    const changedFields = diffFields(previous, snapshot);
    const matchedAudit = audits.find((audit) => audit.blockKey === version.blockKey && auditMatches(version, audit));
    const action = actionForVersion(version);
    const comment = commentFromNote(version.note) || matchedAudit?.detail || '';
    const reviewed = ['Approved', 'Rejected', 'Requested changes', 'Restored'].includes(action.action);

    return {
      id: `content:${String(version._id)}`,
      type,
      contentKey: version.blockKey,
      pageName: meta?.pageName ?? def?.group ?? 'Website',
      sectionName: meta?.sectionName ?? def?.label ?? version.blockKey,
      action: action.action,
      status: action.status,
      changedBy: version.changedBy || matchedAudit?.actor || 'Unknown',
      changedByRole: await roleForEmail(version.changedBy || matchedAudit?.actor || ''),
      changedAt: new Date(version.createdAt).toISOString(),
      publishedAt: version.status === 'published' ? new Date(version.createdAt).toISOString() : undefined,
      reviewedBy: reviewed ? version.changedBy || matchedAudit?.actor : undefined,
      reviewedAt: reviewed ? new Date(version.createdAt).toISOString() : undefined,
      reviewerComment: comment || undefined,
      summary: `${action.action} ${changedFields.length} field${changedFields.length === 1 ? '' : 's'}`,
      changedFields,
      publishedSnapshot: snapshotFields(previous),
      draftSnapshot: snapshotFields(snapshot),
    } satisfies ChangeHistoryItem;
  }));
}

async function blogItems(admin: AdminContext): Promise<ChangeHistoryItem[]> {
  if (!canSeeType(admin, 'blog')) return [];
  const blogs = await getAllBlogsForAdmin({ limit: MAX_BLOG_SCAN });

  return Promise.all(blogs.map(async (blog) => {
    const action = actionForBlog(blog);
    const fields = blogFields(blog);
    const changedBy = blog.reviewedBy || blog.submittedBy?.email || blog.author.email || 'Unknown';
    const reviewed = !!blog.reviewedBy || action.status === 'approved' || action.status === 'rejected';

    return {
      id: `blog:${blog.id}`,
      type: 'blog',
      contentKey: blog.id,
      pageName: 'Blogs',
      sectionName: blog.title || 'Blog Post',
      action: action.action,
      status: action.status,
      changedBy,
      changedByRole: await roleForEmail(changedBy),
      changedAt: blog.updatedAt || blog.createdAt,
      publishedAt: blog.publishedAt,
      reviewedBy: reviewed ? blog.reviewedBy : undefined,
      reviewedAt: reviewed ? blog.updatedAt : undefined,
      reviewerComment: blog.adminNotes,
      summary: `${action.action} blog post`,
      changedFields: diffFields({}, fields),
      publishedSnapshot: [],
      draftSnapshot: snapshotFields(fields),
    } satisfies ChangeHistoryItem;
  }));
}

function normalisePage(value: number | undefined): number {
  return Math.max(1, Number.isFinite(value ?? 1) ? Math.floor(value ?? 1) : 1);
}

function normaliseLimit(value: number | undefined): number {
  const limit = Number.isFinite(value ?? 25) ? Math.floor(value ?? 25) : 25;
  return Math.min(50, Math.max(10, limit));
}

export async function listChangeHistory(
  admin: AdminContext,
  filters: ChangeHistoryFilters = {}
): Promise<ChangeHistoryResult> {
  try {
    const page = normalisePage(filters.page);
    const limit = normaliseLimit(filters.limit);
    const [content, blogs] = await Promise.all([contentItems(admin), blogItems(admin)]);
    const filtered = [...content, ...blogs]
      .filter((item) => matchesType(item, filters.type))
      .filter((item) => matchesStatus(item, filters.status))
      .filter((item) => matchesText(item, filters))
      .filter((item) => matchesDate(item, filters))
      .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());

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
    console.error('[listChangeHistory] Error:', err);
    return { items: [], page: 1, limit: 25, total: 0, totalPages: 1 };
  }
}
