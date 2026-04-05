import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    images: string[];
    category: string;
    tags: string[];
    author: Types.ObjectId;
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'hidden';
    rejectionReason?: string;
    featured: boolean;
    featuredOrder?: number;
    likes: Types.ObjectId[];
    likeCount: number;
    views: number;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true, maxlength: 300 },
        coverImage: { type: String, required: true },
        images: [{ type: String }],
        category: { type: String, required: true, trim: true },
        tags: [{ type: String, trim: true }],
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
            type: String,
            enum: ['draft', 'pending', 'published', 'rejected', 'hidden'],
            default: 'pending',
        },
        rejectionReason: { type: String },
        featured: { type: Boolean, default: false },
        featuredOrder: { type: Number },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        likeCount: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        publishedAt: { type: Date },
    },
    { timestamps: true }
);

BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ author: 1, status: 1 });
BlogSchema.index({ featured: 1, featuredOrder: 1 });
BlogSchema.index({ category: 1 });

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
