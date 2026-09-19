'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'the-timeline', title: 'The Notice Period and the Three-Month Clock' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Sections' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'process', title: 'Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'objections', title: 'If an Objection Is Raised' },
  { id: 'interfaith', title: 'Interfaith and Inter-Caste Marriage' },
  { id: 'nri', title: 'NRIs and Foreign Nationals' },
  { id: 'vs-registration', title: 'Court Marriage vs Marriage Registration' },
  { id: 'risks', title: 'What Goes Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is court marriage?', 'A civil marriage solemnised before a Marriage Officer under the Special Marriage Act, 1954. No religious ceremony or conversion is involved.'],
  ['What is the minimum age?', 'The male party must have completed 21 years and the female party 18 years, under Section 4.'],
  ['Is a religious ceremony required?', 'No. That is the point of the Special Marriage Act — it provides a secular civil route with a statutory certificate.'],
  ['Do we have to convert for an interfaith marriage?', 'No. The Act exists precisely so that parties of different faiths can marry without either converting.'],
  ['How long does it take?', 'A statutory notice period applies after the notice of intended marriage is filed, during which objections may be raised. Solemnisation follows once that period ends and no valid objection stands.'],
  ['How long is the notice valid?', 'Under Section 14, the notice becomes ineffective if the marriage is not solemnised within three months of the notice date. A fresh notice is then required.'],
  ['Where do we file the notice?', 'With the Marriage Officer of a district where at least one party has satisfied the local residence requirement.'],
  ['What is the residence requirement?', 'At least one party must have resided in the district for the period the Act prescribes immediately before giving notice. Confirm the current requirement with the Marriage Officer.'],
  ['Is the notice made public?', 'Yes. Under Section 6 the notice is entered in the Marriage Notice Book and published, which is what allows objections to be raised.'],
  ['Who can object?', 'Any person may object on the ground that the marriage would contravene the conditions in Section 4. An objection on any other basis does not stand.'],
  ['What happens if someone objects?', 'The Marriage Officer inquires into the objection under Section 8. If it is not upheld, the marriage proceeds.'],
  ['Can we appeal a refusal?', 'Where the Marriage Officer refuses to solemnise, the refusal may be challenged before the district court, subject to the statutory procedure.'],
  ['How many witnesses are needed?', 'Three witnesses are generally required at the declaration and solemnisation stage, under Section 11.'],
  ['Where does the solemnisation happen?', 'Before the Marriage Officer, at the office or at another place within a permitted distance, under Section 12.'],
  ['When do we get the certificate?', 'The marriage certificate is entered and signed under Section 13 at the time of solemnisation, and is conclusive evidence of the marriage.'],
  ['Can an already-solemnised marriage be registered?', 'Yes. Sections 15 and 16 allow registration of a marriage already celebrated in another form, which is a different route from court marriage.'],
  ['Is court marriage valid across India?', 'Yes. A marriage under the Special Marriage Act is a statutory civil marriage recognised nationally.'],
  ['What if one party has been married before?', 'Neither party may have a spouse living at the time of the marriage. A death certificate or decree of divorce will be required as the case may be.'],
  ['Can NRIs marry under this Act?', 'Yes, subject to the residence requirement for the notice and the documentation the Marriage Officer requires.'],
  ['Can a foreign national marry under this Act?', 'Yes, subject to additional documentation, which commonly includes passport, visa and a no-impediment certificate. Requirements vary by office and nationality.'],
  ['What documents are needed?', 'Identity, age, address and marital status proof, photographs and affidavits, plus the witnesses\' identity documents.'],
  ['Is the certificate enough for a passport or visa?', 'The certificate is the statutory proof of marriage. Whether a particular authority requires anything further is a separate question.'],
  ['Can the marriage be solemnised earlier than the notice period?', 'No. The notice period exists to allow objections, and it cannot be shortened by agreement.'],
  ['What is the most common delay?', 'Documents that do not establish residence or marital status cleanly, which stalls the notice before the clock even starts.'],
  ['Can Estabizz appear before the Marriage Officer?', 'We handle eligibility assessment, document preparation, notice drafting, jurisdiction checks and coordination. Appearance requirements are those of the Marriage Officer, and legal representation is arranged where needed.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Family Law' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Court Marriage' }]}
      title="Court Marriage"
      readTime="11 min read"
      hideReviewBadge
      focusKeyword="Court Marriage"
      sections={sections}
      ctaTitle="Speak With a Court Marriage Expert"
      ctaDescription="Discuss eligibility, jurisdiction, documents and the notice process with the Estabizz team."
      quickFacts={[{ label: 'Main law', value: 'Special Marriage Act, 1954' }, { label: 'Authority', value: 'Marriage Officer' }, { label: 'Notice validity', value: '3 months, Section 14' }, { label: 'Witnesses', value: 'Three' }]}
      relatedArticles={[
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim reliefs, evidence strategy and Family Court process.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, filing, pleadings, evidence, hearings and orders across civil, criminal and tribunal matters.' },
        { title: 'Caveat Filing', href: '/solutions/legal/caveat-filing', category: 'Legal', description: 'Preventive filing under CPC Section 148A against ex-parte orders.' }
      ]}
      finalCtaTitle="Get the Notice Right the First Time"
      finalCtaDescription="Most court marriage delays happen before the clock even starts, because the documents do not establish residence or marital status cleanly."
      heroDescription={<p>Court marriage is a civil marriage solemnised before a Marriage Officer under the Special Marriage Act, 1954 — no religious ceremony, no conversion, and a statutory certificate at the end. It is the standard route for interfaith and inter-caste couples, and for anyone who wants a purely civil marriage. Estabizz assists with eligibility assessment, jurisdiction, document preparation, notice drafting, objection handling and the process through to the certificate.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> court marriage means the marriage is solemnised before a Marriage Officer rather than through a religious ceremony. The Special Marriage Act, 1954 provides a secular civil route, and the certificate issued at the end is conclusive statutory proof of the marriage.</p>
        <p>Because the Act does not require either party to belong to a particular religion, and does not require conversion, it is the usual route for interfaith and inter-caste marriages. It is equally available to couples of the same faith who simply prefer a civil marriage.</p>
      </Section>

      <Section id="the-timeline" title="The Notice Period and the Three-Month Clock">
        <div className="warning-box" aria-label="Timing note">
          <p><strong>Two separate clocks run, and people confuse them.</strong> The first is the notice period after filing, during which objections may be raised — it cannot be shortened. The second is Section 14: the notice itself lapses if the marriage is not solemnised within <strong>three months</strong> of the notice date, and a fresh notice is then needed.</p>
        </div>
        <DataTable headers={['Stage', 'Position']} rows={[
          ['Residence before notice', 'At least one party must satisfy the local residence requirement in the district'],
          ['Notice of intended marriage', 'Filed with the Marriage Officer under Section 5'],
          ['Entry and publication', 'Entered in the Marriage Notice Book and published under Section 6'],
          ['Objection window', 'Objections may be raised during the statutory notice period, under Section 7'],
          ['Solemnisation', 'After the notice period ends and no valid objection stands'],
          ['Notice validity', 'Three months from the notice date, under Section 14'],
          ['If three months lapse', 'The notice becomes ineffective and a fresh notice is required']
        ]} />
        <p>Confirm the exact notice period and residence requirement with the Marriage Officer for your district, since local practice on documentation and scheduling varies even where the statute does not.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main law', 'Special Marriage Act, 1954'],
          ['Main authority', 'Marriage Officer or Marriage Registrar'],
          ['Conditions for marriage', 'Section 4'],
          ['Notice of intended marriage', 'Section 5'],
          ['Marriage Notice Book and publication', 'Section 6'],
          ['Objection to marriage', 'Section 7'],
          ['Inquiry into objection', 'Section 8'],
          ['Declaration by parties and witnesses', 'Section 11'],
          ['Place and form of solemnisation', 'Section 12'],
          ['Marriage certificate', 'Section 13'],
          ['Notice validity', 'Section 14'],
          ['Registration of marriages celebrated in other forms', 'Sections 15 and 16'],
          ['Core objective', 'A secular civil marriage route with statutory proof of marriage']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Sections">
        <DataTable headers={['Section', 'Practical meaning']} rows={[
          ['s. 4', 'Conditions: age, marital status, mental capacity and prohibited relationship'],
          ['s. 5', 'Notice of intended marriage to the Marriage Officer'],
          ['s. 6', 'Entry and publication of the marriage notice'],
          ['s. 7', 'Objection may be raised during the notice period'],
          ['s. 8', 'The Marriage Officer may inquire into an objection'],
          ['s. 11', 'Parties and three witnesses sign the declaration'],
          ['s. 12', 'The marriage is solemnised before the Marriage Officer'],
          ['s. 13', 'The marriage certificate is entered and signed'],
          ['s. 14', 'The notice becomes ineffective if the marriage is not solemnised within three months'],
          ['s. 15', 'Registration of marriages already celebrated in other forms'],
          ['s. 16', 'Procedure for registration under Section 15']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility">
        <DataTable headers={['Requirement', 'Practical explanation']} rows={[
          ['Age', 'The male party must have completed 21 years, the female party 18 years'],
          ['Marital status', 'Neither party may have a spouse living at the time of the marriage'],
          ['Consent', 'Both parties must be capable of giving valid consent'],
          ['Mental capacity', 'Neither party may suffer from an incapacity that prevents valid consent'],
          ['Prohibited relationship', 'The parties must not be within a prohibited relationship, unless permitted by applicable custom'],
          ['Residence', 'At least one party must satisfy the local residence requirement for filing the notice'],
          ['Witnesses', 'Three witnesses are generally required at solemnisation'],
          ['Documents', 'Identity, age, address, marital status proof, photographs and affidavits']
        ]} />
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Eligibility and legal route confirmed'],
          ['2', 'Document review', 'Age, address, identity and marital status verified'],
          ['3', 'Jurisdiction check', 'Correct Marriage Officer identified'],
          ['4', 'Notice preparation', 'Notice of intended marriage drafted'],
          ['5', 'Notice filing', 'Submitted before the Marriage Officer'],
          ['6', 'Publication and waiting period', 'Statutory notice period and objection window run'],
          ['7', 'Objection handling, if any', 'Legal response and supporting documents'],
          ['8', 'Declaration and witnesses', 'Declaration signed by the parties and three witnesses'],
          ['9', 'Solemnisation', 'Marriage before the Marriage Officer'],
          ['10', 'Certificate', 'Marriage certificate signed and recorded']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Identity proof of both parties', 'Identity verification'],
          ['Date of birth proof', 'Age condition under Section 4'],
          ['Address proof', 'Residence requirement and jurisdiction'],
          ['Passport-size photographs', 'Notice and record'],
          ['Affidavit on marital status', 'Confirms no spouse living'],
          ['Divorce decree, where applicable', 'Proof of dissolution of a previous marriage'],
          ['Death certificate, where applicable', 'Proof where a previous spouse has died'],
          ['Witness identity and address proof', 'Three witnesses at solemnisation'],
          ['Passport and visa, for foreign nationals', 'Status and identity'],
          ['No-impediment certificate, where required', 'Commonly asked for from foreign nationals']
        ]} />
      </Section>

      <Section id="objections" title="If an Objection Is Raised">
        <p>An objection can only be made on the ground that the marriage would contravene one of the conditions in Section 4 — age, a living spouse, incapacity to consent, or prohibited relationship. Objections resting on family disapproval, caste or religion are not grounds under the Act.</p>
        <p>Where an objection is filed, the Marriage Officer inquires into it under Section 8. If it is not upheld, the marriage proceeds. Where the Marriage Officer refuses to solemnise, the refusal may be challenged before the district court under the statutory procedure.</p>
      </Section>

      <Section id="interfaith" title="Interfaith and Inter-Caste Marriage">
        <p>The Special Marriage Act is the standard route for interfaith and inter-caste couples because it requires no religious ceremony and no conversion by either party. The marriage is a civil act, and the certificate is statutory proof independent of any personal law.</p>
        <p>The publication requirement under Section 6 means the notice is on public record during the objection window. Couples who are concerned about that should raise it at the consultation stage so the practical position can be discussed before the notice is filed.</p>
      </Section>

      <Section id="nri" title="NRIs and Foreign Nationals">
        <DataTable headers={['Situation', 'What to plan for']} rows={[
          ['One party is an NRI', 'The residence requirement for the notice still has to be satisfied'],
          ['One party is a foreign national', 'Passport, visa and commonly a no-impediment certificate'],
          ['Both parties are abroad', 'Travel has to be planned around the notice period and solemnisation'],
          ['Documents issued abroad', 'Attestation or apostille may be required'],
          ['Notice lapsing', 'Section 14 gives three months, which matters where travel is involved'],
          ['Use of the certificate abroad', 'Apostille or attestation is often needed for foreign use']
        ]} />
        <p>Requirements for foreign nationals vary between Marriage Officers and by nationality. Confirm the specific document list with the office before booking travel.</p>
      </Section>

      <Section id="vs-registration" title="Court Marriage vs Marriage Registration">
        <DataTable headers={['Point', 'Court marriage', 'Marriage registration']} rows={[
          ['Meaning', 'The marriage is solemnised before the Marriage Officer', 'An already-solemnised marriage is recorded'],
          ['Main law', 'Special Marriage Act, 1954', 'Personal law, State registration law, or Sections 15–16 of the Special Marriage Act'],
          ['Religious ceremony', 'Not required', 'Usually already performed'],
          ['Notice period', 'A statutory notice period applies', 'Does not apply in the same way'],
          ['Witnesses', 'Three, at solemnisation', 'Depends on the authority and the law'],
          ['Certificate', 'Issued on civil solemnisation', 'Issued as proof of an already-solemnised marriage'],
          ['Best for', 'Civil, interfaith, inter-caste or non-ritual marriage', 'Couples already married by ceremony']
        ]} />
      </Section>

      <Section id="risks" title="What Goes Wrong">
        <DataTable headers={['Issue', 'Practical impact']} rows={[
          ['Residence not properly evidenced', 'The notice stalls before the clock starts'],
          ['Marital status not documented', 'Notice rejected or delayed'],
          ['Wrong Marriage Officer approached', 'Jurisdiction problem and lost time'],
          ['Age proof inconsistent across documents', 'Section 4 query'],
          ['Three months allowed to lapse', 'A fresh notice is required under Section 14'],
          ['Witnesses unavailable on the date', 'Solemnisation cannot proceed'],
          ['Foreign documents not attested', 'Office refuses to accept them'],
          ['Objection not responded to properly', 'Inquiry drags on unnecessarily']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Eligibility assessment', 'Confirm the Section 4 conditions are met'],
          ['Jurisdiction check', 'Identify the correct Marriage Officer'],
          ['Document preparation', 'Identity, age, address, marital status and affidavits'],
          ['Notice drafting', 'Notice of intended marriage'],
          ['Filing coordination', 'Submission and follow-up with the office'],
          ['Objection support', 'Response and documentation where an objection is raised'],
          ['Witness coordination', 'Ensuring the three witnesses and their documents are ready'],
          ['Foreign national support', 'Additional documentation and attestation guidance'],
          ['Certificate follow-through', 'Issuance and copies'],
          ['Post-marriage updates', 'Guidance on records that follow the certificate']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Court marriage is a documentation exercise far more than a legal argument. Almost every delay traces back to residence or marital status not being evidenced cleanly at the notice stage — and to the three-month validity in Section 14 being forgotten once the waiting period begins.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Notice periods, residence requirements and documentation vary by Marriage Officer and by the circumstances of the parties, and parts of this guide are still undergoing professional review. Confirm the current requirements with the Marriage Officer for your district and your adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
