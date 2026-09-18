'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'ISNP Security Audit: Quick Overview' },
  { id: 'what-is', title: 'What the ISNP Security Audit Is' },
  { id: 'terminology', title: 'A Note on the Term “ISNP Certification”' },
  { id: 'regulatory-basis', title: 'Regulatory Basis' },
  { id: 'who-needs', title: 'Who Needs an ISNP Security Audit' },
  { id: 'auditor-qualification', title: 'Who Can Perform the Audit' },
  { id: 'scope', title: 'What the Audit Covers' },
  { id: 'application-security', title: 'Application Security and VAPT' },
  { id: 'payment-flows', title: 'Payment and Premium Flows' },
  { id: 'data-protection', title: 'Policyholder Data Protection' },
  { id: 'monitoring', title: 'Logging, Monitoring and Audit Trail' },
  { id: 'network-isms', title: 'Network, Infrastructure and ISMS' },
  { id: 'deliverables', title: 'What You Receive' },
  { id: 'process', title: 'Step-by-Step Audit Process' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'annual', title: 'Annual Re-Audit and Continuing Obligations' },
  { id: 'fits-with-registration', title: 'How This Fits With ISNP Registration' },
  { id: 'common-findings', title: 'Findings That Commonly Delay Launch' },
  { id: 'preparation', title: 'How to Prepare Before Scoping' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our Compliance Expert' }
];

