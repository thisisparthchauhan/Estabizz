import mongoose, { Schema, Document, Model } from 'mongoose';
import type { ContentStatus } from '@/lib/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// ContentBlock — one editable unit of the website, addressed by a stable `key`
// (e.g. "global.footer", "homepage.hero"). This is the LIVE content the public
// site reads. If a key has no document here, the site falls back to the
// hardcoded default in lib/content/defaults.ts.
// ─────────────────────────────────────────────────────────────────────────────

export interface IContentBlock extends Document {
  key: string;
  fields: Record<string, unknown>;
  status: ContentStatus;

  updatedBy: string;
  submittedBy?: string;
  reviewedBy?: string;
  reviewNote?: string;

  deletedBy?: string;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema = new Schema<IContentBlock>(
  {
    key: { type: String, required: true, unique: true, index: true, trim: true },

    // Mixed = free-form object; each key defines its own field shape.
    fields: { type: Schema.Types.Mixed, default: {} },

    status: {
      type: String,
      enum: ['published', 'draft', 'pending_approval', 'rejected', 'deleted'],
      default: 'published',
      index: true,
    },

    updatedBy:   { type: String, default: '' },
    submittedBy: { type: String },
    reviewedBy:  { type: String },
    reviewNote:  { type: String },

    deletedBy: { type: String },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'content_blocks',
    minimize: false, // keep empty objects instead of stripping them
  }
);

const ContentBlock: Model<IContentBlock> =
  mongoose.models.ContentBlock ||
  mongoose.model<IContentBlock>('ContentBlock', ContentBlockSchema);

export default ContentBlock;
