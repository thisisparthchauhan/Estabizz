'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'essentials', title: 'What Makes a Gift Valid' },
  { id: 'registration', title: 'Registration Is Not Optional' },
  { id: 'acceptance', title: 'Acceptance During the Donor’s Lifetime' },
  { id: 'revocation', title: 'The Clause That Voids the Whole Gift' },
  { id: 'senior-citizens', title: 'Gifts by Elderly Parents' },
  { id: 'stamp-duty', title: 'Stamp Duty and Registration Fee' },
  { id: 'tax', title: 'Income Tax on the Gift' },
  { id: 'capital-gains', title: 'Tax When the Donee Later Sells' },
  { id: 'mutation', title: 'Mutation Is Not Title' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'process', title: 'The Registration Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'deed-contents', title: 'What the Deed Should Contain' },
  { id: 'special-cases', title: 'Property Types That Need Extra Care' },
  { id: 'nri', title: 'NRI Donors and Donees' },
  { id: 'challenges', title: 'How Gift Deeds Get Challenged' },
  { id: 'gift-vs', title: 'Gift Deed, Will, Sale or Settlement' },
  { id: 'common-issues', title: 'Where Gift Deeds Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a gift deed?', 'An instrument by which an owner voluntarily transfers property to another without consideration. Section 122 of the Transfer of Property Act, 1882 defines it, and the person giving is the donor, the person receiving the donee.'],
  ['Is registration mandatory for a gift of immovable property?', 'Yes. Section 123 requires the transfer to be effected by a registered instrument signed by or on behalf of the donor and attested by at least two witnesses. An unregistered gift deed passes no title to the donee, however clear the intention.'],
  ['What about movable property?', 'A gift of movable property may be effected either by a registered instrument or by delivery. Immovable property has no such alternative.'],
  ['Does the donee have to accept?', 'Yes, and this is a genuine condition rather than a formality. Acceptance must be made during the lifetime of the donor and while the donor is still capable of giving. If the donee dies before accepting, the gift is void.'],
  ['Does possession have to be handed over?', 'Delivery of possession is not an essential prerequisite for a valid gift of immovable property, provided the statutory requirements are met. It remains good practice to address possession expressly in the deed.'],
  ['Can I keep a right to live in the property after gifting it?', 'A donor can reserve a life interest or right of residence, and reserving the right to enjoy the property during one’s lifetime does not by itself invalidate the gift. It should be drafted deliberately rather than added as an afterthought.'],
  ['Can I write in that I can take the property back whenever I want?', 'No — and inserting that clause can destroy the gift. Section 126 allows suspension or revocation on a specified event that does not depend on the donor’s will. A gift which the parties agree shall be revocable at the mere will of the donor is void to that extent.'],
  ['So can a gift ever be revoked?', 'By agreement on a specified independent event, or by rescission as in the case of a contract — for example where consent was obtained by fraud, coercion or undue influence. Not simply because the donor changed their mind.'],
  ['My parents want to gift me a flat. Any special risk?', 'Yes, worth knowing. Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, where a senior citizen transfers property subject to a condition that the transferee provide basic amenities and needs, and the transferee fails, the transfer can be declared void by the Tribunal. Courts have differed on whether that condition must be express in the deed, so how it is drafted matters to both sides.'],
  ['What stamp duty applies?', 'Stamp duty on a gift deed is fixed by State law and varies considerably. Many States provide concessional rates for gifts to specified family members, and some cap the duty. It must be checked for the State where the property is situated.'],
  ['Is the gift taxable for the donee?', 'Under Section 56(2)(x) of the Income-tax Act, immovable property received without consideration is taxable in the recipient’s hands by reference to stamp duty value where it exceeds the prescribed threshold. A gift received from a "relative" as defined is exempt, regardless of value.'],
  ['Who counts as a relative for that exemption?', 'The definition includes spouse, brother or sister, brother or sister of the spouse, brother or sister of either parent, any lineal ascendant or descendant, any lineal ascendant or descendant of the spouse, and the spouses of those persons. It is specific, so check it rather than assuming.'],
  ['What happens when the donee later sells the property?', 'The gift itself is not a transfer giving rise to capital gains for the donor. On a later sale by the donee, the cost of acquisition is generally the cost to the previous owner, and the previous owner’s holding period is generally included in determining whether the gain is long term.'],
  ['Is mutation the same as ownership?', 'No. Mutation updates the revenue or municipal record for tax and administrative purposes; it is not by itself proof of title. Registration transfers the title, mutation records it. Both should be completed.'],
  ['Can property with a loan on it be gifted?', 'Not freely. Where the property is mortgaged, the lender’s consent or a no-objection will generally be required, and gifting without it can breach the loan terms. Deal with the bank before the Sub-Registrar.'],
  ['Can agricultural land be gifted to anyone?', 'Not always. Several States restrict who may hold agricultural land. Check the State land law before drafting.'],
  ['Can a gift be made to a minor?', 'Yes, with acceptance through a natural guardian. The guardianship position and later dealings with the property need care.'],
  ['Can a co-owner gift only their share?', 'An undivided share can generally be gifted, though the description must be precise and the practical consequences for the other co-owners considered.'],
  ['Can an NRI gift Indian property?', 'Yes, subject to the applicable foreign exchange framework depending on the property type and the parties. Execution from abroad, attestation and any power of attorney need planning.'],
  ['Can a gift deed be executed through a power of attorney?', 'It may be possible where the power of attorney is validly executed and specifically authorises the gift, but Sub-Registrar practice varies and gifts through general powers attract scrutiny. Check before relying on it.'],
  ['On what grounds is a gift deed challenged?', 'Most commonly lack of capacity, undue influence or coercion, absence of genuine acceptance, defective execution or attestation, want of registration, forged signatures, or that the document was actually a different transaction.'],
  ['Should I use a gift deed or a Will?', 'A gift takes effect now and is generally irrevocable; a Will takes effect on death and can be changed. The choice depends on whether you want to part with the property during your lifetime — and on stamp duty, which a Will does not attract.'],
  ['How long does registration take?', 'The Sub-Registrar appointment itself is usually completed in a day once the deed, stamp duty and parties are ready. The preparation before it and the mutation afterwards take longer.'],
  ['What is the biggest mistake?', 'Treating it as family paperwork. An unregistered deed, a missing second witness, an at-will revocation clause or an unverified title each defeat the whole purpose, and the problem usually surfaces years later when the property is being sold.'],
  ['Can Estabizz handle the process?', 'We handle title and capacity review, deed drafting support, stamp duty and registration checklists, tax review, Sub-Registrar coordination, mutation support and advocate coordination.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Gift Deed Registration' }]}
      title="Gift Deed Registration"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Gift Deed Registration"
      sections={sections}
      ctaTitle="Speak With a Property Documentation Expert"
      ctaDescription="Title verified, the deed drafted so it holds, stamp duty and tax checked, and mutation completed afterwards."
      quickFacts={[
        { label: 'Governing provision', value: 'TPA Section 123' },
        { label: 'Witnesses', value: 'At least two' },
        { label: 'Registration', value: 'Compulsory' },
        { label: 'Revocable at will', value: 'Void' }
      ]}
      relatedArticles={[
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' },
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'When a notice is legally mandatory, what it must say, and how to reply to one.' },
        { title: 'Relinquishment Deed', href: '/solutions/legal/relinquishment-deed', category: 'Legal', description: 'Releasing a share in inherited property, and how it is registered and stamped.' }
      ]}
      finalCtaTitle="A Family Gift Still Has to Satisfy the Statute"
      finalCtaDescription="Most defective gift deeds were made in good faith between people who trusted each other. The defect surfaces years later, when the property is being sold or an heir objects — and by then the donor may not be available to fix it."
      heroDescription={<p>Gifting property within a family feels like a private arrangement, and that is exactly why so many gift deeds fail. For immovable property the law is unforgiving: the transfer must be by a registered instrument, signed by the donor and attested by at least two witnesses, and accepted by the donee while the donor is alive and capable. Miss any of that and no title passes, however genuine the intention. Estabizz assists donors, donees, families, NRIs and property owners with title and capacity review, donor-donee relationship and tax checks, deed drafting support, stamp duty and registration planning, Sub-Registrar coordination, witness and power of attorney planning, mutation support and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a gift deed transfers property to someone without any sale price, and for immovable property it only works if it is registered.</p>
        <p>It is used constantly within families — parent to child, between spouses, between siblings, in succession planning. The transaction is emotionally simple and legally exacting, which is an awkward combination.</p>
        <p>The failures are rarely about intention. They are about a missing witness, an unregistered document, a well-meant revocation clause, or an unverified title — and they surface years later.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Gift deed registration is not a licence. It is a statutory requirement for transferring immovable property by gift.</p>
        <p>It is governed by the Transfer of Property Act, 1882, the Registration Act, 1908, State stamp legislation, the Income-tax Act and local revenue and municipal rules. For immovable property, registration is mandatory rather than advisable.</p>
      </Section>

      <Section id="essentials" title="What Makes a Gift Valid">
        <DataTable headers={['Requirement', 'What it means', 'Provision']} rows={[
          ['Transfer of ownership', 'Ownership actually passes, not merely possession or use', 'TPA Section 122'],
          ['Voluntary', 'Free consent, without coercion or undue influence', 'TPA Section 122'],
          ['Without consideration', 'No price; consideration makes it a sale, not a gift', 'TPA Section 122'],
          ['Existing property', 'A gift of future property is void', 'TPA Section 124'],
          ['Competent donor', 'Owner, of sound mind and legally capable', 'General law'],
          ['Acceptance by the donee', 'During the donor’s lifetime and while capable of giving', 'TPA Section 122'],
          ['Registered instrument', 'Compulsory for immovable property', 'TPA Section 123'],
          ['Two attesting witnesses', 'At least two, for immovable property', 'TPA Section 123'],
          ['Proper stamp duty', 'As the State prescribes', 'State stamp law']
        ]} />
      </Section>

      <Section id="registration" title="Registration Is Not Optional">
        <div className="warning-box" aria-label="Registration mandatory">
          <p><strong>An unregistered gift deed of immovable property passes no title.</strong> Section 123 of the Transfer of Property Act requires the transfer to be effected by a registered instrument signed by or on behalf of the donor and attested by at least two witnesses, and Section 17 of the Registration Act makes instruments of gift of immovable property compulsorily registrable. A signed, notarised, witnessed deed sitting in a family file is not a transfer — it is a piece of paper. Families discover this when the property is sold, when a loan is sought against it, or when an heir objects after the donor has died.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Immovable property', 'Registered instrument, signed and attested by two witnesses'],
          ['Movable property', 'Registered instrument, or delivery'],
          ['Notarisation', 'Not a substitute for registration'],
          ['Unregistered deed', 'Passes no title under Section 123'],
          ['Effect of non-registration', 'Governed by Section 49 of the Registration Act'],
          ['Time for presentation', 'Within the period allowed under the Registration Act'],
          ['Where to register', 'Sub-Registrar having jurisdiction over the property'],
          ['Who presents', 'Donor and donee, as the Registration Act requires']
        ]} />
      </Section>

      <Section id="acceptance" title="Acceptance During the Donor's Lifetime">
        <div className="info-box" aria-label="Acceptance">
          <p><strong>Acceptance is a condition of validity, not a courtesy.</strong> Section 122 requires the gift to be accepted by the donee <em>during the lifetime of the donor and while the donor is still capable of giving</em>. If the donee dies before acceptance, the gift is void. Where a gift is executed but the donee is abroad, unwell or simply not engaged with the process, this is a real exposure — and it is easily addressed by having acceptance recorded expressly in the deed and evidenced at registration.</p>
        </div>
        <DataTable headers={['How acceptance is evidenced', 'Practical note']} rows={[
          ['Express acceptance recited in the deed', 'The cleanest route — state it explicitly'],
          ['Donee signing the deed', 'Standard practice and strongly advisable'],
          ['Donee present at registration', 'Contemporaneous evidence of acceptance'],
          ['Taking possession', 'Supports acceptance, though not itself essential to validity'],
          ['Mutation applied for by the donee', 'Conduct consistent with acceptance'],
          ['Acceptance for a minor', 'Through the natural guardian'],
          ['Donee abroad', 'Plan execution and acceptance before the deed is signed'],
          ['Donor in poor health', 'Do not delay — capacity and lifetime both matter']
        ]} />
      </Section>

      <Section id="revocation" title="The Clause That Voids the Whole Gift">
        <div className="warning-box" aria-label="Revocation at will">
          <p><strong>The instinctive clause — &ldquo;the donor may revoke this gift at any time&rdquo; — is the one that destroys it.</strong> Section 126 allows the donor and donee to agree that the gift shall be suspended or revoked on the happening of a specified event <em>which does not depend on the will of the donor</em>. But a gift which the parties agree shall be revocable wholly or in part <em>at the mere will of the donor</em> is void to that extent. Donors who want to keep control often insert exactly this language, and in doing so undo the transfer they were trying to make.</p>
        </div>
        <DataTable headers={['Approach', 'Effect']} rows={[
          ['Revocable at the mere will of the donor', 'Void to that extent under Section 126'],
          ['Revocable on a specified independent event', 'Permissible if agreed by donor and donee'],
          ['Rescission on fraud, coercion or undue influence', 'Available as in the case of a contract'],
          ['Donor simply changes their mind', 'Not a ground for revocation'],
          ['Reserving a life interest or right of residence', 'Generally permissible and does not by itself invalidate the gift'],
          ['Conditional gift with an onerous obligation', 'Section 127 considerations apply'],
          ['Wanting full control retained', 'A gift is the wrong instrument — consider a Will']
        ]} />
        <p>If the real intention is to keep the property until death, a gift is not the right document. That is what a Will is for, and it attracts no stamp duty.</p>
      </Section>

      <Section id="senior-citizens" title="Gifts by Elderly Parents">
        <div className="warning-box" aria-label="Senior Citizens Act">
          <p><strong>A gift by an elderly parent carries a statutory risk that most deeds ignore entirely.</strong> Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, where a senior citizen has transferred property by gift or otherwise <em>subject to the condition</em> that the transferee will provide basic amenities and basic physical needs, and the transferee then refuses or fails to do so, the transfer is deemed to have been made by fraud, coercion or undue influence and may at the transferor&rsquo;s option be declared void by the Tribunal. Courts have taken differing views on whether the maintenance condition must be expressly written into the deed or can be implied — which makes this a deliberate drafting decision for both sides, not something to leave to chance.</p>
        </div>
        <DataTable headers={['Consideration', 'Why it matters']} rows={[
          ['Donor’s age and health', 'Capacity and undue influence are the usual challenges'],
          ['Independent advice for the donor', 'Strong evidence that the gift was voluntary'],
          ['Whether a maintenance condition is intended', 'Decide it expressly — for the donor’s protection or the donee’s certainty'],
          ['Medical fitness record at execution', 'Answers a later capacity challenge'],
          ['Other heirs informed', 'Reduces the risk of a surprised objection later'],
          ['Donor retaining residence rights', 'Often the practical answer to the underlying worry'],
          ['Registration with the donor present and engaged', 'Contemporaneous evidence of free will']
        ]} />
      </Section>

      <Section id="stamp-duty" title="Stamp Duty and Registration Fee">
        <p>Stamp duty on a gift deed is a State subject and differs substantially across States. This is the single largest cost in the transaction and should be established before drafting, not at the Sub-Registrar.</p>
        <DataTable headers={['Point', 'Practical position']} rows={[
          ['Governing law', 'Indian Stamp Act as applicable, and State stamp legislation'],
          ['Rate', 'Varies by State, and by the relationship between donor and donee'],
          ['Family concession', 'Many States prescribe reduced rates, and some a capped amount, for gifts to specified relatives'],
          ['Relationship definition', 'The State stamp law definition governs — it is not the income-tax definition'],
          ['Valuation basis', 'Usually the circle or ready reckoner value of the property'],
          ['Registration fee', 'Separate from stamp duty, as the State prescribes'],
          ['Under-stamping', 'The document can be impounded and penalties levied'],
          ['Where the property is in another State', 'That State’s law governs the duty'],
          ['Budgeting', 'Establish the figure before executing anything']
        ]} />
        <div className="info-box" aria-label="Two definitions">
          <p><strong>Two different definitions of &ldquo;relative&rdquo; are in play and they do not match.</strong> The State stamp law definition decides whether a concessional duty applies; the Income-tax Act definition decides whether the gift is exempt in the donee&rsquo;s hands. A transfer can qualify under one and not the other, so both need checking separately.</p>
        </div>
      </Section>

      <Section id="tax" title="Income Tax on the Gift">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Governing provision', 'Income-tax Act Section 56(2)(x)'],
          ['General rule', 'Immovable property received without consideration is taxable in the recipient’s hands by reference to stamp duty value, where it exceeds the prescribed threshold'],
          ['Exemption for relatives', 'A gift from a "relative" as defined is exempt, regardless of value'],
          ['Who is a relative', 'Spouse; brother or sister; brother or sister of the spouse; brother or sister of either parent; any lineal ascendant or descendant; any lineal ascendant or descendant of the spouse; and spouses of those persons'],
          ['Other exempt occasions', 'Including gifts on the occasion of the individual’s marriage, and under a will or inheritance'],
          ['Gift to a non-relative', 'Generally taxable in the donee’s hands on stamp duty value, subject to the threshold'],
          ['Applies to', 'Individuals and HUFs'],
          ['Practical step', 'Confirm the relationship against the statutory definition before assuming exemption']
        ]} />
        <p>The relationship list is specific and does not simply mean &ldquo;family&rdquo;. A cousin, for instance, does not fall within it — a gift between cousins can be fully exempt in the mind of the family and fully taxable in the eyes of the Act.</p>
      </Section>

      <Section id="capital-gains" title="Tax When the Donee Later Sells">
        <DataTable headers={['Point', 'Position']} rows={[
          ['The gift itself', 'A transfer by way of gift is generally not treated as a transfer giving rise to capital gains for the donor'],
          ['Cost of acquisition for the donee', 'Generally the cost to the previous owner'],
          ['Holding period', 'The previous owner’s period of holding is generally included'],
          ['Consequence', 'A long-held family property usually retains long-term character in the donee’s hands'],
          ['Indexation', 'As applicable under the law in force at the time of sale'],
          ['Improvement costs', 'Cost of improvement by the previous owner is generally relevant'],
          ['Record keeping', 'Preserve the original purchase documents of the donor — the donee will need them'],
          ['Practical point', 'The donee inherits the tax history, not a fresh cost base']
        ]} />
        <div className="info-box" aria-label="Keep the old papers">
          <p><strong>Tell the donee to keep the donor&rsquo;s original purchase documents.</strong> Because the cost of acquisition is generally the previous owner&rsquo;s cost, the donee will need the donor&rsquo;s purchase deed and improvement records to compute gains on a later sale. Families routinely discard them once the gift deed is registered, and the donee pays for it years afterwards.</p>
        </div>
      </Section>

      <Section id="mutation" title="Mutation Is Not Title">
        <p>Registration transfers the title. Mutation updates the revenue or municipal record so that property tax and official records reflect the new owner. Both matter, and they are frequently confused in opposite directions.</p>
        <DataTable headers={['Step', 'What it does', 'What it does not do']} rows={[
          ['Registration of the gift deed', 'Transfers title in law', 'Does not update revenue or municipal records'],
          ['Revenue mutation', 'Updates the record of rights', 'Is not by itself proof of title'],
          ['Municipal name transfer', 'Property tax records updated', 'Does not create ownership'],
          ['Society records and share certificate', 'Transfers society membership', 'Depends on society procedure and NOC'],
          ['Electricity and utility transfer', 'Administrative convenience', 'No effect on ownership'],
          ['Updating the encumbrance position', 'Reflects the transaction in searches', 'Does not cure a defective deed']
        ]} />
        <p>Complete the mutation. A registered gift with no mutation creates confusion at sale, in loan applications and in later succession — and the donor may no longer be available to assist.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Property transfer law', 'Transfer of Property Act, 1882'],
          ['Gift provisions', 'Sections 122 to 129'],
          ['Registration', 'Registration Act, 1908'],
          ['Compulsory registration', 'Registration Act Section 17'],
          ['Stamp duty', 'Indian Stamp Act, 1899 and State stamp legislation'],
          ['Income tax', 'Income-tax Act, 1961, including Section 56(2)(x) and capital gains provisions'],
          ['Senior citizens', 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007, Section 23'],
          ['Succession context', 'Hindu Succession Act, 1956 and applicable personal law'],
          ['Contract principles', 'Indian Contract Act, 1872'],
          ['Revenue records', 'State land revenue code and mutation rules'],
          ['Municipal records', 'Local body property tax transfer rules'],
          ['Cooperative societies', 'State cooperative society and apartment ownership law'],
          ['Authority', 'Sub-Registrar, revenue authority, municipal authority and civil court']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['TPA Section 122', 'Defines gift; voluntary, without consideration, accepted in the donor’s lifetime'],
          ['TPA Section 123', 'Immovable property gift by registered instrument attested by two witnesses'],
          ['TPA Section 124', 'Gift of future property is void'],
          ['TPA Section 125', 'Gift to several donees, one of whom does not accept'],
          ['TPA Section 126', 'Suspension or revocation; revocable at the donor’s mere will is void'],
          ['TPA Section 127', 'Onerous gifts'],
          ['TPA Section 128', 'Universal donee'],
          ['TPA Section 129', 'Saving of donations mortis causa and Muhammadan law'],
          ['Registration Act Section 17', 'Compulsory registration of gift instruments'],
          ['Registration Act Section 23', 'Time for presenting documents for registration'],
          ['Registration Act Section 32', 'Persons who must present the document'],
          ['Registration Act Section 49', 'Effect of non-registration'],
          ['Income-tax Act Section 56(2)(x)', 'Taxability of property received without consideration'],
          ['Senior Citizens Act Section 23', 'Conditional transfer by a senior citizen may be declared void']
        ]} />
      </Section>

      <Section id="process" title="The Registration Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Title verification', 'Chain of title, encumbrances and any litigation'],
          ['2', 'Donor capacity check', 'Ownership, competence and free will'],
          ['3', 'Relationship and tax review', 'Stamp concession and Section 56(2)(x) position'],
          ['4', 'Encumbrance and loan check', 'Lender NOC where the property is mortgaged'],
          ['5', 'Property description', 'Schedule, boundaries, area and identifiers'],
          ['6', 'Deed drafting', 'Including acceptance, possession and any reserved rights'],
          ['7', 'Stamp duty computation', 'State rate against the applicable valuation'],
          ['8', 'e-Stamping and fee payment', 'Duty and registration fee paid'],
          ['9', 'Appointment and witnesses', 'Two witnesses arranged, parties available'],
          ['10', 'Sub-Registrar presentation', 'Execution, photographs and biometric verification'],
          ['11', 'Registration endorsement', 'Registered deed issued'],
          ['12', 'Mutation', 'Revenue and municipal records updated'],
          ['13', 'Society and utility transfer', 'Share certificate and connections updated'],
          ['14', 'Document custody', 'Registered deed and the donor’s prior title papers preserved']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Title deed of the donor', 'Proof of ownership and the chain of title'],
          ['Prior chain documents', 'Establishing clear title'],
          ['Encumbrance certificate', 'Existing charges or mortgages'],
          ['Property tax receipts', 'Current status and municipal record'],
          ['Approved plan or possession letter', 'Property identification'],
          ['Identity and address proof of both parties', 'Registration requirement'],
          ['PAN of both parties', 'Tax reporting'],
          ['Photographs of donor and donee', 'Registration formality'],
          ['Two witnesses with identity proof', 'Statutory attestation requirement'],
          ['Relationship proof', 'Stamp concession and tax exemption'],
          ['Lender NOC', 'Where the property is mortgaged'],
          ['Society NOC and share certificate', 'Cooperative housing society property'],
          ['Power of attorney, if used', 'Specific authority to gift'],
          ['Medical fitness certificate', 'Advisable where the donor is elderly or unwell'],
          ['e-Stamp and fee receipts', 'Proof of duty paid']
        ]} />
      </Section>

      <Section id="deed-contents" title="What the Deed Should Contain">
        <DataTable headers={['Clause', 'Why it belongs']} rows={[
          ['Full particulars of donor and donee', 'Identity and relationship'],
          ['Recital of ownership and title', 'How the donor came to own it'],
          ['Statement of natural love and affection', 'The basis of a gift within family'],
          ['Express statement of no consideration', 'Distinguishes it from a sale'],
          ['Voluntariness recital', 'Answers a later undue influence challenge'],
          ['Complete property schedule', 'Boundaries, area, survey or unit number'],
          ['Express acceptance by the donee', 'A validity requirement, recorded'],
          ['Possession', 'Whether delivered now, or when'],
          ['Reserved rights, if any', 'Life interest or right of residence, expressly'],
          ['Declaration of no encumbrance', 'Or disclosure of any that exist'],
          ['Indemnity', 'Against defects in title'],
          ['Who bears stamp duty and costs', 'Avoids a dispute at the counter'],
          ['Attestation by two witnesses', 'Statutory requirement'],
          ['Signatures of donor and donee', 'Execution and acceptance']
        ]} />
      </Section>

      <Section id="special-cases" title="Property Types That Need Extra Care">
        <DataTable headers={['Property', 'What to check first']} rows={[
          ['Agricultural land', 'State restrictions on who may hold it'],
          ['Mortgaged property', 'Lender consent or NOC before execution'],
          ['Cooperative society flat', 'Society NOC, share certificate and transfer procedure'],
          ['Apartment under an association', 'Association dues and transfer formalities'],
          ['Undivided co-owned share', 'Precise description and co-owner implications'],
          ['Ancestral or coparcenary property', 'Whether the donor can gift it at all, and to what extent'],
          ['Leasehold property', 'Lease terms and lessor consent'],
          ['Property with pending litigation', 'Disclosure, and whether transfer is barred'],
          ['Property acquired under a scheme', 'Lock-in or transfer restrictions'],
          ['Commercial property', 'Tenancies and business use consequences'],
          ['Gift to a trust or for charity', 'Additional legal and tax review']
        ]} />
      </Section>

      <Section id="nri" title="NRI Donors and Donees">
        <DataTable headers={['Issue', 'What to plan']} rows={[
          ['Execution from abroad', 'Notarisation and apostille or consular attestation'],
          ['Power of attorney', 'Specific authority to gift, properly attested and adjudicated'],
          ['Foreign exchange framework', 'Eligibility depending on property type and the parties'],
          ['Agricultural and plantation property', 'Special restrictions apply'],
          ['Physical presence at registration', 'Whether required, and alternatives'],
          ['Timing and travel', 'Coordinate execution, acceptance and registration'],
          ['Tax position in both countries', 'The donee’s residence country may tax differently'],
          ['Document custody', 'Originals accessible from abroad']
        ]} />
      </Section>

      <Section id="challenges" title="How Gift Deeds Get Challenged">
        <DataTable headers={['Ground', 'What answers it']} rows={[
          ['Donor lacked capacity', 'Medical evidence and contemporaneous conduct'],
          ['Undue influence or coercion', 'Independent advice and the circumstances of execution'],
          ['No genuine acceptance', 'Express acceptance in the deed and donee’s participation'],
          ['Defective attestation', 'Two witnesses present and properly attesting'],
          ['Not registered', 'Nothing answers this — the gift fails'],
          ['Forged signature', 'Registration records, photographs and biometrics'],
          ['Document was really something else', 'Clear recitals and consistent conduct'],
          ['Donor had no title to give', 'Title verification before execution'],
          ['Other heirs not aware', 'Not a legal ground, but transparency reduces litigation'],
          ['Senior Citizens Act claim', 'Turns on whether a maintenance condition applies']
        ]} />
      </Section>

      <Section id="gift-vs" title="Gift Deed, Will, Sale or Settlement">
        <DataTable headers={['Point', 'Gift deed', 'Will', 'Sale deed']} rows={[
          ['When it takes effect', 'Immediately on registration', 'On death of the testator', 'On registration'],
          ['Consideration', 'None', 'None', 'Price paid'],
          ['Revocable', 'Generally not, at the donor’s will', 'Freely revocable during lifetime', 'No'],
          ['Registration', 'Compulsory for immovable property', 'Not compulsory', 'Compulsory'],
          ['Stamp duty', 'Yes, as the State prescribes', 'None', 'Yes, generally higher'],
          ['Donor retains control', 'No, unless rights are expressly reserved', 'Yes, until death', 'No'],
          ['Risk of dispute', 'Capacity and undue influence', 'Probate and validity challenges', 'Title and consideration'],
          ['Best where', 'Transfer is intended now', 'Transfer is intended after death', 'Property is being sold']
        ]} />
        <p>The choice usually comes down to one question: do you want to part with the property now, or on death? Answer that honestly first, because using a gift deed to achieve a testamentary purpose is what produces the at-will revocation clause that voids the gift.</p>
      </Section>

      <Section id="common-issues" title="Where Gift Deeds Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Deed never registered', 'No title passes at all', 'Registration treated as mandatory from the start'],
          ['Only one witness', 'Defective attestation', 'Two witnesses arranged and verified'],
          ['At-will revocation clause inserted', 'Void to that extent under Section 126', 'Reserved rights drafted lawfully instead'],
          ['Acceptance not recorded', 'A validity requirement left to inference', 'Express acceptance and donee participation'],
          ['Title not verified', 'Donor gifts what they cannot give', 'Chain of title and encumbrance search'],
          ['Mortgage ignored', 'Breach of loan terms', 'Lender NOC obtained first'],
          ['Stamp duty underestimated', 'Document impounded, penalties', 'State rate established before drafting'],
          ['Tax exemption assumed', 'Unexpected liability for the donee', 'Relationship tested against Section 56(2)(x)'],
          ['Donor’s old purchase papers discarded', 'Capital gains computation problems later', 'Document custody plan'],
          ['Mutation not completed', 'Records inconsistent with title', 'Mutation followed through'],
          ['Elderly donor, no safeguards', 'Capacity and Senior Citizens Act challenges', 'Independent advice and medical record']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Title and chain review', 'Ownership, encumbrances and litigation'],
          ['Donor capacity assessment', 'Competence and voluntariness safeguards'],
          ['Relationship and tax review', 'Stamp concession and Section 56(2)(x) position'],
          ['Deed drafting support', 'Acceptance, possession, reserved rights and indemnity'],
          ['Revocation and condition drafting', 'Lawful structuring under Section 126'],
          ['Stamp duty computation', 'State-specific rate and valuation'],
          ['Registration checklist', 'Documents, witnesses and appointment readiness'],
          ['Sub-Registrar coordination', 'Presentation and execution support'],
          ['Lender and society NOC support', 'Consents obtained before execution'],
          ['Power of attorney review', 'Where a party executes remotely'],
          ['NRI execution support', 'Attestation, apostille and timing'],
          ['Mutation support', 'Revenue and municipal record updates'],
          ['Senior citizen safeguards', 'Section 23 exposure addressed deliberately'],
          ['Challenge and defence support', 'Where a deed is disputed'],
          ['Advocate coordination', 'Where litigation or adjudication arises']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Almost every defective gift deed we see was made in good faith between people who trusted each other, which is exactly why nobody checked the statute. Register it, attest it with two witnesses, record the acceptance, and never insert a clause letting the donor take it back at will — that clause is void and it takes the gift with it. If the donor wants to keep control until death, the document they actually need is a Will.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not transaction-specific legal or tax advice. Stamp duty, registration fees, concessional rates and mutation procedure are State-specific and change; tax treatment depends on the parties, the relationship and the law in force at the relevant time. Property restrictions, society rules and foreign exchange requirements vary by property type and party. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides title review, documentation, drafting and coordination support; registration is before the Sub-Registrar and appearance in any dispute is through enrolled advocates. Confirm the current State position and your tax position before executing anything.</p>
      </Section>
    </ServicePageLayout>
  );
}
