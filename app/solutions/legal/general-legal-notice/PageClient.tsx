'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'mandatory', title: 'When a Notice Is Legally Mandatory' },
  { id: 'optional', title: 'When It Is Optional but Decisive' },
  { id: 'when-not', title: 'When Not to Send One' },
  { id: 'limitation', title: 'A Notice Does Not Stop the Clock' },
  { id: 'anatomy', title: 'The Anatomy of a Notice That Works' },
  { id: 'avoid', title: 'What Weakens a Notice' },
  { id: 'recipients', title: 'Getting the Recipient Right' },
  { id: 'service', title: 'Service and Proof of Dispatch' },
  { id: 'forum', title: 'Forum, Jurisdiction and Arbitration Clauses' },
  { id: 'types', title: 'Types of Notice We Draft' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'responses', title: 'What Happens After It Is Sent' },
  { id: 'replying', title: 'Replying to a Notice You Received' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'specific-notices', title: 'Specific Notices We Cover Separately' },
  { id: 'common-issues', title: 'Why Notices Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a legal notice?', 'A formal written communication asserting a legal right — demanding payment, performance, correction, refund or cessation — and usually warning of proceedings if the demand is not met within a stated period.'],
  ['Is a legal notice always mandatory before suing?', 'No. In most disputes it is optional. But in a defined set of cases it is a statutory precondition, and skipping it can defeat the proceeding outright.'],
  ['Where is it mandatory?', 'The main ones are a suit against the Government or a public officer under Section 80 of the CPC, a cheque dishonour complaint under Section 138 of the Negotiable Instruments Act, an operational creditor demand under Section 8 of the IBC, enforcement by a secured creditor under Section 13(2) of the SARFAESI Act, and invocation of arbitration under Section 21 of the Arbitration and Conciliation Act.'],
  ['What is the notice period for a suit against the Government?', 'Section 80 of the CPC requires two months’ written notice before instituting the suit, subject to the limited leave the section allows in urgent cases.'],
  ['What are the cheque bounce timelines?', 'The notice must be sent within thirty days of receiving intimation of dishonour from the bank, and it must demand payment within fifteen days of the drawer receiving it. Both are strict and miss-able.'],
  ['What is the IBC demand notice period?', 'Under Section 8, the corporate debtor has ten days from receipt to pay or to raise a dispute. A pre-existing dispute raised in that window is the usual reason an application later fails.'],
  ['What is a SARFAESI 13(2) notice?', 'A demand notice from a secured creditor giving the borrower sixty days to discharge the liability before enforcement steps can be taken.'],
  ['Why does the arbitration notice matter?', 'A notice invoking arbitration under Section 21 generally fixes the date on which the arbitral proceedings commence, which matters for limitation and for the appointment process. It is not a formality.'],
  ['Does sending a notice extend my limitation period?', 'No, and this is the most expensive misunderstanding in pre-litigation practice. The Limitation Act clock keeps running while you correspond. Months of notices and replies come out of the same period you have to sue in.'],
  ['So should I send a notice at all if time is short?', 'Sometimes not. Where limitation is close, the better course is often to file and negotiate afterwards. Where a notice is a statutory precondition, build its period into your timetable rather than discovering it late.'],
  ['What should a notice contain?', 'The parties, the facts in date order, the legal basis, the specific demand, a reasonable deadline, and what will follow if it is not met. Quote documents rather than characterising them.'],
  ['Should I state an exact amount?', 'Yes, where money is claimed — with a computation. A round unexplained figure invites a dismissive reply and makes settlement harder.'],
  ['How much time should I give?', 'Whatever the statute prescribes, if it prescribes anything. Otherwise something a court would call reasonable — long enough to comply, short enough to convey seriousness.'],
  ['How should it be sent?', 'By a trackable mode, keeping the dispatch receipt and the tracking record. Email is commonly used alongside physical dispatch. Service is routinely contested, so the proof matters more than people expect.'],
  ['What if the notice comes back undelivered?', 'Refusal to accept, or return with an endorsement, is often treated as good service where it was sent to the correct address. Keep the returned envelope unopened and produce it.'],
  ['Does a lawyer have to send it?', 'No. A notice can be sent by the party. A notice on a lawyer’s letterhead tends to be taken more seriously, but what matters far more is whether it is accurate and well drafted.'],
  ['Can a notice be sent by email alone?', 'It may be effective depending on the context and any contractual notice clause, but relying on email alone is a risk where service is likely to be disputed. Check what the contract says.'],
  ['What if the contract has its own notice clause?', 'Follow it. A contractual notice provision specifying the mode, address or period is usually binding, and ignoring it can invalidate an otherwise good notice.'],
  ['Can a notice be withdrawn or corrected?', 'A corrective communication can be sent, but the original remains on the record. This is a reason to get the facts right before dispatch.'],
  ['What if there is no reply?', 'Silence is useful. Proceed on the timetable you set, annexing the notice and the proof of service. An unanswered notice supports your account of events.'],
  ['Can a notice be used against me later?', 'Yes. Both the notice and the reply may be relied on. Anything overstated in it will be put to you.'],
  ['I have received a notice. Must I reply?', 'Not always, but usually you should. Silence can be characterised as acceptance of the version given, and where the notice is a statutory precondition — an IBC demand, for example — the window to raise a dispute is short and consequential.'],
  ['What if the claim in the notice is inflated?', 'Reply, dispute the quantum specifically with your own computation, and do not concede liability in the process of disputing the amount.'],
  ['What is the biggest mistake?', 'Sending a template. A notice that does not engage with the actual documents, the actual dates and the correct statutory route reads as posturing and is answered as such.'],
  ['Can Estabizz appear in court?', 'We handle case review, limitation and forum analysis, notice and reply drafting, dispatch and service records, response analysis and advocate coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Pre-Litigation' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'General Legal Notice' }]}
      title="General Legal Notice"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="General Legal Notice"
      sections={sections}
      ctaTitle="Speak With a Pre-Litigation Expert"
      ctaDescription="The right statutory route, the correct period, a demand you can support, and a service record that will hold up."
      quickFacts={[
        { label: 'Government suit', value: '2 months, CPC s.80' },
        { label: 'Cheque dishonour', value: '30 days, then 15' },
        { label: 'IBC demand', value: '10 days to reply' },
        { label: 'Limitation', value: 'Keeps running' }
      ]}
      relatedArticles={[
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice and complaint deadlines, director liability and interim compensation.' },
        { title: 'Faulty Product Notice', href: '/solutions/legal/faulty-product-notice', category: 'Legal', description: 'Defective goods, product liability and refund or replacement demands.' },
        { title: 'Defamation Notice', href: '/solutions/legal/defamation-notice', category: 'Legal', description: 'Takedown, apology, retraction and compensation demands for false statements.' }
      ]}
      finalCtaTitle="Find Out Which Notice You Are Sending"
      finalCtaDescription="A statutory notice with a fixed period and an optional demand letter are different documents doing different jobs. Sending the second where the first was required is how proceedings get dismissed at the threshold."
      heroDescription={<p>A legal notice is the step most disputes turn on, and the one most often treated as a formality. Some notices are statutory preconditions with fixed periods — get them wrong and the proceeding fails before the merits are reached. Most are optional, but they set the record, fix the chronology and frequently produce a settlement without litigation. Estabizz assists individuals, businesses, lenders, landlords, tenants, vendors, employers and employees with case and document review, limitation and forum analysis, identifying whether a statutory notice applies, notice drafting, dispatch and service records, reply drafting where a notice has been received, response analysis, settlement documentation and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a legal notice tells the other side what went wrong, what you want, by when, and what happens if they do not comply.</p>
        <p>It does two jobs at once. It creates pressure and an opportunity to settle, and it builds the written record that a court, tribunal or commission will read later. The second job is the one people forget, which is why so many notices are written to be satisfying rather than useful.</p>
        <p>This page covers notices generally. Several specific notices have their own pages, listed further down.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A legal notice is not a licence or a filing. Nothing registers it, and no regulator oversees it.</p>
        <p>Which law governs it depends entirely on the dispute — contract, tenancy, employment, consumer, insolvency, securitisation or arbitration. The first question is therefore not how to word it, but whether a statutory notice is required and what period attaches.</p>
      </Section>

      <Section id="mandatory" title="When a Notice Is Legally Mandatory">
        <div className="warning-box" aria-label="Statutory notices">
          <p><strong>In a defined set of cases a notice is not a courtesy — it is a precondition, with a period fixed by statute.</strong> Send it late, send it short, or skip it, and the proceeding that follows can fail at the threshold regardless of how strong the underlying claim is. These are the ones to identify before anything is drafted.</p>
        </div>
        <DataTable headers={['Situation', 'Provision', 'Period and effect']} rows={[
          ['Suit against the Government or a public officer', 'CPC Section 80', 'Two months’ written notice before instituting the suit'],
          ['Cheque dishonour complaint', 'NI Act Section 138', 'Notice within 30 days of intimation of dishonour, demanding payment within 15 days of receipt'],
          ['Operational creditor before insolvency application', 'IBC Section 8', 'Demand notice; the corporate debtor has 10 days to pay or raise a dispute'],
          ['Secured creditor enforcement', 'SARFAESI Section 13(2)', 'Demand notice giving 60 days to discharge the liability'],
          ['Invoking arbitration', 'Arbitration and Conciliation Act Section 21', 'Notice generally fixes the date proceedings commence'],
          ['Contractual notice clause', 'The agreement itself', 'Mode, address and period as the contract prescribes']
        ]} />
        <div className="info-box" aria-label="Contractual clauses">
          <p><strong>Do not overlook the contract.</strong> A notice clause specifying the address, the mode or a cure period is usually binding between the parties, and a notice sent outside it can be challenged even where no statute required one. Read the clause before drafting, not after the reply points it out.</p>
        </div>
      </Section>

      <Section id="optional" title="When It Is Optional but Decisive">
        <DataTable headers={['Dispute', 'What the notice achieves']} rows={[
          ['Payment recovery', 'Fixes the demand, the amount and the date of default'],
          ['Breach of contract', 'Records the breach and any cure period given'],
          ['Consumer complaint', 'Evidence that the defect was raised and resolution refused'],
          ['Tenancy and eviction', 'Terminates or demands, as the arrangement requires'],
          ['Employment disputes', 'Places the grievance or the response on record'],
          ['Property encroachment or nuisance', 'Demands cessation and creates the record'],
          ['Partnership and business disputes', 'Marks the point at which the dispute crystallised'],
          ['Professional negligence', 'Puts the professional and their insurer on notice'],
          ['Defamation and reputation', 'Demands takedown, apology and correction'],
          ['Before arbitration or mediation', 'Opens the process and evidences an attempt to settle']
        ]} />
      </Section>

      <Section id="when-not" title="When Not to Send One">
        <DataTable headers={['Situation', 'Why a notice may be the wrong step']} rows={[
          ['Limitation is nearly expired', 'Filing protects the claim; correspondence does not'],
          ['Assets may be moved or dissipated', 'A warning can prompt exactly that'],
          ['Urgent interim relief is needed', 'An injunction application may come first'],
          ['Evidence may be destroyed once alerted', 'Preserve or secure it before giving notice'],
          ['The claim is weak on the documents', 'A confident refusal is worse than silence'],
          ['A settlement is already close', 'A formal notice can collapse a workable deal'],
          ['The facts are not yet verified', 'An inaccurate notice is very hard to walk back'],
          ['Criminal proceedings are being considered', 'A notice may forewarn and allow a defence to be arranged']
        ]} />
      </Section>

      <Section id="limitation" title="A Notice Does Not Stop the Clock">
        <div className="warning-box" aria-label="Limitation">
          <p><strong>Correspondence does not suspend limitation.</strong> The Limitation Act period runs from the cause of action and keeps running while notices, replies, reminders and negotiations go back and forth. Parties routinely spend eight months in polite exchange and then discover the suit is nearly time-barred. The notice period, the time allowed for a reply and any negotiation window all have to fit inside the limitation period — not alongside it.</p>
        </div>
        <DataTable headers={['Practical discipline', 'Why']} rows={[
          ['Identify the cause of action date first', 'Everything is calculated from it'],
          ['Calculate the limitation date before drafting', 'It sets the outer boundary of the strategy'],
          ['Add any statutory notice period into the plan', 'Two months under CPC Section 80 is two months of your window'],
          ['Set an internal filing date well before expiry', 'Leaves room to prepare properly'],
          ['Do not let negotiations run without a deadline', 'They expand to fill the time available'],
          ['Consider filing and then negotiating', 'Where time is short, this protects the claim'],
          ['Watch for acknowledgements of liability', 'A written acknowledgement can have limitation consequences worth capturing']
        ]} />
      </Section>

      <Section id="anatomy" title="The Anatomy of a Notice That Works">
        <DataTable headers={['Element', 'Why it belongs']} rows={[
          ['Sender and recipient particulars', 'Correct names and addresses — errors invite objections'],
          ['Capacity in which it is sent', 'Individual, company, authorised signatory or counsel'],
          ['The relationship or transaction', 'Contract, invoice, tenancy, employment or purchase'],
          ['Facts in date order', 'A chronology, not a narrative'],
          ['Documents relied on, identified', 'By date and reference, and annexed'],
          ['The default or breach', 'Precisely what was not done, and when'],
          ['The legal basis', 'The provision or contractual term relied on'],
          ['The demand', 'Specific — an amount with a computation, or an act with a description'],
          ['The period to comply', 'Statutory where prescribed, otherwise reasonable'],
          ['Consequence of non-compliance', 'The forum and the step that will follow'],
          ['Reservation of rights', 'Preserves remedies not being pursued now'],
          ['Contact for compliance or discussion', 'Makes settlement easy rather than awkward'],
          ['Measured, professional tone', 'The document will be read by a judge, not only the recipient']
        ]} />
      </Section>

      <Section id="avoid" title="What Weakens a Notice">
        <DataTable headers={['Avoid', 'Because']} rows={[
          ['Facts you have not verified', 'One wrong date undermines the whole document'],
          ['An inflated or unexplained claim', 'Invites a dismissive reply and hardens the other side'],
          ['Abusive or threatening language', 'Reads badly to a court and can create separate exposure'],
          ['Threats of criminal action as leverage', 'Looks like coercion rather than a legal position'],
          ['Vague demands', 'Nobody can comply with "do the needful"'],
          ['Impossibly short deadlines', 'Treated as posturing, and unhelpful if reviewed later'],
          ['Ignoring an arbitration clause', 'You may be threatening the wrong forum'],
          ['A template with the wrong statute', 'Signals nobody looked at the file'],
          ['Threats you will not carry out', 'A notice not followed up devalues the next one'],
          ['Sending to the wrong entity', 'A group company is not the contracting party']
        ]} />
      </Section>

      <Section id="recipients" title="Getting the Recipient Right">
        <DataTable headers={['Point', 'What to check']} rows={[
          ['Exact legal name of the entity', 'From the contract, invoice or MCA record'],
          ['Registered office address', 'For a company, service is usually at the registered office'],
          ['The contracting party, not the brand', 'A trade name is not always the legal entity'],
          ['Guarantors and sureties', 'Whether they should be noticed too'],
          ['Directors or partners personally', 'Only where there is a basis — not by default'],
          ['A contractual notice address', 'If specified, use it'],
          ['Multiple addresses', 'Send to all known addresses and keep every receipt'],
          ['Authorised signatory for you', 'Board resolution or authorisation where a company sends it']
        ]} />
      </Section>

      <Section id="service" title="Service and Proof of Dispatch">
        <p>Service is disputed far more often than the contents. Build the proof as you go, because reconstructing it later is difficult.</p>
        <DataTable headers={['Step', 'What to preserve']} rows={[
          ['Dispatch by a trackable mode', 'Registered post or courier with acknowledgement'],
          ['Postal or courier receipt', 'Dated, with the destination address visible'],
          ['Tracking record', 'Printed or saved at the time'],
          ['Acknowledgement of delivery', 'Signed card or courier confirmation'],
          ['Email copy, where used', 'With the sent record and any delivery confirmation'],
          ['Returned envelope, if refused', 'Keep it unopened with the postal endorsement'],
          ['A single dated file', 'Notice, annexures, receipts and tracking together'],
          ['Contractual mode compliance', 'Evidence you followed any notice clause']
        ]} />
        <div className="info-box" aria-label="Refusal">
          <p><strong>Refusal to accept is not a defeat.</strong> Where a notice is correctly addressed and the recipient refuses it or it is returned unclaimed, that is frequently treated as good service. Keep the returned envelope sealed and produce it with the postal endorsement intact — opening it destroys the best evidence you have.</p>
        </div>
      </Section>

      <Section id="forum" title="Forum, Jurisdiction and Arbitration Clauses">
        <DataTable headers={['Check', 'Why it matters before drafting']} rows={[
          ['Is there an arbitration clause', 'If so, the notice may need to invoke arbitration under Section 21'],
          ['Is there a jurisdiction clause', 'It may confine the dispute to one court'],
          ['Is the dispute commercial in value and nature', 'The Commercial Courts Act framework may apply'],
          ['Is the counterparty a Government body', 'CPC Section 80 notice period applies'],
          ['Is the claim a consumer claim', 'Consumer Commission rather than civil court'],
          ['Is the debt an operational debt', 'IBC Section 8 route may be available'],
          ['Is the claim secured', 'SARFAESI may be the faster enforcement route'],
          ['Is it a tenancy matter', 'State rent legislation may govern, with its own procedure'],
          ['Pre-institution mediation', 'Some commercial suits require it before filing']
        ]} />
        <p>Threatening the wrong forum is a common and avoidable own goal. A notice warning of a civil suit where the contract mandates arbitration tells the other side that nobody has read the agreement.</p>
      </Section>

      <Section id="types" title="Types of Notice We Draft">
        <DataTable headers={['Notice', 'Typical use']} rows={[
          ['Payment recovery notice', 'Unpaid invoices, loans and dues'],
          ['Breach of contract notice', 'Non-performance or defective performance'],
          ['Termination notice', 'Ending a contract in accordance with its terms'],
          ['Cheque dishonour notice', 'Statutory notice under NI Act Section 138'],
          ['Operational debt demand', 'IBC Section 8, before an insolvency application'],
          ['Notice to Government or a public officer', 'CPC Section 80'],
          ['Arbitration invocation notice', 'Section 21, commencing proceedings'],
          ['Tenancy notice', 'Arrears, termination or vacating'],
          ['Employment notice', 'Dues, wrongful termination or contractual breach'],
          ['Cease and desist', 'Stopping unlawful conduct or interference'],
          ['Professional negligence notice', 'Against a professional or their firm'],
          ['Reply to a notice received', 'Measured response preserving your defences']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Nature', 'Pre-litigation demand; no regulator and no filing'],
          ['Contract law', 'Indian Contract Act, 1872'],
          ['Civil procedure', 'Code of Civil Procedure, 1908'],
          ['Notice to Government', 'CPC Section 80'],
          ['Limitation', 'Limitation Act, 1963'],
          ['Cheque dishonour', 'Negotiable Instruments Act, 1881, Section 138'],
          ['Consumer disputes', 'Consumer Protection Act, 2019'],
          ['Commercial disputes', 'Commercial Courts Act, 2015'],
          ['Operational debt', 'Insolvency and Bankruptcy Code, 2016, Section 8'],
          ['Secured enforcement', 'SARFAESI Act, 2002, Section 13(2)'],
          ['Arbitration', 'Arbitration and Conciliation Act, 1996, Section 21'],
          ['Property and tenancy', 'Transfer of Property Act and State rent legislation'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['CPC Section 80', 'Two months’ notice before suing the Government or a public officer'],
          ['Contract Act Section 37', 'Obligation of parties to perform their promises'],
          ['Contract Act Section 39', 'Effect of refusal to perform'],
          ['Contract Act Section 55', 'Failure to perform within a fixed time'],
          ['Contract Act Sections 73 and 74', 'Compensation for breach and stipulated damages'],
          ['NI Act Section 138', 'Cheque dishonour — the 30-day and 15-day periods'],
          ['IBC Section 8', 'Operational creditor demand notice and the 10-day window'],
          ['SARFAESI Section 13(2)', 'Secured creditor demand and the 60-day period'],
          ['Arbitration Act Section 21', 'Commencement of arbitral proceedings by notice'],
          ['Limitation Act', 'The period within which the claim must be brought'],
          ['Transfer of Property Act Section 106', 'Notice to determine a lease, where applicable'],
          ['Consumer Protection Act Section 69', 'Two-year limitation for a consumer complaint']
        ]} />
      </Section>

      <Section id="responses" title="What Happens After It Is Sent">
        <DataTable headers={['Response', 'What it signals', 'What follows']} rows={[
          ['Full compliance', 'The demand is met', 'Acknowledge in writing and close'],
          ['Part payment or part performance', 'Liability substantially accepted', 'Record it and address the balance'],
          ['Request for time', 'Willingness to resolve', 'Agree a dated schedule in writing'],
          ['Settlement proposal', 'Negotiation opens', 'Document terms and default consequences'],
          ['Denial with reasons', 'They intend to contest', 'Test their reasons against the documents'],
          ['Counter-notice', 'Cross-claims asserted', 'Assess before responding'],
          ['Dispute raised within a statutory window', 'Significant in an IBC matter', 'Reassess the route'],
          ['Silence', 'No engagement', 'Proceed on the timetable you set'],
          ['Notice returned unclaimed', 'Avoidance', 'Preserve the envelope and proceed']
        ]} />
      </Section>

      <Section id="replying" title="Replying to a Notice You Received">
        <DataTable headers={['Do', 'Do not']} rows={[
          ['Check whether a statutory window applies', 'Assume you can reply whenever'],
          ['Read what is actually alleged, clause by clause', 'Respond to the tone rather than the substance'],
          ['Gather the documents before drafting', 'Reply from memory'],
          ['Deny specifically what is untrue', 'Issue a blanket denial of everything'],
          ['Set out your version with dates', 'Argue without a chronology'],
          ['Dispute quantum with your own computation', 'Dispute the amount while conceding liability'],
          ['Raise your counter-claim if you have one', 'Save it for later without reason'],
          ['Keep the tone measured', 'Add fresh allegations against the sender'],
          ['Reply within the time given, or seek an extension', 'Ignore it and hope']
        ]} />
        <div className="info-box" aria-label="IBC window">
          <p><strong>One reply window is unforgiving.</strong> On an IBC Section 8 demand notice the corporate debtor has ten days to pay or to raise a dispute. A genuine pre-existing dispute raised properly in that window is the single most effective answer to an insolvency application — and it is lost by delay more often than by any weakness in the dispute itself.</p>
        </div>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The agreement or contract', 'The terms, notice clause and dispute resolution clause'],
          ['Invoices and purchase orders', 'The claim and its computation'],
          ['Ledger or statement of account', 'Quantifying the amount due'],
          ['Correspondence and emails', 'Chronology, admissions and demands already made'],
          ['Bank statements and payment records', 'What was paid and when'],
          ['Delivery or performance records', 'Whether your side performed'],
          ['Cheque and bank memo, if applicable', 'Statutory cheque dishonour timeline'],
          ['Entity and address details', 'Correct naming and service'],
          ['Board authorisation, for a company', 'Authority to issue the notice'],
          ['Any earlier notice or reply', 'Consistency of position'],
          ['Proof of the cause of action date', 'Limitation calculation']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Case and document review', 'The facts and what the papers actually show'],
          ['2', 'Cause of action and limitation', 'The date, and the outer deadline'],
          ['3', 'Statutory notice check', 'Whether a mandatory notice and period apply'],
          ['4', 'Forum and clause review', 'Jurisdiction, arbitration and contractual notice terms'],
          ['5', 'Recipient identification', 'The correct entity and address'],
          ['6', 'Claim computation', 'A supportable figure or a defined act'],
          ['7', 'Drafting', 'Notice with annexures and a clear deadline'],
          ['8', 'Dispatch', 'Trackable mode, with the record preserved'],
          ['9', 'Response analysis', 'Reply, settlement proposal, denial or silence'],
          ['10', 'Next step', 'Suit, complaint, arbitration, application or settlement'],
          ['11', 'Tracking', 'Dates, responses and escalation']
        ]} />
      </Section>

      <Section id="specific-notices" title="Specific Notices We Cover Separately">
        <DataTable headers={['Notice', 'Where to read more']} rows={[
          ['Cheque dishonour under Section 138', 'Cheque Bounce in India'],
          ['Defective or unsafe product', 'Faulty Product Notice'],
          ['False or reputation-damaging statements', 'Defamation Notice'],
          ['Matrimonial notice and reply', 'Divorce Notice'],
          ['Return of movable property or assets', 'Criminal Misappropriation of Property'],
          ['Consumer complaint after the notice', 'Complaints Before Consumer Court']
        ]} />
        <p>See <Link href="/solutions/legal/cheque-bounce-in-india">Cheque Bounce in India</Link>, <Link href="/solutions/legal/faulty-product-notice">Faulty Product Notice</Link>, <Link href="/solutions/legal/defamation-notice">Defamation Notice</Link>, <Link href="/solutions/legal/divorce-notice">Divorce Notice</Link> and <Link href="/solutions/legal/complaints-before-consumer-court">Complaints Before Consumer Court</Link>.</p>
      </Section>

      <Section id="common-issues" title="Why Notices Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Statutory notice not identified', 'The later proceeding fails at the threshold', 'Route check before drafting'],
          ['Statutory period miscalculated', 'A good claim is lost on timing', 'Periods calendared from the trigger date'],
          ['Limitation ignored while corresponding', 'The claim expires during negotiation', 'Limitation fixed at the outset'],
          ['Template used without reading the file', 'Wrong statute, wrong forum, no credibility', 'Drafted from the documents'],
          ['Wrong entity or address', 'Service and maintainability objections', 'Entity verification before dispatch'],
          ['Arbitration clause overlooked', 'Wrong forum threatened', 'Contract reviewed first'],
          ['Contractual notice clause ignored', 'Notice challenged as invalid', 'Clause complied with exactly'],
          ['Unsupported amount demanded', 'Credibility lost, settlement harder', 'Computation annexed'],
          ['No proof of dispatch', 'Service disputed', 'Trackable mode with records kept'],
          ['Returned envelope opened', 'Best evidence of refusal destroyed', 'Preserved sealed'],
          ['No follow-through after the deadline', 'The threat is exposed as empty', 'Escalation planned before sending']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case and document review', 'What the papers actually support'],
          ['Limitation analysis', 'Cause of action date and the deadline'],
          ['Statutory notice determination', 'Whether a mandatory notice and period apply'],
          ['Forum and clause review', 'Jurisdiction, arbitration and contractual notice terms'],
          ['Claim computation', 'A figure you can defend'],
          ['Notice drafting', 'Fact-led, annexed and deadline-bound'],
          ['Reply drafting', 'Where a notice has been received against you'],
          ['Dispatch and service support', 'Mode, addresses and proof'],
          ['Response analysis', 'What the reply means and what to do next'],
          ['Settlement documentation', 'Terms, schedule and default consequences'],
          ['Escalation planning', 'Suit, complaint, arbitration or application'],
          ['Advocate coordination', 'Brief, chronology and filing support'],
          ['Ticket-based tracking', 'Drafting, dispatch, delivery, reply and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Before drafting a single line, establish two things: whether the law requires a notice here and with what period, and when the limitation expires. Those answers decide whether you are writing a statutory precondition or a demand letter, and whether you have time to send one at all. Everything people usually worry about — tone, length, how firm to sound — matters far less than those two dates.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a notice is required, what period applies, which forum is correct and what a notice should say depend entirely on the facts, the contract and the governing statute. Notice periods and limitation are summarised here in general terms and must be confirmed for your matter before you rely on them. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides case review, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
