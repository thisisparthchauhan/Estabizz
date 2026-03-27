import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Alternative Asset Portfolio Valuation: Essential Insights for Accurate Compliance",
    description: "Complete guide and compliance information.",
    keywords: "Alternative Asset Portfolio Valuation",
    alternates: { canonical: "/sebi/alternative-asset-portfolio-valuation" }
};

export default function Page() {
    return <PageClient />;
}
