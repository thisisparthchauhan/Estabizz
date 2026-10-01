'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'improvement-notice', title: 'The Improvement Notice Mechanism' },
  { id: 'decriminalisation', title: 'What Jan Vishwas Changed' },
  { id: 'bns', title: 'The BNS No Longer Covers This' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'types', title: 'Types of Contravention' },
  { id: 'packaged', title: 'Packaged Commodity Declarations' },
  { id: 'ecommerce', title: 'E-Commerce Listings' },
  { id: 'verification', title: 'Verification, Stamping and Licences' },
  { id: 'inspection', title: 'Inspection and Seizure' },
  { id: 'reply', title: 'Answering the Notice' },
  { id: 'compounding', title: 'Compounding, Appeal and Defence' },
  { id: 'company', title: 'Company and Officer Liability' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'preventive', title: 'Preventive Compliance' },
  { id: 'who', title: 'Who This Affects' },
  { id: 'common-issues', title: 'Why Matters Escalate' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Which law governs weights and measures offences?', 'The Legal Metrology Act, 2009, with the Legal Metrology (Packaged Commodities) Rules, 2011 and the other rules under the Act, enforced through the State Legal Metrology Department under the Controller of Legal Metrology. The Department of Consumer Affairs administers the Act at the centre.'],
  ['Are the old IPC sections on false weights still used?', 'No. Sections 264 to 267 of the Indian Penal Code, which dealt with fraudulent use of false instruments for weighing, false weights and measures and their manufacture or sale, were not carried forward into the Bharatiya Nyaya Sanhita, 2023. The Legal Metrology Act is now the operative framework.'],
  ['So no criminal provision can apply at all?', 'The BNS can apply where the facts independently disclose a different offence — cheating, forgery, use of a forged record, or criminal breach of trust. What has gone is the standalone weights-and-measures offence. A routine metrology lapse is a metrology matter, and reading criminal intent into it is usually a mistake in either direction.'],
  ['What is an improvement notice?', 'A mechanism introduced into the Legal Metrology Act by the Jan Vishwas (Amendment of Provisions) Act, 2026, which inserted a definition of "improvement notice" in Section 2. A Legal Metrology Officer may issue one for a specified first-time procedural or regulatory contravention, giving the business a reasonable opportunity to rectify the deficiency instead of proceeding straight to penal action.'],
  ['From when does it apply?', 'The Department of Consumer Affairs notified the relevant Legal Metrology provisions by S.O. 2103(E) dated 27 April 2026, with effect from 1 May 2026.'],
  ['Which contraventions does it cover?', 'A specified list of first-time procedural and regulatory contraventions — broadly use and sale of non-standard weights or measures, model approval, documentation and returns, import and registration requirements, non-standard packaged commodities, and furnishing of statutory information. It operates on the sections dealing with those matters rather than across the whole Act.'],
  ['What is excluded from it?', 'Repeated contraventions, fraud, tampering, and conduct that harms consumer interests. It is a mechanism for genuine procedural lapses, not a general amnesty, and arguing for it where the facts show tampering wastes the one opportunity that was available.'],
  ['What happens if I comply with an improvement notice?', 'Penal proceedings and the litigation that follows may be avoided. That is the entire point of the mechanism — and it is why the reply to a notice should be drafted with the improvement route in mind from the outset rather than after a penalty has been proposed.'],
  ['What happens if I do not?', 'Failure to comply, and repeated non-compliance, continue to attract penal action under the relevant provisions. The improvement notice is an opportunity; it does not extinguish the underlying contravention.'],
  ['Did Jan Vishwas reduce the penalties?', 'It restructured them. The Jan Vishwas (Amendment of Provisions) Act, 2023 replaced imprisonment with monetary penalty for a number of the procedural provisions, while raising the amounts substantially and introducing escalation for second and subsequent contraventions. The direction of travel is less imprisonment and more money, with repeat conduct treated far more seriously.'],
  ['Should I just assume the old penalty figures?', 'No, and this is worth being careful about. The amounts in the pre-amendment text of the Act are no longer the operative figures for the amended provisions, and the amendments were notified in stages. Confirm the figure for the specific section as it stands at the relevant date rather than working from an older copy of the Act.'],
  ['Is verification of a weighing instrument mandatory?', 'Yes. Section 24 requires a weight or measure intended for use in a transaction or for protection to be verified and stamped before use, with fees paid at the prescribed time and place. An instrument in use on an expired verification is a live contravention, and it is the easiest thing in the world for an inspector to establish.'],
  ['Do I need a licence?', 'Section 23 prohibits manufacture, repair or sale of a weight or measure without a licence from the Controller. A user of an instrument is in a different position from a person who manufactures, repairs or deals in them.'],
  ['What is a packaged commodity violation?', 'Non-compliance with the mandatory declarations on a pre-packaged commodity — net quantity, retail sale price, the name and address of the manufacturer, packer or importer, the date of manufacture, packing or import, consumer care details, and the correct unit and symbol. Section 36 deals with non-standard packages, including shortfall in the declared net quantity.'],
  ['Can e-commerce listings attract a notice?', 'Yes. The mandatory declarations have to be visible on the digital listing itself, not only on the physical package. A listing that omits the net quantity, the importer details or the consumer care information can be the subject of a notice against the seller, and in some situations the platform.'],
  ['Can an imported package create exposure?', 'Commonly, yes. Imported pre-packaged commodities must carry the importer declarations, and an importer of weights or measures has a separate registration requirement under Section 38. Relabelling after import must still produce a compliant declaration.'],
  ['What is compounding?', 'A statutory settlement under Section 48 by which specified offences may be compounded on payment, before or after prosecution is instituted, by the Director or the Controller within the prescribed limits. It closes the matter without a trial.'],
  ['Should I compound immediately?', 'Not reflexively. Compounding is quick, but it creates a record, and Section 48 bars compounding a similar offence within three years of a previous compounded offence. A business that compounds a label defect this year can find the same defect next year is not compoundable at all. Assess the repeat exposure before paying.'],
  ['Can a departmental order be appealed?', 'Yes. Section 50 provides an appeal against a decision or order, to the Director or the Central Government, or to the State Government, depending on the officer who passed it. The appeal must be filed within sixty days, extendable where sufficient cause for the delay is shown. The appellate authority may confirm, modify or set aside the order, or direct fresh proceedings.'],
  ['Can directors be held liable?', 'Section 49 makes the person in charge of and responsible to the company for the conduct of its business liable along with the company, subject to the usual defences of lack of knowledge and due diligence. The Act also allows a company to nominate a director to be responsible for compliance, and the court may order publication of the name and place of business of a convicted company at its expense.'],
  ['Is the nominee director mechanism worth using?', 'It is worth getting right, because it determines who is answerable. The nomination has to be made properly, with the nominee’s consent and the prescribed intimation, and it has to reflect someone who actually has charge of the function. A nomination on paper that does not match the reality tends not to survive examination.'],
  ['Are goods or instruments seized during inspection?', 'They can be. Where a seizure occurs the seizure memo is the key document — what was taken, on what basis, in whose presence. Release and the defence on merits are different exercises, and the memo governs both.'],
  ['How quickly must I reply to a notice?', 'Within the period stated in the notice. Treat it as short. Where the contravention is curable, the value of a reply drops sharply once the correction could have been made and was not — particularly now that the improvement route exists.'],
  ['Will screenshots of my own listing be used against me?', 'Yes, and they are frequently the whole case in an e-commerce matter. Electronic records are governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, so preserve your own complete listing history, including the version as it stood on the date alleged.'],
  ['What is the biggest mistake after receiving a notice?', 'A casual reply that admits the facts in general terms without identifying the precise contravention alleged, without correcting what is curable, and without engaging with the improvement notice route. That reply converts a rectifiable lapse into an admitted offence.'],
  ['Can Estabizz appear before the authority?', 'We handle notice review, reply drafting, compliance correction, documentation, compounding assessment, appeal strategy and advocate briefing. Appearance before a court is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Compliance' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Weights and Measures Offences' }]}
      title="Offences Relating to Weights and Measures"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Weights and Measures Offences"
      sections={sections}
      ctaTitle="Speak With a Legal Metrology Expert"
      ctaDescription="Identify the precise contravention alleged, correct what is curable, and reply in a way that keeps the improvement route open."
      quickFacts={[
        { label: 'Main law', value: 'Legal Metrology Act, 2009' },
        { label: 'Improvement notice', value: 'In force from 1 May 2026' },
        { label: 'Compounding', value: 'Section 48' },
        { label: 'Appeal', value: 'Section 50, within 60 days' }
      ]}
      relatedArticles={[
        { title: 'Food Adulteration', href: '/solutions/legal/food-adulteration-legal-services', category: 'Legal', description: 'FSSAI notices, sampling and the referral laboratory right, licence risk and penalties.' },
        { title: 'Consumer Court Complaints', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Jurisdiction, limitation, pleadings and reliefs under the consumer protection framework.' },
        { title: 'Faulty Product Notice', href: '/solutions/legal/faulty-product-notice', category: 'Legal', description: 'Defective goods, warranty denial, product liability and e-commerce escalation.' }
      ]}
      finalCtaTitle="Correct It, Then Answer It"
      finalCtaDescription="Since May 2026 a first-time procedural lapse can be met with an improvement notice rather than a penalty. That route closes if the correction is not made and the reply does not ask for it."
      heroDescription={<p>A weighing scale on an expired verification, a label missing the importer details, a listing without the net quantity — these are ordinary operational lapses that the Legal Metrology Department treats as contraventions. The framework changed materially in 2026: a first-time procedural lapse can now be met with an improvement notice and an opportunity to rectify, while repeated and deliberate conduct is treated more seriously than before. Estabizz assists manufacturers, importers, packers, retailers, e-commerce sellers, petrol pumps, jewellers, warehouses, logistics operators and food businesses with notice review, reply drafting, compliance correction, packaged commodity and listing review, verification and licence advisory, compounding assessment, appeal strategy, company and officer liability mapping, and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> if your business weighs, measures, counts or packs anything it sells, the instruments and the declarations have to meet the standards the Legal Metrology Act sets — and a lapse is a contravention whether or not anyone was misled.</p>
        <p>That last point is what surprises businesses. Nobody short-changed a customer. The scale drifted, or its verification lapsed while the certificate sat in a drawer. The label went to print without the consumer care number. The marketplace listing carried the net quantity in the image but not in the declaration field. None of it was dishonest, and all of it is actionable.</p>
        <p>What has changed is what the Department can do about it on a first occasion. Since May 2026 an officer may issue an improvement notice and allow the deficiency to be rectified. Whether that happens in a given case depends substantially on how the matter is handled in the first fortnight.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Offences relating to weights and measures are not a licence or a registration. They are contraventions of the Legal Metrology Act, 2009 and the rules under it, enforced by the State Legal Metrology Department.</p>
        <p>The Bharatiya Nyaya Sanhita did not carry forward the old Indian Penal Code provisions on false weights and measures, so the Legal Metrology Act is the operative framework. The Jan Vishwas amendments replaced imprisonment with escalating monetary penalties across much of the Act, and the Jan Vishwas (Amendment of Provisions) Act, 2026 introduced an improvement notice mechanism for specified first-time procedural contraventions, notified with effect from 1 May 2026. Compounding is available under Section 48 and appeal under Section 50.</p>
      </Section>

      <Section id="improvement-notice" title="The Improvement Notice Mechanism">
        <div className="info-box" aria-label="The improvement notice route">
          <p><strong>This is the most consequential development in Legal Metrology enforcement in years, and it is easy to forfeit.</strong> The Jan Vishwas (Amendment of Provisions) Act, 2026 inserted a definition of &ldquo;improvement notice&rdquo; into Section 2 of the Legal Metrology Act. A Legal Metrology Officer may issue one for a specified first-time procedural or regulatory contravention, giving a reasonable opportunity to rectify the deficiency before penal action follows. The Department of Consumer Affairs notified the relevant provisions by S.O. 2103(E) dated 27 April 2026, effective 1 May 2026.</p>
        </div>
        <DataTable headers={['Point', 'Position']} rows={[
          ['Introduced by', 'Jan Vishwas (Amendment of Provisions) Act, 2026'],
          ['Statutory hook', 'A definition of improvement notice inserted in Section 2 of the Legal Metrology Act, 2009'],
          ['Notified by', 'Department of Consumer Affairs, S.O. 2103(E) dated 27 April 2026'],
          ['Effective from', '1 May 2026'],
          ['Issued by', 'A Legal Metrology Officer'],
          ['Applies to', 'Specified first-time procedural and regulatory contraventions'],
          ['Subject matter covered', 'Non-standard weights and measures, model approval, documentation and returns, import and registration, non-standard packages, and furnishing of statutory information'],
          ['Time to comply', 'A reasonable opportunity to rectify, as the notice specifies'],
          ['If complied with', 'Penal proceedings and the resulting litigation may be avoided'],
          ['If not complied with', 'Penal action proceeds under the relevant provision'],
          ['Excluded', 'Repeated contraventions, fraud, tampering, and conduct harming consumer interests'],
          ['Who benefits most', 'Manufacturers, importers, packers, dealers, repairers, traders and MSMEs with genuine procedural lapses']
        ]} />
        <p>Two practical consequences follow. The first is that correcting the deficiency immediately is now worth more than it used to be, because there is a mechanism that rewards it. The second is that the reply must be framed to engage with that mechanism — identifying the contravention as a first-time procedural lapse, evidencing the rectification, and asking for the improvement route expressly. A reply that simply disputes everything does not invite it.</p>
      </Section>

      <Section id="decriminalisation" title="What Jan Vishwas Changed">
        <p>The Legal Metrology Act as enacted carried imprisonment for a range of contraventions, including ones that were procedural and rectifiable. The Jan Vishwas (Amendment of Provisions) Act, 2023 restructured that across a number of provisions, replacing imprisonment with monetary penalty on first and often second contravention, raising the amounts substantially, and introducing escalation for repeat conduct.</p>
        <DataTable headers={['Aspect', 'Original position', 'After the Jan Vishwas amendments']} rows={[
          ['Procedural contraventions', 'Fine, with imprisonment on a second or subsequent offence', 'Monetary penalty, escalating by occasion, for much of the procedural ground'],
          ['Penalty amounts', 'Set in 2009 and unrevised', 'Substantially raised'],
          ['Repeat conduct', 'Imprisonment on a second offence', 'Steep escalation by occasion, with imprisonment retained for the more serious provisions'],
          ['First-time procedural lapses', 'Penal action, with compounding as the only exit', 'Improvement notice route available from 1 May 2026'],
          ['Tampering and fraud', 'Penal', 'Penal — expressly outside the improvement route'],
          ['Commencement', 'Not applicable', 'Brought into force in stages by notification']
        ]} />
        <div className="warning-box" aria-label="Do not work from an old copy of the Act">
          <p><strong>The penalty figures printed in the pre-amendment text of the Act are no longer the operative amounts for the amended provisions, and the amendments were brought into force in stages rather than all at once.</strong> We do not reproduce rupee figures in a table here for that reason — a figure that is wrong by a factor of four is worse than no figure. The amount for a specific section, as it stood on the date of the alleged contravention, should be confirmed against the current text before any compounding decision is taken.</p>
        </div>
      </Section>

      <Section id="bns" title="The BNS No Longer Covers This">
        <p>Sections 264 to 267 of the Indian Penal Code dealt with fraudulent use of a false instrument for weighing, fraudulent use of a false weight or measure, possession of a false weight or measure, and the making or selling of one. Those provisions were not carried forward into the Bharatiya Nyaya Sanhita, 2023, on the view that the Legal Metrology Act covers the field.</p>
        <DataTable headers={['Law', 'Role in a weights and measures matter']} rows={[
          ['Legal Metrology Act, 2009', 'The operative framework — standards, verification, licences, packaged commodities, penalties and compounding'],
          ['Legal Metrology Rules and the Packaged Commodities Rules', 'The detailed requirements that most notices actually allege'],
          ['Bharatiya Nyaya Sanhita, 2023', 'No standalone weights and measures offence; relevant only where the facts disclose cheating, forgery, use of a forged record or criminal breach of trust'],
          ['Bharatiya Nagarik Suraksha Sanhita, 2023', 'Procedure where a complaint, summons, trial or criminal process arises'],
          ['Bharatiya Sakshya Adhiniyam, 2023', 'Evidence, including electronic records such as listings, invoices and ERP logs'],
          ['Consumer Protection Act, 2019', 'Where a consumer complaint accompanies the departmental action'],
          ['Sector law', 'FSSAI, drugs, petroleum or other regulators where the product is separately regulated']
        ]} />
        <p>The practical effect runs in both directions. A business facing a metrology notice should not be told it faces a criminal charge for a short-weight allegation standing alone. Equally, where there is genuine deception — a tampered seal, a manipulated dispensing unit, a declaration known to be false — the BNS provisions on cheating and forgery remain fully available on those facts. See <Link href="/solutions/legal/criminal-misappropriation-of-property">Criminal Misappropriation of Property</Link> for how the civil and criminal line is drawn in property offences generally.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Legal Metrology Act, 2009'],
          ['Principal rules', 'Legal Metrology (Packaged Commodities) Rules, 2011, and the General Rules'],
          ['Amending law', 'Jan Vishwas (Amendment of Provisions) Acts of 2023 and 2026'],
          ['Improvement notice commencement', 'S.O. 2103(E) dated 27 April 2026, effective 1 May 2026'],
          ['Central administration', 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution'],
          ['State enforcement', 'Controller of Legal Metrology and Legal Metrology Officers'],
          ['Model approval', 'Prescribed for specified categories of instrument'],
          ['Licensing', 'Manufacture, repair and sale of weights and measures'],
          ['Verification and stamping', 'By the department, or through a Government-approved Test Centre where prescribed'],
          ['Compounding', 'Legal Metrology Act, Section 48'],
          ['Company liability', 'Legal Metrology Act, Section 49'],
          ['Appeal', 'Legal Metrology Act, Section 50, within sixty days'],
          ['Procedure in prosecution', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Subject']} rows={[
          ['Section 8', 'Standard weight, measure or numeral, and the prohibition on non-standard ones'],
          ['Section 11', 'Prohibition on quoting, invoicing or advertising otherwise than in standard units'],
          ['Section 23', 'Prohibition on manufacture, repair or sale of a weight or measure without a licence'],
          ['Section 24', 'Verification and stamping of a weight or measure before use'],
          ['Section 25', 'Penalty for use of a non-standard weight or measure'],
          ['Section 26', 'Penalty for alteration of a reference, secondary or working standard'],
          ['Section 27', 'Penalty for manufacture or sale of a non-standard weight or measure'],
          ['Section 28', 'Penalty for a transaction, deal or contract in contravention of the prescribed standards'],
          ['Section 29', 'Penalty for quoting or publishing in non-standard units'],
          ['Section 30', 'Penalty for delivering less than the contracted quantity, or receiving more'],
          ['Section 31', 'Penalty for non-production of documents, records and returns'],
          ['Section 33', 'Penalty for use or sale of an unverified weight or measure'],
          ['Section 34', 'Penalty for sale or delivery of commodities by a non-standard weight or measure'],
          ['Section 35', 'Penalty for rendering services by a non-standard weight, measure or number'],
          ['Section 36', 'Penalty for selling non-standard packages, including shortfall in declared net quantity'],
          ['Section 38', 'Penalty for non-registration by an importer of a weight or measure'],
          ['Section 41', 'Penalty for giving false information or a false return'],
          ['Section 43', 'Penalty for verification in contravention of the Act and rules'],
          ['Section 45', 'Penalty for manufacture of a weight or measure without a licence'],
          ['Section 48', 'Compounding of offences, and the three-year bar on compounding a similar offence'],
          ['Section 49', 'Offences by companies, the nominee mechanism, and publication of a convicted company’s name'],
          ['Section 50', 'Appeals, within sixty days, extendable for sufficient cause']
        ]} />
      </Section>

      <Section id="types" title="Types of Contravention">
        <DataTable headers={['Contravention', 'How it typically arises', 'Usually curable?']} rows={[
          ['Instrument used without verification', 'A new scale put into use before stamping', 'Yes — verify and document'],
          ['Verification lapsed', 'Renewal missed while the certificate sat unchecked', 'Yes — renew and evidence'],
          ['Non-standard weight or measure in use', 'A drifting or uncalibrated instrument', 'Yes — replace or recalibrate'],
          ['Tampered stamp or seal', 'Interference with the official mark', 'No — outside the improvement route'],
          ['Short net quantity in the package', 'Fill variation beyond permissible error', 'Depends on cause and extent'],
          ['Retail sale price missing or wrong', 'Artwork error or an overprinted sticker', 'Yes — correct the artwork and stock'],
          ['Manufacturer or packer details absent', 'Label approved without the mandatory field', 'Yes — correct and re-label'],
          ['Importer declarations missing', 'Imported stock relabelled incompletely', 'Yes — correct before further sale'],
          ['Consumer care details absent', 'Field omitted from the artwork', 'Yes'],
          ['Date of manufacture, packing or import missing', 'Line coding failure or artwork omission', 'Yes'],
          ['Wrong unit or symbol used', 'Non-SI unit or an incorrect symbol on the pack', 'Yes'],
          ['Quotation or invoicing in non-standard units', 'Price lists and invoices not in standard units', 'Yes'],
          ['E-commerce listing missing declarations', 'Catalogue fields left blank at upload', 'Yes — correct the listing and keep proof'],
          ['Manufacture, repair or sale without licence', 'Activity begun before licensing', 'Depends — regularise promptly'],
          ['Importer not registered', 'Import of weights or measures without registration', 'Yes — register'],
          ['Records or returns not produced', 'Records not maintained or not available on inspection', 'Yes'],
          ['False information or return', 'An incorrect statement to the department', 'No — treated as serious'],
          ['Obstruction of an officer', 'Refusal of access or cooperation during inspection', 'No — avoid entirely']
        ]} />
      </Section>

      <Section id="packaged" title="Packaged Commodity Declarations">
        <p>Most notices in practice are label notices. The Packaged Commodities Rules prescribe what a pre-packaged commodity must declare, and the declarations are assessed as they appear on the pack — not as they were intended in the artwork file.</p>
        <DataTable headers={['Declaration', 'What is checked']} rows={[
          ['Name and address of the manufacturer, packer or importer', 'Present, complete and accurate for the entity actually responsible'],
          ['Common or generic name of the commodity', 'Identifies what is in the pack'],
          ['Net quantity', 'In standard units, with the correct symbol, and matching the actual content'],
          ['Retail sale price', 'Declared as maximum retail price inclusive of all taxes, and not altered'],
          ['Date of manufacture, packing or import', 'Present, legible and in the prescribed form'],
          ['Consumer care details', 'Name, address, telephone and email of the person to be contacted'],
          ['Unit sale price, where required', 'Correctly computed and displayed'],
          ['Country of origin, for imported goods', 'Declared on the pack and on the listing'],
          ['Legibility and placement', 'Prominently and conspicuously displayed, not obscured'],
          ['Permissible error on net quantity', 'Within the prescribed tolerance, evidenced by line records'],
          ['Combination and multi-piece packages', 'Declarations on both the outer and the individual packs as prescribed'],
          ['Stickering and overprinting', 'Permitted only within the limits the Rules allow']
        ]} />
        <p>Where a net quantity shortfall is alleged, the defence lives in the production records. Line fill data, batch checks and the calibration history of the filling and checkweighing equipment are what distinguish random variation within tolerance from systematic short-filling, and they have to exist before the notice arrives.</p>
      </Section>

      <Section id="ecommerce" title="E-Commerce Listings">
        <p>Online sellers routinely assume the physical pack is what matters. The declarations must be visible on the digital listing itself, and a listing is far easier for the department to capture and date than a pack on a shelf.</p>
        <DataTable headers={['Issue', 'Practical position']} rows={[
          ['Declarations on the listing', 'The mandatory declarations must appear on the platform listing, not only on the package'],
          ['Declarations in the product image only', 'Generally insufficient — the declaration fields themselves must carry them'],
          ['Net quantity and retail sale price', 'The two most commonly flagged omissions'],
          ['Country of origin', 'Required on the listing for imported goods'],
          ['Consumer care details', 'Required, and often the field left blank at catalogue upload'],
          ['Marketplace versus seller responsibility', 'Depends on who controls the listing and whose declaration it is'],
          ['Evidence against you', 'A dated screenshot of your own listing'],
          ['Evidence for you', 'Your own listing version history, preserved for the date alleged'],
          ['Correction', 'Make it immediately and retain proof of the corrected state and its date'],
          ['Multiple SKUs', 'A catalogue-wide audit is usually needed, not a single-listing fix']
        ]} />
        <p>Where a notice relies on a screenshot, the first question is what the listing actually said on the date alleged. Platforms overwrite catalogue data, so a seller who does not preserve their own version history is left arguing against the department&rsquo;s copy with nothing of their own.</p>
      </Section>

      <Section id="verification" title="Verification, Stamping and Licences" >
        <DataTable headers={['Requirement', 'Who it applies to', 'Provision']} rows={[
          ['Instruments used in a transaction must be verified and stamped', 'Any user — retailer, petrol pump, jeweller, warehouse, factory', 'Section 24'],
          ['Re-verification on the prescribed cycle', 'Any user', 'Section 24 and the rules'],
          ['Use or sale of an unverified instrument is penalised', 'Users and sellers', 'Section 33'],
          ['Licence for manufacture, repair or sale', 'Manufacturers, dealers and repairers', 'Section 23'],
          ['Penalty for manufacture without a licence', 'Manufacturers', 'Section 45'],
          ['Model approval before an instrument category is marketed', 'Manufacturers and importers', 'Prescribed categories'],
          ['Importer registration for weights and measures', 'Importers of instruments', 'Section 38'],
          ['Tampering with the stamp or standard', 'Anyone', 'Section 26, and outside the improvement route'],
          ['Records and returns', 'Licensees and regulated entities', 'Section 31']
        ]} />
        <p>A verification calendar is the cheapest compliance control available in this area, and its absence accounts for a large share of notices. Instruments do not fail silently on the day the certificate expires — but inspections do not time themselves around renewals either.</p>
      </Section>

      <Section id="inspection" title="Inspection and Seizure">
        <DataTable headers={['Stage', 'What matters']} rows={[
          ['The officer’s visit', 'Identification, the scope of the inspection, and cooperation — obstruction is itself penalised'],
          ['What is examined', 'Instruments, stamps and certificates, packages, labels, invoices, licences, records and returns'],
          ['The inspection report', 'Read it before signing, and record your own note of what was shown and said'],
          ['Statements recorded', 'Keep them factual; do not concede legal characterisations on the spot'],
          ['Samples taken', 'Note what was taken, from which batch, and in whose presence'],
          ['Seizure of goods or instruments', 'The seizure memo governs both the release application and the defence'],
          ['Immediate preservation', 'Photograph the stock and labels as they stood, and secure the batch records'],
          ['The listing, in an e-commerce matter', 'Preserve your own version of the listing for the date in question'],
          ['Internal escalation', 'Notify the responsible officer and legal immediately — the reply window is short'],
          ['Correction', 'Begin the curable correction at once, and document it with dates']
        ]} />
      </Section>

      <Section id="reply" title="Answering the Notice">
        <p>The reply is the document that determines whether this becomes an improvement notice, a compounding, or a prosecution. Most replies are too general to achieve the first.</p>
        <DataTable headers={['Element', 'Why it belongs in the reply']} rows={[
          ['The precise contravention identified', 'Which section and rule, on which product, instrument or listing, on which date'],
          ['Facts admitted and facts denied, separately', 'A blanket admission concedes more than the department could prove'],
          ['Evidence of rectification already done', 'Dated proof of the corrected label, listing, certificate or licence'],
          ['The first-occasion position', 'Compliance history showing no similar prior contravention'],
          ['Express reference to the improvement route', 'The mechanism is not applied to a reply that does not engage with it'],
          ['The procedural character of the lapse', 'Distinguishes it from tampering, fraud or consumer harm'],
          ['Absence of consumer prejudice, where true', 'Relevant to characterisation, and to the exclusions'],
          ['Batch and line records, on a quantity allegation', 'Shows variation within tolerance rather than systematic shortfall'],
          ['Calibration and verification history', 'Shows a control system existed'],
          ['The responsible person, correctly identified', 'Avoids officers being named who had no charge of the function'],
          ['Preventive measures adopted', 'Calendar, checklist and approval control going forward'],
          ['A professional register', 'Dispute the characterisation, not the officer']
        ]} />
      </Section>

      <Section id="compounding" title="Compounding, Appeal and Defence">
        <DataTable headers={['Option', 'When it fits', 'What to weigh']} rows={[
          ['Improvement notice compliance', 'A first-time procedural lapse that has been rectified', 'Fastest and cleanest route; ask for it expressly'],
          ['Corrective reply on merits', 'The allegation is misconceived or the facts are wrong', 'Requires documents, not assertion'],
          ['Compounding under Section 48', 'Closure is wanted and the contravention is compoundable', 'Creates a record; a similar offence within three years cannot be compounded'],
          ['Appeal under Section 50', 'An order or penalty is legally challengeable', 'Sixty days, extendable for sufficient cause'],
          ['Prosecution defence', 'A complaint has been instituted', 'BNSS procedure, with advocate representation'],
          ['Consumer resolution', 'A consumer complaint accompanies the departmental action', 'Settlement there does not dispose of the departmental matter'],
          ['Compliance rectification programme', 'A systemic defect across SKUs or locations', 'Prevents the second occasion, which is where penalties escalate']
        ]} />
        <div className="warning-box" aria-label="The three-year compounding bar">
          <p><strong>Compounding is not cost-free, and the reason is Section 48&rsquo;s three-year bar.</strong> Where an offence has been compounded, a similar offence within three years cannot be compounded again — so the quick settlement of a label defect this year removes the quick exit for the same defect next year, and a business with recurring artwork problems can find its cheapest remedy gone precisely when it needs it. Compound on a view of the next three years, not of this notice.</p>
        </div>
      </Section>

      <Section id="company" title="Company and Officer Liability">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Primary liability', 'The company, where the contravention is by a company'],
          ['Personal liability', 'The person in charge of and responsible to the company for the conduct of its business'],
          ['Statutory defence', 'That the contravention occurred without their knowledge, or that they exercised due diligence'],
          ['Directors and officers generally', 'Liable where the contravention was with their consent, connivance or neglect'],
          ['Nominee mechanism', 'A company may nominate a director to be responsible for compliance, with the prescribed consent and intimation'],
          ['What makes a nomination hold', 'That the nominee actually has charge of the function, with authority and resources'],
          ['Publication of the name', 'The court may order publication of a convicted company’s name and place of business at its expense'],
          ['Practical consequence', 'Reputational exposure often outweighs the monetary penalty'],
          ['What to do on a notice naming officers', 'Map roles and authority before replying, so the reply does not concede charge']
        ]} />
        <p>Where a notice names several officers indiscriminately, the response should set out who actually had charge of the function. An officer with no role in packaging or instrument compliance has a defence that is lost if the reply answers the allegations collectively.</p>
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Immediate consultation', 'Notice, deadline and exposure assessed'],
          ['2', 'Contravention mapping', 'The precise section and rule alleged, product by product'],
          ['3', 'Curability assessment', 'What can be corrected now, and what cannot'],
          ['4', 'Immediate correction', 'Labels, listings, certificates and licences put right, with dated proof'],
          ['5', 'Document collection', 'Licences, certificates, artwork, invoices, batch and import records'],
          ['6', 'Evidence preservation', 'Listing history and electronic records secured per BSA requirements'],
          ['7', 'Compliance history review', 'Whether this is genuinely a first occasion'],
          ['8', 'Route assessment', 'Improvement notice, reply on merits, compounding or appeal'],
          ['9', 'Reply drafting', 'Structured response engaging the improvement route where available'],
          ['10', 'Department coordination', 'Submission, hearing support and follow-up'],
          ['11', 'Seizure handling', 'Representation on the seizure memo and release'],
          ['12', 'Compounding or appeal', 'Risk-benefit assessment, then execution'],
          ['13', 'Officer liability mapping', 'Role-wise position for named directors and officers'],
          ['14', 'Preventive programme', 'Verification calendar, artwork approval control and listing audit'],
          ['15', 'Tracking', 'Ticket-based status updates to closure']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The notice itself', 'Identifies the allegation, the provision and the deadline'],
          ['Inspection report and seizure memo', 'The department’s recorded findings'],
          ['Legal Metrology licence', 'Validity, scope and category'],
          ['Verification and stamping certificates', 'Instrument compliance and the renewal position'],
          ['Model approval certificate', 'Where the instrument category requires it'],
          ['Calibration and service records', 'Evidence of a control system'],
          ['Product labels and photographs', 'The declarations as they actually appeared'],
          ['Packaging artwork and approval trail', 'Where the defect originated, and who approved it'],
          ['Batch and line fill records', 'Net quantity defence'],
          ['Checkweigher records', 'Quantity control evidence'],
          ['Invoices and purchase records', 'Batch, supplier and transaction trail'],
          ['Import documents', 'Bill of entry, importer declarations and relabelling records'],
          ['Importer registration', 'Where weights or measures are imported'],
          ['E-commerce listing history', 'The listing as it stood on the date alleged'],
          ['ERP and inventory extracts', 'Stock, batch and dispatch reconciliation'],
          ['Any consumer complaint', 'The background, and the parallel exposure'],
          ['Compliance history', 'Whether a similar contravention has occurred before'],
          ['Internal roles and authorisations', 'Who had charge of the function'],
          ['Nomination records under Section 49', 'The nominee position, where one exists']
        ]} />
      </Section>

      <Section id="preventive" title="Preventive Compliance">
        <DataTable headers={['Control', 'What it prevents']} rows={[
          ['Verification and renewal calendar', 'The single most common contravention — a lapsed certificate'],
          ['Instrument register by location', 'Unverified instruments entering use unnoticed'],
          ['Artwork approval checklist', 'Label defects reaching print'],
          ['Pre-print compliance sign-off', 'The same defect replicated across a production run'],
          ['Line fill and checkweigher monitoring', 'Systematic net quantity shortfall'],
          ['Import relabelling protocol', 'Imported stock sold without importer declarations'],
          ['Catalogue upload checklist', 'Listings published with blank declaration fields'],
          ['Periodic listing audit', 'Platform overwrites reintroducing omissions'],
          ['Licence and registration tracker', 'Activity continuing on an expired licence'],
          ['Records and returns discipline', 'Section 31 exposure on inspection'],
          ['Internal mock inspection', 'Finding what an officer would find, first'],
          ['Defined compliance ownership', 'Officers named in a notice who had no charge of the function']
        ]} />
      </Section>

      <Section id="who" title="Who This Affects">
        <DataTable headers={['Business', 'Principal exposure']} rows={[
          ['Manufacturers', 'Packaged commodity declarations and net quantity'],
          ['Importers', 'Importer declarations, country of origin and instrument registration'],
          ['Packers and co-packers', 'Declarations and fill accuracy on behalf of brand owners'],
          ['Brand owners', 'Artwork, and responsibility for what a co-packer produced'],
          ['Retailers and supermarkets', 'Instrument verification and sale by weight or measure'],
          ['E-commerce sellers', 'Listing declarations across the catalogue'],
          ['Marketplaces', 'Declarations displayed on listings they control'],
          ['Petrol pumps', 'Verification and accuracy of dispensing units'],
          ['Jewellers', 'Precision weighing on high-value goods'],
          ['Food businesses', 'Declarations alongside FSSAI labelling requirements'],
          ['Pharmacies', 'Declarations on packaged health products'],
          ['Warehouses and logistics', 'Weighbridge verification and weighment-based billing'],
          ['Industrial units', 'Instruments used in production, billing and safety']
        ]} />
        <p>Where the product is separately regulated, a single pack can attract two regimes at once. See <Link href="/solutions/legal/food-adulteration-legal-services">Food Adulteration</Link> for the FSSAI side and <Link href="/solutions/legal/adulteration-of-drugs-legal-services">Adulteration of Drugs</Link> for pharmaceutical products.</p>
      </Section>

      <Section id="common-issues" title="Why Matters Escalate">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A casual reply admitting the facts generally', 'A rectifiable lapse becomes an admitted offence', 'Facts admitted and denied separately, with evidence'],
          ['The improvement route not asked for', 'The mechanism is not applied', 'Reply framed to engage it, with proof of rectification'],
          ['Correction made but not documented', 'No evidence that the deficiency was rectified', 'Dated proof of the corrected label, listing or certificate'],
          ['Certificate expired and nobody noticed', 'A standing contravention at every inspection', 'Verification and renewal calendar'],
          ['Artwork defect replicated across SKUs', 'One notice becomes several', 'Catalogue and artwork audit rather than a single-product fix'],
          ['Listing history not preserved', 'The department’s screenshot stands unanswered', 'Version history captured and retained'],
          ['Compounding accepted reflexively', 'The three-year bar removes the exit next time', 'Risk assessed across the next three years'],
          ['Officers named without role analysis', 'Personal exposure for people with no charge', 'Role and authority mapping before the reply'],
          ['Nomination on paper only', 'The nominee defence does not survive examination', 'Nomination aligned to actual charge, consent and intimation'],
          ['Appeal filed late', 'The sixty-day period lapses', 'Limitation tracked from the date of the order'],
          ['Seizure memo not addressed', 'Goods held while the merits are argued', 'Release representation run alongside the defence'],
          ['Old penalty figures relied on', 'Compounding decisions taken on wrong numbers', 'Current text confirmed for the section and date']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Notice review', 'Identify the precise provision, product and date alleged'],
          ['Curability assessment', 'What can be corrected, and what cannot'],
          ['Improvement notice strategy', 'Position the matter for the rectification route where available'],
          ['Reply drafting', 'Structured response with admissions, denials and evidence separated'],
          ['Packaged commodity review', 'Declarations across the label and the artwork trail'],
          ['Net quantity defence', 'Batch, line fill and checkweigher records assembled'],
          ['E-commerce listing review', 'Catalogue-wide declaration audit and history preservation'],
          ['Verification and licence advisory', 'Stamping cycle, licence scope, renewal and model approval'],
          ['Import compliance review', 'Importer declarations, country of origin and registration'],
          ['Inspection and seizure support', 'Representation on the memo, release and documentation'],
          ['Compounding assessment', 'Risk-benefit analysis against the three-year bar'],
          ['Appeal support', 'Grounds, limitation and the appellate record'],
          ['Company liability mapping', 'Role-wise position for officers and the nominee under Section 49'],
          ['Preventive compliance programme', 'Calendar, checklists, artwork control and mock inspection'],
          ['Advocate coordination', 'Brief, chronology and evidence file for prosecution defence'],
          ['Ticket-based tracking', 'Notice, reply, hearing, compounding, appeal and closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“These matters are decided by documents and by the first fortnight. Since May 2026 a genuine first-time procedural lapse can be met with an improvement notice rather than a penalty, but that route has to be earned — the deficiency corrected, the correction evidenced with dates, and the reply drafted to ask for it. The businesses that come through these notices well are the ones that could produce their verification calendar, their artwork approval trail and their own listing history. The ones that struggle sent a general apology.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a particular contravention is made out, whether the improvement notice route is available, the penalty applicable, and the compounding and appeal position all depend on the facts, the provision invoked, the date of the alleged contravention and the practice of the State enforcement authority. The position stated here reflects the Legal Metrology Act, 2009 as amended by the Jan Vishwas (Amendment of Provisions) Acts of 2023 and 2026, with the improvement notice provisions notified by S.O. 2103(E) dated 27 April 2026 with effect from 1 May 2026; the Jan Vishwas amendments were brought into force in stages, penalty amounts have been revised, and parts of this guide remain under professional review. Confirm the current text of the specific provision before any compounding or appeal decision. Estabizz provides notice review, reply drafting, compliance correction, documentation and filing coordination; appearance before a court is through enrolled advocates.</p>
      </Section>
    </ServicePageLayout>
  );
}
