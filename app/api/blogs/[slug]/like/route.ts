import { NextResponse } from 'next/server';
import { findBlogBySlug, updateBlog } from '@/lib/models/Blog';
import { requireAuth } from '@/lib/auth';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await requireAuth();
        const { slug } = await params;

        const blog = await findBlogBySlug(slug);
        if (!blog || blog.status !== 'published') {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const userId = user.id;
        const likes = blog.likes || [];
        const hasLiked = likes.includes(userId);

        let newLikes: string[];
        if (hasLiked) {
            newLikes = likes.filter((id) => id !== userId);
        } else {
            newLikes = [...likes, userId];
        }

        await updateBlog(blog.id, {
            likes: newLikes,
            likeCount: newLikes.length,
        });

        return NextResponse.json({
            liked: !hasLiked,
            likeCount: newLikes.length,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized') {
            return NextResponse.json({ error: 'Login to like' }, { status: 401 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
