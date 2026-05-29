import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  blogId: string;          // our own string id (not Mongo _id)
  title: string;
  slug: string;
  summary: string;
  content: string;

  featuredImage: { url: string; alt: string; caption: string };
  images: { url: string; alt: string; caption: string }[];

  category: { id: string; name: string; slug: string; description: string; icon: string; color: string };
  tags: string[];

  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profileImage?: string;
    role: string;
    designation: string;
  };

  status: string;
  featured: boolean;
  isUserSubmitted: boolean;

  submittedBy?: { name: string; email: string; company?: string; message?: string };
  reviewedBy?: string;
  adminNotes?: string;

  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;

  faqs: { question: string; answer: string; order: number }[];
  disclaimer?: string;
  ctaText?: string;

  readingTime: number;
  views: number;
  likeCount: number;

  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    blogId:    { type: String, required: true, unique: true, index: true },
    title:     { type: String, required: true, trim: true },
    slug:      { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    summary:   { type: String, default: '' },
    content:   { type: String, required: true },

    featuredImage: {
      url:     { type: String, default: '' },
      alt:     { type: String, default: '' },
      caption: { type: String, default: '' },
    },
    images: [{ url: String, alt: String, caption: String }],

    category: {
      id:          { type: String, required: true },
      name:        { type: String, required: true },
      slug:        { type: String, required: true },
      description: { type: String, default: '' },
      icon:        { type: String, default: '' },
      color:       { type: String, default: '' },
    },
    tags: [String],

    author: {
      id:           { type: String, default: '' },
      firstName:    { type: String, default: '' },
      lastName:     { type: String, default: '' },
      email:        { type: String, default: '' },
      bio:          { type: String, default: '' },
      profileImage: { type: String },
      role:         { type: String, default: 'admin' },
      designation:  { type: String, default: '' },
    },

    status:          { type: String, default: 'draft', index: true },
    featured:        { type: Boolean, default: false },
    isUserSubmitted: { type: Boolean, default: false },

    submittedBy: {
      name:    String,
      email:   String,
      company: String,
      message: String,
    },
    reviewedBy: String,
    adminNotes: String,

    focusKeyword:    { type: String, default: '' },
    seoTitle:        { type: String, default: '' },
    metaDescription: { type: String, default: '' },

    faqs: [{ question: String, answer: String, order: Number }],
    disclaimer: String,
    ctaText:    String,

    readingTime: { type: Number, default: 1 },
    views:       { type: Number, default: 0 },
    likeCount:   { type: Number, default: 0 },

    publishedAt: Date,
  },
  {
    timestamps: true,
    collection: 'blogs',
  }
);

// Compound indexes for common queries
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ 'category.slug': 1, status: 1 });
BlogSchema.index({ slug: 1, status: 1 });

const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;
