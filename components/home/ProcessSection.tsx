"use client";
import React, { useEffect, useRef, useState } from "react";

const steps = [
    {
        num: "01",
        title: "Strategic Regulatory Assessment",
        badge: "Clarity Before Commitment",
        body: "We begin with a structured evaluation of your business model, capital readiness, and regulatory exposure. Our experts identify the appropriate licensing route and compliance framework before any submission begins."
    },
    {
        num: "02",
        title: "Regulator-Ready Documentation",
        badge: "Precision in Preparation",
        body: "We draft and structure all required documentation — business plans, policies, declarations, compliance frameworks, and financial projections — aligned with regulator expectations. Every application is prepared with audit and inspection readiness in mind."
    },
    {
        num: "03",
        title: "Regulatory Filing & Liaison",
        badge: "Disciplined Execution",
        body: "Your application is formally submitted to the respective authority — RBI, SEBI, IRDAI, IFSCA or MCA — with structured follow-ups, query management, and proactive engagement until resolution. We manage the dialogue. You stay informed."
    },
    {
        num: "04",
        title: "Approval & Ongoing Compliance",
        badge: "Beyond the License",
        body: "Licensing is only the beginning. We implement post-approval compliance systems, reporting mechanisms, and governance structures to ensure long-term regulatory stability."
    }
];

export default function ProcessSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Simple auto-advance for visual flair
    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="py-24 bg-transparent relative z-10 overflow-hidden border-y border-blue-50/50">
            <div className="max-w-[1240px] mx-auto px-6">

                <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4">
                        A Structured Path to Regulatory Approval
                    </h2>
                    <p className="text-[16px] text-[#475569] font-medium leading-relaxed">
                        Our disciplined four-stage process ensures clarity, compliance, and confidence at every stage of your licensing journey.
                    </p>
                </div>

                {/* Process Steps Container */}
                <div className="relative">

                    {/* Connecting Dashed Line (Desktop only) */}
                    <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#0096D6]/30 z-0"></div>
                    {/* Active Progress Line (Desktop only) */}
                    <div
                        className="hidden lg:block absolute top-[28px] left-[10%] h-[2px] bg-gradient-to-r from-[#0096D6] to-[#10b981] z-0 transition-all duration-[1500ms] ease-in-out"
                        style={{
                            width: isVisible ? `${(Math.max(0.01, Math.min(activeStep, steps.length - 1) / (steps.length - 1))) * 80}%` : '0%',
                            transitionDelay: '0.3s'
                        }}
                    ></div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
                        {steps.map((step, index) => {
                            const isActive = index <= activeStep;
                            const isCurrent = index === activeStep;

                            return (
                                <div
                                    key={step.num}
                                    className={`flex flex-col items-start lg:items-center relative transition-all duration-700 ease-out`}
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? (isActive ? 'scale(1)' : 'scale(0.8)') : 'scale(0)',
                                        transitionDelay: `${0.5 + index * 0.15}s`
                                    }}
                                    onMouseEnter={() => setActiveStep(index)}
                                >

                                    {/* Number Circle */}
                                    <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center text-[20px] font-bold mb-6 transition-all duration-500 shadow-md ${isActive ? 'bg-gradient-to-br from-[#0096D6] to-[#00B4E0] text-white scale-110 shadow-[#0096D6]/30' : 'bg-white text-[#94a3b8] border-2 border-dashed border-gray-200'}`}>
                                        {step.num}
                                    </div>

                                    {/* Mobile Connecting Line (Vertical) */}
                                    {index < steps.length - 1 && (
                                        <div className={`lg:hidden absolute left-[27px] top-[60px] bottom-[-40px] w-[2px] transition-colors duration-500 ${index < activeStep ? 'bg-[#0096D6]' : 'bg-gray-200 border-l-2 border-dashed border-transparent'}`}></div>
                                    )}

                                    {/* Content Card */}
                                    <div className={`lg:text-center w-full bg-white/75 backdrop-blur-md p-5 rounded-[16px] border transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,150,220,0.15)] ${isCurrent ? 'border-[#0096D6]/40 shadow-[0_8px_30px_rgba(0,150,220,0.12)] -translate-y-2' : 'border-[rgba(0,150,220,0.1)] shadow-sm'}`}>
                                        <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold italic mb-3 transition-colors ${isActive ? 'bg-blue-50 text-[#0096D6]' : 'bg-gray-50 text-gray-400'}`}>
                                            {step.badge}
                                        </div>
                                        <h3 className={`text-[16px] font-bold mb-3 transition-colors ${isActive ? 'text-[#0a1628]' : 'text-gray-500'}`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] text-[#64748b] leading-[1.75] font-medium">
                                            {step.body}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}
