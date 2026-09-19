import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/caveat-filing';

export const metadata: Metadata = {
    title: "Caveat Filing: CPC Section 148A Protection Against Ex-Parte Orders",
    description: "Caveat Filing under Section 148A of the Code of Civil Procedure, 1908 — how a caveat secures notice before any order is passed, the 90-day validity, correct forum, petition contents, notice to the expected applicant and renewal tracking.",
    keywords: "Caveat Filing, Cavet Filing, CPC Section 148A, caveat petition, caveat 90 days validity, ex-parte stay protection, injunction caveat, appeal caveat, caveator notice registered post",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Caveat Filing — CPC Section 148A Protection Against Ex-Parte Orders",
        description: "How Section 148A works, the 90-day clock, choosing the right forum, petition contents and the notice obligations on each side.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
