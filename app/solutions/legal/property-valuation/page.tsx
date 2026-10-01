import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/property-valuation';

export const metadata: Metadata = {
    title: "Property Valuation: Registered Valuers, Tax and Loan Use",
    description: "Property valuation support for land, flats, commercial and industrial property — which registration a valuer needs for which purpose, the Companies Act Section 247 and Income-tax Act Section 514 frameworks, the Section 78 stamp duty value rule and its 110 per cent safe harbour, valuation methods, report review and red flags.",
    keywords: "Property valuation India, registered valuer, Companies Act section 247, Income-tax Act 2025 section 514, Form 169 Form 170, section 78 stamp duty value, 110 per cent safe harbour, section 92(2)(m), circle rate ready reckoner, land and building asset class, bank valuation, capital gains fair market value",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Property Valuation — Purpose, Valuer and Report",
        description: "A valuation is only as good as its purpose. Which registration the valuer needs, which method fits, and what makes a report hold up for tax, lending and litigation.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
