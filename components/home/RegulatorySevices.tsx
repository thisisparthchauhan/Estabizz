"use client";
import React, { useState, useEffect, useRef } from "react";

const services = [
    {
        id: "rbi",
        title: "RBI Regulatory Services",
        href: "/rbi",
        forText: "Financial Institutions & Digital Lending Platforms",
        desc: "End-to-end RBI licensing and compliance management including capital structuring, policy drafting, application filing, regulatory liaison, inspection preparedness and post-approval reporting.",
        tags: [
            { name: "NBFC Registration", href: "/rbi/nbfc-registration-in-india" },
            { name: "NBFC-MFI Registration", href: "/rbi" },
            { name: "NBFC-ICC Registration", href: "/rbi" },
            { name: "Payment Aggregator Licence", href: "/rbi/payment-aggregator-license-in-india" },
            { name: "PPI / Prepaid Wallet", href: "/rbi/ppi-registration-in-india" },
            { name: "Account Aggregator", href: "/rbi/nbfc-account-aggregator-license" },
            { name: "ARC Registration", href: "/rbi/arc-registration-in-india" },
            { name: "RBI Returns", href: "/rbi/rbi-services" },
        ],
        icon: "🏦"
    },
    {
        id: "sebi",
        title: "SEBI Regulatory Services",
        href: "/sebi",
        forText: "Capital Market & Investment Entities",
        desc: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, application filing, regulatory query response and long-term compliance monitoring.",
        tags: [
            { name: "Stock Broker", href: "/sebi/stock-broker-registration-in-india" },
            { name: "RIA", href: "/sebi/ria-registration-in-india" },
            { name: "PMS", href: "/sebi/pms-registration-in-india" },
            { name: "AIF", href: "/sebi/aif-registration-in-india" },
            { name: "Research Analyst", href: "/sebi/research-analyst-registration-in-india" },
            { name: "Merchant Banker", href: "/sebi" },
            { name: "RTA", href: "/sebi" },
            { name: "Social Stock Exchange", href: "/sebi/social-stock-exchange-license-india" },
        ],
        icon: "📈"
    },
    {
        id: "irdai",
        title: "IRDAI Regulatory Services",
        href: "/irdai",
        forText: "Insurance & Risk Management Entities",
        desc: "Complete IRDAI licensing lifecycle support from feasibility assessment and capital planning to regulatory approval support and continuous compliance management.",
        tags: [
            { name: "Insurance Company", href: "/irdai" },
            { name: "Insurance Broker", href: "/irdai/insurance-broker-registration-in-india" },
            { name: "Composite Broker", href: "/irdai/composite-insurance-broker-registration-in-india" },
            { name: "Corporate Agent", href: "/irdai/corporate-agent-registration-in-india" },
            { name: "IMF", href: "/irdai/insurance-marketing-firm-registration-in-india" },
            { name: "ISNP", href: "/irdai/isnp-registration" },
            { name: "Reinsurance Broker", href: "/irdai/reinsurance-broker-registration-in-india" },
        ],
        icon: "🛡️"
    },
    {
        id: "ifsca",
        title: "IFSCA & GIFT City Services",
        href: "/ifsca",
        forText: "Global Financial Services & IFSC Entities",
        desc: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.",
        tags: [
            { name: "Broker Dealer", href: "/ifsca" },
            { name: "Fund Management Entity", href: "/ifsca" },
            { name: "Global Banking Unit", href: "/ifsca" },
            { name: "Finance Company", href: "/ifsca/finance-company-in-gift-ifsc" },
            { name: "PSP Licence", href: "/ifsca/psp-license-ifsca" },
            { name: "ITFS Platform", href: "/ifsca/itfs-registration-in-gift-ifsc" },
            { name: "BATF", href: "/ifsca/batf-services-registration-in-gift-ifsc" },
            { name: "Insurance Office IFSC", href: "/irdai/ifsca-insurance-intermediary" },
        ],
        icon: "🌐"
    },
    {
        id: "fiu",
        title: "Financial Intelligence & Reporting Frameworks",
        href: "/services",
        forText: "AML, KYC & Reporting Teams",
        desc: "Design and implementation of financial intelligence, AML, KYC, reporting and risk-monitoring systems aligned with India's financial regulatory expectations.",
        tags: [
            { name: "FIU-IND", href: "/services/enterprise-services" },
            { name: "PMLA Compliance", href: "/services/legal-due-diligence" },
            { name: "AML Policy", href: "/services/enterprise-services" },
            { name: "AML Risk Assessment", href: "/services/legal-due-diligence" },
            { name: "CKYC", href: "/services/enterprise-services" },
            { name: "Credit Bureau Integration", href: "/services/enterprise-services" },
            { name: "NESL Reporting", href: "/services/enterprise-services" },
        ],
        icon: "🔍"
    },
    {
        id: "company",
        title: "Company Formation & Governance",
        href: "/services",
        forText: "Founders, Boards & Corporate Teams",
        desc: "From incorporation to structured governance — building legally compliant enterprises with strong financial and operational discipline.",
        tags: [
            { name: "Private Limited", href: "/services/enterprise-services" },
            { name: "LLP", href: "/services/enterprise-services" },
            { name: "OPC", href: "/services/enterprise-services" },
            { name: "Section 8", href: "/services/enterprise-services" },
            { name: "Society", href: "/services/enterprise-services" },
            { name: "Annual Compliance", href: "/services/enterprise-services" },
            { name: "Audit", href: "/services/finance-accounting-outsourcing" },
            { name: "ROC Filings", href: "/services/enterprise-services" },
        ],
        icon: "🏛️"
    },
    {
        id: "sectoral",
        title: "Sectoral & Operational Licences",
        href: "/services",
        forText: "Manufacturing, Food, Healthcare & Export Businesses",
        desc: "Industry-specific regulatory approvals enabling businesses to operate legally across manufacturing, healthcare, food, exports, and certification.",
        tags: [
            { name: "FSSAI", href: "/services/enterprise-services" },
            { name: "APEDA", href: "/services/enterprise-services" },
            { name: "AYUSH", href: "/services/enterprise-services" },
            { name: "Factory Licence", href: "/services/enterprise-services" },
            { name: "Drug Licence", href: "/services/enterprise-services" },
            { name: "RNI", href: "/services/enterprise-services" },
            { name: "BIS", href: "/services/enterprise-services" },
            { name: "Trademark", href: "/services/trademark-search" },
        ],
        icon: "⚙️"
    },
    {
        id: "specialised",
        title: "Specialised Compliance Support",
        href: "/services",
        forText: "Regulated Financial Entities",
        desc: "Ongoing regulatory monitoring, returns filing, audit coordination, policy drafting, and inspection readiness for market participants.",
        tags: [
            { name: "NBFC Compliance", href: "/rbi/nbfc-legal-support" },
            { name: "AIF Compliance", href: "/sebi/aif-compliance-test-report" },
            { name: "FME Compliance", href: "/ifsca" },
            { name: "Stock Broker Compliance", href: "/sebi/stock-broker-registration-in-india" },
            { name: "Payment Aggregator Compliance", href: "/rbi/payment-aggregator-license-in-india" },
            { name: "RTA Compliance", href: "/sebi" },
            { name: "RIA & RA Compliance", href: "/sebi" },
        ],
        icon: "📋"
    }
];

