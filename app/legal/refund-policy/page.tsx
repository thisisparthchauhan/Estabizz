import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy | Estabizz Fintech Private Limited",
    description: "Refund and Cancellation Policy for Estabizz Fintech professional advisory, regulatory documentation, compliance support, government fee exclusions and billing requests.",
    alternates: { canonical: "/legal/refund-policy" }
};

export default function Page() {
    return <PageClient />;
}
