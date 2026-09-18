'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'Insurance Repository Registration: Quick Overview' },
  { id: 'what-is', title: 'What is Insurance Repository Registration?' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'ecosystem', title: 'The Insurance Repository Ecosystem in India' },
  { id: 'who-needs', title: 'Who Needs This Registration?' },
  { id: 'operational-model', title: 'Operational Model and Key Functions' },
  { id: 'eia', title: 'Interlinking with the e-Insurance Account (eIA)' },
  { id: 'policy-lifecycle', title: 'Role Across the Policy Lifecycle' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'governance', title: 'Governance and Fit and Proper Criteria' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'documentation-depth', title: 'Documentation Depth Expected by IRDAI' },
  { id: 'business-plan', title: 'Business Plan Expectations' },
  { id: 'technology', title: 'Technology Architecture Requirements' },
  { id: 'cybersecurity', title: 'Cybersecurity: The Deciding Factor' },
  { id: 'data-protection', title: 'Data Protection and Confidentiality' },
  { id: 'internal-policies', title: 'Internal Policies Required' },
  { id: 'integration', title: 'Integration Requirements with Insurers' },
  { id: 'outsourcing', title: 'Outsourcing and Vendor Risk Management' },
  { id: 'process', title: 'Step-by-Step Registration Process' },
  { id: 'execution-strategy', title: 'End-to-End Execution Strategy' },
  { id: 'query-handling', title: 'Regulatory Query Handling Strategy' },
  { id: 'fees', title: 'Government Fees' },
  { id: 'cost-structure', title: 'Realistic Cost Structure' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'revenue-model', title: 'Revenue Model' },
  { id: 'restrictions', title: 'Limitations and Restrictions' },
  { id: 'repository-vs-broker', title: 'Insurance Repository vs Insurance Broker' },
  { id: 'vs-digital-infrastructure', title: 'Repository vs Other Digital Infrastructure' },
  { id: 'post-registration', title: 'Post-Registration Compliance' },
  { id: 'audit-framework', title: 'Audit Framework' },
  { id: 'grievance', title: 'Grievance Redressal Mechanism' },
  { id: 'inspection', title: 'Inspection and Regulatory Oversight' },
  { id: 'penalties', title: 'Penalties and Consequences' },
  { id: 'case-insights', title: 'Practical Case-Based Insights' },
  { id: 'where-applicants-fail', title: 'Where Most Applicants Fail' },
  { id: 'success-factors', title: 'Approval Success Factors' },
  { id: 'checklist', title: 'Checklist Before Applying' },
  { id: 'investor-view', title: 'Investor Perspective' },
  { id: 'global-practices', title: 'Comparison with Global Practices' },
  { id: 'future', title: 'Future Regulatory Direction' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IRDAI Compliance Expert' }
];

