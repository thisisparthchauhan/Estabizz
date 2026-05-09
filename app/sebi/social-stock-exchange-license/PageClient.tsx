'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function SocialStockExchangePage() {
  const sections = [
    {
      id: 'introduction',
      title: 'What is Social Stock Exchange License in India?',
      content: `Social Stock Exchange License in India refers to the SEBI-regulated eligibility, registration and listing framework that enables eligible Non-Profit Organisations (NPOs) and For-Profit Social Enterprises (FPEs) to access structured fundraising through the Social Stock Exchange (SSE) segment of recognised stock exchanges such as NSE and BSE. It is designed for organisations working with clear social impact objectives in areas such as education, healthcare, poverty alleviation, livelihood, environment, rural development and social welfare.

The Social Stock Exchange framework is not merely a fundraising route. It requires strong governance, audited financial records, social impact measurement, proper disclosures, utilisation tracking and continuing compliance. For NGOs, Section 8 companies, trusts, societies and impact-driven enterprises, Social Stock Exchange License in India can provide a credible capital market platform, subject to eligibility and exchange-level due diligence.

The framework helps social organisations raise funds with greater transparency, governance and accountability. It allows donors, investors, CSR contributors and institutions to evaluate social impact in a more structured manner.

Important note: SSE registration or listing does not guarantee fundraising. Fundraising depends on investor interest, impact credibility, disclosures, governance quality and compliance readiness.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background of Social Stock Exchange License in India',
      content: `• Regulator — Securities and Exchange Board of India (SEBI)
• Platform — Social Stock Exchange segment of NSE / BSE
• Main Framework — SEBI Social Stock Exchange framework under ICDR Regulations and related circulars
• Master Circular — SEBI Master Circular for Framework on Social Stock Exchange dated 19 January 2026
• Recent Circular — SEBI circular dated 15 April 2026 on NPO registration and ZCZP minimum subscription review
• Applicable Laws — SEBI Act, Securities Contracts (Regulation) framework, Companies Act, Income Tax Act and exchange rules
• Main Entities — Non-Profit Organisations and For-Profit Social Enterprises
• Core Focus — Social impact, transparency, governance, disclosures, fund utilisation and investor / donor confidence`
    },
    {
      id: 'what-is-sse',
      title: 'What is a Social Stock Exchange?',
      content: `A Social Stock Exchange is a dedicated segment of recognised stock exchanges created to facilitate fundraising by eligible social enterprises. It provides a regulated platform where organisations working in specified social sectors can raise funds and disclose impact outcomes.

Key characteristics:
• Regulated fundraising platform within recognised stock exchanges
• Supports social enterprises and NPOs
• Encourages transparent donations and investments
• Enables ZCZP issuance by NPOs
• Allows eligible FPEs to access capital
• Promotes measurable social impact
• Strengthens governance and disclosures
• Enhances credibility before donors and CSR contributors

SSE is not a separate stock exchange — it operates as a dedicated segment within recognised stock exchanges such as NSE and BSE.`
    },
    {
      id: 'npo-vs-fpe',
      title: 'NPO vs FPE under Social Stock Exchange',
      content: `• Legal Form: NPO — Trust, Society or Section 8 Company | FPE — Company / LLP / eligible enterprise structure
• Primary Objective: NPO — Social welfare without profit distribution | FPE — Social impact with revenue model
• Fundraising Instrument: NPO — ZCZP instruments and other permitted routes | FPE — Equity / debt / other permitted securities
• Return to Investor: NPO — No financial return under ZCZP | FPE — Possible financial return depending on instrument
• Tax Registration: NPO — 12A / 12AB / 80G generally relevant | FPE — Normal business and tax compliance
• Impact Reporting: Mandatory for both
• Social Intent Test: Applicable to both
• Profit Distribution: NPO — Not permitted | FPE — Permitted subject to law and structure`
    },
    {
      id: 'who-can-apply',
      title: 'Who Can Apply for Social Stock Exchange License in India?',
      content: `• Trusts — Public charitable trusts working in eligible social sectors with proper registration, financial records and impact reporting
• Societies — Registered societies carrying out eligible social activities with audited records and governance structure
• Section 8 Companies — Companies incorporated for charitable or social objectives under the Companies Act, 2013
• For-Profit Social Enterprises — Impact-driven businesses that meet SEBI's social intent and eligible activity criteria
• Startups with Social Impact — Startups may apply if their business model is primarily aligned with eligible social impact sectors
• CSR-Focused Social Projects — Entities seeking structured CSR or donor visibility may evaluate SSE listing, subject to eligibility`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply for Social Stock Exchange Registration?',
      content: `• Entity without social impact objective — Not suitable
• NPO without required track record — Eligibility issue
• NPO without required tax registrations — Application concern, subject to latest framework
• Entity with weak governance records — Due diligence concern
• Entity with incomplete financial statements — Application delay / rejection risk
• Entity unable to demonstrate impact — Core eligibility concern
• Commercial business without social intent — Not eligible
• Entity with unclear fund utilisation plan — Exchange query risk
• Entity making misleading impact claims — Regulatory and reputation risk
• Entity expecting guaranteed fundraising — Misunderstanding of framework`
    },
    {
      id: 'eligible-activities',
      title: 'Eligible Activities under Social Stock Exchange License in India',
      content: `• Eradicating hunger, poverty, malnutrition and inequality
• Promoting healthcare and sanitation
• Promoting education and vocational skills
• Gender equality and women empowerment
• Supporting differently abled persons
• Rural development projects
• Livelihood enhancement
• Environmental sustainability
• Climate action and conservation
• Slum area development
• Disaster management and relief
• Social inclusion and community welfare

The exact eligible activities should be checked under the latest SEBI Master Circular and exchange norms before filing.`
    },
    {
      id: 'eligibility-npo',
      title: 'Eligibility Criteria for NPOs under Social Stock Exchange',
      content: `• Legal Structure — Trust, Society or Section 8 Company
• Track Record — Generally minimum 3 years operational track record
• Annual Spending — Generally ₹50 lakh annual spending threshold, subject to latest verification
• Prior Funding — Generally ₹10 lakh funding in previous financial year, subject to latest verification
• Tax Registration — 12A / 12AB and 80G generally relevant, subject to latest SEBI circulars and exemptions
• Social Objective — Must be clearly aligned with eligible social activities
• Governance — Proper governing body, board / trustees and internal controls
• Financial Records — Audited financial statements required
• Impact Reporting — Social impact reporting and outcome tracking required`
    },
    {
      id: 'eligibility-fpe',
      title: 'Eligibility Criteria for For-Profit Social Enterprises',
      content: `• Legal Structure — Eligible company, LLP or enterprise structure as permitted
• Social Intent — Social impact must be core objective
• 67% Test — At least 67% alignment with eligible social activities based on applicable criteria
• Financial Records — Audited financial statements and revenue model required
• Business Model — Must show impact-driven and sustainable model
• Governance — Board and management disclosures required
• Impact Measurement — Outcome measurement framework required
• Investor Disclosure — Transparent disclosure of business, impact and risks`
    },
    {
      id: 'social-intent-test',
      title: '67% Social Intent Test under Social Stock Exchange Framework',
      content: `A social enterprise must demonstrate that its activities are substantially aligned with eligible social objectives. The 67% test is generally applied through revenue, expenditure or beneficiary / customer base, depending on the latest SEBI framework.

• Revenue Test — At least 67% of relevant revenue is from eligible social activities
• Expenditure Test — At least 67% of relevant expenditure is incurred on eligible social activities
• Beneficiary / Customer Test — At least 67% of beneficiaries / customer base relate to eligible target population
• Impact Documentation — Records must support the claim
• Audit Trail — Financial and impact data should be verifiable

Verify the latest SEBI Master Circular and April 2026 circular before treating any specific 67% applicability test as final.`
    },
    {
      id: 'zczp',
      title: 'Zero Coupon Zero Principal Instruments under SSE',
      content: `Zero Coupon Zero Principal (ZCZP) instruments are fundraising instruments that may be issued by eligible NPOs through the Social Stock Exchange framework. Investors / contributors do not receive financial return, coupon or principal repayment. The contribution is made to support the stated social objective.

• Issuer — Eligible NPO
• Return — No coupon
• Principal Repayment — No principal repayment
• Purpose — Funding social projects
• Investor / Contributor Role — Supports social objective
• Disclosure — Fundraising document and impact disclosures required
• Utilisation — Must be aligned with stated project objective
• Minimum Subscription — Verify latest SEBI circular, including April 2026 changes

ZCZP instruments are designed for social contribution and do not provide any financial return.`
    },
    {
      id: 'documents-npo',
      title: 'Documents Required for NPOs under Social Stock Exchange',
      content: `• Constitutional Documents — Trust deed / society registration / Section 8 incorporation documents
• Tax Documents — PAN, TAN, 12A / 12AB, 80G and ITR records
• Financial Documents — Audited financial statements for last 3 years
• Governance Documents — Trustee / board / governing body details
• Impact Documents — Social impact reports, project reports and beneficiary data
• Funding Records — Donation / grant / funding records
• Compliance Documents — Annual filings, statutory registers and regulatory records
• Application Documents — SSE application, declarations and exchange forms`
    },
    {
      id: 'documents-fpe',
      title: 'Documents Required for FPEs under Social Stock Exchange',
      content: `• Corporate Documents — Certificate of Incorporation, MOA, AOA / LLP agreement
• Financial Documents — Audited financial statements and tax returns
• Business Model — Social impact business plan and revenue model
• Impact Details — Beneficiary data, sector alignment and outcome metrics
• Board Details — Directors / partners / management profile
• Compliance Documents — Statutory filings and governance records
• Fundraising Documents — Draft offer / listing / fundraising documents as applicable`
    },
    {
      id: 'process',
      title: 'Step-by-Step Process for Social Stock Exchange License in India',
      content: `Step 1 — Eligibility Assessment: Review whether the organisation qualifies as an NPO or FPE and whether its activities fall under eligible social sectors.

Step 2 — Social Intent Mapping: Map revenue, expenditure and beneficiary base to the 67% social intent test.

Step 3 — Documentation Preparation: Compile constitutional documents, financial statements, tax registrations, governance records and impact reports.

Step 4 — Impact Measurement Framework: Prepare project-wise impact indicators, outcome reporting structure and fund utilisation tracking.

Step 5 — Application with SSE Segment: Submit application through recognised stock exchange such as NSE SSE or BSE SSE, as applicable.

Step 6 — Exchange Due Diligence: The exchange reviews eligibility, governance, financial records, social impact and disclosures.

Step 7 — Clarification and Query Response: Respond to exchange queries with supporting documents and revised disclosures.

Step 8 — Registration / Listing Approval: Upon satisfaction, the entity may be registered / listed on the SSE segment.

Step 9 — Fundraising Instrument Filing: NPOs may issue ZCZP instruments and FPEs may use permitted fundraising instruments, subject to framework.

Step 10 — Post-Listing Compliance: Maintain disclosures, impact reporting, fund utilisation tracking and ongoing exchange compliance.`
    },
    {
      id: 'timeline',
      title: 'Timeline for Social Stock Exchange Registration',
      content: `• Eligibility Assessment — 1–2 weeks
• Documentation Preparation — 2–3 weeks
• Application Filing — 1 week
• Exchange Review — 4–8 weeks
• Approval and Listing — 2–3 weeks
• Overall Timeline — Around 2 to 3 months, subject to queries and readiness

Timeline is indicative and depends on exchange review, documentation quality, social impact clarity and query rounds.`
    },
    {
      id: 'cost',
      title: 'Cost Overview for Social Stock Exchange License in India',
      content: `• Professional Fees — Advisory, documentation and filing support
• Exchange Fees — As prescribed by NSE / BSE SSE segment
• Listing / Instrument Fees — Applicable based on instrument and exchange framework
• Audit Cost — Financial audit, impact reporting and assurance cost
• Social Audit / Impact Assessment — Applicable where required
• Compliance Cost — Annual reporting, disclosure and governance support

Exact fees must be verified from NSE / BSE SSE and latest SEBI circulars before hardcoding.`
    },
    {
      id: 'post-listing',
      title: 'Post-Listing Compliance for Social Stock Exchange Entities',
      content: `• Annual Impact Report — Mandatory impact reporting
• Financial Disclosures — Audited financial and utilisation reporting
• Fund Utilisation — Track utilisation against stated objective
• Material Change Reporting — Report major changes in project, governance or social activity
• Governance Disclosure — Board / trustee / management details
• Instrument Compliance — ZCZP or securities compliance as applicable
• Exchange Reporting — Periodic filings with SSE segment
• Audit / Assurance — Applicable financial and social audit requirements`
    },
    {
      id: 'impact-reporting',
      title: 'Social Impact Reporting Framework',
      content: `• Input — Funds received and resources deployed
• Activity — Project activities undertaken
• Output — Number of beneficiaries, services delivered or facilities created
• Outcome — Measurable social improvement
• Impact — Long-term social change
• Utilisation — Whether funds were used for stated purpose
• Verification — Audit / social audit / independent review where applicable

Weak impact reporting is one of the most common reasons for delay or poor investor / donor confidence.`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes in Social Stock Exchange License in India',
      content: `• Weak social impact justification — Exchange query or rejection
• Incomplete financial statements — Application delay
• No 12A / 80G readiness for NPOs — Eligibility concern, subject to latest framework
• Poor governance documentation — Due diligence concern
• Incorrect NPO vs FPE classification — Wrong application approach
• No fund utilisation framework — Investor confidence risk
• No impact reporting system — Post-listing compliance risk
• Assuming listing guarantees funding — Commercial misunderstanding
• Weak board / trustee records — Governance query
• Copy-paste project reports — Weak regulatory presentation`
    },
    {
      id: 'advantages',
      title: 'Advantages of Social Stock Exchange License in India',
      content: `• Access to structured funding
• Enhanced credibility for NGOs and social enterprises
• Better visibility before CSR contributors
• Transparent impact reporting
• Improved governance standards
• Regulated donor / investor confidence
• Reduced dependency on informal fundraising
• Opportunity to scale social projects
• Public accountability
• Long-term sustainability for social impact initiatives`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is Social Stock Exchange License in India?", a: "It refers to the SEBI-regulated eligibility and listing framework that allows eligible NPOs and For-Profit Social Enterprises to raise funds through the Social Stock Exchange segment of recognised stock exchanges." },
        { q: "Is Social Stock Exchange a separate exchange?", a: "No. It is a separate segment within recognised stock exchanges such as NSE and BSE." },
        { q: "Who regulates Social Stock Exchange in India?", a: "The framework is regulated by SEBI and implemented through recognised stock exchanges." },
        { q: "Is SSE registration mandatory for NGOs?", a: "No. It is voluntary, but useful for structured fundraising and credibility." }
      ]
    },
    {
      category: 'Eligibility',
      faqs: [
        { q: "Who can apply for SSE registration?", a: "Eligible NPOs such as trusts, societies and Section 8 companies, and eligible For-Profit Social Enterprises can apply." },
        { q: "What is an NPO under SSE?", a: "An NPO is a not-for-profit organisation such as a trust, society or Section 8 company working in eligible social sectors." },
        { q: "What is a For-Profit Social Enterprise?", a: "It is an enterprise that has social impact as its primary objective while operating on a revenue-generating model." },
        { q: "What is the minimum track record required for NPOs?", a: "Generally, 3 years of operational track record is required, subject to latest SEBI and exchange verification." },
        { q: "Is 12A / 12AB required?", a: "It is generally relevant for NPO eligibility, subject to latest SEBI circulars and exemptions." },
        { q: "Is 80G required?", a: "It is generally relevant, but latest SEBI circulars and applicable exemptions must be verified." }
      ]
    },
    {
      category: 'ZCZP Instruments',
      faqs: [
        { q: "What is ZCZP?", a: "Zero Coupon Zero Principal is a fundraising instrument issued by eligible NPOs where contributors do not receive interest or principal repayment." },
        { q: "Is financial return available on ZCZP instruments?", a: "No. ZCZP instruments are designed for social contribution and do not provide financial return." },
        { q: "What is the minimum subscription for ZCZP?", a: "Verify latest SEBI circular, including April 2026 changes, before final filing." }
      ]
    },
    {
      category: '67% Test & Activities',
      faqs: [
        { q: "What is the 67% social intent test?", a: "It is a test to establish that a substantial portion of revenue, expenditure or beneficiary base is aligned with eligible social activities." },
        { q: "Can startups apply for SSE?", a: "Yes, startups may apply if they qualify as For-Profit Social Enterprises and meet SEBI criteria." },
        { q: "Can CSR funds be raised through SSE?", a: "SSE can improve transparency for CSR-linked funding, subject to CSR law, SEBI framework and exchange norms." }
      ]
    },
    {
      category: 'Documents & Process',
      faqs: [
        { q: "What documents are required for NPOs?", a: "Registration certificate, PAN, tax registrations, audited financials, annual reports, governing body details and impact reports are generally required." },
        { q: "What documents are required for FPEs?", a: "Incorporation documents, MOA / AOA, financial statements, business model, impact details and management details are generally required." },
        { q: "Is impact reporting mandatory?", a: "Yes. Social impact reporting is central to the SSE framework." },
        { q: "Does listing guarantee fundraising?", a: "No. Listing improves visibility and credibility, but actual fundraising depends on investor or donor interest." },
        { q: "How long does SSE registration take?", a: "The process may take around 2 to 3 months, depending on documentation quality and exchange review." }
      ]
    },
    {
      category: 'Operations & Estabizz Support',
      faqs: [
        { q: "Can rejected applications be refiled?", a: "Yes, after deficiencies are addressed." },
        { q: "Can multiple projects be listed?", a: "Yes, subject to exchange norms, disclosures and compliance requirements." },
        { q: "Can foreign funding be received?", a: "It may be possible subject to FCRA, FEMA and other applicable laws." },
        { q: "What happens if funds are misused?", a: "Misuse of funds can attract penalties, delisting, regulatory action and reputational damage." },
        { q: "How can Estabizz help with Social Stock Exchange License in India?", a: "Estabizz assists with eligibility review, NPO / FPE classification, documentation, impact reporting framework, NSE / BSE SSE filing support, ZCZP documentation, query response and post-listing compliance." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '📈', label: 'SEBI' },
        { emoji: '🌍', label: 'Social Stock Exchange' },
        { emoji: '💚', label: 'NPO / FPE' },
        { emoji: '✅', label: 'Expert Reviewed' },
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'SEBI Services', href: '/sebi' },
        { label: 'Social Stock Exchange License', href: '/sebi/social-stock-exchange-license' },
      ]}
      title="Social Stock Exchange License in India – Complete SEBI Guide for NGOs & Social Enterprises"
      readTime="20 min read"
      focusKeyword="Social Stock Exchange License in India"
      sections={sections}
      ctaTitle="Apply for Social Stock Exchange Registration"
      ctaDescription="Get structured regulatory support for Social Stock Exchange License in India — NPO / FPE eligibility review, social intent mapping, ZCZP documentation, impact reporting framework, NSE / BSE SSE application support and post-listing compliance."
      quickFacts={[
        { label: 'Regulator', value: 'SEBI' },
        { label: 'Platform', value: 'NSE / BSE SSE Segment' },
        { label: 'Separate Exchange?', value: 'No — segment within recognised exchanges' },
        { label: 'Eligible Entities', value: 'NPO and FPE' },
        { label: 'NPO Structures', value: 'Trust / Society / Section 8 Company' },
        { label: 'NPO Instrument', value: 'Zero Coupon Zero Principal (ZCZP)' },
        { label: 'NPO Track Record', value: 'Min 3 years (verify)' },
        { label: 'NPO Annual Spending', value: '₹50 lakh threshold (verify)' },
        { label: 'NPO Prior Funding', value: '₹10 lakh prev FY (verify)' },
        { label: 'Social Intent Test', value: '67% alignment' },
        { label: 'Tax Registration', value: '12A / 12AB / 80G (verify exemptions)' },
        { label: 'Master Circular', value: 'SEBI 19 January 2026' },
        { label: 'Recent Update', value: 'SEBI 15 April 2026' },
        { label: 'Timeline', value: '2 to 3 months indicative' },
      ]}
      relatedArticles={[
        { title: 'AIF Registration in India', href: '/sebi/aif-registration-in-india', category: 'SEBI', description: 'SEBI AIF Regulations 2012 (updated 2025) for Category I/II/III Alternative Investment Funds.' },
        { title: 'RTA Registration in India', href: '/sebi/rta-registration-in-india', category: 'SEBI', description: 'SEBI Registrars to an Issue and Share Transfer Agents Regulations 2025 / Master Circular Feb 2026.' },
        { title: 'Depository Participant SEBI Registration', href: '/sebi/depository-participant-sebi-registration', category: 'SEBI', description: 'Complete guide to SEBI registration as a Depository Participant.' },
        { title: 'Credit Rating Agency Registration', href: '/sebi/credit-rating-agency', category: 'SEBI', description: 'SEBI registration process for credit rating agencies operating in India.' },
        { title: 'Mutual Fund Registration with SEBI', href: '/sebi/mutual-fund-registration', category: 'SEBI', description: 'Step-by-step SEBI registration process for mutual funds in India.' },
        { title: 'Underwriter Registration with SEBI', href: '/sebi/underwriter-registration', category: 'SEBI', description: 'SEBI registration requirements for underwriters operating in India.' },
      ]}
      finalCtaTitle="Start Your Social Stock Exchange Registration Journey with Estabizz"
      finalCtaDescription="Build your Social Stock Exchange application with structured SEBI regulatory support — NPO / FPE eligibility review, social intent mapping, impact reporting framework, documentation, NSE / BSE SSE filing coordination, ZCZP instrument support, query response and post-listing compliance assistance. WhatsApp our team at +91 98256 00907 for a structured consultation."
    >
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-12">
          <h2>{section.title}</h2>
          <div className="prose max-w-none">
            {section.content.split('\n\n').map((paragraph, idx) => (
              paragraph.startsWith('•') ? (
                <ul key={idx} className="list-disc pl-6">
                  {paragraph.split('\n').filter(l => l.trim()).map((item, i) => (
                    <li key={i}>{item.replace('• ', '')}</li>
                  ))}
                </ul>
              ) : (
                <p key={idx}>{paragraph}</p>
              )
            ))}
          </div>
        </section>
      ))}

      <section id="faq" className="mt-16">
        <h2>Frequently Asked Questions on Social Stock Exchange License in India</h2>
        {faqGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <h3>{group.category}</h3>
            <div className="faq-accordion">
              {group.faqs.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div>{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ==================== HOW ESTABIZZ HELPS ==================== */}
      <section id="how-estabizz-helps" className="mt-16">
        <h2>How Estabizz Helps with Social Stock Exchange License in India</h2>
        <div className="step-timeline">
          <div className="step-item"><div className="step-dot">1</div><div className="step-card"><h4>Eligibility Assessment</h4><p>We review whether the applicant qualifies as an NPO or FPE under the Social Stock Exchange framework.</p></div></div>
          <div className="step-item"><div className="step-dot">2</div><div className="step-card"><h4>Social Intent Mapping</h4><p>We help map eligible activities, revenue, expenditure and beneficiary base with the 67% social intent test.</p></div></div>
          <div className="step-item"><div className="step-dot">3</div><div className="step-card"><h4>Documentation Support</h4><p>We assist in compiling constitutional documents, tax registrations, financial statements, governance records and impact documents.</p></div></div>
          <div className="step-item"><div className="step-dot">4</div><div className="step-card"><h4>Impact Reporting Framework</h4><p>We help prepare measurable impact indicators, beneficiary data structure and outcome reporting framework.</p></div></div>
          <div className="step-item"><div className="step-dot">5</div><div className="step-card"><h4>NSE / BSE SSE Application Support</h4><p>We assist with exchange-level application preparation, filing coordination and query responses.</p></div></div>
          <div className="step-item"><div className="step-dot">6</div><div className="step-card"><h4>ZCZP Instrument Support</h4><p>For NPOs, we assist in documentation related to Zero Coupon Zero Principal instrument issuance, subject to exchange framework.</p></div></div>
          <div className="step-item"><div className="step-dot">7</div><div className="step-card"><h4>Fund Utilisation &amp; Compliance Framework</h4><p>We help create fund utilisation tracking, reporting calendar and post-listing compliance framework.</p></div></div>
          <div className="step-item"><div className="step-dot">8</div><div className="step-card"><h4>Governance Strengthening</h4><p>We support board / trustee disclosures, internal controls, compliance calendar and policy documentation.</p></div></div>
          <div className="step-item"><div className="step-dot">9</div><div className="step-card"><h4>CSR &amp; Donor Readiness</h4><p>We help present the organisation&rsquo;s funding requirement in a structured and compliance-ready manner.</p></div></div>
          <div className="step-item"><div className="step-dot">10</div><div className="step-card"><h4>Ticket-Based Execution</h4><p>Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.</p></div></div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE ESTABIZZ ==================== */}
      <section id="why-choose-estabizz" className="mt-16">
        <h2>Why Choose Estabizz for Social Stock Exchange License in India?</h2>
        <div className="step-timeline">
          <div className="step-item"><div className="step-dot">1</div><div className="step-card"><h4>SEBI Regulatory Understanding</h4><p>Our team works across SEBI licensing and compliance matters and understands SSE governance scrutiny.</p></div></div>
          <div className="step-item"><div className="step-dot">2</div><div className="step-card"><h4>Social Impact Documentation Expertise</h4><p>We help structure measurable, audit-ready impact reporting aligned with SEBI / exchange expectations.</p></div></div>
          <div className="step-item"><div className="step-dot">3</div><div className="step-card"><h4>NPO &amp; FPE Structuring Support</h4><p>We classify and structure trusts, societies, Section 8 companies and impact enterprises for the right SSE pathway.</p></div></div>
          <div className="step-item"><div className="step-dot">4</div><div className="step-card"><h4>Governance &amp; Compliance Focus</h4><p>We focus on board / trustee discipline, internal controls, fund utilisation and ongoing compliance.</p></div></div>
          <div className="step-item"><div className="step-dot">5</div><div className="step-card"><h4>Multi-Regulator Experience</h4><p>Estabizz&rsquo;s experience across SEBI, RBI, IRDAI and IFSCA enables a wider financial regulatory perspective.</p></div></div>
          <div className="step-item"><div className="step-dot">6</div><div className="step-card"><h4>End-to-End Support</h4><p>From eligibility review to NSE / BSE SSE filing, query response and post-listing compliance, we provide organised professional handholding.</p></div></div>
        </div>
      </section>

      {/* ==================== REVIEWER & DISCLAIMER ==================== */}
      <section id="reviewer" className="mt-16">
        <h2>Reviewer &amp; Legal Disclaimer</h2>
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> SEBI, RBI, IRDAI, IFSCA, Social Stock Exchange, capital market compliance, NGO regulatory documentation, impact reporting, fundraising compliance and post-listing advisory.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help NGOs, Section 8 companies, trusts, societies, impact startups and social enterprises understand the broad SEBI framework for Social Stock Exchange License in India.</p>
        </div>
        <p>
          <strong>Legal Disclaimer:</strong> This content is for general informational purposes only and should not be
          treated as legal, regulatory, tax, investment, CSR, fundraising or financial advice. SEBI requirements,
          NSE / BSE SSE norms, tax registration requirements, ZCZP conditions, minimum subscription thresholds, impact
          reporting obligations and approval processes may change from time to time. Applicants should verify the
          latest SEBI circulars, exchange requirements and tax position before filing any application. Estabizz does
          not promise or guarantee SEBI / exchange approval or fundraising; outcomes are subject to scrutiny and the
          fulfilment of prescribed conditions.
        </p>
        <p>
          For a structured consultation with our SEBI compliance team, you may also reach Estabizz on WhatsApp at{" "}
          <a href="https://wa.me/919825600907" target="_blank" rel="noopener noreferrer">+91 98256 00907</a>.
        </p>
      </section>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGroups.flatMap((g) =>
              g.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              }))
            ),
          }),
        }}
      />
      {/* Service JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Social Stock Exchange License in India",
            provider: {
              "@type": "Organization",
              name: "Estabizz Fintech Private Limited",
              url: "https://estabizz-site.vercel.app/",
            },
            areaServed: { "@type": "Country", name: "India" },
            description:
              "Professional regulatory consulting support for SEBI Social Stock Exchange registration covering NPO and FPE eligibility, ZCZP instruments, social intent test, NSE / BSE SSE filing support, impact reporting and post-listing compliance.",
            url: "https://estabizz-site.vercel.app/sebi/social-stock-exchange-license",
          }),
        }}
      />
      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://estabizz-site.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "SEBI Services", item: "https://estabizz-site.vercel.app/sebi" },
              { "@type": "ListItem", position: 3, name: "Social Stock Exchange License", item: "https://estabizz-site.vercel.app/sebi/social-stock-exchange-license" },
            ],
          }),
        }}
      />
    </ServicePageLayout>
  );
}
