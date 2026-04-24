import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Our Regulatory Services - RBI, SEBI, IFSCA, IRDAI & FEMA Compliance | Estabizz Fintech",
    description: "Comprehensive regulatory solutions across RBI, SEBI, IFSCA, IRDAI and FEMA. NBFC licensing, stock broker registration, finance company setup, insurance licensing and more.",
    keywords: "Regulatory Services, RBI License, SEBI Registration, IFSCA License, IRDAI License, FEMA Compliance, NBFC Registration",
    alternates: { canonical: "/regulatory" }
};

const categories = [
    {
        title: "RBI Regulatory Services",
        icon: "🏛️",
        description: "End-to-end RBI licensing and compliance management — including capital structuring, policy drafting, application filing, and post-approval reporting.",
        tags: ["NBFC", "Payment Aggregator", "PPI", "Account Aggregator"],
        services: [
            { name: "NBFC Registration", href: "/rbi/nbfc-account-aggregator-license" },
            { name: "NBFC Account Aggregator", href: "/rbi/nbfc-account-aggregator-license" },
            { name: "NBFC Business Plan", href: "/rbi/nbfc-business-plan" },
            { name: "NBFC Legal Support", href: "/rbi/nbfc-legal-support" },
            { name: "NBFC Financial Modeling", href: "/rbi/nbfc-financial-modeling" },
            { name: "NBFC Marketing Strategy", href: "/rbi/nbfc-marketing-strategy" },
            { name: "NBFC Takeover", href: "/rbi/nbfc-takeover" },
            { name: "NBFC For Sale", href: "/rbi/nbfc-for-sale" },
            { name: "LendTech Services", href: "/rbi/lendtech-services" },
        ],
    },
    {
        title: "SEBI Regulatory Services",
        icon: "📈",
        description: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, and monitoring.",
        tags: ["Stock Broker", "RIA", "PMS", "AIF", "Research Analyst"],
        services: [
            { name: "Stock Broker License", href: "/sebi/stock-broker-registration" },
            { name: "Merchant Banker", href: "/sebi/merchant-banker-registration" },
            { name: "Portfolio Manager", href: "/sebi/portfolio-manager-registration" },
            { name: "Investment Adviser", href: "/sebi/investment-adviser-registration" },
            { name: "Research Analyst", href: "/sebi/research-analyst-registration" },
            { name: "AIF Registration", href: "/sebi/aif-registration" },
            { name: "Credit Rating Agency", href: "/sebi/credit-rating-agency" },
            { name: "Depository Participant", href: "/sebi/depository-participant-sebi-registration" },
            { name: "Mutual Fund Registration", href: "/sebi/mutual-fund-registration" },
        ],
    },
    {
        title: "IFSCA & GIFT City Services",
        icon: "🌐",
        description: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.",
        tags: ["Finance Company", "Factoring", "PSP License", "BATF", "Aircraft Leasing", "FinTech"],
        services: [
            { name: "Finance Company GIFT IFSC", href: "/ifsca/finance-company" },
            { name: "BATF Services", href: "/ifsca/batf-services" },
            { name: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing" },
            { name: "FinTech Entity & Incentives", href: "/ifsca/fintech-entity" },
            { name: "ITFS Platform", href: "/ifsca/itfs-platform" },
            { name: "IFSCA Factoring License", href: "/ifsca/factoring-license" },
            { name: "TechFin Authorization", href: "/ifsca/techfin" },
            { name: "PSP License IFSCA", href: "/ifsca/psp-license" },
        ],
    },
    {
        title: "IRDAI Regulatory Services",
        icon: "🛡️",
        description: "Complete IRDAI licensing lifecycle support — from feasibility assessment and capital planning to regulatory approval and compliance.",
        tags: ["Insurance Broker", "Corporate Agent", "Web Aggregator", "TPA"],
        services: [
            { name: "Insurance Broker License", href: "/irdai/irda-insurance-broker-license" },
            { name: "IFSCA Insurance Intermediary", href: "/irdai/ifsca-insurance-intermediary" },
        ],
    },
    {
        title: "FEMA & Other Compliance",
        icon: "⚖️",
        description: "Cross-border regulatory compliance including FEMA, transfer pricing, GST and other government licensing requirements.",
        tags: ["FEMA", "Transfer Pricing", "GST", "DGFT"],
        services: [
            { name: "FEMA Compliance", href: "/fema/compliance-under-fema" },
            { name: "FEMA Registration", href: "/fema/fema-registration" },
            { name: "Transfer Pricing", href: "/services/transfer-pricing" },
            { name: "GST Appeal Services", href: "/services/gst-appeal-services" },
            { name: "India Entry Strategy", href: "/services/india-entry-strategy" },
            { name: "Legal Due Diligence", href: "/services/legal-due-diligence" },
        ],
    },
    {
        title: "Enterprise & Specialized Services",
        icon: "🏗️",
        description: "Industry-specific regulatory approvals and ongoing compliance support for specialized financial and corporate operations.",
        tags: ["ESG", "Trademark", "PAP License", "Sustainable Finance"],
        services: [
            { name: "Enterprise Services", href: "/services/enterprise-services" },
            { name: "ESG Consulting", href: "/services/esg-consulting" },
            { name: "Finance & Accounting Outsourcing", href: "/services/finance-accounting-outsourcing" },
            { name: "Trademark Search", href: "/services/trademark-search" },
            { name: "PAP License", href: "/services/pap-license" },
            { name: "Sustainable Finance", href: "/services/sustainable-finance" },
        ],
    },
];

export default function RegulatoryPage() {
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
                            Regulatory Compliance
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our Regulatory Services
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comprehensive regulatory solutions across all major frameworks — RBI, SEBI, IFSCA, IRDAI and FEMA.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{cat.icon}</span>
                                <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-5">{cat.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {cat.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="space-y-2">
                                {cat.services.map((svc, i) => (
                                    <Link
                                        key={i}
                                        href={svc.href}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                        <span className="text-sm text-gray-700 group-hover:text-[#2196F3]">{svc.name}</span>
                                        <span className="text-gray-400 group-hover:text-[#2196F3] text-xs">&rarr;</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#0B1B2B] to-[#1a3a5c] text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Regulatory Compliance Help?</h2>
                    <p className="text-gray-300 mb-8">Our experts handle end-to-end regulatory compliance — from application to ongoing requirements across all frameworks.</p>
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
