import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Account Aggregator License: Complete RBI Registration Guide with Eligibility, Process & Compliance",
    description: "NBFC Account Aggregator License in India – detailed RBI registration process, eligibility, documents, compliance requirements, and step-by-step AA licence guide.",
    keywords: "NBFC Account Aggregator License",
    alternates: { canonical: "/rbi/nbfc-account-aggregator-license" }
};

export default function Page() {
    return <PageClient />;
}
