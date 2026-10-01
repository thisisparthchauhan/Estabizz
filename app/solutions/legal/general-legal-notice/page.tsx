import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/general-legal-notice';

export const metadata: Metadata = {
    title: "General Legal Notice: When It Is Required and What It Must Say",
    description: "General Legal Notice drafting in India — where a notice is legally mandatory including CPC Section 80, NI Act Section 138, IBC Section 8, SARFAESI Section 13(2) and Arbitration Section 21, the anatomy of a notice that works, service and proof, limitation, and replying to a notice you have received.",
    keywords: "General Legal Notice, legal notice drafting India, CPC Section 80 notice to government, cheque bounce notice 30 days, IBC Section 8 demand notice, SARFAESI 13(2) notice, arbitration notice Section 21, reply to legal notice, recovery notice, pre-litigation demand",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "General Legal Notice — When It Is Required and What It Must Say",
        description: "Some notices are statutory preconditions with fixed periods. Most are optional but decisive. Knowing which you are sending changes how it is drafted.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
