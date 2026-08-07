import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Refund and Cancellation Policy | Estabizz Fintech Private Limited",
    description: "Refund and Cancellation Policy of Estabizz Fintech Private Limited covering cancellations, refunds, service credits, timelines and payment adjustments.",
    keywords: "Estabizz refund policy, cancellation policy, service credit, payment refund",
    alternates: { canonical: "/legal/refund-policy" }
};

export default function Page() {
    return <PageClient />;
}
