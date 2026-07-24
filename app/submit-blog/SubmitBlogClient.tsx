"use client";

/**
 * SubmitBlogClient — public article submission form for /submit-blog
 *
 * On submit: POSTs to /api/submit-blog → status set to "pending_review"
 * → stored in submissionStore (mock) → not publicly visible → appears in admin queue.
 *
 * TODO (API wiring): The fetch('/api/submit-blog', …) call is real.
 *   Wire the API route to MongoDB / Supabase to persist submissions permanently.
 */

import React, {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import Link from 'next/link';
import type { BlogCategory } from '@/lib/blog/types';
import { EstabizzSelect } from '@/components/ui/EstabizzSelect';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  designation: string;
  company: string;
  title: string;
  categoryId: string;
  summary: string;
  content: string;
  coverNote: string;
  featuredImageUrl: string;
  supportingImageUrls: string[];
  declaration: boolean;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  title?: string;
  content?: string;
  categoryId?: string;
  declaration?: string;
  [key: string]: string | undefined;
}

type Step = 'form' | 'submitting' | 'success';

// ─── Constants ────────────────────────────────────────────────────────────────

const DECLARATION_TEXT =
  'I confirm that the content submitted by me is original, does not infringe any third-party rights, and may be reviewed, edited, approved, rejected or published by Estabizz Fintech Private Limited at its sole discretion.';

const INITIAL_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  designation: '',
  company: '',
  title: '',
  categoryId: '',
  summary: '',
  content: '',
  coverNote: '',
  featuredImageUrl: '',
  supportingImageUrls: [''],
  declaration: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(form: FormData): FormErrors {
  const e: FormErrors = {};
  if (!form.firstName.trim())  e.firstName  = 'Full name is required.';
  if (!form.email.trim())      e.email      = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Please enter a valid email address.';
  if (!form.title.trim())      e.title      = 'Article title is required.';
  if (!form.content.trim())    e.content    = 'Article content is required.';
  if (!form.categoryId)        e.categoryId = 'Please select a category.';
  if (!form.declaration)       e.declaration = 'You must accept the declaration to submit.';
  return e;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(wordCount(text) / 238));
}

// ─── Small UI primitives ──────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-xl border border-[#dbe7f3] bg-white px-4 py-3 text-[14px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none transition-all focus:border-[#1677f2] focus:ring-3 focus:ring-[#1677f2]/10';

const errorInputCls =
  'w-full rounded-xl border border-red-300 bg-red-50/40 px-4 py-3 text-[14px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none transition-all focus:border-red-400 focus:ring-3 focus:ring-red-200/30';

