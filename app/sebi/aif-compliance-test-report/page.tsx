import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Compliance Test Report for AIF: Complete Guide with Key Requirements, Process & Expert Insights",
    description: "Compliance Test Report for AIF is a mandatory regulatory requirement under SEBI AIF Regulations. Understand eligibility, process, documents, fees, timeline, and compliance obligations in this detailed",
    keywords: "Compliance Test Report for AIF",
    alternates: { canonical: "/sebi/aif-compliance-test-report" }
};

export default function Page() {
    return <PageClient />;
}
