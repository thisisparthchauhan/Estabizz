import type { Metadata } from 'next';
import PageClient from './PageClient';

const FULL_PATH = '/solutions/legal/non-payment-of-salary';

export const metadata: Metadata = {
    title: "Non Payment of Salary: Recovery Under the Code on Wages",
    description: "Unpaid salary, delayed wages and full-and-final settlement under the Code on Wages, 2019, in force since 21 November 2025 — the two-working-day exit rule, the three-year claim limitation, compensation of up to ten times the amount due, permissible deductions, and the correct forum for workers and managerial staff.",
    keywords: "Non payment of salary, unpaid salary legal notice, Code on Wages 2019, full and final settlement two working days, section 17 Code on Wages, section 45 claims authority, labour codes 21 November 2025, wrongful salary deduction, Industrial Relations Code section 59, gratuity Code on Social Security",
    alternates: { canonical: FULL_PATH },
    openGraph: {
        title: "Non Payment of Salary — Recovery Under the Code on Wages",
        description: "The labour codes changed salary recovery on 21 November 2025. The two-working-day F&F rule, a three-year limitation and compensation up to ten times the dues.",
        url: FULL_PATH,
        type: "article",
    },
};

export default function Page() {
    return <PageClient />;
}
