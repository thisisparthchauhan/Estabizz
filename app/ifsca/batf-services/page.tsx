import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA BATF Services: Book-keeping, Accounting, Taxation & Financial Crime Compliance in GIFT IFSC",
    description: "Complete guide to IFSCA BATF Service Provider registration — Book-keeping, Accounting, Taxation and Financial Crime Compliance Services Regulations 2024, eligibility, fees, compliance in GIFT IFSC.",
    keywords: "IFSCA BATF Services, Book-keeping Accounting Taxation Financial Crime Compliance, GIFT IFSC, BATF Service Provider Registration",
    alternates: { canonical: "/ifsca/batf-services" }
};

export default function Page() {
    return <PageClient />;
}
