import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PublicContentPageRenderer from '@/components/publicContent/PublicContentPageRenderer';
import PageClient from './PageClient';

const FULL_PATH = '/irdai/composite-insurance-broker-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Composite Insurance Broker Registration in India – Complete & Authoritative Compliance Guide for Serious Promoters',
    description: 'Composite Insurance Broker Registration in India under IRDAI (Insurance Brokers) Regulations, 2018 – detailed eligibility, capital requirement, fee structure, registration process, documents, compliance calendar and regulatory insights explained professionally.',
    keywords: 'Composite Insurance Broker Registration in India, IRDAI Insurance Brokers Regulations 2018, Composite Broker Licence, Composite Insurance Broker Licence, IRDAI Composite Broker, Insurance Broking Licence India, Life and General Insurance Broker, Reinsurance Broking, ₹5 Crore Capital Insurance Broker, Principal Officer IRDAI, Insurance Broker Compliance Calendar',
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: 'Composite Insurance Broker Registration in India – IRDAI Compliance Guide',
        description: 'Complete IRDAI Composite Insurance Broker Registration guide — life, general and reinsurance broking under one approval. ₹5 Crore capital, Principal Officer, business plan, fees, compliance calendar and 200 FAQs by Estabizz.',
        url: FULL_PATH,
        type: 'article',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const state = await getPublicContentPageRenderState(FULL_PATH);
    if (state.mode === 'fallback') return FALLBACK_METADATA;
    if (state.mode === 'blocked') {
        return { title: 'Not Found', robots: { index: false, follow: false } };
    }
    const page = state.page;
    const title = page.seoTitle?.trim() || page.title || String(FALLBACK_METADATA.title);
    const description = page.seoDescription?.trim() || page.summary || String(FALLBACK_METADATA.description);
    const canonical = page.canonicalUrl?.trim() || page.fullPath || FULL_PATH;
    return {
        title, description,
        alternates: { canonical },
        openGraph: {
            title, description, type: 'article', url: canonical,
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
