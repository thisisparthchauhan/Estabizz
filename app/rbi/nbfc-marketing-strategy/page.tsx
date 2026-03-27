import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Marketing Strategy in India – Digital, B2B and Growth Playbook",
    description: "Comprehensive NBFC marketing strategy guide for India. Explore digital marketing, branch expansion, co-lending partnerships, DSA networks, fintech collaborations, and data-driven growth strategies for NBFCs.",
    keywords: "NBFC Marketing Strategy India",
    alternates: { canonical: "/rbi/nbfc-marketing-strategy" }
};

export default function Page() {
    return <PageClient />;
}
