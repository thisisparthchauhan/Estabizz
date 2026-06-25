"use client";

import { useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminRole =
  | "super_admin" | "website_editor" | "content_writer"
  | "compliance_reviewer" | "seo_manager" | "admin_viewer"
  | "admin" | "editor" | "reviewer";

type AdminStatus = "active" | "inactive" | "suspended";

interface AdminPermission { key: string; label: string }

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  permissions: string[];
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Viewer {
  email: string;
  role: AdminRole;
  permissions: string[];
}

interface Props {
  viewer: Viewer | null;
  initialUsers: UserRecord[];
  allowlistEmails: string[];
}

interface Toast { message: string; ok: boolean }

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin:          "Super Admin",
  website_editor:       "Website Editor",
  content_writer:       "Content Writer",
  compliance_reviewer:  "Compliance Reviewer",
  seo_manager:          "SEO Manager",
  admin_viewer:         "Admin Viewer",
  admin:                "Administrator",
  editor:               "Editor",
  reviewer:             "Reviewer",
};

const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin:          "Full access to all settings, content and users",
  website_editor:       "Edit website sections and upload media",
  content_writer:       "Create content drafts for review",
  compliance_reviewer:  "Review, approve and publish content",
  seo_manager:          "Manage SEO fields and SEO media",
  admin_viewer:         "Read-only access to the admin panel",
  admin:                "Full access (legacy role)",
  editor:               "Edit content and blogs (legacy role)",
  reviewer:             "Approve and publish content (legacy role)",
};

// Roles available when creating a new user (business roles only)
const CREATABLE_ROLES: AdminRole[] = [
  "super_admin", "website_editor", "content_writer",
  "compliance_reviewer", "seo_manager", "admin_viewer",
];

