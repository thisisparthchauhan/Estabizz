import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "AMFI Registration in India – Complete 2026 Guide with Fees, Process & Key Compliance Insights",
    description: "AMFI Registration in India – understand eligibility, ARN process, fees, documents, and compliance for mutual fund distributors.",
    keywords: "AMFI Registration",
    alternates: { canonical: "/sebi/amfi-registration" }
};

export default function Page() {
    return <PageClient />;
}
