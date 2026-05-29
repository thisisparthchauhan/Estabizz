import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/blogService";

export async function GET() {
    try {
        const blogs = await getPublishedBlogs({ limit: 4 });
        return NextResponse.json({
            success: true,
            data: blogs.map((blog) => ({
                _id: blog._id,
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.summary,
                coverImage: blog.featuredImage?.url || "",
                category: blog.category,
                tags: blog.tags,
                author: {
                    firstName: blog.authorName.split(" ")[0] || "Estabizz",
                    lastName: blog.authorName.split(" ").slice(1).join(" "),
                },
                likeCount: 0,
                views: blog.views,
                publishedAt: blog.publishedAt || blog.createdAt,
            })),
            blogs: blogs.map((blog) => ({
                _id: blog._id,
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.summary,
                coverImage: blog.featuredImage?.url || "",
                category: blog.category,
                tags: blog.tags,
                author: {
                    firstName: blog.authorName.split(" ")[0] || "Estabizz",
                    lastName: blog.authorName.split(" ").slice(1).join(" "),
                },
                likeCount: 0,
                views: blog.views,
                publishedAt: blog.publishedAt || blog.createdAt,
            })),
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Unable to fetch featured blogs",
                data: [],
                blogs: [],
            },
            { status: 500 }
        );
    }
}
