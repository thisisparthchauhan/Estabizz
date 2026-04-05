import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { requireAuth } from '@/lib/auth';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await requireAuth();
        await connectDB();
        const { slug } = await params;

        const blog = await Blog.findOne({ slug, status: 'published' });
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const userId = user._id;
        const hasLiked = blog.likes.some(
            (id) => id.toString() === userId.toString()
        );

        if (hasLiked) {
            blog.likes = blog.likes.filter(
                (id) => id.toString() !== userId.toString()
            );
            blog.likeCount = Math.max(0, blog.likeCount - 1);
        } else {
            blog.likes.push(userId);
            blog.likeCount = blog.likes.length;
        }

        await blog.save();

        return NextResponse.json({
            liked: !hasLiked,
            likeCount: blog.likeCount,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized') {
            return NextResponse.json({ error: 'Login to like' }, { status: 401 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
