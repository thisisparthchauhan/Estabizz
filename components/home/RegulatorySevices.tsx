"use client";
import React, { useState, useEffect, useRef } from "react";

const services = [
    {
        id: "rbi",
        title: "RBI Regulatory Services",
        desc: "End-to-end RBI licensing and compliance management — including capital structuring, policy drafting, application filing, and post-approval reporting.",
        tags: ["NBFC", "Payment Aggregator", "PPI", "Account Aggregator"],
        icon: "🏦",
        href: "/rbi"
    },
    {
        id: "sebi",
        title: "SEBI Regulatory Services",
        desc: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, and monitoring.",
        tags: ["Stock Broker", "RIA", "PMS", "AIF", "Research Analyst"],
        icon: "📈",
        href: "/sebi"
    },
    {
        id: "irdai",
        title: "IRDAI Regulatory Services",
        desc: "Complete IRDAI licensing lifecycle support — from feasibility assessment and capital planning to regulatory approval and compliance.",
        tags: ["Insurance Co.", "Broker License", "Corporate Agent", "IMF"],
        icon: "🛡️",
        href: "/irdai"
    },
    {
        id: "ifsca",
        title: "IFSCA & GIFT City Services",
        desc: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.",
        tags: [
            { name: "Aircraft Leasing", href: "/ifsca/aircraft-leasing" },
            { name: "Factoring", href: "/regulatory/ifsca-factoring-license-gift-city" },
            { name: "PSP License", href: "/regulatory/psp-license-ifsca" },
            { name: "Finance Co.", href: "/regulatory/finance-company-gift-ifsc" }
        ],
        icon: "🌐",
        href: "/ifsca"
    },
    {
        id: "fema",
        title: "FEMA & Foreign Exchange",
        desc: "FEMA registration, compliance advisory and cross-border transaction support aligned with India's foreign exchange regulations.",
        tags: ["FEMA Registration", "FEMA Compliance", "Cross-Border", "FDI"],
        icon: "🔍",
        href: "/fema"
    },
    {
        id: "company",
        title: "Company Formation & Governance",
        desc: "From incorporation to structured governance — building legally compliant enterprises with strong financial and operational discipline.",
        tags: ["Private Ltd", "LLP", "Society", "Audit", "ROC Filings"],
        icon: "🏛️",
        href: "/services/enterprise-services"
    },
    {
        id: "services",
        title: "Professional Services",
        desc: "GST appeals, transfer pricing, legal due diligence, trademark search, ESG consulting and finance outsourcing for growing businesses.",
        tags: ["GST Appeals", "Transfer Pricing", "Trademark", "ESG"],
        icon: "⚙️",
        href: "/services"
    },
    {
        id: "specialised",
        title: "Specialised Compliance Support",
        desc: "Ongoing regulatory monitoring, returns filing, audit coordination, policy drafting, and inspection readiness for market participants.",
        tags: ["NBFC Compliance", "Broker Compliance", "RTA", "PA Audit"],
        icon: "📋",
        href: "/contact"
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
                            className={`flex flex-col h-full bg-[rgba(255,255,255,0.04)] border border-[rgba(79,142,247,0.12)] rounded-[20px] p-6 hover:bg-[rgba(0,150,220,0.08)] hover:border-[rgba(0,150,220,0.35)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out cursor-pointer`}
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
                                {service.tags.map((tag, i) => {
                                    const isObject = typeof tag === 'object' && tag !== null;
                                    const name = isObject ? (tag as any).name : tag;
                                    const href = isObject ? (tag as any).href : null;

                                    return href ? (
                                        <span key={i} onClick={(e) => { e.preventDefault(); window.location.href = href; }} className="px-3 py-1 bg-[rgba(0,150,220,0.1)] border border-[rgba(0,150,220,0.2)] text-[#60c8f0] rounded-full text-[11px] font-semibold whitespace-nowrap hover:bg-[#0096D6] hover:text-white transition-colors cursor-pointer">
                                            {name}
                                        </span>
                                    ) : (
                                        <span key={i} className="px-3 py-1 bg-[rgba(0,150,220,0.1)] border border-[rgba(0,150,220,0.2)] text-[#60c8f0] rounded-full text-[11px] font-semibold whitespace-nowrap">
                                            {name}
                                        </span>
                                    );
                                })}
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section >
    );
}
