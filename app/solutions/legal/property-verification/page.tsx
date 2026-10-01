import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/property-verification';

export const metadata: Metadata = {
    title: "Property Verification: Title Due Diligence Before You Pay",
    description: "Legal due diligence before buying, lending against or investing in property — title chain and link documents, encumbrance certificate limits, litigation and lis pendens, RERA and approval checks, revenue records, possession, power of attorney risk, succession claims, and the red flags that should stop a transaction.",
    keywords: "Property verification India, title search, title chain link documents, encumbrance certificate, lis pendens section 52, RERA verification, mutation record, GPA sale risk, property due diligence report, NRI property fraud, SARFAESI property check",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Property Verification — Title Due Diligence Before You Pay",
        description: "What an encumbrance certificate does not show, why a GPA sale conveys nothing, and the red flags that should stop a transaction.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
