import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Payment Aggregator License in India – Complete Authoritative RBI 2025 Compliance Guide",
    description: "Payment Aggregator License in India explained as per RBI Master Direction 2025. Detailed eligibility, ₹15 crore capital requirement, escrow rules, PA-O, PA-P, PA-CB framework, Annexure 1 technology compliance, and approval process.",
    keywords: "Payment Aggregator License in India, PA-O, PA-P, PA-CB, RBI Master Direction 2025, PSS Act 2007, Escrow Account, FIU-IND, CERT-In Audit, PCI-DSS",
    alternates: { canonical: "/rbi/payment-aggregator-license-in-india" }
};

export default function Page() {
    return <PageClient />;
}
