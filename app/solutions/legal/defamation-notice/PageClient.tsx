'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'before-sending', title: 'Before You Send Anything' },
  { id: 'anatomy', title: 'What the Notice Must Contain' },
  { id: 'reliefs', title: 'What to Demand' },
  { id: 'tone', title: 'Tone and Counter-Claim Risk' },
  { id: 'evidence', title: 'Preserve First, Demand Second' },
  { id: 'platform', title: 'The Platform Route Runs in Parallel' },
  { id: 'clock', title: 'The Notice Does Not Stop the Clock' },
  { id: 'when', title: 'When a Notice Is Appropriate' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'reviews', title: 'Reviews and Ratings' },
  { id: 'workplace', title: 'Workplace and Employment' },
  { id: 'business', title: 'Business Reputation' },
  { id: 'comparison', title: 'Notice, Cease and Desist, or Complaint' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'responses', title: 'What Happens After It Is Sent' },
  { id: 'replying', title: 'Replying to a Notice You Received' },
  { id: 'common-issues', title: 'Why Notices Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a defamation notice?', 'A formal legal notice sent to whoever made or circulated a false, reputation-damaging statement, demanding that they stop, remove the content, retract it, apologise, preserve evidence and in appropriate cases pay compensation.'],
  ['Is it mandatory before filing a case?', 'No. It is not a legal precondition for either a civil suit or a criminal complaint. It is usually still worth sending, because it resolves a large proportion of matters without litigation and creates a clean record if litigation follows.'],
  ['When is it a bad idea to send one?', 'When the statement is probably true, when it is protected opinion, when the facts do not establish publication or identification, or when the content is obscure and a notice would draw attention to it. A notice on weak facts invites a confident refusal that is awkward to walk back.'],
  ['Does sending a notice extend my time to sue?', 'No, and this is the most expensive misunderstanding in this area. The civil limitation for a defamation claim is generally one year from publication. Correspondence does not pause it. Months spent exchanging letters come out of the same year you have to file in.'],
  ['What should the notice actually contain?', 'The exact words complained of, where and when they were published, why they are false, that they refer to your client, that they reached third parties, the harm caused, the specific relief demanded and a deadline. Vague allegations produce vague responses.'],
  ['Should the notice quote the statement?', 'Yes. Quote it precisely. A notice that alludes to "certain false and malicious statements" without setting them out is weak, and it lets the recipient choose which statement to answer.'],
  ['What relief can be demanded?', 'Immediate takedown, cessation, written or public apology, retraction or correction, an undertaking not to repeat, preservation of evidence, and compensation where the loss can be supported.'],
  ['Can I demand compensation in the notice?', 'Yes, but the figure should be defensible. An arbitrary and inflated demand undermines the credibility of the rest of the notice and makes settlement harder rather than easier.'],
  ['What is the risk of an aggressive notice?', 'Two risks. It can itself contain defamatory allegations, creating a counter-claim. And an over-stated notice that is then not acted on damages your position if the matter ever reaches court.'],
  ['Who should the notice be addressed to?', 'The author, and depending on the facts also the publisher, the page or group administrator, the editor or the platform. Identifying the right recipients is part of the legal work, not an afterthought.'],
  ['How should it be sent?', 'By a trackable mode, with proof of dispatch and delivery preserved. Email is often used alongside physical dispatch. Service is routinely contested later, so the proof matters.'],
  ['How long should I give for compliance?', 'A period that is short enough to convey urgency and long enough to be reasonable. Impossibly short deadlines are treated as posturing and do not help if the matter is later reviewed by a court.'],
  ['Can I send a notice about a Google review?', 'Yes, where the review contains false factual claims rather than genuine criticism. Ask yourself whether the reviewer was ever a customer, whether specific facts are fabricated, and whether there is a pattern suggesting coordination.'],
  ['Is every bad review defamation?', 'No. Honest criticism of a service is protected, and a business that sends notices over ordinary complaints tends to make its reputation problem worse rather than better.'],
  ['Can a notice be sent for a WhatsApp message?', 'Yes, where it was circulated to third parties. A message sent only to the person it concerns is generally not published for defamation purposes.'],
  ['Can a notice go to a media house?', 'Yes. Depending on the facts it may be addressed to the author, the editor and the publisher, and it should identify the specific passages complained of.'],
  ['What about anonymous content?', 'Preserve the profile, URL and content, pursue the platform grievance route, and take advice on identification. A notice cannot be served on someone who has not been identified, so the platform route usually comes first.'],
  ['Can I get content removed without going to court?', 'Often, yes. The IT Rules, 2021 require an intermediary’s grievance officer to acknowledge a complaint within 24 hours and dispose of it within 15 days, with an appeal to the Grievance Appellate Committee within 30 days. This runs alongside the notice and is frequently faster.'],
  ['Should I capture evidence before requesting takedown?', 'Always. A successful takedown removes your proof along with the post. Capture the content, URL, profile and timestamp first, then request removal.'],
  ['What if there is no response?', 'The matter moves to the next step — a civil suit for damages and injunction, a criminal complaint, or continued platform escalation. The unanswered notice becomes part of the record.'],
  ['What if they apologise?', 'Document it. A settlement should record the apology or retraction, where and for how long it will appear, the undertaking not to repeat, any payment and what happens on default.'],
  ['I have received a defamation notice. What should I do?', 'Do not ignore it and do not fire back the same day. Have it reviewed, check whether the statement is defensible as true, opinion or good faith, and reply in measured terms that preserve your defences without conceding elements.'],
  ['Can replying make things worse?', 'Yes. A reply that repeats the allegation, adds new ones or concedes authorship and publication can hand the other side most of what they would otherwise have to prove.'],
  ['Should I respond publicly to the original post?', 'Generally no. A public reply amplifies the statement to an audience that had not seen it and creates a record written under pressure.'],
  ['Can Estabizz handle the full process?', 'Yes — content review, evidence preservation, recipient identification, notice drafting, platform escalation, response analysis, settlement documentation, reply drafting where a notice is received, and advocate coordination if it proceeds to court.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Reputation' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Defamation Notice' }]}
      title="Defamation Notice"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Defamation Notice"
      sections={sections}
      ctaTitle="Speak With a Reputation Legal Expert"
      ctaDescription="Have the content assessed, the evidence preserved and the notice drafted so it achieves removal rather than provoking a counter-claim."
      quickFacts={[
        { label: 'Mandatory?', value: 'No, but usually worth it' },
        { label: 'Civil clock', value: '1 year, unaffected' },
        { label: 'Platform grievance', value: '15 days to dispose' },
        { label: 'First step', value: 'Preserve evidence' }
      ]}
      relatedArticles={[
        { title: 'Defamation', href: '/solutions/legal/defamation-legal-services', category: 'Legal', description: 'BNS Section 356, the statutory exceptions, civil damages, injunctions and the two limitation clocks.' },
        { title: 'Cyber Crime Complaint', href: '/solutions/legal/cyber-crime-complaint', category: 'Legal', description: 'Fake profiles, impersonation, online fraud and digital evidence preservation.' },
        { title: 'Court Proceedings', href: '/solutions/legal/court-proceedings', category: 'Legal', description: 'Forum, limitation, pleadings, interim relief, evidence, orders and execution.' }
      ]}
      finalCtaTitle="A Notice Is a Legal Document, Not a Warning Shot"
      finalCtaDescription="It will be read by the other side's lawyer and, if the matter proceeds, by a court. Drafted well it ends the matter. Drafted badly it creates a second one."
      heroDescription={<p>A defamation notice is the step that resolves most reputation disputes without a courtroom. Sent properly it produces removal, an apology and an undertaking within weeks. Sent badly — vague about what was said, aggressive in tone, or built on a statement that turns out to be true or protected — it hardens the other side, invites a counter-claim and weakens the case that follows. Estabizz assists individuals, founders, directors, companies, professionals, creators, employers and employees with content assessment, evidence preservation, identifying the right recipients, notice drafting, apology and takedown demands, compensation assessment, platform escalation under the IT Rules, settlement documentation, and replying where a notice has been received.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a defamation notice is a formal demand that someone stop making a false statement about you, remove what they have published, put the record straight and, where justified, compensate you.</p>
        <p>It carries weight because it is the last step before litigation, and because it puts the recipient on notice in a way that affects how a court later views their conduct if they carry on regardless.</p>
        <p>This page covers the notice itself. For the underlying cause of action, the statutory exceptions and the remedies available in court, see <Link href="/solutions/legal/defamation-legal-services">Defamation</Link>.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A defamation notice is not a licence or a filing. It is a pre-litigation legal demand, and nothing registers it with any authority.</p>
        <p>It is not mandatory before a civil suit or a criminal complaint, but it is usually worth sending — it creates a formal record, gives the other side a chance to correct the harm cheaply, and frequently achieves the removal and apology that are the real objective.</p>
      </Section>

      <Section id="before-sending" title="Before You Send Anything">
        <div className="warning-box" aria-label="Pre-notice assessment">
          <p><strong>The question is not whether the statement upset you. It is whether it is legally actionable.</strong> Before a notice goes out, four things need checking: that the words are capable of a defamatory meaning, that they refer identifiably to you, that they were published to a third party, and that no statutory exception plausibly protects them. A notice sent without that assessment is often answered with a single line pointing out that the statement was true, or was opinion, or was never published — and the position is then materially worse than before.</p>
        </div>
        <DataTable headers={['Check', 'What to establish']} rows={[
          ['Defamatory meaning', 'The words lower you in the estimation of reasonable people'],
          ['Identification', 'Readers would understand the statement to refer to you'],
          ['Publication', 'It reached at least one third party'],
          ['Falsity', 'The factual assertions are untrue and you can show it'],
          ['Fact or opinion', 'A false statement of fact, rather than protected comment'],
          ['Exception risk', 'Truth for public good, good faith, fair comment or lawful complaint'],
          ['Attribution', 'Who actually authored or circulated it'],
          ['Harm', 'Concrete consequences, particularly for a business claim'],
          ['Limitation', 'How much of the one-year civil period remains'],
          ['Objective', 'Whether you want removal, an apology, money, or all three']
        ]} />
      </Section>

      <Section id="anatomy" title="What the Notice Must Contain">
        <DataTable headers={['Element', 'Why it matters']} rows={[
          ['Sender and recipient details', 'Identifies the aggrieved party and who is answerable'],
          ['The exact words complained of', 'Quoted precisely — this is the core of the notice'],
          ['Date, platform and context', 'Establishes publication and the limitation position'],
          ['Why the statement is false', 'Sets out the true position with supporting material'],
          ['Identification', 'Shows the statement refers to your client'],
          ['Publication to third parties', 'Audience, recipients, groups or public visibility'],
          ['Harm caused', 'Reputational, professional, commercial or personal consequences'],
          ['Legal basis', 'The civil and criminal framework relied on'],
          ['Demand to cease', 'Stop making or repeating the statement'],
          ['Takedown demand', 'Specific content, identified by URL where online'],
          ['Apology or retraction demand', 'Including where and how it is to appear'],
          ['Evidence preservation demand', 'Puts the recipient on notice not to destroy records'],
          ['Compensation demand, where justified', 'A defensible figure, not an arbitrary one'],
          ['Time for compliance', 'A clear, reasonable deadline'],
          ['Consequences of non-compliance', 'The steps that will follow'],
          ['Measured, professional tone', 'Avoids creating a counter-claim']
        ]} />
        <p>The evidence preservation demand is frequently omitted and should not be. Once the recipient knows litigation is possible, a documented request to preserve the relevant material makes later destruction much harder to explain.</p>
      </Section>

      <Section id="reliefs" title="What to Demand">
        <DataTable headers={['Relief', 'Practical effect']} rows={[
          ['Immediate takedown', 'Removal of the post, video, article, review or message'],
          ['Cease and desist', 'Stop repeating or circulating the statement'],
          ['Written apology', 'Private acknowledgement of the falsity'],
          ['Public apology', 'Published where the original appeared, for a stated period'],
          ['Retraction or correction', 'Withdrawal of the statement and publication of the true position'],
          ['Undertaking', 'A written promise not to repeat, enforceable if broken'],
          ['Evidence preservation', 'Prevents deletion or alteration of relevant records'],
          ['Compensation', 'Monetary relief where the loss can be evidenced'],
          ['Identification of sources', 'Where the statement was circulated onward by others'],
          ['Confirmation of compliance', 'Written confirmation by the deadline']
        ]} />
        <p>Prioritise. A notice demanding everything at once, including a large and unexplained sum, reads as an opening position rather than a serious legal demand. Naming the two or three outcomes that actually matter tends to get them.</p>
      </Section>

      <Section id="tone" title="Tone and Counter-Claim Risk">
        <div className="warning-box" aria-label="Counter-claim risk">
          <p><strong>A notice can itself be defamatory.</strong> If it accuses the recipient of fraud, criminality or dishonesty beyond what the facts support, and it is seen by third parties — copied to an employer, a platform, a client or a group — it can found a counter-claim. Notices are also routinely screenshotted and published by recipients, so assume anything written will be read by an audience.</p>
        </div>
        <DataTable headers={['Avoid', 'Because']} rows={[
          ['Allegations beyond the evidence', 'Creates counter-defamation exposure'],
          ['Abusive or threatening language', 'Undermines credibility and can be held against you'],
          ['Threats of criminal action as leverage', 'Reads as coercion rather than a legal remedy'],
          ['Copying uninvolved third parties', 'Publishes your own allegations more widely'],
          ['Unsupported compensation figures', 'Devalues the rest of the notice'],
          ['Impossibly short deadlines', 'Treated as posturing'],
          ['Threats you will not carry out', 'A notice not followed up weakens the next one']
        ]} />
      </Section>

      <Section id="evidence" title="Preserve First, Demand Second">
        <div className="info-box" aria-label="Sequencing">
          <p><strong>Capture everything before you ask for anything.</strong> The moment a notice arrives or a platform complaint is filed, content tends to disappear — and a successful takedown destroys your evidence as effectively as a hostile deletion. Preserve first, in full, and only then demand removal.</p>
        </div>
        <DataTable headers={['Content type', 'What to capture']} rows={[
          ['Social media post', 'Full post, URL, handle, timestamp, visible engagement and comments'],
          ['Video', 'The file where possible, plus link, channel, title and comments'],
          ['Business review', 'Review text, reviewer profile, date and the listing page'],
          ['Messaging and groups', 'Exported chat, sender number, group name and membership'],
          ['Email', 'The original with full headers, not a forwarded copy'],
          ['Blog or news article', 'Saved page, author, publisher and publication date'],
          ['Fake profile', 'Profile URL, images, posts and follower context'],
          ['Morphed or synthetic media', 'Original file and any technical metadata available'],
          ['Onward circulation', 'Evidence of shares and forwards, not just the original'],
          ['Harm', 'Customer cancellations, client queries and internal escalations']
        ]} />
        <p>Electronic material is governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023. Preserve originals and complete records rather than cropped screenshots assembled after the dispute has hardened.</p>
      </Section>

      <Section id="platform" title="The Platform Route Runs in Parallel">
        <p>Where the content is online, the intermediary&rsquo;s own grievance mechanism is often faster than anything addressed to the author, and it does not depend on identifying them.</p>
        <DataTable headers={['Stage', 'Timeline under the IT Rules, 2021']} rows={[
          ['Complaint to the grievance officer', 'Acknowledgement within 24 hours'],
          ['Disposal of the complaint', 'Within 15 days'],
          ['Appeal to the Grievance Appellate Committee', 'Within 30 days of the grievance officer’s communication'],
          ['Specified categories of content', 'Shorter removal timelines apply to certain content under the Rules']
        ]} />
        <p>Run the two tracks together. The notice addresses the person responsible and preserves the litigation record; the platform complaint addresses the content itself. Where the author is anonymous, the platform route is usually the only one available at the outset — see <Link href="/solutions/legal/cyber-crime-complaint">Cyber Crime Complaint</Link> where a fake profile or impersonation is involved.</p>
      </Section>

      <Section id="clock" title="The Notice Does Not Stop the Clock">
        <div className="warning-box" aria-label="Limitation warning">
          <p><strong>Sending a notice does not extend the time you have to sue.</strong> A civil defamation claim must generally be brought within one year of publication under the Limitation Act, 1963. Correspondence does not suspend that period. A client who sends a notice, waits for a reply, sends a reminder, negotiates for a few months and then decides to sue can find that most of the year has gone — and with it the damages claim, leaving only the longer criminal route that does not deliver compensation.</p>
        </div>
        <p>Practical discipline: fix the publication date at the outset, calculate the limitation date, and set the notice deadline and any negotiation window inside a schedule that leaves clear time to file. Treat the limitation date as immovable, because it is.</p>
      </Section>

      <Section id="when" title="When a Notice Is Appropriate">
        <DataTable headers={['Situation', 'What the notice does']} rows={[
          ['A false allegation has been made publicly', 'Demands withdrawal and apology'],
          ['A social media post is damaging reputation', 'Demands takedown and restraint'],
          ['A fabricated review has been posted', 'Demands removal and supports platform escalation'],
          ['A competitor is spreading false claims', 'Protects goodwill and creates a record'],
          ['An ex-employee is making false public statements', 'Protects the company and invokes any contractual terms'],
          ['An employer has made false allegations', 'Protects the employee’s professional standing'],
          ['A news item contains false facts', 'Demands correction or retraction'],
          ['A message is circulating in groups', 'Demands that circulation stop'],
          ['A fake profile has been created', 'Supports takedown and further action'],
          ['Morphed or synthetic content is circulating', 'Demands removal and evidence preservation urgently'],
          ['Defamatory emails have reached your clients', 'Demands apology and supports a compensation claim']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Nature of the instrument', 'Pre-litigation legal demand; no regulator and no filing'],
          ['Criminal defamation', 'Bharatiya Nyaya Sanhita, 2023, Section 356'],
          ['Criminal procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023, Section 222'],
          ['Civil defamation', 'Tort principles, with the suit under the Code of Civil Procedure, 1908'],
          ['Injunctions', 'Specific Relief Act, 1963 and CPC Order XXXIX'],
          ['Civil limitation', 'Limitation Act, 1963, Articles 75 and 76 — one year'],
          ['Online content', 'IT Act and the IT Rules, 2021 grievance framework'],
          ['Intermediary liability', 'IT Act Section 79 and the due diligence conditions'],
          ['Electronic evidence', 'Bharatiya Sakshya Adhiniyam, 2023, Sections 61 to 63'],
          ['Contractual overlay', 'Non-disparagement, confidentiality and employment terms where applicable']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['BNS Section 356', 'Criminal defamation — the framework a notice refers to'],
          ['BNS Section 356 exceptions', 'What the recipient will rely on; screen these before drafting'],
          ['BNSS Section 222', 'Procedure if a criminal complaint follows'],
          ['CPC Order XXXIX Rules 1 and 2', 'Temporary injunction restraining further publication'],
          ['Specific Relief Act Sections 38 and 39', 'Permanent and mandatory injunctions, including removal'],
          ['Limitation Act Articles 75 and 76', 'One-year limitation for libel and slander claims'],
          ['IT Act Section 79', 'Intermediary safe harbour and the due diligence conditions behind takedown'],
          ['IT Rules, 2021', 'Grievance officer timelines and the Grievance Appellate Committee'],
          ['IT Act Sections 66C and 66D', 'Identity theft and personation, where a fake profile is involved'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic records'],
          ['Indian Contract Act Sections 73 and 74', 'Where the statement also breaches a contractual obligation']
        ]} />
      </Section>

      <Section id="reviews" title="Reviews and Ratings">
        <p>Review disputes need a cool head. A business that treats every criticism as defamation generates more reputational damage than the reviews ever did.</p>
        <DataTable headers={['Indicator', 'What it suggests']} rows={[
          ['Reviewer was never a customer', 'Ask for transaction proof; supports a platform complaint'],
          ['Specific fabricated facts', 'Strongest basis for a notice'],
          ['Pure expression of dissatisfaction', 'Generally protected; consider a service response instead'],
          ['Multiple similar reviews in a short window', 'Pattern evidence suggesting coordination'],
          ['Newly created reviewer accounts', 'Supports a platform policy complaint'],
          ['Allegations of criminality or fraud', 'Serious factual assertions, typically actionable if false'],
          ['Competitor connection', 'Handle carefully; evidence must be solid before alleging it'],
          ['Mixed opinion and false fact', 'The false factual element is what the notice should target'],
          ['Demonstrable business loss', 'Preserve cancellation and enquiry records']
        ]} />
      </Section>

      <Section id="workplace" title="Workplace and Employment">
        <p>Workplace defamation sits alongside employment claims, which makes tone and sequencing more important than usual. Parallel proceedings are common and a notice written in isolation can undercut the employment position.</p>
        <DataTable headers={['Situation', 'What to review']} rows={[
          ['Ex-employee making false public statements', 'Employment records, any non-disparagement clause and actual impact'],
          ['Employer giving false references', 'Reference correspondence and HR records'],
          ['False misconduct allegation circulated', 'Inquiry status, findings and who received the communication'],
          ['Internal email defaming an employee', 'Circulation list, authority and whether privilege may apply'],
          ['Professional networking post', 'Screenshots, comments and professional consequences'],
          ['Confidentiality breach alongside the statement', 'The employment agreement and contractual remedies'],
          ['Termination dispute in the background', 'Whether the defamation route helps or complicates the wider claim']
        ]} />
        <p>Where a complaint process is still running, be careful: a communication made in good faith to a person with lawful authority may fall within the exceptions, and an aggressive notice can look like an attempt to suppress a legitimate complaint.</p>
      </Section>

      <Section id="business" title="Business Reputation">
        <p>A corporate notice should connect the false statement to commercial consequences. That is what converts a general grievance into a supportable compensation claim.</p>
        <DataTable headers={['Harm', 'Evidence to preserve']} rows={[
          ['Lost customer or order', 'Cancellation message stating the reason'],
          ['Vendor or partner withdrawal', 'Termination or suspension correspondence'],
          ['Investor concern', 'Diligence queries referencing the statement'],
          ['Employee attrition', 'Resignations or internal escalations citing it'],
          ['False compliance allegation', 'Licence and regulatory records disproving it'],
          ['False insolvency rumour', 'Financial statements and banking correspondence'],
          ['False product or safety claim', 'Testing, certification and quality records'],
          ['Coordinated online campaign', 'The full post, account and comment trail']
        ]} />
        <p>Authority matters too. Board or management authorisation to act for the company should be in place before the notice is issued.</p>
      </Section>

      <Section id="comparison" title="Notice, Cease and Desist, or Complaint">
        <DataTable headers={['Point', 'Defamation notice', 'Cease and desist', 'Complaint to court']} rows={[
          ['Purpose', 'Repair reputation and demand relief', 'Stop unlawful conduct', 'Obtain a judicial remedy'],
          ['Stage', 'Pre-litigation', 'Pre-litigation', 'Litigation'],
          ['Typical relief', 'Takedown, apology, retraction, compensation', 'Stop the conduct, undertaking', 'Damages, injunction or sentence'],
          ['Basis', 'Defamation law', 'Any unlawful conduct, including harassment or IP misuse', 'Civil suit or criminal complaint'],
          ['Speed', 'Days to weeks', 'Days to weeks', 'Months or longer'],
          ['Cost', 'Low', 'Low', 'Substantially higher'],
          ['Best used', 'A false statement causing identifiable harm', 'Ongoing conduct that must stop', 'Where the notice route has failed or urgency requires an order']
        ]} />
        <p>These are not mutually exclusive. A single notice often combines a defamation demand with cease-and-desist directions, and runs alongside a platform complaint.</p>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['The exact statement complained of', 'The core of the notice'],
          ['Screenshots with date and time', 'Evidence of publication'],
          ['URLs and post links', 'Identifying the content precisely'],
          ['Video or audio files', 'Proof of spoken or visual defamation'],
          ['Profile links', 'Identifying the author or publisher'],
          ['Messages and email copies', 'Communication evidence, with headers where available'],
          ['Group details', 'Proof of circulation to third parties'],
          ['Witness details', 'Third-party publication and impact'],
          ['Identity proof', 'Verification of the sender'],
          ['Company and brand documents', 'Goodwill and reputation context'],
          ['Customer loss records', 'Supporting a compensation demand'],
          ['Board authorisation, for a company', 'Authority to issue the notice'],
          ['Platform complaint ticket', 'Escalation record'],
          ['Any earlier correspondence', 'Demand history and context'],
          ['Any notice already received', 'Where a reply is being prepared']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Statement, publication, harm and objective'],
          ['2', 'Content assessment', 'Whether the statement is legally actionable'],
          ['3', 'Exception screening', 'Truth, opinion, good faith and privilege risk'],
          ['4', 'Evidence preservation', 'Content, URLs, timestamps, metadata and witnesses'],
          ['5', 'Recipient identification', 'Author, publisher, administrator or platform'],
          ['6', 'Limitation check', 'Where the one-year civil period stands'],
          ['7', 'Relief selection', 'Takedown, apology, retraction, undertaking, compensation'],
          ['8', 'Notice drafting', 'Precise, evidence-led and counter-claim aware'],
          ['9', 'Dispatch', 'Trackable mode, with proof of service preserved'],
          ['10', 'Platform escalation', 'Grievance complaint in parallel where content is online'],
          ['11', 'Response analysis', 'Apology, denial, silence or settlement proposal'],
          ['12', 'Escalation or closure', 'Suit, complaint or documented settlement']
        ]} />
      </Section>

      <Section id="responses" title="What Happens After It Is Sent">
        <DataTable headers={['Response', 'What it means', 'What follows']} rows={[
          ['Full compliance', 'Content removed and apology issued', 'Document the settlement and close'],
          ['Partial compliance', 'Removal without apology, or the reverse', 'Negotiate the balance against your priorities'],
          ['Apology offered, compensation refused', 'Common where the recipient accepts error', 'Weigh the apology against litigation cost'],
          ['Denial asserting truth', 'They intend to justify the statement', 'Reassess the evidence honestly before escalating'],
          ['Denial asserting opinion', 'They will rely on fair comment or good faith', 'Focus on the false factual assertions'],
          ['Counter-notice', 'They allege the notice itself is defamatory', 'Review the notice and respond with care'],
          ['Silence', 'No engagement at all', 'Escalate on the timetable set, with limitation in view'],
          ['Content escalates', 'Further publication after notice', 'Consider urgent injunction and platform escalation']
        ]} />
      </Section>

      <Section id="replying" title="Replying to a Notice You Received">
        <p>Receiving one of these is alarming, and the instinct is either to ignore it or to answer it the same afternoon. Both are mistakes.</p>
        <DataTable headers={['Do', 'Do not']} rows={[
          ['Have the notice reviewed before responding', 'Reply the same day in your own words'],
          ['Check whether the statement is defensibly true', 'Concede authorship or publication reflexively'],
          ['Consider whether it was opinion or good faith', 'Repeat the allegation in the reply'],
          ['Preserve your own evidence and sources', 'Delete material, which looks like concealment'],
          ['Respond within the deadline, or seek an extension', 'Ignore it and hope it goes away'],
          ['Keep the reply factual and measured', 'Add new allegations against the sender'],
          ['Take advice before any public statement', 'Post the notice or your response online']
        ]} />
        <p>A well-drafted reply can end the matter by setting out, calmly, why the statement is defensible. A poor one supplies the sender with admissions on publication, authorship and meaning that they would otherwise have had to prove.</p>
      </Section>

      <Section id="common-issues" title="Why Notices Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['The exact words are not quoted', 'The notice is vague and easy to deflect', 'Precise reproduction of the statement'],
          ['Evidence not preserved before takedown', 'The proof disappears with the post', 'Preserve first, demand second'],
          ['URLs not captured', 'Online content cannot be identified later', 'Full URL and metadata capture'],
          ['Wrong recipient', 'The notice goes to someone not responsible', 'Author, publisher and administrator identification'],
          ['Platform route ignored', 'Removal takes far longer than necessary', 'Parallel grievance escalation'],
          ['Exceptions not screened', 'A confident refusal citing truth or opinion', 'Assessment before drafting'],
          ['Abusive language used', 'Counter-defamation exposure', 'Measured, professional drafting'],
          ['Unsupported compensation figure', 'The whole notice loses credibility', 'A defensible, evidenced demand'],
          ['Limitation overlooked during negotiation', 'The damages claim is lost while corresponding', 'Limitation calendared at the outset'],
          ['No follow-through after the deadline', 'The threat is revealed as empty', 'An escalation plan fixed before sending']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Content assessment', 'Whether the statement is legally actionable'],
          ['Exception screening', 'Truth, opinion, good faith and privilege risk before drafting'],
          ['Evidence preservation', 'Content, URLs, timestamps, metadata and witnesses'],
          ['Recipient identification', 'Author, publisher, administrator or platform'],
          ['Limitation review', 'Calendaring the one-year civil deadline'],
          ['Notice drafting', 'Precise, evidence-led and counter-claim aware'],
          ['Takedown and platform escalation', 'Grievance complaints and appeals under the IT Rules'],
          ['Compensation assessment', 'Building a defensible figure from evidenced loss'],
          ['Response analysis', 'Reviewing replies and advising on next steps'],
          ['Reply drafting', 'Where a notice has been received against you'],
          ['Settlement documentation', 'Apology, retraction, undertaking and non-repeat terms'],
          ['Escalation support', 'Civil suit or criminal complaint where the notice fails'],
          ['Confidential handling', 'Reputation-sensitive matters managed discreetly']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“A defamation notice is read by the other side's lawyer before it is read by anyone else. The ones that work quote the exact words, prove publication, demand two or three specific things and set a deadline the sender intends to honour. The ones that fail are angry, vague and sent before anyone checked whether the statement was actually true.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Whether a statement is actionable, whether a notice is advisable, what relief can properly be demanded and what a court would do all depend on the facts. Limitation periods are described here in general terms and their application to a particular claim should be confirmed before relying on them. Platform timelines reflect the position under the IT Rules, 2021 as at September 2026 and parts of this guide remain under professional review. Estabizz provides assessment, evidence review, drafting, documentation and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
