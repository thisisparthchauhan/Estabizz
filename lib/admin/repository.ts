/**
 * Admin Repository — Data Access Layer
 *
 * Currently backed by static seed data (lib/admin/seedData.ts).
 *
 * HOW TO SWAP TO MONGODB
 * ──────────────────────
 * 1. Uncomment the MongoDB block in each function.
 * 2. Delete or comment out the static-data fallback.
 * 3. All callers (helpers.ts, API routes, admin layout) remain unchanged.
 *
 * HOW TO SWAP TO SUPABASE / POSTGRESQL / FIREBASE
 * ─────────────────────────────────────────────────
 * Keep every exported function signature identical.
 * Replace only the function body with your SDK call.
 *
 * SERVER-SIDE ONLY — never import from a "use client" component.
 */

import type { AdminUser, AdminPermission, AdminStatus, UpdateAdminUserInput } from './types';
import { seedAdminUsers } from './seedData';

// ─────────────────────────────────────────────────────────────────────────────
// Read operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a single admin user by email.
 * Email comparison is case-insensitive.
 * Returns null when not found.
 */
export async function getAdminUserByEmail(
  email: string
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  const normalised = email.toLowerCase().trim();

  // ── TODO: Replace with MongoDB query ─────────────────────────────────────
  // const { connectDB } = await import('@/lib/db');
  // const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
  // await connectDB();
  // const doc = await AdminUserModel.findOne({ email: normalised, status: 'active' }).lean();
  // if (!doc) return null;
  // return mongoDocToAdminUser(doc);
  // ─────────────────────────────────────────────────────────────────────────

  const found = seedAdminUsers.find((u) => u.email === normalised);
  return found ?? null;
}

/**
 * Fetch an admin user including passwordHash — for authentication only.
 * The passwordHash field is deliberately excluded from all other queries.
 */
export async function getAdminUserWithHashByEmail(
  email: string
): Promise<AdminUser | null> {
  const normalised = email.toLowerCase().trim();

  // ── TODO: Replace with MongoDB query (with +passwordHash) ─────────────────
  // const { connectDB } = await import('@/lib/db');
  // const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
  // await connectDB();
  // const doc = await AdminUserModel.findOne({ email: normalised }).select('+passwordHash').lean();
  // if (!doc) return null;
  // return mongoDocToAdminUser(doc);
  // ─────────────────────────────────────────────────────────────────────────

  // Static layer does not store hashes — return record without it
  const found = seedAdminUsers.find((u) => u.email === normalised);
  return found ? { ...found, passwordHash: undefined } : null;
}

/**
 * Fetch all admin users.
 * Optional status filter.
 */
export async function getAllAdminUsers(
  statusFilter?: AdminStatus
): Promise<Omit<AdminUser, 'passwordHash'>[]> {
  // ── TODO: Replace with MongoDB query ─────────────────────────────────────
  // const { connectDB } = await import('@/lib/db');
  // const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
  // await connectDB();
  // const query = statusFilter ? { status: statusFilter } : {};
  // const docs = await AdminUserModel.find(query).lean();
  // return docs.map(mongoDocToAdminUser);
  // ─────────────────────────────────────────────────────────────────────────

  if (statusFilter) {
    return seedAdminUsers.filter((u) => u.status === statusFilter);
  }
  return [...seedAdminUsers];
}

/**
 * Check whether an email belongs to an active admin.
 * Synchronous — uses the in-memory allowlist for hot paths (e.g. middleware).
 */
export function isAdminEmailSync(email: string): boolean {
  const { ADMIN_EMAIL_ALLOWLIST } = require('./seedData') as {
    ADMIN_EMAIL_ALLOWLIST: ReadonlySet<string>;
  };
  return ADMIN_EMAIL_ALLOWLIST.has(email.toLowerCase().trim());
}

// ─────────────────────────────────────────────────────────────────────────────
// Write operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Update the lastLoginAt timestamp for an admin user.
 * Called after a successful admin authentication.
 */
export async function recordAdminLogin(email: string): Promise<void> {
  const normalised = email.toLowerCase().trim();

  // ── TODO: Replace with MongoDB update ────────────────────────────────────
  // const { connectDB } = await import('@/lib/db');
  // const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
  // await connectDB();
  // await AdminUserModel.updateOne(
  //   { email: normalised },
  //   { $set: { lastLoginAt: new Date(), updatedAt: new Date() } }
  // );
  // ─────────────────────────────────────────────────────────────────────────

  // Static layer: no-op (in-memory update not persisted)
  const record = seedAdminUsers.find((u) => u.email === normalised);
  if (record) {
    record.lastLoginAt = new Date().toISOString();
    record.updatedAt = new Date().toISOString();
  }
}

/**
 * Update admin user fields (role, status, permissions, etc.).
 * Returns the updated record, or null if not found.
 */
export async function updateAdminUser(
  email: string,
  updates: UpdateAdminUserInput
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  const normalised = email.toLowerCase().trim();

  // ── TODO: Replace with MongoDB update ────────────────────────────────────
  // const { connectDB } = await import('@/lib/db');
  // const AdminUserModel = (await import('@/lib/models/AdminUser')).default;
  // await connectDB();
  // const doc = await AdminUserModel.findOneAndUpdate(
  //   { email: normalised },
  //   { $set: { ...updates, updatedAt: new Date() } },
  //   { new: true }
  // ).lean();
  // return doc ? mongoDocToAdminUser(doc) : null;
  // ─────────────────────────────────────────────────────────────────────────

  const index = seedAdminUsers.findIndex((u) => u.email === normalised);
  if (index === -1) return null;

  const existing = seedAdminUsers[index];
  const updated: Omit<AdminUser, 'passwordHash'> = {
    ...existing,
    ...updates,
    email: existing.email, // email is immutable
    updatedAt: new Date().toISOString(),
  };
  seedAdminUsers[index] = updated;
  return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// TODO: MongoDB document → AdminUser mapper
// Uncomment when switching to real MongoDB queries.
// ─────────────────────────────────────────────────────────────────────────────
//
// function mongoDocToAdminUser(doc: Record<string, unknown>): Omit<AdminUser, 'passwordHash'> {
//   return {
//     id: String(doc._id),
//     fullName: doc.fullName as string,
//     email: doc.email as string,
//     role: doc.role as AdminRole,
//     status: doc.status as AdminStatus,
//     permissions: doc.permissions as AdminPermission[],
//     emailVerified: doc.emailVerified as boolean,
//     lastLoginAt: doc.lastLoginAt ? new Date(doc.lastLoginAt as Date).toISOString() : undefined,
//     createdAt: new Date(doc.createdAt as Date).toISOString(),
//     updatedAt: new Date(doc.updatedAt as Date).toISOString(),
//   };
// }
