import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'Finance Company in GIFT IFSC – Complete Powerful Guide to Registration, Capital Requirements & Compliance',
    description: 'Finance Company in GIFT IFSC registration guide covering eligibility, capital requirement, documents, registration process, regulatory framework, fees and post-approval compliance under IFSCA regulations.',
    keywords: 'Finance Company in GIFT IFSC, IFSCA Finance Company Registration, Finance Company Registration in IFSC, Finance Unit in IFSC, GIFT IFSC Finance Company, GRCTC, IFSCA Factoring License',
    alternates: { canonical: '/ifsca/finance-company-in-gift-ifsc' },
    openGraph: {
        title: 'Finance Company in GIFT IFSC – Complete Powerful Guide to Registration, Capital Requirements & Compliance',
        description: 'Finance Company in GIFT IFSC guide covering Finance Company vs Finance Unit, core and non-core activities, owned fund, GRCTC, factoring, SWIT process and compliance.',
        url: '/ifsca/finance-company-in-gift-ifsc',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is a Finance Company in GIFT IFSC?', acceptedAnswer: { '@type': 'Answer', text: 'A Finance Company in GIFT IFSC is an entity registered with IFSCA to undertake permitted financial activities such as lending, investments, treasury management, derivatives, liquidity management and financial advisory within the IFSC ecosystem.' } },
        { '@type': 'Question', name: 'What is the difference between Finance Company and Finance Unit?', acceptedAnswer: { '@type': 'Answer', text: 'A Finance Company is a separately incorporated entity in IFSC, while a Finance Unit is a branch of an incorporated entity permitted to undertake specified activities in IFSC.' } },
        { '@type': 'Question', name: 'Can a Finance Company accept public deposits?', acceptedAnswer: { '@type': 'Answer', text: 'No. Finance Company and Finance Unit cannot accept public deposits from residents or non-residents.' } },
        { '@type': 'Question', name: 'What is the minimum owned fund for core activities?', acceptedAnswer: { '@type': 'Answer', text: 'For core activities, except GRCTC, the minimum owned fund is generally higher of USD 3 million, activity-specific capital requirement or any higher amount specified by IFSCA.' } },
        { '@type': 'Question', name: 'What is the owned fund requirement for GRCTC?', acceptedAnswer: { '@type': 'Answer', text: 'A Finance Company or Finance Unit undertaking GRCTC activity must maintain minimum owned fund of USD 0.2 million at all times.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Finance Company in GIFT IFSC',
    serviceType: 'GIFT IFSC Finance Company and Finance Unit Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for setting up Finance Company or Finance Unit in GIFT IFSC, including core and non-core activity structuring, GRCTC advisory, factoring registration, owned fund readiness, SWIT application, business plan, policy documentation and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'IFSCA Services', item: 'https://estabizz-site.vercel.app/ifsca' },
        { '@type': 'ListItem', position: 3, name: 'Finance Company in GIFT IFSC', item: 'https://estabizz-site.vercel.app/ifsca/finance-company-in-gift-ifsc' }
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