export default function RegulatoryServices() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-[#0a1628] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
                <div className="absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-[#0096D6]/25 blur-[120px]" />
                <div className="absolute right-[-120px] bottom-[-80px] h-[420px] w-[420px] rounded-full bg-[#1677f2]/18 blur-[120px]" />
                <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            </div>
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-white leading-[1.2] mb-4">
                        Regulatory Services Built for Serious Businesses
                    </h2>
                    <p className="text-[16px] text-[#94a3b8] font-medium">
                        From licensing to ongoing compliance, Estabizz supports regulated businesses across India&apos;s most important financial and corporate frameworks.
                    </p>
                </div>

                {/* Services Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <a
                            key={service.id}
                            href={service.href}
                            className={`group/service premium-dark-glass premium-border-sweep flex flex-col h-full rounded-[24px] p-6 hover:bg-[rgba(0,150,220,0.12)] hover:border-[rgba(217,169,56,0.35)] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.34)] transition-all duration-500 ease-out no-underline`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                                transitionDelay: `${0.08 * index}s`
                            }}
                        >
                            <div className="w-[52px] h-[52px] rounded-[18px] bg-[rgba(0,150,220,0.16)] border border-[rgba(217,169,56,0.22)] flex items-center justify-center text-[22px] mb-5 shrink-0 shadow-[0_18px_38px_rgba(0,0,0,0.18)] group-hover/service:scale-110 group-hover/service:rotate-3 transition-transform duration-500">
                                {service.icon}
                            </div>

                            <h3 className="text-[17px] font-bold text-white mb-3">
                                {service.title}
                            </h3>
                            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F8C35B] mb-3">
                                For: {service.forText}
                            </div>

                            <p className="text-[13px] text-[#94a3b8] leading-[1.7] mb-6 flex-grow">
                                {service.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {service.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = tag.href; }}
                                    className="px-3 py-1 bg-[rgba(0,150,220,0.12)] border border-[rgba(0,150,220,0.24)] text-[#4f9dfb] rounded-full text-[11px] font-semibold whitespace-nowrap hover:bg-[#1677f2] hover:border-[#1677f2] hover:text-[#0a1628] transition-colors cursor-pointer"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section >
    );
}
