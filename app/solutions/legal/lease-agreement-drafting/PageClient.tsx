'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'registration', title: 'When a Lease Must Be Registered' },
  { id: 'eleven-months', title: 'Why Everyone Signs Eleven Months' },
  { id: 'notice', title: 'The Statutory Notice Periods' },
  { id: 'lease-vs-licence', title: 'Lease or Leave and Licence' },
  { id: 'clauses', title: 'The Clauses That Decide Disputes' },
  { id: 'deposit', title: 'Security Deposit' },
  { id: 'lock-in', title: 'Lock-In and Exit' },
  { id: 'commercial', title: 'Commercial and Retail Leases' },
  { id: 'rent-control', title: 'Rent Control and the Model Tenancy Act' },
  { id: 'tax', title: 'GST, TDS and Statutory Dues' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'landlord-tenant', title: 'What Each Side Should Insist On' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'termination', title: 'Termination and Eviction' },
  { id: 'nri', title: 'NRI Landlords' },
  { id: 'common-issues', title: 'Where Leases Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Estabizz Practice Note' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a lease?', 'A transfer of a right to enjoy immovable property for a term, in consideration of rent or other value. Section 105 of the Transfer of Property Act, 1882 defines it.'],
  ['Does a lease have to be registered?', 'A lease from year to year, for any term exceeding one year, or reserving a yearly rent can be made only by a registered instrument under Section 107, and is compulsorily registrable under Section 17 of the Registration Act.'],
  ['Why are so many rent agreements for eleven months?', 'Precisely to stay under that one-year threshold and avoid compulsory registration and higher stamp duty. It is a lawful and extremely common arrangement — but it has consequences, including that the tenancy must actually be renewed rather than allowed to drift.'],
  ['What is wrong with an unregistered long lease?', 'Where registration was compulsory, an unregistered instrument cannot be received as evidence of the transaction in the way a registered one can, subject to the limited purposes the law allows. Parties who negotiated a five-year term can find themselves treated as holding something far less secure.'],
  ['How much notice is needed to end a tenancy?', 'Where the contract does not provide otherwise, Section 106 deems a lease for agricultural or manufacturing purposes to be year to year, terminable on six months’ notice; and a lease for any other purpose to be month to month, terminable on fifteen days’ notice.'],
  ['Did the notice rule change?', 'Yes. The Transfer of Property (Amendment) Act, 2002 removed the requirement that the notice expire with the end of a year or month of the tenancy. The practical effect is that a tenancy can now be terminated at any time once the notice period has run, rather than only at a month-end or year-end.'],
  ['When does the notice period start?', 'The period runs from the date the notice is received, not the date it was sent. That distinction decides a surprising number of eviction disputes, so proof of delivery matters.'],
  ['Can the agreement set a different notice period?', 'Yes. Section 106 applies in the absence of a contract to the contrary. A clearly drafted notice clause generally governs, which is why it should be negotiated rather than left to the default.'],
  ['What is the difference between a lease and a leave and licence?', 'A lease transfers an interest in the property and gives exclusive possession; a licence gives permission to use without transferring an interest. The distinction turns on substance rather than the label on the document, and it affects registration, stamp duty and how possession is recovered.'],
  ['Can I just call it a licence to make eviction easier?', 'Calling it one does not make it one. Courts look at whether exclusive possession was in fact given and at the real nature of the arrangement. A document labelled licence but operating as a lease will generally be treated as a lease.'],
  ['What stamp duty applies?', 'Stamp duty on leases is State-specific and usually varies with the rent, the term and the deposit. It should be computed for the State where the property is situated before execution.'],
  ['How much security deposit is normal?', 'It varies enormously by city and property type, and in some States the applicable tenancy law caps it. What matters legally is that the amount, the deductions permitted and the refund timeline are written down.'],
  ['When must the deposit be refunded?', 'On the terms the agreement provides. If the agreement is silent, disputes follow. Always specify the refund period, what may be deducted and what cannot.'],
  ['What is a lock-in period?', 'A period during which neither party — or in practice usually the tenant — may terminate. It protects the landlord’s income and the tenant’s occupation, and it needs to be reciprocal and clearly drafted to be fair.'],
  ['What happens if the tenant leaves during lock-in?', 'That depends entirely on the clause. A well-drafted lock-in states the consequence — typically rent for the balance of the period or forfeiture of a defined amount — rather than leaving it to be argued.'],
  ['Who pays for repairs?', 'Section 108 sets out default rights and liabilities, but the agreement usually allocates them. Distinguish structural repairs from routine maintenance expressly, because that is the most frequent running dispute in a long tenancy.'],
  ['Can the landlord increase rent during the term?', 'Only as the agreement provides. An escalation clause with a defined percentage and timing avoids the annual argument.'],
  ['Can the tenant sublet?', 'Only if the agreement permits it. Say so expressly either way, and address assignment and change of control for a company tenant.'],
  ['Is GST payable on rent?', 'GST can apply to the letting of commercial property subject to the applicable law and thresholds; residential letting is treated differently and the position has changed over time. It should be checked for the specific arrangement rather than assumed.'],
  ['Is TDS deductible on rent?', 'Tax deduction at source on rent applies above prescribed thresholds, with different provisions for different payers. The rate and threshold should be confirmed for the current year.'],
  ['What is the Model Tenancy Act?', 'A model law circulated in 2021 for States and Union Territories to adopt, providing for written agreements, a Rent Authority and defined dispute resolution. It applies only where the State has adopted it, so the position differs across the country.'],
  ['Do old rent control laws still matter?', 'In several States, yes, and they can significantly restrict rent and eviction for covered premises. Whether a property falls within rent control is a threshold question before drafting.'],
  ['How does a landlord recover possession?', 'Through the agreement’s termination mechanism and a valid notice, and then through the court or Rent Authority as applicable. Self-help — changing locks, cutting utilities, removing belongings — is unlawful and usually damages the landlord’s case.'],
  ['What is the biggest mistake?', 'A short agreement downloaded from the internet, with no notice clause, no deposit terms, no repair allocation and no clarity on lock-in. It costs nothing to sign and a great deal to litigate.'],
  ['Can Estabizz handle registration?', 'We handle title and authority checks, drafting, stamp duty and registration guidance, Sub-Registrar coordination and review of a draft you have been given. Appearance in any dispute is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Property' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Lease Agreement Drafting' }]}
      title="Lease Agreement Drafting"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Lease Agreement Drafting"
      sections={sections}
      ctaTitle="Speak With a Property Documentation Expert"
      ctaDescription="A lease drafted for the property type and the commercial reality, with the registration, stamp duty and exit position settled before signature."
      quickFacts={[
        { label: 'Registration threshold', value: 'Over one year' },
        { label: 'Default notice', value: '15 days or 6 months' },
        { label: 'Notice runs from', value: 'Receipt' },
        { label: 'Decides disputes', value: 'The clauses' }
      ]}
      relatedArticles={[
        { title: 'Gift Deed Registration', href: '/solutions/legal/gift-deed-registration', category: 'Legal', description: 'Transfer of Property Act, registration, stamp duty, tax and mutation for property gifts.' },
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'When a notice is legally mandatory, what it must say, and service and proof.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence and execution.' }
      ]}
      finalCtaTitle="The Dispute Is Decided by the Clause You Did Not Negotiate"
      finalCtaDescription="Almost every lease dispute turns on repairs, the deposit, the lock-in or the notice period — and almost always because the agreement said nothing useful about it."
      heroDescription={<p>A lease looks like a simple document and generates a disproportionate share of property litigation. Most of it is avoidable: the registration threshold was misunderstood, the notice clause was absent so the statutory default applied, the deposit terms were never written down, or a residential template was used for a warehouse. Estabizz assists landlords, tenants, companies, startups, retailers, warehouses, clinics, co-working operators, NRIs and property owners with title and authority checks, residential and commercial lease drafting, registration and stamp duty guidance, lock-in and termination structuring, security deposit and repair allocation, renewal and exit documentation, Sub-Registrar coordination and review of drafts received from the other side.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a lease agreement sets out who occupies the property, on what terms, for how long, and what happens when it ends.</p>
        <p>The law supplies defaults for much of this, but the defaults are rarely what either party actually wants. The value of drafting is in displacing them deliberately rather than discovering them in a dispute.</p>
        <p>A residential flat, an office, a warehouse, a retail unit and an industrial shed are not the same document, however similar the structure looks.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Lease agreement drafting is not a licence. It is documentation work governed by the Transfer of Property Act, the Registration Act, State stamp legislation, State rent or tenancy law and, where adopted, the Model Tenancy Act framework.</p>
        <p>A written agreement is advisable in every tenancy. Registration is compulsory in defined cases, and whether yours is one of them should be settled before the term is agreed, not after.</p>
      </Section>

      <Section id="registration" title="When a Lease Must Be Registered">
        <div className="warning-box" aria-label="Registration threshold">
          <p><strong>A lease from year to year, for any term exceeding one year, or reserving a yearly rent can be made only by a registered instrument.</strong> Section 107 of the Transfer of Property Act says so, and Section 17 of the Registration Act makes such leases compulsorily registrable. Where registration was required and did not happen, the instrument cannot be used as evidence of the transaction in the ordinary way, subject to the limited purposes the law permits. Parties who negotiated a five-year term with a lock-in can find the security they thought they had is not there.</p>
        </div>
        <DataTable headers={['Lease', 'Registration position']} rows={[
          ['Term exceeding one year', 'Compulsorily registrable'],
          ['Lease from year to year', 'Compulsorily registrable'],
          ['Lease reserving a yearly rent', 'Compulsorily registrable'],
          ['Term of eleven months, renewable', 'Not within the compulsory registration threshold'],
          ['Term of one year exactly', 'Check carefully — drafting and State practice matter'],
          ['Renewal taking the total beyond a year', 'Assess how the renewal is structured'],
          ['Leave and licence', 'Treated differently; State law may still require registration'],
          ['Effect of non-registration', 'Governed by Section 49 of the Registration Act']
        ]} />
      </Section>

      <Section id="eleven-months" title="Why Everyone Signs Eleven Months">
        <p>The ubiquitous eleven-month agreement exists for one reason: it sits below the threshold at which registration becomes compulsory, and it usually attracts lower stamp duty. It is entirely lawful. It is also frequently misused.</p>
        <DataTable headers={['Point', 'Reality']} rows={[
          ['Why eleven months', 'Below the one-year compulsory registration threshold'],
          ['Is it lawful', 'Yes — it is a legitimate and very common arrangement'],
          ['Does it give long-term security', 'No — the tenant has eleven months, not a long tenancy'],
          ['Renewal', 'Must actually be documented, not assumed'],
          ['Letting it run on', 'Creates uncertainty about the terms now applying'],
          ['Repeated renewals', 'Can raise questions about the real nature of the arrangement'],
          ['For a tenant investing in fit-out', 'Eleven months may be entirely inadequate — consider a registered lease'],
          ['For a landlord wanting flexibility', 'It serves that purpose well'],
          ['The honest question', 'Does the term you signed match the term you both actually intend?']
        ]} />
        <div className="info-box" aria-label="Fit-out">
          <p><strong>If the tenant is spending money on the premises, eleven months is usually the wrong structure.</strong> A retailer fitting out a showroom or a clinic installing equipment needs a term and a lock-in that justify the investment — which means a registered lease and the stamp duty that comes with it. Saving the registration cost and then losing the premises in year one is a poor trade.</p>
        </div>
      </Section>

      <Section id="notice" title="The Statutory Notice Periods">
        <p>Section 106 supplies the default where the contract does not provide otherwise. Many disputes arise precisely because the agreement was silent and nobody realised a statutory rule had filled the gap.</p>
        <DataTable headers={['Purpose of the lease', 'Deemed duration', 'Notice to terminate']} rows={[
          ['Agricultural or manufacturing purposes', 'Year to year', 'Six months'],
          ['Any other purpose', 'Month to month', 'Fifteen days'],
          ['Where the contract provides otherwise', 'As the contract provides', 'As the contract provides']
        ]} />
        <div className="info-box" aria-label="2002 amendment">
          <p><strong>Two details decide most notice disputes.</strong> First, the Transfer of Property (Amendment) Act, 2002 removed the requirement that the notice expire with the end of a year or month of the tenancy — so a tenancy can now be terminated once the notice period has run, rather than only at a period-end. Second, the notice period runs from <strong>receipt</strong>, not dispatch. Keep proof of delivery, because the date of receipt is what the computation turns on.</p>
        </div>
        <DataTable headers={['Practical point', 'Why it matters']} rows={[
          ['A manufacturing use attracts six months', 'Classifying the use correctly changes the notice by months'],
          ['Draft an express notice clause', 'The default is rarely what either party wants'],
          ['Serve in a trackable mode', 'Receipt is the trigger and is routinely disputed'],
          ['State the termination date in the notice', 'Removes ambiguity about when possession is due'],
          ['Check rent control or tenancy law', 'It may override the ordinary position for covered premises'],
          ['Do not rely on a verbal understanding', 'Notice is a formal step, not a conversation']
        ]} />
      </Section>

      <Section id="lease-vs-licence" title="Lease or Leave and Licence">
        <DataTable headers={['Point', 'Lease', 'Leave and licence']} rows={[
          ['Nature', 'Transfers an interest in the property', 'Permission to use, no interest transferred'],
          ['Possession', 'Exclusive possession to the tenant', 'Possession generally remains with the owner'],
          ['Governing provision', 'Transfer of Property Act Sections 105 onwards', 'Easements and contract principles, with State law'],
          ['Registration', 'Compulsory above the statutory threshold', 'Depends on State law and the term'],
          ['Stamp duty', 'As the State prescribes for leases', 'Often a different rate'],
          ['Recovering possession', 'Through the lease termination and court or authority route', 'Generally simpler, but still through due process'],
          ['Label on the document', 'Not decisive', 'Not decisive'],
          ['What a court looks at', 'Substance of the arrangement and whether exclusive possession was given', 'Same test']
        ]} />
        <p>Owners sometimes choose the licence form hoping it makes recovery of possession easier. It can, but only if the arrangement genuinely is a licence. A document labelled licence that in substance grants exclusive possession is likely to be treated as a lease, and the attempt adds a credibility problem to the dispute.</p>
      </Section>

      <Section id="clauses" title="The Clauses That Decide Disputes">
        <DataTable headers={['Clause', 'Why it matters']} rows={[
          ['Parties and authority', 'Who is actually contracting, and with what authority'],
          ['Property description', 'Precise area, floor, unit and what is included'],
          ['Permitted use', 'What the premises may and may not be used for'],
          ['Term and commencement', 'The exact start and end dates'],
          ['Rent and due date', 'Amount, mode and the date it is payable'],
          ['Escalation', 'Percentage and timing, defined'],
          ['Security deposit', 'Amount, permitted deductions and refund timeline'],
          ['Maintenance and outgoings', 'Who pays society charges, taxes and utilities'],
          ['Repairs', 'Structural versus routine, allocated expressly'],
          ['Lock-in', 'Duration, reciprocity and the consequence of early exit'],
          ['Notice to terminate', 'Displacing the statutory default deliberately'],
          ['Renewal', 'Mechanism, notice and revised rent'],
          ['Subletting and assignment', 'Permitted, prohibited or on consent'],
          ['Alterations and fit-out', 'What the tenant may do, and reinstatement on exit'],
          ['Access and inspection', 'The landlord’s right, with notice'],
          ['Insurance', 'Who insures what'],
          ['Force majeure', 'What happens when the premises cannot be used'],
          ['Default and remedies', 'Cure periods and consequences'],
          ['Handover condition', 'What the premises must look like on exit'],
          ['Dispute resolution and jurisdiction', 'Forum, and arbitration if agreed']
        ]} />
      </Section>

      <Section id="deposit" title="Security Deposit">
        <p>The deposit is the single most common flashpoint at the end of a tenancy, and almost always because the agreement did not say enough about it.</p>
        <DataTable headers={['Specify', 'Instead of']} rows={[
          ['The exact amount and when it is paid', 'An unspecified "deposit as agreed"'],
          ['Whether it is interest-free', 'Silence, which invites a later claim'],
          ['Exactly what may be deducted', 'A general right to deduct for damage'],
          ['That normal wear and tear is not deductible', 'Leaving it to argument'],
          ['A refund timeline after handover', 'An open-ended promise to refund'],
          ['A joint inspection at handover', 'A unilateral assessment by the landlord'],
          ['Photographic condition record at both ends', 'Memory'],
          ['Whether unpaid dues can be adjusted', 'Assuming it'],
          ['Consequence of delayed refund', 'No remedy short of litigation'],
          ['Any statutory cap in the State', 'Assuming no cap applies']
        ]} />
      </Section>

      <Section id="lock-in" title="Lock-In and Exit">
        <DataTable headers={['Point', 'How to draft it']} rows={[
          ['Duration', 'A defined period with explicit start and end dates'],
          ['Reciprocity', 'State whether it binds both parties or only the tenant'],
          ['Consequence of tenant exiting early', 'Rent for the balance, or a defined forfeiture'],
          ['Consequence of landlord terminating early', 'A mirror consequence if the lock-in is reciprocal'],
          ['Interaction with the notice clause', 'Whether notice can be served during lock-in to expire after it'],
          ['Exceptions', 'Premises unusable, breach by the other party, regulatory closure'],
          ['Relationship to the deposit', 'Whether forfeiture comes out of the deposit'],
          ['Fit-out amortisation', 'Where the tenant has invested, the lock-in should reflect it'],
          ['Assignment during lock-in', 'Whether the tenant can transfer rather than pay out']
        ]} />
      </Section>

      <Section id="commercial" title="Commercial and Retail Leases">
        <DataTable headers={['Issue', 'What a commercial lease must address']} rows={[
          ['Permitted use and trade', 'Specific enough to protect both sides'],
          ['Fit-out period and rent-free', 'Duration and conditions'],
          ['Signage and branding rights', 'Location, size and approvals'],
          ['Operating hours and access', 'Particularly in managed buildings'],
          ['Common area maintenance', 'Basis of computation and escalation'],
          ['Exclusivity or competing tenants', 'Where relevant to retail'],
          ['Revenue share arrangements', 'Computation, audit rights and reporting'],
          ['Parking', 'Number of bays and location'],
          ['Statutory approvals for the use', 'Who obtains them, and what if they are refused'],
          ['Reinstatement on exit', 'Scope, and whether the fit-out stays'],
          ['Assignment and change of control', 'Critical for a corporate tenant'],
          ['Business continuity', 'What happens if the premises become unusable']
        ]} />
      </Section>

      <Section id="rent-control" title="Rent Control and the Model Tenancy Act">
        <DataTable headers={['Framework', 'Position']} rows={[
          ['State Rent Control Acts', 'Continue in several States, and can restrict rent and eviction significantly'],
          ['Coverage', 'Often depends on the property, the rent level and when the tenancy began'],
          ['Why it matters before drafting', 'A covered property changes what the agreement can achieve'],
          ['Model Tenancy Act, 2021', 'A model law for States and UTs to adopt'],
          ['What it provides for', 'Written agreements, a Rent Authority and defined dispute resolution'],
          ['Applicability', 'Only where the State or UT has adopted it'],
          ['Practical consequence', 'The applicable framework differs across the country'],
          ['First step', 'Establish which regime governs the property before drafting']
        ]} />
      </Section>

      <Section id="tax" title="GST, TDS and Statutory Dues">
        <DataTable headers={['Item', 'Practical note']} rows={[
          ['GST on commercial letting', 'Can apply subject to the applicable law and thresholds'],
          ['GST on residential letting', 'Treated differently, and the position has changed over time'],
          ['Who bears GST', 'State it expressly in the rent clause'],
          ['TDS on rent', 'Applies above prescribed thresholds, with different provisions by payer'],
          ['TDS certificates', 'The landlord will need them — make it an obligation'],
          ['Property tax', 'Who pays, and what happens if it is reassessed'],
          ['Society and maintenance charges', 'Allocated expressly'],
          ['Utilities', 'Meters, deposits and transfer on exit'],
          ['Stamp duty', 'State-specific, usually varying with rent, term and deposit'],
          ['Registration fee', 'Separate from stamp duty'],
          ['Who bears the costs', 'Specify — it is a routine negotiation point']
        ]} />
        <p>Tax positions change, and thresholds are revised. Confirm the current position for the specific arrangement rather than carrying forward a clause from an older agreement.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main property law', 'Transfer of Property Act, 1882'],
          ['Lease definition', 'Section 105'],
          ['Duration and notice default', 'Section 106'],
          ['How a lease is made', 'Section 107'],
          ['Rights and liabilities', 'Section 108'],
          ['Determination of lease', 'Section 111'],
          ['Registration', 'Registration Act, 1908, Sections 17 and 49'],
          ['Stamp duty', 'Indian Stamp Act, 1899 and State stamp legislation'],
          ['Rent control', 'State Rent Control or Tenancy Acts'],
          ['Model framework', 'Model Tenancy Act, 2021, where adopted'],
          ['Contract principles', 'Indian Contract Act, 1872'],
          ['Tax', 'Income-tax Act and GST law'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Forum', 'Civil court, Rent Authority or arbitration as applicable']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['TPA Section 105', 'Defines lease, lessor, lessee, premium and rent'],
          ['TPA Section 106', 'Deemed duration and the fifteen-day and six-month notice periods'],
          ['TPA Section 107', 'Leases above the threshold only by registered instrument'],
          ['TPA Section 108', 'Default rights and liabilities of lessor and lessee'],
          ['TPA Section 109', 'Rights of a transferee of the lessor’s interest'],
          ['TPA Section 111', 'How a lease determines'],
          ['TPA Section 114', 'Relief against forfeiture for non-payment of rent'],
          ['TPA Section 116', 'Holding over after expiry'],
          ['Registration Act Section 17', 'Compulsory registration of specified leases'],
          ['Registration Act Section 49', 'Effect of non-registration'],
          ['Contract Act Sections 73 and 74', 'Damages and stipulated sums on breach'],
          ['Specific Relief Act', 'Injunctions and possession-related relief']
        ]} />
      </Section>

      <Section id="landlord-tenant" title="What Each Side Should Insist On">
        <DataTable headers={['Landlord should insist on', 'Tenant should insist on']} rows={[
          ['A defined permitted use', 'A term that justifies any fit-out investment'],
          ['A clear default and cure mechanism', 'A reasonable cure period before termination'],
          ['Rent escalation defined in advance', 'A cap on escalation'],
          ['Reinstatement obligations on exit', 'Clarity on what must be removed and what stays'],
          ['Restrictions on subletting and assignment', 'A right to assign or sublet within a group'],
          ['Interest or consequence on delayed rent', 'A deposit refund timeline with consequences'],
          ['Access for inspection and repair', 'Notice before any access'],
          ['Security deposit adequate to the risk', 'Deductions limited to defined heads'],
          ['Indemnity for unlawful use', 'Quiet enjoyment of the premises'],
          ['Confirmation of who pays statutory dues', 'Landlord warranty of clear title and authority to let']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Title deed of the property', 'Landlord’s ownership and authority to let'],
          ['Property tax receipt', 'Current status and ownership record'],
          ['Approved plan or occupancy certificate', 'Lawful use of the premises'],
          ['Society NOC', 'Where a cooperative society is involved'],
          ['Identity and address proof of both parties', 'Execution and registration'],
          ['PAN of both parties', 'Tax reporting and TDS'],
          ['Company documents for a corporate party', 'Incorporation, authority and board resolution'],
          ['Power of attorney, if used', 'Authority to execute'],
          ['Existing encumbrance or mortgage details', 'Lender restrictions on letting'],
          ['Prior lease or licence documents', 'Continuity and holding over position'],
          ['Photographs of the premises condition', 'Deposit and handover protection'],
          ['Inventory of fittings provided', 'Annexed schedule'],
          ['e-Stamp and registration receipts', 'Proof of duty paid']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Requirement discussion', 'Property type, term, commercial intent'],
          ['2', 'Title and authority check', 'Who can lawfully let the premises'],
          ['3', 'Regime check', 'Rent control, Model Tenancy Act or ordinary law'],
          ['4', 'Registration assessment', 'Whether the term crosses the threshold'],
          ['5', 'Stamp duty computation', 'State rate against rent, term and deposit'],
          ['6', 'Commercial terms capture', 'Rent, escalation, deposit, lock-in and exit'],
          ['7', 'Drafting', 'Property-type specific agreement with schedules'],
          ['8', 'Negotiation support', 'Reviewing and responding to the other side’s markup'],
          ['9', 'Execution planning', 'Signatories, witnesses and authority'],
          ['10', 'Registration coordination', 'Sub-Registrar appointment where required'],
          ['11', 'Handover documentation', 'Condition record and inventory'],
          ['12', 'Renewal or exit support', 'Documented, not assumed']
        ]} />
      </Section>

      <Section id="termination" title="Termination and Eviction">
        <div className="warning-box" aria-label="No self-help">
          <p><strong>Self-help is unlawful and counterproductive.</strong> Changing the locks, disconnecting electricity or water, removing the tenant&rsquo;s belongings or using pressure to force a vacancy exposes the landlord to criminal and civil consequences — and it converts a straightforward possession case into one where the landlord is explaining their own conduct. Possession is recovered through the agreement, a valid notice and the court or Rent Authority.</p>
        </div>
        <DataTable headers={['Step', 'What it involves']} rows={[
          ['Identify the ground', 'Expiry, breach, non-payment or termination on notice'],
          ['Check the agreement', 'Notice clause, cure period and lock-in position'],
          ['Check the applicable regime', 'Rent control may restrict the grounds'],
          ['Serve a valid notice', 'Correct period, trackable mode, proof of receipt'],
          ['Allow the cure period', 'Where the agreement provides one'],
          ['Document the breach', 'Rent ledger, correspondence, photographs'],
          ['Proceed to the correct forum', 'Court or Rent Authority as applicable'],
          ['Mesne profits', 'Claim for occupation after termination, where available'],
          ['Handover and settlement', 'Condition inspection and deposit reconciliation']
        ]} />
      </Section>

      <Section id="nri" title="NRI Landlords">
        <DataTable headers={['Issue', 'What to plan']} rows={[
          ['Execution from abroad', 'Attestation, apostille or a properly drawn power of attorney'],
          ['Power of attorney scope', 'Specific authority to let, receive rent and terminate'],
          ['Rent receipt and repatriation', 'Banking route and documentation'],
          ['TDS on rent paid to a non-resident', 'A different provision and rate applies — confirm it'],
          ['Local representative', 'Someone able to inspect and act'],
          ['Registration presence', 'Whether attendance is required, and alternatives'],
          ['Dispute handling from abroad', 'Jurisdiction and representation'],
          ['Property maintenance', 'Who supervises in the owner’s absence']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Leases Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Downloaded template used', 'No notice, deposit or repair terms', 'Property-type specific drafting'],
          ['Long lease left unregistered', 'The term the parties negotiated is not secure', 'Registration assessed before the term is agreed'],
          ['Eleven months used for a fit-out tenancy', 'Tenant invests, then has no security', 'Term matched to the commercial reality'],
          ['No notice clause', 'The statutory default applies, often unexpectedly', 'Express notice clause negotiated'],
          ['Notice period computed from dispatch', 'Termination date wrong, possession delayed', 'Receipt-based computation with proof'],
          ['Manufacturing use not recognised', 'Six months’ notice required, not fifteen days', 'Use classified correctly'],
          ['Deposit terms vague', 'The standard end-of-tenancy dispute', 'Deductions, timeline and inspection defined'],
          ['Repairs not allocated', 'A running dispute through the whole term', 'Structural and routine split expressly'],
          ['Lock-in with no consequence stated', 'Unenforceable in practice', 'Defined consequence on early exit'],
          ['Rent control position not checked', 'The agreement cannot do what it says', 'Regime established first'],
          ['Landlord resorts to self-help', 'Criminal and civil exposure', 'Lawful termination and possession route'],
          ['Handover condition undocumented', 'Deposit forfeited on assertion', 'Photographic record at both ends']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Title and authority verification', 'Who can lawfully let the premises'],
          ['Regime assessment', 'Rent control, Model Tenancy Act or ordinary law'],
          ['Residential lease drafting', 'Clear, balanced and complete'],
          ['Commercial and retail lease drafting', 'Fit-out, CAM, signage, exclusivity and reinstatement'],
          ['Warehouse and industrial lease drafting', 'Use, approvals and the six-month notice position'],
          ['Leave and licence documentation', 'Where that structure genuinely fits'],
          ['Registration and stamp duty guidance', 'Threshold, computation and process'],
          ['Lock-in and exit structuring', 'With defined consequences'],
          ['Deposit and repair allocation', 'Drafted to prevent the usual disputes'],
          ['Draft review and negotiation', 'Where the other side has sent an agreement'],
          ['Renewal and amendment documentation', 'Documented rather than assumed'],
          ['Termination notice drafting', 'Correct period, served provably'],
          ['Handover documentation', 'Condition record, inventory and settlement'],
          ['NRI landlord support', 'Attestation, POA and tax position'],
          ['Dispute coordination', 'Advocate briefing where litigation arises']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Estabizz Practice Note">
        <p>{"Lease disputes are remarkably predictable. They are about the deposit, the repairs, the lock-in or the notice — and in nearly every case the agreement said nothing useful about the one that went wrong. Two further points are worth fixing at the start: whether the term crosses the registration threshold, and whether the use is a manufacturing use, because that turns fifteen days' notice into six months."}</p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not transaction-specific legal or tax advice. Stamp duty, registration requirements, rent control coverage and whether the Model Tenancy Act applies are State-specific and change. GST and TDS positions on rent depend on the arrangement and the law in force at the time, and must be confirmed rather than carried forward. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides drafting, documentation, review and coordination support; registration is before the Sub-Registrar and appearance in any dispute is through enrolled advocates. Confirm the current State position before executing anything.</p>
      </Section>
    </ServicePageLayout>
  );
}
