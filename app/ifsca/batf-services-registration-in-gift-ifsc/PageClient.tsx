'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'IFSCA BATF Services Registration: Quick Overview' },
  { id: 'what-is-registration', title: 'What is IFSCA BATF Services Registration?' },
  { id: 'legal-framework', title: 'Legal and Regulatory Framework' },
  { id: 'covered-services', title: 'What are BATF Services?' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'service-recipients', title: 'Eligible Service Recipients' },
  { id: 'safeguarding-conditions', title: 'Safeguarding Conditions' },
  { id: 'fit-and-proper', title: 'Fit and Proper Requirements' },
  { id: 'po-co-requirements', title: 'Principal Officer and Compliance Officer' },
  { id: 'office-space', title: 'Minimum Office Space' },
  { id: 'currency-balance-sheet', title: 'Currency and Balance Sheet' },
  { id: 'application-process', title: 'Application Process' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'fee-structure', title: 'Fee Structure' },
  { id: 'gift-ifsc-benefits', title: 'GIFT IFSC Benefits' },
  { id: 'ongoing-compliance', title: 'Ongoing Compliance' },
  { id: 'ancillary-transition', title: 'Existing Ancillary Service Provider Transition' },
  { id: 'action-default', title: 'Action in Case of Default' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  { q: 'What is IFSCA BATF Services Registration?', a: 'IFSCA BATF Services Registration is the certificate of registration granted by IFSCA to an eligible entity in IFSC for providing Book-keeping, Accounting, Taxation and Financial Crime Compliance Services.' },
  { q: 'What does BATF stand for?', a: 'BATF stands for Book-keeping, Accounting, Taxation and Financial Crime Compliance Services.' },
  { q: 'Who regulates BATF Services in GIFT IFSC?', a: 'BATF Services in GIFT IFSC are regulated by the International Financial Services Centres Authority.' },
  { q: 'Which regulation governs BATF Services?', a: 'BATF Services are governed by the IFSCA Book-keeping, Accounting, Taxation and Financial Crime Compliance Services Regulations, 2024.' },
  { q: 'Can BATF Services be provided without IFSCA registration?', a: 'No person, except permitted transitional Ancillary Service Providers, can provide BATF Services in IFSC without obtaining certificate of registration from IFSCA.' },
  { q: 'What legal structure is permitted for BATF registration?', a: 'The applicant must be set up in IFSC as a Company or Limited Liability Partnership.' },
  { q: 'Can an individual professional apply directly?', a: 'No. An individual professional should operate through an eligible Company or LLP structure set up in IFSC.' },
  { q: 'Who can receive BATF Services?', a: 'The service recipient must be a non-resident and should not be from a FATF high-risk jurisdiction.' },
  { q: 'Are accounting audit services included in BATF?', a: 'No. Accounting services under the regulation do not include auditing services.' },
  { q: 'Are payroll and taxation included in book-keeping services?', a: 'Book-keeping services do not include payroll and taxation services.' },
  { q: 'What are Financial Crime Compliance Services?', a: 'They include services relating to AML, CFT, FATF recommendations and related financial crime compliance activities.' },
  { q: 'What is the role of the Principal Officer?', a: 'The Principal Officer is responsible for overall activities of the BATF Service Provider in IFSC.' },
  { q: 'What is the role of the Compliance Officer?', a: 'The Compliance Officer is responsible for reporting to the Board or head of organisation and ensuring compliance of policies, procedures, record maintenance and regulatory requirements.' },
  { q: 'What experience is required for Principal Officer?', a: 'The Principal Officer must have at least five years of relevant experience.' },
  { q: 'What experience is required for Compliance Officer?', a: 'The Compliance Officer must have at least three years of relevant experience.' },
  { q: 'Are PO and CO required to be based in IFSC?', a: 'Yes. Both Principal Officer and Compliance Officer must be based out of IFSC.' },
  { q: 'What is the minimum office space requirement?', a: 'The BATF Service Provider must ensure office space in IFSC of minimum carpet area computed at 60 sq. ft. per employee.' },
  { q: 'Can existing Indian contracts be transferred to BATF Service Provider?', a: 'No. BATF Service Provider cannot offer BATF Services by transferring or receiving existing contracts or work arrangements from group entities in India.' },
  { q: 'Can employees be transferred from Indian group entities?', a: 'The number of employees transferred or relocated from Indian group entities should not exceed 20% of total employees, subject to the prescribed conditions.' },
  { q: 'Can assets be transferred from Indian group entities?', a: 'No. There should not be any transfer of assets from Indian group entities to the BATF Service Provider.' },
  { q: 'What currency can BATF Service Provider operate in?', a: 'Operations may be carried out in any specified foreign currency. An INR account is permitted for administrative and statutory expenses and other permitted purposes.' },
  { q: 'What is the annual compliance certificate requirement?', a: 'A certificate issued by an independent third-party practicing professional, namely CA, CS or CMA, certifying compliance with the regulations, must be submitted within 90 days from closure of each financial year.' },
  { q: 'What happens if deficiencies are found in the application?', a: 'IFSCA may advise the applicant to rectify deficiencies within 30 days from communication, failing which the application may be rejected after giving reasonable opportunity of written submissions.' },
  { q: 'Can IFSCA cancel BATF registration?', a: 'Yes. Contravention of regulations, guidelines, circulars or directions may lead to enforcement action including suspension or cancellation of registration.' },
  { q: 'How can Estabizz help with IFSCA BATF Services Registration?', a: 'Estabizz assists with service scope assessment, IFSC entity structuring, safeguarding review, PO/CO documentation, business plan, application filing, IFSCA query support and post-registration compliance.' }
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

export default function BatfRegistrationPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'International Financial Services Centres Authority' },
    { title: 'Location', body: 'GIFT IFSC, Gujarat, India' },
    { title: 'Applicable Regulation', body: 'IFSCA Book-keeping, Accounting, Taxation and Financial Crime Compliance Services Regulations, 2024' },
    { title: 'Registration Type', body: 'Certificate of Registration as BATF Service Provider' },
    { title: 'Eligible Structure', body: 'Company or Limited Liability Partnership' },
    { title: 'Service Recipient', body: 'Non-resident client, not from a FATF high-risk jurisdiction' },
    { title: 'Permitted Services', body: 'Book-keeping, Accounting, Taxation and Financial Crime Compliance Services' },
    { title: 'Key Managerial Persons', body: 'Principal Officer and Compliance Officer based in IFSC' },
    { title: 'Minimum Office Space', body: '60 sq. ft. carpet area per employee' },
    { title: 'Currency', body: 'Specified Foreign Currency; INR account permitted for administrative and statutory expenses' },
    { title: 'Annual Compliance', body: 'Third-party compliance certificate within 90 days from financial year closure' },
    { title: 'Timeline', body: 'Indicative and subject to IFSCA review' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🌐', label: 'IFSCA Regulatory Advisory' },
        { emoji: '📊', label: 'Book-keeping, Accounting & Taxation Setup' },
        { emoji: '🛡️', label: 'Financial Crime Compliance Services' },
        { emoji: '🏢', label: 'Company / LLP Structuring' },
        { emoji: '✅', label: 'PO & CO Appointment Support' },
        { emoji: '📋', label: 'Post-Registration Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'BATF Services Registration' }
      ]}
      title="IFSCA BATF Services Registration in GIFT IFSC - Complete Setup Guide"
      heroDescription={
        <p className="m-0">
          <strong>IFSCA BATF Services Registration</strong> enables eligible entities to provide Book-keeping, Accounting, Taxation and Financial Crime Compliance Services from GIFT IFSC to non-resident service recipients, subject to the IFSCA BATF Regulations, 2024. The framework creates a dedicated regulatory route for professional service providers seeking to serve global clients from India&apos;s international financial services centre.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for BATF Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check BATF Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="23 min read"
      displayYear="2024"
      focusKeyword="IFSCA BATF Services Registration"
      sections={tocSections}
      ctaTitle="Apply for BATF Services Registration"
      ctaDescription="Get structured support for IFSC entity setup, BATF service scope mapping, safeguarding review, PO/CO documentation, application filing and post-registration compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT IFSC' },
        { label: 'Regulation', value: 'BATF Regulations 2024' },
        { label: 'Entity Type', value: 'Company / LLP' },
        { label: 'Recipient', value: 'Non-resident clients' },
        { label: 'FATF Rule', value: 'No high-risk jurisdiction' },
        { label: 'Office Space', value: '60 sq. ft. / employee' },
        { label: 'Annual Certificate', value: 'Within 90 days' }
      ]}
      relatedArticles={[
        { title: 'IFSCA Finance Company Registration', href: '/ifsca/finance-company-in-gift-ifsc', category: 'IFSCA', description: 'Finance Company and Finance Unit registration support in GIFT IFSC.' },
        { title: 'IFSCA Aircraft Leasing Registration', href: '/ifsca/aircraft-leasing-registration-in-ifsc', category: 'IFSCA', description: 'Aircraft operating and financial lease registration in GIFT IFSC.' },
        { title: 'IFSCA FinTech Registration', href: '/ifsca/ifsca-fintech-startup-incentives', category: 'IFSCA', description: 'IFSCA FinTech Entity authorisation and incentive framework in GIFT IFSC.' },
        { title: 'PSP License IFSCA', href: '/ifsca/psp-license', category: 'IFSCA', description: 'Payment Service Provider authorisation under IFSCA payment services framework.' },
        { title: 'ITFS Platform IFSC', href: '/ifsca/itfs-platform', category: 'IFSCA', description: 'International Trade Finance Services platform registration in GIFT IFSC.' }
      ]}
      finalCtaTitle="Start Your BATF Services Registration Journey with Estabizz"
      finalCtaDescription="Build your BATF Services setup in GIFT IFSC with structured regulatory support, service scope assessment, IFSC entity structuring, safeguarding review, Principal Officer and Compliance Officer documentation, business plan, application filing and post-registration compliance assistance."
    >
      <Section id="quick-overview" title="IFSCA BATF Services Registration: Quick Overview">
        <CardGrid cards={overviewCards} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s legal structure, proposed BATF services, group structure, workforce plan, service recipient profile, FATF jurisdiction assessment and latest IFSCA regulations at the time of filing.</div>
      </Section>

      <Section id="what-is-registration" title="What is IFSCA BATF Services Registration?">
        <p>IFSCA BATF Services Registration refers to the certificate of registration granted by IFSCA to an eligible entity set up in IFSC for providing Book-keeping, Accounting, Taxation and Financial Crime Compliance Services. Except for permitted transitional cases involving Ancillary Service Providers, no person can provide BATF Services in IFSC without obtaining registration under the BATF Regulations.</p>
        <p>BATF Services Registration is designed to support the development, registration and operations of professional services from IFSC for global clients.</p>
      </Section>

      <Section id="legal-framework" title="Legal and Regulatory Framework for IFSCA BATF Services Registration">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'International Financial Services Centres Authority'],
          ['Applicable Regulation', 'IFSCA Book-keeping, Accounting, Taxation and Financial Crime Compliance Services Regulations, 2024'],
          ['Notification Date', 'June 4, 2024'],
          ['Publication', 'Gazette of India'],
          ['Registration Requirement', 'Certificate of Registration from IFSCA'],
          ['Legal Structure', 'Company or Limited Liability Partnership'],
          ['Service Recipient', 'Non-resident, not from FATF high-risk jurisdiction'],
          ['Core Regulatory Focus', 'Global service delivery, substance, safeguarding against migration of existing Indian business, fit and proper governance, KMP presence and reporting']
        ]} />
        <p>The regulations aim to create a dedicated framework for development, registration and operation of BATF Services from IFSC. IFSCA retains power to specify additional norms, issue clarifications, relax requirements where appropriate and take enforcement action in case of default.</p>
      </Section>

      <Section id="covered-services" title="What Services are Covered under BATF Registration?">
        <CardGrid cards={[
          { title: 'Book-keeping Services', body: 'Classifying and recording transactions, including payroll ledgers in terms of money or any other unit of measurement in books of account or related documents. Book-keeping services do not include payroll and taxation services.' },
          { title: 'Accounting Services', body: 'Reviewing annual and interim financial statements or other accounting information without attestation or assurance; compiling and preparing financial statements; analysing financial statements; and related accounting support including valuation support. Accounting services do not include auditing services.' },
          { title: 'Taxation Services', body: 'Tax consultation, tax planning, preparing and filing tax returns of all kinds, and providing advice and guidance concerning taxes, including direct or indirect taxes, cesses, duties or levies.' },
          { title: 'Financial Crime Compliance Services', body: 'Services relating to compliance with Anti-Money Laundering, Countering the Financing of Terrorism measures, FATF recommendations and related financial crime compliance activities.' }
        ]} />
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for IFSCA BATF Services Registration?">
        <DataTable headers={['Applicant Type', 'Eligibility Position', 'Remarks']} rows={[
          ['Company', 'Eligible', 'Must be set up in IFSC and meet regulatory requirements'],
          ['Limited Liability Partnership', 'Eligible', 'Must be set up in IFSC and meet regulatory requirements'],
          ['CA / CS / CMA / CPA / compliance consulting group', 'Eligible through proper entity structure', 'Subject to Company or LLP setup and IFSCA registration'],
          ['Existing Ancillary Service Provider', 'Transitional route available', 'Must communicate willingness and comply with migration / continuation provisions'],
          ['Individual professional', 'Not eligible directly', 'Must operate through eligible Company or LLP structure'],
          ['Entity with promoters from FATF high-risk jurisdiction', 'Not eligible / restricted', 'Promoters should not be from FATF high-risk jurisdiction']
        ]} />
        <div className="info-box">The applicant must be set up in IFSC and must apply to IFSCA in the specified format and manner with the applicable non-refundable application fee.</div>
      </Section>

      <Section id="service-recipients" title="Eligible Service Recipients for BATF Services">
        <p>A BATF Service Provider must ensure that the service recipient is a non-resident and is not from a FATF high-risk jurisdiction.</p>
        <DataTable headers={['Service Recipient', 'Eligibility Position']} rows={[
          ['Non-resident client', 'Eligible, subject to FATF jurisdiction condition'],
          ['Client from FATF high-risk jurisdiction', 'Not permitted / restricted'],
          ['Indian resident client', 'Not the intended service recipient under BATF framework'],
          ['Group entity client outside India', 'Must be assessed carefully under safeguarding conditions']
        ]} />
        <div className="info-box">The client profile and service contract structure should be examined before application and before onboarding any service recipient.</div>
      </Section>

      <Section id="safeguarding-conditions" title="Safeguarding Conditions under BATF Regulations">
        <p>The BATF framework contains important safeguards to ensure that the IFSC setup is not merely a transfer, splitting, reconstruction or reorganisation of an existing Indian business.</p>
        <DataTable headers={['Safeguard', 'Requirement', 'Practical Meaning']} rows={[
          ['No splitting up', 'Business in IFSC should not be set up by splitting up a business already in existence in India', 'New IFSC business should have independent substance'],
          ['No reconstruction', 'Business should not be reconstruction of existing Indian business', 'Avoid artificial migration of existing Indian operations'],
          ['No reorganisation', 'Business should not be reorganisation of existing Indian business', 'IFSC setup must be commercially and operationally distinct'],
          ['Employee transfer cap', 'Employees transferred or relocated from Indian group entities should not exceed 20% of total employees', 'Compliance to be examined annually'],
          ['New employee rule', 'Employee is treated as new if not employed in Indian group entity for 12 months immediately before employment with BATF SP', 'Helps determine workforce compliance'],
          ['No asset transfer', 'No transfer of assets from Indian group entities to BATF Service Provider', 'Avoid shifting existing Indian asset base'],
          ['No transfer of existing contracts', 'Existing contracts or work arrangements from Indian group entities cannot be shifted to BATF Service Provider', 'Prevents migration of existing Indian client work'],
          ['No termination-and-recontracting', 'Existing Indian contract cannot be prematurely terminated and re-signed with BATF Service Provider for same recipient', 'Prevents indirect contract transfer']
        ]} />
        <div className="warning-box">Workforce compliance under the 20% condition must be complied with every year for ten consecutive financial years from the date of issuance of certificate of registration.</div>
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Requirements for BATF Service Providers">
        <p>The BATF Service Provider must ensure that the entity, Principal Officer, directors, partners, designated partners, key managerial personnel and controlling shareholders are fit and proper persons at all times.</p>
        <DataTable headers={['Fit and Proper Area', 'Requirement']} rows={[
          ['Financial Integrity', 'Record of financial integrity'],
          ['Reputation and Character', 'Good reputation and character'],
          ['Honesty', 'Demonstrable honesty and clean conduct'],
          ['No Conviction', 'No conviction for moral turpitude or economic offence'],
          ['No Pending Recovery Proceeding', 'No pending recovery proceeding by statutory body or financial regulator'],
          ['No Winding Up for Malfeasance', 'No order for winding up passed for malfeasance'],
          ['No Insolvency', 'Not declared undischarged insolvent'],
          ['No Regulatory Debarment', 'No active or recent debarring order from regulatory authority as specified'],
          ['No Unsound Mind Finding', 'No such finding by competent court'],
          ['No Wilful Defaulter / Fugitive Economic Offender', 'Should not be financially unsound, wilful defaulter or fugitive economic offender']
        ]} />
      </Section>

      <Section id="po-co-requirements" title="Principal Officer and Compliance Officer Requirements">
        <DataTable headers={['Particular', 'Principal Officer', 'Compliance Officer']} rows={[
          ['Role', 'Responsible for overall activities in IFSC', 'Responsible for reporting to Board / head of organisation and ensuring compliance of policies, procedures, records and regulations'],
          ['Location', 'Based out of IFSC', 'Based out of IFSC'],
          ['Qualification', 'CA, CS, CMA, CPA, CFA or equivalent; or postgraduate degree in finance, accountancy, business management, commerce, economics, taxation; or law degree from recognised institution', 'Same qualification framework'],
          ['Additional Requirement for FCC Services', 'If providing Financial Crime Compliance Services, Principal Officer must also hold relevant qualification in financial crime compliance', 'Not specifically stated as additional FCC qualification'],
          ['Minimum Experience', 'At least 5 years in relevant field', 'At least 3 years in relevant field']
        ]} />
        <div className="info-box">The PO and CO are central to demonstrating substance and compliance readiness in IFSC.</div>
      </Section>

      <Section id="office-space" title="Minimum Office Space Criteria">
        <p>The BATF Service Provider must ensure office space in IFSC of minimum carpet area computed at 60 sq. ft. per employee.</p>
        <FormulaCard>Proposed employee count x 60 sq. ft. carpet area = minimum IFSC office space planning benchmark</FormulaCard>
        <div className="info-box">The office space plan should be aligned with the proposed employee strength and business plan. Any shared or flexible office arrangement should be checked for compliance with IFSC / SEZ norms.</div>
      </Section>

      <Section id="currency-balance-sheet" title="Currency of Operations and Balance Sheet">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Operations', 'In any Specified Foreign Currency'],
          ['INR Account', 'Permitted for administrative and statutory expenses and other permitted purposes'],
          ['Balance Sheet', 'Maintained in any Specified Foreign Currency'],
          ['Financial Reporting to IFSCA', 'In USD unless otherwise specified']
        ]} />
      </Section>

      <Section id="application-process" title="Step-by-Step Process for IFSCA BATF Services Registration">
        <div className="step-timeline">
          {[
            ['Step 1', 'Service Scope Assessment', 'Identify whether the proposed services fall under book-keeping, accounting, taxation, financial crime compliance or a combination.'],
            ['Step 2', 'Entity Structuring in IFSC', 'Set up or evaluate Company / LLP structure in IFSC with appropriate objects and governance.'],
            ['Step 3', 'FATF Jurisdiction and Service Recipient Review', 'Review promoter jurisdiction, proposed client jurisdiction and non-resident service recipient conditions.'],
            ['Step 4', 'Safeguarding Compliance Review', 'Review splitting, reconstruction, reorganisation, contract transfer, workforce transfer or asset transfer concerns.'],
            ['Step 5', 'KMP Appointment', 'Identify Principal Officer and Compliance Officer based in IFSC with prescribed qualifications and experience.'],
            ['Step 6', 'Document Preparation', 'Prepare business plan, service scope note, compliance framework, fit and proper declarations and office space plan.'],
            ['Step 7', 'Application Filing', 'Submit application to IFSCA in the specified format and manner with non-refundable application fee.'],
            ['Step 8', 'Deficiency Response', 'If IFSCA communicates deficiencies, rectify them within 30 days from communication.'],
            ['Step 9', 'Grant of Certificate of Registration', 'Upon regulatory satisfaction, IFSCA may grant registration subject to conditions.'],
            ['Step 10', 'Post-Registration Compliance', 'Maintain records, comply with reporting, submit annual third-party compliance certificate and inform IFSCA of material changes.']
          ].map(([step, title, desc]) => (
            <div key={step} className="step-card">
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div className="info-box">No application should be rejected without giving reasonable opportunity to make written submissions.</div>
      </Section>

      <Section id="documents-required" title="Documents Required for IFSCA BATF Services Registration">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Entity Documents', 'Certificate of incorporation / LLP registration, constitutional documents, LLP agreement, PAN and registered office details'],
          ['IFSC Setup Documents', 'IFSC unit details, office space plan, SEZ / IFSC setup documents as applicable'],
          ['Promoter / Partner Documents', 'KYC, ownership details, FATF jurisdiction confirmation, financial background and declarations'],
          ['Service Scope Documents', 'Details of proposed book-keeping, accounting, taxation or financial crime compliance services'],
          ['Business Plan', 'Client profile, target jurisdictions, staffing plan, revenue model, 3-year projections and operational strategy'],
          ['Safeguarding Documents', 'Declaration on no splitting, reconstruction, reorganisation, no asset transfer and no transfer of existing Indian contracts'],
          ['KMP Documents', 'Principal Officer and Compliance Officer qualifications, experience proofs, appointment documents and IFSC location confirmation'],
          ['Fit and Proper Documents', 'Declarations for entity, PO, directors / partners, KMPs and controlling shareholders'],
          ['Compliance Documents', 'Internal policies, compliance manual, record maintenance process and regulatory reporting framework'],
          ['Application Documents', 'IFSCA application form, fee payment proof and supporting annexures']
        ]} />
      </Section>

      <Section id="fee-structure" title="IFSCA BATF Fee Structure">
        <DataTable headers={['Fee Type', 'Amount / Basis']} rows={[
          ['Application Fee', 'USD 1,000 per activity'],
          ['Registration Fee', 'USD 5,000 per activity'],
          ['Annual Fee for less than 500 employees', 'USD 5,000 per activity'],
          ['Annual Fee for 500-1000 employees', 'USD 7,500 per activity'],
          ['Annual Fee for more than 1000 employees', 'USD 10,000 per activity'],
          ['Modification of Terms and Conditions', '20% of registration fee'],
          ['Relaxation / Waiver Application', 'USD 1,000']
        ]} />
        <div className="warning-box">Fees must be verified from the latest IFSCA fee circular or applicable instructions at the time of filing.</div>
      </Section>

      <Section id="gift-ifsc-benefits" title="GIFT IFSC Advantages for BATF Service Providers">
        <CardGrid cards={[
          { title: 'Tax Efficiency', body: 'BATF entities may benefit from IFSC tax efficiency, subject to applicable law.' },
          { title: '10-Year Tax Holiday', body: 'Eligible IFSC units may access tax holiday benefits, subject to applicable provisions.' },
          { title: 'Zero-Rated Export of Services', body: 'Export-oriented services from IFSC may receive GST-related benefits, subject to applicable conditions.' },
          { title: 'Customs Exemption', body: 'Goods and services imported into SEZ may receive customs-related benefits, subject to applicable law.' },
          { title: 'Gujarat IT / ITeS and GCC Policy Support', body: 'Eligible projects may evaluate capex, opex and employment-linked incentives subject to policy conditions.' },
          { title: 'Talent Advantage', body: 'Gujarat and nearby states provide strong CA, CS, CMA and finance talent availability.' },
          { title: 'Knowledge Corridor', body: 'Access to institutions and ecosystem around GIFT City, Ahmedabad and Gandhinagar.' },
          { title: 'Unified Regulator', body: 'Operate under IFSCA as a unified financial services regulator.' }
        ]} />
        <div className="info-box">Tax, GST, SEZ and state policy benefits are subject to eligibility, notifications, approvals and amendments. Professional tax advice should be obtained before finalising the structure.</div>
      </Section>

      <Section id="ongoing-compliance" title="Ongoing Compliance for BATF Service Providers">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Material Change Reporting', 'Inform IFSCA of any material change in information or particulars previously furnished'],
          ['Operations Reporting', 'Furnish operational information to IFSCA in specified manner, interval and form'],
          ['Financial Reporting', 'Any financial reporting to IFSCA should be in USD unless otherwise specified'],
          ['Annual Compliance Certificate', 'Submit independent third-party certificate by CA, CS or CMA within 90 days from financial year closure'],
          ['Fit and Proper Maintenance', 'Entity, PO, directors / partners, KMPs and controlling shareholders must remain fit and proper'],
          ['Office Space', 'Maintain 60 sq. ft. carpet area per employee'],
          ['Currency Compliance', 'Operate in specified foreign currency; INR account only for permitted purposes'],
          ['Safeguarding Compliance', 'Maintain compliance with Regulations 8 and 9'],
          ['Record Maintenance', 'Maintain policies, procedures and records properly']
        ]} />
      </Section>

      <Section id="ancillary-transition" title="Transition for Existing Ancillary Service Providers">
        <p>An Ancillary Service Provider that received a letter of continuation may continue to provide BATF Services in its existing legal form for three years from commencement of the BATF Regulations. It must seek registration under the BATF Regulations within that period, failing which it shall not be permitted to undertake BATF Services from IFSC.</p>
        <DataTable headers={['Condition', 'Requirement']} rows={[
          ['Continuation Period', '3 years from commencement of BATF Regulations'],
          ['Registration Requirement', 'Must seek registration within 3 years'],
          ['Ring-Fencing', 'BATF operations must be ring-fenced from other existing IFSC operations'],
          ['Compliance with Regulations 8, 9 and 14', 'Required, subject to savings for existing contracts / manpower / assets'],
          ['PO and CO Compliance', 'Must comply within 6 months from commencement of regulations'],
          ['Fee Payment', 'Must pay such fee as specified by IFSCA']
        ]} />
      </Section>

      <Section id="action-default" title="Action in Case of Default">
        <p>A BATF Service Provider that contravenes provisions of the regulations, guidelines, circulars or directions may be liable for enforcement action under the IFSCA Act, including suspension or cancellation of registration. No enforcement action should be taken without giving reasonable opportunity to make submissions.</p>
        <DataTable headers={['Default', 'Possible Action']} rows={[
          ['Contravention of regulations', 'Enforcement action'],
          ['Non-compliance with reporting', 'Regulatory action'],
          ['Failure to maintain fit and proper status', 'Action by IFSCA'],
          ['Violation of safeguarding conditions', 'Suspension or cancellation risk'],
          ['Misrepresentation', 'Regulatory action'],
          ['Failure to maintain required substance', 'Regulatory concern']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in IFSCA BATF Services Registration">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Treating BATF as generic outsourcing setup', 'Regulatory mismatch'],
          ['Wrong entity structure', 'Application issue'],
          ['Promoter from restricted FATF jurisdiction', 'Eligibility concern'],
          ['Service recipient not non-resident', 'Regulatory non-compliance'],
          ['Transferring existing Indian contracts', 'Violation of safeguarding condition'],
          ['Employee transfer beyond 20%', 'Safeguarding compliance risk'],
          ['No clear PO / CO appointment', 'Substance and compliance concern'],
          ['PO / CO not based in IFSC', 'Regulatory issue'],
          ['No 60 sq. ft. per employee office plan', 'Infrastructure gap'],
          ['Weak business plan', 'Query risk'],
          ['No annual compliance certificate plan', 'Post-registration gap']
        ]} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with IFSCA BATF Services Registration">
        <CardGrid cards={[
          { title: 'Service Scope Assessment', body: 'We help identify whether the proposed activity falls under book-keeping, accounting, taxation, financial crime compliance or a combination of BATF services.' },
          { title: 'IFSC Entity Structuring', body: 'We assist in evaluating Company or LLP structure, object clauses, ownership and IFSC setup requirements.' },
          { title: 'Safeguarding Review', body: 'We review employee transfer, asset transfer, group entity contracts and existing Indian business arrangements to avoid regulatory gaps.' },
          { title: 'PO and CO Documentation', body: 'We assist in evaluating Principal Officer and Compliance Officer eligibility, qualification, experience and IFSC-based appointment documents.' },
          { title: 'Application Documentation', body: 'We prepare business plan, service scope note, fit and proper declarations, compliance framework, office space plan and application dossier.' },
          { title: 'Fee and Activity Mapping', body: 'We help map proposed activities with application fee, registration fee and annual fee implications.' },
          { title: 'IFSCA Query Support', body: 'We assist with structured responses to IFSCA deficiencies or clarification requests.' },
          { title: 'Post-Registration Compliance', body: 'We support annual compliance certificate, material change reporting, regulatory updates, record maintenance and ongoing governance review.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} columns="md:grid-cols-3" />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for IFSCA BATF Services Registration?">
        <CardGrid cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands IFSC regulatory expectations.' },
          { title: 'Professional Services Structuring', body: 'We understand CA, CS, accounting, taxation and financial crime compliance business models and structure them within regulatory boundaries.' },
          { title: 'Safeguarding Condition Review', body: 'We help identify risk around transfer of Indian contracts, workforce relocation, asset transfer and group entity arrangements.' },
          { title: 'Business Plan and Documentation Strength', body: 'We prepare regulator-facing business plans, service scope documents, staffing plans and compliance frameworks.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From IFSC structuring to IFSCA application, query support and post-registration compliance, we provide organised professional handholding.' }
        ]} columns="md:grid-cols-3" />
      </Section>

      <Section id="faqs" title="FAQs on IFSCA BATF Services Registration">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={faq.q} className="faq-item">
              <summary>{index + 1}. {faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewed by Estabizz Compliance Expert">
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, BATF Services, financial crime compliance, professional services structuring and post-registration compliance.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help professional service providers, accounting firms, taxation consultants, financial crime compliance specialists and consulting groups understand the broad IFSCA framework for BATF Services in GIFT IFSC.</p>
        </div>
        <div className="warning-box">
          This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, fee structures, safeguarding conditions, service recipient rules, compliance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.
        </div>
      </Section>

      <Section id="speak-to-expert" title="Start Your BATF Services Registration Journey with Estabizz">
        <p>Build your BATF Services setup in GIFT IFSC with structured regulatory support, service scope assessment, IFSC entity structuring, safeguarding review, Principal Officer and Compliance Officer documentation, business plan, application filing and post-registration compliance assistance.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors text-center">Speak to IFSCA Compliance Expert</Link>
          <Link href="/get-started" className="px-6 py-3 bg-[#0096D6] text-white font-bold rounded-xl hover:bg-[#0077B6] transition-colors text-center">Apply for BATF Services Registration</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
