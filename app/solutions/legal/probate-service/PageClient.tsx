'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'section-213', title: 'The Omission of Section 213' },
  { id: 'still-worth-it', title: 'When Probate Is Still Worth Obtaining' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'remedies', title: 'Probate, Letters of Administration and Succession Certificate' },
  { id: 'who-applies', title: 'Who Can Apply' },
  { id: 'proving-will', title: 'Proving the Will' },
  { id: 'process', title: 'How the Matter Runs' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'petition', title: 'What the Petition Must Contain' },
  { id: 'caveat', title: 'Caveats and Contested Probate' },
  { id: 'court-fee', title: 'Court Fee and Valuation' },
  { id: 'assets', title: 'Moving the Assets' },
  { id: 'post-grant', title: 'Inventory and Account After the Grant' },
  { id: 'nri', title: 'NRI Executors and Beneficiaries' },
  { id: 'revocation', title: 'Revocation of a Grant' },
  { id: 'common-issues', title: 'Why Probate Matters Stall' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Is probate still mandatory in India?', 'No. The Repealing and Amending Act, 2025, which received Presidential assent on 20 December 2025, omitted Section 213 of the Indian Succession Act, 1925. That section was the only provision barring a person from establishing a right as executor or legatee without a grant. With it gone, there is no statutory requirement to obtain probate before asserting rights under a Will, irrespective of religion or where the property is situated.'],
  ['So the Mumbai, Chennai and Kolkata rule no longer applies?', 'Correct. Section 213 read with Section 57 was what made probate compulsory for Wills of Hindus, Buddhists, Sikhs and Jains made within the former Lieutenant-Governorship of Bengal or within the ordinary original civil jurisdiction of the Madras and Bombay High Courts, or dealing with immovable property there. That territorial rule has gone with the section.'],
  ['Did this affect Christians and Parsis differently?', 'It removes the remaining distinction. Indian Christians had already been exempted from Section 213 by an amendment in 2002, while Parsis remained within it. After the 2025 omission there is no religion-specific carve-out, because there is no requirement left to carve out of.'],
  ['Can I still apply for probate?', 'Yes. The omission removed the compulsion, not the remedy. Sections 222, 227, 264, 276, 281, 283, 284 and 295 of the Indian Succession Act are untouched, and the testamentary jurisdiction of the District Court and the High Court continues as before.'],
  ['Then why would anyone bother?', 'Because a grant of probate is a judgment in rem. It binds the world, not just the parties before the court, and it closes the question of whether the Will is genuine. Where a challenge is likely, where the estate is substantial, or where an institution or a buyer wants certainty of title, that finality is the whole point.'],
  ['Will banks and housing societies stop asking for probate?', 'Not necessarily, and not immediately. The statutory mandate has gone; institutional document policies are a separate thing and tend to lag. Where a bank, society, registrar or purchaser insists, the practical choice is between persuading them that no requirement survives and obtaining the grant anyway. We assess which is faster in the particular case.'],
  ['Does the omission apply to proceedings already pending?', 'The Act protects rights and liabilities already accrued and proceedings already instituted or concluded, so grants already made and petitions already filed are unaffected. Whether a pending suit in which Section 213 was pleaded as a bar can now proceed without a grant is less settled. High Court authority treating Section 213 as procedural rather than substantive supports immediate application, but the point has not been authoritatively resolved at the Supreme Court.'],
  ['What is the difference between probate and letters of administration?', 'Probate is granted to an executor appointed by the Will. Letters of administration are granted where there is no executor, the executor is unable or unwilling to act, or has died — including letters of administration with the Will annexed, which is the route for a universal or residuary legatee under Section 232.'],
  ['What is a succession certificate?', 'A certificate under Part X of the Indian Succession Act authorising the holder to collect debts and securities of the deceased — bank balances, deposits, shares. It does not establish title to immovable property and does not determine the validity of a Will.'],
  ['Is a legal heir certificate the same thing?', 'No. A legal heir certificate is an administrative document issued by a revenue or local authority identifying who the heirs are. It is useful for pensions and government benefits. It does not prove a Will and is not a determination of title.'],
  ['Does a registered Will still need witness proof?', 'Yes, and this catches people out. Section 67 of the Bharatiya Sakshya Adhiniyam requires at least one attesting witness to be called to prove execution of a document required by law to be attested, where such a witness is alive and capable of giving evidence. The exemption for registered documents expressly does not extend to a Will. Registration helps on authenticity; it does not remove the need for witness proof.'],
  ['What if the attesting witnesses have died?', 'Section 67 operates only where an attesting witness is alive, subject to the process of the court and capable of giving evidence. Where none is available, execution is proved by other means — handwriting evidence, the scribe, the registering officer, surrounding circumstances. The case becomes harder, not impossible.'],
  ['What if the original Will cannot be found?', 'A copy can be propounded, but the burden becomes considerably heavier: the loss must be explained, the contents proved, and the inference that the testator destroyed it with intent to revoke must be displaced. Treat the original as the single most important document in the file.'],
  ['Is an unregistered Will valid?', 'Yes. Registration of a Will has never been compulsory. Validity turns on execution and attestation under Section 63 — signature by the testator, and attestation by two or more witnesses who saw the testator sign.'],
  ['How much is the court fee?', 'It depends on the State and the value of the estate. Maharashtra charges a graded fee reaching seven and a half per cent on value above three lakh rupees, subject to a maximum of seventy-five thousand rupees, reduced to a maximum of ten thousand rupees for widows. Other States have their own slabs, some without a cap. Estimate it before filing, because on a large estate it is a material cost.'],
  ['How long does a probate petition take?', 'An uncontested petition with a complete file, available witnesses and no objection is measured in months. A contested matter becomes a suit-like proceeding with pleadings, evidence and cross-examination, and the timeline is that of litigation.'],
  ['What is a caveat in a probate matter?', 'A caution filed under Section 284 by a person interested in the estate, asking that no grant be made without hearing them. Once a caveat is filed and the caveator enters an appearance, the proceeding becomes contentious and follows Section 295.'],
  ['On what grounds is a Will usually challenged?', 'Forgery, lack of testamentary capacity, undue influence or coercion, suspicious circumstances around execution, the existence of a later Will, and defective attestation. Suspicious circumstances are the most commonly argued, because they shift the practical burden onto the propounder.'],
  ['Can a grant of probate be revoked?', 'Yes, under Section 263, for just cause — a defective proceeding, a grant obtained fraudulently or by suppression, citations not issued to those entitled, or a grant that has become useless. This is a reason to get the citations right the first time.'],
  ['What are the executor duties after the grant?', 'Section 317 requires the executor or administrator to file an inventory of the estate within six months of the grant and an account of the estate within one year, unless the court extends the time. Executors who treat the grant as the end of the matter create problems for themselves later.'],
  ['Can an NRI executor act without travelling to India?', 'Largely, yes. Documents executed abroad will usually need notarisation and apostille or consular attestation, a power of attorney has to be drawn carefully for the purpose, and evidence may need to be recorded by video conferencing where the court permits. Plan the authentication early; it is the step that creates most of the delay.'],
  ['Is there a time limit for applying for probate?', 'There is no fixed limitation in the ordinary sense, but a long unexplained delay invites scrutiny and must be accounted for. The real constraint is evidentiary: attesting witnesses age, records are lost, and assets get dealt with in the meantime.'],
  ['If probate is no longer required, what should families do instead?', 'Prove the Will to the satisfaction of whoever controls the asset. That usually means the original Will, the death certificate, an attesting witness willing to depose or affirm, an indemnity where the institution asks for one, and the heirs on record. Where any of that is missing or contested, probate is the route that resolves it conclusively.'],
  ['What is the biggest mistake in probate matters?', 'Filing before deciding whether a grant is actually needed. With Section 213 gone, a petition filed out of habit can add a year and a substantial court fee to an estate that could have been transferred on documents.'],
  ['Can Estabizz help after the grant?', 'Yes — certified copies, mutation, society transfer, bank and demat transmission, and the Section 317 inventory and account.']
] as [string, string][]).map(([q, a]) => ({ q, a }));

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id} className="visible">{title}</h2>{children}</section>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto my-6 rounded-lg border border-blue-100 dark:border-[#27272b]"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Succession' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Probate Service' }]}
      title="Probate Service"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Probate Service"
      sections={sections}
      ctaTitle="Speak With a Succession Law Expert"
      ctaDescription="Establish whether a grant is actually needed now that Section 213 has gone, and build the estate file either way."
      quickFacts={[
        { label: 'Main law', value: 'Indian Succession Act, 1925' },
        { label: 'Section 213', value: 'Omitted, December 2025' },
        { label: 'Probate now', value: 'Optional, not mandatory' },
        { label: 'Forum', value: 'District Court or High Court' }
      ]}
      relatedArticles={[
        { title: 'Caveat Filing', href: '/solutions/legal/caveat-filing', category: 'Legal', description: 'Entering a caveat, the right to be heard, and what follows once a matter becomes contentious.' },
        { title: 'Gift Deed Registration', href: '/solutions/legal/gift-deed-registration', category: 'Legal', description: 'Transferring property during lifetime — execution, stamp duty, registration and acceptance.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="Decide Whether You Need a Grant Before You File"
      finalCtaDescription="Since December 2025 probate has been optional. On some estates it remains the only thing that settles the question; on others it is a year and a court fee spent on a requirement that no longer exists."
      heroDescription={<p>Probate stopped being compulsory in December 2025, when Section 213 of the Indian Succession Act was omitted. That changes the first question in every estate: not how to obtain a grant, but whether one is needed at all. Estabizz assists executors, beneficiaries, legal heirs, NRIs and business families with Will review, applicability assessment, jurisdiction mapping, asset schedules, petition drafting support, attesting witness and evidence strategy, caveat and contested probate support, letters of administration and succession certificate routes, court fee planning, and post-grant transfer of property, bank, demat and society records.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> probate is a court certifying that a Will is genuine and that the executor named in it may administer the estate.</p>
        <p>For a century that certificate was compulsory in parts of India. If a Hindu, Buddhist, Sikh or Jain testator made a Will in Mumbai, Chennai or Kolkata, or left immovable property there, no executor or legatee could establish a right under it without a grant. Families with a clear, registered, uncontested Will still spent a year in the testamentary court because a single section said they had to.</p>
        <p>That section has gone. What remains is a choice — and on some estates it is still an easy one to make in favour of obtaining the grant.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Probate is not a licence or a registration. It is a grant made by a court exercising testamentary jurisdiction, certifying a Will and the executor&rsquo;s authority.</p>
        <p>The governing law is the Indian Succession Act, 1925. Since the Repealing and Amending Act, 2025 omitted Section 213, a grant is no longer a statutory precondition to establishing a right as executor or legatee anywhere in India. Probate remains available and remains a judgment in rem, which is why it is still the right answer where a Will is likely to be challenged, where the estate is large, or where an institution or buyer requires conclusive proof.</p>
      </Section>

      <Section id="section-213" title="The Omission of Section 213">
        <div className="warning-box" aria-label="Change in the governing law">
          <p><strong>Section 213 of the Indian Succession Act, 1925 has been omitted.</strong> The Repealing and Amending Act, 2025 received Presidential assent on 20 December 2025, and Section 3 of that Act read with its Second Schedule removed Section 213 from the statute book. Section 213 was the sole provision barring a person from establishing any right as executor or legatee without probate or letters of administration having been granted. Any advice that probate is <em>required</em> because the property is in Mumbai, Chennai or Kolkata is now wrong.</p>
        </div>
        <DataTable headers={['Position', 'Before the omission', 'After the omission']} rows={[
          ['Statutory requirement', 'Section 213 barred establishing a right as executor or legatee without a grant', 'No statutory precondition remains'],
          ['Territorial trigger', 'Wills made, or immovable property situated, within the former Bengal Lieutenant-Governorship or the ordinary original civil jurisdiction of the Madras and Bombay High Courts', 'No territorial trigger'],
          ['Religion', 'Applied to Hindus, Buddhists, Sikhs and Jains in those territories; Parsis within it; Indian Christians exempted by the 2002 amendment', 'No religion-specific position, as no requirement survives'],
          ['Availability of probate', 'Available, and compulsory in the covered cases', 'Available, and voluntary in every case'],
          ['Effect of a grant', 'Judgment in rem', 'Judgment in rem — unchanged'],
          ['Other probate provisions', 'Sections 222 to 317 in force', 'Sections 222 to 317 in force, unchanged'],
          ['Grants already made', 'Valid', 'Unaffected — the Act protects accrued rights and concluded proceedings'],
          ['Petitions already filed', 'Pending', 'Unaffected by the savings provision']
        ]} />
        <p>One question is genuinely unsettled, and it is worth stating rather than glossing over. Where a suit was filed before December 2025 and the defendant pleaded Section 213 as a bar, can the plaintiff now proceed without a grant? High Court authority treating Section 213 as procedural rather than substantive supports the view that the omission applies immediately, and the savings clause protects accrued rights rather than pleaded defences. The point has not been settled at the Supreme Court, so a litigant relying on it should expect it to be argued.</p>
      </Section>

      <Section id="still-worth-it" title="When Probate Is Still Worth Obtaining">
        <p>Removing a compulsion is not the same as removing a reason. A grant of probate is a judgment in rem: it binds everyone, not only the parties who appeared, and it forecloses the question of whether the Will is genuine. Nothing short of a grant does that.</p>
        <DataTable headers={['Situation', 'Is a grant worth it?', 'Why']} rows={[
          ['A family member has threatened to challenge the Will', 'Yes', 'Resolve it once, in rem, rather than in every later transaction'],
          ['Suspicious circumstances surround execution', 'Yes', 'The court determines genuineness now, while witnesses are available'],
          ['A later Will is rumoured to exist', 'Yes', 'The testamentary court is the forum that settles which Will operates'],
          ['Substantial immovable property is being sold', 'Usually', 'A purchaser and their lender will want conclusive title comfort'],
          ['An institution, society or registrar insists on a grant', 'Often faster than arguing', 'Policy lags legislation; weigh persuasion against the cost of the petition'],
          ['The executor must deal with assets across several States', 'Usually', 'One grant is simpler than negotiating with each asset holder'],
          ['Attesting witnesses are elderly or unwell', 'Yes, and promptly', 'Evidence of execution is perishable in a way the estate is not'],
          ['A clear Will, cooperating heirs, modest estate', 'Generally not', 'The transfer can usually be completed on documents and an indemnity'],
          ['All heirs have signed no-objection and consent', 'Generally not', 'Nothing is in dispute for a grant to resolve'],
          ['Only bank balances, deposits and securities', 'Consider a succession certificate instead', 'The lighter remedy is designed for debts and securities'],
          ['There is no Will at all', 'Not applicable', 'Intestate succession — letters of administration or a succession certificate']
        ]} />
        <div className="info-box" aria-label="The practical reality">
          <p><strong>Expect institutional practice to lag the law.</strong> Banks, housing societies, sub-registrars, depositories and purchasers operate on internal documentation policies, and those policies were written when Section 213 existed. An asset holder is entitled to ask for comfort before transferring; what they are no longer entitled to do is say the law requires a grant. Where a written representation citing the omission does not move them, obtaining the grant may still be the quicker route — that is a commercial judgement, not a legal one.</p>
        </div>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Indian Succession Act, 1925'],
          ['Amending law', 'Repealing and Amending Act, 2025 — assent 20 December 2025, omitting Section 213'],
          ['Forum', 'District Court, or a High Court exercising testamentary and intestate jurisdiction'],
          ['Procedure', 'Indian Succession Act, Part IX, and the applicable High Court or civil rules'],
          ['Contentious proceedings', 'Indian Succession Act, Section 295 — tried as a suit'],
          ['Court fees', 'Court Fees Act, 1870, and the State court-fee legislation'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023 — Section 67 for attested documents'],
          ['Electronic records', 'BSA Sections 61 to 63, where digital records are relied upon'],
          ['Will registration', 'Registration Act, 1908 — optional for a Will'],
          ['Property transfer after the grant', 'State revenue, municipal, land record and society rules'],
          ['Securities and deposits', 'Depository, bank and company transmission procedures'],
          ['Authority', 'The court; with the Sub-Registrar, revenue authority, bank, depository, company or society for giving effect to the grant']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Indian Succession Act, Section 57', 'Application of certain Part VI provisions to Wills of Hindus, Buddhists, Sikhs and Jains'],
          ['Indian Succession Act, Section 63', 'Execution of an unprivileged Will — signature and attestation by two or more witnesses'],
          ['Indian Succession Act, Section 70', 'Revocation of an unprivileged Will or codicil'],
          ['Indian Succession Act, Section 211', 'The executor or administrator as legal representative of the deceased'],
          ['Indian Succession Act, Section 213', 'Omitted by the Repealing and Amending Act, 2025'],
          ['Indian Succession Act, Section 222', 'Probate may be granted only to an executor appointed by the Will'],
          ['Indian Succession Act, Section 223', 'Persons to whom probate cannot be granted — minors, persons of unsound mind'],
          ['Indian Succession Act, Section 227', 'Effect of probate — it establishes the Will from the testator’s death'],
          ['Indian Succession Act, Section 232', 'Letters of administration with the Will annexed to a universal or residuary legatee'],
          ['Indian Succession Act, Section 263', 'Revocation or annulment of a grant for just cause'],
          ['Indian Succession Act, Section 264', 'Jurisdiction of the District Judge in granting and revoking probate'],
          ['Indian Succession Act, Section 276', 'The petition for probate and what it must state'],
          ['Indian Succession Act, Section 281', 'Verification of the petition by at least one attesting witness'],
          ['Indian Succession Act, Section 283', 'Powers of the District Judge, including issue of citations'],
          ['Indian Succession Act, Section 284', 'Caveat against the grant of probate or administration'],
          ['Indian Succession Act, Section 295', 'Contentious cases are tried as a suit'],
          ['Indian Succession Act, Section 317', 'Inventory within six months and account within one year of the grant'],
          ['Indian Succession Act, Part X', 'Succession certificates for debts and securities'],
          ['BSA, Section 67', 'An attesting witness must be called; the registered-document exemption does not apply to a Will']
        ]} />
      </Section>

      <Section id="remedies" title="Probate, Letters of Administration and Succession Certificate">
        <p>Choosing the wrong remedy is the most common cause of a wasted year. The three are not interchangeable, and with probate no longer compulsory the lighter options deserve a harder look than they used to get.</p>
        <DataTable headers={['Point', 'Probate', 'Letters of administration', 'Succession certificate']} rows={[
          ['Precondition', 'A Will that appoints an executor', 'No executor, or the executor cannot or will not act', 'With or without a Will'],
          ['Who may apply', 'The executor appointed by the Will', 'A legatee, heir or other eligible applicant', 'An heir or claimant'],
          ['What it establishes', 'The Will, and the executor’s authority', 'The administrator’s authority over the estate', 'Authority to collect debts and securities'],
          ['Effect', 'Judgment in rem', 'Judgment in rem', 'Not a determination of title'],
          ['Covers immovable property', 'Yes', 'Yes', 'No'],
          ['Typical use', 'Estate administration and distribution under the Will', 'Administration where there is no executor to act', 'Bank balances, deposits, shares and receivables'],
          ['Relative cost and time', 'Highest', 'Comparable to probate', 'Lower'],
          ['Statutory basis', 'Sections 222 to 227', 'Sections 232 onwards', 'Part X']
        ]} />
        <p>A legal heir certificate from a revenue or local authority sits outside this table entirely. It identifies heirs for administrative purposes such as pensions and benefits. It does not prove a Will and does not determine title.</p>
      </Section>

      <Section id="who-applies" title="Who Can Apply">
        <DataTable headers={['Applicant', 'Position']} rows={[
          ['Executor named in the Will', 'The only person to whom probate may be granted, under Section 222'],
          ['Several executors', 'May apply together, or a grant may be made to one with power reserved to the others'],
          ['Executor according to the tenor of the Will', 'Where the Will confers executor functions without using the word'],
          ['Universal or residuary legatee', 'Letters of administration with the Will annexed, under Section 232'],
          ['A legal heir', 'May apply for administration, or participate, consent or object'],
          ['A minor or person of unsound mind', 'Cannot be granted probate, under Section 223'],
          ['A company or institution', 'Possible where appointed and legally capable of acting'],
          ['An NRI executor', 'Can apply, with authentication of documents and representation arranged'],
          ['A person interested in the estate', 'May file a caveat under Section 284 rather than apply']
        ]} />
      </Section>

      <Section id="proving-will" title="Proving the Will">
        <p>With the statutory compulsion gone, proving the Will is the work that actually matters — whether it is done before a court or before a bank. The requirements are the same in substance; only the audience changes.</p>
        <DataTable headers={['Requirement', 'What satisfies it']} rows={[
          ['Due execution under Section 63', 'The testator’s signature or mark, made or acknowledged in the presence of the witnesses'],
          ['Attestation', 'Two or more witnesses, each having seen the testator sign and having signed in the testator’s presence'],
          ['Attesting witness evidence', 'At least one attesting witness called, under BSA Section 67, where one is alive and able to depose'],
          ['Testamentary capacity', 'Evidence that the testator understood the nature and effect of the Will'],
          ['Absence of undue influence', 'Circumstances of execution, independence of advice, and the natural or explained distribution'],
          ['The original document', 'Produced; where lost, the loss explained and the contents proved'],
          ['No later Will or codicil', 'Searches, declarations and the evidence of those close to the testator'],
          ['Suspicious circumstances displaced', 'Explanation of whatever raises doubt — a frail testator, an unnatural exclusion, an interested scribe'],
          ['Electronic records relied upon', 'Preserved in the form the BSA requires, under Sections 61 to 63']
        ]} />
        <div className="info-box" aria-label="Registration does not replace witness proof">
          <p><strong>A registered Will is not self-proving.</strong> Section 67 of the Bharatiya Sakshya Adhiniyam requires an attesting witness to be called for a document the law requires to be attested, and the exemption it gives for registered documents expressly does not extend to a Will. Registration is useful corroboration of date and execution. It is not a substitute for the witness.</p>
        </div>
      </Section>

      <Section id="process" title="How the Matter Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Will, assets, heirs and objectives assessed'],
          ['2', 'Applicability assessment', 'Whether a grant is needed at all, now that Section 213 has gone'],
          ['3', 'Remedy selection', 'Probate, letters of administration, succession certificate, or documents and indemnity'],
          ['4', 'Will review', 'Execution, attestation, executor clause, codicils and revocation'],
          ['5', 'Jurisdiction mapping', 'The competent District Court or High Court'],
          ['6', 'Heir and citation mapping', 'Family tree and every person entitled to citation'],
          ['7', 'Asset schedule', 'Movable and immovable estate with values for court-fee purposes'],
          ['8', 'Court fee estimate', 'State-wise computation before filing, not after'],
          ['9', 'Petition drafting support', 'Petition, affidavits and the attesting witness verification'],
          ['10', 'Filing coordination', 'Filing through an advocate, with annexures and valuation'],
          ['11', 'Citation and notice', 'Service on those entitled, and public citation where directed'],
          ['12', 'Caveat monitoring', 'Watch for objections and prepare the contested strategy'],
          ['13', 'Evidence stage', 'Attesting witness and documentary proof of execution'],
          ['14', 'Grant and certified copies', 'The sealed grant and copies for each asset holder'],
          ['15', 'Asset transfer', 'Mutation, society transfer, bank and demat transmission'],
          ['16', 'Post-grant compliance', 'Section 317 inventory and account']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Original Will', 'The document to be proved — treat it as irreplaceable'],
          ['Codicils, if any', 'Amendments to the Will'],
          ['Death certificate of the testator', 'Proof of death and the date it occurred'],
          ['Identity and address proof of the executor', 'Applicant verification'],
          ['Executor appointment clause', 'Establishes the authority claimed'],
          ['List of legal heirs and family tree', 'Citation and consent or objection planning'],
          ['Details of the attesting witnesses', 'Availability and contactability for evidence'],
          ['Affidavit of an attesting witness', 'Verification of the petition under Section 281'],
          ['Asset schedule', 'Movable and immovable estate for the petition and the court fee'],
          ['Property documents', 'Sale deed, share certificate, mutation entry and tax receipts'],
          ['Bank and deposit details', 'Financial assets forming part of the estate'],
          ['Demat and securities records', 'Shares, mutual funds and other holdings'],
          ['Valuation report, where required', 'Estate value for the court fee'],
          ['No-objection from heirs, where available', 'Keeps the petition uncontested'],
          ['Any caveat or objection received', 'Determines the contested strategy'],
          ['NRI documents', 'Passport, overseas address, notarisation and apostille'],
          ['Power of attorney, where used', 'Representation where the executor cannot attend'],
          ['Prior correspondence with asset holders', 'Shows what each institution has asked for']
        ]} />
      </Section>

      <Section id="petition" title="What the Petition Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Particulars of the deceased', 'Name, date of death and last ordinary residence'],
          ['Particulars of the executor', 'Identity and the clause conferring the appointment'],
          ['Details of the Will', 'Date, place of execution and the attesting witnesses'],
          ['Jurisdictional facts', 'Why this court can entertain the petition'],
          ['The asset schedule', 'Movable and immovable estate, with values'],
          ['Every person entitled to citation', 'Omission here is the most common ground for later revocation'],
          ['The executor’s declaration', 'Willingness to act and administer the estate'],
          ['Verification by an attesting witness', 'Required by Section 281'],
          ['Consents or no-objections', 'Where heirs do not oppose the grant'],
          ['The prayer', 'The grant sought, and in what capacity'],
          ['Court fee valuation', 'Estate value and the fee computed under the State law'],
          ['Annexures', 'Will, death certificate, identity and asset records']
        ]} />
      </Section>

      <Section id="caveat" title="Caveats and Contested Probate">
        <p>Any person interested in the estate may file a caveat under Section 284 asking that no grant be made without hearing them. Once the caveator appears, the matter is converted into a contentious proceeding under Section 295 and tried as a suit — with pleadings, issues, evidence and cross-examination.</p>
        <DataTable headers={['Ground of challenge', 'What it turns on']} rows={[
          ['Forgery', 'Signature comparison, handwriting evidence and the document itself'],
          ['Lack of testamentary capacity', 'Medical records and evidence of the testator’s condition at execution'],
          ['Undue influence or coercion', 'The relationship, the opportunity and the terms of the Will'],
          ['Suspicious circumstances', 'Unnatural exclusion, an interested scribe or beneficiary, a frail testator'],
          ['A later Will or codicil', 'Production of the later document and proof of its execution'],
          ['Defective attestation', 'Whether the witnesses saw the testator sign, and signed in the testator’s presence'],
          ['Heirs not cited', 'Whether every person entitled to notice received it'],
          ['Jurisdiction', 'Residence of the deceased and the location of the property'],
          ['Executor’s conduct or incapacity', 'Fitness to be granted probate']
        ]} />
        <p>Where a caveat is likely, filing with the heirs&rsquo; consents already obtained changes the trajectory of the whole matter. See <Link href="/solutions/legal/caveat-filing">Caveat Filing</Link> for the mechanics, and <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link> for how a contentious matter proceeds once it is tried as a suit.</p>
      </Section>

      <Section id="court-fee" title="Court Fee and Valuation">
        <p>Probate court fee is ad valorem on the estate, and because it is set by State legislation it varies widely. On a substantial estate it is a material cost and should be computed before filing.</p>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Basis', 'The value of the estate disclosed in the schedule'],
          ['Governing law', 'Court Fees Act, 1870, as amended by, or replaced in, each State'],
          ['Maharashtra', 'Graded, reaching seven and a half per cent on value above three lakh rupees, subject to a maximum of seventy-five thousand rupees'],
          ['Maharashtra, for widows', 'The maximum is reduced to ten thousand rupees for probate, administration and heirship applications'],
          ['Other States', 'Separate slabs; some cap the fee and some do not'],
          ['Immovable property', 'Valuation is usually required to support the figure'],
          ['Movable assets', 'Bank balances, deposits and securities are listed at value'],
          ['Under-valuation', 'Invites objection, a revenue reference and delay'],
          ['Timing', 'Fee is dealt with as the court directs — estimate it before filing']
        ]} />
        <p>With probate now optional, the court fee belongs in the decision itself. On a modest estate with cooperating heirs, the fee and the year spent obtaining a grant may considerably exceed the friction of transferring on documents.</p>
      </Section>

      <Section id="assets" title="Moving the Assets">
        <DataTable headers={['Asset', 'What the holder typically wants', 'With Section 213 gone']} rows={[
          ['Immovable property — mutation', 'Will, death certificate and heir details', 'Grant no longer required by law; the authority’s own procedure governs'],
          ['Sale of inherited property', 'Title comfort for the purchaser and their lender', 'A grant remains the strongest comfort available'],
          ['Housing society transfer', 'Will, death certificate, nomination and an indemnity', 'Many societies still ask for a grant as policy'],
          ['Bank accounts and deposits', 'Will or succession certificate, with an indemnity', 'A succession certificate is often the proportionate route'],
          ['Shares and demat holdings', 'Transmission documents and the depository format', 'Depository procedure governs; thresholds apply'],
          ['Mutual funds', 'Transmission request and KYC of the claimant', 'Registrar procedure governs'],
          ['Insurance proceeds', 'Nominee details', 'A nominee receives, but may hold for the estate — the distinction matters'],
          ['Vehicles', 'Transfer application to the registering authority', 'Administrative process'],
          ['Business interests and shareholding', 'Articles, partnership deed and board process', 'Constitutional documents govern transmission'],
          ['Digital assets and accounts', 'Platform-specific policies', 'Access is often the practical obstacle, not title']
        ]} />
      </Section>

      <Section id="post-grant" title="Inventory and Account After the Grant">
        <p>Executors frequently treat the grant as the finishing line. Section 317 does not.</p>
        <DataTable headers={['Obligation', 'Timeline', 'Why it matters']} rows={[
          ['Inventory of the estate', 'Within six months of the grant, unless extended', 'Records what the executor took charge of'],
          ['Account of the estate', 'Within one year of the grant, unless extended', 'Shows receipts, payments and distribution'],
          ['Accuracy', 'Both must be true and complete', 'A false inventory or account carries consequences for the executor'],
          ['Beneficiary transparency', 'Throughout administration', 'The single best protection against a misappropriation allegation'],
          ['Distribution records', 'As assets are distributed', 'Supports closure and discharge'],
          ['Liabilities and taxes', 'Before distribution', 'Distributing before debts are met exposes the executor personally']
        ]} />
      </Section>

      <Section id="nri" title="NRI Executors and Beneficiaries">
        <DataTable headers={['Situation', 'What it requires']} rows={[
          ['NRI executor who cannot travel', 'A power of attorney drawn for the purpose, and advocate representation'],
          ['Documents executed abroad', 'Notarisation and apostille, or consular attestation'],
          ['Will executed outside India', 'Assessment of its validity and enforceability for Indian assets'],
          ['Overseas death certificate', 'Attestation and certified translation where needed'],
          ['Heirs resident abroad', 'Citation and consent planning across jurisdictions'],
          ['Evidence of the attesting witness abroad', 'Video conferencing, where the court permits it'],
          ['Foreign assets in the estate', 'Separate advice under the law of that jurisdiction'],
          ['Indian bank and demat assets', 'Transmission in the institution’s format, with repatriation rules in mind'],
          ['Repatriation of proceeds', 'Exchange control and tax compliance assessed separately']
        ]} />
        <p>Authentication is what sets the timeline on an NRI matter. Start the apostille and attestation chain at the outset, because it runs on its own clock and does not compress.</p>
      </Section>

      <Section id="revocation" title="Revocation of a Grant">
        <p>Section 263 allows a grant to be revoked or annulled for just cause. The grounds are instructive mainly as a checklist of what to get right the first time.</p>
        <DataTable headers={['Just cause', 'How it arises']} rows={[
          ['The proceeding was defective in substance', 'Jurisdiction, parties or procedure fundamentally wrong'],
          ['The grant was obtained fraudulently', 'Misrepresentation to the court'],
          ['The grant was obtained by suppression', 'A material fact concealed, such as a later Will'],
          ['An untrue allegation of a material fact', 'Even where made without fraudulent intent'],
          ['Citations not issued to those entitled', 'Interested persons kept out of the proceeding'],
          ['The grant has become useless and inoperative', 'Circumstances have changed since it was made'],
          ['The executor has failed in statutory duties', 'Including the inventory and account under Section 317']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Probate Matters Stall">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A petition filed out of habit after the omission', 'A year and a court fee spent on a requirement that no longer exists', 'Applicability assessment before anything is drafted'],
          ['No executor appointed by the Will', 'Probate is not maintainable at all', 'Letters of administration with the Will annexed under Section 232'],
          ['Heirs omitted from the citation list', 'Objection now, or revocation later', 'Family tree and citation mapping'],
          ['The original Will cannot be located', 'The burden of proof rises steeply', 'Lost-Will strategy, searches and secondary evidence'],
          ['Attesting witnesses unavailable', 'Section 67 proof becomes indirect', 'Early identification, affidavits and alternative proof'],
          ['Assumption that a registered Will proves itself', 'Evidence stage collapses', 'Witness proof planned from the start'],
          ['Incomplete asset schedule', 'Objection, amendment and re-valuation', 'Estate checklist across property, banks, demat and business interests'],
          ['Court fee not estimated', 'Budget shock, sometimes after filing', 'State-wise computation before filing'],
          ['Caveat ignored', 'A contested suit nobody prepared for', 'Monitoring, and consents obtained before filing where possible'],
          ['NRI authentication left late', 'Months added to the timeline', 'Apostille and attestation chain started at the outset'],
          ['Institution refuses despite the omission', 'Deadlock', 'Written representation citing the omission, then a reasoned choice'],
          ['Inventory and account overlooked', 'Executor exposure after the grant', 'Section 317 compliance tracked']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Applicability assessment', 'Whether a grant is needed, after the omission of Section 213'],
          ['Will review', 'Execution, attestation, executor clause, codicils and revocation'],
          ['Remedy selection', 'Probate, administration, succession certificate or a documents-and-indemnity route'],
          ['Jurisdiction mapping', 'The competent District Court or High Court'],
          ['Heir and citation mapping', 'Family tree and every person entitled to notice'],
          ['Asset schedule preparation', 'Property, bank, demat, business and personal assets'],
          ['Court fee planning', 'State-wise computation and valuation support'],
          ['Petition drafting support', 'Petition, affidavits and witness verification'],
          ['Attesting witness strategy', 'Availability, affidavits and BSA Section 67 proof'],
          ['Lost or disputed Will strategy', 'Secondary evidence and suspicious-circumstances response'],
          ['Caveat and contested support', 'Objection strategy and Section 295 preparation'],
          ['Letters of administration', 'Where no executor can act'],
          ['Succession certificate support', 'For debts and securities'],
          ['Institutional representation', 'Written position for banks, societies and registrars'],
          ['NRI documentation', 'Apostille, attestation, power of attorney and remote appearance'],
          ['Post-grant transfer', 'Mutation, society, bank and demat transmission'],
          ['Section 317 compliance', 'Inventory and account of the estate'],
          ['Ticket-based tracking', 'Drafting, filing, citation, caveat, hearing, grant and transfer']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The omission of Section 213 changed the first question families should ask. It is no longer how to obtain probate but whether a grant is needed at all — and on many estates it is not. Where a Will is likely to be challenged, a grant is still the only thing that settles the question for everyone. Where the heirs agree and the estate is modest, the file that matters is the original Will, a willing attesting witness and a complete asset schedule.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a grant is required or advisable, which remedy fits, the competent forum, the court fee and the likely timeline depend entirely on the Will, the assets, the heirs and the State concerned. The position stated here reflects the Indian Succession Act, 1925 as amended by the Repealing and Amending Act, 2025, which received assent on 20 December 2025; the effect of the omission of Section 213 on proceedings pending at that date has not been authoritatively settled, and parts of this guide remain under professional review. Estabizz provides applicability assessment, document and estate review, drafting support, evidence planning and filing coordination; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
