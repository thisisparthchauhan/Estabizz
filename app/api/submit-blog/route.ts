/**
 * POST /api/submit-blog
 *
 * Accepts a user blog submission, validates required fields, builds a
 * Blog object with status "pending_review" and stores it in MongoDB.
 */

import { NextRequest, NextResponse } from 'next/server';
import type { Blog } from '@/lib/blog/types';
import { blogCategories } from '@/lib/blog/categories';
import { addSubmission } from '@/lib/blog/submissionStore';
import { connectDB } from '@/lib/db';
import BlogModel from '@/lib/models/Blog';
import { sanitizeBlogHtml } from '@/lib/blog/sanitize';
import {
  limitRequest,
  isRateLimitConfigured,
  getClientIp,
  rateLimitResponse,
  hashIdentifier,
} from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

// Maximum body size: content up to 50 000 chars + all other fields + JSON overhead.
const MAX_BODY_BYTES = 131_072; // 128 KB

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
  // ── Production rate-limit config gate ────────────────────────────────────
  // In production the in-memory fallback is not safe across serverless
  // replicas. Return 503 immediately if Upstash is not configured.
  if (!isRateLimitConfigured()) {
    return NextResponse.json(
      { error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── Client IP ────────────────────────────────────────────────────────────
  // Unknown IP in production would share one bucket across all clients —
  // a brute-force window and DoS vector. Return 503 to prevent that risk.
  const ip = getClientIp(req);
  if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ── IP rate limit (before body read — cheap rejection for bots) ──────────
  // 3 blog submissions per IP per hour.
  const ipResult = await limitRequest(
    { namespace: 'submit-blog-ip', identifier: ip, limit: 3, windowSeconds: 3600 },
    'fail-open'
  );

  if (ipResult.configMissing) {
    return NextResponse.json(
      { error: 'This service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  if (!ipResult.allowed) {
    return rateLimitResponse(ipResult, 'Too many requests. Please try again later.');
  }

  // ── Body size enforcement (actual bytes) ──────────────────────────────────
  // Read the raw body so byteLength is authoritative. Content-Length is
  // untrusted: it can be missing or deliberately set to a false small value.
  const bodyBuffer = await req.arrayBuffer();
  if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body too large.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(new TextDecoder().decode(bodyBuffer));
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    // ── Validate required fields ────────────────────────────────────────────
    const required: Record<string, string> = {
      firstName:  'Full name is required.',
      email:      'Email address is required.',
      title:      'Blog title is required.',
      content:    'Blog content is required.',
      categoryId: 'Category is required.',
    };

    for (const [key, message] of Object.entries(required)) {
      if (!body[key]?.toString().trim()) {
        return NextResponse.json(
          { error: message, field: key },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    // Basic email format check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(String(body.email))) {
      return NextResponse.json(
        { error: 'Invalid email address.', field: 'email' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // ── Per-email rate limit (after email is validated) ─────────────────────
    // 2 blog submissions per email address per 12 hours (hashed, not raw).
    const emailHash = hashIdentifier(String(body.email).toLowerCase().trim());
    const emailResult = await limitRequest(
      { namespace: 'submit-blog-email', identifier: emailHash, limit: 2, windowSeconds: 43200 },
      'fail-open'
    );

    if (emailResult.configMissing) {
      return NextResponse.json(
        { error: 'This service is temporarily unavailable.' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    if (!emailResult.allowed) {
      return rateLimitResponse(emailResult, 'Too many requests. Please try again later.');
    }

    // ── Content length validation ───────────────────────────────────────────
    const lengthChecks: Array<[string, string, keyof typeof LIMITS]> = [
      [String(body.title),     'Title',   'title'],
      [String(body.content),   'Content', 'content'],
      [String(body.firstName), 'Name',    'firstName'],
    ];
    for (const [val, label, key] of lengthChecks) {
      const trimmed = val?.toString().trim() ?? '';
      const { min, max } = LIMITS[key];
      if (min > 0 && trimmed.length < min) {
        return NextResponse.json(
          { error: `${label} must be at least ${min} characters.`, field: key },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
      if (trimmed.length > max) {
        return NextResponse.json(
          { error: `${label} must not exceed ${max} characters.`, field: key },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    // ── Image URL validation ────────────────────────────────────────────────
    if (body.featuredImageUrl && !isValidHttpUrl(String(body.featuredImageUrl))) {
      return NextResponse.json(
        { error: 'Featured image URL must be a valid http/https URL.', field: 'featuredImageUrl' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const supportingUrls: string[] = Array.isArray(body.supportingImageUrls)
      ? body.supportingImageUrls
      : [];

    if (supportingUrls.length > 6) {
      return NextResponse.json(
        { error: 'Maximum 6 supporting images allowed.', field: 'supportingImageUrls' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    for (const url of supportingUrls) {
      if (url?.trim() && !isValidHttpUrl(url)) {
        return NextResponse.json(
          { error: 'All supporting image URLs must be valid http/https URLs.', field: 'supportingImageUrls' },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    // ── Resolve category ────────────────────────────────────────────────────
    const category = blogCategories.find((c) => c.id === body.categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category.', field: 'categoryId' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // ── Build Blog object ───────────────────────────────────────────────────
    const id   = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now  = new Date().toISOString();
    const slug = `${slugify(String(body.title))}-${Date.now()}`;

    const blog: Blog = {
      id,
      title:   String(body.title).trim(),
      slug,

      summary: body.summary?.toString().trim() || '',
      content: sanitizeBlogHtml(String(body.content).trim()),

      featuredImage: {
        url:     body.featuredImageUrl?.toString().trim() || '',
        alt:     String(body.title).trim(),
        caption: '',
      },
      images: supportingUrls
        .filter((u) => u?.trim())
        .map((url, i) => ({
          url:     url.trim(),
          alt:     `Supporting image ${i + 1} for "${String(body.title)}"`,
          caption: '',
        })),

      category,
      tags: [],

      author: {
        id:           `guest_${id}`,
        firstName:    String(body.firstName).trim(),
        lastName:     body.lastName?.toString().trim() || '',
        email:        String(body.email).trim().toLowerCase(),
        bio:          '',
        role:         'guest',
        designation:  body.designation?.toString().trim() || 'Guest Contributor',
        profileImage: undefined,
      },

      status:          'pending_review',
      featured:        false,
      isUserSubmitted: true,

      submittedBy: {
        name:    `${String(body.firstName).trim()} ${body.lastName?.toString().trim() || ''}`.trim(),
        email:   String(body.email).trim().toLowerCase(),
        company: body.company?.toString().trim() || undefined,
        message: body.coverNote?.toString().trim() || undefined,
      },

      reviewedBy:  undefined,
      adminNotes:  undefined,

      focusKeyword:    '',
      seoTitle:        String(body.title).trim(),
      metaDescription: body.summary?.toString().trim() || '',

      faqs: [],

      disclaimer: undefined,
      ctaText:    undefined,

      readingTime: estimateReadingTime(String(body.content)),
      views:       0,
      likeCount:   0,

      publishedAt: undefined,
      createdAt:   now,
      updatedAt:   now,
    };

    // ── Persist to MongoDB (with in-memory fallback) ────────────────────────
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

    return NextResponse.json({ success: true, id, slug }, { status: 201 });

  } catch (err) {
    console.error('[submit-blog] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
