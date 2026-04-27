'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function NBFCSRORegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'NBFC SRO Registration – The Road Ahead for Institutional Strengthening',
      content: `NBFC SRO Registration marks a significant structural reform in the governance architecture of India's non-banking financial sector. The Reserve Bank of India (RBI) has formally introduced the Self-Regulatory Organisation (SRO) framework for NBFCs with the objective of strengthening industry discipline, improving compliance culture, and enhancing sectoral credibility.

For industry bodies and sectoral associations aspiring to play a formal governance role, NBFC SRO Registration is not merely an approval process. It is a regulatory recognition carrying responsibility, accountability, and supervisory expectations.

In this detailed guide, we explain NBFC SRO Registration in practical terms — covering legal background, eligibility criteria, capital structure, application procedure, compliance obligations, regulatory oversight, and strategic implications.`
    },
    {
      id: 'what-is',
      title: 'What is NBFC SRO Registration?',
      content: `NBFC SRO Registration refers to recognition granted by the Reserve Bank of India to an industry body that meets prescribed governance, independence, operational and financial criteria to function as a Self-Regulatory Organisation for NBFCs.

An SRO acts as:
• A bridge between regulator and industry
• A compliance standard setter
• A grievance redress facilitator
• A monitoring and coordination platform
• A policy dialogue contributor

The purpose of NBFC SRO Registration is to institutionalise sectoral discipline through industry-led governance under regulatory supervision.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background & Regulatory Authority',
      content: `NBFC SRO Registration is governed by:
• RBI's Framework for Self-Regulatory Organisations (SROs) for NBFCs
• Applicable Master Directions for NBFC governance
• Regulatory circulars issued by RBI from time to time
• Supervisory oversight mechanisms prescribed under RBI Act

The RBI remains the ultimate supervisory authority. An SRO does not replace regulation; it complements regulatory oversight.`
    },
    {
      id: 'who-needs',
      title: 'Who Needs NBFC SRO Registration?',
      content: `NBFC SRO Registration is applicable to:
• Industry associations representing NBFCs
• Sectoral federations of registered NBFC entities
• Not-for-profit companies formed for industry development
• Entities seeking formal recognition to represent NBFC interests

Only one recognised SRO may be approved initially, based on regulatory discretion.`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply for NBFC SRO Registration?',
      content: `The following are generally not eligible:
• Profit-oriented private companies
• Entities lacking sectoral representation
• Bodies without governance independence
• Organisations with unresolved regulatory actions
• Entities failing to meet prescribed capital requirements

NBFC SRO Registration demands structural neutrality and governance integrity.`
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria for NBFC SRO Registration',
      content: `The RBI framework prescribes structured eligibility conditions:

• Legal Structure — Not-for-profit entity
• Governance — Independent Board with balanced representation
• Financial Strength — Minimum net worth as prescribed
• Operational Capacity — Infrastructure & staffing capability
• Fit & Proper — Clean track record of promoters & directors
• Independence — No conflict of interest

NBFC SRO Registration is granted only when institutional independence is clearly demonstrated.`
    },
    {
      id: 'capital',
      title: 'Capital Requirement for NBFC SRO Registration',
      content: `As per the regulatory framework, the SRO must maintain a minimum net worth.

• Minimum Net Worth: ₹2 crore

The net worth must be maintained continuously.

Capital Requirement Structure:
Members' Contributions → Corpus Fund → Minimum ₹2 Crore Net Worth → Continuous Maintenance`
    },
    {
      id: 'net-worth',
      title: 'Net Worth Calculation Method',
      content: `Net worth is calculated as:

Paid-up Capital + Free Reserves – Accumulated Losses – Deferred Expenditure

The SRO must ensure transparent accounting and auditor certification.`
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Requirements',
      content: `NBFC SRO Registration requires:
• Dedicated office infrastructure
• Secure data management systems
• Grievance redress portal
• Policy dissemination mechanisms
• Compliance monitoring tools
• Administrative and secretarial staff

Digital infrastructure must support real-time member interaction.`
    },
    {
      id: 'fit-proper',
      title: 'Key Managerial & Fit and Proper Criteria',
      content: `Directors and key officials must:
• Possess financial sector experience
• Demonstrate integrity and competence
• Not have adverse regulatory findings
• Maintain independence from member NBFCs

Board composition must reflect sectoral representation without dominance by any single entity.`
    },
    {
      id: 'business-plan',
      title: 'Business Plan Requirement (3-Year Projection)',
      content: `The applicant must submit a structured business plan including:
• Membership expansion roadmap
• Revenue model (membership fees, training, advisory services)
• 3-year projected income and expenditure
• Compliance monitoring framework
• Technology deployment strategy
• Grievance redress timeline model

The RBI evaluates sustainability before granting NBFC SRO Registration.`
    },
    {
      id: 'documents',
      title: 'Documents Required for NBFC SRO Registration',
      content: `• Incorporation Certificate — Legal identity proof
• Memorandum & Articles — Governance framework
• Board Composition Details — Independence evaluation
• Net Worth Certificate — Financial eligibility
• Business Plan — Operational sustainability
• Policy Drafts — Compliance mechanisms
• Member List — Representation strength
• Auditor Certificate — Financial transparency

All documents must be properly certified and submitted digitally as per RBI instructions.`
    },
    {
      id: 'process',
      title: 'Step-by-Step Registration Process',
      content: `NBFC SRO Registration Process Flow:
Application Submission → Preliminary Scrutiny → Clarification Stage → Governance Evaluation → Fit & Proper Review → Financial Verification → RBI Approval → Recognition Notification

Process Stages:
• Stage 1 — Application filing
• Stage 2 — RBI scrutiny
• Stage 3 — Clarification responses
• Stage 4 — Board evaluation
• Stage 5 — Recognition order`
    },
    {
      id: 'timeline',
      title: 'Timeline for NBFC SRO Registration',
      content: `While no rigid statutory timeline is prescribed, the approval typically depends on:
• Completeness of documentation
• Clarity of governance structure
• Financial strength
• RBI supervisory assessment

Applicants must plan for multiple rounds of clarifications.`
    },
    {
      id: 'fees',
      title: 'Government Fees',
      content: `The RBI framework does not prescribe a heavy licensing fee; however, administrative application fees, if applicable, must be verified from current circulars.

Applicants must also factor:
• Professional advisory cost
• Infrastructure setup cost
• Compliance system deployment cost`
    },
    {
      id: 'benefits',
      title: 'Benefits of NBFC SRO Registration',
      content: `Upon recognition, the SRO can:
• Represent NBFC industry before RBI
• Facilitate regulatory consultations
• Issue advisory standards for members
• Conduct compliance workshops
• Coordinate sectoral policy responses
• Operate grievance redress platform

NBFC SRO Registration enhances institutional legitimacy.`
    },
    {
      id: 'post-registration',
      title: 'Post-Registration Compliance Obligations',
      content: `Compliance Calendar:
• Reporting to RBI — As prescribed
• Member Compliance Monitoring — Continuous
• Financial Audit — Annual
• Governance Review — Periodic
• Grievance Reporting — Regular

Post-Registration Compliance Cycle:
Member Monitoring → Data Collection → Advisory Issuance → Reporting to RBI → Review & Feedback → Policy Refinement`
    },
    {
      id: 'inspection',
      title: 'Inspection Powers of RBI',
      content: `The RBI retains authority to:
• Seek information
• Conduct inspections
• Review governance processes
• Examine financial statements
• Evaluate grievance handling

NBFC SRO Registration does not dilute regulatory oversight.`
    },
    {
      id: 'suspension',
      title: 'Suspension / Cancellation Triggers',
      content: `Recognition may be withdrawn if:
• Governance standards weaken
• Financial position deteriorates
• Conflict of interest arises
• Reporting obligations are ignored
• Misrepresentation is detected`
    },
    {
      id: 'penalties',
      title: 'Penalties for Non-Compliance',
      content: `While SROs are not traditional licensees like NBFCs, regulatory consequences may include:
• Advisory warnings
• Restrictive directives
• Withdrawal of recognition
• Public disclosure of non-compliance

Credibility risk is significant.`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes Applicants Make',
      content: `• Weak governance independence — Risk of rejection
• Insufficient net worth — Ineligibility
• Incomplete documentation — Delay
• No structured business plan — Regulatory concern
• Lack of compliance roadmap — Supervisory hesitation

Professional structuring improves clarity and approval probability.`
    },
    {
      id: 'strategic-perspective',
      title: 'Strategic Perspective',
      content: `"Self-regulation succeeds only when industry discipline rises above competitive interest and aligns with public trust." — CS Devyani Khambhati – Compliance Expert

NBFC SRO Registration is about institutional maturity, not symbolic representation.`
    },
    {
      id: 'final-conclusion',
      title: 'Final Conclusion',
      content: `NBFC SRO Registration represents a structured evolution in the regulatory architecture of India's NBFC sector. It formalises industry representation while embedding governance accountability. Associations seeking recognition must demonstrate financial stability, operational capability, governance independence and regulatory alignment.

For industry bodies serious about long-term sector development, NBFC SRO Registration offers a platform to shape policy dialogue, enhance compliance standards and strengthen the credibility of the entire NBFC ecosystem.`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is NBFC SRO Registration?", a: "NBFC SRO Registration refers to recognition granted by the Reserve Bank of India (RBI) to a Self-Regulatory Organisation (SRO) representing Non-Banking Financial Companies. The SRO functions as an industry-level body to promote compliance culture, standardise practices, and act as a bridge between RBI and NBFCs." },
        { q: "What does SRO mean in the context of NBFCs?", a: "An SRO for NBFCs is a recognised industry association that undertakes certain self-regulatory functions under RBI oversight. It supports member NBFCs in improving governance, grievance redressal, and adherence to regulatory norms." },
        { q: "Is NBFC SRO Registration mandatory for all NBFCs?", a: "No, NBFC SRO Registration is not mandatory for individual NBFCs. It is applicable to industry bodies or associations seeking recognition as a Self-Regulatory Organisation." },
        { q: "Who grants NBFC SRO Registration in India?", a: "The Reserve Bank of India grants recognition to an SRO for NBFCs under the framework issued by RBI." },
        { q: "What is the objective of introducing NBFC SRO Registration?", a: "The primary objective is to strengthen industry discipline, promote best practices, improve compliance monitoring, and facilitate structured communication between RBI and NBFCs." },
        { q: "Does an NBFC SRO replace RBI supervision?", a: "No. RBI remains the primary regulator. An SRO complements RBI supervision but does not replace regulatory authority." },
        { q: "Can there be more than one NBFC SRO?", a: "RBI has discretion regarding recognition. The framework allows RBI to determine the number of SROs based on regulatory assessment." },
        { q: "Is NBFC SRO Registration the same as NBFC license?", a: "No. NBFC SRO Registration is for an industry body. It is different from NBFC Registration granted to individual lending entities." },
        { q: "What functions does an NBFC SRO perform?", a: "An SRO facilitates grievance redressal, promotes compliance standards, engages with RBI on policy matters, and conducts awareness and training programmes." },
        { q: "Can an NBFC operate without being a member of an SRO?", a: "Yes. Membership in an SRO is not a substitute for RBI registration and is not currently mandatory unless directed otherwise by RBI." }
      ]
    },
    {
      category: 'Eligibility & Applicability',
      faqs: [
        { q: "Who can apply for NBFC SRO Registration?", a: "A not-for-profit company or industry association representing NBFCs can apply, provided it meets RBI's prescribed eligibility conditions." },
        { q: "Can a private limited company apply for NBFC SRO Registration?", a: "Only if it is structured as a not-for-profit entity and complies with RBI's framework requirements." },
        { q: "Can an LLP apply for NBFC SRO Registration?", a: "The RBI framework requires an appropriate legal structure, typically a not-for-profit company. LLPs may not qualify unless permitted under RBI guidelines." },
        { q: "Is prior RBI approval required before forming an SRO?", a: "Formation of an entity does not require RBI approval. However, recognition as an SRO requires formal application and RBI approval." },
        { q: "What minimum representation is required for NBFC SRO Registration?", a: "The applicant must demonstrate broad-based representation of NBFCs across categories and geographies." },
        { q: "Can an association of fintech NBFCs apply for SRO recognition?", a: "Yes, if it represents registered NBFCs and satisfies RBI's governance and eligibility conditions." },
        { q: "Can foreign shareholders hold stake in an SRO?", a: "The SRO must maintain independence and comply with applicable regulatory norms. Any ownership structure must not compromise regulatory neutrality." },
        { q: "Are promoters of an SRO required to be fit and proper?", a: "Yes. Directors and key management personnel must meet fit and proper criteria as assessed by RBI." },
        { q: "Can an existing NBFC apply to become an SRO?", a: "An individual NBFC cannot act as an SRO. The applicant must be an industry-level body and maintain independence from individual NBFC control." },
        { q: "Can RBI reject NBFC SRO Registration application?", a: "Yes. RBI has full discretion to approve or reject applications based on regulatory assessment." }
      ]
    },
    {
      category: 'Legal & Regulatory Framework',
      faqs: [
        { q: "Under which law is NBFC SRO Registration governed?", a: "It is governed by RBI's framework issued under its regulatory powers under the RBI Act." },
        { q: "Is there a specific circular for NBFC SRO Registration?", a: "Yes, RBI has issued a framework detailing eligibility, governance structure, capital requirement, and operational responsibilities." },
        { q: "Does an SRO have enforcement powers?", a: "An SRO does not have statutory enforcement powers like RBI. However, it may enforce internal standards among its members." },
        { q: "Can RBI withdraw NBFC SRO Registration?", a: "Yes. RBI may withdraw recognition if the SRO fails to comply with prescribed conditions." },
        { q: "Is SRO required to submit reports to RBI?", a: "Yes. Regular reporting and updates must be submitted as specified in RBI's framework." },
        { q: "Does SRO recognition require RBI inspection?", a: "RBI may conduct inspection or seek information as part of supervisory oversight." },
        { q: "Is the SRO bound by RBI governance standards?", a: "Yes. The SRO must adhere to governance, transparency, and compliance standards prescribed by RBI." },
        { q: "Can RBI issue directions directly to an SRO?", a: "Yes. RBI may issue directions to ensure compliance with regulatory expectations." },
        { q: "Is SRO recognition time-bound?", a: "Recognition continues subject to compliance. RBI may review performance periodically." },
        { q: "Does SRO have to maintain neutrality among members?", a: "Yes. Independence and neutrality are essential conditions for recognition." }
      ]
    },
    {
      category: 'Registration / Application Process',
      faqs: [
        { q: "How to apply for NBFC SRO Registration?", a: "An eligible entity must submit an application to RBI in the prescribed format along with supporting documents." },
        { q: "What details are required in NBFC SRO application?", a: "The application must include governance structure, membership details, financial position, and operational plan." },
        { q: "Is there an online application portal for NBFC SRO Registration?", a: "Applications are submitted as per RBI's prescribed procedure, which may include electronic submission." },
        { q: "What happens after submission of NBFC SRO application?", a: "RBI scrutinises the application and may seek clarifications or additional documents." },
        { q: "Does RBI conduct interviews before granting SRO recognition?", a: "RBI may conduct interactions with promoters or management to assess capability and independence." },
        { q: "Can RBI ask for modifications in governance structure?", a: "Yes. RBI may require changes before granting recognition." },
        { q: "Is board composition reviewed during registration?", a: "Yes. Independence and diversity of board members are key evaluation parameters." },
        { q: "How is independence of SRO assessed?", a: "RBI examines shareholding pattern, governance structure, and absence of conflict of interest." },
        { q: "Can application be resubmitted if rejected?", a: "Yes, subject to rectification of deficiencies and fresh evaluation by RBI." },
        { q: "Is provisional recognition granted?", a: "RBI may impose conditions while granting recognition." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={['RBI', 'NBFC SRO', 'Self-Regulatory Organisation', 'Industry Body', 'Governance']}
      breadcrumb={['Home', 'RBI Services', 'NBFC SRO Registration']}
      title="NBFC SRO Registration"
      readTime="15 min read"
      focusKeyword="NBFC SRO Registration"
      sections={sections}
      ctaTitle="Ready to Establish Your NBFC Self-Regulatory Organisation?"
      ctaDescription="Get expert guidance on RBI SRO framework eligibility, ₹2 Crore net worth structuring, governance architecture, member representation, and end-to-end recognition application."
      quickFacts={[
        { label: 'Regulator', value: 'Reserve Bank of India (RBI)' },
        { label: 'Framework', value: 'RBI SRO Framework for NBFCs' },
        { label: 'Eligible Entity', value: 'Not-for-profit company / Association' },
        { label: 'Minimum Net Worth', value: '₹2 Crore' },
        { label: 'Net Worth Maintenance', value: 'Continuous' },
        { label: 'Governance', value: 'Independent Board' },
        { label: 'Recognition', value: 'Initially one SRO at RBI discretion' },
        { label: 'Membership', value: 'Broad-based across categories & geographies' },
        { label: 'Business Plan', value: '3-Year Projection mandatory' },
        { label: 'Reporting to RBI', value: 'Regular as prescribed' },
        { label: 'Validity', value: 'Continuous subject to compliance' },
        { label: 'Inspection Power', value: 'Retained by RBI' }
      ]}
      relatedArticles={[
        { title: 'NBFC Registration in India', href: '/rbi/nbfc-registration-in-india' },
        { title: 'NBFC Account Aggregator License', href: '/rbi/nbfc-account-aggregator-license' },
        { title: 'NBFC Business Plan', href: '/rbi/nbfc-business-plan' },
        { title: 'NBFC Legal Support Services', href: '/rbi/nbfc-legal-support' },
        { title: 'ARC Registration in India', href: '/rbi/arc-registration-in-india' }
      ]}
      finalCtaTitle="Need Expert Support for NBFC SRO Recognition?"
      finalCtaDescription="Our compliance specialists provide end-to-end support for SRO recognition applications — governance design, ₹2 Crore net worth planning, member representation strategy, business plan, policy drafting, and ongoing post-recognition compliance."
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
        <h2>Frequently Asked Questions (40 FAQs)</h2>
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
    </ServicePageLayout>
  );
}
