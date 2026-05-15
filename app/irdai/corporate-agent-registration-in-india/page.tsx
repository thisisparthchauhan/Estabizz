import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Corporate Agent Registration in India – Complete and Practical Regulatory Guide for Seamless IRDAI Approval",
    description: "Corporate Agent Registration in India explained in a structured, practical manner covering eligibility, capital requirement, IRDAI process, documentation, fees, and post-registration compliance obligations.",
    keywords: "Corporate Agent Registration in India, IRDAI Corporate Agent Registration, IRDAI Corporate Agents Regulations 2015, Corporate Agency License, Corporate Agent Insurance License, Insurance Intermediary Registration, Bancassurance Distribution, NBFC Insurance Distribution, Fintech Corporate Agent, Principal Officer IRDAI, Specified Persons Training",
    alternates: { canonical: "/irdai/corporate-agent-registration-in-india" },
    openGraph: {
        title: "Corporate Agent Registration in India – IRDAI Compliance Guide by Estabizz",
        description: "Complete IRDAI Corporate Agent Registration guide for NBFCs, fintech companies, banks, MFIs and corporates — eligibility, capital, Principal Officer, Specified Persons training, insurer tie-up limits, fees, compliance calendar and 100+ FAQs.",
        url: "/irdai/corporate-agent-registration-in-india",
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
