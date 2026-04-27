import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "AIF Registration in India – Complete & Powerful 2026 SEBI Compliance Guide",
    description: "AIF Registration in India explained in detail as per SEBI AIF Regulations 2012 (updated 2025). Covers categories, capital requirements, fees, PPM, scheme design, compliance, SOP, rejection grounds and post-registration obligations.",
    keywords: "AIF Registration in India, SEBI AIF Regulations 2012, Category I AIF, Category II AIF, Category III AIF, Private Placement Memorandum, PPM, Form A SEBI, Angel Fund, LVF, Co-Investment CIV",
    alternates: { canonical: "/sebi/aif-registration-in-india" }
};

export default function Page() {
    return <PageClient />;
}
