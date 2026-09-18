import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/rbi/nbfc-takeover';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: "NBFC Takeover in India: 2026 Ultimate Guide to RBI Approval, Process & Critical Compliance Risks",
    description: "NBFC Takeover in India explained with RBI approval process, documents, eligibility, and compliance risks. Complete 2026 guide for promoters.",
    keywords: "NBFC Takeover in India, NBFC Change in Control, RBI Approval NBFC Takeover, NBFC Acquisition India, Fit and Proper Criteria NBFC, NBFC Share Transfer 26 Percent, NBFC Due Diligence, Buy NBFC India",
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
