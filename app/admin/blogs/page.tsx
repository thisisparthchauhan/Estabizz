"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  author: { name: string; email: string };
  category: string;
  status: "pending" | "published" | "rejected" | "hidden";
  featured?: boolean;
  featuredOrder?: number;
  rejectionReason?: string;
  views: number;
  likes: number;
  createdAt: string;
}

type StatusFilter = "all" | "pending" | "published" | "rejected" | "hidden";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-300",
  published: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
  hidden: "bg-gray-100 text-gray-600 border-gray-300",
};

export default function AdminBlogsPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState({ all: 0, pending: 0, published: 0, rejected: 0, hidden: 0 });

  // Reject modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectBlogId, setRejectBlogId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  // Delete confirmation state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Featured blogs state
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [savingFeatured, setSavingFeatured] = useState(false);

  // Action loading
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setIsAdmin(data?.user?.role === "admin");
      })
      .catch(() => setIsAdmin(false));
  }, []);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/blogs?${params.toString()}`);
      const data = await res.json();
      const blogList: Blog[] = data.blogs || [];
      setBlogs(blogList);

      // Compute counts from the full list when filter is "all", otherwise re-fetch counts
      if (statusFilter === "all") {
        setCounts({
          all: blogList.length,
          pending: blogList.filter((b) => b.status === "pending").length,
          published: blogList.filter((b) => b.status === "published").length,
          rejected: blogList.filter((b) => b.status === "rejected").length,
          hidden: blogList.filter((b) => b.status === "hidden").length,
        });
        setFeaturedBlogs(
          blogList
            .filter((b) => b.featured)
            .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
            .slice(0, 4)
        );
      }
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (isAdmin) fetchBlogs();
  }, [isAdmin, fetchBlogs]);

  // Action handlers
  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "published" }),
      });
      await fetchBlogs();
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectBlogId || !rejectReason.trim()) return;
    setRejectLoading(true);
    try {
      await fetch(`/api/admin/blogs/${rejectBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", rejectionReason: rejectReason }),
      });
      setRejectModalOpen(false);
      setRejectBlogId(null);
      setRejectReason("");
      await fetchBlogs();
    } finally {
      setRejectLoading(false);
    }
  };

  const handleHide = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "hidden" }),
      });
      await fetchBlogs();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBlogId) return;
    setDeleteLoading(true);
    try {
      await fetch(`/api/admin/blogs/${deleteBlogId}`, { method: "DELETE" });
      setDeleteModalOpen(false);
      setDeleteBlogId(null);
      await fetchBlogs();
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleFeatured = (blog: Blog) => {
    if (blog.featured) {
      setFeaturedBlogs((prev) => prev.filter((b) => b._id !== blog._id));
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, featured: false } : b))
      );
    } else {
      if (featuredBlogs.length >= 4) return;
      const updated = { ...blog, featured: true, featuredOrder: featuredBlogs.length };
      setFeaturedBlogs((prev) => [...prev, updated]);
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, featured: true } : b))
      );
    }
  };

  const moveFeatured = (index: number, direction: "up" | "down") => {
    const newList = [...featuredBlogs];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newList.length) return;
    [newList[index], newList[swapIdx]] = [newList[swapIdx], newList[index]];
    setFeaturedBlogs(newList);
  };

  const saveFeaturedOrder = async () => {
    setSavingFeatured(true);
    try {
      await fetch("/api/admin/blogs/featured", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featured: featuredBlogs.map((b, i) => ({ blogId: b._id, order: i })),
        }),
      });
    } finally {
      setSavingFeatured(false);
    }
  };

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (searchQuery && !b.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Access denied
  if (isAdmin === false) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You do not have permission to access blog management. Admin access is required.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2 rounded-lg text-white" style={{ backgroundColor: "#0096D6" }}>
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Loading auth
  if (isAdmin === null) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="animate-spin w-10 h-10 border-4 border-gray-200 rounded-full" style={{ borderTopColor: "#0096D6" }} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold" style={{ color: "#0a1628" }}>
              Blog Management
            </h1>
            <p className="text-gray-500 mt-1">
              {counts.all} total blogs &middot; {counts.pending} pending review &middot; {counts.published} published
            </p>
          </div>

          {/* Featured Blogs Section */}
          {featuredBlogs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h2 className="text-lg font-semibold" style={{ color: "#0a1628" }}>
                    Featured on Homepage
                  </h2>
                  <span className="text-sm text-gray-400">({featuredBlogs.length}/4)</span>
                </div>
                <button
                  onClick={saveFeaturedOrder}
                  disabled={savingFeatured}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "#0096D6" }}
                >
                  {savingFeatured ? "Saving..." : "Save Featured Order"}
                </button>
              </div>
              <div className="space-y-2">
                {featuredBlogs.map((blog, idx) => (
                  <div
                    key={blog._id}
                    className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <span className="text-sm font-bold text-amber-600 w-6 text-center">
                      #{idx + 1}
                    </span>
                    {blog.coverImage && (
                      <img
                        src={blog.coverImage}
                        alt=""
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <span className="flex-1 font-medium text-gray-800 truncate text-sm">
                      {blog.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveFeatured(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-amber-200 disabled:opacity-30 transition-colors"
                        title="Move up"
                      >
                        <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveFeatured(idx, "down")}
                        disabled={idx === featuredBlogs.length - 1}
                        className="p-1 rounded hover:bg-amber-200 disabled:opacity-30 transition-colors"
                        title="Move down"
                      >
                        <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleFeatured(blog)}
                        className="p-1 rounded hover:bg-red-100 transition-colors ml-1"
                        title="Remove from featured"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {(["all", "pending", "published", "rejected", "hidden"] as StatusFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  statusFilter === tab
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
                style={
                  statusFilter === tab
                    ? { backgroundColor: tab === "all" ? "#0096D6" : undefined }
                    : undefined
                }
              >
                <span
                  className={
                    statusFilter === tab && tab !== "all"
                      ? `px-3 py-2 rounded-lg text-sm font-medium text-white`
                      : undefined
                  }
                  style={
                    statusFilter === tab && tab !== "all"
                      ? {
                          backgroundColor:
                            tab === "pending"
                              ? "#d97706"
                              : tab === "published"
                              ? "#16a34a"
                              : tab === "rejected"
                              ? "#dc2626"
                              : "#6b7280",
                        }
                      : undefined
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "pending" && counts.pending > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-500 rounded-full">
                      {counts.pending}
                    </span>
                  )}
                  {tab !== "all" && tab !== "pending" && (
                    <span className="ml-1 text-xs opacity-70">({counts[tab]})</span>
                  )}
                  {tab === "all" && (
                    <span className="ml-1 text-xs opacity-70">({counts.all})</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search blogs by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: "#0096D6" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Blog List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-gray-200 rounded-full" style={{ borderTopColor: "#0096D6" }} />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500">No blogs found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100" style={{ backgroundColor: "#0a1628" }}>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Blog
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Author
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Category
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Status
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Stats
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Date
                      </th>
                      <th className="text-right text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBlogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                        {/* Blog title + thumbnail */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {blog.coverImage ? (
                              <img
                                src={blog.coverImage}
                                alt=""
                                className="w-12 h-9 rounded object-cover flex-shrink-0 border border-gray-200"
                              />
                            ) : (
                              <div className="w-12 h-9 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <span className="font-medium text-gray-900 text-sm line-clamp-2 max-w-[220px]">
                              {blog.title}
                            </span>
                          </div>
                        </td>
                        {/* Author */}
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-800 font-medium">{blog.author?.name || "Unknown"}</div>
                          <div className="text-xs text-gray-400">{blog.author?.email || ""}</div>
                        </td>
                        {/* Category */}
                        <td className="px-4 py-3">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            {blog.category || "Uncategorized"}
                          </span>
                        </td>
                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                              STATUS_COLORS[blog.status] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                          </span>
                        </td>
                        {/* Stats */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {blog.views ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {blog.likes ?? 0}
                            </span>
                          </div>
                        </td>
                        {/* Date */}
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View */}
                            <Link
                              href={`/blogs/${blog.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="View blog"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>

                            {/* Approve - for pending, rejected, hidden */}
                            {(blog.status === "pending" || blog.status === "rejected" || blog.status === "hidden") && (
                              <button
                                onClick={() => handleApprove(blog._id)}
                                disabled={actionLoading === blog._id}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors disabled:opacity-50"
                                title={blog.status === "hidden" ? "Unhide / Publish" : "Approve"}
                              >
                                {blog.status === "hidden" ? "Unhide" : "Approve"}
                              </button>
                            )}

                            {/* Reject - for pending */}
                            {blog.status === "pending" && (
                              <button
                                onClick={() => {
                                  setRejectBlogId(blog._id);
                                  setRejectReason("");
                                  setRejectModalOpen(true);
                                }}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                              >
                                Reject
                              </button>
                            )}

                            {/* Hide - for published */}
                            {blog.status === "published" && (
                              <button
                                onClick={() => handleHide(blog._id)}
                                disabled={actionLoading === blog._id}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50"
                              >
                                Hide
                              </button>
                            )}

                            {/* Feature toggle - for published */}
                            {blog.status === "published" && (
                              <button
                                onClick={() => toggleFeatured(blog)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  blog.featured
                                    ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                                    : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"
                                }`}
                                title={blog.featured ? "Remove from featured" : "Add to featured"}
                              >
                                <svg className="w-4 h-4" fill={blog.featured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => {
                                setDeleteBlogId(blog._id);
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3">
                {filteredBlogs.map((blog) => (
                  <div key={blog._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex gap-3 mb-3">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt=""
                          className="w-16 h-12 rounded object-cover flex-shrink-0 border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{blog.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {blog.author?.name || "Unknown"} &middot; {blog.author?.email || ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                          STATUS_COLORS[blog.status]
                        }`}
                      >
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {blog.category || "Uncategorized"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {blog.views ?? 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {blog.likes ?? 0} likes
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap border-t border-gray-100 pt-3">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        View
                      </Link>

                      {(blog.status === "pending" || blog.status === "rejected" || blog.status === "hidden") && (
                        <button
                          onClick={() => handleApprove(blog._id)}
                          disabled={actionLoading === blog._id}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors disabled:opacity-50"
                        >
                          {blog.status === "hidden" ? "Unhide" : "Approve"}
                        </button>
                      )}

                      {blog.status === "pending" && (
                        <button
                          onClick={() => {
                            setRejectBlogId(blog._id);
                            setRejectReason("");
                            setRejectModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                        >
                          Reject
                        </button>
                      )}

                      {blog.status === "published" && (
                        <>
                          <button
                            onClick={() => handleHide(blog._id)}
                            disabled={actionLoading === blog._id}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50"
                          >
                            Hide
                          </button>
                          <button
                            onClick={() => toggleFeatured(blog)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              blog.featured
                                ? "text-amber-500 bg-amber-50"
                                : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"
                            }`}
                            title={blog.featured ? "Remove from featured" : "Add to featured"}
                          >
                            <svg className="w-4 h-4" fill={blog.featured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          setDeleteBlogId(blog._id);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors ml-auto"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setRejectModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Reject Blog Post</h3>
            <p className="text-sm text-gray-500 mb-4">
              Provide a reason for rejection. The author will be notified.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
              style={{ focusRingColor: "#0096D6" } as React.CSSProperties}
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim() || rejectLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {rejectLoading ? "Rejecting..." : "Reject Blog"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Blog Post</h3>
            <p className="text-sm text-gray-500 mb-5">
              This action cannot be undone. The blog post will be permanently deleted.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
