import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        await connectDB();
        const { id } = await params;

        const body = await request.json();
        const { status, rejectionReason } = body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        if (status === 'published') {
            blog.status = 'published';
            blog.publishedAt = blog.publishedAt || new Date();
            blog.rejectionReason = undefined;
        } else if (status === 'rejected') {
            blog.status = 'rejected';
            blog.rejectionReason = rejectionReason || 'Does not meet publishing criteria';
        } else if (status === 'hidden') {
            blog.status = 'hidden';
        } else if (status === 'pending') {
            blog.status = 'pending';
        }

        await blog.save();
        return NextResponse.json({ blog });
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
        await connectDB();
        const { id } = await params;

        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized' || message === 'Forbidden') {
            return NextResponse.json({ error: message }, { status: 403 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
