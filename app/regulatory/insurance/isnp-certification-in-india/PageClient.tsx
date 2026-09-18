'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'ISNP Certification: Quick Overview' },
  { id: 'what-is', title: 'What is ISNP Certification?' },
  { id: 'scope', title: 'What ISNP Certification Covers in Detail' },
  { id: 'regulatory-framework', title: 'Regulatory Framework Around ISNP' },
  { id: 'regulatory-linkages', title: 'Sector Regulator Linkages' },
  { id: 'who-needs', title: 'Who Needs ISNP Certification?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'evaluation-areas', title: 'Core Components Evaluated' },
  { id: 'process', title: 'Step-by-Step Certification Process' },
  { id: 'fees', title: 'Certification Fees' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'governance', title: 'Internal Governance Requirements' },
  { id: 'internal-controls', title: 'Internal Control Systems Expected' },
  { id: 'gap-analysis', title: 'Real Compliance Gap Analysis' },
  { id: 'regulator-evaluation', title: 'How Regulators Indirectly Evaluate It' },
  { id: 'vendor-risk', title: 'Vendor and Third-Party Risk Management' },
  { id: 'risk-classification', title: 'Risk-Based Classification' },
  { id: 'data-protection-laws', title: 'Integration with Data Protection Laws' },
  { id: 'consequences', title: 'Consequences of Weak Cyber Compliance' },
  { id: 'vs-other-certifications', title: 'ISNP vs Other Cybersecurity Certifications' },
  { id: 'business-impact', title: 'How ISNP Certification Impacts Operations' },
  { id: 'post-certification', title: 'Post-Certification Compliance' },
  { id: 'renewal', title: 'Renewal and Continuous Compliance' },
  { id: 'compliance-risks', title: 'Practical Compliance Risks' },
  { id: 'red-flags', title: 'Red Flags That Lead to Rejection' },
  { id: 'common-mistakes', title: 'Common Mistakes to Avoid' },
  { id: 'strategic-advantage', title: 'Strategic Advantage of ISNP Certification' },
  { id: 'future-outlook', title: 'Future Outlook' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our Compliance Expert' }
];

const faqs = ([
  ["What is ISNP Certification in India?", "ISNP Certification validates that an organisation follows structured network security and cybersecurity protocols. It demonstrates system-level compliance and data protection readiness."],
  ["Why is ISNP Certification important?", "It is important because it ensures data security, builds client trust, and supports regulatory compliance. It also reduces cyber risk exposure."],
  ["Is ISNP Certification mandatory in India?", "No, it is not universally mandatory. However, it becomes essential in regulated sectors and high-risk digital operations."],
  ["Who issues ISNP Certification?", "It is issued by authorised certification bodies or recognised agencies based on cybersecurity frameworks and audit standards."],
  ["What does ISNP Certification cover?", "It covers:", ["Network security", "Data protection", "Access control", "Incident response systems"]],
  ["Is ISNP Certification similar to ISO 27001?", "No, both are different. ISO 27001 focuses on overall information security, while ISNP focuses more on network-level controls."],
  ["Can startups apply for ISNP Certification?", "Yes, startups can apply if they have proper IT infrastructure and compliance readiness."],
  ["Does ISNP Certification improve credibility?", "Yes, it significantly enhances credibility with clients, investors, and regulators."],
  ["Is ISNP Certification required for fintech companies?", "It is highly recommended for fintech companies due to strict regulatory scrutiny."],
  ["How long is ISNP Certification valid?", "Typically, it is valid for 1–3 years depending on the issuing authority."],
  ["What is the main objective of ISNP Certification?", "The objective is to ensure secure handling of digital infrastructure and sensitive data."],
  ["Does ISNP Certification include cybersecurity testing?", "Yes, it usually includes vulnerability assessment and system testing."],
  ["Is ISNP Certification recognised internationally?", "Recognition depends on the issuing body and framework used."],
  ["Can small businesses apply for ISNP Certification?", "Yes, provided they meet basic compliance and infrastructure requirements."],
  ["Does ISNP Certification cover cloud systems?", "Yes, if cloud infrastructure is part of operations."],
  ["Is training required for ISNP Certification?", "Yes, employee awareness and training are essential components."],
  ["What industries benefit most from ISNP Certification?", "Key industries include:", ["Fintech", "SaaS", "IT services", "Insurance"]],
  ["Is ISNP Certification a one-time process?", "No, it requires continuous compliance and periodic renewal."],
  ["Who needs ISNP Certification in India?", "Entities handling sensitive data or digital systems, especially in fintech, IT, and SaaS sectors."],
  ["Is ISNP Certification required for NBFCs?", "It is not mandatory but strongly recommended under RBI cybersecurity expectations."],
  ["Can LLPs apply for ISNP Certification?", "Yes, LLPs with proper IT systems can apply."],
  ["Is there a minimum turnover requirement?", "No, there is no fixed turnover requirement."],
  ["Do freelancers need ISNP Certification?", "Generally no, unless handling high-risk or enterprise data."],
  ["Is ISNP Certification required for government tenders?", "In many cases, yes, especially for IT or digital service vendors."],
  ["Can foreign companies operating in India apply?", "Yes, if they have operations or systems within India."],
  ["Is prior ISO certification required?", "No, but it strengthens your application."],
  ["Do SaaS platforms need ISNP Certification?", "Yes, especially if they manage client data."],
  ["Is it applicable to payment aggregators?", "Yes, due to data sensitivity and regulatory expectations."],
  ["Can early-stage startups apply?", "Yes, but they must meet compliance readiness."],
  ["Is IT infrastructure mandatory?", "Yes, a secure IT setup is essential."],
  ["Do insurance brokers need ISNP Certification?", "It is recommended under IRDAI cybersecurity guidelines."],
  ["Is ISNP Certification applicable to outsourcing companies?", "Yes, especially if they process client data."],
  ["Can a company apply without a dedicated IT team?", "No, technical expertise is required."],
  ["Is it applicable to cloud-based businesses?", "Yes, cloud systems must comply with security standards."],
  ["Does business size affect eligibility?", "No, compliance readiness matters more than size."],
  ["Can a company apply during operations or only at startup stage?", "It can apply at any stage."],
  ["What is the process for ISNP Certification?", "The process includes:", ["Gap analysis", "Documentation", "Implementation", "Audit", "Certification"]],
  ["Is gap analysis mandatory?", "Yes, it helps identify compliance deficiencies."],
  ["Can the process be done online?", "Partially, but audits may require verification."],
  ["How is the audit conducted?", "Through technical evaluation and system testing."],
  ["Is third-party audit required?", "Yes, certification requires independent audit."],
  ["Can the process be fast-tracked?", "Yes, if systems are already compliant."],
  ["What happens during certification audit?", "Systems, policies, and controls are verified."],
  ["Is physical inspection required?", "Sometimes, depending on the authority."],
  ["Can consultants assist in the process?", "Yes, professional support simplifies certification."],
  ["Is application rejection possible?", "Yes, if compliance gaps are found."],
  ["Can rejected applications be refiled?", "Yes, after correcting deficiencies."],
  ["Are multiple audits required?", "Sometimes, depending on complexity."],
  ["Can documentation be standardised?", "No, it must match actual systems."],
  ["Is implementation mandatory before audit?", "Yes, systems must be operational."],
  ["Can certification be obtained without audit?", "No, audit is mandatory."],
  ["What is the role of management in certification?", "Management must approve and support compliance."],
  ["Is internal audit required before application?", "Yes, it improves success chances."],
  ["Can certification be cancelled after approval?", "Yes, if compliance is not maintained."],
  ["What documents are required for ISNP Certification?", "Key documents include:", ["Incorporation certificate", "IT architecture", "Security policies"]],
  ["Is cybersecurity policy mandatory?", "Yes, it is a core requirement."],
  ["Do we need data protection policy?", "Yes, especially for data-driven businesses."],
  ["Are audit reports required?", "Yes, if available, they support the application."],
  ["Is employee data required?", "Yes, to validate technical capability."],
  ["Do we need network diagrams?", "Yes, for system validation."],
  ["Is access control documentation required?", "Yes, it is critical for compliance."],
  ["Are logs and reports required?", "Yes, for audit verification."],
  ["Is incident response plan mandatory?", "Yes, it is a key compliance requirement."],
  ["Do we need vendor agreements?", "Yes, for third-party risk management."],
  ["Is board approval required?", "In structured organisations, yes."],
  ["Is system documentation required?", "Yes, it must align with operations."],
  ["Do we need backup policies?", "Yes, for data recovery assurance."],
  ["Are SOPs required?", "Yes, standard operating procedures are essential."],
  ["What is the cost of ISNP Certification?", "It varies based on system size and audit scope."],
  ["Is government fee fixed?", "No, it depends on certification authority."],
  ["What are audit charges?", "Charges depend on complexity and infrastructure."],
  ["Is renewal charge applicable?", "Yes, periodic renewal fees apply."],
  ["Are consultancy fees involved?", "Yes, if professional assistance is taken."],
  ["Is certification expensive?", "It is moderate but offers high value."],
  ["Can cost be reduced?", "Yes, by preparing systems internally."],
  ["Are hidden costs involved?", "No, but additional audits may increase cost."],
  ["Does cost depend on company size?", "Yes, larger systems require higher audit effort."],
  ["Is there a penalty fee?", "Only if non-compliance is detected."],
  ["Is certification a one-time cost?", "No, maintenance and renewal costs apply."],
  ["Is cost justified?", "Yes, due to risk reduction and credibility."],
  ["How long does ISNP Certification take?", "Typically 4–8 weeks."],
  ["Can it be completed in 1 month?", "Yes, if systems are ready."],
  ["What delays certification?", "", ["Poor documentation", "System gaps", "Audit failures"]],
  ["Is approval guaranteed?", "No, it depends on compliance."],
  ["How long is audit duration?", "Usually 1–2 weeks."],
  ["Can approval be delayed?", "Yes, due to compliance issues."],
  ["Is fast-track approval possible?", "Yes, with strong preparation."],
  ["What is the longest timeline?", "Up to 3 months in complex cases."],
  ["Does audit timing affect approval?", "Yes, incomplete audits delay approval."],
  ["Can certification be revoked later?", "Yes, if compliance lapses."],
  ["Is timeline fixed?", "No, it varies case by case."],
  ["Can re-audit delay approval?", "Yes, significantly."],
  ["Is internal audit helpful?", "Yes, it reduces delays."],
  ["When does certification become effective?", "After final approval."],
  ["What are post-certification compliances?", "", ["Periodic audits", "Policy updates", "Monitoring systems"]],
  ["Is renewal mandatory?", "Yes, after validity period."],
  ["Are audits required after certification?", "Yes, periodic audits are expected."],
  ["Is employee training required?", "Yes, ongoing awareness is necessary."],
  ["Do policies need updates?", "Yes, as per regulatory changes."],
  ["Is incident reporting mandatory?", "Yes, under applicable guidelines."],
  ["Can certification be suspended?", "Yes, for non-compliance."],
  ["Is data protection ongoing responsibility?", "Yes, continuously."],
  ["Are logs required to be maintained?", "Yes, for audit purposes."],
  ["Is vendor monitoring required?", "Yes, under risk management."],
  ["Is system upgrade required?", "Yes, periodically."],
  ["Does certification require governance structure?", "Yes, defined roles are needed."],
  ["Is compliance officer required?", "Recommended for structured entities."],
  ["Can compliance be outsourced?", "Yes, but responsibility remains internal."],
  ["Is continuous monitoring required?", "Yes, it is critical."],
  ["Are internal audits compulsory?", "Yes, for long-term compliance."],
  ["Is documentation required post-certification?", "Yes, it must be maintained."],
  ["Can certification lapse?", "Yes, if renewal is not done."],
  ["What happens if ISNP Certification is not obtained?", "Increased risk and loss of credibility."],
  ["Are there penalties for non-compliance?", "Yes, under applicable regulations."],
  ["Can regulators take action?", "Yes, especially in regulated sectors."],
  ["Is data breach a risk?", "Yes, without proper controls."],
  ["Can license be affected?", "Yes, indirectly."],
  ["Is reputational risk involved?", "Yes, significantly."],
  ["Can certification be revoked?", "Yes, for serious violations."],
  ["Are cyber attacks more likely without certification?", "Yes, due to weak controls."],
  ["Can clients reject uncertified companies?", "Yes, especially enterprise clients."],
  ["Is non-compliance a legal issue?", "Yes, in certain sectors."],
  ["Can penalties be financial?", "Yes, depending on laws."],
  ["Does it impact investor confidence?", "Yes, negatively."],
  ["Can business operations be restricted?", "Yes, in regulated environments."],
  ["Is risk high without certification?", "Yes, especially for digital businesses."],
  ["Can I operate without ISNP Certification?", "Yes, but it increases compliance risk."],
  ["Can I get certification without IT infrastructure?", "No, infrastructure is mandatory."],
  ["Can I outsource cybersecurity?", "Yes, but accountability remains with you."],
  ["Can one certification cover all branches?", "Yes, if systems are integrated."],
  ["Can I apply during scaling stage?", "Yes, it is recommended."],
  ["Can certification help in funding?", "Yes, it improves investor trust."],
  ["Can I use templates for policies?", "No, they must be customised."],
  ["Can I skip internal audit?", "No, it increases rejection risk."],
  ["Can small SaaS companies apply?", "Yes, if compliant."],
  ["Can certification help in tenders?", "Yes, it improves eligibility."],
  ["Can I operate globally with ISNP?", "Yes, depending on recognition."],
  ["Can certification improve valuation?", "Yes, indirectly."],
  ["How does ISNP Certification align with RBI cybersecurity framework?", "It supports system security, data protection, and risk management expectations under RBI guidelines."],
  ["Can ISNP Certification replace regulatory compliance?", "No, it complements but does not replace regulatory requirements."],
  ["Is ISNP Certification useful for DPDP compliance?", "Yes, it supports data protection practices."],
  ["Does ISNP Certification cover vendor risk management?", "Yes, it includes third-party controls."],
  ["Is penetration testing mandatory?", "Yes, in most cases."],
  ["Can ISNP Certification help in global expansion?", "Yes, it improves credibility."],
  ["How does certification impact due diligence?", "It improves compliance perception and reduces risk."],
  ["Is continuous compliance required?", "Yes, it is mandatory."],
  ["Can certification reduce regulatory scrutiny?", "Yes, it demonstrates preparedness."],
  ["What is the biggest compliance risk in ISNP?", "Mismatch between policy and implementation."],
  ["Is ISNP Certification future-proof?", "It supports evolving compliance frameworks."],
  ["What is the key success factor for ISNP Certification?", "Strong implementation with real system controls."]
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
      tags={[{ emoji: '🔐', label: 'Cybersecurity Certification' }, { emoji: '🧪', label: 'Audit & Evidence Driven' }, { emoji: '📋', label: 'Gap Analysis & Documentation' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Regulatory Services', href: '/regulatory' }, { label: 'ISNP Certification' }]}
      title="ISNP Certification in India - Complete Guide, Eligibility, Process and Compliance Insights"
      heroDescription={<><p><strong>ISNP Certification in India</strong> is a specialised recognition framework for organisations dealing with network security protocols, particularly in regulated or sensitive digital environments. It reflects compliance with structured security standards and operational integrity expectations, and is increasingly essential not just for regulatory alignment but for building credibility with clients, investors and government bodies.</p><div className="flex flex-wrap gap-2 mt-5">{['Network Security Architecture', 'Data Protection Mechanisms', 'Cyber Risk Mitigation', 'Access Control Systems', 'Incident Response', 'Vulnerability Assessment', 'Periodic Audits', 'DPDP Alignment'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Start a Gap Assessment</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check Certification Readiness</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="30 min read"
      displayYear="2026"
      focusKeyword="ISNP Certification in India"
      sections={sections}
      ctaTitle="Get Certification Ready"
      ctaDescription="Discuss gap assessment, policy documentation, security controls, audit coordination and renewal planning."
      quickFacts={[{ label: 'Nature', value: 'Certification' }, { label: 'Mandatory', value: 'Not universally' }, { label: 'Focus', value: 'Network controls' }, { label: 'Validity', value: '1-3 years' }, { label: 'Timeline', value: '4-8 weeks' }]}
      relatedArticles={[
        { title: 'Insurance Repository Registration in India', href: '/regulatory/insurance/insurance-repository-registration-in-india', category: 'IRDAI', description: 'An IRDAI framework where cybersecurity readiness is the deciding approval factor.' },
        { title: 'LendTech Services India', href: '/rbi/lendtech-services', category: 'RBI', description: 'Digital lending data protection, localisation and audit-trail requirements.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'Consent-based data sharing under the RBI Account Aggregator framework.' }
      ]}
      finalCtaTitle="Build Certification Readiness That Survives an Audit"
      finalCtaDescription="Estabizz helps identify compliance gaps, structure cybersecurity and data protection documentation, implement the control environment, coordinate audits and maintain the certification through its renewal cycle."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to a Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Start a Gap Assessment</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check Certification Readiness</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="ISNP Certification in India: Quick Overview">
        <div className="info-box"><strong>Terminology note:</strong> in the insurance sector the abbreviation ISNP is also used for the IRDAI Insurance Self-Network Platform, which is a different framework covering online insurance sales. This page covers ISNP Certification as a network-security and cybersecurity credential. For the IRDAI e-commerce platform permission, see <Link href="/irdai/isnp-registration">ISNP Registration</Link>.</div>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Nature of the Credential', body: 'A certification confirming that an organisation follows strong cybersecurity and network protection standards' },
          { title: 'Issued By', body: 'Authorised certification bodies or recognised agencies, based on cybersecurity frameworks and audit standards' },
          { title: 'Mandatory?', body: 'Not universally mandatory, but it becomes essential in regulated sectors and high-risk digital operations' },
          { title: 'Primary Focus', body: 'Network-level controls, as distinct from ISO 27001, which focuses on overall information security' },
          { title: 'Governing Context', body: 'Not always governed by a single statute. Relevance connects to the IT Act, 2000, CERT-In guidelines and sector regulator frameworks' },
          { title: 'Typical Validity', body: '1 to 3 years, depending on the issuing authority' },
          { title: 'Indicative Timeline', body: 'Approximately 4 to 8 weeks end to end' },
          { title: 'Evaluation Basis', body: 'Evidence-based, system-driven validation rather than policy documents alone' }
        ]} />
        <div className="warning-box">These details are indicative and vary by issuing body and framework. Requirements should be confirmed with the chosen certification authority, and against the sector regulator norms that apply to the organisation, before committing to an implementation plan.</div>
      </Section>

      <Section id="what-is" title="What is ISNP Certification?">
        <DataTable headers={['Lens', 'What It Means']} rows={[
          ['In simple terms', 'ISNP Certification confirms that your organisation follows strong cybersecurity and network protection standards'],
          ['From a compliance perspective', 'It demonstrates adherence to structured digital security protocols and risk management systems'],
          ['Legally speaking', 'It acts as a supporting compliance credential aligned with data protection and cybersecurity expectations under applicable laws']
        ]} />
      </Section>

      <Section id="scope" title="What ISNP Certification Covers in Detail">
        <CheckList items={['Network security architecture', 'Data protection mechanisms', 'Cyber risk mitigation', 'System monitoring and control']} />
        <p>Unlike generic IT certifications, ISNP is more aligned with compliance-driven security frameworks, where organisations must demonstrate:</p>
        <CheckList items={['Documented policies', 'Incident response mechanisms', 'Access control systems', 'Periodic audits']} />
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework Around ISNP Certification">
        <p>While ISNP itself may not always be governed under a single statute, its relevance is strongly connected with:</p>
        <DataTable headers={['Framework', 'Relevance']} rows={[
          ['Information Technology Act, 2000', 'Baseline statutory obligations for digital systems'],
          ['CERT-In Guidelines', 'Incident reporting and cybersecurity directions'],
          ['Data protection and privacy frameworks, India and global', 'Handling, storage and sharing of personal data'],
          ['Sector-specific regulations: RBI, SEBI, IRDAI, IFSCA', 'Cybersecurity expectations imposed on regulated entities']
        ]} />
        <div className="warning-box">Under the relevant provisions, failure to maintain adequate cybersecurity systems may expose entities to penalties, data breaches and reputational risks.</div>
      </Section>

      <Section id="regulatory-linkages" title="Sector Regulator Linkages">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'RBI, for NBFCs and fintechs', body: <ul className="!mb-0"><li>Cyber Security Framework for NBFCs</li><li>IT Governance and Risk Management Directions</li></ul> },
          { title: 'SEBI, for intermediaries', body: <ul className="!mb-0"><li>Cybersecurity and Cyber Resilience Framework</li><li>System audit requirements</li></ul> },
          { title: 'IRDAI, for insurers and brokers', body: <ul className="!mb-0"><li>Information and Cyber Security Guidelines</li></ul> },
          { title: 'IFSCA, for IFSC entities', body: <ul className="!mb-0"><li>Technology Governance and Cyber Risk norms</li></ul> }
        ]} />
        <p>All these frameworks emphasise data confidentiality, system integrity, availability of infrastructure and incident reporting. ISNP Certification acts as a supporting compliance layer, helping organisations demonstrate readiness across these regulatory expectations.</p>
      </Section>

      <Section id="who-needs" title="Who Needs ISNP Certification?">
        <CheckList items={['Fintech companies', 'NBFCs and digital lenders', 'Insurance platforms', 'Payment aggregators', 'IT service providers', 'SaaS companies handling client data', 'Government vendors dealing with digital infrastructure']} />
        <p>Practically, if the business involves data, systems or digital transactions, this certification strengthens its compliance posture.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria">
        <DataTable headers={['Criteria', 'Requirement']} rows={[
          ['Business Entity', 'Registered company, LLP or organisation'],
          ['Infrastructure', 'Secure IT systems and network architecture'],
          ['Policies', 'Documented cybersecurity and data protection policies'],
          ['Personnel', 'Qualified IT and cybersecurity team'],
          ['Compliance Readiness', 'Ability to undergo audit and verification']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Certificate of Incorporation', 'Entity verification'],
          ['IT Infrastructure Details', 'System architecture validation'],
          ['Cybersecurity Policy', 'Compliance demonstration'],
          ['Data Protection Policy', 'Privacy alignment'],
          ['Audit Reports, if any', 'Existing compliance record'],
          ['Employee Details', 'Technical competency validation']
        ]} />
      </Section>

      <Section id="evaluation-areas" title="Core Components Evaluated">
        <p>From an auditor&rsquo;s perspective, certification is not checklist-based. It is system-driven validation, and testing covers:</p>
        <CheckList items={['Multi-factor authentication enabled', 'Vulnerability assessment conducted', 'Internal audit performed', 'Gaps identified and rectified']} />
        <div className="warning-box">Audit readiness is evaluated on evidence, not declarations. Organisations are expected to demonstrate evidence-based compliance, not just policy documents.</div>
      </Section>

      <Section id="internal-controls" title="Internal Control Systems Expected by Certification Authorities">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: '1. Preventive Controls', body: <ul className="!mb-0"><li>Access restrictions</li><li>Encryption protocols</li><li>Secure configurations</li></ul> },
          { title: '2. Detective Controls', body: <ul className="!mb-0"><li>Log monitoring</li><li>Intrusion detection</li><li>Alert systems</li></ul> },
          { title: '3. Corrective Controls', body: <ul className="!mb-0"><li>Incident response actions</li><li>Recovery systems</li><li>Root cause analysis</li></ul> }
        ]} />
        <p>Organisations must demonstrate a balanced control environment, not just isolated measures.</p>
      </Section>

      <Section id="gap-analysis" title="Real Compliance Gap Analysis (What We See in Practice)">
        <DataTable headers={['Area', 'Typical Gap', 'Impact']} rows={[
          ['Policies', 'Generic templates used', 'Rejection risk'],
          ['Systems', 'No real-time monitoring', 'Audit failure'],
          ['Access Control', 'Shared credentials', 'High risk'],
          ['Documentation', 'Not aligned with systems', 'Compliance mismatch'],
          ['Incident Response', 'No defined process', 'Major red flag']
        ]} />
      </Section>

      <Section id="regulator-evaluation" title="How Regulators Indirectly Evaluate ISNP-Type Compliance">
        <p>Even where ISNP is not explicitly required, regulators assess similar controls during RBI inspections, SEBI system audits, IRDAI technology audits and IFSCA supervisory reviews.</p>
        <CheckList items={['System logs', 'Access controls', 'Data handling processes', 'Vendor integrations', 'Incident reporting']} />
        <div className="info-box">This means the certification effort helps an organisation stay inspection-ready at all times, regardless of which regulator arrives first.</div>
      </Section>

      <Section id="vendor-risk" title="Vendor and Third-Party Risk Management (Critical Area)">
        <p>One of the most overlooked compliance aspects.</p>
        <CheckList items={['Vendor due diligence', 'Data sharing agreements', 'Security clauses in contracts', 'Periodic vendor audits']} />
      </Section>

      <Section id="risk-classification" title="Risk-Based Classification for ISNP Implementation">
        <DataTable headers={['Category', 'Example Entities', 'Compliance Intensity']} rows={[
          ['Low Risk', 'Small IT firms', 'Basic controls'],
          ['Medium Risk', 'SaaS platforms', 'Moderate controls'],
          ['High Risk', 'Fintech, NBFCs', 'Advanced controls']
        ]} />
        <p>The higher the risk category, the stricter the certification expectations.</p>
      </Section>

      <Section id="data-protection-laws" title="Integration with Data Protection Laws">
        <p>With evolving frameworks such as the Digital Personal Data Protection (DPDP) Act and global GDPR-like standards, ISNP Certification supports:</p>
        <CheckList items={['Data minimisation', 'Secure storage', 'Breach prevention', 'Accountability mechanisms']} />
        <p>Certification strengthens the organisation&rsquo;s data governance posture, which is now a regulatory priority.</p>
      </Section>

      <Section id="process" title="Step-by-Step Process for ISNP Certification">
        <Timeline steps={[
          { title: 'Initial assessment of IT systems and compliance gaps', body: 'Establish where actual system behaviour diverges from documented policy before anything is submitted.' },
          { title: 'Preparation of cybersecurity policies and documentation', body: 'Policies must reflect the real environment. Generic templates are a rejection risk.' },
          { title: 'Implementation of required security controls', body: 'Preventive, detective and corrective controls implemented as a balanced environment.' },
          { title: 'Application submission to the certification authority', body: 'File with the supporting infrastructure, policy and personnel documentation.' },
          { title: 'Technical audit and evaluation', body: 'Vulnerability assessment and system testing, evaluated on evidence rather than declarations.' },
          { title: 'Certification approval and issuance', body: 'On approval, move into the continuous compliance and renewal cycle.' }
        ]} />
      </Section>

      <Section id="fees" title="Certification Fees">
        <DataTable headers={['Component', 'Amount']} rows={[
          ['Application Fee', 'Varies by authority'],
          ['Audit Charges', 'Based on system complexity'],
          ['Certification Fee', 'Case-specific'],
          ['Renewal Fee', 'Periodic, if applicable']
        ]} />
      </Section>

      <Section id="timeline" title="Timeline for ISNP Certification">
        <DataTable headers={['Stage', 'Time Required']} rows={[
          ['Documentation Preparation', '1-2 weeks'],
          ['System Implementation', '2-4 weeks'],
          ['Audit and Review', '2-3 weeks'],
          ['Certification Approval', '1-2 weeks'],
          [<strong key="t">Overall</strong>, <strong key="tv">4 to 8 weeks approximately</strong>]
        ]} />
      </Section>

      <Section id="governance" title="Internal Governance Requirements">
        <p>According to governing regulations, governance structure plays a critical role in certification success. Organisations must establish a defined governance structure and a documented internal policy set covering security, data protection, access control and incident response.</p>
      </Section>

      <Section id="vs-other-certifications" title="ISNP vs Other Cybersecurity Certifications">
        <DataTable headers={['Aspect', 'ISNP Certification', 'ISO 27001']} rows={[
          ['Primary Focus', 'Network-level controls', 'Overall information security management'],
          ['Orientation', 'Compliance-driven security framework', 'Management system standard'],
          ['Typical Use', 'Demonstrating network and system-level readiness', 'Demonstrating an organisation-wide ISMS']
        ]} />
        <div className="info-box">Practically, many organisations combine ISNP and ISO 27001 for stronger compliance positioning, since the two address different layers.</div>
      </Section>

      <Section id="business-impact" title="How ISNP Certification Impacts Business Operations">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: "From a Founder's Perspective", body: 'Stronger credibility with clients, investors and government bodies, and fewer blockers in enterprise procurement.' },
          { title: "From a Compliance Officer's Perspective", body: 'A documented, auditable control environment that maps onto multiple sector regulator expectations at once.' },
          { title: 'From a Regulatory Perspective', body: 'Demonstrable readiness across confidentiality, integrity, availability and incident reporting obligations.' }
        ]} />
      </Section>

      <Section id="post-certification" title="Post-Certification Compliance">
        <p>According to governing regulations, cybersecurity is not a one-time compliance but an ongoing responsibility.</p>
        <CheckList items={['Maintain cybersecurity standards', 'Conduct periodic internal audits', 'Update policies as per regulatory changes', 'Report security incidents where required', 'Renew certification periodically']} />
      </Section>

      <Section id="renewal" title="Renewal and Continuous Compliance">
        <p>ISNP Certification is not a one-time activity. Failure to maintain standards may lead to loss of certification standing, and to the regulatory consequences described below.</p>
      </Section>

      <Section id="compliance-risks" title="Practical Compliance Risks (Real-World View)">
        <p>Many businesses assume certification ensures full compliance. In reality, regulators increasingly evaluate actual system behaviour, not just documentation.</p>
      </Section>

      <Section id="red-flags" title="Red Flags That Lead to Certification Rejection">
        <DataTable headers={['Red Flag', 'Why It Fails']} rows={[
          ['Generic policy templates', 'Do not reflect the real system environment'],
          ['No real-time monitoring', 'Detective controls cannot be evidenced'],
          ['Shared credentials', 'Access control cannot be attributed or audited'],
          ['Documentation not aligned with systems', 'Creates a visible compliance mismatch'],
          ['No defined incident response process', 'Treated as a major red flag by auditors']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes to Avoid">
        <CheckList items={['Ignoring documentation quality', 'Weak internal cybersecurity controls', 'Treating certification as a one-time activity', 'Lack of trained personnel', 'Failure to conduct periodic audits']} />
        <div className="warning-box">Regulators and auditors primarily focus on implementation, not just documentation.</div>
      </Section>

      <Section id="consequences" title="Regulatory Consequences of Weak Cyber Compliance">
        <CheckList items={['Financial penalties', 'Business restrictions', 'Licence suspension in regulated sectors', 'Legal liability', 'Loss of client trust']} />
        <div className="warning-box">Cybersecurity is no longer an IT issue. It is a board-level responsibility.</div>
      </Section>

      <Section id="strategic-advantage" title="Strategic Advantage of ISNP Certification">
        <p>Beyond compliance, the certification improves the organisation&rsquo;s standing with clients, investors and regulators, and reduces cyber risk exposure across the business.</p>
      </Section>

      <Section id="future-outlook" title="Future Outlook: Why ISNP-Type Certifications Will Become Critical">
        <p>As sector regulators deepen their technology supervision and data protection obligations come progressively into force, evidence-based security certification moves from a differentiator to a baseline expectation for any business handling data, systems or digital transactions.</p>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with ISNP Certification">
        <p>From a practical standpoint, ISNP Certification is not just documentation. It is about real implementation.</p>
        <CheckList items={['Identifying compliance gaps', 'Structuring documentation properly', 'Coordinating audits', 'Ensuring regulatory alignment', 'Avoiding delays and rejection']} />
      </Section>

      <Section id="faqs" title="FAQs on ISNP Certification in India">
        <p>{faqs.length} questions covering scope, applicability, eligibility, process, audit expectations, fees, timeline, renewal, sector linkages and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h3>Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: RBI, SEBI, IRDAI and IFSCA frameworks, technology governance and cyber risk documentation, data protection compliance, vendor risk management and audit readiness.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help fintechs, NBFCs, insurance platforms, payment aggregators, IT service providers and SaaS businesses understand certification expectations around network security and cybersecurity controls.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory or technical advice. ISNP Certification is not governed by a single statute, and requirements, fees, validity periods and audit standards vary by issuing body and framework. The abbreviation ISNP is also used in the insurance sector for the IRDAI Insurance Self-Network Platform, which is a separate framework. Organisations should confirm requirements with their chosen certification authority and verify the cybersecurity obligations imposed by their own sector regulator before acting on this page.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our Compliance Expert">
        <p>Close the gap between what the policies say and what the systems actually do, with a structured gap assessment, documentation that matches the environment, and audit coordination through to issuance.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to a Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Start a Gap Assessment</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check Certification Readiness</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
