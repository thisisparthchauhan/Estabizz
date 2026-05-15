import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: 'IFSCA BATF Services Registration – Complete GIFT IFSC Setup Guide for Bookkeeping, Accounting, Taxation and FCC Services',
    description: 'IFSCA BATF Services Registration explained under BATF Regulations 2024. Learn eligibility, Company/LLP structure, FATF condition, PO/CO requirements, office space, fees, process, compliance and GIFT IFSC benefits.',
    keywords: 'IFSCA BATF Services Registration, BATF Registration, Book-keeping Accounting Taxation Financial Crime Compliance, IFSCA BATF, GIFT IFSC BATF, BATF Services Registration',
    alternates: { canonical: '/ifsca/batf-services-registration-in-gift-ifsc' },
    openGraph: {
        title: 'IFSCA BATF Services Registration – Complete GIFT IFSC Setup Guide',
        description: 'IFSCA BATF Services Registration in GIFT IFSC covering Company/LLP structure, non-resident service recipients, FATF conditions, PO/CO requirements, safeguarding, fees and compliance.',
        url: '/ifsca/batf-services-registration-in-gift-ifsc',
        type: 'article'
    }
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        { '@type': 'Question', name: 'What is IFSCA BATF Services Registration?', acceptedAnswer: { '@type': 'Answer', text: 'IFSCA BATF Services Registration is the certificate of registration granted by IFSCA to an eligible entity in IFSC for providing Book-keeping, Accounting, Taxation and Financial Crime Compliance Services.' } },
        { '@type': 'Question', name: 'What does BATF stand for?', acceptedAnswer: { '@type': 'Answer', text: 'BATF stands for Book-keeping, Accounting, Taxation and Financial Crime Compliance Services.' } },
        { '@type': 'Question', name: 'What legal structure is permitted for BATF registration?', acceptedAnswer: { '@type': 'Answer', text: 'The applicant must be set up in IFSC as a Company or Limited Liability Partnership.' } },
        { '@type': 'Question', name: 'Who can receive BATF Services?', acceptedAnswer: { '@type': 'Answer', text: 'The service recipient must be a non-resident and should not be from a FATF high-risk jurisdiction.' } },
        { '@type': 'Question', name: 'What is the minimum office space requirement?', acceptedAnswer: { '@type': 'Answer', text: 'The BATF Service Provider must ensure office space in IFSC of minimum carpet area computed at 60 sq. ft. per employee.' } }
    ]
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IFSCA BATF Services Registration',
    serviceType: 'GIFT IFSC BATF Service Provider Registration Advisory',
    provider: {
        '@type': 'Organization',
        name: 'Estabizz Fintech Private Limited',
        url: 'https://estabizz-site.vercel.app/'
    },
    areaServed: 'India',
    description: 'Professional support for setting up Book-keeping, Accounting, Taxation and Financial Crime Compliance Services in GIFT IFSC, including Company/LLP structuring, FATF jurisdiction review, safeguarding conditions, PO/CO documentation, application filing and post-registration compliance.'
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://estabizz-site.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'IFSCA Services', item: 'https://estabizz-site.vercel.app/ifsca' },
        { '@type': 'ListItem', position: 3, name: 'IFSCA BATF Services Registration', item: 'https://estabizz-site.vercel.app/ifsca/batf-services-registration-in-gift-ifsc' }
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
