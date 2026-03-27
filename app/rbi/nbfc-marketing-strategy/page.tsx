import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Marketing Strategy in India: 15 Proven Ways to Grow Faster",
    description: "Complete guide and compliance information.",
    keywords: "NBFC Marketing Strategy in India",
    alternates: { canonical: "/rbi/nbfc-marketing-strategy" }
};

export default function Page() {
    return <PageClient />;
}