function FieldGroup({
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
  counter?: { current: number; max: number; warn?: number };
  children: React.ReactNode;
}) {
  const overMax  = counter && counter.current > counter.max;
  const nearMax  = counter && !overMax && counter.warn && counter.current >= counter.warn;

  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[13px] font-semibold text-[#1e293b]">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {counter && (
          <span className={`text-[11.5px] font-mono tabular-nums ${overMax ? 'text-red-500' : nearMax ? 'text-amber-500' : 'text-[#94a3b8]'}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 text-[12px] text-red-500 flex items-center gap-1.5">
          <span className="shrink-0">⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-[11.5px] text-[#94a3b8] leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function FormSection({
  step,
  title,
  subtitle,
  icon,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2eaf2] shadow-[0_2px_12px_rgba(10,22,40,0.06)] overflow-hidden">
      <div className="flex items-start gap-3.5 px-6 py-4 border-b border-[#f0f6ff] bg-[#fafcff]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1677f2] to-[#0a1628] flex items-center justify-center text-white font-black text-[13px] shrink-0 mt-0.5">
          {step}
        </div>
        <div>
          <h3 className="text-[14.5px] font-black text-[#0a1628]">{title}</h3>
          {subtitle && <p className="text-[12px] text-[#64748b] mt-0.5">{subtitle}</p>}
        </div>
        <span className="ml-auto text-[22px] shrink-0 opacity-60">{icon}</span>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─── Supporting image rows ────────────────────────────────────────────────────

function SupportingImages({
  urls,
  onChange,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  function update(i: number, val: string) {
    const next = [...urls];
    next[i] = val;
    onChange(next);
  }

  function add() {
    if (urls.length < 6) onChange([...urls, '']);
  }

  function remove(i: number) {
    onChange(urls.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2.5">
      {urls.map((url, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Supporting image ${i + 1} URL — https://…`}
            className={`${inputCls} text-[13px] py-2.5`}
          />
          {urls.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 px-3 rounded-xl border border-[#dbe7f3] text-[#94a3b8] hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors text-[13px]"
              aria-label="Remove image"
            >✕</button>
          )}
        </div>
      ))}

      {urls.length < 6 && (
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#1677f2] hover:text-[#0077B6] transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add another image URL
        </button>
      )}

      {/*
        TODO: Replace URL fields with file input:
        <input type="file" accept="image/*" multiple onChange={handleMultiUpload} />
        Upload each file to /api/upload → Cloudinary / S3 / /public/images/blog/
        Ref: see app/api/upload/route.ts (to be created)
      */}
      <p className="text-[11px] text-[#94a3b8] italic">
        File upload coming soon. Please provide publicly accessible image URLs for now.
      </p>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ title }: { title: string }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fbff] flex items-center justify-center px-4 py-16">
      <div className="max-w-[580px] w-full text-center">
        {/* Check icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] flex items-center justify-center shadow-[0_16px_48px_rgba(0,150,214,0.25)]">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[12px] font-black uppercase tracking-[0.14em] mb-5">
          Submission Received
        </div>

        <h1 className="text-[28px] font-black text-[#0a1628] leading-tight mb-4">
          Thank you for your submission.
        </h1>

        <div className="bg-white rounded-2xl border border-[#e2eaf2] shadow-[0_4px_20px_rgba(10,22,40,0.07)] p-6 mb-8 text-left">
          <p className="text-[14.5px] text-[#334155] leading-relaxed mb-4">
            Your article <strong className="text-[#0a1628]">&ldquo;{title}&rdquo;</strong> has been submitted for editorial review.
          </p>
          <p className="text-[14px] text-[#475569] leading-relaxed">
            Thank you. Your article has been submitted for editorial review. Our team will review the content and publish it after approval, if found suitable.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { step: '1', label: 'Received',    sub: 'Your article is in our queue',  color: 'bg-[#1677f2]',  done: true  },
            { step: '2', label: 'Under Review', sub: 'Editorial review in progress',  color: 'bg-amber-400', done: false },
            { step: '3', label: 'Decision',     sub: 'Publish or feedback from team', color: 'bg-[#10b981]', done: false },
          ].map((s) => (
            <div key={s.step} className={`rounded-xl border p-3.5 text-center ${s.done ? 'border-[#1677f2]/30 bg-[#f0faff]' : 'border-[#e2eaf2] bg-white'}`}>
              <div className={`mx-auto mb-2 w-7 h-7 rounded-full ${s.done ? s.color : 'bg-[#e2eaf2]'} flex items-center justify-center text-[11px] font-black ${s.done ? 'text-white' : 'text-[#94a3b8]'}`}>
                {s.done ? '✓' : s.step}
              </div>
              <div className="text-[12px] font-bold text-[#0a1628]">{s.label}</div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0a1628] text-white text-[14px] font-bold hover:bg-[#1a2638] transition-colors"
          >
            Browse Regulatory Insights →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#dbe7f3] bg-white text-[14px] font-semibold text-[#334155] hover:border-[#1677f2] hover:text-[#1677f2] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SubmitBlogClient({ categories }: { categories: BlogCategory[] }) {
  const [form, setForm]         = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors]     = useState<FormErrors>({});
  const [touched, setTouched]   = useState(false);
  const [step, setStep]         = useState<Step>('form');
  const [serverError, setServerError] = useState('');
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  // ── Field helpers ──────────────────────────────────────────────────────────
  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched) setErrors(validate(next));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setField(name as keyof FormData, value);
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    setServerError('');

    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Scroll to first error field
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return;
    }

    setStep('submitting');

    try {
      const res = await fetch('/api/submit-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          supportingImageUrls: form.supportingImageUrls.filter((u) => u.trim()),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setStep('success');
    } catch (err) {
      setStep('form');
      setServerError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ── Success screen ─────────────────────────────────────────────────────────
  if (step === 'success') {
    return <SuccessScreen title={form.title} />;
  }

  const wc = wordCount(form.content);

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8fbff]">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="pt-[64px]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#071224] via-[#0a1e3c] to-[#0a2952]">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-[-10%] top-[-10%] w-[480px] h-[480px] rounded-full bg-[#1677f2]/14 blur-[120px]" />
            <div className="absolute right-[-6%] bottom-[-10%] w-[420px] h-[420px] rounded-full bg-[#1677f2]/10 blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:52px_52px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-14 md:py-18 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1677f2]/30 bg-[#1677f2]/12 text-[#8edcff] text-[12px] font-black uppercase tracking-[0.2em] mb-6">
              ✍ Estabizz Regulatory Insights
            </div>

            <h1 className="text-[clamp(26px,4.5vw,46px)] font-black text-white leading-[1.1] tracking-tight mb-5 max-w-[820px] mx-auto">
              Submit Your Article to<br className="hidden sm:block" />
              {' '}Estabizz Regulatory Insights
            </h1>

            <p className="max-w-[680px] mx-auto text-[15.5px] text-white/66 leading-relaxed mb-10">
              Share professional insights on finance, compliance, fintech, corporate governance, regulatory updates or business licensing. Every submission is reviewed by the Estabizz editorial team before publication.
            </p>

            {/* Editorial process steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[700px] mx-auto">
              {[
                { n: '1', label: 'Submit Article',   sub: 'Fill the form below',              icon: '📝' },
                { n: '2', label: 'Editorial Review', sub: 'Reviewed within 5–7 working days', icon: '🔍' },
                { n: '3', label: 'Publication',      sub: 'Published on approval',             icon: '🚀' },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm text-left">
                  <div className="w-9 h-9 rounded-xl bg-[#1677f2]/25 border border-[#1677f2]/40 flex items-center justify-center text-[16px] shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-white">{s.label}</div>
                    <div className="text-[11.5px] text-white/50 mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Guidelines bar ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#e2eaf2] shadow-[0_1px_4px_rgba(10,22,40,0.05)]">
        <div className="mx-auto max-w-[1100px] px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5">
          {[
            { icon: '✓', text: 'Original, unpublished content only' },
            { icon: '✓', text: 'Minimum 600 words recommended' },
            { icon: '✓', text: 'Finance, compliance or regulatory focus' },
            { icon: '✓', text: 'No promotional or sales content' },
          ].map((g) => (
            <span key={g.text} className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#475569]">
              <span className="text-emerald-500 font-bold">{g.icon}</span> {g.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">

        {/* Server error banner */}
        {serverError && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <span className="text-red-500 text-lg shrink-0">⚠</span>
            <p className="text-[13.5px] font-semibold text-red-700">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ════════════════════════════════════════════
                LEFT COLUMN — Article content
            ════════════════════════════════════════════ */}
            <div className="space-y-5" ref={firstErrorRef}>

              {/* Section 1 — Article Details */}
              <FormSection step="A" title="Article Details" subtitle="Core article information visible to readers." icon="📄">
                <FieldGroup label="Article Title" required error={errors.title}>
                  <input
                    data-error={!!errors.title || undefined}
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. A Practical Guide to NBFC Account Aggregator Registration under RBI Framework"
                    maxLength={160}
                    className={errors.title ? errorInputCls : inputCls}
                  />
                </FieldGroup>

                <FieldGroup
                  label="Category"
                  required
                  error={errors.categoryId}
                  hint="Select the regulatory or compliance domain your article primarily covers."
                >
                  <EstabizzSelect
                    name="categoryId"
                    variant="public"
                    value={form.categoryId}
                    onValueChange={(v) =>
                      setForm((prev) => ({ ...prev, categoryId: v }))
                    }
                    placeholder="— Select a category —"
                    error={errors.categoryId}
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: `${cat.icon} ${cat.name}`,
                    }))}
                  />
                </FieldGroup>

                <FieldGroup
                  label="Article Summary"
                  hint="A 1–2 sentence excerpt shown on the listing page. Keep it specific and informative."
                  counter={{ current: form.summary.length, max: 220, warn: 190 }}
                >
                  <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    rows={3}
                    maxLength={220}
                    placeholder="Briefly describe what this article covers and why it matters to compliance professionals…"
                    className={`${inputCls} resize-y`}
                  />
                </FieldGroup>
              </FormSection>

              {/* Section 2 — Article Content */}
              <FormSection
                step="B"
                title="Article Content"
                subtitle="Write or paste your article. Plain text or basic HTML accepted."
                icon="✍"
              >
                <FieldGroup
                  label="Full Article Content"
                  required
                  error={errors.content}
                  hint="Minimum 400 words recommended. You may use basic HTML for headings and lists."
                >
                  <div className="space-y-1.5">
                    <textarea
                      data-error={!!errors.content || undefined}
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows={20}
                      placeholder={`Write your article here…\n\nYou may use plain text or basic HTML:\n  <h2>Section Title</h2>\n  <p>Paragraph text…</p>\n  <ul><li>Point 1</li><li>Point 2</li></ul>\n\nStructured articles with clear headings, practical insights and regulatory references perform best.`}
                      className={`${errors.content ? errorInputCls : inputCls} font-mono text-[13px] leading-relaxed resize-y`}
                    />
                    {/* Live stats bar */}
                    <div className="flex items-center justify-between px-1 text-[11.5px] text-[#94a3b8]">
                      <span>
                        <span className={wc < 400 ? 'text-amber-500 font-semibold' : 'text-emerald-600 font-semibold'}>
                          {wc} words
                        </span>
                        {wc < 400 && <span className="ml-1">(400 min. recommended)</span>}
                      </span>
                      <span>~{readingTime(form.content)} min read · {form.content.length} chars</span>
                    </div>
                  </div>
                </FieldGroup>
              </FormSection>

              {/* Section 3 — Cover Note (optional) */}
              <FormSection
                step="C"
                title="Cover Note to Editors"
                subtitle="Optional. Any context, angle or background that will help our editorial team."
                icon="💬"
              >
                <FieldGroup
                  label="Cover Note"
                  hint="Why is this article relevant now? Any conflicts of interest to disclose? Special context for the editorial team."
                >
                  <textarea
                    name="coverNote"
                    value={form.coverNote}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. I am writing this following the recent RBI Master Direction update on 12 May 2026, which significantly changes the NOF requirement…"
                    className={`${inputCls} resize-y`}
                  />
                </FieldGroup>
              </FormSection>

            </div>

            {/* ════════════════════════════════════════════
                RIGHT COLUMN — Submitter, Images, SEO
            ════════════════════════════════════════════ */}
            <div className="space-y-5">

              {/* Editorial Standards card */}
              <div className="rounded-2xl border border-[#dbe7f3] bg-gradient-to-br from-[#f0faff] to-[#f8fbff] p-5">
                <h4 className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1677f2] mb-3">
                  Editorial Standards
                </h4>
                <ul className="space-y-2">
                  {[
                    'Original analysis, not generic summaries',
                    'Cites specific acts, circulars or master directions',
                    'Practical guidance for compliance teams',
                    'Professional tone — no sales or marketing language',
                    'Minimum 400 words; 800+ preferred',
                    'No plagiarised or AI-generated boilerplate',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-[#334155]">
                      <span className="text-[#1677f2] font-bold shrink-0 mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* About You */}
              <FormSection step="1" title="About You" subtitle="Your details for author attribution." icon="👤">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <FieldGroup label="First Name" required error={errors.firstName}>
                    <input
                      data-error={!!errors.firstName || undefined}
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Arun"
                      className={`${errors.firstName ? errorInputCls : inputCls} text-[13px] py-2.5`}
                    />
                  </FieldGroup>
                  <FieldGroup label="Last Name">
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Sharma"
                      className={`${inputCls} text-[13px] py-2.5`}
                    />
                  </FieldGroup>
                </div>

                <FieldGroup label="Email Address" required error={errors.email}>
                  <input
                    data-error={!!errors.email || undefined}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@firm.com"
                    className={`${errors.email ? errorInputCls : inputCls} text-[13px] py-2.5`}
                    autoComplete="email"
                  />
                </FieldGroup>

                <FieldGroup label="Phone" hint="Optional. For editorial follow-up only.">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98XXX XXXXX"
                    className={`${inputCls} text-[13px] py-2.5`}
                  />
                </FieldGroup>

                <FieldGroup label="Designation / Role">
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="e.g. Compliance Officer, CS, CA, Fintech Consultant"
                    className={`${inputCls} text-[13px] py-2.5`}
                  />
                </FieldGroup>

                <FieldGroup label="Organisation / Firm">
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Estabizz Fintech Pvt. Ltd."
                    className={`${inputCls} text-[13px] py-2.5`}
                  />
                </FieldGroup>

                <FieldGroup label="LinkedIn Profile URL" hint="Shown on author attribution if published.">
                  <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className={`${inputCls} text-[13px] py-2.5`}
                  />
                </FieldGroup>
              </FormSection>

              {/* Featured Image */}
              <FormSection
                step="2"
                title="Featured Image"
                subtitle="Cover image shown at top of the article. Recommended: 1200×630 px."
                icon="🖼"
              >
                <FieldGroup
                  label="Featured Image URL"
                  hint="Paste a publicly accessible image URL. File upload will be available soon."
                >
                  <input
                    type="url"
                    name="featuredImageUrl"
                    value={form.featuredImageUrl}
                    onChange={handleChange}
                    placeholder="https://your-domain.com/image.jpg"
                    className={`${inputCls} text-[13px] py-2.5`}
                  />
                </FieldGroup>
                {/*
                  TODO: File upload button:
                  <input type="file" accept="image/*" onChange={handleFeaturedUpload} />
                  POST to /api/upload → returns { url: string }
                */}
              </FormSection>

              {/* Supporting Images */}
              <FormSection
                step="3"
                title="Supporting Images"
                subtitle="Optional inline images referenced in the article body. Max 6."
                icon="📸"
              >
                <SupportingImages
                  urls={form.supportingImageUrls}
                  onChange={(urls) => setField('supportingImageUrls', urls)}
                />
              </FormSection>

            </div>
            {/* end RIGHT COLUMN */}
          </div>

          {/* ── Declaration & Submit ──────────────────────────────────────── */}
          <div className="mt-6 bg-white rounded-2xl border border-[#e2eaf2] shadow-[0_2px_12px_rgba(10,22,40,0.06)] p-6">
            <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#0a1628] mb-4">
              Declaration
            </h3>

            <div
              data-error={!!errors.declaration || undefined}
              className={`rounded-xl border p-4 mb-5 transition-colors ${
                errors.declaration ? 'border-red-300 bg-red-50/30' : 'border-[#dbe7f3] bg-[#fafcff]'
              }`}
            >
              <label className="flex items-start gap-3.5 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={form.declaration}
                    onChange={(e) => setField('declaration', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    form.declaration ? 'bg-[#1677f2] border-[#1677f2]' : errors.declaration ? 'border-red-400 bg-white' : 'border-[#b0bec5] bg-white'
                  }`}>
                    {form.declaration && (
                      <svg viewBox="0 0 12 10" className="w-3 h-2.5 text-white" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5l3.5 3.5L11 1" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-[13.5px] text-[#334155] leading-relaxed">
                  <span className="font-semibold text-[#0a1628]">I declare that: </span>
                  {DECLARATION_TEXT}
                </p>
              </label>
            </div>

            {errors.declaration && (
              <p className="mb-4 text-[12.5px] text-red-500 flex items-center gap-1.5">
                <span>⚠</span> {errors.declaration}
              </p>
            )}

            {/* Note box */}
            <div className="rounded-xl border border-[#dbe7f3] bg-[#f8fbff] px-4 py-3 mb-6 text-[12.5px] text-[#64748b] leading-relaxed">
              <strong className="text-[#0a1628]">Please note:</strong> Submission does not guarantee publication.
              The Estabizz editorial team reviews all articles for quality, accuracy and alignment with our
              publication standards. You will be notified by email with the editorial decision.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blogs"
                className="text-[13.5px] font-semibold text-[#64748b] hover:text-[#1677f2] transition-colors"
              >
                ← Browse published articles first
              </Link>

              <button
                type="submit"
                disabled={step === 'submitting'}
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold text-[15px] hover:from-[#0077B6] hover:to-[#005f8f] transition-all shadow-[0_8px_24px_rgba(0,150,214,0.28)] disabled:opacity-60 disabled:cursor-not-allowed min-w-[200px]"
              >
                {step === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>Submit Article for Review →</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}
