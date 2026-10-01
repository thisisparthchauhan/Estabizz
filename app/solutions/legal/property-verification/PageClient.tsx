'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'timing', title: 'Verify Before the Money Moves' },
  { id: 'scope', title: 'What Verification Covers' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'title-chain', title: 'The Title Chain' },
  { id: 'ec-limits', title: 'What an Encumbrance Certificate Does Not Show' },
  { id: 'litigation', title: 'Litigation and Lis Pendens' },
  { id: 'gpa', title: 'The GPA Sale Problem' },
  { id: 'succession', title: 'Inherited and Family Property' },
  { id: 'rera', title: 'Builder and Project Property' },
  { id: 'land', title: 'Land and Agricultural Property' },
  { id: 'possession', title: 'Possession and Tenancy' },
  { id: 'red-flags', title: 'Red Flags That Should Stop a Deal' },
  { id: 'process', title: 'How the Verification Runs' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'report', title: 'The Verification Report' },
  { id: 'nri', title: 'NRI Transactions' },
  { id: 'lender', title: 'Lender-Side Verification' },
  { id: 'common-issues', title: 'Where Buyers Get Caught' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is property verification?', 'Legal due diligence on a property before a transaction — establishing that the seller owns what they are selling, that it is transferable, that nothing is charged on it or pending about it, and that the approvals and records support the use intended.'],
  ['Is it legally mandatory?', 'No. It is a commercial and legal precaution, not a statutory requirement. A buyer who skips it bears the consequences, because the doctrine of constructive notice treats a purchaser as knowing what a reasonable enquiry would have revealed.'],
  ['When should it be done?', 'Before the token or advance is paid, not before registration. Money paid on a defective title is recovered, if at all, after litigation. Verification is cheap at the start and worthless once the consideration has moved.'],
  ['How far back should the title chain go?', 'Thirty years is the conventional period for establishing a marketable title in most transactions, which aligns with the limitation framework for adverse possession claims. Lenders and institutional buyers often insist on it. For a flat in a registered project the practical period may be shorter, from the project land onwards.'],
  ['What is a link document?', 'Any instrument in the chain that connects one owner to the next — a sale deed, a gift, a partition, a decree, a succession document. A gap in the chain is exactly where a competing claim sits, and it is the first thing a careful lawyer looks for.'],
  ['What does an encumbrance certificate show?', 'Registered transactions and charges relating to the property for the period requested, drawn from the Sub-Registrar’s index. It is useful and it is not complete.'],
  ['What does it not show?', 'A great deal: an equitable mortgage created by deposit of title deeds, which is usually not registered; unregistered agreements and tenancies; pending litigation; tax and statutory dues; oral family arrangements; and anything indexed against a different description of the property. Treating it as a clean bill of health is a common and expensive error.'],
  ['How do I check for an equitable mortgage?', 'Ask for the original title deeds and examine whether they are with the seller. Search the CERSAI register, which records security interests including mortgages by deposit of title deeds. A seller unable to produce originals needs to explain why.'],
  ['What is lis pendens?', 'Section 52 of the Transfer of Property Act. Where a suit directly concerning rights to immovable property is pending, a transfer during the suit does not affect the rights of the other party under the court’s eventual decree. A buyer who purchases pending litigation takes subject to the outcome, whatever the deed says.'],
  ['So a litigation search matters?', 'Considerably. Court records, including the e-courts portals, should be searched against the names of the seller and the prior owners, and against the property where local records permit. A seller’s declaration that there is no litigation is not a search.'],
  ['Is a registered sale deed enough on its own?', 'No. A registered deed records a transaction; it does not guarantee that the person who executed it had title to convey. Registration is not a title guarantee system. The chain behind the deed is what establishes title.'],
  ['Is mutation proof of ownership?', 'No. Mutation is a revenue or municipal record maintained for fiscal purposes and has repeatedly been held not to confer or prove title. It is useful corroboration and nothing more.'],
  ['Can I rely on a sale through a general power of attorney?', 'You should be very cautious. The Supreme Court has held that a transaction through a general power of attorney, an agreement to sell and a will does not convey title. A GPA sale may give possession and a bundle of documents; it does not make you the owner.'],
  ['What if the seller is selling under a POA on behalf of the owner?', 'That is different and can be perfectly valid, but it needs checking: that the power is genuine and properly executed and stamped, that it covers sale of this property, that it has not been revoked, and crucially that the principal is alive — a power of attorney ends on the principal’s death.'],
  ['What about inherited property?', 'Every person entitled to a share must be identified and must join the transfer or release their interest. An omitted heir is a future suit, and a daughter’s share in coparcenary property is a recurring source of claims where older family arrangements assumed otherwise.'],
  ['Does RERA registration mean the project is safe?', 'No. RERA registration confirms the project is registered and that certain disclosures have been made. It says nothing about whether the promoter has clear title to the land, and buyers routinely conflate the two. Check both.'],
  ['What should I check on the RERA portal?', 'The registration number and validity, the promoter details, the sanctioned plans and layout, the declared completion date and any extension, quarterly progress updates, the title certificate filed with the authority, and any complaints or orders against the promoter.'],
  ['Why does the occupancy certificate matter?', 'Without it the building is not lawfully fit for occupation. It affects lending, utility connections, insurance and resale, and a buyer who takes possession without it inherits a problem that can take years to regularise.'],
  ['What is special about agricultural land?', 'A great deal, and it varies by State — who may purchase, whether the buyer must be an agriculturist, ceiling limits, tenancy entries that confer rights, and whether conversion to non-agricultural use has actually been granted. A purchase made without checking State-specific restrictions can be void.'],
  ['Should I check possession physically?', 'Always. Visit the property and see who is in it. A tenant in occupation, an encroachment, a boundary that does not match the plan, or a structure where the record says vacant land are things no document search reveals.'],
  ['What if there are unpaid dues?', 'Property tax, maintenance, society and utility arrears attach in practice to the property and are pursued from whoever is in occupation. Obtain no-dues certificates dated close to completion, not months before.'],
  ['What does CERSAI tell me?', 'It is a central register of security interests. A search can reveal a charge created by a lender that would not appear in an encumbrance certificate, particularly a mortgage by deposit of title deeds.'],
  ['What is SARFAESI risk?', 'Where the property secures a defaulted loan, the secured creditor can enforce under the SARFAESI framework, including possession and sale. Buying such a property without the lender’s release is buying into an enforcement process.'],
  ['Can verification be done remotely for an NRI?', 'Largely yes. Registered documents, revenue records, RERA filings and court records are increasingly available online. What cannot be done remotely is the physical inspection, and that is precisely where NRI transactions are most often exploited — so appoint someone independent to go and look.'],
  ['What does the report tell me?', 'What was examined, what the documents establish, what is missing, what the risks are, and whether the transaction should proceed, proceed on conditions, or not proceed. A report that lists documents without a conclusion has not done the job.'],
  ['What is the biggest mistake in property buying?', 'Paying a substantial advance on the strength of one registered deed and a broker’s assurance. By the time the defect surfaces the money has gone and the remedy is a suit.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Property' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Property Verification' }]}
      title="Property Verification"
      readTime="17 min read"
      hideReviewBadge
      focusKeyword="Property Verification"
      sections={sections}
      ctaTitle="Speak With a Property Due Diligence Expert"
      ctaDescription="Find the defect before the advance is paid, not after. The cost of verification is a fraction of the cost of litigating a bad title."
      quickFacts={[
        { label: 'Title chain', value: 'Conventionally 30 years' },
        { label: 'Do it', value: 'Before the advance' },
        { label: 'Key risk', value: 'Unregistered charges' },
        { label: 'Output', value: 'Risk-rated report' }
      ]}
      relatedArticles={[
        { title: 'Property Registration', href: '/solutions/legal/property-registration', category: 'Legal', description: 'Deed, stamp duty, TDS under the Income-tax Act 2025, Sub-Registrar process and mutation.' },
        { title: 'Property Valuation', href: '/solutions/legal/property-valuation', category: 'Legal', description: 'Purpose, registered valuer, method and the stamp duty value rule.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'What litigating a defective title actually involves, and how long it takes.' }
      ]}
      finalCtaTitle="The Encumbrance Certificate Is Not a Clean Bill of Health"
      finalCtaDescription="It shows registered dealings. It does not show equitable mortgages, pending litigation, unregistered tenancies or statutory dues — which is where most defects actually live."
      heroDescription={<p>Property fraud is rarely crude. It is a missing link document in a thirty-year chain, an equitable mortgage that never reached the register, a suit filed last year that the seller did not mention, a power of attorney from a principal who died, or a daughter whose share nobody accounted for. None of it is visible in the one registered deed a seller is happy to show. Estabizz assists buyers, investors, lenders, NRIs, companies and families with title chain and link document review, encumbrance and CERSAI searches, litigation search, revenue and municipal record checks, RERA and approval verification, power of attorney and succession review, possession and tenancy assessment, dues verification, and a risk-rated report with clear conditions before payment.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> verification answers one question in several parts: can this person lawfully give me what I am paying for, and will anyone else be able to take it back?</p>
        <p>India does not operate a title guarantee system. Registration records that a transaction happened; it does not certify that the person who executed the deed had anything to convey. That single fact explains why due diligence here is heavier than buyers expect, and why a registered sale deed — the document sellers produce first and buyers find most reassuring — is the beginning of the enquiry rather than the end of it.</p>
        <p>The defects that cause real loss are almost never visible in that deed. They sit in the chain behind it, in registers the buyer did not search, and in a court file nobody mentioned.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Property verification is not a licence or a registration. It is legal due diligence carried out before a property transaction.</p>
        <p>It covers title and the chain of ownership, encumbrances registered and unregistered, pending litigation, revenue and municipal records, statutory approvals, RERA status for a project property, possession, dues and the authority of whoever is signing. It is not legally compulsory. It is the difference between discovering a defect while you still hold the money and discovering it afterwards.</p>
      </Section>

      <Section id="timing" title="Verify Before the Money Moves">
        <div className="warning-box" aria-label="When to verify">
          <p><strong>Verification after the advance has been paid is a post-mortem.</strong> Once a substantial sum has moved, the buyer&rsquo;s position changes completely: the leverage is gone, walking away means litigating for a refund, and the pressure to complete a flawed transaction becomes commercial rather than legal. The time to find a defect is while a token amount is at stake and the agreement has not been signed.</p>
        </div>
        <DataTable headers={['Stage', 'What should already be done']} rows={[
          ['Before the token amount', 'Preliminary title review, encumbrance search, physical inspection, seller identity'],
          ['Before the agreement to sell', 'Full chain of title, litigation search, approvals, RERA, dues and possession'],
          ['Before the agreement is executed', 'Conditions to completion identified and written into the agreement'],
          ['Before the balance consideration', 'Every condition satisfied — charge released, dues cleared, heirs joined'],
          ['Before the sale deed', 'Final encumbrance search close to the date, and no-dues certificates refreshed'],
          ['Before a loan disbursement', 'Lender-standard title scrutiny and valuation'],
          ['Before a mortgage is created', 'Confirmation of clear title and absence of a prior charge'],
          ['Before a commercial lease', 'Lessor’s title and authority, permitted use and registration requirement'],
          ['Before investing in a project', 'Promoter title to the land, approvals and RERA compliance']
        ]} />
      </Section>

      <Section id="scope" title="What Verification Covers">
        <DataTable headers={['Area', 'What is examined', 'Source']} rows={[
          ['Ownership', 'Whether the seller holds a transferable interest', 'Title deeds and the chain'],
          ['Title chain', 'Each transfer from the root of title to the present owner', 'Registered instruments, succession documents, decrees'],
          ['Registered encumbrances', 'Mortgages, charges and registered dealings', 'Encumbrance certificate, Sub-Registrar index'],
          ['Unregistered charges', 'Equitable mortgage by deposit of title deeds', 'CERSAI search; custody of original deeds'],
          ['Litigation', 'Pending suits, injunctions, attachments and decrees', 'Court records and e-courts portals'],
          ['Revenue records', 'Record of rights, mutation, tenancy and land classification', 'Revenue department and land record portals'],
          ['Municipal records', 'Property tax, assessment and transfer entries', 'Local body'],
          ['Approvals', 'Layout, building plan, commencement and occupancy certificates', 'Planning and municipal authority'],
          ['Land use', 'Zoning, permitted use and conversion', 'Planning authority and revenue records'],
          ['RERA', 'Project registration, disclosures, progress and complaints', 'RERA portal'],
          ['Society', 'Share certificate, NOC, dues and transfer rules', 'Housing society'],
          ['Possession', 'Who is actually in occupation, and on what basis', 'Physical inspection'],
          ['Dues', 'Tax, maintenance and utilities', 'Authority and service providers'],
          ['Authority to sign', 'Owner, attorney, karta, director or trustee', 'Constitutional and authority documents'],
          ['Succession', 'All heirs identified and accounted for', 'Succession documents and family records'],
          ['Statutory restrictions', 'Agricultural, tribal, ceiling, coastal and acquisition restrictions', 'State law and notifications']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Property transfer', 'Transfer of Property Act, 1882'],
          ['Registration of instruments', 'Registration Act, 1908'],
          ['Stamp duty', 'Indian Stamp Act, 1899 and State stamp legislation'],
          ['Real estate projects', 'Real Estate (Regulation and Development) Act, 2016'],
          ['Contract enforcement', 'Indian Contract Act, 1872 and Specific Relief Act, 1963'],
          ['Limitation and adverse possession', 'Limitation Act, 1963'],
          ['Secured lending and enforcement', 'SARFAESI framework and the CERSAI register'],
          ['Apartments and societies', 'State apartment ownership and co-operative societies legislation'],
          ['Land records and mutation', 'State land revenue codes and record-of-rights rules'],
          ['Planning and building approvals', 'Municipal, development authority and town planning legislation'],
          ['Succession', 'Indian Succession Act, 1925 and the applicable personal law'],
          ['Benami risk', 'The benami transactions framework'],
          ['Cross-border acquisition', 'FEMA and the regulations on immovable property'],
          ['Fraud and forgery', 'Bharatiya Nyaya Sanhita, 2023, where documents are forged'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63 for digital records'],
          ['Authorities', 'Sub-Registrar, revenue department, municipal body, planning authority, RERA, courts and lenders']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Why it matters in verification']} rows={[
          ['TPA, Section 5 and 6', 'What may be transferred, and what may not'],
          ['TPA, Section 8', 'What passes with a transfer, including incidents of the property'],
          ['TPA, Section 52', 'Lis pendens — a transfer during a pending suit does not defeat the decree'],
          ['TPA, Section 53', 'Fraudulent transfer, where a transfer defeats creditors'],
          ['TPA, Section 53A', 'Part performance, read with Registration Act Section 17(1A)'],
          ['TPA, Section 54', 'Sale, and the requirement of a registered instrument'],
          ['TPA, Section 55', 'The seller’s duty to disclose material defects in title'],
          ['TPA, Section 58', 'Forms of mortgage, including by deposit of title deeds'],
          ['TPA, Sections 105 and 107', 'Lease, and registration requirements'],
          ['TPA, Sections 122 and 123', 'Gift and the registered instrument'],
          ['Registration Act, Section 17', 'Documents of which registration is compulsory'],
          ['Registration Act, Section 47', 'A registered deed operates from execution, not registration'],
          ['Registration Act, Section 49', 'An unregistered compulsorily registrable document does not affect the property'],
          ['Limitation Act, Article 65', 'The twelve-year period behind adverse possession claims'],
          ['Specific Relief Act', 'Specific performance, and what a buyer can enforce'],
          ['RERA, Sections 3, 4, 11 and 19', 'Project registration, disclosures, promoter duties and allottee rights'],
          ['SARFAESI framework', 'Enforcement by a secured creditor against the property'],
          ['BSA, Sections 61 to 63', 'Admissibility of online records, portal extracts and digital documents']
        ]} />
      </Section>

      <Section id="title-chain" title="The Title Chain">
        <p>The chain is the heart of the exercise. Each instrument must connect to the next without a gap, and each transferor must have held what they purported to transfer.</p>
        <DataTable headers={['Link in the chain', 'What to verify']} rows={[
          ['Root of title', 'The earliest instrument relied on — typically going back thirty years'],
          ['Each sale deed', 'Registration, parties, description, and that the seller had title'],
          ['Each gift or settlement', 'Execution, attestation, acceptance and registration'],
          ['Partition', 'All co-owners joined, and the share allotted to this chain'],
          ['Release or relinquishment', 'Who released, in whose favour and whether all parties joined'],
          ['Succession on a death', 'Testate or intestate, the heirs, and whether all were accounted for'],
          ['A decree or court order', 'The decree, whether it is final, and whether it was challenged'],
          ['Government grant or allotment', 'Conditions attached, and whether they were complied with'],
          ['Conversion or regularisation', 'The order, and whether conditions were satisfied'],
          ['Each mutation entry', 'Whether the revenue record follows the deeds — and where it does not, why'],
          ['Continuity of description', 'That the property described is the same throughout the chain']
        ]} />
        <div className="info-box" aria-label="Where defects hide">
          <p><strong>Defects cluster at the non-sale links.</strong> Sales are documented, stamped and registered, so they are easy to follow. It is the partitions, the releases, the deaths and the family arrangements that produce gaps — a sibling who never signed, an heir nobody listed, an oral arrangement recorded nowhere. When a chain looks clean apart from one unexplained transition, that transition is usually the problem.</p>
        </div>
      </Section>

      <Section id="ec-limits" title="What an Encumbrance Certificate Does Not Show">
        <p>The encumbrance certificate is the document buyers rely on most and understand least. It is an extract of registered transactions relating to the property for a stated period. Its value is real, and its limits are substantial.</p>
        <DataTable headers={['Risk', 'Shown in the EC?', 'How to check it']} rows={[
          ['Registered mortgage', 'Yes', 'The EC itself, and the charge satisfaction'],
          ['Registered sale, gift or lease', 'Yes', 'The EC for an adequate period'],
          ['Equitable mortgage by deposit of title deeds', 'Generally not', 'CERSAI search; custody of the original title deeds'],
          ['Pending litigation and injunctions', 'No', 'Court record and e-courts search against the owners'],
          ['Attachment before judgment', 'Sometimes, if registered', 'Court records'],
          ['Unregistered agreement to sell', 'No', 'Enquiry, possession check and seller declarations'],
          ['Unregistered tenancy or licence', 'No', 'Physical inspection of the property'],
          ['Property tax and statutory dues', 'No', 'Municipal and utility no-dues certificates'],
          ['Society dues and transfer restrictions', 'No', 'Society NOC and dues certificate'],
          ['Oral family arrangement or unrecorded claim', 'No', 'Succession review and family enquiry'],
          ['Acquisition or reservation notification', 'No', 'Planning authority and notifications'],
          ['Entries under a different property description', 'Missed', 'Search across survey numbers and prior descriptions'],
          ['Transactions outside the period requested', 'No', 'Request an adequate period — thirty years where it matters']
        ]} />
        <p>A clean encumbrance certificate narrows the risk. It does not eliminate it, and a transaction structured on the belief that it does is structured on a misunderstanding.</p>
      </Section>

      <Section id="litigation" title="Litigation and Lis Pendens">
        <div className="warning-box" aria-label="Section 52 of the Transfer of Property Act">
          <p><strong>Buying property that is the subject of a pending suit means buying the outcome of that suit.</strong> Section 52 of the Transfer of Property Act provides that where a suit directly and specifically concerning rights to immovable property is pending, the property cannot be transferred so as to affect the rights of any other party under the decree that follows. A purchaser during litigation is bound by the result — however honest the purchase, and whatever the deed says.</p>
        </div>
        <DataTable headers={['Search', 'Against what', 'Why']} rows={[
          ['Civil court records', 'The seller and prior owners, by name', 'Title suits, partition suits and injunction proceedings'],
          ['e-Courts portals', 'Party names across the relevant districts', 'Pending and disposed matters'],
          ['High Court records', 'Party names', 'Appeals, writs and second appeals'],
          ['Revenue court records', 'The property and the parties', 'Mutation disputes and tenancy proceedings'],
          ['Consumer and RERA records', 'The promoter, for project property', 'Buyer complaints and orders against the promoter'],
          ['Tribunal records', 'The owner entity', 'Insolvency, debt recovery and company matters'],
          ['Criminal records', 'Where fraud is suspected', 'Cheating and forgery complaints concerning the property'],
          ['Attachment and recovery proceedings', 'The owner', 'Tax, debt and enforcement attachments'],
          ['Public notice', 'The transaction itself', 'A notice inviting claims, where locally customary']
        ]} />
      </Section>

      <Section id="gpa" title="The GPA Sale Problem">
        <p>A transaction structured as a general power of attorney with an agreement to sell and a will — the so-called GPA sale — remains common in some markets and remains a poor basis for ownership. The Supreme Court has held that such a combination does not convey title. What the buyer acquires is possession, a bundle of documents and a serious problem on resale.</p>
        <DataTable headers={['Scenario', 'Position', 'What to do']} rows={[
          ['Buying through a GPA sale structure', 'Title does not pass; you are not the owner', 'Insist on a registered conveyance from the title holder'],
          ['Seller acts under a POA for the true owner', 'Can be perfectly valid', 'Verify the power, its scope and its subsistence'],
          ['The principal has died', 'The power is at an end', 'The transaction cannot proceed on that power'],
          ['The power has been revoked', 'No authority remains', 'Check for a revocation and obtain a declaration'],
          ['The power does not describe this property', 'Likely insufficient', 'Obtain a specific power'],
          ['The power is unregistered or unstamped', 'May not be recognised at the registry', 'Adjudication and, where required, registration'],
          ['The power was executed abroad', 'Needs authentication', 'Apostille or consular attestation, then adjudication in India'],
          ['A prior purchaser holds only a GPA structure', 'A gap in the chain', 'The defect must be cured before you buy into it']
        ]} />
      </Section>

      <Section id="succession" title="Inherited and Family Property">
        <DataTable headers={['Question', 'Why it matters']} rows={[
          ['Did the deceased leave a Will?', 'Testate and intestate succession produce different heirs'],
          ['Who are all the legal heirs?', 'An omitted heir retains their share and can sue'],
          ['Daughters’ shares in coparcenary property', 'Older family arrangements frequently assumed otherwise; the position is settled'],
          ['Has every heir joined or released?', 'A transfer by some co-owners conveys only their shares'],
          ['Is a release deed registered?', 'An unregistered release of immovable rights does not operate'],
          ['Was there a partition, and is it documented?', 'An oral partition is hard to establish against a later claimant'],
          ['Is a minor\'s interest involved?', 'Court permission may be required; absence of it makes the transfer vulnerable'],
          ['Is a probate or succession document available?', 'Probate is no longer compulsory, but the Will still has to be proved to the asset holder'],
          ['Has mutation followed the succession?', 'A revenue record inconsistent with the claimed devolution needs explaining'],
          ['Is there a pending family dispute?', 'Litigation search against all heirs, not just the seller']
        ]} />
        <p>Since the omission of Section 213 of the Indian Succession Act in December 2025, probate is no longer a statutory precondition to establishing a right under a Will — but proof of the Will is still required, and from a buyer&rsquo;s standpoint a grant remains the strongest comfort where the Will could be challenged. See <Link href="/solutions/legal/probate-service">Probate Service</Link> for when it is still worth obtaining.</p>
      </Section>

      <Section id="rera" title="Builder and Project Property">
        <div className="info-box" aria-label="RERA is not title">
          <p><strong>RERA registration is not a title certificate.</strong> It confirms the project is registered and that prescribed disclosures have been made. It does not establish that the promoter holds clear, marketable title to the land, and it does not protect a buyer against a defect in that title. The two exercises are separate, and both are necessary.</p>
        </div>
        <DataTable headers={['Check', 'What it tells you']} rows={[
          ['RERA registration number and validity', 'Whether the project is registered and still within its period'],
          ['Promoter details and other projects', 'Track record, and complaints across projects'],
          ['Title certificate filed with the authority', 'The promoter’s own legal position on the land'],
          ['Land title independently verified', 'What the certificate does not tell you'],
          ['Sanctioned plans and layout', 'What was approved, against what is being sold'],
          ['Commencement certificate', 'Whether construction was lawfully begun'],
          ['Declared completion date and extensions', 'Delay risk and the promoter’s own admissions'],
          ['Quarterly progress updates', 'Whether filings match the site'],
          ['Carpet area as defined by the Act', 'Prevents a super built-up area claim'],
          ['The agreement for sale', 'Whether it follows the prescribed form and the promoter’s obligations'],
          ['Complaints and orders against the promoter', 'Buyer disputes and regulatory findings'],
          ['Agent registration', 'Whether the intermediary is registered'],
          ['Occupancy and completion certificates', 'For a completed or near-complete project'],
          ['Bank account discipline', 'Whether project receipts are being handled as disclosed']
        ]} />
      </Section>

      <Section id="land" title="Land and Agricultural Property">
        <DataTable headers={['Check', 'Why it is State-specific and critical']} rows={[
          ['Classification of the land', 'Agricultural, non-agricultural, forest or government land'],
          ['Who may purchase agricultural land', 'Several States restrict purchase to agriculturists or residents'],
          ['Ceiling limits', 'Holdings above the limit may be void or liable to be surrendered'],
          ['Conversion to non-agricultural use', 'The order itself, and whether its conditions were met'],
          ['Tenancy entries in the record of rights', 'Tenancy can confer substantive rights against the owner'],
          ['Tribal land restrictions', 'Transfers are often prohibited or require sanction'],
          ['Government grant conditions', 'Non-alienation periods and reversion clauses'],
          ['Acquisition notifications', 'Land under acquisition, or reserved in a development plan'],
          ['Coastal and environmental zones', 'Restrictions on construction and use'],
          ['Survey, boundaries and actual area', 'Record against the physical measurement on the ground'],
          ['Access and right of way', 'Landlocked parcels are frequently sold as though they are not'],
          ['Encroachment', 'Only a physical inspection reveals it']
        ]} />
      </Section>

      <Section id="possession" title="Possession and Tenancy">
        <DataTable headers={['Observation on site', 'What it may indicate']} rows={[
          ['Someone other than the seller in occupation', 'A tenancy, licence, caretaker arrangement or adverse claim'],
          ['A tenant refusing information', 'A protected tenancy, or a dispute already underway'],
          ['Boundaries inconsistent with the plan', 'Encroachment, or a different parcel than described'],
          ['Construction where the record says vacant', 'Unapproved construction, or the wrong property'],
          ['A locked, long-unoccupied property', 'Possession risk, and a possible competing claim'],
          ['Utility connections in another name', 'A prior dealing not disclosed'],
          ['Separate entrances or sub-division', 'Informal partition or multiple occupiers'],
          ['Notices or seals on the property', 'Municipal action, attachment or enforcement'],
          ['A board of a bank or lender', 'SARFAESI enforcement in progress'],
          ['Neighbours aware of a dispute', 'Worth asking; neighbours often know what registers do not']
        ]} />
        <p>Physical inspection is the step most often delegated to the broker and most often where the fraud is. For NRI and out-of-city buyers, appoint someone independent of the seller and the intermediary to go and look.</p>
      </Section>

      <Section id="red-flags" title="Red Flags That Should Stop a Deal">
        <DataTable headers={['Red flag', 'Why it is serious']} rows={[
          ['Original title deeds not produced', 'Points to an equitable mortgage or a prior dealing'],
          ['A gap in the title chain', 'A competing claim can sit in the gap'],
          ['Seller’s name differs across documents', 'Identity or title defect, or impersonation'],
          ['Sale pressed urgently at a discount', 'Classic indicator of a defect or a competing claim'],
          ['Insistence on a GPA structure', 'Title will not pass'],
          ['Refusal to allow a physical inspection', 'Possession or occupancy problem'],
          ['A tenant or occupant nobody disclosed', 'Possession dispute built into the purchase'],
          ['Litigation discovered on search', 'Lis pendens — you take subject to the decree'],
          ['A heavy portion of the price demanded in cash', 'Tax, benami and evidentiary exposure'],
          ['Occupancy certificate absent', 'Lending, insurance, utilities and resale all affected'],
          ['Unapproved construction on the property', 'Demolition risk and a report no lender will accept'],
          ['Mutation inconsistent with the deeds', 'The record and the documents disagree about ownership'],
          ['A family member who has not signed', 'Future claim by the omitted co-owner'],
          ['Agricultural land sold to a non-eligible buyer', 'The transfer may be void under State law'],
          ['A lender board or an enforcement notice', 'The secured creditor’s rights override yours'],
          ['Documents produced only as photocopies', 'Verify against the registry; forgeries circulate as copies']
        ]} />
      </Section>

      <Section id="process" title="How the Verification Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Property, transaction stage and the buyer’s exposure'],
          ['2', 'Document checklist', 'Transaction-specific list issued immediately'],
          ['3', 'Seller and authority review', 'Identity, capacity and the power to transfer'],
          ['4', 'Title chain review', 'Each link examined for continuity and validity'],
          ['5', 'Registration verification', 'Deeds checked against the registry record'],
          ['6', 'Encumbrance search', 'Adequate period, with charge satisfaction traced'],
          ['7', 'CERSAI search', 'Security interests not visible in the encumbrance certificate'],
          ['8', 'Revenue and municipal records', 'Record of rights, mutation and assessment'],
          ['9', 'Approvals review', 'Layout, plan, commencement and occupancy'],
          ['10', 'RERA verification', 'Project property — registration, filings and complaints'],
          ['11', 'Litigation search', 'Courts, tribunals and revenue proceedings'],
          ['12', 'Succession review', 'Heirs, releases and family claims'],
          ['13', 'Physical inspection', 'Possession, boundaries, construction and occupants'],
          ['14', 'Dues verification', 'Tax, society, maintenance and utilities'],
          ['15', 'Risk report', 'Findings, red flags and a clear recommendation'],
          ['16', 'Closing conditions', 'What must be done before payment and before the deed'],
          ['17', 'Transaction support', 'Agreement and deed terms reflecting the conditions']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Latest title deed', 'Current ownership'],
          ['Prior title deeds and mother deed', 'The chain of title'],
          ['Agreement to sell, if executed', 'Terms already agreed'],
          ['Encumbrance certificate for an adequate period', 'Registered dealings and charges'],
          ['Original title deeds, for inspection', 'Custody indicates whether an equitable mortgage exists'],
          ['Mutation and record of rights', 'Revenue record of ownership'],
          ['Property card, khata, 7/12, patta or jamabandi', 'State-specific land record'],
          ['Property tax receipts', 'Dues and assessment'],
          ['Utility bills', 'Occupancy and connection holder'],
          ['Approved layout and building plan', 'What was sanctioned'],
          ['Commencement, completion and occupancy certificates', 'Lawfulness of construction and occupation'],
          ['Conversion order', 'Where agricultural land has been converted'],
          ['RERA registration and filings', 'Project property'],
          ['Society share certificate, NOC and no-dues', 'Co-operative property'],
          ['Loan closure letter and charge release', 'Discharge of a mortgage'],
          ['CERSAI search result', 'Registered security interests'],
          ['Release, relinquishment, gift or partition deeds', 'Non-sale links in the chain'],
          ['Will, succession or heirship documents', 'Devolution on a death'],
          ['Power of attorney and any revocation', 'Authority of the signatory'],
          ['Court orders and pleadings, if any', 'Litigation affecting the property'],
          ['Entity constitutional and authority documents', 'Where the owner is a company, LLP, firm or trust']
        ]} />
      </Section>

      <Section id="report" title="The Verification Report">
        <DataTable headers={['Component', 'What it should state']} rows={[
          ['Scope and period', 'What was examined, over what period, and what was not'],
          ['Property identification', 'Survey, plot, flat, area and boundaries'],
          ['Owner and authority', 'Who holds title and who may transfer it'],
          ['Chain of title', 'Each link, with the instrument and its registration particulars'],
          ['Gaps and unexplained links', 'Stated plainly, not glossed over'],
          ['Encumbrance findings', 'What the search showed, and for what period'],
          ['Unregistered charge assessment', 'Custody of originals and the CERSAI position'],
          ['Litigation findings', 'Searches conducted and what they returned'],
          ['Revenue and municipal position', 'Record of rights, mutation and dues'],
          ['Approvals and RERA', 'What exists, what is missing'],
          ['Possession', 'Who is in occupation and on what basis'],
          ['Documents not produced', 'Explicitly listed — absence is a finding'],
          ['Assumptions and limitations', 'What the opinion depends on'],
          ['Red flags', 'Ranked, with the consequence of each'],
          ['Closing conditions', 'What must happen before payment and before registration'],
          ['Conclusion', 'Clear, conditional or do not proceed']
        ]} />
        <div className="info-box" aria-label="A report must conclude">
          <p><strong>A report that lists documents without reaching a conclusion has not done the job.</strong> The buyer needs a decision: proceed, proceed only if specified conditions are met, or do not proceed. Conditions should be drafted so they can go straight into the agreement — the charge released before the balance payment, every heir joined as a confirming party, the occupancy certificate produced before possession.</p>
        </div>
      </Section>

      <Section id="nri" title="NRI Transactions">
        <DataTable headers={['Risk', 'Why NRIs are exposed', 'Control']} rows={[
          ['Physical inspection skipped', 'The buyer is not in the country', 'Appoint an independent person, not the broker or the seller’s contact'],
          ['Power of attorney misuse', 'Broad powers given to a relative or agent', 'Narrow, specific, time-limited powers; revoke when done'],
          ['Seller impersonation', 'Identity harder to verify remotely', 'Independent identity verification against registry records'],
          ['Family property sold without all heirs', 'Distance makes family claims harder to detect', 'Full succession review and heir confirmation'],
          ['Occupation by a relative or caretaker', 'Long absence invites possession claims', 'Physical inspection and documented occupancy'],
          ['Unpaid dues accumulating', 'Bills do not reach the owner', 'No-dues certificates refreshed close to completion'],
          ['Litigation unnoticed', 'Summons served at an Indian address', 'Litigation search against the owner and the property'],
          ['Forged documents in the chain', 'Copies accepted because originals are inconvenient', 'Verify against the registry, not against the copy'],
          ['Tax and repatriation', 'Different TDS regime for a non-resident seller', 'Address before completion — see Property Registration'],
          ['Remote execution', 'Documents executed abroad need authentication', 'Apostille or consular attestation, planned early']
        ]} />
        <p>For the tax and registration steps on an NRI transaction, including the non-resident TDS position under the Income-tax Act, 2025, see <Link href="/solutions/legal/property-registration">Property Registration</Link>.</p>
      </Section>

      <Section id="lender" title="Lender-Side Verification">
        <DataTable headers={['Check', 'Why the lender requires it']} rows={[
          ['Borrower’s ownership', 'Only an owner can create a valid mortgage'],
          ['Marketable title', 'The security must be saleable on enforcement'],
          ['Chain of title to the lender’s standard', 'Usually thirty years'],
          ['Prior charges', 'The lender’s rank in the security'],
          ['CERSAI search and registration', 'Existing interests, and registering the new one'],
          ['Original title deeds', 'Deposit of originals creates the equitable mortgage'],
          ['Encumbrance certificate', 'Registered dealings'],
          ['Litigation search', 'An encumbered or disputed security is no security'],
          ['Approvals and occupancy', 'Affects valuation and saleability'],
          ['Mutation and revenue record', 'Consistency with the title documents'],
          ['Possession', 'Occupied security complicates enforcement'],
          ['Valuation', 'Loan-to-value and realisable value'],
          ['Insurance', 'Protection of the secured asset']
        ]} />
        <p>See <Link href="/solutions/legal/property-valuation">Property Valuation</Link> for how lenders assess market, realisable and distress value, and why their figure often differs from the owner&rsquo;s expectation.</p>
      </Section>

      <Section id="common-issues" title="Where Buyers Get Caught">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Advance paid before verification', 'Leverage gone; refund means litigation', 'Verification sequenced before the token amount'],
          ['Reliance on one registered deed', 'The chain behind it was never examined', 'Full chain and link document review'],
          ['Encumbrance certificate treated as conclusive', 'Equitable mortgages and litigation missed', 'CERSAI search, original deed custody and court search'],
          ['No litigation search', 'Lis pendens binds the buyer to the decree', 'Searches against owners and prior owners'],
          ['GPA structure accepted', 'Title does not pass', 'Insist on a registered conveyance from the title holder'],
          ['POA not verified as subsisting', 'A power ends on the principal’s death', 'Verification of the power, the principal and any revocation'],
          ['Heirs omitted in inherited property', 'A future suit by the omitted heir', 'Succession review and release deeds from every heir'],
          ['RERA registration taken as title comfort', 'Land title never verified', 'Independent title verification alongside RERA checks'],
          ['Occupancy certificate not insisted on', 'Lending, utilities, insurance and resale affected', 'Treated as a closing condition'],
          ['No physical inspection', 'Tenants, encroachment and boundary errors missed', 'Independent inspection, documented with photographs'],
          ['Agricultural land restrictions ignored', 'The transfer may be void', 'State-specific eligibility and conversion review'],
          ['Dues checked too early', 'Arrears accrue between check and completion', 'No-dues certificates refreshed near completion'],
          ['Findings not written into the agreement', 'The report identified the risk; the contract did not manage it', 'Closing conditions drafted into the agreement']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Title search and chain review', 'Each link from the root of title to the present owner'],
          ['Link document reconstruction', 'Identifying and sourcing missing instruments'],
          ['Deed review', 'Current and prior registered documents examined'],
          ['Encumbrance search', 'Adequate period, with charges traced to satisfaction'],
          ['CERSAI and security interest search', 'Charges not visible in the encumbrance certificate'],
          ['Litigation search', 'Courts, tribunals, revenue and consumer records'],
          ['Revenue and municipal record review', 'Record of rights, mutation and assessment'],
          ['Approval review', 'Layout, plan, commencement, occupancy and land use'],
          ['RERA verification', 'Registration, filings, progress and complaints'],
          ['Power of attorney review', 'Validity, scope, subsistence and misuse risk'],
          ['Succession review', 'Heirs, Wills, releases and family claims'],
          ['Possession and inspection coordination', 'Independent physical verification'],
          ['Dues verification', 'Tax, society, maintenance and utilities'],
          ['Agreement review', 'Terms, payment schedule, conditions and default'],
          ['Risk report', 'Findings, red flags and a clear recommendation'],
          ['Closing conditions', 'Drafted so they can go into the agreement'],
          ['Lender-side scrutiny', 'Title and security review for banks and NBFCs'],
          ['NRI remote due diligence', 'Document review, inspection coordination and authentication'],
          ['Ticket-based tracking', 'Documents, searches, observations, draft report and closing support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“India does not guarantee title, so a registered deed proves a transaction happened, not that the seller owned anything. The defects that cost people money are the ones no single document shows — an equitable mortgage with no entry in the register, a suit filed last year, a daughter whose share nobody counted, a power of attorney from a principal who has died. Each of those is found by a specific search, and all of them are found cheaply before the advance and expensively afterwards.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice, and it is not a title opinion. Property law, land records, revenue procedure, agricultural land restrictions, stamp duty and registration practice are substantially governed by State legislation and differ materially between States; the position for a particular property must be assessed locally and on its own documents. Searches of public records are limited by what those records contain and by the accuracy of indexing, and no due diligence can eliminate risk entirely. Parts of this guide remain under professional review. Estabizz provides document review, searches, record verification, inspection coordination and risk reporting; title opinions and court appearance are through advocates. Confirm the position with your advocate before paying any consideration.</p>
      </Section>
    </ServicePageLayout>
  );
}
