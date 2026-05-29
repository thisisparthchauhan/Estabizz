import { NextRequest, NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import { deleteAdminBlog, getAdminBlogById, updateAdminBlog } from "@/lib/blogService";
import { validateBlogImages } from "@/lib/blogSecurity";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { response } = requireAdminRequest(req);
    if (response) return response;

    try {
        const { id } = await context.params;
        const blog = await getAdminBlogById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found." }, { status: 404 });
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error("Admin blog detail failed:", error);
        return NextResponse.json({ error: "Unable to load blog." }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { response } = requireAdminRequest(req);
    if (response) return response;

    try {
        const { id } = await context.params;
        const payload = await req.json();
        const imageError = validateBlogImages([payload.featuredImage, ...(payload.inlineImages || [])]);
        if (imageError) return NextResponse.json({ error: imageError }, { status: 413 });

        const blog = await updateAdminBlog(id, payload);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found." }, { status: 404 });
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error("Admin blog update failed:", error);
        return NextResponse.json({ error: "Unable to update blog." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { response } = requireAdminRequest(req);
    if (response) return response;

    try {
        const { id } = await context.params;
        await deleteAdminBlog(id);
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Admin blog delete failed:", error);
        return NextResponse.json({ error: "Unable to delete blog." }, { status: 500 });
    }
}
