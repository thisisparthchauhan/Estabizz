import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'Stock Broker Registration in India – Complete & Powerful SEBI Regulatory Guide for Serious Market Entrants',
    description: 'Stock Broker Registration in India explained in detail. Learn SEBI and exchange approval process, eligibility, net worth, capital, infrastructure, documents, fees, compliance, client fund segregation, margin rules, inspection and penalties.',
    keywords: 'Stock Broker Registration in India, SEBI Stock Broker Registration, Stock Broker License, Trading Member Registration, NSE Broker Registration, BSE Broker Registration, Stock Broker Membership, Trading and Clearing Member, Self-Clearing Member',
    alternates: { canonical: '/sebi/stock-broker-registration-in-india' },
    openGraph: {
        title: 'Stock Broker Registration in India – Complete SEBI and Exchange Compliance Guide',
        description: 'SEBI stock broker registration guide covering exchange membership, capital, net worth, trading and clearing structures, margin framework and compliance.',
        url: '/sebi/stock-broker-registration-in-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is Stock Broker Registration in India?', acceptedAnswer: { '@type': 'Answer', text: 'Stock Broker Registration in India is the formal approval granted under SEBI and exchange framework to an eligible entity that wishes to execute trades in securities on behalf of clients on recognised stock exchanges.' } },
        { '@type': 'Question', name: 'Is exchange membership mandatory before SEBI registration?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Exchange membership is a prerequisite before SEBI registration is granted.' } },
        { '@type': 'Question', name: 'Is SEBI registration enough to start operations?', acceptedAnswer: { '@type': 'Answer', text: 'No. Exchange membership, segment approval, clearing arrangement, infrastructure readiness and compliance setup are also required.' } },
        { '@type': 'Question', name: 'Are client funds required to be segregated?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Client funds must be kept separate from proprietary funds.' } },
        { '@type': 'Question', name: 'Can brokers offer algorithmic trading?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, subject to exchange approval, testing, risk controls and audit logs.' } },
        { '@type': 'Question', name: 'Can brokers guarantee returns?', acceptedAnswer: { '@type': 'Answer', text: 'No. Brokers cannot guarantee returns.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stock Broker Registration in India',
    serviceType: 'SEBI Stock Broker and Exchange Membership Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for SEBI Stock Broker Registration covering NSE / BSE membership planning, trading and clearing structure, net worth and capital readiness, infrastructure inspection, margin policy, client fund segregation, exchange documentation, SEBI registration and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'Stock Broker Registration in India', item: 'https://estabizz-site.vercel.app/sebi/stock-broker-registration-in-india' }
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
