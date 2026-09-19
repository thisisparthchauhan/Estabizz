import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/contested-divorce';

export const metadata: Metadata = {
    title: "Contested Divorce: Grounds, Interim Relief and Family Court Process",
    description: "Contested Divorce in India — which matrimonial Act applies, grounds under Section 13 of the Hindu Marriage Act and Section 27 of the Special Marriage Act, interim maintenance, custody, evidence strategy, NRI matters and Family Court procedure.",
    keywords: "Contested Divorce, Hindu Marriage Act Section 13, Special Marriage Act Section 27, Family Court, interim maintenance, BNSS Section 144 maintenance, child custody, cruelty desertion adultery, stridhan, NRI divorce",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Contested Divorce — Grounds, Interim Relief and Family Court Process",
        description: "Applicable Act, jurisdiction, grounds, interim maintenance and custody, evidence strategy and the route to settlement.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
