/**
 * Blog Repository — Data Access Layer
 *
 * Currently backed by static TypeScript sample data.
 *
 * HOW TO SWAP TO A REAL BACKEND (MongoDB / Supabase / PostgreSQL / Firebase):
 *   1. Keep every exported function signature exactly as-is.
 *   2. Replace the function body with your database/API call.
 *   3. Delete the static import of sampleBlogs once the database is seeded.
 *   4. All pages and API routes continue to work with zero changes.
 *
 * Pages and API routes should NEVER import sampleBlogs or blogCategories directly —
 * always go through this repository so the swap is a single-file change.
 */

import type { Blog, BlogCategory, BlogFilters, BlogPaginationOptions, BlogSummary, FeaturedBlogDTO } from './types';
import { sampleBlogs } from './sampleBlogs';
import { blogCategories } from './categories';
import { getSubmissions, updateSubmission } from './submissionStore';

// ─────────────────────────────────────────────────────────────────────────────
// Admin status-override map
//
// sampleBlogs is a static const (cannot be mutated at runtime).
// When an admin changes the status of a sample blog we store a thin patch here
// and merge it on every read.  This is a dev/mock pattern only.
//
// TODO: Remove this once the real database layer is wired — status changes
//       go directly to the DB and the static sample data is discarded.
// ─────────────────────────────────────────────────────────────────────────────
const _overrides = new Map<string, Partial<Blog>>();

function applyOverride(blog: Blog): Blog {
  const ov = _overrides.get(blog.id);
  return ov ? { ...blog, ...ov } : blog;
}

/** Returns all blogs from both the static sample set and the user-submission store. */
function allBlogs(): Blog[] {
  return [
    ...sampleBlogs.map(applyOverride),
    ...getSubmissions(),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

function applyFilters(blogs: Blog[], filters: BlogFilters): Blog[] {
  let result = [...blogs];

  if (filters.status) {
    result = result.filter((b) => b.status === filters.status);
  }
  if (filters.category) {
    result = result.filter((b) => b.category.slug === filters.category);
  }
  if (filters.tag) {
    result = result.filter((b) =>
      b.tags.some((t) => t.toLowerCase() === filters.tag!.toLowerCase())
    );
  }
  if (filters.featured !== undefined) {
    result = result.filter((b) => b.featured === filters.featured);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.category.name.toLowerCase().includes(q)
    );
  }

  return result;
}

function paginate<T>(items: T[], page = 1, limit = 10): T[] {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all published blogs, newest first.
 * Optional filters: category slug, tag, search term, pagination.
 */
export async function getPublishedBlogs(filters: BlogFilters = {}): Promise<Blog[]> {
  const base = applyFilters(allBlogs(), { ...filters, status: 'published' });
  const sorted = base.sort(
    (a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime()
  );
  return paginate(sorted, filters.page, filters.limit);
}

/**
 * Fetch blogs marked as featured (for the homepage FeaturedBlogs section).
 */
export async function getFeaturedBlogs(limit = 4): Promise<Blog[]> {
  const featured = allBlogs()
    .filter((b) => b.status === 'published' && b.featured)
    .sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime())
    .slice(0, limit);
  return featured;
}

/**
 * Fetch a single published blog by slug.
 * Returns null when not found (page should call notFound()).
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return allBlogs().find((b) => b.slug === slug && b.status === 'published') ?? null;
}

/**
 * Fetch blogs belonging to a specific category (by category slug).
 */
export async function getBlogsByCategory(
  categorySlug: string,
  options: BlogPaginationOptions = {}
): Promise<Blog[]> {
  return getPublishedBlogs({ category: categorySlug, ...options });
}

/**
 * Fetch all blogs — any status — for admin use.
 */
export async function getAllBlogsForAdmin(filters: BlogFilters = {}): Promise<Blog[]> {
  const base = applyFilters(allBlogs(), filters);
  const sorted = base.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return paginate(sorted, filters.page, filters.limit);
}

/**
 * Fetch a single blog by id — any status — for admin use.
 */
export async function getBlogByIdForAdmin(id: string): Promise<Blog | null> {
  return allBlogs().find((b) => b.id === id) ?? null;
}

/**
 * Return all user-submitted blogs with status pending_review.
 * Used by the admin pending-review queue at /admin/blogs/pending.
 */
export async function getPendingSubmissions(): Promise<Blog[]> {
  return allBlogs()
    .filter((b) => b.isUserSubmitted && b.status === 'pending_review')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Update status (and optional patch fields) on any blog — sample or user-submitted.
 *
 * TODO: Replace body with a real DB update once the database layer is wired.
 *   MongoDB  → Blog.findByIdAndUpdate(id, patch)
 *   Supabase → supabase.from('blogs').update(patch).eq('id', id)
 */
export function adminUpdateBlogStatus(id: string, patch: Partial<Blog>): Blog | null {
  const patchWithTs = { ...patch, updatedAt: new Date().toISOString() };

  // 1. Try user-submission store first
  const updated = updateSubmission(id, patchWithTs);
  if (updated) return updated;

  // 2. Fall back to the sample-blog override map
  const sample = sampleBlogs.find((b) => b.id === id);
  if (!sample) return null;
  const prev = _overrides.get(id) ?? {};
  _overrides.set(id, { ...prev, ...patchWithTs });
  return applyOverride(sample);
}

/**
 * Total count of published blogs matching optional filters.
 * Used for pagination controls on the listing page.
 */
export async function getPublishedBlogCount(
  filters: Omit<BlogFilters, 'page' | 'limit'> = {}
): Promise<number> {
  return applyFilters(sampleBlogs, { ...filters, status: 'published' }).length;
}

/**
 * Blogs related to a given blog: same category, excluding the current blog.
 */
export async function getRelatedBlogs(blogId: string, categoryId: string, limit = 3): Promise<Blog[]> {
  return sampleBlogs
    .filter(
      (b) => b.status === 'published' && b.id !== blogId && b.category.id === categoryId
    )
    .slice(0, limit);
}

/**
 * Return all categories.
 */
export async function getAllCategories(): Promise<BlogCategory[]> {
  return blogCategories;
}

/**
 * Return a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  return blogCategories.find((c) => c.slug === slug) ?? null;
}

/**
 * Lightweight blog summaries — strips content, faqs, images.
 * Useful for listing pages where the full content is not needed.
 */
export async function getPublishedBlogSummaries(filters: BlogFilters = {}): Promise<BlogSummary[]> {
  const blogs = await getPublishedBlogs(filters);
  return blogs.map(({ content: _c, faqs: _f, images: _i, ...rest }) => rest);
}

// ─────────────────────────────────────────────────────────────────────────────
// DTO transformer
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a full Blog to the FeaturedBlogDTO shape expected by
 * components/home/FeaturedBlogs.tsx.
 *
 * The API route at /api/admin/blogs/featured should call this before
 * returning data — keeping the component interface stable regardless of how
 * the Blog model evolves internally.
 */
export function toFeaturedBlogDTO(blog: Blog): FeaturedBlogDTO {
  return {
    _id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.summary,
    coverImage: blog.featuredImage.url,
    category: blog.category.name,
    tags: blog.tags,
    author: {
      firstName: blog.author.firstName,
      lastName: blog.author.lastName,
      profileImage: blog.author.profileImage,
    },
    likeCount: blog.likeCount,
    views: blog.views,
    publishedAt: blog.publishedAt ?? blog.createdAt,
  };
}
