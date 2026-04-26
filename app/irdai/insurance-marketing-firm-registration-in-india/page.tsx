import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Insurance Marketing Firm Registration in India – Complete & Practical Compliance Guide",
    description: "Insurance Marketing Firm Registration in India – detailed eligibility, capital requirement, IRDAI process, fees, documents, compliance obligations and regulatory framework explained in simple professional language.",
    keywords: "Insurance Marketing Firm Registration in India, IMF Registration, IRDAI IMF Regulations 2015, Insurance Sales Person, District-Based Insurance Distribution",
    alternates: { canonical: "/irdai/insurance-marketing-firm-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
