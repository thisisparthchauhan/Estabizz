import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "RBI Services – NBFC Registration, Account Aggregator & Compliance | Estabizz Fintech",
    description: "Complete RBI regulatory services for NBFCs and fintech companies. NBFC registration, Account Aggregator license, financial modeling, NBFC takeover, and ongoing RBI compliance.",
    keywords: "RBI services India, NBFC registration RBI, RBI fintech compliance, NBFC license India, RBI regulatory services",
    alternates: {
        canonical: "/rbi",
    },
};

const rbiServices = [
    {
        title: "NBFC Account Aggregator License",
        description: "Complete guide to obtaining NBFC-AA license from RBI. Covers consent architecture, technology requirements, eligibility, and the full registration process.",
        href: "/rbi/nbfc-aa-license-guide",
        icon: "🔗",
        tags: ["NBFC-AA", "Data Privacy", "RBI"],
        highlight: true,
    },
    {
        title: "NBFC Financial Modeling",
        description: "Professional NBFC financial models for RBI registration and investor fundraising. 5-year projections with CRAR, NPA, and stress-testing analysis.",
        href: "/rbi/nbfc-financial-modeling",
        icon: "📊",
        tags: ["Financial Model", "Projections", "CRAR"],
        highlight: true,
    },
    {
        title: "NBFC Business Plan",
        description: "Comprehensive NBFC business plan preparation for RBI Certificate of Registration. Investor-ready documents with strategic framework and financial projections.",
        href: "/services/nbfc-business-plan",
        icon: "📋",
        tags: ["Business Plan", "RBI CoR", "Strategy"],
        highlight: false,
    },
    {
        title: "Full-Fledged Money Changers (FFMC)",
        description: "Obtain authorization from RBI as a Full-Fledged Money Changer (FFMC) for foreign exchange dealing. Complete eligibility, process, and compliance guidance.",
        href: "/contact",
        icon: "💱",
        tags: ["FFMC", "Forex", "RBI Authorization"],
        highlight: false,
    },
    {
        title: "LendTech Services",
        description: "Regulatory and compliance advisory for LendTech companies and digital lending platforms operating under RBI's digital lending guidelines.",
        href: "/contact",
        icon: "💻",
        tags: ["Digital Lending", "LendTech", "RBI Guidelines"],
        highlight: false,
    },
    {
        title: "NBFC For Sale",
        description: "Facilitate the purchase of existing licensed NBFCs. Due diligence, valuation, regulatory approvals, and structuring for NBFC acquisition transactions.",
        href: "/contact",
        icon: "🏢",
        tags: ["M&A", "Acquisition", "Due Diligence"],
        highlight: false,
    },
    {
        title: "NBFC Legal Support",
        description: "Ongoing legal support for NBFCs including board governance, regulatory filings, RBI correspondence, and legal documentation for compliance.",
        href: "/contact",
        icon: "⚖️",
        tags: ["Legal", "Governance", "Compliance"],
        highlight: false,
    },
    {
        title: "NBFC Takeover",
        description: "End-to-end advisory for NBFC takeover transactions including RBI prior approval process, change of management, and post-takeover compliance.",
        href: "/contact",
        icon: "🔄",
        tags: ["Takeover", "RBI Approval", "Change of Control"],
        highlight: false,
    },
    {
        title: "NBFC Marketing Strategy",
        description: "Strategic marketing and growth advisory for NBFCs including digital marketing, co-lending partnerships, and customer acquisition frameworks.",
        href: "/contact",
        icon: "📣",
        tags: ["Marketing", "Growth", "Strategy"],
        highlight: false,
    },
    {
        title: "RBI Regulatory Services",
        description: "Comprehensive RBI regulatory compliance services including annual filings, RBI inspections, prudential compliance monitoring, and advisory.",
        href: "/contact",
        icon: "🏛️",
        tags: ["RBI", "Compliance", "Regulatory"],
        highlight: false,
    },
];

export default function RBIPage() {
    return (
        <div className="bg-[#f8faff] min-h-screen">
            {/* Hero */}
            <section
                className="relative pt-24 pb-14 px-6 lg:px-8 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">RBI Services</span>
                    </nav>
                    <div className="flex flex-wrap gap-3 mb-5">
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🏦 Reserve Bank of India</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">📋 NBFC Licensing</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">✅ Expert Compliance</span>
                    </div>
                    <h1 className="text-[38px] font-black text-[#0a1628] leading-[1.2] mb-4 tracking-[-0.02em] max-w-3xl">
                        RBI Regulatory Services
                    </h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl leading-relaxed">
                        Comprehensive regulatory services for NBFCs, fintech companies, and financial institutions operating under the Reserve Bank of India framework. From registration to ongoing compliance.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rbiServices.map((service) => (
                        <Link key={service.title} href={service.href} className="group block h-full">
                            <div className={`bg-white rounded-2xl border ${service.highlight ? "border-[#0096D6]/30 shadow-md" : "border-gray-100 shadow-sm"} p-6 h-full hover:shadow-xl hover:border-[#0096D6]/40 transition-all duration-300 relative overflow-hidden`}>
                                {service.highlight && (
                                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981]" />
                                )}
                                <div className="text-3xl mb-4">{service.icon}</div>
                                <h2 className="text-[17px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-3 leading-tight">
                                    {service.title}
                                </h2>
                                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-0.5 bg-blue-50 text-[#0077B6] rounded-full text-[11px] font-semibold">{tag}</span>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center text-[#0096D6] text-sm font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Need Expert RBI Compliance Guidance?</h2>
                    <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                        Our regulatory specialists have guided dozens of NBFCs through RBI registration, supervisory inspections, and ongoing compliance. Get a free consultation today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all">
                            Book Free Consultation
                        </Link>
                        <a href="mailto:contact@estabizzlegal.com" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20">
                            Email Our Experts
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
