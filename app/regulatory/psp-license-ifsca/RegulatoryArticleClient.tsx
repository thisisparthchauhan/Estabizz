"use client";
import React, { useEffect, useState } from "react";

export default function RegulatoryArticleClient() {
    const [activeSection, setActiveSection] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);

    // Table of contents sections
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "legal-background", title: "2. Legal Background" },
        { id: "required-activities", title: "3. What Activities Require PSP License?" },
        { id: "who-needs", title: "4. Who Needs PSP License?" },
        { id: "capital-requirement", title: "5. Capital Requirement" },
        { id: "authorisation-process", title: "6. Authorisation Process" },
        { id: "safeguarding", title: "7. Safeguarding of Customer Funds" },
        { id: "governance", title: "8. Governance & Risk Management" },
        { id: "aml-compliance", title: "9. AML, Compliance & Reporting" },
        { id: "grievance-revocation", title: "10. Grievance & Revocation" },
        { id: "checklist", title: "11. Document Checklist" },
        { id: "escrow-third-party", title: "12. Escrow Lifecycle & Third-Party Risk" },
        { id: "timelines-comparison", title: "13. Timelines, Security Deposit & Comparison" },
        { id: "strategic-advice", title: "14. Strategic Advice & Capital Model" },
        { id: "faq-section", title: "15. FAQ Section" },
        { id: "closing-perspective", title: "16. Closing Perspective" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        entry.target.classList.add('visible');
                    }
                });
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        document.querySelectorAll("h2, h3").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="bg-[#f8faff] min-h-screen font-sans text-gray-800">
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981] z-50 transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
            ></div>

            {/* Hero Header Area */}
            <section className="relative pt-24 pb-16 px-6 lg:px-8 border-b border-blue-100 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)"
                }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                ></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <nav className="text-sm font-medium text-gray-500 mb-8 flex items-center space-x-2">
                        <a href="/" className="hover:text-[#0096D6] transition-colors">Home</a>
                        <span>&gt;</span>
                        <a href="/" className="hover:text-[#0096D6] transition-colors">IFSCA</a>
                        <span>&gt;</span>
                        <span className="text-[#0096D6]">PSP License</span>
                    </nav>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🏛️ IFSCA</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">💳 Payment Services</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">📋 Complete Guide</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">2024 Regulations</span>
                        <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🌐 GIFT City</span>
                    </div>

                    <h1 className="text-[36px] font-black text-[#0a1628] leading-[1.2] mb-6 tracking-[-0.02em] max-w-4xl">
                        PSP License – IFSCA: Complete Authorisation Guide with Critical Compliance Insights
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 font-medium mb-8">
                        <div className="flex items-center gap-1.5"><span>📅</span> 2024</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>⏱️</span> 18 min read</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>👁️</span> Regulatory Guide</div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1.5"><span>✅</span> Expert Reviewed</div>
                    </div>

                    <div className="inline-block px-4 py-2 border border-blue-200 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[#0a1628] font-semibold shadow-sm">
                        Focus: <span className="text-[#0096D6]">PSP License – IFSCA</span>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col xl:flex-row gap-10 items-start">

                {/* Left Sidebar - TOC */}
                <aside className="hidden xl:block w-[220px] shrink-0 sticky top-[80px] bg-white border border-[rgba(0,150,220,0.1)] rounded-[16px] p-5 shadow-[0_4px_20px_rgba(0,100,200,0.03)] z-10">
                    <h4 className="text-[12px] font-bold text-[#94a3b8] tracking-[0.1em] uppercase mb-4">Contents</h4>
                    <nav className="flex flex-col space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 custom-scrollbar">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => scrollToSection(e, section.id)}
                                className={`text-[13px] block py-2 pl-3 rounded-r-lg border-l-3 transition-all duration-200 ${activeSection === section.id
                                    ? "border-l-[3px] border-l-[#0096D6] bg-[rgba(0,150,220,0.06)] text-[#0096D6] font-bold"
                                    : "border-l-[3px] border-l-transparent text-[#64748b] hover:text-[#0096D6] hover:bg-blue-50/50"
                                    }`}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Mobile TOC Accordion */}
                <div className="xl:hidden w-full bg-white border border-[rgba(0,150,220,0.1)] rounded-[16px] p-5 mb-8 shadow-sm">
                    <details className="group">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-[#0096D6]">
                            <span>Contents</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <nav className="flex flex-col space-y-2 mt-4 max-h-[300px] overflow-y-auto">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => scrollToSection(e, section.id)}
                                    className="text-[14px] text-gray-600 hover:text-[#0096D6] border-b border-gray-50 pb-2"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </details>
                </div>

                {/* Center Article Content */}
                <main className="flex-1 w-full max-w-[760px] bg-white border border-[rgba(0,150,220,0.08)] rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,100,200,0.04)] article-content relative overflow-hidden">
                    <style dangerouslySetInnerHTML={{
                        __html: `
            .article-content h2 { font-size: 24px; font-weight: 800; color: #0a1628; padding: 24px 0 8px; margin-top: 48px; position: relative; scroll-margin-top: 80px; padding-left: 16px; transition: all 0.7s ease; opacity: 0; transform: translateY(24px); }
            .article-content h2.visible { opacity: 1; transform: translateY(0); }
            .article-content h2::before { content: ''; position: absolute; left: 0; top: 28px; bottom: 12px; width: 4px; background: linear-gradient(180deg, #0096D6, #10b981); border-radius: 2px; }
            .article-content h3 { font-size: 18px; font-weight: 700; color: #0077B6; padding: 16px 0 4px; scroll-margin-top: 80px; }
            .article-content p { font-size: 15px; line-height: 1.85; color: #374151; margin-bottom: 16px; }
            .article-content ul { padding-left: 8px; margin-bottom: 24px; }
            .article-content li { display: flex; align-items: flex-start; margin-bottom: 8px; font-size: 15px; color: #374151; line-height: 1.85; }
            .article-content li::before { content: '◆'; color: #0096D6; font-size: 10px; margin-right: 12px; margin-top: 6px; }
            .numbered-card { background: white; border: 1px solid rgba(0,150,220,0.1); border-radius: 12px; padding: 16px 20px; transition: all 0.3s; margin-bottom: 12px; display: flex; align-items: flex-start; gap: 16px; }
            .numbered-card:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,100,200,0.08); border-color: rgba(0,150,220,0.3); }
            .num-badge { width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg, #0096D6, #10b981); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
            .faq-accordion summary::-webkit-details-marker { display: none; }
          `}} />

                    <h2 id="introduction" className="!mt-0">Introduction</h2>
                    <p>
                        PSP License – IFSCA is the regulatory authorisation granted by the International Financial Services Centres Authority (IFSCA) to a company intending to provide payment services in or from an IFSC such as GIFT City.
                    </p>
                    <p>
                        With the introduction of the International Financial Services Centres Authority (Payment Services) Regulations, 2024 and the IFSCA (Payment and Settlement Systems) Regulations, 2024, the regulatory framework for payment businesses in IFSC has been clearly separated between:
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-6">
                        <div className="flex-1 bg-[rgba(0,150,220,0.04)] border border-[rgba(0,150,220,0.15)] border-l-[4px] border-l-[#0096D6] rounded-xl p-5 shadow-sm">
                            <h4 className="text-[#0096D6] font-bold text-[15px] mb-2">Payment Service Providers (PSPs)</h4>
                            <p className="text-[#374151] text-[14px]">Front-end service providers</p>
                        </div>
                        <div className="flex-1 bg-gray-50 border border-gray-200 border-l-[4px] border-l-[#94a3b8] rounded-xl p-5 shadow-sm">
                            <h4 className="text-gray-700 font-bold text-[15px] mb-2">Payment System Operators (PSOs)</h4>
                            <p className="text-[#374151] text-[14px]">Back-end infrastructure operators</p>
                        </div>
                    </div>
                    <p>
                        If you intend to offer wallet services, cross-border remittance, merchant aggregation, or escrow services in IFSC, obtaining a PSP License – IFSCA is mandatory.
                    </p>

                    <h2 id="legal-background">Legal Background of PSP License – IFSCA</h2>
                    <p>
                        The PSP License – IFSCA is governed primarily under:
                    </p>
                    <ul>
                        <li>IFSCA (Payment Services) Regulations, 2024</li>
                        <li>IFSCA (Payment and Settlement Systems) Regulations, 2024</li>
                        <li>IFSCA AML/CFT & KYC Guidelines, 2022</li>
                        <li>FEMA provisions (where applicable)</li>
                    </ul>
                    <p className="font-semibold text-[#0a1628] mt-6">The regulatory objective is to ensure:</p>
                    <ul>
                        <li>Financial stability</li>
                        <li>Customer fund safeguarding</li>
                        <li>Cross-border compliance</li>
                        <li>Robust risk governance</li>
                    </ul>

                    <h2 id="required-activities">What Activities Require PSP License – IFSCA?</h2>
                    <p>
                        As per Schedule I, Part A of the Payment Services Regulations, the following activities require a PSP License – IFSCA:
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-[rgba(0,150,220,0.15)] shadow-sm my-6">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] text-white">
                                    <th className="p-4 text-[13px] font-bold w-3/4">Activity</th>
                                    <th className="p-4 text-[13px] font-bold text-center">Required?</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px]">
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151]">Account Issuance Services (including e-money accounts)</td>
                                    <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">✓ Yes</span></td>
                                </tr>
                                <tr className="bg-[#fafbff] border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151]">E-Money Issuance Services</td>
                                    <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">✓ Yes</span></td>
                                </tr>
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151]">Escrow Services</td>
                                    <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">✓ Yes</span></td>
                                </tr>
                                <tr className="bg-[#fafbff] border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151]">Cross-Border Money Transfer Services</td>
                                    <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">✓ Yes</span></td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-4 font-semibold text-[#374151]">Merchant Acquisition Services</td>
                                    <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">✓ Yes</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-[rgba(245,158,11,0.06)] border border-amber-200 border-l-[4px] border-l-[#F59E0B] rounded-xl p-6 my-6">
                        <h4 className="text-[#F59E0B] font-bold text-[16px] mb-3 flex items-center gap-2">⚠️ Important Clarifications</h4>
                        <div className="space-y-2 text-[#374151] text-[15px]">
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">•</span> Payment Gateway (technical support only) is excluded</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">•</span> Banks and IBUs are exempt</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">•</span> Cryptocurrency storage is not permitted</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">•</span> E-wallet cannot hold INR</div>
                        </div>
                    </div>

                    <h2 id="who-needs">Who Needs PSP License – IFSCA?</h2>
                    <p>A PSP License – IFSCA is required if:</p>
                    <ul>
                        <li>You provide payment services "in or from" IFSC</li>
                        <li>You have a place of business in IFSC</li>
                        <li>You operate wallets, cross-border remittance, escrow or merchant aggregation</li>
                    </ul>

                    <h3 className="mt-6">Entities Exempted</h3>
                    <div className="bg-gray-50 border border-gray-200 border-l-[4px] border-l-[#94a3b8] rounded-xl p-5 mb-6 text-[15px] text-[#374151]">
                        Banks, IFSC Banking Units (IBUs), and other entities carrying out these clearing or settlement services strictly within the regulatory exception list provided by IFSCA.
                    </div>

                    <h3 className="mt-6">Legal Form Requirement for PSP License – IFSCA</h3>
                    <p>To obtain a PSP License – IFSCA, the applicant must:</p>
                    <ul>
                        <li>Be incorporated as a Company</li>
                        <li>Have its Registered Office in IFSC</li>
                        <li>Maintain a physical place of business in IFSC</li>
                    </ul>

                    <h2 id="capital-requirement">Capital Requirement for PSP License – IFSCA</h2>
                    <p>As per Schedule V:</p>

                    <div className="flex flex-col md:flex-row gap-5 my-8">
                        <div className="flex-1 bg-white border-2 border-[rgba(0,150,220,0.2)] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0096D6] mb-4 text-xl">📊</div>
                            <h4 className="font-bold text-[#0a1628] text-[18px] mb-4">Capital Structure – Regular PSP</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="text-[14px] text-gray-500">Commencement</span>
                                    <span className="font-bold text-[#0096D6]">USD 100,000</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[14px] text-gray-500">By Year 3</span>
                                    <span className="font-bold text-[#0096D6]">USD 200,000</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-gradient-to-br from-[#f8faff] to-[#eff6ff] border-2 border-[rgba(0,150,220,0.4)] rounded-2xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#0096D6] opacity-5 rounded-bl-[100px]"></div>
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-[#0077B6] mb-4 text-xl">🚀</div>
                            <h4 className="font-bold text-[#0a1628] text-[18px] mb-4">Capital Structure – Significant PSP (SPSP)</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                                    <span className="text-[14px] text-gray-600">Within 90 days</span>
                                    <span className="font-bold text-[#0077B6]">USD 250,000</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[14px] text-gray-600">By Year 3</span>
                                    <span className="font-bold text-[#0077B6]">USD 500,000</span>
                                </div>
                            </div>
                            <div className="mt-4 text-[13px] bg-[rgba(245,158,11,0.1)] text-amber-700 px-3 py-2 rounded-lg border border-amber-200">
                                <span className="font-bold">Note:</span> IFSCA designates — you cannot apply separately.
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-8">Net Worth Includes:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-[14px]"><span className="text-green-500 font-bold">✓</span> Paid-up Equity</div>
                                <div className="flex items-start gap-2 text-[14px]"><span className="text-green-500 font-bold">✓</span> Compulsorily Convertible Preference Shares</div>
                                <div className="flex items-start gap-2 text-[14px]"><span className="text-green-500 font-bold">✓</span> Free Reserves</div>
                                <div className="flex items-start gap-2 text-[14px]"><span className="text-green-500 font-bold">✓</span> Share Premium</div>
                                <div className="flex items-start gap-2 text-[14px]"><span className="text-green-500 font-bold">✓</span> Capital Reserves <span className="text-gray-500 text-[12px] ml-1">(excluding revaluation)</span></div>
                            </div>
                        </div>
                        <div className="bg-red-50/50 border border-red-100 rounded-xl p-5">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-red-500 font-bold">✗</span> Revaluation Reserves</div>
                                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-red-500 font-bold">✗</span> Borrowed Funds</div>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-4">Significant PSP (SPSP) Thresholds</h3>
                    <p>
                        If transaction volumes exceed thresholds: IFSCA designates — you cannot apply separately.
                    </p>
                    <h2 id="authorisation-process">PSP License – IFSCA Authorisation Process</h2>
                    <div className="mt-8 relative pl-6 border-l-2 border-dashed border-blue-200">
                        {[
                            { s: "Step 1", title: "Pre-Consultation with IFSCA", desc: "Initial discussion parameters and business model presentation." },
                            { s: "Step 2", title: "Application Submission", desc: "Filing of form with all requisite corporate and business documentation." },
                            { s: "Step 3", title: "Scrutiny & Clarifications", desc: "Regulator reviews and seeks additional information if needed." },
                            { s: "Step 4", title: "In-Principle Approval", desc: "Conditional approval to proceed with setup." },
                            { s: "Step 5", title: "IFSC Company Formation", desc: "Incorporation of the GIFT City entity (if not already done)." },
                            { s: "Step 6", title: "Capital Infusion", desc: "Bringing in the minimum required commencement capital." },
                            { s: "Step 7", title: "Compliance Confirmation", desc: "Final confirmation of infrastructure, policies and systems." },
                            { s: "Step 8", title: "Certificate of Authorisation", desc: "Formal license granted by IFSCA." },
                            { s: "Step 9", title: "Commencement", desc: "Start of operations (must be within 6 months of certificate)." }
                        ].map((step, i) => (
                            <div key={i} className="mb-8 relative z-10">
                                <div className={`absolute -left-[35px] top-4 w-4 h-4 rounded-full shadow-[0_0_0_4px_white] ${i === 8 ? 'bg-gradient-to-r from-[#10b981] to-[#059669]' : 'bg-gradient-to-r from-[#0096D6] to-[#0077B6]'}`}></div>
                                <div className={`bg-white border-l-[3px] rounded-r-xl p-5 shadow-sm border-t border-r border-b border-gray-100 hover:shadow-md transition duration-300 ${i === 8 ? 'border-l-[#10b981]' : 'border-l-[#0096D6]'}`}>
                                    <div className={`text-[12px] font-bold uppercase tracking-wider mb-1 ${i === 8 ? 'text-[#10b981]' : 'text-[#0096D6]'}`}>{step.s}</div>
                                    <h4 className="text-[15px] font-bold text-[#0a1628] mb-2">{step.title}</h4>
                                    <p className="text-[13px] text-[#64748b] !margin-0 !mb-0">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-5 my-6 flex items-start gap-4 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-lg shrink-0">
                            8️⃣
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0a1628] mb-1">Application Fees</h4>
                            <ul className="!mb-0">
                                <li className="!mb-1 text-[13px]">Non-refundable application fee (as specified by Authority)</li>
                                <li className="!mb-0 text-[13px]">Security Deposit (if required under Regulation 10(4))</li>
                            </ul>
                        </div>
                    </div>

                    <h2 id="safeguarding">Safeguarding of Customer Funds</h2>
                    <p>Under Schedule VI:</p>
                    <h3 className="mt-4">Mandatory Safeguarding Mechanism:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#0096D6] transition-colors">
                            <div className="text-[20px] mb-2">📄</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Undertaking</h4>
                            <p className="text-[13px] text-gray-500 mt-1">From safeguarding institution</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#0096D6] transition-colors">
                            <div className="text-[20px] mb-2">🏦</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Bank Guarantee</h4>
                            <p className="text-[13px] text-gray-500 mt-1">Issued by recognised bank</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#0096D6] transition-colors">
                            <div className="text-[20px] mb-2">⚖️</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Trust Account</h4>
                            <p className="text-[13px] text-gray-500 mt-1">Formal trust arrangement</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#0096D6] transition-colors">
                            <div className="text-[20px] mb-2">💼</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Escrow Account</h4>
                            <p className="text-[13px] text-gray-500 mt-1">Maintained with IBU</p>
                        </div>
                    </div>

                    <div className="bg-[rgba(239,68,68,0.04)] border border-red-200 border-l-[4px] border-l-[#ef4444] rounded-xl p-6 my-6">
                        <h4 className="text-[#ef4444] font-bold text-[16px] mb-3">Key Restrictions:</h4>
                        <div className="space-y-2 text-[#374151] text-[14px]">
                            <div className="flex items-start gap-2"><span className="text-[#ef4444] shrink-0 font-bold">•</span> No lending of customer funds</div>
                            <div className="flex items-start gap-2"><span className="text-[#ef4444] shrink-0 font-bold">•</span> No interest on e-wallet balances</div>
                            <div className="flex items-start gap-2"><span className="text-[#ef4444] shrink-0 font-bold">•</span> No cash withdrawal from wallet</div>
                            <div className="flex items-start gap-2"><span className="text-[#ef4444] shrink-0 font-bold">•</span> Escrow balance must match outstanding e-money</div>
                        </div>
                    </div>

                    <h2 id="governance">Governance & Risk Management Framework</h2>
                    <p>PSP License – IFSCA requires:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                        <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-50 text-[#0096D6] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📜</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Documented Governance Framework</h4>
                        </div>
                        <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-50 text-[#0096D6] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🛡️</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Board-approved Risk Policy</h4>
                        </div>
                        <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-50 text-[#0096D6] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">⚙️</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Operational Risk Controls</h4>
                        </div>
                        <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-50 text-[#0096D6] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🚪</div>
                            <h4 className="font-bold text-[#0a1628] text-[14px]">Exit strategy for outsourced providers</h4>
                        </div>
                    </div>

                    <h2 id="aml-compliance">AML, Compliance & Reporting</h2>
                    <p>Under Regulation 24:</p>
                    <div className="bg-[rgba(0,150,220,0.04)] border border-blue-100 border-l-[4px] border-l-[#0096D6] rounded-xl p-6 my-6">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">1</div>
                                <div className="text-[14px] text-[#374151] pt-0.5">Mandatory AML/CFT compliance</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">2</div>
                                <div className="text-[14px] text-[#374151] pt-0.5">KYC as per IFSCA Guidelines</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">3</div>
                                <div className="text-[14px] text-[#374151] pt-0.5">10-year transaction record retention</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">4</div>
                                <div className="text-[14px] text-[#374151] pt-0.5">Quarterly net worth statement</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">5</div>
                                <div className="text-[14px] text-[#374151] pt-0.5">Annual audited financial submission (within 3 months)</div>
                            </div>
                        </div>
                    </div>

                    <h2 id="grievance-revocation">Grievance Redressal & Dispute Resolution</h2>
                    <div className="mt-6 flex flex-col gap-3">
                        <div className="numbered-card">
                            <div className="num-badge">⏳</div>
                            <div>
                                <strong className="text-[#0a1628] block mb-1">30-day resolution requirement</strong>
                            </div>
                        </div>
                        <div className="numbered-card">
                            <div className="num-badge">⚖️</div>
                            <div>
                                <strong className="text-[#0a1628] block mb-1">Online conciliation/arbitration mechanism</strong>
                            </div>
                        </div>
                        <div className="numbered-card">
                            <div className="num-badge">🎧</div>
                            <div>
                                <strong className="text-[#0a1628] block mb-1">Dedicated grievance channels</strong>
                            </div>
                        </div>
                        <div className="numbered-card">
                            <div className="num-badge">📄</div>
                            <div>
                                <strong className="text-[#0a1628] block mb-1">Disclosure requirements under Schedule VII</strong>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-8">Revocation & Surrender Conditions</h3>
                    <p>IFSCA may revoke PSP License – IFSCA if:</p>
                    <ul>
                        <li>Regulatory non-compliance</li>
                        <li>Customer interest compromised</li>
                        <li>AML violations</li>
                        <li>Governance failure</li>
                    </ul>

                    <p className="font-semibold text-[#0a1628] mt-6">Surrender requires:</p>
                    <ul>
                        <li>Board resolution</li>
                        <li>CA certificate</li>
                        <li>No-liability confirmation</li>
                        <li>Public notice (if operational)</li>
                    </ul>

                    <h3 className="mt-8">📈 Business Plan Requirement (Practical Structuring)</h3>
                    <p>While regulations do not prescribe a fixed template, practically the Authority expects:</p>
                    <ul>
                        <li>3-year revenue projection</li>
                        <li>Transaction volume forecast</li>
                        <li>Risk mitigation plan</li>
                        <li>Capital adequacy projection</li>
                        <li>Safeguarding structure</li>
                        <li>Technology architecture</li>
                    </ul>

                    <div className="bg-[rgba(245,158,11,0.04)] border border-amber-200 border-l-[4px] border-l-[#F59E0B] rounded-xl p-6 my-6">
                        <h4 className="text-[#F59E0B] font-bold text-[16px] mb-3">⚠️ Common Mistakes in PSP License – IFSCA Applications</h4>
                        <div className="space-y-2 text-[#374151] text-[14px]">
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">⚠️</span> Insufficient capital proof during application phase.</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">⚠️</span> Weak or non-existent AML framework documents.</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">⚠️</span> Unclear safeguarding structures for escrow accounts.</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">⚠️</span> Business models overlapping with banking activities like lending.</div>
                            <div className="flex items-start gap-2"><span className="text-[#F59E0B] shrink-0 font-bold">⚠️</span> Lack of clarity in cross-border settlement flows.</div>
                        </div>
                    </div>

                    <div className="relative mt-8 mb-6 p-7 md:p-8 rounded-2xl border border-[rgba(0,150,220,0.15)] border-l-[5px] border-l-[#0096D6]"
                        style={{ background: "linear-gradient(135deg, rgba(0,150,220,0.06), rgba(16,185,129,0.04))" }}
                    >
                        <div className="absolute top-4 left-4 text-[72px] leading-none text-[rgba(0,150,220,0.15)] font-serif italic max-h-[40px] overflow-hidden select-none pointer-events-none">"</div>
                        <p className="relative z-10 text-[16px] leading-[1.8] text-[#0a1628] italic font-medium mb-6 mt-4">
                            "Regulation is not merely about permission; it is about building a structure strong enough to protect trust. A PSP that respects governance from day one rarely faces enforcement on day hundred."
                        </p>
                        <div className="flex items-center gap-4 border-t border-[rgba(0,150,220,0.1)] pt-5">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">DK</div>
                            <div>
                                <div className="font-bold text-[14px] text-[#0a1628] flex items-center gap-2">CS Devyani Khambhati <span className="bg-white border border-green-200 text-green-700 text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">✅ Expert</span></div>
                                <div className="text-[12px] text-[#0096D6] font-medium mt-0.5">Compliance Expert</div>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-8">🎯 Why Professional Structuring Improves Approval Probability</h3>
                    <p>A well-structured PSP License – IFSCA application:</p>
                    <ul>
                        <li>Anticipates safeguarding concerns</li>
                        <li>Demonstrates capital sustainability</li>
                        <li>Aligns business model with Schedule I limits</li>
                        <li>Addresses AML expectations proactively</li>
                        <li>Reduces clarification cycles</li>
                    </ul>
                    <p>
                        The PSP License – IFSCA is not just a registration—it is a structured regulatory framework designed to ensure payment businesses operating in IFSC meet global standards of governance, financial soundness, and consumer protection.
                    </p>
                    <p>
                        For fintech founders, remittance operators, merchant aggregators, and wallet providers looking at GIFT City, securing a PSP License – IFSCA requires careful regulatory interpretation, capital planning, and compliance architecture from inception.
                    </p>
                    <h2 id="checklist">Detailed Document Checklist for PSP License – IFSCA</h2>
                    <p>
                        While the Authority prescribes the application format separately (as referred in FAQs), the documentation for a PSP License – IFSCA generally includes the following:
                    </p>

                    <div className="space-y-4 my-6">
                        <details className="group bg-white border border-[rgba(0,150,220,0.15)] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center gap-3 p-4 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[18px]">📑</span>
                                <span className="flex-1">A. Promoter & Shareholding Documents</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Entity incorporation documents</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Shareholding pattern and promoter details</div>
                                </div>
                            </div>
                        </details>

                        <details className="group bg-white border border-[rgba(0,150,220,0.15)] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center gap-3 p-4 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[18px]">📑</span>
                                <span className="flex-1">B. Fit & Proper Documentation (Schedule II Compliance)</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <p className="text-[14px] text-[#64748b] mb-3">Each director, KMP, and controlling shareholder must undergo this evaluation.</p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> KYC and background declarations</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Non-conviction certificates</div>
                                </div>
                            </div>
                        </details>

                        <details className="group bg-white border border-[rgba(0,150,220,0.15)] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center gap-3 p-4 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[18px]">📑</span>
                                <span className="flex-1">C. Business Plan & Financial Forecast (Mandatory in Practice)</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <p className="text-[14px] text-[#64748b] mb-3">For a strong PSP License – IFSCA application, the business plan should include:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> 3-Year Projected Revenue</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> 3-Year Projected Transaction Volume</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Break-even analysis</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Capital deployment strategy</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Cost structure</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Risk management matrix</div>
                                </div>
                            </div>
                        </details>

                        <details className="group bg-white border border-[rgba(0,150,220,0.15)] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center gap-3 p-4 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[18px]">📑</span>
                                <span className="flex-1">D. Technology & Operational Documents</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> IT architecture and cyber security framework</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Operational flow diagrams</div>
                                </div>
                            </div>
                        </details>

                        <details className="group bg-white border border-[rgba(0,150,220,0.15)] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center gap-3 p-4 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[18px]">📑</span>
                                <span className="flex-1">E. Safeguarding & Escrow Documents (Schedule VI)</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Draft agreements with safeguarding institutions</div>
                                    <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#0096D6] font-bold">☐</span> Escrow account mandates</div>
                                </div>
                            </div>
                        </details>
                    </div>

                    <h2 id="escrow-third-party">Escrow & Safeguarding Lifecycle (Critical for PSP License – IFSCA)</h2>
                    <p>Under Schedule VI:</p>

                    <div className="my-8 flex flex-col items-center">
                        {[
                            "Customer Funds Received",
                            "Funds Segregated",
                            "Escrow Deposit (Next Business Day)",
                            "Daily Reconciliation",
                            "Merchant Settlement / Refund",
                            "Escrow Balance Alignment"
                        ].map((step, i) => (
                            <React.Fragment key={i}>
                                <div className="w-full max-w-[400px] bg-white border-2 border-green-100 rounded-xl p-4 text-center shadow-sm relative z-10 hover:border-green-300 hover:shadow-md transition">
                                    <span className="text-green-600 font-bold text-[14px]">{step}</span>
                                </div>
                                {i < 5 && (
                                    <div className="h-8 w-0.5 bg-green-200 relative z-0">
                                        <div className="absolute bottom-[-4px] left-[-3px] w-2 h-2 border-r-2 border-b-2 border-green-300 transform rotate-45"></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <p className="font-semibold text-[#0a1628]">Important Regulatory Points:</p>
                    <ul>
                        <li>Escrow balance must never fall below outstanding e-money</li>
                        <li>Separate escrow per payment service</li>
                        <li>No use of funds for lending</li>
                        <li>No interest credit to wallet holders</li>
                        <li>No cash withdrawal facility</li>
                    </ul>

                    <h3 className="mt-8">Third-Party Risk Management (Outsourcing Controls)</h3>
                    <p>
                        IFSCA places strong emphasis on vendor governance.
                    </p>
                    <p className="font-semibold text-[#0a1628] mt-4">PSP must:</p>
                    <ul>
                        <li>Identify critical third-party services</li>
                        <li>Conduct due diligence</li>
                        <li>Include regulatory inspection rights</li>
                        <li>Create exit strategy</li>
                        <li>Monitor financial strength of vendor</li>
                        <li>Maintain third-party relationship register</li>
                    </ul>

                    <h2 id="timelines-comparison">1️⃣7️⃣ Ongoing Compliance Calendar – PSP License – IFSCA</h2>

                    <div className="overflow-x-auto rounded-xl border border-[rgba(0,150,220,0.15)] shadow-sm my-6">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] text-white">
                                    <th className="p-4 text-[13px] font-bold">Frequency</th>
                                    <th className="p-4 text-[13px] font-bold">Requirement</th>
                                    <th className="p-4 text-[13px] font-bold">Authority</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px]">
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#0096D6]">Daily</td>
                                    <td className="p-4 text-[#374151]">Escrow Reconciliation</td>
                                    <td className="p-4 text-[#64748b]">Internal</td>
                                </tr>
                                <tr className="bg-[#fafbff] border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#0096D6]">Quarterly</td>
                                    <td className="p-4 text-[#374151]">Net Worth Statement</td>
                                    <td className="p-4 text-[#64748b]">IFSCA</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#0096D6]">Annually</td>
                                    <td className="p-4 text-[#374151]">Audited Financials</td>
                                    <td className="p-4 text-[#64748b]">IFSCA (within 3 months)</td>
                                </tr>
                                <tr className="bg-[#fafbff]">
                                    <td className="p-4 font-semibold text-[#0096D6]">Ongoing</td>
                                    <td className="p-4 text-[#374151]">AML/CFT Monitoring</td>
                                    <td className="p-4 text-[#64748b]">FIU / IFSCA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-8">Timeline for PSP License – IFSCA Approval</h3>
                    <p>As per Regulation 10:</p>
                    <ul>
                        <li>Target processing: ~6 months</li>
                        <li>In-principle stage: Case dependent</li>
                        <li>Commencement required within 6 months from Certificate</li>
                        <li>One-time extension possible (maximum 3 months)</li>
                    </ul>

                    <h3 className="mt-8">Security Deposit – When Required?</h3>
                    <div className="bg-[rgba(0,150,220,0.04)] border border-[rgba(0,150,220,0.15)] rounded-xl p-5 my-6">
                        <p className="mb-2 text-[#374151]">Under Regulation 10(4):</p>
                        <p className="font-semibold text-[#0a1628] mb-2">IFSCA may require security deposit if:</p>
                        <ul className="!mb-4">
                            <li>Business model complexity</li>
                            <li>High cross-border exposure</li>
                            <li>High volume transaction model</li>
                            <li>Risk-sensitive structure</li>
                        </ul>
                        <p className="italic font-bold text-[#0077B6] !mb-0 text-[14px]">
                            Key Insight: Security deposit is not insurance. It may be used only for outstanding customer claims in specific situations.
                        </p>
                    </div>

                    <h3 className="mt-8">Comparison: PSP License – IFSCA vs RBI Payment Aggregator</h3>
                    <div className="overflow-x-auto rounded-xl shadow-[0_4px_20px_rgba(0,100,200,0.08)] border border-[rgba(0,150,220,0.1)] my-6">
                        <div className="bg-blue-50 py-2 px-4 text-xs font-bold text-[#0096D6] uppercase tracking-wider flex items-center gap-2">
                            <span>📊 Comparison Table</span>
                        </div>
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] text-white">
                                    <th className="p-4 text-[13px] font-bold w-1/3">Particulars</th>
                                    <th className="p-4 text-[13px] font-bold w-1/3">PSP IFSCA</th>
                                    <th className="p-4 text-[13px] font-bold w-1/3">RBI PA</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px]">
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Regulator</td>
                                    <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">IFSCA</td>
                                    <td className="p-4 text-[#64748b]">RBI</td>
                                </tr>
                                <tr className="bg-[#fafbff] border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Primary Currency</td>
                                    <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Foreign Currencies</td>
                                    <td className="p-4 text-[#64748b]">INR</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Min Capital</td>
                                    <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">USD 100,000</td>
                                    <td className="p-4 text-[#64748b]">INR 15 Crore</td>
                                </tr>
                                <tr className="bg-[#fafbff] border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Year 3 Capital</td>
                                    <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">USD 200,000</td>
                                    <td className="p-4 text-[#64748b]">INR 25 Crore</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-100">
                                    <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Escrow Required</td>
                                    <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Yes (with IBU)</td>
                                    <td className="p-4 text-[#64748b]">Yes (with Scheduled Bank)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-8">Regulatory Inspection Powers</h3>
                    <div className="flex flex-col md:flex-row gap-5 my-6">
                        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h4 className="font-bold text-[#0a1628] mb-3 text-[15px]">IFSCA may:</h4>
                            <ul className="text-[13px]">
                                <li>Conduct audit</li>
                                <li>Inspect PSP and third-party vendors</li>
                                <li>Call for documents</li>
                                <li>Issue directions</li>
                                <li>Initiate enforcement action</li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h4 className="font-bold text-[#0a1628] mb-3 text-[15px]">Failure may result in:</h4>
                            <ul className="text-[13px]">
                                <li>Penalty</li>
                                <li>Revocation</li>
                                <li>Security deposit appropriation</li>
                                <li>Restrictions on operations</li>
                            </ul>
                        </div>
                    </div>

                    <h2 id="strategic-advice">Strategic Structuring Advice for Founders</h2>
                    <div className="bg-[rgba(16,185,129,0.04)] border border-green-200 border-l-[4px] border-l-[#10b981] rounded-xl p-6 my-6">
                        <p className="mb-4 text-[#374151] font-medium">When applying for a PSP License – IFSCA, promoters should:</p>
                        <div className="space-y-2 text-[#374151] text-[15px]">
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Design escrow model early</div>
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Align business model strictly to Schedule I</div>
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Avoid hybrid lending + PSP models</div>
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Prepare stress-tested capital plan</div>
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Document AML & KYC framework in detail</div>
                            <div className="flex items-start gap-2"><span className="text-[#10b981] shrink-0 font-bold">✔</span> Prepare exit and contingency plan</div>
                        </div>
                    </div>

                    <h3 className="mt-8">2️⃣3️⃣ Practical Capital Forecasting Model (Illustrative)</h3>
                    <p>Example:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 my-4 text-[14px]">
                        <p className="text-gray-600 italic">A forward-looking buffer improves regulatory comfort.</p>
                    </div>
                    <h3 className="mt-8">Frequently Raised Regulatory Queries (From FAQs)</h3>
                    <ul>
                        <li><strong className="text-[#0a1628]">Can a foreign parent apply?</strong> → Yes</li>
                        <li><strong className="text-[#0a1628]">Can PSP lend money?</strong> → No</li>
                        <li><strong className="text-[#0a1628]">Can wallet store crypto?</strong> → No</li>
                        <li><strong className="text-[#0a1628]">Can PSP hold INR?</strong> → No</li>
                        <li><strong className="text-[#0a1628]">Can PSP operate outside IFSC?</strong> → Only with approval</li>
                        <li><strong className="text-[#0a1628]">Is designation automatic?</strong> → Yes, upon threshold crossing</li>
                    </ul>

                    <h2 id="closing-perspective">Closing Perspective</h2>
                    <p>
                        The PSP License – IFSCA framework reflects a principle-based regulatory philosophy. It allows innovation in cross-border fintech models while maintaining strict:
                    </p>
                    <ul>
                        <li>Capital discipline</li>
                        <li>Escrow safeguarding</li>
                        <li>AML supervision</li>
                        <li>Governance accountability</li>
                    </ul>
                    <p>
                        For fintech entrepreneurs entering IFSC, the opportunity is significant—but so is the compliance expectation.
                    </p>

                    <p className="mt-6 text-sm text-gray-500 italic">Continuing further with the advanced, structured expansion on:</p>

                    <h3 className="mt-6 text-[#0077B6]">🔹 Basic Regulatory FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">1. What is PSP License – IFSCA?</strong>
                            <p className="text-[14px]">PSP License – IFSCA is the authorisation granted by IFSCA to a company incorporated in IFSC to provide specified payment services under the Payment Services Regulations, 2024.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">2. Is PSP License – IFSCA mandatory for cross-border remittance?</strong>
                            <p className="text-[14px]">Yes. Any entity providing cross-border money transfer in or from IFSC must obtain PSP License – IFSCA unless exempt.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">3. Can an LLP apply for PSP License – IFSCA?</strong>
                            <p className="text-[14px]">No. Only a company incorporated with registered office in IFSC is eligible.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">4. Is the authorisation perpetual?</strong>
                            <p className="text-[14px]">Yes. The authorisation remains valid unless revoked or surrendered.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">5. What is the difference between PSP and PSO?</strong>
                            <p className="text-[14px]">PSP operates at front-end (wallet, remittance, merchant services), while PSO operates payment systems (clearing/settlement backend).</p>
                        </div>
                    </div>

                    <h3 className="mt-6 text-[#0077B6]">🔹 Capital & Net Worth FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">6. What is minimum capital for PSP License – IFSCA?</strong>
                            <p className="text-[14px]">USD 100,000 at commencement for Regular PSP.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">7. When does capital increase?</strong>
                            <p className="text-[14px]">By third financial year to USD 200,000.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">8. What if PSP becomes Significant PSP?</strong>
                            <p className="text-[14px]">Net worth must reach USD 250,000 within 90 days and USD 500,000 by third year.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">9. Can revaluation reserves be counted?</strong>
                            <p className="text-[14px]">No. Only specified components of net worth qualify.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">10. Can capital be in any currency?</strong>
                            <p className="text-[14px]">Equivalent in specified foreign currency.</p>
                        </div>
                    </div>

                    <h3 className="mt-6 text-[#0077B6]">🔹 Escrow & Safeguarding FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">11. Is escrow mandatory for PSP License – IFSCA?</strong>
                            <p className="text-[14px]">Yes, for specified payment services under Schedule VI.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">12. When must funds be deposited?</strong>
                            <p className="text-[14px]">By next business day after receipt.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">13. Can PSP use escrow funds for working capital?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">14. Can wallet balances earn interest?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">15. Can wallet balance be withdrawn in cash?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                    </div>

                    <h3 className="mt-6 text-[#0077B6]">🔹 E-Wallet FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">16. Can wallet hold INR?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">17. Which currencies are allowed?</strong>
                            <p className="text-[14px]">USD, EUR, GBP, JPY, etc.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">18. Can wallet store cryptocurrency?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">19. Is topping up wallet by third party considered PSP activity?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">20. Is there cap on wallet storage?</strong>
                            <p className="text-[14px]">No fixed cap; risk-based approach.</p>
                        </div>
                    </div>

                    <h3 className="mt-6 text-[#0077B6]">🔹 Governance & AML FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">21. Is AML compliance mandatory?</strong>
                            <p className="text-[14px]">Yes.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">22. Are agents allowed?</strong>
                            <p className="text-[14px]">Yes, but PSP remains responsible.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">23. How long must transaction data be preserved?</strong>
                            <p className="text-[14px]">Minimum 10 years.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">24. Is third-party outsourcing allowed?</strong>
                            <p className="text-[14px]">Yes, with strict due diligence.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">25. Can PSP lend money?</strong>
                            <p className="text-[14px]">No.</p>
                        </div>
                    </div>

                    <h3 className="mt-6 text-[#0077B6]">🔹 Operational FAQs</h3>
                    <div className="space-y-4 my-4">
                        <div>
                            <strong className="text-[#0a1628] block">26. What is timeline for PSP License – IFSCA approval?</strong>
                            <p className="text-[14px]">Target disposal within 6 months.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">27. Must operations start within 6 months?</strong>
                            <p className="text-[14px]">Yes.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">28. Is extension possible?</strong>
                            <p className="text-[14px]">Yes, once, up to 3 months.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">29. Can foreign parent apply?</strong>
                            <p className="text-[14px]">Yes.</p>
                        </div>
                        <div>
                            <strong className="text-[#0a1628] block">30. Is security deposit compulsory?</strong>
                            <p className="text-[14px]">Discretionary.</p>
                        </div>
                    </div>

                    <h3 className="mt-8">Draft Board Resolution (Indicative)</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4 italic text-[#374151] font-serif">
                        “RESOLVED THAT pursuant to the provisions of the IFSCA (Payment Services) Regulations, 2024, the Company do hereby approve submission of application for grant of PSP License – IFSCA and authorise Mr./Ms. _______ to sign and submit all documents, declarations and undertakings in this regard.”
                    </div>

                    <h3 className="mt-8">FEMA Advisory Note (If Indian Promoter)</h3>
                    <p>If Indian resident entity intends to set up IFSC subsidiary:</p>
                    <ul>
                        <li>ODI compliance required</li>
                        <li>FEMA reporting</li>
                        <li>Capital infusion compliance</li>
                        <li>Transfer pricing documentation</li>
                        <li>Cross-border funding structure planning</li>
                    </ul>
                    <p className="font-semibold text-[#0a1628]">IFSCA clarifies IFSC entity is treated as “person resident outside India”.</p>

                    <h3 className="mt-8">Enforcement & Revocation Triggers</h3>
                    <p>IFSCA may revoke PSP License – IFSCA if:</p>
                    <ul>
                        <li>Safeguarding breach</li>
                        <li>AML violation</li>
                        <li>Misleading disclosure</li>
                        <li>Governance failure</li>
                        <li>Net worth erosion</li>
                    </ul>

                    <h3 className="mt-8">Final Strategic Summary</h3>
                    <p>The PSP License – IFSCA regime is:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> Principle-based</div>
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> Capital disciplined</div>
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> AML intensive</div>
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> Escrow centric</div>
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> Governance driven</div>
                        <div className="bg-white border border-gray-100 rounded-lg p-3 text-center text-[13px] font-semibold text-[#0a1628] shadow-sm"><span className="text-[#10b981]">✔</span> Cross-border oriented</div>
                    </div>
                    <p>It allows fintech innovation—but expects institutional-grade compliance.</p>

                    <h3 className="mt-8">Closing Expert Reflection</h3>
                    <div className="relative mt-6 mb-8 p-7 md:p-8 rounded-2xl border border-[rgba(0,150,220,0.15)] border-l-[5px] border-l-[#0096D6]"
                        style={{ background: "linear-gradient(135deg, rgba(0,150,220,0.06), rgba(16,185,129,0.04))" }}
                    >
                        <div className="absolute top-4 left-4 text-[72px] leading-none text-[rgba(0,150,220,0.15)] font-serif italic max-h-[40px] overflow-hidden select-none pointer-events-none">"</div>
                        <p className="relative z-10 text-[16px] leading-[1.8] text-[#0a1628] italic font-medium mb-6 mt-4">
                            "True regulatory strength lies not in restriction, but in disciplined freedom. A PSP structured with foresight earns regulatory confidence long before its first transaction."
                        </p>
                        <div className="flex items-center gap-4 border-t border-[rgba(0,150,220,0.1)] pt-5">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">DK</div>
                            <div>
                                <div className="font-bold text-[14px] text-[#0a1628] flex items-center gap-2">CS Devyani Khambhati <span className="bg-white border border-green-200 text-green-700 text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">✅ Expert</span></div>
                                <div className="text-[12px] text-[#0096D6] font-medium mt-0.5">Compliance Expert</div>
                            </div>
                        </div>
                    </div>
                    <h2 id="faq-section">--- FAQ SECTION ---</h2>
                    <p className="text-gray-500 font-medium mb-6">License / Registration Name: PSP License – IFSCA (Payment Service Provider Authorisation in IFSC)</p>

                    <div className="space-y-4 mb-8 faq-accordion">
                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">1. General Overview</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">1. What is PSP License – IFSCA?</strong>
                                    <p className="text-[14px] text-[#374151]">PSP License – IFSCA is the authorisation granted by the International Financial Services Centres Authority to a company incorporated in an IFSC for providing specified payment services under the IFSCA (Payment Services) Regulations, 2024.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">2. Is PSP License – IFSCA mandatory to provide payment services in GIFT City?</strong>
                                    <p className="text-[14px] text-[#374151]">Yes. Any person intending to provide payment services in or from an IFSC must obtain authorisation, unless specifically exempted under the Regulations.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">3. What are payment services under PSP License – IFSCA?</strong>
                                    <p className="text-[14px] text-[#374151]">Payment services include account issuance (including e-money accounts), e-money issuance, escrow services, cross-border money transfer services, and merchant acquisition services as defined in Schedule I of the Regulations.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">4. What is the difference between a PSP and a Payment System Operator?</strong>
                                    <p className="text-[14px] text-[#374151]">A Payment Service Provider offers front-end services such as wallets or remittance, while a Payment System Operator manages clearing and settlement infrastructure under separate regulations.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">5. Is PSP authorisation perpetual or time-bound?</strong>
                                    <p className="text-[14px] text-[#374151]">The authorisation remains valid unless revoked by the Authority or surrendered by the PSP.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">6. Can a PSP operate outside IFSC after obtaining licence?</strong>
                                    <p className="text-[14px] text-[#374151]">A PSP must have its place of business and registered office in IFSC. Any activity outside IFSC requires prior approval of the Authority.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">7. Is PSP License – IFSCA similar to RBI Payment Aggregator licence?</strong>
                                    <p className="text-[14px] text-[#374151]">No. PSP License – IFSCA applies to IFSC jurisdiction and operates under a separate regulatory framework focused on foreign currency-based transactions.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">8. Can a foreign company apply for PSP License – IFSCA?</strong>
                                    <p className="text-[14px] text-[#374151]">Yes. A foreign parent company may apply to set up a subsidiary in IFSC for obtaining authorisation.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">9. Does PSP License – IFSCA allow holding INR in wallet?</strong>
                                    <p className="text-[14px] text-[#374151]">No. E-wallets issued by a PSP cannot hold Indian Rupees.</p>
                                </div>
                                <div>
                                    <strong className="text-[#0a1628] block mb-1">10. Can a PSP store cryptocurrencies in e-wallets?</strong>
                                    <p className="text-[14px] text-[#374151]">No. E-wallets cannot store virtual digital assets such as cryptocurrencies.</p>
                                </div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">2. Eligibility & Applicability</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">11. Who can apply for PSP License – IFSCA?</strong><p className="text-[14px] text-[#374151]">Any person intending to provide payment services in or from IFSC must apply, provided the applicant is incorporated as a company in IFSC.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">12. Can an LLP apply for PSP License – IFSCA?</strong><p className="text-[14px] text-[#374151]">No. Only a company incorporated under the Companies Act with registered office in IFSC is eligible.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">13. Can an existing IFSC banking unit apply for PSP licence?</strong><p className="text-[14px] text-[#374151]">Banks operating as IBU or IBC are exempted from obtaining separate authorisation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">14. Is prior experience mandatory for PSP promoters?</strong><p className="text-[14px] text-[#374151]">The Authority evaluates experience and financial soundness as part of the application review process.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">15. Is fit and proper criteria mandatory for directors?</strong><p className="text-[14px] text-[#374151]">Yes. Directors, key managerial personnel, and controlling persons must meet the fit and proper requirements under Schedule II.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">16. Can a company apply before incorporating IFSC entity?</strong><p className="text-[14px] text-[#374151]">The parent may apply, but before final authorisation, a company must be incorporated in IFSC.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">17. Can an NBFC in IFSC apply for PSP authorisation?</strong><p className="text-[14px] text-[#374151]">Yes, subject to meeting regulatory requirements and obtaining approval under the applicable framework.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">18. Is a physical office required in IFSC?</strong><p className="text-[14px] text-[#374151]">Yes. The PSP must maintain a place of business and registered office in IFSC.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">19. Can group entities of an applicant affect eligibility?</strong><p className="text-[14px] text-[#374151]">Yes. Past regulatory actions against group entities may be considered.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">20. Is AML compliance required from day one?</strong><p className="text-[14px] text-[#374151]">Yes. PSPs are treated as regulated entities and must comply with AML/CFT and KYC Guidelines.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">3. Legal & Regulatory Framework</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">21. Under which law is PSP License – IFSCA governed?</strong><p className="text-[14px] text-[#374151]">It is governed by the IFSCA (Payment Services) Regulations, 2024 issued under the IFSCA Act, 2019.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">22. Is the Payment and Settlement Systems Act applicable?</strong><p className="text-[14px] text-[#374151]">Certain definitions align with the Act, but PSPs in IFSC are primarily regulated under IFSCA regulations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">23. Does FEMA apply to PSPs in IFSC?</strong><p className="text-[14px] text-[#374151]">Yes. FEMA considerations apply, especially for Indian promoters investing in IFSC subsidiaries.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">24. Is compliance with AML Guidelines mandatory?</strong><p className="text-[14px] text-[#374151]">Yes. PSPs must comply with IFSCA AML/CFT & KYC Guidelines and PMLA provisions.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">25. Can IFSCA issue additional directions after granting licence?</strong><p className="text-[14px] text-[#374151]">Yes. The Authority may issue directions or modify conditions at any time.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">4. Registration / Application Process</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">26. How do I apply for PSP License – IFSCA?</strong><p className="text-[14px] text-[#374151]">An application must be submitted in the prescribed format along with the specified application fee.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">27. Is there an application fee for PSP licence?</strong><p className="text-[14px] text-[#374151]">Yes. A non-refundable application fee must be paid as specified by the Authority.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">28. How long does it take to get PSP License – IFSCA?</strong><p className="text-[14px] text-[#374151]">The Authority endeavours to process applications within six months.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">29. What is in-principle approval?</strong><p className="text-[14px] text-[#374151]">It is a preliminary approval issued when the Authority is satisfied prima facie, subject to conditions being fulfilled.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">30. Does in-principle approval guarantee final licence?</strong><p className="text-[14px] text-[#374151]">No. Final authorisation is granted only after full compliance with conditions.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">31. Can the Authority refuse application?</strong><p className="text-[14px] text-[#374151]">Yes. After giving an opportunity of hearing, if deficiencies are not rectified.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">32. Can an application be withdrawn?</strong><p className="text-[14px] text-[#374151]">Yes. It may be withdrawn before grant of authorisation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">33. What happens if deficiencies are not rectified?</strong><p className="text-[14px] text-[#374151]">The Authority may refuse authorisation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">34. Can rejected applicants reapply?</strong><p className="text-[14px] text-[#374151]">Yes, after six months from refusal or withdrawal.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">35. Must operations start within a fixed time?</strong><p className="text-[14px] text-[#374151]">Yes. Within six months from issuance of Certificate of Authorisation.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">5. Capital, Net Worth & Infrastructure</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">36. What is minimum capital for Regular PSP?</strong><p className="text-[14px] text-[#374151]">USD 100,000 at commencement of operations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">37. When must Regular PSP increase capital?</strong><p className="text-[14px] text-[#374151]">To USD 200,000 by the end of the third financial year.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">38. What is capital requirement for Significant PSP?</strong><p className="text-[14px] text-[#374151]">USD 250,000 within 90 days of designation and USD 500,000 by third financial year.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">39. How is net worth calculated?</strong><p className="text-[14px] text-[#374151]">It includes paid-up equity, compulsorily convertible preference shares, free reserves and share premium, excluding revaluation reserves.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">40. Can CCPS be counted in capital?</strong><p className="text-[14px] text-[#374151]">Yes, if compulsorily convertible and withdrawal is restricted.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">41. What if net worth falls below required level?</strong><p className="text-[14px] text-[#374151]">The Authority may initiate corrective measures.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">42. Can capital be infused in foreign currency?</strong><p className="text-[14px] text-[#374151]">Yes, in specified foreign currencies.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">43. Is stress testing of capital required?</strong><p className="text-[14px] text-[#374151]">The Authority may require stress testing to assess resilience.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">44. Can PSP use borrowed funds as capital?</strong><p className="text-[14px] text-[#374151]">Capital must meet regulatory definition; borrowed funds are not considered net worth.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">45. Is technology infrastructure mandatory at application stage?</strong><p className="text-[14px] text-[#374151]">Yes. Applicant must demonstrate adequate systems and controls.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">6. Documentation & Declarations</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">46. What documents are required for PSP application?</strong><p className="text-[14px] text-[#374151]">Incorporation documents, shareholding details, governance policies, financial statements, AML framework, and fit & proper declarations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">47. Are declarations required from directors?</strong><p className="text-[14px] text-[#374151]">Yes. Fit and proper declarations are mandatory.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">48. Is business plan required?</strong><p className="text-[14px] text-[#374151]">Yes. The Authority reviews operational and financial projections.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">49. Is nodal bank confirmation required?</strong><p className="text-[14px] text-[#374151]">Yes. PSP must identify an IBU or IBC as nodal bank.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">50. Is escrow agreement mandatory?</strong><p className="text-[14px] text-[#374151]">Yes, where applicable under safeguarding requirements.</p></div>
                            </div>
                        </details>
                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">7. Timelines & Fees</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">51. What is the processing time for PSP application?</strong><p className="text-[14px] text-[#374151]">Typically up to six months, assuming all documents are in order.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">52. Are there ongoing regulatory fees?</strong><p className="text-[14px] text-[#374151]">Yes. Recurring fees must be paid as specified by the Authority.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">53. Is application fee refundable if rejected?</strong><p className="text-[14px] text-[#374151]">No. The application fee is non-refundable.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">54. Will delay in responding to IFSCA queries affect timeline?</strong><p className="text-[14px] text-[#374151]">Yes. Failure to respond within the stipulated time may lead to return or rejection of application.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">55. What happens if I want to withdraw the application?</strong><p className="text-[14px] text-[#374151]">You may withdraw before authorisation is granted. Fees paid will not be refunded.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">8. Post-Registration Compliance</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">56. What must PSP submit quarterly?</strong><p className="text-[14px] text-[#374151]">A Net Worth certificate from a statutory auditor.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">57. When are audited financials due?</strong><p className="text-[14px] text-[#374151]">Within three months from the close of the financial year.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">58. Is transaction reporting required?</strong><p className="text-[14px] text-[#374151]">Yes. Regular reporting is prescribed by the Authority.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">59. Can PSP change its business model freely?</strong><p className="text-[14px] text-[#374151]">No. Prior approval is required for material changes.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">60. Is an exit strategy mandatory?</strong><p className="text-[14px] text-[#374151]">Yes, particularly concerning third-party outsourcings.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">61. Must the company display its authorisation?</strong><p className="text-[14px] text-[#374151]">Yes. The certificate must be displayed at its place of business and on its website.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">62. Are risk management policies mandatory?</strong><p className="text-[14px] text-[#374151]">Yes. Board-approved risk management, security, and governance policies are required.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">9. Operational Restrictions & Permissions</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">63. Can PSP engage in lending?</strong><p className="text-[14px] text-[#374151]">No. Lending is restricted under payment service regulations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">64. Can the PSP conduct non-financial business?</strong><p className="text-[14px] text-[#374151]">Only activities directly related and strictly incidental to payment services are permitted.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">65. Is cross-border transfer allowed?</strong><p className="text-[14px] text-[#374151]">Yes, acting as an intermediary for cross-border money transfer is a permitted activity.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">66. Can an e-wallet operator acquire merchants?</strong><p className="text-[14px] text-[#374151]">Yes, if authorised under both ‘e-money issuance’ and ‘merchant acquisition’.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">67. What are the rules for escrow account?</strong><p className="text-[14px] text-[#374151]">Funds must not be co-mingled, used for lending, or kept longer than necessary for settlement.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">68. Are grievance resolution mechanisms needed?</strong><p className="text-[14px] text-[#374151]">Yes. A robust framework to resolve complaints within 30 days must be implemented.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">69. Do data protection rules apply?</strong><p className="text-[14px] text-[#374151]">Yes. Strict data protection and cyber security norms must be adhered to.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">70. Can a PSP outsource core activities?</strong><p className="text-[14px] text-[#374151]">No. Core management functions and regulatory responsibilities cannot be outsourced.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">10. Penalties, Cancellation & Regulatory Action</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">71. On what grounds can licence be revoked?</strong><p className="text-[14px] text-[#374151]">Non-commencement of business, breach of conditions, AML violations, or operating against customer interest.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">72. Can IFSCA conduct audits?</strong><p className="text-[14px] text-[#374151]">Yes. The Authority may inspect the PSP, its agents, and its third-party service providers.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">73. What is the consequence of holding customer funds without complying with Schedule VI?</strong><p className="text-[14px] text-[#374151]">It is a severe breach that may attract penalty or revocation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">74. Can a PSP surrender its licence?</strong><p className="text-[14px] text-[#374151]">Yes. Subject to Authority's approval and after clearing all customer liabilities.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">75. Are show-cause notices issued before revocation?</strong><p className="text-[14px] text-[#374151]">Yes. A reasonable opportunity of being heard is provided unless emergency action is warranted to protect public interest.</p></div>
                            </div>
                        </details>

                        <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between p-5 font-bold text-[#0a1628] cursor-pointer bg-gray-50/50 hover:bg-blue-50/50 transition-colors list-none">
                                <span className="text-[16px]">11. Advanced & Scenario-Based Questions</span>
                                <span className="text-[#0096D6] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                                <div><strong className="text-[#0a1628] block mb-1">76. Our volume grew rapidly. Do we apply for Significant PSP status?</strong><p className="text-[14px] text-[#374151]">No. The Authority automatically designates a Regular PSP as Significant PSP if transaction thresholds are breached.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">77. We maintain escrow via Bank Guarantee. Is trust account still required?</strong><p className="text-[14px] text-[#374151]">Schedule VI provides options. Bank guarantee from a recognised bank is one acceptable safeguarding mechanism.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">78. Can our parent company infusing capital pledge the shares of IFSC entity?</strong><p className="text-[14px] text-[#374151]">Any change in control or encumbrance that impacts the net worth or ownership may require regulatory notification or approval.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">79. Can the PSP invest idle escrow funds in mutual funds?</strong><p className="text-[14px] text-[#374151]">No. Schedule VI strictly restricts use of customer funds for any investment or lending.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">80. Does "merchant acquisition" mean we also process the gateway transaction?</strong><p className="text-[14px] text-[#374151]">Yes. Accepting/processing payments on behalf of the merchant, resulting in funds transfer to merchant, falls under this service.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">81. If our parent company has an RBI PA licence, does it fast-track IFSCA approval?</strong><p className="text-[14px] text-[#374151]">While it demonstrates track record, the IFSC applicant must independently satisfy conditions of the IFSCA Regulations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">82. Is integration with FIU-IND mandatory from day one?</strong><p className="text-[14px] text-[#374151]">Yes. Registration with FIU-IND as a reporting entity is procedurally expected for AML compliance.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">83. Can we provide services to resident Indians from IFSC?</strong><p className="text-[14px] text-[#374151]">Dealings with resident Indians must strictly comply with LRS limits and FEMA regulations.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">84. What if the required capital is injected midway through the application?</strong><p className="text-[14px] text-[#374151]">Capital infusion must be demonstrated before the final grant of Certificate of Authorisation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">85. Can CCPS have optional convertibility and still classify as Net Worth?</strong><p className="text-[14px] text-[#374151]">No. They must be compulsorily convertible with restricted withdrawal capability.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">86. Are there specific board-level committees mandatory for Regular PSP?</strong><p className="text-[14px] text-[#374151]">Governance parameters require robust oversight. Significant PSPs often face more prescriptive committee structures.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">87. What happens if our cloud hosting is entirely overseas?</strong><p className="text-[14px] text-[#374151]">Data residency and cyber security guidelines formulated by the Authority will dictate hosting jurisdictions.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">88. Can we offer "buy now pay later" (BNPL) under PSP License – IFSCA?</strong><p className="text-[14px] text-[#374151]">No. BNPL is functionally lending, which is prohibited under this specific authorisation.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">89. Do we need a separate escrow per foreign currency?</strong><p className="text-[14px] text-[#374151]">Operational design usually requires segregating pools by currency to mitigate FX risk, following IBU norms.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">90. Can we earn FX spread on cross-border remittance?</strong><p className="text-[14px] text-[#374151]">Yes, acting as an intermediary entails commercial fee mechanisms including transparent FX spreads.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">91. What triggers the "Security Deposit" clause?</strong><p className="text-[14px] text-[#374151]">The Authority demands it based on the complexity, scale, and risk profile of the proposed payment service.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">92. Can the security deposit earn interest for the PSP?</strong><p className="text-[14px] text-[#374151]">Generally, the format of the deposit (e.g., fixed deposit with lien) determines interest treatment; regulatory clarity is given case-by-case.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">93. How often must the risk framework be reviewed?</strong><p className="text-[14px] text-[#374151]">Annually, or when there is a material change in the business model or regulatory framework.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">94. Can we shift from Regular PSP to Significant PSP voluntarily?</strong><p className="text-[14px] text-[#374151]">The status is normally assigned objectively based on the criteria in Regulation 4(3).</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">95. Is the PSP responsible for its agent’s AML failure?</strong><p className="text-[14px] text-[#374151]">Yes. The ultimate regulatory and compliance liability rests with the principal PSP.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">96. Can a PSP acquire another PSP in IFSC?</strong><p className="text-[14px] text-[#374151]">Such an acquisition would involve change in management/control and requires prior approval.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">97. What defines "commencement of ops" to satisfy the 6-month rule?</strong><p className="text-[14px] text-[#374151]">Going live with production transactions (beyond beta testing) is generally required.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">98. Can our escrow be maintained with an overseas bank?</strong><p className="text-[14px] text-[#374151]">Generally, the safeguarding account is mandated to be with an IBU or an acceptable IFSC banking entity.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">99. If our net worth dips for one week, do we lose the licence?</strong><p className="text-[14px] text-[#374151]">Immediate notification is required. The Authority will usually demand a time-bound restoration plan.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">100. Does a change in CEO require notification?</strong><p className="text-[14px] text-[#374151]">Yes. Any change in Directors or Key Managerial Personnel must be reported and comply with Fit & Proper criteria.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">101. Can we issue co-branded prepaid cards?</strong><p className="text-[14px] text-[#374151]">Issuance of payment instruments requires adherence strictly to the e-money issuance permissions and banking tie-ups if applicable.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">102. Can we serve non-resident Indians (NRIs)?</strong><p className="text-[14px] text-[#374151]">Yes. Serving foreign residents, including NRIs, is a primary use case for IFSC entities.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">103. Does the auditor need special IFSC empanelment?</strong><p className="text-[14px] text-[#374151]">Statutory auditors must meet qualifications specified under the Companies Act and any IFSCA-specific circulars.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">104. Our system crashed for 4 hours. Do we report it?</strong><p className="text-[14px] text-[#374151]">Yes. Cyber security architectures require prompt reporting of significant downtime or breaches.</p></div>
                                <div><strong className="text-[#0a1628] block mb-1">105. Can a holding company guarantee the safeguarding requirement?</strong><p className="text-[14px] text-[#374151]">Schedule VI recognises an undertaking or guarantee from the parent, subject to the parent being a regulated entity of acceptable standing.</p></div>
                            </div>
                        </details>
                    </div>



                </main>

                {/* Right Sidebar */}
                <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-6 sticky top-[80px]">

                    {/* CARD 1 — CTA */}
                    <div className="rounded-[16px] p-[24px] shadow-lg text-white" style={{ background: "linear-gradient(135deg, #0077B6, #0096D6)" }}>
                        <h3 className="font-bold text-[18px] mb-2 leading-tight">Need PSP License in GIFT City?</h3>
                        <p className="text-white/80 text-[13px] mb-5 leading-relaxed">Expert IFSCA payment services regulatory guidance.</p>
                        <button className="w-full bg-white text-[#0077B6] font-bold text-[14px] py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg transition duration-300">
                            📞 Book Free Consultation
                        </button>
                        <div className="text-center text-white/70 text-[12px] mt-4 font-medium tracking-wide">
                            ⚡ Response within 24 hours
                        </div>
                    </div>

                    {/* CARD 2 — Expert */}
                    <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 text-[#0077B6] flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm ring-2 ring-blue-50 shrink-0">
                                DK
                            </div>
                            <div>
                                <h4 className="font-bold text-[15px] text-[#0a1628] leading-tight">CS Devyani Khambhati</h4>
                                <div className="text-[12px] text-[#0096D6] font-medium">Compliance Expert</div>
                            </div>
                        </div>
                        <div className="text-[13px] text-gray-600 leading-relaxed">
                            Specialist in GIFT City IFSC payment regulations, escrow structures, and cross-border fintech compliance.
                        </div>
                        <a href="mailto:contact@estabizz.com" className="mt-4 block text-center w-full py-2 bg-blue-50 text-[#0077B6] font-semibold text-[13px] rounded-lg hover:bg-[#0096D6] hover:text-white transition-colors">
                            Ask a Question
                        </a>
                    </div>

                    {/* CARD 3 — Quick Facts */}
                    <div className="bg-white border border-[rgba(0,150,220,0.15)] rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981]"></div>
                        <h4 className="font-bold text-[#0a1628] flex items-center gap-2 mb-4">
                            <span className="text-[#0096D6]">⚡</span> Quick Facts
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Regulator</span>
                                <span className="font-semibold text-[#0a1628]">IFSCA</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Location</span>
                                <span className="font-semibold text-[#0a1628]">GIFT City IFSC</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Min Capital</span>
                                <span className="font-semibold text-[#0a1628]">USD 100,000</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">By Year 3</span>
                                <span className="font-semibold text-[#0a1628]">USD 200,000</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Sig. PSP</span>
                                <span className="font-semibold text-[#0a1628]">USD 250K → 500K</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Timeline</span>
                                <span className="font-semibold text-[#0a1628]">~6 months</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px] pt-1">
                                <span className="text-gray-500">Currency</span>
                                <span className="font-semibold text-[#0a1628]">Foreign only</span>
                            </div>
                        </div>
                    </div>

                    {/* CARD 4 — Share */}
                    <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm text-center">
                        <h4 className="font-bold text-[13px] text-gray-500 uppercase tracking-wider mb-3">Share Guide</h4>
                        <div className="flex justify-center gap-2">
                            <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on X">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Copy Link">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </button>
                        </div>
                    </div>

                </aside>
            </div>

            <section className="border-t border-gray-200 bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-[#0a1628] mb-8 text-center">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="/regulatory/finance-company-gift-city" className="block group">
                            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">IFSC Entity Setup</div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">Finance Company in GIFT IFSC</h3>
                                <p className="text-[13px] text-gray-500 line-clamp-2">Complete regulatory guide for setting up a unified Finance Company.</p>
                            </div>
                        </a>
                        <a href="/regulatory/ifsca-factoring-license-gift-city" className="block group">
                            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">Trade Finance</div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">IFSCA Factoring License</h3>
                                <p className="text-[13px] text-gray-500 line-clamp-2">Guide to receivable financing and factoring in GIFT City.</p>
                            </div>
                        </a>
                        <a href="/regulatory/fintech-entity-gift-city" className="block group">
                            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">Fintech</div>
                                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">Fintech Entity License in GIFT City</h3>
                                <p className="text-[13px] text-gray-500 line-clamp-2">Complete framework for Fintech Authorization in GIFT IFSC.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">Ready to apply for PSP License – IFSCA?</h2>
                    <p className="text-[16px] text-blue-100 mb-8 max-w-2xl mx-auto">
                        Book a consultation to evaluate your eligibility, prepare your business model, and map out the entire authorization process.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all focus:ring-4 focus:ring-blue-500/30">
                            Get Started Free →
                        </a>
                        <a href="tel:+919876543210" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20">
                            Talk to Expert
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
