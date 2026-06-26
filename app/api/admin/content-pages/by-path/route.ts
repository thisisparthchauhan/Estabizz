import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  findPublicContentPageByFullPath,
  savePendingChanges,
  clearPendingChanges,
} from '@/lib/publicContent/repository';
import { isManagedPublicContentPath } from '@/lib/publicContent/managedPaths';
import {
  PUBLIC_CONTENT_ACCENT_PRESET_OPTIONS,
  PUBLIC_CONTENT_CARD_STYLE_OPTIONS,
  PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN,
  PUBLIC_CONTENT_DEFAULT_SECTION_DESIGN,
  PUBLIC_CONTENT_HEADING_STYLE_OPTIONS,
  PUBLIC_CONTENT_HERO_LAYOUT_OPTIONS,
  PUBLIC_CONTENT_SECTION_IMAGE_POSITION_OPTIONS,
  PUBLIC_CONTENT_SECTION_SPACING_OPTIONS,
  PUBLIC_CONTENT_SECTION_STYLE_OPTIONS,
  PUBLIC_CONTENT_TEXT_SCALE_OPTIONS,
  PUBLIC_CONTENT_THEME_PRESET_OPTIONS,
} from '@/lib/publicContent/types';
import type {
  PublicContentImage,
  PublicContentWorkingCopy,
  PublicContentHero,
  PublicContentSection,
  PublicContentQuickFact,
  PublicContentCtaCard,
  PublicContentPageDesign,
  PublicContentSectionDesign,
} from '@/lib/publicContent/types';

const MAX_BODY_BYTES = 300 * 1024; // 300 KB

// ─── Image URL safety ─────────────────────────────────────────────────────────

const BLOCKED_IMAGE_URL = [
  /^app\//i,
  /^\/users\//i,
  /^\/private\//i,
  /localhost/i,
  /127\.0\.0\.1/i,
  /\.tsx?($|\?)/i,
  /\.jsx?($|\?)/i,
  /^javascript:/i,
  /^data:/i,
  /^file:/i,
  /imported\s+source/i,
  /\bmigration\b/i,
  /\bimporter\b/i,
  /\bdebug\b/i,
  /\bqa\s+marker\b/i,
  /phase4j/i,
  /phase4k/i,
  /phase4l/i,
];

const BLOCKED_DESIGN_VALUE = [
  /style=/i,
  /class=/i,
  /<script/i,
  /javascript:/i,
  /expression\(/i,
  /url\(/i,
  /data:/i,
  /position:/i,
  /fixed/i,
  /absolute/i,
  /z-index/i,
  /import/i,
  /\bmigration\b/i,
  /\bdebug\b/i,
  /phase4k/i,
  /phase4l/i,
];

function isValidImageUrl(url: string): boolean {
  if (!url.startsWith('https://')) return false;
  return !BLOCKED_IMAGE_URL.some((p) => p.test(url));
}

function isSafeImageReference(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  return !BLOCKED_IMAGE_URL.some((p) => p.test(trimmed));
}

type ImageValidationResult =
  | { ok: true; image: PublicContentImage | null }
  | { ok: false; error: string };

function validateImage(raw: unknown): ImageValidationResult {
  if (raw === null || raw === undefined) return { ok: true, image: null };
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Please choose a valid HTTPS image and add alt text before saving.' };
  }
  const r = raw as Record<string, unknown>;
  const url = typeof r.url === 'string' ? r.url.trim() : '';
  if (!isValidImageUrl(url)) {
    return { ok: false, error: 'Please choose a valid HTTPS image and add alt text before saving.' };
  }
  const alt = typeof r.alt === 'string' ? r.alt.trim() : '';
  if (!alt) {
    return { ok: false, error: 'Please add alt text for each selected image before saving.' };
  }
  const publicId = typeof r.publicId === 'string' ? r.publicId.trim() : '';
  if (publicId && !isSafeImageReference(publicId)) {
    return { ok: false, error: 'Please choose a valid HTTPS image and add alt text before saving.' };
  }
  const source = typeof r.source === 'string' ? r.source.trim() : '';
  if (source && source !== 'media_library') {
    return { ok: false, error: 'Please choose a valid HTTPS image and add alt text before saving.' };
  }
  return {
    ok: true,
    image: {
      url,
      alt,
      ...(typeof r.caption === 'string' && r.caption.trim() ? { caption: r.caption.trim().slice(0, 300) } : {}),
      ...(publicId ? { publicId } : {}),
      source: 'media_library',
    },
  };
}

// ─── Controlled design presets ────────────────────────────────────────────────

const DESIGN_ERROR = 'Please choose one of the available design options before saving.';

function enumValue<T extends string>(raw: unknown, allowed: readonly T[], fallback: T): T | null {
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw !== 'string') return null;
  const value = raw.trim();
  if (BLOCKED_DESIGN_VALUE.some((p) => p.test(value))) return null;
  return allowed.includes(value as T) ? (value as T) : null;
}

