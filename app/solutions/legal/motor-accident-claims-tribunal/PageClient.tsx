'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'first-steps', title: 'What to Do After an Accident' },
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'limitation', title: 'The Six-Month Question' },
  { id: 'two-routes', title: 'Two Routes to Compensation' },
  { id: 'section-164', title: 'Fixed Compensation Under Section 164' },
  { id: 'section-166', title: 'The Fault Claim Under Section 166' },
  { id: 'who-can-claim', title: 'Who Can Claim, and Against Whom' },
  { id: 'dar', title: 'The Detailed Accident Report' },
  { id: 'computation', title: 'How Compensation Is Computed' },
  { id: 'injury', title: 'Injury and Disability Claims' },
  { id: 'hit-and-run', title: 'Hit and Run, and the Golden Hour' },
  { id: 'insurer-defences', title: 'What the Insurer Will Argue' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'evidence', title: 'Evidence That Decides the Award' },
  { id: 'process', title: 'How the Claim Runs' },
  { id: 'award', title: 'Award, Execution and Appeal' },
  { id: 'settlement', title: 'Settling With the Insurer' },
  { id: 'common-issues', title: 'Why Claims Are Reduced' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Estabizz Practice Note' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a Motor Accident Claims Tribunal?', 'A tribunal constituted under the Motor Vehicles Act, 1988 to decide claims for compensation arising from motor vehicle accidents involving death, bodily injury or third-party property damage.'],
  ['Who can file a claim?', 'The injured person, or in a death case the legal representatives of the deceased, and in a property damage case the owner. The claim is generally against the driver, the owner and the insurer.'],
  ['Is there a time limit to file?', 'Section 166(3), reintroduced by the 2019 amendment and operative from 1 April 2022, prescribes six months from the date of the accident. However, the validity of that sub-section is under challenge before the Supreme Court, which has passed an interim direction that claims are not to be dismissed as time-barred under it while the matter is pending.'],
  ['So am I out of time or not?', 'File within six months — that is what the statute says and the interim protection is not permanent. But if you are already beyond six months, do not abandon the claim: as matters stood when this page was prepared, tribunals and High Courts were directed not to dismiss claims on that ground. Confirm the current position before deciding, because this is live litigation.'],
  ['What is the difference between Section 164 and Section 166?', 'Section 164 provides a fixed sum — five lakh rupees for death and two and a half lakh rupees for grievous hurt — without the claimant having to prove wrongful act, neglect or default. Section 166 is the full fault-based claim where compensation is assessed on the actual loss and can be far higher.'],
  ['What happened to Section 163A?', 'It was omitted by the 2019 amendment and replaced by the Section 164 structure. Older material still referring to Section 163A and the Second Schedule is describing a regime that no longer operates.'],
  ['Which route should I choose?', 'Where there is real loss of dependency or substantial injury, the Section 166 route almost always yields more. The fixed route offers certainty and speed where proving negligence would be difficult or the loss is modest. The election should be a reasoned decision, not an accident of which form was filed.'],
  ['Do I have to prove whose fault it was?', 'Under Section 166, negligence has to be established, though tribunals apply a standard less exacting than a criminal trial. Under Section 164, proof of wrongful act, neglect or default is expressly dispensed with.'],
  ['What is a DAR?', 'The Detailed Accident Report, prepared and submitted by the police under the Section 159 framework, which can be treated as a claim application. It was intended to start the process without the family having to file anything.'],
  ['Does the DAR mean I need not do anything?', 'No. The DAR starts the process but the quality of the compensation still depends on the income proof, medical records and dependency evidence that the family supplies. Treating the DAR as the whole case is a common and expensive mistake.'],
  ['How is compensation for death calculated?', 'Broadly: income of the deceased, an addition for future prospects, a deduction for personal expenses, multiplied by an age-based multiplier, plus conventional heads such as loss of consortium, loss of estate and funeral expenses. The Supreme Court has standardised much of this.'],
  ['What are future prospects?', 'An addition to the income figure recognising that earnings would likely have risen. The Constitution Bench in National Insurance v. Pranay Sethi settled the percentages by age band and by whether the deceased was on a permanent job, a fixed salary or self-employed.'],
  ['What if the deceased had no documented income?', 'Notional income can be assessed. It will generally be lower than proven income, which is why even partial evidence — ITRs, salary slips, business records, bank statements — materially improves the award.'],
  ['How is injury compensation assessed?', 'Medical expenses, loss of income during treatment, future medical costs, loss of earning capacity based on the disability, attendant care, pain and suffering, and loss of amenities. The disability certificate matters, but so does how the disability affects your actual occupation.'],
  ['Is a 40 percent disability a 40 percent loss of earning capacity?', 'Not necessarily. Functional disability in relation to the claimant’s occupation is the question. The same impairment affects a manual worker and a desk worker very differently, and that has to be explained with evidence.'],
  ['What is interest on the award?', 'The tribunal may award interest from the date of the application under Section 171. Over a long-running claim it is a significant component.'],
  ['What if the vehicle was not insured?', 'The owner and driver remain liable, and recovery is then against them personally. In hit-and-run cases a separate compensation scheme applies under Section 161.'],
  ['What is the hit and run compensation?', 'Compensation payable under the Section 161 scheme where the vehicle is unidentified — two lakh rupees in case of death and fifty thousand rupees for grievous hurt under the current framework.'],
  ['What is the golden hour provision?', 'Section 162 addresses treatment during the golden hour — the first hour after a traumatic injury, when timely care is most likely to prevent death — through the scheme framed for cashless treatment of road accident victims.'],
  ['Can a claim be made if the deceased was partly at fault?', 'Yes. Contributory negligence generally reduces the compensation proportionately rather than defeating the claim entirely.'],
  ['Can a passenger in the offending vehicle claim?', 'Often yes, depending on the policy and the capacity in which they travelled. Gratuitous passengers in goods vehicles raise specific policy coverage questions.'],
  ['What is the pay and recover principle?', 'Where the insurer establishes a policy breach by the owner, a tribunal may still direct the insurer to pay the claimant and recover the amount from the owner, so that the victim is not left without a remedy.'],
  ['Should I accept the insurer’s settlement offer?', 'Only after it is compared against a properly computed entitlement. Early offers are frequently a fraction of the assessable claim, and an accepted settlement is hard to reopen.'],
  ['What is the biggest mistake families make?', 'Waiting — because of grief, because the police case is ongoing, or because an insurer said it would be sorted out. Evidence degrades, income documents go missing, and the limitation position becomes contested.'],
  ['Can Estabizz appear before the Tribunal?', 'We handle claim route assessment, documentation, DAR coordination, income and disability evidence, compensation working, hearing file preparation and award follow-up. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Accident Claims' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Motor Accident Claims Tribunal' }]}
      title="Motor Accident Claims Tribunal"
      readTime="17 min read"
      hideReviewBadge
      focusKeyword="Motor Accident Claims Tribunal"
      sections={sections}
      ctaTitle="Speak With an Accident Claims Expert"
      ctaDescription="Claim route assessed, evidence assembled while it still exists, and compensation computed properly before any settlement is discussed."
      quickFacts={[
        { label: 'Fault claim', value: 'Section 166' },
        { label: 'Fixed compensation', value: '₹5 lakh / ₹2.5 lakh' },
        { label: 'Statutory limit', value: '6 months, under challenge' },
        { label: 'Appeal', value: 'High Court, Section 173' }
      ]}
      relatedArticles={[
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Carrying a tribunal or trial-court decision up to the High Court.' },
        { title: 'Complaints Before Consumer Court', href: '/solutions/legal/complaints-before-consumer-court', category: 'Legal', description: 'Where an insurer has repudiated or delayed a claim as a deficiency in service.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, evidence, orders, appeal routes and execution.' }
      ]}
      finalCtaTitle="The Award Is Decided by the File"
      finalCtaDescription="Two families with identical losses routinely receive very different awards, because one produced income proof, medical records and dependency evidence and the other did not. That gap is closed in the first few weeks, not at the hearing."
      heroDescription={<p>After a road accident, compensation is not automatic. It has to be claimed, proved and computed — the accident, the negligence, the injury or death, the income, the dependency, the disability and the future loss, each supported by documents that are easiest to obtain immediately and hardest to obtain a year later. Estabizz assists accident victims, injured persons, legal heirs, dependants, vehicle owners and businesses with claim route assessment under Sections 164 and 166, limitation review, DAR coordination, police and hospital record collection, income and dependency documentation, disability evidence, insurance policy review, compensation computation, hearing file preparation, award follow-up and execution and appeal support.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="first-steps" title="What to Do After an Accident">
        <div className="warning-box" aria-label="Immediate steps">
          <p><strong>If someone is injured, treatment comes first and nothing on this page should delay it.</strong> Under the golden hour framework a road accident victim is entitled to treatment, and a hospital should not withhold emergency care pending payment. Once the person is safe, the practical priority is the record: the FIR, the vehicle details, the hospital papers and photographs of the scene. Those are easy to obtain now and very hard to reconstruct later.</p>
        </div>
        <DataTable headers={['Step', 'Why it matters']} rows={[
          ['Get medical attention immediately', 'Health first, and the contemporaneous medical record is central evidence'],
          ['Ensure an FIR is registered', 'The police record anchors the whole claim'],
          ['Note the offending vehicle number', 'Without it the claim becomes a hit-and-run matter'],
          ['Photograph the scene and the vehicles', 'Position, damage and road conditions'],
          ['Collect witness names and numbers', 'Witnesses disappear within days'],
          ['Keep every medical bill and prescription', 'Each one is a head of claim'],
          ['Obtain the post-mortem report in a death case', 'Establishes cause of death'],
          ['Preserve the deceased’s income records', 'ITRs, salary slips, business books'],
          ['Do not sign an insurer discharge early', 'It can close the claim for a fraction of its value'],
          ['Note the date of the accident', 'Limitation runs from it']
        ]} />
      </Section>

      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> MACT is the tribunal where a road accident victim or a bereaved family claims compensation from the driver, the owner and the insurer.</p>
        <p>The law here is unusually generous in intent and unusually dependent on paperwork in practice. Two families suffering identical losses can receive very different awards, and the difference is almost always the file.</p>
        <p>The framework also changed substantially with the 2019 amendment, and a good deal of published material still describes the previous regime.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>MACT is not a licence or a registration. It is a statutory tribunal deciding compensation claims under the Motor Vehicles Act, 1988.</p>
        <p>Claims lie against the driver, the owner and the insurer. Civil court jurisdiction over these claims is barred, so the tribunal is the forum. Appeals go to the High Court.</p>
      </Section>

      <Section id="limitation" title="The Six-Month Question">
        <div className="warning-box" aria-label="Limitation position">
          <p><strong>This is the single most consequential thing on this page, and it is genuinely unsettled.</strong> The 2019 amendment reintroduced Section 166(3), prescribing <strong>six months</strong> from the date of the accident to file a claim — reversing a position that had allowed claims without a time bar since 1994. The constitutional validity of that sub-section is under challenge before the Supreme Court in <em>Bhagirathi Dash v. Union of India</em>, and the Court has passed an interim direction that tribunals and High Courts <strong>shall not dismiss</strong> claim petitions as barred by limitation under Section 166(3) while the matter is pending.</p>
        </div>
        <DataTable headers={['Your position', 'What to do']} rows={[
          ['Accident was recent', 'File within six months — treat the statutory period as real'],
          ['Approaching six months', 'File now rather than relying on interim protection'],
          ['Already beyond six months', 'Do not abandon the claim — take advice on the current position'],
          ['Told your claim is time-barred', 'Check whether the interim direction still applies'],
          ['Negotiating with an insurer', 'Do not let negotiation consume the period'],
          ['Awaiting the police investigation', 'That is not a reason to delay filing'],
          ['Unsure of the current position', 'This is live litigation — confirm before deciding']
        ]} />
        <p>The honest advice is the cautious one: file inside six months, because the interim protection is interim and could end at any time. But a family already outside that window should not be told their claim is dead, because as matters stood when this page was prepared, it was not.</p>
      </Section>

      <Section id="two-routes" title="Two Routes to Compensation">
        <div className="info-box" aria-label="163A replaced">
          <p><strong>Section 163A no longer exists.</strong> The 2019 amendment omitted it and replaced the structured no-fault route with Section 164. Material still describing a Section 163A claim computed on the Second Schedule is describing a regime that has been superseded, and the figures in it are not the current ones.</p>
        </div>
        <DataTable headers={['Point', 'Section 164 — fixed compensation', 'Section 166 — fault claim']} rows={[
          ['Basis', 'Fixed statutory sum', 'Compensation assessed on actual loss'],
          ['Proof of negligence', 'Expressly dispensed with', 'Must be established'],
          ['Amount for death', 'Five lakh rupees', 'No ceiling — depends on income, age and dependency'],
          ['Amount for grievous hurt', 'Two and a half lakh rupees', 'Depends on injury, disability and loss'],
          ['Speed', 'Faster and more certain', 'Longer, with evidence and cross-examination'],
          ['Best suited to', 'Modest loss, or where negligence is hard to prove', 'Real dependency loss or serious injury'],
          ['Typical outcome difference', 'Certainty', 'Frequently a multiple of the fixed sum'],
          ['Election', 'Suited to speed and certainty', 'Suited to full recovery — choose deliberately']
        ]} />
      </Section>

      <Section id="section-164" title="Fixed Compensation Under Section 164">
        <DataTable headers={['Feature', 'Position']} rows={[
          ['Liability', 'On the owner of the vehicle or the authorised insurer'],
          ['Death', 'Five lakh rupees'],
          ['Grievous hurt', 'Two and a half lakh rupees'],
          ['Proof required', 'Not necessary to plead or establish wrongful act, neglect or default'],
          ['Who receives it', 'Legal heirs in a death case; the victim in an injury case'],
          ['Operative from', '1 April 2022'],
          ['Relationship with Section 166', 'An alternative route — the election matters'],
          ['When it genuinely suits', 'Where negligence would be difficult to prove or the assessable loss is modest']
        ]} />
        <p>The attraction is certainty. The risk is that a family with a substantial dependency loss takes the fixed sum because it arrives sooner, when a properly built Section 166 claim would have been worth considerably more.</p>
      </Section>

      <Section id="section-166" title="The Fault Claim Under Section 166">
        <DataTable headers={['Element', 'What has to be shown']} rows={[
          ['The accident occurred', 'FIR, police records, site plan, photographs'],
          ['Involvement of the motor vehicle', 'Vehicle identification and police record'],
          ['Negligence', 'Of the driver, established on the civil standard'],
          ['Death or injury resulting', 'Post-mortem or medical records'],
          ['Identity of owner and insurer', 'RC and policy details'],
          ['Income of the deceased or injured', 'ITRs, salary records, business accounts'],
          ['Dependency', 'Relationship and financial dependence of the claimants'],
          ['Disability, in injury cases', 'Certificate plus functional impact evidence'],
          ['Expenses incurred', 'Medical bills, transport, attendant care'],
          ['Future loss', 'Continuing treatment and loss of earning capacity']
        ]} />
      </Section>

      <Section id="who-can-claim" title="Who Can Claim, and Against Whom">
        <DataTable headers={['Point', 'Position']} rows={[
          ['In a death case', 'The legal representatives of the deceased'],
          ['In an injury case', 'The injured person'],
          ['Property damage', 'The owner of the property damaged'],
          ['Respondents', 'Driver, owner and insurer, generally together'],
          ['Minor claimants', 'Through a guardian'],
          ['Where the vehicle is uninsured', 'Owner and driver remain personally liable'],
          ['Where the vehicle is unidentified', 'The hit-and-run scheme under Section 161'],
          ['Employer liability', 'May arise where the driver was acting in the course of employment'],
          ['Jurisdiction', 'Tribunal where the accident occurred, or where the claimant or respondent resides'],
          ['Civil court', 'Jurisdiction barred under Section 175']
        ]} />
      </Section>

      <Section id="dar" title="The Detailed Accident Report">
        <p>The Detailed Accident Report, prepared by the police under the Section 159 framework, was introduced to spare families the burden of initiating a claim. It can be treated as an application for compensation.</p>
        <DataTable headers={['Point', 'Practical reality']} rows={[
          ['What it is', 'A police-prepared report with accident, vehicle, insurer and victim details'],
          ['Effect', 'Can be treated as a claim application before the tribunal'],
          ['Intended benefit', 'The process starts without the family having to file'],
          ['What it does not do', 'Supply your income proof, dependency evidence or medical records'],
          ['Common misconception', 'That the DAR means nothing further is needed'],
          ['What the family must still provide', 'Income documents, dependency proof, bills and disability evidence'],
          ['If the DAR is incomplete', 'Supplement it rather than rely on it'],
          ['Follow-up', 'Track whether it has actually been filed with the tribunal']
        ]} />
        <div className="info-box" aria-label="DAR is a start">
          <p><strong>The DAR starts the claim; it does not build it.</strong> Families frequently assume that because the police have filed a report, the compensation will follow automatically. The report establishes the accident. The size of the award is decided by evidence only the family can supply — and by then, months may have passed.</p>
        </div>
      </Section>

      <Section id="computation" title="How Compensation Is Computed">
        <p>The Supreme Court has standardised much of the assessment in death cases, which makes the outcome considerably more predictable than most litigation — provided the inputs are proved.</p>
        <DataTable headers={['Component', 'How it works']} rows={[
          ['Established income', 'Proved income of the deceased, or notional income if unproved'],
          ['Future prospects', 'A percentage addition by age band and employment type, settled in National Insurance v. Pranay Sethi'],
          ['Deduction for personal expenses', 'A fraction deducted depending on the number of dependants'],
          ['Multiplier', 'An age-based multiplier, following the Sarla Verma framework'],
          ['Loss of dependency', 'The product of the above — usually the largest component'],
          ['Loss of consortium', 'Conventional head for spouse, and recognised for children and parents'],
          ['Loss of estate', 'Conventional head'],
          ['Funeral expenses', 'Conventional head'],
          ['Interest', 'Under Section 171, generally from the date of the application'],
          ['Contributory negligence', 'Proportionate reduction where established']
        ]} />
        <div className="warning-box" aria-label="Income proof">
          <p><strong>Income proof is the difference between an adequate award and a token one.</strong> Where income cannot be proved, a notional figure is used, and it will almost always be lower than reality for a working adult. Income tax returns, salary slips, Form 16, bank statements, GST returns or audited accounts — whatever exists — should be collected immediately, because families routinely find these documents impossible to reconstruct months after a death.</p>
        </div>
      </Section>

      <Section id="injury" title="Injury and Disability Claims">
        <DataTable headers={['Head of claim', 'What supports it']} rows={[
          ['Medical expenses incurred', 'Bills, prescriptions, discharge summaries'],
          ['Future medical expenses', 'Doctor’s assessment of continuing treatment'],
          ['Loss of income during treatment', 'Employer certificate, leave records, income proof'],
          ['Loss of future earning capacity', 'Disability certificate plus occupational impact'],
          ['Attendant and nursing care', 'Cost evidence, and medical opinion on need'],
          ['Special diet and transport', 'Receipts and medical advice'],
          ['Prosthetics and aids', 'Quotations and medical recommendation'],
          ['Pain and suffering', 'Nature and duration of the injury'],
          ['Loss of amenities', 'How life has changed in practical terms'],
          ['Disfigurement', 'Where relevant']
        ]} />
        <div className="info-box" aria-label="Functional disability">
          <p><strong>A disability percentage is not the same as a loss of earning capacity.</strong> A certified forty percent impairment of a limb may end a manual worker&rsquo;s livelihood entirely while barely affecting a desk-based professional. The claim should explain the impact on the claimant&rsquo;s actual occupation with evidence, rather than leaving the tribunal to translate a medical percentage into an economic one.</p>
        </div>
      </Section>

      <Section id="hit-and-run" title="Hit and Run, and the Golden Hour">
        <DataTable headers={['Provision', 'What it provides']} rows={[
          ['Section 161 — hit and run', 'Compensation where the vehicle is unidentified'],
          ['Death', 'Two lakh rupees under the current framework'],
          ['Grievous hurt', 'Fifty thousand rupees under the current framework'],
          ['Source', 'The fund and scheme framed under the Act'],
          ['Section 162 — golden hour', 'Scheme for cashless treatment of road accident victims'],
          ['Golden hour meaning', 'The first hour following a traumatic injury, when prompt care most reduces mortality'],
          ['Practical point', 'A hospital should not withhold emergency care pending payment'],
          ['If the vehicle is later identified', 'An ordinary claim may become available']
        ]} />
      </Section>

      <Section id="insurer-defences" title="What the Insurer Will Argue">
        <p>Knowing the standard defences in advance is the most efficient way to build the file, because each one is answered by a document.</p>
        <DataTable headers={['Insurer contention', 'What answers it']} rows={[
          ['The driver had no valid licence', 'Licence copy and validity records'],
          ['The vehicle had no permit or fitness', 'Permit, fitness and RC documents'],
          ['Breach of policy condition', 'Policy terms, and the pay-and-recover principle'],
          ['The accident did not happen as alleged', 'FIR, site plan, photographs, witnesses'],
          ['Contributory negligence by the victim', 'Scene evidence and witness accounts'],
          ['Income is exaggerated', 'ITRs, employer records, bank statements'],
          ['Disability is overstated', 'Certificate, treating doctor’s evidence, functional impact'],
          ['Treatment was unnecessary or excessive', 'Prescriptions and medical justification'],
          ['The claimant is not a dependant', 'Relationship and financial dependence evidence'],
          ['Delay in filing', 'Explanation, and the current Section 166(3) position']
        ]} />
        <div className="info-box" aria-label="Pay and recover">
          <p><strong>A policy breach by the owner does not necessarily leave the victim unpaid.</strong> Where the insurer establishes a breach of a policy condition, tribunals commonly apply the pay-and-recover approach — directing the insurer to satisfy the award to the claimant and then recover from the owner. The victim should not be the one who bears the consequence of the owner&rsquo;s default.</p>
        </div>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main law', 'Motor Vehicles Act, 1988'],
          ['Principal amendment', 'Motor Vehicles (Amendment) Act, 2019'],
          ['Claims chapter', 'Chapter XII — Claims Tribunals'],
          ['Third-party insurance', 'Chapter XI of the Act'],
          ['State rules', 'State Motor Accident Claims Tribunal Rules'],
          ['Accident reporting', 'Section 159 and the Detailed Accident Report framework'],
          ['Hit and run and golden hour', 'Sections 161 and 162 and the schemes framed under them'],
          ['Insurance law', 'Policy terms and insurance regulation'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Criminal proceedings in parallel', 'BNS and BNSS, where rash or negligent driving is alleged'],
          ['Appeal', 'High Court under Section 173'],
          ['Civil court', 'Jurisdiction barred under Section 175']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Section 159', 'Police report of accident — the DAR framework'],
          ['Section 161', 'Compensation in hit-and-run cases'],
          ['Section 162', 'Treatment during the golden hour'],
          ['Section 164', 'Fixed compensation for death or grievous hurt, without proof of fault'],
          ['Section 165', 'Constitution of Claims Tribunals'],
          ['Section 166', 'Application for compensation'],
          ['Section 166(3)', 'Six-month limitation — currently under constitutional challenge'],
          ['Section 167', 'Option between the Motor Vehicles Act and employee compensation law'],
          ['Section 168', 'Award of the Tribunal'],
          ['Section 169', 'Procedure and powers of the Tribunal'],
          ['Section 170', 'Impleadment of the insurer and the defences available'],
          ['Section 171', 'Award of interest'],
          ['Section 173', 'Appeal to the High Court'],
          ['Section 174', 'Recovery of the awarded amount'],
          ['Section 175', 'Bar on civil court jurisdiction']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['FIR and police papers', 'Establishing the accident'],
          ['Site plan and photographs', 'How the accident occurred'],
          ['Detailed Accident Report', 'Where prepared by the police'],
          ['Charge sheet, if filed', 'Supports the negligence case'],
          ['Offending vehicle RC and permit', 'Owner identification and policy coverage'],
          ['Driving licence of the driver', 'Policy compliance issues'],
          ['Insurance policy', 'Coverage and the insurer’s liability'],
          ['Post-mortem report', 'Death cases'],
          ['Death certificate', 'Death cases'],
          ['Legal heir certificate', 'Entitlement of the claimants'],
          ['Medical records and bills', 'Injury and expenses'],
          ['Disability certificate', 'Loss of earning capacity'],
          ['Income proof — ITR, salary slips, Form 16, accounts', 'The single biggest driver of quantum'],
          ['Age proof', 'The multiplier'],
          ['Dependency evidence', 'Relationship and financial dependence'],
          ['Employer certificate', 'Loss of income during treatment'],
          ['Bank statements', 'Income and expenditure corroboration']
        ]} />
      </Section>

      <Section id="evidence" title="Evidence That Decides the Award">
        <DataTable headers={['Priority', 'Why it is decisive']} rows={[
          ['Income documentation', 'Multiplies through the whole dependency computation'],
          ['Age proof of the deceased', 'Determines the multiplier and the future prospects band'],
          ['Dependency evidence', 'Who is entitled, and the personal expenses deduction'],
          ['Disability certificate with functional explanation', 'Translates impairment into economic loss'],
          ['Complete medical record', 'Every head of expense must be evidenced'],
          ['Witness evidence on negligence', 'Underpins a Section 166 claim'],
          ['Photographs and site plan', 'Corroborates the manner of the accident'],
          ['Policy document', 'Determines coverage and the insurer’s defences'],
          ['Contemporaneous records', 'Far stronger than later reconstruction']
        ]} />
      </Section>

      <Section id="process" title="How the Claim Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Facts, urgency and the claim route'],
          ['2', 'Limitation review', 'Where the six-month position stands for you'],
          ['3', 'Route selection', 'Section 164 or Section 166'],
          ['4', 'Record collection', 'Police, hospital, vehicle and insurance records'],
          ['5', 'DAR coordination', 'Where the police report is relevant'],
          ['6', 'Income and dependency file', 'The documents that drive quantum'],
          ['7', 'Disability evidence', 'Certificate and occupational impact'],
          ['8', 'Compensation computation', 'A head-by-head working'],
          ['9', 'Claim petition', 'Drafted and filed with annexures'],
          ['10', 'Notice and written statements', 'Driver, owner and insurer respond'],
          ['11', 'Evidence and cross-examination', 'Claimant and medical evidence'],
          ['12', 'Arguments and award', 'Tribunal decides compensation and interest'],
          ['13', 'Realisation', 'Deposit, release and execution if needed'],
          ['14', 'Appeal assessment', 'Where the award is inadequate']
        ]} />
      </Section>

      <Section id="award" title="Award, Execution and Appeal">
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Award', 'Tribunal determines compensation and apportionment among claimants'],
          ['Interest', 'Awarded under Section 171, generally from the application date'],
          ['Deposit', 'The insurer or owner deposits the amount'],
          ['Investment directions', 'Tribunals often direct deposit in fixed instruments, particularly for minors'],
          ['Release', 'Disbursement to claimants as directed'],
          ['Execution', 'Under Section 174 where the award is not satisfied'],
          ['Recovery certificate', 'Where recovery as arrears is pursued'],
          ['Appeal', 'To the High Court under Section 173'],
          ['Appeal by the insurer', 'Common where quantum is high'],
          ['Enhancement appeal', 'Where the award is inadequate on the evidence']
        ]} />
      </Section>

      <Section id="settlement" title="Settling With the Insurer">
        <div className="warning-box" aria-label="Early offers">
          <p><strong>Do not sign a discharge voucher before the claim has been computed.</strong> Early settlement offers are frequently a fraction of the assessable entitlement, and they are made at the point when the family is least able to evaluate them. Once a full-and-final discharge is signed, reopening it is difficult. Have the entitlement worked out first; then decide whether the certainty of an immediate payment is worth the discount.</p>
        </div>
        <DataTable headers={['Consider', 'Why']} rows={[
          ['The computed entitlement', 'The only honest benchmark for any offer'],
          ['Time to award', 'Certainty has real value, but it is not unlimited'],
          ['Interest foregone', 'A later award carries interest from the application date'],
          ['Future medical needs', 'Often underestimated in early offers'],
          ['Whether liability is genuinely disputed', 'A weak liability case justifies a discount; a strong one does not'],
          ['Lok Adalat settlement', 'A legitimate route, but still measure the offer'],
          ['The discharge wording', 'What exactly is being given up'],
          ['Minors’ shares', 'Require court protection regardless of settlement']
        ]} />
      </Section>

      <Section id="common-issues" title="Why Claims Are Reduced">
        <DataTable headers={['Problem', 'Effect on the award', 'How we address it']} rows={[
          ['Filing delayed', 'Limitation contest and degraded evidence', 'Limitation reviewed and the claim filed promptly'],
          ['No income proof', 'Notional income applied, often far below reality', 'Income file assembled early'],
          ['Age proof missing', 'Multiplier disputed', 'Age documents collected at the outset'],
          ['Disability certificate without occupational context', 'Impairment not translated into economic loss', 'Functional impact evidenced'],
          ['Medical bills incomplete', 'Heads of expense disallowed', 'Full medical file compiled'],
          ['Relying on the DAR alone', 'Claim proceeds but quantum suffers', 'Supplementary evidence supplied'],
          ['Fixed compensation taken reflexively', 'A much larger claim foregone', 'Route election assessed deliberately'],
          ['Early discharge signed', 'Claim closed at a fraction of value', 'Computation before any settlement'],
          ['Insurer defences unanticipated', 'Avoidable findings on licence or permit', 'Defences pre-empted in the file'],
          ['Dependency not evidenced', 'Claimants excluded or shares reduced', 'Relationship and dependence documented']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Claim route assessment', 'Section 164 or Section 166, decided on the facts'],
          ['Limitation review', 'Where you stand on the six-month position'],
          ['Document checklist', 'Everything needed, obtained while it still exists'],
          ['Police record coordination', 'FIR, site plan, charge sheet and DAR'],
          ['Hospital record collection', 'Treatment, bills and discharge summaries'],
          ['Income and dependency file', 'The documents that drive the award'],
          ['Disability evidence support', 'Certificate and occupational impact'],
          ['Insurance policy review', 'Coverage and likely defences'],
          ['Compensation computation', 'Head-by-head working before any offer is considered'],
          ['Claim petition preparation', 'Drafting and annexures'],
          ['Hearing file preparation', 'Counsel brief and evidence index'],
          ['Settlement evaluation', 'Measuring an offer against the entitlement'],
          ['Award follow-up', 'Deposit, release and disbursement'],
          ['Execution support', 'Where the award is not satisfied'],
          ['Appeal assessment', 'Enhancement or defence of the award']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Estabizz Practice Note">
        <p>{"Compensation in accident claims is largely arithmetic once the inputs are proved — income, age, dependency and disability. The tragedy is how often those inputs are never assembled. Families grieve, months pass, the employer's records are gone and a notional income is applied to a man who filed returns every year. Collect the documents in the first fortnight, and take advice on the limitation position rather than assuming the claim is dead or that there is no hurry."}</p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not claim-specific legal advice. Compensation depends entirely on the facts, the evidence and the view the Tribunal takes. The position on the six-month limitation under Section 166(3) is the subject of pending proceedings before the Supreme Court and the interim protection described here may change; it is stated as at October 2026 and must be confirmed before any decision is taken on whether to file. Statutory amounts, schemes and State rules change. Parts of this guide remain under professional review. Estabizz provides claim assessment, documentation, computation and coordination support; appearance before the Tribunal is through enrolled advocates. Confirm the current position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
