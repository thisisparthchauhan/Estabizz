import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/sebi/stock-broker-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Stock Broker Registration in India – Complete & Powerful SEBI Regulatory Guide for Serious Market Entrants',
    description: 'Stock Broker Registration in India explained in detail. Learn SEBI and exchange approval process, eligibility, net worth, capital, infrastructure, documents, fees, compliance, client fund segregation, margin rules, inspection and penalties.',
    keywords: 'Stock Broker Registration in India, SEBI Stock Broker Registration, Stock Broker License, Trading Member Registration, NSE Broker Registration, BSE Broker Registration, Stock Broker Membership, Trading and Clearing Member, Self-Clearing Member',
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
