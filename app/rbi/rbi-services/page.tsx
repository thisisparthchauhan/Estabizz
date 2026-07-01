import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PublicContentPageRenderer from '@/components/publicContent/PublicContentPageRenderer';
import PageClient from './PageClient';

const FULL_PATH = '/rbi/rbi-services';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: "RBI Services in India: Complete Guide with 7 Powerful Compliance Solutions for Businesses",
    description: "RBI Services in India explained with registration, licensing, FEMA compliance, and NBFC approvals. Complete guide for businesses and fintech entities.",
    keywords: "Regulatory Compliance",
    alternates: { canonical: FULL_PATH },
};

export async function generateMetadata(): Promise<Metadata> {
    const state = await getPublicContentPageRenderState(FULL_PATH);

    if (state.mode === 'fallback') return FALLBACK_METADATA;

    if (state.mode === 'blocked') {
        return {
            title: 'Not Found',
            robots: { index: false, follow: false },
        };
    }

    const page = state.page;
    const title = page.seoTitle?.trim() || page.title || String(FALLBACK_METADATA.title);
    const description = page.seoDescription?.trim() || page.summary || String(FALLBACK_METADATA.description);
    const canonical = page.canonicalUrl?.trim() || page.fullPath || FULL_PATH;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            type: 'article',
            url: canonical,
            ...(page.ogImage?.trim() ? { images: [page.ogImage.trim()] } : {}),
        },
    };
}

export default async function Page() {
    const state = await getPublicContentPageRenderState(FULL_PATH);

    if (state.mode === 'blocked') notFound();
    if (state.mode === 'published') return <PublicContentPageRenderer page={state.page} />;

    return <PageClient />;
}
