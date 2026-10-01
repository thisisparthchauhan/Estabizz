import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/recovery-notice-of-dues';

export const metadata: Metadata = {
    title: "Recovery Notice of Dues: Drafting and Serving It",
    description: "Drafting a recovery notice that works — computing the claim net of credits, GST and TDS, stating the interest basis, acknowledgement under Limitation Act Sections 18 and 19, how a careless notice can create the pre-existing dispute that kills your insolvency route, service and proof of service, and how to reply to one.",
    keywords: "Recovery notice of dues, legal notice for unpaid invoice, demand notice drafting, Limitation Act section 18 acknowledgement, section 19 part payment, pre-existing dispute IBC section 8, proof of service legal notice, interest on delayed payment, reply to recovery notice, statutory demand notice",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Recovery Notice of Dues — Drafting and Serving It",
        description: "A notice that states a figure nobody can reconcile invites a dispute. One that proves every component gets paid.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
