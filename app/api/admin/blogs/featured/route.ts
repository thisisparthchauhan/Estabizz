import { NextResponse } from 'next/server';
import { getFeaturedBlogs, clearAllFeatured, updateBlog } from '@/lib/models/Blog';
import { findUserById } from '@/lib/models/User';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    try {
        const featured = await getFeaturedBlogs();

        // Populate authors
        const blogsWithAuthors = await Promise.all(
            featured.map(async (blog) => {
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
                return blog;
            })
        );

        return NextResponse.json({ blogs: blogsWithAuthors });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch featured blogs' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await requireAdmin();

        const { blogIds } = await request.json();

        if (!Array.isArray(blogIds) || blogIds.length > 4) {
            return NextResponse.json(
                { error: 'Provide up to 4 blog IDs' },
                { status: 400 }
            );
        }

        await clearAllFeatured();

        for (let i = 0; i < blogIds.length; i++) {
            await updateBlog(blogIds[i], {
                featured: true,
                featuredOrder: i + 1,
            });
        }

        return NextResponse.json({ message: 'Featured blogs updated' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized' || message === 'Forbidden') {
            return NextResponse.json({ error: message }, { status: 403 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
