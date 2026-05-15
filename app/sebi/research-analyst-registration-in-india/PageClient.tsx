'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'Research Analyst Registration in India: Quick Overview' },
  { id: 'what-is-ra', title: 'What is Research Analyst Registration in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'research-analyst', title: 'What is a Research Analyst?' },
  { id: 'comparison', title: 'Research Analyst vs Investment Adviser vs PMS' },
  { id: 'who-needs', title: 'Who Needs Research Analyst Registration?' },
  { id: 'social-media', title: 'YouTube, Telegram and Social Media Stock Recommendations' },
  { id: 'exemptions', title: 'Who Is Exempt?' },
  { id: 'who-cannot', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'qualification-certification', title: 'Qualification and NISM Certification' },
  { id: 'experience', title: 'Experience Requirement' },
  { id: 'net-worth', title: 'Net Worth Requirement' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'infrastructure', title: 'Infrastructure Requirement' },
  { id: 'business-plan', title: 'Business Plan Requirement' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'government-fees', title: 'Government Fees' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'research-disclosures', title: 'Research Report Disclosure Requirements' },
  { id: 'conflict-framework', title: 'Conflict of Interest and Chinese Wall Framework' },
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

export const faqs = [
  ['What is Research Analyst Registration in India?', 'Research Analyst Registration in India is SEBI registration required for persons or entities issuing securities research reports, investment recommendations or analysis relating to listed or proposed-to-be-listed securities.'],
  ['Who regulates Research Analysts in India?', 'Research Analysts are regulated by the Securities and Exchange Board of India.'],
  ['Which regulations govern Research Analyst Registration?', 'Research Analysts are governed by the SEBI Research Analysts Regulations, 2014, as amended from time to time.'],
  ['Is Research Analyst Registration mandatory?', 'Yes. Any person acting as Research Analyst or holding itself out as Research Analyst must obtain SEBI registration unless specifically exempt.'],
  ['What activities require Research Analyst Registration?', 'Issuing research reports, stock recommendations, buy / sell / hold calls, securities analysis and public offer opinions may require registration.'],
  ['Can a YouTube stock educator require RA registration?', 'If the channel provides structured, monetised or systematic securities recommendations, registration may be required.'],
  ['Can a Telegram stock tips channel require registration?', 'Yes. Paid or systematic Telegram-based stock recommendations may attract Research Analyst registration requirements.'],
  ['Is general financial education exempt?', 'General education may not require registration if no securities-specific recommendation is provided, but the actual content must be evaluated.'],
  ['Can an individual apply for Research Analyst Registration?', 'Yes, an individual can apply if qualification, certification, net worth and fit and proper requirements are met.'],
  ['Can a company apply?', 'Yes. Companies can apply as research entities.'],
  ['Can an LLP apply?', 'Yes. LLPs are eligible if they satisfy regulatory conditions.'],
  ['Can a partnership firm apply?', 'Yes, subject to regulatory conditions and eligibility.'],
  ['What qualification is required?', 'A postgraduate degree in finance, economics, commerce or eligible professional qualification such as CA, CS, CFA, MBA Finance or equivalent may be required.'],
  ['Is NISM certification mandatory?', 'Yes. NISM Research Analyst certification is mandatory.'],
  ['Is experience required?', 'Relevant securities market, research or advisory experience is important and may be examined by SEBI.'],
  ['What is the minimum net worth for individual RA?', 'The minimum net worth for an individual / proprietor is Rs. 1 lakh, subject to latest SEBI verification.'],
  ['What is the minimum net worth for non-individual RA?', 'The minimum net worth for a body corporate or LLP is Rs. 25 lakh, subject to latest SEBI verification.'],
  ['Is net worth certificate required?', 'Yes. A Chartered Accountant-certified net worth certificate is required.'],
  ['What is Form A?', 'Form A is the prescribed application form for Research Analyst Registration.'],
  ['Can SEBI seek additional documents?', 'Yes. SEBI may seek clarifications or additional documents during scrutiny.'],
  ['Can SEBI reject the application?', 'Yes. SEBI may reject an application if eligibility or compliance requirements are not met after giving due opportunity.'],
  ['What documents are required?', 'Documents generally include Form A, net worth certificate, qualification proof, experience proof, NISM certificate, business plan, compliance manual, conflict policy and declarations.'],
  ['Is business plan mandatory?', 'SEBI expects clarity on business model, revenue sources and compliance structure.'],
  ['Is compliance manual required?', 'Yes. A documented compliance framework is necessary.'],
  ['Is conflict of interest policy required?', 'Yes. Research Analysts must maintain conflict management and disclosure framework.'],
  ['Are disclosures required in every research report?', 'Yes. Research reports must include prescribed disclosures and disclaimers.'],
  ['Can Research Analyst provide personalised advice?', 'Personalised investment advice may require Investment Adviser registration. Research Analyst Registration mainly covers research and recommendations.'],
  ['Can Research Analyst manage client funds?', 'No. Client fund management requires separate PMS registration where applicable.'],
  ['Can Research Analyst guarantee returns?', 'No. Guaranteeing returns is prohibited.'],
  ['Can Research Analyst trade in recommended securities?', 'Trading is subject to restrictions and disclosure requirements to avoid conflict of interest.'],
  ['Is front-running prohibited?', 'Yes. Front-running is strictly prohibited.'],
  ['Is record retention required?', 'Yes. Records must generally be preserved for at least 5 years.'],
  ['Is compliance audit mandatory?', 'Yes. Periodic / annual compliance audit is mandatory.'],
  ['Can SEBI inspect Research Analysts?', 'Yes. SEBI may inspect records, reports, recommendation methodology and compliance systems.'],
  ['Can registration be suspended?', 'Yes. SEBI may suspend registration for non-compliance.'],
  ['Can registration be cancelled?', 'Yes. Serious misconduct or repeated violations may lead to cancellation.'],
  ['Can registration be transferred?', 'Registration is generally not transferable.'],
  ['Can Research Analyst later apply for Investment Adviser registration?', 'Yes, but the Investment Adviser framework must be independently complied with.'],
  ['What is the expected timeline?', 'The process may take around 3 to 6 months depending on documentation quality and SEBI scrutiny.'],
  ['How can Estabizz help with Research Analyst Registration in India?', 'Estabizz assists with applicability review, eligibility assessment, net worth documentation, business plan, compliance policy drafting, Form A filing, SEBI query response and post-registration compliance.']
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
  { title: 'Applicable Regulation', body: 'SEBI Research Analysts Regulations, 2014, as amended from time to time' },
  { title: 'Latest Official Position Checked', body: 'SEBI public regulatory listings should be verified before filing; use the latest Research Analysts Regulations, Master Circular, fee schedule and certification norms at application stage.' },
  { title: 'Registration Type', body: 'Research Analyst / Research Entity Registration' },
  { title: 'Eligible Applicants', body: 'Individual, partnership firm, LLP, company or body corporate, subject to eligibility' },
  { title: 'Application Form', body: 'Form A' },
  { title: 'Certificate', body: 'SEBI Research Analyst Registration Certificate' },
  { title: 'Individual Net Worth', body: 'Rs. 1 lakh' },
  { title: 'Non-Individual Net Worth', body: 'Rs. 25 lakh' },
  { title: 'Qualification', body: 'Postgraduate degree or eligible professional qualification' },
  { title: 'Certification', body: 'NISM Research Analyst Certification mandatory' },
  { title: 'Experience', body: 'Relevant securities market / research / advisory experience is generally critical for approval' },
  { title: 'Compliance Audit', body: 'Mandatory periodic compliance audit' },
  { title: 'Record Retention', body: 'Minimum 5 years' },
  { title: 'Research Disclaimer', body: 'Mandatory in research reports' },
  { title: 'Timeline', body: 'Indicative 3 to 6 months, depending on documentation and SEBI review' }
];

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '📊', label: 'SEBI Regulatory Advisory' }, { emoji: '🔎', label: 'Research Analyst License' }, { emoji: '📋', label: 'Form A & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'Research Analyst Registration in India' }]}
      title="Research Analyst Registration in India - Complete SEBI Compliance Guide"
      heroDescription={<><p><strong>Research Analyst Registration in India</strong> is a mandatory regulatory requirement under the SEBI Research Analysts framework for any individual, company, LLP, partnership firm or research entity engaged in issuing research reports, making investment recommendations, providing securities analysis or publishing structured buy / sell / hold calls relating to listed or proposed-to-be-listed securities. If a person monetises stock recommendations, runs a research platform, publishes equity reports or provides systematic market calls, SEBI registration must be carefully evaluated before commencing such activity.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI Regulatory Advisory', 'Individual / Company / LLP RA Structuring', 'NISM Certification Mapping', 'Rs. 1 Lakh / Rs. 25 Lakh Net Worth Readiness', 'Form A Filing Support', 'SEBI Query Response', 'Research Report Disclosure Framework', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for Research Analyst Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check RA Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="35 min read"
      displayYear="2026"
      focusKeyword="Research Analyst Registration in India"
      sections={sections}
      ctaTitle="Plan Your SEBI RA Filing"
      ctaDescription="Discuss applicability, qualification, NISM certification, net worth, disclosures and Form A documentation."
      quickFacts={[{ label: 'Regulator', value: 'SEBI' }, { label: 'Individual Net Worth', value: 'Rs. 1 L' }, { label: 'Entity Net Worth', value: 'Rs. 25 L' }, { label: 'Form', value: 'Form A' }, { label: 'Timeline', value: '3-6 months' }]}
      relatedArticles={[
        { title: 'PMS Registration in India', href: '/sebi/pms-registration-in-india', category: 'SEBI', description: 'SEBI Portfolio Manager registration for client-wise portfolio management.' },
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Registration for privately pooled investment vehicles.' },
        { title: 'AIF Compliance Test Report', href: '/sebi/aif-compliance-test-report', category: 'SEBI', description: 'Compliance test report requirements for Alternative Investment Funds.' }
      ]}
      finalCtaTitle="Start Your Research Analyst Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI Research Analyst application with structured regulatory support, applicability review, qualification and NISM mapping, net worth readiness, business plan, conflict policy, Form A filing, SEBI query response and post-registration compliance assistance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for Research Analyst Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check RA Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Research Analyst Registration in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={quickOverview} />
        <div className="warning-box">The above details are indicative and must be evaluated based on the applicant's legal structure, research activity, qualification, experience, NISM certification, net worth, business model, public communication channel, conflict management framework and latest SEBI regulations / circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-ra" title="What is Research Analyst Registration in India?">
        <p>Research Analyst Registration in India is the registration granted by SEBI to an eligible person or entity for issuing research reports, making securities recommendations, giving opinions on public offers, or providing analysis that may influence investment decisions in securities.</p>
        <p>The regulatory objective is to protect investors from misleading research, conflict-driven recommendations, unqualified stock calls and undisclosed financial interests. SEBI expects Research Analysts to maintain independence, transparency, proper disclosures, conflict controls and record-keeping discipline.</p>
        <div className="warning-box">A Research Analyst cannot manage client funds or provide personalised investment advisory unless separately registered under the applicable SEBI framework. Research Analyst Registration in India permits research and recommendations, not portfolio management.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of Research Analyst Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Primary Regulation', 'SEBI Research Analysts Regulations, 2014, as amended from time to time'],
          ['Applicable Law', 'SEBI Act, 1992'],
          ['Master Circular', 'Latest SEBI Master Circular for Research Analysts to be verified before filing'],
          ['Application Form', 'Form A'],
          ['Core Regulatory Focus', 'Qualification, certification, net worth, disclosures, conflict management, research independence, investor protection and record retention'],
          ['Regulatory Powers', 'Registration, monitoring, inspection, suspension, cancellation and penalties']
        ]} />
        <p>SEBI regulates Research Analysts to ensure that securities research is issued by qualified, certified and accountable persons. SEBI may call for information, inspect records, examine recommendation methodology and initiate enforcement action for violations.</p>
      </Section>

      <Section id="research-analyst" title="What is a Research Analyst under SEBI?">
        <p>A Research Analyst is a person or entity who prepares or publishes research reports, provides buy / sell / hold recommendations, gives opinions concerning securities or public offers, or provides analysis intended to assist investors in making investment decisions.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Equity research reports', 'Stock recommendations', 'Sector reports', 'IPO research', 'Public offer opinions', 'Model portfolio research, where applicable', 'Technical / fundamental analysis', 'Securities market analysis', 'Public media recommendations', 'Paid research subscriptions'].map((title) => ({ title, body: 'This activity should be mapped against the SEBI Research Analysts framework before launch.' }))} />
        <div className="info-box">Whether a person is called analyst, educator, market expert, research platform or stock market content creator, SEBI applicability depends on the actual activity and whether structured securities recommendations are being provided.</div>
      </Section>

      <Section id="comparison" title="Research Analyst vs Investment Adviser vs PMS">
        <DataTable headers={['Parameter', 'Research Analyst', 'Investment Adviser', 'Portfolio Manager / PMS']} rows={[
          ['Regulator', 'SEBI', 'SEBI', 'SEBI'],
          ['Core Activity', 'General securities research and recommendations', 'Personalised investment advice', 'Portfolio management / administration'],
          ['Client Funds Handling', 'Not permitted', 'Not permitted', 'Permitted under PMS framework'],
          ['Personalised Advice', 'Not the primary scope', 'Yes', 'Portfolio-level management'],
          ['Minimum Net Worth', 'Rs. 1 lakh / Rs. 25 lakh', 'Separate IA framework', 'Rs. 5 crore'],
          ['Risk Profiling', 'Limited / activity-based', 'Mandatory client-specific suitability', 'Client mandate and risk framework'],
          ['Output', 'Research report / recommendation', 'Advice based on client profile', 'Managed portfolio'],
          ['Suitable For', 'Research publishers and stock recommendation platforms', 'Personalised advisory businesses', 'HNI portfolio management businesses']
        ]} />
        <div className="info-box">If the business model involves personalised advice or managing client portfolios, Research Analyst Registration alone may not be sufficient.</div>
      </Section>

      <Section id="who-needs" title="Who Needs Research Analyst Registration in India?">
        <DataTable headers={['Category', 'Registration Requirement']} rows={[
          ['Individuals issuing stock recommendations', 'Required if research activity is structured / commercial'],
          ['Companies providing equity research reports', 'Required'],
          ['LLPs giving securities research', 'Required'],
          ['Partnership firms issuing research recommendations', 'Required, subject to eligibility'],
          ['Digital research platforms', 'Required if securities recommendations are provided'],
          ['YouTube / Telegram channels giving structured buy / sell calls', 'Required if monetised, systematic or recommendation-led'],
          ['Subscription-based stock research platforms', 'Required'],
          ['Proxy advisory firms', 'May require RA registration and additional regulatory consideration'],
          ['Persons making public media recommendations', 'Registration / disclosure requirements must be evaluated']
        ]} />
        <p>If the analysis influences investment decisions in securities and is offered as a business or structured activity, Research Analyst Registration in India becomes highly relevant.</p>
      </Section>

      <Section id="social-media" title="SEBI Registration for YouTube, Telegram and Social Media Stock Recommendations">
        <p>Digital content creators, Telegram channel operators, YouTube educators, influencers and social media platforms must carefully evaluate whether their content is educational or whether it becomes structured securities research / recommendation.</p>
        <DataTable headers={['Activity Type', 'Likely Regulatory Position']} rows={[
          ['General financial literacy content', 'May not require RA registration if no specific recommendations are made'],
          ['Stock-specific buy / sell / hold calls', 'RA registration may be required'],
          ['Paid Telegram stock tips', 'RA registration likely required'],
          ['Model portfolio subscription', 'RA / IA / PMS implications must be evaluated'],
          ['IPO review with investment recommendation', 'RA applicability may arise'],
          ['Sector education without recommendation', 'Lower risk, subject to content'],
          ['Performance claims and paid calls', 'High regulatory risk']
        ]} />
        <div className="warning-box">Using disclaimers alone does not automatically make unregistered research activity compliant. The actual content, monetisation model and investor influence are relevant.</div>
      </Section>

      <Section id="exemptions" title="Who May Be Exempt from Research Analyst Registration in India?">
        <DataTable headers={['Category', 'Exemption Condition']} rows={[
          ['Chartered Accountants', 'Only if advice is incidental to professional practice'],
          ['Advocates', 'Only if securities advice is not a separate business activity'],
          ['Bankers', 'Where research is part of banking function and within permitted scope'],
          ['Mutual Funds', 'Internal research for own investment function'],
          ['Investment Advisers', 'If research is incidental and not separately monetised'],
          ['Employees of registered entity', 'Covered under employer framework where properly supervised']
        ]} />
        <div className="warning-box">Exemption is not blanket permission. If structured recommendations are made to clients or the public for consideration, SEBI may require Research Analyst Registration in India.</div>
      </Section>

      <Section id="who-cannot" title="Who Cannot Apply for Research Analyst Registration in India?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Person lacking prescribed qualification', 'Eligibility issue'],
          ['Person without NISM certification', 'Application deficiency'],
          ['Applicant failing fit and proper criteria', 'Registration risk'],
          ['Applicant with adverse securities market ban', 'Regulatory concern'],
          ['Entity with inadequate net worth', 'Not eligible until rectified'],
          ['Entity with no compliance framework', 'SEBI query risk'],
          ['Entity providing PMS-like fund management', 'Wrong regulatory route'],
          ['Entity giving personalised advice without IA registration', 'Separate compliance issue'],
          ['Applicant proposing guaranteed returns', 'Not permitted'],
          ['Applicant with misleading performance claims', 'Regulatory risk']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for Research Analyst Registration in India">
        <DataTable headers={['Eligibility Parameter', 'Regulatory Expectation']} rows={[
          ['Legal Structure', 'Individual, partnership firm, LLP, company or body corporate, subject to conditions'],
          ['Qualification', 'Postgraduate or prescribed professional qualification'],
          ['Certification', 'NISM Research Analyst Certification'],
          ['Experience', 'Relevant capital market / research / advisory experience'],
          ['Net Worth', 'Rs. 1 lakh for individual / proprietor and Rs. 25 lakh for body corporate / LLP'],
          ['Fit and Proper', 'Applicant and key persons must satisfy criteria'],
          ['Infrastructure', 'Adequate office, systems, data and record-keeping mechanism'],
          ['Compliance Framework', 'Compliance manual, disclosures, audit and conflict policy'],
          ['Research Independence', 'Proper conflict management and Chinese Wall framework'],
          ['Business Plan', 'Revenue model, monetisation structure and research process clarity']
        ]} />
      </Section>

      <Section id="qualification-certification" title="Qualification and NISM Certification Requirement">
        <DataTable headers={['Applicant Type', 'Qualification Requirement']} rows={[
          ['Individual Research Analyst', 'Postgraduate degree in finance, economics, commerce or professional qualification such as CA, CS, CFA, MBA Finance or equivalent'],
          ['Principal Officer of Non-Individual RA', 'Same broad qualification criteria'],
          ['Research Analyst Employee', 'Relevant qualification and certification'],
          ['Partner / Representative engaged in research', 'Qualification and certification as applicable']
        ]} />
        <p>NISM Research Analyst Certification is mandatory and must remain valid. Certification validity should be tracked as part of ongoing compliance.</p>
      </Section>

      <Section id="experience" title="Experience Requirement for Research Analyst Registration in India">
        <p>SEBI evaluates whether the applicant has adequate understanding of capital markets, securities research, portfolio analysis, investment advisory or related financial market functions. Relevant experience is therefore important even where the final eligibility assessment depends on the latest SEBI framework.</p>
        <DataTable headers={['Experience Area', 'Relevance']} rows={[
          ['Capital Markets', 'Understanding of securities and market behaviour'],
          ['Securities Research', 'Research methodology and report preparation'],
          ['Investment Advisory', 'Investment recommendation process'],
          ['Portfolio Management', 'Portfolio analysis and risk evaluation'],
          ['Equity / Debt Analysis', 'Security-specific research skill'],
          ['Financial Modelling', 'Valuation and forecasting ability']
        ]} />
        <p>Experience proof should be properly documented through appointment letters, experience certificates, work profile notes, research samples and role descriptions.</p>
      </Section>

      <Section id="net-worth" title="Net Worth Requirement for Research Analyst Registration in India">
        <DataTable headers={['Applicant Category', 'Minimum Net Worth']} rows={[
          ['Individual / Proprietor', 'Rs. 1 lakh'],
          ['Body Corporate / LLP', 'Rs. 25 lakh']
        ]} />
        <div className="rounded-2xl bg-[#0a1628] text-white p-6 my-6"><div className="text-xs uppercase tracking-[0.2em] text-blue-200 mb-2">Net Worth Formula</div><p className="text-xl font-bold">Net Worth = Assets - Liabilities, certified by a Chartered Accountant, subject to regulatory interpretation.</p></div>
        <p>Net worth must be maintained continuously. If net worth falls below the prescribed level, the applicant should restore it immediately, failing which regulatory action may follow.</p>
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Criteria for Research Analyst Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Integrity and honesty', 'Good reputation and character', 'Financial solvency', 'No securities market ban', 'No conviction for moral turpitude', 'No serious regulatory default', 'Transparent litigation disclosure', 'Clean disciplinary background'].map((title) => ({ title, body: 'Fit and proper status should be supported by clear declarations and litigation disclosures.' }))} />
        <p>For non-individual applicants, directors, partners, principal officers and key persons may also be scrutinised.</p>
      </Section>

      <Section id="infrastructure" title="Infrastructure Requirement for Research Analyst Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={['Dedicated office or compliant digital setup', 'Research systems and databases', 'Secure IT infrastructure', 'Data access and research tools', 'Record keeping system', 'Compliance monitoring mechanism', 'Client documentation process', 'Research report archive', 'Conflict disclosure tracking', 'Cyber security and confidentiality controls'].map((title) => ({ title, body: 'This control supports accountable research preparation, record retention and inspection readiness.' }))} />
        <div className="info-box">Digital-only research businesses must demonstrate secure IT architecture, proper record retention, cyber security readiness and audit trail capability.</div>
      </Section>

      <Section id="business-plan" title="Business Plan Requirement for Research Analyst Registration in India">
        <p>SEBI expects clarity on the applicant's business model, research monetisation structure, subscriber model, compliance framework and conflict management process.</p>
        <DataTable headers={['Business Plan Component', 'What It Should Cover']} rows={[
          ['3-Year Financial Projection', 'Revenue, cost, subscriber base and profitability'],
          ['Revenue Model', 'Subscription, report fee, institutional research or platform model'],
          ['Research Coverage', 'Equity, sector, IPO, technical, fundamental or thematic research'],
          ['Research Methodology', 'Data sources, screening methods and review process'],
          ['Compliance Structure', 'Disclosures, audit, complaints and record retention'],
          ['Conflict Policy', 'Personal trading, associate interests and compensation conflicts'],
          ['Digital Distribution', 'Website, app, email, Telegram, YouTube or platform controls'],
          ['Risk Controls', 'Misleading claims, front-running prevention and disclaimer process']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for Research Analyst Registration in India">
        <DataTable headers={['Document Category', 'Key Documents']} rows={[
          ['Application Documents', 'Form A, fee proof and SEBI-prescribed declarations'],
          ['Identity / Constitutional Documents', 'PAN, Aadhaar / identity proof, Certificate of Incorporation, LLP Agreement, partnership deed, MOA / AOA as applicable'],
          ['Qualification Documents', 'Degree certificates, professional qualification proof and NISM certificate'],
          ['Experience Documents', 'Experience letters, role profile, research samples and employment history'],
          ['Financial Documents', 'CA-certified net worth certificate, bank statements and financial statements'],
          ['Business Plan', '3-year projection, revenue model, research process and monetisation structure'],
          ['Infrastructure Documents', 'Office proof, IT system details, research tools and record retention framework'],
          ['Compliance Documents', 'Compliance manual, research disclosure policy, conflict of interest policy and Chinese Wall policy'],
          ['Fit and Proper Documents', 'Declarations for applicant, directors, partners, principal officer and key persons'],
          ['Client / Subscriber Documents', 'Client agreement, terms of service, disclaimer format and onboarding documentation'],
          ['Research Report Templates', 'Sample research report format with disclosure and disclaimer']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for Research Analyst Registration in India">
        <Timeline steps={[
          { title: 'Activity and Applicability Review', body: 'Evaluate whether the proposed activity is research, education, investment advice, PMS or another regulated activity.' },
          { title: 'Eligibility Review', body: 'Check qualification, NISM certification, experience, net worth and fit and proper criteria.' },
          { title: 'Structuring and Compliance Planning', body: 'Finalise individual, company, LLP or partnership structure and prepare compliance framework.' },
          { title: 'Policy and Documentation Preparation', body: 'Prepare compliance manual, conflict policy, research methodology note, business plan, disclaimers and client documentation.' },
          { title: 'Form A Filing', body: 'File Form A with SEBI through the prescribed process along with documents and fee.' },
          { title: 'SEBI Scrutiny', body: 'SEBI reviews qualification, experience, net worth, business model, disclosures, compliance systems and fit and proper status.' },
          { title: 'Clarification and Query Response', body: 'Respond to SEBI queries with proper supporting documents and revised submissions where required.' },
          { title: 'Fee Payment', body: 'Pay applicable registration fee after SEBI approval / intimation as per prescribed process.' },
          { title: 'Certificate of Registration', body: 'SEBI grants Research Analyst registration and unique registration number.' },
          { title: 'Operational Launch and Compliance', body: 'Start research activity only within the approved regulatory scope and maintain disclosures, records, audit and compliance systems.' }
        ]} />
      </Section>

      <Section id="government-fees" title="Government Fees for Research Analyst Registration in India">
        <DataTable headers={['Category', 'Registration Fee']} rows={[
          ['Individual', 'Rs. 10,000'],
          ['Body Corporate', 'Rs. 5,00,000']
        ]} />
        <div className="warning-box">The above fee structure is based on the available working brief and must be verified from the latest SEBI fee schedule before filing or hardcoding in reusable website data.</div>
      </Section>

      <Section id="timeline" title="Timeline for Research Analyst Registration in India">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Preparation', '3 to 4 weeks'],
          ['Form A filing', 'Case-specific'],
          ['SEBI scrutiny', '2 to 4 months'],
          ['Clarification cycle', 'Depends on response quality and speed'],
          ['Overall timeline', 'Generally 3 to 6 months']
        ]} />
        <div className="info-box">Timeline is indicative and depends on documentation quality, SEBI scrutiny, qualification proof, NISM certification, experience records, business model clarity and query response.</div>
      </Section>

      <Section id="research-disclosures" title="Research Report Disclosure Requirements">
        <DataTable headers={['Disclosure Area', 'Requirement']} rows={[
          ['Registration Details', 'SEBI registration number and analyst details'],
          ['Financial Interest', 'Interest in subject company must be disclosed'],
          ['Beneficial Ownership', 'Material ownership must be disclosed'],
          ['Conflict of Interest', 'Any actual or potential conflict must be disclosed'],
          ['Compensation', 'Compensation from subject company or related party, if any'],
          ['Past Assignments', 'Investment banking / merchant banking / advisory relationship, if any'],
          ['Personal Trading', 'Relevant holdings or trading restrictions'],
          ['Disclaimer', 'Mandatory research disclaimer'],
          ['Risk Disclosure', 'Clear market and investment risk statement']
        ]} />
        <p>Every research report must carry appropriate disclosures. Generic disclaimer wording may not be enough if actual conflicts exist.</p>
      </Section>

      <Section id="conflict-framework" title="Conflict of Interest and Chinese Wall Framework">
        <CardGrid columns="md:grid-cols-2" cards={['Personal trading restrictions', 'Disclosure of holdings', 'Separation of research and sales', 'No front-running', 'No trading before recommendation release', 'Restricted list maintenance', 'Conflict register', 'Independence of research opinion', 'Research approval workflow', 'Associate relationship disclosure'].map((title) => ({ title, body: 'The policy should explain how the risk is identified, documented, disclosed and controlled.' }))} />
        <p>Research independence is central to SEBI's RA framework. The compliance policy should clearly show how conflicts will be identified, disclosed and controlled.</p>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for Research Analysts">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Research Disclosures', 'Mandatory in every report'],
          ['Record Retention', 'Minimum 5 years'],
          ['Compliance Audit', 'Periodic / annual compliance audit'],
          ['Client Agreement', 'Mandatory documentation'],
          ['Risk Profiling', 'Required before recommendations where applicable'],
          ['Chinese Walls', 'To avoid conflict of interest'],
          ['NISM Certification', 'Valid certification to be maintained'],
          ['Complaint Handling', 'Proper grievance redressal mechanism'],
          ['Advertisements', 'Must not be misleading'],
          ['Research Methodology', 'Must be documented and retrievable'],
          ['SEBI Inspection', 'Records must be available for inspection']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="Research Analyst Registration in India - Compliance Calendar">
        <h3>Continuous Compliance</h3>
        <DataTable headers={['Compliance Item', 'Frequency', 'Responsibility', 'Risk if Missed']} rows={[
          ['Research Disclosure', 'Every report', 'Research Analyst / Compliance', 'SEBI action'],
          ['Conflict Check', 'Before report release', 'Compliance Team', 'Investor protection risk'],
          ['Record Retention', 'Continuous', 'Operations / Compliance', 'Inspection issue'],
          ['NISM Validity', 'Continuous', 'Individual / HR', 'Eligibility issue'],
          ['Client Confidentiality', 'Continuous', 'Research Team', 'Regulatory and reputational risk'],
          ['Chinese Wall Monitoring', 'Continuous', 'Compliance Officer', 'Conflict risk']
        ]} />
        <h3>Monthly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Personal Trading Review', 'Check analyst trading restrictions', 'Compliance'],
          ['Research Report Archive Review', 'Ensure records are preserved', 'Operations'],
          ['Complaint Review', 'Track investor / subscriber complaints', 'Compliance Officer'],
          ['Disclosure Template Review', 'Confirm completeness', 'Research Head']
        ]} />
        <h3>Quarterly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Purpose', 'Responsible Person']} rows={[
          ['Compliance Review', 'Review adherence to SEBI RA Regulations', 'Compliance Officer'],
          ['Business Model Review', 'Check monetisation and communication channels', 'Management'],
          ['Conflict Register Review', 'Identify pending / unmanaged conflicts', 'Compliance'],
          ['Subscriber / Client Documentation Review', 'Verify agreements and disclaimers', 'Operations']
        ]} />
        <h3>Annual Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['Compliance Audit', 'Mandatory compliance audit'],
          ['Net Worth Certificate', 'CA-certified net worth confirmation'],
          ['Policy Review', 'Compliance manual and conflict policy review'],
          ['NISM Certification Check', 'Validate certification status'],
          ['Research Methodology Review', 'Review report preparation process'],
          ['Annual Management Review', 'Governance and compliance status review']
        ]} />
        <h3>Event-Based Compliance</h3>
        <DataTable headers={['Trigger Event', 'Compliance Action']} rows={[
          ['Change in control', 'Seek SEBI approval / intimation as applicable'],
          ['Change in principal officer', 'Update SEBI records as required'],
          ['New digital channel launch', 'Review RA applicability and disclosures'],
          ['New subscription product', 'Review agreement, fees and compliance'],
          ['Net worth shortfall', 'Restore immediately'],
          ['SEBI inspection / query', 'Submit records promptly'],
          ['Material conflict', 'Disclose and manage before report publication']
        ]} />
      </Section>

      <Section id="operational-restrictions" title="Operational Restrictions under Research Analyst Framework">
        <DataTable headers={['Restriction', 'Practical Meaning']} rows={[
          ['No Guaranteed Returns', 'Research Analyst cannot assure profit'],
          ['No Portfolio Management', 'Cannot manage client funds without PMS registration'],
          ['No Personalised Advice Beyond Scope', 'IA registration may be required for personalised advice'],
          ['No Front-Running', 'Strictly prohibited'],
          ['No Misleading Research', 'Reports must be fair and factual'],
          ['No Undisclosed Conflict', 'Conflicts must be disclosed'],
          ['No Manipulative Calls', 'Stock recommendations cannot be used for price manipulation'],
          ['No Unsubstantiated Performance Claims', 'Advertisements must be fair and compliant'],
          ['No Misuse of Client Data', 'Confidentiality must be maintained']
        ]} />
      </Section>

      <Section id="inspection-enforcement" title="SEBI Inspection and Enforcement Powers">
        <p>SEBI may inspect records, call for documents, seek transaction data, examine recommendation methodology, review disclosures, investigate conflicts and take action for non-compliance.</p>
        <DataTable headers={['Inspection Area', 'Documents / Controls to Keep Ready']} rows={[
          ['Registration Certificate', 'SEBI certificate and correspondence'],
          ['Research Reports', 'Published reports and versions'],
          ['Disclosure Records', 'Conflict and interest disclosures'],
          ['Client Agreements', 'Subscriber / client agreements'],
          ['Net Worth Certificate', 'Latest CA certificate'],
          ['NISM Certificates', 'Valid certification records'],
          ['Research Methodology', 'Documented process and data sources'],
          ['Conflict Register', 'Analyst holdings and restrictions'],
          ['Complaint Register', 'Grievance tracking and closure records'],
          ['Audit Reports', 'Compliance audit reports'],
          ['Digital Channel Records', 'Website, app, Telegram, YouTube or email archives']
        ]} />
      </Section>

      <Section id="penalties" title="Suspension, Cancellation and Penalties">
        <DataTable headers={['Trigger', 'Possible Regulatory Consequence']} rows={[
          ['False disclosure', 'Suspension or cancellation'],
          ['Misleading research', 'SEBI enforcement action'],
          ['Front-running', 'Severe regulatory action'],
          ['Net worth below threshold', 'Corrective action or suspension risk'],
          ['Repeated compliance violations', 'Suspension / cancellation'],
          ['Operating without registration', 'Monetary penalty and enforcement'],
          ['Failure to maintain records', 'Inspection adverse finding'],
          ['Non-cooperation with SEBI', 'Serious regulatory action'],
          ['Undisclosed conflict', 'Investor protection action'],
          ['Guaranteeing returns', 'Regulatory action']
        ]} />
        <p>SEBI may impose monetary penalty, suspension, cancellation and debarment from securities market depending on the nature and gravity of violation.</p>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in Research Analyst Registration in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Incomplete experience proof', 'SEBI query or delay'],
          ['Improper net worth certificate', 'Application deficiency'],
          ['No NISM certification', 'Eligibility gap'],
          ['Weak conflict management policy', 'Regulatory concern'],
          ['Generic business plan', 'SEBI query'],
          ['No research methodology note', 'Weak application'],
          ['No disclaimer framework', 'Post-registration risk'],
          ['Confusing RA with IA', 'Wrong registration route'],
          ['Giving stock tips before registration', 'Enforcement risk'],
          ['Using Telegram / YouTube without compliance', 'High regulatory risk'],
          ['No compliance audit plan', 'Ongoing default'],
          ['Delayed SEBI query response', 'Approval delay']
        ]} />
      </Section>

      <Section id="strategic-recommendations" title="Strategic Structuring Recommendations Before Applying">
        <Flow items={['Confirm whether activity is research, advice or PMS', 'Complete NISM certification before filing', 'Prepare clear experience documentation', 'Obtain CA-certified net worth certificate', 'Draft research methodology note', 'Prepare conflict of interest policy', 'Prepare Chinese Wall policy', 'Draft research report disclaimer template', 'Create client / subscriber agreement', 'Build digital channel compliance checks', 'Maintain research report archive', 'Avoid guaranteed return language', 'Do not issue paid stock calls before registration']} />
        <blockquote className="rounded-2xl border-l-4 border-[#0096D6] bg-blue-50 p-6 text-[#0a1628] font-semibold">Research in securities markets carries influence. Regulation ensures that such influence is exercised with competence, disclosure and responsibility.<br /><span className="block mt-3 text-sm font-normal text-gray-600">- CS Devyani Khambhati, Compliance Expert</span></blockquote>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with Research Analyst Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Applicability Assessment', body: 'We help evaluate whether the proposed activity requires Research Analyst, Investment Adviser, PMS or another SEBI registration.' },
          { title: 'Eligibility Review', body: 'We review qualification, NISM certification, experience, fit and proper status and net worth readiness.' },
          { title: 'Structuring Support', body: 'We assist with individual, partnership, LLP or company structure and regulatory suitability.' },
          { title: 'Net Worth Documentation', body: 'We assist with CA-certified net worth certificate, financial documents and supporting records.' },
          { title: 'Business Plan and Research Model', body: 'We prepare 3-year business plan, research monetisation model, subscriber structure and research process note.' },
          { title: 'Policy Documentation', body: 'We help draft compliance manual, conflict policy, Chinese Wall policy, research disclaimer template, client agreement and grievance SOP.' },
          { title: 'Form A Filing and SEBI Query Support', body: 'We support Form A preparation, document compilation, filing coordination and structured responses to SEBI clarifications.' },
          { title: 'Digital Platform Compliance', body: 'We help map YouTube, Telegram, website, app, email and subscription channels with SEBI disclosure and compliance expectations.' },
          { title: 'Post-Registration Compliance', body: 'We support compliance audit, record retention, research disclosure review, net worth monitoring, NISM validity tracking and regulatory updates.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Research Analyst Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Expertise', body: 'Our team works across SEBI licensing and compliance matters and understands capital market intermediary scrutiny.' },
          { title: 'Research Business Understanding', body: 'We understand equity research, IPO research, digital stock platforms, subscription models and research disclosure requirements.' },
          { title: 'Compliance-First Documentation', body: 'We focus on qualification, certification, net worth, conflict disclosures, Chinese Walls, disclaimers and inspection readiness.' },
          { title: 'Digital Channel Awareness', body: 'We help analyse modern research distribution through YouTube, Telegram, websites, mobile apps and subscription platforms.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From applicability review to SEBI application, query response and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on Research Analyst Registration in India">
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
          <p>Expertise: SEBI, RBI, IRDAI, IFSCA, Research Analyst registration, Investment Adviser registration, capital market intermediary licensing, stock research compliance and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help individual analysts, research entities, stock market educators, digital research platforms, YouTube / Telegram research channels and securities research businesses understand the broad SEBI framework for Research Analyst Registration in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. SEBI requirements, application formats, fee structures, net worth thresholds, qualification norms, certification requirements, disclosure obligations and approval processes may change from time to time. Applicants should verify the latest SEBI regulations, master circulars, FAQs and fee schedule before filing any Research Analyst application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>Build your Research Analyst Registration in India application with structured regulatory support, careful activity mapping, certification review, net worth documentation, research disclosure controls and post-registration compliance planning.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 text-center">Apply for Research Analyst Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check RA Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
