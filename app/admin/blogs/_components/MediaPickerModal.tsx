"use client";

import React, { useEffect, useState } from "react";

export interface PickedMediaImage {
  secureUrl: string;
  publicId?: string;
  altText?: string;
  caption?: string;
  width?: number;
  height?: number;
  title?: string;
  fileName?: string;
}

interface MediaApiItem {
  secureUrl?: string;
  publicId?: string;
  altText?: string;
  caption?: string;
  width?: number;
  height?: number;
  title?: string;
  fileName?: string;
}

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (image: PickedMediaImage) => void;
}) {
  const [items, setItems] = useState<PickedMediaImage[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ type: "image", limit: "24" });
        if (search.trim()) params.set("search", search.trim());
        const res = await fetch(`/api/admin/media?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load images.");
        if (!cancelled) {
          setItems(
            (Array.isArray(data.items) ? data.items : [])
              .map((item: MediaApiItem) => ({
                secureUrl: String(item.secureUrl ?? ""),
                publicId: item.publicId,
                altText: item.altText,
                caption: item.caption,
                width: item.width,
                height: item.height,
                title: item.title,
                fileName: item.fileName,
              }))
              .filter((item: PickedMediaImage) => item.secureUrl)
          );
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load images.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const t = setTimeout(load, 180);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [open, search]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#06101f]/55 px-4 py-6" role="dialog" aria-modal="true" aria-label="Choose image from Media Library">
      <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[#0d1a2d] shadow-[0_24px_70px_rgba(6,16,31,0.32)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#e8f0f8] dark:border-[#223550] px-5 py-4">
          <div>
            <p className="text-[14px] font-black text-[#0a1628] dark:text-[#f7f9fc]">Choose from Media Library</p>
            <p className="mt-0.5 text-[12px] text-[#64748b] dark:text-[#a9b6c9]">Select an uploaded image for this blog.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#dbe7f3] dark:border-[#223550] px-3 py-2 text-[12px] font-bold text-[#64748b] dark:text-[#a9b6c9] hover:border-[#1677f2] hover:text-[#1677f2]"
          >
            Close
          </button>
        </div>

        <div className="border-b border-[#e8f0f8] dark:border-[#223550] px-5 py-3">
          <label className="sr-only" htmlFor="blog-media-search">Search images</label>
          <input
            id="blog-media-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by name, alt text or tag"
            className="w-full rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-white dark:bg-[var(--input-background)] px-3.5 py-2.5 text-[13px] text-[#0a1628] dark:text-[#f7f9fc] outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/12"
            autoFocus
          />
        </div>

        <div className="min-h-[260px] overflow-y-auto p-5">
          {loading && <p className="py-12 text-center text-[13px] font-semibold text-[#64748b] dark:text-[#a9b6c9]">Loading images...</p>}
          {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="py-12 text-center text-[13px] font-semibold text-[#64748b] dark:text-[#a9b6c9]">No images found.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.publicId || item.secureUrl}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[#223550] bg-[#f8fbff] dark:bg-[#12223a] text-left transition hover:border-[#1677f2] hover:shadow-[0_10px_26px_rgba(22,119,242,0.14)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.secureUrl} alt="" className="h-28 w-full object-cover" loading="lazy" />
                  <div className="p-2">
                    <p className="truncate text-[11px] font-bold text-[#334155] dark:text-[#dbeafe]">{item.title || item.fileName || "Image"}</p>
                    <p className="mt-0.5 truncate text-[10px] text-[#94a3b8]">{item.width && item.height ? `${item.width} x ${item.height}` : item.publicId || "Cloudinary image"}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
