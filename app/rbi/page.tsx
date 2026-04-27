import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "RBI Services – NBFC Registration, Account Aggregator & Compliance | Estabizz Fintech",
    description: "Complete RBI regulatory services in India – NBFC registration, Account Aggregator license, LendTech compliance, NBFC business plans and more. Expert guidance by Estabizz Fintech.",
    keywords: "RBI Services India, NBFC Registration, Account Aggregator License",
    alternates: { canonical: "/rbi" }
};

const services = [
    { href: "/rbi/nbfc-account-aggregator-license", title: "NBFC Account Aggregator License", desc: "Complete RBI registration guide for NBFC-AA with eligibility, process & compliance.", tag: "RBI", emoji: "🔗" },
    { href: "/rbi/nbfc-business-plan", title: "NBFC Business Plan", desc: "Professional NBFC business plan preparation for RBI approval with financial projections.", tag: "RBI", emoji: "📊" },
    { href: "/rbi/full-fledged-money-changers", title: "Full-Fledged Money Changers License", desc: "RBI authorization for full-fledged money changing operations in India.", tag: "RBI", emoji: "💱" },
    { href: "/rbi/lendtech-services", title: "LendTech Services", desc: "RBI regulatory framework and compliance for lending technology companies.", tag: "RBI", emoji: "💰" },
    { href: "/rbi/nbfc-for-sale", title: "NBFC For Sale", desc: "Complete guide to buying, selling and acquiring NBFC companies in India.", tag: "RBI", emoji: "🏢" },
    { href: "/rbi/nbfc-legal-support", title: "NBFC Legal Support Services", desc: "End-to-end legal support for NBFC operations, compliance and regulatory filings.", tag: "RBI", emoji: "⚖️" },
    { href: "/rbi/nbfc-takeover", title: "NBFC Takeover", desc: "Regulatory guide for acquisition and takeover of NBFCs with RBI approval process.", tag: "RBI", emoji: "🤝" },
    { href: "/rbi/nbfc-marketing-strategy", title: "NBFC Marketing Strategy", desc: "Compliant marketing strategies and digital outreach for NBFC businesses.", tag: "RBI", emoji: "📢" },
    { href: "/rbi/rbi-services", title: "RBI Services in India", desc: "Comprehensive overview of RBI regulatory services and compliance framework.", tag: "RBI", emoji: "🏛️" },
    { href: "/rbi/nbfc-financial-modeling", title: "NBFC Financial Modeling", desc: "Expert financial modeling and projections for NBFC registration and operations.", tag: "RBI", emoji: "📈" },
    { href: "/rbi/arc-registration-in-india", title: "ARC Registration in India", desc: "Complete RBI Master Direction 2024 guide for Asset Reconstruction Companies under SARFAESI Act with ₹300 Cr NOF, capital adequacy, governance and SR framework.", tag: "RBI", emoji: "🏦" },
    { href: "/rbi/nbfc-registration-in-india", title: "NBFC Registration in India", desc: "Authoritative RBI Master Direction (Updated July 17, 2025) guide for NBFC-ICC Base Layer registration with ₹10 Cr NOF, 50-50 principal business test, COSMOS portal process and SBR compliance.", tag: "RBI", emoji: "💳" },
    { href: "/rbi/nbfc-sro-registration", title: "NBFC SRO Registration", desc: "RBI Self-Regulatory Organisation framework for NBFC industry bodies — ₹2 Cr net worth, governance independence, member representation and recognition application process.", tag: "RBI", emoji: "🛡️" },
    { href: "/rbi/payment-aggregator-license-in-india", title: "Payment Aggregator License", desc: "RBI PA Master Direction 2025 guide for PA-O, PA-P, PA-CB authorisation with ₹15 Cr → ₹25 Cr net worth, escrow architecture, Annexure 1 technology compliance and FIU-IND registration.", tag: "RBI", emoji: "💸" },
    { href: "/rbi/ppi-registration-in-india", title: "PPI Registration in India", desc: "RBI Master Directions on PPI 2021 (Updated Dec 2024) guide for digital wallets and prepaid cards — ₹5 Cr → ₹15 Cr net worth, escrow framework, Form A, System Audit Report, interoperability and customer liability.", tag: "RBI", emoji: "👛" },
];

export default function Page() {
    return (
        <>
        <div className="bg-[#f8faff] min-h-screen pt-16">
            {/* Hero */}
            <section className="relative py-16 px-6 border-b border-blue-100 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                        <Link href="/" className="hover:text-[#0096D6] transition-colors">Home</Link>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">RBI Services</span>
                    </nav>
                    <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold mb-4 inline-block">🏛️ Reserve Bank of India</span>
                    <h1 className="text-[40px] font-black text-[#0a1628] leading-tight mb-4 tracking-tight">RBI Services in India</h1>
                    <p className="text-[17px] text-gray-600 max-w-2xl mb-8">Comprehensive RBI regulatory services – from NBFC registration and Account Aggregator licenses to compliance frameworks and business plans. Expert guidance for every stage.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Book Free Consultation →</Link>
                        <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Talk to Expert</Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-[28px] font-black text-[#0a1628] mb-3">RBI Regulatory Services</h2>
                <p className="text-gray-500 mb-10">Select a service to access the complete regulatory guide with eligibility, process, fees, timeline and FAQs.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <Link key={i} href={s.href} className="group block">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">{s.emoji}</div>
                                    <span className="text-[11px] font-bold text-[#0096D6] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">{s.tag}</span>
                                </div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2 leading-snug">{s.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{s.desc}</p>
                                <div className="mt-4 text-[13px] text-[#0096D6] font-semibold group-hover:underline">Read Guide →</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[28px] font-bold text-white mb-4">Need Expert RBI Compliance Guidance?</h2>
                    <p className="text-blue-100 mb-8">Our team of regulatory compliance experts specialises in RBI frameworks, NBFC licensing, and fintech compliance in India.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl">Get Started Free →</Link>
                        <a href="tel:+919876543210" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
