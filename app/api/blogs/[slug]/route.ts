import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();
        const { slug } = await params;

        const blog = await Blog.findOne({ slug })
            .populate('author', 'firstName lastName profileImage')
            .lean();

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const user = await getCurrentUser();
        const isAuthor = user && blog.author._id.toString() === user._id.toString();
        const isAdmin = user && user.role === 'admin';

        if (blog.status !== 'published' && !isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        await Blog.updateOne({ slug }, { $inc: { views: 1 } });

        return NextResponse.json({ blog });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { slug } = await params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const isAuthor = blog.author.toString() === user._id.toString();
        const isAdmin = user.role === 'admin';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { title, content, excerpt, coverImage, images, category, tags } = body;

        if (title) blog.title = title;
        if (content) blog.content = content;
        if (excerpt) blog.excerpt = excerpt;
        if (coverImage) blog.coverImage = coverImage;
        if (images) blog.images = images;
        if (category) blog.category = category;
        if (tags) blog.tags = tags;

        if (isAuthor && !isAdmin && blog.status === 'rejected') {
            blog.status = 'pending';
            blog.rejectionReason = undefined;
        }

        await blog.save();
        return NextResponse.json({ blog });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update blog';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { slug } = await params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const isAuthor = blog.author.toString() === user._id.toString();
        const isAdmin = user.role === 'admin';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await Blog.deleteOne({ slug });
        return NextResponse.json({ message: 'Blog deleted' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
