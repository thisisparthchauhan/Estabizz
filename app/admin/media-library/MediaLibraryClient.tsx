"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AdminPermission, AdminRole } from "@/lib/admin/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Viewer {
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
}

interface MediaItem {
  _id: string;
  title: string;
  fileName: string;
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  format: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText: string;
  caption: string;
  tags: string[];
  folder: string;
  uploadedBy: string;
  uploadedByRole: string;
  usedIn: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ListResult {
  items: MediaItem[];
  page: number;
  total: number;
  totalPages: number;
}

type TypeFilter = "all" | "image" | "icon" | "pdf" | "other";
type ViewMode   = "grid" | "list";

interface EditForm {
  title:   string;
  altText: string;
  caption: string;
  tags:    string[];
}

interface Toast {
  message: string;
  ok: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CLOUD  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  ?? "";
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg":       "jpg",
  "image/jpg":        "jpg",
  "image/png":        "png",
  "image/webp":       "webp",
  "image/svg+xml":    "svg",
  "application/pdf":  "pdf",
};

function mimeToCloudinaryResource(mime: string): "image" | "raw" {
  if (mime === "image/svg+xml" || mime === "application/pdf") return "raw";
  return "image";
}

function getMediaType(format: string): TypeFilter {
  const f = format.toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(f)) return "image";
  if (f === "svg") return "icon";
  if (f === "pdf") return "pdf";
  return "other";
}

function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatIST(iso?: string): string {
  if (!iso) return "—";
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

function cloudinaryThumb(url: string, w = 220, h = 160): string {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w},h_${h},c_fill/`);
}

const TYPE_META: Record<TypeFilter, { label: string; dot: string; badge: string }> = {
  all:   { label: "All",    dot: "#94a3b8", badge: "" },
  image: { label: "Image",  dot: "#1677f2", badge: "bg-blue-50 text-blue-600 border-blue-200" },
  icon:  { label: "Icon",   dot: "#7c3aed", badge: "bg-violet-50 text-violet-600 border-violet-200" },
  pdf:   { label: "PDF",    dot: "#dc2626", badge: "bg-red-50 text-red-600 border-red-200" },
  other: { label: "Other",  dot: "#64748b", badge: "bg-gray-50 text-gray-500 border-gray-200" },
};

function hasPermission(viewer: Viewer | null, p: AdminPermission): boolean {
  return !!viewer?.permissions.includes(p);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeIcon({ format, className = "" }: { format: string; className?: string }) {
  const t = getMediaType(format);
  if (t === "pdf") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-red-50 ${className}`}>
        <svg viewBox="0 0 40 48" fill="none" className="w-9 h-11">
          <rect width="40" height="48" rx="4" fill="#fee2e2"/>
          <path d="M6 28h28M6 34h20" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <text x="20" y="20" textAnchor="middle" fontSize="10" fontWeight="800" fill="#dc2626">PDF</text>
        </svg>
      </div>
    );
  }
  if (t === "icon") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-violet-50 ${className}`}>
        <svg viewBox="0 0 40 48" fill="none" className="w-9 h-11">
          <rect width="40" height="48" rx="4" fill="#ede9fe"/>
          <text x="20" y="20" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c3aed">SVG</text>
          <circle cx="20" cy="33" r="7" fill="none" stroke="#7c3aed" strokeWidth="2"/>
          <path d="M14 33c2-5 10-5 12 0" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center rounded-xl bg-gray-50 ${className}`}>
      <svg viewBox="0 0 40 48" fill="none" className="w-9 h-11">
        <rect width="40" height="48" rx="4" fill="#f1f5f9"/>
        <text x="20" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">
          {format.toUpperCase() || "FILE"}
        </text>
      </svg>
    </div>
  );
}

