import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Legal Process Outsourcing Services in India: Complete 2026 Guide for Businesses & Law Firms",
    description: "Legal Process Outsourcing services in India explained in detail – eligibility, process, benefits, compliance requirements, and how businesses can optimise legal operations efficiently.",
    keywords: "Legal Process Outsourcing",
    alternates: { canonical: "/services/legal-process-outsourcing" }
};

export default function Page() {
    return <PageClient />;
}
