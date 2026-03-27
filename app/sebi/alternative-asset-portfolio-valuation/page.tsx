import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "( Optimised with Power + Sentiment + Number): Alternative Asset Portfolio Valuation – 15 Powerful & Essential Insights for Accurate Compliance Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Alternative Asset Portfolio Valuation",
    alternates: { canonical: "/sebi/alternative-asset-portfolio-valuation" }
};

export default function Page() {
    return <PageClient />;
}
