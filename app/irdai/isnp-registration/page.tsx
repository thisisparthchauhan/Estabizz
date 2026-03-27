import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "ISNP Certification in India – Complete Guide, Eligibility, Process & Compliance Insights (2026)",
    description: "ISNP Certification in India explained in detail. Check eligibility, process, documents, fees, compliance and practical regulatory insights.",
    keywords: "ISNP Certification in India",
    alternates: { canonical: "/irdai/isnp-registration" }
};

export default function Page() {
    return <PageClient />;
}
