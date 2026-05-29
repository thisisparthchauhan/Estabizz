/**
 * Static admin user seed records.
 *
 * PURPOSE
 * ───────
 * This file serves two roles:
 *   1. Development / test fallback when MongoDB is not connected.
 *   2. Source of truth for the database seed script (scripts/seedAdminUsers.ts).
 *
 * SECURITY NOTES
 * ──────────────
 * - No plain-text passwords are stored here.
 * - `passwordHash` is intentionally absent from mock records; the real hash is
 *   generated at seed time by the seed script.
 * - Emails are normalised to lowercase.
 * - Do NOT import this file in any "use client" component.
 *
 * TO MIGRATE TO A REAL BACKEND
 * ─────────────────────────────
 * Run `scripts/seedAdminUsers.ts` once after your MongoDB / Supabase /
 * PostgreSQL database is ready.  All records defined here will be inserted.
 * Once seeded, this file is no longer used at runtime — the repository.ts
 * functions switch to live database queries automatically when MONGODB_URI
 * is set.
 */

import { ROLE_DEFAULT_PERMISSIONS } from './types';
import type { AdminUser } from './types';

const now = new Date().toISOString();

export const seedAdminUsers: Omit<AdminUser, 'passwordHash'>[] = [
  // ── Primary super-admin ────────────────────────────────────────────────────
  {
    id: 'admin_001',
    fullName: 'Estabizz Super Admin',
    email: 'estabizz@gmail.com',    // normalised lowercase
    role: 'super_admin',
    status: 'active',
    permissions: ROLE_DEFAULT_PERMISSIONS['super_admin'],
    emailVerified: true,
    lastLoginAt: undefined,
    createdAt: now,
    updatedAt: now,
  },

  // ── Secondary admin ────────────────────────────────────────────────────────
  {
    id: 'admin_002',
    fullName: 'Estabizz Info Admin',
    email: 'info@estabizz.com',     // normalised lowercase
    role: 'admin',
    status: 'active',
    permissions: ROLE_DEFAULT_PERMISSIONS['admin'],
    emailVerified: true,
    lastLoginAt: undefined,
    createdAt: now,
    updatedAt: now,
  },
];

/**
 * The complete set of emails that are considered admin.
 * Used by the lightweight `isAdminEmail` check (no async required).
 *
 * IMPORTANT: Keep this in sync with `seedAdminUsers` above.
 * Both super_admin and admin entries must appear here.
 */
export const ADMIN_EMAIL_ALLOWLIST: ReadonlySet<string> = new Set(
  seedAdminUsers
    .filter((u) => u.status === 'active')
    .map((u) => u.email.toLowerCase())
);
