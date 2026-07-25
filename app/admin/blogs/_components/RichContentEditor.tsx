"use client";

/**
 * RichContentEditor — TipTap WYSIWYG editor for blog content.
 *
 * Word image import flow (hardened):
 *   .docx → Mammoth convertImage → Cloudinary unsigned upload
 *   → Media Library API (awaited, explicit failure tracked)
 *   → permanent HTTPS URL inserted into TipTap
 *   → failed media records surfaced with retry option
 *   → cleanWordHtml() strips residual unsafe image src values
 *   → server-side sanitize-html runs on every save (defense-in-depth)
 *
 * Alt-text editing:
 *   Click any image → inline alt-editor panel appears → edit → Save
 *   Images with empty or placeholder alt text ("Imported image N") are
 *   counted and reported via onImageValidationChange for publish blocking.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { DOMParser as ProseDOMParser } from "@tiptap/pm/model";
import { cleanWordHtml, isWordHtml } from "./wordCleanup";
import { BlogImageExtension, type BlogImageAlignment, type BlogImageAttrs, type BlogImageSize } from "./BlogImageExtension";
import { MediaPickerModal, type PickedMediaImage } from "./MediaPickerModal";

// ── Cloudinary config (unsigned preset — no secret in browser) ────────────────

const CLOUDINARY_CLOUD  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// ── Alt-text constants ────────────────────────────────────────────────────────

/** Pattern for auto-generated placeholder alt text that needs human review. */
const PLACEHOLDER_ALT_RE = /^Imported image \d+$/i;

/** Parse editor HTML and count images with empty or placeholder alt text. */
function countUnresolvedAlts(html: string): number {
  if (typeof document === "undefined" || !html.includes("<img")) return 0;
  const div = document.createElement("div");
  div.innerHTML = html;
  let count = 0;
  div.querySelectorAll("img").forEach((img) => {
    const alt = (img.getAttribute("alt") ?? "").trim();
    if (!alt || PLACEHOLDER_ALT_RE.test(alt)) count++;
  });
  return count;
}

// ── Allowed MIME types for Word-embedded images ───────────────────────────────

const ALLOWED_IMAGE_MIMES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_SIZE_LABELS: Record<BlogImageSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  full: "Full",
  custom: "Custom",
};

const IMAGE_ALIGNMENT_LABELS: Record<BlogImageAlignment, string> = {
  left: "Left",
  center: "Centre",
  right: "Right",
};

// ── Types ─────────────────────────────────────────────────────────────────────

/** A Cloudinary upload that succeeded but whose Media Library record failed. */
interface FailedMediaRecord {
  imageIndex: number;
  filename: string;
  secureUrl: string;
  /** Full Cloudinary upload response — needed to rebuild the media record. */
  uploadData: Record<string, unknown>;
  mimeType: string;
  alt: string;
}

interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  url?: string;
  resourceType: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
}

export interface ImageValidationState {
  unresolvedAltCount: number;
  mediaSyncFailures: number;
}

interface Props {
  value: string;
  onChange: (html: string) => void;
  /**
   * Called whenever the counts of unresolved alt-text or media-sync failures
   * change. BlogEditorClient uses this to block the Publish button.
   */
  onImageValidationChange?: (state: ImageValidationState) => void;
}

// ── Toolbar button ────────────────────────────────────────────────────────────