type PageDesignValidationResult =
  | { ok: true; pageDesign: PublicContentPageDesign }
  | { ok: false; error: string };

function validatePageDesign(raw: unknown): PageDesignValidationResult {
  if (raw !== undefined && raw !== null && (typeof raw !== 'object' || Array.isArray(raw))) {
    return { ok: false, error: DESIGN_ERROR };
  }
  const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const pageDesign: PublicContentPageDesign = {
    themePreset: enumValue(source.themePreset, PUBLIC_CONTENT_THEME_PRESET_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.themePreset) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.themePreset,
    accentPreset: enumValue(source.accentPreset, PUBLIC_CONTENT_ACCENT_PRESET_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.accentPreset) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.accentPreset,
    textScale: enumValue(source.textScale, PUBLIC_CONTENT_TEXT_SCALE_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.textScale) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.textScale,
    headingStyle: enumValue(source.headingStyle, PUBLIC_CONTENT_HEADING_STYLE_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.headingStyle) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.headingStyle,
    sectionSpacing: enumValue(source.sectionSpacing, PUBLIC_CONTENT_SECTION_SPACING_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.sectionSpacing) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.sectionSpacing,
    cardStyle: enumValue(source.cardStyle, PUBLIC_CONTENT_CARD_STYLE_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.cardStyle) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.cardStyle,
    heroLayout: enumValue(source.heroLayout, PUBLIC_CONTENT_HERO_LAYOUT_OPTIONS, PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.heroLayout) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN.heroLayout,
  };
  const invalid = (Object.keys(pageDesign) as Array<keyof PublicContentPageDesign>).some((key) => {
    if (!(key in source) || source[key] === undefined || source[key] === null || source[key] === '') return false;
    return typeof source[key] !== 'string' || pageDesign[key] !== String(source[key]).trim();
  });
  return invalid ? { ok: false, error: DESIGN_ERROR } : { ok: true, pageDesign };
}

type SectionDesignValidationResult =
  | { ok: true; design: PublicContentSectionDesign }
  | { ok: false; error: string };

function validateSectionDesign(raw: unknown): SectionDesignValidationResult {
  if (raw !== undefined && raw !== null && (typeof raw !== 'object' || Array.isArray(raw))) {
    return { ok: false, error: DESIGN_ERROR };
  }
  const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const design: PublicContentSectionDesign = {
    stylePreset: enumValue(source.stylePreset, PUBLIC_CONTENT_SECTION_STYLE_OPTIONS, PUBLIC_CONTENT_DEFAULT_SECTION_DESIGN.stylePreset) ?? PUBLIC_CONTENT_DEFAULT_SECTION_DESIGN.stylePreset,
    imagePosition: enumValue(source.imagePosition, PUBLIC_CONTENT_SECTION_IMAGE_POSITION_OPTIONS, PUBLIC_CONTENT_DEFAULT_SECTION_DESIGN.imagePosition) ?? PUBLIC_CONTENT_DEFAULT_SECTION_DESIGN.imagePosition,
  };
  const invalid = (['stylePreset', 'imagePosition'] as const).some((key) => {
    if (!(key in source) || source[key] === undefined || source[key] === null || source[key] === '') return false;
    return typeof source[key] !== 'string' || design[key] !== String(source[key]).trim();
  });
  return invalid ? { ok: false, error: DESIGN_ERROR } : { ok: true, design };
}

// ─── Safe mappers ──────────────────────────────────────────────────────────────

function toEditorPage(page: NonNullable<Awaited<ReturnType<typeof findPublicContentPageByFullPath>>>) {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    fullPath: page.fullPath,
    pageType: page.pageType,
    menuGroup: page.menuGroup,
    category: page.category,
    regulator: page.regulator,
    serviceType: page.serviceType,
    summary: page.summary,
    hero: page.hero,
    badges: page.badges,
    breadcrumbs: page.breadcrumbs,
    sections: page.sections,
    snapshotCards: page.snapshotCards,
    quickFacts: page.quickFacts,
    ctaCards: page.ctaCards,
    expertProfile: page.expertProfile,
    relatedPages: page.relatedPages,
    sourceReferences: page.sourceReferences,
    reviewedBy: page.reviewedBy,
    lastReviewedAt: page.lastReviewedAt,
    readingTime: page.readingTime,
    status: page.status,
    publishedAt: page.publishedAt,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    canonicalUrl: page.canonicalUrl,
    ogImage: page.ogImage,
    heroImage: page.heroImage,
    pageDesign: page.pageDesign,
    hasPendingChanges: page.hasPendingChanges,
    updatedAt: page.updatedAt,
  };
}

