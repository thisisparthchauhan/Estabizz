import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Enterprise Services in India: Complete Business Compliance Guide",
    description: "Complete guide and compliance information.",
    keywords: "Enterprise Services in India",
    alternates: { canonical: "/services/enterprise-services" }
};

export default function Page() {
    return <PageClient />;
}
