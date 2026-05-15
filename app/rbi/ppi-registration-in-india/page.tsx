import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "PPI Registration in India – Complete RBI Prepaid Payment Instrument Authorisation Guide",
    description: "PPI Registration in India explained under RBI Master Directions on Prepaid Payment Instruments. Learn eligibility, net worth, types of PPIs, KYC, escrow, cyber security, application process and compliance.",
    keywords: "PPI Registration in India, Prepaid Payment Instrument, RBI Master Directions PPI, Digital Wallet License, Prepaid Card Authorisation, PSS Act 2007, Form A, System Audit Report",
    alternates: { canonical: "/rbi/ppi-registration-in-india" },
    openGraph: {
        title: "PPI Registration in India – Complete RBI Prepaid Payment Instrument Authorisation Guide",
        description: "PPI Registration in India explained with PPI types, KYC, escrow, cyber security, application process and compliance obligations.",
        url: "/rbi/ppi-registration-in-india",
        type: "article"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is PPI Registration in India?", acceptedAnswer: { "@type": "Answer", text: "PPI Registration in India refers to RBI authorisation for entities that issue and operate Prepaid Payment Instruments such as wallets, cards, gift instruments and stored value payment products." } },
        { "@type": "Question", name: "Who regulates PPI Registration in India?", acceptedAnswer: { "@type": "Answer", text: "The Reserve Bank of India regulates Prepaid Payment Instruments under the Payment and Settlement Systems Act, 2007 and RBI Master Directions on PPIs." } },
        { "@type": "Question", name: "What are the types of PPIs?", acceptedAnswer: { "@type": "Answer", text: "PPIs are broadly classified as closed system PPIs, semi-closed system PPIs and open system PPIs." } },
        { "@type": "Question", name: "Can non-bank PPI issuers issue open system PPIs?", acceptedAnswer: { "@type": "Answer", text: "No. Open system PPIs are issued only by banks." } },
        { "@type": "Question", name: "Is interest payable on PPI balances?", acceptedAnswer: { "@type": "Answer", text: "No. PPI issuers cannot pay interest on PPI balances." } }
    ]
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PPI Registration in India",
    serviceType: "RBI Prepaid Payment Instrument Authorisation Advisory",
    provider: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
        url: "https://estabizz-site.vercel.app/"
    },
    areaServed: "India",
    description: "Professional support for RBI PPI authorisation covering wallets, prepaid cards, gift instruments, semi-closed PPIs, KYC/AML, customer fund protection, technology documentation, business plan and post-authorisation compliance."
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "RBI Services", item: "https://estabizz-site.vercel.app/rbi" },
        { "@type": "ListItem", position: 3, name: "PPI Registration in India", item: "https://estabizz-site.vercel.app/rbi/ppi-registration-in-india" }
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