function liveToWorkingCopy(page: NonNullable<Awaited<ReturnType<typeof findPublicContentPageByFullPath>>>): PublicContentWorkingCopy {
  return {
    title: page.title,
    summary: page.summary,
    hero: page.hero as PublicContentHero | null,
    heroImage: (page.heroImage as PublicContentImage | null) ?? null,
    pageDesign: page.pageDesign ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN,
    sections: page.sections as PublicContentSection[],
    quickFacts: page.quickFacts as PublicContentQuickFact[],
    ctaCards: page.ctaCards as PublicContentCtaCard[],
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    canonicalUrl: page.canonicalUrl,
  };
}

function revisionToWorkingCopy(
  revision: Record<string, unknown>,
  fallback: NonNullable<Awaited<ReturnType<typeof findPublicContentPageByFullPath>>>
): PublicContentWorkingCopy {
  return {
    title: typeof revision.title === 'string' ? revision.title : fallback.title,
    summary: typeof revision.summary === 'string' ? revision.summary : fallback.summary,
    hero: (revision.hero as PublicContentHero | null) ?? (fallback.hero as PublicContentHero | null),
    heroImage: ('heroImage' in revision
      ? (revision.heroImage as PublicContentImage | null)
      : (fallback.heroImage as PublicContentImage | null)) ?? null,
    pageDesign: ('pageDesign' in revision
      ? (revision.pageDesign as PublicContentPageDesign)
      : fallback.pageDesign) ?? PUBLIC_CONTENT_DEFAULT_PAGE_DESIGN,
    sections: Array.isArray(revision.sections)
      ? (revision.sections as PublicContentSection[])
      : (fallback.sections as PublicContentSection[]),
    quickFacts: Array.isArray(revision.quickFacts)
      ? (revision.quickFacts as PublicContentQuickFact[])
      : (fallback.quickFacts as PublicContentQuickFact[]),
    ctaCards: Array.isArray(revision.ctaCards)
      ? (revision.ctaCards as PublicContentCtaCard[])
      : (fallback.ctaCards as PublicContentCtaCard[]),
    seoTitle: typeof revision.seoTitle === 'string' ? revision.seoTitle : fallback.seoTitle,
    seoDescription: typeof revision.seoDescription === 'string' ? revision.seoDescription : fallback.seoDescription,
    canonicalUrl: typeof revision.canonicalUrl === 'string' ? revision.canonicalUrl : fallback.canonicalUrl,
  };
}

// ─── PATCH body validation ─────────────────────────────────────────────────────

function str(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  return v.slice(0, max);
}

type WorkingCopyValidationResult =
  | { ok: true; workingCopy: PublicContentWorkingCopy }
  | { ok: false; error: string };

const GENERIC_WORKING_COPY_ERROR = 'Some page fields need a quick review before saving.';

function validateWorkingCopy(raw: unknown): WorkingCopyValidationResult {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  }
  const b = raw as Record<string, unknown>;

  if (typeof b.title !== 'string' || b.title.length > 300) return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  if (typeof b.summary !== 'string' || b.summary.length > 15000) return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  if (typeof b.seoTitle !== 'string' || b.seoTitle.length > 200) return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  if (typeof b.seoDescription !== 'string' || b.seoDescription.length > 1000) return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  if (typeof b.canonicalUrl !== 'string' || b.canonicalUrl.length > 500) {
    return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  }

  let hero: PublicContentHero | null = null;
  if (b.hero && typeof b.hero === 'object' && !Array.isArray(b.hero)) {
    const h = b.hero as Record<string, unknown>;
    hero = {
      title: str(h.title, 300) || undefined,
      eyebrow: str(h.eyebrow, 200) || undefined,
      description: str(h.description, 2000) || undefined,
      trustLine: str(h.trustLine, 500) || undefined,
      primaryCtaLabel: str(h.primaryCtaLabel, 100) || undefined,
      primaryCtaHref: str(h.primaryCtaHref, 500) || undefined,
      secondaryCtaLabel: str(h.secondaryCtaLabel, 100) || undefined,
      secondaryCtaHref: str(h.secondaryCtaHref, 500) || undefined,
    };
  }

  const heroImageResult = validateImage(b.heroImage);
  if (!heroImageResult.ok) return heroImageResult;
  const heroImage = heroImageResult.image;

  const pageDesignResult = validatePageDesign(b.pageDesign);
  if (!pageDesignResult.ok) return pageDesignResult;

  if (!Array.isArray(b.sections) || b.sections.length > 200) {
    return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  }
  const sections: PublicContentSection[] = [];
  for (const s of b.sections) {
    const sec = (s && typeof s === 'object' && !Array.isArray(s)) ? s as Record<string, unknown> : {};
    const sectionImageResult = validateImage(sec.image);
    if (!sectionImageResult.ok) return sectionImageResult;
    const sectionImage = sectionImageResult.image;
    const sectionDesignResult = validateSectionDesign(sec.design);
    if (!sectionDesignResult.ok) return sectionDesignResult;
    sections.push({
      id: str(sec.id, 100) || undefined,
      title: str(sec.title, 300) || undefined,
      body: str(sec.body, 25000) || undefined,
      ...(sectionImage ? { image: sectionImage } : {}),
      design: sectionDesignResult.design,
    });
  }

  if (!Array.isArray(b.quickFacts) || b.quickFacts.length > 50) {
    return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  }
  const quickFacts: PublicContentQuickFact[] = b.quickFacts.map((f: unknown) => {
    const fact = (f && typeof f === 'object' && !Array.isArray(f)) ? f as Record<string, unknown> : {};
    return { label: str(fact.label, 200), value: str(fact.value, 200) };
  });

  if (!Array.isArray(b.ctaCards) || b.ctaCards.length > 20) {
    return { ok: false, error: GENERIC_WORKING_COPY_ERROR };
  }
  const ctaCards: PublicContentCtaCard[] = b.ctaCards.map((c: unknown) => {
    const card = (c && typeof c === 'object' && !Array.isArray(c)) ? c as Record<string, unknown> : {};
    return {
      title: str(card.title, 200),
      description: str(card.description, 1000) || undefined,
      href: str(card.href, 500) || undefined,
      label: str(card.label, 100) || undefined,
    };
  });

  return {
    ok: true,
    workingCopy: {
      title: b.title.trim(),
      summary: b.summary,
      hero,
      heroImage,
      pageDesign: pageDesignResult.pageDesign,
      sections,
      quickFacts,
      ctaCards,
      seoTitle: b.seoTitle.trim(),
      seoDescription: b.seoDescription.trim(),
      canonicalUrl: b.canonicalUrl.trim(),
    },
  };
}

