'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'two-routes', title: 'Two Different Things Called Registration' },
  { id: 'why', title: 'Why You Will Need the Certificate' },
  { id: 'hma', title: 'Registering a Hindu Marriage' },
  { id: 'sma', title: 'The Special Marriage Act Route' },
  { id: 'other-laws', title: 'Christian, Parsi and Muslim Marriages' },
  { id: 'eligibility', title: 'Conditions That Must Be Met' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'witnesses', title: 'Witnesses' },
  { id: 'process', title: 'The Registration Process' },
  { id: 'framework', title: 'Regulatory Framework' },
  { id: 'provisions', title: 'Key Provisions' },
  { id: 'interfaith', title: 'Interfaith Couples' },
  { id: 'nri', title: 'NRI and Foreign National Marriages' },
  { id: 'apostille', title: 'Using the Certificate Abroad' },
  { id: 'delay', title: 'Registering a Marriage Years Later' },
  { id: 'corrections', title: 'Corrections and Name Mismatches' },
  { id: 'second-marriage', title: 'Second Marriages' },
  { id: 'common-issues', title: 'Where Applications Get Stuck' },
  { id: 'services', title: 'Our Services' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-insight', title: 'Expert Insight' },
  { id: 'disclaimer', title: 'Disclaimer' }
];

