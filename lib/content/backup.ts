// ─────────────────────────────────────────────────────────────────────────────
// CMS Backup — collects safe CMS data and stores a snapshot record.
//
// Security rules (enforced here, not only in the API layer):
//   • AdminUser records: only safe metadata fields — never passwordHash
//   • User credential collection: never queried or included
//   • GitHub token: read from env vars, never logged, never returned in API
//   • No .env values are serialised into the backup payload
// ─────────────────────────────────────────────────────────────────────────────

import { connectDB } from '@/lib/db';
import ContentBlock from '@/lib/models/ContentBlock';
import ContentVersion from '@/lib/models/ContentVersion';
import ContentAudit from '@/lib/models/ContentAudit';
import MediaAsset from '@/lib/models/MediaAsset';
import AdminUser from '@/lib/models/AdminUser';
import RegulatoryUpdate from '@/lib/models/RegulatoryUpdate';
import PublicContentPage from '@/lib/models/PublicContentPage';
import BackupSnapshot from '@/lib/models/BackupSnapshot';
import { PUBLIC_CONTENT_MANAGED_PATHS } from '@/lib/publicContent/managedPaths';
import type { BackupSnapshotRecord, BackupListResult, BackupItemCounts, GitHubBackupConfig } from './backupTypes';

// ── GitHub env-var config ─────────────────────────────────────────────────────

export function getGitHubBackupConfig(): GitHubBackupConfig | null {
  const token = process.env.GITHUB_BACKUP_TOKEN;
  const owner = process.env.GITHUB_BACKUP_OWNER;
  const repo  = process.env.GITHUB_BACKUP_REPO;
  if (!token || !owner || !repo) return null;
  return {
    token,
    owner,
    repo,
    branch:   process.env.GITHUB_BACKUP_BRANCH ?? 'main',
    basePath: (process.env.GITHUB_BACKUP_PATH ?? 'cms-backups').replace(/\/$/, ''),
  };
}

export function isGitHubConfigured(): boolean {
  return !!(
    process.env.GITHUB_BACKUP_TOKEN &&
    process.env.GITHUB_BACKUP_OWNER &&
    process.env.GITHUB_BACKUP_REPO
  );
}

// ── IST-based filename ────────────────────────────────────────────────────────

interface FilenameResult { fileName: string; year: string; month: string; day: string }

function buildFileName(): FilenameResult {
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const pad = (n: number) => String(n).padStart(2, '0');
  const year  = String(ist.getFullYear());
  const month = pad(ist.getMonth() + 1);
  const day   = pad(ist.getDate());
  const h     = pad(ist.getHours());
  const m     = pad(ist.getMinutes());
  const s     = pad(ist.getSeconds());
  return { fileName: `backup-${year}-${month}-${day}-${h}-${m}-${s}-IST.json`, year, month, day };
}

// ── Collect safe data ─────────────────────────────────────────────────────────

interface PayloadResult { payload: Record<string, unknown>; itemCounts: BackupItemCounts; jsonStr: string }

