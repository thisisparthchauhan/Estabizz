/**
 * Admin Repository — Data Access Layer
 *
 * Reads and writes admin user records to MongoDB (admin_users collection).
 * Falls back to the static seedData when MongoDB returns nothing (first run /
 * cold-start before the collection has been populated).
 *
 * On the first call to getAllAdminUsers(), seedData records are automatically
 * inserted into MongoDB so all subsequent operations have a stable _id.
 *
 * SERVER-SIDE ONLY — never import from a "use client" component.
 */

import type {
  AdminUser,
  AdminRole,
  AdminPermission,
  AdminStatus,
  UpdateAdminUserInput,
  CreateAdminUserInput,
} from './types';
import { ROLE_DEFAULT_PERMISSIONS } from './types';
import { seedAdminUsers } from './seedData';

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

function mongoDocToAdminUser(raw: unknown): Omit<AdminUser, 'passwordHash'> {
  const doc = raw as {
    _id:           { toString(): string } | string;
    fullName:      string;
    email:         string;
    role:          AdminRole;
    status:        AdminStatus;
    permissions:   AdminPermission[];
    emailVerified: boolean;
    lastLoginAt?:  Date | string;
    createdAt:     Date | string;
    updatedAt:     Date | string;
  };
  return {
    id:            String(doc._id),
    fullName:      doc.fullName,
    email:         doc.email,
    role:          doc.role,
    status:        doc.status,
    permissions:   doc.permissions,
    emailVerified: doc.emailVerified,
    lastLoginAt:   doc.lastLoginAt ? new Date(doc.lastLoginAt).toISOString() : undefined,
    createdAt:     new Date(doc.createdAt).toISOString(),
    updatedAt:     new Date(doc.updatedAt).toISOString(),
  };
}

async function getAdminUserModel() {
  const { connectDB }    = await import('@/lib/db');
  const AdminUserModel   = (await import('@/lib/models/AdminUser')).default;
  await connectDB();
  return AdminUserModel;
}

