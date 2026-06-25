"use client";
import React, { useEffect, useRef, useState } from "react";
import { COMPLIANCE_PORTAL_DEFAULTS, type CompliancePortalContent } from "@/lib/content/compliancePortalDefaults";

export default function CompliancePortal({ content }: { content?: Partial<CompliancePortalContent> }) {
    const c: CompliancePortalContent = { ...COMPLIANCE_PORTAL_DEFAULTS, ...content };
    const checklistItems = c.checklistItems?.length ? c.checklistItems : COMPLIANCE_PORTAL_DEFAULTS.checklistItems;
    const featureBlocks = c.features?.length ? c.features : COMPLIANCE_PORTAL_DEFAULTS.features;
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
        <section ref={sectionRef} className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[42%] top-[12%] h-[320px] w-[320px] rounded-full bg-[#1677f2]/10 blur-[90px]" />
                <div className="absolute right-[4%] bottom-[8%] h-[280px] w-[280px] rounded-full bg-[#1677f2]/10 blur-[80px]" />
            </div>
            <div className="flex flex-col xl:flex-row min-h-[800px]">

                {/* Left Side (Light) */}
                <div className="w-full xl:w-5/12 bg-white py-24 px-6 xl:pl-0 flex justify-end">
                    <div className={`max-w-[500px] w-full xl:mr-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[11px] font-bold text-[#1677f2] uppercase tracking-[0.2em] mb-4">
                            {c.label}
                        </div>
                        <h2 className="text-[36px] md:text-[42px] font-black text-[#0a1628] leading-[1.1] mb-2">
                            {c.heading}
                        </h2>
                        <div className="text-[18px] font-bold text-[#0077B6] mb-6 italic">
                            {c.subtitle}
                        </div>

                        <p className="text-[15px] text-[#475569] leading-relaxed font-medium mb-10">
                            {c.description}
                        </p>

                        <div className="rounded-[28px] p-8 border border-blue-100 bg-[#f8fbff] shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                            <h3 className="text-[16px] font-bold text-[#120b45] mb-6 tracking-wide">
                                {c.checklistTitle}
                            </h3>
                            <ul className="space-y-4">
                                {checklistItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1677f2] to-[#0866d9] text-white flex items-center justify-center shrink-0 shadow-sm text-[10px] font-bold mt-0.5">✓</span>
                                        <span className="text-[14px] text-[#475569] leading-[1.9] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Right Side (Light) with Feature Blocks */}
                <div className="w-full xl:w-7/12 py-24 px-6 xl:pr-0 relative flex items-center justify-center lg:justify-start bg-[#f8fbff]">
                    <div className="absolute inset-0 -z-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(0,150,214,0.10),transparent_42%),radial-gradient(circle_at_90%_90%,rgba(22,119,242,0.08),transparent_38%)]"></div>

                    <div className={`max-w-[600px] w-full mx-auto xl:ml-16 relative z-10 transition-all duration-[1000ms] delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>

                        {/* Feature Blocks Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                            {featureBlocks.map((block, i) => (
                                <div
                                    key={i}
                                    className="rounded-[20px] border border-blue-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,80,140,0.06)] hover:-translate-y-2 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)] transition-all duration-500 group"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${0.3 + i * 0.1}s`
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-4 bg-[#f5fbff] group-hover:scale-110 transition-transform duration-300">
                                        {block.icon}
                                    </div>
                                    <h4 className="text-[#120b45] font-bold text-[15px] mb-2">{block.title}</h4>
                                    <p className="text-[#64748b] text-[12px] leading-[1.7]">{block.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href={c.primaryBtnLink} className="flex-1 text-center bg-[#1677f2] text-white font-bold text-[14px] rounded-[12px] px-6 py-4 hover:-translate-y-0.5 hover:bg-[#0866d9] shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all duration-300">
                                {c.primaryBtnText}
                            </a>
                            <a href={c.secondaryBtnLink} className="flex-1 text-center bg-white border border-blue-100 text-[#0a2b58] font-bold text-[14px] rounded-[12px] px-6 py-4 hover:border-[#1677f2] hover:text-[#1677f2] transition-all duration-300">
                                {c.secondaryBtnText}
                            </a>
                        </div>

                        <p className="text-[#94a3b8] text-[12px] text-center mt-6 italic">
                            {c.footnote}
                        </p>
                    </div>
                </div>

            </div >

        <style dangerouslySetInnerHTML={{
            __html: `
                @keyframes float {
                   0%, 100% { transform: translateY(0); }
                   50% { transform: translateY(-6px); }
                }
            `}} />
        </section >
    );
}
