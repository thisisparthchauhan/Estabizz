"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function RegulatoryArticleClient() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "regulatory-background", title: "Regulatory Background and Legal Framework" },
    { id: "what-is-factoring", title: "What is Factoring in an IFSC Environment?" },
    { id: "who-should-apply", title: "Who Should Apply for an IFSCA Factoring License in GIFT City?" },
    { id: "eligibility-criteria", title: "Eligibility Criteria for IFSCA Factoring License in GIFT City" },
    { id: "registration-process", title: "Registration Process for IFSCA Factoring License in GIFT City" },
    { id: "process-flowchart", title: "Process Flowchart for IFSC Factoring Registration" },
    { id: "documents-required", title: "Documents Required for IFSCA Factoring License in GIFT City" },
    { id: "capital-infrastructure", title: "Capital and Infrastructure Requirements" },
    { id: "conduct-business", title: "Conduct of Factoring Business" },
    { id: "registration-assignment", title: "Registration of Assignment of Receivables" },
    { id: "post-registration", title: "Post-Registration Compliance for Factors" },
    { id: "common-challenges", title: "Common Practical Challenges" },
    { id: "comparison", title: "Comparison: RBI NBFC Factoring vs IFSC Factoring" },
    { id: "professional-support", title: "Why Professional Compliance Support Matters" },
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
      <Head>
        <title>IFSCA Factoring License in GIFT City – Complete Regulatory Guide for Finance Companies</title>
        <meta name="description" content="IFSCA Factoring License in GIFT City allows finance companies in IFSC to undertake receivable financing and trade discounting. Learn eligibility, registration process, capital requirements, documents, and compliance under IFSCA Regulations 2024." />
      </Head>

      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      <section className="relative pt-24 pb-16 px-6 lg:px-8 border-b border-blue-100 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #eff6ff)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#0096D6 1px, transparent 1px), linear-gradient(90deg, #0096D6 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-sm font-medium text-gray-500 mb-8 flex items-center space-x-2">
            <a href="/" className="hover:text-[#0096D6] transition-colors">Home</a>
            <span>&gt;</span>
            <a href="/regulatory" className="hover:text-[#0096D6] transition-colors">IFSCA</a>
            <span>&gt;</span>
            <span className="text-[#0096D6]">Factoring License</span>
          </nav>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🏛️ IFSCA</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">📄 Factoring</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">🌐 GIFT City</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">📋 Regulatory Guide</span>
            <span className="px-3 py-1 bg-blue-50 text-[#0096D6] border border-blue-100 rounded-full text-xs font-semibold shadow-sm">2024 Regulations</span>
          </div>

          <h1 className="text-[36px] font-[900] text-[#0a1628] leading-[1.2] mb-6 tracking-[-0.02em] max-w-4xl">
            IFSCA Factoring License in GIFT City – Complete Regulatory Guide for Finance Companies
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 font-medium mb-8">
            <div className="flex items-center gap-1.5"><span>📅</span> 2024</div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5"><span>⏱️</span> 15 min read</div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5"><span>👁️</span> Regulatory Guide</div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5"><span>✅</span> Expert Reviewed</div>
          </div>

          <div className="inline-block px-4 py-2 border border-blue-200 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[#0a1628] font-semibold shadow-sm">
            Focus: <span className="text-[#0096D6]">IFSCA Factoring License in GIFT City</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col xl:flex-row gap-10 items-start">

        <aside className="hidden xl:block w-[220px] shrink-0 sticky top-[80px] bg-white border border-[rgba(0,150,220,0.1)] rounded-[16px] p-5 shadow-[0_4px_20px_rgba(0,100,200,0.03)] z-10">
          <h4 className="text-[12px] font-bold text-[#94a3b8] tracking-[0.1em] uppercase mb-4">Contents</h4>
          <nav className="flex flex-col space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`text-[13px] block py-2 pl-3 rounded-r-lg transition-all duration-200 ${activeSection === section.id
                  ? "border-l-[3px] border-l-[#0096D6] bg-[rgba(0,150,220,0.06)] text-[#0096D6] font-bold"
                  : "border-l-[3px] border-l-transparent text-[#64748b] hover:text-[#0096D6] hover:bg-blue-50/50"
                  }`}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 w-full max-w-[760px] bg-white border border-[rgba(0,150,220,0.08)] rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,100,200,0.04)] article-content overflow-hidden">
          <style dangerouslySetInnerHTML={{
            __html: `
            .article-content h2 { font-size: 24px; font-weight: 800; color: #0a1628; padding: 24px 0 8px; margin-top: 48px; position: relative; scroll-margin-top: 80px; padding-left: 16px; transition: all 0.7s ease; opacity: 0; transform: translateY(24px); }
            .article-content h2.visible { opacity: 1; transform: translateY(0); }
            .article-content h2::before { content: ''; position: absolute; left: 0; top: 28px; bottom: 12px; width: 4px; background: linear-gradient(180deg, #0096D6, #10b981); border-radius: 2px; }
            .article-content h3 { font-size: 18px; font-weight: 700; color: #0077B6; margin-top: 32px; padding: 16px 0 4px; scroll-margin-top: 80px; }
            .article-content p { font-size: 15px; line-height: 1.85; color: #374151; margin-bottom: 16px; }
            .article-content ul { padding-left: 8px; margin-bottom: 24px; }
            .article-content li { display: flex; align-items: flex-start; margin-bottom: 8px; font-size: 15px; color: #374151; line-height: 1.85; }
            .article-content li::before { content: '◆'; color: #0096D6; font-size: 12px; margin-right: 12px; margin-top: 4px; }
          `}} />

          <h2 id="introduction" className="!mt-0">Introduction</h2>
          <p>
            IFSCA Factoring License in GIFT City has emerged as a critical regulatory framework for finance companies seeking to provide structured receivable financing within India’s International Financial Services Centres (IFSCs). Factoring plays an essential role in trade finance by allowing businesses to unlock working capital tied up in receivables.
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

          {/* 3 highlight cards (1 row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">🏛️</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">IFSCA Regulated</div>
              <div className="text-gray-500 text-[13px]">Governed under 2024 Regulations</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">GIFT City IFSC</div>
              <div className="text-gray-500 text-[13px]">Gujarat International Finance Hub</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#0077B6]"></div>
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-[#0a1628] text-[15px] mb-1">2024 Framework</div>
              <div className="text-gray-500 text-[13px]">Registration of Factors Regulations</div>
            </div>
          </div>

          <h2 id="regulatory-background">Regulatory Background and Legal Framework</h2>
          <p>
            The IFSCA Factoring License in GIFT City operates under a structured legal framework that integrates multiple financial statutes and regulatory instruments.
          </p>

          <p className="font-semibold text-[#0a1628] mt-6">The primary legal foundation includes:</p>

          {/* Legal Framework Pills */}
          <div className="bg-[rgba(0,150,220,0.04)] border border-[rgba(0,150,220,0.15)] border-l-[4px] border-l-[#0096D6] rounded-xl p-6 my-6">
            <h4 className="text-[#0096D6] font-bold text-[16px] mb-4 flex items-center gap-2">📋 Legal Framework</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> Factoring Regulation Act, 2011
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> IFSCA Act, 2019
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> Registration of Assignment of Receivables Rules, 2012
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> IFSCA (Finance Company) Regulations, 2021
              </span>
              <span className="bg-white border border-blue-100 text-[#374151] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm inline-flex items-center gap-2">
                <span className="text-[#0096D6]">◆</span> IFSCA (Registration of Factors and Registration of Assignment of Receivables) Regulations, 2024
              </span>
            </div>
          </div>

          <p>
            Under these regulations, any entity intending to undertake factoring business in an IFSC must obtain a certificate of registration from IFSCA.
          </p>
          <p>
            It is important to note that the IFSCA Factoring License in GIFT City replaces earlier RBI regulatory structures within IFSC jurisdictions. Once these regulations came into effect, RBI’s earlier frameworks on registration of factors ceased to apply within IFSCs.
          </p>
          <p>
            This regulatory shift ensures that factoring activities conducted in IFSC operate under a unified regulatory authority.
          </p>

          <h2 id="what-is-factoring">What is Factoring in an IFSC Environment?</h2>
          <p>
            Factoring is a financial arrangement where a business sells its receivables (invoices) to a financial institution known as a Factor.
          </p>

          <div className="bg-[rgba(0,150,220,0.04)] border border-[rgba(0,150,220,0.1)] rounded-xl p-6 my-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="font-bold text-[#0a1628] mb-3 text-[15px]">The Factor provides:</h4>
              <ul className="text-[14px]">
                <li>Immediate payment against receivables</li>
                <li>Credit risk management</li>
                <li>Collection services</li>
                <li>Working capital financing</li>
              </ul>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#0a1628] mb-3 text-[15px]">Relevant for:</h4>
              <ul className="text-[14px]">
                <li>Exporters</li>
                <li>Importers</li>
                <li>Global supply chains</li>
                <li>MSMEs participating in international trade</li>
              </ul>
            </div>
          </div>

          <p>
            Under the IFSCA Factoring License in GIFT City, factoring services may be provided either:
          </p>
          <ul>
            <li>Directly to assignors (businesses selling receivables), or</li>
            <li>Through electronic trade financing platforms.</li>
          </ul>

          <h2 id="who-should-apply">Who Should Apply for an IFSCA Factoring License in GIFT City?</h2>
          <p>
            The IFSCA Factoring License in GIFT City is typically required by finance companies operating within IFSC that wish to engage in receivable financing.
          </p>
          <p className="font-semibold text-[#0a1628] mt-6">Entities that may apply include:</p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="numbered-card relative overflow-hidden group">
              <div className="num-badge z-10">1</div>
              <div className="z-10">
                <strong className="text-[#0a1628] block mb-1">Finance Companies in IFSC</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">Companies registered under IFSCA Finance Company Regulations, 2021.</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-[#F59E0B] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-widest hidden sm:block">PREREQUISITE BASE</div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">2</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Trade Finance Institutions</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">Entities providing structured working capital solutions for global trade.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">3</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Supply Chain Finance Platforms</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">Platforms facilitating invoice discounting and receivable financing.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">4</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Global Fintech Lenders</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">Fintech firms providing invoice financing and receivable-backed lending.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">5</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">International Banking or Financial Groups</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">Institutions establishing specialised trade finance units in IFSC.</span>
              </div>
            </div>
          </div>

          <h2 id="eligibility-criteria">Eligibility Criteria for IFSCA Factoring License in GIFT City</h2>
          <p>
            To obtain an IFSCA Factoring License in GIFT City, the applicant must satisfy certain regulatory conditions prescribed by IFSCA.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="numbered-card relative overflow-hidden group">
              <div className="num-badge z-10">1</div>
              <div className="z-10 w-full">
                <strong className="text-[#0a1628] block mb-1">Registration as Finance Company</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed block pr-24 sm:pr-0">The entity must first obtain registration under: <br />IFSCA (Finance Company) Regulations, 2021<br />Without this prior registration, factoring registration cannot be granted.</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-[#F59E0B] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-widest hidden sm:block">PREREQUISITE</div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">2</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Experienced Management</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed block mb-2">The relevant persons, including key managerial personnel, must possess adequate experience in factoring or financial services.</span>
                <span className="text-[13px] font-medium text-gray-700">Relevant persons include: Directors, Key managerial personnel, Individuals exercising control over the company.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">3</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Infrastructure Capability</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed block mb-2">The applicant must demonstrate that it has or will establish:</span>
                <span className="text-[13px] font-medium text-gray-700 block mb-1">• Adequate office infrastructure<br />• Technology systems<br />• Communication facilities<br />• Qualified manpower</span>
                <span className="text-[#64748b] text-[14px] leading-relaxed">This ensures operational capability to undertake factoring transactions.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">4</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Fit and Proper Criteria</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed block mb-2">Both the company and its key personnel must satisfy fit and proper standards, which typically include:</span>
                <span className="text-[13px] font-medium text-gray-700 block">• Clean regulatory history<br />• Financial integrity<br />• No history of fraud or misconduct<br />• No serious legal proceedings</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">5</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Financial Soundness</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">IFSCA evaluates whether the finance company has sufficient financial stability to undertake factoring operations responsibly.</span>
              </div>
            </div>

            <div className="numbered-card">
              <div className="num-badge">6</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">No Ongoing Judicial Breach</strong>
                <span className="text-[#64748b] text-[14px] leading-relaxed">The company and its key managerial personnel must not be subject to legal proceedings related to breach of law.</span>
              </div>
            </div>
          </div>

          <h2 id="registration-process">Registration Process for IFSCA Factoring License in GIFT City</h2>
          <p>
            The process for obtaining an IFSCA Factoring License in GIFT City involves multiple regulatory stages.
          </p>

          <div className="mt-8 relative pl-6 border-l-2 border-dashed border-blue-200">
            {[
              { s: "Step 1", title: "Establish IFSC Entity", desc: "The applicant must first establish a company in GIFT City IFSC." },
              { s: "Step 2", title: "Obtain Finance Company Registration", desc: "Apply for approval under: IFSCA Finance Company Regulations, 2021. This step confirms that the entity is authorised to undertake financial services activities." },
              { s: "Step 3", title: "Prepare Factoring Business Application", desc: "The application for factoring registration must include: Business model, Infrastructure details, Management experience, Compliance policies." },
              { s: "Step 4", title: "Submit Application to IFSCA", desc: "The entity submits an application to the Authority seeking registration as a Factor." },
              { s: "Step 5", title: "Regulatory Examination", desc: "IFSCA reviews the application, focusing on: Regulatory eligibility, Financial soundness, Governance framework, Operational readiness." },
              { s: "Step 6", title: "Grant of Certificate of Registration", desc: "If the Authority is satisfied, it grants the IFSCA Factoring License in GIFT City, subject to conditions." },
              { s: "Step 7", title: "Commencement of Operations", desc: "Once the certificate is granted, the entity must commence factoring business within six months. Failure to commence operations within this timeframe may trigger regulatory review.", isFinal: true }
            ].map((step, i) => (
              <div key={i} className="mb-8 relative z-10">
                <div className={`absolute -left-[35px] top-4 w-4 h-4 rounded-full ${step.isFinal ? 'bg-gradient-to-r from-[#10b981] to-[#059669]' : 'bg-gradient-to-r from-[#0096D6] to-[#10b981]'} shadow-[0_0_0_4px_white]`}></div>
                <div className={`bg-white border-l-[3px] ${step.isFinal ? 'border-l-[#10b981]' : 'border-l-[#0096D6]'} rounded-r-xl p-5 shadow-sm border-t border-r border-b border-gray-100 hover:shadow-md transition duration-300 relative overflow-hidden`}>
                  <div className={`text-[12px] font-bold ${step.isFinal ? 'text-[#10b981]' : 'text-[#0096D6]'} uppercase tracking-wider mb-1`}>{step.s}</div>
                  <h4 className="text-[15px] font-bold text-[#0a1628] mb-2">{step.title}</h4>
                  <p className="text-[14px] text-[#64748b] !mb-0">{step.desc}</p>
                  {step.isFinal && (
                    <div className="mt-3 inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[12px] font-semibold border border-orange-100">
                      Must commence within six months
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 id="process-flowchart">Process Flowchart for IFSC Factoring Registration</h2>
          <p>
            The process for obtaining an IFSCA Factoring License in GIFT City generally follows a two-stage regulatory pathway. First, the entity must obtain registration as a Finance Company in IFSC, and thereafter apply for registration as a Factor under the relevant regulations.
          </p>
          <p>Below is a simplified flow representation of the approval journey.</p>

          <div className="my-10 bg-[rgba(0,150,220,0.02)] rounded-2xl p-6 md:p-10 border border-[rgba(0,150,220,0.1)] relative">
            <div className="absolute top-4 left-4 text-[12px] font-bold text-[#64748b] bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm hidden md:block">
              Stages 1–2: Finance Company prerequisite
            </div>
            <div className="absolute bottom-4 left-4 text-[12px] font-bold text-[#0096D6] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm hidden md:block">
              Stages 3–6: Factoring registration pathway
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 md:mt-2">
              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(10,22,40,0.3)] whitespace-nowrap px-6 border-l-4 border-l-[#0096D6]">
                  Company Formation
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#0096D6] z-10 font-bold">→</div>
                <div className="md:hidden flex justify-center py-2 text-[#0096D6] font-bold">↓</div>
              </div>

              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(10,22,40,0.3)] whitespace-nowrap px-6 border-l-4 border-l-[#0096D6]">
                  Finance Co Registration
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#0096D6] z-10 font-bold">→</div>
                <div className="md:hidden flex justify-center py-2 text-[#0096D6] font-bold">↓</div>
              </div>

              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0077B6] to-[#0096D6] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(0,150,220,0.4)] whitespace-nowrap px-6 border-t-4 border-t-blue-300">
                  <span className="absolute -top-2 -right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
                  </span>
                  Factoring Application
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-end pr-[15%] text-[#0096D6] text-xl py-4 font-bold">
              ↓
            </div>
            <div className="md:hidden flex justify-center py-2 text-[#0096D6] font-bold">
              ↓
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 mt-2 md:mt-0 mb-8 md:mb-2">
              <div className="w-full md:w-auto relative group">
                <div className="bg-[#10b981] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap px-6 border-b-4 border-b-green-700">
                  Operations Begin
                </div>
              </div>

              <div className="hidden md:block text-[#0096D6] z-10 font-bold">←</div>
              <div className="md:hidden flex justify-center py-2 text-[#0096D6] font-bold">↓</div>

              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0077B6] to-[#0096D6] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(0,150,220,0.4)] whitespace-nowrap px-6">
                  Certificate Granted
                </div>
                <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 text-[#0096D6] z-10 font-bold">←</div>
                <div className="md:hidden flex justify-center py-2 text-[#0096D6] font-bold">↓</div>
              </div>

              <div className="w-full md:w-auto relative group">
                <div className="bg-gradient-to-br from-[#0077B6] to-[#0096D6] rounded-xl p-4 text-center text-white font-medium shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(0,150,220,0.4)] whitespace-nowrap px-6">
                  IFSCA Review
                </div>
              </div>
            </div>
          </div>

          <h2 id="documents-required">Documents Required for IFSCA Factoring License in GIFT City</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 mb-10">
            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-sm border border-blue-100">🏢</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Corporate Documentation</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Certificate of incorporation</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Memorandum and Articles of Association</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Board resolutions</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-sm border border-blue-100">📜</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Regulatory Documentation</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Finance Company registration certificate</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Regulatory declarations</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-sm border border-blue-100">👥</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Management Details</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Profiles of directors</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Experience of key managerial personnel</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-sm border border-blue-100">⚙️</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Operational Infrastructure</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Office infrastructure details</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> IT systems</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Human resource structure</div>
              </div>
            </div>

            <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-5 hover:shadow-md transition md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-sm border border-blue-100">🛡️</div>
                <h4 className="font-bold text-[15px] text-[#0a1628]">Compliance Policies</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Risk management framework</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Anti-money laundering policies</div>
                <div className="flex items-start gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] shrink-0 font-bold mt-0.5">✓</span> Governance structure</div>
              </div>
            </div>
          </div>

          <h2 id="capital-infrastructure">Capital and Infrastructure Requirements</h2>
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

          <h2 id="conduct-business">Conduct of Factoring Business</h2>
          <p>
            Once licensed, the IFSCA Factoring License in GIFT City permits the entity to undertake factoring activities in two primary ways.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white border text-center border-gray-100 rounded-2xl p-6 shadow-sm border-t-4 border-t-[#0096D6] hover:shadow-md transition">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="!mt-0 !pt-0 text-[16px] mb-2">Direct Factoring</h3>
              <p className="!mb-0 text-[14px]">The Factor may purchase receivables directly from businesses.</p>
            </div>
            <div className="bg-white border text-center border-gray-100 rounded-2xl p-6 shadow-sm border-t-4 border-t-[#0096D6] hover:shadow-md transition">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="!mt-0 !pt-0 text-[16px] mb-2">Platform-Based Factoring (ITFS)</h3>
              <p className="!mb-0 text-[14px]">Factoring transactions may also occur through International Trade Financing Services Platforms (ITFS).</p>
            </div>
          </div>
          <p>These digital platforms facilitate trade finance transactions involving exporters and importers.</p>

          <h2 id="registration-assignment">Registration of Assignment of Receivables</h2>
          <p>
            A crucial compliance requirement under the IFSCA Factoring License in GIFT City is registration of receivable assignments.
          </p>
          <p className="font-semibold text-[#0a1628] mt-4 mb-4">Where trade receivables are financed through Trade Receivables Discounting System (TReDS):</p>

          <div className="bg-[rgba(0,150,220,0.06)] border border-[rgba(0,150,220,0.2)] rounded-xl p-6 md:p-8 my-6 flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left shrink-0">
              <div className="text-[36px] font-black text-[#0096D6] leading-none mb-2">10 days</div>
              <div className="text-[13px] font-bold text-[#64748b] uppercase tracking-wider">Filing deadline after assignment (TReDS)</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-blue-200"></div>
            <div className="w-full h-px bg-blue-200 md:hidden"></div>
            <div className="flex-1 text-[14px]">
              <ul className="!mb-0">
                <li className="!mb-1">Details of the transaction must be filed with the Central Registry.</li>
                <li className="!mb-1">Filing must occur within 10 days of assignment or satisfaction.</li>
                <li className="!mb-0">If the filing is delayed, the Central Registrar may allow additional time upon payment of prescribed fees.</li>
              </ul>
            </div>
          </div>

          <h2 id="post-registration">Post-Registration Compliance for Factors</h2>
          <p>
            Obtaining the IFSCA Factoring License in GIFT City is only the beginning of regulatory obligations. Licensed factors must comply with ongoing requirements including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">📊</div>
                <strong className="text-[#0a1628]">Periodic Reporting</strong>
              </div>
              <span className="text-[#64748b] text-[13px] leading-relaxed">Operational information must be submitted to IFSCA in the format and frequency prescribed by the Authority.</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">📋</div>
                <strong className="text-[#0a1628]">Transaction Reporting</strong>
              </div>
              <span className="text-[#64748b] text-[13px] leading-relaxed">Assignments of receivables must be registered with the Central Registry.</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">🛡️</div>
                <strong className="text-[#0a1628]">Regulatory Governance</strong>
              </div>
              <span className="text-[#64748b] text-[13px] leading-relaxed">The Factor must maintain proper risk management frameworks, internal controls, and compliance monitoring.</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">👁️</div>
                <strong className="text-[#0a1628]">Operational Transparency</strong>
              </div>
              <span className="text-[#64748b] text-[13px] leading-relaxed">The regulator expects full transparency in factoring transactions and reporting.</span>
            </div>
          </div>

          <h2 id="common-challenges">Common Practical Challenges</h2>
          <p>
            Entities applying for the IFSCA Factoring License in GIFT City often face several practical challenges.
          </p>

          <div className="flex flex-col gap-3 mt-6 mb-8">
            <div className="bg-[rgba(245,158,11,0.04)] border-l-[4px] border-[#F59E0B] rounded-r-xl p-4 shadow-sm flex items-start gap-4 hover:bg-[rgba(245,158,11,0.08)] transition">
              <div className="text-xl">⚠️</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Regulatory Structuring</strong>
                <span className="text-[#64748b] text-[14px]">Determining the correct entity structure under IFSC regulations can be complex.</span>
              </div>
            </div>
            <div className="bg-[rgba(245,158,11,0.04)] border-l-[4px] border-[#F59E0B] rounded-r-xl p-4 shadow-sm flex items-start gap-4 hover:bg-[rgba(245,158,11,0.08)] transition">
              <div className="text-xl">⚠️</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Documentation Preparation</strong>
                <span className="text-[#64748b] text-[14px]">Applications require extensive regulatory documentation and compliance policies.</span>
              </div>
            </div>
            <div className="bg-[rgba(245,158,11,0.04)] border-l-[4px] border-[#F59E0B] rounded-r-xl p-4 shadow-sm flex items-start gap-4 hover:bg-[rgba(245,158,11,0.08)] transition">
              <div className="text-xl">⚠️</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Infrastructure Planning</strong>
                <span className="text-[#64748b] text-[14px]">IFSCA expects real operational capability, not merely paper registrations.</span>
              </div>
            </div>
            <div className="bg-[rgba(245,158,11,0.04)] border-l-[4px] border-[#F59E0B] rounded-r-xl p-4 shadow-sm flex items-start gap-4 hover:bg-[rgba(245,158,11,0.08)] transition">
              <div className="text-xl">⚠️</div>
              <div>
                <strong className="text-[#0a1628] block mb-1">Governance Framework</strong>
                <span className="text-[#64748b] text-[14px]">The regulator carefully evaluates governance structures and management expertise.</span>
              </div>
            </div>
          </div>

          <h3 className="mt-8 pt-6">Practical Insight for Businesses</h3>
          <p>
            From a strategic perspective, the IFSCA factoring framework is designed to attract global financial institutions, fintech lenders, and trade finance specialists to operate from GIFT City.
          </p>
          <p className="font-semibold text-[#0a1628] mt-6">Compared with domestic NBFC factoring, IFSC factoring offers:</p>

          <div className="flex flex-col gap-3 mt-4 mb-8">
            <div className="bg-[rgba(16,185,129,0.04)] border-l-[4px] border-[#10b981] rounded-r-xl p-3 shadow-sm flex items-center gap-3">
              <div className="text-green-500 font-bold shrink-0">✓</div>
              <span className="text-[#374151] font-medium text-[14px]">Access to global markets</span>
            </div>
            <div className="bg-[rgba(16,185,129,0.04)] border-l-[4px] border-[#10b981] rounded-r-xl p-3 shadow-sm flex items-center gap-3">
              <div className="text-green-500 font-bold shrink-0">✓</div>
              <span className="text-[#374151] font-medium text-[14px]">Flexible foreign currency operations</span>
            </div>
            <div className="bg-[rgba(16,185,129,0.04)] border-l-[4px] border-[#10b981] rounded-r-xl p-3 shadow-sm flex items-center gap-3">
              <div className="text-green-500 font-bold shrink-0">✓</div>
              <span className="text-[#374151] font-medium text-[14px]">Integration with international trade finance platforms</span>
            </div>
            <div className="bg-[rgba(16,185,129,0.04)] border-l-[4px] border-[#10b981] rounded-r-xl p-3 shadow-sm flex items-center gap-3">
              <div className="text-green-500 font-bold shrink-0">✓</div>
              <span className="text-[#374151] font-medium text-[14px]">Positioning within an international financial centre</span>
            </div>
          </div>

          <p>
            For institutions aiming to build a cross-border trade finance portfolio, the IFSCA factoring license provides a significantly more global operating environment.
          </p>

          <h3 className="mt-8 pt-6">Key Compliance Checkpoints</h3>
          <p>
            During the above process, the Authority typically evaluates:
          </p>

          <div className="bg-white border border-[rgba(0,150,220,0.1)] rounded-xl p-6 mt-6 mb-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5 shadow-sm">1</span>
                <span className="text-[#374151] text-[14px] leading-relaxed">Financial strength of the applicant</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5 shadow-sm">2</span>
                <span className="text-[#374151] text-[14px] leading-relaxed">Experience of management in financial services</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5 shadow-sm">3</span>
                <span className="text-[#374151] text-[14px] leading-relaxed">Technology infrastructure for receivable financing</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5 shadow-sm">4</span>
                <span className="text-[#374151] text-[14px] leading-relaxed">Governance framework</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-gradient-to-br from-[#0096D6] to-[#0077B6] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5 shadow-sm">5</span>
                <span className="text-[#374151] text-[14px] leading-relaxed">Fit and Proper status of promoters and KMP</span>
              </div>
            </div>
          </div>

          <p>
            Once the license is granted, the entity can start providing invoice discounting, receivable financing, and trade finance support to exporters, importers, and supply chain participants.
          </p>

          <h2 id="comparison">Comparison: RBI NBFC Factoring vs IFSC Factoring</h2>
          <p>
            Factoring activities can be undertaken either in domestic India under RBI regulations or in GIFT City IFSC under IFSCA regulations. While both frameworks regulate receivable financing, their objectives and operational environment differ significantly.
          </p>
          <p>
            The following table highlights the practical differences.
          </p>

          <div className="mt-8 mb-10 overflow-x-auto rounded-[16px] shadow-[0_4px_20px_rgba(0,100,200,0.06)] border border-[rgba(0,150,220,0.1)]">
            <div className="bg-blue-50/50 py-3 px-5 text-[12px] font-bold text-[#0096D6] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(0,150,220,0.1)]">
              <span>📊 Comparison Table</span>
            </div>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#0077B6] to-[#0096D6] text-white">
                  <th className="p-4 text-[13px] font-bold w-[25%] border-r border-white/10">Particulars</th>
                  <th className="p-4 text-[13px] font-bold w-[37.5%] border-r border-white/10">RBI NBFC Factoring</th>
                  <th className="p-4 text-[13px] font-bold w-[37.5%]">IFSC Factoring (GIFT City)</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Regulator</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Reserve Bank of India (RBI)</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">International Financial Services Centres Authority (IFSCA)</td>
                </tr>
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Primary Regulation</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Factoring Regulation Act, 2011 & Master Directions</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">Registration of Factors Regulations, 2024</td>
                </tr>
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Target Ecosystem</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Domestic businesses, MSMEs within India</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">Global trade, cross-border business, exporters, importers</td>
                </tr>
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Currency Permitted</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Primarily Indian Rupee (INR)</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">Freely convertible foreign currencies</td>
                </tr>
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Prior Registration</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Requires CoR as NBFC from RBI</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">Requires registration under IFSCA (Finance Company) Regulations</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#374151] align-top bg-gray-50/30 border-r border-gray-100">Platform Usage</td>
                  <td className="p-4 text-[#64748b] align-top border-r border-gray-100">Domestic TReDS Platforms</td>
                  <td className="p-4 text-[#0077B6] font-semibold align-top bg-[rgba(0,150,220,0.04)]">International Trade Financing Services Platforms (ITFS)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="professional-support">Why Professional Compliance Support Matters</h2>
          <p>
            Factoring is not merely a financing activity; it is a regulated financial service requiring strong governance and regulatory discipline.
          </p>
          <p className="font-semibold text-[#0a1628] mt-6">Experienced compliance professionals help applicants:</p>
          <ul>
            <li>Structure IFSC entities correctly</li>
            <li>Prepare regulatory applications</li>
            <li>Build governance frameworks</li>
            <li>Ensure readiness for regulatory scrutiny</li>
          </ul>
          <p>
            Professional guidance significantly reduces approval delays and regulatory queries.
          </p>

          <div className="relative mt-12 mb-10 p-7 md:p-10 rounded-2xl border border-[rgba(0,150,220,0.15)] border-l-[5px] border-l-[#0096D6]"
            style={{ background: "linear-gradient(135deg, rgba(0,150,220,0.04), rgba(16,185,129,0.02))" }}
          >
            <div className="absolute top-4 left-4 text-[72px] leading-none text-[#0096D6] opacity-10 font-serif italic max-h-[40px] overflow-hidden select-none pointer-events-none">
              "
            </div>
            <p className="relative z-10 text-[18px] leading-[1.8] text-[#0a1628] italic font-medium mb-8 mt-4 pr-4">
              "A regulator does not merely license a financial activity; it evaluates the discipline behind it. Institutions that build compliance into their business architecture earn regulatory confidence long before their first transaction."
            </p>

            <div className="flex items-center gap-4 border-t border-[rgba(0,150,220,0.1)] pt-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0 border-2 border-white ring-2 ring-blue-50/50">
                DK
              </div>
              <div>
                <div className="font-bold text-[15px] text-[#0a1628] flex items-center gap-2 mb-1">
                  CS Devyani Khambhati
                  <span className="bg-white border border-green-200 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm font-bold uppercase tracking-wide">
                    Expert
                  </span>
                </div>
                <div className="text-[13px] text-[#0096D6] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] inline-block"></span>
                  Compliance Expert
                </div>
              </div>
            </div>
          </div>

          <h2 id="conclusion" className="!mt-0 pt-0">Strategic Summary</h2>
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

        <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-6 sticky top-[80px]">

          <div className="rounded-[16px] p-[24px] shadow-lg text-white" style={{ background: "linear-gradient(135deg, #0077B6, #0096D6)" }}>
            <h3 className="font-bold text-[18px] mb-2 leading-tight">Need IFSCA Factoring License?</h3>
            <p className="text-white/80 text-[13px] mb-5 leading-relaxed">Expert guidance for factoring registration in GIFT City IFSC.</p>
            <button className="w-full bg-white text-[#0077B6] font-bold text-[14px] py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg transition duration-300">
              📞 Book Free Consultation
            </button>
            <div className="text-center text-white/70 text-[12px] mt-4 font-medium tracking-wide">
              ⚡ Response within 24 hours
            </div>
          </div>

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
          </div>

          <div className="bg-white border border-[rgba(0,150,220,0.15)] rounded-[16px] p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981]"></div>
            <h4 className="font-bold text-[#0a1628] flex items-center gap-2 mb-4">
              <span className="text-[#0096D6]">⚡</span> Quick Facts
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                <span className="text-gray-500">Regulator</span><span className="font-semibold text-[#0a1628]">IFSCA</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                <span className="text-gray-500">Location</span><span className="font-semibold text-[#0a1628]">GIFT City, Gujarat</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                <span className="text-gray-500">Prior Req</span><span className="font-semibold text-[#0a1628]">Finance Co. Registration</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                <span className="text-gray-500">Framework</span><span className="font-semibold text-[#0a1628]">2024 Regulations</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2">
                <span className="text-gray-500">Currency</span><span className="font-semibold text-[#0a1628]">Foreign currencies</span>
              </div>
              <div className="flex justify-between items-center text-[13px] pt-1">
                <span className="text-gray-500">TReDS Filing</span><span className="font-semibold text-[#0a1628]">Within 10 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm text-center">
            <h4 className="font-bold text-[13px] text-gray-500 uppercase tracking-wider mb-3">Share</h4>
            <div className="flex justify-center gap-2">
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on LinkedIn"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on X"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Share on WhatsApp"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.245 3.483 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.436-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg></button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0077B6] flex items-center justify-center hover:bg-[#0077B6] hover:text-white transition-colors" title="Copy Link"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-gray-200 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0a1628] mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/regulatory/finance-company-gift-ifsc" className="block group">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">IFSC Entity Setup</div>
                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">Finance Company in GIFT IFSC</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2">Complete regulatory guide for setting up a unified Finance Company.</p>
              </div>
            </a>
            <a href="/regulatory/psp-license-ifsca" className="block group">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">Payment Services</div>
                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">PSP License – IFSCA</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2">Complete Authorisation Guide with Critical Compliance Insights.</p>
              </div>
            </a>
            <a href="/regulatory/nbfc-license" className="block group">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                <div className="text-[12px] font-bold text-[#0096D6] uppercase tracking-wider mb-2">Domestic Setup</div>
                <h3 className="text-[16px] font-bold text-[#0a1628] group-hover:text-[#0096D6] transition-colors mb-2">NBFC License Guide</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2">Reserve Bank of India registration guidelines.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">Ready to Apply for IFSCA Factoring License?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
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
