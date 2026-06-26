"use client";

import { useState, useCallback } from "react";
import type { BackupSnapshotRecord, BackupListResult } from "@/lib/content/backupTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Viewer { email: string; role: string; permissions: string[] }
interface Props {
  viewer: Viewer | null;
  initialResult: BackupListResult;
  githubReady: boolean;
}
interface Toast { message: string; ok: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIST(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function roleLabel(role: string): string {
  const map: Record<string, string> = {
    super_admin: "Super Admin", admin: "Admin",
    website_editor: "Website Editor", content_writer: "Content Writer",
    compliance_reviewer: "Compliance Reviewer", seo_manager: "SEO Manager",
    admin_viewer: "Admin Viewer",
  };
  return map[role] ?? role;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed:  "bg-red-50 text-red-600 border-red-200",
  };
  const labels: Record<string, string> = { success: "Saved", pending: "Saving…", failed: "Failed" };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${map[status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Destination badge ────────────────────────────────────────────────────────

function DestBadge({ destination }: { destination: string }) {
  if (destination === "local+github")
    return <span className="inline-flex rounded-full border border-[#1677f2]/30 bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-blue-700">Local + GitHub</span>;
  if (destination === "github")
    return <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10.5px] font-bold text-purple-700">GitHub</span>;
  return <span className="inline-flex rounded-full border border-[#e2eaf2] bg-[#f8fafc] px-2 py-0.5 text-[10.5px] font-bold text-[#64748b]">Local Only</span>;
}

// ─── Detail drawer ────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">{label}</div>
      <div className="mt-0.5 text-[12px] text-[#0a1628] font-medium break-words">{value || "—"}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BackupsClient({ viewer, initialResult, githubReady }: Props) {
  const canView   = !!viewer?.permissions.includes("view_admin");
  const canBackup = !!viewer?.permissions.includes("manage_backups");

  const [result,   setResult]   = useState<BackupListResult>(initialResult);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<BackupSnapshotRecord | null>(null);
  const [toast,    setToast]    = useState<Toast | null>(null);

  function showToast(message: string, ok = true) {
    setToast({ message, ok });
    setTimeout(() => setToast(null), 4000);
  }

  // ── Refresh list ──────────────────────────────────────────────────────────

  const refreshList = useCallback(async () => {
    try {
      const res  = await fetch("/api/admin/backups?limit=25");
      const data = await res.json() as BackupListResult & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to load backup records.");
      setResult(data);
    } catch {
      // silently ignore refresh errors
    }
  }, []);

  // ── Create backup ─────────────────────────────────────────────────────────

  async function handleCreate() {
    if (creating) return;
    setCreating(true);
    try {
      const res  = await fetch("/api/admin/backups/create", { method: "POST" });
      const data = await res.json() as { success?: boolean; record?: BackupSnapshotRecord; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to create backup.");
      showToast("Backup created successfully.");
      await refreshList();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to create backup.", false);
    } finally {
      setCreating(false);
    }
  }

  // ── Download ──────────────────────────────────────────────────────────────

  function handleDownload(record: BackupSnapshotRecord) {
    const url = `/api/admin/backups/${record.id}/download`;
    const a   = document.createElement("a");
    a.href     = url;
    a.download = record.fileName;
    a.click();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#f4f7fb]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] max-w-sm rounded-2xl border px-4 py-3 text-[13px] font-semibold shadow-xl ${
          toast.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
        }`}>
          {toast.message}
        </div>
      )}

      {/* ── Detail drawer ──────────────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-[7000] flex items-start justify-end bg-black/30 backdrop-blur-sm"
             onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-[400px] overflow-y-auto bg-white shadow-2xl flex flex-col"
               onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between border-b border-[#e2eaf2] px-6 py-4">
              <div className="text-[14px] font-black text-[#0a1628]">Backup Details</div>
              <button onClick={() => setSelected(null)} className="rounded-xl p-2 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status={selected.status} />
                <DestBadge destination={selected.destination} />
              </div>
              <DetailRow label="File Name"      value={selected.fileName} />
              <DetailRow label="Created By"     value={`${selected.createdBy} (${roleLabel(selected.createdByRole)})`} />
              <DetailRow label="Created On"     value={formatIST(selected.createdAt)} />
              <DetailRow label="Completed On"   value={formatIST(selected.completedAt)} />
              {selected.summary && <DetailRow label="Summary"        value={selected.summary} />}

              {/* Item counts */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-2">Items Backed Up</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Content Sections",   selected.itemCounts.contentBlocks],
                    ["Version History",    selected.itemCounts.contentVersions],
                    ["Activity Records",   selected.itemCounts.contentAudit],
                    ["Media Files",        selected.itemCounts.mediaAssets],
                    ["Regulatory Updates", selected.itemCounts.regulatoryUpdates],
                    ["Content Pages",      selected.itemCounts.publicContentPages],
                    ["Admin Users",        selected.itemCounts.adminUsers],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="rounded-xl border border-[#f0f4f8] bg-[#f8fafc] p-3 text-center">
                      <div className="text-[18px] font-black text-[#1677f2]">{String(val)}</div>
                      <div className="text-[10px] text-[#94a3b8] font-semibold mt-0.5">{String(label)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selected.githubCommitSha && (
                <DetailRow label="GitHub Commit" value={selected.githubCommitSha.slice(0, 12)} />
              )}
              {selected.filePath && (
                <DetailRow label="GitHub Path" value={selected.filePath} />
              )}
              {selected.errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-3">
                  <div className="text-[10px] font-black uppercase tracking-wide text-red-400 mb-1">Error Details</div>
                  <div className="text-[11px] text-red-700 leading-5 font-medium">{selected.errorMessage}</div>
                </div>
              )}
            </div>

            {selected.status === "success" && canBackup && (
              <div className="border-t border-[#e2eaf2] px-6 py-4">
                <button
                  onClick={() => handleDownload(selected)}
                  className="w-full rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] transition-colors"
                >
                  Download Backup File
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Page body ──────────────────────────────────────────────────────── */}
      <div className="p-6 lg:p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[21px] font-black text-[#0a1628]">Backups</h1>
            <p className="mt-0.5 text-[13px] text-[#64748b]">
              Save a snapshot of all CMS content for safekeeping.
              {result.total > 0 && (
                <span className="ml-1 font-semibold text-[#0a1628]">{result.total} backup{result.total !== 1 ? "s" : ""} stored</span>
              )}
            </p>
          </div>
          {canBackup && (
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center gap-2 rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-black text-white shadow hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
            >
              {creating ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Creating…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Create Backup
                </>
              )}
            </button>
          )}
        </div>

        {/* Access restricted */}
        {!canView && (
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-8 text-center shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
            <div className="text-[15px] font-black text-[#0a1628] mb-1">Access Restricted</div>
            <p className="text-[13px] text-[#64748b] max-w-xs mx-auto leading-5">
              You do not have permission to view Backups.
            </p>
          </div>
        )}

        {canView && (
          <>
            {/* ── GitHub status panel ──────────────────────────────────────── */}
            <div className={`rounded-2xl border p-4 ${
              githubReady
                ? "border-blue-100 bg-blue-50"
                : "border-[#e2eaf2] bg-white"
            } shadow-[0_2px_12px_rgba(10,22,40,0.05)]`}>
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${githubReady ? "bg-[#1677f2]" : "bg-[#f4f7fb]"}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={githubReady ? "white" : "#94a3b8"}>
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </div>
                <div>
                  <div className={`text-[12px] font-black ${githubReady ? "text-[#1677f2]" : "text-[#0a1628]"}`}>
                    GitHub Backup — {githubReady ? "Connected" : "Not configured"}
                  </div>
                  <div className="text-[11px] text-[#64748b] leading-5 mt-0.5">
                    {githubReady
                      ? "Backups are automatically pushed to your GitHub repository in addition to being saved locally."
                      : "To enable GitHub backup, add GITHUB_BACKUP_TOKEN, GITHUB_BACKUP_OWNER, and GITHUB_BACKUP_REPO to your environment settings. Backups will still be saved locally without GitHub."}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Backup list ───────────────────────────────────────────────── */}
            {result.records.length === 0 ? (
              <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white text-center">
                <svg className="mb-3 text-[#cbd5e1]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div className="text-[14px] font-black text-[#0a1628] mb-1">No Backups Yet</div>
                <div className="text-[12px] text-[#94a3b8] leading-5 max-w-xs">
                  {canBackup
                    ? 'Click "Create Backup" to save your first snapshot.'
                    : "No backups have been created yet."}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">File Name</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden md:table-cell">Status</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Destination</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Created By</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Created On</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f7fb]">
                    {result.records.map(rec => (
                      <tr key={rec.id} className="hover:bg-[#fafcff] transition-colors">

                        {/* Name */}
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-[#0a1628] truncate max-w-[200px]">{rec.fileName}</div>
                          {rec.summary && (
                            <div className="text-[10.5px] text-[#94a3b8] mt-0.5 truncate max-w-[220px]">{rec.summary}</div>
                          )}
                        </td>

                        <td className="px-4 py-3.5 hidden md:table-cell"><StatusBadge status={rec.status} /></td>
                        <td className="px-4 py-3.5 hidden lg:table-cell"><DestBadge destination={rec.destination} /></td>
                        <td className="px-4 py-3.5 text-[#64748b] hidden lg:table-cell">{rec.createdBy}</td>
                        <td className="px-4 py-3.5 text-[#64748b]">{formatIST(rec.createdAt)}</td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              onClick={() => setSelected(rec)}
                              className="rounded-xl border border-[#e2eaf2] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
                            >
                              Details
                            </button>
                            {rec.status === "success" && canBackup && (
                              <button
                                onClick={() => handleDownload(rec)}
                                className="rounded-xl border border-[#1677f2]/30 bg-blue-50 px-2.5 py-1.5 text-[11px] font-bold text-[#1677f2] hover:bg-blue-100 transition-colors"
                              >
                                Download
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="border-t border-[#f0f4f8] bg-[#f8fafc] px-5 py-3">
                  <span className="text-[11px] text-[#94a3b8]">
                    {result.records.length} of {result.total} backup{result.total !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}

            {/* ── Info panel ────────────────────────────────────────────────── */}
            <div className="rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-3">What is included in a backup?</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-[11px] text-[#64748b]">
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Website content</div>
                  All published, draft, and pending website sections — homepage, navigation, SEO settings, and all content blocks.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Version history</div>
                  Every saved version of every content section, so you can track changes over time.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Activity log</div>
                  Who changed what and when — the full audit trail for the admin panel.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Media file records</div>
                  File names, links, and labels for all uploaded media. The actual files remain on Cloudinary and are not downloaded.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Admin user list</div>
                  Names, roles, and permissions only. Passwords are never included in any backup.
                </div>
                <div className="rounded-xl border border-[#f0f4f8] p-3 leading-5">
                  <div className="font-bold text-[#0a1628] mb-1">Security</div>
                  Passwords, tokens, database connection strings, and secret keys are never included. Only Super Admin and Administrator can create or download backups.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
