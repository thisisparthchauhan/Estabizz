import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/defamation-legal-services';

export const metadata: Metadata = {
    title: "Defamation: BNS Section 356, Civil Damages and Remedies",
    description: "Defamation legal services in India — criminal defamation under BNS Section 356 and the complaint route under BNSS Section 222, civil suits for damages and injunction, the one-year civil limitation under the Limitation Act, statutory exceptions, online and corporate defamation, digital evidence and defence strategy.",
    keywords: "Defamation, BNS Section 356, criminal defamation India, BNSS Section 222, civil defamation damages, defamation limitation one year, defamation exceptions truth public good, online defamation, corporate defamation, injunction against publication, defamation defence",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Defamation — BNS Section 356, Civil Damages and Remedies",
        description: "The ingredients, the statutory exceptions, the civil and criminal routes and the two very different limitation clocks that run on them.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
