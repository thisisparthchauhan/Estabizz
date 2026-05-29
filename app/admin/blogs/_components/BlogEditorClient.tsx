"use client";

/**
 * BlogEditorClient — shared editor for /admin/blogs/new and /admin/blogs/edit/[id]
 *
 * Rich-text approach: textarea + HTML-snippet toolbar.
 * TODO: Replace the <textarea> content editor with TipTap, Lexical, Editor.js
 *       or TinyMCE once a package is installed. Keep all surrounding field state
 *       as-is — only swap the <ContentEditor> section below.
 *
 * Save / Publish: currently mock (console.log + toast).
 * TODO: Replace handleSave() with a fetch('/api/admin/blogs/save', { method: 'POST', body }) call.
 * TODO: Replace handlePublish() with fetch('/api/admin/blogs/publish', ...).
 */

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import type { Blog, BlogCategory, BlogStatus } from "@/lib/blog/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_DISCLAIMER =
  "This article is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. Readers should consult qualified professionals before taking any business or regulatory decision.";

const DEFAULT_CTA_TITLE =
  "Need help with regulatory licensing or compliance?";

const DEFAULT_CTA_BODY =
  "Estabizz Fintech Private Limited assists businesses with RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and allied regulatory matters.";

const KNOWN_AUTHORS = [
  {
    id: "author_estabizz_team",
    display: "Estabizz Compliance Team",
    firstName: "Estabizz",
    lastName: "Compliance Team",
    email: "compliance@estabizz.com",
    designation: "Regulatory Advisory, Estabizz Fintech",
    role: "admin" as const,
    bio: "The Estabizz Compliance Team comprises regulatory advisers with extensive experience across RBI, SEBI, IRDAI and IFSCA frameworks.",
  },
  {
    id: "author_admin",
    display: "Admin Editor",
    firstName: "Admin",
    lastName: "Editor",
    email: "admin@estabizz.com",
    designation: "Senior Editor, Estabizz Fintech",
    role: "admin" as const,
    bio: "Senior editorial team member at Estabizz Fintech.",
  },
];

