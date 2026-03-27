import type { Metadata } from 'next';
import NBFCFinancialModelingClient from './PageClient';

export const metadata: Metadata = {
    title: "NBFC Financial Modeling – RBI-Compliant 5-Year Projections | Estabizz Fintech",
    description: "Professional NBFC financial modeling services for RBI registration, investor fundraising, and supervisory compliance. 5-year projections with CRAR, NPA, and stress-testing analysis.",
    keywords: "NBFC financial modeling, NBFC financial projections, NBFC RBI registration financial model, CRAR projections NBFC, NBFC business plan financial model",
    alternates: {
        canonical: "/rbi/nbfc-financial-modeling",
    },
};

export default function Page() {
    return <NBFCFinancialModelingClient />;
}
