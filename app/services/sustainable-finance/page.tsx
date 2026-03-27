import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Sustainable Finance in India: 2026 Ultimate Guide to ESG Compliance & Growth Opportunities 🔗 Permalink",
    description: "Complete guide and compliance information.",
    keywords: "Sustainable Finance in India",
    alternates: { canonical: "/services/sustainable-finance" }
};

export default function Page() {
    return <PageClient />;
}
