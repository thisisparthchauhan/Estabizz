'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'first-hours', title: 'The First Few Hours' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'types', title: 'Types of Matter We Handle' },
  { id: 'when', title: 'When to File' },
  { id: 'where', title: 'Where to Report' },
  { id: 'bank-liability', title: 'Bank Liability and the Three-Day Rule' },
  { id: 'evidence', title: 'Digital Evidence That Holds Up' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'How We Run the Matter' },
  { id: 'stakeholders', title: 'Who Does What' },
  { id: 'business', title: 'Cyber Crime Against Businesses' },
  { id: 'cert-in', title: 'CERT-In Reporting for Organisations' },
  { id: 'freeze', title: 'Frozen Bank Accounts' },
  { id: 'defence', title: 'Defence Side Support' },
  { id: 'common-issues', title: 'Why Complaints Fail' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is a Cyber Crime Complaint?', 'A formal complaint reporting an online or technology-enabled offence — financial fraud, identity theft, harassment, unauthorised access, data theft, impersonation or digital extortion.'],
  ['Where do I file one?', 'Through the National Cyber Crime Reporting Portal, by calling 1930 for cyber financial fraud, or at a cyber police station or local police station. In financial fraud the helpline and the portal come first, because they are the fastest route to the banking channel.'],
  ['What should I do in the first hour after online fraud?', 'Call 1930, inform your bank, file on the cyber portal and preserve everything — transaction IDs, UTR numbers, screenshots, messages and call logs. Speed matters more here than in almost any other area of law.'],
  ['Can the money be recovered?', 'Sometimes. Recovery depends on how fast the report reaches the banking channel, whether the funds are still traceable, how the beneficiary banks respond and whether the trail can be frozen before the money is layered further. Nobody can promise recovery, and you should be wary of anyone who does.'],
  ['What is the 1930 helpline?', 'The national helpline for reporting cyber financial fraud in India. It exists to get a suspicious transaction into the banking system quickly.'],
  ['Does reporting within three days guarantee a refund?', 'No, but it materially protects your position. Under the RBI framework on unauthorised electronic banking transactions, a customer generally bears zero liability where the loss arises from a third-party breach with no customer fault and the transaction is reported within three working days of receiving the bank’s communication. Reporting between four and seven working days attracts limited liability subject to prescribed caps.'],
  ['What happens if I report late?', 'Beyond seven working days, liability is determined by the bank’s board-approved policy. The practical position weakens with every day of delay, both for liability and for tracing.'],
  ['What if I shared my OTP or PIN?', 'Where the loss arises from customer negligence, such as sharing payment credentials, the customer generally bears the loss until the transaction is reported. Report it anyway and immediately, because liability stops accruing from the point of reporting.'],
  ['Which laws apply to cybercrime in India?', 'Principally the Information Technology Act, 2000 for cyber offences, the Bharatiya Nyaya Sanhita, 2023 for the underlying criminal offences, the Bharatiya Nagarik Suraksha Sanhita, 2023 for procedure, and the Bharatiya Sakshya Adhiniyam, 2023 for electronic evidence.'],
  ['Why does the new criminal law framework matter to my complaint?', 'Because section numbering changed entirely on 1 July 2024. A complaint drafted from an old template citing IPC and CrPC sections signals carelessness and can cause avoidable confusion at the registration stage.'],
  ['Is BSA relevant to a cyber complaint?', 'Very. Cyber cases are built almost entirely on electronic records — screenshots, chats, emails, logs, URLs and statements. Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam govern their admissibility, and evidence collected carelessly is harder to rely on later.'],
  ['Can WhatsApp chats be used as evidence?', 'Yes, subject to the electronic evidence requirements. Preserve the original device and the full conversation rather than isolated cropped screenshots, because context and continuity are what give the record weight.'],
  ['Can I file against an unknown person?', 'Yes. Most cyber complaints begin against unknown accused. What matters is that the facts, digital traces, account numbers and timeline are set out clearly enough for investigation to start.'],
  ['Can a fake social media profile be reported?', 'Yes, both to the platform for takedown and through the cyber complaint route where identity misuse, harassment or fraud is involved. Preserve the profile URL and screenshots before reporting, because takedown removes the evidence too.'],
  ['Can a complaint be filed for online harassment?', 'Yes. Threats, stalking, abusive messaging, blackmail and sustained harassment can be reported through the portal and police channels, and the National Cyber Crime Reporting Portal has a dedicated route for offences against women and children.'],
  ['I am being blackmailed with private images. What should I do?', 'Report immediately and do not pay. Preserve the messages and profile details, avoid further engagement, and use the portal’s dedicated reporting category. These matters are handled confidentially and urgency genuinely helps.'],
  ['What if the police do not register an FIR?', 'Where the information discloses a cognizable offence, escalation is available — a written representation to the Superintendent of Police, and thereafter the Magistrate route under the BNSS. A Zero FIR can also be registered at any police station irrespective of territorial jurisdiction.'],
  ['What is a Zero FIR?', 'An FIR registered at a police station that does not have territorial jurisdiction, later transferred to the station that does. It exists so that jurisdiction arguments do not delay urgent registration.'],
  ['Can my bank account be frozen because of someone else’s complaint?', 'Yes. Accounts that receive funds connected to a reported fraud can be frozen, sometimes several transfers removed from the original fraud and without any wrongdoing by the account holder.'],
  ['What do I do if my account is wrongly frozen?', 'Assemble the source-of-funds documentation and transaction trail, and make a documented representation to the investigating officer and the bank. For businesses this is urgent, because a frozen operating account stops payroll and vendor payments within days.'],
  ['Can a company file a Cyber Crime Complaint?', 'Yes, through an authorised signatory with board or management authorisation, supported by internal records such as access logs, email headers and accounting entries.'],
  ['Is CERT-In reporting required for every cybercrime?', 'No. CERT-In reporting applies to specified cyber incidents affecting covered entities, within six hours. An individual fraud victim uses 1930, the portal and the police route instead.'],
  ['I have received a cyber police notice. What now?', 'Take it seriously and answer it properly. A casual reply can create admissions, and ignoring it worsens your position. Have the notice reviewed and a considered response prepared before you say anything on record.'],
  ['What is the biggest mistake victims make?', 'Two, usually together: waiting before reporting, and deleting the evidence. Chats get cleared out of embarrassment, devices get formatted, and the record that would have supported the complaint disappears.'],
  ['Can Estabizz appear before police or court?', 'We handle evidence review, complaint drafting, reporting strategy, bank and platform coordination, notice replies and case preparation. Appearance is through enrolled advocates.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Cyber Crime' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Cyber Crime Complaint' }]}
      title="Cyber Crime Complaint"
      readTime="15 min read"
      hideReviewBadge
      focusKeyword="Cyber Crime Complaint"
      sections={sections}
      ctaTitle="Speak With a Cyber Crime Legal Expert"
      ctaDescription="Urgent reporting support, digital evidence review and confidential handling for online fraud, harassment and account freeze matters."
      quickFacts={[
        { label: 'Financial fraud helpline', value: '1930' },
        { label: 'Bank reporting window', value: '3 working days' },
        { label: 'Evidence law', value: 'BSA, 2023' },
        { label: 'Matters most', value: 'Speed' }
      ]}
      relatedArticles={[
        { title: 'Cyber Security Advisory', href: '/solutions/legal/cyber-security-advisory', category: 'Legal', description: 'CERT-In reporting readiness, log retention, DPDP preparation and the controls that prevent the incident.' },
        { title: 'Criminal Misappropriation of Property', href: '/solutions/legal/criminal-misappropriation-of-property', category: 'Legal', description: 'BNS Section 314 — dishonest conversion of movable property, including insider asset and fund misuse.' },
        { title: 'Bail Application', href: '/solutions/legal/bail-application', category: 'Legal', description: 'Regular, anticipatory, interim and default bail under the BNSS framework.' }
      ]}
      finalCtaTitle="In Cyber Fraud, Hours Decide Outcomes"
      finalCtaDescription="Money moves through layered accounts, SIM cards are discarded and posts are deleted. Report first, preserve everything, and let the complaint be drafted properly around what you managed to keep."
      heroDescription={<p>Cyber fraud moves faster than any legal process. Funds are routed through layered accounts within minutes, devices are discarded, and content is deleted before anyone reads a complaint. What determines the outcome is usually what happened in the first few hours. Estabizz assists individuals, families, professionals, businesses, directors and regulated entities with online fraud reporting, 1930 helpline and cyber portal guidance, digital evidence preservation, police complaint drafting, FIR strategy, bank coordination and account-freeze representation, platform takedown support, CERT-In reporting review and defence where a cyber notice has been received — under the current framework of the IT Act, BNS, BNSS and BSA.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> a Cyber Crime Complaint is what you file when someone uses a phone, computer, payment app, social media account, email or website to cheat, threaten, harass, impersonate, steal from or otherwise act unlawfully against you.</p>
        <p>These matters are unusual in how time-sensitive they are. In financial fraud, early reporting is what gives banks and law enforcement any chance of tracing and blocking funds before they are layered beyond reach. In harassment and reputation matters, early preservation is what stops the evidence disappearing when a profile is deleted or a post is taken down.</p>
        <p>This page covers both sides — filing a complaint, and responding when a complaint, notice or account freeze lands on you.</p>
      </Section>

      <Section id="first-hours" title="The First Few Hours">
        <div className="warning-box" aria-label="Immediate steps">
          <p><strong>If money has just left your account, do these things now and read the rest of this page afterwards.</strong> Call <strong>1930</strong>. Inform your bank and get a written acknowledgement with a reference number. File on the National Cyber Crime Reporting Portal and keep the acknowledgement number. Do not delete anything — not the chats, not the call logs, not the transaction alerts, however embarrassing they feel. Do not format or factory-reset the device.</p>
        </div>
        <DataTable headers={['Step', 'Action']} rows={[
          ['1', 'Call 1930 immediately in any cyber financial fraud'],
          ['2', 'Inform the bank, wallet or payment app and obtain a written reference'],
          ['3', 'File on the National Cyber Crime Reporting Portal and note the acknowledgement'],
          ['4', 'Preserve transaction IDs, UTR numbers, beneficiary details and screenshots'],
          ['5', 'Do not delete chats, emails, call logs or app notifications'],
          ['6', 'Change passwords and secure the affected accounts, without wiping the device'],
          ['7', 'Preserve the device itself and avoid formatting or resetting it'],
          ['8', 'Take legal support for complaint drafting and FIR strategy'],
          ['9', 'Track the acknowledgement number and complaint status'],
          ['10', 'Keep a single dated file of every bank, police and portal interaction']
        ]} />
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>A Cyber Crime Complaint is not a licence or a registration. It is a reporting and enforcement process for cyber offences, online fraud and digital misconduct.</p>
        <p>You do not need to file one for every online annoyance. But where there is financial loss, identity misuse, harassment, blackmail, data theft, unauthorised access or a credible digital threat, immediate reporting is strongly advisable — and the value of reporting decays by the hour.</p>
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Main cyber law', 'Information Technology Act, 2000'],
          ['Criminal offences', 'Bharatiya Nyaya Sanhita, 2023'],
          ['Criminal procedure', 'Bharatiya Nagarik Suraksha Sanhita, 2023'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023'],
          ['Cognizable offence reporting', 'BNSS Section 173'],
          ['Non-cognizable information', 'BNSS Section 174'],
          ['Police investigation powers', 'BNSS Section 175'],
          ['Electronic records', 'BSA Sections 61, 62 and 63'],
          ['National reporting platform', 'National Cyber Crime Reporting Portal'],
          ['Financial fraud helpline', '1930'],
          ['Organisational incident reporting', 'CERT-In Directions under Section 70B of the IT Act'],
          ['Banking customer protection', 'RBI framework on limiting customer liability in unauthorised electronic banking transactions']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <p>Section numbering changed on 1 July 2024 when the BNS, BNSS and BSA replaced the IPC, CrPC and Evidence Act. Complaints drafted from older templates frequently still cite repealed provisions, which helps nobody.</p>
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['IT Act Section 43', 'Unauthorised access, downloading, damage and disruption of computer systems'],
          ['IT Act Section 66', 'Computer-related offences involving dishonest or fraudulent intention'],
          ['IT Act Section 66C', 'Identity theft — misuse of password, electronic signature or unique identification feature'],
          ['IT Act Section 66D', 'Cheating by personation using a computer resource or communication device'],
          ['IT Act Section 66E', 'Violation of privacy'],
          ['IT Act Sections 67, 67A and 67B', 'Obscene material, sexually explicit material and child sexual abuse material in electronic form'],
          ['IT Act Sections 72 and 72A', 'Breach of confidentiality, and disclosure in breach of lawful contract'],
          ['BNS Section 316', 'Criminal breach of trust, where entrustment and dishonest misappropriation are disclosed'],
          ['BNS Section 318', 'Cheating, including deception-based financial fraud'],
          ['BNS Section 319', 'Cheating by personation, for fake identity and impersonation matters'],
          ['BNS Sections 336 and 340', 'Forgery, and using a forged document or electronic record as genuine'],
          ['BNS Section 351', 'Criminal intimidation, for online threats'],
          ['BNS Section 356', 'Defamation, for reputation-damaging digital publication'],
          ['BNSS Section 173', 'Information relating to a cognizable offence, including by electronic communication'],
          ['BNSS Section 193', 'Investigation report framework, including chain of custody for devices'],
          ['BSA Sections 61 to 63', 'Admissibility of electronic and digital records']
        ]} />
      </Section>

      <Section id="types" title="Types of Matter We Handle">
        <DataTable headers={['Type', 'Typical examples']} rows={[
          ['Cyber financial fraud', 'UPI fraud, bank fraud, card fraud, wallet fraud, fake payment links'],
          ['Phishing and vishing', 'Fake bank calls, fake KYC updates, OTP scams, spoofed websites'],
          ['Investment scams', 'Fake trading apps, crypto scams, stock tip fraud, predatory loan apps'],
          ['Identity theft', 'Misuse of Aadhaar, PAN, mobile number, email, photographs or credentials'],
          ['Social media impersonation', 'Fake Instagram, Facebook, LinkedIn, Telegram or WhatsApp profiles'],
          ['Cyber harassment', 'Threats, stalking, abusive messaging and sustained intimidation'],
          ['Sextortion and blackmail', 'Threats to publish private or manipulated images'],
          ['Data theft', 'Unauthorised access to, copying or misuse of business or personal data'],
          ['Email fraud', 'Business email compromise, fake invoices and email spoofing'],
          ['Online defamation', 'False posts, fake reviews and viral allegations'],
          ['Bank account freeze', 'Accounts frozen due to a cyber complaint or a suspicious transaction trail'],
          ['Defence of the accused', 'Evidence mapping and response where you have been named']
        ]} />
      </Section>

      <Section id="when" title="When to File">
        <DataTable headers={['Situation', 'Why it is urgent']} rows={[
          ['Money has been transferred fraudulently', 'Early reporting is the only realistic path to tracing or blocking'],
          ['A UPI or bank account is compromised', 'Both the bank and the cyber complaint must be started at once'],
          ['OTP, PIN or credentials were misused', 'The reporting timeline directly affects your liability position'],
          ['A fake profile has been created', 'Identity misuse spreads quickly and evidence vanishes on takedown'],
          ['Private images are being used as leverage', 'Urgent takedown and protection strategy, and do not pay'],
          ['Online harassment is continuing', 'Evidence preservation and safety planning together'],
          ['A business email has been hacked', 'Client payments and data may already be exposed'],
          ['Company data has been stolen', 'Internal incident response and complaint may both be needed'],
          ['A bank account has been frozen', 'Source-of-funds documentation should begin immediately'],
          ['A cyber police notice has arrived', 'A considered response is needed before anything goes on record']
        ]} />
      </Section>

      <Section id="where" title="Where to Report">
        <DataTable headers={['Route', 'Best used for']} rows={[
          ['1930 helpline', 'Immediate reporting of cyber financial fraud'],
          ['National Cyber Crime Reporting Portal', 'Online reporting of cybercrime, with a dedicated route for offences against women and children'],
          ['Cyber police station', 'Complex cyber offences, investigation follow-up and FIR support'],
          ['Local police station', 'FIR, including a Zero FIR where jurisdiction is unclear'],
          ['Bank, wallet or payment app', 'Transaction hold, dispute, chargeback and the customer protection route'],
          ['Platform reporting', 'Profile takedown and content preservation'],
          ['CERT-In', 'Specified cyber incidents affecting covered organisations']
        ]} />
        <p>These routes are complementary rather than alternatives. In a typical financial fraud, the helpline, the bank and the portal should all be engaged the same day, and the police complaint follows with the acknowledgements attached.</p>
      </Section>

      <Section id="bank-liability" title="Bank Liability and the Three-Day Rule">
        <p>The RBI framework on unauthorised electronic banking transactions links customer liability to two things: whose fault the loss was, and how quickly it was reported. This is the part victims most often do not know, and it is worth real money.</p>
        <DataTable headers={['Scenario', 'Customer liability position']} rows={[
          ['Bank’s own negligence or deficiency', 'Zero liability, regardless of whether the customer reported it'],
          ['Third-party breach, no fault of bank or customer, reported within 3 working days', 'Zero liability'],
          ['Third-party breach, reported within 4 to 7 working days', 'Limited liability, subject to the prescribed caps'],
          ['Reported beyond 7 working days', 'Determined by the bank’s board-approved policy'],
          ['Loss due to customer negligence, such as sharing credentials', 'Customer bears the loss until the transaction is reported; liability stops on reporting']
        ]} />
        <div className="info-box" aria-label="Reporting window note">
          <p><strong>The three working days run from when the bank communicates the transaction to you, not from when you noticed it.</strong> That distinction matters if alerts went to an old number, a spam folder or a phone you were not carrying. Keep the acknowledgement of your report, in writing, with a timestamp — the reporting date is the fact the whole liability analysis turns on.</p>
        </div>
      </Section>

      <Section id="evidence" title="Digital Evidence That Holds Up">
        <p>Cyber cases are built almost entirely on electronic records, and their admissibility is governed by Sections 61 to 63 of the Bharatiya Sakshya Adhiniyam, 2023. Evidence gathered carelessly in the panic of the first day is the most common weakness in an otherwise good complaint.</p>
        <DataTable headers={['Do', 'Instead of']} rows={[
          ['Preserve the whole conversation with dates and identifiers visible', 'Cropped screenshots of individual messages'],
          ['Keep the original device unformatted', 'Resetting the phone to remove the intrusion'],
          ['Record the full profile URL and account handle', 'A screenshot with no link, taken after takedown'],
          ['Save transaction IDs, UTRs and beneficiary account details', 'A description of the amount from memory'],
          ['Export email with full headers', 'A forwarded copy that loses the routing information'],
          ['Keep call logs and the numbers used', 'Deleting the numbers after blocking them'],
          ['Note a dated chronology as events happen', 'Reconstructing the sequence weeks later'],
          ['Keep every bank and portal acknowledgement', 'Relying on a verbal assurance from a call centre']
        ]} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Identity proof of the complainant', 'Complaint verification'],
          ['Mobile number and email used', 'Mapping the affected digital accounts'],
          ['Incident chronology', 'Date-wise clarity on what happened'],
          ['Screenshots of chats, calls and messages', 'Primary digital evidence'],
          ['Bank statement', 'Transaction trail'],
          ['UPI ID, UTR and transaction references', 'Fund movement tracking'],
          ['Beneficiary account details', 'Trace and freeze requests'],
          ['Fake website, app or profile links', 'Platform and investigation support'],
          ['Email headers, where available', 'Email fraud analysis'],
          ['Call logs and numbers used', 'Identifying the contact channel'],
          ['Device details', 'Technical investigation support'],
          ['Police or portal acknowledgement', 'Follow-up and escalation'],
          ['Bank complaint reference', 'Liability and refund strategy'],
          ['Company authorisation, for a business complaint', 'Authority to complain on behalf of the entity']
        ]} />
      </Section>

      <Section id="process" title="How We Run the Matter">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Initial consultation', 'Incident and urgency assessment'],
          ['2', 'Evidence preservation', 'Screenshots, bank trail, URLs, chats and device details secured'],
          ['3', 'Legal mapping', 'IT Act, BNS, BNSS and BSA provisions identified'],
          ['4', 'Reporting guidance', '1930 and portal route, with acknowledgement tracking'],
          ['5', 'Bank and platform coordination', 'Freeze, dispute or takedown requests'],
          ['6', 'Complaint drafting', 'A structured complaint for the cyber cell or police station'],
          ['7', 'FIR or Zero FIR support', 'Registration strategy aligned to BNSS Section 173'],
          ['8', 'Follow-up and escalation', 'SP representation or Magistrate route where required'],
          ['9', 'Recovery or resolution strategy', 'Refund, de-freeze or further legal action'],
          ['10', 'Ongoing tracking', 'Ticket-based updates on complaint, police and bank status']
        ]} />
      </Section>

      <Section id="stakeholders" title="Who Does What">
        <p>Cyber fraud investigation depends on fast coordination between parties who do not share a system. Knowing which one to press, and for what, saves days.</p>
        <DataTable headers={['Stakeholder', 'Role']} rows={[
          ['Police and cyber cell', 'Registration, investigation, notices, tracing and FIR action'],
          ['Your bank', 'Dispute handling, customer liability assessment and beneficiary follow-up'],
          ['Beneficiary bank', 'Holding or freezing the receiving account on a valid request'],
          ['Payment app or wallet', 'Transaction, merchant and wallet trail details'],
          ['Telecom operator', 'SIM, KYC and call record support through legal process'],
          ['Platform or social media company', 'Takedown, content preservation and user data through legal process'],
          ['CERT-In', 'Incident reporting framework for covered organisations']
        ]} />
      </Section>

      <Section id="business" title="Cyber Crime Against Businesses">
        <p>For a business, cybercrime rarely arrives as a single fraudulent debit. It arrives as a compromised mailbox that redirected a customer payment, an employee who left with the customer database, or a vendor account that turned out to be fake.</p>
        <DataTable headers={['Situation', 'What the response needs']} rows={[
          ['Business email compromise', 'Email header review, bank trail and police complaint'],
          ['Vendor payment fraud', 'Invoice, purchase order, bank and email verification'],
          ['Employee data theft', 'Access logs, device records and legal notice'],
          ['Fake company profile or listing', 'Platform complaint and legal escalation'],
          ['Customer data breach', 'Incident response and a reporting obligation assessment'],
          ['Operating account frozen', 'Source-of-funds and transaction explanation, urgently'],
          ['Online defamation', 'Notice, takedown and reputation strategy'],
          ['Ransom or extortion demand', 'Complaint, evidence preservation and a decision not taken alone']
        ]} />
      </Section>

      <Section id="cert-in" title="CERT-In Reporting for Organisations">
        <p>Where the victim is an organisation rather than an individual, a second obligation may run alongside the complaint. The CERT-In Directions of 28 April 2022 require covered entities — service providers, intermediaries, data centres, body corporates and government organisations — to report specified cyber incidents to CERT-In within <strong>six hours</strong> of noticing them or being made aware of them.</p>
        <p>This is a separate track from the police complaint, with its own timeline and recipient, and it is easy to miss while the business is focused on containment. For the full readiness picture, including log retention and escalation design, see <Link href="/solutions/legal/cyber-security-advisory">Cyber Security Advisory</Link>.</p>
      </Section>

      <Section id="freeze" title="Frozen Bank Accounts">
        <p>A growing share of the cyber matters we see involve people whose accounts were frozen because funds connected to someone else&rsquo;s fraud passed through them — sometimes several transfers downstream, and often where the account holder did nothing wrong. Merchants receiving customer payments are particularly exposed.</p>
        <DataTable headers={['What to assemble', 'Why']} rows={[
          ['Source-of-funds documentation', 'Shows where the credited amount legitimately came from'],
          ['Complete transaction trail', 'Places the disputed credit in normal business context'],
          ['Invoices, orders and customer records', 'Establishes the commercial reason for the receipt'],
          ['KYC and onboarding records', 'Shows the counterparty was properly identified'],
          ['Correspondence with the bank', 'Creates a record of prompt and cooperative conduct'],
          ['A written representation to the investigating officer', 'The freeze is usually lifted through the investigation, not the branch']
        ]} />
        <p>Act quickly. For a business, a frozen operating account stops payroll and vendor payments within days, and the practical damage often exceeds the disputed amount many times over.</p>
      </Section>

      <Section id="defence" title="Defence Side Support">
        <p>Not everyone named in a cyber complaint is a fraudster. Accounts get caught in layered transaction trails, employees get accused during acrimonious exits, and business disputes get recast as cyber offences.</p>
        <DataTable headers={['Situation', 'What the review covers']} rows={[
          ['Bank account frozen', 'Source of funds and transaction trail'],
          ['Cyber police notice received', 'Response strategy and supporting documents'],
          ['False online fraud allegation', 'Evidence and communication review'],
          ['Business account received disputed funds', 'Merchant and transaction documentation'],
          ['Employee accused of data theft', 'Device and access log review'],
          ['Social media complaint received', 'Content and platform policy review'],
          ['Cyber FIR registered', 'Bail, quashing and defence route mapping'],
          ['Company named in a complaint', 'Authorised response and internal investigation']
        ]} />
        <p>Handle this carefully. A casual reply can create admissions that are difficult to walk back, and a delayed response tends to harden the investigation&rsquo;s working assumption. Where an FIR has been registered, see <Link href="/solutions/legal/bail-application">Bail Application</Link> and <Link href="/solutions/legal/court-proceedings">Court Proceedings</Link>.</p>
      </Section>

      <Section id="common-issues" title="Why Complaints Fail">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Reported late', 'Funds have already been layered', 'Immediate 1930, portal and bank reporting'],
          ['Incomplete screenshots', 'Evidence lacks context and continuity', 'Digital evidence checklist'],
          ['Missing UTR or transaction ID', 'Tracing becomes impractical', 'Bank statement and transaction mapping'],
          ['Complaint written emotionally', 'The offence is not identifiable from the narrative', 'Structured, fact-led drafting'],
          ['Fake profile deleted before capture', 'The evidence disappears with the takedown', 'URL, screenshot and archive guidance before reporting'],
          ['Repealed section references used', 'Mismatch with the current criminal law framework', 'Drafting aligned to IT Act, BNS, BNSS and BSA'],
          ['Account frozen without explanation', 'Business operations stop', 'Transaction trail and de-freeze representation'],
          ['Organisational breach not reported', 'A separate CERT-In obligation missed', 'Incident documentation and reporting review'],
          ['No follow-up after the portal complaint', 'The matter goes quiet and stays quiet', 'Ticket-based tracking and escalation']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Urgent reporting support', '1930, portal and bank reporting in the first hours'],
          ['Digital evidence review', 'Preservation and organisation under BSA requirements'],
          ['Complaint drafting', 'Structured complaints for the cyber cell or police station'],
          ['FIR strategy', 'Registration, Zero FIR and escalation under the BNSS'],
          ['Bank representation', 'Customer liability position and dispute follow-up'],
          ['Account freeze support', 'Source-of-funds documentation and representations'],
          ['Platform coordination', 'Takedown requests and content preservation'],
          ['CERT-In reporting review', 'For covered organisations, alongside the complaint'],
          ['Notice reply and defence', 'Considered responses to cyber police notices'],
          ['Settlement and recovery strategy', 'Where a civil route runs alongside the complaint'],
          ['Advocate coordination', 'Briefing, chronology and evidence file'],
          ['Ticket-based tracking', 'Status across bank, portal, police and platform']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“The strongest cyber complaint is not the longest one. It is the one filed the same day, supported by a clean chronology, a complete transaction trail, evidence preserved in the form the law expects, and the correct provision named. Everything that makes a complaint work is decided in the first few hours.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Offence classification, applicable provisions, liability outcomes and available remedies depend entirely on the facts, and recovery in cyber fraud can never be assured. Bank liability outcomes depend on the RBI framework as applied by the bank&rsquo;s board-approved policy and on the facts of the individual transaction. Statutory positions stated here are as at September 2026 and parts of this guide remain under professional review. Estabizz provides complaint drafting, evidence review, documentation, reporting strategy and coordination support; appearance is through enrolled advocates. Confirm the position with your advocate before acting.</p>
      </Section>
    </ServicePageLayout>
  );
}
