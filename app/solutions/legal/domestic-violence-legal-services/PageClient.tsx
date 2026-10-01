'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'immediate-safety', title: 'If You Are Not Safe Right Now' },
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-counts', title: 'What Counts as Domestic Violence' },
  { id: 'who-can-apply', title: 'Who Can Apply, and Against Whom' },
  { id: 'reliefs', title: 'The Five Reliefs' },
  { id: 'residence', title: 'Residence Rights and the Shared Household' },
  { id: 'interim', title: 'Interim and Ex Parte Orders' },
  { id: 'timeline', title: 'How Quickly It Moves' },
  { id: 'breach', title: 'When an Order Is Breached' },
  { id: 'limitation', title: 'Is There a Time Limit' },
  { id: 'civil-criminal', title: 'PWDVA and BNS Section 85' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'evidence', title: 'Evidence' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How the Matter Runs' },
  { id: 'support-system', title: 'Protection Officers and Support Services' },
  { id: 'settlement', title: 'Settlement and Withdrawal' },
  { id: 'defence', title: 'Responding to an Allegation' },
  { id: 'common-issues', title: 'Where Cases Get Weakened' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is domestic violence under the law?', 'Section 3 of the Protection of Women from Domestic Violence Act, 2005 defines it broadly — physical, sexual, verbal, emotional and economic abuse, including harassment for dowry or property. It is considerably wider than physical violence alone.'],
  ['Which law applies?', 'The PWDVA, 2005 is the main protective statute. Criminal cruelty by a husband or his relative is a separate offence under BNS Section 85, with cruelty defined in Section 86. The BNSS governs criminal procedure and the BSA governs evidence.'],
  ['Is a PWDVA case civil or criminal?', 'Proceedings under Section 12 are essentially civil in nature, seeking protective and financial relief rather than punishment, even though they are heard by a Magistrate. Breach of a protection order under Section 31 is where criminal consequences attach.'],
  ['Who can file?', 'An aggrieved woman in a domestic relationship — which includes marriage, relationships in the nature of marriage, and family relationships such as mother, sister or daughter living in a shared household.'],
  ['Can a complaint be made against a woman?', 'Yes. The Supreme Court in Hiral P. Harsora v. Kusum Narottamdas Harsora (2016) struck the words "adult male" from the definition of respondent, so female relatives can be respondents where the allegations against them are made out.'],
  ['What reliefs can the court grant?', 'Five principal ones: a protection order under Section 18, a residence order under Section 19, monetary relief under Section 20, a custody order under Section 21 and a compensation order under Section 22.'],
  ['What is a protection order?', 'An order restraining the respondent from committing further violence, contacting the aggrieved person, entering her workplace or school, operating joint accounts or committing other specified acts.'],
  ['Can I be thrown out of the house?', 'Section 17 gives every woman in a domestic relationship the right to reside in the shared household, and a residence order under Section 19 can restrain dispossession — whether or not she has any legal or beneficial interest in the property.'],
  ['What if the house belongs to my in-laws?', 'It can still be a shared household. In Satish Chander Ahuja v. Sneha Ahuja (2020) the Supreme Court held that a house belonging to a relative of the husband, in which the woman lived in a domestic relationship, can be a shared household — departing from the narrower earlier view in S.R. Batra.'],
  ['Can I get an order quickly?', 'Section 23 allows interim orders and, where the facts justify it, ex parte orders based on an affidavit before the respondent is heard. Urgency is precisely what that provision exists for.'],
  ['How long does the case take?', 'Section 12(5) requires the Magistrate to endeavour to dispose of every application within sixty days of the first hearing. In practice it often takes longer, but interim protection can come much earlier than final disposal.'],
  ['Is there a limitation period for filing?', 'The Supreme Court held in Kamatchi v. Lakshmi Narayanan (2022) that the limitation under Section 468 of the old Code does not apply to an application under Section 12. Delay may still need explaining on the facts, but a stale-claim objection is not the bar it is sometimes presented as.'],
  ['Can I file after leaving the matrimonial home?', 'Yes. Having left does not by itself end the domestic relationship for the purposes of the Act, though the facts and the reliefs sought will need to reflect the current situation.'],
  ['What happens if the respondent breaches a protection order?', 'Breach is an offence under Section 31, punishable with imprisonment up to one year, or a fine up to twenty thousand rupees, or both. Importantly, the offence is cognizable and non-bailable — which is what gives a protection order practical force.'],
  ['What is BNS Section 85?', 'The criminal offence of cruelty by a husband or his relative, punishable with imprisonment up to three years and fine. It is cognizable, non-bailable and generally non-compoundable.'],
  ['Should I file under the PWDVA, under BNS Section 85, or both?', 'They serve different purposes. The PWDVA gives protection, residence, money and custody; Section 85 pursues punishment. Section 36 confirms PWDVA remedies are in addition to other remedies, so both can run — but that is a decision to take deliberately, weighing safety, evidence and what you actually need.'],
  ['Can monetary relief include maintenance?', 'Yes. Section 20 covers loss of earnings, medical expenses, losses from property being removed or damaged, and maintenance for the aggrieved person and her children.'],
  ['Can I get custody of my children through this?', 'Section 21 allows temporary custody orders, with visitation to the respondent where appropriate. It is interim relief within these proceedings rather than a substitute for a full custody determination.'],
  ['Can digital evidence be used?', 'Yes, and it is often the strongest material available. Messages, call logs, emails and recordings are governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023, so preserve originals rather than isolated screenshots.'],
  ['Should I take medical treatment even for minor injuries?', 'Yes, and ask for the record. A contemporaneous medical record made at the time is far more persuasive than an account given months later.'],
  ['Can in-laws be made respondents?', 'They can, where there are specific allegations against them. Sweeping allegations against every family member weaken the case and attract judicial criticism; particularised allegations against those actually involved do not.'],
  ['Can a domestic violence case be settled?', 'Often, yes, and many are. Any settlement needs to deal properly with residence, maintenance and safety, and simply withdrawing without those in place tends to leave the underlying problem untouched.'],
  ['I have received a domestic violence notice I believe is false. What should I do?', 'Take it seriously and respond properly. Do not reply in anger and do not contact the applicant directly where an order is in force. Assemble your documents, address the allegations specifically, and take advice before anything goes on record.'],
  ['What is the biggest mistake applicants make?', 'A complaint with no dates. Courts respond to a clear, date-wise chronology supported by records; a long emotional narrative without specifics is hard to act on, however genuine the underlying situation.'],
  ['Can Estabizz appear in court?', 'We handle safety and relief assessment, chronology and evidence work, complaint and application drafting, defence responses and advocate coordination, confidentially. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Protection and Family' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Domestic Violence' }]}
      title="Domestic Violence"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Domestic Violence"
      sections={sections}
      ctaTitle="Speak With a Family Protection Expert"
      ctaDescription="Confidential assessment of the relief you need, how quickly it can be sought, and what evidence supports it."
      quickFacts={[
        { label: 'Main statute', value: 'PWDVA, 2005' },
        { label: 'Target disposal', value: '60 days from first hearing' },
        { label: 'Breach of order', value: 'Cognizable, non-bailable' },
        { label: 'Urgent relief', value: 'Interim and ex parte' }
      ]}
      relatedArticles={[
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Which law governs your marriage, which remedy fits, maintenance, custody and settlement.' },
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim maintenance and custody, evidence strategy and Family Court procedure.' },
        { title: 'Divorce Notice', href: '/solutions/legal/divorce-notice', category: 'Legal', description: 'Drafting and replying to a matrimonial notice, settlement terms and stridhan recovery.' }
      ]}
      finalCtaTitle="Protection First, Everything Else After"
      finalCtaDescription="Interim protection, residence and maintenance can be sought long before any case concludes. Where safety is the issue, that urgency is the point of the legislation — and it should be used."
      heroDescription={<p>The Protection of Women from Domestic Violence Act, 2005 exists to deliver something most legal processes cannot: fast, practical protection. It allows a court to restrain further violence, secure a woman&rsquo;s right to remain in her home, order maintenance and expenses, make interim custody arrangements and award compensation — with interim and ex parte orders available where the urgency demands it. Estabizz assists with safety and relief assessment, incident chronology, evidence review, application and complaint drafting, protection, residence, monetary and custody relief, coordination with Protection Officers and counsel, settlement documentation and defence support where an allegation has been made. All of it handled confidentially.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="immediate-safety" title="If You Are Not Safe Right Now">
        <div className="warning-box" aria-label="Immediate safety">
          <p><strong>If there is immediate danger, legal strategy comes second.</strong> In an emergency, call <strong>112</strong>. Get to a safe place, and seek medical attention for any injury — ask for the record, because a contemporaneous medical note is among the strongest evidence there is. Preserve messages and call logs rather than deleting them. A Protection Officer or a registered service provider under the Act can assist with shelter, medical aid and filing a domestic incident report. Everything else on this page can wait until you are safe.</p>
        </div>
        <p>One practical point worth knowing immediately: you do not have to decide between leaving and staying to protect your legal position. The Act protects the right to remain in the shared household, and leaving does not forfeit your claims either. Neither choice needs to be made for legal reasons rather than safety ones.</p>
      </Section>

      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> domestic violence is abuse within a domestic relationship, and the law provides a route to stop it and to secure your home and finances while you do.</p>
        <p>What makes the PWDVA unusual is that it was designed around what people actually need in this situation — not to punish first, but to protect: an order to stop the abuse, the right to stay in the house, money to live on, arrangements for the children.</p>
        <p>Criminal proceedings for cruelty exist separately under BNS Section 85 and serve a different purpose. Both can run, and choosing between them, or running both, is a decision worth taking deliberately.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Domestic violence is not a licence or a registration. It is a legal wrong for which protective and financial relief can be sought from a Magistrate under the PWDVA, 2005.</p>
        <p>Not every family dispute needs a case. But where there is violence, threat, financial deprivation, forced removal from the home or sustained harassment, the remedies exist and they are meant to be used quickly.</p>
      </Section>

      <Section id="what-counts" title="What Counts as Domestic Violence">
        <p>Section 3 defines it broadly. Many people do not realise how much of their situation the definition already covers.</p>
        <DataTable headers={['Form of abuse', 'What it includes']} rows={[
          ['Physical abuse', 'Assault, bodily pain, harm or danger to life, limb or health'],
          ['Sexual abuse', 'Sexual conduct that abuses, humiliates or degrades'],
          ['Verbal and emotional abuse', 'Insults, ridicule, humiliation, and repeated threats'],
          ['Economic abuse', 'Depriving financial resources, household necessities, stridhan or property'],
          ['Denial of household expenses', 'Withholding money required to run the household'],
          ['Dowry-related harassment', 'Demands for dowry, property or valuables from the woman or her relatives'],
          ['Residence-related abuse', 'Forcing her out of the shared household, or blocking access'],
          ['Threat and coercion', 'Intimidation, isolation and controlling behaviour'],
          ['Child-related pressure', 'Using the children to control or threaten'],
          ['Digital abuse', 'Threats and harassment over messaging, calls or social media']
        ]} />
        <div className="info-box" aria-label="Economic abuse">
          <p><strong>Economic abuse is the category most often overlooked.</strong> Withholding household money, cutting off access to a joint account, refusing to pay for a child&rsquo;s needs or withholding stridhan all fall within Section 3. Women frequently assume the Act applies only where there has been physical violence, and do not seek relief that is squarely available to them.</p>
        </div>
      </Section>

      <Section id="who-can-apply" title="Who Can Apply, and Against Whom">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Who may apply', 'An aggrieved woman in a domestic relationship with the respondent'],
          ['Domestic relationship', 'Marriage, a relationship in the nature of marriage, or a family relationship'],
          ['Who else may assist', 'A Protection Officer, a registered service provider, or any person on her behalf'],
          ['Who may be a respondent', 'Any person in a domestic relationship against whom relief is sought'],
          ['Can a woman be a respondent', 'Yes, following Hiral P. Harsora v. Kusum Narottamdas Harsora (2016)'],
          ['Shared household needed', 'For residence relief; the domestic relationship is the core requirement'],
          ['Forum', 'The Magistrate having jurisdiction where she resides, the respondent resides, or the cause arose']
        ]} />
        <p>The <em>Harsora</em> decision matters practically. Before it, the statutory definition of respondent was confined to an adult male, which left conduct by mothers-in-law and sisters-in-law outside the Act. The Supreme Court struck those words down as inconsistent with Article 14, so relief can now be sought against female relatives where the allegations against them are made out.</p>
      </Section>

      <Section id="reliefs" title="The Five Reliefs">
        <DataTable headers={['Relief', 'Provision', 'What it does']} rows={[
          ['Protection order', 'Section 18', 'Restrains further violence, contact, entry to workplace or school, and specified acts'],
          ['Residence order', 'Section 19', 'Protects the right to reside; can restrain dispossession or direct alternate accommodation'],
          ['Monetary relief', 'Section 20', 'Loss of earnings, medical expenses, property loss and maintenance'],
          ['Custody order', 'Section 21', 'Temporary custody of children, with visitation where appropriate'],
          ['Compensation order', 'Section 22', 'Damages for injuries including mental torture and emotional distress']
        ]} />
        <p>These are cumulative, not alternatives. A single application under Section 12 can seek all of them, and the relief actually needed should drive what is asked for rather than a standard template.</p>
      </Section>

      <Section id="residence" title="Residence Rights and the Shared Household">
        <p>For many women the most urgent question is not compensation but whether they can stay in their home. Section 17 answers it directly: every woman in a domestic relationship has the right to reside in the shared household, whether or not she has any right, title or beneficial interest in it.</p>
        <div className="info-box" aria-label="Shared household">
          <p><strong>The in-laws&rsquo; house can be a shared household.</strong> This was contested for years. In <em>Satish Chander Ahuja v. Sneha Ahuja</em> (2020) a three-judge bench of the Supreme Court held that the definition in Section 2(s) is not confined to a household in which the husband has a share — a house belonging to a relative of the husband, in which the woman lived in a domestic relationship, can qualify. That departed from the narrower reading in <em>S.R. Batra v. Taruna Batra</em>, and it substantially widened the protection available where the couple lived in family property.</p>
        </div>
        <DataTable headers={['Residence relief available', 'Effect']} rows={[
          ['Restraining dispossession', 'She cannot be removed from the shared household'],
          ['Restraining disturbance of possession', 'Her occupation cannot be interfered with'],
          ['Directing the respondent to remove himself', 'Where the facts justify it'],
          ['Restraining entry to her portion', 'Where a part of the household is allotted to her'],
          ['Restraining alienation of the household', 'Prevents sale or disposal to defeat the order'],
          ['Alternate accommodation or rent', 'The respondent may be directed to provide it or pay for it'],
          ['Directions for safety', 'Including return of stridhan and essential belongings']
        ]} />
      </Section>

      <Section id="interim" title="Interim and Ex Parte Orders">
        <p>Section 23 is the provision that makes the Act useful in a crisis. The Magistrate may pass interim orders at any stage, and may grant an ex parte order on the basis of an affidavit where the respondent is committing, or is likely to commit, an act of domestic violence.</p>
        <DataTable headers={['Point', 'Practical position']} rows={[
          ['When it is available', 'At any stage of proceedings under Section 12'],
          ['Basis for an ex parte order', 'An affidavit disclosing the violence or the likelihood of it'],
          ['What can be granted', 'Interim protection, residence, monetary relief or custody'],
          ['Why it matters', 'Final disposal is months away; the risk is present now'],
          ['What strengthens the request', 'Specific recent incidents, medical records and preserved messages'],
          ['Can the respondent challenge it', 'Yes, and it may be varied or set aside once he is heard'],
          ['What is expected of the applicant', 'Candour — an overstated affidavit damages the case at the return hearing']
        ]} />
      </Section>

      <Section id="timeline" title="How Quickly It Moves">
        <DataTable headers={['Stage', 'Expected position']} rows={[
          ['Application under Section 12', 'Filed before the Magistrate having jurisdiction'],
          ['Domestic incident report', 'Considered where a Protection Officer or service provider has filed one'],
          ['First hearing', 'The court fixes a date and notice goes to the respondent'],
          ['Interim relief', 'Can be sought at the first hearing, or ex parte before it'],
          ['Statutory expectation', 'Section 12(5) — endeavour to dispose within sixty days of the first hearing'],
          ['Practical reality', 'Often longer, which is exactly why interim relief matters'],
          ['Final order', 'Protection, residence, monetary, custody and compensation as granted'],
          ['Duration of a protection order', 'Remains in force until the aggrieved person applies for discharge']
        ]} />
        <p>The sixty-day expectation in Section 12(5) is a direction to endeavour rather than a guarantee, and lists are crowded. Plan for interim relief to carry you rather than assuming the final order will arrive quickly.</p>
      </Section>

      <Section id="breach" title="When an Order Is Breached">
        <div className="warning-box" aria-label="Section 31">
          <p><strong>This is the provision that gives a protection order its teeth, and it is routinely under-explained.</strong> Breach of a protection order or an interim protection order is an offence under Section 31 — punishable with imprisonment up to one year, or a fine up to twenty thousand rupees, or both. Critically, the offence is <strong>cognizable and non-bailable</strong>. A protection order is therefore not merely a piece of paper: breaching it exposes the respondent to arrest without warrant.</p>
        </div>
        <DataTable headers={['Step on a breach', 'What to do']} rows={[
          ['Record the breach', 'Date, time, what happened, and any witness'],
          ['Preserve the evidence', 'Messages, call logs, CCTV and photographs'],
          ['Report it', 'The breach is cognizable, so the police can act on it'],
          ['Inform the Protection Officer', 'Where one is assigned to the matter'],
          ['Bring it before the Magistrate', 'The court that passed the order should know of the breach'],
          ['Seek further relief', 'The order can be strengthened in light of the breach'],
          ['Keep the order copy available', 'Enforcement is quicker when the order can be produced']
        ]} />
      </Section>

      <Section id="limitation" title="Is There a Time Limit">
        <div className="info-box" aria-label="Limitation">
          <p><strong>A delay objection is raised far more often than it succeeds.</strong> In <em>Kamatchi v. Lakshmi Narayanan</em> (2022) the Supreme Court held that the limitation period under Section 468 of the old Code does not apply to an application under Section 12 of the PWDVA, because such an application is not a complaint of an offence. Delay may still need to be explained on the facts, and it can affect how urgent the court considers the matter — but women are frequently told, wrongly, that they are simply out of time.</p>
        </div>
        <p>Breach proceedings under Section 31 are different: a complaint of breach is subject to its own timing, and should be brought promptly after the breach rather than saved up.</p>
      </Section>

      <Section id="civil-criminal" title="PWDVA and BNS Section 85">
        <DataTable headers={['Point', 'PWDVA, 2005', 'BNS Section 85']} rows={[
          ['Nature', 'Essentially civil, protective and remedial', 'Criminal offence'],
          ['Objective', 'Protection, residence, money, custody, compensation', 'Punishment for cruelty'],
          ['Who is covered', 'Any respondent in a domestic relationship', 'Husband or a relative of the husband'],
          ['Forum', 'Magistrate, under Section 12', 'Police and criminal court'],
          ['Punishment', 'None directly; Section 31 penalises breach', 'Imprisonment up to three years and fine'],
          ['Classification', 'Application, not an FIR', 'Cognizable and non-bailable'],
          ['Compoundable', 'Settlement is generally possible', 'Generally non-compoundable'],
          ['Speed of relief', 'Interim and ex parte orders available', 'Depends on investigation and trial'],
          ['Best used for', 'Stopping the abuse and securing home and money', 'Serious cruelty warranting prosecution']
        ]} />
        <p>Section 36 confirms that the Act&rsquo;s remedies are in addition to, and not in derogation of, any other law. Both routes can therefore run together. Whether they should is a judgement call — a criminal case raises the stakes for everyone and can make a negotiated resolution on residence and maintenance considerably harder.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main protective statute', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Procedural rules', 'Protection of Women from Domestic Violence Rules, 2006'],
          ['Criminal cruelty', 'BNS Section 85, with cruelty defined in Section 86'],
          ['Criminal procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63'],
          ['Maintenance', 'BNSS Section 144, and the applicable matrimonial statute'],
          ['Custody and guardianship', 'Guardians and Wards Act, 1890 and the applicable personal law'],
          ['Forum', 'Magistrate, with Protection Officers and service providers supporting'],
          ['Relationship with other remedies', 'PWDVA Section 36 — in addition to other laws'],
          ['Commencement of the new criminal codes', 'BNS, BNSS and BSA in force from 1 July 2024']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['PWDVA Section 2(q)', 'Respondent — "adult male" struck down in Harsora (2016)'],
          ['PWDVA Section 2(s)', 'Shared household — widened by Satish Chander Ahuja (2020)'],
          ['PWDVA Section 3', 'Definition of domestic violence, including economic abuse'],
          ['PWDVA Section 12', 'Application to the Magistrate for relief'],
          ['PWDVA Section 12(5)', 'Endeavour to dispose of the application within sixty days of the first hearing'],
          ['PWDVA Section 17', 'Right to reside in the shared household'],
          ['PWDVA Section 18', 'Protection orders'],
          ['PWDVA Section 19', 'Residence orders'],
          ['PWDVA Section 20', 'Monetary relief, including maintenance'],
          ['PWDVA Section 21', 'Custody orders'],
          ['PWDVA Section 22', 'Compensation orders'],
          ['PWDVA Section 23', 'Interim and ex parte orders'],
          ['PWDVA Section 31', 'Breach of a protection order — cognizable and non-bailable'],
          ['PWDVA Section 36', 'Remedies additional to other laws'],
          ['BNS Section 85', 'Cruelty by a husband or his relative'],
          ['BNS Section 86', 'Definition of cruelty for Section 85'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic records']
        ]} />
      </Section>

      <Section id="evidence" title="Evidence">
        <p>These cases are decided on records rather than on the strength of feeling in the narrative. The good news is that most of the useful evidence already exists.</p>
        <DataTable headers={['To establish', 'What helps']} rows={[
          ['The domestic relationship', 'Marriage proof, shared address records, family documents'],
          ['The shared household', 'Utility bills, ration or voter records, correspondence to that address'],
          ['Physical abuse', 'Medical records made at the time, photographs of injuries'],
          ['Threats and harassment', 'Messages, call recordings and logs, emails'],
          ['Economic abuse', 'Bank statements, expense records, evidence of withheld payments'],
          ['Dowry-related demands', 'Messages, witness accounts, records of transfers'],
          ['Stridhan', 'Item-wise list with bills and marriage photographs'],
          ['Chronology', 'A date-wise record of incidents, kept contemporaneously where possible'],
          ['Prior reporting', 'Earlier complaints, calls to police, or a domestic incident report'],
          ['Impact', 'Medical or psychological records, employment consequences']
        ]} />
        <p>Preserve originals. Electronic records are governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, and a complete preserved record is worth considerably more than a set of cropped screenshots assembled later.</p>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage or relationship proof', 'Establishes the domestic relationship'],
          ['Shared household proof', 'Residence relief and jurisdiction'],
          ['Identity and address proof', 'Filing and verification'],
          ['Incident chronology', 'Date-wise account of what happened'],
          ['Medical records and prescriptions', 'Physical and psychological harm'],
          ['Photographs and videos', 'Injuries, damage or conditions'],
          ['Messages, emails and call logs', 'Threats, harassment and admissions'],
          ['Police complaints or DIR, if any', 'Prior reporting history'],
          ['Bank statements', 'Economic abuse and financial dependence'],
          ['Household expense records', 'Quantifying monetary relief'],
          ['Income details of the respondent', 'Maintenance assessment'],
          ['Stridhan list with bills', 'Return and compensation'],
          ['Children’s documents', 'Custody and child support'],
          ['Witness details', 'Corroboration of incidents'],
          ['Prior notices or orders', 'Consistency and continuity']
        ]} />
      </Section>

      <Section id="process" title="How the Matter Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Confidential consultation', 'Safety, urgency and the relief actually needed'],
          ['2', 'Safety planning', 'Immediate steps, where risk is present'],
          ['3', 'Incident chronology', 'Date-wise account with supporting records'],
          ['4', 'Evidence review', 'Medical, digital, financial and witness material'],
          ['5', 'Relief selection', 'Protection, residence, monetary, custody and compensation'],
          ['6', 'Route mapping', 'PWDVA application, criminal complaint, or both'],
          ['7', 'Drafting', 'Section 12 application, affidavit and annexures'],
          ['8', 'Interim relief application', 'Urgent protection sought at or before the first hearing'],
          ['9', 'Filing and coordination', 'Magistrate, Protection Officer and counsel'],
          ['10', 'Hearing support', 'Counsel brief and document set'],
          ['11', 'Order and enforcement', 'Compliance, and breach action where needed'],
          ['12', 'Ongoing tracking', 'Dates, orders, compliance and next steps']
        ]} />
      </Section>

      <Section id="support-system" title="Protection Officers and Support Services">
        <p>The Act built a support structure around the court process, and it is under-used because most people do not know it exists.</p>
        <DataTable headers={['Who', 'What they do']} rows={[
          ['Protection Officer', 'Assists in filing the application, prepares the domestic incident report, helps access services and assists the court'],
          ['Domestic incident report', 'A formal record of the incidents, which the Magistrate considers'],
          ['Registered service providers', 'Recognised organisations that can record incidents and assist with medical aid and shelter'],
          ['Shelter homes', 'The aggrieved person may be provided shelter on request'],
          ['Medical facilities', 'Medical aid may be provided, and the record supports the case'],
          ['Police assistance', 'Assistance in giving effect to orders where required'],
          ['Counselling', 'The Magistrate may direct counselling in appropriate cases']
        ]} />
      </Section>

      <Section id="settlement" title="Settlement and Withdrawal">
        <p>Many of these matters resolve by agreement, and there is nothing wrong with that where it genuinely works. What causes problems is withdrawing without the underlying issues being addressed.</p>
        <DataTable headers={['If settling, deal with', 'Why']} rows={[
          ['Residence', 'Where she will live, and on what basis'],
          ['Maintenance', 'Amount, mode, dates and default consequences'],
          ['Stridhan and belongings', 'Itemised, with a handover date'],
          ['Children', 'Custody, visitation and expenses'],
          ['Non-interference and safety', 'Undertakings on contact and conduct'],
          ['Other proceedings', 'What happens to each, and in what sequence'],
          ['Recording before the court', 'Consent terms carry far more weight than a private understanding'],
          ['Revival on default', 'What happens if the terms are not honoured']
        ]} />
        <p>Where a criminal case under BNS Section 85 is also pending, note that it is generally non-compoundable, so a settlement does not by itself close it — that usually requires an application to the High Court. See the <Link href="/solutions/legal/divorce-settlement-agreements">Divorce Settlement Agreements</Link> page for how connected proceedings are dealt with in settlement terms.</p>
      </Section>

      <Section id="defence" title="Responding to an Allegation">
        <p>Allegations are sometimes exaggerated, and sometimes made against family members who had no involvement. A defence should be careful, specific and respectful — an aggressive or dismissive response tends to confirm the impression the applicant is trying to create.</p>
        <DataTable headers={['Situation', 'What the review covers']} rows={[
          ['Allegations disputed on the facts', 'Chronology, records and contemporaneous communications'],
          ['No domestic relationship', 'Maintainability of the application'],
          ['No shared household connection', 'Whether residence relief is available against you'],
          ['Respondent added without a role', 'Particularised allegations, or their absence'],
          ['Relative living separately', 'Whether the Act reaches them on these facts'],
          ['Parallel matrimonial proceedings', 'Consistency across all filings'],
          ['Digital evidence disputed', 'Completeness, context and admissibility under the BSA'],
          ['Settlement already concluded', 'Terms, compliance and effect'],
          ['A criminal complaint added later', 'Separate BNS and BNSS strategy']
        ]} />
        <div className="warning-box" aria-label="Conduct during proceedings">
          <p><strong>If a protection order is in force, do not contact the applicant directly.</strong> Even a well-intentioned message can constitute a breach, and breach under Section 31 is cognizable and non-bailable. Every communication should go through counsel while an order stands.</p>
        </div>
      </Section>

      <Section id="common-issues" title="Where Cases Get Weakened">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A narrative with no dates', 'The court cannot see the pattern or the urgency', 'Date-wise chronology with supporting records'],
          ['Evidence deleted', 'The best proof disappears', 'Preservation guidance from the first meeting'],
          ['No medical record', 'Physical abuse rests on assertion alone', 'Medical documentation at the time, wherever possible'],
          ['Wrong relief sought', 'Protection delayed while the application is corrected', 'Relief mapped to the actual need'],
          ['Residence issue not raised', 'Risk of being removed from the home', 'Section 17 and 19 relief sought expressly'],
          ['Monetary relief unquantified', 'The financial claim is weak', 'Expense and income documentation'],
          ['Every relative named', 'Attracts criticism and dilutes the case', 'Particularised allegations against those actually involved'],
          ['Interim relief not sought', 'Months of exposure while the case proceeds', 'Section 23 application at the outset'],
          ['Delay objection accepted without challenge', 'A valid claim abandoned', 'The Kamatchi position applied'],
          ['Settlement without safeguards', 'The underlying situation continues', 'Residence, maintenance and safety addressed in the terms']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Confidential safety assessment', 'Urgency, risk, residence and immediate needs'],
          ['Relief strategy', 'Which of the five reliefs to seek, and in what order'],
          ['Incident chronology', 'A clear, date-wise account the court can work from'],
          ['Evidence review', 'Medical, digital, financial and witness material'],
          ['Section 12 application support', 'Application, affidavit and annexures'],
          ['Interim relief support', 'Section 23 urgent protection'],
          ['Residence order support', 'Shared household and alternate accommodation'],
          ['Monetary relief support', 'Expenses, losses and maintenance quantified'],
          ['Custody relief support', 'Child-focused interim arrangements'],
          ['Criminal route assessment', 'Whether BNS Section 85 should be pursued'],
          ['Police complaint support', 'Written complaint and BNSS-aligned process'],
          ['Breach action support', 'Section 31 proceedings where an order is violated'],
          ['Settlement documentation', 'Consent terms with safeguards'],
          ['Defence support', 'Measured responses where an allegation is made'],
          ['Advocate coordination', 'Brief, chronology and document set'],
          ['Ticket-based tracking', 'Filing, hearings, orders and compliance']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The Domestic Violence Act was written to move faster than the rest of the legal system, and its value is lost when it is used slowly. Interim protection, the right to stay in the home and maintenance can all be sought at the outset. A clear chronology, contemporaneous records and the correct relief asked for on day one matter far more than the length of the narrative.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice, and it is not a substitute for urgent help where someone is at risk. Whether particular conduct amounts to domestic violence, which reliefs are available, how a court will approach the facts and what evidence will be accepted all depend on the individual circumstances. Court decisions referred to here are summarised in general terms and their application to a particular case should be confirmed. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides assessment, documentation, drafting and coordination support, handled confidentially; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
