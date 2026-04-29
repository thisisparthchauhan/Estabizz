import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
    title: "ARC Registration in India – Complete & Authoritative RBI Compliance Framework 2025",
    description: "ARC Registration in India explained under RBI Master Direction 2024. Detailed guide covering ₹300 crore NOF, capital adequacy, governance norms, securitisation rules, registration process, compliance and penalties.",
    keywords: "ARC Registration in India, Asset Reconstruction Company, SARFAESI Act 2002, RBI Master Direction 2024, Net Owned Fund 300 crore, Security Receipts, Securitisation",
    alternates: { canonical: "/rbi/arc-registration-in-india" },
    openGraph: {
        title: "ARC Registration in India – Complete & Authoritative RBI Compliance Framework 2025",
        description: "ARC Registration in India explained under RBI Master Direction 2024 with ₹300 crore NOF, governance, Security Receipts, compliance and penalties.",
        url: "/rbi/arc-registration-in-india",
        type: "article"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is ARC Registration in India?", acceptedAnswer: { "@type": "Answer", text: "ARC Registration in India is the regulatory approval granted by the Reserve Bank of India under the SARFAESI Act, 2002 to a company intending to carry on the business of securitisation and asset reconstruction." } },
        { "@type": "Question", name: "Who regulates Asset Reconstruction Companies in India?", acceptedAnswer: { "@type": "Answer", text: "Asset Reconstruction Companies are regulated by the Reserve Bank of India under the SARFAESI Act and the applicable RBI Master Direction for ARCs." } },
        { "@type": "Question", name: "Is ARC Registration mandatory before acquiring NPAs from banks?", acceptedAnswer: { "@type": "Answer", text: "Yes. No company can commence the business of securitisation or asset reconstruction without obtaining a Certificate of Registration from RBI." } },
        { "@type": "Question", name: "What is the minimum Net Owned Fund for ARC Registration?", acceptedAnswer: { "@type": "Answer", text: "The minimum Net Owned Fund required for ARC Registration is ₹300 crore on an ongoing basis." } },
        { "@type": "Question", name: "Can an ARC accept public deposits?", acceptedAnswer: { "@type": "Answer", text: "No. ARCs are prohibited from accepting public deposits." } }
    ]
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ARC Registration in India",
    serviceType: "RBI Asset Reconstruction Company Registration Advisory",
    provider: {
        "@type": "Organization",
        name: "Estabizz Fintech Private Limited",
        url: "https://estabizz-site.vercel.app/"
    },
    areaServed: "India",
    description: "Professional advisory support for Asset Reconstruction Company registration under RBI and SARFAESI framework, including ₹300 crore NOF readiness, business plan, governance documentation and post-registration compliance."
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "RBI Services", item: "https://estabizz-site.vercel.app/rbi" },
        { "@type": "ListItem", position: 3, name: "ARC Registration in India", item: "https://estabizz-site.vercel.app/rbi/arc-registration-in-india" }
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
