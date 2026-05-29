/**
 * One-time seed script — inserts admin user records into MongoDB.
 *
 * RUN THIS ONCE after your MongoDB database is ready:
 *
 *   npx ts-node --project tsconfig.json scripts/seedAdminUsers.ts
 *
 * Or add to package.json scripts:
 *   "seed:admins": "ts-node scripts/seedAdminUsers.ts"
 *
 * WHAT IT DOES
 * ─────────────
 * 1. Connects to MongoDB using MONGODB_URI from .env / environment.
 * 2. Generates a bcrypt hash for each admin's initial password.
 * 3. Upserts AdminUser documents (safe to run multiple times).
 *
 * ⚠️  SECURITY WARNING
 * ─────────────────────
 * The DEFAULT_ADMIN_PASSWORD below is for initial setup ONLY.
 * Every admin MUST change their password immediately after first login.
 * Never commit a production password to source control.
 *
 * The DEFAULT_ADMIN_PASSWORD can also be passed via environment variable:
 *   ADMIN_SEED_PASSWORD=yourSecurePassword npx ts-node scripts/seedAdminUsers.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { seedAdminUsers } from '../lib/admin/seedData';

// ─── Configuration ────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI;
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD ?? 'ChangeMe@2026!';
const BCRYPT_ROUNDS = 12;

// ─── Inline schema (avoids circular import with next.js model guards) ─────────

const AdminUserSchema = new mongoose.Schema(
  {
    fullName:       { type: String, required: true },
    email:          { type: String, required: true, unique: true, lowercase: true },
    role:           { type: String, required: true },
    status:         { type: String, required: true },
    permissions:    { type: [String], required: true },
    passwordHash:   { type: String, select: false },
    emailVerified:  { type: Boolean, default: false },
    lastLoginAt:    { type: Date },
  },
  { timestamps: true, collection: 'admin_users' }
);

const AdminUserModel =
  mongoose.models.AdminUser ?? mongoose.model('AdminUser', AdminUserSchema);

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed(): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to your .env file before running this script.'
    );
  }

  console.log('Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('Connected.\n');

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, BCRYPT_ROUNDS);
  console.log('Password hash generated (rounds: %d)\n', BCRYPT_ROUNDS);

  for (const record of seedAdminUsers) {
    const result = await AdminUserModel.findOneAndUpdate(
      { email: record.email },
      {
        $setOnInsert: { passwordHash },   // only set hash on INSERT, not UPDATE
        $set: {
          fullName:      record.fullName,
          role:          record.role,
          status:        record.status,
          permissions:   record.permissions,
          emailVerified: record.emailVerified,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    const action = result.createdAt.getTime() === result.updatedAt.getTime()
      ? 'INSERTED'
      : 'UPDATED (existing record kept its passwordHash)';

    console.log('[%s] %s (%s)', action, record.email, record.role);
  }

  console.log('\nSeed complete.');
  console.log(
    '\n⚠️  IMPORTANT: Ask each admin to change their password after first login.\n'
  );

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
