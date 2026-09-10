import { connectDB } from '@/lib/db';
import JobModel from '@/lib/models/Job';

type RawDoc = Record<string, unknown>;

export interface PublicJobDetail {
  id: string;
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
  publishedAt: string | null;
}

function iso(d: unknown): string | null {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function arrayOf<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

// Lines 321+: getPublicJobBySlug — salary fields are gated on salary_disclosed
// to prevent leaking non-disclosed compensation data through the public API.
export async function getPublicJobBySlug(slug: string): Promise<PublicJobDetail | null> {
  await connectDB();
  const doc = await JobModel.findOne({ slug, status: 'published' }).lean() as unknown as RawDoc | null;
  if (!doc) return null;

  const salaryDisclosed = !!doc.salary_disclosed;

  return {
    id: String(doc._id),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    company: String(doc.company ?? ''),
    location: String(doc.location ?? ''),
    jobType: String(doc.jobType ?? ''),
    description: String(doc.description ?? ''),
    requirements: arrayOf<string>(doc.requirements),
    responsibilities: arrayOf<string>(doc.responsibilities),
    salary_disclosed: salaryDisclosed,
    salary_min: salaryDisclosed ? (typeof doc.salary_min === 'number' ? doc.salary_min : null) : null,
    salary_max: salaryDisclosed ? (typeof doc.salary_max === 'number' ? doc.salary_max : null) : null,
    salary_currency: salaryDisclosed ? (typeof doc.salary_currency === 'string' ? doc.salary_currency : null) : null,
    experience_min: typeof doc.experience_min === 'number' ? doc.experience_min : null,
    experience_max: typeof doc.experience_max === 'number' ? doc.experience_max : null,
    skills: arrayOf<string>(doc.skills),
    publishedAt: iso(doc.publishedAt),
  };
}

export async function listPublicJobs(): Promise<PublicJobDetail[]> {
  await connectDB();
  const docs = await JobModel.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();
  return (docs as unknown as RawDoc[]).map((doc) => {
    const salaryDisclosed = !!doc.salary_disclosed;
    return {
      id: String(doc._id),
      title: String(doc.title ?? ''),
      slug: String(doc.slug ?? ''),
      company: String(doc.company ?? ''),
      location: String(doc.location ?? ''),
      jobType: String(doc.jobType ?? ''),
      description: String(doc.description ?? ''),
      requirements: arrayOf<string>(doc.requirements),
      responsibilities: arrayOf<string>(doc.responsibilities),
      salary_disclosed: salaryDisclosed,
      salary_min: salaryDisclosed ? (typeof doc.salary_min === 'number' ? doc.salary_min : null) : null,
      salary_max: salaryDisclosed ? (typeof doc.salary_max === 'number' ? doc.salary_max : null) : null,
      salary_currency: salaryDisclosed ? (typeof doc.salary_currency === 'string' ? doc.salary_currency : null) : null,
      experience_min: typeof doc.experience_min === 'number' ? doc.experience_min : null,
      experience_max: typeof doc.experience_max === 'number' ? doc.experience_max : null,
      skills: arrayOf<string>(doc.skills),
      publishedAt: iso(doc.publishedAt),
    };
  });
}
