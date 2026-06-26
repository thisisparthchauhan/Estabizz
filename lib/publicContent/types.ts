// Public Content Pages CMS - shared, CLIENT-SAFE types & option lists.
//
// These types describe existing public service/regulatory/resource pages that
// will later become editable from the admin panel. No server-only imports here.

export type PublicContentPageStatus =
  | 'draft'
  | 'pending_approval'
  | 'published'
  | 'rejected'
  | 'archived'
  | 'deleted';

export type PublicContentPageType =
  | 'guide'
  | 'service_landing'
  | 'category_landing'
  | 'resource'
  | 'legal'
  | 'landing_19_5'
  | 'special';

export type PublicContentMenuGroup =
  | 'services'
  | 'regulatory'
  | 'solutions'
  | 'resources'
  | 'insights'
  | '19_5'
  | 'legal'
  | 'other';

export type PublicContentRegulator =
  | 'RBI'
  | 'SEBI'
  | 'IRDAI'
  | 'IFSCA'
  | 'FEMA'
  | 'Other';

export const PUBLIC_CONTENT_STATUS_OPTIONS: PublicContentPageStatus[] = [
  'published',
  'draft',
  'pending_approval',
  'rejected',
  'archived',
  'deleted',
];

export const PUBLIC_CONTENT_STATUS_LABELS: Record<PublicContentPageStatus, string> = {
  draft: 'Draft',
  pending_approval: 'Pending Review',
  published: 'Published',
  rejected: 'Rejected',
  archived: 'Archived',
  deleted: 'Deleted',
};

export const PUBLIC_CONTENT_PAGE_TYPE_OPTIONS: PublicContentPageType[] = [
  'guide',
  'service_landing',
  'category_landing',
  'resource',
  'legal',
  'landing_19_5',
  'special',
];

export const PUBLIC_CONTENT_PAGE_TYPE_LABELS: Record<PublicContentPageType, string> = {
  guide: 'Guide',
  service_landing: 'Service Landing',
  category_landing: 'Category Landing',
  resource: 'Resource',
  legal: 'Legal',
  landing_19_5: '19/5 Landing',
  special: 'Special',
};

export const PUBLIC_CONTENT_MENU_GROUP_OPTIONS: PublicContentMenuGroup[] = [
  'services',
  'regulatory',
  'solutions',
  'resources',
  'insights',
  '19_5',
  'legal',
  'other',
];

export const PUBLIC_CONTENT_MENU_GROUP_LABELS: Record<PublicContentMenuGroup, string> = {
  services: 'Services',
  regulatory: 'Regulatory',
  solutions: 'Solutions',
  resources: 'Resources',
  insights: 'Insights',
  '19_5': '19/5',
  legal: 'Legal',
  other: 'Other',
};

export const PUBLIC_CONTENT_REGULATOR_OPTIONS: PublicContentRegulator[] = [
  'RBI',
  'SEBI',
  'IRDAI',
  'IFSCA',
  'FEMA',
  'Other',
];

export interface PublicContentBadge {
  label: string;
  emoji?: string;
}

export interface PublicContentBreadcrumb {
  label: string;
  href?: string;
}

export interface PublicContentHero {
  title?: string;
  eyebrow?: string;
  description?: string;
  trustLine?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface PublicContentSection {
  id?: string;
  title?: string;
  body?: string;
  blocks?: unknown[];
}

export interface PublicContentQuickFact {
  label: string;
  value: string;
}

export interface PublicContentCtaCard {
  title: string;
  description?: string;
  href?: string;
  label?: string;
}

export interface PublicContentRelatedPage {
  title: string;
  href: string;
  category?: string;
  description?: string;
}

export interface PublicContentSourceReference {
  title: string;
  url?: string;
  date?: string | null;
  regulator?: PublicContentRegulator;
}

export interface PublicContentExpertProfile {
  name?: string;
  role?: string;
  initials?: string;
  bio?: string;
  email?: string;
}

export interface PublicContentPageRecord {
  id: string;
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
  status: PublicContentPageStatus;
  publishedAt: string | null;
  createdBy: string;
  updatedBy: string;
  publishedBy: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  pendingRevision: Record<string, unknown> | null;
  hasPendingChanges: boolean;
  pendingSubmittedBy: string;
  pendingSubmittedAt: string | null;
  pendingReviewComment: string;
  deletedFromStatus: string;
  deletedAt: string | null;
  deletedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicContentWorkingCopy {
  title: string;
  summary: string;
  hero: PublicContentHero | null;
  sections: PublicContentSection[];
  quickFacts: PublicContentQuickFact[];
  ctaCards: PublicContentCtaCard[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

export interface PublicContentImportInput {
  title: string;
  slug: string;
  fullPath: string;
  pageType: PublicContentPageType;
  menuGroup: PublicContentMenuGroup;
  category?: string;
  regulator?: PublicContentRegulator;
  serviceType?: string;
  summary?: string;
  sourceFile?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdBy?: string;
}
