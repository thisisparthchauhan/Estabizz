'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'IMF License: Quick Overview' },
  { id: 'what-is', title: 'What is an Insurance Marketing Firm License?' },
  { id: 'imf-model', title: 'Deeper Understanding of the IMF Model' },
  { id: 'regulatory-framework', title: 'Regulatory Framework' },
  { id: 'who-needs', title: 'Who Needs an IMF License?' },
  { id: 'scope-of-activities', title: 'Scope of Activities Allowed' },
  { id: 'restrictions', title: 'Regulatory Restrictions' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'principal-officer', title: 'Principal Officer: Critical Role' },
  { id: 'isp', title: 'Insurance Sales Person (ISP)' },
  { id: 'fit-and-proper', title: 'Fit and Proper Criteria' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'process', title: 'Step-by-Step Registration Process' },
  { id: 'fees', title: 'Fees Structure' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'comparison', title: 'IMF vs Corporate Agent vs Insurance Broker' },
  { id: 'business-model', title: 'Business Model and Revenue Streams' },
  { id: 'financial-planning', title: 'Financial Planning for IMF Setup' },
  { id: 'technology', title: 'Technology Integration' },
  { id: 'growth-potential', title: 'Growth Potential of IMF in India' },
  { id: 'post-registration', title: 'Post-Registration Compliance' },
  { id: 'rejection-reasons', title: 'Common Reasons for Rejection' },
  { id: 'compliance-risks', title: 'Practical and Hidden Compliance Risks' },
  { id: 'checklist', title: 'Advanced Compliance Checklist' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer and Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our IRDAI Compliance Expert' }
];

