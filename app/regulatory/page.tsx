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
            { name: "Stock Broker License", href: "/sebi/stock-broker-registration-in-india" },
            { name: "Merchant Banker", href: "/sebi/merchant-banker-registration" },
            { name: "Portfolio Manager", href: "/sebi/pms-registration-in-india" },
            { name: "Investment Adviser", href: "/sebi/ria-registration-in-india" },
            { name: "Research Analyst", href: "/sebi/research-analyst-registration-in-india" },
            { name: "AIF Registration", href: "/sebi/aif-registration-in-india" },
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
            { name: "Finance Company GIFT IFSC", href: "/ifsca/finance-company-in-gift-ifsc" },
            { name: "BATF Services", href: "/ifsca/batf-services-registration-in-gift-ifsc" },
            { name: "Aircraft Leasing IFSC", href: "/ifsca/aircraft-leasing-registration-in-ifsc" },
            { name: "FinTech Entity & Incentives", href: "/ifsca/ifsca-fintech-startup-incentives" },
            { name: "ITFS Platform", href: "/ifsca/itfs-registration-in-gift-ifsc" },
            { name: "IFSCA Factoring License", href: "/ifsca/factoring-license" },
            { name: "TechFin Authorization", href: "/ifsca/techfin" },
            { name: "PSP License IFSCA", href: "/ifsca/psp-license-ifsca" },
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
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero — homepage-themed */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-[#374151]">Regulatory Services</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        ⚖️ Regulatory Compliance
                    </div>
                    <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
                        Our Regulatory <span className="text-[#1677f2]">Services</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Comprehensive regulatory solutions across all major frameworks — RBI, SEBI, IFSCA, IRDAI and FEMA.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
                            Book Free Consultation →
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-7 py-3.5 text-[15px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]">
                            Talk to Expert
                        </Link>
                    </div>
                </div>
            </header>

            {/* Categories */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8">
                    <h2 className="text-[26px] font-black tracking-[-0.02em] text-[#120b45]">Explore by Regulator</h2>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                    <p className="mt-3 text-[14px] text-[#64748b]">Select a framework to access the complete suite of registration, licensing and compliance services.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5fbff] text-2xl">{cat.icon}</span>
                                <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#120b45]">{cat.title}</h3>
                            </div>
                            <p className="mb-5 text-[13px] leading-relaxed text-[#64748b]">{cat.description}</p>
                            <div className="mb-6 flex flex-wrap gap-2">
                                {cat.tags.map((tag, i) => (
                                    <span key={i} className="rounded-full bg-[#f5fbff] px-2.5 py-1 text-[10.5px] font-bold text-[#0077B6]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto space-y-1">
                                {cat.services.map((svc, i) => (
                                    <Link
                                        key={i}
                                        href={svc.href}
                                        className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[#f5fbff]"
                                    >
                                        <span className="text-[13.5px] font-medium text-[#475569] group-hover:text-[#1677f2]">{svc.name}</span>
                                        <span className="text-[#94a3b8] transition-transform group-hover:translate-x-1 group-hover:text-[#1677f2]">→</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-6 mb-16 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-6 py-14 text-center sm:px-10">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
                    <h2 className="mb-4 text-[26px] font-black text-white sm:text-[30px]">Need Regulatory Compliance Help?</h2>
                    <p className="mb-8 text-[14.5px] leading-[1.7] text-white/60">Our experts handle end-to-end regulatory compliance — from application to ongoing requirements across all frameworks.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href="/contact" className="rounded-xl bg-[#1677f2] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">Get Started Free →</a>
                        <a href="tel:9825600907" className="rounded-xl border border-white/20 px-8 py-3.5 text-[14px] font-bold text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
