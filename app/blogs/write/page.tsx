'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CATEGORIES = [
  'Regulatory Updates',
  'Industry News',
  'Guides & Tutorials',
  'Fintech Insights',
  'Compliance Tips',
  'Case Studies',
  'Opinion',
];

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
}

function BlogWriteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editSlug = searchParams.get('edit');
  const isEditMode = !!editSlug;

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [additionalImageUploading, setAdditionalImageUploading] = useState(false);
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [coverDragOver, setCoverDragOver] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);

  // Check auth
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
        setAuthLoading(false);
      })
      .catch(() => setAuthLoading(false));
  }, []);

  // Fetch blog data if editing
  useEffect(() => {
    if (!isEditMode || !user) return;
    setLoadingBlog(true);
    fetch(`/api/blogs/${editSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then(({ blog }) => {
        setTitle(blog.title || '');
        setCategory(blog.category || '');
        setTags(blog.tags || []);
        setExcerpt(blog.excerpt || '');
        setCoverImage(blog.coverImage || '');
        setAdditionalImages(blog.images || []);
        setContent(blog.content || '');
      })
      .catch(() => setError('Failed to load blog for editing.'))
      .finally(() => setLoadingBlog(false));
  }, [isEditMode, editSlug, user]);

  // Image upload helper
  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: reader.result }),
          });
          if (!res.ok) throw new Error('Upload failed');
          const data = await res.json();
          resolve(data.url);
        } catch {
          setError('Image upload failed. Please try again.');
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  // Cover image handlers
  const handleCoverImageSelect = useCallback(
    async (file: File) => {
      setCoverImageUploading(true);
      setError('');
      const url = await uploadImage(file);
      if (url) setCoverImage(url);
      setCoverImageUploading(false);
    },
    [uploadImage]
  );

  const handleCoverDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setCoverDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) handleCoverImageSelect(file);
    },
    [handleCoverImageSelect]
  );

  // Additional image handler
  const handleAdditionalImageSelect = useCallback(
    async (file: File) => {
      setAdditionalImageUploading(true);
      setError('');
      const url = await uploadImage(file);
      if (url) setAdditionalImages((prev) => [...prev, url]);
      setAdditionalImageUploading(false);
    },
    [uploadImage]
  );

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Tags
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagsFromInput();
    }
  };

  const addTagsFromInput = () => {
    const newTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t));
    if (newTags.length) setTags((prev) => [...prev, ...newTags]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // Formatting toolbar
  const wrapSelection = (before: string, after: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newContent =
      content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
    }, 0);
  };

  const formatActions = [
    { label: 'Bold', icon: 'B', before: '<strong>', after: '</strong>' },
    { label: 'Italic', icon: 'I', before: '<em>', after: '</em>' },
    { label: 'Heading', icon: 'H', before: '<h2>', after: '</h2>' },
    { label: 'Link', icon: '\u{1F517}', before: '<a href="">', after: '</a>' },
    { label: 'List', icon: '\u{2022}', before: '<ul>\n<li>', after: '</li>\n</ul>' },
    { label: 'Quote', icon: '\u{201C}', before: '<blockquote>', after: '</blockquote>' },
  ];

  // Submit
  const handleSubmit = async (publishNow: boolean) => {
    setError('');
    if (!title.trim()) return setError('Title is required.');
    if (!category) return setError('Please select a category.');
    if (!excerpt.trim()) return setError('Excerpt is required.');
    if (!coverImage) return setError('Please upload a cover image.');
    if (!content.trim()) return setError('Content is required.');

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        category,
        tags,
        excerpt: excerpt.trim(),
        coverImage,
        images: additionalImages,
        content,
        ...(publishNow ? { status: 'published' } : {}),
      };

      const url = isEditMode ? `/api/blogs/${editSlug}` : '/api/blogs';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save blog');
      }

      if (publishNow && user?.role === 'admin') {
        setSuccessMessage('Your blog has been published successfully!');
      } else {
        setSuccessMessage(
          'Your blog has been submitted for review. It will be published once approved by our team.'
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  // Auth loading
  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0096D6]" />
        </div>
        <Footer />
      </>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-[#0096D6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#0096D6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0a1628] mb-3">Please login to write a blog</h2>
            <p className="text-gray-500 mb-6">
              You need to be logged in to create and publish blog posts on Estabizz Fintech.
            </p>
            <a
              href="/login"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#0096D6] to-[#0078aa] text-white font-semibold hover:shadow-lg transition-all"
            >
              Login
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Success modal
  if (successMessage) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0a1628] mb-3">Success!</h2>
            <p className="text-gray-600 mb-8">{successMessage}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/blogs')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#0096D6] to-[#0078aa] text-white font-semibold hover:shadow-lg transition-all"
              >
                View All Blogs
              </button>
              <button
                onClick={() => {
                  setSuccessMessage('');
                  setTitle('');
                  setCategory('');
                  setTags([]);
                  setExcerpt('');
                  setCoverImage('');
                  setAdditionalImages([]);
                  setContent('');
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Write Another
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Loading blog for edit
  if (loadingBlog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0096D6] mx-auto mb-4" />
            <p className="text-gray-500">Loading blog data...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0a1628]">
              {isEditMode ? 'Edit Blog Post' : 'Write a New Blog Post'}
            </h1>
            <p className="mt-2 text-gray-500">
              {isEditMode
                ? 'Update your blog post below.'
                : 'Share your knowledge and insights with the Estabizz Fintech community.'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/20 outline-none transition-all text-[#0a1628] text-lg"
              />
            </div>

            {/* Category & Tags row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/20 outline-none transition-all text-[#0a1628] bg-white"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Tags</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={addTagsFromInput}
                  placeholder="Type tags, press Enter or comma..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/20 outline-none transition-all text-[#0a1628]"
                />
              </div>
            </div>

            {/* Tag pills */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 -mt-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0096D6]/10 text-[#0096D6] text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500 transition-colors"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => {
                  if (e.target.value.length <= 300) setExcerpt(e.target.value);
                }}
                placeholder="Write a short summary of your blog post..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/20 outline-none transition-all text-[#0a1628] resize-none"
              />
              <div className="text-right mt-1">
                <span className={`text-xs ${excerpt.length >= 280 ? 'text-orange-500' : 'text-gray-400'}`}>
                  {excerpt.length}/300
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                Cover Image <span className="text-red-500">*</span>
              </label>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleCoverImageSelect(file);
                  e.target.value = '';
                }}
              />
              {coverImage ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={coverImage} alt="Cover" className="w-full h-64 object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-red-50 transition-colors"
                    aria-label="Remove cover image"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-4 py-2 bg-white/90 rounded-lg shadow text-sm font-medium text-[#0a1628] hover:bg-white transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => !coverImageUploading && coverInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setCoverDragOver(true);
                  }}
                  onDragLeave={() => setCoverDragOver(false)}
                  onDrop={handleCoverDrop}
                  className={`flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                    coverDragOver
                      ? 'border-[#0096D6] bg-[#0096D6]/5'
                      : 'border-gray-300 hover:border-[#0096D6] hover:bg-gray-50'
                  }`}
                >
                  {coverImageUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0096D6]" />
                      <span className="text-sm text-gray-500">Uploading image...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                Additional Images <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                ref={additionalInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAdditionalImageSelect(file);
                  e.target.value = '';
                }}
              />
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-3">
                  {additionalImages.map((img, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                      <img src={img} alt={`Additional ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(i)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        aria-label={`Remove image ${i + 1}`}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => !additionalImageUploading && additionalInputRef.current?.click()}
                disabled={additionalImageUploading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#0096D6] transition-all disabled:opacity-50"
              >
                {additionalImageUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#0096D6]" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add More Images
                  </>
                )}
              </button>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[#0a1628]">
                  Content <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`text-sm font-medium px-3 py-1 rounded-lg transition-all ${
                    showPreview
                      ? 'bg-[#0096D6] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              {/* Formatting toolbar */}
              <div className="flex items-center gap-1 p-2 bg-gray-50 border border-gray-200 border-b-0 rounded-t-xl">
                {formatActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => wrapSelection(action.before, action.after)}
                    title={action.label}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-white hover:text-[#0096D6] rounded-lg transition-colors"
                  >
                    {action.label === 'Bold' ? (
                      <span className="font-bold">B</span>
                    ) : action.label === 'Italic' ? (
                      <span className="italic">I</span>
                    ) : action.label === 'Heading' ? (
                      <span className="font-bold text-xs">H2</span>
                    ) : action.label === 'Link' ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    ) : action.label === 'List' ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here... You can use HTML tags for formatting."
                className="w-full px-4 py-3 rounded-b-xl border border-gray-200 focus:border-[#0096D6] focus:ring-2 focus:ring-[#0096D6]/20 outline-none transition-all text-[#0a1628] resize-y font-mono text-sm"
                style={{ minHeight: '400px' }}
              />

              {/* Live Preview */}
              {showPreview && (
                <div className="mt-4 p-6 rounded-xl border border-gray-200 bg-white">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Preview</h3>
                  <div
                    className="prose prose-sm sm:prose max-w-none text-[#0a1628]"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              )}
            </div>

            {/* Submit buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#0096D6] to-[#0078aa] text-white font-semibold hover:shadow-lg hover:shadow-[#0096D6]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                    Submitting...
                  </span>
                ) : isEditMode ? (
                  'Update & Submit for Review'
                ) : (
                  'Submit for Review'
                )}
              </button>

              {user.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:shadow-lg hover:shadow-green-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditMode ? 'Update & Publish' : 'Publish Now'}
                </button>
              )}

              <button
                type="button"
                onClick={() => router.push('/blogs')}
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BlogWritePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0096D6]"></div></div>}>
      <BlogWriteContent />
    </Suspense>
  );
}
