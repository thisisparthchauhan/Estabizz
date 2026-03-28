import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Legal Due Diligence Services in India: Critical Checks for Smart & Secure Business Deals",
    description: "Complete guide and compliance information.",
    keywords: "Legal Due Diligence Services in India",
    alternates: { canonical: "/services/legal-due-diligence" }
};

export default function Page() {
    return <PageClient />;
}
