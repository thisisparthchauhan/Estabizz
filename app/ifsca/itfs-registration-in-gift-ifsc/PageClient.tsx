'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'IFSCA ITFS Registration: Quick Overview' },
  { id: 'what-is-registration', title: 'What is IFSCA ITFS Registration?' },
  { id: 'why-gift-ifsc', title: 'Why GIFT IFSC for Trade Finance?' },
  { id: 'legal-framework', title: 'Legal and Regulatory Framework' },
  { id: 'what-is-platform', title: 'What is an ITFS Platform?' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'owned-fund', title: 'Minimum Owned Fund Requirement' },
  { id: 'permissible-activities', title: 'Permissible Activities' },
  { id: 'participants', title: 'Eligible Participants' },
  { id: 'financier-criteria', title: 'Financier Eligibility Criteria' },
  { id: 'operational-principles', title: 'Principles of ITFS Operations' },
  { id: 'technology', title: 'Technology Infrastructure Requirements' },
  { id: 'risk-outsourcing', title: 'Risk Management and Outsourcing' },
  { id: 'currency-books', title: 'Currency, Books and SNRR Account' },
  { id: 'clearing-settlement', title: 'Clearing and Settlement' },
  { id: 'registration-process', title: 'Registration Process through SWIT' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'fees-timeline', title: 'Fees and Timeline' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'comparison', title: 'ITFS vs TReDS vs Finance Company' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  ['What is IFSCA ITFS Registration?', 'IFSCA ITFS Registration is the registration required to set up and operate an International Trade Finance Services Platform in GIFT IFSC.'],
  ['What does ITFS mean?', 'ITFS means International Trade Finance Services Platform.'],
  ['Who regulates ITFS platforms in GIFT IFSC?', 'ITFS platforms in GIFT IFSC are regulated by the International Financial Services Centres Authority.'],
  ['What is the role of an ITFS platform?', 'An ITFS platform facilitates trade finance transactions between exporters, importers, financiers, insurers / credit guarantee institutions, PSPs and other permitted participants.'],
  ['Can ITFS operator provide loans directly?', 'ITFS operator acts as a platform facilitator and should not assume credit risk on transactions carried out on its platform.'],
  ['What is the minimum capital for ITFS registration?', 'The ITFS operator must maintain minimum owned fund of USD 0.2 million at all times.'],
  ['What legal structure is required for ITFS operator?', 'The applicant should be set up as a newly incorporated company under the Companies Act, 2013.'],
  ['Is parent experience required?', 'Yes. The parent entity should have at least three years of experience in operating trading infrastructure in financial markets or operating a fintech platform.'],
  ['What activities can an ITFS platform facilitate?', 'It can facilitate factoring, reverse factoring, bill discounting under LC, supply chain finance, pre-shipment credit, forfaiting, secondary market transactions for permitted products and other activities permitted by IFSCA.'],
  ['Who can participate on an ITFS platform?', 'Exporters, importers, financiers, insurance / credit guarantee institutions, payment service providers and other entities permitted by IFSCA may participate.'],
  ['What are the eligibility requirements for financiers?', 'Financiers should meet requirements such as minimum USD 5 million AUM or loans and advances, at least USD 5 million capital, credit recovery capability, credible management and FATF-compliant jurisdiction.'],
  ['Is AML / KYC compliance required?', 'Yes. ITFS operators must comply with applicable IFSCA AML, CFT and KYC Guidelines.'],
  ['Is transparent bidding mandatory?', 'Yes. The ITFS operator should enable transparent bidding on the platform.'],
  ['Can ITFS connect with other platforms?', 'ITFS may connect with other electronic platforms or market infrastructure with prior approval from IFSCA.'],
  ['Is grievance redressal required?', 'Yes. ITFS operator must establish complaint handling and grievance redressal mechanism.'],
  ['What technology infrastructure is required?', 'The operator should have an electronic platform, MIS and online surveillance capability to monitor positions, prices and volumes in real time.'],
  ['Can ITFS outsource technology functions?', 'ITFS operator may tie up with technology providers, system integrators and other entities, but regulatory responsibility remains with the operator.'],
  ['In which currency are books maintained?', 'ITFS operator must maintain books of accounts, records and documents in USD.'],
  ['In which currency can transactions be settled?', 'Transactions on ITFS may be settled in any specified foreign currency.'],
  ['Can ITFS operator open SNRR account?', 'Yes. ITFS operator may open SNRR account under the applicable FEMA Deposit Regulations, as amended.'],
  ['Does ITFS registration allow clearing and settlement of funds?', 'No automatic permission should be assumed. If the ITFS operator intends to provide clearing and / or settlement of funds, it must seek authorisation as a payment system operator under IFSCA Payment and Settlement Systems Regulations, 2024.'],
  ['Is ITFS same as TReDS?', 'No. ITFS is an IFSC-based international trade finance platform regulated by IFSCA, while TReDS is a domestic receivables financing platform regulated by RBI.'],
  ['How is the ITFS application filed?', 'The application is filed through the IFSCA Single Window IT System or any other prescribed process.'],
  ['Can provisional registration be granted?', 'Yes. Based on complete information, provisional registration may be granted subject to specified conditions.'],
  ['When can ITFS operations commence?', 'Operations can commence after registration is granted and specified conditions are fulfilled.'],
  ['Is risk management framework required?', 'Yes. ITFS operator must put in place a comprehensive risk management framework covering all aspects of operations.'],
  ['Can legal proceedings between financier and participant be handled by ITFS?', 'Legal proceedings initiated by financiers or participants remain outside the purview of ITFS.'],
  ['What documents are required for ITFS registration?', 'Documents generally include incorporation documents, parent experience proof, capital documents, business plan, technology architecture, AML / KYC policy, risk management policy, grievance policy and SWIT application forms.'],
  ['How long does ITFS registration take?', 'The timeline is indicative and depends on documentation quality, technology readiness, regulatory review and query cycles.'],
  ['How can Estabizz help with IFSCA ITFS Registration?', 'Estabizz assists with business model assessment, IFSC entity structuring, parent experience documentation, capital readiness, technology documentation, AML / KYC policy, risk framework, SWIT filing, IFSCA query support and post-registration compliance.']
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

export default function ItfsRegistrationPage() {
  return (
    <ServicePageLayout
      tags={[
        { emoji: '🌐', label: 'IFSCA Regulatory Advisory' },
        { emoji: '📄', label: 'ITFS Operator Setup' },
        { emoji: '💼', label: 'USD 0.2 Million Capital Guidance' },
        { emoji: '🔁', label: 'Trade Finance Platform Structuring' },
        { emoji: '🖥️', label: 'SWIT Application Support' },
        { emoji: '✅', label: 'AML / KYC Compliance Framework' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'IFSCA ITFS Registration' }
      ]}
      title="IFSCA ITFS Registration in GIFT IFSC - Complete Guide for International Trade Finance Platform"
      heroDescription={
        <p className="m-0">
          <strong>IFSCA ITFS Registration</strong> enables an eligible entity to set up and operate an International Trade Finance Services Platform in GIFT IFSC. An ITFS platform facilitates trade finance transactions such as factoring, reverse factoring, bill discounting under Letter of Credit, supply chain finance, pre-shipment credit, forfaiting and other permitted activities by connecting exporters, importers, financiers, insurance / credit guarantee institutions, payment service providers and other eligible participants.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for ITFS Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check ITFS Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="24 min read"
      displayYear="2026"
      focusKeyword="IFSCA ITFS Registration"
      sections={sections}
      ctaTitle="Apply for ITFS Registration"
      ctaDescription="Get structured support for ITFS operator setup, trade finance platform documentation, AML / KYC controls, SWIT filing and post-registration compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT IFSC' },
        { label: 'Model', value: 'ITFS Platform' },
        { label: 'Entity', value: 'Company' },
        { label: 'Owned Fund', value: 'USD 0.2 million' },
        { label: 'Application', value: 'SWIT' },
        { label: 'Credit Risk', value: 'Not assumed' },
        { label: 'Books', value: 'USD' }
      ]}
      relatedArticles={[
        { title: 'Finance Company in GIFT IFSC', href: '/ifsca/finance-company-in-gift-ifsc', category: 'IFSCA', description: 'Finance Company and Finance Unit setup in GIFT IFSC.' },
        { title: 'IFSCA Factoring License in GIFT City', href: '/regulatory/ifsca-factoring-license-gift-city', category: 'IFSCA', description: 'Factor registration and receivables assignment framework in GIFT IFSC.' },
        { title: 'IFSCA FinTech and Startup Incentives', href: '/ifsca/ifsca-fintech-startup-incentives', category: 'IFSCA', description: 'FinTech Entity Authorization, sandbox and incentive grants.' },
        { title: 'PSP License IFSCA', href: '/ifsca/psp-license', category: 'IFSCA', description: 'Payment Service Provider authorisation in GIFT IFSC.' },
        { title: 'Payment Aggregator License in India', href: '/rbi/payment-aggregator-license-in-india', category: 'RBI', description: 'RBI payment aggregator authorisation guide.' }
      ]}
      finalCtaTitle="Start Your IFSCA ITFS Registration Journey with Estabizz"
      finalCtaDescription="Build your International Trade Finance Services Platform in GIFT IFSC with structured regulatory support, business model assessment, IFSC entity structuring, USD 0.2 million capital readiness, technology documentation, AML / KYC framework, SWIT application and post-registration compliance assistance."
      finalCtaActions={
        <>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all text-center">Speak to IFSCA Compliance Expert</Link>
          <Link href="/get-started" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0077B6] font-bold rounded-xl hover:bg-blue-50 transition-all text-center">Apply for ITFS Registration</Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20 text-center">Check ITFS Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl shadow-lg transition-all text-center">WhatsApp Estabizz Team</a>
        </>
      }
    >
      <Section id="quick-overview" title="IFSCA ITFS Registration: Quick Overview">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Regulator', body: 'International Financial Services Centres Authority' },
          { title: 'Location', body: 'GIFT IFSC, Gujarat, India' },
          { title: 'Business Model', body: 'International Trade Finance Services Platform' },
          { title: 'Registration Type', body: 'ITFS Operator Registration' },
          { title: 'Eligible Structure', body: 'Newly incorporated company under Companies Act, 2013' },
          { title: 'Parent Experience', body: 'Parent entity should have at least 3 years of experience in operating trading infrastructure in financial markets or operating a fintech platform' },
          { title: 'Minimum Owned Fund', body: 'USD 0.2 million at all times' },
          { title: 'Application System', body: 'IFSCA Single Window IT System / SWIT' },
          { title: 'Participants', body: 'Exporters, importers, financiers, insurers / credit guarantee institutions, PSPs and other permitted entities' },
          { title: 'Key Products', body: 'Factoring, reverse factoring, LC bill discounting, supply chain finance, pre-shipment credit and forfaiting' },
          { title: 'Credit Risk', body: 'ITFS operator should not assume credit risk on transactions carried out on its platform' },
          { title: 'Compliance', body: 'AML, CFT, KYC, risk management, grievance redressal and technology infrastructure' }
        ]} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s platform model, parent experience, technology readiness, participant onboarding model, trade finance products, settlement architecture, AML / KYC framework and latest IFSCA guidelines at the time of filing.</div>
      </Section>

      <Section id="what-is-registration" title="What is IFSCA ITFS Registration?">
        <p>IFSCA ITFS Registration refers to registration granted by the International Financial Services Centres Authority to an eligible entity for setting up and operating an International Trade Finance Services Platform in IFSC. The ITFS platform acts as a facilitator for trade finance transactions by enabling exporters, importers, financiers, insurance / credit guarantee institutions and other permitted participants to participate in digital trade finance transactions.</p>
        <div className="warning-box">An ITFS operator is not meant to assume credit risk on transactions carried out on its platform. Its core role is to operate compliant digital infrastructure that facilitates transparent trade finance transactions.</div>
      </Section>

      <Section id="why-gift-ifsc" title="Why GIFT IFSC for International Trade Finance?">
        <p>GIFT IFSC has been designed to onshore international financial services business that was historically undertaken from offshore centres such as Singapore, Hong Kong, Dubai, London, Mauritius, Luxembourg and Ireland. Trade finance is a natural opportunity for GIFT IFSC because India&apos;s export ambitions, global supply chain integration and cross-border capital flows require efficient, transparent and globally connected financing infrastructure.</p>
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Gateway for International Financial Services', body: 'GIFT IFSC supports inbound and outbound international financial services from India.' },
          { title: 'Foreign Currency Flexibility', body: 'Entities in IFSC can transact in specified foreign currencies, subject to applicable framework.' },
          { title: 'Trade Finance Opportunity', body: 'India export growth and global trade participation create demand for modern trade finance platforms.' },
          { title: 'Technology-Enabled Finance', body: 'ITFS enables digital workflows, transparent bidding and access to a wider pool of financiers.' },
          { title: 'Global Capital Access', body: 'GIFT IFSC allows global financiers to participate in India-linked trade finance opportunities.' },
          { title: 'Unified Regulator', body: 'IFSCA acts as the unified regulator for financial products, financial services and financial institutions in IFSC.' }
        ]} />
      </Section>

      <Section id="legal-framework" title="Legal and Regulatory Framework for IFSCA ITFS Registration">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'International Financial Services Centres Authority'],
          ['Location', 'GIFT IFSC, Gujarat'],
          ['Framework', 'Guidelines on setting up and operation of International Trade Finance Services Platform'],
          ['Applicable Entities', 'Existing ITFS operators, entities seeking registration as ITFS operator and participants in ITFS'],
          ['Application Mode', 'SWIT / IFSCA prescribed process'],
          ['Eligible Applicant Structure', 'Newly incorporated company under Companies Act, 2013'],
          ['Capital Requirement', 'USD 0.2 million minimum owned fund at all times'],
          ['Core Regulatory Focus', 'Platform governance, participant onboarding, technology infrastructure, transparent bidding, AML / KYC, risk management and grievance redressal']
        ]} />
        <p>The ITFS framework should be read with applicable IFSCA AML, CFT and KYC Guidelines, payment and settlement framework and any other circular or guideline issued by IFSCA from time to time.</p>
      </Section>

      <Section id="what-is-platform" title="What is an International Trade Finance Services Platform?">
        <p>An International Trade Finance Services Platform is a digital platform that facilitates international trade finance transactions between eligible participants. It enables trade finance products such as factoring, reverse factoring, bill discounting under Letter of Credit, supply chain finance, pre-shipment credit and forfaiting through a structured electronic platform.</p>
        <div className="info-box"><strong>Simple flow:</strong> Exporter / Importer → uploads trade finance requirement → ITFS platform enables transparent bidding / participation → financier provides funding → settlement in specified foreign currency → transaction monitoring, records and grievance mechanism.</div>
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for IFSCA ITFS Registration?">
        <DataTable headers={['Applicant Type', 'Eligibility Position', 'Remarks']} rows={[
          ['Newly incorporated company in IFSC', 'Eligible', 'Must be incorporated under Companies Act, 2013'],
          ['Fintech platform group', 'Eligible', 'Parent should have relevant platform / fintech experience'],
          ['Trading infrastructure operator', 'Eligible', 'Parent should have at least 3 years of relevant experience'],
          ['Trade finance platform sponsor', 'Eligible', 'Must demonstrate technology and compliance readiness'],
          ['Finance Company alone', 'Not automatically ITFS', 'Separate ITFS operator registration required'],
          ['LLP / Trust', 'Not suitable based on current framework', 'ITFS operator should be newly incorporated company']
        ]} />
        <p>The applicant&apos;s parent entity should have at least three years of experience in operating trading infrastructure in financial markets or operating a financial technology platform.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for IFSCA ITFS Registration">
        <DataTable headers={['Criteria', 'Requirement', 'Practical Meaning']} rows={[
          ['Legal Form', 'Newly incorporated company under Companies Act, 2013', 'Applicant should be set up as a company'],
          ['Parent Experience', 'Minimum 3 years experience in trading infrastructure or fintech platform', 'Demonstrates operational capability'],
          ['Capital', 'USD 0.2 million owned fund at all times', 'Financial readiness requirement'],
          ['Technology Infrastructure', 'Electronic platform, MIS and online surveillance capability', 'Platform must support digital trade finance operations'],
          ['Real-Time Monitoring', 'Monitor positions, prices and volumes in real time', 'Required for market integrity'],
          ['AML / KYC', 'Comply with IFSCA AML, CFT and KYC Guidelines, 2022', 'Participant due diligence and compliance'],
          ['Grievance Redressal', 'Complaint handling mechanism required', 'Participant protection'],
          ['Risk Management', 'Comprehensive risk management framework', 'Covers operational, technology and compliance risk']
        ]} />
      </Section>

      <Section id="owned-fund" title="Minimum Owned Fund Requirement for IFSCA ITFS Registration">
        <DataTable headers={['Requirement', 'Amount', 'Nature']} rows={[
          ['Minimum Owned Fund', 'USD 0.2 million', 'To be maintained at all times']
        ]} />
        <p>The ITFS operator must maintain the minimum owned fund requirement continuously after registration. Where additional activities or payment / settlement functions are proposed, additional regulatory authorisation may be required.</p>
        <div className="info-box">Capital planning should be supported by proper corporate approvals, bank documentation, auditor certification and financial projections.</div>
      </Section>

      <Section id="permissible-activities" title="Permissible Activities under IFSCA ITFS Registration">
        <DataTable headers={['Permissible Activity', 'Meaning']} rows={[
          ['Factoring', 'Financing against assignment of receivables'],
          ['Reverse Factoring', 'Buyer-led financing arrangement for supplier receivables'],
          ['Bill Discounting under Letter of Credit', 'Discounting trade bills backed by LC'],
          ['Supply Chain Financing', 'Financing trade flows across supplier-buyer ecosystem'],
          ['Pre-Shipment Credit', 'Finance before shipment of goods or services'],
          ['Forfaiting', 'Discounting medium / long-term trade receivables without recourse'],
          ['Secondary Market Transactions', 'Secondary market transactions for permitted products'],
          ['Other Activity', 'Any other activity permitted by IFSCA with prior permission']
        ]} />
        <div className="warning-box">The ITFS operator should act as a platform facilitator and should not assume credit risk on transactions carried out on its platform.</div>
      </Section>

      <Section id="participants" title="Participants on an ITFS Platform">
        <DataTable headers={['Participant', 'Role']} rows={[
          ['Exporters', 'Raise trade finance requirements'],
          ['Importers', 'Participate in buyer-led or trade settlement arrangements'],
          ['Financiers', 'Provide funding against eligible trade finance transactions'],
          ['Insurance / Credit Guarantee Institutions', 'Provide insurance or guarantee support where applicable'],
          ['Payment Service Providers', 'Support payment-related services, subject to regulatory permission'],
          ['Other Entities Permitted by IFSCA', 'Participate as allowed under IFSCA framework']
        ]} />
      </Section>

      <Section id="financier-criteria" title="Financier Eligibility Criteria on ITFS Platform">
        <DataTable headers={['Criteria', 'Requirement']} rows={[
          ['AUM / Loans and Advances', 'Minimum USD 5 million AUM or gross loans and advances in current or previous financial year'],
          ['Capital', 'At least USD 5 million capital'],
          ['Recovery Capability', 'Proven capability for credit / debt recovery'],
          ['Management Team', 'Credible management team with credit and collection experience'],
          ['Entity Status', 'Incorporated entity carrying out factoring business'],
          ['Jurisdiction', 'Entity and shareholders should be from FATF-compliant jurisdiction']
        ]} />
        <p>The ITFS operator must ensure that financiers onboarded as participants satisfy the prescribed eligibility criteria.</p>
      </Section>

      <Section id="operational-principles" title="Principles of Operations for ITFS Operator">
        <DataTable headers={['Principle', 'Practical Requirement']} rows={[
          ['AML / CFT / KYC Compliance', 'Follow applicable IFSCA AML, CFT and KYC Guidelines, 2022'],
          ['Transparent Bidding', 'Enable fair and transparent bidding on the platform'],
          ['No Credit Risk Assumption', 'ITFS operator should not assume credit risk on platform transactions'],
          ['Legal Proceedings', 'Proceedings between financiers and participants remain outside ITFS purview'],
          ['Platform Connectivity', 'May connect with other electronic platform or market infrastructure with prior approval'],
          ['Grievance Redressal', 'Complaint handling and grievance redressal mechanism required'],
          ['Market Integrity', 'Monitor platform activity and maintain proper records']
        ]} />
      </Section>

      <Section id="technology" title="Technology Infrastructure for IFSCA ITFS Registration">
        <p>An ITFS operator must demonstrate strong technology readiness because the business is platform-driven and depends on secure, transparent and real-time digital processing.</p>
        <DataTable headers={['Technology Requirement', 'Practical Meaning']} rows={[
          ['Electronic Platform', 'Platform access for all eligible participants'],
          ['Management Information System', 'MIS for monitoring operations, participants and transactions'],
          ['Online Surveillance', 'Real-time monitoring of positions, prices and volumes'],
          ['Cyber Security Controls', 'Secure access, encryption, authentication and monitoring'],
          ['Audit Trail', 'Complete record of bids, transactions, approvals and settlements'],
          ['Participant Onboarding Workflow', 'Digital onboarding with KYC and eligibility checks'],
          ['Reporting Dashboard', 'Regulatory, operational and management reporting capability'],
          ['Business Continuity Plan', 'Continuity and disaster recovery arrangements'],
          ['Data Security', 'Secure storage and controlled access to platform data']
        ]} />
      </Section>

      <Section id="risk-outsourcing" title="Risk Management and Outsourcing for ITFS Operator">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Operational Risk', body: 'Controls for participant onboarding, transaction processing, reconciliation and exception handling.' },
          { title: 'Technology Risk', body: 'Cyber security, platform availability, data integrity, surveillance and incident response.' },
          { title: 'Compliance Risk', body: 'AML / KYC, FATF checks, IFSCA reporting, participant due diligence and regulatory conditions.' },
          { title: 'Market Conduct Risk', body: 'Transparent bidding, fair access, conflict management and avoidance of manipulation.' },
          { title: 'Outsourcing Risk', body: 'Vendor due diligence, service level agreements, audit rights and continuity obligations.' },
          { title: 'Grievance Risk', body: 'Complaint handling, escalation matrix and participant protection mechanism.' }
        ]} />
        <p>An ITFS operator may tie up with technology providers, system integrators and other entities for onboarding participants. However, regulatory responsibility remains with the ITFS operator.</p>
      </Section>

      <Section id="currency-books" title="Currency of Operations, Books and SNRR Account">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Books of Accounts', 'Maintained in USD'],
          ['Records and Documents', 'Maintained in USD'],
          ['Transaction Settlement', 'May be settled in any specified foreign currency'],
          ['SNRR Account', 'ITFS operator may open SNRR account under FEMA Deposit Regulations, as amended'],
          ['Administrative Expenses', 'To be handled as permitted under applicable IFSC / FEMA framework']
        ]} />
        <p>Currency structuring should be aligned with IFSCA and FEMA requirements and should be reviewed before operational launch.</p>
      </Section>

      <Section id="clearing-settlement" title="Clearing and Settlement under ITFS Platform">
        <p>An ITFS operator that intends to provide clearing and / or settlement of funds must seek authorisation from IFSCA as a payment system operator under the IFSCA Payment and Settlement Systems Regulations, 2024.</p>
        <DataTable headers={['Scenario', 'Regulatory Position']} rows={[
          ['ITFS operator only facilitates trade finance platform', 'ITFS registration required'],
          ['ITFS operator also provides clearing / settlement of funds', 'Payment system operator authorisation may be required'],
          ['External settlement through permitted payment participants', 'Must align with IFSCA directions and participant roles'],
          ['Payment Service Provider participation', 'Permitted subject to applicable IFSCA framework']
        ]} />
        <div className="warning-box">ITFS registration does not automatically permit payment system operation. Payment system authorisation may be separately required.</div>
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for IFSCA ITFS Registration">
        <Timeline steps={[
          { title: 'Business Model and Platform Assessment', body: 'Review whether the proposed model qualifies as ITFS platform and identify permitted products such as factoring, reverse factoring, LC bill discounting, supply chain finance, pre-shipment credit and forfaiting.' },
          { title: 'Entity Incorporation in IFSC', body: 'Set up a newly incorporated company under Companies Act, 2013 for ITFS operator activity in GIFT IFSC.' },
          { title: 'Parent Experience Review', body: 'Verify parent entity minimum three years experience in operating trading infrastructure in financial markets or fintech platform.' },
          { title: 'Capital Planning', body: 'Arrange minimum owned fund of USD 0.2 million and prepare supporting financial documentation.' },
          { title: 'Technology and Compliance Documentation', body: 'Prepare platform architecture, MIS, surveillance capability, cyber controls, AML / KYC policy, grievance redressal framework and risk management framework.' },
          { title: 'SWIT Application Filing', body: 'File application through IFSCA Single Window IT System with prescribed documents and fees.' },
          { title: 'IFSCA Review', body: 'IFSCA reviews applicant eligibility, parent experience, technology readiness, capital, platform operations, participant onboarding and risk controls.' },
          { title: 'Provisional Registration', body: 'Based on complete information, IFSCA may grant provisional registration subject to specified conditions.' },
          { title: 'Condition Fulfilment', body: 'Fulfil conditions relating to capital, infrastructure, technology, policies, SEZ / IFSC setup and regulatory requirements.' },
          { title: 'Grant of Registration', body: 'Registration is granted after fulfilment of specified conditions.' },
          { title: 'Commencement of Operations', body: 'Commence ITFS operations with compliant onboarding, platform surveillance, reporting and grievance redressal mechanism.' }
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for IFSCA ITFS Registration">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Entity Documents', 'Certificate of incorporation, MOA, AOA, PAN / tax details, registered office details and board resolution'],
          ['IFSC Setup Documents', 'IFSC unit setup documents, SEZ / LOA documents, office details and infrastructure plan'],
          ['Parent Entity Documents', 'Parent profile, proof of 3 years experience in trading infrastructure or fintech platform, financial statements and ownership details'],
          ['Capital Documents', 'Proof of USD 0.2 million owned fund, bank statements, auditor certificate and capital infusion documents'],
          ['Business Plan', 'ITFS platform model, trade finance products, participant strategy, revenue model, financial projections and operational roadmap'],
          ['Technology Documents', 'Platform architecture, MIS capability, online surveillance framework, cyber security controls, BCP / DR plan and audit trail framework'],
          ['Participant Onboarding Documents', 'Eligibility checks for exporters, importers, financiers, insurers / credit guarantee institutions and PSPs'],
          ['AML / KYC Documents', 'IFSCA AML, CFT and KYC policy, FATF screening process, sanctions screening and due diligence framework'],
          ['Risk Documents', 'Comprehensive risk management policy, outsourcing policy, grievance redressal policy and incident response process'],
          ['Settlement Documents', 'Currency and settlement flow, SNRR account plan, payment system authorisation assessment if clearing / settlement is proposed'],
          ['Application Documents', 'SWIT application, fee payment proof, declarations and IFSCA-prescribed forms']
        ]} />
      </Section>

      <Section id="fees-timeline" title="Fees and Timeline for IFSCA ITFS Registration">
        <h3>Government Fees</h3>
        <DataTable headers={['Fee Type', 'Amount / Basis']} rows={[
          ['Application Fee', 'As per latest IFSCA fee circular'],
          ['Registration Fee', 'As per latest IFSCA fee circular'],
          ['Annual Recurring Fee', 'As per latest IFSCA fee circular'],
          ['Additional Authorisation Fee', 'May apply if payment system authorisation is required']
        ]} />
        <div className="warning-box">Fees must be verified from the latest IFSCA fee circular applicable at the time of filing.</div>
        <h3>Indicative Timeline</h3>
        <DataTable headers={['Stage', 'Estimated Duration']} rows={[
          ['Business Model and Eligibility Review', '1 to 2 weeks'],
          ['Entity and Capital Structuring', '2 to 4 weeks'],
          ['Technology and Compliance Documentation', '3 to 6 weeks'],
          ['SWIT Application Filing', 'Case-specific'],
          ['IFSCA Review and Clarifications', '4 to 8 weeks or more'],
          ['Condition Fulfilment and Registration', 'Subject to IFSCA review'],
          ['Overall Timeline', 'Indicative and may vary based on documentation quality and regulatory scrutiny']
        ]} />
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for ITFS Operator">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Owned Fund Maintenance', 'Maintain USD 0.2 million owned fund at all times'],
          ['AML / KYC Compliance', 'Comply with IFSCA AML, CFT and KYC Guidelines'],
          ['Participant Due Diligence', 'Verify participant eligibility including financier eligibility'],
          ['Technology Surveillance', 'Monitor positions, prices and volumes in real time'],
          ['Transparent Bidding', 'Maintain fair and transparent bidding process'],
          ['Risk Management', 'Maintain comprehensive risk management framework'],
          ['Grievance Redressal', 'Operate complaint handling mechanism'],
          ['Books and Records', 'Maintain books, records and documents in USD'],
          ['Currency Compliance', 'Settlement in specified foreign currency as permitted'],
          ['Outsourcing Oversight', 'Monitor technology providers, system integrators and other outsourced vendors'],
          ['Regulatory Reporting', 'Submit reports and information as required by IFSCA'],
          ['Payment System Compliance', 'Obtain separate authorisation if clearing / settlement of funds is provided']
        ]} />
      </Section>

      <Section id="comparison" title="ITFS vs TReDS vs Finance Company">
        <DataTable headers={['Particular', 'ITFS Platform', 'TReDS', 'Finance Company in IFSC']} rows={[
          ['Regulator', 'IFSCA', 'RBI', 'IFSCA'],
          ['Location', 'GIFT IFSC', 'Domestic India', 'GIFT IFSC'],
          ['Primary Purpose', 'International trade finance platform', 'Domestic MSME receivables financing platform', 'Financial activities such as lending, treasury, factoring, leasing and investments'],
          ['Currency', 'Specified foreign currency', 'INR', 'Freely convertible foreign currency'],
          ['Participants', 'Exporters, importers, financiers, insurers / credit guarantee institutions, PSPs', 'MSMEs, corporates, financiers', 'Borrowers, group entities, counterparties and service recipients depending on activity'],
          ['Role', 'Platform facilitator', 'Platform facilitator', 'Financial institution / finance provider'],
          ['Credit Risk', 'ITFS operator should not assume credit risk', 'Platform generally facilitates financing', 'Finance Company may assume financial exposure depending on activity'],
          ['Capital', 'USD 0.2 million owned fund', 'As per RBI framework', 'USD 0.2 million / USD 3 million or activity-specific']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in IFSCA ITFS Registration">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Treating ITFS as a lending licence', 'Wrong regulatory positioning'],
          ['Using LLP / trust structure', 'Framework expects newly incorporated company'],
          ['No parent experience proof', 'Eligibility gap'],
          ['Weak technology architecture', 'Regulatory concern'],
          ['No real-time surveillance capability', 'Platform readiness issue'],
          ['No transparent bidding model', 'Market integrity concern'],
          ['Financiers not meeting eligibility', 'Participant onboarding risk'],
          ['Assuming ITFS can take credit risk', 'Regulatory violation risk'],
          ['No AML / KYC framework', 'Compliance gap'],
          ['No grievance redressal mechanism', 'Participant protection issue'],
          ['Providing clearing / settlement without authorisation', 'Payment system regulatory risk'],
          ['Weak risk management policy', 'Operational risk']
        ]} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with IFSCA ITFS Registration">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Business Model Assessment', body: 'We help evaluate whether the proposed platform qualifies as ITFS and identify permitted trade finance products.' },
          { title: 'IFSC Entity Structuring', body: 'We assist with newly incorporated company structure, IFSC setup and SEZ-related documentation.' },
          { title: 'Parent Experience Documentation', body: 'We support compilation of evidence for parent entity trading infrastructure or fintech platform experience.' },
          { title: 'Capital Readiness Support', body: 'We assist in mapping USD 0.2 million owned fund requirement and supporting financial documentation.' },
          { title: 'Technology Documentation', body: 'We help prepare platform architecture, MIS capability note, online surveillance framework, cyber controls and audit trail documentation.' },
          { title: 'Compliance and Policy Drafting', body: 'We assist with AML / KYC policy, risk management framework, outsourcing policy, grievance redressal policy and participant onboarding process.' },
          { title: 'Settlement and PSP Assessment', body: 'We help assess whether payment system authorisation may be required based on clearing / settlement model.' },
          { title: 'SWIT Application and Query Support', body: 'We support SWIT application filing and structured responses to IFSCA queries.' },
          { title: 'Post-Registration Compliance', body: 'We support ongoing compliance calendar, participant due diligence, reporting, policy review, owned fund maintenance and regulatory update tracking.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for IFSCA ITFS Registration?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands GIFT IFSC regulatory expectations.' },
          { title: 'Trade Finance Understanding', body: 'We understand factoring, reverse factoring, LC discounting, supply chain finance, pre-shipment credit and forfaiting structures.' },
          { title: 'Technology + Compliance Approach', body: 'ITFS registration requires both regulatory documentation and platform-readiness. We align business model, technology, AML / KYC and risk controls.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA helps in platform businesses touching multiple regulatory domains.' },
          { title: 'Business Plan Strength', body: 'We prepare practical regulator-facing business plans, financial projections, platform flow notes and participant onboarding frameworks.' },
          { title: 'End-to-End Support', body: 'From IFSC structuring to SWIT application, IFSCA query support and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on IFSCA ITFS Registration">
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
          <p><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, ITFS platform registration, trade finance, factoring, supply chain finance, fintech platforms and post-registration compliance.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help trade finance platforms, fintech businesses, exporters, importers, financiers and global trade finance participants understand the broad IFSCA framework for International Trade Finance Services Platform in GIFT IFSC.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, fee structures, capital thresholds, technology requirements, settlement rules, compliance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.</div>
      </Section>
    </ServicePageLayout>
  );
}
