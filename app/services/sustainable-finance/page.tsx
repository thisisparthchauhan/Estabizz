import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Sustainable Finance in India: Ultimate Guide to ESG Compliance & Growth Opportunities",
    description: "Complete guide and compliance information.",
    keywords: "Sustainable Finance in India",
    alternates: { canonical: "/services/sustainable-finance" }
};

export default function Page() {
    return <PageClient />;
}
