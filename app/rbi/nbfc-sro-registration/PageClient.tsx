'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'NBFC SRO Registration: Quick Overview' },
  { id: 'what-is-nbfc-sro-registration', title: 'What is NBFC SRO Registration?' },
  { id: 'legal-background', title: 'Legal Background and RBI Authority' },
  { id: 'who-needs', title: 'Who Needs NBFC SRO Registration?' },
  { id: 'who-cannot-apply', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'capital-requirement', title: 'Capital Requirement' },
  { id: 'net-worth-calculation', title: 'Net Worth Calculation' },
  { id: 'infrastructure', title: 'Infrastructure Requirements' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'business-plan', title: 'Business Plan Requirement' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'timeline-fees', title: 'Timeline and Fees' },
  { id: 'benefits', title: 'Benefits of NBFC SRO Registration' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'rbi-oversight', title: 'RBI Inspection and Oversight' },
  { id: 'cancellation-risks', title: 'Cancellation and Non-Compliance Risks' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'strategic-perspective', title: 'Strategic Perspective' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our RBI Compliance Expert' }
];

const faqs = [
  { q: 'What is NBFC SRO Registration?', a: 'NBFC SRO Registration refers to recognition granted by the Reserve Bank of India to a Self-Regulatory Organisation representing Non-Banking Financial Companies. The SRO functions as an industry-level body to promote compliance culture, standardise practices and act as a bridge between RBI and NBFCs.' },
  { q: 'What does SRO mean in the context of NBFCs?', a: 'An SRO for NBFCs is a recognised industry association that undertakes self-regulatory functions under RBI oversight. It supports member NBFCs in improving governance, grievance redressal and adherence to regulatory norms.' },
  { q: 'Is NBFC SRO Registration mandatory for all NBFCs?', a: 'No. NBFC SRO Registration is not mandatory for individual NBFCs. It applies to industry bodies or associations seeking recognition as a Self-Regulatory Organisation.' },
  { q: 'Who grants NBFC SRO Registration in India?', a: 'The Reserve Bank of India grants recognition to an SRO for NBFCs under its issued framework.' },
  { q: 'What is the objective of NBFC SRO Registration?', a: 'The objective is to strengthen industry discipline, promote best practices, improve compliance monitoring and facilitate structured communication between RBI and NBFCs.' },
  { q: 'Does an NBFC SRO replace RBI supervision?', a: 'No. RBI remains the primary regulator. An SRO complements RBI supervision but does not replace RBI regulatory authority.' },
  { q: 'Is NBFC SRO Registration the same as NBFC licence?', a: 'No. NBFC SRO Registration is for an industry body. It is different from NBFC Registration granted to individual lending entities.' },
  { q: 'Who can apply for NBFC SRO Registration?', a: 'A not-for-profit company or industry association representing NBFCs can apply, provided it meets RBI prescribed eligibility conditions.' },
  { q: 'Can a private limited company apply for NBFC SRO Registration?', a: 'Only if it is structured as a not-for-profit entity and complies with RBI framework requirements.' },
  { q: 'Can an individual NBFC become an SRO?', a: 'An individual NBFC cannot act as an SRO. The applicant must be an industry-level body and maintain independence from individual NBFC control.' },
  { q: 'What is the minimum net worth for NBFC SRO Registration?', a: 'The minimum net worth prescribed in the source framework is Rs. 2 crore, which must be maintained continuously.' },
  { q: 'What documents are required for NBFC SRO Registration?', a: 'Key documents include incorporation certificate, memorandum and articles, board composition details, net worth certificate, business plan, policy drafts, member list and auditor certificate.' },
  { q: 'Is a business plan required for NBFC SRO Registration?', a: 'Yes. The applicant must submit a structured business plan covering membership expansion, revenue model, three-year projections, compliance monitoring, technology deployment and grievance redressal.' },
  { q: 'Does RBI review board composition?', a: 'Yes. Independence and diversity of board members are key evaluation parameters.' },
  { q: 'Can RBI ask for changes in governance structure?', a: 'Yes. RBI may require changes before granting recognition.' },
  { q: 'Is there an online application portal for NBFC SRO Registration?', a: 'Applications are submitted as per RBI prescribed procedure, which may include electronic submission.' },
  { q: 'Can RBI reject NBFC SRO Registration application?', a: 'Yes. RBI has discretion to approve or reject applications based on regulatory assessment.' },
  { q: 'Can application be resubmitted if rejected?', a: 'Yes, subject to rectification of deficiencies and fresh evaluation by RBI.' },
  { q: 'Is reporting to RBI required after recognition?', a: 'Yes. Regular reporting and updates must be submitted as specified by RBI.' },
  { q: 'Can RBI withdraw NBFC SRO recognition?', a: 'Yes. RBI may withdraw recognition if the SRO fails to comply with prescribed conditions.' },
  { q: 'Does SRO have enforcement powers like RBI?', a: 'No. An SRO does not have statutory enforcement powers like RBI, though it may enforce internal standards among its members.' },
  { q: 'Can RBI inspect an SRO?', a: 'Yes. RBI may conduct inspection or seek information as part of supervisory oversight.' },
  { q: 'Does the SRO have to maintain neutrality among members?', a: 'Yes. Independence and neutrality are essential conditions for recognition.' },
  { q: 'Can an association of fintech NBFCs apply for SRO recognition?', a: 'Yes, if it represents registered NBFCs and satisfies RBI governance and eligibility conditions.' },
  { q: 'How can Estabizz help with NBFC SRO Registration?', a: 'Estabizz assists with eligibility review, net worth readiness, governance structuring, business plan drafting, policy documentation, application support, RBI query response and post-recognition compliance support.' }
];

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]">
      <table className="data-table my-0 min-w-[640px]">
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardGrid({ cards, columns = 'md:grid-cols-2' }: { cards: Card[]; columns?: string }) {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-4 my-6`}>
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl border border-[rgba(0,150,220,0.12)] bg-white p-5 shadow-[0_4px_18px_rgba(0,100,200,0.04)]">
          <h3 className="!p-0 !mb-2 !text-[#0a1628]">{card.title}</h3>
          <div className="text-[14px] leading-7 text-gray-600">{card.body}</div>
        </div>
      ))}
    </div>
  );
}

function FormulaCard({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f0f9ff] to-white p-5 text-center text-[15px] font-bold leading-8 text-[#0a1628] shadow-sm">
      {children}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="clean-list">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

export default function NBFCSRORegistrationPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'Reserve Bank of India' },
    { title: 'Framework', body: 'RBI Framework for Self-Regulatory Organisations for NBFCs' },
    { title: 'Applicable Applicant', body: 'Industry body, sectoral association or not-for-profit entity representing NBFCs' },
    { title: 'Purpose', body: 'Industry-led governance under RBI oversight' },
    { title: 'Minimum Net Worth', body: 'Rs. 2 crore' },
    { title: 'Nature of Recognition', body: 'RBI recognition as Self-Regulatory Organisation for NBFCs' },
    { title: 'Primary Role', body: 'Compliance standard setting, grievance redressal, member monitoring and policy dialogue' },
    { title: 'RBI Supervision', body: 'SRO complements RBI supervision but does not replace RBI' },
    { title: 'Applicability', body: 'Not mandatory for individual NBFCs' },
    { title: 'Timeline', body: 'Indicative and subject to RBI review' }
  ];

  const helpCards: Card[] = [
    { title: 'Eligibility and Structuring Review', body: 'We review the proposed legal structure, not-for-profit character, member representation, governance independence and regulatory suitability.' },
    { title: 'Net Worth Readiness Support', body: 'We assist in reviewing Rs. 2 crore net worth readiness, auditor certification, corpus structure and financial documentation.' },
    { title: 'Governance Framework Drafting', body: 'We help prepare board structure, conflict of interest safeguards, fit and proper documentation and governance policies.' },
    { title: 'Business Plan Preparation', body: 'We prepare a detailed business plan covering membership roadmap, revenue model, three-year projections, compliance monitoring and technology deployment.' },
    { title: 'Policy and Compliance Documentation', body: 'We assist with compliance monitoring framework, grievance redress policy, member code of conduct, reporting process and policy dissemination mechanism.' },
    { title: 'Application and Query Support', body: 'We help compile the application dossier and assist in preparing structured responses to RBI clarifications.' },
    { title: 'Post-Recognition Compliance', body: 'We support reporting calendars, governance review, audit coordination, member compliance monitoring and regulatory update tracking.' },
    { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
  ];

  const whyCards: Card[] = [
    { title: 'RBI Regulatory Expertise', body: 'Our team works across RBI licensing and compliance matters and understands governance expectations for regulated financial sector entities.' },
    { title: 'Compliance Depth, Not Just Documentation', body: 'We focus on independence, governance, financial readiness, fit and proper standards, operational capability and post-recognition compliance.' },
    { title: 'Business Plan and Governance Strength', body: 'We prepare practical, regulator-facing business plans and governance frameworks aligned with RBI expectations.' },
    { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider regulatory perspective.' },
    { title: '100+ Associate Professionals', body: 'Our professional network supports legal, finance, compliance, documentation and regulatory advisory requirements.' },
    { title: 'End-to-End Support', body: 'From structuring to application preparation, query support and post-recognition compliance, we provide organised professional handholding.' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🏦', label: 'RBI Regulatory Advisory' },
        { emoji: '🛡️', label: 'Self-Regulatory Organisation Framework' },
        { emoji: '🏛️', label: 'Governance Structuring Support' },
        { emoji: '💼', label: 'Rs. 2 Crore Net Worth Readiness' },
        { emoji: '📄', label: 'Business Plan & Policy Drafting' },
        { emoji: '✅', label: 'Post-Recognition Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: 'NBFC SRO Registration' }
      ]}
      title="NBFC SRO Registration - Complete RBI Governance Framework for NBFC Sector Bodies"
      heroDescription={
        <p className="m-0">
          <strong>NBFC SRO Registration</strong> marks a significant structural reform in the governance architecture of India&apos;s non-banking financial sector. The Reserve Bank of India has introduced the Self-Regulatory Organisation framework for NBFCs to strengthen industry discipline, improve compliance culture and enhance sectoral credibility. For industry bodies and sectoral associations, NBFC SRO Registration is not merely an approval process; it is a regulatory recognition carrying responsibility, accountability and supervisory expectations.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for NBFC SRO Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check SRO Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="24 min read"
      displayYear="2025"
      focusKeyword="NBFC SRO Registration"
      sections={tocSections}
      ctaTitle="Apply for NBFC SRO Registration"
      ctaDescription="Get structured support for RBI SRO framework eligibility, Rs. 2 crore net worth readiness, governance design, business plan, policy drafting and post-recognition compliance."
      quickFacts={[
        { label: 'Regulator', value: 'RBI' },
        { label: 'Framework', value: 'SRO for NBFCs' },
        { label: 'Applicant', value: 'Industry body' },
        { label: 'Net Worth', value: 'Rs. 2 crore' },
        { label: 'Structure', value: 'Not-for-profit' },
        { label: 'Role', value: 'Industry governance' },
        { label: 'Individual NBFCs', value: 'Not mandatory' },
        { label: 'Timeline', value: 'Subject to RBI review' }
      ]}
      relatedArticles={[
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'RBI registration guide for NBFC-ICC with NOF, principal business test and COSMOS filing.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'RBI licensing framework for Account Aggregators and data sharing business models.' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support', category: 'RBI', description: 'Legal and compliance support for RBI-regulated financial entities.' },
        { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india', category: 'RBI', description: 'RBI registration support for Asset Reconstruction Companies under SARFAESI framework.' }
      ]}
      finalCtaTitle="Start Your NBFC SRO Registration Journey with Estabizz"
      finalCtaDescription="Build your SRO application with structured regulatory support, Rs. 2 crore net worth readiness review, governance framework, business plan, policy documentation, member representation mapping and post-recognition compliance assistance."
    >
      <Section id="quick-overview" title="NBFC SRO Registration: Quick Overview">
        <CardGrid cards={overviewCards} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s legal structure, governance independence, financial position, membership representation, operational capacity and the latest RBI framework at the time of application.</div>
      </Section>

      <Section id="what-is-nbfc-sro-registration" title="What is NBFC SRO Registration?">
        <p>NBFC SRO Registration refers to recognition granted by the Reserve Bank of India to an eligible industry body that satisfies the prescribed governance, independence, operational and financial criteria to function as a Self-Regulatory Organisation for NBFCs.</p>
        <BulletList items={['A bridge between regulator and industry', 'A compliance standard setter', 'A grievance redress facilitator', 'A monitoring and coordination platform', 'A policy dialogue contributor']} />
        <p>The purpose of NBFC SRO Registration is to institutionalise sectoral discipline through industry-led governance under RBI supervision.</p>
      </Section>

      <Section id="legal-background" title="Legal Background of NBFC SRO Registration">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Reserve Bank of India'],
          ['Framework', 'RBI Framework for Self-Regulatory Organisations for NBFCs'],
          ['Sector', 'Non-Banking Financial Companies'],
          ['Recognition Type', 'Self-Regulatory Organisation for NBFCs'],
          ['Legal Basis', 'RBI regulatory powers and applicable framework for SROs'],
          ['Nature of Oversight', 'RBI remains the ultimate supervisory authority'],
          ['Regulatory Role', 'SRO complements regulation but does not replace RBI supervision']
        ]} />
        <p>An SRO does not replace RBI regulation. RBI remains the primary regulator and may issue directions, seek information, inspect, review governance and withdraw recognition where prescribed conditions are not satisfied.</p>
      </Section>

      <Section id="who-needs" title="Who Needs NBFC SRO Registration?">
        <DataTable headers={['Applicant Type', 'Applicability', 'Remarks']} rows={[
          ['Industry association representing NBFCs', 'Eligible', 'Must demonstrate broad-based NBFC representation'],
          ['Sectoral federation of registered NBFC entities', 'Eligible', 'Should show sectoral relevance and governance independence'],
          ['Not-for-profit company formed for industry development', 'Eligible', 'Must meet structure, net worth and operational criteria'],
          ['Entity seeking formal recognition to represent NBFC interests', 'Eligible subject to RBI review', 'Must satisfy RBI governance and fit and proper expectations'],
          ['Individual NBFC', 'Not eligible as SRO', 'An individual NBFC cannot act as industry-level SRO'],
          ['Profit-oriented private company', 'Generally not suitable', 'SRO structure requires neutrality and independence']
        ]} />
        <div className="info-box">NBFC SRO Registration is not mandatory for individual NBFCs. It is applicable to industry-level bodies or associations seeking RBI recognition as a Self-Regulatory Organisation.</div>
      </Section>

      <Section id="who-cannot-apply" title="Who Cannot Apply for NBFC SRO Registration?">
        <DataTable headers={['Entity / Situation', 'Reason']} rows={[
          ['Profit-oriented private companies', 'Lack of neutral not-for-profit character'],
          ['Bodies lacking sectoral representation', 'Cannot represent the NBFC industry meaningfully'],
          ['Entities without governance independence', 'Conflict of interest risk'],
          ['Organisations with unresolved regulatory actions', 'Fit and proper concerns'],
          ['Entities failing to meet net worth requirement', 'Financial eligibility gap'],
          ['Body dominated by one NBFC or group', 'Independence and neutrality concern']
        ]} />
        <p>NBFC SRO Registration demands structural neutrality, governance integrity and demonstrable industry representation.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for NBFC SRO Registration">
        <DataTable headers={['Criteria', 'Requirement', 'Practical Meaning']} rows={[
          ['Legal Structure', 'Not-for-profit entity', 'The applicant should be structured for sectoral governance and not private profit'],
          ['Governance', 'Independent Board with balanced representation', 'No single entity or group should dominate decision-making'],
          ['Financial Strength', 'Minimum net worth as prescribed', 'Rs. 2 crore net worth should be maintained'],
          ['Operational Capacity', 'Infrastructure and staffing capability', 'The SRO should be capable of managing member interaction, compliance and reporting'],
          ['Fit and Proper', 'Clean track record of promoters, directors and key officials', 'Integrity and competence are essential'],
          ['Independence', 'No conflict of interest', 'Neutrality among members must be demonstrated'],
          ['Representation', 'Broad-based NBFC membership', 'The body should represent the sector meaningfully']
        ]} />
        <p>NBFC SRO Registration is granted only when institutional independence is clearly demonstrated.</p>
      </Section>

      <Section id="capital-requirement" title="Capital Requirement for NBFC SRO Registration">
        <p>As per the regulatory framework, the SRO must maintain minimum net worth on a continuous basis.</p>
        <DataTable headers={['Requirement', 'Amount', 'Nature']} rows={[['Minimum Net Worth', 'Rs. 2 crore', 'Continuous maintenance requirement']]} />
        <FormulaCard>Members&apos; Contributions &rarr; Corpus Fund &rarr; Minimum Rs. 2 Crore Net Worth &rarr; Continuous Maintenance</FormulaCard>
        <p>The applicant must maintain proper accounting records and obtain auditor certification to demonstrate financial eligibility.</p>
      </Section>

      <Section id="net-worth-calculation" title="Net Worth Calculation for NBFC SRO Registration">
        <FormulaCard>Net Worth = Paid-up Capital + Free Reserves - Accumulated Losses - Deferred Expenditure</FormulaCard>
        <DataTable headers={['Component', 'Treatment']} rows={[
          ['Paid-up Capital', 'Add'],
          ['Free Reserves', 'Add'],
          ['Accumulated Losses', 'Deduct'],
          ['Deferred Expenditure', 'Deduct']
        ]} />
        <p>The SRO should maintain transparent accounting and auditor certification to support the net worth computation.</p>
      </Section>

      <Section id="infrastructure" title="Infrastructure Requirements for NBFC SRO Registration">
        <BulletList items={['Dedicated office infrastructure', 'Secure data management systems', 'Grievance redress portal', 'Policy dissemination mechanisms', 'Compliance monitoring tools', 'Administrative and secretarial staff', 'Digital infrastructure for member interaction', 'Reporting and record management systems']} />
        <p>Digital infrastructure should support real-time member interaction, regulatory reporting support, grievance tracking and structured communication with members.</p>
      </Section>

      <Section id="fit-and-proper" title="Key Managerial and Fit and Proper Criteria">
        <p>Directors and key officials of the proposed SRO must demonstrate competence, integrity, independence and regulatory reliability.</p>
        <BulletList items={['Financial sector experience', 'Integrity and professional competence', 'No adverse regulatory findings', 'Independence from member NBFCs', 'Balanced sectoral representation', 'No dominance by any single member or group', 'Clean track record and transparent disclosures']} />
        <p>Board composition should reflect sectoral representation without dominance by any single entity.</p>
      </Section>

      <Section id="business-plan" title="Business Plan Requirement for NBFC SRO Registration">
        <p>The applicant must submit a structured business plan demonstrating sustainability, operational capacity, governance capability and regulatory readiness.</p>
        <DataTable headers={['Business Plan Component', 'What It Should Cover']} rows={[
          ['Membership Expansion Roadmap', 'Category-wise and geography-wise NBFC membership strategy'],
          ['Revenue Model', 'Membership fees, training, advisory support and other permitted revenue streams'],
          ['Three-Year Financial Projection', 'Projected income, expenditure, infrastructure cost and operational sustainability'],
          ['Compliance Monitoring Framework', 'Member monitoring, advisory issuance and reporting framework'],
          ['Technology Deployment Strategy', 'Member portal, grievance system, compliance tracking and data management'],
          ['Grievance Redress Timeline Model', 'Process flow and turnaround timelines for complaint handling'],
          ['Training and Awareness Plan', 'Compliance workshops, guidance notes and member education'],
          ['Policy Dialogue Framework', 'Structured communication with RBI and industry stakeholders']
        ]} />
        <p>RBI evaluates sustainability before granting NBFC SRO Registration.</p>
      </Section>

      <Section id="documents-required" title="Documents Required for NBFC SRO Registration">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Incorporation Certificate', 'Legal identity proof'],
          ['Memorandum and Articles', 'Governance framework and object alignment'],
          ['Board Composition Details', 'Independence and representation evaluation'],
          ['Net Worth Certificate', 'Financial eligibility verification'],
          ['Business Plan', 'Operational sustainability and strategic roadmap'],
          ['Policy Drafts', 'Compliance, grievance, governance and monitoring mechanisms'],
          ['Member List', 'Representation strength and sectoral coverage'],
          ['Auditor Certificate', 'Financial transparency'],
          ['Fit and Proper Declarations', 'Integrity and competence verification'],
          ['Infrastructure Details', 'Operational readiness'],
          ['Grievance Redress Framework', 'Member and stakeholder complaint handling'],
          ['Technology Plan', 'Digital monitoring and reporting capability']
        ]} />
        <p>All documents must be properly certified and submitted digitally or physically as per RBI instructions.</p>
      </Section>

      <Section id="registration-process" title="Step-by-Step NBFC SRO Registration Process">
        <div className="step-timeline">
          {[
            ['Entity Structuring', 'Set up or review the applicant as an appropriate not-for-profit industry body or association.'],
            ['Governance and Independence Review', 'Evaluate board composition, member representation, conflict of interest controls and decision-making neutrality.'],
            ['Net Worth Readiness', 'Verify Rs. 2 crore net worth and obtain required auditor certification.'],
            ['Business Plan and Policy Drafting', 'Prepare business plan, membership roadmap, grievance redress framework, compliance monitoring process and governance policies.'],
            ['Application Filing', 'Submit the application to RBI in the prescribed manner with supporting documents.'],
            ['Preliminary Scrutiny', 'RBI reviews documentation, eligibility, governance structure and financial position.'],
            ['Clarification Stage', 'RBI may seek clarifications, additional documents or structural modifications.'],
            ['Governance Evaluation', 'RBI evaluates independence, board structure, representation and fit and proper criteria.'],
            ['Financial Verification', 'Net worth, source of funds and sustainability are reviewed.'],
            ['Recognition Order', 'Upon regulatory satisfaction, RBI may grant recognition as an SRO for NBFCs.']
          ].map(([title, body], index) => (
            <div key={title} className="step-item">
              <div className="step-dot" />
              <div className="step-card">
                <div className="step-label">Step {index + 1}</div>
                <h3 className="!p-0 !mb-2 !text-[#0a1628]">{title}</h3>
                <p className="!mb-0">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <FormulaCard>Application Submission &rarr; Preliminary Scrutiny &rarr; Clarification Stage &rarr; Governance Evaluation &rarr; Fit and Proper Review &rarr; Financial Verification &rarr; RBI Approval &rarr; Recognition Notification</FormulaCard>
      </Section>

      <Section id="timeline-fees" title="Indicative Timeline for NBFC SRO Registration">
        <p>No rigid statutory timeline is prescribed. Approval depends on completeness of documentation, clarity of governance structure, financial strength, regulatory assessment and RBI supervisory view.</p>
        <DataTable headers={['Stage', 'Activity', 'Indicative Position']} rows={[
          ['Stage 1', 'Structuring and eligibility review', 'Case-specific'],
          ['Stage 2', 'Net worth verification and governance review', 'Case-specific'],
          ['Stage 3', 'Business plan and document preparation', 'Case-specific'],
          ['Stage 4', 'RBI application submission', 'As per prescribed procedure'],
          ['Stage 5', 'RBI scrutiny and clarifications', 'Multiple rounds may occur'],
          ['Stage 6', 'Recognition order', 'Subject to RBI discretion']
        ]} />
        <div className="warning-box">Applicants must plan for multiple rounds of clarification and should avoid assuming fixed approval timelines.</div>
        <h3>Government Fees and Cost Planning</h3>
        <p>The RBI framework does not prescribe a heavy licensing fee; however, administrative application fees, if applicable, should be verified from current RBI circulars or official instructions at the time of filing.</p>
        <BulletList items={['Professional advisory cost', 'Infrastructure setup cost', 'Compliance system deployment cost', 'Technology and grievance portal cost', 'Staff and administrative cost', 'Audit and certification cost']} />
      </Section>

      <Section id="benefits" title="Benefits of NBFC SRO Registration">
        <CardGrid cards={[
          { title: 'Industry Representation Before RBI', body: 'The SRO can facilitate structured industry-level dialogue with the regulator.' },
          { title: 'Compliance Culture Building', body: 'The SRO can help members understand and implement regulatory expectations.' },
          { title: 'Advisory Standards', body: 'The SRO may issue guidance, advisories and best-practice standards for members.' },
          { title: 'Grievance Redress Platform', body: 'The SRO can operate a structured grievance redress mechanism.' },
          { title: 'Training and Awareness', body: 'The SRO can conduct workshops, knowledge sessions and compliance programmes.' },
          { title: 'Sectoral Credibility', body: 'Recognition improves institutional legitimacy and industry confidence.' }
        ]} />
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance After NBFC SRO Registration">
        <DataTable headers={['Obligation', 'Frequency / Nature']} rows={[
          ['Reporting to RBI', 'As prescribed'],
          ['Member Compliance Monitoring', 'Continuous'],
          ['Financial Audit', 'Annual'],
          ['Governance Review', 'Periodic'],
          ['Grievance Reporting', 'Regular'],
          ['Policy Updates', 'As required'],
          ['Member Education', 'Ongoing'],
          ['Regulatory Communication', 'Continuous']
        ]} />
        <FormulaCard>Member Monitoring &rarr; Data Collection &rarr; Advisory Issuance &rarr; Reporting to RBI &rarr; Review and Feedback &rarr; Policy Refinement</FormulaCard>
        <p>NBFC SRO Registration creates continuing obligations. The SRO must maintain independence, transparency, proper records, governance systems and regular engagement with RBI and members.</p>
      </Section>

      <Section id="rbi-oversight" title="RBI Inspection and Oversight Powers">
        <DataTable headers={['RBI Power', 'Practical Meaning']} rows={[
          ['Seek Information', 'RBI may call for records, reports and clarifications'],
          ['Conduct Inspections', 'RBI may inspect governance, financials and processes'],
          ['Review Governance', 'RBI may examine board structure and independence'],
          ['Examine Financial Statements', 'Net worth and financial discipline may be reviewed'],
          ['Evaluate Grievance Handling', 'SRO complaint mechanism may be assessed'],
          ['Issue Directions', 'RBI may direct corrective action']
        ]} />
        <p>NBFC SRO Registration does not dilute RBI regulatory oversight.</p>
      </Section>

      <Section id="cancellation-risks" title="Suspension or Cancellation of NBFC SRO Recognition">
        <DataTable headers={['Trigger', 'Possible Consequence']} rows={[
          ['Governance standards weaken', 'RBI may issue warning or take action'],
          ['Financial position deteriorates', 'Recognition may be reviewed'],
          ['Conflict of interest arises', 'Corrective directions or withdrawal risk'],
          ['Reporting obligations ignored', 'Supervisory action'],
          ['Misrepresentation detected', 'Withdrawal of recognition'],
          ['Failure to maintain net worth', 'Regulatory concern'],
          ['Loss of member confidence', 'Credibility risk']
        ]} />
        <h3>Penalties and Non-Compliance Risk</h3>
        <p>While SROs are not traditional licensees like NBFCs, regulatory consequences may include advisory warnings, restrictive directives, withdrawal of recognition, public disclosure of non-compliance and serious credibility risk.</p>
        <BulletList items={['Advisory warnings', 'Restrictive directives', 'Withdrawal of recognition', 'Public disclosure risk', 'Loss of institutional credibility', 'Regulatory trust deficit']} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in NBFC SRO Registration">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Weak governance independence', 'Rejection or structural modification requirement'],
          ['Insufficient net worth', 'Ineligibility'],
          ['Incomplete documentation', 'Delay'],
          ['No structured business plan', 'Regulatory concern'],
          ['Lack of compliance roadmap', 'Supervisory hesitation'],
          ['Poor member representation', 'Weak sectoral legitimacy'],
          ['Conflict of interest in board structure', 'Independence concern'],
          ['Weak grievance redress system', 'Operational readiness concern'],
          ['No technology plan', 'Monitoring and reporting gap']
        ]} />
        <p>Professional structuring improves clarity and reduces avoidable regulatory gaps.</p>
      </Section>

      <Section id="strategic-perspective" title="Strategic Perspective on NBFC SRO Registration">
        <div className="expert-quote">
          <blockquote>&quot;Self-regulation succeeds only when industry discipline rises above competitive interest and aligns with public trust.&quot;</blockquote>
          <cite>CS Devyani Khambhati - Compliance Expert</cite>
        </div>
        <p>NBFC SRO Registration is about institutional maturity, not symbolic representation. An applicant must demonstrate that it can responsibly represent the NBFC sector while maintaining neutrality, governance discipline and regulatory alignment.</p>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with NBFC SRO Registration">
        <CardGrid cards={helpCards} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for NBFC SRO Registration?">
        <CardGrid cards={whyCards} />
      </Section>

      <Section id="faqs" title="FAQs on NBFC SRO Registration">
        <div className="faq-accordion">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-item">
              <summary>{faq.q}</summary>
              <div>{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewed by Estabizz Compliance Expert">
        <div className="success-box">
          <h3 className="!p-0 !mb-2 !text-[#0a1628]">CS Devyani Khambhati</h3>
          <p className="!mb-2"><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p className="!mb-2"><strong>Expertise:</strong> RBI, SEBI, IRDAI, IFSCA, fintech regulatory compliance, NBFC licensing, SRO framework, financial sector governance and post-registration compliance.</p>
          <p className="!mb-0">This content has been prepared from a regulatory advisory perspective to help industry associations, NBFC federations and financial sector bodies understand the broad RBI framework for Self-Regulatory Organisations in the NBFC sector.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, financial or investment advice. RBI requirements, application formats, net worth thresholds, governance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with RBI.</div>
      </Section>

      <Section id="speak-to-expert" title="Start Your NBFC SRO Registration Journey with Estabizz">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-6 md:p-8 text-white">
          <p className="!text-blue-100">Build your SRO application with structured regulatory support, Rs. 2 crore net worth readiness review, governance framework, business plan, policy documentation, member representation mapping and post-recognition compliance assistance.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0077B6] hover:bg-blue-50">Speak to RBI Compliance Expert</Link>
            <Link href="/get-started" className="rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0077B6]">Apply for NBFC SRO Registration</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#10b981] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#059669]">WhatsApp Estabizz Team</a>
          </div>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
