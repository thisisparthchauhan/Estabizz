import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/bail-application';

export const metadata: Metadata = {
    title: "Bail Application: Regular, Anticipatory and Default Bail under BNSS",
    description: "Bail Application support under the Bharatiya Nagarik Suraksha Sanhita, 2023 — regular, anticipatory, interim, default and bail pending appeal, with BNSS section mapping, grounds, conditions, bonds and cancellation defence.",
    keywords: "Bail Application, BNSS bail, Section 478 BNSS, Section 480 BNSS, Section 482 anticipatory bail, Section 483 BNSS, default bail Section 187 BNSS, interim bail, bail pending appeal, bail conditions and sureties",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Bail Application — Regular, Anticipatory and Default Bail under BNSS",
        description: "Forum, bail type, grounds, documents, conditions and bonds under the BNSS framework, with CrPC to BNSS section mapping.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
