import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "RBI Services in India: Complete Guide with 7 Powerful Compliance Solutions for Businesses",
    description: "RBI Services in India explained with registration, licensing, FEMA compliance, and NBFC approvals. Complete guide for businesses and fintech entities.",
    keywords: "Regulatory Compliance",
    alternates: { canonical: "/rbi/rbi-services" }
};

export default function Page() {
    return <PageClient />;
}
