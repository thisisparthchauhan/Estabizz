"use client";
import React, { useEffect, useRef, useState } from "react";

const engagements = [
    {
        title: "NBFC Registration Support",
        summary: "Business model review, RBI documentation, capital readiness, policy framework and application-query support for lending and financial services entities.",
        tag: "RBI Licensing"
    },
    {
        title: "Insurance Broker Licensing Support",
        summary: "Principal officer readiness, infrastructure documents, board approvals, compliance policies and IRDAI filing support for insurance intermediary applicants.",
        tag: "IRDAI Licensing"
    },
    {
        title: "AIF / PMS Advisory",
        summary: "SEBI eligibility mapping, sponsor and investment manager documentation, net worth support, compliance manuals and regulatory filing coordination.",
        tag: "SEBI Capital Markets"
    },
    {
        title: "IFSCA GIFT City Setup",
        summary: "Entity structuring, IFSC office planning, application preparation, governance notes and regulator-facing documentation for GIFT City market entry.",
        tag: "IFSCA / IFSC"
    },
    {
        title: "FIU-IND / PMLA Compliance",
        summary: "Reporting entity assessment, FIU registration support, AML policy drafting, principal officer notes and compliance calendar readiness.",
        tag: "AML Framework"
    },
    {
        title: "Payment Aggregator Readiness",
        summary: "RBI PA applicability review, net worth planning, escrow framework notes, merchant due diligence policy and cyber-governance documentation support.",
        tag: "RBI Payments"
    }
];

export default function Testimonials() {
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
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-transparent border-t border-[rgba(0,150,220,0.1)]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4">
                        Representative Regulatory Engagements
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium leading-relaxed">
                        Our work is built around confidentiality. Instead of publishing unsupported testimonials, we share representative engagement areas where Estabizz provides structured execution, transparent communication and compliance-first delivery.
                    </p>
                </div>

                <div className="relative w-full pb-4">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
                    >
                        {engagements.map((item, index) => (
                            <div
                                key={item.title}
                                className="bg-white/80 backdrop-blur-[16px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 relative flex flex-col group hover:bg-white/95 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,100,200,0.12)] transition-all duration-500 ease-out"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0096D6] font-black mb-5">
                                    {index + 1}
                                </div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] mb-3">{item.title}</h3>
                                <p className="text-[14px] text-[#64748b] leading-7 font-medium">
                                    {item.summary}
                                </p>
                                <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0096D6]">
                                    {item.tag}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-[12px] text-[#64748b] mt-10 max-w-2xl mx-auto leading-relaxed">
                    These examples are representative service categories and do not disclose confidential client details or imply guaranteed regulatory approval.
                </p>
            </div>

        </section>
    );
}