async function collectPayload(actor: string, role: string, fileName: string): Promise<PayloadResult> {
  const [contentBlocks, contentVersions, contentAudit, mediaAssets, adminUsers, regulatoryUpdates, publicContentPages] = await Promise.all([
    // All content blocks — no sensitive fields in this collection
    ContentBlock.find({}).lean(),

    // Full version history for restorability
    ContentVersion.find({}).lean(),

    // Accountability trail
    ContentAudit.find({}).lean(),

    // Media metadata only (no file binaries, no Cloudinary secrets)
    MediaAsset.find({}).select(
      'title fileName secureUrl publicId resourceType format mimeType ' +
      'size width height altText caption tags folder uploadedBy uploadedByRole ' +
      'usedIn status createdAt updatedAt'
    ).lean(),

    // Admin users — safe metadata only. passwordHash is excluded by { select: false }
    // in the schema, but we explicitly project it out here as a second layer of safety.
    AdminUser.find({}).select(
      'fullName email role status permissions createdAt updatedAt'
    ).lean(),

    // Regulatory updates — content only. This collection holds no credentials
    // or secrets, so every field is safe to include for full restorability.
    RegulatoryUpdate.find({}).select(
      'title slug regulator category summary detailedContent ' +
      'sourceTitle sourceUrl sourceDate publishedDate effectiveDate ' +
      'impactLevel applicableTo tags status seoTitle seoDescription canonicalUrl featuredImageUrl ' +
      'createdBy createdByRole updatedBy reviewedBy reviewComment publishedBy archivedBy ' +
      'publishedAt archivedAt ' +
      // Lifecycle fields (Phase 3B) — all content, no secrets
      'pendingRevision hasPendingChanges pendingSubmittedBy pendingSubmittedAt pendingReviewComment ' +
      'deletedFromStatus deletedAt deletedBy ' +
      'createdAt updatedAt'
    ).lean(),

    // Public content pages — only the currently approved CMS-managed guide pages.
    // pendingRevision included for full restorability. No credentials or secrets in this collection.
    PublicContentPage.find({ fullPath: { $in: [...PUBLIC_CONTENT_MANAGED_PATHS] } }).select(
      'title slug fullPath pageType menuGroup regulator status summary ' +
      'hero heroImage pageDesign sections quickFacts ctaCards relatedPages sourceReferences ' +
      'seoTitle seoDescription canonicalUrl reviewedBy lastReviewedAt readingTime ' +
      'hasPendingChanges pendingRevision pendingSubmittedBy pendingSubmittedAt pendingReviewComment ' +
      'deletedFromStatus deletedAt deletedBy createdAt updatedAt publishedAt updatedBy publishedBy'
    ).lean(),
  ]);

  const itemCounts: BackupItemCounts = {
    contentBlocks:      contentBlocks.length,
    contentVersions:    contentVersions.length,
    contentAudit:       contentAudit.length,
    mediaAssets:        mediaAssets.length,
    adminUsers:         adminUsers.length,
    regulatoryUpdates:  regulatoryUpdates.length,
    publicContentPages: publicContentPages.length,
  };

  const payload: Record<string, unknown> = {
    metadata: {
      fileName,
      createdAt:     new Date().toISOString(),
      createdBy:     actor,
      createdByRole: role,
      version:       '1.0',
      project:       'Estabizz',
      notice:        'CMS content and metadata only. No credentials, secrets, or sensitive authentication data.',
      itemCounts,
    },
    contentBlocks,
    contentVersions,
    contentAudit,
    mediaAssets,
    adminUsers,
    regulatoryUpdates,
    publicContentPages,
  };

  const jsonStr = JSON.stringify(payload, null, 2);
  return { payload, itemCounts, jsonStr };
}

// ── GitHub push ───────────────────────────────────────────────────────────────

async function pushToGitHub(
  cfg: GitHubBackupConfig,
  jsonStr: string,
  fileName: string,
  year: string,
  month: string,
  day: string,
): Promise<{ sha: string; filePath: string }> {
  const filePath    = `${cfg.basePath}/${year}/${month}/${day}/${fileName}`;
  const apiUrl      = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${filePath}`;
  const contentB64  = Buffer.from(jsonStr, 'utf-8').toString('base64');

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization:         `Bearer ${cfg.token}`,
      'Content-Type':        'application/json',
      Accept:                'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent':          'Estabizz-CMS-Backup/1.0',
    },
    body: JSON.stringify({
      message: `CMS backup: ${fileName}`,
      content: contentB64,
      branch:  cfg.branch,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`GitHub returned ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json() as { commit?: { sha?: string } };
  return { sha: data.commit?.sha ?? '', filePath };
}

// ── Create backup ─────────────────────────────────────────────────────────────

