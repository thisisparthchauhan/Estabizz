/**
 * Blog Repository — Data Access Layer
 *
 * Reads from MongoDB when MONGODB_URI is set (production + dev with Atlas).
 * Falls back to the global in-memory store when MongoDB is unavailable.
 *
 * All exported function signatures are stable — swap the backend without
 * touching any page or API route.
 */

import type { Blog, BlogCategory, BlogFilters, BlogPaginationOptions, BlogSummary, FeaturedBlogDTO } from './types';
import { blogCategories } from './categories';
import { getSubmissions, updateSubmission, deleteSubmission } from './submissionStore';
import { connectDB } from '@/lib/db';
import BlogModel from '@/lib/models/Blog';
import type { BlogStatus } from './types';

// ─── MongoDB → Blog converter ─────────────────────────────────────────────────

function docToBlog(doc: InstanceType<typeof BlogModel>): Blog {
  return {
    id:            doc.blogId,
    title:         doc.title,
    slug:          doc.slug,
    summary:       doc.summary,
    content:       doc.content,
    featuredImage: { url: doc.featuredImage?.url ?? '', alt: doc.featuredImage?.alt ?? '', caption: doc.featuredImage?.caption ?? '' },
    images:        (doc.images ?? []).map((img) => ({ url: img.url ?? '', alt: img.alt ?? '', caption: img.caption ?? '' })),
    category:      doc.category,
    tags:          doc.tags ?? [],
    author: {
      id:           doc.author?.id ?? '',
      firstName:    doc.author?.firstName ?? '',
      lastName:     doc.author?.lastName ?? '',
      email:        doc.author?.email ?? '',
      bio:          doc.author?.bio ?? '',
      profileImage: doc.author?.profileImage,
      role:         (doc.author?.role ?? 'admin') as Blog['author']['role'],
      designation:  doc.author?.designation ?? '',
    },
    status:          doc.status as BlogStatus,
    featured:        doc.featured ?? false,
    isUserSubmitted: doc.isUserSubmitted ?? false,
    submittedBy:     doc.submittedBy ? { name: doc.submittedBy.name ?? '', email: doc.submittedBy.email ?? '', company: doc.submittedBy.company, message: doc.submittedBy.message } : undefined,
    reviewedBy:      doc.reviewedBy,
    adminNotes:      doc.adminNotes,
    focusKeyword:    doc.focusKeyword ?? '',
    seoTitle:        doc.seoTitle ?? '',
    metaDescription: doc.metaDescription ?? '',
    faqs:            (doc.faqs ?? []).map((f, i) => ({ question: f.question ?? '', answer: f.answer ?? '', order: f.order ?? i })),
    disclaimer:      doc.disclaimer,
    ctaText:         doc.ctaText,
    readingTime:     doc.readingTime ?? 1,
    views:           doc.views ?? 0,
    likeCount:       doc.likeCount ?? 0,
    publishedAt:     doc.publishedAt ? (doc.publishedAt as Date).toISOString() : undefined,
    createdAt:       (doc.createdAt as Date).toISOString(),
    updatedAt:       (doc.updatedAt as Date).toISOString(),
  };
}

// ─── DB availability check ────────────────────────────────────────────────────

declare global { var __estabizz_dbAvailable: boolean | undefined }

async function isDBAvailable(): Promise<boolean> {
  if (global.__estabizz_dbAvailable !== undefined) return global.__estabizz_dbAvailable;
  try {
    await connectDB();
    global.__estabizz_dbAvailable = true;
  } catch {
    global.__estabizz_dbAvailable = false;
  }
  return global.__estabizz_dbAvailable;
}

// ─── Filters (shared between DB and in-memory paths) ─────────────────────────

function applyFilters(blogs: Blog[], filters: BlogFilters): Blog[] {
  let result = [...blogs];
  if (filters.status)             result = result.filter((b) => b.status === filters.status);
  if (filters.category)           result = result.filter((b) => b.category.slug === filters.category);
  if (filters.tag)                result = result.filter((b) => b.tags.some((t) => t.toLowerCase() === filters.tag!.toLowerCase()));
  if (filters.featured !== undefined) result = result.filter((b) => b.featured === filters.featured);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((b) =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q)) ||
      b.category.name.toLowerCase().includes(q)
    );
  }
  return result;
}

function paginate<T>(items: T[], page = 1, limit = 50): T[] {
  return items.slice((page - 1) * limit, page * limit);
}

// ─── In-memory fallback ───────────────────────────────────────────────────────

