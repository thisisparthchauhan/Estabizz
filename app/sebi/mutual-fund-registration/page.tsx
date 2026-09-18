import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/sebi/mutual-fund-registration';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'SEBI Mutual Fund Registration India – Complete Guide with Eligibility, Process & Compliance (2026)',
    description: 'SEBI Mutual Fund Registration India – detailed guide on eligibility, process, documents, fees, and compliance for launching a mutual fund in India.',
    keywords: 'SEBI Mutual Fund Registration India, Mutual Fund Registration with SEBI, AMC Registration India, Asset Management Company License, Mutual Fund Trust Registration, SEBI Mutual Funds Regulations 1996, Mutual Fund Sponsor Eligibility, Start a Mutual Fund in India',
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
