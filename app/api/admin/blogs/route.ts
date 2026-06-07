import { NextRequest, NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import { createAdminBlog, getAdminBlogStats, listAdminBlogs } from "@/lib/blogService";
import { validateBlogImages } from "@/lib/blogSecurity";

export async function GET(req: NextRequest) {
    const { response } = await requireAdminRequest(req);
    if (response) return response;

    try {
        const { searchParams } = new URL(req.url);
        const [blogs, stats] = await Promise.all([
            listAdminBlogs({
                status: (searchParams.get("status") || "All") as never,
                category: searchParams.get("category") || "All",
                query: searchParams.get("q") || "",
            }),
            getAdminBlogStats(),
        ]);

        return NextResponse.json({ blogs, stats });
    } catch (error) {
        console.error("Admin blogs list failed:", error);
        return NextResponse.json(
            { error: "Unable to load blogs. Please check MongoDB configuration." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const { admin, response } = await requireAdminRequest(req);
    if (response) return response;

    try {
        const payload = await req.json();
        const imageError = validateBlogImages([payload.featuredImage, ...(payload.inlineImages || [])]);
        if (imageError) return NextResponse.json({ error: imageError }, { status: 413 });

        const blog = await createAdminBlog({
            ...payload,
            authorName: payload.authorName || `${admin?.firstName || "Estabizz"} ${admin?.lastName || "Admin"}`.trim(),
            authorEmail: payload.authorEmail || admin?.email,
        });

        return NextResponse.json({ blog }, { status: 201 });
    } catch (error) {
        console.error("Admin blog create failed:", error);
        return NextResponse.json(
            { error: "Unable to create blog. Check required fields and database configuration." },
            { status: 500 }
        );
    }
}
