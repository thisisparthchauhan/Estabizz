import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA FinTech Entity Framework & Incentive Scheme: Authorization, Sandbox & Grants in GIFT IFSC",
    description: "Complete guide to IFSCA FinTech Entity Framework — Authorization, Sandbox (Regulatory & Innovation), Accelerator programs, FinTech Incentive Scheme grants up to INR 75 Lakhs, eligibility, fees and compliance in GIFT IFSC.",
    keywords: "IFSCA FinTech Entity, FinTech Framework GIFT IFSC, IFSCA Sandbox, FinTech Incentive Scheme, FinTech Grants, Accelerator GIFT City, TechFin IFSCA",
    alternates: { canonical: "/ifsca/fintech-entity" }
};

export default function Page() {
    return <PageClient />;
}
