import { NextResponse } from 'next/server';
import { listBlogs, getStatusCounts } from '@/lib/models/Blog';
import { findUserById } from '@/lib/models/User';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        await requireAdmin();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || undefined;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const [{ blogs, total }, statusCounts] = await Promise.all([
            listBlogs({ status, page, limit }),
            getStatusCounts(),
        ]);

        // Populate authors
        const blogsWithAuthors = await Promise.all(
            blogs.map(async (blog) => {
                if (!blog.author) {
                    const author = await findUserById(blog.authorId);
                    if (author) {
                        blog.author = {
                            firstName: author.firstName,
                            lastName: author.lastName,
                            profileImage: author.profileImage,
                            email: author.email,
                        };
                    }
                }
                return blog;
            })
        );

        return NextResponse.json({
            blogs: blogsWithAuthors,
            statusCounts,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed';
        if (message === 'Unauthorized' || message === 'Forbidden') {
            return NextResponse.json({ error: message }, { status: 403 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
