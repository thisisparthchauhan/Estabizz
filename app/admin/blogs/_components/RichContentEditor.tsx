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
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { DOMParser as ProseDOMParser } from "@tiptap/pm/model";
import { cleanWordHtml, isWordHtml } from "./wordCleanup";

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
  "image/jpg",
  "image/gif",
  "image/webp",
]);

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

// ── Main editor ───────────────────────────────────────────────────────────────

export default function RichContentEditor({ value, onChange, onImageValidationChange }: Props) {
  const wordFileRef = useRef<HTMLInputElement>(null);
  const [showHtml, setShowHtml]         = useState(false);
  const [linkOpen, setLinkOpen]         = useState(false);
  const [wordPasteToast, setWordPasteToast] = useState(false);
  const wordPasteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Word import state ───────────────────────────────────────────────────────
  const [importStatus, setImportStatus]         = useState<string | null>(null);
  const [uploadFailCount, setUploadFailCount]   = useState(0);
  const [failedMediaRecords, setFailedMediaRecords] = useState<FailedMediaRecord[]>([]);
  const [isRetrying, setIsRetrying]             = useState(false);
  const [mediaSyncSucceeded, setMediaSyncSucceeded] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);
  const importSuccessTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Alt text state ──────────────────────────────────────────────────────────
  const [unresolvedAltCount, setUnresolvedAltCount] = useState(0);
  // Prevents the alt panel from re-opening immediately after the user clicks Save.
  const altSavingRef = useRef(false);

  // ── Alt editor panel state ──────────────────────────────────────────────────
  const [altPanelOpen, setAltPanelOpen] = useState(false);
  const [altEditValue, setAltEditValue] = useState("");

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

  // ── Editor ──────────────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        codeBlock: false,
        code: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { loading: "lazy", decoding: "async" },
        resize: false,
      }),
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
        if (wordPasteTimer.current) clearTimeout(wordPasteTimer.current);
        setWordPasteToast(true);
        wordPasteTimer.current = setTimeout(() => setWordPasteToast(false), 3500);
        return true;
      },
    },

    onUpdate({ editor: e }) {
      const html = e.getHTML();
      onChangeRef.current(html);
      setUnresolvedAltCount(countUnresolvedAlts(html));
    },

    onSelectionUpdate({ editor: e }) {
      if (e.isActive("image")) {
        // Don't re-open immediately after the user saves an alt (brief cooldown)
        if (!altSavingRef.current) {
          const attrs = e.getAttributes("image") as Record<string, unknown>;
          setAltEditValue(String(attrs.alt ?? ""));
          setAltPanelOpen(true);
        }
      } else {
        setAltPanelOpen(false);
      }
    },
  });

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
    // Update the currently-selected image node, then blur to prevent re-open
    editor.chain().updateAttributes("image", { alt: newAlt }).blur().run();
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
      setUploadFailCount(0);
      setFailedMediaRecords([]);
      setMediaSyncSucceeded(false);
      if (importSuccessTimer.current) clearTimeout(importSuccessTimer.current);
      setImportSuccessMsg(null);

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
          setUploadFailCount(cloudinaryFailed);
        }

        if (mediaFailedNew.length === 0 && totalCloudinaryOk > 0) {
          // All images succeeded end-to-end
          const successMsg = `Word import complete — ${totalCloudinaryOk} image${totalCloudinaryOk !== 1 ? "s" : ""} uploaded and added to Media Library.`;
          setImportSuccessMsg(successMsg);
          importSuccessTimer.current = setTimeout(() => setImportSuccessMsg(null), 5000);
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
              {/* Import Word */}
              <button
                type="button"
                title="Import from Word .docx file"
                disabled={isImporting}
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

        {/* ── Image alt-text editor panel ───────────────────────────────────── */}
        {altPanelOpen && (
          <div className="flex items-center gap-2 border-b border-[#c7d9f5] bg-[#f0f7ff] px-4 py-2">
            <span className="text-[11px] font-black text-[#1677f2] shrink-0 uppercase tracking-wide">Alt text</span>
            <input
              type="text"
              value={altEditValue}
              onChange={(e) => setAltEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); handleAltSave(); }
                if (e.key === "Escape") handleAltCancel();
              }}
              placeholder="Describe this image for screen readers…"
              className="flex-1 min-w-0 rounded-lg border border-[#c7d9f5] bg-white px-2.5 py-1 text-[12px] text-[#0a1628] outline-none focus:border-[#1677f2]"
            />
            {PLACEHOLDER_ALT_RE.test(altEditValue.trim()) && (
              <span className="text-[11px] text-amber-600 font-semibold shrink-0 hidden sm:inline">Placeholder — please describe the image</span>
            )}
            <button
              type="button"
              onClick={handleAltSave}
              disabled={!altEditValue.trim()}
              className="shrink-0 px-3 py-1 rounded-lg bg-[#1677f2] text-white text-[11.5px] font-bold disabled:opacity-40 hover:bg-[#0077B6] transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleAltCancel}
              className="shrink-0 px-2 py-1 rounded-lg text-[11.5px] font-semibold text-[#64748b] hover:text-[#0a1628]"
            >
              Cancel
            </button>
          </div>
        )}

        {/* ── Word import progress (spinner) ────────────────────────────────── */}
        {importStatus && (
          <div className="flex items-center gap-2 border-b border-blue-200 bg-blue-50 px-4 py-2 text-[12px] font-semibold text-blue-700">
            <svg className="h-3.5 w-3.5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
            <span>{importStatus}</span>
          </div>
        )}

        {/* ── Word paste toast ──────────────────────────────────────────────── */}
        {wordPasteToast && (
          <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-700">
            <span>✓</span>
            <span>Word content pasted and cleaned — mso- styles removed, headings mapped to H2/H3/H4.</span>
          </div>
        )}

        {/* ── Media Library sync failure ────────────────────────────────────── */}
        {mediaSyncFailCount > 0 && (
          <div className="flex items-center justify-between gap-2 border-b border-orange-200 bg-orange-50 px-4 py-2 text-[12px] font-semibold text-orange-800">
            <span>
              ⚠ {mediaSyncFailCount} image{mediaSyncFailCount > 1 ? "s were" : " was"} uploaded but could not be added to Media Library.
              {" "}Images are in the editor but not tracked.
            </span>
            <button
              type="button"
              onClick={handleMediaRetry}
              disabled={isRetrying}
              className="shrink-0 px-3 py-1 rounded-lg bg-orange-700 text-white text-[11px] font-bold hover:bg-orange-800 disabled:opacity-50 transition-colors"
            >
              {isRetrying ? "Syncing…" : "Retry Media Library Sync"}
            </button>
          </div>
        )}

        {/* ── Media Library sync success (after retry) ──────────────────────── */}
        {mediaSyncSucceeded && mediaSyncFailCount === 0 && (
          <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-700">
            <span>✓ Media Library sync completed successfully.</span>
          </div>
        )}

        {/* ── Upload failures (Cloudinary) ──────────────────────────────────── */}
        {uploadFailCount > 0 && !isImporting && (
          <div className="flex items-center justify-between gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-[12px] font-semibold text-amber-800">
            <span>
              ⚠ {uploadFailCount} image{uploadFailCount > 1 ? "s" : ""} could not be uploaded — check the editor and replace them manually.
            </span>
            <button
              type="button"
              onClick={() => setUploadFailCount(0)}
              className="shrink-0 text-amber-600 hover:text-amber-900 text-[14px] leading-none"
            >
              ×
            </button>
          </div>
        )}

        {/* ── Import complete (all images succeeded) ────────────────────────── */}
        {importSuccessMsg && (
          <div className="flex items-center justify-between gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-700">
            <span>✓ {importSuccessMsg}</span>
            <button
              type="button"
              onClick={() => setImportSuccessMsg(null)}
              className="shrink-0 text-emerald-600 hover:text-emerald-900 text-[14px] leading-none"
            >
              ×
            </button>
          </div>
        )}

        {/* ── Alt text review notice ────────────────────────────────────────── */}
        {unresolvedAltCount > 0 && (
          <div className="flex items-center gap-2 border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-[12px] font-semibold text-yellow-800">
            <span>
              ✎ {unresolvedAltCount} image{unresolvedAltCount > 1 ? "s have" : " has"} placeholder alt text — click the image to edit it before publishing.
            </span>
          </div>
        )}

        {/* ── Editor / HTML view ────────────────────────────────────────────── */}
        <div className="bg-white">
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
        .rich-editor-prose img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; display: block; cursor: pointer; }
        .rich-editor-prose img.ProseMirror-selectednode { outline: 2px solid #1677f2; outline-offset: 2px; border-radius: 8px; }
        .ProseMirror-focused { outline: none; }
        .ProseMirror .selectedCell { background: rgba(22,119,242,0.08); }
      `}</style>
    </>
  );
}
