// ─────────────────────────────────────────────────────────────────────────────
// Blog module — shared TypeScript types
// All pages, components and API routes import from here.
// ─────────────────────────────────────────────────────────────────────────────

/** Lifecycle stages for every blog post */
export type BlogStatus =
  | 'draft'          // saved but not submitted
  | 'pending_review' // submitted by user, awaiting admin decision
  | 'approved'       // approved by admin, not yet publicly visible
  | 'published'      // live and publicly accessible
  | 'rejected'       // rejected by admin
  | 'archived';      // removed from public listing

// ─── Category ────────────────────────────────────────────────────────────────

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

// ─── Author ──────────────────────────────────────────────────────────────────

export type BlogAuthorRole = 'admin' | 'contributor' | 'guest';

export interface BlogAuthor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  profileImage?: string;
  role: BlogAuthorRole;
  designation: string;
}

// ─── Image ───────────────────────────────────────────────────────────────────

export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface BlogFAQ {
  question: string;
  answer: string;
  order: number;
}

// ─── User submission metadata ─────────────────────────────────────────────────

export interface BlogSubmitter {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

// ─── Filters / pagination ─────────────────────────────────────────────────────

export interface BlogPaginationOptions {
  page?: number;
  limit?: number;
}

export interface BlogFilters extends BlogPaginationOptions {
  category?: string;   // category slug
  tag?: string;
  status?: BlogStatus;
  featured?: boolean;
  search?: string;
}

// ─── Core Blog ───────────────────────────────────────────────────────────────

export interface Blog {
  id: string;
  title: string;
  slug: string;

  // Content
  summary: string;           // 1–2 sentence excerpt shown on listing cards
  content: string;           // full HTML body (from rich-text editor or CMS)
  featuredImage: BlogImage;  // cover image
  images: BlogImage[];       // inline / gallery images

  // Taxonomy
  category: BlogCategory;
  tags: string[];

  // Authorship
  author: BlogAuthor;

  // Workflow
  status: BlogStatus;
  featured: boolean;         // pinned to homepage FeaturedBlogs section
  isUserSubmitted: boolean;  // true when a visitor submits via /blogs/submit
  submittedBy?: BlogSubmitter;
  reviewedBy?: string;       // admin display name
  adminNotes?: string;       // rejection reason (shown to submitter)

  // SEO
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;

  // Structured data
  faqs: BlogFAQ[];

  // Calls to action / legal
  disclaimer?: string;
  ctaText?: string;

  // Engagement
  readingTime: number;  // estimated minutes
  views: number;
  likeCount: number;

  // Timestamps (ISO-8601 strings — safe across all backends)
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Derived / lightweight types ─────────────────────────────────────────────

/** Listing-page shape — omits heavy fields not needed in card/grid views */
export type BlogSummary = Omit<Blog, 'content' | 'faqs' | 'images'>;

/**
 * DTO that matches the FeaturedBlogs component interface (components/home/FeaturedBlogs.tsx).
 * Keeping this separate ensures the component contract is never accidentally broken.
 */
export interface FeaturedBlogDTO {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  likeCount: number;
  views: number;
  publishedAt: string;
}
