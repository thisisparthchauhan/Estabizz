"use client";
import React, { useEffect, useRef, useState } from "react";
import { CASE_STUDIES_DEFAULTS, type CaseStudiesContent } from "@/lib/content/caseStudiesDefaults";

const CARD_COLOR = "#1677f2";

export default function CaseStudies({ content }: { content?: Partial<CaseStudiesContent> }) {
    const c: CaseStudiesContent = { ...CASE_STUDIES_DEFAULTS, ...content };
    const allCases = c.cases?.length ? c.cases : CASE_STUDIES_DEFAULTS.cases;
    const cases = allCases.filter((cs) => cs.visible !== false);
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
    <section ref={sectionRef} className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {c.label && (
            <div className="mb-4 text-[12px] font-black uppercase tracking-[0.22em] text-[#0077B6]">{c.label}</div>
          )}
          <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4 tracking-tight">
            {c.heading}
          </h2>
          <div className="text-[18px] font-bold text-[#1677f2] mb-6">
            {c.subheading}
          </div>
          <p className="text-[15px] text-[#475569] leading-relaxed font-medium">
            {c.intro}
          </p>
        </div>

        {/* 2x2 Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-16">
          {cases.map((caseStudy, index) => (
            <div
              key={index}
              className={`bg-white/85 backdrop-blur-[12px] border border-[rgba(0,150,220,0.1)] rounded-[20px] p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(0,100,200,0.15)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full shadow-[0_4px_20px_rgba(0,100,200,0.07)]`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${index * 0.15}s`
              }}
            >
              {/* Top Color Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[4px]"
                style={{ backgroundColor: CARD_COLOR }}
              ></div>

              {/* Quote Mark Watermark */}
              <div className="absolute top-6 right-6 text-[48px] font-serif text-[rgba(0,150,220,0.12)] leading-none pointer-events-none select-none">
                "
              </div>

              {/* Regulator Badge */}
              <div
                className="inline-flex w-fit items-center px-3 py-1 rounded-full text-[12px] font-bold mb-6 shadow-sm border border-black/5"
                style={{ color: CARD_COLOR, backgroundColor: `${CARD_COLOR}15` }}
              >
                {caseStudy.category}
              </div>

              <h3 className="text-[17px] font-bold text-[#0a1628] mb-4 leading-[1.4] pr-10">
                {caseStudy.title}
              </h3>

              <p className="text-[13px] text-[#475569] leading-[1.8] mb-4 font-medium">
                {caseStudy.description}
              </p>

              {caseStudy.support && (
                <p className="text-[12.5px] text-[#64748b] leading-[1.7] mb-6 flex-grow">
                  <span className="font-bold text-[#0a1628]">Support provided: </span>{caseStudy.support}
                </p>
              )}

              {/* Outcome Box */}
              {caseStudy.outcome && (
                <div className="mt-auto bg-[#f5fbff] border border-blue-100 border-l-[3px] rounded-r-lg px-4 py-3" style={{ borderLeftColor: CARD_COLOR }}>
                  <span className="text-[13px] font-bold tracking-wide" style={{ color: CARD_COLOR }}>
                    {caseStudy.outcome}
                  </span>
                </div>
              )}

              {caseStudy.disclaimer && (
                <p className="mt-3 text-[11px] italic leading-relaxed text-[#94a3b8]">
                  {caseStudy.disclaimer}
                </p>
              )}
            </div>
          ))}
        </div>

        {c.disclaimer && (
          <p className="mx-auto mb-8 max-w-3xl text-center text-[12px] leading-relaxed text-[#64748b]">
            {c.disclaimer}
          </p>
        )}

        <div className={`text-center font-bold text-[18px] italic text-[#0077B6] transition-all duration-700 delay-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {c.closingLine}
        </div>

      </div >
    </section >
  );
}
