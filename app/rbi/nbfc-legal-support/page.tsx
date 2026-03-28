import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Legal Support Services in India: Complete Compliance Guide",
    description: "Complete guide and compliance information.",
    keywords: "NBFC Legal Support Services in India",
    alternates: { canonical: "/rbi/nbfc-legal-support" }
};

export default function Page() {
    return <PageClient />;
}
