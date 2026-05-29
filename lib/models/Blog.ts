import mongoose, { Document, Model, Schema } from "mongoose";

export type BlogStatus = "Draft" | "Pending Review" | "Approved" | "Published" | "Rejected" | "Archived";

export interface BlogImage {
    url: string;
    alt: string;
    caption?: string;
}

export interface BlogFAQ {
    question: string;
    answer: string;
}

export interface BlogSubmitter {
    name?: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
}

export interface IBlog extends Document {
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
    submittedBy?: BlogSubmitter;
    source: "admin" | "user";
    seoScore: number;
    views: number;
    readingTime: number;
    publishedAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    archivedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogImageSchema = new Schema<BlogImage>(
    {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String, trim: true },
    },
    { _id: false }
);

const BlogFAQSchema = new Schema<BlogFAQ>(
    {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const BlogSubmitterSchema = new Schema<BlogSubmitter>(
    {
        name: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        phone: { type: String, trim: true },
        linkedIn: { type: String, trim: true },
    },
    { _id: false }
);

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        summary: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        category: { type: String, required: true, trim: true, index: true },
        categorySlug: { type: String, required: true, lowercase: true, trim: true, index: true },
        tags: [{ type: String, trim: true }],
        authorName: { type: String, required: true, trim: true },
        authorEmail: { type: String, trim: true, lowercase: true },
        status: {
            type: String,
            enum: ["Draft", "Pending Review", "Approved", "Published", "Rejected", "Archived"],
            default: "Draft",
            index: true,
        },
        featuredImage: BlogImageSchema,
        inlineImages: { type: [BlogImageSchema], default: [] },
        faqs: { type: [BlogFAQSchema], default: [] },
        focusKeyword: { type: String, trim: true },
        seoTitle: { type: String, trim: true },
        metaDescription: { type: String, trim: true },
        canonicalUrl: { type: String, trim: true },
        ogImage: { type: String, trim: true },
        ctaTitle: { type: String, trim: true },
        ctaText: { type: String, trim: true },
        disclaimer: { type: String, trim: true },
        submittedBy: BlogSubmitterSchema,
        source: { type: String, enum: ["admin", "user"], default: "admin" },
        seoScore: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        readingTime: { type: Number, default: 1 },
        publishedAt: Date,
        approvedAt: Date,
        rejectedAt: Date,
        archivedAt: Date,
    },
    { timestamps: true }
);

BlogSchema.index({ title: "text", summary: "text", tags: "text", focusKeyword: "text" });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
