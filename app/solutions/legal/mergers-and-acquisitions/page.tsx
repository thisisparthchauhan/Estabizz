import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/mergers-and-acquisitions';

export const metadata: Metadata = {
    title: "Mergers and Acquisitions: Structure, Diligence and Approvals",
    description: "M&A legal support in India — choosing between share acquisition, asset purchase, slump sale and a court-sanctioned merger, legal due diligence, the NCLT scheme route under Companies Act Sections 230 to 232, the CCI deal value threshold, SEBI takeover regulations, FEMA, transaction documents and closing.",
    keywords: "Mergers and Acquisitions India, share purchase agreement, slump sale Section 50B, NCLT merger scheme Sections 230 232, legal due diligence, CCI combination deal value threshold, SEBI SAST open offer, FEMA NDI Rules, business transfer agreement, conditions precedent closing",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Mergers and Acquisitions — Structure, Diligence and Approvals",
        description: "The structure decides the tax, the approvals and the timeline. Settle it before anyone drafts a share purchase agreement.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
