// ─────────────────────────────────────────────────────────────────────────────
// Backup system — shared TypeScript types
// ─────────────────────────────────────────────────────────────────────────────

export interface BackupItemCounts {
  contentBlocks: number;
  contentVersions: number;
  contentAudit: number;
  mediaAssets: number;
  adminUsers: number;
  regulatoryUpdates: number;
}

export interface BackupSnapshotRecord {
  id: string;
  type: 'manual' | 'auto';
  status: 'pending' | 'success' | 'failed';
  destination: 'local' | 'github' | 'local+github';
  fileName: string;
  filePath?: string;
  githubCommitSha?: string;
  createdBy: string;
  createdByRole: string;
  createdAt: string;
  completedAt?: string;
  summary?: string;
  itemCounts: BackupItemCounts;
  errorMessage?: string;
}

export interface BackupListResult {
  records: BackupSnapshotRecord[];
  total: number;
}

export interface GitHubBackupConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  basePath: string;
}
