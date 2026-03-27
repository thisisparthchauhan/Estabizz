import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "SEBI Mutual Fund Registration India: Complete Guide with Eligibility, Process & Compliance",
    description: "SEBI Mutual Fund Registration India – detailed guide on eligibility, process, documents, fees, and compliance for launching a mutual fund in India.",
    keywords: "Regulatory Compliance",
    alternates: { canonical: "/sebi/mutual-fund-registration" }
};

export default function Page() {
    return <PageClient />;
}
