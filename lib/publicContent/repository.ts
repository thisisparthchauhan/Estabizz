// Public Content Pages - server-side repository.

import { connectDB } from '@/lib/db';
import PublicContentPage from '@/lib/models/PublicContentPage';
import {
  isManagedPublicContentPath,
  PUBLIC_CONTENT_MANAGED_PATHS,
} from '@/lib/publicContent/managedPaths';
import { PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN } from '@/lib/publicContent/types';
import type {
  PublicContentImage,
  PublicContentImportInput,
  PublicContentPageRecord,
  PublicContentPageStatus,
  PublicContentPageType,
  PublicContentMenuGroup,
  PublicContentRegulator,
  PublicContentBadge,
  PublicContentBreadcrumb,
  PublicContentCtaCard,
  PublicContentQuickFact,
  PublicContentRelatedPage,
  PublicContentSourceReference,
  PublicContentWorkingCopy,
  PublicContentPageDesign,
} from '@/lib/publicContent/types';

type RawDoc = Record<string, unknown>;

function iso(d: unknown): string | null {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function arrayOf<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function toRecord(doc: RawDoc): PublicContentPageRecord {
  return {
    id: String(doc._id),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    fullPath: String(doc.fullPath ?? ''),
    pageType: (doc.pageType as PublicContentPageType) ?? 'special',
    menuGroup: (doc.menuGroup as PublicContentMenuGroup) ?? 'other',
    category: String(doc.category ?? ''),
    regulator: (doc.regulator as PublicContentRegulator) ?? 'Other',
    serviceType: String(doc.serviceType ?? ''),
    summary: String(doc.summary ?? ''),
    hero: (doc.hero as Record<string, unknown> | null) ?? null,
    heroImage: (doc.heroImage as PublicContentImage | null) ?? null,
    pageDesign: (doc.pageDesign as PublicContentPageDesign | null) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN,
    badges: arrayOf<PublicContentBadge>(doc.badges),
    breadcrumbs: arrayOf<PublicContentBreadcrumb>(doc.breadcrumbs),
    sections: Array.isArray(doc.sections) ? (doc.sections as Record<string, unknown>[]) : [],
    snapshotCards: arrayOf<PublicContentQuickFact>(doc.snapshotCards),
    quickFacts: arrayOf<PublicContentQuickFact>(doc.quickFacts),
    ctaCards: arrayOf<PublicContentCtaCard>(doc.ctaCards),
    expertProfile: (doc.expertProfile as Record<string, unknown> | null) ?? null,
    relatedPages: arrayOf<PublicContentRelatedPage>(doc.relatedPages),
    sourceReferences: arrayOf<PublicContentSourceReference>(doc.sourceReferences),
    reviewedBy: String(doc.reviewedBy ?? ''),
    lastReviewedAt: iso(doc.lastReviewedAt),
    readingTime: String(doc.readingTime ?? ''),
    status: (doc.status as PublicContentPageStatus) ?? 'draft',
    publishedAt: iso(doc.publishedAt),
    createdBy: String(doc.createdBy ?? ''),
    updatedBy: String(doc.updatedBy ?? ''),
    publishedBy: String(doc.publishedBy ?? ''),
    seoTitle: String(doc.seoTitle ?? ''),
    seoDescription: String(doc.seoDescription ?? ''),
    canonicalUrl: String(doc.canonicalUrl ?? ''),
    ogImage: String(doc.ogImage ?? ''),
    pendingRevision: (doc.pendingRevision as Record<string, unknown> | null) ?? null,
    hasPendingChanges: !!doc.hasPendingChanges,
    pendingSubmittedBy: String(doc.pendingSubmittedBy ?? ''),
    pendingSubmittedAt: iso(doc.pendingSubmittedAt),
    pendingReviewComment: String(doc.pendingReviewComment ?? ''),
    deletedFromStatus: String(doc.deletedFromStatus ?? ''),
    deletedAt: iso(doc.deletedAt),
    deletedBy: String(doc.deletedBy ?? ''),
    createdAt: iso(doc.createdAt) ?? new Date().toISOString(),
    updatedAt: iso(doc.updatedAt) ?? new Date().toISOString(),
  };
}

export async function findPublicContentPageByFullPath(fullPath: string): Promise<PublicContentPageRecord | null> {
  await connectDB();
  const doc = await PublicContentPage.findOne({ fullPath }).lean();
  return doc ? toRecord(doc as unknown as RawDoc) : null;
}

export async function findPublicContentPageBySlug(slug: string): Promise<PublicContentPageRecord | null> {
  await connectDB();
  const doc = await PublicContentPage.findOne({ slug }).sort({ updatedAt: -1 }).lean();
  return doc ? toRecord(doc as unknown as RawDoc) : null;
}

export async function findManagedPublicContentPagesWithPendingChanges(): Promise<PublicContentPageRecord[]> {
  await connectDB();
  const docs = await PublicContentPage.find({
    fullPath: { $in: [...PUBLIC_CONTENT_MANAGED_PATHS] },
    status: 'published',
    hasPendingChanges: true,
  }).lean();
  return docs.map((doc) => toRecord(doc as unknown as RawDoc));
}

export async function pageExistsForImport(fullPath: string, slug: string): Promise<{
  exists: boolean;
  fullPathMatch: PublicContentPageRecord | null;
  slugMatch: PublicContentPageRecord | null;
}> {
  await connectDB();
  const [fullPathDoc, slugDoc] = await Promise.all([
    PublicContentPage.findOne({ fullPath }).lean(),
    PublicContentPage.findOne({ slug }).sort({ updatedAt: -1 }).lean(),
  ]);

  return {
    exists: !!fullPathDoc || !!slugDoc,
    fullPathMatch: fullPathDoc ? toRecord(fullPathDoc as unknown as RawDoc) : null,
    slugMatch: slugDoc ? toRecord(slugDoc as unknown as RawDoc) : null,
  };
}

export async function savePendingChanges(
  fullPath: string,
  submittedBy: string,
  changes: PublicContentWorkingCopy
): Promise<void> {
  await connectDB();
  const result = await PublicContentPage.updateOne(
    { fullPath, status: 'published' },
    {
      $set: {
        pendingRevision: changes,
        hasPendingChanges: true,
        pendingSubmittedBy: submittedBy,
        pendingSubmittedAt: new Date(),
        updatedAt: new Date(),
      },
    }
  );
  if (result.matchedCount === 0) {
    throw new Error('Content page not found or not in published state.');
  }
}

export async function clearPendingChanges(fullPath: string): Promise<void> {
  await connectDB();
  await PublicContentPage.updateOne(
    { fullPath },
    {
      $set: {
        pendingRevision: null,
        hasPendingChanges: false,
        pendingSubmittedBy: '',
        pendingReviewComment: '',
        updatedAt: new Date(),
      },
      $unset: { pendingSubmittedAt: '' },
    }
  );
}

export async function movePublicContentPageToRecycleBin(
  fullPath: string,
  deletedBy: string
): Promise<{ name: string }> {
  if (!isManagedPublicContentPath(fullPath)) throw new Error('This page is not available for Recycle Bin yet.');
  await connectDB();
  const doc = await PublicContentPage.findOne({ fullPath }).lean() as unknown as RawDoc | null;
  if (!doc) throw new Error('Content page not found.');
  if (doc.status === 'deleted') throw new Error('This page is already in the Recycle Bin.');

  await PublicContentPage.updateOne(
    { fullPath, status: { $ne: 'deleted' } },
    {
      $set: {
        status: 'deleted',
        deletedFromStatus: String(doc.status ?? 'published'),
        deletedAt: new Date(),
        deletedBy,
        pendingRevision: null,
        hasPendingChanges: false,
        pendingSubmittedBy: '',
        pendingReviewComment: '',
        updatedAt: new Date(),
      },
      $unset: { pendingSubmittedAt: '' },
    }
  );

  return { name: String(doc.title ?? '') };
}

export async function moveSamplePublicContentPageToRecycleBin(
  deletedBy: string
): Promise<{ name: string }> {
  return movePublicContentPageToRecycleBin('/rbi/nbfc-registration-in-india', deletedBy);
}

export async function restorePublicContentPageFromRecycleBin(
  id: string,
  restoredBy: string
): Promise<{ name: string; restoredStatus: string }> {
  await connectDB();
  const doc = await PublicContentPage.findOne({
    _id: id,
    status: 'deleted',
    fullPath: { $in: [...PUBLIC_CONTENT_MANAGED_PATHS] },
  }).lean() as unknown as RawDoc | null;
  if (!doc) throw new Error('Content page not found in Recycle Bin or has already been restored.');

  const fromStatus = String(doc.deletedFromStatus ?? '');
  const safeStatus = ['published', 'draft', 'pending_approval'].includes(fromStatus)
    ? fromStatus
    : 'published';

  const result = await PublicContentPage.updateOne(
    { _id: id, status: 'deleted' },
    {
      $set: { status: safeStatus, updatedBy: restoredBy, updatedAt: new Date() },
      $unset: { deletedAt: '', deletedBy: '', deletedFromStatus: '' },
    }
  );
  if (result.matchedCount === 0) throw new Error('Restore failed. The page may have already been restored.');

  return { name: String(doc.title ?? ''), restoredStatus: safeStatus };
}

export async function restoreSamplePublicContentPageFromRecycleBin(
  id: string,
  restoredBy: string
): Promise<{ name: string; restoredStatus: string }> {
  return restorePublicContentPageFromRecycleBin(id, restoredBy);
}

export async function approvePendingPublicContentPageChanges(
  fullPath: string,
  reviewedBy: string,
  comment: string
): Promise<void> {
  await connectDB();
  const doc = await PublicContentPage.findOne({ fullPath, hasPendingChanges: true }).lean() as unknown as RawDoc | null;
  if (!doc) throw new Error('No pending changes found for this page.');

  const revision = (doc.pendingRevision as Record<string, unknown> | null) ?? {};
  const update: Record<string, unknown> = {
    pendingRevision: null,
    hasPendingChanges: false,
    pendingSubmittedBy: '',
    pendingReviewComment: comment,
    updatedAt: new Date(),
  };

  if (typeof revision.title === 'string') update.title = revision.title;
  if (typeof revision.summary === 'string') update.summary = revision.summary;
  if ('hero' in revision) update.hero = revision.hero ?? null;
  if ('heroImage' in revision) update.heroImage = revision.heroImage ?? null;
  if ('pageDesign' in revision) update.pageDesign = revision.pageDesign ?? null;
  if (Array.isArray(revision.sections)) update.sections = revision.sections;
  if (Array.isArray(revision.quickFacts)) update.quickFacts = revision.quickFacts;
  if (Array.isArray(revision.ctaCards)) update.ctaCards = revision.ctaCards;
  if (typeof revision.seoTitle === 'string') update.seoTitle = revision.seoTitle;
  if (typeof revision.seoDescription === 'string') update.seoDescription = revision.seoDescription;
  if (typeof revision.canonicalUrl === 'string') update.canonicalUrl = revision.canonicalUrl;

  const result = await PublicContentPage.updateOne(
    { fullPath, hasPendingChanges: true },
    { $set: update, $unset: { pendingSubmittedAt: '' } }
  );
  if (result.matchedCount === 0) throw new Error('Pending changes were already processed.');
}

export async function rejectPendingPublicContentPageChanges(
  fullPath: string,
  comment: string
): Promise<void> {
  await connectDB();
  const result = await PublicContentPage.updateOne(
    { fullPath, hasPendingChanges: true },
    {
      $set: {
        pendingRevision: null,
        hasPendingChanges: false,
        pendingSubmittedBy: '',
        pendingReviewComment: comment,
        updatedAt: new Date(),
      },
      $unset: { pendingSubmittedAt: '' },
    }
  );
  if (result.matchedCount === 0) throw new Error('No pending changes found for this page.');
}

export async function createImportedPublicContentPage(input: PublicContentImportInput): Promise<PublicContentPageRecord> {
  await connectDB();
  const now = new Date();
  const existing = await pageExistsForImport(input.fullPath, input.slug);
  if (existing.exists) {
    throw new Error('A public content page already exists for this path or slug.');
  }

  const doc = await PublicContentPage.create({
    title: input.title,
    slug: input.slug,
    fullPath: input.fullPath,
    pageType: input.pageType,
    menuGroup: input.menuGroup,
    category: input.category ?? '',
    regulator: input.regulator ?? 'Other',
    serviceType: input.serviceType ?? '',
    summary: input.summary ?? '',
    hero: null,
    badges: [],
    breadcrumbs: [],
    sections: [],
    snapshotCards: [],
    quickFacts: [],
    ctaCards: [],
    expertProfile: null,
    relatedPages: [],
    sourceReferences: [],
    reviewedBy: '',
    readingTime: '',
    status: 'published',
    publishedAt: now,
    createdBy: input.createdBy ?? 'system:import',
    updatedBy: input.createdBy ?? 'system:import',
    publishedBy: input.createdBy ?? 'system:import',
    seoTitle: input.seoTitle ?? '',
    seoDescription: input.seoDescription ?? '',
    canonicalUrl: input.canonicalUrl ?? input.fullPath,
    ogImage: '',
    pendingRevision: null,
    hasPendingChanges: false,
    pendingSubmittedBy: '',
    pendingReviewComment: '',
    deletedFromStatus: '',
    deletedBy: '',
  });

  return toRecord(doc.toObject() as unknown as RawDoc);
}
