'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Provisions' },
  { id: 'how-it-works', title: 'How Section 148A Works' },
  { id: 'validity', title: 'Validity and the 90-Day Clock' },
  { id: 'when-to-file', title: 'When to File' },
  { id: 'use-cases', title: 'Common Use Cases' },
  { id: 'forums', title: 'Courts and Forums' },
  { id: 'process', title: 'Process' },
  { id: 'petition-contents', title: 'What the Petition Should Include' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'comparisons', title: 'Caveat vs Other Remedies' },
  { id: 'risks', title: 'Risks of Filing It Badly' },
  { id: 'common-issues', title: 'Issues We Commonly Fix' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a caveat?', 'A preventive filing under Section 148A of the Code of Civil Procedure, 1908 by a person who expects an application to be made against them and wants to be heard before any order is passed on it.'],
  ['Is it spelt "cavet" or "caveat"?', 'Caveat is the correct spelling. "Cavet" is a common misspelling and is often what people search for.'],
  ['What does a caveat actually achieve?', 'It does not stop the other side from filing. It ensures the court gives you notice, so an interim order is not passed behind your back without you being heard.'],
  ['How long is a caveat valid?', 'Generally 90 days from the date of lodging, unless the expected application is made within that period.'],
  ['What happens after 90 days?', 'It lapses automatically. If the risk continues, a fresh caveat has to be filed — this is the single most common failure point.'],
  ['Do I have to notify the other side?', 'Yes. Under Section 148A(2) the caveator must serve notice of the caveat on the expected applicant by registered post with acknowledgement due.'],
  ['What is the court\'s duty?', 'Under Section 148A(3), once a caveat is lodged the court must serve notice of the application on the caveator.'],
  ['What is the applicant\'s duty?', 'Under Section 148A(4) the applicant must furnish the caveator with copies of the application and supporting documents, at the caveator\'s expense.'],
  ['Can I file a caveat in any court?', 'It has to be filed in the forum where the application is actually expected. A caveat in the wrong court gives no protection in the right one.'],
  ['Do I need a separate caveat for each court?', 'Generally yes. If an appeal could go to more than one forum, a caveat may be needed in each.'],
  ['Can I file after an order has already been passed?', 'A caveat is preventive. Once an ex-parte order exists, the remedy is to apply to vacate or appeal it, not to file a caveat.'],
  ['Is a caveat the same as a legal notice?', 'No. A legal notice is sent to the opposite party asserting a claim. A caveat is filed in court to secure a hearing.'],
  ['Is it the same as an injunction application?', 'No. An injunction seeks relief. A caveat only secures the right to be heard before relief is granted against you.'],
  ['Is it the same as filing a reply?', 'No. A reply responds to a case already filed. A caveat is lodged in anticipation of one.'],
  ['When should I file?', 'Before the expected application, not after. The value is entirely in being early.'],
  ['What should the petition contain?', 'The court, the caveator and expected applicant details, the case or order it relates to, the subject matter, your interest, the expected application and a prayer that no order be passed without hearing you.'],
  ['Can a company file a caveat?', 'Yes, with proper authorisation — a board resolution and vakalatnama in order, or the filing may be defective.'],
  ['Is a caveat useful in property disputes?', 'Very often. It is commonly used where a sudden injunction or status quo order would disturb possession or a transaction.'],
  ['Is it useful after I win in a lower court?', 'Yes. Where the losing party is likely to appeal and seek a stay, a caveat in the appellate forum is a standard precaution.'],
  ['Does it apply to tribunals?', 'Only where the applicable law or rules permit a caveat or a caveat-like filing. It should be checked forum by forum.'],
  ['Can it be filed electronically?', 'Where the court offers e-filing, yes. Practice varies between forums and local rules apply.'],
  ['What if the other side is not served?', 'Protection may weaken, because service of notice on the expected applicant is part of the Section 148A scheme.'],
  ['What if the party name or address is wrong?', 'The registry may not connect the caveat to the application when it is filed, which defeats the purpose.'],
  ['Should I track it?', 'Yes. The expiry date should be diarised, and the filing or caveat number recorded so the position can be checked.'],
  ['Can Estabizz appear in court?', 'We handle forum assessment, drafting, filing coordination and expiry tracking. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Civil Procedure' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Caveat Filing' }]}
      title="Caveat Filing"
      readTime="12 min read"
      hideReviewBadge
      focusKeyword="Cavet Filing"
      sections={sections}
      ctaTitle="Speak With a Civil Litigation Expert"
      ctaDescription="Discuss the correct forum, the expected application and caveat strategy with the Estabizz team."
      quickFacts={[{ label: 'Main law', value: 'CPC, 1908' }, { label: 'Provision', value: 'Section 148A' }, { label: 'Validity', value: '90 days from lodging' }, { label: 'Purpose', value: 'Be heard before any order' }]}
      relatedArticles={[
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice deadlines, complaint preparation and recovery strategy.' },
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company petitions, restoration, IBC applications, schemes and NCLAT appeals.' },
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals, suspension of sentence and bail pending appeal.' }
      ]}
      finalCtaTitle="A Caveat Only Works Before the Order"
      finalCtaDescription="The whole value of a caveat is in being early. Once an ex-parte order exists, you are undoing something instead of preventing it."
      heroDescription={<p>A caveat is a preventive filing under Section 148A of the Code of Civil Procedure. It does not stop the other side from approaching the court — it stops them doing it without you knowing. Where an appeal, stay or injunction application is expected, a caveat obliges the court to give you notice so no interim order passes behind your back. Estabizz assists with forum assessment, drafting, filing, notice to the expected applicant and expiry tracking.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <div className="warning-box" aria-label="Spelling note">
          <p><strong>Caveat, not &ldquo;cavet&rdquo;.</strong> The correct legal term is <em>caveat</em>, under Section 148A of the Code of Civil Procedure, 1908. The misspelling is common enough that people search for it, but the filing itself must use the correct terminology.</p>
        </div>
        <p><strong>In simple terms…</strong> a caveat is lodged by a person who expects an application to be made in a matter affecting them, and who wants to be heard before the court passes any order on it.</p>
        <p><strong>What it does and does not do…</strong> it does not prevent the other side from filing, and it does not decide anything. What it does is remove the element of surprise: the court must give you notice of the application, so an ex-parte stay or injunction is not obtained without your knowledge.</p>
        <p>That distinction matters, because a caveat filed after an order has already been passed is worthless. Its entire value lies in being early.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main law', 'Code of Civil Procedure, 1908'],
          ['Main provision', 'Section 148A — right to lodge a caveat'],
          ['Caveator', 'The person lodging the caveat'],
          ['Expected applicant', 'The person who has filed, or may file, the application'],
          ['Notice by the caveator', 'Served on the expected applicant by registered post with acknowledgement due'],
          ['Court duty', 'To serve notice of the application on the caveator'],
          ['Applicant duty', 'To furnish copies of the application and documents, at the caveator&rsquo;s expense'],
          ['Validity', '90 days from lodging, unless the expected application is made within that period'],
          ['Court rules', 'Supreme Court, High Court and District Court rules, and local filing practice'],
          ['Proceedings covered', 'Suits, appeals, injunctions, stay applications, property disputes and other civil matters'],
          ['Tribunal proceedings', 'Only where the applicable law or rules permit a caveat-like filing'],
          ['Electronic filing', 'Through the court e-filing portal, where available']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['CPC s. 148A(1)', 'A person claiming a right to appear may lodge a caveat where an application is expected or has been made'],
          ['s. 148A(2)', 'The caveator must serve notice of the caveat by registered post with acknowledgement due'],
          ['s. 148A(3)', 'The court must serve notice of the application on the caveator'],
          ['s. 148A(4)', 'The applicant must furnish the caveator with copies of the application and supporting documents'],
          ['s. 148A(5)', 'The caveat remains valid for 90 days unless the application is filed within that period'],
          ['s. 9', 'Civil court jurisdiction, subject to express or implied bar'],
          ['s. 26 and Order IV', 'Institution of suits'],
          ['Order V', 'Service of summons and notices'],
          ['Order XXXIX Rules 1 and 2', 'Temporary injunction applications — the usual thing a caveat guards against'],
          ['Order XLI', 'Appeals from original decrees']
        ]} />
      </Section>

      <Section id="how-it-works" title="How Section 148A Works">
        <p>The scheme has three moving parts, and all three have to function for the protection to hold.</p>
        <DataTable headers={['Step', 'Who acts', 'What happens']} rows={[
          ['1. Lodging', 'Caveator', 'The caveat is filed in the forum where the application is expected'],
          ['2. Notice to the other side', 'Caveator', 'Notice of the caveat is served on the expected applicant by registered post AD'],
          ['3. Application is filed', 'Expected applicant', 'The application the caveat anticipated is made'],
          ['4. Court notice', 'Court', 'The court serves notice of the application on the caveator'],
          ['5. Documents furnished', 'Applicant', 'Copies of the application and supporting documents are given to the caveator'],
          ['6. Hearing', 'Both parties', 'The caveator is heard before any order is passed']
        ]} />
        <p>Step 2 is the one most often skipped. Where notice to the expected applicant is not served, the protection weakens, because the statutory scheme assumes both sides know the caveat exists.</p>
      </Section>

      <Section id="validity" title="Validity and the 90-Day Clock">
        <div className="warning-box" aria-label="Expiry note">
          <p><strong>A caveat lapses after 90 days, silently.</strong> Nothing is served on you when it expires. If the risk still exists, a fresh caveat has to be filed — a lapsed caveat and no caveat at all are the same thing.</p>
        </div>
        <DataTable headers={['Point', 'Practical meaning']} rows={[
          ['Standard validity', '90 days from the date of lodging'],
          ['Automatic expiry', 'It lapses if the expected application is not filed within that period'],
          ['Renewal', 'A fresh caveat may be filed if the risk continues'],
          ['Application filed within 90 days', 'The court should notify the caveator'],
          ['Fresh cause', 'A new proceeding or forum may need its own caveat'],
          ['Multiple courts', 'A caveat may be required separately in each'],
          ['Wrong forum', 'A caveat in the wrong court gives no protection in the right one'],
          ['Notice failure', 'Protection weakens if notice is not served on the expected applicant'],
          ['Tracking', 'The expiry date should be monitored deliberately'],
          ['Timing', 'File before the expected application, not after an order']
        ]} />
      </Section>

      <Section id="when-to-file" title="When to File">
        <DataTable headers={['Situation', 'Practical use']} rows={[
          ['The opposite party may appeal', 'Protects against an ex-parte stay'],
          ['A lower court order went in your favour', 'The losing party is the likely appellant'],
          ['A property dispute is active', 'Avoids a sudden injunction or status quo order'],
          ['You expect a stay application', 'Ensures a hearing before any stay'],
          ['You expect an injunction application', 'Protects possession, business or property rights'],
          ['A family property dispute exists', 'Avoids a one-sided interim order'],
          ['A builder-buyer dispute exists', 'Protects the project or property interest'],
          ['Landlord-tenant litigation is expected', 'Avoids a sudden restraint or possession order'],
          ['A contract dispute is escalating', 'Prevents ex-parte interim relief'],
          ['An execution proceeding may be challenged', 'Case-specific caveat strategy'],
          ['A company or director dispute exists', 'Protects against an urgent application']
        ]} />
      </Section>

      <Section id="use-cases" title="Common Use Cases">
        <p>The pattern is consistent: a caveat is worth filing wherever an adverse interim order would be hard to undo and easy to obtain quickly.</p>
        <DataTable headers={['Scenario', 'What a caveat prevents']} rows={[
          ['You succeeded at first instance', 'An appellate stay obtained before you are heard'],
          ['Disputed immovable property', 'A status quo order freezing a transaction'],
          ['Ongoing construction or development', 'A work-stop injunction'],
          ['Business or commercial contract dispute', 'An order restraining operations or payments'],
          ['Shareholding or management dispute', 'An urgent restraint on corporate action'],
          ['Matrimonial and family property matters', 'A one-sided interim arrangement'],
          ['Recovery and execution proceedings', 'A sudden stay of execution']
        ]} />
      </Section>

      <Section id="forums" title="Courts and Forums">
        <DataTable headers={['Forum', 'Position']} rows={[
          ['District Court', 'Caveat may be lodged where the application is expected'],
          ['High Court', 'Commonly used where an appeal or writ is anticipated'],
          ['Supreme Court', 'Subject to the Supreme Court Rules and practice'],
          ['Appellate side generally', 'Useful where the losing party is likely to appeal'],
          ['Tribunals', 'Only where the applicable law or rules permit a caveat-like filing'],
          ['Wrong forum', 'Gives no protection where the application is actually made']
        ]} />
        <p>Where an appeal could realistically go to more than one forum, the safer course is a caveat in each rather than a guess about which one the other side will choose.</p>
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Expected litigation and urgency understood'],
          ['2', 'Case or order review', 'Existing order, notice or lower court record reviewed'],
          ['3', 'Forum identification', 'Correct court or forum decided'],
          ['4', 'Caveator right review', 'Confirm the right to appear in the expected application'],
          ['5', 'Opposite party mapping', 'Expected applicant identified, with the correct address'],
          ['6', 'Subject matter drafting', 'Dispute, property, order or application defined'],
          ['7', 'Caveat petition drafting', 'Facts and prayer for notice and hearing'],
          ['8', 'Affidavit and vakalatnama', 'Filing documents prepared'],
          ['9', 'Court fee and checklist', 'Local court requirements completed'],
          ['10', 'Filing or e-filing', 'Caveat filed in the appropriate forum'],
          ['11', 'Notice to expected applicant', 'Registered post AD, with proof retained'],
          ['12', 'Caveat number and diary', 'Filing number recorded and expiry diarised']
        ]} />
      </Section>

      <Section id="petition-contents" title="What the Petition Should Include">
        <DataTable headers={['Detail', 'Why it matters']} rows={[
          ['Name of court', 'Correct forum'],
          ['Caveator details', 'Identifies the person seeking a hearing'],
          ['Expected applicant details', 'Identifies the expected filer'],
          ['Case or order details', 'Links the caveat to the expected proceeding'],
          ['Subject matter', 'Property, order, dispute or application'],
          ['Caveator&rsquo;s interest', 'Shows the right to appear'],
          ['Expected application', 'Stay, injunction, appeal or other application'],
          ['Prayer', 'That no order be passed without hearing the caveator'],
          ['Address for service', 'Enables the court to give notice'],
          ['Advocate details', 'Appearance and coordination'],
          ['Verification', 'Supports correctness']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Identity and address proof of the caveator', 'Filing requirement'],
          ['Existing order or decree, if any', 'Links the caveat to the expected appeal'],
          ['Lower court case details', 'Registry tagging'],
          ['Property or transaction documents', 'Establishes interest in property matters'],
          ['Contract or agreement', 'Establishes interest in commercial matters'],
          ['Notice or correspondence received', 'Evidence that an application is expected'],
          ['Board resolution, for a company', 'Authorisation to file'],
          ['Vakalatnama', 'Representation'],
          ['Expected applicant&rsquo;s correct address', 'Required for Section 148A(2) notice']
        ]} />
      </Section>

      <Section id="comparisons" title="Caveat vs Other Remedies">
        <DataTable headers={['Point', 'Caveat', 'Legal notice', 'Injunction application']} rows={[
          ['Filed with', 'The court', 'Sent to the opposite party', 'The court'],
          ['Purpose', 'Secure a hearing before any order', 'Assert a claim or demand', 'Obtain relief'],
          ['Timing', 'Before the expected application', 'Before or during a dispute', 'When relief is needed'],
          ['Effect', 'Court must notify you', 'No procedural effect in court', 'Court may restrain the other side'],
          ['Preventive or active', 'Preventive', 'Preliminary', 'Active'],
          ['Validity', '90 days', 'No fixed validity', 'Until decided or vacated']
        ]} />
        <p>A caveat is also not a reply. A reply answers a case already filed; a caveat is lodged in anticipation of one.</p>
      </Section>

      <Section id="risks" title="Risks of Filing It Badly">
        <DataTable headers={['Risk', 'Practical impact']} rows={[
          ['Filed in the wrong court', 'No protection in the forum that matters'],
          ['Expected applicant not served', 'Section 148A compliance issue'],
          ['Wrong address used', 'Notice and service problems'],
          ['Wrong party name', 'The registry may not tag the application'],
          ['Subject matter stated vaguely', 'The registry may not connect the caveat'],
          ['Existing order not attached', 'The appeal or stay risk is not apparent'],
          ['Expiry after 90 days', 'Protection lapses silently'],
          ['Renewal missed', 'Ex-parte order risk returns'],
          ['Filed after the order', 'Too late to prevent anything'],
          ['No tracking', 'The application may still move urgently'],
          ['Company authority missing', 'Filing defect']
        ]} />
      </Section>

      <Section id="common-issues" title="Issues We Commonly Fix">
        <DataTable headers={['Issue', 'How we support']} rows={[
          ['Uncertainty about the right forum', 'Forum assessment before drafting'],
          ['Vague subject matter', 'Precise drafting so the registry can tag it'],
          ['Notice to the other side not sent', 'Registered post AD with proof retained'],
          ['Expiry forgotten', 'Diarised expiry and renewal reminders'],
          ['Multiple possible forums', 'Parallel caveats where the risk justifies it'],
          ['Company authorisation missing', 'Resolution and vakalatnama prepared upfront'],
          ['No record of the filing number', 'Caveat number captured and tracked']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Forum assessment', 'Identify where the application is actually expected'],
          ['Right to appear review', 'Confirm the caveator&rsquo;s interest in the matter'],
          ['Caveat petition drafting', 'Facts, subject matter and prayer drafted precisely'],
          ['Affidavit and filing documents', 'Vakalatnama, authorisation and checklist'],
          ['Filing coordination', 'Filing or e-filing, and defect removal'],
          ['Notice to expected applicant', 'Registered post AD with proof'],
          ['Parallel caveats', 'Where more than one forum is realistic'],
          ['Expiry tracking', 'Diarised 90-day monitoring and renewal'],
          ['Post-filing watch', 'Track whether the anticipated application is made'],
          ['Advocate coordination', 'Briefing and appearance support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A caveat is cheap insurance that expires quietly. The two things that defeat it are filing in the wrong forum and forgetting the ninetieth day — both entirely avoidable with a diary entry and a moment&rsquo;s thought about where the other side will actually go.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Forum, the right to lodge a caveat and local filing practice vary, and parts of this guide are still undergoing professional review. Estabizz provides drafting, filing coordination and tracking; appearance is handled through enrolled advocates. Confirm the current position and local court rules with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
