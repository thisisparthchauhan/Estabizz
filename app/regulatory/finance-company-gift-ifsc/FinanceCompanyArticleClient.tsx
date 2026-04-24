"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { faqGroups, FAQGroup } from "./faqData";

/* ─── constants ─── */
const tocItems = [
    "Introduction", "Regulatory Background", "What is a Finance Company?", "Purpose of Setup",
    "Who Should Apply?", "Eligibility Criteria", "Capital Requirements", "Permissible Activities",
    "Registration Process", "Government Fees", "Timeline", "Governance Requirements",
    "AML & Compliance", "Practical Challenges", "Operational Structure", "Currency of Operations",
    "Service Recipients", "Treasury Activities", "Advisory Services", "Post-Registration Compliance",
    "Tax Benefits", "Common Mistakes", "Business Models", "Risk Management",
    "Strategic Advantages", "NBFC vs Finance Company", "FAQs", "Expert Insight"
];

const whoApply = [
    { t: "Multinational Corporations", d: "Companies that manage cross-border operations and wish to centralise treasury functions." },
    { t: "Large Corporate Groups", d: "Groups with multiple subsidiaries across countries requiring centralised financial management." },
    { t: "Financial Institutions", d: "Entities seeking to undertake structured finance, liquidity management or capital market activities." },
    { t: "Global Treasury Centres", d: "Corporations intending to establish a Global or Regional Corporate Treasury Centre for their group companies." },
    { t: "Holding Companies", d: "Entities managing investments and capital allocations within their group entities." },
];

const eligibility = [
    { t: "Legal Form", d: "The entity must be established as a company incorporated in IFSC or a branch of a company incorporated in India or overseas." },
    { t: "Infrastructure Requirements", d: "The applicant must demonstrate adequate office space in IFSC, communication infrastructure, technology systems, and operational capabilities to perform financial services." },
    { t: "Human Resource Requirements", d: "Before commencement of operations, the entity must appoint at least five qualified personnel including a Head of Treasury and a Compliance Officer." },
    { t: "Fit and Proper Criteria", d: "The promoters, directors and key managerial personnel must satisfy regulatory integrity standards including financial integrity, good reputation and absence of regulatory violations or criminal proceedings." },
    { t: "Jurisdiction Requirement", d: "The parent entity should not be located in a jurisdiction classified by the Financial Action Task Force (FATF) as a high-risk jurisdiction." },
    { t: "Capital Requirement", d: "A Finance Company in GIFT IFSC must maintain minimum capital in the form of owned funds — USD 200,000 for GRCTC activities." },
];

const activities = [
    { icon: "💰", t: "Capital Raising", d: "Issuing equity shares to raise funds." },
    { icon: "🏦", t: "Borrowing", d: "Raising capital through loans or inter-company deposits." },
    { icon: "📋", t: "Credit Arrangements", d: "Providing lending services, guarantees and credit facilities." },
    { icon: "📈", t: "Investment Activities", d: "Investing in financial instruments issued within or outside IFSC." },
    { icon: "🔄", t: "Derivatives Transactions", d: "Undertaking both OTC and exchange-traded derivatives for risk management or trading purposes." },
    { icon: "💱", t: "Foreign Exchange Transactions", d: "Conducting foreign exchange operations in specified foreign currencies." },
    { icon: "📄", t: "Factoring and Forfaiting", d: "Subject to additional registration requirements." },
    { icon: "🔁", t: "Re-invoicing Centre", d: "Facilitating group trade transactions through structured invoicing mechanisms." },
    { icon: "💧", t: "Liquidity Management", d: "Managing pooled funds, cash flows and payment optimisation across group entities." },
    { icon: "💡", t: "Financial Advisory", d: "Providing advisory services related to financial management, capital market activities and risk management." },
];

const regSteps = [
    { t: "Application Filing", d: "The applicant must submit an application through the Single Window IT System (SWIT) portal operated by IFSCA." },
    { t: "Submission of Service Recipient List", d: "The applicant must provide details of group entities or service recipients for whom financial services will be performed." },
    { t: "Regulatory Examination", d: "IFSCA reviews business model, infrastructure, capital adequacy, governance structure and fit and proper declarations." },
    { t: "Provisional Registration", d: "If the application satisfies initial requirements, the authority may grant provisional registration." },
    { t: "Certificate of Registration", d: "Upon fulfilment of all conditions and payment of regulatory fees, IFSCA issues the Certificate of Registration." },
];

const opStructure = [
    { icon: "🏦", t: "Treasury Management Division", items: ["Global liquidity pooling", "Cash management across group entities", "Funding strategies and capital allocation", "Investment of surplus funds"] },
    { icon: "⚠️", t: "Risk Management Unit", items: ["Interest rate fluctuations", "Currency volatility", "Counterparty risk", "Liquidity risk"] },
    { icon: "📊", t: "Funding and Capital Market Desk", items: ["Intercompany deposits", "External borrowing", "Debt instruments", "Structured funding solutions"] },
    { icon: "📋", t: "Compliance and Regulatory Oversight", items: ["IFSCA regulations", "AML / KYC obligations", "Corporate governance guidelines", "Internal risk policies"] },
];

const bizModels = [
    { n: "01", t: "Global Corporate Treasury Centre Model", d: "This is the most common structure. Under this model, the Finance Company in GIFT IFSC centralises treasury operations for group companies located in different jurisdictions.", items: ["Managing inter-company lending", "Centralising cash flows across group entities", "Conducting foreign exchange risk management", "Managing global borrowings and funding structures", "Optimising capital structure across the corporate group"] },
    { n: "02", t: "Investment and Capital Management Model", d: "Some corporate groups establish a Finance Company in GIFT IFSC primarily to manage investments in global financial instruments.", items: ["Debt portfolio management", "Investment in bonds and securities", "Structured financing arrangements", "Global asset allocation"] },
    { n: "03", t: "Liquidity and Cash Pooling Model", d: "Another widely adopted model is liquidity management. In this model, the Finance Company in GIFT IFSC manages surplus funds across the group by pooling funds from multiple subsidiaries.", items: ["Reducing borrowing costs", "Improving capital efficiency", "Optimising interest income", "Enhancing financial control across the group"] },
];