// ─── Route handlers ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const fullPath = req.nextUrl.searchParams.get('fullPath')?.trim() || '';
  if (!isManagedPublicContentPath(fullPath)) {
    return NextResponse.json({ error: 'Visual editor is available for managed content pages only.' }, { status: 404 });
  }

  try {
    const page = await findPublicContentPageByFullPath(fullPath);
    if (!page) return NextResponse.json({ error: 'Content page not found.' }, { status: 404 });

    const canEdit = auth.admin.permissions.includes('manage_content');
    const canPublish = auth.admin.permissions.includes('publish_content');

    const workingCopy =
      page.hasPendingChanges && page.pendingRevision && typeof page.pendingRevision === 'object'
        ? revisionToWorkingCopy(page.pendingRevision as Record<string, unknown>, page)
        : liveToWorkingCopy(page);

    return NextResponse.json({
      page: toEditorPage(page),
      workingCopy,
      hasPendingChanges: page.hasPendingChanges,
      canEdit,
      canPublish,
    });
  } catch (err) {
    console.error('[admin/content-pages/by-path] GET error:', err);
    return NextResponse.json({ error: 'Unable to load content page.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_content');
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const bodyObj = body as Record<string, unknown>;
  const fullPath = typeof bodyObj.fullPath === 'string' ? bodyObj.fullPath.trim() : '';
  if (!isManagedPublicContentPath(fullPath)) {
    return NextResponse.json({ error: 'Editor is available for managed content pages only.' }, { status: 400 });
  }

  const workingCopyResult = validateWorkingCopy(bodyObj.workingCopy);
  if (!workingCopyResult.ok) {
    return NextResponse.json({ error: workingCopyResult.error }, { status: 400 });
  }

  try {
    await savePendingChanges(fullPath, auth.admin.email, workingCopyResult.workingCopy);
    return NextResponse.json({
      ok: true,
      hasPendingChanges: true,
      message: 'Pending changes saved. The live page has not changed.',
    });
  } catch (err) {
    console.error('[admin/content-pages/by-path] PATCH error:', err);
    return NextResponse.json({ error: 'Unable to save pending changes.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requirePermission(req, 'manage_content');
  if (!auth.ok) return auth.response;

  const fullPath = req.nextUrl.searchParams.get('fullPath')?.trim() || '';
  if (!isManagedPublicContentPath(fullPath)) {
    return NextResponse.json({ error: 'Editor is available for managed content pages only.' }, { status: 400 });
  }

  try {
    await clearPendingChanges(fullPath);
    return NextResponse.json({
      ok: true,
      hasPendingChanges: false,
      message: 'Pending changes discarded.',
    });
  } catch (err) {
    console.error('[admin/content-pages/by-path] DELETE error:', err);
    return NextResponse.json({ error: 'Unable to discard pending changes.' }, { status: 500 });
  }
}
