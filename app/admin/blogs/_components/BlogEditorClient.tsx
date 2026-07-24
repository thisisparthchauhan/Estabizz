"use client";

/**
 * BlogEditorClient — shared editor for /admin/blogs/new and /admin/blogs/edit/[id]
 *
 * Single-page, all-sections-visible form (not a wizard).
 * Sections are numbered 1–8, each in its own white card.
 *
 * Save / Publish: inline toast notifications, no external library.
 * TODO: Replace doSave() with a real fetch('/api/admin/blogs/save', ...) call.
 */

import React, {
  useState,
  useEffect,
  type ChangeEvent,
} from "react";
import Link from "next/link";
import type { Blog, BlogCategory, BlogStatus } from "@/lib/blog/types";
import { EstabizzSelect } from "@/components/ui/EstabizzSelect";
import { blogCategories } from "@/lib/blog/categories";
import { CloudinaryUploader } from "./CloudinaryUploader";
import RichContentEditor, { type ImageValidationState } from "./RichContentEditor";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_DISCLAIMER =
  "This article is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. Readers should consult qualified professionals before taking any business or regulatory decision.";

const DEFAULT_CTA_TITLE = "Need regulatory assistance?";

const DEFAULT_CTA_BODY =
  "Estabizz Fintech Private Limited assists businesses with RBI, SEBI, IRDAI, IFSCA, MCA, FIU-IND and allied regulatory matters. Our team of experienced advisers guides you through licensing, registration and ongoing compliance — from application to operation.";

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

const CUSTOM_AUTHOR_ID = "author_custom";

