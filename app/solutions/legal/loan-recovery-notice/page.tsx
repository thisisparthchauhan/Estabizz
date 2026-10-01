import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/loan-recovery-notice';

export const metadata: Metadata = {
    title: "Loan Recovery Notice: Limitation, Route and Enforcement",
    description: "Loan Recovery Notice support in India — the three-year limitation on money lent and how a written acknowledgement under Limitation Act Section 18 or part payment under Section 19 starts a fresh period, choosing between civil suit, summary suit, cheque dishonour, SARFAESI, DRT and IBC, guarantor liability and lawful recovery conduct.",
    keywords: "Loan Recovery Notice, legal notice for unpaid loan, limitation three years money lent, Limitation Act Section 18 acknowledgement, Order XXXVII summary suit, SARFAESI Section 13(2), DRT recovery, IBC Section 8 demand, guarantor notice, EMI default, friendly loan recovery",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Loan Recovery Notice — Limitation, Route and Enforcement",
        description: "Three years is shorter than most lenders think, and a signed acknowledgement obtained in time restarts the clock. Get that right before drafting anything.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
