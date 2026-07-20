"use client";

/**
 * RichContentEditor — TipTap WYSIWYG editor for blog content.
 *
 * Replaces the plain textarea ContentEditor. Supports:
 * - Paste from Microsoft Word (auto-detected + cleaned via wordCleanup.ts)
 * - Import from .docx via Mammoth.js
 * - Heading (H2/H3/H4), Bold, Italic, Underline, Link
 * - Bullet list, Ordered list, Blockquote/Callout
 * - Tables
 * - HTML source view toggle (read-only preview)
 * - Word count footer
 *
 * Outputs clean HTML saved to the existing blog `content` field.
 * Server-side re-sanitization via sanitize-html runs on every save (defense-in-depth).
 */

import React, { useCallback, useRef, useState, useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { DOMParser as ProseDOMParser } from "@tiptap/pm/model";
import { cleanWordHtml, isWordHtml } from "./wordCleanup";

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  value: string;
  onChange: (html: string) => void;
}

// ── Toolbar button ────────────────────────────────────────────────────────────

function Btn({
  active,
  title,
  disabled,
  onClick,
  children,
}: {
  active?: boolean;
  title: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
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
  current,
  onConfirm,
  onCancel,
}: {
  current: string;
  onConfirm: (url: string) => void;
  onCancel: () => void;
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
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] text-[12.5px] font-semibold text-[#64748b] hover:bg-[#f8fbff]"
          >
            Cancel
          </button>
          {current && (
            <button
              type="button"
              onClick={() => onConfirm("")}
              className="px-4 py-2 rounded-xl border border-red-200 text-[12.5px] font-semibold text-red-500 hover:bg-red-50"
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => onConfirm(url)}
            className="px-4 py-2 rounded-xl bg-[#1677f2] text-white text-[12.5px] font-bold hover:bg-[#0077B6]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────

export default function RichContentEditor({ value, onChange }: Props) {
  const wordFileRef = useRef<HTMLInputElement>(null);
  const [showHtml, setShowHtml] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [wordPasteToast, setWordPasteToast] = useState(false);
  const wordPasteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep a ref to avoid stale closures in handlePaste
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Disable code blocks (not needed for blog content)
        codeBlock: false,
        code: false,
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
        class:
          "rich-editor-prose outline-none min-h-[420px] px-4 py-4 text-[14px] leading-relaxed text-[#0a1628]",
      },

      handlePaste(view, event) {
        const html = event.clipboardData?.getData("text/html") ?? "";
        if (!html || !isWordHtml(html)) return false;

        // Word paste detected — clean and insert
        event.preventDefault();
        const cleaned = cleanWordHtml(html);

        const dom = document.createElement("div");
        dom.innerHTML = cleaned;
        const parser = ProseDOMParser.fromSchema(view.state.schema);
        const slice = parser.parseSlice(dom);
        const tr = view.state.tr.replaceSelection(slice);
        view.dispatch(tr);

        // Flash toast
        if (wordPasteTimer.current) clearTimeout(wordPasteTimer.current);
        setWordPasteToast(true);
        wordPasteTimer.current = setTimeout(() => setWordPasteToast(false), 3500);

        return true;
      },
    },

    onUpdate({ editor: e }) {
      onChangeRef.current(e.getHTML());
    },
  });

  // Sync external value changes (e.g. loading an existing blog)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (current !== value && value !== undefined) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // Only run when `value` prop changes from outside (not from typing)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  // ── Import .docx via Mammoth ───────────────────────────────────────────────
  const handleWordFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      e.target.value = "";

      try {
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const cleaned = cleanWordHtml(result.value);
        editor.commands.setContent(cleaned, { emitUpdate: true });
        onChangeRef.current(editor.getHTML());
      } catch (err) {
        console.error("[RichContentEditor] Mammoth import failed:", err);
        alert("Could not read the Word file. Please try copy-pasting instead.");
      }
    },
    [editor]
  );

  // ── Link handling ─────────────────────────────────────────────────────────
  const handleLinkConfirm = useCallback(
    (url: string) => {
      setLinkOpen(false);
      if (!editor) return;
      if (!url) {
        editor.chain().focus().unsetLink().run();
        return;
      }
      editor.chain().focus().setLink({ href: url }).run();
    },
    [editor]
  );

  const currentLink =
    editor?.isActive("link")
      ? (editor.getAttributes("link").href as string) ?? ""
      : "";

  // ── Word count ───────────────────────────────────────────────────────────
  const rawText = editor?.getText() ?? "";
  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editor?.getHTML().length ?? 0;

  if (!editor) return null;

  return (
    <>
      <div className="rounded-xl border border-[#dbe7f3] bg-white overflow-hidden focus-within:border-[#1677f2] focus-within:ring-2 focus-within:ring-[#1677f2]/12 transition-all">

        {/* ── Toolbar ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[#e8f0f8] bg-[#f8fbff] p-2">

          {/* Text formatting */}
          <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>B</Btn>
          <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></Btn>
          <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>

          <Divider />

          {/* Headings */}
          <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
          <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
          <Btn title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>H4</Btn>

          <Divider />

          {/* Lists */}
          <Btn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
          <Btn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>

          <Divider />

          {/* Blockquote / Callout */}
          <Btn title="Blockquote / Callout" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</Btn>

          {/* Link */}
          <Btn title="Insert / Edit Link" active={editor.isActive("link")} onClick={() => setLinkOpen(true)}>🔗 Link</Btn>

          <Divider />

          {/* Table */}
          <Btn
            title="Insert Table"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
            Table
          </Btn>

          {editor.isActive("table") && (
            <>
              <Btn title="Add column after" onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</Btn>
              <Btn title="Add row after" onClick={() => editor.chain().focus().addRowAfter().run()}>+Row</Btn>
              <Btn title="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>✕Tbl</Btn>
            </>
          )}

          <Divider />

          {/* Import Word file */}
          <button
            type="button"
            title="Import from Word .docx file"
            onClick={() => wordFileRef.current?.click()}
            className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-[#1677f2] border border-[#1677f2]/30 hover:bg-[#1677f2] hover:text-white hover:border-[#1677f2] transition-colors leading-none"
          >
            📄 Import Word
          </button>

          {/* HTML source toggle */}
          <button
            type="button"
            title="View raw HTML output"
            onClick={() => setShowHtml((s) => !s)}
            className={`ml-auto px-2.5 py-1.5 rounded-lg text-[11px] font-bold leading-none transition-colors ${
              showHtml
                ? "bg-[#0a1628] text-white"
                : "text-[#94a3b8] hover:text-[#334155]"
            }`}
          >
            {"</>"}
          </button>
        </div>

        {/* ── Word paste banner ─────────────────────────────────────────────── */}
        {wordPasteToast && (
          <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-700">
            <span>✓</span>
            <span>Word content pasted and cleaned — mso- styles removed, headings mapped to H2/H3/H4.</span>
          </div>
        )}

        {/* ── Editor / HTML view ────────────────────────────────────────────── */}
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

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-[#e8f0f8] bg-[#f8fbff] px-3 py-1.5 text-[11px] text-[#94a3b8]">
          <span>
            {wordCount} {wordCount === 1 ? "word" : "words"} · ~{Math.max(1, Math.ceil(wordCount / 238))} min read
          </span>
          <span>{charCount} chars HTML</span>
        </div>
      </div>

      {/* ── Hidden file input for .docx ───────────────────────────────────── */}
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
        .ProseMirror-focused { outline: none; }
        .ProseMirror .selectedCell { background: rgba(22,119,242,0.08); }
      `}</style>
    </>
  );
}
