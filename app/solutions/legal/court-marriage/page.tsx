import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/court-marriage';

export const metadata: Metadata = {
    title: "Court Marriage: Special Marriage Act Procedure, Notice and Certificate",
    description: "Court Marriage under the Special Marriage Act, 1954 — eligibility under Section 4, notice of intended marriage, the objection window, three-month notice validity under Section 14, witnesses, documents and the marriage certificate.",
    keywords: "Court Marriage, Special Marriage Act 1954, notice of intended marriage, Marriage Officer, Section 4 conditions, Section 14 notice validity, interfaith marriage India, inter-caste marriage, marriage certificate, court marriage documents",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Court Marriage — Special Marriage Act Procedure and Certificate",
        description: "Eligibility, jurisdiction, notice period, objections, witnesses and documents for a civil marriage before the Marriage Officer.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
