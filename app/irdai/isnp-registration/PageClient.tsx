'use client';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

export default function ISNPRegistrationPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'What is ISNP Registration in India?',
      content: `ISNP Registration in India refers to permission from the Insurance Regulatory and Development Authority of India (IRDAI) to set up an Insurance Self-Network Platform for online sale and servicing of insurance policies. Under IRDAI's Insurance E-Commerce framework, eligible insurers and registered insurance intermediaries — such as brokers, corporate agents and web aggregators — may use ISNP to sell, issue and service insurance products through web or mobile platforms, subject to regulatory and platform-readiness requirements.

The framework was introduced under the IRDAI Guidelines on Insurance E-Commerce dated 9 March 2017 to promote insurance e-commerce, improve insurance penetration, reduce transaction cost and bring efficiency in insurance sales and servicing.

ISNP permission is not a replacement for an insurance intermediary licence. The applicant must first be an eligible insurer or registered insurance intermediary — such as an insurance broker, corporate agent or web aggregator — before seeking ISNP permission.`
    },
    {
      id: 'legal-background',
      title: 'Legal Background of ISNP Registration in India',
      content: `• Regulator — Insurance Regulatory and Development Authority of India
• Primary Framework — IRDAI Guidelines on Insurance E-Commerce dated 9 March 2017
• Applicable Laws — Insurance Act, 1938 and IRDAI Act, 1999
• Platform — Insurance Self-Network Platform
• Purpose — Online sale and servicing of insurance policies
• Eligible Applicants — Insurers and registered insurance intermediaries
• Application Mode — ISNP portal / prescribed IRDAI process
• Key Compliance Areas — Platform certification, customer verification, data security, policy servicing, record maintenance, eIA facilitation and grievance handling

IRDAI supervises the establishment and operation of ISNP to ensure policyholder protection, secure digital distribution and orderly growth of insurance e-commerce in India.`
    },
    {
      id: 'what-is-isnp',
      title: 'What is an Insurance Self-Network Platform?',
      content: `Insurance Self-Network Platform means an electronic platform set up by an eligible applicant with IRDAI permission for undertaking insurance e-commerce activities. It may be in the form of a web platform, mobile platform or other permitted digital interface used to sell and service insurance policies.

A platform set up under ISNP framework typically supports:
• Online insurance policy sale
• Policy servicing
• Renewal premium collection
• Proposal and policy document handling
• Endorsement and policy change support
• Claims support
• e-Insurance Account facilitation
• Digital customer interaction

ISNP is a regulated digital distribution and servicing platform — not merely a normal website or app.`
    },
    {
      id: 'who-can-apply',
      title: 'Who Can Apply for ISNP Registration in India?',
      content: `• Insurer registered with IRDAI — Eligible
• Insurance Broker — Eligible, subject to valid broker registration
• Corporate Agent — Eligible, subject to valid corporate agent registration
• Insurance Web Aggregator — Eligible, subject to valid web aggregator registration
• Other person recognised by IRDAI — May be permitted if recognised by the Authority
• Individual Insurance Agent — Not eligible to set up independent ISNP
• Unregistered fintech platform — Not eligible unless it holds appropriate IRDAI registration / permission

The applicant must have an existing valid IRDAI registration or recognition before applying for ISNP permission, wherever applicable.`
    },
    {
      id: 'who-cannot',
      title: 'Who Cannot Apply for ISNP Registration in India?',
      content: `• Individual tied insurance agent — Cannot set up independent ISNP
• Unregistered insurance marketplace — Not eligible
• Generic technology company without IRDAI intermediary licence — Not eligible
• Entity selling insurance without registration — Prohibited
• Expired / suspended intermediary — Cannot validly operate ISNP
• Entity without web / mobile platform readiness — Application may not be supported
• Entity without certification readiness — Platform approval may be delayed

A technology platform cannot use ISNP permission to bypass insurance intermediary registration requirements. Individual tied agents must use the platform of the respective insurer where available.`
    },
    {
      id: 'comparison',
      title: 'ISNP vs Insurance Web Aggregator vs Insurance Broker',
      content: `• Nature: ISNP — Electronic platform permission | Web Aggregator — Insurance intermediary registration | Broker — Insurance intermediary licence
• Primary Function: ISNP — Online sale and servicing of policies | Web Aggregator — Online comparison / lead generation / sale as permitted | Broker — Insurance advisory and placement
• Applicant: ISNP — Insurer or registered intermediary | Web Aggregator — Eligible company under web aggregator framework | Broker — Company / LLP under broker regulations
• Standalone Licence: ISNP — No, generally linked to existing registration | Web Aggregator — Yes | Broker — Yes
• Representation: ISNP — Depends on applicant's underlying licence | Web Aggregator — As per web aggregator framework | Broker — Represents client
• Scope: ISNP — Digital insurance e-commerce channel | Web Aggregator — Web aggregation and permitted solicitation | Broker — Advisory and broking
• Regulator: All three — IRDAI

ISNP is a platform permission. It should be mapped to the applicant's existing IRDAI registration category.`
    },
    {
      id: 'services-permitted',
      title: 'Services Permitted under ISNP Registration in India',
      content: `• Policy Issuance — Issuance and crediting of policy document or certificate of insurance
• Proposal Processing — Proposal form, medical reports and supporting document handling
• Medical Check-up Coordination — Organising medical check-up and submission of reports
• Endorsements — Issuance of endorsements
• Policy Changes — Change of policy terms, conditions or details
• Renewal Premium Collection — Collection and remittance of renewal premiums to insurers
• Name / Address Changes — Customer details updation
• Assignment / Nomination — Registration or change of assignment and nomination
• Surrender / Maturity / Withdrawals — Customer servicing support for life insurance products
• Free Look Cancellation — Processing of free-look cancellation requests
• Policy Loan — Loan against policy, wherever applicable
• Fund Switch / Premium Redirection — Servicing for ULIP or investment-linked products where applicable
• Revival / Cancellation — Policy revival or cancellation support
• Duplicate Policy — Duplicate policy issuance support
• Death / Maturity Claims — Claims assistance and servicing
• Other Product-Specific Operations — As permitted for the relevant product

The actual scope depends on the applicant's registration category, insurer arrangements and product permissions.`
    },
    {
      id: 'products',
      title: 'Products That Can Be Sold on ISNP',
      content: `Existing insurance products may be sold through ISNP if they are approved under the applicable product filing framework and there is no change in the fundamental characteristics of the product.

Eligible product categories include:
• Life insurance products
• General insurance products
• Health insurance products
• Renewal policies
• Products permitted under applicant's underlying licence
• Products approved by insurer and IRDAI framework

Insurers generally need not re-file a product only because it is sold through ISNP, provided the fundamental characteristics of the product are not changed.`
    },
    {
      id: 'platform-readiness',
      title: 'Platform Readiness for ISNP Registration in India',
      content: `Platform readiness checklist for ISNP applicants:
• Web / mobile platform available
• Secure login and customer journey
• Product display and disclosure controls
• Proposal form submission mechanism
• Payment / premium collection workflow
• Policy document issuance / delivery integration
• eIA facilitation process
• KYC / AML verification integration
• Customer consent and disclosure flow
• Grievance redressal module
• Audit trail and record retention
• Data confidentiality and cyber security controls
• Platform certification from registered certification body

Platform readiness should be demonstrated before or within the prescribed certification window, as applicable.`
    },
    {
      id: 'eia',
      title: 'e-Insurance Account and Insurance Repository under ISNP',
      content: `ISNP framework is closely linked with the electronic insurance ecosystem. An e-Insurance Account, commonly known as eIA, holds insurance policies in electronic form and enables policyholders to access their insurance portfolio digitally.

• eIA — Electronic Insurance Account
• Purpose — Holds insurance policies in electronic format
• Insurance Repository — IRDAI-registered entity authorised to open eIA
• Customer Benefit — Digital access to insurance portfolio
• ISNP Obligation — Facilitate opening of eIA within the prescribed timeline, subject to customer willingness and applicable framework

As per IRDAI FAQ, the applicant is required to facilitate opening of the customer's eIA within 15 days of policy issuance, at the willingness of the customer. Verify the latest position before filing.`
    },
    {
      id: 'kyc-aml',
      title: 'KYC, AML and Customer Verification for ISNP',
      content: `• KYC — Customer verification as per applicable insurance KYC norms
• AML — Compliance with applicable AML framework
• e-KYC — May use permitted e-KYC facilities where allowed
• PAN Verification — May use permitted PAN verification framework
• Customer Consent — Consent and disclosures must be captured digitally
• Record Keeping — KYC and proposal records should be stored securely
• Audit Trail — Complete digital journey should be traceable

KYC / AML compliance remains the responsibility of the insurer / intermediary based on the transaction structure and underlying regulatory framework.`
    },
    {
      id: 'process',
      title: 'Step-by-Step Process for ISNP Registration in India',
      content: `Step 1 — Existing IRDAI Registration Review: Confirm that the applicant is an eligible insurer or registered insurance intermediary such as broker, corporate agent or web aggregator.

Step 2 — Platform Scope Mapping: Identify whether the ISNP will be used for sale, servicing, renewals, claims support, eIA facilitation or other permitted operations.

Step 3 — Web / Mobile Platform Readiness: Prepare the digital platform with customer journey, disclosures, security, proposal flow, payment flow and servicing modules.

Step 4 — ISNP Portal Registration: Register on the ISNP portal / IRDAI prescribed process using valid intermediary or insurer registration details.

Step 5 — Application Form Submission: Submit ISNP application online and generate printable application form or acknowledgement as applicable.

Step 6 — Fee Payment: Submit prescribed non-refundable fee, currently indicated as ₹10,000 plus applicable taxes under IRDAI FAQ, subject to latest verification.

Step 7 — Platform Setup and Certification: Complete platform setup and obtain certification from registered certification body within the prescribed period.

Step 8 — IRDAI Review / Confirmation: Submit certification and supporting documents as required and respond to any clarification.

Step 9 — ISNP Permission / Operational Readiness: Upon regulatory satisfaction, operate the ISNP within the approved scope and underlying licence permissions.

Step 10 — Ongoing Compliance: Maintain cyber security, disclosures, customer records, eIA facilitation, servicing process, grievance redressal and regulatory reporting.`
    },
    {
      id: 'certification',
      title: 'Platform Certification for ISNP Registration in India',
      content: `IRDAI's ISNP process requires the applicant to set up the platform and obtain certification from registered certification bodies within the prescribed period.

Certification areas:
• Security Controls — Secure system architecture and access controls
• Data Protection — Confidentiality of customer and policyholder data
• Customer Journey — Proper disclosure and consent flow
• Payment Flow — Secure premium collection and remittance process
• Policy Servicing — Proper servicing and record maintenance process
• Audit Trail — Complete transaction history and logs
• Business Continuity — Platform continuity and recovery readiness
• Compliance Mapping — Alignment with IRDAI e-commerce requirements

Certification should be planned early. Delayed platform readiness can delay effective ISNP operations.`
    },
    {
      id: 'documents',
      title: 'Documents Required for ISNP Registration in India',
      content: `• Existing IRDAI Registration Documents — Certificate of registration of insurer / broker / corporate agent / web aggregator
• Corporate Documents — Certificate of Incorporation, MOA, AOA / LLP Agreement, PAN and registered office proof
• Platform Documents — Web / mobile platform details, URL, screenshots, user journey and module description
• Technology Documents — System architecture, cyber security policy, data security controls, hosting details and BCP / DR note
• Certification Documents — Certification from registered certification body as applicable
• Product and Service Scope — Details of products to be sold and services to be provided through ISNP
• Insurer / Intermediary Agreements — Underlying tie-ups, arrangements and approvals, where applicable
• KYC / AML Documents — Customer verification process, consent flow and AML compliance note
• Grievance Documents — Complaint redressal mechanism, escalation matrix and customer support process
• Application Documents — ISNP application form, fee payment proof and IRDAI-prescribed declarations`
    },
    {
      id: 'fees',
      title: 'Fees for ISNP Registration in India',
      content: `• Application Fee — ₹10,000 plus applicable taxes, as per IRDAI FAQ
• Certification Cost — As charged by registered certification body
• Professional / Documentation Cost — Case-specific
• Renewal / Continuity Cost — Linked to underlying registration and latest IRDAI requirements

Fees should be verified from the latest IRDAI circulars, FAQs and portal instructions before filing or hardcoding in reusable website data.`
    },
    {
      id: 'timeline',
      title: 'Timeline for ISNP Registration in India',
      content: `• Eligibility and platform scope review — 1 to 2 weeks
• Platform readiness / documentation — Case-specific
• Online application filing — Case-specific
• Platform setup and certification — Generally within 60 days as per ISNP process
• IRDAI review / confirmation — Subject to scrutiny and completeness
• Overall timeline — Depends on platform readiness and certification

Timeline is indicative and depends on the applicant's existing registration, platform readiness, certification, document quality and IRDAI review.`
    },
    {
      id: 'validity',
      title: 'Validity of ISNP Permission',
      content: `• Insurance Intermediary — Generally valid as long as the underlying certificate of registration is valid, unless revoked
• Insurer — Generally valid unless revoked
• Expired / Suspended Intermediary Registration — ISNP cannot continue independently
• Change in Business Scope — Must be reviewed and intimated / approved where required

ISNP permission is connected with the applicant's underlying IRDAI status. It should not be treated as an independent perpetual permission.`
    },
    {
      id: 'post-permission',
      title: 'Post-Permission Compliance for ISNP',
      content: `• Platform Certification — Maintain valid platform certification as required
• Customer Disclosures — Provide clear product, insurer, premium and policy disclosures
• KYC / AML — Follow applicable customer verification process
• eIA Facilitation — Facilitate e-Insurance Account as applicable
• Policy Records — Maintain digital transaction and policy records
• Grievance Redressal — Maintain complaint handling process
• Cyber Security — Maintain secure platform and prevent data leakage
• Audit Trail — Maintain transaction logs and customer journey records
• Product Compliance — Sell only permitted / approved products
• Commission / Remuneration — Follow applicable IRDAI remuneration framework
• Data Confidentiality — Protect policyholder and proposal data
• Regulatory Updates — Track IRDAI circulars and comply with changes`
    },
    {
      id: 'consumer-protection',
      title: 'Consumer Protection under ISNP Registration in India',
      content: `Insurance e-commerce must protect policyholders from mis-selling, data misuse and incomplete disclosures.

Key consumer protection elements:
• Transparent product display
• Clear premium and benefit disclosure
• No misleading comparison
• Consent-based proposal submission
• Secure payment mechanism
• Policy document delivery
• eIA facilitation
• Complaint handling
• Claim support and servicing
• Data privacy and confidentiality`
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security and Data Protection for ISNP',
      content: `• Access Control — Secure login and role-based access
• Encryption — Protection of sensitive data
• Payment Security — Secure premium payment flow
• Data Storage — Safe storage of customer and policy data
• Audit Logs — Complete logs for all platform actions
• VAPT / Security Testing — Recommended / required as per certification process
• Incident Response — Cyber incident handling and escalation
• Vendor Risk — Due diligence of technology vendors
• Privacy — Customer data confidentiality and consent`
    },
    {
      id: 'compliance-calendar',
      title: 'ISNP Compliance Calendar',
      content: `Continuous Compliance:
• Platform uptime and security monitoring — Continuous — Technology / Compliance
• Customer disclosure review — Continuous — Compliance
• KYC / AML verification — Transaction-based — Operations / Compliance
• Grievance handling — Continuous — Customer Support
• Policy and proposal record maintenance — Continuous — Operations
• Data protection monitoring — Continuous — IT / Compliance

Quarterly Compliance:
• Platform control review — IT Head
• Complaint review — Grievance Officer
• Product display review — Compliance
• Audit trail review — Operations

Annual Compliance:
• Platform certification review — IT / Compliance
• Cyber security review — Technology Team
• Intermediary registration check — Compliance
• Business and servicing review — Management

Event-Based Compliance:
• Change in platform architecture — Review and certify / intimate as applicable
• Change in product scope — Regulatory and insurer approval check
• Cyber incident — Immediate investigation and escalation
• Change in underlying intermediary licence — ISNP validity review
• Change in URL / mobile app — Update regulatory records as applicable
• Regulatory inspection / query — Submit records promptly`
    },
    {
      id: 'isnp-vs-website',
      title: 'ISNP vs Normal Insurance Website',
      content: `• Purpose: Normal Website — Information / branding | ISNP — Regulated online sale and servicing of insurance
• IRDAI Permission: Normal Website — Not always required for simple information display | ISNP — Required for ISNP operations
• Policy Sale: Normal Website — Not permitted unless licensed structure exists | ISNP — Permitted within approved framework
• Policy Servicing: Normal Website — Limited | ISNP — Permitted as per framework
• Platform Certification: Normal Website — Not generally required | ISNP — Required as per ISNP process
• Customer Data Handling: Normal Website — General privacy compliance | ISNP — Insurance regulatory and data protection obligations
• Regulatory Supervision: Normal Website — Lower | ISNP — Higher`
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes in ISNP Registration in India',
      content: `• Applying without valid intermediary registration — Application not maintainable
• Treating ISNP as fresh insurance licence — Wrong regulatory approach
• Weak platform readiness — Certification delay
• No eIA facilitation process — Compliance gap
• Poor customer disclosure flow — Mis-selling risk
• No KYC / AML process — Regulatory concern
• No cyber security documentation — Certification / compliance issue
• Assuming individual agent can apply — Ineligible applicant
• Confusing ISNP with web aggregator licence — Wrong positioning
• No audit trail — Inspection risk
• No grievance process — Consumer protection concern
• Selling products outside underlying licence scope — Regulatory violation`
    },
    {
      id: 'strategic-recommendations',
      title: 'Strategic Structuring Recommendations Before Applying',
      content: `• Confirm valid IRDAI intermediary registration
• Map ISNP scope with existing licence category
• Prepare web / mobile platform before filing
• Create customer disclosure journey
• Integrate KYC / AML process
• Plan eIA facilitation
• Prepare cyber security and data protection documents
• Maintain audit trail and record retention system
• Arrange platform certification early
• Build grievance redressal workflow
• Avoid selling products outside permitted scope

"Digital insurance distribution is not only about technology. It is about creating a trustworthy, compliant and auditable customer journey." — CS Devyani Khambhati – Compliance Expert`
    }
  ];

  const faqGroups = [
    {
      category: 'General Overview',
      faqs: [
        { q: "What is ISNP Registration in India?", a: "ISNP Registration in India refers to IRDAI permission to set up an Insurance Self-Network Platform for online sale and servicing of insurance policies." },
        { q: "What is Insurance Self-Network Platform?", a: "Insurance Self-Network Platform means an electronic platform set up by an eligible applicant with permission of IRDAI." },
        { q: "Who regulates ISNP?", a: "ISNP is regulated by the Insurance Regulatory and Development Authority of India." },
        { q: "Which guidelines govern ISNP?", a: "ISNP is governed by IRDAI Guidelines on Insurance E-Commerce dated 9 March 2017 and related circulars / clarifications." }
      ]
    },
    {
      category: 'Eligibility',
      faqs: [
        { q: "Who can apply for ISNP permission?", a: "Insurers and registered insurance intermediaries such as brokers, corporate agents and web aggregators may apply, subject to eligibility." },
        { q: "Can an individual insurance agent set up ISNP?", a: "No. An individual tied agent cannot set up an independent ISNP and must use the platform of the respective insurer where available." },
        { q: "Is ISNP a separate insurance intermediary licence?", a: "No. ISNP is a platform permission linked to an existing insurer or intermediary registration." },
        { q: "Can a fintech company apply directly for ISNP?", a: "A fintech company must first hold an appropriate IRDAI registration or recognition. ISNP cannot be used to bypass insurance intermediary registration." },
        { q: "Is there any exam for ISNP permission?", a: "No separate examination is prescribed for ISNP permission." }
      ]
    },
    {
      category: 'Platform & Certification',
      faqs: [
        { q: "Is a web or mobile platform required?", a: "Yes. The applicant must have a web or mobile platform to sell and service insurance policies." },
        { q: "What is the application fee for ISNP?", a: "IRDAI FAQ indicates a non-refundable fee of ₹10,000 plus applicable taxes, subject to latest verification." },
        { q: "How much time is given for platform setup?", a: "IRDAI FAQ indicates 60 days for platform setup and certification after application process, subject to applicable framework." },
        { q: "Is platform certification required?", a: "Yes. The platform must be certified by registered certification bodies as applicable." },
        { q: "How long is ISNP permission valid?", a: "For insurance intermediaries, it is generally valid as long as the underlying certificate of registration remains valid. For insurers, permission remains valid unless revoked." }
      ]
    },
    {
      category: 'Services & Products',
      faqs: [
        { q: "What services can be offered on ISNP?", a: "ISNP may support policy issuance, proposal forms, medical reports, endorsements, policy changes, renewal premium collection, nomination changes, claims support and other permitted servicing functions." },
        { q: "Can existing insurance products be sold on ISNP?", a: "Yes, existing products may be sold through ISNP if their fundamental characteristics are not changed and they are otherwise permitted." },
        { q: "Does ISNP permit premium collection?", a: "Renewal premium collection and remittance to insurers may be permitted as part of servicing, subject to applicable framework." },
        { q: "Is e-Insurance Account required?", a: "The applicant is required to facilitate opening of eIA within the prescribed timeline at the willingness of the customer, subject to the latest IRDAI framework." },
        { q: "How is KYC carried out on ISNP?", a: "KYC may be carried out through permitted e-KYC, PAN verification or other valid KYC process as allowed under applicable guidelines." }
      ]
    },
    {
      category: 'Pricing & Comparison',
      faqs: [
        { q: "Can ISNP charge separate servicing fee to customers?", a: "IRDAI FAQ states that no separate fee is envisaged under the guidelines, subject to latest regulatory position." },
        { q: "Can ISNP offer discounts?", a: "Insurers may decide discounts as permitted by the Authority and applicable File & Use guidelines." },
        { q: "Is commission different for ISNP products?", a: "Commission and remuneration are governed by applicable IRDAI commission / remuneration regulations." },
        { q: "Is ISNP same as web aggregator registration?", a: "No. Web aggregator registration is an intermediary licence, while ISNP is an e-commerce platform permission that eligible applicants may seek." }
      ]
    },
    {
      category: 'Compliance & Revocation',
      faqs: [
        { q: "Can ISNP operate outside the scope of existing intermediary licence?", a: "No. The platform must operate within the scope of the applicant's existing licence or registration." },
        { q: "Can IRDAI revoke ISNP permission?", a: "Yes. ISNP permission may be revoked for non-compliance, misuse, regulatory breach or other reasons as per IRDAI framework." },
        { q: "What documents are required for ISNP Registration?", a: "Documents generally include existing IRDAI registration certificate, corporate documents, platform details, technology note, certification documents, product scope, KYC / AML process and grievance framework." }
      ]
    },
    {
      category: 'Estabizz Support',
      faqs: [
        { q: "Can Estabizz help with technology development?", a: "Estabizz can support regulatory documentation, platform readiness checklist, compliance framework and coordination. Actual software development may be handled through technical teams where required." },
        { q: "How can Estabizz help with ISNP Registration?", a: "Estabizz assists with eligibility review, platform scope mapping, documentation, ISNP application support, platform certification readiness, KYC / AML process, grievance framework and post-permission compliance." }
      ]
    }
  ];

  return (
    <ServicePageLayout
      tags={[
        { emoji: '🛡️', label: 'IRDAI' },
        { emoji: '🌐', label: 'ISNP' },
        { emoji: '💻', label: 'Insurance E-Commerce' },
        { emoji: '✅', label: 'Expert Reviewed' },
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'IRDAI Services', href: '/irdai' },
        { label: 'ISNP Registration', href: '/irdai/isnp-registration' },
      ]}
      title="ISNP Registration in India – Complete IRDAI Insurance E-Commerce Platform Guide"
      readTime="20 min read"
      focusKeyword="ISNP Registration in India"
      sections={sections}
      ctaTitle="Apply for ISNP Registration"
      ctaDescription="Get structured regulatory support for ISNP Registration in India — eligibility review, platform scope mapping, web/mobile readiness checklist, certification coordination, KYC/AML documentation, eIA facilitation process, grievance redressal framework and post-permission compliance."
      quickFacts={[
        { label: 'Regulator', value: 'IRDAI' },
        { label: 'Framework', value: 'Insurance E-Commerce Guidelines, 2017' },
        { label: 'Platform Name', value: 'Insurance Self-Network Platform' },
        { label: 'Platform Type', value: 'Web / Mobile' },
        { label: 'Eligible Applicants', value: 'Insurers & Registered Intermediaries' },
        { label: 'Individual Agent', value: 'Cannot set up independent ISNP' },
        { label: 'Application Fee', value: '₹10,000 + taxes (verify latest)' },
        { label: 'Platform Setup', value: '60 days (per FAQ)' },
        { label: 'Separate Exam', value: 'Not prescribed' },
        { label: 'eIA Facilitation', value: 'Within 15 days of policy issuance' },
        { label: 'Validity', value: 'Linked to underlying registration' },
        { label: 'Certification', value: 'Required from registered body' },
      ]}
      relatedArticles={[
        { title: 'Insurance Broker Registration', href: '/irdai/insurance-broker-registration-in-india', category: 'IRDAI', description: 'Direct, Reinsurance and Composite Broker registration under IRDAI Insurance Brokers Regulations, 2018.' },
        { title: 'Composite Insurance Broker Registration', href: '/irdai/composite-insurance-broker-registration-in-india', category: 'IRDAI', description: 'Highest category of insurance broking licence covering life, general and reinsurance broking.' },
        { title: 'Corporate Agent Registration', href: '/irdai/corporate-agent-registration-in-india', category: 'IRDAI', description: 'IRDAI Corporate Agent Registration for distribution of insurance products with restricted insurer tie-ups.' },
        { title: 'Insurance Marketing Firm Registration', href: '/irdai/insurance-marketing-firm-registration-in-india', category: 'IRDAI', description: 'IRDAI registration for district-based insurance distribution through Insurance Sales Persons.' },
        { title: 'Reinsurance Broker Registration', href: '/irdai/reinsurance-broker-registration-in-india', category: 'IRDAI', description: 'IRDAI registration for reinsurance broking under IRDAI Insurance Brokers Regulations, 2018.' },
        { title: 'Insurance Repository Registration', href: '/irdai/insurance-repository-registration', category: 'IRDAI', description: 'IRDAI registration for insurance repositories that maintain electronic insurance accounts.' },
      ]}
      finalCtaTitle="Start Your ISNP Registration Journey with Estabizz"
      finalCtaDescription="Build your Insurance Self-Network Platform with structured IRDAI regulatory support — eligibility review, platform scope mapping, web/mobile readiness, certification coordination, KYC/AML documentation, eIA facilitation, grievance redressal framework and post-permission compliance. WhatsApp our team at +91 98256 00907 for a structured consultation."
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
        <h2>Frequently Asked Questions on ISNP Registration in India</h2>
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
        <h2>How Estabizz Helps with ISNP Registration in India</h2>
        <div className="step-timeline">
          <div className="step-item">
            <div className="step-dot">1</div>
            <div className="step-card">
              <h4>Eligibility Assessment</h4>
              <p>We help verify whether the applicant is eligible to apply for ISNP based on existing IRDAI registration.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">2</div>
            <div className="step-card">
              <h4>Platform Scope Mapping</h4>
              <p>We map the proposed online sale and servicing model with the applicant&rsquo;s underlying licence category.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">3</div>
            <div className="step-card">
              <h4>Documentation Support</h4>
              <p>We assist in preparing application forms, declarations, platform notes, product scope and supporting documents.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">4</div>
            <div className="step-card">
              <h4>Technology Readiness Coordination</h4>
              <p>We help prepare platform architecture note, customer journey, data security, audit trail and certification readiness checklist.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">5</div>
            <div className="step-card">
              <h4>KYC / AML and eIA Process</h4>
              <p>We assist in documenting customer verification, consent, eIA facilitation and record maintenance process.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">6</div>
            <div className="step-card">
              <h4>Grievance &amp; Consumer Protection Framework</h4>
              <p>We prepare complaint handling, disclosure, refund, servicing and escalation framework.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">7</div>
            <div className="step-card">
              <h4>IRDAI Application &amp; Query Support</h4>
              <p>We support application filing coordination and structured responses to regulatory clarifications.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">8</div>
            <div className="step-card">
              <h4>Post-Permission Compliance</h4>
              <p>We support platform compliance review, record maintenance, cyber documentation, customer servicing process and regulatory update tracking.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">9</div>
            <div className="step-card">
              <h4>Ticket-Based Execution</h4>
              <p>Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE ESTABIZZ ==================== */}
      <section id="why-choose-estabizz" className="mt-16">
        <h2>Why Choose Estabizz for ISNP Registration in India?</h2>
        <div className="step-timeline">
          <div className="step-item">
            <div className="step-dot">1</div>
            <div className="step-card">
              <h4>IRDAI Regulatory Expertise</h4>
              <p>Our team works across IRDAI licensing and compliance matters and understands insurance intermediary and digital distribution requirements.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">2</div>
            <div className="step-card">
              <h4>Insurance Technology Understanding</h4>
              <p>We understand digital insurance journeys, platform documentation, product display controls, KYC and policy servicing flows.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">3</div>
            <div className="step-card">
              <h4>Compliance Depth</h4>
              <p>We focus on disclosures, eIA facilitation, platform certification, customer protection and ongoing compliance.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">4</div>
            <div className="step-card">
              <h4>Multi-Regulator Experience</h4>
              <p>Estabizz&rsquo;s experience across RBI, SEBI, IRDAI and IFSCA helps in fintech-insurance models touching multiple regulatory domains.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">5</div>
            <div className="step-card">
              <h4>Documentation Strength</h4>
              <p>We prepare practical, regulator-facing notes, SOPs, platform flow documents and compliance frameworks.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-dot">6</div>
            <div className="step-card">
              <h4>End-to-End Support</h4>
              <p>From eligibility review to ISNP application, certification coordination, query support and post-permission compliance, we provide organised professional handholding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REVIEWER & DISCLAIMER ==================== */}
      <section id="reviewer" className="mt-16">
        <h2>Reviewer &amp; Legal Disclaimer</h2>
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> IRDAI, RBI, SEBI, IFSCA, insurance intermediary licensing, ISNP registration, insurance e-commerce, insurance broker compliance, corporate agent compliance and digital insurance distribution.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help insurers, insurance brokers, corporate agents, web aggregators and eligible insurance intermediaries understand the broad IRDAI framework for Insurance Self-Network Platform permission in India.</p>
        </div>
        <p>
          <strong>Legal Disclaimer:</strong> This content is for general informational purposes only and should not be
          treated as legal, regulatory, insurance, financial, technology or investment advice. IRDAI requirements,
          application formats, fee structures, ISNP portal process, certification requirements, eIA obligations, KYC
          requirements and approval processes may change from time to time. Applicants should verify the latest
          regulatory position and obtain professional advice before filing any application with IRDAI. Estabizz does
          not promise or guarantee IRDAI permission; outcomes are subject to IRDAI scrutiny and the fulfilment of
          prescribed conditions.
        </p>
        <p>
          For a structured consultation with our IRDAI compliance team, you may also reach Estabizz on WhatsApp at{" "}
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
            serviceType: "ISNP Registration in India",
            provider: {
              "@type": "Organization",
              name: "Estabizz Fintech Private Limited",
              url: "https://estabizz-site.vercel.app/",
            },
            areaServed: { "@type": "Country", name: "India" },
            description:
              "Professional regulatory consulting support for IRDAI Insurance Self-Network Platform (ISNP) permission — eligibility review, platform scope mapping, web/mobile readiness, certification coordination, KYC/AML documentation, eIA facilitation, grievance redressal framework and post-permission compliance.",
            url: "https://estabizz-site.vercel.app/irdai/isnp-registration",
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
              { "@type": "ListItem", position: 2, name: "IRDAI Services", item: "https://estabizz-site.vercel.app/irdai" },
              { "@type": "ListItem", position: 3, name: "ISNP Registration", item: "https://estabizz-site.vercel.app/irdai/isnp-registration" },
            ],
          }),
        }}
      />
    </ServicePageLayout>
  );
}
