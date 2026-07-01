import type { Metadata } from 'next';
import { getContent } from '@/lib/content/getContent';
import { buildPageMetadata } from '@/lib/seo/pageMetadata';
import { SEO_RBI_DEFAULTS, type SeoContent } from '@/lib/content/seoDefaults';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getContent('seo.rbi') as Partial<SeoContent>;
    return buildPageMetadata(seo, SEO_RBI_DEFAULTS, '/rbi');
}

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
    { href: "/rbi/arc-registration-in-india", title: "ARC Registration in India", desc: "Complete RBI registration support for Asset Reconstruction Companies, including ₹300 crore NOF readiness, SARFAESI framework review, business plan, policy drafting, governance documentation and post-registration compliance.", tag: "RBI", emoji: "🏦" },
    { href: "/rbi/nbfc-registration-in-india", title: "NBFC Registration in India", desc: "Authoritative RBI Master Direction (Updated July 17, 2025) guide for NBFC-ICC Base Layer registration with ₹10 Cr NOF, 50-50 principal business test, COSMOS portal process and SBR compliance.", tag: "RBI", emoji: "💳" },
    { href: "/rbi/nbfc-sro-registration", title: "NBFC SRO Registration", desc: "Professional support for industry bodies and associations seeking RBI recognition as Self-Regulatory Organisations for NBFCs, including eligibility review, ₹2 crore net worth readiness, governance structuring, business plan, policy documentation and post-recognition compliance.", tag: "RBI", emoji: "🛡️" },
    { href: "/rbi/payment-aggregator-license-in-india", title: "Payment Aggregator License in India", desc: "Professional support for RBI Payment Aggregator authorisation covering PA-O, PA-P and PA-CB models, Rs.15 crore net worth readiness, escrow framework, cyber compliance, merchant KYC, business plan and post-authorisation reporting.", tag: "RBI", emoji: "💸" },
    { href: "/rbi/ppi-registration-in-india", title: "PPI Registration in India", desc: "Professional support for RBI PPI authorisation covering wallets, prepaid cards, gift instruments, semi-closed PPIs, KYC/AML, customer fund protection, technology documentation, business plan and post-authorisation compliance.", tag: "RBI", emoji: "👛" },
];

export default function Page() {
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
                        <span className="text-[#374151]">RBI Services</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        🏛️ Reserve Bank of India
                    </div>
                    <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
                        RBI Services <span className="text-[#1677f2]">in India</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Comprehensive RBI regulatory services – from NBFC registration and Account Aggregator licenses to compliance frameworks and business plans. Expert guidance for every stage.
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

            {/* Services Grid */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8">
                    <h2 className="text-[26px] font-black tracking-[-0.02em] text-[#120b45]">RBI Regulatory Services</h2>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                    <p className="mt-3 text-[14px] text-[#64748b]">Select a service to access the complete regulatory guide with eligibility, process, fees, timeline and FAQs.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => (
                        <Link key={i} href={s.href} className="group block">
                            <div className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5fbff] text-xl">{s.emoji}</div>
                                    <span className="rounded-full bg-[#f5fbff] px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-[#0077B6]">{s.tag}</span>
                                </div>
                                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0a1628] transition-colors group-hover:text-[#1677f2]">{s.title}</h3>
                                <p className="text-[13px] leading-relaxed text-[#64748b] line-clamp-2">{s.desc}</p>
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-black text-[#1677f2]">
                                    Read Guide <span className="transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-6 mb-16 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-6 py-14 text-center sm:px-10">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
                    <h2 className="mb-4 text-[26px] font-black text-white sm:text-[30px]">Need Expert RBI Compliance Guidance?</h2>
                    <p className="mb-8 text-[14.5px] leading-[1.7] text-white/60">Our team of regulatory compliance experts specialises in RBI frameworks, NBFC licensing, and fintech compliance in India.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/contact" className="rounded-xl bg-[#1677f2] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">Get Started Free →</Link>
                        <a href="tel:9825600907" className="rounded-xl border border-white/20 px-8 py-3.5 text-[14px] font-bold text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