const faqs = ([
  ['What is an ISNP security audit?', 'It is the independent security review of an Insurance Self-Network Platform that IRDAI expects before the platform is used to sell or service insurance, and on a recurring basis afterwards. It examines the platform as an operating system end to end rather than as a generic web application.'],
  ['Is the audit mandatory?', 'For an entity operating an ISNP, an independent security review is part of the compliance expectation rather than an optional assurance exercise. Confirm the current requirement and its exact wording against the applicable IRDAI guidance for your category of applicant.'],
  ['Who can carry out the audit?', 'IRDAI expects an external, independent and suitably qualified auditor. In practice this means a CERT-In empanelled organisation, or an equivalently qualified professional such as a CISA or DISA (ICAI) holder.'],
  ['What is CERT-In empanelment?', 'It is a status granted to an auditing firm by the Indian Computer Emergency Response Team. It is the auditor qualification recognised across Indian financial-sector supervision, which is why it is the usual benchmark for ISNP work.'],
  ['When does the audit have to happen?', 'Before the platform goes live, and then on a recurring annual cycle. A platform that has changed materially since its last review is usually re-scoped rather than carried forward on the old report.'],
  ['How long does an audit take?', 'Typically three to six weeks from scoping to final report. Engagements that uncover substantial remediation work run longer, because critical and high findings are normally retested before the report is closed.'],
  ['What does the audit cover?', 'Five areas in the usual scoping:', ['Application security and VAPT across the web portal, mobile apps and APIs', 'Payment gateway integration, premium collection, refunds and settlement paths', 'Policyholder data protection across proposal, KYC, medical, financial and policy data', 'Logging, alerting and audit trail', 'Network architecture, server and cloud configuration, and ISMS alignment']],
  ['Does it include penetration testing?', 'Yes. Application security work is normally vulnerability assessment and penetration testing against the OWASP Top 10, covering the web portal, mobile applications and the APIs behind them.'],
  ['Why are payment flows scoped separately?', 'Because the issuance and payment path is where regulatory harm concentrates. The scope usually follows that path end to end, including the integrations on either side of it, rather than testing the payment page in isolation.'],
  ['What is delivered at the end?', 'The usual deliverable set is:', ['An audit report setting out scope, methodology and findings', 'Risk-rated findings with severity and remediation guidance', 'An executive summary written for the board', 'Independent retesting of critical and high findings', 'A signed audit certificate from the empanelled firm']],
  ['Is the report filed with IRDAI?', 'The report is prepared in a form suitable for filing, covering scope, methodology, control status, findings, evidence references and attestation. Confirm the filing route and timing that applies to your entity before submission.'],
  ['What happens if findings are severe?', 'Findings capable of harming policyholders are escalated rather than simply logged. Severe findings ordinarily have to be remediated and retested before the platform is treated as ready.'],
  ['Does this replace ISNP registration?', 'No. Registration is the IRDAI permission to set up the platform. The security audit is the assurance step that sits inside that compliance picture and recurs after approval.'],
  ['Is this the same as ISO 27001?', 'No. ISO 27001 certifies an information security management system against an international standard. The ISNP audit is a sector-specific review of one platform against IRDAI’s expectations. ISMS alignment often forms part of the audit scope, but the two are not interchangeable.'],
  ['Do we need ISO 27001 as well?', 'It is not a substitute for the ISNP audit. Many insurers and intermediaries hold it because it makes the network and ISMS portion of the audit considerably easier to evidence.'],
  ['Can our internal security team do the audit?', 'No. The review has to be external and independent. Internal testing is useful preparation but does not satisfy the independence expectation.'],
  ['What if we use a third-party platform vendor?', 'The obligation sits with the regulated entity operating the ISNP, not the vendor. Vendor and third-party risk is itself an area the audit looks at, so a shared or white-labelled platform tends to widen scope rather than narrow it.'],
  ['Does the audit cover our cloud environment?', 'Yes, where the platform runs on it. Server and cloud configuration review is part of the infrastructure portion of the scope.'],
  ['How does the DPDP Act affect this?', 'The Digital Personal Data Protection Act, 2023 applies to the personal data an ISNP processes, alongside the IT Act, 2000. Data protection controls examined in the audit should be read against both, not against the IT Act alone.'],
  ['What is retesting?', 'After remediation, the auditor independently re-examines the critical and high findings to confirm they are actually closed, rather than accepting a written assurance that the fix has been applied.'],
  ['How much does it cost?', 'It is scoped work, so cost depends on the number of applications and APIs, the complexity of the payment path, the hosting model and how much remediation is expected. We quote after scoping rather than from a rate card.'],
  ['What delays audits most often?', 'Incomplete environment access, a test environment that does not mirror production, undocumented APIs, and remediation cycles that need more than one round of retesting.'],
  ['Do we need a separate audit for the mobile app?', 'Not a separate engagement, but the mobile application is its own scope item within the audit, alongside the web portal and the APIs.'],
  ['What if the platform changes after the audit?', 'A material change to the platform, its payment path or its hosting usually warrants re-scoping rather than relying on the previous report.'],
  ['Who signs the audit certificate?', 'The CERT-In empanelled firm that performed the work. The certificate is issued by the auditor, not by IRDAI, and not by the entity being audited.'],
  ['Can a startup intermediary get through this?', 'Yes. The scope follows the platform, so a smaller, simpler platform is a smaller engagement. The independence and qualification expectations are the same regardless of size.'],
  ['What should we do before scoping?', 'Have the architecture and data-flow documentation current, the API inventory complete, a test environment that mirrors production, and named owners for remediation. These four things move the timeline more than anything else.'],
  ['Is an annual audit really required every year?', 'The framework expects the platform’s controls to be independently reviewed on a recurring basis, with the report available to the regulator. Treat it as an annual cycle and confirm the current position for your category.'],
  ['Does the audit look at KYC and AML controls?', 'Yes, where they are implemented in the platform. KYC and AML controls form part of the integrated review of the issuance path.'],
  ['Where can I read the underlying framework?', 'ISNP itself sits under the IRDAI Guidelines on Insurance e-Commerce dated 9 March 2017. The security expectations are read together with IRDAI’s information and cyber security guidance, which has been revised since. Confirm the current versions before relying on either.']
] as [string, string, string[]?][]).map(([q, a, points]) => ({ q, a, points }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function CardGrid({ cards, columns = 'md:grid-cols-2' }: { cards: Card[]; columns?: string }) {
  return <div className={`grid grid-cols-1 ${columns} gap-4 my-6`}>{cards.map((card) => <div key={card.title} className="rounded-xl border border-[rgba(0,150,220,0.12)] bg-white p-5 shadow-[0_4px_18px_rgba(0,100,200,0.04)]"><h3 className="!p-0 !mb-2 !text-[#0a1628]">{card.title}</h3><div className="text-[14px] leading-7 text-gray-600">{card.body}</div></div>)}</div>;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id}>{title}</h2>{children}</section>;
}

function Timeline({ steps }: { steps: { title: string; body: string }[] }) {
  return <div className="step-timeline">{steps.map((step, index) => <div className="step-item" key={step.title}><div className="step-dot" /><div className="step-card"><div className="step-label">Step {index + 1}</div><h3>{step.title}</h3><p>{step.body}</p></div></div>)}</div>;
}

function CheckList({ items }: { items: string[] }) {
  return <ul className="my-6 grid grid-cols-1 gap-2 md:grid-cols-2 !pl-0">{items.map((item) => <li key={item} className="flex items-start gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 text-[14px] leading-6 text-gray-700 !mb-0 list-none"><span className="text-[#10b981] font-bold shrink-0">✔</span><span>{item}</span></li>)}</ul>;
}

function FaqList({ items }: { items: { q: string; a: string; points?: string[] }[] }) {
  return <div className="space-y-3">{items.map((faq) => (
    <details className="faq-item" key={faq.q}>
      <summary>{faq.q}</summary>
      <div className="faq-answer"><p>{faq.a}</p>{faq.points && faq.points.length > 0 && <ul>{faq.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div>
    </details>
  ))}</div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '🔐', label: 'IRDAI Cyber Compliance' }, { emoji: '🧪', label: 'CERT-In Empanelled Audit' }, { emoji: '📋', label: 'Pre-Launch and Annual' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Regulatory Services', href: '/regulatory' }, { label: 'Insurance', href: '/regulatory/insurance' }, { label: 'ISNP Security Audit' }]}
      title="ISNP Security Audit for IRDAI Compliance"
      heroDescription={<><p>Before an <strong>Insurance Self-Network Platform</strong> is used to sell or service insurance, IRDAI expects its security controls to be independently reviewed by a suitably qualified external auditor — in practice a CERT-In empanelled firm — and reviewed again on a recurring basis afterwards. This guide sets out what that audit covers, who can perform it, what is delivered and how to prepare for it.</p><div className="flex flex-wrap gap-2 mt-5">{['CERT-In Empanelled Auditor', 'Application Security and VAPT', 'Payment and Premium Flows', 'Policyholder Data Protection', 'Logging and Audit Trail', 'Network and ISMS', 'Annual Re-Audit', 'DPDP Alignment'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Scope an ISNP Audit</Link><Link href="/irdai/isnp-registration" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">ISNP Registration Guide</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="14 min read"
      displayYear="2026"
      hideReviewBadge
      focusKeyword="ISNP Security Audit"
      sections={sections}
      ctaTitle="Get Audit Ready"
      ctaDescription="Discuss scoping, documentation, remediation planning, auditor coordination and the annual review cycle."
      quickFacts={[{ label: 'Applies to', value: 'IRDAI ISNP platforms' }, { label: 'Auditor', value: 'CERT-In empanelled' }, { label: 'When', value: 'Pre-launch, then annual' }, { label: 'Typical duration', value: '3–6 weeks' }, { label: 'Framework', value: 'Insurance e-Commerce, 2017' }]}
      relatedArticles={[
        { title: 'ISNP Registration in India', href: '/irdai/isnp-registration', category: 'IRDAI', description: 'The IRDAI permission to set up an Insurance Self-Network Platform — eligibility, Form ISNP-1 and process.' },
        { title: 'Insurance Repository Registration in India', href: '/regulatory/insurance/insurance-repository-registration-in-india', category: 'IRDAI', description: 'An IRDAI framework where cybersecurity readiness is a deciding approval factor.' },
        { title: 'LendTech Services India', href: '/rbi/lendtech-services', category: 'RBI', description: 'Digital lending data protection, localisation and audit-trail requirements.' }
      ]}
      finalCtaTitle="Build an ISNP That Survives the Audit"
      finalCtaDescription="Estabizz helps scope the review, close documentation gaps before testing starts, coordinate the empanelled auditor, track remediation through retesting and keep the platform ready for its next annual cycle."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to a Compliance Expert</Link><Link href="/irdai/isnp-registration" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">ISNP Registration Guide</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="ISNP Security Audit: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'What it is', body: 'An independent security review of an Insurance Self-Network Platform, examined as an operating system end to end rather than as a generic web application.' },
          { title: 'Who performs it', body: 'An external, independent and suitably qualified auditor — in practice a CERT-In empanelled organisation, or an equivalently qualified CISA or DISA (ICAI) professional.' },
          { title: 'When', body: 'Before the platform goes live, and again on a recurring annual cycle. A materially changed platform is re-scoped rather than carried forward.' },
          { title: 'What comes out of it', body: 'A report suitable for filing, risk-rated findings with remediation guidance, retesting of critical and high findings, and a signed certificate from the empanelled firm.' }
        ]} />
      </Section>

      <Section id="what-is" title="What the ISNP Security Audit Is">
        <p>An Insurance Self-Network Platform is the electronic platform — a website or mobile application — through which an insurer or a registered intermediary sells and services insurance policies online. Because that platform carries proposal data, KYC and medical records, premium payments and policy issuance, IRDAI does not treat it as ordinary technology. Its controls have to be independently reviewed before it is put in front of policyholders.</p>
        <p>The audit is that review. It is scoped around the platform itself: the issuance and payment path end to end, the applications and APIs that sit on it, the infrastructure underneath, and the integrations on either side. It is an assurance exercise against the regulator’s expectations, not a badge the platform displays.</p>
      </Section>

      <Section id="terminology" title="A Note on the Term “ISNP Certification”">
        <div className="info-box"><strong>ISNP stands for Insurance Self-Network Platform.</strong> It is an IRDAI framework, not a cybersecurity qualification. The phrase “ISNP certification” is widely used in the market, and it refers either to IRDAI’s permission to set up the platform or to the auditor’s certificate issued at the end of the security review described here. There is no standalone network-security credential called ISNP, and no certification body issues one. If you were looking for the IRDAI permission itself, see the <Link href="/irdai/isnp-registration">ISNP Registration guide</Link>.</div>
      </Section>

      <Section id="regulatory-basis" title="Regulatory Basis">
        <DataTable headers={['Element', 'Position']} rows={[
          ['Framework for ISNP itself', 'IRDAI Guidelines on Insurance e-Commerce dated 9 March 2017'],
          ['Permission to operate a platform', 'Granted by IRDAI on application in Form ISNP-1'],
          ['Security expectation', 'Independent review of the platform’s controls by an external, suitably qualified auditor'],
          ['Auditor qualification', 'CERT-In empanelled organisation, or equivalently qualified CISA or DISA (ICAI) professional'],
          ['Data protection overlay', 'Digital Personal Data Protection Act, 2023 alongside the Information Technology Act, 2000']
        ]} />
        <p>IRDAI’s information and cyber security guidance has been revised since the 2017 e-commerce guidelines were issued, and it names ISNPs as a category with their own audit scope. Confirm the current version of both before relying on any specific wording.</p>
      </Section>

      <Section id="who-needs" title="Who Needs an ISNP Security Audit">
        <p>The obligation follows whoever operates the platform:</p>
        <CheckList items={['Insurers running their own online sale and servicing platform', 'Insurance brokers operating an ISNP', 'Corporate agents operating an ISNP', 'Insurance web aggregators selling through their own platform', 'Any regulated entity whose ISNP has materially changed since its last review']} />
        <p>A tied individual agent cannot set up an independent ISNP and so does not commission this audit; they transact on the insurer’s platform, which the insurer has had reviewed.</p>
      </Section>

      <Section id="auditor-qualification" title="Who Can Perform the Audit">
        <p>Two things matter, and they are separate. The auditor must be <strong>external and independent</strong> of the entity being reviewed, and must be <strong>suitably qualified</strong>. Internal security testing is useful preparation but does not meet the first condition, however competent the team.</p>
        <p>In practice the recognised qualification is CERT-In empanelment — a status granted to an auditing firm by the Indian Computer Emergency Response Team, and the benchmark used across Indian financial-sector supervision. An equivalently qualified professional, such as a CISA or DISA (ICAI) holder, is the stated alternative.</p>
      </Section>

      <Section id="scope" title="What the Audit Covers">
        <p>Scoping normally settles on five areas. The distinguishing feature is that they are examined as one connected path rather than as separate tests.</p>
        <DataTable headers={['Area', 'What is examined']} rows={[
          ['Application security and VAPT', 'Web portal, mobile applications and APIs, tested against the OWASP Top 10'],
          ['Payment and premium flows', 'Payment gateway integration, premium collection, refunds and settlement paths'],
          ['Policyholder data protection', 'Proposal, KYC, medical, financial and policy data — encryption and access controls'],
          ['Logging, monitoring and audit trail', 'Evidence of continuous visibility over data processing'],
          ['Network, infrastructure and ISMS', 'Network architecture hardening, server and cloud configuration, ISMS alignment']
        ]} />
      </Section>

      <Section id="application-security" title="Application Security and VAPT">
        <p>Vulnerability assessment and penetration testing across every interface a policyholder or an insurer touches: the web portal, the mobile applications, and the APIs behind both. Testing is normally framed against the OWASP Top 10, with findings rated by severity rather than listed flat.</p>
        <p>Undocumented APIs are the usual source of scope creep here. An API inventory that is complete before scoping starts is the single most useful thing a platform team can prepare.</p>
      </Section>

      <Section id="payment-flows" title="Payment and Premium Flows">
        <p>The issuance and payment path is scoped end to end, including the integrations on either side of it, because that is where regulatory harm concentrates. A payment page tested in isolation tells the regulator very little about whether a premium can be collected, reconciled and refunded correctly under failure conditions.</p>
        <p>Refunds and settlement are part of this, not an afterthought — a platform that collects reliably but cannot evidence a clean refund path has a finding.</p>
      </Section>

      <Section id="data-protection" title="Policyholder Data Protection">
        <p>An ISNP holds some of the most sensitive categories of personal data a financial platform handles: proposal details, KYC documents, medical reports, financial information and the policy record itself. The audit examines how that data is encrypted at rest and in transit, and who can reach it.</p>
        <p>Read the controls against the <strong>Digital Personal Data Protection Act, 2023</strong> as well as the Information Technology Act, 2000. Access control, retention and breach handling are where the two frameworks meet in practice.</p>
      </Section>

      <Section id="monitoring" title="Logging, Monitoring and Audit Trail">
        <p>The expectation is evidence of continuous visibility over data processing, not a log file that exists somewhere. That means logging that captures the events that matter, alerting that fires on them, and an audit trail that can reconstruct what happened to a given proposal or policy after the fact.</p>
        <p>A trail that cannot be reconstructed is treated as absent, however much data is being written.</p>
      </Section>

      <Section id="network-isms" title="Network, Infrastructure and ISMS">
        <p>Network architecture hardening and configuration review of the servers or cloud environment the platform runs on, together with alignment to a recognised information security management system. Entities already holding ISO 27001 generally find this portion straightforward to evidence — but it is not a substitute for the audit, because ISO certifies a management system while this reviews one platform against IRDAI’s expectations.</p>
        <p>Where a third-party vendor supplies or hosts the platform, vendor and third-party risk widens the scope rather than narrowing it. The obligation stays with the regulated entity.</p>
      </Section>

      <Section id="deliverables" title="What You Receive">
        <CheckList items={['Audit report setting out scope, methodology and findings', 'Risk-rated findings with severity and remediation guidance', 'Executive summary written for the board', 'Independent retesting of critical and high findings', 'Signed audit certificate from the empanelled firm', 'Report structured for filing, with evidence references and attestation']} />
        <p>The certificate is issued by the auditor, not by IRDAI and not by the entity being audited. Findings capable of harming policyholders are escalated rather than simply recorded.</p>
      </Section>

      <Section id="process" title="Step-by-Step Audit Process">
        <Timeline steps={[
          { title: 'Scoping', body: 'Applications, APIs, payment path, hosting model and integrations are inventoried, and the boundary of the review is agreed.' },
          { title: 'Documentation review', body: 'Architecture, data-flow, access-control and vendor documentation are examined before testing begins.' },
          { title: 'Testing', body: 'Vulnerability assessment and penetration testing across the portal, mobile applications and APIs, plus configuration and network review.' },
          { title: 'Findings and rating', body: 'Findings are rated by severity with remediation guidance, and escalated where policyholders could be harmed.' },
          { title: 'Remediation', body: 'The platform team closes findings, with critical and high items prioritised because they gate the report.' },
          { title: 'Retesting', body: 'The auditor independently re-examines critical and high findings to confirm they are actually closed.' },
          { title: 'Report and certificate', body: 'The final report is issued in filing-ready form, with the signed certificate from the empanelled firm.' }
        ]} />
      </Section>

      <Section id="timeline" title="Timeline">
        <DataTable headers={['Stage', 'Indicative duration']} rows={[
          ['Scoping and documentation review', 'Roughly 1 week'],
          ['Testing', 'Roughly 1–2 weeks, depending on the number of applications and APIs'],
          ['Remediation', 'Driven by findings, not by the auditor'],
          ['Retesting and final report', 'Roughly 1 week'],
          ['Total, scoping to final report', 'Typically 3–6 weeks']
        ]} />
        <p>Engagements needing substantial remediation run longer, because critical and high findings are normally retested before the report closes. The remediation row is the one that moves — plan launch dates around it rather than around the testing window.</p>
      </Section>

      <Section id="annual" title="Annual Re-Audit and Continuing Obligations">
        <p>The review is not a one-off clearance. The framework expects the platform’s controls to be independently reviewed before it is operated and on a recurring annual basis thereafter, with the report available to the regulator.</p>
        <p>Between cycles, a material change to the platform, its payment path or its hosting normally warrants re-scoping rather than relying on the previous report. Treat the audit as a standing annual obligation and confirm the current position for your category of applicant.</p>
      </Section>

      <Section id="fits-with-registration" title="How This Fits With ISNP Registration">
        <p>These are two distinct steps and they are easy to conflate.</p>
        <DataTable headers={['', 'ISNP Registration', 'ISNP Security Audit']} rows={[
          ['What it is', 'IRDAI permission to set up the platform', 'Independent review of the platform’s security controls'],
          ['Who grants or issues it', 'IRDAI', 'The CERT-In empanelled auditor'],
          ['How it is applied for', 'Form ISNP-1, with the prescribed fee', 'Commissioned directly from a qualified auditor'],
          ['When', 'Before the platform is set up', 'Before it goes live, and annually thereafter'],
          ['Recurs?', 'Permission, subject to continuing conditions', 'Yes, on an annual cycle']
        ]} />
        <p>For the permission itself — eligibility, who may apply, Form ISNP-1 and the application process — see the <Link href="/irdai/isnp-registration">ISNP Registration guide</Link>.</p>
      </Section>

      <Section id="common-findings" title="Findings That Commonly Delay Launch">
        <CheckList items={['Undocumented or undiscovered APIs surfacing mid-test', 'A test environment that does not mirror production', 'Access controls that are role-based on paper but permissive in practice', 'Audit trails that record events but cannot reconstruct a transaction', 'Refund and settlement paths untested under failure conditions', 'Third-party or white-labelled components with no vendor assurance', 'Remediation without named owners, producing repeated retest cycles']} />
      </Section>

      <Section id="preparation" title="How to Prepare Before Scoping">
        <p>Four things move the timeline more than anything else, and all four are within the platform team’s control before the auditor is engaged:</p>
        <CheckList items={['Current architecture and data-flow documentation', 'A complete API inventory, including internal and partner APIs', 'A test environment that genuinely mirrors production', 'Named owners for remediation, with authority to ship fixes']} />
        <p>Closing documentation gaps before testing starts is considerably cheaper than discovering them as findings.</p>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps">
        <p>We work on the compliance side of the engagement rather than replacing the auditor:</p>
        <CheckList items={['Scoping support and readiness assessment before testing begins', 'Documentation and policy gap closure', 'Coordination with the CERT-In empanelled auditor', 'Remediation tracking through to retesting', 'Preparing the report for filing', 'Planning the annual review cycle']} />
      </Section>

      <Section id="faqs" title="FAQs">
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Disclaimer">
        <p>This guide is general information, not engagement-specific advice. ISNP requirements, audit expectations and the applicable IRDAI guidance change, and the scope of any particular review depends on the platform. Confirm the current position with IRDAI, your auditor and your professional adviser before acting.</p>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our Compliance Expert">
        <p>If you are preparing an Insurance Self-Network Platform for launch, or the annual review is due, <Link href="/contact">get in touch</Link> and we will help you scope it.</p>
      </Section>
    </ServicePageLayout>
  );
}
