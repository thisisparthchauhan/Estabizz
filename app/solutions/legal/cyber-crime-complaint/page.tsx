import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/cyber-crime-complaint';

export const metadata: Metadata = {
    title: "Cyber Crime Complaint: Online Fraud, 1930 and Digital Evidence",
    description: "Cyber Crime Complaint support in India — the 1930 helpline, National Cyber Crime Reporting Portal, RBI customer liability and the three-working-day rule, digital evidence preservation under the Bharatiya Sakshya Adhiniyam, police complaint drafting, FIR strategy under BNSS, bank account freeze and defence support.",
    keywords: "Cyber Crime Complaint, 1930 cyber helpline, National Cyber Crime Reporting Portal, UPI fraud complaint, online fraud India, RBI zero liability unauthorised transaction, digital evidence BSA, FIR BNSS Section 173, bank account freeze cyber complaint, sextortion complaint, cyber police notice",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Cyber Crime Complaint — Online Fraud, 1930 and Digital Evidence",
        description: "What to do in the first hours after cyber fraud: report, preserve evidence, protect your liability position and file a complaint that names the offence.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
