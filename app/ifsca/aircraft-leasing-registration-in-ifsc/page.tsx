import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/ifsca/aircraft-leasing-registration-in-ifsc';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'IFSCA Aircraft Leasing Registration – Complete GIFT City Aircraft Lessor Setup Guide',
    description: 'IFSCA Aircraft Leasing Registration explained under the Framework for Aircraft Lease in IFSC. Learn eligibility, USD 200,000 and USD 3 million capital requirements, operating lease, financial lease, registration process, compliance and GIFT City benefits.',
    keywords: 'IFSCA Aircraft Leasing Registration, Aircraft Leasing in IFSC, Aircraft Lessor Registration, Aircraft Leasing GIFT City, Aircraft Operating Lease IFSC, Aircraft Financial Lease IFSC',
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
