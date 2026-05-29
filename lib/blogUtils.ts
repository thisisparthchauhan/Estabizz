import type { BlogFAQ, BlogImage, BlogStatus, IBlog } from "@/lib/models/Blog";
import { sanitizeBlogHtml } from "@/lib/blogSecurity";

export const BLOG_CATEGORIES = [
    "RBI",
    "SEBI",
    "IRDAI",
    "IFSCA",
    "MCA",
    "NBFC",
    "Fintech",
    "Insurance",
    "Global Licensing",
];

export interface BlogDTO {
    _id?: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    categorySlug: string;
    tags: string[];
    authorName: string;
    authorEmail?: string;
    status: BlogStatus;
    featuredImage?: BlogImage;
    inlineImages: BlogImage[];
    faqs: BlogFAQ[];
    focusKeyword?: string;
    seoTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ctaTitle?: string;
    ctaText?: string;
    disclaimer?: string;
    submittedBy?: {
        name?: string;
        email?: string;
        phone?: string;
        linkedIn?: string;
    };
    source: "admin" | "user";
    seoScore: number;
    views: number;
    readingTime: number;
    publishedAt?: string;
    approvedAt?: string;
    rejectedAt?: string;
    archivedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 90);
}

export function stripHtml(input: string) {
    return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function calculateReadingTime(content: string) {
    const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
}

export function calculateSeoScore(input: {
    title?: string;
    summary?: string;
    content?: string;
    focusKeyword?: string;
    seoTitle?: string;
    metaDescription?: string;
    slug?: string;
    featuredImage?: BlogImage;
    faqs?: BlogFAQ[];
}) {
    let score = 0;
    const keyword = input.focusKeyword?.toLowerCase().trim();
    const content = `${input.title || ""} ${input.summary || ""} ${stripHtml(input.content || "")}`.toLowerCase();

    if (input.seoTitle && input.seoTitle.length <= 70) score += 15;
    if (input.metaDescription && input.metaDescription.length >= 120 && input.metaDescription.length <= 165) score += 15;
    if (keyword && content.includes(keyword)) score += 15;
    if (keyword && input.slug?.includes(slugify(keyword))) score += 10;
    if ((input.summary || "").length >= 80) score += 10;
    if (stripHtml(input.content || "").length >= 900) score += 10;
    if (input.featuredImage?.alt) score += 10;
    if ((input.faqs || []).length >= 3) score += 10;
    if ((input.title || "").length > 20) score += 5;

    return Math.min(score, 100);
}

export function normalizeBlogPayload(payload: Partial<BlogDTO>, source: "admin" | "user" = "admin"): Partial<BlogDTO> {
    const title = String(payload.title || "").trim();
    const category = BLOG_CATEGORIES.includes(String(payload.category)) ? String(payload.category) : "Fintech";
    const slug = slugify(payload.slug || title);
    const content = sanitizeBlogHtml(String(payload.content || "").trim());
    const summary = String(payload.summary || "").trim();
    const featuredImage = payload.featuredImage?.url
        ? {
            url: String(payload.featuredImage.url),
            alt: String(payload.featuredImage.alt || title || "Estabizz regulatory insight"),
            caption: payload.featuredImage.caption ? String(payload.featuredImage.caption) : undefined,
        }
        : undefined;
    const inlineImages = (payload.inlineImages || [])
        .filter((image) => image?.url)
        .map((image) => ({
            url: String(image.url),
            alt: String(image.alt || title || "Estabizz blog image"),
            caption: image.caption ? String(image.caption) : undefined,
        }));
    const faqs = (payload.faqs || [])
        .filter((faq) => faq?.question && faq?.answer)
        .map((faq) => ({
            question: String(faq.question).trim(),
            answer: String(faq.answer).trim(),
        }));

    const normalized: Partial<BlogDTO> = {
        title,
        slug,
        summary,
        content,
        category,
        categorySlug: slugify(category),
        tags: (payload.tags || []).map((tag) => String(tag).trim()).filter(Boolean),
        authorName: String(payload.authorName || payload.submittedBy?.name || "Estabizz Editorial Desk").trim(),
        authorEmail: payload.authorEmail ? String(payload.authorEmail).toLowerCase().trim() : undefined,
        status: payload.status || (source === "admin" ? "Draft" : "Pending Review"),
        featuredImage,
        inlineImages,
        faqs,
        focusKeyword: payload.focusKeyword ? String(payload.focusKeyword).trim() : undefined,
        seoTitle: payload.seoTitle ? String(payload.seoTitle).trim() : undefined,
        metaDescription: payload.metaDescription ? String(payload.metaDescription).trim() : undefined,
        canonicalUrl: payload.canonicalUrl ? String(payload.canonicalUrl).trim() : undefined,
        ogImage: payload.ogImage ? String(payload.ogImage).trim() : featuredImage?.url,
        ctaTitle: payload.ctaTitle ? String(payload.ctaTitle).trim() : "Need regulatory assistance?",
        ctaText: payload.ctaText ? String(payload.ctaText).trim() : "Speak to Estabizz Team for structured licensing and compliance support.",
        disclaimer: payload.disclaimer ? String(payload.disclaimer).trim() : "This article is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. Regulatory requirements may change from time to time.",
        submittedBy: payload.submittedBy,
        source,
        readingTime: calculateReadingTime(content),
    };

    normalized.seoScore = calculateSeoScore(normalized);

    if (normalized.status === "Published" && !payload.publishedAt) {
        normalized.publishedAt = new Date().toISOString();
    }

    return normalized;
}

export function blogToDTO(blog: IBlog): BlogDTO {
    const raw = blog.toObject ? blog.toObject() : blog;
    return {
        _id: raw._id?.toString(),
        title: raw.title,
        slug: raw.slug,
        summary: raw.summary,
        content: raw.content,
        category: raw.category,
        categorySlug: raw.categorySlug,
        tags: raw.tags || [],
        authorName: raw.authorName,
        authorEmail: raw.authorEmail,
        status: raw.status,
        featuredImage: raw.featuredImage,
        inlineImages: raw.inlineImages || [],
        faqs: raw.faqs || [],
        focusKeyword: raw.focusKeyword,
        seoTitle: raw.seoTitle,
        metaDescription: raw.metaDescription,
        canonicalUrl: raw.canonicalUrl,
        ogImage: raw.ogImage,
        ctaTitle: raw.ctaTitle,
        ctaText: raw.ctaText,
        disclaimer: raw.disclaimer,
        submittedBy: raw.submittedBy,
        source: raw.source,
        seoScore: raw.seoScore || 0,
        views: raw.views || 0,
        readingTime: raw.readingTime || 1,
        publishedAt: raw.publishedAt?.toISOString?.() || raw.publishedAt,
        approvedAt: raw.approvedAt?.toISOString?.() || raw.approvedAt,
        rejectedAt: raw.rejectedAt?.toISOString?.() || raw.rejectedAt,
        archivedAt: raw.archivedAt?.toISOString?.() || raw.archivedAt,
        createdAt: raw.createdAt?.toISOString?.() || raw.createdAt,
        updatedAt: raw.updatedAt?.toISOString?.() || raw.updatedAt,
    };
}

export const fallbackBlogs: BlogDTO[] = [
    {
        _id: "sample-rbi-pa",
        title: "RBI Payment Aggregator Authorisation: What Founders Should Prepare Before Filing",
        slug: "rbi-payment-aggregator-authorisation-founder-readiness",
        summary: "A practical readiness note for payment businesses evaluating RBI Payment Aggregator authorisation, net worth, escrow, merchant due diligence and governance documentation.",
        content: "<h2>Why this update matters</h2><p>Payment Aggregator authorisation requires more than a form filing. Founders should prepare capital evidence, escrow design, merchant onboarding controls, cyber governance and board-approved policies before approaching the regulatory process.</p><h2>Founder action checklist</h2><ul><li>Review PA-O, PA-P or PA-CB applicability.</li><li>Prepare net worth documentation and source of funds.</li><li>Map escrow, merchant due diligence and cyber security controls.</li><li>Maintain a clear business plan and compliance calendar.</li></ul>",
        category: "RBI",
        categorySlug: "rbi",
        tags: ["Payment Aggregator", "RBI", "Fintech"],
        authorName: "Estabizz Editorial Desk",
        status: "Published",
        featuredImage: {
            url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
            alt: "RBI Payment Aggregator compliance desk",
        },
        inlineImages: [],
        faqs: [
            { question: "Is RBI Payment Aggregator authorisation mandatory?", answer: "Yes, non-bank entities operating payment aggregation activity must evaluate RBI authorisation requirements before commencing regulated activity." },
            { question: "Does approval depend only on net worth?", answer: "No. RBI also reviews governance, escrow design, technology controls, business model, merchant due diligence and compliance readiness." },
        ],
        focusKeyword: "RBI Payment Aggregator Authorisation",
        seoTitle: "RBI Payment Aggregator Authorisation - Founder Readiness Guide",
        metaDescription: "RBI Payment Aggregator authorisation explained with founder readiness points, escrow, net worth, merchant due diligence, cyber governance and compliance actions.",
        ctaTitle: "Need Payment Aggregator support?",
        ctaText: "Estabizz can help review applicability, documentation and readiness before filing.",
        disclaimer: "This article is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice.",
        source: "admin",
        seoScore: 85,
        views: 0,
        readingTime: 4,
        publishedAt: "2026-05-01T00:00:00.000Z",
    },
    {
        _id: "sample-sebi-ria",
        title: "SEBI RIA Registration: Advisory and Distribution Must Be Structured Carefully",
        slug: "sebi-ria-registration-advisory-distribution-structure",
        summary: "A compliance-led explainer on SEBI Investment Adviser registration, fiduciary duties, client agreement, suitability, fee model and advisory-distribution segregation.",
        content: "<h2>RIA compliance foundation</h2><p>Investment Adviser registration is a separate SEBI intermediary framework for fee-based investment advice. Businesses should avoid mixing advisory fees and distribution incentives without a documented segregation framework.</p><h2>What SEBI reviews</h2><p>SEBI may examine qualification, certification, net worth, client documentation, risk profiling, suitability and conflict disclosure practices.</p>",
        category: "SEBI",
        categorySlug: "sebi",
        tags: ["RIA", "SEBI", "Investment Adviser"],
        authorName: "Estabizz Editorial Desk",
        status: "Published",
        featuredImage: {
            url: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80",
            alt: "SEBI Investment Adviser compliance guide",
        },
        inlineImages: [],
        faqs: [
            { question: "Can an RIA manage client funds?", answer: "No. Managing client funds is not permitted under the RIA framework and may require separate PMS registration where applicable." },
            { question: "Is client risk profiling mandatory?", answer: "Yes. Client risk profiling and suitability assessment are central requirements before rendering investment advice." },
        ],
        focusKeyword: "SEBI RIA Registration",
        seoTitle: "SEBI RIA Registration - Advisory Distribution Structure",
        metaDescription: "SEBI RIA Registration explained with advisory-distribution segregation, suitability, client agreement, fee model and post-registration compliance.",
        ctaTitle: "Need RIA registration support?",
        ctaText: "Estabizz can help structure eligibility, documentation, Form A filing and post-registration compliance.",
        disclaimer: "This article is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice.",
        source: "admin",
        seoScore: 84,
        views: 0,
        readingTime: 5,
        publishedAt: "2026-05-02T00:00:00.000Z",
    },
];
