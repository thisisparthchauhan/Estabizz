import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Refund Policy | Estabizz Fintech Private Limited",
    description: "Refund Policy for Estabizz Fintech professional advisory, documentation, regulatory compliance and licensing support services.",
    keywords: "Estabizz refund policy, professional service refund policy, Estabizz billing policy",
    alternates: { canonical: "/legal/refund-policy" }
};

export default function Page() {
    return <PageClient />;
}
