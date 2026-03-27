import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IRDAI Regulatory Sandbox in India: Ultimate Guide to Insurance Innovation Framework in India",
    description: "IRDAI Regulatory Sandbox in India allows insurers and startups to test innovative insurance products under regulatory supervision. Complete guide, process & compliance.",
    keywords: "IRDAI Regulatory Sandbox in India",
    alternates: { canonical: "/irdai/irdai-regulatory-sandbox" }
};

export default function Page() {
    return <PageClient />;
}