const STATUS_OPTIONS: { value: BlogStatus; label: string; color: string }[] = [
  { value: "draft",          label: "Draft",          color: "bg-slate-100 text-slate-600" },
  { value: "pending_review", label: "Pending Review", color: "bg-amber-100 text-amber-700" },
  { value: "approved",       label: "Approved",       color: "bg-blue-100 text-blue-700"  },
  { value: "published",      label: "Published",      color: "bg-emerald-100 text-emerald-700" },
  { value: "rejected",       label: "Rejected",       color: "bg-red-100 text-red-700"    },
  { value: "archived",       label: "Archived",       color: "bg-gray-100 text-gray-500"  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageField {
  url: string;
  alt: string;
  caption: string;
}

interface FaqField {
  question: string;
  answer: string;
  order: number;
}

interface BlogFormData {
  title: string;
  slug: string;
  slugManual: boolean;
  summary: string;
  content: string;
  featuredImage: ImageField;
  inlineImages: ImageField[];
  categoryId: string;
  tags: string[];
  authorId: string;
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
  faqs: FaqField[];
  disclaimer: string;
  ctaText: string;
  status: BlogStatus;
  featured: boolean;
}

interface FormErrors {
  title?: string;
  slug?: string;
  summary?: string;
  categoryId?: string;
  featuredImageAlt?: string;
  [key: string]: string | undefined;
}

interface Props {
  blog: Blog | null;
  categories: BlogCategory[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

function buildInitialForm(blog: Blog | null): BlogFormData {
  if (!blog) {
    return {
      title: "",
      slug: "",
      slugManual: false,
      summary: "",
      content: "",
      featuredImage: { url: "", alt: "", caption: "" },
      inlineImages: [],
      categoryId: "",
      tags: [],
      authorId: KNOWN_AUTHORS[0].id,
      focusKeyword: "",
      seoTitle: "",
      metaDescription: "",
      faqs: [],
      disclaimer: DEFAULT_DISCLAIMER,
      ctaText: `${DEFAULT_CTA_TITLE}\n\n${DEFAULT_CTA_BODY}`,
      status: "draft",
      featured: false,
    };
  }
  return {
    title: blog.title,
    slug: blog.slug,
    slugManual: true,
    summary: blog.summary,
    content: blog.content,
    featuredImage: {
      url: blog.featuredImage.url,
      alt: blog.featuredImage.alt,
      caption: blog.featuredImage.caption ?? "",
    },
    inlineImages: blog.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      caption: img.caption ?? "",
    })),
    categoryId: blog.category.id,
    tags: blog.tags,
    authorId:
      KNOWN_AUTHORS.find((a) => a.id === blog.author.id)?.id ??
      KNOWN_AUTHORS[0].id,
    focusKeyword: blog.focusKeyword,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
    faqs: blog.faqs.map((f) => ({
      question: f.question,
      answer: f.answer,
      order: f.order,
    })),
    disclaimer: blog.disclaimer ?? DEFAULT_DISCLAIMER,
    ctaText: blog.ctaText ?? `${DEFAULT_CTA_TITLE}\n\n${DEFAULT_CTA_BODY}`,
    status: blog.status,
    featured: blog.featured,
  };
}

function validate(form: BlogFormData): FormErrors {
  const e: FormErrors = {};
  if (!form.title.trim())    e.title      = "Title is required.";
  if (!form.slug.trim())     e.slug       = "Slug is required.";
  if (!form.summary.trim())  e.summary    = "Summary is required.";
  if (!form.categoryId)      e.categoryId = "Category is required.";
  if (form.featuredImage.url.trim() && !form.featuredImage.alt.trim())
    e.featuredImageAlt = "Alt text is required when a featured image is set.";
  form.inlineImages.forEach((img, i) => {
    if (img.url.trim() && !img.alt.trim())
      e[`inlineImageAlt_${i}`] = `Alt text required for inline image ${i + 1}.`;
  });
  return e;
}

function warnings(form: BlogFormData): string[] {
  const w: string[] = [];
  if (!form.seoTitle.trim())       w.push("SEO Title");
  if (!form.metaDescription.trim()) w.push("Meta Description");
  if (!form.featuredImage.url.trim()) w.push("Featured Image");
  if (!form.focusKeyword.trim())   w.push("Focus Keyword");
  return w;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#0a1628]">{title}</h2>
      {subtitle && <p className="text-[11.5px] text-[#94a3b8] mt-0.5">{subtitle}</p>}
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  recommended,
  error,
  hint,
  counter,
  children,
}: {
  label: string;
  required?: boolean;
  recommended?: boolean;
  error?: string;
  hint?: string;
  counter?: { current: number; max: number };
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1.5">
          {label}
          {required    && <span className="text-red-500 text-[11px]">*</span>}
          {recommended && <span className="text-amber-500 text-[10px] font-black uppercase tracking-wide border border-amber-300 rounded px-1 py-0.5 leading-none">Rec.</span>}
        </label>
        {counter && (
          <span className={`text-[11px] font-mono ${counter.current > counter.max ? "text-red-500" : "text-[#94a3b8]"}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {error && <p className="mt-1 text-[11.5px] text-red-500 flex items-center gap-1">⚠ {error}</p>}
      {hint  && !error && <p className="mt-1 text-[11px] text-[#94a3b8]">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#dbe7f3] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none transition-all focus:border-[#0096D6] focus:ring-3 focus:ring-[#0096D6]/12";

const errorInputCls =
  "w-full rounded-xl border border-red-300 bg-red-50/30 px-3.5 py-2.5 text-[13.5px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none focus:border-red-400 focus:ring-3 focus:ring-red-300/20";

// ─── Content Editor Toolbar ───────────────────────────────────────────────────

const TOOLBAR_GROUPS = [
  {
    label: "Headings",
    buttons: [
      { title: "H2", before: "<h2>", after: "</h2>", placeholder: "Heading 2" },
      { title: "H3", before: "<h3>", after: "</h3>", placeholder: "Heading 3" },
      { title: "H4", before: "<h4>", after: "</h4>", placeholder: "Heading 4" },
      { title: "P",  before: "<p>",  after: "</p>",  placeholder: "Paragraph text" },
    ],
  },
  {
    label: "Inline",
    buttons: [
      { title: "B",  before: "<strong>", after: "</strong>", placeholder: "bold text" },
      { title: "I",  before: "<em>",     after: "</em>",     placeholder: "italic text" },
    ],
  },
  {
    label: "Lists",
    buttons: [
      {
        title: "UL",
        before: "<ul>\n  <li>",
        after: "</li>\n  <li>Item 2</li>\n</ul>",
        placeholder: "List item 1",
      },
      {
        title: "OL",
        before: "<ol>\n  <li>",
        after: "</li>\n  <li>Item 2</li>\n</ol>",
        placeholder: "List item 1",
      },
    ],
  },
  {
    label: "Blocks",
    buttons: [
      { title: "Quote",  before: '<blockquote>\n  <p>', after: '</p>\n</blockquote>', placeholder: "Quote text" },
      {
        title: "Table",
        before:
          '<table>\n  <thead>\n    <tr><th>Column 1</th><th>Column 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>',
        after: "</td><td>Cell 2</td></tr>\n  </tbody>\n</table>",
        placeholder: "Cell 1",
      },
      {
        title: "Callout",
        before: '<div class="callout callout-info">\n  <p>',
        after: "</p>\n</div>",
        placeholder: "Callout text",
      },
    ],
  },
  {
    label: "Links",
    buttons: [
      {
        title: "Int. Link",
        before: '<a href="/page-slug">',
        after: "</a>",
        placeholder: "Link text",
      },
      {
        title: "Ext. Link",
        before: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">',
        after: "</a>",
        placeholder: "Link text",
      },
    ],
  },
  {
    label: "Embeds",
    buttons: [
      {
        title: "Image",
        before: '<figure>\n  <img src="" alt="',
        after: '" />\n  <figcaption>Caption here</figcaption>\n</figure>',
        placeholder: "Image alt text",
      },
      {
        title: "FAQ Block",
        before:
          '<div class="faq-block">\n  <details>\n    <summary>',
        after:
          "</summary>\n    <p>Answer goes here.</p>\n  </details>\n</div>",
        placeholder: "FAQ question",
      },
    ],
  },
];

function ContentEditor({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Insert snippet at cursor; wraps selected text if present
  const insert = useCallback(
    (before: string, after: string, placeholder: string) => {
      const ta = taRef.current;
      if (!ta) return;

      const start = ta.selectionStart ?? 0;
      const end   = ta.selectionEnd   ?? 0;
      const sel   = value.substring(start, end) || placeholder;
      const next  = value.substring(0, start) + before + sel + after + value.substring(end);
      onChange(next);

      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = start + before.length;
        ta.selectionEnd   = start + before.length + sel.length;
      });
    },
    [value, onChange]
  );

  return (
    <div className={`rounded-xl border ${error ? "border-red-300" : "border-[#dbe7f3]"} bg-white overflow-hidden focus-within:border-[#0096D6] focus-within:ring-3 focus-within:ring-[#0096D6]/12 transition-all`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-px border-b border-[#e8f0f8] bg-[#f8fbff] p-2">
        {TOOLBAR_GROUPS.map((group) => (
          <React.Fragment key={group.label}>
            <div className="flex items-center gap-px mr-1">
              {group.buttons.map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  title={btn.title}
                  onClick={() => insert(btn.before, btn.after, btn.placeholder)}
                  className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-[#334155] hover:bg-[#0096D6] hover:text-white transition-colors leading-none"
                >
                  {btn.title}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-[#dbe7f3] mx-1 last:hidden" />
          </React.Fragment>
        ))}

        {/*
          TODO: When upgrading to a rich-text editor:
          - Install: npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
          - OR: npm install @lexical/react
          - OR: npm install tinymce @tinymce/tinymce-react
          - Replace the <textarea> below with the editor component.
          - Import EditorContent from @tiptap/react and useEditor hook.
          - The toolbar buttons above can stay as TipTap commands.
          - Ref: https://tiptap.dev/docs/editor/getting-started/install/nextjs
        */}
        <span className="ml-auto text-[10px] text-[#94a3b8] font-medium italic hidden sm:inline">
          HTML mode · TODO: upgrade to TipTap / Lexical
        </span>
      </div>

      {/* Editor textarea */}
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={22}
        spellCheck
        placeholder="Start writing your article HTML here…&#10;&#10;Example:&#10;<h2>What Is an NBFC?</h2>&#10;<p>A Non-Banking Finance Company…</p>"
        className="w-full px-4 py-3 text-[13px] text-[#0a1628] leading-relaxed font-mono resize-y outline-none bg-white placeholder:text-[#b0bec5] placeholder:font-sans"
      />

      {/* Word count bar */}
      <div className="flex items-center justify-between border-t border-[#e8f0f8] bg-[#f8fbff] px-3 py-1.5 text-[11px] text-[#94a3b8]">
        <span>
          {value.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length} words ·{" "}
          {Math.max(1, Math.ceil(value.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length / 238))} min read
        </span>
        <span>{value.length} chars (raw HTML)</span>
      </div>
    </div>
  );
}

// ─── Tag Input ────────────────────────────────────────────────────────────────

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function addTag(raw: string) {
    const tag = raw.trim();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="rounded-xl border border-[#dbe7f3] bg-white px-2.5 py-2 flex flex-wrap gap-1.5 focus-within:border-[#0096D6] focus-within:ring-3 focus-within:ring-[#0096D6]/12 transition-all min-h-[46px] cursor-text">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-lg bg-[#e8f7ff] text-[#0096D6] text-[12px] font-semibold px-2.5 py-1 leading-none"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-[#0096D6]/60 hover:text-red-500 leading-none text-[11px] ml-0.5"
            aria-label={`Remove tag ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input.trim() && addTag(input)}
        placeholder={tags.length === 0 ? "Type and press Enter or comma…" : "Add more…"}
        className="flex-1 min-w-[140px] text-[13px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none bg-transparent py-0.5 px-1"
      />
    </div>
  );
}

// ─── Image Upload Field ───────────────────────────────────────────────────────

function ImageField({
  label,
  value,
  onChange,
  altError,
  index,
}: {
  label: string;
  value: ImageField;
  onChange: (v: ImageField) => void;
  altError?: string;
  index?: number;
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-3.5 space-y-2.5">
      <div className="text-[12px] font-bold text-[#334155]">{label}</div>

      {/* URL input */}
      <div>
        <label className="text-[11px] text-[#64748b] font-medium mb-1 block">Image URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={value.url}
            onChange={(e) => {
              onChange({ ...value, url: e.target.value });
              setPreview(false);
            }}
            placeholder="https://… or /images/…"
            className={`${inputCls} text-[12.5px] py-2`}
          />
          {value.url && (
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="shrink-0 px-3 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12px] font-semibold text-[#64748b] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors"
            >
              {preview ? "Hide" : "Preview"}
            </button>
          )}
        </div>
        {/*
          TODO: Replace URL input with file upload button:
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          Upload to /api/upload (Cloudinary / S3 / local /public/images/blog/).
          Set value.url to the returned URL after upload completes.
        */}
        <p className="mt-1 text-[10.5px] text-[#94a3b8]">
          TODO: wire file upload → Cloudinary / S3 / local. Currently accepts URL.
        </p>
      </div>

      {/* Preview */}
      {preview && value.url && (
        <div className="rounded-xl overflow-hidden border border-[#dbe7f3] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.url}
            alt={value.alt || "preview"}
            className="w-full h-36 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Alt text */}
      <div>
        <label className="text-[11px] text-[#64748b] font-medium mb-1 flex items-center gap-1 block">
          Alt Text {value.url && <span className="text-red-500 text-[10px]">*</span>}
        </label>
        <input
          type="text"
          value={value.alt}
          onChange={(e) => onChange({ ...value, alt: e.target.value })}
          placeholder="Descriptive alt text for accessibility & SEO"
          className={altError ? errorInputCls : `${inputCls} text-[12.5px] py-2`}
        />
        {altError && <p className="mt-0.5 text-[11px] text-red-500">⚠ {altError}</p>}
      </div>

      {/* Caption */}
      <div>
        <label className="text-[11px] text-[#64748b] font-medium mb-1 block">Caption (optional)</label>
        <input
          type="text"
          value={value.caption}
          onChange={(e) => onChange({ ...value, caption: e.target.value })}
          placeholder="Shown below image in article"
          className={`${inputCls} text-[12.5px] py-2`}
        />
      </div>
    </div>
  );
}

// ─── FAQ Editor ───────────────────────────────────────────────────────────────

function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: FaqField[];
  onChange: (faqs: FaqField[]) => void;
}) {
  function addFaq() {
    onChange([...faqs, { question: "", answer: "", order: faqs.length }]);
  }

  function updateFaq(i: number, patch: Partial<FaqField>) {
    const next = [...faqs];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  function removeFaq(i: number) {
    onChange(faqs.filter((_, idx) => idx !== i).map((f, idx) => ({ ...f, order: idx })));
  }

  function moveFaq(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= faqs.length) return;
    const next = [...faqs];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next.map((f, idx) => ({ ...f, order: idx })));
  }

  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <p className="text-[12.5px] text-[#94a3b8] italic py-2">
          No FAQs added yet. FAQs appear as an accordion below the article and generate FAQ schema for Google.
        </p>
      )}

      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#dbe7f3] bg-white p-4 space-y-2.5"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11.5px] font-bold text-[#0096D6] uppercase tracking-wide">
              FAQ {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveFaq(i, -1)} disabled={i === 0}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-[#0096D6] hover:bg-[#e8f7ff] disabled:opacity-30 text-[11px]">↑</button>
              <button type="button" onClick={() => moveFaq(i, 1)} disabled={i === faqs.length - 1}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-[#0096D6] hover:bg-[#e8f7ff] disabled:opacity-30 text-[11px]">↓</button>
              <button type="button" onClick={() => removeFaq(i)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-red-500 hover:bg-red-50 text-[11px] ml-0.5">✕</button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#64748b] mb-1 block">Question</label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => updateFaq(i, { question: e.target.value })}
              placeholder="e.g. What is the minimum NOF for NBFC registration?"
              className={`${inputCls} text-[12.5px] py-2`}
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#64748b] mb-1 block">Answer</label>
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(i, { answer: e.target.value })}
              rows={3}
              placeholder="Provide a clear, concise answer…"
              className={`${inputCls} text-[12.5px] py-2 resize-y`}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addFaq}
        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#0096D6]/30 bg-[#f0faff] py-3 text-[13px] font-semibold text-[#0096D6] hover:border-[#0096D6] hover:bg-[#e8f7ff] transition-colors"
      >
        <span className="text-lg leading-none">+</span> Add FAQ
      </button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: "bg-emerald-600",
    error:   "bg-red-600",
    warning: "bg-amber-500",
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white text-[13.5px] font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.25)] ${colors[type]} animate-[slideUp_0.25s_ease]`}>
      <span>
        {type === "success" && "✓ "}
        {type === "error"   && "✕ "}
        {type === "warning" && "⚠ "}
        {message}
      </span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 text-[16px] leading-none">×</button>
      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogEditorClient({ blog, categories }: Props) {
  const isEditing = !!blog;

  const [form, setForm] = useState<BlogFormData>(() => buildInitialForm(blog));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  // ── Field helpers ──────────────────────────────────────────────────────────
  function set<K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched) setErrors(validate({ ...form, [key]: value }));
  }

  function handleTitleChange(title: string) {
    const next: BlogFormData = {
      ...form,
      title,
      slug: form.slugManual ? form.slug : slugify(title),
    };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function handleSlugChange(slug: string) {
    const next: BlogFormData = { ...form, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ""), slugManual: true };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function resetSlug() {
    const next: BlogFormData = { ...form, slug: slugify(form.title), slugManual: false };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  // ── Image fields ───────────────────────────────────────────────────────────
  function addInlineImage() {
    set("inlineImages", [...form.inlineImages, { url: "", alt: "", caption: "" }]);
  }
  function updateInlineImage(i: number, v: ImageField) {
    const next = [...form.inlineImages];
    next[i] = v;
    set("inlineImages", next);
  }
  function removeInlineImage(i: number) {
    set("inlineImages", form.inlineImages.filter((_, idx) => idx !== i));
  }

  // ── Save / Publish ─────────────────────────────────────────────────────────
  function doSave(targetStatus: BlogStatus) {
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setToast({ message: "Please fix the highlighted errors.", type: "error" });
      return;
    }

    const warn = warnings(form);
    setSaving(true);

    // Simulate async save
    setTimeout(() => {
      setSaving(false);

      /*
       * TODO: Replace this block with a real API call:
       *
       * const payload = buildBlogPayload(form, targetStatus, blog?.id);
       * const res = await fetch('/api/admin/blogs/save', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(payload),
       * });
       * if (!res.ok) throw new Error(await res.text());
       * const saved = await res.json();
       * // redirect to /admin/blogs/edit/[saved.id] if new
       */

      console.log("[Admin] Blog saved:", { ...form, status: targetStatus });

      if (warn.length > 0 && targetStatus !== "published") {
        setToast({
          message: `Saved as draft. Recommended: ${warn.join(", ")}.`,
          type: "warning",
        });
      } else {
        setToast({
          message:
            targetStatus === "published"
              ? "Blog published successfully!"
              : targetStatus === "draft"
              ? "Draft saved."
              : `Status updated to "${targetStatus}".`,
          type: "success",
        });
      }

      setForm((f) => ({ ...f, status: targetStatus }));
    }, 800);
  }

  function handleSaveDraft()  { doSave("draft");     }
  function handlePublish()    { doSave("published"); }
  function handleUpdate()     { doSave(form.status); }

  function handlePreview() {
    if (!form.slug.trim()) {
      setToast({ message: "Enter a slug before previewing.", type: "warning" });
      return;
    }
    window.open(`/blogs/${form.slug}`, "_blank", "noopener");
  }

  // ── Computed ───────────────────────────────────────────────────────────────
  const warn = warnings(form);
  const selectedAuthor = KNOWN_AUTHORS.find((a) => a.id === form.authorId) ?? KNOWN_AUTHORS[0];
  const selectedStatus = STATUS_OPTIONS.find((s) => s.value === form.status) ?? STATUS_OPTIONS[0];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-full bg-[#f0f4f8]">

      {/* ── Sticky action bar ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0] shadow-[0_2px_8px_rgba(15,23,42,0.07)]">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12.5px] text-[#64748b] min-w-0">
            <Link href="/admin/blogs" className="hover:text-[#0096D6] font-medium whitespace-nowrap">All Blogs</Link>
            <span className="text-[#cbd5e1]">/</span>
            <span className="font-semibold text-[#0a1628] truncate max-w-[300px]">
              {form.title || (isEditing ? "Edit Blog" : "New Blog")}
            </span>
          </div>

          {/* Status badge + action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`hidden sm:inline text-[11.5px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide ${selectedStatus.color}`}>
              {selectedStatus.label}
            </span>

            {warn.length > 0 && (
              <span title={`Missing recommended: ${warn.join(", ")}`}
                className="hidden md:inline text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg cursor-default">
                ⚠ {warn.length} warning{warn.length > 1 ? "s" : ""}
              </span>
            )}

            <button type="button" onClick={handlePreview}
              className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[13px] font-semibold text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors">
              Preview ↗
            </button>

            <button type="button" onClick={handleSaveDraft} disabled={saving}
              className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[13px] font-semibold text-[#334155] hover:bg-[#f8fbff] transition-colors disabled:opacity-50">
              {saving ? "Saving…" : "Save Draft"}
            </button>

            {isEditing ? (
              <button type="button" onClick={handleUpdate} disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#d9a938] text-[#071224] text-[13px] font-bold hover:bg-[#c9981f] transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(217,169,56,0.28)]">
                {saving ? "Updating…" : "✓ Update Blog"}
              </button>
            ) : (
              <button type="button" onClick={handlePublish} disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#d9a938] text-[#071224] text-[13px] font-bold hover:bg-[#c9981f] transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(217,169,56,0.28)]">
                {saving ? "Publishing…" : "✓ Publish"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">

        {/* ════════════════════════════════════════════════════════════════
            LEFT COLUMN — Content
        ════════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">

          {/* ── Core identity ─────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <SectionHeading title="Post Identity" subtitle="Title, slug and short summary shown on listing cards." />

            {/* Title */}
            <FieldWrapper label="Blog Title" required error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. NBFC Registration in India: Complete Guide 2026"
                className={errors.title ? errorInputCls : inputCls}
              />
            </FieldWrapper>

            {/* Slug */}
            <FieldWrapper
              label="URL Slug"
              required
              error={errors.slug}
              hint="Auto-generated from title. Edit manually to lock."
            >
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#94a3b8] font-mono pointer-events-none">/blogs/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="your-slug-here"
                    className={`${errors.slug ? errorInputCls : inputCls} pl-[52px] font-mono text-[13px]`}
                  />
                </div>
                {form.slugManual && (
                  <button type="button" onClick={resetSlug}
                    className="shrink-0 px-3 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12px] font-semibold text-[#94a3b8] hover:text-[#0096D6] hover:border-[#0096D6] transition-colors"
                    title="Re-generate from title">
                    ↺ Auto
                  </button>
                )}
              </div>
              {form.slugManual && !errors.slug && (
                <p className="mt-1 text-[10.5px] text-[#0096D6]">🔒 Manually locked</p>
              )}
            </FieldWrapper>

            {/* Summary */}
            <FieldWrapper
              label="Short Summary"
              required
              error={errors.summary}
              hint="1–2 sentences shown on listing cards and used as OG description fallback."
              counter={{ current: form.summary.length, max: 220 }}
            >
              <textarea
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                rows={3}
                placeholder="A concise excerpt that tells readers exactly what this article covers…"
                className={errors.summary ? errorInputCls : `${inputCls} resize-y`}
              />
            </FieldWrapper>
          </section>

          {/* ── Content editor ────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <SectionHeading
              title="Article Content"
              subtitle="HTML editor. Use toolbar to insert headings, lists, links and embeds."
            />
            <ContentEditor
              value={form.content}
              onChange={(v) => set("content", v)}
              error={undefined}
            />
          </section>

          {/* ── FAQs ──────────────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <SectionHeading
              title="FAQs"
              subtitle="Appear as accordion below the article. Generates FAQPage JSON-LD schema automatically."
            />
            <FaqEditor faqs={form.faqs} onChange={(faqs) => set("faqs", faqs)} />
          </section>

          {/* ── Disclaimer & CTA ──────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <SectionHeading title="Disclaimer & CTA" subtitle="Shown at the bottom of every published article." />

            <FieldWrapper
              label="Disclaimer Text"
              hint="Legal disclaimer rendered in a muted box below the article body."
              counter={{ current: form.disclaimer.length, max: 500 }}
            >
              <textarea
                value={form.disclaimer}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("disclaimer", e.target.value)}
                rows={3}
                className={`${inputCls} resize-y`}
              />
            </FieldWrapper>

            <FieldWrapper
              label="CTA Text"
              hint="Call-to-action box shown above related articles. Include title + body on separate lines."
            >
              <textarea
                value={form.ctaText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("ctaText", e.target.value)}
                rows={4}
                placeholder={`${DEFAULT_CTA_TITLE}\n\n${DEFAULT_CTA_BODY}`}
                className={`${inputCls} resize-y`}
              />
            </FieldWrapper>
          </section>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT COLUMN — Settings
        ════════════════════════════════════════════════════════════════ */}
        <div className="space-y-5">

          {/* ── Publish settings ──────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="Publish Settings" />

            <FieldWrapper label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as BlogStatus)}
                className={inputCls}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </FieldWrapper>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${form.featured ? "bg-[#0096D6]" : "bg-[#dbe7f3]"}`} />
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#334155]">Featured Post</div>
                <div className="text-[11px] text-[#94a3b8]">Pinned to homepage Featured section</div>
              </div>
            </label>

            {/* Warnings */}
            {warn.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-[11.5px] font-bold text-amber-700 mb-1.5">⚠ Recommended fields missing:</p>
                <ul className="space-y-0.5">
                  {warn.map((w) => (
                    <li key={w} className="text-[11.5px] text-amber-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── Taxonomy ──────────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="Category & Tags" />

            <FieldWrapper label="Category" required error={errors.categoryId}>
              <select
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
                className={errors.categoryId ? errorInputCls : inputCls}
              >
                <option value="">— Select a category —</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </FieldWrapper>

            <FieldWrapper label="Tags" hint="Press Enter or comma to add a tag. Backspace removes the last one.">
              <TagInput tags={form.tags} onChange={(tags) => set("tags", tags)} />
            </FieldWrapper>
          </section>

          {/* ── Author ────────────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="Author" />

            <FieldWrapper label="Author">
              <select
                value={form.authorId}
                onChange={(e) => set("authorId", e.target.value)}
                className={inputCls}
              >
                {KNOWN_AUTHORS.map((a) => (
                  <option key={a.id} value={a.id}>{a.display}</option>
                ))}
              </select>
            </FieldWrapper>

            {/* Author preview chip */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f8fbff] border border-[#e8f0f8]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white text-[11px] font-black shrink-0">
                {selectedAuthor.firstName[0]}
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#0a1628] truncate">{selectedAuthor.display}</div>
                <div className="text-[11px] text-[#64748b] truncate">{selectedAuthor.designation}</div>
              </div>
            </div>
          </section>

          {/* ── Featured Image ─────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="Featured Image" subtitle="Hero cover shown at top of article and on listing cards." />
            <ImageField
              label="Cover Image"
              value={form.featuredImage}
              onChange={(v) => set("featuredImage", v)}
              altError={errors.featuredImageAlt}
            />
          </section>

          {/* ── Inline Images ─────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="Inline Images" subtitle="Reference these in article content via Image toolbar button." />
            <div className="space-y-3">
              {form.inlineImages.map((img, i) => (
                <div key={i} className="relative">
                  <ImageField
                    label={`Inline Image ${i + 1}`}
                    value={img}
                    onChange={(v) => updateInlineImage(i, v)}
                    altError={errors[`inlineImageAlt_${i}`]}
                    index={i}
                  />
                  <button
                    type="button"
                    onClick={() => removeInlineImage(i)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-[#94a3b8] hover:text-red-500 hover:bg-red-50 text-[12px] transition-colors"
                    title="Remove image"
                  >✕</button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addInlineImage}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#0096D6]/30 bg-[#f0faff] py-2.5 text-[13px] font-semibold text-[#0096D6] hover:border-[#0096D6] hover:bg-[#e8f7ff] transition-colors"
            >
              <span className="text-lg leading-none">+</span> Add Inline Image
            </button>
          </section>

          {/* ── SEO ───────────────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
            <SectionHeading title="SEO" subtitle="Controls how the page appears in Google search results." />

            <FieldWrapper
              label="Focus Keyword"
              recommended
              hint="Primary keyword this article targets. Used in SEO score checks."
            >
              <input
                type="text"
                value={form.focusKeyword}
                onChange={(e) => set("focusKeyword", e.target.value)}
                placeholder="e.g. NBFC Registration India"
                className={inputCls}
              />
            </FieldWrapper>

            <FieldWrapper
              label="SEO Title"
              recommended
              hint="Shown in browser tab and Google results. Ideal: 50–60 chars."
              counter={{ current: form.seoTitle.length, max: 60 }}
            >
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
                placeholder="e.g. NBFC Registration: RBI Licensing Guide 2026 | Estabizz"
                className={inputCls}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Meta Description"
              recommended
              hint="Shown in Google snippet. Ideal: 140–160 chars."
              counter={{ current: form.metaDescription.length, max: 160 }}
            >
              <textarea
                value={form.metaDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("metaDescription", e.target.value)}
                rows={3}
                placeholder="Step-by-step guide to NBFC registration…"
                className={`${inputCls} resize-y`}
              />
            </FieldWrapper>

            {/* SERP preview */}
            {(form.seoTitle || form.metaDescription) && (
              <div className="mt-2 rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-3.5">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#94a3b8] mb-2">SERP Preview</p>
                <p className="text-[13px] font-semibold text-[#1a0dab] truncate">
                  {form.seoTitle || form.title || "Page title"}
                </p>
                <p className="text-[11.5px] text-[#006621] truncate">
                  estabizz.com/blogs/{form.slug || "slug"}
                </p>
                <p className="text-[12px] text-[#545454] mt-0.5 line-clamp-2 leading-relaxed">
                  {form.metaDescription || form.summary || "Meta description…"}
                </p>
              </div>
            )}
          </section>

        </div>
        {/* end RIGHT COLUMN */}
      </div>

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
