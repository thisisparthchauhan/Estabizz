'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'the-clock', title: 'The Three Deadlines That Decide the Case' },
  { id: 'notice-drafting', title: 'What the Notice Must Contain' },
  { id: 'return-reasons', title: 'Bank Return Reasons and What They Mean' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Sections' },
  { id: 'when-to-act', title: 'When You Can Take Action' },
  { id: 'process', title: 'Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'company-liability', title: 'Company and Director Liability' },
  { id: 'recovery-options', title: 'Recovery Options' },
  { id: 'defending', title: 'If You Have Received a Notice' },
  { id: 'notice-vs-others', title: 'Notice vs Recovery Notice vs Civil Suit' },
  { id: 'notice-risks', title: 'Risks in Handling the Notice' },
  { id: 'common-issues', title: 'Issues We Commonly Fix' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is cheque bounce under Section 138?', 'An offence under the Negotiable Instruments Act, 1881 where a cheque issued to discharge a debt or liability is returned unpaid for insufficiency of funds or because it exceeds the arrangement with the bank.'],
  ['How long do I have to send the legal notice?', 'Generally 30 days from the date you receive the bank\'s cheque return memo. Sending it late can defeat the entire action, so the memo date should be recorded carefully.'],
  ['How long does the drawer get to pay?', 'Generally 15 days from receipt of the notice. If payment is made in that window, no offence under Section 138 arises.'],
  ['When must the complaint be filed?', 'Generally within one month of the 15-day payment period expiring. Delay beyond that may require condonation, at the court\'s satisfaction.'],
  ['Where is the complaint filed?', 'Jurisdiction is generally linked to the bank branch where the payee presented the cheque. Getting the forum wrong costs time that the limitation does not allow.'],
  ['Is a cheque valid indefinitely?', 'No. A cheque is generally valid for three months from its date, and a cheque presented after that is returned as stale.'],
  ['What is the presumption under Section 139?', 'The holder is presumed to have received the cheque for the discharge of a debt or liability. The burden then shifts to the drawer to rebut that presumption.'],
  ['Can a company be prosecuted?', 'Yes. Under Section 141, the company and the persons in charge of and responsible for its business at the relevant time may be liable, subject to the statutory defences.'],
  ['Are directors automatically liable?', 'No. Liability depends on the person\'s role and responsibility at the relevant time. Naming every director without role analysis is a common drafting weakness.'],
  ['What is interim compensation?', 'Under Section 143A the court may direct the drawer to pay interim compensation during the trial, subject to the statutory limits and conditions.'],
  ['Is the case tried summarily?', 'Section 143 provides for summary trial in suitable cases, which is intended to keep these matters moving faster than an ordinary criminal trial.'],
  ['Can evidence be given by affidavit?', 'Yes. Section 145 allows the complainant\'s evidence to be given on affidavit, subject to the court\'s directions.'],
  ['Is the bank memo itself evidence?', 'Under Section 146 the bank\'s slip or memo is prima facie evidence of dishonour, which is why preserving the original matters.'],
  ['Can the matter be settled?', 'Yes. Section 147 makes the offence compoundable, and a large proportion of these matters settle rather than run to judgment.'],
  ['What happens on conviction and appeal?', 'Under Section 148 the appellate court may order the appellant to deposit a sum pending appeal against conviction.'],
  ['What if the cheque was given as security?', 'This is a frequently raised defence. Whether it succeeds depends on the evidence about the transaction and whether a legally enforceable debt existed.'],
  ['What if I stopped payment deliberately?', 'A stop-payment instruction does not automatically take the matter outside Section 138. The reason for the return and the underlying liability are examined.'],
  ['What if the notice was not received?', 'Service is a frequent battleground. Proper dispatch to the correct address, with proof, is what usually decides it rather than actual receipt.'],
  ['Can I still recover the money civilly?', 'Yes. A Section 138 prosecution and a civil recovery route address different things, and a summary suit is often run alongside.'],
  ['Does a wrong address defeat the notice?', 'It can. The address used should be the correct and last known one, with dispatch proof retained.'],
  ['What if there are several dishonoured cheques?', 'Each cheque generally has its own cause of action and its own clock. They should be tracked separately rather than bundled.'],
  ['Can the cheque be presented again?', 'A cheque may be presented again within its validity. A fresh cause of action arises on a fresh dishonour and fresh notice.'],
  ['Do BNS, BNSS and BSA apply?', 'Procedure is now under BNSS and evidence under BSA. BNS becomes relevant only where separate facts of cheating, forgery or breach of trust exist alongside the cheque matter.'],
  ['What is the biggest mistake?', 'Missing one of the three deadlines. The case is usually lost on the calendar rather than on the merits.'],
  ['Can Estabizz appear in court?', 'We handle notice drafting, complaint preparation, documentation and coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Cheque Dishonour' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Cheque Bounce' }]}
      title="Cheque Bounce in India"
      readTime="12 min read"
      hideReviewBadge
      focusKeyword="Cheque Bounce in India"
      sections={sections}
      ctaTitle="Speak With a Cheque Bounce Expert"
      ctaDescription="Discuss the notice deadline, complaint preparation, company liability and recovery strategy with the Estabizz team."
      quickFacts={[{ label: 'Main law', value: 'NI Act, 1881' }, { label: 'Key provision', value: 'Section 138' }, { label: 'Notice window', value: '30 days from return memo' }, { label: 'Payment window', value: '15 days from notice' }]}
      relatedArticles={[
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals, suspension of sentence and bail pending appeal.' },
        { title: 'Appeal Before ITAT', href: '/solutions/legal/appeal-before-itat', category: 'Legal', description: 'Income-tax appeal support covering limitation, grounds, paper books and stay applications.' },
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company law and insolvency tribunal support, including restoration and appellate planning.' }
      ]}
      finalCtaTitle="The Clock Started When the Cheque Bounced"
      finalCtaDescription="Section 138 runs on fixed windows, and missing one can end the case regardless of its merits. A short conversation now establishes where you are on the calendar."
      heroDescription={<p>A dishonoured cheque is one of the few disputes where the calendar matters as much as the merits. Section 138 of the Negotiable Instruments Act runs on three fixed windows, and missing any one of them can end the matter before it is heard. Estabizz assists with notice drafting and dispatch, complaint preparation, company and director liability mapping, evidence compilation, settlement strategy and parallel civil recovery.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> where a cheque issued to discharge a debt or liability is returned unpaid for insufficiency of funds, or because it exceeds the arrangement with the bank, Section 138 of the Negotiable Instruments Act, 1881 creates a criminal offence alongside the ordinary civil right to recover.</p>
        <p><strong>From a practical standpoint…</strong> the offence does not arise the moment the cheque bounces. It arises only after a valid notice is served and the drawer fails to pay within the statutory window. Everything downstream depends on getting that sequence right.</p>
        <p>Procedure is now governed by the Bharatiya Nagarik Suraksha Sanhita, 2023 and evidence by the Bharatiya Sakshya Adhiniyam, 2023. The Bharatiya Nyaya Sanhita becomes relevant only where separate facts of cheating, forgery or breach of trust exist alongside the cheque matter.</p>
      </Section>

      <Section id="the-clock" title="The Three Deadlines That Decide the Case">
        <div className="warning-box" aria-label="Limitation note">
          <p><strong>Most Section 138 cases are lost on the calendar, not on the facts.</strong> Three windows run in sequence, and each one starts only when the previous step is properly completed. Record the date on the bank return memo the day you receive it.</p>
        </div>
        <DataTable headers={['Stage', 'Window', 'What starts the clock']} rows={[
          ['Cheque validity', 'Generally 3 months from the date of the cheque', 'The date written on the cheque'],
          ['Legal notice', 'Generally within 30 days', 'Receipt of the bank&rsquo;s cheque return memo'],
          ['Drawer&rsquo;s payment period', 'Generally 15 days', 'Receipt of the notice by the drawer'],
          ['Cause of action', 'Arises on the 16th day', 'Failure to pay within the 15-day window'],
          ['Complaint filing', 'Generally within one month', 'Expiry of the 15-day payment period'],
          ['Delay beyond that', 'Requires condonation', 'Court&rsquo;s satisfaction on sufficient cause']
        ]} />
        <p>If payment is made within the 15-day window, the matter ends there and no offence under Section 138 arises. That window is genuinely an opportunity to settle rather than merely a formality.</p>
      </Section>

      <Section id="notice-drafting" title="What the Notice Must Contain">
        <p>The demand notice is the hinge of the whole case. A defective notice does not merely weaken the complaint — it can prevent the cause of action from arising at all.</p>
        <DataTable headers={['Detail', 'Why it matters']} rows={[
          ['Payee details', 'Identifies the claimant'],
          ['Drawer details', 'Identifies the person liable'],
          ['Cheque number', 'Connects the notice to the dishonoured cheque'],
          ['Cheque date', 'Validity and transaction record'],
          ['Bank name and branch', 'Supports the cheque record and jurisdiction'],
          ['Cheque amount', 'The exact statutory demand'],
          ['Return memo date', 'Triggers the 30-day notice window'],
          ['Dishonour reason', 'The bank&rsquo;s stated reason, as recorded'],
          ['Transaction background', 'Establishes a legally enforceable debt or liability'],
          ['Demand for payment', 'The mandatory demand for the cheque amount'],
          ['The 15-day payment period', 'The statutory opportunity to pay'],
          ['Warning of legal action', 'That a Section 138 complaint will follow'],
          ['Dispatch address', 'Service and proof of dispatch']
        ]} />
        <p>Demand the cheque amount. A notice that demands interest, damages or a rounded-up figure alongside the cheque amount invites an argument that no valid statutory demand was made.</p>
      </Section>

      <Section id="return-reasons" title="Bank Return Reasons and What They Mean">
        <DataTable headers={['Return reason', 'Practical impact']} rows={[
          ['Funds insufficient', 'The classic Section 138 ground'],
          ['Exceeds arrangement', 'Within Section 138 — the arrangement limit was exceeded'],
          ['Account closed', 'Commonly treated as within the provision, and a serious recovery concern'],
          ['Payment stopped by drawer', 'Section 138 may still apply on the facts; legal review needed'],
          ['Signature differs', 'Raises an evidence and defence issue'],
          ['Alteration requires authentication', 'A material alteration defence may arise'],
          ['Account blocked or frozen', 'Liability and surrounding facts must be reviewed'],
          ['Cheque outdated or stale', 'Presentation validity issue; no fresh cause of action'],
          ['Post-dated cheque presented early', 'Timing issue on presentation'],
          ['Refer to drawer', 'The underlying reason has to be established'],
          ['Cheque incomplete', 'Filling authority and evidence review'],
          ['Difference in words and figures', 'A banking and legal issue on the instrument']
        ]} />
        <p>The reason printed on the memo shapes both the complaint and the likely defence, so the memo should be read before the notice is drafted rather than simply attached to it.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main law', 'Negotiable Instruments Act, 1881'],
          ['Key provision', 'Section 138 — dishonour of cheque for insufficiency of funds'],
          ['Presumption', 'Section 139 — presumption in favour of the holder'],
          ['Company liability', 'Section 141 — offences by companies'],
          ['Cognizance', 'Section 142 — cognizance of offences and jurisdiction'],
          ['Summary trial', 'Section 143'],
          ['Interim compensation', 'Section 143A'],
          ['Service of summons', 'Section 144'],
          ['Evidence by affidavit', 'Section 145'],
          ['Bank slip as evidence', 'Section 146'],
          ['Compounding', 'Section 147'],
          ['Deposit pending appeal', 'Section 148'],
          ['Procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['BNS relevance', 'Only where separate cheating, forgery or breach of trust facts exist']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Sections">
        <DataTable headers={['Section', 'Practical relevance']} rows={[
          ['NI Act s. 138', 'The main cheque bounce offence provision'],
          ['s. 139', 'Presumption that the cheque was received for discharge of a debt or liability'],
          ['s. 140', 'Certain defences are not available in prosecution'],
          ['s. 141', 'Liability of the company and persons in charge of its business'],
          ['s. 142', 'Complaint filing, cognizance conditions and jurisdiction'],
          ['s. 143', 'Summary trial mechanism'],
          ['s. 143A', 'Interim compensation during trial'],
          ['s. 144', 'Service of summons'],
          ['s. 145', 'Complainant evidence by affidavit'],
          ['s. 146', 'Bank memo or slip as prima facie evidence'],
          ['s. 147', 'Compounding and settlement'],
          ['s. 148', 'Deposit in appeal against conviction']
        ]} />
      </Section>

      <Section id="when-to-act" title="When You Can Take Action">
        <DataTable headers={['Situation', 'Position']} rows={[
          ['Cheque returned for insufficient funds', 'Section 138 route is available, subject to the notice sequence'],
          ['Cheque exceeds the arrangement with the bank', 'Covered by Section 138'],
          ['Payment stopped by the drawer', 'Does not automatically take the matter outside Section 138'],
          ['Account closed', 'Commonly treated as within the provision, on the facts'],
          ['Signature mismatch', 'Depends on the facts and the reason recorded on the memo'],
          ['Cheque was a gift, not for a debt', 'Section 138 requires a legally enforceable debt or liability'],
          ['Cheque presented after validity', 'Returned as stale; a fresh cause of action does not arise'],
          ['Several cheques dishonoured', 'Each generally carries its own cause of action and its own clock']
        ]} />
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Transaction, cheque and memo review'],
          ['2', 'Memo and date capture', 'The date the return memo was received, recorded'],
          ['3', 'Liability check', 'Confirm a legally enforceable debt or liability exists'],
          ['4', 'Notice drafting', 'Statutory demand notice with correct particulars'],
          ['5', 'Dispatch and proof', 'Service to the correct address, with dispatch proof retained'],
          ['6', '15-day watch', 'Payment window monitored; settlement explored'],
          ['7', 'Complaint drafting', 'Complaint with the cause of action properly pleaded'],
          ['8', 'Jurisdiction check', 'Correct court, linked to the payee&rsquo;s bank branch'],
          ['9', 'Filing', 'Complaint filed within the limitation window'],
          ['10', 'Evidence and affidavit', 'Affidavit evidence and document compilation'],
          ['11', 'Hearing support', 'Coordination through trial and settlement discussions'],
          ['12', 'Recovery follow-through', 'Compounding, compensation or civil recovery']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Original dishonoured cheque', 'The instrument itself'],
          ['Bank return memo', 'Prima facie evidence of dishonour under Section 146'],
          ['Proof of the underlying transaction', 'Establishes a legally enforceable debt or liability'],
          ['Invoices, agreement or loan record', 'Supports the debt'],
          ['Ledger or account statement', 'Shows the outstanding amount'],
          ['Legal notice copy', 'The statutory demand'],
          ['Dispatch proof and tracking', 'Proves service within the window'],
          ['Any reply received', 'Identifies the defence early'],
          ['Correspondence with the drawer', 'Context and admissions'],
          ['Company records, where a company is involved', 'Section 141 role and responsibility mapping'],
          ['Authorisation to file', 'Complaint filing and representation']
        ]} />
      </Section>

      <Section id="company-liability" title="Company and Director Liability">
        <p>Where the cheque is issued by a company, Section 141 extends liability to the company and to the persons who were in charge of and responsible for the conduct of its business at the relevant time.</p>
        <p>That is a role-based test, not a title-based one. Naming every director without analysing who actually controlled the relevant activity is a common weakness in complaints, and equally a common line of defence. Where you are on the receiving end, the role analysis is usually the first thing worth doing.</p>
      </Section>

      <Section id="recovery-options" title="Recovery Options">
        <DataTable headers={['Route', 'What it achieves']} rows={[
          ['Section 138 prosecution', 'Criminal pressure, plus compensation on conviction'],
          ['Interim compensation, s. 143A', 'Payment during trial, subject to statutory limits'],
          ['Compounding, s. 147', 'Settlement and closure at any stage'],
          ['Summary suit', 'Civil recovery of the amount, often run alongside'],
          ['Ordinary civil suit', 'Where the claim goes beyond the cheque'],
          ['Arbitration', 'Where the underlying contract provides for it'],
          ['Insolvency route', 'Where the debtor is a company and the threshold is met']
        ]} />
        <p>The criminal and civil routes address different things and are not alternatives in the usual case. Which combination makes sense depends on the amount, the counterparty and how likely recovery actually is.</p>
      </Section>

      <Section id="defending" title="If You Have Received a Notice">
        <p>A notice is not a conviction, and the 15-day window is real. Payment within it ends the matter under Section 138.</p>
        <DataTable headers={['Check', 'Why it matters']} rows={[
          ['Was the notice sent within 30 days of the memo?', 'A late notice can defeat the action'],
          ['Was it sent to the correct address?', 'Service is a frequent battleground'],
          ['Does a legally enforceable debt exist?', 'Section 138 requires one'],
          ['Was the cheque given as security?', 'A common defence, decided on the evidence'],
          ['Is the amount claimed correct?', 'Overstated claims weaken the notice'],
          ['Is your role correctly stated?', 'Section 141 liability is role-based'],
          ['Is the forum correct?', 'Jurisdiction is linked to the payee&rsquo;s bank branch'],
          ['Is settlement preferable?', 'Section 147 allows compounding at any stage']
        ]} />
      </Section>

      <Section id="notice-vs-others" title="Notice vs Recovery Notice vs Civil Suit">
        <DataTable headers={['Point', 'Cheque bounce notice', 'Legal recovery notice', 'Civil or summary suit']} rows={[
          ['Main purpose', 'Statutory trigger for a Section 138 complaint', 'Demand for payment or settlement', 'Court recovery of money'],
          ['Main law', 'NI Act Section 138', 'Contract and civil law', 'Civil and commercial procedure'],
          ['Timeline critical', 'Yes — 30 days and 15 days', 'Depends on limitation', 'Limitation applies'],
          ['Criminal consequence', 'Yes, a complaint may follow', 'No direct criminal consequence', 'Civil decree only'],
          ['Court filing', 'After non-payment in 15 days', 'Optional', 'Civil or commercial court'],
          ['Settlement pressure', 'High', 'Moderate', 'Depends on the case'],
          ['Best for', 'A dishonoured cheque issued for a debt', 'General outstanding payment', 'A detailed recovery dispute'],
          ['Can be combined', 'Yes, with civil recovery', 'Yes', 'Yes']
        ]} />
        <p>A Section 138 complaint is initiated by written complaint before the Magistrate by the payee or holder in due course. It is not an FIR route, and approaching the police instead of the Magistrate is a common early misstep.</p>
      </Section>

      <Section id="notice-risks" title="Risks in Handling the Notice">
        <DataTable headers={['Risk', 'Practical impact']} rows={[
          ['Notice sent after 30 days', 'The Section 138 complaint may fail at the threshold'],
          ['No proof of delivery', 'Service becomes disputed'],
          ['Wrong cheque details', 'Notice defect'],
          ['Wrong demand amount', 'Opens a challenge to the validity of the demand'],
          ['No proof of enforceable debt', 'Strengthens the defence'],
          ['Wrong party named', 'Weakens the complaint'],
          ['Company and directors not properly pleaded', 'Section 141 problem'],
          ['Complaint filed late', 'Limitation objection'],
          ['Wrong jurisdiction', 'Filing or transfer delay'],
          ['Original cheque not preserved', 'Evidence problem'],
          ['Bank memo not produced', 'Dishonour proof problem'],
          ['Careless settlement messages', 'Risk of admission or waiver'],
          ['Notice reply ignored', 'A defence opportunity is missed']
        ]} />
      </Section>

      <Section id="common-issues" title="Issues We Commonly Fix">
        <DataTable headers={['Issue', 'Risk', 'How we support']} rows={[
          ['Memo date not recorded', 'The 30-day window is miscalculated', 'Date capture at the first consultation'],
          ['Notice sent late', 'Action may fail at the threshold', 'Deadline tracking from the memo date'],
          ['Wrong address used', 'Service disputed', 'Address verification and dispatch proof'],
          ['Debt not evidenced', 'Presumption may be rebutted', 'Transaction document compilation'],
          ['Every director named', 'Complaint weakened', 'Section 141 role mapping'],
          ['Wrong court chosen', 'Refiling while limitation runs', 'Jurisdiction check before filing'],
          ['Multiple cheques bundled', 'Causes of action confused', 'Separate tracking per cheque'],
          ['Settlement not explored', 'Years of litigation over a recoverable sum', 'Compounding strategy under Section 147']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Deadline assessment', 'Establish where the matter sits on the statutory clock'],
          ['Notice drafting and dispatch', 'Statutory demand notice with proof of service'],
          ['Complaint preparation', 'Cause of action pleaded correctly, with jurisdiction checked'],
          ['Evidence compilation', 'Cheque, memo, transaction records and affidavit evidence'],
          ['Company liability mapping', 'Section 141 role and responsibility analysis'],
          ['Defence support', 'Notice review and reply where you are the recipient'],
          ['Settlement and compounding', 'Negotiated closure under Section 147'],
          ['Parallel civil recovery', 'Summary suit or other civil route'],
          ['Advocate coordination', 'Briefing, filing and hearing support'],
          ['Ticket-based tracking', 'Status visibility from notice to closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Cheque bounce matters are decided by the calendar far more often than by the merits. The date on the bank return memo is the single most important fact in the file, and it should be recorded on the day it arrives.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. The statutory windows, jurisdiction and available defences depend on the facts of each case, and parts of this guide are still undergoing professional review. Estabizz provides drafting, documentation and coordination; court appearance is handled through enrolled advocates. Confirm the current position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
