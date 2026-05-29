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
import { getSubmissions, updateSubmission } from './submissionStore';
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

let _dbAvailable: boolean | null = null;

async function isDBAvailable(): Promise<boolean> {
  if (_dbAvailable !== null) return _dbAvailable;
  try {
    await connectDB();
    _dbAvailable = true;
  } catch {
    _dbAvailable = false;
  }
  return _dbAvailable;
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
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getPublishedBlogs DB error, using memory:', e);
    _dbAvailable = false;
  }
  // fallback
  const base = applyFilters(memAllBlogs(), { ...filters, status: 'published' });
  return paginate(base.sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime()), filters.page, filters.limit);
}

export async function getFeaturedBlogs(limit = 4): Promise<Blog[]> {
  try {
    if (await isDBAvailable()) {
      const docs = await BlogModel.find({ status: 'published', featured: true }).sort({ publishedAt: -1 }).limit(limit).lean();
      return docs.map((d) => docToBlog(d as InstanceType<typeof BlogModel>));
    }
  } catch (e) {
    console.warn('[repository] getFeaturedBlogs DB error:', e);
    _dbAvailable = false;
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
    _dbAvailable = false;
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
    _dbAvailable = false;
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
    _dbAvailable = false;
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
    _dbAvailable = false;
  }
  return memAllBlogs().filter((b) => b.isUserSubmitted && b.status === 'pending_review').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function adminUpdateBlogStatus(id: string, patch: Partial<Blog>): Blog | null {
  // In-memory path (used by the status-update API which hasn't been migrated yet)
  return updateSubmission(id, patch);
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
    _dbAvailable = false;
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
    _dbAvailable = false;
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
