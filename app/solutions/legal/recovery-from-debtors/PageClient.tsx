'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'route-matrix', title: 'The Route Decides the Outcome' },
  { id: 'msmed', title: 'The MSMED Route' },
  { id: 'tax-lever', title: 'The Tax Lever on Your Buyer' },
  { id: 'mediation', title: 'The Mediation Gate' },
  { id: 'summary-suit', title: 'Summary Suit Under Order XXXVII' },
  { id: 'ibc', title: 'The Insolvency Route and Its Threshold' },
  { id: 'arbitration', title: 'Where There Is an Arbitration Clause' },
  { id: 'cheque', title: 'Where a Cheque Was Given' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'debtor-type', title: 'Who the Debtor Is' },
  { id: 'evidence', title: 'Proving the Debt' },
  { id: 'limitation', title: 'Limitation and How to Preserve It' },
  { id: 'criminal', title: 'When It Is Not a Criminal Matter' },
  { id: 'execution', title: 'Winning Is Not Recovering' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'common-issues', title: 'Why Recovery Fails' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is the fastest route to recover a business debt?', 'There is no single answer, and the honest one is that the fastest route depends on who the debtor is, what documents exist and whether you are a registered micro or small enterprise. For a registered micro or small supplier, the MSMED route is usually both fastest and most valuable. For a written contract or a dishonoured cheque, a summary suit. For a company owing over a crore with no genuine dispute, the insolvency route creates the most pressure.'],
  ['What is the MSMED 45-day rule?', 'Section 15 of the MSMED Act requires a buyer to pay a micro or small supplier by the agreed date, and in any event within forty-five days of acceptance or deemed acceptance of the goods or services. An agreed credit period longer than forty-five days does not override it.'],
  ['What interest can an MSME claim?', 'Section 16 provides compound interest with monthly rests at three times the bank rate notified by the Reserve Bank, from the appointed day. It applies regardless of what the contract says about interest, and on an old overdue invoice the interest can approach or exceed the principal.'],
  ['Do I have to be registered to use the MSMED route?', 'Yes, and the timing matters more than most suppliers realise. The Supreme Court has held that a party not classified as a supplier under the Act on the date of the contract cannot claim its benefits for that contract — registration operates prospectively, for transactions entered into afterwards. Registering after the invoice goes unpaid does not retrospectively bring the supply within the Act.'],
  ['Does an arbitration clause in my contract block the MSEFC route?', 'No. In Gujarat State Civil Supplies Corporation v. Mahakali Foods the Supreme Court held that a reference to the Facilitation Council under Section 18 is maintainable despite an independent arbitration agreement — Chapter V of the MSMED Act overrides the Arbitration and Conciliation Act in this respect.'],
  ['How does the MSEFC process work?', 'The Council first attempts conciliation under Section 18(2). If that fails, it either takes up the dispute as arbitration itself or refers it to an institution, and the Arbitration and Conciliation Act applies as though there were an arbitration agreement. The Council is directed to decide the reference within ninety days.'],
  ['Can the buyer simply challenge the award?', 'They can apply to set it aside, but Section 19 requires the buyer to deposit seventy-five per cent of the amount awarded before the application is entertained. That deposit requirement is the real commercial force of the MSMED route.'],
  ['Is there a tax consequence for my buyer if they do not pay?', 'Yes, and it is often more persuasive than the interest. Under the Income-tax Act, 2025, Section 37(2)(g) carries forward the rule previously in Section 43B(h) of the 1961 Act: a payment to a micro or small enterprise outside the MSMED time limit is deductible only in the year it is actually paid. The buyer therefore loses the deduction in the year of the expense, and there is no relief for paying by the return due date.'],
  ['What is Section 12A pre-institution mediation?', 'For a commercial dispute of the specified value, Section 12A of the Commercial Courts Act requires the plaintiff to exhaust pre-institution mediation before instituting a suit, unless the suit contemplates urgent interim relief. The specified value is three lakh rupees and above, so most B2B receivables are caught.'],
  ['Is it really mandatory?', 'Yes. In Patil Automation v. Rakheja Engineers the Supreme Court held Section 12A is mandatory, and that a suit filed in breach of it is liable to be rejected under Order VII Rule 11. This is not a formality that can be skipped.'],
  ['Can I avoid mediation by asking for an injunction?', 'Not by simply adding a prayer. In Yamini Manohar v. T.K.D. Keerthi the Supreme Court held there is no absolute right to bypass Section 12A by making a prayer for urgent interim relief; the court examines whether urgent relief is genuinely contemplated or whether the prayer is camouflage.'],
  ['How long does the mediation take?', 'The authority is to complete the process within three months of the application, extendable by two months with the consent of the parties. It is conducted through the Legal Services Authority under the 2018 Rules.'],
  ['Is a settlement in that mediation enforceable?', 'Yes, and that is the underrated part of the process. A settlement arrived at under Section 12A has the same status and effect as an arbitral award on agreed terms, so it is enforceable as a decree rather than being merely another promise to pay.'],
  ['When can I file a summary suit?', 'Under Order XXXVII of the Code of Civil Procedure, for suits on bills of exchange, hundis and promissory notes, and for suits to recover a debt or liquidated demand arising on a written contract, an enactment, or a guarantee for a debt or liquidated demand. The advantage is that the defendant must obtain leave to defend, which they get only by raising a triable issue.'],
  ['What is the IBC threshold?', 'One crore rupees. Since the notification of 24 March 2020, the minimum amount of default for an application under Sections 7, 9 or 10 is one crore, and that threshold must be satisfied on the date the application is filed. Operational creditors cannot club separate claims to reach it.'],
  ['Is the IBC a debt recovery tool?', 'No, and treating it as one is how applications get dismissed with costs. The Code is an insolvency resolution framework. Where it is used purely as recovery pressure against a solvent company, tribunals say so.'],
  ['What is a pre-existing dispute and why does it matter?', 'Under the Mobilox Innovations test, if the corporate debtor shows a plausible contention requiring further investigation — raised before the demand notice — the Section 9 application must be rejected. The defence need not be likely to succeed; it only has to be more than moonshine. This is why an unanswered quality complaint sitting in your inbox can defeat an otherwise clean claim.'],
  ['Can I use the IBC against an individual or a partnership firm?', 'Sections 7 and 9 apply to a corporate debtor — a company or an LLP. A proprietorship or an ordinary partnership is pursued through the civil, summary suit or arbitration route instead.'],
  ['Should I file a criminal complaint to put pressure on?', 'Only where the facts genuinely support it. A payment default is a civil matter. Criminal provisions require deception from the outset, or entrustment and dishonest conversion. Filing a criminal complaint over a commercial default invites a quashing petition and adverse observations, and it rarely accelerates payment.'],
  ['What is the limitation period?', 'Generally three years, but the starting point differs by claim — for goods sold and delivered it runs from the date of delivery where no credit period was agreed, and from the expiry of the credit period where one was. Check the applicable Article rather than assuming a single date.'],
  ['Can limitation be extended?', 'Yes. Under Section 18 of the Limitation Act a written acknowledgement of liability signed before the period expires starts a fresh period, and under Section 19 a part payment does the same. A signed ledger confirmation obtained annually is the cheapest limitation management there is.'],
  ['Will a ledger confirmation signed by the debtor help?', 'Considerably. It can establish the balance, acknowledge liability and restart limitation at the same time. Obtaining them as routine practice at year end is worth more than any amount of chasing later.'],
  ['Can I claim interest if my contract is silent?', 'Often yes — under the Interest Act, from the date of a written demand, and the court has discretion to award interest pendente lite and on the decree. The MSMED position is different and far stronger. An unsupported interest figure in a demand weakens the whole claim, so compute it on a stated basis.'],
  ['The debtor says the goods were defective. What now?', 'Assess it honestly before choosing a route. A genuine quality dispute closes the insolvency route, complicates the summary suit and is better dealt with through reconciliation or mediation. A dispute raised for the first time after your notice is a different matter, and the timing is the point.'],
  ['I have a decree but still no money. What next?', 'Execution is a separate proceeding and often harder than obtaining the decree. It involves identifying assets, attachment, garnishee of bank accounts and receivables, and where appropriate examination of the judgment debtor about their means. Factor it into the decision at the start, not at the end.'],
  ['What is the biggest mistake in debtor recovery?', 'Sending reminders for two years and then choosing a route in a hurry when limitation is near. By then the evidence has aged, the MSMED registration timing cannot be fixed, and the options have narrowed to the slowest one.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Commercial' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Recovery From Debtors' }]}
      title="Recovery From Debtors"
      readTime="17 min read"
      hideReviewBadge
      focusKeyword="Recovery From Debtors"
      sections={sections}
      ctaTitle="Speak With a Debt Recovery Expert"
      ctaDescription="Classify the debtor, check the MSMED position and the limitation date, then choose the route — in that order."
      quickFacts={[
        { label: 'MSME payment limit', value: '45 days' },
        { label: 'MSMED interest', value: '3× bank rate, compounded' },
        { label: 'IBC threshold', value: '₹1 crore' },
        { label: 'Mediation trigger', value: '₹3 lakh specified value' }
      ]}
      relatedArticles={[
        { title: 'Recovery Notice of Dues', href: '/solutions/legal/recovery-notice-of-dues', category: 'Legal', description: 'Drafting the demand, computing the claim, and serving it so it can be proved.' },
        { title: 'Loan Recovery Notice', href: '/solutions/legal/loan-recovery-notice', category: 'Legal', description: 'Lender-side recovery — money lent, guarantors, SARFAESI and one-time settlement.' },
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice and complaint deadlines, director liability and interim compensation.' }
      ]}
      finalCtaTitle="Route First, Notice Second"
      finalCtaDescription="The same unpaid invoice can go to a Facilitation Council, a commercial court, a tribunal or an arbitrator — with completely different speed, cost and leverage. Choosing badly is the most expensive thing you can do."
      heroDescription={<p>Unpaid receivables are not a collections problem; they are a forum selection problem. The same invoice can be pursued before a Micro and Small Enterprises Facilitation Council with interest at three times the bank rate, through a summary suit where the defendant needs leave to defend, through a tribunal where a crore is at stake, or through a civil suit that takes years — and the choice is largely determined before you send a single notice. Estabizz assists businesses, suppliers, service providers, lenders and professionals with debtor classification, evidence and limitation review, MSMED eligibility assessment, pre-institution mediation, notice drafting, forum selection, filing coordination, settlement documentation and execution strategy.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> recovering a debt is less about pressure and more about picking the right forum and getting there before the claim ages.</p>
        <p>Most creditors do the opposite. They send reminders for eighteen months, then a strongly worded notice, then ask a lawyer what can be done. By that point the choices have narrowed considerably: the MSMED registration position is fixed, limitation is close, the debtor has had time to construct a dispute, and the only route still comfortably open is the slowest one.</p>
        <p>The creditors who recover well decide the route early, often before the first invoice is overdue by a quarter, and send a notice built for that route rather than a general complaint about not being paid.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Recovery from debtors is not a licence or a registration. It is the pursuit of a legally enforceable money claim through whichever forum fits the claim.</p>
        <p>There is no single recovery regulator. The applicable framework depends on who owes the money and why: the MSMED Act for a registered micro or small supplier, the Commercial Courts Act and the Code of Civil Procedure for commercial claims, the Arbitration and Conciliation Act where there is a clause, the Negotiable Instruments Act where a cheque was dishonoured, and the Insolvency and Bankruptcy Code for a corporate debtor in default above the statutory threshold.</p>
      </Section>

      <Section id="route-matrix" title="The Route Decides the Outcome">
        <DataTable headers={['Your position', 'Best route to assess first', 'Why']} rows={[
          ['Registered micro or small supplier, unpaid beyond 45 days', 'MSEFC reference under MSMED Section 18', 'Compound interest at three times the bank rate, and a 75 per cent deposit to challenge the award'],
          ['Written contract or a promissory note, liquidated sum', 'Summary suit under Order XXXVII', 'The defendant needs leave to defend, which requires a triable issue'],
          ['Dishonoured cheque for a legally enforceable debt', 'Statutory notice and complaint under Section 138', 'Criminal pressure with a compensation mechanism'],
          ['Company or LLP in default above one crore, no genuine dispute', 'Demand notice under IBC Section 8', 'Insolvency exposure concentrates the mind, where it is genuinely available'],
          ['Contract contains an arbitration clause', 'Notice invoking arbitration under Section 21', 'Filing a suit instead invites a jurisdictional objection'],
          ['Commercial dispute of the specified value, no urgent relief needed', 'Pre-institution mediation under Section 12A first', 'Mandatory; a suit filed without it is liable to be rejected'],
          ['Claim below the commercial specified value', 'Ordinary civil suit', 'The commercial court framework does not apply'],
          ['Debtor is an individual or a proprietorship', 'Civil or summary suit; cheque route if available', 'The insolvency provisions for corporate debtors do not apply'],
          ['Genuine quality or performance dispute exists', 'Reconciliation or mediation', 'A real dispute closes the insolvency route and complicates the rest'],
          ['Debtor is willing but illiquid', 'Documented settlement with a default clause', 'A schedule you can execute beats an order you cannot'],
          ['Security or a charge exists', 'Enforcement of the security', 'Realising security is usually faster than a money decree'],
          ['Limitation is close to expiring', 'Whatever preserves the claim now', 'A written acknowledgement or filing, before anything else']
        ]} />
      </Section>

      <Section id="msmed" title="The MSMED Route">
        <div className="info-box" aria-label="Why the MSMED route is different">
          <p><strong>If you are a registered micro or small enterprise, this is usually the strongest route available and it is routinely overlooked.</strong> It carries a statutory payment deadline the contract cannot extend, compound interest at a punitive rate, a dedicated forum with a ninety-day target, a seventy-five per cent deposit requirement before the buyer can challenge the award, and a tax consequence that hits the buyer whether or not you ever litigate.</p>
        </div>
        <DataTable headers={['Provision', 'What it gives you']} rows={[
          ['MSMED Section 15', 'Payment by the agreed date, and in any event within forty-five days of acceptance or deemed acceptance'],
          ['Agreed credit beyond 45 days', 'Does not displace the statutory limit'],
          ['MSMED Section 16', 'Compound interest with monthly rests at three times the bank rate notified by the Reserve Bank'],
          ['Effect of a contrary contract term', 'The statutory interest applies regardless of what the contract says'],
          ['MSMED Section 17', 'Liability of the buyer for the amount with interest'],
          ['MSMED Section 18', 'Reference to the Micro and Small Enterprises Facilitation Council'],
          ['Council procedure', 'Conciliation first; if it fails, arbitration by the Council or an institution it refers to'],
          ['Timeline', 'The Council is to decide the reference within ninety days of the reference'],
          ['MSMED Section 19', 'An application to set aside the award is not entertained without a deposit of seventy-five per cent of the amount'],
          ['Filing', 'Through the Samadhaan portal to the Council having jurisdiction'],
          ['Who may use it', 'Micro and small enterprises; medium enterprises are outside the delayed payment provisions']
        ]} />
        <DataTable headers={['Point to check first', 'Position']} rows={[
          ['Were you registered when the contract was entered into?', 'Critical — registration operates prospectively for transactions entered into afterwards'],
          ['Registration obtained after the supply', 'Does not bring that earlier supply within the Act'],
          ['Your classification', 'Micro or small; a medium enterprise cannot use the delayed payment framework'],
          ['Date of acceptance or deemed acceptance', 'Fixes the appointed day from which interest runs'],
          ['Objection to the goods or services', 'Must have been raised in writing within fifteen days to affect deemed acceptance'],
          ['An arbitration clause in the contract', 'Does not bar a reference to the Council'],
          ['The buyer is a government body or PSU', 'Still within the framework'],
          ['Interest already invoiced', 'Not a precondition — the statutory interest applies independently']
        ]} />
        <p>The registration timing point deserves emphasis because it cannot be fixed later. The Supreme Court in Gujarat State Civil Supplies Corporation v. Mahakali Foods held that a party who was not a supplier under the Act on the date of the contract cannot claim its benefits for that contract. Suppliers who register only when a payment problem arises find the strongest remedy unavailable for precisely the invoices they wanted it for.</p>
      </Section>

      <Section id="tax-lever" title="The Tax Lever on Your Buyer">
        <div className="warning-box" aria-label="Section 37(2)(g) of the Income-tax Act, 2025">
          <p><strong>Your buyer has a tax reason to pay you that is often more persuasive than interest.</strong> Under the Income-tax Act, 2025, <strong>Section 37(2)(g)</strong> carries forward the rule formerly in Section 43B(h) of the 1961 Act: a sum payable to a micro or small enterprise beyond the MSMED time limit is allowed as a deduction only in the year it is actually paid. Unlike other items under that section, there is no relief for paying before the return due date — miss the MSMED clock and the deduction shifts to the year of payment.</p>
        </div>
        <DataTable headers={['Position', 'Consequence for the buyer']} rows={[
          ['Paid within the MSMED time limit', 'Deduction in the year the expense is incurred — the normal position'],
          ['Paid late, but in the same year', 'Allowed in that year'],
          ['Unpaid at year end, beyond the MSMED limit', 'Disallowed that year; deductible only when actually paid'],
          ['Paid before the return filing due date', 'No relief — unlike other items under the provision'],
          ['Supplier is a medium enterprise', 'The disallowance does not apply'],
          ['Supplier registered after the contract', 'Assess carefully; the MSMED position governs'],
          ['Effect at tax audit', 'The position is reported, so it surfaces whether or not you pursue it'],
          ['Practical use for the supplier', 'Mention the exposure in correspondence; it reaches the buyer’s finance team']
        ]} />
        <p>This is worth raising in a professional, factual register rather than as a threat. A buyer&rsquo;s accounts team frequently does not know the position, and a note setting out the disallowance consequence alongside the interest computation moves old invoices more often than a strongly worded reminder does.</p>
      </Section>

      <Section id="mediation" title="The Mediation Gate">
        <div className="warning-box" aria-label="Section 12A is mandatory">
          <p><strong>For a commercial dispute of the specified value, you cannot file a suit without first exhausting pre-institution mediation.</strong> Section 12A of the Commercial Courts Act requires it unless the suit contemplates urgent interim relief, and in Patil Automation v. Rakheja Engineers the Supreme Court held the requirement mandatory — a suit filed in breach is liable to be rejected under Order VII Rule 11. The specified value is three lakh rupees and above, so most business receivable claims are caught.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['When it applies', 'Commercial disputes of the specified value, where no urgent interim relief is contemplated'],
          ['Specified value', 'Three lakh rupees and above'],
          ['Consequence of skipping it', 'The plaint is liable to be rejected under Order VII Rule 11'],
          ['The urgent relief exception', 'Not available simply by praying for an injunction'],
          ['How the exception is tested', 'The court examines whether urgent relief is genuinely contemplated or the prayer is camouflage'],
          ['Who conducts it', 'The authority notified under the Legal Services Authorities Act'],
          ['Procedure', 'Commercial Courts (Pre-Institution Mediation and Settlement) Rules, 2018'],
          ['Timeline', 'Three months from the application, extendable by two months with consent'],
          ['Effect on limitation', 'The mediation period is excluded in computing limitation'],
          ['If the other side does not participate', 'A non-starter report issues, and the suit may then be filed'],
          ['If it settles', 'The settlement has the status and effect of an arbitral award on agreed terms'],
          ['Why that matters', 'It is enforceable as a decree, not merely another payment promise']
        ]} />
        <p>Treat the mediation as an opportunity rather than an obstacle. A settlement reached there is directly enforceable, which is a materially better outcome than a judgment you still have to execute — and the three-month clock is shorter than the time a contested suit spends on its first few hearings.</p>
      </Section>

      <Section id="summary-suit" title="Summary Suit Under Order XXXVII">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Available for', 'Bills of exchange, hundis and promissory notes'],
          ['Also available for', 'A debt or liquidated demand arising on a written contract, an enactment, or a guarantee for such a demand'],
          ['The advantage', 'The defendant cannot defend as of right — leave to defend must be obtained'],
          ['When leave is granted', 'Where the defence raises a triable issue'],
          ['When leave is refused', 'Where the defence is frivolous or vexatious, and the plaintiff is entitled to judgment'],
          ['When leave is conditional', 'Commonly on deposit of the claimed amount or part of it'],
          ['Why that is valuable', 'A conditional deposit often produces settlement'],
          ['What takes a claim outside it', 'Unliquidated damages, or a claim not founded on a written instrument or contract'],
          ['Interaction with Section 12A', 'A commercial summary suit still passes through the mediation gate'],
          ['Practical requirement', 'The written instrument must be clean — an oral arrangement will not do']
        ]} />
        <p>This is the route that rewards good documentation. A supply arrangement reduced to a signed contract, or a debt supported by a promissory note, converts a recovery action from a contested trial into a leave application the debtor has to win.</p>
      </Section>

      <Section id="ibc" title="The Insolvency Route and Its Threshold">
        <div className="warning-box" aria-label="The IBC is not a recovery tool">
          <p><strong>The Insolvency and Bankruptcy Code is not a debt collection mechanism, and using it as one goes badly.</strong> Two hard limits apply before strategy is even relevant: the default must be at least <strong>one crore rupees</strong>, satisfied on the date the application is filed, and there must be no pre-existing dispute. Separate operational creditors cannot club their claims to reach the threshold.</p>
        </div>
        <DataTable headers={['Requirement', 'Position']} rows={[
          ['Minimum default', 'One crore rupees, under the notification of 24 March 2020'],
          ['When the threshold is tested', 'On the date of filing the application'],
          ['Clubbing of separate creditors', 'Not permitted to reach the threshold'],
          ['Who can be proceeded against', 'A corporate debtor — a company or an LLP'],
          ['Demand notice', 'Section 8, in the prescribed form, with the invoice or the demand'],
          ['Time to respond', 'Ten days'],
          ['Application', 'Section 9, before the National Company Law Tribunal'],
          ['Pre-existing dispute', 'Bars admission where it is a plausible contention requiring investigation'],
          ['The Mobilox test', 'The defence need not be likely to succeed; it must be more than moonshine or bluster'],
          ['Timing of the dispute', 'It must pre-date the demand notice to count'],
          ['Limitation', 'The Limitation Act applies; three years from the date of default'],
          ['Misuse', 'Using the Code against a solvent company purely as pressure invites dismissal and costs']
        ]} />
        <p>The pre-existing dispute point is where most operational creditor applications fail, and it is usually decided by correspondence the creditor already has. An email complaining about quality, a debit note raised months ago, an unanswered reconciliation request — any of these can furnish the plausible contention. Review the file for what the debtor could point to before serving a Section 8 notice, not after they do.</p>
      </Section>

      <Section id="arbitration" title="Where There Is an Arbitration Clause">
        <DataTable headers={['Point', 'Position']} rows={[
          ['A clause exists', 'A suit on the same dispute invites an application to refer the parties to arbitration'],
          ['Commencing arbitration', 'A notice invoking arbitration under Section 21 of the Arbitration and Conciliation Act'],
          ['Why the notice matters', 'Proceedings commence on the date the respondent receives it; it also fixes limitation'],
          ['Appointment of the tribunal', 'Per the clause; failing agreement, by application to the court'],
          ['Cost', 'Usually higher than a civil claim of the same size — relevant for small receivables'],
          ['Speed', 'Statutory timelines apply to the award, and are generally faster than a contested suit'],
          ['Enforcement', 'An award is enforced as a decree'],
          ['MSMED interaction', 'A clause does not bar a reference to the Facilitation Council'],
          ['Interim relief', 'Available from the tribunal, and from the court before it is constituted'],
          ['Pre-institution mediation', 'Section 12A applies to suits, not to arbitration']
        ]} />
        <p>Where the sum is modest and the clause provides for a three-member tribunal, the arbitration may cost more than the claim. That is worth saying plainly at the outset, because the clause was usually drafted for a different kind of dispute than an unpaid invoice.</p>
      </Section>

      <Section id="cheque" title="Where a Cheque Was Given">
        <p>A dishonoured cheque is frequently the most practical lever available, because the timelines are short and the consequence is criminal. The deadlines are unforgiving and run from events you must evidence.</p>
        <DataTable headers={['Step', 'Position']} rows={[
          ['Presentation', 'Within the validity of the instrument'],
          ['Dishonour', 'Bank return memo, which fixes the date'],
          ['Statutory notice', 'Within thirty days of receiving information of the dishonour'],
          ['Payment window', 'Fifteen days from receipt of the notice'],
          ['Complaint', 'Within one month of the expiry of that window'],
          ['Requirement', 'The cheque must have been issued for a legally enforceable debt or liability'],
          ['Company drawer', 'Director and officer liability is governed by the separate liability provision'],
          ['Interim compensation', 'The court may direct interim compensation during the proceedings'],
          ['Effect on civil recovery', 'The civil claim is not displaced; the routes run in parallel'],
          ['Missed deadline', 'The statutory route is lost, though civil recovery survives']
        ]} />
        <p>See <Link href="/solutions/legal/cheque-bounce-in-india">Cheque Bounce in India</Link> for the full procedure, defences and director liability position.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Contractual basis of the claim', 'Indian Contract Act, 1872'],
          ['Civil procedure', 'Code of Civil Procedure, 1908'],
          ['Summary procedure', 'Order XXXVII of the Code of Civil Procedure'],
          ['Commercial disputes', 'Commercial Courts Act, 2015'],
          ['Pre-institution mediation', 'Section 12A, with the 2018 Rules'],
          ['Delayed payment to micro and small enterprises', 'MSMED Act, 2006, Chapter V'],
          ['Tax consequence of delayed MSME payment', 'Income-tax Act, 2025, Section 37(2)(g)'],
          ['Dishonoured cheques', 'Negotiable Instruments Act, 1881'],
          ['Arbitration', 'Arbitration and Conciliation Act, 1996'],
          ['Corporate insolvency', 'Insolvency and Bankruptcy Code, 2016'],
          ['Bank and financial institution debt', 'Recovery of Debts and Bankruptcy Act, 1993'],
          ['Secured creditor enforcement', 'SARFAESI Act, 2002, for eligible creditors'],
          ['Limitation', 'Limitation Act, 1963'],
          ['Interest where the contract is silent', 'Interest Act, 1978, and the court’s discretion'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63'],
          ['Criminal elements, where genuinely present', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Forums', 'Civil court, commercial court, Facilitation Council, arbitral tribunal, NCLT, Magistrate court or DRT']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['MSMED Act, Section 15', 'Forty-five day outer limit for payment to a micro or small supplier'],
          ['MSMED Act, Section 16', 'Compound interest at three times the bank rate'],
          ['MSMED Act, Section 17', 'Buyer’s liability for the amount with interest'],
          ['MSMED Act, Section 18', 'Reference to the Facilitation Council, with a ninety-day target'],
          ['MSMED Act, Section 19', 'Seventy-five per cent deposit before a challenge to the award is entertained'],
          ['Income-tax Act, 2025, Section 37(2)(g)', 'Deduction only on actual payment for delayed MSME dues'],
          ['Commercial Courts Act, Section 2(1)(c)', 'What is a commercial dispute'],
          ['Commercial Courts Act, specified value', 'Three lakh rupees and above'],
          ['Commercial Courts Act, Section 12A', 'Mandatory pre-institution mediation, subject to the urgent relief exception'],
          ['CPC, Order XXXVII', 'Summary suit, with leave to defend'],
          ['CPC, Order XXI', 'Execution of a decree'],
          ['IBC, Section 8', 'Operational creditor demand notice, with ten days to respond'],
          ['IBC, Section 9', 'Application to initiate the corporate insolvency resolution process'],
          ['IBC, Section 4', 'Minimum default threshold, currently one crore rupees'],
          ['NI Act, Section 138', 'Dishonour of a cheque for insufficiency of funds'],
          ['NI Act, Section 141', 'Offences by companies and officer liability'],
          ['Arbitration Act, Section 21', 'Commencement of arbitral proceedings'],
          ['Limitation Act, Section 18', 'Written acknowledgement starts a fresh period'],
          ['Limitation Act, Section 19', 'Part payment starts a fresh period'],
          ['Contract Act, Sections 73 and 74', 'Compensation for breach, and where a sum is named']
        ]} />
      </Section>

      <Section id="debtor-type" title="Who the Debtor Is">
        <DataTable headers={['Debtor', 'Routes available', 'Point to note']} rows={[
          ['Private or public company', 'Civil, summary, commercial, arbitration, cheque, IBC', 'Verify the registered office from company records before serving anything'],
          ['LLP', 'Same as a company, including the insolvency route', 'Partners are not personally liable for the LLP’s debts absent a guarantee'],
          ['Partnership firm', 'Civil, summary, commercial, arbitration, cheque', 'Partners are personally liable; name them'],
          ['Proprietorship', 'Civil, summary, commercial, arbitration, cheque', 'The proprietor is the debtor; the trade name is not a legal person'],
          ['Individual', 'Civil, summary, cheque', 'Personal assets and means are the practical question'],
          ['Government department or PSU', 'Civil, arbitration, MSEFC where applicable', 'Statutory notice requirements may apply before suing'],
          ['Debtor who has dissolved or struck off', 'Restoration, or action against those behind it', 'Check the company’s status before spending on a claim'],
          ['Debtor already in insolvency', 'File a claim with the resolution professional', 'The moratorium bars separate proceedings'],
          ['Debtor with a guarantor', 'Proceed against both', 'A guarantee is usually the most realistic security'],
          ['Debtor who has absconded', 'Service by alternative modes, then ex parte', 'Identify assets early; a decree against an untraceable person is worth little']
        ]} />
      </Section>

      <Section id="evidence" title="Proving the Debt">
        <DataTable headers={['Evidence', 'What it establishes', 'Strength']} rows={[
          ['Signed contract or purchase order', 'The agreement and its terms', 'Strongest — and opens the summary suit route'],
          ['Invoices', 'The amount claimed', 'Strong when matched to delivery and acceptance'],
          ['Delivery challan with acknowledgement', 'That goods were supplied and received', 'Strong'],
          ['Service completion or sign-off', 'That the work was done and accepted', 'Strong'],
          ['Signed ledger confirmation', 'The balance, liability and an acknowledgement', 'Very strong — also restarts limitation'],
          ['Part payment', 'Admission of the debt', 'Very strong — also restarts limitation'],
          ['Email agreeing the amount', 'Acknowledgement of liability', 'Strong, if from an authorised person'],
          ['Chat records promising payment', 'Admission and the payment commitment', 'Useful, subject to proof requirements'],
          ['Bank statements', 'What was paid and what was not', 'Corroborative'],
          ['Tax filings reflecting the supply', 'That the transaction was recognised by both sides', 'Useful corroboration'],
          ['Promissory note or cheque', 'Liability on the instrument itself', 'Very strong, with its own routes'],
          ['Unanswered reconciliation request', 'Silence in the face of a stated balance', 'Helpful; the absence of objection matters'],
          ['An oral arrangement only', 'Little, standing alone', 'Weak — build the claim from the surrounding documents']
        ]} />
        <p>Electronic records carry much of the weight in modern commercial recovery, and Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam govern how they are proved. Preserve complete threads from the original account rather than assembling screenshots after the dispute has hardened.</p>
      </Section>

      <Section id="limitation" title="Limitation and How to Preserve It">
        <DataTable headers={['Claim', 'Period', 'When it starts']} rows={[
          ['Price of goods sold and delivered, no fixed credit period', 'Three years', 'The date of delivery'],
          ['Price of goods sold and delivered, fixed credit period agreed', 'Three years', 'When the credit period expires'],
          ['Money lent', 'Three years', 'When the loan is made, or as the terms provide'],
          ['Money payable for work done', 'Three years', 'When the work is done, or when the bill is delivered where that is agreed'],
          ['Compensation for breach of contract', 'Three years', 'When the contract is broken'],
          ['Claims with no specific article', 'Three years', 'When the right to sue accrues'],
          ['Written acknowledgement before expiry', 'Fresh three years', 'From the date of the acknowledgement, under Section 18'],
          ['Part payment before expiry', 'Fresh three years', 'From the date of payment, under Section 19'],
          ['IBC application', 'Three years', 'From the date of default'],
          ['Pre-institution mediation period', 'Excluded', 'In computing limitation for the suit']
        ]} />
        <div className="info-box" aria-label="Preserving limitation">
          <p><strong>The cheapest limitation management is an annual signed ledger confirmation.</strong> A confirmation signed by the debtor before the period expires acknowledges liability, fixes the balance and starts a fresh three years — all in one document that most finance teams are already circulating at year end. Creditors who do this routinely rarely lose claims to limitation; those who rely on verbal assurances frequently do.</p>
        </div>
      </Section>

      <Section id="criminal" title="When It Is Not a Criminal Matter">
        <p>A criminal complaint is sometimes proposed as a shortcut. It is rarely one, and where the facts do not support it the consequences run the other way.</p>
        <DataTable headers={['Situation', 'Correct characterisation']} rows={[
          ['Goods supplied, invoice unpaid', 'Civil or commercial recovery'],
          ['Payment promised and not made', 'Civil; a broken promise is not deception'],
          ['Business failed and could not pay', 'Civil; inability is not dishonesty'],
          ['Cheque dishonoured', 'The statutory cheque route, which is its own remedy'],
          ['Deception present from the outset, inducing supply', 'Cheating may be examined on those facts'],
          ['Money entrusted for a purpose and diverted', 'Criminal breach of trust may be examined'],
          ['Forged documents used to obtain credit', 'Forgery and cheating may be examined'],
          ['Disputed accounts', 'Civil; reconciliation is the answer'],
          ['Filing a criminal case to force payment', 'Invites a quashing petition and adverse observations']
        ]} />
        <p>See <Link href="/solutions/legal/criminal-misappropriation-of-property">Criminal Misappropriation of Property</Link> for where the line genuinely falls, and <Link href="/solutions/legal/quashing-of-fir-and-complaint">Quashing of FIR and Complaint</Link> for what happens when a commercial dispute is criminalised without foundation.</p>
      </Section>

      <Section id="execution" title="Winning Is Not Recovering">
        <p>A decree or an award is a piece of paper until it is executed, and execution is frequently harder than obtaining the judgment. Factor it into the route decision at the beginning.</p>
        <DataTable headers={['Execution step', 'What it involves']} rows={[
          ['Identifying assets', 'Bank accounts, receivables, immovable property, plant and vehicles'],
          ['Attachment', 'Attaching identified property before it is dissipated'],
          ['Garnishee', 'Attaching money owed to the debtor by third parties'],
          ['Attachment of bank accounts', 'Usually the fastest realisation where accounts are identified'],
          ['Examination of the judgment debtor', 'Compelling disclosure of means and assets'],
          ['Sale of attached property', 'Realisation through court process'],
          ['Arrest and detention', 'Available in limited circumstances for wilful non-payment'],
          ['Appointment of a receiver', 'Where a business can be realised as a going concern'],
          ['Enforcement of an award', 'An arbitral award is enforced as a decree'],
          ['Practical constraint', 'A debtor with no traceable assets yields nothing, whatever the decree says']
        ]} />
        <p>This is the strongest argument for a documented settlement over a contested judgment. A payment schedule with a default clause, supported by post-dated instruments or a guarantee, often recovers more money sooner than a decree against a debtor whose assets cannot be found.</p>
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Amount, debtor, documents and urgency'],
          ['2', 'Debtor classification', 'Company, LLP, firm, proprietorship or individual, with records verified'],
          ['3', 'Limitation review', 'The applicable period and the date it expires'],
          ['4', 'MSMED eligibility', 'Registration status and, critically, its timing against the contract'],
          ['5', 'Evidence review', 'What can actually be proved, and what cannot'],
          ['6', 'Dispute assessment', 'What the debtor could raise, and when they first raised it'],
          ['7', 'Claim computation', 'Principal, interest on a stated basis, credits and part payments'],
          ['8', 'Route selection', 'Forum chosen on the claim, the debtor and the evidence'],
          ['9', 'Notice drafting', 'Demand built for the route selected'],
          ['10', 'Service and proof', 'Dispatch through trackable modes, with records retained'],
          ['11', 'Mediation or response', 'Section 12A process, or analysis of the reply'],
          ['12', 'Settlement documentation', 'Schedule, security and default clause'],
          ['13', 'Filing coordination', 'Filing-ready file and advocate briefing'],
          ['14', 'Execution planning', 'Asset identification and realisation strategy'],
          ['15', 'Tracking', 'Ticket-based status updates to recovery']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Contract, purchase order or work order', 'The agreement and its terms'],
          ['Invoices', 'The amount claimed'],
          ['Delivery challans with acknowledgement', 'Proof of supply'],
          ['Service completion or acceptance records', 'Proof the work was done'],
          ['Ledger statement', 'The running balance'],
          ['Signed ledger confirmation', 'Acknowledgement and limitation'],
          ['Bank statements', 'Payment history'],
          ['Email and chat records', 'Admissions and payment promises'],
          ['Reminder correspondence', 'Prior demand history'],
          ['Credit and debit notes', 'The net amount actually payable'],
          ['Tax invoices and filings', 'Recognition of the transaction'],
          ['Cheque and return memo', 'The cheque route'],
          ['Promissory note', 'The summary suit route'],
          ['Udyam registration certificate, with date', 'MSMED eligibility and its timing'],
          ['Arbitration clause', 'Forum'],
          ['Guarantee documents', 'Additional parties liable'],
          ['Security documents', 'Enforcement route'],
          ['Company master data for the debtor', 'Correct entity, registered office and officers'],
          ['Any dispute raised by the debtor', 'Assessment before choosing the insolvency route']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Recovery Fails">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Eighteen months of reminders, then a rushed decision', 'Options narrowed to the slowest route', 'Route selection at the first default, not at limitation'],
          ['MSMED registration obtained after the contract', 'The strongest remedy is unavailable for those invoices', 'Registration position checked at onboarding, not at default'],
          ['MSEFC route never considered', 'Punitive interest and the deposit requirement forgone', 'MSMED eligibility assessed in every B2B matter'],
          ['Suit filed without Section 12A mediation', 'Plaint liable to be rejected', 'Mediation completed, or the urgent relief position properly assessed'],
          ['Injunction prayer added to dodge mediation', 'The court sees through it', 'Honest assessment of whether urgent relief is contemplated'],
          ['IBC notice served where a dispute exists', 'Application dismissed, costs, and the debtor forewarned', 'Correspondence reviewed for a pre-existing dispute first'],
          ['IBC used below the threshold', 'Not maintainable', 'Threshold tested on the filing date; no clubbing'],
          ['Arbitration clause overlooked', 'Suit met with a reference application', 'Contract read before the forum is chosen'],
          ['Cheque route deadline missed', 'The statutory remedy is lost', 'Deadlines diarised from the return memo date'],
          ['Interest claimed with no stated basis', 'The demand looks inflated and invites dispute', 'Interest computed on contract, statute or the Interest Act'],
          ['Credits and part payments not adjusted', 'The debtor attacks the quantum instead of the liability', 'Reconciled claim before the notice issues'],
          ['Criminal complaint filed over a commercial default', 'Quashing petition and adverse observations', 'Honest characterisation at the outset'],
          ['Decree obtained with no asset picture', 'Nothing to execute against', 'Asset identification planned before filing'],
          ['Settlement left undocumented', 'Default recurs with nothing enforceable', 'Schedule, security and default clause in writing']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Debtor classification', 'Entity verification, registered office and officers'],
          ['Limitation review', 'Applicable Article, start date and expiry'],
          ['MSMED eligibility assessment', 'Classification and registration timing against the contract'],
          ['MSEFC reference support', 'Samadhaan filing, computation and conciliation support'],
          ['Interest computation', 'Statutory, contractual or Interest Act basis'],
          ['Tax exposure note', 'The Section 37(2)(g) position for the buyer'],
          ['Evidence review', 'What can be proved, and the gaps'],
          ['Pre-existing dispute assessment', 'Before any insolvency notice is served'],
          ['Route selection', 'Forum chosen on the claim, debtor and evidence'],
          ['Pre-institution mediation', 'Section 12A application and process support'],
          ['Notice drafting', 'Demand built for the route chosen'],
          ['Summary suit preparation', 'Order XXXVII eligibility and filing-ready file'],
          ['IBC demand notice', 'Section 8 notice where it is genuinely available'],
          ['Arbitration notice', 'Section 21 invocation and tribunal constitution'],
          ['Cheque route support', 'Deadline management, notice and complaint'],
          ['Settlement documentation', 'Schedule, security, default clause and closure terms'],
          ['Execution strategy', 'Asset identification, attachment and garnishee planning'],
          ['Advocate coordination', 'Brief, chronology and evidence file'],
          ['Ticket-based tracking', 'Documents, notice, mediation, filing, orders and recovery']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Recovery is decided by forum selection, and forum selection is decided by facts that are fixed long before anyone is unpaid — whether you registered as a micro or small enterprise before the contract, whether the arrangement is in writing, whether you obtained a ledger confirmation last year. Creditors who manage those three things recover routinely. Creditors who send reminders for two years and then look for a remedy find the strongest ones have already closed.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal or tax advice. The appropriate route, the limitation period, the availability of the MSMED framework and the prospects of recovery depend entirely on the documents, the parties and the facts. Statutory thresholds, the specified value and notified rates change by notification and should be confirmed as at the relevant date. The tax position described reflects the Income-tax Act, 2025, which applies from tax year 2026-27. Parts of this guide remain under professional review. Estabizz provides document and evidence review, limitation and eligibility assessment, claim computation, drafting support, settlement documentation and filing coordination; appearance before a court, tribunal or council is through enrolled advocates. Confirm the position with your advocate and tax adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
