/**
 * POST /api/admin/blogs/save
 * Creates or updates a blog from the admin editor.
 * Persists to MongoDB (production) with global in-memory fallback (dev).
 */

import { NextRequest, NextResponse } from 'next/server';
import type { Blog, BlogStatus } from '@/lib/blog/types';
import { blogCategories } from '@/lib/blog/categories';
import { addSubmission, updateSubmission, getSubmissionById } from '@/lib/blog/submissionStore';
import { connectDB } from '@/lib/db';
import BlogModel from '@/lib/models/Blog';
import { requirePermission } from '@/lib/admin/requirePermission';
import { sanitizeBlogHtml } from '@/lib/blog/sanitize';
import { parseDocument } from 'htmlparser2';
import { findAll, getAttributeValue } from 'domutils';
import type { Element, AnyNode } from 'domhandler';

const KNOWN_AUTHORS = [
  {
    id: 'author_estabizz_team',
    firstName: 'Estabizz',
    lastName: 'Compliance Team',
    email: 'compliance@estabizz.com',
    designation: 'Regulatory Advisory, Estabizz Fintech',
    role: 'admin' as const,
    bio: 'The Estabizz Compliance Team comprises regulatory advisers with extensive experience across RBI, SEBI, IRDAI and IFSCA frameworks.',
  },
  {
    id: 'author_admin',
    firstName: 'Admin',
    lastName: 'Editor',
    email: 'admin@estabizz.com',
    designation: 'Senior Editor, Estabizz Fintech',
    role: 'admin' as const,
    bio: 'Senior editorial team member at Estabizz Fintech.',
  },
];

function slugify(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 90);
}

function estimateReadingTime(text: string): number {
  const words = text.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 238));
}

function cleanText(value: unknown, max = 300): string {
  return String(value ?? '').trim().slice(0, max);
}

function cleanNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0 || n > 10000) return undefined;
  return Math.round(n);
}

