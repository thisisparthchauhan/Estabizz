'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'which-law', title: 'Which Law Applies to You' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'grounds', title: 'Grounds for Contested Divorce' },
  { id: 'vs-mutual', title: 'Contested vs Mutual Divorce' },
  { id: 'process', title: 'Process' },
  { id: 'interim-reliefs', title: 'Interim Reliefs' },
  { id: 'maintenance', title: 'Maintenance' },
  { id: 'custody', title: 'Child Custody' },
  { id: 'evidence', title: 'Evidence Strategy' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'nri', title: 'NRI Divorce Matters' },
  { id: 'responding', title: 'If a Petition Has Been Filed Against You' },
  { id: 'settlement', title: 'Moving to Settlement' },
  { id: 'risks', title: 'What Goes Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a contested divorce?', 'A divorce where one spouse does not agree, or where custody, maintenance, property or other claims are disputed. It requires a legally recognised ground and evidence to support it.'],
  ['Which law applies to me?', 'It depends on the marriage. The Hindu Marriage Act, 1955 for Hindu marriages, the Special Marriage Act, 1954 for civil and interfaith marriages, and the Divorce Act, 1869, Parsi Marriage and Divorce Act, 1936 or Dissolution of Muslim Marriages Act, 1939 as applicable.'],
  ['What is the main Hindu divorce provision?', 'Section 13 of the Hindu Marriage Act, 1955.'],
  ['What is the equivalent under the Special Marriage Act?', 'Section 27.'],
  ['What are the common grounds?', 'Cruelty, desertion and adultery are the most frequently used. Conversion, mental disorder, renunciation, presumption of death and non-resumption after judicial separation are also available, depending on the Act.'],
  ['What counts as cruelty?', 'It covers physical and mental cruelty — harassment, humiliation, threats, false allegations, abandonment or conduct making marital life unsafe or unbearable. It is assessed on the facts, not on a fixed list.'],
  ['What does desertion require?', 'Generally separation plus an intention to abandon the marital relationship, continuing for the statutory period under the applicable law.'],
  ['Which court do I file in?', 'The Family Court or District Court having jurisdiction, which generally depends on where the marriage was solemnised, where the parties last resided together, or where the respondent resides.'],
  ['How long does it take?', 'Contested matters usually take considerably longer than mutual divorce, because grounds have to be proved through evidence and cross-examination. Timelines vary by court and pendency.'],
  ['Can a contested divorce become mutual?', 'Yes. Many contested matters settle and convert to mutual divorce once maintenance, custody and property issues are resolved.'],
  ['What is interim maintenance?', 'Financial support ordered during the proceedings, before any final decision. Litigation expenses may also be ordered.'],
  ['What is the provision for maintenance outside the matrimonial Act?', 'Section 144 of the Bharatiya Nagarik Suraksha Sanhita, 2023, which replaced Section 125 of the CrPC from 1 July 2024. It covers a wife, children and parents unable to maintain themselves.'],
  ['How is custody decided?', 'On the welfare of the child, which is the governing consideration, under the Guardians and Wards Act, 1890 read with the applicable personal law.'],
  ['Can I get a protection order?', 'Where there is domestic violence, relief may be sought under the Protection of Women from Domestic Violence Act, 2005, alongside the divorce proceedings.'],
  ['Can I recover stridhan?', 'Yes. Recovery of stridhan — jewellery and personal property — may be claimed, and is commonly pursued alongside the main matter.'],
  ['Are chats and emails admissible?', 'Electronic records are governed by the Bharatiya Sakshya Adhiniyam, 2023. Admissibility depends on meeting the statutory requirements for electronic evidence, so preservation and certification matter.'],
  ['Should I delete anything from my phone?', 'No. Destroying material that is relevant to a proceeding creates its own problems. Preserve records and take advice on what is useful.'],
  ['What if my spouse lives abroad?', 'NRI matters raise jurisdiction, service of notice, foreign decree recognition, travel and overseas asset issues. They need to be planned rather than filed and improvised.'],
  ['Is a foreign divorce decree valid in India?', 'Not automatically. Recognition depends on the grounds, the jurisdiction of the foreign court and whether the decree meets the conditions Indian courts apply.'],
  ['What if I have received a petition?', 'Do not ignore it. A reply has to be filed within the time allowed, and interim applications for maintenance or custody may already be pending.'],
  ['Can I be ordered to pay before the case ends?', 'Yes. Interim maintenance and litigation expenses may be ordered while the matter is pending.'],
  ['Does mediation help?', 'Often. Courts commonly refer matrimonial matters to mediation, and settlement there avoids years of evidence and cross-examination.'],
  ['What weakens a contested case most?', 'Vague pleadings, allegations not supported by evidence, and inconsistency between what is pleaded and what the documents show.'],
  ['Can Estabizz appear in Family Court?', 'We handle case assessment, drafting, evidence compilation, interim application support and coordination. Appearance is through enrolled advocates.'],
  ['What should I do first?', 'Establish which Act applies, which court has jurisdiction, and what evidence actually exists. Those three settle the strategy before any drafting begins.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Contested Divorce' }]}
      title="Contested Divorce"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Contested Divorce"
      sections={sections}
      ctaTitle="Speak With a Family Law Expert"
      ctaDescription="Discuss the applicable Act, jurisdiction, grounds, interim relief and evidence strategy with the Estabizz team."
      quickFacts={[{ label: 'Hindu marriages', value: 'HMA, 1955 s. 13' }, { label: 'Civil marriages', value: 'SMA, 1954 s. 27' }, { label: 'Forum', value: 'Family Court' }, { label: 'Maintenance', value: 'BNSS s. 144' }]}
      relatedArticles={[
        { title: 'Court Marriage', href: '/solutions/legal/court-marriage', category: 'Legal', description: 'Civil marriage under the Special Marriage Act — eligibility, notice period and certificate.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, filing, pleadings, evidence, hearings and orders across civil, criminal and tribunal matters.' },
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Appeals, suspension of sentence and bail pending appeal under BNS, BNSS and BSA.' }
      ]}
      finalCtaTitle="Settle the Strategy Before the Pleadings"
      finalCtaDescription="Which Act applies, which court has jurisdiction and what evidence actually exists — those three questions decide a contested divorce long before the first hearing."
      heroDescription={<p>A contested divorce is not simply a divorce the other side refuses. It is a proceeding where a legally recognised ground has to be pleaded and proved, while maintenance, custody, residence and property are often contested in parallel. Estabizz assists with the applicable Act, jurisdiction, ground selection, petition and reply drafting, interim applications, evidence compilation, mediation support and coordination through to decree or settlement.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a contested divorce is one where the parties do not agree — either on the divorce itself, or on maintenance, custody, residence or property. It requires a ground recognised by the applicable Act, and evidence capable of establishing it.</p>
        <p>Because these matters run on evidence rather than agreement, what is pleaded at the start largely determines what can be argued at the end. Allegations that the documents do not support tend to weaken the whole case rather than just that point.</p>
      </Section>

      <Section id="which-law" title="Which Law Applies to You">
        <div className="warning-box" aria-label="Applicable law note">
          <p><strong>There is no single Indian divorce law.</strong> The Act that applies depends on the marriage — how it was solemnised and the personal law of the parties. Filing under the wrong Act is a maintainability problem, not a drafting one, so this is settled first.</p>
        </div>
        <DataTable headers={['Situation', 'Applicable Act', 'Key divorce provision']} rows={[
          ['Hindu marriage', 'Hindu Marriage Act, 1955', 'Section 13'],
          ['Civil or interfaith marriage', 'Special Marriage Act, 1954', 'Section 27'],
          ['Christian marriage', 'Divorce Act, 1869', 'As provided in that Act'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936', 'As provided in that Act'],
          ['Muslim women&rsquo;s divorce rights', 'Dissolution of Muslim Marriages Act, 1939', 'As provided in that Act'],
          ['Forum for most matters', 'Family Courts Act, 1984', 'Family Court, where established']
        ]} />
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Hindu contested divorce', 'Hindu Marriage Act, 1955, Section 13'],
          ['Civil or interfaith divorce', 'Special Marriage Act, 1954, Section 27'],
          ['Christian divorce', 'Divorce Act, 1869'],
          ['Parsi divorce', 'Parsi Marriage and Divorce Act, 1936'],
          ['Muslim women&rsquo;s divorce rights', 'Dissolution of Muslim Marriages Act, 1939'],
          ['Forum', 'Family Courts Act, 1984'],
          ['Maintenance of wife, children and parents', 'BNSS Section 144, which replaced CrPC Section 125 from 1 July 2024'],
          ['Domestic violence relief', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Child custody and guardianship', 'Guardians and Wards Act, 1890, with the applicable personal law'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including electronic records']
        ]} />
      </Section>

      <Section id="grounds" title="Grounds for Contested Divorce">
        <DataTable headers={['Ground', 'Practical meaning']} rows={[
          ['Cruelty', 'Physical or mental conduct making it difficult to continue the marriage'],
          ['Desertion', 'Abandonment without reasonable cause, for the statutory period'],
          ['Adultery', 'A voluntary sexual relationship outside the marriage, subject to proof'],
          ['Conversion', 'Conversion to another religion, where the Act provides for it'],
          ['Mental disorder', 'A serious condition affecting the marital relationship, subject to the legal threshold'],
          ['Communicable disease', 'Only where the applicable Act recognises it'],
          ['Renunciation', 'Renunciation of worldly life, where applicable'],
          ['Presumption of death', 'Spouse not heard of as alive for the statutory period'],
          ['No resumption after judicial separation', 'No cohabitation after a decree of judicial separation'],
          ['No restitution after an RCR decree', 'No restitution after a decree of restitution of conjugal rights'],
          ['Wife-specific grounds', 'Certain Acts provide additional grounds available to the wife']
        ]} />
        <p>Cruelty is the most commonly pleaded ground and the least mechanical. It is assessed on the cumulative conduct rather than a single incident, which is why a clear chronology matters more than adjectives.</p>
      </Section>

      <Section id="vs-mutual" title="Contested vs Mutual Divorce">
        <DataTable headers={['Point', 'Contested divorce', 'Mutual divorce']} rows={[
          ['Consent', 'One spouse does not agree', 'Both agree'],
          ['Legal grounds', 'Required', 'Usually no fault ground needed'],
          ['Evidence', 'Detailed evidence required', 'Limited, where settlement is complete'],
          ['Timeline', 'Usually longer', 'Usually faster'],
          ['Cost predictability', 'Depends on complexity', 'More predictable'],
          ['Custody and maintenance', 'The court decides disputed issues', 'The parties settle them'],
          ['Best for', 'Serious dispute, refusal, cruelty, desertion or contested claims', 'Separation with full agreement']
        ]} />
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Facts, urgency and objective assessed'],
          ['2', 'Applicable Act review', 'Correct matrimonial statute identified'],
          ['3', 'Jurisdiction review', 'Correct Family Court or District Court'],
          ['4', 'Ground selection', 'The legally available ground, matched to the evidence'],
          ['5', 'Document and evidence review', 'Marriage proof, records, financials and witnesses'],
          ['6', 'Petition or reply drafting', 'Court-ready pleading'],
          ['7', 'Filing and notice', 'Case filed and the other party served'],
          ['8', 'Interim applications', 'Maintenance, custody, residence, protection or expenses'],
          ['9', 'Mediation or counselling', 'Settlement attempted where possible'],
          ['10', 'Evidence stage', 'Affidavits, documents, witnesses and cross-examination'],
          ['11', 'Arguments', 'Final submissions'],
          ['12', 'Outcome', 'Decree, dismissal, settlement or conversion to mutual divorce']
        ]} />
      </Section>

      <Section id="interim-reliefs" title="Interim Reliefs">
        <p>Much of what actually matters in a contested divorce is decided on interim applications long before the final hearing.</p>
        <DataTable headers={['Relief', 'Purpose']} rows={[
          ['Interim maintenance', 'Financial support during the case'],
          ['Litigation expenses', 'Cost support for the proceedings'],
          ['Child custody', 'Temporary custody arrangement'],
          ['Visitation rights', 'Access to the child during litigation'],
          ['Residence relief', 'Housing protection where applicable'],
          ['Protection order', 'Safety where domestic violence is involved'],
          ['Return of stridhan', 'Recovery of jewellery and personal property'],
          ['Injunction', 'Preventing asset transfer or harassment, where available'],
          ['School and medical expenses', 'Child welfare directions'],
          ['Mediation referral', 'Opportunity for settlement or mutual divorce']
        ]} />
      </Section>

      <Section id="maintenance" title="Maintenance">
        <p>Maintenance may be claimed under the matrimonial Act itself, and separately under <strong>Section 144 of the Bharatiya Nagarik Suraksha Sanhita, 2023</strong>, which replaced Section 125 of the CrPC from 1 July 2024. The wording carried over substantially, so the case law built under Section 125 continues to be relevant.</p>
        <p>Section 144 covers a wife unable to maintain herself, minor children, major children unable to maintain themselves by reason of physical or mental condition, and parents. Interim maintenance is intended to be dealt with promptly rather than left to the final hearing.</p>
      </Section>

      <Section id="custody" title="Child Custody">
        <p>Custody is decided on the welfare of the child, which is the governing consideration rather than one factor among several. The Guardians and Wards Act, 1890 applies alongside the relevant personal law.</p>
        <p>Interim custody and visitation are usually settled early, and the arrangement that operates during the proceedings often shapes the final position. Schooling, stability and the child&rsquo;s own circumstances carry more weight than the conduct allegations between the parents.</p>
      </Section>

      <Section id="evidence" title="Evidence Strategy">
        <p>Evidence is what separates a pleaded allegation from a proved ground. Under the Bharatiya Sakshya Adhiniyam, 2023, electronic records — messages, emails, call records, photographs — are admissible subject to the statutory requirements, which means preservation and certification matter as much as content.</p>
        <DataTable headers={['Evidence type', 'What to keep in mind']} rows={[
          ['Messages and chats', 'Preserve the original device record; extracts alone are weaker'],
          ['Emails', 'Retain headers, not just the body text'],
          ['Call records', 'Obtain from the service provider where possible'],
          ['Medical records', 'Relevant to cruelty and to health-based grounds'],
          ['Financial documents', 'Central to maintenance and to asset claims'],
          ['Photographs and video', 'Context and date matter as much as the image'],
          ['Witnesses', 'Availability for cross-examination should be assessed early'],
          ['Police complaints and FIRs', 'Cut both ways; they are part of the record either way']
        ]} />
        <p>Do not delete material because it seems unhelpful. Destroying relevant records creates a separate problem and is usually visible from the surrounding evidence anyway.</p>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate or proof of marriage', 'Establishes the marriage'],
          ['Identity and address proof of both parties', 'Filing and jurisdiction'],
          ['Photographs of the marriage', 'Supporting proof where certificate is unavailable'],
          ['Evidence supporting the ground', 'Cruelty, desertion or other pleaded ground'],
          ['Medical records, where relevant', 'Health-based grounds or cruelty'],
          ['Financial documents and salary records', 'Maintenance claims on either side'],
          ['Property and asset documents', 'Asset and stridhan claims'],
          ['Child birth certificate and school records', 'Custody matters'],
          ['Prior complaints, FIRs or orders', 'Existing proceedings between the parties'],
          ['Communication records', 'Chats, emails and call records']
        ]} />
      </Section>

      <Section id="nri" title="NRI Divorce Matters">
        <DataTable headers={['Issue', 'Why it needs planning']} rows={[
          ['Jurisdiction', 'Which court can hear the matter is often disputed at the outset'],
          ['Service of notice abroad', 'Service has to follow the applicable procedure or the proceeding stalls'],
          ['Foreign decree', 'A foreign divorce decree is not automatically recognised in India'],
          ['Travel availability', 'Appearance requirements have to be planned around'],
          ['Overseas assets', 'Disclosure and enforceability are separate questions'],
          ['Child custody across borders', 'Removal and return issues can arise quickly'],
          ['Parallel proceedings', 'Matters running in two countries need coordinated strategy']
        ]} />
      </Section>

      <Section id="responding" title="If a Petition Has Been Filed Against You">
        <p>Ignoring a petition is the single most damaging response. A reply has to be filed within the time the court allows, and interim applications for maintenance, custody or protection may already be listed.</p>
        <DataTable headers={['Step', 'Why it matters']} rows={[
          ['Read the petition and the annexures', 'The pleaded case is what you have to answer'],
          ['Check the applicable Act and jurisdiction', 'Maintainability may itself be an answer'],
          ['Note every date', 'Reply time and interim listings run independently'],
          ['Preserve your own records', 'Before anything is lost or overwritten'],
          ['Assess interim exposure', 'Maintenance can be ordered before the merits are heard'],
          ['Consider settlement early', 'The cheapest outcome is usually the earliest one']
        ]} />
      </Section>

      <Section id="settlement" title="Moving to Settlement">
        <p>A contested divorce can convert to mutual divorce at any stage if the parties reach agreement on maintenance, custody and property. Courts routinely refer matrimonial matters to mediation, and settlement there avoids years of evidence and cross-examination.</p>
        <p>Settlement is not a concession on the merits. It is frequently the better commercial and personal outcome, particularly where children are involved and the relationship has to continue in some form regardless of the decree.</p>
      </Section>

      <Section id="risks" title="What Goes Wrong">
        <DataTable headers={['Issue', 'Practical impact']} rows={[
          ['Wrong Act invoked', 'Maintainability problem'],
          ['Wrong forum', 'Time lost while limitation and interim exposure continue'],
          ['Vague pleadings', 'The ground cannot be proved at the evidence stage'],
          ['Allegations without evidence', 'Weakens the whole case, not just that point'],
          ['Inconsistency between pleading and documents', 'Credibility damage under cross-examination'],
          ['Interim applications ignored', 'Orders passed without your position on record'],
          ['Records destroyed', 'Creates an additional problem and is usually visible'],
          ['No settlement assessment', 'Years spent on an outcome that was available early']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case assessment', 'Facts, objective and realistic outcome'],
          ['Applicable Act mapping', 'The correct matrimonial statute'],
          ['Jurisdiction review', 'The correct Family Court or District Court'],
          ['Ground selection', 'Matching the ground to the available evidence'],
          ['Petition and reply drafting', 'Court-ready pleadings'],
          ['Interim applications', 'Maintenance, custody, residence and protection'],
          ['Evidence compilation', 'Documents, records and electronic evidence'],
          ['Maintenance analysis', 'Under the matrimonial Act and BNSS Section 144'],
          ['Custody strategy', 'Interim arrangements and welfare-based framing'],
          ['Mediation support', 'Settlement and conversion to mutual divorce'],
          ['NRI matter coordination', 'Jurisdiction, service and foreign decree issues'],
          ['Advocate coordination', 'Briefing, hearings and case tracking']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Contested divorces are decided on the record, not on the grievance. Three things settle the case before drafting begins: which Act applies, which court has jurisdiction, and what evidence actually exists. Pleadings written ahead of those answers create problems that no amount of argument later repairs.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. The applicable Act, available grounds, jurisdiction, maintenance and custody outcomes depend entirely on the facts, and parts of this guide are still undergoing professional review. Estabizz provides case assessment, drafting, documentation and coordination; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
