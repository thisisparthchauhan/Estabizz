import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/admin/requirePermission';
import { findPublicContentPageByFullPath } from '@/lib/publicContent/repository';

const SAMPLE_FULL_PATH = '/rbi/nbfc-registration-in-india';

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
    return NextResponse.json({ page: toEditorPage(page) });
  } catch (err) {
    console.error('[admin/content-pages/by-path] GET error:', err);
    return NextResponse.json({ error: 'Unable to load content page.' }, { status: 500 });
  }
}