function isSafeBlogImageUrl(value: string): boolean {
  if (!value) return true;
  if (value.startsWith('/images/') || value.startsWith('/estabizz-')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function cleanPublicId(value: unknown): string {
  return String(value ?? '').trim().replace(/[^a-zA-Z0-9_\-/.]/g, '').slice(0, 180);
}

function buildBlogImage(input: {
  url?: unknown;
  publicId?: unknown;
  alt?: unknown;
  caption?: unknown;
  width?: unknown;
  height?: unknown;
}, fallbackAlt: string) {
  const url = cleanText(input.url, 1000);
  return {
    url,
    publicId: cleanPublicId(input.publicId),
    alt: cleanText(input.alt, 180) || fallbackAlt,
    caption: cleanText(input.caption, 240),
    width: cleanNumber(input.width),
    height: cleanNumber(input.height),
  };
}

function cleanSupportingImages(value: unknown, fallbackAlt: string) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 12).map((item) => {
    const raw = item as Record<string, unknown>;
    return buildBlogImage({
      url: raw.url,
      publicId: raw.publicId,
      alt: raw.alt,
      caption: raw.caption,
      width: raw.width,
      height: raw.height,
    }, fallbackAlt);
  }).filter((img) => img.url && isSafeBlogImageUrl(img.url));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validation ────────────────────────────────────────────────────────────
    if (!body.title?.trim())   return NextResponse.json({ error: 'Title is required.'    }, { status: 400 });
    if (!body.content?.trim()) return NextResponse.json({ error: 'Content is required.'  }, { status: 400 });
    if (!body.categoryId)      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });

    const category = blogCategories.find((c) => c.id === body.categoryId);
    if (!category) return NextResponse.json({ error: 'Invalid category.' }, { status: 400 });

    const status: BlogStatus = body.status ?? 'draft';
    const isPublishing = status === 'published';

    // ── Granular permission guard ─────────────────────────────────────────────
    // body.id present → editing an existing blog (requires edit_blog)
    // body.id absent  → creating a new blog (requires create_blog)
    const isEdit = Boolean(body.id);
    const auth = await requirePermission(req, isEdit ? 'edit_blog' : 'create_blog');
    if (!auth.ok) return auth.response;

    // Publishing additionally requires publish_blog
    if (isPublishing && !auth.admin.permissions.includes('publish_blog')) {
      return NextResponse.json(
        { error: 'You do not have permission to publish blog.' },
        { status: 403 }
      );
    }

    // XSS defense: sanitize the article HTML before it is stored.
    const cleanContent = sanitizeBlogHtml(body.content.trim());
    const featuredImage = buildBlogImage({
      url: body.featuredImageUrl,
      publicId: body.featuredImagePublicId,
      alt: body.featuredImageAlt,
      caption: body.featuredImageCaption,
      width: body.featuredImageWidth,
      height: body.featuredImageHeight,
    }, body.title.trim());

    if (featuredImage.url && !isSafeBlogImageUrl(featuredImage.url)) {
      return NextResponse.json({ error: 'Cover image must use a secure image URL.' }, { status: 400 });
    }

    const supportingImages = cleanSupportingImages(body.supportingImages, body.title.trim());

    const now    = new Date();
    const nowISO = now.toISOString();

    // Server-side image validation for publish requests
    if (isPublishing) {
      const PLACEHOLDER_ALT = /^Imported image \d+$/i;
      const doc  = parseDocument(cleanContent, { lowerCaseAttributeNames: true });
      const imgs = findAll(
        (el: AnyNode): el is Element => el.type === 'tag' && (el as Element).name === 'img',
        doc.children as AnyNode[]
      );
      for (const img of imgs) {
        const alt = (getAttributeValue(img, 'alt') ?? '').trim();
        if (!alt || PLACEHOLDER_ALT.test(alt)) {
          return NextResponse.json(
            { error: 'Please review the alt text for all imported images before publishing.' },
            { status: 400 }
          );
        }
      }
    }

    // Resolve author — custom name support
    let author: typeof KNOWN_AUTHORS[0];
    if (body.authorId === 'author_custom' && body.customAuthorName?.trim()) {
      const parts = body.customAuthorName.trim().split(/\s+/);
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || '';
      author = {
        id: 'author_custom',
        firstName,
        lastName,
        email: 'support@estabizz.com',
        designation: 'Contributor, Estabizz Fintech',
        role: 'admin' as const,
        bio: '',
      };
    } else {
      author = KNOWN_AUTHORS.find((a) => a.id === body.authorId) ?? KNOWN_AUTHORS[0];
    }

    const tags: string[] = Array.isArray(body.tags)
      ? body.tags
      : (body.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) ?? []);

    const faqs = Array.isArray(body.faqs) ? body.faqs : [];

    // ── Try MongoDB first ─────────────────────────────────────────────────────
    try {
      await connectDB();

      if (body.id) {
        // UPDATE
        const existing = await BlogModel.findOne({ blogId: body.id });
        if (!existing) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });

        existing.title           = body.title.trim();
        existing.slug            = body.slug?.trim() || slugify(body.title);
        existing.summary         = body.summary?.trim() ?? '';
        existing.content         = cleanContent;
        existing.status          = status;
        existing.category        = category;
        existing.tags            = tags;
        existing.featuredImage   = featuredImage;
        existing.images          = supportingImages;
        existing.seoTitle        = body.seoTitle?.trim()        || body.title.trim();
        existing.metaDescription = body.metaDescription?.trim() ?? '';
        existing.focusKeyword    = body.focusKeyword?.trim()    ?? '';
        existing.faqs            = faqs;
        existing.ctaText         = body.ctaBody?.trim()         || undefined;
        existing.disclaimer      = body.disclaimer?.trim()      || undefined;
        existing.readingTime     = estimateReadingTime(body.content);
        existing.author          = { ...existing.author, id: author.id, firstName: author.firstName, lastName: author.lastName, email: author.email, designation: author.designation, bio: author.bio, role: author.role };
        if (isPublishing && !existing.publishedAt) existing.publishedAt = now;

        await existing.save();
        return NextResponse.json({ success: true, id: existing.blogId, slug: existing.slug }, { status: 200 });
      }

      // CREATE
      const id   = `admin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const slug = body.slug?.trim() || `${slugify(body.title)}-${Date.now()}`;

      await BlogModel.create({
        blogId:          id,
        title:           body.title.trim(),
        slug,
        summary:         body.summary?.trim() ?? '',
        content:         cleanContent,
        featuredImage,
        images:          supportingImages,
        category,
        tags,
        author:          { id: author.id, firstName: author.firstName, lastName: author.lastName, email: author.email, bio: author.bio, role: author.role, designation: author.designation },
        status,
        featured:        false,
        isUserSubmitted: false,
        focusKeyword:    body.focusKeyword?.trim()    ?? '',
        seoTitle:        body.seoTitle?.trim()        || body.title.trim(),
        metaDescription: body.metaDescription?.trim() ?? '',
        faqs,
        disclaimer:      body.disclaimer?.trim()      || undefined,
        ctaText:         body.ctaBody?.trim()         || undefined,
        readingTime:     estimateReadingTime(body.content),
        views:           0,
        likeCount:       0,
        publishedAt:     isPublishing ? now : undefined,
      });

      return NextResponse.json({ success: true, id, slug }, { status: 201 });

    } catch (dbErr) {
      console.warn('[admin/blogs/save] MongoDB unavailable, using in-memory store:', dbErr);
      // Fall through to in-memory fallback below
    }

    // ── In-memory fallback ────────────────────────────────────────────────────
    if (body.id) {
      const existing = getSubmissionById(body.id);
      if (!existing) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });

      const patch: Partial<Blog> = {
        title:           body.title.trim(),
        slug:            body.slug?.trim() || slugify(body.title),
        summary:         body.summary?.trim() ?? '',
        content:         cleanContent,
        status,
        category,
        tags,
        featuredImage,
        images:          supportingImages,
        seoTitle:        body.seoTitle?.trim()        || body.title.trim(),
        metaDescription: body.metaDescription?.trim() ?? '',
        focusKeyword:    body.focusKeyword?.trim()    ?? '',
        faqs:            faqs.map((f: { question: string; answer: string }, i: number) => ({ ...f, order: i })),
        ctaText:         body.ctaBody?.trim()         || undefined,
        disclaimer:      body.disclaimer?.trim()      || undefined,
        readingTime:     estimateReadingTime(body.content),
        updatedAt:       nowISO,
        publishedAt:     isPublishing ? (existing.publishedAt ?? nowISO) : existing.publishedAt,
        author:          { ...existing.author, id: author.id, firstName: author.firstName, lastName: author.lastName, email: author.email, designation: author.designation },
      };
      const updated = updateSubmission(body.id, patch);
      return NextResponse.json({ success: true, id: updated?.id, slug: updated?.slug }, { status: 200 });
    }

    const id   = `admin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const slug = body.slug?.trim() || `${slugify(body.title)}-${Date.now()}`;

    const blog: Blog = {
      id, title: body.title.trim(), slug,
      summary:   body.summary?.trim() ?? '',
      content:   cleanContent,
      featuredImage,
      images:    supportingImages,
      category,  tags,
      author:    { id: author.id, firstName: author.firstName, lastName: author.lastName, email: author.email, bio: author.bio, role: author.role, designation: author.designation },
      status,    featured: false, isUserSubmitted: false,
      submittedBy: undefined, reviewedBy: undefined, adminNotes: undefined,
      focusKeyword:    body.focusKeyword?.trim()    ?? '',
      seoTitle:        body.seoTitle?.trim()        || body.title.trim(),
      metaDescription: body.metaDescription?.trim() ?? '',
      faqs: faqs.map((f: { question: string; answer: string }, i: number) => ({ ...f, order: i })),
      disclaimer: body.disclaimer?.trim() || undefined,
      ctaText:    body.ctaBody?.trim()    || undefined,
      readingTime: estimateReadingTime(body.content),
      views: 0, likeCount: 0,
      publishedAt: isPublishing ? nowISO : undefined,
      createdAt: nowISO, updatedAt: nowISO,
    };

    addSubmission(blog);
    return NextResponse.json({ success: true, id, slug }, { status: 201 });

  } catch (err) {
    console.error('[admin/blogs/save] Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
