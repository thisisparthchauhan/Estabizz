import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';

const FULL_PATH = '/rbi/lendtech-services';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: "LendTech Services India: Build a Powerful and Compliant Digital Lending Business",
    description: "LendTech Services India by Estabizz helps fintechs and NBFCs structure compliant digital lending models, LSP partnerships, technology, documentation and post-launch governance.",
    keywords: "LendTech Services India, Digital Lending India, Lending Service Provider, LSP Agreement, Digital Lending Application, RBI Digital Lending Guidelines, Default Loss Guarantee, NBFC Fintech Partnership, Co-Lending Model, Embedded Finance India",
    alternates: { canonical: FULL_PATH }
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
