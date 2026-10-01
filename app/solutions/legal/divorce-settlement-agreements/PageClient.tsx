'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-it-can-settle', title: 'What a Settlement Can and Cannot Settle' },
  { id: 'maintenance-waiver', title: 'The Full-and-Final Clause' },
  { id: 'child-support', title: 'Child Support Is Not the Parents to Waive' },
  { id: 'formats', title: 'MoU, Consent Terms or Agreement' },
  { id: 'clauses', title: 'The Clauses That Matter' },
  { id: 'alimony', title: 'Structuring Alimony' },
  { id: 'children', title: 'Custody and Parenting Terms' },
  { id: 'stridhan', title: 'Stridhan and Household Articles' },
  { id: 'property', title: 'Property, Loans and Registration' },
  { id: 'pending-cases', title: 'Closing Connected Proceedings' },
  { id: 'enforceability', title: 'Making It Enforceable' },
  { id: 'default', title: 'Default and Breach' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'nri', title: 'NRI Execution' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'review', title: 'Reviewing a Draft You Have Been Given' },
  { id: 'common-issues', title: 'Why Settlements Fail Later' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a divorce settlement agreement?', 'A written record of the terms two spouses have agreed — alimony, custody, visitation, stridhan, property, loans, and what happens to pending cases. It can be a pre-filing memorandum, a detailed agreement, or consent terms placed before the court.'],
  ['Does it dissolve the marriage?', 'No. Only a decree of a competent court dissolves a marriage. A settlement records obligations; the decree ends the marriage. The two work together.'],
  ['Is a settlement agreement mandatory for mutual divorce?', 'Not as a separate document in every case, but clear written terms are strongly advisable wherever money, children, property or pending cases are involved.'],
  ['Can we agree that no alimony will ever be claimed?', 'You can record it, but you should understand its limits. An agreement by which a spouse relinquishes the right to claim future maintenance has repeatedly been held to be opposed to public policy and unenforceable, on the footing that a statutory protection cannot be bargained away. A full-and-final clause is worth having and carries weight — but treating it as an absolute bar is a mistake.'],
  ['So is a full-and-final clause pointless?', 'Far from it. It records what was paid and why, evidences that the claim was considered and provided for, and is highly relevant if a later claim is made. What it does not do is guarantee that no court will ever entertain one.'],
  ['What makes a settlement more likely to hold?', 'Adequate provision rather than a token amount, full financial disclosure on both sides, genuinely voluntary consent, the terms recorded before the court rather than privately, and payment actually made through a traceable banking channel.'],
  ['Can child maintenance be waived?', 'No. Maintenance for a child is the child’s right, not the parents’ to trade away. An agreement purporting to waive it does not bind the child, and a court can order support regardless of what the parents signed.'],
  ['Can custody be settled by agreement?', 'The parents can agree an arrangement, and courts generally respect a workable one. But custody is decided on the welfare of the child, so the court retains the power to examine and vary the terms. A settlement cannot treat a child as consideration.'],
  ['Can alimony be revisited later?', 'It can, in appropriate cases. Section 25 of the Hindu Marriage Act allows the court to vary, modify or rescind a maintenance order on a change in circumstances. A well-structured one-time settlement reduces that exposure considerably compared with an open-ended monthly arrangement.'],
  ['One-time payment or monthly maintenance?', 'A one-time payment generally gives both sides finality and removes the default risk, which is why it is usually preferred where it is affordable. Monthly maintenance keeps the relationship alive and with it the possibility of variation, arrears and enforcement proceedings.'],
  ['Does the settlement close our pending criminal case?', 'Not by itself. Cruelty under BNS Section 85 is generally non-compoundable, so closure usually requires an application to the High Court exercising its inherent power, and the court decides whether to allow it. The agreement should record the obligation to cooperate in that application, not assume the case ends on signature.'],
  ['What about a domestic violence case?', 'Proceedings under the PWDVA can generally be resolved by agreement, but the terms need to deal properly with residence, maintenance and safety. Simply withdrawing without those in place tends to leave the real problem unresolved.'],
  ['Does the agreement need to be registered?', 'It depends on what it does. If the document itself creates, transfers or extinguishes rights in immovable property, registration under Section 17 of the Registration Act, 1908 may be required, and stamp duty considered. A settlement that merely records an obligation to transfer later is treated differently from one that effects the transfer.'],
  ['Is stamp duty payable?', 'It depends on the State, the nature of the document and whether property or payment terms are involved. It should be checked before execution, not afterwards.'],
  ['Can we sign before filing for divorce?', 'Yes. A pre-filing memorandum is common and can later be incorporated into the mutual consent petition as consent terms.'],
  ['Can consent be withdrawn after signing?', 'In a mutual consent divorce, consent must subsist at the second motion. Either party can withdraw before it, and that does happen — which is why obligations should be structured so neither side is left exposed mid-way.'],
  ['Should payment be made before or after the decree?', 'Usually staged — a portion at or around the first motion and the balance at the second, so that neither party carries the whole risk. The structure should be written in explicitly with dates.'],
  ['How should payment be made?', 'Through a traceable banking channel, never cash. The trail is what proves compliance if it is ever disputed, and it matters for both parties.'],
  ['Can stridhan be dealt with in the agreement?', 'Yes, and it should be, item by item in an annexure with a handover date and an acknowledgement on receipt. A general clause saying stridhan has been returned settles very little.'],
  ['What if the other side defaults?', 'That depends on how the settlement was recorded. Terms taken on record by the court are far easier to enforce than a private agreement, which may leave you suing on a contract. Build in a default clause with a defined consequence.'],
  ['Can settlement terms be changed later?', 'By agreement, yes, and with the court’s permission where proceedings are on foot. Child-related terms can always be revisited if the child’s welfare requires it.'],
  ['Can NRIs execute a settlement?', 'Yes, though execution, notarisation, apostille or consular attestation, and any video appearance need to be planned, along with how payment will move across borders.'],
  ['Should confidentiality be included?', 'It is usually worth it, alongside non-disparagement and non-interference clauses, particularly where reputation or a business is involved.'],
  ['What is the biggest mistake?', 'A short agreement. A one-page settlement covering money but not custody, stridhan, loans, pending cases or default is the reliable source of the second dispute, usually about two years later.'],
  ['Can Estabizz review a draft we already have?', 'Yes. Reviewing an existing draft for missing clauses, unenforceable terms and practical gaps is a substantial part of what we do here.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Divorce Settlement Agreements' }]}
      title="Divorce Settlement Agreements"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Divorce Settlement Agreements"
      sections={sections}
      ctaTitle="Speak With a Settlement Drafting Expert"
      ctaDescription="Terms drafted to survive the claim someone brings three years later — not just to get the decree signed this month."
      quickFacts={[
        { label: 'Dissolves marriage?', value: 'No — the decree does' },
        { label: 'Child support', value: 'Cannot be waived' },
        { label: 'Best recorded', value: 'As consent terms in court' },
        { label: 'Payment', value: 'Traceable banking channel' }
      ]}
      relatedArticles={[
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Which law governs your marriage, which remedy fits, and the mutual consent two-motion process.' },
        { title: 'Divorce Notice', href: '/solutions/legal/divorce-notice', category: 'Legal', description: 'Drafting and replying to a matrimonial notice, and opening settlement discussions.' },
        { title: 'Domestic Violence', href: '/solutions/legal/domestic-violence-legal-services', category: 'Legal', description: 'Protection, residence, monetary relief and custody under the PWDVA, 2005.' }
      ]}
      finalCtaTitle="Draft for the Dispute That Has Not Happened Yet"
      finalCtaDescription="Every settlement looks adequate on the day everyone wants it signed. The test is whether it still works when someone defaults, remarries, relocates or changes their mind — and that is entirely a question of how it was drafted."
      heroDescription={<p>A divorce decree ends a marriage. It does not, by itself, end the arguments about money, children, jewellery, the flat or the four other cases still pending. That is what a settlement agreement is for — and why a one-page understanding signed in a hurry is so often the origin of the next dispute. Estabizz assists with settlement structuring and drafting, mutual divorce consent terms, alimony structuring, custody and visitation arrangements, stridhan schedules, property and loan allocation, closing connected proceedings, enforceability and default protection, NRI execution, and reviewing drafts prepared by the other side.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a divorce settlement agreement records what both spouses have agreed, so that the decree closes the marriage and the agreement closes everything else.</p>
        <p>Real closure is rarely achieved by the decree alone. It comes from settling the financial claims, the children&rsquo;s arrangements, the jewellery, the property, the loans and the connected proceedings — in terms specific enough that nobody can reopen them later on a difference of recollection.</p>
        <p>For the route itself and the mutual consent process, see <Link href="/solutions/legal/divorce-marriage-consulting">Divorce and Marriage Consulting</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A settlement agreement is not a licence or a filing. It is a legal document recording agreed terms, and nothing registers it with any authority unless property transfer brings the Registration Act into play.</p>
        <p>It is not mandatory. It is strongly advisable wherever alimony, custody, stridhan, property, loans or pending cases are in issue — which is most cases.</p>
      </Section>

      <Section id="what-it-can-settle" title="What a Settlement Can and Cannot Settle">
        <DataTable headers={['A settlement can', 'A settlement cannot']} rows={[
          ['Record agreed alimony and how it is paid', 'Dissolve the marriage'],
          ['Set out custody and a parenting schedule', 'Displace the court’s duty to consider the child’s welfare'],
          ['Itemise stridhan and fix a handover date', 'Waive a child’s right to maintenance'],
          ['Allocate property, loans and liabilities', 'Conclusively bar every future maintenance claim'],
          ['Record obligations to withdraw proceedings', 'By itself close a non-compoundable criminal case'],
          ['Provide confidentiality and non-interference', 'Prevent a court varying terms where welfare requires it'],
          ['Create an enforceable payment schedule', 'Effect a property transfer without registration where that is required'],
          ['Evidence that claims were considered and provided for', 'Override a statutory protection by contract']
        ]} />
      </Section>

      <Section id="maintenance-waiver" title="The Full-and-Final Clause">
        <div className="warning-box" aria-label="Maintenance waiver">
          <p><strong>This is the most over-promised clause in matrimonial practice, and clients are routinely told it does more than it does.</strong> An agreement by which a spouse relinquishes or waives the right to claim future maintenance has repeatedly been held to be <strong>opposed to public policy and unenforceable</strong>, on the reasoning that maintenance is a statutory protection which cannot be bartered away by private contract. A clause saying &ldquo;the wife shall never claim maintenance in future&rdquo; is therefore not the absolute bar it is presented as.</p>
        </div>
        <p>That does not make the clause worthless — the opposite. It records what was paid and on what basis, it evidences that the claim was considered and provided for, and it is highly relevant if a later claim is brought. What changes is how you achieve durability: not by tightening the waiver wording, but by making the settlement substantively sound.</p>
        <DataTable headers={['What actually makes a settlement durable', 'Why']} rows={[
          ['Adequate provision, not a token sum', 'A later court asks whether the settlement was fair, not whether it was signed'],
          ['Full financial disclosure by both sides', 'Concealment is the most common basis for reopening'],
          ['Genuinely voluntary consent', 'Pressure or haste undermines the whole document'],
          ['Independent advice for both parties', 'Removes the argument that one side did not understand'],
          ['Terms recorded before the court', 'Consent terms carry far more weight than a private paper'],
          ['Payment actually made, traceably', 'Performance is the strongest evidence of a genuine settlement'],
          ['A clear recital of what the payment covers', 'Shows the claim was quantified and addressed'],
          ['Realistic, not punitive, terms', 'A settlement that leaves one side destitute invites challenge']
        ]} />
      </Section>

      <Section id="child-support" title="Child Support Is Not the Parents to Waive">
        <div className="warning-box" aria-label="Child maintenance">
          <p><strong>Parents cannot contract away a child&rsquo;s maintenance, because it was never theirs to trade.</strong> The right belongs to the child. An agreement in which one parent accepts a lump sum &ldquo;in full and final settlement including for the child&rdquo; does not bind the child, and a court can order support regardless of what the parents signed. Any settlement that relies on such a clause is built on a fault line.</p>
        </div>
        <p>The practical answer is to provide for the child properly and separately: a distinct child-support component, not merged into the spousal figure; defined coverage for education and medical costs; a mechanism for how those change as the child grows; and a review trigger. A settlement that visibly provides for the child is far more robust than one that purports to extinguish the child&rsquo;s claim.</p>
      </Section>

      <Section id="formats" title="MoU, Consent Terms or Agreement">
        <DataTable headers={['Format', 'When it is used', 'Enforceability']} rows={[
          ['Memorandum of understanding', 'Pre-filing, to record the agreed framework', 'Weakest — a contract, not an order'],
          ['Detailed settlement agreement', 'Comprehensive terms covering all obligations', 'Contractual, stronger if well drafted'],
          ['Consent terms filed in court', 'Terms placed on record in the proceedings', 'Strongest — carries the weight of an order'],
          ['Mediation settlement', 'Terms recorded in court-annexed or private mediation', 'Strong where taken on record by the court'],
          ['Terms in the mutual consent petition', 'Incorporated into the joint petition', 'Strong, and reviewed by the court'],
          ['Post-decree settlement', 'Cleaning up obligations after the decree', 'Depends on how it is recorded']
        ]} />
        <div className="info-box" aria-label="Get it on record">
          <p><strong>Wherever possible, get the terms on the court record.</strong> The difference between a private agreement and consent terms taken on record is the difference between filing a fresh suit to enforce, and going back to the court that already has the matter. It costs nothing extra at the time and saves a great deal later.</p>
        </div>
      </Section>

      <Section id="clauses" title="The Clauses That Matter">
        <DataTable headers={['Clause', 'Why it belongs']} rows={[
          ['Voluntary consent recital', 'Records free consent without force, fraud or coercion'],
          ['Financial disclosure recital', 'Both parties confirm what was disclosed'],
          ['Alimony', 'Amount, mode, dates and precisely what it covers'],
          ['Child support', 'Separate from alimony, with coverage and escalation'],
          ['Custody and legal decision-making', 'Who the child lives with, and who decides what'],
          ['Visitation', 'Specific days, times, holidays and handover'],
          ['Education and medical expenses', 'Sharing ratio and how changes are handled'],
          ['Stridhan', 'Item-wise annexure, handover date and acknowledgement'],
          ['Property', 'Ownership, possession, transfer mechanism and who bears costs'],
          ['Loans and EMIs', 'Who services what, and indemnity if they do not'],
          ['Bank accounts and nominations', 'Closure, distribution and beneficiary changes'],
          ['Pending proceedings', 'What happens to each, in what sequence'],
          ['Confidentiality and non-disparagement', 'Protects both parties afterwards'],
          ['Non-interference', 'Reduces later harassment allegations'],
          ['Default clause', 'A defined consequence, not a general reservation of rights'],
          ['Jurisdiction', 'Which court enforces this'],
          ['Compliance timeline', 'Dated obligations rather than open-ended promises'],
          ['Severability', 'One unenforceable clause does not collapse the settlement']
        ]} />
      </Section>

      <Section id="alimony" title="Structuring Alimony">
        <DataTable headers={['Structure', 'Advantages', 'Risks']} rows={[
          ['One-time lump sum', 'Finality, no default risk, clean break', 'Requires liquidity upfront'],
          ['Structured instalments', 'Manageable for the payer', 'Default risk; needs security and a default clause'],
          ['Monthly maintenance', 'Lower immediate burden', 'Open to variation, arrears and enforcement proceedings'],
          ['Lump sum plus child support', 'Separates the two claims cleanly', 'Both components must be adequate'],
          ['Asset transfer in lieu', 'Uses an illiquid asset', 'Valuation disputes, registration and stamp duty'],
          ['Staged around the motions', 'Neither side carries the whole risk', 'Needs precise dates tied to each stage']
        ]} />
        <p>Where it is affordable, a one-time settlement is usually the better structure for both sides: it removes the default risk, it ends the financial relationship, and it is materially harder to reopen than an ongoing monthly arrangement. Whatever the structure, pay through a traceable banking channel and record the account details in the agreement.</p>
      </Section>

      <Section id="children" title="Custody and Parenting Terms">
        <p>Courts generally respect a workable arrangement the parents have agreed. What they will not accept is a settlement that treats the child as consideration, and they retain the power to revisit terms where welfare requires it.</p>
        <DataTable headers={['Term', 'What it should specify']} rows={[
          ['Physical custody', 'Who the child lives with, and the routine'],
          ['Legal custody', 'Who makes major decisions, and how disputes are resolved'],
          ['Visitation', 'Specific days, times, duration and handover location'],
          ['Holidays and festivals', 'School vacations, birthdays and festivals, allocated in advance'],
          ['Education', 'School choice, fees, and who pays what share'],
          ['Medical care', 'Insurance, routine care and emergency decisions'],
          ['Communication', 'Phone and video schedule with the non-resident parent'],
          ['Travel consent', 'Domestic and international travel, and passport custody'],
          ['Relocation', 'Notice and consent requirements if either parent moves'],
          ['Review', 'How the arrangement adapts as the child grows'],
          ['Welfare clause', 'Express acknowledgement that welfare governs']
        ]} />
      </Section>

      <Section id="stridhan" title="Stridhan and Household Articles">
        <p>Stridhan is the wife&rsquo;s absolute property. Disputes about it survive settlements more often than any other item, almost always because the agreement described it in general terms.</p>
        <DataTable headers={['Do', 'Instead of']} rows={[
          ['An item-wise annexure with description and weight', 'A clause saying "all stridhan has been returned"'],
          ['Approximate values, with bills where available', 'Unvalued generic descriptions'],
          ['A specific handover date and place', 'An open-ended undertaking to return'],
          ['A signed acknowledgement on actual receipt', 'Assuming the agreement itself proves handover'],
          ['Photographs of the articles at handover', 'Relying on memory if it is later disputed'],
          ['A clause covering anything discovered later', 'Silence, which reopens the whole issue'],
          ['Separating stridhan from jointly bought assets', 'Merging two legally different claims']
        ]} />
      </Section>

      <Section id="property" title="Property, Loans and Registration">
        <div className="warning-box" aria-label="Registration">
          <p><strong>Be careful what the document itself does.</strong> If the settlement creates, transfers or extinguishes rights in immovable property, registration under Section 17 of the Registration Act, 1908 may be required and stamp duty will need to be assessed. An unregistered document that purports to transfer property may be ineffective for that purpose. A settlement that records an <em>obligation to execute a transfer deed later</em> is treated differently from one that effects the transfer itself — and which of the two you have drafted should be a deliberate choice.</p>
        </div>
        <DataTable headers={['Asset', 'What the settlement must address']} rows={[
          ['Jointly owned house or flat', 'Ownership, possession, transfer or sale, and who bears costs'],
          ['Sole-owned property', 'Whether any claim is being given up, and on what basis'],
          ['Vehicle', 'Transfer, insurance and any outstanding loan'],
          ['Housing or personal loan', 'Who services it, and indemnity for the other'],
          ['Joint bank accounts', 'Closure or distribution of the balance'],
          ['Investments and deposits', 'Distribution and nominee updates'],
          ['Insurance policies', 'Beneficiary and nomination changes'],
          ['Business interest', 'Shareholding, partnership or valuation'],
          ['Rental income property', 'Who receives income, and from when']
        ]} />
        <p>Loan allocation deserves particular attention. Agreeing that one spouse will service a joint loan does not release the other in the lender&rsquo;s eyes — the bank is not a party to your settlement. Either restructure the facility with the lender or include a robust indemnity, because a default will otherwise hit both credit records.</p>
      </Section>

      <Section id="pending-cases" title="Closing Connected Proceedings">
        <p>Couples routinely obtain a decree and then discover they are still litigating four other matters. Each pending proceeding needs its own treatment, and the mechanisms differ.</p>
        <DataTable headers={['Proceeding', 'How it actually closes']} rows={[
          ['Maintenance application', 'Withdrawal, or adjustment against the settlement amount'],
          ['Domestic violence proceedings', 'Generally resolvable by agreement, with residence and safety addressed'],
          ['Criminal cruelty case under BNS Section 85', 'Generally non-compoundable — usually requires a High Court quashing application'],
          ['Other criminal complaints', 'Depends on whether the offence is compoundable'],
          ['Custody proceedings', 'Consent terms aligned with the agreed parenting plan'],
          ['Property or civil suit', 'Withdrawal on compliance, or a consent decree'],
          ['Police complaint not yet an FIR', 'A closure or non-pursuit statement, as appropriate'],
          ['Appeal or revision', 'Withdrawal, usually staged after compliance']
        ]} />
        <div className="info-box" aria-label="Criminal cases">
          <p><strong>A settlement does not close a non-compoundable criminal case on its own.</strong> Cruelty under BNS Section 85 is generally non-compoundable, so the usual route is a joint application to the High Court exercising its inherent power, and the court decides whether to allow it on the facts. The settlement should therefore record an obligation to cooperate in that application and sequence the payments around it — rather than assuming the case evaporates on signature.</p>
        </div>
      </Section>

      <Section id="enforceability" title="Making It Enforceable">
        <DataTable headers={['Step', 'Effect']} rows={[
          ['Record the terms as consent terms in court', 'Enforceable within the existing proceedings'],
          ['Attach the settlement to the mutual consent petition', 'The court sees and considers the terms'],
          ['Stage obligations against the two motions', 'Neither side performs everything before the other starts'],
          ['Use a traceable banking channel', 'Compliance is provable'],
          ['Obtain written acknowledgements on performance', 'Closes off later denial'],
          ['Include a dated compliance timeline', 'Makes default identifiable'],
          ['Add a default clause with a defined consequence', 'Gives a remedy without fresh litigation over what was meant'],
          ['Keep certified copies of the decree and terms', 'Needed for banks, registries and any enforcement'],
          ['Complete the follow-through', 'Nomination changes, transfers and account closures actually done']
        ]} />
      </Section>

      <Section id="default" title="Default and Breach">
        <DataTable headers={['Scenario', 'Realistic remedy']} rows={[
          ['Instalment missed', 'Enforcement of the consent terms in the same proceedings'],
          ['Private agreement breached', 'Often a fresh action on the contract — slower and costlier'],
          ['Property not transferred as agreed', 'Specific performance, or enforcement of consent terms'],
          ['Stridhan not handed over', 'Enforcement, supported by the itemised annexure'],
          ['Case not withdrawn as promised', 'Enforcement, and the default clause consequence'],
          ['Consent withdrawn before the second motion', 'The mutual route fails; the contested route revives'],
          ['Visitation obstructed', 'Application to the court that made the custody order'],
          ['Payer becomes untraceable', 'Execution, which is why security or a lump sum is preferable']
        ]} />
        <p>The pattern is consistent: what you can do about a breach depends almost entirely on how the settlement was recorded. This is the single strongest argument for putting the terms on the court record.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu mutual consent divorce', 'Hindu Marriage Act, 1955, Section 13B'],
          ['Hindu maintenance and alimony', 'Hindu Marriage Act, Sections 24 and 25'],
          ['Hindu custody and marriage property', 'Hindu Marriage Act, Sections 26 and 27'],
          ['Civil and interfaith mutual divorce', 'Special Marriage Act, 1954, Section 28'],
          ['Civil marriage alimony and custody', 'Special Marriage Act, Sections 36 to 38'],
          ['Christian mutual consent divorce', 'Indian Divorce Act, 1869, Section 10A'],
          ['Parsi mutual consent divorce', 'Parsi Marriage and Divorce Act, 1936, Section 32B'],
          ['Forum', 'Family Courts Act, 1984, Section 7'],
          ['Contract validity', 'Indian Contract Act, 1872, Sections 10 and 23'],
          ['Property transfer', 'Registration Act, 1908, Section 17 and State stamp law'],
          ['Maintenance generally', 'BNSS, 2023, Section 144'],
          ['Domestic violence relief', 'Protection of Women from Domestic Violence Act, 2005'],
          ['Child guardianship', 'Guardians and Wards Act, 1890']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Hindu Marriage Act, Section 13B', 'Mutual consent divorce and the two motions'],
          ['Hindu Marriage Act, Section 24', 'Interim maintenance and litigation expenses'],
          ['Hindu Marriage Act, Section 25', 'Permanent alimony, and the power to vary on changed circumstances'],
          ['Hindu Marriage Act, Section 26', 'Custody, maintenance and education of children'],
          ['Hindu Marriage Act, Section 27', 'Property presented at or about the time of marriage'],
          ['Special Marriage Act, Section 28', 'Mutual consent divorce'],
          ['Special Marriage Act, Sections 36 to 38', 'Alimony, maintenance and custody'],
          ['Indian Contract Act, Section 10', 'What makes an agreement a valid contract'],
          ['Indian Contract Act, Section 23', 'Unlawful object — the basis on which maintenance waivers fail'],
          ['Registration Act, Section 17', 'Documents requiring registration where property rights move'],
          ['Family Courts Act, Section 7', 'Jurisdiction over matrimonial, property and custody disputes'],
          ['BNSS, Section 144', 'Maintenance of wives, children and parents'],
          ['BNS Section 85', 'Cruelty — generally non-compoundable, relevant to case closure']
        ]} />
      </Section>

      <Section id="nri" title="NRI Execution">
        <DataTable headers={['Issue', 'What to plan']} rows={[
          ['Signing from abroad', 'Notarisation, and apostille or consular attestation as required'],
          ['Appearance at the motions', 'Whether video appearance or a power of attorney is permissible'],
          ['Payment across borders', 'Banking channel, documentation and any regulatory requirement'],
          ['Currency and exchange risk', 'Fix the currency and who bears movement'],
          ['Assets in more than one country', 'How the terms will be given effect in each'],
          ['Enforceability abroad', 'Whether the decree and terms will be recognised where it matters'],
          ['Children travelling', 'Consent, passports and return arrangements'],
          ['Service and communication', 'A reliable address and channel recorded in the agreement']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Marriage certificate', 'Proof of marriage and applicable law'],
          ['Identity and address proof of both parties', 'Execution and verification'],
          ['Income proof for both', 'Assessing adequacy of the alimony provision'],
          ['Bank statements', 'Financial disclosure and payment planning'],
          ['Property documents', 'Transfer terms, registration and stamp duty'],
          ['Loan documents', 'Liability allocation and lender position'],
          ['Children’s birth certificates', 'Custody and support terms'],
          ['School fee and medical records', 'Quantifying child expenses'],
          ['Stridhan list with bills', 'Item-wise annexure'],
          ['Vehicle and investment records', 'Asset transfer and nomination'],
          ['Insurance policies', 'Beneficiary changes'],
          ['Details of all pending cases', 'Closure mapping'],
          ['Legal notices exchanged', 'Background and claim history'],
          ['Any existing draft settlement', 'Review and gap analysis'],
          ['NRI documents where applicable', 'Passport, visa and attestation planning']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Consultation', 'Stage of the dispute and the objective'],
          ['2', 'Applicable law review', 'Which statute governs the divorce'],
          ['3', 'Issue mapping', 'Alimony, custody, property, stridhan, loans and pending cases'],
          ['4', 'Document collection', 'Financial, property, child and case records'],
          ['5', 'Financial disclosure review', 'Adequacy and completeness on both sides'],
          ['6', 'Term sheet', 'Point-wise framework before full drafting'],
          ['7', 'Drafting', 'Settlement agreement, MoU or consent terms'],
          ['8', 'Enforceability review', 'Unenforceable terms identified and restructured'],
          ['9', 'Registration and stamp assessment', 'Where property rights are involved'],
          ['10', 'Court integration', 'Incorporation into the mutual consent petition'],
          ['11', 'Compliance tracking', 'Payments, handovers, transfers and withdrawals'],
          ['12', 'Closure', 'Decree copy, acknowledgements and final record']
        ]} />
      </Section>

      <Section id="review" title="Reviewing a Draft You Have Been Given">
        <p>Being handed a draft by the other side&rsquo;s lawyer, with a request to sign quickly, is common. It is worth slowing down for a few specific checks.</p>
        <DataTable headers={['Check', 'What to look for']} rows={[
          ['Is the alimony adequate', 'Measured against income, assets and standard of living'],
          ['Is child support separate and sufficient', 'Not folded into the spousal figure'],
          ['Is disclosure complete', 'Assets you know of that are not mentioned'],
          ['Are the dates real', 'Obligations tied to dates, not to "as soon as possible"'],
          ['Is stridhan itemised', 'Or waved away in a single sentence'],
          ['Who bears transfer costs', 'Stamp duty and registration often left unallocated'],
          ['Are the loans dealt with', 'Including your exposure if the other party defaults'],
          ['Are all pending cases listed', 'Omissions usually favour whoever drafted it'],
          ['What happens on default', 'Or whether the clause is silent'],
          ['Is anything waived that cannot be', 'Child support, or an absolute maintenance bar'],
          ['Is it being recorded in court', 'Or left as a private document'],
          ['Is the sequencing fair', 'Whether you perform everything before they perform anything']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Settlements Fail Later">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A one-page agreement', 'Everything not mentioned stays disputed', 'Comprehensive clause-wise drafting'],
          ['Reliance on a blanket waiver', 'The clause does not hold when tested', 'Adequate provision and court-recorded terms'],
          ['Child support merged into alimony', 'The child’s claim survives regardless', 'Separate, defined child support'],
          ['Alimony terms vague', 'Enforcement disputes over amount or timing', 'Amount, mode, dates and account specified'],
          ['Custody described loosely', 'Parenting conflict continues', 'Specific schedule including holidays'],
          ['Stridhan not itemised', 'The oldest dispute survives the divorce', 'Annexure with acknowledgement on handover'],
          ['Property transfer not structured', 'Registration and title problems', 'Registration and stamp duty assessed upfront'],
          ['Joint loan reallocated on paper only', 'Both credit records still exposed', 'Lender restructuring or robust indemnity'],
          ['Pending cases unlisted', 'Litigation outlives the decree', 'Case-by-case closure mapping'],
          ['Criminal case assumed closed', 'It is not, and nobody applied to quash it', 'Obligation to cooperate, with sequencing'],
          ['No default clause', 'No remedy short of fresh litigation', 'Defined consequences on breach'],
          ['Kept as a private document', 'Enforcement requires a new suit', 'Terms recorded before the court']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Settlement structuring', 'The framework before the drafting'],
          ['Term sheet preparation', 'Point-wise agreement of the commercial terms'],
          ['Settlement agreement drafting', 'Comprehensive, clause-wise and enforceable'],
          ['Consent terms drafting', 'For filing and recording before the court'],
          ['Alimony structuring', 'Lump sum, instalments or asset-based, with protection'],
          ['Child support and parenting terms', 'Separate provision and a workable schedule'],
          ['Stridhan schedule', 'Item-wise annexure and handover mechanism'],
          ['Property and loan allocation', 'Transfer mechanism, costs and indemnity'],
          ['Registration and stamp review', 'Where property rights are affected'],
          ['Pending case closure mapping', 'What closes how, and in what order'],
          ['Enforceability review', 'Identifying terms that will not hold'],
          ['Draft review', 'Reviewing what the other side has proposed'],
          ['NRI execution support', 'Attestation, appearance and payment routing'],
          ['Compliance tracking', 'Payments, handovers, transfers and withdrawals'],
          ['Advocate coordination', 'Integration into the petition and filing support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A settlement should be drafted for the argument that has not happened yet. On the day everyone wants to sign, any document looks sufficient. The ones that hold are the ones where the provision was adequate, the disclosure was complete, the child was provided for separately, every pending case was named, and the terms went on the court record rather than into a drawer.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether particular terms are enforceable, what provision is adequate, what registration or stamp duty applies and how a court will treat a settlement all depend on the facts, the applicable statute and the State concerned. The position on maintenance waivers and on closure of criminal proceedings is summarised here in general terms and should be confirmed for your matter before you rely on it. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides structuring, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before signing anything.</p>
      </Section>
    </ServicePageLayout>
  );
}
