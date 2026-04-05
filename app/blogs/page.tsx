'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Author {
    _id: string;
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
    author: Author;
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'hidden';
    rejectionReason?: string;
    likeCount: number;
    views: number;
    publishedAt?: string;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage?: string;
}

const CATEGORIES = [
    'All',
    'Fintech',
    'RBI',
    'SEBI',
    'IRDAI',
    'IFSCA',
    'FEMA',
    'Compliance',
    'Regulatory',
    'Finance',
    'Legal',
    'Technology',
];

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        published: 'bg-green-100 text-green-700 border-green-200',
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        rejected: 'bg-red-100 text-red-700 border-red-200',
        draft: 'bg-gray-100 text-gray-600 border-gray-200',
        hidden: 'bg-gray-100 text-gray-500 border-gray-200',
    };
    return (
        <span
            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${colors[status] || colors.draft}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0,
    });
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Check auth
    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => res.json())
            .then((data) => {
                if (data.user) setUser(data.user);
            })
            .catch(() => {});
    }, []);

    const fetchBlogs = useCallback(
        async (page: number) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.set('page', String(page));
                params.set('limit', '12');
                if (activeCategory !== 'All') {
                    params.set('category', activeCategory);
                }
                if (activeTab === 'my') {
                    params.set('my', 'true');
                }
                const res = await fetch(`/api/blogs?${params.toString()}`);
                const data = await res.json();
                if (res.ok) {
                    setBlogs(data.blogs || []);
                    setPagination(data.pagination || { page: 1, limit: 12, total: 0, pages: 0 });
                }
            } catch {
                // silent
            } finally {
                setLoading(false);
            }
        },
        [activeCategory, activeTab]
    );

    useEffect(() => {
        fetchBlogs(1);
    }, [fetchBlogs]);

    const goToPage = (page: number) => {
        if (page < 1 || page > pagination.pages) return;
        fetchBlogs(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const authorName = (author: Author) =>
        `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Anonymous';

    const authorInitial = (author: Author) =>
        (author.firstName?.[0] || author.lastName?.[0] || 'A').toUpperCase();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0a1628] to-[#0096D6] overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0096D6] rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Insights &amp; Knowledge Hub
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Expert perspectives on fintech regulations, compliance strategies, and
                            industry trends shaping India&apos;s financial landscape.
                        </p>
                    </div>
                </section>

                {/* Tabs + Filters */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    {/* Main Tabs */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => {
                                setActiveTab('all');
                                setActiveCategory('All');
                            }}
                            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                activeTab === 'all'
                                    ? 'bg-[#0096D6] text-white shadow-md shadow-blue-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6]'
                            }`}
                        >
                            All Blogs
                        </button>
                        {user && (
                            <button
                                onClick={() => {
                                    setActiveTab('my');
                                    setActiveCategory('All');
                                }}
                                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                    activeTab === 'my'
                                        ? 'bg-[#0096D6] text-white shadow-md shadow-blue-200'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6]'
                                }`}
                            >
                                My Blogs
                            </button>
                        )}
                    </div>

                    {/* Category Filters */}
                    {activeTab === 'all' && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === cat
                                            ? 'bg-[#0096D6] text-white shadow-sm'
                                            : 'bg-white text-gray-500 border border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                {/* Blog Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                                >
                                    <div className="h-52 bg-gray-200" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-20" />
                                        <div className="h-5 bg-gray-200 rounded w-full" />
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-[#0096D6]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {activeTab === 'my'
                                    ? "You haven't written any blogs yet"
                                    : 'No blogs found'}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {activeTab === 'my'
                                    ? 'Start sharing your expertise with the community.'
                                    : 'Try a different category or check back later.'}
                            </p>
                            {activeTab === 'my' && user && (
                                <Link
                                    href="/blogs/write"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0096D6] text-white font-semibold rounded-xl hover:bg-[#0080b8] transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Write Your First Blog
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Cover Image */}
                                    <Link href={`/blogs/${blog.slug}`} className="block relative">
                                        <div className="relative h-52 overflow-hidden bg-gray-100">
                                            <Image
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>
                                        {/* Category Badge */}
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-[#0096D6] text-white text-xs font-semibold rounded-full shadow-md">
                                            {blog.category}
                                        </span>
                                        {/* Status Badge for My Blogs */}
                                        {activeTab === 'my' && blog.status !== 'published' && (
                                            <span className="absolute top-4 right-4">
                                                <StatusBadge status={blog.status} />
                                            </span>
                                        )}
                                    </Link>

                                    {/* Content */}
                                    <div className="p-6">
                                        <Link href={`/blogs/${blog.slug}`}>
                                            <h2 className="text-lg font-bold text-[#0a1628] mb-2 line-clamp-2 group-hover:text-[#0096D6] transition-colors">
                                                {blog.title}
                                            </h2>
                                        </Link>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                            {blog.excerpt}
                                        </p>

                                        {/* Tags */}
                                        {blog.tags && blog.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {blog.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-blue-50 text-[#0096D6] text-xs font-medium rounded"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 3 && (
                                                    <span className="px-2 py-0.5 text-gray-400 text-xs">
                                                        +{blog.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Rejection Reason */}
                                        {activeTab === 'my' && blog.status === 'rejected' && blog.rejectionReason && (
                                            <div className="mb-4 p-2.5 bg-red-50 border border-red-100 rounded-lg">
                                                <p className="text-xs text-red-600">
                                                    <span className="font-semibold">Reason:</span>{' '}
                                                    {blog.rejectionReason}
                                                </p>
                                            </div>
                                        )}

                                        {/* Author & Meta */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0a1628] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                    {authorInitial(blog.author)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate">
                                                        {authorName(blog.author)}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDate(blog.publishedAt || blog.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                                <span className="text-xs font-medium">
                                                    {blog.likeCount || 0}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More */}
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0096D6] hover:text-[#0080b8] transition-colors group/link"
                                        >
                                            Read More
                                            <svg
                                                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && pagination.pages > 1 && (
                        <nav className="flex items-center justify-center gap-2 mt-12">
                            <button
                                onClick={() => goToPage(pagination.page - 1)}
                                disabled={pagination.page <= 1}
                                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-[#0096D6] hover:text-[#0096D6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                .filter((p) => {
                                    const current = pagination.page;
                                    return (
                                        p === 1 ||
                                        p === pagination.pages ||
                                        Math.abs(p - current) <= 2
                                    );
                                })
                                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                                        acc.push('...');
                                    }
                                    acc.push(p);
                                    return acc;
                                }, [])
                                .map((item, idx) =>
                                    item === '...' ? (
                                        <span
                                            key={`ellipsis-${idx}`}
                                            className="px-2 text-gray-400 text-sm"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => goToPage(item as number)}
                                            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                                                pagination.page === item
                                                    ? 'bg-[#0096D6] text-white shadow-md shadow-blue-200'
                                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6]'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            <button
                                onClick={() => goToPage(pagination.page + 1)}
                                disabled={pagination.page >= pagination.pages}
                                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-[#0096D6] hover:text-[#0096D6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </section>

                {/* Floating Write Button */}
                {user && (
                    <Link
                        href="/blogs/write"
                        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3.5 bg-[#0096D6] text-white font-semibold rounded-full shadow-lg shadow-blue-300/40 hover:bg-[#0080b8] hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                        Write a Blog
                    </Link>
                )}
            </main>
            <Footer />
        </>
    );
}
