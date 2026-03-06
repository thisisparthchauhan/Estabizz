import type { Metadata } from 'next';
import FinanceCompanyArticleClient from './FinanceCompanyArticleClient';

export const metadata: Metadata = {
    title: "Finance Company in GIFT IFSC – Complete Strategic Guide for Global Treasury & Finance Setup",
    description: "Finance Company in GIFT IFSC – Detailed guide on eligibility, registration process, capital requirements, permissible activities, compliance obligations and regulatory framework under IFSCA.",
    keywords: "Finance Company in GIFT IFSC",
    alternates: {
        canonical: "/regulatory/finance-company-gift-ifsc"
    }
};

export default function Page() {
    return <FinanceCompanyArticleClient />;
}
