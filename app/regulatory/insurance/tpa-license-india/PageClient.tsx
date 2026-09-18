'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'TPA License India: Quick Overview' },
  { id: 'what-is', title: 'What is a TPA License in India?' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'who-needs', title: 'Who Requires a TPA License?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'principal-officer', title: 'Principal Officer Requirement' },
  { id: 'hr-planning', title: 'Human Resource Planning' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'moa-drafting', title: 'Drafting the MOA: Critical Yet Ignored' },
  { id: 'evaluation', title: 'What IRDAI Actually Evaluates' },
  { id: 'process', title: 'Step-by-Step Registration Process' },
  { id: 'review-stages', title: 'How IRDAI Reviews Your Application' },
  { id: 'application-strategy', title: 'End-to-End Application Strategy' },
  { id: 'fees', title: 'Fees' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'operational-workflow', title: 'End-to-End TPA Operational Workflow' },
  { id: 'hospital-network', title: 'Hospital Network Management' },
  { id: 'technology', title: 'Technology Stack and IT Compliance' },
  { id: 'business-model', title: 'Business Model: How TPAs Earn' },
  { id: 'comparison', title: 'TPA vs Insurance Broker vs Corporate Agent' },
  { id: 'vs-healthtech', title: 'TPA License vs Health-Tech Platform' },
  { id: 'case-study', title: 'Case-Based Understanding' },
  { id: 'when-strategic', title: 'When a TPA License Becomes Strategic' },
  { id: 'post-registration', title: 'Post-Registration Compliance' },
  { id: 'advanced-compliance', title: 'Advanced Compliance Framework' },
  { id: 'grievance', title: 'Grievance Redressal Mechanism' },
  { id: 'audit-reporting', title: 'Internal Audit and Reporting' },
  { id: 'renewal', title: 'Renewal and Continuity' },
  { id: 'penalties', title: 'Penalties and Regulatory Action' },
  { id: 'challenges', title: 'Practical Challenges and Hidden Risks' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'checklist', title: 'Pre-Application Checklist' },
  { id: 'scalability', title: 'Scalability After the Licence' },
  { id: 'future-outlook', title: 'Future Outlook' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IRDAI Compliance Expert' }
];

const faqs = ([
  ["What is a TPA License in India?", "A TPA License is an approval issued by IRDAI to companies to act as Third Party Administrators in health insurance. It allows them to manage claims, hospital networks, and policyholder services."],
  ["What does a Third Party Administrator (TP", "do?A. A TPA supports insurers by handling:", ["Health insurance claims", "Cashless hospitalisation", "Customer servicing"]],
  ["Is TPA License mandatory in India?", "Yes, it is compulsory. No entity can operate as a TPA without IRDAI registration."],
  ["Who issues the TPA License in India?", "The Insurance Regulatory and Development Authority of India (IRDAI) grants the license."],
  ["Can a TPA sell insurance policies?", "No, TPAs cannot sell insurance. They only provide backend services to insurers."],
  ["What type of entity can apply for a TPA License?", "Only a company registered under the Companies Act, 2013 can apply."],
  ["What is the main role of TPAs in health insurance?", "Their main role is to facilitate claim processing and manage healthcare services."],
  ["Is TPA License only for health insurance?", "Yes, TPAs are specifically allowed to operate in health insurance services."],
  ["Can individuals become TPAs?", "No, individuals are not eligible. Only companies can apply."],
  ["What is cashless claim processing by TPA?", "It means TPAs coordinate with hospitals so policyholders don’t pay upfront."],
  ["Are TPAs regulated strictly?", "Yes, TPAs are highly regulated by IRDAI due to sensitive data handling."],
  ["What is the scope of TPA services?", "Services include:", ["Claims processing", "Hospital network management", "Customer support"]],
  ["Can TPAs operate independently?", "No, they must work in association with insurance companies."],
  ["Is TPA License a one-time approval?", "No, it requires periodic renewal as per IRDAI norms."],
  ["What industries use TPAs?", "Primarily insurance and healthcare sectors."],
  ["What is the minimum capital required for TPA License?", "₹4 Crore is required as per IRDAI guidelines."],
  ["Can startups apply for TPA License India?", "Yes, startups can apply if they meet capital and compliance requirements."],
  ["Is foreign investment allowed in TPA companies?", "Yes, but subject to IRDAI and FDI norms."],
  ["Do directors need specific qualifications?", "Yes, they must meet “Fit & Proper” criteria."],
  ["What is Fit & Proper criteria?", "It includes:", ["Integrity", "Financial soundness", "Clean regulatory record"]],
  ["Is a medical professional required in TPA?", "Yes, a qualified Principal Officer is required."],
  ["Can an existing company apply for TPA License?", "Yes, if its objects allow TPA activities."],
  ["Is prior insurance experience mandatory?", "Not mandatory, but highly preferred."],
  ["Can NBFC apply for TPA License?", "Only if structured as a separate eligible company."],
  ["Is office setup mandatory?", "Yes, physical infrastructure is required."],
  ["Can LLP apply for TPA License?", "No, only companies are eligible."],
  ["Is IT infrastructure required at application stage?", "Yes, IRDAI expects operational readiness."],
  ["Can a foreign company directly apply?", "No, it must incorporate an Indian company."],
  ["Is hospital network required before application?", "It is preferred to demonstrate readiness."],
  ["Is financial track record mandatory?", "Yes, IRDAI reviews financial strength."],
  ["What is the process to apply for TPA License India?", "The process includes:", ["Company incorporation", "Document preparation", "IRDAI application", "Approval"]],
  ["How do I apply for TPA License India step-by-step?", "Steps include:", ["Prepare documents", "Submit application", "Respond to queries"]],
  ["Where is application submitted?", "Application is submitted to IRDAI."],
  ["Is online application available?", "Partially, but documentation is detailed."],
  ["What happens after submission?", "IRDAI reviews and raises queries if needed."],
  ["Is personal meeting required?", "Sometimes, depending on IRDAI requirements."],
  ["How many stages are there in approval?", "Typically 3–4 stages including scrutiny and evaluation."],
  ["Can application be rejected?", "Yes, if requirements are not met."],
  ["Can I reapply after rejection?", "Yes, after addressing deficiencies."],
  ["Is business plan mandatory?", "Yes, it is a critical requirement."],
  ["What documents are required for TPA License?", "Key documents include:", ["COI", "MOA & AOA", "Financials"]],
  ["Is net worth certificate required?", "Yes, it proves capital compliance."],
  ["Are director KYC documents needed?", "Yes, mandatory."],
  ["Is business plan compulsory?", "Yes, IRDAI evaluates viability."],
  ["Are IT system details required?", "Yes, for data security validation."],
  ["Is Principal Officer qualification proof needed?", "Yes, mandatory."],
  ["Are declarations required?", "Yes, Fit & Proper declarations."],
  ["Is audited financial required?", "Yes, for financial evaluation."],
  ["Is board resolution required?", "Yes, authorising application."],
  ["Is hospital tie-up document required?", "Not mandatory but beneficial."],
  ["What is the government fee for TPA License?", "Fees are prescribed by IRDAI and vary."],
  ["What is total cost of TPA License India?", "It includes:", ["Government fees", "Professional fees", "Infrastructure cost"]],
  ["Is capital separate from fees?", "Yes, ₹4 Crore capital is separate."],
  ["Is renewal fee applicable?", "Yes, periodically."],
  ["Are there hidden costs?", "Yes, mainly compliance and IT costs."],
  ["How long does TPA License take?", "Typically 2–4 months."],
  ["Can approval be fast-tracked?", "Only if documentation is strong."],
  ["What delays approval?", "Common reasons:", ["Incomplete documents", "Weak business plan"]],
  ["Is timeline fixed?", "No, depends on IRDAI review."],
  ["How many queries are raised?", "Usually multiple rounds."],
  ["What are post-license compliances?", "Includes:", ["Reporting", "Audit", "Data protection"]],
  ["Is audit mandatory?", "Yes, periodic audits required."],
  ["Is data protection important?", "Yes, critical compliance area."],
  ["Do TPAs need to file reports?", "Yes, with IRDAI."],
  ["Is grievance system required?", "Yes, mandatory."],
  ["What happens if TPA operates without license?", "It is illegal and attracts penalties."],
  ["Can license be cancelled?", "Yes, for non-compliance."],
  ["What are major risks?", "Risks include:", ["Data breach", "Fraud"]],
  ["Can I start TPA business without insurer tie-up?", "No, insurer relationship is essential."],
  ["Can TPAs work with multiple insurers?", "Yes."],
  ["What is IRDAI’s main focus during approval?", "Operational readiness and compliance."],
  ["What is biggest challenge in TPA business?", "Efficient claim handling."],
  ["Is it mandatory to maintain records of claims processed?", "Yes, TPAs must maintain detailed records of all claims. As per regulatory guidelines, records should be auditable and securely stored."],
  ["Do TPAs need to comply with data privacy laws?", "Yes, strict compliance is required. Key obligations include:", ["Confidential handling of medical data", "Secure IT systems", "Controlled access"]],
  ["Is outsourcing allowed in TPA operations?", "Limited outsourcing is allowed. However:", ["Core functions must remain in-house", "Full accountability remains with TPA"]],
  ["Are TPAs required to maintain a grievance redressal system?", "Yes, it is mandatory. TPAs must ensure:", ["Timely complaint resolution", "Defined escalation matrix"]],
  ["Do TPAs need to submit periodic returns to IRDAI?", "Yes, regular reporting is compulsory as per applicable regulations."],
  ["Is internal audit mandatory for TPAs?", "Yes, periodic internal audits are required to ensure compliance."],
  ["What is the role of compliance officer in TPA?", "The compliance officer ensures:", ["Regulatory adherence", "Reporting accuracy", "Audit coordination"]],
  ["Do TPAs need to maintain service level agreements (SLAs)?", "Yes, SLAs with insurers and hospitals are essential for service quality."],
  ["Is cybersecurity compliance required?", "Yes, TPAs must implement strong cybersecurity frameworks."],
  ["Can IRDAI inspect TPA operations?", "Yes, inspections can be conducted at any time."],
  ["Are TPAs required to maintain hospital networks?", "Yes, maintaining and managing hospital networks is a core function."],
  ["Is claim turnaround time regulated?", "Yes, TPAs must adhere to defined timelines."],
  ["Can TPAs reject insurance claims?", "No, final authority lies with the insurer."],
  ["Is continuous training of staff required?", "Yes, especially for medical and claims teams."],
  ["Is renewal compliance strict?", "Yes, renewal depends on compliance track record."],
  ["What penalties apply for non-compliance?", "Penalties may include:", ["Monetary fines", "Suspension", "License cancellation"]],
  ["What happens if a TPA mishandles customer data?", "It can lead to:", ["Severe penalties", "Reputational damage", "Regulatory action"]],
  ["Can IRDAI suspend a TPA License?", "Yes, in case of serious violations."],
  ["What are the biggest compliance risks in TPA business?", "Key risks include:", ["Data breach", "Fraudulent claims", "Poor service quality"]],
  ["What happens if reporting requirements are missed?", "It may attract penalties and regulatory warnings."],
  ["Can directors be held liable for non-compliance?", "Yes, under governing provisions, directors may be accountable."],
  ["What happens if capital requirement falls below threshold?", "License may be at risk and corrective action is required."],
  ["Is there penalty for delay in grievance handling?", "Yes, it may lead to regulatory scrutiny."],
  ["Can repeated non-compliance lead to cancellation?", "Yes, persistent violations can result in cancellation."],
  ["What is reputational risk in TPA business?", "Poor service or compliance failure can damage credibility."],
  ["Can I start TPA business without prior experience?", "Yes, but having experienced professionals is critical."],
  ["Can a health-tech startup apply for TPA License?", "Yes, if structured as a compliant company."],
  ["Can TPAs operate digitally without physical office?", "No, physical office setup is required."],
  ["Can TPAs partner with hospitals directly?", "Yes, for empanelment and service delivery."],
  ["Can TPAs handle claims for multiple insurers?", "Yes, they can work with multiple insurers."],
  ["What happens if IT systems fail during operations?", "It can disrupt services and attract regulatory issues."],
  ["Can TPAs expand into telemedicine?", "Yes, subject to compliance with regulations."],
  ["Can TPAs earn directly from policyholders?", "Generally no, revenue comes from insurers."],
  ["Is manpower requirement high in TPA business?", "Yes, it is operationally intensive."],
  ["Can TPA business be fully outsourced?", "No, core functions must remain in-house."],
  ["What happens if hospital network is weak?", "Service quality suffers and insurer relationships may be impacted."],
  ["Can TPAs scale nationally?", "Yes, with proper infrastructure and compliance."],
  ["Can TPAs integrate with mobile apps?", "Yes, with secure systems."],
  ["What is ideal business model for TPAs?", "Service-based model with insurer partnerships."],
  ["Can TPAs work internationally?", "Possible, subject to regulatory approvals."],
  ["How does IRDAI evaluate business model in TPA application?", "IRDAI assesses:", ["Sustainability", "Operational feasibility", "Market relevance"]],
  ["What is importance of MOA in TPA License?", "MOA must clearly permit TPA activities to avoid rejection."],
  ["What are key success factors in TPA business?", "Success depends on:", ["Efficiency", "Compliance", "Technology"]],
  ["How important is IT infrastructure in TPA approval?", "It is critical and closely evaluated."],
  ["What is role of medical team in TPA?", "They evaluate claims and support decision-making."],
  ["What is IRDAI’s biggest concern in TPA operations?", "Data security and service quality."],
  ["How can rejection risk be minimized?", "By ensuring:", ["Complete documentation", "Strong compliance setup"]],
  ["What is difference between TPA and insurer?", "TPA provides services, insurer bears risk."],
  ["Can TPAs use AI in claims processing?", "Yes, but compliance must be ensured."],
  ["What is role of audit in TPA operations?", "Ensures compliance and transparency."],
  ["How does TPA impact policyholders?", "Improves claim experience and service quality."],
  ["What are regulatory trends in TPA sector?", "Increasing focus on:", ["Digital systems", "Data protection"]],
  ["What is scalability potential of TPA business?", "High, due to growing insurance sector."],
  ["Can TPAs diversify services?", "Yes, within regulatory limits."],
  ["What is long-term sustainability factor?", "Strong compliance and operational efficiency."],
  ["How does IRDAI monitor TPAs post-approval?", "Through reporting, audits, and inspections."],
  ["What is risk of weak compliance framework?", "Leads to penalties and business disruption."],
  ["Can TPAs build digital health ecosystems?", "Yes, with regulatory compliance."],
  ["What is importance of grievance system in TPA?", "Ensures customer trust and compliance."],
  ["Can TPAs collaborate with fintech companies?", "Yes, subject to regulatory alignment."],
  ["What is future of TPA License India?", "Strong growth with digital healthcare expansion."],
  ["What is ideal promoter profile for TPA?", "Financially strong with clean track record."],
  ["How important is insurer relationship?", "It is critical for business sustainability."],
  ["What is impact of claim delays?", "Leads to customer dissatisfaction and penalties."],
  ["Can TPAs automate claim processing?", "Yes, with compliance safeguards."],
  ["What is biggest operational challenge?", "Managing high claim volumes efficiently."],
  ["What is importance of data analytics in TPA?", "Helps in fraud detection and efficiency."],
  ["Can TPAs provide preventive healthcare services?", "Yes, as value-added services."],
  ["What is IRDAI expectation from TPA management?", "Strong governance and accountability."],
  ["What is importance of SLA monitoring?", "Ensures service quality compliance."],
  ["Can TPAs enter into international partnerships?", "Yes, subject to approvals."],
  ["What is regulatory risk of rapid scaling?", "Compliance gaps may arise."],
  ["How does TPA ensure fraud control?", "Through audit and monitoring systems."],
  ["What is importance of documentation in TPA operations?", "Critical for compliance and audit."],
  ["Can TPAs integrate blockchain or advanced tech?", "Yes, if compliant with regulations."],
  ["What is ideal growth strategy for TPAs?", "Balanced growth with compliance focus."],
  ["What is importance of customer service in TPA?", "Directly impacts reputation and retention."],
  ["What defines a successful TPA company?", "Success depends on:", ["Compliance discipline", "Technology strength", "Service excellence"]]
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
      tags={[{ emoji: '🏥', label: 'IRDAI Health Services' }, { emoji: '📄', label: 'Claims & Cashless Administration' }, { emoji: '📋', label: 'Application & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Regulatory Services', href: '/regulatory' }, { label: 'Insurance', href: '/regulatory/insurance' }, { label: 'TPA License India' }]}
      title="TPA License India - Complete Guide to IRDAI Registration, Eligibility and Compliance"
      heroDescription={<><p><strong>TPA License India</strong> is a mandatory regulatory approval issued by the Insurance Regulatory and Development Authority of India for entities intending to act as Third Party Administrators in the health insurance ecosystem. TPAs sit between insurers, hospitals and policyholders, facilitating claims processing, cashless hospitalisation and health services management. Approval depends more on execution readiness than on documentation.</p><div className="flex flex-wrap gap-2 mt-5">{['IRDAI TPA Health Services Regulations', 'Rs. 4 Crore Capital', 'Company Structure Only', 'Qualified Principal Officer', 'Hospital Network Empanelment', 'Claims Management System', 'Health Data Confidentiality', 'Renewal & Audit Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for TPA License</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check TPA Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="33 min read"
      displayYear="2026"
      focusKeyword="TPA License India"
      sections={sections}
      ctaTitle="Plan Your TPA Application"
      ctaDescription="Discuss capital, object clause, Principal Officer, IT readiness, hospital network plan and the IRDAI filing."
      quickFacts={[{ label: 'Regulator', value: 'IRDAI' }, { label: 'Entity Type', value: 'Company only' }, { label: 'Minimum Capital', value: 'Rs. 4 Crore' }, { label: 'Principal Officer', value: 'Medical background' }, { label: 'IRDAI Review', value: '2-4 months' }]}
      relatedArticles={[
        { title: 'Insurance Broker Registration in India', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'The intermediary route, contrasted with the TPA service-provider role.' },
        { title: 'Corporate Agent Registration in India', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'IRDAI corporate agency registration for insurance distribution.' },
        { title: 'ISNP Registration', href: '/irdai/isnp-registration', category: 'IRDAI', description: 'IRDAI permission for selling insurance through a self-network platform.' }
      ]}
      finalCtaTitle="Build an Approval-Ready TPA Application"
      finalCtaDescription="Estabizz supports the full TPA licensing journey: object clause and capital structuring, Principal Officer and team planning, IT and claims-system readiness, business plan drafting, IRDAI filing, query handling and post-approval compliance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to IRDAI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for TPA License</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check TPA Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="TPA License India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Insurance Regulatory and Development Authority of India' },
          { title: 'Governing Regulation', body: 'IRDAI (Third Party Administrators - Health Services) Regulations' },
          { title: 'Supporting Framework', body: 'Companies Act, 2013, data privacy and IT security guidelines, and health insurance servicing norms' },
          { title: 'Eligible Entity Type', body: 'Only companies registered under the Companies Act may apply' },
          { title: 'Minimum Capital', body: 'Rs. 4 crore' },
          { title: 'Principal Officer', body: 'Qualified medical professional responsible for day-to-day operations' },
          { title: 'Foreign Investment', body: 'Foreign shareholding restrictions apply, as per IRDAI norms' },
          { title: 'Core Functions', body: 'Claims processing, cashless hospitalisation, policyholder support, hospital network management and medical record verification' },
          { title: 'Revenue Model', body: 'Service fees from insurers, per-policy administration charges and claims processing fees. TPAs do not sell insurance' },
          { title: 'Indicative Timeline', body: 'IRDAI review of roughly 2 to 4 months, with documentation ahead of it' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be confirmed against the applicant&rsquo;s shareholding structure, proposed service scope, technology architecture and the latest IRDAI TPA regulations and circulars applicable at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is a TPA License in India?">
        <DataTable headers={['Lens', 'What It Means']} rows={[
          ['In simple terms', 'A TPA License allows a company to act as a service provider for health insurance companies'],
          ['Legally speaking', 'A Third Party Administrator is governed under the IRDAI (Third Party Administrators - Health Services) Regulations'],
          ['Commercially', 'TPAs earn service fees rather than commission, because they administer rather than distribute']
        ]} />
        <h3>Core Functions</h3>
        <CheckList items={['Health insurance claims processing', 'Cashless hospitalisation facilitation', 'Policyholder support services', 'Hospital network management', 'Medical record verification']} />
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Instrument', 'Relevance']} rows={[
          ['IRDAI (TPA - Health Services) Regulations', 'The primary registration and conduct framework'],
          ['Companies Act, 2013', 'Constitution of the applicant, which must be a company'],
          ['Data privacy and IT security guidelines', 'Handling of sensitive medical and financial data'],
          ['Health insurance servicing norms', 'Service standards owed to insurers and policyholders']
        ]} />
        <p>As per applicable regulatory guidelines, only companies can apply, foreign shareholding restrictions apply, and strict governance and audit controls are required.</p>
      </Section>

      <Section id="who-needs" title="Who Requires a TPA License in India?">
        <CheckList items={['Health service management companies', 'Insurance support service providers', 'Healthcare administration firms', 'Claims processing companies', 'Digital health platforms acting as intermediaries']} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for TPA License India">
        <DataTable headers={['Particulars', 'Requirement']} rows={[
          ['Entity Type', 'Company registered under the Companies Act'],
          ['Minimum Capital', 'Rs. 4 crore'],
          ['Directors', 'Fit and proper criteria'],
          ['Principal Officer', 'Qualified medical professional'],
          ['Infrastructure', 'IT systems and operational setup'],
          ['Foreign Investment', 'As per IRDAI norms']
        ]} />
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Criteria: Critical for Approval">
        <p>All directors, promoters and key managerial personnel must satisfy the fit and proper criteria as per IRDAI expectations. This includes evaluation of:</p>
        <CheckList items={['Integrity and reputation', 'Financial soundness', 'Absence of criminal record', 'No regulatory violations', 'Professional competence']} />
        <div className="warning-box"><strong>Important:</strong> even one non-compliant director can delay or cause rejection of the application.</div>
      </Section>

      <Section id="principal-officer" title="Principal Officer Requirement (Very Important)">
        <p>A TPA must appoint a Principal Officer who is responsible for day-to-day operations.</p>
        <CheckList items={['Background in the medical field, preferred', 'Relevant experience in insurance or health services', 'Ability to manage claims and hospital coordination']} />
      </Section>

      <Section id="hr-planning" title="Human Resource Planning for a TPA">
        <DataTable headers={['Role', 'Responsibility']} rows={[
          ['Principal Officer', 'Overall operations'],
          ['Medical Team', 'Claim evaluation'],
          ['Claims Team', 'Processing'],
          ['IT Team', 'System management'],
          ['Compliance Officer', 'Regulatory adherence']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required for TPA License India">
        <DataTable headers={['Category', 'Documents']} rows={[
          ['Corporate', 'Certificate of Incorporation, MOA, AOA'],
          ['Directors', 'KYC, qualifications, declarations'],
          ['Financial', 'Net worth certificate, audited financials'],
          ['Business Plan', '3-5 year projections'],
          ['Infrastructure', 'IT systems details'],
          ['Compliance', 'Fit and proper declarations']
        ]} />
      </Section>

      <Section id="moa-drafting" title="Drafting the MOA: Critical Yet Ignored">
        <p>Legally speaking, the Memorandum of Association must explicitly permit:</p>
        <CheckList items={['Third Party Administration services', 'Health insurance support services', 'Claims management activities']} />
        <div className="warning-box"><strong>Common mistake:</strong> generic object clauses lead to IRDAI objections and a delayed approval. Misalignment between the MOA object clause and the actual TPA activity is one of the most frequently missed compliance risks.</div>
      </Section>

      <Section id="evaluation" title="What IRDAI Actually Evaluates">
        <p>IRDAI does not grant a TPA License based only on documentation. It evaluates the overall capability of the applicant to operate responsibly in the healthcare ecosystem.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Promoter Background', body: <ul className="!mb-0"><li>Financial credibility</li><li>Past regulatory track record</li><li>No adverse findings</li></ul> },
          { title: 'Business Viability', body: <ul className="!mb-0"><li>Sustainable revenue model</li><li>Realistic projections</li><li>Tie-up strategy with insurers</li></ul> },
          { title: 'Operational Readiness', body: <ul className="!mb-0"><li>Claims processing workflow</li><li>Hospital onboarding capability</li><li>Customer support structure</li></ul> },
          { title: 'Technology Infrastructure', body: <ul className="!mb-0"><li>Secure data handling</li><li>Claims management system</li><li>Integration capability with insurers</li></ul> },
          { title: 'Governance Structure', body: <ul className="!mb-0"><li>Board oversight</li><li>Internal audit framework</li><li>Compliance reporting system</li></ul> },
          { title: 'Continuous Expectations', body: <ul className="!mb-0"><li>Strong board-level monitoring</li><li>Clear reporting to insurers</li><li>Quick grievance resolution</li><li>Secure and scalable IT</li><li>Qualified medical professionals onboard</li></ul> }
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Process for TPA License India">
        <Timeline steps={[
          { title: 'Incorporate a company with the appropriate object clause', body: 'The MOA must expressly permit third party administration, health insurance support and claims management activities.' },
          { title: 'Arrange minimum capital and infrastructure', body: 'Rs. 4 crore capital infused, with IT systems and operational setup in place.' },
          { title: 'Appoint the Principal Officer and key personnel', body: 'Medical, claims, IT and compliance roles defined and filled before filing.' },
          { title: 'Prepare the application with documents', body: 'Corporate, director, financial, business plan, infrastructure and compliance document sets.' },
          { title: 'Submit the application to IRDAI', body: 'File a complete, internally consistent dossier with no contradictions across submissions.' },
          { title: 'Respond to IRDAI queries', body: 'Most delays happen at this stage. Prepare responses and supporting justifications before filing.' },
          { title: 'Obtain approval and commence operations', body: 'Activate hospital empanelment, claims workflows and reporting systems.' }
        ]} />
      </Section>

      <Section id="review-stages" title="How IRDAI Reviews Your Application (Real Insight)">
        <DataTable headers={['Stage', 'Focus']} rows={[
          ['Stage 1: Preliminary Scrutiny', 'Completeness of application and basic eligibility check'],
          ['Stage 2: Detailed Evaluation', 'Business model viability, promoter credibility and IT infrastructure'],
          ['Stage 3: Clarification Round', 'Queries raised on gaps, additional documents requested'],
          ['Stage 4: Final Decision', 'Approval, rejection or further review']
        ]} />
      </Section>

      <Section id="application-strategy" title="End-to-End Application Strategy (What Actually Works)">
        <p>A successful application is not about submitting forms. It is about presenting a complete, regulator-ready business case.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Clarity of Purpose', body: <ul className="!mb-0"><li>Define the exact role in the health insurance ecosystem</li><li>Avoid vague or generic business models</li></ul> },
          { title: 'Structured Documentation', body: <ul className="!mb-0"><li>Every document must align with business intent</li><li>No inconsistencies across submissions</li></ul> },
          { title: 'Regulatory Mapping', body: <ul className="!mb-0"><li>Map each requirement to IRDAI expectations</li><li>Pre-empt possible queries</li></ul> },
          { title: 'Query Handling Readiness', body: <ul className="!mb-0"><li>Prepare responses before filing</li><li>Maintain supporting justifications</li></ul> }
        ]} />
      </Section>

      <Section id="fees" title="Fees for TPA License India">
        <DataTable headers={['Type', 'Amount']} rows={[
          ['Application Fee', 'As prescribed by IRDAI'],
          ['Registration Fee', 'As applicable'],
          ['Renewal Fee', 'Periodic']
        ]} />
      </Section>

      <Section id="timeline" title="Timeline for TPA License India">
        <DataTable headers={['Stage', 'Timeline']} rows={[
          ['Documentation', '2-4 weeks'],
          ['IRDAI Review', '2-4 months'],
          ['Approval', 'Depends on compliance']
        ]} />
      </Section>

      <Section id="operational-workflow" title="End-to-End Workflow of a TPA">
        <Flow items={['Policyholder raises claim', 'TPA verifies policy details', 'Hospital coordination initiated', 'Medical evaluation conducted', 'Claim processed', 'Insurer approval taken', 'Settlement completed']} />
      </Section>

      <Section id="hospital-network" title="Hospital Network Management: Core TPA Function">
        <p>In simple terms, a TPA&rsquo;s strength depends on its hospital network.</p>
        <CheckList items={['Empanelment of hospitals', 'Rate negotiation', 'Service quality monitoring', 'Cashless claim coordination']} />
      </Section>

      <Section id="technology" title="Technology Stack and IT Compliance">
        <p>TPAs handle sensitive medical and financial data, so technology readiness is assessed as seriously as paperwork.</p>
        <h3>What IRDAI Expects</h3>
        <CheckList items={['Claims management software', 'Hospital integration APIs', 'Secure databases', 'Real-time tracking systems']} />
        <h3>Mandatory IT Expectations</h3>
        <CheckList items={['Secure server infrastructure', 'Data encryption systems', 'Audit trails for claims', 'Backup and disaster recovery', 'Controlled access mechanisms']} />
        <div className="warning-box"><strong>Regulatory risk:</strong> a data breach can lead to licence suspension, financial penalties and reputational damage.</div>
      </Section>

      <Section id="business-model" title="Business Model: How TPAs Earn">
        <CheckList items={['Service fees from insurers', 'Per policy administration charges', 'Claims processing fees', 'Value-added healthcare services']} />
      </Section>

      <Section id="comparison" title="TPA vs Insurance Broker vs Corporate Agent">
        <DataTable headers={['Particulars', 'TPA', 'Insurance Broker', 'Corporate Agent']} rows={[
          ['Role', 'Service provider', 'Intermediary', 'Distributor'],
          ['Sell Insurance', 'No', 'Yes', 'Yes'],
          ['Claims Handling', 'Yes', 'Limited', 'Limited'],
          ['Regulator', 'IRDAI', 'IRDAI', 'IRDAI'],
          ['Revenue Model', 'Service fee', 'Commission', 'Commission']
        ]} />
        <p>Businesses comparing routes should read this alongside <Link href="/irdai/insurance-broker-registration-in-india">Insurance Broker Registration</Link> and <Link href="/irdai/corporate-agent-registration-in-india">Corporate Agent Registration</Link>.</p>
      </Section>

      <Section id="vs-healthtech" title="TPA License vs Health-Tech Platform">
        <DataTable headers={['Aspect', 'TPA License', 'Health-Tech Platform']} rows={[
          ['Regulation', 'IRDAI', 'Limited'],
          ['Data Handling', 'Highly regulated', 'Moderate'],
          ['Role', 'Service intermediary', 'Platform'],
          ['Risk', 'High compliance', 'Moderate']
        ]} />
      </Section>

      <Section id="case-study" title="Case-Based Understanding (Practical Example)">
        <div className="info-box"><p><strong>Scenario:</strong> a startup wants to manage hospital billing and claims digitally.</p><p className="!mb-0"><strong>Without a TPA License:</strong> it cannot legally process claims and cannot act on behalf of an insurer. The technology may be ready, but the regulatory permission is the gating factor.</p></div>
      </Section>

      <Section id="when-strategic" title="When a TPA License Becomes Strategic">
        <CheckList items={['You are entering health-tech or insurtech', 'You want to build hospital network integration', 'You aim to serve insurers at the backend level', 'You want recurring service-based revenue']} />
      </Section>

      <Section id="post-registration" title="Post-Registration Compliance">
        <CheckList items={['Periodic IRDAI reporting', 'Data protection and confidentiality', 'Service level standards', 'Audit requirements', 'Renewal compliance']} />
      </Section>

      <Section id="advanced-compliance" title="Advanced Compliance Framework">
        <p>Once a company obtains a TPA License, IRDAI expects continuous adherence to a structured governance and compliance ecosystem.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Operational Governance', body: <ul className="!mb-0"><li>Board oversight on service quality</li><li>Defined SOPs for claims processing</li></ul> },
          { title: 'Data Protection and IT Compliance', body: <ul className="!mb-0"><li>Secure handling of patient medical records</li><li>Compliance with health data confidentiality norms</li><li>Cybersecurity framework implementation</li></ul> },
          { title: 'Service Level Agreements', body: <ul className="!mb-0"><li>Timely claim processing</li><li>Defined turnaround time for approvals</li><li>Hospital coordination efficiency</li></ul> },
          { title: 'Internal Controls', body: <ul className="!mb-0"><li>Risk management framework</li><li>Internal audit systems</li><li>Fraud detection mechanisms</li></ul> }
        ]} />
      </Section>

      <Section id="grievance" title="Grievance Redressal Mechanism">
        <p>TPAs must maintain a robust complaint handling system, which must include:</p>
        <CheckList items={['Dedicated grievance officer', 'Defined response timelines', 'Escalation matrix', 'Reporting to insurers and IRDAI']} />
      </Section>

      <Section id="audit-reporting" title="Internal Audit and Reporting Requirements">
        <CheckList items={['Conduct periodic internal audits', 'Submit compliance reports', 'Maintain transaction transparency', 'Ensure fraud prevention controls']} />
      </Section>

      <Section id="renewal" title="Renewal and Continuity of TPA License India">
        <DataTable headers={['Particulars', 'Details']} rows={[
          ['Validity', 'As per IRDAI norms'],
          ['Renewal Requirement', 'Mandatory'],
          ['Review Factors', 'Compliance track record'],
          ['Risk', 'Non-renewal on violations']
        ]} />
      </Section>

      <Section id="penalties" title="Penalties and Regulatory Action">
        <CheckList items={['Monetary penalties', 'Suspension of operations', 'Cancellation of licence', 'Blacklisting']} />
        <div className="warning-box">IRDAI scrutiny is high because TPAs deal with sensitive health data, policyholder claims, hospital coordination and financial transactions. Compliance standards are strict and non-negotiable.</div>
      </Section>

      <Section id="challenges" title="Practical Challenges and Hidden Risks">
        <h3>Practical Challenges</h3>
        <CheckList items={['Incomplete documentation', 'Weak business model articulation', 'Lack of experienced manpower', 'Underestimation of IT infrastructure requirements', 'Poor understanding of IRDAI queries']} />
        <h3>Hidden Compliance Risks Most Applicants Miss</h3>
        <CheckList items={['Misalignment between MOA object clause and TPA activity', 'Non-compliance with data confidentiality norms', 'Lack of a medical advisory structure', 'Weak hospital network planning', 'Inadequate grievance redressal mechanism']} />
        <div className="info-box">From industry experience, most delays happen at the IRDAI query stage. Weak documentation leads to multiple rounds of clarification, and a lack of clarity in the business model raises red flags.</div>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in TPA License Applications">
        <CheckList items={['Inadequate capital planning', 'Weak business model submission', 'Non-qualified Principal Officer', 'Poor IT infrastructure readiness', 'Lack of compliance documentation']} />
        <div className="warning-box">Many TPAs also fail after licensing because the focus is only on revenue while compliance systems stay weak. Compliance strength is what makes the business sustainable.</div>
      </Section>

      <Section id="checklist" title="Pre-Application Checklist">
        <h3>Before Applying</h3>
        <CheckList items={['Company incorporation completed', 'Rs. 4 crore capital infused', 'Principal Officer appointed', 'IT systems ready', 'Business plan structured', 'Compliance documentation prepared']} />
        <h3>Checklist for Faster IRDAI Approval</h3>
        <CheckList items={['Strong and clear business model', 'Properly drafted MOA objects', 'Qualified Principal Officer', 'IT infrastructure readiness', 'Clean promoter background', 'Detailed application drafting']} />
      </Section>

      <Section id="scalability" title="Scalability Opportunities After the Licence">
        <CheckList items={['Digital health platforms', 'AI-based claims processing', 'Health analytics', 'Preventive healthcare services']} />
      </Section>

      <Section id="future-outlook" title="Future Outlook of TPA License India">
        <CheckList items={['Rising health insurance penetration', 'Digital healthcare ecosystem growth', 'Increased reliance on TPAs', 'Integration with AI and data analytics']} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with TPA Licensing">
        <p>From a professional execution standpoint, we do not just file applications. We build approval-ready structures.</p>
        <CheckList items={['Aligning the business model with regulatory expectations', 'Object clause and capital structuring', 'Principal Officer and team planning', 'IT and claims-system readiness review', 'Business plan and documentation drafting', 'Preparing for IRDAI queries in advance', 'End-to-end compliance readiness after approval']} />
        <div className="info-box">From our practical experience: a TPA License is not just a licence, it is a full-scale operational setup. Approval depends more on execution readiness than documentation, and early planning reduces IRDAI objections significantly.</div>
      </Section>

      <Section id="faqs" title="FAQs on TPA License India">
        <p>{faqs.length} questions covering eligibility, capital, Principal Officer requirements, documents, process, fees, timeline, operations, compliance, penalties and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h3>Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: IRDAI, RBI, SEBI and IFSCA frameworks, insurance intermediary and health services licensing, TPA registration, governance and IT compliance documentation, and post-approval regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help health service companies, claims processing firms, healthcare administration businesses and digital health platforms understand the IRDAI framework for Third Party Administrator registration in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, medical or financial advice. IRDAI TPA regulations, capital requirements, fee amounts, Principal Officer qualification norms, foreign shareholding limits, service level expectations and renewal requirements may change from time to time. Applicants should verify the latest IRDAI regulations and circulars before filing any TPA application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our IRDAI Compliance Expert">
        <p>Structure the entity, capital, team and technology so the application presents a complete, regulator-ready business case rather than a set of forms.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to IRDAI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Apply for TPA License</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check TPA Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
