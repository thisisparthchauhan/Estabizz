/**
 * submissionStore — shared in-memory store for all blogs created at runtime.
 *
 * WHY global?
 * ────────────
 * Next.js App Router runs API routes and Server Components in separate module
 * contexts (isolated module instances). A plain module-level `let _store = []`
 * creates a DIFFERENT array in each context — writes from an API route are
 * invisible to page renders and vice-versa.
 *
 * Storing on `global` mirrors the pattern used by `lib/db.ts` (mongoose cache)
 * and is the standard Next.js solution for sharing in-process state across
 * hot-reload boundaries and route-isolation boundaries.
 *
 * Lifetime: persists for the duration of the Node process (dev server session).
 * In production serverless (Vercel) every cold start resets the store — swap
 * with a real DB once you are ready.
 *
 * TODO: Replace with real DB operations:
 *   MongoDB  → Blog.insertOne / Blog.find
 *   Supabase → supabase.from('blogs').insert / .select
 */

import type { Blog } from './types';

// ── Global store declaration ──────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __estabizz_blogStore: Blog[] | undefined;
}

/** Always returns the single shared array, creating it if needed. */
function store(): Blog[] {
  if (!global.__estabizz_blogStore) {
    global.__estabizz_blogStore = [];
  }
  return global.__estabizz_blogStore;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Add a new blog (user submission or admin creation) to the shared store. */
export function addSubmission(blog: Blog): void {
  store().unshift(blog); // newest first
}

/** Return a snapshot of all stored blogs (any status). */
export function getSubmissions(): Blog[] {
  return [...store()];
}

/** Return only blogs awaiting editorial decision. */
export function getPendingSubmissions(): Blog[] {
  return store().filter((b) => b.status === 'pending_review');
}

/** Find a single blog by id. */
export function getSubmissionById(id: string): Blog | null {
  return store().find((b) => b.id === id) ?? null;
}

/** Update a blog (e.g. admin approves / rejects / edits). */
export function updateSubmission(id: string, patch: Partial<Blog>): Blog | null {
  const s   = store();
  const idx = s.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  s[idx] = { ...s[idx], ...patch, updatedAt: new Date().toISOString() };
  return s[idx];
}
