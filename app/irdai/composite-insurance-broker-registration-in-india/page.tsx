import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Composite Insurance Broker Registration in India – Complete & Authoritative Compliance Guide for Serious Promoters",
    description: "Composite Insurance Broker Registration in India under IRDAI (Insurance Brokers) Regulations, 2018 – detailed eligibility, capital requirement, fee structure, registration process, documents, compliance calendar and regulatory insights explained professionally.",
    keywords: "Composite Insurance Broker Registration in India, IRDAI Insurance Brokers Regulations 2018, Composite Broker Licence, Composite Insurance Broker Licence, IRDAI Composite Broker, Insurance Broking Licence India, Life and General Insurance Broker, Reinsurance Broking, ₹5 Crore Capital Insurance Broker, Principal Officer IRDAI, Insurance Broker Compliance Calendar",
    alternates: { canonical: "/irdai/composite-insurance-broker-registration-in-india" },
    openGraph: {
        title: "Composite Insurance Broker Registration in India – IRDAI Compliance Guide",
        description: "Complete IRDAI Composite Insurance Broker Registration guide — life, general and reinsurance broking under one approval. ₹5 Crore capital, Principal Officer, business plan, fees, compliance calendar and 200 FAQs by Estabizz.",
        url: "/irdai/composite-insurance-broker-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
