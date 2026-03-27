import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "SEBI Credit Rating Agency Registration – Complete 2026 Guide with Key Requirements & Process",
    description: "SEBI Credit Rating Agency Registration in India – complete guide covering eligibility, process, fees, compliance, and regulatory requirements.",
    keywords: "SEBI Credit Rating Agency Registration",
    alternates: { canonical: "/sebi/credit-rating-agency" }
};

export default function Page() {
    return <PageClient />;
}
