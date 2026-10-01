'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'diagnosis', title: 'Diagnose Before You File' },
  { id: 'din-vs-disqualification', title: 'DIN Problems Are Not Disqualification' },
  { id: 'section-164', title: 'Section 164 Grounds' },
  { id: 'section-164-2', title: 'Section 164(2) — The Common Case' },
  { id: 'section-167', title: 'Section 167 and Which Office Actually Vacates' },
  { id: 'consequences', title: 'What Disqualification Actually Blocks' },
  { id: 'remedies', title: 'Remedies That Genuinely Exist' },
  { id: 'dir-10', title: 'DIR-10 and What It Is Not' },
  { id: 'struck-off', title: 'Struck-Off Companies and Section 252' },
  { id: 'board', title: 'Board Regularisation' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'forms', title: 'The Forms and What Each Does' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'regulated', title: 'Regulated Entities and Fit-and-Proper' },
  { id: 'who-needs', title: 'Who Needs This' },
  { id: 'common-issues', title: 'Where Directors Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is directors disqualification?', 'A statutory restriction under the Companies Act, 2013 that makes a person ineligible to be appointed or re-appointed as a director, either because of something personal to them or because of a default by a company they were on the board of.'],
  ['Which provision applies?', 'Section 164. Sub-section (1) covers personal grounds such as insolvency, unsoundness of mind, conviction and disqualification by a court or tribunal. Sub-section (2) covers company defaults, and is by far the most common trigger.'],
  ['What triggers Section 164(2)?', 'Most often, a company failing to file financial statements or annual returns for any continuous period of three financial years. It also covers failure to repay deposits or debentures, pay interest on them, or pay a declared dividend, where the default continues for the prescribed period.'],
  ['How long does the disqualification last?', 'Five years, running from the date on which the company committed the default — not from when the MCA published the list or when you found out.'],
  ['Is my DIN being inactive the same as being disqualified?', 'No, and confusing the two is the single most common error here. An inactive DIN is usually a DIR-3 KYC failure and is fixed by filing the KYC. Disqualification is a statutory ineligibility under Section 164 and KYC does nothing for it. You can have an active DIN and still be disqualified, or an inactive DIN without being disqualified at all.'],
  ['Which directorships do I lose?', 'Under the proviso to Section 167(1)(a), a director who incurs disqualification under Section 164(2) vacates office in all companies other than the one that is in default. It is counterintuitive but that is what the proviso says — you keep the seat on the defaulting board and lose the others.'],
  ['Why is it drafted that way?', 'So that the people responsible for the default remain on the board and answerable for putting it right, rather than resigning from the problem and continuing elsewhere. The Madras High Court upheld the proviso against constitutional challenge.'],
  ['Can I just resign from the defaulting company?', 'Resigning does not undo a disqualification that has already been incurred, and it does not cure the company’s default. Where the objective is to regularise, resignation usually makes the position harder rather than easier.'],
  ['What is DIR-10 and does it get me out early?', 'No. DIR-10 is an application for removal of disqualification, filed with the Regional Director under Rule 14(5) of the Companies (Appointment and Qualification of Directors) Rules, 2014. It is the route to clear the record once the five-year period has run, not a way to shorten it.'],
  ['Did DIR-10 always go to the Regional Director?', 'No. It was filed with the Registrar of Companies before the 2023 amendment to the Rules moved it to the Regional Director. Guidance written before that change points at the wrong authority.'],
  ['So is there any way to challenge disqualification before five years?', 'Depending on the facts, a writ petition to the High Court under Article 226 is the realistic route — for example where the disqualification is factually wrong, where the company was struck off without proper notice, or where natural justice was not observed. Whether that is worth pursuing is a case-specific assessment, not a given.'],
  ['Is Section 164(2) retrospective?', 'The Delhi High Court held in Mukut Pathak v. Union of India (2019) that it does not apply to defaults predating 1 April 2014. Where your default window straddles that date, the computation is worth checking carefully.'],
  ['What is DIR-8?', 'A declaration by a person, before appointment or re-appointment, that they are not disqualified. It is given to the company.'],
  ['What is DIR-9?', 'The company’s report to the ROC naming the directors who have become disqualified, required where the company has committed a Section 164(2) default.'],
  ['My company was struck off. What now?', 'Filings are generally blocked until the company is restored. Restoration is through the NCLT under Section 252, and only then can the pending AOC-4 and MGT-7 filings be made.'],
  ['How long do I have to apply for restoration?', 'Two different limits. An appeal under Section 252(1) against the Registrar’s order must be filed within three years of that order. An application under Section 252(3) by the company, a member, a creditor or a workman can be made within twenty years of the notice published in the Official Gazette.'],
  ['Can a company be revived just to close it properly?', 'Yes, and it is a common and sensible outcome. Restoration brings the company back so that filings can be completed and it can then be wound up or struck off lawfully rather than left in limbo.'],
  ['Can a disqualified director sign MCA forms?', 'Generally not, which is what paralyses companies. If every director is disqualified, nobody can sign the filings that would fix the default, and the board has to be reconstructed first.'],
  ['What if all our directors are disqualified?', 'The board has to be regularised before anything else — typically by appointing an eligible director, with the promoter or, in appropriate cases, the statutory route being considered. Until someone eligible can sign, the company cannot dig itself out.'],
  ['Can a disqualified person incorporate a new company?', 'Being appointed as a director of a new company during the disqualification period is restricted, so eligibility must be checked before incorporation rather than after the form is rejected.'],
  ['Does it affect bank accounts?', 'It can. Banks check MCA status and board authority, and a company whose directors show as disqualified may find account operations or KYC refreshes held up.'],
  ['Does it affect fundraising?', 'Yes. Director and promoter status is standard diligence. Disqualification surfaces immediately and can delay or reprice a transaction.'],
  ['Does it affect regulated entities?', 'Regulators including the RBI, SEBI, IRDAI and IFSCA apply fit-and-proper criteria, and a disqualification is relevant to that assessment. Where a licence is involved, the regulatory angle should be handled alongside the MCA one.'],
  ['What is the biggest mistake?', 'Filing before diagnosing. People file DIR-3 KYC expecting it to remove a Section 164 disqualification, or file DIR-10 while the five years are still running, and lose months discovering that the remedy did not match the cause.'],
  ['Can Estabizz handle the whole thing?', 'We handle DIN and status review, cause analysis, associated company mapping, pending filings, DIR forms, Section 252 revival support, board regularisation and ROC, RD and NCLT coordination. Appearance before the Tribunal or a High Court is through advocates.']
] as [string, string][]).map(([q, a]) => ({ q, a }));

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id} className="visible">{title}</h2>{children}</section>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto my-6 rounded-lg border border-blue-100"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return <div className="faq-accordion">{items.map((faq, i) => (
    <details className="faq-item" key={faq.q} id={`faq-${i + 1}`}>
      <summary>{i + 1}. {faq.q}</summary>
      <div className="faq-answer"><p>{faq.a}</p></div>
    </details>
  ))}</div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      faqs={faqs}
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Corporate Compliance' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Directors Disqualification' }]}
      title="Directors Disqualification"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Directors Disqualification"
      sections={sections}
      ctaTitle="Speak With a Director Compliance Expert"
      ctaDescription="Get the cause diagnosed before any form is filed — Section 164, DIN status, strike-off or a data mismatch each need a different remedy."
      quickFacts={[
        { label: 'Main provision', value: 'Section 164(2)' },
        { label: 'Disqualification period', value: '5 years' },
        { label: 'Office vacated', value: 'All other companies' },
        { label: 'DIR-10 goes to', value: 'Regional Director' }
      ]}
      relatedArticles={[
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company petitions, struck-off company restoration, oppression and mismanagement and NCLAT appeals.' },
        { title: 'Demerger', href: '/solutions/legal/demerger', category: 'Legal', description: 'Scheme of arrangement, the NCLT process, tax neutrality and the approvals that decide the timeline.' },
        { title: 'Legal Due Diligence', href: '/services/legal-due-diligence', category: 'Legal', description: 'Comprehensive due diligence for mergers, acquisitions and investment transactions.' }
      ]}
      finalCtaTitle="Diagnosis First, Filing Second"
      finalCtaDescription="Most of the time lost in these matters is spent filing the wrong form for the wrong cause. A status report that identifies whether this is Section 164, a KYC failure, a strike-off or an MCA data error is the cheapest hour of the whole exercise."
      heroDescription={<p>Director disqualification usually surfaces at the worst moment — a funding round, a bank KYC refresh, a new incorporation or an ROC filing that suddenly will not go through. The cause is rarely what the director first assumes. It may be a Section 164(2) default at a company they had half forgotten, a DIR-3 KYC lapse that has nothing to do with disqualification, a strike-off that blocked the filings, or an MCA record that is simply wrong. Estabizz assists directors, promoters, founders and companies with DIN and MCA status review, cause analysis under Section 164, associated company mapping, Section 167 impact assessment, DIR-8, DIR-9 and DIR-10 support, pending AOC-4 and MGT-7 filings, struck-off company revival under Section 252, board regularisation and ROC, RD and NCLT coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> disqualification means the law says you cannot be appointed or re-appointed as a director, for a fixed period, because of a specified default.</p>
        <p>The default is often not yours personally. The most common route into this is Section 164(2): a company you were on the board of stopped filing its annual accounts and returns for three continuous financial years, and every director of that company was caught by the consequence — including directors who had long since stopped being involved.</p>
        <p>The remedy depends entirely on the cause, which is why this page starts with diagnosis rather than forms.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Directors disqualification is not a licence. It is a statutory ineligibility under the Companies Act, 2013, administered through the MCA and the ROC, with the Regional Director, the NCLT and the High Court involved depending on the remedy.</p>
        <p>You do not have to do anything about it — but if you want to join a board, sign MCA forms, revive a company, complete a transaction or satisfy a regulator, you will need to regularise the position.</p>
      </Section>

      <Section id="diagnosis" title="Diagnose Before You File">
        <div className="warning-box" aria-label="Diagnosis first">
          <p><strong>Almost every wasted month in these matters comes from filing before diagnosing.</strong> Directors file DIR-3 KYC expecting it to lift a Section 164 disqualification, or file DIR-10 while the five-year period is still running, or try to file AOC-4 for a company that has been struck off and cannot accept filings at all. Each of those is a real remedy for a different problem. Establish the cause first, then pick the form.</p>
        </div>
        <DataTable headers={['Symptom', 'Likely cause', 'Correct starting point']} rows={[
          ['DIN shows deactivated', 'DIR-3 KYC not filed', 'File the KYC; this is not disqualification'],
          ['DIN active but appointment rejected', 'Section 164 disqualification', 'Identify the defaulting company and the default date'],
          ['Name on an MCA disqualified list', 'Section 164(2) company default', 'Map the company’s pending AOC-4 and MGT-7'],
          ['Company filings will not submit', 'Company struck off', 'Section 252 restoration before anything else'],
          ['Nobody can sign company forms', 'All directors disqualified', 'Board regularisation first'],
          ['Status wrong despite compliance', 'MCA data mismatch or error', 'ROC representation and record correction'],
          ['Disqualified by a court or tribunal order', 'Section 164(1) ground', 'Order-specific appeal or stay strategy'],
          ['Associated with a company you never joined', 'Incorrect DIR-12 record', 'Records correction with supporting evidence']
        ]} />
      </Section>

      <Section id="din-vs-disqualification" title="DIN Problems Are Not Disqualification">
        <p>These are three separate concepts that get used interchangeably, and the confusion sends people to the wrong remedy more often than anything else on this page.</p>
        <DataTable headers={['Point', 'Disqualification', 'DIN deactivation', 'Removal of a director']} rows={[
          ['What it is', 'Statutory ineligibility to hold office', 'The DIN cannot be used for filings', 'The company takes a director off its board'],
          ['Governing provision', 'Section 164', 'DIN rules and the DIR-3 KYC framework', 'Section 169, or resignation under Section 168'],
          ['Typical cause', 'Company default, conviction or court order', 'KYC not filed, or a duplicate DIN', 'Shareholder decision or resignation'],
          ['Effect', 'Cannot be appointed or re-appointed anywhere', 'Cannot sign or file', 'Ceases in that one company only'],
          ['Duration', 'Five years under Section 164(2)', 'Until KYC is filed or the DIN is corrected', 'From the effective date'],
          ['Remedy', 'Depends on cause; time, revival, DIR-10 or writ', 'File DIR-3 KYC', 'DIR-12 and the corporate process'],
          ['Does the other fix it?', 'KYC does nothing for it', 'Time does nothing for it', 'Neither cures a past default']
        ]} />
        <p>The practical test: an active DIN tells you nothing about whether you are disqualified, and filing KYC will not change a Section 164 position by a single day.</p>
      </Section>

      <Section id="section-164" title="Section 164 Grounds">
        <DataTable headers={['Ground', 'Provision', 'Nature']} rows={[
          ['Unsound mind, as declared by a competent court', 'Section 164(1)', 'Personal'],
          ['Undischarged insolvent', 'Section 164(1)', 'Personal'],
          ['Application for insolvency pending', 'Section 164(1)', 'Personal'],
          ['Conviction and sentence as specified', 'Section 164(1)', 'Personal'],
          ['Disqualified by a court or tribunal order', 'Section 164(1)', 'Personal'],
          ['Calls unpaid on shares for the prescribed period', 'Section 164(1)', 'Personal'],
          ['Conviction for a related party transaction offence', 'Section 164(1)', 'Personal'],
          ['DIN not obtained as required', 'Section 164(1)', 'Personal'],
          ['Company failed to file accounts or returns for three continuous financial years', 'Section 164(2)(a)', 'Company default'],
          ['Company failed to repay deposits, redeem debentures, pay interest or pay declared dividend', 'Section 164(2)(b)', 'Company default'],
          ['Additional grounds in the Articles of a private company', 'Section 164(3)', 'Contractual']
        ]} />
      </Section>

      <Section id="section-164-2" title="Section 164(2) — The Common Case">
        <p>This is where the overwhelming majority of disqualifications come from, and its mechanics are worth understanding precisely.</p>
        <DataTable headers={['Element', 'Position']} rows={[
          ['Trigger', 'Non-filing of financial statements or annual returns for any continuous period of three financial years'],
          ['Alternative trigger', 'Deposit, debenture, interest or declared dividend default continuing for the prescribed period'],
          ['Who is caught', 'A person who is or has been a director of the defaulting company'],
          ['Effect', 'Ineligible to be re-appointed in that company, or appointed in any other company'],
          ['Period', 'Five years'],
          ['Runs from', 'The date on which the company committed the default'],
          ['Retrospectivity', 'Held in Mukut Pathak v. Union of India (2019) not to apply to defaults predating 1 April 2014'],
          ['Relevant filings', 'AOC-4 for financial statements; MGT-7 or MGT-7A for the annual return']
        ]} />
        <div className="info-box" aria-label="Date of default">
          <p><strong>The five years run from the default, not from discovery.</strong> Directors frequently assume the clock starts when their name appeared on a published list or when the MCA portal began rejecting their filings. It does not. Working out the actual default date matters, because it can mean the period has already expired — or that it has considerably longer to run than assumed.</p>
        </div>
      </Section>

      <Section id="section-167" title="Section 167 and Which Office Actually Vacates">
        <div className="warning-box" aria-label="Section 167 proviso">
          <p><strong>This is the provision people get backwards, and it matters enormously for group structures.</strong> Under the proviso to Section 167(1)(a), where a director incurs disqualification under Section 164(2), the office becomes vacant <strong>in all the companies other than the company which is in default</strong>. You keep the seat on the defaulting board and lose every other directorship. The instinctive assumption — that you lose the seat at the company that caused the problem — is exactly wrong.</p>
        </div>
        <p>The logic is deliberate. The proviso was inserted by the Companies (Amendment) Act, 2017 to keep the people responsible for a default on the board that has to put it right, rather than letting them walk away from the defaulting entity and carry on elsewhere. The Madras High Court has upheld it against constitutional challenge, describing it as a deterrent against abandoning shell companies.</p>
        <DataTable headers={['Scenario', 'Consequence']} rows={[
          ['Director of one defaulting company only', 'No other office to vacate; the disqualification still bars new appointments'],
          ['Director of a defaulting company and three others', 'Vacates the three others; remains on the defaulting board'],
          ['Group with common directors across entities', 'Every clean entity in the group can lose its board at once'],
          ['Company left below the minimum number of directors', 'Board regularisation becomes urgent'],
          ['Director wants to resign from the defaulting company', 'Does not cure the default or the disqualification']
        ]} />
        <p>For a group with overlapping boards, this is the clause that turns one dormant company&rsquo;s neglected filings into a governance problem across every other entity.</p>
      </Section>

      <Section id="consequences" title="What Disqualification Actually Blocks">
        <DataTable headers={['Consequence', 'Practical impact']} rows={[
          ['Re-appointment in the defaulting company', 'Barred for the disqualification period'],
          ['Appointment in any other company', 'Barred, including a newly incorporated one'],
          ['Vacation of other directorships', 'Under the Section 167(1)(a) proviso'],
          ['Signing MCA forms', 'Generally blocked, which stalls company compliance'],
          ['Board composition', 'The company may fall below the statutory minimum'],
          ['Bank KYC and account operation', 'Banks check MCA status and board authority'],
          ['Investor and acquirer diligence', 'Surfaces immediately and can delay or reprice a deal'],
          ['Regulatory fit-and-proper', 'Relevant to RBI, SEBI, IRDAI and IFSCA assessments'],
          ['Group entities', 'Multiple companies affected through common directors'],
          ['Company revival and closure', 'Both need someone eligible to sign']
        ]} />
      </Section>

      <Section id="remedies" title="Remedies That Genuinely Exist">
        <DataTable headers={['Situation', 'Realistic route']} rows={[
          ['DIN inactive, no Section 164 issue', 'File DIR-3 KYC — straightforward'],
          ['Section 164(2), company still active', 'Complete the pending filings; the disqualification period still runs'],
          ['Section 164(2), company struck off', 'Section 252 restoration at the NCLT, then the pending filings'],
          ['Five-year period has expired', 'DIR-10 to the Regional Director to clear the record'],
          ['Disqualification factually wrong', 'ROC representation, and a writ petition where that fails'],
          ['Strike-off without proper notice', 'Writ petition or Section 252, depending on the facts'],
          ['Default predating 1 April 2014', 'Computation challenge, following Mukut Pathak'],
          ['Court or tribunal order ground', 'Appeal, stay or order-specific relief'],
          ['Never actually a director of that company', 'Records correction with supporting evidence'],
          ['All directors disqualified', 'Board regularisation before any other step']
        ]} />
        <p>Be realistic about what is available. Where a genuine three-year default occurred at a company that genuinely stopped filing, there is usually no mechanism to shorten the five years, and the honest advice is to plan around the period rather than pay to litigate against it.</p>
      </Section>

      <Section id="dir-10" title="DIR-10 and What It Is Not">
        <div className="info-box" aria-label="DIR-10 clarification">
          <p><strong>Two things about DIR-10 are commonly stated wrongly.</strong> First, it goes to the <strong>Regional Director</strong>, not the Registrar of Companies — Rule 14(5) of the Companies (Appointment and Qualification of Directors) Rules, 2014 was amended in 2023 to move it, so older guidance points at the wrong authority. Second, it is the application to have the disqualification removed from the record <strong>once the five-year period has run</strong>. It is not a mechanism for getting out early, and filing it mid-period does not start a negotiation.</p>
        </div>
        <p>Where the disqualification is wrong on the facts rather than simply unexpired, the route is a representation to the ROC and, failing that, a writ petition to the High Court under Article 226. Courts have intervened where companies were struck off without proper service, where the record was factually incorrect, or where the computation swept in defaults predating the provision. Whether any of that applies is a matter for assessment on the documents, not an assumption.</p>
      </Section>

      <Section id="struck-off" title="Struck-Off Companies and Section 252">
        <p>Disqualification and strike-off usually travel together: the company stopped filing, the directors were caught by Section 164(2), and the ROC eventually removed the company from the register. Until the company is restored, the filings that would regularise the position cannot be made at all.</p>
        <DataTable headers={['Route', 'Who can use it', 'Time limit']} rows={[
          ['Section 252(1) appeal against the Registrar’s order', 'A person aggrieved by the order', 'Three years from the date of the order'],
          ['Section 252(3) application for restoration', 'The company, a member, a creditor or a workman', 'Twenty years from publication of the notice in the Official Gazette']
        ]} />
        <div className="warning-box" aria-label="Two different limits">
          <p><strong>These two limits are frequently merged into one and they are not the same.</strong> The three-year window is for appealing the Registrar&rsquo;s order; the twenty-year window is for the restoration application by the company, a member, a creditor or a workman. Advice that a struck-off company is beyond saving after three years is often simply wrong, and companies with real assets have been restored well outside that period.</p>
        </div>
        <DataTable headers={['Step', 'What it involves']} rows={[
          ['Status and record review', 'Strike-off date, Gazette notice and STK history'],
          ['Evidence of operations', 'Bank statements, tax and GST records showing the company was carrying on business'],
          ['Petition preparation', 'NCLT application with supporting documents and affidavits'],
          ['ROC response', 'The Registrar’s report and any conditions sought'],
          ['Restoration order', 'The company returns to the register'],
          ['Pending filings', 'AOC-4, MGT-7 or MGT-7A, ADT-1 and related forms, with additional fees'],
          ['Director status review', 'Position reassessed once the company is compliant'],
          ['Onward decision', 'Continue the business, or close it lawfully']
        ]} />
      </Section>

      <Section id="board" title="Board Regularisation">
        <p>When every director of an operating company is disqualified, the company cannot sign the filings that would fix the default. That deadlock has to be broken before anything else can happen.</p>
        <DataTable headers={['Situation', 'Practical response']} rows={[
          ['One director disqualified', 'Check quorum and who retains signing authority'],
          ['All directors disqualified', 'Appoint an eligible director; consider the promoter and statutory routes'],
          ['Board below the statutory minimum', 'Urgent appointment to restore valid composition'],
          ['Company has active business', 'Board reconstruction takes priority over everything else'],
          ['Bank requires valid authority', 'Updated board resolution and director KYC'],
          ['Company wants to be struck off', 'Eligibility to sign the closure filings must exist first'],
          ['Company wants revival', 'Restoration petition and the evidence file'],
          ['Investor diligence pending', 'A director-risk note with a dated regularisation plan'],
          ['Regulated entity', 'Regulator intimation or approval may be needed for the change']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Companies Act, 2013'],
          ['Disqualification', 'Section 164'],
          ['Vacation of office', 'Section 167'],
          ['DIN framework', 'Sections 153 to 159'],
          ['Annual filings', 'Section 92 for the annual return and Section 137 for financial statements'],
          ['Strike-off and restoration', 'Sections 248 to 252'],
          ['Additional fees', 'Section 403'],
          ['Condonation of delay', 'Section 460, where applicable'],
          ['Adjudication of penalties', 'Section 454'],
          ['Director rules', 'Companies (Appointment and Qualification of Directors) Rules, 2014'],
          ['Strike-off rules', 'Companies (Removal of Names of Companies from the Register of Companies) Rules, 2016'],
          ['Authorities', 'MCA, ROC, Regional Director, NCLT, and the High Court in writ matters'],
          ['Sectoral overlay', 'RBI, SEBI, IRDAI and IFSCA fit-and-proper requirements']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Section 152(3)', 'A person must have a DIN before appointment'],
          ['Sections 153 to 157', 'DIN application, allotment, single-DIN rule and intimation'],
          ['Section 164(1)', 'Personal grounds of disqualification'],
          ['Section 164(2)(a)', 'Non-filing of accounts or returns for three continuous financial years'],
          ['Section 164(2)(b)', 'Deposit, debenture, interest and dividend defaults'],
          ['Section 164(3)', 'Additional grounds a private company may add in its Articles'],
          ['Section 165', 'Limit on the number of directorships'],
          ['Section 167(1)(a) and its proviso', 'Vacation of office in all companies other than the defaulting one'],
          ['Section 168', 'Resignation of a director'],
          ['Section 169', 'Removal of a director by the company'],
          ['Section 170', 'Register of directors and filing of changes'],
          ['Section 248', 'Removal of a company’s name by the Registrar'],
          ['Section 252(1)', 'Appeal to the NCLT within three years of the Registrar’s order'],
          ['Section 252(3)', 'Restoration application within twenty years of the Gazette notice'],
          ['Rule 14(5), Director Rules', 'DIR-10 application to the Regional Director'],
          ['Rule 12A, Director Rules', 'Annual director KYC through DIR-3 KYC']
        ]} />
      </Section>

      <Section id="forms" title="The Forms and What Each Does">
        <DataTable headers={['Form', 'Purpose', 'Filed by']} rows={[
          ['DIR-2', 'Consent to act as a director', 'The proposed director, to the company'],
          ['DIR-3', 'Application for a DIN', 'The applicant'],
          ['DIR-3 KYC or the web service', 'Annual director KYC that keeps the DIN active', 'The DIN holder'],
          ['DIR-5', 'Surrender or cancellation of a DIN in specified cases', 'The DIN holder'],
          ['DIR-6', 'Change in director particulars', 'The DIN holder'],
          ['DIR-8', 'Declaration of non-disqualification before appointment', 'The director, to the company'],
          ['DIR-9', 'Report of disqualified directors following a Section 164(2) default', 'The company, to the ROC'],
          ['DIR-10', 'Application for removal of disqualification after the period expires', 'The director, to the Regional Director'],
          ['DIR-11', 'Intimation of resignation', 'The resigning director'],
          ['DIR-12', 'Appointment, cessation or change of director or KMP', 'The company'],
          ['AOC-4', 'Filing of financial statements', 'The company'],
          ['MGT-7 or MGT-7A', 'Filing of the annual return', 'The company'],
          ['ADT-1', 'Auditor appointment', 'The company'],
          ['NCLT-9', 'Restoration application for a struck-off company', 'The applicant']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Director PAN and DIN', 'Identity and record linkage'],
          ['MCA director master data', 'Disqualification and appointment history'],
          ['List of associated companies', 'Mapping the cause and the Section 167 impact'],
          ['Company master data', 'Status of each associated company'],
          ['Incorporation documents, MOA and AOA', 'Company identity and governance'],
          ['Financial statements', 'Assessing the AOC-4 backlog'],
          ['Annual returns', 'Assessing the MGT-7 or MGT-7A backlog'],
          ['ROC notices and correspondence', 'Default and strike-off history'],
          ['STK notices and STK-7', 'Strike-off analysis and restoration evidence'],
          ['DIR-3 KYC status', 'DIN activation position'],
          ['Board resolutions and DIR-12 records', 'Appointment history and authority'],
          ['Bank statements', 'Evidence of operations for a restoration petition'],
          ['Tax and GST records', 'Further evidence the company was carrying on business'],
          ['NCLT or court orders, if any', 'Existing legal position'],
          ['Sector regulator records', 'Fit-and-proper impact']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'The problem as the director experiences it'],
          ['2', 'DIN and status check', 'Active, deactivated, KYC pending or disqualified'],
          ['3', 'Associated company mapping', 'Every company linked to the DIN'],
          ['4', 'Cause analysis', 'Section 164(1), 164(2), DIN, strike-off or data error'],
          ['5', 'Default date computation', 'When the five years actually started and ends'],
          ['6', 'Section 167 impact review', 'Which directorships have vacated'],
          ['7', 'Remedy mapping', 'Filings, DIR-10 timing, Section 252 revival, writ or waiting'],
          ['8', 'Board regularisation plan', 'Restoring the ability to sign'],
          ['9', 'Document compilation', 'MCA records, financials, notices and affidavits'],
          ['10', 'Application or petition support', 'DIR-10, NCLT or representation documentation'],
          ['11', 'Pending filing plan', 'AOC-4, MGT-7 or MGT-7A, ADT-1 and related forms'],
          ['12', 'Authority follow-up', 'ROC, RD and NCLT coordination'],
          ['13', 'Status tracking', 'DIN, director and company status monitored to closure'],
          ['14', 'Closure report', 'Final director-risk and compliance position']
        ]} />
      </Section>

      <Section id="regulated" title="Regulated Entities and Fit-and-Proper">
        <p>Where a regulated entity is involved, the MCA position is only half the problem. Sector regulators apply their own fit-and-proper criteria and a disqualification is squarely relevant to them.</p>
        <DataTable headers={['Sector', 'What to expect']} rows={[
          ['NBFC and fintech', 'RBI fit-and-proper review and change-in-management scrutiny'],
          ['Payment business', 'Authorisation conditions and management eligibility'],
          ['SEBI intermediary', 'Fit-and-proper criteria for directors and key personnel'],
          ['Insurance intermediary', 'IRDAI approval for director changes'],
          ['IFSCA entity', 'IFSC eligibility and approval requirements'],
          ['Listed company', 'Disclosure obligations and board composition requirements'],
          ['Applicant for a new licence', 'Director eligibility examined as part of the application']
        ]} />
        <p>Where a licence application or renewal is pending, resolve the director position before filing rather than leaving the regulator to find it.</p>
      </Section>

      <Section id="who-needs" title="Who Needs This">
        <DataTable headers={['Who', 'Why']} rows={[
          ['A director shown as disqualified', 'Status review and remedy mapping'],
          ['A company with disqualified directors', 'Board regularisation and filing recovery'],
          ['A founder incorporating a new company', 'Eligibility check before the appointment is rejected'],
          ['A group promoter', 'Group-wide director risk mapping under Section 167'],
          ['A director of a struck-off company', 'Revival assessment and filing route'],
          ['A company in a transaction', 'Clean director and ROC status before diligence'],
          ['An investor', 'Diligence on promoter and director status'],
          ['A regulated entity', 'Fit-and-proper and eligibility review'],
          ['A family business across entities', 'Regularisation across the whole group']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Directors Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Treating it as a DIN problem', 'KYC filed, nothing changes', 'DIN versus disqualification diagnosis'],
          ['Filing DIR-10 during the five years', 'Rejected, time lost', 'Correct timing and authority'],
          ['Sending DIR-10 to the ROC', 'Wrong authority since the 2023 rule change', 'Filed with the Regional Director'],
          ['Assuming the defaulting seat is the one lost', 'Group board consequences missed entirely', 'Section 167 proviso impact mapping'],
          ['Trying to file for a struck-off company', 'Filings cannot be accepted', 'Section 252 restoration first'],
          ['Assuming three years is the restoration limit', 'A revivable company written off', 'Section 252(1) and 252(3) distinguished'],
          ['Computing five years from the published list', 'Wrong start and end dates', 'Default date computed from the record'],
          ['Ignoring pre-2014 defaults in the computation', 'Period overstated', 'Mukut Pathak position applied'],
          ['Resigning to escape the problem', 'Default and disqualification both survive', 'Realistic remedy planning'],
          ['Leaving it until a funding round', 'Deal delayed at the worst moment', 'Early status report and regularisation plan']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['DIN and status review', 'DIN, KYC and MCA director status'],
          ['Cause analysis', 'Section 164(1), 164(2), DIN, strike-off or data error'],
          ['Associated company mapping', 'Every company linked to the director'],
          ['Defaulting company review', 'Pending filings, charges, STK status and master data'],
          ['Section 164 advisory', 'Disqualification period computed and explained'],
          ['Section 167 impact review', 'Which directorships have vacated, across the group'],
          ['DIR-3 KYC support', 'DIN activation'],
          ['DIR-8 and DIR-9 support', 'Declarations and company reporting'],
          ['DIR-10 support', 'Application to the Regional Director at the right time'],
          ['Section 252 revival support', 'NCLT restoration for struck-off companies'],
          ['Pending filing support', 'AOC-4, MGT-7 or MGT-7A, ADT-1 and related forms'],
          ['Board regularisation', 'Eligible appointments and DIR-12'],
          ['ROC and RD coordination', 'Representations and follow-up'],
          ['Regulated entity review', 'Fit-and-proper impact and regulator strategy'],
          ['Due diligence note', 'Transaction-ready director status summary'],
          ['Post-regularisation compliance', 'Filing calendar and monitoring'],
          ['Ticket-based tracking', 'DIN, filings, forms, ROC, NCLT and status updates']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Director disqualification is a diagnosis problem before it is a filing problem. The cause decides everything — whether the answer is a KYC form, a revival petition, a five-year wait or a writ. The directors who lose the most time are the ones who started filing before anyone worked out what had actually gone wrong.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not director-specific or company-specific advice. The cause of a disqualification, the period that applies, which offices vacate and what remedy is available depend on the MCA record, the company&rsquo;s filing history and the facts. Court decisions referred to here are summarised in general terms and their application to a particular case should be confirmed. Forms, rules and filing authorities change; positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides status review, documentation, filing and coordination support; appearance before the Tribunal or a High Court is through advocates. Confirm the current position before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
