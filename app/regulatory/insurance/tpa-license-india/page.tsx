import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/regulatory/insurance/tpa-license-india';

export const metadata: Metadata = {
    title: "TPA License India: Complete 2026 Powerful Guide to IRDAI Registration, Eligibility & Compliance",
    description: "TPA License India guide covering IRDAI registration, eligibility, documents, process, fees, compliance, and expert insights for fast approval.",
    keywords: "TPA License India, Third Party Administrator IRDAI, TPA Registration India, IRDAI TPA Health Services Regulations, Health Insurance Claims Processing, Cashless Hospitalisation, TPA Principal Officer, TPA Capital Requirement",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "TPA License India – Complete IRDAI Registration Guide",
        description: "IRDAI Third Party Administrator licensing — eligibility, Rs. 4 crore capital, Principal Officer, documents, process, fees, timeline, operations, compliance and 150 FAQs by Estabizz.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
