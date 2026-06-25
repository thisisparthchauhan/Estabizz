import { connectDB } from '@/lib/db';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentVersion from '@/lib/models/ContentVersion';
import ContentAudit from '@/lib/models/ContentAudit';
import { CONTENT_DEFAULTS, getDefaultFields } from '@/lib/content/defaults';
import { PAGES } from '@/lib/content/pageCatalog';
import type { ContentFields, ContentStatus } from '@/lib/content/types';
import type { AdminContext } from '@/lib/admin/requirePermission';
import type { AdminPermission } from '@/lib/admin/types';
import { getAdminUserByEmail } from '@/lib/admin/repository';
import { ROLE_LABELS } from '@/lib/admin/types';
import { getPendingSubmissions, getBlogByIdForAdmin, adminUpdateBlogStatus } from '@/lib/blog/repository';
import type { Blog } from '@/lib/blog/types';

export type QueueItemType = 'content' | 'blog';
export type QueueItemStatus = 'pending_approval' | 'rejected' | 'pending_review';
export type QueueAction = 'approve' | 'reject' | 'request_changes';

export interface ChangedField {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface ApprovalQueueItem {
  id: string;
  type: QueueItemType;
  key: string;
  title: string;
  pageName: string;
  sectionName: string;
  submittedBy: string;
  submittedByRole: string;
  submittedAt: string;
  updatedAt: string;
  status: QueueItemStatus;
  currentFields: ContentFields;
  proposedFields: ContentFields;
  changedFields: ChangedField[];
  previewPath: string;
  reviewerComment?: string;
}

const contentMetaByKey = new Map(
  PAGES.flatMap((page) => page.sections.map((section) => [
    section.key,
    { pageName: page.name, sectionName: section.name, path: page.path },
  ] as const))
);

function labelFromPath(path: string): string {
  return path
    .replace(/\.(\d+)\./g, ' $1 ')
    .replace(/\.(\d+)$/g, ' $1')
    .replace(/\./g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bOg\b/g, 'Social')
    .replace(/\bSeo\b/g, 'SEO');
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function valueForDisplay(value: unknown): string {
  if (value === undefined || value === null || value === '') return 'Empty';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return `${value.length} item${value.length === 1 ? '' : 's'}`;
  return 'Multiple fields';
}

function flattenFields(value: unknown, prefix = ''): Record<string, string> {
  if (Array.isArray(value)) {
    if (!value.length) return { [prefix]: valueForDisplay(value) };
    return value.reduce<Record<string, string>>((out, item, index) => {
      if (isPlainRecord(item) || Array.isArray(item)) {
        return { ...out, ...flattenFields(item, `${prefix}.${index + 1}`) };
      }
      out[`${prefix}.${index + 1}`] = valueForDisplay(item);
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

function diffFields(current: ContentFields, proposed: ContentFields): ChangedField[] {
  const oldFlat = flattenFields(current);
  const newFlat = flattenFields(proposed);
  const keys = Array.from(new Set([...Object.keys(oldFlat), ...Object.keys(newFlat)])).sort();

  return keys
    .filter((key) => oldFlat[key] !== newFlat[key])
    .map((key) => ({
      field: labelFromPath(key),
      oldValue: oldFlat[key] ?? 'Empty',
      newValue: newFlat[key] ?? 'Empty',
    }));
}

async function submitterRole(email: string): Promise<string> {
  if (!email) return 'Unknown';
  const admin = await getAdminUserByEmail(email);
  return admin ? ROLE_LABELS[admin.role] : 'Unknown';
}

async function latestPublishedFields(key: string): Promise<ContentFields> {
  const defaults = getDefaultFields(key);
  const version = await ContentVersion.findOne({ blockKey: key, status: 'published' })
    .sort({ createdAt: -1 })
    .lean<{ snapshot?: ContentFields }>();

  return version?.snapshot ? { ...defaults, ...version.snapshot } : { ...defaults };
}

function contentStatusLabel(status?: ContentStatus): QueueItemStatus {
  return status === 'rejected' ? 'rejected' : 'pending_approval';
}

async function contentItems(): Promise<ApprovalQueueItem[]> {
  await connectDB();
  const blocks = await ContentBlock.find({ status: { $in: ['pending_approval', 'rejected'] } })
    .sort({ updatedAt: -1 })
    .lean<{
      key: string;
      fields?: ContentFields;
      status?: ContentStatus;
      updatedBy?: string;
      submittedBy?: string;
      reviewedBy?: string;
      reviewNote?: string;
      createdAt?: Date;
      updatedAt?: Date;
    }[]>();

  return Promise.all(blocks.map(async (block) => {
    const def = CONTENT_DEFAULTS[block.key];
    const meta = contentMetaByKey.get(block.key);
    const currentFields = await latestPublishedFields(block.key);
    const proposedFields = { ...(def?.fields ?? {}), ...(block.fields ?? {}) };
    const submittedBy = block.submittedBy || block.updatedBy || '';

    return {
      id: `content:${block.key}`,
      type: 'content',
      key: block.key,
      title: def?.label ?? block.key,
      pageName: meta?.pageName ?? def?.group ?? 'Website',
      sectionName: meta?.sectionName ?? def?.label ?? block.key,
      submittedBy,
      submittedByRole: await submitterRole(submittedBy),
      submittedAt: block.updatedAt ? new Date(block.updatedAt).toISOString() : new Date().toISOString(),
      updatedAt: block.updatedAt ? new Date(block.updatedAt).toISOString() : '',
      status: contentStatusLabel(block.status),
      currentFields,
      proposedFields,
      changedFields: diffFields(currentFields, proposedFields),
      previewPath: meta?.path ?? '/',
      reviewerComment: block.reviewNote,
    } satisfies ApprovalQueueItem;
  }));
}

function blogFields(blog: Blog): ContentFields {
  return {
    title: blog.title,
    summary: blog.summary,
    category: blog.category.name,
    author: `${blog.author.firstName} ${blog.author.lastName}`.trim(),
    focusKeyword: blog.focusKeyword,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
  };
}

async function blogItems(): Promise<ApprovalQueueItem[]> {
  const blogs = await getPendingSubmissions();
  return blogs.map((blog) => ({
    id: `blog:${blog.id}`,
    type: 'blog',
    key: blog.id,
    title: blog.title,
    pageName: 'Blogs',
    sectionName: 'Blog Submission',
    submittedBy: blog.submittedBy?.email || blog.author.email,
    submittedByRole: blog.author.role === 'admin' ? 'Administrator' : 'Contributor',
    submittedAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    status: 'pending_review',
    currentFields: {},
    proposedFields: blogFields(blog),
    changedFields: diffFields({}, blogFields(blog)),
    previewPath: `/admin/blogs/edit/${blog.id}`,
    reviewerComment: blog.adminNotes,
  }));
}

export async function listApprovalQueueItems(): Promise<ApprovalQueueItem[]> {
  try {
    const [content, blogs] = await Promise.all([contentItems(), blogItems()]);
    return [...content, ...blogs].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  } catch (err) {
    console.error('[listApprovalQueueItems] Error:', err);
    return [];
  }
}

export async function countPendingApprovalItems(): Promise<number> {
  const items = await listApprovalQueueItems();
  return items.filter((item) => item.status === 'pending_approval' || item.status === 'pending_review').length;
}

function hasPermission(admin: AdminContext, permission: AdminPermission): boolean {
  return admin.permissions.includes(permission);
}

function isElevatedAdmin(admin: AdminContext): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

export function canReviewQueueItem(admin: AdminContext, item: Pick<ApprovalQueueItem, 'type' | 'key' | 'submittedBy'>): boolean {
  if (item.submittedBy && item.submittedBy.toLowerCase() === admin.email.toLowerCase()) return false;
  if (isElevatedAdmin(admin)) return true;

  if (item.type === 'blog') {
    return hasPermission(admin, 'approve_blog') || hasPermission(admin, 'reject_blog') || hasPermission(admin, 'publish_blog');
  }

  if (item.key.startsWith('seo.')) {
    return hasPermission(admin, 'manage_seo') || hasPermission(admin, 'publish_content');
  }

  return hasPermission(admin, 'publish_content');
}

export async function approveContentChange(key: string, reviewer: AdminContext, comment = ''): Promise<void> {
  await connectDB();
  const block = await ContentBlock.findOne({ key, status: 'pending_approval' });
  if (!block) throw new Error('Pending change was not found.');
  if (block.submittedBy && block.submittedBy.toLowerCase() === reviewer.email.toLowerCase()) {
    throw new Error('You cannot approve your own change.');
  }

  block.status = 'published';
  block.reviewedBy = reviewer.email;
  block.reviewNote = comment.trim();
  block.updatedBy = reviewer.email;
  await block.save();

  await ContentVersion.create({
    blockKey: key,
    snapshot: block.fields,
    status: 'published',
    changedBy: reviewer.email,
    note: comment.trim() ? `approved: ${comment.trim()}` : 'approved',
  });

  await ContentAudit.create({
    action: 'approve',
    blockKey: key,
    actor: reviewer.email,
    detail: comment.trim() || 'Approved and published.',
  });
}

export async function rejectContentChange(key: string, reviewer: AdminContext, comment: string, requestChanges = false): Promise<void> {
  await connectDB();
  const block = await ContentBlock.findOne({ key, status: 'pending_approval' });
  if (!block) throw new Error('Pending change was not found.');
  if (block.submittedBy && block.submittedBy.toLowerCase() === reviewer.email.toLowerCase()) {
    throw new Error('You cannot review your own change.');
  }

  block.status = requestChanges ? 'draft' : 'rejected';
  block.reviewedBy = reviewer.email;
  block.reviewNote = comment.trim();
  await block.save();

  await ContentVersion.create({
    blockKey: key,
    snapshot: block.fields,
    status: block.status,
    changedBy: reviewer.email,
    note: requestChanges ? `changes requested: ${comment.trim()}` : `rejected: ${comment.trim()}`,
  });

  await ContentAudit.create({
    action: 'reject',
    blockKey: key,
    actor: reviewer.email,
    detail: requestChanges ? `Changes requested: ${comment.trim()}` : comment.trim(),
  });
}

export async function reviewBlogChange(id: string, reviewer: AdminContext, action: QueueAction, comment = ''): Promise<void> {
  const blog = await getBlogByIdForAdmin(id);
  if (!blog) throw new Error('Blog was not found.');
  const submitter = (blog.submittedBy?.email || blog.author.email || '').toLowerCase();
  if (submitter && submitter === reviewer.email.toLowerCase()) {
    throw new Error('You cannot review your own change.');
  }

  if (action === 'approve') {
    await adminUpdateBlogStatus(id, { status: 'approved', reviewedBy: reviewer.email, adminNotes: comment.trim() || blog.adminNotes });
    return;
  }

  await adminUpdateBlogStatus(id, {
    status: 'rejected',
    reviewedBy: reviewer.email,
    adminNotes: action === 'request_changes' ? `Changes requested: ${comment.trim()}` : comment.trim(),
  });
}
