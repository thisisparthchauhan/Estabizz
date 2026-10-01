'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'forfeiture', title: 'Forfeiture Requires Proof of Loss' },
  { id: 'deposit-types', title: 'Deposit, Advance or Earnest Money' },
  { id: 'deductions', title: 'Lawful and Arbitrary Deductions' },
  { id: 'wear-tear', title: 'Wear and Tear Is Not Damage' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'rental', title: 'Rental Deposits' },
  { id: 'tenancy-law', title: 'Deposit Caps and the Model Tenancy Act' },
  { id: 'commercial', title: 'Commercial Lease Deposits' },
  { id: 'employee', title: 'Employee Deposits and Training Bonds' },
  { id: 'vendor', title: 'Vendor, Franchise and Dealership Deposits' },
  { id: 'forum', title: 'Where the Claim Goes' },
  { id: 'notice', title: 'What the Notice Must Contain' },
  { id: 'evidence', title: 'Evidence Before You Hand Over' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'common-issues', title: 'Why Deposits Are Not Recovered' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Can a landlord simply refuse to return a security deposit?', 'No. A security deposit is held as security against identified liabilities, not earned by the holder. Genuine dues and proven damage can be deducted if the agreement permits and the amounts are evidenced. Withholding the balance without a basis is a money claim you can pursue.'],
  ['Can painting charges be deducted automatically?', 'Only where the agreement clearly provides for it. An automatic flat deduction with no clause and no actual cost incurred is a deduction without basis, and it is one of the most commonly challenged items in deposit disputes.'],
  ['What about normal wear and tear?', 'Normal wear and tear is the expected consequence of ordinary use over the tenancy and should not be treated as damage. Faded paint, minor scuffs, worn fittings and small nail holes are generally in that category. A broken fixture, a stained floor or a damaged door is not.'],
  ['Does a forfeiture clause in the contract settle the matter?', 'Not by itself. Section 74 of the Contract Act allows reasonable compensation not exceeding the amount named, and the Supreme Court in Kailash Nath Associates v. DDA held that damage or loss is a necessary condition for the section to apply. A sum named in a contract is a ceiling on what may be claimed, not an automatic entitlement.'],
  ['So the other side must prove their loss?', 'In substance, yes, where the deduction is in the nature of a penalty. The party retaining the money must be able to show the loss it is compensating. A deduction asserted without a quantified loss or supporting bills is open to challenge whatever the clause says.'],
  ['Is forfeiture of earnest money different?', 'It can be. Forfeiture of a reasonable amount paid as earnest money is not necessarily a penalty, and the courts have treated earnest money differently from a refundable security deposit. The label used in the document is not decisive; what matters is the character of the payment.'],
  ['Is there a cap on how much deposit can be taken?', 'Under the Model Tenancy Act, 2021, the deposit is capped at two months’ rent for residential premises and six months’ rent for non-residential premises. But the Model Act is a model — it binds only in a State that has adopted it or reflected it in State law. Several States have; many have not.'],
  ['When must a rental deposit be refunded?', 'As the agreement provides, and in a State applying the Model Tenancy framework, at the time of vacating after deducting lawful amounts. Where the agreement is silent, the obligation arises on handover of vacant possession once dues are settled.'],
  ['Can a landlord hold the deposit until a new tenant is found?', 'Not unless the agreement expressly says so, which is unusual. Finding a replacement tenant is the landlord’s commercial problem, not a condition of refund.'],
  ['Can the deposit be adjusted against the last month’s rent?', 'Only if the agreement permits or both sides agree. Many agreements expressly prohibit it, because the deposit is meant to remain available for damage assessed after possession is returned.'],
  ['Can I file a consumer complaint against my landlord?', 'Usually not, and this is widely misunderstood. A lease of immovable property has generally been held not to be the hiring of a service, so a tenant is ordinarily not a consumer in relation to the landlord and the complaint is not maintainable before a consumer commission. The position differs where the counterparty is a builder, developer or service provider — there, a service is being rendered.'],
  ['So where does a tenancy deposit claim go?', 'Civil court as a money claim, or the rent authority or tribunal under the State tenancy law where the State has one with jurisdiction over deposit disputes. For a commercial lease above the specified value, the commercial court route applies, with pre-institution mediation.'],
  ['What if there is no written agreement at all?', 'Recovery is still possible. Bank transfer records, rent receipts, correspondence, utility accounts in your name and evidence of handover can establish both the deposit and the tenancy. It is harder, and it is a reason never to pay a deposit in cash without a receipt.'],
  ['Can interest be claimed on a withheld deposit?', 'Where the agreement provides for it, or where the delay justifies a claim for interest on a written demand. State the basis rather than asserting a rate. In commercial leases, interest on the deposit is sometimes expressly provided.'],
  ['What if the landlord claims damage exceeding the deposit?', 'Ask for the inspection record, dated photographs, the repair estimates and the actual bills. A damage claim that cannot be itemised and evidenced is rarely sustained, and the burden of showing the loss sits with the person retaining the money.'],
  ['What is the single most useful thing I can do before vacating?', 'A joint inspection with the landlord, recorded in writing, with dated photographs of every room, the meters and the fittings, and a signed handover acknowledgement for the keys. Deposit disputes are won and lost on what was documented on the day of handover.'],
  ['Can an employer take a security deposit from an employee?', 'The arrangement has to be examined against the employment contract and the wage provisions. Deductions from wages are confined to a closed statutory list, and an employer cannot simply withhold earned wages as a deposit. Where a genuine deposit was paid, it is refundable once the employee’s obligations are complete.'],
  ['Can an employer enforce a training bond?', 'Only to the extent of actual, provable loss. A bond operating as a penalty rather than a genuine pre-estimate of loss is open to challenge under Section 74, and a bond amount bearing no relation to the training actually provided is frequently reduced or refused.'],
  ['Can an employer withhold a deposit because assets were not returned?', 'They may claim the value of unreturned assets, with proof. They cannot use that as a reason to withhold the entire deposit indefinitely without quantifying the claim.'],
  ['What about vendor and franchise deposits?', 'These are contractual and the forfeiture clause matters, but the Section 74 analysis applies equally. A franchisor forfeiting a deposit on termination must still be able to show the loss it represents, and a minimum business commitment shortfall has to be computed rather than asserted.'],
  ['Is a security deposit affected if the business is sold or the landlord changes?', 'The obligation generally travels with the property or the contract, but it should be addressed expressly in the transfer documents. A tenant whose landlord sells should obtain written confirmation from the new owner that the deposit stands to their credit.'],
  ['What is the limitation period?', 'Generally three years, running from when the right to recover arises — ordinarily the date the refund became due under the agreement or on handover. Do not let it drift; deposit claims are often left because the amount feels not worth the effort until it is too late.'],
  ['Does a legal notice extend limitation?', 'No. Only a written acknowledgement by the deposit holder before the period expires, or a part payment, has that effect.'],
  ['Should I send a notice before filing?', 'Almost always. It fixes the amount, forces the holder to state their deductions with reasons, and frequently produces payment. It also exposes an after-the-fact deduction list for what it is.'],
  ['The deposit holder has gone quiet. What now?', 'Send the notice to the correct address through a trackable mode and preserve the dispatch record. Silence in the face of a documented demand removes the defence that no claim was made, and supports the inference there was nothing to say.'],
  ['What is the biggest mistake in deposit disputes?', 'Handing over possession without a joint inspection, dated photographs and a signed handover acknowledgement. Everything after that is an argument about the condition of a property the other side now controls.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Contracts' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Refund of Security Deposit Notice' }]}
      title="Refund of Security Deposit Notice"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Refund of Security Deposit Notice"
      sections={sections}
      ctaTitle="Speak With a Deposit Recovery Expert"
      ctaDescription="Establish the deposit, the refund trigger and the handover, then put the burden of justifying every deduction where it belongs."
      quickFacts={[
        { label: 'Deposit nature', value: 'Security, not earned' },
        { label: 'Forfeiture', value: 'Needs proof of loss' },
        { label: 'MTA cap', value: '2 months residential' },
        { label: 'Consumer route', value: 'Usually unavailable vs landlord' }
      ]}
      relatedArticles={[
        { title: 'Lease Agreement Drafting', href: '/solutions/legal/lease-agreement-drafting', category: 'Legal', description: 'Term, rent, deposit, escalation, registration and the clauses that decide disputes.' },
        { title: 'Recovery Notice of Dues', href: '/solutions/legal/recovery-notice-of-dues', category: 'Legal', description: 'Computing the claim, stating the interest basis, and serving a demand that can be proved.' },
        { title: 'Non Payment of Salary', href: '/solutions/legal/non-payment-of-salary', category: 'Legal', description: 'Wage dues, lawful deductions and the two-working-day exit rule under the Code on Wages.' }
      ]}
      finalCtaTitle="Make Them Justify Every Deduction"
      finalCtaDescription="A deposit is held as security against identified liabilities. The person keeping it has to show what loss each deduction compensates — which is a question most deduction lists cannot survive."
      heroDescription={<p>A security deposit is one of the few sums people hand over expecting to get back, and one of the most frequently retained on reasoning that does not survive examination. Painting charges with no clause. Flat cleaning deductions with no bill. Normal wear and tear reclassified as damage. A forfeiture clause invoked without any loss to compensate. Estabizz assists tenants, landlords, commercial lessees, employees, vendors, franchisees and businesses with agreement and clause review, deposit and handover evidence, deduction analysis, refund computation, legal notice drafting, dispatch and proof of service, reply analysis, settlement documentation, forum assessment and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a security deposit is your money, held by someone else against the possibility that you might owe them something.</p>
        <p>That framing settles most deposit disputes before they start. The deposit is not consideration, it is not a fee, and it is not the holder&rsquo;s to keep because the relationship ended. It is security. When the relationship ends and nothing is owed, it comes back. When something is owed, that something is deducted — and the person deducting has to be able to say what it is and what it cost.</p>
        <p>The disputes arise almost entirely because that second step is skipped. A deduction list arrives with round numbers, no bills and no inspection record, and the claimant is left arguing about a property or a situation the other side now controls.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A refund of security deposit notice is not a licence or a registration. It is a legal demand for the return of a refundable deposit, or the balance of it after deductions that can actually be justified.</p>
        <p>The claim rests on the contract, read with the Indian Contract Act, and for tenancies with the Transfer of Property Act and the State tenancy law. A contractual forfeiture clause is not the end of the matter: Section 74 permits reasonable compensation not exceeding the sum named, and the Supreme Court has held that loss or damage is a necessary condition for the section to operate.</p>
      </Section>

      <Section id="forfeiture" title="Forfeiture Requires Proof of Loss">
        <div className="info-box" aria-label="Section 74 and Kailash Nath">
          <p><strong>A clause permitting forfeiture sets a ceiling, not an entitlement.</strong> Section 74 of the Indian Contract Act allows the aggrieved party to receive reasonable compensation not exceeding the amount named in the contract. In <em>Kailash Nath Associates v. Delhi Development Authority</em> the Supreme Court held that because Section 74 awards reasonable compensation for damage or loss caused by a breach, damage or loss is a necessary condition for its application — and that reasonable compensation is fixed on the principles that apply under Section 73. A party retaining a deposit as a penalty must therefore be able to point to the loss it compensates.</p>
        </div>
        <DataTable headers={['Position taken by the holder', 'How it stands up']} rows={[
          ['"The contract says the deposit is forfeited"', 'The clause caps the claim; it does not establish the loss'],
          ['"You breached, so we keep the deposit"', 'Breach alone is not the measure — the loss caused by it is'],
          ['"We do not have to prove our loss"', 'Where the deduction is penal in character, loss is what Section 74 compensates'],
          ['"The amount was agreed in advance"', 'A genuine pre-estimate of loss is respected; an arbitrary figure is not'],
          ['"It is earnest money, not a deposit"', 'Earnest money is treated differently, but the label is not decisive'],
          ['"We incurred costs"', 'Then produce them — invoices, estimates and the inspection record'],
          ['"The property needed work"', 'Beyond normal wear and tear, and evidenced'],
          ['"It covers our inconvenience"', 'Not a quantifiable head of loss'],
          ['"Industry practice"', 'Practice does not displace the contract and the statute']
        ]} />
        <p>This single point reframes the whole negotiation. The claimant does not have to disprove the deductions; the holder has to establish them. A notice drafted around that shift is considerably more effective than one that argues item by item about whether a wall really needed repainting.</p>
      </Section>

      <Section id="deposit-types" title="Deposit, Advance or Earnest Money">
        <p>The character of the payment determines what can be done with it, and the word used in the document is not conclusive. Look at what the payment was for.</p>
        <DataTable headers={['Payment', 'Character', 'On termination']} rows={[
          ['Refundable security deposit', 'Security against identified liabilities', 'Returned, less proven dues and damage'],
          ['Interest-free refundable deposit', 'Security, with the holder retaining the benefit of the funds', 'Returned in full, less proven deductions'],
          ['Advance rent', 'Payment towards the obligation itself', 'Adjusted against rent, not refundable as a deposit'],
          ['Earnest money', 'Evidence of good faith in a contract to be performed', 'Forfeiture of a reasonable amount may be permissible'],
          ['Token or booking amount', 'Depends on the terms', 'Often treated as earnest money; read the document'],
          ['Non-refundable deposit', 'A fee by another name', 'Scrutinise whether it is genuinely non-refundable or a penalty'],
          ['Performance security', 'Security for performance of obligations', 'Released on completion, less proven claims'],
          ['Retention money', 'Held against defect liability', 'Released after the defect liability period'],
          ['Training or bond deposit', 'Security against a service commitment', 'Enforceable only to the extent of actual loss']
        ]} />
      </Section>

      <Section id="deductions" title="Lawful and Arbitrary Deductions">
        <DataTable headers={['Deduction', 'Sustainable if', 'Challengeable where']} rows={[
          ['Unpaid rent', 'Rent is genuinely outstanding, with the ledger', 'Rent was paid, or the period is disputed'],
          ['Utility dues', 'Bills relate to your period of occupation', 'Bills are not produced, or relate to another period'],
          ['Maintenance or society dues', 'Payable by you under the agreement, with society records', 'The society record is not produced'],
          ['Property damage', 'Beyond normal wear and tear, with photographs and bills', 'No inspection record and no quantified cost'],
          ['Repainting', 'The agreement expressly provides for it', 'Applied as an automatic deduction with no clause'],
          ['Cleaning', 'The agreement permits and a cost was incurred', 'A flat figure with no invoice'],
          ['Key or lock replacement', 'Keys were not returned, or the lock was damaged', 'Keys were handed over against acknowledgement'],
          ['Notice period shortfall', 'The agreement requires notice and it was not served', 'Notice was served, waived, or the exit was accepted'],
          ['Lock-in period breach', 'A lock-in exists and was broken', 'The lock-in had expired or was mutually released'],
          ['Brokerage on reletting', 'The agreement expressly places it on you', 'No clause — this is the landlord’s cost'],
          ['Loss of rent until reletting', 'Only where the agreement supports it and loss is shown', 'Asserted generally, with no mitigation'],
          ['Penalty or service charge', 'A genuine pre-estimate of loss', 'An arbitrary figure, or disproportionate'],
          ['"Processing" or "administrative" charges', 'Rarely sustainable', 'No contractual basis and no cost incurred']
        ]} />
        <p>Where a deduction list arrives after the demand rather than with the handover statement, the timing is itself a point. Deductions constructed in response to a claim read differently from ones recorded at inspection.</p>
      </Section>

      <Section id="wear-tear" title="Wear and Tear Is Not Damage">
        <DataTable headers={['Condition', 'Usually wear and tear', 'Usually damage']} rows={[
          ['Paint', 'Fading, minor marks over a long tenancy', 'Writing, staining, large patches, deliberate marking'],
          ['Walls', 'Small nail holes from fixtures', 'Large holes, removed sections, structural alteration'],
          ['Flooring', 'Dulling, light scratches over years', 'Cracked or broken tiles, burn marks, deep gouges'],
          ['Fittings and fixtures', 'Loosening, ordinary ageing', 'Broken, missing or removed'],
          ['Doors and windows', 'Stiffness, minor wear to handles', 'Broken panes, damaged frames, forced locks'],
          ['Bathroom fittings', 'Discolouration, worn washers', 'Cracked sanitary ware, missing taps'],
          ['Kitchen', 'Worn counter surfaces', 'Burnt or broken counters, removed cabinetry'],
          ['Electrical', 'Aged switches and sockets', 'Damaged wiring, removed fixtures'],
          ['Cleanliness', 'Ordinary dust on handover', 'Left in a state requiring professional clearance'],
          ['Appliances provided', 'Ordinary decline in performance', 'Non-functional through misuse, or removed']
        ]} />
        <p>The distinction turns on the length of the occupation as well as the condition. Three years of ordinary residential use produces visible wear that a landlord cannot charge for; the same condition after three months suggests something else. This is why move-in photographs matter as much as move-out ones — the comparison is the evidence.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Contractual basis', 'Indian Contract Act, 1872'],
          ['Compensation and forfeiture', 'Sections 73 and 74 of the Indian Contract Act'],
          ['Lease and tenancy', 'Transfer of Property Act, 1882'],
          ['Lease registration', 'Registration Act, 1908, and the State stamp law'],
          ['State tenancy law', 'The rent control or tenancy legislation of the State'],
          ['Model framework', 'Model Tenancy Act, 2021, binding only where a State has adopted it'],
          ['Employment deposits', 'The employment contract, read with the Code on Wages, 2019'],
          ['Commercial disputes', 'Commercial Courts Act, 2015, including pre-institution mediation'],
          ['Civil recovery', 'Code of Civil Procedure, 1908'],
          ['Consumer route', 'Consumer Protection Act, 2019 — generally unavailable against a landlord'],
          ['Limitation', 'Limitation Act, 1963'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63'],
          ['Forums', 'Civil court, commercial court, rent authority or tribunal, or the consumer commission where a service is genuinely involved']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Contract Act, Section 37', 'Obligation to perform, including to refund'],
          ['Contract Act, Section 65', 'Restoration of benefit where an agreement becomes void'],
          ['Contract Act, Section 70', 'Compensation where a benefit is lawfully enjoyed'],
          ['Contract Act, Section 73', 'Compensation for loss caused by breach'],
          ['Contract Act, Section 74', 'Reasonable compensation not exceeding the sum named'],
          ['Contract Act, Section 75', 'Compensation to a party rightfully rescinding'],
          ['TPA, Section 105', 'What a lease is'],
          ['TPA, Section 106', 'Notice to determine a lease, where it applies'],
          ['TPA, Section 107', 'How a lease must be made'],
          ['TPA, Section 108', 'Rights and liabilities of lessor and lessee'],
          ['TPA, Section 111', 'Determination of a lease'],
          ['TPA, Section 116', 'Holding over after expiry'],
          ['Registration Act, Section 17', 'Compulsory registration of specified leases'],
          ['Registration Act, Section 49', 'Effect of non-registration'],
          ['Model Tenancy Act, 2021', 'Deposit caps and refund on vacating, where the State has adopted it'],
          ['Code on Wages, 2019, Sections 18 to 24', 'Permissible deductions, for employment deposits'],
          ['Limitation Act, Sections 18 and 19', 'Acknowledgement and part payment'],
          ['Commercial Courts Act, Section 12A', 'Pre-institution mediation for commercial lease deposit claims of the specified value']
        ]} />
      </Section>

      <Section id="rental" title="Rental Deposits">
        <DataTable headers={['Issue', 'What determines it']} rows={[
          ['The deposit amount', 'The agreement and the receipt or bank transfer'],
          ['The refund trigger', 'Handover of vacant possession, or as the agreement provides'],
          ['Refund timeline', 'The agreement; in Model Tenancy States, on vacating'],
          ['Rent arrears', 'The rent ledger and payment records'],
          ['Notice period', 'Whether notice was served, waived or accepted'],
          ['Lock-in period', 'Whether a lock-in existed and whether it had run'],
          ['Utility dues', 'Final bills for your period of occupation'],
          ['Society and maintenance', 'Who was liable under the agreement, and the society record'],
          ['Repainting and cleaning', 'Whether a clause exists and whether cost was incurred'],
          ['Damage', 'Move-in and move-out comparison, with photographs'],
          ['Key and possession handover', 'A signed acknowledgement is decisive'],
          ['Landlord changed during the tenancy', 'Written confirmation that the deposit stands to your credit']
        ]} />
        <p>Where a lease required registration and was not registered, that affects what can be proved by the document — see <Link href="/solutions/legal/lease-agreement-drafting">Lease Agreement Drafting</Link> for when registration is compulsory and the consequences of skipping it.</p>
      </Section>

      <Section id="tenancy-law" title="Deposit Caps and the Model Tenancy Act">
        <div className="warning-box" aria-label="The Model Tenancy Act is not automatically in force">
          <p><strong>The Model Tenancy Act, 2021 is a model law, not a central statute that applies by itself.</strong> It caps the security deposit at <strong>two months&rsquo; rent for residential premises</strong> and <strong>six months&rsquo; rent for non-residential premises</strong>, and requires refund at the time of vacating after deducting lawful amounts. But tenancy is a State subject: the caps bind only in a State that has adopted the Act or reflected it in its own tenancy law. Several States have done so and others have not, so the first question is always which State law governs your tenancy.</p>
        </div>
        <DataTable headers={['Question', 'Why it matters']} rows={[
          ['Has your State adopted the Model Tenancy framework?', 'Determines whether the caps and timelines apply at all'],
          ['Does an older rent control Act apply instead?', 'Rent control statutes have their own deposit and eviction regimes'],
          ['Is there a State rent authority or tribunal?', 'It may be the forum rather than the civil court'],
          ['Was the tenancy registered where required?', 'Several frameworks require registration of the tenancy'],
          ['Residential or non-residential', 'The cap differs, where a cap applies'],
          ['Was more than the cap taken?', 'Where the cap applies, the excess is recoverable'],
          ['Does the agreement conflict with the State law?', 'A contract cannot contract out of a binding statutory provision'],
          ['Commercial lease in a State with no cap', 'The agreement governs, subject to the Contract Act']
        ]} />
      </Section>

      <Section id="commercial" title="Commercial Lease Deposits">
        <p>Commercial deposits are larger, the documentation is heavier, and the disputes turn on reconciliation rather than on wear and tear.</p>
        <DataTable headers={['Issue', 'What to examine']} rows={[
          ['The lease deed', 'Deposit, refund, forfeiture, lock-in and termination clauses'],
          ['Registration and stamp duty', 'Whether the lease was registered where required'],
          ['Lock-in period', 'Whether it had expired, and the consequence of early exit'],
          ['Notice period', 'Whether proper notice was given'],
          ['Common area maintenance', 'CAM reconciliation, often the largest contested item'],
          ['Utility and facility charges', 'Electricity, water, diesel generator and HVAC'],
          ['Fit-out and restoration', 'Whether the lease required restoration to bare shell'],
          ['Handover condition', 'Joint inspection and the snag list'],
          ['Tax on rent and the deposit', 'Treatment agreed between the parties'],
          ['Tax deducted at source', 'Reconciliation of deductions against certificates'],
          ['Interest on the deposit', 'Whether the lease provides for it'],
          ['Adjustment against rent', 'Whether the lease permits it'],
          ['Forum', 'Civil or commercial court, or arbitration under the lease'],
          ['Pre-institution mediation', 'Applies to a commercial suit of the specified value']
        ]} />
        <p>Where the claim is a commercial dispute of the specified value and no urgent interim relief is contemplated, pre-institution mediation under Section 12A is a precondition to filing. See <Link href="/solutions/legal/recovery-from-debtors">Recovery From Debtors</Link> for how that gate operates.</p>
      </Section>

      <Section id="employee" title="Employee Deposits and Training Bonds">
        <DataTable headers={['Issue', 'Position']} rows={[
          ['A deposit taken from an employee', 'Refundable once obligations are complete, subject to the contract'],
          ['Withholding earned wages as a deposit', 'Deductions from wages are confined to a closed statutory list'],
          ['Deduction for an unreturned asset', 'Must be quantified and supported; see the wage provisions on damage or loss'],
          ['Training bond', 'Enforceable only to the extent of actual, provable loss'],
          ['A bond amount bearing no relation to the training', 'Open to challenge as a penalty under Section 74'],
          ['Notice period shortfall', 'Depends on the contract, notice served and any waiver'],
          ['Full and final settlement', 'The deposit should be shown and settled in the statement'],
          ['Relieving letter withheld over the deposit', 'Document release and refund are separate obligations'],
          ['Forum', 'The wage claims authority for wage components; civil for a contractual deposit'],
          ['Limitation', 'Three years; wage claims have their own statutory window']
        ]} />
        <p>Where the amount is in substance withheld salary rather than a deposit, the claim belongs under the wage framework, which carries a three-year window and the power to award compensation. See <Link href="/solutions/legal/non-payment-of-salary">Non Payment of Salary</Link>.</p>
      </Section>

      <Section id="vendor" title="Vendor, Franchise and Dealership Deposits">
        <DataTable headers={['Issue', 'What to examine']} rows={[
          ['The agreement', 'Deposit, refund, forfeiture and termination clauses'],
          ['Who terminated, and why', 'A wrongful termination changes the forfeiture position'],
          ['Minimum business commitment', 'Whether a shortfall occurred, and how it was computed'],
          ['Performance obligations', 'Whether they were met, with records'],
          ['Outstanding invoices both ways', 'Reconciliation before the deposit is addressed'],
          ['Stock, equipment and signage return', 'Handover proof'],
          ['Brand and territory closure', 'Franchise exit obligations'],
          ['Forfeiture clause', 'Caps the claim; the loss still has to be shown'],
          ['Set-off against dues', 'Whether the agreement permits it'],
          ['Arbitration clause', 'The forum, and whether it is proportionate to the amount'],
          ['Commercial court route', 'Where the specified value is met'],
          ['Tax records', 'Invoice and ledger reconciliation']
        ]} />
      </Section>

      <Section id="forum" title="Where the Claim Goes">
        <div className="warning-box" aria-label="The consumer route is usually not available against a landlord">
          <p><strong>A tenant is generally not a consumer in relation to their landlord.</strong> A lease of immovable property has been held not to be the hiring of a service, so a complaint against a landlord for withholding a deposit is ordinarily not maintainable before a consumer commission. This is one of the most common wrong turns in deposit disputes, and it costs months. The position is different where the counterparty is a builder, developer or service provider, because there a service is genuinely being rendered.</p>
        </div>
        <DataTable headers={['Your situation', 'Forum to assess']} rows={[
          ['Residential tenancy deposit', 'Civil court as a money claim, or the State rent authority or tribunal where it has jurisdiction'],
          ['Commercial lease deposit, specified value met', 'Commercial court, after pre-institution mediation'],
          ['Commercial lease with an arbitration clause', 'Arbitration, invoked by notice'],
          ['Employee deposit that is in substance withheld wages', 'The wage claims authority'],
          ['Employee deposit that is contractual', 'Civil court'],
          ['Vendor or franchise deposit', 'Per the agreement — arbitration, commercial or civil'],
          ['Builder or developer holding a booking amount', 'Consumer commission, or the real estate authority'],
          ['Service provider holding a refundable deposit', 'Consumer commission may be available'],
          ['Small amount, cooperative counterparty', 'Notice and settlement; litigation may cost more than the deposit'],
          ['Counterparty is untraceable', 'Assess recoverability before spending on proceedings']
        ]} />
      </Section>

      <Section id="notice" title="What the Notice Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['The parties, correctly identified', 'Legal names and the address for service'],
          ['The agreement', 'Date, parties and the clause creating the deposit'],
          ['The deposit amount and how it was paid', 'With the receipt or bank reference'],
          ['The refund clause', 'The contractual obligation being enforced'],
          ['The refund trigger', 'Vacating, handover, resignation, completion or termination, with the date'],
          ['Proof of handover', 'Keys returned, possession given, assets delivered back'],
          ['Dues cleared', 'Rent, utilities and maintenance, with evidence — this removes the usual defence'],
          ['Deductions challenged individually', 'Each one, with why it lacks a contractual or evidential basis'],
          ['A demand for the deduction record', 'Inspection report, photographs, estimates and bills'],
          ['The amount demanded', 'Net, and reconciled'],
          ['Interest, where claimed', 'On a stated basis, not an asserted rate'],
          ['A payment deadline', 'Specific and reasonable'],
          ['Bank details', 'Removes the last excuse'],
          ['The consequence named', 'The specific forum, not a vague threat'],
          ['A settlement window', 'Separately marked, where you are open to one']
        ]} />
        <div className="info-box" aria-label="Shift the burden">
          <p><strong>Ask for the deduction record rather than arguing about the deductions.</strong> A notice that demands the joint inspection report, the dated photographs, the repair estimates and the paid invoices puts the burden exactly where Section 74 places it. Deduction lists built after the event rarely survive that request, and the absence of a response to it is itself useful at the next stage.</p>
        </div>
      </Section>

      <Section id="evidence" title="Evidence Before You Hand Over">
        <p>Deposit disputes are decided by what was recorded on the day possession changed hands. After that, the other side controls the property and the narrative.</p>
        <DataTable headers={['Step', 'What to capture', 'When']} rows={[
          ['Move-in condition record', 'Dated photographs of every room, fitting and meter', 'Before you occupy'],
          ['Inventory of fittings and appliances', 'Signed by both sides', 'At move-in'],
          ['Meter readings', 'Electricity, water and gas, photographed', 'At move-in and move-out'],
          ['Joint inspection at exit', 'Walkthrough with the other party, recorded in writing', 'On handover'],
          ['Move-out photographs', 'The same angles as the move-in set', 'On handover'],
          ['Key handover acknowledgement', 'Signed and dated receipt', 'On handover'],
          ['Final utility bills and clearances', 'Paid receipts for your period', 'Before or at handover'],
          ['Society or maintenance no-dues', 'Written confirmation', 'Before handover'],
          ['Rent payment record', 'Statement showing no arrears', 'At handover'],
          ['Written handover confirmation', 'That vacant possession was given on a stated date', 'On handover'],
          ['Deduction statement from the holder', 'Request it in writing on the day', 'At handover'],
          ['Communications', 'Preserved in full, from the original account', 'Throughout']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Deposit type, amount and the dispute'],
          ['2', 'Agreement review', 'Deposit, refund, deduction, lock-in and notice clauses'],
          ['3', 'Deposit proof review', 'Receipt, bank transfer or ledger entry'],
          ['4', 'Refund trigger', 'The date the obligation arose'],
          ['5', 'Handover evidence', 'Possession, keys, assets and the inspection record'],
          ['6', 'Dues reconciliation', 'Rent, utilities, maintenance and any genuine liability'],
          ['7', 'Deduction analysis', 'Each item tested against clause, evidence and proportionality'],
          ['8', 'Refund computation', 'The net amount actually due'],
          ['9', 'Limitation review', 'When the claim expires'],
          ['10', 'Forum assessment', 'Civil, commercial, rent authority, wage authority or consumer'],
          ['11', 'Notice drafting', 'Demand with the deduction record requested'],
          ['12', 'Dispatch and service record', 'Trackable modes, with evidence retained'],
          ['13', 'Reply analysis', 'Deductions asserted, and whether they are evidenced'],
          ['14', 'Settlement documentation', 'Agreed figure, timeline and closure terms'],
          ['15', 'Filing readiness', 'Annexed file for the chosen forum'],
          ['16', 'Tracking', 'Ticket-based updates to recovery']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Rent, lease or other agreement', 'Deposit, refund and deduction terms'],
          ['Deposit receipt', 'Proof that the deposit was paid'],
          ['Bank transfer record', 'Independent payment evidence'],
          ['Rent or payment ledger', 'That nothing is outstanding'],
          ['Termination or resignation notice', 'The exit timeline'],
          ['Handover acknowledgement', 'That possession was returned'],
          ['Key handover record', 'Decisive on possession'],
          ['Move-in photographs', 'The comparison baseline'],
          ['Move-out photographs', 'Condition at handover'],
          ['Joint inspection report', 'Agreed condition'],
          ['Meter readings', 'Utility reconciliation'],
          ['Final utility bills and receipts', 'Dues cleared'],
          ['Society no-dues certificate', 'Maintenance cleared'],
          ['Any deduction statement received', 'What is actually being claimed'],
          ['Damage estimates or repair bills produced', 'Whether the deduction is evidenced'],
          ['Correspondence and chat records', 'Admissions and promises to refund'],
          ['Employment contract and F&F statement', 'Employee deposit matters'],
          ['Vendor or franchise agreement', 'Commercial deposit matters'],
          ['Company master data for the holder', 'Correct entity and address']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Deposits Are Not Recovered">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Possession handed over with no record', 'Condition becomes a matter of assertion', 'Handover evidence reconstructed from whatever exists'],
          ['No move-in photographs', 'No baseline for the damage comparison', 'Alternative evidence of condition and tenure'],
          ['Deposit paid in cash with no receipt', 'The deposit itself has to be proved', 'Bank records, correspondence and surrounding evidence'],
          ['Deduction list accepted at face value', 'Unsupported items go unchallenged', 'Each item tested against clause and evidence'],
          ['Arguing each deduction instead of demanding proof', 'The burden stays on you', 'Notice that requests the inspection and billing record'],
          ['Consumer complaint filed against a landlord', 'Not maintainable; months lost', 'Forum assessed before anything is filed'],
          ['Commercial claim filed without Section 12A mediation', 'Plaint liable to be rejected', 'Mediation completed first where it applies'],
          ['Forfeiture clause treated as conclusive', 'The claim is abandoned unnecessarily', 'Section 74 analysis and the proof-of-loss requirement'],
          ['Wrong entity or address used', 'Service denied', 'Records verified before dispatch'],
          ['Interest demanded with no basis', 'The claim looks inflated', 'Interest on a stated contractual or statutory basis'],
          ['Waiting because the amount feels small', 'Limitation expires', 'Limitation reviewed at the first consultation'],
          ['Settlement agreed verbally', 'Payment never follows', 'Written terms with dates and a default clause']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Agreement and clause review', 'Deposit, refund, deduction, lock-in and notice terms'],
          ['Deposit proof verification', 'Receipt, bank transfer and ledger'],
          ['Handover evidence review', 'Possession, keys, inspection and photographs'],
          ['Dues reconciliation', 'Rent, utilities, maintenance and genuine liabilities'],
          ['Deduction analysis', 'Each item against clause, evidence and proportionality'],
          ['Refund computation', 'The net amount actually recoverable'],
          ['Limitation review', 'When the claim expires and how to preserve it'],
          ['Forum assessment', 'Civil, commercial, rent authority, wage authority or consumer'],
          ['Legal notice drafting', 'Demand that requests the deduction record'],
          ['Dispatch and service record', 'Trackable modes with evidence retained'],
          ['Reply analysis', 'Whether the asserted deductions are evidenced'],
          ['Negotiation support', 'Agreed figure and realistic settlement'],
          ['Settlement documentation', 'Timeline, closure and default terms'],
          ['Commercial lease deposit support', 'CAM, restoration, tax and ledger reconciliation'],
          ['Employee deposit support', 'Contract, wage provisions and F&F review'],
          ['Vendor and franchise deposit support', 'Forfeiture clause and performance records'],
          ['Landlord-side support', 'Defensible deduction statements with evidence'],
          ['Advocate coordination', 'Brief, chronology and evidence file'],
          ['Ticket-based tracking', 'Review, notice, dispatch, reply, settlement and recovery']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A security deposit is held, not earned, and that single proposition decides most of these disputes. A forfeiture clause caps what can be claimed; it does not establish the loss, and Section 74 compensates loss rather than breach. So the notice that works does not argue about whether a wall needed repainting — it asks for the inspection record, the estimate and the paid invoice. Most deduction lists do not survive that request, because they were written after the demand rather than at the handover.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Entitlement to a refund, the validity of deductions, the appropriate forum and the applicable limitation depend on the agreement, the evidence and the law of the State concerned. Tenancy is a State subject and rent, deposit and eviction rules differ materially between States; the Model Tenancy Act, 2021 applies only where a State has adopted it or reflected it in State law. Parts of this guide remain under professional review. Estabizz provides agreement review, evidence and deduction analysis, refund computation, drafting support, dispatch coordination, settlement documentation and filing coordination; appearance before a court, tribunal or authority is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