export async function createBackup(actor: string, role: string): Promise<BackupSnapshotRecord> {
  await connectDB();

  const { fileName, year, month, day } = buildFileName();
  const githubCfg = getGitHubBackupConfig();

  // Create a pending record immediately so the UI can show "in progress"
  const snapshot = await BackupSnapshot.create({
    type:          'manual',
    status:        'pending',
    destination:   githubCfg ? 'local+github' : 'local',
    fileName,
    createdBy:     actor,
    createdByRole: role,
    itemCounts:    { contentBlocks: 0, contentVersions: 0, contentAudit: 0, mediaAssets: 0, adminUsers: 0, regulatoryUpdates: 0, publicContentPages: 0 },
  });

  try {
    const { payload, itemCounts, jsonStr } = await collectPayload(actor, role, fileName);

    let githubSha    = '';
    let filePath     = '';
    let destination: 'local' | 'github' | 'local+github' = 'local';
    let errorMessage: string | undefined;

    if (githubCfg) {
      try {
        const ghResult = await pushToGitHub(githubCfg, jsonStr, fileName, year, month, day);
        githubSha  = ghResult.sha;
        filePath   = ghResult.filePath;
        destination = 'local+github';
      } catch (ghErr) {
        // GitHub failed — backup is still saved locally; surface the error in the record
        destination  = 'local';
        errorMessage = ghErr instanceof Error ? `GitHub: ${ghErr.message}` : 'GitHub push failed';
      }
    }

    const summary = `${itemCounts.contentBlocks} content sections, ${itemCounts.mediaAssets} media files, ${itemCounts.regulatoryUpdates} regulatory updates, ${itemCounts.publicContentPages} content pages, ${itemCounts.adminUsers} admin users`;

    await BackupSnapshot.findByIdAndUpdate(snapshot._id, {
      $set: {
        status:          'success',
        destination,
        filePath:        filePath || undefined,
        githubCommitSha: githubSha || undefined,
        completedAt:     new Date(),
        itemCounts,
        payload,
        summary,
        errorMessage,
      },
    });

    // Audit record — key 'system:backup' never collides with content block keys
    await ContentAudit.create({
      action:   'backup',
      blockKey: 'system:backup',
      actor,
      detail:   `Backup created: ${fileName}. Destination: ${destination}. ${summary}.`,
    });

    const updated = await BackupSnapshot.findById(snapshot._id).lean();
    if (!updated) throw new Error('Backup record missing after save.');
    return toRecord(updated as unknown as Record<string, unknown>);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    await BackupSnapshot.findByIdAndUpdate(snapshot._id, {
      $set: { status: 'failed', completedAt: new Date(), errorMessage: msg },
    });
    throw err;
  }
}

// ── List backups ──────────────────────────────────────────────────────────────

export async function listBackups(page = 1, limit = 25): Promise<BackupListResult> {
  await connectDB();
  const skip = (page - 1) * limit;
  const [docs, total] = await Promise.all([
    // Never load payload in list view — it can be large
    BackupSnapshot.find({}).select('-payload').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    BackupSnapshot.countDocuments(),
  ]);
  return { records: (docs as unknown as Record<string, unknown>[]).map(toRecord), total };
}

// ── Download backup payload ───────────────────────────────────────────────────

export async function getBackupDownload(id: string): Promise<{ fileName: string; json: string } | null> {
  await connectDB();
  // Must explicitly request the payload field (select: false in schema)
  const doc = await BackupSnapshot.findById(id).select('+payload').lean() as unknown as Record<string, unknown> | null;
  if (!doc) return null;
  const payload = doc.payload as Record<string, unknown> | undefined;
  if (!payload) return null;
  return {
    fileName: (doc.fileName as string) || `backup-${id}.json`,
    json:     JSON.stringify(payload, null, 2),
  };
}

// ── Serialiser ────────────────────────────────────────────────────────────────

function toRecord(doc: Record<string, unknown>): BackupSnapshotRecord {
  const counts = (doc.itemCounts ?? {}) as Record<string, unknown>;
  return {
    id:              String(doc._id),
    type:            (doc.type  as 'manual' | 'auto')                   ?? 'manual',
    status:          (doc.status as 'pending' | 'success' | 'failed')   ?? 'pending',
    destination:     (doc.destination as 'local' | 'github' | 'local+github') ?? 'local',
    fileName:        (doc.fileName        as string) ?? '',
    filePath:        (doc.filePath        as string | undefined),
    githubCommitSha: (doc.githubCommitSha as string | undefined),
    createdBy:       (doc.createdBy       as string) ?? '',
    createdByRole:   (doc.createdByRole   as string) ?? '',
    createdAt:       (doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt ?? '')),
    completedAt:     doc.completedAt instanceof Date ? doc.completedAt.toISOString() : undefined,
    summary:         (doc.summary         as string | undefined),
    itemCounts: {
      contentBlocks:      Number(counts.contentBlocks      ?? 0),
      contentVersions:    Number(counts.contentVersions    ?? 0),
      contentAudit:       Number(counts.contentAudit       ?? 0),
      mediaAssets:        Number(counts.mediaAssets        ?? 0),
      adminUsers:         Number(counts.adminUsers         ?? 0),
      regulatoryUpdates:  Number(counts.regulatoryUpdates  ?? 0),
      publicContentPages: Number(counts.publicContentPages ?? 0),
    },
    errorMessage: (doc.errorMessage as string | undefined),
  };
}
