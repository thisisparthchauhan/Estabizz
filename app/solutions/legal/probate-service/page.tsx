import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/probate-service';

export const metadata: Metadata = {
    title: "Probate Service: Section 213 Omitted, What Changes",
    description: "Probate of a Will after the Repealing and Amending Act, 2025 omitted Section 213 of the Indian Succession Act — probate is no longer a statutory precondition anywhere in India. When it is still worth obtaining, letters of administration, caveats, attesting witness proof under BSA Section 67, court fees and estate administration.",
    keywords: "Probate service, Section 213 Indian Succession Act omitted, Repealing and Amending Act 2025, probate no longer mandatory, letters of administration, succession certificate, caveat Section 284, probate court fee Maharashtra, judgment in rem, attesting witness BSA Section 67",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Probate Service — After the Omission of Section 213",
        description: "Probate is no longer a statutory precondition to establishing a right under a Will. What that changes, and when probate is still worth obtaining.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
