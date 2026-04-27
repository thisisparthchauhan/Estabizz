import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "PPI Registration in India – Complete & Critical RBI Compliance Guide for Fintech Businesses",
    description: "PPI Registration in India explained under RBI Master Directions (updated December 2024). Detailed guide covering eligibility, capital requirement, escrow norms, transaction limits, audit, reporting, and compliance framework.",
    keywords: "PPI Registration in India, Prepaid Payment Instrument, RBI Master Directions PPI, Digital Wallet License, Prepaid Card Authorisation, PSS Act 2007, Form A, System Audit Report",
    alternates: { canonical: "/rbi/ppi-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
