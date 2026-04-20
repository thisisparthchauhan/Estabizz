"use client";
import React, { useEffect, useRef, useState } from "react";

const checklistItems = [
    "Create your secure compliance account",
    "Track all regulatory licenses and application status",
    "Upload and manage documents digitally",
    "Receive real-time compliance alerts & reminders",
    "Access ready-to-use regulatory policy templates",
    "Apply for new registrations seamlessly",
    "Monitor your compliance calendar",
    "Explore 100+ FAQs and regulatory guidance notes",
    "Manage intermediary compliance (NBFC, AIF, Broker, PA, RIA, FME, etc.)",
    "Avail exclusive registration support and structured execution"
];

const featureBlocks = [
    {
        icon: "📊",
        title: "Compliance Dashboard",
        desc: "A centralised control panel to monitor filings, approvals, deadlines, and regulatory status across authorities.",
        color: "#0096D6"
    },
    {
        icon: "🔒",
        title: "Secure Document Vault",
        desc: "Encrypted storage for statutory documents, policies, licenses, and regulatory submissions — accessible anytime.",
        color: "#10b981"
    },
    {
        icon: "📅",
        title: "Smart Compliance Calendar",
        desc: "Automated reminders for RBI, SEBI, IRDAI, IFSCA, ROC, Income Tax and other regulatory filings.",
        color: "#F59E0B"
    },
    {
        icon: "📚",
        title: "Policy & Framework Library",
        desc: "Ready-to-adopt AML, KYC, grievance redressal, risk management, internal audit and other mandatory compliance policies.",
        color: "#7C3AED"
    },
    {
        icon: "🔔",
        title: "Regulatory Alert System",
        desc: "Stay updated with regulatory circulars, notifications, and industry-specific compliance changes.",
        color: "#EF4444"
    },
    {
        icon: "📋",
        title: "Guided Application Management",
        desc: "Apply for new licenses and registrations with structured documentation guidance and expert review support.",
        color: "#0077B6"
    }
];

export default function CompliancePortal() {
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
            <div className="flex flex-col xl:flex-row min-h-[800px]">

                {/* Left Side (Light) */}
                <div className="w-full xl:w-5/12 bg-white py-24 px-6 xl:pl-0 flex justify-end">
                    <div className={`max-w-[500px] w-full xl:mr-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[11px] font-bold text-[#0096D6] uppercase tracking-[0.2em] mb-4">
                            FOR FOUNDERS, CFOs & COMPLIANCE TEAMS
                        </div>
                        <h2 className="text-[36px] md:text-[42px] font-black text-[#0a1628] leading-[1.1] mb-2">
                            COMPLIANCE PORTAL
                        </h2>
                        <div className="text-[18px] font-bold text-[#0077B6] mb-6 italic">
                            One Portal. Complete Regulatory Control.
                        </div>

                        <p className="text-[15px] text-[#475569] leading-relaxed font-medium mb-10">
                            Manage your entire compliance lifecycle through a secure, structured, and regulator-ready digital platform. From license tracking and document uploads to policy frameworks and compliance alerts — everything your business needs, in one place.
                        </p>

                        <div className="bg-[#f8faff] rounded-[20px] p-8 border border-[rgba(0,150,220,0.1)] shadow-inner">
                            <h3 className="text-[16px] font-bold text-[#0a1628] mb-6 tracking-wide">
                                What You Can Do Inside the Estabizz Portal
                            </h3>
                            <ul className="space-y-4">
                                {checklistItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm text-[10px] font-bold mt-0.5">✓</span>
                                        <span className="text-[14px] text-[#374151] leading-[1.9] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Right Side (Dark Gradient) with Feature Blocks */}
                <div className="w-full xl:w-7/12 py-24 px-6 xl:pr-0 relative flex items-center justify-center lg:justify-start" style={{ background: "linear-gradient(135deg, #0a1628, #0077B6)" }}>
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "60px 60px" }}></div>

                    <div className={`max-w-[600px] w-full mx-auto xl:ml-16 relative z-10 transition-all duration-[1000ms] delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>

                        {/* Feature Blocks Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                            {featureBlocks.map((block, i) => (
                                <div
                                    key={i}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[16px] p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${0.3 + i * 0.1}s`
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-4 group-hover:scale-110 transition-transform duration-300"
                                        style={{ backgroundColor: `${block.color}20` }}
                                    >
                                        {block.icon}
                                    </div>
                                    <h4 className="text-white font-bold text-[15px] mb-2">{block.title}</h4>
                                    <p className="text-white/60 text-[12px] leading-[1.7]">{block.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/contact" className="flex-1 text-center bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-[14px] rounded-[12px] px-6 py-4 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] transition-all duration-300">
                                Launch Your Compliance Dashboard →
                            </a>
                            <a href="/contact" className="flex-1 text-center bg-white/10 border border-white/20 text-white font-bold text-[14px] rounded-[12px] px-6 py-4 hover:bg-white/20 transition-all duration-300">
                                Create Your Account →
                            </a>
                        </div>

                        <p className="text-white/40 text-[12px] text-center mt-6 italic">
                            Compliance is no longer fragmented. It is structured, monitored, and controlled — from a single secure platform.
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
