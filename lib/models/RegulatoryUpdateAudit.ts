import mongoose, { Schema, Document, Model } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// RegulatoryUpdateAudit — accountability trail for the Regulatory Update Desk.
//
// Kept separate from ContentAudit on purpose: ContentAudit feeds the completed
// Change History / Restore screens (keyed to website content-block defaults)
// and its action enum has no `update` / `archive` values. A dedicated audit
// collection isolates this module without disturbing those screens.
// ─────────────────────────────────────────────────────────────────────────────

export type RegulatoryAuditAction =
  | 'create' | 'update' | 'save_pending_revision' | 'submit'
  | 'approve_pending_revision' | 'publish' | 'reject' | 'archive'
  | 'move_to_draft' | 'delete' | 'restore' | 'purge';

export interface IRegulatoryUpdateAudit extends Document {
  action: RegulatoryAuditAction;
  updateId: string;
  title: string;
  actor: string;
  actorRole: string;
  detail?: string;
  createdAt: Date;
}

const RegulatoryUpdateAuditSchema = new Schema<IRegulatoryUpdateAudit>(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'create', 'update', 'save_pending_revision', 'submit',
        'approve_pending_revision', 'publish', 'reject', 'archive',
        'move_to_draft', 'delete', 'restore', 'purge',
      ],
    },
    updateId:  { type: String, required: true, index: true },
    title:     { type: String, default: '' },
    actor:     { type: String, default: '' },
    actorRole: { type: String, default: '' },
    detail:    { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'regulatory_update_audit',
    minimize: false,
  }
);

RegulatoryUpdateAuditSchema.index({ createdAt: -1 });

const RegulatoryUpdateAudit: Model<IRegulatoryUpdateAudit> =
  mongoose.models.RegulatoryUpdateAudit ||
  mongoose.model<IRegulatoryUpdateAudit>('RegulatoryUpdateAudit', RegulatoryUpdateAuditSchema);

export default RegulatoryUpdateAudit;
