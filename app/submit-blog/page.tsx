import type { Metadata } from 'next';
import { getAllCategories } from '@/lib/blog/repository';
import SubmitBlogClient from './SubmitBlogClient';

export const metadata: Metadata = {
  title: 'Submit Your Article — Estabizz Regulatory Insights',
  description:
    'Share professional insights on finance, compliance, fintech, corporate governance, regulatory updates or business licensing. Every submission is reviewed by the Estabizz editorial team before publication.',
  alternates: { canonical: '/submit-blog' },
  openGraph: {
    title: 'Submit an Article — Estabizz Regulatory Insights',
    description:
      "Contribute to India's regulatory knowledge base. Share expert analysis on RBI, SEBI, IRDAI, IFSCA and allied frameworks.",
    url: '/submit-blog',
  },
};

export default async function SubmitBlogPage() {
  const categories = await getAllCategories();
  return <SubmitBlogClient categories={categories} />;
}
