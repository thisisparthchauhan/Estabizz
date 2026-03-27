import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "ESG Consulting Services in India: 7 Powerful Compliance Benefits Every Business Must Know",
    description: "ESG Consulting Services in India help businesses meet sustainability, governance, and regulatory compliance. Understand eligibility, process, and benefits.",
    keywords: "Regulatory Compliance",
    alternates: { canonical: "/services/esg-consulting" }
};

export default function Page() {
    return <PageClient />;
}
