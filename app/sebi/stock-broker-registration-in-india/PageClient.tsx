'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'Stock Broker Registration in India: Quick Overview' },
  { id: 'what-is-stock-broker-registration', title: 'What is Stock Broker Registration in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'stock-broker', title: 'What is a Stock Broker?' },
  { id: 'exchange-membership', title: 'Why Exchange Membership is Mandatory' },
  { id: 'stock-broker-vs-authorised-person', title: 'Stock Broker vs Sub-Broker vs Authorised Person' },
  { id: 'full-service-vs-discount', title: 'Full-Service Broker vs Discount Broker' },
  { id: 'trading-clearing-member', title: 'Trading Member vs Clearing Member vs Self-Clearing Member' },
  { id: 'who-needs', title: 'Who Needs Stock Broker Registration?' },
  { id: 'who-cannot', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'net-worth-capital', title: 'Net Worth and Capital Requirement' },
  { id: 'security-deposit', title: 'Security Deposit and Base Capital' },
  { id: 'infrastructure-technology', title: 'Infrastructure and Technology Requirement' },
  { id: 'business-plan', title: 'Business Plan Requirement' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'fees-costs', title: 'Government Fees and Exchange Costs' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'client-segregation', title: 'Client Fund and Securities Segregation' },
  { id: 'margin-framework', title: 'Margin Framework and Risk Controls' },
  { id: 'margin-funding', title: 'Margin Funding Facility' },
  { id: 'proprietary-trading', title: 'Proprietary Trading Restrictions' },
  { id: 'algo-trading', title: 'Algorithmic Trading Approval' },
  { id: 'authorised-person', title: 'Authorised Person Network' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'compliance-calendar', title: 'Compliance Calendar' },
  { id: 'grievance-redressal', title: 'Investor Protection and Grievance Redressal' },
  { id: 'cyber-system-audit', title: 'Cyber Security and System Audit' },
  { id: 'inspection-powers', title: 'SEBI and Exchange Inspection Powers' },
  { id: 'penalties', title: 'Suspension, Cancellation and Penalties' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'strategic-recommendations', title: 'Strategic Structuring Recommendations' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our SEBI Compliance Expert' }
];

const faqs = [
  ['What is Stock Broker Registration in India?', 'Stock Broker Registration in India is the formal approval granted under SEBI and exchange framework to an eligible entity that wishes to execute trades in securities on behalf of clients on recognised stock exchanges.'],
  ['Is Stock Broker Registration mandatory to execute trades for clients?', 'Yes. No person or entity can legally act as a stock broker or execute client trades without valid SEBI registration and recognised stock exchange membership.'],
  ['Who regulates stock brokers in India?', 'Stock brokers are regulated by SEBI, recognised stock exchanges and clearing corporations.'],
  ['Is exchange membership mandatory before SEBI registration?', 'Yes. Exchange membership is a prerequisite before SEBI registration is granted.'],
  ['Can I operate a trading platform without SEBI registration?', 'No. Any platform offering securities trade execution must operate through a registered stock broker framework.'],
  ['What is the difference between a stock broker and authorised person?', 'A stock broker is directly registered and holds exchange membership. An authorised person works under a registered stock broker and does not hold independent stock broker registration.'],
  ['Can a broker operate in multiple exchanges?', 'Yes, subject to separate membership approvals from each recognised exchange.'],
  ['Does Stock Broker Registration allow all trading segments?', 'No. Segment-wise approvals are required for equity, derivatives, currency, commodity or other permitted segments.'],
  ['Is SEBI registration enough to start operations?', 'No. Exchange membership, segment approval, clearing arrangement, infrastructure readiness and compliance setup are also required.'],
  ['What certificate is issued after approval?', 'SEBI issues a registration certificate with a unique registration number.'],
  ['Is Stock Broker Registration permanent?', 'Registration remains valid so long as the broker complies with ongoing regulatory requirements and pays applicable fees.'],
  ['Who can apply for Stock Broker Registration in India?', 'Companies or other eligible entities permitted by exchange and SEBI may apply, subject to capital, infrastructure and fit-and-proper requirements.'],
  ['Can an individual apply?', 'Individual eligibility is highly restricted and exchanges generally prefer corporate structures.'],
  ['Can an LLP apply?', 'Eligibility depends on latest SEBI and exchange requirements.'],
  ['Is prior market experience mandatory?', 'Promoters may not always require prior trading experience, but the entity must appoint qualified personnel and compliance officer.'],
  ['What is fit and proper criteria?', 'It refers to integrity, financial soundness, absence of criminal conviction and clean regulatory track record.'],
  ['Can a foreign investor participate?', 'Foreign investment is subject to applicable FDI, FEMA and regulatory conditions.'],
  ['Can a stock broker provide advisory services?', 'Investment advisory services may require separate SEBI Investment Adviser registration unless specifically incidental and permitted.'],
  ['Can a broker provide research reports?', 'Research activity must be reviewed under the SEBI Research Analyst framework.'],
  ['Can a broker provide PMS services?', 'Portfolio management services require separate PMS registration.'],
  ['Can a broker trade for proprietary account?', 'Yes, subject to strict segregation of proprietary and client accounts.'],
  ['What is the first step in the registration process?', 'The first step is exchange membership application.'],
  ['Is physical office inspection conducted?', 'Yes. Exchange inspection of office, infrastructure and systems is typically conducted.'],
  ['What documents are required?', 'Documents generally include incorporation documents, MOA / AOA, net worth certificate, director KYC, business plan, infrastructure details, compliance officer details and exchange membership approval.'],
  ['Is board approval required?', 'Yes. Board resolution authorising the application is required.'],
  ['What is minimum net worth required?', 'Net worth depends on exchange, segment, membership category and clearing arrangement.'],
  ['How is net worth calculated?', 'Net worth generally includes paid-up capital and free reserves minus accumulated losses, intangible assets and non-qualifying items.'],
  ['Can borrowed funds be counted as net worth?', 'No. Net worth must represent owned capital, not debt.'],
  ['Are exchange deposits required?', 'Yes. Exchanges and clearing corporations require security deposits, base capital and segment-wise deposits.'],
  ['Is office space mandatory?', 'Yes. Adequate office and operational infrastructure is required.'],
  ['Are trading systems required before approval?', 'Yes. Exchanges verify trading system and risk management readiness.'],
  ['Is disaster recovery mandatory?', 'Yes. Brokers must maintain business continuity and disaster recovery arrangements.'],
  ['Is cyber security compliance required?', 'Yes. Brokers must maintain secure systems and undergo system audits.'],
  ['Is compliance officer mandatory?', 'Yes. Appointment of compliance officer is compulsory.'],
  ['Are internal audits mandatory?', 'Yes. Periodic internal audits are required as per regulatory and exchange norms.'],
  ['Are system audits mandatory?', 'Yes. System audits are mandatory periodically or as directed.'],
  ['Are client funds required to be segregated?', 'Yes. Client funds must be kept separate from proprietary funds.'],
  ['Can brokers use client funds for own expenses?', 'No. Misuse of client funds is a serious regulatory violation.'],
  ['Is margin reporting mandatory?', 'Yes. Margin collection, shortfall and reporting obligations apply.'],
  ['Can brokers offer margin funding?', 'Yes, margin funding may be offered subject to eligibility, board-approved policy, client consent, exposure limits, reporting and audit requirements.'],
  ['Can brokers fund 100% of purchase value?', 'No. Funding is subject to regulatory limits and prescribed margin requirements.'],
  ['Can margin funding be given for derivatives?', 'Margin funding generally applies to cash market purchases. Derivatives follow separate margin collection framework.'],
  ['Is board-approved margin funding policy mandatory?', 'Yes. A documented and board-approved policy is required.'],
  ['Is client consent required for margin funding?', 'Yes. Explicit consent and formal agreement are required.'],
  ['Can brokers appoint authorised persons?', 'Yes, subject to exchange approval and supervision requirements.'],
  ['Can brokers offer algorithmic trading?', 'Yes, subject to exchange approval, testing, risk controls and audit logs.'],
  ['Can brokers offer mobile trading apps?', 'Yes, subject to technology approval, system audit, cyber security and exchange requirements.'],
  ['Can brokers guarantee returns?', 'No. Brokers cannot guarantee returns.'],
  ['Can SEBI or exchange inspect stock brokers?', 'Yes. SEBI and exchanges may inspect records, systems, client funds, margin reports, KYC files and grievance records.'],
  ['What are common reasons for rejection or delay?', 'Common reasons include incomplete documentation, insufficient capital, weak compliance framework, poor infrastructure readiness and failure to meet fit-and-proper criteria.'],
  ['Can registration be suspended?', 'Yes. SEBI may suspend registration for serious non-compliance.'],
  ['Can registration be cancelled?', 'Yes. Registration may be cancelled for serious violations such as client fund misuse, false reporting or repeated compliance failures.'],
  ['Can broker voluntarily surrender registration?', 'Yes, subject to formal surrender procedure and settlement of obligations.'],
  ['Can registration be transferred?', 'Registration is not freely transferable and regulatory approval is required.'],
  ['How can Estabizz help with Stock Broker Registration in India?', 'Estabizz assists with business model assessment, exchange and segment planning, capital and net worth readiness, trading and clearing structure, documentation, exchange membership application, SEBI registration support, policy drafting, query response and post-registration compliance.']
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

const quickOverview: Card[] = [
  { title: 'Regulator', body: 'Securities and Exchange Board of India' },
  { title: 'Exchange Approval', body: 'NSE / BSE / recognised stock exchange membership is mandatory' },
  { title: 'Applicable Framework', body: 'SEBI Stock Brokers Regulations and exchange bye-laws, as amended from time to time' },
  { title: 'Latest Official Position Checked', body: 'SEBI currently lists the Stock Brokers Regulations 1992 last amended on February 10, 2025; NSE membership pages also refer to newer Stock Brokers Regulations and current exchange-wise norms. Verify before filing.' },
  { title: 'Registration Type', body: 'Stock Broker / Trading Member Registration' },
  { title: 'Eligible Applicant', body: 'Company or eligible entity as permitted by exchange and SEBI' },
  { title: 'Individual Applicant', body: 'Highly restricted; exchange norms generally prefer corporate structures' },
  { title: 'LLP Applicant', body: 'Eligibility depends on exchange requirements and latest framework' },
  { title: 'Exchange Membership', body: 'Prerequisite before SEBI registration' },
  { title: 'Permitted Segments', body: 'Equity, derivatives, currency, debt, commodity or other approved segments, subject to separate approvals' },
  { title: 'Clearing Arrangement', body: 'Professional Clearing Member or Self-Clearing Member model' },
  { title: 'Net Worth', body: 'Segment-wise and exchange-wise requirement' },
  { title: 'Security Deposit / Base Capital', body: 'Applicable as per exchange / clearing corporation norms' },
  { title: 'Compliance Officer', body: 'Mandatory' },
  { title: 'System Audit', body: 'Mandatory periodically' },
  { title: 'Internal Audit', body: 'Mandatory periodically' },
  { title: 'Client Fund Segregation', body: 'Strictly mandatory' },
  { title: 'Timeline', body: 'Indicative 3 to 6 months or more, depending on exchange and SEBI review' }
];

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '📈', label: 'SEBI Regulatory Advisory' }, { emoji: '🏛️', label: 'NSE / BSE Membership' }, { emoji: '🛡️', label: 'Client Fund Protection' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'Stock Broker Registration in India' }]}
      title="Stock Broker Registration in India - Complete SEBI and Exchange Compliance Guide"
      heroDescription={<><p><strong>Stock Broker Registration in India</strong> is the foundational regulatory approval required for an eligible entity intending to trade in securities on behalf of clients on recognised stock exchanges. A stock broker must obtain exchange membership and SEBI registration before offering trading access in equity, derivatives, currency, debt or other approved segments. For promoters planning to build a full-service brokerage, discount broking platform, fintech trading app or institutional brokerage desk, Stock Broker Registration in India requires serious planning around capital, infrastructure, technology, risk management, client fund protection and ongoing exchange compliance.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI Regulatory Advisory', 'NSE / BSE Membership Support', 'Trading Member Structuring', 'Clearing Member Planning', 'Capital and Net Worth Readiness', 'Client Fund Segregation Framework', 'Margin and Risk Policy Support', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for Stock Broker Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check Stock Broker Eligibility</Link><Link href="/contact" className="px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Plan Exchange Membership</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="38 min read"
      displayYear="2026"
      focusKeyword="Stock Broker Registration in India"
      sections={sections}
      ctaTitle="Plan Your Broker Filing"
      ctaDescription="Discuss exchange membership, segment strategy, capital readiness, clearing model, technology inspection and SEBI filing."
      quickFacts={[{ label: 'Regulator', value: 'SEBI + Exchange' }, { label: 'Membership', value: 'NSE / BSE' }, { label: 'Capital', value: 'Segment-wise' }, { label: 'Audit', value: 'Internal + System' }, { label: 'Timeline', value: '3-6+ months' }]}
      relatedArticles={[
        { title: 'RIA Registration in India', href: '/sebi/ria-registration-in-india', category: 'SEBI', description: 'SEBI Investment Adviser registration for fee-based advice.' },
        { title: 'Research Analyst Registration in India', href: '/sebi/research-analyst-registration-in-india', category: 'SEBI', description: 'SEBI RA registration for research reports and recommendations.' },
        { title: 'PMS Registration in India', href: '/sebi/pms-registration-in-india', category: 'SEBI', description: 'SEBI Portfolio Manager registration for client-wise portfolio management.' },
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF registration for privately pooled investment vehicles.' },
        { title: 'Depository Participant SEBI Registration', href: '/sebi/depository-participant-sebi-registration', category: 'SEBI', description: 'SEBI registration framework for Depository Participants.' }
      ]}
      finalCtaTitle="Start Your Stock Broker Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI Stock Broker application with structured regulatory support, exchange membership planning, capital and net worth readiness, trading and clearing structure, infrastructure inspection preparation, margin policy, client fund segregation framework, cyber security documentation, SEBI query response and post-registration compliance assistance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for Stock Broker Registration</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Plan Exchange Membership</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Stock Broker Registration in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={quickOverview} />
        <div className="warning-box">The above details are indicative and must be evaluated based on the applicant’s legal structure, exchange selection, membership category, trading segment, clearing arrangement, capital readiness, technology architecture, compliance officer appointment, cyber security framework and latest SEBI / exchange circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-stock-broker-registration" title="What is Stock Broker Registration in India?">
        <p>Stock Broker Registration in India is the registration granted under the SEBI and stock exchange framework to an eligible entity that wishes to execute trades in securities on behalf of clients on recognised stock exchanges. It authorises the broker to provide trading access, operate trading terminals, handle client orders, maintain margin compliance and comply with clearing and settlement obligations.</p>
        <p>Stock Broker Registration in India is not merely a trading business approval. It is a high-surveillance intermediary registration where the applicant must demonstrate capital adequacy, technology readiness, risk management systems, client fund protection, compliance manpower and operational discipline.</p>
        <div className="warning-box">SEBI registration alone is not sufficient to start broking operations. Exchange membership, segment approval, clearing arrangement, infrastructure inspection and ongoing compliance readiness are also required.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of Stock Broker Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Primary Regulator', 'Securities and Exchange Board of India'],
          ['Exchange-Level Authority', 'NSE, BSE and other recognised stock exchanges, as applicable'],
          ['Clearing Framework', 'Clearing corporations and clearing members'],
          ['Primary Regulation', 'SEBI Stock Brokers Regulations, as amended from time to time'],
          ['Applicable Laws', 'SEBI Act, 1992, Securities Contracts framework, exchange bye-laws, clearing corporation rules and SEBI circulars'],
          ['Operational Requirement', 'Exchange membership before SEBI registration'],
          ['Core Regulatory Focus', 'Capital adequacy, net worth, client fund segregation, margin compliance, technology controls, cyber security, reporting, audit, grievance redressal and inspection']
        ]} />
        <p>Stock brokers are supervised both by SEBI and recognised stock exchanges. Exchanges conduct operational scrutiny, infrastructure verification, membership review, compliance monitoring and surveillance. SEBI retains regulatory oversight and enforcement powers.</p>
      </Section>

      <Section id="stock-broker" title="What is a Stock Broker?">
        <p>A stock broker is a regulated securities market intermediary authorised to execute buy and sell orders in securities on behalf of clients. It may provide trading access through branch terminals, dealer terminals, web platforms, mobile trading apps or API-based systems, subject to approvals and controls.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Executes client trades', 'Provides trading platform access', 'Maintains client KYC', 'Collects and reports margin', 'Issues contract notes', 'Maintains books and records', 'Segregates client funds and securities', 'Handles investor grievances', 'Participates in exchange arbitration', 'Complies with SEBI and exchange reporting'].map((title) => ({ title, body: 'This responsibility must be supported by systems, policies, audit trails and trained compliance manpower.' }))} />
      </Section>

      <Section id="exchange-membership" title="Why Exchange Membership is Mandatory Before SEBI Registration">
        <p>Stock Broker Registration in India follows a two-level approval path. The applicant must first obtain membership approval from a recognised stock exchange. SEBI registration is then processed based on exchange recommendation / approval and prescribed documents.</p>
        <Flow items={['Entity Structuring', 'Capital and Net Worth Readiness', 'Exchange Membership Application', 'Infrastructure and System Inspection', 'Exchange Approval / Recommendation', 'SEBI Registration Process', 'Registration Certificate and Segment Activation']} />
        <div className="info-box">Exchange membership is not automatic. The exchange verifies infrastructure, directors, systems, net worth, compliance officer, risk management mechanism and operational readiness before moving the application forward.</div>
      </Section>

      <Section id="stock-broker-vs-authorised-person" title="Stock Broker vs Sub-Broker vs Authorised Person">
        <DataTable headers={['Parameter', 'Stock Broker', 'Sub-Broker / Authorised Person']} rows={[
          ['Registration / Appointment', 'Registered with SEBI and exchange / trading member framework', 'Works under a registered stock broker, subject to exchange approval'],
          ['Trading Rights', 'Direct trading member access', 'No independent exchange trading membership'],
          ['Client Relationship', 'Direct broker-client relationship', 'Acts as extension / network partner of broker'],
          ['Compliance Responsibility', 'Primary responsibility with broker', 'Broker remains responsible for supervision'],
          ['Revenue Model', 'Brokerage and approved services', 'Sharing / referral model subject to regulatory norms'],
          ['Independent Licence', 'Yes', 'No independent stock broker registration']
        ]} />
        <p>An authorised person model may be commercially useful for distribution expansion, but it cannot substitute Stock Broker Registration in India where independent trading member operations are proposed.</p>
      </Section>

      <Section id="full-service-vs-discount" title="Full-Service Broker vs Discount Broker">
        <DataTable headers={['Parameter', 'Full-Service Broker', 'Discount Broker']} rows={[
          ['Revenue Model', 'Brokerage, research, advisory / value-added services where permitted', 'Low-cost execution-focused brokerage'],
          ['Infrastructure', 'Larger branch, dealer, research and support setup', 'Technology-driven and lean'],
          ['Client Segment', 'Retail, HNI, corporate and institutional clients', 'Retail and online traders'],
          ['Compliance Burden', 'Higher where research / advisory / offline network exists', 'Strong technology, cyber and execution compliance focus'],
          ['Cost Structure', 'Higher fixed cost', 'Higher technology and platform cost'],
          ['Regulatory Registration', 'Stock Broker Registration remains same', 'Stock Broker Registration remains same']
        ]} />
        <div className="warning-box">If full-service broker model includes investment advice, research reports, PMS or other regulated activities, separate SEBI registrations may be required.</div>
      </Section>

      <Section id="trading-clearing-member" title="Trading Member, Clearing Member and Self-Clearing Member Structure">
        <DataTable headers={['Type', 'Role', 'Capital / Compliance Impact']} rows={[
          ['Trading Member', 'Executes trades on recognised stock exchange', 'Base membership and segment-wise capital norms'],
          ['Self-Clearing Member', 'Executes and clears own trades', 'Higher capital, systems and clearing obligations'],
          ['Professional Clearing Member', 'Clears trades for trading members', 'Separate clearing membership and eligibility'],
          ['Trading Member using PCM', 'Executes trades and clears through PCM', 'Reduces initial clearing infrastructure burden']
        ]} />
        <Flow items={['Client Trade Execution', 'Order Matching on Exchange', 'Clearing Corporation', 'Margin Computation', 'Funds / Securities Settlement', 'Client Ledger and Contract Note Update']} />
        <p>For many new applicants, clearing through a Professional Clearing Member may reduce initial capital pressure, but the final structure depends on business model and exchange norms.</p>
      </Section>

      <Section id="who-needs" title="Who Needs Stock Broker Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Discount Broking Platforms', body: 'Fintech founders building online trading platforms and mobile trading apps.' },
          { title: 'Full-Service Brokerage Firms', body: 'Promoters planning advisory-led, relationship-based or branch-led broking model.' },
          { title: 'Institutional Broking Desks', body: 'Groups intending to serve institutional clients and high-volume trading accounts.' },
          { title: 'Wealth Groups Adding Execution', body: 'Financial services groups planning to provide securities trade execution.' },
          { title: 'Trading App Promoters', body: 'Technology-led businesses providing direct market access through a broker structure.' },
          { title: 'Authorised Person Networks Becoming Independent', body: 'Distribution networks planning to move from authorised person model to independent broker model.' }
        ]} />
      </Section>

      <Section id="who-cannot" title="Who Cannot Apply for Stock Broker Registration in India?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Applicant failing fit and proper criteria', 'Registration risk'],
          ['Entity without prescribed net worth', 'Not eligible until capitalised'],
          ['Entity without exchange membership', 'SEBI registration cannot proceed'],
          ['Entity without trading systems and infrastructure', 'Exchange inspection issue'],
          ['Entity convicted of economic offence', 'Serious eligibility concern'],
          ['Applicant with adverse securities market order', 'Regulatory scrutiny'],
          ['Entity unable to segregate client funds', 'High investor protection risk'],
          ['Entity proposing guaranteed returns', 'Not permitted'],
          ['Entity proposing investment advisory without separate registration', 'Separate SEBI registration may be required']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for Stock Broker Registration in India">
        <DataTable headers={['Eligibility Parameter', 'Regulatory Expectation']} rows={[
          ['Legal Structure', 'Company or eligible entity as permitted by exchange and SEBI'],
          ['Exchange Membership', 'Mandatory before SEBI registration'],
          ['Net Worth', 'Segment-wise and exchange-wise prescribed requirement'],
          ['Capital / Base Deposit', 'Security deposit and base capital as per exchange and clearing corporation norms'],
          ['Fit and Proper', 'Promoters, directors and key persons must qualify'],
          ['Compliance Officer', 'Mandatory appointment'],
          ['Infrastructure', 'Office, connectivity, terminals, trading systems and dealer controls'],
          ['Technology', 'Trading platform, risk management system, cyber security and audit trail'],
          ['Business Plan', 'Realistic 3-year plan and segment strategy'],
          ['Risk Management', 'Margin collection, exposure limits and surveillance'],
          ['Client Protection', 'Client fund segregation, grievance redressal and investor protection process']
        ]} />
      </Section>

      <Section id="net-worth-capital" title="Net Worth and Capital Requirement for Stock Broker Registration in India">
        <p>Capital adequacy is central to Stock Broker Registration in India. However, net worth and deposit requirements vary based on exchange, segment, membership category, clearing arrangement and applicable circulars.</p>
        <DataTable headers={['Capital Component', 'Practical Meaning']} rows={[
          ['Regulatory Net Worth', 'Minimum owned funds required under SEBI / exchange framework'],
          ['Base Minimum Capital', 'Exchange-level capital / deposit requirement'],
          ['Security Deposit', 'Deposit with exchange / clearing corporation'],
          ['Segment Capital', 'Equity, derivatives, currency, commodity or debt segment-wise requirement'],
          ['Clearing Capital', 'Higher requirement where self-clearing is proposed'],
          ['Operational Capital', 'Technology, salary, rent, compliance and working capital buffer'],
          ['Risk Buffer', 'Additional capital to absorb volatility, margin and settlement risk']
        ]} />
        <div className="rounded-2xl bg-[#0a1628] text-white p-6 my-6"><div className="text-xs uppercase tracking-[0.2em] text-blue-200 mb-2">Net Worth Formula</div><p className="text-xl font-bold">Net Worth = Paid-up Capital + Free Reserves - Accumulated Losses - Intangible Assets - Non-Qualifying Items</p></div>
        <div className="warning-box">Do not hardcode a single capital number for all stock brokers. Capital requirement must be checked exchange-wise, segment-wise and membership-category-wise before filing.</div>
      </Section>

      <Section id="security-deposit" title="Security Deposit and Base Capital for Stock Broker Registration in India">
        <DataTable headers={['Requirement', 'Practical Position']} rows={[
          ['Exchange Admission Fee', 'Payable as per exchange membership category'],
          ['Security Deposit', 'Required by exchange / clearing corporation'],
          ['Base Minimum Capital', 'Segment-wise and membership-wise requirement'],
          ['Investor Protection Fund Contribution', 'Required as per exchange framework'],
          ['Clearing Deposit', 'Applicable where clearing membership is taken'],
          ['Annual Membership Fee', 'Payable periodically'],
          ['Turnover-Based Fee', 'May apply as per regulatory and exchange framework']
        ]} />
        <div className="warning-box">Exchange-level deposits and base capital may be significantly higher than SEBI registration fee. Promoters should prepare a consolidated budget before applying.</div>
      </Section>

      <Section id="infrastructure-technology" title="Infrastructure and Technology Requirement for Stock Broker Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Dedicated office premises', 'Exchange-approved trading terminals', 'Trading platform / app readiness', 'Order management system', 'Risk management system', 'Client KYC and onboarding system', 'Surveillance and monitoring tools', 'Secure data storage', 'Disaster recovery / business continuity plan', 'Cyber security controls', 'Audit trail and log monitoring', 'Dealer control framework'].map((title) => ({ title, body: 'This should be documented and ready for exchange review, operational testing and audit.' }))} />
        <p>Infrastructure inspection is a critical step. Mismatch between declared infrastructure and actual readiness may delay exchange approval.</p>
      </Section>

      <Section id="business-plan" title="Business Plan Requirement for Stock Broker Registration in India">
        <p>A realistic business plan is required to demonstrate operational sustainability. Regulators and exchanges examine whether the applicant has the financial, technology and compliance capacity to operate safely.</p>
        <DataTable headers={['Business Plan Component', 'What It Should Cover']} rows={[
          ['3-Year Revenue Forecast', 'Brokerage income, segment-wise turnover and client acquisition assumptions'],
          ['Expense Forecast', 'Technology, manpower, office, compliance, audit and exchange costs'],
          ['Capital Buffer', 'Risk capital and operational reserves'],
          ['Client Acquisition Plan', 'Retail, HNI, institutional, authorised person or digital strategy'],
          ['Segment Strategy', 'Equity, F&O, currency, commodity or debt market plan'],
          ['Clearing Model', 'PCM, self-clearing or clearing member arrangement'],
          ['Risk Management', 'Margin policy, exposure limits and surveillance process'],
          ['Compliance Budget', 'Internal audit, system audit, cyber audit, reporting and legal support']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for Stock Broker Registration in India">
        <DataTable headers={['Document Category', 'Key Documents']} rows={[
          ['Application Documents', 'Exchange membership application, SEBI application documents, fee proof and prescribed declarations'],
          ['Corporate Documents', 'Certificate of incorporation, MOA, AOA / LLP agreement, PAN and registered office proof'],
          ['Board Documents', 'Board resolution approving stock broker registration and exchange membership'],
          ['Financial Documents', 'Net worth certificate, audited financial statements, bank statements, source of funds and capital proof'],
          ['Promoter / Director Documents', 'KYC, DIN, PAN, address proof, fit and proper declarations and litigation disclosures'],
          ['Infrastructure Documents', 'Office proof, trading terminal details, connectivity details, system architecture and inspection readiness note'],
          ['Technology Documents', 'Trading platform details, cyber security policy, BCP / DR plan, system audit readiness and log retention process'],
          ['Compliance Documents', 'Compliance officer appointment, risk management policy, margin policy, client fund segregation policy and internal control framework'],
          ['Exchange Documents', 'Membership approval / recommendation, segment approval, clearing arrangement and deposit proof'],
          ['Business Plan', '3-year revenue, cost, segment strategy, compliance budget and technology roadmap']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for Stock Broker Registration in India">
        <Timeline steps={[
          { title: 'Business Model and Segment Assessment', body: 'Decide whether the proposed business is full-service broking, discount broking, institutional broking, proprietary plus client broking, or online trading platform.' },
          { title: 'Legal Entity and Object Clause Review', body: 'Review company / eligible entity structure and ensure securities broking activity is properly covered.' },
          { title: 'Capital and Net Worth Readiness', body: 'Arrange prescribed net worth, base capital, security deposit and operating capital based on selected exchange and segment.' },
          { title: 'Exchange Membership Application', body: 'File membership application with recognised stock exchange such as NSE / BSE, as applicable.' },
          { title: 'Infrastructure and System Inspection', body: 'Prepare office, trading systems, risk management framework, cyber security controls and compliance officer appointment for exchange inspection.' },
          { title: 'Exchange Approval / Recommendation', body: 'Obtain exchange membership approval / recommendation subject to fulfilment of conditions.' },
          { title: 'SEBI Registration Process', body: 'Submit SEBI registration documents through exchange / prescribed process with required documents and fees.' },
          { title: 'SEBI and Exchange Scrutiny', body: 'Respond to clarifications on capital, fit and proper status, infrastructure, compliance officer, system readiness and business plan.' },
          { title: 'Fee Payment and Certificate Grant', body: 'Pay prescribed registration fee and obtain SEBI registration certificate with unique registration number.' },
          { title: 'Segment Activation and Operational Launch', body: 'Activate approved segments, complete trading and clearing arrangements, onboard clients and commence operations only after full regulatory readiness.' }
        ]} />
      </Section>

      <Section id="fees-costs" title="Government Fees and Exchange Costs for Stock Broker Registration in India">
        <DataTable headers={['Fee / Cost Type', 'Practical Position']} rows={[
          ['SEBI Registration Fee', 'As prescribed under applicable schedule'],
          ['Turnover-Based Fee', 'Applicable as per SEBI / exchange framework'],
          ['Exchange Admission Fee', 'Separate from SEBI fee'],
          ['Annual Membership Fee', 'Payable to exchange'],
          ['Security Deposit', 'Payable / maintainable with exchange or clearing corporation'],
          ['Base Minimum Capital', 'Segment and membership-category specific'],
          ['Clearing Corporation Deposit', 'Applicable for clearing arrangement'],
          ['Investor Protection Fund Contribution', 'Payable as per exchange norms'],
          ['System Audit and Cyber Audit Cost', 'Recurring professional cost'],
          ['Technology and Trading Platform Cost', 'Commercial and operational cost']
        ]} />
        <div className="warning-box">Do not hardcode amounts unless verified from the latest SEBI, NSE, BSE and clearing corporation schedules. Segment-wise and membership-wise costs may change from time to time.</div>
      </Section>

      <Section id="timeline" title="Timeline for Stock Broker Registration in India">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Business model and eligibility review', '1 to 2 weeks'],
          ['Capital and documentation readiness', '2 to 4 weeks or more'],
          ['Exchange membership scrutiny', '2 to 4 months'],
          ['Infrastructure inspection and clarifications', 'Case-specific'],
          ['SEBI registration review', '1 to 3 months'],
          ['Segment activation', 'Case-specific'],
          ['Overall timeline', 'Generally 3 to 6 months or more depending on readiness']
        ]} />
        <p>Timeline is indicative and depends on exchange scrutiny, documentation quality, capital readiness, infrastructure inspection, technology preparedness, SEBI review and query response.</p>
      </Section>

      <Section id="client-segregation" title="Client Fund and Securities Segregation">
        <p>Client fund protection is one of the most sensitive compliance areas for stock brokers. Misuse of client funds or securities is treated as a serious regulatory violation.</p>
        <Flow items={['Client Funds Received', 'Separate Client Bank Account', 'Margin / Settlement Use Only', 'Daily Reconciliation', 'Reporting to Exchange / Clearing Corporation', 'Client Ledger Update', 'Audit Review']} />
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Separate Client Bank Account', 'Client money cannot be mixed with proprietary funds'],
          ['Separate Proprietary Account', 'Broker’s own funds and trades must be segregated'],
          ['Daily Reconciliation', 'Client funds and securities must be matched and monitored'],
          ['Collateral Segregation', 'Client collateral must be handled as per regulatory directions'],
          ['Reporting', 'Reports to exchange / clearing corporation as applicable'],
          ['No Misuse', 'Client funds cannot be used for broker’s expenses or other client funding']
        ]} />
      </Section>

      <Section id="margin-framework" title="Margin Framework and Risk Controls">
        <DataTable headers={['Margin Type', 'Purpose']} rows={[
          ['Initial Margin', 'Entry-level risk cover'],
          ['Exposure Margin', 'Volatility and additional risk cover'],
          ['Mark-to-Market Margin', 'Daily price movement adjustment'],
          ['Peak Margin', 'Intraday exposure capture'],
          ['Client-Level Margin', 'Client-wise risk management'],
          ['Segment-Wise Margin', 'Equity / derivatives / currency / commodity segment requirements']
        ]} />
        <CardGrid columns="md:grid-cols-2" cards={['Upfront margin collection', 'Real-time margin monitoring', 'Exposure limits', 'Automated risk alerts', 'Margin shortfall reporting', 'Square-off policy', 'Client communication policy', 'Daily reconciliation', 'Board-approved margin policy'].map((title) => ({ title, body: 'Risk controls should be documented, system-backed and reviewed regularly.' }))} />
        <div className="warning-box">Repeated margin violations may attract penalties, enhanced supervision or trading restrictions.</div>
      </Section>

      <Section id="margin-funding" title="Margin Funding Facility under Stock Broker Registration in India">
        <p>Margin funding may be offered only by eligible brokers subject to SEBI and exchange conditions. It should not be treated as an unrestricted lending activity.</p>
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Board-Approved Policy', 'Mandatory policy covering exposure limits and risk controls'],
          ['Client Consent', 'Explicit consent and margin funding agreement required'],
          ['Eligible Securities', 'Only permitted securities may be funded'],
          ['Funding Limit', 'Subject to regulatory and internal limits'],
          ['Separate Accounting', 'Margin funding records must be segregated'],
          ['No Client Fund Misuse', 'Other client funds cannot be used for margin funding'],
          ['Reporting', 'Periodic reporting to exchanges as required'],
          ['Audit Review', 'Internal and regulatory audits may examine margin funding']
        ]} />
        <p>Margin funding should be structured carefully because it creates credit, collateral, liquidity and compliance risk.</p>
      </Section>

      <Section id="proprietary-trading" title="Proprietary Trading Restrictions">
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Separate Proprietary Account', 'Broker trades must be separately identifiable'],
          ['Client Fund Protection', 'Client funds cannot be used for proprietary trades'],
          ['Disclosure', 'Proprietary trading must be disclosed as required'],
          ['Margin Segregation', 'Proprietary margins must be separately maintained'],
          ['Conflict Control', 'Broker must avoid conflict with client orders'],
          ['Audit Trail', 'Proprietary trades must be traceable']
        ]} />
        <div className="warning-box">Proprietary trading without strong segregation can trigger serious inspection findings.</div>
      </Section>

      <Section id="algo-trading" title="Algorithmic Trading and API Trading Approval">
        <p>Algorithmic trading, automated strategies and API-based execution require exchange approval and risk validation before deployment.</p>
        <Flow items={['Algo Strategy Submission', 'Exchange Testing', 'Risk Parameter Validation', 'Approval', 'Live Deployment', 'Ongoing Monitoring and Audit Logs']} />
        <CardGrid columns="md:grid-cols-2" cards={['Exchange approval before deployment', 'Order frequency controls', 'Price and quantity limits', 'Kill switch mechanism', 'Audit logs', 'Strategy change control', 'System audit', 'Client consent / disclosure where applicable', 'No unauthorised API deployment'].map((title) => ({ title, body: 'Algo governance should be documented before offering automated execution features.' }))} />
        <p>Technology-led brokers must build algo governance and API control framework before offering automated execution features.</p>
      </Section>

      <Section id="authorised-person" title="Authorised Person Network and Branch Expansion">
        <DataTable headers={['Area', 'Compliance Requirement']} rows={[
          ['Appointment', 'Authorised persons require exchange approval'],
          ['Due Diligence', 'Background verification required'],
          ['Supervision', 'Broker remains responsible'],
          ['Revenue Sharing', 'Must comply with exchange and SEBI norms'],
          ['Client Communication', 'Transparent and compliant'],
          ['Training', 'Periodic training recommended'],
          ['Termination', 'Must follow exchange process'],
          ['Branch / Franchise', 'Must not operate outside approved framework']
        ]} />
        <p>Authorised person network can support business expansion, but weak supervision creates high regulatory risk.</p>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for Stock Brokers">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Net Worth Maintenance', 'Maintain prescribed net worth continuously'],
          ['Client Fund Segregation', 'Mandatory at all times'],
          ['Internal Audit', 'Periodic / half-yearly as applicable'],
          ['System Audit', 'Annual or as directed'],
          ['Cyber Security Audit', 'As prescribed'],
          ['Margin Reporting', 'Daily / periodic as applicable'],
          ['Investor Grievance Reporting', 'Monthly / as prescribed'],
          ['Financial Statements', 'Annual submission'],
          ['KYC / AML', 'PMLA, KYC and transaction monitoring compliance'],
          ['Contract Notes', 'Issue timely contract notes'],
          ['Books and Records', 'Maintain prescribed records and audit trail'],
          ['SCORES / Exchange Complaints', 'Resolve within prescribed timelines'],
          ['Regulatory Reporting', 'Submit exchange and SEBI reports on time']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="Stock Broker Registration in India - Compliance Calendar">
        <h3>Daily Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement', 'Responsible Person']} rows={[
          ['Margin Monitoring', 'Check upfront, peak and MTM margin', 'Risk Team'],
          ['Client Fund Reconciliation', 'Reconcile client bank and ledger', 'Finance / Operations'],
          ['Trade Surveillance', 'Monitor order and trade activity', 'Surveillance Team'],
          ['Contract Notes', 'Issue contract notes within prescribed timeline', 'Operations'],
          ['Collateral Monitoring', 'Track securities and collateral obligations', 'Risk / Back Office']
        ]} />
        <h3>Monthly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Investor Grievance Report', 'Complaint tracking and exchange / SCORES reporting', 'Compliance Officer'],
          ['Client Fund Statement Review', 'Check segregation and balances', 'CFO / Compliance'],
          ['KYC Sample Review', 'Verify onboarding quality', 'Compliance / KYC Team'],
          ['System Log Review', 'Monitor access and cyber issues', 'IT Head']
        ]} />
        <h3>Quarterly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Net Worth Review', 'Monitor capital adequacy', 'CFO'],
          ['Board Compliance Review', 'Governance oversight', 'Board / Compliance Officer'],
          ['Risk Policy Review', 'Margin and exposure adequacy', 'Risk Head'],
          ['Authorised Person Review', 'Supervision and compliance check', 'Business / Compliance']
        ]} />
        <h3>Half-Yearly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['Internal Audit', 'Mandatory periodic review'],
          ['Inspection Readiness Review', 'Check books, records and client fund segregation'],
          ['Compliance Certificate', 'As prescribed by exchange / SEBI'],
          ['Client Funds and Securities Audit', 'Verify segregation and reconciliation']
        ]} />
        <h3>Annual Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['System Audit', 'Annual or as directed'],
          ['Cyber Security Review', 'As prescribed'],
          ['Financial Statements', 'Audited financial statements'],
          ['Net Worth Certificate', 'CA-certified net worth'],
          ['Business Continuity Test', 'DR / BCP testing'],
          ['Policy Review', 'Risk, margin, cyber, client fund and grievance policies']
        ]} />
        <h3>Event-Based Compliance</h3>
        <DataTable headers={['Trigger Event', 'Compliance Action']} rows={[
          ['Change in directors / control', 'Prior approval / intimation as applicable'],
          ['Addition of new segment', 'Exchange approval required'],
          ['Algo deployment', 'Exchange approval and testing required'],
          ['Cyber incident', 'Report and remediate as per framework'],
          ['Net worth shortfall', 'Immediate corrective action'],
          ['Office shift', 'Exchange / SEBI intimation'],
          ['Authorised person appointment / termination', 'Exchange approval / reporting'],
          ['Voluntary surrender', 'Formal surrender process required']
        ]} />
      </Section>

      <Section id="grievance-redressal" title="Investor Protection and Grievance Redressal">
        <Flow items={['Client Complaint', 'Internal Resolution', 'Exchange Grievance Cell', 'Arbitration / Appellate Arbitration', 'Regulatory Escalation, if applicable']} />
        <CardGrid columns="md:grid-cols-2" cards={['Complaint register', 'Timely acknowledgement', 'Root cause analysis', 'Resolution tracking', 'SCORES / exchange portal compliance', 'Arbitration participation', 'Investor Protection Fund contribution', 'Board review of complaints'].map((title) => ({ title, body: 'Investor grievance controls should be documented and monitored by compliance leadership.' }))} />
      </Section>

      <Section id="cyber-system-audit" title="Cyber Security and System Audit for Stock Brokers">
        <DataTable headers={['Cyber / System Area', 'Requirement']} rows={[
          ['Secure Trading Architecture', 'Protected trading environment'],
          ['Multi-Factor Authentication', 'Strong user access control'],
          ['Data Encryption', 'Customer and transaction data protection'],
          ['Disaster Recovery', 'DR site and business continuity'],
          ['Audit Logs', 'Complete logs for orders, access and actions'],
          ['VAPT', 'Vulnerability assessment as prescribed'],
          ['Incident Response', 'Cyber incident reporting and response process'],
          ['System Audit', 'Periodic audit by qualified professionals'],
          ['API Security', 'Controls for API and algo trading'],
          ['Data Retention', 'Preservation of logs and communication records']
        ]} />
        <p>Modern stock broking is technology-intensive. Cyber security is now a core regulatory and operational requirement.</p>
      </Section>

      <Section id="inspection-powers" title="SEBI and Exchange Inspection Powers">
        <p>SEBI and exchanges may inspect books, records, systems, order logs, client fund segregation, margin reports, complaint handling, KYC files, cyber controls and authorised person supervision.</p>
        <DataTable headers={['Inspection Area', 'Documents / Controls to Keep Ready']} rows={[
          ['Registration Certificate', 'SEBI certificate and exchange membership records'],
          ['Net Worth Certificate', 'CA-certified net worth and supporting records'],
          ['Client Bank Accounts', 'Segregated account statements'],
          ['Client Securities Records', 'Demat and collateral records'],
          ['Margin Reports', 'Daily and peak margin records'],
          ['Order Logs', 'Trading logs and audit trail'],
          ['Contract Notes', 'Client-wise contract note records'],
          ['KYC Records', 'Client onboarding and AML documents'],
          ['Internal Audit Reports', 'Audit findings and closure evidence'],
          ['System Audit Reports', 'Technology audit and compliance closure'],
          ['Cyber Incident Records', 'Incident logs and remediation'],
          ['Grievance Register', 'Complaint records and resolution proof'],
          ['Authorised Person Records', 'Appointment, supervision and training files']
        ]} />
      </Section>

      <Section id="penalties" title="Suspension, Cancellation and Penalties">
        <DataTable headers={['Trigger', 'Possible Consequence']} rows={[
          ['Misuse of client funds', 'Severe penalty, suspension or cancellation'],
          ['Client securities misuse', 'Serious regulatory action'],
          ['Net worth erosion', 'Corrective action or suspension'],
          ['Repeated margin violations', 'Penalty / enhanced supervision'],
          ['False reporting', 'Enforcement action'],
          ['Failure to maintain records', 'Inspection adverse finding'],
          ['Cyber security failure', 'Directions, penalty or restrictions'],
          ['Unauthorised algo deployment', 'Trading restriction'],
          ['Non-payment of fees', 'Suspension / registration risk'],
          ['Non-cooperation during inspection', 'Serious regulatory action'],
          ['High investor complaints', 'Supervisory review'],
          ['Operating after suspension', 'Prohibited and actionable']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in Stock Broker Registration in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Applying without exchange readiness', 'Application delay'],
          ['Underestimating capital and deposits', 'Funding stress'],
          ['Weak net worth certificate', 'Regulatory query'],
          ['Poor business plan', 'Exchange / SEBI concern'],
          ['Incomplete infrastructure', 'Inspection failure'],
          ['No compliance officer readiness', 'Application deficiency'],
          ['No cyber security plan', 'Technology risk'],
          ['Weak margin policy', 'Post-registration violation'],
          ['No client fund segregation policy', 'Serious compliance risk'],
          ['Confusing stock broker with RA / IA / PMS', 'Wrong regulatory route'],
          ['Offering algo without approval', 'Exchange action'],
          ['Offering margin funding without policy', 'Compliance breach']
        ]} />
      </Section>

      <Section id="strategic-recommendations" title="Strategic Structuring Recommendations Before Applying">
        <Flow items={['Decide full-service, discount, institutional or hybrid broking model', 'Select exchange and segment carefully', 'Prepare capital and deposit budget beyond minimum requirement', 'Decide PCM or self-clearing structure', 'Appoint compliance officer early', 'Build trading and risk system before inspection', 'Prepare client fund segregation policy', 'Prepare margin and square-off policy', 'Prepare cyber security and BCP framework', 'Prepare authorised person policy if network model is planned', 'Avoid investment advisory or research activities without separate SEBI review', 'Prepare for internal audit and system audit from day one']} />
        <blockquote className="rounded-2xl border-l-4 border-[#0096D6] bg-blue-50 p-6 text-[#0a1628] font-semibold">In stock broking, trust is not created by technology alone. It is created when capital, compliance, systems and client protection move together.<br /><span className="block mt-3 text-sm font-normal text-gray-600">- CS Devyani Khambhati, Compliance Expert</span></blockquote>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with Stock Broker Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Business Model Assessment', body: 'We help evaluate whether the proposed model should be full-service broker, discount broker, institutional broker, online trading platform or hybrid brokerage.' },
          { title: 'Exchange and Segment Planning', body: 'We assist in planning NSE / BSE membership, equity, derivatives, currency, debt or commodity segment strategy, subject to applicable norms.' },
          { title: 'Capital and Net Worth Readiness', body: 'We assist with net worth certificate, source of funds, base capital, deposit planning and consolidated regulatory cost assessment.' },
          { title: 'Trading and Clearing Structure', body: 'We help evaluate Trading Member, Self-Clearing Member and Professional Clearing Member models.' },
          { title: 'Documentation and Application Support', body: 'We assist with exchange membership documents, SEBI registration documents, board resolutions, declarations and business plan.' },
          { title: 'Infrastructure and Inspection Readiness', body: 'We help prepare infrastructure note, trading system readiness, risk management framework, cyber security documentation and inspection checklist.' },
          { title: 'Policy Documentation', body: 'We help draft margin policy, client fund segregation policy, risk management policy, authorised person policy, cyber security policy, BCP and grievance SOP.' },
          { title: 'SEBI and Exchange Query Support', body: 'We support structured responses to exchange and SEBI clarifications.' },
          { title: 'Post-Registration Compliance', body: 'We support compliance calendar, internal audit coordination, system audit readiness, margin reporting framework, grievance reporting and regulatory updates.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Stock Broker Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Expertise', body: 'Our team works across SEBI licensing and compliance matters and understands capital market intermediary scrutiny.' },
          { title: 'Exchange Compliance Understanding', body: 'We understand that stock broker approval is not only SEBI filing; exchange membership, system readiness and clearing arrangement are equally important.' },
          { title: 'Compliance-First Documentation', body: 'We focus on capital, net worth, infrastructure, margin policy, client fund segregation, cyber security and inspection readiness.' },
          { title: 'Technology + Compliance Approach', body: 'We help align trading platform readiness, audit trails, DR / BCP, cyber security and system audit expectations with regulatory documentation.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From business model assessment to exchange membership, SEBI registration, query response and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on Stock Broker Registration in India">
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-[#0a1628]">{faq.q}</summary>
              <p className="mt-3 text-sm leading-7 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h3>Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: SEBI, RBI, IRDAI, IFSCA, Stock Broker registration, exchange membership, capital market intermediary licensing, stock broker compliance, client fund segregation, margin framework and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help serious market entrants, discount brokerage founders, full-service brokerage groups, fintech trading platforms, authorised person networks and capital market businesses understand the broad SEBI and exchange framework for Stock Broker Registration in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, technology, investment or financial advice. SEBI requirements, exchange membership conditions, fee structures, capital thresholds, net worth norms, margin rules, cyber security obligations, audit timelines and approval processes may change from time to time. Applicants should verify the latest SEBI regulations, exchange bye-laws, clearing corporation requirements and circulars before filing any Stock Broker application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>Build your Stock Broker Registration in India application with structured regulatory support, exchange membership planning, capital and net worth readiness, trading and clearing structure, infrastructure inspection preparation, margin policy, client fund segregation framework, cyber security documentation, SEBI query response and post-registration compliance assistance.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 text-center">Apply for Stock Broker Registration</Link>
          <Link href="/contact" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Plan Exchange Membership</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
