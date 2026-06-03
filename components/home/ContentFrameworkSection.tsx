"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const cards = [
    {
        title: "Regulatory Service Pages",
        text: "Every licence page is structured with eligibility, documents, process, fees, timeline, compliance, risks and FAQs."
    },
    {
        title: "AI-Ready Compliance FAQs",
        text: "Our FAQs are written to answer real founder and client questions in clear, direct and practical language."
    },
    {
        title: "Client-Ready Proposal System",
        text: "Our browser-style proposal framework helps present regulatory scope, timelines, commercials and support clearly to clients."
    }
];

export default function ContentFrameworkSection() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.12 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="bg-[#f8faff] py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="mb-4 text-[12px] font-black uppercase tracking-[0.18em] text-[#1677f2]">Content, Compliance and Trust</div>
                    <h2 className="mb-5 text-[32px] font-black leading-tight text-[#0a1628] md:text-[42px]">Build Content, Compliance and Trust with Estabizz</h2>
                    <p className="text-[16px] font-medium leading-8 text-[#475569]">
                        Our website is designed not only to explain licences, but to help founders, CFOs and compliance teams understand regulatory obligations, approval risks, documentation expectations and post-registration compliance in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {cards.map((card, index) => (
                        <div key={card.title} className={`rounded-2xl border border-blue-100 bg-white p-7 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a1628] font-black text-white">{index + 1}</div>
                            <h3 className="mb-3 text-[19px] font-black text-[#0a1628]">{card.title}</h3>
                            <p className="text-[14px] leading-7 text-[#64748b]">{card.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/resources" className="inline-flex rounded-xl bg-gradient-to-r from-[#1677f2] to-[#0077B6] px-7 py-3.5 text-sm font-bold text-white shadow-lg">Explore Resources</Link>
                </div>
            </div>
        </section>
    );
}
