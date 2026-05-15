import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "Payment Aggregator License in India – Complete Authoritative RBI 2025 Compliance Guide",
    description: "Payment Aggregator License in India explained as per RBI Master Direction 2025. Detailed eligibility, Rs.15 crore capital requirement, escrow rules, PA-O, PA-P, PA-CB framework, compliance and approval process.",
    keywords: "Payment Aggregator License in India, PA-O, PA-P, PA-CB, RBI Master Direction 2025, PSS Act 2007, Escrow Account, FIU-IND, CERT-In Audit, PCI-DSS",
    alternates: { canonical: "/rbi/payment-aggregator-license-in-india" },
    openGraph: {
        title: "Payment Aggregator License in India – Complete Authoritative RBI 2025 Compliance Guide",
        description: "Payment Aggregator License in India explained with Rs.15 crore net worth, PA-O, PA-P, PA-CB, escrow, cyber compliance and RBI approval process.",
        url: "/rbi/payment-aggregator-license-in-india",
        type: "article"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is Payment Aggregator License in India?", acceptedAnswer: { "@type": "Answer", text: "Payment Aggregator License in India is RBI authorisation required for entities that aggregate customer payments and settle funds to merchants." } },
        { "@type": "Question", name: "Is Payment Aggregator License mandatory?", acceptedAnswer: { "@type": "Answer", text: "Yes. If a non-bank entity handles merchant funds before settlement, it must obtain Payment Aggregator authorisation from RBI." } },
        { "@type": "Question", name: "What is the minimum capital requirement?", acceptedAnswer: { "@type": "Answer", text: "The applicant must have minimum net worth of Rs.15 crore at application stage and Rs.25 crore by the end of the third financial year from authorisation." } },
        { "@type": "Question", name: "Is escrow mandatory?", acceptedAnswer: { "@type": "Answer", text: "Yes. Non-bank Payment Aggregators must maintain escrow accounts with Scheduled Commercial Banks." } },
        { "@type": "Question", name: "Must a non-bank PA register with FIU-IND?", acceptedAnswer: { "@type": "Answer", text: "Yes. Non-bank PAs must register with FIU-IND and comply with AML/CFT reporting requirements." } }
    ]
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Payment Aggregator License in India",
    serviceType: "RBI Payment Aggregator Authorisation Advisory",
    provider: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
        url: "https://estabizz-site.vercel.app/"
    },
    areaServed: "India",
    description: "Professional support for RBI Payment Aggregator authorisation covering PA-O, PA-P and PA-CB models, Rs.15 crore net worth readiness, escrow framework, cyber compliance, merchant KYC, business plan and post-authorisation reporting."
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "RBI Services", item: "https://estabizz-site.vercel.app/rbi" },
        { "@type": "ListItem", position: 3, name: "Payment Aggregator License in India", item: "https://estabizz-site.vercel.app/rbi/payment-aggregator-license-in-india" }
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
