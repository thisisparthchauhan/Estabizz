import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
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
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');
        const myBlogs = searchParams.get('my') === 'true';

        const query: Record<string, unknown> = {};

        if (myBlogs) {
            const user = await getCurrentUser();
            if (!user) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            query.author = user._id;
        } else {
            query.status = 'published';
        }

        if (category) query.category = category;
        if (tag) query.tags = tag;

        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'firstName lastName profileImage')
                .sort({ publishedAt: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Blog.countDocuments(query),
        ]);

        return NextResponse.json({
            blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await requireAuth();
        await connectDB();

        const body = await request.json();
        const { title, content, excerpt, coverImage, images, category, tags } = body;

        if (!title || !content || !excerpt || !coverImage || !category) {
            return NextResponse.json(
                { error: 'Title, content, excerpt, cover image, and category are required' },
                { status: 400 }
            );
        }

        let slug = generateSlug(title);
        const existing = await Blog.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const isAdmin = user.role === 'admin';

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            images: images || [],
            category,
            tags: tags || [],
            author: user._id,
            status: isAdmin ? 'published' : 'pending',
            publishedAt: isAdmin ? new Date() : undefined,
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
