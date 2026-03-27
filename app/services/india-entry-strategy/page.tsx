import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "India Entry Strategy: Steps for Smooth & Successful Business Setup in India",
    description: "Complete guide and compliance information.",
    keywords: "India Entry Strategy",
    alternates: { canonical: "/services/india-entry-strategy" }
};

export default function Page() {
    return <PageClient />;
}
