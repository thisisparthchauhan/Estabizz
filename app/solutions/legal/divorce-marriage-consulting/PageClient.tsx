'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'which-law', title: 'Which Law Governs Your Marriage' },
  { id: 'which-remedy', title: 'Which Remedy Actually Fits' },
  { id: 'mutual', title: 'Mutual Consent Divorce' },
  { id: 'cooling-off', title: 'The Cooling-Off Period and Its Waiver' },
  { id: 'separation-annulment', title: 'Judicial Separation, Annulment and Nullity' },
  { id: 'one-year-bar', title: 'The First-Year Restriction' },
  { id: 'contested', title: 'When Contested Is the Only Route' },
  { id: 'money', title: 'Maintenance, Alimony and Where Claims Arise' },
  { id: 'children', title: 'Children and Custody' },
  { id: 'settlement', title: 'Settlement Drafting' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'marriage-side', title: 'Marriage Registration and Validity' },
  { id: 'nri', title: 'NRI and Cross-Border Matters' },
  { id: 'protection', title: 'Where Protection Comes First' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How a Consultation Runs' },
  { id: 'timelines', title: 'Realistic Timelines and Cost' },
  { id: 'common-issues', title: 'Where People Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What does divorce and marriage consulting cover?', 'Working out which law governs your marriage, which remedy fits your situation, what each route realistically costs in time and money, and what the documentation needs to look like — before anything is filed.'],
  ['Why does it matter which law applies?', 'Because the grounds, the procedure, the forum and the available relief all differ. A marriage solemnised with Hindu ceremonies, one registered under the civil route and a Christian or Parsi marriage each follow a different statute.'],
  ['What are the main routes out of a marriage?', 'Divorce by mutual consent, contested divorce on statutory grounds, judicial separation, and a decree of nullity where the marriage was void or voidable. They are not interchangeable and they lead to different places.'],
  ['What is mutual consent divorce?', 'A joint petition where both spouses agree to dissolve the marriage and have settled the ancillary issues. It runs on two motions — a first motion where statements are recorded, a statutory interval, and a second motion before the decree.'],
  ['How long is the interval between motions?', 'Section 13B(2) of the Hindu Marriage Act contemplates not less than six months and not more than eighteen months after the first motion. The Special Marriage Act has a comparable structure under Section 28.'],
  ['Can the six-month period be waived?', 'Sometimes. The Supreme Court held in Amardeep Singh v. Harveen Kaur (2017) that the period is directory rather than mandatory, and a court may waive it where the parties have genuinely settled everything, separation has been long, and there is no prospect of reconciliation. It is a guided discretion, so it is requested and reasoned, not assumed.'],
  ['What is judicial separation?', 'A decree that relieves the parties of the obligation to cohabit without dissolving the marriage. Neither party can remarry. It suits people who want legal separation without divorce, often for religious, personal or financial reasons.'],
  ['What is the difference between divorce and annulment?', 'Divorce dissolves a valid marriage. A decree of nullity declares that the marriage was void, or annuls one that was voidable — the legal position being that a valid marriage never came into existence in the way a divorce assumes it did.'],
  ['When is a marriage void or voidable?', 'Broadly, a marriage may be void where a fundamental condition was not met, such as a spouse already being married or the parties being within prohibited degrees. It may be voidable on grounds such as non-consummation, consent obtained by fraud or force, or certain conditions existing at the time of marriage. The grounds are statutory and fact-specific.'],
  ['Can I file for divorce in the first year of marriage?', 'Section 14 of the Hindu Marriage Act restricts a divorce petition within one year of marriage, and leave may be sought in cases of exceptional hardship or exceptional depravity. This catches people out when a marriage breaks down very early.'],
  ['What if my spouse will not agree to divorce?', 'Then the route is contested divorce on one of the statutory grounds, which requires evidence rather than agreement. See our contested divorce page for how that process actually runs.'],
  ['Where can maintenance be claimed?', 'From more than one place, which surprises people. Under the matrimonial statute itself, under Section 144 of the BNSS, and for a Hindu wife under Section 18 of the Hindu Adoptions and Maintenance Act. Proceedings under the domestic violence legislation can also carry monetary relief.'],
  ['Can maintenance be claimed in more than one proceeding at once?', 'Claims can arise in parallel proceedings, though courts take account of what has already been awarded to avoid duplication. The strategy of where to claim is worth thinking through rather than filing everywhere.'],
  ['How is custody decided?', 'By the welfare of the child, which overrides the preferences of either parent. Arrangements that are practical, stable and built around the child’s schooling and routine tend to be the ones that hold.'],
  ['Is a settlement agreement enforceable?', 'A well-drafted settlement recorded in consent terms before the court carries far more weight than a private memorandum. Terms on payment, handover, withdrawal of cases and consequences of default should all be recorded.'],
  ['Do we need to register our marriage?', 'Registration provides proof of marriage and is required in practice for passports, visas, immigration and many financial processes. The route depends on the statute under which the marriage took place.'],
  ['What about interfaith marriage?', 'The civil route under the Special Marriage Act, 1954 is the usual path where neither party converts. It carries its own notice procedure and objection window.'],
  ['My spouse is abroad. Does that change things?', 'Yes, considerably. Jurisdiction, service, the recognition of any foreign decree and enforcement all need to be assessed before filing, because a decree that cannot be recognised where it matters is of limited use.'],
  ['Is a foreign divorce decree valid in India?', 'Not automatically. Recognition depends on the jurisdiction of the foreign court, the grounds, whether both parties participated and whether the decree offends Indian law. This should be assessed rather than assumed.'],
  ['What if there is violence?', 'Safety and protective remedies come first. The Protection of Women from Domestic Violence Act, 2005 provides for protection, residence, monetary relief, custody and compensation orders, and those may need to be pursued before or alongside any matrimonial petition.'],
  ['How long does a divorce take?', 'A mutual consent divorce is usually measured in months, subject to the interval between motions and the court’s list. A contested divorce is commonly measured in years. Anyone giving you a confident figure at the first meeting is guessing.'],
  ['Is mediation worth trying?', 'Often, yes. Family Courts routinely refer matters to mediation, and a matter settled in mediation usually ends faster, cheaper and with less damage to any continuing co-parenting relationship.'],
  ['Should I send a legal notice first?', 'It depends on the objective and the risk. Sometimes a notice opens a settlement, and sometimes it forewarns the other side. See our divorce notice page for when it helps and when it does not.'],
  ['What is the most common mistake?', 'Choosing the route emotionally rather than strategically — filing contested proceedings when the dispute was settleable, or agreeing to a mutual settlement without understanding what was being given up.'],
  ['Can Estabizz appear in court?', 'We handle assessment, route selection, documentation, drafting, settlement terms and advocate coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Family Law' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Divorce and Marriage Consulting' }]}
      title="Divorce and Marriage Consulting"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Divorce and Marriage Consulting"
      sections={sections}
      ctaTitle="Speak With a Family Law Expert"
      ctaDescription="Confidential guidance on which law applies, which remedy fits, and what each route realistically costs before anything is filed."
      quickFacts={[
        { label: 'First question', value: 'Which law applies' },
        { label: 'Second question', value: 'Which remedy fits' },
        { label: 'Mutual divorce interval', value: '6 to 18 months' },
        { label: 'Waiver', value: 'Possible, not automatic' }
      ]}
      relatedArticles={[
        { title: 'Contested Divorce', href: '/solutions/legal/contested-divorce', category: 'Legal', description: 'Grounds, interim maintenance and custody, evidence strategy, NRI matters and Family Court procedure.' },
        { title: 'Divorce Notice', href: '/solutions/legal/divorce-notice', category: 'Legal', description: 'Drafting and replying to a matrimonial notice, settlement terms, stridhan and NRI service.' },
        { title: 'Court Marriage', href: '/solutions/legal/court-marriage', category: 'Legal', description: 'Civil marriage under the Special Marriage Act — eligibility, notice period, objections and the certificate.' }
      ]}
      finalCtaTitle="The Route Decides Almost Everything"
      finalCtaDescription="Mutual consent, contested, judicial separation and nullity lead to very different places, take very different amounts of time and cost very different amounts. Choosing between them is the conversation worth having first."
      heroDescription={<p>Most people arrive at family law having already decided they want a divorce, without knowing which law governs their marriage, which remedy fits their facts, or what each route will actually cost in time. That choice matters more than almost anything that follows: mutual consent and contested proceedings can be separated by years, judicial separation and nullity lead somewhere different again, and a maintenance claim can be brought in more than one forum. Estabizz provides confidential consulting on applicable law, remedy selection, mutual consent and contested strategy, maintenance and custody positioning, settlement drafting, marriage registration and validity, NRI and cross-border questions, and Family Court documentation.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> this is the advice you get before you choose a legal route, rather than after.</p>
        <p>Family law decisions reach further than most legal decisions — children, money, residence, reputation, immigration status and the ability to remarry all move with them. They are also unusually hard to reverse once proceedings start.</p>
        <p>This page is about choosing. For the detail of contested proceedings see <Link href="/solutions/legal/contested-divorce">Contested Divorce</Link>; for the civil marriage procedure see <Link href="/solutions/legal/court-marriage">Court Marriage</Link>; and for pre-litigation correspondence see <Link href="/solutions/legal/divorce-notice">Divorce Notice</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Consulting is not a licence or a filing. It is advisory and documentation support for marriage, separation and divorce matters.</p>
        <p>It is not mandatory. It is worth doing because the two questions that determine everything downstream — which statute governs the marriage, and which remedy the facts support — are cheap to answer at the start and expensive to get wrong.</p>
      </Section>

      <Section id="which-law" title="Which Law Governs Your Marriage">
        <div className="info-box" aria-label="Applicable law">
          <p><strong>There is no single Indian divorce law.</strong> Which statute applies depends on how the marriage was solemnised and, in some cases, the religion of the parties. It determines the grounds available, the procedure, the forum and the relief — so it is always the first question, not a technicality to be settled later.</p>
        </div>
        <DataTable headers={['How the marriage took place', 'Governing statute', 'Mutual consent provision']} rows={[
          ['Hindu ceremonies between Hindus, Buddhists, Jains or Sikhs', 'Hindu Marriage Act, 1955', 'Section 13B'],
          ['Civil marriage before a Marriage Officer', 'Special Marriage Act, 1954', 'Section 28'],
          ['Interfaith marriage without conversion', 'Special Marriage Act, 1954', 'Section 28'],
          ['Christian marriage', 'Indian Divorce Act, 1869', 'Section 10A'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936', 'Section 32B'],
          ['Muslim marriage, wife seeking dissolution', 'Dissolution of Muslim Marriages Act, 1939', 'Section 2 grounds'],
          ['Marriage abroad with an Indian connection', 'Depends on ceremony, registration and residence', 'Requires review']
        ]} />
      </Section>

      <Section id="which-remedy" title="Which Remedy Actually Fits">
        <DataTable headers={['Remedy', 'What it achieves', 'Best where']} rows={[
          ['Divorce by mutual consent', 'Dissolves the marriage by agreement', 'Both spouses agree and the ancillary issues are settleable'],
          ['Contested divorce', 'Dissolves the marriage on proved grounds', 'One spouse will not agree, and evidence supports a ground'],
          ['Judicial separation', 'Relieves the duty to cohabit, marriage subsists', 'Separation is wanted without dissolution'],
          ['Decree of nullity', 'Declares the marriage void, or annuls a voidable one', 'A statutory ground of nullity genuinely exists'],
          ['Restitution of conjugal rights', 'Directs resumption of cohabitation', 'Rarely useful in practice; consider the purpose carefully'],
          ['Maintenance proceedings alone', 'Financial support without dissolution', 'Support is the immediate need'],
          ['Domestic violence proceedings', 'Protection, residence and monetary relief', 'Safety and residence are the priority']
        ]} />
        <p>These are not alternatives to be picked by preference. Each has statutory preconditions, and the honest assessment is whether your facts support the one you want.</p>
      </Section>

      <Section id="mutual" title="Mutual Consent Divorce">
        <p>Where both spouses agree, this is almost always the better route — faster, less expensive, less damaging and far more controllable. The work is front-loaded into agreeing the terms rather than spread across years of litigation.</p>
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Settlement discussion', 'Alimony, custody, stridhan, property and withdrawal of cases agreed'],
          ['Documentation', 'Marriage proof, identity, address, photographs and separation evidence'],
          ['Joint petition', 'Drafted with the settlement terms recorded'],
          ['First motion', 'Statements recorded before the court'],
          ['Statutory interval', 'Six to eighteen months, subject to any waiver'],
          ['Second motion', 'Both parties confirm consent'],
          ['Decree', 'The marriage is dissolved'],
          ['Post-decree steps', 'Payment, handover, custody arrangements and record updates']
        ]} />
        <div className="warning-box" aria-label="Consent must subsist">
          <p><strong>Consent must exist at both motions, not just the first.</strong> Either party can withdraw before the second motion, and that happens often enough to matter. This is why the settlement terms should be properly recorded and why obligations are best structured so that neither side is exposed if the other changes their mind mid-way.</p>
        </div>
      </Section>

      <Section id="cooling-off" title="The Cooling-Off Period and Its Waiver">
        <p>Section 13B(2) of the Hindu Marriage Act contemplates an interval of not less than six months and not more than eighteen months between the two motions. It exists to guard against hasty decisions.</p>
        <div className="info-box" aria-label="Waiver position">
          <p><strong>The period is not invariably mandatory.</strong> In <em>Amardeep Singh v. Harveen Kaur</em> (2017), the Supreme Court held that the six-month period under Section 13B(2) is directory rather than mandatory, and that a court may waive it where the statutory purpose would not be served — typically where the parties have been separated for a long period, every issue including alimony and custody has been genuinely settled, and there is no realistic prospect of reconciliation. It is a guided discretion exercised on the facts, so a waiver is applied for and reasoned, never assumed.</p>
        </div>
        <DataTable headers={['Factor', 'Relevance to a waiver request']} rows={[
          ['Length of separation', 'A substantial period living apart supports the request'],
          ['Prior proceedings', 'Long-running litigation indicates the marriage is beyond repair'],
          ['Settlement of all issues', 'Alimony, custody and property genuinely resolved'],
          ['Mediation attempted', 'Shows reconciliation was explored'],
          ['No prospect of reconciliation', 'The central consideration'],
          ['Continued delay causing hardship', 'Prolonging the agony serves no purpose'],
          ['Free and informed consent', 'The court must be satisfied there is no pressure']
        ]} />
      </Section>

      <Section id="separation-annulment" title="Judicial Separation, Annulment and Nullity">
        <p>These are regularly confused with divorce and with each other, and the differences are substantive rather than terminological.</p>
        <DataTable headers={['Point', 'Divorce', 'Judicial separation', 'Nullity']} rows={[
          ['Effect on the marriage', 'Dissolved', 'Subsists, cohabitation duty relieved', 'Declared void, or annulled'],
          ['Can the parties remarry', 'Yes, once the decree is final', 'No', 'Yes, once the decree is passed'],
          ['Typical basis', 'Statutory grounds, or mutual consent', 'Grounds similar to divorce grounds', 'Statutory grounds of nullity'],
          ['Common use', 'Ending the marriage', 'Separation without dissolution', 'The marriage was legally defective'],
          ['Reconciliation', 'Requires remarriage', 'Parties may resume cohabitation', 'Not applicable'],
          ['Maintenance', 'Available', 'Available', 'May be available depending on facts']
        ]} />
        <p>Nullity in particular is often requested where it is not available. It requires a statutory ground going to the validity of the marriage itself, not simply a short or unhappy one.</p>
      </Section>

      <Section id="one-year-bar" title="The First-Year Restriction">
        <div className="warning-box" aria-label="One year bar">
          <p><strong>A marriage that breaks down within months runs into a statutory restriction that surprises almost everyone.</strong> Section 14 of the Hindu Marriage Act restricts the presentation of a divorce petition within one year of the marriage. Leave may be sought on the ground of exceptional hardship to the petitioner or exceptional depravity on the part of the respondent, but it is an application to be made and supported, not a formality. Where the year is nearly up, the sensible course is often to prepare properly and file once the restriction lifts.</p>
        </div>
      </Section>

      <Section id="contested" title="When Contested Is the Only Route">
        <p>Where one spouse will not agree, the route is contested proceedings on a statutory ground, proved by evidence. That is a fundamentally different exercise from a mutual petition and should be entered with clear eyes.</p>
        <DataTable headers={['Consideration', 'What to weigh']} rows={[
          ['Is a statutory ground available', 'Grounds are defined; general unhappiness is not one'],
          ['Is there evidence', 'The ground must be proved, not asserted'],
          ['Realistic duration', 'Commonly years, not months'],
          ['Cost across the whole route', 'Trial, interim applications and any appeal'],
          ['Interim position', 'Maintenance, residence and custody while it runs'],
          ['Effect on children', 'Prolonged litigation has its own cost'],
          ['Prospect of settlement later', 'Many contested matters settle eventually anyway'],
          ['Counter-proceedings', 'Expect parallel maintenance or protection claims']
        ]} />
        <p>The full process is covered on the <Link href="/solutions/legal/contested-divorce">Contested Divorce</Link> page.</p>
      </Section>

      <Section id="money" title="Maintenance, Alimony and Where Claims Arise">
        <p>Maintenance is not a single remedy in a single forum, which is why people are often told inconsistent things about it.</p>
        <DataTable headers={['Source', 'Provision', 'Nature']} rows={[
          ['Matrimonial statute, interim', 'Hindu Marriage Act Section 24, and equivalents', 'Support and litigation expenses during proceedings'],
          ['Matrimonial statute, permanent', 'Hindu Marriage Act Section 25, and equivalents', 'Permanent alimony at or after the decree'],
          ['Criminal procedure route', 'BNSS Section 144', 'Maintenance of wife, children and parents'],
          ['Hindu personal law', 'Hindu Adoptions and Maintenance Act Section 18', 'Maintenance of a Hindu wife'],
          ['Domestic violence proceedings', 'PWDVA Sections 20 and 22', 'Monetary relief and compensation'],
          ['Special Marriage Act', 'Sections 36 and 37', 'Alimony pendente lite and permanent alimony']
        ]} />
        <p>Claims can arise in parallel, and courts take account of what has already been awarded so that relief is not duplicated. Where to claim, and in what order, is a strategic question worth deciding rather than filing everywhere at once.</p>
      </Section>

      <Section id="children" title="Children and Custody">
        <p>Custody is decided on the welfare of the child. That principle overrides the preferences, and often the perceived entitlements, of both parents.</p>
        <DataTable headers={['Factor', 'How it is approached']} rows={[
          ['Welfare of the child', 'The paramount consideration in every custody decision'],
          ['Stability and routine', 'Schooling, home and continuity carry real weight'],
          ['Age and needs of the child', 'Relevant to the arrangement that will work'],
          ['Child’s preference', 'Considered where the child is of sufficient maturity'],
          ['Capacity of each parent', 'Practical ability to care, not only financial capacity'],
          ['Access for the other parent', 'Generally protected, absent good reason'],
          ['Relocation', 'Needs to be addressed expressly, or it causes later conflict'],
          ['Education and medical decisions', 'Best allocated clearly in the settlement']
        ]} />
      </Section>

      <Section id="settlement" title="Settlement Drafting">
        <p>Most matrimonial disputes end in a settlement. Whether that settlement holds depends almost entirely on how specifically it was written.</p>
        <DataTable headers={['Term', 'What it should specify']} rows={[
          ['Alimony', 'Amount, mode, timing and whether it is one-time or periodic'],
          ['Child maintenance', 'Amount, escalation and what it covers'],
          ['Custody and visitation', 'Specific days, times, holidays and handover arrangements'],
          ['Stridhan', 'An itemised schedule and a handover date'],
          ['Property and residence', 'Who holds what, and when possession changes'],
          ['Loans and liabilities', 'Who services what, to protect both credit positions'],
          ['Withdrawal of proceedings', 'Which cases end, and in what sequence'],
          ['Confidentiality and non-interference', 'Protects both parties afterwards'],
          ['Default consequences', 'What happens if payment or handover fails'],
          ['Recording before the court', 'Consent terms carry far more weight than a private memorandum']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu marriage and divorce', 'Hindu Marriage Act, 1955'],
          ['Civil and interfaith marriage', 'Special Marriage Act, 1954'],
          ['Christian divorce', 'Indian Divorce Act, 1869'],
          ['Parsi marriage and divorce', 'Parsi Marriage and Divorce Act, 1936'],
          ['Dissolution at a Muslim wife’s instance', 'Dissolution of Muslim Marriages Act, 1939'],
          ['Maintenance of a Hindu wife', 'Hindu Adoptions and Maintenance Act, 1956'],
          ['Maintenance generally', 'BNSS, 2023, Section 144'],
          ['Domestic violence relief', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Custody and guardianship', 'Guardians and Wards Act, 1890 and the applicable matrimonial law'],
          ['Forum', 'Family Courts Act, 1984'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Marriage registration', 'The applicable marriage statute and State registration rules']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Hindu Marriage Act, Sections 5, 7 and 8', 'Conditions, ceremonies and registration'],
          ['Hindu Marriage Act, Section 9', 'Restitution of conjugal rights'],
          ['Hindu Marriage Act, Section 10', 'Judicial separation'],
          ['Hindu Marriage Act, Sections 11 and 12', 'Void and voidable marriages'],
          ['Hindu Marriage Act, Section 13', 'Grounds for divorce'],
          ['Hindu Marriage Act, Section 13B', 'Divorce by mutual consent and the two motions'],
          ['Hindu Marriage Act, Section 14', 'Restriction on a petition within the first year'],
          ['Hindu Marriage Act, Sections 24 and 25', 'Interim maintenance, expenses and permanent alimony'],
          ['Hindu Marriage Act, Section 26', 'Custody, maintenance and education of children'],
          ['Hindu Marriage Act, Section 27', 'Property presented at or about the time of marriage'],
          ['Special Marriage Act, Sections 4 to 13', 'Civil marriage procedure'],
          ['Special Marriage Act, Sections 27 and 28', 'Divorce and divorce by mutual consent'],
          ['Special Marriage Act, Sections 36 to 38', 'Alimony, maintenance and custody'],
          ['Family Courts Act, Section 7', 'Jurisdiction over matrimonial and family disputes'],
          ['BNSS, Section 144', 'Maintenance of wives, children and parents'],
          ['PWDVA, Sections 12 and 18 to 22', 'Protection, residence, monetary relief, custody and compensation'],
          ['Hindu Adoptions and Maintenance Act, Section 18', 'Maintenance of a Hindu wife']
        ]} />
      </Section>

      <Section id="marriage-side" title="Marriage Registration and Validity">
        <p>The marriage side of this work is usually about proof and documentation rather than disputes — until something depends on it.</p>
        <DataTable headers={['Situation', 'What is needed']} rows={[
          ['Marriage already solemnised', 'Registration under the applicable statute and a certificate'],
          ['Interfaith couple', 'The civil route under the Special Marriage Act'],
          ['Certificate needed for a visa or passport', 'Registration, and often attestation or apostille'],
          ['Name mismatch across documents', 'Affidavit and corrective documentation'],
          ['Second marriage planned', 'Divorce decree or death certificate verified first'],
          ['Foreign national spouse', 'Passport, visa status and no-objection documentation'],
          ['Doubt about validity', 'Review of ceremony, conditions and applicable statute'],
          ['Marriage solemnised abroad', 'Recognition and registration position in India']
        ]} />
        <p>Where the marriage has not yet taken place and the civil route is the one wanted, the procedure including the notice period and objection window is covered on the <Link href="/solutions/legal/court-marriage">Court Marriage</Link> page.</p>
      </Section>

      <Section id="nri" title="NRI and Cross-Border Matters">
        <DataTable headers={['Issue', 'What needs deciding early']} rows={[
          ['Which country should hear the matter', 'Jurisdiction, convenience and enforceability'],
          ['Service on a spouse abroad', 'Route and proof, since service is routinely contested'],
          ['A foreign decree already obtained', 'Whether it will be recognised in India'],
          ['Parallel proceedings in two countries', 'Risk of inconsistent orders'],
          ['Maintenance across borders', 'Whether an order can actually be enforced'],
          ['Child in another country', 'Custody, travel consent and return issues'],
          ['Immigration status tied to the marriage', 'Timing consequences of a decree'],
          ['Assets in more than one jurisdiction', 'How settlement terms will be given effect']
        ]} />
        <p>A decree that cannot be recognised or enforced where the assets or the children are is of limited practical value, so this is worth resolving before filing rather than after.</p>
      </Section>

      <Section id="protection" title="Where Protection Comes First">
        <div className="warning-box" aria-label="Safety first">
          <p><strong>Where there is violence, threat or a risk that a child will be removed, safety comes before strategy.</strong> The Protection of Women from Domestic Violence Act, 2005 provides for protection orders, residence orders, monetary relief, custody orders and compensation, and those remedies can be pursued urgently and independently of any divorce petition. Sequencing matters here: correspondence that forewarns the other side can make the situation worse.</p>
        </div>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate or proof of solemnisation', 'Establishes the applicable statute'],
          ['Marriage photographs and invitation', 'Supporting proof of ceremony'],
          ['Identity and address proof of both spouses', 'Filing and jurisdiction'],
          ['Evidence of separation', 'Relevant to mutual consent and to waiver requests'],
          ['Details and documents of children', 'Custody and maintenance'],
          ['Income proof for both spouses', 'Maintenance and alimony'],
          ['Bank statements and financial records', 'Financial position and settlement'],
          ['Property documents', 'Settlement and residence'],
          ['Stridhan list with supporting bills', 'Recovery and settlement'],
          ['Messages, emails and correspondence', 'Conduct and chronology'],
          ['Medical records', 'Where health, cruelty or capacity is relevant'],
          ['Existing court papers and orders', 'Consistency across proceedings'],
          ['Any notice already exchanged', 'Continuity of position'],
          ['Passport and visa documents', 'NRI and cross-border matters']
        ]} />
      </Section>

      <Section id="process" title="How a Consultation Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Confidential consultation', 'History, objective and immediate risks'],
          ['2', 'Applicable law identification', 'Which statute governs the marriage'],
          ['3', 'Remedy assessment', 'Mutual consent, contested, separation or nullity'],
          ['4', 'Document review', 'What exists and what is missing'],
          ['5', 'Financial and custody positioning', 'Realistic expectations on both'],
          ['6', 'Risk review', 'Safety, counter-claims, assets and pending cases'],
          ['7', 'Route recommendation', 'With timeline and cost expectations stated plainly'],
          ['8', 'Documentation', 'Petition inputs, settlement terms or notice'],
          ['9', 'Advocate coordination', 'Brief, chronology and filing support'],
          ['10', 'Tracking', 'Stage-wise updates through to decree and afterwards']
        ]} />
      </Section>

      <Section id="timelines" title="Realistic Timelines and Cost">
        <p>Nobody can give a reliable timeline at a first meeting, but the ranges differ enough between routes that they should inform the choice.</p>
        <DataTable headers={['Route', 'What drives the timeline']} rows={[
          ['Mutual consent divorce', 'The statutory interval, any waiver, and the court’s list'],
          ['Mutual consent with a waiver granted', 'Considerably shorter, but the waiver is discretionary'],
          ['Contested divorce', 'Evidence, witnesses, adjournments and pendency — commonly years'],
          ['Contested matter that settles later', 'Often ends in a mutual petition after considerable cost'],
          ['Judicial separation', 'Similar to a contested matter where it is opposed'],
          ['Nullity', 'Depends on the ground and the evidence required'],
          ['Maintenance proceedings', 'Interim relief can come relatively early'],
          ['Appeals', 'Add substantially to any of the above']
        ]} />
        <div className="info-box" aria-label="Honest expectation">
          <p><strong>The most useful thing a first consultation produces is usually a realistic expectation.</strong> A contested divorce pursued to judgment frequently costs more, in time and money, than the issue being fought over — and a meaningful proportion of contested matters settle eventually in any event. That is worth knowing at the start rather than three years in.</p>
        </div>
      </Section>

      <Section id="common-issues" title="Where People Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Choosing the route emotionally', 'Years spent on a settleable dispute', 'Objective remedy assessment at the outset'],
          ['Wrong statute assumed', 'Petition filed under the wrong law', 'Applicable law identified from the ceremony and records'],
          ['Filing within the first year unaware of Section 14', 'Petition met with a preliminary objection', 'Restriction checked and leave addressed'],
          ['Assuming the cooling-off period is automatic either way', 'Either a needless wait, or an unreasoned waiver request', 'Waiver assessed and properly supported'],
          ['Agreeing settlement terms without review', 'An avoidable and permanent financial loss', 'Terms reviewed before consent is given'],
          ['Vague settlement drafting', 'A second dispute after the first is settled', 'Specific, enforceable consent terms'],
          ['Claiming maintenance everywhere at once', 'Cost and complexity without added benefit', 'Forum strategy decided deliberately'],
          ['Treating custody as leverage', 'Damages credibility, because welfare governs', 'Child-centred proposals'],
          ['Ignoring the cross-border position', 'A decree that cannot be enforced where it matters', 'Jurisdiction and recognition assessed first'],
          ['Correspondence before safety planning', 'Escalation where there is a genuine risk', 'Protective remedies sequenced first']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Confidential consultation', 'History, objective, risks and realistic options'],
          ['Applicable law mapping', 'Identifying the governing statute'],
          ['Remedy selection', 'Mutual consent, contested, separation or nullity'],
          ['Mutual divorce support', 'Joint petition inputs and the two-motion process'],
          ['Cooling-off waiver assessment', 'Whether the facts support a request, and how to frame it'],
          ['Contested divorce preparation', 'Grounds, evidence and Family Court strategy'],
          ['Maintenance and alimony strategy', 'Which forum, what basis, what to expect'],
          ['Custody planning', 'Welfare-based arrangements and visitation terms'],
          ['Settlement drafting', 'Consent terms, schedules and default provisions'],
          ['Notice and reply support', 'Pre-litigation correspondence'],
          ['Marriage registration support', 'Certificate, documentation and corrections'],
          ['NRI and cross-border review', 'Jurisdiction, service, recognition and enforcement'],
          ['Domestic violence support', 'Protection, residence and monetary relief coordination'],
          ['Mediation preparation', 'Structured negotiation and settlement readiness'],
          ['Advocate coordination', 'Brief, chronology and filing support'],
          ['Ticket-based tracking', 'Stage-wise updates to decree and beyond']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The most valuable hour in a family law matter is the first one, and it is spent on two questions: which law governs this marriage, and which remedy do these facts actually support. Answer those honestly and most of what follows becomes manageable. Skip them and people spend years litigating a dispute that a properly drafted settlement would have closed in months.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Family law is highly fact-sensitive; which statute applies, which remedy is available, what maintenance or custody outcome is likely and how long a matter will take all depend on the individual circumstances and the view a court takes of them. Court decisions referred to here are summarised in general terms and their application to a particular case should be confirmed. Statutory positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides assessment, documentation, drafting and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
