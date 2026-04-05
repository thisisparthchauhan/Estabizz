import { NextResponse } from 'next/server';
import { createBlog, listBlogs } from '@/lib/models/Blog';
import { findUserById } from '@/lib/models/User';
import { getCurrentUser, requireAuth } from '@/lib/auth';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const category = searchParams.get('category') || undefined;
        const tag = searchParams.get('tag') || undefined;
        const myBlogs = searchParams.get('my') === 'true';

        let authorId: string | undefined;

        if (myBlogs) {
            const user = await getCurrentUser();
            if (!user) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            authorId = user.id;
        }

        const { blogs, total } = await listBlogs({
            status: myBlogs ? undefined : 'published',
            category,
            tag,
            authorId,
            page,
            limit,
        });

        // Populate author info
        const blogsWithAuthors = await Promise.all(
            blogs.map(async (blog) => {
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

        return NextResponse.json({
            blogs: blogsWithAuthors,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('List blogs error:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await requireAuth();

        const body = await request.json();
        const { title, content, excerpt, coverImage, images, category, tags } = body;

        if (!title || !content || !excerpt || !coverImage || !category) {
            return NextResponse.json(
                { error: 'Title, content, excerpt, cover image, and category are required' },
                { status: 400 }
            );
        }

        const slug = `${generateSlug(title)}-${Date.now()}`;
        const isAdmin = user.role === 'admin';

        const blog = await createBlog({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            images: images || [],
            category,
            tags: tags || [],
            authorId: user.id,
            author: {
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
            },
            status: isAdmin ? 'published' : 'pending',
            publishedAt: isAdmin ? new Date().toISOString() : undefined,
        });

        return NextResponse.json({ blog, slug: blog.slug }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create blog';
        if (message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
