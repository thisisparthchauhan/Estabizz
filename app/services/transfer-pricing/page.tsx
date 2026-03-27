import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Transfer Pricing in India: Complete Compliance Guide with Practical Insights",
    description: "Transfer Pricing in India explained in detail – applicability, regulations, documentation, process, penalties, and compliance requirements under Income Tax Act.",
    keywords: "Transfer Pricing in India",
    alternates: { canonical: "/services/transfer-pricing" }
};

export default function Page() {
    return <PageClient />;
}
