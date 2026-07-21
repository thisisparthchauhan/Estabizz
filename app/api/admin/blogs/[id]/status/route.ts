/**
 * PATCH /api/admin/blogs/[id]/status
 *
 * Changes the workflow status of any blog (sample or user-submitted).
 *
 * Body: {
 *   status:       BlogStatus           — required
 *   adminNotes?:  string               — rejection reason or review notes
 *   reviewedBy?:  string               — admin display name
 * }
 *
 * TODO: Add JWT / session middleware to guard this endpoint.
 * TODO: When status → "published", optionally trigger:
 *   - SEO sitemap rebuild (next.js revalidatePath)
 *   - Email notification to the original submitter
 *   - Slack notification to the editorial channel
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminUpdateBlogStatus } from '@/lib/blog/repository';
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

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();
    const { status, adminNotes, reviewedBy } = body as {
      status: BlogStatus;
      adminNotes?: string;
      reviewedBy?: string;
    };

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    // ── Granular permission guard — enforced after status validation ──────────
    const auth = await requirePermission(req, STATUS_PERMISSION[status]);
    if (!auth.ok) return auth.response;

    const patch: Partial<import('@/lib/blog/types').Blog> = { status };

    if (adminNotes !== undefined)  patch.adminNotes  = adminNotes;
    if (reviewedBy  !== undefined) patch.reviewedBy  = reviewedBy;
    if (status === 'published')    patch.publishedAt = new Date().toISOString();

    const updated = await adminUpdateBlogStatus(id, patch);

    if (!updated) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

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
