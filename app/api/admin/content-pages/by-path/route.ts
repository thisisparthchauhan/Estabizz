import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import {
  findPublicContentPageByFullPath,
  savePendingChanges,
  clearPendingChanges,
} from '@/lib/publicContent/repository';
import type {
  PublicContentWorkingCopy,
  PublicContentHero,
  PublicContentSection,
  PublicContentQuickFact,
  PublicContentCtaCard,
} from '@/lib/publicContent/types';

const SAMPLE_FULL_PATH = '/rbi/nbfc-registration-in-india';
const MAX_BODY_BYTES = 300 * 1024; // 300 KB

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
    hasPendingChanges: page.hasPendingChanges,
    updatedAt: page.updatedAt,
  };
}

function liveToWorkingCopy(page: NonNullable<Awaited<ReturnType<typeof findPublicContentPageByFullPath>>>): PublicContentWorkingCopy {
  return {
    title: page.title,
    summary: page.summary,
    hero: page.hero as PublicContentHero | null,
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

function validateWorkingCopy(raw: unknown): PublicContentWorkingCopy | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const b = raw as Record<string, unknown>;

  if (typeof b.title !== 'string' || b.title.length > 300) return null;
  if (typeof b.summary !== 'string' || b.summary.length > 15000) return null;
  if (typeof b.seoTitle !== 'string' || b.seoTitle.length > 200) return null;
  if (typeof b.seoDescription !== 'string' || b.seoDescription.length > 1000) return null;
  if (typeof b.canonicalUrl !== 'string' || b.canonicalUrl.length > 500) return null;

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

  if (!Array.isArray(b.sections) || b.sections.length > 200) return null;
  const sections: PublicContentSection[] = b.sections.map((s: unknown) => {
    const sec = (s && typeof s === 'object' && !Array.isArray(s)) ? s as Record<string, unknown> : {};
    return {
      id: str(sec.id, 100) || undefined,
      title: str(sec.title, 300) || undefined,
      body: str(sec.body, 25000) || undefined,
    };
  });

  if (!Array.isArray(b.quickFacts) || b.quickFacts.length > 50) return null;
  const quickFacts: PublicContentQuickFact[] = b.quickFacts.map((f: unknown) => {
    const fact = (f && typeof f === 'object' && !Array.isArray(f)) ? f as Record<string, unknown> : {};
    return { label: str(fact.label, 200), value: str(fact.value, 200) };
  });

  if (!Array.isArray(b.ctaCards) || b.ctaCards.length > 20) return null;
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
    title: b.title.trim(),
    summary: b.summary,
    hero,
    sections,
    quickFacts,
    ctaCards,
    seoTitle: b.seoTitle.trim(),
    seoDescription: b.seoDescription.trim(),
    canonicalUrl: b.canonicalUrl.trim(),
  };
}

// ─── Route handlers ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'view_admin');
  if (!auth.ok) return auth.response;

  const fullPath = req.nextUrl.searchParams.get('fullPath')?.trim() || '';
  if (fullPath !== SAMPLE_FULL_PATH) {
    return NextResponse.json({ error: 'Visual editor is available for the sample page only.' }, { status: 404 });
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
  if (bodyObj.fullPath !== SAMPLE_FULL_PATH) {
    return NextResponse.json({ error: 'Editor is available for the sample page only.' }, { status: 400 });
  }

  const workingCopy = validateWorkingCopy(bodyObj.workingCopy);
  if (!workingCopy) {
    return NextResponse.json({ error: 'Invalid working copy data.' }, { status: 400 });
  }

  try {
    await savePendingChanges(SAMPLE_FULL_PATH, auth.admin.email, workingCopy);
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
  if (fullPath !== SAMPLE_FULL_PATH) {
    return NextResponse.json({ error: 'Editor is available for the sample page only.' }, { status: 400 });
  }

  try {
    await clearPendingChanges(SAMPLE_FULL_PATH);
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
