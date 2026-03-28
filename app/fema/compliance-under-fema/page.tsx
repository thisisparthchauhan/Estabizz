import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "FEMA Compliance in India: Complete & Practical Guide for Businesses",
    description: "Complete guide and compliance information.",
    keywords: "FEMA Compliance in India",
    alternates: { canonical: "/fema/compliance-under-fema" }
};

export default function Page() {
    return <PageClient />;
}
