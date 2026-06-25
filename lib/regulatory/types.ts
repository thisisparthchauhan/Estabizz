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
  | 'draft' | 'pending_approval' | 'published' | 'rejected' | 'archived';

export const REGULATOR_OPTIONS: RegulatorOption[] = [
  'RBI', 'SEBI', 'IRDAI', 'IFSCA', 'FIU-IND', 'MCA', 'FEMA', 'Income Tax', 'GST', 'Other',
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
  'Circular', 'Notification', 'Master Direction', 'Press Release',
  'Consultation Paper', 'Guideline', 'Compliance Update', 'Regulatory Alert', 'Other',
];

export const IMPACT_LEVEL_OPTIONS: ImpactLevel[] = ['Low', 'Medium', 'High', 'Critical'];

export const STATUS_OPTIONS: RegulatoryUpdateStatus[] = [
  'draft', 'pending_approval', 'published', 'rejected', 'archived',
];

/** Business-friendly status labels for the admin UI. */
export const STATUS_LABELS: Record<RegulatoryUpdateStatus, string> = {
  draft:            'Draft',
  pending_approval: 'Pending Review',
  published:        'Published',
  rejected:         'Rejected',
  archived:         'Archived',
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
