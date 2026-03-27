import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Takeover of NBFC in India – Complete Guide to Acquisition and Change of Control",
    description: "Comprehensive guide on NBFC takeover in India. Understand RBI prior approval requirements, due diligence, change of management/control, documentation, and regulatory compliance for acquiring an NBFC.",
    keywords: "NBFC Takeover in India",
    alternates: { canonical: "/rbi/nbfc-takeover" }
};

export default function Page() {
    return <PageClient />;
}
