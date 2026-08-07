/**
 * One-time migration: upgrade info@estabizz.com to super_admin and
 * insert universetcenter@gmail.com as super_admin in the admin_users collection.
 *
 * Usage:  node scripts/upgradeAdminsToSuperAdmin.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

function loadEnv() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('❌  MONGODB_URI not set in .env.local'); process.exit(1); }

const SUPER_ADMIN_PERMISSIONS = [
  'manage_blogs','create_blog','edit_blog','approve_blog','publish_blog',
  'reject_blog','archive_blog','delete_blog','manage_categories',
  'manage_media','manage_users',
  'manage_content','publish_content','manage_navigation',
  'delete_content','purge_content','manage_seo','manage_backups',
  'manage_leads','view_admin',
];

const AdminUserSchema = new mongoose.Schema(
  { fullName: String, email: { type: String, lowercase: true, trim: true },
    role: String, status: String, permissions: [String], passwordHash: { type: String, select: false } },
  { collection: 'admin_users', timestamps: true }
);
const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  // 1. Upgrade info@estabizz.com to super_admin
  const infoResult = await AdminUser.updateOne(
    { email: 'info@estabizz.com' },
    { $set: { role: 'super_admin', permissions: SUPER_ADMIN_PERMISSIONS } }
  );
  if (infoResult.matchedCount > 0) {
    console.log('✅  info@estabizz.com → upgraded to super_admin');
  } else {
    // Not in DB yet — insert it
    await AdminUser.create({
      fullName: 'Estabizz Info Admin', email: 'info@estabizz.com',
      role: 'super_admin', status: 'active', permissions: SUPER_ADMIN_PERMISSIONS,
    });
    console.log('✅  info@estabizz.com → inserted as super_admin');
  }

  // 2. Upsert universetcenter@gmail.com as super_admin
  const existing = await AdminUser.findOne({ email: 'universetcenter@gmail.com' });
  if (existing) {
    await AdminUser.updateOne(
      { email: 'universetcenter@gmail.com' },
      { $set: { role: 'super_admin', status: 'active', permissions: SUPER_ADMIN_PERMISSIONS } }
    );
    console.log('✅  universetcenter@gmail.com → updated to super_admin');
  } else {
    await AdminUser.create({
      fullName: 'Universe TC Admin', email: 'universetcenter@gmail.com',
      role: 'super_admin', status: 'active', permissions: SUPER_ADMIN_PERMISSIONS,
    });
    console.log('✅  universetcenter@gmail.com → inserted as super_admin');
  }

  console.log('\nDone.');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌  Error:', err.message.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]'));
  process.exit(1);
});
