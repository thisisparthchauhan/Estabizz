import { NextResponse } from 'next/server';
import { findBlogBySlug, updateBlog, deleteBlog } from '@/lib/models/Blog';
import { findUserById } from '@/lib/models/User';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const blog = await findBlogBySlug(slug);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Populate author
        if (!blog.author) {
            const author = await findUserById(blog.authorId);
            if (author) {
                blog.author = {
                    firstName: author.firstName,
                    lastName: author.lastName,
                    profileImage: author.profileImage,
                };
            }
        }

        const user = await getCurrentUser();
        const isAuthor = user && blog.authorId === user.id;
        const isAdmin = user && user.role === 'admin';

        if (blog.status !== 'published' && !isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Increment views
        await updateBlog(blog.id, { views: (blog.views || 0) + 1 });

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

        const { slug } = await params;
        const blog = await findBlogBySlug(slug);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const isAuthor = blog.authorId === user.id;
        const isAdmin = user.role === 'admin';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const updates: Record<string, unknown> = {};

        if (body.title) updates.title = body.title;
        if (body.content) updates.content = body.content;
        if (body.excerpt) updates.excerpt = body.excerpt;
        if (body.coverImage) updates.coverImage = body.coverImage;
        if (body.images) updates.images = body.images;
        if (body.category) updates.category = body.category;
        if (body.tags) updates.tags = body.tags;

        if (isAuthor && !isAdmin && blog.status === 'rejected') {
            updates.status = 'pending';
            updates.rejectionReason = null;
        }

        await updateBlog(blog.id, updates);
        return NextResponse.json({ blog: { ...blog, ...updates } });
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

        const { slug } = await params;
        const blog = await findBlogBySlug(slug);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const isAuthor = blog.authorId === user.id;
        const isAdmin = user.role === 'admin';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await deleteBlog(blog.id);
        return NextResponse.json({ message: 'Blog deleted' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