const faqs = ([
  ["What is Insurance Repository Registration in India?", "It is an IRDAI approval to operate as an entity that maintains insurance policies in electronic form through e-Insurance Accounts (eIA)."],
  ["What is an Insurance Repository?", "An Insurance Repository is a regulated entity that stores and manages insurance policies digitally in a secure and centralised system."],
  ["What is an e-Insurance Account (eI", "?A. It is a digital account that holds all insurance policies of a policyholder in one place for easy access and management."],
  ["Who regulates Insurance Repositories in India?", "Insurance Regulatory and Development Authority of India (IRDAI) governs and regulates repositories."],
  ["Is Insurance Repository Registration mandatory?", "Yes, operating a repository without IRDAI approval is not permitted."],
  ["What is the purpose of Insurance Repositories?", "To digitise insurance policies and provide secure, centralised access to policyholders."],
  ["Are physical insurance policies still valid?", "Yes, but digital policies via repositories are encouraged for convenience and safety."],
  ["Can policyholders open multiple eIA accounts?", "No, one individual is allowed only one e-Insurance Account."],
  ["What services do repositories provide?", "Key services include:", ["Policy storage", "Policy updates", "Account management"]],
  ["Do repositories sell insurance policies?", "No, they only store and manage policies; they do not sell or advise."],
  ["Is Insurance Repository similar to NSDL/CDSL?", "Conceptually yes, but repositories deal with insurance policies instead of securities."],
  ["Can repositories handle insurance claims?", "No, claim settlement remains the responsibility of insurers."],
  ["What type of entity can become a repository?", "Only companies incorporated in India can apply."],
  ["Is this license suitable for startups?", "Yes, if they meet IRDAI eligibility and technical requirements."],
  ["What is policy dematerialisation?", "It is the process of converting physical insurance policies into digital form."],
  ["Are repositories part of the fintech ecosystem?", "Yes, they are considered digital financial infrastructure entities."],
  ["Is repository data legally valid?", "Yes, electronic records maintained are legally recognised."],
  ["What is the core function of repository?", "Secure storage and servicing of insurance policy data."],
  ["Who can apply for Insurance Repository Registration?", "Companies meeting IRDAI eligibility criteria including capital, governance, and infrastructure."],
  ["What is the minimum net worth required?", "As per IRDAI guidelines, applicants must maintain prescribed net worth at all times."],
  ["Can LLP apply for repository license?", "No, only companies incorporated under Companies Act are eligible."],
  ["Is foreign ownership allowed?", "Yes, subject to FDI norms and IRDAI approval."],
  ["What is fit and proper criteria?", "Promoters and directors must have:", ["Clean record", "Financial integrity", "No regulatory violations"]],
  ["Can existing fintech companies apply?", "Yes, if they align their structure and meet regulatory conditions."],
  ["Is prior insurance experience required?", "Not mandatory but beneficial for approval."],
  ["Can insurers apply for repository license?", "Only if permitted under IRDAI regulations."],
  ["Is there a restriction on business activities?", "Yes, repository must focus only on permitted activities."],
  ["Can a company hold multiple licenses?", "Yes, subject to regulatory approval and compliance separation."],
  ["Is IT infrastructure mandatory?", "Yes, strong and secure IT systems are essential."],
  ["Can startups apply without revenue?", "Yes, but must demonstrate financial strength and sustainability."],
  ["Is physical office required?", "Yes, a registered office and operational setup is required."],
  ["Are independent directors required?", "Governance expectations may require independent oversight."],
  ["Can NBFC apply for repository license?", "Yes, if it complies with IRDAI conditions."],
  ["Is business plan mandatory?", "Yes, detailed business plan is required."],
  ["Can group companies apply jointly?", "No, application must be made by a single legal entity."],
  ["Is compliance officer mandatory?", "Yes, regulatory compliance function must be established."],
  ["What is the process for Insurance Repository Registration?", "It involves application, documentation, review, and IRDAI approval."],
  ["What is the first step to apply?", "Incorporate a company with appropriate object clause."],
  ["Where to apply for registration?", "Application is submitted to IRDAI."],
  ["Is online application available?", "Mostly offline or structured submission as per IRDAI guidelines."],
  ["What documents are submitted in application?", "Incorporation, net worth, IT details, and business plan."],
  ["Does IRDAI ask queries?", "Yes, multiple rounds of queries are common."],
  ["Can application be rejected?", "Yes, if requirements are not met."],
  ["Is pre-consultation advisable?", "Yes, it improves approval chances."],
  ["Is system demonstration required?", "Yes, IRDAI may evaluate IT systems."],
  ["How many stages are there?", "Typically:", ["Application", "Review", "Query", "Approval"]],
  ["Can application be resubmitted?", "Yes, after rectifying deficiencies."],
  ["Is physical verification done?", "Possible depending on case."],
  ["Can professional help be taken?", "Yes, advisable for smooth process."],
  ["Is approval guaranteed?", "No, it depends on compliance readiness."],
  ["Is timeline fixed?", "No, varies based on application quality."],
  ["Can application be withdrawn?", "Yes, before approval."],
  ["Are meetings with IRDAI required?", "Sometimes required during evaluation."],
  ["Is license perpetual?", "Subject to compliance and regulatory conditions."],
  ["What are key documents required?", "Key documents include:", ["Incorporation certificate", "MOA/AOA", "Net worth certificate"]],
  ["Is business plan required?", "Yes, detailed and structured plan is mandatory."],
  ["Are IT documents required?", "Yes, system architecture and security framework."],
  ["Is director KYC required?", "Yes, identity and background verification is required."],
  ["Is audit report required?", "Yes, especially financial and system readiness."],
  ["Is cybersecurity policy mandatory?", "Yes, it is a critical requirement."],
  ["Is data protection policy required?", "Yes, to ensure confidentiality."],
  ["Is outsourcing policy required?", "Yes, if third-party vendors are involved."],
  ["Is compliance manual required?", "Yes, for regulatory oversight."],
  ["Are agreements with insurers required?", "Yes, integration framework must be shown."],
  ["Is financial projection required?", "Yes, part of business plan."],
  ["Is DR (disaster recovery) plan required?", "Yes, mandatory for IT compliance."],
  ["Are SOPs required?", "Yes, for operational clarity."],
  ["Is board resolution required?", "Yes, for application approval."],
  ["What is the government fee for registration?", "As per IRDAI prescribed fee structure."],
  ["Are fees refundable?", "Generally non-refundable."],
  ["What are professional fees?", "Depends on complexity and advisory scope."],
  ["Is IT cost significant?", "Yes, major portion of overall cost."],
  ["Are audit costs involved?", "Yes, ongoing and initial audits required."],
  ["What is total project cost?", "Varies widely depending on scale."],
  ["Is there annual fee?", "Yes, compliance and operational costs apply."],
  ["Are hidden costs involved?", "Costs may arise in IT upgrades and compliance."],
  ["Can cost be reduced?", "Only through efficient planning."],
  ["Is capital locked?", "Yes, net worth must be maintained."],
  ["Is GST applicable on services?", "Yes, on professional services."],
  ["Are penalties costly?", "Yes, non-compliance can be expensive."],
  ["Is outsourcing cost involved?", "Yes, for IT or security vendors."],
  ["Is ROI immediate?", "No, long-term business model."],
  ["How long does approval take?", "Typically 3–6 months."],
  ["Can it be fast-tracked?", "Only with strong documentation."],
  ["What delays approval?", "", ["Weak IT system", "Incomplete documents"]],
  ["Is timeline predictable?", "No, depends on IRDAI review."],
  ["Can approval be conditional?", "Yes, subject to compliance."],
  ["What is quickest approval case?", "With fully compliant application."],
  ["Is follow-up required?", "Yes, continuous engagement needed."],
  ["Can approval be revoked?", "Yes, for non-compliance."],
  ["What is pre-approval stage?", "Application scrutiny phase."],
  ["What is post-approval stage?", "Operational readiness."],
  ["Is system testing required?", "Yes, before operations."],
  ["Can approval be extended?", "Depends on conditions."],
  ["Is provisional approval given?", "Possible in certain cases."],
  ["What is final approval stage?", "Formal registration by IRDAI."],
  ["What are post-registration compliances?", "Includes:", ["Reporting", "Audit", "Data security"]],
  ["Is periodic reporting required?", "Yes, to IRDAI."],
  ["Is audit mandatory?", "Yes, system and financial audits."],
  ["Is cybersecurity compliance ongoing?", "Yes, continuous monitoring required."],
  ["Is data protection mandatory?", "Yes, strict compliance required."],
  ["Is grievance system required?", "Yes, mandatory."],
  ["Are inspections conducted?", "Yes, by IRDAI."],
  ["Is renewal required?", "Depends on regulatory terms."],
  ["Is compliance costly?", "Yes, requires ongoing investment."],
  ["Are updates required?", "Yes, systems must be updated regularly."],
  ["Is compliance officer needed?", "Yes, mandatory."],
  ["Are reports audited?", "Yes, must be verified."],
  ["Is outsourcing regulated?", "Yes, under guidelines."],
  ["Is data breach reporting required?", "Yes, immediate reporting needed."],
  ["Are penalties monitored?", "Yes, strictly enforced."],
  ["Is system uptime important?", "Yes, critical requirement."],
  ["Is board oversight required?", "Yes, governance mandatory."],
  ["Are compliance filings frequent?", "Yes, periodic filings required."],
  ["Is IT audit mandatory annually?", "Yes, as per guidelines."],
  ["What happens if repository violates rules?", "Penalties or cancellation may apply."],
  ["Can license be cancelled?", "Yes, for serious violations."],
  ["What is penalty for data breach?", "Severe regulatory action may be taken."],
  ["Is non-compliance risky?", "Yes, high regulatory risk."],
  ["What are major risks?", "", ["Cybersecurity", "Compliance failure"]],
  ["Can operations be suspended?", "Yes, by IRDAI."],
  ["Is financial penalty imposed?", "Yes, depending on violation."],
  ["Is reputation affected?", "Yes, significantly."],
  ["Can directors be penalised?", "Yes, under applicable provisions."],
  ["Is audit failure risky?", "Yes, may lead to action."],
  ["Is delayed reporting penalised?", "Yes."],
  ["Can system failure cause penalty?", "Yes, especially if it affects data."],
  ["Is regulatory scrutiny strict?", "Yes, very strict."],
  ["Can business be shut down?", "Yes, in extreme cases."],
  ["Is compliance mandatory always?", "Yes, continuous obligation."],
  ["Can I start operations before approval?", "No, prior approval is mandatory."],
  ["What if my IT system is not ready?", "Application may be rejected or delayed."],
  ["Can I outsource entire operations?", "No, core responsibility remains with entity."],
  ["What if insurer integration fails?", "Operations may be impacted."],
  ["Can I modify business model later?", "Yes, with regulatory approval."],
  ["What if net worth falls?", "It may lead to regulatory action."],
  ["Can I merge repository with another entity?", "Yes, subject to approval."],
  ["What if audit report is negative?", "Corrective action is required immediately."],
  ["Can I pause operations?", "Only with regulatory compliance."],
  ["What if data is lost?", "Severe consequences including penalties."],
  ["Can repository integrate with DigiLocker?", "Possible, subject to regulatory approval."],
  ["Is AI allowed in repository systems?", "Yes, with compliance safeguards."],
  ["Can repository expand globally?", "Primarily India-focused unless permitted."],
  ["What is regulatory future of repositories?", "Stronger cybersecurity and integration norms expected."],
  ["Can repository act as data analytics provider?", "Only within regulatory limits."],
  ["Is blockchain allowed?", "Possible, subject to compliance."],
  ["Can repository handle cross-border policies?", "Subject to regulatory approval."],
  ["What is biggest approval factor?", "Technology and compliance readiness."],
  ["What is biggest rejection reason?", "Weak IT and documentation."],
  ["Is this a high-barrier license?", "Yes, due to strict regulatory and technical requirements."]
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
      tags={[{ emoji: '🗂️', label: 'IRDAI Infrastructure Licence' }, { emoji: '🔐', label: 'Cybersecurity & Data Governance' }, { emoji: '📋', label: 'Application & Audit Readiness' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Regulatory Services', href: '/regulatory' }, { label: 'Insurance', href: '/regulatory/insurance' }, { label: 'Insurance Repository Registration' }]}
      title="Insurance Repository Registration in India - Complete Guide with Critical Compliance Insights"
      heroDescription={<><p><strong>Insurance Repository Registration in India</strong> is a highly specialised regulatory approval governed by IRDAI, enabling entities to maintain insurance policies in electronic, dematerialised form. From a regulatory standpoint this is not merely a licence. It is a responsibility-driven framework requiring strong technology infrastructure, data protection mechanisms and strict compliance oversight. Approval depends more on system readiness than on paperwork.</p><div className="flex flex-wrap gap-2 mt-5">{['IRDAI Repository Guidelines', 'e-Insurance Account (eIA)', 'Cybersecurity Framework', 'Disaster Recovery Site', 'Insurer API Integration', 'Data Localisation', 'System & IS Audits', 'Governance & Fit and Proper'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for Repository Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Assess Technology Readiness</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="35 min read"
      displayYear="2026"
      focusKeyword="Insurance Repository Registration in India"
      sections={sections}
      ctaTitle="Plan Your Repository Application"
      ctaDescription="Discuss object clause, IT architecture, cybersecurity framework, insurer integration roadmap and audit readiness."
      quickFacts={[{ label: 'Regulator', value: 'IRDAI' }, { label: 'Entity Type', value: 'Company only' }, { label: 'Core Product', value: 'e-Insurance Account' }, { label: 'Deciding Factor', value: 'Cybersecurity' }, { label: 'Timeline', value: '3-6 months' }]}
      relatedArticles={[
        { title: 'ISNP Registration', href: '/regulatory/insurance/isnp-certification-in-india', category: 'IRDAI', description: 'IRDAI permission for insurance self-network platforms and digital distribution.' },
        { title: 'Insurance Broker Registration in India', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'The intermediary route, contrasted with the repository infrastructure role.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'The parallel consent-based data infrastructure framework under RBI.' }
      ]}
      finalCtaTitle="Build a Repository Application IRDAI Can Approve"
      finalCtaDescription="End-to-end advisory covering feasibility assessment, object clause and governance structuring, IT and cybersecurity documentation, business plan drafting, application filing, IRDAI query handling and post-approval compliance setup."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to IRDAI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for Repository Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Assess Technology Readiness</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Insurance Repository Registration: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Insurance Regulatory and Development Authority of India' },
          { title: 'Governing Instruments', body: 'IRDAI (Insurance Repository) Guidelines and Regulations, applicable provisions of the Insurance Act, 1938, and IRDAI data security and IT governance norms' },
          { title: 'Eligible Entity Type', body: 'Company incorporated in India. LLPs and individuals are not permitted' },
          { title: 'Core Function', body: 'Acting as a centralised digital vault for insurance policies through e-Insurance Accounts' },
          { title: 'Net Worth', body: 'As prescribed by IRDAI, and must be maintained continuously' },
          { title: 'Three Evaluation Pillars', body: 'Data integrity, system reliability and regulatory transparency' },
          { title: 'Deciding Factor', body: 'Cybersecurity and IT architecture readiness, more than legal documentation' },
          { title: 'Revenue Model', body: 'Service charges from insurers, transaction fees and account maintenance agreements. No commissions' },
          { title: 'Indicative Timeline', body: 'Approximately 3 to 6 months, subject to queries' },
          { title: 'Nature of the Project', body: 'Capital-intensive, long-term infrastructure play rather than a short-term revenue model' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be confirmed against the applicant&rsquo;s corporate structure, technology architecture, insurer integration plan and the latest IRDAI repository guidelines, data security norms and circulars applicable at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is Insurance Repository Registration in India?">
        <p>In simple terms, it is a regulatory authorisation that allows an entity to act as a centralised digital vault for insurance policies. From a compliance perspective, insurance repositories facilitate:</p>
        <CheckList items={['Dematerialisation of insurance policies', 'Centralised record-keeping', 'Seamless policy servicing', 'Reduction of fraud and duplication']} />
        <p>Legally speaking, this framework operates under IRDAI-issued guidelines governing repository operations and data handling standards.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Requirement', 'Expectation']} rows={[
          ['Data confidentiality', 'Repository must maintain high standards of data confidentiality'],
          ['System integrity', 'Systems must ensure integrity and complete audit trails'],
          ['Insurer alignment', 'Operations must align with insurer integration protocols']
        ]} />
        <div className="info-box">From a regulatory standpoint, Insurance Repository Registration is not just a service model. It is treated as a critical financial infrastructure layer within the insurance ecosystem, with repositories acting as trusted custodians of policyholder data and coordinating with insurance companies, brokers and policyholders under real-time data synchronisation.</div>
      </Section>

      <Section id="ecosystem" title="The Insurance Repository Ecosystem in India">
        <p>From a regulatory ecosystem perspective, insurance repositories are part of India&rsquo;s broader financial digitisation architecture, alongside Account Aggregators under the RBI framework, DigiLocker, the CKYC registry and the Insurance Information Bureau.</p>
        <div className="info-box"><strong>Strategic insight:</strong> insurance repositories act as the policy infrastructure layer, in the same way depositories such as NSDL and CDSL do in the capital markets.</div>
      </Section>

      <Section id="who-needs" title="Who Needs Insurance Repository Registration?">
        <CheckList items={['Technology-driven insurance service providers', 'Financial infrastructure companies', 'Entities offering digital policy management solutions', 'Insurer-backed service platforms', 'Companies planning to build e-Insurance Account ecosystems']} />
      </Section>

      <Section id="operational-model" title="Operational Model and Key Functions">
        <p>In simple terms, the repository functions as a digital bridge between insurers and policyholders.</p>
        <Flow items={['Policy issued by insurer', 'Policy converted into electronic format', 'Stored in the e-Insurance Account (eIA)', 'Accessible by the policyholder at any time', 'Updates automatically reflected']} />
        <h3>Key Functions</h3>
        <CheckList items={['Opening and maintaining e-Insurance Accounts (eIA)', 'Dematerialisation of existing policies', 'Policy servicing support such as address change and nominee update', 'Secure storage of policy data', 'Providing access to a consolidated insurance portfolio']} />
      </Section>

      <Section id="eia" title="Interlinking with the e-Insurance Account (eIA)">
        <p>Legally speaking, the entire repository model revolves around the eIA.</p>
        <CheckList items={['Single account for multiple policies', 'No physical policy dependency', 'Easy nominee updates', 'Simplified KYC process', 'Consolidated view of the insurance portfolio']} />
        <div className="info-box"><strong>Practical advantage:</strong> the eIA reduces policy misplacement, duplication and fraud risk.</div>
      </Section>

      <Section id="policy-lifecycle" title="Role of the Repository Across the Policy Lifecycle">
        <DataTable headers={['Lifecycle Stage', 'Repository Role']} rows={[
          ['Policy issuance', 'Digitisation'],
          ['Mid-term servicing', 'Updates in the eIA'],
          ['Renewal', 'Auto-reflection'],
          ['Claim stage', 'Record reference'],
          ['Closure', 'Archival']
        ]} />
        <p>This ensures end-to-end visibility for policyholders across the life of every policy held in the account.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria">
        <DataTable headers={['Criteria', 'Requirement', 'Practical Insight']} rows={[
          ['Legal Structure', 'Company incorporated in India', 'LLPs or individuals not permitted'],
          ['Net Worth', 'As prescribed by IRDAI', 'Must be maintained continuously'],
          ['IT Infrastructure', 'Robust and secure systems', 'Cybersecurity is a key approval factor'],
          ['Management', 'Fit and proper directors', 'Background checks are strict'],
          ['Business Plan', 'Detailed operational model', 'Must show scalability and compliance']
        ]} />
      </Section>

      <Section id="governance" title="Governance and Fit and Proper Criteria">
        <h3>Governance Requirements</h3>
        <CheckList items={['Fit and proper Board of Directors', 'Independent oversight mechanisms', 'Internal compliance officer', 'Defined reporting structure']} />
        <h3>Fit and Proper Criteria</h3>
        <CheckList items={['Financial integrity', 'No criminal background', 'No regulatory violations', 'Relevant experience']} />
        <div className="warning-box">Weak governance is one of the silent reasons for regulatory rejection, and background verification is taken very seriously by IRDAI.</div>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose', 'Notes']} rows={[
          ['Certificate of Incorporation', 'Legal identity', 'Mandatory'],
          ['MOA and AOA', 'Object clause validation', 'Must include repository activity'],
          ['Net Worth Certificate', 'Financial strength', 'Certified by a Chartered Accountant'],
          ['Business Plan', 'Operational clarity', 'Must include technology architecture'],
          ['IT System Details', 'Security compliance', 'Critical for approval'],
          ['Director KYC', 'Governance check', 'Includes background verification']
        ]} />
      </Section>

      <Section id="documentation-depth" title="Documentation Depth Expected by IRDAI">
        <p>IRDAI does not just check documents. It evaluates their depth and maturity.</p>
        <CheckList items={['IT system design documents', 'Cybersecurity policies', 'Data governance framework', 'Business continuity plan', 'Risk management framework']} />
        <div className="warning-box">Superficial documentation is one of the most common reasons for delays.</div>
      </Section>

      <Section id="business-plan" title="Business Plan Expectations">
        <p>The business plan must clearly demonstrate:</p>
        <CheckList items={['Revenue model sustainability', 'Operational scalability', 'Technology capability', 'Risk mitigation strategy', 'Integration roadmap with insurers']} />
        <div className="warning-box"><strong>Practical insight:</strong> a generic or template-based business plan is usually rejected or heavily questioned.</div>
      </Section>

      <Section id="technology" title="Technology Architecture: What IRDAI Actually Looks For">
        <DataTable headers={['Area Evaluated', 'Minimum Expectation']} rows={[
          ['Core application system', 'High availability systems'],
          ['Database structure', 'Real-time data processing'],
          ['Encryption protocols', 'End-to-end encryption and secure data storage architecture'],
          ['Access control mechanism', 'Role-based, logged and traceable access'],
          ['Disaster recovery system', 'Backup and recovery readiness with a DR site'],
          ['API integrations', 'Secure, authenticated and monitored insurer integrations']
        ]} />
      </Section>

      <Section id="cybersecurity" title="Cybersecurity: The Deciding Factor">
        <p>In most cases, approval depends heavily on the strength of the information security posture.</p>
        <CheckList items={['Information security framework', 'Data encryption standards', 'Regular vulnerability assessment', 'System audit and penetration testing', 'Incident response mechanism']} />
        <div className="warning-box"><strong>Reality check:</strong> even legally strong applications get delayed due to weak cybersecurity planning. Many applications face delays or rejection because of inadequate IT documentation, not legal gaps.</div>
      </Section>

      <Section id="data-protection" title="Data Protection and Confidentiality Obligations">
        <CheckList items={['Policyholder data must be strictly confidential', 'No unauthorised data sharing permitted', 'Access must be role-based, logged and traceable', 'Data localisation compliance', 'Backup protocols', 'Incident reporting mechanism']} />
      </Section>

      <Section id="internal-policies" title="Internal Policies Required (Often Ignored by Applicants)">
        <p>These are not optional. They are expected as part of a serious application.</p>
        <CheckList items={['Information Security Policy', 'Data Privacy Policy', 'IT Governance Policy', 'Risk Management Policy', 'Outsourcing Policy']} />
      </Section>

      <Section id="integration" title="Integration Requirements with Insurers">
        <p>Insurance repositories cannot operate in isolation. They must establish:</p>
        <CheckList items={['API-based integration with insurers', 'Secure data exchange protocols', 'Standardised data formats']} />
        <div className="warning-box"><strong>Real-world challenge:</strong> integration delays with insurers often slow down repository operations even after approval has been granted.</div>
      </Section>

      <Section id="outsourcing" title="Outsourcing and Vendor Risk Management">
        <DataTable headers={['May Be Outsourced', 'But']} rows={[
          ['IT infrastructure', 'Full responsibility remains with the repository'],
          ['Cloud services', 'Vendor agreements must be compliance-aligned'],
          ['Security management', 'Periodic vendor audits are required']
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Registration Process">
        <Timeline steps={[
          { title: 'Incorporate a company with the appropriate object clause', body: 'The MOA must expressly cover repository activity. LLPs and individuals are not permitted applicants.' },
          { title: 'Develop IT infrastructure aligned with IRDAI standards', body: 'Core system, encryption, access control, disaster recovery and audit logging built before the application, not promised in it.' },
          { title: 'Prepare a detailed application with supporting documents', body: 'Business plan with technology architecture, IT system details, net worth certificate and director KYC.' },
          { title: 'Submit the application to IRDAI', body: 'File the complete dossier with the depth of documentation the regulator expects.' },
          { title: 'Respond to queries and clarifications', body: 'Handle technical, governance and business model queries in a structured, evidence-backed format.' },
          { title: 'Obtain approval and commence operations', body: 'Finalise insurer integrations and operational readiness before onboarding accounts.' }
        ]} />
      </Section>

      <Section id="execution-strategy" title="End-to-End Execution Strategy">
        <p>From a practical advisory standpoint, this registration requires a multi-layered execution approach, not just documentation.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Phase 1: Feasibility Assessment', body: <ul className="!mb-0"><li>Evaluate business model alignment with IRDAI expectations</li><li>Assess capital, technology and compliance readiness</li></ul> },
          { title: 'Phase 2: Structuring and Planning', body: <ul className="!mb-0"><li>Draft the object clause in line with repository activities</li><li>Design governance structure and compliance hierarchy</li></ul> },
          { title: 'Phase 3: Technology Architecture', body: <ul className="!mb-0"><li>Define system architecture</li><li>Build the cybersecurity framework</li><li>Prepare audit-ready documentation</li></ul> },
          { title: 'Phase 4: Application Preparation', body: <ul className="!mb-0"><li>Compile regulatory documents</li><li>Draft the business plan with operational clarity</li><li>Prepare risk and compliance frameworks</li></ul> },
          { title: 'Phase 5: Regulatory Interaction', body: <ul className="!mb-0"><li>Submit the application</li><li>Handle IRDAI queries</li><li>Provide clarifications and additional documents</li></ul> },
          { title: 'Phase 6: Approval and Operational Readiness', body: <ul className="!mb-0"><li>Obtain registration</li><li>Finalise insurer integrations</li><li>Launch operations</li></ul> }
        ]} />
      </Section>

      <Section id="query-handling" title="Regulatory Query Handling Strategy">
        <p>After application submission, IRDAI typically raises technical queries, governance-related queries and business model clarifications.</p>
        <CheckList items={['Respond in a structured format', 'Provide documentary evidence', 'Avoid vague or generic replies']} />
      </Section>

      <Section id="fees" title="Government Fees">
        <DataTable headers={['Component', 'Amount', 'Remarks']} rows={[
          ['Application Fee', 'As prescribed by IRDAI', 'Subject to revision'],
          ['Registration Fee', 'Applicable post-approval', 'One-time'],
          ['Compliance Costs', 'Variable', 'Includes IT and audit expenses']
        ]} />
      </Section>

      <Section id="cost-structure" title="Realistic Cost Structure (Beyond Government Fees)">
        <CheckList items={['Technology development', 'Cybersecurity implementation', 'Legal and compliance advisory', 'Audit costs', 'Integration setup']} />
        <div className="warning-box">This is a capital-intensive and long-term project. Government fees are a small fraction of the real cost of entry.</div>
      </Section>

      <Section id="timeline" title="Timeline">
        <DataTable headers={['Stage', 'Time Required']} rows={[
          ['Documentation Preparation', '2-4 weeks'],
          ['Application Review', '2-3 months'],
          ['Approval, subject to queries', '3-6 months']
        ]} />
      </Section>

      <Section id="revenue-model" title="Revenue Model of an Insurance Repository">
        <p>Unlike typical financial intermediaries, repositories earn through service-based rather than commission-based income.</p>
        <CheckList items={['Service charges from insurers', 'Transaction-based fees', 'Account maintenance agreements']} />
        <div className="info-box">Repositories do not earn commissions in the way brokers or agents do. The economics are infrastructure economics.</div>
      </Section>

      <Section id="restrictions" title="Limitations and Restrictions (Very Important)">
        <p>Insurance repositories are strictly regulated entities, and their role is purely custodial and service-oriented.</p>
        <DataTable headers={['A Repository Cannot', 'Position']} rows={[
          ['Sell insurance policies', 'Distribution requires a separate intermediary registration'],
          ['Provide advisory services', 'Advisory sits outside the custodial role'],
          ['Act as a broker or agent', 'Would conflict with the infrastructure function'],
          ['Handle claim settlements', 'Claims remain with the insurer']
        ]} />
      </Section>

      <Section id="repository-vs-broker" title="Insurance Repository vs Insurance Broker">
        <DataTable headers={['Basis', 'Insurance Repository', 'Insurance Broker']} rows={[
          ['Function', 'Policy storage', 'Policy selling'],
          ['Revenue Model', 'Service fee', 'Commission'],
          ['Regulatory Role', 'Infrastructure', 'Intermediary'],
          ['Customer Interaction', 'Limited', 'Direct advisory'],
          ['Risk Exposure', 'Data risk', 'Sales and compliance risk']
        ]} />
      </Section>

      <Section id="vs-digital-infrastructure" title="Repository vs Other Digital Infrastructure Frameworks">
        <DataTable headers={['Framework', 'Regulator', 'Purpose']} rows={[
          ['Insurance Repository', 'IRDAI', 'Policy storage'],
          [<>Account Aggregator (see <Link key="aa" href="/rbi/nbfc-account-aggregator-license">AA licensing</Link>)</>, 'RBI', 'Financial data sharing'],
          ['DigiLocker', 'MeitY', 'Document storage'],
          ['CKYC', 'CERSAI', 'KYC repository']
        ]} />
        <p>Together, these frameworks form India&rsquo;s digital financial ecosystem, and e-Insurance Accounts are expected to integrate further with DigiLocker and Aadhaar-based systems over time.</p>
      </Section>

      <Section id="post-registration" title="Post-Registration Compliance">
        <CheckList items={['Periodic reporting to IRDAI', 'Maintenance of IT security standards', 'Data privacy compliance', 'Internal audit and system audit', 'Continuous net worth maintenance']} />
        <p>Advanced ongoing requirements include system audit reports, cybersecurity compliance reports, regulatory filings with IRDAI and a functioning grievance handling mechanism.</p>
      </Section>

      <Section id="audit-framework" title="Audit Framework (Deep Compliance Layer)">
        <DataTable headers={['Audit Type', 'Focus']} rows={[
          ['System Audit', 'Core application, processing integrity and logs'],
          ['Information Security Audit', 'Encryption, access control and vulnerability posture'],
          ['Internal Audit', 'Process adherence and control effectiveness'],
          ['Compliance Audit', 'Regulatory obligations and filings']
        ]} />
        <div className="info-box">Audit reports are often reviewed by IRDAI during inspections, so they should be written to be read by the regulator.</div>
      </Section>

      <Section id="grievance" title="Grievance Redressal Mechanism">
        <CheckList items={['Dedicated grievance system', 'Defined turnaround timelines', 'Escalation matrix']} />
        <p>The mechanism must align with the IRDAI grievance handling framework.</p>
      </Section>

      <Section id="inspection" title="Inspection and Regulatory Oversight">
        <p>IRDAI may conduct inspections, review IT systems, audit data security controls and evaluate operational processes. From experience, inspections focus on:</p>
        <CheckList items={['System logs and access controls', 'Data breach preparedness', 'Audit reports', 'Integration with insurers', 'Complaint handling']} />
        <div className="warning-box">Non-compliance is treated seriously because of the sensitivity of policyholder data. A repository must be inspection-ready at all times, not only when a notice arrives.</div>
      </Section>

      <Section id="penalties" title="Penalties and Consequences of Non-Compliance">
        <CheckList items={['Monetary penalties', 'Suspension of operations', 'Cancellation of registration', 'Restriction on onboarding new accounts']} />
      </Section>

      <Section id="case-insights" title="Practical Case-Based Insights (Industry Reality)">
        <DataTable headers={['Case', 'Reason', 'Impact']} rows={[
          ['Application delay', 'Incomplete IT security architecture', '6-9 month delay'],
          ['Post-approval issue', 'Weak insurer integration', 'Operational inefficiency'],
          ['Compliance failure', 'Lack of audit preparedness', 'Regulatory warnings']
        ]} />
      </Section>

      <Section id="where-applicants-fail" title="Where Most Applicants Fail">
        <CheckList items={['Treating it like a normal licence', 'Weak technical documentation', 'Poor understanding of the repository role', 'Lack of integration planning', 'Inadequate compliance preparation']} />
        <p>Other recurring risks include applying without a strong technology backbone, misinterpreting IRDAI expectations, ignoring audit readiness and underestimating the ongoing compliance burden.</p>
      </Section>

      <Section id="success-factors" title="Approval Success Factors (Real Industry Insight)">
        <CheckList items={['Strong IT backbone', 'Clear business model', 'Experienced management', 'Detailed documentation', 'Professional regulatory handling']} />
      </Section>

      <Section id="checklist" title="Checklist Before Applying">
        <CheckList items={['IT architecture ready', 'Cybersecurity framework documented', 'Business model clarity', 'Integration feasibility assessed', 'Compliance officer identified', 'Audit readiness ensured']} />
        <p>Applicants should position themselves as a technology-first company, a compliance-driven organisation, an infrastructure service provider and a long-term ecosystem player.</p>
      </Section>

      <Section id="investor-view" title="Investor Perspective on Insurance Repository">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Attractive Factors', body: <ul className="!mb-0"><li>High entry barriers</li><li>Limited competition</li><li>Strong regulatory backing</li><li>Long-term scalability</li></ul> },
          { title: 'Risk Factors', body: <ul className="!mb-0"><li>High compliance burden</li><li>Technology investment</li><li>Regulatory dependency</li></ul> }
        ]} />
        <p>Opportunity areas include digital insurance ecosystem growth, insurer partnerships, API-based service models, data-driven services within regulatory limits, and integration with fintech platforms.</p>
      </Section>

      <Section id="global-practices" title="Comparison with Global Practices">
        <DataTable headers={['Region', 'Comparable System']} rows={[
          ['United Kingdom', 'Digital insurance record systems'],
          ['United States', 'Policy administration platforms'],
          ['European Union', 'Data-driven insurance infrastructure']
        ]} />
        <p>India&rsquo;s repository model is more regulated and centralised than most of these comparators.</p>
      </Section>

      <Section id="future" title="Future Regulatory Direction">
        <CheckList items={['Stronger cybersecurity norms', 'Integration with national digital platforms', 'Increased regulatory monitoring', 'Standardisation across insurers']} />
        <div className="info-box">With increasing digitisation, e-Insurance Accounts are expected to become standard, and repositories may become core infrastructure for insurance digitisation in India.</div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Fintech Can Support">
        <p>With deep experience across IRDAI and regulatory licensing, a structured approach includes:</p>
        <CheckList items={['End-to-end advisory', 'Documentation and application drafting', 'IT compliance guidance', 'Query handling with the regulator', 'Post-approval compliance setup']} />
        <p>The difference between approval and rejection, between delay and fast-track, and between compliance and penalty lies in how well the application is prepared and executed.</p>
      </Section>

      <Section id="faqs" title="FAQs on Insurance Repository Registration in India">
        <p>{faqs.length} questions covering eligibility, the eIA model, technology and cybersecurity expectations, documents, process, fees, timeline, compliance, inspection and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <blockquote className="border-l-4 border-[#1677f2] pl-4 italic text-gray-700">Insurance repository registration is not merely a licensing process. It is an infrastructure-level approval where regulators assess not just intent, but the technological and governance maturity of the applicant. A well-prepared application reflects long-term operational credibility.</blockquote>
          <h3 className="mt-6">Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: IRDAI, RBI, SEBI and IFSCA frameworks, insurance infrastructure and intermediary licensing, IT and cybersecurity compliance documentation, and post-approval regulatory support.</p>
          <p>Insurance Repository Registration in India is a forward-looking regulatory framework supporting the digitisation of insurance services. While it presents a strong business opportunity, it also demands high compliance discipline, technological capability and regulatory understanding.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. IRDAI repository guidelines, net worth requirements, fee amounts, technology and cybersecurity expectations, audit obligations and integration standards may change from time to time. Applicants should verify the latest IRDAI guidelines, regulations and circulars, and take advice on their own technology architecture, before filing any repository application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our IRDAI Compliance Expert">
        <p>Approach this not just as a regulatory requirement, but as a strategic infrastructure opportunity, combining legal preparedness, infrastructure readiness and expert guidance to ensure successful approval and sustainable operations.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to IRDAI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Apply for Repository Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Assess Technology Readiness</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
