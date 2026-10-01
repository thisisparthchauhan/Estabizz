import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/weights-and-measures-offences';

export const metadata: Metadata = {
    title: "Weights and Measures Offences: Legal Metrology Defence",
    description: "Offences relating to weights and measures under the Legal Metrology Act, 2009 — the improvement notice mechanism for first-time procedural lapses, the Jan Vishwas decriminalisation, packaged commodity and e-commerce declarations, verification and stamping, compounding under Section 48, company and nominee liability, and appeals.",
    keywords: "Weights and measures offences, Legal Metrology Act 2009, improvement notice Legal Metrology, Jan Vishwas Act 2026, packaged commodities rules declaration, verification and stamping section 24, compounding section 48, offences by companies section 49, legal metrology notice reply, BNS omitted IPC 264 267",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Weights and Measures Offences — Legal Metrology Defence",
        description: "The improvement notice mechanism, the Jan Vishwas decriminalisation, and how a Legal Metrology notice should actually be answered.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
