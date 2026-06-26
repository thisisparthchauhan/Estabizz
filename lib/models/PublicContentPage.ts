import mongoose, { Schema, Document, Model } from 'mongoose';
import {
  PUBLIC_CONTENT_MENU_GROUP_OPTIONS,
  PUBLIC_CONTENT_PAGE_TYPE_OPTIONS,
  PUBLIC_CONTENT_REGULATOR_OPTIONS,
  PUBLIC_CONTENT_STATUS_OPTIONS,
  type PublicContentMenuGroup,
  type PublicContentPageStatus,
  type PublicContentPageType,
  type PublicContentRegulator,
} from '@/lib/publicContent/types';

// PublicContentPage - future CMS home for public service/regulatory/resource
// pages. Phase 4B only adds the model and import foundation; public rendering is
// intentionally unchanged.

export interface IPublicContentPage extends Document {
  title: string;
  slug: string;
  fullPath: string;
  pageType: PublicContentPageType;
  menuGroup: PublicContentMenuGroup;
  category: string;
  regulator: PublicContentRegulator;
  serviceType: string;
  summary: string;

  hero: Record<string, unknown> | null;
  heroImage?: Record<string, unknown> | null;
  badges: Record<string, unknown>[];
  breadcrumbs: Record<string, unknown>[];
  sections: Record<string, unknown>[];
  snapshotCards: Record<string, unknown>[];
  quickFacts: Record<string, unknown>[];
  ctaCards: Record<string, unknown>[];
  expertProfile: Record<string, unknown> | null;
  relatedPages: Record<string, unknown>[];
  sourceReferences: Record<string, unknown>[];

  reviewedBy: string;
  lastReviewedAt?: Date;
  readingTime: string;

  status: PublicContentPageStatus;
  publishedAt?: Date;

  createdBy: string;
  updatedBy: string;
  publishedBy: string;

  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;

  pendingRevision?: Record<string, unknown> | null;
  hasPendingChanges: boolean;
  pendingSubmittedBy: string;
  pendingSubmittedAt?: Date;
  pendingReviewComment: string;

  deletedFromStatus: string;
  deletedAt?: Date;
  deletedBy: string;

  createdAt: Date;
  updatedAt: Date;
}

const PublicContentPageSchema = new Schema(
  {
    title:       { type: String, required: true, trim: true, index: true },
    slug:        { type: String, required: true, trim: true, index: true },
    fullPath:    { type: String, required: true, trim: true, unique: true, index: true },
    pageType:    { type: String, enum: PUBLIC_CONTENT_PAGE_TYPE_OPTIONS, required: true, index: true },
    menuGroup:   { type: String, enum: PUBLIC_CONTENT_MENU_GROUP_OPTIONS, default: 'other', index: true },
    category:    { type: String, default: '', index: true },
    regulator:   { type: String, enum: PUBLIC_CONTENT_REGULATOR_OPTIONS, default: 'Other', index: true },
    serviceType: { type: String, default: '' },
    summary:     { type: String, default: '' },

    hero:             { type: Schema.Types.Mixed, default: null },
    heroImage:        { type: Schema.Types.Mixed, default: null },
    badges:           { type: Array, default: [] },
    breadcrumbs:      { type: Array, default: [] },
    sections:         { type: Array, default: [] },
    snapshotCards:    { type: Array, default: [] },
    quickFacts:       { type: Array, default: [] },
    ctaCards:         { type: Array, default: [] },
    expertProfile:    { type: Schema.Types.Mixed, default: null },
    relatedPages:     { type: Array, default: [] },
    sourceReferences: { type: Array, default: [] },

    reviewedBy:      { type: String, default: '' },
    lastReviewedAt:  { type: Date },
    readingTime:     { type: String, default: '' },

    status: {
      type: String,
      enum: PUBLIC_CONTENT_STATUS_OPTIONS,
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date },

    createdBy:   { type: String, default: '' },
    updatedBy:   { type: String, default: '' },
    publishedBy: { type: String, default: '' },

    seoTitle:       { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    canonicalUrl:   { type: String, default: '' },
    ogImage:        { type: String, default: '' },

    // Pending revision support for later phases. Public reads must ignore this.
    pendingRevision:      { type: Schema.Types.Mixed, default: null },
    hasPendingChanges:    { type: Boolean, default: false, index: true },
    pendingSubmittedBy:   { type: String, default: '' },
    pendingSubmittedAt:   { type: Date },
    pendingReviewComment: { type: String, default: '' },

    deletedFromStatus: { type: String, default: '' },
    deletedAt:         { type: Date },
    deletedBy:         { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'public_content_pages',
    minimize: false,
  }
);

PublicContentPageSchema.index({ status: 1, updatedAt: -1 });
PublicContentPageSchema.index({ menuGroup: 1, pageType: 1 });
PublicContentPageSchema.index(
  { title: 'text', fullPath: 'text', summary: 'text', category: 'text', serviceType: 'text' },
  { name: 'public_content_page_text_search' }
);

const PublicContentPage: Model<IPublicContentPage> =
  mongoose.models.PublicContentPage ||
  mongoose.model<IPublicContentPage>('PublicContentPage', PublicContentPageSchema);

export default PublicContentPage;
