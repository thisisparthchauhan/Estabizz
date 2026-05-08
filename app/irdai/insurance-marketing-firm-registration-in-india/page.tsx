import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Insurance Marketing Firm Registration in India – Complete & Practical Compliance Guide",
    description: "Insurance Marketing Firm Registration in India – detailed eligibility, capital requirement, IRDAI process, fees, documents, compliance obligations and regulatory framework explained in simple professional language.",
    keywords: "Insurance Marketing Firm Registration in India, IMF Registration, IRDAI IMF Registration, IRDAI Insurance Marketing Firm Regulations 2015, Insurance Marketing Firm License, Insurance Sales Person, ISP Framework, District-Based Insurance Distribution, Principal Officer IRDAI, ₹10 Lakh Net Worth IMF, LLP Insurance Distribution",
    alternates: { canonical: "/irdai/insurance-marketing-firm-registration-in-india" },
    openGraph: {
        title: "Insurance Marketing Firm Registration in India – IRDAI Compliance Guide",
        description: "Complete IRDAI Insurance Marketing Firm Registration guide — Company / LLP structuring, ₹10 lakh net worth, Principal Officer, Insurance Sales Persons, district-based operations, fees, compliance calendar and 80+ FAQs by Estabizz.",
        url: "/irdai/insurance-marketing-firm-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
