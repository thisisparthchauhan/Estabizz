'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface BlogAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  images: string[];
  category: string;
  tags: string[];
  author: BlogAuthor;
  likeCount: number;
  likes: string[];
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likePending, setLikePending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (res.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (!data.blog) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setBlog(data.blog);
      setLikeCount(data.blog.likeCount || 0);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUserId(data.user._id);
        }
      }
    } catch {
      // Not logged in
    }
  }, []);

  useEffect(() => {
    fetchBlog();
    checkAuth();
  }, [fetchBlog, checkAuth]);

  useEffect(() => {
    if (blog && userId) {
      const hasLiked = blog.likes?.some(
        (id) => id.toString() === userId.toString()
      );
      setLiked(!!hasLiked);
    }
  }, [blog, userId]);

  const handleLike = async () => {
    if (!userId) {
      alert('Please login to like');
      return;
    }
    if (likePending) return;
    setLikePending(true);
    try {
      const res = await fetch(`/api/blogs/${slug}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch {
      // Silently fail
    } finally {
      setLikePending(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || '');
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch {
      // Fallback
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Skeleton loader */}
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
              <div className="h-72 bg-gray-200 rounded-xl mb-8" />
              <div className="h-6 w-24 bg-gray-200 rounded-full mb-4" />
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
            <h1 className="text-2xl font-bold text-[#0a1628] mb-2">
              Blog Not Found
            </h1>
            <p className="text-gray-500 mb-6">
              The blog post you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#0096D6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0080b8] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const authorInitial =
    blog.author?.firstName?.charAt(0)?.toUpperCase() || 'A';
  const authorName = blog.author
    ? `${blog.author.firstName} ${blog.author.lastName}`
    : 'Anonymous';
  const displayDate = blog.publishedAt || blog.createdAt;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#0096D6] hover:text-[#0080b8] font-medium mb-8 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blogs
          </Link>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative w-full max-h-[500px] rounded-xl overflow-hidden mb-8">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                width={1200}
                height={500}
                className="w-full h-auto max-h-[500px] object-cover"
                priority
              />
            </div>
          )}

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-block bg-[#0096D6]/10 text-[#0096D6] text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author info row */}
          <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-gray-200">
            {/* Avatar */}
            {blog.author?.profileImage ? (
              <Image
                src={blog.author.profileImage}
                alt={authorName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#0096D6] flex items-center justify-center text-white font-bold text-sm">
                {authorInitial}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="text-[#0a1628] font-medium">
                by {authorName}
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>{formatDate(displayDate)}</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {blog.views} views
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <button
                onClick={handleLike}
                disabled={likePending}
                className="flex items-center gap-1 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
                {likeCount}
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <div
            className="blog-content prose prose-lg max-w-none
              prose-headings:text-[#0a1628] prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#0096D6] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#0a1628]
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-li:text-gray-700 prose-li:mb-1
              prose-blockquote:border-l-4 prose-blockquote:border-[#0096D6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-img:rounded-lg prose-img:my-6
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-[#0a1628] prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
              mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Additional Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#0a1628] mb-4">
                Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={img}
                      alt={`${blog.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Like & Share Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-gray-200 mb-12">
            {/* Like button */}
            <button
              onClick={handleLike}
              disabled={likePending}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all disabled:opacity-50 ${
                liked
                  ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {liked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
              {liked ? 'Liked' : 'Like'} ({likeCount})
            </button>

            {/* Share buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Share:</span>
              <button
                onClick={() => handleShare('twitter')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077B5] hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={copyLink}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#0096D6] hover:text-white transition-colors"
                aria-label="Copy link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
