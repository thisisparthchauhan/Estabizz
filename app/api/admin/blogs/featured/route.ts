import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();

        const featured = await Blog.find({ featured: true, status: 'published' })
            .populate('author', 'firstName lastName profileImage')
            .sort({ featuredOrder: 1 })
            .limit(4)
            .lean();

        return NextResponse.json({ blogs: featured });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch featured blogs' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await requireAdmin();
        await connectDB();

        const { blogIds } = await request.json();

        if (!Array.isArray(blogIds) || blogIds.length > 4) {
            return NextResponse.json(
                { error: 'Provide up to 4 blog IDs' },
                { status: 400 }
            );
        }

        await Blog.updateMany({}, { featured: false, featuredOrder: undefined });

        for (let i = 0; i < blogIds.length; i++) {
            await Blog.findByIdAndUpdate(blogIds[i], {
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
