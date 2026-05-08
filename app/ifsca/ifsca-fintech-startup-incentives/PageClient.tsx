'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'IFSCA FinTech and Startup Incentives: Quick Overview' },
  { id: 'what-are-incentives', title: 'What are IFSCA FinTech and Startup Incentives?' },
  { id: 'gift-ifsc-overview', title: 'GIFT IFSC and IFSCA Overview' },
  { id: 'legal-framework', title: 'Legal and Regulatory Framework' },
  { id: 'fintech-vs-techfin', title: 'FinTech vs TechFin' },
  { id: 'authorization-vs-lua', title: 'Authorization vs Limited Use Authorization' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'eligible-activities', title: 'Eligible FinTech and TechFin Activities' },
  { id: 'direct-authorization', title: 'Direct Authorization Route' },
  { id: 'sandbox-route', title: 'Limited Use Authorization / Sandbox Route' },
  { id: 'sandbox-types', title: 'Types of IFSCA FinTech Sandboxes' },
  { id: 'user-protection', title: 'User Protection and Testing Controls' },
  { id: 'incentive-scheme', title: 'IFSCA FinTech Incentive Scheme' },
  { id: 'grant-types', title: 'Types of Startup Grants' },
  { id: 'grant-conditions', title: 'Grant Conditions and Disbursement' },
  { id: 'accelerator', title: 'Accelerator Authorization and Grants' },
  { id: 'office-setup', title: 'Office Setup in GIFT IFSC' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'application-process', title: 'Application Process' },
  { id: 'fees-timeline', title: 'Fees and Timeline' },
  { id: 'post-authorization-compliance', title: 'Post-Authorization Compliance' },
  { id: 'ecosystem', title: 'GIFT IFSC FinTech Ecosystem' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  ['What are IFSCA FinTech and Startup Incentives?', 'IFSCA FinTech and Startup Incentives include the FinTech Entity Framework for Authorization / Limited Use Authorization and the FinTech Incentive Scheme providing specific grants to eligible FinTech entities.'],
  ['Who regulates FinTech entities in GIFT IFSC?', 'FinTech entities in GIFT IFSC are regulated by the International Financial Services Centres Authority.'],
  ['What is the IFSCA FinTech Entity Framework?', 'It is the framework issued by IFSCA on April 27, 2022 for authorisation of eligible domestic and foreign FinTech / TechFin entities in IFSC.'],
  ['What is the difference between FinTech and TechFin?', 'FinTech refers to financial technology solutions creating new financial service models, products or processes. TechFin refers to advanced technology solutions assisting financial products, financial services and financial institutions.'],
  ['What is Authorization under IFSCA FinTech Framework?', 'Authorization is the direct entry route for mature FinTech / TechFin entities having a deployable solution and revenue earning track record in at least one of the last three financial years.'],
  ['What is Limited Use Authorization?', 'Limited Use Authorization allows an entity to test its FinTech solution under IFSCA sandbox framework with limited scope and conditions.'],
  ['Is revenue track record mandatory for Authorization?', 'Yes. For direct Authorization, revenue earning track record in at least one of the last three financial years is required.'],
  ['Is revenue track record mandatory for sandbox?', 'No. For Limited Use Authorization / sandbox route, revenue track record is generally not mandatory at the initial stage.'],
  ['Is office setup in GIFT IFSC mandatory for sandbox?', 'Generally, office setup is not mandatory during sandbox unless required by IFSCA or if an IFSC bank account is required.'],
  ['Is office setup in GIFT IFSC mandatory after Authorization?', 'Yes. Once authorized as FinTech Entity, the entity must set up in GIFT IFSC in the prescribed form and commence operations within the specified timeline.'],
  ['Who can apply as an Indian applicant?', 'DPIIT-recognised FinTech startups, Indian companies, LLPs, branches of Indian company / LLP in IFSC and entities working in RBI / SEBI / IRDAI / PFRDA ecosystem may apply, subject to eligibility.'],
  ['Can a foreign FinTech apply?', 'Yes. A foreign FinTech from a FATF-compliant jurisdiction may apply.'],
  ['What are the types of IFSCA FinTech sandbox?', 'The sandbox routes include Regulatory Sandbox, Innovation Sandbox, Inter-Operable Regulatory Sandbox and Overseas Regulatory Referral / FinTech Bridge.'],
  ['What is IFSCA Regulatory Sandbox?', 'It allows testing of FinTech ideas or solutions in a live environment with real customers / investors under controlled conditions.'],
  ['What is IFSCA Innovation Sandbox?', 'It allows testing of FinTech solutions in isolation from the live market using market-related data made available by regulated entities.'],
  ['What is Inter-Operable Regulatory Sandbox?', 'It applies to hybrid financial products or services involving more than one domestic financial sector regulator.'],
  ['What is the maximum duration of sandbox testing?', 'Sandbox testing may be allowed up to 12 months and may be extended by 6 months upon request, subject to IFSCA approval.'],
  ['What is FinTech Startup Grant?', 'It is a grant of up to Rs. 15 lakh for eligible early-stage FinTech startups developing MVPs.'],
  ['What is PoC Grant?', 'Proof of Concept Grant provides support of up to Rs. 50 lakh for conducting PoC in GIFT IFSC, Indian market or overseas market.'],
  ['What is Sandbox Grant?', 'Sandbox Grant provides support of up to Rs. 30 lakh to FinTech entities selected under IFSCA Sandbox.'],
  ['What is Green FinTech Grant?', 'Green FinTech Grant provides support of up to Rs. 75 lakh for solutions facilitating sustainable finance, ESG and sustainability-linked finance.'],
  ['What is Accelerator Grant?', 'Accelerator Grant provides support of up to Rs. 10 lakh per cohort to eligible accelerators.'],
  ['What is Listing Support Grant?', 'Listing Support Grant provides support of up to Rs. 15 lakh to eligible domestic FinTech entities authorised by IFSCA seeking listing on IFSCA-recognised stock exchanges.'],
  ['Is grant approval automatic?', 'No. Grant approval is subject to eligibility, evaluation, milestone conditions and IFSCA approval.'],
  ['What documents are required for IFSCA FinTech Authorization?', 'Documents generally include incorporation documents, constitutional documents, promoter details, financial statements, business model, technical architecture, revenue track record, regulatory assessment and declarations.'],
  ['Is cyber security assessment required?', 'Security Assessment Report, Security Audit Certificate or VAPT Certificate may be submitted where available and may be mandated by IFSCA for certain applicants.'],
  ['What currency must FinTech Entity use for business?', 'FinTech Entity must transact in freely convertible foreign currency, while administrative expenses may be defrayed in INR through permitted account structure.'],
  ['Can IFSCA revoke sandbox approval?', 'Yes. IFSCA may revoke approval if the entity fails to manage risks, submits false information, violates law, compromises cyber security or acts against user interest.'],
  ['Can a FinTech Entity exit sandbox voluntarily?', 'Yes. It may exit by giving prior written notice and fulfilling obligations towards users.'],
  ['How can Estabizz help with IFSCA FinTech and Startup Incentives?', 'Estabizz assists with route selection, eligibility review, FinTech / TechFin activity mapping, sandbox application, grant documentation, IFSC setup, IFSCA query support and post-authorisation compliance.']
].map(([q, a]) => ({ q, a }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]">
      <table className="data-table my-0 min-w-[720px]">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
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

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id}>{title}</h2>{children}</section>;
}

