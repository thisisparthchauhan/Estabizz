'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'what-changed', title: 'What Changed on 21 November 2025' },
  { id: 'two-days', title: 'The Two-Working-Day Rule' },
  { id: 'timelines', title: 'Statutory Payment Timelines' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'claimable', title: 'What Can Be Claimed' },
  { id: 'wages-definition', title: 'Why the Wage Definition Matters' },
  { id: 'deductions', title: 'Lawful and Unlawful Deductions' },
  { id: 'forum', title: 'Where to Bring the Claim' },
  { id: 'limitation', title: 'Limitation and Compensation' },
  { id: 'notice', title: 'The Legal Notice' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'exit', title: 'Resignation and Termination' },
  { id: 'statutory-dues', title: 'Gratuity, PF and ESI' },
  { id: 'employer', title: 'The Employer Side' },
  { id: 'common-issues', title: 'Why Salary Claims Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['Which law governs unpaid salary now?', 'The Code on Wages, 2019, which came into force on 21 November 2025 along with the other three labour codes. It replaced the Payment of Wages Act, 1936, the Minimum Wages Act, 1948, the Payment of Bonus Act, 1965 and the Equal Remuneration Act, 1976. Advice written against those four Acts is working from a repealed framework.'],
  ['When must full and final settlement be paid?', 'Within two working days. Section 17(2) of the Code on Wages requires that where an employee is removed, dismissed, retrenched, resigns, or becomes unemployed because the establishment closed, the wages payable must be paid within two working days of that event. This is the single most useful provision in a salary dispute and the one employers most often do not know.'],
  ['Does the two-working-day rule cover the whole F&F?', 'It covers wages payable. Components that are not wages within the Code definition — a discretionary bonus not yet declared, gratuity under the Code on Social Security, a reimbursement claim still under approval — follow their own timelines. In practice most of what is in dispute is wages, and the two-day rule applies to it.'],
  ['When must ordinary monthly salary be paid?', 'For a monthly wage period, before the expiry of the seventh day of the succeeding month, under Section 17(1). Shorter wage periods have shorter limits: daily, at the end of the shift; weekly, on the last working day of the week; fortnightly, within two days of the period ending.'],
  ['How long do I have to file a claim?', 'Three years from the date the claim arises, under Section 45(6). That is a substantial improvement over the twelve months allowed under the Payment of Wages Act. The authority may entertain an application after three years if sufficient cause for the delay is shown.'],
  ['Can I get more than the unpaid amount?', 'Yes. Section 45 allows the authority, while deciding the claim, to order compensation in addition to the amount determined, extending to ten times the claim. That is a real lever, and it is one reason a documented claim before the right authority is often better than a civil suit.'],
  ['Who hears the claim?', 'An authority appointed by the appropriate Government, not below the rank of a Gazetted Officer. The Code directs that an endeavour be made to decide the claim within three months.'],
  ['Who can file the application?', 'The employee concerned, a trade union registered under the Trade Unions Act of which the employee is a member, or the Inspector-cum-Facilitator.'],
  ['I am a manager. Is this route open to me?', 'Yes, and this is a significant change. The payment-of-wages provisions under the Payment of Wages Act applied only below a wage ceiling. Chapter III of the Code on Wages applies to all employees irrespective of wage level, and the definition of employee expressly includes persons employed in a managerial or administrative capacity. Senior employees were previously pushed toward a civil suit; they no longer have to be.'],
  ['Is the labour court route still available?', 'The Industrial Relations Code, 2020 machinery applies to a worker, which excludes persons employed mainly in a managerial or administrative capacity and supervisory staff above the notified wage. Section 59 of that Code provides for recovery of money due from an employer, with a Tribunal deciding a disputed amount within a period not exceeding three months.'],
  ['Is a legal notice mandatory before filing?', 'No. It is still worth sending in most cases, because it fixes the amount claimed, puts the employer to a written position, and converts a series of informal follow-ups into a record. A great many matters settle at this stage.'],
  ['Can the employer deduct notice pay from my F&F?', 'Only on a lawful and documented basis. Deductions are confined to the categories in Sections 18 to 24 of the Code on Wages, and the total of all deductions in a wage period cannot exceed fifty per cent of wages. A deduction outside those categories, or above that cap, is not simply unfair — it is unauthorised.'],
  ['Can the employer hold my salary because I did not return a laptop?', 'The employer can demand the asset back and can pursue recovery for actual damage or loss, but Section 21 of the Code on Wages treats a deduction for damage or loss as permissible only to the extent of the loss and after the employee has been given an opportunity to show cause. Withholding earned wages as leverage is a different thing from a lawful deduction.'],
  ['Can the employer withhold the relieving letter over a salary dispute?', 'Document release and wage payment are separate obligations, and tying one to the other does not make the wage default lawful. In practice the relieving and experience letters are dealt with in the settlement terms, which is the realistic way to resolve it.'],
  ['What about unpaid incentive or commission?', 'Variable pay turns on the policy or scheme rather than on the wage provisions. The claim is only as strong as the proof of the trigger — the scheme document, the achievement record and the approval. An incentive claimed without a policy and without evidence of achievement weakens an otherwise sound salary claim.'],
  ['When is bonus payable?', 'Chapter IV of the Code on Wages governs bonus where it applies, and Section 39 requires payment within eight months from the close of the accounting year, extendable by the appropriate Government on application.'],
  ['What about gratuity?', 'Gratuity is under Section 53 of the Code on Social Security, 2020, not the Code on Wages. It is payable after five years of continuous service, and the employer must pay within thirty days of it becoming payable, with simple interest for delay. Employees on fixed term employment now earn gratuity on a pro rata basis without the five-year wait.'],
  ['PF was deducted but never deposited. Is that the same claim?', 'No, and it should not be bundled into the wage claim. Non-deposit of a deducted contribution is a separate statutory default under the Code on Social Security with its own machinery, and it is usually the stronger point of pressure in a dispute with an employer in difficulty.'],
  ['Does a consultant have the same remedy?', 'Generally not. A genuine consultant on a services agreement pursues a contractual claim rather than a wage claim. But the label is not decisive: where the arrangement in substance involves control, fixed hours, supervision and integration into the organisation, it may be treated as employment whatever the contract calls it.'],
  ['Will WhatsApp messages and emails help?', 'Considerably. They usually contain the admission, the promise to pay, or the acknowledgement of the amount. Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam govern how electronic records are proved, so preserve the full thread and the original device or account rather than cropped screenshots.'],
  ['The company says it has no money. Does that matter?', 'Not to the liability. It matters a great deal to the strategy. Where an employer is genuinely illiquid, a documented settlement with dates and a default clause often recovers more than an order that cannot be executed.'],
  ['Can several employees act together?', 'Yes, and it is frequently effective, since a pattern of default is harder to characterise as a dispute about one person. Each employee still has their own contract, dues and exit facts, so the claims should be computed individually even when the approach is coordinated.'],
  ['What is the biggest mistake employees make?', 'Months of verbal follow-up with no written demand and no computation, followed by a claim for a round figure nobody can reconcile. The employer then disputes the quantum, and a straightforward default becomes an accounting argument.'],
  ['What is the biggest mistake employers make?', 'Ignoring the notice, and assuming the old wage ceiling still keeps senior employees out of the statutory route. Neither assumption survives the Code, and the exposure now includes compensation of up to ten times the amount withheld.'],
  ['Can Estabizz act for employers as well?', 'Yes, in separate matters — never both sides of the same dispute. On the employer side the work is usually dues verification, a defensible deduction position, payroll exposure across other employees, and settlement documentation.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Employment' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Non Payment of Salary' }]}
      title="Non Payment of Salary"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Non Payment of Salary"
      sections={sections}
      ctaTitle="Speak With an Employment Law Expert"
      ctaDescription="Compute the dues, identify the correct forum under the labour codes, and put the demand in writing before the record goes cold."
      quickFacts={[
        { label: 'Main law', value: 'Code on Wages, 2019' },
        { label: 'In force since', value: '21 November 2025' },
        { label: 'F&F deadline', value: 'Two working days' },
        { label: 'Claim limitation', value: 'Three years' }
      ]}
      relatedArticles={[
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'When a notice is mandatory, what makes one work, and how service is proved.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' },
        { title: 'Loan Recovery Notice', href: '/solutions/legal/loan-recovery-notice', category: 'Legal', description: 'Demand, limitation and the recovery routes available for money claims.' }
      ]}
      finalCtaTitle="Compute the Dues Before You Demand Them"
      finalCtaDescription="A claim that states a figure and proves every component settles. A claim for a round number nobody can reconcile turns a clear default into an accounting dispute."
      heroDescription={<p>Salary is payment for work already performed, and the labour codes that came into force on 21 November 2025 tightened the timelines considerably — full and final settlement is now due within two working days of exit. Estabizz assists employees, workers, senior professionals, consultants and employers with dues computation, employment document review, legal notice drafting, wrongful deduction analysis, forum selection under the Code on Wages and the Industrial Relations Code, incentive and bonus claims, gratuity and provident fund issues, settlement documentation and advocate coordination.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> the work was done, the wages are due, and the law now fixes short deadlines for paying them.</p>
        <p>The usual pattern is familiar. Salary slips by a few weeks, then a month. A resignation goes in, the handover is completed, and the full and final settlement is &ldquo;in process&rdquo; for a quarter. Someone in HR mentions a laptop, or a notice period, or a cash-flow problem. Each message is reasonable on its own, and three months later nothing has been paid and nothing has been written down.</p>
        <p>What breaks that cycle is not persistence. It is a computed figure, the documents that prove each component, and a demand that names the provision and the deadline.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Non payment of salary is not a licence or a registration matter. It is a statutory wage default with a dedicated claims mechanism.</p>
        <p>The governing law is the <strong>Code on Wages, 2019</strong>, in force since 21 November 2025. Wages for a monthly wage period are due by the seventh day of the following month, and on exit within two working days. A claim lies to the authority under Section 45 within three years, and that authority can award compensation of up to ten times the amount found due. Where the claimant is a worker rather than a managerial employee, the Industrial Relations Code, 2020 machinery is also available.</p>
      </Section>

      <Section id="what-changed" title="What Changed on 21 November 2025">
        <div className="warning-box" aria-label="Change in the governing law">
          <p><strong>All four labour codes came into force on 21 November 2025, consolidating twenty-nine central labour laws.</strong> Any salary advice framed around the Payment of Wages Act, 1936, the Minimum Wages Act, 1948, the Payment of Bonus Act, 1965 or the Industrial Disputes Act, 1947 is working from repealed statutes. The forum, the limitation period and the exit deadline have all moved.</p>
        </div>
        <DataTable headers={['Repealed law', 'Replaced by', 'What it changes for a salary claim']} rows={[
          ['Payment of Wages Act, 1936', 'Code on Wages, 2019 (Chapter III)', 'The wage ceiling is gone — timely-payment protection now covers all employees'],
          ['Minimum Wages Act, 1948', 'Code on Wages, 2019 (Chapter II)', 'Floor wage and minimum wage apply across sectors, not only scheduled employments'],
          ['Payment of Bonus Act, 1965', 'Code on Wages, 2019 (Chapter IV)', 'Bonus entitlement and the eight-month payment deadline sit in the Code'],
          ['Equal Remuneration Act, 1976', 'Code on Wages, 2019', 'Equal pay obligations are part of the wage framework'],
          ['Industrial Disputes Act, 1947', 'Industrial Relations Code, 2020', 'Section 33C recovery is now Section 59; individual termination disputes are within the dispute definition'],
          ['Payment of Gratuity Act, 1972', 'Code on Social Security, 2020', 'Gratuity is Section 53, with pro rata entitlement for fixed term employment'],
          ['EPF Act, 1952 and ESI Act, 1948', 'Code on Social Security, 2020', 'Contribution defaults are pursued under the Code, separately from the wage claim']
        ]} />
        <p>The practical effect is that two of the old obstacles have gone. A senior employee no longer has to reach for a civil suit because a wage ceiling shut them out of the statutory route, and nobody has to file within twelve months of the default.</p>
      </Section>

      <Section id="two-days" title="The Two-Working-Day Rule">
        <p>This is the provision worth knowing before any other. Section 17(2) of the Code on Wages reads, in substance, that where an employee has been removed or dismissed from service, retrenched, has resigned, or has become unemployed because the establishment closed, the wages payable must be paid <strong>within two working days</strong> of that event.</p>
        <div className="info-box" aria-label="Practical effect of Section 17(2)">
          <p><strong>A thirty, forty-five or sixty-day full and final settlement policy does not override this.</strong> Internal policy can govern the clearance process, the asset handover and the paperwork; it cannot extend a statutory payment deadline. An employer still running a sixty-day F&F cycle is in default from the third working day, and every week after that is a week of accrued exposure — including the compensation the claims authority may add.</p>
        </div>
        <p>Two qualifications are worth stating honestly. First, the deadline attaches to <em>wages</em> as the Code defines them, so a bonus not yet declared or a gratuity payment on its own thirty-day track is not swept in. Second, a disputed deduction does not suspend the obligation to pay what is not in dispute. Where an employer genuinely has a claim about an unreturned asset or an unserved notice period, the lawful course is to pay the undisputed wages and pursue the rest — not to hold the whole amount.</p>
      </Section>

      <Section id="timelines" title="Statutory Payment Timelines">
        <DataTable headers={['Situation', 'Deadline', 'Source']} rows={[
          ['Daily wage period', 'At the end of the shift', 'Code on Wages, Section 17(1)'],
          ['Weekly wage period', 'On the last working day of the week', 'Code on Wages, Section 17(1)'],
          ['Fortnightly wage period', 'Within two days of the end of the fortnight', 'Code on Wages, Section 17(1)'],
          ['Monthly wage period', 'Before the expiry of the seventh day of the succeeding month', 'Code on Wages, Section 17(1)'],
          ['Removal, dismissal or retrenchment', 'Within two working days', 'Code on Wages, Section 17(2)'],
          ['Resignation', 'Within two working days', 'Code on Wages, Section 17(2)'],
          ['Unemployment on closure of the establishment', 'Within two working days', 'Code on Wages, Section 17(2)'],
          ['Bonus, where Chapter IV applies', 'Within eight months of the close of the accounting year', 'Code on Wages, Section 39'],
          ['Gratuity', 'Within thirty days of becoming payable, with interest for delay', 'Code on Social Security, Section 53'],
          ['Dues of a deceased employee', 'Paid to the nominee, or deposited as prescribed', 'Code on Wages, Section 44']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Code on Wages, 2019, in force from 21 November 2025'],
          ['Payment of wages', 'Code on Wages, Chapter III'],
          ['Bonus', 'Code on Wages, Chapter IV, where applicable'],
          ['Claims machinery', 'Code on Wages, Sections 45 to 49'],
          ['Industrial disputes and worker recovery', 'Industrial Relations Code, 2020'],
          ['Gratuity, provident fund and insurance', 'Code on Social Security, 2020'],
          ['Working conditions and establishment registration', 'Occupational Safety, Health and Working Conditions Code, 2020'],
          ['Employment terms', 'Offer letter, appointment letter, HR policy and incentive scheme'],
          ['State-level rules', 'Shops and establishments law and the State rules under the codes'],
          ['Contractual claims', 'Indian Contract Act, 1872, and civil recovery where the labour route does not fit'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63 for electronic records'],
          ['Limitation for a civil suit', 'Limitation Act, 1963'],
          ['Forum', 'Authority under Section 45, Appellate Authority under Section 49, Industrial Tribunal, or the civil court depending on the claim']
        ]} />
        <p>State rules under the codes are still being notified in places, so the procedural detail of filing before the authority can vary. The substantive entitlements and timelines above come from the codes themselves and do not depend on State rules.</p>
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Code on Wages, Section 2(k)', 'Definition of employee — expressly includes managerial and administrative roles'],
          ['Code on Wages, Section 2(y)', 'Definition of wages, including the fifty per cent add-back rule'],
          ['Code on Wages, Section 5', 'Payment of at least the minimum rate of wages'],
          ['Code on Wages, Section 14', 'Overtime wages'],
          ['Code on Wages, Section 15', 'Mode of payment of wages'],
          ['Code on Wages, Section 16', 'Fixation of the wage period'],
          ['Code on Wages, Section 17', 'Time limit for payment — monthly by the seventh, exit within two working days'],
          ['Code on Wages, Section 18', 'The closed list of permissible deductions and the fifty per cent cap'],
          ['Code on Wages, Sections 19 to 24', 'Fines, absence, damage or loss, services rendered, advances and loans'],
          ['Code on Wages, Section 39', 'Time limit for payment of bonus'],
          ['Code on Wages, Section 43', 'Responsibility for payment of dues'],
          ['Code on Wages, Section 44', 'Payment of undisbursed dues where the employee has died'],
          ['Code on Wages, Section 45', 'Claims, the authority, limitation and compensation up to ten times'],
          ['Code on Wages, Section 46', 'Reference of disputes under the Code'],
          ['Code on Wages, Section 49', 'Appeal to the Appellate Authority'],
          ['Code on Wages, Sections 50 and 51', 'Records and returns, and the Inspector-cum-Facilitator'],
          ['Code on Wages, Sections 52 to 56', 'Cognizance, penalties, offences by companies and compounding'],
          ['Industrial Relations Code, Section 59', 'Recovery of money due from an employer, for a worker'],
          ['Code on Social Security, Section 53', 'Gratuity, including pro rata entitlement on fixed term employment'],
          ['BSA, Sections 61 to 63', 'Admissibility of emails, chat records and portal extracts']
        ]} />
      </Section>

      <Section id="claimable" title="What Can Be Claimed">
        <DataTable headers={['Component', 'What establishes it', 'Where it sits']} rows={[
          ['Unpaid monthly salary', 'Appointment letter, payslips and the bank statement showing nothing credited', 'Wages under the Code on Wages'],
          ['Salary for the final part-month', 'Attendance or system records up to the last working day', 'Wages'],
          ['Full and final settlement', 'The employer F&F statement, or your own computation where none is issued', 'Wages, due in two working days'],
          ['Notice pay owed by the employer', 'The contractual notice clause and the termination letter', 'Contractual, recoverable with the wage claim'],
          ['Leave encashment', 'Leave policy and the closing leave balance', 'Policy and contract'],
          ['Overtime', 'Attendance records and approval', 'Code on Wages, Section 14'],
          ['Arrears after an increment or revision', 'The revision letter and the payslips that did not reflect it', 'Wages'],
          ['Bonus', 'Eligibility under Chapter IV or a contractual bonus clause', 'Code on Wages, Section 39'],
          ['Incentive, commission or variable pay', 'The scheme, the achievement data and the approval', 'Policy — proof of the trigger decides it'],
          ['Reimbursements', 'Approved bills and the claim record', 'Contractual, not wages'],
          ['Gratuity', 'Continuous service, or fixed term employment', 'Code on Social Security, Section 53'],
          ['Provident fund deducted but not deposited', 'Payslip deduction against the passbook or portal record', 'A separate statutory default'],
          ['Reversal of an unauthorised deduction', 'The payslip entry and the absence of a lawful basis', 'Code on Wages, Sections 18 to 24']
        ]} />
        <p>Keep the components separate in the claim. Wages, policy-based entitlements and statutory dues are proved differently and sometimes pursued in different places, and merging them into one number is the quickest way to let an employer argue about all of it.</p>
      </Section>

      <Section id="wages-definition" title="Why the Wage Definition Matters">
        <p>The Code on Wages carries a single definition of wages across all four codes, and it includes a structural rule that is easy to miss and often worth money. Wages are basic pay, dearness allowance and retaining allowance. A list of components is excluded — house rent allowance, conveyance, overtime, commission, and others. But where the excluded components together exceed one-half of the total remuneration, <strong>the excess is added back and treated as wages</strong>.</p>
        <div className="info-box" aria-label="Effect of the fifty per cent rule">
          <p><strong>This bites hardest on salary structures built to keep basic pay low.</strong> Where basic pay was set at a quarter of cost-to-company and the rest distributed across allowances, the add-back raises the wage figure used to compute gratuity, bonus, leave encashment and statutory contributions. An F&F computed on the old basic pay alone can understate the entitlement significantly, and the structure is in the employer&rsquo;s own payslips.</p>
        </div>
        <p>This cuts both ways in practice. It is a strong point for an exiting employee on an allowance-heavy structure, and it is a live compliance exposure for employers who did not restructure payroll when the codes came into force.</p>
      </Section>

      <Section id="deductions" title="Lawful and Unlawful Deductions">
        <p>Deductions are not a matter of employer discretion. Sections 18 to 24 of the Code on Wages set out a closed list of what may be deducted, and Section 18 caps the total of all deductions in a wage period at fifty per cent of wages. Anything outside the list is unauthorised, however it is described in a policy.</p>
        <DataTable headers={['Deduction', 'Permissible?', 'What it depends on']} rows={[
          ['Statutory deductions — tax, provident fund, insurance', 'Yes', 'Correct computation, and actual deposit of what was deducted'],
          ['Absence from duty', 'Yes', 'Proportionate to the period of absence; attendance and leave records'],
          ['Damage to or loss of goods entrusted', 'Yes, limited', 'Limited to the loss, and only after an opportunity to show cause'],
          ['House accommodation or amenities supplied', 'Yes', 'Accepted by the employee and within the prescribed limits'],
          ['Recovery of an advance', 'Yes', 'Written record of the advance and the agreed repayment'],
          ['Recovery of a loan', 'Yes', 'The loan terms, and the prescribed conditions'],
          ['Fines', 'Yes, narrowly', 'Only for an act or omission specified with approval, after a hearing'],
          ['Notice pay where the employee did not serve notice', 'Contractual', 'The notice clause, the notice actually served, and any waiver'],
          ['Training bond or relocation recovery', 'Contested', 'The bond terms and actual loss; penal recovery is frequently challenged'],
          ['Unreturned company asset', 'Not as a wage deduction', 'Pursue return or recovery of the loss; do not withhold earned wages'],
          ['Performance shortfall', 'No', 'Not a permissible head of deduction'],
          ['Incentive clawback', 'Depends', 'Only where the scheme contains a clear trigger and it has occurred'],
          ['Any deduction taking the total above fifty per cent of wages', 'No', 'The statutory cap under Section 18 applies regardless of basis']
        ]} />
      </Section>

      <Section id="forum" title="Where to Bring the Claim">
        <p>Forum selection is where these matters are won or lost. Three routes exist, and they are not alternatives chosen on preference — they turn on who the claimant is and what is claimed.</p>
        <DataTable headers={['Route', 'Open to', 'Best for', 'Basis']} rows={[
          ['Authority under the Code on Wages', 'Any employee, including managerial staff', 'Unpaid wages, F&F, unauthorised deductions, bonus', 'Code on Wages, Sections 45 to 49'],
          ['Industrial Relations Code machinery', 'A worker, excluding managerial and administrative roles', 'Termination disputes and money due to a worker', 'Industrial Relations Code, Section 59 and the dispute provisions'],
          ['Civil or commercial suit', 'Anyone with a contractual claim', 'Consultant fees, damages, claims outside the wage definition', 'Indian Contract Act, 1872, and civil procedure'],
          ['Code on Social Security machinery', 'Employees and workers', 'Gratuity, provident fund and insurance defaults', 'Code on Social Security, 2020'],
          ['Settlement', 'Anyone', 'Recovery where the employer is illiquid but willing', 'Documented terms with dates and a default clause']
        ]} />
        <div className="info-box" aria-label="Why the statutory route is usually better">
          <p><strong>For a pure wage claim the statutory authority is normally the better forum, and the reason is Section 45.</strong> It carries a three-year limitation, a direction that the claim be decided within three months, and the power to award compensation of up to ten times the amount found due. A civil suit offers none of that and takes considerably longer. The civil route earns its place where the claim is genuinely contractual — a consultant&rsquo;s fee, a damages claim, an amount that is not wages.</p>
        </div>
        <p>Designation does not settle whether someone is a worker. Actual duties, the degree of control and the nature of the work do. A title containing the word &ldquo;manager&rdquo; attached to a role with no managerial function has repeatedly failed to keep claimants out of the labour forum. See <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link> where the civil route is the right one.</p>
      </Section>

      <Section id="limitation" title="Limitation and Compensation">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Limitation for a claim under Section 45', 'Three years from the date the claim arises'],
          ['Delay beyond three years', 'The authority may entertain the application on sufficient cause being shown'],
          ['Target for disposal', 'The authority is to endeavour to decide the claim within three months'],
          ['Compensation', 'In addition to the amount determined, extending to ten times the claim'],
          ['Appeal', 'To the Appellate Authority within ninety days, with an endeavour to dispose of it in three months'],
          ['Limitation for a civil suit', 'Three years under the Limitation Act, 1963, from when the cause of action arose'],
          ['Practical constraint', 'Evidence degrades long before any limitation bar operates']
        ]} />
        <p>The three-year window is generous by comparison with the twelve months allowed under the Payment of Wages Act, and it is not a reason to wait. Email accounts are deactivated, HR staff leave, portal access is revoked and payslips become hard to reconstruct. The claim is at its strongest in the weeks after the default, not in the third year.</p>
      </Section>

      <Section id="notice" title="The Legal Notice">
        <p>A notice is not a statutory precondition to a claim under Section 45. It is sent because it works: it fixes the figure, invokes the deadline that has already been missed, and forces the employer to adopt a written position they will be held to later.</p>
        <DataTable headers={['Element', 'Why it belongs in the notice']} rows={[
          ['The correct employer entity', 'The legal name and registered office, not the brand or the group holding company'],
          ['Employment particulars', 'Joining date, designation, reporting line and salary structure'],
          ['Component-wise computation', 'Each head separately, with the period and the amount, so the total can be checked'],
          ['The documents relied on', 'Payslips, bank statement, appointment letter, F&F statement, leave record'],
          ['The exit facts', 'Resignation or termination date, notice served, handover and asset return'],
          ['The deadline already missed', 'Section 17(1) for monthly wages and Section 17(2) for the exit payment'],
          ['Each deduction challenged', 'Identified individually, with why it falls outside Sections 18 to 24'],
          ['A payment deadline and bank details', 'Makes compliance easy and non-compliance deliberate'],
          ['The next step named', 'The Section 45 authority, the Tribunal, or the civil court — specifically'],
          ['A professional register', 'Allegation and accusation reduce the chance of settlement and prove nothing']
        ]} />
        <p>Send it to the registered office and to the HR and management email addresses already used in the correspondence, and keep the dispatch proof. See <Link href="/solutions/legal/general-legal-notice">General Legal Notice</Link> for service and proof of service generally.</p>
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Employment facts, dues and urgency assessed'],
          ['2', 'Document review', 'Offer letter, appointment letter, policies and incentive scheme read'],
          ['3', 'Wage definition analysis', 'Whether the fifty per cent add-back changes the computation'],
          ['4', 'Dues computation', 'Component-wise statement with periods, amounts and supporting proof'],
          ['5', 'Deduction review', 'Each deduction tested against Sections 18 to 24 and the fifty per cent cap'],
          ['6', 'Category assessment', 'Employee, worker or consultant — on duties, not designation'],
          ['7', 'Forum mapping', 'Section 45 authority, Tribunal, civil court or settlement'],
          ['8', 'Employer identification', 'Legal entity, registered office and authorised signatories verified'],
          ['9', 'Evidence preservation', 'Emails, chat records and portal extracts secured in provable form'],
          ['10', 'Notice drafting and dispatch', 'Demand issued with proof of service retained'],
          ['11', 'Response analysis', 'Employer reply, denial or payment proposal assessed'],
          ['12', 'Settlement or filing', 'Documented terms, or a filing-ready claim file with annexures'],
          ['13', 'Tracking', 'Ticket-based status updates to recovery or order']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Offer letter and appointment letter', 'Establishes the relationship, salary and notice terms'],
          ['Employment agreement', 'Contractual rights, restrictions and dispute clause'],
          ['Salary slips', 'Structure, components and any deduction made'],
          ['Bank statements', 'Proves what was credited and what was not'],
          ['Form 16 and tax records', 'Corroborates salary and tax deducted'],
          ['Attendance or system access records', 'Workdays and the last working day'],
          ['HR portal extracts', 'Leave balance, payroll and employment record'],
          ['Email correspondence', 'Follow-ups, admissions and promises to pay'],
          ['Chat records', 'Admissions and payment commitments'],
          ['Resignation or termination letter', 'Exit date, notice period and stated reason'],
          ['Acceptance of resignation', 'The employer position on the exit date'],
          ['Handover and asset return record', 'Removes the usual justification for withholding'],
          ['Relieving letter, if issued', 'Exit record and clearance status'],
          ['Full and final statement', 'The employer computation, to be tested line by line'],
          ['Incentive scheme and achievement data', 'Entitlement and the trigger for variable pay'],
          ['Leave policy and balance', 'Encashment entitlement'],
          ['Reimbursement claims and approvals', 'Expense recovery'],
          ['Provident fund passbook or portal record', 'Whether deductions were actually deposited'],
          ['Company master data', 'The correct legal entity and registered office'],
          ['Any notice received from the employer', 'Reply strategy and counterclaim assessment']
        ]} />
      </Section>

      <Section id="exit" title="Resignation and Termination">
        <p>The exit facts decide most of the argument, because they determine what is due and when the two-working-day clock started.</p>
        <DataTable headers={['Issue', 'Resignation', 'Termination']} rows={[
          ['Trigger for Section 17(2)', 'The resignation taking effect', 'Removal, dismissal or retrenchment'],
          ['Notice period', 'Notice served, waived or bought out under the contract', 'Notice pay or pay in lieu, per the contract'],
          ['Salary to the last working day', 'Payable in full', 'Payable in full, regardless of the reason given'],
          ['Leave encashment', 'Per policy and the closing balance', 'Per policy and the closing balance'],
          ['Asset return', 'Return it and record the acknowledgement', 'Return it and record the acknowledgement'],
          ['Misconduct allegation', 'Rarely relevant on a voluntary exit', 'Inquiry record and due process become central'],
          ['Suspension period', 'Not applicable', 'Subsistence allowance and the inquiry position'],
          ['Retrenchment compensation', 'Not applicable', 'Applies to a worker, where the conditions are met'],
          ['Challenge to the exit itself', 'Generally not available', 'A separate remedy where the termination is unlawful'],
          ['Document release', 'Deal with it in the settlement terms', 'Deal with it in the settlement terms']
        ]} />
        <p>Neither resignation nor termination cancels wages already earned. Where the employer asserts a counter-entitlement, the lawful course is to pay what is not in dispute and pursue the rest — not to hold the lot and call it a process.</p>
      </Section>

      <Section id="statutory-dues" title="Gratuity, PF and ESI">
        <p>These are not part of the wage claim and should not be folded into it. They have their own provisions, their own machinery under the Code on Social Security, 2020, and in some cases considerably more pressure behind them.</p>
        <DataTable headers={['Due', 'Position', 'Practical point']} rows={[
          ['Gratuity', 'Section 53 — after five years of continuous service', 'Payable within thirty days of becoming payable, with simple interest for delay'],
          ['Gratuity on fixed term employment', 'Pro rata, without the five-year requirement', 'A significant change under the codes for fixed-term staff'],
          ['Gratuity on death or disablement', 'Payable irrespective of the five-year period', 'Nomination records matter'],
          ['Provident fund contribution', 'Employer and employee shares under the Code', 'Check the passbook against the payslip deduction'],
          ['PF deducted but not deposited', 'A statutory default in its own right', 'Usually the strongest lever against an employer in difficulty'],
          ['Employee insurance contribution', 'Under the Code on Social Security', 'Benefit denial follows from non-deposit'],
          ['Effect on the wage claim', 'Separate — do not merge the figures', 'Merging them invites a dispute about the whole amount']
        ]} />
      </Section>

      <Section id="employer" title="The Employer Side">
        <p>Employers receiving a salary notice tend to make one of two mistakes: ignoring it, or replying at length without first verifying what is actually owed. Both increase the final cost.</p>
        <DataTable headers={['Situation', 'The defensible course']} rows={[
          ['The dues are genuinely payable', 'Pay, or propose dated settlement terms in writing'],
          ['Part is payable and part is disputed', 'Pay the undisputed amount now; the statutory deadline does not wait for the dispute'],
          ['The employee did not serve notice', 'Compute the adjustment on the contract, and document it'],
          ['An asset has not been returned', 'Demand return and evidence the loss; do not withhold earned wages instead'],
          ['Loss is attributed to the employee', 'Section 21 requires a quantified loss and an opportunity to show cause'],
          ['The incentive was not earned', 'Produce the scheme, the data and the computation'],
          ['The F&F is in process', 'The statutory deadline is two working days; a process timeline is not a defence'],
          ['Job abandonment is alleged', 'Preserve attendance records and the communication trail'],
          ['A misconduct inquiry is pending', 'Ensure the due process record exists before relying on it'],
          ['PF or ESI deposit is questioned', 'Produce the challans; this is the exposure that escalates fastest'],
          ['Several employees are affected', 'Treat it as a payroll compliance exposure, not a set of individual disputes'],
          ['The company is short of funds', 'Negotiate documented terms early; liability does not abate with liquidity']
        ]} />
        <p>Payroll structures built around a low basic pay deserve a separate look. The wage definition under the codes has been in force since November 2025, and an unrestructured payroll understates gratuity, bonus and contributions across the whole workforce rather than for one claimant.</p>
      </Section>

      <Section id="common-issues" title="Why Salary Claims Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A round-figure demand with no computation', 'The quantum becomes the dispute', 'Component-wise statement tied to documents'],
          ['Wrong employer entity named', 'Service and maintainability objections', 'Company master data and registered office verification'],
          ['Incentive claimed with no scheme or data', 'The whole claim loses credibility', 'Separate the provable wage claim from the contested variable pay'],
          ['The old law applied by habit', 'Wrong forum and a shorter limitation assumed', 'Claim framed under the codes in force since November 2025'],
          ['Senior employee sent to a civil suit by default', 'Years added, and the Section 45 compensation lever lost', 'Category and forum assessed on duties'],
          ['Deductions accepted without testing', 'Lawful-looking adjustments go unchallenged', 'Each deduction tested against Sections 18 to 24 and the cap'],
          ['The wage add-back ignored', 'Gratuity and bonus computed on an understated figure', 'Structure reviewed against the Section 2(y) definition'],
          ['Only verbal follow-up', 'No record of demand or refusal', 'Written notice with proof of dispatch'],
          ['Electronic evidence not preserved', 'Admissions are lost with portal access', 'Preservation aligned to BSA requirements'],
          ['Emotional or accusatory correspondence', 'Settlement prospects reduced, counterclaim invited', 'Professional drafting that states facts and figures'],
          ['Statutory dues merged into the wage claim', 'One dispute about everything', 'Gratuity and PF pursued on their own track'],
          ['Settlement left verbal', 'Default recurs with nothing to enforce', 'Dated terms with a default clause']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Dues computation', 'Component-wise statement of salary, F&F, leave, overtime and arrears'],
          ['Employment document review', 'Offer letter, appointment letter, policies and incentive scheme'],
          ['Wage definition analysis', 'Whether the fifty per cent add-back changes gratuity and bonus'],
          ['Deduction review', 'Each deduction tested against the permissible heads and the cap'],
          ['Category and forum assessment', 'Employee, worker or consultant, and the right forum for each claim'],
          ['Legal notice drafting', 'Demand with computation, provisions, deadline and bank details'],
          ['Employer verification', 'Legal entity, registered office and service addresses'],
          ['Dispatch and service record', 'Speed post, courier and email, with proof retained'],
          ['Reply analysis', 'Assessment of the employer response and counter-position'],
          ['Claim file preparation', 'Filing-ready application with annexures and chronology'],
          ['Statutory dues review', 'Gratuity entitlement, and PF or ESI deduction against deposit'],
          ['Employer-side response', 'Dues verification, defensible deductions and payroll exposure review'],
          ['Settlement documentation', 'Payment schedule, no-dues terms, document release and default clause'],
          ['Advocate coordination', 'Brief, chronology and evidence file for filing and appearance'],
          ['Ticket-based tracking', 'Documents, notice, dispatch, reply, settlement and next step']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The labour codes changed the arithmetic of a salary dispute, and most employers have not caught up. Full and final settlement is due in two working days, the wage ceiling that kept senior employees out of the statutory route is gone, the claim window is three years, and the authority can add compensation of up to ten times the amount withheld. A claim that computes every component and names the provision does not need to argue — it only needs to be answered.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal or employment advice. Entitlement, quantum, the correct forum and the applicable limitation depend on the employment terms, the actual duties performed, the establishment and the State in which it operates. The provisions described here reflect the Code on Wages, 2019, the Industrial Relations Code, 2020 and the Code on Social Security, 2020 as in force from 21 November 2025; State rules under the codes continue to be notified, and parts of this guide remain under professional review. Estabizz provides dues computation, document review, drafting, evidence review, settlement documentation and filing coordination; appearance is through enrolled advocates. Confirm the position with your adviser before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
