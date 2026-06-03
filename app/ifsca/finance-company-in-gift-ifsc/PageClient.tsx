'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'Finance Company in GIFT IFSC: Quick Overview' },
  { id: 'what-is-registration', title: 'What is Finance Company in GIFT IFSC?' },
  { id: 'legal-framework', title: 'Regulatory Background and Legal Framework' },
  { id: 'finance-company-vs-unit', title: 'Finance Company vs Finance Unit' },
  { id: 'who-can-apply', title: 'Who Should Apply?' },
  { id: 'forms-establishment', title: 'Forms of Establishment' },
  { id: 'core-activities', title: 'Permitted Core Activities' },
  { id: 'non-core-activities', title: 'Permitted Non-Core Activities' },
  { id: 'owned-fund', title: 'Minimum Owned Fund Requirements' },
  { id: 'fatf-compliance', title: 'FATF Compliance Requirement' },
  { id: 'swit-process', title: 'Registration Process' },
  { id: 'provisional-registration', title: 'Provisional Registration and Deficiency Rectification' },
  { id: 'prudential-norms', title: 'Prudential Norms' },
  { id: 'risk-governance', title: 'Risk Management and Governance' },
  { id: 'grctc', title: 'Global / Regional Corporate Treasury Centre' },
  { id: 'grctc-activities', title: 'Permissible GRCTC Activities' },
  { id: 'factoring-forfaiting', title: 'Factoring and Forfaiting' },
  { id: 'factoring-conduct', title: 'Conduct of Factoring Business' },
  { id: 'currency-balance-sheet', title: 'Currency and Balance Sheet' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'fee-structure', title: 'Fees and Timeline' },
  { id: 'gift-ifsc-advantages', title: 'GIFT IFSC Advantages' },
  { id: 'ongoing-compliance', title: 'Ongoing Compliance' },
  { id: 'nbfc-comparison', title: 'NBFC vs Finance Company in GIFT IFSC' },
  { id: 'action-default', title: 'Action in Case of Default' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  { q: 'What is a Finance Company in GIFT IFSC?', a: 'A Finance Company in GIFT IFSC is an entity registered with IFSCA to undertake permitted financial activities such as lending, investments, treasury management, derivatives, liquidity management and financial advisory within the IFSC ecosystem.' },
  { q: 'Who regulates Finance Companies in GIFT IFSC?', a: 'Finance Companies and Finance Units in IFSC are regulated by the International Financial Services Centres Authority.' },
  { q: 'What is the difference between Finance Company and Finance Unit?', a: 'A Finance Company is a separately incorporated entity in IFSC, while a Finance Unit is a branch of an incorporated entity permitted to undertake specified activities in IFSC.' },
  { q: 'Can a Finance Company accept public deposits?', a: 'No. Finance Company and Finance Unit cannot accept public deposits from residents or non-residents.' },
  { q: 'Can a Finance Company also be a Banking Unit?', a: 'No. A Finance Company or Finance Unit cannot be registered with IFSCA as a Banking Unit.' },
  { q: 'What are permitted core activities?', a: 'Core activities include lending, commitments, guarantees, credit enhancement, securitisation, financial lease, sale and purchase of portfolios, factoring, forfaiting, investments, derivatives, GRCTC and other permitted core activities.' },
  { q: 'What are permitted non-core activities?', a: 'Non-core activities include merchant banking, investment advisory, portfolio management, operating lease, ITFS, distribution of financial products, trading and clearing member activities, asset management support services and other activities permitted by IFSCA.' },
  { q: 'Is a Finance Company in IFSC the same as an NBFC?', a: 'No. An NBFC is regulated by RBI and operates mainly in domestic India, while a Finance Company in GIFT IFSC is regulated by IFSCA and generally undertakes international financial services in foreign currency.' },
  { q: 'What is the minimum owned fund for non-core activities?', a: 'The minimum owned fund is generally higher of USD 0.2 million or the specific amount required for the proposed activity, or any higher amount specified by IFSCA.' },
  { q: 'What is the minimum owned fund for core activities?', a: 'For core activities, except GRCTC, the minimum owned fund is generally higher of USD 3 million, activity-specific capital requirement or any higher amount specified by IFSCA.' },
  { q: 'What is the owned fund requirement for GRCTC?', a: 'A Finance Company / Finance Unit undertaking GRCTC activity must maintain minimum owned fund of USD 0.2 million at all times.' },
  { q: 'What is GRCTC?', a: 'GRCTC means Global / Regional Corporate Treasury Centre, which allows group treasury, liquidity, funding, risk management, derivative, re-invoicing, factoring, advisory and financial management activities for eligible service recipients.' },
  { q: 'Can a GRCTC undertake factoring and forfaiting?', a: 'Yes, but it must obtain registration under IFSCA Registration of Factors and Registration of Assignment of Receivables Regulations, 2024 before undertaking factoring and forfaiting.' },
  { q: 'Is application filed through SWIT?', a: 'Yes. Applications are filed through IFSCA Single Window IT System.' },
  { q: 'Is provisional registration possible?', a: 'Yes. IFSCA may issue provisional registration where the application prima facie satisfies requirements, but it does not automatically guarantee final registration.' },
  { q: 'When can business commence?', a: 'Business can commence only after receipt of Certificate of Registration and fulfilment of applicable conditions, including valid SEZ Letter of Approval where applicable.' },
  { q: 'What currency can Finance Company use?', a: 'Operations are generally carried out in freely convertible foreign currency. INR account may be maintained for administrative and statutory expenses as permitted.' },
  { q: 'In which currency must balance sheet be maintained?', a: 'Balance sheet must be maintained in United States Dollars.' },
  { q: 'Are prudential norms applicable?', a: 'Prudential norms such as capital ratio, liquidity coverage ratio and exposure ceiling apply where relevant, subject to category-specific exemptions.' },
  { q: 'What is the capital ratio requirement?', a: 'The minimum capital ratio is 8% of regulatory capital to risk-weighted assets, or such percentage as specified by IFSCA.' },
  { q: 'What is the exposure ceiling?', a: 'Exposure to a single counterparty or connected group should not exceed 25% of available eligible capital base without IFSCA approval.' },
  { q: 'Can Finance Company undertake speculative transactions?', a: 'No. Finance Company / Finance Unit shall not undertake or fund speculative transactions.' },
  { q: 'Is home regulator NOC required?', a: 'Home regulator NOC may be required where the parent or applicant carries on regulated financial activity in its home jurisdiction, wherever applicable.' },
  { q: 'Is FATF jurisdiction requirement applicable?', a: 'Yes. Applicant entity and / or promoters should be from FATF-compliant jurisdiction and comply with AML/CFT standards.' },
  { q: 'Is prior approval required for change in control?', a: 'Yes, prescribed mergers, acquisitions, takeovers or change in management resulting in change in control require IFSCA approval or intimation as applicable.' },
  { q: 'What are the fees for Finance Company core activity registration?', a: 'As per the FY 2026-27 fee circular, application fee is USD 1,000, registration fee is USD 12,500 and annual recurring fee is USD 12,500 for specified core activities.' },
  { q: 'What are the fees for GRCTC?', a: 'As per the FY 2026-27 fee circular, application fee is USD 1,000, registration fee is USD 12,500 and annual recurring fee is USD 25,000.' },
  { q: 'Can IFSCA cancel registration?', a: 'Yes. IFSCA may suspend, withdraw or cancel registration if the Finance Company / Unit fails to comply with registration conditions, after giving opportunity to make submissions.' },
  { q: 'How can Estabizz help with Finance Company in GIFT IFSC?', a: 'Estabizz assists with activity classification, IFSC entity structuring, owned fund readiness, business plan, policy drafting, SWIT application, IFSCA query support and post-registration compliance.' }
];

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