function Timeline({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="step-timeline">
      {steps.map((step, index) => (
        <div className="step-item" key={step.title}>
          <div className="step-dot" />
          <div className="step-card">
            <div className="step-label">Step {index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FinTechStartupIncentivesPage() {
  return (
    <ServicePageLayout
      tags={[
        { emoji: '🚀', label: 'IFSCA FinTech Entity Advisory' },
        { emoji: '✅', label: 'Direct Authorization Support' },
        { emoji: '🧪', label: 'Limited Use Authorization / Sandbox Support' },
        { emoji: '💡', label: 'Startup Grant Documentation' },
        { emoji: '🌱', label: 'Green FinTech Grant Advisory' },
        { emoji: '🏢', label: 'GIFT IFSC Setup Assistance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'IFSCA FinTech and Startup Incentives' }
      ]}
      title="IFSCA FinTech and Startup Incentives in GIFT IFSC - Complete Registration and Grant Guide"
      heroDescription={
        <p className="m-0">
          <strong>IFSCA FinTech and Startup Incentives</strong> provide a dedicated regulatory and financial support framework for eligible Indian and foreign FinTech / TechFin entities seeking to innovate, test, scale or operate from GIFT IFSC. Under the IFSCA FinTech Entity Framework, eligible applicants may seek Authorization or Limited Use Authorization for sandbox participation, while the IFSCA FinTech Incentive Scheme provides specific grants for startup ideas, proof of concept, sandbox testing, green fintech solutions, accelerators and listing support, subject to eligibility and regulatory approval.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for IFSCA FinTech Authorization</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check Startup Grant Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="27 min read"
      displayYear="2026"
      focusKeyword="IFSCA FinTech and Startup Incentives"
      sections={sections}
      ctaTitle="IFSCA FinTech Authorization"
      ctaDescription="Get structured assistance for FinTech Entity Authorization, sandbox route selection, grant documentation, IFSC setup and post-authorisation compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT IFSC' },
        { label: 'Framework', value: 'FE Framework 2022' },
        { label: 'Scheme', value: 'FinTech Incentive 2022' },
        { label: 'Routes', value: 'Authorization / LUA' },
        { label: 'Max Grant', value: 'Rs. 75 lakh' },
        { label: 'Grant Fee', value: 'USD 100' },
        { label: 'Sandbox', value: '12 + 6 months' }
      ]}
      relatedArticles={[
        { title: 'Finance Company in GIFT IFSC', href: '/ifsca/finance-company-in-gift-ifsc', category: 'IFSCA', description: 'Finance Company and Finance Unit setup in GIFT IFSC.' },
        { title: 'IFSCA BATF Services Registration', href: '/ifsca/batf-services-registration-in-gift-ifsc', category: 'IFSCA', description: 'Book-keeping, accounting, taxation and FCC services in GIFT IFSC.' },
        { title: 'TechFin Authorization', href: '/ifsca/techfin', category: 'IFSCA', description: 'TechFin authorisation for advanced technology solutions in financial services.' },
        { title: 'PSP License IFSCA', href: '/ifsca/psp-license', category: 'IFSCA', description: 'Payment Service Provider authorisation in GIFT IFSC.' },
        { title: 'PPI Registration in India', href: '/rbi/ppi-registration-in-india', category: 'RBI', description: 'RBI authorisation guide for prepaid payment instruments.' }
      ]}
      finalCtaTitle="Start Your IFSCA FinTech and Startup Incentives Journey with Estabizz"
      finalCtaDescription="Build your FinTech or TechFin entry into GIFT IFSC with structured regulatory support, eligibility review, Authorization or Limited Use Authorization route selection, sandbox documentation, startup grant application, accelerator advisory, business model preparation and post-authorisation compliance assistance."
      finalCtaActions={
        <>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all text-center">Speak to IFSCA Compliance Expert</Link>
          <Link href="/get-started" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0077B6] font-bold rounded-xl hover:bg-blue-50 transition-all text-center">Apply for IFSCA FinTech Authorization</Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20 text-center">Check Grant Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl shadow-lg transition-all text-center">WhatsApp Estabizz Team</a>
        </>
      }
    >
      <Section id="quick-overview" title="IFSCA FinTech and Startup Incentives: Quick Overview">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Regulator', body: 'International Financial Services Centres Authority' },
          { title: 'Location', body: 'GIFT IFSC, Gujarat, India' },
          { title: 'Main Framework', body: 'Framework for FinTech Entity in IFSCs dated April 27, 2022' },
          { title: 'Incentive Scheme', body: 'IFSCA FinTech Incentive Scheme, 2022' },
          { title: 'Recognition Routes', body: 'Authorization and Limited Use Authorization' },
          { title: 'Sandbox Types', body: 'Regulatory Sandbox, Innovation Sandbox, IoRS and overseas referral mechanism' },
          { title: 'Eligible Applicants', body: 'Indian and foreign FinTech / TechFin entities' },
          { title: 'Foreign Applicant Condition', body: 'FATF compliant jurisdiction' },
          { title: 'Direct Authorization Requirement', body: 'Deployable solution / working product and revenue earning track record in at least one of last three financial years' },
          { title: 'Sandbox Route', body: 'No mandatory revenue track record or working product requirement at initial testing stage, subject to applicable conditions' },
          { title: 'Grant Range', body: 'Up to Rs. 15 lakh to Rs. 75 lakh depending on grant category' },
          { title: 'Office in IFSC', body: 'Mandatory after Authorization; generally not mandatory during sandbox unless required' }
        ]} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s business model, technology solution, regulatory domain, stage of maturity, FATF jurisdiction, sandbox suitability, grant eligibility and latest IFSCA instructions at the time of filing.</div>
      </Section>

      <Section id="what-are-incentives" title="What are IFSCA FinTech and Startup Incentives?">
        <p>IFSCA FinTech and Startup Incentives refer to the regulatory authorisation and financial support framework available to eligible FinTech and TechFin entities under the IFSCA FinTech Entity Framework and IFSCA FinTech Incentive Scheme. The framework supports innovation in financial services by allowing eligible entities to seek direct authorisation, participate in sandbox testing or apply for specific grants.</p>
        <p>The objective is to position GIFT IFSC as a globally competitive FinTech hub and provide a regulated pathway for domestic and foreign FinTech entities to test, develop and scale financial technology solutions.</p>
      </Section>

      <Section id="gift-ifsc-overview" title="GIFT IFSC and IFSCA Overview for FinTech Startups">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['GIFT City', 'Gujarat International Finance Tec-City, a smart city and commercial business hub in Gandhinagar, Gujarat'],
          ['GIFT IFSC', "India's first International Financial Services Centre located in GIFT City"],
          ['IFSCA', 'Unified regulator for financial products, financial services and financial institutions in IFSC'],
          ['Legal Basis', 'IFSCA Act, 2019 and SEZ framework'],
          ['Main Advantage', 'Global financial services platform operating in specified foreign currencies'],
          ['FinTech Opportunity', 'Regulatory framework for FinTech, TechFin, sandbox testing, innovation and global market access']
        ]} />
        <p>GIFT IFSC provides a platform for domestic FinTechs seeking global expansion and foreign FinTechs seeking access to India or IFSC markets through a recognised regulatory channel.</p>
      </Section>

      <Section id="legal-framework" title="Legal and Regulatory Framework for IFSCA FinTech and Startup Incentives">
        <DataTable headers={['Framework / Scheme', 'Purpose']} rows={[
          ['IFSCA Act, 2019', 'Establishes IFSCA as unified regulator for IFSC'],
          ['Framework for FinTech Entity in IFSCs, April 27, 2022', 'Provides Authorization and Limited Use Authorization framework for FinTech and TechFin entities'],
          ['IFSCA FinTech Incentive Scheme, 2022', 'Provides financial support through specific grants'],
          ['IFSCA Regulatory Sandbox', 'Allows live testing of innovative solutions with limited real users'],
          ['IFSCA Innovation Sandbox', 'Allows isolated testing using market-related data'],
          ['Inter-Operable Regulatory Sandbox', 'For hybrid products involving more than one domestic financial sector regulator'],
          ['Overseas Regulatory Referral / FinTech Bridge', 'For cross-border regulatory referral arrangements']
        ]} />
      </Section>

      <Section id="fintech-vs-techfin" title="FinTech vs TechFin under IFSCA Framework">
        <DataTable headers={['Particular', 'FinTech', 'TechFin']} rows={[
          ['Meaning', 'Financial technology solutions resulting in new business models, applications, processes or products in financial services regulated by IFSCA', 'Advanced or emerging technology solutions aiding financial products, financial services or financial institutions'],
          ['Focus', 'Innovation in financial services', 'Technology support for financial services'],
          ['Examples', 'Digital lending, open banking, wealth tech, robo advisory, insurtech, embedded insurance, cyber insurance', 'AI/ML, big data, blockchain, cyber security, KYC/AML technology, fraud prevention, Web 3.0, RegTech, SupTech'],
          ['Primary Users', 'Financial institutions, customers, investors, intermediaries', 'Banks, capital market participants, insurers, financial institutions and regulated entities']
        ]} />
      </Section>

      <Section id="authorization-vs-lua" title="Authorization vs Limited Use Authorization under IFSCA FinTech Framework">
        <DataTable headers={['Particular', 'Authorization', 'Limited Use Authorization']} rows={[
          ['Purpose', 'Direct entry for mature FinTech / TechFin entities', 'Sandbox testing route'],
          ['Suitable For', 'Entities with deployable solution and revenue track record', 'Early-stage or testing-stage innovation'],
          ['Working Product', 'Required', 'Not mandatory at initial stage depending on sandbox route'],
          ['Revenue Track Record', 'Revenue earning track record in at least one of last three financial years required', 'Not required for sandbox entry'],
          ['Office in IFSC', 'Required after authorization; operations to commence within prescribed time', 'Not required during sandbox unless IFSC bank account or specific condition is required'],
          ['Outcome', 'Authorized FinTech Entity', 'Sandbox testing approval with limited scope'],
          ['Regulatory Status', 'Wider operating permission subject to conditions', 'Testing permission subject to control boundaries']
        ]} />
        <div className="warning-box">Limited Use Authorization should not be represented as final commercial authorization. It allows controlled testing within the sandbox framework.</div>
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for IFSCA FinTech Authorization?">
        <DataTable headers={['Applicant Type', 'Eligibility Position']} rows={[
          ['DPIIT-recognised Indian FinTech startup', 'Eligible'],
          ['Company incorporated in India', 'Eligible'],
          ['LLP incorporated in India', 'Eligible'],
          ['Branch of Indian company or LLP in IFSC', 'Eligible'],
          ['Entity working in RBI / SEBI / IRDAI / PFRDA ecosystem', 'Eligible'],
          ['Foreign FinTech entity', 'Eligible if from FATF-compliant jurisdiction'],
          ['Accelerator', 'Eligible subject to additional criteria'],
          ['Individual applicant', 'May be eligible for grants under certain scheme provisions, but operational authorization generally requires entity structure']
        ]} />
        <div className="info-box">For foreign applicants, the applicant should be from FATF-compliant jurisdictions and should not be from a high-risk jurisdiction subject to call for action.</div>
      </Section>

      <Section id="eligible-activities" title="Eligible Activities under IFSCA FinTech and Startup Incentives">
        <h3>FinTech Activities</h3>
        <DataTable headers={['Sector', 'Illustrative Activities']} rows={[
          ['Banking', 'Remittance and payments, digital lending, Buy Now Pay Later, crowd lending, digital banking / neo banking, open banking'],
          ['Capital Markets and Fund Management', 'Crowdfunding, personal finance, wealth tech, robo advisory, sustainable finance products, alternate trading platforms'],
          ['Insurance', 'InsurTech, digital insurance lifecycle tools, global health insurance innovation, commercial insurance innovation, open insurance, embedded insurance, cyber insurance']
        ]} />
        <h3>TechFin Activities</h3>
        <DataTable headers={['Technology / Allied Area', 'Examples']} rows={[
          ['RegTech / SupTech', 'Regulatory compliance technology and supervisory technology'],
          ['Trade Finance / Digital Banking Support', 'Technology solution aiding trade finance, core banking or banking infrastructure support'],
          ['AI / ML and Big Data', 'Analytics, decision support, automated underwriting and risk models'],
          ['Identity and Security', 'Biometrics, cyber security, digital identity, KYC, AML and CFT tools'],
          ['Blockchain and Web 3.0', 'Distributed ledger technology, tokenisation and decentralised financial technology use cases'],
          ['Fraud Detection and IoT', 'Fraud prevention, risk monitoring and connected device-based financial innovation'],
          ['Green / Sustainable Tech', 'Sustainable finance and ESG-linked technology']
        ]} />
      </Section>

      <Section id="direct-authorization" title="Direct Authorization Route for IFSCA FinTech Entity">
        <p>Direct Authorization is suitable for mature FinTech or TechFin entities that already have a deployable solution or working product and a revenue earning track record in at least one of the last three financial years.</p>
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Eligible Applicant', 'Indian or foreign entity satisfying IFSCA criteria'],
          ['Technology Use', 'Technology must be used in core product, service, business model, distribution model or methodology'],
          ['Deployable Solution', 'Working product must be available'],
          ['Revenue Track Record', 'Revenue earned in at least one of last three financial years'],
          ['Application', 'Submitted in prescribed form with documents'],
          ['Evaluation', 'Reviewed by IFSCA Evaluation Committee'],
          ['IFSC Setup', 'Entity must incorporate in IFSC or establish branch / subsidiary in IFSC after Authorization'],
          ['Books of Accounts', 'Maintained in freely convertible foreign currency'],
          ['Reporting', 'Audited financial statements and regulatory action details to be submitted']
        ]} />
      </Section>

      <Section id="sandbox-route" title="Limited Use Authorization and IFSCA FinTech Sandbox">
        <p>Limited Use Authorization is granted for sandbox participation where a FinTech Entity is permitted to test its idea, solution or innovation under specified conditions and control boundaries. This route is useful for early-stage innovators who need regulatory testing before full deployment.</p>
        <DataTable headers={['Sandbox Eligibility Area', 'Requirement']} rows={[
          ['Innovation', 'Solution should add value to financial services or financial products'],
          ['Need to Test', 'Applicant should demonstrate genuine need for sandbox testing'],
          ['Limited Prior Testing', 'Some offline or internal testing should already be completed'],
          ['User Benefit', 'Direct or indirect benefit to users, investors or financial institutions'],
          ['Risk Controls', 'Proper safeguards and risk management plan'],
          ['Testing Readiness', 'Clear test plan, scenarios, parameters and expected outcomes'],
          ['Exit Strategy', 'Deployment or exit strategy after testing']
        ]} />
        <div className="info-box">Sandbox testing stage may be allowed for up to 12 months and may be extended by 6 months upon request, subject to IFSCA approval.</div>
      </Section>

      <Section id="sandbox-types" title="Types of IFSCA FinTech Sandboxes">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'IFSCA FinTech Regulatory Sandbox', body: 'Allows applicants to test FinTech ideas or solutions in a live environment with real customers or investors under Limited Use Authorization.' },
          { title: 'IFSCA FinTech Innovation Sandbox', body: 'Allows development and testing of FinTech ideas or solutions in isolation from the live market using market-related data made available by regulated entities in IFSC.' },
          { title: 'Inter-Operable Regulatory Sandbox', body: 'Applicable to hybrid financial products or services falling within the regulatory remit of more than one domestic financial sector regulator, with IFSCA as Principal Regulator where applicable.' },
          { title: 'Overseas Regulatory Referral / FinTech Bridge', body: 'Allows eligible applicants to access referral mechanisms based on MoU, collaboration or special arrangement between IFSCA and overseas financial sector regulators.' }
        ]} />
      </Section>

      <Section id="user-protection" title="User Protection and Testing Controls under IFSCA Sandbox">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Risk Disclosure', 'Users must be informed that the solution is being tested in sandbox'],
          ['User Acknowledgement', 'Users must acknowledge understanding of risks'],
          ['Compensation Terms', 'FE must disclose whether users will be compensated for losses'],
          ['Material Changes', 'Prior IFSCA approval required before material changes to solution'],
          ['Interim Reports', 'KPIs, milestones, issues and corrective actions may need to be submitted'],
          ['Final Report', 'Final test outcome report to be submitted within 30 days from expiry of testing period'],
          ['Record Maintenance', 'Testing records to be maintained for 5 years'],
          ['Exit Plan', 'Obligations to users must be fulfilled before exit']
        ]} />
      </Section>

      <Section id="incentive-scheme" title="IFSCA FinTech Incentive Scheme for Startups">
        <p>The IFSCA FinTech Incentive Scheme, 2022 aims to promote the establishment of a world-class FinTech hub at IFSC by providing financial support in the form of specific grants to eligible FinTech Entities.</p>
        <DataTable headers={['Eligible Grant Applicant', 'Description']} rows={[
          ['FinTech Entity in IFSCA Regulatory or Innovation Sandbox', 'Eligible subject to scheme conditions'],
          ['Entity referred under FinTech bridge arrangement', 'Eligible subject to arrangement and conditions'],
          ['Entity participating in IFSCA-supported accelerator / cohort / special programme', 'Eligible'],
          ['Entity referred through MoU / collaboration / special arrangement with IFSCA', 'Eligible']
        ]} />
        <div className="warning-box">A grant is not automatic. Each application is evaluated based on eligibility, regulatory requirements, disclosures, corporate governance norms and other conditions prescribed by IFSCA.</div>
      </Section>

      <Section id="grant-types" title="Types of Grants under IFSCA FinTech and Startup Incentives">
        <DataTable headers={['Grant Category', 'Purpose', 'Maximum Grant Amount']} rows={[
          ['FinTech Startup Grant', 'For early-stage startup with new FinTech idea or solution and MVP development', 'Rs. 15 lakh'],
          ['Proof of Concept Grant', 'For conducting PoC in GIFT IFSC, Indian market or overseas market', 'Rs. 50 lakh'],
          ['Sandbox Grant', 'For FE selected under IFSCA Sandbox to experiment with innovative products or services', 'Rs. 30 lakh'],
          ['Green FinTech Grant', 'For solutions facilitating sustainable finance, ESG and sustainability-linked finance', 'Rs. 75 lakh'],
          ['Accelerator Grant', 'To support accelerators / cohorts at GIFT IFSC', 'Rs. 10 lakh per cohort'],
          ['Listing Support Grant', 'For domestic FE authorised by IFSCA seeking listing on IFSCA-recognised stock exchanges', 'Rs. 15 lakh']
        ]} />
        <div className="info-box">Grant amounts are maximum limits and subject to eligibility, milestone achievement, documentation and IFSCA approval.</div>
      </Section>

      <Section id="grant-conditions" title="Grant Conditions under IFSCA FinTech Incentive Scheme">
        <DataTable headers={['Condition', 'Practical Meaning']} rows={[
          ['Application Review', 'IFSCA scrutinises eligibility, regulatory compliance, KYC/AML, disclosure and governance'],
          ['Evaluation Committee', 'Application evaluated by committee and recommendation made to IFSCA'],
          ['Sanction Letter', 'Grant sanctioned with terms and conditions'],
          ['Milestone-Based Disbursement', 'Disbursement linked to milestones'],
          ['Reimbursement Basis', 'Disbursement generally after submission of documents, invoices and technical reports'],
          ['End-Use Monitoring', 'Internal committee monitors use of funds and progress'],
          ['Refund Obligation', 'Non-compliance may require refund with simple interest as prescribed'],
          ['No Duplicate Grant', 'Same project should not have already received government grant for same scope and activity']
        ]} />
      </Section>

      <Section id="accelerator" title="IFSCA Accelerator Authorization and Grants">
        <p>Accelerators can seek Authorization or Limited Use Authorization as FinTech Entity under the IFSCA framework. Accelerators support FinTechs and TechFins by conducting cohorts and enabling entry into IFSCA sandbox or authorization framework.</p>
        <DataTable headers={['Particular', 'Requirement']} rows={[
          ['Authorization Type', 'Limited Use Authorization or Authorization'],
          ['Indian Accelerator Eligibility', 'DPIIT startup, Indian company / LLP, branch in IFSC or entity linked to financial regulator ecosystem'],
          ['Foreign Accelerator Eligibility', 'Entity from FATF-compliant jurisdiction'],
          ['Minimum Criteria', 'Must satisfy at least two prescribed accelerator criteria'],
          ['Revenue Track Record', 'Required for Authorization route'],
          ['Cohort Requirement', 'At least one cohort per year'],
          ['Minimum Cohort Size', '10 FinTechs / TechFins'],
          ['Cohort Duration', 'Minimum 1 month and maximum 12 months'],
          ['Grant Eligibility', 'Subject to focus area and scheme conditions']
        ]} />
        <ul className="clean-list">
          <li>Operated at least one cohort</li>
          <li>Raised or brought investors with cumulative INR 5 crore funding for supported entities</li>
          <li>Signed MoUs with international industry or academic partners</li>
          <li>Recognised as Technology Business Incubator or received grants from eligible institutions</li>
          <li>Incubated at least 100 startups or at least 10 FinTech startups</li>
          <li>Assisted by government or agency in FATF-compliant jurisdiction</li>
        </ul>
      </Section>

      <Section id="office-setup" title="Office Setup Requirements for IFSCA FinTech Entities">
        <DataTable headers={['Stage', 'Office Requirement']} rows={[
          ['Limited Use Authorization / Sandbox', 'Office in GIFT IFSC generally not mandatory unless bank account or specific condition is required'],
          ['Authorization', 'Office in GIFT IFSC required'],
          ['Post Authorization', 'Entity must commence operations within 120 days or within timeframe specified by IFSCA'],
          ['Permitted Forms', 'Newly incorporated body corporate, subsidiary of Indian or foreign body corporate, or branch of Indian / foreign body corporate in IFSC'],
          ['Bank Account', 'Required with IFSC Banking Unit where funds or remuneration are accepted in specified foreign currency']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for IFSCA FinTech and Startup Incentives">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Applicant Documents', 'Certificate of incorporation / registration, constitutional documents, registered office details and legal form'],
          ['Promoter / Parent Documents', 'Parent / promoter details, FATF jurisdiction confirmation, shareholding pattern and regulatory registration details'],
          ['Business Details', 'Existing FinTech activity, proposed solution, target users, business model and revenue model'],
          ['Technology Documents', 'Technical architecture, AI/ML usage if any, cyber resilience, VAPT if available, BCP and security certifications if available'],
          ['Financial Documents', 'Audited financial statements for last 3 years where applicable, revenue track record details'],
          ['Regulatory Assessment', 'Legal and regulatory assessment of proposed solution and compliance plan'],
          ['Sandbox Documents', 'Test plan, testing scenarios, control boundaries, user disclosure, risk mitigation plan and exit strategy'],
          ['Grant Documents', 'Project proposal, milestone plan, budget, invoices / cost estimates, MVP / PoC plan and end-use declaration'],
          ['Accelerator Documents', 'Cohort details, mentor network, investor support evidence, MoUs, funding track record and incubated startup details'],
          ['Declarations', 'Accuracy declaration, material change undertaking, regulatory compliance undertaking and fit and proper confirmations']
        ]} />
      </Section>

      <Section id="application-process" title="Step-by-Step Process for IFSCA FinTech Authorization and Incentives">
        <Timeline steps={[
          { title: 'Business Model and Technology Assessment', body: 'Evaluate whether the proposed activity is FinTech, TechFin, accelerator, sandbox-ready innovation or grant-eligible project.' },
          { title: 'Route Selection', body: 'Select the correct route: Direct Authorization, Limited Use Authorization, Regulatory Sandbox, Innovation Sandbox, IoRS, Overseas Referral or Grant Application.' },
          { title: 'Eligibility Review', body: 'Review DPIIT status, entity structure, FATF jurisdiction, working product, revenue track record, technology readiness and regulatory domain.' },
          { title: 'Document Preparation', body: 'Prepare application form, business model note, technical architecture, regulatory assessment, cyber security documents, financials and declarations.' },
          { title: 'Sandbox / Authorization Application Filing', body: 'Submit application through the prescribed route such as SWIT portal / IFSCA email / latest IFSCA process.' },
          { title: 'IFSCA Evaluation', body: 'IFSCA Evaluation Committee reviews eligibility, innovation, risk controls, regulatory impact, user protection and business readiness.' },
          { title: 'Deficiency Rectification', body: 'If deficiencies are communicated, respond within prescribed timeline, generally 30 days where applicable.' },
          { title: 'Grant of Authorization or Limited Use Authorization', body: 'IFSCA may grant Authorization or Limited Use Authorization subject to conditions.' },
          { title: 'Sandbox Testing or IFSC Setup', body: 'For sandbox, conduct testing within approved parameters. For Authorization, set up office / branch / subsidiary / entity in IFSC as applicable.' },
          { title: 'Grant Application and Milestone Monitoring', body: 'Where eligible, apply for FinTech incentive grant and complete milestone-based reporting and documentation.' },
          { title: 'Post-Authorization Compliance', body: 'Maintain records, submit reports, comply with IFSCA requirements, report regulatory action and maintain cyber security readiness.' }
        ]} />
      </Section>

      <Section id="fees-timeline" title="Fees and Indicative Timeline for IFSCA FinTech Authorization">
        <h3>Fees for IFSCA FinTech and Startup Incentives</h3>
        <DataTable headers={['Application Type', 'Fee']} rows={[
          ['FinTech Grant Application', 'USD 100'],
          ['Accelerator Grant Application', 'USD 100'],
          ['Authorization / Limited Use Authorization', 'As specified in latest IFSCA fee circular'],
          ['Other Regulatory Applications', 'As applicable under latest IFSCA instructions']
        ]} />
        <div className="warning-box">Fees should be verified from the latest IFSCA fee circular at the time of filing.</div>
        <h3>Indicative Timeline</h3>
        <DataTable headers={['Stage', 'Estimated Duration']} rows={[
          ['Business Model Review', '1 to 2 weeks'],
          ['Document Preparation', '2 to 4 weeks'],
          ['Application Filing', 'Case-specific'],
          ['IFSCA Screening / Evaluation', '30 working days or more depending on route and completeness'],
          ['Sandbox Testing', 'Up to 12 months, extendable by 6 months where permitted'],
          ['Authorization / IFSC Setup', 'Subject to IFSCA review and applicant readiness'],
          ['Grant Disbursement', 'Milestone and reimbursement-based, subject to IFSCA approval']
        ]} />
        <p>The timeline is indicative and may vary depending on documentation quality, regulatory scrutiny, complexity of technology solution, sandbox testing scope and IFSCA review.</p>
      </Section>

      <Section id="post-authorization-compliance" title="Post-Authorization Compliance for IFSCA FinTech Entities">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Books and Records', 'Maintain books, records and documents in freely convertible foreign currency'],
          ['Financial Statements', 'Submit audited annual financial statements within prescribed timeline'],
          ['Financial Reporting', 'Submit financial information in USD unless otherwise specified'],
          ['Regulatory Action Reporting', 'Report regulatory action within prescribed timeline'],
          ['Authorized Representative', 'Appoint authorized person to represent before IFSCA'],
          ['Cyber Security', 'Maintain proper cyber security systems against cyber threats, data leakage and payment security risks'],
          ['VAPT / Security Assessment', 'Submit where available or where required by IFSCA'],
          ['Material Change', 'Notify IFSCA of material changes'],
          ['User Protection', 'Maintain disclosures, grievance process and user risk acknowledgement during sandbox'],
          ['Record Retention', 'Maintain testing and exit records for prescribed period'],
          ['Default Risk', 'IFSCA may withdraw / cancel authorization for wrong or incomplete information']
        ]} />
      </Section>

      <Section id="ecosystem" title="GIFT IFSC FinTech Ecosystem and Market Opportunity">
        <p>GIFT IFSC is emerging as a preferred global FinTech hub with growing participation across banking, capital markets, insurance, fund management, finance company activities, financial support services and technology-enabled platforms.</p>
        <ul className="clean-list">
          <li>IFSCA registrations / authorisations reached 1,100 as of December 31, 2025, including in-principle / provisional registrations.</li>
          <li>As of December 2025, there were 7 entities under the sandbox framework and 43 cumulative exits.</li>
          <li>Financial support service entities including TechFin, Ancillary Services, BATF and GIC rose to 143 as of December 2025.</li>
          <li>IFSCA participated in Global FinTech Festival 2025 and highlighted GIFT IFSC as an emerging financial gateway.</li>
          <li>Foreign Currency Settlement System was launched at Global FinTech Festival 2025 to support foreign currency settlement in GIFT IFSC.</li>
        </ul>
        <div className="info-box">These numbers are ecosystem indicators and should not be treated as a guarantee of approval, grant sanction or business success.</div>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in IFSCA FinTech and Startup Incentive Applications">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Confusing FinTech Authorization with Startup India recognition', 'Wrong regulatory approach'],
          ['Applying for Authorization without working product', 'Application may not satisfy direct route criteria'],
          ['No revenue track record for Authorization', 'Eligibility issue'],
          ['Weak innovation explanation', 'Sandbox suitability concern'],
          ['No clear user benefit', 'Application may be questioned'],
          ['Poor risk mitigation plan', 'Sandbox approval risk'],
          ['No cyber security documentation', 'Technology readiness concern'],
          ['No exit strategy for sandbox', 'Regulatory query'],
          ['Assuming grant is automatic', 'Financial planning risk'],
          ['Applying for wrong grant category', 'Rejection or delay'],
          ['Foreign applicant from high-risk FATF jurisdiction', 'Eligibility concern'],
          ['No IFSC setup plan after Authorization', 'Operational readiness gap']
        ]} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with IFSCA FinTech and Startup Incentives">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'FinTech / TechFin Activity Assessment', body: 'We help identify whether the proposed solution falls under FinTech, TechFin, accelerator, sandbox or grant-eligible category.' },
          { title: 'Route Selection', body: 'We assist in selecting the correct route between Authorization, Limited Use Authorization, Regulatory Sandbox, Innovation Sandbox, IoRS and overseas referral.' },
          { title: 'Eligibility Review', body: 'We review DPIIT status, entity structure, FATF jurisdiction, working product, revenue track record and regulatory domain.' },
          { title: 'Business and Technology Documentation', body: 'We prepare business model note, solution summary, technical architecture, user benefit explanation, revenue model and regulatory assessment.' },
          { title: 'Sandbox Application Support', body: 'We assist with sandbox testing plan, risk controls, user disclosures, grievance framework, test parameters and exit strategy.' },
          { title: 'Grant Application Support', body: 'We assist with Startup Grant, PoC Grant, Sandbox Grant, Green FinTech Grant, Accelerator Grant and Listing Support Grant documentation.' },
          { title: 'Accelerator Advisory', body: 'We help accelerators prepare cohort details, eligibility evidence, mentor / investor support documents and application dossier.' },
          { title: 'GIFT IFSC Setup Assistance', body: 'We support IFSC entity setup, branch / subsidiary structuring, bank account coordination and SEZ-related documentation where applicable.' },
          { title: 'Post-Authorization Compliance', body: 'We support annual reporting, cyber documentation, regulatory action reporting, material change updates and ongoing IFSCA compliance.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for IFSCA FinTech and Startup Incentives?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands GIFT IFSC regulatory expectations.' },
          { title: 'FinTech and Compliance Understanding', body: 'We combine regulatory, fintech, business model and documentation understanding for mature and early-stage entities.' },
          { title: 'Grant Documentation Strength', body: 'We help prepare practical grant applications with milestone clarity, cost justification and regulatory presentation.' },
          { title: 'Sandbox Readiness Approach', body: 'We focus on test design, risk controls, user protection, cyber readiness and exit strategy.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA helps in hybrid FinTech models touching multiple regulatory domains.' },
          { title: 'End-to-End Support', body: 'From eligibility review to application, query support, IFSC setup and post-authorisation compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on IFSCA FinTech and Startup Incentives">
        <div className="faq-accordion">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.q}>
              <summary>{faq.q}</summary>
              <div>{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewed by Estabizz Compliance Expert">
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, FinTech Entity Framework, sandbox authorisation, startup incentive documentation, TechFin advisory and post-authorisation compliance.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help FinTech startups, TechFin companies, accelerators, foreign fintechs and financial technology innovators understand the broad IFSCA framework for FinTech Entity Authorization and Startup Incentives in GIFT IFSC.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, grant conditions, eligibility criteria, fees, sandbox rules, reporting obligations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.</div>
      </Section>
    </ServicePageLayout>
  );
}
