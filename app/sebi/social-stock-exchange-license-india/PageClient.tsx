'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'Social Stock Exchange License in India: Quick Overview' },
  { id: 'what-is-sse-license', title: 'What is Social Stock Exchange License in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Framework' },
  { id: 'what-is-sse', title: 'What is a Social Stock Exchange?' },
  { id: 'npo-vs-fpe', title: 'NPO vs FPE under Social Stock Exchange' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'who-cannot-apply', title: 'Who Cannot Apply?' },
  { id: 'eligible-activities', title: 'Eligible Social Activities' },
  { id: 'npo-eligibility', title: 'Eligibility Criteria for NPOs' },
  { id: 'fpe-eligibility', title: 'Eligibility Criteria for FPEs' },
  { id: 'social-intent-test', title: '67% Social Intent Test' },
  { id: 'zczp', title: 'Zero Coupon Zero Principal Instruments' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'process', title: 'Step-by-Step Process' },
  { id: 'due-diligence', title: 'Due Diligence by Stock Exchange' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'cost-overview', title: 'Cost Overview' },
  { id: 'post-listing-compliance', title: 'Post-Listing Compliance' },
  { id: 'impact-reporting', title: 'Social Impact Reporting' },
  { id: 'fund-utilisation', title: 'Fund Utilisation and Audit' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'advantages', title: 'Advantages of Social Stock Exchange' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to SEBI Compliance Expert' }
];

