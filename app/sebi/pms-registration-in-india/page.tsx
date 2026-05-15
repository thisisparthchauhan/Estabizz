import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'PMS Registration in India – Complete & Powerful Regulatory Guide for Serious Wealth Managers',
    description: 'PMS Registration in India explained under SEBI Portfolio Managers Regulations, 2020. Learn eligibility, ₹5 crore net worth, Form A, Principal Officer, NISM certification, ₹50 lakh client minimum, process, fees, compliance and penalties.',
    keywords: 'PMS Registration in India, SEBI PMS Registration, Portfolio Manager Registration, Portfolio Management Services Registration, SEBI Portfolio Manager License, PMS License India, Discretionary PMS Registration, Non-Discretionary PMS Registration',
    alternates: { canonical: '/sebi/pms-registration-in-india' },
    openGraph: {
        title: 'PMS Registration in India – Complete & Powerful Regulatory Guide for Serious Wealth Managers',
        description: 'SEBI PMS registration guide covering eligibility, net worth, Principal Officer, NISM certification, client minimum, Form A, fees and compliance.',
        url: '/sebi/pms-registration-in-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is PMS Registration in India?', acceptedAnswer: { '@type': 'Answer', text: 'PMS Registration in India is approval granted by SEBI to a body corporate that intends to manage portfolios of securities or funds on behalf of clients under a written agreement.' } },
        { '@type': 'Question', name: 'Is PMS Registration mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. No person can act as a Portfolio Manager without obtaining SEBI registration.' } },
        { '@type': 'Question', name: 'What is the minimum net worth required?', acceptedAnswer: { '@type': 'Answer', text: 'Minimum net worth required is ₹5 Crore, subject to latest SEBI verification.' } },
        { '@type': 'Question', name: 'Can PMS guarantee returns?', acceptedAnswer: { '@type': 'Answer', text: 'No. PMS cannot guarantee returns.' } },
        { '@type': 'Question', name: 'Is PMS the same as AIF?', acceptedAnswer: { '@type': 'Answer', text: 'No. PMS manages client-wise portfolios separately, while AIF is a privately pooled investment vehicle.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PMS Registration in India',
    serviceType: 'SEBI Portfolio Manager Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for SEBI PMS Registration covering discretionary, non-discretionary and advisory PMS structuring, ₹5 Crore net worth readiness, Principal Officer documentation, NISM certification, Form A filing, SEBI query response and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'PMS Registration in India', item: 'https://estabizz-site.vercel.app/sebi/pms-registration-in-india' }
    ]
};

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <PageClient />
        </>
    );
}
