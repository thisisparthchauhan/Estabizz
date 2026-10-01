'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'key-terms', title: 'The Vocabulary That Matters' },
  { id: 'why', title: 'Why Companies Demerge' },
  { id: 'structures', title: 'Types of Demerger' },
  { id: 'route-choice', title: 'Demerger, Merger, Slump Sale or Transfer' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'process', title: 'The NCLT Process' },
  { id: 'scheme', title: 'Scheme of Arrangement Clauses' },
  { id: 'tax', title: 'Tax Neutrality Is Not Automatic' },
  { id: 'valuation', title: 'Valuation and Share Entitlement' },
  { id: 'sebi', title: 'Listed Company Demerger' },
  { id: 'cci', title: 'CCI and the Deal Value Threshold' },
  { id: 'fema', title: 'FEMA and Cross-Border Elements' },
  { id: 'stamp', title: 'Stamp Duty' },
  { id: 'regulated', title: 'Regulated Businesses and Licences' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'family', title: 'Family Business Restructuring' },
  { id: 'common-issues', title: 'Where Demergers Go Wrong' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a demerger?', 'A corporate restructuring in which one or more undertakings of a company are separated and transferred to another company, usually through a court-sanctioned scheme of arrangement.'],
  ['Is it a licence?', 'No. It is a restructuring process. It is not registered or licensed, but it generally requires NCLT sanction and a series of regulatory filings.'],
  ['Which provisions govern it?', 'Sections 230 to 232 of the Companies Act, 2013 for the scheme route, read with the Companies (Compromises, Arrangements and Amalgamations) Rules, 2016. Section 233 provides a fast-track route in eligible cases and Section 234 covers cross-border schemes.'],
  ['Is NCLT approval always required?', 'For a scheme-based demerger, yes. The fast-track route under Section 233 avoids the full Tribunal process for eligible companies, but eligibility is narrow and should be confirmed before it is assumed.'],
  ['What is the difference between the appointed date and the effective date?', 'The appointed date is the date from which the scheme takes effect for accounting and commercial purposes. The effective date is when the scheme becomes legally operative, after the certified order is filed with the ROC. The gap between them is routine and needs to be handled deliberately in the accounts.'],
  ['What is the demerged company and what is the resulting company?', 'The demerged company is the one from which the undertaking is separated. The resulting company is the one that receives it.'],
  ['Is a demerger tax-free?', 'Not automatically, and this is the single most expensive misconception in this area. Tax neutrality depends on satisfying every condition in Section 2(19AA) of the Income-tax Act. Miss one and the transfer can be taxed as a transfer.'],
  ['What are the main tax-neutrality conditions?', 'Broadly: the undertaking transfers as a going concern, all its property and liabilities move to the resulting company, the transfer is generally at book value, the resulting company issues shares to the demerged company’s shareholders on a proportionate basis, and the prescribed shareholder continuity is maintained. The section should be worked through line by line against the draft scheme.'],
  ['Can accumulated losses be carried forward?', 'In eligible cases, subject to Section 72A and the conditions in it. This should be confirmed before the scheme is drafted rather than discovered afterwards.'],
  ['Is a valuation required?', 'Generally yes, to support the share entitlement ratio. For listed entities a fairness opinion is typically required in addition.'],
  ['What is the share entitlement ratio?', 'The ratio in which shareholders of the demerged company receive shares in the resulting company. It is the most common source of shareholder objection, which is why the valuation basis needs to be defensible.'],
  ['Is shareholder approval required?', 'Usually, at meetings convened as the Tribunal directs, with approval by the statutory majority. Dispensation of meetings is possible in appropriate cases, typically where consents are already on record.'],
  ['What about creditors?', 'Creditors may need to be given notice or to approve, depending on the Tribunal’s directions and the structure. An unmapped creditor list is a common cause of objection and delay.'],
  ['Which authorities get notice?', 'Typically the ROC, the Regional Director, the Official Liquidator and the Income Tax Department, plus SEBI and the stock exchanges for listed entities, and sector regulators where relevant. Their observations are dealt with before sanction.'],
  ['Is SEBI approval needed for a listed company?', 'A listed-entity scheme goes through the stock exchanges and SEBI under Regulation 37 of the LODR Regulations and the SEBI master circular on schemes of arrangement, resulting in an observation or no-objection letter before the NCLT petition.'],
  ['Is CCI approval required?', 'Only where the transaction is a combination crossing the prescribed thresholds and no exemption applies. Note that the deal value threshold introduced by the 2023 amendment can catch a transaction even where the target is small enough that the de minimis exemption would otherwise have applied.'],
  ['What is gun-jumping?', 'Implementing a notifiable combination before CCI approval. It carries penalty exposure, so where a filing is required the standstill obligation must be respected.'],
  ['When does FEMA come in?', 'Where there are non-resident shareholders, foreign investment, share allotment to non-residents, cross-border assets or downstream investment. Pricing and reporting should be reviewed before the scheme is finalised, because post-facto correction is difficult.'],
  ['Is stamp duty payable?', 'Commonly yes. The NCLT order may itself be treated as an instrument, and duty varies by State and by the nature and location of the assets. It should be budgeted at the structuring stage, not discovered at implementation.'],
  ['Can a regulated business be demerged?', 'Often, but a licence does not travel automatically with the undertaking. RBI, SEBI, IRDAI or IFSCA approval, change-in-control clearance and fit-and-proper review may all be required, and this should be confirmed before the structure is fixed.'],
  ['How long does a demerger take?', 'It varies widely with Tribunal workload, the number of companies, listed status, valuation, meetings, regulator observations and objections. Anyone offering a confident timeline at the outset is guessing.'],
  ['Can a demerger be used for a family settlement?', 'Yes, and it is one of the most common uses. It works best when supported by family settlement documentation, shareholder agreements and governance terms, so the separation holds.'],
  ['What happens after the order?', 'The certified order is filed with the ROC, shares are allotted, accounting entries are passed, and then the long tail: PAN and GST, licences, bank accounts, contracts, employee records and statutory registers.'],
  ['What is the biggest mistake?', 'Drafting the scheme first. Undertaking mapping, valuation readiness, the creditor list, tax conditions and the regulatory trigger review should all precede the draft, because each of them can change what the scheme has to say.'],
  ['Can Estabizz handle the whole process?', 'We assist with feasibility and structure comparison, undertaking mapping, due diligence, valuation coordination, scheme drafting support, NCLT process support, SEBI, CCI and FEMA review, ROC filing and post-demerger compliance. Appearance before the Tribunal is through advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Corporate Restructuring' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Demerger' }]}
      title="Demerger"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Demerger"
      sections={sections}
      ctaTitle="Speak With a Restructuring Expert"
      ctaDescription="Confirm the structure, the tax conditions and the approval map before a single page of the scheme is drafted."
      quickFacts={[
        { label: 'Scheme route', value: 'Sections 230–232' },
        { label: 'Forum', value: 'NCLT, two motions' },
        { label: 'Tax neutrality', value: 'Section 2(19AA)' },
        { label: 'Decided first', value: 'Structure, not drafting' }
      ]}
      relatedArticles={[
        { title: 'Appeal Before NCLT', href: '/solutions/legal/appeal-before-nclt', category: 'Legal', description: 'Company petitions, restoration, oppression and mismanagement, IBC applications and NCLAT appeals.' },
        { title: 'Legal Due Diligence', href: '/services/legal-due-diligence', category: 'Legal', description: 'Comprehensive due diligence for mergers, acquisitions and investment transactions.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="Structure First, Scheme Second"
      finalCtaDescription="Most demerger delay is created before the first filing, by drafting a scheme around a structure that the tax conditions, the creditor position or a sector regulator was never going to support."
      heroDescription={<p>A demerger separates a business undertaking from the company that built it and moves it into another company, usually through a scheme of arrangement sanctioned by the NCLT. Done well, it unlocks value, lets a vertical raise its own capital, isolates regulatory risk and settles family or promoter questions cleanly. Done without preparation, it runs into tax exposure, creditor objection, a licence that will not transfer or a stamp duty bill nobody budgeted. Estabizz assists companies, promoters, family groups, listed entities, NBFCs, fintechs and investors with feasibility and structure comparison, undertaking mapping, due diligence, valuation coordination, scheme drafting support, NCLT process support, SEBI, CCI and FEMA review, stamp duty planning and post-demerger compliance.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a demerger takes one business division out of a company and puts it into another company, with the shareholders generally receiving shares in the new company.</p>
        <p>Companies reach for it when verticals that grew up together stop belonging together — because one needs outside investment, one is regulated and one is not, one is being prepared for sale or listing, or because the family behind them wants to separate control.</p>
        <p>It is best treated as a project with legal, tax, valuation, regulatory and operational workstreams running in parallel, rather than as a filing. The scheme is the last thing to write, not the first.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A demerger is not a licence. It is a restructuring, usually implemented through a scheme of arrangement under the Companies Act, 2013 and sanctioned by the NCLT.</p>
        <p>Depending on the parties and the structure, it can involve the MCA and ROC, the Regional Director, the Official Liquidator, the Income Tax Department, SEBI and the stock exchanges, the CCI, the RBI under FEMA, State stamp authorities and a sector regulator. Which of those apply is the first question to answer, because each one carries its own lead time.</p>
      </Section>

      <Section id="key-terms" title="The Vocabulary That Matters">
        <DataTable headers={['Term', 'What it means']} rows={[
          ['Demerged company', 'The existing company from which the undertaking is separated'],
          ['Resulting company', 'The company that receives the demerged undertaking'],
          ['Undertaking', 'The business division transferred, with its assets, liabilities, contracts and employees'],
          ['Scheme of arrangement', 'The legal document setting out the whole restructuring'],
          ['Appointed date', 'The date from which the scheme takes effect for accounting and commercial purposes'],
          ['Effective date', 'The date the scheme becomes legally operative, after the order is filed with the ROC'],
          ['Share entitlement ratio', 'The ratio in which shareholders receive shares in the resulting company'],
          ['First and second motion', 'The two stages of the NCLT process — directions for meetings, then sanction'],
          ['Certified copy', 'The authenticated NCLT order, which is what gets filed with the ROC']
        ]} />
      </Section>

      <Section id="why" title="Why Companies Demerge">
        <DataTable headers={['Reason', 'What it achieves']} rows={[
          ['Unlocking value', 'A vertical is valued on its own merits rather than blended into the group'],
          ['Investor readiness', 'An investor can fund one focused business without taking the rest'],
          ['Listing preparation', 'A separate entity can be made listing-ready'],
          ['Risk segregation', 'Businesses with different risk profiles stop contaminating each other'],
          ['Regulatory alignment', 'A regulated business is housed in its own entity'],
          ['Family settlement', 'Different branches take independent control of different businesses'],
          ['Succession planning', 'Verticals are allocated deliberately rather than inherited jointly'],
          ['Strategic sale', 'One vertical can be sold without disturbing the others'],
          ['Operational focus', 'Management is accountable for one business rather than several'],
          ['Debt alignment', 'Liabilities sit with the business that generates the cash to service them']
        ]} />
      </Section>

      <Section id="structures" title="Types of Demerger">
        <DataTable headers={['Type', 'Typical use']} rows={[
          ['Vertical demerger', 'One business vertical separated into another company'],
          ['Horizontal demerger', 'Several divisions separated into separate entities'],
          ['Listed company demerger', 'A listed entity separates a business, with SEBI and exchange process'],
          ['Group restructuring', 'Internal reorganisation among group companies'],
          ['Family settlement demerger', 'Separation between promoter or family branches'],
          ['Regulated business demerger', 'An RBI, SEBI, IRDAI or IFSCA regulated business moved to its own entity'],
          ['Cross-border demerger', 'A foreign shareholder, foreign asset or overseas entity is involved'],
          ['Pre-investment demerger', 'The business is cleaned up before an investor comes in'],
          ['Pre-sale demerger', 'Non-core assets separated before a sale']
        ]} />
      </Section>

      <Section id="route-choice" title="Demerger, Merger, Slump Sale or Transfer">
        <p>The first real decision is whether a demerger is the right instrument at all. A scheme is powerful because the Tribunal&rsquo;s order transfers the undertaking as a whole, including contracts and litigation, without individual assignments. It is also slower and more public than the alternatives.</p>
        <DataTable headers={['Point', 'Demerger', 'Slump sale', 'Business transfer']} rows={[
          ['Mechanism', 'Court-sanctioned scheme', 'Contract for lump-sum consideration', 'Contractual transfer of assets'],
          ['Approval', 'NCLT sanction generally required', 'Usually no Tribunal approval', 'Usually no Tribunal approval'],
          ['Consideration', 'Usually shares of the resulting company', 'Lump-sum price', 'As agreed'],
          ['Transfer of contracts', 'By operation of the order', 'By assignment, consent often needed', 'By assignment, consent often needed'],
          ['Tax', 'Neutral if Section 2(19AA) conditions are met', 'Specific slump sale taxation applies', 'Depends on structure'],
          ['Speed', 'Slower, Tribunal-dependent', 'Faster', 'Faster'],
          ['Main risk', 'Scheme, tax conditions and approvals', 'Tax and stamp cost', 'Assignment, liabilities and GST']
        ]} />
        <div className="info-box" aria-label="Route choice note">
          <p><strong>The consideration structure often settles the question.</strong> A demerger typically delivers shares to the existing shareholders, preserving their economic position across two companies. A slump sale delivers cash to the company. If what the promoters actually want is money in hand rather than shares in a second entity, a demerger may be the wrong instrument however elegant the scheme.</p>
        </div>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main corporate law', 'Companies Act, 2013'],
          ['Scheme route', 'Sections 230 to 232'],
          ['Procedure rules', 'Companies (Compromises, Arrangements and Amalgamations) Rules, 2016'],
          ['Forum', 'National Company Law Tribunal'],
          ['Fast track', 'Section 233, where eligible'],
          ['Cross-border', 'Section 234, where a foreign company is involved'],
          ['Tax definition', 'Income-tax Act, 1961, Section 2(19AA)'],
          ['Listed entities', 'SEBI LODR Regulation 37 and the SEBI master circular on schemes of arrangement, as supplemented'],
          ['Competition', 'Competition Act, 2002 and the CCI (Combinations) Regulations, 2024'],
          ['Foreign investment', 'FEMA, the NDI Rules and the RBI framework'],
          ['Stamp duty', 'Indian Stamp Act and State stamp legislation'],
          ['Accounting', 'Ind AS or other applicable accounting standards'],
          ['Sector regulators', 'RBI, SEBI, IRDAI, IFSCA, TRAI or PFRDA, depending on the business']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Law', 'Provision', 'Practical relevance']} rows={[
          ['Companies Act, 2013', 'Section 230', 'Compromise or arrangement with members and creditors'],
          ['Companies Act, 2013', 'Section 231', 'Tribunal power to supervise and enforce the arrangement'],
          ['Companies Act, 2013', 'Section 232', 'Merger, reconstruction and division or transfer of an undertaking'],
          ['Companies Act, 2013', 'Section 232(6)', 'Appointed date and when the scheme takes effect'],
          ['Companies Act, 2013', 'Section 233', 'Fast-track route for eligible companies'],
          ['Companies Act, 2013', 'Section 234', 'Cross-border schemes'],
          ['Companies Act, 2013', 'Sections 179, 180, 186 and 188', 'Board powers, disposal of undertaking, investments and related party review'],
          ['Companies Act, 2013', 'Sections 239 and 240', 'Preservation of books, and liability of officers for prior offences'],
          ['CAA Rules, 2016', 'Rule 3 onwards', 'Application, notices, meetings, disclosures and Tribunal procedure'],
          ['Income-tax Act, 1961', 'Section 2(19AA)', 'The definition of demerger for tax purposes — the tax-neutrality gateway'],
          ['Income-tax Act, 1961', 'Sections 47(vib) and 47(vid)', 'Transfers and share issues in a demerger not regarded as transfer, subject to conditions'],
          ['Income-tax Act, 1961', 'Section 72A', 'Carry forward and set-off of accumulated loss and depreciation in specified cases'],
          ['Income-tax Act, 1961', 'Section 50B', 'Slump sale taxation, relevant when comparing routes'],
          ['SEBI LODR, 2015', 'Regulation 37', 'Listed-entity scheme filing with the stock exchanges'],
          ['Competition Act, 2002', 'Sections 5 and 6', 'Combination thresholds and the requirement to notify']
        ]} />
      </Section>

      <Section id="process" title="The NCLT Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Feasibility and structure review', 'Whether a demerger is the right route at all'],
          ['2', 'Undertaking mapping', 'Assets, liabilities, contracts, employees and licences identified'],
          ['3', 'Valuation', 'Valuation report and share entitlement ratio'],
          ['4', 'Scheme drafting', 'Draft scheme of arrangement'],
          ['5', 'Board approval', 'Board resolutions and authorisations'],
          ['6', 'First motion', 'Application to the NCLT for directions on meetings'],
          ['7', 'Meetings or dispensation', 'Tribunal directs, or dispenses with, member and creditor meetings'],
          ['8', 'Notices and advertisement', 'Notices to members, creditors and regulators, and public notice'],
          ['9', 'Regulatory observations', 'ROC, RD, OL, Income Tax and others respond'],
          ['10', 'Voting', 'Approval by the statutory majority'],
          ['11', 'Second motion', 'Petition for sanction of the scheme'],
          ['12', 'Objections and hearing', 'Objections answered and the petition heard'],
          ['13', 'Sanction order', 'The Tribunal sanctions the scheme'],
          ['14', 'ROC filing', 'Certified order filed, scheme becomes effective'],
          ['15', 'Implementation', 'Share allotment, accounting entries and record updates'],
          ['16', 'Post-demerger compliance', 'Tax, GST, licences, contracts, banking and statutory records']
        ]} />
      </Section>

      <Section id="scheme" title="Scheme of Arrangement Clauses">
        <DataTable headers={['Clause', 'Why it matters']} rows={[
          ['Definitions', 'Ambiguity in "undertaking" is the most litigated defect in a scheme'],
          ['Rationale', 'The Tribunal and the regulators want the commercial reason, clearly stated'],
          ['Transfer of undertaking', 'Exactly what assets, liabilities, contracts and employees move'],
          ['Appointed date', 'Drives accounting and tax effect'],
          ['Effective date', 'Drives legal effectiveness'],
          ['Consideration and share entitlement ratio', 'What shareholders receive, and on what basis'],
          ['Accounting treatment', 'Must comply with the applicable accounting standards'],
          ['Tax treatment', 'Should track the Section 2(19AA) conditions explicitly'],
          ['Contracts and licences', 'Continuity and assignment provisions'],
          ['Employee transfer', 'Continuity of service and protection of benefits'],
          ['Legal proceedings', 'Which entity carries which litigation forward'],
          ['Creditors', 'How debts and liabilities are dealt with'],
          ['Conditionality', 'The scheme takes effect only once every required approval is in'],
          ['Saving clause', 'Protects the scheme against partial invalidity'],
          ['Filing clause', 'Certified copy and ROC filing mechanics']
        ]} />
      </Section>

      <Section id="tax" title="Tax Neutrality Is Not Automatic">
        <div className="warning-box" aria-label="Tax neutrality caution">
          <p><strong>This is where demergers become expensive.</strong> A demerger is tax-neutral only if it satisfies every condition in Section 2(19AA) of the Income-tax Act. These are cumulative, not indicative. A scheme that is commercially sensible but misses one condition can convert an internal reorganisation into a taxable transfer, and the discovery usually comes long after the order is filed and the structure cannot easily be unwound.</p>
        </div>
        <DataTable headers={['Condition area', 'What it requires']} rows={[
          ['Undertaking', 'One or more undertakings transfer to the resulting company'],
          ['All property', 'The property of the undertaking becomes the property of the resulting company'],
          ['All liabilities', 'The liabilities relating to the undertaking move with it'],
          ['Book value', 'The transfer is generally at book value, subject to the prescribed exceptions'],
          ['Share issue', 'The resulting company issues shares to the shareholders of the demerged company'],
          ['Proportionate basis', 'Shares are issued on a proportionate basis to those shareholders'],
          ['Shareholder continuity', 'The prescribed continuity of shareholding is maintained'],
          ['Going concern', 'The undertaking transfers as a going concern'],
          ['Scheme route', 'The transfer is under a scheme of arrangement'],
          ['Losses and depreciation', 'Section 72A conditions reviewed separately for carry forward'],
          ['Commercial substance', 'A genuine business rationale, given anti-avoidance and GAAR exposure']
        ]} />
        <p>Work the section against the draft scheme clause by clause, and keep the record that evidences compliance — valuation, accounting treatment and the business rationale. Tax neutrality is something the scheme has to be built to achieve, not something it is assumed to attract.</p>
      </Section>

      <Section id="valuation" title="Valuation and Share Entitlement">
        <p>The share entitlement ratio decides what each shareholder ends up holding, which makes it the most common trigger for objection. A ratio that cannot be explained by reference to a defensible methodology invites exactly the scrutiny a scheme does not need.</p>
        <DataTable headers={['Item', 'Why it matters']} rows={[
          ['Registered valuer report', 'The basis for the share entitlement ratio'],
          ['Methodology disclosure', 'The Tribunal and shareholders should be able to follow the reasoning'],
          ['Fairness opinion', 'Commonly required for listed-entity schemes'],
          ['Audit committee review', 'A listed-company requirement before the scheme proceeds'],
          ['Minority position', 'Disproportionate promoter benefit attracts heightened scrutiny'],
          ['Consistency with accounts', 'Valuation inputs should reconcile to the financial statements'],
          ['Currency of the valuation', 'A stale valuation is a question waiting to be asked']
        ]} />
      </Section>

      <Section id="sebi" title="Listed Company Demerger">
        <p>A listed-entity scheme carries an additional layer that runs before the NCLT petition rather than alongside it. The scheme is filed with the stock exchanges under Regulation 37 of the LODR Regulations, and SEBI&rsquo;s observation or no-objection is obtained through the exchanges under the master circular on schemes of arrangement, which has been supplemented by later procedural circulars.</p>
        <DataTable headers={['Requirement', 'Practical relevance']} rows={[
          ['Stock exchange filing', 'Scheme submitted for the observation and no-objection process'],
          ['Audit committee report', 'Review of the scheme and the valuation'],
          ['Valuation and fairness opinion', 'Supporting the share entitlement ratio'],
          ['Public shareholder approval', 'E-voting, with the majority-of-minority requirement where applicable'],
          ['Disclosure to exchanges', 'Timely disclosure of the scheme and material developments'],
          ['UPSI and trading window', 'Insider trading controls while the scheme is unpublished'],
          ['Scheme documents published', 'Made available for investor scrutiny'],
          ['Listing of resulting company', 'Where the resulting company shares are to be listed'],
          ['Minimum public shareholding', 'Post-demerger compliance position'],
          ['Promoter benefit', 'Enhanced scrutiny where promoters gain disproportionately']
        ]} />
        <p>Plan this sequence early. The exchange and SEBI stage sits on the critical path, and a scheme that reaches the Tribunal without it is not ready.</p>
      </Section>

      <Section id="cci" title="CCI and the Deal Value Threshold">
        <p>Most demergers are internal reorganisations that raise no competition issue, and group restructurings often fall within available exemptions. But the threshold analysis should be done rather than assumed, because the consequences of getting it wrong are asymmetric.</p>
        <div className="info-box" aria-label="Deal value threshold">
          <p><strong>The deal value threshold changed the analysis and is still being missed.</strong> Alongside the traditional asset and turnover tests, a transaction valued above <strong>₹2,000 crore</strong> requires CCI approval where the target has substantial business operations in India. Critically, the de minimis exemption for small targets does not rescue a transaction that crosses this threshold — so a deal can be notifiable even though the target looks far too small to matter on the old tests.</p>
        </div>
        <DataTable headers={['Check', 'What to assess']} rows={[
          ['Asset and turnover tests', 'Threshold analysis for the parties and the group'],
          ['Deal value threshold', 'Whether value exceeds ₹2,000 crore with substantial Indian operations'],
          ['Substantial business operations', 'Indian users or turnover against the prescribed tests'],
          ['Change of control', 'Whether the demerger actually changes control'],
          ['Exemption review', 'De minimis and schedule exemptions, and whether they are available'],
          ['Green channel', 'Self-assessed deemed approval where there is no overlap'],
          ['Standstill obligation', 'Do not implement before approval where a filing is required'],
          ['Gun-jumping exposure', 'Penalty risk from early implementation']
        ]} />
      </Section>

      <Section id="fema" title="FEMA and Cross-Border Elements">
        <DataTable headers={['Issue', 'What to review']} rows={[
          ['Non-resident shareholders', 'Share allotment and reporting consequences'],
          ['Sectoral caps', 'Whether the resulting company’s sector permits the foreign holding'],
          ['Pricing guidelines', 'Valuation and issue price compliance'],
          ['Reporting', 'FC-GPR, FC-TRS and other filings where applicable'],
          ['Downstream investment', 'Ownership and control analysis for Indian entities'],
          ['Cross-border assets', 'Overseas asset transfer and ODI review'],
          ['Share swap', 'RBI and FEMA compliance'],
          ['Beneficial ownership', 'Ultimate owner and control mapping']
        ]} />
        <p>Deal with FEMA before the scheme is finalised. Pricing and reporting failures are awkward to correct once shares have been allotted under a sanctioned scheme.</p>
      </Section>

      <Section id="stamp" title="Stamp Duty">
        <p>Stamp duty is the cost most often left out of the early model, and it can be material enough to change the structure.</p>
        <DataTable headers={['Point', 'Practical position']} rows={[
          ['State-specific', 'Rates and treatment differ by State'],
          ['The order as an instrument', 'The NCLT order may itself be chargeable'],
          ['Immovable property', 'Attracts closer scrutiny and higher duty'],
          ['Property location', 'The State where property sits may levy duty'],
          ['Registered office State', 'Relevant to stamping of the order'],
          ['Share issue', 'Separate stamp implications may apply'],
          ['Under-stamping', 'Delays mutation and record updates downstream'],
          ['Budgeting', 'Estimate at the structuring stage, not at implementation']
        ]} />
      </Section>

      <Section id="regulated" title="Regulated Businesses and Licences">
        <div className="warning-box" aria-label="Licence transfer caution">
          <p><strong>A licence does not travel with the undertaking just because the scheme says it does.</strong> Where the business being demerged is regulated, confirm before fixing the structure whether the registration can move to the resulting company, whether fresh registration is required, and whether change-in-control or fit-and-proper approval is needed. A scheme sanctioned over a business that cannot lawfully operate in its new home is a serious problem.</p>
        </div>
        <DataTable headers={['Sector', 'What to confirm']} rows={[
          ['NBFC and fintech', 'RBI approval, change in control, net owned funds and licence conditions'],
          ['Payment business', 'RBI authorisation and continuity of operations'],
          ['Insurance intermediary', 'IRDAI approval and registration update'],
          ['SEBI intermediary', 'Registration, fit-and-proper and activity segregation'],
          ['IFSCA entity', 'IFSC licence and approval route'],
          ['Telecom and media', 'Sectoral caps and licence approval'],
          ['Manufacturing', 'Factory, pollution, labour and land approvals'],
          ['Real estate', 'RERA registration, project assets and customer agreements'],
          ['Healthcare and education', 'Sector-specific transfer restrictions']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Certificate of incorporation, MOA and AOA', 'Identity and objects, and power to restructure'],
          ['Board minutes and resolutions', 'Corporate approval'],
          ['Shareholding pattern', 'Entitlement and voting analysis'],
          ['Financial statements', 'Valuation and scheme disclosure'],
          ['Auditor certificate', 'Accounting treatment and scheme compliance'],
          ['Valuation report', 'Share entitlement ratio'],
          ['Draft scheme of arrangement', 'The principal document'],
          ['Lists of creditors and shareholders', 'Notices, meetings and consents'],
          ['Asset and liability schedules', 'Defining the undertaking transferred'],
          ['Employee list', 'Transfer and continuity planning'],
          ['Material contracts', 'Assignment and continuity review'],
          ['Licences and registrations', 'Transferability analysis'],
          ['Property and loan documents', 'Title, security and lender consent'],
          ['Tax records', 'Income tax, GST and TDS exposure'],
          ['Litigation list', 'Pending disputes and contingent liabilities'],
          ['SEBI and exchange documents', 'Listed-entity process'],
          ['FEMA documents', 'Foreign shareholder and cross-border review'],
          ['CCI threshold data', 'Assets, turnover, deal value and overlap analysis']
        ]} />
      </Section>

      <Section id="family" title="Family Business Restructuring">
        <p>Demerger is a common and effective answer where family branches want independent control of different businesses. It works because the Tribunal&rsquo;s order gives the separation legal force that a private understanding never has.</p>
        <DataTable headers={['Issue', 'How the demerger addresses it']} rows={[
          ['Divergent business interests', 'Verticals separated into separate companies'],
          ['Succession', 'Businesses allocated deliberately between branches'],
          ['Decision-making deadlock', 'Independent management and control'],
          ['Asset division', 'Undertaking transfers with its assets and liabilities'],
          ['Brand separation', 'Each branch operates under its own identity'],
          ['Employee continuity', 'Employees move with the undertaking'],
          ['Banking continuity', 'Lender consent and security transfer planned'],
          ['Future sale or investment', 'A clean entity that can be sold or funded'],
          ['Dispute avoidance', 'A scheme-backed separation rather than an informal one']
        ]} />
        <p>Support it with family settlement documentation, shareholder agreements and governance terms. The scheme separates the businesses; those documents are what stop the dispute reappearing.</p>
      </Section>

      <Section id="common-issues" title="Where Demergers Go Wrong">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Undertaking not clearly defined', 'Scheme objection and tax risk', 'Undertaking mapping with asset and liability schedules'],
          ['Tax conditions not tested', 'Capital gains exposure discovered late', 'Section 2(19AA) review against the draft scheme'],
          ['Valuation started late', 'Share entitlement ratio delays everything downstream', 'Valuer coordination and document readiness'],
          ['Creditors not mapped', 'Objection at the Tribunal', 'Creditor list and consent planning'],
          ['Listed-entity process underestimated', 'SEBI and exchange stage blocks the petition', 'SEBI scheme checklist planned on the critical path'],
          ['CCI threshold not tested', 'Gun-jumping exposure', 'Combination and deal value threshold review'],
          ['FEMA overlooked', 'Pricing and reporting breaches', 'Foreign shareholder review before finalisation'],
          ['Lender consent missed', 'Event of default under facility documents', 'Facility and charge review'],
          ['Licence assumed transferable', 'Business interruption in the resulting company', 'Licence-wise approval matrix'],
          ['Stamp duty unbudgeted', 'Cost shock at implementation', 'State-wise stamp review at structuring'],
          ['ROC filing delayed after the order', 'Scheme effectiveness in question', 'Post-order filing tracker'],
          ['Post-demerger compliance drifts', 'Records, tax and licences out of step', 'Implementation checklist to closure']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Feasibility review', 'Whether a demerger is the right route'],
          ['Structure note', 'Demerger compared against slump sale, business transfer and asset sale'],
          ['Undertaking mapping', 'Assets, liabilities, employees, contracts and licences'],
          ['Legal due diligence', 'Corporate, contracts, litigation, IP and property'],
          ['Tax-neutrality review', 'Section 2(19AA) and Section 72A analysis'],
          ['Valuation coordination', 'Valuer, share entitlement ratio and fairness support'],
          ['Scheme drafting support', 'Inputs and legal drafting support for the scheme'],
          ['NCLT process support', 'First motion, second motion and order tracking'],
          ['CAA documentation', 'Applications, notices and supporting documents'],
          ['Member and creditor process', 'Meetings, notices and consents'],
          ['Listed entity support', 'Stock exchange, SEBI and merchant banker coordination'],
          ['CCI review', 'Thresholds, deal value analysis, exemptions and filing support'],
          ['FEMA review', 'Foreign shareholder, pricing and reporting'],
          ['Sectoral approvals', 'RBI, SEBI, IRDAI and IFSCA coordination'],
          ['Stamp duty planning', 'State-wise analysis and budgeting'],
          ['Post-demerger compliance', 'ROC, tax, GST, licences, contracts and accounting closure'],
          ['Ticket-based tracking', 'Scheme, approvals, filings, hearings, order and implementation']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A demerger is not a filing, it is a restructuring project with a filing at the end of it. The schemes that go through cleanly are the ones where the undertaking was mapped, the valuation was ready, the tax conditions were tested against the draft and every approval was identified before the first motion. The ones that stall are the ones that started with the drafting.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not transaction-specific legal, tax or valuation advice. Whether a demerger is appropriate, whether tax neutrality is available, which approvals are required and what a scheme should contain depend entirely on the companies, the undertaking, the shareholders and the sector involved. Thresholds, circulars and regulatory positions change; statements here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides structuring support, documentation, coordination and compliance tracking; valuation is performed by registered valuers and appearance before the Tribunal is through advocates. Confirm the current position with your advisers before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
