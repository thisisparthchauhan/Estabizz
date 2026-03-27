import type { Metadata } from 'next';
import NBFCAALicenseClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Account Aggregator License – Complete RBI Registration Guide | Estabizz Fintech",
    description: "Comprehensive guide to obtaining an NBFC Account Aggregator (NBFC-AA) license from RBI. Covers eligibility, technology requirements, consent architecture, application process, and compliance obligations.",
    keywords: "NBFC Account Aggregator license, NBFC-AA RBI registration, account aggregator license India, RBI AA license guide, fintech account aggregator registration",
    alternates: {
        canonical: "/rbi/nbfc-aa-license-guide",
    },
};

export default function Page() {
    return <NBFCAALicenseClient />;
}
