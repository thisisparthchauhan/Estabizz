'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-must', title: 'What Must Be Registered' },
  { id: 'deadlines', title: 'The Four-Month Window' },
  { id: 'section-47', title: 'A Deed Operates From Execution' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'stamp', title: 'Stamp Duty and Circle Rate' },
  { id: 'tds', title: 'TDS Moved to Form 141' },
  { id: 'deed-types', title: 'Deeds We Handle' },
  { id: 'before', title: 'Before You Sign Anything' },
  { id: 'process', title: 'How the Registration Runs' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'clauses', title: 'What the Deed Must Contain' },
  { id: 'poa', title: 'Registering Through a Power of Attorney' },
  { id: 'nri', title: 'NRI Buyers and Sellers' },
  { id: 'entity', title: 'Company, LLP and Trust Transactions' },
  { id: 'mutation', title: 'Registration Is Not Mutation' },
  { id: 'refusal', title: 'If Registration Is Refused' },
  { id: 'reform', title: 'The Registration Bill' },
  { id: 'common-issues', title: 'Why Registrations Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Is registration of a sale deed compulsory?', 'Yes. Under Section 54 of the Transfer of Property Act, sale of tangible immovable property of the value of one hundred rupees and upwards can be made only by a registered instrument, and Section 17 of the Registration Act makes such instruments compulsorily registrable. In practice that means every sale of immovable property.'],
  ['What happens if a document that must be registered is not?', 'Section 49 of the Registration Act is severe: an unregistered document that was required to be registered does not affect the immovable property, and cannot be received as evidence of the transaction it records. It survives only in limited collateral ways. Possession and payment do not cure it.'],
  ['How long do I have to present the document for registration?', 'Four months from the date of execution, under Section 23. Where the delay was unavoidable, Section 25 allows the Registrar to accept the document within a further four months on payment of a fine that may extend to ten times the proper registration fee. Beyond that the document cannot be registered at all.'],
  ['Does a deed take effect from registration or from execution?', 'From execution. Section 47 provides that a registered document operates from the time it would have commenced to operate if no registration had been required, and not from the time of its registration. This matters when two transactions compete, and it is why the date of execution is recorded carefully.'],
  ['Does an agreement to sell transfer ownership?', 'No. An agreement to sell creates a contractual right; it does not convey title. Title passes under a registered conveyance. An agreement does, however, need to be registered if it is relied on for part performance — Section 17(1A) provides that a contract to transfer for consideration for the purposes of Section 53A of the Transfer of Property Act has no effect for that section unless registered.'],
  ['Is a gift of immovable property registrable?', 'Yes. Sections 122 and 123 of the Transfer of Property Act require a gift of immovable property to be effected by a registered instrument signed by the donor and attested by at least two witnesses. Acceptance by the donee during the donor’s lifetime is also essential.'],
  ['Which leases must be registered?', 'Under Section 107 of the Transfer of Property Act, a lease from year to year, for a term exceeding one year, or reserving a yearly rent, can be made only by a registered instrument. Shorter leases may be made by a registered instrument or by oral agreement with delivery of possession. States vary in practice, so check locally.'],
  ['Where must the document be registered?', 'Section 28 requires a document relating to immovable property to be presented in the office of the Sub-Registrar within whose sub-district the whole or some portion of the property is situated. Convenience does not determine the office.'],
  ['Who can present the document?', 'Section 32 — a person executing or claiming under the document, their representative or assign, or their agent holding a power of attorney recognised under Section 33. A power of attorney that does not meet Section 33 will not be accepted at the counter.'],
  ['What is the stamp duty?', 'It is fixed by State legislation and varies by State, by instrument and sometimes by the category of the buyer. Duty is computed on the consideration or the circle rate value, whichever is higher. Several States offer a concession for female purchasers, and some offer concessional duty for transfers within a family.'],
  ['What is circle rate and why does it matter?', 'The State-notified minimum value for the locality and category, also called the ready reckoner rate or guideline value. It sets the floor for stamp duty, and it is also the reference point for the income-tax consequences if the price is below it.'],
  ['What happens if the document is under-stamped?', 'It is liable to be impounded, duty and penalty become payable, and until that is done the document faces admissibility problems in evidence. Deliberate under-stamping to save duty tends to surface at the worst possible moment — on a resale or a loan application years later.'],
  ['Is TDS payable on a property purchase?', 'Where the seller is resident and the consideration or stamp duty value is fifty lakh rupees or more, tax is deducted at one per cent on the higher of the two. Under the Income-tax Act, 2025 this sits at Section 393(1), Table serial number 3(i), applying from 1 April 2026.'],
  ['Is Form 26QB still used?', 'No. Under the Income-tax Rules, 2026 the property TDS statement is filed in Form 141, which replaces Form 26QB. Advice still referring to Form 26QB is working from the superseded framework.'],
  ['By when must the TDS be deposited?', 'Within thirty days from the end of the month in which the deduction was made, along with the filing. Buyers who treat this as the seller’s problem find the default is recorded against them, not the seller.'],
  ['What if the seller is an NRI?', 'Entirely different rules. The one per cent resident provision does not apply; deduction is at the rates applicable to a non-resident on the capital gain, under Section 393(2), Table serial number 17 of the Income-tax Act, 2025. The buyer needs a TAN, and the seller may apply for a lower-deduction certificate. Applying resident logic to an NRI sale is one of the most expensive mistakes in property buying.'],
  ['Can property be registered through a power of attorney?', 'Yes, where the power of attorney is valid, properly stamped, and in the form the registering authority recognises under Section 33. For an NRI, execution before a notary abroad with apostille or consular attestation, followed by adjudication of stamp duty in India, is the usual route.'],
  ['Does a power of attorney transfer ownership?', 'No. The Supreme Court has held that a sale through a general power of attorney, an agreement and a will does not convey title. A so-called "GPA sale" gives possession and problems, not ownership.'],
  ['Who pays the stamp duty and registration fee?', 'Conventionally the buyer, but it is a matter of agreement and should be stated in the deed. Leaving it to local practice produces an argument at the Sub-Registrar’s office on the day.'],
  ['What is mutation and is it the same as registration?', 'No. Registration records the instrument with the Sub-Registrar; mutation updates the revenue or municipal record so the property stands in the new owner’s name for tax and local purposes. Mutation is not proof of title, but a missing mutation causes practical difficulty on every subsequent transaction.'],
  ['Can an error in a registered deed be corrected?', 'Yes, by a rectification deed executed by the same parties and registered. It is straightforward while both parties are available and cooperative, and very difficult afterwards — which is why the description and party details should be checked before execution, not after.'],
  ['Can registration be refused?', 'Yes. Section 71 requires the registering officer to record the reasons for refusal, and Sections 72 to 77 provide the route by appeal to the Registrar and by suit. The reasons recorded are the starting point for any challenge.'],
  ['Should I verify title before registration?', 'Before paying substantial money, not merely before registration. Verification after the consideration has moved is a post-mortem. See our Property Verification guide for what the exercise covers.'],
  ['Is the Registration Act being replaced?', 'A draft Registration Bill, 2025 was published for public consultation by the Department of Land Resources in May 2025, proposing online registration, removal of the hundred-rupee threshold, and compulsory registration of agreements to sell and of powers of attorney authorising transfer. It is a draft. The Registration Act, 1908 remains the law.'],
  ['What is the biggest mistake in property registration?', 'Booking the registration appointment before the file is ready — title chain unverified, encumbrance not cleared, stamp duty uncomputed, TDS unaddressed, POA not adjudicated. The appointment is the last step in the process, not the first.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Property' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Property Registration' }]}
      title="Property Registration"
      readTime="17 min read"
      hideReviewBadge
      focusKeyword="Property Registration"
      sections={sections}
      ctaTitle="Speak With a Property Law Expert"
      ctaDescription="Get the title, the duty, the TDS and the authority documents right before the appointment is booked."
      quickFacts={[
        { label: 'Main law', value: 'Registration Act, 1908' },
        { label: 'Presentation window', value: 'Four months' },
        { label: 'TDS provision', value: 'Section 393, Form 141' },
        { label: 'Deed operates from', value: 'Date of execution' }
      ]}
      relatedArticles={[
        { title: 'Property Verification', href: '/solutions/legal/property-verification', category: 'Legal', description: 'Title chain, encumbrance, approvals, litigation and possession — before the money moves.' },
        { title: 'Property Valuation', href: '/solutions/legal/property-valuation', category: 'Legal', description: 'Purpose, registered valuer, method and the stamp duty value rule.' },
        { title: 'Gift Deed Registration', href: '/solutions/legal/gift-deed-registration', category: 'Legal', description: 'Execution, acceptance, stamp duty and registration of a transfer without consideration.' }
      ]}
      finalCtaTitle="The Appointment Is the Last Step, Not the First"
      finalCtaDescription="Title verified, encumbrance released, duty computed, TDS handled, authority documents adjudicated. Files that arrive in that order register in one visit."
      heroDescription={<p>A property transaction is usually the largest single contract a person signs, and registration is the step that makes it enforceable against the world. One wrong survey number, an under-computed duty, a power of attorney the registry will not accept, or a TDS step treated as somebody else&rsquo;s problem can follow a property for decades. Estabizz assists buyers, sellers, families, NRIs, companies and developers with title document review, deed drafting and vetting, stamp duty computation, registration-fee and e-stamp support, TDS compliance, power of attorney and board authority review, builder and society documentation, Sub-Registrar coordination, post-registration mutation and safe-custody filing.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> registration puts your transaction on the public record, so that the world is treated as knowing about it.</p>
        <p>That is the real function, and it explains everything else. Because the record is public, the law is strict about what goes into it: who presented the document, when, before which office, on what duty, and whether the parties admitted execution. Because the record is relied on by future buyers and lenders, an error in it is not a clerical problem — it is a defect that sits in the chain of title and reappears on every subsequent transaction.</p>
        <p>Most registration problems are therefore not registration problems at all. They are title, duty and authority problems that were carried into the registry unexamined.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Property registration is not a licence. It is a statutory process of recording an instrument affecting immovable property with the Sub-Registrar.</p>
        <p>It is governed by the Registration Act, 1908, the Transfer of Property Act, 1882, the stamp legislation of the State, and the State registration rules. It is compulsory for sale, gift, exchange, longer leases and most instruments creating or extinguishing rights in immovable property. A document that was required to be registered and was not does not affect the property at all — which is the consequence the whole process exists to avoid.</p>
      </Section>

      <Section id="what-must" title="What Must Be Registered">
        <DataTable headers={['Instrument', 'Position', 'Source']} rows={[
          ['Sale deed or conveyance', 'Compulsory', 'TPA Section 54; Registration Act Section 17'],
          ['Gift of immovable property', 'Compulsory', 'TPA Sections 122 and 123'],
          ['Exchange of immovable property', 'Compulsory', 'Registration Act Section 17'],
          ['Lease from year to year, exceeding one year, or reserving a yearly rent', 'Compulsory', 'TPA Section 107; Registration Act Section 17(1)(d)'],
          ['Partition deed affecting immovable property', 'Compulsory where rights are created or extinguished', 'Registration Act Section 17'],
          ['Release or relinquishment of an interest', 'Compulsory where immovable rights are released', 'Registration Act Section 17'],
          ['Settlement deed of immovable property', 'Compulsory', 'Registration Act Section 17'],
          ['Agreement to sell relied on for part performance', 'Compulsory for that purpose', 'Registration Act Section 17(1A)'],
          ['Mortgage other than by deposit of title deeds', 'Generally compulsory', 'TPA Section 59; State practice'],
          ['Mortgage by deposit of title deeds', 'Generally not registrable; State practice varies', 'TPA Section 58(f)'],
          ['Development or joint development agreement', 'Depends on the rights created and State law', 'State stamp and registration rules'],
          ['Power of attorney authorising transfer', 'Depends on use and State rules', 'Registration Act Section 33; State practice'],
          ['Rectification deed correcting a registered document', 'Registrable', 'Registration Act Section 17'],
          ['Will', 'Optional', 'Registration Act Section 18'],
          ['Lease of one year or less', 'Optional', 'TPA Section 107'],
          ['Family arrangement recording a pre-existing right', 'Depends on whether rights are created', 'Fact-specific; assess before execution']
        ]} />
        <div className="warning-box" aria-label="Consequence of non-registration">
          <p><strong>Section 49 is unforgiving.</strong> A document required to be registered which is not registered does not affect the immovable property comprised in it, does not confer any power to adopt, and cannot be received as evidence of any transaction affecting that property. Payment, possession and years of occupation do not repair it. The document survives only for limited collateral purposes, which is rarely what the parties wanted.</p>
        </div>
      </Section>

      <Section id="deadlines" title="The Four-Month Window">
        <DataTable headers={['Point', 'Position', 'Provision']} rows={[
          ['Time to present for registration', 'Within four months of execution', 'Registration Act Section 23'],
          ['Delay beyond four months', 'A further four months, at the Registrar’s discretion, on fine', 'Registration Act Section 25'],
          ['Maximum fine for delay', 'Up to ten times the proper registration fee', 'Registration Act Section 25'],
          ['Beyond eight months', 'The document cannot be registered', 'Registration Act Sections 23 and 25'],
          ['Document executed outside India', 'Separate provision for time running from arrival in India', 'Registration Act Section 26'],
          ['Appearance of the parties', 'Required within the prescribed period, extendable on fine', 'Registration Act Section 34'],
          ['A will', 'May be presented at any time', 'Registration Act Section 23 proviso']
        ]} />
        <p>The window is wider than most people think and narrower than they discover. Documents executed to beat a deadline — a financial year end, a duty revision — and then left while a loan or a dispute is resolved are the ones that run out of time. Where execution and registration are going to be separated, diary the Section 23 date at the moment of execution.</p>
      </Section>

      <Section id="section-47" title="A Deed Operates From Execution">
        <div className="info-box" aria-label="Effect of Section 47">
          <p><strong>A registered document operates from the date it was executed, not the date it was registered.</strong> Section 47 says so expressly: a registered document operates from the time it would have commenced to operate if no registration had been required or made. This becomes decisive where two instruments compete over the same property — a deed executed earlier and registered later can prevail over one executed later and registered first, which is precisely why the execution date is recorded with care and why an encumbrance search close to registration is not a complete answer.</p>
        </div>
        <p>It also means a gap between execution and registration is a period of exposure for the buyer. During it the seller remains on the public record, the transaction is invisible to anyone searching, and a competing dealing is possible. Keep the gap short, and where it cannot be short, understand what is being accepted.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Registration of instruments', 'Registration Act, 1908'],
          ['Substantive property law', 'Transfer of Property Act, 1882'],
          ['Stamp duty', 'Indian Stamp Act, 1899 and the State stamp legislation'],
          ['Circle rate or guideline value', 'State revenue notifications'],
          ['Registration procedure and fees', 'State registration rules'],
          ['Real estate projects', 'Real Estate (Regulation and Development) Act, 2016'],
          ['Tax on the transaction', 'Income-tax Act, 2025, applying from tax year 2026-27'],
          ['TDS on the purchase', 'Income-tax Act, 2025, Section 393, with Form 141 under the Income-tax Rules, 2026'],
          ['Stamp duty value for capital gains', 'Income-tax Act, 2025, Section 78'],
          ['Property received for inadequate consideration', 'Income-tax Act, 2025, Section 92(2)(m)'],
          ['Land records and mutation', 'State land revenue code and local record-of-rights rules'],
          ['Municipal records', 'Local body property tax and transfer rules'],
          ['Company charges', 'Companies Act, 2013, Sections 77 and following'],
          ['Benami risk', 'The benami transactions framework, where consideration and ownership diverge'],
          ['Cross-border transactions', 'FEMA and the regulations on acquisition and transfer of immovable property'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63 for e-stamp and digital records'],
          ['Authorities', 'Sub-Registrar, Registrar, revenue authority, municipal body, RERA Authority and the civil court']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Registration Act, Section 17', 'Documents of which registration is compulsory'],
          ['Registration Act, Section 17(1A)', 'Agreements relied on for part performance must be registered'],
          ['Registration Act, Section 18', 'Documents of which registration is optional'],
          ['Registration Act, Sections 21 and 22', 'Description of property, and reference to maps and surveys'],
          ['Registration Act, Section 23', 'Four months from execution to present the document'],
          ['Registration Act, Section 25', 'Condonation of delay, on fine up to ten times the registration fee'],
          ['Registration Act, Section 28', 'The office in whose sub-district the property is situated'],
          ['Registration Act, Section 32', 'Persons who may present a document for registration'],
          ['Registration Act, Section 33', 'Powers of attorney recognisable for presentation'],
          ['Registration Act, Section 34', 'Enquiry before registration, and appearance of the parties'],
          ['Registration Act, Section 35', 'Procedure on admission or denial of execution'],
          ['Registration Act, Section 47', 'A registered document operates from execution'],
          ['Registration Act, Section 49', 'Effect of non-registration'],
          ['Registration Act, Section 71', 'Reasons for refusal to register must be recorded'],
          ['Registration Act, Sections 72 to 77', 'Appeal to the Registrar, and suit where registration is refused'],
          ['TPA, Section 53A', 'Part performance, read with Registration Act Section 17(1A)'],
          ['TPA, Section 54', 'Sale, and the requirement of a registered instrument'],
          ['TPA, Section 55', 'Rights and liabilities of buyer and seller'],
          ['TPA, Section 58', 'Mortgage and its forms'],
          ['TPA, Sections 105 and 107', 'Lease, and how a lease must be made'],
          ['TPA, Sections 122 and 123', 'Gift, acceptance and the registered instrument'],
          ['Income-tax Act, 2025, Section 393', 'TDS on the transaction, for resident and non-resident sellers'],
          ['RERA, Sections 3, 4, 11, 13 and 19', 'Project registration, promoter obligations, agreement for sale and allottee rights']
        ]} />
      </Section>

      <Section id="stamp" title="Stamp Duty and Circle Rate">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Who sets the rate', 'The State — rates differ materially between States'],
          ['Base for computation', 'The consideration or the circle rate value, whichever is higher'],
          ['Circle rate', 'The State-notified minimum, also called ready reckoner or guideline value'],
          ['Instrument matters', 'Sale, gift, lease, release, partition and mortgage carry different duty'],
          ['Concessions', 'Several States charge lower duty for female purchasers'],
          ['Family transfers', 'Some States offer concessional duty for gift or release within a family'],
          ['Registration fee', 'Separate from duty, usually a percentage with a cap'],
          ['Payment', 'E-stamp or challan, before or at registration depending on the State'],
          ['Adjudication', 'Where the instrument or valuation is uncertain, the stamp authority can determine the duty'],
          ['Under-stamping', 'Impounding, duty and penalty, and admissibility problems in evidence'],
          ['Refund', 'Possible in some States where the transaction does not proceed; rules are State-specific'],
          ['Budgeting', 'Duty, fee, TDS, legal and incidental costs should all be planned before execution']
        ]} />
        <p>Where the circle rate exceeds the price actually agreed, two things follow at once: duty is charged on the higher figure, and the income-tax consequence under Section 78 and Section 92(2)(m) of the Income-tax Act, 2025 has to be considered on both sides of the transaction. See <Link href="/solutions/legal/property-valuation">Property Valuation</Link> for the tolerance band and how a valuation supports the position.</p>
      </Section>

      <Section id="tds" title="TDS Moved to Form 141">
        <div className="warning-box" aria-label="Change under the Income-tax Act, 2025">
          <p><strong>Form 26QB has been replaced.</strong> Under the Income-tax Act, 2025 and the Income-tax Rules, 2026 — applying from 1 April 2026 — TDS on the purchase of immovable property sits at Section 393(1), Table serial number 3(i), and the statement is filed in <strong>Form 141</strong>. Advice, templates and checklists still referring to Section 194-IA and Form 26QB are working from the superseded framework.</p>
        </div>
        <DataTable headers={['Point', 'Resident seller', 'Non-resident seller']} rows={[
          ['Provision under the Income-tax Act, 2025', 'Section 393(1), Table Sl. No. 3(i)', 'Section 393(2), Table Sl. No. 17'],
          ['Corresponding 1961 Act provision', 'Section 194-IA', 'Section 195'],
          ['Rate', 'One per cent', 'Rates applicable to a non-resident, on the gain'],
          ['Threshold', 'Fifty lakh rupees or more', 'No comparable threshold'],
          ['Base', 'The higher of consideration and stamp duty value', 'Computed on the capital gain, not the gross price'],
          ['TAN required by the buyer', 'No', 'Yes'],
          ['Statement', 'Form 141', 'The applicable TDS return'],
          ['Time to deposit and file', 'Within thirty days from the end of the month of deduction', 'Per the applicable due dates'],
          ['Lower deduction certificate', 'Not generally relevant', 'The seller may apply; obtain it before completion'],
          ['Agricultural land', 'Excluded from the resident provision', 'Assess separately'],
          ['Multiple buyers or sellers', 'Compliance is PAN-wise', 'Compliance is PAN-wise'],
          ['Where a bank disburses the loan', 'The buyer remains responsible for the deduction', 'The buyer remains responsible']
        ]} />
        <p>The NRI case is where buyers are most often caught out. Deducting one per cent on an NRI sale because that is the familiar figure leaves a shortfall that is recovered from the buyer with interest, long after the seller and the money have left. Establish the seller&rsquo;s residential status in writing early, and if there is any doubt, resolve it before the balance consideration is paid.</p>
      </Section>

      <Section id="deed-types" title="Deeds We Handle">
        <DataTable headers={['Deed', 'Used for', 'Point to watch']} rows={[
          ['Sale deed', 'Purchase and sale of immovable property', 'Property description, consideration and possession clause'],
          ['Conveyance deed', 'Transfer from a builder, society or authority', 'Authority of the transferor and the common areas'],
          ['Gift deed', 'Transfer without consideration', 'Acceptance during the donor’s lifetime, and the tax position'],
          ['Lease deed', 'Longer leases and commercial tenancies', 'Term, registration requirement and permitted use'],
          ['Release deed', 'A co-owner or heir releasing a share', 'Whether consideration passes, which changes the duty'],
          ['Relinquishment deed', 'An heir giving up rights in inherited property', 'All heirs identified, and none omitted'],
          ['Partition deed', 'Division among co-owners', 'Shares, metes and bounds, and equalisation payments'],
          ['Settlement deed', 'Family settlement of immovable property', 'Whether rights are created or merely recorded'],
          ['Exchange deed', 'Exchange of two properties', 'Duty on both legs'],
          ['Mortgage deed', 'Creating security', 'Form of mortgage, and the company charge filing if applicable'],
          ['Development agreement', 'Landowner and developer arrangement', 'Rights conferred, and the stamp treatment'],
          ['Rectification deed', 'Correcting a registered document', 'Both original parties must execute'],
          ['Cancellation deed', 'Undoing a registered document', 'Rarely unilateral; assess the legal position first'],
          ['Power of attorney', 'Acting through a representative', 'Section 33 recognition, stamping and adjudication'],
          ['Will', 'Testamentary disposition', 'Registration optional; execution and attestation are what matter']
        ]} />
      </Section>

      <Section id="before" title="Before You Sign Anything">
        <DataTable headers={['Check', 'Why it comes before execution']} rows={[
          ['Title chain and link documents', 'A gap in the chain is a defect you inherit'],
          ['Seller’s capacity and authority', 'Owner, POA holder, karta, director or trustee — each needs different proof'],
          ['Encumbrance certificate for an adequate period', 'Charges, mortgages and registered dealings'],
          ['Loan closure and release of charge', 'A subsisting mortgage travels with the property'],
          ['Litigation search', 'An injunction or lis pendens affects what you acquire'],
          ['Revenue and municipal records', 'Whether the record matches the deed'],
          ['Survey, area and boundaries', 'Physical property against the described property'],
          ['Land use and zoning', 'Whether the intended use is lawful'],
          ['Building plan, commencement and occupancy certificates', 'Whether the structure is lawful and financeable'],
          ['RERA registration and disclosures', 'For a project property'],
          ['Society share certificate, NOC and dues', 'Apartment and co-operative transfers'],
          ['Property tax and utility dues', 'Liabilities that follow the property'],
          ['All heirs identified, in inherited property', 'An omitted heir is a future suit'],
          ['Court permission, where a minor’s interest is involved', 'Absence of it makes the transfer vulnerable'],
          ['Stamp duty computed, not estimated', 'The single commonest cause of a failed appointment'],
          ['TDS position settled, including seller residence', 'The buyer carries the default'],
          ['Power of attorney adjudicated and recognised', 'Registries refuse defective instruments at the counter']
        ]} />
        <p>This is the work covered in <Link href="/solutions/legal/property-verification">Property Verification</Link>, and it belongs before the token amount, not before the registration date.</p>
      </Section>

      <Section id="process" title="How the Registration Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Property, parties and transaction structure identified'],
          ['2', 'Title and document review', 'Chain of title and the link documents examined'],
          ['3', 'Encumbrance and litigation review', 'Charges, mortgages and disputes identified'],
          ['4', 'Revenue and municipal record check', 'Record of rights, khata, property card or equivalent'],
          ['5', 'Approvals review', 'Plan, occupancy, land use and RERA position'],
          ['6', 'Dues review', 'Property tax, society, maintenance and utilities'],
          ['7', 'Instrument and duty determination', 'Correct deed type and the duty it attracts'],
          ['8', 'Drafting or vetting', 'Deed prepared or reviewed clause by clause'],
          ['9', 'Authority documents', 'POA adjudication, board resolution or trustee authority'],
          ['10', 'TDS compliance', 'Residence confirmed, deduction made, Form 141 prepared'],
          ['11', 'Payment of duty and fee', 'E-stamp and challan obtained'],
          ['12', 'Appointment and execution', 'Slot booked; parties and witnesses attend and sign'],
          ['13', 'Presentation and admission', 'Presented under Section 32; execution admitted'],
          ['14', 'Biometric and identification', 'Photographs, thumb impressions and ID verification'],
          ['15', 'Endorsement and registration', 'Registration number and endorsement issued'],
          ['16', 'Collection of the registered deed', 'Original or certified copy obtained'],
          ['17', 'Mutation', 'Revenue, municipal, society and utility records updated'],
          ['18', 'Safe custody', 'Indexed file of originals, receipts and endorsements']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Draft deed', 'The instrument to be registered'],
          ['Latest title deed', 'Current ownership'],
          ['Prior title documents and mother deed', 'The chain of title'],
          ['Agreement to sell', 'Transaction terms and background'],
          ['Identity and address proof of all parties', 'Registry verification'],
          ['PAN of buyer and seller', 'Tax and registration requirement'],
          ['Photographs of the parties', 'Registration record'],
          ['Property card, khata, 7/12, patta or jamabandi', 'Revenue record of the property'],
          ['City survey extract', 'Urban property identification'],
          ['Mutation entries', 'Ownership history in the revenue record'],
          ['Encumbrance certificate', 'Registered charges and dealings'],
          ['Search or title report', 'Independent verification'],
          ['Approved layout and building plan', 'Lawfulness of the structure'],
          ['Occupancy and completion certificates', 'Completion status'],
          ['RERA registration details', 'Project property'],
          ['Society share certificate and NOC', 'Co-operative transfers'],
          ['No-dues certificate', 'Society, maintenance and utilities'],
          ['Property tax receipts', 'Municipal dues'],
          ['Loan NOC and release of charge', 'Mortgage discharge'],
          ['Charge satisfaction records', 'Where a registered charge existed'],
          ['Power of attorney, adjudicated', 'Where a representative acts'],
          ['Board resolution or partnership or LLP authority', 'Entity transactions'],
          ['Death certificate and heirship documents', 'Inherited property'],
          ['Court order, where applicable', 'Court-directed or disputed transfers'],
          ['E-stamp and registration fee challans', 'Proof of payment'],
          ['TDS challan and Form 141', 'Tax compliance'],
          ['Lower deduction certificate', 'Where the seller is a non-resident'],
          ['Witness identity proof', 'Execution requirements']
        ]} />
      </Section>

      <Section id="clauses" title="What the Deed Must Contain">
        <DataTable headers={['Clause', 'Why it matters']} rows={[
          ['Full particulars of the parties', 'Identity, and capacity in which each signs'],
          ['Recitals of title', 'How the seller came to own the property'],
          ['Schedule of property', 'Survey, plot, flat and building details with boundaries and area'],
          ['Consideration and the mode of payment', 'The amount, and how and when it moved'],
          ['Receipt of consideration', 'Acknowledgement of what has actually been paid'],
          ['Conveyance and operative words', 'The words that actually transfer the interest'],
          ['Possession', 'When possession passes, and in what condition'],
          ['Covenants of title', 'The seller’s assurance of good title and quiet enjoyment'],
          ['Encumbrance declaration', 'Free of charges, or subject to those identified'],
          ['Indemnity', 'Protection against pre-existing defects and claims'],
          ['Outgoings and dues', 'Who bears tax, maintenance and utilities, and from when'],
          ['Stamp duty and fee responsibility', 'Avoids an argument at the counter'],
          ['Handover of original documents', 'What the buyer receives and when'],
          ['Society and transfer formalities', 'Who does what after registration'],
          ['Default and remedies', 'What happens if an obligation is not met'],
          ['Jurisdiction or dispute resolution', 'Where a dispute is to be resolved'],
          ['Witnesses and attestation', 'Execution formalities'],
          ['Annexures', 'Plans, approvals, receipts and authority documents']
        ]} />
      </Section>

      <Section id="poa" title="Registering Through a Power of Attorney">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Recognition at the registry', 'The instrument must satisfy Section 33 of the Registration Act'],
          ['Executed in India', 'Usually executed before and authenticated by a Sub-Registrar'],
          ['Executed abroad', 'Before a notary public or the Indian consulate, with apostille or consular attestation'],
          ['Stamp duty', 'Adjudicated in India after receipt; this takes time and is often forgotten'],
          ['Specific authority', 'The power must cover the exact act — sale, execution, presentation and admission'],
          ['Property identified', 'A general power with no property described is frequently objected to'],
          ['Validity and subsistence', 'The power must be alive on the date of use; death or revocation ends it'],
          ['Registry acceptance', 'Varies by State; confirm the local requirement before relying on it'],
          ['Does a POA transfer title?', 'No — the Supreme Court has held that a sale by GPA, agreement and will does not convey title'],
          ['Buyer caution', 'A POA sale deserves additional verification of the principal and the power']
        ]} />
      </Section>

      <Section id="nri" title="NRI Buyers and Sellers">
        <DataTable headers={['Issue', 'What it requires', 'When to start']} rows={[
          ['Power of attorney', 'Notarisation, apostille or consular attestation, then adjudication in India', 'At the outset — this sets the timeline'],
          ['TDS where the seller is an NRI', 'Section 393(2) rates on the gain; the buyer needs a TAN', 'Before any substantial payment'],
          ['Lower deduction certificate', 'Application by the seller to the Assessing Officer', 'Well before completion'],
          ['Residential status confirmation', 'In writing from the seller, with supporting documents', 'Before the agreement'],
          ['Payment route', 'NRE, NRO or FCNR account, as applicable', 'At the agreement stage'],
          ['FEMA eligibility', 'Whether the person and the property type are permitted', 'Before the agreement'],
          ['Repatriation of sale proceeds', 'Bank documentation and tax certificates', 'Plan alongside the transaction'],
          ['Identity documents', 'Passport, OCI or PIO card, overseas and Indian address proof', 'At document collection'],
          ['PAN', 'Required for the transaction and tax compliance', 'Before the TDS step'],
          ['Inherited property being sold', 'Heirship, succession documents and mutation', 'Before marketing the property'],
          ['Attendance at registration', 'Physical presence, or a properly constituted POA', 'Decide early']
        ]} />
        <p>Authentication and tax certificates set the critical path on every NRI transaction. Starting them when the registration date is fixed is starting them a month too late.</p>
      </Section>

      <Section id="entity" title="Company, LLP and Trust Transactions">
        <DataTable headers={['Check', 'Why']} rows={[
          ['Constitutional documents', 'Memorandum, articles, LLP agreement, partnership deed or trust deed'],
          ['Power to deal in property', 'Whether the objects and the instrument permit it'],
          ['Board or partners’ resolution', 'Authority for the transaction and for the signatory'],
          ['Shareholder approval', 'Where the transaction crosses the statutory thresholds'],
          ['Related party approval', 'Where the counterparty is connected'],
          ['Authorised signatory', 'The named person who will execute and appear'],
          ['Power of attorney', 'Where someone other than the signatory attends'],
          ['Charge creation and filing', 'Companies Act Sections 77 and following, where the property is mortgaged'],
          ['Charge satisfaction', 'Where an existing charge is being released'],
          ['Source of funds and payment trail', 'Accounting and compliance record'],
          ['Tax treatment', 'Capital asset or stock in trade, and the consequences'],
          ['Beneficial ownership', 'Benami exposure where ownership and consideration diverge'],
          ['Trust property', 'Whether the trust deed permits the dealing, and whether sanction is needed']
        ]} />
        <p>Where the transaction forms part of a wider corporate arrangement, see <Link href="/solutions/legal/mergers-and-acquisitions">Mergers and Acquisitions</Link> and <Link href="/solutions/legal/demerger">Demerger</Link>.</p>
      </Section>

      <Section id="mutation" title="Registration Is Not Mutation">
        <DataTable headers={['Point', 'Registration', 'Mutation']} rows={[
          ['What it does', 'Records the instrument on the public register', 'Updates the revenue or municipal record of ownership'],
          ['Authority', 'Sub-Registrar', 'Revenue authority, municipal body or society'],
          ['Legal effect', 'The instrument becomes operative and admissible', 'Administrative record; not proof of title'],
          ['Timing', 'At execution and presentation', 'After registration'],
          ['What it is needed for', 'Transfer, mortgage, resale and evidence', 'Property tax, utilities and local records'],
          ['Consequence of skipping it', 'The transfer itself fails', 'Bills and records stay in the former owner’s name, causing friction later'],
          ['Related updates', 'Not applicable', 'Society share certificate, electricity, water and gas connections']
        ]} />
        <p>Mutation does not confer title, and a buyer who relies on a mutation entry instead of a registered deed has misunderstood both. But the absence of mutation is a persistent nuisance: tax demands to the wrong person, difficulty on resale, and an inconsistency that a future buyer&rsquo;s lawyer will raise.</p>
      </Section>

      <Section id="refusal" title="If Registration Is Refused">
        <DataTable headers={['Stage', 'What applies']} rows={[
          ['Reasons recorded', 'The registering officer must record the reasons for refusal, under Section 71'],
          ['Common grounds', 'Defective presentation, denial of execution, insufficient stamp, property outside the sub-district, unrecognised power of attorney'],
          ['First step', 'Obtain the order and the reasons in writing'],
          ['Appeal to the Registrar', 'Available where refusal is on grounds other than denial of execution, under Sections 72 and 73'],
          ['Suit', 'Where the Registrar also refuses, a suit lies under Sections 77'],
          ['Time limits', 'Short, and prescribed by the Act — act on the order immediately'],
          ['Practical remedy', 'Many refusals are curable: pay the deficient duty, adjudicate the POA, correct the presentation'],
          ['Effect on the Section 23 window', 'The four-month period keeps running; a cure must fit within it']
        ]} />
      </Section>

      <Section id="reform" title="The Registration Bill">
        <div className="info-box" aria-label="A draft, not law">
          <p><strong>The Registration Act, 1908 remains the law.</strong> The Department of Land Resources published a draft <em>Registration Bill, 2025</em> for public consultation in May 2025, proposing to replace the 1908 Act with an online, paperless framework. Among its proposals: removing the hundred-rupee value threshold so that every instrument creating or transferring rights in immovable property is registrable, and making registration compulsory for agreements to sell, for development and promoter agreements, and for powers of attorney authorising transfer of immovable property. It is a draft at consultation stage, and nothing in it is in force.</p>
        </div>
        <p>It is worth knowing about for two reasons. First, those proposals would convert several of the documents treated today as optional or State-dependent into compulsory registrations. Second, parties structuring long-dated arrangements — development agreements, agreements to sell with extended completion, standing powers of attorney — should be aware of the direction of travel, without acting as though it has already arrived.</p>
      </Section>

      <Section id="common-issues" title="Why Registrations Go Wrong">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Appointment booked before the file is ready', 'A wasted slot and a delayed transaction', 'Registration-readiness checklist before any booking'],
          ['Incomplete title chain', 'A defect inherited and carried forward', 'Link document review and reconstruction where possible'],
          ['Wrong survey, plot or flat number in the deed', 'A title defect requiring rectification', 'Property description reconciled to the revenue record and plan'],
          ['Subsisting mortgage not released', 'The charge travels with the property', 'Loan closure, NOC and charge satisfaction verified'],
          ['Stamp duty estimated rather than computed', 'Refusal, impounding or penalty', 'Instrument and valuation assessed State-wise'],
          ['Resident TDS logic applied to an NRI seller', 'Shortfall recovered from the buyer with interest', 'Residential status confirmed in writing before payment'],
          ['Form 26QB used instead of Form 141', 'Compliance filed on a superseded form', 'Current forms under the Income-tax Rules, 2026'],
          ['Power of attorney not adjudicated', 'Refused at the counter on the day', 'POA reviewed, stamped and adjudicated in advance'],
          ['Entity authority missing', 'Execution challenged later', 'Resolution, objects clause and signatory verified'],
          ['Builder approvals unverified', 'Occupancy, financing and resale problems', 'RERA, plan, commencement and occupancy reviewed'],
          ['Heirs omitted in inherited property', 'A future suit by the omitted heir', 'Full heirship mapping and release deeds'],
          ['Deed conflicts with the agreement to sell', 'A dispute about what was agreed', 'Agreement and deed reconciled clause by clause'],
          ['Mutation left undone', 'Records and bills in the former owner’s name', 'Mutation tracked to completion'],
          ['Originals not collected or indexed', 'Difficulty on resale or loan', 'Post-registration custody file']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Title and chain review', 'Ownership history and the link documents'],
          ['Pre-registration due diligence', 'Encumbrance, approvals, litigation, dues and possession'],
          ['Instrument selection', 'The correct deed for what the parties actually intend'],
          ['Deed drafting and vetting', 'Clause-by-clause preparation or review'],
          ['Stamp duty computation', 'State-wise, by instrument and valuation'],
          ['Registration fee and e-stamp support', 'Payment documentation'],
          ['TDS compliance', 'Residential status, deduction, Form 141 and the deposit'],
          ['NRI transaction support', 'POA chain, TAN, lower deduction certificate and repatriation documentation'],
          ['Power of attorney review', 'Section 33 recognition, stamping and adjudication'],
          ['Entity authority documents', 'Board resolution, objects review and signatory authority'],
          ['Builder and project review', 'RERA, plan, commencement, occupancy and allotment documents'],
          ['Society transfer support', 'Share certificate, NOC and dues'],
          ['Sub-Registrar coordination', 'Appointment, presentation and admission'],
          ['Rectification deeds', 'Correcting errors in a registered document'],
          ['Refusal and appeal support', 'Where registration is declined under Section 71'],
          ['Mutation support', 'Revenue, municipal, society and utility records'],
          ['Post-registration custody file', 'Indexed originals, receipts and endorsements'],
          ['Ticket-based tracking', 'Title review, drafting, duty, TDS, appointment, registration and mutation']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Registration is where a transaction becomes permanent, including its mistakes. The description that was copied from the brochure, the duty that was estimated, the TDS that was applied on resident logic to a non-resident seller — all of it is now on the public record and will be read by the next buyer's lawyer. A file that is verified, computed and authorised before the appointment registers in a single visit. One that is assembled at the counter rarely does.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal or tax advice. Registration requirements, stamp duty, registration fees, concessions, documentation and local procedure are governed by State legislation and State rules and differ materially between States; the position for a particular property must be confirmed locally. The tax provisions described reflect the Income-tax Act, 2025 and the Income-tax Rules, 2026, which apply from tax year 2026-27. The Registration Act, 1908 remains in force; the Registration Bill, 2025 referred to here is a draft published for consultation and is not law. Parts of this guide remain under professional review. Estabizz provides document review, drafting support, duty and tax computation support, authority documentation and registration coordination; conveyancing opinions and court appearance are through advocates. Confirm the position with your advocate and tax adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
