import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Legal Support Services in India – Comprehensive Regulatory Assistance",
    description: "Expert NBFC legal support services in India. Get complete assistance for NBFC registration, compliance, RBI guidelines, legal documentation, and regulatory advisory from experienced fintech lawyers.",
    keywords: "NBFC Legal Support",
    alternates: { canonical: "/rbi/nbfc-legal-support" }
};

export default function Page() {
    return <PageClient />;
}
