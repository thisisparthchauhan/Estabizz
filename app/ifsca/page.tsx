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
        title: "PSP License – IFSCA",
        description: "Professional support for Payment Service Provider authorisation in GIFT IFSC, including e-money issuance, escrow service, cross-border money transfer, merchant acquisition, safeguarding framework, capital readiness, AML/KYC documentation and post-authorisation compliance.",
        href: "/ifsca/psp-license-ifsca",
        icon: "💳",
        tags: ["Payment Services", "E-Money", "Escrow", "GIFT IFSC"],
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
        <main className="min-h-screen bg-white pt-[64px]">
            {/* Hero — homepage-themed */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 bg-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <a href="/" className="hover:text-[#374151] transition-colors">Home</a>
                        <span className="opacity-40">/</span>
                        <span className="text-[#374151]">IFSCA Services</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        🌐 International Financial Services Centres Authority
                    </div>
                    <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">
                        IFSCA Services <span className="text-[#1677f2]">at GIFT IFSC</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">
                        Comprehensive regulatory compliance services for Aircraft Leasing, Finance Company registration, and other financial services in India&apos;s International Financial Services Centre.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <a href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#1677f2] px-7 py-3.5 text-[15px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
                            Book Free Consultation →
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-white px-7 py-3.5 text-[15px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]">
                            Talk to Expert
                        </a>
                    </div>
                </div>
            </header>

            {/* Services Grid */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8">
                    <h2 className="text-[26px] font-black tracking-[-0.02em] text-[#120b45]">Our IFSCA Services</h2>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-[#1677f2]" />
                    <p className="mt-3 text-[14px] text-[#64748b]">Select a service to access the complete regulatory guide with eligibility, process, fees, timeline and FAQs.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, idx) => (
                        <a key={idx} href={service.href} className="group block">
                            <div className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5fbff] text-2xl">{service.icon}</div>
                                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0a1628] transition-colors group-hover:text-[#1677f2]">{service.title}</h3>
                                <p className="text-[13px] leading-relaxed text-[#64748b]">{service.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {service.tags.map((tag, i) => (
                                        <span key={i} className="rounded-full bg-[#f5fbff] px-2.5 py-1 text-[10.5px] font-bold text-[#0077B6]">{tag}</span>
                                    ))}
                                </div>
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-black text-[#1677f2]">
                                    Read Guide <span className="transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-6 mb-16 overflow-hidden rounded-2xl border border-[#1677f2]/25 bg-gradient-to-br from-[#0a1628] to-[#0c2040] px-6 py-14 text-center sm:px-10">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#4f9dfb]">Estabizz Fintech Private Limited</p>
                    <h2 className="mb-4 text-[26px] font-black text-white sm:text-[30px]">Need Help with IFSCA Registration?</h2>
                    <p className="mb-8 text-[14.5px] leading-[1.7] text-white/60">Our experts handle end-to-end IFSCA compliance — from application to ongoing regulatory requirements at GIFT IFSC.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href="/contact" className="rounded-xl bg-[#1677f2] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#3b8ef5] transition-colors">Get Started Free →</a>
                        <a href="tel:9825600907" className="rounded-xl border border-white/20 px-8 py-3.5 text-[14px] font-bold text-white/85 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
