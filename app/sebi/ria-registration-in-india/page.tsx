import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'RIA Registration in India – Complete & Authoritative SEBI Compliance Guide for Serious Investment Advisers',
    description: 'RIA Registration in India explained under SEBI Investment Advisers Regulations. Learn eligibility, qualification, NISM certification, ₹5 lakh / ₹50 lakh net worth, Form A, documents, fees, client agreement, fee model, compliance audit and penalties.',
    keywords: 'RIA Registration in India, SEBI RIA Registration, Investment Adviser Registration, Registered Investment Adviser, SEBI Investment Adviser License, Financial Planner SEBI Registration, Investment Advisory License, Paid Investment Advice SEBI Registration',
    alternates: { canonical: '/sebi/ria-registration-in-india' },
    openGraph: {
        title: 'RIA Registration in India – Complete & Authoritative SEBI Compliance Guide',
        description: 'SEBI Investment Adviser registration guide covering eligibility, NISM certification, net worth, Form A, fees, risk profiling, suitability and compliance.',
        url: '/sebi/ria-registration-in-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is RIA Registration in India?', acceptedAnswer: { '@type': 'Answer', text: 'RIA Registration in India is SEBI registration required for individuals or entities that provide investment advice relating to securities or investment products for consideration.' } },
        { '@type': 'Question', name: 'Is RIA Registration mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Any person providing investment advice for consideration must obtain SEBI registration unless specifically exempted.' } },
        { '@type': 'Question', name: 'Can an individual apply for RIA Registration?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Individuals can apply if they meet qualification, certification, net worth and fit and proper requirements.' } },
        { '@type': 'Question', name: 'Can RIA manage client funds?', acceptedAnswer: { '@type': 'Answer', text: 'No. Managing client funds requires PMS registration where applicable.' } },
        { '@type': 'Question', name: 'Can RIA guarantee returns?', acceptedAnswer: { '@type': 'Answer', text: 'No. Guaranteeing returns is prohibited.' } },
        { '@type': 'Question', name: 'Is annual compliance audit mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Annual compliance audit is mandatory for registered investment advisers.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RIA Registration in India',
    serviceType: 'SEBI Investment Adviser Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for SEBI Investment Adviser / RIA Registration covering individual, company, LLP and advisory entity applications, NISM certification mapping, net worth documentation, Form A filing, advisory agreement, risk profiling and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'RIA Registration in India', item: 'https://estabizz-site.vercel.app/sebi/ria-registration-in-india' }
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
