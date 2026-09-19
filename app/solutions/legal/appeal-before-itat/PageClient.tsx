'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'filing-form', title: 'Which Form Applies Now' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Sections' },
  { id: 'orders-appealed', title: 'Orders Commonly Appealed' },
  { id: 'who-can-file', title: 'Who Can File' },
  { id: 'process', title: 'Appeal Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'timeline', title: 'Filing Timeline' },
  { id: 'fees', title: 'Appeal Fees' },
  { id: 'grounds-and-paperbook', title: 'Grounds and Paper Book' },
  { id: 'stay-of-demand', title: 'Stay of Demand' },
  { id: 'cross-objection', title: 'Cross-Objection' },
  { id: 'vs-cita', title: 'ITAT vs First Appeal' },
  { id: 'vs-highcourt', title: 'ITAT vs High Court Appeal' },
  { id: 'risks', title: 'Risks of Filing Poorly' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is Appeal Before ITAT?', 'A statutory income-tax appeal filed before the Income Tax Appellate Tribunal against specified orders passed by lower appellate or revisionary authorities.'],
  ['Is it a licence?', 'No. It is a statutory tax appeal remedy, not a licence or registration.'],
  ['Which form is used to file?', 'This is in transition. Form 36 is the form under the Income-tax Act, 1961 framework. Form 115 is prescribed as the form of appeal to the Tribunal under the Income-tax Act, 2025 framework. Confirm which applies to your assessment year and filing date before you file.'],
  ['Is physical filing still allowed?', 'No. Under the Income-tax (Appellate Tribunal) Amendment Rules, 2025, notified 3 January 2026, appeals and applications before ITAT are filed exclusively through the e-filing portal with a Digital Signature Certificate. A filing without DSC authentication is treated as defective.'],
  ['What is the time limit?', 'Generally 60 days from communication of the order under the 1961 Act framework. Confirm the limit that applies to your filing, since the position differs under the 2025 Act framework.'],
  ['Can delay be condoned?', 'Yes, where sufficient cause is shown. The reason should be genuine, documented and supported.'],
  ['Is ITAT the final authority on facts?', 'ITAT is generally the final fact-finding authority in income-tax disputes. A further appeal to the High Court lies only on a substantial question of law.'],
  ['What is a cross-objection?', 'Where the opposite party has filed an appeal and the respondent also wants to challenge part of the order, a cross-objection may be filed. Under the 1961 Act framework this is generally within 30 days of receiving notice of the appeal.'],
  ['What is a paper book?', 'An indexed file of the documents relied on before the Tribunal. It has to be organised and certified carefully, as Bench practice on indexing is strict.'],
  ['Can I file additional evidence?', 'Not as a matter of right. ITAT may allow additional evidence in suitable cases under Tribunal procedure.'],
  ['What is a stay application?', 'Where tax demand recovery is active during the appeal, a stay application may be filed to protect against recovery, subject to statutory conditions.'],
  ['What orders can be appealed?', 'Commonly CIT(A), JCIT(A) or NFAC orders, penalty orders, Section 263 revision orders, transfer pricing adjustments, reassessment and search assessment orders, and TDS or TCS demands.'],
  ['Who signs the appeal for a company?', 'The Managing Director, a Director, or another authorised signatory, depending on the entity and the authorisation in place.'],
  ['Can an NRI file?', 'Yes, through an authorised representative or the appropriate digital or power-of-attorney route.'],
  ['Can the Department appeal?', 'Yes, subject to statutory direction and the monetary-limit policy in force.'],
  ['Who can represent me before ITAT?', 'An authorised representative as permitted by law — commonly an advocate, chartered accountant or other authorised person.'],
  ['What are the appeal fees?', 'Under the 1961 Act framework, fees are slabbed by assessed income, with separate fees for stay and rectification applications. See the fees table above and confirm the current schedule before paying.'],
  ['Can an ITAT order be rectified?', 'Yes, for a mistake apparent from the record, within the statutory period.'],
  ['What happens after the ITAT order?', 'A further appeal lies to the High Court, but only on a substantial question of law.'],
  ['Does the Income-tax Act, 2025 change this?', 'Yes. The 2025 Act takes effect from 1 April 2026 and applies from tax year 2026-27. Appeals relating to earlier years generally continue under the 1961 framework, but procedure applying at the date of filing must still be followed.'],
  ['What is the biggest mistake?', 'Filing casually — imprecise grounds, unreconciled facts, a poorly indexed paper book, or missing the limitation date.'],
  ['Can Estabizz appear before the Tribunal?', 'We provide order review, drafting, paper book compilation, research and hearing coordination. Appearance is handled by an authorised representative as the law permits.'],
  ['Is a stay automatic once the appeal is filed?', 'No. Filing an appeal does not by itself stay recovery. A separate application is required.'],
  ['How long does an ITAT appeal take?', 'It varies by Bench, pendency and the nature of the issue. Timelines should be assessed case by case rather than assumed.'],
  ['Should the grounds be broad or narrow?', 'Grounds should be concise and specific, but framed broadly enough to protect the issue. Over-narrow grounds can foreclose arguments later.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Tax Litigation' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Appeal Before ITAT' }]}
      title="Appeal Before ITAT"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Appeal Before ITAT"
      sections={sections}
      ctaTitle="Speak With a Tax Litigation Expert"
      ctaDescription="Discuss appealability, limitation, grounds of appeal, stay of demand and paper book preparation with the Estabizz team."
      quickFacts={[{ label: 'Forum', value: 'Income Tax Appellate Tribunal' }, { label: 'Stage', value: 'Second appeal' }, { label: 'Filing mode', value: 'E-filing with DSC only' }, { label: 'Next remedy', value: 'High Court, on a question of law' }]}
      relatedArticles={[
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company-law and insolvency matters before the National Company Law Tribunal.' },
        { title: 'GST Appeal Services India', href: '/services/gst-appeal-services', category: 'Compliance', description: 'Section 107 appeals, pre-deposit, grounds of appeal and GST litigation strategy.' },
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals, suspension of sentence and bail pending appeal under BNS, BNSS and BSA.' }
      ]}
      finalCtaTitle="Protect the Demand Before the Limitation Runs"
      finalCtaDescription="An adverse appellate order can create tax demand, interest, penalty exposure and cash-flow pressure. A short discussion helps you assess appealability, limitation and stay strategy."
      heroDescription={<p>An adverse CIT(A), JCIT(A), NFAC, revision or penalty order can create serious tax demand, interest, penalty exposure and cash-flow pressure. ITAT is generally the final fact-finding authority in income-tax disputes, which makes the record built at this stage decisive. Estabizz assists with order review, limitation check, appeal form preparation, grounds of appeal, paper book compilation, stay applications, cross-objections, written submissions and hearing coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> an appeal before ITAT challenges an adverse income-tax appellate or revision order before the Income Tax Appellate Tribunal. It is generally filed after the first appeal stage, where the taxpayer is not satisfied with the order of the CIT(A), JCIT(A), NFAC or other specified authority.</p>
        <p>ITAT is generally the final fact-finding authority in income-tax disputes. A well-drafted appeal can challenge additions, disallowances, penalties, reopening issues, transfer pricing adjustments, unexplained income, bogus purchase allegations, cash deposit disputes, capital gains issues, exemption denials and trust registration matters.</p>
        <p><strong>From a compliance perspective…</strong> the appeal requires limitation calculation, appealability review, the correct appeal form, fee challan, certified order copy, grounds of appeal, a legal paper book, evidence review, a stay application where recovery is active, cross-objection strategy where the Department appeals, and hearing-ready written submissions.</p>
        <p>An ITAT appeal should not be filed casually. Grounds must be precise, facts reconciled, evidence properly indexed, and legal arguments supported with statutory provisions and case law.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Appeal Before ITAT is not a licence. It is a statutory tax appeal remedy before the Income Tax Appellate Tribunal, governed by the Income-tax Act framework, the Income-tax Rules and ITAT procedure.</p>
        <p>It is not required in every tax dispute. It becomes necessary when a taxpayer wants to challenge an appealable adverse order before the second appellate authority.</p>
      </Section>

      <Section id="filing-form" title="Which Form Applies Now">
        <div className="warning-box" aria-label="Transitional position">
          <p><strong>Confirm the form and filing mode before you file.</strong> Two changes are in play at once, and getting either wrong can make a filing defective.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Form under the Income-tax Act, 1961 framework', 'Form 36, with cross-objection in Form 36A'],
          ['Form under the Income-tax Act, 2025 framework', 'Form 115 is prescribed as the form of appeal to the Tribunal'],
          ['When the 2025 Act applies', 'Effective 1 April 2026, applying from tax year 2026-27'],
          ['Appeals for earlier years', 'Generally continue under the 1961 Act framework on substantive law'],
          ['Filing mode from 3 January 2026', 'E-filing through the ITAT portal with a Digital Signature Certificate is the only valid mode'],
          ['Physical filing after that date', 'Not valid; a filing without DSC authentication is treated as defective'],
          ['Appeals filed before 3 January 2026', 'Continue to be governed by the earlier procedure']
        ]} />
        <p>Procedure generally applies as at the date of filing, even where the substantive law for the assessment year is the 1961 Act. That combination is what makes this stage error-prone, so the form, the mode and the limitation should all be confirmed together for your specific matter.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main appellate forum', 'Income Tax Appellate Tribunal'],
          ['Appellate hierarchy', 'AO → JCIT(A) / CIT(A) → ITAT → High Court → Supreme Court'],
          ['Governing law for earlier tax years', 'Income-tax Act, 1961'],
          ['New law transition', 'Income-tax Act, 2025, effective 1 April 2026'],
          ['Transitional position', 'Appeals for earlier years generally continue under the 1961 Act framework'],
          ['Main appeal provision, 1961 Act', 'Section 253'],
          ['ITAT order provision, 1961 Act', 'Section 254'],
          ['ITAT constitution', 'Section 252'],
          ['Bench and procedure', 'Section 255'],
          ['Authorised representative', 'Section 288'],
          ['High Court appeal after ITAT', 'Section 260A'],
          ['Tribunal rules', 'Income-tax (Appellate Tribunal) Rules, as amended in 2025']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Sections">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['s. 252', 'Constitution of the Appellate Tribunal'],
          ['s. 253', 'Appeal to ITAT'],
          ['s. 253(1)', 'Assessee appeal against specified orders'],
          ['s. 253(2)', 'Departmental appeal direction'],
          ['s. 253(3)', 'Time limit for appeal, generally 60 days'],
          ['s. 253(4)', 'Cross-objection, generally within 30 days'],
          ['s. 253(5)', 'Condonation of delay where sufficient cause exists'],
          ['s. 253(6)', 'Appeal form, verification and appeal fee'],
          ['s. 254(1)', 'Tribunal power to pass orders after hearing the parties'],
          ['s. 254(2)', 'Rectification of a mistake apparent from the record'],
          ['s. 254(2A)', 'Stay of demand and disposal timeline framework'],
          ['s. 254(4)', 'Finality of the ITAT order, subject to further appeal provisions'],
          ['s. 255', 'Procedure of the Appellate Tribunal'],
          ['s. 260A', 'Appeal to the High Court on a substantial question of law']
        ]} />
        <p>Section references above are to the Income-tax Act, 1961. The corresponding provisions under the Income-tax Act, 2025 are renumbered, so confirm the correct citation for the year and filing date in question.</p>
      </Section>

      <Section id="orders-appealed" title="Orders Commonly Appealed">
        <DataTable headers={['Order type', 'Why an appeal may be filed']} rows={[
          ['CIT(A) or NFAC order', 'Addition or disallowance confirmed'],
          ['JCIT(A) order', 'First appellate relief denied or only partly allowed'],
          ['Penalty order', 'Penalty sustained under income-tax provisions'],
          ['Section 263 revision order', 'PCIT or CIT revises the assessment as erroneous and prejudicial'],
          ['Section 154 rectification order', 'Rectification rejected or an adverse modification made'],
          ['Exemption or registration denial', 'Trust or institution-related order challenged'],
          ['Transfer pricing', 'TP adjustment confirmed'],
          ['Reassessment', 'Reopening-related issues sustained'],
          ['Search assessment', 'Addition under the search or reassessment framework sustained'],
          ['TDS or TCS', 'Demand, default or disallowance confirmed'],
          ['Capital gains', 'Valuation, exemption or cost dispute sustained'],
          ['Unexplained cash or investment', 'Addition sustained under unexplained income provisions'],
          ['Business expense disallowance', 'Expense or deduction denied']
        ]} />
      </Section>

      <Section id="who-can-file" title="Who Can File">
        <DataTable headers={['Person or entity', 'Practical position']} rows={[
          ['Individual taxpayer', 'May appeal against a specified adverse order'],
          ['HUF', 'Karta or authorised person may sign'],
          ['Company', 'Managing Director, Director or authorised signatory may sign'],
          ['LLP', 'Designated Partner or authorised partner may sign'],
          ['Partnership firm', 'Managing partner or authorised partner may sign'],
          ['Trust or society', 'Trustee or authorised officer may act'],
          ['NRI', 'May file through an authorised representative or the appropriate digital or POA route'],
          ['Local authority', 'Principal officer or authorised person'],
          ['Department', 'May appeal as per statutory direction and the monetary-limit policy'],
          ['Respondent in a Department appeal', 'May file a cross-objection where required']
        ]} />
      </Section>

      <Section id="process" title="Appeal Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Order, demand and limitation review'],
          ['2', 'Appealability check', 'Confirm the ITAT remedy is available'],
          ['3', 'Limitation calculation', 'Deadline and condonation risk review'],
          ['4', 'Order analysis', 'Identify factual, legal and procedural errors'],
          ['5', 'Grounds drafting', 'Precise grounds of appeal'],
          ['6', 'Appeal form preparation', 'Correct form, verification and DSC readiness'],
          ['7', 'Fee challan', 'Appeal fee payment'],
          ['8', 'Filing', 'E-filing with required attachments'],
          ['9', 'Stay application, if needed', 'Demand recovery protection request'],
          ['10', 'Paper book preparation', 'Indexed and certified document compilation'],
          ['11', 'Written submissions', 'Legal arguments and case-law support'],
          ['12', 'Hearing coordination', 'Tribunal hearing preparation and appearance support'],
          ['13', 'Order follow-up', 'ITAT order tracking and next steps']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document or information', 'Purpose']} rows={[
          ['CIT(A), JCIT(A) or NFAC order', 'The main order appealed against'],
          ['Assessment order', 'Background and original addition'],
          ['Notice of demand', 'Demand and recovery risk review'],
          ['Computation of income', 'Tax calculation and disputed amount'],
          ['Return of income', 'Income declared by the taxpayer'],
          ['First appeal form and statement of facts', 'First appeal record'],
          ['Grounds before CIT(A)', 'Continuity and issue tracking'],
          ['Written submissions before CIT(A)', 'Earlier arguments and evidence'],
          ['Evidence filed before the lower authority', 'Paper book preparation'],
          ['Additional evidence, if any', 'Additional evidence strategy review'],
          ['Remand report, if any', 'Department response review'],
          ['Rejoinder, if any', 'Taxpayer reply review'],
          ['Penalty order, if applicable', 'Penalty appeal basis']
        ]} />
      </Section>

      <Section id="timeline" title="Filing Timeline">
        <DataTable headers={['Item', 'Position']} rows={[
          ['Appeal filing', 'Generally within 60 days from communication of the order under the 1961 Act framework'],
          ['Cross-objection', 'Generally within 30 days from receipt of notice of appeal'],
          ['Delay condonation', 'Possible where sufficient cause is shown'],
          ['Stay application', 'Filed where demand recovery protection is required'],
          ['Paper book', 'Filed as per Tribunal Rules and Bench practice'],
          ['Rectification application', 'For a mistake apparent from the record, within the statutory period'],
          ['High Court appeal', 'Lies only on a substantial question of law']
        ]} />
        <p>Confirm the limitation applying to your filing date, as the position under the Income-tax Act, 2025 framework differs from the 1961 Act.</p>
      </Section>

      <Section id="fees" title="Appeal Fees">
        <DataTable headers={['Case type', 'Fee under the 1961 Act framework']} rows={[
          ['Assessed income up to ₹1,00,000', '₹500'],
          ['Assessed income above ₹1,00,000 and up to ₹2,00,000', '₹1,500'],
          ['Assessed income above ₹2,00,000', '1% of assessed income, subject to a maximum of ₹10,000'],
          ['Other subject-matter appeal', '₹500'],
          ['Stay application', '₹500'],
          ['Rectification application', '₹50'],
          ['Department appeal or cross-objection', 'Nil, where applicable']
        ]} />
        <p>Confirm the current fee schedule before paying, particularly for filings under the 2025 Act framework.</p>
      </Section>

      <Section id="grounds-and-paperbook" title="Grounds and Paper Book">
        <p>Grounds of appeal are the backbone of the case. They should be concise, specific and legally correct, but framed broadly enough to protect the issue — over-narrow grounds can foreclose arguments at the hearing.</p>
        <p>A paper book is an indexed file of the documents relied on before the Tribunal. Bench practice on indexing and certification is strict, and a disorganised compilation costs credibility at exactly the stage where the factual record is being settled.</p>
      </Section>

      <Section id="stay-of-demand" title="Stay of Demand">
        <p>Filing an appeal does not by itself stop recovery. Where tax demand is active during the appeal, a separate stay application may be required, subject to the statutory conditions in the stay framework.</p>
      </Section>

      <Section id="cross-objection" title="Cross-Objection">
        <p>A cross-objection is filed where the opposite party has appealed and the respondent also wants to challenge part of the order. Under the 1961 Act framework it is generally filed within 30 days of receiving notice of the appeal, and no fee applies in the usual case.</p>
        <p>ITAT is generally not a forum for fresh evidence as of right, though additional evidence may be allowed in suitable cases under Tribunal procedure.</p>
      </Section>

      <Section id="vs-cita" title="ITAT vs First Appeal">
        <DataTable headers={['Point', 'CIT(A) / JCIT(A) appeal', 'Appeal before ITAT']} rows={[
          ['Stage', 'First appeal', 'Second appeal'],
          ['Forum', 'CIT(A), JCIT(A) or NFAC', 'Income Tax Appellate Tribunal'],
          ['Nature', 'Fact and law review', 'Final fact-finding and legal review'],
          ['Evidence', 'Wider factual development possible', 'Additional evidence only in suitable cases'],
          ['Hearing', 'Faceless or authority-based', 'Tribunal Bench hearing'],
          ['Next remedy', 'ITAT', 'High Court, on a substantial question of law'],
          ['Strategy', 'Build the first appeal record', 'Correct errors and strengthen legal grounds']
        ]} />
      </Section>

      <Section id="vs-highcourt" title="ITAT vs High Court Appeal">
        <DataTable headers={['Point', 'ITAT appeal', 'High Court appeal']} rows={[
          ['Main issue type', 'Facts and law', 'Substantial question of law'],
          ['Evidence', 'Tribunal reviews the record and evidence', 'Usually no fresh factual enquiry'],
          ['Legal provision, 1961 Act', 'Sections 253 and 254', 'Section 260A'],
          ['Importance', 'Final fact-finding stage', 'Legal question stage'],
          ['Best strategy', 'Build a complete factual record', 'Frame the substantial legal question']
        ]} />
        <p>Because the High Court will not usually reopen facts, the factual record built at the Tribunal is what a later appeal has to live with.</p>
      </Section>

      <Section id="risks" title="Risks of Filing Poorly">
        <DataTable headers={['Risk', 'Consequence']} rows={[
          ['Missing the limitation date', 'Appeal may not be admitted without condonation'],
          ['Filing without DSC after 3 January 2026', 'Filing treated as defective'],
          ['Using the wrong appeal form', 'Defect notice and delay, with limitation risk'],
          ['Imprecise grounds', 'Issues may be treated as not raised'],
          ['Unreconciled facts', 'Credibility loss at the fact-finding stage'],
          ['No stay application', 'Recovery may continue during the appeal'],
          ['Poorly indexed paper book', 'Documents may not be considered effectively'],
          ['No cross-objection where needed', 'Part of the order goes unchallenged']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Order review', 'Analyse the appellate or revision order and identify errors'],
          ['Appealability and limitation check', 'Confirm the remedy and calculate the deadline'],
          ['Appeal form preparation', 'Correct form, verification and DSC readiness'],
          ['Grounds of appeal', 'Draft precise, issue-protective grounds'],
          ['Statement of facts review', 'Reconcile the factual narrative across stages'],
          ['Paper book compilation', 'Indexed and certified document set'],
          ['Stay application', 'Demand recovery protection strategy'],
          ['Cross-objection', 'Strategy where the Department has appealed'],
          ['Written submissions', 'Legal arguments with case-law support'],
          ['Case-law research', 'Issue-wise research for the hearing'],
          ['Hearing coordination', 'Bench preparation and representative briefing'],
          ['Post-order follow-up', 'Order tracking, rectification or next appeal assessment']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“ITAT is the last stage at which facts can genuinely be settled. An appeal that reconciles the record, indexes its evidence properly and frames grounds that protect the issue is worth far more later than one filed quickly to meet a date.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific tax advice. Income-tax appeal procedure is currently in transition between the Income-tax Act, 1961 and the Income-tax Act, 2025, and the appeal form, limitation and fees depend on the assessment year and the date of filing. Parts of this guide are still undergoing professional review. Confirm the current position with the Tribunal, the Income Tax Department and your professional adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
