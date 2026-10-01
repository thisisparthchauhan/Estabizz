'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'self-harm', title: 'The Notice That Damages Your Own Case' },
  { id: 'computation', title: 'Computing the Claim' },
  { id: 'interest', title: 'Claiming Interest Properly' },
  { id: 'anatomy', title: 'Anatomy of a Notice That Works' },
  { id: 'register', title: 'Tone and Register' },
  { id: 'types', title: 'Which Notice You Are Actually Sending' },
  { id: 'limitation', title: 'Limitation and Acknowledgement' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'party', title: 'Naming the Right Party' },
  { id: 'service', title: 'Service and Proof of Service' },
  { id: 'after', title: 'After the Notice' },
  { id: 'settlement', title: 'Documenting the Settlement' },
  { id: 'reply', title: 'If You Have Received One' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'common-issues', title: 'Why Notices Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Is a legal notice compulsory before a recovery suit?', 'Not for an ordinary civil recovery claim against a private party. It is required or structurally necessary in several specific routes — the statutory notice before a cheque dishonour complaint, the demand notice before an insolvency application, the notice invoking arbitration, and pre-institution mediation before a commercial suit of the specified value.'],
  ['So why send one at all?', 'Because it does three things nothing else does: it fixes the amount claimed in writing, it forces the other side into a stated position you can hold them to, and it converts months of informal chasing into a documented demand and refusal. A large share of matters settle at this stage.'],
  ['Can a badly drafted notice hurt me?', 'Yes, in ways most senders never anticipate. A notice that overstates the claim invites a dispute about quantum rather than liability. A notice that concedes a quality complaint hands the other side a defence. And in an insolvency matter, a notice that provokes a reply raising a plausible dispute can close the Section 9 route entirely.'],
  ['How does a notice create a "pre-existing dispute"?', 'Under the Mobilox test, a Section 9 insolvency application fails if the corporate debtor shows a plausible contention requiring investigation that pre-dates the demand notice. A general recovery notice sent first, which draws a written reply alleging defective supply, can manufacture exactly the record that defeats the later statutory demand. Where the insolvency route is in contemplation, think about the sequence before sending anything.'],
  ['What should the claim amount be net of?', 'Credit notes, agreed rebates, part payments, retention held under the contract, and tax deducted at source by the payer. A notice demanding the gross invoice value when TDS was deducted and credits were raised is immediately attackable, and the defect is arithmetical rather than legal — which makes it worse.'],
  ['Should GST be included in the demand?', 'The amount claimed is the contractual amount due, which is normally the invoice value including tax where tax was charged. The point is to be explicit about what the figure comprises, so the recipient can reconcile it against their own books rather than disputing it.'],
  ['Can I claim interest if the contract does not provide for it?', 'Often yes. Where there is no contractual rate, interest may be claimed under the Interest Act from the date of a written demand, and the court has discretion to award interest from institution to decree and thereafter. State the basis you are relying on in the notice rather than asserting a rate.'],
  ['What about MSME interest?', 'Entirely different and much stronger. A registered micro or small supplier is entitled under the MSMED Act to compound interest with monthly rests at three times the bank rate notified by the Reserve Bank, regardless of what the contract says. If you are eligible, the notice should say so and compute on that basis.'],
  ['What is the right deadline to give?', 'Long enough to be reasonable and short enough to mean something — commonly seven to fifteen days for an ordinary commercial demand. Statutory routes fix their own: fifteen days to pay after a cheque dishonour notice, ten days to respond to an insolvency demand notice.'],
  ['How should the notice be sent?', 'Through a trackable mode, to the correct address. Registered post or speed post with acknowledgement due, plus courier, plus email to the addresses already used in the correspondence. The dispatch records are what you will produce later, so keep them from the moment you send.'],
  ['Is email alone sufficient?', 'It establishes communication and is useful, but formal dispatch through a trackable physical mode is what withstands a denial of service. Send both.'],
  ['What if the notice comes back undelivered?', 'Refusal and return are generally treated as good service where the notice was correctly addressed. Preserve the returned envelope unopened with the postal endorsement — it is evidence, and opening it destroys part of its value.'],
  ['What address should I use for a company?', 'The registered office as shown in the company records, not the correspondence address or the branch you dealt with. Send to both if you wish, but the registered office is the one that matters.'],
  ['Should the notice name the directors?', 'Only where there is a basis — a personal guarantee, their position as drawer or signatory of a cheque, or a statutory provision creating liability. Naming directors reflexively in a company debt weakens the notice and invites a complaint of harassment.'],
  ['Does sending a notice extend limitation?', 'No. A notice from you does not extend anything. What extends limitation is an acknowledgement of liability in writing signed by the debtor before the period expires, under Section 18 of the Limitation Act, or a part payment under Section 19.'],
  ['So a reply from the debtor can help me?', 'Considerably, if it acknowledges the liability. A reply saying "we will clear this by next month" is an acknowledgement; one saying "nothing is due and the goods were defective" is a dispute. Both are useful to know, which is part of the reason for sending the notice.'],
  ['Can I send a notice if limitation has already expired?', 'You can, and the other side may still pay. But an acknowledgement obtained after the period has expired does not revive a time-barred claim under Section 18, which operates only on acknowledgements made before expiry. A fresh promise to pay a time-barred debt is governed by a different provision and has its own requirements.'],
  ['What if there is an arbitration clause?', 'Then the demand should usually be structured as, or followed by, a notice invoking arbitration under Section 21 of the Arbitration and Conciliation Act. Sending a notice threatening a civil suit when the contract requires arbitration signals that the clause has not been read.'],
  ['Should I threaten criminal action?', 'Not unless the facts genuinely support it and you intend to pursue it. A threat of criminal proceedings over a commercial default is the most common way a recovery notice backfires — it invites a counter-complaint, and it reduces the chance of the settlement you actually want.'],
  ['Can I mark the notice "without prejudice"?', 'The settlement proposal within it, yes. The demand itself should not be, because you want to rely on it. The usual approach is a notice that states the demand openly and makes any settlement offer in a clearly marked separate paragraph.'],
  ['What if the debtor disputes the amount in reply?', 'Assess it honestly. A genuine reconciliation difference is usually resolved faster by a meeting than by litigation, and settling the quantum strengthens whatever route follows. A dispute invented after the notice is a different matter, and its timing is itself evidence.'],
  ['What if there is no reply at all?', 'Silence in the face of a documented demand is useful. It is not an admission, but it removes the defence that the claim was never made, and it supports the inference that there was nothing to say.'],
  ['I have received a recovery notice. Should I ignore it?', 'No. Ignoring it forfeits the chance to put your dispute on record before proceedings begin — and in an insolvency context, a dispute first raised after the demand notice may be treated as an afterthought. Reply, factually, within the time given.'],
  ['What should a reply contain?', 'The facts admitted and the facts denied, kept separate; the contractual basis for any deduction, retention or counterclaim; the documents relied on; and a payment proposal if one is genuinely intended. Avoid rhetoric, and avoid conceding anything that has not been proved.'],
  ['Can a notice be withdrawn or corrected?', 'A corrected notice can be issued, and often should be where the computation was wrong. Say plainly that it supersedes the earlier one. An uncorrected arithmetical error follows the claim all the way to the hearing.'],
  ['What is the biggest mistake in recovery notices?', 'Demanding a round figure nobody can reconcile. The recipient cannot match it to their ledger, so they dispute it; the dispute is about arithmetic rather than liability; and a straightforward default becomes an accounting argument that takes months.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Commercial' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Recovery Notice of Dues' }]}
      title="Recovery Notice of Dues"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Recovery Notice of Dues"
      sections={sections}
      ctaTitle="Speak With a Recovery Expert"
      ctaDescription="Reconcile the claim, state the interest basis, and send a demand the other side can check rather than dispute."
      quickFacts={[
        { label: 'Mandatory?', value: 'Not generally; route-specific' },
        { label: 'Limitation effect', value: 'None from your notice' },
        { label: 'What extends it', value: 'Debtor acknowledgement' },
        { label: 'Service', value: 'Trackable mode, registered office' }
      ]}
      relatedArticles={[
        { title: 'Recovery From Debtors', href: '/solutions/legal/recovery-from-debtors', category: 'Legal', description: 'Choosing the forum — MSMED, mediation, summary suit, insolvency and arbitration.' },
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'Where a notice is legally mandatory, service and proof, and replying to one.' },
        { title: 'Loan Recovery Notice', href: '/solutions/legal/loan-recovery-notice', category: 'Legal', description: 'Lender-side recovery — money lent, guarantors, SARFAESI and settlement.' }
      ]}
      finalCtaTitle="Send a Figure They Can Check, Not One They Can Argue With"
      finalCtaDescription="Credits, part payments, retention and TDS deducted at source — reconcile all of it first. An arithmetical error in a demand is the easiest thing in the world for a debtor to hide behind."
      heroDescription={<p>A recovery notice is not a strongly worded reminder. It is the document the other side&rsquo;s lawyer reads first, the computation their accounts team will try to break, and the record a court or tribunal will see at the outset of whatever follows. Done well it settles the matter without proceedings; done carelessly it concedes points, inflates the claim, and in an insolvency context can create the very dispute that closes the route you were heading for. Estabizz assists businesses, suppliers, lenders, landlords, professionals and companies with claim reconciliation, interest computation on a stated basis, limitation review, notice drafting for the route intended, address verification, dispatch and proof of service, reply analysis, settlement documentation and filing readiness.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a recovery notice is a written demand that states exactly what is owed, on what basis, and what happens if it is not paid.</p>
        <p>Its value lies almost entirely in precision. A debtor who receives a figure they can reconcile against their own ledger has two choices: pay, or explain the difference. A debtor who receives a round number with no computation has a third and far more attractive option — dispute it, ask for details, and buy another two months while the file ages.</p>
        <p>Most recovery notices are written as a form of pressure. The ones that work are written as a proof.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A recovery notice is not a licence or a registration. It is a formal written demand for payment of money due.</p>
        <p>It is not generally compulsory before an ordinary civil recovery claim, but it is required or structurally necessary in several routes: the statutory notice before a cheque dishonour complaint, the demand notice before an insolvency application, the notice invoking arbitration, and pre-institution mediation before a commercial suit of the specified value. The notice itself does not extend limitation — only an acknowledgement by the debtor does that.</p>
      </Section>

      <Section id="self-harm" title="The Notice That Damages Your Own Case">
        <div className="warning-box" aria-label="How a notice can backfire">
          <p><strong>A recovery notice can close the route you were planning to take.</strong> Under the Mobilox test, a Section 9 insolvency application must be rejected where the corporate debtor shows a plausible contention requiring investigation that pre-dates the statutory demand notice. A general recovery notice sent first, which draws a written reply alleging defective supply or short delivery, creates precisely that record. The dispute did not exist until your notice invited it — and by the time the Section 8 notice goes out, it does.</p>
        </div>
        <DataTable headers={['What the notice does', 'How it can rebound']} rows={[
          ['Overstates the claim', 'The dispute becomes about quantum, not liability'],
          ['Ignores credit notes or part payments', 'The debtor attacks the arithmetic and avoids the debt'],
          ['Demands gross value where TDS was deducted', 'Signals the claim was not reconciled'],
          ['Asserts an interest rate with no basis', 'The whole demand reads as inflated'],
          ['Refers to a quality complaint to pre-empt it', 'Puts the dispute on record in your own document'],
          ['Invites a reply before a statutory demand', 'The reply may furnish the pre-existing dispute'],
          ['Threatens criminal action without foundation', 'Invites a counter-complaint and reduces settlement prospects'],
          ['Threatens a suit where arbitration is agreed', 'Shows the contract was not read'],
          ['Names directors with no basis', 'Weakens the notice and risks a harassment allegation'],
          ['Concedes a timeline or waiver', 'Hands over a defence that had to be proved'],
          ['Is sent to the wrong address', 'Service is contested and the demand is denied']
        ]} />
        <p>Sequencing matters as much as content. Where the insolvency route is genuinely in contemplation, consider whether a general notice should precede the statutory one at all — and review the existing correspondence for what the debtor could already point to. See <Link href="/solutions/legal/recovery-from-debtors">Recovery From Debtors</Link> for the route decision that should come first.</p>
      </Section>

      <Section id="computation" title="Computing the Claim">
        <p>This is the part most notices get wrong, and it is the part that is entirely within your control. Build the figure line by line, in a form the recipient can check against their own books.</p>
        <DataTable headers={['Component', 'Treatment', 'Why it matters']} rows={[
          ['Invoice value', 'Listed individually with number and date', 'Lets the recipient reconcile rather than dispute'],
          ['Tax charged on the invoice', 'Shown as part of the invoice value', 'Avoids an argument about what the figure comprises'],
          ['Credit notes issued', 'Deducted, and identified', 'A credit the debtor knows about and you ignored is fatal to credibility'],
          ['Debit notes raised by the debtor', 'Addressed — accepted or disputed, with reasons', 'Silence is read as acceptance'],
          ['Agreed rebates or discounts', 'Deducted', 'Commonly forgotten in a long relationship'],
          ['Part payments received', 'Deducted, with date and reference', 'Also relevant to limitation'],
          ['Tax deducted at source by the payer', 'Deducted from the amount demanded', 'Demanding gross where TDS was deducted is a reconciliation error'],
          ['Retention held under the contract', 'Identified separately, with when it falls due', 'Demanding retention before it is due weakens the whole claim'],
          ['Advance adjusted', 'Shown against the relevant invoices', 'Prevents double counting'],
          ['Interest', 'Computed separately on a stated basis', 'Must not be rolled into the principal figure'],
          ['Recovery or legal costs', 'Claimed only where the contract or law supports it', 'An unsupported costs claim reads as padding'],
          ['Net amount demanded', 'Stated clearly, as a single figure', 'This is the number that gets paid']
        ]} />
        <div className="info-box" aria-label="Attach the statement">
          <p><strong>Annex the invoice-wise statement to the notice.</strong> A schedule showing each invoice, its date, its value, what was credited, what was paid and what remains turns a demand into a reconciliation the recipient can either accept or answer line by line. It is the single most effective addition to a recovery notice, and it costs nothing but care.</p>
        </div>
      </Section>

      <Section id="interest" title="Claiming Interest Properly">
        <DataTable headers={['Basis', 'When it applies', 'What to state']} rows={[
          ['Contractual rate', 'The contract or the invoice terms specify a rate', 'The clause, the rate and the period computed'],
          ['MSMED statutory interest', 'A registered micro or small supplier', 'Three times the bank rate, compounded monthly, from the appointed day'],
          ['Interest Act', 'No contractual rate, but a written demand was made', 'That interest is claimed from the date of the demand'],
          ['Court discretion', 'On a suit', 'Interest pendente lite and on the decree, as the court allows'],
          ['Trade usage', 'An established practice between the parties', 'Evidence of the practice, not an assertion of it'],
          ['Interest on an invoice stamp or footer only', 'Weak unless accepted', 'Whether the terms were agreed, not merely printed'],
          ['A rate higher than the contract provides', 'Not claimable', 'Do not inflate; it undermines the rest'],
          ['Compound interest with no basis', 'Not claimable', 'Simple interest unless a provision allows otherwise']
        ]} />
        <p>The MSMED position is worth checking before any other, because it is both the strongest basis available and the most frequently missed. A registered micro or small supplier demanding the contractual rate is leaving the statutory entitlement on the table.</p>
      </Section>

      <Section id="anatomy" title="Anatomy of a Notice That Works">
        <DataTable headers={['Element', 'What it does']} rows={[
          ['Correct identification of the sender', 'The legal entity entitled to the money, not a brand or division'],
          ['Correct identification of the recipient', 'Legal name, registered office, and capacity'],
          ['The commercial background', 'How the relationship arose, in a few factual sentences'],
          ['The contractual basis', 'Agreement, purchase order or accepted terms, by reference'],
          ['What was supplied or performed', 'With delivery or acceptance references'],
          ['When payment fell due', 'The contractual date, or the statutory one'],
          ['The invoice-wise statement', 'Annexed, so the figure can be checked'],
          ['The net amount demanded', 'A single, reconciled figure'],
          ['The interest basis and computation', 'Stated separately, not folded in'],
          ['Documents relied on', 'Listed and, where appropriate, annexed'],
          ['The default', 'What was not paid, and despite what reminders'],
          ['A payment deadline', 'Specific, and reasonable for the route'],
          ['Bank details for payment', 'Removes the last excuse'],
          ['The consequence of non-payment', 'The specific route named, not a vague threat'],
          ['Any settlement offer', 'Clearly separated, and marked without prejudice'],
          ['Reservation of rights', 'That nothing in the notice waives any right or remedy'],
          ['Signature and authority', 'By an authorised signatory, or through an advocate']
        ]} />
      </Section>

      <Section id="register" title="Tone and Register">
        <p>The register of a recovery notice does real commercial work. The objective is almost always payment rather than litigation, and a notice written to intimidate reduces the chance of the outcome you want.</p>
        <DataTable headers={['Avoid', 'Use instead', 'Why']} rows={[
          ['Accusations of fraud or dishonesty', 'A statement of the default and the amount', 'Allegations invite a defamation complaint and harden positions'],
          ['Threats of criminal prosecution', 'The civil or statutory route you will actually take', 'An unfounded criminal threat can itself be actionable'],
          ['Threats to publicise the default', 'Nothing of the kind', 'Reputational threats are coercive and counterproductive'],
          ['Contacting the debtor’s customers', 'Dealing with the debtor', 'Interfering with their business invites a counterclaim'],
          ['Abusive or repeated contact', 'A single documented demand', 'Harassment allegations displace the merits'],
          ['Emotive narrative about the impact', 'The facts and the figure', 'The recipient’s lawyer reads the facts'],
          ['Vague consequences', 'The named route and forum', 'Specificity is what signals seriousness'],
          ['Deadlines that are impossible', 'A reasonable, stated period', 'An unreasonable deadline is itself a talking point'],
          ['Copying people with no role', 'The correct recipients', 'Needless circulation creates its own exposure']
        ]} />
      </Section>

      <Section id="types" title="Which Notice You Are Actually Sending">
        <p>These are different documents with different legal consequences. Sending the wrong one, or the right one in the wrong order, costs time that cannot be recovered.</p>
        <DataTable headers={['Notice', 'Statutory basis', 'Timeline', 'What follows']} rows={[
          ['General recovery notice', 'None — contractual demand', 'As you set it', 'Any route'],
          ['Cheque dishonour notice', 'NI Act Section 138 proviso', 'Within 30 days of information of dishonour; 15 days to pay', 'Complaint before a Magistrate'],
          ['Operational creditor demand notice', 'IBC Section 8', '10 days to respond', 'Section 9 application before the NCLT'],
          ['Notice invoking arbitration', 'Arbitration Act Section 21', 'Proceedings commence on receipt', 'Constitution of the tribunal'],
          ['Pre-institution mediation application', 'Commercial Courts Act Section 12A', '3 months, extendable by 2', 'Commercial suit, or an enforceable settlement'],
          ['MSEFC reference', 'MSMED Act Section 18', 'Council to decide in 90 days', 'Conciliation, then arbitration'],
          ['Notice to a guarantor', 'The guarantee deed', 'Per the deed', 'Action against the guarantor'],
          ['Statutory notice to a government body', 'Section 80 of the Code of Civil Procedure', 'Two months, where it applies', 'Suit against the government'],
          ['Notice terminating the contract', 'The contract', 'Per the clause', 'Claim for dues and damages']
        ]} />
      </Section>

      <Section id="limitation" title="Limitation and Acknowledgement">
        <div className="info-box" aria-label="What actually extends limitation">
          <p><strong>Your notice does not extend limitation. Their reply might.</strong> Section 18 of the Limitation Act gives a fresh period of limitation where an acknowledgement of liability is made in writing, signed by the party, <em>before</em> the period expires. Section 19 does the same on part payment of the debt. Nothing you write has that effect — which is one of the practical reasons to send a notice that invites a considered written reply rather than silence.</p>
        </div>
        <DataTable headers={['Event', 'Effect on limitation']} rows={[
          ['Your reminder or legal notice', 'None'],
          ['A written acknowledgement by the debtor before expiry', 'A fresh three-year period from the acknowledgement'],
          ['A signed ledger or balance confirmation', 'An acknowledgement, if signed before expiry'],
          ['A part payment before expiry', 'A fresh period from the date of payment'],
          ['An email admitting the amount, from an authorised person', 'Capable of being an acknowledgement'],
          ['An acknowledgement after the period has expired', 'Does not revive the claim under Section 18'],
          ['A fresh written promise to pay a time-barred debt', 'Governed by a separate provision with its own requirements'],
          ['The pre-institution mediation period', 'Excluded in computing limitation for the suit'],
          ['A pending suit in the wrong forum', 'Time may be excluded in defined circumstances'],
          ['Practical consequence', 'Obtain confirmations annually, before anything is overdue']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Contractual obligation to pay', 'Indian Contract Act, 1872'],
          ['Civil recovery procedure', 'Code of Civil Procedure, 1908'],
          ['Summary procedure', 'Order XXXVII of the Code of Civil Procedure'],
          ['Limitation and acknowledgement', 'Limitation Act, 1963'],
          ['Commercial disputes and mediation', 'Commercial Courts Act, 2015, including Section 12A'],
          ['Delayed payment to micro and small suppliers', 'MSMED Act, 2006'],
          ['Cheque dishonour', 'Negotiable Instruments Act, 1881'],
          ['Operational debt against a corporate debtor', 'Insolvency and Bankruptcy Code, 2016'],
          ['Arbitration', 'Arbitration and Conciliation Act, 1996'],
          ['Interest where the contract is silent', 'Interest Act, 1978'],
          ['Notice to the government', 'Section 80 of the Code of Civil Procedure'],
          ['Evidence of the notice and the records', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Electronic records', 'BSA Sections 61 to 63'],
          ['Forums', 'Civil court, commercial court, Facilitation Council, arbitral tribunal, NCLT or Magistrate court']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Contract Act, Section 37', 'The obligation to perform, including to pay'],
          ['Contract Act, Section 73', 'Compensation for loss caused by breach'],
          ['Contract Act, Section 74', 'Where a sum is named in the contract'],
          ['Limitation Act, Section 3', 'A time-barred suit is dismissed even if limitation is not pleaded'],
          ['Limitation Act, Section 18', 'Written acknowledgement before expiry starts a fresh period'],
          ['Limitation Act, Section 19', 'Part payment before expiry starts a fresh period'],
          ['Limitation Act, Schedule', 'The Article governing the particular money claim'],
          ['CPC, Order VII', 'What the plaint must contain — the notice should anticipate it'],
          ['CPC, Order XXXVII', 'Summary suit, where the claim is on a written instrument'],
          ['CPC, Section 80', 'Notice before suing the government'],
          ['Commercial Courts Act, Section 12A', 'Pre-institution mediation for commercial suits of the specified value'],
          ['MSMED Act, Sections 15 to 18', 'Payment limit, statutory interest, liability and the Council route'],
          ['NI Act, Section 138', 'The statutory notice and its timelines'],
          ['IBC, Section 8', 'Demand notice, with ten days to respond'],
          ['Arbitration Act, Section 21', 'Commencement of arbitral proceedings on receipt of the notice'],
          ['Interest Act, 1978', 'Interest from the date of a written demand'],
          ['BSA Sections 61 to 63', 'Proving emails, chat records and ledgers']
        ]} />
      </Section>

      <Section id="party" title="Naming the Right Party">
        <DataTable headers={['Debtor', 'Who to name', 'Address to use']} rows={[
          ['Company', 'The company, by its exact registered name', 'The registered office from company records'],
          ['LLP', 'The LLP, by its registered name', 'The registered office'],
          ['Partnership firm', 'The firm and its partners', 'The principal place of business'],
          ['Proprietorship', 'The proprietor, trading as the business name', 'The business address'],
          ['Individual', 'The individual', 'The residential address, with any alternate'],
          ['Group of companies', 'The contracting entity only', 'Do not name the parent without a basis'],
          ['Where a guarantee exists', 'The principal debtor and the guarantor', 'Both, separately'],
          ['Where a cheque was issued by a company', 'The company and the signatory, per the statutory provision', 'Both'],
          ['Directors generally', 'Only where a legal basis exists', 'Not by reflex'],
          ['A dissolved or struck-off entity', 'Check status before sending', 'Restoration may be required first']
        ]} />
        <p>Verify the legal name and registered office from the public company records rather than from the invoice or the email signature. A notice addressed to a trading name, or to an office the entity left two years ago, is the easiest thing in the world to deny having received.</p>
      </Section>

      <Section id="service" title="Service and Proof of Service">
        <DataTable headers={['Mode', 'Evidential value', 'Practice']} rows={[
          ['Registered post with acknowledgement due', 'Strong', 'The primary mode; keep the receipt and the card'],
          ['Speed post', 'Strong', 'Track and print the delivery confirmation on the day'],
          ['Courier', 'Useful', 'Use alongside postal, with the proof of delivery'],
          ['Email', 'Useful and immediate', 'To addresses already used in the correspondence'],
          ['Hand delivery against acknowledgement', 'Strong where obtained', 'Get a stamped and signed receipt'],
          ['Through an advocate', 'Strong', 'Also signals the matter has moved stage'],
          ['Refused by the addressee', 'Generally good service', 'Preserve the envelope unopened with the endorsement'],
          ['Returned "not found" or "left"', 'Depends on the address used', 'Reinforces the need for the registered office'],
          ['Publication', 'Last resort', 'Where the addressee cannot be traced, with leave where required'],
          ['Records to retain', 'All of the above', 'Dispatch receipts, tracking printouts, delivery proof and the returned envelope']
        ]} />
        <div className="warning-box" aria-label="Do not open a returned envelope">
          <p><strong>If a notice comes back refused or unclaimed, do not open it.</strong> The sealed envelope bearing the postal endorsement is the evidence that the notice was correctly addressed and tendered. Opening it to check destroys part of that value, and this is a mistake that is made routinely and cannot be undone.</p>
        </div>
      </Section>

      <Section id="after" title="After the Notice">
        <DataTable headers={['Response', 'What it means', 'What to do']} rows={[
          ['Full payment', 'The notice worked', 'Issue a receipt and confirm closure in writing'],
          ['Part payment', 'Liability acknowledged', 'Record it; it also restarts limitation'],
          ['A request for time', 'Acknowledgement of the debt', 'Convert it into a documented schedule'],
          ['A proposal to settle at a discount', 'A commercial negotiation', 'Assess against the cost and time of the alternative'],
          ['A reconciliation query', 'Usually genuine, and resolvable', 'Meet, agree the balance, and record it in writing'],
          ['A denial of liability', 'A contested matter', 'Assess the strength of the denial before filing'],
          ['A dispute first raised now', 'Possibly an afterthought', 'The timing is itself evidence; record the sequence'],
          ['A counterclaim', 'Changes the economics', 'Assess it before proceeding'],
          ['Silence', 'No defence stated', 'Proceed on the chosen route; silence supports your position'],
          ['A reply from an advocate', 'The matter has escalated', 'Respond through an advocate, and keep the record clean']
        ]} />
      </Section>

      <Section id="settlement" title="Documenting the Settlement">
        <p>Most notices end in a settlement rather than a filing, and an undocumented settlement is simply a deferred dispute. Get the terms down while the leverage exists.</p>
        <DataTable headers={['Term', 'Why it belongs in the document']} rows={[
          ['The agreed amount', 'Full and final, or on account — say which'],
          ['The payment schedule', 'Dates and amounts, not "within a few months"'],
          ['Mode of payment', 'Bank details and the reference to be used'],
          ['Treatment of interest', 'Waived, included or payable — stated expressly'],
          ['Default clause', 'What revives on default, and from what date'],
          ['Security', 'Post-dated instruments, a guarantee or a charge, where agreed'],
          ['Effect on pending proceedings', 'Withdrawal, adjournment or consent terms'],
          ['No-dues confirmation', 'Issued only on receipt of the final payment'],
          ['Tax treatment', 'How the settlement is reflected for tax purposes'],
          ['Confidentiality', 'Where commercially appropriate'],
          ['Authority to sign', 'Executed by someone who can bind the debtor'],
          ['Governing law and forum', 'For the settlement itself']
        ]} />
        <p>Where the settlement is reached in pre-institution mediation under Section 12A, it carries the status and effect of an arbitral award on agreed terms — which makes it directly enforceable rather than a further promise. That is a reason to take the mediation seriously rather than treating it as a procedural hurdle.</p>
      </Section>

      <Section id="reply" title="If You Have Received One">
        <DataTable headers={['Step', 'What to do']} rows={[
          ['Read the deadline first', 'Diarise it; a reply after the route has been taken is worth little'],
          ['Reconcile the claim yourself', 'Against your own ledger, credits, payments and TDS'],
          ['Separate what is admitted from what is denied', 'A blanket denial of an amount partly owed damages credibility'],
          ['Put any genuine dispute on record now', 'A dispute raised later looks like an afterthought'],
          ['Produce the contractual basis for deductions', 'Retention, quality, short supply or counterclaim, with documents'],
          ['Do not concede dates or waivers carelessly', 'A sentence can hand over a defence'],
          ['Avoid an acknowledgement you did not intend', 'Loose wording can restart limitation against you'],
          ['Make a payment proposal if you intend to pay', 'With dates you can actually meet'],
          ['Keep the tone factual', 'Hostility invites escalation'],
          ['Reply through an advocate where the stakes justify it', 'Particularly where insolvency or criminal routes are threatened']
        ]} />
        <p>A reply is also the recipient&rsquo;s best opportunity to establish a dispute on record before any insolvency demand is served. For a corporate debtor, that record is frequently decisive.</p>
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Claim, counterparty and urgency'],
          ['2', 'Document review', 'Contract, invoices, delivery and acceptance records'],
          ['3', 'Reconciliation', 'Invoice-wise statement net of credits, payments, retention and TDS'],
          ['4', 'Limitation review', 'The applicable period, its expiry and any acknowledgement'],
          ['5', 'Interest computation', 'On a stated contractual, MSMED or statutory basis'],
          ['6', 'Dispute assessment', 'What the other side can raise, and when they first raised it'],
          ['7', 'Route confirmation', 'Which proceeding the notice is built for'],
          ['8', 'Party verification', 'Legal name, registered office and authorised recipients'],
          ['9', 'Notice drafting', 'Demand with schedule, basis, deadline and named consequence'],
          ['10', 'Dispatch', 'Trackable modes, with records retained from the day of sending'],
          ['11', 'Service record', 'Receipts, tracking, delivery proof and any returned envelope'],
          ['12', 'Reply analysis', 'Admissions, disputes and their timing'],
          ['13', 'Settlement documentation', 'Schedule, security and default clause'],
          ['14', 'Filing readiness', 'Annexed file for the chosen forum'],
          ['15', 'Tracking', 'Ticket-based updates to payment or filing']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Contract, purchase order or work order', 'Payment obligation and terms'],
          ['Invoices', 'The amounts claimed'],
          ['Delivery challans and acceptance records', 'Proof of supply or performance'],
          ['Ledger statement', 'The running balance'],
          ['Signed balance confirmation', 'Acknowledgement and limitation'],
          ['Bank statements', 'Receipts and shortfalls'],
          ['Credit and debit notes', 'The net amount payable'],
          ['TDS certificates or tax records', 'Amounts deducted at source'],
          ['Retention terms', 'What is not yet due'],
          ['Interest clause', 'Basis for the interest demand'],
          ['Udyam registration with its date', 'MSMED interest entitlement'],
          ['Prior reminders and correspondence', 'Demand history'],
          ['Any complaint or dispute raised by the debtor', 'Assessment before choosing the route'],
          ['Arbitration and jurisdiction clauses', 'The forum'],
          ['Cheque and return memo', 'The cheque route, where applicable'],
          ['Guarantee documents', 'Additional parties liable'],
          ['Company master data for the debtor', 'Legal name and registered office'],
          ['Authorisation to issue the notice', 'Board resolution or authority letter']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Notices Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A round figure with no computation', 'The quantum becomes the dispute', 'Invoice-wise schedule annexed'],
          ['Credits and part payments not adjusted', 'Credibility lost on arithmetic', 'Full reconciliation before drafting'],
          ['Gross demanded where TDS was deducted', 'Signals an unreconciled claim', 'Net figure, with the deduction shown'],
          ['Retention demanded before it is due', 'The entire demand looks premature', 'Retention identified and timed'],
          ['Interest asserted with no basis', 'The demand reads as inflated', 'Contractual, MSMED or Interest Act basis stated'],
          ['MSMED entitlement not claimed', 'A far stronger interest basis forgone', 'Eligibility and registration date checked first'],
          ['Wrong entity or address', 'Service denied', 'Company records verified'],
          ['Directors named without basis', 'Weakens the notice; risks a complaint', 'Named only where there is a legal foundation'],
          ['Criminal action threatened without foundation', 'Counter-complaint and hardened positions', 'Only the route actually intended is named'],
          ['Arbitration clause overlooked', 'A suit threat that cannot be carried out', 'Contract read before drafting'],
          ['General notice sent before a statutory demand', 'May create the pre-existing dispute', 'Sequencing assessed against the intended route'],
          ['Returned envelope opened', 'Evidence of service degraded', 'Preserved sealed with the endorsement'],
          ['Dispatch proof not retained', 'Service contested', 'Records captured on the day of sending'],
          ['Settlement left verbal', 'Default recurs with nothing enforceable', 'Dated terms with a default clause']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Claim reconciliation', 'Invoice-wise statement net of credits, payments, retention and TDS'],
          ['Contract review', 'Payment terms, interest, retention, jurisdiction and arbitration clauses'],
          ['Limitation review', 'Applicable period, expiry and the effect of any acknowledgement'],
          ['Interest computation', 'Contractual, MSMED or Interest Act basis'],
          ['MSMED eligibility check', 'Classification and registration date against the contract'],
          ['Dispute assessment', 'What the other side can raise, and when it was first raised'],
          ['Route alignment', 'Notice built for the proceeding actually intended'],
          ['Party and address verification', 'Legal name, registered office and authorised recipients'],
          ['Notice drafting', 'Demand with schedule, basis, deadline and named consequence'],
          ['Dispatch and service record', 'Trackable modes, with evidence retained'],
          ['Reply analysis', 'Admissions, disputes and their timing'],
          ['Employer or debtor-side reply drafting', 'Where you have received a notice'],
          ['Settlement documentation', 'Schedule, security, default clause and closure'],
          ['Filing readiness', 'Annexed file prepared for the chosen forum'],
          ['Advocate coordination', 'Brief, chronology and evidence file'],
          ['Ticket-based tracking', 'Reconciliation, drafting, dispatch, reply, settlement and filing']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A recovery notice is a proof, not a protest. The ones that get paid annex an invoice-wise statement the recipient can tick off against their own ledger, state the interest basis instead of asserting a rate, and name the specific route that follows. And the sequence matters as much as the words — a general notice sent before a statutory demand can hand the other side the dispute that closes your best remedy.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a notice is required, what it should contain, the applicable limitation period and the appropriate route depend entirely on the documents, the parties and the facts. Statutory timelines and thresholds change by notification and should be confirmed as at the relevant date. Parts of this guide remain under professional review. Estabizz provides document review, claim reconciliation, limitation and interest computation, drafting support, dispatch coordination, reply analysis and settlement documentation; appearance before a court, tribunal or council is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
