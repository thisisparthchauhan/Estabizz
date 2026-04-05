import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        await requireAdmin();
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const query: Record<string, unknown> = {};
        if (status) query.status = status;

        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Blog.countDocuments(query),
        ]);

        const counts = await Blog.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        const statusCounts: Record<string, number> = {};
        counts.forEach((c) => {
            statusCounts[c._id] = c.count;
        });

        return NextResponse.json({
            blogs,
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
