import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/criminal-misappropriation-of-property';

export const metadata: Metadata = {
    title: "Criminal Misappropriation of Property: BNS Section 314",
    description: "Criminal misappropriation of property under BNS Section 314 — dishonest conversion of movable property, the civil and criminal distinction, ingredients to prove, evidence and demand records, non-cognizable classification and the Magistrate complaint route under the BNSS, plus defence against false allegations.",
    keywords: "Criminal misappropriation of property, BNS Section 314, dishonest misappropriation, BNS 315, criminal breach of trust BNS 316, cheating BNS 318, movable property, Magistrate complaint BNSS 223, non-cognizable offence, employee retaining company assets, digital evidence BSA",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Criminal Misappropriation of Property — BNS Section 314",
        description: "Dishonest conversion of movable property: the ingredients, the civil-criminal line, the Magistrate route, and defence against over-criminalised business disputes.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
