"use client";
import React, { useEffect, useRef, useState } from "react";

const caseStudies = [
    {
        regulator: "🏛️ RBI",
        color: "#0096D6", // Match Fix 10 exact color 
        title: "NBFC Registration – From Doubt to Discipline",
        body: "When the founders approached us, they were unsure whether their business model and capital structure would even qualify for RBI approval. We began with clarity — restructuring documentation, refining the business plan, strengthening policy frameworks, and preparing them for every regulatory query. With structured preparation and continuous follow-up, the NBFC licence was secured within 4 months and 20 days. More than the approval, what mattered was the confidence restored along the way.",
        highlight: "⏱️ Secured in 4 months 20 days"
    },
    {
        regulator: "📊 SEBI",
        color: "#7C3AED", // Match Fix 10 exact purple
        title: "SEBI Registration – Structuring a Capital Market Vision",
        body: "An emerging investment firm approached us with ambition but limited regulatory understanding. We redesigned their operational framework, aligned their net-worth compliance, drafted required policies, and prepared them for SEBI scrutiny with precision. The registration was secured smoothly — with zero adverse observations — and a compliance system ready from day one.",
        highlight: "✅ Zero adverse observations"
    },
    {
        regulator: "🛡️ IRDAI",
        color: "#10b981", // Match Fix 10 exact green
        title: "IRDAI Licensing – Building from Foundation Up",
        body: "The promoters had strong insurance domain experience but were unfamiliar with regulatory documentation and capital structuring norms. We guided them step-by-step — from principal officer eligibility to infrastructure readiness and regulatory submissions. The licence was granted within the expected regulatory cycle, supported by a compliance framework built for long-term sustainability.",
        highlight: "🏗️ Built for long-term sustainability"
    },
    {
        regulator: "🌐 IFSCA",
        color: "#F59E0B", // Match Fix 10 exact orange
        title: "IFSCA Registration – Entering the IFSC Ecosystem",
        body: "Setting up within GIFT City requires structured planning and regulatory clarity. We supported the entity with proper office space, application drafting, governance design, and regulator-facing communication aligned with IFSCA expectations. The approval was secured with disciplined coordination, enabling the firm to commence international operations confidently.",
        highlight: "🌐 International operations launched"
    }
];

export default function CaseStudies() {
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
          <h2 className="text-[32px] md:text-[40px] font-black text-[#0a1628] leading-[1.2] mb-4 tracking-tight">
            In the News
          </h2>
          <div className="text-[18px] font-bold text-[#0096D6] mb-6">
            Regulatory Experience. Real Outcomes.
          </div>
          <p className="text-[15px] text-[#475569] leading-relaxed font-medium">
            Behind every approval is a journey of uncertainty, discipline, and structured execution. Here are a few representative engagements — shared without names, but with pride.
          </p>
        </div>

        {/* 2x2 Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-16">
          {caseStudies.map((caseStudy, index) => (
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
                style={{ backgroundColor: caseStudy.color }}
              ></div>
              
              {/* Quote Mark Watermark */}
              <div className="absolute top-6 right-6 text-[48px] font-serif text-[rgba(0,150,220,0.12)] leading-none pointer-events-none select-none">
                "
              </div>

              {/* Regulator Badge */}
              <div 
                className="inline-flex w-fit items-center px-3 py-1 rounded-full text-[12px] font-bold mb-6 shadow-sm border border-black/5"
                style={{ color: caseStudy.color, backgroundColor: `${caseStudy.color}15` }}
              >
                {caseStudy.regulator}
              </div>

              <h3 className="text-[17px] font-bold text-[#0a1628] mb-4 leading-[1.4] pr-10">
                {caseStudy.title}
              </h3>
              
              <p className="text-[13px] text-[#475569] leading-[1.8] mb-8 font-medium flex-grow">
                {caseStudy.body}
              </p>

              {/* Highlight Box */}
              <div className="mt-auto bg-gray-50/80 border border-gray-100 border-l-[3px] rounded-r-lg px-4 py-3" style={{ borderLeftColor: caseStudy.color }}>
                <span className="text-[13px] font-bold tracking-wide" style={{ color: caseStudy.color }}>
                  {caseStudy.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center font-bold text-[18px] italic text-[#0077B6] transition-all duration-700 delay-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          "Regulatory approvals are not secured by chance.<br/>
          They are earned through structure, patience, and accountability."
        </div>

      </div >
    </section >
  );
}
