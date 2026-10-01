'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-changes', title: 'What the Decree Changes' },
  { id: 'one-year', title: 'The One-Year Consequence' },
  { id: 'grounds', title: 'Grounds' },
  { id: 'why-choose', title: 'Why People Choose It' },
  { id: 'vs-divorce', title: 'Judicial Separation and Divorce Compared' },
  { id: 'vs-agreement', title: 'Decree or Separation Agreement' },
  { id: 'rescission', title: 'Reconciliation and Rescission' },
  { id: 'maintenance', title: 'Maintenance and Financial Relief' },
  { id: 'children', title: 'Children and Custody' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'which-law', title: 'Which Law Applies' },
  { id: 'process', title: 'The Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'evidence', title: 'Evidence' },
  { id: 'defending', title: 'If a Petition Is Filed Against You' },
  { id: 'nri', title: 'NRI and Cross-Border Matters' },
  { id: 'after-decree', title: 'Life After the Decree' },
  { id: 'common-issues', title: 'Where Petitions Run Into Trouble' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is judicial separation?', 'A decree by which a court relieves the spouses of the obligation to cohabit, while the marriage itself continues. It is a formal legal status, not simply living apart.'],
  ['Which provision applies?', 'Section 10 of the Hindu Marriage Act, 1955 and Section 23 of the Special Marriage Act, 1954 are the main ones. The Divorce Act, 1869 and the Parsi Marriage and Divorce Act, 1936 provide for it in their own terms.'],
  ['Does it end the marriage?', 'No. The marriage subsists. Neither spouse can remarry, and the relationship remains legally alive for most purposes until a decree of divorce is passed.'],
  ['What are the grounds?', 'Under the Hindu Marriage Act the grounds for judicial separation are the same as the grounds on which divorce may be sought under Section 13, including cruelty, desertion, adultery, conversion, mental disorder and renunciation, along with the additional wife-specific grounds.'],
  ['Is it easier to obtain than a divorce?', 'The grounds are the same, so it is not a lower threshold in that sense. What differs is the consequence — the court is being asked to suspend cohabitation rather than dissolve the marriage, which some parties and some courts find a less drastic step.'],
  ['Can we simply live apart instead?', 'You can, but living apart gives you no decree, no court-recorded maintenance or custody arrangement, and no statutory consequence. Judicial separation converts a private situation into a legal status.'],
  ['What happens after a year of separation?', 'This is the provision most people do not know about. Under Section 13(1A)(i) of the Hindu Marriage Act, where there has been no resumption of cohabitation for one year or upwards after a decree of judicial separation, either party may petition for divorce on that ground alone.'],
  ['Either party — even the one who was at fault?', 'The sub-section is framed so that either party to the marriage may present the petition. That is a significant feature, and it is why judicial separation should never be treated as a way of holding the other spouse in place indefinitely.'],
  ['So is judicial separation just a slower divorce?', 'For some it becomes that. For others it is genuinely what they want — a legal boundary with the marriage intact, and the option of reconciliation preserved. Both are legitimate; the important thing is deciding which you are actually pursuing.'],
  ['Can the decree be cancelled if we reconcile?', 'Yes. On the application of either party the court may rescind the decree where it is satisfied that the statements made are true and it is just and reasonable to do so. Reconciliation is contemplated by the scheme rather than treated as an anomaly.'],
  ['Can I claim maintenance?', 'Yes. Interim maintenance and litigation expenses under Section 24, and permanent alimony under Section 25, are available in judicial separation proceedings as in other matrimonial proceedings.'],
  ['Can custody be decided?', 'Yes. Section 26 allows orders on custody, maintenance and education of children in these proceedings, and the arrangement can be varied as circumstances change.'],
  ['Can I remarry after a decree of judicial separation?', 'No. The marriage continues, so remarriage would not be lawful. Only a decree of divorce permits remarriage.'],
  ['Does judicial separation affect inheritance rights?', 'The position is nuanced and depends on the applicable succession law and the facts. It should be checked specifically rather than assumed either way, particularly where estate planning is being done alongside.'],
  ['Is a separation agreement the same thing?', 'No. A separation agreement is a private contract between spouses. Judicial separation is a court decree. The agreement may record practical arrangements but carries nothing like the same enforceability or status.'],
  ['Can we get judicial separation by mutual consent?', 'The statutes frame judicial separation on grounds rather than on consent in the way Section 13B does for divorce. Where both spouses agree on separation and terms, the practical route is often a contested-form petition that is not seriously opposed, or mutual consent divorce if dissolution is acceptable.'],
  ['Is there a one-year bar like there is for divorce?', 'The restriction under Section 14 applies to petitions for divorce. Judicial separation is often the available remedy in the early period of a marriage where divorce is restricted — which is one of its genuine practical uses.'],
  ['How long does it take?', 'It is a contested matrimonial proceeding, so it depends on the grounds, the evidence, whether it is opposed and the court’s pendency. It is not a quick process, though interim relief can come much earlier.'],
  ['Will the court try to reconcile us?', 'Family Courts routinely attempt reconciliation and refer matters to mediation before proceeding. That is part of the process, not an obstacle to it.'],
  ['What if my spouse has deserted me?', 'Desertion for the statutory period is among the grounds. The date the desertion began matters, so the chronology needs to be established carefully.'],
  ['Can I convert this into a divorce later?', 'Yes — either under Section 13(1A)(i) after a year without resumption of cohabitation, or by a fresh petition on any available ground, or by mutual consent if you both agree.'],
  ['What if there is violence at home?', 'Protective remedies come first. The Protection of Women from Domestic Violence Act, 2005 provides for protection, residence and monetary relief, and those can be pursued urgently alongside or ahead of a matrimonial petition.'],
  ['Does a decree stop the other spouse contacting me?', 'Not by itself. It removes the obligation to cohabit; it is not a protection order. Where contact or harassment is the problem, that needs its own remedy.'],
  ['What is the biggest mistake?', 'Choosing judicial separation to avoid a decision rather than because it fits. If reconciliation is genuinely possible it is a sound choice; if the marriage is over, it often just adds a year and a second proceeding.'],
  ['Can Estabizz appear in court?', 'We handle applicable law review, grounds assessment, petition drafting support, evidence preparation, maintenance and custody strategy, settlement terms and advocate coordination. Appearance is through enrolled advocates.']
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
      faqs={faqs}
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Family Law' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Judicial Separation' }]}
      title="Judicial Separation"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Judicial Separation"
      sections={sections}
      ctaTitle="Speak With a Family Law Expert"
      ctaDescription="An honest view on whether judicial separation fits your situation, or whether it simply postpones the decision by a year."
      quickFacts={[
        { label: 'Main provision', value: 'HMA Section 10' },
        { label: 'Marriage', value: 'Continues' },
        { label: 'Remarriage', value: 'Not permitted' },
        { label: 'After 1 year', value: 'Divorce ground opens' }
      ]}
      relatedArticles={[
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Which law governs your marriage and which remedy the facts actually support.' },
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim maintenance and custody, evidence strategy and Family Court procedure.' },
        { title: 'Divorce Settlement Agreements', href: '/solutions/legal/divorce-settlement-agreements', category: 'Legal', description: 'Enforceable consent terms on alimony, custody, property and connected proceedings.' }
      ]}
      finalCtaTitle="Decide Whether It Fits, or Only Delays"
      finalCtaDescription="Judicial separation is genuinely right for some marriages and an expensive detour for others. The difference is whether reconciliation is realistically on the table — and that is worth an honest hour before a petition is drafted."
      heroDescription={<p>Judicial separation lets spouses stop living together with the court&rsquo;s sanction, while the marriage itself continues. It suits people who need a legal boundary, maintenance and custody arrangements and time to decide, without dissolving the marriage — for religious reasons, for family ones, or because reconciliation is genuinely possible. It also carries a consequence few people are told about: after a year without resumption of cohabitation, the decree becomes a ground on which <em>either</em> spouse can seek divorce. Estabizz assists with applicable law review, grounds assessment, petition drafting support, evidence preparation, maintenance and custody strategy, separation terms, rescission on reconciliation and Family Court coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> the court says you no longer have to live together, but you are still married.</p>
        <p>That middle position is the whole point. It gives legal structure — maintenance, custody, a recorded status — without the finality of divorce, and it keeps reconciliation available in a way divorce does not.</p>
        <p>For choosing between this and the other routes, see <Link href="/solutions/legal/divorce-marriage-consulting">Divorce and Marriage Consulting</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Judicial separation is not a licence. It is a matrimonial remedy granted by a Family Court or District Court under the applicable marriage law.</p>
        <p>It is not a required step before divorce, and most divorces do not pass through it. It is chosen where separation is wanted without dissolution.</p>
      </Section>

      <Section id="what-changes" title="What the Decree Changes">
        <DataTable headers={['Aspect', 'Position after a decree']} rows={[
          ['The marriage', 'Continues — it is not dissolved'],
          ['Obligation to cohabit', 'Relieved; the parties are not required to live together'],
          ['Remarriage', 'Not permitted, because the marriage subsists'],
          ['Maintenance', 'Can be ordered, interim and permanent'],
          ['Custody and children', 'Can be addressed in the same proceedings'],
          ['Reconciliation', 'Possible, and the decree can be rescinded'],
          ['Status for most legal purposes', 'Still married'],
          ['Route to divorce', 'Opens after one year without resumption of cohabitation'],
          ['Protection from contact or harassment', 'Not provided by this decree — a separate remedy is needed']
        ]} />
        <div className="info-box" aria-label="Not a protection order">
          <p><strong>A decree of judicial separation is not a protection order.</strong> It removes the duty to cohabit; it does not restrain the other spouse from contacting, following or harassing you. Where that is the real concern, the remedies under the Protection of Women from Domestic Violence Act, 2005 are the ones that actually bite — see <Link href="/solutions/legal/domestic-violence-legal-services">Domestic Violence</Link>.</p>
        </div>
      </Section>

      <Section id="one-year" title="The One-Year Consequence">
        <div className="warning-box" aria-label="Section 13(1A)(i)">
          <p><strong>This is the feature people are least often told about, and it cuts both ways.</strong> Under Section 13(1A)(i) of the Hindu Marriage Act, where there has been no resumption of cohabitation between the parties for a period of one year or upwards after the passing of a decree for judicial separation, a petition for divorce may be presented on that ground — and it may be presented by <strong>either party</strong>. A spouse who obtains judicial separation hoping to preserve the marriage should understand that after a year the other spouse can rely on the very decree they sought to obtain a divorce.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Trigger', 'No resumption of cohabitation for one year or upwards after the decree'],
          ['Who may petition', 'Either party to the marriage'],
          ['What must be proved', 'The decree, and that cohabitation was not resumed'],
          ['Fault', 'The ground does not turn on who was responsible for the breakdown'],
          ['Resumption of cohabitation', 'Living together in a conjugal relationship resets the position'],
          ['Practical consequence', 'Judicial separation frequently becomes a staged route to divorce'],
          ['Planning point', 'Decide at the outset whether that outcome is acceptable to you']
        ]} />
        <p>None of that makes judicial separation a bad choice. It makes it a choice to enter with open eyes — particularly where one spouse is pursuing it specifically to keep the marriage alive.</p>
      </Section>

      <Section id="grounds" title="Grounds">
        <p>Under the Hindu Marriage Act, the grounds for judicial separation under Section 10 are the grounds on which divorce may be sought under Section 13. The relief is different; the threshold is not lower.</p>
        <DataTable headers={['Ground', 'What it involves']} rows={[
          ['Cruelty', 'Physical or mental conduct making cohabitation unsafe or unreasonable'],
          ['Desertion', 'Abandonment without reasonable cause for the statutory period'],
          ['Adultery', 'Voluntary sexual intercourse outside the marriage, subject to proof'],
          ['Conversion', 'Ceasing to be Hindu by conversion to another religion'],
          ['Mental disorder', 'Of the kind and degree the statute specifies'],
          ['Renunciation of the world', 'Entering a religious order'],
          ['Presumption of death', 'Not heard of as alive for the statutory period'],
          ['Venereal disease in communicable form', 'Where recognised under the applicable law'],
          ['Wife-specific grounds', 'Additional grounds available to the wife under the statute']
        ]} />
        <p>Under the Special Marriage Act the position is structured similarly, with Section 23 providing for judicial separation on the grounds connected with Section 27.</p>
      </Section>

      <Section id="why-choose" title="Why People Choose It">
        <DataTable headers={['Reason', 'What it achieves']} rows={[
          ['Reconciliation is genuinely possible', 'Legal boundary without closing the door'],
          ['Religious or personal objection to divorce', 'Separation without dissolution'],
          ['The marriage is within its first year', 'Divorce is restricted under Section 14; this may be available'],
          ['Maintenance is urgently needed', 'Financial relief through the proceedings'],
          ['Custody needs a formal arrangement', 'Court-recorded rather than informal'],
          ['Family or social pressure', 'A recognised legal status reduces ambiguity'],
          ['Time to make a considered decision', 'Without the finality of divorce'],
          ['Building a record for a later divorce', 'The decree itself becomes a ground after a year'],
          ['Desertion by the other spouse', 'A formal remedy where they have simply left']
        ]} />
        <div className="info-box" aria-label="First year">
          <p><strong>The early-marriage case is the strongest practical use.</strong> Section 14 of the Hindu Marriage Act restricts a divorce petition within the first year of marriage, subject to leave in cases of exceptional hardship. Judicial separation is often the remedy that is actually available in that window, and it gives immediate structure on residence, maintenance and children while the restriction runs.</p>
        </div>
      </Section>

      <Section id="vs-divorce" title="Judicial Separation and Divorce Compared">
        <DataTable headers={['Point', 'Judicial separation', 'Divorce']} rows={[
          ['Effect on the marriage', 'Continues', 'Dissolved'],
          ['Duty to cohabit', 'Relieved by the decree', 'No marital relationship remains'],
          ['Remarriage', 'Not permitted', 'Permitted once the decree is final'],
          ['Grounds', 'Same grounds under the Hindu Marriage Act', 'Section 13 grounds, or mutual consent'],
          ['Mutual consent route', 'Not framed on consent in the same way', 'Section 13B available'],
          ['Reconciliation', 'Decree can be rescinded', 'Requires remarriage'],
          ['Restriction in the first year', 'Section 14 bar applies to divorce petitions', 'Restricted, subject to leave'],
          ['Finality', 'Reversible', 'Final'],
          ['Leads to', 'A divorce ground after one year', 'Conclusion of the matter']
        ]} />
      </Section>

      <Section id="vs-agreement" title="Decree or Separation Agreement">
        <DataTable headers={['Point', 'Judicial separation', 'Separation agreement']} rows={[
          ['Nature', 'Court decree', 'Private contract between spouses'],
          ['Court involvement', 'Yes', 'Not necessarily'],
          ['Legal status', 'Recognised matrimonial status', 'Contractual arrangement only'],
          ['Enforceability', 'Through the court that passed it', 'Depends on the terms and general contract law'],
          ['Maintenance', 'Court-ordered and variable', 'As agreed, and not beyond what law permits'],
          ['Child terms', 'Court considers welfare', 'Cannot bind the court on welfare questions'],
          ['Cost and time', 'Litigation process', 'Faster and cheaper'],
          ['Leads to a divorce ground', 'Yes, after a year', 'No'],
          ['Best where', 'A formal status is needed', 'Parties cooperate and want a practical arrangement']
        ]} />
        <p>An agreement can usefully record arrangements, and a settlement is often the sensible companion to any matrimonial proceeding — see <Link href="/solutions/legal/divorce-settlement-agreements">Divorce Settlement Agreements</Link>. It is not a substitute for a decree, and the two should not be confused.</p>
      </Section>

      <Section id="rescission" title="Reconciliation and Rescission">
        <p>The scheme contemplates that spouses may reconcile, and provides for it. On the application of either party, the court may rescind the decree where it is satisfied of the truth of the statements made and that it is just and reasonable to do so.</p>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Who may apply', 'Either party'],
          ['What the court considers', 'Truth of the statements made, and whether rescission is just and reasonable'],
          ['Effect', 'The decree is set aside and the obligations of marriage resume'],
          ['Resumption of cohabitation', 'Also prevents the one-year divorce ground from accruing'],
          ['Practical step', 'Do not rely on informal reconciliation — apply, and have it recorded'],
          ['Existing maintenance or custody orders', 'Should be addressed as part of the application'],
          ['Risk of doing nothing', 'A year passes and the decree becomes a divorce ground']
        ]} />
        <div className="warning-box" aria-label="Informal reconciliation">
          <p><strong>If you reconcile, deal with the decree.</strong> Couples resume living together, assume the decree has lapsed, and leave it on the record. It has not lapsed. Apply to rescind it, so that the position is formally restored and the one-year ground cannot later be asserted on a disputed account of whether cohabitation actually resumed.</p>
        </div>
      </Section>

      <Section id="maintenance" title="Maintenance and Financial Relief">
        <DataTable headers={['Relief', 'Provision', 'What it covers']} rows={[
          ['Interim maintenance and expenses', 'HMA Section 24', 'Support and litigation costs during the proceedings'],
          ['Permanent alimony and maintenance', 'HMA Section 25', 'Ongoing support, variable on changed circumstances'],
          ['Property presented at marriage', 'HMA Section 27', 'Orders regarding such property'],
          ['Alimony under the civil route', 'SMA Sections 36 and 37', 'Pendente lite and permanent alimony'],
          ['Maintenance generally', 'BNSS Section 144', 'Wife, children and parents'],
          ['Maintenance of a Hindu wife', 'Hindu Adoptions and Maintenance Act Section 18', 'Independent statutory right'],
          ['Monetary relief in protection proceedings', 'PWDVA Section 20', 'Where domestic violence proceedings run alongside']
        ]} />
        <p>As with any matrimonial matter, where to claim is a strategic question rather than an automatic one. Claims can arise in parallel and courts account for what has already been awarded.</p>
      </Section>

      <Section id="children" title="Children and Custody">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Provision', 'HMA Section 26, and SMA Section 38 for civil marriages'],
          ['Governing principle', 'Welfare of the child'],
          ['When orders can be made', 'During the proceedings and after the decree'],
          ['Variation', 'Orders can be modified as circumstances change'],
          ['Practical content', 'Residence, visitation, education and expenses'],
          ['Both parents remain parents', 'Separation of the spouses does not sever parental roles'],
          ['Stability', 'Courts favour arrangements that preserve routine and schooling'],
          ['Relocation', 'Best addressed expressly rather than left to arise later']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu marriages', 'Hindu Marriage Act, 1955, Section 10'],
          ['Civil and interfaith marriages', 'Special Marriage Act, 1954, Section 23'],
          ['Christian marriages', 'Divorce Act, 1869, where applicable'],
          ['Parsi marriages', 'Parsi Marriage and Divorce Act, 1936, where applicable'],
          ['Forum', 'Family Courts Act, 1984'],
          ['Maintenance', 'BNSS Section 144 and the Hindu Adoptions and Maintenance Act, 1956'],
          ['Protection remedies', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Custody and guardianship', 'Guardians and Wards Act, 1890 and the applicable matrimonial law'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Settlement terms', 'Indian Contract Act, 1872, where a private agreement is drafted']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['HMA Section 10', 'Judicial separation, on the grounds specified in Section 13'],
          ['HMA Section 10(2)', 'Rescission of the decree on application, where just and reasonable'],
          ['HMA Section 13', 'Grounds, which also govern judicial separation'],
          ['HMA Section 13(1A)(i)', 'Divorce where cohabitation has not resumed for a year after the decree'],
          ['HMA Section 14', 'Restriction on a divorce petition within the first year of marriage'],
          ['HMA Section 23', 'Matters of which the court must be satisfied before granting relief'],
          ['HMA Section 24', 'Interim maintenance and litigation expenses'],
          ['HMA Section 25', 'Permanent alimony and maintenance, and its variation'],
          ['HMA Section 26', 'Custody, maintenance and education of children'],
          ['HMA Section 27', 'Property presented at or about the time of marriage'],
          ['SMA Section 23', 'Judicial separation under the civil marriage route'],
          ['SMA Sections 36 to 38', 'Alimony, maintenance and custody'],
          ['Family Courts Act Section 7', 'Jurisdiction over matrimonial and family disputes']
        ]} />
      </Section>

      <Section id="which-law" title="Which Law Applies">
        <DataTable headers={['How the marriage took place', 'Governing statute', 'Judicial separation provision']} rows={[
          ['Hindu ceremonies between Hindus, Buddhists, Jains or Sikhs', 'Hindu Marriage Act, 1955', 'Section 10'],
          ['Civil marriage before a Marriage Officer', 'Special Marriage Act, 1954', 'Section 23'],
          ['Interfaith marriage without conversion', 'Special Marriage Act, 1954', 'Section 23'],
          ['Christian marriage', 'Divorce Act, 1869', 'As provided in that Act'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936', 'As provided in that Act'],
          ['Marriage abroad with an Indian connection', 'Depends on ceremony, registration and residence', 'Requires review']
        ]} />
      </Section>

      <Section id="process" title="The Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Consultation', 'Facts, objective and whether this remedy fits'],
          ['2', 'Applicable law identification', 'Which statute governs the marriage'],
          ['3', 'Grounds assessment', 'Whether the facts support a statutory ground'],
          ['4', 'Document collection', 'Marriage, financial, child and incident records'],
          ['5', 'Jurisdiction review', 'The correct Family Court'],
          ['6', 'Petition drafting', 'Grounds pleaded with particulars'],
          ['7', 'Interim applications', 'Maintenance, custody or residence where needed'],
          ['8', 'Filing and service', 'Petition filed, notice to the respondent'],
          ['9', 'Reconciliation and mediation', 'Routinely attempted by the court'],
          ['10', 'Written statement and issues', 'The respondent’s case and the matters in dispute'],
          ['11', 'Evidence', 'Affidavits, documents and cross-examination'],
          ['12', 'Arguments and decree', 'Judgment and decree of judicial separation'],
          ['13', 'Post-decree', 'Compliance, or later rescission or divorce']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate or proof of solemnisation', 'Establishes the applicable statute'],
          ['Marriage photographs and invitation', 'Supporting proof'],
          ['Identity and address proof of both spouses', 'Filing and jurisdiction'],
          ['Evidence of separation and its date', 'Chronology and grounds'],
          ['Details and documents of children', 'Custody and maintenance'],
          ['Income proof for both spouses', 'Maintenance and alimony'],
          ['Bank statements and financial records', 'Financial position'],
          ['Property documents', 'Residence and any property claims'],
          ['Medical records', 'Where health, cruelty or capacity is relevant'],
          ['Messages, emails and correspondence', 'Conduct and chronology'],
          ['Police or protection complaints, if any', 'Connected proceedings'],
          ['Existing court papers and orders', 'Consistency across proceedings'],
          ['Any notice exchanged', 'Continuity of position']
        ]} />
      </Section>

      <Section id="evidence" title="Evidence">
        <p>Because the grounds are the same as those for divorce, the evidential burden is the same. A petition that asserts cruelty or desertion without particulars and documents will struggle.</p>
        <DataTable headers={['To establish', 'What helps']} rows={[
          ['Cruelty', 'Specific incidents with dates, medical records, messages, witnesses'],
          ['Desertion', 'The date it began, and evidence of absence without cause'],
          ['The separation and its continuity', 'Residence records, correspondence, witnesses'],
          ['Adultery', 'Evidence meeting the standard the courts require'],
          ['Financial position', 'Income, expenses and asset records for both spouses'],
          ['Child arrangements', 'Schooling, routine and caregiving records'],
          ['No collusion or condonation', 'Matters the court must be satisfied about under Section 23'],
          ['Chronology', 'A date-wise account, prepared early']
        ]} />
      </Section>

      <Section id="defending" title="If a Petition Is Filed Against You">
        <DataTable headers={['Step', 'Why']} rows={[
          ['Obtain and read the petition carefully', 'The grounds pleaded determine the defence'],
          ['Note the date to file a written statement', 'Default can lead to ex parte proceedings'],
          ['Assemble your own chronology and documents', 'Before responding, not after'],
          ['Decide whether to contest or to negotiate', 'A strategic choice, taken early'],
          ['Consider a counter-claim', 'Where you have your own grounds or claims'],
          ['Respond to maintenance claims with evidence', 'Income and expenses, documented'],
          ['Engage with the child arrangements constructively', 'Welfare governs, and conduct is noticed'],
          ['Participate in mediation genuinely', 'Many matters resolve there'],
          ['Take advice before any admission', 'Statements in a written statement are hard to retract']
        ]} />
      </Section>

      <Section id="nri" title="NRI and Cross-Border Matters">
        <DataTable headers={['Issue', 'What needs planning']} rows={[
          ['Spouse resident abroad', 'Jurisdiction and service strategy'],
          ['Proceedings possible in two countries', 'Risk of inconsistent orders'],
          ['A foreign decree already obtained', 'Whether it will be recognised in India'],
          ['Maintenance across borders', 'Whether an order can actually be enforced'],
          ['Child in another country', 'Custody, travel consent and return issues'],
          ['Immigration status linked to the marriage', 'Consequences of a decree that does not dissolve it'],
          ['Attending hearings', 'Video appearance or representation'],
          ['Assets in more than one jurisdiction', 'How any financial order would be given effect']
        ]} />
      </Section>

      <Section id="after-decree" title="Life After the Decree">
        <DataTable headers={['Question', 'Position']} rows={[
          ['Can we live apart lawfully', 'Yes — that is what the decree provides'],
          ['Can either of us remarry', 'No; the marriage subsists'],
          ['Can maintenance be varied', 'Yes, on a change in circumstances'],
          ['Can custody arrangements change', 'Yes, where the child’s welfare requires it'],
          ['What if we reconcile', 'Apply to rescind the decree'],
          ['What if a year passes without cohabitation', 'Either party may seek divorce on that ground'],
          ['Do we still need a settlement', 'Usually yes, for property, finances and children'],
          ['Should wills and nominations be reviewed', 'Yes — the marriage subsists, so estate planning should be deliberate']
        ]} />
        <div className="info-box" aria-label="Estate planning">
          <p><strong>Because the marriage continues, succession and nomination positions do not change simply because you are living apart.</strong> Anyone obtaining a decree of judicial separation should review their will, insurance nominations and other beneficiary designations deliberately rather than assuming the separation has altered them.</p>
        </div>
      </Section>

      <Section id="common-issues" title="Where Petitions Run Into Trouble">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Chosen to avoid a decision', 'A year and a proceeding spent, then divorce anyway', 'Honest assessment of whether reconciliation is realistic'],
          ['Grounds pleaded without particulars', 'The petition fails on evidence', 'Specific incidents, dates and documents'],
          ['Wrong statute invoked', 'Mismatch with the marriage', 'Applicable law identified first'],
          ['The one-year consequence not explained', 'The client is blindsided by a divorce petition', 'Section 13(1A)(i) explained at the outset'],
          ['Reconciliation left unrecorded', 'The decree stands and the ground accrues', 'Rescission applied for'],
          ['Maintenance claimed without evidence', 'The claim is weak', 'Income and expense documentation'],
          ['Custody treated as leverage', 'Damages credibility; welfare governs', 'Child-centred proposals'],
          ['Protection needs unaddressed', 'The decree does not restrain contact', 'PWDVA remedies pursued separately'],
          ['Separation agreement mistaken for a decree', 'No legal status obtained', 'The difference explained before filing'],
          ['Estate planning not reviewed', 'Unintended beneficiary outcomes', 'Wills and nominations revisited']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Confidential consultation', 'Whether this remedy fits the situation'],
          ['Applicable law review', 'Which statute governs the marriage'],
          ['Grounds assessment', 'Whether the facts support a statutory ground'],
          ['Route comparison', 'Judicial separation against divorce and settlement'],
          ['Petition drafting support', 'Grounds pleaded with particulars'],
          ['Evidence preparation', 'Chronology, documents and witnesses'],
          ['Interim relief strategy', 'Maintenance, custody and residence'],
          ['Maintenance planning', 'Claim or response, with financial documentation'],
          ['Custody strategy', 'Welfare-based arrangements'],
          ['Separation terms drafting', 'Where a written arrangement is wanted alongside'],
          ['Rescission support', 'Where the parties reconcile'],
          ['Conversion to divorce', 'Under Section 13(1A)(i) or another route'],
          ['Defence support', 'Where a petition is filed against you'],
          ['Advocate coordination', 'Brief, chronology and filing support'],
          ['Ticket-based tracking', 'Filing, hearings, orders and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Judicial separation is the right answer for a genuine set of situations — an early marriage where divorce is restricted, a religious objection to dissolution, a couple who need structure while they decide. It is the wrong answer when it is chosen to postpone a decision. Anyone taking this route should be told plainly that after a year without cohabitation, either spouse can rely on the decree to seek a divorce.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Which statute applies, whether the facts support a ground, what maintenance or custody outcome is likely and how a court will exercise its discretion all depend on the individual circumstances. The consequences of a decree, including for succession and other rights, should be confirmed for your situation rather than assumed from this page. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides assessment, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
