'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'Payment Aggregator License in India: Quick Overview' },
  { id: 'what-is-payment-aggregator-license', title: 'What is Payment Aggregator License in India?' },
  { id: 'legal-foundation', title: 'Legal Foundation' },
  { id: 'categories', title: 'Categories: PA-O, PA-P and PA-CB' },
  { id: 'pa-vs-pg', title: 'Payment Aggregator vs Payment Gateway' },
  { id: 'who-requires-authorisation', title: 'Who Requires PA Authorisation?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'capital-requirement', title: 'Capital Requirement' },
  { id: 'net-worth-computation', title: 'Net Worth Computation' },
  { id: 'escrow-framework', title: 'Escrow Account Framework' },
  { id: 'merchant-kyc', title: 'Merchant KYC and Due Diligence' },
  { id: 'dispute-resolution', title: 'Dispute Resolution and Merchant Responsibilities' },
  { id: 'technical-requirements', title: 'IT and Cyber Security Requirements' },
  { id: 'technical-checklist', title: 'Technical Readiness Checklist' },
  { id: 'pa-cb-rules', title: 'PA-CB Cross-Border Rules' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'post-authorisation-compliance', title: 'Post-Authorisation Compliance' },
  { id: 'supervisory-risk', title: 'Suspension and Cancellation Risks' },
  { id: 'early-structuring', title: 'Why Early Structuring Matters' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our RBI Compliance Expert' }
];

const faqs = [
  { q: 'What is Payment Aggregator License in India?', a: 'Payment Aggregator License in India is RBI authorisation required for entities that aggregate customer payments and settle funds to merchants.' },
  { q: 'Who regulates Payment Aggregator License in India?', a: 'The Reserve Bank of India regulates Payment Aggregators under the Payment and Settlement Systems Act, 2007 and applicable RBI directions.' },
  { q: 'Is Payment Aggregator License mandatory?', a: 'Yes. If a non-bank entity handles merchant funds before settlement, it must obtain Payment Aggregator authorisation from RBI.' },
  { q: 'Do banks require Payment Aggregator License?', a: 'Banks do not require separate authorisation, but they must comply with relevant regulatory provisions.' },
  { q: 'Can an LLP apply for Payment Aggregator License in India?', a: 'No. Only a company incorporated under the Companies Act, 2013 can apply.' },
  { q: 'What is the minimum capital requirement?', a: 'The applicant must have minimum net worth of Rs.15 crore at application stage and Rs.25 crore by the end of the third financial year from authorisation.' },
  { q: 'Is capital maintenance ongoing?', a: 'Yes. Net worth must be maintained continuously after authorisation.' },
  { q: 'Can preference shares be counted toward net worth?', a: 'Compulsorily Convertible Preference Shares may be included subject to applicable conditions.' },
  { q: 'Are Deferred Tax Assets included in net worth?', a: 'No. Deferred Tax Assets must be deducted while calculating net worth.' },
  { q: 'Is FDI allowed in Payment Aggregator entities?', a: 'Yes, subject to the Consolidated FDI Policy and FEMA regulations.' },
  { q: 'Is escrow mandatory?', a: 'Yes. Non-bank Payment Aggregators must maintain escrow accounts with Scheduled Commercial Banks.' },
  { q: 'Can escrow funds be used for operational expenses?', a: 'No. Escrow funds are restricted for permitted merchant settlement and related allowed purposes.' },
  { q: 'Can escrow earn interest?', a: 'Only the eligible core portion of domestic escrow may earn interest under prescribed conditions.' },
  { q: 'Can a loan be taken against escrow funds?', a: 'No. Loan or lien against escrow funds is prohibited.' },
  { q: 'Is co-mingling allowed in PA-CB accounts?', a: 'No. Inward and outward funds must remain separate.' },
  { q: 'What is the maximum cross-border transaction limit?', a: 'The maximum transaction limit for PA-CB is Rs.25 lakh per transaction.' },
  { q: 'Is merchant KYC mandatory?', a: 'Yes. Merchant due diligence must comply with RBI KYC and PA framework requirements.' },
  { q: 'Must a non-bank PA register with FIU-IND?', a: 'Yes. Non-bank PAs must register with FIU-IND and comply with AML/CFT reporting requirements.' },
  { q: 'Are cyber audits mandatory?', a: 'Yes. Annual system and cyber security audits by CERT-In empanelled auditors are required.' },
  { q: 'Is VAPT mandatory?', a: 'Bi-annual VAPT is prescribed under the technology compliance framework.' },
  { q: 'Can a Payment Aggregator conduct marketplace business?', a: 'No. PA business must be separated and the entity cannot simultaneously carry marketplace business in the prohibited manner.' },
  { q: 'Are refunds required to the original payment method?', a: 'Yes, unless the payer specifically instructs credit to an alternate mode belonging to the same payer.' },
  { q: 'What reports must be filed monthly?', a: 'Monthly transaction statistics and cyber incident reports, as applicable, must be submitted.' },
  { q: 'How long does Payment Aggregator approval take?', a: 'The timeline is indicative and may range from a few months to longer depending on application quality, RBI scrutiny and query cycles.' },
  { q: 'Is in-principle approval granted?', a: 'RBI may grant in-principle approval followed by compliance validation and final authorisation, subject to applicable process.' },
  { q: 'Is Payment Aggregator License transferable?', a: 'No. The authorisation is entity-specific.' },
  { q: 'Can a SaaS company with embedded payments avoid PA authorisation?', a: 'Only if it does not handle funds. If it aggregates or settles merchant funds, PA authorisation must be evaluated.' },
  { q: 'Can RBI cancel authorisation for a cyber breach?', a: 'Depending on severity and non-compliance, RBI may take supervisory action including restrictions or cancellation.' },
  { q: 'Can PA-CB operate without AD bank tie-up?', a: 'No. PA-CB activities require Authorised Dealer bank arrangements.' },
  { q: 'How can Estabizz help with Payment Aggregator License?', a: 'Estabizz assists with eligibility review, category selection, net worth readiness, business plan, policy drafting, escrow structuring, technology compliance review, RBI application support, query response and post-authorisation compliance.' }
];

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]">
      <table className="data-table my-0 min-w-[680px]">
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

