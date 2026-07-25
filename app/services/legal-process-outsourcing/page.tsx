import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/services/legal-process-outsourcing';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Legal Process Outsourcing Services in India: Complete 2026 Guide for Businesses & Law Firms',
    description: 'Legal Process Outsourcing services in India explained in detail – eligibility, process, benefits, compliance requirements, and how businesses can optimise legal operations efficiently.',
    keywords: 'Legal Process Outsourcing',
    alternates: { canonical: FULL_PATH },
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
    return <PageClient />;
}
