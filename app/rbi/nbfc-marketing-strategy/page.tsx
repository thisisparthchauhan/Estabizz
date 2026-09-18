import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/rbi/nbfc-marketing-strategy';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: "NBFC Marketing Strategy in India: 15 Powerful & Proven Ways to Grow Faster (2026 Guide)",
    description: "NBFC Marketing Strategy in India explained with RBI compliance, digital growth tactics, and proven lead generation methods for sustainable business expansion.",
    keywords: "NBFC Marketing Strategy in India, NBFC Lead Generation, NBFC Digital Marketing, Fair Practices Code Marketing, RBI Digital Lending Guidelines, DSA Compliance NBFC, NBFC Customer Acquisition, NBFC Marketing Policy",
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

    return <PageClient />;
}
