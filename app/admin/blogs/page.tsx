import { getAllBlogsForAdmin } from "@/lib/blog/repository";
import AdminBlogsClient from "./AdminBlogsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "All Blogs — Estabizz Admin",
};

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogsForAdmin();
  return <AdminBlogsClient initialBlogs={blogs} />;
}
