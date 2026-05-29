import { getPendingSubmissions } from '@/lib/blog/repository';
import PendingBlogsClient from './PendingBlogsClient';

export const metadata = {
  title: "Pending Review — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default async function PendingBlogsPage() {
  const blogs = await getPendingSubmissions();
  return <PendingBlogsClient initialBlogs={blogs} />;
}
