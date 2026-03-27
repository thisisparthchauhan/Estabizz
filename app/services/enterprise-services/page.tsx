import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "(Power + Sentiment Optimised) Enterprise Services in India: Complete & Powerful Business Compliance Guide (~70 characters – within Rank Math recommended limit) Permalink (",
    description: "Complete guide and compliance information.",
    keywords: "Enterprise Services in India",
    alternates: { canonical: "/services/enterprise-services" }
};

export default function Page() {
    return <PageClient />;
}
