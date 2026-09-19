'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'forum', title: 'Getting the Forum Right' },
  { id: 'types', title: 'Types of Proceeding' },
  { id: 'civil', title: 'Civil Proceedings' },
  { id: 'criminal', title: 'Criminal Proceedings' },
  { id: 'commercial', title: 'Commercial Proceedings' },
  { id: 'family', title: 'Family Court Matters' },
  { id: 'writ', title: 'Writ, PIL and Constitutional Matters' },
  { id: 'tribunal', title: 'Tribunal and Commission Proceedings' },
  { id: 'process', title: 'How a Case Actually Runs' },
  { id: 'file-contents', title: 'What a Court File Should Contain' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'interim-relief', title: 'Interim Relief' },
  { id: 'evidence', title: 'Evidence' },
  { id: 'tracking', title: 'Tracking and e-Courts' },
  { id: 'delays', title: 'Why Cases Get Delayed' },
  { id: 'before-you-file', title: 'Strategy Before You File' },
  { id: 'specific-matters', title: 'Specific Matters We Handle' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What counts as court proceedings?', 'Any formal legal step taken before a court, tribunal, commission or judicial forum to resolve a dispute, enforce a right, defend a claim, challenge an order or obtain relief.'],
  ['What decides which forum I go to?', 'The nature of the claim, the value, the territorial connection and whether a statute assigns the matter to a specific tribunal. Several statutes bar civil court jurisdiction over matters given to a tribunal.'],
  ['What happens if I file in the wrong forum?', 'The matter may be returned or dismissed, and limitation continues to run while that plays out. It is the most expensive avoidable mistake in litigation.'],
  ['What is limitation?', 'The statutory time within which a proceeding must be started. Once it expires, the right to sue may be lost even where the underlying claim is good.'],
  ['Do I need a legal notice before filing?', 'It depends on the matter. Some statutes require it, some benefit from it, and in some cases it simply warns the other side. It should be a decision, not a habit.'],
  ['What are pleadings?', 'The formal written case — plaint, petition, written statement or reply. They fix what can be argued later, which is why vague pleadings cause problems at the evidence stage.'],
  ['What is interim relief?', 'Protection sought while the case is pending — an injunction, stay, status quo order, attachment or interim maintenance. It is often the most urgent part of a case.'],
  ['Can an order be passed without hearing me?', 'Ex-parte interim orders are possible. A caveat under CPC Section 148A is the standard preventive step where you expect an application against you.'],
  ['What is the evidence stage?', 'Where the pleaded case is proved — affidavits, documents, witnesses and cross-examination. Assertions that cannot be evidenced tend to fall away here.'],
  ['Are WhatsApp messages and emails admissible?', 'Electronic records are governed by the Bharatiya Sakshya Adhiniyam, 2023 and are admissible subject to the statutory requirements. Preservation and certification matter.'],
  ['How long does a case take?', 'It varies enormously by forum, matter type and pendency. Anyone offering a confident timeline at the outset is guessing.'],
  ['What is execution?', 'The process of enforcing a decree or order once obtained. Winning and recovering are separate exercises, and execution is frequently the longer one.'],
  ['Can I appeal any order?', 'No. Appealability depends on the nature of the order and the governing statute. Some orders are appealable, some are only challengeable in a revision or writ, and some are not challengeable at all.'],
  ['What is a writ petition?', 'A constitutional remedy before a High Court or the Supreme Court, generally against the State or an authority, for enforcement of rights or against illegal action.'],
  ['What is the difference between a tribunal and a court?', 'Tribunals are statutory bodies with jurisdiction over specific subjects, often with their own procedure, forms and appeal route. Civil court jurisdiction is frequently barred where a tribunal has been given the subject.'],
  ['Can I represent myself?', 'A party may generally appear in person, but litigation is procedural as much as substantive, and defects in filing or pleading are hard to repair later.'],
  ['What is a caveat?', 'A preventive filing under CPC Section 148A ensuring the court gives you notice before passing an order on an expected application.'],
  ['What causes most delay?', 'Incomplete filings and defect cycles, service that has not been effected, adjournments, and evidence that was not organised before the stage began.'],
  ['Should I settle?', 'Often. Settlement is not a concession on the merits — for many disputes it is the better commercial outcome, and courts routinely refer matters to mediation.'],
  ['What is a certified copy and why does it matter?', 'The official court copy of an order or judgment. Appeals and further steps generally require it, and the time taken to obtain it can eat into limitation.'],
  ['Does an appeal stay the order below?', 'Not automatically. A stay generally has to be applied for separately, and recovery or enforcement can continue meanwhile.'],
  ['What should I bring to the first consultation?', 'Every document you have, in date order, plus any notice or order received. The chronology matters more than the narrative.'],
  ['Can Estabizz appear in court?', 'We handle case assessment, documentation, drafting support, filing coordination, hearing preparation and tracking. Appearance is through enrolled advocates.'],
  ['What is the single most useful thing I can do?', 'Establish the forum and the limitation position before anything else. Almost every serious litigation problem traces back to one of those two.'],
  ['Do you handle matters outside India?', 'Cross-border matters raise jurisdiction, service and enforcement questions that need to be scoped case by case rather than assumed.'],
  ['What if I have already received a court notice?', 'Do not let the date pass. Reply timelines run independently of how strong your case is, and an ex-parte order is much harder to undo than to prevent.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Litigation Support' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Court Proceedings' }]}
      title="Court Proceedings"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Court Proceedings"
      sections={sections}
      ctaTitle="Speak With a Litigation Support Expert"
      ctaDescription="Discuss forum, limitation, pleadings, interim relief and evidence strategy with the Estabizz team."
      quickFacts={[{ label: 'First question', value: 'Which forum' }, { label: 'Second question', value: 'Limitation position' }, { label: 'Most urgent', value: 'Interim relief' }, { label: 'Decides outcomes', value: 'Evidence' }]}
      relatedArticles={[
        { title: 'Caveat Filing', href: '/solutions/legal/caveat-filing', category: 'Legal', description: 'Preventive filing under CPC Section 148A so no ex-parte order passes without you being heard.' },
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals, suspension of sentence and bail pending appeal.' },
        { title: 'Complaints Before Consumer Court', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Consumer Protection Act, 2019 complaints — forum, limitation and reliefs.' }
      ]}
      finalCtaTitle="Forum and Limitation, Before Anything Else"
      finalCtaDescription="Almost every serious litigation problem traces back to the wrong forum or a missed limitation date. Both are settled in a conversation, not a filing."
      heroDescription={<p>A court case is not only about appearing before a judge. It needs the right forum, a correct filing, a clean limitation position, clear pleadings, complete documents, an evidence strategy, hearing preparation, order tracking and timely next action. Estabizz assists with case assessment, document review, legal notice support, filing coordination, pleadings support, interim relief strategy, evidence compilation, appeal-route review, execution tracking and counsel coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> court proceedings are the formal steps by which a dispute is presented, heard and decided by a court, tribunal or judicial authority.</p>
        <p>They matter because the outcome reaches things that are hard to work around — property, money, business continuity, reputation, liberty, family rights, employment, a licence, a contract, a tax liability or a regulatory approval.</p>
        <p>This page covers the process itself. For specific remedies, see the pages on <Link href="/solutions/legal/appeal-before-high-court">High Court appeals</Link>, <Link href="/solutions/legal/bail-application">bail</Link>, <Link href="/solutions/legal/complaints-before-consumer-court">consumer complaints</Link>, <Link href="/solutions/legal/cheque-bounce-in-india">cheque dishonour</Link>, <Link href="/solutions/legal/appeal-before-nclt">NCLT matters</Link> and <Link href="/solutions/legal/appeal-before-itat">income-tax appeals</Link>.</p>
      </Section>

      <Section id="forum" title="Getting the Forum Right">
        <div className="warning-box" aria-label="Forum note">
          <p><strong>Two questions decide more litigation outcomes than any argument: which forum, and what is the limitation position.</strong> Filing in the wrong forum means the matter may be returned or dismissed while limitation keeps running. Both should be settled before a single page of pleading is drafted.</p>
        </div>
        <DataTable headers={['Factor', 'What it determines']} rows={[
          ['Nature of the claim', 'Civil, criminal, commercial, family, constitutional or statutory'],
          ['Value of the claim', 'Pecuniary jurisdiction in several forums'],
          ['Territorial connection', 'Where the defendant resides or the cause of action arose'],
          ['Statutory assignment', 'Whether a tribunal has been given exclusive jurisdiction'],
          ['Bar on civil jurisdiction', 'Several statutes exclude the civil court where a tribunal exists'],
          ['Stage of the dispute', 'Original, appellate, revisional or execution'],
          ['Relief sought', 'Some reliefs are only available in particular forums']
        ]} />
      </Section>

      <Section id="types" title="Types of Proceeding">
        <DataTable headers={['Type', 'Typical subject matter']} rows={[
          ['Civil', 'Contracts, property, money claims, injunctions, declarations, damages'],
          ['Criminal', 'Offences, investigation, bail, trial, conviction, acquittal, sentence'],
          ['Commercial', 'Business disputes, often with stricter documentation discipline'],
          ['Family', 'Divorce, maintenance, custody, guardianship and matrimonial relief'],
          ['Consumer', 'Defect, deficiency in service and unfair trade practice'],
          ['Writ and constitutional', 'Action against the State or an authority'],
          ['Tribunal and commission', 'Company law, insolvency, tax, regulatory and sectoral matters'],
          ['Execution', 'Enforcing a decree or order already obtained'],
          ['Appellate and revisional', 'Challenging an order of a lower forum']
        ]} />
      </Section>

      <Section id="civil" title="Civil Proceedings">
        <p>Civil proceedings deal with private rights — contracts, property, money, injunctions, declarations, damages and enforcement of civil obligations. They run on the Code of Civil Procedure, and the procedural discipline is as decisive as the merits.</p>
        <p>The practical features that matter most are limitation, correct valuation and court fee, clear relief, and interim protection where the position could change before the case is decided. A caveat under Section 148A is the standard precaution where an ex-parte order is foreseeable.</p>
      </Section>

      <Section id="criminal" title="Criminal Proceedings">
        <p>Criminal proceedings run through investigation, bail, framing of charge, trial, judgment and, where applicable, appeal. Procedure is now under the Bharatiya Nagarik Suraksha Sanhita, 2023, offences under the Bharatiya Nyaya Sanhita, 2023, and evidence under the Bharatiya Sakshya Adhiniyam, 2023.</p>
        <p>Section numbering has changed from the CrPC, IPC and Evidence Act. References carried over from older documents should be mapped before filing, because outdated numbering causes confusion and filing defects.</p>
      </Section>

      <Section id="commercial" title="Commercial Proceedings">
        <p>Commercial disputes carry higher documentation discipline — statements of truth, disclosure obligations, stricter timelines and case management. Matters above the prescribed value may fall within the commercial court framework, which changes both procedure and pace.</p>
        <p>Where the contract contains an arbitration clause, the forum question changes entirely, and that should be checked before any court filing is contemplated.</p>
      </Section>

      <Section id="family" title="Family Court Matters">
        <p>Family matters require legal clarity and a degree of restraint that ordinary civil litigation does not. Divorce, maintenance, custody, guardianship and protection proceedings often run in parallel, and interim orders shape the practical position long before any final decision.</p>
        <p>For contested matrimonial matters specifically, see <Link href="/solutions/legal/contested-divorce">Contested Divorce</Link>.</p>
      </Section>

      <Section id="writ" title="Writ, PIL and Constitutional Matters">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Forum', 'High Court, and the Supreme Court in appropriate cases'],
          ['Against whom', 'Generally the State, its instrumentalities or an authority'],
          ['Typical use', 'Illegal action, absence of jurisdiction, violation of rights, arbitrary decision'],
          ['Alternative remedy', 'Where a statutory remedy exists, the court may require it to be used first'],
          ['Delay', 'Unexplained delay can defeat a writ even where the grievance is good'],
          ['Disputed facts', 'Writ proceedings are generally unsuited to heavy factual disputes'],
          ['PIL', 'Requires genuine public interest and standing, not a private grievance in public form']
        ]} />
      </Section>

      <Section id="tribunal" title="Tribunal and Commission Proceedings">
        <p>A large share of regulated-sector disputes never reaches a civil court, because a statute has given the subject to a tribunal and barred the civil court&rsquo;s jurisdiction. Tribunals have their own procedure, forms, limitation and appeal routes.</p>
        <DataTable headers={['Forum', 'Subject matter', 'Appeal generally lies to']} rows={[
          ['NCLT', 'Company law and insolvency', 'NCLAT'],
          ['ITAT', 'Income-tax appeals', 'High Court, on a question of law'],
          ['Consumer Commissions', 'Consumer disputes', 'The next Commission in the hierarchy'],
          ['GST Appellate Authority', 'GST orders', 'GST Appellate Tribunal'],
          ['Sectoral regulators and appellate tribunals', 'Regulated-sector orders', 'As the governing statute provides']
        ]} />
      </Section>

      <Section id="process" title="How a Case Actually Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Case assessment', 'Merits, objective and realistic outcome'],
          ['2', 'Forum and jurisdiction', 'The correct court or tribunal'],
          ['3', 'Limitation check', 'Filing deadline and condonation risk'],
          ['4', 'Legal notice, where appropriate', 'Pre-litigation demand'],
          ['5', 'Document and evidence review', 'What exists, and what is missing'],
          ['6', 'Pleadings', 'Plaint, petition, written statement or reply'],
          ['7', 'Annexure indexing', 'A file the court can actually use'],
          ['8', 'Filing and court fee', 'Filing, defect removal and numbering'],
          ['9', 'Service', 'Notice on the opposite party'],
          ['10', 'Interim applications', 'Injunction, stay, protection or attachment'],
          ['11', 'Evidence stage', 'Affidavits, documents and cross-examination'],
          ['12', 'Arguments', 'Final submissions'],
          ['13', 'Order or decree', 'Certified copy and next-step assessment'],
          ['14', 'Appeal or execution', 'Challenge the order, or enforce it']
        ]} />
      </Section>

      <Section id="file-contents" title="What a Court File Should Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Correct cause title and forum', 'Maintainability starts here'],
          ['Clear factual chronology', 'The court needs the sequence, not the narrative'],
          ['Specific relief sought', 'Vague prayers produce vague orders'],
          ['Jurisdiction averment', 'Territorial and pecuniary'],
          ['Limitation position', 'Addressed upfront where there is any delay'],
          ['Indexed annexures', 'Documents that cannot be found are documents not considered'],
          ['Supporting affidavit', 'Verification of the facts pleaded'],
          ['Court fee and valuation', 'Defects here stall the filing'],
          ['Vakalatnama and authorisation', 'Representation and, for companies, board authority'],
          ['Interim application, where needed', 'Filed with the main matter, not after the harm']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The agreement, contract or instrument', 'The basis of the claim or defence'],
          ['Correspondence and notices', 'Conduct and the cause of action date'],
          ['Payment and financial records', 'Quantum and valuation'],
          ['Property or title documents', 'Property matters'],
          ['The order or notice being challenged', 'Appeals, writs and tribunal matters'],
          ['Prior orders in related proceedings', 'Context and parity'],
          ['Electronic records', 'Messages, emails and call records'],
          ['Identity and address proof', 'Filing and jurisdiction'],
          ['Board resolution, for a company', 'Authority to litigate'],
          ['Vakalatnama', 'Representation']
        ]} />
      </Section>

      <Section id="interim-relief" title="Interim Relief">
        <p>Interim relief is frequently the most urgent part of a case, because the position on the ground can change before the matter is decided. An injunction, stay, status quo order, attachment before judgment or interim maintenance may all be sought at the outset.</p>
        <p>The mirror image matters just as much. Where you expect an application against you, a caveat under CPC Section 148A obliges the court to give you notice, so an ex-parte order is not obtained behind your back. See <Link href="/solutions/legal/caveat-filing">Caveat Filing</Link>.</p>
      </Section>

      <Section id="evidence" title="Evidence">
        <p>Evidence is the backbone of any proceeding. Assertions that cannot be evidenced fall away at exactly the point they are needed, and inconsistency between pleadings and documents is more damaging than a weak point honestly pleaded.</p>
        <p>Electronic records are governed by the Bharatiya Sakshya Adhiniyam, 2023. Messages, emails, call records and digital documents are admissible subject to the statutory requirements, which makes preservation and certification as important as the content itself.</p>
      </Section>

      <Section id="tracking" title="Tracking and e-Courts">
        <DataTable headers={['What to track', 'Why']} rows={[
          ['Filing and case number', 'Everything downstream references it'],
          ['Defects and objections', 'Unattended defects stall a matter silently'],
          ['Service status', 'A case cannot progress until service is effected'],
          ['Next hearing date', 'Missed dates cause adverse orders'],
          ['Interim application status', 'Often more urgent than the main matter'],
          ['Orders passed', 'Certified copies are needed for next steps'],
          ['Limitation for the next step', 'Appeal and execution windows run from the order']
        ]} />
      </Section>

      <Section id="delays" title="Why Cases Get Delayed">
        <DataTable headers={['Cause', 'How it is avoided']} rows={[
          ['Incomplete filing', 'Complete the checklist before filing, not after a defect notice'],
          ['Service not effected', 'Correct addresses and prompt follow-up'],
          ['Unindexed documents', 'Index and paginate from the start'],
          ['Evidence not ready at the stage', 'Prepare before the stage opens, not when it is called'],
          ['Repeated adjournments', 'Availability planned and briefs ready'],
          ['Wrong forum discovered late', 'Forum settled before drafting'],
          ['Certified copy delays', 'Applied for immediately after the order'],
          ['No follow-through after the order', 'Appeal or execution assessed at once']
        ]} />
      </Section>

      <Section id="before-you-file" title="Strategy Before You File">
        <DataTable headers={['Question', 'Why it comes first']} rows={[
          ['What outcome do you actually want?', 'Relief shapes forum, and sometimes settlement is the answer'],
          ['Which forum has jurisdiction?', 'Wrong forum costs time that limitation does not allow'],
          ['Where does limitation stand?', 'It can end the matter before the merits are reached'],
          ['What evidence exists today?', 'Pleadings should be written to the evidence, not the grievance'],
          ['Is interim protection needed?', 'If the position can change, it is needed at filing'],
          ['Is a notice required or useful?', 'Sometimes mandatory, sometimes counterproductive'],
          ['Is the other side worth suing?', 'A decree against an empty shell is an expensive document'],
          ['What does the whole route cost?', 'Filing, evidence, appeal and execution, not just the first stage']
        ]} />
      </Section>

      <Section id="specific-matters" title="Specific Matters We Handle">
        <DataTable headers={['Matter', 'Where to read more']} rows={[
          ['Criminal appeal to the High Court', 'Appeal Before High Court'],
          ['Bail, anticipatory and default bail', 'Bail Application'],
          ['Cheque dishonour under Section 138', 'Cheque Bounce in India'],
          ['Consumer disputes', 'Complaints Before Consumer Court'],
          ['Company law and insolvency', 'Appeal Before NCLT'],
          ['Income-tax appeals', 'Appeal Before ITAT'],
          ['Contested matrimonial matters', 'Contested Divorce'],
          ['Preventive filing against ex-parte orders', 'Caveat Filing'],
          ['Drug regulatory prosecution and defence', 'Adulteration of Drugs']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case assessment', 'Merits, objective and realistic outcome'],
          ['Forum and jurisdiction review', 'The correct court or tribunal'],
          ['Limitation review', 'Deadlines and condonation strategy'],
          ['Legal notice support', 'Pre-litigation demand where appropriate'],
          ['Pleadings support', 'Plaint, petition, written statement or reply'],
          ['Document and evidence compilation', 'Indexed, court-ready files'],
          ['Interim relief strategy', 'Injunction, stay, protection or caveat'],
          ['Filing coordination', 'Filing, court fee and defect removal'],
          ['Hearing preparation', 'Briefing notes and chronologies for counsel'],
          ['Order tracking', 'Certified copies and next-step assessment'],
          ['Appeal-route review', 'Whether, where and by when an order can be challenged'],
          ['Execution tracking', 'Turning a decree into actual recovery'],
          ['Counsel coordination', 'Briefing and appearance support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Most litigation is lost on procedure rather than merit. Forum, limitation and evidence decide the case long before argument does — and all three are settled cheaply at the start, or expensively in the middle.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Forum, limitation, procedure and available relief depend entirely on the facts and the governing statute, and parts of this guide are still undergoing professional review. Estabizz provides case assessment, drafting support, documentation, filing coordination and tracking; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
