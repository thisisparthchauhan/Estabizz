import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/services/trademark-search';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: 'Trademark Search India: Essential Tips to Avoid Costly Trademark Mistakes',
    description: 'Trademark Search India explained – how to conduct a trademark search, key databases, IP India process, and steps to avoid trademark conflicts and registration rejections.',
    keywords: 'Trademark Search India',
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
