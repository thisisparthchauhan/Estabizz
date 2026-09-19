import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/cyber-security-advisory';

export const metadata: Metadata = {
    title: "Cyber Security Advisory: IT Act, CERT-In and DPDP Readiness",
    description: "Cyber Security Advisory in India — IT Act and SPDI Rules compliance, CERT-In six-hour incident reporting and 180-day log retention, DPDP Act and DPDP Rules 2025 readiness ahead of the 13 May 2027 commencement, VAPT coordination, cyber policy drafting, vendor risk and breach response.",
    keywords: "Cyber Security Advisory, CERT-In compliance, CERT-In incident reporting, DPDP Act compliance, DPDP Rules 2025, IT Act Section 43A, SPDI Rules 2011, VAPT coordination, data breach response, vendor risk review, cyber policy drafting, log retention",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Cyber Security Advisory — IT Act, CERT-In and DPDP Readiness",
        description: "What is actually in force today, what commences on 13 May 2027, and the policies, logs and evidence a business needs before an incident.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
