/**
 * Permission sync/backfill — safe one-time migration.
 *
 * For every admin_user in MongoDB, compares the stored permissions array with
 * the canonical defaults for that role (ROLE_DEFAULT_PERMISSIONS below).
 * Any default permission that is missing from the stored array is added.
 * Nothing is ever removed — custom or extra permissions are preserved.
 *
 * Safe to run multiple times (idempotent). Uses $addToSet so re-runs are no-ops.
 *
 * Usage:
 *   node scripts/syncAdminRolePermissions.mjs
 *   node scripts/syncAdminRolePermissions.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

// ── Load .env.local ────────────────────────────────────────────────────────────

function loadEnv() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

// ── Args ───────────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run');

// ── Canonical role → permission defaults ──────────────────────────────────────
// Must stay in sync with lib/admin/types.ts ROLE_DEFAULT_PERMISSIONS.
// Script is standalone (.mjs) so we inline these rather than importing TypeScript.

const ROLE_DEFAULT_PERMISSIONS = {
  super_admin: [
    'manage_blogs', 'create_blog', 'edit_blog', 'approve_blog', 'publish_blog',
    'reject_blog', 'archive_blog', 'delete_blog', 'manage_categories',
    'manage_media', 'manage_users',
    'manage_content', 'publish_content', 'manage_navigation',
    'delete_content', 'purge_content', 'manage_seo', 'manage_backups',
    'view_admin',
  ],
  admin: [
    'manage_blogs', 'create_blog', 'edit_blog', 'approve_blog', 'publish_blog',
    'reject_blog', 'archive_blog', 'delete_blog', 'manage_categories',
    'manage_media',
    // manage_users intentionally excluded — only super_admin
    'manage_content', 'publish_content', 'manage_navigation',
    'delete_content', 'purge_content', 'manage_seo', 'manage_backups',
    'view_admin',
  ],
  website_editor: [
    'manage_content', 'manage_navigation', 'manage_media', 'view_admin',
  ],
  content_writer: [
    'manage_blogs', 'create_blog', 'edit_blog', 'manage_media',
    'manage_content', 'view_admin',
  ],
  compliance_reviewer: [
    'manage_blogs', 'approve_blog', 'reject_blog', 'publish_blog', 'archive_blog',
    'publish_content', 'view_admin',
  ],
  seo_manager: [
    'manage_seo', 'manage_media', 'view_admin',
  ],
  admin_viewer: [
    'view_admin',
  ],
  editor: [
    'manage_blogs', 'create_blog', 'edit_blog', 'manage_categories',
    'manage_media', 'manage_content', 'manage_navigation',
  ],
  reviewer: [
    'manage_blogs', 'approve_blog', 'publish_blog', 'reject_blog',
    'archive_blog', 'publish_content',
  ],
};

const RECOGNISED_ROLES = new Set(Object.keys(ROLE_DEFAULT_PERMISSIONS));

// ── Minimal AdminUser schema (standalone — avoids TypeScript compilation) ──────

const AdminUserSchema = new mongoose.Schema(
  {
    fullName:    String,
    email:       { type: String, lowercase: true, trim: true },
    role:        String,
    status:      String,
    permissions: [String],
    passwordHash: { type: String, select: false }, // never selected
  },
  { collection: 'admin_users', timestamps: true }
);

const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model('AdminUser', AdminUserSchema);

// ── Connect ────────────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not found. Add it to .env.local and retry.');
  process.exit(1);
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  if (DRY_RUN) {
    console.log('DRY RUN — no changes will be written.\n');
  }

  // Fetch all users. passwordHash excluded by schema { select: false }.
  const users = await AdminUser.find({}).lean();
  console.log(`Checking ${users.length} admin user${users.length !== 1 ? 's' : ''}...\n`);

  let updatedCount = 0;
  const updatedEmails = [];
  const addedByEmail = {};

  for (const user of users) {
    const role = user.role;

    if (!RECOGNISED_ROLES.has(role)) {
      console.log(`  ${user.email} — unrecognised role "${role}", skipped`);
      continue;
    }

    const roleDefaults   = ROLE_DEFAULT_PERMISSIONS[role] ?? [];
    const currentPerms   = Array.isArray(user.permissions) ? user.permissions : [];
    const missingPerms   = roleDefaults.filter(p => !currentPerms.includes(p));

    if (missingPerms.length === 0) {
      console.log(`  ${user.email} (${role}, ${user.status}): already up to date`);
      continue;
    }

    console.log(`  ${user.email} (${role}, ${user.status}): adding ${missingPerms.join(', ')}`);

    if (!DRY_RUN) {
      // $addToSet is idempotent — safe to re-run
      await AdminUser.updateOne(
        { _id: user._id },
        { $addToSet: { permissions: { $each: missingPerms } } }
      );
    }

    updatedCount++;
    updatedEmails.push(user.email);
    addedByEmail[user.email] = missingPerms;
  }

  // ── Summary ────────────────────────────────────────────────────────────────

  console.log('\n' + '─'.repeat(52));
  console.log('Summary' + (DRY_RUN ? ' (dry run — no changes written)' : ''));
  console.log('─'.repeat(52));
  console.log(`  Users checked:  ${users.length}`);
  console.log(`  Users updated:  ${updatedCount}`);

  if (updatedCount > 0) {
    console.log(`  Emails updated: ${updatedEmails.join(', ')}`);
    console.log('  Permissions added:');
    for (const [email, perms] of Object.entries(addedByEmail)) {
      console.log(`    ${email}: ${perms.join(', ')}`);
    }
  }

  console.log('\nDone.');
  await mongoose.disconnect();
}

run().catch(err => {
  // Never print env vars or connection strings from the error
  const msg = err instanceof Error ? err.message : String(err);
  const safe = msg.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]');
  console.error('❌  Error:', safe);
  process.exit(1);
});