export default function PaymentAggregatorPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'Reserve Bank of India' },
    { title: 'Legal Framework', body: 'Payment and Settlement Systems Act, 2007 and FEMA, 1999 where applicable' },
    { title: 'Applicable Direction', body: 'RBI Regulation of Payment Aggregators Directions, 2025, as amended from time to time' },
    { title: 'Registration Type', body: 'Certificate of Authorisation as Payment Aggregator' },
    { title: 'Categories', body: 'PA-O, PA-P and PA-CB' },
    { title: 'Minimum Net Worth at Application', body: 'Rs.15 crore' },
    { title: 'Ongoing Net Worth', body: 'Rs.25 crore by end of third financial year from authorisation and thereafter' },
    { title: 'Escrow Account', body: 'Mandatory for non-bank PAs' },
    { title: 'FIU-IND Registration', body: 'Mandatory for non-bank PAs' },
    { title: 'Cyber Compliance', body: 'Board-approved IT policy, CERT-In audit, PCI-DSS and data localisation' },
    { title: 'Timeline', body: 'Indicative and subject to RBI review' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🏦', label: 'RBI Regulatory Advisory' },
        { emoji: '💳', label: 'PA-O / PA-P / PA-CB Structuring' },
        { emoji: '💼', label: 'Rs.15 Crore Net Worth Readiness' },
        { emoji: '🏛️', label: 'Escrow Framework Support' },
        { emoji: '🛡️', label: 'Cyber & IT Governance Review' },
        { emoji: '✅', label: 'Post-Authorisation Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: 'Payment Aggregator License' }
      ]}
      title="Payment Aggregator License in India - Complete RBI Authorisation Guide"
      heroDescription={
        <p className="m-0">
          <strong>Payment Aggregator License in India</strong> is a mandatory RBI authorisation required for non-bank entities that facilitate aggregation of payments from customers to merchants and subsequently settle those funds. Under the RBI Payment Aggregator framework, entities handling merchant funds through online, physical or cross-border payment models must obtain proper authorisation and maintain strict compliance with capital, escrow, cyber security, merchant due diligence and reporting obligations.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for Payment Aggregator License</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check PA Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="30 min read"
      displayYear="2025"
      focusKeyword="Payment Aggregator License in India"
      sections={tocSections}
      ctaTitle="Apply for Payment Aggregator License"
      ctaDescription="Get structured RBI support for PA-O, PA-P and PA-CB authorisation, Rs.15 crore net worth readiness, escrow design, cyber compliance, merchant KYC and post-authorisation reporting."
      quickFacts={[
        { label: 'Regulator', value: 'RBI' },
        { label: 'Law', value: 'PSS Act, 2007' },
        { label: 'Categories', value: 'PA-O, PA-P, PA-CB' },
        { label: 'Application Net Worth', value: 'Rs.15 crore' },
        { label: 'Ongoing Net Worth', value: 'Rs.25 crore' },
        { label: 'Escrow', value: 'Mandatory' },
        { label: 'FIU-IND', value: 'Mandatory' },
        { label: 'Timeline', value: 'Subject to RBI review' }
      ]}
      relatedArticles={[
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'RBI registration guide for NBFC-ICC with NOF, principal business test and COSMOS filing.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'RBI licensing framework for Account Aggregators and data sharing business models.' },
        { title: 'NBFC SRO Registration', href: '/rbi/nbfc-sro-registration', category: 'RBI', description: 'RBI SRO recognition support for industry bodies representing NBFCs.' },
        { title: 'PPI Registration in India', href: '/rbi/ppi-registration-in-india', category: 'RBI', description: 'RBI framework for prepaid payment instruments and wallet operators.' },
        { title: 'RBI Services in India', href: '/rbi/rbi-services', category: 'RBI', description: 'RBI licensing, compliance and regulatory advisory support.' }
      ]}
      finalCtaTitle="Start Your Payment Aggregator License Journey with Estabizz"
      finalCtaDescription="Build your Payment Aggregator application with structured RBI regulatory support, Rs.15 crore net worth readiness review, PA-O / PA-P / PA-CB category assessment, escrow design, cyber compliance framework, business plan, policy documentation and post-authorisation compliance assistance."
    >
      <Section id="quick-overview" title="Payment Aggregator License in India: Quick Overview">
        <CardGrid cards={overviewCards} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s business model, PA category, capital position, merchant flow, technology architecture, escrow design, FEMA applicability and latest RBI directions at the time of filing.</div>
      </Section>

      <Section id="what-is-payment-aggregator-license" title="What is Payment Aggregator License in India?">
        <p>Payment Aggregator License in India is RBI authorisation required for entities that aggregate payments made by customers to merchants through one or more payment channels and thereafter settle the collected funds to such merchants. If a non-bank entity handles merchant funds before settlement, Payment Aggregator authorisation is mandatory.</p>
        <p>A Payment Aggregator may operate through online channels, physical acceptance infrastructure or cross-border e-commerce payment flows, depending on the category of authorisation.</p>
        <div className="warning-box">If the business only provides technology infrastructure and does not handle funds, it may be closer to a Payment Gateway model. However, if the business touches merchant funds, collects money on behalf of merchants or settles funds later, Payment Aggregator License in India must be carefully evaluated.</div>
      </Section>

      <Section id="legal-foundation" title="Legal Foundation of Payment Aggregator License in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Reserve Bank of India'],
          ['Primary Law', 'Payment and Settlement Systems Act, 2007'],
          ['FEMA Applicability', 'Applicable for cross-border PA-CB activities'],
          ['Applicable Direction', 'RBI Regulation of Payment Aggregators Directions, 2025, as amended from time to time'],
          ['Relevant RBI Department', 'Department of Payment and Settlement Systems'],
          ['Authorisation Issued', 'Certificate of Authorisation'],
          ['Applicable Entities', 'Bank and non-bank entities undertaking PA business, with non-bank entities requiring authorisation'],
          ['Core Regulatory Focus', 'Merchant fund protection, escrow discipline, cyber security, AML, grievance redressal and reporting']
        ]} />
        <p>The RBI framework consolidates compliance expectations for Payment Aggregators and brings online, physical and cross-border payment aggregation models under a structured regulatory framework.</p>
      </Section>

      <Section id="categories" title="Categories Under Payment Aggregator License in India">
        <DataTable headers={['Category', 'Full Form', 'Nature of Business', 'Example Use Case']} rows={[
          ['PA-O', 'Payment Aggregator - Online', 'Facilitates transactions where payment instrument and acceptance device are not in physical proximity', 'E-commerce checkout, online payment links, app-based payments'],
          ['PA-P', 'Payment Aggregator - Physical', 'Facilitates transactions where payment instrument and acceptance device are physically present', 'POS terminal, QR-based payment acceptance, soundbox-based merchant payments'],
          ['PA-CB', 'Payment Aggregator - Cross Border', 'Facilitates cross-border payment aggregation for permitted current account transactions through e-commerce mode', 'Export payments, import payments, cross-border merchant settlement']
        ]} />
        <h3>PA-CB may include</h3>
        <BulletList items={['Inward transactions involving foreign inflow', 'Outward transactions involving foreign remittance']} />
        <div className="warning-box">Correct category selection is critical. Wrong categorisation may lead to regulatory queries or rejection.</div>
      </Section>

      <Section id="pa-vs-pg" title="Payment Aggregator vs Payment Gateway - Regulatory Difference">
        <DataTable headers={['Particular', 'Payment Aggregator', 'Payment Gateway']} rows={[
          ['Handles Funds', 'Yes', 'No'],
          ['Requires RBI Authorisation', 'Yes, for non-bank PA', 'No separate PA authorisation if it only provides technology routing'],
          ['Escrow Account', 'Mandatory', 'Not applicable'],
          ['Capital Requirement', 'Rs.15 crore at application and Rs.25 crore ongoing', 'Not prescribed as PA capital requirement'],
          ['Settlement Responsibility', 'Yes', 'No'],
          ['FIU-IND Registration', 'Required for non-bank PA', 'Not applicable in same manner'],
          ['Regulatory Risk', 'Direct RBI supervision', 'Technology compliance encouraged, subject to business model']
        ]} />
        <div className="warning-box">If the entity touches merchant funds, it should not be treated as only a Payment Gateway.</div>
      </Section>

      <Section id="who-requires-authorisation" title="Who Requires Payment Aggregator License in India?">
        <CardGrid cards={[
          { title: 'Fintech Companies Building Payment Products', body: 'Entities building online checkout, payment acceptance or merchant payment infrastructure and handling funds.' },
          { title: 'E-Commerce Enablement Platforms', body: 'Platforms enabling merchants to collect payments across UPI, cards, net banking, wallets or other payment channels and settling funds later.' },
          { title: 'Physical POS Aggregators', body: 'Entities deploying POS terminals, QR systems, soundbox devices or similar physical payment acceptance infrastructure.' },
          { title: 'Cross-Border Payment Service Providers', body: 'Entities facilitating inward or outward cross-border e-commerce payment aggregation.' },
          { title: 'Existing PA-O / PA-CB Expanding to PA-P', body: 'Existing authorised entities expanding into another PA category may need intimation or revised authorisation as applicable.' },
          { title: 'Marketplaces Handling Funds', body: 'If the platform collects funds and settles to merchants, PA applicability must be examined carefully.' }
        ]} />
        <p>Banks do not require separate authorisation to carry out PA business, but non-bank entities must obtain RBI authorisation.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for Payment Aggregator License in India">
        <DataTable headers={['Eligibility Criterion', 'Requirement', 'Practical Meaning']} rows={[
          ['Entity Type', 'Company incorporated in India under Companies Act, 2013', 'LLP, partnership, sole proprietorship and trust structures are not eligible'],
          ['MOA Object Clause', 'Must specifically cover PA activity', 'MOA should be reviewed and amended before application if required'],
          ['Minimum Net Worth at Application', 'Rs.15 crore', 'Must be certified by statutory auditor'],
          ['Ongoing Net Worth', 'Rs.25 crore by end of third financial year from authorisation', 'Must be maintained continuously'],
          ['Fit and Proper', 'Promoters and directors must satisfy RBI criteria', 'Financial integrity, reputation, no disqualifications'],
          ['NOC from Regulator', 'Required if already regulated by RBI, SEBI, IRDAI, PFRDA or NHB', 'Application must be filed within prescribed timeline after NOC'],
          ['FDI Compliance', 'Must comply with Consolidated FDI Policy and FEMA', 'Required where foreign investment exists'],
          ['Application Completeness', 'Application must be complete and in prescribed form', 'Incomplete application may be returned']
        ]} />
      </Section>

      <Section id="capital-requirement" title="Capital Requirement for Payment Aggregator License in India">
        <DataTable headers={['Stage', 'Net Worth Requirement', 'Remarks']} rows={[
          ['At Application', 'Rs.15 crore', 'To be certified by statutory auditor'],
          ['By End of Third Financial Year from Authorisation', 'Rs.25 crore', 'Must be achieved within prescribed timeline'],
          ['Ongoing', 'Rs.25 crore', 'Must be maintained continuously']
        ]} />
        <p>An entity not meeting minimum capital norms will not be considered. Net worth erosion after authorisation may attract regulatory action.</p>
      </Section>

      <Section id="net-worth-computation" title="Net Worth Computation for Payment Aggregator License in India">
        <DataTable headers={['Component', 'Treatment']} rows={[
          ['Paid-up equity share capital', 'Included'],
          ['Free reserves', 'Included'],
          ['Compulsorily Convertible Preference Shares', 'Included, subject to conditions'],
          ['Accumulated losses / deficit', 'Deducted'],
          ['Deferred Tax Assets', 'Deducted'],
          ['Redeemable preference shares', 'Not included'],
          ['Non-compulsorily convertible preference shares', 'Not included']
        ]} />
        <FormulaCard>Net Worth = Paid-up Equity + Free Reserves + Eligible CCPS - Accumulated Losses - Deferred Tax Assets - Non-Qualifying Instruments</FormulaCard>
        <p>Many applicants overstate net worth by including non-qualifying instruments. A pre-application net worth audit should be completed before obtaining the statutory auditor certificate.</p>
      </Section>

      <Section id="escrow-framework" title="Escrow Account Framework for Payment Aggregators">
        <p>Escrow compliance is one of the most important pillars of Payment Aggregator License in India. Non-bank Payment Aggregators must maintain escrow accounts with Scheduled Commercial Banks to protect merchant funds.</p>
        <DataTable headers={['Escrow Type', 'Applicable To', 'Purpose']} rows={[
          ['Domestic Escrow', 'PA-O and PA-P', 'Domestic merchant settlement'],
          ['Inward Collection Account', 'PA-CB inward', 'Cross-border inward collection'],
          ['Outward Collection Account', 'PA-CB outward', 'Cross-border outward payments']
        ]} />
        <DataTable headers={['Condition', 'Requirement']} rows={[
          ['Bank', 'Scheduled Commercial Bank for domestic PA, AD Category-I Scheduled Commercial Bank for PA-CB'],
          ['No Co-Mingling', 'Business funds and merchant funds must remain separate'],
          ['Day-End Balance', 'Must not be less than merchant payable amount'],
          ['No Loan', 'No loan or lien permitted against escrow funds'],
          ['Interest', 'Only eligible core portion may earn interest subject to conditions'],
          ['Merchant List', 'Merchant list must be submitted and updated with escrow bank'],
          ['COD Restriction', 'Escrow cannot be operated for Cash-on-Delivery transactions'],
          ['Cross-Border Separation', 'InCA and OCA must remain separate; no netting of inward and outward flows']
        ]} />
        <p>Core portion is generally computed by identifying the lowest daily balance fortnight-wise and averaging the lowest balances over 26 fortnights. No loan is permitted against the core portion.</p>
      </Section>

      <Section id="merchant-kyc" title="Merchant KYC and Due Diligence Requirements">
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['CKYCR Retrieval', 'Retrieve merchant KYC record where available with consent'],
          ['PAN Verification', 'Mandatory verification for merchants'],
          ['Contact Point Verification', 'Required, especially for small merchants'],
          ['Background Check', 'PA must conduct background and antecedent checks'],
          ['Merchant Category Code', 'Appropriate MCC and Merchant ID / Terminal ID should be allotted'],
          ['Marketplace Validation', 'Marketplace sellers must be properly onboarded'],
          ['Funds Credit', 'Merchant settlement should go only to the merchant verified bank account'],
          ['Ongoing Monitoring', 'Merchant transactions must be continuously monitored'],
          ['FIU-IND Registration', 'Mandatory for non-bank PAs'],
          ['AML/CFT Reporting', 'Suspicious transaction and related reporting obligations must be met']
        ]} />
        <div className="info-box">Merchant onboarding after January 1, 2026 must strictly follow the new due diligence norms as applicable under the framework.</div>
      </Section>

      <Section id="dispute-resolution" title="Dispute Resolution and Merchant Responsibilities">
        <BulletList items={['Formal dispute management framework', 'TAT-based failed transaction resolution', 'Refund timeline process', 'Chargeback handling mechanism', 'Escalation matrix', 'Merchant grievance officer details on website', 'Public display of merchant policies, privacy policy and terms', 'Transparent merchant agreements']} />
        <p>Failure in grievance redressal and dispute resolution may be viewed seriously by RBI.</p>
      </Section>

      <Section id="technical-requirements" title="Technical Requirements for Payment Aggregator License in India">
        <p>Payment Aggregator License in India is now a technology-intensive authorisation. RBI expects strong cyber resilience, IT governance, data localisation, payment application security and audit readiness.</p>
        <h3>IT Governance Framework</h3>
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Board-approved IT Policy', 'Formal IT and security framework approved by the Board'],
          ['IT Steering Committee', 'Cross-functional committee overseeing technology risk'],
          ['Enterprise Information Model', 'Structured data architecture'],
          ['Cyber Crisis Management Plan', 'Detection, containment, response and recovery plan'],
          ['Annual Strategy Review', 'IT roadmap and cyber posture reviewed periodically']
        ]} />
        <h3>Information Security Governance</h3>
        <BulletList items={['Comprehensive security risk assessment', 'Internal or external annual security audit', 'Board review of security posture', 'Documentation of residual risks', 'Incident reporting process']} />
        <h3>Data Security Standards</h3>
        <DataTable headers={['Standard / Control', 'Applicability']} rows={[
          ['PCI-DSS', 'Mandatory where card data is handled'],
          ['PCI-SSF', 'Payment application security'],
          ['Strong Encryption', 'Internationally accepted cryptographic standards'],
          ['TLS Secure Channels', 'Secure data transmission'],
          ['No Card Credential Storage at Merchant End', 'Merchant systems must not store card credentials']
        ]} />
        <h3>Cyber Security Audit Requirements</h3>
        <DataTable headers={['Audit Type', 'Frequency', 'Auditor / Recipient']} rows={[
          ['Internal Audit', 'Quarterly', 'Internal / IT Committee'],
          ['External Cyber Audit', 'Annual', 'CERT-In empanelled auditor'],
          ['VAPT', 'Bi-annual', 'Certified security auditor'],
          ['PCI-DSS Assessment', 'As applicable', 'Accredited assessor'],
          ['Monthly Cyber Incident Report', 'Monthly', 'RBI as applicable']
        ]} />
        <h3>Data Localisation and Vendor Risk</h3>
        <BulletList items={['Payment system data must be stored in India', 'Cloud architecture must support Indian data residency', 'Unauthorised cross-border data access must be prevented', 'Vendor contracts should address data localisation obligations', 'Right to audit clause in vendor contracts', 'Regulatory access to vendor setup', 'BCP and DR obligations', 'Vendor risk remains PA responsibility']} />
        <h3>Fraud Monitoring and Resilience</h3>
        <BulletList items={['Real-time fraud monitoring', 'Chargeback monitoring', 'Merchant risk scoring', 'Transaction anomaly detection', 'Centralised log monitoring', 'SIEM or equivalent monitoring', 'Root Cause Analysis reporting', 'BCP plan, DR site and periodic recovery testing']} />
      </Section>

      <Section id="technical-checklist" title="Technical Readiness Checklist for Payment Aggregator License in India">
        <DataTable headers={['Area', 'Status Indicator']} rows={[
          ['Board-approved IT Policy', 'Required'],
          ['IT Steering Committee', 'Required'],
          ['Security Risk Assessment', 'Required'],
          ['PCI-DSS Compliance', 'Required where applicable'],
          ['PCI-SSF Alignment', 'Required for payment applications'],
          ['Data Localisation', 'Required'],
          ['CERT-In Cyber Audit', 'Required annually'],
          ['VAPT', 'Required bi-annually'],
          ['Fraud Monitoring', 'Required'],
          ['Merchant Security Assessment', 'Required'],
          ['SIEM / Log Monitoring', 'Expected'],
          ['BCP-DR Framework', 'Required'],
          ['Vendor Right to Audit Clause', 'Required'],
          ['Cyber Incident Reporting', 'Required']
        ]} />
      </Section>

      <Section id="pa-cb-rules" title="PA-CB Cross-Border Rules">
        <DataTable headers={['Requirement', 'Regulatory Position']} rows={[
          ['Inward and Outward Funds', 'Must remain separate'],
          ['Netting', 'Not permitted'],
          ['Maximum Transaction Limit', 'Rs.25 lakh per transaction'],
          ['Forex Handling', 'Only through Authorised Dealer banks'],
          ['InCA and OCA', 'Separate accounts required'],
          ['FEMA Compliance', 'Mandatory'],
          ['EDPMS / IDPMS Support', 'Documentation support required for export/import closure'],
          ['Non-INR Settlement', 'Permitted only in specific cases as applicable']
        ]} />
        <p>PA-CB applicants must demonstrate both PSS Act and FEMA compliance readiness.</p>
      </Section>

      <Section id="documents-required" title="Documents Required for Payment Aggregator License in India">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Company Documents', 'Certificate of Incorporation, MOA, AOA, PAN, board resolution'],
          ['Capital Documents', 'Net worth certificate from statutory auditor, audited financials, provisional balance sheet if applicable, bank statements, shareholder agreements for CCPS'],
          ['Director and Promoter Documents', 'Fit and proper declarations, KYC, PAN, Aadhaar, DIN, address proof, regulatory declarations'],
          ['Business Documents', 'Business plan, merchant acquisition strategy, revenue model, payment channel strategy, 3-year projections'],
          ['Policy Documents', 'Information Security Policy, Dispute Management Policy, Merchant KYC/CDD Policy, AML framework, Risk Policy'],
          ['Escrow Documents', 'Draft escrow agreement with Scheduled Commercial Bank, permissible debit/credit structure, merchant list process'],
          ['Technology Documents', 'PCI-DSS status, cyber security framework, VAPT plan, data localisation architecture, audit readiness documents'],
          ['Regulatory Documents', 'NOC from financial sector regulator if applicable, RBI online application, prescribed annexures'],
          ['Cross-Border Documents', 'FEMA framework, InCA/OCA plan, AD bank arrangement, EDPMS/IDPMS process if PA-CB']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for Payment Aggregator License in India">
        <div className="step-timeline">
          {[
            ['Pre-Application Structuring and Eligibility Assessment', 'Determine PA category, assess net worth, review MOA, check fit and proper status, assess NOC requirement and identify technology gaps.'],
            ['Net Worth Certification', 'Obtain statutory auditor certificate in prescribed format and ensure Rs.15 crore net worth is properly computed.'],
            ['Policy and Document Preparation', 'Prepare business plan, Board-approved Information Security Policy, dispute management policy, merchant KYC/CDD framework, escrow structure and director declarations.'],
            ['Online Application Filing', 'Submit application through RBI online portal with all required documents and annexures.'],
            ['RBI Review and Queries', 'RBI reviews capital, fit and proper status, business model, technology readiness, escrow design and compliance framework.'],
            ['Grant of Certificate of Authorisation', 'Upon regulatory satisfaction, RBI may grant Certificate of Authorisation specifying the PA category.'],
            ['Post-Authorisation Setup', 'Open escrow account within prescribed timeline, complete FIU-IND registration, implement cyber audit framework and start compliant merchant onboarding.']
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
      </Section>

      <Section id="timeline" title="Indicative Timeline for Payment Aggregator License in India">
        <DataTable headers={['Stage', 'Activity', 'Estimated Duration']} rows={[
          ['Stage 1', 'Pre-application assessment, net worth audit, MOA review and fit and proper check', '2 to 4 weeks'],
          ['Stage 2', 'Document preparation, policies, business plan and auditor certificate', '3 to 5 weeks'],
          ['Stage 3', 'Online portal submission', 'Around 1 week'],
          ['Stage 4', 'RBI primary review and acknowledgement', '4 to 8 weeks'],
          ['Stage 5', 'Query resolution and correspondence', '4 to 12 weeks'],
          ['Stage 6', 'CoA issuance and post-authorisation setup', '2 to 4 weeks'],
          ['Overall', 'Well-prepared application', '3 to 6 months'],
          ['Overall', 'Incomplete or query-heavy application', '9 to 18 months or more']
        ]} />
        <div className="warning-box">The timeline is indicative and depends on RBI review, documentation quality, technology readiness, query cycles and regulatory satisfaction.</div>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in Payment Aggregator License Applications">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Incorrect net worth computation', 'Application may be returned'],
          ['MOA does not cover PA business', 'Regulatory query or rejection risk'],
          ['Incomplete fit and proper declarations', 'Delay in background verification'],
          ['No Board-approved Information Security Policy', 'Immediate technology compliance query'],
          ['Weak dispute management policy', 'Operational readiness concern'],
          ['Poor escrow explanation', 'Serious regulatory concern'],
          ['Wrong PA category selection', 'Structural clarification required'],
          ['PA-CB FEMA framework missing', 'Cross-border authorisation delay'],
          ['Technology infrastructure not evidenced', 'Annexure 1 compliance query'],
          ['Merchant KYC process weak', 'AML and onboarding concern'],
          ['Delayed regulatory deadline compliance', 'Business continuity risk']
        ]} />
      </Section>

      <Section id="post-authorisation-compliance" title="Post-Authorisation Compliance for Payment Aggregators">
        <DataTable headers={['Frequency', 'Compliance Requirement', 'Due Timeline', 'Responsible Function']} rows={[
          ['Monthly', 'Transaction statistics submission', 'By 7th of next month', 'Compliance / MIS'],
          ['Monthly', 'Cyber incident reporting', 'As prescribed', 'IT / Compliance'],
          ['Quarterly', 'Escrow balance certificate', 'By 15th of following month', 'Finance / Auditor'],
          ['Quarterly', 'Banker certificate for escrow / InCA / OCA', 'By 15th of following month', 'Banking Operations'],
          ['Quarterly', 'Internal cyber audit report', 'To IT Committee', 'IT / Security'],
          ['Bi-Annual', 'VAPT', 'Every 6 months', 'IT / External Auditor'],
          ['Annual', 'Net worth certificate', 'By September 30', 'Statutory Auditor'],
          ['Annual', 'IS audit and cyber security audit', 'As prescribed', 'CERT-In empanelled auditor'],
          ['Event-Based', 'Change in board / director declaration', 'Immediate', 'Company Secretary'],
          ['Event-Based', 'Change in control approval', 'Before transaction', 'Compliance / Legal']
        ]} />
        <p>Maintaining Payment Aggregator License in India requires board-level monitoring, not only filing-level compliance.</p>
      </Section>

      <Section id="supervisory-risk" title="Suspension, Cancellation and Supervisory Risk">
        <DataTable headers={['Trigger', 'Possible Risk']} rows={[
          ['Capital shortfall', 'Show cause or supervisory action'],
          ['Escrow violation', 'Severe regulatory penalty'],
          ['AML breach', 'FIU-IND reporting and regulatory action'],
          ['Cyber breach', 'RBI supervisory action'],
          ['False disclosure', 'Authorisation cancellation'],
          ['Merchant fund mismanagement', 'Escrow freeze or restriction'],
          ['Failure to submit reports', 'Supervisory action'],
          ['Unauthorised PA activity', 'Penalty under PSS Act'],
          ['Change in control without approval', 'Regulatory action']
        ]} />
      </Section>

      <Section id="early-structuring" title="Why Early Structuring Matters for Payment Aggregator License in India">
        <p>Most delays in Payment Aggregator License applications arise from incomplete MOA objects, weak escrow design, incorrect net worth computation, poor cyber documentation, inadequate board oversight and ambiguity in PA category selection. Early structuring helps promoters identify regulatory gaps before filing and reduces avoidable query cycles.</p>
        <div className="expert-quote">
          <blockquote>&quot;In financial infrastructure businesses, regulatory approval is not merely permission to operate; it is a declaration of systemic trust. That trust must be earned through governance discipline.&quot;</blockquote>
          <cite>CS Devyani Khambhati - Compliance Expert</cite>
        </div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with Payment Aggregator License in India">
        <CardGrid cards={[
          { title: 'PA Category and Eligibility Review', body: 'We help identify whether the proposed model falls under PA-O, PA-P, PA-CB or a combination of categories.' },
          { title: 'Net Worth Readiness Support', body: 'We assist in reviewing Rs.15 crore net worth readiness, DTA deduction, CCPS eligibility and statutory auditor certificate coordination.' },
          { title: 'MOA and Entity Structuring', body: 'We review object clauses and assist with amendment requirements before application filing.' },
          { title: 'RBI-Ready Business Plan', body: 'We prepare business plan, merchant acquisition strategy, revenue model, 3-year financial projection and compliance narrative.' },
          { title: 'Policy Documentation', body: 'We assist with Information Security Policy, dispute management framework, merchant KYC/CDD policy, AML framework and risk policy.' },
          { title: 'Escrow Framework Support', body: 'We help design escrow flow, permissible debit/credit structure, merchant list framework and bank coordination documents.' },
          { title: 'Technology Compliance Gap Review', body: 'We help map Annexure 1 technology requirements including PCI-DSS, VAPT, CERT-In audit, data localisation, cyber incident reporting and vendor risk.' },
          { title: 'RBI Application and Query Support', body: 'We assist in online application preparation and structured responses to RBI queries.' },
          { title: 'Post-CoA Compliance', body: 'We support FIU-IND registration, monthly/quarterly/annual compliance calendar, cyber audit coordination, escrow certification and merchant onboarding review.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Payment Aggregator License in India?">
        <CardGrid cards={[
          { title: 'RBI Regulatory Expertise', body: 'Our team works across RBI licensing and compliance matters and understands the regulatory expectations for payment system participants.' },
          { title: 'Technology + Compliance Approach', body: 'Payment Aggregator authorisation requires both regulatory and cyber-readiness. We review business model, policies, technology controls and escrow architecture together.' },
          { title: 'FEMA and Cross-Border Understanding', body: 'For PA-CB applicants, our approach includes FEMA, AD bank, InCA/OCA and transaction flow structuring.' },
          { title: 'Business Plan and Documentation Strength', body: 'We prepare practical, regulator-facing business plans, projections, governance documents and operating policies.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From eligibility review to CoA application, RBI query support and post-authorisation compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on Payment Aggregator License in India">
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
          <p className="!mb-2"><strong>Expertise:</strong> RBI, SEBI, IRDAI, IFSCA, fintech regulatory compliance, payment system authorisation, Payment Aggregator registration, FEMA, cyber compliance and post-authorisation regulatory support.</p>
          <p className="!mb-0">This content has been prepared from a regulatory advisory perspective to help fintech founders, payment companies, cross-border payment businesses, merchant platforms and compliance teams understand the broad RBI framework for Payment Aggregator authorisation in India.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, financial or investment advice. RBI requirements, application formats, capital thresholds, escrow rules, cyber security expectations, reporting obligations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with RBI.</div>
      </Section>

      <Section id="speak-to-expert" title="Start Your Payment Aggregator License Journey with Estabizz">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-6 md:p-8 text-white">
          <p className="!text-blue-100">Build your Payment Aggregator application with structured RBI regulatory support, Rs.15 crore net worth readiness review, PA-O / PA-P / PA-CB category assessment, escrow design, cyber compliance framework, business plan, policy documentation and post-authorisation compliance assistance.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0077B6] hover:bg-blue-50">Speak to RBI Compliance Expert</Link>
            <Link href="/get-started" className="rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0077B6]">Apply for Payment Aggregator License</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#10b981] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#059669]">WhatsApp Estabizz Team</a>
          </div>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
