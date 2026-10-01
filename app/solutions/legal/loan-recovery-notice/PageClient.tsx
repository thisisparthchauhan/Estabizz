'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'limitation', title: 'Three Years, and How to Restart It' },
  { id: 'proof', title: 'Can You Actually Prove the Loan' },
  { id: 'route', title: 'Choosing the Recovery Route' },
  { id: 'notice-contents', title: 'What the Notice Must Contain' },
  { id: 'computation', title: 'Computing the Amount' },
  { id: 'guarantor', title: 'Co-Borrowers and Guarantors' },
  { id: 'secured', title: 'Secured Lenders and SARFAESI' },
  { id: 'cheque', title: 'The Cheque Dishonour Route' },
  { id: 'summary-suit', title: 'Summary Suit Under Order XXXVII' },
  { id: 'ibc', title: 'The Insolvency Route' },
  { id: 'conduct', title: 'Lawful Recovery Conduct' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'responses', title: 'After the Notice' },
  { id: 'borrower-side', title: 'If You Have Received One' },
  { id: 'settlement', title: 'Settlement and One-Time Settlement' },
  { id: 'common-issues', title: 'Why Recovery Fails' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a loan recovery notice?', 'A formal demand to a borrower, co-borrower or guarantor for repayment of an outstanding loan, overdue instalments, interest or secured debt, setting a period to pay and stating what follows if they do not.'],
  ['Is it mandatory before recovery proceedings?', 'Not for an ordinary civil recovery suit. It is mandatory or near-essential on specific routes — a SARFAESI demand under Section 13(2), an IBC demand under Section 8, and the statutory notice in a cheque dishonour matter.'],
  ['How long do I have to recover a loan?', 'Generally three years for money lent, under the Limitation Act. Lenders consistently assume it is longer, particularly on friendly or family loans where nobody was counting.'],
  ['When does the three years start?', 'It depends on the nature of the loan and its terms — broadly from when the loan was made or became repayable, and for instalments the position can differ instalment by instalment. The starting point should be fixed from the documents, not estimated.'],
  ['Can the limitation period be extended?', 'Yes, and this is the most valuable thing a lender can know. Under Section 18 of the Limitation Act, a written acknowledgement of liability signed by the borrower, made **before** the period expires, starts a fresh period running from the date of that acknowledgement.'],
  ['What counts as an acknowledgement?', 'A writing signed by the borrower acknowledging the liability. It need not promise to pay or state an amount, but it must acknowledge the liability and be signed. An email, a letter, a signed statement of account or a confirmation of balance can qualify depending on its terms.'],
  ['What if the acknowledgement comes after three years?', 'It generally does not revive a claim that is already time-barred. That is why the timing is everything — an acknowledgement obtained in month thirty-four is gold, and the same words in month thirty-eight may be worth nothing.'],
  ['Does part payment help?', 'Yes. Under Section 19, a part payment of the debt made before the period expires also starts a fresh period from the date of payment, where the statutory conditions are met.'],
  ['My borrower keeps saying they will pay. Does that help?', 'Verbally, no. Get it in writing and signed. A WhatsApp message in which the borrower acknowledges the debt is worth far more than six months of reassuring phone calls — and unlike the calls, it can be produced.'],
  ['I lent money to a friend with no agreement. Can I recover it?', 'Possibly. The loan still has to be proved — bank transfer records, messages discussing the loan and repayment, witnesses, and any acknowledgement. Cash loans with no record are the hardest, which is why the evidence review comes before the notice.'],
  ['Which recovery route should I use?', 'It depends on whether the debt is secured, who the borrower is, whether a cheque was given, whether there is an arbitration clause and how much is owed. Choosing the route is the strategic decision; the notice follows from it.'],
  ['What is a summary suit?', 'A procedure under Order XXXVII of the CPC for certain liquidated money claims, in which the defendant must obtain leave to defend. Where it is available it is materially faster than an ordinary suit.'],
  ['What is the SARFAESI route?', 'For a secured creditor within the Act, enforcement of security without court intervention, beginning with a demand notice under Section 13(2) giving sixty days. The borrower may make a representation under Section 13(3A) and challenge measures before the DRT under Section 17.'],
  ['Can a private lender use SARFAESI?', 'No. SARFAESI is available to secured creditors within the scope of the Act, principally banks and notified financial institutions. A private individual who lent money against property cannot invoke it.'],
  ['When is the cheque route available?', 'Where a cheque given towards the debt is dishonoured. The notice must be sent within thirty days of intimation of dishonour and must demand payment within fifteen days of receipt. The timelines are strict.'],
  ['Can I use the IBC to recover a debt?', 'It is an insolvency process, not a recovery mechanism, and courts have been clear about that. It is available against a corporate debtor on an operational or financial debt, subject to threshold and other requirements, and a pre-existing dispute raised within ten days of a Section 8 notice will usually defeat it.'],
  ['Can I proceed against the guarantor directly?', 'Under the Indian Contract Act the liability of a surety is co-extensive with that of the principal debtor unless the contract provides otherwise, so a creditor can generally proceed against the guarantor without first exhausting remedies against the borrower. The guarantee deed terms still matter.'],
  ['Does a settlement with the borrower release the guarantor?', 'It can. Variations in the contract or a release or discharge of the principal debtor can discharge the surety under the Contract Act. Any settlement should be drafted with the guarantor position consciously addressed.'],
  ['What interest can I claim?', 'As the loan agreement provides. Where no rate is agreed, the position is more constrained, and penal charges must be founded on the contract. An inflated interest computation undermines an otherwise strong claim.'],
  ['Are there limits on how I can recover?', 'Yes. Harassment, public shaming, abusive calls, contacting the borrower’s employer or contacts, and coercive tactics are unlawful, and regulated lenders are additionally bound by the fair practices framework. Beyond the illegality, it hands the borrower a counter-narrative.'],
  ['The borrower has disappeared. What now?', 'Trace the current address through available records, serve at the last known address and keep the returned envelope, and consider substituted service in the proceedings. Keep watching the limitation date throughout.'],
  ['I have received a recovery notice I dispute. What should I do?', 'Reply within the time given, dispute the computation specifically with your own figures, and do not inadvertently acknowledge liability in terms that restart limitation against you. If it is a SARFAESI notice, the Section 13(3A) representation window matters.'],
  ['What if the amount demanded is wrong?', 'Dispute the quantum with a computation rather than a general denial, and ask for the statement of account on which the figure is based.'],
  ['What is a one-time settlement?', 'A negotiated full-and-final payment, usually at a discount. It should be documented properly, including what happens on default and the position of any guarantor and any security.'],
  ['What is the biggest mistake lenders make?', 'Waiting. Three years passes while the lender is being patient, no written acknowledgement is ever obtained, and a perfectly good debt becomes unrecoverable.'],
  ['Can Estabizz appear in court?', 'We handle loan document and evidence review, limitation analysis, route selection, notice drafting, guarantor and security review, settlement documentation and advocate coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Recovery' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Loan Recovery Notice' }]}
      title="Loan Recovery Notice"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Loan Recovery Notice"
      sections={sections}
      ctaTitle="Speak With a Recovery Expert"
      ctaDescription="Limitation checked, the loan actually provable, the right route chosen, and a demand the borrower cannot simply ignore."
      quickFacts={[
        { label: 'Limitation', value: '3 years, money lent' },
        { label: 'Restarts it', value: 'Signed acknowledgement' },
        { label: 'Must be', value: 'Before expiry' },
        { label: 'SARFAESI demand', value: '60 days' }
      ]}
      relatedArticles={[
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice and complaint deadlines, director liability and interim compensation.' },
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'When a notice is legally mandatory, what it must say, and service and proof.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="Patience Is How Good Debts Die"
      finalCtaDescription="Three years passes quietly while a lender is being reasonable. Get the limitation date on paper, get a signed acknowledgement before it runs, and choose the route deliberately — in that order."
      heroDescription={<p>Most unrecovered loans were recoverable once. What killed them was not the borrower&rsquo;s resistance but the lender&rsquo;s patience: three years of reassurance, no written acknowledgement, and a claim that quietly became unenforceable. A recovery notice is worth sending only once two questions are answered — can the loan actually be proved, and where does limitation stand. Estabizz assists lenders, NBFCs, fintech lenders, businesses, private and family lenders, companies and guarantors with loan document and evidence review, limitation analysis, outstanding computation, route selection across civil, summary suit, cheque, SARFAESI, DRT and insolvency, notice drafting, guarantor and security review, settlement documentation and borrower-side responses.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a loan recovery notice formally demands repayment and warns of what comes next.</p>
        <p>It is the easy part. The decisions that determine whether you actually recover anything are made before it is drafted: whether the loan can be proved, whether it is still within time, who else is liable, and which of six or seven recovery routes fits.</p>
        <p>This page covers both sides — recovering, and responding if a notice has landed on you.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A loan recovery notice is not a licence or a filing. It is a legal demand.</p>
        <p>Which framework governs depends on who is lending and what secures the debt — the Contract Act and Limitation Act always, and then SARFAESI, the DRT framework, the NI Act, the IBC or arbitration depending on the facts. For regulated lenders, the RBI fair practices framework governs conduct throughout.</p>
      </Section>

      <Section id="limitation" title="Three Years, and How to Restart It">
        <div className="warning-box" aria-label="Limitation">
          <p><strong>A suit for money lent must generally be brought within three years.</strong> That is shorter than almost every lender assumes, and it runs quietly while everyone is being reasonable. Friendly and family loans are the worst affected, because nobody is tracking a date and nobody wants to be the one who formalises things.</p>
        </div>
        <div className="info-box" aria-label="Acknowledgement">
          <p><strong>The single most useful thing a lender can do is obtain a signed acknowledgement — before the period expires.</strong> Under Section 18 of the Limitation Act, where an acknowledgement of liability is made in writing and signed by the borrower <em>before</em> the prescribed period expires, a fresh period of limitation runs from the date of that acknowledgement. Under Section 19, a part payment made before expiry has a comparable effect. The timing is decisive: an acknowledgement obtained at month thirty-four preserves the debt; the same words at month thirty-eight generally do not revive one already barred.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['General period for money lent', 'Three years'],
          ['When it starts', 'Depends on the loan terms — from when lent or when repayable; instalments may run separately'],
          ['Written acknowledgement', 'Section 18 — fresh period from the date of acknowledgement'],
          ['Must be signed', 'Yes, by the party against whom the right is claimed'],
          ['Must be before expiry', 'Yes — this is the critical condition'],
          ['Part payment', 'Section 19 — fresh period from the date of payment, on the statutory conditions'],
          ['Verbal assurance', 'Does not extend limitation'],
          ['What can qualify', 'A letter, email, signed statement of account or balance confirmation, depending on its terms'],
          ['Practical discipline', 'Get a balance confirmation signed annually']
        ]} />
        <DataTable headers={['How to obtain an acknowledgement without a confrontation', 'Why it works']} rows={[
          ['Send a statement of account for confirmation', 'Routine, non-adversarial, and signed if returned'],
          ['Ask for a revised repayment schedule in writing', 'Acknowledges the debt in the act of rescheduling'],
          ['Accept a small part payment', 'Section 19 may start a fresh period'],
          ['Confirm settlement discussions by email', 'A reply acknowledging the amount can assist'],
          ['Record any extension of time in writing', 'The indulgence and the acknowledgement in one document'],
          ['Avoid relying on messages alone', 'Assess whether the writing meets the statutory requirement'],
          ['Do it early', 'Everything here depends on being inside the period']
        ]} />
      </Section>

      <Section id="proof" title="Can You Actually Prove the Loan">
        <p>Before limitation, there is a blunter question. A notice demanding repayment of a loan you cannot evidence invites a denial that the loan ever existed.</p>
        <DataTable headers={['Evidence', 'Weight']} rows={[
          ['Written loan agreement', 'Strongest — terms, rate and repayment all documented'],
          ['Promissory note or loan deed', 'Strong, and may open the summary suit route'],
          ['Bank transfer records', 'Proves the money moved and to whom'],
          ['Cheque given towards repayment', 'Supports the debt and may open the Section 138 route'],
          ['Messages discussing the loan and repayment', 'Often the decisive evidence in friendly loans'],
          ['Signed acknowledgement or balance confirmation', 'Proves the debt and affects limitation'],
          ['Ledger or books of account', 'Important for business lending'],
          ['Security or guarantee documents', 'Extends who and what you can proceed against'],
          ['Witnesses to the transaction', 'Useful where documentation is thin'],
          ['Cash with no record', 'The weakest position — assess honestly before proceeding']
        ]} />
      </Section>

      <Section id="route" title="Choosing the Recovery Route">
        <DataTable headers={['Route', 'Available when', 'Practical note']} rows={[
          ['Civil recovery suit', 'Generally available', 'Slower, but the default route'],
          ['Summary suit under Order XXXVII', 'Certain liquidated claims on specified instruments', 'Faster — defendant needs leave to defend'],
          ['Cheque dishonour under Section 138', 'A cheque towards the debt was dishonoured', 'Strict thirty-day and fifteen-day timelines'],
          ['SARFAESI enforcement', 'Secured creditor within the Act', 'Not available to private lenders'],
          ['DRT recovery', 'Banks and financial institutions above the threshold', 'Specialist forum'],
          ['IBC against a corporate debtor', 'Operational or financial debt, threshold met', 'An insolvency process, not a recovery tool'],
          ['Arbitration', 'The agreement contains an arbitration clause', 'Check before filing anywhere else'],
          ['Proceedings against the guarantor', 'A guarantee exists', 'Liability generally co-extensive'],
          ['Settlement', 'Always worth assessing', 'Often the best commercial outcome']
        ]} />
        <div className="warning-box" aria-label="Arbitration clause">
          <p><strong>Check for an arbitration clause before anything else.</strong> A loan agreement with an arbitration clause can make a civil suit the wrong forum, and a recovery notice threatening a suit tells the borrower&rsquo;s lawyer that nobody read the agreement. Where arbitration applies, the notice should invoke it under Section 21 of the Arbitration and Conciliation Act.</p>
        </div>
      </Section>

      <Section id="notice-contents" title="What the Notice Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Lender and borrower particulars', 'Correct legal names and addresses'],
          ['Co-borrowers and guarantors', 'Named if you intend to proceed against them'],
          ['The loan transaction', 'Date, amount, mode of disbursal and purpose'],
          ['The agreement or instrument relied on', 'Identified and annexed'],
          ['Repayment terms', 'Schedule, rate of interest and due dates'],
          ['The default', 'Which instalments, from which date'],
          ['Computation of the outstanding', 'Principal, interest and charges, separately'],
          ['Any payments received', 'Credited, with dates — this also matters for limitation'],
          ['Security held', 'Described, where applicable'],
          ['The demand', 'A specific amount, payable within a stated period'],
          ['Consequence of non-payment', 'The route you will actually take'],
          ['Reservation of rights', 'Preserves remedies not being pursued now'],
          ['Statutory formalities', 'Where the route prescribes them, as in SARFAESI or Section 138']
        ]} />
      </Section>

      <Section id="computation" title="Computing the Amount">
        <DataTable headers={['Component', 'How to handle it']} rows={[
          ['Principal outstanding', 'After crediting every payment received'],
          ['Contractual interest', 'At the agreed rate, with the computation shown'],
          ['Period of interest', 'Stated clearly, with the from and to dates'],
          ['Penal charges', 'Only where the contract provides, and reasonably'],
          ['Compounding', 'Only if the agreement permits it'],
          ['Payments received', 'Credited transparently, in date order'],
          ['Appropriation', 'State how payments were applied between interest and principal'],
          ['Costs claimed', 'Separately identified'],
          ['Annexure', 'A statement of account the borrower can check'],
          ['What to avoid', 'A single round figure with no working behind it']
        ]} />
        <p>An inflated or unexplained figure is the most common reason a notice is ignored. A computation the borrower can verify is harder to dismiss and much easier to settle against.</p>
      </Section>

      <Section id="guarantor" title="Co-Borrowers and Guarantors">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Surety’s liability', 'Co-extensive with that of the principal debtor, unless the contract provides otherwise'],
          ['Must the lender exhaust the borrower first', 'Generally no, unless the guarantee says so'],
          ['Notice to the guarantor', 'Advisable, and often required by the guarantee terms'],
          ['Continuing guarantee', 'Check whether and how it can be revoked'],
          ['Variation of the contract', 'Can discharge the surety under the Contract Act'],
          ['Release or discharge of the principal debtor', 'Can discharge the surety'],
          ['Loss of security by the creditor', 'Can discharge the surety to that extent'],
          ['Settlement with the borrower', 'Draft it so the guarantor position is preserved if that is intended'],
          ['Guarantor’s right on paying', 'Rights against the principal debtor arise'],
          ['Practical point', 'Read the guarantee deed before assuming anything']
        ]} />
        <div className="info-box" aria-label="Settlement risk">
          <p><strong>A settlement with the borrower can inadvertently release the guarantor.</strong> Under the Contract Act, variation of the terms, or a release or discharge of the principal debtor, can discharge the surety. Lenders who settle with a borrower on soft terms, intending to pursue the guarantor for the balance, sometimes find they have given away the very security they were relying on. Address it expressly in the settlement.</p>
        </div>
      </Section>

      <Section id="secured" title="Secured Lenders and SARFAESI">
        <DataTable headers={['Stage', 'Provision', 'What happens']} rows={[
          ['Demand notice', 'Section 13(2)', 'Sixty days to discharge the liability in full'],
          ['Borrower representation', 'Section 13(3A)', 'The secured creditor must consider and respond'],
          ['Enforcement measures', 'Section 13(4)', 'Possession, management or sale of the secured asset'],
          ['Assistance of the Magistrate', 'Section 14', 'For taking possession, where required'],
          ['Borrower challenge', 'Section 17', 'Application to the Debts Recovery Tribunal'],
          ['Appeal', 'Section 18', 'To the Appellate Tribunal'],
          ['Who can use it', 'Secured creditors within the Act', 'Not available to private individual lenders'],
          ['Classification of the account', 'A precondition in practice', 'Follow the applicable framework carefully'],
          ['Procedural rigour', 'Essential', 'Defects in the notice or process are the usual ground of challenge']
        ]} />
      </Section>

      <Section id="cheque" title="The Cheque Dishonour Route">
        <p>Where a cheque was given towards the debt and has bounced, this route runs in parallel with civil recovery and often produces faster engagement. The timelines are unforgiving.</p>
        <DataTable headers={['Step', 'Timeline']} rows={[
          ['Cheque presented and dishonoured', 'Obtain the bank memo'],
          ['Notice to the drawer', 'Within thirty days of receiving intimation of dishonour'],
          ['Demand in the notice', 'Payment within fifteen days of the drawer receiving it'],
          ['If unpaid', 'The cause of action for a complaint arises'],
          ['Complaint', 'Within the period the statute allows thereafter'],
          ['Practical value', 'Criminal exposure frequently prompts settlement'],
          ['Caution', 'A time-barred debt cheque raises its own issues — take advice']
        ]} />
        <p>The full process is on the <Link href="/solutions/legal/cheque-bounce-in-india">Cheque Bounce in India</Link> page.</p>
      </Section>

      <Section id="summary-suit" title="Summary Suit Under Order XXXVII">
        <DataTable headers={['Point', 'Position']} rows={[
          ['What it is', 'A summary procedure for certain liquidated money claims'],
          ['Typical basis', 'Bills of exchange, promissory notes and written contracts for a liquidated demand'],
          ['Key advantage', 'The defendant must apply for leave to defend'],
          ['Effect', 'A defendant without a genuine defence cannot simply delay'],
          ['Leave to defend', 'Granted where a triable issue is raised'],
          ['Why it matters', 'Materially faster where available'],
          ['Documentation', 'The claim must be properly founded on a qualifying instrument or contract'],
          ['Assess early', 'Whether your documents support this route shapes everything']
        ]} />
      </Section>

      <Section id="ibc" title="The Insolvency Route">
        <div className="warning-box" aria-label="Not a recovery tool">
          <p><strong>The IBC is an insolvency resolution process, not a debt collection mechanism, and courts have said so repeatedly.</strong> Using it purely as recovery pressure against a solvent company tends to fail, and can attract criticism. It is available against a corporate debtor where the statutory requirements are met — and a genuine pre-existing dispute raised by the corporate debtor within ten days of a Section 8 demand notice will usually defeat an operational creditor application.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Against whom', 'A corporate debtor'],
          ['Operational creditor', 'Demand notice under Section 8, then application under Section 9'],
          ['Financial creditor', 'Application under Section 7'],
          ['Reply window', 'Ten days from receipt of the Section 8 notice'],
          ['Pre-existing dispute', 'Raised in that window, it generally defeats the application'],
          ['Threshold', 'The prescribed minimum default amount must be met'],
          ['Limitation', 'Applies — a time-barred debt is not rescued by this route'],
          ['Consequence for the creditor', 'A resolution process, not necessarily full payment'],
          ['When it genuinely fits', 'Where the debtor is actually unable to pay']
        ]} />
      </Section>

      <Section id="conduct" title="Lawful Recovery Conduct">
        <div className="warning-box" aria-label="Conduct">
          <p><strong>How you recover matters as much as whether you are owed.</strong> Harassment, abusive or repeated calls at unreasonable hours, public shaming, contacting the borrower&rsquo;s employer, relatives or social contacts, threatening criminal action to extract payment, and coercive field collection are unlawful. For regulated lenders the RBI fair practices framework applies in addition. Beyond the legal exposure, improper conduct hands the borrower a counter-narrative that can dominate the proceedings.</p>
        </div>
        <DataTable headers={['Permissible', 'Not permissible']} rows={[
          ['A formal written demand', 'Abusive or threatening language'],
          ['Reasonable contact at reasonable hours', 'Repeated calls designed to harass'],
          ['Communicating with the borrower and guarantor', 'Contacting employers, relatives or social contacts to pressure'],
          ['Stating the legal consequences accurately', 'Threatening criminal action as leverage'],
          ['Lawful enforcement of security', 'Forcible seizure or self-help repossession'],
          ['Reporting to a credit bureau as permitted', 'Public shaming or disclosure on social media'],
          ['Engaging a recovery agent within the framework', 'Allowing an agent to act outside it'],
          ['Keeping records of all contact', 'Deleting the record of how collection was conducted']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Contract', 'Indian Contract Act, 1872'],
          ['Guarantee', 'Indian Contract Act, Sections 126 onwards'],
          ['Limitation', 'Limitation Act, 1963'],
          ['Civil procedure', 'Code of Civil Procedure, 1908'],
          ['Summary suit', 'CPC Order XXXVII'],
          ['Commercial disputes', 'Commercial Courts Act, 2015'],
          ['Cheque dishonour', 'Negotiable Instruments Act, 1881, Section 138'],
          ['Secured enforcement', 'SARFAESI Act, 2002'],
          ['Bank and FI recovery', 'Recovery of Debts and Bankruptcy Act, 1993'],
          ['Insolvency', 'Insolvency and Bankruptcy Code, 2016'],
          ['Arbitration', 'Arbitration and Conciliation Act, 1996'],
          ['Regulated lender conduct', 'RBI fair practices framework'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Security interests', 'Transfer of Property Act and registration of charges']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Limitation Act Section 18', 'Written signed acknowledgement before expiry gives a fresh period'],
          ['Limitation Act Section 19', 'Part payment before expiry gives a fresh period'],
          ['Limitation Act Section 3', 'Suits beyond the period are to be dismissed'],
          ['Contract Act Section 128', 'Surety’s liability co-extensive with the principal debtor'],
          ['Contract Act Sections 133 to 139', 'Discharge of surety by variance, release or loss of security'],
          ['Contract Act Sections 73 and 74', 'Damages and stipulated sums'],
          ['CPC Order XXXVII', 'Summary procedure for liquidated claims'],
          ['NI Act Section 138', 'Cheque dishonour — thirty-day and fifteen-day timelines'],
          ['SARFAESI Sections 13(2), 13(3A), 13(4), 14, 17', 'Demand, representation, enforcement, possession and challenge'],
          ['RDB Act, 1993', 'DRT jurisdiction for banks and financial institutions'],
          ['IBC Sections 7, 8 and 9', 'Financial and operational creditor applications'],
          ['Arbitration Act Section 21', 'Notice invoking arbitration']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Loan agreement or deed', 'Terms, rate and repayment schedule'],
          ['Promissory note, if any', 'May support the summary suit route'],
          ['Disbursal proof', 'Bank transfer or payment record'],
          ['Repayment schedule', 'Instalments and due dates'],
          ['Statement of account or ledger', 'Outstanding computation'],
          ['Record of payments received', 'Credits and limitation implications'],
          ['Any written acknowledgement', 'Critical to the limitation analysis'],
          ['Messages and correspondence', 'Evidence of the loan and of acknowledgement'],
          ['Security documents', 'Mortgage, hypothecation or pledge'],
          ['Guarantee deed', 'Guarantor liability and its limits'],
          ['Cheques and bank memos', 'Section 138 route'],
          ['Borrower KYC and current address', 'Service of the notice'],
          ['Company documents for a corporate borrower', 'Authority and the IBC position'],
          ['Prior notices or demands', 'Consistency and history']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Document and evidence review', 'Whether the loan can be proved'],
          ['2', 'Limitation analysis', 'Start date, expiry, and any acknowledgement'],
          ['3', 'Acknowledgement strategy', 'Where the period is running out'],
          ['4', 'Outstanding computation', 'Principal, interest and charges, with a statement'],
          ['5', 'Security and guarantee review', 'Who and what you can proceed against'],
          ['6', 'Clause review', 'Arbitration, jurisdiction and default provisions'],
          ['7', 'Route selection', 'Civil, summary, cheque, SARFAESI, DRT, IBC or arbitration'],
          ['8', 'Notice drafting', 'With computation and annexures'],
          ['9', 'Dispatch and service', 'Trackable mode, proof preserved'],
          ['10', 'Response handling', 'Reply, dispute, part payment or silence'],
          ['11', 'Settlement documentation', 'Terms, schedule and default consequences'],
          ['12', 'Escalation', 'Filing on the chosen route, within limitation']
        ]} />
      </Section>

      <Section id="responses" title="After the Notice">
        <DataTable headers={['Response', 'Significance', 'What follows']} rows={[
          ['Full payment', 'Matter closed', 'Acknowledge receipt and discharge'],
          ['Part payment', 'May affect limitation under Section 19', 'Credit it, record the date, continue'],
          ['Request for time with a written admission', 'Valuable — may restart limitation', 'Document the extension carefully'],
          ['Settlement proposal', 'Negotiation opens', 'Document terms, schedule and default'],
          ['Denial of the loan', 'The proof question becomes central', 'Assemble the evidence before filing'],
          ['Dispute on quantum only', 'Liability effectively admitted', 'Reconcile and narrow the dispute'],
          ['Counter-allegations', 'Often a negotiating position', 'Assess, do not react'],
          ['Silence', 'No engagement', 'Proceed on the chosen route within limitation'],
          ['Notice returned unclaimed', 'Avoidance', 'Preserve the envelope and proceed']
        ]} />
      </Section>

      <Section id="borrower-side" title="If You Have Received One">
        <DataTable headers={['Do', 'Do not']} rows={[
          ['Check the computation against your own records', 'Assume the figure is correct'],
          ['Check whether the claim is within limitation', 'Overlook a time-bar in your favour'],
          ['Reply within the time given', 'Ignore it'],
          ['Dispute quantum specifically, with figures', 'Issue a vague general denial'],
          ['Take advice before any written admission', 'Inadvertently acknowledge and restart limitation'],
          ['Check the notice against the loan agreement', 'Accept charges the contract does not support'],
          ['Respond within the SARFAESI representation window', 'Let the Section 13(3A) opportunity pass'],
          ['Raise a genuine pre-existing dispute on an IBC notice', 'Miss the ten-day window'],
          ['Keep a record of recovery conduct', 'Tolerate harassment without documenting it'],
          ['Explore settlement if the debt is genuine', 'Let it escalate while doing nothing']
        ]} />
        <div className="info-box" aria-label="Careful with admissions">
          <p><strong>Be careful what you put in writing.</strong> A reply that disputes the interest but concedes the principal is an acknowledgement of liability, and under Section 18 it can start a fresh three-year period running against you. That may be the right thing to do if the debt is genuine and you want to settle — but it should be a decision, not an accident.</p>
        </div>
      </Section>

      <Section id="settlement" title="Settlement and One-Time Settlement">
        <DataTable headers={['Term', 'Why it belongs in the document']} rows={[
          ['The settled amount', 'Stated as full and final, and what it covers'],
          ['Payment schedule', 'Dates, amounts and mode'],
          ['Consequence of default', 'Revival of the full claim, typically'],
          ['Treatment of interest', 'Waived, reduced or retained on default'],
          ['Security', 'Released on payment, or held until then'],
          ['Guarantor position', 'Expressly preserved or released, deliberately'],
          ['Withdrawal of proceedings', 'Which ones, and when'],
          ['Cheque or post-dated instruments', 'Return or retention'],
          ['Credit reporting', 'How the account will be reported, where applicable'],
          ['Confidentiality', 'Where either side wants it'],
          ['Discharge', 'Issued only on full performance']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Recovery Fails">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Lender waited and the three years ran', 'The debt becomes unenforceable', 'Limitation fixed at the first meeting'],
          ['No written acknowledgement ever obtained', 'Nothing restarted the clock', 'Acknowledgement strategy before expiry'],
          ['Acknowledgement sought after expiry', 'Generally does not revive the claim', 'Timing driven by the limitation date'],
          ['Loan cannot be proved', 'Denial that it ever existed', 'Honest evidence review before the notice'],
          ['Arbitration clause overlooked', 'Wrong forum threatened and then used', 'Agreement reviewed first'],
          ['Inflated computation', 'Notice ignored, settlement harder', 'Verifiable statement of account annexed'],
          ['Guarantor released by a careless settlement', 'Security given away', 'Guarantor position addressed expressly'],
          ['SARFAESI attempted by a private lender', 'Route simply unavailable', 'Correct route selected at the outset'],
          ['IBC used as recovery pressure', 'Application fails, costs incurred', 'Honest assessment of whether it fits'],
          ['Cheque notice sent after thirty days', 'The route is lost', 'Timelines calendared from the bank memo'],
          ['Harassment during collection', 'Legal exposure and a counter-narrative', 'Lawful, documented recovery conduct'],
          ['No proof of service', 'Service disputed', 'Trackable dispatch with records kept']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Loan document and evidence review', 'Whether the debt can be proved'],
          ['Limitation analysis', 'Start date, expiry and acknowledgement position'],
          ['Acknowledgement strategy', 'Obtaining one lawfully before the period runs'],
          ['Outstanding computation', 'A statement the borrower can verify'],
          ['Security and charge review', 'What can be enforced'],
          ['Guarantee review', 'Guarantor liability and discharge risks'],
          ['Route selection', 'Civil, summary, cheque, SARFAESI, DRT, IBC or arbitration'],
          ['Notice drafting', 'Borrower, co-borrower and guarantor'],
          ['SARFAESI demand review', 'Procedural compliance for secured creditors'],
          ['Cheque dishonour strategy', 'Within the statutory timelines'],
          ['IBC demand assessment', 'Whether the route genuinely fits'],
          ['Borrower-side response', 'Replies that do not concede more than intended'],
          ['Settlement documentation', 'Schedule, default and guarantor position'],
          ['Recovery conduct review', 'Keeping collection inside the law'],
          ['Advocate coordination', 'Filing and appearance support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Most bad debts were good debts that nobody dated. Three years runs quietly while the lender is being decent about it, and no signed acknowledgement is ever obtained because asking felt awkward. Fix the limitation date on day one, get a balance confirmation signed every year, and choose the recovery route before drafting the notice rather than after the borrower's lawyer points out the arbitration clause.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Limitation depends on the nature of the loan, its terms and the facts, and the effect of any acknowledgement or part payment must be assessed on the particular document. Which recovery route is available depends on the lender, the borrower, the security and the agreement. Nothing here should be treated as advice that a particular claim is or is not within time. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides document review, limitation analysis, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
