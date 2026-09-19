import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/adulteration-of-drugs-legal-services';

export const metadata: Metadata = {
    title: "Adulteration of Drugs: Legal Support for Drug Quality, CDSCO Notices and Defence",
    description: "Adulteration of Drugs legal services in India for CDSCO notices, State Drug Control action, drug sample failure, prosecution defence, recall strategy, licence risk and legal support under the Drugs and Cosmetics Act, BNS, BNSS and BSA.",
    keywords: "Adulteration of Drugs, CDSCO notice reply, drug sample failure, State Drug Control notice, spurious drugs, misbranded drugs, BNS Section 276, Drugs and Cosmetics Act 1940, drug licence suspension, product recall, Government Analyst report",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Adulteration of Drugs — Legal Support for CDSCO Notices and Drug Quality Disputes",
        description: "Drug sample failure, CDSCO and State Drug Control notices, recall strategy, licence risk, company liability mapping and prosecution defence.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
