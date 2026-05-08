'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'PSP License – IFSCA: Quick Overview' },
  { id: 'what-is-psp', title: 'What is PSP License – IFSCA?' },
  { id: 'psp-vs-pso', title: 'PSP vs PSO' },
  { id: 'legal-framework', title: 'Legal and Regulatory Framework' },
  { id: 'payment-services', title: 'Payment Services Requiring PSP Authorisation' },
  { id: 'who-needs', title: 'Who Needs PSP License – IFSCA?' },
  { id: 'exempted-entities', title: 'Exempted Entities' },
  { id: 'legal-form', title: 'Legal Form and IFSC Presence' },
  { id: 'capital-requirements', title: 'Capital and Net Worth Requirements' },
  { id: 'significant-psp', title: 'Significant PSP Thresholds' },
  { id: 'net-worth', title: 'Net Worth Components' },
  { id: 'authorisation-process', title: 'Authorisation Process' },
  { id: 'safeguarding', title: 'Safeguarding and Escrow Framework' },
  { id: 'governance-risk', title: 'Governance and Risk Management' },
  { id: 'aml-kyc', title: 'AML, KYC and Record Retention' },
  { id: 'grievance', title: 'Grievance Redressal and Dispute Resolution' },
  { id: 'third-party-risk', title: 'Third-Party Risk Management' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'fees-timeline', title: 'Fees, Security Deposit and Timeline' },
  { id: 'compliance-calendar', title: 'Ongoing Compliance Calendar' },
  { id: 'operational-restrictions', title: 'Operational Restrictions' },
  { id: 'pa-comparison', title: 'PSP License – IFSCA vs RBI Payment Aggregator' },
  { id: 'revocation-surrender', title: 'Revocation and Surrender' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'strategic-advice', title: 'Strategic Structuring Advice' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IFSCA Compliance Expert' }
];

