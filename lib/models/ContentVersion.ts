import mongoose, { Schema, Document, Model } from 'mongoose';
import type { ContentStatus } from '@/lib/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// ContentVersion — an immutable historical snapshot of a content block,
// written on every save. Restoring a version copies its `snapshot` back into
// the live ContentBlock. We keep every version (storage is cheap); the UI
// surfaces the most recent ones.
// ─────────────────────────────────────────────────────────────────────────────

export interface IContentVersion extends Document {
  blockKey: string;
  snapshot: Record<string, unknown>;
  status: ContentStatus;
  changedBy: string;
  note?: string;
  createdAt: Date;
}

const ContentVersionSchema = new Schema<IContentVersion>(
  {
    blockKey: { type: String, required: true, index: true, trim: true },
    snapshot: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ['published', 'draft', 'pending_approval', 'rejected', 'deleted'],
      default: 'published',
    },
    changedBy: { type: String, default: '' },
    note:      { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'content_versions',
    minimize: false,
  }
);

// Newest-first lookups per block
ContentVersionSchema.index({ blockKey: 1, createdAt: -1 });

const ContentVersion: Model<IContentVersion> =
  mongoose.models.ContentVersion ||
  mongoose.model<IContentVersion>('ContentVersion', ContentVersionSchema);

export default ContentVersion;
