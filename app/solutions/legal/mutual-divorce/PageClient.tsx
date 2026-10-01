'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'conditions', title: 'What the Court Must Be Satisfied Of' },
  { id: 'two-motions', title: 'The Two Motions' },
  { id: 'waiver', title: 'Waiving the Cooling-Off Period' },
  { id: 'withdrawal', title: 'If Consent Is Withdrawn' },
  { id: 'settlement', title: 'Settling the Terms First' },
  { id: 'cannot-waive', title: 'What Cannot Be Settled Away' },
  { id: 'which-law', title: 'Which Law Applies' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'vs-contested', title: 'Mutual or Contested' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'timeline', title: 'Realistic Timeline' },
  { id: 'nri', title: 'NRI Couples and Appearance' },
  { id: 'pending-cases', title: 'Pending Cases and Complaints' },
  { id: 'after-decree', title: 'After the Decree' },
  { id: 'common-issues', title: 'Why Mutual Petitions Stall' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is mutual divorce?', 'Divorce by the consent of both spouses, through a joint petition. Section 13B of the Hindu Marriage Act and Section 28 of the Special Marriage Act provide for it, with equivalents in the other personal law statutes.'],
  ['What does the court need to be satisfied of?', 'Broadly, that the parties have been living separately for the statutory period, that they have not been able to live together, and that they have mutually agreed the marriage should be dissolved — and that the consent is free.'],
  ['How long must we have lived separately?', 'Section 13B requires that the parties have been living separately for a period of one year or more before the petition is presented. Living separately is about the absence of a marital relationship rather than necessarily separate addresses.'],
  ['What are the two motions?', 'The first motion, where the joint petition is filed and statements are recorded; then a statutory interval; then the second motion, where both parties confirm their consent and the court passes the decree.'],
  ['How long is the interval?', 'Section 13B(2) contemplates not less than six months and not more than eighteen months after the first motion.'],
  ['Can the six months be waived?', 'Yes, in appropriate cases. In Amardeep Singh v. Harveen Kaur (2017) the Supreme Court held the period is directory rather than mandatory, and a court may waive it where the statutory purpose would not be served.'],
  ['When will a court actually waive it?', 'Typically where the parties have been separated for a substantial period well beyond the statutory minimum, every issue including alimony and custody is genuinely settled, mediation has failed or is pointless, and there is no prospect of reconciliation. It is a guided discretion, applied for and reasoned — never assumed.'],
  ['Can either of us change our mind?', 'Yes. Consent must subsist at the second motion. Either party can withdraw before the decree, and that does happen.'],
  ['What happens if my spouse withdraws consent?', 'The mutual petition cannot proceed. The options are to negotiate further, or to pursue a contested petition on an available ground — which is a different and much longer process.'],
  ['How do we protect against that?', 'Structure the obligations so neither side performs everything before the other starts. Stage alimony payments against the motions rather than paying in full at the first, and record the settlement as consent terms before the court rather than in a private paper.'],
  ['Should the settlement be agreed before filing?', 'Yes. The single biggest cause of a stalled mutual petition is parties filing with the terms still open, and then discovering at the second motion that they do not actually agree.'],
  ['What should the settlement cover?', 'Alimony, child custody and visitation, child support separately, stridhan, property, loans, withdrawal of pending cases and what happens on default.'],
  ['Can we agree there will be no alimony?', 'You can record it, but understand the limit. An agreement relinquishing the right to claim future maintenance has repeatedly been held to be opposed to public policy and unenforceable. What makes a settlement durable is adequate provision, full disclosure and court-recorded terms — not the strength of the waiver wording.'],
  ['Can we waive child maintenance?', 'No. Maintenance for a child is the child’s right, not the parents’ to trade away. Provide for the child separately and visibly rather than relying on a clause purporting to extinguish the claim.'],
  ['Will the court interfere with our custody arrangement?', 'A court generally respects a workable arrangement the parents have agreed, but custody is decided on the welfare of the child and the court retains the power to examine and vary the terms.'],
  ['Do both of us have to appear in court?', 'Appearance is ordinarily expected at both motions. Courts have in appropriate cases permitted appearance through video conferencing or a duly authorised representative, particularly for parties abroad — but it is a matter for the court and should not be assumed.'],
  ['Can we file if one of us is abroad?', 'Yes, with planning around execution of documents, attestation and appearance. The mode of appearance should be addressed with the court rather than left to the hearing date.'],
  ['Can we file within the first year of marriage?', 'Section 14 restricts a divorce petition within one year of marriage, subject to leave in cases of exceptional hardship. Judicial separation is often the available remedy in that window.'],
  ['What happens to our pending cases?', 'They do not close automatically. The settlement should record what happens to each, and note that some criminal proceedings are not compoundable and require a High Court application.'],
  ['Is a mutual divorce cheaper?', 'Substantially. It is also faster and considerably less damaging, particularly where children are involved. Most contested matters that settle eventually would have cost far less had they started here.'],
  ['Can a contested case be converted to mutual?', 'Yes, and many are. Where the parties reach terms during contested proceedings, they can move to a joint petition or record consent terms.'],
  ['Is the decree final?', 'A decree of divorce is final subject to appeal. Once it is final, both parties are free to remarry.'],
  ['What do we need after the decree?', 'A certified copy. It will be required for remarriage, for changing records and nominations, and for passport and immigration purposes.'],
  ['What is the biggest mistake?', 'Filing before the terms are genuinely agreed, or paying the entire alimony at the first motion and having nothing left to secure the second.'],
  ['Can Estabizz appear in court?', 'We handle settlement structuring, joint petition inputs, documentation, waiver assessment and advocate coordination. Appearance is through enrolled advocates.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Mutual Divorce' }]}
      title="Mutual Divorce"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Mutual Divorce"
      sections={sections}
      ctaTitle="Speak With a Family Law Expert"
      ctaDescription="Terms settled before filing, obligations staged across the two motions, and a petition that does not stall at the second."
      quickFacts={[
        { label: 'Provision', value: 'HMA Section 13B' },
        { label: 'Separation required', value: 'One year or more' },
        { label: 'Interval', value: '6 to 18 months' },
        { label: 'Waiver', value: 'Possible, not automatic' }
      ]}
      relatedArticles={[
        { title: 'Divorce Settlement Agreements', href: '/solutions/legal/divorce-settlement-agreements', category: 'Legal', description: 'Enforceable consent terms on alimony, custody, stridhan, property and connected proceedings.' },
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Which law governs your marriage and which remedy the facts actually support.' },
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim maintenance and custody, evidence strategy and Family Court procedure.' }
      ]}
      finalCtaTitle="Settle the Terms, Then File"
      finalCtaDescription="A mutual petition filed with the money, the children and the pending cases still open is not a shortcut — it is a contested divorce that has not admitted it yet."
      heroDescription={<p>Where both spouses agree, mutual consent divorce is faster, cheaper and far less damaging than any alternative — particularly where there are children. The process itself is straightforward: a joint petition, a first motion, a statutory interval and a second motion. What derails it is almost never the procedure. It is filing before the terms are genuinely agreed, or structuring the payments so that one party has performed everything before the other has to turn up. Estabizz assists with settlement structuring, joint petition inputs, alimony and custody terms, stridhan and property schedules, cooling-off waiver assessment, closure of connected proceedings, NRI appearance planning and post-decree documentation.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> both spouses ask the court together to end the marriage, on terms they have agreed.</p>
        <p>It is the route almost every family lawyer would recommend where it is genuinely available, because it costs a fraction of contested proceedings, concludes in months rather than years, and leaves a co-parenting relationship intact where children are involved.</p>
        <p>For choosing between this and the alternatives, see <Link href="/solutions/legal/divorce-marriage-consulting">Divorce and Marriage Consulting</Link>. For the settlement document itself, see <Link href="/solutions/legal/divorce-settlement-agreements">Divorce Settlement Agreements</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Mutual divorce is not a licence or a registration. It is a Family Court proceeding on a joint petition.</p>
        <p>It requires both spouses to agree, and to keep agreeing until the decree. The legal work is in the terms, not the petition.</p>
      </Section>

      <Section id="conditions" title="What the Court Must Be Satisfied Of">
        <DataTable headers={['Requirement', 'What it means']} rows={[
          ['Living separately', 'For one year or more before the petition is presented'],
          ['Meaning of living separately', 'Absence of a marital relationship, rather than necessarily separate addresses'],
          ['Unable to live together', 'The marriage has broken down in fact'],
          ['Mutual agreement to dissolve', 'Both spouses genuinely want the marriage ended'],
          ['Free consent', 'Not obtained by force, fraud or undue influence'],
          ['Consent subsisting', 'At both the first and the second motion'],
          ['Terms of settlement', 'The court will want to see what has been agreed'],
          ['Welfare of any children', 'The court will examine the arrangement'],
          ['Satisfaction under Section 23', 'Including that there is no collusion of the kind the Act disapproves']
        ]} />
      </Section>

      <Section id="two-motions" title="The Two Motions">
        <DataTable headers={['Stage', 'What happens', 'What to have ready']} rows={[
          ['Preparation', 'Terms negotiated and recorded', 'A complete settlement, not a draft'],
          ['Joint petition filed', 'Both spouses petition together', 'Marriage proof, separation evidence, settlement'],
          ['First motion', 'Statements recorded before the court', 'Both parties present, or appearance arranged'],
          ['Statutory interval', 'Not less than six and not more than eighteen months', 'Compliance with any staged obligations'],
          ['Waiver application', 'Where the facts support it', 'Evidence of long separation and full settlement'],
          ['Second motion', 'Both parties confirm consent', 'Consent subsisting, obligations on track'],
          ['Decree', 'The marriage is dissolved', 'Certified copy obtained'],
          ['Post-decree', 'Payments, handovers, records', 'Compliance tracked to closure']
        ]} />
      </Section>

      <Section id="waiver" title="Waiving the Cooling-Off Period">
        <div className="info-box" aria-label="Waiver position">
          <p><strong>The six-month interval is not invariably mandatory.</strong> In <em>Amardeep Singh v. Harveen Kaur</em> (2017) the Supreme Court held that the period under Section 13B(2) is directory rather than mandatory, and that a court may waive it where the object of the provision — guarding against a hasty decision — would not be served. It is a guided discretion exercised on the facts, so a waiver is applied for and reasoned, never presumed.</p>
        </div>
        <DataTable headers={['Factor', 'Weight in a waiver application']} rows={[
          ['Length of separation', 'A period well beyond the statutory minimum supports it'],
          ['Prior litigation', 'Long-running proceedings indicate the marriage is beyond repair'],
          ['All issues genuinely settled', 'Alimony, custody, property and pending cases'],
          ['Mediation attempted', 'Shows reconciliation was explored'],
          ['No prospect of reconciliation', 'The central consideration'],
          ['Hardship from further delay', 'Prolonging the position serves no purpose'],
          ['Free and informed consent', 'The court must be satisfied there is no pressure'],
          ['Age and remarriage prospects', 'Can be relevant to the hardship assessment'],
          ['Terms already performed', 'Evidence that the settlement is real']
        ]} />
      </Section>

      <Section id="withdrawal" title="If Consent Is Withdrawn">
        <div className="warning-box" aria-label="Consent must subsist">
          <p><strong>Consent must exist at the second motion, not merely at the first.</strong> Either party can withdraw before the decree, and it happens often enough to plan for. The party most exposed is the one who has already performed — typically the spouse who paid the entire alimony at the first motion and then finds the other will not attend the second. Structure the obligations so that nobody is left in that position.</p>
        </div>
        <DataTable headers={['Protective structure', 'Effect']} rows={[
          ['Stage alimony across the two motions', 'Neither side performs everything up front'],
          ['Hold a meaningful balance until the decree', 'Preserves the incentive to complete'],
          ['Record terms as consent terms in court', 'Far stronger than a private memorandum'],
          ['Document stridhan handover against receipt', 'Prevents a later dispute being used as leverage'],
          ['Sequence withdrawal of cases carefully', 'Do not withdraw everything before the decree'],
          ['Provide expressly for withdrawal of consent', 'What happens to sums already paid'],
          ['Keep the settlement realistic', 'Terms that one side resents are the ones that collapse'],
          ['If consent is withdrawn', 'Negotiate, or move to a contested petition on an available ground']
        ]} />
      </Section>

      <Section id="settlement" title="Settling the Terms First">
        <DataTable headers={['Term', 'What to agree before filing']} rows={[
          ['Alimony', 'Amount, whether one-time or periodic, dates and mode'],
          ['Child support', 'Separate from alimony, with coverage and review'],
          ['Custody', 'Who the child lives with, and decision-making'],
          ['Visitation', 'Specific days, holidays and handover arrangements'],
          ['Education and medical costs', 'Sharing and how changes are handled'],
          ['Stridhan', 'Item-wise schedule and a handover date'],
          ['Property', 'Who retains what, and any transfer mechanism'],
          ['Loans and liabilities', 'Who services what, with indemnity'],
          ['Pending proceedings', 'What is withdrawn, and in what sequence'],
          ['Confidentiality and non-interference', 'Protects both afterwards'],
          ['Payment schedule', 'Staged against the motions'],
          ['Default consequences', 'What happens if someone does not perform']
        ]} />
      </Section>

      <Section id="cannot-waive" title="What Cannot Be Settled Away">
        <div className="warning-box" aria-label="Limits of settlement">
          <p><strong>Two things a mutual settlement cannot achieve, however clearly drafted.</strong> First, child maintenance cannot be waived by the parents, because the right belongs to the child — an agreement purporting to extinguish it does not bind the child and a court can order support regardless. Second, an agreement by which a spouse relinquishes the right to claim future maintenance has repeatedly been held to be opposed to public policy and unenforceable. A full-and-final clause is worth having and carries evidential weight, but it is not an absolute bar.</p>
        </div>
        <DataTable headers={['What actually makes a settlement hold', 'Why']} rows={[
          ['Adequate provision rather than a token sum', 'A later court asks whether it was fair, not whether it was signed'],
          ['Full financial disclosure on both sides', 'Concealment is the usual basis for reopening'],
          ['Separate, visible provision for the child', 'Far stronger than a clause extinguishing the claim'],
          ['Genuinely voluntary consent', 'Pressure undermines the whole document'],
          ['Independent advice for both parties', 'Removes the argument that one side did not understand'],
          ['Terms recorded before the court', 'Consent terms carry the weight of an order'],
          ['Payment through a traceable channel', 'Performance is the best evidence of a real settlement']
        ]} />
      </Section>

      <Section id="which-law" title="Which Law Applies">
        <DataTable headers={['How the marriage took place', 'Statute', 'Mutual consent provision']} rows={[
          ['Hindu ceremonies between Hindus, Buddhists, Jains or Sikhs', 'Hindu Marriage Act, 1955', 'Section 13B'],
          ['Civil marriage before a Marriage Officer', 'Special Marriage Act, 1954', 'Section 28'],
          ['Interfaith marriage without conversion', 'Special Marriage Act, 1954', 'Section 28'],
          ['Christian marriage', 'Divorce Act, 1869', 'Section 10A'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936', 'Section 32B'],
          ['Marriage abroad with an Indian connection', 'Depends on ceremony, registration and residence', 'Requires review']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu marriages', 'Hindu Marriage Act, 1955'],
          ['Civil and interfaith marriages', 'Special Marriage Act, 1954'],
          ['Christian marriages', 'Divorce Act, 1869'],
          ['Parsi marriages', 'Parsi Marriage and Divorce Act, 1936'],
          ['Forum', 'Family Courts Act, 1984'],
          ['Maintenance', 'BNSS Section 144 and the applicable matrimonial statute'],
          ['Custody and guardianship', 'Guardians and Wards Act, 1890 and the applicable law'],
          ['Settlement terms', 'Indian Contract Act, 1872, and consent terms before the court'],
          ['Property transfer in settlement', 'Registration Act and State stamp law, where rights move'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['HMA Section 13B(1)', 'Joint petition on the ground of mutual consent'],
          ['HMA Section 13B(2)', 'The six to eighteen month interval and the second motion'],
          ['HMA Section 14', 'Restriction on a petition within the first year of marriage'],
          ['HMA Section 23', 'Matters of which the court must be satisfied'],
          ['HMA Section 24', 'Interim maintenance and litigation expenses'],
          ['HMA Section 25', 'Permanent alimony, and the power to vary'],
          ['HMA Section 26', 'Custody, maintenance and education of children'],
          ['HMA Section 27', 'Property presented at or about the time of marriage'],
          ['SMA Section 28', 'Mutual consent divorce under the civil marriage route'],
          ['SMA Sections 36 to 38', 'Alimony, maintenance and custody'],
          ['Family Courts Act Section 7', 'Jurisdiction'],
          ['BNSS Section 144', 'Maintenance of wives, children and parents']
        ]} />
      </Section>

      <Section id="vs-contested" title="Mutual or Contested">
        <DataTable headers={['Point', 'Mutual consent', 'Contested']} rows={[
          ['Basis', 'Agreement of both spouses', 'A statutory ground, proved'],
          ['Evidence', 'Minimal — the terms and the separation', 'Full evidence and cross-examination'],
          ['Duration', 'Months, subject to the interval', 'Commonly years'],
          ['Cost', 'A fraction', 'Substantially higher'],
          ['Control over outcome', 'The parties decide the terms', 'The court decides'],
          ['Effect on children', 'Far less damaging', 'Prolonged conflict'],
          ['Risk', 'Consent withdrawn before the decree', 'Ground not established'],
          ['Privacy', 'Little is aired', 'Allegations become part of the record'],
          ['Convertible', 'Can fall back to contested', 'Can convert to mutual at any stage']
        ]} />
        <p>A large proportion of contested matters settle eventually. Where that is the likely destination, arriving there at the start saves years and a great deal of money.</p>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate or proof of solemnisation', 'Establishes the marriage and the applicable statute'],
          ['Marriage photographs and invitation', 'Supporting proof'],
          ['Identity and address proof of both spouses', 'Filing and jurisdiction'],
          ['Evidence of separation and its date', 'The one-year requirement'],
          ['Settlement terms', 'Alimony, custody, stridhan, property and cases'],
          ['Income proof of both spouses', 'Supporting the alimony terms'],
          ['Children’s documents', 'Custody and support arrangements'],
          ['Stridhan list', 'Item-wise schedule with handover date'],
          ['Property documents', 'Where property is being dealt with'],
          ['Details of pending proceedings', 'Withdrawal and closure mapping'],
          ['Passport and visa documents', 'NRI matters'],
          ['Bank details', 'For traceable payment of settlement sums']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Consultation', 'Eligibility, objective and readiness'],
          ['2', 'Applicable law check', 'Which statute governs the marriage'],
          ['3', 'Separation and first-year check', 'One-year separation and the Section 14 position'],
          ['4', 'Settlement negotiation support', 'Terms on money, children and property'],
          ['5', 'Settlement drafting', 'Specific, staged and enforceable'],
          ['6', 'Joint petition inputs', 'Prepared with the settlement annexed'],
          ['7', 'First motion', 'Statements recorded'],
          ['8', 'Waiver assessment', 'Whether the facts support an application'],
          ['9', 'Interval compliance', 'Staged obligations tracked'],
          ['10', 'Second motion', 'Consent confirmed, decree passed'],
          ['11', 'Certified copy', 'Obtained and retained'],
          ['12', 'Post-decree closure', 'Payments, handovers, records and nominations']
        ]} />
      </Section>

      <Section id="timeline" title="Realistic Timeline">
        <DataTable headers={['Stage', 'What drives the time']} rows={[
          ['Agreeing the terms', 'Usually the longest part, and entirely within the parties’ control'],
          ['Preparing and filing', 'Documents and the settlement being ready'],
          ['First motion listing', 'Court’s list'],
          ['Statutory interval', 'Six months, unless waived'],
          ['Waiver, if granted', 'Can compress the timeline considerably'],
          ['Second motion listing', 'Court’s list'],
          ['Decree', 'Usually at the second motion'],
          ['Certified copy', 'A short administrative step'],
          ['Honest expectation', 'Months rather than years, where the terms are settled']
        ]} />
      </Section>

      <Section id="nri" title="NRI Couples and Appearance">
        <DataTable headers={['Issue', 'What to plan']} rows={[
          ['Appearance at the motions', 'Whether video conferencing or a representative is permissible'],
          ['Execution of documents abroad', 'Notarisation and apostille or consular attestation'],
          ['Power of attorney', 'Scope, and whether the court will accept it for these proceedings'],
          ['Travel planning', 'Coordinating both motions with the court’s dates'],
          ['Payment across borders', 'Banking route and documentation'],
          ['Recognition of the decree abroad', 'Whether it will be recognised where it matters'],
          ['Immigration consequences', 'Timing of the decree against visa status'],
          ['Children travelling', 'Consent, passports and custody terms'],
          ['Jurisdiction', 'Which Family Court can entertain the petition']
        ]} />
        <p>Do not assume remote appearance will be permitted. Raise it with the court early, so that a refusal does not derail a travel plan built around it.</p>
      </Section>

      <Section id="pending-cases" title="Pending Cases and Complaints">
        <DataTable headers={['Proceeding', 'How it is dealt with']} rows={[
          ['Maintenance application', 'Withdrawal, or adjustment against the settlement'],
          ['Domestic violence proceedings', 'Generally resolvable by agreement, with residence and safety addressed'],
          ['Criminal cruelty proceedings', 'Generally non-compoundable — usually requires a High Court quashing application'],
          ['Custody proceedings', 'Consent terms aligned with the agreed parenting plan'],
          ['Property or civil suit', 'Withdrawal on compliance, or a consent decree'],
          ['Police complaint not yet an FIR', 'Closure or non-pursuit statement'],
          ['Sequencing', 'Do not withdraw everything before the decree'],
          ['Obligation to cooperate', 'Record it, rather than assuming closure follows automatically']
        ]} />
        <p>A decree that leaves four other proceedings running is not closure. The settlement should name each one and say what happens to it — see <Link href="/solutions/legal/divorce-settlement-agreements">Divorce Settlement Agreements</Link>.</p>
      </Section>

      <Section id="after-decree" title="After the Decree">
        <DataTable headers={['Step', 'Why it matters']} rows={[
          ['Obtain the certified copy', 'Required for every subsequent step'],
          ['Complete any outstanding payments', 'As the settlement provides'],
          ['Complete stridhan and property handover', 'Against written acknowledgement'],
          ['Withdraw the remaining proceedings', 'In the agreed sequence'],
          ['Update nominations and beneficiaries', 'Insurance, provident fund, bank accounts'],
          ['Review the will', 'The position has changed materially'],
          ['Update official records', 'Passport, bank and employer records'],
          ['Remarriage', 'Permissible once the decree is final, subject to appeal'],
          ['Retain the file', 'Settlement, decree and acknowledgements together']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Mutual Petitions Stall">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Filed with terms still open', 'Disagreement surfaces at the second motion', 'Settlement completed before filing'],
          ['Entire alimony paid at the first motion', 'No leverage if consent is withdrawn', 'Payments staged across the motions'],
          ['Settlement kept as a private paper', 'Hard to enforce', 'Recorded as consent terms before the court'],
          ['Stridhan described generally', 'Handover disputed, petition delayed', 'Item-wise schedule with acknowledgement'],
          ['Child support merged into alimony', 'The child’s claim survives anyway', 'Separate, visible provision'],
          ['Waiver assumed rather than applied for', 'Six months waited unnecessarily, or an unreasoned application', 'Assessed and properly supported'],
          ['One-year separation not evidenced', 'Threshold requirement questioned', 'Separation documented'],
          ['Petition filed within the first year of marriage', 'Section 14 objection', 'Position checked before filing'],
          ['Pending criminal case assumed closed', 'It is not, and nobody applied to quash it', 'Obligation to cooperate recorded and sequenced'],
          ['All cases withdrawn before the decree', 'Leverage gone if consent is withdrawn', 'Withdrawal sequenced after the decree']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Eligibility assessment', 'Separation period, applicable law and the Section 14 position'],
          ['Settlement structuring', 'The framework before the drafting'],
          ['Settlement drafting', 'Alimony, custody, stridhan, property and cases'],
          ['Payment staging', 'Obligations sequenced across the two motions'],
          ['Joint petition inputs', 'Prepared with the settlement annexed'],
          ['Waiver assessment', 'Whether to apply, and how to support it'],
          ['Custody and parenting terms', 'Welfare-based and practical'],
          ['Stridhan schedule', 'Item-wise, with handover mechanism'],
          ['Pending case closure mapping', 'What closes how, and when'],
          ['NRI appearance planning', 'Attestation, representation and travel'],
          ['Post-decree compliance', 'Payments, handovers and record updates'],
          ['Advocate coordination', 'Filing and appearance support'],
          ['Ticket-based tracking', 'Motions, dates, compliance and closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Mutual divorce fails for one of two reasons, and neither is procedural. Either the couple filed before they had actually agreed the money and the children, or one of them performed everything at the first motion and had nothing left to secure the second. Settle the terms first, stage the obligations across both motions, and put the settlement on the court record rather than in a drawer.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Eligibility, the terms a court will accept, whether a waiver will be granted and how custody will be approached all depend on the facts and the view the court takes. The position on maintenance waivers is summarised here in general terms and should be confirmed for your matter. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides assessment, settlement structuring, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before signing anything.</p>
      </Section>
    </ServicePageLayout>
  );
}
