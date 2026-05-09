import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'Social Stock Exchange License in India – Complete Powerful Guide for NGOs & Social Enterprises',
    description: 'Social Stock Exchange License in India explained with SEBI eligibility, NPO and FPE criteria, ZCZP instruments, documents, process, timeline, compliance, impact reporting and fundraising benefits.',
    keywords: 'Social Stock Exchange License in India, SEBI Social Stock Exchange, SSE Registration India, ZCZP Instruments, Zero Coupon Zero Principal, NPO SSE Registration, Social Enterprise Listing',
    alternates: { canonical: '/sebi/social-stock-exchange-license-india' },
    openGraph: {
        title: 'Social Stock Exchange License in India – Complete SEBI Guide',
        description: 'SEBI Social Stock Exchange guide covering NPO and FPE eligibility, ZCZP, impact reporting, exchange filing and post-listing compliance.',
        url: '/sebi/social-stock-exchange-license-india',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is Social Stock Exchange License in India?', acceptedAnswer: { '@type': 'Answer', text: 'It refers to the SEBI-regulated eligibility and listing framework that allows eligible NPOs and For-Profit Social Enterprises to raise funds through the Social Stock Exchange segment of recognised stock exchanges.' } },
        { '@type': 'Question', name: 'Is Social Stock Exchange a separate exchange?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a separate segment within recognised stock exchanges such as NSE and BSE.' } },
        { '@type': 'Question', name: 'What is ZCZP?', acceptedAnswer: { '@type': 'Answer', text: 'Zero Coupon Zero Principal is a fundraising instrument issued by eligible NPOs where contributors do not receive interest or principal repayment.' } },
        { '@type': 'Question', name: 'Does listing guarantee fundraising?', acceptedAnswer: { '@type': 'Answer', text: 'No. Listing improves visibility and credibility, but actual fundraising depends on investor or donor interest.' } },
        { '@type': 'Question', name: 'Is impact reporting mandatory?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Social impact reporting is central to the SSE framework.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Social Stock Exchange License in India',
    serviceType: 'SEBI Social Stock Exchange Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for Social Stock Exchange registration covering NPO and FPE eligibility, social intent mapping, ZCZP documentation, impact reporting, NSE / BSE SSE application support and post-listing compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'SEBI Services', item: 'https://estabizz-site.vercel.app/sebi' },
        { '@type': 'ListItem', position: 3, name: 'Social Stock Exchange License in India', item: 'https://estabizz-site.vercel.app/sebi/social-stock-exchange-license-india' }
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
