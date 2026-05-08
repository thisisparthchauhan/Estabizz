import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "IFSCA Services - Finance Company, Aircraft Leasing, PSP License, FinTech, ITFS, BATF & More | Estabizz Fintech",
    description: "Complete IFSCA regulatory services — Finance Company registration, Aircraft Leasing, PSP License, FinTech Entity, ITFS Platform, BATF Services, GRCTC, Factoring and compliance guidance at GIFT IFSC.",
    keywords: "IFSCA, Finance Company, Aircraft Leasing, PSP License, FinTech Entity, ITFS Platform, BATF Services, GRCTC, GIFT IFSC, IFSCA Registration",
    alternates: { canonical: "/ifsca" }
};

const services = [
    {
        title: "IFSCA Aircraft Leasing Registration",
        description: "Professional support for setting up an aircraft leasing entity in GIFT IFSC, including operating lease, financial lease, hybrid lease, USD 200,000 / USD 3 million capital readiness, SWITS application, business plan, documentation and post-registration compliance.",
        href: "/ifsca/aircraft-leasing-registration-in-ifsc",
        icon: "✈️",
        tags: ["Operating Lease", "Financial Lease", "GIFT IFSC"],
    },
    {
        title: "Finance Company in GIFT IFSC",
        description: "Professional support for setting up Finance Company or Finance Unit in GIFT IFSC, including core and non-core activity structuring, GRCTC advisory, factoring registration, owned fund readiness, SWIT application, business plan, policy documentation and post-registration compliance.",
        href: "/ifsca/finance-company-in-gift-ifsc",
        icon: "🏦",
        tags: ["Finance Company", "GRCTC", "Factoring", "GIFT IFSC"],
    },
    {
        title: "IFSCA BATF Services Registration",
        description: "Professional support for setting up Book-keeping, Accounting, Taxation and Financial Crime Compliance Services in GIFT IFSC, including Company/LLP structuring, FATF jurisdiction review, safeguarding conditions, PO/CO documentation, application filing and post-registration compliance.",
        href: "/ifsca/batf-services-registration-in-gift-ifsc",
        icon: "📊",
        tags: ["Book-keeping", "Accounting", "Taxation", "GIFT IFSC"],
    },
    {
        title: "IFSCA FinTech and Startup Incentives",
        description: "Professional support for IFSCA FinTech Entity Authorization, Limited Use Authorization, sandbox application, TechFin activity mapping, startup grants, PoC Grant, Green FinTech Grant, Accelerator Grant and GIFT IFSC setup.",
        href: "/ifsca/ifsca-fintech-startup-incentives",
        icon: "🚀",
        tags: ["FinTech", "Sandbox", "Startup Grants", "GIFT IFSC"],
    },
    {
        title: "TechFin Authorization",
        description: "TechFin entity authorization under IFSCA FE Framework 2022 — AI/ML, Blockchain, RegTech, AgriTech, Cyber Security and advanced technology solutions for financial institutions in GIFT IFSC.",
        href: "/ifsca/techfin",
        icon: "💻",
        tags: ["TechFin", "RegTech", "AI/ML", "Blockchain", "GIFT IFSC"],
    },
    {
        title: "PSP License",
        description: "Payment Service Provider authorisation under IFSCA (Payment Services) Regulations 2024 — wallets, cross-border remittance, escrow, merchant acquisition in GIFT IFSC.",
        href: "/ifsca/psp-license",
        icon: "💳",
        tags: ["Payment Services", "E-Money", "Cross-Border", "GIFT IFSC"],
    },
    {
        title: "IFSCA ITFS Registration",
        description: "Professional support for setting up International Trade Finance Services Platform in GIFT IFSC, including ITFS operator structuring, USD 0.2 million capital readiness, fintech platform documentation, AML / KYC framework, SWIT application and post-registration compliance.",
        href: "/ifsca/itfs-registration-in-gift-ifsc",
        icon: "🌐",
        tags: ["ITFS", "Trade Finance", "Factoring", "GIFT IFSC"],
    },
    {
        title: "IFSCA Insurance Intermediary",
        description: "Registration and compliance guide for insurance intermediary operations in GIFT IFSC under IFSCA regulations.",
        href: "/irdai/ifsca-insurance-intermediary",
        icon: "🛡️",
        tags: ["Insurance", "Intermediary", "IFSCA"],
    },
    {
        title: "IFSCA Factoring License",
        description: "IFSCA Factoring License in GIFT City — registration as Factor, eligibility, conduct of business, TReDS filing and compliance under IFSCA Regulations 2024.",
        href: "/regulatory/ifsca-factoring-license-gift-city",
        icon: "📊",
        tags: ["Factoring", "Finance Company", "Trade Finance"],
    },
];

export default function IFSCAPage() {
    return (
        <>
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16">
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-[#0B1B2B] to-[#1a3a5c] text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <a href="/" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
                        ← Back to Home
                    </a>
                    <div className="text-center">
                        <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
                            🌐 IFSCA Services
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            IFSCA Services at GIFT IFSC
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comprehensive regulatory compliance services for Aircraft Leasing, Finance Company registration, and other financial services in India&apos;s International Financial Services Centre.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Our IFSCA Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <a
                            key={idx}
                            href={service.href}
                            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#2196F3] transition-colors mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#0B1B2B] to-[#1a3a5c] text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Help with IFSCA Registration?</h2>
                    <p className="text-gray-300 mb-8">Our experts handle end-to-end IFSCA compliance — from application to ongoing regulatory requirements.</p>
                    <a
                        href="/contact"
                        className="inline-block bg-[#2196F3] hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Book Free Consultation
                    </a>
                </div>
            </section>
        </main>
        </>
    );
}
