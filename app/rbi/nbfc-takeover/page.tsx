import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Takeover in India: Ultimate Guide to RBI Approval, Process & Compliance Risks",
    description: "Complete guide and compliance information.",
    keywords: "NBFC Takeover in India",
    alternates: { canonical: "/rbi/nbfc-takeover" }
};

export default function Page() {
    return <PageClient />;
}
