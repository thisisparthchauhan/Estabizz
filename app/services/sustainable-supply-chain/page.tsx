import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Sustainable Supply Chain Management: 7 Powerful Benefits & Essential Compliance Guide in India 🔗 Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Sustainable Supply Chain Management",
    alternates: { canonical: "/services/sustainable-supply-chain" }
};

export default function Page() {
    return <PageClient />;
}
