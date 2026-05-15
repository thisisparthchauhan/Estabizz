'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'RIA Registration in India: Quick Overview' },
  { id: 'what-is-ria', title: 'What is RIA Registration in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'registered-investment-adviser', title: 'What is a Registered Investment Adviser?' },
  { id: 'comparison', title: 'RIA vs Research Analyst vs PMS vs Mutual Fund Distributor' },
  { id: 'who-needs', title: 'Who Needs RIA Registration?' },
  { id: 'exemptions', title: 'Who May Be Exempt?' },
  { id: 'who-cannot', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'qualification-certification', title: 'Qualification and NISM Certification' },
  { id: 'experience-principal-officer', title: 'Experience and Principal Officer Requirement' },
  { id: 'net-worth', title: 'Net Worth Requirement' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'infrastructure', title: 'Infrastructure Requirement' },
  { id: 'business-plan', title: 'Business Plan Requirement' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'government-fees', title: 'Government Fees' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'risk-profiling', title: 'Client Risk Profiling and Suitability' },
  { id: 'advisory-agreement', title: 'Advisory Agreement Requirements' },
  { id: 'fee-model', title: 'Fee Model Framework' },
  { id: 'segregation', title: 'Segregation of Advisory and Distribution' },
  { id: 'conflict-framework', title: 'Conflict Disclosure Framework' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'compliance-calendar', title: 'Compliance Calendar' },
  { id: 'operational-restrictions', title: 'Operational Restrictions' },
  { id: 'inspection-enforcement', title: 'SEBI Inspection and Enforcement' },
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
  ['What is RIA Registration in India?', 'RIA Registration in India is SEBI registration required for individuals or entities that provide investment advice relating to securities or investment products for consideration.'],
  ['Who regulates RIAs in India?', 'RIAs are regulated by the Securities and Exchange Board of India.'],
  ['Which regulations govern RIA Registration?', 'RIAs are governed by the SEBI Investment Advisers Regulations, 2013, as amended from time to time.'],
  ['Is RIA Registration mandatory?', 'Yes. Any person providing investment advice for consideration must obtain SEBI registration unless specifically exempted.'],
  ['What is investment advice?', 'Investment advice includes advice relating to investing in, purchasing, selling or dealing in securities or investment products, when provided for consideration.'],
  ['Can financial planners operate without RIA Registration?', 'If the financial planner gives securities-related advice for a fee, RIA Registration is required.'],
  ['Can mutual fund advisers require RIA Registration?', 'Yes, if they provide fee-based advice rather than merely incidental distribution support.'],
  ['Can a stock broker apply for RIA Registration?', 'Yes, but strict segregation of advisory and distribution / broking activity is required.'],
  ['Can an individual apply for RIA Registration?', 'Yes. Individuals can apply if they meet qualification, certification, net worth and fit and proper requirements.'],
  ['Can a company apply?', 'Yes. Companies can apply as non-individual investment advisers.'],
  ['Can an LLP apply?', 'Yes. LLPs may apply subject to regulatory conditions.'],
  ['Can a partnership firm apply?', 'Yes, subject to eligibility and regulatory conditions.'],
  ['What is the minimum net worth for individual RIA?', 'Individual / proprietor applicants must maintain minimum net worth of Rs. 5 lakh, subject to latest SEBI verification.'],
  ['What is the minimum net worth for non-individual RIA?', 'Non-individual applicants such as companies and LLPs must maintain minimum net worth of Rs. 50 lakh, subject to latest SEBI verification.'],
  ['Is CA net worth certificate required?', 'Yes. A Chartered Accountant-certified net worth certificate is required.'],
  ['Can borrowed funds be counted as net worth?', 'No. Net worth must represent owned funds and not borrowed capital.'],
  ['Is NISM certification mandatory?', 'Yes. Prescribed NISM Investment Adviser certification is mandatory.'],
  ['What qualification is required?', 'Relevant educational or professional qualification in finance, economics, commerce, business management, accountancy, capital markets or related field is required.'],
  ['Is experience mandatory?', 'Experience requirements apply as prescribed, especially for principal officers and key persons.'],
  ['What is Form A?', 'Form A is the prescribed application form for Investment Adviser registration.'],
  ['Can SEBI ask for clarifications?', 'Yes. SEBI may seek clarifications on business model, net worth, compliance framework and segregation.'],
  ['Can SEBI reject the application?', 'Yes. SEBI may reject the application if eligibility or compliance requirements are not met after giving due opportunity.'],
  ['Is business plan required?', 'Yes, especially for non-individual applicants. It should cover advisory model, revenue model, compliance cost and projections.'],
  ['Are compliance policies required?', 'Yes. Applicants must submit compliance framework, risk profiling policy, suitability policy, fee policy and conflict policy.'],
  ['Is advisory agreement mandatory?', 'Yes. A written agreement with the client is compulsory before rendering investment advice.'],
  ['Is risk profiling mandatory?', 'Yes. Client risk profiling must be conducted before giving advice.'],
  ['Is suitability assessment mandatory?', 'Yes. Advice must align with the client’s financial situation, risk profile, investment objective and time horizon.'],
  ['Can RIA manage client funds?', 'No. Managing client funds requires PMS registration where applicable.'],
  ['Can RIA guarantee returns?', 'No. Guaranteeing returns is prohibited.'],
  ['Can individual RIA earn product commission?', 'No. Individual investment adviser cannot receive distribution commission.'],
  ['Can non-individual RIA distribute financial products?', 'Non-individual structures must maintain strict segregation between advisory and distribution activities.'],
  ['What fee models are permitted?', 'RIAs may use permitted fee models such as fixed fee or assets under advice model, subject to SEBI caps and conditions.'],
  ['Can RIA charge advance fees?', 'Advance fee collection is subject to regulatory limits.'],
  ['Is family-based fee cap applicable?', 'Yes. Fee caps apply at the client family level as prescribed.'],
  ['Is annual compliance audit mandatory?', 'Yes. Annual compliance audit is mandatory.'],
  ['Is SCORES registration required?', 'Yes. RIAs must have proper grievance redressal mechanism and SCORES compliance where applicable.'],
  ['Are records required to be maintained?', 'Yes. Client records, advisory records and compliance documents must be preserved for the prescribed period.'],
  ['Is prior approval required for change in control?', 'Yes. Change in control requires prior SEBI approval.'],
  ['Can SEBI inspect RIAs?', 'Yes. SEBI may inspect books, records, fee invoices, risk profiling forms, client communications and compliance systems.'],
  ['Can registration be suspended or cancelled?', 'Yes. SEBI may suspend or cancel registration for serious or repeated non-compliance.'],
  ['Can RIA registration be transferred?', 'Registration is generally not transferable.'],
  ['Can RIA provide tax advice?', 'Tax advice may be provided separately, but securities-related advice must comply with SEBI RIA framework.'],
  ['Can RIA onboard clients digitally?', 'Yes, provided KYC, advisory agreement, risk profiling, suitability and documentation requirements are properly fulfilled.'],
  ['Is mis-selling treated seriously?', 'Yes. Mis-selling may lead to strict enforcement action.'],
  ['What happens if audit is not conducted?', 'Non-submission or non-conduct of compliance audit may invite regulatory action.'],
  ['How long does RIA Registration take?', 'Timeline may generally range from 3 to 6 months depending on documentation quality, SEBI scrutiny and query response.'],
  ['How can Estabizz help with RIA Registration in India?', 'Estabizz assists with applicability review, eligibility assessment, NISM and qualification mapping, net worth documentation, business plan, policy drafting, Form A filing, SEBI query response and post-registration compliance.']
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
      tags={[{ emoji: '💼', label: 'SEBI Regulatory Advisory' }, { emoji: '🧭', label: 'Investment Adviser License' }, { emoji: '📋', label: 'Form A & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'RIA Registration in India' }]}
      title="RIA Registration in India - Complete SEBI Investment Adviser Compliance Guide"
      heroDescription={<><p><strong>RIA Registration in India</strong> is the mandatory regulatory approval required for individuals and entities intending to provide investment advice for consideration under the supervision of the Securities and Exchange Board of India. If an adviser provides paid guidance relating to securities, portfolio allocation, mutual funds, listed securities, investment products or financial planning linked with securities, RIA Registration in India must be carefully evaluated before commencing advisory activity.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI Regulatory Advisory', 'Individual / Company / LLP RIA Structuring', 'NISM Certification Mapping', 'Rs. 5 Lakh / Rs. 50 Lakh Net Worth Readiness', 'Form A Filing Support', 'Advisory Agreement Drafting', 'Fee Model Structuring', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for RIA Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check RIA Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="36 min read"
      displayYear="2026"
      focusKeyword="RIA Registration in India"
      sections={sections}
      ctaTitle="Plan Your RIA Filing"
      ctaDescription="Discuss advisory model, NISM, net worth, risk profiling, suitability, fee policy and Form A documentation."
      quickFacts={[{ label: 'Regulator', value: 'SEBI' }, { label: 'Individual Net Worth', value: 'Rs. 5 L' }, { label: 'Entity Net Worth', value: 'Rs. 50 L' }, { label: 'Form', value: 'Form A' }, { label: 'Timeline', value: '3-6 months' }]}
      relatedArticles={[
        { title: 'Research Analyst Registration in India', href: '/sebi/research-analyst-registration-in-india', category: 'SEBI', description: 'SEBI RA registration for research reports and recommendations.' },
        { title: 'PMS Registration in India', href: '/sebi/pms-registration-in-india', category: 'SEBI', description: 'SEBI Portfolio Manager registration for client-wise portfolio management.' },
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Registration for privately pooled investment vehicles.' }
      ]}
      finalCtaTitle="Start Your RIA Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI Investment Adviser application with structured regulatory support, applicability review, qualification and NISM mapping, net worth readiness, advisory agreement, fee model policy, risk profiling framework, Form A filing, SEBI query response and post-registration compliance assistance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for RIA Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check RIA Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="RIA Registration in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Securities and Exchange Board of India' },
          { title: 'Applicable Regulation', body: 'SEBI Investment Advisers Regulations, 2013, as amended from time to time' },
          { title: 'Latest Official Position Checked', body: 'SEBI public listing shows Investment Advisers Regulations last amended on November 25, 2025, and the Master Circular for Investment Advisers dated February 06, 2026.' },
          { title: 'Registration Type', body: 'Registered Investment Adviser / Investment Adviser Registration' },
          { title: 'Eligible Applicants', body: 'Individual, partnership firm, LLP, company or body corporate, subject to eligibility' },
          { title: 'Application Form', body: 'Form A under applicable SEBI process' },
          { title: 'Certificate', body: 'SEBI Investment Adviser Registration Certificate' },
          { title: 'Individual Net Worth', body: 'Rs. 5 lakh' },
          { title: 'Non-Individual Net Worth', body: 'Rs. 50 lakh' },
          { title: 'Qualification', body: 'Relevant educational / professional qualification in finance, economics, commerce, business management, accountancy, capital markets or related field' },
          { title: 'Certification', body: 'Prescribed NISM Investment Adviser certification mandatory' },
          { title: 'Fiduciary Duty', body: 'Advice must be in the client’s best interest' },
          { title: 'Client Agreement', body: 'Mandatory before rendering advisory services' },
          { title: 'Risk Profiling and Suitability', body: 'Mandatory before advice' },
          { title: 'Compliance Audit', body: 'Annual compliance audit required' },
          { title: 'SCORES', body: 'Registration / grievance framework required' },
          { title: 'Timeline', body: 'Indicative 3 to 6 months, depending on documentation and SEBI review' }
        ]} />
        <div className="warning-box">The above details are indicative and must be evaluated based on the applicant’s legal structure, advisory activity, qualification, experience, NISM certification, net worth, fee model, distribution linkage, conflict management framework and latest SEBI regulations / circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-ria" title="What is RIA Registration in India?">
        <p>RIA Registration in India is the registration granted by SEBI to an eligible person or entity to provide investment advice for consideration. Investment advice generally includes advice relating to investing in, purchasing, selling or otherwise dealing in securities or investment products.</p>
        <p>The regulatory objective is to ensure that investment advice is transparent, suitable, conflict-free and aligned with the client’s best interest. SEBI expects registered investment advisers to operate with fiduciary responsibility, proper client documentation, fee discipline and conflict disclosure.</p>
        <div className="warning-box">RIA Registration in India does not permit the adviser to manage client funds or operate discretionary portfolios. Portfolio management requires separate PMS registration, where applicable.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of RIA Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Primary Regulation', 'SEBI Investment Advisers Regulations, 2013, as amended from time to time'],
          ['Applicable Law', 'SEBI Act, 1992'],
          ['Master Circular', 'Latest SEBI Master Circular for Investment Advisers to be verified before filing'],
          ['Application Form', 'Form A / prescribed SEBI process'],
          ['Core Regulatory Focus', 'Qualification, certification, net worth, fiduciary duty, risk profiling, suitability, client agreement, fee cap, conflict disclosure and record retention'],
          ['Regulatory Powers', 'Registration, monitoring, inspection, suspension, cancellation and penalties']
        ]} />
        <p>SEBI regulates Investment Advisers to ensure that paid investment advice is provided by qualified, certified and accountable persons. The framework focuses on investor protection, advisory transparency and strict segregation of advisory and distribution conflict.</p>
      </Section>

      <Section id="registered-investment-adviser" title="What is a SEBI Registered Investment Adviser?">
        <p>A SEBI Registered Investment Adviser is an individual or entity authorised to provide investment advice relating to securities or investment products for a fee under a regulated framework. The adviser must act in the best interest of the client and must follow prescribed disclosure, documentation, fee and suitability requirements.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Paid securities advice', 'Mutual fund advisory', 'Portfolio allocation guidance', 'Financial planning linked with securities', 'Retirement or goal-based investment advice', 'Digital advisory platforms', 'Subscription-based advisory services', 'HNI / family office advisory', 'Client risk profiling', 'Suitability-based recommendations'].map((title) => ({ title, body: 'This advisory activity should be mapped against the SEBI Investment Advisers framework before launch.' }))} />
        <div className="info-box">Whether a person calls the activity wealth advisory, financial planning, mutual fund advisory, investment consulting or stock advisory, SEBI applicability depends on the actual service and whether investment advice is provided for consideration.</div>
      </Section>

      <Section id="comparison" title="RIA vs Research Analyst vs PMS vs Mutual Fund Distributor">
        <DataTable headers={['Parameter', 'RIA / Investment Adviser', 'Research Analyst', 'PMS', 'Mutual Fund Distributor']} rows={[
          ['Regulator', 'SEBI', 'SEBI', 'SEBI', 'AMFI / distribution framework and applicable SEBI norms'],
          ['Core Activity', 'Personalised investment advice', 'General research / recommendations', 'Client-wise portfolio management', 'Distribution of mutual fund products'],
          ['Client Funds Handling', 'Not permitted', 'Not permitted', 'Permitted under PMS framework', 'Not applicable as adviser'],
          ['Revenue Model', 'Advisory fee', 'Research fee / subscription', 'Portfolio management fee', 'Commission / trail'],
          ['Risk Profiling', 'Mandatory', 'Different framework', 'Client mandate and portfolio suitability', 'Product suitability / distributor obligations'],
          ['Personalised Advice', 'Yes', 'Generally no', 'Portfolio management', 'Not as independent fee-based adviser'],
          ['Conflict Risk', 'Fee-based fiduciary model', 'Research conflicts', 'Portfolio conflicts', 'Commission conflict'],
          ['Suitable For', 'Financial planners and advisory firms', 'Research publishers', 'HNI portfolio managers', 'Product distributors']
        ]} />
        <div className="info-box">If the business wants to earn advisory fees and give client-specific recommendations, RIA Registration in India is the correct framework to evaluate. If the business wants to earn commission, distribution and advisory must be separated carefully.</div>
      </Section>

      <Section id="who-needs" title="Who Needs RIA Registration in India?">
        <DataTable headers={['Category', 'Registration Requirement']} rows={[
          ['Individual providing paid investment advice', 'Required unless specifically exempt'],
          ['Company providing investment advisory services', 'Required'],
          ['LLP offering fee-based financial planning', 'Required'],
          ['Partnership firm giving investment advice', 'Required subject to eligibility'],
          ['Financial planner charging advisory fees', 'Required where advice relates to securities / investment products'],
          ['Mutual fund adviser charging fee', 'Required'],
          ['Stock advisory service charging subscription fee', 'Required if advice is personalised / advisory in nature'],
          ['Fintech advisory platform', 'Required where investment advice is given for consideration'],
          ['Portfolio allocation adviser', 'Required'],
          ['Banks / brokers giving advisory', 'Applicability and segregation must be evaluated']
        ]} />
        <p>If any form of consideration is received for advice relating to securities or investment products, RIA Registration in India becomes highly relevant.</p>
      </Section>

      <Section id="exemptions" title="Who May Be Exempt from RIA Registration in India?">
        <DataTable headers={['Category', 'Exemption Condition']} rows={[
          ['Insurance agents', 'Exempt where advice is solely incidental to insurance distribution'],
          ['Pension advisers', 'Exempt where covered under respective regulator and within scope'],
          ['Mutual fund distributors', 'Exempt only for incidental advice connected with distribution, not independent fee-based advice'],
          ['Stock brokers', 'Incidental advice may be covered, but advisory business requires careful segregation'],
          ['Chartered Accountants / Advocates', 'Only if advice is incidental to professional practice'],
          ['Fund managers / PMS / AIF managers', 'Covered under respective framework for specific activity'],
          ['General financial educators', 'May not require RIA if no investment advice is given for consideration']
        ]} />
        <div className="warning-box">Exemption is not a blanket permission. If securities advice is provided as a separate commercial service, SEBI registration may be required.</div>
      </Section>

      <Section id="who-cannot" title="Who Cannot Apply for RIA Registration in India?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Applicant without prescribed qualification', 'Eligibility issue'],
          ['Applicant without NISM certification', 'Application deficiency'],
          ['Applicant failing fit and proper criteria', 'Registration risk'],
          ['Applicant with adverse securities market ban', 'Regulatory concern'],
          ['Entity with inadequate net worth', 'Not eligible until rectified'],
          ['Entity with no compliance framework', 'SEBI query risk'],
          ['Entity giving PMS-like fund management', 'Wrong regulatory route'],
          ['Entity giving only research reports', 'RA framework may be more appropriate'],
          ['Applicant proposing guaranteed returns', 'Not permitted'],
          ['Applicant mixing advisory and distribution without segregation', 'High regulatory risk']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for RIA Registration in India">
        <DataTable headers={['Eligibility Parameter', 'Regulatory Expectation']} rows={[
          ['Legal Structure', 'Individual, partnership firm, LLP, company or body corporate, subject to conditions'],
          ['Qualification', 'Relevant educational / professional qualification'],
          ['Certification', 'Prescribed NISM Investment Adviser certification'],
          ['Experience', 'Relevant advisory / securities market / financial planning experience, especially for principal officer and key persons'],
          ['Net Worth', 'Rs. 5 lakh for individual / proprietor and Rs. 50 lakh for non-individual applicant'],
          ['Fit and Proper', 'Applicant, directors, partners, principal officer and key persons must qualify'],
          ['Infrastructure', 'Adequate office, systems, data protection and record-keeping mechanism'],
          ['Compliance Framework', 'Compliance manual, audit process, conflict policy and grievance mechanism'],
          ['Risk Profiling', 'Mandatory client risk profiling system'],
          ['Suitability', 'Advice must match client profile and objective'],
          ['Advisory Agreement', 'Written agreement before advice']
        ]} />
      </Section>

      <Section id="qualification-certification" title="Qualification and NISM Certification Requirement">
        <DataTable headers={['Applicant Type', 'Qualification / Certification Requirement']} rows={[
          ['Individual Investment Adviser', 'Relevant educational / professional qualification and NISM certification'],
          ['Principal Officer of Non-Individual IA', 'Qualification, experience and NISM certification as prescribed'],
          ['Persons Associated with Investment Advice', 'Qualification and certification requirements as applicable'],
          ['Compliance Personnel', 'Suitable knowledge of regulatory framework and internal controls']
        ]} />
        <p>NISM Investment Adviser certification must remain valid. Certification validity should be tracked as part of ongoing compliance.</p>
      </Section>

      <Section id="experience-principal-officer" title="Experience and Principal Officer Requirement">
        <p>For non-individual applicants, the Principal Officer is responsible for advisory operations and regulatory supervision. SEBI generally examines experience, qualification and advisory capability of the Principal Officer and persons associated with investment advice.</p>
        <DataTable headers={['Experience Area', 'Relevance']} rows={[
          ['Investment Advisory', 'Client advice and suitability understanding'],
          ['Financial Planning', 'Goal-based advisory and risk profiling'],
          ['Securities Market', 'Market products and risk awareness'],
          ['Mutual Fund Advisory', 'Product selection and portfolio allocation'],
          ['Wealth Management', 'Client lifecycle and investment planning'],
          ['Compliance', 'Advisory documentation and regulatory control']
        ]} />
        <p>Experience proof should be properly documented through appointment letters, experience certificates, role profile notes, advisory samples and professional credentials.</p>
      </Section>

      <Section id="net-worth" title="Net Worth Requirement for RIA Registration in India">
        <DataTable headers={['Applicant Category', 'Minimum Net Worth']} rows={[
          ['Individual / Proprietor', 'Rs. 5 lakh'],
          ['Non-Individual / Company / LLP / Body Corporate', 'Rs. 50 lakh']
        ]} />
        <div className="rounded-2xl bg-[#0a1628] text-white p-6 my-6"><div className="text-xs uppercase tracking-[0.2em] text-blue-200 mb-2">Net Worth Formula</div><p className="text-xl font-bold">Net Worth = Assets - Liabilities, excluding intangible assets, deferred expenditure and fictitious assets, certified by a Chartered Accountant.</p></div>
        <p>Net worth must be maintained continuously. Borrowed funds should not be treated as owned net worth. If net worth falls below the prescribed threshold, the adviser must restore it within the prescribed timeline, failing which regulatory action may follow.</p>
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Criteria for RIA Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Integrity and honesty', 'Good reputation and character', 'Financial solvency', 'No securities market ban', 'No conviction for moral turpitude', 'No serious regulatory default', 'Transparent litigation disclosure', 'Clean disciplinary background', 'No adverse action affecting investor confidence'].map((title) => ({ title, body: 'Fit and proper status should be supported by clear declarations and litigation disclosures.' }))} />
        <p>For non-individual applicants, directors, partners, principal officers, controlling shareholders and key persons may also be scrutinised.</p>
      </Section>

      <Section id="infrastructure" title="Infrastructure Requirement for RIA Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Dedicated office or compliant digital setup', 'Secure client data storage', 'Risk profiling system', 'Suitability assessment framework', 'Advisory agreement documentation', 'Compliance monitoring mechanism', 'Client communication archive', 'Fee invoice records', 'Grievance redressal system', 'Cyber security and confidentiality controls'].map((title) => ({ title, body: 'This control supports suitable advice, client evidence, audit readiness and inspection discipline.' }))} />
        <div className="info-box">Digital-only advisory businesses must demonstrate secure IT architecture, proper record retention, client onboarding controls and audit trail capability.</div>
      </Section>

      <Section id="business-plan" title="Business Plan Requirement for RIA Registration in India">
        <p>SEBI may examine whether the applicant has a clear and sustainable advisory business model. A realistic business plan supports regulatory confidence.</p>
        <DataTable headers={['Business Plan Component', 'What It Should Cover']} rows={[
          ['3-Year Financial Projection', 'Revenue, cost, client base and profitability'],
          ['Revenue Model', 'Fixed fee, AUA-based fee or permitted structure'],
          ['Target Client Segment', 'Retail, HNI, family office, salaried professionals, startup founders or other segment'],
          ['Advisory Scope', 'Mutual funds, securities, asset allocation, retirement, goal planning or other permitted scope'],
          ['Delivery Mechanism', 'Offline, digital, hybrid, app, web portal or relationship manager model'],
          ['Compliance Structure', 'Risk profiling, suitability, agreements, audit and complaints'],
          ['Segregation Framework', 'Separation of advisory and distribution, if applicable'],
          ['Risk Controls', 'Mis-selling prevention, fee cap compliance and conflict disclosure']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for RIA Registration in India">
        <DataTable headers={['Document Category', 'Key Documents']} rows={[
          ['Application Documents', 'Form A, fee proof and SEBI-prescribed declarations'],
          ['Identity / Constitutional Documents', 'PAN, Aadhaar / identity proof, Certificate of Incorporation, LLP Agreement, partnership deed, MOA / AOA as applicable'],
          ['Qualification Documents', 'Degree certificates, professional qualification proof and NISM certificate'],
          ['Experience Documents', 'Experience letters, role profile, advisory samples and employment history'],
          ['Financial Documents', 'CA-certified net worth certificate, bank statements and financial statements'],
          ['Business Plan', '3-year projection, revenue model, advisory process and client acquisition plan'],
          ['Infrastructure Documents', 'Office proof, IT system details, risk profiling system and record retention framework'],
          ['Compliance Documents', 'Compliance manual, risk profiling policy, suitability policy, conflict disclosure policy and fee policy'],
          ['Fit and Proper Documents', 'Declarations for applicant, directors, partners, principal officer and key persons'],
          ['Client Documentation', 'Advisory agreement, risk profiling form, suitability assessment template, disclosure format and grievance process']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for RIA Registration in India">
        <Timeline steps={[
          { title: 'Activity and Applicability Review', body: 'Evaluate whether the proposed activity is investment advice, research, PMS, distribution or another regulated activity.' },
          { title: 'Eligibility Review', body: 'Check qualification, NISM certification, experience, net worth and fit and proper criteria.' },
          { title: 'Structuring and Segregation Planning', body: 'Finalise individual, partnership, LLP or company structure and map advisory-distribution segregation, if applicable.' },
          { title: 'Policy and Documentation Preparation', body: 'Prepare compliance manual, risk profiling framework, suitability policy, conflict policy, fee policy, advisory agreement and business plan.' },
          { title: 'Form A Filing', body: 'File application with SEBI through the prescribed process along with documents and application fee.' },
          { title: 'SEBI Scrutiny', body: 'SEBI reviews qualification, experience, net worth, business model, fee model, conflict controls, compliance systems and fit and proper status.' },
          { title: 'Clarification and Query Response', body: 'Respond to SEBI queries with proper supporting documents and revised submissions where required.' },
          { title: 'In-Principle Approval', body: 'SEBI may issue approval / in-principle communication subject to fulfilment of conditions.' },
          { title: 'Fee Payment', body: 'Pay applicable registration fee after SEBI approval / intimation as per prescribed process.' },
          { title: 'Certificate of Registration', body: 'SEBI grants Investment Adviser registration and unique registration number.' },
          { title: 'Operational Launch and Compliance', body: 'Start advisory activity only within the approved regulatory scope and maintain client agreements, risk profiling, suitability, fee records, disclosures and audit systems.' }
        ]} />
      </Section>

      <Section id="government-fees" title="Government Fees for RIA Registration in India">
        <DataTable headers={['Category', 'Fee Position']} rows={[
          ['Individual Applicant', 'Application and registration fee as prescribed under latest SEBI schedule'],
          ['Non-Individual Applicant', 'Application and registration fee as prescribed under latest SEBI schedule'],
          ['Modification / Change Fees', 'As applicable under SEBI process'],
          ['GST / Statutory Levies', 'Applicable as per law'],
          ['Refundability', 'Fees are generally non-refundable once processed']
        ]} />
        <div className="warning-box">Fee amounts should be verified from the latest SEBI Investment Advisers Regulations, fee schedule, SEBI circulars and SEBI portal instructions before filing or hardcoding in reusable website data.</div>
      </Section>

      <Section id="timeline" title="Timeline for RIA Registration in India">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Preparation', '3 to 4 weeks'],
          ['Form A filing', 'Case-specific'],
          ['SEBI scrutiny', '2 to 4 months'],
          ['Clarification cycle', 'Depends on response quality and speed'],
          ['Overall timeline', 'Generally 3 to 6 months']
        ]} />
        <div className="info-box">Timeline is indicative and depends on documentation quality, SEBI scrutiny, qualification proof, NISM certification, experience records, business model clarity, fee structure and query response.</div>
      </Section>

      <Section id="risk-profiling" title="Client Risk Profiling and Suitability under RIA Registration in India">
        <Flow items={['Client Onboarding', 'KYC and Basic Details', 'Risk Profiling', 'Investment Objective Mapping', 'Suitability Assessment', 'Advice Issuance', 'Periodic Review', 'Record Preservation']} />
        <DataTable headers={['Requirement', 'Practical Meaning']} rows={[
          ['Risk Profiling', 'Understand client risk appetite and capacity'],
          ['Suitability', 'Advice must match client’s financial situation and objectives'],
          ['Investment Objective', 'Goal, time horizon and liquidity requirement'],
          ['Client Consent', 'Documented acceptance and understanding'],
          ['Periodic Review', 'Review client profile and recommendations periodically'],
          ['Record Retention', 'Preserve client-level records for regulatory review']
        ]} />
        <p>Mechanical or copy-paste risk profiling may invite inspection observations. Advice should be supported by documented suitability logic.</p>
      </Section>

      <Section id="advisory-agreement" title="Advisory Agreement Requirements">
        <DataTable headers={['Clause', 'Practical Coverage']} rows={[
          ['Scope of Services', 'Nature and limits of advice'],
          ['Fee Model', 'Fixed fee or AUA-based fee'],
          ['Conflict Disclosure', 'Actual and potential conflict disclosures'],
          ['Risk Disclosure', 'Market and product risks'],
          ['Client Responsibilities', 'Information accuracy and decision responsibility'],
          ['Termination', 'Exit and refund conditions'],
          ['Grievance Mechanism', 'Complaint handling process'],
          ['Confidentiality', 'Client data protection'],
          ['Record Retention', 'Documentation and communication records'],
          ['Regulatory Disclosure', 'SEBI registration and compliance disclosures']
        ]} />
        <p>Advisory agreement should be executed before rendering advisory services.</p>
      </Section>

      <Section id="fee-model" title="Fee Model Framework for RIA Registration in India">
        <p>One of the most sensitive areas under RIA Registration in India is the advisory fee model. SEBI allows specified fee models and restricts overcharging, dual charging and conflict-driven advisory practices.</p>
        <DataTable headers={['Fee Model', 'Structure', 'Key Condition']} rows={[
          ['Fixed Fee Model', 'Flat advisory fee', 'Subject to client-family level cap'],
          ['Assets Under Advice Model', 'Percentage of AUA', 'Subject to client-family level cap'],
          ['Dual Fee Model for Same Client', 'Not permitted', 'One fee model per client family'],
          ['Advance Fee', 'Restricted', 'Must follow regulatory limits'],
          ['Commission Income', 'Not permitted for individual adviser; segregation required for non-individual structures', 'Conflict management required']
        ]} />
        <div className="warning-box">Exact fee caps and advance fee limits must be verified from the latest SEBI Investment Adviser framework before hardcoding numbers.</div>
      </Section>

      <Section id="segregation" title="Segregation of Advisory and Distribution">
        <p>SEBI’s framework emphasises conflict-free advisory. Investment advice should operate independently from product distribution incentives.</p>
        <DataTable headers={['Scenario', 'Regulatory Expectation']} rows={[
          ['Individual RIA', 'Cannot receive commission from distribution'],
          ['Non-Individual RIA', 'Advisory and distribution arms must be segregated as prescribed'],
          ['Stock Broker + Advisory', 'Segregation and conflict controls required'],
          ['Mutual Fund Distributor + Advisory', 'Fee-based advice and commission-based distribution must be separated'],
          ['Group Entity Distribution', 'Disclosure and arm’s length controls required'],
          ['Client Confusion Risk', 'Clear communication and documentation required']
        ]} />
        <div className="warning-box">Mixing advisory fees with distribution commission without proper segregation is one of the most serious compliance risks under RIA Registration in India.</div>
      </Section>

      <Section id="conflict-framework" title="Conflict Disclosure Framework">
        <CardGrid columns="md:grid-cols-2" cards={['Product commission conflicts', 'Group entity product conflicts', 'Personal holdings disclosure', 'Referral arrangement disclosure', 'Compensation disclosure', 'Advisory-distribution segregation', 'Client consent and transparency', 'Written conflict register', 'Periodic review by compliance officer', 'Clear client communication'].map((title) => ({ title, body: 'This control should be documented in policies and communicated clearly to clients where applicable.' }))} />
        <p>RIA must place client interest above commercial interest. Conflict disclosure is not merely a footer; it must be meaningful and client-understandable.</p>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for Registered Investment Advisers">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Annual Compliance Audit', 'Mandatory'],
          ['Audit Report Submission', 'As prescribed'],
          ['Risk Profiling', 'Mandatory before advice'],
          ['Suitability Assessment', 'Mandatory and documented'],
          ['Advisory Agreement', 'Mandatory before advice'],
          ['Client Records', 'Maintain prescribed records'],
          ['Fee Compliance', 'Follow permitted fee models and caps'],
          ['Conflict Disclosure', 'Disclose actual and potential conflicts'],
          ['SCORES / Grievance', 'Register and maintain grievance handling process'],
          ['Net Worth Maintenance', 'Maintain prescribed net worth continuously'],
          ['Change in Control', 'Prior SEBI approval where applicable'],
          ['Material Changes', 'Report as prescribed']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="RIA Registration in India - Compliance Calendar">
        <h3>Continuous Compliance</h3>
        <DataTable headers={['Compliance Item', 'Frequency', 'Responsibility', 'Risk if Missed']} rows={[
          ['Risk Profiling', 'Before advice and periodic review', 'Adviser / Compliance', 'Suitability breach'],
          ['Suitability Assessment', 'Every advice', 'Adviser', 'Mis-selling risk'],
          ['Fee Cap Monitoring', 'Continuous', 'Finance / Compliance', 'Inspection query'],
          ['Conflict Disclosure', 'Before advice / ongoing', 'Compliance', 'Regulatory action'],
          ['Client Agreement', 'Before service', 'Operations', 'Documentation breach'],
          ['Record Retention', 'Continuous', 'Operations', 'Inspection issue'],
          ['Grievance Handling', 'Continuous', 'Compliance', 'SCORES escalation']
        ]} />
        <h3>Monthly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Fee Invoice Review', 'Check fee cap and advance fee compliance', 'Finance / Compliance'],
          ['Client Record Review', 'Ensure risk profiling and suitability records exist', 'Operations'],
          ['Complaint Review', 'Track unresolved complaints', 'Compliance Officer'],
          ['Advisory-Distribution Segregation Review', 'Check conflict compliance', 'Compliance']
        ]} />
        <h3>Quarterly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Compliance Review', 'Review adherence to SEBI IA Regulations', 'Compliance Officer'],
          ['Business Model Review', 'Check advisory and distribution activities', 'Management'],
          ['Client Agreement Review', 'Check template and execution quality', 'Legal / Compliance'],
          ['Data Protection Review', 'Client confidentiality and cyber controls', 'IT / Compliance']
        ]} />
        <h3>Annual Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['Annual Compliance Audit', 'Mandatory'],
          ['Net Worth Certificate', 'CA-certified net worth confirmation'],
          ['Policy Review', 'Compliance manual, fee policy, conflict policy and grievance policy'],
          ['NISM Certification Check', 'Validate certification status'],
          ['SCORES Review', 'Complaint closure and pending status check'],
          ['Management Review', 'Governance and compliance status review']
        ]} />
        <h3>Event-Based Compliance</h3>
        <DataTable headers={['Trigger Event', 'Compliance Action']} rows={[
          ['Change in control', 'Prior SEBI approval required'],
          ['Change in principal officer', 'Update SEBI records / approval as applicable'],
          ['Change in business model', 'Review SEBI implications'],
          ['Launch of new digital platform', 'Review disclosures and client onboarding'],
          ['Net worth shortfall', 'Restore immediately'],
          ['SEBI inspection / query', 'Submit records promptly'],
          ['Material conflict', 'Disclose and manage before advice']
        ]} />
      </Section>

      <Section id="operational-restrictions" title="Operational Restrictions under RIA Framework">
        <DataTable headers={['Restriction', 'Practical Meaning']} rows={[
          ['No Guaranteed Returns', 'RIA cannot assure profit'],
          ['No Portfolio Management', 'Cannot manage client funds without PMS registration'],
          ['No Commission for Individual RIA', 'Individual adviser cannot receive distribution commission'],
          ['No Undisclosed Conflict', 'Conflicts must be disclosed'],
          ['No Misleading Advertisement', 'Advertisement must be fair and compliant'],
          ['No Dual Fee Model for Same Client Family', 'One permitted model must be followed'],
          ['No Advice Without Risk Profiling', 'Client suitability must be documented'],
          ['No Product Pushing', 'Advice must be client-first and fiduciary']
        ]} />
      </Section>

      <Section id="inspection-enforcement" title="SEBI Inspection and Enforcement Powers">
        <p>SEBI may inspect records, call for documents, examine advisory methodology, review fee records, verify risk profiling, inspect client communications and take action for non-compliance.</p>
        <DataTable headers={['Inspection Area', 'Documents / Controls to Keep Ready']} rows={[
          ['Registration Certificate', 'SEBI certificate and correspondence'],
          ['Advisory Agreements', 'Executed client agreements'],
          ['Risk Profiles', 'Client risk profiling records'],
          ['Suitability Notes', 'Advice-to-client suitability mapping'],
          ['Fee Invoices', 'Fee model and cap compliance evidence'],
          ['Conflict Disclosures', 'Written disclosures and registers'],
          ['Client Communications', 'Email, app, WhatsApp and advisory communication trail'],
          ['Net Worth Certificate', 'Latest CA certificate'],
          ['Compliance Audit Reports', 'Annual compliance audit records'],
          ['Grievance Register', 'Complaint tracking and SCORES records'],
          ['Marketing Material', 'Advertisement and website compliance records']
        ]} />
      </Section>

      <Section id="penalties" title="Suspension, Cancellation and Penalties">
        <DataTable headers={['Trigger', 'Possible Regulatory Consequence']} rows={[
          ['Operating without registration', 'Monetary penalty and enforcement'],
          ['False disclosure', 'Suspension or cancellation'],
          ['Mis-selling', 'SEBI enforcement action'],
          ['Fee cap violation', 'Inspection query / penalty'],
          ['Net worth below threshold', 'Corrective action or suspension risk'],
          ['Failure to maintain records', 'Inspection adverse finding'],
          ['Non-submission of audit report', 'Regulatory action'],
          ['Undisclosed conflict', 'Investor protection action'],
          ['Mixing advisory and distribution', 'Serious regulatory concern'],
          ['Guaranteeing returns', 'Regulatory action']
        ]} />
        <p>SEBI may impose monetary penalty, suspension, cancellation and debarment from securities market depending on the nature and gravity of violation.</p>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in RIA Registration in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Incomplete qualification proof', 'SEBI query or delay'],
          ['Improper net worth certificate', 'Application deficiency'],
          ['No NISM certification', 'Eligibility gap'],
          ['Weak fee model understanding', 'Regulatory concern'],
          ['Generic business plan', 'SEBI query'],
          ['No risk profiling framework', 'Weak application'],
          ['No suitability policy', 'Post-registration risk'],
          ['Confusing RIA with RA', 'Wrong registration route'],
          ['Mixing advisory and commission', 'High regulatory risk'],
          ['No advisory agreement template', 'Application weakness'],
          ['No compliance audit plan', 'Ongoing default'],
          ['Delayed SEBI query response', 'Approval delay']
        ]} />
      </Section>

      <Section id="strategic-recommendations" title="Strategic Structuring Recommendations Before Applying">
        <Flow items={['Confirm whether activity is investment advice, research or PMS', 'Complete NISM certification before filing', 'Prepare clear experience documentation', 'Obtain CA-certified net worth certificate', 'Draft advisory agreement template', 'Prepare risk profiling and suitability framework', 'Prepare fee model policy', 'Prepare conflict disclosure policy', 'Prepare client grievance policy', 'Create data protection and record retention framework', 'Build digital advisory compliance checks', 'Avoid guaranteed return language', 'Do not charge advisory fees before registration']} />
        <blockquote className="rounded-2xl border-l-4 border-[#0096D6] bg-blue-50 p-6 text-[#0a1628] font-semibold">True investment advisory begins where commercial temptation ends. Governance is not about compliance paperwork; it is about fiduciary character.<br /><span className="block mt-3 text-sm font-normal text-gray-600">- CS Devyani Khambhati, Compliance Expert</span></blockquote>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with RIA Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Applicability Assessment', body: 'We help evaluate whether the proposed activity requires RIA, Research Analyst, PMS or another SEBI registration.' },
          { title: 'Eligibility Review', body: 'We review qualification, NISM certification, experience, fit and proper status and net worth readiness.' },
          { title: 'Structuring Support', body: 'We assist with individual, partnership, LLP or company structure and advisory-distribution segregation.' },
          { title: 'Net Worth Documentation', body: 'We assist with CA-certified net worth certificate, financial documents and supporting records.' },
          { title: 'Business Plan and Advisory Model', body: 'We prepare 3-year business plan, advisory fee model, client segment strategy and advisory process note.' },
          { title: 'Policy Documentation', body: 'We help draft compliance manual, risk profiling policy, suitability policy, fee policy, conflict disclosure policy, advisory agreement and grievance SOP.' },
          { title: 'Form A Filing and SEBI Query Support', body: 'We support Form A preparation, document compilation, filing coordination and structured responses to SEBI clarifications.' },
          { title: 'Digital Advisory Compliance', body: 'We help map website, app, WhatsApp, email, subscription and online advisory flows with SEBI disclosure and compliance expectations.' },
          { title: 'Post-Registration Compliance', body: 'We support compliance audit, record retention, fee model review, SCORES grievance handling, net worth monitoring, NISM validity tracking and regulatory updates.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for RIA Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Expertise', body: 'Our team works across SEBI licensing and compliance matters and understands capital market intermediary scrutiny.' },
          { title: 'Advisory Business Understanding', body: 'We understand wealth advisory, financial planning, digital advisory, mutual fund advisory and subscription advisory models.' },
          { title: 'Compliance-First Documentation', body: 'We focus on qualification, certification, net worth, fee model, risk profiling, suitability, conflicts, client agreements and inspection readiness.' },
          { title: 'Digital Advisory Awareness', body: 'We help analyse modern advisory delivery through websites, mobile apps, WhatsApp, email and subscription platforms.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From applicability review to SEBI application, query response and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on RIA Registration in India">
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
          <p>Expertise: SEBI, RBI, IRDAI, IFSCA, RIA registration, Investment Adviser compliance, Research Analyst registration, PMS registration, capital market intermediary licensing and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help individual advisers, financial planners, wealth advisory firms, fintech advisory platforms, mutual fund advisory businesses and serious capital market professionals understand the broad SEBI framework for RIA Registration in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. SEBI requirements, application formats, fee structures, net worth thresholds, qualification norms, certification requirements, advisory agreement format, fee model restrictions and approval processes may change from time to time. Applicants should verify the latest SEBI regulations, master circulars, FAQs and fee schedule before filing any RIA application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>Build your RIA Registration in India application with structured regulatory support, advisory model mapping, NISM and qualification review, net worth documentation, risk profiling controls, fee policy and post-registration compliance planning.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 text-center">Apply for RIA Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check RIA Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
