import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/first-information-report';

export const metadata: Metadata = {
    title: "First Information Report: BNSS Section 173, Zero FIR and e-FIR",
    description: "First Information Report support in India — FIR registration under BNSS Section 173, Zero FIR irrespective of jurisdiction, e-FIR signed within three days, the new preliminary enquiry for three-to-seven-year offences, escalation to the Superintendent of Police and the Magistrate, and accused-side risk review.",
    keywords: "First Information Report, FIR, BNSS Section 173, Zero FIR, e-FIR electronic complaint, preliminary enquiry 14 days, police refuse to register FIR, Superintendent of Police representation, Magistrate Section 175(3), FIR quashing, accused side FIR strategy",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "First Information Report — BNSS Section 173, Zero FIR and e-FIR",
        description: "How FIR registration actually works under the BNSS, what changed in 2024, and what to do when the police will not register one.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
