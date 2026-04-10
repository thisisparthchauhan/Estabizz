import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Alternative Asset Portfolio Valuation – 15 Powerful & Essential Insights for Accurate Compliance",
    description: "Alternative Asset Portfolio Valuation explained with methods, SEBI compliance, valuation process, risks, and expert insights for AIFs, NBFCs, and investors.",
    keywords: "Alternative Asset Portfolio Valuation, SEBI AIF Valuation, Portfolio Valuation India, NAV Calculation, DCF Valuation, Fair Value, NBFC Valuation, Fund Valuation",
    alternates: { canonical: "/sebi/alternative-asset-portfolio-valuation" }
};

export default function Page() {
    return <PageClient />;
}
