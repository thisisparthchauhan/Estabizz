"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What is NBFC-AA License" },
        { id: "regulatory-framework", title: "3. Regulatory Framework" },
        { id: "who-needs", title: "4. Who Needs This License" },
        { id: "eligibility", title: "5. Eligibility Criteria" },
        { id: "documents", title: "6. Documents Required" },
        { id: "process", title: "7. Registration Process" },
        { id: "fees", title: "8. Fees Structure" },
        { id: "timeline", title: "9. Timeline" },
        { id: "compliance", title: "10. Compliance Requirements" },
        { id: "faq", title: "11. FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "RBI" },
        { label: "Entity Type", value: "NBFC-AA" },
        { label: "Min Net Worth", value: "Rs. 2 Crore" },
        { label: "Governing Law", value: "RBI Act, 1934" },
        { label: "Timeline", value: "6–9 months" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🏛️", label: "RBI" }, { emoji: "🔗", label: "Account Aggregator" }, { emoji: "📋", label: "Complete Guide" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI Services", href: "/rbi" }, { label: "NBFC Account Aggregator License" }]}
            title="NBFC Account Aggregator License: Complete RBI Registration Guide with Eligibility, Process & Compliance"
            readTime="15 min read"
            focusKeyword="NBFC Account Aggregator License"
            sections={sections}
            ctaTitle="Need NBFC Account Aggregator License?"
            ctaDescription="Expert RBI guidance for NBFC-AA registration, eligibility assessment, and compliance setup."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-business-plan", category: "RBI Services", title: "NBFC Business Plan", description: "Complete guide to NBFC business plan preparation for RBI approval." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide for GIFT City." },
                { href: "/rbi/lendtech-services", category: "RBI Services", title: "LendTech Services", description: "RBI guidelines for lending technology companies." },
            ]}
            finalCtaTitle="Ready to get your NBFC Account Aggregator License?"
            finalCtaDescription="Book a consultation to evaluate your eligibility, prepare documentation, and navigate the RBI registration process end-to-end."
        >

            {/* ── AT-A-GLANCE STATS ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 not-prose">
                {[
                    { icon: "🏛️", value: "RBI", label: "Primary Regulator" },
                    { icon: "💰", value: "₹2 Cr", label: "Min. Net Worth" },
                    { icon: "⏱️", value: "6–9 mo", label: "Approval Timeline" },
                    { icon: "✅", value: "DEPA", label: "Built on Framework" },
                ].map((s, i) => (
                    <div key={i} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-[20px] font-black text-[#0077B6]">{s.value}</div>
                        <div className="text-[11px] text-gray-500 font-medium mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── SECTION 1: INTRODUCTION ─────────────────────────────────── */}
            <h2 id="introduction">Introduction</h2>
            <p>NBFC Account Aggregator License is a specialised registration granted by the Reserve Bank of India (RBI) to entities that provide financial data aggregation services on a consent-based framework. The Account Aggregator (AA) ecosystem is one of the most transformative financial infrastructure initiatives in India, enabling seamless and secure sharing of financial data between regulated entities.</p>
            <p>The NBFC-AA framework allows individuals and businesses to share their financial information — held across banks, insurance companies, pension funds, and tax platforms — in a structured, consent-based, and digitally verifiable manner built on the Data Empowerment and Protection Architecture (DEPA) model.</p>

            <div className="info-box">
                <h4>Key Insight</h4>
                <p>An NBFC Account Aggregator does not access, store, or analyse customer data — it merely facilitates consent-based transfer of data from a Financial Information Provider (FIP) to a Financial Information User (FIU) in encrypted form.</p>
            </div>

            {/* ── SECTION 2: WHAT IS ──────────────────────────────────────── */}
            <h2 id="what-is">What is NBFC Account Aggregator License</h2>
            <p>An NBFC-AA is a non-banking financial company that acts as a <strong>consent manager for financial data</strong>. It operates as a technology-neutral intermediary between Financial Information Providers (FIPs) and Financial Information Users (FIUs), governed under the Master Direction – Non-Banking Financial Company – Account Aggregator (Reserve Bank) Directions, 2016.</p>

            {/* Can / Cannot infographic */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                        <h4 className="font-bold text-green-800 text-[15px] m-0">What NBFC-AA Can Do</h4>
                    </div>
                    <ul className="space-y-2 m-0 p-0 list-none">
                        {[
                            "Obtain & manage customer consent for data sharing",
                            "Facilitate encrypted FIP → FIU data transfer",
                            "Provide consent artefact management system",
                            "Maintain complete audit trails",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-green-800 m-0 p-0">
                                <span className="text-green-500 mt-0.5 shrink-0">◆</span>{item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shrink-0">✗</span>
                        <h4 className="font-bold text-red-800 text-[15px] m-0">What NBFC-AA Cannot Do</h4>
                    </div>
                    <ul className="space-y-2 m-0 p-0 list-none">
                        {[
                            "Store, read, or process underlying financial data",
                            "Use customer data for commercial purposes",
                            "Share data without explicit customer consent",
                            "Undertake lending or any other financial activity",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-red-800 m-0 p-0">
                                <span className="text-red-400 mt-0.5 shrink-0">◆</span>{item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── SECTION 3: REGULATORY FRAMEWORK ────────────────────────── */}
            <h2 id="regulatory-framework">Regulatory Framework</h2>
            <p>The NBFC-AA framework operates under a robust multi-regulator structure. The primary regulations include the RBI Act 1934 (Section 45-IA), Master Direction – NBFC-AA Directions 2016, DEPA framework co-regulated by RBI, SEBI, IRDAI, and PFRDA, and the IT Act 2000.</p>

            {/* Regulator ecosystem cards */}
            <div className="not-prose my-6">
                <div className="text-center mb-4">
                    <span className="inline-block bg-[#0077B6] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">AA Ecosystem — Multi-Regulator Structure</span>
                </div>
                {/* Central AA hub */}
                <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-[#0077B6] to-[#0096D6] text-white rounded-2xl px-6 py-4 text-center shadow-lg w-48">
                        <div className="text-2xl mb-1">🔗</div>
                        <div className="font-black text-[15px]">NBFC-AA</div>
                        <div className="text-white/70 text-[11px]">Consent Manager</div>
                    </div>
                </div>
                {/* Regulator cards row */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                        { icon: "🏛️", name: "RBI", role: "Primary licensor & supervisor of NBFC-AA", color: "blue" },
                        { icon: "📈", name: "SEBI", role: "Co-regulates securities domain FIPs/FIUs", color: "indigo" },
                        { icon: "🛡️", name: "IRDAI", role: "Governs insurance data flows in AA", color: "purple" },
                        { icon: "💼", name: "PFRDA", role: "Covers pension fund data in AA", color: "teal" },
                        { icon: "💻", name: "MeitY", role: "Oversees tech standards & data protection", color: "cyan" },
                    ].map((r, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xl mb-1">{r.icon}</div>
                            <div className="font-black text-[13px] text-[#0a1628]">{r.name}</div>
                            <div className="text-[10px] text-gray-500 leading-tight mt-1">{r.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SECTION 4: WHO NEEDS ────────────────────────────────────── */}
            <h2 id="who-needs">Who Needs This License</h2>

            <div className="grid sm:grid-cols-2 gap-3 my-6 not-prose">
                {[
                    { icon: "💡", title: "Tech Startups", desc: "Building financial data aggregation platforms" },
                    { icon: "🚀", title: "Fintech Companies", desc: "Facilitating data-driven lending or wealth management" },
                    { icon: "🏦", title: "Banks & FIs", desc: "Setting up standalone AA subsidiaries" },
                    { icon: "📊", title: "Credit Platforms", desc: "Building credit underwriting via financial data" },
                    { icon: "📱", title: "Digital Lenders", desc: "Requiring bank statement analysis via consent" },
                    { icon: "🌐", title: "Open Banking", desc: "Solution providers operating in India" },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-xl p-4">
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                            <div className="font-bold text-[14px] text-[#0a1628]">{item.title}</div>
                            <div className="text-[13px] text-gray-600 mt-0.5">{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="warning-box">
                <h4>⚠️ Important Regulatory Note</h4>
                <p>Any entity aggregating or facilitating transfer of financial data between regulated financial entities in India — without an NBFC-AA license — may be in violation of RBI directions and could face regulatory action.</p>
            </div>

            {/* ── SECTION 5: ELIGIBILITY ──────────────────────────────────── */}
            <h2 id="eligibility">Eligibility Criteria</h2>
            <p>As per the Master Direction – NBFC-AA (RBI) Directions, 2016, the following eligibility conditions must be met:</p>

            {/* Visual eligibility checklist */}
            <div className="not-prose my-6 space-y-3">
                {[
                    { icon: "🏢", label: "Entity Type", req: "Company incorporated under Companies Act, 2013", critical: true },
                    { icon: "💰", label: "Min. Net Owned Fund", req: "Rs. 2 Crore at the time of application — maintained on ongoing basis", critical: true },
                    { icon: "🎯", label: "Principal Business", req: "Must be exclusively Account Aggregation — no other NBFC activities", critical: true },
                    { icon: "👤", label: "Director Fit & Proper", req: "All directors must meet RBI's Fit & Proper Criteria", critical: true },
                    { icon: "🔒", label: "Technology Capability", req: "Robust consent management and data security infrastructure required", critical: false },
                    { icon: "📜", label: "Data Privacy Framework", req: "Documented data privacy and security policy is mandatory", critical: false },
                    { icon: "🚫", label: "No FIP/FIU Activity", req: "NBFC-AA cannot simultaneously act as a FIP or FIU", critical: true },
                ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-4 rounded-xl p-4 border ${item.critical ? "bg-white border-blue-100 shadow-sm" : "bg-gray-50/80 border-gray-100"}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${item.critical ? "bg-blue-50" : "bg-gray-100"}`}>
                            {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-[14px] text-[#0a1628]">{item.label}</span>
                                {item.critical && <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">Mandatory</span>}
                            </div>
                            <div className="text-[13px] text-gray-600 mt-1">{item.req}</div>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">✓</span>
                    </div>
                ))}
            </div>

            <p className="text-[14px] text-gray-600">RBI also evaluates the technical architecture, security infrastructure, and data handling protocols of the applicant entity before granting the Certificate of Registration (CoR).</p>

            {/* ── SECTION 6: DOCUMENTS ────────────────────────────────────── */}
            <h2 id="documents">Documents Required</h2>

            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                {[
                    {
                        icon: "🏢", title: "Entity & Incorporation", color: "blue",
                        docs: ["Certificate of Incorporation (ROC)", "MOA with AA as principal object", "Articles of Association (AOA)", "PAN of the company", "GST Registration (if applicable)"],
                    },
                    {
                        icon: "📊", title: "Financial Documents", color: "green",
                        docs: ["Net Worth Certificate (CA certified)", "Audited Financial Statements", "Bank statements for NOF funds", "Source of funds declaration"],
                    },
                    {
                        icon: "👤", title: "Directors & Promoters", color: "purple",
                        docs: ["KYC — PAN, Aadhaar, Passport", "Director profiles & qualifications", "Fit & Proper declaration", "CIBIL/credit report of promoters", "Board Resolution for application"],
                    },
                    {
                        icon: "💻", title: "Business & Technology", color: "orange",
                        docs: ["Detailed Business Plan for AA ops", "Technology Architecture document", "Data Security & Privacy Policy", "IT Security & Cybersecurity Framework", "API integration plan (FIPs/FIUs)"],
                    },
                    {
                        icon: "📜", title: "Policy & Compliance", color: "teal",
                        docs: ["Customer Grievance Redressal Policy", "KYC/AML Compliance Policy", "Data Retention & Deletion Policy", "Internal Audit & Governance Framework"],
                    },
                ].map((cat, i) => {
                    const colors: Record<string, string> = {
                        blue: "border-blue-200 bg-blue-50/40",
                        green: "border-green-200 bg-green-50/40",
                        purple: "border-purple-200 bg-purple-50/40",
                        orange: "border-orange-200 bg-orange-50/40",
                        teal: "border-teal-200 bg-teal-50/40",
                    };
                    const iconBg: Record<string, string> = {
                        blue: "bg-blue-100", green: "bg-green-100", purple: "bg-purple-100",
                        orange: "bg-orange-100", teal: "bg-teal-100",
                    };
                    return (
                        <div key={i} className={`rounded-xl border p-4 ${colors[cat.color]}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`w-8 h-8 rounded-lg ${iconBg[cat.color]} flex items-center justify-center text-base shrink-0`}>{cat.icon}</span>
                                <span className="font-bold text-[14px] text-[#0a1628]">{cat.title}</span>
                            </div>
                            <ul className="space-y-1.5">
                                {cat.docs.map((doc, j) => (
                                    <li key={j} className="flex items-start gap-2 text-[13px] text-gray-700">
                                        <span className="text-[#0096D6] mt-0.5 shrink-0 text-[10px]">◆</span>{doc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* ── SECTION 7: PROCESS ──────────────────────────────────────── */}
            <h2 id="process">Registration Process</h2>
            <p>The NBFC-AA registration involves multiple stages under RBI&apos;s evaluation framework. Below is the complete step-by-step process:</p>

            {/* Visual process flow */}
            <div className="not-prose my-8 space-y-0">
                {[
                    { step: 1, title: "Company Incorporation", time: "7–10 days", icon: "🏢", desc: "Incorporate a company under the Companies Act, 2013 with Account Aggregation as the principal object in the MOA. Ensure no other NBFC activities.", color: "#0096D6" },
                    { step: 2, title: "Arrange Minimum Net Owned Funds", time: "15–30 days", icon: "💰", desc: "Infuse minimum Rs. 2 Crore as Net Owned Fund from legitimate and traceable sources. Obtain Net Worth Certificate from a CA.", color: "#0077B6" },
                    { step: 3, title: "Prepare Business Plan & Technology Framework", time: "15–30 days", icon: "📋", desc: "Develop comprehensive business plan, technology architecture, data security framework, and all required policies for NBFC-AA operations.", color: "#0096D6" },
                    { step: 4, title: "Online Application on RBI COSMOS Portal", time: "1–3 days", icon: "🖥️", desc: "File the application for Certificate of Registration as NBFC-AA on RBI's COSMOS portal with all supporting documents.", color: "#0077B6" },
                    { step: 5, title: "Physical Document Submission to RBI", time: "1–2 days", icon: "📦", desc: "Submit physical copies of all application documents to the concerned RBI Regional Office along with covering letter and document checklist.", color: "#0096D6" },
                    { step: 6, title: "RBI Scrutiny & Query Resolution", time: "2–4 months", icon: "🔍", desc: "RBI reviews the application, conducts due diligence on promoters, and may raise clarification queries. Respond accurately and promptly.", color: "#0077B6" },
                    { step: 7, title: "In-Principle Approval", time: "3–6 months", icon: "📋", desc: "RBI may grant In-Principle Approval. The entity must then build and demonstrate its technology infrastructure to RBI's satisfaction.", color: "#0096D6" },
                    { step: 8, title: "Certificate of Registration (CoR)", time: "Final stage", icon: "🎉", desc: "After fulfilling all In-Principle Approval conditions and demonstrating operational readiness, RBI issues the Certificate of Registration as NBFC-AA.", color: "#10b981" },
                ].map((item, i) => (
                    <div key={i} className="relative flex gap-0">
                        {/* Left connector */}
                        <div className="flex flex-col items-center w-14 shrink-0">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-[14px] shadow-lg z-10" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.step === 8 ? "#0d9488" : "#0096D6"})` }}>
                                {item.step}
                            </div>
                            {i < 7 && <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-300 to-blue-100 mt-1 min-h-[24px]" />}
                        </div>
                        {/* Card */}
                        <div className={`flex-1 mb-4 ml-3 rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow ${item.step === 8 ? "bg-green-50/60 border-green-200" : "bg-white border-blue-50"}`}>
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-bold text-[14px] text-[#0a1628]">{item.title}</span>
                                </div>
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${item.step === 8 ? "bg-green-100 text-green-700" : "bg-blue-50 text-[#0077B6]"}`}>⏱ {item.time}</span>
                            </div>
                            <p className="text-[13px] text-gray-600 mt-2 mb-0 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── SECTION 8: FEES ─────────────────────────────────────────── */}
            <h2 id="fees">Fees Structure</h2>

            <div className="grid sm:grid-cols-2 gap-3 my-6 not-prose">
                {[
                    { label: "RBI Application Fee", value: "NIL", note: "RBI does not charge any application fee", highlight: true },
                    { label: "Minimum Net Owned Fund", value: "₹2 Crore", note: "Regulatory capital — maintained on ongoing basis", highlight: true },
                    { label: "Professional Fees", value: "Variable", note: "Business plan, documentation & advisory support" },
                    { label: "Technology Infrastructure", value: "Variable", note: "Depends on consent management platform architecture" },
                    { label: "Legal & Compliance Setup", value: "Variable", note: "Policy drafting, legal structuring and advisory" },
                    { label: "Ongoing Annual Compliance", value: "Recurring", note: "RBI returns, audits and periodic compliance filings" },
                ].map((fee, i) => (
                    <div key={i} className={`rounded-xl border p-4 ${fee.highlight ? "bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-sm" : "bg-white border-gray-100"}`}>
                        <div className="font-bold text-[13px] text-gray-500 mb-1">{fee.label}</div>
                        <div className={`text-[20px] font-black mb-1 ${fee.highlight ? "text-[#0077B6]" : "text-[#0a1628]"}`}>{fee.value}</div>
                        <div className="text-[12px] text-gray-500">{fee.note}</div>
                    </div>
                ))}
            </div>

            {/* ── SECTION 9: TIMELINE ─────────────────────────────────────── */}
            <h2 id="timeline">Timeline</h2>

            {/* Visual timeline bar */}
            <div className="not-prose my-6 space-y-3">
                {[
                    { stage: "Company Incorporation", duration: "7–10 days", pct: 5, color: "#0096D6" },
                    { stage: "Business Plan & Document Preparation", duration: "15–30 days", pct: 15, color: "#0088CC" },
                    { stage: "RBI Application Filing", duration: "1–3 days", pct: 3, color: "#0077B6" },
                    { stage: "RBI Review & Queries", duration: "2–4 months", pct: 40, color: "#006699" },
                    { stage: "In-Principle Approval", duration: "3–6 months", pct: 60, color: "#005580" },
                    { stage: "Technology Buildout & Demo", duration: "3–6 months post IPA", pct: 75, color: "#10b981" },
                    { stage: "Final CoR Issuance", duration: "6–9 months total", pct: 100, color: "#059669" },
                ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[13px] font-semibold text-[#0a1628]">{item.stage}</span>
                            <span className="text-[12px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0077B6] shrink-0 ml-2">{item.duration}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, #0096D6, ${item.color})` }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="info-box">
                <h4>Practical Note on Timeline</h4>
                <p>The timeline is heavily dependent on documentation quality, promoter background, and RBI workload. Strong applications with complete documentation and a credible technology framework can progress faster through the approval stages.</p>
            </div>

            {/* ── SECTION 10: COMPLIANCE ──────────────────────────────────── */}
            <h2 id="compliance">Compliance Requirements</h2>
            <p>Post-registration, an NBFC-AA must adhere to extensive ongoing compliance requirements as mandated by RBI. These obligations are non-negotiable and require dedicated internal resources.</p>

            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                {[
                    {
                        icon: "📑", title: "RBI Filings & Returns", color: "blue",
                        items: ["Periodic returns on RBI COSMOS/XBRL", "Annual audit report submission to RBI", "Quarterly compliance certificates by Board", "Report material changes in promoters/directors"],
                    },
                    {
                        icon: "🔒", title: "Technology & Data Security", color: "purple",
                        items: ["ISO 27001 or equivalent certification", "Regular penetration testing & VA", "RBI IT Framework for NBFCs compliance", "Data localisation — India storage mandatory", "End-to-end encryption for all transfers"],
                    },
                    {
                        icon: "✅", title: "Consent & Customer Framework", color: "green",
                        items: ["All data flows strictly consent-based & auditable", "Consent artefact records for inspection", "Customer grievance redressal with TATs", "Consent view, pause & revoke anytime"],
                    },
                    {
                        icon: "🏛️", title: "Governance & Board", color: "teal",
                        items: ["Board-level oversight of compliance & risk", "Dedicated Compliance Officer appointment", "Internal audit for tech & operations", "Annual review of all policies & frameworks"],
                    },
                ].map((cat, i) => {
                    const border: Record<string, string> = {
                        blue: "border-blue-200 bg-blue-50/40",
                        purple: "border-purple-200 bg-purple-50/40",
                        green: "border-green-200 bg-green-50/40",
                        teal: "border-teal-200 bg-teal-50/40",
                    };
                    const iconBg: Record<string, string> = {
                        blue: "bg-blue-100", purple: "bg-purple-100", green: "bg-green-100", teal: "bg-teal-100",
                    };
                    return (
                        <div key={i} className={`rounded-xl border p-4 ${border[cat.color]}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${iconBg[cat.color]} shrink-0`}>{cat.icon}</span>
                                <span className="font-bold text-[14px] text-[#0a1628]">{cat.title}</span>
                            </div>
                            <ul className="space-y-1.5">
                                {cat.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-[13px] text-gray-700">
                                        <span className="text-[#0096D6] mt-0.5 shrink-0 text-[10px]">◆</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="warning-box">
                <h4>⚠️ Compliance Risk Alert</h4>
                <p>Failure to maintain data security standards, consent framework integrity, or periodic RBI reporting obligations can lead to penalties, operational restrictions, or cancellation of the NBFC-AA Certificate of Registration.</p>
            </div>

            {/* ── SECTION 11: FAQ ──────────────────────────────────────────── */}
            <h2 id="faq">FAQs on NBFC Account Aggregator License</h2>
            <div className="space-y-3 my-6">
                {[
                    { q: "What is an NBFC Account Aggregator License?", a: "An NBFC Account Aggregator License is a Certificate of Registration (CoR) issued by RBI to a company that wishes to operate as an Account Aggregator — a consent-based financial data sharing intermediary under the DEPA framework." },
                    { q: "What is the minimum capital requirement for NBFC-AA?", a: "As per RBI's Master Direction on NBFC-AA, the minimum Net Owned Fund (NOF) required is Rs. 2 Crore at the time of application. This must be maintained on an ongoing basis after registration." },
                    { q: "Can an NBFC-AA also operate as a lender or financial services provider?", a: "No. Under RBI's directions, an NBFC-AA can only undertake Account Aggregation as its principal business. It cannot simultaneously act as a lender, insurer, investment adviser, or any other financial service provider, nor act as a FIP or FIU." },
                    { q: "Does an NBFC-AA store customer financial data?", a: "No. The NBFC-AA does not store, access, or read the customer's financial data. It only facilitates encrypted transfer of data from the FIP to the FIU based on customer consent." },
                    { q: "What is the difference between FIP, FIU, and AA?", a: "A Financial Information Provider (FIP) holds customer financial data (e.g., banks, insurers). A Financial Information User (FIU) requests data for a service (e.g., lenders). The AA is the consent manager enabling data flow between FIP and FIU — without reading the data itself." },
                    { q: "How long does it take to get an NBFC-AA license?", a: "The total timeline typically ranges from 6 to 9 months, subject to documentation quality, RBI scrutiny workload, and the applicant's responsiveness to queries. The process includes an In-Principle Approval stage followed by technology demonstration." },
                    { q: "Is NBFC-AA regulated only by RBI?", a: "RBI is the primary regulator and licensor. However, the broader AA ecosystem is co-regulated — SEBI, IRDAI, and PFRDA govern the FIPs and FIUs within their domains, and MeitY influences data privacy and IT security aspects." },
                    { q: "Can a fintech startup apply for an NBFC-AA license?", a: "Yes, fintech startups can apply provided they are incorporated as a company under the Companies Act 2013, have a minimum NOF of Rs. 2 Crore, and can demonstrate a credible technology framework and governance structure to RBI's satisfaction." },
                    { q: "What is the Fit & Proper criteria for NBFC-AA directors?", a: "RBI's Fit & Proper criteria requires directors to have integrity, financial soundness, and relevant competence. Directors must not have criminal convictions and must declare compliance with the Fit & Proper norms. RBI conducts background verification." },
                    { q: "Is there a fee for RBI NBFC-AA registration application?", a: "No, RBI does not charge an application fee for NBFC-AA registration. The primary cost is the regulatory capital requirement of Rs. 2 Crore (minimum NOF), along with professional fees for documentation and compliance setup." },
                    { q: "What is the DEPA framework and how is it related to NBFC-AA?", a: "DEPA (Data Empowerment and Protection Architecture) is India's policy framework for enabling individuals to control and share their personal data digitally. The AA framework is the financial services implementation of DEPA, with NBFC-AAs as the operational entities." },
                    { q: "Can an existing NBFC convert into an NBFC-AA?", a: "Since an NBFC-AA must have Account Aggregation as its sole principal business, an existing NBFC conducting lending or other activities cannot simply convert without ceasing those activities. A separate entity is typically recommended." },
                    { q: "What technology standards must an NBFC-AA comply with?", a: "NBFC-AAs must comply with Sahamati's technical standards and RBI's IT framework for NBFCs. This includes end-to-end encryption, secure APIs, data localisation, consent artefact management, regular security audits, and ISO 27001 certification or equivalent." },
                    { q: "How does customer consent work in the NBFC-AA framework?", a: "Customer consent is granular, time-bound, purpose-specific, and fully revocable. A customer explicitly consents to share specific data for a particular purpose with a specific FIU. The consent artefact is cryptographically signed. The customer can view, pause, or revoke consent at any time." },
                ].map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span>
                            <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">{item.a}</div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
