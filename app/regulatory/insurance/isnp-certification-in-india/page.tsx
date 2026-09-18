import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/regulatory/insurance/isnp-certification-in-india';

export const metadata: Metadata = {
    title: "ISNP Security Audit for IRDAI Compliance: Scope, Auditor, Process and Timeline",
    description: "The independent security audit an Insurance Self-Network Platform needs before it goes live and annually after — CERT-In empanelled auditor, audit scope, deliverables, timeline and how it differs from ISNP registration.",
    keywords: "ISNP Security Audit, ISNP Certification, Insurance Self-Network Platform audit, IRDAI cyber security audit, CERT-In empanelled auditor, ISNP VAPT, IRDAI Insurance e-Commerce Guidelines 2017, ISNP annual audit, insurance platform penetration testing",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "ISNP Security Audit for IRDAI Compliance",
        description: "What the ISNP security audit covers, who may perform it, what is delivered, and how it sits alongside ISNP registration under the IRDAI Guidelines on Insurance e-Commerce.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