const faqs = [
  ['What is PSP License – IFSCA?', 'PSP License – IFSCA is the authorisation granted by the International Financial Services Centres Authority to a company incorporated in IFSC for providing specified payment services under the IFSCA Payment Services Regulations, 2024.'],
  ['Is PSP License – IFSCA mandatory to provide payment services in GIFT City?', 'Yes. Any person intending to provide payment services in or from IFSC must obtain authorisation, unless specifically exempted under the regulations.'],
  ['What payment services are covered under PSP License – IFSCA?', 'Covered services include account issuance, e-money issuance, escrow services, cross-border money transfer services and merchant acquisition services.'],
  ['What is the difference between PSP and PSO?', 'PSP offers front-end payment services such as wallets, remittance or merchant services, while PSO operates payment systems such as clearing and settlement infrastructure under a separate framework.'],
  ['Is PSP authorisation perpetual?', 'The authorisation remains valid unless revoked by IFSCA or surrendered by the PSP.'],
  ['Can PSP operate outside IFSC?', 'PSP must have its place of business and registered office in IFSC. Activity outside IFSC requires prior approval of IFSCA.'],
  ['Is PSP License – IFSCA similar to RBI Payment Aggregator licence?', 'No. PSP License – IFSCA applies to IFSC jurisdiction and operates under a separate foreign currency-based regulatory framework.'],
  ['Can a foreign company apply for PSP License – IFSCA?', 'Yes. A foreign parent company may set up a subsidiary in IFSC for obtaining authorisation.'],
  ['Can PSP wallet hold INR?', 'No. E-wallets issued by PSP cannot hold Indian Rupees.'],
  ['Can PSP store cryptocurrency in e-wallets?', 'No. E-wallets cannot store virtual digital assets such as cryptocurrencies.'],
  ['Can an LLP apply for PSP License – IFSCA?', 'No. Only a company incorporated under the Companies Act with registered office in IFSC is eligible.'],
  ['Is a physical office required in IFSC?', 'Yes. PSP must maintain a place of business and registered office in IFSC.'],
  ['Is AML compliance required from day one?', 'Yes. PSPs are treated as regulated entities and must comply with AML, CFT and KYC guidelines.'],
  ['What is minimum capital for Regular PSP?', 'A Regular PSP must maintain USD 100,000 at commencement of operations and USD 200,000 by the end of the third financial year.'],
  ['What is capital requirement for Significant PSP?', 'A Significant PSP must maintain USD 250,000 within 90 days of designation and USD 500,000 by the third financial year.'],
  ['How is net worth calculated?', 'Net worth includes paid-up equity, compulsorily convertible preference shares, free reserves and share premium, while excluding revaluation reserves and other non-qualifying items.'],
  ['Can borrowed funds be counted as capital?', 'No. Borrowed funds are not considered regulatory net worth.'],
  ['Is nodal bank confirmation required?', 'Yes. PSP must identify an IBU or IBC as nodal bank, wherever applicable.'],
  ['Is escrow mandatory for PSP License – IFSCA?', 'Yes, safeguarding and escrow arrangements are mandatory for specified payment services under the applicable framework.'],
  ['When must funds be deposited in escrow?', 'Funds must generally be deposited by the next business day after receipt, where applicable.'],
  ['Can PSP use escrow funds for working capital?', 'No. Escrow or safeguarded customer funds cannot be used for working capital or business expenses.'],
  ['Can wallet balances earn interest?', 'No. Interest cannot be paid on wallet balances.'],
  ['Can wallet balance be withdrawn in cash?', 'No. Cash withdrawal from e-wallet is prohibited.'],
  ['Can PSP lend money?', 'No. PSP cannot lend money or extend credit to wallet users.'],
  ['Can PSP appoint agents?', 'Yes. Agents may be appointed, but the PSP remains responsible for compliance.'],
  ['How long must transaction records be preserved?', 'Transaction data and logs must be preserved for at least 10 years.'],
  ['Is grievance redressal compulsory?', 'Yes. Complaints must be addressed within 30 days and proper grievance channels must be maintained.'],
  ['Is security deposit compulsory?', 'Security deposit is discretionary and may be required by IFSCA based on business model, risk exposure and transaction volume.'],
  ['How long does PSP authorisation take?', 'IFSCA endeavours to process applications within around six months, subject to completeness, scrutiny and regulatory satisfaction.'],
  ['Must operations start within six months?', 'Yes. Operations must commence within six months from Certificate of Authorisation. One-time extension up to three months may be possible.'],
  ['Can PSP authorisation be revoked?', 'Yes. IFSCA may revoke authorisation for non-compliance, customer interest risk, AML violation, governance failure or misleading disclosures.'],
  ['Can PSP voluntarily surrender its licence?', 'Yes. Surrender requires regulatory approval and supporting documents such as board resolution, CA certificate, no-liability confirmation and public notice if operational.'],
  ['Can PSP combine escrow and e-money issuance?', 'Yes, provided safeguarding requirements for each service are met separately.'],
  ['Can PSP provide payment gateway only?', 'Pure technical payment gateway services without possession or control of funds are excluded from payment services definition.'],
  ['How can Estabizz help with PSP License – IFSCA?', 'Estabizz assists with payment service scope assessment, PSP vs PSO classification, IFSC company structuring, capital planning, safeguarding framework, business plan, policy documentation, IFSCA application, query support and post-authorisation compliance.']
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

export default function PspLicenseIfscaPage() {
  return (
    <ServicePageLayout
      tags={[
        { emoji: '🌐', label: 'IFSCA Regulatory Advisory' },
        { emoji: '💳', label: 'Payment Service Provider Authorisation' },
        { emoji: '💼', label: 'E-Money / Escrow / Remittance Structuring' },
        { emoji: '🏦', label: 'USD 100,000 / USD 200,000 Capital Guidance' },
        { emoji: '🛡️', label: 'Safeguarding & Escrow Framework' },
        { emoji: '✅', label: 'AML / KYC Compliance Support' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IFSCA Services', href: '/ifsca' },
        { label: 'PSP License – IFSCA' }
      ]}
      title="PSP License – IFSCA: Complete Payment Service Provider Authorisation Guide for GIFT IFSC"
      heroDescription={
        <p className="m-0"><strong>PSP License – IFSCA</strong> is the regulatory authorisation granted by the International Financial Services Centres Authority to a company intending to provide specified payment services in or from an IFSC such as GIFT City. Under the IFSCA Payment Services Regulations, 2024, entities offering account issuance, e-money issuance, escrow services, cross-border money transfer or merchant acquisition services must obtain proper authorisation and maintain strict compliance with capital, safeguarding, AML, governance and customer protection obligations.</p>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm text-center">Apply for PSP License – IFSCA</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-center">Check PSP Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm text-center">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="28 min read"
      displayYear="2026"
      focusKeyword="PSP License – IFSCA"
      sections={sections}
      ctaTitle="Apply for PSP License – IFSCA"
      ctaDescription="Get structured support for PSP vs PSO classification, IFSC company setup, capital readiness, safeguarding design, AML/KYC documentation and IFSCA filing."
      quickFacts={[
        { label: 'Regulator', value: 'IFSCA' },
        { label: 'Location', value: 'GIFT IFSC' },
        { label: 'Regulation', value: 'Payment Services 2024' },
        { label: 'Legal Form', value: 'Company' },
        { label: 'Regular PSP', value: 'USD 100k / 200k' },
        { label: 'Significant PSP', value: 'USD 250k / 500k' },
        { label: 'Wallet INR', value: 'Not permitted' },
        { label: 'Lending', value: 'Not permitted' }
      ]}
      relatedArticles={[
        { title: 'IFSCA ITFS Registration', href: '/ifsca/itfs-registration-in-gift-ifsc', category: 'IFSCA', description: 'International Trade Finance Services Platform setup in GIFT IFSC.' },
        { title: 'IFSCA FinTech and Startup Incentives', href: '/ifsca/ifsca-fintech-startup-incentives', category: 'IFSCA', description: 'FinTech Entity Authorization, sandbox and startup grants.' },
        { title: 'Finance Company in GIFT IFSC', href: '/ifsca/finance-company-in-gift-ifsc', category: 'IFSCA', description: 'Finance Company and Finance Unit registration in GIFT IFSC.' },
        { title: 'Payment Aggregator License in India', href: '/rbi/payment-aggregator-license-in-india', category: 'RBI', description: 'RBI payment aggregator authorisation guide.' },
        { title: 'PPI Registration in India', href: '/rbi/ppi-registration-in-india', category: 'RBI', description: 'RBI prepaid payment instrument authorisation guide.' }
      ]}
      finalCtaTitle="Start Your PSP License – IFSCA Journey with Estabizz"
      finalCtaDescription="Build your Payment Service Provider authorisation application in GIFT IFSC with structured regulatory support, payment service scope assessment, IFSC company setup, capital readiness review, safeguarding and escrow framework, AML/KYC documentation, business plan and post-authorisation compliance assistance."
      finalCtaActions={
        <>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0096D6] to-[#0077B6] hover:from-[#0077B6] hover:to-[#025b8a] text-white font-bold rounded-xl shadow-lg transition-all text-center">Speak to IFSCA Compliance Expert</Link>
          <Link href="/get-started" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0077B6] font-bold rounded-xl hover:bg-blue-50 transition-all text-center">Apply for PSP License – IFSCA</Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20 text-center">Check PSP Eligibility</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl shadow-lg transition-all text-center">WhatsApp Estabizz Team</a>
        </>
      }
    >
      <Section id="quick-overview" title="PSP License – IFSCA: Quick Overview">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Regulator', body: 'International Financial Services Centres Authority' },
          { title: 'Location', body: 'GIFT IFSC, Gujarat, India' },
          { title: 'Applicable Regulation', body: 'IFSCA Payment Services Regulations, 2024' },
          { title: 'Related Framework', body: 'IFSCA Payment and Settlement Systems Regulations, 2024' },
          { title: 'Eligible Legal Form', body: 'Company incorporated with registered office in IFSC' },
          { title: 'Regular PSP Net Worth', body: 'USD 100,000 at commencement and USD 200,000 by third financial year' },
          { title: 'Significant PSP Net Worth', body: 'USD 250,000 within 90 days of designation and USD 500,000 by third financial year' },
          { title: 'Permitted Services', body: 'Account issuance, e-money issuance, escrow, cross-border money transfer and merchant acquisition' },
          { title: 'E-Wallet Currency', body: 'Specified foreign currency only; INR not permitted' },
          { title: 'Crypto / VDA', body: 'Not permitted in e-wallets' },
          { title: 'Cash Withdrawal', body: 'Not permitted from e-wallet' },
          { title: 'Commencement', body: 'Within 6 months from Certificate of Authorisation; extension up to 3 months may be possible' }
        ]} />
        <div className="info-box">The above details are indicative and must be evaluated based on the applicant&apos;s payment service model, IFSC structure, safeguarding mechanism, capital plan, AML framework, nodal bank arrangement, technology architecture and latest IFSCA directions at the time of filing.</div>
      </Section>

      <Section id="what-is-psp" title="What is PSP License – IFSCA?">
        <p>PSP License – IFSCA is the authorisation granted by IFSCA to a company incorporated in IFSC for providing specified payment services under the IFSCA Payment Services Regulations, 2024. It applies to payment service businesses operating in or from IFSC and covers front-end payment service activities such as wallet / e-money services, escrow services, cross-border money transfer and merchant acquisition.</p>
        <p>The authorisation remains valid unless revoked by IFSCA or surrendered by the PSP in accordance with the applicable regulations.</p>
        <div className="warning-box">A pure Payment Gateway providing only technical support without possession or control of funds is excluded from the payment services definition. However, where the business handles payment funds, e-money, escrow, remittance or merchant acquisition, PSP authorisation must be carefully evaluated.</div>
      </Section>

      <Section id="psp-vs-pso" title="PSP vs Payment System Operator under IFSCA Framework">
        <DataTable headers={['Particular', 'PSP', 'PSO']} rows={[
          ['Full Form', 'Payment Service Provider', 'Payment System Operator'],
          ['Nature', 'Front-end payment service provider', 'Back-end payment system / clearing / settlement infrastructure operator'],
          ['Typical Activity', 'Wallet, e-money, escrow, cross-border transfer, merchant acquisition', 'Operating payment system infrastructure'],
          ['Applicable Framework', 'IFSCA Payment Services Regulations, 2024', 'IFSCA Payment and Settlement Systems Regulations, 2024'],
          ['Customer Interaction', 'Direct or front-end service role', 'System / infrastructure role'],
          ['Regulatory Treatment', 'PSP authorisation', 'PSO authorisation / approval as applicable']
        ]} />
        <p>IFSCA has clearly separated front-end payment services and back-end payment system operations. The business model should be mapped correctly before filing.</p>
      </Section>

      <Section id="legal-framework" title="Legal Background of PSP License – IFSCA">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'International Financial Services Centres Authority'],
          ['Primary Regulation', 'IFSCA Payment Services Regulations, 2024'],
          ['Related Regulation', 'IFSCA Payment and Settlement Systems Regulations, 2024'],
          ['AML / KYC Framework', 'IFSCA AML, CFT and KYC Guidelines, 2022'],
          ['FEMA Applicability', 'Applicable where Indian promoter, cross-border flows or foreign currency transactions are involved'],
          ['Authorisation Type', 'Payment Service Provider Authorisation'],
          ['Core Regulatory Focus', 'Customer fund safeguarding, AML compliance, cross-border payment discipline, governance, risk management and consumer protection']
        ]} />
        <p>The regulatory objective is to ensure financial stability, customer fund protection, cross-border compliance and robust risk governance for payment services conducted in or from IFSC.</p>
      </Section>

      <Section id="payment-services" title="Payment Services Requiring PSP License – IFSCA">
        <DataTable headers={['Sl. No.', 'Payment Service Activity', 'Meaning / Practical Scope']} rows={[
          ['1', 'Account Issuance Service', 'Issuance of payment accounts, including e-money accounts'],
          ['2', 'E-Money Issuance Service', 'Issuance of stored value / e-money instruments in permitted foreign currency'],
          ['3', 'Escrow Service', 'Holding or managing funds in permitted escrow arrangement for payment service users'],
          ['4', 'Cross-Border Money Transfer Service', 'Facilitating permitted cross-border money transfer in or from IFSC'],
          ['5', 'Merchant Acquisition Service', 'Acquiring or onboarding merchants for payment acceptance services']
        ]} />
        <ul className="clean-list">
          <li>Payment Gateway technical support only is excluded.</li>
          <li>Banks / IBUs / IBCs are exempt where specified.</li>
          <li>Cryptocurrency or virtual digital asset storage is not permitted.</li>
          <li>E-wallet cannot hold INR.</li>
          <li>PSP cannot lend money or extend credit.</li>
        </ul>
      </Section>

      <Section id="who-needs" title="Who Needs PSP License – IFSCA?">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: 'Cross-Border Remittance Operators', body: 'Entities providing cross-border money transfer services in or from IFSC.' },
          { title: 'E-Money / Wallet Providers', body: 'Companies issuing foreign currency e-wallets or e-money accounts from IFSC.' },
          { title: 'Escrow Service Providers', body: 'Entities providing escrow services for permitted payment use cases.' },
          { title: 'Merchant Acquisition Businesses', body: 'Platforms acquiring merchants for payment acceptance services.' },
          { title: 'Foreign Payment Companies', body: 'Foreign parent companies setting up IFSC subsidiaries for payment service authorisation.' },
          { title: 'IFSC FinTech Payment Platforms', body: 'Fintech businesses building regulated payment products from GIFT IFSC.' }
        ]} />
      </Section>

      <Section id="exempted-entities" title="Entities Exempted from PSP License – IFSCA">
        <DataTable headers={['Exempt Category', 'Regulatory Position']} rows={[
          ['IFSC Banking Units', 'Exempt from separate PSP authorisation where applicable'],
          ['IFSC Banking Companies', 'Exempt where specified'],
          ['Credit Card Issuers licensed in IFSC', 'Exempt where specified'],
          ['Others specified by IFSCA', 'Exemption depends on regulatory direction']
        ]} />
        <p>Exemption should not be assumed merely because the business is payment-related. The specific entity type and service scope must be reviewed.</p>
      </Section>

      <Section id="legal-form" title="Legal Form Requirement for PSP License – IFSCA">
        <DataTable headers={['Requirement', 'Position']} rows={[
          ['Legal Form', 'Company only'],
          ['Registered Office', 'Must be in IFSC'],
          ['Place of Business', 'Physical place of business in IFSC required'],
          ['LLP', 'Not eligible'],
          ['Foreign Parent', 'May set up IFSC subsidiary'],
          ['Application Before Incorporation', 'Parent may initiate process, but company must be incorporated in IFSC before final authorisation'],
          ['Outside IFSC Activity', 'Requires prior approval of IFSCA']
        ]} />
        <p>PSP authorisation is not suitable for LLP, partnership firm or individual applicant structures.</p>
      </Section>

      <Section id="capital-requirements" title="Capital Requirement for PSP License – IFSCA">
        <DataTable headers={['Category', 'Stage', 'Net Worth Requirement']} rows={[
          ['Regular PSP', 'At commencement of operations', 'USD 100,000'],
          ['Regular PSP', 'By end of third financial year', 'USD 200,000'],
          ['Significant PSP', 'Within 90 days of designation', 'USD 250,000'],
          ['Significant PSP', 'By end of third financial year', 'USD 500,000']
        ]} />
        <p>Capital may be maintained in equivalent specified foreign currency. Net worth must be continuously monitored and reported.</p>
      </Section>

      <Section id="significant-psp" title="Significant PSP Thresholds under IFSCA PSP Framework">
        <DataTable headers={['Condition', 'Threshold']} rows={[
          ['Single service monthly average transaction value', 'USD 2 million'],
          ['Two or more services monthly average transaction value', 'USD 4 million'],
          ['E-money stored daily average value', 'USD 3 million']
        ]} />
        <p>IFSCA designates an entity as Significant PSP based on prescribed thresholds. The PSP cannot voluntarily self-classify as Significant PSP merely by choice. Once designated, enhanced net worth requirements apply.</p>
      </Section>

      <Section id="net-worth" title="Net Worth Calculation for PSP License – IFSCA">
        <DataTable headers={['Component', 'Treatment']} rows={[
          ['Paid-up Equity', 'Included'],
          ['Compulsorily Convertible Preference Shares', 'Included if compulsorily convertible and withdrawal is restricted'],
          ['Free Reserves', 'Included'],
          ['Share Premium', 'Included'],
          ['Capital Reserves', 'Included except revaluation reserves'],
          ['Revaluation Reserves', 'Excluded'],
          ['Borrowed Funds', 'Not treated as net worth'],
          ['Accumulated Losses', 'Deducted as applicable']
        ]} />
        <div className="info-box"><strong>Net Worth =</strong> Paid-up Equity + Eligible CCPS + Free Reserves + Share Premium + Eligible Capital Reserves - Exclusions / Deductions</div>
        <p>Incorrect capital classification is a common reason for regulatory queries. Borrowed funds should not be treated as regulatory net worth.</p>
      </Section>

      <Section id="authorisation-process" title="Step-by-Step Authorisation Process for PSP License – IFSCA">
        <Timeline steps={[
          { title: 'Pre-Consultation and Business Model Review', body: 'Map the proposed activity against Schedule I payment services and identify whether PSP authorisation is required.' },
          { title: 'Parent / Promoter Eligibility Review', body: 'Review foreign parent structure, Indian promoter FEMA implications, fit and proper position, group history and financial soundness.' },
          { title: 'Application Preparation', body: 'Prepare application, business plan, payment service scope, capital plan, technology architecture, AML framework, safeguarding mechanism and governance documents.' },
          { title: 'Application Submission', body: 'Submit application in prescribed form along with non-refundable application fee and required documents.' },
          { title: 'IFSCA Scrutiny and Clarifications', body: 'IFSCA reviews business model, capital, safeguarding, nodal bank arrangement, AML framework, governance, technology and risk controls.' },
          { title: 'In-Principle Approval', body: 'IFSCA may issue in-principle approval subject to fulfilment of prescribed conditions.' },
          { title: 'IFSC Company Formation', body: 'Incorporate IFSC company or complete required IFSC structuring where not already completed.' },
          { title: 'Capital Infusion and Safeguarding Setup', body: 'Infuse capital, identify nodal bank, execute escrow / safeguarding arrangements and prepare compliance confirmation.' },
          { title: 'Certificate of Authorisation', body: 'Upon satisfaction, IFSCA may grant Certificate of Authorisation.' },
          { title: 'Commencement of Operations', body: 'Commence operations within 6 months from Certificate of Authorisation. One-time extension of up to 3 months may be possible with justification.' }
        ]} />
        <div className="warning-box">In-principle approval does not guarantee final authorisation. Final authorisation is granted only after full compliance with conditions.</div>
      </Section>

      <Section id="safeguarding" title="Safeguarding of Customer Funds under PSP License – IFSCA">
        <p>Safeguarding is one of the most critical pillars of PSP License – IFSCA. A PSP must ensure that customer funds and applicable funds are properly segregated, protected and reconciled in accordance with Schedule VI and related regulatory requirements.</p>
        <DataTable headers={['Safeguarding Mechanism', 'Practical Meaning']} rows={[
          ['Undertaking from Safeguarding Institution', 'Written undertaking from eligible institution for fund protection'],
          ['Bank Guarantee', 'Guarantee-based safeguarding mechanism where applicable'],
          ['Trust Account', 'Customer funds held through trust structure'],
          ['Escrow Account with IBU', 'Escrow with IFSC Banking Unit / permitted institution']
        ]} />
        <DataTable headers={['Restriction', 'Regulatory Position']} rows={[
          ['No Lending', 'Customer funds cannot be lent'],
          ['No Working Capital Use', 'Escrow / safeguarded funds cannot be used for business expenses'],
          ['No Interest on E-Wallet Balance', 'Wallet balances cannot earn interest for holders'],
          ['No Cash Withdrawal', 'Cash withdrawal from wallet is prohibited'],
          ['Escrow Balance Alignment', 'Escrow balance must match outstanding e-money / applicable liability'],
          ['Separate Safeguarding', 'Separate safeguarding may be required per payment service'],
          ['Deposit Timeline', 'Funds to be deposited by next business day after receipt, where applicable']
        ]} />
        <div className="success-box"><strong>Safeguarding lifecycle:</strong> Customer funds received → funds segregated → escrow / safeguarding deposit by next business day → daily reconciliation → merchant settlement / refund / permitted use → escrow balance alignment.</div>
      </Section>

      <Section id="governance-risk" title="Governance and Risk Management Framework">
        <DataTable headers={['Governance Area', 'Requirement']} rows={[
          ['Documented Governance Framework', 'Mandatory'],
          ['Board-approved Risk Policy', 'Required'],
          ['Operational Risk Controls', 'Required for payment service processes'],
          ['Third-party Risk Assessment', 'Required for outsourced or vendor-dependent services'],
          ['Exit Strategy', 'Required for outsourced providers'],
          ['Capital Monitoring', 'Quarterly net worth review and ongoing capital monitoring'],
          ['Safeguarding Oversight', 'Daily reconciliation and fund protection monitoring'],
          ['Technology Risk Controls', 'Cybersecurity, access controls and audit trail'],
          ['Regulatory Inspection Rights', 'Third-party agreements should permit regulatory access']
        ]} />
        <p>A PSP that handles foreign currency payment services must demonstrate institutional-grade governance from the application stage itself.</p>
      </Section>

      <Section id="aml-kyc" title="AML, KYC and Record Retention for PSP License – IFSCA">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['AML / CFT Compliance', 'Mandatory under IFSCA AML, CFT and KYC Guidelines'],
          ['KYC', 'As per IFSCA Guidelines and PMLA-related obligations'],
          ['AML Monitoring', 'Required from day one'],
          ['Transaction Record Retention', 'Minimum 10 years'],
          ['Transaction Logs', 'Retain for at least 10 years'],
          ['Suspicious Activity Monitoring', 'Required'],
          ['Customer / Merchant Due Diligence', 'Required based on service model'],
          ['Regulatory Action Reporting', 'As required by IFSCA']
        ]} />
        <p>Failure to safeguard customer funds and AML non-compliance are primary regulatory risks under PSP License – IFSCA.</p>
      </Section>

      <Section id="grievance" title="Grievance Redressal and Dispute Resolution">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: '30-Day Resolution', body: 'Complaint resolution should be completed within the prescribed timeframe.' },
          { title: 'Online Dispute Resolution', body: 'Online conciliation / arbitration mechanism should be considered where applicable.' },
          { title: 'Dedicated Channels', body: 'Dedicated grievance channels and escalation process are expected.' },
          { title: 'Customer Disclosure', body: 'Mandatory customer disclosure statement and public disclosures should be maintained.' },
          { title: 'Complaint Records', body: 'User complaint records and settlement dispute logs should be preserved.' },
          { title: 'Refund Handling', body: 'Refund and settlement disputes should be handled through documented SOPs.' }
        ]} />
        <p>Grievance redressal is mandatory even for B2B PSP structures where payment service users include merchants or institutional users.</p>
      </Section>

      <Section id="third-party-risk" title="Third-Party Risk Management for PSP License – IFSCA">
        <DataTable headers={['Risk Area', 'Regulatory Expectation']} rows={[
          ['ICT Risk', 'Cyber resilience and service continuity'],
          ['Financial Risk', 'Vendor solvency and financial reliability'],
          ['Data Risk', 'Encryption, access controls and confidentiality'],
          ['Subcontracting', 'Nth-party oversight'],
          ['Business Continuity', 'Exit plan and contingency readiness'],
          ['Inspection Rights', 'Regulatory inspection rights in third-party contracts'],
          ['Vendor Register', 'Third-party relationship register'],
          ['Due Diligence', 'Pre-onboarding and ongoing vendor due diligence']
        ]} />
        <p>Outsourcing is permitted, but the PSP remains fully responsible for regulatory compliance. Vendor agreements should be drafted with audit rights, inspection support, data protection obligations, service levels and exit arrangements.</p>
      </Section>

      <Section id="documents-required" title="Documents Required for PSP License – IFSCA">
        <DataTable headers={['Category', 'Documents / Information']} rows={[
          ['Promoter and Shareholding Documents', 'Certificate of incorporation of parent / applicant, MOA, AOA, shareholding pattern, group structure chart and board resolution approving PSP application'],
          ['Fit and Proper Documents', 'Declarations of no economic offence conviction, insolvency declaration, regulatory action disclosure, financial soundness declaration and wilful defaulter confirmation'],
          ['Business Plan', '3-year revenue projection, transaction volume forecast, break-even analysis, capital deployment strategy, cost structure and risk management matrix'],
          ['Technology Documents', 'IT architecture note, cybersecurity policy, data protection framework, business continuity plan and third-party risk policy'],
          ['Safeguarding / Escrow Documents', 'Nodal bank confirmation, escrow account agreement, safeguarding mechanism, daily reconciliation process and written concurrence from safeguarding institution'],
          ['AML / Compliance Documents', 'AML / CFT policy, KYC framework, transaction monitoring policy, record retention process and suspicious transaction escalation framework'],
          ['Governance Documents', 'Board-approved governance framework, risk policy, outsourcing policy, grievance redressal policy and operational SOPs'],
          ['Application Documents', 'Prescribed application form, non-refundable application fee proof, declarations and IFSCA-prescribed annexures']
        ]} />
      </Section>

      <Section id="fees-timeline" title="Fees, Security Deposit and Timeline for PSP License – IFSCA">
        <h3>Fees and Security Deposit</h3>
        <DataTable headers={['Particular', 'Position']} rows={[
          ['Application Fee', 'Non-refundable application fee as specified by IFSCA'],
          ['Security Deposit', 'Discretionary; may be required under Regulation 10(4)'],
          ['Security Deposit Basis', 'Business model complexity, cross-border exposure, transaction volume and risk profile'],
          ['Use of Security Deposit', 'May be used toward legitimate outstanding customer claims in specific situations'],
          ['Refundability', 'Subject to regulatory conditions']
        ]} />
        <div className="warning-box">Security deposit is not insurance. It is a regulatory safeguard and may be appropriated by IFSCA toward outstanding customer claims where applicable.</div>
        <h3>Timeline</h3>
        <DataTable headers={['Stage', 'Indicative Position']} rows={[
          ['Application Preparation', 'Case-specific based on documentation readiness'],
          ['IFSCA Processing', 'Authority endeavours to process within around 6 months'],
          ['In-Principle Approval', 'Case-dependent'],
          ['Final Authorisation', 'Subject to fulfilment of conditions'],
          ['Commencement', 'Within 6 months from Certificate of Authorisation'],
          ['Extension', 'One-time extension up to 3 months may be possible']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="Ongoing Compliance Calendar for PSP License – IFSCA">
        <DataTable headers={['Frequency', 'Compliance Requirement']} rows={[
          ['Daily', 'Escrow / safeguarding reconciliation'],
          ['Ongoing', 'AML monitoring and customer / merchant due diligence'],
          ['Ongoing', 'Third-party risk monitoring'],
          ['Quarterly', 'Net worth review / quarterly net worth statement'],
          ['Annual', 'Audited financial statements submission within 3 months of finalisation'],
          ['Annual', 'Governance and risk policy review'],
          ['Event-Based', 'Change in ownership / control reporting'],
          ['Event-Based', 'Prior approval for merger, restructuring or acquisition'],
          ['Event-Based', 'Regulatory action disclosure'],
          ['Event-Based', 'Surrender process where business closure is proposed']
        ]} />
      </Section>

      <Section id="operational-restrictions" title="Operational Restrictions under PSP License – IFSCA">
        <DataTable headers={['Restriction', 'Position']} rows={[
          ['Lending', 'Not permitted'],
          ['Credit Extension to Wallet Users', 'Not permitted'],
          ['BNPL Facility', 'Not permitted'],
          ['Public Deposit Acceptance', 'Not permitted'],
          ['Interest on Wallet Balances', 'Not permitted'],
          ['Cash Withdrawal from E-Wallet', 'Not permitted'],
          ['INR Wallet Holding', 'Not permitted'],
          ['Crypto / VDA Storage', 'Not permitted'],
          ['Use of Escrow Funds for Working Capital', 'Not permitted'],
          ['Operating Outside IFSC', 'Prior approval required'],
          ['Services Other Than Payment Services', 'Prior permission required'],
          ['Payment Gateway Technical Support Only', 'Excluded from payment service definition where no fund possession/control exists']
        ]} />
      </Section>

      <Section id="pa-comparison" title="PSP License – IFSCA vs RBI Payment Aggregator License">
        <DataTable headers={['Parameter', 'PSP License – IFSCA', 'RBI Payment Aggregator']} rows={[
          ['Jurisdiction', 'IFSC / GIFT City', 'Domestic India'],
          ['Regulator', 'IFSCA', 'Reserve Bank of India'],
          ['Currency', 'Specified foreign currency', 'INR'],
          ['Wallet INR Holding', 'Not permitted', 'Not the same framework'],
          ['Capital Requirement', 'USD-based', 'INR-based'],
          ['Cross-Border Flexibility', 'Higher within IFSC framework', 'Regulated separately'],
          ['Merchant Acquisition', 'Covered as payment service', 'Core PA activity'],
          ['Escrow / Safeguarding', 'IFSCA safeguarding framework', 'RBI escrow framework'],
          ['Payment Gateway Technical Support', 'Excluded if only technical support', 'Payment gateway distinction under RBI framework']
        ]} />
      </Section>

      <Section id="revocation-surrender" title="Revocation and Surrender of PSP License – IFSCA">
        <DataTable headers={['Trigger / Situation', 'Regulatory Position']} rows={[
          ['Regulatory Non-Compliance', 'IFSCA may revoke authorisation'],
          ['Customer Interest Compromised', 'Revocation or restrictions possible'],
          ['AML Violation', 'Serious regulatory action'],
          ['Governance Failure', 'Corrective or enforcement action'],
          ['Misleading Disclosure', 'Revocation risk'],
          ['Net Worth Erosion', 'Corrective measures or enforcement action'],
          ['Voluntary Surrender', 'Requires regulatory approval'],
          ['Surrender Documents', 'Board resolution, CA certificate, no-liability confirmation and public notice if operational'],
          ['Security Deposit Use', 'May be used toward legitimate customer claims']
        ]} />
        <p>IFSCA generally provides reasonable opportunity of hearing before revocation, subject to applicable regulatory provisions.</p>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in PSP License – IFSCA Applications">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Weak business model', 'In-principle approval delay'],
          ['Inadequate capital planning', 'Net worth non-compliance'],
          ['No nodal bank confirmation', 'Application hold'],
          ['Poor AML framework', 'Rejection or regulatory query'],
          ['Improper escrow design', 'Compliance breach'],
          ['Confusing PSP with PSO', 'Wrong application route'],
          ['Assuming Payment Gateway needs PSP', 'Incorrect regulatory assessment'],
          ['Including INR wallet functionality', 'Regulatory issue'],
          ['Including crypto storage', 'Prohibited activity concern'],
          ['Hybrid lending plus PSP model', 'Regulatory rejection risk'],
          ['No third-party exit plan', 'Outsourcing compliance gap'],
          ['No 10-year record retention plan', 'Compliance deficiency']
        ]} />
      </Section>

      <Section id="strategic-advice" title="Strategic Structuring Advice for PSP Founders">
        <ul className="clean-list">
          <li>Design escrow / safeguarding model early</li>
          <li>Align business model strictly to Schedule I payment services</li>
          <li>Avoid hybrid lending and PSP models</li>
          <li>Prepare stress-tested capital plan</li>
          <li>Document AML and KYC framework in detail</li>
          <li>Identify nodal bank / IBU early</li>
          <li>Prepare technology architecture and cybersecurity documentation</li>
          <li>Create third-party risk and exit strategy</li>
          <li>Plan quarterly and annual compliance from day one</li>
          <li>Avoid any INR wallet or crypto wallet feature</li>
        </ul>
        <div className="expert-quote"><blockquote>Regulation is not merely about permission; it is about building a structure strong enough to protect trust. A PSP that respects governance from day one rarely faces enforcement on day hundred.</blockquote><cite>CS Devyani Khambhati - Compliance Expert</cite></div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with PSP License – IFSCA">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Payment Service Scope Assessment', body: 'We help identify whether the proposed model falls under account issuance, e-money issuance, escrow service, cross-border money transfer or merchant acquisition.' },
          { title: 'PSP vs PSO Classification', body: 'We help distinguish front-end payment services from back-end payment system operation to avoid incorrect application route.' },
          { title: 'IFSC Company Structuring', body: 'We assist with IFSC company setup, registered office planning, promoter structure and FEMA advisory for Indian promoters.' },
          { title: 'Capital Readiness Support', body: 'We help map regular PSP and Significant PSP net worth requirements and prepare capital planning documentation.' },
          { title: 'Safeguarding and Escrow Framework', body: 'We assist with safeguarding mechanism, nodal bank coordination, escrow design, daily reconciliation process and fund protection documentation.' },
          { title: 'Business Plan and Financial Forecast', body: 'We prepare 3-year revenue projections, transaction volume forecast, capital adequacy projection, risk mitigation plan and business model note.' },
          { title: 'Policy Documentation', body: 'We assist with governance framework, AML / CFT policy, KYC policy, risk management policy, outsourcing policy, grievance redressal framework and operational SOPs.' },
          { title: 'Technology and Vendor Risk Documentation', body: 'We help prepare IT architecture note, cybersecurity framework, data protection note, BCP, third-party risk policy and vendor register.' },
          { title: 'IFSCA Application and Query Support', body: 'We assist in application preparation, filing coordination and structured responses to IFSCA clarification queries.' },
          { title: 'Post-Authorisation Compliance', body: 'We support escrow reconciliation framework, quarterly net worth review, audited financial submission, record retention, AML monitoring and event-based reporting.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for PSP License – IFSCA?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'IFSCA Regulatory Expertise', body: 'Our team works across IFSCA licensing and compliance matters and understands GIFT IFSC regulatory expectations.' },
          { title: 'Payment Business Understanding', body: 'We review payment service scope, wallet design, escrow model, remittance structure, merchant acquisition and safeguarding requirements together.' },
          { title: 'Technology + Compliance Approach', body: 'PSP authorisation requires strong compliance and technology readiness. We align business model, IT architecture, AML/KYC, outsourcing and fund safeguarding.' },
          { title: 'Business Plan Strength', body: 'We prepare practical regulator-facing business plans, transaction forecasts, risk matrices and capital sustainability models.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA helps in payment businesses touching multiple regulatory domains.' },
          { title: 'End-to-End Support', body: 'From IFSC structuring to IFSCA application, query support and post-authorisation compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on PSP License – IFSCA">
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
          <p><strong>Expertise:</strong> IFSCA, RBI, SEBI, IRDAI, GIFT City registrations, PSP authorisation, payment services regulations, AML/KYC, safeguarding framework, escrow structuring and post-authorisation compliance.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help payment companies, fintech founders, remittance operators, wallet businesses, merchant aggregators and foreign payment groups understand the broad IFSCA framework for Payment Service Provider authorisation in GIFT IFSC.</p>
        </div>
        <div className="warning-box">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, financial or investment advice. IFSCA requirements, application formats, fee structures, capital thresholds, safeguarding conditions, AML/KYC obligations, technology expectations and approval processes may change from time to time. Applicants should verify the latest regulatory position and obtain professional advice before filing any application with IFSCA.</div>
      </Section>
    </ServicePageLayout>
  );
}
