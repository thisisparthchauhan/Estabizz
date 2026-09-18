import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/regulatory/insurance/isnp-certification-in-india';

export const metadata: Metadata = {
    title: "ISNP Certification in India – Complete Guide, Eligibility, Process & Compliance Insights (2026)",
    description: "ISNP Certification in India explained in detail. Check eligibility, process, documents, fees, compliance and practical regulatory insights.",
    keywords: "ISNP Certification in India, Network Security Certification, Cybersecurity Certification India, CERT-In Compliance, IT Act 2000 Cybersecurity, DPDP Act Compliance, Vendor Risk Management, Cyber Audit Readiness",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "ISNP Certification in India – Complete Cybersecurity Compliance Guide",
        description: "ISNP Certification — scope, eligibility, documents, audit expectations, internal controls, gap analysis, renewal, regulator linkages and 150 FAQs by Estabizz.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
