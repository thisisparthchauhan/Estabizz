/**
 * DELETE /api/my-blogs/[id]
 *
 * Lets a logged-in user delete a blog THEY submitted. Ownership is enforced:
 * the blog's submittedBy.email (or author.email) must match the email in the
 * caller's verified JWT. Admins use /api/admin/blogs/[id] instead.
 */

import { NextRequest, NextResponse } from 'next/server';
import { deleteOwnBlog } from '@/lib/blog/repository';
import { getSessionEmailFromRequest } from '@/lib/auth/session';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const email = getSessionEmailFromRequest(req);
    if (!email) {
      return NextResponse.json({ error: 'Please sign in to manage your submissions.' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required.' }, { status: 400 });
    }

    const result = await deleteOwnBlog(id, email);

    if (result === 'not_found') {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }
    if (result === 'forbidden') {
      return NextResponse.json({ error: 'You can only delete your own submissions.' }, { status: 403 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[my-blogs/delete] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
