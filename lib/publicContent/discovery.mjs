import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

const SCAN_ROOTS = [
  'app/rbi',
  'app/sebi',
  'app/irdai',
  'app/ifsca',
  'app/fema',
  'app/services',
  'app/regulatory',
  'app/resources',
  'app/legal',
  'app/19-5',
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'page.tsx' || entry.name === 'page.ts') out.push(full);
  }
  return out;
}

function routeFromPageFile(file) {
  const route = file.replace(/^app/, '').replace(/\/page\.tsx?$/, '');
  return route || '/';
}

function slugFromPath(fullPath) {
  const parts = fullPath.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'home';
}

function titleFromSlug(slug) {
  return slug
    .replace(/\[[^\]]+\]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase()) || 'Untitled Page';
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function cleanTitle(value) {
  return String(value ?? '')
    .replace(/\$\{[^}]+\}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return cleanTitle(match[1]);
    if (match?.[2]) return cleanTitle(match[2]);
  }
  return '';
}

function inferMenuGroup(fullPath) {
  if (fullPath.startsWith('/services')) return 'services';
  if (fullPath.startsWith('/resources')) return 'resources';
  if (fullPath.startsWith('/19-5')) return '19_5';
  if (fullPath.startsWith('/legal')) return 'legal';
  if (/^\/(rbi|sebi|irdai|ifsca|fema|regulatory)(\/|$)/.test(fullPath)) return 'regulatory';
  return 'other';
}

function inferRegulator(fullPath) {
  if (fullPath.startsWith('/rbi')) return 'RBI';
  if (fullPath.startsWith('/sebi')) return 'SEBI';
  if (fullPath.startsWith('/irdai')) return 'IRDAI';
  if (fullPath.startsWith('/ifsca')) return 'IFSCA';
  if (fullPath.startsWith('/fema')) return 'FEMA';
  return 'Other';
}

function inferPageType(fullPath, pageText, clientText) {
  if (fullPath.startsWith('/19-5')) return 'landing_19_5';
  if (fullPath.startsWith('/legal')) return 'legal';
  if (clientText.includes('ServicePageLayout')) return 'guide';
  if (fullPath.startsWith('/resources')) return 'resource';
  if (fullPath === '/regulatory') return 'category_landing';
  if (/^\/(rbi|sebi|irdai|ifsca|fema|services)$/.test(fullPath)) return 'service_landing';
  if (pageText.includes('redirect(') || pageText.includes('permanentRedirect(')) return 'special';
  return 'special';
}

function baseImportStatus(fullPath, pageText, clientText) {
  if (pageText.includes('redirect(') || pageText.includes('permanentRedirect(')) {
    return { importStatus: 'redirect/alias', reason: 'Route redirects to another page.' };
  }

  if (fullPath.includes('[')) {
    return { importStatus: 'excluded_for_now', reason: 'Dynamic route shell; scan concrete content source instead.' };
  }

  if (fullPath.startsWith('/resources/regulatory-updates')) {
    return { importStatus: 'excluded_for_now', reason: 'Managed by the Regulatory Update Desk module.' };
  }

  if (fullPath.startsWith('/19-5')) {
    return { importStatus: 'importable', reason: '19/5 landing content is data-driven.' };
  }

  if (clientText.includes('ServicePageLayout')) {
    return { importStatus: 'importable', reason: 'Uses ServicePageLayout guide template.' };
  }

  if (/^\/(rbi|sebi|irdai|ifsca|fema|services|regulatory|resources)$/.test(fullPath)) {
    return { importStatus: 'needs_manual_mapping', reason: 'Custom listing/landing layout needs mapping.' };
  }

  if (fullPath.startsWith('/resources') || fullPath.startsWith('/regulatory')) {
    return { importStatus: 'needs_manual_mapping', reason: 'Custom resource/regulatory page layout needs mapping.' };
  }

  return { importStatus: 'needs_manual_mapping', reason: 'Custom page structure needs manual mapping.' };
}