function memAllBlogs(): Blog[] {
  return getSubmissions();
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getPublishedBlogs(filters: BlogFilters = {}): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const query: Record<string, unknown> = { status: 'published' };
      if (filters.category) query['category.slug'] = filters.category;
      if (filters.tag)      query.tags = filters.tag;
      if (filters.search) {
        query['$or'] = [
          { title:   { $regex: filters.search, $options: 'i' } },
          { summary: { $regex: filters.search, $options: 'i' } },
          { tags:    { $regex: filters.search, $options: 'i' } },
        ];
      }
      const limit = filters.limit ?? 50;
      const skip  = ((filters.page ?? 1) - 1) * limit;
      const docs  = await BlogModel.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean();
      const result = docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
      // deduplicate by id
      const seen = new Set<string>();
      return result.filter(b => seen.has(b.id) ? false : (seen.add(b.id), true));
    }
  } catch (e) {
    console.warn('[repository] getPublishedBlogs DB error, using memory:', e);
    global.__estabizz_dbAvailable = false;
  }
  // fallback
  const base = applyFilters(memAllBlogs(), { ...filters, status: 'published' });
  const sorted = base.sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime());
  const paged = paginate(sorted, filters.page, filters.limit);
  // deduplicate by id
  const seen = new Set<string>();
  return paged.filter(b => seen.has(b.id) ? false : (seen.add(b.id), true));
}

export async function getFeaturedBlogs(limit = 4): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const docs = await BlogModel.find({ status: 'published', featured: true }).sort({ publishedAt: -1 }).limit(limit).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getFeaturedBlogs DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return memAllBlogs().filter((b) => b.status === 'published' && b.featured).sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime()).slice(0, limit);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (await isDBAvailable()) {
      const doc = await BlogModel.findOne({ slug, status: 'published' }).lean();
      return doc ? docToBlog(doc as InstanceType<typeof BlogModel>) : null;
    }
  } catch (e) {
    console.warn('[repository] getBlogBySlug DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return memAllBlogs().find((b) => b.slug === slug && b.status === 'published') ?? null;
}

export async function getBlogsByCategory(categorySlug: string, options: BlogPaginationOptions = {}): Promise<Blog[]> {
  return getPublishedBlogs({ category: categorySlug, ...options });
}

export async function getAllBlogsForAdmin(filters: BlogFilters = {}): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const query: Record<string, unknown> = {};
      if (filters.status)   query.status = filters.status;
      if (filters.category) query['category.slug'] = filters.category;
      if (filters.search)   query['$or'] = [{ title: { $regex: filters.search, $options: 'i' } }, { summary: { $regex: filters.search, $options: 'i' } }];
      const limit = filters.limit ?? 100;
      const skip  = ((filters.page ?? 1) - 1) * limit;
      const docs  = await BlogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getAllBlogsForAdmin DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return paginate(applyFilters(memAllBlogs(), filters).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), filters.page, filters.limit);
}

