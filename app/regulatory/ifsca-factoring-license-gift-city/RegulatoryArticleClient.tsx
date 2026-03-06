"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function RegulatoryArticleClient() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Table of contents sections
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "regulatory-background", title: "2. Regulatory Background" },
    { id: "what-is-factoring", title: "3. What is Factoring in IFSC?" },
    { id: "who-should-apply", title: "4. Who Should Apply?" },
    { id: "eligibility-criteria", title: "5. Eligibility Criteria" },
    { id: "registration-process", title: "6. Registration Process" },
    { id: "process-flowchart", title: "7. Process Flowchart" },
    { id: "documents-required", title: "8. Documents Required" },
    { id: "capital-requirements", title: "9. Capital Requirements" },
    { id: "conduct-of-business", title: "10. Conduct of Business" },
    { id: "registration-of-assignments", title: "11. Registration of Assignments" },
    { id: "post-registration-compliance", title: "12. Post-Registration Compliance" },
    { id: "practical-challenges", title: "13. Practical Challenges" },
    { id: "rbi-vs-ifsc", title: "14. RBI vs IFSC Comparison" },
    { id: "professional-support", title: "15. Why Professional Support?" },
    { id: "expert-insight", title: "16. Expert Insight" },
  ];

  useEffect(() => {
    // Scroll progress bar
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
    // Intersection Observer for highlighting active TOC item
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
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="text-sm font-medium text-gray-500 mb-8 flex items-center space-x-2">
            <a href="/" className="hover:text-[#0096D6] transition-colors">Home</a>
            <span>&gt;</span>
            <a href="/regulatory" className="hover:text-[#0096D6] transition-colors">Regulatory</a>
            <span>&gt;</span>
            <span className="text-[#0096D6]">IFSCA Factoring License</span>
          </nav>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🏛️ IFSCA</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🌐 GIFT City</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">📋 Regulatory Guide</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">2024 Regulations</span>
          </div>

          <h1 className="text-[36px] font-black text-[#0a1628] leading-[1.2] mb-6 tracking-[-0.02em] max-w-4xl">
            IFSCA Factoring License in GIFT City – Complete Regulatory Guide for Finance Companies
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 font-medium mb-8">
            <div className="flex items-center gap-1.5">
              <span>📅</span> Published: 2024
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <span>⏱️</span> 15 min read
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <span>👁️</span> Regulatory Guide
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <span>✅</span> Expert Reviewed
            </div>
          </div>

          {/* Focus Keyword Badge */}
          <div className="inline-block px-4 py-2 border border-blue-200 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[#0a1628] font-semibold shadow-sm">
            Focus: <span className="text-[#0096D6]">IFSCA Factoring License in GIFT City</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col xl:flex-row gap-10 items-start">
        
        {/* Left Sidebar - TOC */}
        <aside className="hidden xl:block w-[220px] shrink-0 sticky top-[100px] bg-white border border-[rgba(0,150,220,0.1)] rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,100,200,0.03)] z-10">
          <h4 className="text-[12px] font-bold text-[#94a3b8] tracking-[0.1em] uppercase mb-4">Contents</h4>
          <nav className="flex flex-col space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`text-[13px] block py-2 pl-3 rounded-r-lg border-l-3 transition-all duration-200 ${
                  activeSection === section.id 
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
        <div className="xl:hidden w-full bg-white border border-[rgba(0,150,220,0.1)] rounded-2xl p-5 mb-8 shadow-sm">
           <details className="group">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-[#0096D6]">
                <span>Table of Contents</span>
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
        <main className="flex-1 w-full max-w-[760px] bg-white border border-[rgba(0,150,220,0.08)] rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,100,200,0.04)] article-content">
          <style dangerouslySetInnerHTML={{__html:`
            .article-content h2 { font-size: 24px; font-weight: 800; color: #0a1628; padding: 24px 0 8px; margin-top: 48px; position: relative; scroll-margin-top: 100px; padding-left: 16px; transition: all 0.5s ease; opacity: 0; transform: translateY(20px); }
            .article-content h2.visible { opacity: 1; transform: translateY(0); }
            .article-content h2::before { content: ''; position: absolute; left: 0; top: 28px; bottom: 12px; width: 4px; background: linear-gradient(180deg, #0096D6, #10b981); border-radius: 2px; }
            .article-content h3 { font-size: 18px; font-weight: 700; color: #0077B6; padding: 16px 0 4px; scroll-margin-top: 100px; }
            .article-content p { font-size: 15px; line-height: 1.85; color: #374151; margin-bottom: 16px; }
            .article-content ul { padding-left: 8px; margin-bottom: 24px; }
            .article-content li { display: flex; align-items: flex-start; margin-bottom: 8px; font-size: 14px; color: #374151; line-height: 1.8; }
            .article-content li::before { content: '◆'; color: #0096D6; font-size: 10px; margin-right: 12px; margin-top: 4px; }
            .numbered-card { background: white; border: 1px solid rgba(0,150,220,0.1); border-radius: 12px; padding: 16px 20px; transition: all 0.3s; margin-bottom: 12px; display: flex; align-items: flex-start; gap: 16px; }
            .numbered-card:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,100,200,0.08); border-color: rgba(0,150,220,0.3); }
            .num-badge { width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg, #0096D6, #0077B6); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
          `}}/>

          <h2 id="introduction" className="!mt-0">Introduction</h2>
          <p>
            IFSCA Factoring License in GIFT City has emerged as a critical regulatory framework for finance companies seeking to provide structured receivable financing within India's International Financial Services Centres (IFSCs). Factoring plays an essential role in trade finance by allowing businesses to unlock working capital tied up in receivables.
          </p>
          <p>
            In the global trade ecosystem, exporters and importers frequently experience delays between delivery of goods and payment. Factoring bridges this gap by enabling financial institutions to purchase receivables and provide immediate liquidity to businesses.
          </p>
          <p>
            Recognising the importance of such financing solutions, the International Financial Services Centres Authority (IFSCA) introduced the Registration of Factors and Registration of Assignment of Receivables Regulations, 2024. These regulations provide the regulatory mechanism for granting registration to entities that intend to undertake factoring business within IFSC jurisdictions such as GIFT City in Gujarat.
          </p>
          <p>
            For finance companies planning to operate within the international trade finance ecosystem, obtaining the IFSCA Factoring License in GIFT City is a key regulatory milestone.
          </p>

          {/* Special Component 5: Key Highlights Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">🏛️</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">IFSCA Regulated</div>
              <div className="text-gray-500 text-[13px]">Unified financial regulator</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">GIFT City IFSC</div>
              <div className="text-gray-500 text-[13px]">Global financial hub</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">2024 Regulations</div>
              <div className="text-gray-500 text-[13px]">Latest compliance framework</div>
            </div>
          </div>

          <h2 id="regulatory-background">Regulatory Background</h2>
          <p>
            The IFSCA Factoring License in GIFT City operates under a structured legal framework that integrates multiple financial statutes and regulatory instruments.
          </p>

          {/* Special Component 1: Legal Framework Box */}
          <div className="bg-[rgba(0,150,220,0.04)] border border-[rgba(0,150,220,0.15)] border-l-[4px] border-l-[#0096D6] rounded-xl p-6 my-8">
            <h4 className="text-[#0096D6] font-bold text-lg mb-4 flex items-center gap-2">📋 Legal Framework</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">§</span> Factoring Regulation Act, 2011
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">§</span> IFSCA Act, 2019
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">§</span> Registration of Assignment Rules, 2012
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">§</span> SARFAESI Act, 2002
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">§</span> IFSCA (Finance Company) Regs, 2021
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2">
                <span className="text-[#10b981]">★</span> IFSCA Factoring Regulations, 2024
              </span>
            </div>
          </div>

          <p>
            Under these regulations, any entity intending to undertake factoring business in an IFSC must obtain a certificate of registration from IFSCA.
          </p>
          <p>
            It is important to note that the IFSCA Factoring License in GIFT City replaces earlier RBI regulatory structures within IFSC jurisdictions. Once these regulations came into effect, RBI's earlier frameworks on registration of factors ceased to apply within IFSCs.
          </p>
          <p>
            This regulatory shift ensures that factoring activities conducted in IFSC operate under a unified regulatory authority.
          </p>

          <h2 id="what-is-factoring">What is Factoring in IFSC?</h2>
          <p>
            Factoring is a financial arrangement where a business sells its receivables (invoices) to a financial institution known as a Factor.
          </p>
          <p className="font-semibold text-[#0a1628] mt-6">The Factor provides:</p>
          <ul>
            <li>Immediate payment against receivables</li>
            <li>Credit risk management</li>
            <li>Collection services</li>
            <li>Working capital financing</li>
          </ul>
          
          <p className="font-semibold text-[#0a1628] mt-6">Under the IFSCA Factoring License in GIFT City, factoring services may be provided either:</p>
          <ul>
            <li>Directly to assignors (businesses selling receivables), or</li>
            <li>Through electronic trade financing platforms.</li>
          </ul>

          <p className="font-semibold text-[#0a1628] mt-6">These activities are particularly relevant for:</p>
          <ul>
            <li>Exporters</li>
            <li>Importers</li>
            <li>Global supply chains</li>
            <li>MSMEs participating in international trade</li>
          </ul>

          <h2 id="who-should-apply">Who Should Apply?</h2>
          <p>
            The IFSCA Factoring License in GIFT City is typically required by finance companies operating within IFSC that wish to engage in receivable financing.
          </p>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="numbered-card">
              <div className="num-badge">1</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Finance Companies in IFSC</strong>
                <span className="text-[#64748b]">Companies registered under IFSCA Finance Company Regulations, 2021.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">2</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Trade Finance Institutions</strong>
                <span className="text-[#64748b]">Entities providing structured working capital solutions for global trade.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">3</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Supply Chain Finance Platforms</strong>
                <span className="text-[#64748b]">Platforms facilitating invoice discounting and receivable financing.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">4</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Global Fintech Lenders</strong>
                <span className="text-[#64748b]">Fintech firms providing invoice financing and receivable-backed lending.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">5</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">International Banking or Financial Groups</strong>
                <span className="text-[#64748b]">Institutions establishing specialised trade finance units in IFSC.</span>
              </div>
            </div>
          </div>

          <h2 id="eligibility-criteria">Eligibility Criteria</h2>
          <p>
            To obtain an IFSCA Factoring License in GIFT City, the applicant must satisfy certain regulatory conditions prescribed by IFSCA.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="numbered-card">
              <div className="num-badge">1</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Registration as Finance Company</strong>
                <span className="text-[#64748b]">The entity must first obtain registration under IFSCA (Finance Company) Regulations, 2021. Without this prior registration, factoring registration cannot be granted.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">2</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Experienced Management</strong>
                <span className="text-[#64748b] block mb-2">The relevant persons, including key managerial personnel, must possess adequate experience in factoring or financial services.</span>
                <span className="text-[13px] font-medium text-gray-700">Relevant persons include: Directors, Key managerial personnel, Individuals exercising control.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">3</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Infrastructure Capability</strong>
                <span className="text-[#64748b] block mb-2">The applicant must demonstrate that it has or will establish adequate office infrastructure, technology systems, communication facilities, and qualified manpower.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">4</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Fit and Proper Criteria</strong>
                <span className="text-[#64748b]">Both the company and its key personnel must satisfy fit and proper standards including clean history, integrity, and no fraud.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">5</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Financial Soundness</strong>
                <span className="text-[#64748b]">IFSCA evaluates whether the finance company has sufficient financial stability to undertake factoring operations responsibly.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">6</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">No Ongoing Judicial Breach</strong>
                <span className="text-[#64748b]">The company and its key managerial personnel must not be subject to legal proceedings related to breach of law.</span>
              </div>
            </div>
          </div>

          <h2 id="registration-process">Registration Process</h2>
          <p>
            The process for obtaining an IFSCA Factoring License in GIFT City involves multiple regulatory stages.
          </p>

          <div className="mt-8 relative pl-6 border-l-2 border-dashed border-blue-200">
            {[
              {s: "Step 1", title: "Establish IFSC Entity", desc: "The applicant must first establish a company in GIFT City IFSC."},
              {s: "Step 2", title: "Obtain Finance Company Registration", desc: "Apply for approval under: IFSCA Finance Company Regulations, 2021. This confirms authority to undertake financial services."},
              {s: "Step 3", title: "Prepare Factoring Business Application", desc: "Must include business model, infrastructure details, management experience, and compliance policies."},
              {s: "Step 4", title: "Submit Application to IFSCA", desc: "The entity submits an application to the Authority seeking registration as a Factor."},
              {s: "Step 5", title: "Regulatory Examination", desc: "IFSCA reviews application focusing on eligibility, financial soundness, governance, and operational readiness."},
              {s: "Step 6", title: "Grant of Certificate", desc: "If the Authority is satisfied, it grants the IFSCA Factoring License in GIFT City, subject to conditions."},
              {s: "Step 7", title: "Commencement of Operations", desc: "The entity must commence business within six months. Failure to do so may trigger regulatory review."}
            ].map((step, i) => (
              <div key={i} className="mb-8 relative z-10">
                <div className="absolute -left-[35px] top-4 w-4 h-4 rounded-full bg-gradient-to-r from-[#0096D6] to-[#10b981] shadow-[0_0_0_4px_white]"></div>
                <div className="bg-white border-l-[3px] border-l-[#0096D6] rounded-r-xl p-5 shadow-sm border-t border-r border-b border-gray-100 hover:shadow-md transition duration-300">
                  <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-1">{step.s}</div>
                  <h4 className="text-[15px] font-bold text-[#0a1628] mb-2">{step.title}</h4>
                  <p className="text-[13px] text-[#64748b] !margin-0 !mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 id="process-flowchart">Process Flowchart</h2>
          <p>
            The process for obtaining an IFSCA Factoring License in GIFT City generally follows a two-stage regulatory pathway. First, the entity must obtain registration as a Finance Company in IFSC, and thereafter apply for registration as a Factor under the relevant regulations.
          </p>
          <p>Below is a simplified flow representation of the approval journey.</p>

          {/* Special Component 6: Process Flowchart */}
          <div className="my-10 bg-blue-50/50 rounded-2xl p-6 md:p-10 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(0,150,220,0.4)] whitespace-nowrap px-6">
                  1. Company Formation
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#0096D6] z-10">→</div>
                <div className="md:hidden flex justify-center py-2 text-[#0096D6]">↓</div>
              </div>

              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(0,150,220,0.4)] whitespace-nowrap px-6">
                  2. Finance Co. Registration
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#0096D6] z-10">→</div>
                <div className="md:hidden flex justify-center py-2 text-[#0096D6]">↓</div>
              </div>

              <div className="w-full md:w-auto relative group">
                <div className="relative bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap px-6">
                  <span className="absolute -top-3 -right-3 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                  </span>
                  3. Factoring Application
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#10b981] z-10">→</div>
                <div className="md:hidden flex justify-center py-2 text-[#10b981]">↓</div>
              </div>

            </div>
            
            <div className="hidden md:flex justify-end pr-[15%] text-[#10b981] text-xl py-2">
              ↓
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 mt-4 md:mt-0">
              
              <div className="w-full md:w-auto relative group">
                <div className="bg-[#0a1628] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(10,22,40,0.4)] whitespace-nowrap px-6 border-b-4 border-green-500">
                  6. Operations Begin
                </div>
              </div>

              <div className="hidden md:block text-[#0a1628] z-10">←</div>
              <div className="md:hidden flex justify-center py-2 text-[#0a1628]">↓</div>


              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(100,100,100,0.4)] whitespace-nowrap px-6">
                  5. Certificate Granted
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-gray-700 z-10">←</div>
                <div className="md:hidden flex justify-center py-2 text-gray-700">↓</div>
              </div>


              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(100,100,100,0.4)] whitespace-nowrap px-6">
                  4. IFSCA Review
                </div>
              </div>

            </div>
          </div>


          <h2 id="documents-required">Documents Required</h2>
          
          {/* Special Component 4: Documents Required Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 mb-10">
            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">🏢</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Corporate Documentation</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Certificate of incorporation</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Memorandum and Articles of Association</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Board resolutions</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">📜</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Regulatory Documentation</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Finance Company registration certificate</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Regulatory declarations</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">👥</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Management Details</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Profiles of directors</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Experience of key managerial personnel</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">⚙️</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Operational & Compliance</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Office infrastructure details & IT systems</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Risk management framework</div>
                <div className="flex items-start gap-2 text-[13px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold">✓</span> Anti-money laundering policies</div>
              </div>
            </div>
          </div>

          <h2 id="capital-requirements">Capital Requirements</h2>
          <p>
            The IFSCA Factoring License in GIFT City requires the applicant to demonstrate sufficient operational infrastructure and financial capacity.
          </p>
          <p>
            While capital requirements are primarily governed under Finance Company Regulations, the Authority expects factoring entities to maintain:
          </p>
          <ul>
            <li>Adequate operational capital</li>
            <li>Financial discipline</li>
            <li>Risk management systems</li>
            <li>Compliance infrastructure</li>
          </ul>
          <p>
            Factoring institutions must also ensure that receivable financing exposures are managed prudently.
          </p>

          <h2 id="conduct-of-business">Conduct of Business</h2>
          <p>
            Once licensed, the IFSCA Factoring License in GIFT City permits the entity to undertake factoring activities in two primary ways.
          </p>
          
          <h3 className="mt-4">Direct Factoring</h3>
          <p>The Factor may purchase receivables directly from businesses.</p>
          
          <h3 className="mt-4">Platform-Based Factoring</h3>
          <p>Factoring transactions may also occur through International Trade Financing Services Platforms (ITFS). These digital platforms facilitate trade finance transactions involving exporters and importers.</p>

          <h2 id="registration-of-assignments">Registration of Assignments</h2>
          <p>
            A crucial compliance requirement under the IFSCA Factoring License in GIFT City is registration of receivable assignments.
          </p>
          <p className="font-semibold text-[#0a1628] mt-4">Where trade receivables are financed through Trade Receivables Discounting System (TReDS):</p>
          <ul>
            <li>Details of the transaction must be filed with the Central Registry</li>
            <li>Filing must occur within 10 days of assignment or satisfaction</li>
          </ul>
          <p>
            If the filing is delayed, the Central Registrar may allow additional time upon payment of prescribed fees.
          </p>

          <h2 id="post-registration-compliance">Post-Registration Compliance</h2>
          <p>
            Obtaining the IFSCA Factoring License in GIFT City is only the beginning of regulatory obligations. Licensed factors must comply with ongoing requirements including:
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="numbered-card">
              <div className="num-badge">📊</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Periodic Reporting</strong>
                <span className="text-[#64748b]">Operational information must be submitted to IFSCA in the format and frequency prescribed by the Authority.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">🔄</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Transaction Reporting</strong>
                <span className="text-[#64748b]">Assignments of receivables must be registered with the Central Registry.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">⚖️</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Regulatory Governance</strong>
                <span className="text-[#64748b]">The Factor must maintain proper risk management frameworks, internal controls, and compliance monitoring.</span>
              </div>
            </div>
            <div className="numbered-card">
              <div className="num-badge">🔍</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Operational Transparency</strong>
                <span className="text-[#64748b]">The regulator expects full transparency in factoring transactions and reporting.</span>
              </div>
            </div>
          </div>

          <h2 id="practical-challenges">Practical Challenges</h2>
          <p>
            Entities applying for the IFSCA Factoring License in GIFT City often face several practical challenges.
          </p>
          <ul>
            <li><strong className="text-[#0a1628]">Regulatory Structuring:</strong> Determining the correct entity structure under IFSC regulations can be complex.</li>
            <li><strong className="text-[#0a1628]">Documentation Preparation:</strong> Applications require extensive regulatory documentation and compliance policies.</li>
            <li><strong className="text-[#0a1628]">Infrastructure Planning:</strong> IFSCA expects real operational capability, not merely paper registrations.</li>
            <li><strong className="text-[#0a1628]">Governance Framework:</strong> The regulator carefully evaluates governance structures and management expertise.</li>
          </ul>

          <h3 className="mt-8 border-t border-gray-100 pt-6">Practical Insight</h3>
          <p>
            From a strategic perspective, the IFSCA factoring framework is designed to attract global financial institutions, fintech lenders, and trade finance specialists to operate from GIFT City.
          </p>
          <p className="font-semibold text-[#0a1628] mt-4">Compared with domestic NBFC factoring, IFSC factoring offers:</p>
          <ul>
            <li>Access to global markets</li>
            <li>Flexible foreign currency operations</li>
            <li>Integration with international trade finance platforms</li>
            <li>Positioning within an international financial centre</li>
          </ul>
          <p>
            For institutions aiming to build a cross-border trade finance portfolio, the IFSCA factoring license provides a significantly more global operating environment.
          </p>

          <h3 className="mt-8 border-t border-gray-100 pt-6">Key Compliance Checkpoints</h3>
          <p>
            During the above process, the Authority typically evaluates:
          </p>
          <ul>
            <li>Financial strength of the applicant</li>
            <li>Experience of management in financial services</li>
            <li>Technology infrastructure for receivable financing</li>
            <li>Governance framework</li>
            <li>Fit and Proper status of promoters and KMP</li>
          </ul>
          <p>
            Once the license is granted, the entity can start providing invoice discounting, receivable financing, and trade finance support to exporters, importers, and supply chain participants.
          </p>

          <h2 id="rbi-vs-ifsc">RBI NBFC vs IFSC Comparison</h2>
          
          {/* Special Component 2: Comparison Table */}
          <div className="mt-6 mb-10 overflow-x-auto rounded-2xl shadow-[0_4px_20px_rgba(0,100,200,0.08)] border border-[rgba(0,150,220,0.1)]">
            <div className="bg-blue-50 py-2 px-4 text-xs font-bold text-[#0096D6] uppercase tracking-wider flex items-center gap-2">
              <span>📊 Comparison Table</span>
            </div>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] text-white">
                  <th className="p-4 text-[13px] font-bold w-1/3">Particulars</th>
                  <th className="p-4 text-[13px] font-bold w-1/3">RBI NBFC Factor (India)</th>
                  <th className="p-4 text-[13px] font-bold w-1/3">IFSC Factoring (GIFT City)</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                <tr className="bg-white border-b border-gray-100">
                  <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Regulator</td>
                  <td className="p-4 text-[#64748b]">Reserve Bank of India (RBI)</td>
                  <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">IFSCA</td>
                </tr>
                <tr className="bg-[#fafbff] border-b border-gray-100">
                  <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Primary Regulation</td>
                  <td className="p-4 text-[#64748b]">Factoring Regulation Act, 2011 & Master Directions</td>
                  <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Registration of Factors Regulations, 2024</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Permitted Currency</td>
                  <td className="p-4 text-[#64748b]">Primarily INR</td>
                  <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Freely convertible foreign currencies</td>
                </tr>
                <tr className="bg-[#fafbff] border-b border-gray-100">
                  <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Target Market</td>
                  <td className="p-4 text-[#64748b]">Domestic Indian businesses</td>
                  <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Global trade, cross-border business, IFSC entities</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="p-4 font-semibold text-[#374151] bg-[#f8faff]">Company Setup</td>
                  <td className="p-4 text-[#64748b]">Domestic Indian Company</td>
                  <td className="p-4 text-[#0077B6] font-semibold bg-[rgba(0,150,220,0.04)]">Company/Unit in GIFT City IFSC</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="professional-support">Why Professional Support?</h2>
          <p>
            Factoring is not merely a financing activity; it is a regulated financial service requiring strong governance and regulatory discipline.
          </p>
          <p className="font-semibold text-[#0a1628] mt-4">Experienced compliance professionals help applicants:</p>
          <ul>
            <li>Structure IFSC entities correctly</li>
            <li>Prepare regulatory applications</li>
            <li>Build governance frameworks</li>
            <li>Ensure readiness for regulatory scrutiny</li>
          </ul>
          <p>
            Professional guidance significantly reduces approval delays and regulatory queries.
          </p>

          <h2 id="expert-insight">Expert Insight</h2>
          
          {/* Special Component 3: Expert Quote */}
          <div className="relative mt-8 mb-6 p-7 md:p-8 rounded-2xl border border-[rgba(0,150,220,0.15)] border-l-[5px] border-l-[#0096D6]"
            style={{background:"linear-gradient(135deg, rgba(0,150,220,0.06), rgba(16,185,129,0.04))"}}
          >
            <div className="absolute top-4 left-4 text-[72px] leading-none text-[rgba(0,150,220,0.15)] font-serif italic max-h-[40px] overflow-hidden select-none pointer-events-none">
              "
            </div>
            <p className="relative z-10 text-[17px] leading-[1.8] text-[#0a1628] italic font-medium mb-6 mt-4">
              "A regulator does not merely license a financial activity; it evaluates the discipline behind it. Institutions that build compliance into their business architecture earn regulatory confidence long before their first transaction."
            </p>
            
            <div className="flex items-center gap-4 border-t border-[rgba(0,150,220,0.1)] pt-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                DK
              </div>
              <div>
                <div className="font-bold text-[14px] text-[#0a1628] flex items-center gap-2">
                  CS Devyani Khambhati
                  <span className="bg-white border border-green-200 text-green-700 text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">
                    ✅ Expert
                  </span>
                </div>
                <div className="text-[12px] text-[#0096D6] font-medium mt-0.5">
                  Compliance Expert
                </div>
              </div>
            </div>
          </div>

          <h2 id="conclusion">Conclusion</h2>
          <p>
            The IFSCA Factoring License in GIFT City represents a significant opportunity for finance companies to participate in global trade financing and receivable-based lending.
          </p>
          <p>
            With India positioning GIFT City as a global financial hub, factoring institutions operating within IFSC can play a vital role in supporting international trade, improving liquidity for exporters, and strengthening supply chain financing.
          </p>
          <p>
            However, the regulatory expectations are clear. Entities must demonstrate financial strength, governance capability, and operational readiness before receiving approval.
          </p>
          <p>
            For organisations serious about building long-term financial services operations in IFSC, obtaining the IFSCA Factoring License in GIFT City is a strategic step toward participating in the evolving global trade finance ecosystem.
          </p>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-6 sticky top-[100px]">
          
          {/* Right Card 1 - CTA */}
          <div className="bg-gradient-to-br from-[#0077B6] to-[#0096D6] rounded-2xl p-6 shadow-lg text-white">
            <h3 className="font-bold text-[18px] mb-2 leading-tight">Need Help with IFSCA License?</h3>
            <p className="text-white/80 text-[13px] mb-5 leading-relaxed">Get expert regulatory guidance from our compliance team.</p>
            <button className="w-full bg-white text-[#0077B6] font-bold text-[14px] py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg transition duration-300">
              📞 Book Free Consultation
            </button>
            <div className="text-center text-white/70 text-[12px] mt-4 font-medium tracking-wide">
              ⚡ Response within 24 hours
            </div>
          </div>

          {/* Right Card 2 - Expert Profile */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 text-[#0077B6] flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm ring-2 ring-blue-50 shrink-0">
                DK
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#0a1628] leading-tight">CS Devyani Khambhati</h4>
                <div className="text-[12px] text-[#0096D6] font-medium">Compliance Expert</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500 mb-3 border-b border-gray-50 pb-3">
              IFSCA   ·   GIFT City   ·   Factoring
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-500 mb-4">
              ⭐⭐⭐⭐⭐ <span className="text-gray-400 font-medium ml-1">Expert Reviewed</span>
            </div>
            <button className="w-full border border-[#0096D6] text-[#0096D6] font-semibold text-[13px] py-2 rounded-lg hover:bg-[#0096D6] hover:text-white transition duration-200">
              Ask a Question →
            </button>
          </div>

          {/* Right Card 3 - Quick Facts */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-[14px] text-[#0a1628] mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span className="text-[#0096D6]">📌</span> Quick Facts
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col gap-0.5 pb-2 border-b border-gray-50">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Regulator</span>
                <span className="text-[13px] font-bold text-[#0077B6]">IFSCA</span>
              </div>
              <div className="flex flex-col gap-0.5 pb-2 border-b border-gray-50">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Location</span>
                <span className="text-[13px] font-bold text-[#0077B6]">GIFT City, Gujarat</span>
              </div>
              <div className="flex flex-col gap-0.5 pb-2 border-b border-gray-50">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Framework</span>
                <span className="text-[13px] font-bold text-[#0077B6]">2024 Regulations</span>
              </div>
              <div className="flex flex-col gap-0.5 pb-2 border-b border-gray-50">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Prior Req</span>
                <span className="text-[13px] font-bold text-[#0077B6]">Finance Co. Registration</span>
              </div>
            </div>
          </div>
          
           {/* Right Card 4 - Share */}
           <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-[13px] text-[#0a1628] mb-4 text-center">Share This Guide</h4>
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition cursor-pointer">in</button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition cursor-pointer">𝕏</button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#10b981] hover:text-white transition cursor-pointer">Wa</button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-gray-800 hover:text-white transition cursor-pointer">🔗</button>
            </div>
          </div>

        </aside>
      </div>

      {/* Bottom Section - Related Guides */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-black text-[24px] text-[#0a1628] mb-8 text-center">Related Regulatory Guides</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="block p-6 rounded-2xl border border-gray-100 hover:border-[#0096D6] hover:shadow-md transition-all group bg-[#f8faff]">
              <span className="text-[10px] font-bold text-[#0077B6] uppercase tracking-wider mb-2 block">RBI Compliance</span>
              <h4 className="font-bold text-[16px] text-[#0a1628] mb-4 group-hover:text-[#0096D6] transition-colors">NBFC License – Complete Guide</h4>
              <div className="text-[#0096D6] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Guide <span>→</span>
              </div>
            </a>
            <a href="#" className="block p-6 rounded-2xl border border-gray-100 hover:border-[#0096D6] hover:shadow-md transition-all group bg-[#f8faff]">
              <span className="text-[10px] font-bold text-[#0077B6] uppercase tracking-wider mb-2 block">SEBI Guidelines</span>
              <h4 className="font-bold text-[16px] text-[#0a1628] mb-4 group-hover:text-[#0096D6] transition-colors">SEBI Registration Process</h4>
              <div className="text-[#0096D6] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Guide <span>→</span>
              </div>
            </a>
            <a href="#" className="block p-6 rounded-2xl border border-gray-100 hover:border-[#0096D6] hover:shadow-md transition-all group bg-[#f8faff]">
              <span className="text-[10px] font-bold text-[#0077B6] uppercase tracking-wider mb-2 block">GIFT City Setup</span>
              <h4 className="font-bold text-[16px] text-[#0a1628] mb-4 group-hover:text-[#0096D6] transition-colors">IFSCA Finance Company Setup</h4>
              <div className="text-[#0096D6] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Guide <span>→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "100px 100px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-black text-white mb-4">Ready to Apply for IFSCA Factoring License?</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl mx-auto">Get end-to-end regulatory support from highly experienced compliance professionals to secure your license in GIFT City.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-[#0077B6] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition duration-300 w-full sm:w-auto">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition duration-300 w-full sm:w-auto">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
