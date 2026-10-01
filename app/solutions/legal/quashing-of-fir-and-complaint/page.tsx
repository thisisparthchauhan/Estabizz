import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/quashing-of-fir-and-complaint';

export const metadata: Metadata = {
    title: "Quashing of FIR and Complaint: BNSS Section 528",
    description: "Quashing an FIR, complaint, charge-sheet or summons before the High Court under BNSS Section 528 — the Bhajan Lal categories, why Section 482 now means anticipatory bail, what Neeharika Infrastructure says about no-coercive-steps orders, settlement-based quashing under Parbatbhai Aahir, and director and officer defences.",
    keywords: "Quashing of FIR, BNSS Section 528, inherent powers High Court, Bhajan Lal seven categories, Neeharika Infrastructure no coercive steps, Parbatbhai Aahir settlement quashing, BNSS 482 anticipatory bail, quash charge sheet, summons order quashing, civil dispute criminal case",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Quashing of FIR and Complaint — BNSS Section 528",
        description: "The inherent power is now Section 528, not 482. The Bhajan Lal categories, the limits on interim protection, and when settlement will and will not work.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
