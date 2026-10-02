'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'purpose', title: 'Purpose Decides Everything' },
  { id: 'who-may-value', title: 'Who May Value, For What' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'tax', title: 'Valuation and the Income-tax Act, 2025' },
  { id: 'circle-rate', title: 'Market Value and Circle Rate' },
  { id: 'methods', title: 'Valuation Methods' },
  { id: 'types', title: 'Matters We Handle' },
  { id: 'lending', title: 'Valuation for Lending' },
  { id: 'family', title: 'Family Settlement and Divorce' },
  { id: 'corporate', title: 'Corporate Transactions' },
  { id: 'report', title: 'What the Report Must Contain' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'red-flags', title: 'Red Flags in a Valuation Report' },
  { id: 'verification', title: 'Valuation Is Not Title Verification' },
  { id: 'nri', title: 'NRI Property Valuation' },
  { id: 'common-issues', title: 'Why Valuations Get Rejected' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Is property valuation a licence or registration?', 'No. It is a professional assessment of value. What is regulated is who may perform it for particular statutory purposes, and in what form the report must be given.'],
  ['Is a valuation mandatory before buying or selling property?', 'No. It becomes necessary for specific purposes — a bank loan, a company-law transaction, an insolvency process, certain tax positions, a court proceeding — and is strongly advisable whenever the price itself is the thing in doubt.'],
  ['Who is a registered valuer?', 'It depends which statute you mean, and the two frameworks are commonly confused. For company-law purposes a registered valuer is registered under Section 247 of the Companies Act, 2013 and the Companies (Registered Valuers and Valuation) Rules, 2017, with the IBBI as the authority. For income-tax purposes, registration is now under Section 514 of the Income-tax Act, 2025 and the Income-tax Rules, 2026.'],
  ['What changed for income-tax valuers in 2026?', 'The old framework under Section 34AB of the Wealth-tax Act, 1957 and Rule 8A has been superseded. Registration is now under Section 514 of the Income-tax Act, 2025, applied for in Form No. 169 under Rule 246 with a non-refundable fee of ten thousand rupees, and the valuation report is given in Form No. 170.'],
  ['My valuer has been registered for years. Is that still valid?', 'A valuer holding a valid certificate under the Wealth-tax Act as at 31 March 2026 continues as a registered valuer under Section 514, but is required to update their details by filing Form No. 169 by 31 March 2027. Ask whether that has been done, particularly if the report is for a tax purpose.'],
  ['Which asset class covers immovable property?', 'Land and Building. Under the Companies Act framework there are three classes — Land and Building, Plant and Machinery, and Securities or Financial Assets — and a valuer may act only within the class in which they are registered. A securities valuer cannot competently value your factory land.'],
  ['Does every property valuation need a registered valuer?', 'No. A bank valuation follows the lender’s empanelment policy. A negotiation or planning exercise needs no particular registration. Where a statute requires valuation by a registered valuer — most company-law situations, insolvency, specified tax purposes — the registration is not optional, and a report from the wrong valuer is simply not usable.'],
  ['What is fair market value?', 'The price the property would reasonably fetch between a willing buyer and a willing seller, each with knowledge of the relevant facts and neither under compulsion. It is an estimate supported by evidence, not a number.'],
  ['What is circle rate?', 'The government-notified minimum value for a locality and property category, used for stamp duty and registration. It is also called the ready reckoner rate or guideline value depending on the State.'],
  ['Is circle rate the same as market value?', 'No, and they diverge in both directions. Circle rates are revised periodically and applied area-wide; actual value depends on the specific property, its condition, floor, approach, title and the state of demand. In some localities circle rate exceeds achievable market value, which is where tax problems start.'],
  ['What happens if I sell below the stamp duty value?', 'Under Section 78 of the Income-tax Act, 2025 — the provision corresponding to Section 50C of the 1961 Act — the stamp duty value is deemed to be the full value of consideration for computing capital gains where the consideration is lower. There is a tolerance: if the stamp duty value does not exceed one hundred and ten per cent of the consideration, the declared consideration is accepted.'],
  ['What is the buyer’s exposure on the same transaction?', 'The buyer is assessed separately. Where immovable property is received without consideration or for inadequate consideration, the difference can be taxed as income from other sources under Section 92(2)(m) of the Income-tax Act, 2025 — the provision corresponding to Section 56(2)(x). One under-priced transaction can therefore produce tax in two hands.'],
  ['Can I dispute the stamp duty value?', 'Yes. Where the assessee claims the stamp duty value exceeds fair market value and has not disputed it elsewhere, the Assessing Officer may refer the valuation to a Valuation Officer. Making that claim well requires a defensible valuation on record, which is why the report matters before the assessment rather than after it.'],
  ['Which date should the valuation be as of?', 'The date that the purpose requires — the date of transfer, the date of the agreement, the date of death for an estate, the date of the scheme for a corporate transaction. A report without a clear valuation date is of limited use whatever its contents.'],
  ['Does the agreement date or the registration date govern?', 'Where the two differ and part or all of the consideration was paid through a specified banking or online mode on or before the agreement date, the stamp duty value on the agreement date may be taken. This makes the payment mode a substantive matter, not a formality.'],
  ['What methods are used?', 'Market comparison for flats and resale property; land and building for independent houses and industrial property; income capitalisation or discounted cash flow for tenanted and commercial property; cost or replacement for special-purpose assets; and residual or development methods for land with development potential.'],
  ['Which method is correct for my property?', 'The one the purpose and the available evidence support. The same plot can carry different defensible values on a comparison basis and a development basis, and a report that adopts the higher method without justifying it is the one that gets questioned.'],
  ['What documents will a valuer need?', 'The latest sale deed and prior title documents, property tax receipts, approved plan, occupancy or completion certificate, area details, encumbrance certificate, mutation or revenue record, the lease and rent records if tenanted, photographs, a location reference, and a clear note on the purpose.'],
  ['Can valuation be done without a site visit?', 'A desktop valuation is possible for planning and indicative purposes. For a statutory, lending or litigation report a physical inspection is normally expected, and its absence is one of the first things an objector points to.'],
  ['Why did the bank’s valuation come in lower than mine?', 'Lenders are valuing collateral, not a sale. They apply conservative comparables, discount unapproved area, factor in distress realisation and reject anything not supported by approvals. A gap is usually explained by what the lender excluded, and that is reviewable.'],
  ['Can illegal or unapproved construction be included in the value?', 'It should not be included as though it were approved. A competent report identifies the unapproved portion and values it separately or excludes it, because including it silently makes the whole report unacceptable to a lender, a court or a tax authority.'],
  ['Can valuation be used in a family settlement?', 'Yes, and a neutral valuation is often what makes a settlement possible. Where siblings are each working from their own broker’s figure, a single documented valuation with a stated method and date removes most of the argument.'],
  ['Can valuation be used in a divorce settlement?', 'Yes. Property value is usually the largest number in a matrimonial settlement, and a report that both sides can test is more durable than two competing estimates.'],
  ['Does the company-law Section 247 have anything to do with the income-tax Section 247?', 'No, and the coincidence causes real confusion. Section 247 of the Companies Act, 2013 is the registered valuer provision. Section 247 of the Income-tax Act, 2025 deals with search and seizure, where a valuer may be requisitioned to assist. Different statutes, different purposes.'],
  ['Can Estabizz review a valuation report I already have?', 'Yes, and it is frequently the most useful thing to do first. We review the stated purpose, the valuer’s registration and asset class, the documents actually relied upon, the method and its justification, the area taken, the comparables, the treatment of approvals and encumbrances, and whether the report will be accepted for the use intended.'],
  ['What is the biggest mistake in property valuation?', 'Commissioning a report before deciding what it is for. A report prepared for a bank rarely satisfies a tax officer, a report for negotiation rarely satisfies a court, and a report from a valuer registered in the wrong asset class satisfies nobody.']
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
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Property Valuation' }]}
      title="Property Valuation"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Property Valuation"
      sections={sections}
      ctaTitle="Speak With a Property Valuation Expert"
      ctaDescription="Fix the purpose and the valuation date first, then the valuer, the method and the documents follow from it."
      quickFacts={[
        { label: 'Company-law basis', value: 'Companies Act, Section 247' },
        { label: 'Income-tax basis', value: 'Section 514, Rules 246 to 248' },
        { label: 'Asset class', value: 'Land and Building' },
        { label: 'Stamp value rule', value: 'Section 78, 110% tolerance' }
      ]}
      relatedArticles={[
        { title: 'Gift Deed Registration', href: '/solutions/legal/gift-deed-registration', category: 'Legal', description: 'Execution, acceptance, stamp duty and registration of a transfer without consideration.' },
        { title: 'Lease Agreement Drafting', href: '/solutions/legal/lease-agreement-drafting', category: 'Legal', description: 'Term, rent, escalation, registration and the clauses that decide disputes.' },
        { title: 'Mergers and Acquisitions', href: '/solutions/legal/mergers-and-acquisitions', category: 'Legal', description: 'Structuring, diligence, valuation requirements and regulatory approvals.' }
      ]}
      finalCtaTitle="Decide the Purpose Before You Commission the Report"
      finalCtaDescription="A lender's report, a tax report, a court report and a negotiating estimate are different documents. Reports are rejected far more often for the wrong purpose or the wrong valuer than for the wrong number."
      heroDescription={<p>Property value drives the purchase price, the loan sanctioned, the capital gains computed, the stamp duty paid, the share each family member receives and the compensation a court awards. The number matters, but what makes a valuation usable is the purpose it was prepared for, the registration the valuer holds, the method adopted and the documents behind it. Estabizz assists buyers, sellers, NRIs, lenders, companies, families, developers and professional advisers with purpose assessment, registered valuer coordination, title and area review, circle rate comparison, tax valuation support, lending valuation support, family settlement and litigation valuation, corporate and insolvency valuation support, and independent review of reports already issued.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a valuation is a reasoned, documented opinion of what a property is worth, on a stated date, for a stated purpose.</p>
        <p>The last part is what people underestimate. A report prepared for a bank is built to protect a lender against downside and will look conservative. A report prepared to support a capital gains position has to withstand an Assessing Officer. A report for a partition has to be acceptable to people who do not trust each other. A report for an NCLT scheme has to come from a valuer registered in the right asset class or it will not be looked at.</p>
        <p>The same property, honestly valued, can carry different defensible figures in those four documents. A single report asked to serve all four generally serves none.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Property valuation is not a licence or registration. It is a professional assessment of the value of immovable property, used for sale, purchase, lending, tax, accounting, company-law transactions, insolvency, family settlement and litigation.</p>
        <p>What is regulated is <em>who</em> may value and <em>in what form</em>, and that varies by purpose. Company-law and insolvency valuations require a registered valuer under Section 247 of the Companies Act, 2013. Income-tax valuations now run on the Section 514 framework of the Income-tax Act, 2025 and the Income-tax Rules, 2026. Lending valuations follow the lender&rsquo;s empanelment. Stamp duty works from State-notified circle rates, which are a separate measure from market value.</p>
      </Section>

      <Section id="purpose" title="Purpose Decides Everything">
        <div className="warning-box" aria-label="Why the purpose must be fixed first">
          <p><strong>Reports are rejected for the wrong purpose far more often than for the wrong number.</strong> The purpose fixes the valuation date, the standard of value, the method, the format of the report and — critically — whether a particular valuer may give it at all. Commissioning a valuation before the purpose is settled is the single most expensive mistake in this area, because the second report costs as much as the first and the delay is the real loss.</p>
        </div>
        <DataTable headers={['Purpose', 'Standard of value', 'Who gives the report', 'Date that matters']} rows={[
          ['Purchase or sale negotiation', 'Market value', 'Any competent valuer; no registration requirement', 'Current date'],
          ['Home loan or loan against property', 'Market value, plus realisable and distress value', 'A valuer empanelled by the lender', 'Current date'],
          ['Capital gains on transfer', 'Fair market value, tested against stamp duty value', 'Registered valuer under the income-tax framework', 'Date of transfer, or of the agreement'],
          ['Cost of acquisition for an older property', 'Fair market value on the relevant historical date', 'Registered valuer under the income-tax framework', 'The statutory base date'],
          ['Inherited property', 'Value for estate and cost-base purposes', 'Registered valuer where a tax position depends on it', 'Date of death'],
          ['Company-law transaction', 'Fair value as the Act requires', 'Registered valuer under Companies Act Section 247', 'Date fixed by the transaction'],
          ['Insolvency or liquidation', 'Fair value and liquidation value', 'Registered valuer in the Land and Building class', 'Insolvency commencement or as directed'],
          ['Family partition or settlement', 'Market value, acceptable to all parties', 'A neutral valuer both sides accept', 'Agreed date'],
          ['Divorce settlement', 'Market value', 'A neutral valuer, or one per side', 'Agreed or court-directed date'],
          ['Litigation and compensation', 'Market value, evidenced', 'A valuer who can be examined on the report', 'Date fixed by the cause of action'],
          ['Insurance', 'Reinstatement or replacement value', 'Insurer-accepted valuer', 'Policy date'],
          ['Financial reporting', 'Fair value under the accounting standard', 'Registered valuer where required', 'Reporting date']
        ]} />
      </Section>

      <Section id="who-may-value" title="Who May Value, For What">
        <p>Two registration frameworks operate in parallel, and they are routinely confused. A report from the wrong one is not a weaker report; for the purpose in question it is no report at all.</p>
        <DataTable headers={['Framework', 'Statutory basis', 'Authority', 'Used for']} rows={[
          ['Registered valuer under company law', 'Companies Act, 2013, Section 247 and the Companies (Registered Valuers and Valuation) Rules, 2017', 'IBBI, as the authority under the Rules', 'Company-law transactions, schemes, insolvency and statutory corporate valuations'],
          ['Registered valuer under income-tax law', 'Income-tax Act, 2025, Section 514, with Rules 246 to 248 of the Income-tax Rules, 2026', 'The income-tax authorities specified in Section 514(2)', 'Valuation reports relied on for income-tax purposes'],
          ['Lender-empanelled valuer', 'The bank or NBFC credit policy', 'The lender', 'Loan, mortgage and collateral assessment'],
          ['Court-appointed valuer or commissioner', 'Directions in the proceeding', 'The court', 'Valuation evidence in litigation'],
          ['Any competent professional', 'No statutory registration needed', 'Not applicable', 'Negotiation, planning and internal decisions']
        ]} />
        <DataTable headers={['Point', 'Position']} rows={[
          ['Asset classes under the company-law framework', 'Land and Building; Plant and Machinery; Securities or Financial Assets'],
          ['Class relevant to immovable property', 'Land and Building'],
          ['Acting outside the registered class', 'The report is not usable for the statutory purpose'],
          ['Income-tax registration application', 'Form No. 169 under Rule 246, with a non-refundable fee of ten thousand rupees'],
          ['Income-tax valuation report format', 'Form No. 170, under Section 514(3)'],
          ['Maximum fee a registered valuer may charge', 'Prescribed on a sliding scale by Rule 248, with a floor of five thousand rupees'],
          ['Valuers registered under the old framework', 'A valid Wealth-tax Act certificate as at 31 March 2026 continues under Section 514'],
          ['Action required of them', 'Details must be updated by filing Form No. 169 by 31 March 2027'],
          ['What this means for you', 'Ask for the registration number, the asset class and whether the Form 169 update has been filed']
        ]} />
        <div className="info-box" aria-label="Two different Section 247s">
          <p><strong>Watch the two provisions numbered 247.</strong> Section 247 of the <em>Companies Act, 2013</em> is the registered valuer provision. Section 247 of the <em>Income-tax Act, 2025</em> deals with search and seizure, where an approved valuer may be requisitioned to assist the authorised officer. They are unrelated, and the overlap in numbering has already produced confusion in practice.</p>
        </div>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Company-law valuation', 'Companies Act, 2013'],
          ['Registered valuer provision', 'Companies Act, Section 247'],
          ['Registered valuer rules', 'Companies (Registered Valuers and Valuation) Rules, 2017'],
          ['Authority under those Rules', 'Insolvency and Bankruptcy Board of India'],
          ['Asset class for immovable property', 'Land and Building'],
          ['Income-tax valuation', 'Income-tax Act, 2025, in force from 1 April 2026 for tax year 2026-27'],
          ['Registration of valuers for tax purposes', 'Income-tax Act, Section 514, with Income-tax Rules, 2026, Rules 246 to 248'],
          ['Superseded framework', 'Wealth-tax Act, 1957, Section 34AB and Rule 8A'],
          ['Property transfer', 'Transfer of Property Act, 1882'],
          ['Registration of instruments', 'Registration Act, 1908'],
          ['Stamp duty and circle rate', 'Indian Stamp Act, 1899 and the State stamp legislation'],
          ['Real estate projects', 'Real Estate (Regulation and Development) Act, 2016'],
          ['Insolvency valuation', 'Insolvency and Bankruptcy Code, 2016, and the regulations under it'],
          ['Land records and circle rates', 'State revenue law, ready reckoner and guideline value notifications'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63 for electronic records'],
          ['Authorities', 'IBBI, the Income Tax Department, the Sub-Registrar, the State stamp authority, the RERA Authority, the lender and the court, depending on purpose']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Companies Act, Section 247', 'Valuation by a registered valuer where the Act requires it'],
          ['Companies (Registered Valuers and Valuation) Rules, 2017', 'Eligibility, registration, asset classes, conduct and valuation standards'],
          ['Income-tax Act, 2025, Section 514', 'Registration of valuers and the form of the valuation report'],
          ['Income-tax Rules, 2026, Rule 246', 'Application for registration in Form No. 169'],
          ['Income-tax Rules, 2026, Rule 247', 'Qualifications and eligibility by class of asset'],
          ['Income-tax Rules, 2026, Rule 248', 'Maximum fee chargeable, and the report in Form No. 170'],
          ['Income-tax Act, 2025, Section 78', 'Stamp duty value deemed full value of consideration on transfer of land or building'],
          ['Income-tax Act, 2025, Section 53', 'The corresponding rule where land or building is stock in trade'],
          ['Income-tax Act, 2025, Section 92(2)(m)', 'Property received without, or for inadequate, consideration taxed in the recipient’s hands'],
          ['Transfer of Property Act, Section 54', 'Sale of immovable property'],
          ['Transfer of Property Act, Section 58', 'Mortgage and its forms'],
          ['Transfer of Property Act, Sections 105 and 107', 'Lease, and how a lease must be made'],
          ['Transfer of Property Act, Sections 122 and 123', 'Gift, and how a gift of immovable property must be effected'],
          ['Registration Act, Section 17', 'Documents of which registration is compulsory'],
          ['Registration Act, Section 49', 'Consequences of non-registration'],
          ['State stamp legislation', 'Circle rate or ready reckoner value, and duty on the instrument'],
          ['RERA, Sections 3, 4, 11 and 19', 'Project registration, promoter disclosures and allottee rights'],
          ['BSA, Sections 61 to 63', 'Admissibility of electronic records, including a report issued digitally']
        ]} />
      </Section>

      <Section id="tax" title="Valuation and the Income-tax Act, 2025">
        <p>The Income-tax Act, 2025 took effect on 1 April 2026 and applies from tax year 2026-27. The substance of the valuation rules carried over from the 1961 Act, but the numbering changed — and citing the old numbers in a report or a submission is the kind of avoidable error that invites a closer look.</p>
        <DataTable headers={['Position', 'Income-tax Act, 2025', 'Corresponding provision of the 1961 Act']} rows={[
          ['Transfer of land or building held as a capital asset', 'Section 78', 'Section 50C'],
          ['Land or building held as stock in trade', 'Section 53', 'Section 43CA'],
          ['Property received without or for inadequate consideration', 'Section 92(2)(m)', 'Section 56(2)(x)'],
          ['Registration of valuers', 'Section 514, with Rules 246 to 248', 'Wealth-tax Act Section 34AB and Rule 8A'],
          ['Valuer assisting in search and seizure', 'Section 247', 'Section 132(9D) context']
        ]} />
        <div className="info-box" aria-label="The 110 per cent tolerance">
          <p><strong>Section 78 carries a tolerance band worth knowing before you negotiate.</strong> Where the consideration on transfer of land or building is less than the stamp duty value, the stamp duty value is deemed to be the full value of consideration for computing capital gains. But if the stamp duty value does not exceed <strong>one hundred and ten per cent</strong> of the consideration, the declared consideration stands. A transaction priced within that band is unaffected; a transaction a little outside it is fully substituted, not substituted for the excess.</p>
        </div>
        <DataTable headers={['Situation', 'What follows']} rows={[
          ['Consideration at or above the stamp duty value', 'No substitution; the declared consideration governs'],
          ['Stamp duty value within 110 per cent of the consideration', 'The declared consideration is accepted'],
          ['Stamp duty value above 110 per cent of the consideration', 'The stamp duty value is deemed the full value of consideration'],
          ['Agreement date earlier than registration', 'The stamp duty value on the agreement date may be taken, if consideration was paid through a specified banking or online mode'],
          ['Assessee says the stamp duty value exceeds fair market value', 'The Assessing Officer may refer the valuation to a Valuation Officer'],
          ['The buyer’s side of the same transaction', 'The shortfall may be taxed as income under Section 92(2)(m)'],
          ['An older property with no reliable cost record', 'A fair market value report on the statutory base date supports the cost of acquisition'],
          ['Inherited property', 'Value at the relevant date supports both the estate position and the eventual cost base'],
          ['A gift or family transfer', 'Stamp duty value and the exemption relied upon should both be documented'],
          ['An overstated valuation', 'Invites scrutiny, and an unsupported report is worse than no report']
        ]} />
        <p>Two practical points follow. First, the valuation has to exist <em>before</em> the position is taken, because a report produced after an assessment has begun carries much less weight. Second, where the stamp duty value genuinely exceeds what the property can fetch — which happens in localities where circle rates have outrun the market — the answer is a defensible valuation on record, not a hope that nobody checks.</p>
      </Section>

      <Section id="circle-rate" title="Market Value and Circle Rate">
        <DataTable headers={['Point', 'Market value', 'Circle rate, ready reckoner or guideline value']} rows={[
          ['What it is', 'An evidenced estimate of what the property would fetch', 'A government-notified minimum value by area and category'],
          ['Set by', 'The market, assessed by a valuer', 'The State revenue or stamp authority'],
          ['Granularity', 'Property-specific — floor, approach, condition, title', 'Area-wide and category-wide'],
          ['Revision', 'Continuous', 'Periodic, and sometimes well behind the market'],
          ['Primary use', 'Lending, tax, settlement, litigation and investment', 'Stamp duty and registration'],
          ['Can be lower than the other', 'Yes, in localities where rates have outrun the market', 'Yes, commonly, in appreciating localities'],
          ['Consequence of ignoring it', 'Overpayment or an unsupportable position', 'Stamp shortfall, and substitution of value under Section 78']
        ]} />
        <p>A competent report states both figures and explains the divergence. A report that mentions only one of them is incomplete for almost every purpose on this page.</p>
      </Section>

      <Section id="methods" title="Valuation Methods">
        <DataTable headers={['Method', 'Suited to', 'What it rests on']} rows={[
          ['Market comparison', 'Flats, houses and resale property', 'Verified transactions in comparable property nearby, adjusted for differences'],
          ['Land and building', 'Independent houses, bungalows and industrial property', 'Land valued separately from the structure, with depreciation applied'],
          ['Income capitalisation', 'Tenanted commercial and rented property', 'Sustainable rent and an appropriate capitalisation rate'],
          ['Discounted cash flow', 'Income-generating property and projects', 'Projected cash flows and a justified discount rate'],
          ['Cost or replacement', 'Special-purpose property with no comparables', 'Replacement cost less depreciation'],
          ['Development method', 'Land with development potential', 'Permissible development, costs, timeline and profit'],
          ['Residual method', 'Development land', 'Completed value less development cost and developer profit'],
          ['Circle rate comparison', 'Every report, as a cross-check', 'The notified value for the locality and category']
        ]} />
        <div className="info-box" aria-label="Method selection">
          <p><strong>Method selection is where a report is attacked.</strong> Development and residual methods can produce substantially higher figures than comparison, and they depend on development rights that may not exist. Income methods are sensitive to the rent assumed, and an aspirational rent compounds through the whole calculation. A sound report explains why the method was chosen, and what the figure would look like on an alternative basis.</p>
        </div>
      </Section>

      <Section id="types" title="Matters We Handle">
        <DataTable headers={['Property or matter', 'Typical use']} rows={[
          ['Residential flat, villa or plot', 'Purchase, sale, loan, tax and settlement'],
          ['Commercial office, shop or showroom', 'Lending, leasing, tax and investment analysis'],
          ['Industrial land, factory or warehouse', 'Lending, corporate transaction and insolvency'],
          ['Agricultural and converted land', 'Sale, conversion assessment and tax'],
          ['Development land', 'Redevelopment, joint development and land acquisition'],
          ['Under-construction project', 'Lending, stage funding and project review'],
          ['Tenanted property', 'Rent capitalisation and yield assessment'],
          ['Mortgaged property', 'Collateral and realisable value'],
          ['Inherited and estate property', 'Estate value, cost base and distribution'],
          ['Property in a family partition', 'Equalisation and buyout'],
          ['Property in a matrimonial settlement', 'Asset division and alimony'],
          ['Property in litigation', 'Claim quantification and evidence'],
          ['Corporate real estate', 'Scheme, related-party transaction and financial reporting'],
          ['Distressed and insolvency assets', 'Fair value and liquidation value'],
          ['NRI-held property', 'Remote valuation and overseas documentation'],
          ['An existing valuation report', 'Independent review before it is relied upon']
        ]} />
      </Section>

      <Section id="lending" title="Valuation for Lending">
        <p>Lenders are not estimating a sale price. They are sizing a recovery, and their report is built accordingly. Understanding what they look at explains most of the gap between a lender&rsquo;s figure and an owner&rsquo;s expectation.</p>
        <DataTable headers={['What the lender assesses', 'Why']} rows={[
          ['Market value', 'Sets the loan-to-value ratio'],
          ['Realisable value', 'What the lender expects to achieve on an ordinary sale'],
          ['Distress or forced-sale value', 'Recovery on enforcement'],
          ['Legal title and marketability', 'An unsaleable asset is not collateral'],
          ['Encumbrances and prior charges', 'The lender’s actual position in the security'],
          ['Approved versus actual area', 'Unapproved construction is usually excluded from value'],
          ['Occupancy and completion certificates', 'Determines whether the building is lendable at all'],
          ['Construction stage', 'Governs staged disbursement'],
          ['Age and condition of the structure', 'Depreciation and remaining usable life'],
          ['Location and liquidity', 'How quickly the asset could be sold'],
          ['Permitted use and zoning', 'Whether the current use is lawful'],
          ['Insurance value', 'Protection of the security']
        ]} />
        <p>Where a lender&rsquo;s valuation comes in low, the productive response is to find what was excluded — an area not supported by the approved plan, an encumbrance not released, a certificate not produced — and address it. Arguing about the number without addressing the exclusion rarely moves anything.</p>
      </Section>

      <Section id="family" title="Family Settlement and Divorce">
        <p>In family matters valuation usually matters less as a number than as a process both sides can accept. Two brokers&rsquo; opinions produce a negotiation; one documented valuation with a stated method and date produces a settlement.</p>
        <DataTable headers={['Situation', 'How valuation is used']} rows={[
          ['Partition among co-owners', 'Equal division, or compensation where division is impractical'],
          ['Buyout by one family member', 'The price at which the others exit'],
          ['Inheritance among heirs', 'Estate value and the share of each heir'],
          ['Unequal assets to be equalised', 'A common basis for comparing dissimilar properties'],
          ['Joint sale to a third party', 'The reserve price agreed in advance'],
          ['Matrimonial settlement', 'Asset division, alimony and the value of a retained property'],
          ['Succession planning during lifetime', 'Stamp duty and tax consequences of the intended route'],
          ['Gift or settlement deed', 'Stamp duty value and the tax position on both sides'],
          ['Consent terms before a court', 'A valuation annexed makes the terms harder to reopen']
        ]} />
        <p>Where a transfer within the family is contemplated, the stamp duty and tax position should be assessed before the instrument is drawn. See <Link href="/solutions/legal/gift-deed-registration">Gift Deed Registration</Link>.</p>
      </Section>

      <Section id="corporate" title="Corporate Transactions">
        <DataTable headers={['Transaction', 'Why valuation is required']} rows={[
          ['Sale or transfer of a company asset', 'Fair value, and the board and audit record behind the price'],
          ['Related-party transaction', 'Arm’s length support'],
          ['Merger, demerger or scheme of arrangement', 'Asset values supporting the scheme and the share exchange'],
          ['Capital reduction', 'Net worth and asset value'],
          ['Creation of security', 'Collateral value for the lender'],
          ['Insolvency resolution or liquidation', 'Fair value and liquidation value by registered valuers'],
          ['Financial reporting', 'Fair value or impairment under the accounting standard'],
          ['Shareholder dispute', 'An independent reference point for the underlying assets'],
          ['Conversion of a firm or LLP', 'Value of the assets contributed'],
          ['Internal restructuring', 'Transfer value and the tax consequence']
        ]} />
        <p>Where a statute requires the valuation to be by a registered valuer, confirm the registration number and the asset class before the engagement, not when the report is filed. See <Link href="/solutions/legal/mergers-and-acquisitions">Mergers and Acquisitions</Link> and <Link href="/solutions/legal/demerger">Demerger</Link> for the transaction frameworks.</p>
      </Section>

      <Section id="report" title="What the Report Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Identification of the property', 'Survey or city survey number, flat and building details, boundaries'],
          ['Stated purpose of the valuation', 'Determines whether the report can be used for your use'],
          ['Valuation date', 'A report without one is of limited use'],
          ['Valuer identity, registration number and asset class', 'Establishes competence to give the report for the purpose'],
          ['Documents relied upon', 'Shows what was verified and what was assumed'],
          ['Site inspection record', 'Date of inspection, condition, and who was present'],
          ['Area considered, and its source', 'Land area, built-up and carpet area, tied to the approved plan'],
          ['Approvals and permitted use', 'Residential, commercial, industrial or agricultural'],
          ['Treatment of unapproved construction', 'Identified separately, not silently included'],
          ['Encumbrances and tenancies noted', 'Both affect marketability and value'],
          ['Comparable transactions', 'Identified and adjusted, not merely asserted'],
          ['Circle rate or guideline value', 'The statutory cross-check'],
          ['Method, and why it was adopted', 'The most commonly challenged part of any report'],
          ['Assumptions and limitations', 'Defines the scope and what the valuer did not verify'],
          ['The value, and its basis', 'Market, realisable, distress, fair or liquidation value — stated as such'],
          ['Photographs and location reference', 'Supports the condition and locality described'],
          ['Annexures and calculations', 'Allows the figure to be checked rather than taken on trust']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Property, purpose and deadline identified'],
          ['2', 'Purpose and standard of value', 'What value is needed, and as of which date'],
          ['3', 'Registration requirement check', 'Whether a registered valuer is required, and in which framework'],
          ['4', 'Valuer identification', 'Registration number and asset class verified before engagement'],
          ['5', 'Document checklist', 'Property-specific list issued to the client'],
          ['6', 'Title and ownership review', 'Sale deed, chain of title, mutation and encumbrance'],
          ['7', 'Area and approval review', 'Approved plan against actual construction'],
          ['8', 'Circle rate review', 'Notified value for the locality and category'],
          ['9', 'Site visit coordination', 'Inspection arranged and recorded'],
          ['10', 'Draft report review', 'Method, assumptions, area, comparables and red flags examined'],
          ['11', 'Tax and stamp impact', 'Section 78 and Section 92(2)(m) consequences assessed'],
          ['12', 'Final report and file', 'Report with annexures, in the format the purpose requires'],
          ['13', 'Post-report support', 'Clarifications to the lender, authority or counterparty'],
          ['14', 'Tracking', 'Ticket-based status updates through to closure']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Latest sale deed', 'Ownership and the last transaction value'],
          ['Prior title documents', 'Chain of title'],
          ['Property tax receipt', 'Identification of the property and dues position'],
          ['Encumbrance certificate', 'Charges, mortgages and registered transactions'],
          ['Mutation or revenue record', 'Land and municipal ownership entries'],
          ['Approved building plan', 'Sanctioned area and the legality of construction'],
          ['Occupancy or completion certificate', 'Whether the building is lawfully complete'],
          ['Commencement certificate, where under construction', 'Project stage and approvals'],
          ['RERA registration details', 'Promoter and project disclosures where applicable'],
          ['Society share certificate', 'Co-operative society property'],
          ['Allotment and possession letters', 'Builder-sold property'],
          ['Area statement', 'Carpet, built-up and super built-up area'],
          ['Lease deed, where tenanted', 'Rent, term and the income basis'],
          ['Rent receipts and ledger', 'Sustainable rent for the income method'],
          ['Utility bills', 'Occupancy and use'],
          ['Photographs', 'Condition of the property'],
          ['Location reference', 'Access, locality and surroundings'],
          ['Loan and mortgage documents', 'Existing charges'],
          ['Litigation papers, where any', 'Risk and marketability adjustment'],
          ['Purpose note', 'The use, the required format and the valuation date']
        ]} />
      </Section>

      <Section id="red-flags" title="Red Flags in a Valuation Report">
        <DataTable headers={['Red flag', 'Why it matters']} rows={[
          ['No purpose stated', 'The report cannot be assessed, and may not be accepted'],
          ['No valuation date', 'Value without a date is not value'],
          ['No registration number or asset class', 'Cannot be used where registration is required'],
          ['Valuer registered in the wrong asset class', 'The report is outside the valuer’s competence'],
          ['Value based only on broker opinion or listings', 'Asking prices are not transactions'],
          ['Comparables not identified', 'Unverifiable, and the first thing an objector attacks'],
          ['No site inspection where one was expected', 'Undermines the whole report'],
          ['Area taken from the brochure rather than the plan', 'Super built-up area inflates value against sanctioned area'],
          ['Unapproved construction included silently', 'Renders the report unusable for a lender, court or authority'],
          ['Circle rate not referred to', 'The statutory cross-check is missing'],
          ['Depreciation not applied to the structure', 'Overstates building value'],
          ['Rent assumed above achievable rent', 'Error compounds through the capitalisation'],
          ['Development potential assumed without approvals', 'Speculative, and usually the largest overstatement'],
          ['Encumbrance or tenancy not disclosed', 'Marketability misrepresented'],
          ['No assumptions or limitations section', 'Scope is undefined and nothing was reportedly excluded'],
          ['Arithmetic not shown', 'The figure cannot be checked'],
          ['A single figure for multiple inconsistent purposes', 'It will fail at least one of them']
        ]} />
      </Section>

      <Section id="verification" title="Valuation Is Not Title Verification">
        <DataTable headers={['Point', 'Valuation', 'Title verification']} rows={[
          ['Question answered', 'What is it worth?', 'Is it safe to acquire?'],
          ['Examines', 'Market evidence, area, condition, use and comparables', 'Title chain, ownership, encumbrance, approvals and litigation'],
          ['Output', 'A valuation report', 'A title or due diligence report'],
          ['Required for', 'Lending, tax, settlement, company law and litigation', 'Purchase, mortgage, lease and investment'],
          ['Principal risk if skipped', 'A wrong price', 'A defective title'],
          ['Relationship', 'Assumes the title position described to the valuer', 'Establishes the position the valuation assumes']
        ]} />
        <p>A high valuation on a defective title is a dangerous document, because it looks like comfort. Where a purchase, mortgage or investment is in prospect, the two exercises belong together — verify first, then value on the verified position.</p>
      </Section>

      <Section id="nri" title="NRI Property Valuation">
        <DataTable headers={['Situation', 'What it requires']} rows={[
          ['Selling Indian property from abroad', 'Fair market value for the capital gains position and the withholding'],
          ['Buying remotely', 'Independent valuation and title review before committing'],
          ['Overseas tax or regulatory reporting', 'A report in the format and as of the date the foreign requirement specifies'],
          ['Inherited Indian property', 'Value at the date of death, and the eventual cost base'],
          ['A family dispute over value', 'A neutral report both sides can test'],
          ['A foreign matrimonial proceeding', 'Indian asset value in a form the foreign court can use'],
          ['Loan against Indian property', 'Lender valuation coordination'],
          ['Gift or transfer to family in India', 'Stamp duty value and the tax position on both sides'],
          ['Inability to attend the inspection', 'Local representation for the site visit'],
          ['Use of the report abroad', 'Notarisation, apostille or consular attestation']
        ]} />
        <p>Repatriation, withholding and treaty questions sit alongside the valuation and should be assessed together. A report that is correct on value but wrong on date or format for the foreign requirement has to be done again.</p>
      </Section>

      <Section id="common-issues" title="Why Valuations Get Rejected">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Purpose not fixed before commissioning', 'The report is unusable and a second one is needed', 'Purpose, standard of value and date settled first'],
          ['Valuer not registered for the required purpose', 'The report is not considered at all', 'Registration and asset class verified before engagement'],
          ['Old statutory citations used', 'Signals a report not prepared on current law', 'Citations aligned to the Income-tax Act, 2025 and the 2026 Rules'],
          ['Area taken from marketing material', 'Value overstated against the sanctioned plan', 'Area reconciled to the approved plan and the title documents'],
          ['Unapproved construction included', 'Lender and authority both reject the report', 'Identified and valued separately or excluded'],
          ['Circle rate ignored', 'Stamp shortfall, and substitution under Section 78', 'Circle rate compared and the divergence explained'],
          ['Comparables unverified', 'The method collapses under questioning', 'Transactions verified rather than quoted'],
          ['Rent or development potential overstated', 'Scrutiny, and a report that cannot be defended', 'Assumptions tested against approvals and achievable rent'],
          ['Title defect not disclosed to the valuer', 'The report assumes a position that does not exist', 'Title review ahead of valuation'],
          ['Report undated or without assumptions', 'Not acceptable for most statutory purposes', 'Format reviewed against the intended use'],
          ['Report obtained after the assessment began', 'Materially less persuasive', 'Valuation put in place before the position is taken'],
          ['One report used for several purposes', 'It fails at least one of them', 'Purpose-specific reports where the uses genuinely differ']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Purpose and standard of value assessment', 'What value is needed, as of what date, in what format'],
          ['Registration requirement mapping', 'Whether Companies Act Section 247 or Income-tax Section 514 applies'],
          ['Registered valuer coordination', 'Registration number and asset class verified before engagement'],
          ['Document checklist', 'Property-specific list and collection support'],
          ['Title and chain review', 'Sale deed, prior documents, mutation and encumbrance'],
          ['Area and approval review', 'Approved plan against actual construction and the title area'],
          ['Circle rate comparison', 'Notified value against the assessed market value'],
          ['Tax valuation support', 'Section 78, Section 92(2)(m) and cost-base documentation'],
          ['Lending valuation support', 'Lender coordination and response to a low valuation'],
          ['Corporate valuation support', 'Scheme, related-party, security and reporting requirements'],
          ['Insolvency valuation support', 'Fair value and liquidation value coordination'],
          ['Family settlement valuation', 'A neutral basis for partition, buyout and inheritance'],
          ['Litigation valuation support', 'Evidence-grade reports and valuer coordination'],
          ['NRI valuation support', 'Remote inspection, format and authentication'],
          ['Independent report review', 'Purpose, valuer, documents, method, area and red flags'],
          ['Ticket-based tracking', 'Documents, valuer, site visit, draft, final report and closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A valuation is only as good as the purpose it was built for. Fix the purpose and the valuation date first; the valuer, the registration, the method and the documents all follow from them. In our experience reports fail far more often on purpose, registration and area than on the number — and a report that shows its working can be defended, while one that states a figure cannot.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal, valuation or tax advice. The applicable requirements, the registration a valuer must hold, the method and the tax consequence depend on the property, the purpose, the State and the year in question. The provisions described here reflect the Companies Act, 2013 and the Companies (Registered Valuers and Valuation) Rules, 2017, and the Income-tax Act, 2025 with the Income-tax Rules, 2026, which apply from tax year 2026-27; circle rates, stamp duty and State revenue requirements change locally and frequently, and parts of this guide remain under professional review. Estabizz provides purpose assessment, document and title review, valuer coordination, report review and documentation support; the valuation itself is given by the registered or empanelled valuer. Confirm the position with your valuer and tax adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
