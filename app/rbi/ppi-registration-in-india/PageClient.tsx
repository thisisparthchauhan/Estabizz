'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'PPI Registration in India: Quick Overview' },
  { id: 'what-is-ppi-registration', title: 'What is PPI Registration in India?' },
  { id: 'legal-foundation', title: 'Legal Foundation' },
  { id: 'what-is-ppi', title: 'What is a Prepaid Payment Instrument?' },
  { id: 'types-of-ppis', title: 'Types of PPIs' },
  { id: 'ppi-vs-pa', title: 'PPI Registration vs Payment Aggregator License' },
  { id: 'who-requires-ppi', title: 'Who Requires PPI Registration?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'net-worth', title: 'Net Worth Requirement' },
  { id: 'kyc-aml', title: 'KYC and AML Requirements' },
  { id: 'issuance-loading-limits', title: 'Issuance, Loading and Limits' },
  { id: 'escrow-fund-protection', title: 'Escrow and Customer Fund Protection' },
  { id: 'interoperability', title: 'Interoperability and UPI Access' },
  { id: 'customer-protection', title: 'Customer Protection and Grievance Redressal' },
  { id: 'it-cyber-security', title: 'IT and Cyber Security Requirements' },
  { id: 'technical-checklist', title: 'Technical Readiness Checklist' },
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
  { q: 'What is PPI Registration in India?', a: 'PPI Registration in India refers to RBI authorisation for entities that issue and operate Prepaid Payment Instruments such as wallets, cards, gift instruments and stored value payment products.' },
  { q: 'Who regulates PPI Registration in India?', a: 'The Reserve Bank of India regulates Prepaid Payment Instruments under the Payment and Settlement Systems Act, 2007 and RBI Master Directions on PPIs.' },
  { q: 'Is RBI authorisation mandatory for all PPIs?', a: 'RBI authorisation is required for entities issuing and operating payment systems involving PPIs, except closed system PPIs that are used only for purchase from the issuing entity and do not involve third-party settlement.' },
  { q: 'What are the types of PPIs?', a: 'PPIs are broadly classified as closed system PPIs, semi-closed system PPIs and open system PPIs.' },
  { q: 'What is a closed system PPI?', a: 'A closed system PPI is issued by an entity for purchase of goods and services only from that entity and does not permit third-party settlement.' },
  { q: 'What is a semi-closed system PPI?', a: 'A semi-closed PPI can be used at a group of identified merchant locations or establishments that have a contract to accept the PPI.' },
  { q: 'What is an open system PPI?', a: 'Open system PPIs are issued only by banks and can be used at any merchant for purchase of goods and services, with cash withdrawal permitted as per RBI framework.' },
  { q: 'Can a non-bank company issue PPI?', a: 'Yes, a non-bank company may issue permitted PPIs after obtaining RBI authorisation, subject to eligibility and compliance requirements.' },
  { q: 'Can an LLP apply for PPI authorisation?', a: 'PPI authorisation is generally available to eligible incorporated entities. LLP suitability must be checked under the applicable RBI framework, but company structure is generally preferred for regulated payment system authorisations.' },
  { q: 'Is interest payable on PPI balances?', a: 'No. PPI issuers cannot pay interest on PPI balances.' },
  { q: 'Can PPIs be loaded by cash?', a: 'Cash loading may be permitted subject to RBI-prescribed limits and conditions.' },
  { q: 'Can PPIs be loaded by credit card or debit card?', a: 'PPIs may be loaded through permitted payment instruments subject to RBI directions.' },
  { q: 'Is KYC mandatory for PPI holders?', a: 'KYC requirements depend on the PPI category and usage limits. Full-KYC PPIs generally allow wider functionality.' },
  { q: 'Can PPI be used for fund transfer?', a: 'Fund transfer may be permitted depending on the PPI category, KYC status and RBI conditions.' },
  { q: 'Can non-bank PPI issuers issue open system PPIs?', a: 'No. Open system PPIs are issued only by banks.' },
  { q: 'Can a PPI issuer operate without RBI approval?', a: 'No entity can operate a payment system for issuance of PPIs without prior RBI approval or authorisation, unless the product falls outside authorisation requirements such as a valid closed system PPI.' },
  { q: 'Is interoperability allowed for PPIs?', a: 'Interoperability is permitted for eligible PPIs subject to RBI and NPCI requirements.' },
  { q: 'Can full-KYC PPIs access UPI?', a: 'RBI has enabled UPI access for full-KYC PPIs through third-party applications, subject to applicable operational framework.' },
  { q: 'What documents are required for PPI Registration?', a: 'Documents generally include incorporation documents, MOA/AOA, board resolution, net worth certificate, business plan, KYC/AML policy, technology architecture, cyber security framework and customer protection policies.' },
  { q: 'How long does PPI Registration take?', a: 'The timeline is indicative and depends on application quality, RBI review, business model clarity, technology readiness and query cycles.' },
  { q: 'Can PPI Registration be transferred?', a: 'RBI authorisation is entity-specific and cannot be transferred like a normal commercial licence.' },
  { q: 'Can RBI cancel PPI authorisation?', a: 'Yes. RBI may take action including cancellation where the issuer fails to comply with regulatory conditions.' },
  { q: 'Is customer grievance redressal mandatory?', a: 'Yes. PPI issuers must maintain a proper customer grievance redressal and refund mechanism.' },
  { q: 'Is cyber security compliance required for PPI issuers?', a: 'Yes. PPI issuers are payment system participants and must maintain robust technology, security and data protection controls.' },
  { q: 'How can Estabizz help with PPI Registration?', a: 'Estabizz assists with PPI model assessment, eligibility review, business plan, policy drafting, technology compliance review, RBI application support, query response and post-authorisation compliance.' }
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

export default function PPIRegistrationPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'Reserve Bank of India' },
    { title: 'Legal Framework', body: 'Payment and Settlement Systems Act, 2007' },
    { title: 'Applicable Direction', body: 'RBI Master Directions on Prepaid Payment Instruments, 2021, as amended from time to time' },
    { title: 'Authorisation Type', body: 'Certificate of Authorisation for issuing and operating PPIs' },
    { title: 'Common Instruments', body: 'Wallets, cards, gift instruments and stored value instruments' },
    { title: 'PPI Types', body: 'Closed System, Semi-Closed System and Open System PPIs' },
    { title: 'Non-Bank Authorisation', body: 'Required for non-bank entities issuing semi-closed PPIs' },
    { title: 'Open System PPIs', body: 'Issued only by banks' },
    { title: 'Cash Withdrawal', body: 'Not permitted for semi-closed PPIs; permitted for open system PPIs issued by banks as per RBI framework' },
    { title: 'Interest on PPI Balance', body: 'Not payable' },
    { title: 'Timeline', body: 'Indicative and subject to RBI review' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🏦', label: 'RBI Regulatory Advisory' },
        { emoji: '👛', label: 'Wallet & Prepaid Card Structuring' },
        { emoji: '📜', label: 'PPI Authorisation Support' },
        { emoji: '🔐', label: 'KYC & AML Framework' },
        { emoji: '🏛️', label: 'Escrow and Settlement Compliance' },
        { emoji: '✅', label: 'Post-Authorisation Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: 'PPI Registration' }
      ]}
      title="PPI Registration in India - Complete RBI Authorisation Guide for Prepaid Payment Instruments"
      heroDescription={
        <p className="m-0">
          <strong>PPI Registration in India</strong> is the RBI authorisation required for entities that intend to issue and operate Prepaid Payment Instruments such as wallets, cards, gift instruments and other stored value payment instruments. Under RBI&apos;s Prepaid Payment Instrument framework, authorised issuers must comply with net worth, KYC, customer protection, interoperability, cyber security, escrow and reporting obligations.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for PPI Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check PPI Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="26 min read"
      displayYear="2025"
      focusKeyword="PPI Registration in India"
      sections={tocSections}
      ctaTitle="Apply for PPI Registration"
      ctaDescription="Get structured RBI support for wallet, prepaid card and stored value models, including business model review, net worth readiness, KYC/AML, escrow, technology documentation and post-authorisation compliance."
      quickFacts={[
        { label: 'Regulator', value: 'RBI' },
        { label: 'Law', value: 'PSS Act, 2007' },
        { label: 'Framework', value: 'PPI Master Directions' },
        { label: 'Types', value: 'Closed / Semi-Closed / Open' },
        { label: 'Non-Bank PPI', value: 'Authorisation required' },
        { label: 'Open PPI', value: 'Banks only' },
        { label: 'Interest', value: 'Not payable' },
        { label: 'Timeline', value: 'Subject to RBI review' }
      ]}
      relatedArticles={[
        { title: 'Payment Aggregator License in India', href: '/rbi/payment-aggregator-license-in-india', category: 'RBI', description: 'RBI authorisation support for PA-O, PA-P and PA-CB payment aggregator models.' },
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'RBI registration guide for NBFC-ICC with NOF, principal business test and COSMOS filing.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'RBI licensing framework for Account Aggregators and data sharing business models.' },
        { title: 'RBI Services in India', href: '/rbi/rbi-services', category: 'RBI', description: 'RBI licensing, compliance and regulatory advisory support.' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support', category: 'RBI', description: 'Legal and compliance support for RBI-regulated financial entities.' }
      ]}
      finalCtaTitle="Start Your PPI Registration Journey with Estabizz"
      finalCtaDescription="Build your PPI application with structured RBI regulatory support, business model assessment, net worth readiness review, KYC/AML framework, wallet technology documentation, customer fund protection structure, policy drafting and post-authorisation compliance assistance."
    >
      <Section id="quick-overview" title="PPI Registration in India: Quick Overview">
        <CardGrid cards={overviewCards} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s business model, PPI type, KYC framework, technology architecture, merchant network, settlement design and latest RBI directions at the time of filing.</div>
      </Section>

      <Section id="what-is-ppi-registration" title="What is PPI Registration in India?">
        <p>PPI Registration in India refers to RBI authorisation for entities that issue and operate Prepaid Payment Instruments. PPIs are payment instruments that facilitate purchase of goods and services, including financial services, remittance facilities and other permitted payment uses, against the value stored on such instruments.</p>
        <p>No entity can set up and operate a payment system for issuance of PPIs without prior approval or authorisation from RBI, except closed system PPIs that are outside RBI authorisation where they are used only for purchase of goods and services from the issuing entity and do not permit third-party settlement.</p>
      </Section>

      <Section id="legal-foundation" title="Legal Foundation of PPI Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Reserve Bank of India'],
          ['Primary Law', 'Payment and Settlement Systems Act, 2007'],
          ['Key Provision', 'Section 18 read with Section 10(2)'],
          ['Applicable Direction', 'RBI Master Directions on Prepaid Payment Instruments, 2021, as amended from time to time'],
          ['Applicable Entities', 'PPI issuers and system participants'],
          ['Authorisation Issued', 'Certificate of Authorisation, where applicable'],
          ['Core Regulatory Focus', 'Customer fund safety, KYC, AML, cyber security, interoperability, grievance redressal and settlement discipline']
        ]} />
        <p>The RBI PPI framework provides the regulatory structure for authorisation, regulation and supervision of entities issuing and operating PPIs in India.</p>
      </Section>

      <Section id="what-is-ppi" title="What is a Prepaid Payment Instrument?">
        <p>A Prepaid Payment Instrument is a payment instrument that allows the holder to purchase goods and services, including financial services and remittance facilities, using value stored on the instrument. PPIs may be issued in the form of wallets, cards or other permitted instruments.</p>
        <BulletList items={['Wallet-based PPI', 'Card-based PPI', 'Gift instrument', 'Transit or mobility PPI', 'Semi-closed merchant network instrument', 'Bank-issued open system PPI']} />
      </Section>

      <Section id="types-of-ppis" title="Types of Prepaid Payment Instruments in India">
        <DataTable headers={['PPI Type', 'Meaning', 'RBI Authorisation Position', 'Cash Withdrawal']} rows={[
          ['Closed System PPI', 'Issued by an entity for purchase of goods and services only from that entity', 'Generally does not require RBI authorisation where no third-party settlement is involved', 'Not permitted'],
          ['Semi-Closed System PPI', 'Used at a group of clearly identified merchant locations or establishments having a specific contract with issuer', 'RBI authorisation required for non-bank issuers', 'Not permitted'],
          ['Open System PPI', 'Can be used at any merchant for purchase of goods and services', 'Issued only by banks', 'Permitted as per RBI framework']
        ]} />
        <div className="warning-box">Closed system PPIs should not be confused with semi-closed PPIs. If the instrument is accepted by third-party merchants or involves payment settlement outside the issuing entity&apos;s own goods and services, RBI authorisation must be carefully evaluated.</div>
      </Section>

      <Section id="ppi-vs-pa" title="PPI Registration vs Payment Aggregator License">
        <DataTable headers={['Particular', 'PPI Registration', 'Payment Aggregator License']} rows={[
          ['Core Activity', 'Issuance and operation of stored value instruments', 'Aggregation of customer payments and settlement to merchants'],
          ['Regulator', 'RBI', 'RBI'],
          ['Instrument', 'Wallet, card or stored value instrument', 'Payment collection and settlement infrastructure'],
          ['Customer Fund Position', 'Customer stores value with issuer', 'PA collects funds for merchant settlement'],
          ['Escrow / Settlement', 'Customer fund protection and settlement framework applies', 'Escrow framework for merchant settlement applies'],
          ['Typical Business', 'Wallet, prepaid card, gift card, transit wallet', 'Online checkout, POS aggregation, merchant payment settlement'],
          ['Authorisation', 'PPI issuer authorisation', 'PA authorisation']
        ]} />
        <p>Some fintech models may require both PPI and Payment Aggregator analysis depending on fund flow, wallet structure, merchant settlement and technology model.</p>
      </Section>

      <Section id="who-requires-ppi" title="Who Requires PPI Registration in India?">
        <CardGrid cards={[
          { title: 'Digital Wallet Companies', body: 'Entities issuing wallets for purchase of goods, services or remittances.' },
          { title: 'Prepaid Card Issuers', body: 'Companies planning to issue reloadable or non-reloadable prepaid cards.' },
          { title: 'Gift Instrument Platforms', body: 'Businesses issuing prepaid gift instruments beyond closed-loop structures.' },
          { title: 'Transit and Mobility Payment Platforms', body: 'Entities enabling stored value instruments for travel, toll, metro, bus or mobility payments.' },
          { title: 'Merchant Network Wallet Businesses', body: 'Companies creating instruments accepted across a group of identified merchants.' },
          { title: 'Fintech Companies with Stored Value Models', body: 'Startups where users load value into an instrument for future payments.' }
        ]} />
        <p>Banks and non-banks have different permissions. Open system PPIs are issued only by banks, while non-bank entities generally require authorisation for semi-closed PPI issuance.</p>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for PPI Registration in India">
        <DataTable headers={['Eligibility Criterion', 'Requirement', 'Practical Meaning']} rows={[
          ['Entity Type', 'Company incorporated in India', 'Non-bank applicants should be properly incorporated and structured'],
          ['Authorisation Requirement', 'Required for non-bank issuers of semi-closed PPIs', 'Application must be made to RBI'],
          ['Business Model', 'Must clearly fall within permitted PPI activity', 'Wallet or stored value model must be clearly explained'],
          ['Net Worth', 'Must meet RBI-prescribed minimum net worth', 'Capital readiness must be demonstrated'],
          ['Fit and Proper', 'Promoters and directors should satisfy integrity expectations', 'Clean regulatory and financial track record is important'],
          ['KYC / AML Framework', 'Required', 'Customer onboarding, due diligence and monitoring must be demonstrated'],
          ['Technology Readiness', 'Required', 'Secure systems, audit controls and cyber resilience are expected'],
          ['Customer Protection', 'Required', 'Grievance redressal, transparency and refund mechanisms must be in place']
        ]} />
      </Section>

      <Section id="net-worth" title="Net Worth Requirement for PPI Registration in India">
        <p>RBI prescribes minimum net worth requirements for non-bank PPI issuers. The exact requirement should be verified from the latest RBI Master Directions and applicable circulars before filing.</p>
        <DataTable headers={['Requirement', 'Practical Position']} rows={[
          ['Minimum Net Worth', 'As prescribed under RBI PPI framework'],
          ['Certification', 'Statutory auditor / CA certificate may be required'],
          ['Ongoing Maintenance', 'Net worth must be maintained continuously'],
          ['Net Worth Review', 'RBI may review financial strength during application and supervision']
        ]} />
        <div className="warning-box">The latest net worth threshold must be verified at the time of filing. This page avoids relying on old capital thresholds and uses the current RBI PPI framework as the reference point.</div>
      </Section>

      <Section id="kyc-aml" title="KYC and AML Requirements for PPI Issuers">
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Customer Due Diligence', 'PPI holders must be onboarded according to applicable KYC norms'],
          ['Minimum Detail PPI', 'Limited-use instruments may have restrictions and limits'],
          ['Full-KYC PPI', 'Higher usage, interoperability and broader functionality may be permitted'],
          ['PMLA Compliance', 'AML obligations apply as applicable'],
          ['Suspicious Transaction Monitoring', 'Transactions must be monitored for risk indicators'],
          ['Record Maintenance', 'KYC and transaction records must be preserved'],
          ['Periodic Updates', 'KYC updates must be undertaken as prescribed'],
          ['FIU-IND Reporting', 'Applicable reporting obligations must be evaluated']
        ]} />
      </Section>

      <Section id="issuance-loading-limits" title="Issuance, Loading and Operational Limits">
        <DataTable headers={['Area', 'Regulatory Position']} rows={[
          ['Form of PPI', 'Cards, wallets or other permitted instruments'],
          ['Loading Channels', 'Cash, bank account, debit card, credit card and other permitted instruments'],
          ['Currency', 'INR for domestic PPIs'],
          ['Interest on Balance', 'No interest payable on PPI balances'],
          ['Cash Loading', 'Subject to RBI-prescribed monthly and instrument limits'],
          ['Gift Instruments', 'Generally non-reloadable and subject to value limits'],
          ['Validity', 'Minimum validity and redemption norms apply'],
          ['Refunds', 'Must follow RBI-prescribed norms and customer protection framework']
        ]} />
        <p>Loading, reloading, cash loading and usage limits should always be aligned with the latest RBI directions and PPI category.</p>
      </Section>

      <Section id="escrow-fund-protection" title="Escrow and Customer Fund Protection for PPI Issuers">
        <p>Non-bank PPI issuers are required to maintain customer funds in accordance with RBI&apos;s fund protection and escrow / settlement framework. The objective is to ensure that customer balances are safeguarded and used only for permitted purposes.</p>
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Designated Account / Escrow', 'Customer funds should be maintained in permitted account structure'],
          ['Permitted Credits', 'PPI sale, reload amounts, refunds and permitted settlement inflows'],
          ['Permitted Debits', 'Merchant settlement, permitted transfers, taxes, refunds and related permitted payments'],
          ['No Interest to PPI Holder', 'PPI balances should not earn interest for holders'],
          ['Reconciliation', 'Daily monitoring and reconciliation required'],
          ['Customer Fund Safety', 'Funds should not be misused for business expenses']
        ]} />
      </Section>

      <Section id="interoperability" title="Interoperability and UPI Access for PPIs">
        <p>RBI has progressively enabled interoperability for certain PPI structures. Full-KYC PPIs may be allowed to participate in interoperable payment systems subject to applicable conditions. RBI has also enabled UPI access for full-KYC PPIs through third-party UPI applications, subject to applicable framework and operational arrangements.</p>
        <BulletList items={['Full-KYC PPI interoperability', 'UPI access for eligible PPIs', 'NPCI operational requirements', 'Customer consent and security', 'Transaction monitoring', 'Technical integration readiness']} />
        <p>Interoperability must be implemented only in accordance with RBI and NPCI requirements.</p>
      </Section>

      <Section id="customer-protection" title="Customer Protection and Grievance Redressal">
        <BulletList items={['Transparent terms and conditions', 'Clear charges and fees disclosure', 'Customer complaint mechanism', 'Refund and failed transaction process', 'Transaction alerts', 'Customer liability framework', 'Fraud reporting mechanism', 'Ombudsman / escalation support where applicable']} />
        <p>Customer protection is central to the PPI framework. Weak grievance handling can attract regulatory concern.</p>
      </Section>

      <Section id="it-cyber-security" title="IT and Cyber Security Requirements for PPI Registration">
        <p>PPI issuers operate payment systems and are expected to maintain robust cyber resilience, payment security controls and data protection systems.</p>
        <h3>IT Governance</h3>
        <BulletList items={['Board-approved IT and information security policy', 'IT steering committee or technology risk oversight', 'Cyber risk assessment', 'Security incident response plan', 'Periodic audit and review']} />
        <h3>Data Security</h3>
        <BulletList items={['Encryption of sensitive data', 'Secure authentication', 'Access control', 'Secure application development', 'Log monitoring and forensic readiness']} />
        <h3>Payment Security</h3>
        <BulletList items={['Fraud monitoring', 'Transaction anomaly detection', 'Device and account risk controls', 'Secure APIs', 'Vulnerability assessment and penetration testing']} />
        <h3>Data Localisation and Audit</h3>
        <BulletList items={['Payment system data storage in India as applicable', 'Vendor and cloud architecture review', 'Contractual controls over data access', 'System audit', 'Cyber security audit', 'VAPT', 'Incident reporting', 'Board reporting']} />
      </Section>

      <Section id="technical-checklist" title="Technical Readiness Checklist for PPI Registration in India">
        <DataTable headers={['Area', 'Status Indicator']} rows={[
          ['Board-approved IT Policy', 'Required'],
          ['Information Security Policy', 'Required'],
          ['Data Localisation Review', 'Required'],
          ['KYC Integration', 'Required'],
          ['Transaction Monitoring', 'Required'],
          ['Fraud Detection System', 'Required'],
          ['Customer Grievance System', 'Required'],
          ['Wallet Ledger System', 'Required'],
          ['Daily Reconciliation', 'Required'],
          ['Escrow / Settlement Reconciliation', 'Required'],
          ['Audit Trail', 'Required'],
          ['VAPT', 'Recommended / required as applicable'],
          ['Cyber Incident Reporting', 'Required as applicable'],
          ['BCP-DR Framework', 'Required'],
          ['Vendor Risk Controls', 'Required']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for PPI Registration in India">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Company Documents', 'Certificate of Incorporation, MOA, AOA, PAN, registered office proof and board resolution'],
          ['Capital Documents', 'Net worth certificate, audited financial statements, bank statements, capital infusion documents'],
          ['Promoter and Director Documents', 'KYC, PAN, DIN, address proof, professional profile, fit and proper declarations'],
          ['Business Documents', 'PPI business model, target customer segment, merchant network strategy, revenue model, 3-year financial projections'],
          ['Policy Documents', 'KYC/AML policy, information security policy, customer grievance policy, risk management policy, refund policy'],
          ['Technology Documents', 'Wallet architecture, transaction flow, cyber security framework, data localisation architecture, audit readiness documents'],
          ['Escrow / Settlement Documents', 'Customer fund protection structure, bank account framework, reconciliation process'],
          ['Compliance Documents', 'Regulatory declarations, board approvals, application forms and other RBI-prescribed documents']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for PPI Registration in India">
        <div className="step-timeline">
          {[
            ['Business Model Assessment', 'Evaluate whether the proposed model is closed system, semi-closed system, open system, wallet, card, gift instrument or another PPI structure.'],
            ['Entity and Object Clause Review', 'Ensure the company structure and MOA object clause support PPI issuance and payment system activity.'],
            ['Capital and Net Worth Readiness', 'Review net worth, capital source, auditor certification and financial strength.'],
            ['Policy and Technology Preparation', 'Prepare KYC/AML policy, IT policy, customer protection framework, wallet architecture, reconciliation controls and cyber security documentation.'],
            ['Application Preparation', 'Compile RBI application, business plan, financial documents, promoter details, technology details and regulatory declarations.'],
            ['Submission to RBI', 'File application in the prescribed manner with supporting documents.'],
            ['RBI Review and Clarifications', 'RBI may review business model, financial strength, governance, technology readiness, KYC framework and customer protection systems.'],
            ['Grant of Authorisation', 'Upon regulatory satisfaction, RBI may grant authorisation for permitted PPI activity.'],
            ['Post-Authorisation Setup', 'Implement operational controls, customer onboarding, escrow / settlement reconciliation, reporting, audit and compliance calendar.']
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

      <Section id="timeline" title="Indicative Timeline for PPI Registration in India">
        <DataTable headers={['Stage', 'Activity', 'Estimated Duration']} rows={[
          ['Stage 1', 'Business model and eligibility review', '2 to 3 weeks'],
          ['Stage 2', 'Entity, capital and MOA readiness', '2 to 4 weeks'],
          ['Stage 3', 'Policy, business plan and technology documentation', '3 to 6 weeks'],
          ['Stage 4', 'Application submission', 'Case-specific'],
          ['Stage 5', 'RBI scrutiny and clarifications', '3 to 6 months or more'],
          ['Stage 6', 'Authorisation and operational readiness', 'Subject to RBI satisfaction']
        ]} />
        <div className="warning-box">The timeline is indicative and depends on application quality, regulatory scrutiny, business model clarity, technology readiness and query cycles.</div>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in PPI Registration Applications">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Confusing closed system and semi-closed PPI', 'Wrong regulatory assessment'],
          ['MOA not covering PPI activity', 'Regulatory query or restructuring requirement'],
          ['Weak net worth documentation', 'Application delay'],
          ['Unclear fund flow', 'RBI may seek detailed clarification'],
          ['Weak KYC/AML framework', 'Compliance concern'],
          ['No customer grievance framework', 'Customer protection concern'],
          ['Poor wallet ledger architecture', 'Operational risk'],
          ['No daily reconciliation process', 'Settlement risk'],
          ['Weak cyber security documentation', 'Technology compliance query'],
          ['Improper merchant network explanation', 'Business model concern'],
          ['No realistic business plan', 'Sustainability concern']
        ]} />
      </Section>

      <Section id="post-authorisation-compliance" title="Post-Authorisation Compliance for PPI Issuers">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['KYC / AML Compliance', 'Customer onboarding, due diligence, monitoring and reporting'],
          ['Customer Fund Protection', 'Proper account structure, reconciliation and permitted usage'],
          ['Transaction Monitoring', 'Fraud detection and suspicious activity monitoring'],
          ['Customer Grievance Redressal', 'Complaint handling, refund process and escalation'],
          ['Technology Audit', 'System audit, cyber security review and VAPT where applicable'],
          ['Data Security', 'Secure storage, access controls and data localisation'],
          ['Reporting to RBI', 'Periodic and event-based reporting as prescribed'],
          ['Board Oversight', 'Policy review, risk review and compliance monitoring'],
          ['Interoperability Compliance', 'RBI / NPCI requirements where applicable'],
          ['Agent / Vendor Oversight', 'Due diligence and contractual controls']
        ]} />
      </Section>

      <Section id="supervisory-risk" title="Suspension, Cancellation and Supervisory Risk">
        <DataTable headers={['Trigger', 'Possible Risk']} rows={[
          ['Unauthorised PPI issuance', 'Regulatory action under PSS Act'],
          ['Failure to maintain net worth', 'Supervisory concern'],
          ['Misuse of customer funds', 'Severe regulatory action'],
          ['KYC / AML breach', 'FIU / RBI concern'],
          ['Cyber security breach', 'Supervisory action'],
          ['False disclosures', 'Authorisation cancellation risk'],
          ['Non-compliance with RBI directions', 'Penalty or restriction'],
          ['Weak customer grievance handling', 'Regulatory scrutiny'],
          ['Failure to submit reports', 'Supervisory action']
        ]} />
      </Section>

      <Section id="early-structuring" title="Why Early Structuring Matters for PPI Registration in India">
        <p>PPI Registration in India requires clarity on instrument type, customer fund flow, KYC framework, wallet architecture, settlement process, merchant acceptance network and cyber security. Early structuring helps identify whether the model requires RBI authorisation and whether the applicant is operationally ready before filing.</p>
        <div className="expert-quote">
          <blockquote>&quot;In payment businesses, trust is not built only through technology; it is built through disciplined handling of customer funds, transparent governance and regulatory readiness.&quot;</blockquote>
          <cite>CS Devyani Khambhati - Compliance Expert</cite>
        </div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with PPI Registration in India">
        <CardGrid cards={[
          { title: 'PPI Model Assessment', body: 'We help identify whether the model is closed system, semi-closed system, open system, wallet, card, gift instrument or another stored value structure.' },
          { title: 'Eligibility and Net Worth Review', body: 'We assist in reviewing capital readiness, net worth documentation, auditor certification and financial eligibility.' },
          { title: 'MOA and Entity Structuring', body: 'We review object clauses and assist with amendment requirements before application filing.' },
          { title: 'RBI-Ready Business Plan', body: 'We prepare business plan, customer segment strategy, merchant network model, revenue model, 3-year financial projections and compliance narrative.' },
          { title: 'Policy Documentation', body: 'We assist with KYC/AML policy, information security policy, customer grievance framework, refund policy, risk management policy and operational SOPs.' },
          { title: 'Technology Compliance Review', body: 'We help map wallet architecture, ledger controls, transaction monitoring, reconciliation, data localisation, cyber security and vendor risk.' },
          { title: 'Application and Query Support', body: 'We assist in application preparation and structured responses to RBI queries.' },
          { title: 'Post-Authorisation Compliance', body: 'We support ongoing compliance calendar, policy review, audit coordination, reporting, customer grievance process and regulatory update tracking.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for PPI Registration in India?">
        <CardGrid cards={[
          { title: 'RBI Regulatory Expertise', body: 'Our team works across RBI licensing and compliance matters and understands the regulatory expectations for payment system participants.' },
          { title: 'Payment Business Understanding', body: 'We review fund flow, wallet structure, merchant network, KYC, technology and compliance together.' },
          { title: 'Business Plan and Documentation Strength', body: 'We prepare practical, regulator-facing business plans, projections, governance documents and operating policies.' },
          { title: 'Technology + Compliance Approach', body: 'PPI authorisation requires cyber-readiness, customer fund protection and robust operational systems. We integrate regulatory and technology documentation.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From eligibility review to authorisation application, query support and post-authorisation compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on PPI Registration in India">
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
          <p className="!mb-2"><strong>Expertise:</strong> RBI, SEBI, IRDAI, IFSCA, fintech regulatory compliance, payment system authorisation, PPI registration, KYC/AML, cyber compliance and post-authorisation regulatory support.</p>
          <p className="!mb-0">This content has been prepared from a regulatory advisory perspective to help fintech founders, wallet businesses, prepaid card issuers, payment companies and compliance teams understand the broad RBI framework for Prepaid Payment Instrument authorisation in India.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, financial or investment advice. RBI requirements, application formats, net worth thresholds, KYC requirements, interoperability rules, escrow obligations, cyber security expectations, reporting obligations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with RBI.</div>
      </Section>

      <Section id="speak-to-expert" title="Start Your PPI Registration Journey with Estabizz">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-6 md:p-8 text-white">
          <p className="!text-blue-100">Build your PPI application with structured RBI regulatory support, business model assessment, net worth readiness review, KYC/AML framework, wallet technology documentation, customer fund protection structure, policy drafting and post-authorisation compliance assistance.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0077B6] hover:bg-blue-50">Speak to RBI Compliance Expert</Link>
            <Link href="/get-started" className="rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0077B6]">Apply for PPI Registration</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#10b981] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#059669]">WhatsApp Estabizz Team</a>
          </div>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
