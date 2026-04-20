"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface BlogAuthor {
    firstName: string;
    lastName: string;
    profileImage?: string;
}

interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: string;
    tags: string[];
    author: BlogAuthor;
    likeCount: number;
    views: number;
    publishedAt: string;
}

export default function FeaturedBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/blogs/featured")
            .then((r) => r.json())
            .then((data) => {
                if (data.blogs) setBlogs(data.blogs);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-white to-[#f0f7ff]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200" />
                                <div className="p-5">
                                    <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
                                    <div className="h-5 bg-gray-200 rounded mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (blogs.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#f0f7ff]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#0096D6]/10 text-[#0096D6] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Latest Insights
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-3">
                        From Our Knowledge Hub
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Expert perspectives on regulatory compliance, fintech innovation, and business growth
                    </p>
                </div>

                {/* Blog Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogs.map((blog) => (
                        <Link
                            key={blog._id}
                            href={`/blogs/${blog.slug}`}
                            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-[#0096D6] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-[#0a1628] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#0096D6] transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                    {blog.excerpt}
                                </p>

                                {/* Author & Meta */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0077B6] flex items-center justify-center text-white text-xs font-bold">
                                            {blog.author.firstName[0]}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {blog.author.firstName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                            {blog.likeCount}
                                        </span>
                                        <span>
                                            {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-10">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-[#0096D6]/25 transition-all duration-300"
                    >
                        View All Blogs
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
