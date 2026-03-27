import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Social Stock Exchange License in India – Complete 2026 Guide for NGOs & Social Enterprises",
    description: "Social Stock Exchange License in India – eligibility, process, SEBI rules, documents, fees, compliance & FAQs for NGOs and social enterprises.",
    keywords: "Regulatory Compliance",
    alternates: { canonical: "/sebi/social-stock-exchange-license" }
};

export default function Page() {
    return <PageClient />;
}