function detectTitle(pageText, clientText, fallbackSlug) {
  return firstMatch(pageText, [
    /title:\s*["'`]([^"'`]+)["'`]/,
    /seoTitle:\s*["'`]([^"'`]+)["'`]/,
  ])
    || firstMatch(clientText, [
      /title=["'`]([^"'`]+)["'`]/,
      /title:\s*["'`]([^"'`]+)["'`]/,
      /<h1[^>]*>([\s\S]*?)<\/h1>/,
    ])
    || titleFromSlug(fallbackSlug);
}

function detectSeoDescription(pageText) {
  return firstMatch(pageText, [
    /description:\s*["'`]([^"'`]+)["'`]/,
    /metaDescription:\s*["'`]([^"'`]+)["'`]/,
  ]);
}

function scanPageRoutes(root) {
  const files = SCAN_ROOTS.flatMap((scanRoot) => walk(path.join(root, scanRoot))).sort();
  return files.map((absoluteFile) => {
    const sourceFile = path.relative(root, absoluteFile);
    const fullPath = routeFromPageFile(sourceFile);
    const slug = slugFromPath(fullPath);
    const pageText = read(absoluteFile);
    const clientFile = path.join(path.dirname(absoluteFile), 'PageClient.tsx');
    const clientText = read(clientFile);
    const base = baseImportStatus(fullPath, pageText, clientText);
    const title = detectTitle(pageText, clientText, slug);

    return {
      fullPath,
      title,
      slug,
      pageType: inferPageType(fullPath, pageText, clientText),
      menuGroup: inferMenuGroup(fullPath),
      regulator: inferRegulator(fullPath),
      sourceFile,
      importStatus: base.importStatus,
      reason: base.reason,
      seoTitle: title,
      seoDescription: detectSeoDescription(pageText),
      existingDbMatch: false,
    };
  });
}

function scanLandingPages(root) {
  const dir = path.join(root, 'lib/landing/pages');
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.ts'))
    .sort()
    .map((file) => {
      const sourceFile = path.join('lib/landing/pages', file);
      const text = read(path.join(root, sourceFile));
      const slug = firstMatch(text, [/slug:\s*["'`]([^"'`]+)["'`]/]) || file.replace(/\.ts$/, '');
      const title = firstMatch(text, [/title:\s*["'`]([^"'`]+)["'`]/]) || titleFromSlug(slug);
      const category = firstMatch(text, [/category:\s*["'`]([^"'`]+)["'`]/]);
      const seoTitle = firstMatch(text, [/seoTitle:\s*["'`]([^"'`]+)["'`]/]) || title;
      const seoDescription = firstMatch(text, [/metaDescription:\s*["'`]([^"'`]+)["'`]/]);

      return {
        fullPath: `/19-5/${slug}`,
        title,
        slug,
        pageType: 'landing_19_5',
        menuGroup: '19_5',
        regulator: 'Other',
        sourceFile,
        importStatus: 'importable',
        reason: category ? `19/5 landing page (${category}).` : '19/5 landing page.',
        seoTitle,
        seoDescription,
        existingDbMatch: false,
      };
    });
}

function applyDuplicateRisk(candidates) {
  const bySlug = new Map();
  for (const item of candidates) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, []);
    bySlug.get(item.slug).push(item);
  }

  for (const item of candidates) {
    const matches = bySlug.get(item.slug) ?? [];
    const realMatches = matches.filter((m) => m.importStatus === 'importable');
    if (realMatches.length > 1 && item.importStatus === 'importable') {
      item.importStatus = 'needs_manual_mapping';
      item.reason = `Duplicate slug risk: ${realMatches.map((m) => m.fullPath).join(', ')}.`;
    }
  }
}

async function loadDbMatches(candidates, { checkDb }) {
  if (!checkDb || !process.env.MONGODB_URI) {
    return { checked: false, fullPathMatches: new Map(), slugMatches: new Map() };
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const col = mongoose.connection.collection('public_content_pages');
  const fullPaths = [...new Set(candidates.map((c) => c.fullPath))];
  const slugs = [...new Set(candidates.map((c) => c.slug))];
  const docs = await col.find({ $or: [{ fullPath: { $in: fullPaths } }, { slug: { $in: slugs } }] }).toArray();
  const fullPathMatches = new Map();
  const slugMatches = new Map();

  for (const doc of docs) {
    if (doc.fullPath) fullPathMatches.set(doc.fullPath, doc);
    if (doc.slug && !slugMatches.has(doc.slug)) slugMatches.set(doc.slug, doc);
  }

  return { checked: true, fullPathMatches, slugMatches };
}

function applyDbStatus(candidates, db) {
  if (!db.checked) return;
  for (const item of candidates) {
    const fullPathMatch = db.fullPathMatches.get(item.fullPath);
    const slugMatch = db.slugMatches.get(item.slug);
    item.existingDbMatch = !!fullPathMatch || !!slugMatch;
    if (item.existingDbMatch && item.importStatus === 'importable') {
      item.importStatus = 'skipped_existing';
      item.reason = fullPathMatch
        ? `Existing CMS path match (${fullPathMatch.fullPath}).`
        : `Existing CMS slug match (${slugMatch.slug}).`;
    }
  }
}

function buildSummary(candidates, db) {
  const count = (status) => candidates.filter((c) => c.importStatus === status).length;
  return {
    total: candidates.length,
    importable: count('importable'),
    needsManualMapping: count('needs_manual_mapping'),
    redirectsAliases: count('redirect/alias'),
    skipped: count('excluded_for_now') + count('skipped_existing'),
    existingDbMatches: db.checked
      ? candidates.filter((c) => c.existingDbMatch).length
      : 0,
    dbChecked: db.checked,
  };
}

export async function discoverExistingPublicContentPages(options = {}) {
  const root = options.root ?? process.cwd();
  const checkDb = options.checkDb !== false;
  const routeCandidates = scanPageRoutes(root);
  const landingCandidates = scanLandingPages(root);
  const items = [...routeCandidates, ...landingCandidates];

  applyDuplicateRisk(items);
  const db = await loadDbMatches(items, { checkDb });
  applyDbStatus(items, db);

  return {
    summary: buildSummary(items, db),
    items: items.sort((a, b) => a.fullPath.localeCompare(b.fullPath)),
  };
}
