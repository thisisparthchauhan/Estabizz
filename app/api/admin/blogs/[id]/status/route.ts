/**
 * PATCH /api/admin/blogs/[id]/status
 *
 * Changes the workflow status of any blog (admin-created or user-submitted).
 *
 * Body: {
 *   status:       BlogStatus           — required
 *   adminNotes?:  string               — rejection reason or review notes
 *   reviewedBy?:  string               — admin display name
 * }
 *
 * Execution order (required):
 *   1. Authenticate admin (requireAdmin).
 *   2. Validate requested target status.
 *   3. Load blog from DB.
 *   4. Return 404 if not found.
 *   5. Validate current → requested transition via ALLOWED_TRANSITIONS.
 *   6. Return 409 for an invalid workflow transition.
 *   7. Enforce granular permission for the target action (requirePermission).
 *   8. Perform the database update.
 *   9. Return response.
 *
 * TODO: When status → "published", optionally trigger:
 *   - SEO sitemap rebuild (next.js revalidatePath)
 *   - Email notification to the original submitter
 *   - Slack notification to the editorial channel
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminUpdateBlogStatus, getBlogByIdForAdmin } from '@/lib/blog/repository';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { requirePermission } from '@/lib/admin/requirePermission';
import type { BlogStatus } from '@/lib/blog/types';
import type { AdminPermission } from '@/lib/admin/types';

const VALID_STATUSES: BlogStatus[] = [
  'draft',
  'pending_review',
  'approved',
  'published',
  'rejected',
  'archived',
];

// Each target status requires a specific granular permission.
// draft / pending_review are editorial state changes → edit_blog.
const STATUS_PERMISSION: Record<BlogStatus, AdminPermission> = {
  draft:          'edit_blog',
  pending_review: 'edit_blog',
  approved:       'approve_blog',
  published:      'publish_blog',
  rejected:       'reject_blog',
  archived:       'archive_blog',
};

// Allowed workflow transitions: currentStatus → permitted target statuses.
// Transitions not listed here are rejected with 409.
//
// Prohibited (skip or reverse workflow steps):
//   draft → published         (must go through review/approval first)
//   rejected → published      (must be reopened to draft and re-reviewed)
//   published → approved      (reversing approval makes no sense)
//   published → pending_review (same)
//   archived → published      (must be restored to draft and re-approved)
//   archived → approved       (same)
const ALLOWED_TRANSITIONS: Record<BlogStatus, BlogStatus[]> = {
  draft:          ['pending_review'],
  pending_review: ['approved', 'published', 'rejected', 'archived', 'draft'],
  approved:       ['published', 'rejected'],
  published:      ['archived'],
  rejected:       ['draft'],
  archived:       ['draft'],
};

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // 1. Authenticate — verify the caller is an admin before reading any record.
    const basicAuth = await requireAdmin(req);
    if (!basicAuth.ok) return basicAuth.response;

    const body = await req.json();
    const { status, adminNotes, reviewedBy } = body as {
      status: BlogStatus;
      adminNotes?: string;
      reviewedBy?: string;
    };

    // 2. Validate the requested target status.
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    // 3+4. Load the blog from DB and return 404 if it does not exist.
    const existing = await getBlogByIdForAdmin(id);
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    // 5+6. Validate the workflow transition.
    // Trust the status loaded from MongoDB — never rely on a client-provided current status.
    const allowedTargets = ALLOWED_TRANSITIONS[existing.status] ?? [];
    if (!allowedTargets.includes(status)) {
      return NextResponse.json(
        {
          error: 'Invalid blog status transition.',
          currentStatus: existing.status,
          requestedStatus: status,
        },
        { status: 409 }
      );
    }

    // 7. Enforce the granular permission required for the target action.
    const auth = await requirePermission(req, STATUS_PERMISSION[status]);
    if (!auth.ok) return auth.response;

    // 8. Build the patch and perform the database update.
    const patch: Partial<import('@/lib/blog/types').Blog> = { status };

    if (adminNotes !== undefined)  patch.adminNotes  = adminNotes;
    if (reviewedBy  !== undefined) patch.reviewedBy  = reviewedBy;
    if (status === 'published')    patch.publishedAt = new Date().toISOString();

    const updated = await adminUpdateBlogStatus(id, patch);

    if (!updated) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    // 9. Return the existing compatible response contract.
    // TODO: If status === 'published', revalidate public blog routes:
    // import { revalidatePath } from 'next/cache';
    // revalidatePath('/blogs');
    // revalidatePath(`/blogs/${updated.slug}`);

    return NextResponse.json({ success: true, id: updated.id, status: updated.status });

  } catch (err) {
    console.error('[admin/blogs/status] Error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
