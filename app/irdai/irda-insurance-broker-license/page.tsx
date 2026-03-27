import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IRDAI Insurance Broker License – Complete Guide with Powerful Compliance Insights (2026)",
    description: "IRDAI Insurance Broker License in India – eligibility, documents, fees, process, compliance & expert guidance. Complete regulatory guide for brokers.",
    keywords: "IRDAI Insurance Broker License",
    alternates: { canonical: "/irdai/irda-insurance-broker-license" }
};

export default function Page() {
    return <PageClient />;
}
