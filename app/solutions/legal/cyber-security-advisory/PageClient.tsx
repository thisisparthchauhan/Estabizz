'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'in-force', title: 'What Is Actually In Force Today' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'what-it-covers', title: 'What the Advisory Covers' },
  { id: 'who-needs', title: 'Who Needs It' },
  { id: 'when', title: 'When to Take Advice' },
  { id: 'cert-in', title: 'CERT-In Reporting Readiness' },
  { id: 'dpdp', title: 'DPDP Readiness' },
  { id: 'risks', title: 'Where Businesses Actually Get Hit' },
  { id: 'process', title: 'How the Engagement Runs' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'policies', title: 'Policies We Prepare' },
  { id: 'regulated', title: 'Regulated Entities' },
  { id: 'due-diligence', title: 'Cyber Due Diligence' },
  { id: 'common-issues', title: 'Common Gaps We Fix' },
  { id: 'legal-risks', title: 'Cost of Ignoring It' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is Cyber Security Advisory?', 'A professional service that helps a business identify and reduce legal, regulatory, operational and technical risk connected with cyber threats, data breaches and information security. It sits between the IT function and the legal function, which is exactly where most gaps live.'],
  ['Is it a licence?', 'No. It is not a licence or a registration. It is advisory and compliance support. That said, the underlying obligations — incident reporting, log retention, security safeguards — can themselves be mandatory depending on the entity and sector.'],
  ['Which laws apply to cyber security in India?', 'The Information Technology Act, 2000 and the CERT-In Directions of 28 April 2022 are the operative baseline today. The SPDI Rules, 2011 still govern sensitive personal data. The Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025 layer on top, with most substantive obligations commencing 13 May 2027.'],
  ['Is DPDP compliance mandatory right now?', 'Not in full. The DPDP Rules, 2025 were notified on 13 November 2025 with a phased commencement. The Data Protection Board provisions came into force at once and consent-manager registration opened after twelve months, but the operative obligations — notice, security safeguards, breach intimation, retention limits, children’s data, Significant Data Fiduciary duties and Data Principal rights — commence on 13 May 2027.'],
  ['So can we wait until 2027?', 'That would be a mistake. The 13 May 2027 date is the deadline to be compliant, not the date to begin. Data inventories, consent re-papering, vendor contract amendments and retention controls take months, and the IT Act, SPDI Rules and CERT-In obligations already apply today regardless.'],
  ['Is Section 43A of the IT Act still in force?', 'Yes. Section 43A and the SPDI Rules, 2011 remain in force and are omitted only with effect from 13 May 2027, when the corresponding DPDP provisions commence. Treating them as already repealed is a live compliance risk.'],
  ['What is CERT-In?', 'The Indian Computer Emergency Response Team, the national nodal agency for cyber incident response under Section 70B of the IT Act.'],
  ['Is cyber incident reporting mandatory?', 'For specified cyber incidents, yes. The CERT-In Directions require covered entities to report specified incidents within six hours of noticing them or being made aware of them.'],
  ['What if we do not have all the details within six hours?', 'Report what you have. The Directions contemplate providing available information within the window and supplementing it afterwards. A late complete report is worse than a prompt partial one.'],
  ['How long must logs be kept?', 'The CERT-In Directions require ICT system logs to be maintained securely for a rolling period of 180 days, within Indian jurisdiction. Log retention is the single most commonly failed item we see.'],
  ['What is VAPT?', 'Vulnerability Assessment and Penetration Testing — technical testing that identifies weaknesses in systems, applications and networks.'],
  ['Is VAPT mandatory?', 'It depends on the entity, regulator, certification and customer contracts. For regulated entities, system audits and security testing are commonly expected. For everyone else, it is usually a contractual rather than statutory requirement.'],
  ['What is the DPDP breach intimation timeline?', 'When the relevant rules commence, a Data Fiduciary must intimate the Data Protection Board without delay with an initial description, followed by a detailed report within seventy-two hours, unless the Board allows longer on written request. Affected Data Principals must also be informed.'],
  ['Does a CERT-In report cover the DPDP obligation as well?', 'No. They are separate obligations with separate recipients, thresholds and timelines. A personal data breach at a covered entity can trigger both, and the six-hour clock is the tighter one.'],
  ['What is an incident response plan?', 'A step-wise plan for identifying, containing, reporting, investigating and recovering from a cyber incident, with named owners and an escalation matrix. Written before the incident, not during it.'],
  ['What should we do immediately after an attack?', 'Isolate affected systems, preserve evidence, convene the response team, assess reporting obligations against the clock and coordinate technical support. Do not delete logs, do not wipe devices and do not have anyone improvise a customer statement.'],
  ['Why does evidence preservation matter so much?', 'Because a breach is usually followed by a regulator, an insurer, a customer or a litigant asking what happened. Electronic records are governed by the Bharatiya Sakshya Adhiniyam, 2023, and evidence that was not preserved properly is hard to rely on later.'],
  ['What is vendor cyber risk?', 'The risk arising when cloud providers, SaaS platforms, IT vendors or consultants can access your systems or data. A vendor breach is still your regulatory and customer problem, which is why contract clauses and access controls matter.'],
  ['What is a data processing agreement?', 'A contract defining how a vendor processes data on your behalf, what it must protect, how quickly it must report a breach to you, and where liability sits.'],
  ['Do small businesses need this?', 'Yes, proportionately. A small business still holds customer data, payment records and employee information, and attackers do not filter by turnover. The controls should be scaled, not skipped.'],
  ['What do investors look at?', 'Data inventory, policies, VAPT reports and remediation status, incident history, vendor contracts, DPDP readiness and board oversight. Cyber gaps surface in diligence and affect terms.'],
  ['What is the most common mistake?', 'Treating cyber security as purely an IT problem. The technical controls are only half of it; the other half is documentation, contracts, reporting readiness, evidence and board accountability.'],
  ['What documents should a business maintain?', 'Cyber security policy, privacy notice, access control register, incident register, VAPT reports with a remediation tracker, vendor contracts and DPAs, data inventory, backup policy and a breach response SOP.'],
  ['How often should this be reviewed?', 'Periodically, and on every trigger — a new product or app, a new vendor, a new data flow, a regulatory change, an incident, or an investor process starting.'],
  ['Can Estabizz help during a live incident?', 'Yes. We support legal response, reporting readiness against the six-hour and seventy-two-hour clocks, evidence preservation, breach communication review and corrective-action tracking. Forensic and remediation work is done with technical partners.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Cyber and Data Protection' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Cyber Security Advisory' }]}
      title="Cyber Security Advisory"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Cyber Security Advisory"
      sections={sections}
      ctaTitle="Speak With a Cyber Compliance Expert"
      ctaDescription="Review your CERT-In reporting readiness, log retention, DPDP position and vendor contracts before an incident forces the question."
      quickFacts={[
        { label: 'CERT-In reporting', value: 'Within 6 hours' },
        { label: 'Log retention', value: '180 days, in India' },
        { label: 'DPDP main obligations', value: 'From 13 May 2027' },
        { label: 'IT Act s.43A', value: 'Still in force' }
      ]}
      relatedArticles={[
        { title: 'Cyber Crime Complaint', href: '/solutions/legal/cyber-crime-complaint', category: 'Legal', description: 'Online fraud, the 1930 helpline, digital evidence preservation and FIR strategy under IT Act, BNS, BNSS and BSA.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence and execution across civil, criminal and tribunal matters.' },
        { title: 'Criminal Misappropriation of Property', href: '/solutions/legal/criminal-misappropriation-of-property', category: 'Legal', description: 'BNS Section 314 — dishonest conversion of movable property, including data and asset misuse by insiders.' }
      ]}
      finalCtaTitle="Prepare Before the Six-Hour Clock Starts"
      finalCtaDescription="Nobody drafts an incident response plan well at 2 a.m. during a ransomware event. The reporting workflow, the log retention and the escalation matrix are cheap to build in advance and impossible to build under pressure."
      heroDescription={<p>A cyber incident is a legal event as much as a technical one. A phishing compromise, an exposed database, a ransomware attack or a vendor breach can trigger reporting obligations measured in hours, alongside customer claims, regulatory scrutiny and contractual liability. Estabizz assists companies, fintechs, NBFCs, insurance intermediaries, payment businesses, ecommerce platforms, SaaS providers, healthcare and education entities with cyber risk assessment, IT Act and SPDI compliance, CERT-In reporting readiness, DPDP preparation, policy drafting, VAPT coordination, vendor risk review, cyber due diligence and board-level governance.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> Cyber Security Advisory means helping a business protect its systems, data and legal position — and proving afterwards that it did so.</p>
        <p>Every business now runs on digital records, cloud tools, customer databases, employee devices, payment rails, APIs and third-party vendors. When any of those fail, the consequences are rarely confined to the IT department. They arrive as reporting deadlines, customer complaints, insurance questions, investor diligence findings and, occasionally, regulatory proceedings.</p>
        <p>The work divides into two halves. Before an incident: mapping data, closing control gaps, writing policies, fixing vendor contracts and building a reporting workflow. After an incident: containing it, preserving evidence, meeting the clock and documenting the response. The first half is what makes the second half survivable.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Cyber Security Advisory is not a licence. It is legal, technical and compliance advisory work for managing cyber risk and information security obligations.</p>
        <p>There is no single master direction covering all businesses. Obligations come from the IT Act and the SPDI Rules, the CERT-In Directions, the DPDP framework as it commences, sectoral regulator circulars and your own customer and vendor contracts. Which of those bite depends on your entity type, sector, data and counterparties.</p>
      </Section>

      <Section id="in-force" title="What Is Actually In Force Today">
        <div className="warning-box" aria-label="Commencement note">
          <p><strong>Most public writing on Indian data protection describes the DPDP Act as though it were fully operative. It is not yet.</strong> The DPDP Rules, 2025 were notified on 13 November 2025 with a deliberately staggered commencement, and the obligations most businesses care about begin on <strong>13 May 2027</strong>. Meanwhile the IT Act, the SPDI Rules and the CERT-In Directions apply right now. Getting this sequence wrong leads businesses to over-invest in provisions that have not commenced while missing the ones that have.</p>
        </div>
        <DataTable headers={['Instrument', 'Status as at September 2026']} rows={[
          ['IT Act, 2000', 'In force'],
          ['CERT-In Directions, 28 April 2022', 'In force since 27 June 2022 — six-hour reporting and 180-day log retention apply now'],
          ['IT Act Section 43A and SPDI Rules, 2011', 'Still in force; omitted only with effect from 13 May 2027'],
          ['DPDP Act, 2023', 'Enacted, commencing in phases alongside the Rules'],
          ['DPDP Rules 1, 2 and 17–21', 'In force from 13 November 2025 — Data Protection Board constitution and procedure'],
          ['DPDP Rule 4 — Consent Manager registration', 'In force from 13 November 2026'],
          ['DPDP Rules 3, 5–16, 22 and 23', 'Commence 13 May 2027 — notice, security safeguards, breach intimation, retention, children’s data, Significant Data Fiduciary duties and Data Principal rights'],
          ['Bharatiya Sakshya Adhiniyam, 2023', 'In force — governs electronic records and digital evidence']
        ]} />
        <p>The practical reading is straightforward. Your CERT-In and IT Act obligations are live and enforceable today. Your DPDP obligations are dated, not optional, and the preparation work — data inventory, consent design, vendor re-papering, retention controls — runs to months rather than weeks. May 2027 is the compliance deadline, not the start date.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main cyber law', 'Information Technology Act, 2000'],
          ['Incident response authority', 'CERT-In, under Section 70B of the IT Act'],
          ['Incident reporting directions', 'Cyber Security Directions under Section 70B(6), dated 28 April 2022'],
          ['Sensitive personal data, current regime', 'IT Act Section 43A read with the SPDI Rules, 2011'],
          ['Personal data law', 'Digital Personal Data Protection Act, 2023'],
          ['Operative rules', 'Digital Personal Data Protection Rules, 2025'],
          ['Data protection authority', 'Data Protection Board of India'],
          ['Critical infrastructure', 'NCIIPC framework under Section 70A'],
          ['Intermediaries and platforms', 'IT Rules and the intermediary due diligence framework, where applicable'],
          ['Sector regulators', 'RBI, SEBI, IRDAI, IFSCA, PFRDA, UIDAI, TRAI and MeitY, depending on sector'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Criminal law', 'Bharatiya Nyaya Sanhita, 2023 and the IT Act cyber offence provisions'],
          ['Contractual layer', 'Customer contracts, vendor agreements, DPAs and confidentiality clauses']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Law', 'Provision', 'Practical relevance']} rows={[
          ['IT Act, 2000', 'Section 43', 'Compensation for unauthorised access, data extraction or damage to computer systems'],
          ['IT Act, 2000', 'Section 43A', 'Compensation for failure to protect sensitive personal data — in force until 13 May 2027'],
          ['IT Act, 2000', 'Section 65', 'Tampering with computer source documents'],
          ['IT Act, 2000', 'Section 66', 'Computer-related offences involving dishonest or fraudulent acts'],
          ['IT Act, 2000', 'Section 66C', 'Identity theft'],
          ['IT Act, 2000', 'Section 66D', 'Cheating by personation using a computer resource'],
          ['IT Act, 2000', 'Section 66E', 'Violation of privacy'],
          ['IT Act, 2000', 'Section 67C', 'Preservation and retention of information by intermediaries'],
          ['IT Act, 2000', 'Sections 69, 69A and 69B', 'Interception and monitoring directions, blocking, and traffic data monitoring'],
          ['IT Act, 2000', 'Sections 70, 70A and 70B', 'Protected systems, NCIIPC and the CERT-In framework'],
          ['IT Act, 2000', 'Sections 72 and 72A', 'Breach of confidentiality, and disclosure in breach of lawful contract'],
          ['CERT-In Directions, 2022', 'Direction under Section 70B(6)', 'Six-hour incident reporting, 180-day log retention and time synchronisation'],
          ['DPDP Act, 2023', 'Sections 4 to 6', 'Grounds for processing, notice to the Data Principal and the consent framework'],
          ['DPDP Act, 2023', 'Section 8', 'General obligations of a Data Fiduciary, including reasonable security safeguards'],
          ['DPDP Act, 2023', 'Sections 9 and 10', 'Children’s personal data and Significant Data Fiduciary obligations'],
          ['DPDP Act, 2023', 'Sections 11 to 14', 'Rights of the Data Principal'],
          ['DPDP Act, 2023', 'Sections 16, 18, 29 and 33', 'Processing outside India, the Board, appeals to the Appellate Tribunal, and penalties'],
          ['Bharatiya Sakshya Adhiniyam, 2023', 'Sections 61 to 63', 'Admissibility of electronic and digital records'],
          ['Companies Act, 2013', 'Board governance and director duties', 'Board-level cyber risk oversight and internal controls']
        ]} />
      </Section>

      <Section id="what-it-covers" title="What the Advisory Covers">
        <DataTable headers={['Area', 'What it means in practice']} rows={[
          ['Cyber risk assessment', 'Identifying technology, data and process vulnerabilities'],
          ['Legal compliance review', 'Mapping IT Act, CERT-In, DPDP and sectoral obligations to your actual operations'],
          ['Data protection readiness', 'Building notice, consent, breach and rights processes ahead of commencement'],
          ['Incident response planning', 'A written plan with owners and escalation, prepared before it is needed'],
          ['VAPT coordination', 'Scoping technical testing and tracking remediation to closure'],
          ['Policy drafting', 'Cyber security, access, password, BYOD, retention and incident policies'],
          ['Vendor risk review', 'Cloud, SaaS and outsourcing controls, plus the contract clauses behind them'],
          ['Board reporting', 'Management-level cyber risk reporting that stands up in diligence'],
          ['Evidence preservation', 'Logs, tickets, emails and digital proof kept in admissible form'],
          ['Regulatory reporting', 'CERT-In and DPDP breach reporting workflows'],
          ['Training support', 'Employee awareness on phishing, fraud and data handling'],
          ['Cyber due diligence', 'Risk review during investment, M&A or vendor onboarding']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs It">
        <DataTable headers={['Entity', 'Why']} rows={[
          ['Fintech company', 'Handles financial, KYC and customer data'],
          ['NBFC', 'IT governance, outsourcing and cyber risk controls expected by the regulator'],
          ['Payment business', 'Transaction fraud and data breach exposure'],
          ['Insurance intermediary', 'Customer, health and policy data, plus system audit expectations'],
          ['Ecommerce platform', 'Payment, customer and vendor information'],
          ['SaaS company', 'Customer business data held on cloud infrastructure'],
          ['Healthcare business', 'Sensitive health and patient records'],
          ['Education platform', 'Children’s and student data, with heightened DPDP obligations coming'],
          ['HR and recruitment platform', 'CVs, salary, identity and employee records'],
          ['Accounting or legal firm', 'Confidential client records'],
          ['BPO and call centre', 'Customer communication data and broad agent access'],
          ['Startup', 'Early-stage policies and investor-ready controls'],
          ['Regulated entity', 'Sector-specific cyber governance and audit readiness'],
          ['Any business mid-incident', 'Immediate response, reporting and evidence preservation']
        ]} />
      </Section>

      <Section id="when" title="When to Take Advice">
        <DataTable headers={['Trigger', 'Why it matters now']} rows={[
          ['A website or app goes live', 'Customer data and login systems become externally exposed'],
          ['You start collecting personal data', 'DPDP preparation should begin well before May 2027'],
          ['You adopt cloud or SaaS tools', 'Vendor access and contract terms need review'],
          ['You handle payment or KYC data', 'Fraud and breach exposure is materially higher'],
          ['An incident has occurred', 'Reporting clocks, evidence and response must be managed immediately'],
          ['Ransomware or phishing has hit', 'System isolation and legal response run in parallel'],
          ['Customer data has leaked', 'Breach assessment and a reviewed communication plan are required'],
          ['Investor diligence is approaching', 'Policies, VAPT status and incident history will be examined'],
          ['A regulator asks for an IT audit', 'Documentation and technical reports must already exist'],
          ['A vendor gains access to data', 'Processing terms and security clauses need to be in place first'],
          ['Employees work remotely', 'Device, access and BYOD controls become material']
        ]} />
      </Section>

      <Section id="cert-in" title="CERT-In Reporting Readiness">
        <p>The CERT-In Directions of 28 April 2022, effective from 27 June 2022, are the obligation most often discovered too late. They require covered entities to report specified cyber incidents to CERT-In <strong>within six hours</strong> of noticing them or being made aware of them. Where complete information is not available in that window, available information should be provided within it and supplemented afterwards.</p>
        <p>Two supporting obligations matter as much as the reporting itself. ICT system logs must be maintained securely for a <strong>rolling period of 180 days within Indian jurisdiction</strong>, and system clocks must be synchronised to the prescribed time sources so that logs from different systems can actually be correlated. An organisation that reports on time but cannot produce correlated logs has met the letter of one obligation and failed the purpose of both.</p>
        <DataTable headers={['Readiness area', 'Control to have in place']} rows={[
          ['Incident classification', 'A documented test for whether an event is reportable'],
          ['Internal escalation', 'IT, legal, management and compliance escalation matrix with named owners'],
          ['Reporting workflow', 'Who drafts, who approves and who files, inside six hours'],
          ['Log retention', '180 days, secure, within Indian jurisdiction'],
          ['Time synchronisation', 'Systems synchronised to the prescribed time sources'],
          ['Incident register', 'A maintained record of cyber incidents and responses'],
          ['Forensic readiness', 'Devices, logs, screenshots and emails preserved, not overwritten'],
          ['Vendor coordination', 'Cloud, SOC, SIEM and hosting support reachable out of hours'],
          ['Customer communication', 'Legally reviewed templates prepared in advance'],
          ['Post-incident review', 'Root cause, remediation and a management report']
        ]} />
      </Section>

      <Section id="dpdp" title="DPDP Readiness">
        <p>Where an organisation processes digital personal data, the DPDP framework will govern how it does so. The obligations below commence on 13 May 2027, which makes this a preparation exercise rather than a filing exercise — but one with a fixed deadline and a long lead time.</p>
        <DataTable headers={['DPDP area', 'What preparation involves']} rows={[
          ['Notice', 'A clear, itemised notice covering what is collected and why'],
          ['Consent', 'Free, specific, informed and unambiguous consent, with records kept'],
          ['Purpose limitation and minimisation', 'Collecting only what is needed, using it only as stated'],
          ['Security safeguards', 'Reasonable technical and organisational controls under Section 8'],
          ['Breach intimation', 'Intimate the Board without delay, then a detailed report within 72 hours; affected Data Principals must also be informed'],
          ['Data Principal rights', 'Access, correction, erasure, nomination and grievance redressal processes'],
          ['Children’s data', 'Verifiable parental consent and restrictions on tracking and targeted advertising'],
          ['Significant Data Fiduciary', 'Additional obligations including a Data Protection Officer and audits, once notified'],
          ['Vendor processing', 'Processor contracts with security and breach-reporting obligations'],
          ['Retention and deletion', 'Defined retention periods and actual deletion capability'],
          ['Cross-border transfer', 'Transfers outside India subject to Section 16 restrictions'],
          ['Grievance contact', 'A published escalation channel that is actually monitored']
        ]} />
        <div className="info-box" aria-label="Sequencing note">
          <p><strong>Two clocks, not one.</strong> A personal data breach at a CERT-In covered entity can trigger both the six-hour CERT-In report and the DPDP intimation to the Board. They are separate obligations with different recipients and timelines, and the six-hour clock is the tighter of the two. Build one workflow that satisfies both, and decide the reporting call before the incident rather than during it.</p>
        </div>
      </Section>

      <Section id="risks" title="Where Businesses Actually Get Hit">
        <DataTable headers={['Risk', 'Practical impact']} rows={[
          ['Phishing', 'Employee credentials stolen, often the entry point for everything else'],
          ['Ransomware', 'Systems locked, data encrypted, operations halted'],
          ['Data breach', 'Customer, employee or vendor data exposed'],
          ['Weak passwords and no MFA', 'Account takeover, the most preventable failure on this list'],
          ['Poor vendor controls', 'A third-party breach that lands on you'],
          ['No logs', 'Investigation becomes guesswork and CERT-In compliance fails'],
          ['No backup', 'Data cannot be restored after an attack'],
          ['No incident plan', 'The team reacts late, inconsistently and on the record'],
          ['Misconfigured cloud', 'Private data publicly exposed without any attack at all'],
          ['API vulnerability', 'Customer or transaction data exposed at scale'],
          ['Insider threat', 'Employee misuse or data theft, often at exit'],
          ['Unpatched systems', 'Known vulnerabilities exploited long after a fix existed'],
          ['No retention rules', 'Data you no longer need enlarging every breach you have']
        ]} />
      </Section>

      <Section id="process" title="How the Engagement Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Business model, data and system overview'],
          ['2', 'Risk mapping', 'Legal, technical and operational cyber risks identified'],
          ['3', 'Data inventory', 'Personal data, business data and systems mapped'],
          ['4', 'Regulatory mapping', 'IT Act, CERT-In, DPDP, sectoral rules and contractual obligations'],
          ['5', 'Control gap review', 'Access, logs, backups, vendors, policies and response'],
          ['6', 'VAPT and audit coordination', 'Technical testing scoped and coordinated'],
          ['7', 'Policy drafting', 'Cyber security and data protection policy set'],
          ['8', 'Incident response plan', 'Breach SOP, escalation matrix and reporting workflow'],
          ['9', 'Vendor contract review', 'Security, confidentiality, indemnity and breach clauses'],
          ['10', 'Employee awareness', 'Phishing, password, data handling and reporting training'],
          ['11', 'Management reporting', 'Board cyber risk note'],
          ['12', 'Implementation tracker', 'Corrective action, owner and deadline'],
          ['13', 'Compliance monitoring', 'Periodic review and update support']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Company profile', 'Business and sector understanding'],
          ['System architecture', 'Technology and access review'],
          ['Data flow diagram', 'Personal and business data mapping'],
          ['Website and app details', 'External exposure review'],
          ['Cloud and hosting vendor details', 'Vendor risk review'],
          ['Existing cyber security policy', 'Gap review'],
          ['Privacy policy and terms of use', 'Notice, consent and liability review'],
          ['Vendor agreements and DPAs', 'Security and breach obligation review'],
          ['Employee device and access policy', 'Endpoint and permission review'],
          ['Access control list', 'Who can reach what'],
          ['Incident logs and register', 'Past breach and response assessment'],
          ['VAPT reports', 'Technical vulnerability status'],
          ['ISO, SOC or audit reports', 'Existing control maturity'],
          ['Backup and log retention policy', 'Recovery readiness and CERT-In compliance'],
          ['Customer complaint records', 'Breach or misuse allegations'],
          ['Cyber insurance policy', 'Coverage, conditions and exclusions'],
          ['Regulator notices', 'Live regulatory exposure'],
          ['Board minutes and risk reports', 'Governance review']
        ]} />
      </Section>

      <Section id="policies" title="Policies We Prepare">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Cyber Security Policy', 'Overall governance framework'],
          ['Information Security Policy', 'Information classification and protection'],
          ['Access Control Policy', 'User permissions and approval matrix'],
          ['Password and MFA Policy', 'Credential security'],
          ['Incident Response Policy', 'Breach response and reporting workflow'],
          ['Data Breach Response SOP', 'Step-wise action plan against the clock'],
          ['Acceptable Use Policy', 'Employee use of company systems'],
          ['BYOD and Remote Work Policy', 'Personal device and off-site controls'],
          ['Email Security Policy', 'Phishing and spoofing protection'],
          ['Vendor Security Policy', 'Third-party risk management'],
          ['Data Retention Policy', 'Retention and deletion rules'],
          ['Backup and Recovery Policy', 'Restoration after an incident'],
          ['Privacy Policy and Cookie Policy', 'User-facing notice and consent'],
          ['Data Processing Agreement', 'Processor obligations'],
          ['Cyber Incident Register', 'Incident logging and response evidence'],
          ['Board Cyber Risk Note', 'Governance reporting']
        ]} />
      </Section>

      <Section id="regulated" title="Regulated Entities">
        <p>Regulated entities carry a heavier documentation burden, because regulators generally expect board oversight, demonstrable controls and an audit trail rather than assurances.</p>
        <DataTable headers={['Sector', 'Advisory focus']} rows={[
          ['NBFC', 'IT governance, outsourcing, incident handling and customer data'],
          ['Payment aggregator or PSP', 'Transaction security, fraud risk, data storage and incident response'],
          ['Insurance broker or ISNP', 'System audit, user access, logs, security architecture and insurer interfaces'],
          ['SEBI intermediary', 'Cyber resilience, client data, trading systems and vendor risk'],
          ['IFSCA entity', 'IFSC compliance, outsourcing and information security governance'],
          ['AIF or investment manager', 'Investor data, fund records and access controls'],
          ['Healthcare', 'Patient data, health records and breach response'],
          ['EdTech', 'Children’s data, consent and the heightened DPDP position'],
          ['Ecommerce', 'Payment, customer and seller data security'],
          ['SaaS and IT', 'Cloud controls, customer data and SOC or ISO readiness'],
          ['BPO and call centre', 'Customer data, recording and agent access controls']
        ]} />
      </Section>

      <Section id="due-diligence" title="Cyber Due Diligence">
        <p>Cyber posture is now a standard diligence workstream in investment, M&A, vendor onboarding and licensing. What gets reviewed is rarely the firewall; it is the paperwork behind it.</p>
        <DataTable headers={['Area', 'What is reviewed']} rows={[
          ['Data inventory', 'What is collected, where it is stored and for how long'],
          ['System architecture', 'Where data and applications are hosted'],
          ['Access rights', 'Who can reach critical systems, and who should not'],
          ['Vendor risk', 'Cloud, SaaS and outsourced IT controls and contracts'],
          ['Incident history', 'Past breaches, complaints and how they were handled'],
          ['VAPT reports', 'Findings, and whether they were remediated or filed'],
          ['Policy framework', 'Cyber and privacy policies, and evidence they are followed'],
          ['DPDP readiness', 'Consent, notice, breach and rights processes'],
          ['CERT-In readiness', 'Reporting workflow and log retention'],
          ['Backup and recovery', 'Business continuity after an attack'],
          ['Contractual liability', 'Customer and vendor cyber clauses and caps'],
          ['Insurance', 'Coverage, conditions precedent and exclusions'],
          ['Board oversight', 'Governance and risk reporting']
        ]} />
      </Section>

      <Section id="common-issues" title="Common Gaps We Fix">
        <DataTable headers={['Gap', 'Risk it creates', 'How we close it']} rows={[
          ['No incident response plan', 'Improvised decisions during an attack', 'Breach response SOP and escalation matrix'],
          ['No log retention', 'CERT-In non-compliance and forensic dead ends', '180-day retention design and checklist'],
          ['Privacy notice not DPDP-ready', 'Rework against a fixed 2027 deadline', 'Notice redraft and readiness gap review'],
          ['Vendor contracts without security clauses', 'Third-party breach liability sits with you', 'DPA and security clause drafting'],
          ['Personal devices in use', 'Uncontrolled data leakage', 'BYOD and remote-work policy'],
          ['No MFA', 'Account takeover', 'Access control recommendations with a tracker'],
          ['VAPT report not acted on', 'A known vulnerability left open and documented', 'Remediation tracker to closure'],
          ['No retention rules', 'Every breach is larger than it needed to be', 'Retention and deletion policy'],
          ['Incident not documented', 'Weak defence and a contested insurance claim', 'Incident register and evidence file'],
          ['Regulator asks for a system audit', 'Submission delay and follow-up scrutiny', 'Audit-readiness checklist'],
          ['No board-level reporting', 'Governance gap visible in diligence', 'Management cyber risk note']
        ]} />
      </Section>

      <Section id="legal-risks" title="Cost of Ignoring It">
        <DataTable headers={['Omission', 'Consequence']} rows={[
          ['No incident reporting capability', 'CERT-In and sectoral non-compliance'],
          ['No DPDP preparation', 'A fixed 2027 deadline met in a rush, or not at all'],
          ['No logs', 'Investigation and legal defence both weakened'],
          ['Weak vendor contracts', 'Liability cannot be allocated or recovered'],
          ['No access control', 'Unauthorised employee or vendor access'],
          ['No backup', 'Recovery depends on the attacker'],
          ['No employee training', 'Phishing remains the open door'],
          ['No audit trail', 'Board and regulator questions cannot be answered'],
          ['No breach communication plan', 'Reputational damage compounded by the response']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Cyber risk assessment', 'Identify legal, technical and operational risk'],
          ['IT Act and SPDI review', 'Map current-regime obligations, including Section 43A'],
          ['CERT-In readiness', 'Six-hour reporting workflow, logs and escalation'],
          ['DPDP readiness', 'Notice, consent, safeguards, rights and breach process ahead of 2027'],
          ['Cyber policy drafting', 'The full policy set, tailored to your operations'],
          ['Incident response planning', 'Escalation matrix and breach SOP'],
          ['VAPT coordination', 'Scoping, vendor selection and remediation tracking'],
          ['Vendor risk review', 'Cloud, SaaS and outsourcing risk and contracts'],
          ['Data flow mapping', 'Personal data and system flow inventory'],
          ['Employee training material', 'Cyber awareness and phishing content'],
          ['Cyber due diligence', 'Investor, M&A and vendor onboarding review'],
          ['Regulated entity support', 'RBI, SEBI, IRDAI, IFSCA and ISNP-linked documentation'],
          ['Breach response support', 'Evidence preservation, reporting and communication review'],
          ['Contract clause review', 'Confidentiality, security, indemnity and breach terms'],
          ['Board cyber governance', 'Risk notes and management reporting'],
          ['Ticket-based tracking', 'Gaps, owners, remediation and closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Cyber security advice fails when it stops at the firewall. What decides the outcome after an incident is whether the logs exist, whether the reporting call was already decided, whether the vendor contract allocates the loss, and whether anyone can show the board knew. Those are legal questions, and they are cheap to answer in advance.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not entity-specific legal or technical advice. Commencement dates, applicability thresholds and sectoral obligations change, and which obligations apply to you depends on your entity type, sector, data and contracts. Statutory positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides compliance mapping, documentation, policy drafting and coordination support; technical testing is performed by specialist partners and court appearance is through enrolled advocates. Confirm the current position before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
