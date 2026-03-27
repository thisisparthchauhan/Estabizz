import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "TPA License India: Complete Guide to IRDAI Registration, Eligibility & Compliance",
    description: "Complete guide and compliance information.",
    keywords: "TPA License India",
    alternates: { canonical: "/services/pap-license" }
};

export default function Page() {
    return <PageClient />;
}
