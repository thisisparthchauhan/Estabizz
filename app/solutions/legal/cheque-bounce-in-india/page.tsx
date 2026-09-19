import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/cheque-bounce-in-india';

export const metadata: Metadata = {
    title: "Cheque Bounce in India: Section 138 Notice, Complaint and Recovery",
    description: "Cheque Bounce in India under Section 138 of the Negotiable Instruments Act — the 30-day notice window, 15-day payment period, complaint limitation, company and director liability, interim compensation, compounding and civil recovery.",
    keywords: "Cheque Bounce in India, Section 138 NI Act, cheque bounce notice, 30 days legal notice, 15 days payment, Section 139 presumption, Section 141 company liability, Section 143A interim compensation, Section 147 compounding, cheque dishonour complaint",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Cheque Bounce in India — Section 138 Notice, Complaint and Recovery",
        description: "The three statutory windows that decide a Section 138 case, plus company liability, interim compensation, settlement and parallel civil recovery.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
