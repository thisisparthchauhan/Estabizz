import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PublicContentPageRenderer from '@/components/publicContent/PublicContentPageRenderer';
import PageClient from './PageClient';

const FULL_PATH = '/sebi/pms-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'PMS Registration in India – Complete & Powerful Regulatory Guide for Serious Wealth Managers',
    description: 'PMS Registration in India explained under SEBI Portfolio Managers Regulations, 2020. Learn eligibility, ₹5 crore net worth, Form A, Principal Officer, NISM certification, ₹50 lakh client minimum, process, fees, compliance and penalties.',
    keywords: 'PMS Registration in India, SEBI PMS Registration, Portfolio Manager Registration, Portfolio Management Services Registration, SEBI Portfolio Manager License, PMS License India, Discretionary PMS Registration, Non-Discretionary PMS Registration',
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