/** Seeds MongoDB from static data if the collection is empty. Idempotent. */
async function ensureSynced() {
  const AdminUserModel = await getAdminUserModel();
  const count = await AdminUserModel.countDocuments();
  if (count > 0) return;

  const docs = seedAdminUsers.map(u => ({
    fullName:      u.fullName,
    email:         u.email,
    role:          u.role,
    status:        u.status,
    permissions:   u.permissions,
    emailVerified: u.emailVerified,
    lastLoginAt:   u.lastLoginAt ? new Date(u.lastLoginAt) : undefined,
  }));

  try {
    await AdminUserModel.insertMany(docs, { ordered: false });
  } catch {
    // Duplicate-key errors are fine — already seeded.
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Read operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a single admin user by email.
 * Tries MongoDB first; falls back to seedData.
 */
export async function getAdminUserByEmail(
  email: string
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  const normalised = email.toLowerCase().trim();

  try {
    const AdminUserModel = await getAdminUserModel();
    const doc = await AdminUserModel.findOne({ email: normalised }).lean();
    if (doc) return mongoDocToAdminUser(doc);
  } catch {
    // Fall through to seedData
  }

  const found = seedAdminUsers.find(u => u.email === normalised);
  return found ?? null;
}

/**
 * Fetch an admin user including passwordHash — for authentication only.
 */
export async function getAdminUserWithHashByEmail(
  email: string
): Promise<AdminUser | null> {
  const normalised = email.toLowerCase().trim();
  const found = seedAdminUsers.find(u => u.email === normalised);
  return found ? { ...found, passwordHash: undefined } : null;
}

/**
 * Fetch all admin users, optionally filtered by status.
 * Auto-seeds MongoDB from seedData on first call.
 */
export async function getAllAdminUsers(
  statusFilter?: AdminStatus
): Promise<Omit<AdminUser, 'passwordHash'>[]> {
  try {
    await ensureSynced();
    const AdminUserModel = await getAdminUserModel();
    const query = statusFilter ? { status: statusFilter } : {};
    const docs = await AdminUserModel.find(query).sort({ createdAt: 1 }).lean();
    return docs.map(mongoDocToAdminUser);
  } catch {
    const all = [...seedAdminUsers];
    return statusFilter ? all.filter(u => u.status === statusFilter) : all;
  }
}

/**
 * Count active super_admins in MongoDB.
 * Used to protect against removing the last super_admin.
 */
export async function countActiveSuperAdmins(): Promise<number> {
  try {
    const AdminUserModel = await getAdminUserModel();
    return AdminUserModel.countDocuments({ role: 'super_admin', status: 'active' });
  } catch {
    return seedAdminUsers.filter(u => u.role === 'super_admin' && u.status === 'active').length;
  }
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
 * Create a new admin user in MongoDB.
 * Throws on duplicate email.
 */
export async function createAdminUser(
  input: Pick<CreateAdminUserInput, 'fullName' | 'email' | 'role'>
): Promise<Omit<AdminUser, 'passwordHash'>> {
  const AdminUserModel = await getAdminUserModel();

  const doc = await AdminUserModel.create({
    fullName:      input.fullName.trim(),
    email:         input.email.toLowerCase().trim(),
    role:          input.role,
    status:        'active',
    permissions:   ROLE_DEFAULT_PERMISSIONS[input.role] ?? [],
    emailVerified: false,
  });

  return mongoDocToAdminUser(doc.toObject());
}

/**
 * Update admin user fields by MongoDB _id.
 * If role is changed, permissions are reset to that role's defaults.
 */
export async function updateAdminUserById(
  id: string,
  updates: Pick<UpdateAdminUserInput, 'fullName' | 'role' | 'status'>
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  const AdminUserModel = await getAdminUserModel();

  const set: Record<string, unknown> = {};
  if (updates.fullName !== undefined) set.fullName = updates.fullName.trim();
  if (updates.status   !== undefined) set.status   = updates.status;
  if (updates.role     !== undefined) {
    set.role        = updates.role;
    set.permissions = ROLE_DEFAULT_PERMISSIONS[updates.role] ?? [];
  }

  const doc = await AdminUserModel.findByIdAndUpdate(
    id,
    { $set: set },
    { new: true }
  ).lean();

  return doc ? mongoDocToAdminUser(doc) : null;
}

/**
 * Update the lastLoginAt timestamp for an admin user.
 * Called after a successful admin authentication.
 */
export async function recordAdminLogin(email: string): Promise<void> {
  const normalised = email.toLowerCase().trim();

  try {
    const AdminUserModel = await getAdminUserModel();
    await AdminUserModel.updateOne(
      { email: normalised },
      { $set: { lastLoginAt: new Date() } }
    );
  } catch {
    // Static layer fallback: in-memory update, not persisted across restarts
    const record = seedAdminUsers.find(u => u.email === normalised);
    if (record) {
      record.lastLoginAt = new Date().toISOString();
      record.updatedAt   = new Date().toISOString();
    }
  }
}

/**
 * Update admin user fields (role, status, permissions, etc.).
 * Returns the updated record, or null if not found.
 * @deprecated Use updateAdminUserById instead when the user's MongoDB _id is available.
 */
export async function updateAdminUser(
  email: string,
  updates: UpdateAdminUserInput
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  const normalised = email.toLowerCase().trim();

  try {
    const AdminUserModel = await getAdminUserModel();

    // First try to update the existing record
    let doc = await AdminUserModel.findOneAndUpdate(
      { email: normalised },
      { $set: updates },
      { new: true }
    ).lean();

    if (!doc) {
      // Not in MongoDB yet (seedData-only user) — upsert it
      const seed = seedAdminUsers.find(u => u.email === normalised);
      if (seed) {
        doc = await AdminUserModel.findOneAndUpdate(
          { email: normalised },
          {
            $setOnInsert: {
              fullName:      seed.fullName,
              role:          seed.role,
              status:        seed.status,
              permissions:   seed.permissions,
              emailVerified: seed.emailVerified,
            },
            $set: updates,
          },
          { new: true, upsert: true }
        ).lean();
      }
    }

    return doc ? mongoDocToAdminUser(doc) : null;
  } catch {
    // Static fallback
    const index = seedAdminUsers.findIndex(u => u.email === normalised);
    if (index === -1) return null;
    const existing = seedAdminUsers[index];
    const updated: Omit<AdminUser, 'passwordHash'> = {
      ...existing,
      ...updates,
      email:     existing.email,
      updatedAt: new Date().toISOString(),
    };
    seedAdminUsers[index] = updated;
    return updated;
  }
}
