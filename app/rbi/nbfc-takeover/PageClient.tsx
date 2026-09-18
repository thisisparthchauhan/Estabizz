'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'NBFC Takeover in India: Quick Overview' },
  { id: 'what-is', title: 'What is NBFC Takeover in India?' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'who-needs-approval', title: 'Who Needs NBFC Takeover Approval?' },
  { id: 'approval-triggers', title: 'When RBI Prior Approval Becomes Critical' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'rbi-expectations', title: 'Advanced RBI Expectations' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'due-diligence', title: 'Due Diligence Framework' },
  { id: 'hidden-risks', title: 'Hidden Risks in NBFC Takeover' },
  { id: 'process', title: 'Step-by-Step Takeover Process' },
  { id: 'fees', title: 'Fees Structure' },
  { id: 'timeline', title: 'Timeline for NBFC Takeover' },
  { id: 'takeover-vs-fresh', title: 'NBFC Takeover vs Fresh NBFC Licence' },
  { id: 'fema', title: 'FEMA and Foreign Investment Angle' },
  { id: 'post-takeover', title: 'Post-Takeover Compliance' },
  { id: 'post-takeover-strategy', title: 'Post-Takeover Strategic Actions' },
  { id: 'common-mistakes', title: 'Common Mistakes in NBFC Takeover' },
  { id: 'why-professional-support', title: 'Why Professional Support Matters' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our RBI Compliance Expert' }
];

