import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Corporate Agent Registration in India – Complete and Practical Regulatory Guide for Seamless IRDAI Approval",
    description: "Corporate Agent Registration in India explained in a structured, practical manner covering eligibility, capital requirement, IRDAI process, documentation, fees, and post-registration compliance obligations.",
    keywords: "Corporate Agent Registration in India, IRDAI Corporate Agent Regulations 2015, Corporate Agent License, Insurance Intermediary Registration",
    alternates: { canonical: "/irdai/corporate-agent-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
