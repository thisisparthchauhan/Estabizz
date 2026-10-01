'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'whats-changed', title: 'What Changed Under the BNSS' },
  { id: 'cognizable', title: 'Cognizable or Not — the Threshold Question' },
  { id: 'zero-fir', title: 'Zero FIR' },
  { id: 'e-fir', title: 'e-FIR and the Three-Day Rule' },
  { id: 'preliminary-enquiry', title: 'The New Preliminary Enquiry' },
  { id: 'refusal', title: 'When the Police Will Not Register' },
  { id: 'contents', title: 'What a Strong Complaint Contains' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'comparison', title: 'FIR, Complaint and Non-Cognizable Entry' },
  { id: 'types', title: 'Matters We Handle' },
  { id: 'evidence', title: 'Evidence and Preservation' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'after-registration', title: 'After an FIR Is Registered' },
  { id: 'accused-side', title: 'If You Have Been Named' },
  { id: 'business', title: 'FIRs Involving Businesses' },
  { id: 'civil-criminal', title: 'Do Not Criminalise a Civil Dispute' },
  { id: 'common-issues', title: 'Where Complaints Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a First Information Report?', 'The formal record the police make of information relating to the commission of a cognizable offence. It is the document that sets the criminal investigation process in motion.'],
  ['Which provision governs it now?', 'BNSS Section 173, which replaced Section 154 of the old Code from 1 July 2024. The offence itself is mapped under the BNS or a special law, and evidence is governed by the BSA.'],
  ['Is an FIR registered for every complaint?', 'No. It is for cognizable offences. Where the information discloses only a non-cognizable offence, the police make an entry under Section 174 and refer the informant to the Magistrate, because they cannot investigate a non-cognizable offence on their own.'],
  ['Must the police register an FIR if a cognizable offence is disclosed?', 'As a rule, yes — registration is mandatory where the information discloses a cognizable offence, and the officer does not weigh whether the allegation is likely to be true at that stage. The BNSS now carves out a limited preliminary enquiry for a defined band of offences.'],
  ['What is the new preliminary enquiry?', 'Under Section 173(3), where the offence is punishable with three years or more but less than seven years, the officer in charge may — with the prior permission of an officer not below the rank of Deputy Superintendent of Police — conduct a preliminary enquiry within fourteen days to see whether a prima facie case exists. It is an option for that band only, not a general licence to delay.'],
  ['Can I file an FIR electronically?', 'Section 173(1) allows information to be given by electronic communication. It is taken on record on being signed within three days, so an electronic complaint that is never signed does not become an FIR.'],
  ['What is a Zero FIR?', 'An FIR registered irrespective of the area in which the offence was committed, then transferred to the police station with jurisdiction. Section 173(1) now puts this on a statutory footing, so jurisdiction is not a valid reason to turn you away.'],
  ['Am I entitled to a copy?', 'Yes. Section 173(2) requires a copy of the information as recorded to be given free of cost to the informant or the victim.'],
  ['What if the police refuse to register?', 'Do not rely on verbal follow-up. Send the substance of the information in writing by post to the Superintendent of Police under Section 173(4), keeping proof of dispatch. If that produces no effective action, the route is an application to the Magistrate, who can direct an investigation.'],
  ['How long does the SP route take?', 'It varies. Send it registered, keep the tracking record, and set a realistic date by which you will escalate to the Magistrate rather than waiting indefinitely.'],
  ['Can an FIR be filed against unknown persons?', 'Yes. Most FIRs in theft, fraud and cyber matters begin against unknown accused. What matters is that the facts disclose an offence.'],
  ['Can an FIR be filed after a delay?', 'Yes, but delay needs explaining, and an unexplained gap is one of the first things a defence will raise. Where there is a reason — fear, ongoing negotiation, discovery of the loss much later — set it out in the complaint rather than leaving it to be inferred.'],
  ['Can a company file an FIR?', 'Yes, through an authorised signatory with board or management authorisation. Missing authority is a common technical objection.'],
  ['Can an FIR be cancelled?', 'The police may file a closure report, which the Magistrate can accept or reject. Separately, a High Court can quash an FIR in appropriate cases, typically where no offence is disclosed or the proceeding is an abuse of process.'],
  ['What happens after an FIR is registered?', 'Investigation: statements, evidence collection, notices, searches where permitted, and ultimately either a police report to the court or a closure report.'],
  ['Does an FIR mean the accused will be arrested?', 'No. Arrest is a separate decision governed by its own safeguards, and for many offences the police are expected to issue a notice of appearance rather than arrest. An FIR is not a conviction and it is not an arrest warrant.'],
  ['I have been named in an FIR. What should I do first?', 'Get a copy and read exactly which provisions are invoked, because the sections determine arrest risk, bail route and everything else. Take advice before giving any statement, and consider anticipatory bail where the offence and facts warrant it.'],
  ['Can a false FIR be challenged?', 'Yes — through anticipatory bail, a quashing petition, and by putting the documentary record before the investigating officer. Where a commercial dispute has been dressed as a criminal case, that is a recognised basis for quashing.'],
  ['Is BSA relevant to an FIR?', 'Very. Most modern complaints rest on electronic material — messages, emails, transaction records, CCTV — and Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam govern how it is proved. Preserve originals.'],
  ['Should I file an FIR or send a legal notice first?', 'It depends on whether an offence is genuinely disclosed and on what you want. Where the dispute is contractual, an FIR is the wrong instrument and may rebound.'],
  ['Can both a civil case and an FIR run?', 'They can, where the facts genuinely support both. What does not work is using an FIR purely as leverage in a civil recovery.'],
  ['What is the difference between an FIR and a private complaint to the Magistrate?', 'An FIR triggers police investigation in a cognizable case. A complaint to the Magistrate is the route where the offence is non-cognizable or where the police have not acted, and the Magistrate takes cognizance directly.'],
  ['Do I need a lawyer to file an FIR?', 'Not legally. But a well-drafted complaint that sets out the facts, names the right provisions and attaches the evidence is registered and investigated far more readily than a narrative handed in at the counter.'],
  ['What is the most common mistake?', 'A vague complaint. If the reader cannot identify what offence is being alleged, who did it and when, the complaint stalls at the threshold — and that is a drafting problem, not a police one.'],
  ['Can Estabizz appear in court?', 'We handle complaint drafting, offence mapping, evidence preservation, filing and escalation support, accused-side risk review and advocate coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Criminal' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'First Information Report' }]}
      title="First Information Report"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="First Information Report"
      sections={sections}
      ctaTitle="Speak With a Criminal Law Expert"
      ctaDescription="Complaint drafting that names the right offence, evidence preserved properly, and a clear escalation route if the police do not act."
      quickFacts={[
        { label: 'Main provision', value: 'BNSS Section 173' },
        { label: 'e-FIR signature', value: 'Within 3 days' },
        { label: 'Preliminary enquiry', value: '3 to 7 years, 14 days' },
        { label: 'On refusal', value: 'SP, then Magistrate' }
      ]}
      relatedArticles={[
        { title: 'Bail Application', href: '/solutions/legal/bail-application', category: 'Legal', description: 'Regular, anticipatory, interim and default bail under the BNSS framework.' },
        { title: 'Cyber Crime Complaint', href: '/solutions/legal/cyber-crime-complaint', category: 'Legal', description: 'Online fraud, the 1930 helpline, digital evidence and account freeze matters.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="The Complaint Decides What Happens Next"
      finalCtaDescription="An FIR is registered on what the information discloses. A complaint that sets out the facts clearly, names the right provision and attaches the evidence gets acted on; a narrative does not."
      heroDescription={<p>An FIR is where a criminal case begins, and the quality of the complaint behind it shapes everything that follows. The framework changed on 1 July 2024: the BNSS put Zero FIR on a statutory footing, recognised electronic complaints, and introduced a preliminary enquiry for a defined band of offences. Estabizz assists complainants and those named in an FIR with offence mapping under the BNS and special laws, complaint drafting, filing and Zero FIR guidance, electronic complaint support, escalation where registration is refused, evidence preservation under the BSA, accused-side arrest and bail risk review, quashing assessment and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> an FIR is the first official police record of a cognizable offence, and it is what allows the police to investigate.</p>
        <p>It is not a finding of guilt, not a conviction and not an arrest warrant. It is a record of information — which is why what that information actually says matters so much.</p>
        <p>This page covers both sides: getting an FIR registered properly, and responding sensibly if your name appears in one.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>An FIR is not a licence or a registration. It is a police record under BNSS Section 173 of information relating to a cognizable offence.</p>
        <p>Registration is the norm where a cognizable offence is disclosed. For non-cognizable matters a different process applies under Section 174, and the police generally cannot investigate without a Magistrate&rsquo;s order.</p>
      </Section>

      <Section id="whats-changed" title="What Changed Under the BNSS">
        <div className="info-box" aria-label="Changes from 1 July 2024">
          <p><strong>Three changes matter in practice, and guidance written before July 2024 misses all of them.</strong> Zero FIR is now expressly recognised in the statute rather than resting on circulars and case law. Information may be given by electronic communication, taken on record once signed within three days. And a preliminary enquiry is now expressly permitted, but only for offences punishable with three years or more and less than seven, with senior approval and a fourteen-day limit.</p>
        </div>
        <DataTable headers={['Point', 'Old Code', 'BNSS position']} rows={[
          ['Governing provision', 'Section 154 CrPC', 'Section 173 BNSS'],
          ['Zero FIR', 'Practice and case law', 'Express — irrespective of the area of the offence'],
          ['Electronic complaint', 'Not expressly provided', 'Permitted, recorded on signature within three days'],
          ['Preliminary enquiry', 'Judicially recognised in limited categories', 'Express, for offences of 3 to under 7 years, within 14 days'],
          ['Approval for enquiry', 'Not statutory', 'Prior permission of an officer not below DSP'],
          ['Free copy to informant', 'Provided', 'Expressly retained under Section 173(2)'],
          ['Refusal escalation', 'SP, then Magistrate', 'Retained under Section 173(4)']
        ]} />
      </Section>

      <Section id="cognizable" title="Cognizable or Not — the Threshold Question">
        <p>Everything turns on this. It decides whether you get an FIR and a police investigation, or an entry and a trip to the Magistrate.</p>
        <DataTable headers={['Point', 'Cognizable', 'Non-cognizable']} rows={[
          ['Police may arrest without warrant', 'Yes', 'No'],
          ['FIR registered', 'Yes, under Section 173', 'No — entry under Section 174'],
          ['Police may investigate on their own', 'Yes', 'Generally only on a Magistrate’s order'],
          ['Typical offences', 'Serious offences against person or property, most fraud', 'Comparatively less serious offences'],
          ['Where classification is found', 'The BNSS First Schedule', 'The BNSS First Schedule'],
          ['Practical route', 'Police station', 'Magistrate complaint']
        ]} />
        <p>Check the classification before you go, because it determines what you can reasonably expect. Our page on <Link href="/solutions/legal/criminal-misappropriation-of-property">Criminal Misappropriation of Property</Link> is an example of a non-cognizable offence where clients lose weeks pressing for an FIR that was never going to be registered.</p>
      </Section>

      <Section id="zero-fir" title="Zero FIR">
        <p>A Zero FIR is registered at whichever police station receives the information, regardless of where the offence took place, and is then transferred to the station with territorial jurisdiction. Section 173(1) now says the information may be given irrespective of the area where the offence is committed.</p>
        <DataTable headers={['Situation', 'Why Zero FIR helps']} rows={[
          ['Offence in another city or State', 'Registration is not delayed by travel'],
          ['Jurisdiction genuinely unclear', 'The record is created now, sorted out later'],
          ['Victim has moved for safety', 'Reporting is possible where she now is'],
          ['Serious offence needing immediate action', 'Evidence and investigation start without a jurisdictional argument'],
          ['Online offence with no obvious location', 'Registration is not held up by locating the offence'],
          ['Being turned away on jurisdiction', 'Jurisdiction is not a lawful reason to refuse to record']
        ]} />
        <p>If you are told to go to a different police station for a cognizable offence, that is the point to politely invoke this and, if necessary, to put the complaint in writing and keep proof.</p>
      </Section>

      <Section id="e-fir" title="e-FIR and the Three-Day Rule">
        <div className="warning-box" aria-label="Signature requirement">
          <p><strong>An unsigned electronic complaint is not an FIR.</strong> Section 173(1) allows information to be given by electronic communication, but it is taken on record <strong>on being signed within three days</strong>. People file online, assume an FIR exists, and discover weeks later that nothing was registered because the signature step was never completed. If you file electronically, calendar the signing immediately and keep the acknowledgement.</p>
        </div>
        <DataTable headers={['Step', 'What to do']} rows={[
          ['Submit the information electronically', 'Through the channel the State provides'],
          ['Note the reference number', 'It is your proof of submission'],
          ['Sign within three days', 'Otherwise it is not taken on record'],
          ['Collect the registered FIR copy', 'Free of cost under Section 173(2)'],
          ['Verify the provisions recorded', 'Check the sections actually invoked'],
          ['Keep the full trail', 'Submission, signature and FIR copy together']
        ]} />
      </Section>

      <Section id="preliminary-enquiry" title="The New Preliminary Enquiry">
        <p>Section 173(3) permits — it does not require — a preliminary enquiry before registration, in a narrow band of cases. Understanding its limits is useful, because it is sometimes invoked where it does not apply.</p>
        <DataTable headers={['Element', 'Position']} rows={[
          ['When available', 'Offence punishable with three years or more but less than seven years'],
          ['Purpose', 'To ascertain whether a prima facie case exists'],
          ['Approval required', 'Prior permission of an officer not below the rank of Deputy Superintendent of Police'],
          ['Time limit', 'Fourteen days'],
          ['Is it mandatory', 'No — it is an option in that band'],
          ['Offences of seven years or more', 'Outside this provision'],
          ['Offences under three years', 'Outside this provision'],
          ['If the enquiry discloses a case', 'The FIR is to be registered']
        ]} />
        <div className="info-box" aria-label="Scope">
          <p><strong>It is a bounded exception, not a general discretion to defer.</strong> For a serious offence carrying seven years or more, a preliminary enquiry under this provision is not available, and the fourteen-day limit applies where it is. If registration is being deferred outside those limits, that is worth putting on the record in writing.</p>
        </div>
      </Section>

      <Section id="refusal" title="When the Police Will Not Register">
        <p>This is the most common reason people seek help here. The statute provides a route, and it depends entirely on creating a paper trail.</p>
        <DataTable headers={['Step', 'Action', 'Why it matters']} rows={[
          ['1', 'Submit the complaint in writing', 'Verbal requests leave no record'],
          ['2', 'Obtain an acknowledgement or diary entry', 'Proof that it was submitted'],
          ['3', 'Send the substance in writing by post to the SP', 'The Section 173(4) route'],
          ['4', 'Use registered post and keep tracking proof', 'Delivery must be provable'],
          ['5', 'Attach the evidence and the earlier complaint', 'The SP should see the whole picture'],
          ['6', 'Allow a reasonable but defined period', 'Avoid waiting indefinitely'],
          ['7', 'Apply to the Magistrate if no effective action', 'The Magistrate can direct an investigation'],
          ['8', 'Maintain the complete file', 'It supports every later step']
        ]} />
        <div className="warning-box" aria-label="Documentation">
          <p><strong>Verbal follow-up achieves nothing here.</strong> Every escalation depends on showing what you submitted, when, and what happened — so the file matters more than the visits. Keep copies, dispatch receipts and tracking printouts from the first day.</p>
        </div>
      </Section>

      <Section id="contents" title="What a Strong Complaint Contains">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Complainant details', 'Identity, address and contact'],
          ['Date, time and place of the incident', 'Jurisdiction, chronology and verification'],
          ['A clear narration of facts', 'This is what discloses the offence'],
          ['Details of the accused, where known', 'Identification and investigation'],
          ['The offence alleged', 'Helps the officer map the provision'],
          ['Loss or harm caused', 'Establishes seriousness and relief'],
          ['Witnesses', 'Names and contact details'],
          ['Documents relied on', 'Listed and annexed'],
          ['Digital evidence', 'Messages, transaction records, links and devices'],
          ['An express request to register an FIR', 'Removes ambiguity about what you are asking for'],
          ['Explanation for any delay', 'Deals with the objection before it is raised'],
          ['Signature and date', 'Formal validity']
        ]} />
        <p>Write it so that someone reading it once can say what offence is alleged, against whom, and when. If that is not clear in the first paragraph, the complaint needs redrafting.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['FIR registration', 'BNSS Section 173'],
          ['Non-cognizable information', 'BNSS Section 174'],
          ['Police power to investigate', 'BNSS Section 175'],
          ['Classification of offences', 'BNSS First Schedule'],
          ['Offences', 'Bharatiya Nyaya Sanhita, 2023, or the relevant special law'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Electronic records', 'BSA Sections 61 to 63'],
          ['Authorities', 'Police station, Superintendent of Police, Magistrate and the High Court'],
          ['Commencement', 'BNS, BNSS and BSA in force from 1 July 2024']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['BNSS Section 173(1)', 'Information in cognizable cases, orally or electronically, irrespective of area'],
          ['BNSS Section 173(1) proviso on electronic information', 'Taken on record on being signed within three days'],
          ['BNSS Section 173(2)', 'Free copy of the recorded information to the informant or victim'],
          ['BNSS Section 173(3)', 'Preliminary enquiry for offences of three to under seven years, within fourteen days, with DSP-level permission'],
          ['BNSS Section 173(4)', 'Refusal to record — substance in writing by post to the Superintendent of Police'],
          ['BNSS Section 174', 'Information in non-cognizable cases'],
          ['BNSS Section 175', 'Police officer’s power to investigate a cognizable case'],
          ['BNSS First Schedule', 'Whether an offence is cognizable and bailable, and the trial court'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic and digital records']
        ]} />
      </Section>

      <Section id="comparison" title="FIR, Complaint and Non-Cognizable Entry">
        <DataTable headers={['Point', 'FIR', 'Police complaint', 'Non-cognizable entry']} rows={[
          ['What it is', 'Record of a cognizable offence', 'Information given to the police', 'Record of non-cognizable information'],
          ['Provision', 'BNSS Section 173', 'Depends on the facts', 'BNSS Section 174'],
          ['Police investigation', 'Police may investigate', 'Only if a cognizable offence is disclosed', 'Generally needs a Magistrate’s order'],
          ['Copy to complainant', 'Free copy under Section 173(2)', 'Keep the acknowledgement', 'Keep the entry copy'],
          ['Next step', 'Investigation begins', 'FIR, entry, enquiry or escalation', 'Magistrate route'],
          ['Typical timeline', 'Immediate on registration', 'Varies', 'Depends on the Magistrate']
        ]} />
      </Section>

      <Section id="types" title="Matters We Handle">
        <DataTable headers={['Type', 'Typical example']} rows={[
          ['FIR filing support', 'Getting a cognizable offence properly registered'],
          ['Complaint drafting', 'A written complaint structured to disclose the offence'],
          ['Zero FIR guidance', 'Offence outside the local station’s jurisdiction'],
          ['Electronic complaint support', 'Filing online and completing the signature step'],
          ['Refusal escalation', 'SP representation and the Magistrate route'],
          ['Victim-side support', 'Documentation, protection and evidence strategy'],
          ['Accused-side review', 'Arrest risk, bail and quashing assessment'],
          ['Business and company FIRs', 'Fraud, breach of trust, employee misconduct, asset misuse'],
          ['False or malicious FIR', 'Defence strategy and quashing assessment'],
          ['Cyber and digital matters', 'Online fraud, threats and impersonation']
        ]} />
      </Section>

      <Section id="evidence" title="Evidence and Preservation">
        <p>Most complaints now stand or fall on electronic material, and that material degrades fast — accounts are deleted, devices are replaced, logs are overwritten.</p>
        <DataTable headers={['Evidence', 'How to preserve it']} rows={[
          ['Messages and chats', 'Export the full conversation, keep the original device'],
          ['Emails', 'Preserve with full headers, not as forwarded copies'],
          ['Transaction records', 'Statements, UTRs and beneficiary details'],
          ['Photographs and video', 'Original files, not compressed re-shares'],
          ['CCTV', 'Request preservation immediately — footage overwrites'],
          ['Call records', 'Logs and numbers, retained before deletion'],
          ['Medical records', 'Obtained at the time, where injury is involved'],
          ['Documents and agreements', 'Originals, with a clear index'],
          ['Witnesses', 'Names and contact details recorded early'],
          ['Chronology', 'Written down while recollection is fresh']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Identity and address proof', 'Complaint verification'],
          ['Incident chronology', 'Date-wise presentation of facts'],
          ['Draft complaint, if any', 'Review and strengthening'],
          ['Photographs and video', 'Evidence of the incident or injury'],
          ['Messages, emails and call logs', 'Digital evidence'],
          ['Medical records', 'Where injury is involved'],
          ['Bank and transaction records', 'Financial offences'],
          ['Agreements, invoices and ledgers', 'Business disputes and fraud'],
          ['Witness details', 'Investigation support'],
          ['Earlier complaints or notices', 'Background and context'],
          ['Police acknowledgement', 'Escalation and follow-up'],
          ['Board authorisation, for a company', 'Authority to complain'],
          ['FIR copy, where already registered', 'Victim-side or accused-side strategy']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Facts, urgency and objective'],
          ['2', 'Offence mapping', 'Which BNS or special law provision applies'],
          ['3', 'Cognizability check', 'FIR route or Magistrate route'],
          ['4', 'Evidence review and preservation', 'What exists, and what must be secured now'],
          ['5', 'Complaint drafting', 'Structured, fact-led and annexed'],
          ['6', 'Filing support', 'Police station, electronic route or Zero FIR'],
          ['7', 'Acknowledgement tracking', 'FIR copy or diary entry obtained'],
          ['8', 'Escalation where refused', 'SP representation, then the Magistrate'],
          ['9', 'Investigation support', 'Statements, further evidence and follow-up'],
          ['10', 'Risk review', 'Bail, protection or quashing where relevant'],
          ['11', 'Ongoing tracking', 'Status, notices and next steps']
        ]} />
      </Section>

      <Section id="after-registration" title="After an FIR Is Registered">
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Investigation begins', 'Statements recorded, evidence collected'],
          ['Notices to appear', 'Persons required for questioning are called'],
          ['Search and seizure', 'Where legally permitted in the investigation'],
          ['Forensic examination', 'Where the material requires it'],
          ['Arrest, if warranted', 'Subject to the applicable safeguards'],
          ['Statements before a Magistrate', 'In appropriate cases'],
          ['Police report to the court', 'Where the investigation discloses a case'],
          ['Closure report', 'Where it does not — the Magistrate may accept or reject it'],
          ['Cognizance and trial', 'The court takes over from there']
        ]} />
        <p>Track it. An FIR that nobody follows up on tends to go quiet, and the complainant is usually the only person with an interest in keeping it moving.</p>
      </Section>

      <Section id="accused-side" title="If You Have Been Named">
        <div className="warning-box" aria-label="First steps">
          <p><strong>Get the FIR copy and read the provisions before doing anything else.</strong> The sections invoked determine whether the offence is bailable, whether arrest is likely, which court has jurisdiction and whether anticipatory bail is worth seeking. Reacting before you know what has actually been alleged is how people make their position worse — including by contacting the complainant, which is almost always a mistake.</p>
        </div>
        <DataTable headers={['Step', 'Why']} rows={[
          ['Obtain the FIR copy', 'Everything depends on what it actually says'],
          ['Identify the provisions invoked', 'Determines bailability and arrest risk'],
          ['Assess anticipatory bail', 'Where the offence and facts warrant it'],
          ['Take advice before any statement', 'Statements are difficult to retract'],
          ['Preserve your own evidence', 'Records that establish your account'],
          ['Do not contact the complainant', 'It is read as pressure, whatever the intention'],
          ['Cooperate with lawful notices', 'Non-appearance strengthens the case against you'],
          ['Assess quashing', 'Where no offence is disclosed or it is an abuse of process'],
          ['Check whether a civil dispute is being criminalised', 'A recognised basis for relief']
        ]} />
        <p>On bail, see <Link href="/solutions/legal/bail-application">Bail Application</Link>.</p>
      </Section>

      <Section id="business" title="FIRs Involving Businesses">
        <DataTable headers={['Situation', 'What it needs']} rows={[
          ['Employee misappropriating assets or funds', 'Access logs, accounting records and board authorisation'],
          ['Vendor or partner fraud', 'Contracts, invoices, payment trail and correspondence'],
          ['Forged documents', 'Originals, comparison material and expert input'],
          ['Data or customer list theft', 'Access records, device logs and employment terms'],
          ['Cheque or payment fraud', 'Banking records and the instrument itself'],
          ['Company named as accused', 'Authorised response and internal investigation'],
          ['Director named personally', 'Role-specific review — position alone is not liability'],
          ['Complaint by a business', 'Board resolution or authorisation, filed with the complaint']
        ]} />
        <p>Where assets or funds have been misappropriated by someone who lawfully held them, check the correct provision before filing — see <Link href="/solutions/legal/criminal-misappropriation-of-property">Criminal Misappropriation of Property</Link>.</p>
      </Section>

      <Section id="civil-criminal" title="Do Not Criminalise a Civil Dispute">
        <div className="info-box" aria-label="Civil-criminal line">
          <p><strong>An FIR filed to apply pressure in a commercial dispute is a poor strategy and a real risk.</strong> Courts are alert to it, it is a recognised basis for quashing, and it can attract adverse observations. Where the substance is a payment default or a contractual disagreement, the civil route is both more honest and usually faster to actual recovery.</p>
        </div>
        <DataTable headers={['Situation', 'Realistic assessment']} rows={[
          ['Payment default under a contract', 'Civil recovery, or the cheque dishonour route'],
          ['Goods supplied and unpaid', 'Civil, unless deception from the outset can be shown'],
          ['Deception present from the beginning', 'The cheating angle may genuinely arise'],
          ['Property entrusted and dishonestly converted', 'Criminal breach of trust or misappropriation'],
          ['Forgery or fabricated documents', 'Criminal, with the documents as the evidence'],
          ['Partnership accounting dispute', 'Usually civil'],
          ['Dispute over interpretation of a contract', 'Civil']
        ]} />
        <p>See <Link href="/solutions/legal/cheque-bounce-in-india">Cheque Bounce in India</Link> and <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link> for the civil routes.</p>
      </Section>

      <Section id="common-issues" title="Where Complaints Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['The complaint is vague', 'No offence is identifiable from it', 'Fact-specific drafting'],
          ['Wrong provisions assumed', 'Confusion and weak follow-up', 'BNS and special law mapping'],
          ['Non-cognizable offence, FIR expected', 'Weeks lost at the police station', 'Route identified at the outset'],
          ['Electronic complaint never signed', 'No FIR exists at all', 'Three-day signature calendared'],
          ['Refused on jurisdiction', 'Delay while the offence gets colder', 'Zero FIR invoked, in writing'],
          ['Refusal not escalated properly', 'The matter simply stops', 'SP representation with proof of dispatch'],
          ['Digital evidence not preserved', 'The proof is gone', 'Preservation checklist from day one'],
          ['Delay unexplained', 'The first objection the defence raises', 'Explanation built into the complaint'],
          ['Civil dispute given a criminal colour', 'Quashing risk and adverse observations', 'Honest civil-criminal assessment'],
          ['Company complaint without authority', 'Technical objection', 'Board authorisation documented'],
          ['No follow-up after registration', 'The investigation goes quiet', 'Ticket-based tracking']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case assessment', 'Whether the facts disclose an offence, and which'],
          ['Offence mapping', 'BNS or special law provisions identified'],
          ['Cognizability review', 'FIR route or Magistrate route'],
          ['Complaint drafting', 'Structured, annexed and registration-ready'],
          ['Filing support', 'Police station, electronic route or Zero FIR'],
          ['Evidence preservation', 'Digital and documentary, aligned to the BSA'],
          ['Refusal escalation', 'SP representation and the Magistrate application'],
          ['Investigation support', 'Statements, further material and follow-up'],
          ['Accused-side risk review', 'Provisions invoked, arrest risk and bail route'],
          ['Quashing assessment', 'Where no offence is disclosed or it is an abuse of process'],
          ['Business and company support', 'Authorisation, internal records and coordination'],
          ['Advocate coordination', 'Brief, chronology and evidence file'],
          ['Ticket-based tracking', 'Complaint, FIR, notices and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“An FIR is registered on what the information discloses, which makes the complaint the most important document in the case and the one people spend the least time on. Name the offence, fix the dates, attach the evidence and ask expressly for registration. And if you file electronically, sign it within three days — an unsigned e-complaint is not an FIR, however long you wait for one.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether particular facts disclose a cognizable offence, which provisions apply, whether an FIR will be registered and what a court will do depend entirely on the facts and their presentation. Procedural positions stated here reflect the BNSS as at October 2026 and parts of this guide remain under professional review. Estabizz provides case assessment, drafting, documentation, filing coordination and tracking; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
