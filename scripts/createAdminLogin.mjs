/**
 * One-off helper: create/reset the LOGIN credential (User collection) for an
 * admin email so they can sign in at /login. The admin's ROLE & permissions
 * come separately from the AdminUser allowlist — this only sets the password.
 *
 * Usage:
 *   node scripts/createAdminLogin.mjs <email> <password>
 *   node scripts/createAdminLogin.mjs estabizz@gmail.com 'Estabizz@2026'
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ── Load MONGODB_URI from .env.local (standalone scripts don't get it auto) ──
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

const email = (process.argv[2] || 'estabizz@gmail.com').toLowerCase().trim();
const password = process.argv[3] || 'Estabizz@2026';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found (.env.local).');
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    mobile: String,
    password: String,
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const run = async () => {
  await mongoose.connect(MONGODB_URI);
  const hash = await bcrypt.hash(password, 12);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.password = hash;
    if (!existing.firstName) existing.firstName = 'Estabizz';
    if (!existing.lastName) existing.lastName = 'Admin';
    await existing.save();
    console.log(`✅ Reset password for existing user: ${email}`);
  } else {
    await User.create({ firstName: 'Estabizz', lastName: 'Admin', email, password: hash });
    console.log(`✅ Created new login user: ${email}`);
  }

  console.log(`\n   Login at /login with:`);
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}\n`);

  await mongoose.disconnect();
};

run().catch((e) => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
