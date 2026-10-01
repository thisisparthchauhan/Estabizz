'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'ingredients', title: 'What Has to Be Established' },
  { id: 'section-356', title: 'BNS Section 356' },
  { id: 'classification', title: 'Classification and Procedure' },
  { id: 'limitation', title: 'Two Clocks, Two Deadlines' },
  { id: 'exceptions', title: 'The Statutory Exceptions' },
  { id: 'civil-criminal', title: 'Civil or Criminal' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'types', title: 'Matters We Handle' },
  { id: 'online', title: 'Online Defamation' },
  { id: 'corporate', title: 'Corporate and Professional Reputation' },
  { id: 'when', title: 'When to Act' },
  { id: 'remedies', title: 'Remedies Available' },
  { id: 'evidence', title: 'Evidence' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'defence', title: 'Defending a Defamation Claim' },
  { id: 'common-issues', title: 'Why Defamation Cases Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is defamation?', 'Making or publishing an imputation about a person, company or association, by words, signs or visible representations, intending or knowing or having reason to believe that it will harm their reputation.'],
  ['Which provision applies now?', 'Criminal defamation is BNS Section 356. The procedure for prosecution is in BNSS Section 222. Civil defamation is not codified in a single statute and rests on tort principles, with the suit governed by the Code of Civil Procedure.'],
  ['What is the punishment?', 'Simple imprisonment up to two years, or fine, or both, or community service. Community service is new — it did not exist as a sentencing option under the old Penal Code.'],
  ['Is criminal defamation still constitutional?', 'Yes. The Supreme Court upheld the constitutionality of criminal defamation in Subramanian Swamy v. Union of India (2016), balancing free speech under Article 19(1)(a) against reputation as part of Article 21.'],
  ['Is it cognizable?', 'No. Defamation is non-cognizable and bailable. The police do not register an FIR and investigate on their own; the matter proceeds on a complaint to the court by the aggrieved person.'],
  ['Which court hears it?', 'Generally a Magistrate, on a complaint by the aggrieved person. The Court of Session route applies in the specified cases under BNSS Section 222 where the Public Prosecutor files in respect of the President, Vice-President, a Governor, a Minister or a public servant in respect of official conduct.'],
  ['How long do I have to act?', 'Two different clocks run. A civil suit for compensation must generally be filed within one year — Article 75 of the Limitation Act for libel, from publication, and Article 76 for slander. For criminal defamation, the limitation for taking cognizance is three years under BNSS Section 514. The civil claim dies first, and by a wide margin.'],
  ['So what happens if I wait eighteen months?', 'You will very likely have lost the damages claim while the criminal complaint remains available. That is a poor position, because compensation is usually what the client actually wanted.'],
  ['Can a company sue for defamation?', 'Yes. The explanations to Section 356 recognise that an imputation may concern a company, an association or a collection of persons. A company can also sue civilly for damage to goodwill.'],
  ['Is truth a complete defence?', 'In a civil claim, truth (justification) is generally a complete defence. In criminal defamation it is not, on its own — the first exception requires that the imputation be true **and** that its publication be for the public good. That difference catches people out constantly.'],
  ['Is an opinion defamatory?', 'Honest opinion on a matter of public interest, expressed in good faith, may fall within the exceptions. A false statement of fact dressed up as an opinion generally does not.'],
  ['Is a negative Google review defamation?', 'Not automatically. Genuine criticism of a service is ordinarily protected. A fabricated factual allegation — that you defrauded someone, that a product is unsafe — is a different matter and may well be actionable.'],
  ['Can social media posts be defamatory?', 'Yes. A post, reel, comment, tweet, video or WhatsApp message can be defamatory where it satisfies the ingredients. The medium changes the evidence, not the law.'],
  ['What about memes and morphed images?', 'Defamation can be by visible representation, so images, edited photographs, memes and manipulated video are all capable of being defamatory.'],
  ['What if the statement was only sent to me?', 'Then there is generally no publication. Communication to at least one third party is essential — a statement made only to the person it concerns does not lower them in anyone else’s estimation.'],
  ['Does the statement have to name me?', 'No, but it must be reasonably identifiable as referring to you. If nobody could tell it was about you, the claim fails on identification.'],
  ['Can I claim compensation?', 'Yes, through a civil suit for damages, where reputational, business or professional loss can be shown. Remember the one-year limitation.'],
  ['Can I stop the publication continuing?', 'An injunction can be sought to restrain further publication, and a mandatory injunction to require removal. Courts are cautious about restraining speech before trial, so the application needs to be properly built.'],
  ['Can criminal and civil action run together?', 'They can, depending on the facts, but it should be a deliberate strategy rather than a reflex. Running both raises cost and can complicate settlement.'],
  ['Is defamation compoundable?', 'Yes. Defamation is compoundable by the person defamed, with the permission of the court where required. Many matters resolve through apology, retraction and withdrawal.'],
  ['Can family members file the complaint?', 'Generally the aggrieved person complains. In specified circumstances another person may complain with the court’s leave, where the aggrieved person cannot do so for legally recognised reasons.'],
  ['What if the post has been deleted?', 'Deletion does not undo publication. If the content was preserved properly — screenshots with URLs and timestamps, archived pages, witnesses — the case can still be built. If it was not, the difficulty is evidential rather than legal.'],
  ['Can anonymous defamation be pursued?', 'Yes, though it is harder. Preserve the profile, the URLs and the content, pursue the platform grievance route, and take advice on identification. See our page on Cyber Crime Complaint where impersonation or a fake profile is involved.'],
  ['What is the biggest mistake?', 'Responding publicly and emotionally. It amplifies the original statement, can create counter-defamation exposure, and frequently produces a record that the other side later relies on.'],
  ['Can Estabizz appear in court?', 'We handle assessment, evidence review, notice and complaint drafting, civil remedy coordination, defence replies and advocate briefing. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Reputation' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Defamation' }]}
      title="Defamation"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Defamation"
      sections={sections}
      ctaTitle="Speak With a Defamation Legal Expert"
      ctaDescription="Assess whether the statement is legally actionable, preserve the evidence and choose between the civil and criminal routes before the clock runs down."
      quickFacts={[
        { label: 'Criminal provision', value: 'BNS Section 356' },
        { label: 'Civil limitation', value: '1 year' },
        { label: 'Criminal limitation', value: '3 years' },
        { label: 'Classification', value: 'Non-cognizable, bailable' }
      ]}
      relatedArticles={[
        { title: 'Defamation Notice', href: '/solutions/legal/defamation-notice', category: 'Legal', description: 'The pre-litigation notice — takedown, apology, retraction and compensation demands, and how to reply to one.' },
        { title: 'Cyber Crime Complaint', href: '/solutions/legal/cyber-crime-complaint', category: 'Legal', description: 'Online fraud, impersonation, fake profiles, digital evidence preservation and platform escalation.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="Assess It Before You React"
      finalCtaDescription="Not every damaging statement is defamation, and not every defamation is worth litigating. The valuable half hour is the one spent deciding which of those you are dealing with — before a public reply makes it worse."
      heroDescription={<p>A false statement can damage a reputation faster than any remedy can repair it, and reputation is a legal and commercial asset in its own right. But reacting badly makes things worse: an aggressive notice on weak facts invites a counter-claim, a public reply amplifies the original statement, and an emotional complaint that does not establish the ingredients gets dismissed. Estabizz assists individuals, professionals, founders, directors, companies and public-facing businesses with assessing whether a statement is legally actionable, preserving evidence, choosing between the civil and criminal routes, drafting notices and complaints, coordinating damages and injunction claims, handling online content and platform escalation, and defending against allegations — under the current framework of the BNS, BNSS and BSA.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> defamation is a statement that lowers a person in the estimation of others — spoken, written, printed, posted, broadcast or shown through images or video.</p>
        <p>It can concern an individual, a company or an association. But not every negative statement is defamation. Truth published for the public good, honest opinion in good faith, fair comment, a lawful complaint to an authority and a number of other recognised exceptions all sit between a damaging statement and an actionable one.</p>
        <p>This page covers the cause of action and the remedies. For the pre-litigation notice — the step that resolves a large share of these matters without any court at all — see <Link href="/solutions/legal/defamation-notice">Defamation Notice</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Defamation is not a licence. It is a legal wrong, actionable civilly for damages and an injunction, and criminally under BNS Section 356.</p>
        <p>Whether to act at all depends on the facts. Where a statement has genuinely harmed reputation, goodwill or professional credibility, acting early matters — both because evidence disappears and because the civil limitation period is short.</p>
      </Section>

      <Section id="ingredients" title="What Has to Be Established">
        <DataTable headers={['Element', 'What it requires']} rows={[
          ['A statement or imputation', 'Words, spoken or written, or signs or visible representations'],
          ['Concerning the claimant', 'Reasonably identifiable as referring to them, whether or not named'],
          ['Publication', 'Communicated to at least one third party — not just to the claimant'],
          ['Defamatory meaning', 'It lowers the claimant in the estimation of right-thinking people'],
          ['Falsity', 'Central to a civil claim; in criminal defamation it operates through the exceptions'],
          ['Intention, knowledge or reason to believe', 'That the imputation would harm reputation'],
          ['Harm', 'Actual or presumed damage to reputation, and loss where damages are claimed'],
          ['No applicable exception', 'None of the statutory exceptions protects the statement']
        ]} />
        <p>Publication and identification are the two that quietly defeat claims. A furious message sent only to the person it concerns is not published, and a statement so vague that nobody could tell who it was about fails on identification however offensive it felt.</p>
      </Section>

      <Section id="section-356" title="BNS Section 356">
        <p>Section 356 of the Bharatiya Nyaya Sanhita, 2023 defines defamation and provides the punishment. Whoever defames another is punishable with simple imprisonment which may extend to two years, or with fine, or with both, <strong>or with community service</strong>. Separate sub-sections cover printing or engraving defamatory matter and the sale of such material.</p>
        <div className="info-box" aria-label="Change from the previous law">
          <p><strong>Community service is a genuine change.</strong> It did not exist as a sentencing option under the old Penal Code and appears in Indian penal law for the first time under the BNS, with defamation among the offences it covers. In practice it gives a court a proportionate disposal for a matter that does not merit imprisonment, which is worth factoring into any realistic assessment of what a criminal complaint will actually achieve.</p>
        </div>
        <p>The explanations to the section confirm that an imputation may concern a company, an association or a collection of persons, that it may be made ironically or in the alternative, and when reputation is regarded as harmed.</p>
      </Section>

      <Section id="classification" title="Classification and Procedure">
        <DataTable headers={['Attribute', 'Position']} rows={[
          ['Cognizability', 'Non-cognizable'],
          ['Bail', 'Bailable'],
          ['Compoundable', 'Yes, by the person defamed, with the permission of the court where required'],
          ['Court', 'Generally a Magistrate on the aggrieved person’s complaint; Court of Session in the specified BNSS Section 222 cases'],
          ['Who complains', 'Generally the aggrieved person, or another with the court’s leave in specified circumstances'],
          ['Punishment', 'Simple imprisonment up to two years, or fine, or both, or community service']
        ]} />
        <div className="warning-box" aria-label="Procedural note">
          <p><strong>There is no FIR for defamation.</strong> It is non-cognizable, so the police will not register and investigate it as they would a cognizable offence. The route is a complaint to the court under BNSS Section 222, with the complainant examined and process issued if a case is made out. Clients who spend weeks pressing a police station for an FIR are spending time they do not have.</p>
        </div>
        <p>The Court of Session route under Section 222 is the exception, not the norm. It applies where the Public Prosecutor files in respect of the President, the Vice-President, a Governor, a Minister or a public servant in respect of conduct in the discharge of public functions.</p>
      </Section>

      <Section id="limitation" title="Two Clocks, Two Deadlines">
        <div className="warning-box" aria-label="Limitation warning">
          <p><strong>This is the single most commonly missed point in defamation practice, and it costs clients their best remedy.</strong> The civil and criminal routes run on completely different limitation periods. A civil suit for compensation must generally be brought within <strong>one year</strong> — Article 75 of the Limitation Act, 1963 for libel, running from publication, and Article 76 for slander. Criminal defamation has a <strong>three-year</strong> limitation for taking cognizance under BNSS Section 514, because the offence is punishable with imprisonment exceeding one year but not exceeding three.</p>
        </div>
        <DataTable headers={['Route', 'Limitation', 'Runs from']} rows={[
          ['Civil suit for libel', 'One year — Limitation Act, Article 75', 'The date the libel is published'],
          ['Civil suit for slander', 'One year — Limitation Act, Article 76', 'When the words are spoken, or when special damage occurs where required'],
          ['Criminal complaint', 'Three years — BNSS Section 514', 'Computed by reference to the date of the complaint under BNSS Section 223']
        ]} />
        <p>The practical consequence is straightforward and unforgiving. A client who spends a year exchanging correspondence and then decides to sue for damages will usually find the damages claim gone while the criminal complaint survives — having lost the remedy that was actually worth having. Decide the route early, and if compensation matters, treat the one-year date as the real deadline.</p>
      </Section>

      <Section id="exceptions" title="The Statutory Exceptions">
        <p>Section 356 carries a set of exceptions, and any assessment that skips them is incomplete. They are also the first thing a competent opponent will raise.</p>
        <DataTable headers={['Exception', 'Broad effect']} rows={[
          ['Truth for the public good', 'A true imputation, published for the public good'],
          ['Public conduct of public servants', 'Good-faith opinion on a public servant’s conduct in discharging public functions'],
          ['Conduct of any person touching a public question', 'Good-faith opinion on conduct relating to a public question'],
          ['Reports of court proceedings', 'Substantially true reports of proceedings'],
          ['Merits of a decided case', 'Good-faith comment on the merits of a case, or on the conduct of participants'],
          ['Merits of a public performance', 'Good-faith comment on a performance submitted to public judgment'],
          ['Censure by one in authority', 'Good-faith censure by a person with lawful authority over another'],
          ['Accusation to lawful authority', 'Good-faith accusation made to a person with lawful authority over the accused'],
          ['Protection of interests', 'Imputation made in good faith to protect one’s own or another’s interest, or the public good'],
          ['Caution for another’s good', 'Good-faith caution conveyed for the good of the person or the public']
        ]} />
        <div className="info-box" aria-label="Truth as a defence">
          <p><strong>Truth alone is not a complete answer in criminal defamation.</strong> The first exception requires the imputation to be true <em>and</em> its publication to be for the public good — two limbs, both of which must be satisfied. In a civil claim, by contrast, justification (truth) is generally a complete defence on its own. Advisers who carry the civil rule across to the criminal side get this wrong regularly, in both directions.</p>
        </div>
      </Section>

      <Section id="civil-criminal" title="Civil or Criminal">
        <DataTable headers={['Point', 'Civil defamation', 'Criminal defamation']} rows={[
          ['Purpose', 'Compensation and restraint', 'Punishment'],
          ['Basis', 'Tort principles', 'BNS Section 356'],
          ['Forum', 'Civil court, or High Court depending on value', 'Magistrate, or Court of Session in specified cases'],
          ['Relief', 'Damages, injunction, mandatory removal', 'Sentence, fine or community service'],
          ['Truth', 'Generally a complete defence', 'Must be coupled with public good'],
          ['Limitation', 'One year', 'Three years'],
          ['Standard of proof', 'Balance of probabilities', 'Beyond reasonable doubt'],
          ['Settlement', 'Freely settled', 'Compoundable by the person defamed'],
          ['Best suited to', 'Recovering loss and stopping publication', 'Serious, deliberate false imputation']
        ]} />
        <p>For most commercial clients the civil route delivers what they actually want — removal, correction and money — while the criminal route delivers pressure. Choosing between them is a strategic decision, and the shorter civil clock should weigh heavily in it.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Criminal offence', 'Bharatiya Nyaya Sanhita, 2023, Section 356'],
          ['Criminal procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023, Section 222 and the complaint provisions'],
          ['Criminal limitation', 'BNSS Section 514'],
          ['Civil liability', 'Tort principles, as developed by the courts'],
          ['Civil procedure', 'Code of Civil Procedure, 1908'],
          ['Injunctions', 'Specific Relief Act, 1963 and CPC Order XXXIX'],
          ['Civil limitation', 'Limitation Act, 1963, Articles 75 and 76'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023, including Sections 61 to 63 for electronic records'],
          ['Online content', 'IT Act and the IT Rules, 2021 grievance and takedown framework'],
          ['Constitutional position', 'Criminal defamation upheld in Subramanian Swamy v. Union of India (2016)'],
          ['Commencement of the new codes', 'BNS, BNSS and BSA in force from 1 July 2024']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['BNS Section 356(1)', 'Defines defamation through words, signs, visible representations and publication'],
          ['BNS Section 356 explanations', 'Companies and associations, ironic imputations, and when reputation is harmed'],
          ['BNS Section 356 exceptions', 'Truth for public good, good-faith opinion, court reports, lawful complaint and related protections'],
          ['BNS Section 356(2)', 'Punishment — simple imprisonment up to two years, fine, both, or community service'],
          ['BNS Sections 356(3) and 356(4)', 'Printing or engraving defamatory matter, and sale of such material'],
          ['BNSS Section 222', 'Special procedure for prosecution for defamation'],
          ['BNSS Section 223', 'Examination of the complainant in a complaint case'],
          ['BNSS Sections 225 and 227', 'Postponement of process pending inquiry, and issue of process'],
          ['BNSS Section 514', 'Three-year limitation for taking cognizance'],
          ['Limitation Act, Articles 75 and 76', 'One-year limitation for civil libel and slander claims'],
          ['CPC Order XXXIX Rules 1 and 2', 'Temporary injunction to restrain further publication'],
          ['Specific Relief Act, Sections 38 and 39', 'Permanent and mandatory injunctions, including removal of content'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic and digital records']
        ]} />
      </Section>

      <Section id="types" title="Matters We Handle">
        <DataTable headers={['Type', 'Typical example']} rows={[
          ['Online defamation', 'Social media post, video, blog or online article'],
          ['Review defamation', 'Fabricated or malicious business review'],
          ['Corporate defamation', 'False statement damaging brand or goodwill'],
          ['Professional defamation', 'Allegations against a doctor, CA, CS, advocate or consultant'],
          ['Employment defamation', 'False internal circular or malicious workplace allegation'],
          ['Competitor defamation', 'A rival spreading false claims to customers or the market'],
          ['Media defamation', 'Newspaper, digital media or broadcast content'],
          ['Matrimonial defamation', 'Public allegations arising from a family dispute'],
          ['Anonymous and impersonation cases', 'Fake profiles and unattributed content'],
          ['Defence', 'Replying to a notice, complaint or civil claim brought against the client']
        ]} />
      </Section>

      <Section id="online" title="Online Defamation">
        <p>Most defamation work is now online work, which changes the practical problem in two ways: the content spreads faster than any remedy, and the evidence can vanish the moment the other side thinks better of it.</p>
        <DataTable headers={['Platform or format', 'What to capture immediately']} rows={[
          ['Social media post', 'Full post, URL, profile handle, timestamp and visible engagement'],
          ['Video content', 'Video file, link, channel details, title and comments'],
          ['Business review', 'Review text, reviewer profile, date and the business listing'],
          ['Messaging and groups', 'Exported chat, sender number and group membership'],
          ['Blog or news article', 'Saved page, author, publisher and publication date'],
          ['Fake profile', 'Profile URL, images, posts and follower context'],
          ['Morphed or synthetic media', 'The original file and any available technical detail'],
          ['Mass forwarding', 'Evidence of the spread, not just the original post']
        ]} />
        <p>Alongside the legal route, the platform grievance mechanism under the IT Rules, 2021 is often the fastest path to removal — the grievance officer must acknowledge a complaint within 24 hours and dispose of it within 15 days, with a further appeal to the Grievance Appellate Committee within 30 days. Capture the evidence before requesting takedown, because a successful takedown removes your proof along with the post.</p>
      </Section>

      <Section id="corporate" title="Corporate and Professional Reputation">
        <p>For a business, the claim is rarely about hurt feelings; it is about a measurable commercial effect. That means the evidence of loss has to be gathered as deliberately as the evidence of publication.</p>
        <DataTable headers={['Harm', 'Evidence to preserve']} rows={[
          ['Lost customer', 'The cancellation message or email giving the reason'],
          ['Vendor or partner withdrawal', 'Termination or suspension correspondence'],
          ['Investor concern', 'Diligence queries referencing the statement'],
          ['Employee attrition or concern', 'Internal escalations and HR records'],
          ['False compliance allegation', 'Licence and regulatory records disproving it'],
          ['False fraud allegation', 'Financial and audit records'],
          ['False product or safety claim', 'Testing, certification and quality records'],
          ['Coordinated campaign', 'The full post, comment and account trail showing the pattern']
        ]} />
        <p>A corporate complaint also needs authority. Board or management authorisation to act on the company&rsquo;s behalf should be in place before a notice goes out, not produced afterwards when it is challenged.</p>
      </Section>

      <Section id="when" title="When to Act">
        <DataTable headers={['Situation', 'Why it matters now']} rows={[
          ['A false statement is circulating publicly', 'Harm compounds with every share'],
          ['Content is online', 'Screenshots, URLs and timestamps must be captured before deletion'],
          ['Customers or clients are reacting', 'Commercial loss needs contemporaneous documentation'],
          ['A professional reputation is targeted', 'Career, licensing and referral consequences follow quickly'],
          ['You are accused of a crime publicly', 'A firm, documented response may be necessary'],
          ['Content is going viral', 'Urgent takedown and injunction strategy'],
          ['Nearly a year has passed', 'The civil damages claim is about to be lost'],
          ['You have received a notice', 'A measured reply must be prepared before anything is conceded']
        ]} />
      </Section>

      <Section id="remedies" title="Remedies Available">
        <DataTable headers={['Remedy', 'What it achieves']} rows={[
          ['Legal notice', 'Demands withdrawal, apology, correction, takedown and compensation'],
          ['Platform grievance', 'Removal through the intermediary’s own mechanism'],
          ['Civil suit for damages', 'Monetary compensation for reputational and commercial harm'],
          ['Temporary injunction', 'Restrains further publication while the suit is pending'],
          ['Mandatory injunction', 'Requires removal or correction of content'],
          ['Criminal complaint', 'Prosecution under BNS Section 356'],
          ['Apology and retraction', 'Often the remedy that actually repairs reputation'],
          ['Settlement', 'Removal, apology, undertaking and compensation, documented']
        ]} />
        <p>An apology published where the original statement appeared is frequently worth more commercially than damages awarded years later. It is worth being honest with yourself about which outcome you are pursuing.</p>
      </Section>

      <Section id="evidence" title="Evidence">
        <p>Defamation is proved through the exact words, the fact of publication, identification and harm. Each has its own evidential requirements, and electronic material is governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023.</p>
        <DataTable headers={['To prove', 'What is needed']} rows={[
          ['The exact statement', 'The complete content, not a paraphrase or a cropped fragment'],
          ['Publication', 'Evidence it reached third parties — recipients, audience, engagement, witnesses'],
          ['Identification', 'Material showing readers would understand it to refer to the claimant'],
          ['Falsity', 'Records establishing the true position'],
          ['Attribution', 'Who authored, posted or circulated it'],
          ['Harm', 'Customer, employment, financial or professional consequences'],
          ['Timing', 'Publication date, which starts the limitation clock'],
          ['Continuity', 'Preserved originals rather than reconstructions']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The exact statement', 'Identifies the imputation relied on'],
          ['Date and time of publication', 'Chronology and limitation'],
          ['Medium of publication', 'Platform, message, article, broadcast or speech'],
          ['Screenshots, recordings and URLs', 'Evidence preservation'],
          ['Publisher and author details', 'Identifying the proposed defendant'],
          ['Audience or recipient details', 'Proof of publication to third parties'],
          ['Proof of harm', 'Business loss, client queries, professional consequences'],
          ['Prior communications', 'Background, motive and any earlier demand'],
          ['Identity proof', 'Filing and verification'],
          ['Board authorisation, for a company', 'Authority to act on the company’s behalf'],
          ['Witness details', 'Supporting publication and impact'],
          ['Any notice already exchanged', 'Continuity of strategy']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Facts, urgency and objective'],
          ['2', 'Statement analysis', 'Whether the imputation is legally defamatory'],
          ['3', 'Exception screening', 'Truth, good faith, public good and fair comment risk'],
          ['4', 'Evidence preservation', 'Content, URLs, timestamps, witnesses and harm records'],
          ['5', 'Limitation check', 'Where the one-year and three-year clocks stand'],
          ['6', 'Route selection', 'Notice, civil suit, criminal complaint, takedown or a combination'],
          ['7', 'Drafting', 'Notice, plaint, complaint, reply or affidavit'],
          ['8', 'Platform escalation', 'Grievance and takedown where content is online'],
          ['9', 'Filing and advocate coordination', 'Court filing and hearing support'],
          ['10', 'Tracking', 'Filing, listing, notices and next steps'],
          ['11', 'Resolution', 'Apology, retraction, damages, settlement or prosecution']
        ]} />
      </Section>

      <Section id="defence" title="Defending a Defamation Claim">
        <p>Defamation is also used as a weapon — to silence a legitimate complaint, to pressure a former employee, or to escalate a commercial dispute. A defence should be built on the law rather than on indignation.</p>
        <DataTable headers={['Defence', 'What supports it']} rows={[
          ['Justification', 'Evidence that the statement is true; add public good for criminal matters'],
          ['Fair comment or honest opinion', 'The factual basis, and that it was opinion on a matter of public interest'],
          ['Good faith', 'Care taken, sources relied on and absence of malice'],
          ['Privileged occasion', 'Statements in judicial or official proceedings'],
          ['Lawful complaint to authority', 'That it was made in good faith to a person with lawful authority'],
          ['No publication', 'The statement went only to the claimant'],
          ['No identification', 'Nobody could reasonably understand it to refer to the claimant'],
          ['Not defamatory in meaning', 'The words do not bear the meaning alleged'],
          ['Limitation', 'The civil claim is out of time'],
          ['No proof of harm', 'Damages are claimed without evidence of loss']
        ]} />
        <p>Reply carefully. A response written in anger tends to repeat the allegation, add new ones and hand the other side a fresh cause of action.</p>
      </Section>

      <Section id="common-issues" title="Why Defamation Cases Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['The statement is offensive but not defamatory', 'The claim fails on the ingredients', 'Legal screening under Section 356 before acting'],
          ['No proof of publication', 'The central element is unproved', 'Recipient, audience and witness evidence planning'],
          ['Content deleted before capture', 'The evidence is gone', 'Immediate preservation and archiving'],
          ['Only cropped screenshots', 'Authenticity and context are contested', 'Complete records with URLs and timestamps'],
          ['Exceptions not screened', 'The defence succeeds on truth or good faith', 'Exception risk assessment at the outset'],
          ['Civil limitation missed', 'The damages claim is lost', 'Limitation check at the first consultation'],
          ['Wrong person named', 'Maintainability problems', 'Author, publisher and circulator identification'],
          ['Aggressive notice on weak facts', 'Counter-defamation exposure', 'Measured, evidence-led drafting'],
          ['Company acting without authority', 'The action is challenged at the threshold', 'Board authorisation documented first'],
          ['Public emotional response', 'The statement is amplified and the record worsened', 'Controlled communication strategy']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Initial legal assessment', 'Statement, publisher, medium, audience and harm reviewed'],
          ['Ingredient and exception analysis', 'Whether the facts support a claim, and what defence is likely'],
          ['Limitation review', 'Where both clocks stand and which route remains open'],
          ['Evidence review and preservation', 'Screenshots, URLs, recordings, messages and harm records'],
          ['Legal notice drafting', 'Firm, precise and counter-claim aware'],
          ['Criminal complaint support', 'Complaint, chronology, witness list and annexures'],
          ['Civil suit coordination', 'Damages, injunction and removal strategy'],
          ['Online takedown strategy', 'Platform grievance and escalation'],
          ['Defence and reply drafting', 'Responses that preserve available defences'],
          ['Settlement documentation', 'Apology, retraction, undertaking and closure terms'],
          ['Advocate briefing', 'Issue-wise note, chronology and evidence file'],
          ['Confidential handling', 'Reputation-sensitive matters managed discreetly']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Defamation should be handled quickly, but not loudly. The strongest response is not the angriest one; it is the one built on the exact words, proof of publication, a clear-eyed view of the statutory exceptions and an awareness that the civil claim dies at one year while the criminal one runs for three.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a statement is defamatory, whether an exception applies, which remedy is appropriate and what a court will do depend entirely on the facts and their presentation. Limitation periods are summarised here in general terms and their application to a particular claim should be confirmed on the facts before relying on them. Statutory positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides assessment, evidence review, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
