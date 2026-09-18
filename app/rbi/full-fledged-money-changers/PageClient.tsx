'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'FFMC License: Quick Overview' },
  { id: 'what-is', title: 'What is a Full Fledged Money Changer License?' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'who-needs', title: 'Who Needs an FFMC License?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'permissible-activities', title: 'Permissible and Restricted Activities' },
  { id: 'ffmc-vs-ad', title: 'FFMC vs Authorised Dealer Categories' },
  { id: 'ffmc-vs-mts', title: 'FFMC vs Money Transfer Service' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'Step-by-Step Registration Process' },
  { id: 'fees', title: 'Fees Structure' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'post-registration', title: 'Post-Registration Compliance' },
  { id: 'advanced-compliance', title: 'Advanced Compliance Obligations' },
  { id: 'internal-controls', title: 'Internal Control Mechanism' },
  { id: 'policy-framework', title: 'Internal Policy Framework Required' },
  { id: 'risk-management', title: 'Risk Management Framework' },
  { id: 'inspection', title: 'Inspection and Enforcement by RBI' },
  { id: 'red-flags', title: 'Regulatory Red Flags' },
  { id: 'penalties', title: 'Penalties under FEMA' },
  { id: 'cancellation', title: 'Cancellation or Suspension of Licence' },
  { id: 'rejection-reasons', title: 'Common Application Rejection Reasons' },
  { id: 'common-mistakes', title: 'Common Mistakes and Ground Realities' },
  { id: 'business-models', title: 'Ideal Business Models Using FFMC' },
  { id: 'revenue-model', title: 'Revenue Model Breakdown' },
  { id: 'cost-structure', title: 'Cost Structure of Running an FFMC' },
  { id: 'technology', title: 'Technology Stack and the Digital FFMC Model' },
  { id: 'branch-expansion', title: 'Branch Expansion Strategy' },
  { id: 'operational-model', title: 'End-to-End Operational Model' },
  { id: 'accounting-gst', title: 'Accounting and GST Treatment' },
  { id: 'scalability', title: 'Scalability Strategy' },
  { id: 'lifecycle', title: 'Lifecycle of an FFMC Licence' },
  { id: 'future-outlook', title: 'Future Outlook of the FFMC Business' },
  { id: 'checklist', title: 'Pre-Application Checklist' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our RBI Compliance Expert' }
];

const faqs = ([
  ["What is an FFMC License in India?", "An FFMC License is an authorisation issued by the Reserve Bank of India allowing entities to deal in foreign exchange for specified purposes.", ["Permits money changing activities", "Governed under FEMA regulations"]],
  ["Who issues the FFMC License?", "The FFMC License is issued by the Reserve Bank of India.", ["Acts as the regulatory authority", "Ensures compliance with FEMA guidelines"]],
  ["What activities are allowed under FFMC License?", "FFMCs can undertake authorised money changing activities.", ["Purchase foreign currency", "Sell foreign exchange for permitted purposes"]],
  ["Is FFMC License mandatory in India?", "Yes, it is mandatory to obtain FFMC License to deal in foreign exchange legally.", ["Required under FEMA", "Unauthorised dealing is prohibited"]],
  ["What is the full form of FFMC?", "FFMC stands for Full Fledged Money Changer.", ["RBI authorised entity", "Deals in forex transactions"]],
  ["Can individuals apply for FFMC License?", "No, individuals cannot apply.", ["Only companies registered under Companies Act are eligible"]],
  ["What is the objective of FFMC License?", "The objective is to regulate forex transactions.", ["Ensure transparency", "Prevent illegal currency dealings"]],
  ["What law governs FFMC License in India?", "FFMC License is governed under FEMA, 1999.", ["Regulated by RBI", "Supported by master directions"]],
  ["Can FFMC deal in all types of forex transactions?", "No, only permitted transactions are allowed.", ["Travel-related forex", "Specified current account transactions"]],
  ["What is Authorised Dealer vs FFMC?", "FFMCs have limited scope compared to Authorised Dealers.", ["FFMC: basic forex services", "AD: full banking forex operations"]],
  ["Can FFMC open branches?", "Yes, subject to RBI approval.", ["Branch expansion requires compliance"]],
  ["Is FFMC License valid across India?", "Yes, it is valid pan-India.", ["Subject to branch approvals"]],
  ["What is the role of RBI in FFMC regulation?", "RBI regulates, supervises, and monitors FFMCs.", ["Issues guidelines", "Conducts inspections"]],
  ["Can FFMC issue forex cards?", "No, generally not allowed.", ["Limited to currency exchange"]],
  ["Is FFMC part of banking system?", "No, FFMCs are non-banking entities.", ["Operate under RBI authorisation"]],
  ["Who can apply for FFMC License?", "Only companies registered under Companies Act can apply.", ["LLPs and individuals not eligible"]],
  ["What is the minimum net owned fund requirement?", "Minimum ₹25 lakh for single branch FFMC.", ["₹50 lakh for multiple branches"]],
  ["Is prior experience required?", "Not mandatory, but preferred.", ["Helps in RBI evaluation"]],
  ["Can NBFC apply for FFMC License?", "Yes, NBFCs can apply if they meet conditions.", ["Must comply with RBI norms"]],
  ["Can foreign companies apply for FFMC License?", "No, only Indian incorporated companies are eligible."],
  ["Is physical office mandatory?", "Yes, a proper place of business is required."],
  ["Are directors required to be fit and proper?", "Yes, directors must meet fit and proper criteria.", ["Clean track record", "No criminal history"]],
  ["Can startup companies apply?", "Yes, if they meet capital requirements."],
  ["Can partnership firms apply?", "No, only companies are allowed."],
  ["Is GST registration required?", "Yes, GST compliance is expected post registration."],
  ["What is the process to apply for FFMC License?", "The process involves RBI application and approval.", ["Prepare documents", "Submit to RBI", "Undergo verification"]],
  ["Where to apply for FFMC License?", "Application is submitted to RBI regional office."],
  ["Is online application available?", "Partially, but physical submission is required."],
  ["Does RBI conduct inspection before approval?", "Yes, RBI may inspect the premises."],
  ["What is the first step in FFMC registration?", "Incorporation of company is the first step."],
  ["Is business plan required?", "Yes, a detailed business plan is required."],
  ["What is RBI scrutiny process?", "RBI evaluates financials and management."],
  ["Can application be rejected?", "Yes, if conditions are not met."],
  ["Is there any interview with RBI?", "Sometimes, RBI may call for clarification."],
  ["Can we reapply after rejection?", "Yes, after rectifying deficiencies."],
  ["What documents are required for FFMC License?", "Key documents include:", ["COI, MOA, AOA", "Financial statements", "KYC of directors"]],
  ["Is auditor certificate required?", "Yes, for net owned fund certification."],
  ["Are board resolutions required?", "Yes, approving FFMC application."],
  ["Is KYC of directors mandatory?", "Yes, PAN, Aadhaar, and background details required."],
  ["Is bank report required?", "Yes, banker’s confidential report is required."],
  ["What is the cost of FFMC License in India?", "Cost varies based on compliance and consultancy.", ["₹3–10 lakh approx overall"]],
  ["Is RBI application fee applicable?", "No significant government fee, but compliance costs apply."],
  ["What is professional fee for FFMC License?", "Depends on consultant and complexity."],
  ["Are there annual costs?", "Yes, compliance and audit costs apply."],
  ["Is capital blocked?", "Yes, net owned fund must be maintained."],
  ["How much time does FFMC License take?", "Typically 3–6 months."],
  ["Can approval be fast-tracked?", "No official fast-track process exists."],
  ["What delays FFMC approval?", "Common delays include:", ["Incomplete documents", "RBI queries"]],
  ["Is provisional approval given?", "No, only final approval is granted."],
  ["When can business start?", "Only after receiving RBI licence."],
  ["What compliances are required after FFMC License?", "Key compliances include:", ["AML/KYC compliance", "RBI reporting"]],
  ["Is audit mandatory?", "Yes, statutory audit is required."],
  ["Are AML guidelines applicable?", "Yes, under PMLA provisions."],
  ["Is reporting to RBI mandatory?", "Yes, periodic reporting is required."],
  ["Can FFMC surrender license?", "Yes, with RBI approval."],
  ["What happens if FFMC operates without license?", "It is illegal and punishable.", ["Penalties under FEMA", "Possible prosecution"]],
  ["Can RBI cancel FFMC License?", "Yes, for non-compliance."],
  ["What are common compliance failures?", "Common risks include:", ["KYC lapses", "Reporting failures"]],
  ["Is there penalty for non-reporting?", "Yes, monetary penalties apply."],
  ["Can directors be held liable?", "Yes, under regulatory provisions."],
  ["Can I start forex business without FFMC?", "No, it is strictly prohibited."],
  ["Can travel agents get FFMC License?", "Yes, if incorporated as company."],
  ["Can FFMC operate online?", "Limited online operations allowed."],
  ["Can FFMC tie up with banks?", "Yes, for operational support."],
  ["Can FFMC expand internationally?", "No, limited to India operations."],
  ["What are latest RBI guidelines for FFMC?", "As per RBI Master Directions on Money Changing Activities."],
  ["Can FFMC upgrade to Authorised Dealer?", "No direct upgrade; fresh approval required."],
  ["What is concurrent audit requirement?", "RBI may require periodic audits."],
  ["Can FFMC handle inward remittance?", "Only limited scope transactions allowed."],
  ["How RBI monitors FFMC operations?", "Through inspections and reporting systems."],
  ["Is KYC mandatory for all customers in FFMC operations?", "Yes, KYC is mandatory for all transactions.", ["Identity verification required", "Records must be maintained as per RBI guidelines"]],
  ["Are FFMCs required to follow PMLA regulations?", "Yes, compliance with Prevention of Money Laundering Act is compulsory.", ["Suspicious transaction reporting", "Customer due diligence"]],
  ["Is concurrent audit mandatory for FFMCs?", "Yes, RBI expects periodic internal or concurrent audits.", ["Ensures compliance", "Detects irregularities"]],
  ["What registers must FFMC maintain?", "FFMC must maintain:", ["Daily transaction register", "Foreign currency stock register"]],
  ["Is customer transaction record retention required?", "Yes, records must be maintained for at least 5 years."],
  ["Can FFMC outsource compliance functions?", "Yes, but responsibility remains with the company."],
  ["Is appointment of compliance officer required?", "Yes, a designated compliance officer is expected."],
  ["Is training required for FFMC staff?", "Yes, staff must be trained on forex and AML compliance."],
  ["Are surprise inspections conducted by RBI?", "Yes, RBI may conduct inspections anytime."],
  ["Is renewal of FFMC License required?", "No, but ongoing compliance is mandatory to retain licence."],
  ["What happens if KYC norms are violated?", "Non-compliance attracts penalties.", ["Monetary fines", "Possible licence suspension"]],
  ["What if FFMC fails to maintain records?", "It is treated as regulatory violation.", ["Penalty under FEMA", "Adverse inspection remarks"]],
  ["Can RBI impose monetary penalties on FFMC?", "Yes, RBI can impose penalties for violations."],
  ["What happens in case of fraudulent transactions?", "Severe action may be taken.", ["Investigation", "Possible cancellation of licence"]],
  ["Can FFMC directors face legal action?", "Yes, directors can be held personally liable."],
  ["What if FFMC exceeds permitted limits?", "It is considered a violation.", ["Regulatory action", "Penalties applicable"]],
  ["Is there penalty for delayed reporting?", "Yes, delayed submission attracts penalties."],
  ["Can licence be suspended temporarily?", "Yes, RBI may suspend operations for non-compliance."],
  ["What are reputational risks in FFMC business?", "Non-compliance affects credibility.", ["Loss of clients", "Regulatory scrutiny"]],
  ["Can criminal proceedings be initiated?", "Yes, in serious violations under FEMA/PMLA."],
  ["Can FFMC operate at airports?", "Yes, subject to RBI approval and permissions."],
  ["Can FFMC deal in digital currencies?", "No, cryptocurrency dealings are not permitted."],
  ["Can FFMC serve corporate clients?", "Yes, within permitted forex transactions."],
  ["Can FFMC open multiple branches?", "Yes, with RBI approval and sufficient capital."],
  ["Can FFMC operate franchise model?", "Yes, through franchise agreements with RBI approval."],
  ["Can FFMC issue prepaid forex cards?", "No, only Authorised Dealers can issue such instruments."],
  ["Can FFMC accept online payments?", "Yes, with proper compliance and KYC."],
  ["Can FFMC operate from shared office?", "Generally no, dedicated premises preferred."],
  ["Can FFMC tie up with tour operators?", "Yes, commonly done in practice."],
  ["Can FFMC handle student forex requirements?", "Yes, for permitted education-related transactions."],
  ["What is RBI Master Direction on Money Changing Activities?", "It is the primary regulatory framework governing FFMCs.", ["Issued by RBI", "Covers operational guidelines"]],
  ["What is Net Owned Fund (NOF) calculation?", "NOF is calculated as per RBI norms.", ["Paid-up capital", "Minus accumulated losses"]],
  ["Can FFMC change its shareholding?", "Yes, but RBI must be informed."],
  ["What is the role of statutory auditor in FFMC?", "Auditor certifies compliance and financials."],
  ["Can FFMC merge with another entity?", "Yes, subject to RBI approval."],
  ["What are internal control requirements?", "Strong internal controls are mandatory.", ["Risk management", "Transaction monitoring"]],
  ["Can FFMC deal in capital account transactions?", "No, only current account transactions allowed."],
  ["What is AML risk in FFMC operations?", "High risk due to cash transactions.", ["Requires strict monitoring"]],
  ["What is Suspicious Transaction Reporting (STR)?", "Mandatory reporting under PMLA."],
  ["Can FFMC handle inward remittances?", "Limited handling allowed as per RBI guidelines."],
  ["What are reporting formats prescribed by RBI?", "RBI prescribes periodic returns and formats."],
  ["Can FFMC appoint agents?", "Yes, with RBI approval and compliance."],
  ["What is inspection cycle of RBI?", "Periodic or risk-based inspections."],
  ["Can FFMC convert into bank?", "No, separate licensing required."],
  ["What is forex exposure risk for FFMC?", "Risk due to currency fluctuations."],
  ["How is forex inventory managed?", "Through daily reconciliation and limits."],
  ["Can FFMC hold foreign currency overnight?", "Yes, within prescribed limits."],
  ["What are RBI reporting timelines?", "As per regulatory guidelines."],
  ["Can FFMC use digital KYC?", "Yes, subject to RBI KYC norms."],
  ["What is role of compliance audit?", "Ensures adherence to RBI regulations."],
  ["Can FFMC be listed company?", "Yes, if compliant with regulations."],
  ["Can FFMC accept cash transactions?", "Yes, but subject to KYC and reporting norms."],
  ["What are customer due diligence norms?", "Mandatory under AML guidelines."],
  ["Can FFMC handle NRI transactions?", "Limited services allowed as per RBI rules."],
  ["What is difference between FFMC and AD Category II?", "AD Category II has wider scope than FFMC."],
  ["Can FFMC operate 24x7?", "Yes, subject to local laws and approvals."],
  ["What are cyber security requirements?", "Basic IT security controls required."],
  ["Can FFMC face licence cancellation without notice?", "Generally, RBI provides opportunity to respond."],
  ["What is role of board in FFMC compliance?", "Board ensures governance and oversight."],
  ["Can FFMC handle bulk forex transactions?", "Limited as per RBI guidelines."],
  ["What happens if NOF falls below threshold?", "Licence may be cancelled or suspended."],
  ["Can FFMC change business model?", "Yes, but RBI approval required."],
  ["What is fit and proper criteria?", "Directors must have integrity and clean record."],
  ["Can FFMC outsource operations?", "Limited outsourcing allowed with control."],
  ["What is RBI compliance culture expectation?", "Strong governance and transparency expected."],
  ["Can FFMC handle high-value forex deals?", "Subject to RBI transaction limits."],
  ["What is reporting to FIU-IND?", "Mandatory for suspicious transactions."],
  ["Can FFMC be penalised for employee misconduct?", "Yes, company remains liable."],
  ["What is internal audit frequency?", "Generally quarterly or periodic."],
  ["Can FFMC expand into remittance business?", "Limited scope unless authorised separately."],
  ["What are key RBI inspection areas?", "RBI focuses on:", ["KYC compliance", "Transaction records"]],
  ["Can FFMC advertise services?", "Yes, but must follow fair practices."],
  ["What is business continuity requirement?", "Disaster recovery and backup systems required."],
  ["Can FFMC operate in IFSC?", "No, separate licensing required under International Financial Services Centres Authority."],
  ["What is customer grievance mechanism?", "Mandatory system to resolve complaints."],
  ["Can FFMC be audited by RBI directly?", "Yes, RBI may conduct inspections."],
  ["What is role of compliance reporting officer?", "Ensures timely regulatory reporting."],
  ["Can FFMC engage in speculative forex trading?", "No, strictly prohibited."],
  ["What are ethical requirements for FFMC?", "High standards of integrity required."],
  ["What is the biggest compliance risk in FFMC business?", "AML/KYC failure is the biggest risk.", ["Leads to penalties", "May result in licence cancellation"]]
] as [string, string, string[]?][]).map(([q, a, points]) => ({ q, a, points }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function CardGrid({ cards, columns = 'md:grid-cols-2' }: { cards: Card[]; columns?: string }) {
  return <div className={`grid grid-cols-1 ${columns} gap-4 my-6`}>{cards.map((card) => <div key={card.title} className="rounded-xl border border-[rgba(0,150,220,0.12)] bg-white p-5 shadow-[0_4px_18px_rgba(0,100,200,0.04)]"><h3 className="!p-0 !mb-2 !text-[#0a1628]">{card.title}</h3><div className="text-[14px] leading-7 text-gray-600">{card.body}</div></div>)}</div>;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id}>{title}</h2>{children}</section>;
}

function Timeline({ steps }: { steps: { title: string; body: string }[] }) {
  return <div className="step-timeline">{steps.map((step, index) => <div className="step-item" key={step.title}><div className="step-dot" /><div className="step-card"><div className="step-label">Step {index + 1}</div><h3>{step.title}</h3><p>{step.body}</p></div></div>)}</div>;
}

function Flow({ items }: { items: string[] }) {
  return <div className="my-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-sky-50 to-white p-5"><div className="grid grid-cols-1 gap-3">{items.map((item, index) => <div key={item} className="flex items-center gap-3"><div className="min-w-8 h-8 rounded-full bg-[#0a1628] text-white text-sm font-bold flex items-center justify-center">{index + 1}</div><div className="flex-1 rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-[#0a1628] shadow-sm">{item}</div></div>)}</div></div>;
}

function CheckList({ items }: { items: string[] }) {
  return <ul className="my-6 grid grid-cols-1 gap-2 md:grid-cols-2 !pl-0">{items.map((item) => <li key={item} className="flex items-start gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 text-[14px] leading-6 text-gray-700 !mb-0 list-none"><span className="text-[#10b981] font-bold shrink-0">✔</span><span>{item}</span></li>)}</ul>;
}

function FaqList({ items }: { items: { q: string; a: string; points?: string[] }[] }) {
  return <div className="space-y-3">{items.map((faq) => (
    <details key={faq.q} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer font-semibold text-[#0a1628]">{faq.q}</summary>
      <p className="mt-3 text-sm leading-7 text-gray-600">{faq.a}</p>
      {faq.points && faq.points.length > 0 ? <ul className="mt-2 text-sm leading-7 text-gray-600">{faq.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
    </details>
  ))}</div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '💱', label: 'RBI Forex Licensing' }, { emoji: '🏦', label: 'FEMA Compliance' }, { emoji: '📋', label: 'Application & AML Setup' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'RBI Services', href: '/rbi' }, { label: 'Full Fledged Money Changer License' }]}
      title="Full Fledged Money Changer License - Complete Guide to FFMC Registration in India"
      heroDescription={<><p>A <strong>Full Fledged Money Changer License</strong> is the regulatory approval granted by the Reserve Bank of India to entities authorised to deal in foreign exchange for permitted transactions such as currency exchange, travel forex and remittance support. From a compliance perspective it is a Category-II Authorised Dealer licence under FEMA, governed by the RBI Master Direction on Money Changing Activities.</p><div className="flex flex-wrap gap-2 mt-5">{['FEMA, 1999', 'RBI Master Direction', 'Rs. 25 Lakh / Rs. 50 Lakh NOF', 'Company Structure Only', 'KYC and AML Framework', 'Encashment Certificates', 'Branch Expansion Support', 'Post-Approval Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for FFMC License</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check FFMC Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="30 min read"
      displayYear="2026"
      focusKeyword="Full Fledged Money Changer License"
      sections={sections}
      ctaTitle="Plan Your FFMC Application"
      ctaDescription="Discuss net owned fund, object clause, AML and KYC framework, business plan and RBI regional office filing."
      quickFacts={[{ label: 'Regulator', value: 'RBI' }, { label: 'Governing Law', value: 'FEMA, 1999' }, { label: 'NOF (Single Branch)', value: 'Rs. 25 Lakh' }, { label: 'NOF (Multi Branch)', value: 'Rs. 50 Lakh' }, { label: 'RBI Application Fee', value: 'Nil' }]}
      relatedArticles={[
        { title: 'FEMA Registration', href: '/fema/fema-registration', category: 'FEMA', description: 'Registration and approval requirements under the FEMA framework.' },
        { title: 'Compliance under FEMA', href: '/fema/compliance-under-fema', category: 'FEMA', description: 'Ongoing FEMA compliance obligations for cross-border businesses.' },
        { title: 'PPI Registration in India', href: '/rbi/ppi-registration-in-india', category: 'RBI', description: 'RBI authorisation for prepaid payment instruments and wallets.' }
      ]}
      finalCtaTitle="Start Your FFMC License Application with Estabizz"
      finalCtaDescription="From application to approval, Estabizz supports end-to-end FFMC licensing covering documentation drafting, net owned fund certification, AML and KYC policy design, RBI coordination and post-approval compliance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to RBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for FFMC License</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check FFMC Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Full Fledged Money Changer License: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Reserve Bank of India' },
          { title: 'Governing Law', body: 'Foreign Exchange Management Act, 1999 (FEMA)' },
          { title: 'Key Direction', body: 'RBI Master Direction on Money Changing Activities, read with updated RBI circulars on forex transactions' },
          { title: 'Licence Category', body: 'Category-II Authorised Dealer licence under FEMA' },
          { title: 'Eligible Constitution', body: 'Company registered under the Companies Act. LLPs and individuals are not eligible' },
          { title: 'Net Owned Fund', body: 'Rs. 25 lakh for a single branch, Rs. 50 lakh for multiple branches, certified by a Chartered Accountant' },
          { title: 'Object Clause', body: 'Forex activity must be expressly included in the MOA' },
          { title: 'RBI Application Fee', body: 'Nil. Cost is driven by professional fees and compliance setup' },
          { title: 'Filing Office', body: 'Application is submitted to the relevant RBI regional office' },
          { title: 'Indicative Timeline', body: 'Roughly 3 to 6 months end to end, depending on documentation readiness' },
          { title: 'Validity', body: 'Valid pan-India, subject to separate branch approvals' },
          { title: 'Core Compliance', body: 'KYC and AML norms, transaction registers, periodic RBI reporting and audit' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be confirmed against the applicant&rsquo;s constitution, capital position, branch plan, proposed forex activities and the latest RBI Master Direction, circulars and regional office practice at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is a Full Fledged Money Changer License?">
        <p>In simple terms, a Full Fledged Money Changer License allows authorised entities to legally deal in foreign exchange in India. From a compliance perspective it is a Category-II Authorised Dealer licence under FEMA.</p>
        <p>Legally speaking, FFMCs are governed by the Foreign Exchange Management Act, 1999 and the RBI Master Directions on Money Changing Activities. Dealing in foreign exchange without this authorisation is prohibited.</p>
        <div className="info-box">FFMC bridges the gap between banks and end users by offering faster and more flexible forex services to travellers, students and businesses, within a tightly defined regulatory perimeter.</div>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Reserve Bank of India'],
          ['Governing Law', 'FEMA, 1999'],
          ['Key Direction', 'RBI Master Direction on Money Changing Activities'],
          ['Applicable Circulars', 'Updated RBI circulars on forex transactions'],
          ['Core Obligations', 'KYC and AML norms, reporting requirements and strictly permissible forex transactions'],
          ['Regulatory Powers', 'Authorisation, inspection, surveillance, penalty, suspension and cancellation']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs a Full Fledged Money Changer License?">
        <DataTable headers={['Entity Type', 'Why the Licence is Required']} rows={[
          ['Travel and tourism companies', 'Bundled travel and forex services involve dealing in foreign exchange'],
          ['Forex exchange businesses', 'Currency purchase and sale is the core licensed activity'],
          ['Airport currency exchange operators', 'High-footfall walk-in exchange requires RBI authorisation'],
          ['Financial service providers offering forex services', 'Forex services cannot be offered without authorisation under FEMA'],
          ['Companies dealing in remittance or currency conversion', 'Conversion activity falls within money changing activities']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for FFMC License">
        <DataTable headers={['Criteria', 'Requirement', 'Practical Note']} rows={[
          ['Constitution', 'Company registered under the Companies Act', 'LLPs and individuals are not eligible'],
          ['Net Owned Fund', 'Rs. 25 lakh for a single branch, Rs. 50 lakh for multiple branches', 'Must be certified by a Chartered Accountant'],
          ['Business Objective', 'Forex activities stated in the MOA', 'Mandatory inclusion'],
          ['Fit and Proper Status', 'Directors must be credible', 'RBI checks background'],
          ['Compliance System', 'KYC and AML framework', 'Strong internal control required']
        ]} />
      </Section>

      <Section id="permissible-activities" title="Permissible and Restricted Activities">
        <h3>Allowed Activities</h3>
        <CheckList items={['Purchase of foreign currency notes, coins and traveller’s cheques', 'Sale of foreign exchange for private visits', 'Sale of foreign exchange for business travel', 'Sale of foreign exchange for medical treatment abroad', 'Sale of foreign exchange for education abroad', 'Issuance of encashment certificates']} />
        <h3>Restricted Activities</h3>
        <DataTable headers={['Restricted Activity', 'Position']} rows={[
          ['Lending in foreign currency', 'Not permitted under an FFMC licence'],
          ['Speculative forex trading', 'Not permitted'],
          ['Cross-border capital account transactions', 'Outside the FFMC perimeter']
        ]} />
      </Section>

      <Section id="ffmc-vs-ad" title="FFMC vs Authorised Dealer (AD Category I and II)">
        <DataTable headers={['Parameter', 'FFMC', 'AD Category I', 'AD Category II']} rows={[
          ['Regulator', 'RBI', 'RBI', 'RBI'],
          ['Scope', 'Currency exchange', 'Full forex services', 'Limited forex'],
          ['Lending Authority', 'No', 'Yes', 'No'],
          ['Remittance', 'Limited', 'Full', 'Limited'],
          ['Forex Cards', 'No', 'Yes', 'No']
        ]} />
        <div className="info-box"><strong>Practical insight:</strong> FFMC is ideal for forex exchange businesses, whereas AD Category licences are more suited to banks and large financial institutions.</div>
      </Section>

      <Section id="ffmc-vs-mts" title="FFMC vs Money Transfer Service (MTS)">
        <DataTable headers={['Parameter', 'FFMC', 'MTS']} rows={[
          ['Activity', 'Forex exchange', 'Remittance'],
          ['Regulator', 'RBI', 'RBI'],
          ['Currency Handling', 'Physical and digital', 'Mostly digital'],
          ['Scope', 'Limited forex', 'Money transfer']
        ]} />
        <h3>FFMC vs Fintech Forex Platforms</h3>
        <DataTable headers={['Parameter', 'FFMC', 'Fintech Forex']} rows={[
          ['Regulatory Status', 'RBI licensed', 'Often partner-based'],
          ['Trust Factor', 'High', 'Moderate'],
          ['Compliance Burden', 'High', 'Medium'],
          ['Scalability', 'Controlled', 'High']
        ]} />
        <p>FFMC provides regulatory credibility, while a fintech layer enhances customer reach. The two are complementary rather than alternatives.</p>
      </Section>

      <Section id="documents" title="Documents Required for FFMC License">
        <DataTable headers={['Document', 'Purpose', 'Remarks']} rows={[
          ['Certificate of Incorporation', 'Legal existence proof', 'MCA-issued'],
          ['MOA and AOA', 'Business scope verification', 'Forex activity must be included'],
          ['Net Worth Certificate', 'Financial eligibility', 'Certified by a Chartered Accountant'],
          ['Board Resolution', 'Approval for application', 'Mandatory'],
          ['Banker’s Confidential Report', 'Financial credibility', 'Required by RBI'],
          ['KYC of Directors', 'Identity verification', 'PAN and Aadhaar'],
          ['Business Plan', 'Operational clarity', 'Must be detailed']
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Process for FFMC Registration">
        <Timeline steps={[
          { title: 'Incorporate a company with forex activity in the MOA', body: 'The object clause must expressly permit money changing and forex activities. LLPs and individuals are not eligible applicants.' },
          { title: 'Ensure the Net Owned Fund requirement is met', body: 'Rs. 25 lakh for a single branch or Rs. 50 lakh for multiple branches, certified by a Chartered Accountant.' },
          { title: 'Prepare documentation and the compliance framework', body: 'Business plan, KYC and AML policy, internal controls, board resolution and the banker’s confidential report.' },
          { title: 'Submit the application to the RBI regional office', body: 'Filing is made to the regional office having jurisdiction over the registered office.' },
          { title: 'RBI review and due diligence', body: 'RBI examines financial strength, director background, business plan clarity and compliance readiness.' },
          { title: 'Grant of the FFMC Licence', body: 'On approval, operational setup, staff training and reporting systems must be live before business commences.' }
        ]} />
      </Section>

      <Section id="fees" title="Fees Structure">
        <DataTable headers={['Particulars', 'Amount', 'Remarks']} rows={[
          ['RBI Application Fees', 'Nil', 'No official fee'],
          ['Professional Fees', 'Variable', 'Depends on consultant and scope'],
          ['Compliance Setup Cost', 'Moderate', 'AML and KYC systems']
        ]} />
        <div className="info-box">There is no RBI application fee. The real cost of an FFMC is the compliance infrastructure: AML monitoring, audit, trained staff and technology that produces a reliable audit trail.</div>
      </Section>

      <Section id="timeline" title="Timeline for FFMC License">
        <DataTable headers={['Stage', 'Timeline', 'Notes']} rows={[
          ['Documentation Preparation', '2-3 weeks', 'Depends on readiness'],
          ['RBI Application Review', '2-4 months', 'Case-specific'],
          ['Approval Grant', '1-2 months', 'After verification']
        ]} />
      </Section>

      <Section id="post-registration" title="Post-Registration Compliance">
        <p>FFMC entities must maintain an active compliance discipline after approval. As per applicable regulatory guidelines, non-compliance may result in cancellation of the licence.</p>
        <CheckList items={['Maintenance of proper transaction records', 'Periodic reporting to RBI', 'Compliance with KYC and AML guidelines', 'Internal audit and concurrent audit', 'Transparent display of exchange rates']} />
        <div className="info-box">From a compliance perspective, obtaining the FFMC Licence is only the beginning. The real regulatory responsibility starts post-approval.</div>
      </Section>

      <Section id="advanced-compliance" title="Advanced Compliance Obligations">
        <DataTable headers={['Obligation', 'What It Covers']} rows={[
          ['Daily Transaction Register Maintenance', 'All forex transactions recorded in prescribed formats, including encashment certificates and purchase / sale registers'],
          ['Concurrent Audit System', 'Mandatory for multi-branch FFMCs and used for real-time compliance monitoring'],
          ['Annual Statutory Audit', 'Certification of compliance with RBI guidelines and submission of the audit report to RBI'],
          ['Suspicious Transaction Reporting (STR)', 'Mandatory reporting to FIU-IND under the Prevention of Money Laundering Act'],
          ['KYC and Customer Due Diligence', 'PAN and Aadhaar verification, and passport verification for foreign nationals'],
          ['Display and Transparency Norms', 'Exchange rates prominently displayed, with no hidden charges permitted']
        ]} />
        <p>Businesses with a separate AML reporting footprint often review the <Link href="/fiu-ind-aml">FIU-IND and AML framework</Link> alongside their FFMC obligations.</p>
      </Section>

      <Section id="internal-controls" title="Internal Control Mechanism (Must-Have for RBI Comfort)">
        <CheckList items={['Dual verification system for transactions', 'Maker-checker mechanism', 'Daily reconciliation', 'Periodic compliance review', 'Management oversight']} />
        <div className="info-box">RBI focuses more on governance and control than on documentation alone. A proper audit trail is what carries an inspection.</div>
      </Section>

      <Section id="policy-framework" title="Internal Policy Framework Required">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'AML Policy', body: 'Customer risk categorisation, monitoring thresholds and STR escalation to FIU-IND.' },
          { title: 'Risk Management Policy', body: 'Currency, fraud, counterfeit and operational risk identification and mitigation.' },
          { title: 'Internal Audit Policy', body: 'Audit scope, frequency, reporting lines and corrective-action tracking.' },
          { title: 'Customer Acceptance Policy', body: 'Onboarding standards, documentation requirements and prohibited customer categories.' }
        ]} />
      </Section>

      <Section id="risk-management" title="Risk Management Framework for FFMCs">
        <p>Legally speaking, FFMCs operate in a highly sensitive financial domain where risks of money laundering, fraud and regulatory breaches are significant.</p>
        <DataTable headers={['Key Risk Area', 'Recommended Control']} rows={[
          ['Currency fraud and counterfeit risk', 'Strong internal control systems and staff detection training'],
          ['AML violations', 'Automated transaction monitoring and STR discipline'],
          ['Improper customer identification', 'Structured KYC and customer due diligence at onboarding'],
          ['Misreporting or non-reporting', 'Periodic internal audits and reconciliation controls']
        ]} />
      </Section>

      <Section id="inspection" title="Inspection and Enforcement by RBI">
        <DataTable headers={['Type of Inspection', 'What RBI Checks']} rows={[
          ['On-site inspection', 'Transaction records and physical registers'],
          ['Off-site surveillance', 'Periodic returns and reported data'],
          ['Surprise audits', 'KYC compliance, audit reports and AML systems']
        ]} />
        <div className="warning-box"><strong>Practical insight:</strong> RBI inspections are documentation-heavy. Even small gaps can result in compliance observations.</div>
      </Section>

      <Section id="red-flags" title="Regulatory Red Flags (High-Risk Triggers)">
        <DataTable headers={['Trigger', 'Why It Attracts Scrutiny']} rows={[
          ['High-value cash transactions without KYC', 'Direct AML exposure and a FEMA breach'],
          ['Frequent small-value structured transactions', 'Classic structuring pattern used to avoid reporting thresholds'],
          ['Mismatch in transaction reporting', 'Suggests weak reconciliation or concealment'],
          ['Non-maintenance of audit trails', 'Makes compliance impossible to demonstrate during inspection']
        ]} />
        <div className="warning-box">RBI inspections are stringent, and even minor lapses can lead to penalties or licence suspension.</div>
      </Section>

      <Section id="penalties" title="Penalties under FEMA for Non-Compliance">
        <DataTable headers={['Consequence', 'Trigger']} rows={[
          ['Monetary penalties', 'Breach of FEMA provisions or RBI directions'],
          ['Suspension of operations', 'Serious or continuing non-compliance'],
          ['Cancellation of licence', 'Repeated violations or loss of fit and proper status'],
          ['Criminal proceedings', 'Severe cases involving concealment or wilful misuse']
        ]} />
        <p>Common violations include unauthorised forex transactions, non-reporting of suspicious transactions and misuse of the licence.</p>
      </Section>

      <Section id="cancellation" title="Cancellation or Suspension of FFMC License">
        <p>Under relevant provisions, RBI may cancel or suspend a licence in cases of:</p>
        <CheckList items={['Non-compliance with FEMA', 'Violation of AML and KYC norms', 'Misreporting or concealment', 'Financial instability']} />
      </Section>

      <Section id="rejection-reasons" title="Common Application Rejection Reasons">
        <DataTable headers={['Rejection Reason', 'How to Pre-empt It']} rows={[
          ['Weak financial background', 'Demonstrate net owned fund with a clean, CA-certified financial track record'],
          ['Incomplete documentation', 'Close every document gap before filing rather than during RBI queries'],
          ['Poorly drafted business plan', 'Present realistic volumes, locations, staffing and revenue assumptions'],
          ['Lack of clarity in forex operations', 'Document the operational flow from onboarding to encashment certificate'],
          ['Directors failing fit and proper criteria', 'Review director background and disclose proactively']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes and Ground Realities">
        <h3>Mistakes to Avoid at Application Stage</h3>
        <CheckList items={['Inadequate Net Owned Fund calculation', 'Missing forex activity in the MOA', 'Weak AML and KYC framework', 'Improper documentation', 'Lack of trained personnel']} />
        <h3>Real-World Compliance Challenges</h3>
        <CheckList items={['Staff not properly trained in KYC norms', 'Delay in STR reporting', 'Manual errors in transaction logs', 'Weak audit documentation', 'Over-reliance on informal processes']} />
        <div className="info-box"><strong>Key lesson:</strong> compliance failures usually happen due to operational gaps, not legal misunderstanding.</div>
      </Section>

      <Section id="business-models" title="Ideal Business Models Using an FFMC License">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: '1. Standalone Forex Exchange Outlet', body: <ul className="!mb-0"><li>High-footfall locations such as airports and tourist hubs</li><li>Direct walk-in customers</li></ul> },
          { title: '2. Travel Agency with Forex Integration', body: <ul className="!mb-0"><li>Bundled travel and forex services</li><li>Higher customer retention</li></ul> },
          { title: '3. Digital Forex Platform (Hybrid)', body: <ul className="!mb-0"><li>Online booking with offline delivery</li><li>API integration with banks</li></ul> },
          { title: '4. Corporate Forex Service Provider', body: <ul className="!mb-0"><li>Handling employee travel forex</li><li>Bulk transactions</li></ul> }
        ]} />
      </Section>

      <Section id="revenue-model" title="Revenue Model Breakdown (Practical View)">
        <DataTable headers={['Revenue Source', 'Description', 'Margin Potential']} rows={[
          ['Currency Margin', 'Difference in buy and sell rate', 'High'],
          ['Service Charges', 'Flat or percentage-based', 'Moderate'],
          ['Commission Income', 'Tie-ups with banks and partners', 'Moderate'],
          ['Value-Added Services', 'Travel cards and remittance support', 'Growing']
        ]} />
        <p>Growth is driven by international tourism, student migration, medical travel and business travel, with revenue coming from forex margin spread, service charges and commission on remittances.</p>
      </Section>

      <Section id="cost-structure" title="Cost Structure of Running an FFMC Business">
        <DataTable headers={['Cost Head', 'Nature', 'Remarks']} rows={[
          ['Office Setup', 'Fixed', 'Location dependent'],
          ['Staff Salary', 'Recurring', 'Skilled staff required'],
          ['Compliance Cost', 'Recurring', 'Audit and reporting'],
          ['Technology', 'Semi-fixed', 'One-time plus maintenance'],
          ['Licensing and Advisory', 'One-time', 'Initial setup']
        ]} />
      </Section>

      <Section id="technology" title="Technology Stack and the Digital FFMC Model">
        <h3>Recommended Systems</h3>
        <CheckList items={['Forex rate engine with real-time updates', 'KYC verification tools', 'AML transaction monitoring software', 'Accounting and audit software', 'CRM for customer tracking']} />
        <h3>Digital Integration</h3>
        <CheckList items={['Online forex booking platforms', 'API integration with banks', 'Digital KYC verification', 'Real-time exchange rate updates']} />
        <div className="warning-box"><strong>Compliance note:</strong> even in digital models, physical verification and audit trail remain mandatory under RBI norms. Technology must support traceability, because RBI places high importance on the audit trail.</div>
      </Section>

      <Section id="branch-expansion" title="Branch Expansion Strategy under FFMC License">
        <p>From a compliance perspective, branch expansion is permitted but regulated.</p>
        <DataTable headers={['Condition', 'Requirement']} rows={[
          ['RBI clearance', 'Prior intimation or approval from RBI, depending on the case'],
          ['Net Owned Fund', 'Rs. 50 lakh for multiple branches'],
          ['Internal audit', 'Strong internal audit mechanism across branches']
        ]} />
        <div className="warning-box"><strong>Practical tip:</strong> expansion without strengthening compliance systems often leads to regulatory observations.</div>
      </Section>

      <Section id="operational-model" title="End-to-End Operational Model">
        <p>Once the licence is obtained, the business must function with a well-defined operational structure.</p>
        <Flow items={['Customer onboarding with KYC verification and risk categorisation', 'Transaction processing at prevailing rates', 'Issue of encashment certificate', 'Entry in forex registers with a digital audit trail', 'Periodic submission to RBI and STR reporting where required']} />
      </Section>

      <Section id="accounting-gst" title="Accounting and GST Treatment">
        <h3>Accounting Treatment</h3>
        <CheckList items={['Forex margin treated as income', 'Separate recording for purchase and sale', 'Exchange fluctuation accounting']} />
        <h3>GST Applicability</h3>
        <DataTable headers={['Transaction Type', 'GST Treatment', 'Remarks']} rows={[
          ['Currency Exchange', 'GST applicable', 'On margin value'],
          ['Forex Conversion', 'Taxable service', 'As per GST rules'],
          ['Service Charges', 'Fully taxable', 'Standard GST']
        ]} />
      </Section>

      <Section id="scalability" title="Scalability Strategy for FFMC Licence Holders">
        <Flow items={['Start with a single branch', 'Build a strong compliance foundation', 'Expand to multiple locations', 'Integrate a digital platform', 'Partner with travel and fintech companies']} />
      </Section>

      <Section id="lifecycle" title="Lifecycle of an FFMC Licence (Compliance Journey)">
        <Flow items={['Application stage', 'RBI approval', 'Operational setup', 'Compliance implementation', 'Audit and reporting', 'Inspection and renewal monitoring']} />
      </Section>

      <Section id="future-outlook" title="Future Outlook of the FFMC Business in India">
        <p>India&rsquo;s forex ecosystem is expanding rapidly due to rising international travel, growth in overseas education, increasing remittances and digital forex demand.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Strategic Value for Fintech', body: 'An FFMC enables entry into the regulated forex ecosystem, builds customer trust and opens partnerships with banks and travel platforms.' },
          { title: 'Where the Market is Heading', body: 'FFMC businesses that combine compliance with technology are best positioned as India’s cross-border economy grows.' }
        ]} />
      </Section>

      <Section id="checklist" title="Pre-Application Checklist">
        <h3>Checklist Before Applying</h3>
        <CheckList items={['Company incorporated with the correct object clause', 'Net Owned Fund verified', 'KYC and AML policy drafted', 'Business plan prepared', 'Board resolution passed', 'Documentation complete']} />
        <h3>Client Readiness Assessment</h3>
        <CheckList items={['Do we have sufficient capital?', 'Is our management team credible?', 'Can we maintain strict compliance?', 'Do we understand forex operations?']} />
        <h3>Ultimate Checklist for RBI Approval Success</h3>
        <CheckList items={['Strong Net Owned Fund', 'Clean financial track record', 'Clear business model', 'Detailed documentation', 'Robust AML and KYC policy', 'Experienced management']} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with FFMC Licensing">
        <p>At Estabizz Fintech Private Limited, we assist you from application to approval and beyond:</p>
        <CheckList items={['End-to-end FFMC licence application', 'Documentation drafting', 'RBI coordination', 'Compliance framework setup', 'Post-approval support']} />
        <p>From our practical experience, RBI prefers structured applications with clarity, proper documentation reduces approval time, and early compliance setup ensures long-term sustainability. Regulatory interpretation is complex, documentation must be precise, RBI scrutiny is detailed and compliance risk is high, which is why a professional approach materially improves both approval odds and long-term standing.</p>
      </Section>

      <Section id="faqs" title="FAQs on Full Fledged Money Changer (FFMC) License in India">
        <p>{faqs.length} questions covering basic understanding, eligibility, the application process, documents, fees, timeline, compliance, penalties and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <blockquote className="border-l-4 border-[#1677f2] pl-4 italic text-gray-700">Obtaining an FFMC Licence is not merely a regulatory formality. It reflects an entity&rsquo;s capability to responsibly handle foreign exchange transactions within India&rsquo;s tightly governed financial ecosystem. A strong compliance culture and transparent operations are key to sustaining this licence.</blockquote>
          <h3 className="mt-6">Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: RBI, FEMA, SEBI, IRDAI and IFSCA frameworks, money changing activities, AML and KYC design, forex operations and post-approval regulatory support.</p>
          <p>Full Fledged Money Changer License is a critical regulatory approval for entities entering the forex business in India. With RBI&rsquo;s strict oversight, businesses must ensure robust financial strength, compliance systems and governance practices.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. FEMA provisions, RBI Master Directions, net owned fund thresholds, documentation requirements, reporting formats, branch approval norms and inspection practice may change from time to time. Applicants should verify the latest RBI Master Direction on Money Changing Activities, applicable circulars and regional office requirements before filing any FFMC application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our RBI Compliance Expert">
        <p>A well-structured application combined with ongoing compliance discipline can position the entity as a trusted forex service provider in India&rsquo;s growing financial ecosystem.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to RBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Apply for FFMC License</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check FFMC Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
