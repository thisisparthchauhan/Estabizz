import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/public-interest-litigation';

export const metadata: Metadata = {
    title: "Public Interest Litigation: Maintainability and Filing",
    description: "PIL support under Article 32 and Article 226 — the Balwant Singh Chaufal directions on verifying credentials, why publicity, private and political interest litigation is dismissed with costs, the NGT forum question in environmental matters, representation and RTI groundwork, respondent mapping and practical relief drafting.",
    keywords: "Public interest litigation, PIL maintainability, Article 32, Article 226, Balwant Singh Chaufal, publicity interest litigation, PIL dismissed with costs, continuing mandamus, National Green Tribunal section 14, PIL evidence RTI, writ of mandamus",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Public Interest Litigation — Maintainability and Filing",
        description: "Genuine cause, clean petitioner, credible evidence and relief a court can actually grant. What makes a PIL survive the threshold.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
