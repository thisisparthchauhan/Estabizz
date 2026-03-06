"use client";
import React, { useState, useEffect, useRef } from "react";

const services = [
    {
        id: "rbi",
        title: "RBI Regulatory Services",
        desc: "End-to-end RBI licensing and compliance management — including capital structuring, policy drafting, application filing, and post-approval reporting.",
        tags: ["NBFC", "Payment Aggregator", "PPI", "Account Aggregator"],
        icon: "🏦"
    },
    {
        id: "sebi",
        title: "SEBI Regulatory Services",
        desc: "Structured SEBI registration and governance support covering documentation, eligibility assessment, net worth compliance, and monitoring.",
        tags: ["Stock Broker", "RIA", "PMS", "AIF", "Research Analyst"],
        icon: "📈"
    },
    {
        id: "irdai",
        title: "IRDAI Regulatory Services",
        desc: "Complete IRDAI licensing lifecycle support — from feasibility assessment and capital planning to regulatory approval and compliance.",
        tags: ["Insurance Co.", "Broker License", "Corporate Agent", "IMF"],
        icon: "🛡️"
    },
    {
        id: "ifsca",
        title: "IFSCA & GIFT City Services",
        desc: "Regulatory structuring and operational compliance support for entities operating within India's International Financial Services Centre ecosystem.",
        tags: ["Broker Dealer", "FME", "Global Banking Unit", "SEZ"],
        icon: "🌐"
    },
    {
        id: "fiu",
        title: "Financial Intelligence & Reporting",
        desc: "Design and implementation of regulatory reporting systems aligned with India's financial intelligence and anti-money laundering frameworks.",
        tags: ["FIU-IND", "PMLA Advisory", "AML Policy", "CKYC"],
        icon: "🔍"
    },
    {
        id: "company",
        title: "Company Formation & Governance",
        desc: "From incorporation to structured governance — building legally compliant enterprises with strong financial and operational discipline.",
        tags: ["Private Ltd", "LLP", "Society", "Audit", "ROC Filings"],
        icon: "🏛️"
    },
    {
        id: "sectoral",
        title: "Sectoral & Operational Licenses",
        desc: "Industry-specific regulatory approvals enabling businesses to operate legally across manufacturing, healthcare, food, exports, and certification.",
        tags: ["FSSAI", "APEDA", "AYUSH", "Drug License", "BIS"],
        icon: "⚙️"
    },
    {
        id: "specialised",
        title: "Specialised Compliance Support",
        desc: "Ongoing regulatory monitoring, returns filing, audit coordination, policy drafting, and inspection readiness for market participants.",
        tags: ["NBFC Compliance", "Broker Compliance", "RTA", "PA Audit"],
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
                        <div
                            key={service.id}
                            className={`flex flex-col h-full bg-[rgba(255,255,255,0.04)] border border-[rgba(79,142,247,0.12)] rounded-[20px] p-6 hover:bg-[rgba(0,150,220,0.08)] hover:border-[rgba(0,150,220,0.35)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out`}
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
                            <span key={i} className="px-3 py-1 bg-[rgba(0,150,220,0.1)] border border-[rgba(0,150,220,0.2)] text-[#60c8f0] rounded-full text-[11px] font-semibold whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
          ))}
            </div>

        </div>
    </section >
  );
}
