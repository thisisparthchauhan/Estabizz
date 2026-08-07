/**
 * One-time patch: move the 'Blogs' quickLink to the last position in
 * global.navbar ContentBlock and ContentVersion snapshots.
 *
 * Usage: node scripts/moveBlogsToEnd.mjs
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

const ContentBlockSchema = new mongoose.Schema(
  { key: String, status: String, fields: mongoose.Schema.Types.Mixed },
  { collection: 'content_blocks', timestamps: true }
);
const ContentVersionSchema = new mongoose.Schema(
  { blockKey: String, status: String, snapshot: mongoose.Schema.Types.Mixed },
  { collection: 'content_versions', timestamps: true }
);
const ContentBlock = mongoose.models.ContentBlock || mongoose.model('ContentBlock', ContentBlockSchema);
const ContentVersion = mongoose.models.ContentVersion || mongoose.model('ContentVersion', ContentVersionSchema);

function reorderBlogs(fields) {
  if (!Array.isArray(fields?.quickLinks)) return null;
  const links = fields.quickLinks;
  const blogsIdx = links.findIndex(l => l.href === '/blogs' || l.label === 'Blogs');
  if (blogsIdx === -1 || blogsIdx === links.length - 1) return null; // already last or not found
  const reordered = [...links];
  const [blogsLink] = reordered.splice(blogsIdx, 1);
  reordered.push(blogsLink);
  return { ...fields, quickLinks: reordered };
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  const block = await ContentBlock.findOne({ key: 'global.navbar' });
  if (block) {
    const patched = reorderBlogs(block.fields);
    if (patched) {
      block.fields = patched;
      block.markModified('fields');
      await block.save();
      console.log('✅  ContentBlock global.navbar — Blogs moved to last position');
      console.log('    Order now:', patched.quickLinks.map(l => l.label).join(' → '));
    } else {
      console.log('ℹ️   ContentBlock global.navbar — Blogs already last or not found');
    }
  } else {
    console.log('ℹ️   ContentBlock global.navbar — no record found');
  }

  const versions = await ContentVersion.find({ blockKey: 'global.navbar' });
  let vPatched = 0;
  for (const v of versions) {
    const p = reorderBlogs(v.snapshot);
    if (p) {
      v.snapshot = p;
      v.markModified('snapshot');
      await v.save();
      vPatched++;
    }
  }
  console.log(vPatched > 0 ? `✅  Patched ${vPatched} ContentVersion snapshot(s)` : 'ℹ️   No ContentVersion snapshots needed patching');

  console.log('\nDone.');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌  Error:', err.message.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]'));
  process.exit(1);
});
