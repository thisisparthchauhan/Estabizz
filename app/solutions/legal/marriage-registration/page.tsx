import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/marriage-registration';

export const metadata: Metadata = {
    title: "Marriage Registration: Certificate, Documents and Process",
    description: "Marriage registration in India — registering a solemnised marriage under Hindu Marriage Act Section 8 and the Special Marriage Act route, why registration is directed by the Supreme Court, documents and witnesses, interfaith and NRI marriages, apostille for overseas use, delay and corrections.",
    keywords: "Marriage Registration, marriage certificate India, Hindu Marriage Act Section 8, Special Marriage Act registration, Seema v Ashwani Kumar, interfaith marriage registration, NRI marriage certificate, apostille marriage certificate, Tatkal marriage registration, name correction certificate",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Marriage Registration — Certificate, Documents and Process",
        description: "Registering a marriage that has already taken place, the certificate you will need for passports and visas, and the routes for interfaith and NRI couples.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