const faqs = [
  ['What is Social Stock Exchange License in India?', 'It refers to the SEBI-regulated eligibility and listing framework that allows eligible NPOs and For-Profit Social Enterprises to raise funds through the Social Stock Exchange segment of recognised stock exchanges.'],
  ['Is Social Stock Exchange a separate exchange?', 'No. It is a separate segment within recognised stock exchanges such as NSE and BSE.'],
  ['Who regulates Social Stock Exchange in India?', 'The framework is regulated by SEBI and implemented through recognised stock exchanges.'],
  ['Who can apply for SSE registration?', 'Eligible NPOs such as trusts, societies and Section 8 companies, and eligible For-Profit Social Enterprises can apply.'],
  ['Is SSE registration mandatory for NGOs?', 'No. It is voluntary, but useful for structured fundraising and credibility.'],
  ['What is an NPO under SSE?', 'An NPO is a not-for-profit organisation such as a trust, society or Section 8 company working in eligible social sectors.'],
  ['What is a For-Profit Social Enterprise?', 'It is an enterprise that has social impact as its primary objective while operating on a revenue-generating model.'],
  ['What is ZCZP?', 'Zero Coupon Zero Principal is a fundraising instrument issued by eligible NPOs where contributors do not receive interest or principal repayment.'],
  ['Is financial return available on ZCZP instruments?', 'No. ZCZP instruments are designed for social contribution and do not provide financial return.'],
  ['What is the minimum track record required for NPOs?', 'Generally, 3 years of operational track record is required, subject to latest SEBI and exchange verification.'],
  ['Is 12A / 12AB required?', 'It is generally relevant for NPO eligibility, subject to latest SEBI circulars and exemptions.'],
  ['Is 80G required?', 'It is generally relevant, but latest SEBI circulars and applicable exemptions must be verified.'],
  ['What is the 67% social intent test?', 'It is a test to establish that a substantial portion of revenue, expenditure or beneficiary base is aligned with eligible social activities.'],
  ['Can startups apply for SSE?', 'Yes, startups may apply if they qualify as For-Profit Social Enterprises and meet SEBI criteria.'],
  ['Can CSR funds be raised through SSE?', 'SSE can improve transparency for CSR-linked funding, subject to CSR law, SEBI framework and exchange norms.'],
  ['What documents are required for NPOs?', 'Registration certificate, PAN, tax registrations, audited financials, annual reports, governing body details and impact reports are generally required.'],
  ['What documents are required for FPEs?', 'Incorporation documents, MOA / AOA, financial statements, business model, impact details and management details are generally required.'],
  ['Is impact reporting mandatory?', 'Yes. Social impact reporting is central to the SSE framework.'],
  ['Does listing guarantee fundraising?', 'No. Listing improves visibility and credibility, but actual fundraising depends on investor or donor interest.'],
  ['How long does SSE registration take?', 'The process may take around 2 to 3 months, depending on documentation quality and exchange review.'],
  ['Can rejected applications be refiled?', 'Yes, after deficiencies are addressed.'],
  ['Can multiple projects be listed?', 'Yes, subject to exchange norms, disclosures and compliance requirements.'],
  ['Can foreign funding be received?', 'It may be possible subject to FCRA, FEMA and other applicable laws.'],
  ['What happens if funds are misused?', 'Misuse of funds can attract penalties, delisting, regulatory action and reputational damage.'],
  ['How can Estabizz help with Social Stock Exchange License in India?', 'Estabizz assists with eligibility review, NPO / FPE classification, documentation, impact reporting framework, NSE / BSE SSE filing support, ZCZP documentation, query response and post-listing compliance.']
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
      tags={[{ emoji: '🌍', label: 'SEBI Social Stock Exchange Advisory' }, { emoji: '🤝', label: 'NPO / FPE Eligibility' }, { emoji: '📊', label: 'Impact Reporting' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SEBI Services', href: '/sebi' }, { label: 'Social Stock Exchange License in India' }]}
      title="Social Stock Exchange License in India - Complete SEBI Guide for NGOs & Social Enterprises"
      heroDescription={<><p><strong>Social Stock Exchange License in India</strong> refers to the SEBI-regulated eligibility, registration and listing framework that enables eligible Non-Profit Organisations and For-Profit Social Enterprises to access structured fundraising through the Social Stock Exchange segment of recognised stock exchanges such as NSE and BSE. It is designed for organisations working with clear social impact objectives in areas such as education, healthcare, poverty alleviation, livelihood, environment, rural development and social welfare.</p><p className="mt-4">The Social Stock Exchange framework is not merely a fundraising route. It requires strong governance, audited financial records, social impact measurement, proper disclosures, utilisation tracking and continuing compliance. For NGOs, Section 8 companies, trusts, societies and impact-driven enterprises, Social Stock Exchange License in India can provide a credible capital market platform, subject to eligibility and exchange-level due diligence.</p><div className="flex flex-wrap gap-2 mt-5">{['SEBI Social Stock Exchange Advisory', 'NPO / FPE Eligibility Review', 'ZCZP Instrument Support', 'Impact Reporting Framework', 'NSE / BSE SSE Listing Support', 'Documentation & Due Diligence', 'Post-Listing Compliance', 'CSR and Social Funding Readiness'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for Social Stock Exchange Registration</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check SSE Eligibility</Link><Link href="/contact" className="px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Review Social Impact Readiness</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="30 min read"
      displayYear="2026"
      focusKeyword="Social Stock Exchange License in India"
      sections={sections}
      ctaTitle="Plan Your SSE Registration"
      ctaDescription="Discuss NPO / FPE eligibility, social intent mapping, ZCZP documentation, impact reporting and exchange filing readiness."
      quickFacts={[{ label: 'Regulator', value: 'SEBI' }, { label: 'Platform', value: 'NSE / BSE SSE' }, { label: 'NPO Instrument', value: 'ZCZP' }, { label: 'Social Intent', value: '67% test' }, { label: 'Timeline', value: '2-3 months' }]}
      relatedArticles={[
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Registration for privately pooled investment vehicles.' },
        { title: 'Legal Due Diligence', href: '/services/legal-due-diligence', category: 'Legal', description: 'Legal due diligence support for regulated entities and impact projects.' }
      ]}
      finalCtaTitle="Start Your Social Stock Exchange Registration Journey with Estabizz"
      finalCtaDescription="Build your Social Stock Exchange application with structured SEBI regulatory support, NPO / FPE eligibility review, social intent mapping, impact reporting framework, documentation, NSE / BSE SSE filing coordination, query response and post-listing compliance assistance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0096D6] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for Social Stock Exchange Registration</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check SSE Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Social Stock Exchange License in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Securities and Exchange Board of India' },
          { title: 'Platform', body: 'Social Stock Exchange segment of recognised stock exchanges such as NSE and BSE' },
          { title: 'Is SSE a Separate Exchange?', body: 'No. It operates as a separate segment within recognised stock exchanges' },
          { title: 'Latest Official Position Checked', body: 'SEBI Master Circular for Framework on Social Stock Exchange dated January 19, 2026, and SEBI circular dated April 15, 2026 on NPO registration and ZCZP subscription review were checked.' },
          { title: 'April 2026 SSE Update', body: 'NPO registration without fundraising may continue for 2 years and may be extended by 1 additional year with SSE approval; ZCZP minimum subscription may be 50% in eligible partial fundraising cases after SSE due diligence.' },
          { title: 'Eligible Entities', body: 'Non-Profit Organisations and For-Profit Social Enterprises' },
          { title: 'NPO Structures', body: 'Trust, Society and Section 8 Company' },
          { title: 'FPE Structures', body: 'Eligible companies / LLPs / social enterprises, subject to social impact criteria and applicable exchange norms' },
          { title: 'Main Fundraising Instrument for NPOs', body: 'Zero Coupon Zero Principal Instruments' },
          { title: 'Fundraising Instruments for FPEs', body: 'Equity, debt or other permitted securities, subject to eligibility' },
          { title: 'NPO Track Record', body: 'Generally minimum 3 years operational track record, subject to latest SEBI / exchange norms' },
          { title: 'NPO Annual Spending', body: 'Generally Rs. 50 lakh threshold, subject to latest verification' },
          { title: 'NPO Prior Funding', body: 'Generally Rs. 10 lakh in previous financial year, subject to latest verification' },
          { title: 'Social Intent Test', body: 'At least 67% alignment with eligible social activities, based on applicable criteria' },
          { title: 'Tax Registration', body: '12A / 12AB and 80G generally relevant for NPO eligibility, subject to latest SEBI framework and exemptions' },
          { title: 'Timeline', body: 'Indicative 2 to 3 months, subject to documentation quality and exchange review' }
        ]} />
        <div className="warning-box">The above information is indicative and must be verified with the latest SEBI Master Circular, April 2026 circular, NSE / BSE SSE requirements and applicable tax registrations before final filing or hardcoding any threshold.</div>
      </Section>

      <Section id="what-is-sse-license" title="What is Social Stock Exchange License in India?">
        <p>Social Stock Exchange License in India refers to the registration and listing framework that allows eligible social enterprises and non-profit organisations to access a regulated fundraising platform through the Social Stock Exchange segment of recognised stock exchanges. It is not a separate stock exchange, but a dedicated segment within existing stock exchanges regulated by SEBI.</p>
        <p>The framework helps social organisations raise funds with greater transparency, governance and accountability. It allows donors, investors, CSR contributors and institutions to evaluate social impact in a more structured manner.</p>
        <div className="warning-box">SSE registration or listing does not guarantee fundraising. Fundraising depends on investor interest, impact credibility, disclosures, governance quality and compliance readiness.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of Social Stock Exchange License in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Platform', 'Social Stock Exchange segment of NSE / BSE'],
          ['Main Framework', 'SEBI Social Stock Exchange framework under ICDR Regulations and related circulars'],
          ['Master Circular', 'SEBI Master Circular for Framework on Social Stock Exchange dated 19 January 2026'],
          ['Recent Circular', 'SEBI circular dated 15 April 2026 on NPO registration and ZCZP minimum subscription review'],
          ['Applicable Laws', 'SEBI Act, Securities Contracts Regulation framework, Companies Act, Income Tax Act and exchange rules'],
          ['Main Entities', 'Non-Profit Organisations and For-Profit Social Enterprises'],
          ['Core Focus', 'Social impact, transparency, governance, disclosures, fund utilisation and investor / donor confidence']
        ]} />
      </Section>

      <Section id="what-is-sse" title="What is a Social Stock Exchange?">
        <p>A Social Stock Exchange is a dedicated segment of recognised stock exchanges created to facilitate fundraising by eligible social enterprises. It provides a regulated platform where organisations working in specified social sectors can raise funds and disclose impact outcomes.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Regulated fundraising platform', 'Supports social enterprises', 'Encourages transparent donations and investments', 'Enables ZCZP issuance by NPOs', 'Allows eligible FPEs to access capital', 'Promotes measurable social impact', 'Strengthens governance and disclosures', 'Enhances credibility before donors and CSR contributors'].map((title) => ({ title, body: 'The SSE framework is designed to connect social impact work with structured capital market disclosures.' }))} />
      </Section>

      <Section id="npo-vs-fpe" title="NPO vs FPE under Social Stock Exchange">
        <DataTable headers={['Parameter', 'Non-Profit Organisation', 'For-Profit Social Enterprise']} rows={[
          ['Legal Form', 'Trust, Society or Section 8 Company', 'Company / LLP / eligible enterprise structure'],
          ['Primary Objective', 'Social welfare without profit distribution', 'Social impact with revenue model'],
          ['Fundraising Instrument', 'ZCZP instruments and other permitted routes', 'Equity / debt / other permitted securities'],
          ['Return to Investor', 'No financial return under ZCZP', 'Possible financial return depending on instrument'],
          ['Tax Registration', '12A / 12AB / 80G generally relevant', 'Normal business and tax compliance'],
          ['Impact Reporting', 'Mandatory', 'Mandatory'],
          ['Social Intent Test', 'Applicable', 'Applicable'],
          ['Profit Distribution', 'Not permitted for NPOs', 'Permitted subject to law and structure']
        ]} />
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for Social Stock Exchange License in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Trusts', body: 'Public charitable trusts working in eligible social sectors with proper registration, financial records and impact reporting.' },
          { title: 'Societies', body: 'Registered societies carrying out eligible social activities with audited records and governance structure.' },
          { title: 'Section 8 Companies', body: 'Companies incorporated for charitable or social objectives under the Companies Act, 2013.' },
          { title: 'For-Profit Social Enterprises', body: 'Impact-driven businesses that meet SEBI’s social intent and eligible activity criteria.' },
          { title: 'Startups with Social Impact', body: 'Startups may apply if their business model is primarily aligned with eligible social impact sectors.' },
          { title: 'CSR-Focused Social Projects', body: 'Entities seeking structured CSR or donor visibility may evaluate SSE listing, subject to eligibility.' }
        ]} />
      </Section>

      <Section id="who-cannot-apply" title="Who Cannot Apply for Social Stock Exchange Registration?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Entity without social impact objective', 'Not suitable'],
          ['NPO without required track record', 'Eligibility issue'],
          ['NPO without required tax registrations', 'Application concern, subject to latest framework'],
          ['Entity with weak governance records', 'Due diligence concern'],
          ['Entity with incomplete financial statements', 'Application delay / rejection risk'],
          ['Entity unable to demonstrate impact', 'Core eligibility concern'],
          ['Commercial business without social intent', 'Not eligible'],
          ['Entity with unclear fund utilisation plan', 'Exchange query risk'],
          ['Entity making misleading impact claims', 'Regulatory and reputation risk'],
          ['Entity expecting guaranteed fundraising', 'Misunderstanding of framework']
        ]} />
      </Section>

      <Section id="eligible-activities" title="Eligible Activities under Social Stock Exchange License in India">
        <CardGrid columns="md:grid-cols-2" cards={['Eradicating hunger, poverty, malnutrition and inequality', 'Promoting healthcare and sanitation', 'Promoting education and vocational skills', 'Gender equality and women empowerment', 'Supporting differently abled persons', 'Rural development projects', 'Livelihood enhancement', 'Environmental sustainability', 'Climate action and conservation', 'Slum area development', 'Disaster management and relief', 'Social inclusion and community welfare'].map((title) => ({ title, body: 'Eligibility should be mapped to the latest SEBI Master Circular and exchange norms.' }))} />
        <p>The exact eligible activities should be checked under the latest SEBI Master Circular and exchange norms before filing.</p>
      </Section>

      <Section id="npo-eligibility" title="Eligibility Criteria for NPOs under Social Stock Exchange">
        <DataTable headers={['Criteria', 'Requirement / Practical Position']} rows={[
          ['Legal Structure', 'Trust, Society or Section 8 Company'],
          ['Track Record', 'Generally minimum 3 years operational track record'],
          ['Annual Spending', 'Generally Rs. 50 lakh annual spending threshold, subject to latest verification'],
          ['Prior Funding', 'Generally Rs. 10 lakh funding in previous financial year, subject to latest verification'],
          ['Tax Registration', '12A / 12AB and 80G generally relevant, subject to latest SEBI circulars and exemptions'],
          ['Social Objective', 'Must be clearly aligned with eligible social activities'],
          ['Governance', 'Proper governing body, board / trustees and internal controls'],
          ['Financial Records', 'Audited financial statements required'],
          ['Impact Reporting', 'Social impact reporting and outcome tracking required']
        ]} />
      </Section>

      <Section id="fpe-eligibility" title="Eligibility Criteria for For-Profit Social Enterprises">
        <DataTable headers={['Criteria', 'Requirement / Practical Position']} rows={[
          ['Legal Structure', 'Eligible company, LLP or enterprise structure as permitted'],
          ['Social Intent', 'Social impact must be core objective'],
          ['67% Test', 'At least 67% alignment with eligible social activities based on applicable criteria'],
          ['Financial Records', 'Audited financial statements and revenue model required'],
          ['Business Model', 'Must show impact-driven and sustainable model'],
          ['Governance', 'Board and management disclosures required'],
          ['Impact Measurement', 'Outcome measurement framework required'],
          ['Investor Disclosure', 'Transparent disclosure of business, impact and risks']
        ]} />
      </Section>

      <Section id="social-intent-test" title="67% Social Intent Test under Social Stock Exchange Framework">
        <p>A social enterprise must demonstrate that its activities are substantially aligned with eligible social objectives. The 67% test is generally applied through revenue, expenditure or beneficiary / customer base, depending on the latest SEBI framework.</p>
        <DataTable headers={['Test Basis', 'Practical Meaning']} rows={[
          ['Revenue Test', 'At least 67% of relevant revenue is from eligible social activities'],
          ['Expenditure Test', 'At least 67% of relevant expenditure is incurred on eligible social activities'],
          ['Beneficiary / Customer Test', 'At least 67% of beneficiaries / customer base relate to eligible target population'],
          ['Impact Documentation', 'Records must support the claim'],
          ['Audit Trail', 'Financial and impact data should be verifiable']
        ]} />
        <div className="warning-box">Verify the latest SEBI Master Circular and April 2026 circular before hardcoding the 67% applicability language for a specific applicant.</div>
      </Section>

      <Section id="zczp" title="Zero Coupon Zero Principal Instruments under SSE">
        <p>Zero Coupon Zero Principal instruments are fundraising instruments that may be issued by eligible NPOs through the Social Stock Exchange framework. Investors / contributors do not receive financial return, coupon or principal repayment. The contribution is made to support the stated social objective.</p>
        <DataTable headers={['Feature', 'Meaning']} rows={[
          ['Issuer', 'Eligible NPO'],
          ['Return', 'No coupon'],
          ['Principal Repayment', 'No principal repayment'],
          ['Purpose', 'Funding social projects'],
          ['Investor / Contributor Role', 'Supports social objective'],
          ['Disclosure', 'Fundraising document and impact disclosures required'],
          ['Utilisation', 'Must be aligned with stated project objective'],
          ['Minimum Subscription', 'Generally 75% of the proposed fundraise, with 50% possible in eligible partial fundraising cases subject to SSE due diligence under the April 2026 SEBI circular; verify latest position before filing']
        ]} />
      </Section>

      <Section id="documents-required" title="Documents Required for Social Stock Exchange Registration">
        <h3>For NPOs</h3>
        <DataTable headers={['Document Category', 'Documents']} rows={[
          ['Constitutional Documents', 'Trust deed / society registration / Section 8 incorporation documents'],
          ['Tax Documents', 'PAN, TAN, 12A / 12AB, 80G and ITR records'],
          ['Financial Documents', 'Audited financial statements for last 3 years'],
          ['Governance Documents', 'Trustee / board / governing body details'],
          ['Impact Documents', 'Social impact reports, project reports and beneficiary data'],
          ['Funding Records', 'Donation / grant / funding records'],
          ['Compliance Documents', 'Annual filings, statutory registers and regulatory records'],
          ['Application Documents', 'SSE application, declarations and exchange forms']
        ]} />
        <h3>For FPEs</h3>
        <DataTable headers={['Document Category', 'Documents']} rows={[
          ['Corporate Documents', 'Certificate of Incorporation, MOA, AOA / LLP agreement'],
          ['Financial Documents', 'Audited financial statements and tax returns'],
          ['Business Model', 'Social impact business plan and revenue model'],
          ['Impact Details', 'Beneficiary data, sector alignment and outcome metrics'],
          ['Board Details', 'Directors / partners / management profile'],
          ['Compliance Documents', 'Statutory filings and governance records'],
          ['Fundraising Documents', 'Draft offer / listing / fundraising documents as applicable']
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Process for Social Stock Exchange License in India">
        <Timeline steps={[
          { title: 'Eligibility Assessment', body: 'Review whether the organisation qualifies as an NPO or FPE and whether its activities fall under eligible social sectors.' },
          { title: 'Social Intent Mapping', body: 'Map revenue, expenditure and beneficiary base to the 67% social intent test.' },
          { title: 'Documentation Preparation', body: 'Compile constitutional documents, financial statements, tax registrations, governance records and impact reports.' },
          { title: 'Impact Measurement Framework', body: 'Prepare project-wise impact indicators, outcome reporting structure and fund utilisation tracking.' },
          { title: 'Application with SSE Segment', body: 'Submit application through recognised stock exchange such as NSE SSE or BSE SSE, as applicable.' },
          { title: 'Exchange Due Diligence', body: 'The exchange reviews eligibility, governance, financial records, social impact and disclosures.' },
          { title: 'Clarification and Query Response', body: 'Respond to exchange queries with supporting documents and revised disclosures.' },
          { title: 'Registration / Listing Approval', body: 'Upon satisfaction, the entity may be registered / listed on the SSE segment.' },
          { title: 'Fundraising Instrument Filing', body: 'NPOs may issue ZCZP instruments and FPEs may use permitted fundraising instruments, subject to framework.' },
          { title: 'Post-Listing Compliance', body: 'Maintain disclosures, impact reporting, fund utilisation tracking and ongoing exchange compliance.' }
        ]} />
      </Section>

      <Section id="due-diligence" title="Due Diligence by Stock Exchange">
        <DataTable headers={['Review Area', 'What the Exchange Checks']} rows={[
          ['Entity eligibility', 'NPO / FPE status, registration, social objectives and continuity'],
          ['Governance', 'Board / trustees, management quality, internal controls and disclosures'],
          ['Financial records', 'Audited accounts, funding records, utilisation and spending pattern'],
          ['Social intent', 'Alignment with eligible activities and 67% test support'],
          ['Impact evidence', 'Beneficiary data, outcome metrics and project reports'],
          ['Fundraising document', 'Purpose, utilisation plan, risk factors and disclosures']
        ]} />
      </Section>

      <Section id="timeline" title="Timeline for Social Stock Exchange Registration">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Eligibility Assessment', '1-2 weeks'],
          ['Documentation Preparation', '2-3 weeks'],
          ['Application Filing', '1 week'],
          ['Exchange Review', '4-8 weeks'],
          ['Approval and Listing', '2-3 weeks'],
          ['Overall Timeline', 'Around 2 to 3 months, subject to queries and readiness']
        ]} />
        <p>Timeline is indicative and depends on exchange review, documentation quality, social impact clarity and query rounds.</p>
      </Section>

      <Section id="cost-overview" title="Cost Overview for Social Stock Exchange License in India">
        <DataTable headers={['Cost Area', 'Practical Position']} rows={[
          ['Professional Fees', 'Advisory, documentation and filing support'],
          ['Exchange Fees', 'As prescribed by NSE / BSE SSE segment'],
          ['Listing / Instrument Fees', 'Applicable based on instrument and exchange framework'],
          ['Audit Cost', 'Financial audit, impact reporting and assurance cost'],
          ['Social Audit / Impact Assessment', 'Applicable where required'],
          ['Compliance Cost', 'Annual reporting, disclosure and governance support']
        ]} />
        <div className="warning-box">Exact fees must be verified from NSE / BSE SSE and latest SEBI circulars before hardcoding.</div>
      </Section>

      <Section id="post-listing-compliance" title="Post-Listing Compliance for Social Stock Exchange Entities">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Annual Impact Report', 'Mandatory impact reporting'],
          ['Financial Disclosures', 'Audited financial and utilisation reporting'],
          ['Fund Utilisation', 'Track utilisation against stated objective'],
          ['Material Change Reporting', 'Report major changes in project, governance or social activity'],
          ['Governance Disclosure', 'Board / trustee / management details'],
          ['Instrument Compliance', 'ZCZP or securities compliance as applicable'],
          ['Exchange Reporting', 'Periodic filings with SSE segment'],
          ['Audit / Assurance', 'Applicable financial and social audit requirements']
        ]} />
      </Section>

      <Section id="impact-reporting" title="Social Impact Reporting Framework">
        <DataTable headers={['Impact Area', 'What to Track']} rows={[
          ['Input', 'Funds received and resources deployed'],
          ['Activity', 'Project activities undertaken'],
          ['Output', 'Number of beneficiaries, services delivered or facilities created'],
          ['Outcome', 'Measurable social improvement'],
          ['Impact', 'Long-term social change'],
          ['Utilisation', 'Whether funds were used for stated purpose'],
          ['Verification', 'Audit / social audit / independent review where applicable']
        ]} />
        <p>Weak impact reporting is one of the most common reasons for delay or poor investor / donor confidence.</p>
      </Section>

      <Section id="fund-utilisation" title="Fund Utilisation and Audit">
        <Flow items={['Funds Raised', 'Project-Wise Allocation', 'Separate Tracking', 'Utilisation Certificates', 'Impact Evidence', 'Audit / Assurance', 'Exchange Reporting']} />
        <p>Fund utilisation should match the fundraising document and project objectives. Any material deviation should be reviewed under the applicable exchange and SEBI disclosure framework.</p>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in Social Stock Exchange License in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Weak social impact justification', 'Exchange query or rejection'],
          ['Incomplete financial statements', 'Application delay'],
          ['No 12A / 80G readiness for NPOs', 'Eligibility concern, subject to latest framework'],
          ['Poor governance documentation', 'Due diligence concern'],
          ['Incorrect NPO vs FPE classification', 'Wrong application approach'],
          ['No fund utilisation framework', 'Investor confidence risk'],
          ['No impact reporting system', 'Post-listing compliance risk'],
          ['Assuming listing guarantees funding', 'Commercial misunderstanding'],
          ['Weak board / trustee records', 'Governance query'],
          ['Copy-paste project reports', 'Weak regulatory presentation']
        ]} />
      </Section>

      <Section id="advantages" title="Advantages of Social Stock Exchange License in India">
        <CardGrid columns="md:grid-cols-2" cards={['Access to structured funding', 'Enhanced credibility for NGOs and social enterprises', 'Better visibility before CSR contributors', 'Transparent impact reporting', 'Improved governance standards', 'Regulated donor / investor confidence', 'Reduced dependency on informal fundraising', 'Opportunity to scale social projects', 'Public accountability', 'Long-term sustainability for social impact initiatives'].map((title) => ({ title, body: 'Benefit depends on eligibility, disclosure quality, investor interest and continuing compliance.' }))} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with Social Stock Exchange License in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Eligibility Assessment', body: 'We review whether the applicant qualifies as an NPO or FPE under the Social Stock Exchange framework.' },
          { title: 'Social Intent Mapping', body: 'We help map eligible activities, revenue, expenditure and beneficiary base with the 67% social intent test.' },
          { title: 'Documentation Support', body: 'We assist in compiling constitutional documents, tax registrations, financial statements, governance records and impact documents.' },
          { title: 'Impact Reporting Framework', body: 'We help prepare measurable impact indicators, beneficiary data structure and outcome reporting framework.' },
          { title: 'NSE / BSE SSE Application Support', body: 'We assist with exchange-level application preparation, filing coordination and query responses.' },
          { title: 'ZCZP Instrument Support', body: 'For NPOs, we assist in documentation related to Zero Coupon Zero Principal instrument issuance, subject to exchange framework.' },
          { title: 'Fund Utilisation and Compliance Framework', body: 'We help create fund utilisation tracking, reporting calendar and post-listing compliance framework.' },
          { title: 'Governance Strengthening', body: 'We support board / trustee disclosures, internal controls, compliance calendar and policy documentation.' },
          { title: 'CSR and Donor Readiness', body: 'We help present the organisation’s funding requirement in a structured and compliance-ready manner.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for Social Stock Exchange License in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Understanding', body: 'We understand the SEBI Social Stock Exchange framework, exchange scrutiny and disclosure expectations.' },
          { title: 'Social Impact Documentation Expertise', body: 'We help translate social work into structured impact indicators, beneficiary data and reporting formats.' },
          { title: 'NPO and FPE Structuring Support', body: 'We evaluate whether the applicant should approach SSE as an NPO or For-Profit Social Enterprise.' },
          { title: 'Governance and Compliance Focus', body: 'We focus on board records, audit readiness, utilisation tracking and continuing reporting.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz experience across SEBI, RBI, IRDAI and IFSCA enables broader regulatory judgement.' },
          { title: 'End-to-End Support', body: 'From eligibility review to post-listing compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on Social Stock Exchange License in India">
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
          <p>Expertise: SEBI, RBI, IRDAI, IFSCA, Social Stock Exchange, capital market compliance, NGO regulatory documentation, impact reporting, fundraising compliance and post-listing advisory.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help NGOs, Section 8 companies, trusts, societies, impact startups and social enterprises understand the broad SEBI framework for Social Stock Exchange License in India.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment, CSR, fundraising or financial advice. SEBI requirements, NSE / BSE SSE norms, tax registration requirements, ZCZP conditions, minimum subscription thresholds, impact reporting obligations and approval processes may change from time to time. Applicants should verify the latest SEBI circulars, exchange requirements and tax position before filing any application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to SEBI Compliance Expert">
        <p>Build your Social Stock Exchange License in India application with structured SEBI regulatory support, NPO / FPE eligibility review, social intent mapping, impact reporting framework, documentation, NSE / BSE SSE filing coordination, query response and post-listing compliance assistance.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#0096D6] font-bold rounded-xl border border-blue-200 text-center">Apply for Social Stock Exchange Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check SSE Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