const compTable = [
    ["Regulator", "Reserve Bank of India", "IFSCA"],
    ["Governing Law", "RBI Act / NHB Act", "IFSCA Finance Company Regulations, 2021"],
    ["Jurisdiction", "Domestic (India)", "International Financial Services Centre"],
    ["Currency", "Indian Rupees (INR)", "Foreign Currencies (USD, EUR, GBP etc.)"],
    ["Primary Clients", "Indian borrowers / customers", "Group entities / Service recipients"],
    ["Capital Requirement", "INR 10 Cr+ (varies by NBFC type)", "USD 200,000 (GRCTC)"],
    ["Tax Framework", "Standard Indian corporate tax", "Concessional IFSC tax regime"],
    ["Permissible Activities", "As per RBI categories", "Treasury, lending, derivatives, advisory"],
    ["Global Operations", "Limited", "Designed for cross-border operations"],
    ["Governance", "RBI governance norms", "IFSCA corporate governance guidelines"],
];

const mistakes = [
    { t: "Weak Business Model Documentation", d: "IFSCA expects applicants to clearly explain their financial activity model." },
    { t: "Inadequate Governance Framework", d: "Corporate governance policies must be properly drafted and board-approved." },
    { t: "Non-compliance with Fit and Proper Criteria", d: "Promoters and directors must demonstrate integrity and financial credibility." },
    { t: "Insufficient Infrastructure Planning", d: "Applicants must show readiness in terms of office setup, personnel and systems." },
    { t: "Incomplete Regulatory Documentation", d: "Applications often get delayed due to missing declarations or compliance policies." },
];

/* ─── sub-components  ─── */
const NumberCard = ({ n, title, desc }: { n: number, title: string, desc: string }) => (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[rgba(0,150,220,0.1)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] text-white flex items-center justify-center text-sm font-bold shrink-0">{n}</div>
        <div><h4 className="font-bold text-[#0a1628] text-[15px] mb-1">{title}</h4><p className="text-[13px] text-[#64748b] leading-relaxed">{desc}</p></div>
    </div>
);

