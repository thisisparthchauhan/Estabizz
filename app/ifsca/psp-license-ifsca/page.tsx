import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PublicContentPageRenderer from '@/components/publicContent/PublicContentPageRenderer';
import PageClient from './PageClient';

const FULL_PATH = '/ifsca/psp-license-ifsca';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'PSP License – IFSCA: Complete Authorisation Guide with Critical Compliance Insights',
    description: 'PSP License – IFSCA explained in detail. Understand eligibility, capital requirements, safeguarding norms, authorisation process, fees, compliance, and regulatory obligations under IFSCA Payment Services Regulations, 2024.',
    keywords: 'PSP License – IFSCA, Payment Service Provider IFSCA, IFSCA Payment Services Regulations 2024, PSP Authorisation in IFSC, IFSCA PSP Registration, PSP License GIFT City, E-Money Issuance IFSC, Merchant Acquisition Service IFSC',
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
