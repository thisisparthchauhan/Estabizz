"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const regions = [
    {
        title: "India & GIFT City",
        description: "RBI, SEBI, IRDAI, IFSCA, FIU-IND and corporate compliance support from India outward.",
        markets: ["India", "GIFT IFSC", "South Asia"],
        accent: "#1677f2",
    },
    {
        title: "GCC & Middle East",
        description: "Market-entry, fintech structuring and documentation support for UAE, Saudi Arabia, Qatar and allied markets.",
        markets: ["UAE", "Saudi Arabia", "Qatar", "Oman"],
        accent: "#1677f2",
    },
    {
        title: "UK, Europe & Global Funds",
        description: "Cross-border compliance planning for fund, fintech, payments and corporate structures.",
        markets: ["UK", "EU", "Luxembourg", "Ireland"],
        accent: "#10b981",
    },
    {
        title: "APAC & North America",
        description: "Regulatory research, partner coordination and founder-ready documentation for expansion planning.",
        markets: ["Singapore", "Australia", "USA", "Canada"],
        accent: "#7C3AED",
    },
];

const orbitNodes = ["RBI", "SEBI", "IRDAI", "IFSCA", "FIU", "MCA"];

export default function GlobalMarketsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white px-5 py-20 md:px-6 lg:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(0,150,214,0.14),transparent_40%),radial-gradient(circle_at_5%_95%,rgba(22,119,242,0.10),transparent_36%)]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-[#eaf6ff]" />

            <div className="relative z-10 mx-auto grid max-w-[1240px] gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-center">
                <div
                    className="transition-all duration-700"
                    style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(28px)" }}
                >
                    <div className="mb-5 inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">
                        Global Market Desk
                    </div>
                    <h2 className="max-w-[620px] text-[clamp(32px,4.2vw,52px)] font-black leading-[1.05] tracking-[-0.03em] text-[#120b45]">
                        India-built compliance intelligence for <span className="text-[#1677f2]">global expansion.</span>
                    </h2>
                    <p className="mt-6 max-w-[620px] text-[16px] font-medium leading-[1.7] text-[#475569]">
                        Estabizz is expanding its advisory lens from India to global markets. We help founders, CFOs and regulated businesses evaluate market entry, licensing routes, documentation expectations and compliance readiness with a structured, regulator-respectful approach.
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        {[
                            ["Regulatory mapping", "Country-wise applicability review"],
                            ["Entity planning", "Structure, ownership and governance notes"],
                            ["Launch readiness", "Policies, filings and evidence packs"],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,80,140,0.06)]">
                                <div className="text-[13px] font-black text-[#120b45]">{title}</div>
                                <div className="mt-2 text-[12px] font-medium leading-relaxed text-[#64748b]">{text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-[#1677f2] px-6 py-4 text-[14px] font-black text-white shadow-[0_14px_35px_rgba(22,119,242,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0866d9]">
                            Plan Global Expansion
                        </Link>
                        <a href="https://wa.me/919825600907" className="inline-flex items-center justify-center rounded-2xl border border-blue-100 bg-white px-6 py-4 text-[14px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,70,130,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#1677f2] hover:text-[#1677f2]">
                            WhatsApp Estabizz Team
                        </a>
                    </div>
                </div>

                <div
                    className="transition-all duration-700 delay-150"
                    style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(34px)" }}
                >
                    <div className="grid gap-5 lg:grid-cols-[0.72fr_1fr]">
                        <div className="relative min-h-[480px] overflow-hidden rounded-[30px] border border-blue-100 bg-[#f8fbff] p-6 shadow-[0_16px_44px_rgba(0,80,140,0.10)]">
                            <div className="absolute inset-x-8 top-12 h-[210px] rounded-full bg-[#1677f2]/12 blur-[80px]" />
                            <div className="relative flex min-h-[360px] items-center justify-center">
                                <div className="absolute h-[280px] w-[280px] rounded-full border border-[#1677f2]/20" />
                                <div className="absolute h-[206px] w-[206px] rounded-full border border-dashed border-[#1677f2]/25 animate-[spin_18s_linear_infinite]" />
                                <div className="absolute h-[134px] w-[134px] rounded-full bg-[radial-gradient(circle,rgba(22,119,242,0.20),rgba(0,150,214,0.10)_48%,transparent_72%)] shadow-[0_0_70px_rgba(22,119,242,0.22)]" />
                                <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border border-blue-100 bg-white text-center text-[12px] font-black uppercase tracking-[0.16em] text-[#120b45] shadow-sm">
                                    Global
                                    <br />
                                    Compliance
                                </div>

                                {orbitNodes.map((node, index) => {
                                    const angle = (index / orbitNodes.length) * 360;
                                    return (
                                        <div
                                            key={node}
                                            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[10px] font-black text-[#0a2b58] shadow-[0_10px_28px_rgba(0,80,140,0.12)]"
                                            style={{ transform: `rotate(${angle}deg) translateX(136px) rotate(-${angle}deg)` }}
                                        >
                                            {node}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="relative rounded-2xl border border-blue-100 bg-[#f5fbff] px-4 py-3">
                                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#94a3b8]">Expansion Path</div>
                                <div className="mt-1 text-[18px] font-black text-[#1677f2]">India to Global</div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {regions.map((region, index) => (
                                <div
                                    key={region.title}
                                    className="group rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,80,140,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1677f2]/40 hover:shadow-[0_16px_44px_rgba(0,80,140,0.12)]"
                                    style={{ transitionDelay: `${index * 80}ms` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 h-11 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: region.accent }} />
                                        <div>
                                            <h3 className="text-[18px] font-black text-[#120b45]">{region.title}</h3>
                                            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#64748b]">{region.description}</p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {region.markets.map((market) => (
                                                    <span key={market} className="rounded-full border border-blue-100 bg-[#f5fbff] px-3 py-1.5 text-[11px] font-bold text-[#0077B6]">
                                                        {market}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