export async function getBlogByIdForAdmin(id: string): Promise<Blog | null> {
  try {
    if (await isDBAvailable()) {
      const doc = await BlogModel.findOne({ blogId: id }).lean();
      return doc ? docToBlog(doc as InstanceType<typeof BlogModel>) : null;
    }
  } catch (e) {
    console.warn('[repository] getBlogByIdForAdmin DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return memAllBlogs().find((b) => b.id === id) ?? null;
}

export async function getPendingSubmissions(): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const docs = await BlogModel.find({ status: 'pending_review', isUserSubmitted: true }).sort({ createdAt: -1 }).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getPendingSubmissions DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return memAllBlogs().filter((b) => b.isUserSubmitted && b.status === 'pending_review').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function adminUpdateBlogStatus(
  id: string,
  patch: Partial<Blog>
): Promise<Blog | null> {
  // ── MongoDB path (primary) ──────────────────────────────────────────────────
  try {
    if (await isDBAvailable()) {
      const doc = await BlogModel.findOne({ blogId: id });
      if (doc) {
        if (patch.status !== undefined)      doc.status     = patch.status;
        if (patch.adminNotes !== undefined)  doc.adminNotes = patch.adminNotes;
        if (patch.reviewedBy !== undefined)  doc.reviewedBy = patch.reviewedBy;
        if (patch.title !== undefined)       doc.title      = patch.title;
        if (patch.slug !== undefined)        doc.slug       = patch.slug;
        if (patch.summary !== undefined)     doc.summary    = patch.summary;
        if (patch.content !== undefined)     doc.content    = patch.content;
        if (patch.featured !== undefined)    doc.featured   = patch.featured;
        if (patch.publishedAt !== undefined && patch.publishedAt) {
          doc.publishedAt = new Date(patch.publishedAt);
        }
        // Ensure a publishedAt timestamp whenever a blog goes live
        if (patch.status === 'published' && !doc.publishedAt) {
          doc.publishedAt = new Date();
        }
        await doc.save();
        return docToBlog(doc as InstanceType<typeof BlogModel>);
      }
      // Not found in DB — fall through to in-memory store (dev/mock blogs)
    }
  } catch (e) {
    console.warn('[repository] adminUpdateBlogStatus DB error, using memory:', e);
    global.__estabizz_dbAvailable = false;
  }

  // ── In-memory fallback ────────────────────────────────────────────────────
  return updateSubmission(id, patch);
}

/**
 * Permanently delete a blog by id. Admin-level — deletes any blog.
 * Returns true if a record was removed.
 */
export async function adminDeleteBlog(id: string): Promise<boolean> {
  let removed = false;
  try {
    if (await isDBAvailable()) {
      const res = await BlogModel.deleteOne({ blogId: id });
      if (res.deletedCount && res.deletedCount > 0) removed = true;
    }
  } catch (e) {
    console.warn('[repository] adminDeleteBlog DB error, using memory:', e);
    global.__estabizz_dbAvailable = false;
  }
  // Also clear any in-memory copy (and covers dev/mock blogs)
  if (deleteSubmission(id)) removed = true;
  return removed;
}

/**
 * Delete a blog only if it was submitted by the given email (ownership check).
 * Used by the user-facing "My Submissions" delete. Returns:
 *   'deleted'   — removed successfully
 *   'not_found' — no such blog
 *   'forbidden' — blog exists but is not owned by this email
 */
export async function deleteOwnBlog(
  id: string,
  ownerEmail: string
): Promise<'deleted' | 'not_found' | 'forbidden'> {
  const email = ownerEmail.toLowerCase().trim();

  try {
    if (await isDBAvailable()) {
      const doc = await BlogModel.findOne({ blogId: id });
      if (doc) {
        const submitter = (doc.submittedBy?.email ?? doc.author?.email ?? '').toLowerCase();
        if (submitter !== email) return 'forbidden';
        await BlogModel.deleteOne({ blogId: id });
        deleteSubmission(id); // clear any mirror
        return 'deleted';
      }
    }
  } catch (e) {
    console.warn('[repository] deleteOwnBlog DB error, using memory:', e);
    global.__estabizz_dbAvailable = false;
  }

  // In-memory fallback
  const mem = getSubmissions().find((b) => b.id === id);
  if (!mem) return 'not_found';
  const submitter = (mem.submittedBy?.email ?? mem.author?.email ?? '').toLowerCase();
  if (submitter !== email) return 'forbidden';
  return deleteSubmission(id) ? 'deleted' : 'not_found';
}

/**
 * Return all blogs submitted by a given email (any status) — for the
 * user-facing "My Submissions" page. Newest first.
 */
export async function getBlogsByOwnerEmail(ownerEmail: string): Promise<Blog[]> {
  const email = ownerEmail.toLowerCase().trim();
  if (!email) return [];

  try {
    if (await isDBAvailable()) {
      const docs = await BlogModel.find({
        $or: [{ 'submittedBy.email': email }, { 'author.email': email }],
      }).sort({ createdAt: -1 }).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getBlogsByOwnerEmail DB error, using memory:', e);
    global.__estabizz_dbAvailable = false;
  }

  return getSubmissions()
    .filter((b) => (b.submittedBy?.email ?? b.author?.email ?? '').toLowerCase() === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPublishedBlogCount(filters: Omit<BlogFilters, 'page' | 'limit'> = {}): Promise<number> {
  try {
    if (await isDBAvailable()) {
      const query: Record<string, unknown> = { status: 'published' };
      if (filters.category) query['category.slug'] = filters.category;
      return await BlogModel.countDocuments(query);
    }
  } catch (e) {
    console.warn('[repository] getPublishedBlogCount DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return applyFilters(memAllBlogs(), { ...filters, status: 'published' }).length;
}

export async function getRelatedBlogs(blogId: string, categoryId: string, limit = 3): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const docs = await BlogModel.find({ status: 'published', 'category.id': categoryId, blogId: { $ne: blogId } }).limit(limit).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getRelatedBlogs DB error:', e);
    global.__estabizz_dbAvailable = false;
  }
  return memAllBlogs().filter((b) => b.status === 'published' && b.id !== blogId && b.category.id === categoryId).slice(0, limit);
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  return blogCategories;
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  return blogCategories.find((c) => c.slug === slug) ?? null;
}

export async function getPublishedBlogSummaries(filters: BlogFilters = {}): Promise<BlogSummary[]> {
  const blogs = await getPublishedBlogs(filters);
  return blogs.map(({ content: _c, faqs: _f, images: _i, ...rest }) => rest);
}

// ─── DTO transformer ──────────────────────────────────────────────────────────

export function toFeaturedBlogDTO(blog: Blog): FeaturedBlogDTO {
  return {
    _id:       blog.id,
    title:     blog.title,
    slug:      blog.slug,
    excerpt:   blog.summary,
    coverImage: blog.featuredImage.url,
    category:  blog.category.name,
    tags:      blog.tags,
    author: {
      firstName:    blog.author.firstName,
      lastName:     blog.author.lastName,
      profileImage: blog.author.profileImage,
    },
    likeCount:   blog.likeCount,
    views:       blog.views,
    publishedAt: blog.publishedAt ?? blog.createdAt,
  };
}
