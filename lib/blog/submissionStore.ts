/**
 * submissionStore — in-memory store for user-submitted blog articles.
 *
 * Why a separate store?
 *  - sampleBlogs is a static const — mutating it at runtime causes issues
 *    with Next.js module caching and is semantically wrong.
 *  - This module holds submissions that arrive at /api/submit-blog.
 *
 * Lifetime: persists for the duration of the Node process (dev server session).
 * In production serverless deployments (Vercel), the array resets on every
 * cold start. That is expected behaviour for a mock layer.
 *
 * TODO: Replace addSubmission / getSubmissions with real DB operations:
 *   MongoDB  → db.collection('blogs').insertOne(blog) / find({ isUserSubmitted: true })
 *   Supabase → supabase.from('blogs').insert(blog)
 *   Firebase → db.collection('blogs').add(blog)
 */

import type { Blog } from './types';

// Module-level mutable array — intentional, this IS the mock persistence layer
// eslint-disable-next-line prefer-const
let _store: Blog[] = [];

/** Add a new user-submitted blog (status: pending_review) to the store. */
export function addSubmission(blog: Blog): void {
  _store.unshift(blog); // newest first
}

/** Return all user-submitted blogs (any status). */
export function getSubmissions(): Blog[] {
  return [..._store];
}

/** Return only those awaiting editorial decision. */
export function getPendingSubmissions(): Blog[] {
  return _store.filter((b) => b.status === 'pending_review');
}

/** Find a single submission by id. */
export function getSubmissionById(id: string): Blog | null {
  return _store.find((b) => b.id === id) ?? null;
}

/** Update a submission (e.g. admin approves / rejects). */
export function updateSubmission(id: string, patch: Partial<Blog>): Blog | null {
  const idx = _store.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  _store[idx] = { ..._store[idx], ...patch, updatedAt: new Date().toISOString() };
  return _store[idx];
}
