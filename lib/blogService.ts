import { connectDB, getMongoUri } from "@/lib/db";
import Blog, { BlogStatus } from "@/lib/models/Blog";
import { blogToDTO, fallbackBlogs, normalizeBlogPayload, type BlogDTO } from "@/lib/blogUtils";

function canUseDatabase() {
    return Boolean(getMongoUri());
}

export async function getPublishedBlogs(options: { categorySlug?: string; query?: string; limit?: number } = {}) {
    if (!canUseDatabase()) {
        return fallbackBlogs
            .filter((blog) => !options.categorySlug || blog.categorySlug === options.categorySlug)
            .filter((blog) => {
                if (!options.query) return true;
                const haystack = `${blog.title} ${blog.summary} ${blog.category} ${blog.tags.join(" ")}`.toLowerCase();
                return haystack.includes(options.query.toLowerCase());
            })
            .slice(0, options.limit || fallbackBlogs.length);
    }

    try {
        await connectDB();
        const filter: Record<string, unknown> = { status: "Published" };

        if (options.categorySlug) filter.categorySlug = options.categorySlug;
        if (options.query) {
            filter.$or = [
                { title: { $regex: options.query, $options: "i" } },
                { summary: { $regex: options.query, $options: "i" } },
                { tags: { $regex: options.query, $options: "i" } },
            ];
        }

        const blogs = await Blog.find(filter)
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(options.limit || 50);

        return blogs.map(blogToDTO);
    } catch (error) {
        console.error("Published blog fetch failed:", error);
        return fallbackBlogs;
    }
}

export async function getPublishedBlogBySlug(slug: string) {
    if (!canUseDatabase()) {
        return fallbackBlogs.find((blog) => blog.slug === slug) || null;
    }

    try {
        await connectDB();
        const blog = await Blog.findOneAndUpdate(
            { slug, status: "Published" },
            { $inc: { views: 1 } },
            { new: true }
        );
        return blog ? blogToDTO(blog) : fallbackBlogs.find((item) => item.slug === slug) || null;
    } catch (error) {
        console.error("Blog detail fetch failed:", error);
        return fallbackBlogs.find((blog) => blog.slug === slug) || null;
    }
}

export async function getRelatedBlogs(blog: BlogDTO, limit = 3) {
    const all = await getPublishedBlogs({ limit: 20 });
    return all
        .filter((item) => item.slug !== blog.slug)
        .sort((a, b) => {
            const aScore = a.categorySlug === blog.categorySlug ? 1 : 0;
            const bScore = b.categorySlug === blog.categorySlug ? 1 : 0;
            return bScore - aScore;
        })
        .slice(0, limit);
}

export async function listAdminBlogs(options: { status?: BlogStatus | "All"; category?: string; query?: string } = {}) {
    await connectDB();
    const filter: Record<string, unknown> = {};

    if (options.status && options.status !== "All") filter.status = options.status;
    if (options.category && options.category !== "All") filter.category = options.category;
    if (options.query) {
        filter.$or = [
            { title: { $regex: options.query, $options: "i" } },
            { authorName: { $regex: options.query, $options: "i" } },
            { tags: { $regex: options.query, $options: "i" } },
            { focusKeyword: { $regex: options.query, $options: "i" } },
        ];
    }

    const blogs = await Blog.find(filter).sort({ updatedAt: -1 }).limit(250);
    return blogs.map(blogToDTO);
}

export async function getAdminBlogById(id: string) {
    await connectDB();
    const blog = await Blog.findById(id);
    return blog ? blogToDTO(blog) : null;
}

export async function createAdminBlog(payload: Partial<BlogDTO>) {
    await connectDB();
    const normalized = normalizeBlogPayload(payload, "admin");
    const blog = await Blog.create(normalized);
    return blogToDTO(blog);
}

export async function createUserSubmittedBlog(payload: Partial<BlogDTO>) {
    await connectDB();
    const normalized = normalizeBlogPayload({ ...payload, status: "Pending Review" }, "user");
    const blog = await Blog.create(normalized);
    return blogToDTO(blog);
}

export async function updateAdminBlog(id: string, payload: Partial<BlogDTO>) {
    await connectDB();
    const normalized = normalizeBlogPayload(payload, payload.source || "admin");
    const update: Record<string, unknown> = { ...normalized };

    if (normalized.status === "Published") update.publishedAt = payload.publishedAt || new Date();
    if (normalized.status === "Approved") update.approvedAt = new Date();
    if (normalized.status === "Rejected") update.rejectedAt = new Date();
    if (normalized.status === "Archived") update.archivedAt = new Date();

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    return blog ? blogToDTO(blog) : null;
}

export async function deleteAdminBlog(id: string) {
    await connectDB();
    await Blog.findByIdAndDelete(id);
}

export async function getAdminBlogStats() {
    await connectDB();
    const [total, published, draft, pending, rejected, archived] = await Promise.all([
        Blog.countDocuments(),
        Blog.countDocuments({ status: "Published" }),
        Blog.countDocuments({ status: "Draft" }),
        Blog.countDocuments({ status: "Pending Review" }),
        Blog.countDocuments({ status: "Rejected" }),
        Blog.countDocuments({ status: "Archived" }),
    ]);

    return { total, published, draft, pending, rejected, archived };
}
