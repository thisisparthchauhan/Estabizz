import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/irdai/insurance-broker-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Insurance Broker Registration in India – Complete & Powerful IRDAI Licensing Guide',
    description: 'Insurance Broker Registration in India explained in detail as per IRDAI (Insurance Brokers) Regulations, 2018. Know eligibility, capital requirement, fees, process, compliance and penalties.',
    keywords: 'Insurance Broker Registration in India, IRDAI Insurance Broker Registration, IRDAI Insurance Brokers Regulations 2018, Direct Broker Licence, Direct Insurance Broker, Reinsurance Broker, Composite Broker, Insurance Broking Licence India, Principal Officer IRDAI, Broker Qualified Persons, Professional Indemnity Insurance Broker, Statutory Deposit Insurance Broker',
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
