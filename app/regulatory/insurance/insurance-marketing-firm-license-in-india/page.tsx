import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/regulatory/insurance/insurance-marketing-firm-license-in-india';

export const metadata: Metadata = {
    title: "Insurance Marketing Firm License in India: 2026 Complete Guide with Eligibility, Process & Compliance",
    description: "Insurance Marketing Firm License in India – Complete 2026 guide covering eligibility, IRDAI rules, registration process, fees, compliance, and practical insights.",
    keywords: "Insurance Marketing Firm License in India, IMF License IRDAI, Insurance Marketing Firm Registration, IRDAI IMF Regulations 2015, Insurance Sales Person, IMF Principal Officer, Multi-Product Insurance Distribution, IMF Net Worth Requirement",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Insurance Marketing Firm License in India – Complete IRDAI Guide",
        description: "IRDAI Insurance Marketing Firm licensing — eligibility, scope, restrictions, Principal Officer and ISP requirements, documents, fees, timeline, compliance and 150 FAQs by Estabizz.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