const faqs = ([
  ['What is marriage registration?', 'The official recording of a marriage with the competent authority, resulting in a marriage certificate — the standard proof that the marriage took place.'],
  ['Is registration compulsory?', 'The Supreme Court in Seema v. Ashwani Kumar directed States to provide for compulsory registration of marriages, and States have made rules accordingly. The practical position differs by State, but as a matter of everyday necessity the certificate is close to essential.'],
  ['Does registration make the marriage valid?', 'No. Registration records a marriage; it does not by itself create or validate one. A marriage that did not satisfy the conditions of the applicable law is not cured by being registered.'],
  ['What is the difference between registering a marriage and a court marriage?', 'Registering a marriage records a ceremony that has already taken place. A court marriage under the Special Marriage Act solemnises the marriage itself before a Marriage Officer, with its own notice and objection procedure. They are different processes with different timelines.'],
  ['Which route applies to us?', 'If you married by Hindu ceremonies, Section 8 of the Hindu Marriage Act and your State rules. If you want a civil marriage, or you are an interfaith couple not converting, the Special Marriage Act. Christian and Parsi marriages have their own statutes.'],
  ['How long after the wedding can we register?', 'State rules commonly prescribe a period within which registration is expected, with provision for late registration on payment of a fee or with an affidavit or officer’s permission. Delay is usually curable, but it adds steps.'],
  ['Can we register a marriage from many years ago?', 'Generally yes, with additional proof of the marriage — photographs, invitation, witnesses who attended, and often an affidavit. Expect more scrutiny the longer the gap.'],
  ['What documents are needed?', 'Proof of identity, address and date of birth for both parties, proof of the marriage having taken place, photographs, and witnesses with their own identity proof. Requirements vary by State and route.'],
  ['How many witnesses?', 'Typically two or three depending on the route and the State, each with identity and address proof. Under the Special Marriage Act three witnesses are required at solemnisation.'],
  ['Is there a notice period?', 'For the Special Marriage Act route there is a notice period with a window for objections. Registration of an already-solemnised Hindu marriage under Section 8 does not involve that notice procedure.'],
  ['Do both of us have to be present?', 'Ordinarily yes, along with the witnesses. Some States permit limited flexibility, but presence should be planned for.'],
  ['Can an interfaith couple register?', 'Yes. Where neither party converts, the Special Marriage Act is the usual route. If one party has converted and the marriage was solemnised by the ceremonies of that religion, the corresponding personal law route may apply.'],
  ['Is there a Tatkal or fast-track option?', 'Some States offer an expedited registration service for an additional fee. Availability and conditions vary, so check your State.'],
  ['Can NRIs register a marriage in India?', 'Yes, subject to the applicable route, documents and presence requirements. Passport, visa and proof of residence are generally required, and planning around travel matters.'],
  ['Can a foreign national marry and register in India?', 'Yes, usually through the Special Marriage Act route, with passport, visa, a no-impediment or single-status certificate from their embassy, and proof of residence for the required period.'],
  ['We married abroad. Can we register in India?', 'The position depends on where and how the marriage took place and the applicable law. Marriages of Indian citizens abroad may be registrable under the Foreign Marriage Act framework, and a foreign certificate may need attestation for use here. It should be assessed on the facts.'],
  ['Will we need the certificate for a visa?', 'Almost certainly, for a spouse or dependant visa, and for immigration generally. It is also commonly required for passports, bank and insurance nominations, and employer records.'],
  ['What is apostille, and do we need it?', 'An authentication for use abroad under the Hague Apostille Convention for member countries; for other countries, consular legalisation is used instead. If the certificate will be used overseas, plan this in advance.'],
  ['Our names are spelt differently on different documents. Is that a problem?', 'It is the most common cause of delay. Resolve the mismatch — usually with an affidavit and supporting documents — before applying rather than at the counter.'],
  ['Can a married name be changed through registration?', 'Registration records the marriage. Changing a name on other records is a separate process, generally by affidavit and then updating each document.'],
  ['What if one of us was married before?', 'The earlier marriage must have been lawfully dissolved or ended. The divorce decree or the death certificate of the former spouse will be required, and a subsisting earlier marriage makes the second one invalid.'],
  ['Can registration be refused?', 'Yes, where the conditions of the applicable law are not satisfied, documents are incomplete or the marriage itself is not valid. A refusal should be addressed on its stated ground rather than by reapplying blindly.'],
  ['Can we get a duplicate certificate?', 'Yes, from the issuing authority, on application with the relevant details.'],
  ['What is the biggest mistake?', 'Treating it as a formality to be done later. Couples discover the gap when a visa, a passport, a bank nomination or an insurance claim depends on a certificate they never obtained.'],
  ['Can Estabizz handle this?', 'We handle route assessment, document verification, application preparation, witness and appointment planning, authority coordination, correction support and apostille or attestation coordination.']
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
      tags={[{ emoji: '', label: 'Legal' }, { emoji: '', label: 'Family Law' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Legal', href: '/solutions/legal' }, { label: 'Marriage Registration' }]}
      title="Marriage Registration"
      readTime="14 min read"
      hideReviewBadge
      focusKeyword="Marriage Registration"
      sections={sections}
      ctaTitle="Speak With a Documentation Expert"
      ctaDescription="Correct route, documents verified before the appointment, and the certificate in a form that will work for a visa."
      quickFacts={[
        { label: 'Hindu marriage', value: 'HMA Section 8' },
        { label: 'Civil route', value: 'Special Marriage Act' },
        { label: 'Registration', value: 'Records, not validates' },
        { label: 'Needed for', value: 'Visas and passports' }
      ]}
      relatedArticles={[
        { title: 'Court Marriage', href: '/solutions/legal/court-marriage', category: 'Legal', description: 'Civil marriage under the Special Marriage Act — eligibility, notice period, objections and the certificate.' },
        { title: 'Divorce and Marriage Consulting', href: '/solutions/legal/divorce-marriage-consulting', category: 'Legal', description: 'Which law governs your marriage and which remedy the facts support.' },
        { title: 'Mutual Divorce', href: '/solutions/legal/mutual-divorce', category: 'Legal', description: 'Section 13B, the two motions, waiver of the cooling-off period and settlement terms.' }
      ]}
      finalCtaTitle="Get It Before You Need It"
      finalCtaDescription="Nobody registers a marriage because they want a certificate. They do it because a visa application, a passport renewal or an insurance nomination has just stopped — and by then the appointment is urgent."
      heroDescription={<p>A marriage certificate is the document everything else asks for: spouse visas, passports, bank and insurance nominations, immigration, employer records, property and succession matters. Registration itself is usually straightforward — the delays come from the wrong route being chosen, documents that do not match each other, or a couple discovering at the counter that a name is spelt three different ways across their papers. Estabizz assists couples, interfaith couples, NRIs and foreign nationals with route assessment, document verification, application preparation, witness and appointment planning, authority coordination, late registration, corrections and apostille or attestation for overseas use.</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Speak With an Expert</Link><a href={whatsappUrl} className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50 dark:bg-[#141417] dark:border-[#27272b] dark:text-[#4f9dfb]">WhatsApp Estabizz</a></>}
    >
      <Section id="overview" title="Overview">
        <p><strong>In simple terms…</strong> registration is the official record of a marriage, and the certificate is the proof you will be asked for repeatedly.</p>
        <p>It is administrative work with legal consequences. Done properly it takes a short time; done without checking the route or the documents it can take months of repeat visits.</p>
        <p>If you want a civil marriage rather than to register one that has already happened, see <Link href="/solutions/legal/court-marriage">Court Marriage</Link> — that is a different process.</p>
      </Section>

      <Section id="quick-answer" title="Quick Answer">
        <p>Marriage registration is a statutory recording process, not a licence.</p>
        <p>Which route applies depends on how you married. The Supreme Court has directed States to provide for compulsory registration, and the practical reality is that the certificate is needed for a long list of ordinary purposes.</p>
      </Section>

      <Section id="two-routes" title="Two Different Things Called Registration">
        <div className="info-box" aria-label="Two routes">
          <p><strong>&ldquo;Marriage registration&rdquo; describes two quite different processes and people routinely arrive at the wrong counter.</strong> Registering an <em>already-solemnised</em> marriage — a wedding that took place by religious ceremonies — is a recording exercise under Section 8 of the Hindu Marriage Act or the corresponding State rules. Marrying <em>under</em> the Special Marriage Act is a solemnisation, with a notice period, a public objection window and a waiting time before the marriage happens at all.</p>
        </div>
        <DataTable headers={['Point', 'Registering a solemnised marriage', 'Marrying under the Special Marriage Act']} rows={[
          ['What it does', 'Records a marriage that already took place', 'Solemnises the marriage itself'],
          ['Typical provision', 'HMA Section 8 and State rules', 'Special Marriage Act, Chapter II and III'],
          ['Notice period', 'Not applicable', 'Notice published, with an objection window'],
          ['Objections', 'Not part of the process', 'Can be raised during the notice period'],
          ['Timeline', 'Short, once documents are in order', 'Longer, because of the notice period'],
          ['Suited to', 'Couples already married by ceremony', 'Interfaith couples, or anyone wanting a civil marriage'],
          ['Certificate', 'Marriage certificate', 'Marriage certificate'],
          ['Where people go wrong', 'Choosing the SMA route unnecessarily and waiting weeks', 'Assuming a ceremony can be registered under SMA without solemnisation']
        ]} />
      </Section>

      <Section id="why" title="Why You Will Need the Certificate">
        <DataTable headers={['Purpose', 'What depends on it']} rows={[
          ['Spouse or dependant visa', 'Almost always a mandatory document'],
          ['Passport', 'Name change and spouse details'],
          ['Immigration and residence applications', 'Proof of the relationship'],
          ['Bank and insurance nominations', 'Establishing the spouse relationship'],
          ['Employer records and benefits', 'Medical cover and dependant benefits'],
          ['Property and joint ownership', 'Proof of relationship'],
          ['Succession and inheritance', 'Evidence of the marriage'],
          ['Maintenance or matrimonial proceedings', 'Proof that the marriage exists'],
          ['Adoption and guardianship', 'Commonly required'],
          ['Government schemes and benefits', 'Commonly required']
        ]} />
      </Section>

      <Section id="hma" title="Registering a Hindu Marriage">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Provision', 'Section 8 of the Hindu Marriage Act, 1955, read with State rules'],
          ['Who it covers', 'Marriages solemnised between Hindus, Buddhists, Jains and Sikhs'],
          ['What is registered', 'A marriage already solemnised by ceremony'],
          ['Where', 'The office of the Registrar of Marriages for the area'],
          ['Jurisdiction basis', 'Usually where the marriage took place or where a party resides'],
          ['Proof of ceremony', 'Photographs, invitation card and witnesses'],
          ['Witnesses', 'As the State rules prescribe, with identity proof'],
          ['Presence', 'Both parties ordinarily required'],
          ['Timeline', 'Short once the application is complete'],
          ['Effect', 'Records the marriage; does not validate an invalid one']
        ]} />
      </Section>

      <Section id="sma" title="The Special Marriage Act Route">
        <DataTable headers={['Stage', 'What happens']} rows={[
          ['Notice of intended marriage', 'Given to the Marriage Officer of the district'],
          ['Residence requirement', 'At least one party must have resided in the district for the prescribed period'],
          ['Publication', 'The notice is published for objections'],
          ['Objection window', 'Objections may be raised during the notice period'],
          ['Inquiry into objections', 'The Marriage Officer decides, with an appeal route'],
          ['Solemnisation', 'Before the Marriage Officer, with three witnesses'],
          ['Declaration', 'Signed by the parties and witnesses'],
          ['Certificate', 'Entered in the Marriage Certificate Book and issued'],
          ['Also used for', 'Registering a marriage already solemnised in another form, under Chapter III']
        ]} />
        <p>The notice period is the part couples find frustrating. It is a feature of the statute rather than administrative delay — see <Link href="/solutions/legal/court-marriage">Court Marriage</Link> for the detail.</p>
      </Section>

      <Section id="other-laws" title="Christian, Parsi and Muslim Marriages">
        <DataTable headers={['Marriage', 'Framework', 'Practical note']} rows={[
          ['Christian marriage', 'Indian Christian Marriage Act, 1872', 'Solemnisation and registration through the licensed minister or Registrar'],
          ['Parsi marriage', 'Parsi Marriage and Divorce Act, 1936', 'Certificate signed and sent to the Registrar'],
          ['Muslim marriage', 'Nikah under Muslim personal law', 'Nikahnama is the primary record; State registration rules commonly also apply'],
          ['Any of the above', 'Special Marriage Act, Chapter III', 'Registration of a marriage already solemnised in another form is possible'],
          ['Interfaith without conversion', 'Special Marriage Act', 'The usual civil route'],
          ['State registration rules', 'Compulsory registration rules framed by States', 'Often apply across communities']
        ]} />
      </Section>

      <Section id="eligibility" title="Conditions That Must Be Met">
        <DataTable headers={['Condition', 'Requirement']} rows={[
          ['Age', 'Bridegroom at least 21 and bride at least 18 years'],
          ['Neither party has a living spouse', 'A subsisting earlier marriage makes the second invalid'],
          ['Capacity to consent', 'Sound mind and valid consent'],
          ['Prohibited degrees of relationship', 'Outside them, unless custom permits'],
          ['Sapinda relationship', 'Outside it, unless custom permits'],
          ['Ceremony, where relevant', 'The marriage must actually have been solemnised'],
          ['Residence, for the SMA notice', 'As the Act prescribes'],
          ['Documentary consistency', 'Names and dates matching across documents']
        ]} />
        <div className="warning-box" aria-label="Registration does not validate">
          <p><strong>Registration records a marriage; it does not make an invalid marriage valid.</strong> If a condition of the applicable law was not met — a subsisting earlier marriage, for instance — obtaining a certificate does not cure it. Couples sometimes treat registration as a way of putting a questionable position beyond doubt. It is not.</p>
        </div>
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Application form', 'Signed by both parties'],
          ['Proof of date of birth for both', 'Age requirement'],
          ['Identity proof for both', 'Aadhaar, passport, voter ID or equivalent'],
          ['Address proof for both', 'Jurisdiction'],
          ['Passport-size photographs', 'Application and certificate'],
          ['Wedding photographs', 'Proof of solemnisation'],
          ['Marriage invitation card', 'Supporting proof'],
          ['Proof of ceremony', 'Priest certificate or equivalent, where applicable'],
          ['Witnesses with identity and address proof', 'As the route and State require'],
          ['Affidavit of marital status', 'Commonly required'],
          ['Divorce decree, if previously married', 'Proof the earlier marriage ended'],
          ['Death certificate of a former spouse', 'Where applicable'],
          ['Passport and visa', 'NRI or foreign national party'],
          ['No-impediment certificate', 'Commonly required for a foreign national'],
          ['Conversion certificate', 'Where a party converted before the ceremony']
        ]} />
        <p>Requirements vary by State and route. Verify the current checklist for your Registrar before the appointment rather than relying on a generic list.</p>
      </Section>

      <Section id="witnesses" title="Witnesses">
        <DataTable headers={['Point', 'Practical position']} rows={[
          ['How many', 'Typically two or three, depending on the route and State'],
          ['Special Marriage Act solemnisation', 'Three witnesses required'],
          ['Who can be a witness', 'An adult who can identify the parties'],
          ['Should they have attended the wedding', 'Preferable, and sometimes expected'],
          ['What they must bring', 'Their own identity and address proof, in original'],
          ['Presence', 'Required at the appointment'],
          ['Common failure', 'A witness arriving without original identity proof'],
          ['Planning', 'Confirm availability and documents a week ahead']
        ]} />
      </Section>

      <Section id="process" title="The Registration Process">
        <DataTable headers={['Step', 'Activity', 'Output']} rows={[
          ['1', 'Route assessment', 'Which statute and which office'],
          ['2', 'Eligibility check', 'Age, marital status and relationship conditions'],
          ['3', 'Document collection', 'Identity, age, address and proof of marriage'],
          ['4', 'Consistency check', 'Names, dates and spellings reconciled across documents'],
          ['5', 'Affidavits', 'Prepared and attested as required'],
          ['6', 'Application', 'Filed online or in person as the State provides'],
          ['7', 'Fee payment', 'As prescribed, including any expedited service'],
          ['8', 'Appointment', 'Date obtained and parties and witnesses confirmed'],
          ['9', 'Appearance', 'Both parties and witnesses before the Registrar'],
          ['10', 'Verification', 'Documents checked and the entry made'],
          ['11', 'Certificate issued', 'The marriage certificate'],
          ['12', 'Onward use', 'Apostille or attestation where it will be used abroad']
        ]} />
      </Section>

      <Section id="framework" title="Regulatory Framework">
        <DataTable headers={['Particular', 'Applicable framework']} rows={[
          ['Hindu marriages', 'Hindu Marriage Act, 1955, Section 8'],
          ['Civil and interfaith marriages', 'Special Marriage Act, 1954'],
          ['Registration of a marriage solemnised in another form', 'Special Marriage Act, Chapter III'],
          ['Christian marriages', 'Indian Christian Marriage Act, 1872'],
          ['Parsi marriages', 'Parsi Marriage and Divorce Act, 1936'],
          ['Muslim marriages', 'Muslim personal law, with State registration rules'],
          ['Marriages of Indian citizens abroad', 'Foreign Marriage Act, 1969, where applicable'],
          ['Compulsory registration', 'State rules following the direction in Seema v. Ashwani Kumar'],
          ['Authority', 'Registrar of Marriages or Marriage Officer'],
          ['Overseas use', 'Apostille under the Hague Convention, or consular legalisation'],
          ['Evidence', 'Bharatiya Sakshya Adhiniyam, 2023']
        ]} />
      </Section>

      <Section id="provisions" title="Key Provisions">
        <DataTable headers={['Provision', 'Practical relevance']} rows={[
          ['HMA Section 5', 'Conditions for a valid Hindu marriage'],
          ['HMA Section 7', 'Ceremonies of a Hindu marriage'],
          ['HMA Section 8', 'Registration of Hindu marriages'],
          ['HMA Sections 11 and 12', 'Void and voidable marriages'],
          ['SMA Section 4', 'Conditions relating to solemnisation'],
          ['SMA Sections 5 to 13', 'Notice, objections, solemnisation and the certificate'],
          ['SMA Chapter III', 'Registration of marriages celebrated in other forms'],
          ['Foreign Marriage Act, 1969', 'Marriages of Indian citizens outside India'],
          ['State registration rules', 'Compulsory registration, timelines and late fees'],
          ['Seema v. Ashwani Kumar', 'Supreme Court direction on compulsory registration']
        ]} />
      </Section>

      <Section id="interfaith" title="Interfaith Couples">
        <DataTable headers={['Situation', 'Route']} rows={[
          ['Neither party converts', 'Special Marriage Act — the civil route'],
          ['One party converts before the ceremony', 'The personal law of the religion in which the marriage was solemnised'],
          ['Already married by ceremony, want it recorded', 'Registration under the applicable law, or SMA Chapter III'],
          ['Notice period concerns', 'A feature of the SMA statute, with an objection window'],
          ['Family objection expected', 'Plan the process, including residence and timing, in advance'],
          ['Privacy', 'Discuss what the notice process involves before committing to it'],
          ['Documents', 'Conversion certificate where a conversion took place'],
          ['Safety concerns', 'Take advice early rather than mid-process']
        ]} />
      </Section>

      <Section id="nri" title="NRI and Foreign National Marriages">
        <DataTable headers={['Issue', 'What is required']} rows={[
          ['NRI party', 'Passport, visa and proof of address'],
          ['Foreign national party', 'Passport, valid visa and proof of residence for the prescribed period'],
          ['No-impediment certificate', 'From the embassy, commonly required for a foreign national'],
          ['Single status certificate', 'Where the authority requires it'],
          ['Documents in a foreign language', 'Certified translation'],
          ['Foreign documents', 'Attestation or apostille as required'],
          ['Presence', 'Plan travel around the appointment and any notice period'],
          ['Marriage solemnised abroad', 'Assess registrability in India on the facts'],
          ['Onward immigration use', 'Plan apostille or legalisation in advance']
        ]} />
      </Section>

      <Section id="apostille" title="Using the Certificate Abroad">
        <DataTable headers={['Point', 'Position']} rows={[
          ['Apostille', 'Authentication for use in Hague Apostille Convention countries'],
          ['Consular legalisation', 'For countries outside the Convention'],
          ['Who issues the apostille', 'The designated authority in India'],
          ['Prior steps', 'State-level authentication is commonly required first'],
          ['Translation', 'Where the destination country requires it'],
          ['Timing', 'Build it into the plan — it adds weeks, not days'],
          ['Validity concerns', 'Some authorities want a recently issued certificate'],
          ['Practical advice', 'Obtain extra certified copies while you are at it']
        ]} />
      </Section>

      <Section id="delay" title="Registering a Marriage Years Later">
        <DataTable headers={['Point', 'What to expect']} rows={[
          ['Is it possible', 'Generally yes, though with more scrutiny'],
          ['Late fee', 'Commonly prescribed by State rules'],
          ['Permission', 'Some States require the officer’s or a senior officer’s permission'],
          ['Additional proof', 'Photographs, invitation, and witnesses who attended'],
          ['Affidavit', 'Explaining the delay and confirming the marriage'],
          ['Witness availability', 'The real difficulty after many years'],
          ['Documents from the time', 'Anything contemporaneous helps considerably'],
          ['Where a spouse has died', 'A different and harder position — take advice'],
          ['Practical advice', 'Do it now rather than adding another year']
        ]} />
      </Section>

      <Section id="corrections" title="Corrections and Name Mismatches">
        <div className="warning-box" aria-label="Name mismatch">
          <p><strong>Inconsistent names and dates across documents are the single commonest reason an application stalls.</strong> A name spelt one way on a birth certificate, another on Aadhaar and a third on a passport will stop the application at verification. Reconcile it before the appointment — usually with an affidavit and supporting documents — rather than discovering it at the counter with witnesses waiting.</p>
        </div>
        <DataTable headers={['Issue', 'How it is addressed']} rows={[
          ['Spelling variation across documents', 'Affidavit of one and the same person, with supporting documents'],
          ['Date of birth mismatch', 'Resolve against the primary document first'],
          ['Name change after marriage', 'A separate process, after registration'],
          ['Error in the issued certificate', 'Correction application to the issuing authority'],
          ['Address changed since the ceremony', 'Current address proof, and jurisdiction confirmed'],
          ['Parent’s name variation', 'Affidavit and supporting records'],
          ['Duplicate certificate needed', 'Application to the issuing authority']
        ]} />
      </Section>

      <Section id="second-marriage" title="Second Marriages">
        <DataTable headers={['Point', 'Requirement']} rows={[
          ['Earlier marriage by divorce', 'Certified copy of the decree, and that it is final'],
          ['Appeal period', 'Confirm the decree is not under challenge'],
          ['Earlier spouse deceased', 'Death certificate'],
          ['Subsisting earlier marriage', 'The second marriage is invalid — registration will not cure it'],
          ['Disclosure', 'Marital status affidavit must be accurate'],
          ['Children from the earlier marriage', 'Not a bar, but relevant to other documents'],
          ['Maintenance obligations', 'Continue independently of remarriage'],
          ['Practical advice', 'Produce the decree with the application rather than on request']
        ]} />
      </Section>

      <Section id="common-issues" title="Where Applications Get Stuck">
        <DataTable headers={['Problem', 'Consequence', 'How we address it']} rows={[
          ['Wrong route chosen', 'Weeks lost on a notice period that was not needed', 'Route assessed at the outset'],
          ['Name or date mismatch', 'Application stopped at verification', 'Documents reconciled before the appointment'],
          ['Witness without original ID', 'Appointment wasted', 'Witness documents confirmed in advance'],
          ['No proof of ceremony', 'Registration refused', 'Photographs, invitation and witness evidence assembled'],
          ['Earlier marriage not documented', 'Application rejected', 'Decree or death certificate produced upfront'],
          ['Foreign national without no-impediment certificate', 'Delay while it is obtained', 'Embassy requirement planned early'],
          ['Residence requirement not met', 'SMA notice cannot be given', 'Checked before planning dates'],
          ['Late registration attempted without affidavit', 'Returned for compliance', 'Delay explained and permission sought'],
          ['Apostille left to the end', 'Visa timeline missed', 'Built into the plan from the start'],
          ['Only one certified copy obtained', 'Repeat applications later', 'Extra copies obtained at the time']
        ]} />
      </Section>

      <Section id="services" title="Our Services">
        <DataTable headers={['Service', 'What we do']} rows={[
          ['Route assessment', 'Which statute, which office and what timeline'],
          ['Eligibility review', 'Age, marital status and relationship conditions'],
          ['Document verification', 'Checked and reconciled before filing'],
          ['Mismatch resolution', 'Affidavits and supporting documentation'],
          ['Application preparation', 'Forms, affidavits and annexures'],
          ['Appointment and witness planning', 'Dates, presence and originals confirmed'],
          ['Authority coordination', 'Registrar or Marriage Officer liaison'],
          ['Special Marriage Act support', 'Notice, objection window and solemnisation'],
          ['Interfaith couple support', 'Route, documents and process planning'],
          ['NRI and foreign national support', 'Visa, residence and embassy documents'],
          ['Late registration', 'Affidavit, permission and additional proof'],
          ['Correction and duplicate', 'Applications to the issuing authority'],
          ['Apostille and attestation', 'For overseas use'],
          ['Post-registration updates', 'Guidance on passport, bank and nomination changes']
        ]} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-insight" title="Expert Insight">
        <p>{"“Almost every stalled registration we see fails on one of two things: the couple chose the Special Marriage Act route when they only needed to record a ceremony that had already happened, or their names are spelt three different ways across their documents. Both are fixed in an hour beforehand and cost weeks afterwards. And obtain more than one certified copy — you will be asked for it far more often than you expect.”"}<br />{"— "}<strong>CS Devyani Khambhati, Compliance Expert</strong></p>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not matter-specific legal advice. Marriage registration procedure, documents, fees, timelines and late registration rules are State-specific and change; the requirements of your Registrar should be confirmed before applying. Whether a marriage is valid depends on the applicable law and the facts, and registration does not cure a marriage that does not satisfy those conditions. Statutory positions stated here are as at October 2026 and parts of this guide remain under professional review. Estabizz provides route assessment, documentation and coordination support; appearance in any dispute is through enrolled advocates. Confirm the current State position before applying.</p>
      </Section>
    </ServicePageLayout>
  );
}