function TypeBadge({ format }: { format: string }) {
  const t = getMediaType(format);
  const m = TYPE_META[t];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${m.badge}`}>
      {m.label}
    </span>
  );
}

function TagPill({ tag, onRemove }: { tag: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f7ff] border border-[#1677f2]/20 px-2 py-0.5 text-[11px] font-semibold text-[#1677f2]">
      {tag}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 text-[#1677f2]/50 hover:text-[#1677f2] leading-none"
        >
          ×
        </button>
      )}
    </span>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

export default function MediaLibraryClient({ viewer }: { viewer: Viewer | null }) {
  const canUpload = hasPermission(viewer, "manage_media");
  const canEdit   = hasPermission(viewer, "manage_media");
  const canRemove = hasPermission(viewer, "delete_content");

  // List state
  const [items,      setItems]      = useState<MediaItem[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page,       setPage]       = useState(1);
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [viewMode,   setViewMode]   = useState<ViewMode>("grid");

  // Upload state
  const fileInputRef  = useRef<HTMLInputElement>(null);
  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadPct,   setUploadPct]   = useState(0);

  // Edit modal state
  const [editItem,   setEditItem]   = useState<MediaItem | null>(null);
  const [editForm,   setEditForm]   = useState<EditForm>({ title: "", altText: "", caption: "", tags: [] });
  const [tagInput,   setTagInput]   = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError,  setEditError]  = useState("");
  const [showInternal, setShowInternal] = useState(false);

  // Remove confirm state
  const [removeId,     setRemoveId]     = useState<string | null>(null);
  const [removingId,   setRemovingId]   = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string, ok = true) => {
    setToast({ message, ok });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchItems = useCallback(async (p: number, s: string, t: TypeFilter) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page:   String(p),
        limit:  "24",
        search: s,
        type:   t,
      });
      const res  = await fetch(`/api/admin/media?${qs}`);
      const data: ListResult = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      showToast("Unable to load media. Please refresh.", false);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchItems(1, search, typeFilter);
    }, 350);
    return () => clearTimeout(t);
  }, [search, typeFilter, fetchItems]);

  useEffect(() => {
    fetchItems(page, search, typeFilter);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Upload ────────────────────────────────────────────────────────────────

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;

    setUploadError("");

    const mime = file.type;
    if (!ALLOWED_MIME[mime]) {
      setUploadError("Unsupported file type. Please upload a JPG, PNG, WebP, SVG or PDF.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError("File must be 10 MB or smaller.");
      return;
    }
    if (!CLOUD || !PRESET) {
      setUploadError("Cloudinary is not configured. Contact the site administrator.");
      return;
    }

    const resourceType = mimeToCloudinaryResource(mime);
    const uploadUrl    = `https://api.cloudinary.com/v1_1/${CLOUD}/${resourceType}/upload`;

    setUploading(true);
    setUploadPct(10);

    try {
      const fd = new FormData();
      fd.append("file",          file);
      fd.append("upload_preset", PRESET);
      fd.append("folder",        "estabizz/media");

      setUploadPct(30);
      const res  = await fetch(uploadUrl, { method: "POST", body: fd });
      setUploadPct(75);

      const data = await res.json() as {
        secure_url?:        string;
        url?:               string;
        public_id?:         string;
        format?:            string;
        bytes?:             number;
        width?:             number;
        height?:            number;
        original_filename?: string;
        resource_type?:     string;
        error?:             { message: string };
      };

      if (!res.ok || data.error || !data.secure_url) {
        throw new Error(data.error?.message ?? "Upload failed. Please try again.");
      }

      // Save record to MongoDB
      const saveRes = await fetch("/api/admin/media", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicId:          data.public_id,
          url:               data.url,
          secureUrl:         data.secure_url,
          resourceType:      data.resource_type ?? resourceType,
          format:            data.format ?? ALLOWED_MIME[mime] ?? "",
          bytes:             data.bytes,
          width:             data.width,
          height:            data.height,
          originalFilename:  data.original_filename ?? file.name,
          mimeType:          mime,
          title:             file.name.replace(/\.[^.]+$/, ""),
        }),
      });

      if (!saveRes.ok) {
        const err = await saveRes.json() as { error?: string };
        throw new Error(err.error ?? "File uploaded but record could not be saved.");
      }

      setUploadPct(100);
      showToast("File uploaded successfully.");
      setPage(1);
      await fetchItems(1, search, typeFilter);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      setUploadPct(0);
    }
  }

  // ── Edit ──────────────────────────────────────────────────────────────────

  function openEdit(item: MediaItem) {
    setEditItem(item);
    setEditForm({ title: item.title, altText: item.altText, caption: item.caption, tags: [...item.tags] });
    setTagInput("");
    setEditError("");
    setShowInternal(false);
  }

  function closeEdit() {
    setEditItem(null);
    setEditError("");
  }

  function addTag() {
    const t = tagInput.trim().replace(/,/g, "").toLowerCase();
    if (!t || editForm.tags.includes(t)) { setTagInput(""); return; }
    setEditForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  }

  async function saveEdit() {
    if (!editItem) return;
    setSavingEdit(true);
    setEditError("");
    try {
      const res = await fetch(`/api/admin/media/${editItem._id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(editForm),
      });
      const data = await res.json() as { success?: boolean; asset?: MediaItem; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to save changes.");
      setItems(prev => prev.map(it => it._id === editItem._id ? { ...it, ...data.asset } : it));
      showToast("Details saved.");
      closeEdit();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setSavingEdit(false);
    }
  }

  // ── Remove ────────────────────────────────────────────────────────────────

  async function confirmRemove() {
    if (!removeId) return;
    setRemovingId(removeId);
    setRemoveId(null);
    try {
      const res = await fetch(`/api/admin/media/${removeId}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        throw new Error(d.error ?? "Unable to remove file.");
      }
      setItems(prev => prev.filter(it => it._id !== removeId));
      setTotal(t => Math.max(0, t - 1));
      showToast("File removed from library.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to remove file.", false);
    } finally {
      setRemovingId(null);
    }
  }

  // ── Copy URL ──────────────────────────────────────────────────────────────

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard.");
    } catch {
      showToast("Unable to copy — please copy the URL manually.", false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
    { value: "all",   label: "All" },
    { value: "image", label: "Images" },
    { value: "icon",  label: "Icons" },
    { value: "pdf",   label: "PDFs" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-full bg-[#f4f7fb]">

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] max-w-[340px] rounded-2xl border px-4 py-3 text-[13px] font-semibold shadow-xl transition-all ${
          toast.ok
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}>
          {toast.message}
        </div>
      )}

      {/* ── Upload progress overlay ───────────────────────────────────────── */}
      {uploading && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-8 shadow-2xl w-72 text-center">
            <div className="mb-4 text-[14px] font-black text-[#0a1628]">Uploading…</div>
            <div className="h-2 w-full rounded-full bg-[#e2eaf2] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1677f2] transition-all duration-300"
                style={{ width: `${uploadPct}%` }}
              />
            </div>
            <div className="mt-3 text-[12px] text-[#94a3b8]">{uploadPct}%</div>
          </div>
        </div>
      )}

      {/* ── Edit modal ────────────────────────────────────────────────────── */}
      {editItem && (
        <div className="fixed inset-0 z-[7000] flex items-start justify-end bg-black/30 backdrop-blur-sm"
             onClick={closeEdit}>
          <div
            className="h-full w-full max-w-[420px] overflow-y-auto bg-white shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#e2eaf2] px-6 py-4">
              <div>
                <div className="text-[14px] font-black text-[#0a1628]">Edit Details</div>
                <div className="text-[11px] text-[#94a3b8] truncate max-w-[260px]">{editItem.fileName}</div>
              </div>
              <button onClick={closeEdit} className="rounded-xl p-2 text-[#94a3b8] hover:bg-[#f4f7fb] hover:text-[#0a1628]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Thumbnail preview */}
            <div className="border-b border-[#f4f7fb] bg-[#f8fafc] px-6 py-4">
              {getMediaType(editItem.format) === "image" ? (
                <img
                  src={cloudinaryThumb(editItem.secureUrl, 380, 200)}
                  alt={editItem.altText || editItem.title}
                  className="w-full h-40 object-cover rounded-xl border border-[#e2eaf2]"
                  loading="lazy"
                />
              ) : (
                <TypeIcon format={editItem.format} className="w-full h-40" />
              )}
            </div>

            {/* Form */}
            <div className="flex-1 space-y-5 px-6 py-5">

              {/* File Name */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1">File Name</div>
                <div className="text-[13px] text-[#475569] break-all">{editItem.fileName}</div>
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">File Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  placeholder="Descriptive file title"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Alt Text</label>
                <input
                  type="text"
                  value={editForm.altText}
                  onChange={e => setEditForm(f => ({ ...f, altText: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  placeholder="Describe the image for accessibility"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Caption</label>
                <textarea
                  value={editForm.caption}
                  onChange={e => setEditForm(f => ({ ...f, caption: e.target.value }))}
                  rows={2}
                  className="mt-1 w-full resize-none rounded-xl border border-[#dbe7f3] bg-white px-3 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                  placeholder="Optional caption for display"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Tags</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5 mb-2">
                  {editForm.tags.map(tag => (
                    <TagPill key={tag} tag={tag} onRemove={() =>
                      setEditForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))
                    } />
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
                    className="flex-1 rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
                    placeholder="Add tag, press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="rounded-xl border border-[#dbe7f3] bg-white px-3 py-2 text-[12px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Info row */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#f0f4f8] bg-[#f8fafc] p-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">File Type</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-[#475569]">
                    <TypeBadge format={editItem.format} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">File Size</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-[#475569]">{formatBytes(editItem.size)}</div>
                </div>
                {editItem.width && editItem.height && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Dimensions</div>
                    <div className="mt-0.5 text-[12px] font-semibold text-[#475569]">{editItem.width} × {editItem.height}</div>
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Uploaded By</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-[#475569] truncate">{editItem.uploadedBy}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Uploaded On</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-[#475569]">{formatIST(editItem.createdAt)}</div>
                </div>
              </div>

              {/* Used In */}
              {editItem.usedIn.length > 0 && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8] mb-1">Used In</div>
                  <div className="flex flex-wrap gap-1.5">
                    {editItem.usedIn.map(u => (
                      <span key={u} className="rounded-full bg-[#f4f7fb] border border-[#e2eaf2] px-2 py-0.5 text-[11px] text-[#475569]">{u}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Copy Link */}
              <button
                type="button"
                onClick={() => copyUrl(editItem.secureUrl)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[12px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                Copy Link
              </button>

              {/* Internal details */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowInternal(v => !v)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94a3b8] hover:text-[#475569]"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`transition-transform ${showInternal ? "rotate-90" : ""}`}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  Internal Details
                </button>
                {showInternal && (
                  <div className="mt-2 rounded-xl border border-[#e2eaf2] bg-[#f8fafc] p-3 space-y-2">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Cloudinary ID</div>
                      <div className="mt-0.5 text-[11px] text-[#64748b] font-mono break-all">{editItem.publicId}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Cloudinary URL</div>
                      <div className="mt-0.5 text-[11px] text-[#64748b] font-mono break-all leading-4">{editItem.secureUrl}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {editError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-700">
                  {editError}
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="border-t border-[#e2eaf2] px-6 py-4 flex gap-3">
              <button
                onClick={saveEdit}
                disabled={savingEdit}
                className="flex-1 rounded-xl bg-[#1677f2] px-4 py-2.5 text-[13px] font-black text-white hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
              >
                {savingEdit ? "Saving…" : "Save Details"}
              </button>
              <button
                onClick={closeEdit}
                className="rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Remove confirm dialog ─────────────────────────────────────────── */}
      {removeId && (
        <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-black/30 backdrop-blur-sm"
             onClick={() => setRemoveId(null)}>
          <div className="rounded-2xl border border-[#e2eaf2] bg-white p-7 shadow-2xl max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="text-[15px] font-black text-[#0a1628] mb-2">Remove from Library?</div>
            <p className="text-[13px] text-[#475569] leading-5 mb-5">
              The file will be hidden from the Media Library. It will not be permanently deleted from Cloudinary.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmRemove}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-[13px] font-black text-white hover:bg-red-700 transition-colors"
              >
                Remove File
              </button>
              <button
                onClick={() => setRemoveId(null)}
                className="flex-1 rounded-xl border border-[#dbe7f3] bg-white px-4 py-2.5 text-[13px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
              >
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
            <h1 className="text-[21px] font-black text-[#0a1628]">Media Library</h1>
            <p className="mt-0.5 text-[13px] text-[#64748b]">
              Upload and manage images, icons and documents.
              {total > 0 && <span className="ml-1 font-semibold text-[#0a1628]">{total} file{total !== 1 ? "s" : ""}</span>}
            </p>
          </div>

          {canUpload && (
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1677f2] px-5 py-2.5 text-[13px] font-black text-white shadow-sm hover:bg-[#1265d8] disabled:opacity-60 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12"/>
                </svg>
                Upload File
              </button>
              <span className="text-[10px] text-[#94a3b8]">JPG, PNG, WebP, SVG, PDF · Max 10 MB</span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload error */}
        {uploadError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3.5 text-[13px] font-semibold text-red-700 flex items-start gap-3">
            <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{uploadError}</span>
            <button onClick={() => setUploadError("")} className="ml-auto shrink-0 text-red-400 hover:text-red-700">×</button>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type pills */}
          <div className="flex flex-wrap gap-1.5">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                onClick={() => { setTypeFilter(f.value); setPage(1); }}
                className={`rounded-xl border px-3.5 py-2 text-[12px] font-bold transition-colors ${
                  typeFilter === f.value
                    ? "border-[#1677f2] bg-[#1677f2] text-white"
                    : "border-[#dbe7f3] bg-white text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by file name, alt text or tag…"
              className="w-full rounded-xl border border-[#dbe7f3] bg-white py-2 pl-8 pr-3 text-[12px] text-[#0a1628] placeholder:text-[#94a3b8] focus:border-[#1677f2] focus:outline-none focus:ring-2 focus:ring-[#1677f2]/20"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]">×</button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex rounded-xl border border-[#dbe7f3] bg-white overflow-hidden">
            {(["grid", "list"] as ViewMode[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setViewMode(m)}
                className={`px-3 py-2 transition-colors ${
                  viewMode === m ? "bg-[#1677f2] text-white" : "text-[#94a3b8] hover:text-[#475569]"
                }`}
                title={m === "grid" ? "Grid view" : "List view"}
              >
                {m === "grid" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <svg className="h-6 w-6 animate-spin text-[#1677f2]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
            </svg>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe7f3] bg-white text-center">
            <svg className="mb-3 text-[#cbd5e1]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <div className="text-[14px] font-black text-[#0a1628] mb-1">
              {search || typeFilter !== "all" ? "No files match your search" : "No files yet"}
            </div>
            <div className="text-[12px] text-[#94a3b8]">
              {search || typeFilter !== "all" ? "Try a different search or filter." : "Upload your first file to get started."}
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ── Grid view ── */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {items.map(item => {
              const isImage = getMediaType(item.format) === "image";
              const isRemoving = removingId === item._id;
              return (
                <div
                  key={item._id}
                  className={`group rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_8px_rgba(10,22,40,0.04)] overflow-hidden flex flex-col transition-all hover:shadow-[0_4px_16px_rgba(10,22,40,0.09)] ${
                    isRemoving ? "opacity-40 pointer-events-none" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-[140px] overflow-hidden bg-[#f8fafc]">
                    {isImage ? (
                      <img
                        src={cloudinaryThumb(item.secureUrl)}
                        alt={item.altText || item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <TypeIcon format={item.format} className="w-full h-full" />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    {/* Type badge overlay */}
                    <div className="absolute top-2 left-2">
                      <TypeBadge format={item.format} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-3 py-2.5">
                    <div className="text-[12px] font-black text-[#0a1628] truncate leading-tight" title={item.title || item.fileName}>
                      {item.title || item.fileName}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-[#94a3b8]">
                      <span>{formatBytes(item.size)}</span>
                      <span>·</span>
                      <span>{formatIST(item.createdAt).split(",")[0]}</span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1 overflow-hidden max-h-[20px]">
                        {item.tags.slice(0, 2).map(t => (
                          <span key={t} className="rounded-full bg-[#f4f7fb] px-1.5 py-0.5 text-[9.5px] text-[#64748b]">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex border-t border-[#f0f4f8] divide-x divide-[#f0f4f8]">
                    <button
                      onClick={() => copyUrl(item.secureUrl)}
                      title="Copy Link"
                      className="flex-1 flex items-center justify-center py-2 text-[#94a3b8] hover:text-[#1677f2] hover:bg-[#f0f7ff] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                    </button>
                    {canEdit && (
                      <button
                        onClick={() => openEdit(item)}
                        title="Edit Details"
                        className="flex-1 flex items-center justify-center py-2 text-[#94a3b8] hover:text-[#1677f2] hover:bg-[#f0f7ff] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    )}
                    {canRemove && (
                      <button
                        onClick={() => setRemoveId(item._id)}
                        title="Remove"
                        className="flex-1 flex items-center justify-center py-2 text-[#94a3b8] hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── List view ── */
          <div className="rounded-2xl border border-[#e2eaf2] bg-white shadow-[0_2px_12px_rgba(10,22,40,0.05)] overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#f0f4f8] bg-[#f8fafc]">
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">File</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden sm:table-cell">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden md:table-cell">Size</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Uploaded By</th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#94a3b8] hidden lg:table-cell">Uploaded On</th>
                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4f7fb]">
                {items.map(item => {
                  const isImage    = getMediaType(item.format) === "image";
                  const isRemoving = removingId === item._id;
                  return (
                    <tr key={item._id} className={`hover:bg-[#fafcff] transition-colors ${isRemoving ? "opacity-40" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* Thumb */}
                          <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-[#e2eaf2] bg-[#f8fafc]">
                            {isImage ? (
                              <img src={cloudinaryThumb(item.secureUrl, 80, 80)} alt="" className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                              <TypeIcon format={item.format} className="w-full h-full" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-[#0a1628] truncate max-w-[180px]" title={item.title || item.fileName}>
                              {item.title || item.fileName}
                            </div>
                            <div className="text-[10.5px] text-[#94a3b8] truncate">{item.fileName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <TypeBadge format={item.format} />
                      </td>
                      <td className="px-4 py-3 text-[#64748b] hidden md:table-cell">{formatBytes(item.size)}</td>
                      <td className="px-4 py-3 text-[#64748b] truncate max-w-[140px] hidden lg:table-cell">{item.uploadedBy}</td>
                      <td className="px-4 py-3 text-[#64748b] hidden lg:table-cell">{formatIST(item.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => copyUrl(item.secureUrl)}
                            title="Copy Link"
                            className="flex items-center gap-1 rounded-xl border border-[#e2eaf2] bg-white px-2 py-1.5 text-[11px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                            Copy
                          </button>
                          {canEdit && (
                            <button
                              onClick={() => openEdit(item)}
                              title="Edit Details"
                              className="flex items-center gap-1 rounded-xl border border-[#e2eaf2] bg-white px-2 py-1.5 text-[11px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] transition-colors"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>
                          )}
                          {canRemove && (
                            <button
                              onClick={() => setRemoveId(item._id)}
                              title="Remove"
                              disabled={isRemoving}
                              className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                              </svg>
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-[12px] text-[#94a3b8]">
              Page {page} of {totalPages} · {total} total file{total !== 1 ? "s" : ""}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-xl border border-[#dbe7f3] bg-white px-3.5 py-2 text-[12px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-xl border border-[#dbe7f3] bg-white px-3.5 py-2 text-[12px] font-bold text-[#475569] hover:border-[#1677f2]/40 hover:text-[#1677f2] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
