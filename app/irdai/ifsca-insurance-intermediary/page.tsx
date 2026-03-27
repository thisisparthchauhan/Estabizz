import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "IFSCA Insurance Intermediary Regulations 2021 – Powerful Foundation for IFSC Insurance Businesses 🔹 SEO",
    description: "IFSCA Insurance Intermediary Regulations 2021 explain the legal framework, objectives, and key definitions governing insurance intermediaries operating in IFSC under IFSCA supervision. 🔹",
    keywords: "IFSCA Insurance Intermediary Regulations 2021 🔹",
    alternates: { canonical: "/irdai/ifsca-insurance-intermediary" }
};

export default function Page() {
    return <PageClient />;
}
