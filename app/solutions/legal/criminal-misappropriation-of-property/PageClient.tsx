'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'section-314', title: 'BNS Section 314' },
  { id: 'classification', title: 'Classification and What It Means' },
  { id: 'ingredients', title: 'Ingredients to Establish' },
  { id: 'distinctions', title: 'Distinguishing the Neighbouring Offences' },
  { id: 'civil-criminal', title: 'The Civil and Criminal Line' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'types', title: 'Matters We Handle' },
  { id: 'when', title: 'When to Act' },
  { id: 'route', title: 'Police or Magistrate' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'evidence', title: 'Evidence and the Demand Record' },
  { id: 'defence', title: 'Defence Against Allegations' },
  { id: 'settlement', title: 'Settlement and Recovery' },
  { id: 'common-issues', title: 'Why Complaints Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is criminal misappropriation of property?', 'Dishonestly misappropriating or converting to your own use any movable property that came into your possession lawfully or innocently. The wrong lies in what was done with the property afterwards, not in how it was obtained.'],
  ['Which provision applies?', 'BNS Section 314 is the main provision. Section 315 covers property possessed by a deceased person at the time of death.'],
  ['What is the punishment under Section 314?', 'Imprisonment of either description for a term not less than six months and up to two years, and with fine.'],
  ['Has the punishment changed from the old law?', 'Yes, and significantly. The predecessor provision, IPC Section 403, carried imprisonment up to two years or fine or both, with no minimum. BNS Section 314 introduces a mandatory minimum of six months and makes fine compulsory rather than alternative.'],
  ['Is the offence cognizable?', 'No. Under the BNSS First Schedule, BNS Section 314 is non-cognizable and bailable, and triable by any Magistrate.'],
  ['What does non-cognizable mean in practice?', 'The police cannot register an FIR and begin investigation on their own for that offence alone. Information is recorded under BNSS Section 174 and investigation generally requires a Magistrate’s order, which is why the complaint route under BNSS Section 223 often matters more here than the police station does.'],
  ['So can the police ever register an FIR?', 'Where the facts also disclose a cognizable offence — criminal breach of trust, cheating or forgery, for example — the position changes and the cognizable offence governs registration. Which provisions the facts genuinely support is therefore the first question, not an afterthought.'],
  ['Does bailable mean the accused cannot be arrested?', 'It means bail is a matter of right rather than discretion once the person is before the appropriate authority. It does not mean nothing can happen; it means the liberty consequences are limited for this offence taken alone.'],
  ['What must be proved?', 'That the property was movable, that the accused had possession or control of it, that there was dishonest intention, and that the property was misappropriated or converted to the accused’s own use. The complainant also needs to show a right over the property.'],
  ['What is the difference from criminal breach of trust?', 'Breach of trust under Section 316 requires entrustment — property given to the accused in a defined capacity, with an obligation attached. Misappropriation under Section 314 does not require entrustment; possession is enough.'],
  ['What is the difference from cheating?', 'Cheating under Section 318 involves deception operating from the outset, which induces the delivery of property. In misappropriation, possession is obtained innocently and the dishonesty appears later.'],
  ['What is the difference from theft?', 'Theft involves taking property out of someone’s possession without consent. In misappropriation, the property is already in the accused’s possession before the dishonesty begins.'],
  ['Can money be misappropriated?', 'Yes, where money received for a specific purpose is dishonestly diverted to personal use. The bank trail and the evidence of the agreed purpose usually carry the case.'],
  ['Can company assets be involved?', 'Yes. Laptops, vehicles, cash, stock, machinery, tools and records can all be the subject of misappropriation where an employee or associate dishonestly retains or converts them.'],
  ['Does finding lost property count?', 'It can. Where someone finds property, knows or can discover who owns it, and appropriates it to their own use instead of taking reasonable steps to find the owner, the provision can be attracted.'],
  ['Can family property disputes become criminal?', 'Sometimes, where movable property is dishonestly converted and the ingredients genuinely exist. Many family matters are really title or succession disputes with civil remedies, and criminal proceedings brought as leverage tend to be seen for what they are.'],
  ['Do I need to send a legal notice first?', 'It is not a legal precondition, but it is usually wise. A written demand and the response to it create the clearest available record of retention and refusal, which is often the difference between a complaint that proceeds and one that reads like a payment dispute.'],
  ['What if the police refuse to act?', 'For a non-cognizable offence that is the expected position rather than a failure. The route is a complaint to the Magistrate under BNSS Section 223, with examination of the complainant and issue of process under Sections 225 and 227 where a case is made out.'],
  ['Is digital evidence useful?', 'Very. WhatsApp messages, emails, ERP and access logs and accounting entries frequently contain the admission, the demand or the refusal. Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam govern how electronic records are proved, so preservation matters.'],
  ['Can the matter be settled?', 'Yes, and often it should be. Settlement can involve return of the property, structured repayment, a written undertaking or consent terms. Document it properly, because an undocumented settlement simply relocates the dispute.'],
  ['Can a false allegation be defended?', 'Yes. The usual defences are ownership or a bona fide claim of right, absence of possession, return of the property, lack of dishonest intention, or that the matter is contractual and belongs in a civil court.'],
  ['What is a quashing petition?', 'An application to the High Court to terminate proceedings that are an abuse of process — commonly where a purely civil dispute has been dressed up as a criminal case. It is a remedy worth assessing early where that is genuinely what has happened.'],
  ['What is the limitation position?', 'Limitation for taking cognizance depends on the punishment prescribed, and delay must be explained. Practically, the evidence problem arrives first: records, messages and witness recollection all degrade well before any legal bar operates.'],
  ['What is the biggest mistake in these matters?', 'Filing a vague complaint that establishes a debt but never establishes ownership, possession, dishonest conversion or a demand that was refused. It gets treated as a civil recovery matter, which is usually exactly what it is.'],
  ['Can Estabizz act for both sides?', 'We assist complainants and defendants in separate matters — never both sides of the same dispute. That includes complaint strategy, defence replies, evidence review, settlement documentation and advocate coordination.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Criminal Misappropriation of Property' }]}
      title="Criminal Misappropriation of Property"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Criminal Misappropriation of Property"
      sections={sections}
      ctaTitle="Speak With a Criminal Law Expert"
      ctaDescription="Assess whether the facts support a criminal complaint or a civil recovery, and build the evidence file either way."
      quickFacts={[
        { label: 'Main provision', value: 'BNS Section 314' },
        { label: 'Punishment', value: '6 months to 2 years, and fine' },
        { label: 'Classification', value: 'Non-cognizable, bailable' },
        { label: 'Usual route', value: 'Magistrate complaint' }
      ]}
      relatedArticles={[
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' },
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice and complaint deadlines, director liability and interim compensation.' },
        { title: 'Bail Application', href: '/solutions/legal/bail-application', category: 'Legal', description: 'Regular, anticipatory, interim and default bail under the BNSS framework.' }
      ]}
      finalCtaTitle="Establish the Ingredients Before You File"
      finalCtaDescription="Ownership, possession, dishonest conversion and a refused demand. A complaint that proves all four proceeds; one that proves only that money is owed becomes a civil suit with extra steps."
      heroDescription={<p>When someone who lawfully holds your property dishonestly sells it, diverts it, uses it as their own or simply refuses to return it, the matter can cross from a private dispute into criminal territory. The line is narrower than most people assume, and it is drawn by evidence rather than by grievance. Estabizz assists individuals, businesses, directors, employers, lenders and families with case assessment under BNS Section 314 and its neighbouring provisions, legal notice and demand records, complaint drafting, evidence and digital record review, Magistrate complaint strategy, settlement documentation, defence against false or exaggerated allegations, and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> criminal misappropriation happens when property comes into someone&rsquo;s hands honestly, and they then dishonestly treat it as their own.</p>
        <p>An employee keeps the company laptop after resigning. Goods sent for storage are quietly sold. Money collected for a specific payment is used for something else. Property belonging to a deceased relative is taken before the estate is distributed. In each case the initial possession was not wrongful — what changed is what the holder decided to do with it.</p>
        <p>That structure is what makes these matters difficult. Because possession began lawfully, the dispute looks civil on its face, and the criminal element has to be demonstrated rather than asserted.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Criminal misappropriation of property is not a licence or a registration. It is a criminal offence concerning the dishonest conversion of movable property.</p>
        <p>The offence provision is BNS Section 314, procedure is governed by the BNSS, and documents and electronic records are assessed under the BSA. Not every property dispute belongs here — but where dishonest conversion of movable property can actually be shown, timely action matters, because the evidence degrades quickly.</p>
      </Section>

      <Section id="section-314" title="BNS Section 314">
        <p>Section 314 of the Bharatiya Nyaya Sanhita, 2023 provides that whoever dishonestly misappropriates or converts to his own use any movable property shall be punished with imprisonment of either description for a term which shall not be less than six months but which may extend to two years, and with fine.</p>
        <div className="info-box" aria-label="Change from the previous law">
          <p><strong>This is a materially heavier provision than the one it replaced.</strong> IPC Section 403 prescribed imprisonment up to two years, <em>or</em> fine, <em>or</em> both, with no minimum sentence — a court could dispose of a matter with a fine alone. BNS Section 314 introduces a mandatory minimum of six months&rsquo; imprisonment and makes the fine compulsory rather than alternative. Anyone assessing exposure from pre-2024 experience of Section 403 is working from the wrong baseline.</p>
        </div>
        <p>Section 315 deals with the related situation of dishonest misappropriation of property that was in the possession of a deceased person at the time of death, which commonly arises in estate and succession disputes.</p>
      </Section>

      <Section id="classification" title="Classification and What It Means">
        <DataTable headers={['Attribute', 'Position for BNS Section 314']} rows={[
          ['Cognizability', 'Non-cognizable'],
          ['Bail', 'Bailable'],
          ['Triable by', 'Any Magistrate'],
          ['Punishment', 'Not less than six months, up to two years, and fine']
        ]} />
        <div className="warning-box" aria-label="Procedural consequence">
          <p><strong>The non-cognizable classification is the single most consequential fact on this page, and the one most complainants discover too late.</strong> For this offence standing alone, the police cannot register an FIR and investigate on their own initiative. Information is recorded under BNSS Section 174, and investigation generally requires a Magistrate&rsquo;s order. The practical route is therefore a complaint to the Magistrate under BNSS Section 223 — not a wait at the police station for an FIR that is not going to be registered.</p>
        </div>
        <p>Where the facts also genuinely disclose a cognizable offence — criminal breach of trust, cheating or forgery — the registration position changes and the cognizable provision governs. That is a reason to map the provisions honestly at the outset, and not a licence to inflate a complaint with sections the facts do not support. Inflated complaints tend to unravel at exactly the stage they were meant to help.</p>
      </Section>

      <Section id="ingredients" title="Ingredients to Establish">
        <DataTable headers={['Ingredient', 'What it requires']} rows={[
          ['Movable property', 'Section 314 applies to movable property; immovable property falls outside it'],
          ['Possession with the accused', 'The property was in the accused’s possession or control'],
          ['Innocent or lawful origin of possession', 'Possession was not itself wrongful — otherwise the offence is theft or cheating'],
          ['Dishonest intention', 'Intention to cause wrongful gain to one person or wrongful loss to another'],
          ['Misappropriation or conversion', 'The property was used, sold, retained or diverted as the accused’s own'],
          ['Right of the complainant', 'Ownership or a lawful entitlement to the property'],
          ['Demand and refusal', 'Not a statutory ingredient, but usually the clearest available proof of dishonest retention'],
          ['Absence of lawful justification', 'No bona fide claim of right or legitimate basis for the retention']
        ]} />
        <p>Dishonest intention is where these cases are won and lost. It is rarely proved by direct evidence and almost always inferred from conduct — a sale without authority, an unexplained denial of possession, an inconsistent account of where the property went, or silence in the face of a written demand.</p>
      </Section>

      <Section id="distinctions" title="Distinguishing the Neighbouring Offences">
        <p>Misappropriation sits inside a cluster of property offences that overlap on the facts and diverge sharply in their ingredients. Choosing the wrong one weakens an otherwise sound complaint.</p>
        <DataTable headers={['Offence', 'Distinguishing feature', 'Provision']} rows={[
          ['Criminal misappropriation', 'Possession obtained innocently; dishonesty arises afterwards', 'BNS Section 314'],
          ['Misappropriation of a deceased person’s property', 'Property was possessed by the deceased at the time of death', 'BNS Section 315'],
          ['Criminal breach of trust', 'Property was entrusted in a defined capacity, and that trust was violated', 'BNS Section 316'],
          ['Stolen property', 'Property is received or retained knowing it was stolen or misappropriated', 'BNS Section 317'],
          ['Cheating', 'Deception operated from the outset and induced delivery', 'BNS Section 318'],
          ['Theft', 'Property was taken out of possession without consent', 'BNS theft provisions'],
          ['Civil recovery', 'A debt or contractual dispute with no demonstrable dishonest conversion', 'Civil suit']
        ]} />
        <p>The distinction between misappropriation and breach of trust is the one that matters most in commercial matters. Entrustment carries an obligation about how the property is to be dealt with; mere possession does not. Where goods were handed over under a defined arrangement — for storage, for sale on account, for a specific payment — Section 316 is frequently the better fit.</p>
      </Section>

      <Section id="civil-criminal" title="The Civil and Criminal Line">
        <p>This deserves candour, because it determines the outcome more often than anything else. Courts are alert to criminal proceedings being used as recovery pressure, and a complaint that discloses only a contractual default is liable to be treated as a civil matter — sometimes with adverse observations.</p>
        <DataTable headers={['Situation', 'Realistic assessment']} rows={[
          ['Payment default under a contract', 'Civil recovery; criminal proceedings are unlikely to be sustained'],
          ['Goods supplied, invoice unpaid', 'Civil recovery, or the cheque dishonour route where a cheque was given'],
          ['Property handed over for a stated purpose and diverted', 'Misappropriation or breach of trust may be examined'],
          ['Deception present from the beginning', 'The cheating angle should be assessed'],
          ['Employee retains company assets after exit', 'Notice and complaint are commonly available, with documentation'],
          ['Accounting or quantum dispute between partners', 'Usually civil, unless diversion of specific assets can be shown'],
          ['Family property retained after a death', 'Title and succession are civil; Section 315 depends on the ingredients'],
          ['Dispute over ownership itself', 'A bona fide claim of right generally negates dishonest intention']
        ]} />
        <p>Where the honest answer is civil, the civil route is usually also the faster one to actual recovery. See <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link> for the civil process, and <Link href="/solutions/legal/cheque-bounce-in-india">Cheque Bounce in India</Link> where a dishonoured cheque is involved.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Offence law', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Main provision', 'BNS Section 314 — dishonest misappropriation of property'],
          ['Related provision', 'BNS Section 315 — property possessed by a deceased person'],
          ['Connected provisions', 'BNS Sections 316, 317 and 318 — breach of trust, stolen property and cheating'],
          ['Procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Electronic records', 'BSA Sections 61, 62 and 63'],
          ['Classification of offences', 'BNSS First Schedule'],
          ['Forum', 'Magistrate Court, with the High Court for quashing and revisional remedies']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['BNS Section 314', 'The main offence — dishonest misappropriation or conversion of movable property'],
          ['BNS Section 315', 'Misappropriation of property possessed by a deceased person at the time of death'],
          ['BNS Section 316', 'Criminal breach of trust, where entrustment and dishonest use are involved'],
          ['BNS Section 317', 'Stolen property, including property criminally misappropriated'],
          ['BNS Section 318', 'Cheating, where deception induced delivery or retention'],
          ['BNSS Section 173', 'Information relating to a cognizable offence, where the facts disclose one'],
          ['BNSS Section 174', 'Procedure on information in non-cognizable cases'],
          ['BNSS Section 175', 'Police investigation powers in cognizable cases'],
          ['BNSS Section 223', 'Examination of the complainant in a complaint case'],
          ['BNSS Section 225', 'Postponement of issue of process and preliminary inquiry'],
          ['BNSS Section 227', 'Issue of process where a case is made out'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic and digital records'],
          ['BNSS First Schedule', 'Classification — cognizable or not, bailable or not, and the trial court']
        ]} />
      </Section>

      <Section id="types" title="Matters We Handle">
        <DataTable headers={['Type', 'Typical example']} rows={[
          ['Business asset misappropriation', 'An employee or associate retains a laptop, vehicle, stock, cash or equipment'],
          ['Goods misappropriation', 'Goods delivered for one purpose are sold or diverted'],
          ['Money misappropriation', 'An amount received for a specific payment is converted to personal use'],
          ['Family and estate property', 'Movable property of a deceased person retained before lawful distribution'],
          ['Partnership disputes', 'A partner diverts assets, cash or inventory'],
          ['Warehouse and logistics', 'Stored or transported goods go missing or are diverted'],
          ['Collected funds misuse', 'Money collected for a defined transaction used elsewhere'],
          ['Client funds diversion', 'Funds received for payment, deposit or a project diverted'],
          ['Defence against false allegations', 'A commercial dispute recast as a criminal complaint']
        ]} />
      </Section>

      <Section id="when" title="When to Act">
        <DataTable headers={['Situation', 'Why it matters now']} rows={[
          ['Property not returned despite demand', 'The refusal is the evidence — record it in writing'],
          ['Goods sold without authority', 'The conversion needs documenting while the trail exists'],
          ['An employee has left holding company assets', 'Notice and asset recovery should follow the exit immediately'],
          ['Money collected for a purpose has been diverted', 'Bank trail and communications must be preserved'],
          ['A deceased person’s movable property has been taken', 'Section 315 assessment alongside the succession position'],
          ['Digital evidence exists', 'Messages and logs should be preserved before devices change hands'],
          ['The police have declined to act', 'Expected for a non-cognizable offence; the Magistrate route applies'],
          ['The other side says it is purely civil', 'The criminal ingredients must be demonstrable, not asserted'],
          ['You have received a notice or summons', 'The reply should be drafted before anything is conceded']
        ]} />
      </Section>

      <Section id="route" title="Police or Magistrate">
        <DataTable headers={['Scenario', 'Route', 'Basis']} rows={[
          ['Section 314 alone', 'Complaint to the Magistrate', 'Non-cognizable; FIR not available for this offence alone'],
          ['Information given to police anyway', 'Recorded, and referred to the Magistrate', 'BNSS Section 174'],
          ['Facts also disclose a cognizable offence', 'FIR and police investigation', 'BNSS Sections 173 and 175'],
          ['Magistrate complaint filed', 'Complainant examined on oath', 'BNSS Section 223'],
          ['Court needs more before issuing process', 'Postponement and preliminary inquiry', 'BNSS Section 225'],
          ['A case is made out', 'Process issued to the accused', 'BNSS Section 227']
        ]} />
        <p>The choice of route should follow the provisions the facts actually support. Adding cognizable sections to force an FIR is a common tactic and a poor one: it invites a challenge to the proceedings and can undermine the parts of the complaint that were sound.</p>
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Facts, property and urgency assessed'],
          ['2', 'Ownership review', 'Proof of ownership or lawful entitlement'],
          ['3', 'Possession review', 'How the property reached the other party'],
          ['4', 'Conversion review', 'Evidence of sale, refusal, diversion or personal use'],
          ['5', 'Provision mapping', 'Whether Section 314, 315, 316, 317 or 318 fits the facts'],
          ['6', 'Route assessment', 'Police or Magistrate, and whether a civil route is better'],
          ['7', 'Legal notice', 'A written demand that creates the refusal record'],
          ['8', 'Evidence compilation', 'Documents, bank trail and preserved digital records'],
          ['9', 'Drafting', 'Police complaint or Magistrate complaint with annexures'],
          ['10', 'Filing coordination', 'Filing, advocate briefing and appearance support'],
          ['11', 'Recovery or settlement', 'Return of property, payment or documented consent terms'],
          ['12', 'Tracking', 'Ticket-based status updates and next-step advisory']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Proof of ownership', 'Establishes the right over the property'],
          ['Proof of possession with the other party', 'Shows how the property came into their hands'],
          ['Delivery challan or invoice', 'Establishes movement of the goods'],
          ['Agreement or written understanding', 'Shows the purpose for which the property was given'],
          ['Bank statement', 'Traces money movement'],
          ['Ledger and books of account', 'Establishes the financial position'],
          ['WhatsApp messages and emails', 'Admission, demand, refusal or intent'],
          ['Legal notice and any reply', 'The demand and refusal record'],
          ['Asset register', 'Company ownership of the asset'],
          ['Stock records', 'Inventory and goods tracking'],
          ['Employment records and exit documentation', 'Asset custody and return obligations'],
          ['Witness details', 'Support for possession and conversion'],
          ['Company authorisation', 'Authority to complain on behalf of the entity'],
          ['Incident chronology', 'Date-wise presentation of the case']
        ]} />
      </Section>

      <Section id="evidence" title="Evidence and the Demand Record">
        <p>These matters turn on documents rather than narrative. The complainant needs to show a right over the property, how it reached the other party, and what happened to it afterwards — and the third element is usually the hardest.</p>
        <p>A written demand is the most useful single step available to a complainant. It is not a statutory requirement, but it converts an ambiguous situation into a documented one: the property was identified, its return was sought by a date, and the response was either a refusal, an excuse that can be tested, or silence. Each of those supports the inference of dishonest retention far better than an assertion that the other side &ldquo;simply kept it&rdquo;.</p>
        <p>Digital records carry much of the weight in modern matters — messages acknowledging custody, emails agreeing the purpose, ERP or access logs showing the movement of goods. Their admissibility is governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023, so preserve the complete record and the original source rather than assembling cropped screenshots after the dispute has hardened.</p>
      </Section>

      <Section id="defence" title="Defence Against Allegations">
        <p>A significant share of these complaints are filed as leverage in commercial or family disputes. Where that is the case, the defence is usually strong — but it has to be made carefully, because an over-eager reply can concede possession or purpose that the complainant would otherwise have had to prove.</p>
        <DataTable headers={['Defence', 'What supports it']} rows={[
          ['The property belongs to the accused', 'Ownership documents and purchase records'],
          ['The property was never received', 'Absence of handover proof; delivery records'],
          ['A bona fide claim of right exists', 'Contemporaneous correspondence showing a genuine claim'],
          ['The dispute is contractual', 'The agreement, the accounts and the true nature of the arrangement'],
          ['No dishonest intention', 'Good faith conduct, disclosed retention, an accounting dispute'],
          ['The property has been returned', 'Delivery proof and acknowledgement'],
          ['Payment has already been made', 'Bank records and settlement documents'],
          ['Wrongly named', 'Role and involvement review, particularly for directors and employees'],
          ['The messages are incomplete', 'The full communication record in context'],
          ['The complaint is an abuse of process', 'Quashing assessment before the High Court']
        ]} />
        <p>Where a summons has been issued, appearance and the bail position should be addressed rather than ignored — see <Link href="/solutions/legal/bail-application">Bail Application</Link>. Where the proceedings are genuinely an abuse of process, a quashing petition should be assessed early rather than after the trial has begun.</p>
      </Section>

      <Section id="settlement" title="Settlement and Recovery">
        <p>Most complainants want the property or the money back, not a conviction. That is worth saying plainly, because it should shape the strategy from the start rather than emerging two years in.</p>
        <DataTable headers={['Settlement element', 'Why it should be documented']} rows={[
          ['Return of the property', 'With an itemised schedule and acknowledgement on delivery'],
          ['Payment or structured repayment', 'With dates, amounts and the consequence of default'],
          ['Written undertaking', 'Records the admission and the commitment'],
          ['Consent terms before the court', 'Gives the settlement enforceable standing'],
          ['Withdrawal terms', 'What happens to the proceedings, and when'],
          ['Default clause', 'What revives if the schedule is not met']
        ]} />
        <p>An undocumented settlement is the most common source of the second dispute. Where the property is returned or the money paid, record it properly — including what happens to the pending proceedings — so that the matter actually ends.</p>
      </Section>

      <Section id="common-issues" title="Why Complaints Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['The complaint reads as civil recovery', 'Treated as a debt dispute and goes nowhere', 'Ingredient-by-ingredient mapping before filing'],
          ['No ownership proof', 'The foundational element is missing', 'Document checklist and evidence review'],
          ['No written demand', 'Refusal cannot be demonstrated', 'Legal notice creating the demand record'],
          ['Digital messages not preserved', 'Admissions are lost', 'Preservation aligned to BSA requirements'],
          ['Wrong provision selected', 'Ingredients do not match the facts', 'BNS offence mapping across Sections 314 to 318'],
          ['FIR expected for a non-cognizable offence', 'Weeks lost at the police station', 'Magistrate complaint route from the outset'],
          ['Sections added to force cognizability', 'Invites a challenge to the whole proceeding', 'Honest provision mapping'],
          ['Accused named without a role', 'Weakens the complaint against everyone named', 'Role-wise allegation drafting'],
          ['Company complaint without authorisation', 'Objection at the threshold', 'Board or authorised representative documentation'],
          ['Settlement not documented', 'The dispute returns on default', 'Undertaking and repayment schedule'],
          ['Defence reply concedes too much', 'Elements are admitted that need not have been', 'Carefully structured reply drafting']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Initial legal assessment', 'Facts, property, possession and dishonest conversion reviewed'],
          ['Provision mapping', 'Whether Section 314, 315, 316, 317 or 318 applies'],
          ['Civil or criminal route advice', 'An honest view on which remedy actually serves the objective'],
          ['Legal notice drafting', 'Demand for return, payment or explanation'],
          ['Complaint drafting', 'Police complaint, Magistrate complaint or representation'],
          ['Evidence review', 'Invoices, ledgers, challans, bank records, chats and agreements'],
          ['Digital evidence review', 'Messages, emails, ERP and access logs under BSA requirements'],
          ['Defence reply', 'Responses to false or exaggerated allegations'],
          ['Bail risk review', 'Where connected cognizable offences are alleged'],
          ['Quashing assessment', 'High Court remedy where proceedings are an abuse of process'],
          ['Settlement documentation', 'Undertakings, return schedules, payment plans and consent terms'],
          ['Advocate coordination', 'Case brief, chronology and evidence file'],
          ['Ticket-based tracking', 'Notice, complaint, police response, filing and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“These matters require a disciplined distinction between civil recovery and criminal liability. A complaint that proves a debt proves nothing under Section 314. What works is ownership, a possession trail, evidence of dishonest conversion, a written demand that was refused, and records preserved in the form the evidence law expects.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether particular facts disclose a criminal offence, which provision applies, the available procedural route and the likely outcome all depend entirely on the facts and on the view a court takes of them. The classification and punishment stated here reflect BNS Section 314 and the BNSS First Schedule as at September 2026, and parts of this guide remain under professional review. Estabizz provides case assessment, drafting support, documentation, evidence review, settlement documentation and filing coordination; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