const PERMISSION_LABELS: Record<string, string> = {
  view_admin:       "View admin panel",
  manage_content:   "Edit website content",
  manage_navigation:"Edit navigation",
  publish_content:  "Approve and publish content",
  delete_content:   "Move content to bin",
  purge_content:    "Permanently delete content",
  manage_seo:       "Manage SEO settings",
  manage_media:     "Upload and manage media",
  manage_users:     "Manage admin users",
  manage_blogs:     "Access blog management",
  create_blog:      "Write new blog posts",
  edit_blog:        "Edit blog posts",
  approve_blog:     "Approve blog submissions",
  publish_blog:     "Publish blog posts",
  reject_blog:      "Reject blog submissions",
  archive_blog:     "Archive blog posts",
  delete_blog:      "Delete blog posts",
  manage_categories:"Manage blog categories",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIST(iso?: string): string {
  if (!iso) return "Not available";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
}

// ─── Role badge ───────────────────────────────────────────────────────────────

const ROLE_BADGE: Record<AdminRole, string> = {
  super_admin:         "bg-amber-50 text-amber-700 border-amber-200",
  website_editor:      "bg-blue-50 text-blue-700 border-blue-200",
  content_writer:      "bg-cyan-50 text-cyan-700 border-cyan-200",
  compliance_reviewer: "bg-violet-50 text-violet-700 border-violet-200",
  seo_manager:         "bg-green-50 text-green-700 border-green-200",
  admin_viewer:        "bg-slate-50 text-slate-600 border-slate-200",
  admin:               "bg-amber-50 text-amber-700 border-amber-200",
  editor:              "bg-blue-50 text-blue-700 border-blue-200",
  reviewer:            "bg-violet-50 text-violet-700 border-violet-200",
};

function RoleBadge({ role }: { role: AdminRole }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${ROLE_BADGE[role] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}

function StatusBadge({ status }: { status: AdminStatus }) {
  const map: Record<AdminStatus, { label: string; cls: string; dot: string }> = {
    active:    { label: "Active",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    inactive:  { label: "Inactive",  cls: "bg-gray-50 text-gray-500 border-gray-200",         dot: "bg-gray-400"    },
    suspended: { label: "Suspended", cls: "bg-red-50 text-red-600 border-red-200",             dot: "bg-red-500"     },
  };
  const m = map[status] ?? map.inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${m.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function UsersClient({ viewer, initialUsers, allowlistEmails }: Props) {
  const canManage = !!viewer?.permissions.includes("manage_users");
  const allowlistSet = useMemo(() => new Set(allowlistEmails.map(e => e.toLowerCase())), [allowlistEmails]);

  // List state
  const [users,    setUsers]    = useState<UserRecord[]>(initialUsers);
  const [search,   setSearch]   = useState("");
  const [roleFilter,   setRoleFilter]   = useState<AdminRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<AdminStatus | "all">("all");

  // Edit panel
  const [editUser,    setEditUser]    = useState<UserRecord | null>(null);
  const [editName,    setEditName]    = useState("");
  const [editRole,    setEditRole]    = useState<AdminRole>("admin_viewer");
  const [editStatus,  setEditStatus]  = useState<AdminStatus>("active");
  const [savingEdit,  setSavingEdit]  = useState(false);
  const [editError,   setEditError]   = useState("");
  const [showPerms,   setShowPerms]   = useState(false);

  // Add user modal
  const [showAdd,   setShowAdd]   = useState(false);
  const [addName,   setAddName]   = useState("");
  const [addEmail,  setAddEmail]  = useState("");
  const [addRole,   setAddRole]   = useState<AdminRole>("admin_viewer");
  const [addError,  setAddError]  = useState("");
  const [addSaving, setAddSaving] = useState(false);

  // Self-demotion warning
  const [demotionConfirm, setDemotionConfirm] = useState(false);
  const pendingSaveRef = useRef(false);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);
  const showToast = (message: string, ok = true) => {
    setToast({ message, ok });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = [...users];
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(u =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (ROLE_LABELS[u.role] ?? u.role).toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
      );
    }
    if (roleFilter !== "all")   list = list.filter(u => u.role   === roleFilter);
    if (statusFilter !== "all") list = list.filter(u => u.status === statusFilter);
    return list;
  }, [users, search, roleFilter, statusFilter]);

  // ── Open edit panel ───────────────────────────────────────────────────────

  function openEdit(u: UserRecord) {
    setEditUser(u);
    setEditName(u.fullName);
    setEditRole(u.role);
    setEditStatus(u.status);
    setEditError("");
    setShowPerms(false);
    setDemotionConfirm(false);
    pendingSaveRef.current = false;
  }

  function closeEdit() {
    setEditUser(null);
    setEditError("");
    setDemotionConfirm(false);
  }

  // ── Save edit ─────────────────────────────────────────────────────────────

  async function doSaveEdit() {
    if (!editUser) return;
    setSavingEdit(true);
    setEditError("");
    try {
      const payload: Record<string, unknown> = {};
      if (editName   !== editUser.fullName) payload.fullName = editName;
      if (editRole   !== editUser.role)     payload.role     = editRole;
      if (editStatus !== editUser.status)   payload.status   = editStatus;

      if (Object.keys(payload).length === 0) { closeEdit(); return; }

      const res  = await fetch(`/api/admin/users/${editUser.id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json() as { success?: boolean; user?: UserRecord; error?: string };

      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to save changes.");

      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...data.user } : u));
      showToast("Changes saved.");
      closeEdit();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setSavingEdit(false);
    }
  }

  function handleSaveEdit() {
    if (!editUser) return;
    const isSelf = editUser.email.toLowerCase() === viewer?.email.toLowerCase();
    const isDemotingFromSuperAdmin =
      editUser.role === "super_admin" &&
      (editRole !== "super_admin" || editStatus !== "active");

    if (isSelf && isDemotingFromSuperAdmin && !demotionConfirm) {
      setDemotionConfirm(true);
      return;
    }
    doSaveEdit();
  }

  // ── Add user ──────────────────────────────────────────────────────────────

  async function handleAddUser() {
    setAddError("");
    if (!addName.trim()) { setAddError("Full Name is required."); return; }
    if (!addEmail.trim()) { setAddError("Email Address is required."); return; }

    setAddSaving(true);
    try {
      const res  = await fetch("/api/admin/users", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ fullName: addName, email: addEmail, role: addRole }),
      });
      const data = await res.json() as { success?: boolean; user?: UserRecord; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to add user.");

      if (data.user) setUsers(prev => [...prev, data.user!]);
      showToast(`${data.user?.fullName ?? "User"} added successfully.`);
      setShowAdd(false);
      setAddName("");
      setAddEmail("");
      setAddRole("admin_viewer");
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Unable to add user.");
    } finally {
      setAddSaving(false);
    }
  }

  function openAddModal() {
    setAddName(""); setAddEmail(""); setAddRole("admin_viewer");
    setAddError(""); setShowAdd(true);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#f4f7fb]">

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] max-w-sm rounded-2xl border px-4 py-3 text-[13px] font-semibold shadow-xl ${
          toast.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
        }`}>
          {toast.message}
        </div>
      )}

      {/* ── Edit slide-over panel ─────────────────────────────────────────── */}
      {editUser && (
        <div className="fixed inset-0 z-[7000] flex items-start justify-end bg-black/30 backdrop-blur-sm"
             onClick={closeEdit}>
          <div className="h-full w-full max-w-[420px] overflow-y-auto bg-white shadow-2xl flex flex-col"
               onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2eaf2] px-6 py-4">
              <div>
                <div className="text-[14px] font-black text-[#0a1628]">Edit User</div>
                <div className="text-[11px] text-[#94a3b8] truncate max-w-[260px]">{editUser.email}</div>
              </div>
              <button onClick={closeEdit} className="rounded-xl p-2 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Avatar */}
            <div className="border-b border-[#f4f7fb] bg-[#f8fafc] px-6 py-5 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#1677f2] to-[#b8860b] flex items-center justify-center text-[18px] font-black text-white shadow-sm">
                {initials(editUser.fullName)}
              </div>
              <div>
                <div className="text-[14px] font-black text-[#0a1628]">{editUser.fullName}</div>
                <div className="mt-0.5 flex flex-wrap gap-1.5">
                  <RoleBadge role={editUser.role} />
                  <StatusBadge status={editUser.status} />
                  {allowlistSet.has(editUser.email) ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Login ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      ⚠ Login pending setup
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Self-demotion warning */}
            {demotionConfirm && (
              <div className="mx-5 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="text-[13px] font-black text-amber-900 mb-1">Reduce your own access?</div>
                <p className="text-[12px] text-amber-800 leading-5 mb-3">
                  You are about to remove or suspend your own Super Admin access. You will lose the ability to manage users.
                </p>
                <div className="flex gap-2">
                  <button onClick={doSaveEdit} className="rounded-xl bg-amber-600 px-3 py-1.5 text-[12px] font-black text-white hover:bg-amber-700">
                    Yes, proceed
                  </button>
                  <button onClick={() => setDemotionConfirm(false)} className="rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-[12px] font-bold text-amber-700">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            {canManage && !demotionConfirm && (
              <div className="flex-1 space-y-5 px-6 py-5">

                {/* Full Name */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Email Address</label>
                  <div className="mt-1 rounded-xl border border-[#e2eaf2] bg-[#f8fafc] px-3 py-2.5 text-[13px] text-[#94a3b8]">
                    {editUser.email}
                  </div>
                  <div className="mt-1 text-[10px] text-[#94a3b8]">Email address cannot be changed.</div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Role</label>
                  <select
                    value={editRole}
                    onChange={e => setEditRole(e.target.value as AdminRole)}
                    className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  >
                    {CREATABLE_ROLES.map(r => (
                      <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                    ))}
                    {/* Show legacy role as option if user currently has it */}
                    {(["admin", "editor", "reviewer"] as AdminRole[]).includes(editUser.role) && (
                      <option value={editUser.role}>{ROLE_LABELS[editUser.role]} (legacy)</option>
                    )}
                  </select>
                  <div className="mt-1 text-[11px] text-[#64748b] italic">
                    {ROLE_DESCRIPTIONS[editRole]}
                  </div>
                  {editRole !== editUser.role && (
                    <div className="mt-1.5 text-[11px] text-amber-700 font-semibold">
                      ⚠ Permissions will be reset to the defaults for {ROLE_LABELS[editRole]}.
                    </div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as AdminStatus)}
                    className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Error */}
                {editError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-700">
                    {editError}
                  </div>
                )}
              </div>
            )}

            {/* Permissions section (always visible, read-only) */}
            <div className="px-6 pb-3">
              <button
                type="button"
                onClick={() => setShowPerms(v => !v)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94a3b8] hover:text-[#475569]"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform ${showPerms ? "rotate-90" : ""}`}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
                View Permissions ({editUser.permissions.length})
              </button>

              {showPerms && (
                <div className="mt-2 rounded-xl border border-[#e2eaf2] bg-[#f8fafc] p-3">
                  {editUser.permissions.length === 0 ? (
                    <div className="text-[12px] text-[#94a3b8]">No permissions assigned.</div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {editUser.permissions.map(p => (
                        <span key={p} className="rounded-full bg-white border border-[#e2eaf2] px-2 py-0.5 text-[10.5px] text-[#475569] font-medium">
                          {PERMISSION_LABELS[p] ?? p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="mx-5 mb-4 grid grid-cols-2 gap-3 rounded-2xl border border-[#f0f4f8] bg-[#f8fafc] p-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Created On</div>
                <div className="mt-0.5 text-[11px] font-semibold text-[#475569]">{formatIST(editUser.createdAt)}</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Last Updated</div>
                <div className="mt-0.5 text-[11px] font-semibold text-[#475569]">{formatIST(editUser.updatedAt)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Last Login</div>
                <div className="mt-0.5 text-[11px] font-semibold text-[#475569]">{formatIST(editUser.lastLoginAt)}</div>
              </div>
            </div>

            {/* Password reset note */}
            <div className="mx-5 mb-4 rounded-xl border border-[#dbe7f3] bg-[#f0f7ff] px-4 py-3 text-[11px] text-[#475569] leading-4">
              <span className="font-black text-[#1677f2]">Password reset</span> — To reset this user's login password, run the admin setup script:
              <br /><code className="mt-1 inline-block rounded bg-white border border-[#dbe7f3] px-1.5 py-0.5 font-mono text-[10px] text-[#0a1628]">
                node scripts/createAdminLogin.mjs {editUser.email}
              </code>
            </div>

            {/* Footer actions */}
            {canManage && !demotionConfirm && (
              <div className="border-t border-[#e2eaf2] px-6 py-4 flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                  className="flex-1 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
                >
                  {savingEdit ? "Saving…" : "Save Changes"}
                </button>
                <button onClick={closeEdit} className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Add User modal ────────────────────────────────────────────────── */}
      {showAdd && (
        <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-black/30 backdrop-blur-sm"
             onClick={() => setShowAdd(false)}>
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-7 shadow-2xl max-w-md w-full mx-4"
               onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-5">
              <div className="text-[16px] font-black text-[#0a1628]">Add User</div>
              <button onClick={() => setShowAdd(false)} className="rounded-xl p-1.5 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Full Name</label>
                <input
                  type="text"
                  value={addName}
                  onChange={e => setAddName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  placeholder="e.g. Priya Sharma"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Email Address</label>
                <input
                  type="email"
                  value={addEmail}
                  onChange={e => setAddEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  placeholder="priya@estabizz.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Role</label>
                <select
                  value={addRole}
                  onChange={e => setAddRole(e.target.value as AdminRole)}
                  className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                >
                  {CREATABLE_ROLES.map(r => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-[#64748b] italic">{ROLE_DESCRIPTIONS[addRole]}</div>
              </div>

              {addError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-700">
                  {addError}
                </div>
              )}

              {/* Login setup note */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] text-amber-800 leading-5">
                <span className="font-black">Login setup required:</span> After adding this user, run the admin setup script to create their login password, and add their email to the admin allowlist.
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleAddUser}
                disabled={addSaving}
                className="flex-1 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
              >
                {addSaving ? "Adding…" : "Add User"}
              </button>
              <button onClick={() => setShowAdd(false)} className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page body ─────────────────────────────────────────────────────── */}
      <div className="p-6 lg:p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[21px] font-black text-[#0a1628]">Users &amp; Roles</h1>
            <p className="mt-0.5 text-[13px] text-[#64748b]">
              Manage who has access to the admin panel and what they can do.
              {canManage && users.length > 0 && (
                <span className="ml-1 font-semibold text-[#0a1628]">{users.length} user{users.length !== 1 ? "s" : ""}</span>
              )}
            </p>
          </div>
          {canManage && (
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-black text-white shadow-sm hover:bg-[#1265d8] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add User
            </button>
          )}
        </div>

        {/* No permission */}
        {!canManage && (
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-8 text-center shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
            <svg className="mx-auto mb-3 text-[#cbd5e1]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <div className="text-[15px] font-black text-[#0a1628] mb-1">Access Restricted</div>
            <p className="text-[13px] text-[#64748b] max-w-xs mx-auto leading-5">
              Only Super Admins can view and manage admin users. Your current role does not include user management access.
            </p>
          </div>
        )}

        {canManage && (
          <>
            {/* Search & filter bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, email or role…"
                  className="w-full rounded-xl border border-[#dbe7f3] bg-white py-2 pl-8 pr-3 text-[12px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]">×</button>
                )}
              </div>

              {/* Role filter */}
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value as AdminRole | "all")}
                className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#475569] focus:border-[#1677f2] focus:outline-none"
              >
                <option value="all">All Roles</option>
                {(["super_admin", "website_editor", "content_writer", "compliance_reviewer", "seo_manager", "admin_viewer", "admin", "editor", "reviewer"] as AdminRole[]).map(r => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as AdminStatus | "all")}
                className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#475569] focus:border-[#1677f2] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Users table */}
            {filtered.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white text-center">
                <svg className="mb-3 text-[#cbd5e1]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                <div className="text-[14px] font-black text-[#0a1628] mb-1">No users found</div>
                <div className="text-[12px] text-[#94a3b8]">Try a different search or filter.</div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Name</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden sm:table-cell">Email</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Role</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Status</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Last Updated</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f7fb]">
                    {filtered.map(u => {
                      const isSelf = u.email.toLowerCase() === viewer?.email.toLowerCase();
                      return (
                        <tr key={u.id} className="hover:bg-[#fafcff] transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-[11px] font-black text-white shadow-sm shrink-0 ${
                                isSelf ? "bg-gradient-to-br from-[#1677f2] to-[#b8860b]" : "bg-gradient-to-br from-[#475569] to-[#1e293b]"
                              }`}>
                                {initials(u.fullName)}
                              </div>
                              <div>
                                <div className="font-black text-[#0a1628] leading-tight">
                                  {u.fullName}
                                  {isSelf && <span className="ml-1.5 text-[9px] font-bold text-[#1677f2] border border-[#1677f2]/30 rounded-full px-1.5 py-0.5">You</span>}
                                </div>
                                <div className="text-[10.5px] text-[#94a3b8] sm:hidden truncate max-w-[140px]">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-[#64748b] hidden sm:table-cell">{u.email}</td>
                          <td className="px-4 py-3.5"><RoleBadge role={u.role} /></td>
                          <td className="px-4 py-3.5"><StatusBadge status={u.status} /></td>
                          <td className="px-4 py-3.5 text-[#94a3b8] hidden lg:table-cell">{formatIST(u.updatedAt)}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEdit(u)}
                                className="rounded-xl border border-[#e2eaf2] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
                              >
                                Edit
                              </button>
                              {u.status === "active" ? (
                                <button
                                  onClick={() => { openEdit(u); setEditStatus("suspended"); }}
                                  className="rounded-xl border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-100 transition-colors"
                                >
                                  Disable
                                </button>
                              ) : (
                                <button
                                  onClick={() => { openEdit(u); setEditStatus("active"); }}
                                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                                >
                                  Reactivate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Footer row */}
                <div className="border-t border-[#f0f4f8] bg-[#f8fafc] px-5 py-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#94a3b8]">{filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Active login = email in admin allowlist
                  </div>
                </div>
              </div>
            )}

            {/* Role guide */}
            <div className="rounded-2xl border border-[#e2eaf2] bg-white p-5 shadow-[0_2px_12px_rgba(10,22,40,0.05)]">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-3">Role Guide</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CREATABLE_ROLES.map(r => (
                  <div key={r} className="flex items-start gap-2.5 rounded-xl border border-[#f0f4f8] p-3">
                    <RoleBadge role={r} />
                    <div className="text-[11px] text-[#64748b] leading-4">{ROLE_DESCRIPTIONS[r]}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
