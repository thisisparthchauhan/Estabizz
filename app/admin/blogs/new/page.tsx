import BlogEditorClient from "../_components/BlogEditorClient";
import { getAllCategories } from "@/lib/blog/repository";
import type { BlogCategory } from "@/lib/blog/types";

export const metadata = {
  title: "New Blog — Estabizz Admin",
  robots: { index: false, follow: false },
};

export default async function NewBlogPage() {
  const categories: BlogCategory[] = await getAllCategories();
  return <BlogEditorClient blog={null} categories={categories} />;
}
