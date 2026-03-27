import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "FEMA Registration in India: Guide to Compliance Requirements",
    description: "Complete guide and compliance information.",
    keywords: "FEMA Registration in India",
    alternates: { canonical: "/fema/fema-registration" }
};

export default function Page() {
    return <PageClient />;
}
