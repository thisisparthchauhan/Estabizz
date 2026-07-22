/**
 * DELETE /api/admin/blogs/[id]
 *
 * Permanently deletes any blog (admin-created or user-submitted).
 * Requires delete_blog permission, enforced via requirePermission.
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminDeleteBlog } from '@/lib/blog/repository';
import { requirePermission } from '@/lib/admin/requirePermission';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const auth = await requirePermission(req, 'delete_blog');
    if (!auth.ok) return auth.response;

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required.' }, { status: 400 });
    }

    const removed = await adminDeleteBlog(id);
    if (!removed) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[admin/blogs/delete] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
