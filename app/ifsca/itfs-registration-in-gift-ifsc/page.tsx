import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'IFSCA ITFS Registration – Complete Powerful Guide for International Trade Finance Platform in GIFT IFSC',
    description: 'IFSCA ITFS Registration guide for setting up International Trade Finance Services Platform in GIFT IFSC. Learn eligibility, USD 0.2 million capital, permissible activities, participants, SWIT process, compliance and trade finance opportunities.',
    keywords: 'IFSCA ITFS Registration, International Trade Finance Services Platform, IFSCA ITFS, ITFS Platform in IFSC, ITFS Operator Registration, Trade Finance Platform GIFT IFSC, Supply Chain Finance IFSC, Factoring Platform IFSC, Forfaiting Platform IFSC',
    alternates: { canonical: '/ifsca/itfs-registration-in-gift-ifsc' },
    openGraph: {
        title: 'IFSCA ITFS Registration – Complete Powerful Guide for International Trade Finance Platform in GIFT IFSC',
        description: 'Guide to ITFS Operator Registration, USD 0.2 million owned fund, permissible activities, participants, SWIT process, compliance and GIFT IFSC trade finance platform setup.',
        url: '/ifsca/itfs-registration-in-gift-ifsc',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is IFSCA ITFS Registration?', acceptedAnswer: { '@type': 'Answer', text: 'IFSCA ITFS Registration is the registration required to set up and operate an International Trade Finance Services Platform in GIFT IFSC.' } },
        { '@type': 'Question', name: 'What does ITFS mean?', acceptedAnswer: { '@type': 'Answer', text: 'ITFS means International Trade Finance Services Platform.' } },
        { '@type': 'Question', name: 'Can ITFS operator provide loans directly?', acceptedAnswer: { '@type': 'Answer', text: 'ITFS operator acts as a platform facilitator and should not assume credit risk on transactions carried out on its platform.' } },
        { '@type': 'Question', name: 'What is the minimum capital for ITFS registration?', acceptedAnswer: { '@type': 'Answer', text: 'The ITFS operator must maintain minimum owned fund of USD 0.2 million at all times.' } },
        { '@type': 'Question', name: 'Does ITFS registration allow clearing and settlement of funds?', acceptedAnswer: { '@type': 'Answer', text: 'No automatic permission should be assumed. If the ITFS operator intends to provide clearing or settlement of funds, it must seek authorisation as a payment system operator under IFSCA Payment and Settlement Systems Regulations, 2024.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IFSCA ITFS Registration',
    serviceType: 'GIFT IFSC International Trade Finance Services Platform Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for setting up International Trade Finance Services Platform in GIFT IFSC, including ITFS operator structuring, USD 0.2 million capital readiness, fintech platform documentation, AML / KYC framework, SWIT application and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'IFSCA Services', item: 'https://estabizz-site.vercel.app/ifsca' },
        { '@type': 'ListItem', position: 3, name: 'IFSCA ITFS Registration', item: 'https://estabizz-site.vercel.app/ifsca/itfs-registration-in-gift-ifsc' }
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
