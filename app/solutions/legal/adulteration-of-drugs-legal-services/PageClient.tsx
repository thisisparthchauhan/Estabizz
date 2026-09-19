'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'legal-provisions', title: 'Important Legal Provisions' },
  { id: 'categories', title: 'Adulterated vs Spurious vs Misbranded' },
  { id: 'matter-types', title: 'Types of Matters We Handle' },
  { id: 'who-needs', title: 'Who Needs Legal Support' },
  { id: 'when-to-act', title: 'When to Take Legal Help' },
  { id: 'services', title: 'Our Legal Services' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'common-issues', title: 'Issues We Commonly Fix' },
  { id: 'process', title: 'Our Legal Process' },
  { id: 'sample-defence', title: 'Drug Sample and Lab Report Defence' },
  { id: 'licence-risk', title: 'Licence Risk' },
  { id: 'bns-mapping', title: 'BNS Offence Mapping' },
  { id: 'defence-support', title: 'Defence Support for Pharma Businesses' },
  { id: 'preventive-checklist', title: 'Preventive Compliance Checklist' },
  { id: 'why-estabizz', title: 'Why Estabizz Fintech' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is Adulteration of Drugs?', 'A drug or medical preparation that has been contaminated, altered, weakened, mixed or handled in a manner that affects its efficacy, safety, strength or intended medicinal use.'],
  ['Which law governs Adulteration of Drugs in India?', 'The main regulatory law is the Drugs and Cosmetics Act, 1940. BNS Sections 276, 277 and 278 may also apply depending on the facts.'],
  ['Is Adulteration of Drugs a licence?', 'No. It is a legal and regulatory violation, not a licence. Drug manufacture, sale, stock, distribution and import do generally require proper licence or approval.'],
  ['Who regulates drug adulteration matters?', 'CDSCO and the State Drug Control Departments regulate drug quality, licensing, inspection and enforcement, depending on the product and activity.'],
  ['Which BNS section applies to drug adulteration?', 'BNS Section 276 deals with adulteration of drugs. Sections 277 and 278 may become relevant for sale of adulterated drugs, or sale of one drug as another.'],
  ['Is BNSS relevant in these matters?', 'Yes, where prosecution, summons, bail, complaint, investigation or criminal court procedure is involved.'],
  ['Is BSA relevant?', 'Yes, where lab reports, electronic records, emails, ERP data, e-invoices, digital batch records or online listings are relied upon.'],
  ['What is an adulterated drug under regulatory law?', 'A drug may be treated as adulterated where it is contaminated, harmful, prepared or stored in insanitary conditions, contains harmful substances, or is mixed in a manner reducing quality or strength.'],
  ['What is the difference between adulterated and spurious drugs?', 'Adulterated drugs generally involve contamination, unsafe composition or reduced quality. Spurious drugs involve fake identity, imitation, false representation or counterfeit-like issues.'],
  ['What should I do after receiving a Drug Control notice?', 'Do not send a casual reply. Collect the notice, inspection report, sample memo, lab report, licence, batch records and QC records, and take expert advice quickly.'],
  ['What if the drug sample report is wrong?', 'The sample report, testing method, sampling procedure, seal, chain of custody and referral options should all be reviewed carefully.'],
  ['Can drugs be seized by inspectors?', 'Yes. Drug Inspectors have statutory powers to inspect, take samples and seize drugs or records as provided by the applicable law.'],
  ['Can a drug licence be suspended?', 'Yes. In serious cases suspension or cancellation may be considered by the authority, depending on the facts and the procedure followed.'],
  ['Can a director be personally liable?', 'In company matters responsible persons may face exposure depending on role, control, knowledge, due diligence and statutory responsibility.'],
  ['Can distributors or retailers be liable?', 'Yes, where stock source, invoices, storage, sale records or knowledge of the defect become relevant.'],
  ['Can product recall help?', 'A properly documented recall may help demonstrate responsible corrective action and reduce public health risk.'],
  ['Can these cases be compounded?', 'Certain offences may be compoundable under the Drugs and Cosmetics framework, but serious offences may not be. Each case requires legal assessment.'],
  ['What documents are required for defence?', 'Notice, inspection report, sample memo, lab report, licence, batch records, QC records, supplier invoices, distribution records and digital records are generally useful.'],
  ['Can online pharmacies face action?', 'Yes. Online sale of medicines can create licence, prescription, product source, storage, authenticity and digital evidence issues.'],
  ['What is the biggest mistake in these matters?', 'Replying without reviewing the lab report, sample procedure, batch documents, licence scope and the specific allegation.'],
  ['Can Estabizz help with preventive compliance?', 'Yes — licence review, SOPs, recall documentation, batch record checklists, quality documentation and inspection preparedness.'],
  ['Can storage failure create adulteration risk?', 'Yes. Improper temperature, humidity or cold-chain failure can affect drug quality and may create regulatory exposure.'],
  ['Can BSA help with digital evidence?', 'Yes. BSA supports electronic records such as ERP logs, emails, e-invoices, online listings, CCTV, digital batch records and electronic communications.'],
  ['How urgent is Drug Control notice handling?', 'Highly urgent. Reply timelines, sample challenge options, recall decisions, licence risk and prosecution exposure all have to be managed quickly.'],
  ['Can Estabizz appear before court?', 'No. Estabizz supports legal research, drafting, documentation and compliance coordination. Court appearance is handled through enrolled advocates where required.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Drug Regulatory' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Adulteration of Drugs' }]}
      title="Adulteration of Drugs Legal Services in India"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Adulteration of Drugs"
      sections={sections}
      ctaTitle="Speak With a Drug Regulatory Expert"
      ctaDescription="Discuss a CDSCO or State Drug Control notice, a failed sample, seizure, recall or licence risk with the Estabizz team."
      quickFacts={[{ label: 'Main law', value: 'Drugs and Cosmetics Act, 1940' }, { label: 'Central regulator', value: 'CDSCO' }, { label: 'Criminal law', value: 'BNS ss. 276, 277, 278' }, { label: 'Nature', value: 'Offence, not a licence' }]}
      relatedArticles={[
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals, suspension of sentence and bail pending appeal under BNS, BNSS and BSA.' },
        { title: 'Legal Due Diligence Services in India', href: '/services/legal-due-diligence', category: 'Compliance', description: 'Legal audit of a business before investment or acquisition, including litigation and regulatory exposure.' }
      ]}
      finalCtaTitle="Do Not Wait for Notice to Become Prosecution"
      finalCtaDescription="A drug adulteration allegation can affect your licence, recall, market supply, management liability and brand. A short discussion today helps you preserve documents and prepare a structured response."
      heroDescription={<p>Drug quality allegations are sensitive because they involve public health, regulatory scrutiny, licence risk, seizure, recall, prosecution and brand credibility. Estabizz assists pharmaceutical manufacturers, importers, distributors, pharmacies, hospitals, medical device and cosmetic businesses with drug sample failure, CDSCO and State Drug Control notices, recall support, lab report review, licence risk and prosecution defence under the Drugs and Cosmetics Act together with BNS, BNSS and BSA.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp for Urgent Notice Review</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> adulteration of drugs means a medicine or medical preparation has been changed, contaminated, diluted, mixed, stored, packed or handled in a way that affects its quality, strength, safety or therapeutic purpose.</p>
        <p>It may involve contamination, unhygienic manufacturing, harmful substances, improper storage, wrong ingredients, reduced strength, unauthorised colouring, a damaged container, poor batch control, expired stock manipulation, spurious medicine, false labelling, or failure to meet prescribed quality standards.</p>
        <p>Even one adverse sample report, inspection notice, seizure, batch recall, manufacturing defect or complaint from the Drug Control Department can expose a business to regulatory action, criminal prosecution, licence suspension, product recall, market withdrawal and serious reputational harm.</p>
        <p><strong>From a business risk perspective…</strong> allegations can reach the company, its directors, the manufacturing chemist, analytical chemist, responsible pharmacist, importer, distributor and seller depending on the facts. Proper documentation and regulatory handling can materially affect the outcome.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Adulteration of Drugs is not a licence. It is a legal and regulatory offence involving adulterated, unsafe, spurious, misbranded or quality-compromised drugs or medical preparations.</p>
        <p>The primary regulatory framework is the Drugs and Cosmetics Act, 1940, read with the applicable rules and licensing conditions. Criminal law support may arise under BNS Section 276, with connected provisions under Sections 277 and 278.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main law', 'Drugs and Cosmetics Act, 1940'],
          ['Key rules', 'Drugs Rules, 1945; Medical Devices Rules, 2017; New Drugs and Clinical Trials Rules, 2019; and applicable product-specific rules'],
          ['Central regulator', 'Central Drugs Standard Control Organisation (CDSCO)'],
          ['State enforcement', 'State Drug Control Department / State Licensing Authority'],
          ['Criminal law support', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Relevant BNS sections', 'Sections 276, 277 and 278'],
          ['Procedure support', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence support', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Digital evidence', 'BSA provisions relating to electronic and digital records'],
          ['Master direction', 'No single master direction applies. Matters are governed by the Act, Rules, notifications, licensing conditions, inspection procedure and judicial process']
        ]} />
      </Section>

      <Section id="legal-provisions" title="Important Legal Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['D&C Act s. 16', 'Standards of quality'],
          ['s. 17', 'Misbranded drugs'],
          ['s. 17A', 'Adulterated drugs'],
          ['s. 17B', 'Spurious drugs'],
          ['s. 18', 'Prohibition of manufacture and sale of certain drugs and cosmetics'],
          ['s. 18A', 'Disclosure of manufacturer details'],
          ['s. 18B', 'Maintenance of records and furnishing of information'],
          ['s. 20', 'Government Analysts'],
          ['s. 21', 'Inspectors'],
          ['s. 22', 'Powers of Inspectors'],
          ['s. 23', 'Procedure of Inspectors'],
          ['s. 24', 'Duty to disclose where drugs are manufactured or kept'],
          ['s. 25', 'Reports of Government Analysts'],
          ['s. 26', 'Purchaser&rsquo;s right to get a drug tested or analysed'],
          ['s. 26A', 'Central Government power to regulate, restrict or prohibit in public interest'],
          ['s. 27', 'Penalty for manufacture or sale in contravention'],
          ['s. 28', 'Penalty for non-disclosure of manufacturer details'],
          ['s. 28A', 'Penalty for not keeping documents or disclosing information'],
          ['s. 31', 'Confiscation'],
          ['s. 32', 'Cognizance of offences'],
          ['s. 32A', 'Court power to implead manufacturer'],
          ['s. 32B', 'Compounding of certain offences'],
          ['BNS s. 276', 'Adulteration of drugs'],
          ['BNS s. 277', 'Sale of adulterated drugs'],
          ['BNS s. 278', 'Sale of a drug as a different drug or preparation']
        ]} />
      </Section>

      <Section id="categories" title="Adulterated vs Spurious vs Misbranded">
        <DataTable headers={['Category', 'Meaning in practical terms', 'Business risk']} rows={[
          ['Adulterated drugs', 'Contaminated, harmful, improperly stored, unsafe, quality-reduced or mixed with prohibited substances', 'Serious regulatory and prosecution exposure'],
          ['Spurious drugs', 'Fake, imitation, falsely labelled or falsely represented', 'Very serious criminal and public health exposure'],
          ['Misbranded drugs', 'Labelled, presented or represented in a misleading or non-compliant manner', 'Notice, penalty, seizure and corrective action risk'],
          ['Not of standard quality', 'Fails prescribed quality parameters but may not always be spurious or adulterated', 'Batch recall, licence risk and prosecution exposure depending on facts'],
          ['Expired or relabelled', 'Expired medicine sold, or manipulated through altered label or date', 'Criminal, licence and consumer risk'],
          ['Storage-compromised', 'Affected by temperature, humidity, cold-chain or warehouse failure', 'Quality failure, recall and liability exposure']
        ]} />
      </Section>

      <Section id="matter-types" title="Types of Matters We Handle">
        <DataTable headers={['Type of matter', 'Practical example']} rows={[
          ['Drug sample failure', 'Government Analyst report indicates quality failure'],
          ['CDSCO notice', 'Central regulator issues notice or seeks explanation'],
          ['State Drug Control notice', 'State authority initiates inspection or enforcement'],
          ['Adulterated drug allegation', 'Product alleged to be contaminated, diluted or harmful'],
          ['Spurious drug allegation', 'Product suspected as fake, duplicate or falsely represented'],
          ['Misbranded drug allegation', 'Label, claim, manufacturer details or declaration disputed'],
          ['Drug recall', 'Batch withdrawal required due to quality or safety concern'],
          ['Seizure or stock hold', 'Inspector seizes or restricts drug stock movement'],
          ['Licence suspension risk', 'Manufacturing, wholesale or retail licence is at risk'],
          ['Prosecution defence', 'Criminal complaint or prosecution is initiated'],
          ['Company liability', 'Directors, responsible persons or technical staff are named'],
          ['Online pharmacy issue', 'E-pharmacy sale, prescription or product authenticity dispute'],
          ['Import violation', 'Imported drug fails regulatory or quality requirement'],
          ['Medical device quality issue', 'Device-related quality or regulatory action, where applicable']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs Legal Support">
        <DataTable headers={['Business type', 'Why it matters']} rows={[
          ['Pharmaceutical manufacturers', 'Manufacturing quality and batch responsibility are directly examined'],
          ['Loan licence manufacturers', 'Principal and actual manufacturer roles must be reviewed'],
          ['Third-party manufacturers', 'Contract manufacturing records and responsibility mapping are critical'],
          ['Importers', 'Import documents, product registration and quality compliance matter'],
          ['Wholesalers and stockists', 'Storage, invoices and batch traceability are important'],
          ['Retail pharmacies', 'Sale records, prescription compliance and stock source are examined'],
          ['Hospitals and clinics', 'Pharmacy and procurement records may be questioned'],
          ['Online pharmacies', 'Digital sale records, prescription flow and product authenticity matter'],
          ['Medical device businesses', 'Quality and regulatory classification issues may arise'],
          ['Cosmetic businesses', 'Similar inspection and quality issues may arise under applicable provisions'],
          ['Directors and responsible persons', 'Personal liability exposure must be assessed carefully']
        ]} />
      </Section>

      <Section id="when-to-act" title="When to Take Legal Help">
        <DataTable headers={['Situation', 'Why immediate action is needed']} rows={[
          ['Drug Inspector has issued notice', 'The reply must be technically and legally accurate'],
          ['Drug sample has failed', 'Sample procedure and lab report must be reviewed quickly'],
          ['Stock has been seized', 'Release, defence and compliance strategy may be required'],
          ['Product recall is advised', 'Recall communication and traceability records must be controlled'],
          ['Licence suspension is threatened', 'Business continuity risk becomes serious'],
          ['Government Analyst report is adverse', 'Referral and defence strategy must be assessed'],
          ['Product alleged as spurious', 'Serious criminal and brand risk exists'],
          ['Company director is named', 'Role and responsibility mapping becomes essential'],
          ['Online complaint is spreading', 'Reputation and regulatory response must be managed'],
          ['Police or court summons received', 'BNSS procedure and defence preparation are urgent'],
          ['Digital records are involved', 'BSA-compliant evidence preservation is required']
        ]} />
      </Section>

      <Section id="services" title="Our Legal Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Notice review', 'Analyse the CDSCO or State Drug Control notice, inspection report and alleged violation'],
          ['Reply drafting', 'Prepare a legally structured and technically balanced reply'],
          ['Sample report review', 'Review the Government Analyst report, parameters, batch details and possible technical issues'],
          ['Licence review', 'Check manufacturing, wholesale, retail, import or product permission status'],
          ['Batch record review', 'Examine BMR, BPR, QC records, stability data and release documentation'],
          ['Inspection support', 'Assist with post-inspection documentation and response strategy'],
          ['Recall strategy', 'Support batch recall, market withdrawal and communication control'],
          ['Seizure response', 'Review the seizure memo and prepare a release or representation strategy'],
          ['Prosecution defence support', 'Coordinate defence in criminal proceedings'],
          ['Company liability mapping', 'Review nominee, director, responsible pharmacist, chemist and officer exposure'],
          ['Compounding review', 'Assess availability and suitability of the compounding route where legally permitted'],
          ['Appeal support', 'Assist with appeal against an adverse order, suspension or penalty'],
          ['Digital evidence review', 'Review ERP records, emails, e-invoices, online listings and digital trail'],
          ['Advocate coordination', 'Prepare the legal brief, chronology and document set'],
          ['Ticket-based tracking', 'Track notice, reply, hearing, lab report, recall, order and closure status']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document or information', 'Purpose']} rows={[
          ['Drug Control or CDSCO notice', 'Understand the alleged violation'],
          ['Inspection report', 'Review authority observations'],
          ['Seizure memo, if any', 'Assess stock restriction and procedure'],
          ['Sample collection memo', 'Check sampling procedure'],
          ['Government Analyst report', 'Review technical non-compliance'],
          ['Referral lab report, if any', 'Compare testing outcome'],
          ['Manufacturing licence', 'Verify authorisation and scope'],
          ['Product permission or approval', 'Confirm product legality'],
          ['Batch Manufacturing Record', 'Trace production details'],
          ['Batch Packing Record', 'Verify packing and labelling process'],
          ['Quality control test report', 'Support the batch release decision'],
          ['Stability data', 'Support product quality and shelf-life'],
          ['Raw material invoices and COA', 'Source and quality traceability'],
          ['Distribution records', 'Batch movement and market trail'],
          ['Recall record, if any', 'Show corrective action'],
          ['Product label and artwork', 'Review misbranding or declaration issue'],
          ['Storage temperature records', 'Cold-chain and warehouse defence'],
          ['Emails, ERP records, e-invoices', 'BSA-based electronic evidence'],
          ['Company authorisation', 'Representation and filing support']
        ]} />
      </Section>

      <Section id="common-issues" title="Issues We Commonly Fix">
        <DataTable headers={['Issue', 'Practical risk', 'How we support']} rows={[
          ['Notice replied to casually', 'Admission and prosecution risk', 'Legally balanced reply drafting'],
          ['Sample report not analysed', 'Defence opportunity may be missed', 'Technical and legal review'],
          ['Batch records incomplete', 'Traceability becomes weak', 'Document reconstruction and evidence mapping'],
          ['Product stored incorrectly by distributor', 'Manufacturer wrongly blamed', 'Supply-chain responsibility review'],
          ['Spurious allegation without source review', 'Brand damage and criminal exposure', 'Source and batch authenticity analysis'],
          ['Licence condition mismatch', 'Suspension or cancellation risk', 'Licence scope review'],
          ['Recall handled informally', 'Future liability increases', 'Structured recall documentation'],
          ['Director named without role analysis', 'Personal exposure risk', 'Company liability mapping'],
          ['Digital records not preserved', 'Evidence becomes weak', 'BSA-based evidence checklist'],
          ['Summons received without preparation', 'Defence weakens', 'BNSS procedure and advocate coordination']
        ]} />
      </Section>

      <Section id="process" title="Our Legal Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Notice, inspection and urgency assessment'],
          ['2', 'Document collection', 'Licence, sample memo, lab report, batch and QC records'],
          ['3', 'Legal mapping', 'Drugs and Cosmetics Act, BNS, BNSS and BSA review'],
          ['4', 'Technical review', 'Sample procedure, lab parameters and batch quality assessment'],
          ['5', 'Risk analysis', 'Seizure, recall, suspension, prosecution or appeal exposure'],
          ['6', 'Reply drafting', 'Authority-ready response'],
          ['7', 'Corrective action', 'Recall, label correction, licence update or SOP improvement'],
          ['8', 'Hearing and submission support', 'Department coordination and advocate briefing'],
          ['9', 'Appeal or defence', 'Challenge an adverse order or defend prosecution'],
          ['10', 'Future compliance', 'SOP, quality checklist and compliance calendar']
        ]} />
      </Section>

      <Section id="sample-defence" title="Drug Sample and Lab Report Defence">
        <DataTable headers={['Review point', 'Why it matters']} rows={[
          ['Sampling procedure', 'Improper sampling can affect reliability'],
          ['Quantity of sample', 'Required quantity and division of sample may matter'],
          ['Seal and chain of custody', 'Tampering or procedural gaps may be relevant'],
          ['Batch number and expiry', 'Product must match the alleged batch'],
          ['Test parameter', 'The allegation must match the prescribed standard'],
          ['Lab method', 'Testing method and specification should be reviewed'],
          ['Storage condition', 'Temperature or humidity exposure may affect results'],
          ['Referral lab option', 'Further testing strategy may be available in suitable cases'],
          ['Manufacturing records', 'Support batch release and quality control'],
          ['Distribution trail', 'Identifies whether the issue arose after dispatch']
        ]} />
      </Section>

      <Section id="licence-risk" title="Licence Risk">
        <p>These cases can create serious licensing exposure, particularly where the allegation involves an unsafe or spurious drug, repeated quality failure, non-cooperation with an inspector, serious patient risk or violation of licence conditions.</p>
        <DataTable headers={['Licence risk', 'Practical impact']} rows={[
          ['Show cause notice', 'Explanation must be filed properly'],
          ['Suspension', 'Manufacturing or sale activity may be affected'],
          ['Cancellation', 'Severe business continuity impact'],
          ['Stock seizure', 'Market supply and cash flow disruption'],
          ['Product recall', 'Batch withdrawal and public communication risk'],
          ['Prosecution', 'Criminal exposure for the company and responsible persons'],
          ['Blacklisting and reputation risk', 'Business relationships and institutional supply may suffer']
        ]} />
      </Section>

      <Section id="bns-mapping" title="BNS Offence Mapping">
        <DataTable headers={['Provision', 'Practical meaning']} rows={[
          ['BNS s. 276', 'Adulterating a drug or medical preparation in a manner affecting efficacy, operation or safety'],
          ['BNS s. 277', 'Selling or offering an adulterated drug, knowing or having reason to believe it is adulterated'],
          ['BNS s. 278', 'Knowingly selling or issuing a drug as a different drug or preparation'],
          ['D&C Act s. 17A', 'Defines adulterated drugs for regulatory purposes'],
          ['D&C Act s. 17B', 'Defines spurious drugs for regulatory purposes'],
          ['D&C Act s. 27', 'Penalties for manufacture, sale, stocking, exhibition or distribution in contravention']
        ]} />
      </Section>

      <Section id="defence-support" title="Defence Support for Pharma Businesses">
        <DataTable headers={['Defence situation', 'Practical review']} rows={[
          ['Sample failed', 'Lab report, sample process and specification review'],
          ['Product alleged adulterated', 'Batch record, QC and storage review'],
          ['Product alleged spurious', 'Source, invoice, packaging and authenticity review'],
          ['Distributor mishandled stock', 'Storage and supply-chain evidence'],
          ['Retailer sold without knowledge', 'Purchase source and invoice trail'],
          ['Director named', 'Role, responsibility and due diligence review'],
          ['Licence suspension threatened', 'Corrective action and compliance evidence'],
          ['Recall directed', 'Batch tracing and recall documentation'],
          ['Prosecution initiated', 'BNSS and BSA-based defence support'],
          ['Digital records relied upon', 'ERP, emails and e-invoice evidence review']
        ]} />
        <p>Defence should be factual, technical and evidence-backed. A simple denial is rarely enough in drug quality proceedings.</p>
      </Section>

      <Section id="preventive-checklist" title="Preventive Compliance Checklist">
        <DataTable headers={['Compliance area', 'What to maintain']} rows={[
          ['Licence validity', 'Manufacturing, sale, import and product permissions'],
          ['Batch records', 'BMR, BPR, QC approval and release note'],
          ['Raw material records', 'Supplier qualification, COA and inward testing'],
          ['Quality testing', 'Finished goods test reports and specifications'],
          ['Storage records', 'Temperature, humidity and cold-chain logs'],
          ['Distribution trail', 'Stockist, wholesaler, retailer and batch movement records'],
          ['Recall SOP', 'Recall team, market tracing and communication procedure'],
          ['Complaint SOP', 'Pharmacovigilance, market complaint and investigation process'],
          ['Label control', 'Approved artwork, batch coding and statutory declarations'],
          ['Digital records', 'ERP, emails, e-invoices and audit trail preservation']
        ]} />
      </Section>

      <Section id="why-estabizz" title="Why Estabizz Fintech">
        <p>Clients come to us in these matters because they need urgent clarity, regulatory understanding and business-sensitive handling. Drug quality cases can affect operations, licence, reputation and the personal liability of responsible persons.</p>
        <p>We review the notice, sample report, licence, product records, batch documents and distribution trail at the first stage, which reduces effort for the client and avoids repeated back-and-forth with the authority. We help avoid weak, generic replies by aligning the matter with the Drugs and Cosmetics Act, BNS Sections 276, 277 and 278, BNSS procedure and BSA evidence principles wherever applicable.</p>
        <p>Every matter runs through a structured ticket-based tracking system, with updates on document status, reply drafting, authority submission, hearing, testing, appeal, prosecution and closure.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Adulteration of Drugs matters require immediate technical and legal review. A strong response is built on sample procedure, lab findings, batch records, quality control documents, distribution trail and correct BNS-BNSS-BSA mapping — not merely on a general denial.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Liability, procedure and available remedies depend on the product, the allegation, the licence and the facts of each case, and parts of this guide are still undergoing professional review. Estabizz provides legal research, documentation and compliance coordination; court appearance is handled through enrolled advocates. Confirm the current position with the relevant authority and your adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