function Btn({
  active, title, disabled, onClick, children,
}: {
  active?: boolean; title: string; disabled?: boolean;
  onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold leading-none transition-colors ${
        active
          ? "bg-[#1677f2] text-white"
          : "text-[#334155] hover:bg-[#1677f2] hover:text-white"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-[#dbe7f3] mx-1 shrink-0" />;
}

function cleanImageUrl(value: string): string {
  const url = value.trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function cleanLinkUrl(value: string): string {
  const url = value.trim();
  if (!url) return "";
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

// ── Link dialog ───────────────────────────────────────────────────────────────

function LinkDialog({
  current, onConfirm, onCancel,
}: {
  current: string; onConfirm: (url: string) => void; onCancel: () => void;
}) {
  const [url, setUrl] = useState(current || "https://");
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl border border-[#dbe7f3] shadow-xl p-6 w-[380px] max-w-[90vw]">
        <p className="text-[13px] font-bold text-[#0a1628] mb-3">Insert / Edit Link</p>
        <input
          autoFocus
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); onConfirm(url); }
            if (e.key === "Escape") onCancel();
          }}
          placeholder="https://…"
          className="w-full rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] text-[#0a1628] outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/12 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl border border-[#dbe7f3] text-[12.5px] font-semibold text-[#64748b] hover:bg-[#f8fbff]">
            Cancel
          </button>
          {current && (
            <button type="button" onClick={() => onConfirm("")} className="px-4 py-2 rounded-xl border border-red-200 text-[12.5px] font-semibold text-red-500 hover:bg-red-50">
              Remove
            </button>
          )}
          <button type="button" onClick={() => onConfirm(url)} className="px-4 py-2 rounded-xl bg-[#1677f2] text-white text-[12.5px] font-bold hover:bg-[#0077B6]">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogImageDialog({
  open,
  uploading,
  onUpload,
  onPick,
  onCancel,
  onInsert,
}: {
  open: boolean;
  uploading: boolean;
  onUpload: (file: File) => Promise<Partial<BlogImageAttrs> & { src: string }>;
  onPick: () => void;
  onCancel: () => void;
  onInsert: (attrs: Partial<BlogImageAttrs> & { src: string }) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [attrs, setAttrs] = useState<Partial<BlogImageAttrs> & { src: string }>({
    src: "",
    alt: "",
    caption: "",
    size: "medium",
    alignment: "center",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setAttrs({ src: "", alt: "", caption: "", size: "medium", alignment: "center" });
    setError("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const canInsert = Boolean(attrs.src && attrs.alt?.trim());

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#06101f]/55 px-4 py-6" role="dialog" aria-modal="true" aria-label="Add image">
      <div className="w-full max-w-xl rounded-2xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] p-5 shadow-[0_24px_70px_rgba(6,16,31,0.32)]">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[14px] font-black text-[#0a1628] dark:text-[#f7f9fc]">Add Image</p>
            <p className="mt-1 text-[12px] text-[#64748b] dark:text-[#a9b6c9]">Images stay inside the article flow and remain responsive.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-lg px-2 py-1 text-[12px] font-bold text-[#64748b] hover:text-[#1677f2]">Close</button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              setError("");
              onUpload(file)
                .then((uploaded) => setAttrs((current) => ({
                  ...current,
                  ...uploaded,
                  alt: current.alt?.trim() ? current.alt : uploaded.alt,
                  caption: current.caption ?? uploaded.caption ?? "",
                })))
                .catch((err) => setError(err instanceof Error ? err.message : "Image upload failed."));
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="rounded-xl border border-[#1677f2]/40 bg-[#f0faff] px-4 py-3 text-[13px] font-bold text-[#1677f2] hover:border-[#1677f2] disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload New"}
          </button>
          <button
            type="button"
            onClick={onPick}
            className="rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[#12223a] px-4 py-3 text-[13px] font-bold text-[#334155] dark:text-[#dbeafe] hover:border-[#1677f2] hover:text-[#1677f2]"
          >
            Choose from Media Library
          </button>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-[12px] font-bold text-[#334155] dark:text-[#dbeafe]">Image URL</label>
          <input
            type="url"
            value={attrs.src}
            onChange={(e) => setAttrs((current) => ({ ...current, src: e.target.value }))}
            placeholder="Upload or choose an image"
            className="w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
          />
        </div>

        {attrs.src && (
          <div className="mt-3 overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-[#f8fbff] dark:bg-[#12223a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={attrs.src} alt="" className="max-h-48 w-full object-contain" />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-[#334155] dark:text-[#dbeafe]">Alt text</label>
            <input
              type="text"
              value={attrs.alt ?? ""}
              onChange={(e) => setAttrs((current) => ({ ...current, alt: e.target.value }))}
              placeholder="Describe the image"
              className="w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-[#334155] dark:text-[#dbeafe]">Caption</label>
            <input
              type="text"
              value={attrs.caption ?? ""}
              onChange={(e) => setAttrs((current) => ({ ...current, caption: e.target.value }))}
              placeholder="Optional"
              className="w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-[12px] font-bold text-[#334155] dark:text-[#dbeafe]">Optional link</label>
          <input
            type="text"
            value={attrs.linkUrl ?? ""}
            onChange={(e) => setAttrs((current) => ({ ...current, linkUrl: e.target.value }))}
            placeholder="/services or https://..."
            className="w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
          />
        </div>

        {error && <p className="mt-3 text-[12px] font-semibold text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-xl border border-[#dbe7f3] dark:border-[#223550] px-4 py-2 text-[12px] font-bold text-[#64748b] dark:text-[#a9b6c9]">Cancel</button>
          <button
            type="button"
            disabled={!canInsert}
            onClick={() => {
              const safeSrc = cleanImageUrl(attrs.src);
              const safeLink = cleanLinkUrl(attrs.linkUrl ?? "");
              if (!safeSrc) {
                setError("Use a secure HTTPS image.");
                return;
              }
              onInsert({ ...attrs, src: safeSrc, linkUrl: safeLink, openInNewTab: Boolean(safeLink && !safeLink.startsWith("/")) });
            }}
            className="rounded-xl bg-[#1677f2] px-5 py-2 text-[12px] font-black text-white hover:bg-[#0866d9] disabled:opacity-40"
          >
            Insert at Cursor
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────

export default function RichContentEditor({ value, onChange, onImageValidationChange }: Props) {
  const wordFileRef  = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const [showHtml, setShowHtml]         = useState(false);
  const [linkOpen, setLinkOpen]         = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [pendingImageInsertPos, setPendingImageInsertPos] = useState<number | null>(null);
  // ── Word import state ───────────────────────────────────────────────────────
  const [importStatus, setImportStatus]         = useState<string | null>(null);
  const [failedMediaRecords, setFailedMediaRecords] = useState<FailedMediaRecord[]>([]);
  const [isRetrying, setIsRetrying]             = useState(false);
  const [mediaSyncSucceeded, setMediaSyncSucceeded] = useState(false);

  // ── Direct image upload state ───────────────────────────────────────────────
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // ── Toast notifications (fixed-position, always visible regardless of scroll) ─
  type ToastKind = "info" | "success" | "warning" | "error";
  interface Toast { id: number; kind: ToastKind; message: string; }
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const addToast = useCallback((kind: ToastKind, message: string, durationMs = 5000) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, kind, message }]);
    if (durationMs > 0) setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), durationMs);
    return id;
  }, []);
  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  // ── Alt text state ──────────────────────────────────────────────────────────
  const [unresolvedAltCount, setUnresolvedAltCount] = useState(0);
  // Prevents the alt panel from re-opening immediately after the user clicks Save.
  const altSavingRef = useRef(false);

  // ── Alt editor panel state ──────────────────────────────────────────────────
  const [altPanelOpen, setAltPanelOpen] = useState(false);
  const [altEditValue, setAltEditValue] = useState("");
  const [captionEditValue, setCaptionEditValue] = useState("");
  const [linkEditValue, setLinkEditValue] = useState("");
  const [customWidthValue, setCustomWidthValue] = useState("640");

  // ── Stable refs ─────────────────────────────────────────────────────────────
  const onChangeRef               = useRef(onChange);
  const onImageValidationRef      = useRef(onImageValidationChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onImageValidationRef.current = onImageValidationChange; }, [onImageValidationChange]);

  // ── Notify parent of validation state changes ────────────────────────────────
  useEffect(() => {
    onImageValidationRef.current?.({
      unresolvedAltCount,
      mediaSyncFailures: failedMediaRecords.length,
    });
  }, [unresolvedAltCount, failedMediaRecords]);

  const saveMediaRecord = useCallback(async (
    uploadData: CloudinaryUploadResult,
    fileName: string,
    mimeType: string,
    alt: string,
    tags: string[]
  ) => {
    const mediaRes = await fetch("/api/admin/media", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicId:         uploadData.publicId,
        secureUrl:        uploadData.secureUrl,
        url:              uploadData.url ?? uploadData.secureUrl,
        resourceType:     uploadData.resourceType,
        format:           uploadData.format,
        bytes:            uploadData.bytes,
        width:            uploadData.width,
        height:           uploadData.height,
        originalFilename: fileName,
        mimeType,
        altText:          alt,
        tags,
      }),
    });
    if (!mediaRes.ok) throw new Error(`Media Library save failed (${mediaRes.status})`);
  }, []);

  const uploadImageToCloudinary = useCallback(async (file: File): Promise<CloudinaryUploadResult> => {
    const cloudinaryReady = Boolean(CLOUDINARY_CLOUD && CLOUDINARY_PRESET);
    if (!cloudinaryReady) throw new Error("Cloudinary is not configured.");
    if (!ALLOWED_IMAGE_MIMES.has(file.type)) throw new Error("Use a JPG, PNG or WebP image.");
    if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be 10 MB or smaller.");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_PRESET as string);

    const uploadRes  = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
      { method: "POST", body: fd }
    );
    const uploadData = await uploadRes.json() as Record<string, unknown>;
    if (!uploadRes.ok || typeof uploadData.secure_url !== "string") {
      throw new Error(`Image upload failed (${uploadRes.status}).`);
    }
    return {
      secureUrl: String(uploadData.secure_url),
      publicId: String(uploadData.public_id ?? ""),
      url: typeof uploadData.url === "string" ? uploadData.url : undefined,
      resourceType: String(uploadData.resource_type ?? "image"),
      format: String(uploadData.format ?? file.type.split("/")[1] ?? ""),
      bytes: Number(uploadData.bytes ?? file.size),
      width: uploadData.width != null ? Number(uploadData.width) : undefined,
      height: uploadData.height != null ? Number(uploadData.height) : undefined,
    };
  }, []);

  const buildAttrsFromUpload = useCallback(async (file: File, tags: string[]) => {
    const uploadData = await uploadImageToCloudinary(file);
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").trim() || "Blog image";
    await saveMediaRecord(uploadData, file.name, file.type, alt, tags);
    return {
      src: uploadData.secureUrl,
      publicId: uploadData.publicId,
      alt,
      widthOriginal: uploadData.width,
      heightOriginal: uploadData.height,
      size: "medium" as BlogImageSize,
      alignment: "center" as BlogImageAlignment,
    };
  }, [saveMediaRecord, uploadImageToCloudinary]);

  // ── Editor ──────────────────────────────────────────────────────────────────
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        codeBlock: false,
        code: false,
      }),
      BlogImageExtension,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class: "rich-editor-prose outline-none min-h-[420px] px-4 py-4 text-[14px] leading-relaxed text-[#0a1628]",
      },

      handlePaste(view, event) {
        const html = event.clipboardData?.getData("text/html") ?? "";
        if (!html || !isWordHtml(html)) return false;
        event.preventDefault();
        const cleaned = cleanWordHtml(html);
        const dom = document.createElement("div");
        dom.innerHTML = cleaned;
        const parser = ProseDOMParser.fromSchema(view.state.schema);
        const slice  = parser.parseSlice(dom);
        view.dispatch(view.state.tr.replaceSelection(slice));
        addToast("info", "Word content detected and cleaned automatically.", 3500);
        return true;
      },
    },

    onUpdate({ editor: e }) {
      const html = e.getHTML();
      onChangeRef.current(html);
      setUnresolvedAltCount(countUnresolvedAlts(html));
    },

    onSelectionUpdate({ editor: e }) {
      if (e.isActive("blogImage")) {
        // Don't re-open immediately after the user saves an alt (brief cooldown)
        if (!altSavingRef.current) {
          const attrs = e.getAttributes("blogImage") as Record<string, unknown>;
          setAltEditValue(String(attrs.alt ?? ""));
          setCaptionEditValue(String(attrs.caption ?? ""));
          setLinkEditValue(String(attrs.linkUrl ?? ""));
          setCustomWidthValue(String(attrs.width ?? "640"));
          setAltPanelOpen(true);
        }
      } else {
        setAltPanelOpen(false);
      }
    },
  });

  const insertBlogImage = useCallback((attrs: Partial<BlogImageAttrs> & { src: string }) => {
    if (!editor) return;
    const insertAt = pendingImageInsertPos;
    const payload = {
      ...attrs,
      linkUrl: cleanLinkUrl(attrs.linkUrl ?? ""),
      width: attrs.size === "custom" ? Math.min(960, Math.max(160, Number(attrs.width ?? 640))) : undefined,
    };
    if (insertAt != null) {
      editor.chain().focus().insertContentAt(insertAt, { type: "blogImage", attrs: payload }).run();
    } else {
      editor.chain().focus().setBlogImage(payload).run();
    }
    setPendingImageInsertPos(null);
    setImageDialogOpen(false);
    setUnresolvedAltCount(countUnresolvedAlts(editor.getHTML()));
  }, [editor, pendingImageInsertPos]);

  const applyPickedMediaToDialog = useCallback((image: PickedMediaImage) => {
    insertBlogImage({
      src: image.secureUrl,
      publicId: image.publicId,
      alt: image.altText || image.title || image.fileName || "Blog image",
      caption: image.caption || "",
      widthOriginal: image.width,
      heightOriginal: image.height,
      size: "medium",
      alignment: "center",
    });
  }, [insertBlogImage]);

  const updateSelectedBlogImage = useCallback((attrs: Partial<BlogImageAttrs>) => {
    if (!editor) return;
    editor.chain().focus().updateBlogImage(attrs).run();
    setUnresolvedAltCount(countUnresolvedAlts(editor.getHTML()));
  }, [editor]);

  // Initial alt-text scan when editor first becomes available (catches existing blogs)
  useEffect(() => {
    if (!editor) return;
    setUnresolvedAltCount(countUnresolvedAlts(editor.getHTML()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Sync external value changes (e.g. loading an existing blog)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (current !== value && value !== undefined) {
      editor.commands.setContent(value || "", { emitUpdate: false });
      setUnresolvedAltCount(countUnresolvedAlts(value || ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  // ── Alt editor: Save ────────────────────────────────────────────────────────
  const handleAltSave = useCallback(() => {
    if (!editor) return;
    const newAlt = altEditValue.trim();
    if (!newAlt) return;
    altSavingRef.current = true;
    setAltPanelOpen(false);
    editor.chain().updateBlogImage({ alt: newAlt }).blur().run();
    setTimeout(() => { altSavingRef.current = false; }, 200);
  }, [editor, altEditValue]);

  const handleAltCancel = useCallback(() => {
    setAltPanelOpen(false);
    editor?.commands.blur();
  }, [editor]);

  // ── Import .docx with explicit Media Library recording ──────────────────────
  const handleWordFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      e.target.value = "";

      setImportStatus("Reading Word file…");
      setFailedMediaRecords([]);
      setMediaSyncSucceeded(false);

      let imageIndex       = 0;
      let cloudinaryFailed = 0;
      let mediaSuccess     = 0;
      const mediaFailedNew: FailedMediaRecord[] = [];
      const cloudinaryReady = Boolean(CLOUDINARY_CLOUD && CLOUDINARY_PRESET);

      try {
        const mammoth    = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();

        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            convertImage: mammoth.images.imgElement(async (image) => {
              imageIndex++;
              setImportStatus(`Uploading image ${imageIndex}…`);

              try {
                const mimeType = (image.contentType || "image/png").toLowerCase();

                if (!ALLOWED_IMAGE_MIMES.has(mimeType) || !cloudinaryReady) {
                  cloudinaryFailed++;
                  return { src: "", alt: "Image could not be imported" };
                }

                const base64    = await image.readAsBase64String();
                const byteChars = atob(base64);
                const byteArr   = new Uint8Array(byteChars.length);
                for (let i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
                const blob = new Blob([byteArr], { type: mimeType });

                if (blob.size > 10 * 1024 * 1024) {
                  cloudinaryFailed++;
                  return { src: "", alt: "Image could not be imported (exceeds 10 MB)" };
                }

                const ext        = mimeType.split("/")[1].replace("jpeg", "jpg");
                const uploadFile = new File([blob], `word-image-${imageIndex}.${ext}`, { type: mimeType });

                // Upload to Cloudinary (unsigned preset — no API secret in browser)
                const fd = new FormData();
                fd.append("file", uploadFile);
                fd.append("upload_preset", CLOUDINARY_PRESET as string);

                const uploadRes  = await fetch(
                  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
                  { method: "POST", body: fd }
                );
                const uploadData = await uploadRes.json() as Record<string, unknown>;

                if (!uploadRes.ok || typeof uploadData.secure_url !== "string") {
                  cloudinaryFailed++;
                  return { src: "", alt: "Image could not be imported" };
                }

                const secureUrl = uploadData.secure_url as string;

                // Alt text: use Word-provided value, else numbered placeholder
                const imageAsAny = image as unknown as Record<string, unknown>;
                const wordAlt    = typeof imageAsAny.altText === "string"
                  ? (imageAsAny.altText as string).trim()
                  : "";
                const alt = wordAlt || `Imported image ${imageIndex}`;

                // Record in Media Library — awaited, failure tracked explicitly
                setImportStatus(`Saving image ${imageIndex} to Media Library…`);
                try {
                  const mediaRes = await fetch("/api/admin/media", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      publicId:         uploadData.public_id,
                      secureUrl,
                      url:              uploadData.url ?? secureUrl,
                      resourceType:     uploadData.resource_type ?? "image",
                      format:           uploadData.format ?? ext,
                      bytes:            uploadData.bytes,
                      width:            uploadData.width,
                      height:           uploadData.height,
                      originalFilename: uploadFile.name,
                      mimeType,
                      altText:          alt,
                      tags:             ["word_import"],
                    }),
                  });
                  if (!mediaRes.ok) throw new Error(`HTTP ${mediaRes.status}`);
                  mediaSuccess++;
                } catch {
                  // Upload succeeded but Media Library record failed — track for retry
                  mediaFailedNew.push({
                    imageIndex,
                    filename:   uploadFile.name,
                    secureUrl,
                    uploadData,
                    mimeType,
                    alt,
                  });
                }

                return { src: secureUrl, alt };
              } catch {
                cloudinaryFailed++;
                return { src: "", alt: "Image could not be imported" };
              }
            }),
          }
        );

        const cleaned = cleanWordHtml(result.value);
        editor.commands.setContent(cleaned, { emitUpdate: true });
        onChangeRef.current(editor.getHTML());

        const totalCloudinaryOk = imageIndex - cloudinaryFailed;

        // Store failed media records for retry
        setFailedMediaRecords(mediaFailedNew);

        // Post-import UI summary
        if (cloudinaryFailed > 0) {
          addToast("warning", `Word import: ${cloudinaryFailed} image${cloudinaryFailed !== 1 ? "s" : ""} failed to upload to Cloudinary.`);
        }

        if (mediaFailedNew.length === 0 && totalCloudinaryOk > 0) {
          addToast("success", `Word import complete — ${totalCloudinaryOk} image${totalCloudinaryOk !== 1 ? "s" : ""} uploaded and added to Media Library.`, 5000);
        }

      } catch (err) {
        console.error("[RichContentEditor] Mammoth import failed:", err);
        alert("Could not read the Word file. Please try copy-pasting instead.");
      } finally {
        setImportStatus(null);
      }
    },
    [editor]
  );

  // ── Media Library retry ─────────────────────────────────────────────────────
  const handleMediaRetry = useCallback(async () => {
    setIsRetrying(true);
    const remaining: FailedMediaRecord[] = [];

    for (const record of failedMediaRecords) {
      const ext = record.mimeType.split("/")[1].replace("jpeg", "jpg");
      try {
        const mediaRes = await fetch("/api/admin/media", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId:         record.uploadData.public_id,
            secureUrl:        record.secureUrl,
            url:              record.uploadData.url ?? record.secureUrl,
            resourceType:     record.uploadData.resource_type ?? "image",
            format:           record.uploadData.format ?? ext,
            bytes:            record.uploadData.bytes,
            width:            record.uploadData.width,
            height:           record.uploadData.height,
            originalFilename: record.filename,
            mimeType:         record.mimeType,
            altText:          record.alt,
            tags:             ["word_import"],
          }),
        });
        if (!mediaRes.ok) throw new Error(`HTTP ${mediaRes.status}`);
      } catch {
        remaining.push(record);
      }
    }

    setFailedMediaRecords(remaining);
    setIsRetrying(false);

    if (remaining.length === 0) {
      setMediaSyncSucceeded(true);
      setTimeout(() => setMediaSyncSucceeded(false), 4000);
    }
  }, [failedMediaRecords]);

  // ── Replace selected image from upload ──────────────────────────────────────
  const handleImageFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      e.target.value = "";

      setIsUploadingImage(true);
      const uploadingId = addToast("info", `Uploading ${file.name}...`, 0);
      try {
        const attrs = await buildAttrsFromUpload(file, ["blog_inline", "direct_upload"]);
        updateSelectedBlogImage({
          src: attrs.src,
          publicId: attrs.publicId,
          alt: attrs.alt,
          widthOriginal: attrs.widthOriginal,
          heightOriginal: attrs.heightOriginal,
        });
        removeToast(uploadingId);
        addToast("success", `Image "${file.name}" uploaded and replaced.`);
      } catch (err) {
        removeToast(uploadingId);
        addToast("error", err instanceof Error ? err.message : "Image upload failed.");
        console.error("[RichContentEditor] direct image upload failed:", err);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [editor, addToast, buildAttrsFromUpload, removeToast, updateSelectedBlogImage]
  );

  // ── Link handling ────────────────────────────────────────────────────────────
  const handleLinkConfirm = useCallback(
    (url: string) => {
      setLinkOpen(false);
      if (!editor) return;
      if (!url) { editor.chain().focus().unsetLink().run(); return; }
      editor.chain().focus().setLink({ href: url }).run();
    },
    [editor]
  );

  const currentLink = editor?.isActive("link")
    ? (editor.getAttributes("link").href as string) ?? ""
    : "";

  // ── Word count ───────────────────────────────────────────────────────────────
  const rawText  = editor?.getText() ?? "";
  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editor?.getHTML().length ?? 0;

  if (!editor) return null;

  // ── Banner helpers ───────────────────────────────────────────────────────────
  const mediaSyncFailCount = failedMediaRecords.length;
  const isImporting        = importStatus !== null;

  return (
    <>
      {/*
        overflow-hidden intentionally omitted — it would break position:sticky
        on the toolbar. Rounded corners are applied per-child instead.
      */}
      <div className="rounded-xl border border-[#dbe7f3] focus-within:border-[#1677f2] focus-within:ring-2 focus-within:ring-[#1677f2]/12 transition-all">

        {/* ── Toolbar (sticky) ─────────────────────────────────────────────── */}
        {/* Keep the 60px sticky offset aligned with the BlogEditorClient ActionBar height. */}
        <div className="sticky top-[60px] z-30 rounded-t-xl border-b border-[#e8f0f8] bg-[#f8fbff] shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-0 p-2">

            <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
              {/* Formatting */}
              <Btn title="Bold"      active={editor.isActive("bold")}      onClick={() => editor.chain().focus().toggleBold().run()}>B</Btn>
              <Btn title="Italic"    active={editor.isActive("italic")}    onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></Btn>
              <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
              <Divider />
              {/* Headings */}
              <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
              <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
              <Btn title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>H4</Btn>
              <Divider />
              {/* Lists */}
              <Btn title="Bullet List"   active={editor.isActive("bulletList")}  onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
              <Btn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
              <Divider />
              {/* Block elements */}
              <Btn title="Blockquote / Callout" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</Btn>
              <Btn title="Insert / Edit Link"   active={editor.isActive("link")}       onClick={() => setLinkOpen(true)}>🔗 Link</Btn>
              <Divider />
              {/* Table */}
              <Btn title="Insert Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</Btn>
              {editor.isActive("table") && (
                <>
                  <Btn title="Add column after" onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</Btn>
                  <Btn title="Add row after"    onClick={() => editor.chain().focus().addRowAfter().run()}>+Row</Btn>
                  <Btn title="Delete table"     onClick={() => editor.chain().focus().deleteTable().run()}>✕Tbl</Btn>
                </>
              )}
              <Divider />
              {/* Add Image */}
              <button
                type="button"
                title="Add an image"
                disabled={isImporting || isUploadingImage}
                onClick={() => {
                  setPendingImageInsertPos(editor.state.selection.from);
                  setImageDialogOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-[#1677f2] border border-[#1677f2]/30 hover:bg-[#1677f2] hover:text-white hover:border-[#1677f2] transition-colors leading-none shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Image
              </button>
              {/* Import Word */}
              <button
                type="button"
                title="Import from Word .docx file"
                disabled={isImporting || isUploadingImage}
                onClick={() => wordFileRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-[#1677f2] border border-[#1677f2]/30 hover:bg-[#1677f2] hover:text-white hover:border-[#1677f2] transition-colors leading-none shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isImporting ? "Importing…" : "📄 Import Word"}
              </button>
            </div>

            {/* HTML source toggle — pinned right */}
            <div className="shrink-0 border-l border-[#dbe7f3] pl-2 ml-1">
              <button
                type="button"
                title="View raw HTML output"
                onClick={() => setShowHtml((s) => !s)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold leading-none transition-colors ${
                  showHtml ? "bg-[#0a1628] text-white" : "text-[#94a3b8] hover:text-[#334155]"
                }`}
              >
                {"</>"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Selected image controls ───────────────────────────────────────── */}
        {altPanelOpen && (
          <div className="space-y-2 border-b border-[#c7d9f5] dark:border-[#223550] bg-[#f0f7ff] dark:bg-[#12223a] px-4 py-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[11px] font-black uppercase tracking-wide text-[#1677f2]">Image</span>
              {(Object.keys(IMAGE_SIZE_LABELS) as BlogImageSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateSelectedBlogImage({
                    size,
                    ...(size === "custom" ? { width: Math.min(960, Math.max(160, Number(customWidthValue) || 640)) } : { width: undefined }),
                  })}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${editor.isActive("blogImage", { size }) ? "bg-[#1677f2] text-white" : "bg-white dark:bg-[#0d1a2d] text-[#334155] dark:text-[#dbeafe] hover:text-[#1677f2]"}`}
                >
                  {IMAGE_SIZE_LABELS[size]}
                </button>
              ))}
              {(Object.keys(IMAGE_ALIGNMENT_LABELS) as BlogImageAlignment[]).map((alignment) => (
                <button
                  key={alignment}
                  type="button"
                  onClick={() => updateSelectedBlogImage({ alignment })}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${editor.isActive("blogImage", { alignment }) ? "bg-[#0a1628] text-white" : "bg-white dark:bg-[#0d1a2d] text-[#334155] dark:text-[#dbeafe] hover:text-[#1677f2]"}`}
                >
                  {IMAGE_ALIGNMENT_LABELS[alignment]}
                </button>
              ))}
              <input
                type="number"
                min={160}
                max={960}
                value={customWidthValue}
                onChange={(e) => setCustomWidthValue(e.target.value)}
                onBlur={() => updateSelectedBlogImage({ size: "custom", width: Math.min(960, Math.max(160, Number(customWidthValue) || 640)) })}
                aria-label="Custom image width"
                className="h-7 w-20 rounded-lg border border-[#c7d9f5] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-2 text-[11px] text-[#0a1628] dark:text-[#f7f9fc]"
              />
              <button type="button" onClick={() => imageFileRef.current?.click()} className="rounded-lg bg-white dark:bg-[#0d1a2d] px-2.5 py-1 text-[11px] font-bold text-[#334155] dark:text-[#dbeafe] hover:text-[#1677f2]">Replace</button>
              <button type="button" onClick={() => editor.chain().focus().deleteSelection().run()} className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-red-500 hover:bg-red-50">Delete</button>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
              <input
                type="text"
                value={altEditValue}
                onChange={(e) => setAltEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); handleAltSave(); }
                  if (e.key === "Escape") handleAltCancel();
                }}
                placeholder="Alt text"
                aria-label="Image alt text"
                className="min-w-0 rounded-lg border border-[#c7d9f5] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-2.5 py-1.5 text-[12px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
              />
              <input
                type="text"
                value={captionEditValue}
                onChange={(e) => setCaptionEditValue(e.target.value)}
                placeholder="Caption"
                aria-label="Image caption"
                className="min-w-0 rounded-lg border border-[#c7d9f5] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-2.5 py-1.5 text-[12px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
              />
              <input
                type="text"
                value={linkEditValue}
                onChange={(e) => setLinkEditValue(e.target.value)}
                placeholder="/services or https://..."
                aria-label="Image link"
                className="min-w-0 rounded-lg border border-[#c7d9f5] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-2.5 py-1.5 text-[12px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2]"
              />
              <button
                type="button"
                onClick={() => {
                  const safeLink = cleanLinkUrl(linkEditValue);
                  updateSelectedBlogImage({
                    alt: altEditValue.trim(),
                    caption: captionEditValue.trim(),
                    linkUrl: safeLink,
                    openInNewTab: Boolean(safeLink && !safeLink.startsWith("/")),
                  });
                  handleAltSave();
                }}
                disabled={!altEditValue.trim()}
                className="rounded-lg bg-[#1677f2] px-3 py-1.5 text-[11.5px] font-bold text-white hover:bg-[#0866d9] disabled:opacity-40"
              >
                Save
              </button>
              <button type="button" onClick={handleAltCancel} className="rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-[#64748b] dark:text-[#a9b6c9] hover:text-[#0a1628] dark:hover:text-white">
                Done
              </button>
            </div>
            {PLACEHOLDER_ALT_RE.test(altEditValue.trim()) && (
              <p className="text-[11px] font-semibold text-amber-600">Placeholder alt text needs a clear description before publishing.</p>
            )}
          </div>
        )}

        {/* ── Word import progress (spinner — inline so it's in-context) ──────── */}
        {importStatus && (
          <div className="flex items-center gap-2 border-b border-[#1677f2]/20 bg-[#1677f2] px-4 py-2.5 text-[12px] font-bold text-white">
            <svg className="h-3.5 w-3.5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
            <span>{importStatus}</span>
          </div>
        )}

        {/* ── Media Library sync failure (inline — below toolbar, always rendered) ── */}
        {mediaSyncFailCount > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-orange-400 bg-orange-500 px-4 py-2.5 text-[12px] font-bold text-white">
            <span>
              ⚠ {mediaSyncFailCount} image{mediaSyncFailCount > 1 ? "s were" : " was"} uploaded but could not be saved to Media Library.
              {" "}The image{mediaSyncFailCount > 1 ? "s are" : " is"} in the editor but not tracked.
            </span>
            <button
              type="button"
              onClick={handleMediaRetry}
              disabled={isRetrying}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-white text-orange-600 text-[11px] font-black hover:bg-orange-50 disabled:opacity-60 transition-colors"
            >
              {isRetrying ? "Syncing…" : "Retry Sync"}
            </button>
          </div>
        )}

        {/* ── Editor / HTML view ────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0d1a2d]">
          {showHtml ? (
            <textarea
              readOnly
              value={editor.getHTML()}
              rows={20}
              className="w-full px-4 py-3 text-[12px] font-mono text-[#334155] resize-y outline-none bg-[#f8fbff] min-h-[420px]"
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-b-xl border-t border-[#e8f0f8] bg-[#f8fbff] px-3 py-1.5 text-[11px] text-[#94a3b8]">
          <span>
            {wordCount} {wordCount === 1 ? "word" : "words"} · ~{Math.max(1, Math.ceil(wordCount / 238))} min read
          </span>
          <span>{charCount} chars HTML</span>
        </div>
      </div>

      {/* ── Hidden image file input ──────────────────────────────────────── */}
      <input
        ref={imageFileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleImageFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* ── Hidden .docx file input ───────────────────────────────────────── */}
      <input
        ref={wordFileRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleWordFile}
        className="hidden"
        aria-hidden="true"
      />

      {/* ── Link dialog ───────────────────────────────────────────────────── */}
      {linkOpen && (
        <LinkDialog
          current={currentLink}
          onConfirm={handleLinkConfirm}
          onCancel={() => setLinkOpen(false)}
        />
      )}

      <BlogImageDialog
        open={imageDialogOpen}
        uploading={isUploadingImage}
        onUpload={async (file) => {
          setIsUploadingImage(true);
          try {
            return await buildAttrsFromUpload(file, ["blog_inline"]);
          } finally {
            setIsUploadingImage(false);
          }
        }}
        onPick={() => setMediaPickerOpen(true)}
        onCancel={() => {
          setImageDialogOpen(false);
          setPendingImageInsertPos(null);
        }}
        onInsert={insertBlogImage}
      />

      <MediaPickerModal
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={applyPickedMediaToDialog}
      />

      {/* ── Fixed-position toast notifications (always visible regardless of scroll) ── */}
      {toasts.length > 0 && (
        <div className="fixed top-20 right-4 z-[99999] flex flex-col gap-2 w-[340px] max-w-[calc(100vw-2rem)] pointer-events-none">
          {toasts.map(toast => {
            const colors: Record<string, string> = {
              info:    "bg-[#1677f2] text-white",
              success: "bg-emerald-600 text-white",
              warning: "bg-amber-500 text-white",
              error:   "bg-red-600 text-white",
            };
            return (
              <div
                key={toast.id}
                className={`flex items-start justify-between gap-3 rounded-xl px-4 py-3 shadow-xl text-[12.5px] font-bold pointer-events-auto ${colors[toast.kind]}`}
              >
                <span className="flex-1 leading-snug">{toast.message}</span>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-white/70 hover:text-white text-[16px] leading-none"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ProseMirror prose styles ──────────────────────────────────────── */}
      <style>{`
        .rich-editor-prose h2 { font-size: 18px; font-weight: 900; color: #0a1628; margin: 1.75rem 0 0.75rem; border-bottom: 2px solid #e0f2fe; padding-bottom: 0.4rem; }
        .rich-editor-prose h3 { font-size: 15px; font-weight: 800; color: #0a1628; margin: 1.4rem 0 0.5rem; }
        .rich-editor-prose h4 { font-size: 13.5px; font-weight: 700; color: #334155; margin: 1.2rem 0 0.4rem; }
        .rich-editor-prose p  { margin-bottom: 0.9rem; color: #334155; line-height: 1.8; }
        .rich-editor-prose ul { list-style: disc; padding-left: 1.4rem; margin-bottom: 0.9rem; }
        .rich-editor-prose ol { list-style: decimal; padding-left: 1.4rem; margin-bottom: 0.9rem; }
        .rich-editor-prose li { margin-bottom: 0.3rem; color: #475569; line-height: 1.7; }
        .rich-editor-prose a  { color: #1677f2; text-decoration: underline; text-underline-offset: 2px; }
        .rich-editor-prose blockquote { border-left: 4px solid #d9a938; background: #fffbf0; padding: 0.9rem 1.2rem; border-radius: 0 10px 10px 0; margin: 1.25rem 0; font-style: italic; color: #5a4a1c; }
        .rich-editor-prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 13px; }
        .rich-editor-prose th { background: #0a1628; color: #fff; padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
        .rich-editor-prose td { padding: 8px 12px; border-bottom: 1px solid #e8f0fa; color: #334155; vertical-align: top; }
        .rich-editor-prose tr:nth-child(even) td { background: #f8faff; }
        .rich-editor-prose strong, .rich-editor-prose b { font-weight: 700; color: #0a1628; }
        .rich-editor-prose em, .rich-editor-prose i { font-style: italic; }
        .rich-editor-prose u { text-decoration: underline; text-underline-offset: 2px; }
        .rich-editor-prose .blog-image { clear: both; margin: 1.5rem auto; max-width: 100%; }
        .rich-editor-prose .blog-image a { display: block; }
        .rich-editor-prose .blog-image img { display: block; width: 100%; max-width: 100%; height: auto; border-radius: 10px; margin: 0; cursor: pointer; }
        .rich-editor-prose .blog-image figcaption { margin-top: 0.45rem; text-align: center; font-size: 12px; line-height: 1.5; color: #64748b; font-style: italic; }
        .rich-editor-prose .blog-image--small { width: min(380px, 100%); }
        .rich-editor-prose .blog-image--medium { width: min(640px, 100%); }
        .rich-editor-prose .blog-image--large { width: min(920px, 100%); }
        .rich-editor-prose .blog-image--full { width: 100%; }
        .rich-editor-prose .blog-image--custom { max-width: 100%; }
        .rich-editor-prose .blog-image--left { margin-left: 0; margin-right: auto; }
        .rich-editor-prose .blog-image--center { margin-left: auto; margin-right: auto; }
        .rich-editor-prose .blog-image--right { margin-left: auto; margin-right: 0; }
        .rich-editor-prose .blog-image.ProseMirror-selectednode { outline: 2px solid #1677f2; outline-offset: 3px; border-radius: 12px; }
        .rich-editor-prose img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; display: block; cursor: pointer; }
        .rich-editor-prose img.ProseMirror-selectednode { outline: 2px solid #1677f2; outline-offset: 2px; border-radius: 8px; }
        .ProseMirror-focused { outline: none; }
        .ProseMirror .selectedCell { background: rgba(22,119,242,0.08); }
      `}</style>
    </>
  );
}
