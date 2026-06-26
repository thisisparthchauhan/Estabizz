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
import RegulatoryUpdate from '@/lib/models/RegulatoryUpdate';
import {
  approvePendingChanges,
  getUpdateForAdmin,
  publishUpdate,
  rejectPendingChanges,
  rejectUpdate,
} from '@/lib/regulatory/repository';
import type { RegulatoryPendingRevision, RegulatoryUpdateRecord } from '@/lib/regulatory/types';
import {
  findPublicContentPageByFullPath,
  approvePendingPublicContentPageChanges,
  rejectPendingPublicContentPageChanges,
} from '@/lib/publicContent/repository';

const PUBLIC_CONTENT_SAMPLE_PATH = '/rbi/nbfc-registration-in-india';

export type QueueItemType = 'content' | 'blog' | 'regulatory_update' | 'public_content_page';
export type QueueItemStatus = 'pending_approval' | 'rejected' | 'pending_review' | 'published';
export type QueueAction = 'approve' | 'reject' | 'request_changes';
export type RegulatoryQueueKind = 'pending_publication' | 'pending_changes';

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
  regulator?: string;
  category?: string;
  impactLevel?: string;
  summary?: string;
  sourceUrl?: string;
  regulatoryKind?: RegulatoryQueueKind;
  hasPendingChanges?: boolean;
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

const REGULATORY_FIELD_LABELS: Record<string, string> = {
  title: 'Title',
  regulator: 'Regulator',
  category: 'Category',
  summary: 'Summary',
  detailedContent: 'Detailed Content',
  sourceTitle: 'Source Title',
  sourceUrl: 'Source Link',
  sourceDate: 'Source Date',
  publishedDate: 'Published Date',
  effectiveDate: 'Effective Date',
  impactLevel: 'Impact Level',
  applicableTo: 'Applicable To',
  tags: 'Tags',
  seoTitle: 'SEO Title',
  seoDescription: 'SEO Description',
  canonicalUrl: 'Canonical Link',
  featuredImageUrl: 'Featured Image',
};

function dateForQueue(value: string | null | undefined): string {
  return value ?? '';
}

function regulatoryFields(record: RegulatoryUpdateRecord): ContentFields {
  return {
    title: record.title,
    regulator: record.regulator,
    category: record.category,
    summary: record.summary,
    detailedContent: record.detailedContent,
    sourceTitle: record.sourceTitle,
    sourceUrl: record.sourceUrl,
    sourceDate: dateForQueue(record.sourceDate),
    publishedDate: dateForQueue(record.publishedDate),
    effectiveDate: dateForQueue(record.effectiveDate),
    impactLevel: record.impactLevel,
    applicableTo: record.applicableTo,
    tags: record.tags,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    canonicalUrl: record.canonicalUrl,
    featuredImageUrl: record.featuredImageUrl,
  };
}

function pendingRevisionFields(pending: RegulatoryPendingRevision | null): ContentFields {
  if (!pending) return {};
  return Object.fromEntries(
    Object.entries(pending).map(([key, value]) => [key, value ?? ''])
  ) as ContentFields;
}

