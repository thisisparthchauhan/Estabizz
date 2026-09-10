import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJob extends Document {
  title: string;
  slug: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  salary_disclosed: boolean;
  experience_min: number | null;
  experience_max: number | null;
  skills: string[];
  status: 'draft' | 'published' | 'closed';
  postedBy: string;
  publishedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title:            { type: String, required: true, trim: true },
    slug:             { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    company:          { type: String, required: true, trim: true },
    location:         { type: String, default: '' },
    jobType:          { type: String, default: 'full-time' },
    description:      { type: String, default: '' },
    requirements:     [String],
    responsibilities: [String],
    salary_min:       { type: Number, default: null },
    salary_max:       { type: Number, default: null },
    salary_currency:  { type: String, default: null },
    salary_disclosed: { type: Boolean, default: false },
    experience_min:   { type: Number, default: null },
    experience_max:   { type: Number, default: null },
    skills:           [String],
    status:           { type: String, default: 'draft', index: true },
    postedBy:         { type: String, default: '' },
    publishedAt:      { type: Date, default: null },
    closedAt:         { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'jobs',
  }
);

JobSchema.index({ status: 1, publishedAt: -1 });
JobSchema.index({ slug: 1, status: 1 });

const JobModel: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default JobModel;
