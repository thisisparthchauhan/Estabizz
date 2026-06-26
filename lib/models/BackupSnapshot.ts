import mongoose, { Schema, Document, Model } from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// BackupSnapshot — one record per CMS backup run.
// The `payload` field stores the full backup JSON (excluded from list queries
// via .select('-payload') — fetched only for the download endpoint).
// ─────────────────────────────────────────────────────────────────────────────

export interface IBackupItemCounts {
  contentBlocks: number;
  contentVersions: number;
  contentAudit: number;
  mediaAssets: number;
  adminUsers: number;
  regulatoryUpdates: number;
  publicContentPages: number;
}

export interface IBackupSnapshot extends Document {
  type: 'manual' | 'auto';
  status: 'pending' | 'success' | 'failed';
  destination: 'local' | 'github' | 'local+github';
  fileName: string;
  filePath?: string;
  githubCommitSha?: string;
  createdBy: string;
  createdByRole: string;
  completedAt?: Date;
  summary?: string;
  itemCounts: IBackupItemCounts;
  errorMessage?: string;
  payload?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const BackupSnapshotSchema = new Schema<IBackupSnapshot>(
  {
    type:            { type: String, enum: ['manual', 'auto'],                    default: 'manual',  index: true },
    status:          { type: String, enum: ['pending', 'success', 'failed'],      default: 'pending', index: true },
    destination:     { type: String, enum: ['local', 'github', 'local+github'],   default: 'local' },
    fileName:        { type: String, default: '' },
    filePath:        { type: String },
    githubCommitSha: { type: String },
    createdBy:       { type: String, required: true },
    createdByRole:   { type: String, default: '' },
    completedAt:     { type: Date },
    summary:         { type: String },
    itemCounts: {
      contentBlocks:     { type: Number, default: 0 },
      contentVersions:   { type: Number, default: 0 },
      contentAudit:      { type: Number, default: 0 },
      mediaAssets:       { type: Number, default: 0 },
      adminUsers:        { type: Number, default: 0 },
      regulatoryUpdates: { type: Number, default: 0 },
      publicContentPages: { type: Number, default: 0 },
    },
    errorMessage: { type: String },
    payload:      { type: Schema.Types.Mixed, select: false },
  },
  {
    timestamps: true,
    collection: 'backup_snapshots',
  }
);

BackupSnapshotSchema.index({ createdAt: -1 });

const BackupSnapshot: Model<IBackupSnapshot> =
  mongoose.models.BackupSnapshot ||
  mongoose.model<IBackupSnapshot>('BackupSnapshot', BackupSnapshotSchema);

export default BackupSnapshot;
