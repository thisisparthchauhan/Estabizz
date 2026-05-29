/**
 * POST /api/admin/blogs/save
 *
 * Creates or updates a blog from the admin editor.
 * Currently backed by the in-memory submissionStore.
 *
 * TODO: Replace addSubmission / updateSubmission with real DB calls
 * once MongoDB is wired:
 *   Create → Blog.create(payload)
 *   Update → Blog.findByIdAndUpdate(id, payload)
 */

import { NextRequest, NextResponse } from 'next/server';
import type { Blog, BlogStatus } from '@/lib/blog/types';
import { blogCategories } from '@/lib/blog/categories';
import { addSubmission, updateSubmission, getSubmissionById } from '@/lib/blog/submissionStore';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 90);
}

function estimateReadingTime(text: string): number {
  const words = text.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 238));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validation ────────────────────────────────────────────────────────────
    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }
    if (!body.content?.trim()) {
      return NextResponse.json({ error: 'Content is required.' }, { status: 400 });
    }
    if (!body.categoryId) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }

    const category = blogCategories.find((c) => c.id === body.categoryId);
    if (!category) {
      return NextResponse.json({ error: 'Invalid category.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const status: BlogStatus = body.status ?? 'draft';
    const isPublishing = status === 'published';

    // ── UPDATE existing blog ──────────────────────────────────────────────────
    if (body.id) {
      const existing = getSubmissionById(body.id);
      if (!existing) {
        return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
      }

      const patch: Partial<Blog> = {
        title:           body.title.trim(),
        slug:            body.slug?.trim() || slugify(body.title),
        summary:         body.summary?.trim() || '',
        content:         body.content.trim(),
        status,
        category,
        tags:            Array.isArray(body.tags) ? body.tags : (body.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) ?? []),
        featuredImage: {
          url:     body.featuredImageUrl?.trim() || '',
          alt:     body.featuredImageAlt?.trim() || body.title.trim(),
          caption: '',
        },
        seoTitle:        body.seoTitle?.trim() || body.title.trim(),
        metaDescription: body.metaDescription?.trim() || body.summary?.trim() || '',
        focusKeyword:    body.focusKeyword?.trim() || '',
        faqs:            Array.isArray(body.faqs) ? body.faqs : [],
        ctaText:         body.ctaBody?.trim() || undefined,
        disclaimer:      body.disclaimer?.trim() || undefined,
        readingTime:     estimateReadingTime(body.content),
        updatedAt:       now,
        publishedAt:     isPublishing ? (existing.publishedAt ?? now) : existing.publishedAt,
        author: {
          ...existing.author,
          firstName:   body.authorFirstName?.trim() || existing.author.firstName,
          lastName:    body.authorLastName?.trim()  || existing.author.lastName,
          designation: body.authorDesignation?.trim() || existing.author.designation,
        },
      };

      const updated = updateSubmission(body.id, patch);
      return NextResponse.json({ success: true, id: updated?.id, slug: updated?.slug }, { status: 200 });
    }

    // ── CREATE new blog ───────────────────────────────────────────────────────
    const id   = `admin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const slug = body.slug?.trim() || `${slugify(body.title)}-${Date.now()}`;

    // Parse author from editor
    const authorFirstName = body.authorFirstName?.trim() || 'Estabizz';
    const authorLastName  = body.authorLastName?.trim()  || 'Compliance Team';

    const blog: Blog = {
      id,
      title:   body.title.trim(),
      slug,
      summary: body.summary?.trim() || '',
      content: body.content.trim(),

      featuredImage: {
        url:     body.featuredImageUrl?.trim() || '',
        alt:     body.featuredImageAlt?.trim() || body.title.trim(),
        caption: '',
      },
      images: [],

      category,
      tags: Array.isArray(body.tags)
        ? body.tags
        : (body.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) ?? []),

      author: {
        id:           `author_admin`,
        firstName:    authorFirstName,
        lastName:     authorLastName,
        email:        body.authorEmail?.trim() || 'compliance@estabizz.com',
        bio:          '',
        role:         'admin',
        designation:  body.authorDesignation?.trim() || 'Estabizz Compliance Team',
        profileImage: undefined,
      },

      status,
      featured:        false,
      isUserSubmitted: false,

      submittedBy: undefined,
      reviewedBy:  undefined,
      adminNotes:  undefined,

      focusKeyword:    body.focusKeyword?.trim()    || '',
      seoTitle:        body.seoTitle?.trim()        || body.title.trim(),
      metaDescription: body.metaDescription?.trim() || body.summary?.trim() || '',

      faqs:       Array.isArray(body.faqs) ? body.faqs : [],
      disclaimer: body.disclaimer?.trim() || undefined,
      ctaText:    body.ctaBody?.trim()    || undefined,

      readingTime: estimateReadingTime(body.content),
      views:       0,
      likeCount:   0,

      publishedAt: isPublishing ? now : undefined,
      createdAt:   now,
      updatedAt:   now,
    };

    addSubmission(blog);

    return NextResponse.json({ success: true, id, slug }, { status: 201 });

  } catch (err) {
    console.error('[admin/blogs/save] Error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
