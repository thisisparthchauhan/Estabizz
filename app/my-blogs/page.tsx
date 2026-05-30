/**
 * /my-blogs — a logged-in user's own blog submissions.
 *
 * Server component: verifies the session, fetches blogs the user submitted,
 * and renders a client list where they can track status and delete their own
 * submissions. Not indexable.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth/session";
import { getBlogsByOwnerEmail } from "@/lib/blog/repository";
import type { BlogSummary } from "@/lib/blog/types";
import MyBlogsClient from "./MyBlogsClient";

export const metadata: Metadata = {
  title: "My Submissions",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MyBlogsPage() {
  const email = await getSessionEmail();
  if (!email) {
    redirect("/login?redirect=/my-blogs");
  }

  const blogs = await getBlogsByOwnerEmail(email);

  // Strip heavy fields for the list view
  const summaries: BlogSummary[] = blogs.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ content: _c, faqs: _f, images: _i, ...rest }) => rest
  );

  return <MyBlogsClient initialBlogs={summaries} email={email} />;
}
