'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'SEBI Mutual Fund Registration India: Quick Overview' },
  { id: 'what-is', title: 'What is SEBI Mutual Fund Registration India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'structure', title: 'Structure of a Mutual Fund' },
  { id: 'who-needs', title: 'Who Needs SEBI Mutual Fund Registration?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'capital', title: 'Minimum Capital Requirements' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'regulatory-conditions', title: 'Key Regulatory Conditions Imposed by SEBI' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'application-components', title: 'Application Components Submitted to SEBI' },
  { id: 'process', title: 'Step-by-Step Registration Process' },
  { id: 'evaluation', title: 'How SEBI Evaluates Applications' },
  { id: 'fees', title: 'Fees Structure' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'infrastructure', title: 'Operational Infrastructure Required' },
  { id: 'internal-controls', title: 'Internal Controls Expected by SEBI' },
  { id: 'post-registration', title: 'Post-Registration Compliance' },
  { id: 'fund-types', title: 'Types of Mutual Funds You Can Launch' },
  { id: 'lifecycle', title: 'Lifecycle of a Mutual Fund Business' },
  { id: 'red-flags', title: 'SEBI Red Flags That Delay Approval' },
  { id: 'risks', title: 'Practical and Advanced Compliance Risks' },
  { id: 'challenges', title: 'Real-World Challenges Faced by Applicants' },
  { id: 'setup-strategy', title: 'End-to-End Mutual Fund Setup Strategy' },
  { id: 'key-legal-provisions', title: 'Key Legal Provisions' },
  { id: 'why-regulated', title: 'Why This Licence is Highly Regulated' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'service-scope', title: 'Service Scope' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our SEBI Compliance Expert' }
];

const faqs = ([
  ["What is SEBI Mutual Fund Registration India?", "It is the approval required from SEBI to establish and operate a mutual fund structure in India. It involves sponsor, trustee, and AMC setup."],
  ["Who regulates mutual funds in India?", "Mutual funds are regulated by SEBI under the SEBI (Mutual Funds) Regulations, 1996."],
  ["Is SEBI registration mandatory for mutual funds?", "Yes, it is compulsory. No entity can operate mutual funds without SEBI approval."],
  ["What is a mutual fund in simple terms?", "It is a pooled investment vehicle where funds from multiple investors are professionally managed."],
  ["What is AMC in mutual funds?", "AMC (Asset Management Company) manages the investment portfolio of the mutual fund."],
  ["What is the role of a sponsor?", "Sponsor acts as the promoter and initiates the mutual fund structure."],
  ["What is the role of trustees?", "Trustees protect investor interests and oversee AMC operations."],
  ["Can individuals start a mutual fund?", "No, individuals cannot. Only structured entities meeting SEBI criteria can apply."],
  ["What is NAV in mutual funds?", "NAV is the per-unit value of a mutual fund scheme."],
  ["What is the objective of SEBI regulation?", "To ensure investor protection, transparency, and fair practices."],
  ["Is mutual fund business regulated strictly?", "Yes, it is highly regulated due to involvement of public money."],
  ["What is a mutual fund trust?", "It is the legal structure under which mutual funds are established."],
  ["What is a custodian?", "Custodian holds securities of the mutual fund independently."],
  ["Can a company operate multiple schemes?", "Yes, after approval, multiple schemes can be launched."],
  ["Is mutual fund business profitable?", "Yes, but it requires long-term commitment and scale."],
  ["Who is eligible for SEBI Mutual Fund Registration India?", "Entities with financial strength, experience, and governance capability are eligible."],
  ["What is minimum experience required for sponsor?", "Minimum 5 years in financial services sector."],
  ["Is profitability mandatory for sponsor?", "Yes, consistent profitability and strong financials are expected."],
  ["Can NBFCs apply for mutual fund registration?", "Yes, subject to meeting SEBI eligibility conditions."],
  ["Can banks sponsor mutual funds?", "Yes, many banks operate mutual funds."],
  ["Can foreign companies apply?", "Yes, subject to FEMA and SEBI compliance."],
  ["Is net worth requirement applicable?", "Yes, AMC must maintain minimum ₹50 crore net worth."],
  ["Can startups apply for mutual fund license?", "Only if they meet strict financial and governance requirements."],
  ["What is fit and proper criteria?", "It evaluates integrity, financial soundness, and track record."],
  ["Can one person control AMC and trustee?", "No, independence is mandatory as per regulations."],
  ["Is prior asset management experience required?", "It is not mandatory but highly preferred by SEBI."],
  ["Can LLP apply for mutual fund registration?", "No, AMC must be a company under Companies Act."],
  ["Is foreign ownership allowed in AMC?", "Yes, subject to applicable FDI norms."],
  ["Can fintech companies apply?", "Yes, if they meet regulatory and financial criteria."],
  ["Is there any restriction on promoters?", "Yes, promoters must have clean regulatory history."],
  ["What is the step-by-step process for SEBI Mutual Fund Registration India?", "Key steps include: • Sponsor identification • Trust formation • AMC incorporation • SEBI application"],
  ["How to apply for mutual fund registration in India?", "Application is submitted to SEBI with detailed documentation."],
  ["Is online application available?", "Process involves both online and physical submissions."],
  ["What happens after application submission?", "SEBI reviews and may raise queries."],
  ["How many approvals are required?", "Multiple approvals including sponsor, AMC, and trust structure."],
  ["Can application be rejected?", "Yes, if criteria are not met."],
  ["Is interview required by SEBI?", "In some cases, meetings or clarifications may be required."],
  ["What is role of compliance officer?", "To ensure regulatory compliance during and after registration."],
  ["Can application be modified?", "Yes, based on SEBI feedback."],
  ["Is professional help required?", "Strongly recommended due to complexity."],
  ["What is scheme approval process?", "Each scheme needs separate SEBI approval."],
  ["Can multiple schemes be filed together?", "Yes, subject to compliance."],
  ["What is SEBI review focus?", "Governance, financial strength, and investor protection."],
  ["Is trust deed mandatory?", "Yes, it is a key document."],
  ["What is AMC approval process?", "SEBI evaluates AMC separately."],
  ["What documents are required for registration?", "Key documents include: • Financial statements • Business plan • KYC documents"],
  ["Is business plan mandatory?", "Yes, detailed plan is required."],
  ["Are director KYC documents required?", "Yes, for fit and proper evaluation."],
  ["What is trust deed?", "Legal document establishing mutual fund trust."],
  ["Are audited financials required?", "Yes, audited statements must be submitted."],
  ["Is AMC incorporation proof required?", "Yes, it is mandatory."],
  ["What is compliance policy document?", "It outlines internal control and regulatory systems."],
  ["Are risk management documents required?", "Yes, SEBI expects detailed risk framework."],
  ["Is IT infrastructure plan required?", "Yes, for operational readiness."],
  ["Are agreements with custodian required?", "Yes, independent custodian must be appointed."],
  ["What is the cost of SEBI Mutual Fund Registration India?", "Costs include: • SEBI fees • Legal & consultancy charges • Infrastructure setup"],
  ["What is SEBI application fee?", "It is prescribed by SEBI and may change over time."],
  ["Is there annual fee?", "Yes, ongoing regulatory fees apply."],
  ["What is AMC setup cost?", "Significant, including capital and operational expenses."],
  ["Is ₹50 crore mandatory capital?", "Yes, for AMC net worth requirement."],
  ["Are hidden costs involved?", "Yes, compliance and operational costs."],
  ["What is cost of compliance team?", "Depends on hiring and expertise level."],
  ["Is technology cost high?", "Yes, especially for NAV and reporting systems."],
  ["Is custodian cost applicable?", "Yes, custodian charges apply."],
  ["Is cost fixed or variable?", "It varies based on structure and scale."],
  ["How much time does SEBI approval take?", "Typically 6 to 12 months."],
  ["Can approval be faster?", "Yes, with complete documentation."],
  ["What delays approval?", "Incomplete documents and weak structure."],
  ["Does SEBI give timeline guarantee?", "No fixed timeline is guaranteed."],
  ["What is fastest approval scenario?", "Around 6 months with strong application."],
  ["What is longest delay scenario?", "Can extend beyond 12 months."],
  ["Does SEBI ask multiple queries?", "Yes, multiple rounds are common."],
  ["Can approval be conditional?", "Yes, subject to compliance conditions."],
  ["What happens after approval?", "Scheme filing and launch process begins."],
  ["Is provisional approval given?", "Generally no, full approval is required."],
  ["What compliance is required after registration?", "Includes: • Reporting • Audit • Disclosures"],
  ["Are periodic filings mandatory?", "Yes, under regulatory guidelines."],
  ["What is NAV disclosure requirement?", "Daily or periodic disclosure is mandatory."],
  ["Is audit required?", "Yes, internal and external audits are compulsory."],
  ["What is investor grievance system?", "Mechanism to resolve investor complaints."],
  ["Is AMFI registration required?", "Yes, for operational functioning."],
  ["What is compliance officer role?", "Ensures regulatory adherence."],
  ["Are scheme disclosures mandatory?", "Yes, before and after launch."],
  ["Is risk management system required?", "Yes, as per SEBI norms."],
  ["Can SEBI inspect operations?", "Yes, inspections are conducted."],
  ["What happens if mutual fund operates without SEBI approval?", "It is illegal and attracts penalties."],
  ["What is penalty for non-compliance?", "Includes fines, suspension, or cancellation."],
  ["Can SEBI cancel registration?", "Yes, in case of violations."],
  ["What are major compliance risks?", "Governance failure and reporting lapses."],
  ["Is investor complaint serious issue?", "Yes, SEBI treats it strictly."],
  ["Can AMC be penalised?", "Yes, for regulatory breaches."],
  ["What is risk of wrong disclosures?", "Severe penalties and reputational damage."],
  ["Can trustees be held liable?", "Yes, for failure of duties."],
  ["What is operational risk?", "Failure in systems or processes."],
  ["Can fund be suspended?", "Yes, under regulatory action."],
  ["Can I start mutual fund with limited capital?", "No, minimum capital requirements must be met."],
  ["Can I outsource AMC operations?", "No, AMC must be properly structured."],
  ["Can I run mutual fund without trustee?", "No, trustee structure is mandatory."],
  ["Can I launch scheme without SEBI approval?", "No, prior approval is required."],
  ["Can I change sponsor later?", "Yes, subject to SEBI approval."],
  ["Can I merge two mutual funds?", "Yes, under regulatory conditions."],
  ["Can I exit mutual fund business?", "Yes, with SEBI approval."],
  ["Can I operate multiple AMCs?", "Yes, subject to compliance."],
  ["Can AMC invest in its own schemes?", "Yes, under guidelines."],
  ["Can I start small and expand later?", "Yes, but compliance must be strong from start."],
  ["What is fiduciary responsibility of trustee?", "Trustees must act in best interest of investors."],
  ["What is segregation of duties in AMC?", "Clear separation between operations, compliance, and investment."],
  ["What is risk management framework?", "System to manage investment and liquidity risks."],
  ["What is internal audit requirement?", "Regular audits to ensure compliance."],
  ["What is compliance culture expectation?", "Strong governance and ethical operations."],
  ["What is SEBI inspection scope?", "Covers operations, compliance, and reporting."],
  ["What is role of board in AMC?", "Strategic oversight and governance."],
  ["What is investor protection mechanism?", "Policies ensuring fair treatment."],
  ["What is disclosure standard?", "High transparency in operations."],
  ["What is long-term success factor?", "Governance, performance, and trust."],
  ["Can a mutual fund operate without a custodian?", "No, it is not allowed. As per regulatory guidelines, appointment of an independent custodian is mandatory."],
  ["What is the role of custodian in mutual funds?", "Custodian safeguards securities and ensures independent holding of assets."],
  ["Can AMC delegate investment decisions?", "No, core investment responsibility cannot be delegated. AMC remains accountable."],
  ["What is scheme information document (SID)?", "It is a detailed document outlining scheme objectives, risks, and structure."],
  ["Is Key Information Memorandum (KIM) mandatory?", "Yes, it provides a concise summary for investors."],
  ["Can mutual funds invest in unlisted securities?", "Yes, but within limits prescribed under SEBI regulations."],
  ["What is liquidity risk in mutual funds?", "Risk of inability to sell assets quickly without impacting value."],
  ["What is portfolio disclosure requirement?", "Mutual funds must periodically disclose portfolio holdings."],
  ["What is valuation policy in mutual funds?", "It defines how assets are valued for NAV calculation."],
  ["What is role of registrar and transfer agent (RTA)?", "RTA manages investor records and transactions."],
  ["Can AMC change fund manager?", "Yes, but it must be disclosed to investors."],
  ["What is compliance reporting frequency?", "Monthly, quarterly, and annual reporting is required."],
  ["What is insider trading restriction for AMC?", "Strict controls apply under SEBI regulations."],
  ["Can mutual fund invest in derivatives?", "Yes, subject to regulatory limits and risk controls."],
  ["What is expense ratio limit?", "SEBI prescribes limits on expense ratio charged to investors."],
  ["Can a mutual fund be listed on stock exchange?", "Yes, certain schemes like ETFs are listed and traded."],
  ["What is difference between open-ended and close-ended funds?", "Open-ended funds allow continuous entry/exit; close-ended have fixed tenure."],
  ["Can AMC outsource compliance functions?", "No, ultimate responsibility remains with AMC."],
  ["What is investor onboarding process?", "It includes KYC verification and compliance checks."],
  ["Is KYC mandatory for mutual fund investors?", "Yes, as per KYC norms under regulatory guidelines."],
  ["What is anti-money laundering (AML) requirement?", "Mutual funds must follow AML and PMLA compliance norms."],
  ["What is role of SEBI in investor grievance redressal?", "SEBI monitors complaint resolution through SCORES platform."],
  ["Can mutual funds invest in overseas markets?", "Yes, within limits specified by SEBI."],
  ["What is side pocketing in mutual funds?", "Segregation of distressed assets to protect investors."],
  ["What is stress testing requirement?", "Mutual funds must periodically test portfolio risk scenarios."],
  ["Can mutual fund schemes be restructured?", "Yes, with SEBI approval and investor consent."],
  ["What is compliance certification requirement?", "Periodic certifications must be submitted to SEBI."],
  ["What is role of audit committee in AMC?", "It oversees financial reporting and compliance systems."],
  ["What is governance expectation for AMC board?", "Strong independent oversight and compliance monitoring."],
  ["What is investor education responsibility?", "Mutual funds must promote investor awareness initiatives."],
  ["Why does SEBI impose strict governance in mutual funds?", "Because mutual funds manage public money, requiring high investor protection standards."],
  ["What is systemic risk in mutual funds?", "Risk that can impact overall financial markets due to fund operations."],
  ["Can SEBI impose restrictions on specific schemes?", "Yes, if regulatory concerns arise."],
  ["What is long-term sustainability requirement for mutual funds?", "Strong governance, compliance, and consistent performance."],
  ["What is the biggest challenge in mutual fund registration?", "Demonstrating credibility, governance strength, and regulatory readiness."]
] as [string, string][]).map(([q, a]) => ({ q, a }));

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

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '📈', label: 'SEBI Regulatory Advisory' }, { emoji: '🏛️', label: 'Mutual Fund & AMC Licensing' }, { emoji: '📋', label: 'Structuring & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'Mutual Fund Registration' }]}
      title="SEBI Mutual Fund Registration India - Complete Guide with Eligibility, Process and Compliance"
      heroDescription={<><p><strong>SEBI Mutual Fund Registration India</strong> is a highly structured and regulated process that enables entities to establish and operate mutual funds under the supervision of the Securities and Exchange Board of India. From a practical perspective, SEBI does not register a mutual fund as a standalone entity. It approves a complete ecosystem comprising the sponsor, the trustee structure, the asset management company and an independent custodian.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI (Mutual Funds) Regulations, 1996', 'Sponsor Eligibility Mapping', 'Trust Deed and Trustee Structure', 'AMC Incorporation', 'Rs. 50 Crore AMC Net Worth', 'Custodian Appointment', 'SEBI Query Handling', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for Mutual Fund Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check Sponsor Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="32 min read"
      displayYear="2026"
      focusKeyword="SEBI Mutual Fund Registration India"
      sections={sections}
      ctaTitle="Plan Your Mutual Fund Application"
      ctaDescription="Discuss sponsor structuring, trust formation, AMC net worth, governance framework and SEBI documentation."
      quickFacts={[{ label: 'Regulator', value: 'SEBI' }, { label: 'Regulation', value: 'MF Regs, 1996' }, { label: 'AMC Net Worth', value: 'Rs. 50 Cr' }, { label: 'Sponsor Track Record', value: '5 years' }, { label: 'Timeline', value: '6-12 months' }]}
      relatedArticles={[
        { title: 'AMFI Registration', href: '/sebi/amfi-registration', category: 'SEBI', description: 'AMFI registration for mutual fund distribution and operational functioning.' },
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Registration for privately pooled investment vehicles.' },
        { title: 'PMS Registration in India', href: '/sebi/pms-registration-in-india', category: 'SEBI', description: 'SEBI Portfolio Manager registration for client-wise portfolio management.' }
      ]}
      finalCtaTitle="Start Your Mutual Fund Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI mutual fund application with structured regulatory support covering sponsor eligibility review, trust and AMC structuring, trust deed drafting, policy and governance frameworks, SEBI filing, query response and post-registration compliance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for Mutual Fund Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check Sponsor Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="SEBI Mutual Fund Registration India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Securities and Exchange Board of India' },
          { title: 'Applicable Regulation', body: 'SEBI (Mutual Funds) Regulations, 1996, along with subsequent amendments' },
          { title: 'What is Approved', body: 'Not a single company, but a complete structure comprising sponsor, trustee, asset management company and custodian' },
          { title: 'Legal Form of the Fund', body: 'Mutual fund must be established as a trust under the Indian Trusts Act' },
          { title: 'Legal Form of the AMC', body: 'AMC must be a company incorporated under the Companies Act, 2013' },
          { title: 'Sponsor Track Record', body: 'Minimum 5 years in financial services with positive net worth and consistent profits' },
          { title: 'AMC Net Worth', body: 'Rs. 50 crore net worth requirement' },
          { title: 'Sponsor Contribution', body: 'Minimum 40 percent holding in the AMC' },
          { title: 'Trustee Structure', body: 'Independent trustee structure is mandatory' },
          { title: 'Custodian', body: 'Independent of both sponsor and AMC, and mandatory' },
          { title: 'Scheme Launch', body: 'Each scheme requires separate SEBI approval before launch' },
          { title: 'Indicative Timeline', body: 'Generally 6 to 12 months, depending on structuring quality and SEBI review' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be evaluated against the applicant&rsquo;s sponsor profile, group structure, capital position, governance design, proposed scheme categories and the latest SEBI regulations, amendments and circulars applicable at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is SEBI Mutual Fund Registration India?">
        <p>In simple terms, SEBI Mutual Fund Registration India is the approval to set up and manage pooled investment schemes where funds collected from investors are professionally managed. Legally speaking, the process is governed under the SEBI (Mutual Funds) Regulations, 1996, along with subsequent amendments.</p>
        <p>From a compliance standpoint, the registration involves four connected building blocks rather than a single application:</p>
        <Flow items={['Formation of a mutual fund trust', 'Appointment of trustees', 'Incorporation of an asset management company (AMC)', 'Approval of the sponsor by SEBI']} />
        <div className="info-box">From a compliance perspective, SEBI Mutual Fund Registration India is not a single approval. It is a multi-layer regulatory architecture designed to protect investor interest, ensure separation of ownership and management, provide independent oversight and prevent misuse of investor funds.</div>
      </Section>

      <Section id="legal-background" title="Legal Background and Regulatory Authority">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Primary Regulation', 'SEBI (Mutual Funds) Regulations, 1996, as amended from time to time'],
          ['Fund Vehicle', 'Trust established under the Indian Trusts Act'],
          ['AMC Constitution', 'Company incorporated under the Companies Act, 2013'],
          ['Trustee Obligation', 'Trustees must act in a fiduciary capacity for investors'],
          ['Scheme Disclosure', 'All schemes must comply with SEBI disclosure norms'],
          ['Core Regulatory Focus', 'Sponsor credibility, capital adequacy, fit and proper status, trustee independence, risk management systems and investor grievance mechanisms'],
          ['Regulatory Powers', 'Registration, scheme approval, inspection, restriction, suspension, cancellation and penalties']
        ]} />
        <p>Unlike most licences where a single company is assessed, SEBI evaluates the entire ecosystem. That distinction drives almost every structuring decision described on this page.</p>
      </Section>

      <Section id="structure" title="Structure of a Mutual Fund (Critical for Approval)">
        <p>Before applying, the applicant must clearly design the structure. SEBI expects the four roles below to be defined, documented and genuinely independent of one another.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: '1. Sponsor', body: 'Promoter of the mutual fund. Must demonstrate financial strength, market credibility and long-term commitment to the business.' },
          { title: '2. Trustee / Trustee Company', body: 'Acts as guardian of investors. Ensures AMC compliance, scheme adherence and regulatory reporting.' },
          { title: '3. Asset Management Company (AMC)', body: 'Core operational entity, responsible for investment decisions, portfolio management and scheme execution.' },
          { title: '4. Custodian', body: 'Holds the securities of the mutual fund and must be independent of both the sponsor and the AMC.' }
        ]} />
        <div className="info-box">This four-part separation is what allows SEBI to ensure separation of ownership and management, independent oversight of the AMC, and prevention of misuse of investor funds.</div>
      </Section>

      <Section id="who-needs" title="Who Needs SEBI Mutual Fund Registration India?">
        <DataTable headers={['Category', 'Why Registration Becomes Relevant']} rows={[
          ['Financial institutions planning an asset management business', 'Pooled investment management cannot be offered without SEBI registration'],
          ['Banks and NBFCs entering wealth management', 'Fund management through pooled schemes falls squarely within the mutual fund framework'],
          ['Corporate groups with investment expertise', 'Group investment capability must still be structured through a registered sponsor, trust and AMC'],
          ['Global asset managers entering the Indian market', 'Entry is permitted subject to FEMA and SEBI compliance'],
          ['High net worth sponsors with strong financial backing', 'Capital strength alone is not sufficient without an approved structure and governance design']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria">
        <DataTable headers={['Criteria', 'Requirement']} rows={[
          ['Sponsor Track Record', 'Minimum 5 years in financial services'],
          ['Profitability', 'Positive net worth and consistent profits'],
          ['Reputation', 'Sound track record and integrity'],
          ['AMC Setup', 'Dedicated asset management company required'],
          ['Trustees', 'Independent trustee structure mandatory']
        ]} />
        <p>Prior asset management experience is not strictly mandatory, but it is strongly preferred by SEBI and materially improves the strength of an application.</p>
      </Section>

      <Section id="capital" title="Minimum Capital Requirements (Practical View)">
        <DataTable headers={['Entity', 'Requirement']} rows={[
          ['Asset Management Company', 'Rs. 50 crore net worth'],
          ['Sponsor Contribution', 'Minimum 40 percent in the AMC'],
          ['Trustee Setup', 'Independent structure mandatory']
        ]} />
        <div className="warning-box"><strong>Practical note:</strong> while Rs. 50 crore is the regulatory minimum, SEBI generally expects much stronger financial backing in practice. Capital that only just meets the threshold tends to attract deeper scrutiny of the sponsor&rsquo;s long-term commitment.</div>
      </Section>

      <Section id="fit-and-proper" title="Deep Dive: Fit and Proper Criteria">
        <p>Legally speaking, SEBI evaluates whether key persons are fit and proper based on the following parameters:</p>
        <CheckList items={['Integrity and honesty', 'Absence of convictions or regulatory penalties', 'Financial soundness', 'Professional competence']} />
        <div className="warning-box"><strong>Practical insight:</strong> even minor past non-compliance can delay or impact approval, so historical regulatory records should be reviewed and explained proactively rather than discovered during SEBI scrutiny.</div>
      </Section>

      <Section id="regulatory-conditions" title="Key Regulatory Conditions Imposed by SEBI">
        <p>As per applicable regulatory provisions, SEBI typically evaluates:</p>
        <CheckList items={['Sponsor track record and reputation', 'Net worth and capital adequacy', 'Fit and proper status of key persons', 'Independence of trustees', 'Risk management systems', 'Investor grievance mechanisms']} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Sponsor Financial Statements', 'Assess financial strength'],
          ['Business Plan', 'Operational and investment strategy'],
          ['KYC of Directors', 'Fit and proper criteria'],
          ['Trust Deed', 'Formation of the mutual fund trust'],
          ['AMC Incorporation Documents', 'Legal structure verification']
        ]} />
        <p>Audited financial statements are required. Compliance policy documents, risk management frameworks, IT infrastructure plans and the custodian agreement are also expected as part of a complete filing.</p>
      </Section>

      <Section id="application-components" title="Application Components Submitted to SEBI">
        <p>From industry experience, the application dossier typically includes:</p>
        <CheckList items={['Detailed business plan with a 5 to 10 year outlook', 'Governance framework and internal policies', 'Risk management and compliance systems', 'IT and operational infrastructure plan', 'Investment philosophy and strategy', 'Background of key managerial personnel']} />
      </Section>

      <Section id="process" title="Step-by-Step Registration Process">
        <Timeline steps={[
          { title: 'Identify and structure the sponsor entity', body: 'Map sponsor track record, group structure, financial strength and the 40 percent AMC contribution before anything is filed.' },
          { title: 'Establish the mutual fund trust and appoint trustees', body: 'Draft and execute the trust deed and constitute a genuinely independent trustee board or trustee company.' },
          { title: 'Incorporate the Asset Management Company', body: 'Incorporate the AMC under the Companies Act, 2013 and build it to the Rs. 50 crore net worth requirement.' },
          { title: 'Prepare and submit the SEBI application', body: 'File the complete dossier with business plan, governance framework, policies, risk systems and key personnel details.' },
          { title: 'Respond to SEBI queries and clarifications', body: 'Handle multiple rounds of queries, clarifications and meetings with consistent, well-documented responses.' },
          { title: 'Obtain the registration certificate from SEBI', body: 'On approval, move to scheme filing and launch readiness. Each scheme needs its own approval.' }
        ]} />
      </Section>

      <Section id="evaluation" title="How SEBI Evaluates Applications (Real Insight)">
        <p>SEBI review is not merely document-based. It is an intent-based evaluation, because SEBI is effectively selecting long-term custodians of public money rather than simply granting a permission.</p>
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Intent and Capability Alignment', body: 'Does the sponsor genuinely understand asset management, and is this a long-term business rather than an opportunistic entry?' },
          { title: 'Governance Strength', body: 'Independent trustees, a strong compliance culture and a clear reporting hierarchy.' },
          { title: 'Risk Management Framework', body: 'Portfolio risk controls, liquidity management and investor protection mechanisms.' }
        ]} />
        <p>Critical approval factors that applicants frequently underestimate include the strength of the compliance officer and fund managers, the independence of the trustee board, clear segregation between sponsor and AMC, technology systems for NAV calculation and reporting, and robust internal audit mechanisms.</p>
      </Section>

      <Section id="fees" title="Fees Structure (Indicative)">
        <DataTable headers={['Particulars', 'Amount']} rows={[
          ['Application Fees', 'As prescribed by SEBI'],
          ['Registration Fees', 'Based on the regulatory fee schedule'],
          ['Annual Fees', 'Applicable post-registration']
        ]} />
        <div className="info-box">Fees may vary as per SEBI updates and the structure of the fund. Beyond regulatory fees, the real cost drivers are AMC capitalisation, the compliance and fund management team, NAV and reporting technology, and custodian charges.</div>
      </Section>

      <Section id="timeline" title="Timeline for Approval">
        <DataTable headers={['Stage', 'Timeline']} rows={[
          ['Documentation and Structuring', '2-3 months'],
          ['SEBI Review', '3-6 months'],
          ['Final Approval', '1-2 months'],
          [<strong key="total">Total</strong>, <strong key="totalv">6-12 months</strong>]
        ]} />
        <h3>Expanded Timeline with Realistic Phases</h3>
        <DataTable headers={['Phase', 'Activity', 'Timeline']} rows={[
          ['Phase 1', 'Structuring and planning', '2-3 months'],
          ['Phase 2', 'Documentation preparation', '1-2 months'],
          ['Phase 3', 'SEBI application review', '3-6 months'],
          ['Phase 4', 'Clarifications and meetings', '1-2 months'],
          ['Phase 5', 'Final approval', '1 month']
        ]} />
        <div className="warning-box">SEBI does not guarantee a fixed timeline. A strong, complete application may clear in around 6 months, while incomplete documentation or a weak structure can extend the process beyond 12 months.</div>
      </Section>

      <Section id="infrastructure" title="Operational Infrastructure Required (Often Missed)">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Technology', 'NAV calculation systems and investor reporting'],
          ['Compliance', 'Internal compliance monitoring system'],
          ['Risk', 'Portfolio and liquidity risk framework'],
          ['Audit', 'Internal and external audit systems'],
          ['Investor Support', 'Grievance redressal mechanism']
        ]} />
        <p>Operational readiness is assessed alongside the paperwork. A lack of backend systems is one of the most common reasons an otherwise well-capitalised application stalls.</p>
      </Section>

      <Section id="internal-controls" title="Internal Controls Expected by SEBI">
        <CheckList items={['Segregation of duties', 'Independent compliance monitoring', 'Regular internal audits', 'Automated reporting systems', 'Board-level oversight']} />
      </Section>

      <Section id="post-registration" title="Post-Registration Compliance">
        <p>Under the relevant provisions, mutual funds must comply with an ongoing compliance framework. After registration, the real compliance journey begins.</p>
        <h3>Ongoing Requirements</h3>
        <CheckList items={['Scheme approval and disclosure norms', 'Continuous disclosures before and after launch', 'Net asset value (NAV) disclosures', 'Monthly and quarterly reporting to SEBI', 'Risk management compliance', 'Investor protection and grievance tracking']} />
        <h3>Periodic Filings</h3>
        <CheckList items={['Annual reports', 'Audit reports', 'Compliance certifications']} />
        <div className="info-box">AMFI registration is required for operational functioning alongside SEBI compliance. SEBI may also inspect operations, records and reporting systems at any time.</div>
      </Section>

      <Section id="fund-types" title="Types of Mutual Funds You Can Launch (Post Approval)">
        <p>After registration, entities can structure a range of scheme categories:</p>
        <CheckList items={['Equity mutual funds', 'Debt mutual funds', 'Hybrid funds', 'Index funds and ETFs', 'Sectoral funds', 'International funds']} />
        <div className="warning-box">Each scheme requires separate SEBI approval before launch. Registration of the fund structure does not by itself authorise any individual scheme.</div>
      </Section>

      <Section id="lifecycle" title="Lifecycle of a Mutual Fund Business">
        <Flow items={['Registration', 'Scheme approval', 'Fund launch', 'Investor subscription', 'Portfolio management', 'Continuous compliance']} />
      </Section>

      <Section id="red-flags" title="SEBI Red Flags That Delay Approval">
        <p>Applications are likely to face objections if:</p>
        <DataTable headers={['Red Flag', 'Why It Matters']} rows={[
          ['Sponsor has a weak financial track record', 'Undermines the long-term commitment SEBI expects from a sponsor'],
          ['Promoters have a history of regulatory violations', 'Directly affects fit and proper assessment'],
          ['Governance structure appears controlled rather than independent', 'Defeats the purpose of the trustee and custodian separation'],
          ['AMC lacks experienced professionals', 'Raises doubts about operational capability to manage public money'],
          ['Business plan appears unrealistic', 'Signals an opportunistic rather than sustainable entry']
        ]} />
      </Section>

      <Section id="risks" title="Practical and Advanced Compliance Risks">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Governance Failure Risk', body: 'Weak trustee oversight is a direct route to rejection.' },
          { title: 'Sponsor Dependency Risk', body: 'Over-reliance on the sponsor damages the independence SEBI is testing for.' },
          { title: 'Operational Readiness Gap', body: 'Lack of backend systems delays approval even where capital is adequate.' },
          { title: 'Regulatory Query Mismanagement', body: 'Poor handling of SEBI queries leads to prolonged, avoidable delays.' }
        ]} />
        <p>Earlier-stage risks that surface repeatedly include weak sponsor financial credentials, an inadequate governance framework, improper AMC structuring, the absence of an experienced fund management team, and delays caused by incomplete documentation.</p>
      </Section>

      <Section id="challenges" title="Real-World Challenges Faced by Applicants">
        <CheckList items={['Aligning sponsor vision with regulatory expectations', 'Hiring experienced fund managers', 'Building an independent trustee structure', 'Creating SEBI-compliant documentation', 'Handling multiple rounds of SEBI queries']} />
      </Section>

      <Section id="setup-strategy" title="End-to-End Mutual Fund Setup Strategy (Execution View)">
        <p>A successful SEBI Mutual Fund Registration India application typically follows this structured approach:</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Phase 1: Strategic Planning', body: <ul className="!mb-0"><li>Define the business model (equity, debt, hybrid or passive funds)</li><li>Identify the sponsor structure</li><li>Capital allocation planning</li></ul> },
          { title: 'Phase 2: Legal Structuring', body: <ul className="!mb-0"><li>Formation of the trust</li><li>Appointment of trustees</li><li>AMC incorporation</li></ul> },
          { title: 'Phase 3: Operational Readiness', body: <ul className="!mb-0"><li>Hiring fund managers, a compliance officer and a risk officer</li><li>Setting up IT systems and the NAV calculation mechanism</li><li>Establishing internal audit systems</li></ul> },
          { title: 'Phase 4: SEBI Application', body: <ul className="!mb-0"><li>Filing the complete application</li><li>Submission of policies and frameworks</li></ul> },
          { title: 'Phase 5: Regulatory Interaction', body: <ul className="!mb-0"><li>Responding to SEBI queries</li><li>Clarifications and modifications</li></ul> },
          { title: 'Phase 6: Approval and Launch Preparation', body: <ul className="!mb-0"><li>Final registration</li><li>Scheme filing</li><li>Product launch readiness</li></ul> }
        ]} />
      </Section>

      <Section id="key-legal-provisions" title="Key Legal Provisions">
        <DataTable headers={['Provision', 'Requirement']} rows={[
          ['Fund vehicle', 'Mutual funds must be established as trusts under the Indian Trusts Act'],
          ['AMC constitution', 'AMC must be a company incorporated under the Companies Act, 2013'],
          ['Trustee duty', 'Trustees must act in a fiduciary capacity'],
          ['Scheme disclosure', 'All schemes must comply with SEBI disclosure norms']
        ]} />
      </Section>

      <Section id="why-regulated" title="Why This Licence is Highly Regulated">
        <p>From a regulatory philosophy standpoint, mutual funds deal with retail investor money, public trust and systemic financial impact. SEBI therefore insists on strong governance, transparency and accountability.</p>
        <p>This also explains why the space is dominated by large players: high entry barriers, strict compliance, a capital-intensive setup and a long gestation period. Success is not purely regulatory either. The mutual fund business is reputation-driven, and depends on investor trust, fund performance and regulatory discipline.</p>
        <div className="warning-box">A poorly structured application can delay approval by 6 to 12 months, lead to repeated SEBI queries and increase compliance risk after approval. Structuring errors lead to rejection, documentation gaps lead to delays, and weak governance leads to non-approval.</div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with SEBI Mutual Fund Registration India">
        <p>With deep regulatory expertise across SEBI frameworks, Estabizz provides:</p>
        <CheckList items={['End-to-end structuring of the mutual fund setup', 'Drafting of trust deed, AMC framework and policies', 'Preparation of the SEBI application and documentation', 'Handling regulatory queries and clarifications', 'Post-registration compliance support']} />
        <p>The approach followed is structured, ticket-based execution with continuous client updates and practical, regulator-aligned advisory.</p>
        <p>Businesses evaluating adjacent structures often review <Link href="/rbi/nbfc-registration-in-india">NBFC registration for lending</Link>, <Link href="/sebi/ria-registration-in-india">SEBI RIA registration</Link>, <Link href="/sebi/pms-registration-in-india">PMS registration</Link> and <Link href="/sebi/aif-registration-in-india">AIF registration</Link> alongside the mutual fund route before committing capital.</p>
      </Section>

      <Section id="service-scope" title="Service Scope">
        <DataTable headers={['Stage', 'Our Support']} rows={[
          ['Planning', 'Business model and structure advisory'],
          ['Documentation', 'Drafting and compliance documentation'],
          ['Application', 'Filing and coordination with SEBI'],
          ['Approval', 'Query handling and follow-ups'],
          ['Post-Approval', 'Ongoing compliance support']
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Mutual Fund Registration">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Structuring-First Approach', body: 'We map sponsor eligibility, trust design, AMC capitalisation and custodian independence before drafting begins, because structuring errors are the single largest cause of rejection.' },
          { title: 'Governance Documentation', body: 'Trust deed, compliance policy, risk management framework, investment policy and internal audit design prepared to withstand SEBI scrutiny.' },
          { title: 'Query Handling Discipline', body: 'Multiple rounds of SEBI queries are normal. Consistent, well-evidenced responses are what keep the timeline closer to 6 months than 12.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective on group structuring.' },
          { title: 'Operational Readiness Support', body: 'Guidance on NAV systems, reporting technology, compliance monitoring and grievance redressal so operational gaps do not stall approval.' },
          { title: 'Post-Registration Continuity', body: 'Scheme filing, continuous disclosures, periodic reporting and audit support after the certificate is granted.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on SEBI Mutual Fund Registration India">
        <p>{faqs.length} questions covering eligibility, process, documents, fees, timeline, compliance, penalties and expert-level structuring considerations.</p>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-[#0a1628]">{faq.q}</summary>
              <p className="mt-3 text-sm leading-7 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <blockquote className="border-l-4 border-[#1677f2] pl-4 italic text-gray-700">Mutual fund registration is not merely a licensing exercise. It is a test of governance strength, financial credibility and long-term commitment to investor protection. SEBI evaluates intent as much as structure.</blockquote>
          <h3 className="mt-6">Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: SEBI, RBI, IRDAI, IFSCA, mutual fund and AMC structuring, RIA registration, PMS registration, AIF registration, capital market intermediary licensing and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help financial institutions, banks, NBFCs, corporate groups, global asset managers and serious sponsors understand the broad SEBI framework for mutual fund registration in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. SEBI requirements, application formats, fee structures, net worth thresholds, sponsor conditions, trustee and custodian norms, scheme approval processes and disclosure obligations may change from time to time. Applicants should verify the latest SEBI regulations, amendments, master circulars, FAQs and fee schedule, along with AMFI operational guidelines and Ministry of Finance notifications, before filing any mutual fund application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>SEBI Mutual Fund Registration India is a prestigious yet demanding regulatory journey. A well-prepared application, backed by proper structuring and expert guidance, significantly improves approval chances and sets the foundation for a successful asset management business.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Apply for Mutual Fund Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check Sponsor Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
