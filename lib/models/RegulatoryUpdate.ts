import mongoose, { Schema, Document, Model } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// RegulatoryUpdate — one regulatory update authored in the Regulatory Update
// Desk. Lifecycle: draft → pending_approval → published / rejected / archived.
//
// `detailedContent` is sanitised on write (safe controlled rich text). No
// secrets or credentials live in this collection, so it is safe to back up
// in full.
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

export interface IRegulatoryUpdate extends Document {
  title: string;
  slug: string;
  regulator: RegulatorOption;
  category: CategoryOption;
  summary: string;
  detailedContent: string;

  sourceTitle: string;
  sourceUrl: string;
  sourceDate?: Date;
  publishedDate?: Date;
  effectiveDate?: Date;

  impactLevel: ImpactLevel;
  applicableTo: string[];
  tags: string[];

  status: RegulatoryUpdateStatus;

  // SEO (per-update, optional — falls back to title/summary when empty)
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  featuredImageUrl: string;

  // Accountability metadata
  createdBy: string;
  createdByRole: string;
  updatedBy: string;
  reviewedBy: string;
  reviewComment: string;
  publishedBy: string;
  archivedBy: string;

  publishedAt?: Date;
  archivedAt?: Date;

  // Pending revision — edits to a published item awaiting approval.
  // Public reads NEVER use this; only the live top-level fields are public.
  pendingRevision?: Record<string, unknown> | null;
  hasPendingChanges: boolean;
  pendingSubmittedBy: string;
  pendingSubmittedAt?: Date;
  pendingReviewComment: string;

  // Soft-delete (Recycle Bin) lifecycle
  deletedFromStatus: string;
  deletedAt?: Date;
  deletedBy: string;

  createdAt: Date;
  updatedAt: Date;
}

const REGULATORS: RegulatorOption[] = [
  'RBI', 'SEBI', 'IRDAI', 'IFSCA', 'FIU-IND', 'MCA', 'FEMA', 'Income Tax', 'GST', 'Other',
];
const CATEGORIES: CategoryOption[] = [
  'Circular', 'Notification', 'Master Direction', 'Press Release',
  'Consultation Paper', 'Guideline', 'Compliance Update', 'Regulatory Alert', 'Other',
];
const IMPACT_LEVELS: ImpactLevel[] = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES: RegulatoryUpdateStatus[] = [
  'draft', 'pending_approval', 'published', 'rejected', 'archived', 'deleted',
];

const RegulatoryUpdateSchema = new Schema<IRegulatoryUpdate>(
  {
    title:           { type: String, required: true, trim: true },
    slug:            { type: String, required: true, unique: true, index: true },
    regulator:       { type: String, enum: REGULATORS, required: true, index: true },
    category:        { type: String, enum: CATEGORIES, required: true, index: true },
    summary:         { type: String, required: true },
    detailedContent: { type: String, default: '' },

    sourceTitle:     { type: String, default: '' },
    sourceUrl:       { type: String, default: '' },
    sourceDate:      { type: Date },
    publishedDate:   { type: Date },
    effectiveDate:   { type: Date },

    impactLevel:     { type: String, enum: IMPACT_LEVELS, default: 'Medium', index: true },
    applicableTo:    { type: [String], default: [] },
    tags:            { type: [String], default: [] },

    status: {
      type: String,
      enum: STATUSES,
      default: 'draft',
      index: true,
    },

    seoTitle:        { type: String, default: '' },
    seoDescription:  { type: String, default: '' },
    canonicalUrl:    { type: String, default: '' },
    featuredImageUrl:{ type: String, default: '' },

    createdBy:       { type: String, default: '' },
    createdByRole:   { type: String, default: '' },
    updatedBy:       { type: String, default: '' },
    reviewedBy:      { type: String, default: '' },
    reviewComment:   { type: String, default: '' },
    publishedBy:     { type: String, default: '' },
    archivedBy:      { type: String, default: '' },

    publishedAt:     { type: Date },
    archivedAt:      { type: Date },

    // Pending revision (edits awaiting approval) — never read by the public site.
    pendingRevision:      { type: Schema.Types.Mixed, default: null },
    hasPendingChanges:    { type: Boolean, default: false, index: true },
    pendingSubmittedBy:   { type: String, default: '' },
    pendingSubmittedAt:   { type: Date },
    pendingReviewComment: { type: String, default: '' },

    // Soft-delete lifecycle (Recycle Bin)
    deletedFromStatus: { type: String, default: '' },
    deletedAt:         { type: Date },
    deletedBy:         { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'regulatory_updates',
    minimize: false,
  }
);

RegulatoryUpdateSchema.index({ status: 1, publishedAt: -1 });
RegulatoryUpdateSchema.index({ createdAt: -1 });
RegulatoryUpdateSchema.index(
  { title: 'text', summary: 'text', sourceTitle: 'text', tags: 'text' },
  { name: 'regulatory_update_text_search' }
);

const RegulatoryUpdate: Model<IRegulatoryUpdate> =
  mongoose.models.RegulatoryUpdate ||
  mongoose.model<IRegulatoryUpdate>('RegulatoryUpdate', RegulatoryUpdateSchema);

export default RegulatoryUpdate;
