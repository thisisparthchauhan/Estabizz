import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/recovery-from-debtors';

export const metadata: Metadata = {
    title: "Recovery From Debtors: Choosing the Right Route",
    description: "Recovering business receivables — Section 12A pre-institution mediation and when it is mandatory, the MSMED 45-day rule with interest at three times the bank rate, the MSEFC route that overrides an arbitration clause, the one crore IBC threshold, summary suits, and why Section 37(2)(g) gives your buyer a tax reason to pay.",
    keywords: "Recovery from debtors, unpaid invoices recovery, Section 12A pre-institution mediation, Patil Automation, MSMED Act section 15 16 18, MSEFC Samadhaan, three times bank rate, IBC section 9 one crore threshold, Mobilox pre-existing dispute, Order XXXVII summary suit, section 37(2)(g) MSME disallowance",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Recovery From Debtors — Choosing the Right Route",
        description: "Forum selection decides recovery. The MSMED route, the mediation gate, the insolvency threshold and the summary suit — and which one fits your claim.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