const FAQAccordion = ({ groups }: { groups: FAQGroup[] }) => {
    const [openGroups, setOG] = useState<Record<number, boolean>>({ 0: true });
    const [openQs, setOQ] = useState<Record<string, boolean>>({ "0-0": true, "0-1": true, "0-2": true });
    return (
        <div className="space-y-4">
            {groups.map((g, gi) => (
                <div key={gi} className="border border-[rgba(0,150,220,0.1)] rounded-2xl overflow-hidden">
                    <button onClick={() => setOG(p => ({ ...p, [gi]: !p[gi] }))} className="w-full flex items-center justify-between p-5 bg-[rgba(0,150,220,0.04)] hover:bg-[rgba(0,150,220,0.08)] transition-colors">
                        <span className="font-bold text-[#0a1628] text-[16px]">{gi + 1}. {g.title}</span>
                        <svg className={`w-5 h-5 text-[#0096D6] transition-transform duration-300 ${openGroups[gi] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {openGroups[gi] && (
                        <div className="divide-y divide-gray-100">
                            {g.items.map((item, qi) => {
                                const key = `${gi}-${qi}`;
                                return (
                                    <div key={qi} className="border-t border-gray-50">
                                        <button onClick={() => setOQ(p => ({ ...p, [key]: !p[key] }))} className="w-full flex items-start gap-3 p-4 text-left hover:bg-blue-50/30 transition-colors">
                                            <svg className={`w-4 h-4 text-[#0096D6] mt-1 shrink-0 transition-transform duration-300 ${openQs[key] ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            <span className="font-semibold text-[#0a1628] text-[14px]">{item.q}</span>
                                        </button>
                                        {openQs[key] && <p className="px-11 pb-4 text-[13px] text-[#64748b] leading-[1.8]">{item.a}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

/* ─── MAIN ─── */
export default function FinanceCompanyArticleClient() {
    const [activeSection, setActiveSection] = useState("");
    const [progress, setProgress] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    /* reading progress */
    useEffect(() => {
        const onScroll = () => {
            const s = document.documentElement.scrollTop;
            const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress((s / h) * 100);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* intersection observer for TOC */
    useEffect(() => {
        const els = document.querySelectorAll("[data-section]");
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.getAttribute("data-section") || ""); });
        }, { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const scrollTo = useCallback((id: string) => {
        const el = document.querySelector(`[data-section="${id}"]`);
        if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: "smooth" }); setTocOpen(false); }
    }, []);

    const H2 = ({ id, children }: { id: string, children: React.ReactNode }) => (
        <h2 data-section={id} className="text-[24px] font-extrabold text-[#0a1628] mt-12 mb-4 pl-5 border-l-4 border-l-transparent scroll-mt-20 relative" style={{ borderImage: "linear-gradient(to bottom,#0096D6,#10b981) 1" }}>{children}</h2>
    );
    const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-[18px] font-bold text-[#0077B6] mt-6 mb-3">{children}</h3>;
    const P = ({ children }: { children: React.ReactNode }) => <p className="text-[15px] leading-[1.85] text-[#374151] mb-4">{children}</p>;
    const Bullet = ({ items }: { items: string[] }) => <ul className="space-y-2 mb-4 ml-1">{items.map((it, i) => <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#374151] leading-[1.8]"><span className="text-[#0096D6] mt-1 text-[10px]">◆</span>{it}</li>)}</ul>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#f0f9ff] text-[#374151] font-sans">
            {/* Navbar */}
            {/* Progress bar */}
            <div className="fixed top-[64px] left-0 h-[3px] z-[200]" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#0096D6,#10b981)" }} />

            {/* HERO */}
            <header className="relative pt-24 pb-16 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe,#eff6ff)" }}>
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%230096D6' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
                <div className="max-w-[1280px] mx-auto relative z-10">
                    <nav className="flex items-center gap-2 text-[13px] text-[#64748b] mb-6"><a href="/" className="hover:text-[#0096D6]">Home</a><span>›</span><span>IFSCA</span><span>›</span><span className="text-[#0096D6] font-semibold">Finance Company in GIFT IFSC</span></nav>
                    <div className="flex flex-wrap gap-2 mb-6">{["🏛️ IFSCA", "🌐 GIFT City", "📋 Complete Guide", "💰 Treasury", "2025 Framework"].map(t => <span key={t} className="px-3 py-1 bg-white/80 border border-[rgba(0,150,220,0.15)] rounded-full text-[12px] font-semibold text-[#0096D6]">{t}</span>)}</div>
                    <h1 className="text-[clamp(28px,4vw,36px)] font-black text-[#0a1628] leading-[1.2] tracking-tight max-w-4xl mb-6">Finance Company in GIFT IFSC – Complete Strategic Guide for Global Treasury &amp; Finance Setup</h1>
                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#64748b] font-medium mb-4"><span>📅 2025</span><span>⏱️ 20 min read</span><span>👁️ Regulatory Guide</span><span>✅ Expert Reviewed</span></div>
                    <span className="inline-block px-4 py-1.5 border border-[#0096D6] rounded-full text-[12px] font-bold text-[#0096D6]">Focus: Finance Company in GIFT IFSC</span>
                </div>
            </header>

            {/* Mobile TOC Toggle */}
            <div className="xl:hidden sticky top-[3px] z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 px-4 py-3">
                <button onClick={() => setTocOpen(!tocOpen)} className="flex items-center gap-2 text-[14px] font-bold text-[#0096D6]">
                    <svg className={`w-4 h-4 transition-transform ${tocOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    Table of Contents
                </button>
                {tocOpen && <div className="mt-3 space-y-1 max-h-[60vh] overflow-y-auto">{tocItems.map(t => <button key={t} onClick={() => scrollTo(t)} className={`block w-full text-left px-3 py-2 text-[13px] rounded-lg transition-colors ${activeSection === t ? 'bg-[rgba(0,150,220,0.06)] text-[#0096D6] font-bold' : 'text-[#64748b] hover:text-[#0096D6]'}`}>{t}</button>)}</div>}
            </div>

            {/* 3-COLUMN LAYOUT */}
            <div className="max-w-[1320px] mx-auto px-4 xl:px-6 py-10 flex gap-8">

                {/* LEFT SIDEBAR */}
                <aside className="hidden xl:block w-[220px] shrink-0">
                    <div className="sticky top-20 bg-white rounded-2xl border border-[rgba(0,150,220,0.1)] shadow-sm p-5 max-h-[calc(100vh-100px)] overflow-y-auto">
                        <h4 className="text-[12px] font-bold text-[#94a3b8] uppercase tracking-[.08em] mb-4">Contents</h4>
                        <nav className="space-y-0.5">{tocItems.map(t => <button key={t} onClick={() => scrollTo(t)} className={`block w-full text-left px-3 py-[7px] rounded-lg text-[13px] transition-all duration-200 ${activeSection === t ? 'bg-[rgba(0,150,220,0.06)] text-[#0096D6] font-bold border-l-[3px] border-[#0096D6] -ml-px' : 'text-[#64748b] hover:text-[#0096D6]'}`}>{t}</button>)}</nav>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main ref={mainRef} className="flex-1 max-w-[760px] min-w-0">

                    {/* SECTION: Introduction */}
                    <H2 id="Introduction">Introduction</H2>
                    <P>Finance Company in GIFT IFSC has emerged as one of the most strategic regulatory structures for global businesses looking to manage treasury operations, capital flows, and cross-border financial activities from India's international financial hub.</P>
                    <P>GIFT City (Gujarat International Finance Tec-City) operates as India's International Financial Services Centre (IFSC) and is regulated by the International Financial Services Centres Authority (IFSCA). The regulatory ecosystem allows financial institutions to operate in foreign currencies and serve global markets while benefiting from a transparent and internationally aligned regulatory environment.</P>
                    <P>Under the IFSCA (Finance Company) Regulations, 2021, entities can establish a Finance Company or Finance Unit within IFSC to undertake a variety of permissible financial activities including treasury management, credit arrangements, liquidity management, derivatives transactions and global funding operations.</P>
                    <P>In recent years, the regulatory framework has been strengthened to support multinational groups that wish to establish Global or Regional Corporate Treasury Centres (GRCTC) within IFSC. This model allows corporations to centralise financial management functions for their group entities.</P>
                    <P>The concept of a finance company in GIFT IFSC therefore provides an institutional platform for global capital management while ensuring strong governance and regulatory supervision.</P>

                    {/* SECTION: Regulatory Background */}
                    <H2 id="Regulatory Background">Regulatory Background and Legal Framework</H2>
                    <P>The regulatory structure governing a Finance Company in GIFT IFSC is primarily based on the following legal framework:</P>
                    <div className="bg-[rgba(0,150,220,0.04)] border-l-4 border-[#0096D6] rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-[#0096D6] text-[15px] mb-4">📋 Legal Framework</h4>
                        <div className="flex flex-wrap gap-2">{["International Financial Services Centres Authority Act, 2019", "IFSCA (Finance Company) Regulations, 2021", "Corporate Governance and Disclosure Guidelines issued by IFSCA", "Framework for Global / Regional Corporate Treasury Centres (2025)", "AML / CFT / KYC Guidelines issued by IFSCA"].map(a => <span key={a} className="px-3 py-1.5 bg-white border border-[rgba(0,150,220,0.2)] rounded-full text-[12px] font-semibold text-[#0077B6] hover:bg-[#0096D6] hover:text-white transition-colors cursor-default">{a}</span>)}</div>
                    </div>
                    <P>The regulations allow finance companies to operate within the IFSC ecosystem and provide financial services primarily in foreign currencies.</P>
                    <P>According to the circular issued by the Authority, the regulatory framework is designed to regulate finance companies operating in IFSC and align them with global treasury and financial management practices.</P>
                    <P>Additionally, IFSCA has also amended corporate governance guidelines to ensure better alignment with the Finance Company Regulations and strengthen governance standards for entities operating in IFSC.</P>
                    <P>These regulatory updates reflect IFSCA's objective of positioning GIFT City as a global financial hub capable of hosting treasury centres for multinational corporations.</P>

                    {/* SECTION: What is */}
                    <H2 id="What is a Finance Company?">What is a Finance Company in GIFT IFSC?</H2>
                    <P>A Finance Company in GIFT IFSC is a financial institution registered with the International Financial Services Centres Authority that is permitted to undertake various financial activities within the IFSC ecosystem.</P>
                    <P>Such companies typically perform treasury, capital management, funding and financial risk management activities for group entities operating across different jurisdictions.</P>
                    <P>In practical terms, these finance companies serve as central financial management units for large multinational groups, allowing them to optimise capital allocation, funding strategies, and liquidity management.</P>

                    {/* Purpose */}
                    <H2 id="Purpose of Setup">Purpose of Setting up Finance Company in GIFT IFSC</H2>

                    {/* Who Should Apply */}
                    <H2 id="Who Should Apply?">Who Should Apply for a Finance Company in GIFT IFSC?</H2>
                    <P>The structure of a Finance Company in GIFT IFSC is particularly suitable for:</P>
                    <div className="space-y-3 mb-6">{whoApply.map((w, i) => <NumberCard key={i} n={i + 1} title={w.t} desc={w.d} />)}</div>

                    {/* Eligibility */}
                    <H2 id="Eligibility Criteria">Eligibility Criteria for Finance Company in GIFT IFSC</H2>
                    <P>To obtain registration for a Finance Company in GIFT IFSC, the applicant must satisfy several regulatory conditions.</P>
                    <div className="space-y-3 mb-6">{eligibility.map((e, i) => <NumberCard key={i} n={i + 1} title={e.t} desc={e.d} />)}</div>
                    <P>The framework requires detailed declarations to ensure that individuals associated with the company meet the "fit and proper" standards prescribed by IFSCA.</P>

                    {/* Capital Requirement */}
                    <H2 id="Capital Requirements">Capital Requirement for Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC must maintain minimum capital in the form of owned funds.</P>
                    <P>For Global or Regional Corporate Treasury Centres:</P>
                    <div className="bg-gradient-to-br from-[rgba(0,150,220,0.06)] to-[rgba(16,185,129,0.04)] border border-[rgba(0,150,220,0.15)] rounded-2xl p-7 mb-6">
                        <h4 className="font-bold text-[#0096D6] text-[15px] mb-2">💰 Capital Requirement</h4>
                        <div className="text-[36px] font-black text-[#0096D6] mb-1">USD 200,000</div>
                        <p className="text-[14px] text-[#64748b] font-medium mb-4">Minimum Owned Fund (GRCTC)</p>
                        <div className="space-y-2 mb-4">{["Paid-up capital", "Free reserves", "Share premium balance", "Capital reserves"].map(x => <div key={x} className="flex items-center gap-2 text-[14px] text-[#374151]"><span className="text-[#10b981] font-bold">✓</span>{x}</div>)}</div>
                        <p className="text-[12px] text-[#F59E0B] font-semibold">⚠️ Revaluation reserves, accumulated losses and intangible assets are EXCLUDED while computing owned funds.</p>
                    </div>
                    <P>This capital must be maintained at all times to ensure financial stability.</P>

                    {/* Permissible Activities */}
                    <H2 id="Permissible Activities">Permissible Activities of Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC may undertake a wide range of treasury and financial services activities. These include:</P>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">{activities.map((a, i) => <div key={i} className="p-4 bg-white rounded-xl border border-[rgba(0,150,220,0.1)] hover:border-[#0096D6] hover:shadow-md transition-all duration-300"><div className="text-[20px] mb-2">{a.icon}</div><h4 className="font-bold text-[#0a1628] text-[14px] mb-1">{a.t}</h4><p className="text-[12px] text-[#64748b] leading-relaxed">{a.d}</p></div>)}</div>
                    <P>These activities allow multinational companies to manage global treasury operations efficiently.</P>

                    {/* Registration Process */}
                    <H2 id="Registration Process">Registration Process for Finance Company in GIFT IFSC</H2>
                    <P>The registration procedure involves several regulatory stages.</P>
                    <div className="relative pl-8 mb-6">{regSteps.map((s, i) => (
                        <div key={i} className="relative mb-6 last:mb-0">
                            {i < regSteps.length - 1 && <div className="absolute left-[-20px] top-10 w-[2px] h-[calc(100%)] bg-gradient-to-b from-[#0096D6] to-[#10b981]" />}
                            <div className="absolute left-[-28px] top-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#0096D6] to-[#10b981] text-white flex items-center justify-center text-[13px] font-bold z-10">{i + 1}</div>
                            <div className="bg-white border-l-[3px] border-[#0096D6] rounded-r-xl p-4 ml-4 shadow-sm">
                                <h4 className="font-bold text-[#0a1628] text-[15px] mb-1">Step {i + 1} – {s.t}</h4>
                                <p className="text-[13px] text-[#64748b] leading-relaxed">{s.d}</p>
                            </div>
                        </div>
                    ))}</div>
                    <div className="inline-block px-4 py-2 bg-[rgba(245,158,11,0.1)] border border-[#F59E0B] rounded-full text-[13px] font-bold text-[#F59E0B] mb-4">⏰ Operations must commence within 6 months of registration</div>
                    <P>Only after receiving the certificate can the entity commence operations.</P>

                    {/* Government Fees */}
                    <H2 id="Government Fees">Government Fees for Finance Company in GIFT IFSC</H2>
                    <P>The regulatory framework prescribes fees payable to IFSCA as part of the regulatory authorisation process.</P>
                    <P>These fees are payable to IFSCA as part of the regulatory authorisation process.</P>

                    {/* Timeline */}
                    <H2 id="Timeline">Timeline for Registration</H2>
                    <P>The timeline for establishing a Finance Company in GIFT IFSC generally involves the following stages:</P>
                    <div className="flex flex-wrap gap-3 mb-6">{["Entity Formation", "Finance Co Registration", "Provisional Approval", "Full Certificate"].map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="px-4 py-2 bg-white border border-[rgba(0,150,220,0.15)] rounded-xl text-[13px] font-bold text-[#0a1628]">{s}</div>
                            {i < 3 && <span className="text-[#0096D6] font-bold">→</span>}
                        </div>
                    ))}</div>
                    <P>Once registration is granted, the company must commence operations within six months unless an extension is approved by the Authority.</P>

                    {/* Governance */}
                    <H2 id="Governance Requirements">Governance Requirements</H2>
                    <P>A Finance Company in GIFT IFSC must implement robust governance structures. Key requirements include:</P>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{[
                        { t: "Corporate Governance Policy", d: "A board-approved governance framework defining responsibilities of management and board oversight." },
                        { t: "Risk Management Policy", d: "Procedures to identify, monitor and manage financial risks." },
                        { t: "Activity Approval Policy", d: "Controls governing permissible financial activities and delegation of authority." },
                        { t: "Change in Control", d: "Any merger, acquisition or change in management involving significant shareholding requires prior approval of the Authority." },
                    ].map((g, i) => <div key={i} className="bg-white rounded-xl p-5 border-t-[3px] border-[#0096D6] shadow-sm"><h4 className="font-bold text-[#0a1628] text-[15px] mb-2">{g.t}</h4><p className="text-[13px] text-[#64748b] leading-relaxed">{g.d}</p></div>)}</div>
                    <P>These governance requirements ensure financial discipline and regulatory transparency.</P>

                    {/* AML */}
                    <H2 id="AML & Compliance">AML, KYC and Compliance Obligations</H2>
                    <P>Entities operating as a Finance Company in GIFT IFSC must comply with strict AML and KYC obligations. These include:</P>
                    <Bullet items={["Anti-Money Laundering guidelines issued by IFSCA", "Counter-terrorist financing controls", "Know Your Customer procedures", "Transaction monitoring systems"]} />
                    <P>Compliance frameworks must be documented and implemented effectively.</P>

                    {/* Practical Challenges */}
                    <H2 id="Practical Challenges">Common Practical Challenges</H2>
                    <P>Setting up a Finance Company in GIFT IFSC can involve several practical challenges.</P>
                    <Bullet items={["Regulatory Structuring — Designing the correct corporate structure for global operations.", "Treasury Policy Design — Creating compliant policies for derivatives, liquidity and funding.", "Fit and Proper Verification — Ensuring promoters and directors meet regulatory standards.", "Documentation — Preparing detailed operational and governance policies.", "Cross-Border Regulatory Alignment — Ensuring compliance with FEMA and other international regulations."]} />
                    <P>These challenges often require specialised regulatory expertise.</P>

                    {/* Operational Structure */}
                    <H2 id="Operational Structure">Operational Structure of a Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC generally operates as a centralised financial management entity for global corporate groups. Unlike traditional financial institutions that provide services to external customers, many IFSC finance companies operate primarily for group entities or related service recipients.</P>
                    <P>The operational structure typically includes the following components.</P>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{opStructure.map((o, i) => <div key={i} className="bg-white rounded-xl p-5 border-t-[3px] border-[#0096D6] shadow-sm"><div className="text-[20px] mb-2">{o.icon}</div><h4 className="font-bold text-[#0a1628] text-[15px] mb-3">{o.t}</h4><ul className="space-y-1">{o.items.map((it, j) => <li key={j} className="flex items-start gap-2 text-[13px] text-[#64748b]"><span className="text-[#0096D6] mt-0.5 text-[8px]">◆</span>{it}</li>)}</ul></div>)}</div>

                    {/* Currency */}
                    <H2 id="Currency of Operations">Currency of Operations in IFSC</H2>
                    <P>A distinctive feature of a Finance Company in GIFT IFSC is the ability to operate primarily in foreign currencies.</P>
                    <P>Transactions undertaken within IFSC must generally be conducted in specified foreign currencies, which are notified by the Authority under the banking regulations applicable to IFSC.</P>
                    <P>However, certain transactions outside IFSC may be executed in other currencies depending on operational requirements.</P>
                    <P>Finance companies may also open Special Non-Resident Rupee (SNRR) accounts with authorised dealers in India for specific business transactions conducted outside IFSC.</P>
                    <P>This flexibility allows treasury centres to manage cross-border financial flows effectively.</P>

                    {/* Service Recipients */}
                    <H2 id="Service Recipients">Service Recipients of Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC usually provides services to entities within its corporate group. Service recipients may include:</P>
                    <Bullet items={["Parent company", "Subsidiaries", "Joint ventures", "Associate companies", "Branch offices of group entities"]} />
                    <P>These entities may be located either in India or outside India.</P>
                    <P>However, such service recipients must be legally registered in their respective jurisdictions, and the finance company must maintain an updated list of these entities for regulatory review when required.</P>
                    <P>Where service recipients are located in India, the finance company must also ensure compliance with Foreign Exchange Management Act (FEMA) provisions.</P>

                    {/* Treasury Activities */}
                    <H2 id="Treasury Activities">Treasury Activities Permitted for Finance Company in GIFT IFSC</H2>
                    <P>Treasury activities are at the heart of operations for a Finance Company in GIFT IFSC. Some of the major treasury functions include:</P>
                    <H3>Liquidity Pooling</H3><P>Funds from various group entities may be pooled together and centrally managed to optimise cash utilisation.</P>
                    <H3>Cash Concentration</H3><P>The finance company may collect and distribute funds across the group to maintain adequate liquidity.</P>
                    <H3>Working Capital Optimisation</H3><P>Treasury teams monitor working capital cycles to reduce financing costs.</P>
                    <H3>Payment Processing</H3><P>The entity may process vendor payments or financial obligations on behalf of group companies.</P>
                    <H3>Financial Risk Hedging</H3><P>Treasury desks may hedge risks through derivatives linked to:</P>
                    <Bullet items={["Interest rates", "Foreign exchange rates", "Commodities", "Credit exposures"]} />
                    <P>These activities allow multinational corporations to operate with greater financial efficiency.</P>

                    {/* Advisory */}
                    <H2 id="Advisory Services">Advisory Services Provided by Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC may also provide advisory services relating to treasury and financial management.</P>
                    <H3>Financial Management Advisory</H3><Bullet items={["Cash flow forecasting", "Financial planning for group entities", "Investment appraisal for projects", "Tax optimisation strategies"]} />
                    <H3>Risk Management Advisory</H3><Bullet items={["Interest rate risk management", "Currency exposure mitigation", "Credit risk analysis", "Hedging strategy development"]} />
                    <H3>Capital Market Advisory</H3><P>Finance companies may advise group entities regarding:</P><Bullet items={["Capital structure optimisation", "Debt issuance strategies", "Portfolio diversification", "Credit rating management"]} />
                    <P>Such advisory services enable corporate groups to make more informed financial decisions.</P>

                    {/* Post-Registration */}
                    <H2 id="Post-Registration Compliance">Post-Registration Compliance Requirements</H2>
                    <P>After registration, a Finance Company in GIFT IFSC must comply with several ongoing regulatory obligations.</P>
                    <H3>Corporate Governance Compliance</H3><Bullet items={["Corporate governance", "Risk management", "Financial activity approval processes"]} />
                    <H3>Regulatory Reporting</H3><Bullet items={["Financial statements", "Compliance reports", "Risk exposure disclosures"]} />
                    <H3>Audit Requirements</H3><P>Finance companies must maintain proper accounting records and facilitate audits by internal auditors and external statutory auditors.</P>
                    <H3>Change in Management</H3><P>Any significant change in ownership, management or control structure must be notified to the Authority. In certain cases, prior approval may also be required.</P>
                    <H3>AML / CFT Monitoring</H3><Bullet items={["Customer due diligence", "Transaction monitoring", "Suspicious transaction reporting"]} />

                    {/* Tax Benefits */}
                    <H2 id="Tax Benefits">Tax Benefits of Finance Company in GIFT IFSC</H2>
                    <P>One of the major reasons corporations establish a Finance Company in GIFT IFSC is the attractive tax framework available in the IFSC ecosystem. Key tax incentives typically include:</P>
                    <div className="bg-[rgba(16,185,129,0.04)] border-l-4 border-[#10b981] rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-[#10b981] text-[15px] mb-4">🎯 Tax Benefits</h4>
                        {["Concessional corporate tax regime", "Tax holiday benefits under specified provisions", "Exemption on certain capital gains transactions", "Reduced withholding tax on certain financial activities"].map(b => <div key={b} className="flex items-center gap-2 text-[14px] text-[#374151] mb-2"><span className="text-[#10b981] font-bold">✓</span>{b}</div>)}
                    </div>
                    <P>These benefits significantly improve the efficiency of treasury and financial operations conducted from IFSC.</P>

                    {/* Common Mistakes */}
                    <H2 id="Common Mistakes">Common Mistakes While Setting Up a Finance Company in GIFT IFSC</H2>
                    <P>Despite the attractive regulatory framework, several applicants face challenges during the approval process. Some common mistakes include:</P>
                    <div className="bg-[rgba(245,158,11,0.04)] border-l-4 border-[#F59E0B] rounded-xl p-6 mb-6 space-y-4">
                        <h4 className="font-bold text-[#F59E0B] text-[15px]">⚠️ Common Mistakes to Avoid</h4>
                        {mistakes.map((m, i) => <div key={i} className="flex items-start gap-3"><span className="text-[16px] mt-0.5">⚠️</span><div><h5 className="font-bold text-[#0a1628] text-[14px] mb-0.5">{m.t}</h5><p className="text-[13px] text-[#64748b]">{m.d}</p></div></div>)}
                    </div>
                    <P>Avoiding these mistakes significantly improves the chances of regulatory approval.</P>

                    {/* Business Models */}
                    <H2 id="Business Models">Business Models for Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC may operate under multiple business models depending on the financial objectives of the corporate group establishing the entity.</P>
                    <div className="space-y-5 mb-6">{bizModels.map(m => (
                        <div key={m.n} className="relative p-6 bg-white rounded-xl border-l-4 overflow-hidden shadow-sm" style={{ borderImage: "linear-gradient(to bottom,#0096D6,#10b981) 1" }}>
                            <div className="absolute top-2 right-4 text-[64px] font-black text-[rgba(0,150,220,0.06)] select-none pointer-events-none leading-none">{m.n}</div>
                            <h4 className="font-bold text-[#0a1628] text-[17px] mb-2">{m.t}</h4>
                            <p className="text-[14px] text-[#374151] leading-[1.8] mb-3">{m.d}</p>
                            <ul className="space-y-1">{m.items.map((it, j) => <li key={j} className="flex items-start gap-2 text-[13px] text-[#64748b]"><span className="text-[#0096D6] mt-0.5 text-[8px]">◆</span>{it}</li>)}</ul>
                        </div>
                    ))}</div>

                    {/* Risk Management */}
                    <H2 id="Risk Management">Risk Management Framework for Finance Company in GIFT IFSC</H2>
                    <P>A Finance Company in GIFT IFSC must adopt a comprehensive risk management framework to monitor financial risks arising from treasury activities.</P>
                    <H3>Market Risk</H3><P>Market risk arises from fluctuations in financial markets including interest rate movements, foreign exchange volatility, and commodity price changes. Derivative transactions may be used to hedge such exposures.</P>
                    <H3>Credit Risk</H3><P>Credit risk arises when counterparties fail to honour their financial obligations. Finance companies must maintain policies for counterparty evaluation, exposure limits, and credit monitoring.</P>
                    <H3>Liquidity Risk</H3><P>Liquidity risk occurs when the company is unable to meet its financial obligations. Treasury functions must maintain adequate liquidity buffers and funding arrangements.</P>
                    <H3>Operational Risk</H3><P>Operational risk relates to failures in internal processes, systems or human resources. Robust internal controls and automation systems help mitigate such risks.</P>

                    {/* Strategic Advantages */}
                    <H2 id="Strategic Advantages">Strategic Advantages of Finance Company in GIFT IFSC</H2>
                    <P>Establishing a Finance Company in GIFT IFSC offers several strategic benefits to multinational organisations.</P>
                    <Bullet items={["Global Financial Hub Access — GIFT City provides access to global financial markets while operating within India's regulatory ecosystem.", "Efficient Treasury Operations — Centralised treasury management improves financial visibility and operational efficiency.", "Currency Flexibility — Operations can be conducted in foreign currencies, which simplifies cross-border financial transactions.", "International Regulatory Environment — IFSCA regulations are designed to align with global financial standards.", "Tax and Regulatory Incentives — IFSC entities benefit from favourable regulatory and taxation structures compared to traditional domestic financial institutions."]} />

                    {/* NBFC vs FC */}
                    <H2 id="NBFC vs Finance Company">Comparison: NBFC vs Finance Company in GIFT IFSC</H2>
                    <span className="inline-block px-3 py-1 bg-[rgba(0,150,220,0.08)] border border-[rgba(0,150,220,0.2)] rounded-full text-[12px] font-bold text-[#0096D6] mb-4">📊 Comparison Table</span>
                    <div className="overflow-x-auto mb-6 rounded-2xl border border-gray-100 shadow-sm">
                        <table className="w-full min-w-[600px] text-[13px]">
                            <thead><tr style={{ background: "linear-gradient(135deg,#0077B6,#0096D6)" }}><th className="p-3 text-left text-white font-bold">Particulars</th><th className="p-3 text-left text-white font-bold">RBI NBFC</th><th className="p-3 text-left text-white font-bold">GIFT IFSC Finance Company</th></tr></thead>
                            <tbody>{compTable.map((r, i) => <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50/50'}><td className="p-3 bg-[#f8faff] font-semibold text-[#0a1628] border-r border-gray-100">{r[0]}</td><td className="p-3 text-[#64748b] border-r border-gray-100">{r[1]}</td><td className="p-3 bg-[rgba(0,150,220,0.04)] text-[#0077B6] font-bold">{r[2]}</td></tr>)}</tbody>
                        </table>
                    </div>

                    {/* Conclusion paras */}
                    <P>The regulatory framework for a Finance Company in GIFT IFSC provides multinational corporations and financial institutions with a robust platform to manage treasury operations, capital allocation and financial risk from India's global financial hub.</P>
                    <P>With clear regulatory guidelines, strong governance expectations and internationally aligned compliance standards, GIFT City continues to evolve as a preferred destination for global financial services.</P>
                    <P>For organisations operating across multiple jurisdictions, establishing a Finance Company in GIFT IFSC can significantly enhance operational efficiency, financial control and global capital management.</P>
                    <P>The regulatory ecosystem for Finance Company in GIFT IFSC has been designed to position India as a global hub for international finance and treasury management.</P>
                    <P>With a clear regulatory framework, globally aligned financial practices and strong governance standards, GIFT City offers a compelling platform for multinational corporations seeking to centralise treasury operations.</P>
                    <P>Establishing a Finance Company in GIFT IFSC therefore represents not only a strategic financial decision but also a step towards building globally integrated financial operations.</P>

                    {/* Expert Quote */}
                    <H2 id="Expert Insight">Expert Insight</H2>
                    <div className="relative bg-[rgba(0,150,220,0.04)] border-l-[5px] border-[#0096D6] rounded-2xl p-7 mb-8">
                        <div className="absolute top-4 left-6 text-[72px] font-serif text-[rgba(0,150,220,0.12)] leading-none select-none">&ldquo;</div>
                        <p className="italic text-[17px] text-[#0a1628] leading-[1.8] mb-5 mt-8 relative z-10">&ldquo;True financial innovation does not begin with complex products; it begins with disciplined governance and a culture that respects regulatory intent.&rdquo;</p>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0077B6] text-white flex items-center justify-center text-[14px] font-bold">DK</div>
                            <div><div className="font-bold text-[#0a1628] text-[15px]">CS Devyani Khambhati</div><div className="text-[13px] text-[#0096D6] font-semibold">Compliance Expert ✅</div></div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <H2 id="FAQs">Frequently Asked Questions (FAQs)</H2>
                    <FAQAccordion groups={faqGroups} />

                </main>

                {/* RIGHT SIDEBAR */}
                <aside className="hidden lg:block w-[240px] shrink-0">
                    <div className="sticky top-20 space-y-5">

                        {/* CTA Card */}
                        <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg,#0077B6,#0096D6)" }}>
                            <h3 className="font-bold text-[16px] mb-2 leading-snug">Set Up Finance Company in GIFT City?</h3>
                            <p className="text-white/80 text-[13px] leading-relaxed mb-5">Get expert IFSCA regulatory guidance from our compliance team.</p>
                            <button className="w-full bg-white text-[#0096D6] font-bold text-[14px] rounded-xl py-3 hover:bg-blue-50 transition-colors">📞 Book Free Consultation</button>
                            <p className="text-white/70 text-[12px] text-center mt-3">⚡ Response within 24 hours</p>
                        </div>

                        {/* Expert Card */}
                        <div className="bg-white rounded-2xl border border-[rgba(0,150,220,0.1)] p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0096D6] to-[#0077B6] text-white flex items-center justify-center text-[18px] font-bold">DK</div>
                                <div><div className="font-bold text-[#0a1628] text-[15px]">CS Devyani Khambhati</div><div className="text-[13px] text-[#0096D6] font-semibold">Compliance Expert</div></div>
                            </div>
                            <p className="text-[12px] text-[#94a3b8] mb-3">IFSCA · GIFT City · Treasury</p>
                            <div className="text-[13px] mb-3">⭐⭐⭐⭐⭐ <span className="text-[12px] text-[#64748b]">Expert Reviewed</span></div>
                            <button className="w-full border-2 border-[#0096D6] text-[#0096D6] font-bold text-[13px] rounded-xl py-2.5 hover:bg-blue-50 transition-colors">Ask a Question →</button>
                        </div>

                        {/* Quick Facts */}
                        <div className="bg-white rounded-2xl border border-[rgba(0,150,220,0.1)] p-5">
                            <h4 className="font-bold text-[#0a1628] text-[15px] mb-4">📌 Quick Facts</h4>
                            {[["Regulator", "IFSCA"], ["Location", "GIFT City, Gujarat"], ["Min Capital", "USD 200,000"], ["Personnel", "Min 5 required"], ["Operations", "Within 6 months"], ["Currency", "Foreign currencies"]].map(([l, v], i) => (
                                <div key={i} className={`flex justify-between py-3 ${i > 0 ? 'border-t border-gray-100' : ''}`}><span className="text-[12px] text-[#94a3b8]">{l}</span><span className="text-[13px] text-[#0096D6] font-bold">{v}</span></div>
                            ))}
                        </div>

                        {/* Share */}
                        <div className="bg-white rounded-2xl border border-[rgba(0,150,220,0.1)] p-5">
                            <h4 className="font-bold text-[#0a1628] text-[14px] mb-4">Share This Guide</h4>
                            <div className="flex gap-3">{[{ l: "in", c: "LinkedIn" }, { l: "𝕏", c: "Twitter" }, { l: "💬", c: "WhatsApp" }, { l: "🔗", c: "Copy" }].map((s, i) => <button key={i} title={s.c} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[14px] hover:bg-[#0096D6] hover:text-white hover:border-[#0096D6] transition-all duration-300">{s.l}</button>)}</div>
                        </div>

                    </div>
                </aside>

            </div>

            {/* MOBILE RIGHT SIDEBAR */}
            <div className="lg:hidden px-4 pb-8 max-w-[760px] mx-auto space-y-5">
                <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg,#0077B6,#0096D6)" }}>
                    <h3 className="font-bold text-[16px] mb-2">Set Up Finance Company in GIFT City?</h3>
                    <p className="text-white/80 text-[13px] mb-4">Get expert IFSCA regulatory guidance from our compliance team.</p>
                    <button className="w-full bg-white text-[#0096D6] font-bold text-[14px] rounded-xl py-3">📞 Book Free Consultation</button>
                </div>
            </div>

            {/* Related Articles */}
            <section className="max-w-[1280px] mx-auto px-6 pb-12">
                <h3 className="text-[20px] font-bold text-[#0a1628] mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{[{ tag: "IFSCA", t: "PSP License – IFSCA" }, { tag: "GIFT City", t: "IFSCA Factoring License" }, { tag: "RBI", t: "NBFC License – Complete Guide" }].map((a, i) => (
                    <a key={i} href="#" className="group bg-white rounded-2xl border border-[rgba(0,150,220,0.1)] p-6 hover:border-[#0096D6] hover:shadow-lg transition-all duration-300">
                        <span className="inline-block px-2.5 py-1 bg-blue-50 text-[#0096D6] rounded-full text-[11px] font-bold mb-3">{a.tag}</span>
                        <h4 className="font-bold text-[#0a1628] text-[15px] mb-2 group-hover:text-[#0096D6] transition-colors">{a.t}</h4>
                        <span className="text-[#0096D6] text-[13px] font-semibold">Read More →</span>
                    </a>
                ))}</div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 px-6 text-center text-white" style={{ background: "linear-gradient(135deg,#0055A5,#0096D6)" }}>
                <h2 className="text-[28px] md:text-[36px] font-black mb-4">Ready to Set Up Finance Company in GIFT City?</h2>
                <p className="text-white/80 text-[16px] mb-8 max-w-xl mx-auto">Partner with India's leading IFSCA compliance experts and get your finance company operational faster.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-[#0096D6] font-bold text-[15px] rounded-xl px-8 py-4 hover:bg-blue-50 transition-colors">Get Started Free →</button>
                    <button className="border-2 border-white/30 text-white font-bold text-[15px] rounded-xl px-8 py-4 hover:bg-white/10 transition-colors">Talk to Expert</button>
                </div>
            </section>

            {/* Footer */}

        </div>
    );
}
