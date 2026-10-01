import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/lawyer-for-trai-matters';

export const metadata: Metadata = {
    title: "Lawyer for TRAI Matters: Telecom Regulation and TDSAT",
    description: "Legal support for TRAI matters in India — the TRAI Act, 1997 alongside the Telecommunications Act, 2023 and the shift from licence to authorisation, tariff orders, interconnection and quality of service, UCC and spam regulation, consumer grievance framework, regulatory notices and TDSAT proceedings.",
    keywords: "Lawyer for TRAI Matters, TRAI Act 1997, Telecommunications Act 2023, TDSAT appeal, telecom authorisation, tariff order compliance, interconnection dispute, quality of service regulations, UCC spam TRAI, DoT notice, broadcasting Cable TV Act, MSO LCO DTH",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Lawyer for TRAI Matters — Telecom Regulation and TDSAT",
        description: "What changed when the Telecommunications Act, 2023 replaced the Telegraph Act, which forum hears what, and how to answer a regulatory notice.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
