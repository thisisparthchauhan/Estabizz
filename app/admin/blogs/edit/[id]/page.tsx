import { notFound } from "next/navigation";
import BlogEditorClient from "../../_components/BlogEditorClient";
import { getBlogByIdForAdmin, getAllCategories } from "@/lib/blog/repository";
import type { BlogCategory } from "@/lib/blog/types";

export const metadata = {
  title: "Edit Blog — Estabizz Admin",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const [blog, categories] = await Promise.all([
    getBlogByIdForAdmin(id),
    getAllCategories() as Promise<BlogCategory[]>,
  ]);

  if (!blog) return notFound();

  return <BlogEditorClient blog={blog} categories={categories} />;
}
