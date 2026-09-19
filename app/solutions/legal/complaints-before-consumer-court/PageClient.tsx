'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'jurisdiction', title: 'Which Commission Hears Your Case' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Provisions' },
  { id: 'when-to-file', title: 'When You Can File' },
  { id: 'types', title: 'Types of Complaint' },
  { id: 'limitation', title: 'Limitation' },
  { id: 'reliefs', title: 'Reliefs You Can Claim' },
  { id: 'process', title: 'Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'complaint-contents', title: 'What the Complaint Should Include' },
  { id: 'sector-notes', title: 'Sector-Specific Notes' },
  { id: 'comparisons', title: 'Consumer Complaint vs Other Routes' },
  { id: 'rejection-reasons', title: 'Why Complaints Get Rejected' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a consumer complaint?', 'A legal complaint filed by a consumer for a defect, deficiency in service, unfair trade practice, product liability, overcharging, misleading advertisement or failure to provide promised goods or services.'],
  ['Who counts as a consumer?', 'A person who buys goods or avails services for consideration, under Section 2(7) of the Consumer Protection Act, 2019. Goods or services obtained for resale or for a commercial purpose are generally excluded, subject to the statutory exceptions.'],
  ['Which forum do I file in?', 'It depends on the value of the consideration paid — District Commission up to ₹50 lakh, State Commission above ₹50 lakh and up to ₹2 crore, National Commission above ₹2 crore, under the 2021 Jurisdiction Rules.'],
  ['Is the forum decided by the compensation I claim?', 'No. Pecuniary jurisdiction is based on the value of the goods or services paid as consideration, not on the compensation sought. This is a common and costly misunderstanding.'],
  ['What is territorial jurisdiction?', 'Broadly, where the opposite party resides or carries on business, or where the cause of action arose, and the Act also allows filing where the complainant resides or personally works for gain.'],
  ['What is the limitation period?', 'A complaint should generally be filed within the period prescribed under Section 69, running from the date the cause of action arose. Delay may be condoned where sufficient cause is shown.'],
  ['Do my emails and complaint tickets extend limitation?', 'Not automatically. Repeated follow-up does not by itself keep the clock running, so the date of the actual denial or refusal should be identified carefully.'],
  ['Do I need a lawyer?', 'A consumer may appear in person. Most complaints still benefit from proper drafting, because a poorly framed complaint or wrong forum wastes the filing entirely.'],
  ['Can I file online?', 'Yes, through the e-Jagriti portal, subject to the applicable procedure, alongside physical filing where required.'],
  ['Is a legal notice compulsory before filing?', 'Not strictly required in every case, but it is often useful — it establishes the demand, fixes the refusal date and sometimes resolves the matter.'],
  ['What reliefs can I ask for?', 'Refund, replacement, repair, removal of deficiency, compensation, interest, litigation cost, discontinuation of an unfair practice, corrective advertisement and, in serious cases, product recall.'],
  ['Can I claim compensation for harassment?', 'Compensation for loss, injury, harassment or mental agony may be claimed, and is awarded on the facts and the evidence of actual loss.'],
  ['Can I complain against an e-commerce platform?', 'Yes. Depending on the facts, the complaint may lie against the seller, the platform or both, and the correct opposite party mapping matters.'],
  ['Can I complain about an insurance claim rejection?', 'Yes, where the rejection is arbitrary or improper. The rejection date is usually the critical fact for limitation.'],
  ['Can homebuyers use the consumer route?', 'Yes, for possession delay, refund, amenities or quality issues. Whether the consumer forum or RERA is the better route depends on the relief sought and the facts.'],
  ['Is medical negligence a consumer matter?', 'Deficiency in medical service may be pursued where the facts support it. These matters are evidence-intensive and should be assessed carefully before filing.'],
  ['What is product liability?', 'A statutory route under the 2019 Act allowing a claim against a product manufacturer, product seller or product service provider for harm caused by a defective product.'],
  ['What does the CCPA do?', 'The Central Consumer Protection Authority has powers over unfair trade practices and misleading advertisements, including recall, reimbursement and penalties. It is separate from filing your own complaint.'],
  ['Can a company file a consumer complaint?', 'Only where it qualifies as a consumer. Goods or services obtained for a commercial purpose are generally outside the definition, subject to the exceptions.'],
  ['How long does a case take?', 'It varies by Commission and pendency. The Act contemplates time-bound disposal, but practical timelines should be assessed rather than assumed.'],
  ['Can I appeal an order?', 'Yes. Appeals lie from the District Commission to the State Commission, and from the State to the National Commission, within the prescribed periods.'],
  ['Is mediation available?', 'Yes. The 2019 Act provides for mediation, and it is often a faster route where the opposite party is willing.'],
  ['What if I filed in the wrong forum?', 'The complaint may be returned or dismissed, and limitation continues to run in the meantime. The jurisdiction check is worth doing before drafting, not after.'],
  ['What weakens a complaint most?', 'Missing proof of payment, no clear record of the defect or denial, the wrong opposite party, and a vague statement of the relief claimed.'],
  ['Does a warranty expiry end my case?', 'Not necessarily. Whether a claim survives depends on when the defect arose, what was represented and the facts around denial.'],
  ['What is the biggest practical mistake?', 'Treating the consumer forum as a continuation of customer support. It is a legal proceeding and needs a pleaded case with documents, not a complaint history.'],
  ['Can Estabizz appear before the Commission?', 'We handle case review, notice drafting, evidence compilation, jurisdiction and limitation checks, complaint drafting and filing support. Appearance is coordinated with advocates where required.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Consumer Disputes' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Consumer Court Complaints' }]}
      title="Complaints Before Consumer Court"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Complaints Before Consumer Court"
      sections={sections}
      ctaTitle="Speak With a Consumer Disputes Expert"
      ctaDescription="Discuss maintainability, forum, limitation and relief calculation for your complaint with the Estabizz team."
      quickFacts={[{ label: 'Main law', value: 'Consumer Protection Act, 2019' }, { label: 'District Commission', value: 'Up to ₹50 lakh' }, { label: 'State Commission', value: '₹50 lakh to ₹2 crore' }, { label: 'National Commission', value: 'Above ₹2 crore' }]}
      relatedArticles={[
        { title: 'Cheque Bounce in India', href: '/solutions/legal/cheque-bounce-in-india', category: 'Legal', description: 'Section 138 notice deadlines, complaint preparation and recovery strategy.' },
        { title: 'Caveat Filing', href: '/solutions/legal/caveat-filing', category: 'Legal', description: 'Preventive filing under CPC Section 148A against ex-parte orders.' },
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company petitions, restoration, IBC applications and NCLAT appeals.' }
      ]}
      finalCtaTitle="Stop Following Up. Start a Case."
      finalCtaDescription="Most consumers spend months on call centres and grievance tickets before moving to a legal remedy. A properly drafted complaint converts the issue into a structured claim with facts, evidence and reliefs."
      heroDescription={<p>Many consumers keep following up through call centres, emails and grievance tickets without ever moving to a legal remedy. A consumer complaint converts the issue into a structured legal claim with pleaded facts, documents, evidence, calculated reliefs and the correct forum. Estabizz assists with case review, legal notice drafting, evidence compilation, jurisdiction and limitation checks, relief calculation, complaint drafting, e-Jagriti filing support and hearing coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a consumer complaint is filed where goods are defective, a service is deficient, a trade practice is unfair, a product causes harm, you have been overcharged, an advertisement misled you, or what was promised was simply not delivered.</p>
        <p><strong>From a practical standpoint…</strong> the consumer forum is a legal proceeding, not an escalated customer support ticket. It needs a pleaded case: who the opposite party is, what was paid, what went wrong, when the refusal happened, what evidence exists and exactly what relief is claimed.</p>
        <p>It is relevant for consumers, homebuyers, online buyers, policyholders, patients, bank customers, travellers, service users and, in limited circumstances, businesses that qualify as consumers.</p>
      </Section>

      <Section id="jurisdiction" title="Which Commission Hears Your Case">
        <div className="warning-box" aria-label="Jurisdiction note">
          <p><strong>Jurisdiction is decided by what you paid, not by what you claim.</strong> Under the Consumer Protection Act, 2019 pecuniary jurisdiction rests on the value of the goods or services paid as consideration — not on the compensation sought. Inflating a compensation figure does not move the case to a higher forum, and filing in the wrong one wastes the filing while limitation keeps running.</p>
        </div>
        <DataTable headers={['Forum', 'Pecuniary jurisdiction', 'Governing provision']} rows={[
          ['District Commission', 'Consideration paid does not exceed ₹50 lakh', 'Section 34, with the 2021 Jurisdiction Rules'],
          ['State Commission', 'Exceeds ₹50 lakh but does not exceed ₹2 crore', 'Section 47, with the 2021 Jurisdiction Rules'],
          ['National Commission', 'Exceeds ₹2 crore', 'Section 58, with the 2021 Jurisdiction Rules']
        ]} />
        <DataTable headers={['Territorial jurisdiction', 'Practical meaning']} rows={[
          ['Opposite party&rsquo;s location', 'Where they reside or carry on business, or have a branch office'],
          ['Cause of action', 'Where the cause of action arose, wholly or in part'],
          ['Complainant&rsquo;s location', 'Where the complainant resides or personally works for gain'],
          ['Multiple opposite parties', 'The position is assessed against each of them'],
          ['Online transactions', 'Delivery, service and platform location are all relevant facts']
        ]} />
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main law', 'Consumer Protection Act, 2019'],
          ['Pecuniary jurisdiction', 'Consumer Protection (Jurisdiction of the District, State and National Commission) Rules, 2021'],
          ['District Commission', 'Section 34'],
          ['State Commission', 'Section 47'],
          ['National Commission', 'Section 58'],
          ['Limitation', 'Section 69'],
          ['Central authority', 'Central Consumer Protection Authority, Section 10'],
          ['Filing portal', 'e-Jagriti, where applicable'],
          ['Mediation', 'Statutory mediation route under the 2019 Act'],
          ['Related regimes', 'RERA for real estate, sectoral ombudsman schemes, and civil remedies where the consumer route is not available']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['s. 2(6)', 'Defines complaint'],
          ['s. 2(7)', 'Defines consumer'],
          ['s. 2(10)', 'Defines defect'],
          ['s. 2(11)', 'Defines deficiency'],
          ['s. 2(34)', 'Product liability'],
          ['s. 2(35)', 'Product manufacturer'],
          ['s. 2(36)', 'Product seller'],
          ['s. 2(37)', 'Product service provider'],
          ['s. 2(47)', 'Unfair trade practice'],
          ['s. 10', 'Establishment of the Central Consumer Protection Authority'],
          ['s. 18', 'Powers and functions of the CCPA'],
          ['s. 20', 'Power to recall goods, reimburse price or discontinue an unfair practice'],
          ['s. 21', 'Directions and penalties against false or misleading advertisements'],
          ['s. 34', 'Jurisdiction of the District Commission'],
          ['s. 47', 'Jurisdiction of the State Commission'],
          ['s. 58', 'Jurisdiction of the National Commission'],
          ['s. 69', 'Limitation period']
        ]} />
      </Section>

      <Section id="when-to-file" title="When You Can File">
        <DataTable headers={['Situation', 'What you can seek']} rows={[
          ['Defective product supplied', 'Refund, replacement, repair or compensation'],
          ['Service not delivered', 'Refund and compensation'],
          ['Warranty denied unfairly', 'Challenge the denial, demand repair or replacement'],
          ['E-commerce refund refused', 'Claim against the seller, the platform or both on the facts'],
          ['Wrong product delivered', 'Refund or replacement'],
          ['Builder delayed possession', 'Delay compensation, refund or other relief'],
          ['Insurance claim rejected', 'Challenge an arbitrary or improper rejection'],
          ['Bank charged wrongly', 'Refund and compensation'],
          ['Medical service deficient', 'Compensation where the facts support deficiency'],
          ['Travel booking failed', 'Refund and consequential loss'],
          ['Telecom service issue', 'Service deficiency claim where maintainable'],
          ['Appliance repair failed', 'Service deficiency claim'],
          ['Misleading advertisement', 'Relief on the facts, and the CCPA route separately']
        ]} />
      </Section>

      <Section id="types" title="Types of Complaint">
        <DataTable headers={['Complaint type', 'Typical subject matter']} rows={[
          ['Defective product', 'Faulty goods, breakage, warranty dispute'],
          ['Service deficiency', 'Poor, incomplete or failed service'],
          ['E-commerce', 'Online purchase, refund, wrong delivery, counterfeit product'],
          ['Insurance', 'Claim rejection, delay or partial settlement'],
          ['Banking', 'Charges, account issues, card disputes, loan servicing'],
          ['Builder and real estate', 'Possession delay, refund, amenities, construction quality'],
          ['Medical service', 'Deficiency in service, where the facts support it'],
          ['Travel and airline', 'Cancellation, refund, lost baggage, service failure'],
          ['Telecom', 'Billing, network, activation and deactivation issues'],
          ['Vehicle', 'Defect, warranty, service centre issues'],
          ['Appliance', 'Repair, replacement, extended warranty'],
          ['Product liability', 'Harm caused by a defective product'],
          ['Legal metrology', 'MRP, weight, quantity and packaged goods issues']
        ]} />
      </Section>

      <Section id="limitation" title="Limitation">
        <DataTable headers={['Point', 'Practical meaning']} rows={[
          ['Basic limitation', 'The complaint should be filed within the period prescribed under Section 69'],
          ['Cause of action', 'The date of the defect, denial, rejection, deficiency or final refusal is what counts'],
          ['Continuing cause', 'Some matters may involve a continuing cause, depending on the facts'],
          ['Delay condonation', 'Delay may be condoned where sufficient cause is shown'],
          ['Complaint tickets', 'Repeated emails do not automatically extend limitation'],
          ['Legal notice', 'Useful, but it does not always stop the clock'],
          ['Settlement talks', 'Should be documented, so the timeline can be explained'],
          ['Insurance rejection', 'The rejection date is usually the key fact'],
          ['Builder delay', 'The possession or refund timeline is reviewed'],
          ['Warranty claims', 'Both the defect date and the denial date are reviewed'],
          ['E-commerce', 'The delivery or refund-denial date is reviewed']
        ]} />
        <p>The most common limitation problem is not delay itself but the inability to say clearly when the refusal happened. Fix that date early, with a document behind it.</p>
      </Section>

      <Section id="reliefs" title="Reliefs You Can Claim">
        <DataTable headers={['Relief', 'Practical meaning']} rows={[
          ['Refund', 'Return of the amount paid'],
          ['Replacement', 'Defect-free goods'],
          ['Repair or removal of defect', 'Correction of the product issue'],
          ['Removal of deficiency', 'Correction of the service failure'],
          ['Compensation', 'For loss, injury, harassment or damage'],
          ['Interest', 'Delay-related relief where justified'],
          ['Litigation cost', 'Cost of the proceeding'],
          ['Return of price', 'In product disputes'],
          ['Discontinuation of unfair practice', 'Stopping deceptive conduct'],
          ['Corrective advertisement', 'Where a misleading advertisement caused harm'],
          ['Product recall', 'In serious product safety cases'],
          ['Withdrawal of hazardous goods', 'Where the product is unsafe'],
          ['Medical expense', 'Where the product or service caused injury']
        ]} />
        <p>Reliefs should be calculated and pleaded specifically. A complaint that asks for &ldquo;appropriate compensation&rdquo; without a figure and a basis invites an award that reflects that vagueness.</p>
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Product or service, payment and dispute understood'],
          ['2', 'Consumer status check', 'Confirm the matter is maintainable as a consumer complaint'],
          ['3', 'Opposite party mapping', 'Seller, manufacturer, platform, service provider and branch identified'],
          ['4', 'Evidence review', 'Invoice, payment, complaint trail and product or service proof'],
          ['5', 'Legal notice', 'Pre-complaint notice drafted where useful'],
          ['6', 'Limitation check', 'Filing timeline reviewed under Section 69'],
          ['7', 'Jurisdiction check', 'Correct Commission and territorial jurisdiction mapped'],
          ['8', 'Relief calculation', 'Refund, compensation, interest and cost calculated'],
          ['9', 'Complaint drafting', 'Facts, grounds and reliefs pleaded'],
          ['10', 'Annexure indexing', 'Documents numbered and organised'],
          ['11', 'Affidavit', 'Verification prepared as required'],
          ['12', 'Filing', 'Physical or e-Jagriti filing support'],
          ['13', 'Admission tracking', 'Defects, objections and case number tracked']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Invoice or bill', 'Proof of the transaction and consideration paid'],
          ['Payment proof', 'Bank statement, card record or UPI reference'],
          ['Order confirmation or booking record', 'Terms of the transaction'],
          ['Warranty or guarantee card', 'Scope of the promise given'],
          ['Product photographs or videos', 'Evidence of the defect'],
          ['Service records and job cards', 'Evidence of the deficiency'],
          ['Complaint trail', 'Emails, tickets and call records showing follow-up'],
          ['Denial or rejection letter', 'Fixes the cause of action date'],
          ['Legal notice and dispatch proof', 'Pre-complaint demand'],
          ['Policy or agreement', 'Insurance, builder or service contracts'],
          ['Medical records, where relevant', 'Treatment and outcome evidence'],
          ['Identity and address proof', 'Filing and jurisdiction']
        ]} />
      </Section>

      <Section id="complaint-contents" title="What the Complaint Should Include">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Complainant details', 'Establishes consumer status'],
          ['Opposite party details', 'Correct party, correct address, correct branch'],
          ['Transaction particulars', 'What was bought, when, and for how much'],
          ['Consideration paid', 'Determines pecuniary jurisdiction'],
          ['The defect or deficiency', 'The substance of the claim'],
          ['Cause of action and its date', 'Limitation and maintainability'],
          ['Jurisdiction averment', 'Both territorial and pecuniary'],
          ['Evidence index', 'Links each assertion to a document'],
          ['Reliefs claimed, with figures', 'Vague prayers produce vague orders'],
          ['Affidavit or verification', 'Supports correctness'],
          ['Limitation explanation, if delayed', 'Addresses delay upfront']
        ]} />
      </Section>

      <Section id="sector-notes" title="Sector-Specific Notes">
        <DataTable headers={['Sector', 'What to watch']} rows={[
          ['E-commerce', 'Whether the claim lies against the seller, the platform or both, and where the cause of action arose'],
          ['Insurance', 'The rejection letter and its date usually drive both merits and limitation'],
          ['Builder and real estate', 'Whether the consumer forum or RERA is the better route for the relief actually sought'],
          ['Medical services', 'Evidence-intensive; records and expert material matter more than the narrative'],
          ['Banking', 'Charge records and the bank&rsquo;s own grievance response are central'],
          ['Travel and airline', 'Booking terms, cancellation policy and the refund refusal date'],
          ['Telecom', 'Billing records and the service provider&rsquo;s complaint trail'],
          ['Vehicles', 'Job cards, service history and the manufacturer versus dealer distinction']
        ]} />
      </Section>

      <Section id="comparisons" title="Consumer Complaint vs Other Routes">
        <DataTable headers={['Point', 'Consumer complaint', 'Legal notice', 'Civil suit']} rows={[
          ['Filed with', 'Consumer Commission', 'Sent to the opposite party', 'Civil court'],
          ['Purpose', 'Statutory consumer relief', 'Demand before litigation', 'General civil relief'],
          ['Cost', 'Relatively low statutory fee', 'Drafting cost only', 'Ad valorem court fee'],
          ['Speed', 'Intended to be time-bound', 'Immediate', 'Generally slower'],
          ['Who can use it', 'A consumer as defined in the Act', 'Anyone', 'Anyone with a civil cause'],
          ['Typical relief', 'Refund, replacement, compensation', 'None on its own', 'Damages, specific performance']
        ]} />
        <p>The National Consumer Helpline is a grievance and mediation channel rather than an adjudicating forum. It can resolve matters, but it does not produce an enforceable order the way a Commission does.</p>
      </Section>

      <Section id="rejection-reasons" title="Why Complaints Get Rejected">
        <DataTable headers={['Reason', 'How to avoid it']} rows={[
          ['Not a consumer under the Act', 'Check maintainability before drafting, especially for commercial purchases'],
          ['Wrong forum on value', 'Pecuniary jurisdiction follows consideration paid, not compensation claimed'],
          ['Wrong territorial forum', 'Map the opposite party, branch and cause of action'],
          ['Filed beyond limitation', 'Fix the refusal date early, and address delay upfront'],
          ['No proof of payment', 'Consideration must be evidenced, not asserted'],
          ['Wrong opposite party', 'Seller, manufacturer and platform are distinct'],
          ['Vague reliefs', 'Calculate and plead figures with a basis'],
          ['Unindexed annexures', 'Number documents and link them to the pleaded facts'],
          ['Complaint history instead of pleadings', 'A ticket trail is evidence, not a case']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Case review', 'Assess maintainability and consumer status'],
          ['Opposite party mapping', 'Identify the correct parties and addresses'],
          ['Legal notice drafting', 'Pre-complaint demand where useful'],
          ['Evidence compilation', 'Invoices, payment proof, complaint trail and records'],
          ['Jurisdiction check', 'Pecuniary and territorial forum assessment'],
          ['Limitation review', 'Cause of action date and condonation strategy'],
          ['Relief calculation', 'Refund, compensation, interest and cost, with a basis'],
          ['Complaint drafting', 'Pleaded facts, grounds and reliefs'],
          ['Annexure indexing', 'Numbered, linked document set'],
          ['e-Jagriti filing support', 'Filing coordination and defect removal'],
          ['Reply and rejoinder support', 'Response drafting through the proceeding'],
          ['Mediation support', 'Where settlement is the better outcome'],
          ['Advocate coordination', 'Briefing and appearance support']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Consumers lose good cases on two things: filing in the wrong forum because they sized it by the compensation they wanted rather than what they paid, and being unable to point to the date they were actually refused. Both are settled before drafting begins, not after.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Maintainability, forum, limitation and available reliefs depend on the facts of each case, and parts of this guide are still undergoing professional review. Estabizz provides case review, drafting, documentation and filing support; appearance is coordinated with advocates where required. Confirm the current position and the applicable jurisdiction rules before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
