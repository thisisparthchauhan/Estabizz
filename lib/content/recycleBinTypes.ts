// ─────────────────────────────────────────────────────────────────────────────
// Recycle Bin — shared TypeScript types
// SERVER-SIDE ONLY — do not import from "use client" components.
// ─────────────────────────────────────────────────────────────────────────────

export type RecycleBinItemType = 'media' | 'content' | 'regulatory' | 'public_content_page';

export interface RecycleBinItem {
  id: string;
  type: RecycleBinItemType;

  /** Display name: media title/filename or content block label */
  name: string;

  /** Human-readable sub-type: "Image", "PDF", "Website Section", etc. */
  subType: string;

  /** Where the item came from: folder name or "Page — Section" */
  location?: string;

  /** Email of the admin who removed this item (media: always "Unknown") */
  removedBy: string;

  /** ISO-8601 timestamp of soft-removal */
  removedAt: string;

  /** Status before it was removed: "published", "active", etc. */
  originalStatus: string;

  /** Cloudinary secure URL — only for media items */
  previewUrl?: string;

  /** The stable content key (e.g. "homepage.hero") — only for content items */
  contentKey?: string;

  /** File format label — only for media items */
  format?: string;
}

export interface RecycleBinResult {
  items: RecycleBinItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RecycleBinFilters {
  type?: string;       // all | media | content
  search?: string;
  removedBy?: string;
  from?: string;       // YYYY-MM-DD
  to?: string;         // YYYY-MM-DD
  page?: number;
  limit?: number;
}
