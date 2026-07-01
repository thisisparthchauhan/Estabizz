import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicContentPageRenderState } from '@/lib/publicContent/rendering';
import PageClient from './PageClient';
import PublicContentPageRenderer from './PublicContentPageRenderer';

const FULL_PATH = '/rbi/nbfc-registration-in-india';

export const dynamic = 'force-dynamic';

const FALLBACK_METADATA: Metadata = {
    title: "NBFC Registration in India – Complete and Authoritative RBI Approval Guide (2025)",
    description: "NBFC Registration in India explained as per RBI Master Direction dated July 17, 2025. Detailed eligibility, ₹10 Crore NOF, COSMOS portal process, documents, Scale Based Regulation, compliance and penalties guide.",
    keywords: "NBFC Registration in India, RBI NBFC License, Section 45-IA RBI Act, NBFC-ICC, Base Layer NBFC, Net Owned Fund 10 Crore, RBI COSMOS, Scale Based Regulation, NBFC Master Direction 2023",
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
    if (state.mode === 'published') return <PublicContentPageRenderer page={state.page} />;

    return <PageClient />;
}