const faqs = ([
  ["What is takeover of an NBFC?", "Takeover of an NBFC means acquisition of control or ownership in a Non-Banking Financial Company through share transfer or change in management, subject to RBI approval."],
  ["Is RBI approval required for NBFC takeover?", "Yes, prior approval of RBI is mandatory.Key cases include:", ["Change in control", "Change in shareholding beyond 26%", "Change in management"]],
  ["What is considered “control” in NBFC takeover?", "Control means the right to appoint majority directors or influence management decisions, as per regulatory guidelines."],
  ["Can an NBFC be purchased like a normal company?", "No, NBFCs are regulated entities. Transfer requires RBI approval and compliance with fit and proper criteria."],
  ["What is the minimum share transfer triggering RBI approval?", "Transfer exceeding 26% of paid-up capital requires prior RBI approval."],
  ["What is a change in management in NBFC context?", "Appointment of new directors leading to more than 30% board change requires RBI approval."],
  ["Is NBFC takeover legal in India?", "Yes, it is permitted, provided all RBI regulations and Companies Act provisions are followed."],
  ["Why do investors prefer NBFC takeover?", "Because it saves time compared to fresh registration and provides immediate operational readiness."],
  ["What is the difference between NBFC acquisition and merger?", "Acquisition involves share purchase, while merger involves combining entities through legal restructuring."],
  ["Can foreign investors take over NBFC?", "Yes, subject to FDI norms and RBI approval."],
  ["What is NBFC due diligence?", "It is a detailed financial, legal, and regulatory review before takeover."],
  ["Is takeover faster than NBFC registration?", "Yes, takeover is generally faster but depends on RBI approval timeline."],
  ["Can dormant NBFC be taken over?", "Yes, but it must meet compliance requirements and RBI scrutiny."],
  ["What is NBFC license continuity after takeover?", "License continues, subject to RBI approval of new management."],
  ["Who regulates NBFC takeover?", "The Reserve Bank of India regulates NBFC takeovers."],
  ["Who can acquire an NBFC?", "Any individual or entity meeting RBI’s fit and proper criteria can acquire an NBFC."],
  ["What is fit and proper criteria?", "It includes:", ["Financial soundness", "Clean track record", "No criminal background"]],
  ["Can a startup acquire an NBFC?", "Yes, if promoters meet RBI eligibility norms."],
  ["Can an existing company acquire NBFC?", "Yes, subject to compliance and RBI approval."],
  ["Is minimum net worth required for takeover?", "Yes, the acquirer must demonstrate financial capability as per regulatory expectations."],
  ["Can directors of another NBFC acquire a new NBFC?", "Yes, provided there is no regulatory restriction."],
  ["Can an NRI acquire NBFC?", "Yes, subject to FEMA and RBI guidelines."],
  ["Can a loss-making NBFC be acquired?", "Yes, but risk assessment is critical."],
  ["Can shell companies acquire NBFC?", "No, RBI discourages non-substantive entities."],
  ["Is prior experience required?", "Preferred but not mandatory; financial and governance capability is key."],
  ["Can a partnership firm acquire NBFC?", "Generally, acquisition is done via companies, not partnerships."],
  ["Can promoters change after takeover?", "Yes, with RBI approval."],
  ["Is credit history of acquirer checked?", "Yes, as part of due diligence."],
  ["Can NBFC takeover be done in phases?", "Yes, but regulatory thresholds must be monitored."],
  ["Is group structure evaluated by RBI?", "Yes, group exposure and structure are examined."],
  ["What is the process of NBFC takeover?", "It involves:", ["Due diligence", "Share purchase agreement", "RBI approval", "Post-transfer filings"]],
  ["When should RBI application be filed?", "Before executing share transfer."],
  ["Is board approval required?", "Yes, from both buyer and seller entities."],
  ["What is RBI application format?", "As prescribed under RBI Master Directions."],
  ["Can takeover happen without RBI approval first?", "No, prior approval is mandatory."],
  ["What documents are filed with RBI?", "Includes KYC, financials, and business plan."],
  ["Is public notice required?", "Yes, as per regulatory guidelines."],
  ["What is share purchase agreement (SP", "?A. Legal agreement defining transfer terms."],
  ["What happens after RBI approval?", "Share transfer and MCA filings are completed."],
  ["Is valuation required?", "Yes, fair valuation is essential."],
  ["What documents are required for NBFC takeover?", "Key documents include:", ["KYC of acquirer", "Financial statements", "Net worth proof"]],
  ["Is business plan required?", "Yes, RBI requires future strategy details."],
  ["Are IT returns required?", "Yes, for financial verification."],
  ["Is bank statement required?", "Yes, to assess financial capacity."],
  ["Is declaration required?", "Yes, regarding fit and proper status."],
  ["What is cost of NBFC takeover?", "Cost includes:", ["Purchase price", "Professional fees", "Compliance costs"]],
  ["Is RBI fee applicable?", "No specific fee, but compliance costs apply."],
  ["What is due diligence cost?", "Depends on complexity of NBFC."],
  ["Are legal fees involved?", "Yes, for agreements and filings."],
  ["Is stamp duty applicable?", "Yes, on share transfer."],
  ["How long does NBFC takeover take?", "Typically 3–6 months depending on RBI processing."],
  ["Can it be done quickly?", "No, regulatory approval takes time."],
  ["What delays approval?", "Incomplete documents or poor compliance history."],
  ["What compliances continue after takeover?", "Includes:", ["RBI returns", "KYC norms", "Audit requirements"]],
  ["Is new registration required?", "No, license continues."],
  ["What happens if takeover is done without RBI approval?", "It is illegal and may attract penalties and cancellation of license."],
  ["Can RBI cancel NBFC license?", "Yes, for non-compliance."],
  ["Can I buy NBFC and start lending immediately?", "Only after ensuring full compliance."],
  ["Can I change business model post takeover?", "Yes, but subject to RBI guidelines."],
  ["How does RBI assess takeover applications?", "Based on:", ["Financial strength", "Governance", "Risk profile"]],
  ["Can layered structures be used for acquisition?", "RBI discourages complex structures."],
  ["Is RBI approval required before signing the Share Purchase Agreement (SP", "?A. Yes, approval is required before final execution. SPA is usually signed conditionally, subject to RBI approval."],
  ["Can escrow arrangements be used in NBFC takeover?", "Yes, escrow is commonly used.", ["Funds are parked safely", "Released after RBI approval", "Protects both parties"]],
  ["Is valuation report mandatory for takeover?", "Yes, a fair valuation report is required to justify share price as per regulatory expectations."],
  ["What role does Chartered Accountant play in takeover?", "CA certifies:", ["Net worth", "Source of funds", "Financial health"]],
  ["Is Company Secretary involvement required?", "Yes, for:", ["Drafting resolutions", "Regulatory filings", "Secretarial compliance"]],
  ["Can RBI reject takeover application?", "Yes, if:", ["Promoters fail fit & proper test", "Financials are weak", "Compliance history is poor"]],
  ["Is background verification done by RBI?", "Yes, RBI conducts detailed checks on promoters and directors."],
  ["Is police verification required?", "In certain cases, RBI may require background checks including declarations."],
  ["What is public notice requirement in NBFC takeover?", "A public notice must be published in newspapers informing stakeholders about proposed takeover."],
  ["Can objections be raised after public notice?", "Yes, stakeholders can raise objections, which RBI may consider."],
  ["What happens if objections are received?", "RBI may:", ["Seek clarification", "Delay approval", "Reject application"]],
  ["Is MCA filing required post takeover?", "Yes, filings include:", ["DIR-12 (director change)", "SH-4 (share transfer)"]],
  ["Is PAN/Aadhaar required for directors?", "Yes, for KYC verification."],
  ["Can conditional approval be granted by RBI?", "Yes, RBI may impose conditions before final approval."],
  ["Is source of funds proof mandatory?", "Yes, acquirer must clearly demonstrate legitimate source of funds."],
  ["Are audited financial statements required?", "Yes, generally for last 3 years."],
  ["Is CIBIL report required?", "Yes, credit history of promoters is evaluated."],
  ["Is net worth certificate required?", "Yes, certified by a Chartered Accountant."],
  ["Are board resolutions required?", "Yes, from both buyer and seller companies."],
  ["Is declaration of non-criminal background required?", "Yes, as part of fit and proper criteria."],
  ["Is organisational structure required?", "Yes, RBI reviews group structure."],
  ["Is business continuity plan required?", "Yes, future operational plan is expected."],
  ["Is compliance history of NBFC reviewed?", "Yes, RBI checks past filings and defaults."],
  ["Are statutory auditor reports required?", "Yes, for financial validation."],
  ["What is typical cost of acquiring NBFC?", "It varies based on:", ["Net worth", "Asset quality", "Compliance status"]],
  ["Are hidden costs involved in NBFC takeover?", "Yes, such as:", ["Past compliance gaps", "Penalties", "Litigation risks"]],
  ["Is GST applicable on professional fees?", "Yes, GST applies on advisory and legal services."],
  ["Do I need to pay for public notice publication?", "Yes, newspaper publication costs are borne by applicant."],
  ["Is valuation cost significant?", "Yes, depending on complexity of NBFC."],
  ["Are compliance rectification costs involved?", "Yes, if NBFC has pending filings or defaults."],
  ["Is stamp duty uniform across India?", "No, stamp duty varies by state."],
  ["Is escrow arrangement costly?", "Yes, banks may charge fees for escrow services."],
  ["Can cost be negotiated with seller?", "Yes, commercial terms are negotiable."],
  ["Is takeover cheaper than fresh NBFC registration?", "Often yes, but depends on NBFC quality."],
  ["What is minimum time for RBI approval?", "Typically 90–120 days under normal conditions."],
  ["Can RBI fast-track approval?", "No formal fast-track exists; timelines depend on case quality."],
  ["What factors impact approval timeline?", "", ["Documentation quality", "Promoter profile", "NBFC compliance history"]],
  ["Does incomplete application delay process?", "Yes, it can significantly delay approval."],
  ["Can application be resubmitted if rejected?", "Yes, after rectifying deficiencies."],
  ["Is follow-up with RBI allowed?", "Yes, through proper professional channel."],
  ["Can takeover be withdrawn mid-way?", "Yes, before approval."],
  ["Is validity period given after approval?", "Yes, RBI may specify timeline for completing transfer."],
  ["What happens if timeline is not met?", "Approval may lapse or require revalidation."],
  ["Can multiple takeovers be processed simultaneously?", "Yes, but each requires separate approval."],
  ["Do new directors need RBI approval?", "Yes, if change exceeds threshold limits."],
  ["Is KYC compliance required post takeover?", "Yes, ongoing KYC norms must be followed."],
  ["Do statutory audits continue?", "Yes, as per Companies Act and RBI norms."],
  ["Is RBI reporting mandatory after takeover?", "Yes, periodic returns must continue."],
  ["Can business model be expanded post takeover?", "Yes, within regulatory framework."],
  ["Is change in registered office allowed?", "Yes, subject to RBI intimation."],
  ["Is change in name allowed?", "Yes, with regulatory approval."],
  ["Are related party transactions monitored?", "Yes, closely by RBI."],
  ["Is internal audit required?", "Yes, for compliance assurance."],
  ["Do prudential norms apply post takeover?", "Yes, including capital adequacy."],
  ["What is penalty for unauthorized takeover?", "Severe penalties including license cancellation."],
  ["Can directors be disqualified?", "Yes, under regulatory violations."],
  ["What happens if false information is submitted?", "Application may be rejected and legal action taken."],
  ["Can NBFC operations be stopped by RBI?", "Yes, for serious non-compliance."],
  ["Is reputational risk involved?", "Yes, regulatory action impacts credibility."],
  ["What is risk of acquiring non-compliant NBFC?", "", ["Penalties", "Operational restrictions", "Increased scrutiny"]],
  ["Can RBI impose conditions post takeover?", "Yes, including restrictions on activities."],
  ["Is AML compliance risk involved?", "Yes, strict AML norms apply."],
  ["What if NBFC has pending litigation?", "Liability transfers to new owners."],
  ["Can past defaults impact new promoters?", "Yes, regulatory burden continues."],
  ["Can I buy NBFC only for license value?", "Not advisable; RBI expects genuine business intent."],
  ["Can NBFC be used for fintech lending immediately?", "Only after ensuring full compliance."],
  ["Can I restructure shareholding after takeover?", "Yes, with RBI approval."],
  ["Can NBFC be converted into another entity?", "No, it remains regulated as NBFC."],
  ["Can I appoint nominee directors?", "Yes, subject to compliance."],
  ["Can takeover be partially funded by loan?", "Yes, but source must be compliant."],
  ["Can I operate NBFC without staff initially?", "No, operational infrastructure is expected."],
  ["Can I change lending products post takeover?", "Yes, within regulatory norms."],
  ["Can NBFC be relocated to another state?", "Yes, with intimation."],
  ["Can I exit NBFC after takeover quickly?", "Yes, but resale requires approval again."],
  ["How does RBI evaluate beneficial ownership?", "RBI examines ultimate control and ownership layers."],
  ["Can layered holding structures be used?", "RBI discourages complex and opaque structures."],
  ["How is source of funds verified in depth?", "Through:", ["Bank trails", "Financial statements", "Tax records"]],
  ["Can PE/VC investors acquire NBFC?", "Yes, subject to regulatory compliance."],
  ["Is FEMA compliance required in foreign takeover?", "Yes, strictly applicable."],
  ["Can RBI impose capital conditions post takeover?", "Yes, based on risk profile."],
  ["What is regulatory risk in NBFC acquisition?", "", ["License cancellation", "Operational restrictions", "Capital requirements"]],
  ["How important is governance framework?", "Critical for approval and ongoing operations."],
  ["Can NBFC takeover trigger group-level scrutiny?", "Yes, RBI reviews entire group exposure."],
  ["Is ultimate beneficial owner disclosure mandatory?", "Yes, as per regulatory guidelines."],
  ["Can RBI inspect NBFC post takeover?", "Yes, inspections can happen anytime."],
  ["What role does risk management play?", "It is central to RBI approval."],
  ["Can digital NBFC models be adopted post takeover?", "Yes, within compliance framework."],
  ["What are red flags RBI looks for?", "", ["Weak financials", "Complex structures", "Poor compliance history"]],
  ["What is the biggest mistake in NBFC takeover?", "Skipping due diligence. It can lead to serious financial and regulatory consequences."]
] as [string, string, string[]?][]).map(([q, a, points]) => ({ q, a, points }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
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

function CheckList({ items }: { items: string[] }) {
  return <ul className="my-6 grid grid-cols-1 gap-2 md:grid-cols-2 !pl-0">{items.map((item) => <li key={item} className="flex items-start gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 text-[14px] leading-6 text-gray-700 !mb-0 list-none"><span className="text-[#10b981] font-bold shrink-0">✔</span><span>{item}</span></li>)}</ul>;
}

function FaqList({ items }: { items: { q: string; a: string; points?: string[] }[] }) {
  return <div className="space-y-3">{items.map((faq) => (
    <details key={faq.q} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer font-semibold text-[#0a1628]">{faq.q}</summary>
      <p className="mt-3 text-sm leading-7 text-gray-600">{faq.a}</p>
      {faq.points && faq.points.length > 0 ? <ul className="mt-2 text-sm leading-7 text-gray-600">{faq.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
    </details>
  ))}</div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '🔄', label: 'RBI Change in Control' }, { emoji: '🔍', label: 'Due Diligence & Fit and Proper' }, { emoji: '📋', label: 'Application & Query Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'RBI Services', href: '/rbi' }, { label: 'NBFC Takeover' }]}
      title="NBFC Takeover in India - Complete Guide to RBI Approval, Process and Compliance Risks"
      heroDescription={<><p><strong>NBFC Takeover in India</strong> is a highly regulated transaction involving the acquisition of control, management or shareholding of a Non-Banking Financial Company, requiring strict compliance with RBI guidelines. Such transactions are closely monitored by the regulator because of the financial system risks involved. For promoters, investors and financial institutions, understanding the legal, regulatory and procedural framework is not just advisable, it is essential.</p><div className="flex flex-wrap gap-2 mt-5">{['RBI Act, 1934', 'Change in Control Approval', '26% Shareholding Trigger', 'Fit and Proper Declaration', 'UBO Disclosure', 'PMLA and AML Review', 'FEMA Route Mapping', 'Post-Takeover Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Plan My NBFC Takeover</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Request Due Diligence</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="28 min read"
      displayYear="2026"
      focusKeyword="NBFC Takeover in India"
      sections={sections}
      ctaTitle="Plan Your Change in Control"
      ctaDescription="Discuss due diligence scope, fit and proper readiness, source of funds, SPA structuring and the RBI application."
      quickFacts={[{ label: 'Regulator', value: 'RBI' }, { label: 'Governing Law', value: 'RBI Act, 1934' }, { label: 'Approval Trigger', value: '26% or control' }, { label: 'RBI Fee', value: 'No fixed fee' }, { label: 'Timeline', value: '2-4 months' }]}
      relatedArticles={[
        { title: 'NBFC for Sale in India', href: '/rbi/nbfc-for-sale', category: 'RBI', description: 'Buying an existing NBFC: valuation, deal structuring and acquisition routes.' },
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india', category: 'RBI', description: 'The fresh licence route, for comparison against a takeover.' },
        { title: 'NBFC Financial Modeling', href: '/rbi/nbfc-financial-modeling', category: 'RBI', description: 'Projection, CRAR and risk planning behind the post-takeover business case.' }
      ]}
      finalCtaTitle="Structure Your NBFC Takeover the Way RBI Expects"
      finalCtaDescription="Estabizz supports the full change-in-control journey: legal, financial, regulatory and operational due diligence, fit and proper readiness, source-of-funds documentation, share purchase agreement structuring, the RBI application, query handling and post-takeover compliance."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to RBI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Plan My NBFC Takeover</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Request Due Diligence</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="NBFC Takeover in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Reserve Bank of India' },
          { title: 'Governing Instruments', body: 'RBI Act, 1934, RBI Master Directions for NBFCs, RBI guidelines on change in control and management, and PMLA compliance' },
          { title: 'What Triggers Approval', body: 'Acquisition of 26 percent or more shareholding, change in control or management, or acquisition through merger or restructuring' },
          { title: 'Core Test', body: 'Fit and proper status of the acquirer, assessed on integrity, financial capability, competence and absence of criminal background' },
          { title: 'Three Pillars RBI Assesses', body: 'Ownership transparency, financial soundness and governance capability' },
          { title: 'Source of Funds', body: 'Must be clearly identifiable. Unexplained funding is a common cause of delay or rejection' },
          { title: 'Ultimate Beneficial Ownership', body: 'Clear UBO disclosure expected, with no layered or opaque structures' },
          { title: 'RBI Application Fee', body: 'No fixed fee. Cost is driven by due diligence, legal documentation and professional fees' },
          { title: 'Indicative Timeline', body: 'Roughly 2 to 4 months for RBI approval, with due diligence, documentation and execution around it' },
          { title: 'Foreign Investment', body: 'Cross-border transactions require dual compliance under both RBI and FEMA' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be evaluated against the target NBFC&rsquo;s category and compliance history, the acquirer&rsquo;s profile and funding structure, the shareholding pattern before and after the transaction, and the latest RBI Master Directions and change-in-control guidelines applicable at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is NBFC Takeover in India?">
        <DataTable headers={['Lens', 'What It Means']} rows={[
          ['In simple terms', 'NBFC takeover means acquiring an existing NBFC instead of applying for a fresh licence'],
          ['From a compliance perspective', 'It involves regulatory approval where there is a change in ownership, control or management'],
          ['Legally speaking', 'It is governed under the RBI Master Directions on NBFCs, particularly the provisions relating to change in control and shareholding']
        ]} />
        <div className="info-box">NBFC takeover is not merely about acquiring shares. It is about satisfying the regulator on three core pillars: ownership transparency, financial soundness and governance capability.</div>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework for NBFC Takeover in India">
        <DataTable headers={['Instrument', 'Relevance']} rows={[
          ['Reserve Bank of India Act, 1934', 'Primary statute governing NBFC regulation and registration'],
          ['RBI Master Directions for NBFCs', 'Operating framework the target NBFC must continue to satisfy'],
          ['RBI Guidelines on Change in Control / Management', 'The specific approval regime applicable to a takeover'],
          ['Prevention of Money Laundering Act (PMLA)', 'AML compliance track record of both the target and the acquirer'],
          ['FEMA, where foreign investment is involved', 'Route, sectoral position and pricing guidelines for cross-border acquisitions']
        ]} />
        <p>As per applicable regulatory guidelines, prior approval is mandatory in specified situations involving transfer of ownership or control.</p>
      </Section>

      <Section id="who-needs-approval" title="Who Needs NBFC Takeover Approval?">
        <CheckList items={['Acquisition of 26 percent or more shareholding', 'Change in control or management', 'Appointment of new directors influencing decision-making', 'Transfer of ownership through share sale']} />
      </Section>

      <Section id="approval-triggers" title="When RBI Prior Approval Becomes Critical">
        <h3>Approval is Mandatory</h3>
        <DataTable headers={['Scenario', 'Position']} rows={[
          ['Change in more than 26 percent shareholding, direct or indirect', 'Prior RBI approval required'],
          ['Transfer of control via agreement or arrangement', 'Prior RBI approval required'],
          ['Change in key management influencing decisions', 'Prior RBI approval required'],
          ['Acquisition through merger or restructuring', 'Prior RBI approval required']
        ]} />
        <h3>Approval May Not Be Required, But Still Risky</h3>
        <DataTable headers={['Scenario', 'Practical Approach']} rows={[
          ['Minor share transfers below the threshold', 'Intimation to RBI is advisable even where approval is not strictly required'],
          ['Internal group restructuring without change in control', 'Document the absence of change in control, and intimate RBI to avoid future disputes']
        ]} />
        <div className="warning-box">Even where approval is not strictly required, intimation to RBI is advisable. An undocumented assumption about the threshold is difficult to defend years later during an inspection.</div>
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for NBFC Takeover">
        <DataTable headers={['Particulars', 'Requirement']} rows={[
          ['Promoter Background', 'Clean track record'],
          ['Financial Strength', 'Adequate net worth'],
          ['Compliance History', 'No regulatory violations'],
          ['Fit and Proper Status', 'Mandatory as per RBI'],
          ['Source of Funds', 'Clearly identifiable']
        ]} />
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Criteria: Practical Understanding">
        <p>Legally speaking, RBI evaluates whether the acquirer is fit and proper based on:</p>
        <CheckList items={['Integrity and reputation', 'Financial capability', 'Competence and experience', 'Absence of criminal background']} />
        <div className="warning-box"><strong>Practical insight:</strong> even a minor adverse remark in background checks can delay approval significantly. Background issues should be identified and explained proactively rather than discovered by RBI during scrutiny.</div>
      </Section>

      <Section id="rbi-expectations" title="Advanced RBI Expectations (Often Missed)">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Ultimate Beneficial Ownership', body: 'Clear UBO disclosure is expected. The regulator must be able to see who ultimately controls the acquiring structure.' },
          { title: 'No Layered Structures', body: 'Layered or opaque holding structures work against the ownership-transparency pillar and invite deeper scrutiny.' },
          { title: 'AML and PMLA Track Record', body: 'A strong AML and PMLA compliance history is assessed for both the target NBFC and the incoming promoter group.' },
          { title: 'Sustained Financial Capability', body: 'Demonstrated capability to fund not just the acquisition but sustained operations afterwards.' }
        ]} />
        <div className="info-box">As per applicable regulatory guidelines, RBI evaluates not just the transaction, but the intent and long-term stability of the acquirer.</div>
      </Section>

      <Section id="documents" title="Documents Required for NBFC Takeover">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Share Purchase Agreement', 'Defines the transaction'],
          ['Board Resolution', 'Approval of the takeover'],
          ['KYC of Acquirer', 'Identity verification'],
          ['Financial Statements', 'Financial capability'],
          ['Net Worth Certificate', 'Eligibility proof'],
          ['Banker’s Report', 'Credibility check'],
          ['Business Plan', 'Future operations'],
          ['Declaration of Fit and Proper', 'Regulatory requirement']
        ]} />
      </Section>

      <Section id="due-diligence" title="Due Diligence Framework (Critical for NBFC Takeover)">
        <p>Before proceeding, a structured due diligence must be conducted across four dimensions.</p>
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: '1. Legal Due Diligence', body: <ul className="!mb-0"><li>Pending litigations</li><li>Regulatory notices</li><li>Compliance history</li></ul> },
          { title: '2. Financial Due Diligence', body: <ul className="!mb-0"><li>Loan book quality</li><li>NPAs and provisioning</li><li>Capital adequacy</li></ul> },
          { title: '3. Regulatory Due Diligence', body: <ul className="!mb-0"><li>RBI filings status</li><li>Past inspection remarks</li><li>KYC and AML adherence</li></ul> },
          { title: '4. Operational Due Diligence', body: <ul className="!mb-0"><li>Business model viability</li><li>Technology systems</li><li>Customer base quality</li></ul> }
        ]} />
      </Section>

      <Section id="hidden-risks" title="Hidden Risks in NBFC Takeover (Real-World Perspective)">
        <p>Many promoters focus only on the licence, and overlook what comes attached to it.</p>
        <DataTable headers={['Overlooked Issue', 'What It Can Lead To']} rows={[
          ['Legacy NPAs affecting future profitability', 'RBI scrutiny'],
          ['Regulatory non-compliance history', 'Business restrictions'],
          ['Weak internal controls', 'Financial losses'],
          ['Poor documentation of the loan book', 'Extended queries and delayed approval']
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Process for NBFC Takeover in India">
        <Timeline steps={[
          { title: 'Conduct legal and financial due diligence', body: 'Cover litigation, regulatory notices, compliance history, loan book quality, NPAs, provisioning and capital adequacy before any price is agreed.' },
          { title: 'Finalise the share purchase agreement', body: 'Define consideration, warranties, indemnity and the regulatory approval condition precedent.' },
          { title: 'Pass board resolutions', body: 'Obtain the required internal approvals from both the acquirer and the target NBFC.' },
          { title: 'File the application with RBI for approval', body: 'Submit the complete dossier with KYC, net worth, source of funds, business plan and fit and proper declarations.' },
          { title: 'RBI reviews fit and proper criteria', body: 'Integrity, financial capability, competence, background checks and the transparency of the ownership structure.' },
          { title: 'Receive approval from RBI', body: 'Approval may carry conditions that must be tracked and satisfied.' },
          { title: 'Execute share transfer and update records', body: 'Complete the transfer, reconstitute the board and update RBI and ROC records.' }
        ]} />
      </Section>

      <Section id="fees" title="Fees Structure">
        <DataTable headers={['Particulars', 'Fees']} rows={[
          ['RBI Application', 'No fixed fee'],
          ['Professional Fees', 'Case-specific'],
          ['Due Diligence Cost', 'Variable'],
          ['Legal Documentation', 'Based on transaction']
        ]} />
      </Section>

      <Section id="timeline" title="Timeline for NBFC Takeover">
        <DataTable headers={['Stage', 'Timeline']} rows={[
          ['Due Diligence', '2-3 weeks'],
          ['Documentation', '2 weeks'],
          ['RBI Approval', '2-4 months'],
          ['Final Execution', '2-3 weeks']
        ]} />
      </Section>

      <Section id="takeover-vs-fresh" title="NBFC Takeover vs Fresh NBFC Licence">
        <DataTable headers={['Particulars', 'NBFC Takeover', 'Fresh NBFC Licence']} rows={[
          ['Time', 'Faster', 'Longer'],
          ['Cost', 'Higher upfront', 'Lower initial'],
          ['Risk', 'Existing liabilities', 'Clean slate'],
          ['Approval Complexity', 'Moderate to high', 'High'],
          ['Business Start', 'Immediate', 'Delayed']
        ]} />
        <p>Promoters comparing the two routes commercially should read this alongside <Link href="/rbi/nbfc-for-sale">NBFC for Sale in India</Link> for valuation and deal structuring, and <Link href="/rbi/nbfc-registration-in-india">NBFC Registration in India</Link> for the fresh licence path.</p>
      </Section>

      <Section id="fema" title="FEMA and Foreign Investment Angle in NBFC Takeover">
        <p>If foreign investment is involved, the transaction must clear a second regulatory layer.</p>
        <CheckList items={['Must comply with FEMA regulations', 'Sector must fall under the automatic or approval route', 'Pricing guidelines must be followed']} />
        <div className="warning-box">According to governing regulations, cross-border transactions require dual compliance under both RBI and FEMA. Businesses should also review <Link href="/fema/compliance-under-fema">compliance under FEMA</Link> before signing.</div>
      </Section>

      <Section id="post-takeover" title="Post-Takeover Compliance">
        <p>According to governing regulations, post-approval compliance is equally critical as pre-approval.</p>
        <CheckList items={['Updated filings with RBI', 'Board reconstitution', 'KYC and AML compliance', 'Maintenance of Net Owned Fund (NOF)', 'Regular returns submission']} />
      </Section>

      <Section id="post-takeover-strategy" title="Post-Takeover Strategic Actions (Often Ignored)">
        <Flow items={['Re-align business strategy', 'Strengthen the risk management framework', 'Upgrade compliance systems', 'Rebuild customer trust and portfolio quality']} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in NBFC Takeover">
        <h3>Basic Mistakes</h3>
        <CheckList items={['Ignoring RBI approval requirements', 'Improper due diligence', 'Unclear source of funds', 'Non-compliance with fit and proper criteria', 'Delay in post-takeover filings']} />
        <h3>Advanced-Level Mistakes</h3>
        <CheckList items={['Treating the NBFC as a shell entity purchase', 'Ignoring capital adequacy post acquisition', 'Not restructuring board governance', 'Weak documentation in the RBI application', 'Underestimating regulatory timelines']} />
      </Section>

      <Section id="why-professional-support" title="Why Professional Support Matters">
        <p>NBFC takeover involves regulatory scrutiny, financial structuring, legal documentation and risk assessment. Even a minor error can result in rejection or regulatory complications.</p>
        <CheckList items={['Proper documentation', 'Faster approval', 'Risk mitigation', 'Compliance assurance']} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with NBFC Takeover">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Four-Dimension Due Diligence', body: 'Legal, financial, regulatory and operational review of the target before price and terms are committed.' },
          { title: 'Fit and Proper Readiness', body: 'Background review of the incoming promoter group, with adverse items identified and addressed before filing rather than during RBI scrutiny.' },
          { title: 'Ownership and Source of Funds', body: 'UBO mapping and source-of-funds documentation that satisfies the transparency pillar without layered structures.' },
          { title: 'Transaction Documentation', body: 'Share purchase agreement, board resolutions, declarations and the supporting business plan.' },
          { title: 'RBI Application and Query Handling', body: 'Filing the change-in-control application and managing clarifications through to approval.' },
          { title: 'Post-Takeover Compliance', body: 'Board reconstitution, RBI and ROC updates, NOF maintenance, returns and the governance upgrades RBI expects afterwards.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on NBFC Takeover in India">
        <p>{faqs.length} questions covering approval triggers, eligibility, due diligence, documents, process, fees, timeline, foreign investment, post-takeover compliance and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <blockquote className="border-l-4 border-[#1677f2] pl-4 italic text-gray-700">NBFC takeover is not merely a transaction. It is a regulatory transition. The real challenge lies not in acquiring the entity, but in satisfying the regulator that the new promoter can uphold financial discipline and governance standards.</blockquote>
          <h3 className="mt-6">Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: RBI, SEBI, IRDAI and IFSCA frameworks, NBFC registration, change in control and takeover approvals, due diligence, FEMA and cross-border structuring, and post-approval regulatory support.</p>
          <p>NBFC Takeover in India offers a strategic route to enter the financial services sector without starting from scratch. However, it demands careful planning, strict regulatory adherence and a well-structured approach. For promoters and investors, the focus should not only be on acquisition, but on long-term compliance, governance and sustainability.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. RBI Master Directions, change-in-control guidelines, shareholding thresholds, fit and proper norms, documentation requirements, FEMA routes and pricing guidelines may change from time to time. Acquirers should verify the latest RBI directions and circulars, and the applicable FEMA position, before signing a share purchase agreement or filing any change-in-control application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our RBI Compliance Expert">
        <p>Structure the takeover so the regulator sees a transparent owner, a funded plan and a governance framework capable of running a regulated lender, with due diligence, documentation and query handling managed end to end.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to RBI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Plan My NBFC Takeover</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Request Due Diligence</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