const faqs = ([
  ["What is an Insurance Marketing Firm (IMF) License in India?", "An IMF License is an authorisation issued by Insurance Regulatory and Development Authority of India allowing entities to distribute insurance products along with financial services. It permits selling life, general, and health insurance of multiple insurers."],
  ["Who regulates Insurance Marketing Firms in India?", "IMFs are regulated by Insurance Regulatory and Development Authority of India under the IMF Regulations, 2015 and subsequent amendments."],
  ["What activities can an IMF perform?", "An IMF can undertake:", ["Insurance distribution (life, general, health)", "Mutual fund distribution", "Pension products", "Other permitted financial services"]],
  ["Is IMF different from an Insurance Broker?", "Yes, IMFs have limited scope compared to brokers. Key differences:", ["IMF: Works with limited insurers", "Broker: Works with multiple insurers without restriction", "IMF has lower compliance requirements"]],
  ["What is the objective of introducing IMF License?", "The objective is to increase insurance penetration by enabling small businesses to distribute insurance in semi-urban and rural areas."],
  ["Can IMF sell policies from multiple insurers?", "Yes, but within limits prescribed by IRDAI:", ["Up to 2 life insurers", "Up to 2 general insurers", "Up to 2 health insurers"]],
  ["Is IMF License mandatory for selling insurance?", "Yes, if operating as a firm/entity. Individuals may act as agents, but firms must obtain IMF registration."],
  ["What is the legal framework governing IMFs?", "IMFs are governed by IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015."],
  ["Can IMF provide advisory services?", "No, IMFs cannot provide independent advisory like RIAs. They are primarily distributors."],
  ["Who is a Principal Officer in IMF?", "A Principal Officer is a key managerial person responsible for compliance and operations of the IMF."],
  ["Can IMF operate across India?", "Yes, subject to approval and branch expansion permissions under IRDAI guidelines."],
  ["Is IMF suitable for startups?", "Yes, IMFs are designed for:", ["Small businesses", "Financial consultants", "Entrepreneurs entering insurance distribution"]],
  ["What is IMF registration validity?", "Typically valid for 3 years, subject to renewal as per IRDAI guidelines."],
  ["Can IMF sell loans or banking products?", "Yes, IMFs can distribute certain financial products like loans under permitted activities."],
  ["Is IMF allowed to earn commission?", "Yes, commissions are regulated by IRDAI and paid by insurers."],
  ["Can IMF act as POS (Point of Sales)?", "Yes, IMF can appoint POS persons to sell simplified insurance products."],
  ["What is IMF registration category?", "It is a corporate insurance intermediary under IRDAI."],
  ["Can IMF operate digitally?", "Yes, digital platforms are allowed subject to compliance with IRDAI norms."],
  ["Who can apply for IMF License?", "Eligible applicants include:", ["Companies", "LLPs", "Partnership firms"]],
  ["What is the minimum net worth required for IMF?", "Minimum net worth is Rs.10 lakh as per IRDAI regulations."],
  ["Can an individual apply for IMF License?", "No, individuals cannot apply directly; they can work as Insurance Sales Persons."],
  ["Is prior insurance experience required?", "Yes, the Principal Officer must have relevant experience or qualifications."],
  ["What qualifications are required for Principal Officer?", "Typically:", ["Graduate degree", "IRDAI training certification", "Relevant experience"]],
  ["Can foreign entities apply for IMF?", "No, IMF must be an Indian entity as per regulatory guidelines."],
  ["Is GST registration required for IMF?", "Yes, GST registration is mandatory for commission-based income."],
  ["Can NBFC apply for IMF License?", "Yes, subject to compliance with both RBI and IRDAI regulations."],
  ["Can IMF operate in rural areas?", "Yes, IMFs are encouraged to expand in underserved regions."],
  ["Is office space mandatory?", "Yes, a registered office is required for approval."],
  ["Can a CA firm apply for IMF?", "Yes, provided it meets eligibility conditions and regulatory approvals."],
  ["Is there any fit and proper criteria?", "Yes, promoters and directors must satisfy “fit and proper” criteria as per IRDAI."],
  ["Can IMF be part-time business?", "No, it requires dedicated operations and compliance structure."],
  ["Is capital requirement refundable?", "No, it must be maintained continuously."],
  ["Can IMF appoint employees?", "Yes, including trained insurance sales persons."],
  ["Is PAN mandatory for IMF registration?", "Yes, PAN and other KYC documents are required."],
  ["What is the process to obtain IMF License?", "The process includes:", ["Application filing", "Document submission", "IRDAI scrutiny", "Approval grant"]],
  ["Where to apply for IMF License?", "Application is filed with Insurance Regulatory and Development Authority of India."],
  ["What is Form IMF-1?", "It is the prescribed application form for IMF registration."],
  ["Is physical submission required?", "Yes, both online and physical submissions may be required."],
  ["What happens after application submission?", "IRDAI reviews the application and may seek clarifications."],
  ["Is interview required for IMF approval?", "Yes, the Principal Officer may be interviewed."],
  ["Can application be rejected?", "Yes, if eligibility or documentation is inadequate."],
  ["Can rejected application be reapplied?", "Yes, after rectifying deficiencies."],
  ["Is there any pre-approval inspection?", "Yes, IRDAI may conduct verification."],
  ["What is the role of compliance officer?", "Ensures adherence to IRDAI norms."],
  ["Is training mandatory before application?", "Yes, certification is required."],
  ["Can consultant help in IMF registration?", "Yes, professional assistance improves approval chances."],
  ["Is there a registration certificate issued?", "Yes, upon approval IRDAI issues registration certificate."],
  ["Can IMF start immediately after approval?", "Yes, after completing onboarding with insurers."],
  ["What documents are required for IMF License application?", "Key documents include:", ["Certificate of Incorporation / LLP Agreement", "PAN, Aadhaar of directors", "Net worth certificate (CA certified)", "Business plan and projections"]],
  ["Is a business plan mandatory for IMF registration?", "Yes, a detailed business plan is required outlining:", ["Revenue model", "Target market", "Operational strategy"]],
  ["Is net worth certificate compulsory?", "Yes, it must be certified by a Chartered Accountant confirming Rs.10 lakh minimum net worth."],
  ["Are KYC documents required for promoters?", "Yes, PAN, Aadhaar, address proof and photographs are mandatory."],
  ["Is educational proof required for Principal Officer?", "Yes, qualification certificates must be submitted."],
  ["Is IRDAI training certificate required?", "Yes, mandatory certification must be completed before application."],
  ["Is office lease agreement required?", "Yes, proof of registered office such as lease agreement or ownership document is required."],
  ["Are financial statements required?", "Yes, audited financials or net worth declaration is required."],
  ["Is board resolution required?", "Yes, authorising application for IMF License."],
  ["Are MOA/AOA required for companies?", "Yes, constitutional documents must include insurance distribution as an object."],
  ["Is GST certificate required at application stage?", "Not mandatory initially but required before operations."],
  ["Is background verification conducted?", "Yes, IRDAI verifies promoters under “fit and proper” criteria."],
  ["What is the government fee for IMF License?", "The application fee is Rs.5,000 as per IRDAI regulations."],
  ["What is the registration fee for IMF?", "Registration fee is Rs.50,000 payable upon approval."],
  ["Are there renewal fees for IMF License?", "Yes, renewal fees apply every 3 years."],
  ["What is the total cost of setting up IMF?", "Approximate cost includes:", ["Government fees", "Professional fees", "Infrastructure setup"]],
  ["Are there hidden costs in IMF setup?", "Yes, such as:", ["Compliance costs", "Employee training", "Technology setup"]],
  ["Is net worth amount usable for business?", "Yes, but it must be maintained continuously."],
  ["Do IMFs pay commission to IRDAI?", "No, commissions are received from insurers."],
  ["Is GST applicable on IMF income?", "Yes, GST is applicable on commission earnings."],
  ["Are compliance costs recurring?", "Yes, including:", ["Audit", "Reporting", "Renewals"]],
  ["Can IMF operate with low investment?", "Yes, IMF is considered a low-cost entry model in insurance distribution."],
  ["How long does it take to get IMF License?", "Typically 2–4 months, subject to documentation and IRDAI review."],
  ["What delays IMF approval?", "Common reasons:", ["Incomplete documents", "Non-compliance with eligibility", "Poor business plan"]],
  ["Does IRDAI take interviews?", "Yes, Principal Officer may be interviewed for assessment."],
  ["Can approval be expedited?", "No formal fast-track exists; proper documentation helps faster approval."],
  ["What happens after approval?", "IMF must:", ["Tie-up with insurers", "Start operations", "Ensure compliance"]],
  ["Is provisional approval granted?", "No, final approval is issued upon satisfaction."],
  ["Can IMF operate before approval?", "No, it is strictly prohibited."],
  ["How to track IMF application status?", "Through IRDAI communication and official correspondence."],
  ["Is there a validity period for approval?", "Yes, license must be renewed every 3 years."],
  ["What if approval is delayed?", "Follow-up with regulator and rectify queries promptly."],
  ["What are post-registration compliances for IMF?", "Key compliances include:", ["Periodic reporting", "Maintaining net worth", "Regulatory filings"]],
  ["Is audit mandatory for IMF?", "Yes, financial and compliance audits are required."],
  ["Can IMF expand branches?", "Yes, subject to IRDAI approval."],
  ["Is record maintenance required?", "Yes, transaction and client records must be maintained."],
  ["Are IMFs subject to inspections?", "Yes, IRDAI may conduct inspections."],
  ["Can IMF appoint POS persons?", "Yes, with proper certification and training."],
  ["Is grievance redressal mandatory?", "Yes, IMFs must establish grievance mechanisms."],
  ["Is compliance officer mandatory?", "Yes, for regulatory adherence."],
  ["Are there reporting requirements?", "Yes, periodic returns must be filed with IRDAI."],
  ["Can IMF change Principal Officer?", "Yes, with prior approval from IRDAI."],
  ["What happens if IMF operates without license?", "It is illegal and may attract penalties under IRDAI regulations."],
  ["What are penalties for non-compliance?", "Penalties may include:", ["Monetary fines", "Suspension", "Cancellation of license"]],
  ["Can IMF license be cancelled?", "Yes, for serious violations or misconduct."],
  ["What are common compliance risks?", "", ["Mis-selling", "Non-reporting", "Data breaches"]],
  ["Is mis-selling punishable?", "Yes, strict action is taken under regulatory guidelines."],
  ["Can IMF be blacklisted?", "Yes, for repeated violations."],
  ["What if net worth falls below requirement?", "License may be suspended unless rectified."],
  ["Are directors liable for violations?", "Yes, under “fit and proper” criteria."],
  ["Can IRDAI impose penalties anytime?", "Yes, based on inspection findings."],
  ["Is fraud treated strictly?", "Yes, severe penalties and legal action may follow."],
  ["Can I start an IMF business from home?", "No, a registered office is mandatory. However, operations can be partly remote if:", ["Office proof is submitted", "Compliance setup is maintained"]],
  ["Can a CA or consultant run an IMF alongside practice?", "Yes, but only if conflict of interest is avoided and regulatory guidelines are followed."],
  ["Can IMF sell insurance online through a website?", "Yes, digital selling is allowed subject to:", ["IRDAI guidelines", "Data security compliance"]],
  ["What happens if my IMF application is rejected?", "You can reapply after correcting deficiencies highlighted by IRDAI."],
  ["Can IMF tie up with more than allowed insurers?", "No, exceeding limits violates regulations and may attract penalties."],
  ["Can IMF operate in multiple states?", "Yes, expansion is allowed with proper branch approvals."],
  ["Can IMF hire freelancers or agents?", "Yes, but they must be certified Insurance Sales Persons."],
  ["What happens if IMF fails to renew license?", "Operations must stop immediately until renewal is completed."],
  ["Can IMF shift its registered office?", "Yes, with prior intimation and approval from Insurance Regulatory and Development Authority of India."],
  ["Can IMF operate multiple businesses under same entity?", "Yes, but insurance activity must remain compliant and separate in records."],
  ["Can IMF earn income from multiple sources?", "Yes, including:", ["Insurance commissions", "Financial product distribution"]],
  ["Can IMF collaborate with fintech platforms?", "Yes, subject to compliance with digital and insurance regulations."],
  ["What happens if an IMF mis-sells a policy?", "It may lead to:", ["Penalties", "Customer complaints", "Regulatory action"]],
  ["Can IMF provide doorstep services?", "Yes, especially in rural and semi-urban areas."],
  ["Can IMF appoint sub-agents?", "Yes, but only as certified sales persons under regulatory framework."],
  ["What if Principal Officer resigns suddenly?", "Replacement must be appointed immediately with IRDAI approval."],
  ["Can IMF switch insurers after tie-up?", "Yes, but within prescribed limits and with proper documentation."],
  ["Can IMF operate without physical infrastructure after approval?", "No, maintaining office infrastructure is mandatory."],
  ["Can IMF be converted into Insurance Broker later?", "Yes, but fresh registration and higher compliance are required."],
  ["Can IMF use third-party CRM or software?", "Yes, provided data protection and regulatory compliance are ensured."],
  ["What are “fit and proper” criteria for IMF promoters?", "As per regulatory guidelines, promoters must:", ["Have clean financial history", "No criminal background", "Demonstrate integrity"]],
  ["Can IMF be subject to AML compliance?", "Yes, IMFs must comply with anti-money laundering guidelines under applicable laws."],
  ["Are IMFs required to comply with data protection laws?", "Yes, including safeguarding customer data and maintaining confidentiality."],
  ["Can IMF engage in cross-selling financial products?", "Yes, within permitted activities and regulatory framework."],
  ["What governance structure is required for IMF?", "Key elements include:", ["Principal Officer", "Compliance function", "Internal controls"]],
  ["Can IMF outsource operations?", "Limited outsourcing is allowed, but core compliance cannot be outsourced."],
  ["What is the role of IRDAI inspections for IMF?", "Inspections ensure:", ["Regulatory compliance", "Fair practices", "Customer protection"]],
  ["Can IMF be involved in insurance advisory?", "No, advisory is restricted; IMFs are distributors only."],
  ["Are there restrictions on commission sharing?", "Yes, commission sharing must comply with IRDAI norms."],
  ["What internal controls should IMF maintain?", "", ["Sales monitoring", "Complaint handling", "Compliance reporting"]],
  ["Can IMF handle high-value insurance policies?", "Yes, subject to insurer tie-ups and product availability."],
  ["What is the risk of regulatory non-reporting?", "It may result in:", ["Penalties", "License suspension"]],
  ["Can IMF expand internationally?", "No, IMF is restricted to India under current regulations."],
  ["What is the importance of audit in IMF?", "Audit ensures transparency, compliance, and risk control."],
  ["Can IMF operate as aggregator platform?", "No, aggregators require separate IRDAI license."],
  ["What happens if IMF violates insurer tie-up limits?", "It may attract penalties and regulatory action."],
  ["Are there capital adequacy norms beyond net worth?", "No additional capital adequacy norms, but net worth must be maintained."],
  ["Can IMF handle claims processing?", "IMFs assist customers but claims are settled by insurers."],
  ["What are key risk management practices for IMF?", "", ["Training staff", "Monitoring sales practices", "Compliance audits"]],
  ["Can IMF integrate with digital insurance APIs?", "Yes, subject to IRDAI digital compliance norms."],
  ["Is board governance important for IMF?", "Yes, especially for companies to ensure compliance oversight."],
  ["Can IMF be funded by investors?", "Yes, subject to regulatory approvals and ownership norms."],
  ["What are the biggest challenges in IMF operations?", "", ["Compliance management", "Sales quality", "Regulatory updates"]],
  ["Can IMF merge with another entity?", "Yes, but requires prior IRDAI approval."],
  ["What happens if IMF fails audit requirements?", "It may lead to penalties and corrective action requirements."],
  ["Can IMF automate compliance processes?", "Yes, using RegTech solutions for reporting and monitoring."],
  ["What is the role of technology in IMF growth?", "Technology enables:", ["Digital sales", "Customer management", "Compliance tracking"]],
  ["Can IMF operate without a compliance officer?", "No, compliance oversight is mandatory."],
  ["What are regulator expectations from IMF?", "", ["Fair selling practices", "Transparency", "Customer protection"]],
  ["Is IMF a scalable business model in India?", "Yes, IMF is highly scalable due to:", ["Growing insurance demand", "Digital adoption", "Regulatory support"]]
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
    <details key={faq.q} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer font-semibold text-[#0a1628]">{faq.q}</summary>
      <p className="mt-3 text-sm leading-7 text-gray-600">{faq.a}</p>
      {faq.points && faq.points.length > 0 ? <ul className="mt-2 text-sm leading-7 text-gray-600">{faq.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
    </details>
  ))}</div>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{ emoji: '🛡️', label: 'IRDAI Licensing' }, { emoji: '🤝', label: 'Multi-Product Distribution' }, { emoji: '📋', label: 'Application & ISP Setup' }]}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Regulatory Services', href: '/regulatory' }, { label: 'Insurance', href: '/regulatory/insurance' }, { label: 'Insurance Marketing Firm License' }]}
      title="Insurance Marketing Firm License in India - Complete Guide with Eligibility, Process and Compliance"
      heroDescription={<><p><strong>Insurance Marketing Firm License</strong> is a regulatory approval issued by the Insurance Regulatory and Development Authority of India that allows entities to distribute insurance products, offer financial services, and act as a bridge between insurers and customers in a structured and compliant manner. An IMF is not just a distributor. It is a hybrid financial services platform operating under controlled regulatory permissions.</p><div className="flex flex-wrap gap-2 mt-5">{['IMF Regulations, 2015', 'Rs. 10 Lakh Net Worth', 'Principal Officer Appointment', 'ISP Training & Certification', 'Multi-Product Distribution', 'Fit and Proper Review', 'IRDAI Portal Filing', 'Post-Registration Compliance'].map((badge) => <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>)}</div></>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for IMF License</Link><Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check IMF Eligibility</Link><a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a></>}
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="26 min read"
      displayYear="2026"
      focusKeyword="Insurance Marketing Firm License in India"
      sections={sections}
      ctaTitle="Plan Your IMF Application"
      ctaDescription="Discuss entity structure, net worth, Principal Officer qualification, ISP training and the IRDAI filing."
      quickFacts={[{ label: 'Regulator', value: 'IRDAI' }, { label: 'Regulation', value: 'IMF Regs, 2015' }, { label: 'Net Worth', value: 'Rs. 10 Lakh' }, { label: 'Renewal', value: 'Every 3 years' }, { label: 'IRDAI Review', value: '30-60 days' }]}
      relatedArticles={[
        { title: 'Insurance Broker Registration in India', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'The full-advisory broker route, for comparison against the IMF model.' },
        { title: 'Corporate Agent Registration in India', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'IRDAI corporate agency registration and its distribution limits.' },
        { title: 'ISNP Registration', href: '/irdai/isnp-registration', category: 'IRDAI', description: 'IRDAI permission for selling insurance through a self-network platform.' }
      ]}
      finalCtaTitle="Start Your Insurance Marketing Firm Registration with Estabizz"
      finalCtaDescription="Structure the entity, qualify the Principal Officer, build the ISP training framework, draft a regulator-aligned business plan and file with IRDAI, with query handling and post-registration compliance support."
      finalCtaActions={<><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to IRDAI Compliance Expert</Link><Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for IMF License</Link><Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check IMF Eligibility</Link><a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a></>}
    >
      <Section id="quick-overview" title="Insurance Marketing Firm License: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Insurance Regulatory and Development Authority of India' },
          { title: 'Governing Regulation', body: 'IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015 and subsequent amendments' },
          { title: 'Underlying Statutes', body: 'Insurance Act, 1938 and IRDAI Act, 1999' },
          { title: 'Eligible Entity Types', body: 'Company, LLP or cooperative society' },
          { title: 'Minimum Net Worth', body: 'Rs. 10 lakh' },
          { title: 'Principal Officer', body: 'Mandatory, with prescribed qualifications and IRDAI training' },
          { title: 'Insurance Sales Persons', body: 'Mandatory trained and certified personnel' },
          { title: 'Office Setup', body: 'Physical office with infrastructure required' },
          { title: 'Application Fee', body: 'Rs. 5,000, non-refundable' },
          { title: 'Registration Fee', body: 'Rs. 10,000 on approval' },
          { title: 'Renewal', body: 'Rs. 10,000 every 3 years' },
          { title: 'IRDAI Review', body: 'Indicative 30 to 60 days, subject to compliance and queries' }
        ]} />
        <div className="warning-box">These details are indicative. Actual requirements must be confirmed against the applicant&rsquo;s constitution, proposed product mix, Principal Officer profile, ISP strength and the latest IRDAI regulations, amendments and circulars applicable at the time of filing.</div>
      </Section>

      <Section id="what-is" title="What is an Insurance Marketing Firm License?">
        <DataTable headers={['Lens', 'What It Means']} rows={[
          ['In simple terms', 'An Insurance Marketing Firm acts as a multi-product financial distributor authorised to sell insurance policies along with other approved financial products'],
          ['From a compliance perspective', 'It is a regulated intermediary governed by IRDAI with defined scope, restrictions and reporting obligations'],
          ['Legally speaking', 'It operates under the IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015 and subsequent amendments']
        ]} />
        <div className="info-box"><strong>Practical scenario:</strong> a firm wanting to sell insurance plus mutual funds plus loan products under one structure can opt for an IMF instead of taking multiple separate registrations.</div>
      </Section>

      <Section id="imf-model" title="Deeper Understanding of the IMF Model">
        <p>From a compliance perspective, the IMF sits between individual insurance agents, corporate agents and insurance brokers, but with a distinct commercial advantage.</p>
        <CheckList items={['Multi-product capability across insurance and other financial products', 'Lower compliance burden than an insurance broker', 'Scalable business structure suited to Tier 2 and Tier 3 expansion']} />
      </Section>

      <Section id="regulatory-framework" title="Regulatory Framework">
        <DataTable headers={['Instrument', 'Relevance']} rows={[
          ['IRDAI (Registration of Insurance Marketing Firm) Regulations, 2015', 'The primary registration and conduct framework'],
          ['IRDAI circulars and guidelines', 'Issued from time to time and binding on registered IMFs'],
          ['Insurance Act, 1938', 'Applicable statutory provisions'],
          ['IRDAI Act, 1999', 'Establishes the regulator and its powers']
        ]} />
        <p>As per applicable regulatory guidelines, IMFs are allowed to distribute life insurance products, general insurance products, health insurance policies and other financial products as permitted.</p>
      </Section>

      <Section id="who-needs" title="Who Needs an Insurance Marketing Firm License?">
        <CheckList items={['Financial consultants and advisors', 'Small and mid-sized distribution firms', 'NBFCs and fintech companies', 'Insurance agents upgrading their business model', 'Entrepreneurs entering insurance distribution']} />
      </Section>

      <Section id="scope-of-activities" title="Scope of Activities Allowed to an IMF">
        <CardGrid columns="md:grid-cols-3" cards={[
          { title: '1. Insurance Distribution', body: <ul className="!mb-0"><li>Life insurance</li><li>General insurance</li><li>Health insurance</li></ul> },
          { title: '2. Financial Product Distribution', body: <ul className="!mb-0"><li>Mutual funds, subject to AMFI compliance</li><li>Pension products such as NPS</li><li>Banking products, where tie-ups are in place</li></ul> },
          { title: '3. Other Services', body: <ul className="!mb-0"><li>Insurance servicing support</li><li>Policy renewals</li><li>Customer onboarding assistance</li></ul> }
        ]} />
      </Section>

      <Section id="restrictions" title="Regulatory Restrictions (Very Important)">
        <p>An IMF operates within a defined boundary, and exceeding it may lead to regulatory action.</p>
        <DataTable headers={['An IMF Cannot', 'Why It Matters']} rows={[
          ['Act as a full-fledged insurance broker', 'Broking requires separate registration with higher net worth and compliance'],
          ['Provide unrestricted advisory services', 'Advisory scope is limited by design under the IMF framework'],
          ['Handle large-scale corporate risk placements', 'Corporate risk placement sits with brokers, not IMFs'],
          ['Deviate from product caps prescribed by IRDAI', 'Product caps are a core condition of the registration']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria">
        <DataTable headers={['Particular', 'Requirement']} rows={[
          ['Entity Type', 'Company, LLP or cooperative society'],
          ['Net Worth', 'Rs. 10 lakh minimum'],
          ['Principal Officer', 'Mandatory, with prescribed qualifications'],
          ['Office Setup', 'Physical office with infrastructure'],
          ['Fit and Proper Criteria', 'Directors and key persons must qualify'],
          ['Insurance Sales Persons (ISPs)', 'Mandatory trained personnel']
        ]} />
      </Section>

      <Section id="principal-officer" title="Principal Officer: Critical Compliance Role">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Key Responsibilities', body: <ul className="!mb-0"><li>Regulatory compliance oversight</li><li>ISP supervision</li><li>Liaison with IRDAI</li><li>Business governance</li></ul> },
          { title: 'Minimum Requirements', body: <ul className="!mb-0"><li>Educational qualification</li><li>IRDAI-prescribed training</li><li>Clean compliance track record</li></ul> }
        ]} />
        <div className="warning-box"><strong>Real-world issue:</strong> many IMF applications get delayed because the Principal Officer&rsquo;s qualifications are incomplete. This should be settled before the application is filed, not during IRDAI queries.</div>
      </Section>

      <Section id="isp" title="Insurance Sales Person (ISP): Backbone of the IMF">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Key Functions', body: <ul className="!mb-0"><li>Selling insurance products</li><li>Customer interaction</li><li>Policy servicing</li></ul> },
          { title: 'Compliance Requirements', body: <ul className="!mb-0"><li>Mandatory training</li><li>Certification</li><li>Continuous skill enhancement</li></ul> }
        ]} />
      </Section>

      <Section id="fit-and-proper" title="Fit and Proper Criteria (Often Ignored but Critical)">
        <p>All directors and key personnel must satisfy the following. According to governing regulations, failure here can lead to outright rejection.</p>
        <CheckList items={['Clean financial record', 'No criminal background', 'No regulatory violations', 'Demonstrated integrity and competence']} />
      </Section>

      <Section id="documents" title="Documents Required">
        <DataTable headers={['Document', 'Purpose']} rows={[
          ['Certificate of Incorporation', 'Legal entity proof'],
          ['MOA and AOA / LLP Agreement', 'Business activity verification'],
          ['Net Worth Certificate (CA certified)', 'Financial eligibility'],
          ['Director KYC (PAN, Aadhaar)', 'Identity verification'],
          ['Principal Officer Qualification Proof', 'Regulatory requirement'],
          ['Office Address Proof', 'Infrastructure validation'],
          ['Business Plan', 'Operational clarity']
        ]} />
      </Section>

      <Section id="process" title="Step-by-Step Registration Process">
        <Timeline steps={[
          { title: 'Incorporate the entity', body: 'Company, LLP or cooperative society, with the object clause covering insurance distribution and permitted financial services.' },
          { title: 'Appoint the Principal Officer and ISPs', body: 'Confirm qualifications and IRDAI-prescribed training before filing, since this is the most common cause of delay.' },
          { title: 'Prepare documentation and the compliance file', body: 'Net worth certificate, director KYC, office proof and a logic-driven business plan.' },
          { title: 'Submit the application on the IRDAI portal', body: 'File with the complete supporting document set.' },
          { title: 'Respond to IRDAI queries', body: 'Handle clarifications on business plan, Principal Officer qualification, ISP structure and revenue model.' },
          { title: 'Receive the Certificate of Registration', body: 'On approval, activate compliance, record-keeping and reporting systems before commencing distribution.' }
        ]} />
      </Section>

      <Section id="fees" title="Fees Structure">
        <DataTable headers={['Component', 'Amount (Indicative)', 'Remarks']} rows={[
          ['Application Fees', 'Rs. 5,000', 'Non-refundable'],
          ['Registration Fees', 'Rs. 10,000', 'On approval'],
          ['Renewal Fees', 'Rs. 10,000', 'Every 3 years']
        ]} />
      </Section>

      <Section id="timeline" title="Timeline">
        <DataTable headers={['Stage', 'Estimated Time']} rows={[
          ['Documentation Preparation', '7-10 days'],
          ['Application Filing', '3-5 days'],
          ['IRDAI Review', '30-60 days'],
          ['Approval', 'Subject to compliance']
        ]} />
      </Section>

      <Section id="comparison" title="IMF vs Corporate Agent vs Insurance Broker">
        <DataTable headers={['Particular', 'IMF', 'Corporate Agent', 'Insurance Broker']} rows={[
          ['Product Range', 'Multi-product', 'Limited insurers', 'Wide'],
          ['Advisory Scope', 'Limited', 'No advisory', 'Full advisory'],
          ['Compliance Burden', 'Moderate', 'Low', 'High'],
          ['Net Worth Requirement', 'Rs. 10 lakh', 'Rs. 50 lakh and above', 'Rs. 75 lakh and above'],
          ['Scalability', 'High', 'Medium', 'High']
        ]} />
        <p>Businesses weighing the alternatives should read this alongside <Link href="/irdai/insurance-broker-registration-in-india">Insurance Broker Registration</Link> and <Link href="/irdai/corporate-agent-registration-in-india">Corporate Agent Registration</Link>.</p>
      </Section>

      <Section id="business-model" title="Business Model Structuring (Practical Insight)">
        <DataTable headers={['Revenue Source', 'Description']} rows={[
          ['Insurance Commission', 'From insurers'],
          ['Financial Product Commission', 'From AMCs and banks'],
          ['Renewal Income', 'Recurring income'],
          ['Cross-Selling', 'Multiple product lines']
        ]} />
      </Section>

      <Section id="financial-planning" title="Financial Planning for IMF Setup">
        <DataTable headers={['Expense Head', 'Approximate Cost']} rows={[
          ['Net Worth Requirement', 'Rs. 10 lakh'],
          ['Office Setup', 'Rs. 2-5 lakh'],
          ['Compliance and Licensing', 'Rs. 1-2 lakh'],
          ['Technology Setup', 'Rs. 1-3 lakh']
        ]} />
      </Section>

      <Section id="technology" title="Technology Integration (Modern IMF Model)">
        <CheckList items={['CRM systems', 'Online policy issuance tools', 'Digital onboarding', 'WhatsApp-based servicing', 'API integrations with insurers']} />
        <div className="info-box"><strong>Practical insight:</strong> digital IMFs scale faster than traditional ones. Businesses building an online sales journey should also review <Link href="/irdai/isnp-registration">ISNP registration</Link>.</div>
      </Section>

      <Section id="growth-potential" title="Growth Potential of IMF in India">
        <p>India&rsquo;s insurance penetration is still developing, and the IMF model plays a direct role in closing that gap.</p>
        <CheckList items={['Tier 2 and Tier 3 market expansion', 'Financial inclusion', 'Digital insurance distribution']} />
      </Section>

      <Section id="post-registration" title="Post-Registration Compliance">
        <p>According to governing regulations, failure may lead to suspension or cancellation.</p>
        <CheckList items={['Maintain minimum net worth', 'Continuous training of ISPs', 'Adherence to product distribution limits', 'Periodic reporting to IRDAI', 'Maintain records of clients and transactions', 'Compliance with grievance redressal norms']} />
      </Section>

      <Section id="rejection-reasons" title="Common Reasons for Application Rejection">
        <DataTable headers={['IRDAI Query Trigger', 'How to Pre-empt It']} rows={[
          ['Weak or unrealistic business plan', 'Present a logic-driven model with credible volumes and revenue assumptions'],
          ['Inadequate Principal Officer qualification', 'Confirm qualification and prescribed training before filing'],
          ['Improper ISP training structure', 'Document the training, certification and supervision framework'],
          ['Lack of clarity in the revenue model', 'Map each revenue stream to a permitted activity'],
          ['Incomplete documentation', 'Close every gap before submission rather than during queries']
        ]} />
        <div className="info-box"><strong>Practical tip:</strong> a strong application is not document-heavy. It is logic-driven and regulator-aligned.</div>
      </Section>

      <Section id="compliance-risks" title="Practical and Hidden Compliance Risks">
        <h3>Practical Compliance Risks</h3>
        <CheckList items={['Improper ISP training leading to rejection', 'Weak documentation of the business plan', 'Non-compliance with the net worth requirement', 'Mis-selling of products', 'Non-maintenance of records']} />
        <h3>Hidden Compliance Challenges</h3>
        <CheckList items={['Data protection compliance', 'Customer grievance systems', 'Audit readiness', 'Sales misrepresentation risks']} />
      </Section>

      <Section id="checklist" title="Advanced Compliance Checklist">
        <CheckList items={['Business model clarity', 'Qualified Principal Officer', 'Trained ISPs', 'Clean director background', 'Structured documentation', 'Technology readiness']} />
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with IMF Licensing">
        <CheckList items={['Proper structuring of the application', 'Avoiding rejection or delays', 'Ensuring compliance with IRDAI expectations', 'Drafting of the business plan and documentation', 'Handling regulatory queries', 'Post-registration compliance setup']} />
      </Section>

      <Section id="faqs" title="FAQs on Insurance Marketing Firm (IMF) License in India">
        <p>{faqs.length} questions covering eligibility, scope, restrictions, Principal Officer and ISP requirements, documents, fees, timeline, compliance and practical scenarios.</p>
        <FaqList items={faqs} />
      </Section>

      <Section id="expert-review" title="Reviewer and Legal Disclaimer">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <blockquote className="border-l-4 border-[#1677f2] pl-4 italic text-gray-700">Insurance Marketing Firms operate at the intersection of distribution and compliance. A well-structured application is not just about approval. It reflects the long-term governance capability of the business.</blockquote>
          <h3 className="mt-6">Reviewed by Estabizz Compliance Expert</h3>
          <p><strong>CS Devyani Khambhati</strong></p>
          <p>Compliance Expert | Estabizz Fintech Private Limited</p>
          <p>Expertise: IRDAI, RBI, SEBI and IFSCA frameworks, insurance intermediary licensing, IMF and corporate agency registration, broker registration and post-approval regulatory support.</p>
          <p>Insurance Marketing Firm License is an excellent entry point for businesses looking to participate in India&rsquo;s expanding insurance distribution ecosystem. However, regulatory clarity, proper documentation and compliance readiness are critical for smooth approval and sustainable operations.</p>
        </div>
        <div className="warning-box mt-6">This content is for general informational purposes only and should not be treated as legal, regulatory, tax or financial advice. IRDAI regulations, net worth thresholds, fee amounts, Principal Officer and ISP qualification norms, permitted product categories and renewal requirements may change from time to time. Indicative costs are illustrative only. Applicants should verify the latest IRDAI regulations, amendments and circulars before filing any IMF application.</div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our IRDAI Compliance Expert">
        <p>A professionally guided approach not only improves approval chances but also ensures long-term regulatory stability.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to IRDAI Compliance Expert</Link>
          <Link href="/contact" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Apply for IMF License</Link>
          <Link href="/get-started" className="px-6 py-3 bg-blue-50 text-[#0a1628] font-bold rounded-xl text-center">Check IMF Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
