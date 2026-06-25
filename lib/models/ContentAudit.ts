import mongoose, { Schema, Document, Model } from 'mongoose';
import type { ContentAuditAction } from '@/lib/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// ContentAudit — accountability trail. Records who did what to which block,
// especially sensitive actions like permanent deletion (purge), which require
// admin password confirmation.
// ─────────────────────────────────────────────────────────────────────────────

export interface IContentAudit extends Document {
  action: ContentAuditAction;
  blockKey: string;
  actor: string;
  passwordConfirmed?: boolean;
  detail?: string;
  createdAt: Date;
}

const ContentAuditSchema = new Schema<IContentAudit>(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'create', 'edit', 'submit', 'approve', 'reject',
        'publish', 'restore', 'soft_delete', 'restore_from_bin', 'purge',
        'backup',
      ],
    },
    blockKey:          { type: String, required: true, index: true },
    actor:             { type: String, default: '' },
    passwordConfirmed: { type: Boolean, default: false },
    detail:            { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'content_audit',
    minimize: false,
  }
);

ContentAuditSchema.index({ createdAt: -1 });

const ContentAudit: Model<IContentAudit> =
  mongoose.models.ContentAudit ||
  mongoose.model<IContentAudit>('ContentAudit', ContentAuditSchema);

export default ContentAudit;
