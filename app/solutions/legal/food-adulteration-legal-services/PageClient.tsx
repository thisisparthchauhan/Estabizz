'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'categories', title: 'The Categories That Decide Everything' },
  { id: 'penalties', title: 'Penalties as Revised in 2023' },
  { id: 'unsafe-food', title: 'Unsafe Food Under Section 59' },
  { id: 'sampling', title: 'Sampling and the Referral Laboratory' },
  { id: 'first-48', title: 'When a Notice or Report Arrives' },
  { id: 'notices', title: 'Improvement, Prohibition and Licence Action' },
  { id: 'adjudication', title: 'Adjudication, Prosecution and Appeal' },
  { id: 'company-liability', title: 'Company and Director Liability' },
  { id: 'recall', title: 'Product Recall' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'bns', title: 'The Criminal Law Overlay' },
  { id: 'types', title: 'Matters We Handle' },
  { id: 'who-needs', title: 'Who Needs This' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'defence', title: 'Building the Defence File' },
  { id: 'prevention', title: 'Preventive Compliance' },
  { id: 'common-issues', title: 'Where Businesses Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What does food adulteration mean legally?', 'The FSS Act, 2006 does not turn on a single concept of "adulteration". It works through defined categories — unsafe food, sub-standard food, misbranded food, food containing extraneous matter, and specific contraventions. Which category the allegation falls into determines the penalty, the forum and the defence.'],
  ['Which law and regulator apply?', 'The Food Safety and Standards Act, 2006 with its rules and regulations, administered by FSSAI centrally and enforced in the States through the Commissioner of Food Safety, Designated Officers, Food Safety Officers and Food Analysts.'],
  ['Have the penalties changed recently?', 'Yes, and significantly. The Jan Vishwas (Amendment of Provisions) Act, 2023 amended the FSS Act with effect from 8 November 2023, rationalising penalties and decriminalising several contraventions. Advice based on pre-2023 figures is out of date.'],
  ['What is the penalty for sub-standard food now?', 'Under Section 51, a penalty which may extend to ten lakh rupees — raised from the earlier five lakh rupees by the 2023 amendment.'],
  ['What is the punishment for unsafe food?', 'Section 59 grades it by consequence: where it does not result in injury, imprisonment up to three months and fine up to three lakh rupees; non-grievous injury, up to one year and up to three lakh rupees; grievous injury, up to six years and up to five lakh rupees; and where it causes death, imprisonment not less than seven years extending to life, with a fine not less than ten lakh rupees.'],
  ['Is operating without a licence still a criminal offence?', 'The 2023 amendment changed Section 63 from imprisonment with fine to a penalty which may extend to ten lakh rupees. It remains a serious exposure, but the character of the liability changed.'],
  ['What happens when a Food Safety Officer takes a sample?', 'The sample is divided and dealt with in the prescribed manner, one part going to the Food Analyst. You are entitled to be present and to receive the prescribed documentation. What you do in the days after the report arrives matters more than anything you say at the inspection.'],
  ['What is the referral laboratory right?', 'If the Food Analyst report is adverse, the law allows the matter to be referred for analysis by a referral laboratory within the prescribed time. This is the single most valuable right a food business has, and it is the one most often lost by inaction.'],
  ['What if I miss the referral window?', 'You are generally left contesting the case on the Food Analyst report alone, which is considerably harder. Calendar the deadline the moment the report reaches you.'],
  ['What is an improvement notice?', 'Under Section 32, a Designated Officer may issue a notice requiring specified improvements within a stated period. Complying properly and on time often prevents the matter escalating to licence action.'],
  ['Can my licence be suspended?', 'Yes. Failure to comply with an improvement notice can lead to suspension, and in serious cases cancellation. There is an appeal route, and the timelines are short.'],
  ['What is a prohibition order?', 'Under Sections 33 and 34, a court or, in an emergency, a Designated Officer can restrain the use of premises, equipment or a process where there is a health risk. Emergency orders take effect immediately.'],
  ['Who decides penalties?', 'Adjudication of penalties is before the Adjudicating Officer under Section 68. Offences carrying imprisonment go to the criminal court, with prosecution launched under Section 42.'],
  ['Is there an appeal?', 'Yes — an appeal lies to the Food Safety Appellate Tribunal against an order of the Adjudicating Officer, within the prescribed period. The limitation is short and is frequently missed.'],
  ['Can offences be compounded?', 'Section 69 allows specified offences to be compounded. Offences relating to unsafe food are generally outside compounding, so this is not a route in the serious cases.'],
  ['Are directors personally liable?', 'Section 66 deals with offences by companies. Liability can extend to a person who was in charge of, and responsible to, the company for the conduct of its business — but it is not automatic from holding office, and a nominee may be formally designated. Role evidence is what decides this.'],
  ['What if a consumer alleges illness?', 'Handle the FSSAI dimension and the consumer dimension in parallel. Section 65 provides for compensation in cases of injury or death, and a consumer may also proceed under consumer law.'],
  ['Do I have to recall a batch?', 'Section 28 provides the recall framework. Where a product is unsafe, recall is an obligation rather than a reputational choice, and a documented recall is also strong evidence of responsible conduct.'],
  ['Can criminal law apply as well as the FSS Act?', 'BNS Sections 274 and 275 deal with adulteration of food or drink intended for sale and the sale of noxious food or drink. The FSS Act has overriding effect over inconsistent food laws under Section 89, but the criminal provisions can be relevant on appropriate facts.'],
  ['What is the difference between misbranded and sub-standard?', 'Misbranding concerns the label, claim or declaration being false or misleading. Sub-standard means the food fails to meet the prescribed standard without being unsafe. They carry different penalties and call for different defences.'],
  ['Can a labelling error really attract a penalty?', 'Yes. Misbranding under Section 52 attracts a penalty which may extend to three lakh rupees, and labelling errors are among the most common findings in inspections.'],
  ['What should I preserve after an inspection?', 'The inspection record, the sample documentation, batch and production records, supplier invoices and certificates of analysis, storage and temperature logs, the label artwork approved for that batch, and the distribution records for the batch.'],
  ['Should I reply to an FSSAI notice myself?', 'A reply drafted without reviewing the report, the batch records and the sampling procedure tends to concede things unnecessarily. The reply becomes part of the record, so it is worth getting right.'],
  ['What is the biggest mistake?', 'Treating the Food Analyst report as final and letting the referral window lapse, then trying to build a defence months later from records that were never organised.'],
  ['Can Estabizz appear before the court or tribunal?', 'We handle notice replies, report and sampling review, defence file preparation, recall documentation, adjudication and appeal support and regulator coordination. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Food Regulatory' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Food Adulteration' }]}
      title="Food Adulteration"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Food Adulteration"
      sections={sections}
      ctaTitle="Speak With a Food Regulatory Expert"
      ctaDescription="Sample report reviewed, referral window protected, and a defence file built from the batch records before the deadline passes."
      quickFacts={[
        { label: 'Main statute', value: 'FSS Act, 2006' },
        { label: 'Penalties revised', value: 'From 8 Nov 2023' },
        { label: 'Sub-standard food', value: 'Up to ₹10 lakh' },
        { label: 'Most valuable right', value: 'Referral laboratory' }
      ]}
      relatedArticles={[
        { title: 'Adulteration of Drugs', href: '/solutions/legal/adulteration-of-drugs-legal-services', category: 'Legal', description: 'Drug sample and lab report defence, licence risk and prosecution under the drugs framework.' },
        { title: 'Faulty Product Notice', href: '/solutions/legal/faulty-product-notice', category: 'Legal', description: 'Defective goods, product liability under the Consumer Protection Act and refund or replacement demands.' },
        { title: 'Complaints Before Consumer Court', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Consumer Protection Act, 2019 complaints — Commission, limitation, evidence and reliefs.' }
      ]}
      finalCtaTitle="The Referral Window Does Not Reopen"
      finalCtaDescription="Most food safety cases are decided by what the business did in the two weeks after the Food Analyst report arrived. Protect the referral right first; argue the merits afterwards."
      heroDescription={<p>A single adverse sample report can put a food business into licence risk, prosecution, recall and reputational damage at the same time. What determines the outcome is rarely the inspection itself — it is whether the referral laboratory right was protected, whether the batch records were organised, and whether the reply to the notice was drafted against the report or around it. Estabizz assists manufacturers, processors, restaurants, cloud kitchens, FMCG brands, dairy and spice businesses, importers, distributors, retailers and e-commerce sellers with FSSAI notice replies, sample and analyst report review, referral laboratory strategy, improvement notice compliance, licence suspension defence, prosecution and adjudication support, recall documentation, appeal coordination and preventive compliance.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> food safety law asks whether the food met the prescribed standard, whether it was safe, and whether it was described honestly.</p>
        <p>The old Prevention of Food Adulteration framework has been replaced by the Food Safety and Standards Act, 2006, which works through defined categories rather than a single notion of adulteration. That distinction is not academic: the category decides the penalty, the forum and the defence.</p>
        <p>For the drugs equivalent — a different statute and regulator entirely — see <Link href="/solutions/legal/adulteration-of-drugs-legal-services">Adulteration of Drugs</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Food adulteration is not a licence. It is a regulatory and, in serious cases, criminal exposure under the FSS Act, 2006.</p>
        <p>An FSSAI licence or registration is itself mandatory for a food business, depending on scale and activity. The allegation you face will fall into one of the statutory categories, and identifying which one is the first step in responding.</p>
      </Section>

      <Section id="categories" title="The Categories That Decide Everything">
        <div className="info-box" aria-label="Category matters">
          <p><strong>&ldquo;Adulteration&rdquo; is the everyday word, not the operative legal test.</strong> The FSS Act works through separate categories with very different consequences. A labelling error and a contaminated batch are both loosely called adulteration in conversation, but one is a misbranding penalty and the other can be imprisonment. The first thing to establish on any notice is which category is actually alleged.</p>
        </div>
        <DataTable headers={['Category', 'What it means', 'Provision']} rows={[
          ['Unsafe food', 'Food injurious to health, or rendered so by the prescribed factors', 'Section 59'],
          ['Sub-standard food', 'Fails the prescribed standard without being unsafe', 'Section 51'],
          ['Misbranded food', 'Label, claim or declaration is false or misleading', 'Section 52'],
          ['Food containing extraneous matter', 'Foreign matter present in the article', 'Section 54'],
          ['Not of the nature, substance or quality demanded', 'Food sold is not what the purchaser asked for', 'Section 50'],
          ['Unhygienic or unsanitary processing', 'Manufacture or processing in unsanitary conditions', 'Section 56'],
          ['Possessing an adulterant', 'Holding an adulterant, graded by whether it is injurious', 'Section 57'],
          ['Misleading advertisement', 'False claims about the product', 'Section 53'],
          ['Operating without licence', 'Carrying on a food business without licence or registration', 'Section 63']
        ]} />
      </Section>

      <Section id="penalties" title="Penalties as Revised in 2023">
        <div className="warning-box" aria-label="Jan Vishwas amendment">
          <p><strong>The penalty structure changed on 8 November 2023 and a great deal of published guidance has not caught up.</strong> The Jan Vishwas (Amendment of Provisions) Act, 2023 amended the FSS Act to rationalise penalties and decriminalise several contraventions. Some amounts went up substantially, and some offences that carried imprisonment now attract a monetary penalty instead. Anyone assessing exposure from pre-2023 material is working from the wrong numbers in both directions.</p>
        </div>
        <DataTable headers={['Contravention', 'Provision', 'Position']} rows={[
          ['Food not of the nature, substance or quality demanded', 'Section 50', 'Penalty which may extend to five lakh rupees'],
          ['Sub-standard food', 'Section 51', 'Penalty which may extend to ten lakh rupees, raised from five lakh'],
          ['Misbranded food', 'Section 52', 'Penalty which may extend to three lakh rupees, with corrective action'],
          ['Misleading advertisement', 'Section 53', 'Penalty which may extend to ten lakh rupees'],
          ['Food containing extraneous matter', 'Section 54', 'Penalty as prescribed for that contravention'],
          ['Unhygienic or unsanitary processing', 'Section 56', 'Penalty as prescribed for that contravention'],
          ['Possessing an adulterant', 'Section 57', 'Graded by whether the adulterant is injurious to health'],
          ['False information', 'Section 61', 'Now a penalty which may extend to ten lakh rupees'],
          ['Business without licence', 'Section 63', 'Now a penalty which may extend to ten lakh rupees, previously imprisonment with fine'],
          ['Unsafe food', 'Section 59', 'Remains criminal, graded by consequence — see below']
        ]} />
        <p>The direction of travel is consistent: monetary exposure up, imprisonment reserved for genuinely unsafe food. That is welcome for a compliant business facing a technical finding, and it is no comfort at all where the allegation is that someone was harmed.</p>
      </Section>

      <Section id="unsafe-food" title="Unsafe Food Under Section 59">
        <p>This is the provision that still carries imprisonment, and it is graded entirely by what the food did rather than by what the business intended.</p>
        <DataTable headers={['Consequence', 'Imprisonment', 'Fine']} rows={[
          ['Does not result in injury', 'Up to three months', 'Up to three lakh rupees'],
          ['Results in non-grievous injury', 'Up to one year', 'Up to three lakh rupees'],
          ['Results in grievous injury', 'Up to six years', 'Up to five lakh rupees'],
          ['Results in death', 'Not less than seven years, extending to imprisonment for life', 'Not less than ten lakh rupees']
        ]} />
        <div className="warning-box" aria-label="Death limb">
          <p><strong>The death limb carries a statutory minimum.</strong> Where unsafe food results in death, the sentence is not less than seven years and may extend to imprisonment for life, with a minimum fine of ten lakh rupees. There is no discretion below that floor. Any incident involving a consumer hospitalisation should be treated from the first hour as potentially falling within this provision, with evidence preserved accordingly.</p>
        </div>
      </Section>

      <Section id="sampling" title="Sampling and the Referral Laboratory">
        <p>Most enforcement begins with a sample. Understanding the sequence is what allows a business to protect itself, because the critical right is time-barred.</p>
        <DataTable headers={['Stage', 'What happens', 'What you should do']} rows={[
          ['Inspection and sampling', 'The Food Safety Officer takes a sample in the prescribed manner', 'Be present, note the procedure, keep your copy of the documentation'],
          ['Sample division and sealing', 'The sample is divided and sealed as prescribed', 'Check the seals, labels and batch identification are correct'],
          ['Analysis', 'One part goes to the Food Analyst', 'Begin assembling the batch file now, not later'],
          ['Food Analyst report', 'The report is issued and communicated', 'Diarise the referral deadline the day it arrives'],
          ['Referral laboratory', 'The matter may be referred for analysis by a referral laboratory within the prescribed time', 'Decide and act inside the window'],
          ['Referral report', 'The referral laboratory result supersedes in the manner the law provides', 'It becomes the central document'],
          ['Proceedings', 'Adjudication or prosecution follows', 'Defence built on the report, procedure and records']
        ]} />
        <div className="info-box" aria-label="Referral right">
          <p><strong>The referral laboratory right is the most valuable thing a food business has, and the most commonly wasted.</strong> An adverse Food Analyst report is not the end of the analysis — the law allows a referral for independent testing within a prescribed period. Businesses routinely spend that period drafting explanatory letters, and then find themselves contesting the case on a single report they never challenged. Protect the window first; write the letter afterwards.</p>
        </div>
      </Section>

      <Section id="first-48" title="When a Notice or Report Arrives">
        <DataTable headers={['Step', 'Action']} rows={[
          ['1', 'Diarise every deadline in the document, especially any referral or reply window'],
          ['2', 'Identify the category alleged — unsafe, sub-standard, misbranded or other'],
          ['3', 'Pull the batch file: production records, QC results and certificates of analysis'],
          ['4', 'Pull supplier records and incoming material test reports for that batch'],
          ['5', 'Retrieve the label artwork approved for that batch'],
          ['6', 'Retrieve storage, temperature and hygiene logs for the period'],
          ['7', 'Map distribution — where that batch went, and how much remains'],
          ['8', 'Preserve retained samples of the same batch, if held'],
          ['9', 'Assess whether recall obligations are triggered'],
          ['10', 'Decide on the referral laboratory before drafting any reply'],
          ['11', 'Draft the reply against the report, not around it'],
          ['12', 'Brief the responsible persons — do not let informal explanations go out']
        ]} />
      </Section>

      <Section id="notices" title="Improvement, Prohibition and Licence Action">
        <DataTable headers={['Instrument', 'Provision', 'Effect']} rows={[
          ['Improvement notice', 'Section 32', 'Requires specified improvements within a stated period'],
          ['Licence suspension', 'Following non-compliance', 'Business activity halted for the suspension period'],
          ['Licence cancellation', 'In serious or repeated cases', 'Requires fresh licensing to resume'],
          ['Prohibition order', 'Section 33', 'Court order restraining use of premises, equipment or process'],
          ['Emergency prohibition notice', 'Section 34', 'Immediate effect where there is a health risk'],
          ['Appeal against improvement notice', 'As provided', 'Short timelines — check the notice itself'],
          ['Powers of the Food Safety Officer', 'Section 38', 'Entry, inspection, sampling and seizure']
        ]} />
        <p>Comply with an improvement notice properly and on time, and document the compliance. A well-evidenced response at this stage is frequently what stops a matter becoming licence action or prosecution.</p>
      </Section>

      <Section id="adjudication" title="Adjudication, Prosecution and Appeal">
        <DataTable headers={['Route', 'Where it goes', 'Applies to']} rows={[
          ['Adjudication', 'Adjudicating Officer under Section 68', 'Contraventions attracting monetary penalty'],
          ['Prosecution', 'Criminal court, launched under Section 42', 'Offences carrying imprisonment, principally Section 59'],
          ['Compounding', 'Under Section 69', 'Specified offences only — generally not unsafe food'],
          ['Appeal from adjudication', 'Food Safety Appellate Tribunal under Section 70', 'Orders of the Adjudicating Officer'],
          ['Further challenge', 'High Court', 'As the law allows'],
          ['Compensation to consumers', 'Section 65', 'Injury or death caused by unsafe food']
        ]} />
        <div className="warning-box" aria-label="Appeal limitation">
          <p><strong>The appeal window to the Tribunal is short and is missed constantly.</strong> Businesses receive an adjudication order, circulate it internally for a view, and discover the period has run. Diarise the appeal deadline on the day the order is received, and decide within it even if the final decision is not to appeal.</p>
        </div>
      </Section>

      <Section id="company-liability" title="Company and Director Liability">
        <p>Section 66 deals with offences by companies. This is where personal exposure arises, and where careful evidence about roles genuinely changes outcomes.</p>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Who can be liable', 'The company, and persons in charge of and responsible to it for the conduct of its business'],
          ['Is it automatic from holding office', 'No — the statutory role test has to be satisfied on the facts'],
          ['Nominee', 'A person may be formally nominated to be responsible, in the prescribed manner'],
          ['Consent, connivance or neglect', 'A director or officer may be liable where the offence is attributable to these'],
          ['What helps a non-involved director', 'Evidence of delegation, the nominee arrangement and actual role'],
          ['What hurts', 'Absence of any documented allocation of food safety responsibility'],
          ['Practical step', 'Put the nomination and responsibility allocation in place before an incident, not after']
        ]} />
      </Section>

      <Section id="recall" title="Product Recall">
        <p>Section 28 provides the recall framework. Where food is unsafe, recall is a legal obligation, and a documented, prompt recall is also among the strongest evidence of responsible conduct a business can produce later.</p>
        <DataTable headers={['Element', 'What it requires']} rows={[
          ['A written recall plan', 'In place before it is needed'],
          ['Batch traceability', 'Ability to identify exactly what went where'],
          ['Distribution records', 'Customers, quantities and dates'],
          ['Decision record', 'Who decided to recall, on what information and when'],
          ['Customer and distributor communication', 'Clear, prompt and documented'],
          ['Regulator intimation', 'As the framework requires'],
          ['Retrieval and reconciliation', 'How much came back against how much went out'],
          ['Disposal record', 'Evidence of what happened to the recovered stock'],
          ['Root cause analysis', 'Why it happened and what changed'],
          ['Effectiveness review', 'Whether the recall actually worked']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Food Safety and Standards Act, 2006'],
          ['Principal amendment', 'Jan Vishwas (Amendment of Provisions) Act, 2023, effective 8 November 2023'],
          ['Central regulator', 'Food Safety and Standards Authority of India'],
          ['State enforcement', 'Commissioner of Food Safety, Designated Officer, Food Safety Officer, Food Analyst'],
          ['Rules', 'Food Safety and Standards Rules, 2011'],
          ['Product regulations', 'FSSAI regulations on standards, labelling, additives, contaminants and hygiene'],
          ['Adjudication and appeal', 'Adjudicating Officer and the Food Safety Appellate Tribunal'],
          ['Criminal law overlay', 'Bharatiya Nyaya Sanhita, 2023, Sections 274 and 275'],
          ['Procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Consumer dimension', 'Consumer Protection Act, 2019, including product liability'],
          ['Overriding effect', 'FSS Act Section 89 over inconsistent food-related laws']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['FSS Act Section 25', 'Restrictions on import of unsafe, misbranded or sub-standard food'],
          ['FSS Act Section 26', 'Responsibilities of the food business operator'],
          ['FSS Act Section 27', 'Liability of manufacturers, packers, wholesalers, distributors and sellers'],
          ['FSS Act Section 28', 'Food recall procedure'],
          ['FSS Act Section 31', 'Licensing and registration of food businesses'],
          ['FSS Act Section 32', 'Improvement notices'],
          ['FSS Act Sections 33 and 34', 'Prohibition orders and emergency prohibition'],
          ['FSS Act Section 38', 'Powers of the Food Safety Officer'],
          ['FSS Act Section 42', 'Procedure for launching prosecution'],
          ['FSS Act Section 47', 'Sampling and analysis'],
          ['FSS Act Sections 50 to 58', 'Penalties for the various contraventions'],
          ['FSS Act Section 59', 'Punishment for unsafe food, graded by consequence'],
          ['FSS Act Section 63', 'Business without licence — now a monetary penalty'],
          ['FSS Act Section 65', 'Compensation in case of injury or death'],
          ['FSS Act Section 66', 'Offences by companies'],
          ['FSS Act Section 68', 'Adjudication'],
          ['FSS Act Section 69', 'Compounding of specified offences'],
          ['FSS Act Section 70', 'Food Safety Appellate Tribunal'],
          ['FSS Act Section 89', 'Overriding effect over inconsistent food laws']
        ]} />
      </Section>

      <Section id="bns" title="The Criminal Law Overlay">
        <p>Alongside the FSS Act, the general criminal law contains its own food provisions, and they can be invoked on appropriate facts.</p>
        <DataTable headers={['Provision', 'Subject']} rows={[
          ['BNS Section 274', 'Adulteration of food or drink intended for sale'],
          ['BNS Section 275', 'Sale of noxious food or drink'],
          ['FSS Act Section 89', 'FSS Act has overriding effect over inconsistent food-related laws'],
          ['Practical position', 'Which framework is invoked depends on the facts and the authority proceeding']
        ]} />
        <p>Where an FIR is registered alongside regulatory action, both tracks need handling together and consistently — see <Link href="/solutions/legal/first-information-report">First Information Report</Link>.</p>
      </Section>

      <Section id="types" title="Matters We Handle">
        <DataTable headers={['Matter', 'Typical situation']} rows={[
          ['Adverse sample report', 'Food Analyst report shows non-compliance'],
          ['Unsafe food allegation', 'Product alleged to have caused illness or injury'],
          ['Sub-standard finding', 'Product fails a prescribed parameter'],
          ['Misbranding and labelling', 'Declaration, claim or artwork challenged'],
          ['Extraneous matter complaint', 'Foreign matter alleged in the product'],
          ['Hygiene and premises findings', 'Inspection observations on sanitary conditions'],
          ['Improvement notice', 'Compliance and response within the period'],
          ['Licence suspension or cancellation', 'Defence and restoration'],
          ['Prosecution under Section 59', 'Criminal defence and evidence'],
          ['Import consignment issues', 'Rejection or detention at the border'],
          ['Product recall', 'Planning, execution and documentation'],
          ['Director or nominee named', 'Role-based defence'],
          ['Consumer illness complaint', 'Parallel regulatory and consumer handling'],
          ['E-commerce listing action', 'Platform delisting alongside regulatory issues']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs This">
        <DataTable headers={['Business', 'Why']} rows={[
          ['Food manufacturers and processors', 'Batch control, standards and licence exposure'],
          ['Restaurants and hotels', 'Hygiene findings and consumer complaints'],
          ['Cloud kitchens', 'Licence scope, hygiene and platform risk'],
          ['FMCG and packaged food brands', 'Labelling, claims and recall exposure'],
          ['Dairy businesses', 'High contamination sensitivity'],
          ['Spice and condiment manufacturers', 'Adulterant, colour and purity scrutiny'],
          ['Importers and exporters', 'Consignment clearance and standards conformity'],
          ['Distributors and retailers', 'Seller liability for stock held and sold'],
          ['E-commerce food sellers', 'Platform obligations and traceability'],
          ['Caterers and institutional kitchens', 'Volume, storage and hygiene risk'],
          ['Warehouses and cold chain', 'Storage conditions and temperature records']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['FSSAI licence or registration', 'Scope and validity of the authorisation'],
          ['The notice, report or order received', 'The case you have to answer'],
          ['Food Analyst report', 'The central document in a sample matter'],
          ['Sampling documentation', 'Procedure and chain of custody review'],
          ['Batch production records', 'What was made, when and how'],
          ['Quality control and in-house test results', 'Contemporaneous evidence of compliance'],
          ['Supplier invoices and certificates of analysis', 'Incoming material quality'],
          ['Label artwork for the batch', 'Misbranding assessment'],
          ['Storage and temperature logs', 'Conditions during the relevant period'],
          ['Hygiene and pest control records', 'Premises condition'],
          ['Distribution and dispatch records', 'Traceability and recall scope'],
          ['Retained samples', 'Independent verification'],
          ['Recall records, if any', 'Evidence of responsible conduct'],
          ['Nomination and responsibility records', 'Section 66 defence'],
          ['Prior notices and inspection history', 'Pattern and context']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Urgent review', 'Deadlines identified, especially the referral window'],
          ['2', 'Category analysis', 'Which contravention is actually alleged'],
          ['3', 'Report and sampling review', 'Analyst report and procedural compliance'],
          ['4', 'Referral decision', 'Whether and how to refer, inside the window'],
          ['5', 'Batch file assembly', 'Production, QC, supplier and storage records'],
          ['6', 'Label and claims review', 'Misbranding exposure'],
          ['7', 'Recall assessment', 'Whether obligations are triggered'],
          ['8', 'Reply drafting', 'Against the report, with annexures'],
          ['9', 'Licence risk strategy', 'Improvement compliance and suspension defence'],
          ['10', 'Adjudication or prosecution support', 'Defence file and counsel briefing'],
          ['11', 'Appeal coordination', 'Tribunal appeal within the limitation'],
          ['12', 'Preventive remediation', 'Closing the gap the incident exposed']
        ]} />
      </Section>

      <Section id="defence" title="Building the Defence File">
        <DataTable headers={['Line of defence', 'What supports it']} rows={[
          ['The product met the standard', 'Referral laboratory result and in-house QC data'],
          ['Sampling procedure was defective', 'Sampling documentation, seals and chain of custody'],
          ['The sample was not representative', 'Batch records and retained sample results'],
          ['Storage conditions were the cause', 'Distribution and temperature records post-dispatch'],
          ['Supplier material was at fault', 'Incoming certificates of analysis and supplier contracts'],
          ['Label complied with the regulation applicable then', 'Approved artwork and the version history'],
          ['Prompt recall and corrective action', 'Recall file and root cause analysis'],
          ['Individual had no responsible role', 'Nomination records and actual delegation evidence'],
          ['Systems were in place and followed', 'Audit reports, training records and SOPs']
        ]} />
      </Section>

      <Section id="prevention" title="Preventive Compliance">
        <p>Nearly every defence above depends on records that must already exist. The cheapest time to build them is before an inspection.</p>
        <DataTable headers={['Control', 'Why it matters later']} rows={[
          ['Licence scope matched to actual activity', 'Operating outside scope is its own contravention'],
          ['Batch-wise production and QC records', 'The backbone of any sample defence'],
          ['Supplier approval and incoming testing', 'Shifts the analysis where material was at fault'],
          ['Retained samples, properly stored', 'Independent verification later'],
          ['Label review before artwork release', 'Misbranding is the most avoidable finding'],
          ['Temperature and storage logging', 'Distinguishes manufacturing from handling failures'],
          ['Documented hygiene and pest control', 'Answers premises findings'],
          ['A written recall plan, tested', 'Recall under pressure without one goes badly'],
          ['Nomination under Section 66', 'Clarifies personal exposure in advance'],
          ['Training records', 'Evidence of a functioning system'],
          ['Periodic internal audit', 'Finds the gap before an inspector does']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Businesses Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Letting the referral window lapse', 'Case contested on one unchallenged report', 'Deadline diarised on day one'],
          ['Using pre-2023 penalty figures', 'Exposure misjudged in both directions', 'Current position after the Jan Vishwas amendment'],
          ['Replying before reading the batch file', 'Unnecessary concessions on the record', 'Records reviewed before drafting'],
          ['Informal explanations to the inspector', 'Statements that resurface later', 'Single documented channel of response'],
          ['Treating misbranding as trivial', 'Avoidable penalty and corrective action', 'Label review as a standing control'],
          ['No batch traceability', 'Recall scope cannot be defined', 'Traceability built into production records'],
          ['Ignoring an improvement notice deadline', 'Escalation to licence action', 'Compliance evidenced within the period'],
          ['Missing the Tribunal appeal window', 'A defensible order becomes final', 'Appeal deadline calendared on receipt'],
          ['No nomination under Section 66', 'Directors exposed personally by default', 'Nomination and role allocation documented'],
          ['Recall handled informally', 'Loss of the best evidence of responsible conduct', 'Documented recall against a written plan']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Urgent notice review', 'Deadlines, category and immediate exposure'],
          ['Analyst report review', 'Parameters, methodology and procedural compliance'],
          ['Referral laboratory strategy', 'Decision and execution within the window'],
          ['Sampling procedure review', 'Seals, division and chain of custody'],
          ['Notice reply drafting', 'Evidence-backed response with annexures'],
          ['Batch defence file', 'Production, QC, supplier and storage records assembled'],
          ['Label and claims review', 'Misbranding and advertising exposure'],
          ['Improvement notice compliance', 'Documented, within the period'],
          ['Licence suspension defence', 'Representation and restoration strategy'],
          ['Prosecution defence support', 'Section 59 matters and evidence'],
          ['Adjudication support', 'Before the Adjudicating Officer'],
          ['Appeal coordination', 'Food Safety Appellate Tribunal'],
          ['Product recall support', 'Plan, execution and documentation'],
          ['Company and nominee advisory', 'Section 66 exposure and allocation'],
          ['Consumer claim coordination', 'Where a consumer complaint runs in parallel'],
          ['Preventive compliance review', 'Closing gaps before the next inspection']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Food safety cases are won or lost on records that had to exist before the inspector arrived, and on a referral deadline that does not reopen. The businesses that come through these matters well are the ones that protected the referral right in the first week, produced a complete batch file, and answered the report on its own terms instead of writing a letter about how seriously they take quality.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not business-specific legal or technical advice. Which category applies, what penalty follows, what procedural rights are available and within what period all depend on the facts, the product, the State enforcement practice and the current regulations. Penalty positions stated here reflect the FSS Act as amended by the Jan Vishwas (Amendment of Provisions) Act, 2023 with effect from 8 November 2023, stated as at October 2026; amounts and provisions change, and prescribed periods should be confirmed from the notice and the current rules rather than from this page. Parts of this guide remain under professional review. Estabizz provides regulatory review, documentation, drafting and coordination support; laboratory testing is performed by accredited laboratories and appearance is through enrolled advocates. Confirm the current position before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
