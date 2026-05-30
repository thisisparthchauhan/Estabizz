"use client";

/**
 * CloudinaryUploader — direct browser → Cloudinary image upload button.
 *
 * Uses an UNSIGNED upload preset, so only the public cloud name and preset
 * name are needed (no API secret in the client). Configure via env:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 *
 * On success, calls onUploaded(secureUrl) with the hosted https URL.
 */

import { useRef, useState } from "react";

const CLOUD  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function CloudinaryUploader({
  onUploaded,
  size = "md",
}: {
  onUploaded: (url: string) => void;
  size?: "sm" | "md";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const configured = Boolean(CLOUD && PRESET);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!configured) {
      setError("Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be 10 MB or smaller.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET as string);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
        { method: "POST", body: fd }
      );
      const data = await res.json();
      if (!res.ok || !data.secure_url) {
        throw new Error(data?.error?.message || "Upload failed. Try again.");
      }
      onUploaded(data.secure_url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const pad = size === "sm" ? "px-2.5 py-2 text-[12px]" : "px-3.5 py-2.5 text-[13px]";

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl border font-bold transition-colors disabled:opacity-60 ${pad} ${
          uploading
            ? "border-[#dbe7f3] bg-[#f0faff] text-[#0096D6]"
            : "border-[#0096D6]/40 bg-[#f0faff] text-[#0096D6] hover:border-[#0096D6] hover:bg-[#e8f7ff]"
        }`}
        title="Upload an image to Cloudinary"
      >
        {uploading ? (
          <>
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
            Uploading…
          </>
        ) : (
          <>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12" />
            </svg>
            Upload
          </>
        )}
      </button>
      {error && <span className="text-[11px] font-semibold text-red-500">{error}</span>}
    </div>
  );
}
