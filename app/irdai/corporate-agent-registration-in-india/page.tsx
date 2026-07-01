import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PublicContentPageRenderer from '@/components/publicContent/PublicContentPageRenderer';
import PageClient from './PageClient';

const FULL_PATH = '/irdai/corporate-agent-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Corporate Agent Registration in India – Complete and Practical Regulatory Guide for Seamless IRDAI Approval',
    description: 'Corporate Agent Registration in India explained in a structured, practical manner covering eligibility, capital requirement, IRDAI process, documentation, fees, and post-registration compliance obligations.',
    keywords: 'Corporate Agent Registration in India, IRDAI Corporate Agent Registration, IRDAI Corporate Agents Regulations 2015, Corporate Agency License, Corporate Agent Insurance License, Insurance Intermediary Registration, Bancassurance Distribution, NBFC Insurance Distribution, Fintech Corporate Agent, Principal Officer IRDAI, Specified Persons Training',
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: 'Corporate Agent Registration in India – IRDAI Compliance Guide by Estabizz',
        description: 'Complete IRDAI Corporate Agent Registration guide for NBFCs, fintech companies, banks, MFIs and corporates — eligibility, capital, Principal Officer, Specified Persons training, insurer tie-up limits, fees, compliance calendar and 100+ FAQs.',
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
