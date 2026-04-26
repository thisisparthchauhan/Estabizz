import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC SRO Registration – A Powerful & Transformative Governance Framework for the NBFC Sector",
    description: "NBFC SRO Registration explained in detail under RBI guidelines. Understand eligibility, capital requirements, application process, regulatory framework, governance obligations, compliance structure and benefits of becoming a Self-Regulatory Organisation for NBFCs.",
    keywords: "NBFC SRO Registration, Self-Regulatory Organisation NBFC, RBI SRO Framework, NBFC Industry Body, NBFC Governance, ₹2 Crore Net Worth SRO",
    alternates: { canonical: "/rbi/nbfc-sro-registration" }
};

export default function Page() {
    return <PageClient />;
}
