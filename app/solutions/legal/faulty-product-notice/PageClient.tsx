'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'preserve', title: 'Before You Send Anything' },
  { id: 'limitation', title: 'The Two-Year Clock' },
  { id: 'who-to-notice', title: 'Who to Send It To' },
  { id: 'product-liability', title: 'Product Liability Without Proving Negligence' },
  { id: 'defect-deficiency', title: 'Defect, Deficiency and Unfair Trade Practice' },
  { id: 'contents', title: 'What the Notice Should Contain' },
  { id: 'reliefs', title: 'What to Demand' },
  { id: 'warranty', title: 'Warranty Denial' },
  { id: 'ecommerce', title: 'E-Commerce Purchases' },
  { id: 'unsafe', title: 'Unsafe Products and Recall' },
  { id: 'business-buyers', title: 'Business and Commercial Buyers' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'evidence', title: 'Proving the Defect' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'after-notice', title: 'After the Notice' },
  { id: 'escalation', title: 'Escalating to a Complaint' },
  { id: 'common-issues', title: 'Why Claims Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a faulty product notice?', 'A formal legal notice to the seller, manufacturer, brand or platform demanding refund, replacement, repair or compensation for a product that is defective, unsafe, not as described or not fit for use.'],
  ['Is it mandatory before filing a consumer complaint?', 'No. It is not a statutory precondition. It is worth sending because it creates a dated record of the defect, the demand and the refusal — which is exactly what a Commission looks for.'],
  ['How long do I have to act?', 'Under Section 69 of the Consumer Protection Act, 2019 a complaint must be filed within two years of the cause of action arising. Delay can be condoned for sufficient cause with reasons recorded, but that is an indulgence, not a right.'],
  ['Does chasing the service centre pause the two years?', 'No, and this is how good claims are lost. Months of service visits, ticket numbers and assurances do not stop the clock. Keep the record of every interaction, but track the limitation date separately.'],
  ['Who should the notice go to?', 'It depends on the defect. The seller, the manufacturer, the service provider and — for an online purchase — the platform may each have a distinct role. Sending it to the wrong party alone is a common reason a claim stalls.'],
  ['What is product liability?', 'A statutory claim under Chapter VI of the Consumer Protection Act for harm caused by a defective product. It is a significant advance on ordinary contract remedies, because it reaches the manufacturer directly.'],
  ['Do I have to prove the manufacturer was negligent?', 'Not in the way a general civil claim would require. Section 84 makes a manufacturer liable where, among other things, the product has a manufacturing defect, is defective in design, deviates from specifications, does not conform to an express warranty, or lacks adequate instructions or warnings. You prove the defect and the harm, not carelessness.'],
  ['Can the seller be liable if they did not make it?', 'Yes, in defined circumstances. Section 86 covers a product seller who is not the manufacturer, including where they exercised substantial control over aspects such as design, testing, manufacturing, packaging or labelling that caused the harm.'],
  ['Are there defences?', 'Yes. Section 87 sets out exceptions — including misuse, alteration or modification of the product, and situations where the harm arose from the consumer disregarding warnings or instructions. That is why the notice should address how the product was actually used.'],
  ['What is the difference between a defect and a deficiency?', 'A defect concerns goods — a fault in quality, quantity, standard or potency. A deficiency concerns a service — a shortfall in the quality or manner of performance. A failed product plus a refused repair can involve both.'],
  ['What can I demand?', 'Removal of the defect, replacement, return of the price, compensation for loss or injury, and in appropriate cases compensation for mental agony and litigation costs. Section 39 sets out what a Commission can order.'],
  ['Should I demand a specific amount?', 'Demand what you can evidence. An inflated figure with no basis weakens an otherwise strong notice and makes settlement harder.'],
  ['The warranty period has expired. Is there any claim?', 'Possibly. A warranty is a contractual promise; it does not exhaust your statutory rights. A manufacturing defect that existed at sale but manifested later, or an unsafe product, can still ground a claim.'],
  ['The brand says the warranty is void because of unauthorised repair. What then?', 'That is a factual assertion they must support. Ask for the basis in writing, preserve the service history, and note that a warranty condition does not by itself displace a product liability claim.'],
  ['I bought it online. Who is responsible?', 'The seller on the platform, the manufacturer and potentially the platform each have obligations. The Consumer Protection (E-Commerce) Rules, 2020 impose duties on marketplaces including grievance handling and seller disclosure. Preserve the order page as it appeared at purchase.'],
  ['The product listing has changed since I bought it. Does that matter?', 'It matters a great deal, because the listing is often the express representation you relied on. Capture it early — listings are edited, and once changed the original description can be difficult to establish.'],
  ['What if the product is dangerous rather than just faulty?', 'Treat it differently. Stop using it, preserve it, document any injury with medical records, and report it. The Central Consumer Protection Authority has powers including recall and reimbursement where goods are unsafe.'],
  ['Can a business buy claim as a consumer?', 'Goods bought for resale or for a commercial purpose generally fall outside the consumer definition, subject to the exception for goods used exclusively for earning a livelihood by self-employment. Where the consumer route is unavailable, a contractual or civil claim is the alternative.'],
  ['Should I return the product if asked?', 'Be careful. Once the product is handed over, your evidence goes with it. Photograph and document it thoroughly first, and ideally get a written acknowledgement describing the condition and the defect.'],
  ['Do I need a technical report?', 'Not always, but in a contested matter it helps considerably, and in some claims a Commission may direct testing. Where the value justifies it, an independent assessment is worth obtaining before the product leaves your hands.'],
  ['What if they ignore the notice?', 'That silence is useful. File the consumer complaint, annexing the notice and proof of delivery, which demonstrates the defect was raised and the opportunity to remedy was declined.'],
  ['Where do I file the complaint?', 'Before the District, State or National Commission depending on the value of the consideration paid. The District Commission handles matters up to the prescribed threshold. See our consumer court page for the forum and process.'],
  ['Is there a fee and do I need a lawyer?', 'Consumer proceedings were designed to be accessible and a party may appear in person, though the drafting and evidence still decide the outcome.'],
  ['What is the biggest mistake?', 'Chasing the seller informally for a year. The claim does not improve while you wait, the evidence degrades, and the two-year clock runs the whole time.'],
  ['Can Estabizz appear before the Commission?', 'We handle defect documentation, liability mapping, notice drafting, platform escalation, compensation assessment, complaint preparation and advocate coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Consumer' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Faulty Product Notice' }]}
      title="Faulty Product Notice"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Faulty Product Notice"
      sections={sections}
      ctaTitle="Speak With a Consumer Law Expert"
      ctaDescription="Defect documented, the right party identified, and a notice that sets up the complaint rather than just expressing frustration."
      quickFacts={[
        { label: 'Limitation', value: '2 years, Section 69' },
        { label: 'Product liability', value: 'Sections 82 to 87' },
        { label: 'Negligence', value: 'Not required to prove' },
        { label: 'Preserve first', value: 'Product and listing' }
      ]}
      relatedArticles={[
        { title: 'Complaints Before Consumer Court', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Correct Commission, limitation, evidence, relief calculation and e-Jagriti filing support.' },
        { title: 'Food Adulteration', href: '/solutions/legal/food-adulteration-legal-services', category: 'Legal', description: 'FSSAI notices, unsafe food allegations, sample disputes and recall obligations.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence and execution.' }
      ]}
      finalCtaTitle="Stop Chasing, Start Documenting"
      finalCtaDescription="A year of service tickets and assurances is not progress — it is the two-year limitation running down while the evidence degrades. One properly drafted notice usually achieves more than twenty follow-up calls."
      heroDescription={<p>When a product fails and the seller stalls, most people spend months in a loop of photographs, service visits and ticket numbers. That loop is not neutral: the evidence deteriorates, the product often leaves your possession, and the statutory clock keeps running. A properly drafted notice changes the dynamic — it fixes the defect in writing, names the right party, states what is demanded and by when, and builds the record a Consumer Commission will later want to see. Estabizz assists consumers and business buyers with defect documentation, warranty and liability analysis, identifying the correct recipients, notice drafting, e-commerce platform escalation, compensation assessment, complaint preparation and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> this is the formal demand you make when a product is defective and the seller, brand or platform will not put it right.</p>
        <p>It matters because informal complaints have no shelf life. A dated notice setting out the defect, the demand and the deadline converts a running argument into a record — and that record is what supports a consumer complaint, a product liability claim or a settlement.</p>
        <p>This page covers the notice and the liability analysis. For filing the complaint itself — forum, procedure and reliefs — see <Link href="/solutions/legal/complaints-before-consumer-court">Complaints Before Consumer Court</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A faulty product notice is not a licence or a filing. It is a pre-litigation legal demand, and nothing registers it anywhere.</p>
        <p>The governing framework is the Consumer Protection Act, 2019, with the E-Commerce Rules for online purchases, the Sale of Goods Act for implied conditions, Legal Metrology for quantity and declarations, and any product-specific regulator depending on what failed.</p>
      </Section>

      <Section id="preserve" title="Before You Send Anything">
        <div className="warning-box" aria-label="Preserve the evidence">
          <p><strong>Do not hand the product over before you have documented it.</strong> The single most common way a good claim collapses is that the buyer sends the item to a service centre, it is never returned or is returned altered, and the evidence of the defect goes with it. Photograph and video it thoroughly, keep the packaging, and get any handover acknowledged in writing describing the condition and the fault.</p>
        </div>
        <DataTable headers={['Preserve', 'Why']} rows={[
          ['The product itself', 'It is the primary evidence; do not discard or replace it'],
          ['Original packaging and accessories', 'Condition, completeness and batch details'],
          ['Invoice and proof of payment', 'Establishes the transaction and the consideration paid'],
          ['Warranty card and terms', 'The express promise relied on'],
          ['The listing or advertisement as it appeared', 'Listings are edited — capture it now'],
          ['Photographs and video of the defect', 'Dated, showing the fault clearly'],
          ['Service tickets and job cards', 'The repair history and what was said'],
          ['Chats, emails and call records', 'Proof of complaints made and responses'],
          ['Delivery record', 'Date of delivery, which often starts the clock'],
          ['Medical records, where there was injury', 'Essential for a harm claim'],
          ['Any technical or expert assessment', 'Independent support for the defect']
        ]} />
      </Section>

      <Section id="limitation" title="The Two-Year Clock">
        <div className="warning-box" aria-label="Limitation">
          <p><strong>Section 69 of the Consumer Protection Act, 2019 bars a complaint filed more than two years after the cause of action arose.</strong> Delay can be condoned where sufficient cause is shown and the Commission records its reasons, but that is discretionary. Crucially, the months you spend in the service-centre loop do not pause anything. Buyers routinely arrive having chased politely for eighteen months, and discover the remaining window is measured in weeks.</p>
        </div>
        <DataTable headers={['Practical step', 'Why']} rows={[
          ['Fix the cause of action date early', 'Usually purchase, delivery or the refusal — identify which applies'],
          ['Calendar the two-year date immediately', 'Everything else is planned backwards from it'],
          ['Set an internal deadline well before it', 'Leaves room to draft and file properly'],
          ['Keep every dated interaction', 'Supports a condonation request if one becomes necessary'],
          ['Do not accept open-ended assurances', 'Ask for a date, in writing'],
          ['Send the notice with time to spare', 'A notice sent in the final week looks like an afterthought'],
          ['File before the date even if talks continue', 'Negotiation can carry on after filing']
        ]} />
      </Section>

      <Section id="who-to-notice" title="Who to Send It To">
        <p>Getting the recipients right is half the work. Different parties carry different obligations, and a notice addressed only to a retailer often cannot deliver what the buyer actually wants.</p>
        <DataTable headers={['Party', 'When they belong on the notice']} rows={[
          ['Seller or retailer', 'The contracting party — refund and replacement usually start here'],
          ['Manufacturer or brand', 'Manufacturing or design defect, express warranty, or harm caused'],
          ['Authorised service centre', 'Where repair was refused, botched or endlessly delayed'],
          ['E-commerce platform', 'Online purchase — grievance obligations and seller disclosure'],
          ['Importer', 'Imported goods, where the manufacturer is outside India'],
          ['Product service provider', 'Where installation or servicing was the failure'],
          ['Distributor', 'Where they had a role in handling, storage or packaging'],
          ['Insurer', 'Where an extended warranty or protection plan is involved']
        ]} />
        <div className="info-box" aria-label="Why it matters">
          <p><strong>A manufacturing defect is rarely the retailer&rsquo;s to fix.</strong> Buyers often send everything to the shop they bought from, get told to deal with the brand, and lose months bouncing between them. Name the parties who actually carry the obligation, in the same notice, and let them sort out attribution between themselves.</p>
        </div>
      </Section>

      <Section id="product-liability" title="Product Liability Without Proving Negligence">
        <p>Chapter VI of the Consumer Protection Act, 2019 was a genuine change, and it is under-used by buyers who still frame everything as a refund request.</p>
        <DataTable headers={['Provision', 'What it establishes']} rows={[
          ['Section 82', 'Application of the product liability chapter'],
          ['Section 83', 'A product liability action may be brought for harm caused by a defective product'],
          ['Section 84', 'Liability of the product manufacturer'],
          ['Section 85', 'Liability of the product service provider'],
          ['Section 86', 'Liability of the product seller who is not the manufacturer'],
          ['Section 87', 'Exceptions to liability']
        ]} />
        <div className="info-box" aria-label="Manufacturer liability">
          <p><strong>You do not have to show the manufacturer was careless.</strong> Section 84 makes a manufacturer liable where the product contains a manufacturing defect, is defective in design, deviates from manufacturing specifications, does not conform to an express warranty, or fails to contain adequate instructions for correct use or a warning about improper use. The enquiry is about the product and the harm, not about proving how the failure happened inside the factory — which is information a buyer could never realistically obtain.</p>
        </div>
        <DataTable headers={['Exception under Section 87', 'What it means in practice']} rows={[
          ['Product misused or abused', 'Address how the product was actually used, in the notice'],
          ['Altered or modified after sale', 'Unauthorised modification can break the chain'],
          ['Warnings or instructions disregarded', 'Keep the manual and show compliance where relevant'],
          ['Obvious or commonly known danger', 'Relevant for inherently risky products'],
          ['Employer or intermediary supplied it with warnings', 'Fact-specific, and limited'],
          ['Practical consequence', 'Pre-empt the likely exception rather than waiting for it']
        ]} />
      </Section>

      <Section id="defect-deficiency" title="Defect, Deficiency and Unfair Trade Practice">
        <DataTable headers={['Concept', 'What it covers', 'Typical example']} rows={[
          ['Defect in goods', 'Fault in quality, quantity, potency, purity or standard', 'Appliance that fails within weeks'],
          ['Deficiency in service', 'Shortfall in the quality or manner of performance', 'Repair refused or repeatedly botched'],
          ['Unfair trade practice', 'Misleading representation about the goods or service', 'Specifications overstated on the listing'],
          ['Spurious goods', 'Goods falsely claimed to be genuine', 'Counterfeit sold as branded'],
          ['Product liability', 'Harm caused by a defective product', 'Device that caused injury or property damage'],
          ['Short quantity or wrong declaration', 'Packaged commodity requirements', 'Underweight pack or missing MRP declaration']
        ]} />
        <p>Most real matters involve more than one of these at once — a defective product, a deficient repair service and a misleading listing. Pleading all the limbs that genuinely apply is stronger than choosing one.</p>
      </Section>

      <Section id="contents" title="What the Notice Should Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Buyer details', 'Identity and contact'],
          ['Recipient details', 'Each party and their role'],
          ['Purchase particulars', 'Date, invoice number, price paid and channel'],
          ['Product identification', 'Model, serial or IMEI, and batch where relevant'],
          ['The representation relied on', 'Listing, advertisement or specification'],
          ['A precise description of the defect', 'Specific and observable, not "not working properly"'],
          ['When it first appeared', 'Relevant to warranty and to limitation'],
          ['Complaint history', 'Every ticket, visit and response, with dates'],
          ['Harm or loss caused', 'Quantified, with supporting documents'],
          ['Legal basis', 'Defect, deficiency, unfair trade practice or product liability'],
          ['The relief demanded', 'Specific — refund, replacement, repair or compensation'],
          ['A deadline for compliance', 'Reasonable, and stated clearly'],
          ['Consequence of non-compliance', 'The steps that will follow'],
          ['Evidence preservation demand', 'Asks them to retain service records and internal notes'],
          ['Annexures', 'Invoice, warranty, photographs and correspondence']
        ]} />
      </Section>

      <Section id="reliefs" title="What to Demand">
        <DataTable headers={['Relief', 'When it is the right ask']} rows={[
          ['Removal of the defect', 'The product is otherwise fit and repair is realistic'],
          ['Replacement', 'A recurring or fundamental defect'],
          ['Return of the price paid', 'Confidence in the product is gone, or replacement failed'],
          ['Compensation for loss', 'Consequential loss you can actually evidence'],
          ['Compensation for injury', 'Supported by medical records'],
          ['Compensation for mental agony', 'Available in appropriate cases'],
          ['Litigation costs', 'Where proceedings become necessary'],
          ['Discontinuation of an unfair practice', 'Where the representation misled more than just you'],
          ['Withdrawal of unsafe goods', 'Where there is a safety risk to others']
        ]} />
        <p>Section 39 sets out what a Consumer Commission can order, and a notice that asks for relief the Commission could actually grant reads far more credibly than one demanding an arbitrary lump sum.</p>
      </Section>

      <Section id="warranty" title="Warranty Denial">
        <div className="info-box" aria-label="Warranty is not the limit">
          <p><strong>A warranty is a contractual promise layered on top of your statutory rights, not a replacement for them.</strong> Brands frequently respond as though expiry of the warranty ends the discussion. It does not. A manufacturing defect that existed at the time of sale, an unsafe product, or a misrepresentation about the goods can each support a claim independently of the warranty period.</p>
        </div>
        <DataTable headers={['Denial reason given', 'How to respond']} rows={[
          ['Warranty period expired', 'Address whether the defect existed at sale; statutory rights survive'],
          ['Unauthorised repair alleged', 'Ask for the basis in writing; produce the service history'],
          ['Physical damage alleged', 'Photographs from delivery onwards; ask for their inspection report'],
          ['Misuse alleged', 'Document actual usage against the manual'],
          ['Consumable or wear-and-tear', 'Compare against reasonable expected life'],
          ['Warranty card not produced', 'Invoice and the electronic record generally suffice'],
          ['Serial number mismatch', 'Purchase record and packaging'],
          ['Terms never disclosed at purchase', 'Undisclosed conditions are hard to enforce']
        ]} />
      </Section>

      <Section id="ecommerce" title="E-Commerce Purchases">
        <p>Online purchases add a party and change the evidence problem, because the thing you relied on — the listing — is under the other side&rsquo;s control and can be edited at any time.</p>
        <DataTable headers={['Point', 'What to do']} rows={[
          ['The listing as it appeared', 'Capture the full page with specifications and images immediately'],
          ['Seller identity', 'Marketplaces must display seller details — record them'],
          ['Order and delivery record', 'Order ID, invoice, delivery confirmation'],
          ['Platform grievance officer', 'Escalate through the published mechanism and keep the ticket'],
          ['Return window', 'Note it, but do not let it substitute for the legal claim'],
          ['Marketplace versus inventory model', 'Affects who is answerable; establish which applies'],
          ['Imported goods', 'The importer may be treated as the manufacturer for these purposes'],
          ['Cancelled or delisted product', 'Preserve your captures — it may vanish from the site']
        ]} />
        <p>The Consumer Protection (E-Commerce) Rules, 2020 impose obligations on marketplaces including grievance redressal and seller disclosure. Use that route in parallel with the notice — it is often faster, and the ticket record is useful evidence either way.</p>
      </Section>

      <Section id="unsafe" title="Unsafe Products and Recall">
        <div className="warning-box" aria-label="Safety">
          <p><strong>If the product is dangerous, stop using it now.</strong> An overheating battery, a faulty electrical appliance, a vehicle component, a contaminated consumable or a defective medical device is not a refund dispute to be negotiated over weeks. Stop use, isolate the product, photograph it, obtain medical records for any injury, and report it. Continuing to use a product you have described as unsafe also undermines the claim you are making about it.</p>
        </div>
        <DataTable headers={['Step', 'Why']} rows={[
          ['Stop using the product', 'Safety first, and consistency with your own case'],
          ['Preserve it unaltered', 'Do not let anyone "check" it without documentation'],
          ['Document any injury or damage', 'Medical records and photographs, contemporaneously'],
          ['Notify the manufacturer in writing', 'Puts them on notice of a safety issue'],
          ['Report to the authority', 'The CCPA has powers including recall and reimbursement'],
          ['Check for an existing recall', 'A published recall materially strengthens the claim'],
          ['Preserve batch and serial details', 'Links your unit to the affected batch'],
          ['Consider a product liability claim', 'Where harm was caused, not merely inconvenience']
        ]} />
        <p>For unsafe food specifically, the FSSAI framework applies alongside consumer law — see <Link href="/solutions/legal/food-adulteration-legal-services">Food Adulteration</Link>.</p>
      </Section>

      <Section id="business-buyers" title="Business and Commercial Buyers">
        <div className="info-box" aria-label="Commercial purpose">
          <p><strong>Buying through a company does not automatically make you a consumer.</strong> Goods obtained for resale or for a commercial purpose generally fall outside the consumer definition, subject to the exception for goods used exclusively for earning a livelihood by means of self-employment. This catches businesses out: they send a consumer notice, file before a Commission, and face a maintainability objection at the threshold.</p>
        </div>
        <DataTable headers={['Situation', 'Likely route']} rows={[
          ['Sole trader’s equipment used for self-employment', 'Consumer route may be available under the exception'],
          ['Machinery bought for a production line', 'Usually commercial — contractual or civil claim'],
          ['Goods bought for resale', 'Outside the consumer definition'],
          ['Office equipment for internal use', 'Fact-specific; assess before filing'],
          ['Defective component causing production loss', 'Contract claim, with damages for loss'],
          ['Breach of a supply agreement', 'Contractual remedies and the agreed forum'],
          ['Arbitration clause in the purchase contract', 'Check it before filing anywhere']
        ]} />
        <p>Where the consumer route is unavailable, the claim is contractual and the analysis shifts to warranties, the Sale of Goods Act implied conditions and any agreed dispute resolution mechanism. See <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link>.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main consumer law', 'Consumer Protection Act, 2019'],
          ['Product liability', 'Consumer Protection Act, Chapter VI, Sections 82 to 87'],
          ['Limitation', 'Consumer Protection Act, Section 69 — two years'],
          ['Forum', 'District, State and National Consumer Disputes Redressal Commissions'],
          ['Regulator', 'Central Consumer Protection Authority'],
          ['Online purchases', 'Consumer Protection (E-Commerce) Rules, 2020'],
          ['Sale of goods', 'Sale of Goods Act, 1930, including implied conditions and warranties'],
          ['Quantity and declarations', 'Legal Metrology Act, 2009 and the Packaged Commodities Rules'],
          ['Standards', 'BIS and product-specific standards'],
          ['Sectoral regulators', 'FSSAI, CDSCO, BIS or other regulator depending on the product'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Contractual route', 'Indian Contract Act, 1872, where the consumer route is unavailable']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Section 2(7)', 'Who is a consumer, including the commercial purpose exclusion'],
          ['Section 2(10)', 'Defect in goods'],
          ['Section 2(11)', 'Deficiency in service'],
          ['Section 2(34)', 'Product liability'],
          ['Sections 2(35) to 2(37)', 'Product manufacturer, product seller and product service provider'],
          ['Section 2(47)', 'Unfair trade practice'],
          ['Section 10', 'Establishment of the Central Consumer Protection Authority'],
          ['Section 20', 'CCPA powers including recall, reimbursement and discontinuation'],
          ['Section 35', 'Filing of a consumer complaint'],
          ['Section 39', 'Orders a Commission may pass, including replacement and compensation'],
          ['Section 69', 'Two-year limitation, with condonation for sufficient cause'],
          ['Section 84', 'Liability of the product manufacturer'],
          ['Section 85', 'Liability of the product service provider'],
          ['Section 86', 'Liability of the product seller'],
          ['Section 87', 'Exceptions to product liability'],
          ['E-Commerce Rules, 2020', 'Marketplace duties, seller disclosure and grievance redressal'],
          ['Sale of Goods Act, Sections 14 to 17', 'Implied conditions as to title, description, quality and fitness']
        ]} />
      </Section>

      <Section id="evidence" title="Proving the Defect">
        <DataTable headers={['To establish', 'What helps']} rows={[
          ['The purchase', 'Invoice, payment record and delivery confirmation'],
          ['What was promised', 'Listing capture, advertisement, specification sheet, warranty terms'],
          ['The defect', 'Dated photographs and video showing the fault in operation'],
          ['That it is not misuse', 'Usage record and compliance with the manual'],
          ['That it was raised promptly', 'Complaint tickets, emails and chat logs with dates'],
          ['The seller’s response', 'Their written replies, or the absence of any'],
          ['Repair history', 'Job cards, service reports and parts replaced'],
          ['Harm or loss', 'Medical records, repair bills, replacement cost, loss records'],
          ['Systemic defect', 'Recalls, regulator action or a pattern of similar complaints'],
          ['Independent verification', 'A technical assessment, where the value justifies it']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Invoice or bill', 'Proof of purchase and consideration'],
          ['Proof of payment', 'Transaction record'],
          ['Delivery record', 'Date of delivery'],
          ['Warranty card and terms', 'The express promise'],
          ['Product listing or advertisement', 'The representation relied on'],
          ['Photographs and video of the defect', 'Primary evidence'],
          ['Service tickets and job cards', 'Repair history'],
          ['Correspondence with seller and brand', 'Complaint trail'],
          ['Platform grievance ticket', 'Escalation record for online purchases'],
          ['Technical or expert report', 'Independent support'],
          ['Medical records', 'Where injury is claimed'],
          ['Loss documentation', 'Consequential loss claimed'],
          ['Product packaging and serial details', 'Identification and batch linkage'],
          ['Company purchase records', 'Where a business buyer is involved']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'The defect, the history and the objective'],
          ['2', 'Limitation check', 'Cause of action date and the remaining window'],
          ['3', 'Consumer status review', 'Whether the consumer route is available'],
          ['4', 'Evidence review', 'What exists, and what must be captured now'],
          ['5', 'Liability mapping', 'Manufacturer, seller, service provider or platform'],
          ['6', 'Claim framing', 'Defect, deficiency, unfair practice or product liability'],
          ['7', 'Relief and quantum', 'What to demand, supported by evidence'],
          ['8', 'Notice drafting', 'Precise, annexed and deadline-bound'],
          ['9', 'Dispatch and platform escalation', 'Trackable delivery, grievance ticket in parallel'],
          ['10', 'Response analysis', 'Settlement, denial or silence'],
          ['11', 'Complaint preparation', 'Where the notice does not resolve it'],
          ['12', 'Advocate coordination', 'Filing and appearance support']
        ]} />
      </Section>

      <Section id="after-notice" title="After the Notice">
        <DataTable headers={['Response', 'What it means', 'What follows']} rows={[
          ['Full compliance', 'Refund, replacement or repair provided', 'Confirm in writing and close'],
          ['Partial offer', 'Repair offered where replacement was sought', 'Weigh against the cost and time of proceeding'],
          ['Offer conditional on a release', 'They want finality', 'Review the release wording before signing'],
          ['Denial on warranty grounds', 'They rely on a contractual limit', 'Reframe on statutory rights and product liability'],
          ['Denial alleging misuse', 'They invoke a Section 87 exception', 'Evidence of actual use becomes central'],
          ['Request to inspect the product', 'Reasonable, but protect your evidence', 'Document condition and agree terms in writing'],
          ['Silence', 'No engagement', 'File, annexing the notice and proof of delivery'],
          ['Delay with assurances', 'The loop resuming', 'Set a final date and hold to it']
        ]} />
      </Section>

      <Section id="escalation" title="Escalating to a Complaint">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Where to file', 'District, State or National Commission, by the value of the consideration paid'],
          ['Time limit', 'Two years from the cause of action, under Section 69'],
          ['What to annex', 'Invoice, warranty, listing, photographs, correspondence and the notice with proof of delivery'],
          ['Reliefs to claim', 'As set out in Section 39, matched to the evidence'],
          ['Product liability action', 'Where harm was caused, against the appropriate party'],
          ['Appearance', 'A party may appear in person; drafting still decides the outcome'],
          ['Parallel routes', 'CCPA complaint where the practice affects consumers generally'],
          ['Settlement after filing', 'Common, and the filing usually improves the terms']
        ]} />
        <p>The forum, procedure and pecuniary thresholds are covered in detail on the <Link href="/solutions/legal/complaints-before-consumer-court">Complaints Before Consumer Court</Link> page.</p>
      </Section>

      <Section id="common-issues" title="Why Claims Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Chasing informally for months', 'Limitation runs and evidence degrades', 'Limitation calendared at the first meeting'],
          ['Product handed over undocumented', 'The primary evidence is gone', 'Photograph, video and written acknowledgement first'],
          ['Listing not captured', 'The representation relied on cannot be shown', 'Immediate capture of the page as it appeared'],
          ['Notice to the wrong party', 'The party who can fix it was never asked', 'Liability mapping before drafting'],
          ['Defect described vaguely', 'The claim is easy to deflect', 'Specific, observable description'],
          ['Arbitrary compensation figure', 'Credibility of the whole notice suffers', 'Quantum supported by documents'],
          ['Warranty expiry treated as fatal', 'A valid claim abandoned', 'Statutory rights and product liability pleaded'],
          ['Continuing to use an unsafe product', 'Undermines the safety case', 'Stop use and preserve'],
          ['Business buyer filing as a consumer', 'Maintainability objection at the threshold', 'Consumer status assessed before filing'],
          ['No proof of delivery of the notice', 'Service disputed', 'Trackable dispatch, records preserved'],
          ['Release signed without review', 'Rights given up for less than the claim was worth', 'Settlement terms reviewed first']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Defect and claim assessment', 'Whether there is a claim, and on what basis'],
          ['Limitation review', 'Cause of action date and the remaining window'],
          ['Consumer status review', 'Whether the consumer route is available to you'],
          ['Evidence documentation', 'What to capture, and how, before anything moves'],
          ['Liability mapping', 'Manufacturer, seller, service provider, platform or importer'],
          ['Warranty analysis', 'Terms, exclusions and whether a denial holds'],
          ['Product liability assessment', 'Chapter VI claim where harm was caused'],
          ['Notice drafting', 'Precise, annexed and deadline-bound'],
          ['E-commerce escalation', 'Grievance officer route in parallel'],
          ['Compensation assessment', 'A quantum you can actually support'],
          ['Response analysis', 'Reviewing offers, denials and release wording'],
          ['Complaint preparation', 'Commission-ready complaint and annexures'],
          ['CCPA complaint support', 'Where the practice affects consumers generally'],
          ['Advocate coordination', 'Filing and appearance support'],
          ['Ticket-based tracking', 'Notice, response, filing and next steps']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The two things that decide a product claim are both settled in the first week: whether the evidence was preserved before the product left your hands, and whether anyone noticed that the two-year clock had already started. Everything after that is drafting. A year of polite follow-up is not patience — it is the claim quietly expiring.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether you are a consumer for the purposes of the Act, whether a defect or deficiency is made out, which party is liable, what compensation is appropriate and which forum applies all depend on the facts, the product and the value involved. Limitation is described here in general terms and its application to a particular claim should be confirmed before relying on it. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides assessment, documentation, drafting and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