const STATUS_OPTIONS: { value: BlogStatus; label: string }[] = [
  { value: "draft",          label: "Draft" },
  { value: "pending_review", label: "Pending Review" },
  { value: "approved",       label: "Approved" },
  { value: "published",      label: "Published" },
  { value: "rejected",       label: "Rejected" },
  { value: "archived",       label: "Archived" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageEntry {
  url: string;
  alt: string;
}

interface FaqEntry {
  question: string;
  answer: string;
  order: number;
}

interface BlogFormData {
  title: string;
  slug: string;
  slugManual: boolean;
  status: BlogStatus;
  categoryId: string;
  summary: string;
  content: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  supportingImages: ImageEntry[];
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  authorId: string;
  customAuthorName: string;
  tags: string;
  faqs: FaqEntry[];
  ctaTitle: string;
  ctaBody: string;
  disclaimer: string;
}

interface FormErrors {
  title?: string;
  slug?: string;
  summary?: string;
  categoryId?: string;
  [key: string]: string | undefined;
}

interface Props {
  blog?: Blog | null;
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

function buildInitial(blog?: Blog | null): BlogFormData {
  if (!blog) {
    return {
      title: "",
      slug: "",
      slugManual: false,
      status: "draft",
      categoryId: "",
      summary: "",
      content: "",
      featuredImageUrl: "",
      featuredImageAlt: "",
      supportingImages: [],
      focusKeyword: "",
      seoTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      authorId: KNOWN_AUTHORS[0].id,
      customAuthorName: "",
      tags: "",
      faqs: [],
      ctaTitle: DEFAULT_CTA_TITLE,
      ctaBody: DEFAULT_CTA_BODY,
      disclaimer: DEFAULT_DISCLAIMER,
    };
  }
  return {
    title: blog.title,
    slug: blog.slug,
    slugManual: true,
    status: blog.status,
    categoryId: blog.category.id,
    summary: blog.summary,
    content: blog.content,
    featuredImageUrl: blog.featuredImage.url,
    featuredImageAlt: blog.featuredImage.alt,
    supportingImages: blog.images.map((img) => ({ url: img.url, alt: img.alt })),
    focusKeyword: blog.focusKeyword,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
    canonicalUrl: "",
    authorId:
      KNOWN_AUTHORS.find((a) => a.id === blog.author.id)?.id ?? CUSTOM_AUTHOR_ID,
    customAuthorName:
      KNOWN_AUTHORS.find((a) => a.id === blog.author.id)
        ? ""
        : `${blog.author.firstName} ${blog.author.lastName}`.trim(),
    tags: blog.tags.join(", "),
    faqs: blog.faqs.map((f) => ({ question: f.question, answer: f.answer, order: f.order })),
    ctaTitle: DEFAULT_CTA_TITLE,
    ctaBody: DEFAULT_CTA_BODY,
    disclaimer: blog.disclaimer ?? DEFAULT_DISCLAIMER,
  };
}

function validate(form: BlogFormData): FormErrors {
  const e: FormErrors = {};
  if (!form.title.trim())    e.title      = "Title is required.";
  if (!form.slug.trim())     e.slug       = "Slug is required.";
  if (!form.summary.trim())  e.summary    = "Summary is required.";
  if (!form.categoryId)      e.categoryId = "Category is required.";
  return e;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13.5px] text-[#0a1628] dark:text-[#f7f9fc] placeholder:text-[#b0bec5] dark:placeholder:text-[#64748b] outline-none transition-all focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/12";

const errorInputCls =
  "w-full rounded-xl border border-red-300 bg-red-50/30 px-3.5 py-2.5 text-[13.5px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-300/20";

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#0d1a2d] rounded-2xl border border-[#e2e8f0] dark:border-[#223550] shadow-[0_2px_8px_rgba(10,22,40,0.04)]">
      <div className="flex items-center gap-3 border-b border-[#f0f4f8] px-6 py-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[11px] font-black text-white">
          {number}
        </div>
        <h2 className="text-[14px] font-black text-[#0a1628]">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  hint,
  counter,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  counter?: { current: number; max: number };
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 text-[11px]">*</span>}
        </label>
        {counter && (
          <span className={`text-[11px] font-mono ${counter.current > counter.max ? "text-red-500" : "text-[#94a3b8]"}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {error && <p className="mt-1 text-[11.5px] text-red-500">⚠ {error}</p>}
      {hint && !error && <p className="mt-1 text-[11px] text-[#94a3b8]">{hint}</p>}
    </div>
  );
}

// ContentEditor replaced by RichContentEditor (TipTap) — imported above.

// ─── FAQ Editor ───────────────────────────────────────────────────────────────

function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: FaqEntry[];
  onChange: (faqs: FaqEntry[]) => void;
}) {
  function addFaq() {
    onChange([...faqs, { question: "", answer: "", order: faqs.length }]);
  }
  function updateFaq(i: number, patch: Partial<FaqEntry>) {
    const next = [...faqs];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function removeFaq(i: number) {
    onChange(faqs.filter((_, idx) => idx !== i).map((f, idx) => ({ ...f, order: idx })));
  }

  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <p className="text-[12.5px] text-[#94a3b8] italic py-1">
          No FAQs yet. They render as an accordion below the article and generate FAQ schema for Google.
        </p>
      )}
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1677f2]">FAQ {i + 1}</span>
            <button
              type="button"
              onClick={() => removeFaq(i)}
              className="text-[11px] text-[#94a3b8] hover:text-red-500 hover:bg-red-50 rounded-lg px-2 py-1 transition-colors"
            >
              Remove
            </button>
          </div>
          <div>
            <label className="text-[11px] font-medium text-[#64748b] mb-1 block">Question</label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => updateFaq(i, { question: e.target.value })}
              placeholder="e.g. What is the minimum NOF for NBFC registration?"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-[#64748b] mb-1 block">Answer</label>
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(i, { answer: e.target.value })}
              rows={3}
              placeholder="Provide a clear, concise answer…"
              className={`${inputCls} resize-y`}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addFaq}
        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#1677f2]/30 bg-[#f0faff] py-3 text-[13px] font-semibold text-[#1677f2] hover:border-[#1677f2] hover:bg-[#e8f7ff] transition-colors"
      >
        + Add FAQ
      </button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastState {
  message: string;
  type: "success" | "error" | "warning";
}

function Toast({ message, type, onClose }: ToastState & { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const cls = {
    success: "bg-emerald-600",
    error:   "bg-red-600",
    warning: "bg-amber-500",
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white text-[13px] font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.22)] ${cls}`}
      style={{ animation: "slideUpToast 0.25s ease" }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 text-[17px] leading-none ml-1">×</button>
      <style>{`@keyframes slideUpToast{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Action Bar ───────────────────────────────────────────────────────────────

function ActionBar({
  title,
  isEditing,
  saving,
  onDraft,
  onPublish,
  onUpdate,
  isBottom,
}: {
  title: string;
  isEditing: boolean;
  saving: boolean;
  onDraft: () => void;
  onPublish: () => void;
  onUpdate: () => void;
  isBottom?: boolean;
}) {
  return (
    <div className={`${isBottom ? "" : "sticky top-0"} z-[10000] bg-white dark:bg-[#0d1a2d] border-b border-[#e2e8f0] dark:border-[#223550] shadow-[0_2px_8px_rgba(15,23,42,0.06)]`}>
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="hidden sm:inline-flex items-center rounded-lg bg-[#0a1628] px-2.5 py-1 text-[10.5px] font-black text-[#1677f2] uppercase tracking-wider shrink-0">
            Admin Blog Panel
          </span>
          <span className="text-[13px] text-[#94a3b8] truncate max-w-[240px] hidden md:inline">
            {title || (isEditing ? "Edit Blog" : "New Blog")}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onDraft}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] text-[12.5px] font-semibold text-[#334155] dark:text-[#a9b6c9] hover:bg-[#f8fbff] dark:hover:bg-[#12223a] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save as Draft"}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={onUpdate}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#1677f2] text-white text-[12.5px] font-bold hover:bg-[#0077B6] transition-all disabled:opacity-50 shadow-sm"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onPublish}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#1677f2] text-[#071224] text-[12.5px] font-bold hover:bg-[#c8921a] transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(217,169,56,0.25)]"
            >
              {saving ? "Publishing…" : "Publish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogEditorClient({ blog, categories }: Props) {
  // Use passed categories or fall back to the static list
  const cats = categories.length > 0 ? categories : blogCategories;

  const isEditing = blog != null;
  const [form, setForm] = useState<BlogFormData>(() => buildInitial(blog));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  // Tracks the server-assigned id after first save so subsequent saves update the same record
  const [savedId, setSavedId] = useState<string | undefined>(blog?.id);
  const [imagePreview, setImagePreview] = useState(false);
  // Tracks unresolved alt text and media sync failures reported by RichContentEditor
  const [imageValidation, setImageValidation] = useState<ImageValidationState>({
    unresolvedAltCount: 0,
    mediaSyncFailures:  0,
  });

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
    const next: BlogFormData = {
      ...form,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
      slugManual: true,
    };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function resetSlug() {
    setForm((f) => ({ ...f, slug: slugify(f.title), slugManual: false }));
  }

  // Supporting images
  function addSupportingImage() {
    if (form.supportingImages.length >= 6) return;
    set("supportingImages", [...form.supportingImages, { url: "", alt: "" }]);
  }
  function updateSupportingImage(i: number, patch: Partial<ImageEntry>) {
    const next = [...form.supportingImages];
    next[i] = { ...next[i], ...patch };
    set("supportingImages", next);
  }
  function removeSupportingImage(i: number) {
    set("supportingImages", form.supportingImages.filter((_, idx) => idx !== i));
  }

  // Save / Publish — calls real API
  async function doSave(targetStatus: BlogStatus) {
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setToast({ message: "Please fix the highlighted errors before saving.", type: "error" });
      return;
    }

    // Block Publish (not Draft) when imported images have unresolved issues
    if (targetStatus === "published") {
      const { unresolvedAltCount, mediaSyncFailures } = imageValidation;
      if (unresolvedAltCount > 0 || mediaSyncFailures > 0) {
        const parts: string[] = [];
        if (unresolvedAltCount > 0)
          parts.push(`${unresolvedAltCount} image${unresolvedAltCount !== 1 ? "s" : ""} still need alt text review`);
        if (mediaSyncFailures > 0)
          parts.push(`${mediaSyncFailures} image${mediaSyncFailures !== 1 ? "s" : ""} need Media Library sync`);
        setToast({ message: `Cannot publish: ${parts.join("; ")}. Save as Draft to continue later.`, type: "error" });
        return;
      }
    }

    setSaving(true);

    try {
      const payload = {
        id:                  savedId || blog?.id || undefined,
        title:               form.title,
        slug:                form.slug,
        summary:             form.summary,
        content:             form.content,
        categoryId:          form.categoryId,
        status:              targetStatus,
        featuredImageUrl:    form.featuredImageUrl,
        featuredImageAlt:    form.featuredImageAlt,
        focusKeyword:        form.focusKeyword,
        seoTitle:            form.seoTitle,
        metaDescription:     form.metaDescription,
        tags:                form.tags,
        authorId:            form.authorId,
        customAuthorName:    form.customAuthorName,
        faqs:                form.faqs,
        ctaBody:             form.ctaBody,
        disclaimer:          form.disclaimer,
      };

      const res = await fetch('/api/admin/blogs/save', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.error || 'Save failed. Please try again.', type: 'error' });
        return;
      }

      // Store the returned id so subsequent saves update instead of create
      if (data.id) setSavedId(data.id);

      setForm((f) => ({ ...f, status: targetStatus }));
      setToast({
        message:
          targetStatus === "published"
            ? "✓ Blog published — now visible on the site!"
            : targetStatus === "draft"
            ? "Draft saved."
            : `Status updated to "${targetStatus}".`,
        type: "success",
      });
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  const handleDraft   = () => doSave("draft");
  const handlePublish = () => doSave("published");
  const handleUpdate  = () => doSave(form.status);

  return (
    <div className="min-h-full bg-[#f4f7fb] dark:bg-[#06101f]">

      {/* ── Top sticky bar ─────────────────────────────────────────────────── */}
      <ActionBar
        title={form.title}
        isEditing={isEditing}
        saving={saving}
        onDraft={handleDraft}
        onPublish={handlePublish}
        onUpdate={handleUpdate}
      />

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Back link */}
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#64748b] hover:text-[#1677f2] transition-colors font-medium"
          >
            ← All Blogs
          </Link>
        </div>

        {/* ─── Section 1: Basics ───────────────────────────────────────────── */}
        <SectionCard number={1} title="Basics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: title + slug */}
            <div className="lg:col-span-2 space-y-5">
              <Field label="Blog Title" required error={errors.title}>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. NBFC Registration in India: Complete Guide 2026"
                  className={`${errors.title ? errorInputCls : inputCls} text-[15px] py-3 font-semibold`}
                />
              </Field>
              <Field
                label="Slug"
                required
                error={errors.slug}
                hint="Auto-generated from title. Edit to lock."
              >
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#94a3b8] font-mono pointer-events-none">
                      /blogs/
                    </span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="your-slug-here"
                      className={`${errors.slug ? errorInputCls : inputCls} pl-[52px] font-mono text-[13px]`}
                    />
                  </div>
                  {form.slugManual && (
                    <button
                      type="button"
                      onClick={resetSlug}
                      className="shrink-0 px-3 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12px] font-semibold text-[#94a3b8] hover:text-[#1677f2] hover:border-[#1677f2] transition-colors"
                      title="Re-generate from title"
                    >
                      Auto
                    </button>
                  )}
                </div>
              </Field>
            </div>

            {/* Right: status + category */}
            <div className="space-y-5">
              <Field label="Status">
                <EstabizzSelect
                  variant="admin"
                  value={form.status}
                  onValueChange={(v) => set("status", v as BlogStatus)}
                  options={STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
                />
              </Field>
              <Field label="Category" required error={errors.categoryId}>
                <EstabizzSelect
                  variant="admin"
                  value={form.categoryId}
                  onValueChange={(v) => set("categoryId", v)}
                  placeholder="— Select —"
                  error={errors.categoryId}
                  options={[
                    ...cats.map((cat) => ({ value: cat.id, label: cat.name })),
                  ]}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* ─── Section 2: Summary ──────────────────────────────────────────── */}
        <SectionCard number={2} title="Summary">
          <Field
            label="Short Summary"
            required
            error={errors.summary}
            hint="1–2 sentences shown on listing cards and used as OG description fallback."
            counter={{ current: form.summary.length, max: 300 }}
          >
            <textarea
              value={form.summary}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("summary", e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="A concise excerpt that tells readers exactly what this article covers…"
              className={`${errors.summary ? errorInputCls : inputCls} resize-y`}
            />
          </Field>
        </SectionCard>

        {/* ─── Section 3: Content ──────────────────────────────────────────── */}
        <SectionCard number={3} title="Content">
          <RichContentEditor
            value={form.content}
            onChange={(v) => set("content", v)}
            onImageValidationChange={setImageValidation}
          />
        </SectionCard>

        {/* ─── Section 4: Images ───────────────────────────────────────────── */}
        <SectionCard number={4} title="Images">
          {/* Featured image */}
          <div className="mb-6">
            <p className="text-[12px] font-bold text-[#334155] mb-3">Featured Image</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field label="Image URL" hint="Upload an image or paste a URL / /images/… path">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.featuredImageUrl}
                    onChange={(e) => {
                      set("featuredImageUrl", e.target.value);
                      setImagePreview(false);
                    }}
                    placeholder="https://… or /images/…"
                    className={inputCls}
                  />
                  <CloudinaryUploader
                    onUploaded={(url) => {
                      set("featuredImageUrl", url);
                      setImagePreview(true);
                    }}
                  />
                  {form.featuredImageUrl && (
                    <button
                      type="button"
                      onClick={() => setImagePreview((p) => !p)}
                      className="shrink-0 px-3 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12px] font-semibold text-[#64748b] hover:border-[#1677f2] hover:text-[#1677f2] transition-colors"
                    >
                      {imagePreview ? "Hide" : "Preview"}
                    </button>
                  )}
                </div>
              </Field>
              <Field label="Alt Text" hint="Required for accessibility & SEO">
                <input
                  type="text"
                  value={form.featuredImageAlt}
                  onChange={(e) => set("featuredImageAlt", e.target.value)}
                  placeholder="Descriptive alt text"
                  className={inputCls}
                />
              </Field>
            </div>
            {imagePreview && form.featuredImageUrl && (
              <div className="rounded-xl overflow-hidden border border-[#dbe7f3] bg-[#f8fbff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.featuredImageUrl}
                  alt={form.featuredImageAlt || "preview"}
                  className="w-full h-40 object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
          </div>

          {/* Supporting images */}
          <div>
            <p className="text-[12px] font-bold text-[#334155] mb-3">
              Supporting Images
              <span className="ml-2 text-[11px] font-medium text-[#94a3b8]">
                ({form.supportingImages.length}/6)
              </span>
            </p>
            <div className="space-y-3">
              {form.supportingImages.map((img, i) => (
                <div key={i} className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] p-3.5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#1677f2]">Image {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSupportingImage(i)}
                      className="text-[11px] text-[#94a3b8] hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={img.url}
                        onChange={(e) => updateSupportingImage(i, { url: e.target.value })}
                        placeholder="Image URL"
                        className={`${inputCls} text-[12.5px] py-2`}
                      />
                      <CloudinaryUploader
                        size="sm"
                        onUploaded={(url) => updateSupportingImage(i, { url })}
                      />
                    </div>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => updateSupportingImage(i, { alt: e.target.value })}
                      placeholder="Alt text"
                      className={`${inputCls} text-[12.5px] py-2`}
                    />
                  </div>
                  {img.url && (
                    <div className="mt-2.5 overflow-hidden rounded-lg border border-[#dbe7f3] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.alt || "preview"}
                        className="h-28 w-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {form.supportingImages.length < 6 && (
              <button
                type="button"
                onClick={addSupportingImage}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#1677f2]/30 bg-[#f0faff] py-2.5 text-[13px] font-semibold text-[#1677f2] hover:border-[#1677f2] hover:bg-[#e8f7ff] transition-colors"
              >
                + Add Supporting Image
              </button>
            )}
          </div>
        </SectionCard>

        {/* ─── Section 5: SEO ──────────────────────────────────────────────── */}
        <SectionCard number={5} title="SEO">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Focus Keyword" hint="Primary keyword this article targets.">
              <input
                type="text"
                value={form.focusKeyword}
                onChange={(e) => set("focusKeyword", e.target.value)}
                placeholder="e.g. NBFC Registration India"
                className={inputCls}
              />
            </Field>
            <Field
              label="SEO Title"
              hint="Ideal: 50–60 characters."
              counter={{ current: form.seoTitle.length, max: 60 }}
            >
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
                placeholder="e.g. NBFC Registration: RBI Guide 2026 | Estabizz"
                className={inputCls}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="SEO Meta Description"
                hint="Ideal: 140–160 characters."
                counter={{ current: form.metaDescription.length, max: 160 }}
              >
                <textarea
                  value={form.metaDescription}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("metaDescription", e.target.value)}
                  rows={3}
                  placeholder="Step-by-step guide to NBFC registration in India…"
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Canonical URL" hint="Leave blank to use the default page URL.">
                <input
                  type="url"
                  value={form.canonicalUrl}
                  onChange={(e) => set("canonicalUrl", e.target.value)}
                  placeholder="https://estabizz.com/blogs/…"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* ─── Section 6: Author & Tags ─────────────────────────────────────── */}
        <SectionCard number={6} title="Author &amp; Tags">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Author">
              <EstabizzSelect
                variant="admin"
                value={form.authorId}
                onValueChange={(v) => set("authorId", v)}
                options={[
                  ...KNOWN_AUTHORS.map((a) => ({ value: a.id, label: a.display })),
                  { value: CUSTOM_AUTHOR_ID, label: "Custom…" },
                ]}
              />
              {form.authorId === CUSTOM_AUTHOR_ID && (
                <input
                  type="text"
                  value={form.customAuthorName ?? ""}
                  onChange={(e) => set("customAuthorName", e.target.value)}
                  placeholder="Enter author name (e.g. Parth Chauhan)"
                  className={`${inputCls} mt-2`}
                />
              )}
            </Field>
            <Field label="Tags" hint="Comma-separated. e.g. NBFC, RBI, Fintech">
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="NBFC, RBI, Registration, Fintech"
                className={inputCls}
              />
            </Field>
          </div>
        </SectionCard>

        {/* ─── Section 7: FAQs ─────────────────────────────────────────────── */}
        <SectionCard number={7} title="FAQs">
          <FaqEditor faqs={form.faqs} onChange={(faqs) => set("faqs", faqs)} />
        </SectionCard>

        {/* ─── Section 8: CTA & Disclaimer ─────────────────────────────────── */}
        <SectionCard number={8} title="CTA &amp; Disclaimer">
          <Field label="CTA Title">
            <input
              type="text"
              value={form.ctaTitle}
              onChange={(e) => set("ctaTitle", e.target.value)}
              placeholder="Need regulatory assistance?"
              className={inputCls}
            />
          </Field>
          <Field label="CTA Body">
            <textarea
              value={form.ctaBody}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("ctaBody", e.target.value)}
              rows={4}
              placeholder="Describe the service offer…"
              className={`${inputCls} resize-y`}
            />
          </Field>
          <Field
            label="Disclaimer"
            counter={{ current: form.disclaimer.length, max: 600 }}
          >
            <textarea
              value={form.disclaimer}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("disclaimer", e.target.value)}
              rows={3}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </SectionCard>

        {/* Extra bottom padding for sticky bar */}
        <div className="h-2" />
      </div>

      {/* ── Bottom sticky bar ──────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-[10000] bg-white dark:bg-[#0d1a2d] border-t border-[#e2e8f0] dark:border-[#223550] shadow-[0_-2px_8px_rgba(15,23,42,0.06)]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleDraft}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] text-[12.5px] font-semibold text-[#334155] dark:text-[#a9b6c9] hover:bg-[#f8fbff] dark:hover:bg-[#12223a] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save as Draft"}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={handleUpdate}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#1677f2] text-white text-[12.5px] font-bold hover:bg-[#0077B6] transition-all disabled:opacity-50 shadow-sm"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#1677f2] text-[#071224] text-[12.5px] font-bold hover:bg-[#c8921a] transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(217,169,56,0.25)]"
            >
              {saving ? "Publishing…" : "Publish"}
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
