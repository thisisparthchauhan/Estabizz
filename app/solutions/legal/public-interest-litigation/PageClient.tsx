'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'threshold', title: 'The Threshold Is the Whole Battle' },
  { id: 'three-interests', title: 'Publicity, Private and Political Interest' },
  { id: 'framework', title: 'Constitutional Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'forum', title: 'Choosing the Forum' },
  { id: 'ngt', title: 'Environmental Matters and the NGT' },
  { id: 'suitable', title: 'What Makes a Suitable PIL' },
  { id: 'unsuitable', title: 'What Does Not Belong in a PIL' },
  { id: 'representation', title: 'Representation Before Petition' },
  { id: 'evidence', title: 'Building the Evidence Record' },
  { id: 'respondents', title: 'Identifying the Respondents' },
  { id: 'relief', title: 'Relief a Court Can Actually Grant' },
  { id: 'writs', title: 'Writs Used in PIL' },
  { id: 'process', title: 'How the Matter Runs' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'petition', title: 'What the Petition Must Contain' },
  { id: 'types', title: 'Subject Areas We Support' },
  { id: 'common-issues', title: 'Why PILs Are Dismissed' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a public interest litigation?', 'A proceeding in the Supreme Court or a High Court brought for a genuine public cause — the rights of a class, a failure of public duty, or a constitutional violation affecting people who may be unable to approach the court themselves — rather than for a private grievance.'],
  ['Which Article applies?', 'Article 32 for the Supreme Court, where enforcement of a fundamental right is involved. Article 226 for a High Court, which is wider: it covers fundamental rights and "any other purpose", which makes it the practical forum for most governance and public-duty matters.'],
  ['Should I file in the Supreme Court or the High Court?', 'Ordinarily the High Court. The Supreme Court routinely declines to entertain matters directly under Article 32 where the High Court can grant the same relief, and relegates petitioners there — which costs months. File under Article 226 unless the issue genuinely spans States or raises a constitutional question of national importance.'],
  ['Who can file a PIL?', 'Any public-spirited person, NGO, association or community group acting bona fide. The relaxation of locus standi is what makes PIL possible, but it is a relaxation granted to genuine petitioners, not an open door.'],
  ['Will the court look into my motives?', 'Yes, as a matter of course. In State of Uttaranchal v. Balwant Singh Chaufal the Supreme Court directed courts to verify the credentials of the petitioner and the correctness of the contents before entertaining a PIL, precisely to prevent the brand name of public interest litigation being used for other purposes.'],
  ['What is "publicity interest litigation"?', 'One of the categories the courts identified in distinguishing genuine PIL from its abuses — petitions filed for personal publicity rather than to redress a public wrong. Private interest litigation and political interest litigation are the companion categories. Falling into any of them is usually fatal, and may attract costs.'],
  ['Can costs be imposed on me?', 'Yes. Courts impose exemplary costs on frivolous, motivated or private-interest petitions dressed as PIL, and may record adverse observations about the petitioner. This is a real risk and should be assessed honestly before filing.'],
  ['Do I need to approach the authority before filing?', 'It is not a universal legal precondition, but it is close to one in practice. A representation to the competent authority, with proof of delivery and either a refusal or silence, establishes both the failure of public duty and the petitioner’s good faith. Courts frequently direct an unprepared petitioner to go and do exactly that.'],
  ['Are newspaper reports enough evidence?', 'No. They establish that an issue has been reported, not that it exists in the form alleged. Official records, RTI replies, departmental correspondence, inspection reports, photographs with provenance and data about the affected class are what carry a PIL.'],
  ['How useful is the RTI route?', 'Very. An RTI reply is an official admission of what the authority did, did not do, or does not have. A PIL built on the department’s own answers is far harder to resist than one built on assertion, and the groundwork should usually start there.'],
  ['My issue is environmental. Should it go to the High Court or the NGT?', 'This has to be decided before filing. The National Green Tribunal has jurisdiction under Section 14 of its Act over civil cases raising a substantial question relating to the environment arising from the enactments in its Schedule I. Where the matter falls squarely there, a writ petition may be met with the objection that a specialised forum exists. The constitutional courts retain their jurisdiction, but they will ask why the Tribunal is not the right place.'],
  ['Is there a time limit for the NGT route?', 'The NGT Act prescribes limitation for applications and appeals, generally measured in months from the cause of action or the order complained of. This is one reason the forum question has to be settled early — a late realisation can leave neither route comfortably open.'],
  ['Can a PIL ask the court to make a new law?', 'No. Courts enforce existing law, constitutional rights and statutory duties; they do not legislate and they do not take over administration. A prayer asking for a new policy will usually fail, where a prayer asking for an existing one to be implemented may succeed.'],
  ['What is a continuing mandamus?', 'An order in which the court does not dispose of the matter but keeps it pending, directing the authority to act and to report back periodically. It is the mechanism behind most PILs that have achieved lasting change, and it should be asked for expressly where implementation rather than declaration is the real need.'],
  ['Can I ask for a committee or an expert enquiry?', 'Yes, and in technical matters it is often the most realistic relief. A direction to constitute a committee, or to have an existing authority inspect and file a status report, gives the court a factual basis and the petitioner a documented record.'],
  ['Can a PIL be filed by letter?', 'The Supreme Court has historically treated letters in certain categories as petitions, subject to its own guidelines and screening. It is not a route to rely on for a prepared case; a properly constituted petition with evidence is treated quite differently.'],
  ['Can an NGO file?', 'Yes, with its registration documents, a board or governing body authorisation, and a record of work in the field that establishes bona fides. An organisation filing outside its area of work will be asked why.'],
  ['Can a PIL be filed anonymously?', 'Not in the ordinary course. The petitioner’s identity and credentials are central to maintainability. Where there is genuine risk to a person, that is addressed through protective directions rather than anonymity.'],
  ['Must I disclose other litigation?', 'Yes, and failing to do so is one of the quickest ways to lose. Suppression of a pending proceeding on the same subject, or of the petitioner’s own interest in the matter, is treated seriously and taints an otherwise sound petition.'],
  ['What if I have some personal interest in the issue?', 'Disclose it in the petition. A petitioner who lives in the affected locality is not disqualified — that is often why they know about it. A petitioner whose business competes with the respondent is in a different position. Concealment is what causes the damage, not the interest itself.'],
  ['Can a PIL be filed about corruption or misuse of public funds?', 'Public accountability matters can be raised where there is credible documentary material — audit findings, inspection reports, official records. Allegations resting on inference or media reporting are exposed to the objection that the petition is a fishing enquiry.'],
  ['Can interim relief be obtained?', 'Yes, where urgent and irreversible public harm is shown — felling of trees, demolition, an imminent public health risk. The interim prayer must be specific, limited and supported by documents; a broad interim prayer makes the court cautious about the whole petition.'],
  ['What happens after the court passes an order?', 'That is where most PILs actually succeed or fail. Orders require follow-up: compliance affidavits, status reports, and where necessary a contempt petition. A PIL treated as finished when the order is passed often achieves nothing on the ground.'],
  ['How long does a PIL take?', 'A matter seeking a one-time direction may be disposed of in months. A matter requiring supervised implementation can remain on the board for years by design, which is the point of continuing mandamus rather than a defect in it.'],
  ['Can Estabizz argue the PIL?', 'We handle maintainability assessment, public-cause framing, representation drafting, RTI and evidence strategy, respondent mapping, legal research, drafting support, annexures, filing coordination and compliance tracking. Appearance is through enrolled advocates.'],
  ['What is the biggest mistake in PIL?', 'Filing a private grievance in public-interest clothing. Courts identify it quickly, and the result is dismissal, sometimes with costs, and the loss of the chance to raise a genuine aspect of the issue properly later.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Constitutional' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Public Interest Litigation' }]}
      title="Public Interest Litigation"
      readTime="16 min read"
      hideReviewBadge
      focusKeyword="Public Interest Litigation"
      sections={sections}
      ctaTitle="Speak With a Constitutional Law Expert"
      ctaDescription="Test the public-interest foundation honestly, build the official record first, and ask for relief the court can actually grant."
      quickFacts={[
        { label: 'Supreme Court route', value: 'Article 32' },
        { label: 'High Court route', value: 'Article 226' },
        { label: 'Threshold test', value: 'Bona fide public cause' },
        { label: 'Risk', value: 'Dismissal with costs' }
      ]}
      relatedArticles={[
        { title: 'Appeal Before High Court', href: '/solutions/legal/appeal-before-high-court', category: 'Legal', description: 'Grounds, limitation, record and the scope of interference on appeal.' },
        { title: 'General Legal Notice', href: '/solutions/legal/general-legal-notice', category: 'Legal', description: 'Pre-litigation representation, service and proof — the groundwork before court.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="Build the Record Before You Build the Petition"
      finalCtaDescription="Courts can tell within a page whether a PIL rests on official records or on indignation. The RTI replies, the representation and the affected-class data are what decide the threshold."
      heroDescription={<p>A genuine public issue should not fail on maintainability. Most do — because the petitioner&rsquo;s credentials were not established, the authority was never approached, the evidence was press reporting rather than official record, the respondents were wrong, or the relief asked the court to govern rather than to enforce. Estabizz assists public-spirited individuals, NGOs, resident associations, community groups and institutions with public-cause and maintainability assessment, Article 32 and Article 226 forum mapping, pre-filing representations, RTI and evidence strategy, respondent identification, legal research, petition drafting support, affidavit and disclosure checklists, annexure indexing, registry defect support, interim relief planning, counter-affidavit and rejoinder support, and compliance tracking after the order.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a PIL is a case brought for other people — a community, a class, or the public at large — rather than for the person filing it.</p>
        <p>The remedy exists because the ordinary rule of standing excluded exactly the people most in need of a court: prisoners, bonded labourers, children, those living next to an unregulated plant. Relaxing standing let someone else raise their cause. That relaxation is the whole foundation of PIL, and it is also the reason courts police it carefully — because a doctrine that allows a stranger to litigate is also a doctrine that can be borrowed for other purposes.</p>
        <p>So the first conversation about any PIL is not about the merits. It is about whether this petitioner, with this record, on this material, will get past the threshold at all.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Public interest litigation is not a licence or a registration. It is constitutional writ litigation brought for a public cause.</p>
        <p>The routes are Article 32 before the Supreme Court, where a fundamental right is involved, and Article 226 before a High Court, which extends to fundamental rights <em>and any other purpose</em> and is the practical forum for most governance matters. Maintainability turns on a genuine public cause, a bona fide petitioner, credible documentary evidence, correct respondents and relief the court can grant. A petition that fails on any of these is liable to be dismissed, and a motivated one may attract costs.</p>
      </Section>

      <Section id="threshold" title="The Threshold Is the Whole Battle">
        <p>A PIL rarely fails because the underlying problem was not real. It fails at the threshold, on grounds that are almost entirely within the petitioner&rsquo;s control before filing.</p>
        <DataTable headers={['Threshold question', 'What satisfies it', 'What fails it']} rows={[
          ['Is this a public cause?', 'An identified class or community affected, with data', 'One household’s grievance described in general terms'],
          ['Is the petitioner bona fide?', 'A record of work or residence connected to the issue, fully disclosed', 'No connection, or an undisclosed commercial or political interest'],
          ['Is there a public duty?', 'A statutory or constitutional obligation, identified by provision', 'A general complaint that something should be done'],
          ['Has the authority failed?', 'Representation, acknowledgement and either refusal or silence', 'No approach to the authority at all'],
          ['Is there evidence?', 'RTI replies, official records, inspection reports, data, dated photographs', 'Newspaper clippings and assertion'],
          ['Are the respondents right?', 'The department and officer actually charged with the duty', 'The State generally, with no identified authority'],
          ['Is the forum right?', 'Article 226 for a State or local issue; the NGT where it has jurisdiction', 'Article 32 for a matter the High Court can decide'],
          ['Is an alternative remedy available?', 'Addressed in the petition, with reasons why it is inadequate', 'Ignored, and raised by the respondent instead'],
          ['Is the relief grantable?', 'Enforcement of an existing duty, with specificity', 'A direction to frame policy or to administer'],
          ['Has everything been disclosed?', 'Prior litigation, personal interest, parallel proceedings', 'Suppression that the respondent discovers']
        ]} />
      </Section>

      <Section id="three-interests" title="Publicity, Private and Political Interest">
        <div className="warning-box" aria-label="Court scrutiny of the petitioner">
          <p><strong>Courts verify the petitioner before they examine the cause.</strong> In State of Uttaranchal v. Balwant Singh Chaufal the Supreme Court, concerned at the misuse of the jurisdiction, directed that courts should verify the credentials of the petitioner and satisfy themselves about the correctness of the contents of the petition before entertaining a PIL — so that, in the Court&rsquo;s phrase, the attractive brand name of public interest litigation is not used for suspicious products of mischief. The petition itself was characterised as publicity interest litigation.</p>
        </div>
        <DataTable headers={['Category', 'What it looks like', 'How to avoid being read that way']} rows={[
          ['Publicity interest litigation', 'A petition timed to, or accompanied by, a media campaign; relief that generates attention more than remedy', 'Neutral drafting, specific prayers, and restraint about publicity while the matter is pending'],
          ['Private interest litigation', 'A personal or commercial grievance framed as a public cause', 'An identified affected class with data, and full disclosure of any personal interest'],
          ['Political interest litigation', 'Partisan language, timing tied to a political event, a petitioner holding office', 'Legal and factual drafting with no political characterisation'],
          ['Business rivalry', 'A competitor’s regulatory problem raised as a public issue', 'Do not file; the rival’s identity will emerge and the petition will not survive it'],
          ['Vendetta', 'A dispute with an individual or authority recast as systemic failure', 'Do not file; this attracts costs and adverse observations'],
          ['Fishing enquiry', 'Allegations without material, seeking an investigation to find some', 'Build the documentary record first — RTI is the route'],
          ['Genuine PIL', 'Identified class, official record, public duty, failure demonstrated, practical relief', 'This is the only version worth filing']
        ]} />
      </Section>

      <Section id="framework" title="Constitutional Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Constitutional basis', 'Constitution of India'],
          ['Supreme Court route', 'Article 32 — enforcement of fundamental rights'],
          ['High Court route', 'Article 226 — fundamental rights and any other purpose'],
          ['Supervisory jurisdiction', 'Article 227, over courts and tribunals'],
          ['Complete justice', 'Article 142, in the Supreme Court'],
          ['Binding precedent', 'Article 141'],
          ['Guiding case law', 'S.P. Gupta on standing; Balwant Singh Chaufal on verification and abuse'],
          ['Court rules', 'Supreme Court Rules, and the PIL rules of each High Court'],
          ['Supreme Court PIL guidelines', 'Guidelines for entertaining letter petitions as PIL, with defined categories'],
          ['Specialised environmental forum', 'National Green Tribunal Act, 2010'],
          ['Information gathering', 'Right to Information Act, 2005'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Enforcement of orders', 'Contempt of Courts Act, 1971'],
          ['Legal aid', 'Legal Services Authorities Act, 1987'],
          ['Subject law', 'The statute creating the duty — environmental, labour, education, disability, municipal or other']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['Article 14', 'Equality before law and equal protection — arbitrariness in State action'],
          ['Article 19', 'Freedoms, where a public-right dimension arises'],
          ['Article 21', 'Life and personal liberty — health, environment, safety, dignity, livelihood, custody'],
          ['Article 21A', 'Right to education of children'],
          ['Article 32', 'Supreme Court writ jurisdiction for fundamental rights'],
          ['Article 39A', 'Equal justice and free legal aid'],
          ['Article 47', 'Public health and nutrition, as a directive principle'],
          ['Article 48A', 'Protection and improvement of the environment and forests'],
          ['Article 51A(g)', 'Fundamental duty regarding the natural environment'],
          ['Article 226', 'High Court writ jurisdiction, wider than Article 32'],
          ['Article 227', 'Superintendence over courts and tribunals'],
          ['NGT Act, Section 14', 'Tribunal jurisdiction over substantial questions relating to the environment'],
          ['RTI Act, Sections 6 and 7', 'Request for information and the time limits for a reply'],
          ['RTI Act, Sections 19 and 20', 'First appeal, second appeal and penalty for denial'],
          ['Contempt of Courts Act, Section 12', 'Consequence of non-compliance with a court direction'],
          ['BSA Sections 61 to 63', 'Admissibility of RTI replies, official data and digital records']
        ]} />
      </Section>

      <Section id="forum" title="Choosing the Forum">
        <DataTable headers={['Point', 'Article 32 — Supreme Court', 'Article 226 — High Court']} rows={[
          ['Scope', 'Enforcement of fundamental rights only', 'Fundamental rights and any other purpose'],
          ['Breadth', 'Narrower in subject matter', 'Wider — covers legality of administrative action generally'],
          ['Best suited to', 'Issues spanning States, or a constitutional question of national importance', 'Governance failure, local authority inaction, State-level public duty'],
          ['Typical response to a local issue', 'Relegation to the High Court, costing months', 'Entertained and heard on the merits'],
          ['Territorial requirement', 'National reach', 'Cause of action within the Court’s territory'],
          ['Alternative remedy', 'Weighs heavily against entertaining the petition', 'Considered, but Article 226 is discretionary and can be exercised'],
          ['Filing practice', 'Supreme Court Rules, with advocate-on-record filing', 'The High Court’s own PIL rules'],
          ['Practical recommendation', 'Reserve for genuinely national issues', 'The default forum for most PILs']
        ]} />
        <div className="info-box" aria-label="Forum discipline">
          <p><strong>Filing in the Supreme Court because the issue feels important is the commonest forum error.</strong> Article 226 is the wider jurisdiction, not the lesser one — it reaches administrative illegality that Article 32 does not. A petition relegated from the Supreme Court to the High Court has lost months and arrives having already been declined once, which is not the position a petitioner wants to start from.</p>
        </div>
      </Section>

      <Section id="ngt" title="Environmental Matters and the NGT">
        <p>Environmental PIL has a forum question that the constitutional route does not always answer. The National Green Tribunal has jurisdiction under Section 14 of its Act over civil cases raising a substantial question relating to the environment where that question arises out of the implementation of the enactments listed in its Schedule I — which includes the principal pollution, environment protection, forest conservation and biodiversity statutes.</p>
        <DataTable headers={['Situation', 'Forum to assess first', 'Why']} rows={[
          ['Pollution from an industrial unit under a Schedule I enactment', 'NGT', 'Squarely within Section 14, with technical members to assess it'],
          ['Environmental clearance challenged', 'NGT', 'Appellate jurisdiction over clearance decisions'],
          ['Compensation for environmental damage', 'NGT', 'The Tribunal has express power to award relief and compensation'],
          ['Statutory authority failing to act at all', 'High Court or NGT', 'Depends on whether the duty arises under a Schedule I enactment'],
          ['Fundamental rights violation alongside environmental harm', 'High Court', 'Constitutional dimension beyond the Tribunal’s statutory scope'],
          ['Municipal civic failure — drains, waste, sanitation', 'High Court', 'Often outside Schedule I, and governance rather than environmental regulation'],
          ['Tree felling or local ecology, no Schedule I statute engaged', 'High Court', 'Constitutional jurisdiction remains'],
          ['Matter requiring technical adjudication', 'NGT', 'Expert members, which a writ court does not have']
        ]} />
        <p>The constitutional courts retain their jurisdiction and have not been ousted. But filing a writ petition where the Tribunal plainly has jurisdiction invites the objection that a specialised forum exists, and the NGT Act carries its own limitation periods — so a late change of forum can leave a petitioner short of both. Settle the question before drafting.</p>
      </Section>

      <Section id="suitable" title="What Makes a Suitable PIL">
        <DataTable headers={['Situation', 'Why it fits']} rows={[
          ['A statutory duty exists and is not being performed', 'Mandamus is designed for exactly this'],
          ['A class of people is affected and cannot approach the court', 'The original rationale for relaxed standing'],
          ['Custodial or prison conditions', 'Article 21, and a class unable to litigate for itself'],
          ['Systemic failure in public health provision', 'Public duty, with records that can be obtained'],
          ['Unsafe public infrastructure affecting many', 'Identifiable authority, identifiable duty, documented risk'],
          ['Environmental harm affecting a community', 'Subject to the NGT forum question'],
          ['Child rights, bonded labour and trafficking', 'Vulnerable class; statutory machinery exists but is dormant'],
          ['Disability access to public facilities', 'Statutory obligations with measurable compliance'],
          ['Women’s safety as a systemic public-duty failure', 'Where the issue is institutional rather than an individual case'],
          ['Non-implementation of an existing policy or scheme', 'Enforcement, not policy-making'],
          ['Misuse of public funds, with audit or official material', 'Accountability, where documents exist'],
          ['Police or institutional inaction affecting a class', 'Public-law remedy where the pattern is demonstrable']
        ]} />
      </Section>

      <Section id="unsuitable" title="What Does Not Belong in a PIL">
        <DataTable headers={['Matter', 'The correct route']} rows={[
          ['A purely personal dispute', 'The ordinary civil, criminal or family remedy'],
          ['A landlord and tenant dispute', 'Civil court or the rent authority'],
          ['An individual service or promotion matter', 'Service law remedy or the tribunal'],
          ['A pension or gratuity claim', 'The statutory machinery for that claim'],
          ['One student’s admission', 'The education remedy, or a writ in the petitioner’s own name'],
          ['A private property dispute', 'Civil or revenue court'],
          ['A contract dispute with a government body', 'A writ in the petitioner’s own name, or the contractual remedy'],
          ['An individual salary claim', 'The wage authority or civil recovery'],
          ['A matrimonial grievance', 'Family court and the matrimonial remedies'],
          ['Defamation or personal reputation', 'Civil or criminal defamation'],
          ['An individual consumer complaint', 'Consumer commission'],
          ['Business rivalry', 'Not a PIL in any form'],
          ['Early hearing of a pending case', 'Mentioning before the court concerned'],
          ['A vague public grievance with no duty identified', 'Build the record first; a representation may resolve it']
        ]} />
        <p>Where the grievance is genuinely individual, the writ jurisdiction may still be available in the petitioner&rsquo;s own name — the point is that it should be brought as what it is. See <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link> and <Link href="/solutions/legal/complaints-before-consumer-court">Consumer Court Complaints</Link> for the ordinary routes.</p>
      </Section>

      <Section id="representation" title="Representation Before Petition">
        <p>The single most effective thing a prospective petitioner can do is write to the authority first. It frequently resolves the issue, and where it does not, it converts the complaint into a documented failure of public duty.</p>
        <DataTable headers={['Element', 'Why it matters in the eventual petition']} rows={[
          ['Addressed to the officer actually charged with the duty', 'Identifies the right respondent before you need to name one'],
          ['The statutory provision creating the duty, cited', 'Frames the failure as a legal one rather than a complaint'],
          ['Specific facts, dates and location', 'Prevents the reply that the complaint was too vague to act on'],
          ['The affected class identified', 'Establishes the public character from the outset'],
          ['Documents annexed', 'The authority cannot later say it had no material'],
          ['A specific request for action', 'What was asked for becomes what was refused'],
          ['A reasonable time to respond', 'Shows the court the authority had the opportunity'],
          ['Proof of delivery', 'Acknowledgement, dispatch record or portal receipt'],
          ['The reply, or the silence', 'Either way, this is the failure the petition is built on'],
          ['Escalation to the higher authority', 'Demonstrates the remedy was exhausted, not bypassed']
        ]} />
        <p>See <Link href="/solutions/legal/general-legal-notice">General Legal Notice</Link> for how service and proof of service are established.</p>
      </Section>

      <Section id="evidence" title="Building the Evidence Record">
        <DataTable headers={['Evidence', 'Weight', 'How to obtain it']} rows={[
          ['RTI replies', 'High — an official admission', 'Application under Section 6, with appeals where refused'],
          ['Departmental correspondence and file notings', 'High', 'RTI, or the authority’s reply to the representation'],
          ['Inspection and monitoring reports', 'High', 'RTI to the regulator or board'],
          ['Official data and published statistics', 'High', 'Departmental publications and portals'],
          ['Audit reports and accounts', 'High in public-funds matters', 'Published reports and RTI'],
          ['Expert reports', 'High in technical matters', 'Commissioned, with the expert’s credentials disclosed'],
          ['Field survey of the affected class', 'Substantial', 'Structured, with methodology stated'],
          ['Affidavits of affected persons', 'Substantial — direct impact', 'Sworn statements, with consent and protection considered'],
          ['Dated photographs and video', 'Useful with provenance', 'Captured with date, location and the capturing person identified'],
          ['Maps and satellite imagery', 'Useful for location and change over time', 'Public sources, with the date recorded'],
          ['Court and tribunal orders', 'Context', 'Certified copies'],
          ['Newspaper reports', 'Low on their own', 'Use as background, never as the foundation']
        ]} />
        <div className="info-box" aria-label="Why RTI comes first">
          <p><strong>Start with RTI, not with drafting.</strong> A petition that annexes the department&rsquo;s own reply — stating that no inspection was conducted, that no funds were utilised, that no action was taken on the complaint — is answering itself before the respondent has a chance to. A petition that annexes press clippings invites the respondent to produce its own version of the facts and leaves the court choosing between two accounts.</p>
        </div>
      </Section>

      <Section id="respondents" title="Identifying the Respondents">
        <DataTable headers={['Respondent', 'When to include', 'Common error']} rows={[
          ['The department holding the statutory duty', 'Always', 'Naming the State generally instead of the department'],
          ['The specific officer or authority', 'Where a named office holds the power', 'Naming an officer personally without cause'],
          ['The regulator', 'Where a licensing or monitoring duty exists', 'Omitting the regulator and suing only the operator'],
          ['The local body or municipal corporation', 'Civic and local governance issues', 'Suing the State for a municipal function'],
          ['The development or planning authority', 'Construction, layout and zoning', 'Confusing the planning authority with the municipality'],
          ['The pollution control board', 'Environmental matters', 'Omitting the board where it holds the consent power'],
          ['The Union Government', 'Where a central statute or scheme is in issue', 'Including it reflexively in a purely State matter'],
          ['The private entity causing the harm', 'Where relief is sought against it directly', 'Omitting it, so no order can bind it'],
          ['Affected parties who should be heard', 'Where the order would affect their rights', 'Non-joinder, which can defeat the relief']
        ]} />
        <p>Respondent mapping is not clerical. An order can only bind a party before the court, and the commonest reason a successful PIL produces nothing is that the entity that had to act was never joined.</p>
      </Section>

      <Section id="relief" title="Relief a Court Can Actually Grant">
        <DataTable headers={['Prayer', 'Likely reception', 'Better framing']} rows={[
          ['"Direct the State to frame a policy on this"', 'Refused — courts do not legislate', 'Direct implementation of the existing policy or statutory duty'],
          ['"Direct the authority to take appropriate action"', 'Too vague to enforce', 'Direct the specific act: inspect, decide, publish, remove, sanction'],
          ['"Monitor the entire sector"', 'Beyond the court’s institutional role', 'Seek compliance reporting on the identified failure'],
          ['"Order an investigation into everything"', 'Reads as a fishing enquiry', 'Seek enquiry into identified instances supported by material'],
          ['"Grant such other relief as deemed fit"', 'Standard, but cannot carry the petition', 'Include, but after specific prayers'],
          ['Direction to decide a pending representation', 'Commonly granted', 'Ask for a time-bound decision with reasons'],
          ['Direction to perform a specific statutory duty', 'The core mandamus relief', 'Cite the provision and the act required'],
          ['Direction to file a status or action-taken report', 'Commonly granted', 'Specify what the report must address and by when'],
          ['Constitution of an expert committee', 'Granted in technical matters', 'Propose composition and terms of reference'],
          ['Continuing mandamus with periodic reporting', 'Granted where implementation is the issue', 'Ask expressly; do not assume it'],
          ['Interim protection against irreversible harm', 'Granted where urgency is documented', 'Narrow, specific and evidenced'],
          ['Compensation in a public-law rights case', 'Available in appropriate cases', 'Plead the rights violation and the identifiable victims']
        ]} />
      </Section>

      <Section id="writs" title="Writs Used in PIL">
        <DataTable headers={['Writ or direction', 'What it does', 'Typical PIL use']} rows={[
          ['Mandamus', 'Commands performance of a public duty', 'The workhorse of PIL — authority inaction'],
          ['Certiorari', 'Quashes an unlawful order or decision', 'An approval or clearance granted contrary to law'],
          ['Prohibition', 'Restrains an authority acting beyond jurisdiction', 'Proceedings or action without power'],
          ['Habeas corpus', 'Production of a person unlawfully detained', 'Custodial and detention matters'],
          ['Quo warranto', 'Questions the holding of a public office', 'Appointment contrary to eligibility conditions'],
          ['Continuing mandamus', 'Keeps the matter pending with periodic reporting', 'Where implementation needs supervision'],
          ['Interim direction', 'Temporary protection pending hearing', 'Imminent irreversible harm'],
          ['Status report direction', 'Requires an action-taken report', 'Establishes the factual position on record'],
          ['Expert committee direction', 'Technical examination for the court', 'Pollution, safety and engineering questions'],
          ['Compliance and monitoring order', 'Supervises implementation', 'Long-running structural matters']
        ]} />
      </Section>

      <Section id="process" title="How the Matter Runs">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Issue, public impact and urgency identified'],
          ['2', 'Public-interest assessment', 'An honest view on whether this is a PIL at all'],
          ['3', 'Petitioner review', 'Credentials, bona fides and any personal interest'],
          ['4', 'Duty identification', 'The statutory or constitutional obligation, by provision'],
          ['5', 'Forum mapping', 'Article 226, Article 32 or the NGT'],
          ['6', 'Authority mapping', 'Departments, regulators and local bodies that must be joined'],
          ['7', 'Representation', 'Pre-filing representation drafted, served and tracked'],
          ['8', 'RTI strategy', 'Applications, first appeals and the official record'],
          ['9', 'Evidence compilation', 'Records, data, reports, photographs and affidavits, indexed'],
          ['10', 'Legal research', 'Constitutional provisions, statutes and authorities'],
          ['11', 'Relief structuring', 'Specific, enforceable prayers and interim relief'],
          ['12', 'Petition drafting support', 'Facts, grounds, prayers and maintainability note'],
          ['13', 'Affidavit and disclosure', 'Verification, prior litigation and interest disclosure'],
          ['14', 'Annexure indexing', 'Court-ready paper book'],
          ['15', 'Filing coordination', 'Filing through counsel and registry scrutiny'],
          ['16', 'Defect removal', 'Objections answered and refiling'],
          ['17', 'Preliminary hearing', 'Maintainability and urgency addressed through counsel'],
          ['18', 'Counter affidavit review', 'The authority’s version analysed'],
          ['19', 'Rejoinder', 'Response and further material'],
          ['20', 'Compliance tracking', 'Orders monitored and non-compliance escalated']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Petitioner identity and address proof', 'Court record and service'],
          ['Petitioner profile or background note', 'Establishes bona fide public-interest credentials'],
          ['NGO registration and governing documents', 'Where the petitioner is an organisation'],
          ['Board or governing body authorisation', 'Authority to institute the proceeding'],
          ['Public issue note', 'Defines the cause in a page'],
          ['Affected class and area details', 'Demonstrates public impact'],
          ['Representation to the authority', 'The demand that was made'],
          ['Proof of service of the representation', 'That it reached the right office'],
          ['Authority reply, or evidence of silence', 'The failure the petition rests on'],
          ['RTI applications and replies', 'The official record'],
          ['Government circulars, orders and schemes', 'The duty said to have been breached'],
          ['Official reports and inspection records', 'Independent confirmation of the facts'],
          ['Expert report', 'Technical matters'],
          ['Survey or field data', 'Scale of impact'],
          ['Dated photographs and video', 'Condition and location'],
          ['Maps and location references', 'Area identification'],
          ['Affidavits of affected persons', 'Direct impact evidence'],
          ['Prior litigation details', 'Disclosure and maintainability'],
          ['Conflict of interest declaration', 'Bona fides'],
          ['Draft prayers', 'Relief planning before drafting'],
          ['Annexure index', 'Registry compliance']
        ]} />
      </Section>

      <Section id="petition" title="What the Petition Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Correct cause title and forum', 'Parties and jurisdiction'],
          ['Petitioner credentials', 'The first thing the court assesses'],
          ['Statement of public interest', 'Why this affects a class rather than a person'],
          ['Declaration of no personal gain', 'Addresses the threshold objection in advance'],
          ['Disclosure of any interest held', 'Concealment damages more than the interest itself'],
          ['The affected class and area', 'Public character, with data'],
          ['The public duty, by provision', 'Converts a complaint into a legal claim'],
          ['Facts and chronology', 'A narrative the court can follow'],
          ['Representation history', 'That the authority was approached and failed'],
          ['Grounds', 'Constitutional and statutory basis'],
          ['Maintainability note', 'Forum, alternative remedy and standing addressed'],
          ['Interim prayer', 'Specific, narrow and evidenced'],
          ['Final prayers', 'Enforceable directions, not aspirations'],
          ['Request for continuing mandamus', 'Where implementation requires supervision'],
          ['Disclosure of prior and parallel litigation', 'Suppression is fatal'],
          ['Affidavit and verification', 'Facts verified with care'],
          ['Court fee, vakalatnama and index', 'Registry compliance'],
          ['Annexures', 'The evidence record, organised']
        ]} />
      </Section>

      <Section id="types" title="Subject Areas We Support">
        <DataTable headers={['Area', 'Typical issues']} rows={[
          ['Environment and pollution', 'Air, water, waste, ecology — with the NGT forum assessed first'],
          ['Public health', 'Hospitals, sanitation, medicine supply, epidemic response'],
          ['Civic infrastructure', 'Roads, drains, footpaths, public buildings and safety'],
          ['Urban governance', 'Municipal inaction and public-service failure'],
          ['Labour rights', 'Bonded labour, minimum wages and worker exploitation'],
          ['Child rights', 'Education access, child labour, trafficking and neglected children'],
          ['Disability rights', 'Accessibility and implementation of statutory obligations'],
          ['Women’s safety', 'Systemic protection and public-duty failure'],
          ['Prisoner rights', 'Custodial conditions and detention'],
          ['Vulnerable groups', 'Exclusion and failure of protective machinery'],
          ['Heritage protection', 'Monuments and cultural property'],
          ['Public funds and accountability', 'Where audit and official material exists'],
          ['Policy implementation', 'Enforcement of an existing scheme or statutory duty'],
          ['Food safety', 'Systemic adulteration and enforcement failure'],
          ['Public transport', 'Safety, accessibility and service obligations']
        ]} />
      </Section>

      <Section id="common-issues" title="Why PILs Are Dismissed">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['A private grievance in public-interest clothing', 'Dismissal, sometimes with costs', 'Honest assessment before anything is drafted'],
          ['Petitioner credentials not established', 'Threshold objection the petition cannot answer', 'Petitioner profile and record of connection to the issue'],
          ['Undisclosed personal or commercial interest', 'Adverse observations and costs', 'Full disclosure in the petition itself'],
          ['Authority never approached', 'The court directs the petitioner to do that first', 'Representation served and tracked before filing'],
          ['Evidence is press reporting', 'Court declines to act on assertion', 'RTI and official record built first'],
          ['Wrong forum', 'Relegation or return of the petition', 'Article 226, Article 32 or NGT assessed before drafting'],
          ['Environmental matter filed as a writ', 'Objection that the NGT has jurisdiction', 'Section 14 analysis, and limitation checked'],
          ['Wrong or incomplete respondents', 'The order cannot bind the entity that must act', 'Department, regulator and local body mapping'],
          ['Relief asks the court to govern', 'Refused as beyond the judicial role', 'Prayers confined to enforcing existing duties'],
          ['Prayers too vague to enforce', 'An order nobody can be held to', 'Specific acts with timelines'],
          ['Political or emotive drafting', 'Motive questioned', 'Neutral legal and factual drafting'],
          ['Prior litigation suppressed', 'Petition fails on suppression alone', 'Disclosure checklist before verification'],
          ['Technical case with no expert material', 'Factual foundation absent', 'Expert report commissioned before filing'],
          ['No compliance follow-up after the order', 'Order achieves nothing on the ground', 'Compliance tracking and contempt assessment']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Maintainability assessment', 'An honest view on whether this survives the threshold'],
          ['Public-cause framing', 'Affected class, public duty and the nature of the failure'],
          ['Petitioner review', 'Credentials, bona fides and interest disclosure'],
          ['Forum mapping', 'Article 226, Article 32 or the NGT, with limitation checked'],
          ['Representation drafting', 'Pre-filing demand to the correct authority, with proof of service'],
          ['RTI strategy', 'Applications, first and second appeals, and the official record'],
          ['Evidence compilation', 'Records, data, expert material, photographs and affidavits, indexed'],
          ['Respondent mapping', 'Departments, regulators, local bodies and private parties'],
          ['Legal research', 'Constitutional provisions, statutes and authorities'],
          ['Relief structuring', 'Enforceable prayers and a narrow interim prayer'],
          ['Petition drafting support', 'Facts, grounds, maintainability note and prayers'],
          ['Affidavit and disclosure checklist', 'Verification, prior litigation and interest'],
          ['Annexure indexing', 'Court-ready paper book'],
          ['Registry defect support', 'Objections answered and refiling'],
          ['Counter affidavit analysis', 'The authority’s version assessed'],
          ['Rejoinder support', 'Response and further material'],
          ['Compliance tracking', 'Status reports, implementation and contempt assessment'],
          ['Advocate coordination', 'Filing, listing and hearing through counsel'],
          ['Ticket-based tracking', 'Representation, evidence, drafting, filing, listing, orders and compliance']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A PIL is assessed at the threshold, and almost everything that decides it is within the petitioner's control before filing. Courts verify credentials now as a matter of course, so the petitioner's record and disclosure matter as much as the cause. Build the official file through representation and RTI, join the authority that actually holds the duty, and ask for something a court can order and enforce. Indignation is not evidence, and a direction nobody can comply with is not relief.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Maintainability, the appropriate forum, the availability of relief and the risk of costs depend entirely on the issue, the petitioner, the evidence and the view the court takes; writ jurisdiction is discretionary and no outcome can be assured. Court rules on PIL filing differ between the Supreme Court and each High Court and should be checked for the forum concerned, and parts of this guide remain under professional review. Estabizz provides maintainability assessment, representation and RTI strategy, evidence compilation, legal research, drafting support, annexure indexing, filing coordination and compliance tracking; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
