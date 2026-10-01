'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'structure', title: 'The Structure Decides Everything' },
  { id: 'structures-compared', title: 'Comparing the Structures' },
  { id: 'diligence', title: 'Legal Due Diligence' },
  { id: 'deal-breakers', title: 'What Diligence Actually Finds' },
  { id: 'scheme', title: 'The NCLT Scheme Route' },
  { id: 'cci', title: 'CCI and the Deal Value Threshold' },
  { id: 'sebi', title: 'Listed Targets and the Takeover Code' },
  { id: 'fema', title: 'FEMA and Foreign Investment' },
  { id: 'sectoral', title: 'Regulated Targets' },
  { id: 'documents-deal', title: 'The Transaction Documents' },
  { id: 'cp-closing', title: 'Conditions Precedent and Closing' },
  { id: 'price', title: 'Price Adjustment and Protection' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How a Deal Runs' },
  { id: 'post-closing', title: 'Post-Closing Integration' },
  { id: 'common-issues', title: 'Where Deals Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What counts as M&A?', 'Any transaction by which control or ownership of a business changes hands — a share acquisition, an asset or business purchase, a slump sale, an amalgamation or a court-sanctioned scheme. The commercial label matters far less than the legal structure chosen.'],
  ['Which structure should we use?', 'It depends on what the buyer actually wants: the company with all its history, or the business without it. A share purchase takes the entity and its liabilities; an asset or business purchase can leave defined liabilities behind. Tax, stamp duty, approvals and timeline all follow from that choice.'],
  ['What is a slump sale?', 'The transfer of an undertaking as a going concern for a lump-sum consideration without values being assigned to individual assets. It has its own tax treatment under Section 50B of the Income-tax Act.'],
  ['When is an NCLT scheme needed?', 'Where the transaction is a merger, amalgamation or arrangement under Sections 230 to 232 of the Companies Act. A straightforward share purchase between willing parties does not need one.'],
  ['Why would anyone choose the slower scheme route?', 'Because a Tribunal-sanctioned scheme transfers the undertaking as a whole by operation of the order, including contracts and litigation, without individual assignments and consents. For a business with hundreds of contracts, that can be worth the delay.'],
  ['What is legal due diligence?', 'A structured review of the target — corporate records, contracts, litigation, employment, property, intellectual property, regulatory standing, tax and compliance — to establish what the buyer is actually acquiring and what it should be protected against.'],
  ['What does diligence usually find?', 'Rarely a single catastrophe. Usually a pattern: unsigned or expired contracts, change-of-control clauses that require counterparty consent, undocumented related-party dealings, unregistered charges, employment misclassification, IP that was never assigned by the people who created it, and statutory filings in arrears.'],
  ['What is a change of control clause?', 'A contractual term allowing a counterparty to terminate or renegotiate if ownership of the company changes. In a share purchase these can quietly destroy the value being bought, and finding them is a core diligence objective.'],
  ['When is CCI approval required?', 'Where the transaction is a combination crossing the prescribed thresholds and no exemption applies. The asset and turnover tests are the traditional route, and the deal value threshold introduced by the 2023 amendment adds another.'],
  ['What is the deal value threshold?', 'A transaction valued above two thousand crore rupees requires CCI approval where the target has substantial business operations in India. Importantly, the de minimis exemption for small targets does not rescue a transaction that crosses it — so a deal can be notifiable even where the target looks far too small on the old tests.'],
  ['What is gun-jumping?', 'Implementing a notifiable combination before CCI approval. It carries penalty exposure, so where a filing is required the standstill obligation has to be respected — including in how the parties behave commercially before closing.'],
  ['What is the green channel?', 'A route allowing deemed approval on filing for combinations with no horizontal, vertical or complementary overlaps, on self-assessment. It is fast, and the self-assessment has to be right.'],
  ['When does the SEBI takeover code apply?', 'Where the target is a listed company. Acquiring shares or voting rights above the prescribed threshold, or acquiring control, triggers an open offer obligation under the SAST Regulations, alongside disclosure requirements.'],
  ['What about insider trading rules?', 'A deal generates unpublished price sensitive information from an early stage. Structured digital databases, trading window closures and confidentiality arrangements are compliance obligations, not optional good practice.'],
  ['When does FEMA come in?', 'Wherever a non-resident is on either side — as buyer, seller or existing shareholder. Sectoral caps, the entry route, pricing guidelines and reporting in the prescribed forms all need to be addressed before the structure is fixed.'],
  ['What if the target is regulated?', 'An RBI, SEBI, IRDAI or IFSCA regulated target brings change-in-control approval, fit-and-proper assessment of the incoming shareholders and directors, and often a long lead time. That approval frequently sets the deal timetable.'],
  ['What are representations and warranties?', 'Statements by the seller about the target, breach of which gives the buyer a claim. They allocate risk for matters diligence could not fully resolve, and are the most negotiated part of most agreements.'],
  ['What is an indemnity?', 'A contractual promise to compensate for a specified loss, typically for known or identified risks found in diligence, often with its own limits and survival period separate from the warranties.'],
  ['What is an escrow or holdback?', 'A portion of the consideration retained or held by a third party for a period, available to meet warranty or indemnity claims. It is the practical answer to a seller who may be hard to recover from after closing.'],
  ['What are conditions precedent?', 'Things that must happen before closing — regulatory approvals, third-party consents, board and shareholder resolutions, release of security, and rectification of diligence findings. Managing them is most of the work between signing and closing.'],
  ['How long does a deal take?', 'Anything from weeks for a small private share purchase to many months where a scheme, CCI filing, sectoral approval or listed-company process is involved. The regulatory path, not the negotiation, usually sets the timetable.'],
  ['What is a non-compete?', 'A restriction on the seller competing with the business sold. Indian law restricts agreements in restraint of trade, with a recognised exception for the sale of goodwill within reasonable limits, so the drafting needs care.'],
  ['What happens to employees?', 'It depends on the structure. In a share purchase employment continues with the same employer; in a business transfer, employee transfer, continuity of service and consent become live issues with statutory consequences.'],
  ['What is the biggest mistake?', 'Signing a term sheet that fixes price and structure before diligence has established what is being bought, and before anyone has mapped the approvals. Everything after that is renegotiation.'],
  ['Can Estabizz run the transaction?', 'We handle structure comparison, due diligence, transaction documentation, regulatory mapping across CCI, SEBI, FEMA and sectoral regulators, conditions precedent management, closing and post-closing compliance. Appearance before any Tribunal is through advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Corporate Transactions' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Mergers and Acquisitions' }]}
      title="Mergers and Acquisitions"
      readTime="17 min read"
      hideReviewBadge
      focusKeyword="Mergers and Acquisitions"
      sections={sections}
      ctaTitle="Speak With a Transaction Expert"
      ctaDescription="Structure settled against tax and approvals, diligence that finds the change-of-control clauses, and a closing checklist that actually closes."
      quickFacts={[
        { label: 'Decided first', value: 'Structure' },
        { label: 'Scheme route', value: 'Sections 230–232' },
        { label: 'CCI deal value', value: '₹2,000 crore' },
        { label: 'Sets the timetable', value: 'Approvals' }
      ]}
      relatedArticles={[
        { title: 'Demerger', href: '/solutions/legal/demerger', category: 'Legal', description: 'Separating a business undertaking — scheme of arrangement, NCLT process and tax neutrality.' },
        { title: 'Legal Due Diligence', href: '/services/legal-due-diligence', category: 'Legal', description: 'Comprehensive legal due diligence for mergers, acquisitions and investment transactions.' },
        { title: 'Directors Disqualification', href: '/solutions/legal/directors-disqualification', category: 'Legal', description: 'Section 164 defaults and DIN status — a standard diligence finding that stalls transactions.' }
      ]}
      finalCtaTitle="Fix the Structure Before the Term Sheet"
      finalCtaDescription="Price and structure agreed before diligence and before the approvals are mapped is not a deal — it is a position that will be renegotiated once someone reads the contracts."
      heroDescription={<p>Most transactions that go badly were mispriced at the term sheet, because the structure was chosen before anyone established what was actually being bought or which approvals would govern the timetable. A share purchase takes the company with all of its history; an asset purchase can leave defined liabilities behind; a court-sanctioned scheme moves an undertaking whole but takes months. Estabizz assists acquirers, targets, promoters, investors and group companies with structure comparison, legal due diligence, transaction documentation, regulatory mapping across the Companies Act, CCI, SEBI, FEMA and sectoral regulators, conditions precedent management, closing mechanics and post-closing compliance.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> an M&amp;A transaction moves ownership or control of a business from one party to another, and the legal work is about what exactly moves, what stays behind, and who carries the risk for what.</p>
        <p>The commercial conversation is usually about price. The legal outcome is usually decided by structure, diligence and the approval map — and all three should be settled before the term sheet hardens.</p>
        <p>For separating a business rather than combining one, see <Link href="/solutions/legal/demerger">Demerger</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>M&amp;A is not a licence. It is a transaction, and which laws govern it depends entirely on the structure, the parties and the sector.</p>
        <p>Depending on the deal it can involve the Companies Act and the NCLT, the Income-tax Act, the Competition Act and the CCI, SEBI where a listed company is involved, FEMA where a non-resident is on either side, State stamp law, and a sector regulator.</p>
      </Section>

      <Section id="structure" title="The Structure Decides Everything">
        <div className="info-box" aria-label="Structure first">
          <p><strong>Every other question follows from the structure.</strong> Tax treatment, stamp duty, which approvals are needed, how long it takes, whether contracts transfer automatically, what happens to employees, and which liabilities the buyer inherits — all of it is determined by whether you are buying shares, buying a business, or merging entities. Agreeing a price before settling the structure means agreeing a price for something not yet defined.</p>
        </div>
        <DataTable headers={['Question', 'Why it drives the structure']} rows={[
          ['Does the buyer want the entity or the business?', 'Shares bring the history; assets can leave it behind'],
          ['How many contracts are there?', 'Hundreds of assignments may make a scheme worth the delay'],
          ['Are there change-of-control clauses?', 'They can make a share purchase the risky option'],
          ['What are the known liabilities?', 'Asset purchase can ring-fence them'],
          ['Is the target regulated?', 'Change-in-control approval may dictate the route'],
          ['Are there accumulated losses worth preserving?', 'Tax position differs sharply by structure'],
          ['Is immovable property involved?', 'Stamp duty exposure differs significantly'],
          ['Is a non-resident on either side?', 'FEMA pricing and reporting shape what is possible'],
          ['How fast does the deal need to close?', 'A scheme is measured in months']
        ]} />
      </Section>

      <Section id="structures-compared" title="Comparing the Structures">
        <DataTable headers={['Point', 'Share purchase', 'Business or asset purchase', 'Scheme of merger']} rows={[
          ['What transfers', 'The company, with everything in it', 'Defined assets and liabilities', 'The undertaking, by operation of the order'],
          ['Liabilities', 'Inherited, including unknown ones', 'Only those expressly assumed', 'As the scheme provides'],
          ['Contracts', 'Continue with the same entity', 'Require assignment and often consent', 'Transfer under the order'],
          ['Court approval', 'Not required', 'Not required', 'NCLT sanction required'],
          ['Typical timeline', 'Weeks to months', 'Weeks to months', 'Several months or longer'],
          ['Tax', 'Capital gains for the seller', 'Slump sale or itemised, depending on structure', 'Can be tax-neutral if conditions are met'],
          ['Stamp duty', 'On share transfer', 'Can be significant, especially with property', 'On the order, State-specific'],
          ['Employees', 'Continue with the same employer', 'Transfer and consent issues arise', 'As the scheme provides'],
          ['Best where', 'The entity and its history are wanted', 'Liabilities must be left behind', 'Many contracts, or entities being combined']
        ]} />
      </Section>

      <Section id="diligence" title="Legal Due Diligence">
        <DataTable headers={['Workstream', 'What is examined']} rows={[
          ['Corporate', 'Incorporation, MOA and AOA, share capital history, registers, filings'],
          ['Share capital and cap table', 'Allotments, transfers, options, convertible instruments'],
          ['Board and governance', 'Resolutions, authority, related-party approvals'],
          ['Material contracts', 'Terms, duration, change of control, termination, exclusivity'],
          ['Customer and supplier concentration', 'Dependence on a few counterparties'],
          ['Litigation', 'Pending, threatened and contingent liabilities'],
          ['Employment', 'Contracts, classification, statutory dues, key-person retention'],
          ['Property', 'Title, leases, registration and encumbrances'],
          ['Intellectual property', 'Ownership, registration, assignment from creators'],
          ['Regulatory and licensing', 'Validity, conditions and transferability'],
          ['Tax', 'Returns, assessments, disputes and exposures'],
          ['Finance and charges', 'Borrowings, security, covenants and charge registration'],
          ['Data and technology', 'Privacy compliance, security posture and vendor terms'],
          ['Insurance', 'Coverage and claims history'],
          ['Director and promoter status', 'Disqualification and DIN position']
        ]} />
      </Section>

      <Section id="deal-breakers" title="What Diligence Actually Finds">
        <p>Genuine deal-breakers are rare. What diligence usually produces is a list of things that reprice the deal or add conditions — and the same items appear repeatedly.</p>
        <DataTable headers={['Finding', 'Why it matters', 'Usual resolution']} rows={[
          ['Change-of-control clauses in key contracts', 'Counterparties can exit on the deal', 'Consents as conditions precedent'],
          ['IP never assigned by founders or contractors', 'The company may not own its core asset', 'Assignment deeds before closing'],
          ['Unregistered or unsatisfied charges', 'Security position unclear', 'Rectification and lender confirmations'],
          ['Statutory filings in arrears', 'Penalty exposure and director risk', 'Filings completed, often at seller cost'],
          ['Director disqualification or DIN issues', 'Signatories cannot act', 'Status review and regularisation'],
          ['Employment misclassification', 'Statutory dues and contingent liability', 'Indemnity and remediation'],
          ['Related-party transactions undocumented', 'Governance and tax exposure', 'Documentation and disclosure'],
          ['Licences not transferable', 'Business cannot operate post-closing', 'Fresh applications, or structure change'],
          ['Property title defects or unregistered leases', 'Occupation at risk', 'Rectification or price adjustment'],
          ['Pending tax assessments', 'Quantum unknown', 'Specific indemnity with escrow'],
          ['Litigation not disclosed', 'Trust issue as much as a liability', 'Specific indemnity and renegotiation']
        ]} />
      </Section>

      <Section id="scheme" title="The NCLT Scheme Route">
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Structure and valuation', 'Share exchange ratio established'],
          ['Scheme drafting', 'Transfer, appointed date, consideration and conditionality'],
          ['Board approval', 'Resolutions and authorisations'],
          ['First motion', 'Application to the NCLT for directions on meetings'],
          ['Meetings or dispensation', 'Members and creditors, as directed'],
          ['Notices to authorities', 'ROC, Regional Director, Official Liquidator, Income Tax and others'],
          ['Regulatory observations', 'Responded to before sanction'],
          ['Second motion', 'Petition for sanction'],
          ['Sanction order', 'The Tribunal approves the scheme'],
          ['ROC filing', 'Certified order filed; the scheme becomes effective'],
          ['Implementation', 'Share allotment, accounting and record updates']
        ]} />
        <p>The process mirrors the demerger route in reverse. The detail of the Tribunal process, tax conditions and approvals is covered on the <Link href="/solutions/legal/demerger">Demerger</Link> page and applies equally here.</p>
      </Section>

      <Section id="cci" title="CCI and the Deal Value Threshold">
        <div className="warning-box" aria-label="Deal value threshold">
          <p><strong>The threshold analysis changed and is still being missed.</strong> Alongside the traditional asset and turnover tests, a transaction valued above <strong>two thousand crore rupees</strong> requires CCI approval where the target has substantial business operations in India. Critically, the de minimis exemption for small targets does <em>not</em> rescue a transaction that crosses this threshold — so a deal involving a target with modest revenue can still be notifiable. Deals structured on pre-2023 assumptions are the ones at risk.</p>
        </div>
        <DataTable headers={['Check', 'What to assess']} rows={[
          ['Asset and turnover tests', 'Parties and group thresholds'],
          ['Deal value threshold', 'Value above ₹2,000 crore with substantial Indian operations'],
          ['Substantial business operations', 'Indian users or turnover against the prescribed tests'],
          ['De minimis exemption', 'Available on the traditional tests, not against the deal value threshold'],
          ['Green channel', 'Deemed approval on filing where there is no overlap'],
          ['Standstill obligation', 'No implementation before approval where a filing is required'],
          ['Gun-jumping', 'Penalty exposure, including for pre-closing conduct'],
          ['Timing', 'Build the filing and review period into the timetable'],
          ['Remedies', 'The CCI may require modifications where there is a concern']
        ]} />
      </Section>

      <Section id="sebi" title="Listed Targets and the Takeover Code">
        <DataTable headers={['Issue', 'What applies']} rows={[
          ['Open offer trigger', 'Acquisition of shares or voting rights above the prescribed threshold'],
          ['Control', 'Acquiring control triggers an offer irrespective of shareholding'],
          ['Creeping acquisition', 'Incremental acquisition within a financial year, within limits'],
          ['Offer size and price', 'Determined under the SAST Regulations'],
          ['Disclosures', 'On crossing prescribed thresholds'],
          ['Merchant banker', 'Required for the open offer process'],
          ['Scheme of arrangement for a listed company', 'Stock exchange and SEBI observation process before the NCLT petition'],
          ['Unpublished price sensitive information', 'Insider trading framework applies from an early stage'],
          ['Structured digital database', 'Maintained for those with access to the information'],
          ['Trading window', 'Closure and restrictions during the deal'],
          ['Delisting', 'A separate regulatory process if contemplated']
        ]} />
      </Section>

      <Section id="fema" title="FEMA and Foreign Investment">
        <DataTable headers={['Issue', 'What to review']} rows={[
          ['Sectoral cap', 'Whether the sector permits the proposed foreign holding'],
          ['Entry route', 'Automatic or government approval'],
          ['Pricing guidelines', 'Valuation floor or cap depending on direction of transfer'],
          ['Reporting', 'FC-GPR, FC-TRS and other filings within prescribed timelines'],
          ['Downstream investment', 'Where an Indian entity with foreign investment acquires'],
          ['Deferred consideration', 'Permitted within the prescribed framework'],
          ['Share swap', 'Valuation and reporting requirements'],
          ['Investment from land-bordering countries', 'Prior government approval requirement'],
          ['Beneficial ownership', 'Ultimate ownership and control mapping'],
          ['Round-tripping concerns', 'Structure reviewed for substance']
        ]} />
        <p>Deal with FEMA before the structure is fixed. Pricing and reporting breaches are awkward to correct after consideration has moved.</p>
      </Section>

      <Section id="sectoral" title="Regulated Targets">
        <DataTable headers={['Sector', 'What the approval involves']} rows={[
          ['NBFC', 'RBI prior approval for change in control, fit-and-proper assessment'],
          ['Payment business', 'RBI authorisation conditions and continuity'],
          ['Insurance intermediary', 'IRDAI approval and registration update'],
          ['SEBI intermediary', 'Registration, fit-and-proper and change-in-control'],
          ['IFSCA entity', 'IFSC approval route'],
          ['Telecom', 'Authorisation conditions under the current framework'],
          ['Pharmaceuticals and healthcare', 'Licence transferability and facility approvals'],
          ['Food business', 'FSSAI licence position'],
          ['Defence and strategic sectors', 'Additional approvals and conditions'],
          ['Practical point', 'The regulator, not the parties, usually sets the closing date']
        ]} />
        <div className="info-box" aria-label="Licence transferability">
          <p><strong>A licence does not necessarily move with the business.</strong> In a share purchase the entity keeps its licences, which is often the reason that structure is chosen for a regulated target — but change-in-control approval may still be required. In an asset or business purchase, the buyer may need fresh registrations entirely. Establish this before the structure is fixed, not during conditions precedent.</p>
        </div>
      </Section>

      <Section id="documents-deal" title="The Transaction Documents">
        <DataTable headers={['Document', 'What it does']} rows={[
          ['Non-disclosure agreement', 'Protects information shared in diligence'],
          ['Term sheet or letter of intent', 'Records the commercial framework, usually non-binding in part'],
          ['Exclusivity agreement', 'Prevents the seller shopping the deal'],
          ['Share purchase agreement', 'The principal document in a share deal'],
          ['Business transfer agreement', 'For a slump sale or asset purchase'],
          ['Scheme of arrangement', 'Where the NCLT route is used'],
          ['Shareholders agreement', 'Governance, transfer restrictions and exit, post-closing'],
          ['Disclosure letter', 'Qualifies the warranties against known facts'],
          ['Escrow agreement', 'Holds back part of the consideration'],
          ['Non-compete and non-solicit', 'Restricts the seller, within enforceable limits'],
          ['Employment and retention agreements', 'For key people'],
          ['Assignment and novation documents', 'Where contracts must move'],
          ['Board and shareholder resolutions', 'Authority for the transaction'],
          ['Closing memorandum', 'Records what was delivered and when']
        ]} />
      </Section>

      <Section id="cp-closing" title="Conditions Precedent and Closing">
        <DataTable headers={['Condition', 'Typical content']} rows={[
          ['Regulatory approvals', 'CCI, sectoral regulator, government route under FEMA'],
          ['Third-party consents', 'Change-of-control counterparties and lenders'],
          ['Corporate approvals', 'Board and shareholder resolutions'],
          ['Release of security', 'Charges satisfied and confirmations obtained'],
          ['Rectification of diligence findings', 'Specified items fixed before closing'],
          ['No material adverse change', 'Between signing and closing'],
          ['Warranties repeated at closing', 'Bring-down of the representations'],
          ['Resignations and appointments', 'Board reconstitution at closing'],
          ['Delivery of documents', 'Share transfer forms, registers, seals and records'],
          ['Payment mechanics', 'Funds flow, escrow and holdbacks'],
          ['Closing checklist', 'Who delivers what, in what order']
        ]} />
        <div className="warning-box" aria-label="CP management">
          <p><strong>Most deals that drift are drifting on conditions precedent.</strong> A signed agreement with twenty-three conditions and no owner against each one will sit for months. Assign each condition to a named person on a dated plan at signing, and review it weekly — that single discipline closes more transactions on time than any drafting improvement.</p>
        </div>
      </Section>

      <Section id="price" title="Price Adjustment and Protection">
        <DataTable headers={['Mechanism', 'What it does']} rows={[
          ['Completion accounts', 'Price adjusted against actual position at closing'],
          ['Locked box', 'Price fixed on a historic balance sheet, with leakage protection'],
          ['Working capital adjustment', 'Normalises the working capital delivered'],
          ['Debt-free cash-free basis', 'Adjusts for net debt at closing'],
          ['Earn-out', 'Part of the price contingent on future performance'],
          ['Escrow or holdback', 'Security for warranty and indemnity claims'],
          ['Representations and warranties', 'Risk allocation for unknown matters'],
          ['Specific indemnities', 'For identified risks found in diligence'],
          ['Caps and baskets', 'Limits on the seller’s liability'],
          ['Survival periods', 'How long claims can be brought, by category'],
          ['Warranty and indemnity insurance', 'Where available and commercially worthwhile']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Corporate law', 'Companies Act, 2013'],
          ['Scheme route', 'Sections 230 to 232, and Section 233 for fast track'],
          ['Cross-border scheme', 'Section 234'],
          ['Procedure rules', 'Companies (Compromises, Arrangements and Amalgamations) Rules, 2016'],
          ['Tax', 'Income-tax Act, 1961, including Sections 2(1B), 47, 50B and 72A'],
          ['Competition', 'Competition Act, 2002 and the CCI (Combinations) Regulations, 2024'],
          ['Listed companies', 'SEBI LODR and SEBI SAST Regulations, 2011'],
          ['Insider trading', 'SEBI PIT Regulations'],
          ['Foreign investment', 'FEMA, the NDI Rules and the RBI framework'],
          ['Contract', 'Indian Contract Act, 1872'],
          ['Stamp duty', 'Indian Stamp Act and State stamp legislation'],
          ['Property transfer', 'Transfer of Property Act and Registration Act'],
          ['Employment', 'Applicable labour legislation'],
          ['Sector regulators', 'RBI, SEBI, IRDAI, IFSCA and others as applicable'],
          ['Insolvency context', 'IBC, 2016, where a distressed target is involved']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Companies Act Section 230', 'Compromise or arrangement with members and creditors'],
          ['Companies Act Section 232', 'Merger, amalgamation and transfer of undertaking'],
          ['Companies Act Section 233', 'Fast-track merger for eligible companies'],
          ['Companies Act Section 234', 'Cross-border schemes'],
          ['Companies Act Section 180', 'Sale or disposal of an undertaking, and shareholder approval'],
          ['Companies Act Section 188', 'Related party transactions'],
          ['Income-tax Act Section 2(1B)', 'Definition of amalgamation'],
          ['Income-tax Act Section 47', 'Transactions not regarded as transfer'],
          ['Income-tax Act Section 50B', 'Slump sale taxation'],
          ['Income-tax Act Section 72A', 'Carry forward of losses in specified cases'],
          ['Competition Act Sections 5 and 6', 'Combination thresholds and the obligation to notify'],
          ['SEBI SAST Regulations', 'Open offer triggers, pricing and disclosures'],
          ['FEMA NDI Rules', 'Sectoral caps, pricing and reporting'],
          ['Contract Act Section 27', 'Restraint of trade, with the goodwill exception']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Incorporation documents, MOA and AOA', 'Corporate standing and constitutional restrictions'],
          ['Statutory registers and filings', 'Share capital history and compliance'],
          ['Cap table and shareholding history', 'Title to the shares being sold'],
          ['Board and shareholder resolutions', 'Authority'],
          ['Audited financial statements', 'Valuation and warranties'],
          ['Tax returns and assessment orders', 'Exposure'],
          ['Material contracts', 'Change of control and assignment'],
          ['Employment contracts and HR records', 'Liability and key-person issues'],
          ['Property documents and leases', 'Title and occupation'],
          ['IP registrations and assignments', 'Ownership of core assets'],
          ['Licences and registrations', 'Validity and transferability'],
          ['Loan and security documents', 'Consents and charge release'],
          ['Litigation list and case papers', 'Contingent liability'],
          ['Insurance policies', 'Coverage and claims'],
          ['Valuation report', 'Pricing and, where required, regulatory compliance'],
          ['CCI threshold data', 'Assets, turnover, deal value and overlap analysis']
        ]} />
      </Section>

      <Section id="process" title="How a Deal Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Objective and feasibility', 'What the buyer actually wants to acquire'],
          ['2', 'Structure comparison', 'Share, asset, slump sale or scheme'],
          ['3', 'Approval mapping', 'CCI, SEBI, FEMA, sectoral — and the resulting timetable'],
          ['4', 'NDA and term sheet', 'Commercial framework recorded'],
          ['5', 'Legal due diligence', 'Findings report with risk ranking'],
          ['6', 'Structure confirmation', 'Revisited in light of diligence'],
          ['7', 'Documentation', 'SPA or BTA, disclosure letter and ancillaries'],
          ['8', 'Negotiation', 'Warranties, indemnities, caps and escrow'],
          ['9', 'Signing', 'With a dated conditions precedent plan'],
          ['10', 'Conditions precedent', 'Approvals, consents and rectifications'],
          ['11', 'Closing', 'Deliverables, funds flow and board reconstitution'],
          ['12', 'Post-closing filings', 'ROC, FEMA reporting and registrations'],
          ['13', 'Integration', 'Contracts, licences, records and compliance'],
          ['14', 'Claims period management', 'Escrow release and warranty claims']
        ]} />
      </Section>

      <Section id="post-closing" title="Post-Closing Integration">
        <DataTable headers={['Workstream', 'What must actually happen']} rows={[
          ['ROC filings', 'Director changes, charge modifications and returns'],
          ['FEMA reporting', 'FC-TRS or FC-GPR within the prescribed timelines'],
          ['Share transfer records', 'Register of members updated, certificates issued'],
          ['Statutory registers', 'Brought current and maintained'],
          ['Bank mandates', 'Signatories updated'],
          ['Licences and registrations', 'Change intimated or fresh applications made'],
          ['Contracts', 'Counterparties notified, novations completed'],
          ['Employees', 'Communications, records and benefit continuity'],
          ['Tax registrations', 'PAN, GST and TDS positions aligned'],
          ['Insurance', 'Policies transferred or replaced'],
          ['Escrow administration', 'Claims and release tracked against the agreement'],
          ['Compliance calendar', 'The acquired entity brought into the group framework']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Deals Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Term sheet signed before diligence', 'Price renegotiated, trust damaged', 'Structure and diligence before price hardens'],
          ['Structure chosen for tax alone', 'Approvals or contracts become unworkable', 'Structure tested against all four dimensions'],
          ['Change-of-control clauses found late', 'Key contracts at risk after signing', 'Contract review early in diligence'],
          ['CCI threshold assessed on old tests', 'Notifiable deal implemented — gun-jumping risk', 'Deal value threshold analysis'],
          ['Sectoral approval underestimated', 'Closing slips by months', 'Regulator timeline drives the timetable'],
          ['FEMA pricing overlooked', 'Reporting and pricing breaches', 'Reviewed before structure is fixed'],
          ['Licences assumed transferable', 'Business cannot operate post-closing', 'Transferability confirmed upfront'],
          ['IP not assigned by founders', 'The core asset is not owned', 'Assignment as a condition precedent'],
          ['Conditions precedent without owners', 'The deal drifts', 'Dated CP plan with named owners'],
          ['Disclosure letter treated as a formality', 'Warranty claims that should not exist', 'Proper disclosure against each warranty'],
          ['No escrow against known risks', 'Nothing to recover from after closing', 'Escrow and specific indemnities'],
          ['Post-closing filings missed', 'Penalties and FEMA breaches', 'Closing checklist extended past closing']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Feasibility and structure note', 'Share, asset, slump sale or scheme compared'],
          ['Approval mapping', 'CCI, SEBI, FEMA and sectoral, with the timetable'],
          ['Legal due diligence', 'Full workstream review with a risk-ranked report'],
          ['Vendor due diligence', 'Preparing a target for sale'],
          ['Term sheet support', 'So the commercial framework does not pre-empt the structure'],
          ['Transaction documentation', 'SPA, BTA, SHA, disclosure letter and ancillaries'],
          ['Warranty and indemnity negotiation', 'Caps, baskets, survival and escrow'],
          ['NCLT scheme support', 'Where the merger route is used'],
          ['CCI filing support', 'Thresholds, green channel and notification'],
          ['SEBI and listed company support', 'Takeover code, disclosures and PIT compliance'],
          ['FEMA support', 'Pricing, route and reporting'],
          ['Sectoral approval coordination', 'RBI, SEBI, IRDAI, IFSCA and others'],
          ['Conditions precedent management', 'Dated plan with owners, tracked to closing'],
          ['Closing support', 'Deliverables, funds flow and documentation'],
          ['Post-closing compliance', 'Filings, registrations and integration'],
          ['Ticket-based tracking', 'Workstreams, approvals, CPs and closing']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The two most expensive mistakes in Indian M&A are agreeing price before structure, and assessing the CCI position on the asset and turnover tests alone. The first means renegotiating once diligence reveals what is actually being bought. The second can mean implementing a notifiable combination without approval. Both are avoided in the first fortnight, by people who have not yet drafted anything.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not transaction-specific legal, tax or valuation advice. Which structure is appropriate, what approvals are required, what thresholds apply and what a counterparty will accept depend entirely on the parties, the sector and the deal. Competition thresholds, securities regulations, foreign investment rules and tax provisions change, and the position must be confirmed at the time of the transaction. Statements here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides structuring, diligence, documentation and coordination support; valuation is performed by registered valuers and appearance before any Tribunal is through advocates. Confirm the current position with your advisers before committing to a structure.</p>
      </Section>
    </ServicePageLayout>
  );
}
