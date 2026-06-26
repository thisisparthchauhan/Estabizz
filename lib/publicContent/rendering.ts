import { connectDB } from '@/lib/db';
import PublicContentPage from '@/lib/models/PublicContentPage';
import { PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN } from '@/lib/publicContent/types';
import type {
  PublicContentBadge,
  PublicContentBreadcrumb,
  PublicContentCtaCard,
  PublicContentExpertProfile,
  PublicContentImage,
  PublicContentMenuGroup,
  PublicContentPageStatus,
  PublicContentPageType,
  PublicContentQuickFact,
  PublicContentRegulator,
  PublicContentRelatedPage,
  PublicContentSection,
  PublicContentSourceReference,
  PublicContentHero,
  PublicContentPageDesign,
} from '@/lib/publicContent/types';

export interface PublicContentPageRenderData {
  title: string;
  slug: string;
  fullPath: string;
  pageType: PublicContentPageType;
  menuGroup: PublicContentMenuGroup;
  category: string;
  regulator: PublicContentRegulator;
  serviceType: string;
  summary: string;
  hero: PublicContentHero | null;
  heroImage: PublicContentImage | null;
  pageDesign: PublicContentPageDesign;
  badges: PublicContentBadge[];
  breadcrumbs: PublicContentBreadcrumb[];
  sections: PublicContentSection[];
  snapshotCards: PublicContentQuickFact[];
  quickFacts: PublicContentQuickFact[];
  ctaCards: PublicContentCtaCard[];
  expertProfile: PublicContentExpertProfile | null;
  relatedPages: PublicContentRelatedPage[];
  sourceReferences: PublicContentSourceReference[];
  reviewedBy: string;
  lastReviewedAt: string | null;
  readingTime: string;
  status: 'published';
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
}

export type PublicContentPageRenderState =
  | { mode: 'fallback' }
  | { mode: 'published'; page: PublicContentPageRenderData }
  | { mode: 'blocked'; status: Exclude<PublicContentPageStatus, 'published'> };

type RawDoc = Record<string, unknown>;

function iso(d: unknown): string | null {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function arrayOf<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function toPublicRenderData(doc: RawDoc): PublicContentPageRenderData {
  return {
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    fullPath: String(doc.fullPath ?? ''),
    pageType: (doc.pageType as PublicContentPageType) ?? 'special',
    menuGroup: (doc.menuGroup as PublicContentMenuGroup) ?? 'other',
    category: String(doc.category ?? ''),
    regulator: (doc.regulator as PublicContentRegulator) ?? 'Other',
    serviceType: String(doc.serviceType ?? ''),
    summary: String(doc.summary ?? ''),
    hero: (doc.hero as PublicContentHero | null) ?? null,
    heroImage: (doc.heroImage as PublicContentImage | null) ?? null,
    pageDesign: (doc.pageDesign as PublicContentPageDesign | null) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN,
    badges: arrayOf<PublicContentBadge>(doc.badges),
    breadcrumbs: arrayOf<PublicContentBreadcrumb>(doc.breadcrumbs),
    sections: arrayOf<PublicContentSection>(doc.sections),
    snapshotCards: arrayOf<PublicContentQuickFact>(doc.snapshotCards),
    quickFacts: arrayOf<PublicContentQuickFact>(doc.quickFacts),
    ctaCards: arrayOf<PublicContentCtaCard>(doc.ctaCards),
    expertProfile: (doc.expertProfile as PublicContentExpertProfile | null) ?? null,
    relatedPages: arrayOf<PublicContentRelatedPage>(doc.relatedPages),
    sourceReferences: arrayOf<PublicContentSourceReference>(doc.sourceReferences),
    reviewedBy: String(doc.reviewedBy ?? ''),
    lastReviewedAt: iso(doc.lastReviewedAt),
    readingTime: String(doc.readingTime ?? ''),
    status: 'published',
    publishedAt: iso(doc.publishedAt),
    seoTitle: String(doc.seoTitle ?? ''),
    seoDescription: String(doc.seoDescription ?? ''),
    canonicalUrl: String(doc.canonicalUrl ?? ''),
    ogImage: String(doc.ogImage ?? ''),
  };
}

export async function getPublicContentPageRenderState(fullPath: string): Promise<PublicContentPageRenderState> {
  await connectDB();
  const doc = await PublicContentPage.findOne({ fullPath })
    .select('-pendingRevision -pendingSubmittedBy -pendingSubmittedAt -pendingReviewComment')
    .lean();

  if (!doc) return { mode: 'fallback' };

  const raw = doc as unknown as RawDoc;
  const status = (raw.status as PublicContentPageStatus) ?? 'draft';
  if (status !== 'published') {
    return { mode: 'blocked', status: status as Exclude<PublicContentPageStatus, 'published'> };
  }

  return { mode: 'published', page: toPublicRenderData(raw) };
}
