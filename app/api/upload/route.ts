import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        await requireAuth();

        const { image } = await request.json();
        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const result = await uploadImage(image);
        return NextResponse.json({ url: result.url, publicId: result.publicId });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        if (message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
