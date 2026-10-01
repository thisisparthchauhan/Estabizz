import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/divorce-settlement-agreements';

export const metadata: Metadata = {
    title: "Divorce Settlement Agreements: Terms That Hold",
    description: "Divorce Settlement Agreements in India — drafting enforceable consent terms for alimony, child custody and visitation, stridhan, property and loans, what a full-and-final clause can and cannot achieve, why maintenance waivers are vulnerable, closing connected proceedings, registration and stamp duty, and NRI execution.",
    keywords: "Divorce Settlement Agreement, mutual divorce consent terms, alimony settlement, full and final settlement clause, maintenance waiver public policy, child custody agreement, stridhan return, property transfer registration Section 17, quashing connected cases, NRI divorce settlement",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Divorce Settlement Agreements — Terms That Hold",
        description: "What a settlement can settle, what it cannot, and how to draft one that survives the claim someone brings three years later.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
