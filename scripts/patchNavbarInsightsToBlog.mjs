/**
 * One-time patch: rename "Insights" → "Blogs" in the stored global.navbar
 * ContentBlock and any published ContentVersion snapshots.
 *
 * Usage: node scripts/patchNavbarInsightsToBlog.mjs
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

function patchQuickLinks(fields) {
  if (!Array.isArray(fields?.quickLinks)) return null;
  let changed = false;
  const patched = fields.quickLinks.map(link => {
    if (link.label === 'Insights') { changed = true; return { ...link, label: 'Blogs' }; }
    return link;
  });
  if (!changed) return null;
  return { ...fields, quickLinks: patched };
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  // 1. Patch ContentBlock
  const block = await ContentBlock.findOne({ key: 'global.navbar' });
  if (block) {
    const patched = patchQuickLinks(block.fields);
    if (patched) {
      block.fields = patched;
      block.markModified('fields');
      await block.save();
      console.log('✅  ContentBlock global.navbar — patched "Insights" → "Blogs"');
    } else {
      console.log('ℹ️   ContentBlock global.navbar — "Insights" label not found (already patched or not stored)');
    }
  } else {
    console.log('ℹ️   ContentBlock global.navbar — no record found (site uses defaults)');
  }

  // 2. Patch any published ContentVersion snapshots
  const versions = await ContentVersion.find({ blockKey: 'global.navbar' });
  let vPatched = 0;
  for (const v of versions) {
    const p = patchQuickLinks(v.snapshot);
    if (p) {
      v.snapshot = p;
      v.markModified('snapshot');
      await v.save();
      vPatched++;
    }
  }
  if (vPatched > 0) console.log(`✅  Patched ${vPatched} ContentVersion snapshot(s)`);
  else console.log('ℹ️   No ContentVersion snapshots needed patching');

  console.log('\nDone.');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌  Error:', err.message.replace(/mongodb\+srv:\/\/[^\s]*/gi, '[REDACTED]'));
  process.exit(1);
});
