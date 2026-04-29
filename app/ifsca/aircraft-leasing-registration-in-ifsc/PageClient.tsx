'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'IFSCA Aircraft Leasing Registration: Quick Overview' },
  { id: 'what-is-registration', title: 'What is IFSCA Aircraft Leasing Registration?' },
  { id: 'why-gift-ifsc', title: 'Why GIFT IFSC for Aircraft Leasing?' },
  { id: 'legal-framework', title: 'Legal and Regulatory Framework' },
  { id: 'meaning-of-lessor', title: 'Meaning of Aircraft Lessor' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'entity-structure', title: 'Entity Structure' },
  { id: 'operating-lease', title: 'Permissible Activities: Operating Lease' },
  { id: 'financial-lease', title: 'Permissible Activities: Financial Lease' },
  { id: 'lease-comparison', title: 'Operating Lease vs Financial Lease' },
  { id: 'capital-requirement', title: 'Capital Requirement' },
  { id: 'fee-structure', title: 'Fee Structure' },
  { id: 'currency-books', title: 'Currency and Books of Accounts' },
  { id: 'swits-process', title: 'Application Process through SWITS' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'gift-ifsc-advantages', title: 'GIFT IFSC Tax and Business Advantages' },
  { id: 'ongoing-compliance', title: 'Ongoing Compliance' },
  { id: 'resident-india-restrictions', title: 'Restrictions on Transactions with Indian Residents' },
  { id: 'office-manpower-sharing', title: 'Office Space and Manpower Sharing' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  { q: 'What is IFSCA Aircraft Leasing Registration?', a: 'IFSCA Aircraft Leasing Registration refers to registration with IFSCA as a Finance Company or Finance Unit for undertaking aircraft leasing activities in IFSC under the Framework for Aircraft Lease.' },
  { q: 'Who regulates aircraft leasing in GIFT IFSC?', a: 'Aircraft leasing in GIFT IFSC is regulated by the International Financial Services Centres Authority.' },
  { q: 'Under which framework is aircraft leasing regulated in IFSC?', a: 'Aircraft leasing is regulated under the IFSCA Finance Company Regulations and the Framework for Aircraft Lease.' },
  { q: 'What assets can be leased under the aircraft leasing framework?', a: 'The framework covers aircraft, helicopters, engines, aircraft parts, aircraft ground support equipment and aviation training simulation devices.' },
  { q: 'Can an aircraft leasing entity be set up as an LLP?', a: 'Yes. The framework allows the applicant to set up operations in IFSC as a Company, LLP, Trust or any other form as may be specified by IFSCA.' },
  { q: 'What is the capital requirement for aircraft operating lease?', a: 'A minimum owned fund of USD 200,000 or equivalent in freely convertible foreign currency must be maintained at all times.' },
  { q: 'What is the capital requirement for aircraft financial lease?', a: 'A minimum owned fund of USD 3 million or equivalent in freely convertible foreign currency must be maintained at all times.' },
  { q: 'Can the entity undertake both operating lease and financial lease?', a: 'Yes, subject to registration, applicable capital requirement and compliance with the relevant framework.' },
  { q: 'What currency can aircraft lessors use for business?', a: 'Transactions must be undertaken in freely convertible foreign currency. Administrative expenses may be defrayed in INR through a separate INR account.' },
  { q: 'Is promoter jurisdiction important?', a: 'Yes. Promoters, partners or trustees, as applicable, must be located in a FATF-compliant jurisdiction.' },
  { q: 'Is SWITS used for aircraft leasing application?', a: 'Yes. Applications are submitted through IFSCA Single Window IT System, subject to applicable procedure.' },
  { q: 'Can the lessor start business before registration?', a: 'No. The applicant cannot undertake permissible activities as a Lessor unless it has obtained a Certificate of Registration from IFSCA.' },
  { q: 'Can an IFSC aircraft lessor share office space?', a: 'Sharing of office space or manpower with another aircraft lessor being a group entity is permitted subject to applicable IFSCA and SEZ rules.' },
  { q: 'Are aircraft lessors required to comply with AML and KYC guidelines?', a: 'Yes. The Lessor must comply with IFSCA Anti Money Laundering, Counter-Terrorist Financing and Know Your Customer Guidelines.' },
  { q: 'What reports must be submitted to IFSCA?', a: 'Within 15 days from finalisation of annual financial statements, the lessor must submit audited financial statements, compliance confirmation, capital compliance confirmation and details of material regulatory action, if any.' },
  { q: 'Are all transactions allowed with persons resident in India?', a: 'No. The revised framework contains restrictions on acquiring assets from persons resident in India where the asset will be used solely by persons resident in India or to provide services to such persons, subject to specified exceptions.' },
  { q: 'What are the fees for aircraft operating lease registration?', a: 'Current fees stated in the framework include application fee of USD 1,000, registration fee of USD 12,500 and annual fee of USD 5,000, subject to latest fee circular.' },
  { q: 'What are the fees for financial lease registration?', a: 'Current fees stated in the framework include application fee of USD 1,000, registration fee of USD 12,500 and annual fee of USD 12,500, subject to latest fee circular.' },
  { q: 'What happens if the lessor fails to fulfil registration conditions?', a: 'IFSCA may take action as it deems fit after giving an opportunity of making submissions.' },
  { q: 'How can Estabizz help with aircraft leasing registration?', a: 'Estabizz assists with lease model assessment, IFSC entity structuring, capital readiness review, business plan, SWITS application, regulatory documentation, IFSCA query support and post-registration compliance.' }
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

export default function AircraftLeasingRegistrationPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'International Financial Services Centres Authority' },
    { title: 'Location', body: 'GIFT IFSC, Gujarat, India' },
    { title: 'Applicable Framework', body: 'Framework for Aircraft Lease issued under IFSCA Finance Company Regulations' },
    { title: 'Registration Type', body: 'Finance Company or Finance Unit as aircraft lessor' },
    { title: 'Permitted Structures', body: 'Company, LLP, Trust or any other form as specified by IFSCA' },
    { title: 'Operating Lease Capital', body: 'Minimum owned fund of USD 200,000 or equivalent' },
    { title: 'Financial / Hybrid Lease Capital', body: 'Minimum owned fund of USD 3 million or equivalent' },
    { title: 'Currency', body: 'Freely convertible foreign currency; administrative expenses may be defrayed in INR' },
    { title: 'Promoter Jurisdiction', body: 'Promoter / partners / trustees must be located in FATF-compliant jurisdiction' },
    { title: 'Application System', body: 'IFSCA Single Window IT System / SWITS' },
    { title: 'Office / Manpower Sharing', body: 'Permitted subject to applicable IFSCA and SEZ rules' },
    { title: 'Timeline', body: 'Indicative and subject to IFSCA review' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '✈️', label: 'IFSCA Regulatory Advisory' },
        { emoji: '🌐', label: 'GIFT City Aircraft Lessor Setup' },
        { emoji: '📑', label: 'Operating Lease & Financial Lease Structuring' },
        { emoji: '💼', label: 'USD 200,000 / USD 3 Million Capital Guidance' },
        { emoji: '🖥️', label: 'SWITS Application Support' },
        { emoji: '✅', label: 'Post-Registration Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'Aircraft Leasing Registration' }
      ]}
      title="IFSCA Aircraft Leasing Registration in IFSC - Complete GIFT City Aircraft Lessor Setup Guide"
      heroDescription={
        <p className="m-0">
          <strong>IFSCA Aircraft Leasing Registration</strong> enables eligible entities to set up aircraft leasing operations in GIFT IFSC as a Finance Company or Finance Unit under the IFSCA Finance Company Regulations and the Framework for Aircraft Lease. The framework allows aircraft lessors to undertake operating lease, financial lease, hybrid lease and related aircraft leasing activities for aircraft, helicopters, engines, aircraft parts, aircraft ground support equipment and aviation training simulation devices, subject to IFSCA registration and compliance.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for Aircraft Leasing Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check IFSC Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="24 min read"
      displayYear="2025"
      focusKeyword="IFSCA Aircraft Leasing Registration"
      sections={tocSections}
      ctaTitle="Apply for Aircraft Leasing Registration"
      ctaDescription="Get structured support for IFSC aircraft lessor setup, lease model assessment, capital readiness, SWITS application, business plan, documentation and post-registration compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT IFSC' },
        { label: 'Operating Capital', value: 'USD 200,000' },
        { label: 'Financial Capital', value: 'USD 3 million' },
        { label: 'Currency', value: 'Foreign currency' },
        { label: 'Application', value: 'SWITS' },
        { label: 'Structures', value: 'Company / LLP / Trust' },
        { label: 'Timeline', value: 'Subject to IFSCA review' }
      ]}
      relatedArticles={[
        { title: 'IFSCA Finance Company Registration', href: '/ifsca/finance-company', category: 'IFSCA', description: 'Finance Company and Finance Unit registration support in GIFT IFSC.' },
        { title: 'IFSCA FinTech Registration', href: '/ifsca/fintech-entity', category: 'IFSCA', description: 'IFSCA FinTech Entity authorisation and incentive framework in GIFT IFSC.' },
        { title: 'PSP License IFSCA', href: '/ifsca/psp-license', category: 'IFSCA', description: 'Payment Service Provider authorisation under IFSCA payment services framework.' },
        { title: 'BATF Services IFSC', href: '/ifsca/batf-services', category: 'IFSCA', description: 'Book-keeping, accounting, taxation and financial crime compliance services in GIFT IFSC.' },
        { title: 'ITFS Platform IFSC', href: '/ifsca/itfs-platform', category: 'IFSCA', description: 'International Trade Finance Services platform registration in GIFT IFSC.' }
      ]}
      finalCtaTitle="Start Your Aircraft Leasing Registration Journey with Estabizz"
      finalCtaDescription="Build your aircraft leasing setup in GIFT IFSC with structured regulatory support, lease model assessment, IFSC entity structuring, capital readiness review, SWITS application, business plan, documentation and post-registration compliance assistance."
    >
      <Section id="quick-overview" title="IFSCA Aircraft Leasing Registration: Quick Overview">
        <CardGrid cards={overviewCards} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s lease model, entity structure, ownership, promoter jurisdiction, capital plan, group structure, proposed assets and the latest IFSCA circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-registration" title="What is IFSCA Aircraft Leasing Registration?">
        <p>IFSCA Aircraft Leasing Registration refers to registration granted by the International Financial Services Centres Authority to an eligible entity operating from IFSC as a Finance Company or Finance Unit for undertaking aircraft leasing activities. The framework covers leasing of aircraft, helicopters, engines of aircraft or helicopter, aircraft parts, aircraft ground support equipment and aviation training simulation devices.</p>
        <p>An applicant cannot undertake permissible activities as a Lessor unless it has obtained a Certificate of Registration from IFSCA under the Finance Company Regulations.</p>
      </Section>

      <Section id="why-gift-ifsc" title="Why GIFT IFSC for Aircraft Leasing?">
        <p>GIFT IFSC has been developed to onshore international financial services business that was historically undertaken from offshore centres such as Singapore, Hong Kong, Dubai, London, Luxembourg and Ireland. Aircraft leasing is one of the niche financial services promoted within IFSC to support India&apos;s aviation and financial ecosystem.</p>
        <CardGrid cards={[
          { title: 'International Financial Services Hub', body: 'GIFT IFSC is designed to serve India demand for international financial services.' },
          { title: 'Unified Financial Regulator', body: 'IFSCA acts as a dedicated and unified financial regulator for IFSC entities.' },
          { title: 'Foreign Currency Operations', body: 'Aircraft lessors can undertake transactions in freely convertible foreign currencies.' },
          { title: 'Competitive Tax Regime', body: 'GIFT IFSC offers an attractive tax framework, subject to applicable law.' },
          { title: 'Growing Aviation Opportunity', body: 'India aviation demand and aircraft leasing opportunity create a strong business case for IFSC-based lessor structures.' },
          { title: 'Global Capital Gateway', body: 'GIFT IFSC supports India ambition to channel global capital into specialised financial services.' }
        ]} />
      </Section>

      <Section id="legal-framework" title="Legal and Regulatory Framework for Aircraft Leasing in IFSC">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'International Financial Services Centres Authority'],
          ['Primary Regulation', 'IFSCA Finance Company Regulations, 2021'],
          ['Specific Framework', 'Framework for Aircraft Lease, updated as on February 26, 2025'],
          ['Financial Product', 'Aircraft lease, including operating lease, financial lease and hybrid lease'],
          ['Application Mode', 'Single Window IT System / SWITS'],
          ['Registration Requirement', 'Certificate of Registration under Finance Company Regulations'],
          ['Regulatory Basis', 'IFSCA Act, 2019 and applicable IFSCA circulars'],
          ['Compliance Areas', 'Capital, KYC/AML, governance, reporting, books of accounts, currency rules and permissible activity restrictions']
        ]} />
        <p>The Framework for Aircraft Lease facilitates the setting up of aircraft leasing business in IFSC and specifies eligibility, permissible activities, capital requirement, fees, currency rules, reporting and general compliance conditions.</p>
      </Section>

      <Section id="meaning-of-lessor" title="Meaning of Aircraft Lessor under IFSCA Framework">
        <p>A Lessor means an entity registered with IFSCA as a Finance Company or Finance Unit in accordance with the Finance Company Regulations and engaged in the business of providing aircraft, helicopters, engines, aircraft parts, aircraft ground support equipment or aviation training simulation devices under operating lease, financial lease or hybrid lease.</p>
        <BulletList items={['Aircraft', 'Helicopters', 'Engines of aircraft or helicopters', 'Parts of aircraft or helicopters', 'Aircraft Ground Support Equipment', 'Aviation Training Simulation Devices', 'Any other related activity specified or approved by IFSCA']} />
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for IFSCA Aircraft Leasing Registration?">
        <DataTable headers={['Applicant Type', 'Eligibility Position', 'Remarks']} rows={[
          ['Company', 'Eligible', 'Promoter must be located in FATF-compliant jurisdiction'],
          ['LLP', 'Eligible', 'Partners must comply with FATF jurisdiction requirement'],
          ['Trust', 'Eligible', 'Trustees must comply with FATF jurisdiction requirement'],
          ['Other form specified by IFSCA', 'Eligible if permitted', 'Subject to IFSCA approval / specification'],
          ['Entity using wholly owned subsidiaries in IFSC', 'May be deemed Lessor', 'Applicable where aircraft lease is undertaken through WOS in IFSC']
        ]} />
        <p>The applicant must set up operations in IFSC and must satisfy eligibility criteria under the IFSCA Finance Company Regulations and Framework for Aircraft Lease.</p>
      </Section>

      <Section id="entity-structure" title="Entity Structure for Aircraft Leasing in IFSC">
        <CardGrid cards={[
          { title: 'Company Structure', body: 'Suitable for corporate aviation leasing groups and institutional sponsors.' },
          { title: 'LLP Structure', body: 'May be considered where partnership-based structure is commercially suitable.' },
          { title: 'Trust Structure', body: 'May be used where trust-based asset holding or structured leasing arrangement is commercially appropriate.' },
          { title: 'Wholly Owned Subsidiary Structure', body: 'An entity intending to undertake aircraft leasing through wholly owned subsidiaries in IFSC may be treated as a Lessor under the framework.' }
        ]} />
        <p>The final structure should be evaluated based on tax, ownership, funding, asset holding, airline contracts, lease type and group requirements.</p>
      </Section>

      <Section id="operating-lease" title="Permissible Activities under Aircraft Operating Lease">
        <DataTable headers={['Activity', 'Description']} rows={[
          ['Operating lease for aircraft lease arrangement', 'Leasing of aircraft or helicopter under operating lease'],
          ['Operating lease for aircraft ground support equipment', 'Leasing of eligible ground support equipment'],
          ['Operating lease for aviation training simulation device', 'Leasing of simulation devices permitted by IFSCA'],
          ['Asset Management Support Services', 'For assets owned or leased by the lessor or group entities set up in IFSC'],
          ['Sale and leaseback / purchase / novation / transfer / assignment', 'Permitted in relation to specified activities, subject to restrictions'],
          ['Other related activity', 'With prior approval of IFSCA']
        ]} />
      </Section>

      <Section id="financial-lease" title="Permissible Activities under Aircraft Financial Lease and Hybrid Lease">
        <DataTable headers={['Activity', 'Description']} rows={[
          ['Financial lease for aircraft lease arrangement', 'Financial lease of aircraft or helicopter'],
          ['Hybrid lease', 'Hybrid of financial lease and operating lease'],
          ['Financial / hybrid lease for aircraft ground support equipment', 'Leasing of eligible ground support equipment'],
          ['Financial / hybrid lease for aviation training simulation device', 'Leasing of permitted simulation devices'],
          ['Sale and leaseback / purchase / novation / transfer / assignment', 'Permitted in relation to specified activities, subject to restrictions'],
          ['Operating lease activities', 'Financial lease registered entities may undertake permitted operating lease activities as applicable'],
          ['Other related activity', 'With prior approval of IFSCA']
        ]} />
      </Section>

      <Section id="lease-comparison" title="Operating Lease vs Financial Lease under IFSCA Aircraft Leasing Framework">
        <DataTable headers={['Particular', 'Operating Lease', 'Financial Lease / Hybrid Lease']} rows={[
          ['Regulatory Classification', 'Permitted non-core activity', 'Permitted core activity'],
          ['Minimum Owned Fund', 'USD 200,000 or equivalent', 'USD 3 million or equivalent'],
          ['Capital Maintenance', 'At all times', 'At all times'],
          ['Permitted Assets', 'Aircraft, helicopter, engines, parts, ground support equipment, simulation devices', 'Aircraft, helicopter, engines, parts, ground support equipment, simulation devices'],
          ['Additional Prudential Requirements', 'As applicable', 'Subject to prudential regulations, KYC/AML, corporate governance and disclosure requirements for core activities'],
          ['Fees', 'Application, registration and annual fees as per fee circular', 'Application, registration and annual fees as per fee circular']
        ]} />
      </Section>

      <Section id="capital-requirement" title="Capital Requirement for IFSCA Aircraft Leasing Registration">
        <DataTable headers={['Lease Type', 'Minimum Owned Fund', 'Nature']} rows={[
          ['Operating Lease', 'USD 200,000 or equivalent in freely convertible foreign currency', 'Maintained at all times'],
          ['Financial Lease / Hybrid Lease', 'USD 3 million or equivalent in freely convertible foreign currency', 'Maintained at all times']
        ]} />
        <p>Owned fund for a Lessor means paid-up capital and free reserves, balance in share premium account and capital reserves representing surplus arising out of sale proceeds of asset, excluding reserves created by revaluation of asset, as reduced by accumulated loss balance, book value of intangible assets and deferred revenue expenditure, if any.</p>
        <p>IFSCA may specify additional capital as a risk management measure based on the nature and scale of business of the Lessor.</p>
      </Section>

      <Section id="fee-structure" title="IFSCA Fee Structure for Aircraft Leasing Entity">
        <DataTable headers={['Lease Type', 'Application Fee', 'Registration Fee', 'Annual Fee']} rows={[
          ['Operating Lease', 'USD 1,000', 'USD 12,500', 'USD 5,000'],
          ['Financial Lease / Hybrid Lease', 'USD 1,000', 'USD 12,500', 'USD 12,500']
        ]} />
        <div className="warning-box">Fees should be verified from the latest IFSCA fee circular at the time of filing.</div>
      </Section>

      <Section id="currency-books" title="Currency and Books of Accounts">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Transaction Currency', 'Freely convertible foreign currency only'],
          ['Administrative Expenses', 'May be defrayed in INR through separate INR account'],
          ['Books of Accounts', 'Maintained as required under applicable law'],
          ['Financial Information', 'Submitted to IFSCA in USD unless otherwise specified'],
          ['Records', 'Books, records and documents must be maintained properly']
        ]} />
      </Section>

      <Section id="swits-process" title="Step-by-Step Process for IFSCA Aircraft Leasing Registration">
        <div className="step-timeline">
          {[
            ['Business Model and Lease Type Assessment', 'Identify whether the proposed model is operating lease, financial lease, hybrid lease, asset management support service, sale and leaseback or group entity structure.'],
            ['Entity Structuring in IFSC', 'Set up or identify the entity structure as Company, LLP, Trust or other permitted form in IFSC.'],
            ['Promoter / Partner / Trustee Jurisdiction Review', 'Confirm that promoter, partners or trustees are located in FATF-compliant jurisdiction.'],
            ['Capital Planning', 'Arrange owned fund requirement of USD 200,000 for operating lease or USD 3 million for financial / hybrid lease, as applicable.'],
            ['Document and Policy Preparation', 'Prepare business plan, ownership structure, financial documents, compliance policies, KYC/AML framework and governance documents.'],
            ['SWITS Application Filing', 'Submit the application on the IFSCA Single Window IT System along with prescribed fees and supporting documents.'],
            ['IFSCA Review and Clarifications', 'IFSCA may review eligibility, capital, promoter background, lease structure, asset details, business plan and compliance readiness.'],
            ['Grant of Certificate of Registration', 'Upon regulatory satisfaction, IFSCA may grant Certificate of Registration as Finance Company / Finance Unit for aircraft leasing activities.'],
            ['Post-Registration Operational Setup', 'Commence permitted activities, maintain books, file reports, comply with KYC/AML, maintain capital and meet ongoing reporting obligations.']
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
        <div className="warning-box">The applicant shall not undertake permissible activities as a Lessor unless it has obtained Certificate of Registration from IFSCA.</div>
      </Section>

      <Section id="documents-required" title="Documents Required for IFSCA Aircraft Leasing Registration">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Entity Documents', 'Certificate of incorporation / registration, constitutional documents, LLP agreement or trust deed as applicable'],
          ['IFSC Setup Documents', 'IFSC unit setup documents, office details, SEZ / IFSC approvals as applicable'],
          ['Promoter / Partner / Trustee Documents', 'KYC, FATF jurisdiction confirmation, ownership details, financial background and declarations'],
          ['Business Plan', 'Lease model, aircraft asset strategy, target lessees, revenue model, financial projections and risk framework'],
          ['Capital Documents', 'Proof of owned fund, bank statements, auditor certificate and capital infusion documents'],
          ['Governance Documents', 'Board / governing body approvals, authorised signatory details, corporate governance framework'],
          ['KYC / AML Documents', 'Policy aligned with IFSCA AML, CFT and KYC Guidelines'],
          ['Lease Structure Documents', 'Operating lease / financial lease / hybrid lease model, asset acquisition plan, sale and leaseback structure if applicable'],
          ['Group Entity Details', 'Details of group entities if asset management support services or group sharing structure is proposed'],
          ['Application Documents', 'SWITS application forms, fee payment proof and IFSCA-prescribed documents']
        ]} />
      </Section>

      <Section id="gift-ifsc-advantages" title="GIFT IFSC Advantages for Aircraft Leasing">
        <CardGrid cards={[
          { title: 'Tax Holiday', body: 'Business income tax holiday for 10 out of 15 years, subject to applicable law.' },
          { title: 'Competitive Tax Regime', body: 'Attractive tax framework for IFSC entities, subject to applicable provisions.' },
          { title: 'Foreign Currency Flexibility', body: 'Ability to transact in freely convertible foreign currency.' },
          { title: 'No Capital Controls in IFSC Framework', body: 'GIFT IFSC offers a globally benchmarked regulatory environment with foreign currency convertibility.' },
          { title: 'Cost and Talent Advantage', body: 'Access to India skilled talent pool and cost-efficient operations.' },
          { title: 'Strategic Location', body: 'GIFT IFSC supports onshoring of offshore international financial services.' }
        ]} />
        <div className="warning-box">Tax and fiscal benefits are subject to applicable law, eligibility, notifications and amendments. Applicants should obtain tax advice before finalising structure.</div>
      </Section>

      <Section id="ongoing-compliance" title="Ongoing Compliance for Aircraft Lessors in IFSC">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Capital Maintenance', 'Maintain applicable owned fund at all times'],
          ['Annual Financial Statements', 'Submit within 15 days from finalisation'],
          ['Regulatory Compliance Confirmation', 'Submit confirmation of compliance with applicable regulations and circulars'],
          ['Capital Compliance Confirmation', 'Submit confirmation and details of capital compliance'],
          ['Material Regulatory Action', 'Disclose material regulatory action against promoters, KMPs or controlling persons'],
          ['Financial Information', 'Submit in USD unless otherwise specified'],
          ['KYC / AML Compliance', 'Comply with IFSCA AML, CFT and KYC Guidelines'],
          ['Books and Records', 'Maintain books, records and documents as required'],
          ['Cape Town Convention', 'Comply with Cape Town Convention and Protocol and other applicable obligations'],
          ['Information Calls', 'Furnish information, documents or records as called by IFSCA']
        ]} />
      </Section>

      <Section id="resident-india-restrictions" title="Restrictions on Transactions with Persons Resident in India">
        <p>The revised framework contains specific restrictions for transactions involving persons resident in India. A Lessor cannot purchase, lease or otherwise acquire assets covered under the framework from persons resident in India where, after acquisition, the asset will be operated or used solely by persons resident in India or to provide services to persons resident in India.</p>
        <DataTable headers={['Exception', 'Meaning']} rows={[
          ['Acquisition from non-group Indian person', 'Restriction does not apply where acquisition is from a person who is not a group entity of the Lessor'],
          ['First import sale and leaseback', 'Restriction does not apply where acquisition is part of sale and leaseback of assets being imported into India for the first time'],
          ['Acquisition from Indian manufacturer', 'Restriction does not apply where the asset is acquired from a manufacturer of such asset in India']
        ]} />
        <div className="warning-box">This section is specific to aircraft leasing and should not be mixed with ship leasing restrictions.</div>
      </Section>

      <Section id="office-manpower-sharing" title="Office Space and Manpower Sharing for Aircraft Lessors">
        <p>An IFSC aircraft lessor may share office space or manpower or both with another aircraft lessor being a group entity, subject to applicable IFSCA circulars and Rule 21B of the SEZ Rules, 2006.</p>
        <div className="info-box">Sharing arrangements should be properly documented and aligned with IFSCA and SEZ requirements.</div>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in IFSCA Aircraft Leasing Registration">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Confusing ship leasing and aircraft leasing framework', 'Wrong regulatory content or application approach'],
          ['Wrong classification of operating vs financial lease', 'Incorrect capital and compliance assessment'],
          ['Insufficient owned fund planning', 'Application delay or regulatory concern'],
          ['Promoter not from FATF-compliant jurisdiction', 'Eligibility issue'],
          ['No clear lease structure', 'IFSCA may seek clarification'],
          ['Weak business plan', 'Regulatory query risk'],
          ['Ignoring person resident in India restrictions', 'Transaction structuring risk'],
          ['No KYC/AML framework', 'Compliance concern'],
          ['No clarity on currency and accounting', 'Reporting issue'],
          ['Failure to plan ongoing reports', 'Post-registration compliance gap']
        ]} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with IFSCA Aircraft Leasing Registration">
        <CardGrid cards={[
          { title: 'Lease Model Assessment', body: 'We help identify whether the proposed business falls under operating lease, financial lease, hybrid lease, sale and leaseback or asset management support services.' },
          { title: 'IFSC Entity Structuring', body: 'We assist in evaluating suitable entity structure such as Company, LLP, Trust or group entity model in IFSC.' },
          { title: 'Capital Readiness Support', body: 'We assist in reviewing USD 200,000 or USD 3 million owned fund readiness, as applicable.' },
          { title: 'Business Plan and Financial Projection', body: 'We prepare IFSCA-ready business plan, asset strategy, revenue model, lessee profile, risk framework and financial projections.' },
          { title: 'Regulatory Documentation', body: 'We support SWITS application, governance documents, promoter information, KYC/AML policy and lease structure documentation.' },
          { title: 'Transaction Structuring Review', body: 'We help assess sale and leaseback, acquisition, novation, transfer, assignment and person resident in India restrictions.' },
          { title: 'Post-Registration Compliance', body: 'We support annual submissions, capital confirmation, compliance confirmation, record maintenance and regulatory reporting.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for IFSCA Aircraft Leasing Registration?">
        <CardGrid cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands IFSC regulatory expectations.' },
          { title: 'Aircraft Leasing Framework Understanding', body: 'We focus on lease type, asset structure, capital, currency, FATF jurisdiction and transaction restrictions.' },
          { title: 'Business Plan Strength', body: 'We prepare regulator-facing business plans and financial projections suitable for aircraft leasing structures.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: '100+ Associate Professionals', body: 'Our professional network supports legal, finance, compliance, documentation and regulatory advisory requirements.' },
          { title: 'End-to-End Support', body: 'From IFSC structuring to SWITS application, IFSCA query support and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on IFSCA Aircraft Leasing Registration">
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
          <p className="!mb-2"><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, aircraft leasing framework, finance company regulations, cross-border financial services and post-registration compliance.</p>
          <p className="!mb-0">This content has been prepared from a regulatory advisory perspective to help aircraft lessors, aviation finance groups, investors and financial sector professionals understand the broad IFSCA framework for aircraft leasing in IFSC.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, capital thresholds, fee structures, tax benefits, compliance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.</div>
      </Section>

      <Section id="speak-to-expert" title="Start Your Aircraft Leasing Registration Journey with Estabizz">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-6 md:p-8 text-white">
          <p className="!text-blue-100">Build your aircraft leasing setup in GIFT IFSC with structured regulatory support, lease model assessment, IFSC entity structuring, capital readiness review, SWITS application, business plan, documentation and post-registration compliance assistance.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0077B6] hover:bg-blue-50">Speak to IFSCA Compliance Expert</Link>
            <Link href="/get-started" className="rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0077B6]">Apply for Aircraft Leasing Registration</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#10b981] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#059669]">WhatsApp Estabizz Team</a>
          </div>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
