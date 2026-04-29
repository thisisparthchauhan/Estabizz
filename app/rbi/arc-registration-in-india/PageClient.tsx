'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };
type Faq = { q: string; a: string };

const whatsappUrl = 'https://wa.me/919825600907';

const tocSections = [
  { id: 'quick-overview', title: 'ARC Registration in India: Quick Overview' },
  { id: 'what-is-arc-registration', title: 'What is ARC Registration in India?' },
  { id: 'legal-framework', title: 'Legal Framework' },
  { id: 'asset-reconstruction-company', title: 'What is an Asset Reconstruction Company?' },
  { id: 'who-requires-arc-registration', title: 'Who Requires ARC Registration?' },
  { id: 'eligibility', title: 'Minimum Capital Requirement' },
  { id: 'nof-computation', title: 'Net Owned Fund Computation' },
  { id: 'capital-adequacy', title: 'Capital Adequacy Requirement' },
  { id: 'permissible-activities', title: 'Permissible Activities' },
  { id: 'key-restrictions', title: 'Key Restrictions' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step ARC Registration Process' },
  { id: 'governance', title: 'Governance Requirements' },
  { id: 'security-receipts', title: 'Security Receipts Framework' },
  { id: 'asset-realisation', title: 'Asset Realisation Framework' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'business-plan', title: 'Business Plan & Financial Projection Framework' },
  { id: 'rbi-query-areas', title: 'Common RBI Query Areas' },
  { id: 'structuring-challenges', title: 'Common Structuring Challenges' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'inspection-action', title: 'RBI Inspection and Regulatory Action' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our RBI Compliance Expert' }
];

const faqs: Faq[] = [
  { q: 'What is ARC Registration in India?', a: 'ARC Registration in India is the regulatory approval granted by the Reserve Bank of India under the SARFAESI Act, 2002 to a company intending to carry on the business of securitisation and asset reconstruction.' },
  { q: 'Who regulates Asset Reconstruction Companies in India?', a: 'Asset Reconstruction Companies are regulated by the Reserve Bank of India under the SARFAESI Act and the applicable RBI Master Direction for ARCs.' },
  { q: 'Is ARC Registration mandatory before acquiring NPAs from banks?', a: 'Yes. No company can commence the business of securitisation or asset reconstruction without obtaining a Certificate of Registration from RBI.' },
  { q: 'What activities are allowed after ARC Registration?', a: 'An ARC can acquire financial assets, issue Security Receipts to Qualified Buyers, undertake restructuring, enforce security interest, settle dues, convert debt into equity and implement recovery strategies as permitted.' },
  { q: 'Can a normal NBFC acquire stressed assets without ARC Registration?', a: 'A normal NBFC cannot undertake asset reconstruction business merely on the basis of NBFC registration. ARC activity requires registration under the SARFAESI framework.' },
  { q: 'What is the minimum Net Owned Fund for ARC Registration?', a: 'The minimum Net Owned Fund required for ARC Registration is Rs. 300 crore on an ongoing basis.' },
  { q: 'Can an LLP apply for ARC Registration?', a: 'No. Only a company incorporated under the Companies Act can apply for ARC Registration.' },
  { q: 'Can an individual apply for ARC Registration?', a: 'No. Individuals cannot apply directly. The applicant must be a company.' },
  { q: 'Can an ARC accept public deposits?', a: 'No. ARCs are prohibited from accepting public deposits.' },
  { q: 'What is a Security Receipt?', a: 'A Security Receipt represents the undivided right, title or interest of a Qualified Buyer in the financial asset acquired by the ARC.' },
  { q: 'Can Security Receipts be issued to the public?', a: 'No. Security Receipts can be issued only to Qualified Buyers.' },
  { q: 'What is the capital adequacy requirement for ARCs?', a: 'ARCs must maintain a minimum capital adequacy ratio of 15% of risk-weighted assets.' },
  { q: 'Is a business plan required for ARC Registration?', a: 'Yes. RBI expects a comprehensive business plan covering acquisition strategy, recovery approach, financial projections, capital adequacy and governance framework.' },
  { q: 'Is a Fair Practices Code mandatory for ARCs?', a: 'Yes. ARCs must frame and adopt a Board-approved Fair Practices Code.' },
  { q: 'Is an Asset Acquisition Policy required?', a: 'Yes. A Board-approved Asset Acquisition Policy must be prepared within the prescribed regulatory framework.' },
  { q: 'Can an ARC act as a Resolution Applicant under IBC?', a: 'Yes, subject to additional capital, governance and regulatory conditions prescribed under the RBI framework.' },
  { q: 'How long does ARC Registration take?', a: 'The timeline varies depending on documentation quality, regulatory scrutiny, capital structure, sponsor background and query response.' },
  { q: 'Can RBI reject the ARC Registration application?', a: 'Yes. RBI may reject the application if regulatory conditions are not satisfied.' },
  { q: 'Is renewal of ARC Registration required?', a: 'There is no periodic renewal like a normal licence, but continuous compliance is mandatory and the Certificate of Registration remains valid unless cancelled.' },
  { q: 'Can RBI cancel ARC Registration?', a: 'Yes. RBI may cancel registration for non-compliance, misrepresentation, failure to maintain capital or violation of regulatory conditions.' },
  { q: 'Are ARCs subject to RBI inspection?', a: 'Yes. RBI has powers to inspect ARCs and call for information.' },
  { q: 'Must ARCs report to Credit Information Companies?', a: 'Yes. Reporting obligations to Credit Information Companies apply.' },
  { q: 'Is NAV declaration mandatory for Security Receipts?', a: 'Yes. NAV must be declared periodically as prescribed.' },
  { q: 'Can ARCs directly lend money?', a: 'ARCs cannot undertake general lending like banks or NBFCs. Their activity is limited to securitisation and asset reconstruction.' },
  { q: 'How can Estabizz help with ARC Registration?', a: 'Estabizz assists with eligibility review, capital structuring support, business plan drafting, policy documentation, sponsor and director declarations, RBI application support, query response and post-registration compliance.' }
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
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
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

export default function ARCRegistrationPage() {
  const overviewCards: Card[] = [
    { title: 'Regulator', body: 'Reserve Bank of India' },
    { title: 'Governing Law', body: 'SARFAESI Act, 2002' },
    { title: 'Applicable Direction', body: 'RBI Master Direction - Asset Reconstruction Companies Directions, 2024, as amended from time to time' },
    { title: 'Registration Type', body: 'Certificate of Registration as Asset Reconstruction Company' },
    { title: 'Minimum NOF', body: 'Rs. 300 crore on an ongoing basis' },
    { title: 'Capital Adequacy', body: 'Minimum 15% of risk-weighted assets' },
    { title: 'Core Activity', body: 'Securitisation and asset reconstruction' },
    { title: 'Public Deposits', body: 'Not permitted' },
    { title: 'Security Receipts', body: 'Issued only to Qualified Buyers' },
    { title: 'Timeline', body: 'Indicative and subject to RBI review' }
  ];

  const supportCards: Card[] = [
    { title: 'Eligibility and Structuring Review', body: 'We review the proposed structure, sponsor background, capital readiness, MOA objects and regulatory fit for ARC Registration.' },
    { title: 'Rs. 300 Crore NOF and Capital Planning Support', body: 'We assist in preparing capital documentation, NOF computation support, financial disclosures and source of funds narrative.' },
    { title: 'Business Plan and Financial Projection Drafting', body: 'We prepare a detailed RBI-ready business plan covering acquisition strategy, recovery model, SR structure, AUM projections, capital adequacy and governance framework.' },
    { title: 'Policy and Governance Documentation', body: 'We assist in drafting Asset Acquisition Policy, Fair Practices Code, conflict of interest policy, risk management framework and committee governance documents.' },
    { title: 'Sponsor and Director Documentation', body: 'We support fit and proper declarations, sponsor disclosures, director profiles and regulatory documentation.' },
    { title: 'RBI Application and Query Support', body: 'We assist in preparing the application dossier and responding to RBI queries with structured, fact-based and professional submissions.' },
    { title: 'Post-Registration Compliance', body: 'We support compliance calendar, NAV disclosure framework, CIC reporting support, SARFAESI disclosure tracking, audit coordination and governance review.' },
    { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking process so clients receive organised updates throughout the engagement.' }
  ];

  const whyCards: Card[] = [
    { title: 'RBI Regulatory Expertise', body: 'Our team works across RBI licensing and compliance matters, including regulated financial sector registrations and post-approval obligations.' },
    { title: 'Compliance Depth, Not Just Documentation', body: 'We focus on capital, governance, policy, recovery strategy, risk controls and long-term compliance readiness.' },
    { title: 'Business Plan Expertise', body: 'We prepare practical, regulator-facing business plans with realistic financial projections and compliance-linked assumptions.' },
    { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a broader regulatory perspective.' },
    { title: '100+ Associate Professionals', body: 'Our professional network supports legal, finance, compliance, documentation and regulatory advisory requirements.' },
    { title: 'End-to-End Support', body: 'From structuring to application filing, query support and post-registration compliance, we provide organised professional handholding.' }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🏦', label: 'RBI Regulatory Advisory' },
        { emoji: '⚖️', label: 'SARFAESI Act Compliance' },
        { emoji: '💼', label: 'Rs. 300 Crore NOF Structuring' },
        { emoji: '📄', label: 'Business Plan & Policy Drafting' },
        { emoji: '🛡️', label: 'Governance Framework Support' },
        { emoji: '✅', label: 'Post-Registration Compliance' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'RBI Services', href: '/rbi' },
        { label: 'ARC Registration' }
      ]}
      title="ARC Registration in India - Complete RBI Regulatory Framework"
      heroDescription={
        <p className="m-0">
          <strong>ARC Registration in India</strong> is the regulatory approval granted by the Reserve Bank of India under the SARFAESI Act, 2002 to a company intending to carry on the business of securitisation and asset reconstruction. Asset Reconstruction Companies play an important role in India&apos;s stressed asset resolution ecosystem by acquiring financial assets from banks and financial institutions and implementing legally recognised recovery and resolution strategies.
        </p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for ARC Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check ARC Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="28 min read"
      displayYear="2025"
      focusKeyword="ARC Registration in India"
      sections={tocSections}
      ctaTitle="Apply for ARC Registration"
      ctaDescription="Get structured support for RBI application, Rs. 300 crore NOF readiness, business plan, policy drafting, governance framework and post-registration compliance."
      quickFacts={[
        { label: 'Regulator', value: 'RBI' },
        { label: 'Law', value: 'SARFAESI Act, 2002' },
        { label: 'Direction', value: 'RBI ARC Directions, 2024' },
        { label: 'Entity', value: 'Company' },
        { label: 'Minimum NOF', value: 'Rs. 300 crore' },
        { label: 'Capital Adequacy', value: '15% of RWA' },
        { label: 'Public Deposits', value: 'Not permitted' },
        { label: 'Timeline', value: 'Subject to RBI review' }
      ]}
      relatedArticles={[
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'RBI registration guide for NBFC-ICC with NOF, principal business test and COSMOS filing.' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license', category: 'RBI', description: 'RBI licensing framework for Account Aggregators and data sharing business models.' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support', category: 'RBI', description: 'Legal and compliance support for RBI-regulated financial entities.' },
        { title: 'NBFC Business Plan', href: '/rbi/nbfc-business-plan', category: 'RBI', description: 'Regulator-facing business plan and financial projection support for financial licences.' }
      ]}
      finalCtaTitle="Start Your ARC Registration Journey with Estabizz"
      finalCtaDescription="Build your ARC application with structured regulatory support, Rs. 300 crore NOF readiness review, RBI-focused business plan, policy documentation, governance framework and post-registration compliance assistance."
    >
      <Section id="quick-overview" title="ARC Registration in India: Quick Overview">
        <CardGrid cards={overviewCards} columns="md:grid-cols-2 lg:grid-cols-2" />
        <div className="info-box">
          The above details are indicative and must be evaluated based on the applicant&apos;s structure, sponsor background, capital position, governance framework, business model and latest RBI directions at the time of filing.
        </div>
      </Section>

      <Section id="what-is-arc-registration" title="What is ARC Registration in India?">
        <p>ARC Registration in India is the Certificate of Registration granted by the Reserve Bank of India to a company that intends to carry on the business of securitisation and asset reconstruction. No company can commence the business of securitisation or asset reconstruction without obtaining registration from RBI under the SARFAESI Act framework.</p>
        <p>ARC Registration in India is not a simple licence formality. It is an entry into a tightly regulated stressed asset resolution framework requiring substantial capital, strong governance, recovery expertise, policy discipline and continuous compliance.</p>
      </Section>

      <Section id="legal-framework" title="Legal Framework Governing ARC Registration in India">
        <DataTable
          headers={['Particular', 'Details']}
          rows={[
            ['Governing Law', 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002'],
            ['Key Provision', 'Section 3 of the SARFAESI Act, 2002'],
            ['Regulator', 'Reserve Bank of India'],
            ['Applicable Direction', 'Master Direction - Reserve Bank of India Asset Reconstruction Companies Directions, 2024, as amended from time to time'],
            ['Core Activities', 'Securitisation and asset reconstruction'],
            ['Certificate Issued', 'Certificate of Registration from RBI'],
            ['Public Deposit Permission', 'Not permitted'],
            ['Supervisory Authority', 'RBI may inspect, call for information, issue directions and take action for non-compliance']
          ]}
        />
        <p>The RBI Master Direction consolidates regulatory instructions for ARCs, including capital adequacy, governance, sponsor fit and proper norms, asset acquisition, Security Receipts, valuation, realisation, disclosures and post-registration compliance.</p>
      </Section>

      <Section id="asset-reconstruction-company" title="What is an Asset Reconstruction Company?">
        <p>An Asset Reconstruction Company is a specialised financial entity that acquires stressed or non-performing financial assets from banks and financial institutions and works towards recovery, restructuring or resolution through mechanisms permitted under the SARFAESI Act and RBI directions.</p>
        <BulletList items={[
          'Acquires stressed financial assets from banks and financial institutions',
          'Issues Security Receipts to Qualified Buyers',
          'Operates securitisation schemes through trusts',
          'Undertakes restructuring, settlement, enforcement and recovery',
          'May convert debt into equity as permitted',
          'May act as Resolution Applicant under IBC, subject to applicable conditions'
        ]} />
      </Section>

      <Section id="who-requires-arc-registration" title="Who Requires ARC Registration in India?">
        <DataTable
          headers={['Category of Entity', 'ARC Registration Required?', 'Regulatory Position']}
          rows={[
            ['Company acquiring NPAs from banks for reconstruction', 'Yes', 'Mandatory under SARFAESI framework'],
            ['Entity issuing Security Receipts', 'Yes', 'Security Receipts can be issued by registered ARC structure'],
            ['Entity undertaking securitisation business', 'Yes', 'Requires RBI registration'],
            ['ARC acting as Resolution Applicant under IBC', 'Yes', 'Subject to additional capital and governance conditions'],
            ['Bank restructuring its own portfolio', 'No', 'Governed by banking law and RBI banking regulations'],
            ['Normal NBFC acquiring stressed assets for ARC business', 'No, unless registered as ARC', 'NBFC registration alone is not sufficient for ARC activity']
          ]}
        />
      </Section>

      <Section id="eligibility" title="Eligibility for ARC Registration in India">
        <DataTable
          headers={['Requirement', 'Expected Position', 'Remarks']}
          rows={[
            ['Entity Type', 'Company incorporated under Companies Act', 'LLP, partnership firm and individual cannot apply'],
            ['Minimum NOF', 'Rs. 300 crore', 'Must be maintained on an ongoing basis'],
            ['Sponsor Fit and Proper', 'Required', 'Sponsor background and financial soundness are examined'],
            ['Director Fit and Proper', 'Required', 'Directors must submit declarations and meet governance expectations'],
            ['Business Plan', 'Required', 'Must explain acquisition, recovery, securitisation and compliance strategy'],
            ['MOA Objects', 'Required', 'MOA should authorise securitisation and asset reconstruction activities'],
            ['Governance Framework', 'Required', 'Board, committees, policies and control mechanisms must be demonstrated'],
            ['Operational Infrastructure', 'Required', 'Asset tracking, reporting, recovery and compliance systems are expected']
          ]}
        />
        <h3>Minimum Capital Requirement for ARC Registration in India</h3>
        <p>An ARC must maintain minimum Net Owned Fund of Rs. 300 crore on an ongoing basis. The Rs. 300 crore requirement demonstrates the capital-intensive nature of the ARC business and the institutional seriousness expected by RBI.</p>
        <DataTable
          headers={['Requirement', 'Details']}
          rows={[
            ['Minimum NOF', 'Rs. 300 crore'],
            ['Nature', 'Ongoing requirement'],
            ['Applicability', 'Asset Reconstruction Companies'],
            ['Existing ARC glide path', 'Rs. 100 crore as on October 11, 2022, Rs. 200 crore by March 31, 2024, Rs. 300 crore by March 31, 2026'],
            ['Non-compliance risk', 'RBI may restrict incremental business or take supervisory action']
          ]}
        />
        <div className="warning-box">Promoters should not treat ARC Registration as a low-capital financial licence. It is suitable only for applicants with strong capital backing, governance maturity and clear stressed asset resolution capability.</div>
      </Section>

      <Section id="nof-computation" title="Net Owned Fund Computation for ARC Registration">
        <DataTable
          headers={['Component', 'Treatment']}
          rows={[
            ['Paid-up equity capital', 'Add'],
            ['Compulsorily convertible preference capital', 'Add, subject to applicable definition'],
            ['Free reserves excluding revaluation reserve', 'Add'],
            ['Credit balance in Profit and Loss Account', 'Add, where applicable'],
            ['Accumulated losses', 'Deduct'],
            ['Intangible assets', 'Deduct'],
            ['Short provisions', 'Deduct'],
            ['Excess group exposures beyond prescribed threshold', 'Deduct as applicable']
          ]}
        />
        <FormulaCard>Paid-up Equity + Convertible Preference Capital + Free Reserves - Intangible Assets - Accumulated Losses - Short Provisions - Excess Group Exposures = Net Owned Fund</FormulaCard>
        <p>NOF computation must be carefully supported through financial statements, CA certification and capital proof. Incorrect NOF computation may lead to regulatory queries or application delay.</p>
      </Section>

      <Section id="capital-adequacy" title="Capital Adequacy Requirement for ARCs">
        <p>ARC Registration in India requires ongoing maintenance of a minimum Capital Adequacy Ratio of 15% of total risk-weighted assets. Capital for this purpose is linked to Net Owned Fund.</p>
        <DataTable
          headers={['Asset Category', 'Risk Weight']}
          rows={[
            ['Cash and Bank Deposits', '0%'],
            ['Government Securities', '0%'],
            ['Other Assets', '100%'],
            ['Contingent Liabilities', '50%']
          ]}
        />
        <FormulaCard>Capital Adequacy Ratio = Net Owned Fund / Risk Weighted Assets</FormulaCard>
        <p>The business plan should demonstrate how the applicant will maintain capital adequacy while acquiring financial assets and investing in Security Receipts.</p>
      </Section>

      <Section id="permissible-activities" title="Permissible Activities After ARC Registration in India">
        <BulletList items={[
          'Acquisition of financial assets',
          'Securitisation through issuance of Security Receipts',
          'Change or takeover of management',
          'Rescheduling of debts',
          'Settlement of dues',
          'Enforcement of security interest',
          'Conversion of debt into equity',
          'Acting as Resolution Applicant under IBC, subject to applicable conditions',
          'Recovery and resolution strategies permitted under SARFAESI framework'
        ]} />
        <div className="info-box">Permissible activities must be carried out strictly within the SARFAESI Act, RBI Master Direction and board-approved policies.</div>
      </Section>

      <Section id="key-restrictions" title="Key Restrictions Applicable to ARCs">
        <DataTable
          headers={['Restriction', 'Practical Meaning']}
          rows={[
            ['Public deposits not allowed', 'ARCs cannot accept public deposits'],
            ['General lending not allowed', 'ARCs cannot operate like normal banks or lending NBFCs'],
            ['Security Receipts not for public', 'SRs can be issued only to Qualified Buyers'],
            ['Investment in immovable property restricted', 'Permitted only in limited circumstances such as own use or enforcement-related acquisition'],
            ['Sponsor bank transactions restricted', 'Bilateral acquisition from sponsor banks is subject to restrictions'],
            ['Regulatory compliance mandatory', 'Non-compliance can invite RBI action'],
            ['Surplus fund investment restricted', 'Must remain within permitted investment categories']
          ]}
        />
      </Section>

      <Section id="documents-required" title="Documents Required for ARC Registration in India">
        <DataTable
          headers={['Category', 'Documents / Information']}
          rows={[
            ['Corporate Documents', 'Certificate of Incorporation, MOA, AOA, PAN, registered office proof and corporate profile'],
            ['MOA Object Clause', 'MOA must authorise securitisation and asset reconstruction activities'],
            ['Capital Documents', 'Proof of Rs. 300 crore NOF, bank statements, capital infusion documents, CA certificate and financial statements'],
            ['Board Documents', 'Board resolution approving ARC application, business plan and authorised signatories'],
            ['Sponsor Documents', 'Sponsor declaration, shareholding structure, financial background, source of funds and fit and proper information'],
            ['Director Documents', 'KYC, DIN, professional profile, fit and proper declarations, Annex II and Annex III as applicable'],
            ['Business Plan', 'Acquisition strategy, recovery strategy, target asset class, financial projections, capital adequacy model and risk framework'],
            ['Policy Documents', 'Asset Acquisition Policy, Fair Practices Code, conflict of interest policy, risk management policy and governance policies'],
            ['Organisational Structure', 'Proposed board, committees, senior management, recovery team, legal team and compliance function'],
            ['Regulatory Declarations', 'Non-acceptance of public deposits, sponsor/director declarations and other RBI-prescribed submissions']
          ]}
        />
      </Section>

      <Section id="registration-process" title="Step-by-Step ARC Registration Process">
        <div className="step-timeline">
          {[
            ['Company Incorporation and Object Clause Review', 'Ensure the applicant is a company and its MOA authorises securitisation and asset reconstruction activities.'],
            ['Capital Structuring and NOF Readiness', 'Infuse and document minimum Rs. 300 crore NOF and ensure capital source transparency.'],
            ['Sponsor and Director Due Diligence', 'Review fit and proper eligibility, financial soundness, regulatory history and disclosure requirements.'],
            ['Business Plan and Financial Projection Preparation', 'Prepare acquisition strategy, recovery model, SR scheme approach, AUM assumptions, capital adequacy projection and cash flow planning.'],
            ['Policy and Governance Documentation', 'Prepare Asset Acquisition Policy, Fair Practices Code, conflict of interest policy, risk management framework and board committee structure.'],
            ['RBI Application Preparation', 'Compile all documents, prescribed formats, declarations and supporting annexures.'],
            ['Submission to RBI Department of Regulation', 'Submit the application to the Chief General Manager-in-Charge, Department of Regulation, RBI, Central Office, Mumbai, or as may be prescribed.'],
            ['RBI Scrutiny and Clarifications', 'RBI may examine capital adequacy, governance, sponsor background, policy framework, business plan and operational readiness.'],
            ['Grant of Certificate of Registration', 'Upon regulatory satisfaction, RBI may grant Certificate of Registration as an ARC.'],
            ['Commencement of Business', 'After CoR, the ARC must commence business within the period specified by RBI, subject to applicable conditions.']
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
        <div className="warning-box">Each application is subject to RBI review and satisfaction. A well-prepared application improves regulatory clarity but does not guarantee approval.</div>
      </Section>

      <Section id="governance" title="Governance Requirements for Asset Reconstruction Companies">
        <DataTable
          headers={['Governance Requirement', 'Expected Position']}
          rows={[
            ['Independent Chairperson', 'Required as per applicable governance norms'],
            ['Audit Committee', 'Mandatory'],
            ['Nomination and Remuneration Committee', 'Mandatory'],
            ['Independent Advisory Committee', 'Required for settlement and takeover cases'],
            ['MD / CEO Age Limit', '70 years'],
            ['Maximum Continuous Tenure', '15 years'],
            ['Fit and Proper Review', 'Required for directors and sponsors'],
            ['Conflict of Interest Controls', 'Must be addressed through policy and governance framework']
          ]}
        />
        <FormulaCard>Board of Directors &rarr; Audit Committee &rarr; Nomination &amp; Remuneration Committee &rarr; Independent Advisory Committee &rarr; MD / CEO &rarr; Risk | Legal | Operations | Finance | Recovery | Compliance</FormulaCard>
      </Section>

      <Section id="security-receipts" title="Security Receipts Framework under ARC Registration in India">
        <p>Security Receipts represent undivided right, title or interest of Qualified Buyers in the financial assets acquired by an ARC through a scheme.</p>
        <DataTable
          headers={['Requirement', 'Details']}
          rows={[
            ['Eligible Investors', 'Qualified Buyers only'],
            ['Public Issue', 'Not permitted'],
            ['Minimum ARC Investment', 'Minimum 15% of transferor investment or 2.5% of total SRs issued, whichever is higher'],
            ['Recovery Rating', 'Mandatory within prescribed period'],
            ['NAV Declaration', 'Half-yearly'],
            ['Transferability', 'Subject to regulatory restrictions']
          ]}
        />
        <FormulaCard>Recovery Rating % x Face Value of SR = NAV</FormulaCard>
      </Section>

      <Section id="asset-realisation" title="Asset Realisation Framework for ARCs">
        <FormulaCard>Acquisition Date &rarr; Planning Period: maximum 6 months &rarr; Realisation Period: up to 5 years &rarr; Board-approved extension: maximum 8 years total from acquisition</FormulaCard>
        <p>The ARC must prepare a resolution and recovery strategy within the permitted planning period and monitor realisation within the regulatory timelines. Any extension should be properly justified and approved as required.</p>
        <h3>Provisioning Norms for ARCs</h3>
        <DataTable
          headers={['Asset Classification', 'Provision Requirement']}
          rows={[
            ['Sub-Standard', '10%'],
            ['Doubtful', '50% plus unsecured portion'],
            ['Loss', '100% write-off']
          ]}
        />
        <p>Provisioning has direct impact on capital adequacy and financial strength. ARC applicants must factor provisioning sensitivity into their business plan.</p>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance After ARC Registration in India">
        <DataTable
          headers={['Compliance Area', 'Frequency / Requirement']}
          rows={[
            ['CIC Reporting', 'Fortnightly'],
            ['NAV Disclosure', 'Half-yearly'],
            ['Audited Balance Sheet Submission', 'Within one month of AGM'],
            ['SARFAESI Possession Disclosure', 'Monthly website update'],
            ['Capital Adequacy Monitoring', 'Ongoing'],
            ['Statutory Audit', 'Annual'],
            ['Internal Controls', 'Continuous'],
            ['Governance Committee Meetings', 'As applicable'],
            ['Security Receipt Rating', 'As prescribed'],
            ['RBI Reporting', 'As prescribed by RBI']
          ]}
        />
        <p>Receipt of Certificate of Registration is only the beginning. ARCs must maintain continuous compliance, proper books of account, periodic disclosures, governance controls, audit discipline and regulatory reporting.</p>
      </Section>

      <Section id="business-plan" title="Business Plan and Financial Projection Framework for ARC Registration">
        <p>RBI evaluates whether the applicant has a credible, sustainable and risk-aware business model. The business plan should not be generic. It must explain the ARC acquisition strategy, recovery model, securitisation structure, governance framework and capital adequacy sustainability.</p>
        <h3>Business Model Architecture</h3>
        <FormulaCard>Bank NPA Portfolio &rarr; Due Diligence and Valuation &rarr; Acquisition by ARC &rarr; SR Issuance to Qualified Buyers &rarr; Recovery / Resolution Strategy &rarr; Realisation and Distribution</FormulaCard>
        <h3>Mandatory Business Plan Components</h3>
        <BulletList items={[
          'Promoter background and strategic intent',
          'Market opportunity assessment',
          'Target asset class',
          'Acquisition strategy',
          'Valuation methodology',
          'Resolution and recovery strategy',
          'Legal enforcement framework',
          'IBC participation strategy',
          'Three-year financial projections',
          'Capital adequacy projection',
          'Cash flow planning',
          'Risk management framework',
          'Compliance architecture'
        ]} />
        <h3>Illustrative Assumptions</h3>
        <DataTable
          headers={['Parameter', 'Year 1', 'Year 2', 'Year 3']}
          rows={[
            ['Assets Under Management', 'Rs. 1,500 crore', 'Rs. 3,000 crore', 'Rs. 5,000 crore'],
            ['Average Acquisition Discount', '60%', '55%', '50%'],
            ['Average Recovery Rate', '35%', '40%', '45%'],
            ['Operating Cost Ratio', '8%', '7%', '6%']
          ]}
        />
        <div className="warning-box">These figures are illustrative only. Actual projections must be customised based on the applicant strategy, capital strength, asset class, recovery assumptions and regulatory expectations.</div>
        <h3>Income Statement Structure</h3>
        <DataTable
          headers={['Particulars', 'Year 1', 'Year 2', 'Year 3']}
          rows={[
            ['Management Fees', 'To be projected', 'To be projected', 'To be projected'],
            ['Recovery Upside Share', 'To be projected', 'To be projected', 'To be projected'],
            ['Total Revenue', 'To be projected', 'To be projected', 'To be projected'],
            ['Operating Expenses', 'To be projected', 'To be projected', 'To be projected'],
            ['Profit Before Tax', 'To be projected', 'To be projected', 'To be projected']
          ]}
        />
      </Section>

      <Section id="rbi-query-areas" title="Common RBI Query Areas During ARC Registration">
        <BulletList items={[
          'Source and layering of capital',
          'Sponsor background and financial strength',
          'Management team experience',
          'Justification for recovery assumptions',
          'Capital adequacy sustainability',
          'Conflict of interest safeguards',
          'Governance independence',
          'Asset acquisition policy quality',
          'Operational readiness',
          'SARFAESI disclosure framework'
        ]} />
      </Section>

      <Section id="structuring-challenges" title="Common Structuring Challenges in ARC Registration in India">
        <DataTable
          headers={['Challenge', 'Practical Risk']}
          rows={[
            ['Improper NOF computation', 'RBI query or delay'],
            ['Weak acquisition policy drafting', 'Governance concern'],
            ['Inadequate sponsor due diligence', 'Fit and proper concerns'],
            ['Unrealistic recovery assumptions', 'Business plan credibility issue'],
            ['Insufficient capital adequacy modelling', 'Regulatory sustainability concern'],
            ['Governance gaps', 'Application scrutiny increases'],
            ['Poor conflict of interest controls', 'Regulatory risk'],
            ['Lack of recovery team capability', 'Operational readiness concern'],
            ['Weak documentation', 'Query cycles and delay']
          ]}
        />
      </Section>

      <Section id="timeline" title="Indicative Timeline for ARC Registration in India">
        <DataTable
          headers={['Stage', 'Activity', 'Estimated Duration']}
          rows={[
            ['Stage 1', 'Structuring, capital planning and eligibility review', '2 to 4 weeks'],
            ['Stage 2', 'Business plan, policy drafting and document preparation', '4 to 6 weeks'],
            ['Stage 3', 'Application submission to RBI', 'Case-specific'],
            ['Stage 4', 'RBI scrutiny and initial review', '3 to 6 months'],
            ['Stage 5', 'Clarifications and additional submissions', 'Case-specific'],
            ['Stage 6', 'Grant of Certificate of Registration', 'Subject to RBI satisfaction']
          ]}
        />
        <p>Upon grant of Certificate of Registration, the ARC must commence business within the period specified by RBI. The timeline is indicative and depends on regulatory scrutiny, documentation quality, capital structure, governance readiness and RBI queries.</p>
      </Section>

      <Section id="inspection-action" title="RBI Inspection and Regulatory Action">
        <DataTable
          headers={['Trigger', 'Possible Consequence']}
          rows={[
            ['Failure to maintain Rs. 300 crore NOF', 'Restrictions or supervisory action'],
            ['Failure to maintain capital adequacy', 'Business restriction or corrective measures'],
            ['Misrepresentation in application', 'Rejection or regulatory action'],
            ['Non-compliance with SARFAESI provisions', 'Penalties under law'],
            ['Governance failure', 'RBI directions or restrictions'],
            ['Violation of public deposit prohibition', 'Serious regulatory action'],
            ['Persistent non-compliance', 'Cancellation of registration']
          ]}
        />
        <p>RBI may inspect ARCs, call for information, issue directions, restrict operations, impose monetary penalties or cancel registration where regulatory conditions are not satisfied.</p>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with ARC Registration in India">
        <CardGrid cards={supportCards} columns="md:grid-cols-2" />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for ARC Registration in India?">
        <CardGrid cards={whyCards} columns="md:grid-cols-2" />
      </Section>

      <Section id="faqs" title="FAQs on ARC Registration in India">
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
          <p className="!mb-2"><strong>Expertise:</strong> RBI, SEBI, IRDAI, IFSCA, fintech regulatory compliance, NBFC licensing, ARC registration, financial sector documentation and post-registration compliance.</p>
          <p className="!mb-0">This content has been prepared from a regulatory advisory perspective to help promoters, sponsors, investors and financial sector professionals understand the broad RBI framework for Asset Reconstruction Company registration in India.</p>
        </div>
        <div className="warning-box">
          This content is for general informational purposes only and should not be treated as legal, regulatory, financial or investment advice. RBI requirements, application formats, capital thresholds, compliance expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with RBI.
        </div>
      </Section>

      <Section id="speak-to-expert" title="Start Your ARC Registration Journey with Estabizz">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a2b45] p-6 md:p-8 text-white">
          <p className="!text-blue-100">Build your ARC application with structured regulatory support, Rs. 300 crore NOF readiness review, RBI-focused business plan, policy documentation, governance framework and post-registration compliance assistance.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0077B6] hover:bg-blue-50">Speak to RBI Compliance Expert</Link>
            <Link href="/get-started" className="rounded-xl bg-[#0096D6] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0077B6]">Apply for ARC Registration</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#10b981] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#059669]">WhatsApp Estabizz Team</a>
          </div>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
