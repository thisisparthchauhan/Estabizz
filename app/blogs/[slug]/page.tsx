import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { getPublishedBlogBySlug, getRelatedBlogs } from "@/lib/blogService";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getPublishedBlogBySlug(slug);

    if (!blog) {
        return { title: "Blog not found | Estabizz Fintech" };
    }

    return {
        title: blog.seoTitle || blog.title,
        description: blog.metaDescription || blog.summary,
        alternates: { canonical: blog.canonicalUrl || `/blogs/${blog.slug}` },
        openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.metaDescription || blog.summary,
            type: "article",
            url: `https://estabizz-site.vercel.app/blogs/${blog.slug}`,
            images: blog.ogImage || blog.featuredImage?.url ? [blog.ogImage || blog.featuredImage!.url] : [],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getPublishedBlogBySlug(slug);

    if (!blog) notFound();

    const relatedBlogs = await getRelatedBlogs(blog, 3);
    return <BlogArticle blog={blog} relatedBlogs={relatedBlogs} />;
}
