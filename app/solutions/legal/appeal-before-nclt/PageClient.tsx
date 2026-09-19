'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'nclt-vs-nclat', title: 'NCLT or NCLAT: Getting the Forum Right' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'important-sections', title: 'Important Sections' },
  { id: 'matters', title: 'Matters Commonly Filed' },
  { id: 'filing-route', title: 'Filing Route by Matter Type' },
  { id: 'who-needs', title: 'Who Needs NCLT Support' },
  { id: 'when-to-approach', title: 'When to Approach NCLT' },
  { id: 'process', title: 'Process' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'time-limits', title: 'Time Limits and Limitation' },
  { id: 'restoration', title: 'Restoration of Struck-Off Companies' },
  { id: 'ibc-matters', title: 'IBC Matters Before NCLT' },
  { id: 'oppression', title: 'Shareholder and Oppression Disputes' },
  { id: 'schemes', title: 'Mergers, Demergers and Schemes' },
  { id: 'drafting', title: 'What a Petition Should Include' },
  { id: 'risks', title: 'Risks of Handling It Poorly' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Is "Appeal Before NCLT" the legally correct term?', 'It is a commercial search term rather than a precise legal one. NCLT is largely an original forum for company-law and insolvency matters. An appeal against an NCLT order generally lies before NCLAT. Some statutory remedies filed at NCLT, such as restoration under Section 252, are themselves described as appeals or applications.'],
  ['What is NCLT?', 'The National Company Law Tribunal, constituted under Section 408 of the Companies Act, 2013. It hears matters under the Companies Act, the IBC and other notified laws.'],
  ['What is NCLAT?', 'The National Company Law Appellate Tribunal, constituted under Section 410. It is the appellate forum against NCLT orders.'],
  ['Where does an appeal from an NCLT order go?', 'Generally to NCLAT — under Section 421 of the Companies Act for company-law matters, and under Section 61 of the IBC for insolvency matters.'],
  ['What is the time limit to appeal to NCLAT?', 'Generally 45 days under Section 421 for company-law matters, and 30 days under Section 61 for IBC matters, each with limited condonation. Confirm the limit for your order type.'],
  ['Can a struck-off company be restored?', 'Yes, under Section 252 of the Companies Act. There are different routes and time windows depending on who applies and on the facts.'],
  ['Which form is used for restoration?', 'Restoration applications are commonly filed in Form NCLT-9, following the NCLT Rules, 2016.'],
  ['Is NCLT the adjudicating authority under IBC?', 'Yes, for corporate persons, under Section 60 of the IBC.'],
  ['Who can start insolvency proceedings?', 'A financial creditor under Section 7, an operational creditor under Section 9, or the corporate applicant itself under Section 10.'],
  ['Can a CIRP be withdrawn?', 'Yes, under Section 12A of the IBC, subject to the statutory conditions and approvals.'],
  ['What is oppression and mismanagement?', 'Where company affairs are conducted in a manner prejudicial to a member or to the public interest, relief may be sought under Sections 241 and 242, subject to the eligibility thresholds in Section 244.'],
  ['Does NCLT approve mergers?', 'Yes. Compromise, arrangement, merger, amalgamation and demerger schemes go through Sections 230 to 232 and the CAA Rules.'],
  ['Can share capital be reduced through NCLT?', 'Yes, under Section 66 of the Companies Act.'],
  ['What is rectification of the register of members?', 'A remedy under Section 59 where the register does not reflect the correct position on membership or shareholding.'],
  ['Can a civil court hear these matters instead?', 'No. Section 430 bars civil court jurisdiction for matters within the Tribunal\'s jurisdiction.'],
  ['Does NCLT have contempt powers?', 'Yes, under Section 425 of the Companies Act.'],
  ['What is a class action?', 'A remedy under Section 245 allowing specified members or depositors to act collectively.'],
  ['Can winding up be ordered by NCLT?', 'Yes, under the winding-up provisions in Sections 270 to 303 and the applicable rules, where the statutory grounds are made out.'],
  ['What documents are needed?', 'Typically incorporation documents, financial statements, ROC filings, board and shareholder resolutions, the relevant agreements, the order or notice in question and supporting evidence. It varies by matter type.'],
  ['How long does an NCLT matter take?', 'It varies significantly by Bench, matter type and pendency. Section 422 provides for expeditious disposal, but practical timelines should be assessed case by case.'],
  ['Does delay affect relief?', 'It can. Delay and laches may affect relief in oppression matters, and limitation and the default date are critical in IBC applications.'],
  ['Is a certified copy needed for further steps?', 'Yes. Certified copy and ROC filing timelines matter for post-order compliance and for any appeal.'],
  ['Can Estabizz appear before the Tribunal?', 'We provide petition drafting, documentation, research, filing coordination and case tracking. Appearance is handled through authorised representatives as the law permits.'],
  ['What is the most common mistake?', 'Choosing the wrong forum or the wrong statutory route, and discovering it after limitation has run.'],
  ['Can a creditor and the company settle after filing?', 'In IBC matters, withdrawal is possible under Section 12A subject to the statutory conditions. The position depends on the stage of the proceeding.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Company Law & IBC' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Appeal Before NCLT' }]}
      title="Appeal Before NCLT"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Appeal Before NCLT"
      sections={sections}
      ctaTitle="Speak With a Company Law Expert"
      ctaDescription="Discuss forum, statutory route, limitation and petition drafting for your NCLT matter with the Estabizz team."
      quickFacts={[{ label: 'Tribunal', value: 'NCLT, Companies Act s. 408' }, { label: 'Appeal forum', value: 'NCLAT' }, { label: 'IBC role', value: 'Adjudicating Authority, s. 60' }, { label: 'Civil court', value: 'Barred by s. 430' }]}
      relatedArticles={[
        { title: 'Appeal Before ITAT', href: '/solutions/legal/appeal-before-itat', category: 'Legal', description: 'Income-tax appeals before the Tribunal — appealability, limitation, stay of demand and paper book.' },
        { title: 'Legal Due Diligence Services in India', href: '/services/legal-due-diligence', category: 'Compliance', description: 'Legal audit before investment or acquisition, including litigation and insolvency exposure.' },
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Criminal appeals under BNS, BNSS and BSA.' }
      ]}
      finalCtaTitle="Get the Forum and the Route Right the First Time"
      finalCtaDescription="NCLT proceedings can affect company status, director rights, shareholder control, creditor recovery and business continuity. The most expensive mistakes are made at the filing stage."
      heroDescription={<p>NCLT proceedings can directly affect company status, director rights, shareholder control, creditor recovery, insolvency admission, merger approval, company revival, winding up, bank accounts and business continuity. Estabizz assists companies, directors, shareholders, creditors, insolvency professionals and promoters with company petitions, applications, restoration matters, insolvency proceedings and corporate restructuring before the Tribunal.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> this is legal support for filing, defending or responding to matters before the National Company Law Tribunal, where company-law, insolvency, restructuring, restoration or corporate governance issues are involved.</p>
        <p>It matters because the Tribunal&rsquo;s orders reach the things a business cannot easily work around: whether a company exists on the register, who controls it, whether a creditor can push it into insolvency, whether a scheme is approved, and whether directors carry personal consequences.</p>
      </Section>

      <Section id="nclt-vs-nclat" title="NCLT or NCLAT: Getting the Forum Right">
        <div className="warning-box" aria-label="Terminology note">
          <p><strong>&ldquo;Appeal Before NCLT&rdquo; is a commercial term, not a precise legal one.</strong> NCLT is largely an <em>original</em> forum. An appeal <em>against</em> an NCLT order generally lies before NCLAT. Some statutory remedies filed at NCLT — restoration under Section 252, for instance — are themselves described as appeals or applications, which is where the confusion comes from. Choosing the wrong forum is the most expensive mistake at this stage, because limitation keeps running while it is corrected.</p>
        </div>
        <DataTable headers={['Point', 'NCLT', 'NCLAT']} rows={[
          ['Full form', 'National Company Law Tribunal', 'National Company Law Appellate Tribunal'],
          ['Main role', 'Original tribunal for company-law and IBC matters', 'Appellate forum against NCLT orders'],
          ['Companies Act section', 'Section 408', 'Section 410'],
          ['Appeal provision', 'Hears original matters and some statutory appeals or applications', 'Section 421 appeals from NCLT orders'],
          ['IBC role', 'Adjudicating Authority for corporate persons, Section 60', 'Appeal forum, IBC Section 61'],
          ['Common filing', 'Petition, application, scheme, restoration, CIRP', 'Appeal against an NCLT order']
        ]} />
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>This is not a licence. It is legal support for NCLT matters such as company petitions, applications, restoration appeals and applications, insolvency proceedings and corporate restructuring cases.</p>
        <p>NCLT is constituted under the Companies Act, 2013 and hears matters under the Companies Act, the IBC and other notified laws. It is not required in every company dispute — it becomes necessary where the law prescribes a tribunal remedy, or where a party has to file, defend or respond to a proceeding.</p>
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable legal framework']} rows={[
          ['Main tribunal', 'National Company Law Tribunal'],
          ['NCLT constitution', 'Companies Act, 2013, Section 408'],
          ['NCLAT constitution', 'Companies Act, 2013, Section 410'],
          ['Appeal from NCLT order', 'Companies Act, 2013, Section 421'],
          ['Expeditious disposal', 'Companies Act, 2013, Section 422'],
          ['Procedure before the Tribunal', 'Companies Act, 2013, Section 424'],
          ['Contempt power', 'Companies Act, 2013, Section 425'],
          ['Civil court jurisdiction bar', 'Companies Act, 2013, Section 430'],
          ['Tribunal rules', 'NCLT Rules, 2016 and NCLAT Rules, 2016'],
          ['Insolvency jurisdiction', 'IBC Section 60'],
          ['Appeal from an NCLT IBC order', 'IBC Section 61'],
          ['Appeal to the Supreme Court under IBC', 'IBC Section 62']
        ]} />
      </Section>

      <Section id="important-sections" title="Important Sections">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Companies Act s. 408', 'Constitution of NCLT'],
          ['s. 410', 'Constitution of NCLAT'],
          ['s. 421', 'Appeal from an NCLT order to NCLAT'],
          ['s. 422', 'Expeditious disposal by the Tribunal and Appellate Tribunal'],
          ['s. 424', 'Procedure before NCLT and NCLAT, and natural justice principles'],
          ['s. 425', 'Power to punish for contempt'],
          ['s. 430', 'Civil court jurisdiction barred for matters within Tribunal jurisdiction'],
          ['s. 241', 'Application for oppression and mismanagement'],
          ['s. 242', 'Powers of the Tribunal in oppression and mismanagement cases'],
          ['s. 244', 'Right to apply for oppression and mismanagement'],
          ['ss. 230–232', 'Compromise, arrangement, merger, amalgamation and demerger'],
          ['s. 252', 'Appeal or application for restoration of a struck-off company'],
          ['ss. 270–303', 'Winding up by the Tribunal'],
          ['s. 66', 'Reduction of share capital'],
          ['s. 59', 'Rectification of the register of members'],
          ['s. 213', 'Investigation into company affairs'],
          ['s. 245', 'Class action']
        ]} />
      </Section>

      <Section id="matters" title="Matters Commonly Filed">
        <DataTable headers={['Matter', 'Typical objective']} rows={[
          ['Restoration of a struck-off company', 'Bring the company back onto the register'],
          ['Oppression and mismanagement', 'Relief against prejudicial conduct of company affairs'],
          ['Rectification of the register of members', 'Correct the recorded membership or shareholding'],
          ['Merger, amalgamation or demerger', 'Approval of a scheme of arrangement'],
          ['Reduction of share capital', 'Approval of a capital reduction'],
          ['Winding up', 'Wind up the company on statutory grounds'],
          ['Insolvency by a financial creditor', 'Admit the corporate debtor into CIRP'],
          ['Insolvency by an operational creditor', 'Admit on an unpaid operational debt'],
          ['Insolvency by the corporate applicant', 'Company initiates its own CIRP'],
          ['CIRP withdrawal', 'Exit the process on settlement'],
          ['Resolution plan approval', 'Approve the plan and bind stakeholders'],
          ['Liquidation', 'Move the corporate debtor into liquidation'],
          ['Voluntary liquidation dissolution', 'Dissolve a solvent company that has wound up voluntarily'],
          ['Class action', 'Collective action by members or depositors'],
          ['Investigation relief', 'Seek investigation into company affairs']
        ]} />
      </Section>

      <Section id="filing-route" title="Filing Route by Matter Type">
        <DataTable headers={['Matter', 'Typical route']} rows={[
          ['Struck-off company restoration', 'Companies Act s. 252, commonly Form NCLT-9'],
          ['Oppression and mismanagement', 'Sections 241–242, subject to s. 244 thresholds'],
          ['Rectification of register', 'Section 59'],
          ['Merger or amalgamation', 'Sections 230–232 and the CAA Rules'],
          ['Demerger', 'Sections 230–232 and the CAA Rules'],
          ['Reduction of capital', 'Section 66'],
          ['Winding up', 'Sections 270–303 and the Winding Up Rules'],
          ['Insolvency by financial creditor', 'IBC Section 7'],
          ['Insolvency by operational creditor', 'IBC Section 9'],
          ['Insolvency by corporate applicant', 'IBC Section 10'],
          ['CIRP withdrawal', 'IBC Section 12A'],
          ['Resolution plan approval', 'IBC Sections 30–31'],
          ['Liquidation', 'IBC Section 33'],
          ['Voluntary liquidation dissolution', 'IBC Section 59'],
          ['Class action', 'Companies Act Section 245'],
          ['Investigation relief', 'Companies Act Section 213']
        ]} />
      </Section>

      <Section id="who-needs" title="Who Needs NCLT Support">
        <DataTable headers={['Party', 'Why it matters']} rows={[
          ['Companies', 'Company status, schemes, capital and continuity are decided here'],
          ['Directors', 'Director rights, disqualification and personal exposure may be in issue'],
          ['Shareholders and promoters', 'Control, dilution and prejudicial conduct disputes'],
          ['Minority shareholders', 'Oppression and mismanagement relief'],
          ['Financial creditors', 'Recovery through the insolvency route'],
          ['Operational creditors', 'Unpaid operational debt claims'],
          ['Insolvency professionals', 'Applications and approvals through the process'],
          ['Investors', 'Scheme approvals, cap table and exit issues'],
          ['NBFCs', 'Creditor-side action and recovery strategy'],
          ['Struck-off companies', 'Restoration to the register'],
          ['Group and family businesses', 'Restructuring and internal disputes']
        ]} />
      </Section>

      <Section id="when-to-approach" title="When to Approach NCLT">
        <DataTable headers={['Situation', 'Why action is needed']} rows={[
          ['Company has been struck off', 'Restoration has time windows that do not wait'],
          ['Affairs conducted prejudicially', 'Oppression relief may be available under ss. 241–242'],
          ['Debt has defaulted', 'Insolvency route may be open, and the default date is critical'],
          ['An insolvency application has been filed against you', 'Defence and settlement options are stage-dependent'],
          ['A scheme requires approval', 'Merger, demerger or capital reduction cannot complete without it'],
          ['The register of members is wrong', 'Rectification under s. 59 may be required'],
          ['An NCLT order has gone against you', 'Appeal to NCLAT, within 45 or 30 days depending on the matter'],
          ['Investigation into affairs is warranted', 'Section 213 relief may be sought']
        ]} />
      </Section>

      <Section id="process" title="Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Issue, urgency and forum assessment'],
          ['2', 'Forum and route check', 'Confirm NCLT or NCLAT, and the statutory provision'],
          ['3', 'Limitation review', 'Deadline and condonation risk'],
          ['4', 'Document collection', 'Corporate records, filings, agreements and evidence'],
          ['5', 'Maintainability analysis', 'Eligibility thresholds and statutory grounds'],
          ['6', 'Petition drafting', 'Petition or application with supporting affidavit'],
          ['7', 'Annexure compilation', 'Indexed document set'],
          ['8', 'Filing support', 'Filing coordination and defect removal'],
          ['9', 'Service and notices', 'Service on respondents and statutory authorities'],
          ['10', 'Hearing support', 'Briefing, written submissions and coordination'],
          ['11', 'Order and compliance', 'Certified copy, ROC filings and post-order steps']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Certificate of Incorporation', 'Company identity and status'],
          ['MOA and AOA', 'Objects, powers and internal governance'],
          ['Financial statements', 'Financial position and default assessment'],
          ['ROC filings and master data', 'Compliance history and current status'],
          ['Board and shareholder resolutions', 'Authorisation for the proceeding'],
          ['Shareholding records', 'Eligibility thresholds and control position'],
          ['Relevant agreements', 'Contractual basis of the dispute'],
          ['Demand notice or default records', 'IBC applications'],
          ['Strike-off notice and ROC correspondence', 'Restoration matters'],
          ['The order appealed against', 'Appeal to NCLAT'],
          ['Scheme documents and valuation report', 'Merger, demerger and capital matters'],
          ['Authorisation and vakalatnama', 'Filing and representation']
        ]} />
      </Section>

      <Section id="time-limits" title="Time Limits and Limitation">
        <DataTable headers={['Matter', 'Limitation position']} rows={[
          ['Company-law appeal from NCLT to NCLAT', 'Generally 45 days, with limited condonation under Section 421'],
          ['IBC appeal from NCLT to NCLAT', 'Generally 30 days, with limited additional condonation under Section 61'],
          ['Restoration of a struck-off company', 'Section 252 has 3-year and 20-year routes, depending on applicant and facts'],
          ['Oppression and mismanagement', 'Delay and laches may affect relief'],
          ['IBC applications', 'Limitation and the default date are critical'],
          ['Rectification of register', 'Delay and shareholding evidence matter'],
          ['Merger or demerger scheme', 'Timeline depends on notices, meetings and Tribunal directions'],
          ['Winding up', 'Ground and statutory maintainability must be checked'],
          ['Post-order compliance', 'Certified copy and ROC filing timelines must be followed']
        ]} />
      </Section>

      <Section id="restoration" title="Restoration of Struck-Off Companies">
        <p>Restoration is the single most common matter described as an appeal or application before NCLT. It is filed under Section 252 of the Companies Act, commonly in Form NCLT-9, following the NCLT Rules, 2016.</p>
        <p>The route and the window depend on who is applying and on the facts — Section 252 provides different paths, with a three-year window in the ordinary case and a longer window in specified circumstances. Because the company is off the register while the application is pending, bank accounts, filings and contracts are usually all affected at once, which is why these matters reward early action.</p>
      </Section>

      <Section id="ibc-matters" title="IBC Matters Before NCLT">
        <p>Under the IBC, NCLT is the Adjudicating Authority for corporate persons under Section 60. A financial creditor applies under Section 7, an operational creditor under Section 9, and the corporate applicant itself under Section 10.</p>
        <p>Once admitted, the process runs through resolution plan approval under Sections 30 and 31, or liquidation under Section 33. Withdrawal is possible under Section 12A subject to statutory conditions. Limitation and the date of default are the two points on which these applications most often turn.</p>
      </Section>

      <Section id="oppression" title="Shareholder and Oppression Disputes">
        <p>Where the affairs of a company are being conducted in a manner prejudicial to a member or to the public interest, relief may be sought under Sections 241 and 242. Section 244 sets the eligibility thresholds for who may apply, and the Tribunal has wide powers to make orders regulating the conduct of the company&rsquo;s affairs.</p>
        <p>Delay and laches can affect relief, so the timing of the application matters as much as its merits.</p>
      </Section>

      <Section id="schemes" title="Mergers, Demergers and Schemes">
        <p>Compromise, arrangement, merger, amalgamation and demerger schemes require Tribunal approval under Sections 230 to 232, read with the CAA Rules. Capital reduction goes through Section 66.</p>
        <p>These are documentation-heavy matters where the timetable is driven by notices, creditor and member meetings, and the directions the Tribunal gives along the way.</p>
      </Section>

      <Section id="drafting" title="What a Petition Should Include">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Correct statutory provision', 'Maintainability turns on invoking the right section'],
          ['Jurisdiction and Bench', 'Wrong Bench means refiling, with limitation running'],
          ['Eligibility and threshold facts', 'Particularly for ss. 241–244 and IBC applications'],
          ['Clear factual chronology', 'The Tribunal needs the sequence, not a narrative'],
          ['Specific relief sought', 'Vague prayers invite vague orders'],
          ['Supporting affidavit', 'Verification of the facts pleaded'],
          ['Indexed annexures', 'Documents that cannot be found are documents not considered'],
          ['Limitation explanation', 'Where any delay exists, address it upfront'],
          ['Authorisation', 'Board resolution and vakalatnama in order']
        ]} />
      </Section>

      <Section id="risks" title="Risks of Handling It Poorly">
        <DataTable headers={['Risk', 'Consequence']} rows={[
          ['Wrong forum chosen', 'Refiling, with limitation continuing to run'],
          ['Wrong statutory route', 'Petition may be dismissed as not maintainable'],
          ['Threshold not met', 'Application rejected at the outset in oppression matters'],
          ['Limitation missed', 'Appeal or application may be barred'],
          ['Default date not established', 'IBC application may fail on the record'],
          ['Poor annexure indexing', 'Filing defects and delay'],
          ['No post-order ROC filing', 'Relief obtained but not given effect'],
          ['Civil suit filed instead', 'Jurisdiction barred by Section 430']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Forum and route assessment', 'Confirm NCLT or NCLAT and the correct statutory provision'],
          ['Maintainability check', 'Eligibility thresholds, grounds and limitation'],
          ['Petition and application drafting', 'Structured drafting with supporting affidavit'],
          ['Restoration support', 'Section 252 applications and ROC coordination'],
          ['IBC application support', 'Sections 7, 9 and 10 documentation and default records'],
          ['Oppression matters', 'Sections 241–242 petitions and threshold analysis'],
          ['Scheme support', 'Sections 230–232 documentation and process tracking'],
          ['Annexure compilation', 'Indexed, Tribunal-ready document sets'],
          ['Filing coordination', 'Filing, defect removal and service'],
          ['Hearing support', 'Briefing notes, submissions and counsel coordination'],
          ['Post-order compliance', 'Certified copy, ROC filings and next steps'],
          ['Ticket-based tracking', 'Status visibility from filing to closure']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Most NCLT matters are won or lost at the filing stage. The forum, the statutory route and the limitation position have to be settled before drafting begins — correcting any of the three later is expensive, and sometimes it is simply too late.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Forum, maintainability, eligibility thresholds and limitation depend on the nature of the matter and its facts, and parts of this guide are still undergoing professional review. Estabizz provides drafting, documentation and filing coordination; appearance before the Tribunal is handled through authorised representatives. Confirm the current position with your adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