export default function FinanceCompanyRegistrationPage() {
  return (
    <ServicePageLayout
      tags={[
        { emoji: '🌐', label: 'IFSCA Regulatory Advisory' },
        { emoji: '🏦', label: 'Finance Company / Finance Unit Setup' },
        { emoji: '📊', label: 'Core & Non-Core Activity Structuring' },
        { emoji: '💼', label: 'GRCTC Advisory' },
        { emoji: '💰', label: 'USD 0.2 Million / USD 3 Million Owned Fund Guidance' },
        { emoji: '🖥️', label: 'SWIT Application Support' },
        { emoji: '✅', label: 'Post-Registration Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'Finance Company in GIFT IFSC' }
      ]}
      title="Finance Company in GIFT IFSC - Complete Regulatory Guide"
      heroDescription={
        <p className="m-0">
          <strong>Finance Company in GIFT IFSC</strong> has become one of the most powerful structures for global financial institutions, multinational groups, fintech platforms and treasury centres looking to operate from India&apos;s International Financial Services Centre. Under the IFSCA Finance Company framework, eligible entities may undertake lending, credit arrangements, investments, treasury operations, derivatives, factoring, forfaiting, leasing and other permitted financial activities from GIFT City, subject to registration and ongoing compliance.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for Finance Company Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check IFSC Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="25 min read"
      displayYear="2026"
      focusKeyword="Finance Company in GIFT IFSC"
      sections={tocSections}
      ctaTitle="Apply for Finance Company Registration"
      ctaDescription="Get structured support for IFSC entity setup, business model assessment, GRCTC advisory, factoring registration support, SWIT filing, policy documentation and post-registration compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT City IFSC' },
        { label: 'Regulation', value: 'FC Regulations 2021' },
        { label: 'Structures', value: 'Finance Company / Finance Unit' },
        { label: 'Public Deposits', value: 'Not permitted' },
        { label: 'Non-Core Fund', value: 'USD 0.2 million' },
        { label: 'Core Fund', value: 'USD 3 million' },
        { label: 'Application', value: 'SWIT' }
      ]}
      relatedArticles={[
        { title: 'IFSCA Aircraft Leasing Registration', href: '/ifsca/aircraft-leasing-registration-in-ifsc', category: 'IFSCA', description: 'Aircraft operating and financial lease registration in GIFT IFSC.' },
        { title: 'IFSCA BATF Services Registration', href: '/ifsca/batf-services-registration-in-gift-ifsc', category: 'IFSCA', description: 'Book-keeping, accounting, taxation and financial crime compliance services in GIFT IFSC.' },
        { title: 'IFSCA FinTech Registration', href: '/ifsca/ifsca-fintech-startup-incentives', category: 'IFSCA', description: 'IFSCA FinTech Entity authorisation and incentive framework in GIFT IFSC.' },
        { title: 'PSP License IFSCA', href: '/ifsca/psp-license-ifsca', category: 'IFSCA', description: 'Payment Service Provider authorisation under IFSCA payment services framework.' },
        { title: 'ITFS Platform IFSC', href: '/ifsca/itfs-registration-in-gift-ifsc', category: 'IFSCA', description: 'International Trade Finance Services platform registration in GIFT IFSC.' },
        { title: 'IFSCA Factoring License in GIFT City', href: '/regulatory/ifsca-factoring-license-gift-city', category: 'IFSCA', description: 'Factoring registration and receivables assignment framework in GIFT IFSC.' }
      ]}
      finalCtaTitle="Start Your Finance Company in GIFT IFSC Journey with Estabizz"
      finalCtaDescription="Build your Finance Company or Finance Unit setup in GIFT IFSC with structured regulatory support, business model assessment, IFSC entity structuring, owned fund readiness review, GRCTC advisory, factoring registration support, SWIT application, policy drafting and post-registration compliance assistance."
      finalCtaActions={
        <>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#1677f2] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all text-center">
            Speak to IFSCA Compliance Expert
          </Link>
          <Link href="/get-started" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0077B6] font-bold rounded-xl hover:bg-blue-50 transition-all text-center">
            Apply for Finance Company Registration
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl shadow-lg transition-all text-center">
            WhatsApp Estabizz Team
          </a>
        </>
      }
    >
      <Section id="quick-overview" title="Finance Company in GIFT IFSC: Quick Overview">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Regulator', body: 'International Financial Services Centres Authority' },
          { title: 'Location', body: 'GIFT City - International Financial Services Centre, Gujarat, India' },
          { title: 'Governing Regulation', body: 'IFSCA Finance Company Regulations, 2021' },
          { title: 'Registration Type', body: 'Certificate of Registration as Finance Company or Finance Unit' },
          { title: 'Finance Company Structure', body: 'Separate incorporated entity in IFSC' },
          { title: 'Finance Unit Structure', body: 'Branch of an incorporated entity' },
          { title: 'Public Deposits', body: 'Not permitted' },
          { title: 'Banking Unit', body: 'Finance Company / Finance Unit cannot be registered as Banking Unit' },
          { title: 'Core Activity Capital', body: 'USD 3 million, subject to activity-specific requirement' },
          { title: 'Non-Core / Treasury Activity Capital', body: 'USD 0.2 million, subject to applicable framework' },
          { title: 'GRCTC Owned Fund', body: 'USD 0.2 million' },
          { title: 'Application System', body: 'IFSCA Single Window IT System / SWIT' },
          { title: 'Currency', body: 'Freely convertible foreign currency; INR account permitted for administrative and statutory expenses' },
          { title: 'Balance Sheet', body: 'Maintained in USD' },
          { title: 'Timeline', body: 'Indicative and subject to IFSCA review' }
        ]} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s proposed activity, legal structure, ownership, promoter jurisdiction, capital plan, service recipient profile, FEMA position, and latest IFSCA circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-registration" title="What is a Finance Company in GIFT IFSC?">
        <p>A Finance Company in GIFT IFSC is a financial institution incorporated or set up within an International Financial Services Centre that undertakes permitted financial activities such as lending, credit arrangements, investments, treasury management, derivatives, leasing, factoring and other financial services.</p>
        <p>The entity must obtain a Certificate of Registration from IFSCA before commencing operations. Unlike a traditional RBI-regulated NBFC operating in domestic India, a Finance Company in GIFT IFSC primarily operates in foreign currency and focuses on cross-border or international financial services.</p>
        <div className="warning-box">Finance Company / Finance Unit cannot accept public deposits from residents or non-residents and cannot be registered with IFSCA as a Banking Unit.</div>
      </Section>

      <Section id="legal-framework" title="Regulatory Background of Finance Company in GIFT IFSC">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'International Financial Services Centres Authority'],
          ['Governing Law', 'IFSCA Act, 2019'],
          ['Primary Regulation', 'IFSCA Finance Company Regulations, 2021'],
          ['Location', 'GIFT City - International Financial Services Centre'],
          ['Registration Requirement', 'Certificate of Registration from IFSCA'],
          ['Application Mode', 'IFSCA Single Window IT System / SWIT'],
          ['Permitted Structures', 'Finance Company or Finance Unit'],
          ['Public Deposit Restriction', 'Public deposits not permitted'],
          ['Currency Framework', 'Freely convertible foreign currency; INR account permitted for administrative and statutory expenses'],
          ['Balance Sheet', 'USD only'],
          ['AML / KYC', 'IFSCA AML, CFT and KYC requirements apply'],
          ['FEMA', 'Applicable where Indian residents or cross-border flows are involved']
        ]} />
        <p>The IFSCA Finance Company framework allows financial institutions to operate within the IFSC ecosystem and provide financial services primarily in foreign currencies. It supports India&apos;s objective of onshoring international financial services that were historically undertaken from overseas jurisdictions.</p>
      </Section>

      <Section id="finance-company-vs-unit" title="Finance Company vs Finance Unit in IFSC">
        <DataTable headers={['Particular', 'Finance Company', 'Finance Unit']} rows={[
          ['Legal Nature', 'Separately incorporated entity', 'Branch of an incorporated entity'],
          ['Setup Form', 'Subsidiary, joint venture, newly incorporated company or other form specified by IFSCA', 'Branch of company incorporated in India or outside India'],
          ['Public Deposits', 'Not permitted', 'Not permitted'],
          ['Banking Unit Status', 'Cannot be Banking Unit', 'Cannot be Banking Unit'],
          ['Owned Fund', 'Maintained by Finance Company', 'Maintained on unimpaired basis, and in some cases at parent level as permitted'],
          ['Home Regulator NOC', 'Required where parent carrying regulated financial activity, wherever applicable', 'Required for core activities where applicant is regulated in home jurisdiction, wherever applicable'],
          ['Accounts', 'Balance sheet in USD', 'Accounts of Finance Unit transactions must be distinct from parent']
        ]} />
      </Section>

      <Section id="who-can-apply" title="Who Should Apply for Finance Company in GIFT IFSC?">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Global Financial Institutions', body: 'Foreign financial institutions seeking to establish treasury, financing or investment operations in India&apos;s IFSC.' },
          { title: 'NBFC Groups', body: 'Indian NBFC promoters planning to access international capital markets or structure cross-border finance operations.' },
          { title: 'Leasing Companies', body: 'Entities involved in aircraft leasing, ship leasing or equipment leasing from IFSC.' },
          { title: 'Corporate Treasury Centres', body: 'Multinational corporations managing liquidity, funding and treasury operations across group entities.' },
          { title: 'Investment and Financing Platforms', body: 'Groups engaged in structured finance, securitisation, credit arrangements or global investment activity.' },
          { title: 'Factoring and Trade Finance Businesses', body: 'Finance Companies intending to undertake receivable financing, factoring or forfaiting within IFSC.' }
        ]} />
      </Section>

      <Section id="forms-establishment" title="Forms of Establishment for Finance Company in GIFT IFSC">
        <DataTable headers={['Structure', 'Description']} rows={[
          ['New Company', 'Newly incorporated company under Companies Act, 2013 for IFSC operations'],
          ['Subsidiary', 'Subsidiary of existing financial institution or corporate group'],
          ['Joint Venture', 'Joint venture structure between Indian or foreign promoters'],
          ['Finance Unit', 'Branch of Indian or foreign company established in IFSC'],
          ['Other Permitted Structure', 'Any other structure permitted by IFSCA from time to time']
        ]} />
        <div className="info-box">The choice of structure must align with the proposed financial activities, ownership model, tax considerations, FEMA position, capital requirement and regulatory expectations.</div>
      </Section>

      <Section id="core-activities" title="Permitted Core Activities under IFSCA Finance Company Regulations">
        <DataTable headers={['Core Activity', 'Meaning / Scope']} rows={[
          ['Lending', 'Loans, commitments, guarantees, credit enhancement, securitisation, financial lease and sale / purchase of portfolios'],
          ['Factoring and Forfaiting', 'Subject to IFSCA factoring registration requirements'],
          ['Investments', 'Subscribing, acquiring, holding or transferring securities or other permitted instruments'],
          ['Derivatives', 'Buying or selling derivatives'],
          ['Global / Regional Corporate Treasury Centre', 'GRCTC activities under separate framework'],
          ['Other Core Activity', 'Any other core activity as permitted by IFSCA']
        ]} />
        <div className="info-box">A Finance Company / Finance Unit undertaking one or more core activities with or without non-core activities, except GRCTC, generally requires minimum owned fund of USD 3 million or higher applicable amount.</div>
      </Section>

      <Section id="non-core-activities" title="Permitted Non-Core Activities under IFSCA Finance Company Regulations">
        <DataTable headers={['Non-Core Activity', 'Remarks']} rows={[
          ['Merchant Banking', 'Subject to relevant framework'],
          ['Authorised Person', 'Subject to applicable IFSCA conditions'],
          ['Registrar and Share Transfer Agent', 'Subject to specific registration'],
          ['Trusteeship Services', 'Subject to applicable framework'],
          ['Investment Advisory Services', 'Subject to applicable framework'],
          ['Portfolio Management Services', 'Subject to applicable framework'],
          ['Operating Lease', 'Includes aircraft lease, ship lease or other equipment as specified by IFSCA'],
          ['International Trade Financing Services Platform', 'Subject to ITFS guidelines'],
          ['Distribution of Financial Products', 'Includes mutual fund and insurance product distribution'],
          ['Trading / Clearing Member', 'For exchanges and clearing corporations in IFSC'],
          ['Asset Management Support Services', 'Subject to ancillary services framework'],
          ['Facilitators of Permissible Activities', 'As and when permitted by IFSCA'],
          ['Activity without Customer Interface', 'With prior approval where classified as non-core'],
          ['Other Non-Core Activity', 'As permitted by IFSCA']
        ]} />
        <div className="info-box">Each non-core activity must comply with the respective framework specified by IFSCA for that activity.</div>
      </Section>

      <Section id="owned-fund" title="Minimum Capital Requirement for Finance Company in GIFT IFSC">
        <DataTable headers={['Activity Category', 'Minimum Owned Fund']} rows={[
          ['Non-Core Activities Only', 'USD 0.2 million or activity-specific requirement, whichever is higher'],
          ['Core Financial Activities', 'USD 3 million or activity-specific requirement, whichever is higher'],
          ['Treasury Centre / GRCTC Activities', 'USD 0.2 million or as prescribed'],
          ['Factoring Activity', 'Governed through Finance Company framework plus Factor registration requirements'],
          ['Aircraft / Ship Operating Lease', 'USD 0.2 million or framework-specific amount'],
          ['Aircraft / Ship Financial Lease', 'USD 3 million or framework-specific amount']
        ]} />
        <h3>What is Owned Fund?</h3>
        <p>Owned fund generally includes paid-up capital, free reserves, balance in share premium account and capital reserves arising from asset sale surplus. It excludes revaluation reserves, accumulated losses, book value of intangible assets and deferred revenue expenditure.</p>
        <div className="my-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f0f9ff] to-white p-5 text-center text-[15px] font-bold leading-8 text-[#0a1628] shadow-sm">Owned Fund = Paid-up Capital + Free Reserves + Share Premium + Eligible Capital Reserves - Accumulated Losses - Intangible Assets - Deferred Revenue Expenditure</div>
        <div className="warning-box">Where multiple activities are proposed, the applicant should maintain the higher of the minimum capital / owned fund / net worth prescribed for each activity or category of activity.</div>
      </Section>

      <Section id="fatf-compliance" title="FATF Compliance Requirement for Finance Company in GIFT IFSC">
        <p>The applicant entity and its promoters must originate from jurisdictions that comply with Financial Action Task Force standards. The parent or promoter should not be from a FATF high-risk jurisdiction subject to call for action.</p>
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'AML Compliance Readiness', body: 'The applicant should demonstrate AML policy readiness and screening controls.' },
          { title: 'CFT Compliance Readiness', body: 'Controls for countering terrorist financing should be documented.' },
          { title: 'Clean Promoter Jurisdiction', body: 'Promoters and parent entities should not be from high-risk FATF jurisdictions.' },
          { title: 'Transparent Ownership Structure', body: 'Beneficial ownership and control should be clearly disclosed.' },
          { title: 'Regulatory Track Record', body: 'Regulatory history and supervisory standing may be reviewed.' },
          { title: 'Fit and Proper Declarations', body: 'Directors, KMPs and controlling persons should satisfy integrity expectations.' }
        ]} />
      </Section>

      <Section id="prudential-norms" title="Prudential Norms for Finance Company in GIFT IFSC">
        <DataTable headers={['Requirement', 'Position']} rows={[
          ['Capital Ratio', 'Minimum 8% of regulatory capital to risk-weighted assets or such percentage as specified by IFSCA'],
          ['Liquidity Coverage Ratio', 'Maintain LCR on standalone basis; Finance Unit may maintain through parent with IFSCA approval'],
          ['Exposure Ceiling', 'Exposure to single counterparty or connected group should not exceed 25% of available eligible capital base without IFSCA approval'],
          ['Speculative Transactions', 'Finance Company / Unit shall not undertake or fund speculative transactions'],
          ['Derivative Transactions by Non-Core Entities', 'Permitted only for hedging underlying exposures']
        ]} />
        <div className="info-box">Certain categories such as GRCTC and non-core only entities may receive specific exemptions subject to Board-approved prudential policy and fit and proper criteria.</div>
      </Section>

      <Section id="risk-governance" title="Risk Management Framework for Finance Company in GIFT IFSC">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Credit Risk', body: 'Counterparty evaluation, exposure limits, credit monitoring and default risk controls.' },
          { title: 'Market Risk', body: 'Monitoring interest rate, currency, commodity and financial market exposures.' },
          { title: 'Liquidity Risk', body: 'Cash flow monitoring, liquidity buffers, funding plan and stress scenarios.' },
          { title: 'Operational Risk', body: 'Internal control, process documentation, system controls and audit trail.' },
          { title: 'Compliance Risk', body: 'Monitoring IFSCA regulations, FEMA, AML / KYC obligations and reporting.' },
          { title: 'Counterparty Risk', body: 'Risk assessment of banks, financial institutions, borrowers, group entities and counterparties.' }
        ]} />
        <h3>Governance Requirements</h3>
        <DataTable headers={['Governance Area', 'Requirement']} rows={[
          ['Corporate Governance Policy', 'Board-approved governance policy'],
          ['Risk Management Policy', 'Board-approved risk framework'],
          ['Activity Approval Policy', 'Delegation matrix and control framework for permissible activities'],
          ['Board Oversight', 'Periodic review of financial activities and risk exposures'],
          ['Internal Audit', 'Internal control and audit mechanism'],
          ['Compliance Function', 'Compliance monitoring and regulatory reporting'],
          ['Change in Control', 'Prior approval / intimation as applicable']
        ]} />
      </Section>

      <Section id="grctc" title="Global / Regional Corporate Treasury Centre under Finance Company in GIFT IFSC">
        <p>A Finance Company / Finance Unit may undertake Global / Regional Corporate Treasury Centre activities under the specific GRCTC framework. GRCTC is designed to allow corporate groups to centralise treasury, liquidity, funding, risk management, re-invoicing and financial management functions from IFSC.</p>
        <DataTable headers={['Particular', 'Requirement']} rows={[
          ['Applicable Framework', 'Framework for Finance Company / Finance Unit undertaking GRCTC activity dated April 04, 2025'],
          ['Legal Form', 'Company or branch of a company incorporated in India or outside India'],
          ['Owned Fund', 'USD 0.2 million at all times'],
          ['Qualified Personnel', 'At least 5 qualified personnel based in IFSC including Head of Treasury and Compliance Officer before commencement'],
          ['Application', 'Through SWIT'],
          ['Service Recipients', 'Group entities and / or group entities of parent and / or branches of parent or group entities'],
          ['FATF Condition', 'Parent should not be from FATF high-risk jurisdiction subject to call for action'],
          ['Commencement', 'Within 6 months from grant of CoR, extension up to 3 months may be granted'],
          ['Fees', 'Application USD 1,000; Registration USD 12,500; Recurring USD 25,000 per annum']
        ]} />
      </Section>

      <Section id="grctc-activities" title="Permissible Activities for GRCTC">
        <DataTable headers={['Activity', 'Scope']} rows={[
          ['Raising Capital', 'Issuance of equity shares'],
          ['Borrowing', 'Including inter-company deposits'],
          ['Credit Arrangements', 'Lending, credit guarantee, performance bonds and other credit facilities'],
          ['Investments', 'Financial instruments issued in IFSC or outside IFSC'],
          ['Derivatives', 'OTC and exchange-traded derivatives in IFSC or outside IFSC as permitted'],
          ['Foreign Exchange Transactions', 'In currencies specified by IFSCA'],
          ['Factoring and Forfaiting', 'Separate factor registration required'],
          ['Re-invoicing Centre', 'Financing purchase and sale of goods on behalf of service recipients without taking physical possession'],
          ['Liquidity Management', 'Fund pooling, cash concentration, payment processing and surplus fund management'],
          ['Financial Counterparty Management', 'Banks, rating agencies, valuation, treasury accounting, covenant testing and audit trail'],
          ['Insurance / Pension Obligations', 'Managing group obligations towards insurance and pension commitments'],
          ['Advisory Services', 'Financial management, financial risk management, funding and capital market activities'],
          ['Holding Company', 'Permitted holding company activity'],
          ['Other Activity', 'With prior approval of IFSCA']
        ]} />
        <div className="warning-box">A GRCTC intending to undertake factoring and forfaiting must obtain registration under IFSCA Registration of Factors and Registration of Assignment of Receivables Regulations, 2024.</div>
      </Section>

      <Section id="factoring-forfaiting" title="Factoring and Forfaiting under IFSCA Finance Company Framework">
        <p>Factoring and forfaiting may be undertaken as a core activity by a Finance Company / Finance Unit, subject to the IFSCA Registration of Factors and Registration of Assignment of Receivables Regulations, 2024.</p>
        <DataTable headers={['Requirement', 'Position']} rows={[
          ['Registration', 'Factor must obtain certificate of registration from IFSCA'],
          ['Pre-condition', 'Factor must have Certificate of Registration under IFSCA Finance Company Regulations, 2021'],
          ['Experience', 'Relevant Persons should possess adequate experience in factoring'],
          ['Infrastructure', 'Adequate office space, equipment, communication facilities and manpower'],
          ['Fit and Proper', 'Factor and Relevant Persons must satisfy fit and proper requirements'],
          ['Financial Soundness', 'Required'],
          ['Commencement', 'Factoring business must commence within six months from grant of CoR'],
          ['TReDS Filing', 'Assignment of receivables financed through TReDS must be filed with Central Registry within prescribed timelines']
        ]} />
      </Section>

      <Section id="factoring-conduct" title="Conduct of Factoring Business in IFSC">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Direct Factoring', body: 'The Factor may purchase receivables directly from businesses or assignors.' },
          { title: 'Platform-Based Factoring', body: 'Factoring may be undertaken through ITFS or trade finance platforms.' },
          { title: 'Receivable Assignment', body: 'Receivables are assigned in favour of the Factor.' },
          { title: 'Central Registry Filing', body: 'Where trade receivables are financed through TReDS, filing must be made with the Central Registry within prescribed time.' },
          { title: 'Trade Finance Use Case', body: 'Suitable for exporters, importers, MSMEs, supply chain participants and global trade finance businesses.' }
        ]} />
      </Section>

      <Section id="currency-balance-sheet" title="Currency of Operations and Balance Sheet">
        <DataTable headers={['Area', 'Requirement']} rows={[
          ['Operations', 'Freely convertible foreign currency'],
          ['INR Business Transactions', 'May be permitted if denominated in INR but settled in freely convertible foreign currency, as specified'],
          ['INR Account', 'Permitted from freely convertible foreign currency for administrative and statutory expenses'],
          ['Balance Sheet', 'Maintained only in USD'],
          ['Finance Unit Accounts', 'Transaction accounts must be distinct from parent'],
          ['GRCTC Outside IFSC Transactions', 'May undertake transactions outside IFSC in currencies other than specified foreign currencies'],
          ['SNRR Account', 'GRCTC may open SNRR account with authorised dealer in India for business-related transactions outside IFSC']
        ]} />
      </Section>

      <Section id="swit-process" title="Step-by-Step Process for Finance Company in GIFT IFSC">
        <div className="step-timeline">
          {[
            ['Step 1', 'Business Model and Activity Assessment', 'Identify whether proposed activity is core, non-core, GRCTC, factoring, leasing, holding company or other permitted activity.'],
            ['Step 2', 'Entity Structure Selection', 'Evaluate Finance Company or Finance Unit structure, subsidiary, joint venture, newly incorporated company, branch or other permitted form.'],
            ['Step 3', 'Promoter / Parent and FATF Review', 'Check promoter jurisdiction, parent background, home regulator NOC requirement and FATF compliance.'],
            ['Step 4', 'Owned Fund Planning', 'Determine applicable owned fund based on proposed activities and arrange capital / parent support as required.'],
            ['Step 5', 'Document and Policy Preparation', 'Prepare business plan, financial projections, prudential policy, risk management policy, corporate governance policy, KYC/AML framework and activity-specific policy.'],
            ['Step 6', 'SWIT Application Filing', 'Submit application through IFSCA Single Window IT System with documents and applicable application fee.'],
            ['Step 7', 'Provisional Registration', 'IFSCA may issue provisional registration if the application prima facie satisfies conditions.'],
            ['Step 8', 'Condition Compliance', 'Fulfil capital, infrastructure, personnel, LoA and registration fee requirements.'],
            ['Step 9', 'Grant of Certificate of Registration', 'Upon IFSCA satisfaction and receipt of specified fees, IFSCA may grant Certificate of Registration.'],
            ['Step 10', 'Commencement of Operations', 'Commence permitted activities only after grant of CoR and maintain valid SEZ Letter of Approval where applicable.'],
            ['Step 11', 'Post-Registration Compliance', 'Maintain owned fund, file reports, comply with KYC/AML, governance, disclosure, fees and activity-specific conditions.']
          ].map(([step, title, desc]) => (
            <div key={step} className="step-card"><span>{step}</span><h3>{title}</h3><p>{desc}</p></div>
          ))}
        </div>
      </Section>

      <Section id="provisional-registration" title="Provisional Registration and Deficiency Rectification">
        <DataTable headers={['Situation', 'Regulatory Position']} rows={[
          ['Provisional Registration', 'May be granted where applicant requires additional time to fulfil specific conditions'],
          ['Deficiency Communication', 'IFSCA may communicate deficiencies in application'],
          ['Rectification Period', 'Applicant may be given 30 days to rectify deficiencies'],
          ['Failure to Rectify', 'Application may be refused'],
          ['Opportunity of Written Submission', 'Applicant should receive opportunity to make submissions before refusal']
        ]} />
        <div className="info-box">The application should be complete and properly supported at the first filing stage to reduce avoidable query cycles.</div>
      </Section>

      <Section id="documents-required" title="Documents Required for Finance Company in GIFT IFSC">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Entity Documents', 'Certificate of incorporation / registration, constitutional documents, board resolution, PAN / tax details and registered office details'],
          ['IFSC Setup Documents', 'IFSC unit setup documents, SEZ Letter of Approval, office details and infrastructure plan'],
          ['Promoter / Parent Documents', 'Ownership structure, FATF jurisdiction confirmation, financial statements, group profile, regulator NOC where applicable'],
          ['Activity Scope Note', 'Description of proposed core / non-core / GRCTC / factoring / leasing / holding company activity'],
          ['Business Plan', 'Revenue model, service recipients, target market, financial projections, risk framework and operational roadmap'],
          ['Capital Documents', 'Owned fund certificate, capital infusion proof, bank statements, parent undertaking where applicable'],
          ['Fit and Proper Documents', 'Declarations for applicant, KMPs, controlling persons and relevant persons'],
          ['Governance Documents', 'Corporate governance policy, risk management policy, prudential policy, delegation matrix and Board-approved activity policy'],
          ['KYC / AML Documents', 'KYC/AML/CFT policy aligned with applicable IFSCA guidelines'],
          ['GRCTC Documents', 'Service recipient list, Head of Treasury and Compliance Officer details, personnel plan and treasury policy'],
          ['Factoring Documents', 'Factor registration documents, receivables assignment process, TReDS / Central Registry filing process'],
          ['Application Documents', 'SWIT application, fee payment proof and IFSCA-prescribed forms']
        ]} />
      </Section>

      <Section id="fee-structure" title="Government Fees for Finance Company in GIFT IFSC">
        <DataTable headers={['Category', 'Application Fee', 'Registration Fee', 'Annual Recurring Fee']} rows={[
          ['Finance Company / Unit undertaking core activities', 'USD 1,000', 'USD 12,500', 'USD 12,500'],
          ['Finance Company / Unit undertaking GRCTC', 'USD 1,000', 'USD 12,500', 'USD 25,000'],
          ['Permissible activities without customer interface', 'USD 1,000', 'USD 12,500', 'USD 12,500'],
          ['Factoring Registration', 'As prescribed by IFSCA', 'As prescribed by IFSCA', 'As prescribed by IFSCA']
        ]} />
        <div className="info-box">
          Application without applicable fee shall not be entertained. Registration fee is payable within 15 days of intimation of provisional or in-principle approval, where applicable. Recurring fee for first year is calculated on a pro-rata basis. For subsequent years, flat recurring fee becomes due on April 1 and payable by April 30. Interest on delayed fee payment is 0.75% per month or part thereof. Delay or non-submission of periodic reports attracts USD 100 per month or part thereof for each instance. Change in management or control processing fee is 20% of licence / registration / recognition / authorisation fee.
        </div>
        <div className="warning-box">Fees should be verified from the latest IFSCA fee circular applicable at the time of filing.</div>
        <h3>Indicative Timeline for Finance Company in GIFT IFSC</h3>
        <DataTable headers={['Stage', 'Estimated Duration']} rows={[
          ['Business Structuring', '2 to 3 weeks'],
          ['Application Preparation', '1 to 2 weeks'],
          ['Regulatory Review', '4 to 8 weeks or more'],
          ['Query Resolution', 'Case-specific'],
          ['Total Estimated Timeline', '6 to 10 weeks or longer, depending on IFSCA review']
        ]} />
        <div className="info-box">Once registration is granted, the company must commence operations within six months unless an extension is approved by IFSCA.</div>
      </Section>

      <Section id="governance-disclosure" title="Corporate Governance and Disclosure Requirements">
        <DataTable headers={['Requirement', 'Position']} rows={[
          ['Corporate Governance Policy', 'Required for applicable Finance Companies / Units'],
          ['Risk Management Policy', 'Required where applicable and should cover identification, measurement, monitoring and management of risks'],
          ['Board-approved Activity Policy', 'Required for undertaking permissible activities'],
          ['Policy Review', 'Board should review policies periodically'],
          ['Prior Approval for Change in Control', 'Required for Finance Company where mergers, acquisitions, takeover or change in management results in change in control of at least 20% share capital or business decision authority'],
          ['Finance Unit Parent Change', 'Must be intimated to IFSCA within 15 days from event']
        ]} />
        <div className="info-box">Corporate governance guidelines were amended in 2025 to clarify applicability and exclude GRCTC from certain generic / detailed governance guidelines, while GRCTC remains subject to its own governance framework and Board-approved policies.</div>
      </Section>

      <Section id="kyc-aml" title="KYC, AML and CFT Requirements">
        <p>Finance Companies and Finance Units must follow KYC norms, AML and CFT requirements as applicable to IFSC entities. GRCTC entities must adhere to IFSCA AML, CFT and KYC Guidelines, 2022, as amended, to the extent applicable.</p>
        <CardGrid columns="md:grid-cols-4" cards={[
          { title: 'Customer Due Diligence', body: 'Customer and counterparty due diligence must be properly documented.' },
          { title: 'Beneficial Ownership', body: 'Ownership and control checks should be built into onboarding.' },
          { title: 'Sanctions Screening', body: 'FATF, sanctions and risk jurisdiction screening should be applied.' },
          { title: 'Transaction Monitoring', body: 'Transactions should be monitored for suspicious or unusual patterns.' },
          { title: 'Record Maintenance', body: 'KYC, transaction and approval records should be retained.' },
          { title: 'STR Escalation', body: 'Suspicious transaction escalation process should be defined.' },
          { title: 'Board AML Policy', body: 'Board-approved AML policy should be maintained.' },
          { title: 'Compliance Oversight', body: 'Compliance officer oversight should be demonstrable.' }
        ]} />
      </Section>

      <Section id="gift-ifsc-advantages" title="Why GIFT IFSC for Finance Company Setup?">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Dedicated Unified Regulator', body: 'IFSCA operates as a unified financial services regulator for IFSC.' },
          { title: 'Full Convertibility with Foreign Currencies', body: 'GIFT IFSC supports operations in specified foreign currencies.' },
          { title: 'Globally Benchmarked Regulations', body: 'The IFSC framework is designed to align with international financial services practices.' },
          { title: 'Attractive Tax Regime', body: 'Eligible IFSC units may avail tax benefits subject to applicable law.' },
          { title: 'Cost and Talent Advantage', body: 'India professional talent pool and GIFT City ecosystem support efficient operations.' },
          { title: 'Onshoring Offshore Financial Services', body: 'GIFT IFSC helps bring international financial services activity from overseas jurisdictions into India.' },
          { title: 'Wide Financial Ecosystem', body: 'Banking, funds, capital markets, insurance, aircraft leasing, ship leasing, treasury centres, ITFS and finance company activities operate within the IFSC ecosystem.' }
        ]} />
        <div className="info-box">Tax, FEMA, SEZ and state incentives are subject to eligibility, notifications, approvals and amendments. Professional tax and FEMA advice should be obtained before finalising the structure.</div>
      </Section>

      <Section id="ongoing-compliance" title="Ongoing Compliance for IFSCA Finance Companies / Units">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Owned Fund Maintenance', 'Maintain applicable owned fund at all times'],
          ['Prudential Norms', 'Capital ratio, LCR and exposure ceiling as applicable'],
          ['KYC / AML', 'Follow applicable IFSCA KYC, AML and CFT requirements'],
          ['Financial Reporting', 'Financial reporting to IFSCA in USD unless otherwise specified'],
          ['Operational Reporting', 'Furnish operational information in manner, interval and form specified by IFSCA'],
          ['Balance Sheet', 'Maintain balance sheet in USD'],
          ['Change in Control', 'Prior approval / intimation as applicable'],
          ['Material Changes', 'Inform IFSCA of relevant changes'],
          ['Activity-Specific Reporting', 'Follow additional reporting under GRCTC, factoring, leasing, ITFS or other framework'],
          ['Fee Compliance', 'Pay recurring and applicable fees within prescribed timelines'],
          ['Report Delay Charges', 'USD 100 per month or part thereof for delayed / non-submission, subject to fee circular']
        ]} />
      </Section>

      <Section id="nbfc-comparison" title="NBFC vs Finance Company in GIFT IFSC">
        <DataTable headers={['Particular', 'NBFC in India', 'Finance Company in GIFT IFSC']} rows={[
          ['Regulator', 'Reserve Bank of India', 'International Financial Services Centres Authority'],
          ['Governing Law', 'RBI Act and RBI NBFC Directions', 'IFSCA Finance Company Regulations, 2021'],
          ['Operational Jurisdiction', 'Domestic India', 'GIFT IFSC / International Financial Services Centre'],
          ['Currency', 'Primarily INR', 'Freely convertible foreign currency'],
          ['Typical Business', 'Domestic lending and financial intermediation', 'Cross-border finance, treasury, investment, leasing, factoring and financial services'],
          ['Client Base', 'Indian borrowers and businesses', 'Group entities, service recipients and international counterparties'],
          ['Minimum Capital', 'As per RBI NBFC category', 'USD 0.2 million / USD 3 million depending on activity'],
          ['Corporate Treasury', 'Generally not a standard NBFC activity', 'GRCTC specifically permitted'],
          ['Derivative Transactions', 'Restricted and regulated', 'Permitted within IFSCA framework'],
          ['Tax Environment', 'Domestic tax framework', 'IFSC tax framework, subject to applicable law'],
          ['Location', 'Anywhere in India', 'GIFT IFSC']
        ]} />
      </Section>

      <Section id="action-default" title="Action in Case of Default">
        <p>If a Finance Company or Finance Unit fails to fulfil any conditions subject to which registration has been granted, IFSCA may take action including suspension, withdrawal or cancellation of registration after giving opportunity of making submissions.</p>
        <DataTable headers={['Default', 'Possible Regulatory Action']} rows={[
          ['Failure to maintain owned fund', 'Supervisory action or registration risk'],
          ['Violation of activity scope', 'Restriction or cancellation risk'],
          ['KYC / AML non-compliance', 'Regulatory action'],
          ['Failure to submit reports', 'Charges and supervisory action'],
          ['Failure to pay fees', 'Interest and possible regulatory consequences'],
          ['Speculative transaction', 'Regulatory concern'],
          ['Change in control without approval', 'Enforcement risk'],
          ['Non-compliance with CoR conditions', 'Suspension, withdrawal or cancellation']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in Finance Company in GIFT IFSC">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Confusing Finance Company with RBI NBFC', 'Wrong regulatory positioning'],
          ['Wrong classification of core and non-core activity', 'Incorrect capital and application approach'],
          ['Ignoring activity-specific frameworks', 'Query or rejection risk'],
          ['Insufficient owned fund planning', 'Application delay'],
          ['Missing home regulator NOC', 'Eligibility gap'],
          ['Promoter not from FATF-compliant jurisdiction', 'Regulatory concern'],
          ['No clear business plan', 'IFSCA queries'],
          ['No prudential / risk policy', 'Governance gap'],
          ['No KYC/AML framework', 'Compliance gap'],
          ['Incorrect fee payment', 'Application not entertained or delayed'],
          ['No SEZ / LoA planning', 'Operational delay'],
          ['No USD balance sheet planning', 'Reporting issue']
        ]} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with Finance Company in GIFT IFSC">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Activity Classification', body: 'We help identify whether the proposed activity is core, non-core, GRCTC, factoring, leasing, holding company or activity without customer interface.' },
          { title: 'IFSC Entity Structuring', body: 'We assist in evaluating Finance Company vs Finance Unit, subsidiary, branch, joint venture, LLP / trust possibility for non-core activities and group structure.' },
          { title: 'Owned Fund Readiness', body: 'We assist in mapping USD 0.2 million, USD 3 million or activity-specific owned fund requirements and supporting documentation.' },
          { title: 'Business Plan and Financial Projection', body: 'We prepare regulator-facing business plans, activity notes, service recipient details, revenue model, financial projections and operational roadmap.' },
          { title: 'Policy Documentation', body: 'We assist with prudential policy, risk management policy, corporate governance policy, KYC/AML policy and activity-specific policy documents.' },
          { title: 'GRCTC Advisory', body: 'We support GRCTC setup, service recipient mapping, treasury activity classification, Head of Treasury and Compliance Officer documentation and SWIT filing.' },
          { title: 'Factoring Registration Support', body: 'We assist Finance Companies intending to undertake factoring and forfaiting with Factor registration documentation.' },
          { title: 'SWIT Application and Query Support', body: 'We support SWIT application preparation, fee documentation and structured responses to IFSCA queries.' },
          { title: 'Post-Registration Compliance', body: 'We support annual and periodic reporting, fee compliance, change approvals, policy reviews, KYC/AML compliance and regulatory update tracking.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Finance Company in GIFT IFSC?">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands IFSC regulatory expectations.' },
          { title: 'Finance Activity Structuring', body: 'We help clients classify activity correctly across core, non-core, GRCTC, factoring, leasing and holding company structures.' },
          { title: 'Business Plan Strength', body: 'We prepare regulator-facing business plans and financial projections suitable for IFSC financial institutions.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: '100+ Associate Professionals', body: 'Our professional network supports legal, finance, compliance, documentation and regulatory advisory requirements.' },
          { title: 'End-to-End Support', body: 'From IFSC structuring to SWIT application, IFSCA query support and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on Finance Company in GIFT IFSC">
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
          <p><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, Finance Company Regulations, GRCTC framework, factoring registration, cross-border financial services and post-registration compliance.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help financial groups, treasury centres, fintech founders, corporate groups and financial institutions understand the broad IFSCA framework for Finance Company / Finance Unit registration in GIFT IFSC.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, fee structures, capital thresholds, prudential norms, tax benefits, FEMA implications, compliance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.</div>
      </Section>

      <Section id="speak-to-expert" title="Start Your Finance Company in GIFT IFSC Journey with Estabizz">
        <p>Build your Finance Company or Finance Unit setup in GIFT IFSC with structured regulatory support, activity classification, IFSC entity structuring, owned fund readiness review, SWIT application, business plan, policy documentation and post-registration compliance assistance.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors text-center">Speak to IFSCA Compliance Expert</Link>
          <Link href="/get-started" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-xl hover:bg-[#0077B6] transition-colors text-center">Apply for Finance Company Registration</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
