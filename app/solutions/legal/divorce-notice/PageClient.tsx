'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-it-does', title: 'What a Notice Does and Does Not Do' },
  { id: 'before-sending', title: 'Decide the Objective First' },
  { id: 'when-it-helps', title: 'When a Notice Helps' },
  { id: 'when-not-to', title: 'When Not to Send One' },
  { id: 'contents', title: 'What a Strong Notice Contains' },
  { id: 'avoid', title: 'What Should Never Go In' },
  { id: 'settlement', title: 'Settlement Points Worth Covering' },
  { id: 'replying', title: 'Replying to a Notice You Received' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'law-selection', title: 'Which Law Governs Your Marriage' },
  { id: 'types', title: 'Types of Notice We Handle' },
  { id: 'stridhan', title: 'Stridhan and Property' },
  { id: 'maintenance', title: 'Maintenance and Custody in a Notice' },
  { id: 'nri', title: 'NRI and Overseas Service' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'notice-vs-petition', title: 'Notice, Petition and Mutual Divorce' },
  { id: 'common-issues', title: 'Where Notices Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a divorce notice?', 'A formal legal communication sent by one spouse to the other recording the matrimonial dispute, setting out what is sought — separation, divorce, maintenance, custody, return of stridhan — and often proposing a settlement before anyone goes to court.'],
  ['Does a notice end the marriage?', 'No. A marriage is dissolved only by a decree of a competent court under the applicable law. A notice has no dissolving effect whatsoever, however strongly it is worded.'],
  ['Is it mandatory before filing for divorce?', 'Generally no. It is not a universal statutory precondition. It is sent because it creates a record, opens settlement, and frames the dispute — not because the law demands it.'],
  ['Which law applies to my marriage?', 'It depends on how and under which law you married. The Hindu Marriage Act, 1955, the Special Marriage Act, 1954, the Indian Divorce Act, 1869, the Parsi Marriage and Divorce Act, 1936 or the Dissolution of Muslim Marriages Act, 1939 may apply. Getting this right at the notice stage prevents a mismatch later.'],
  ['Can a notice propose mutual divorce?', 'Yes, and it is often the most constructive use of one. It can set out proposed terms on alimony, custody, stridhan and withdrawal of pending cases, so that the joint petition is largely agreed before it is drafted.'],
  ['What is the mutual consent route?', 'A joint petition under Section 13B of the Hindu Marriage Act, or Section 28 of the Special Marriage Act, with a first motion, a statutory interval and a second motion before the decree.'],
  ['Is the six-month cooling-off period compulsory?', 'Not invariably. The Supreme Court held in Amardeep Singh v. Harveen Kaur (2017) that the period under Section 13B(2) is directory rather than mandatory, and a court may waive it where the parties have genuinely settled everything and there is no prospect of reconciliation. It is a discretion exercised on the facts, not an entitlement.'],
  ['Can I file for divorce within the first year of marriage?', 'Section 14 of the Hindu Marriage Act restricts a divorce petition within the first year, subject to leave in cases of exceptional hardship or exceptional depravity. This is worth checking before a notice announces an intention to file.'],
  ['Can maintenance be demanded in the notice?', 'Yes. Interim and permanent support, child expenses and litigation costs can all be raised. Maintenance claims can arise under the matrimonial statute, under Section 144 of the BNSS, and for a Hindu wife under the Hindu Adoptions and Maintenance Act.'],
  ['Can custody terms be proposed?', 'Yes, and a notice that proposes a workable parenting arrangement reads far better than one that demands sole custody without reasoning. Courts approach custody through the welfare of the child, and a notice should reflect that.'],
  ['Can I demand my stridhan back?', 'Yes. Stridhan is the wife’s absolute property and a notice should itemise it — jewellery, gifts, cash and belongings — rather than claiming it in general terms. A vague demand is very difficult to enforce later.'],
  ['Can a notice be sent by email?', 'Email is commonly used alongside a trackable physical mode. Preserve dispatch and delivery proof either way, because service is routinely disputed in matrimonial proceedings.'],
  ['Can a notice be sent to a spouse abroad?', 'Yes, to the overseas address and by email, with the service strategy planned around where proceedings may eventually be filed.'],
  ['What if I ignore a notice I have received?', 'Ignoring it is rarely wise. Silence can be characterised later as acceptance of the account given, and it forfeits the chance to place your version on record before positions harden.'],
  ['Should I reply immediately and angrily?', 'No. A reply written the same evening is the most common source of admissions in matrimonial litigation. Have it reviewed and reply in measured, factual terms within the time given.'],
  ['Can a notice be used against me in court?', 'Yes. The notice and the reply may both be relied on later. That is precisely why neither should be drafted casually.'],
  ['What should never go into a notice?', 'Allegations you cannot evidence, abusive language, threats of criminal action used as leverage, admissions of fault, and emotional narration that obscures the legal points.'],
  ['Can an aggressive notice backfire?', 'Frequently. It hardens the other side, can provoke counter-proceedings, and where the allegations are reckless it can create separate exposure. Firmness and recklessness are not the same thing.'],
  ['Can a notice be withdrawn or corrected?', 'A clarification or corrective communication is sometimes possible, but the earlier notice does not disappear from the record. This is a reason to get it right the first time.'],
  ['What if there is a domestic violence risk?', 'Safety planning comes before correspondence. Where there is a real risk, urgent protective remedies under the Protection of Women from Domestic Violence Act, 2005 should be considered before a notice alerts the other side.'],
  ['What if there are already cases pending?', 'The notice must be consistent with what has already been pleaded. A notice that contradicts an existing filing hands the other side an inconsistency to use.'],
  ['Can a notice help reconciliation?', 'Sometimes. A notice can invite discussion, counselling or mediation rather than announce litigation, and framed that way it occasionally does more good than a petition would.'],
  ['Is a reply compulsory?', 'Not always, but where allegations, demands or consequences are stated, replying is usually the better course. The decision should be strategic, not reflexive.'],
  ['What is the biggest mistake?', 'Sending a notice before deciding what outcome you actually want. A notice drafted to express anger and one drafted to achieve a settlement look completely different, and only the second tends to work.'],
  ['Can Estabizz appear in court?', 'We handle case assessment, applicable-law mapping, notice and reply drafting, settlement terms, documentation and advocate coordination. Appearance is through enrolled advocates.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Divorce Notice' }]}
      title="Divorce Notice"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Divorce Notice"
      sections={sections}
      ctaTitle="Speak With a Family Law Expert"
      ctaDescription="Confidential drafting and reply support — firm where it needs to be, settlement-focused where that serves you better."
      quickFacts={[
        { label: 'Dissolves marriage?', value: 'No — only a decree does' },
        { label: 'Mandatory?', value: 'Generally no' },
        { label: 'Usable in court?', value: 'Yes, by both sides' },
        { label: 'Decide first', value: 'The outcome you want' }
      ]}
      relatedArticles={[
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Choosing the route — mutual consent, contested, judicial separation or annulment — and which law governs your marriage.' },
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim maintenance and custody, evidence strategy, NRI matters and Family Court procedure.' },
        { title: 'Court Marriage', href: '/solutions/legal/court-marriage', category: 'Legal', description: 'Civil marriage under the Special Marriage Act — eligibility, notice period, objections and the certificate.' }
      ]}
      finalCtaTitle="Decide the Outcome Before Drafting the Notice"
      finalCtaDescription="A notice written to express how you feel and a notice written to achieve a settlement read nothing alike. The second one is usually the one that works, and it costs no more to draft."
      heroDescription={<p>A divorce notice is usually the first formal step in a matrimonial dispute, and it sets the record that every later proceeding is read against. Drafted well, it opens a settlement, records a demand and positions the case properly. Drafted in anger, it escalates the conflict, hands the other side admissions and allegations to work with, and makes the eventual settlement harder and more expensive. Estabizz assists with case assessment, identifying the applicable matrimonial law, notice drafting, replying to a notice received, mutual divorce and settlement terms, maintenance and alimony positions, child custody proposals, stridhan recovery, NRI service strategy and Family Court documentation — confidentially, and with the eventual court file in mind.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a divorce notice is a legal letter from one spouse to the other, setting out the position and what is being sought.</p>
        <p>It may be sent before a mutual consent petition, before contested proceedings, before a maintenance or custody application, or simply to place a version of events on record when the other side has started making allegations.</p>
        <p>This page covers the notice itself. For choosing the route — mutual consent, contested, judicial separation or annulment — see <Link href="/solutions/legal/divorce-marriage-consulting">Divorce and Marriage Consulting</Link>, and for contested proceedings in detail see <Link href="/solutions/legal/contested-divorce">Contested Divorce</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A divorce notice is not a licence or a filing. It is pre-litigation correspondence, and nothing about it is registered with any authority.</p>
        <p>It is governed indirectly — by the marriage and family law that applies to your marriage, by the maintenance and domestic violence framework, and by the practical reality that anything written will be read later by a Family Court.</p>
      </Section>

      <Section id="what-it-does" title="What a Notice Does and Does Not Do">
        <div className="warning-box" aria-label="What a notice cannot do">
          <p><strong>A divorce notice does not dissolve a marriage, and nothing in it can.</strong> Only a competent court can pass a decree under the applicable law. People occasionally believe that sending a notice, or receiving one and not replying, has legal consequences for the marriage itself. It does not. What a notice does is create a record, open a settlement channel and shape how the dispute is framed from then on.</p>
        </div>
        <DataTable headers={['A notice can', 'A notice cannot']} rows={[
          ['Create the first formal record of the dispute', 'Dissolve the marriage'],
          ['Propose mutual divorce and settlement terms', 'Bind the other side to anything'],
          ['Record a demand for maintenance or stridhan', 'Order payment of either'],
          ['Put your version of events on record', 'Prevent the other side from disputing it'],
          ['Invite mediation, counselling or reconciliation', 'Compel the other side to engage'],
          ['Set up a later petition cleanly', 'Substitute for a petition'],
          ['Demonstrate that settlement was attempted', 'Guarantee a court takes that into account']
        ]} />
      </Section>

      <Section id="before-sending" title="Decide the Objective First">
        <p>The single most useful thing to settle before drafting is what you actually want to happen next. Notices that fail almost always failed here rather than in the wording.</p>
        <DataTable headers={['Objective', 'What the notice should do']} rows={[
          ['Mutual divorce on agreed terms', 'Propose the terms clearly and keep the tone cooperative'],
          ['Reconciliation or counselling', 'Invite discussion, avoid framing it as pre-litigation'],
          ['Maintenance or financial support', 'Set out the financial position and the specific demand'],
          ['Return of stridhan', 'Itemise it; general claims do not enforce'],
          ['Custody or parenting arrangement', 'Propose something workable and child-centred'],
          ['Responding to allegations', 'Place the correct facts on record, calmly'],
          ['Preparing for contested proceedings', 'Record the facts that will support the grounds'],
          ['Protecting position where a case is likely', 'Say less, evidence more, concede nothing']
        ]} />
      </Section>

      <Section id="when-it-helps" title="When a Notice Helps">
        <p>A notice earns its place where it creates a record, opens a settlement or forces a response that months of conversation have not produced.</p>
        <DataTable headers={['Situation', 'What the notice achieves']} rows={[
          ['Communication has broken down entirely', 'Creates a formal channel and a dated record'],
          ['Mutual divorce looks achievable', 'Puts proposed terms on paper to work from'],
          ['Maintenance or support has stopped', 'Records the demand and the financial position'],
          ['Stridhan has not been returned', 'An itemised demand that can later be enforced'],
          ['Custody arrangements are informal and unstable', 'Proposes a workable arrangement in writing'],
          ['Allegations are being made about you', 'Places your version on record before positions harden'],
          ['A spouse has left the matrimonial home', 'Records the date and the circumstances'],
          ['Settlement talks are verbal and drifting', 'Converts them into specific, dated terms'],
          ['A petition is planned', 'Builds the pre-litigation record the court will read'],
          ['The other side is abroad and unresponsive', 'Establishes a service and communication trail'],
          ['Family intermediaries are confusing matters', 'Moves the discussion to a documented footing'],
          ['Reconciliation is still possible', 'Can invite counselling or mediation rather than threaten litigation']
        ]} />
      </Section>

      <Section id="when-not-to" title="When Not to Send One">
        <div className="warning-box" aria-label="Safety and timing">
          <p><strong>Where there is a real risk of violence, safety planning comes before correspondence.</strong> A notice tells the other side that proceedings are coming, and in some situations that warning is exactly what makes things more dangerous or prompts assets or a child to be moved. In those cases urgent protective relief under the Protection of Women from Domestic Violence Act, 2005, or an appropriate court application, should come first.</p>
        </div>
        <DataTable headers={['Situation', 'Why a notice may be the wrong first step']} rows={[
          ['Risk of violence or intimidation', 'Safety and protective orders take priority'],
          ['Risk that assets will be moved', 'Protective or interim relief may be needed first'],
          ['Risk of a child being removed', 'Urgent custody remedies come before correspondence'],
          ['Criminal proceedings are likely', 'A notice may forewarn and allow evidence to be arranged'],
          ['Settlement is already close', 'An aggressive notice can collapse a workable deal'],
          ['Your documents are not in order', 'Evidence review should come first'],
          ['A spouse may leave the jurisdiction', 'Timing and service strategy need planning'],
          ['Several cases are already pending', 'The notice must be consistent with the existing record']
        ]} />
      </Section>

      <Section id="contents" title="What a Strong Notice Contains">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Correct particulars of both spouses', 'Avoids identity and service disputes'],
          ['Date, place and law of the marriage', 'Establishes which statute governs'],
          ['A clear factual chronology', 'The sequence matters more than the narrative'],
          ['Specific incidents, where relevant', 'Supports the grounds or explains the breakdown'],
          ['The relief sought', 'States plainly what is wanted'],
          ['Maintenance or alimony position', 'Records the demand or the proposal'],
          ['Child custody and visitation proposal', 'Shows a workable, welfare-based arrangement'],
          ['Stridhan and property particulars', 'Itemised, not described in general terms'],
          ['Details of pending proceedings', 'Keeps the notice consistent with the record'],
          ['A settlement proposal', 'Opens the route most matters eventually take'],
          ['A reasonable time to respond', 'Sets expectations without posturing'],
          ['Measured, dignified language', 'Reads well to the other side and to a court later']
        ]} />
      </Section>

      <Section id="avoid" title="What Should Never Go In">
        <DataTable headers={['Avoid', 'Because']} rows={[
          ['Allegations you cannot evidence', 'They collapse at the evidence stage and damage credibility'],
          ['Abusive or demeaning language', 'It reads badly to a judge and helps the other side'],
          ['Threats of criminal complaints as leverage', 'It looks like coercion rather than a legal position'],
          ['Admissions of fault', 'They are very hard to walk back later'],
          ['Emotional narration at length', 'It buries the legal points the notice exists to make'],
          ['One-sided settlement terms accepted without review', 'They can lock in an avoidable financial loss'],
          ['Pressure framed around the children', 'Courts decide custody on welfare, and notice this immediately'],
          ['Statements contradicting an existing filing', 'The inconsistency will be used'],
          ['Vague references to past incidents', 'They add nothing and invite dispute']
        ]} />
      </Section>

      <Section id="settlement" title="Settlement Points Worth Covering">
        <p>Where the objective is settlement, the notice should be specific enough that the other side can actually respond to it. Vague goodwill produces vague replies.</p>
        <DataTable headers={['Point', 'Why it should be addressed']} rows={[
          ['Mutual consent divorce', 'Records willingness and the proposed route'],
          ['Permanent alimony', 'Amount, mode and timing, to prevent future dispute'],
          ['Interim maintenance', 'Support until the matter concludes'],
          ['Child custody and visitation', 'A practical arrangement rather than a demand'],
          ['Education and medical expenses', 'Who pays what, and how it is reviewed'],
          ['Stridhan return', 'An itemised schedule with a handover mechanism'],
          ['Property and residence', 'Avoids the most common post-decree dispute'],
          ['Loans and EMIs', 'Prevents default and credit consequences for both'],
          ['Withdrawal of pending cases', 'Aligns all proceedings into one settlement'],
          ['Confidentiality', 'Protects both families’ dignity'],
          ['Non-interference', 'Reduces later harassment allegations'],
          ['Payment schedule and default consequence', 'Makes the settlement enforceable rather than aspirational']
        ]} />
      </Section>

      <Section id="replying" title="Replying to a Notice You Received">
        <p>Receiving a divorce notice is distressing and the instinct is to respond immediately, at length, and in the same register. That instinct causes most of the avoidable damage in these matters.</p>
        <DataTable headers={['Do', 'Do not']} rows={[
          ['Preserve the envelope, courier record and email', 'Discard the packaging or delete the email'],
          ['Read the allegations carefully and list what is disputed', 'Reply the same evening on WhatsApp'],
          ['Gather documents, messages and financial records', 'Delete conversations, which looks like concealment'],
          ['Decide the objective — deny, settle, counter or propose mutual divorce', 'Respond without deciding what you want'],
          ['Reply within the time given, in measured terms', 'Ignore it entirely'],
          ['Take advice before conceding any fact', 'Admit conduct to appear reasonable'],
          ['Keep the reply consistent with any pending case', 'Say something that contradicts your own filing']
        ]} />
        <p>A reply is not a confession and it is not a counter-attack. It is a document that will sit in a Family Court file, and the version that serves you is the one a judge would find measured and credible.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu marriage and divorce', 'Hindu Marriage Act, 1955'],
          ['Civil and interfaith marriage and divorce', 'Special Marriage Act, 1954'],
          ['Christian divorce', 'Indian Divorce Act, 1869'],
          ['Parsi marriage and divorce', 'Parsi Marriage and Divorce Act, 1936'],
          ['Dissolution at the instance of a Muslim wife', 'Dissolution of Muslim Marriages Act, 1939'],
          ['Maintenance of wife, children and parents', 'BNSS, 2023, Section 144'],
          ['Maintenance of a Hindu wife', 'Hindu Adoptions and Maintenance Act, 1956'],
          ['Protection, residence and monetary relief', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Custody and guardianship', 'Guardians and Wards Act, 1890 and the applicable matrimonial law'],
          ['Forum', 'Family Courts Act, 1984'],
          ['Evidence, including digital records', 'Bharatiya Sakshya Adhiniyam, 2023']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Hindu Marriage Act, Section 9', 'Restitution of conjugal rights'],
          ['Hindu Marriage Act, Section 10', 'Judicial separation'],
          ['Hindu Marriage Act, Sections 11 and 12', 'Void and voidable marriages'],
          ['Hindu Marriage Act, Section 13', 'Grounds for contested divorce'],
          ['Hindu Marriage Act, Section 13B', 'Divorce by mutual consent, with two motions'],
          ['Hindu Marriage Act, Section 14', 'Restriction on a petition within the first year, subject to leave'],
          ['Hindu Marriage Act, Section 24', 'Interim maintenance and litigation expenses'],
          ['Hindu Marriage Act, Section 25', 'Permanent alimony and maintenance'],
          ['Hindu Marriage Act, Section 26', 'Custody, maintenance and education of children'],
          ['Hindu Marriage Act, Section 27', 'Property presented at or about the time of marriage'],
          ['Special Marriage Act, Section 27', 'Grounds for divorce'],
          ['Special Marriage Act, Section 28', 'Divorce by mutual consent'],
          ['Special Marriage Act, Sections 36 to 38', 'Alimony, maintenance and custody'],
          ['Family Courts Act, Section 7', 'Jurisdiction over matrimonial and family disputes'],
          ['BNSS, Section 144', 'Maintenance of wives, children and parents'],
          ['PWDVA, Sections 12 and 18 to 22', 'Protection, residence, monetary relief, custody and compensation']
        ]} />
      </Section>

      <Section id="law-selection" title="Which Law Governs Your Marriage">
        <p>This is the first question, and getting it wrong at the notice stage produces a mismatch that is awkward to explain when the petition is eventually filed.</p>
        <DataTable headers={['How the marriage took place', 'Governing statute']} rows={[
          ['Hindu ceremonies between Hindus, Buddhists, Jains or Sikhs', 'Hindu Marriage Act, 1955'],
          ['Registered before a Marriage Officer under the civil route', 'Special Marriage Act, 1954'],
          ['Interfaith marriage without conversion', 'Special Marriage Act, 1954'],
          ['Christian marriage', 'Indian Divorce Act, 1869'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936'],
          ['Muslim marriage, wife seeking dissolution', 'Dissolution of Muslim Marriages Act, 1939'],
          ['Marriage abroad with an Indian connection', 'Depends on the ceremony, registration and residence — needs review']
        ]} />
        <p>For the civil marriage route itself, including the notice period and objections, see <Link href="/solutions/legal/court-marriage">Court Marriage</Link>.</p>
      </Section>

      <Section id="types" title="Types of Notice We Handle">
        <DataTable headers={['Type', 'Purpose']} rows={[
          ['Divorce notice', 'Formal notice of separation, divorce intention or demand'],
          ['Reply to a divorce notice', 'Measured response to allegations and demands'],
          ['Mutual divorce proposal', 'Settlement terms ahead of a joint petition'],
          ['Pre-litigation notice', 'Record of facts before contested proceedings'],
          ['Maintenance notice or reply', 'Demand for, or response on, financial support'],
          ['Stridhan notice', 'Itemised demand for jewellery, gifts and belongings'],
          ['Custody and visitation notice', 'Proposal or response on parenting arrangements'],
          ['Notice where domestic violence is alleged', 'Sensitive handling alongside protective remedies'],
          ['NRI notice', 'Service and jurisdiction planning where a spouse is abroad'],
          ['Settlement or clarification notice', 'Recording agreed terms or correcting earlier correspondence']
        ]} />
      </Section>

      <Section id="stridhan" title="Stridhan and Property">
        <p>Stridhan is the wife&rsquo;s absolute property — gifts and articles given at or around the marriage and afterwards — and it remains hers regardless of who holds it. Recovery claims fail most often not on the law but on the description.</p>
        <DataTable headers={['Do this', 'Instead of this']} rows={[
          ['List each item with description, weight and approximate value', 'Claiming "all jewellery and gifts"'],
          ['Attach purchase bills and receipts where they exist', 'Relying on recollection alone'],
          ['Use marriage photographs and video showing the articles', 'Asserting possession without support'],
          ['Identify who holds what, and where', 'A general demand against the whole family'],
          ['Propose a handover mechanism and date', 'Demanding return without saying how'],
          ['Separate stridhan from jointly acquired property', 'Merging two legally different claims'],
          ['Keep any list acknowledged at the time of marriage', 'Reconstructing the list years later']
        ]} />
      </Section>

      <Section id="maintenance" title="Maintenance and Custody in a Notice">
        <p>These are the two issues that decide how a matrimonial dispute actually feels day to day, and a notice that handles them credibly tends to produce a settlement.</p>
        <DataTable headers={['Issue', 'What strengthens the position']} rows={[
          ['Interim maintenance', 'Income evidence for both sides and a realistic expense statement'],
          ['Permanent alimony', 'A defensible basis, with reference to standard of living and needs'],
          ['Child maintenance', 'School fees, medical costs and actual expenses, documented'],
          ['Litigation expenses', 'Clear statement of the financial disparity'],
          ['Custody proposal', 'An arrangement built around the child’s routine and schooling'],
          ['Visitation', 'Specific days, times and handover arrangements'],
          ['Education and health decisions', 'How they will be made and by whom'],
          ['Relocation', 'Addressed in advance, because it causes most later conflict']
        ]} />
        <p>Where custody is genuinely contested, the welfare of the child governs and a notice that treats the child as leverage tends to do lasting damage to the sender&rsquo;s position.</p>
      </Section>

      <Section id="nri" title="NRI and Overseas Service">
        <DataTable headers={['Issue', 'What needs planning']} rows={[
          ['Spouse resident abroad', 'Correct overseas address and a trackable dispatch route'],
          ['Address not known', 'Tracing, and alternative modes of service'],
          ['Proceedings may be filed abroad', 'Indian jurisdiction and rights reviewed before responding'],
          ['A foreign decree already exists', 'Recognition and enforceability in India'],
          ['Immigration status linked to the marriage', 'Documentation and timing consequences'],
          ['Child outside India', 'Custody, travel consent and return considerations'],
          ['Settlement funds coming from abroad', 'Banking route and documentation'],
          ['Time zones and delay', 'A structured written record rather than scattered calls']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate', 'Proof of marriage and applicable law'],
          ['Marriage photographs and invitation', 'Supporting proof of ceremony'],
          ['Identity and address proof', 'Verification and jurisdiction'],
          ['Current address of the spouse', 'Proper service'],
          ['Details of children', 'Custody and maintenance planning'],
          ['Income proof for both spouses', 'Maintenance and alimony position'],
          ['Bank statements', 'Financial position'],
          ['Property documents', 'Settlement and residence'],
          ['Stridhan list with bills', 'Itemised recovery demand'],
          ['Messages, emails and call records', 'Conduct and chronology'],
          ['Medical records', 'Where health or cruelty is relevant'],
          ['Police or protection complaints', 'Connected proceedings'],
          ['Existing court papers', 'Consistency with the record'],
          ['Any earlier notice or reply', 'Continuity of position']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Confidential consultation', 'Facts, urgency and the objective'],
          ['2', 'Applicable law mapping', 'Which matrimonial statute governs'],
          ['3', 'Document collection', 'Marriage, financial, child and dispute records'],
          ['4', 'Risk review', 'Safety, assets, counter-claims and pending cases'],
          ['5', 'Strategy', 'Settlement, mutual divorce, contested route or reply'],
          ['6', 'Drafting', 'Notice or reply, structured and evidence-aware'],
          ['7', 'Client review', 'Fact correction and approval before dispatch'],
          ['8', 'Dispatch', 'Trackable mode, with proof preserved'],
          ['9', 'Response handling', 'Reply reviewed and next step advised'],
          ['10', 'Onward action', 'Mutual petition, mediation, contested filing or settlement']
        ]} />
      </Section>

      <Section id="notice-vs-petition" title="Notice, Petition and Mutual Divorce">
        <DataTable headers={['Point', 'Divorce notice', 'Divorce petition', 'Mutual consent divorce']} rows={[
          ['Nature', 'Correspondence', 'Court filing', 'Joint court filing'],
          ['Consent', 'One-sided', 'One-sided', 'Both spouses'],
          ['Mandatory', 'Generally no', 'Yes, to obtain a decree', 'Only if that route is chosen'],
          ['Forum', 'Sent to the spouse', 'Family Court or competent court', 'Family Court'],
          ['Outcome', 'Reply, settlement or nothing', 'Decree after trial', 'Decree after the second motion'],
          ['Typical duration', 'Days to weeks', 'Often years', 'Months, subject to the statutory interval'],
          ['Main risk', 'Poor drafting creates admissions', 'Weak pleading damages the case', 'Terms agreed without review']
        ]} />
        <p>Most matters that begin with a notice and end well end in the third column. A notice drafted with that destination in mind is a different document from one drafted to open hostilities.</p>
      </Section>

      <Section id="common-issues" title="Where Notices Go Wrong">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Drafted emotionally', 'Escalation and a weakened legal position', 'Controlled, objective drafting'],
          ['Wrong statute referenced', 'Mismatch with the eventual petition', 'Applicable law mapped first'],
          ['Maintenance demanded without support', 'The claim reads as arbitrary', 'Income and expense documentation'],
          ['Custody ignored', 'Conflict resurfaces later at the worst time', 'Welfare-based proposal included'],
          ['Stridhan described generally', 'Recovery becomes very difficult', 'Item-wise schedule with proof'],
          ['Reply sent casually', 'Admissions that cannot be withdrawn', 'Structured reply drafting'],
          ['NRI address unverified', 'Service disputed later', 'Address verification and dispatch planning'],
          ['Pending cases ignored', 'A contradictory record', 'Consistency review against existing filings'],
          ['Settlement terms left vague', 'A second dispute after the first is settled', 'Specific, enforceable terms'],
          ['No proof of dispatch', 'Service contested', 'Trackable dispatch with records preserved']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Confidential case assessment', 'History, issues and the objective'],
          ['Applicable law review', 'Which matrimonial statute governs the marriage'],
          ['Notice drafting', 'Firm, factual and settlement-aware'],
          ['Reply drafting', 'Responses that preserve your position'],
          ['Settlement proposal', 'Mutual divorce and consent terms'],
          ['Maintenance strategy', 'Interim and permanent support positions'],
          ['Custody planning', 'Welfare-based parenting and visitation terms'],
          ['Stridhan recovery notice', 'Itemised demand with supporting proof'],
          ['Domestic violence-linked review', 'Aligning the notice with protective remedies'],
          ['NRI notice support', 'Overseas service and jurisdiction strategy'],
          ['Evidence review', 'Messages, records, photographs and documents'],
          ['Advocate coordination', 'Advocate-ready brief and chronology'],
          ['Ticket-based tracking', 'Drafting, dispatch, delivery, reply and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A divorce notice is never a routine format. It is the first formal record in a dispute that may run for years, and a Family Court will read it long after the anger that produced it has passed. Every sentence should be written with the eventual file in mind — firm on rights, precise on facts, and open to a settlement that both sides can actually live with.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Matrimonial matters are highly fact-sensitive; which statute applies, what relief is available, how maintenance and custody are approached and what a court will do depend entirely on the individual circumstances. Court decisions referred to here are summarised in general terms and their application to a particular case should be confirmed. Statutory positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides case assessment, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