function regulatoryDiff(current: ContentFields, proposed: ContentFields): ChangedField[] {
  return diffFields(current, proposed).map((change) => ({
    ...change,
    field: REGULATORY_FIELD_LABELS[change.field.charAt(0).toLowerCase() + change.field.slice(1).replace(/\s/g, '')] ?? change.field,
  }));
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

async function regulatoryItems(): Promise<ApprovalQueueItem[]> {
  await connectDB();
  const docs = await RegulatoryUpdate.find({
    $or: [
      { status: 'pending_approval' },
      { status: 'published', hasPendingChanges: true },
    ],
  }).sort({ updatedAt: -1 }).limit(500).lean();

  return Promise.all((docs as unknown as Record<string, unknown>[]).map(async (doc) => {
    const record = {
      id:               String(doc._id),
      title:            String(doc.title ?? ''),
      slug:             String(doc.slug ?? ''),
      regulator:        String(doc.regulator ?? ''),
      category:         String(doc.category ?? ''),
      summary:          String(doc.summary ?? ''),
      detailedContent:  String(doc.detailedContent ?? ''),
      sourceTitle:      String(doc.sourceTitle ?? ''),
      sourceUrl:        String(doc.sourceUrl ?? ''),
      sourceDate:       isoForQueue(doc.sourceDate),
      publishedDate:    isoForQueue(doc.publishedDate),
      effectiveDate:    isoForQueue(doc.effectiveDate),
      impactLevel:      String(doc.impactLevel ?? ''),
      applicableTo:     Array.isArray(doc.applicableTo) ? (doc.applicableTo as unknown[]).map(String) : [],
      tags:             Array.isArray(doc.tags) ? (doc.tags as unknown[]).map(String) : [],
      status:           String(doc.status ?? 'draft') as ApprovalQueueItem['status'],
      seoTitle:         String(doc.seoTitle ?? ''),
      seoDescription:   String(doc.seoDescription ?? ''),
      canonicalUrl:     String(doc.canonicalUrl ?? ''),
      featuredImageUrl: String(doc.featuredImageUrl ?? ''),
      createdBy:        String(doc.createdBy ?? ''),
      createdByRole:    String(doc.createdByRole ?? ''),
      updatedBy:        String(doc.updatedBy ?? ''),
      reviewComment:    String(doc.reviewComment ?? ''),
      createdAt:        isoForQueue(doc.createdAt) || new Date().toISOString(),
      updatedAt:        isoForQueue(doc.updatedAt) || new Date().toISOString(),
      hasPendingChanges: !!doc.hasPendingChanges,
      pendingRevision: doc.pendingRevision as RegulatoryPendingRevision | null,
      pendingSubmittedBy: String(doc.pendingSubmittedBy ?? ''),
      pendingSubmittedAt: isoForQueue(doc.pendingSubmittedAt),
      pendingReviewComment: String(doc.pendingReviewComment ?? ''),
    };
    const isPendingChanges = record.hasPendingChanges && record.status === 'published';
    const currentFields = regulatoryFields(record as RegulatoryUpdateRecord);
    const proposedFields = isPendingChanges
      ? { ...currentFields, ...pendingRevisionFields(record.pendingRevision) }
      : currentFields;
    const submittedBy = isPendingChanges
      ? record.pendingSubmittedBy || record.updatedBy || record.createdBy
      : record.updatedBy || record.createdBy;

    return {
      id: `regulatory_update:${record.id}`,
      type: 'regulatory_update',
      key: record.id,
      title: record.title,
      pageName: 'Regulatory Update',
      sectionName: record.title,
      submittedBy,
      submittedByRole: await submitterRole(submittedBy),
      submittedAt: (isPendingChanges ? record.pendingSubmittedAt : record.updatedAt) || record.updatedAt,
      updatedAt: record.updatedAt,
      status: record.status,
      currentFields: isPendingChanges ? currentFields : {},
      proposedFields,
      changedFields: regulatoryDiff(isPendingChanges ? currentFields : {}, proposedFields),
      previewPath: isPendingChanges ? `/resources/regulatory-updates/${record.slug}` : `/admin/regulatory-updates`,
      reviewerComment: isPendingChanges ? record.pendingReviewComment : record.reviewComment,
      regulator: record.regulator,
      category: record.category,
      impactLevel: record.impactLevel,
      summary: record.summary,
      sourceUrl: record.sourceUrl,
      regulatoryKind: isPendingChanges ? 'pending_changes' : 'pending_publication',
      hasPendingChanges: record.hasPendingChanges,
    } satisfies ApprovalQueueItem;
  }));
}

function publicContentPageFields(
  page: Awaited<ReturnType<typeof findPublicContentPageByFullPath>> & object
): ContentFields {
  return {
    title: page.title,
    summary: page.summary,
    hero: page.hero ?? null,
    sections: page.sections,
    quickFacts: page.quickFacts,
    ctaCards: page.ctaCards,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    canonicalUrl: page.canonicalUrl,
  } as ContentFields;
}

function publicContentPageRevisionFields(
  revision: Record<string, unknown>,
  fallback: Awaited<ReturnType<typeof findPublicContentPageByFullPath>> & object
): ContentFields {
  return {
    title: typeof revision.title === 'string' ? revision.title : fallback.title,
    summary: typeof revision.summary === 'string' ? revision.summary : fallback.summary,
    hero: (revision.hero as unknown) ?? fallback.hero ?? null,
    sections: Array.isArray(revision.sections) ? revision.sections : fallback.sections,
    quickFacts: Array.isArray(revision.quickFacts) ? revision.quickFacts : fallback.quickFacts,
    ctaCards: Array.isArray(revision.ctaCards) ? revision.ctaCards : fallback.ctaCards,
    seoTitle: typeof revision.seoTitle === 'string' ? revision.seoTitle : fallback.seoTitle,
    seoDescription: typeof revision.seoDescription === 'string' ? revision.seoDescription : fallback.seoDescription,
    canonicalUrl: typeof revision.canonicalUrl === 'string' ? revision.canonicalUrl : fallback.canonicalUrl,
  } as ContentFields;
}

async function publicContentPageItems(): Promise<ApprovalQueueItem[]> {
  const page = await findPublicContentPageByFullPath(PUBLIC_CONTENT_SAMPLE_PATH);
  if (!page || !page.hasPendingChanges) return [];

  const currentFields = publicContentPageFields(page);
  const revision = page.pendingRevision ?? {};
  const proposedFields = publicContentPageRevisionFields(revision, page);
  const submittedBy = page.pendingSubmittedBy || '';

  return [{
    id: `public_content_page:${page.fullPath}`,
    type: 'public_content_page',
    key: page.fullPath,
    title: page.title,
    pageName: 'Content Pages',
    sectionName: page.title,
    submittedBy,
    submittedByRole: await submitterRole(submittedBy),
    submittedAt: page.pendingSubmittedAt ?? page.updatedAt,
    updatedAt: page.updatedAt,
    status: 'pending_approval',
    currentFields,
    proposedFields,
    changedFields: diffFields(currentFields, proposedFields),
    previewPath: page.fullPath,
    reviewerComment: page.pendingReviewComment,
    hasPendingChanges: true,
  }];
}

function isoForQueue(value: unknown): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function listApprovalQueueItems(): Promise<ApprovalQueueItem[]> {
  try {
    const [content, blogs, regulatory, publicContent] = await Promise.all([
      contentItems(),
      blogItems(),
      regulatoryItems(),
      publicContentPageItems(),
    ]);
    return [...content, ...blogs, ...regulatory, ...publicContent].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  } catch (err) {
    console.error('[listApprovalQueueItems] Error:', err);
    return [];
  }
}

export async function countPendingApprovalItems(): Promise<number> {
  const items = await listApprovalQueueItems();
  return items.filter((item) => item.status === 'pending_approval' || item.status === 'pending_review' || item.hasPendingChanges).length;
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

  if (item.type === 'regulatory_update') {
    return hasPermission(admin, 'publish_content');
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

export async function reviewRegulatoryChange(id: string, reviewer: AdminContext, action: QueueAction, comment = ''): Promise<void> {
  const record = await getUpdateForAdmin(id);
  if (!record) throw new Error('Regulatory update was not found.');

  const submitter = (record.hasPendingChanges
    ? record.pendingSubmittedBy
    : record.updatedBy || record.createdBy || '').toLowerCase();
  if (submitter && submitter === reviewer.email.toLowerCase()) {
    throw new Error('You cannot review your own change.');
  }

  if (record.hasPendingChanges && record.status === 'published') {
    if (action === 'approve') {
      await approvePendingChanges(id, reviewer.email, reviewer.role);
      return;
    }
    await rejectPendingChanges(id, reviewer.email, reviewer.role, comment);
    return;
  }

  if (record.status === 'pending_approval') {
    if (action === 'approve') {
      await publishUpdate(id, reviewer.email, reviewer.role);
      return;
    }
    await rejectUpdate(id, reviewer.email, reviewer.role, comment);
    return;
  }

  throw new Error('This regulatory update is not waiting for review.');
}

export async function reviewPublicContentPageChange(
  fullPath: string,
  reviewer: AdminContext,
  action: QueueAction,
  comment = ''
): Promise<void> {
  const page = await findPublicContentPageByFullPath(fullPath);
  if (!page) throw new Error('Content page was not found.');
  if (!page.hasPendingChanges) throw new Error('This page has no pending changes to review.');

  if (page.pendingSubmittedBy && page.pendingSubmittedBy.toLowerCase() === reviewer.email.toLowerCase()) {
    throw new Error('You cannot review your own change.');
  }

  if (action === 'approve') {
    await approvePendingPublicContentPageChanges(fullPath, reviewer.email, comment);
    return;
  }

  await rejectPendingPublicContentPageChanges(fullPath, comment);
}
