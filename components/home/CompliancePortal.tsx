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

const dashboardCards = [
    { icon: "📂", title: "Document Vault", status: "Secure", color: "#0096D6" },
    { icon: "⚡", title: "Active Applications", status: "3 In-Progress", color: "#10b981" },
    { icon: "📅", title: "Compliance Calendar", status: "2 Due Soon", color: "#F59E0B" }
];

const activityFeeds = [
    { time: "10 mins ago", text: "SEBI Quarterly Return Filed Successfully", type: "success" },
    { time: "2 hrs ago", text: "RBI Application Status Updated to 'Under Review'", type: "info" },
    { time: "Yesterday", text: "New AML Policy Template Added to Vault", type: "neutral" },
    { time: "2 days ago", text: "Compliance Reminder: Tax Filing due in 5 days", type: "warning" },
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

                {/* Right Side (Dark Gradient) with Mockup Dashboard */}
                <div className="w-full xl:w-7/12 py-24 px-6 xl:pr-0 relative flex items-center justify-center lg:justify-start" style={{ background: "linear-gradient(135deg, #0a1628, #0077B6)" }}>
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "60px 60px" }}></div>

                    <div className={`max-w-[600px] w-full mx-auto xl:ml-16 relative z-10 transition-all duration-[1000ms] delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>

                        {/* Dark Glass Mockup Card */}
                        <div className="w-full rounded-[20px] bg-[#0f172a]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">

                            {/* Mockup Header */}
                            <div className="h-12 border-b border-[rgba(255,255,255,0.08)] flex items-center px-4 gap-2 bg-[#1e293b]/50">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                                <div className="mx-auto text-[11px] text-white/40 font-mono tracking-wider">dashboard.estabizz.com</div>
                            </div>

                            {/* Mockup Body */}
                            <div className="p-6 md:p-8 flex-grow flex flex-col gap-6">

                                {/* Top 3 Cards Area */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {dashboardCards.map((card, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col animate-[float_4s_ease-in-out_infinite]"
                                            style={{ animationDelay: `${i * 0.5}s` }}
                                      >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[16px] mb-3" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                                    {card.icon}
                                </div>
                                <div className="text-white font-bold text-[13px] mb-1">{card.title}</div>
                                <div className="text-white/50 text-[11px]">{card.status}</div>
                            </div>
                                  ))}
                        </div>

                        {/* Scrolling Activity Feed */}
                        <div className="bg-[#1e293b]/40 rounded-xl border border-white/5 p-5 mt-2 flex-grow overflow-hidden relative min-h-[220px]">
                            <div className="text-[12px] font-bold text-white/50 mb-4 uppercase tracking-wider">Live Activity Feed</div>

                            {/* Scrolling container */}
                            <div className="relative h-[160px] overflow-hidden">
                                <div className="absolute w-full animate-marquee-vertical flex flex-col gap-4">
                                    {[...activityFeeds, ...activityFeeds].map((feed, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${feed.type === 'success' ? 'bg-[#10b981]' : feed.type === 'warning' ? 'bg-[#f59e0b]' : feed.type === 'info' ? 'bg-[#0096D6]' : 'bg-white/40'}`}></div>
                                            <div>
                                                <div className="text-[13px] text-white/90 leading-snug">{feed.text}</div>
                                                <div className="text-[10px] text-white/40 mt-1">{feed.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fade masks */}
                            <div className="absolute top-12 left-0 right-0 h-6 bg-gradient-to-b from-[#1e293b]/40 to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0f172a]/95 to-transparent z-10"></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

            </div >

        <style dangerouslySetInnerHTML={{
            __html: `
                @keyframes float {
                   0%, 100% { transform: translateY(0); }
                   50% { transform: translateY(-6px); }
                }
                @keyframes marqueeVertical {
                   0% { transform: translateY(0); }
                   100% { transform: translateY(-50%); }
                }
                .animate-marquee-vertical {
                   animation: marqueeVertical 15s linear infinite;
                }
            `}} />
        </section >
    );
}
