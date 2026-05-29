"use client";

/**
 * PendingBlogsClient — admin review queue for user-submitted articles.
 *
 * Status transitions:
 *   pending_review → approved            (Approve)
 *   pending_review → published           (Approve & Publish)  ← becomes publicly visible
 *   pending_review → rejected            (Reject)
 *   pending_review → archived            (Archive)
 *   pending_review → draft               (Save as Draft)
 *   any            → (edit in editor)    (Edit →)
 *
 * All status changes call PATCH /api/admin/blogs/[id]/status.
 * The UI updates optimistically and rolls back on API error.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Blog, BlogStatus } from '@/lib/blog/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActionType =
  | 'approve'
  | 'publish'
  | 'reject'
  | 'archive'
  | 'draft'
  | 'delete';

interface ConfirmConfig {
  blogId: string;
  blogTitle: string;
  blogSlug: string;
  action: ActionType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_META: Record<
  BlogStatus,
  { label: string; dot: string; pill: string }
> = {
  draft:          { label: 'Draft',          dot: 'bg-slate-400',  pill: 'bg-slate-100 text-slate-600'    },
  pending_review: { label: 'Pending Review', dot: 'bg-amber-400',  pill: 'bg-amber-50 text-amber-700 border border-amber-200'  },
  approved:       { label: 'Approved',       dot: 'bg-blue-500',   pill: 'bg-blue-50 text-blue-700 border border-blue-200'     },
  published:      { label: 'Published',      dot: 'bg-emerald-500',pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  rejected:       { label: 'Rejected',       dot: 'bg-red-500',    pill: 'bg-red-50 text-red-700 border border-red-200'        },
  archived:       { label: 'Archived',       dot: 'bg-gray-400',   pill: 'bg-gray-100 text-gray-500'      },
};

const ACTION_CONFIG: Record<
  ActionType,
  {
    targetStatus: BlogStatus | null;
    label: string;
    confirmTitle: string;
    confirmDesc: string;
    confirmBtn: string;
    variant: 'danger' | 'warning' | 'success';
    requiresNote: boolean;
    notePlaceholder?: string;
  }
> = {
  approve: {
    targetStatus: 'approved',
    label: 'Approve',
    confirmTitle: 'Approve This Submission?',
    confirmDesc:
      'The article will be marked as approved but will not yet be publicly visible. You can publish it separately from the approved queue.',
    confirmBtn: 'Yes, Approve',
    variant: 'success',
    requiresNote: false,
  },
  publish: {
    targetStatus: 'published',
    label: 'Approve & Publish',
    confirmTitle: 'Publish to Regulatory Insights?',
    confirmDesc:
      'This will make the article publicly visible at /blogs/[slug] immediately. Ensure you have reviewed the content, title, category and SEO fields before publishing.',
    confirmBtn: 'Yes, Publish Now',
    variant: 'success',
    requiresNote: false,
  },
  reject: {
    targetStatus: 'rejected',
    label: 'Reject',
    confirmTitle: 'Reject This Submission?',
    confirmDesc:
      'The submission will be marked as rejected and will not appear publicly. The rejection reason will be recorded in admin notes.',
    confirmBtn: 'Reject Article',
    variant: 'danger',
    requiresNote: true,
    notePlaceholder: 'Reason for rejection (e.g. insufficient depth, promotional content, duplicate topic)…',
  },
  archive: {
    targetStatus: 'archived',
    label: 'Archive',
    confirmTitle: 'Archive This Submission?',
    confirmDesc:
      'The submission will be removed from the active review queue. It will remain accessible in the admin panel but will not appear publicly.',
    confirmBtn: 'Archive',
    variant: 'warning',
    requiresNote: false,
  },
  draft: {
    targetStatus: 'draft',
    label: 'Save as Draft',
    confirmTitle: 'Save as Draft?',
    confirmDesc:
      'The submission will be saved as a draft. You can edit and publish it later from the blog editor.',
    confirmBtn: 'Save as Draft',
    variant: 'warning',
    requiresNote: false,
  },
  delete: {
    targetStatus: null,
    label: 'Delete',
    confirmTitle: 'Permanently Delete?',
    confirmDesc:
      'This action cannot be undone. The submission and all associated data will be permanently removed.',
    confirmBtn: 'Delete Permanently',
    variant: 'danger',
    requiresNote: false,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (days  > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins  > 0) return `${mins}m ago`;
  return 'just now';
}

function wordCount(html: string): number {
  return html.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(html: string): number {
  return Math.max(1, Math.ceil(wordCount(html) / 238));
}

function initials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

function ConfirmModal({
  config,
  onConfirm,
  onCancel,
  loading,
}: {
  config: ConfirmConfig;
  onConfirm: (notes: string) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [notes, setNotes] = useState('');
  const ac = ACTION_CONFIG[config.action];
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ac.requiresNote) noteRef.current?.focus();
  }, [ac.requiresNote]);

  const iconMap: Record<typeof ac.variant, string> = {
    danger: '⚠',
    warning: '⚠',
    success: '✓',
  };
  const colorMap = {
    danger:  { ring: 'ring-red-100',    icon: 'bg-red-100 text-red-600',      btn: 'bg-red-600 hover:bg-red-700 text-white' },
    warning: { ring: 'ring-amber-100',  icon: 'bg-amber-100 text-amber-600',  btn: 'bg-amber-500 hover:bg-amber-600 text-white' },
    success: { ring: 'ring-[#d9a938]/20', icon: 'bg-[#d9a938]/15 text-[#b8860b]', btn: 'bg-[#d9a938] hover:bg-[#c9981f] text-[#071224]' },
  };
  const c = colorMap[ac.variant];

  return (
    <div className="fixed inset-0 z-[3100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className={`relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.3)] w-full max-w-[460px] ring-4 ${c.ring} overflow-hidden`}>
        <div className="p-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center text-lg font-black shrink-0`}>
              {iconMap[ac.variant]}
            </div>
            <div>
              <h3 className="text-[16px] font-black text-[#0a1628]">{ac.confirmTitle}</h3>
              <p className="text-[12.5px] text-[#334155] truncate mt-0.5 font-medium">
                &ldquo;{config.blogTitle}&rdquo;
              </p>
            </div>
          </div>

          <p className="text-[13.5px] text-[#475569] leading-relaxed mb-4">{ac.confirmDesc}</p>

          {/* Publish URL preview */}
          {config.action === 'publish' && (
            <div className="mb-4 rounded-xl border border-[#dbe7f3] bg-[#f8fbff] px-3.5 py-2.5">
              <p className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide mb-0.5">Public URL</p>
              <p className="text-[12.5px] font-mono text-[#0096D6] break-all">
                estabizz.com/blogs/{config.blogSlug}
              </p>
            </div>
          )}

          {/* Rejection notes */}
          {ac.requiresNote && (
            <div className="mb-4">
              <label className="text-[12px] font-semibold text-[#334155] mb-1.5 block">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={noteRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder={ac.notePlaceholder}
                className="w-full rounded-xl border border-[#dbe7f3] px-3.5 py-2.5 text-[13px] text-[#0a1628] placeholder:text-[#b0bec5] outline-none focus:border-[#0096D6] focus:ring-3 focus:ring-[#0096D6]/10 resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#f8fbff] border-t border-[#e2eaf2]">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-[#dbe7f3] bg-white text-[13px] font-semibold text-[#334155] hover:bg-[#f0f4f8] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading || (ac.requiresNote && !notes.trim())}
            onClick={() => onConfirm(notes)}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors disabled:opacity-50 flex items-center gap-2 ${c.btn}`}
          >
            {loading && (
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
            )}
            {ac.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Review Panel ─────────────────────────────────────────────────────────────

function ReviewPanel({
  blog,
  onClose,
  onAction,
}: {
  blog: Blog;
  onClose: () => void;
  onAction: (action: ActionType) => void;
}) {
  const wc = wordCount(blog.content);

  return (
    <div className="fixed inset-0 z-[3000] flex items-stretch">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm cursor-pointer" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-[820px] bg-white flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden">

        {/* Panel header */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[#e2eaf2] bg-[#fafcff] shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide ${STATUS_META[blog.status].pill}`}>
                {STATUS_META[blog.status].label}
              </span>
              {blog.isUserSubmitted && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200">
                  User Submitted
                </span>
              )}
              <span className="text-[11px] text-[#94a3b8]">{timeAgo(blog.createdAt)}</span>
            </div>
            <h2 className="text-[16px] font-black text-[#0a1628] leading-tight line-clamp-2">{blog.title}</h2>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-[#94a3b8] hover:text-[#0a1628] hover:bg-[#f0f4f8] transition-colors text-lg">✕</button>
        </div>

        {/* Panel body — scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">

            {/* Article content */}
            <div className="px-6 py-5 border-r border-[#e2eaf2]">
              {/* Summary */}
              {blog.summary && (
                <div className="mb-5 p-4 rounded-xl bg-[#f0faff] border border-[#c3e8fb]">
                  <p className="text-[11px] font-black uppercase tracking-wide text-[#0096D6] mb-1">Summary</p>
                  <p className="text-[13.5px] text-[#334155] leading-relaxed">{blog.summary}</p>
                </div>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { label: 'Words', value: wc },
                  { label: 'Read', value: `~${readingTime(blog.content)} min` },
                  { label: 'Category', value: blog.category.name },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-[#e2eaf2] px-3.5 py-2 bg-white">
                    <div className="text-[10px] font-black uppercase tracking-wide text-[#94a3b8]">{s.label}</div>
                    <div className="text-[13px] font-bold text-[#0a1628] mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Full content */}
              <div className="text-[12px] font-black uppercase tracking-wide text-[#94a3b8] mb-2">Full Content</div>
              <div
                className="blog-content text-[13.5px] leading-relaxed text-[#334155] border border-[#e2eaf2] rounded-xl p-4 bg-[#fafcff] max-h-[480px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Cover note */}
              {blog.submittedBy?.message && (
                <div className="mt-5 p-4 rounded-xl border border-[#e2eaf2] bg-[#f8fbff]">
                  <p className="text-[11px] font-black uppercase tracking-wide text-[#64748b] mb-1.5">Cover Note from Submitter</p>
                  <p className="text-[13px] text-[#475569] italic leading-relaxed">{blog.submittedBy.message}</p>
                </div>
              )}

              {/* Featured image */}
              {blog.featuredImage.url && (
                <div className="mt-5">
                  <p className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-2">Featured Image</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.featuredImage.url}
                    alt={blog.featuredImage.alt}
                    className="w-full max-h-48 object-cover rounded-xl border border-[#e2eaf2]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <p className="text-[11px] text-[#94a3b8] mt-1">Alt: {blog.featuredImage.alt || '—'}</p>
                </div>
              )}
            </div>

            {/* Submitter + admin sidebar */}
            <div className="px-5 py-5 space-y-5 bg-[#fafcff]">

              {/* Submitter info */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-[#0096D6] mb-3">Submitter</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white font-black text-[13px] shrink-0">
                    {initials(blog.author.firstName, blog.author.lastName)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#0a1628] truncate">
                      {blog.author.firstName} {blog.author.lastName}
                    </div>
                    <div className="text-[11.5px] text-[#64748b] truncate">{blog.author.designation || 'Guest Contributor'}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: '✉', label: blog.author.email },
                    { icon: '🏢', label: blog.submittedBy?.company || '—' },
                  ].map((r) => (
                    <div key={r.icon} className="flex items-start gap-2 text-[12px] text-[#475569]">
                      <span className="shrink-0 mt-0.5">{r.icon}</span>
                      <span className="break-all">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-2">SEO Fields</p>
                <div className="space-y-1.5 text-[12px]">
                  <div className="rounded-lg border border-[#e2eaf2] bg-white px-3 py-2">
                    <div className="text-[10px] text-[#94a3b8] font-bold uppercase">Focus Keyword</div>
                    <div className="text-[#334155] mt-0.5">{blog.focusKeyword || <span className="text-[#b0bec5] italic">Not set</span>}</div>
                  </div>
                  <div className="rounded-lg border border-[#e2eaf2] bg-white px-3 py-2">
                    <div className="text-[10px] text-[#94a3b8] font-bold uppercase">SEO Title</div>
                    <div className="text-[#334155] mt-0.5 leading-tight">{blog.seoTitle || <span className="text-[#b0bec5] italic">Not set</span>}</div>
                  </div>
                  <div className="rounded-lg border border-[#e2eaf2] bg-white px-3 py-2">
                    <div className="text-[10px] text-[#94a3b8] font-bold uppercase">Meta Description</div>
                    <div className="text-[#334155] mt-0.5 leading-tight line-clamp-2">{blog.metaDescription || <span className="text-[#b0bec5] italic">Not set</span>}</div>
                  </div>
                </div>
              </div>

              {/* Admin notes (read-only display if present) */}
              {blog.adminNotes && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
                  <p className="text-[10px] font-black uppercase tracking-wide text-amber-700 mb-1">Admin Notes</p>
                  <p className="text-[12.5px] text-amber-800 leading-relaxed">{blog.adminNotes}</p>
                </div>
              )}

              {/* Quick actions */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-[#94a3b8] mb-2">Quick Actions</p>
                <div className="space-y-2">
                  <button
                    onClick={() => { onClose(); onAction('publish'); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#d9a938] text-[#071224] text-[13px] font-bold hover:bg-[#c9981f] transition-all shadow-[0_4px_12px_rgba(217,169,56,0.25)]"
                  >
                    ✓ Approve &amp; Publish
                  </button>
                  <button
                    onClick={() => { onClose(); onAction('approve'); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#d9a938]/10 border border-[#d9a938]/40 text-[#b8860b] text-[13px] font-bold hover:bg-[#d9a938]/20 transition-colors"
                  >
                    ✓ Approve Only
                  </button>
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#dbe7f3] bg-white text-[#334155] text-[13px] font-semibold hover:border-[#0096D6] hover:text-[#0096D6] transition-colors"
                  >
                    ✎ Edit in Editor ↗
                  </Link>
                  <button
                    onClick={() => { onClose(); onAction('reject'); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold hover:bg-red-100 transition-colors"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel footer */}
        <div className="px-6 py-3 border-t border-[#e2eaf2] bg-white shrink-0 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => { onClose(); onAction('draft'); }}
              className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-semibold text-[#334155] hover:bg-[#f8fbff] transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => { onClose(); onAction('archive'); }}
              className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-semibold text-[#94a3b8] hover:text-[#334155] hover:bg-[#f8fbff] transition-colors"
            >
              Archive
            </button>
          </div>
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-[#f0f4f8] text-[12.5px] font-semibold text-[#64748b] hover:bg-[#e2eaf2] transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error' | 'warning'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const cls = { success: 'bg-emerald-600', error: 'bg-red-600', warning: 'bg-amber-500' }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white text-[13.5px] font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.28)] ${cls}`}>
      <span>{type === 'success' ? '✓ ' : type === 'error' ? '✕ ' : '⚠ '}{msg}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 text-lg leading-none ml-1">×</button>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f0faff] border border-[#c3e8fb] flex items-center justify-center text-3xl mb-5">
        ✓
      </div>
      <h3 className="text-[18px] font-black text-[#0a1628] mb-2">All Clear</h3>
      <p className="text-[14px] text-[#64748b] max-w-[360px] leading-relaxed mb-6">
        No submissions are currently waiting for review. New user articles will appear here automatically.
      </p>
      <div className="flex gap-3">
        <Link href="/admin/blogs" className="px-5 py-2.5 rounded-xl border border-[#dbe7f3] bg-white text-[13px] font-semibold text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors">
          All Blogs
        </Link>
        <Link href="/submit-blog" target="_blank" className="px-5 py-2.5 rounded-xl bg-[#0096D6] text-white text-[13px] font-bold hover:bg-[#0077B6] transition-colors">
          Submit Test Article ↗
        </Link>
      </div>
    </div>
  );
}

// ─── Blog row card ────────────────────────────────────────────────────────────

function BlogCard({
  blog,
  onReview,
  onAction,
  processing,
}: {
  blog: Blog;
  onReview: () => void;
  onAction: (action: ActionType) => void;
  processing: boolean;
}) {
  const wc  = wordCount(blog.content);
  const sm  = STATUS_META[blog.status];

  return (
    <div className={`bg-white rounded-2xl border border-[#e2eaf2] shadow-[0_2px_10px_rgba(10,22,40,0.05)] overflow-hidden transition-all ${processing ? 'opacity-50 pointer-events-none' : 'hover:shadow-[0_4px_20px_rgba(10,22,40,0.09)]'}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#f0f6ff]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] font-bold px-2.5 py-1 rounded-lg border border-[#dbe7f3] bg-[#f8fbff] text-[#0096D6]">
            {blog.category.icon} {blog.category.name}
          </span>
          <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide ${sm.pill}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-0.5 ${sm.dot}`} />
            {sm.label}
          </span>
          {blog.isUserSubmitted && (
            <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200">
              User Submitted
            </span>
          )}
        </div>
        <span className="text-[11.5px] text-[#94a3b8] whitespace-nowrap shrink-0">
          {timeAgo(blog.createdAt)}
        </span>
      </div>

      <div className="px-5 py-4">
        {/* Title */}
        <h3 className="text-[15.5px] font-black text-[#0a1628] leading-snug mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {/* Summary */}
        {blog.summary && (
          <p className="text-[13px] text-[#64748b] leading-relaxed mb-3 line-clamp-2">{blog.summary}</p>
        )}

        {/* Submitter row */}
        <div className="flex items-center gap-2.5 mb-4 p-2.5 rounded-xl bg-[#f8fbff] border border-[#eef4fb]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white text-[10px] font-black shrink-0">
            {initials(blog.author.firstName, blog.author.lastName)}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[12.5px] font-bold text-[#0a1628]">
              {blog.author.firstName} {blog.author.lastName}
            </span>
            {blog.author.designation && (
              <span className="text-[11.5px] text-[#64748b]"> · {blog.author.designation}</span>
            )}
          </div>
          <a
            href={`mailto:${blog.author.email}`}
            className="text-[11.5px] text-[#0096D6] hover:underline shrink-0 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {blog.author.email}
          </a>
        </div>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[11.5px] font-medium text-[#64748b] px-2.5 py-1 rounded-lg bg-[#f0f4f8]">
            {wc} words
          </span>
          <span className="text-[11.5px] font-medium text-[#64748b] px-2.5 py-1 rounded-lg bg-[#f0f4f8]">
            ~{readingTime(blog.content)} min read
          </span>
          {blog.featuredImage.url && (
            <span className="text-[11.5px] font-medium text-emerald-600 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
              ✓ Has image
            </span>
          )}
          {!blog.seoTitle && (
            <span className="text-[11.5px] font-medium text-amber-600 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">
              ⚠ No SEO title
            </span>
          )}
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReview}
            className="px-4 py-2 rounded-xl bg-[#0a1628] text-white text-[12.5px] font-bold hover:bg-[#1a2638] transition-colors shadow-sm"
          >
            Review
          </button>

          <Link
            href={`/admin/blogs/edit/${blog.id}`}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-semibold text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors"
          >
            Edit ↗
          </Link>

          <button
            onClick={() => onAction('approve')}
            className="px-4 py-2 rounded-xl border border-[#d9a938]/40 bg-[#d9a938]/10 text-[#b8860b] text-[12.5px] font-bold hover:bg-[#d9a938]/20 transition-colors"
          >
            Approve
          </button>

          <button
            onClick={() => onAction('publish')}
            className="px-4 py-2 rounded-xl bg-[#d9a938] text-[#071224] text-[12.5px] font-bold hover:bg-[#c9981f] transition-all shadow-[0_3px_10px_rgba(217,169,56,0.25)]"
          >
            Approve &amp; Publish
          </button>

          <button
            onClick={() => onAction('reject')}
            className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-[12.5px] font-bold hover:bg-red-100 transition-colors"
          >
            Reject
          </button>

          <button
            onClick={() => onAction('draft')}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-medium text-[#94a3b8] hover:text-[#334155] hover:bg-[#f8fbff] transition-colors"
          >
            Draft
          </button>

          <button
            onClick={() => onAction('archive')}
            className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-medium text-[#94a3b8] hover:text-[#334155] hover:bg-[#f8fbff] transition-colors"
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PendingBlogsClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [blogs, setBlogs]           = useState<Blog[]>(initialBlogs);
  const [reviewBlog, setReviewBlog] = useState<Blog | null>(null);
  const [confirm, setConfirm]       = useState<ConfirmConfig | null>(null);
  const [processing, setProcessing] = useState<Set<string>>(new Set());
  const [toast, setToast]           = useState<{ msg: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // ── Status update ──────────────────────────────────────────────────────────
  const updateStatus = useCallback(
    async (id: string, action: ActionType, adminNotes = '') => {
      const cfg = ACTION_CONFIG[action];
      if (!cfg.targetStatus) return; // delete not yet implemented

      setProcessing((p) => new Set(p).add(id));
      setConfirm(null);

      try {
        const res = await fetch(`/api/admin/blogs/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: cfg.targetStatus,
            adminNotes: adminNotes || undefined,
            reviewedBy: 'Admin',
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? 'Update failed.');
        }

        // Optimistic: remove from pending queue (they're no longer pending_review)
        setBlogs((prev) => prev.filter((b) => b.id !== id));

        const labels: Record<ActionType, string> = {
          approve: 'Article approved.',
          publish: 'Article published — now live at /blogs.',
          reject:  'Article rejected.',
          archive: 'Article archived.',
          draft:   'Saved as draft.',
          delete:  'Deleted.',
        };
        setToast({ msg: labels[action], type: action === 'reject' || action === 'archive' ? 'warning' : 'success' });

      } catch (err) {
        setToast({ msg: err instanceof Error ? err.message : 'Action failed.', type: 'error' });
      } finally {
        setProcessing((p) => {
          const next = new Set(p);
          next.delete(id);
          return next;
        });
      }
    },
    []
  );

  // ── Initiate action (shows confirm modal if needed) ────────────────────────
  function initiateAction(blog: Blog, action: ActionType) {
    const NEEDS_CONFIRM: ActionType[] = ['publish', 'reject', 'archive', 'delete'];
    if (NEEDS_CONFIRM.includes(action)) {
      setConfirm({ blogId: blog.id, blogTitle: blog.title, blogSlug: blog.slug, action });
    } else {
      updateStatus(blog.id, action);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  const pending  = blogs.filter((b) => b.status === 'pending_review');
  const total    = initialBlogs.length;

  return (
    <>
      <div className="min-h-full bg-[#f0f4f8]">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="bg-white border-b border-[#e2eaf2] px-6 py-5">
          <div className="max-w-[1200px] mx-auto flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[20px] font-black text-[#0a1628]">Pending Review</h1>
                {pending.length > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-black">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    {pending.length} awaiting
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[#64748b]">
                User-submitted articles requiring editorial review before publication.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/submit-blog"
                target="_blank"
                className="px-4 py-2 rounded-xl border border-[#dbe7f3] bg-white text-[12.5px] font-semibold text-[#334155] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors"
              >
                Submit Page ↗
              </Link>
              <Link
                href="/admin/blogs"
                className="px-4 py-2 rounded-xl bg-[#0a1628] text-white text-[12.5px] font-bold hover:bg-[#1a2638] transition-colors"
              >
                All Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats row ───────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Pending Review', value: pending.length,                           color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200'   },
              { label: 'Total Received', value: total,                                    color: 'text-[#0096D6]',  bg: 'bg-[#f0faff] border-[#c3e8fb]'  },
              { label: 'This Session',   value: blogs.filter(b => b.status !== 'pending_review').length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
              { label: 'Avg. Words',     value: pending.length > 0 ? Math.round(pending.reduce((s, b) => s + wordCount(b.content), 0) / pending.length) : '—', color: 'text-[#0a1628]', bg: 'bg-white border-[#e2eaf2]' },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border ${s.bg} px-5 py-4`}>
                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[#94a3b8] mb-1">{s.label}</div>
                <div className={`text-[28px] font-black ${s.color} leading-none`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* ── Submissions list ──────────────────────────────────────── */}
          {pending.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-[#64748b]">
                  {pending.length} submission{pending.length !== 1 ? 's' : ''} awaiting review
                </p>
                <p className="text-[11.5px] text-[#94a3b8]">Newest first</p>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {pending.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onReview={() => setReviewBlog(blog)}
                    onAction={(action) => initiateAction(blog, action)}
                    processing={processing.has(blog.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Review panel ────────────────────────────────────────────────── */}
      {reviewBlog && (
        <ReviewPanel
          blog={reviewBlog}
          onClose={() => setReviewBlog(null)}
          onAction={(action) => initiateAction(reviewBlog, action)}
        />
      )}

      {/* ── Confirm modal ───────────────────────────────────────────────── */}
      {confirm && (
        <ConfirmModal
          config={confirm}
          loading={processing.has(confirm.blogId)}
          onConfirm={(notes) => updateStatus(confirm.blogId, confirm.action, notes)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Toast ───────────────────────────────────────────────────────── */}
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
