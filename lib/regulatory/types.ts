// ─────────────────────────────────────────────────────────────────────────────
// Regulatory Update Desk — shared, CLIENT-SAFE types & option lists.
//
// No server-only imports here, so both the admin client UI and the server
// repository can import from this file.
// ─────────────────────────────────────────────────────────────────────────────

export type RegulatorOption =
  | 'RBI' | 'SEBI' | 'IRDAI' | 'IFSCA' | 'FIU-IND'
  | 'MCA' | 'FEMA' | 'Income Tax' | 'GST' | 'Other';

export type CategoryOption =
  | 'Circular' | 'Notification' | 'Master Direction' | 'Press Release'
  | 'Consultation Paper' | 'Guideline' | 'Compliance Update'
  | 'Regulatory Alert' | 'Other';

export type ImpactLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type RegulatoryUpdateStatus =
  | 'draft' | 'pending_approval' | 'published' | 'rejected' | 'archived' | 'deleted';

export const REGULATOR_OPTIONS: RegulatorOption[] = [
  'RBI', 'SEBI', 'IRDAI', 'IFSCA', 'FIU-IND', 'MCA', 'FEMA', 'Income Tax', 'GST', 'Other',
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
  'Circular', 'Notification', 'Master Direction', 'Press Release',
  'Consultation Paper', 'Guideline', 'Compliance Update', 'Regulatory Alert', 'Other',
];

export const IMPACT_LEVEL_OPTIONS: ImpactLevel[] = ['Low', 'Medium', 'High', 'Critical'];

/**
 * Statuses offered in the desk's status filter. 'deleted' is included so admins
 * can view soft-deleted items, but deleted items live primarily in the Recycle
 * Bin and are excluded from the default ("all") desk list.
 */
export const STATUS_OPTIONS: RegulatoryUpdateStatus[] = [
  'published', 'draft', 'pending_approval', 'rejected', 'archived', 'deleted',
];

/** Business-friendly status labels for the admin UI. */
export const STATUS_LABELS: Record<RegulatoryUpdateStatus, string> = {
  draft:            'Draft',
  pending_approval: 'Pending Review',
  published:        'Published',
  rejected:         'Rejected',
  archived:         'Archived',
  deleted:          'Deleted',
};

/**
 * Plain record passed from the server to the admin client.
 * All dates are ISO-8601 strings (rendered in IST in the UI).
 */
export interface RegulatoryUpdateRecord {
  id: string;
  title: string;
  slug: string;
  regulator: RegulatorOption;
  category: CategoryOption;
  summary: string;
  detailedContent: string;

  sourceTitle: string;
  sourceUrl: string;
  sourceDate: string | null;
  publishedDate: string | null;
  effectiveDate: string | null;

  impactLevel: ImpactLevel;
  applicableTo: string[];
  tags: string[];

  status: RegulatoryUpdateStatus;

  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  featuredImageUrl: string;

  createdBy: string;
  createdByRole: string;
  updatedBy: string;
  reviewedBy: string;
  reviewComment: string;
  publishedBy: string;
  archivedBy: string;

  publishedAt: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // ── Pending revision (edits to a published item awaiting approval) ──────────
  /** True when a published item has staged edits that are not yet live. */
  hasPendingChanges: boolean;
  /** The staged edits (a subset of editable fields). Public reads ignore this. */
  pendingRevision: RegulatoryPendingRevision | null;
  pendingSubmittedBy: string;
  pendingSubmittedAt: string | null;
  pendingReviewComment: string;

  // ── Soft-delete (Recycle Bin) lifecycle ─────────────────────────────────────
  /** The status the item held immediately before it was moved to the Recycle Bin. */
  deletedFromStatus: string;
  deletedAt: string | null;
  deletedBy: string;
}

/**
 * A staged set of edits awaiting approval. Same shape as the editable fields,
 * with dates already serialised to ISO strings for the client.
 */
export interface RegulatoryPendingRevision {
  title?: string;
  regulator?: RegulatorOption;
  category?: CategoryOption;
  summary?: string;
  detailedContent?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  sourceDate?: string | null;
  publishedDate?: string | null;
  effectiveDate?: string | null;
  impactLevel?: ImpactLevel;
  applicableTo?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  featuredImageUrl?: string;
}

/** The subset of a record shown publicly (only ever derived from published items). */
export interface PublicRegulatoryUpdate {
  title: string;
  slug: string;
  regulator: RegulatorOption;
  category: CategoryOption;
  summary: string;
  detailedContent: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDate: string | null;
  publishedDate: string | null;
  effectiveDate: string | null;
  impactLevel: ImpactLevel;
  applicableTo: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  featuredImageUrl: string;
  publishedAt: string | null;
}

/** Editable fields accepted from the admin form (create / update). */
export interface RegulatoryUpdateInput {
  title?: string;
  slug?: string;
  regulator?: RegulatorOption;
  category?: CategoryOption;
  summary?: string;
  detailedContent?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  sourceDate?: string | null;
  publishedDate?: string | null;
  effectiveDate?: string | null;
  impactLevel?: ImpactLevel;
  applicableTo?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  featuredImageUrl?: string;
}
