import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "REIT Registration India: Complete 2026 Guide with Powerful Insights, Eligibility & SEBI Compliance",
    description: "REIT Registration India – understand eligibility, SEBI requirements, process, fees, and compliance for Real Estate Investment Trusts.",
    keywords: "REIT Registration India",
    alternates: { canonical: "/sebi/reit-registration" }
};

export default function Page() {
    return <PageClient />;
}
