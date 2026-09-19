'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'bnss-sections', title: 'Important BNSS Sections' },
  { id: 'which-law-applies', title: 'Where BNS, BNSS and BSA Apply' },
  { id: 'types', title: 'Types of Appeal' },
  { id: 'who-should-file', title: 'Who Should Consider Filing' },
  { id: 'services', title: 'Our Appeal Services' },
  { id: 'process', title: 'Process for Filing' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'common-issues', title: 'Issues We Commonly Fix' },
  { id: 'client-concerns', title: 'What Clients Ask For' },
  { id: 'reducing-delay', title: 'How We Reduce Delay' },
  { id: 'why-estabizz', title: 'Why Estabizz Fintech' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is an Appeal Before High Court?', 'A legal remedy used to challenge certain judgments, convictions, acquittals, sentences or orders before the jurisdictional High Court.'],
  ['Is an Appeal Before High Court a licence?', 'No. It is not a licence or registration. It is a judicial remedy available under the applicable legal framework.'],
  ['Which law applies to criminal appeals before the High Court now?', 'For criminal matters the main procedural law is the BNSS, 2023. The BNS, 2023 governs offences and punishments, and the BSA, 2023 governs evidence.'],
  ['Can old IPC and CrPC sections still be used?', 'For matters governed by the new criminal laws, references should be aligned with BNS, BNSS and BSA. Old references may create confusion if not properly mapped.'],
  ['Who can file an appeal against conviction?', 'A convicted person may appeal depending on the court that passed the conviction, the sentence imposed and the applicable BNSS provisions.'],
  ['Can a conviction by Sessions Court be appealed before High Court?', 'Yes, in specified cases under BNSS a person convicted by a Sessions Judge or Additional Sessions Judge may appeal to the High Court.'],
  ['Can the victim file an appeal?', 'Yes. BNSS recognises victim appeal in specified situations, including acquittal, conviction for a lesser offence or inadequate compensation, subject to the applicable procedure.'],
  ['Can an acquittal be challenged before High Court?', 'Yes, in specified cases. Leave or special leave of the High Court may be required depending on the nature of the case.'],
  ['Is there a limitation period for filing appeal?', 'Yes, and filing is time-sensitive. The exact limitation depends on the nature of the appeal, the order, the party and the applicable law. Immediate legal review is advisable.'],
  ['What if the appeal is delayed?', 'A delay condonation application may be required. The delay should be properly explained with supporting facts and documents.'],
  ['Can bail be granted after conviction?', 'In suitable cases the appellate court may suspend the sentence and grant bail pending appeal, subject to legal conditions and the merits of the case.'],
  ['What is suspension of sentence?', 'Temporary suspension of execution of the sentence during the appeal, generally accompanied by bail or bond conditions.'],
  ['Can the High Court take additional evidence in appeal?', 'Yes. BNSS permits the appellate court to take additional evidence, or direct it to be taken, in appropriate cases after recording reasons.'],
  ['Can High Court reduce the sentence?', 'Depending on the case, the appellate court may alter the nature or extent of the sentence within the powers available under BNSS.'],
  ['Can High Court enhance the sentence?', 'In specified appeals relating to inadequacy of sentence, enhancement may be considered, but the accused must be given an opportunity to show cause.'],
  ['Can appeal be dismissed at admission stage?', 'Yes. An appellate court may summarily dismiss an appeal if it finds no sufficient ground for interference, subject to procedural safeguards.'],
  ['What documents are required?', 'Generally the certified judgment copy, sentence order, FIR, charge sheet, depositions, exhibits, bail orders and lower court records.'],
  ['Is a certified copy compulsory?', 'A certified copy of the judgment or order is normally required for filing, unless the court permits otherwise.'],
  ['Can a complainant appeal against acquittal?', 'In complaint cases the complainant may seek special leave to appeal against acquittal before the High Court, subject to BNSS requirements.'],
  ['Can Estabizz directly argue the matter in High Court?', 'No. Estabizz provides legal research, documentation, drafting coordination and advocate support. Court appearance is handled through enrolled advocates as required by law.'],
  ['How urgent is a High Court appeal?', 'Very urgent. Limitation, custody status, sentence suspension and certified copy timelines can materially affect the legal position.'],
  ['What is the biggest mistake in High Court appeals?', 'Filing a weak, generic appeal without proper evidence analysis, limitation review and legal grounds.'],
  ['Is BSA important in appeal?', 'Yes, particularly where the appeal involves admissibility, relevance, contradiction, electronic evidence or appreciation of evidence.'],
  ['Can business owners seek High Court appeal support?', 'Yes. Business owners, directors, professionals and companies may require appeal support in criminal, regulatory or prosecution-related matters.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Criminal Appeals' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Appeal Before High Court' }]}
      title="Appeal Before High Court"
      readTime="12 min read"
      hideReviewBadge
      focusKeyword="Appeal Before High Court"
      sections={sections}
      ctaTitle="Speak With a High Court Appeal Expert"
      ctaDescription="Discuss maintainability, limitation, grounds of appeal and suspension of sentence with the Estabizz team."
      quickFacts={[{ label: 'Nature', value: 'Judicial remedy, not a licence' }, { label: 'Procedural law', value: 'BNSS, 2023' }, { label: 'Appeals chapter', value: 'Chapter XXXI, ss. 413–435' }, { label: 'Forum', value: 'Jurisdictional High Court' }]}
      relatedArticles={[
        { title: 'Adulteration of Drugs Legal Services', href: '/solutions/legal/adulteration-of-drugs-legal-services', category: 'Legal', description: 'CDSCO and State Drug Control notices, sample failure, recall and prosecution defence.' },
        { title: 'GST Appeal Services India', href: '/services/gst-appeal-services', category: 'Compliance', description: 'Section 107 appeals, pre-deposit, grounds of appeal and GST litigation strategy.' }
      ]}
      finalCtaTitle="Do Not Let the Limitation Period Become the Problem"
      finalCtaDescription="A High Court appeal can affect custody, reputation, business continuity and future legal remedies. A short discussion today can save weeks of filing defects and avoidable delay."
      heroDescription={<p>A High Court appeal is not simply a second chance. It is a statutory remedy where the facts, documents, grounds and timelines all have to be handled precisely. Estabizz assists with conviction and acquittal appeals, sentence matters, suspension of sentence, bail pending appeal, evidence review and counsel coordination under the BNS, BNSS and BSA framework.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With a Legal Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp for Urgent Case Review</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> an appeal before the High Court asks the Court to examine whether the lower court&rsquo;s judgment or order is legally correct, factually sustainable and procedurally fair.</p>
        <p>The High Court may examine the trial court record, grounds of appeal, evidence, legal submissions and procedural compliance. Depending on the case it may confirm the order, set it aside, modify the sentence, order retrial, take additional evidence, or grant interim protection such as suspension of sentence and bail pending appeal.</p>
        <p><strong>From a compliance perspective…</strong> the appeal requires disciplined legal documentation. A general or emotionally drafted appeal is not advisable. The grounds must be legally sustainable, evidence-based and aligned with the relevant provisions of BNSS, BNS and BSA.</p>
        <p>Delay in filing, weak grounds, incomplete certified copies, improper annexures, a missing bail application, poor chronology or failure to highlight material contradictions can all seriously affect the appeal strategy.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main procedural law', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Offence law', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Evidence law', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Earlier laws replaced', 'CrPC, IPC and Indian Evidence Act references should be updated to BNSS, BNS and BSA wherever applicable'],
          ['Appellate forum', 'Jurisdictional High Court'],
          ['Key BNSS chapter', 'Chapter XXXI — Appeals'],
          ['Important BNSS sections', 'Sections 413 to 435, depending on the nature of the appeal'],
          ['Additional legal support', 'High Court Rules, Limitation Act principles and judicial precedents']
        ]} />
      </Section>

      <Section id="bnss-sections" title="Important BNSS Sections">
        <DataTable headers={['Section', 'Practical relevance']} rows={[
          ['BNSS 413', 'Appeal lies only where provided by BNSS or other applicable law; victim appeal is recognised in specified cases'],
          ['BNSS 415', 'Appeal from conviction, including appeal to the High Court in specified serious conviction cases'],
          ['BNSS 416', 'Restriction on appeal where the accused pleads guilty, except in limited sentence-related situations'],
          ['BNSS 417', 'No appeal in certain petty cases, subject to exceptions'],
          ['BNSS 418', 'Appeal by State Government against inadequate sentence'],
          ['BNSS 419', 'Appeal in case of acquittal, including the requirement of leave or special leave in specified cases'],
          ['BNSS 420', 'Appeal to the Supreme Court in certain cases where the High Court reverses acquittal and imposes a serious sentence'],
          ['BNSS 423', 'Petition of appeal and requirement of judgment or order copy'],
          ['BNSS 425', 'Summary dismissal of appeal after preliminary examination'],
          ['BNSS 426', 'Procedure for hearing appeals not dismissed summarily'],
          ['BNSS 427', 'Powers of the Appellate Court'],
          ['BNSS 429', 'Certification of High Court appeal order to the lower court'],
          ['BNSS 430', 'Suspension of sentence pending appeal and release on bail'],
          ['BNSS 432', 'Additional evidence at the appellate stage'],
          ['BNSS 433', 'Procedure where High Court appeal judges are equally divided'],
          ['BNSS 434', 'Finality of appellate judgments and orders'],
          ['BNSS 435', 'Abatement of appeals']
        ]} />
      </Section>

      <Section id="which-law-applies" title="Where BNS, BNSS and BSA Apply">
        <DataTable headers={['Law', 'Role in a High Court appeal']} rows={[
          ['BNS, 2023', 'Determines the offence, punishment, ingredients of the offence and sentence framework'],
          ['BNSS, 2023', 'Provides the procedure for appeal, hearing, bail, suspension of sentence and appellate powers'],
          ['BSA, 2023', 'Governs relevance, admissibility and appreciation of evidence, including documentary and electronic evidence'],
          ['High Court Rules', 'Govern filing format, court fees, indexing, listing, affidavit, vakalatnama and procedural requirements']
        ]} />
      </Section>

      <Section id="types" title="Types of Appeal">
        <DataTable headers={['Type of appeal', 'Who may file', 'Typical objective']} rows={[
          ['Against conviction', 'Convicted accused', 'Set aside conviction, reduce sentence or seek acquittal'],
          ['Against acquittal', 'State, complainant or authorised party, subject to law', 'Challenge the acquittal order'],
          ['Against inadequate sentence', 'State or Central Government in specified cases', 'Seek enhancement of sentence'],
          ['Victim appeal', 'Victim in specified cases', 'Challenge acquittal, lesser conviction or inadequate compensation'],
          ['With suspension of sentence', 'Convicted person', 'Seek interim relief during pendency of appeal'],
          ['Involving an evidence issue', 'Affected party', 'Challenge improper appreciation or rejection of evidence']
        ]} />
      </Section>

      <Section id="who-should-file" title="Who Should Consider Filing">
        <DataTable headers={['Situation', 'Why a High Court appeal may be required']} rows={[
          ['Conviction passed by Sessions Court', 'The High Court may examine legality and appreciation of evidence'],
          ['Sentence is harsh or disproportionate', 'Appeal may seek reduction or modification'],
          ['Acquittal appears legally unsustainable', 'State or complainant may explore the appeal route'],
          ['Important evidence ignored', 'Grounds can be framed around material non-consideration'],
          ['Contradictions not appreciated', 'Appeal may highlight inconsistencies in the evidence'],
          ['Procedure was defective', 'Procedural irregularity may affect fairness of trial'],
          ['Bail required after conviction', 'Suspension of sentence and bail may be pursued'],
          ['Business or professional reputation affected', 'Timely appeal strategy becomes crucial']
        ]} />
      </Section>

      <Section id="services" title="Our Appeal Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case paper review', 'Review judgment, evidence, depositions, exhibits and procedural history'],
          ['Maintainability check', 'Assess whether appeal lies before the High Court and under which provision'],
          ['Limitation review', 'Check filing timeline and delay condonation requirement'],
          ['Grounds of appeal drafting', 'Prepare legally structured and evidence-linked grounds'],
          ['Suspension of sentence application', 'Assist in drafting the application for sentence suspension and bail'],
          ['Acquittal appeal support', 'Support complainant or State-side coordination where applicable'],
          ['Evidence analysis', 'Review documents, witness statements and electronic evidence issues under BSA'],
          ['Chronology preparation', 'Prepare a clean event-wise chronology for counsel strategy'],
          ['Annexure compilation', 'Organise judgment copies, depositions, exhibits and lower court records'],
          ['Legal research note', 'Prepare issue-wise research for advocate briefing'],
          ['Counsel coordination', 'Coordinate with arguing counsel, senior counsel and the filing team'],
          ['Ongoing tracking', 'Track listing, objections, defects, orders and next steps']
        ]} />
      </Section>

      <Section id="process" title="Process for Filing">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Case facts and urgency assessment'],
          ['2', 'Judgment review', 'Appeal scope and maintainability note'],
          ['3', 'Document collection', 'Certified copy, trial records, exhibits and order sheets'],
          ['4', 'Limitation check', 'Filing deadline and delay risk assessment'],
          ['5', 'Ground preparation', 'Legal grounds based on facts, evidence and procedure'],
          ['6', 'Drafting', 'Appeal memo, applications, affidavits and index'],
          ['7', 'Filing support', 'Court filing coordination and defect removal'],
          ['8', 'Interim relief', 'Bail or suspension of sentence strategy, where applicable'],
          ['9', 'Hearing support', 'Brief notes, case law support and counsel coordination'],
          ['10', 'Order tracking', 'Certified order, compliance and next legal step']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Certified copy of judgment', 'Mandatory basis for the appeal'],
          ['Order on sentence, if separate', 'Sentence challenge and bail strategy'],
          ['FIR or complaint copy', 'Case background'],
          ['Charge sheet or final report', 'Prosecution case review'],
          ['Charges framed', 'Scope of trial and conviction analysis'],
          ['Witness depositions', 'Evidence appreciation and contradiction review'],
          ['Exhibits and documents', 'Documentary evidence review'],
          ['Electronic evidence records', 'BSA compliance and admissibility review'],
          ['Bail orders, if any', 'Interim relief strategy'],
          ['Lower court order sheets', 'Procedural history'],
          ['Identity and authorisation documents', 'Filing and vakalatnama support'],
          ['Previous legal opinions, if any', 'Strategy continuity']
        ]} />
      </Section>

      <Section id="common-issues" title="Issues We Commonly Fix">
        <DataTable headers={['Issue', 'Risk', 'How we support']} rows={[
          ['Delay in obtaining certified copy', 'Appeal limitation risk', 'Checklist-based document follow-up'],
          ['Grounds drafted too generally', 'Weak admission or summary dismissal risk', 'Evidence-linked grounds of appeal'],
          ['Missing sentence suspension application', 'Continued custody risk', 'Parallel bail and suspension strategy'],
          ['No proper chronology', 'Counsel preparation suffers', 'Clean event-wise chronology'],
          ['Old IPC or CrPC references used', 'Legal mismatch under the new regime', 'Updated BNS, BNSS and BSA alignment'],
          ['Evidence contradictions not highlighted', 'Meritorious grounds may be missed', 'Deposition and exhibit review'],
          ['Improper annexure indexing', 'Filing defects and delay', 'Court-ready compilation support'],
          ['No follow-up after filing', 'Listing and defect delays', 'Ticket-based tracking and communication']
        ]} />
      </Section>

      <Section id="client-concerns" title="What Clients Ask For">
        <DataTable headers={['Client concern', 'Estabizz support']} rows={[
          ['“I do not understand whether appeal is possible.”', 'Maintainability and limitation check'],
          ['“The judgment has serious errors.”', 'Evidence and legal issue review'],
          ['“We need urgent bail after conviction.”', 'Suspension of sentence and bail strategy support'],
          ['“We do not want filing defects.”', 'Court-ready documentation coordination'],
          ['“We need someone to manage the process.”', 'End-to-end appeal support'],
          ['“We need regular updates.”', 'Ticket-based tracking with call, email and WhatsApp updates'],
          ['“The matter is sensitive.”', 'Confidential legal handling']
        ]} />
      </Section>

      <Section id="reducing-delay" title="How We Reduce Delay">
        <p>High Court appeals often slip because certified copies are not obtained in time, grounds are not finalised properly, or filing defects go unattended.</p>
        <p>Our process reduces that by preparing a document checklist immediately, reviewing the judgment at the first stage, identifying urgent relief requirements, coordinating with counsel and tracking each filing step until the papers are properly moved. In High Court matters a short delay can change the legal strategy, which is why structured execution matters.</p>
      </Section>

      <Section id="why-estabizz" title="Why Estabizz Fintech">
        <p>A High Court appeal cannot be handled casually. Clients come to us for clarity, speed, confidentiality and a legally structured approach.</p>
        <p>We review the judgment, identify the legal issues, organise the documents and coordinate appeal preparation systematically, which reduces the effort required from the client and family during an already stressful period. We help avoid defects and unnecessary delay by ensuring the papers are complete, properly indexed and aligned with the correct framework under BNS, BNSS and BSA.</p>
        <p>Every assignment runs through a structured ticket-based process, giving visibility on document status, drafting progress, filing stage, objections, listing updates and next steps.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“An Appeal Before High Court should be approached with urgency and legal discipline. A strong appeal is not built only on dissatisfaction with the judgment; it is built on clear grounds, evidence review, procedural accuracy and timely filing under the correct BNS, BNSS and BSA framework.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not case-specific legal advice. Appeal rights, limitation periods and procedure depend on the nature of the order, the forum and the facts of each matter, and parts of this guide are still undergoing professional review. Estabizz provides legal research, documentation and drafting coordination; court appearance is handled through enrolled advocates. Confirm the current position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
