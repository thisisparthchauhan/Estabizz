"use client";
import React, { useState, useEffect, useRef } from "react";

const services = [
    {
        id: "rbi",
        title: "RBI Regulatory Services",
        href: "/rbi",
        desc: "End-to-end RBI licensing and compliance management — including capital structuring, policy drafting, application filing, and post-approval reporting.",
        tags: [
            { name: "NBFC", href: "/rbi/nbfc-account-aggregator-license" },
            { name: "Payment Aggregator", href: "/rbi/payment-aggregator-license-in-india" },
            { name: "PPI", href: "/rbi/ppi-registration-in-india" },
            { name: "Account Aggregator", href: "/rbi/nbfc-account-aggregator-license" },
            { name: "ARC Registration", href: "/rbi/arc-registration-in-india" },
            { name: "NBFC SRO", href: "/rbi/nbfc-sro-registration" },
        ],
        icon: "🏦"
    },
    {
        id: "sebi",
        title: "SEBI Regulatory Services",
        href: "/sebi",
        desc: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, and monitoring.",
        tags: [
            { name: "Stock Broker", href: "/sebi/amfi-registration" },
            { name: "RIA", href: "/sebi/credit-rating-agency" },
            { name: "PMS", href: "/sebi/collective-investment-schemes" },
            { name: "AIF", href: "/sebi/aif-compliance-test-report" },
            { name: "Research Analyst", href: "/sebi/depository-participant-sebi-registration" },
        ],
        icon: "📈"
    },
    {
        id: "irdai",
        title: "IRDAI Regulatory Services",
        href: "/irdai",
        desc: "Complete IRDAI licensing lifecycle support — from feasibility assessment and capital planning to regulatory approval and compliance.",
        tags: [
            { name: "Insurance Co.", href: "/irdai/irda-insurance-broker-license" },
            { name: "Broker License", href: "/irdai/irda-insurance-broker-license" },
            { name: "Corporate Agent", href: "/irdai/irdai-regulatory-sandbox" },
            { name: "IMF", href: "/irdai/insurance-marketing-firm-license" },
        ],
        icon: "🛡️"
    },
    {
        id: "ifsca",
        title: "IFSCA & GIFT City Services",
        href: "/ifsca",
        desc: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.",
        tags: [
            { name: "Broker Dealer", href: "/ifsca" },
            { name: "Factoring", href: "/regulatory/ifsca-factoring-license-gift-city" },
            { name: "PSP License", href: "/regulatory/psp-license-ifsca" },
            { name: "Finance Co.", href: "/ifsca/finance-company" },
        ],
        icon: "🌐"
    },
    {
        id: "fiu",
        title: "Financial Intelligence & Reporting",
        href: "/services",
        desc: "Design and implementation of regulatory reporting systems aligned with India's financial intelligence and anti-money laundering frameworks.",
        tags: [
            { name: "FIU-IND", href: "/services/enterprise-services" },
            { name: "PMLA Advisory", href: "/services/legal-due-diligence" },
            { name: "AML Policy", href: "/services/enterprise-services" },
            { name: "CKYC", href: "/services/enterprise-services" },
        ],
        icon: "🔍"
    },
    {
        id: "company",
        title: "Company Formation & Governance",
        href: "/services",
        desc: "From incorporation to structured governance — building legally compliant enterprises with strong financial and operational discipline.",
        tags: [
            { name: "Private Ltd", href: "/services/enterprise-services" },
            { name: "LLP", href: "/services/enterprise-services" },
            { name: "Society", href: "/services/enterprise-services" },
            { name: "Audit", href: "/services/finance-accounting-outsourcing" },
            { name: "ROC Filings", href: "/services/enterprise-services" },
        ],
        icon: "🏛️"
    },
    {
        id: "sectoral",
        title: "Sectoral & Operational Licenses",
        href: "/services",
        desc: "Industry-specific regulatory approvals enabling businesses to operate legally across manufacturing, healthcare, food, exports, and certification.",
        tags: [
            { name: "FSSAI", href: "/services/enterprise-services" },
            { name: "APEDA", href: "/services/enterprise-services" },
            { name: "AYUSH", href: "/services/enterprise-services" },
            { name: "Drug License", href: "/services/enterprise-services" },
            { name: "BIS", href: "/services/enterprise-services" },
        ],
        icon: "⚙️"
    },
    {
        id: "specialised",
        title: "Specialised Compliance Support",
        href: "/services",
        desc: "Ongoing regulatory monitoring, returns filing, audit coordination, policy drafting, and inspection readiness for market participants.",
        tags: [
            { name: "NBFC Compliance", href: "/rbi/nbfc-legal-support" },
            { name: "Broker Compliance", href: "/sebi/aif-compliance-test-report" },
            { name: "RTA", href: "/services/enterprise-services" },
            { name: "PA Audit", href: "/rbi/rbi-services" },
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
        <section ref={sectionRef} className="py-24 bg-[#0a1628] relative">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-white leading-[1.2] mb-4">
                        Our Regulatory Services
                    </h2>
                    <p className="text-[16px] text-[#94a3b8] font-medium">
                        Comprehensive regulatory solutions across all major frameworks
                    </p>
                </div>

                {/* Services Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <a
                            key={service.id}
                            href={service.href}
                            className={`flex flex-col h-full bg-[rgba(255,255,255,0.04)] border border-[rgba(79,142,247,0.12)] rounded-[20px] p-6 hover:bg-[rgba(0,150,220,0.08)] hover:border-[rgba(0,150,220,0.35)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out no-underline`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                                transitionDelay: `${0.08 * index}s`
                            }}
                        >
                            <div className="w-[48px] h-[48px] rounded-[14px] bg-[rgba(0,150,220,0.12)] border border-[rgba(0,150,220,0.2)] flex items-center justify-center text-[22px] mb-5 shrink-0">
                                {service.icon}
                            </div>

                            <h3 className="text-[17px] font-bold text-white mb-3">
                                {service.title}
                            </h3>

                            <p className="text-[13px] text-[#94a3b8] leading-[1.7] mb-6 flex-grow">
                                {service.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {service.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = tag.href; }}
                                        className="px-3 py-1 bg-[rgba(0,150,220,0.1)] border border-[rgba(0,150,220,0.2)] text-[#60c8f0] rounded-full text-[11px] font-semibold whitespace-nowrap hover:bg-[#0096D6] hover:text-white transition-colors cursor-pointer"
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
