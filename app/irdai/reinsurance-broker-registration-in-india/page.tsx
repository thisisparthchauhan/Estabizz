import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/irdai/reinsurance-broker-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Reinsurance Broker Registration in India – Complete Strategic & Regulatory Guide',
    description: 'Reinsurance Broker Registration in India explained under IRDAI Insurance Brokers Regulations, 2018. Learn eligibility, ₹4 crore capital, process, documents, fees, PI insurance, compliance, inspection powers and penalties.',
    keywords: 'Reinsurance Broker Registration in India, IRDAI Reinsurance Broker Registration, Reinsurance Broker License, IRDAI Insurance Brokers Regulations 2018, Treaty Reinsurance Broker, Facultative Reinsurance Broker, Catastrophe Protection Advisory, ₹4 Crore Capital Reinsurance Broker, Principal Officer IRDAI, Professional Indemnity Reinsurance Broker, Reinsurance Intermediary Registration',
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
