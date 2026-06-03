"use client";

import React, { useEffect, useRef, useState } from "react";

const steps = [
    {
        num: "01",
        title: "Strategic Regulatory Assessment",
        badge: "Clarity Before Commitment",
        body: "We evaluate the business model, capital readiness and regulatory exposure before any filing starts."
    },
    {
        num: "02",
        title: "Regulator-Ready Documentation",
        badge: "Precision in Preparation",
        body: "We structure business plans, policies, declarations, projections and supporting records."
    },
    {
        num: "03",
        title: "Regulatory Filing & Liaison",
        badge: "Disciplined Execution",
        body: "Applications are submitted with organised follow-ups, query management and supporting evidence."
    },
    {
        num: "04",
        title: "Approval & Ongoing Compliance",
        badge: "Beyond the Licence",
        body: "Post-approval compliance systems, calendars and governance controls are mapped for continuity."
    }
];

export default function ProcessSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-24">
            <div className="mx-auto max-w-[1180px]">
                <div className={`mx-auto mb-14 max-w-[820px] text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div className="mb-4 text-[13px] font-black uppercase tracking-[0.24em] text-[#1677f2]">Execution Process</div>
                    <h2 className="text-[clamp(34px,4vw,58px)] font-black leading-[1.08] tracking-[-0.04em] text-[#071426]">
                        A structured path to regulatory approval.
                    </h2>
                    <p className="mx-auto mt-5 max-w-[700px] text-[17px] font-medium leading-relaxed text-[#64748b]">
                        Our process is simple to understand but disciplined in execution, so clients know what happens next at every stage.
                    </p>
                </div>

                <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <div className="absolute left-8 right-8 top-[42px] hidden h-px bg-gradient-to-r from-[#1677f2] via-[#10b981] to-[#0866d9] xl:block" />
                    {steps.map((step, index) => (
                        <div
                            key={step.num}
                            className="relative rounded-[28px] border border-blue-100 bg-[#f8fbff] p-7 shadow-[0_18px_50px_rgba(0,80,140,0.06)] transition-all duration-500 hover:-translate-y-1 hover:bg-white"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(28px)",
                                transitionDelay: `${index * 90}ms`,
                            }}
                        >
                            <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#1677f2] text-[20px] font-black text-white shadow-[0_16px_35px_rgba(22,119,242,0.25)]">
                                {step.num}
                            </div>
                            <div className="mb-4 inline-flex rounded-full bg-white px-3 py-1.5 text-[11px] font-black italic text-[#1677f2] shadow-sm">
                                {step.badge}
                            </div>
                            <h3 className="text-[20px] font-black leading-tight text-[#071426]">{step.title}</h3>
                            <p className="mt-4 text-[14.5px] font-medium leading-[1.8] text-[#64748b]">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
