'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'whats-changed', title: 'What the 2023 Act Changed' },
  { id: 'who-does-what', title: 'TRAI, DoT and TDSAT' },
  { id: 'forum', title: 'Which Forum Hears What' },
  { id: 'notices', title: 'Answering a Regulatory Notice' },
  { id: 'tariff', title: 'Tariff Matters' },
  { id: 'interconnection', title: 'Interconnection Disputes' },
  { id: 'qos', title: 'Quality of Service' },
  { id: 'ucc', title: 'UCC, Spam and Commercial Communication' },
  { id: 'consumer', title: 'Consumer Grievance Framework' },
  { id: 'broadcasting', title: 'Broadcasting and Cable' },
  { id: 'tdsat', title: 'TDSAT Proceedings' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'who-needs', title: 'Who Needs This' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'compliance', title: 'Preventive Compliance' },
  { id: 'common-issues', title: 'Where Operators Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Estabizz Practice Note' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What does TRAI regulate?', 'The Telecom Regulatory Authority of India regulates telecom and broadcasting services — tariffs, quality of service, interconnection, consumer protection, commercial communication and related sector matters — through regulations, directions, tariff orders and recommendations.'],
  ['Which laws apply?', 'The TRAI Act, 1997 establishes the Authority and the Tribunal. The Telecommunications Act, 2023 is the principal sector statute, and the Cable Television Networks (Regulation) Act, 1995 governs much of the cable and broadcasting side.'],
  ['What did the Telecommunications Act, 2023 change?', 'It replaced the Indian Telegraph Act, 1885, the Indian Wireless Telegraphy Act, 1933 and the Telegraph Wires (Unlawful Possession) Act, 1950, consolidating the framework and amending the TRAI Act. It came into force in phases from 2024.'],
  ['Is it still a "licence"?', 'The 2023 Act moves the framework to "authorisation" rather than the older licence terminology. It is more than a renaming — it changes how entitlements to provide services and use spectrum are framed, and documents and internal references drafted under the old vocabulary should be mapped across.'],
  ['What is the difference between TRAI and DoT?', 'TRAI is the regulator — it makes regulations, sets tariff principles and issues directions. The Department of Telecommunications is the licensor and administrator on the Government side, dealing with authorisation and related conditions. They are not interchangeable, and sending the right submission to the wrong one wastes weeks.'],
  ['What is TDSAT?', 'The Telecom Disputes Settlement and Appellate Tribunal, established under the TRAI Act, which adjudicates specified disputes and hears appeals. Its jurisdiction in relation to certain matters under the 2023 Act is narrower than under the older framework, so maintainability should be checked before filing.'],
  ['Can I appeal a TRAI regulation to TDSAT?', 'The position is nuanced. The Tribunal has historically been treated differently in relation to regulations as against directions and orders, and the 2023 Act has altered parts of the landscape. Whether a particular instrument can be challenged, and where, is a threshold question worth resolving before drafting.'],
  ['What happens after a TRAI direction?', 'A direction under Section 13 of the TRAI Act is binding on the service provider to whom it is issued. Non-compliance carries consequences, so the response should be timely and substantive even where the direction is being contested.'],
  ['What is a tariff order?', 'A TRAI instrument prescribing or regulating tariffs for telecom or broadcasting services. Compliance is detailed and the reporting obligations attached to tariff filings are a common source of findings.'],
  ['What is an interconnection dispute?', 'A disagreement between service providers about the terms, charges or implementation of interconnection. These are commercially significant, technically dense, and a core part of what the Tribunal has historically handled.'],
  ['What are the quality of service obligations?', 'TRAI prescribes QoS benchmarks and periodic reporting for defined services. Failures tend to surface through reported data rather than individual complaints, which means the reporting is as important as the performance.'],
  ['What is UCC regulation?', 'The framework controlling unsolicited commercial communication — registration of senders and telemarketers, consent and preference management, headers and templates, and consequences for violations. Enterprises that send transactional or promotional messages are inside this framework whether or not they think of themselves as telecom businesses.'],
  ['Our company only sends SMS to customers. Does this apply?', 'Very likely yes, through the registration, header, template and consent requirements. A great many non-telecom businesses discover the UCC framework only when their messages stop being delivered or a complaint is escalated.'],
  ['How does a consumer complaint against an operator work?', 'Through the service provider’s own grievance mechanism in the first instance, escalating within the framework TRAI prescribes. Consumer remedies under the Consumer Protection Act may also be available depending on the facts.'],
  ['Can a consumer go straight to TRAI?', 'TRAI regulates the sector rather than adjudicating individual billing disputes. The service provider’s grievance route, and the consumer forum where appropriate, are usually the practical paths.'],
  ['Who regulates broadcasting and cable?', 'The framework spans the Cable Television Networks (Regulation) Act and the Rules, TRAI regulations and tariff orders for broadcasting and cable services, and the Ministry of Information and Broadcasting on the policy and permission side.'],
  ['What is an MSO or LCO issue typically about?', 'Interconnection agreements, carriage and placement, subscriber reporting, set-top box and SMS or CAS compliance, and disconnection disputes. The regulations prescribe the notice and process steps closely.'],
  ['What should we do on receiving a TRAI notice?', 'Identify the exact instrument it is issued under and the deadline, pull the underlying data and records, and answer the specific allegation with evidence. Generic assurances of commitment to compliance are not a response.'],
  ['Can regulatory action affect our authorisation?', 'Persistent non-compliance can have consequences for the authorisation and its conditions, which is why early and substantive responses matter more than the immediate financial exposure in most notices.'],
  ['Are the consultation papers worth engaging with?', 'Yes, and they are under-used. TRAI consults before most significant regulatory change. A reasoned submission at consultation stage is considerably cheaper than litigating the outcome afterwards.'],
  ['Do OTT services fall under this?', 'The treatment of OTT and internet-based communication services has been an active regulatory and policy question. The position depends on the service and the current framework, and should be assessed rather than assumed in either direction.'],
  ['What records should we maintain?', 'Compliance reports, QoS data, tariff filings, interconnection agreements, consent and preference records for commercial communication, grievance logs, correspondence with TRAI and DoT, and the underlying technical and billing data.'],
  ['How long do TDSAT matters take?', 'It varies with the nature of the dispute, the technical evidence and the Tribunal’s list. Interim relief is often the practically significant stage.'],
  ['What is the biggest mistake?', 'Answering a regulatory notice from the commercial team without identifying the instrument it was issued under. Half of a good response is knowing exactly which regulation, direction or tariff order you are being asked about.'],
  ['Can Estabizz appear before TDSAT?', 'We handle compliance review, notice analysis and response drafting, documentation, consultation submissions, dispute strategy and coordination. Appearance before the Tribunal or a court is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Telecom Regulatory' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'TRAI & TDSAT Legal Support' }]}
      title="TRAI & TDSAT Legal Support"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="TRAI & TDSAT Legal Support"
      sections={sections}
      ctaTitle="Speak With a Telecom Regulatory Expert"
      ctaDescription="The right forum identified, the instrument behind the notice pinned down, and a response built on your own data."
      quickFacts={[
        { label: 'Regulator', value: 'TRAI' },
        { label: 'Sector statute', value: 'Telecom Act, 2023' },
        { label: 'Tribunal', value: 'TDSAT' },
        { label: 'Licence is now', value: 'Authorisation' }
      ]}
      relatedArticles={[
        { title: 'Cyber Security Advisory', href: '/solutions/legal/cyber-security-advisory', category: 'Legal', description: 'CERT-In reporting readiness, log retention, DPDP preparation and vendor risk.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence and tribunal proceedings.' },
        { title: 'Complaints Before Consumer Court', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Consumer Protection Act, 2019 complaints — Commission, limitation, evidence and reliefs.' }
      ]}
      finalCtaTitle="Identify the Instrument Before You Reply"
      finalCtaDescription="Most weak responses to a telecom regulatory notice are weak because nobody established which regulation, direction or tariff order it was issued under. That single step reframes the whole reply."
      heroDescription={<p>Telecom and broadcasting sit inside a dense regulatory framework that changed substantially when the Telecommunications Act, 2023 replaced the colonial-era statutes and moved the sector from licences to authorisations. A tariff finding, an interconnection disagreement, a quality of service shortfall, a commercial communication violation or a TRAI direction can affect revenue, subscriber relationships and the authorisation itself. Estabizz assists telecom service providers, ISPs, broadcasters, MSOs, LCOs, DTH operators, enterprises and telemarketing businesses with compliance review, regulatory notice analysis and response, tariff and interconnection issues, quality of service and reporting obligations, UCC and commercial communication compliance, consumer grievance strategy, broadcasting and cable matters, consultation submissions and TDSAT coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> TRAI sets the rules for telecom and broadcasting services, and this is the legal support for operating inside them and for disputes when something goes wrong.</p>
        <p>The sector is unusual in how much of the obligation sits in subordinate instruments — regulations, directions, tariff orders — rather than in the parent statute. That is why identifying the exact instrument behind a notice matters so much more here than in most regulatory work.</p>
        <p>It is also wider than people expect. Any business sending bulk commercial messages is inside the commercial communication framework, whether or not it thinks of itself as a telecom company.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>This is not a licence or a registration. It is legal and regulatory support for telecom, broadcasting and TRAI-regulated matters.</p>
        <p>TRAI regulates; the Department of Telecommunications authorises and administers on the Government side; TDSAT adjudicates specified disputes and appeals. Knowing which of the three you are dealing with is the first practical question in almost every matter.</p>
      </Section>

      <Section id="whats-changed" title="What the 2023 Act Changed">
        <div className="info-box" aria-label="Telecommunications Act 2023">
          <p><strong>The statutory base of the sector was replaced, and a good deal of existing internal documentation still refers to the old one.</strong> The Telecommunications Act, 2023 repealed and replaced the Indian Telegraph Act, 1885, the Indian Wireless Telegraphy Act, 1933 and the Telegraph Wires (Unlawful Possession) Act, 1950, and amended the TRAI Act, 1997. It came into force in phases from 2024. Compliance manuals, agreements and board papers drafted against the Telegraph Act framework should be mapped across rather than left to age.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Principal sector statute', 'Telecommunications Act, 2023'],
          ['Repealed', 'Indian Telegraph Act, 1885; Indian Wireless Telegraphy Act, 1933; Telegraph Wires (Unlawful Possession) Act, 1950'],
          ['TRAI Act, 1997', 'Continues, as amended — TRAI and TDSAT remain constituted under it'],
          ['Entitlement to provide service', 'Framed as authorisation rather than the older licence terminology'],
          ['Spectrum', 'Assignment framework addressed in the new Act'],
          ['TDSAT', 'Continues, with jurisdiction in relation to certain matters under the new Act narrower than before'],
          ['Commencement', 'Phased, from 2024'],
          ['Practical consequence', 'Terminology, forum and procedure all need checking against the current framework rather than older precedent']
        ]} />
      </Section>

      <Section id="who-does-what" title="TRAI, DoT and TDSAT">
        <DataTable headers={['Body', 'Role', 'What it is not']} rows={[
          ['TRAI', 'Sector regulator — regulations, directions, tariff orders, recommendations, consultation', 'Not the licensor, and not a forum for individual billing disputes'],
          ['DoT', 'Government side — authorisation, conditions and administration', 'Not the sector regulator'],
          ['TDSAT', 'Tribunal — specified disputes and appeals', 'Not a general commercial court for the sector'],
          ['MIB', 'Policy and permissions on the broadcasting side', 'Not the tariff regulator'],
          ['Consumer Commissions', 'Individual consumer disputes under consumer law', 'Not a regulatory forum'],
          ['High Court', 'Writ jurisdiction in appropriate cases', 'Not the first port of call for a regulatory issue']
        ]} />
        <p>A submission sent to the wrong body is not merely delayed — it can run out a deadline that was attached to the correct one.</p>
      </Section>

      <Section id="forum" title="Which Forum Hears What">
        <DataTable headers={['Issue', 'Usual route']} rows={[
          ['Interconnection dispute between providers', 'TDSAT, subject to maintainability'],
          ['Breach of authorisation terms', 'The framework under the Telecommunications Act, with appellate recourse as provided'],
          ['Suspension or revocation of an authorisation', 'Appellate route as the current framework provides'],
          ['Challenge to a TRAI direction or order', 'Depends on the instrument — assess before filing'],
          ['Challenge to a TRAI regulation', 'Historically treated differently from directions and orders; a threshold question'],
          ['Tariff compliance dispute', 'Regulatory process, with Tribunal recourse where available'],
          ['Individual consumer billing complaint', 'Service provider grievance mechanism, then consumer forum'],
          ['Commercial communication violation', 'The UCC regulatory framework and the access provider'],
          ['Cable and broadcasting interconnection', 'TRAI regulations and TDSAT, depending on the dispute'],
          ['Constitutional or jurisdictional challenge', 'High Court, in appropriate cases']
        ]} />
      </Section>

      <Section id="notices" title="Answering a Regulatory Notice">
        <div className="warning-box" aria-label="Identify the instrument">
          <p><strong>Before drafting a word, establish exactly which instrument the notice is issued under.</strong> A notice citing a regulation, a direction under Section 13, a tariff order or an authorisation condition each calls for a different response, a different evidence set and sometimes a different forum. Responses that open with a general statement of the company&rsquo;s commitment to compliance, without engaging the specific provision and the underlying data, are read as having nothing to say.</p>
        </div>
        <DataTable headers={['Step', 'Action']} rows={[
          ['1', 'Identify the instrument and the exact provision cited'],
          ['2', 'Diarise the response deadline immediately'],
          ['3', 'Establish the period and the services the notice covers'],
          ['4', 'Pull the underlying technical, billing or subscriber data'],
          ['5', 'Reconcile that data against what was reported'],
          ['6', 'Identify whether a genuine breach occurred, and its scope'],
          ['7', 'Prepare the factual answer with supporting records'],
          ['8', 'Address remediation already undertaken, with evidence'],
          ['9', 'Seek an extension formally if the data cannot be assembled in time'],
          ['10', 'Route the response through one channel, not several teams'],
          ['11', 'Assess the consequences for the authorisation, not just the penalty'],
          ['12', 'Record the lesson in the compliance calendar']
        ]} />
      </Section>

      <Section id="tariff" title="Tariff Matters">
        <DataTable headers={['Area', 'What it involves']} rows={[
          ['Tariff orders', 'TRAI instruments prescribing or regulating tariffs'],
          ['Tariff filing and reporting', 'Timely filing in the prescribed manner'],
          ['Transparency obligations', 'Publication and disclosure of plans and charges'],
          ['Non-discrimination', 'Consistency in offering across similarly placed subscribers'],
          ['Promotional offers', 'Duration, disclosure and compliance conditions'],
          ['Forbearance areas', 'Where tariffs are not prescribed but obligations still attach'],
          ['Broadcasting tariffs', 'The separate framework for broadcasting and cable services'],
          ['Common findings', 'Reporting gaps and inconsistency between filed and offered tariffs'],
          ['Evidence to maintain', 'Filings, approvals, customer-facing material and billing data']
        ]} />
      </Section>

      <Section id="interconnection" title="Interconnection Disputes">
        <p>Interconnection is commercially decisive and technically dense, which makes early documentation far more valuable than later argument.</p>
        <DataTable headers={['Issue', 'What matters']} rows={[
          ['Terms of the interconnection agreement', 'The agreement itself is the starting point'],
          ['Charges and settlement', 'Computation, reconciliation and disputed periods'],
          ['Provisioning and augmentation', 'Requests, timelines and what was actually done'],
          ['Points of interconnection', 'Capacity, location and technical records'],
          ['Disconnection', 'Notice requirements under the applicable regulations'],
          ['Broadcasting interconnection', 'Carriage, placement and subscriber reporting'],
          ['Evidence', 'Technical logs, correspondence, reconciliation statements'],
          ['Forum', 'TDSAT, subject to the maintainability position'],
          ['Interim relief', 'Often the commercially decisive stage']
        ]} />
      </Section>

      <Section id="qos" title="Quality of Service">
        <DataTable headers={['Obligation', 'Practical note']} rows={[
          ['Prescribed benchmarks', 'Service-specific parameters set by regulation'],
          ['Periodic reporting', 'Accuracy and timeliness both matter'],
          ['Measurement methodology', 'Must follow what the regulation prescribes'],
          ['Audit and verification', 'Independent checks may apply'],
          ['Consequences of shortfall', 'Financial and regulatory, depending on the regulation'],
          ['Network data retention', 'The evidence base for any later dispute'],
          ['Customer-facing impact', 'Complaint volumes often correlate'],
          ['Most common failure', 'Reporting defects rather than underlying performance']
        ]} />
        <div className="info-box" aria-label="Reporting">
          <p><strong>A surprising share of quality of service findings are reporting failures rather than network failures.</strong> Data submitted late, computed on the wrong methodology, or inconsistent with the operator&rsquo;s own records creates a finding even where the service was performing. The fix is usually in the reporting process, not the network.</p>
        </div>
      </Section>

      <Section id="ucc" title="UCC, Spam and Commercial Communication">
        <div className="warning-box" aria-label="Scope">
          <p><strong>This framework reaches far beyond telecom operators.</strong> Any business sending bulk promotional or transactional messages — a bank, a retailer, a hospital, an app, a startup — operates inside the commercial communication regulations through registration, header and template requirements, consent and preference obligations and the access provider relationship. Most such businesses discover it only when message delivery fails or a complaint escalates.</p>
        </div>
        <DataTable headers={['Requirement', 'What it involves']} rows={[
          ['Sender registration', 'Registration of the principal entity in the prescribed manner'],
          ['Telemarketer registration', 'Where an agency sends on your behalf'],
          ['Header registration', 'The sender identifier used on messages'],
          ['Content template registration', 'Templates registered before use'],
          ['Consent acquisition and records', 'Verifiable consent, retained'],
          ['Preference and opt-out', 'Respecting registered preferences'],
          ['Transactional versus promotional', 'Classification determines what is permitted and when'],
          ['Scrubbing against preferences', 'Before dispatch'],
          ['Consequences of violation', 'Including delivery failures and action through the access provider'],
          ['Evidence to maintain', 'Consent records, templates, dispatch logs and complaint handling']
        ]} />
      </Section>

      <Section id="consumer" title="Consumer Grievance Framework">
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Complaint to the service provider', 'Through the published grievance mechanism'],
          ['Docket and tracking', 'A reference should be given and preserved'],
          ['Escalation within the provider', 'To the appellate authority the framework provides'],
          ['Regulatory oversight', 'TRAI regulates the mechanism rather than deciding individual disputes'],
          ['Consumer Commission', 'Where the dispute is a consumer dispute under consumer law'],
          ['Evidence', 'Bills, usage records, complaint references and correspondence'],
          ['For operators', 'Grievance logs and resolution timelines are themselves a compliance area']
        ]} />
        <p>For the consumer side of a dispute with a service provider, see <Link href="/solutions/legal/complaints-before-consumer-court">Complaints Before Consumer Court</Link>.</p>
      </Section>

      <Section id="broadcasting" title="Broadcasting and Cable">
        <DataTable headers={['Area', 'Framework and issues']} rows={[
          ['Cable services', 'Cable Television Networks (Regulation) Act, 1995 and the Rules'],
          ['Broadcasting tariffs', 'TRAI tariff orders for broadcasting and cable services'],
          ['Interconnection regulations', 'Carriage, placement and agreements between broadcasters, MSOs and LCOs'],
          ['Subscriber management', 'SMS and conditional access requirements'],
          ['Reporting', 'Subscriber reports and reconciliation'],
          ['Disconnection', 'Notice and process prescribed by regulation'],
          ['Content and programme code', 'Under the Cable TV framework'],
          ['Permissions', 'Through the Ministry on the policy side'],
          ['Common disputes', 'Carriage fees, placement, subscriber reporting and disconnection']
        ]} />
      </Section>

      <Section id="tdsat" title="TDSAT Proceedings">
        <DataTable headers={['Point', 'Practical position']} rows={[
          ['Constituted under', 'The TRAI Act, 1997'],
          ['What it hears', 'Specified disputes and appeals under the applicable framework'],
          ['Jurisdiction under the 2023 Act', 'Narrower in relation to certain matters than under the earlier framework'],
          ['Maintainability', 'A threshold question to resolve before filing'],
          ['Parties', 'Service providers, groups of consumers, and the Government, as the provision allows'],
          ['Interim relief', 'Frequently the commercially significant stage'],
          ['Evidence', 'Technical, billing and contractual records'],
          ['Further appeal', 'To the Supreme Court as the statute provides'],
          ['Preparation', 'The reconciliation and technical record decide most of these matters']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Regulator', 'Telecom Regulatory Authority of India'],
          ['Regulator statute', 'TRAI Act, 1997'],
          ['Sector statute', 'Telecommunications Act, 2023'],
          ['Repealed statutes', 'Telegraph Act 1885, Wireless Telegraphy Act 1933, Telegraph Wires Act 1950'],
          ['Tribunal', 'TDSAT, under the TRAI Act'],
          ['Government side', 'Department of Telecommunications'],
          ['Cable and broadcasting', 'Cable Television Networks (Regulation) Act, 1995 and Rules'],
          ['Broadcasting policy', 'Ministry of Information and Broadcasting'],
          ['Subordinate instruments', 'TRAI regulations, directions, tariff orders and consultation process'],
          ['Consumer law overlay', 'Consumer Protection Act, 2019'],
          ['Data and security overlay', 'IT Act, CERT-In directions and the DPDP framework'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['TRAI Act Section 3', 'Establishment of the Authority'],
          ['TRAI Act Section 11', 'Functions of TRAI, including recommendatory, regulatory and tariff functions'],
          ['TRAI Act Section 12', 'Power to call for information, conduct investigation and inspect'],
          ['TRAI Act Section 13', 'Power to issue directions, binding on the service provider'],
          ['TRAI Act Section 14', 'Establishment and jurisdiction of TDSAT'],
          ['TRAI Act Section 14A', 'Applications and appeals to the Tribunal'],
          ['TRAI Act Section 18', 'Appeal to the Supreme Court'],
          ['TRAI Act Section 36', 'Power to make regulations'],
          ['Telecommunications Act, 2023', 'Authorisation framework, spectrum assignment and sector administration'],
          ['Cable TV Act, 1995', 'Cable operator registration and programme and advertisement codes'],
          ['TRAI tariff orders', 'Tariff prescription, reporting and transparency'],
          ['TRAI interconnection regulations', 'Terms, charges and disconnection process'],
          ['TRAI QoS regulations', 'Benchmarks, measurement and reporting'],
          ['TRAI commercial communication regulations', 'Registration, consent, headers, templates and preferences']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs This">
        <DataTable headers={['Entity', 'Typical exposure']} rows={[
          ['Telecom service providers', 'Tariff, QoS, interconnection and authorisation conditions'],
          ['Internet service providers', 'Authorisation conditions, QoS and consumer obligations'],
          ['Broadcasters', 'Tariff orders, interconnection and reporting'],
          ['MSOs and LCOs', 'Interconnection, subscriber reporting, carriage and placement'],
          ['DTH operators', 'Tariff, subscriber management and consumer obligations'],
          ['Enterprises sending bulk messages', 'Commercial communication registration, consent and templates'],
          ['Telemarketers and aggregators', 'Registration and the access provider relationship'],
          ['Call centres', 'Commercial communication and consumer data obligations'],
          ['Technology platforms', 'Where telecom or broadcasting regulation is engaged'],
          ['New entrants', 'Authorisation framework under the 2023 Act'],
          ['Consumers and consumer groups', 'Grievance escalation and consumer remedies']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The notice, direction or order received', 'The case to be answered'],
          ['Authorisation or licence documents', 'Scope and conditions'],
          ['Interconnection agreements', 'Terms governing the dispute'],
          ['Tariff filings and approvals', 'Compliance position'],
          ['QoS reports and underlying data', 'Verification against what was reported'],
          ['Billing and subscriber records', 'The factual base'],
          ['Technical logs', 'Provisioning, capacity and performance'],
          ['Consent and preference records', 'Commercial communication compliance'],
          ['Registered headers and templates', 'UCC framework compliance'],
          ['Grievance logs and resolution records', 'Consumer obligations'],
          ['Correspondence with TRAI and DoT', 'History and context'],
          ['Prior notices and orders', 'Pattern and precedent'],
          ['Board and management approvals', 'Governance record']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Issue identification', 'What is actually in dispute, and under which instrument'],
          ['2', 'Framework mapping', 'TRAI Act, Telecommunications Act, regulation or tariff order'],
          ['3', 'Forum assessment', 'TRAI, DoT, TDSAT, consumer forum or court'],
          ['4', 'Deadline capture', 'Every date in the document, calendared'],
          ['5', 'Data and record collation', 'Technical, billing, subscriber and consent records'],
          ['6', 'Compliance gap analysis', 'Whether a breach occurred, and its scope'],
          ['7', 'Response drafting', 'Provision-specific, evidence-backed'],
          ['8', 'Remediation documentation', 'What has been fixed, and when'],
          ['9', 'Dispute strategy', 'Where the matter is to be contested'],
          ['10', 'TDSAT coordination', 'Maintainability, pleadings and counsel briefing'],
          ['11', 'Consultation submissions', 'Engaging before the rule is made'],
          ['12', 'Compliance calendar', 'Closing the gap that produced the notice']
        ]} />
      </Section>

      <Section id="compliance" title="Preventive Compliance">
        <DataTable headers={['Control', 'Why it pays']} rows={[
          ['A current regulatory register', 'Regulations, directions and tariff orders that apply to you'],
          ['Mapping to the 2023 Act framework', 'Old Telegraph Act references removed from internal documents'],
          ['Reporting calendar with owners', 'Most findings are late or defective reports'],
          ['Reconciliation before submission', 'Reported data matching source data'],
          ['Consent and template governance', 'Commercial communication compliance maintained, not retrofitted'],
          ['Grievance handling discipline', 'Logs, timelines and closure records'],
          ['Interconnection document control', 'Agreements, amendments and correspondence in one place'],
          ['Data retention policy', 'The evidence base for any later dispute'],
          ['Consultation monitoring', 'Influence the rule before it binds you'],
          ['Periodic internal audit', 'Find the gap before the regulator does']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Operators Go Wrong">
        <DataTable headers={['Mistake', 'Consequence', 'How we address it']} rows={[
          ['Instrument behind the notice not identified', 'A response that answers nothing', 'Provision-level analysis first'],
          ['Commercial team replies informally', 'Statements that bind the company', 'Single reviewed channel'],
          ['Reported data not reconciled to source', 'Findings even where performance was fine', 'Pre-submission reconciliation'],
          ['Old Telegraph Act references retained', 'Documents out of step with the current framework', 'Mapping to the 2023 Act'],
          ['Assuming TDSAT will hear it', 'Maintainability objection', 'Forum assessed before filing'],
          ['Bulk messaging treated as non-telecom', 'Delivery failures and complaints', 'UCC framework compliance built in'],
          ['Consent records not retained', 'No answer to a commercial communication complaint', 'Consent and template governance'],
          ['Interconnection correspondence scattered', 'Weak position in a technical dispute', 'Document control'],
          ['Consultation papers ignored', 'Litigating a rule you could have shaped', 'Consultation monitoring and submissions'],
          ['Deadline missed while assembling data', 'Avoidable adverse finding', 'Extension sought formally and early']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Regulatory compliance review', 'What applies to your services, and where the gaps are'],
          ['Framework mapping', 'TRAI Act and Telecommunications Act, 2023 position'],
          ['Notice analysis and response', 'Provision-specific, evidence-backed replies'],
          ['Tariff compliance support', 'Filings, transparency and reporting'],
          ['Interconnection support', 'Agreements, reconciliation and dispute preparation'],
          ['Quality of service support', 'Benchmarks, methodology and reporting discipline'],
          ['UCC and commercial communication', 'Registration, consent, headers and templates'],
          ['Consumer grievance framework', 'Mechanism design and escalation handling'],
          ['Broadcasting and cable support', 'Tariff, interconnection and subscriber reporting'],
          ['TDSAT coordination', 'Maintainability, documentation and counsel briefing'],
          ['Consultation submissions', 'Reasoned responses to TRAI consultation papers'],
          ['DoT coordination', 'Authorisation conditions and correspondence'],
          ['Compliance calendar', 'Owners, deadlines and evidence'],
          ['Ticket-based tracking', 'Notices, responses, filings and outcomes']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Estabizz Practice Note">
        <p>{"Telecom regulation lives in the subordinate instruments, not the parent statute, so the first question on any notice is which regulation, direction or tariff order it was issued under — and the second is whether your reported data actually reconciles to your source data. Most findings we see are reporting failures rather than service failures, and most weak responses were written before anyone answered the first question."}</p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not entity-specific regulatory advice. Telecom and broadcasting regulation changes frequently through regulations, directions, tariff orders and amendments, and the commencement position under the Telecommunications Act, 2023 has been phased. Which obligations apply, which forum is competent and what a particular instrument requires depend on your services, your authorisation and the current framework. Positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides regulatory review, documentation, drafting and coordination support; appearance before the Tribunal or a court is through enrolled advocates. Confirm the current position before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
