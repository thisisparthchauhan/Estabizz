'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'PMS Registration in India: Quick Overview' },
  { id: 'what-is-pms', title: 'What is PMS Registration in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'portfolio-manager', title: 'What is a Portfolio Manager?' },
  { id: 'comparison', title: 'PMS vs Investment Adviser vs AIF vs Mutual Fund' },
  { id: 'types-of-pms', title: 'Types of PMS' },
  { id: 'who-needs', title: 'Who Needs PMS Registration?' },
  { id: 'who-cannot', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'net-worth', title: 'Net Worth Requirement' },
  { id: 'client-minimum', title: 'Minimum Client Investment Rule' },
  { id: 'principal-officer', title: 'Principal Officer Requirement' },
  { id: 'team-compliance', title: 'Compliance Officer and Additional Employee' },
  { id: 'infrastructure', title: 'Infrastructure and Governance' },
  { id: 'business-plan', title: 'Business Plan Requirement' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'government-fees', title: 'Government Fees' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'form-a', title: 'Form A Field-Wise Explanation' },
  { id: 'post-registration-activities', title: 'Post-Registration Activities' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'compliance-calendar', title: 'Compliance Calendar' },
  { id: 'investment-restrictions', title: 'Investment Restrictions' },
  { id: 'custodian-audit-reporting', title: 'Custodian, Audit and Reporting' },
  { id: 'grievance', title: 'Grievance Redressal' },
  { id: 'business-transfer', title: 'Transfer of PMS Business' },
  { id: 'inspection-enforcement', title: 'SEBI Inspection and Enforcement' },
  { id: 'suspension-cancellation', title: 'Suspension and Cancellation' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'strategic-recommendations', title: 'Strategic Structuring Recommendations' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our SEBI Compliance Expert' }
];

const faqs = [
  ['What is PMS Registration in India?', 'PMS Registration in India is approval granted by SEBI to a body corporate that intends to manage portfolios of securities or funds on behalf of clients under a written agreement.'],
  ['Who regulates PMS in India?', 'PMS is regulated by the Securities and Exchange Board of India.'],
  ['Which regulations govern PMS Registration?', 'PMS is governed by the SEBI Portfolio Managers Regulations, 2020, as amended from time to time.'],
  ['Is PMS Registration mandatory?', 'Yes. No person can act as a Portfolio Manager without obtaining SEBI registration.'],
  ['What is a Portfolio Manager?', 'A Portfolio Manager is a body corporate that manages or administers client portfolios on discretionary, non-discretionary or advisory basis.'],
  ['Is PMS the same as Investment Adviser?', 'No. Investment Adviser gives advice, while PMS involves managing or administering client portfolios.'],
  ['Is PMS the same as AIF?', 'No. PMS manages client-wise portfolios separately, while AIF is a privately pooled investment vehicle.'],
  ['Is PMS the same as Mutual Fund?', 'No. PMS is customised client-wise portfolio management, while mutual funds are pooled investment products.'],
  ['What are the types of PMS?', 'PMS may be discretionary, non-discretionary or advisory.'],
  ['What is discretionary PMS?', 'In discretionary PMS, the portfolio manager takes investment decisions on behalf of the client within the agreed mandate.'],
  ['What is non-discretionary PMS?', 'In non-discretionary PMS, the portfolio manager acts based on client instructions or approval.'],
  ['What is advisory PMS?', 'Advisory PMS involves portfolio advice, while the client retains execution control.'],
  ['Who can apply for PMS Registration?', 'A body corporate such as company or LLP may apply, subject to SEBI eligibility requirements.'],
  ['Can an individual apply?', 'No. Individuals cannot obtain PMS Registration.'],
  ['Can a partnership firm apply?', 'A non-LLP partnership firm is not eligible. LLP may apply if it meets regulatory conditions.'],
  ['What is the minimum net worth required?', 'Minimum net worth required is Rs. 5 Crore.'],
  ['Is net worth required only at application stage?', 'No. Net worth must be maintained continuously.'],
  ['Can borrowed funds be counted as net worth?', 'No. Borrowed funds should not be treated as regulatory net worth.'],
  ['What is the minimum client investment?', 'The minimum investment per client is generally Rs. 50 Lakh, subject to applicable exceptions.'],
  ['Can PMS accept retail clients below Rs. 50 Lakh?', 'Generally no, unless a regulatory exception applies.'],
  ['Is Principal Officer required?', 'Yes. A qualified and experienced Principal Officer is mandatory.'],
  ['What experience is required for Principal Officer?', 'The Principal Officer must have minimum 5 years’ securities market experience, including relevant PMS, advisory or fund management experience.'],
  ['Is NISM certification required?', 'Yes. Valid NISM certification is required as applicable.'],
  ['Is Compliance Officer required?', 'Yes. A separate Compliance Officer is mandatory.'],
  ['Can Principal Officer and Compliance Officer be the same person?', 'No. These roles should remain separate.'],
  ['Is additional employee required?', 'Yes. At least one additional employee with prescribed qualification and experience is required.'],
  ['Is custodian appointment mandatory?', 'Yes. Custodian appointment is mandatory.'],
  ['What form is used for PMS application?', 'Form A under Schedule I is used for application.'],
  ['Where is PMS application filed?', 'PMS application is filed through the SEBI Intermediaries Portal.'],
  ['What is Form B?', 'Form B is the certificate of registration granted by SEBI.'],
  ['What is the application fee?', 'The current official FAQ states application fee of Rs. 1,00,000, subject to latest SEBI verification.'],
  ['What is the registration fee?', 'Registration fee is generally Rs. 10,00,000, subject to latest SEBI Schedule II verification.'],
  ['Is block fee payable?', 'Yes. A continuation / block fee is payable every three years, subject to latest SEBI fee schedule.'],
  ['Can SEBI reject an incomplete application?', 'Yes. SEBI may reject applications that are incomplete or do not meet requirements after giving opportunity to rectify deficiencies.'],
  ['Can SEBI ask for personal representation?', 'Yes. SEBI may call the applicant or Principal Officer for interaction.'],
  ['How long does PMS Registration take?', 'The process generally takes several months depending on documentation quality, SEBI review and query response.'],
  ['Can PMS guarantee returns?', 'No. PMS cannot guarantee returns.'],
  ['Can PMS pool investor funds?', 'PMS should not pool funds like an AIF or mutual fund. Client-wise portfolio segregation is required.'],
  ['Are quarterly reports required?', 'Yes. Client reporting is required every quarter.'],
  ['Is annual audit required?', 'Yes. Annual audit is required within the prescribed timeline.'],
  ['Can PMS business be transferred?', 'PMS business transfer requires prior SEBI approval and must comply with applicable circulars and conditions.'],
  ['Is change in control allowed without approval?', 'No. Prior SEBI approval is required for change in control.'],
  ['Can SEBI inspect PMS entities?', 'Yes. SEBI may inspect books, client records, compliance systems, investment records and related documents.'],
  ['Can PMS Registration be suspended?', 'Yes. SEBI may suspend or cancel registration for serious or repeated non-compliance.'],
  ['What are common reasons for SEBI queries?', 'Common reasons include weak Principal Officer documentation, unclear business plan, net worth issues, certification gaps and inadequate compliance framework.'],
  ['How can Estabizz help with PMS Registration in India?', 'Estabizz assists with PMS model assessment, entity review, net worth documentation, Principal Officer and team documentation, business plan, Form A filing, SEBI query support and post-registration compliance.']
].map(([q, a]) => ({ q, a }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]"><table className="data-table my-0 min-w-[720px]"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
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

function Flow({ items }: { items: string[] }) {
  return <div className="my-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-sky-50 to-white p-5"><div className="grid grid-cols-1 gap-3">{items.map((item, index) => <div key={item} className="flex items-center gap-3"><div className="min-w-8 h-8 rounded-full bg-[#0a1628] text-white text-sm font-bold flex items-center justify-center">{index + 1}</div><div className="flex-1 rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-[#0a1628] shadow-sm">{item}</div></div>)}</div></div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '📈', label: 'SEBI Regulatory Advisory' }, { emoji: '💼', label: 'Portfolio Manager License' }, { emoji: '📋', label: 'Form A & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'PMS Registration in India' }]}
      title="PMS Registration in India - Complete SEBI Portfolio Manager Compliance Guide"
      heroDescription={<><p><strong>PMS Registration in India</strong> is the regulatory approval granted by the Securities and Exchange Board of India to a body corporate that intends to manage or administer portfolios of securities or funds on behalf of clients under the SEBI Portfolio Managers framework. For wealth managers, family office platforms, HNI advisory businesses and institutional asset management teams, PMS Registration in India is the foundational approval required before offering discretionary, non-discretionary or advisory portfolio management services.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI Regulatory Advisory', 'Discretionary / Non-Discretionary PMS Structuring', 'Rs. 5 Crore Net Worth Readiness', 'Principal Officer Documentation', 'NISM Certification Mapping', 'Form A Filing Support', 'SEBI Query Response', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for PMS Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check PMS Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="34 min read"
      displayYear="2026"
      focusKeyword="PMS Registration in India"
      sections={sections}
      ctaTitle="Plan Your PMS Filing"
      ctaDescription="Discuss model selection, net worth readiness, Principal Officer documents and SEBI filing strategy."
      quickFacts={[{ label: 'Regulator', value: 'SEBI' }, { label: 'Net Worth', value: 'Rs. 5 Cr' }, { label: 'Client Min.', value: 'Rs. 50 L' }, { label: 'Form', value: 'Form A' }, { label: 'Timeline', value: '4-8 months' }]}
      relatedArticles={[
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Registration for privately pooled investment vehicles.' },
        { title: 'AIF Compliance Test Report', href: '/sebi/aif-compliance-test-report', category: 'SEBI', description: 'Compliance test report requirements for Alternative Investment Funds.' },
        { title: 'Alternative Asset Portfolio Valuation', href: '/sebi/alternative-asset-portfolio-valuation', category: 'SEBI', description: 'SEBI framework for valuation and alternative asset governance.' }
      ]}
      finalCtaTitle="Start Your PMS Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI PMS application with structured regulatory support, PMS model assessment, Rs. 5 Crore net worth readiness, Principal Officer documentation, NISM certification mapping, business plan, Form A filing, SEBI query response and post-registration compliance assistance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for PMS Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check PMS Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="PMS Registration in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Securities and Exchange Board of India' },
          { title: 'Applicable Regulation', body: 'SEBI Portfolio Managers Regulations, 2020, as amended from time to time' },
          { title: 'Latest Official Position Checked', body: 'SEBI listing shows Portfolio Managers Regulations last amended on September 03, 2025; Portfolio Managers Master Circular dated July 16, 2025; PMS business transfer circular dated October 24, 2025.' },
          { title: 'Registration Type', body: 'Portfolio Manager Registration' },
          { title: 'Eligible Applicant', body: 'Body corporate such as Company or LLP, subject to eligibility' },
          { title: 'Individual Applicant', body: 'Not eligible' },
          { title: 'Proprietorship / Partnership Firm', body: 'Not eligible, unless structured as eligible body corporate / LLP' },
          { title: 'Minimum Net Worth', body: 'Rs. 5 Crore' },
          { title: 'Minimum Client Investment', body: 'Rs. 50 Lakh per client, subject to applicable exceptions' },
          { title: 'PMS Models', body: 'Discretionary, Non-Discretionary and Advisory Portfolio Management' },
          { title: 'Application Form', body: 'Form A under Schedule I' },
          { title: 'Certificate', body: 'Form B after SEBI approval' },
          { title: 'Principal Officer', body: 'Professional qualification, 5 years securities market experience, 2 years relevant PMS / advisory / fund management experience and valid NISM certification' },
          { title: 'Additional Employee', body: 'At least one additional employee with graduation and 2 years securities market experience' },
          { title: 'Compliance Officer', body: 'Mandatory and separate from Principal Officer' },
          { title: 'Custodian', body: 'Mandatory appointment' },
          { title: 'Validity', body: 'Valid unless suspended or cancelled, subject to ongoing compliance and fee payment' },
          { title: 'Indicative Timeline', body: '4 to 8 months, depending on documentation and SEBI review' }
        ]} />
        <div className="warning-box">The above details are indicative and must be evaluated based on the applicant’s legal structure, net worth readiness, Principal Officer eligibility, NISM certification, team capability, compliance framework, custodian arrangement, business model, client profile and latest SEBI regulations / circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-pms" title="What is PMS Registration in India?">
        <p>PMS Registration in India is the approval granted by SEBI to a body corporate for acting as a Portfolio Manager. A Portfolio Manager manages or administers a client’s portfolio of securities, funds or permitted instruments under a written agreement.</p>
        <p>Portfolio Management Services are different from simple investment advisory. PMS involves a higher degree of fiduciary responsibility because the portfolio manager may manage client funds or securities directly, depending on whether the model is discretionary, non-discretionary or advisory.</p>
        <div className="warning-box">No person should act as a Portfolio Manager or hold itself out as a PMS provider without obtaining SEBI registration. Unregistered portfolio management activity may attract regulatory action.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of PMS Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Primary Regulation', 'SEBI Portfolio Managers Regulations, 2020, as amended from time to time'],
          ['Applicable Law', 'SEBI Act, 1992'],
          ['Intermediary Framework', 'SEBI Intermediaries Regulations, 2008'],
          ['Application Form', 'Form A under Schedule I'],
          ['Certificate', 'Form B after SEBI approval'],
          ['Registration Requirement', 'Mandatory before acting as Portfolio Manager'],
          ['Core Regulatory Focus', 'Net worth, qualification, governance, client protection, disclosures, custodian, reporting, audit and inspection']
        ]} />
        <p>SEBI regulates eligibility, conduct, client agreements, disclosures, reporting, fees, audits, custodian arrangements, grievance redressal, inspection, suspension and cancellation of portfolio managers.</p>
      </Section>

      <Section id="portfolio-manager" title="What is a Portfolio Manager under SEBI Regulations?">
        <p>A Portfolio Manager is a body corporate that manages or administers a portfolio of securities or funds on behalf of clients under a written agreement. The portfolio manager may provide discretionary, non-discretionary or advisory services depending on the client mandate and registration scope.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Manages client-wise portfolios', 'Acts under written agreement', 'Maintains client-level segregation', 'Provides portfolio reporting', 'Follows investment restrictions', 'Cannot guarantee returns', 'Must appoint custodian', 'Must maintain compliance records'].map((title) => ({ title, body: 'Core PMS obligation to be built into client documentation, systems and internal controls.' }))} />
        <div className="info-box">PMS is not a pooled investment vehicle. Each client portfolio must be managed separately.</div>
      </Section>

      <Section id="comparison" title="PMS vs Investment Adviser vs AIF vs Mutual Fund">
        <DataTable headers={['Parameter', 'PMS', 'Investment Adviser', 'AIF', 'Mutual Fund']} rows={[
          ['Regulator', 'SEBI', 'SEBI', 'SEBI', 'SEBI'],
          ['Structure', 'Client-wise portfolio management', 'Advice-only model', 'Privately pooled fund', 'Public pooled investment product'],
          ['Client Funds Handling', 'Yes, depending on PMS model', 'No direct fund management', 'Yes, pooled fund', 'Yes, pooled fund'],
          ['Minimum Investment', 'Rs. 50 Lakh generally', 'Not same as PMS', 'Rs. 1 Crore generally', 'Retail accessible'],
          ['Portfolio Customisation', 'High', 'Advisory only', 'Scheme-level', 'Scheme-level'],
          ['Registration', 'Portfolio Manager', 'Investment Adviser', 'AIF', 'Mutual Fund'],
          ['Suitable For', 'HNI / UHNI customised portfolios', 'Advice-only business', 'Fund sponsors', 'Retail and institutional pooled investment']
        ]} />
        <div className="info-box">PMS Registration in India is suitable when the promoter intends to manage client portfolios, not merely provide investment advice.</div>
      </Section>

      <Section id="types-of-pms" title="Types of Portfolio Management Services">
        <DataTable headers={['Type', 'Meaning', 'Client Decision Role']} rows={[
          ['Discretionary PMS', 'Portfolio Manager takes investment decisions within agreed mandate', 'Limited day-to-day role'],
          ['Non-Discretionary PMS', 'Portfolio Manager advises and executes based on client approval', 'Client approves decisions'],
          ['Advisory PMS', 'Portfolio Manager provides portfolio advice, but execution remains with client', 'Client executes']
        ]} />
        <p>The business model should be clearly reflected in Form A, client agreement, disclosure document and operating SOPs.</p>
      </Section>

      <Section id="who-needs" title="Who Needs PMS Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Wealth Management Firms', body: 'Entities planning to manage customised portfolios for HNI or UHNI clients.' },
          { title: 'Family Office Platforms', body: 'Groups managing securities portfolios for high-value families and institutional clients.' },
          { title: 'Investment Professionals', body: 'Experienced professionals transitioning from advisory to discretionary portfolio management.' },
          { title: 'Fintech Wealth Platforms', body: 'Digital platforms intending to manage client portfolios under SEBI-regulated PMS structure.' },
          { title: 'Asset Management Groups', body: 'Entities building a client-wise portfolio management vertical.' },
          { title: 'Institutional Investment Platforms', body: 'Firms offering structured portfolio strategies to sophisticated investors.' }
        ]} />
      </Section>

      <Section id="who-cannot" title="Who Cannot Apply for PMS Registration in India?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Individual', 'Not eligible'],
          ['Proprietorship firm', 'Not eligible'],
          ['Non-LLP partnership firm', 'Not eligible'],
          ['Entity below Rs. 5 Crore net worth', 'Fails eligibility'],
          ['Entity without qualified Principal Officer', 'Application deficiency'],
          ['Entity without independent Compliance Officer', 'Governance concern'],
          ['Entity without additional qualified employee', 'Eligibility gap'],
          ['Entity with adverse securities market history', 'Fit and proper concern'],
          ['Entity intending to pool funds like AIF', 'Wrong regulatory route'],
          ['Entity proposing guaranteed returns', 'Not permitted']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for PMS Registration in India">
        <DataTable headers={['Eligibility Parameter', 'Regulatory Expectation']} rows={[
          ['Legal Structure', 'Body corporate such as Company or LLP'],
          ['Net Worth', 'Minimum Rs. 5 Crore'],
          ['Principal Officer', 'Professional qualification, experience and NISM certification'],
          ['Additional Employee', 'At least one employee with graduation and relevant experience'],
          ['Compliance Officer', 'Mandatory and separate from Principal Officer'],
          ['Fit and Proper', 'Applicant, directors, partners, principal officer and key persons must qualify'],
          ['Infrastructure', 'Adequate office, IT systems, staff and record maintenance capability'],
          ['Business Plan', 'Practical AUM, revenue, cost and compliance plan'],
          ['Custodian', 'Mandatory appointment'],
          ['Client Agreement', 'Written agreement with every client'],
          ['Disclosure Document', 'Required and to be updated on material changes']
        ]} />
      </Section>

      <Section id="net-worth" title="Net Worth Requirement for PMS Registration in India">
        <p>The minimum net worth requirement for PMS Registration in India is Rs. 5 Crore. Net worth must be maintained continuously and cannot be treated as a one-time application-stage requirement.</p>
        <div className="success-box"><strong>Net Worth =</strong> Paid-up Equity Capital + Free Reserves - Accumulated Losses - Deferred Expenditure - Miscellaneous Expenses Not Written Off</div>
        <DataTable headers={['Component', 'Treatment']} rows={[
          ['Paid-up Equity Capital', 'Included'],
          ['Free Reserves', 'Included'],
          ['Revaluation Reserves', 'Excluded'],
          ['Accumulated Losses', 'Deducted'],
          ['Deferred Expenditure', 'Deducted'],
          ['Miscellaneous Expenses Not Written Off', 'Deducted'],
          ['Borrowed Funds', 'Not a substitute for net worth']
        ]} />
        <p>Net worth should be certified by a Chartered Accountant and supported by financial statements, capital infusion records and bank documentation.</p>
      </Section>

      <Section id="client-minimum" title="Minimum Client Investment under PMS Registration in India">
        <DataTable headers={['Particular', 'Requirement']} rows={[
          ['Minimum Investment per Client', 'Rs. 50 Lakh'],
          ['Investment Mode', 'Funds or securities or combination as permitted'],
          ['Client Agreement', 'Mandatory'],
          ['Portfolio Segregation', 'Client-wise segregation required'],
          ['Accredited Investor Exception', 'May be available subject to applicable framework and disclosures']
        ]} />
        <div className="info-box">PMS is designed for sophisticated investors. It should not be positioned as a retail mass-market investment product.</div>
      </Section>

      <Section id="principal-officer" title="Principal Officer Requirement for PMS Registration in India">
        <p>The Principal Officer is responsible for decisions relating to management of client funds and securities, administration of client portfolios and other PMS operations.</p>
        <ul className="clean-list">
          {['Professional qualification in finance, law, accountancy or business management; or NISM postgraduate programme; or CFA Charter', 'Minimum 5 years’ experience in securities market', 'At least 2 years’ experience in portfolio management / investment advisory / fund management', 'Valid NISM certification', 'Fit and proper status', 'Responsible for portfolio management decisions', 'Should not be the same person as Compliance Officer'].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>SEBI may seek detailed experience mapping, employment documents and role descriptions to verify Principal Officer eligibility.</p>
      </Section>

      <Section id="team-compliance" title="Compliance Officer and Additional Employee Requirement">
        <DataTable headers={['Role', 'Requirement', 'Practical Importance']} rows={[
          ['Compliance Officer', 'Mandatory and separate from Principal Officer', 'Monitors regulatory compliance'],
          ['Additional Employee', 'Graduation and 2 years securities market experience', 'Supports portfolio operations'],
          ['Principal Officer', 'Experience and certification as prescribed', 'Responsible for portfolio decisions'],
          ['Board / Partners', 'Governance oversight', 'Ensures institutional control']
        ]} />
        <div className="warning-box">Do not combine Principal Officer and Compliance Officer roles. Role separation improves governance credibility.</div>
      </Section>

      <Section id="infrastructure" title="Infrastructure and Governance Requirement for PMS Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Adequate office premises', 'IT systems and portfolio management tools', 'Client-wise record maintenance', 'Secure data storage', 'Custodian coordination process', 'Trade execution control', 'Compliance monitoring dashboard', 'Grievance redressal mechanism', 'Risk management policy', 'Internal audit framework'].map((title) => ({ title, body: 'Operational capability expected for PMS application, launch and inspection readiness.' }))} />
        <h3>Suggested Governance Structure</h3>
        <Flow items={['Board of Directors / Designated Partners', 'Principal Officer', 'Investment Team', 'Compliance Officer', 'Operations Team', 'Custodian / Auditor / Back Office']} />
      </Section>

      <Section id="business-plan" title="Business Plan Requirement for PMS Registration in India">
        <p>SEBI examines whether the applicant has a sustainable PMS business model. A weak business plan may result in queries.</p>
        <DataTable headers={['Business Plan Component', 'What It Should Cover']} rows={[
          ['Projected AUM', '3-year AUM growth plan'],
          ['Revenue Model', 'Fixed fee, performance fee or combination'],
          ['Expense Structure', 'Staff, systems, compliance, custodian, audit and technology costs'],
          ['Client Acquisition Strategy', 'HNI / UHNI / family office pipeline'],
          ['Capital Sustainability', 'Ability to maintain Rs. 5 Crore net worth'],
          ['Compliance Budget', 'Reporting, audit, regulatory filings and legal support'],
          ['Risk Controls', 'Investment risk, concentration risk and grievance risk'],
          ['Technology Plan', 'PMS software, reporting tools and data security']
        ]} />
        <DataTable headers={['Particular', 'Year 1', 'Year 2', 'Year 3']} rows={[
          ['Projected AUM', 'Rs. 75 Cr', 'Rs. 150 Cr', 'Rs. 300 Cr'],
          ['Average Fee', '2%', '2%', '2%'],
          ['Gross Revenue', 'Rs. 1.5 Cr', 'Rs. 3 Cr', 'Rs. 6 Cr'],
          ['Employee Cost', 'Rs. 60 L', 'Rs. 90 L', 'Rs. 1.2 Cr'],
          ['Compliance Cost', 'Rs. 20 L', 'Rs. 25 L', 'Rs. 35 L'],
          ['Custodian Charges', 'Rs. 10 L', 'Rs. 20 L', 'Rs. 40 L'],
          ['Net Profit Estimate', 'Rs. 40 L', 'Rs. 1.2 Cr', 'Rs. 3 Cr']
        ]} />
        <div className="warning-box">The financial model is illustrative. Actual projections should match the promoter’s real business pipeline and cost assumptions.</div>
      </Section>

      <Section id="documents-required" title="Documents Required for PMS Registration in India">
        <DataTable headers={['Document Category', 'Key Documents']} rows={[
          ['Application Documents', 'Form A, application fee proof and SEBI-prescribed declarations'],
          ['Constitutional Documents', 'Certificate of incorporation / LLP registration, MOA, AOA / LLP agreement and PAN'],
          ['Corporate Approvals', 'Board resolution / partner resolution approving PMS application'],
          ['Financial Documents', 'CA-certified net worth certificate, audited financial statements, capital proof and bank statements'],
          ['Principal Officer Documents', 'Qualification proof, work experience evidence, NISM certificate and appointment documents'],
          ['Compliance Officer Documents', 'Qualification, experience and appointment documents'],
          ['Additional Employee Documents', 'Graduation certificate, experience documents and appointment proof'],
          ['Infrastructure Documents', 'Office proof, IT systems note, record maintenance capability and operational readiness details'],
          ['Business Plan', '3-year AUM projection, revenue model, cost structure and compliance plan'],
          ['Fit and Proper Documents', 'Declarations for directors, partners, principal officer and key persons'],
          ['Policy Documents', 'Risk policy, investment policy, grievance SOP, related party policy, insider trading / confidentiality policy'],
          ['Custodian Documents', 'Proposed custodian arrangement / appointment details'],
          ['Application Annexures', 'Any SEBI-prescribed supporting forms and undertakings']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for PMS Registration in India">
        <Timeline steps={[
          { title: 'Entity Structuring and Eligibility Review', body: 'Review whether the applicant is an eligible body corporate and whether its objects permit portfolio management services.' },
          { title: 'Capital Infusion and Net Worth Readiness', body: 'Arrange and document minimum Rs. 5 Crore net worth and obtain CA certification.' },
          { title: 'Principal Officer and Team Appointment', body: 'Appoint qualified Principal Officer, Compliance Officer and additional employee.' },
          { title: 'NISM Certification Completion', body: 'Ensure Principal Officer and other relevant persons hold valid certification as required.' },
          { title: 'Policy and Infrastructure Preparation', body: 'Prepare PMS policies, IT systems, record maintenance process, grievance mechanism and governance controls.' },
          { title: 'Form A Filing', body: 'Submit Form A through the SEBI Intermediaries Portal with required documents and application fee.' },
          { title: 'SEBI Scrutiny', body: 'SEBI reviews net worth, Principal Officer eligibility, team strength, infrastructure, business plan and fit and proper status.' },
          { title: 'Clarification and Query Response', body: 'Respond to SEBI queries with proper documents, explanations and revised submissions wherever required.' },
          { title: 'Personal Representation', body: 'SEBI may call the applicant or Principal Officer for interaction, if required.' },
          { title: 'In-Principle Approval', body: 'SEBI may issue in-principle approval subject to fulfilment of conditions.' },
          { title: 'Registration Fee Payment', body: 'Pay registration fee within prescribed timeline after SEBI intimation.' },
          { title: 'Certificate in Form B', body: 'SEBI grants certificate of registration in Form B.' }
        ]} />
      </Section>

      <Section id="government-fees" title="Government Fees for PMS Registration in India">
        <DataTable headers={['Fee Type', 'Amount / Position']} rows={[
          ['Application Fee', 'Rs. 1,00,000'],
          ['Registration Fee', 'Rs. 10,00,000'],
          ['Block / Continuation Fee', 'Rs. 5,00,000 every 3 years'],
          ['Payment Timeline', 'Registration fee generally payable within 15 days of SEBI intimation'],
          ['Payment Mode', 'SEBI payment gateway / prescribed SEBI mode']
        ]} />
        <div className="warning-box">Fees should be verified from the latest SEBI Portfolio Managers Regulations, Schedule II and SEBI portal instructions before filing or hardcoding in reusable website data.</div>
      </Section>

      <Section id="timeline" title="Timeline for PMS Registration in India">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Entity and eligibility review', '1 to 2 weeks'],
          ['Capital and net worth readiness', 'Case-specific'],
          ['Documentation and policy preparation', '3 to 6 weeks'],
          ['Form A filing', 'Case-specific'],
          ['Initial SEBI review', '30 to 45 days or more'],
          ['Query and clarification rounds', '30 to 60 days or more'],
          ['Personal representation', 'Case-specific'],
          ['Overall timeline', '4 to 8 months, depending on query cycle']
        ]} />
        <p>Timeline is indicative and depends on documentation quality, net worth readiness, Principal Officer eligibility, certification status, SEBI scrutiny and query response.</p>
      </Section>

      <Section id="form-a" title="Form A Field-Wise Explanation for PMS Registration in India">
        <DataTable headers={['Form A Section', 'What SEBI Expects Practically']} rows={[
          ['Applicant Details', 'Exact legal name, CIN / LLPIN and registered address'],
          ['Shareholding Pattern', 'Clear ownership and control structure'],
          ['Directors / Partners', 'KYC, DIN / DPIN, background and fit and proper disclosures'],
          ['Principal Officer', 'Qualification, experience, NISM certification and appointment details'],
          ['Compliance Officer', 'Qualification, experience and independence from Principal Officer'],
          ['Infrastructure', 'Office, IT systems and record maintenance capability'],
          ['Net Worth', 'CA-certified computation with break-up'],
          ['Business Plan', 'AUM strategy, revenue model and compliance cost'],
          ['Litigation Disclosure', 'Full transparency of securities market matters'],
          ['Fit and Proper Declaration', 'Confirmation under SEBI Intermediaries framework']
        ]} />
        <p>Incomplete Form A or weak supporting evidence may lead to multiple query rounds.</p>
      </Section>

      <Section id="post-registration-activities" title="Activities After PMS Registration in India">
        <ul className="clean-list">{['Execute client agreements', 'Issue disclosure document', 'Appoint custodian', 'Create client-wise portfolio records', 'Define investment mandates', 'Open client accounts as required', 'Set up reporting system', 'Establish grievance redressal mechanism', 'Create audit and compliance calendar', 'Maintain portfolio-wise investment restrictions', 'Track material changes in disclosure document', 'Maintain SEBI correspondence file'].map((item) => <li key={item}>{item}</li>)}</ul>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for Portfolio Managers">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Client Agreement', 'Mandatory written agreement'],
          ['Disclosure Document', 'Required before onboarding clients'],
          ['Quarterly Reporting', 'Client reports every 3 months'],
          ['Annual Audit', 'Within prescribed timeline after financial year close'],
          ['Net Worth Maintenance', 'Rs. 5 Crore continuously'],
          ['Custodian Appointment', 'Mandatory'],
          ['Grievance Redressal', 'Within prescribed timeline'],
          ['Disclosure Update', 'Material changes to be updated within prescribed timeline'],
          ['Books and Records', 'Maintain client-wise records'],
          ['Investment Restrictions', 'No guarantee of returns, no unauthorised leverage, no prohibited related party exposure'],
          ['Regulatory Filings', 'As specified by SEBI'],
          ['Business Transfer', 'Prior SEBI approval where applicable']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="PMS Registration in India - Compliance Calendar">
        <h3>Continuous Compliance</h3>
        <DataTable headers={['Compliance Item', 'Frequency', 'Responsibility', 'Risk if Missed']} rows={[
          ['Maintain Rs. 5 Crore Net Worth', 'Continuous', 'CFO / Board', 'Suspension / regulatory action'],
          ['Client-wise Segregation', 'Continuous', 'Operations Team', 'Inspection concern'],
          ['Investment Restrictions', 'Continuous', 'Investment Team', 'SEBI action'],
          ['Custodian Coordination', 'Continuous', 'Operations / Compliance', 'Operational risk'],
          ['Grievance Tracking', 'Continuous', 'Compliance Officer', 'Regulatory breach'],
          ['Disclosure Accuracy', 'Continuous', 'Principal Officer / Compliance', 'Investor protection issue']
        ]} />
        <h3>Monthly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Portfolio Restriction Review', 'Check investment limits and prohibited exposures', 'Investment Team'],
          ['Grievance Review', 'Track pending complaints', 'Compliance Officer'],
          ['Net Worth Monitoring', 'Check capital erosion risk', 'CFO'],
          ['Client Reporting Data Review', 'Prepare quarterly reporting inputs', 'Operations Team']
        ]} />
        <h3>Quarterly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement', 'Responsible Person']} rows={[
          ['Quarterly Client Report', 'Every 3 months', 'Portfolio Manager'],
          ['Risk Review', 'Portfolio risk and concentration review', 'Principal Officer'],
          ['Compliance Report', 'Internal compliance status note', 'Compliance Officer'],
          ['Board / Management Review', 'Governance oversight', 'Board / Partners']
        ]} />
        <h3>Annual Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['Annual Audit', 'Within prescribed timeline after financial year close'],
          ['Audited Financial Statements', 'Maintain and submit where applicable'],
          ['Net Worth Certificate', 'CA-certified net worth statement'],
          ['Policy Review', 'Investment policy, risk policy, grievance SOP and related party policy'],
          ['Custodian Confirmation', 'Annual custodian review'],
          ['NISM / Team Certification Review', 'Track validity and renewals']
        ]} />
        <h3>Event-Based Compliance</h3>
        <DataTable headers={['Trigger Event', 'Compliance Action']} rows={[
          ['Change in Principal Officer', 'Regulatory intimation / approval as applicable'],
          ['Change in Compliance Officer', 'Update records and ensure independence'],
          ['Change in Control', 'Prior SEBI approval required'],
          ['Material Change in Disclosure Document', 'Update within prescribed timeline'],
          ['Transfer of PMS Business', 'Prior SEBI approval required'],
          ['Net Worth Shortfall', 'Immediate corrective action'],
          ['SEBI Inspection Notice', 'Provide books and records promptly'],
          ['Client Complaint Escalation', 'Resolve and record closure']
        ]} />
      </Section>

      <Section id="investment-restrictions" title="Investment Restrictions under PMS Framework">
        <DataTable headers={['Restriction / Requirement', 'Practical Meaning']} rows={[
          ['No Guaranteed Returns', 'Portfolio Manager cannot guarantee performance'],
          ['No Pooling Like AIF', 'Client portfolios must remain separately managed'],
          ['No Unauthorised Leverage', 'Leverage restrictions must be followed'],
          ['No Speculative Transactions', 'Speculative trades not permitted except permitted derivatives'],
          ['No Unrated Related Party Securities', 'Restricted as per SEBI framework'],
          ['Prudential Limits', 'Portfolio mandates and risk limits must be followed'],
          ['Client Mandate Discipline', 'Investments must align with agreement and disclosure document']
        ]} />
        <div className="info-box">PMS is a fiduciary business. Strategy freedom is subject to client mandate, SEBI restrictions and risk governance.</div>
      </Section>

      <Section id="custodian-audit-reporting" title="Custodian, Audit and Reporting Requirements">
        <DataTable headers={['Requirement', 'Practical Position']} rows={[
          ['Custodian Appointment', 'Mandatory'],
          ['Quarterly Client Report', 'Required every 3 months'],
          ['Annual Audit', 'Required within prescribed timeline'],
          ['Client-wise Records', 'Mandatory'],
          ['Portfolio Valuation', 'As per agreed framework and regulations'],
          ['Disclosure Document', 'Updated for material changes'],
          ['Regulatory Reporting', 'As specified by SEBI'],
          ['Audit Trail', 'Trade and portfolio records must be inspection-ready']
        ]} />
      </Section>

      <Section id="grievance" title="Grievance Redressal for PMS Clients">
        <Flow items={['Complaint Received', 'Acknowledgement', 'Investigation', 'Resolution', 'Client Communication', 'Closure Record', 'Compliance Review']} />
        <ul className="clean-list">{['Dedicated grievance officer / compliance contact', 'Complaint register', 'Resolution timeline tracking', 'Escalation matrix', 'Client communication record', 'SEBI / SCORES tracking where applicable', 'Board / management review of complaints'].map((item) => <li key={item}>{item}</li>)}</ul>
      </Section>

      <Section id="business-transfer" title="Transfer of PMS Business and Exit Strategy">
        <p>The uploaded source document refers to SEBI’s October 24, 2025 circular allowing transfer of PMS business with prior approval. The latest official SEBI circular should be verified before hardcoding conditions.</p>
        <DataTable headers={['Scenario', 'Key Requirement']} rows={[
          ['Group Transfer', 'Prior SEBI approval required; selected or complete transfer may be permitted subject to conditions'],
          ['Non-Group Transfer', 'Complete business transfer may be required as per applicable framework'],
          ['Completion Timeline', 'Source document refers to 2 months; verify latest SEBI circular'],
          ['Client Consent', 'May be required based on transaction structure'],
          ['Surrender', 'Registration surrender may be required after complete transfer']
        ]} />
        <div className="warning-box">Business transfer is a strategic regulatory matter. Do not present PMS transfer as automatic or purely contractual.</div>
      </Section>

      <Section id="inspection-enforcement" title="SEBI Inspection and Enforcement Powers">
        <p>SEBI may inspect books, records, client details, investment records, compliance reports, grievance records, custodian arrangements and related party transactions.</p>
        <DataTable headers={['Inspection Area', 'Documents / Controls to Keep Ready']} rows={[
          ['Registration Certificate', 'Form B and SEBI correspondence'],
          ['Net Worth Records', 'CA certificate and financial statements'],
          ['Client Agreements', 'Executed client contracts'],
          ['Disclosure Documents', 'Latest and historical versions'],
          ['Portfolio Records', 'Client-wise portfolio statements'],
          ['Trade Records', 'Order and execution logs'],
          ['Custodian Records', 'Custodian appointment and confirmations'],
          ['Audit Reports', 'Annual audit and internal audit records'],
          ['Grievance Register', 'Complaint records and closure proof'],
          ['Related Party Records', 'Investment and conflict checks'],
          ['Board / Management Minutes', 'Governance review records']
        ]} />
      </Section>

      <Section id="suspension-cancellation" title="Suspension and Cancellation Triggers">
        <DataTable headers={['Trigger', 'Possible Regulatory Consequence']} rows={[
          ['Net worth below Rs. 5 Crore', 'Suspension or corrective action'],
          ['False disclosure', 'Cancellation risk'],
          ['Non-payment of fees', 'Suspension risk'],
          ['Failure to redress grievances', 'Regulatory action'],
          ['Misleading performance claims', 'Enforcement risk'],
          ['Guaranteeing returns', 'Serious regulatory concern'],
          ['Client fund misuse', 'Severe enforcement action'],
          ['Failure to maintain records', 'Inspection adverse finding'],
          ['Non-cooperation with SEBI inspection', 'Serious regulatory action'],
          ['Material change not reported', 'Regulatory breach']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in PMS Registration in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Weak Principal Officer experience documentation', 'SEBI query or delay'],
          ['No valid NISM certification', 'Eligibility gap'],
          ['Net worth not properly certified', 'Capital query'],
          ['Treating borrowed funds as capital', 'Regulatory concern'],
          ['Compliance Officer not independent', 'Governance issue'],
          ['Poorly drafted business plan', 'SEBI query'],
          ['Confusing PMS with Investment Adviser', 'Wrong regulatory positioning'],
          ['No custodian plan', 'Application weakness'],
          ['No client agreement draft', 'Operational gap'],
          ['No disclosure document framework', 'Investor protection concern'],
          ['No grievance SOP', 'Compliance deficiency'],
          ['Delayed SEBI query response', 'Approval delay']
        ]} />
      </Section>

      <Section id="strategic-recommendations" title="Strategic Structuring Recommendations Before Applying">
        <ul className="clean-list">{['Select correct PMS model: discretionary, non-discretionary or advisory', 'Maintain Rs. 5 Crore net worth with clean documentation', 'Appoint qualified Principal Officer early', 'Complete NISM certification before filing', 'Keep Compliance Officer independent', 'Prepare detailed 3-year AUM and revenue model', 'Draft client agreement and disclosure document', 'Appoint or identify custodian early', 'Prepare investment policy and risk framework', 'Build client-wise portfolio record system', 'Prepare grievance redressal SOP', 'Avoid guaranteed return language', 'Prepare for SEBI inspection from day one'].map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="expert-quote"><blockquote>“In portfolio management, capital is only the entry ticket. What sustains the licence is governance discipline, transparent disclosures and fiduciary responsibility.”</blockquote><cite>CS Devyani Khambhati - Compliance Expert</cite></div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with PMS Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'PMS Model Assessment', body: 'We help evaluate whether the proposed business should operate as discretionary PMS, non-discretionary PMS or advisory PMS.' },
          { title: 'Entity and Eligibility Review', body: 'We review company / LLP structure, object clause, fit and proper criteria, litigation background and regulatory suitability.' },
          { title: 'Net Worth Documentation', body: 'We assist with Rs. 5 Crore net worth planning, CA certificate, capital documentation and financial record alignment.' },
          { title: 'Principal Officer and Team Documentation', body: 'We assist in mapping Principal Officer qualification, experience, NISM certification, Compliance Officer independence and additional employee requirement.' },
          { title: 'Business Plan and Financial Projections', body: 'We prepare 3-year AUM projection, fee model, cost structure, compliance cost and profitability assumptions.' },
          { title: 'Policy and Governance Documentation', body: 'We help draft investment policy, risk management framework, related party policy, grievance SOP, confidentiality policy and internal compliance manual.' },
          { title: 'Form A Filing and SEBI Query Support', body: 'We support Form A preparation, SEBI portal filing coordination, document compilation and structured responses to SEBI clarifications.' },
          { title: 'Post-Registration Compliance', body: 'We support client agreement framework, disclosure document, quarterly reporting, annual audit, custodian coordination, net worth monitoring and compliance calendar.' },
          { title: 'PMS Business Transfer Advisory', body: 'We assist in evaluating regulatory requirements for PMS business transfer, change in control and surrender matters, where applicable.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for PMS Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Expertise', body: 'Our team works across SEBI licensing and compliance matters and understands capital market intermediary scrutiny.' },
          { title: 'Wealth Management Structuring Depth', body: 'We understand PMS business models, HNI client structures, AUM projections, custodian coordination and client agreement requirements.' },
          { title: 'Compliance-First Documentation', body: 'We focus on net worth, Principal Officer, Compliance Officer independence, investment restrictions, disclosures and inspection readiness.' },
          { title: 'Business Plan Strength', body: 'We prepare practical, regulator-facing business plans suitable for PMS applicants.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz’s experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From structuring to SEBI application, query response and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on PMS Registration in India">
        <div className="faq-accordion">{faqs.map((faq) => <details className="faq-item" key={faq.q}><summary>{faq.q}</summary><div>{faq.a}</div></details>)}</div>
      </Section>

      <Section id="expert-review" title="Reviewed by Estabizz Compliance Expert">
        <div className="info-box"><p><strong>Reviewed by:</strong> CS Devyani Khambhati</p><p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p><p><strong>Expertise:</strong> SEBI, RBI, IRDAI, IFSCA, PMS registration, portfolio manager compliance, wealth management structuring, SEBI intermediary licensing and post-registration regulatory support.</p><p>This content has been prepared from a regulatory advisory perspective to help wealth management companies, investment professionals, family office platforms, HNI advisory businesses, fintech wealth platforms and asset management groups understand the broad SEBI framework for PMS Registration in India.</p></div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. SEBI requirements, application formats, fee structures, net worth thresholds, certification requirements, custodian obligations, reporting timelines and approval processes may change from time to time. Applicants should verify the latest SEBI regulations, FAQs, circulars and fee schedule before filing any PMS application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>Estabizz can help you evaluate the correct PMS model, net worth readiness, Principal Officer documentation, Form A filing, query response and post-registration compliance framework.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3"><Link href="/contact" className="px-5 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link><Link href="/get-started" className="px-5 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Check PMS Eligibility</Link><a href={whatsappUrl} className="px-5 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a></div>
      </Section>
    </ServicePageLayout>
  );
}
