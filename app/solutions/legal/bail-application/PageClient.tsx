'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'bnss-sections', title: 'Important BNSS Sections' },
  { id: 'law-roles', title: 'Role of BNS, BNSS and BSA' },
  { id: 'types', title: 'Types of Bail Application' },
  { id: 'when-to-file', title: 'When to File' },
  { id: 'grounds', title: 'Grounds Commonly Considered' },
  { id: 'process', title: 'Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'conditions', title: 'Bail Conditions and Bonds' },
  { id: 'cancellation', title: 'Cancellation and Modification' },
  { id: 'common-issues', title: 'Issues We Commonly Fix' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a bail application?', 'An application to a competent criminal court seeking release from custody, or protection against arrest, on conditions the court considers appropriate.'],
  ['Which law governs bail now?', 'The Bharatiya Nagarik Suraksha Sanhita, 2023. It replaced the CrPC, and the section numbers have changed — old CrPC references should be mapped to BNSS.'],
  ['Which BNSS section deals with bailable offences?', 'Section 478, corresponding to the earlier Section 436 CrPC.'],
  ['Which section deals with non-bailable offences?', 'Section 480, corresponding to the earlier Section 437 CrPC.'],
  ['Which section covers anticipatory bail?', 'Section 482, corresponding to the earlier Section 438 CrPC. The application lies before the Court of Session or the High Court.'],
  ['What are the special powers of the High Court and Sessions Court?', 'Section 483, corresponding to the earlier Section 439 CrPC, including the power to cancel bail in appropriate cases.'],
  ['What is default bail?', 'Where the investigation is not completed within the statutory period, the accused becomes entitled to release on bail subject to conditions. The relevant provision is Section 187 BNSS, corresponding to the earlier Section 167 CrPC.'],
  ['What is Section 479 about?', 'It deals with the maximum period an undertrial may be detained, and includes a mechanism for release where an undertrial has served a specified proportion of the maximum sentence. This was one of the notable reforms in BNSS.'],
  ['Is bail a right in a bailable offence?', 'In bailable offences release on bail is the ordinary position under Section 478. In non-bailable offences it is at the court\'s discretion under Section 480.'],
  ['Can I apply before arrest?', 'Yes, where you apprehend arrest in a non-bailable offence, through an anticipatory bail application under Section 482.'],
  ['Which court do I approach?', 'It depends on the offence, the stage and the type of bail — commonly the Magistrate Court, the Court of Session or the High Court. Choosing the wrong forum costs time in custody.'],
  ['What is interim bail?', 'Temporary protection granted for urgent or exceptional reasons, pending final consideration of the application.'],
  ['Can bail be granted after conviction?', 'Yes, bail pending appeal may be sought from the appellate court, generally alongside an application to suspend the sentence.'],
  ['What conditions can the court impose?', 'Commonly bonds and sureties, appearance obligations, restrictions on leaving the jurisdiction, surrender of passport, and directions against contacting witnesses.'],
  ['What is a surety?', 'A person who undertakes responsibility for the accused\'s appearance, backed by a bond. Sureties make a declaration and can later be discharged under the statutory provisions.'],
  ['Can the bond amount be reduced?', 'Section 484 deals with the amount of bond and its reduction, where the amount fixed is excessive.'],
  ['Can bail be cancelled?', 'Yes. Under Section 483 the High Court or Court of Session may cancel bail, commonly where conditions are breached, witnesses are influenced or new material emerges.'],
  ['Can bail conditions be modified?', 'Yes, an application for relaxation or modification may be made to the court that granted bail, or another competent court.'],
  ['What happens if I breach a condition?', 'Breach exposes you to cancellation of bail and to forfeiture of the bond under the statutory provisions.'],
  ['Does filing a bail application guarantee release?', 'No. It is decided on the offence, the evidence, the stage of investigation, antecedents and the risk factors the court weighs.'],
  ['What matters most in a bail application?', 'A precise, fact-specific application addressing the actual objections — flight risk, tampering, antecedents and the stage of investigation — rather than a generic template.'],
  ['How quickly should it be filed?', 'Urgently. Custody time is not recoverable, and delay also weakens the practical position.'],
  ['Are old CrPC section numbers still usable?', 'They should be mapped to BNSS. Using outdated numbering causes confusion and can create filing defects.'],
  ['Can Estabizz appear in court?', 'We provide case review, drafting, documentation, research and coordination. Appearance is handled through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Criminal Procedure' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Bail Application' }]}
      title="Bail Application"
      readTime="12 min read"
      hideReviewBadge
      focusKeyword="Bail Application"
      sections={sections}
      ctaTitle="Speak With a Criminal Law Expert"
      ctaDescription="Discuss the correct forum, the type of bail and the grounds for your matter with the Estabizz team."
      quickFacts={[{ label: 'Procedural law', value: 'BNSS, 2023' }, { label: 'Bailable offences', value: 'Section 478' }, { label: 'Non-bailable', value: 'Section 480' }, { label: 'Anticipatory', value: 'Section 482' }]}
      relatedArticles={[
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Conviction and acquittal appeals, suspension of sentence and bail pending appeal.' },
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice deadlines, complaint preparation and recovery strategy.' },
        { title: 'Adulteration of Drugs Legal Services', href: '/solutions/legal/adulteration-of-drugs-legal-services', category: 'Legal', description: 'CDSCO notices, sample failure, licence risk and prosecution defence.' }
      ]}
      finalCtaTitle="Custody Time Is Not Recoverable"
      finalCtaDescription="Bail matters reward speed and precision. Getting the forum, the type of application and the grounds right the first time is what shortens the process."
      heroDescription={<p>Bail is about liberty during a process that has not yet decided anything. Under the Bharatiya Nagarik Suraksha Sanhita, 2023 the section numbers have changed, the forum depends on the offence and the stage, and the application has to answer the specific objections a court will weigh. Estabizz assists with case review, forum assessment, drafting regular, anticipatory, interim and default bail applications, surety and bond documentation, and counsel coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp for Urgent Bail Matter</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a bail application asks a competent criminal court to release a person from custody, or to protect them against arrest, on conditions the court considers appropriate.</p>
        <p><strong>From a procedural standpoint…</strong> the governing law is now the Bharatiya Nagarik Suraksha Sanhita, 2023, which replaced the CrPC. The substance of bail practice is largely continuous, but the section numbering has changed and references should be mapped across.</p>
        <p>The court weighs the nature and gravity of the offence, the stage of investigation, the strength of the material, the risk of flight or tampering, antecedents, health and personal circumstances. A generic application that does not engage with those factors rarely helps.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main procedural law', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Offence law', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Evidence law', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Earlier laws replaced', 'IPC, CrPC and Indian Evidence Act references should be updated to BNS, BNSS and BSA'],
          ['Forum', 'Magistrate Court, Court of Session or High Court, depending on the case'],
          ['Bail chapter', 'BNSS provisions on bail and bonds, running from Section 478'],
          ['Core objective', 'Protecting liberty while ensuring investigation and trial are not affected']
        ]} />
      </Section>

      <Section id="bnss-sections" title="Important BNSS Sections">
        <DataTable headers={['Section', 'Practical relevance', 'Earlier CrPC provision']} rows={[
          ['BNSS 478', 'Bail in bailable offence situations', 'Section 436'],
          ['BNSS 479', 'Maximum period of detention of an undertrial prisoner', 'Section 436A'],
          ['BNSS 480', 'Bail in non-bailable offence cases', 'Section 437'],
          ['BNSS 481', 'Bail requiring the accused to appear before the next appellate court', 'Section 437A'],
          ['BNSS 482', 'Direction for grant of bail to a person apprehending arrest', 'Section 438'],
          ['BNSS 483', 'Special powers of the High Court or Court of Session, including cancellation', 'Section 439'],
          ['BNSS 484', 'Amount of bond and reduction of an excessive amount', 'Section 440'],
          ['BNSS 485', 'Bond of the accused and of sureties', 'Section 441'],
          ['BNSS 486', 'Declaration by sureties', 'Section 441A'],
          ['BNSS 487', 'Discharge from custody', 'Section 442'],
          ['BNSS 488', 'Power to order sufficient bail where the first bail is insufficient', 'Section 443'],
          ['BNSS 489', 'Discharge of sureties', 'Section 444'],
          ['BNSS 187', 'Default bail where investigation is not completed in the statutory period', 'Section 167']
        ]} />
        <p>The mapping above is given because old CrPC numbering is still in wide circulation. Using outdated section numbers in a filing causes confusion and can create defects, so references should be converted before drafting.</p>
      </Section>

      <Section id="law-roles" title="Role of BNS, BNSS and BSA">
        <DataTable headers={['Law', 'Role in a bail matter']} rows={[
          ['BNS, 2023', 'Defines the offence and its punishment, which drives whether it is bailable and how gravity is assessed'],
          ['BNSS, 2023', 'Provides the bail procedure, forum, conditions, bonds and cancellation powers'],
          ['BSA, 2023', 'Governs the material the court looks at, including documentary and electronic evidence'],
          ['Court rules and practice', 'Filing format, listing, urgency and local procedure']
        ]} />
      </Section>

      <Section id="types" title="Types of Bail Application">
        <DataTable headers={['Type', 'When it is used', 'Typical forum']} rows={[
          ['Regular bail', 'After arrest, or while the accused is in custody', 'Magistrate Court, Court of Session or High Court'],
          ['Anticipatory bail', 'Where arrest is apprehended in a non-bailable offence', 'Court of Session or High Court'],
          ['Interim bail', 'Temporary protection for urgent or exceptional reasons', 'Competent court, depending on the matter'],
          ['Default bail', 'Where investigation is not completed within the statutory period', 'Competent criminal court'],
          ['Bail pending appeal', 'After conviction, during appeal proceedings', 'Appellate court'],
          ['Bail modification', 'To relax or modify existing conditions', 'The court that granted bail, or a competent court'],
          ['Cancellation defence', 'Where the prosecution or complainant seeks cancellation', 'Competent court']
        ]} />
      </Section>

      <Section id="when-to-file" title="When to File">
        <DataTable headers={['Situation', 'Why action is needed']} rows={[
          ['An FIR has been registered against you', 'Anticipatory bail may be considered before arrest'],
          ['Arrest has taken place', 'Regular bail should be moved without delay'],
          ['Investigation has exceeded the statutory period', 'Default bail entitlement should be assessed immediately'],
          ['Summons or warrant received', 'Forum and protection strategy should be settled'],
          ['Bail was rejected by the lower court', 'A higher forum may be approached under Section 483'],
          ['Conviction has been recorded', 'Bail pending appeal, with suspension of sentence'],
          ['Conditions are impractical', 'Modification may be sought'],
          ['Cancellation has been sought against you', 'Defence should be prepared promptly']
        ]} />
      </Section>

      <Section id="grounds" title="Grounds Commonly Considered">
        <DataTable headers={['Ground', 'How courts approach it']} rows={[
          ['Nature and gravity of the offence', 'The starting point for the whole assessment'],
          ['Stage of investigation', 'Custodial interrogation needs weigh differently at different stages'],
          ['Strength of the material', 'The court looks at the case broadly, without a mini-trial'],
          ['Risk of flight', 'Ties, roots and travel history are relevant'],
          ['Risk of tampering', 'Influence over witnesses or evidence'],
          ['Antecedents', 'Prior record and conduct'],
          ['Parity', 'Treatment of similarly placed co-accused'],
          ['Delay in trial', 'Prolonged custody without progress'],
          ['Health, age and personal circumstances', 'Considered on the facts'],
          ['Cooperation with investigation', 'Conduct after the FIR matters']
        ]} />
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Urgent consultation', 'Custody status and urgency assessment'],
          ['2', 'FIR and record review', 'Offence mapping under BNS and the sections invoked'],
          ['3', 'Bail type assessment', 'Regular, anticipatory, interim or default'],
          ['4', 'Forum identification', 'Magistrate, Sessions or High Court'],
          ['5', 'Grounds preparation', 'Fact-specific grounds addressing likely objections'],
          ['6', 'Drafting', 'Bail application with supporting affidavit'],
          ['7', 'Document compilation', 'FIR, custody records, medical and supporting papers'],
          ['8', 'Surety arrangement', 'Surety identification and documentation'],
          ['9', 'Filing and listing', 'Filing coordination and urgency mentioning'],
          ['10', 'Hearing support', 'Briefing notes and counsel coordination'],
          ['11', 'Order compliance', 'Bond execution, conditions and release formalities']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['FIR copy', 'Offence, sections invoked and allegations'],
          ['Arrest memo', 'Custody position and timing'],
          ['Remand order', 'Stage of custody'],
          ['Charge sheet, if filed', 'Case material and default bail assessment'],
          ['Case diary references, where available', 'Investigation stage'],
          ['Previous bail orders', 'History and parity arguments'],
          ['Medical records, where relevant', 'Health grounds'],
          ['Identity and address proof', 'Roots and verification'],
          ['Surety documents', 'Bond and surety verification'],
          ['Employment or business proof', 'Ties to the jurisdiction'],
          ['Passport, where surrender is directed', 'Condition compliance'],
          ['Vakalatnama', 'Representation']
        ]} />
      </Section>

      <Section id="conditions" title="Bail Conditions and Bonds">
        <p>Bail is almost always conditional. The bond machinery under BNSS covers the amount of the bond and its reduction where excessive (Section 484), the bonds of the accused and sureties (Section 485), declarations by sureties (Section 486), discharge from custody (Section 487) and discharge of sureties (Section 489).</p>
        <DataTable headers={['Common condition', 'Practical effect']} rows={[
          ['Personal bond with sureties', 'Financial undertaking for appearance'],
          ['Regular appearance', 'Attendance at investigation or hearings'],
          ['No contact with witnesses', 'Guards against tampering'],
          ['Not leaving the jurisdiction without permission', 'Addresses flight risk'],
          ['Surrender of passport', 'Common in cases with travel risk'],
          ['Address intimation', 'Any change to be notified to the court'],
          ['Cooperation with investigation', 'Ongoing obligation']
        ]} />
        <p>Conditions should be workable. A condition that cannot realistically be complied with becomes a cancellation risk, so impractical terms are better addressed by seeking modification than by breaching them.</p>
      </Section>

      <Section id="cancellation" title="Cancellation and Modification">
        <p>Under Section 483 the High Court or Court of Session may cancel bail. Cancellation is commonly sought where conditions are breached, witnesses are influenced, fresh material emerges, or the accused has absconded.</p>
        <p>Where conditions have become impractical rather than being deliberately ignored, the correct route is an application for relaxation or modification to the court that granted bail, or another competent court. Acting before a breach is materially better than explaining one afterwards.</p>
      </Section>

      <Section id="common-issues" title="Issues We Commonly Fix">
        <DataTable headers={['Issue', 'Risk', 'How we support']} rows={[
          ['Generic template application', 'Court objections go unanswered', 'Fact-specific grounds drafting'],
          ['Wrong forum approached', 'Time lost while in custody', 'Forum and bail-type assessment'],
          ['Old CrPC sections cited', 'Confusion and filing defects', 'BNSS reference mapping'],
          ['Default bail entitlement missed', 'A clear entitlement goes unclaimed', 'Statutory period tracking'],
          ['Surety not arranged in advance', 'Release delayed after the order', 'Surety documentation prepared in parallel'],
          ['Antecedents not addressed', 'Objection lands unanswered', 'Upfront disclosure and explanation'],
          ['Impractical conditions accepted', 'Later breach and cancellation risk', 'Modification strategy'],
          ['No follow-through after the order', 'Release formalities stall', 'Bond and compliance coordination']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Urgent case review', 'FIR, custody status and offence mapping'],
          ['Bail type and forum assessment', 'Regular, anticipatory, interim or default, and the right court'],
          ['Grounds drafting', 'Fact-specific grounds addressing likely objections'],
          ['Application and affidavit', 'Drafting and supporting documentation'],
          ['Default bail assessment', 'Statutory period calculation and entitlement'],
          ['Surety and bond support', 'Surety documentation and bond formalities'],
          ['Modification applications', 'Relaxation of impractical conditions'],
          ['Cancellation defence', 'Response where cancellation is sought'],
          ['Legal research', 'Issue-wise research for counsel briefing'],
          ['Counsel coordination', 'Briefing, listing and hearing support'],
          ['Post-order compliance', 'Bond execution and release formalities'],
          ['Ticket-based tracking', 'Status visibility at every stage']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A bail application succeeds on specificity. The court already knows the general principles; what it needs is a clear answer to the particular objection in the particular case, supported by the record and filed in the right forum without delay.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Bail depends on the offence, the stage, the record and the facts of each case, and parts of this guide are still undergoing professional review. Estabizz provides case review, drafting, documentation and coordination; appearance before the court is handled through enrolled advocates. Confirm the current position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
