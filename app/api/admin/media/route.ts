import { NextRequest, NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import { connectDB } from "@/lib/db";
import Media from "@/lib/models/Media";
import { validateBlogImages } from "@/lib/blogSecurity";

export async function GET(req: NextRequest) {
    const { response } = requireAdminRequest(req);
    if (response) return response;

    try {
        await connectDB();
        const media = await Media.find().sort({ createdAt: -1 }).limit(100);
        return NextResponse.json({ media });
    } catch (error) {
        console.error("Media list failed:", error);
        return NextResponse.json({ error: "Unable to load media." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { response } = requireAdminRequest(req);
    if (response) return response;

    try {
        const payload = await req.json();
        if (!payload.url || !payload.alt) {
            return NextResponse.json({ error: "Image URL/data and alt text are required." }, { status: 400 });
        }
        const imageError = validateBlogImages([{ url: payload.url, alt: payload.alt, caption: payload.caption }]);
        if (imageError) return NextResponse.json({ error: imageError }, { status: 413 });

        await connectDB();
        const media = await Media.create({
            url: String(payload.url),
            alt: String(payload.alt),
            caption: payload.caption ? String(payload.caption) : undefined,
            fileName: payload.fileName ? String(payload.fileName) : undefined,
            mimeType: payload.mimeType ? String(payload.mimeType) : undefined,
            source: "admin",
        });

        return NextResponse.json({ media }, { status: 201 });
    } catch (error) {
        console.error("Media upload failed:", error);
        return NextResponse.json({ error: "Unable to save media." }, { status: 500 });
    }
}
