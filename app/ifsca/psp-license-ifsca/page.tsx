import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'PSP License – IFSCA: Complete Authorisation Guide with Critical Compliance Insights',
    description: 'PSP License – IFSCA explained in detail. Understand eligibility, capital requirements, safeguarding norms, authorisation process, fees, compliance, and regulatory obligations under IFSCA Payment Services Regulations, 2024.',
    keywords: 'PSP License – IFSCA, Payment Service Provider IFSCA, IFSCA Payment Services Regulations 2024, PSP Authorisation in IFSC, IFSCA PSP Registration, PSP License GIFT City, E-Money Issuance IFSC, Merchant Acquisition Service IFSC',
    alternates: { canonical: '/ifsca/psp-license-ifsca' },
    openGraph: {
        title: 'PSP License – IFSCA: Complete Authorisation Guide with Critical Compliance Insights',
        description: 'Payment Service Provider Authorisation in GIFT IFSC covering eligibility, capital, safeguarding, AML/KYC, escrow, compliance and regulatory restrictions.',
        url: '/ifsca/psp-license-ifsca',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is PSP License – IFSCA?', acceptedAnswer: { '@type': 'Answer', text: 'PSP License – IFSCA is the authorisation granted by IFSCA to a company incorporated in IFSC for providing specified payment services under the IFSCA Payment Services Regulations, 2024.' } },
        { '@type': 'Question', name: 'What payment services are covered under PSP License – IFSCA?', acceptedAnswer: { '@type': 'Answer', text: 'Covered services include account issuance, e-money issuance, escrow services, cross-border money transfer services and merchant acquisition services.' } },
        { '@type': 'Question', name: 'What is the difference between PSP and PSO?', acceptedAnswer: { '@type': 'Answer', text: 'PSP offers front-end payment services such as wallets, remittance or merchant services, while PSO operates payment systems such as clearing and settlement infrastructure under a separate framework.' } },
        { '@type': 'Question', name: 'Can PSP wallet hold INR?', acceptedAnswer: { '@type': 'Answer', text: 'No. E-wallets issued by PSP cannot hold Indian Rupees.' } },
        { '@type': 'Question', name: 'Can PSP lend money?', acceptedAnswer: { '@type': 'Answer', text: 'No. PSP cannot lend money or extend credit to wallet users.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PSP License – IFSCA',
    serviceType: 'GIFT IFSC Payment Service Provider Authorisation Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for Payment Service Provider authorisation in GIFT IFSC, including e-money issuance, escrow service, cross-border money transfer, merchant acquisition, safeguarding framework, capital readiness, AML/KYC documentation and post-authorisation compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'IFSCA Services', item: 'https://estabizz-site.vercel.app/ifsca' },
        { '@type': 'ListItem', position: 3, name: 'PSP License – IFSCA', item: 'https://estabizz-site.vercel.app/ifsca/psp-license-ifsca' }
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
