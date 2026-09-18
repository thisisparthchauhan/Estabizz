import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/regulatory/insurance/insurance-repository-registration-in-india';

export const metadata: Metadata = {
    title: "Insurance Repository Registration in India – Complete 2026 Guide with Critical Compliance Insights",
    description: "Insurance Repository Registration in India – understand eligibility, IRDAI regulations, process, fees, compliance requirements and practical insights in this complete expert guide.",
    keywords: "Insurance Repository Registration in India, IRDAI Insurance Repository, e-Insurance Account, eIA Registration, Insurance Repository Guidelines, Dematerialisation of Insurance Policies, Insurance Repository Licence, IRDAI Repository Cybersecurity",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Insurance Repository Registration in India – Complete IRDAI Guide",
        description: "IRDAI insurance repository registration — eIA model, eligibility, technology and cybersecurity expectations, documents, process, fees, compliance, inspection and 150 FAQs by Estabizz.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
