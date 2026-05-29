/**
 * POST /api/submit-blog
 *
 * Accepts a user blog submission, validates required fields, builds a
 * Blog object with status "pending_review" and stores it in the
 * in-memory submissionStore.
 *
 * TODO (backend wiring):
 *   1. Import your DB client (mongoose / prisma / supabase).
 *   2. Replace `addSubmission(blog)` with `await Blog.create(blog)` or equivalent.
 *   3. Send a confirmation email via Resend / Nodemailer:
 *        await sendEmail({ to: body.email, subject: "Submission received", ... })
 *   4. Optionally notify the admin team via Slack webhook or email.
 *   5. Add rate limiting (e.g. upstash/ratelimit) to prevent spam.
 */

import { NextRequest, NextResponse } from 'next/server';
import type { Blog } from '@/lib/blog/types';
import { blogCategories } from '@/lib/blog/categories';
import { addSubmission } from '@/lib/blog/submissionStore';
import { connectDB } from '@/lib/db';
import BlogModel from '@/lib/models/Blog';
import { sanitizeBlogHtml } from '@/lib/blog/sanitize';

// ─── Validation helpers ───────────────────────────────────────────────────────

/** Accepts http and https URLs only. Rejects data: and javascript: URIs. */
function isValidHttpUrl(value: string): boolean {
  if (!value) return true; // empty = skip (image URL is optional)
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Content length limits
const LIMITS = {
  title:    { min: 10,  max: 200  },
  content:  { min: 200, max: 50000 },
  summary:  { min: 0,   max: 500  },
  firstName:{ min: 1,   max: 80   },
  lastName: { min: 0,   max: 80   },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validate required fields ─────────────────────────────────────────────
    const required: Record<string, string> = {
      firstName:  'Full name is required.',
      email:      'Email address is required.',
      title:      'Blog title is required.',
      content:    'Blog content is required.',
      categoryId: 'Category is required.',
    };

    for (const [key, message] of Object.entries(required)) {
      if (!body[key]?.toString().trim()) {
        return NextResponse.json({ error: message, field: key }, { status: 400 });
      }
    }

    // Basic email format check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.', field: 'email' }, { status: 400 });
    }

    // ── Content length validation ─────────────────────────────────────────────
    const lengthChecks: Array<[string, string, keyof typeof LIMITS]> = [
      [body.title,     'Title',   'title'],
      [body.content,   'Content', 'content'],
      [body.firstName, 'Name',    'firstName'],
    ];
    for (const [val, label, key] of lengthChecks) {
      const trimmed = val?.toString().trim() ?? '';
      const { min, max } = LIMITS[key];
      if (min > 0 && trimmed.length < min) {
        return NextResponse.json(
          { error: `${label} must be at least ${min} characters.`, field: key },
          { status: 400 }
        );
      }
      if (trimmed.length > max) {
        return NextResponse.json(
          { error: `${label} must not exceed ${max} characters.`, field: key },
          { status: 400 }
        );
      }
    }

    // ── Image URL validation ──────────────────────────────────────────────────
    if (body.featuredImageUrl && !isValidHttpUrl(body.featuredImageUrl)) {
      return NextResponse.json(
        { error: 'Featured image URL must be a valid http/https URL.', field: 'featuredImageUrl' },
        { status: 400 }
      );
    }

    const supportingUrls: string[] = Array.isArray(body.supportingImageUrls)
      ? body.supportingImageUrls
      : [];

    if (supportingUrls.length > 6) {
      return NextResponse.json(
        { error: 'Maximum 6 supporting images allowed.', field: 'supportingImageUrls' },
        { status: 400 }
      );
    }

    for (const url of supportingUrls) {
      if (url?.trim() && !isValidHttpUrl(url)) {
        return NextResponse.json(
          { error: 'All supporting image URLs must be valid http/https URLs.', field: 'supportingImageUrls' },
          { status: 400 }
        );
      }
    }

    // ── Resolve category ──────────────────────────────────────────────────────
    const category = blogCategories.find((c) => c.id === body.categoryId);
    if (!category) {
      return NextResponse.json({ error: 'Invalid category.', field: 'categoryId' }, { status: 400 });
    }

    // ── Build Blog object ─────────────────────────────────────────────────────
    const id   = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now  = new Date().toISOString();
    const slug = `${slugify(body.title)}-${Date.now()}`;

    const blog: Blog = {
      id,
      title:   body.title.trim(),
      slug,

      summary: body.summary?.trim() || '',
      content: sanitizeBlogHtml(body.content.trim()),

      featuredImage: {
        url:     body.featuredImageUrl?.trim() || '',
        alt:     body.title.trim(),
        caption: '',
      },
      images: (body.supportingImageUrls ?? [])
        .filter((u: string) => u?.trim())
        .map((url: string, i: number) => ({
          url:     url.trim(),
          alt:     `Supporting image ${i + 1} for "${body.title}"`,
          caption: '',
        })),

      category,
      tags: [],

      author: {
        id:           `guest_${id}`,
        firstName:    body.firstName.trim(),
        lastName:     body.lastName?.trim() || '',
        email:        body.email.trim().toLowerCase(),
        bio:          '',
        role:         'guest',
        designation:  body.designation?.trim() || 'Guest Contributor',
        profileImage: undefined,
      },

      status:          'pending_review',
      featured:        false,
      isUserSubmitted: true,

      submittedBy: {
        name:    `${body.firstName.trim()} ${body.lastName?.trim() || ''}`.trim(),
        email:   body.email.trim().toLowerCase(),
        company: body.company?.trim() || undefined,
        message: body.coverNote?.trim() || undefined,
      },

      reviewedBy:  undefined,
      adminNotes:  undefined,

      focusKeyword:    '',
      seoTitle:        body.title.trim(),
      metaDescription: body.summary?.trim() || '',

      faqs: [],

      disclaimer: undefined,
      ctaText:    undefined,

      readingTime: estimateReadingTime(body.content),
      views:       0,
      likeCount:   0,

      publishedAt: undefined,
      createdAt:   now,
      updatedAt:   now,
    };

    // ── Persist to MongoDB (with in-memory fallback) ──────────────────────────
    try {
      await connectDB();
      await BlogModel.create({
        blogId:          blog.id,
        title:           blog.title,
        slug:            blog.slug,
        summary:         blog.summary,
        content:         blog.content,
        featuredImage:   blog.featuredImage,
        images:          blog.images,
        category:        blog.category,
        tags:            blog.tags,
        author:          blog.author,
        status:          blog.status,
        featured:        blog.featured,
        isUserSubmitted: blog.isUserSubmitted,
        submittedBy:     blog.submittedBy,
        focusKeyword:    blog.focusKeyword,
        seoTitle:        blog.seoTitle,
        metaDescription: blog.metaDescription,
        faqs:            blog.faqs,
        disclaimer:      blog.disclaimer,
        ctaText:         blog.ctaText,
        readingTime:     blog.readingTime,
        views:           0,
        likeCount:       0,
      });
    } catch (dbErr) {
      console.warn('[submit-blog] MongoDB unavailable, using in-memory store:', dbErr);
    }
    // Always mirror to in-memory store for immediate visibility in the same process
    addSubmission(blog);

    // TODO: send confirmation email to submitter
    // await sendConfirmationEmail(body.email, body.firstName, body.title);

    // TODO: notify admin team
    // await notifyAdminSlack(`New submission: "${body.title}" by ${body.firstName} ${body.lastName}`);

    return NextResponse.json({ success: true, id, slug }, { status: 201 });

  } catch (err) {
    console.error('[submit-blog] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
