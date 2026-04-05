import { NextResponse } from 'next/server';
import { findBlogById, updateBlog, deleteBlog } from '@/lib/models/Blog';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const { id } = await params;

        const body = await request.json();
        const { status, rejectionReason } = body;

        const blog = await findBlogById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const updates: Record<string, unknown> = {};

        if (status === 'published') {
            updates.status = 'published';
            updates.publishedAt = blog.publishedAt || new Date().toISOString();
            updates.rejectionReason = null;
        } else if (status === 'rejected') {
            updates.status = 'rejected';
            updates.rejectionReason = rejectionReason || 'Does not meet publishing criteria';
        } else if (status === 'hidden') {
            updates.status = 'hidden';
        } else if (status === 'pending') {
            updates.status = 'pending';
        }

        await updateBlog(id, updates);
        return NextResponse.json({ blog: { ...blog, ...updates } });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized' || message === 'Forbidden') {
            return NextResponse.json({ error: message }, { status: 403 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const { id } = await params;

        await deleteBlog(id);
        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized' || message === 'Forbidden') {
            return NextResponse.json({ error: message }, { status: 403 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
