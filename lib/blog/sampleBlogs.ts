import type { Blog, BlogAuthor } from './types';
import { blogCategories } from './categories';

// ─────────────────────────────────────────────────────────────────────────────
// Shared author — replace with real user IDs once auth is wired
// ─────────────────────────────────────────────────────────────────────────────

const estabizzTeam: BlogAuthor = {
  id: 'author_estabizz_team',
  firstName: 'Estabizz',
  lastName: 'Compliance Team',
  email: 'compliance@estabizz.com',
  bio: 'The Estabizz Compliance Team comprises regulatory advisers with extensive experience across RBI, SEBI, IRDAI and IFSCA frameworks, having guided hundreds of fintech companies through licensing, registration and ongoing compliance.',
  role: 'admin',
  designation: 'Regulatory Advisory, Estabizz Fintech',
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared disclaimer — applied to all compliance articles
// ─────────────────────────────────────────────────────────────────────────────

const complianceDisclaimer =
  'This article is published for general informational purposes only and does not constitute legal, regulatory, tax, investment or financial advice. Regulatory requirements are subject to change. Businesses should verify the latest circulars, master directions and regulator guidance before taking any action. Consult a qualified professional for advice specific to your entity and jurisdiction.';

// ─────────────────────────────────────────────────────────────────────────────
// Helper — resolve category by id (typed, no any)
// ─────────────────────────────────────────────────────────────────────────────

function cat(id: string) {
  const found = blogCategories.find((c) => c.id === id);
  if (!found) throw new Error(`Blog category not found: ${id}`);
  return found;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample blogs
// ─────────────────────────────────────────────────────────────────────────────

export const sampleBlogs: Blog[] = [
  // ── 1. NBFC Registration ──────────────────────────────────────────────────
  {
    id: 'blog_001',
    title: 'NBFC Registration in India: Complete Guide to RBI Licensing Requirements 2026',
    slug: 'nbfc-registration-india-rbi-licensing-guide-2026',
    summary:
      'A comprehensive walkthrough of RBI\'s NBFC registration process — covering eligibility, net owned fund requirements, document checklist, application stages and typical timelines for 2026.',
    featuredImage: {
      url: '/images/blog/nbfc-registration-india-cover.jpg',
      alt: 'NBFC Registration in India — RBI Licensing Guide 2026',
      caption: 'RBI NBFC licensing process explained',
    },
    images: [],
    category: cat('cat_nbfc'),
    tags: ['NBFC', 'RBI', 'NBFC Registration', 'Non-Banking Finance Company', 'RBI Licensing'],
    author: estabizzTeam,
    status: 'published',
    featured: true,
    isUserSubmitted: false,
    focusKeyword: 'NBFC Registration India',
    seoTitle: 'NBFC Registration in India: RBI Licensing Requirements 2026 | Estabizz',
    metaDescription:
      'Step-by-step guide to NBFC registration in India. Covers types of NBFCs, eligibility criteria, net owned fund requirement, documents and RBI application process for 2026.',
    readingTime: 9,
    views: 4820,
    likeCount: 127,
    publishedAt: '2026-04-10T08:00:00.000Z',
    createdAt: '2026-04-05T10:00:00.000Z',
    updatedAt: '2026-05-01T09:00:00.000Z',
    ctaText: 'Get Expert Guidance on NBFC Registration',
    disclaimer: complianceDisclaimer,
    content: `
<h2>What Is an NBFC?</h2>
<p>A Non-Banking Finance Company (NBFC) is a company registered under the Companies Act 2013 that engages in financial activities such as lending, investments, leasing, hire purchase or chit fund operations. Unlike banks, NBFCs cannot accept demand deposits or issue cheques drawn on themselves, but they play an indispensable role in extending credit to segments underserved by the formal banking system.</p>
<p>All NBFCs carrying on business in India require a Certificate of Registration (CoR) from the Reserve Bank of India (RBI) under Section 45-IA of the RBI Act, 1934 — unless they fall within a notified exemption category.</p>

<h2>Categories of NBFCs</h2>
<p>RBI classifies NBFCs by activity and by systemic importance:</p>
<h3>By Activity</h3>
<ul>
  <li><strong>Investment and Credit Company (NBFC-ICC)</strong> — Covers the erstwhile loan, investment and asset finance companies. The most common category for new applicants.</li>
  <li><strong>Infrastructure Finance Company (NBFC-IFC)</strong> — Minimum 75% of total assets deployed in infrastructure loans; net owned fund ₹300 crore.</li>
  <li><strong>Micro Finance Institution (NBFC-MFI)</strong> — Minimum 85% of net assets in qualifying microfinance loans; strict household income ceiling.</li>
  <li><strong>Account Aggregator (NBFC-AA)</strong> — Collects and consolidates financial data of customers across financial institutions; does not handle funds.</li>
  <li><strong>Factor (NBFC-Factor)</strong> — Principal business is factoring; minimum 75% of assets in factoring activity.</li>
  <li><strong>P2P Lending Platform (NBFC-P2P)</strong> — Facilitates peer-to-peer lending; individual lender and borrower exposure limits apply.</li>
  <li><strong>Housing Finance Company (HFC)</strong> — Regulated jointly by RBI and NHB; separate registration required with NHB.</li>
</ul>
<h3>By Systemic Importance</h3>
<ul>
  <li><strong>Upper Layer (NBFC-UL)</strong> — Top 10 NBFCs by asset size; enhanced regulatory requirements including listing obligation.</li>
  <li><strong>Middle Layer (NBFC-ML)</strong> — Deposit-taking NBFCs and non-deposit NBFCs with asset size above ₹1,000 crore.</li>
  <li><strong>Base Layer (NBFC-BL)</strong> — Non-deposit NBFCs below ₹1,000 crore. This is where most new registrations begin.</li>
</ul>

<h2>Eligibility Criteria</h2>
<p>Before filing an application, the applicant company must satisfy the following conditions:</p>
<ul>
  <li>Incorporated as a company under the Companies Act, 2013 (or Companies Act, 1956)</li>
  <li>Net Owned Fund (NOF) of at least <strong>₹10 crore</strong> for NBFC-ICC (Base Layer), evidenced by statutory auditor certificate</li>
  <li>The company's principal business must be financial in nature (i.e., financial assets exceed 50% of total assets and financial income exceeds 50% of gross income — the 50-50 test)</li>
  <li>Directors must have relevant financial sector experience and meet the Fit and Proper criteria under RBI's Master Direction</li>
  <li>No defaulter or wilful defaulter among promoters or directors</li>
  <li>A clear and credible Business Plan covering at least 3 years</li>
</ul>

<h2>Documents Required</h2>
<p>The application is submitted online via the RBI COSMOS portal. Key documents include:</p>
<ul>
  <li>Certificate of Incorporation and Memorandum &amp; Articles of Association</li>
  <li>Board Resolution authorising NBFC registration application</li>
  <li>Statutory auditor certificate for Net Owned Fund</li>
  <li>Audited financial statements for the last 2–3 years (or since incorporation)</li>
  <li>Banker's report confirming no adverse history</li>
  <li>KYC, CIBIL and background checks on all directors and promoters</li>
  <li>Detailed Business Plan with financial projections</li>
  <li>IT infrastructure plan, HR policy and internal compliance framework</li>
  <li>CERSAI, MCA and court-search reports on the company</li>
</ul>

<h2>Application Process</h2>
<p>The RBI registration process follows a defined sequence:</p>
<ol>
  <li><strong>Company Incorporation</strong> — Register the company with adequate paid-up capital to meet the NOF threshold.</li>
  <li><strong>Preparation of Application</strong> — Compile all required documents, prepare the Business Plan and statutory auditor certificate.</li>
  <li><strong>Online Submission via COSMOS</strong> — Lodge the application through the RBI's COSMOS portal along with all annexures.</li>
  <li><strong>Regional Office Review</strong> — RBI's Regional Office reviews the application and may seek additional documents or clarifications.</li>
  <li><strong>Central Office Approval</strong> — Final approval is granted by RBI's Central Office in Mumbai.</li>
  <li><strong>Issuance of CoR</strong> — Upon approval, the Certificate of Registration is issued and business may commence.</li>
</ol>

<h2>Typical Timeline</h2>
<p>End-to-end registration typically takes <strong>4 to 8 months</strong> from the date of a complete application submission, subject to no additional queries. Incomplete applications, deficiencies in the Business Plan or adverse background check results can significantly extend the timeline.</p>

<h2>Common Reasons for Rejection or Delay</h2>
<ul>
  <li>NOF certificate not in the prescribed RBI format</li>
  <li>Business Plan lacking credibility or detailed financial projections</li>
  <li>Promoter or director appearing in CIBIL defaulter lists</li>
  <li>Unresolved litigation involving the company or directors</li>
  <li>IT infrastructure plan absent or inadequate</li>
  <li>Mismatch between proposed business activity and NOF level</li>
</ul>

<h2>Post-Registration Compliance</h2>
<p>After receiving the CoR, NBFCs are subject to ongoing obligations including Fair Practices Code, KYC/AML policy, statutory returns, auditor reporting, credit reporting to bureaus and capital adequacy norms applicable to their layer and category.</p>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'What is the minimum Net Owned Fund required for NBFC registration in India?',
        answer:
          'For a new NBFC-ICC (Investment and Credit Company) registration in the Base Layer, the minimum Net Owned Fund (NOF) required is ₹10 crore. Specialised categories such as NBFC-IFC require ₹300 crore. The NOF must be evidenced by a statutory auditor certificate at the time of application.',
      },
      {
        order: 2,
        question: 'How long does the NBFC registration process take?',
        answer:
          'A complete application submitted through the RBI COSMOS portal typically takes 4 to 8 months for a decision. Applications with deficiencies, inadequate Business Plans, or adverse background checks on promoters and directors can take considerably longer. Early and thorough preparation significantly reduces processing time.',
      },
      {
        order: 3,
        question: 'Can an existing company apply for NBFC registration, or does a new company need to be formed?',
        answer:
          'An existing company incorporated under the Companies Act can apply for NBFC registration provided it satisfies the Net Owned Fund requirement, passes the 50-50 principal business test, and meets all Fit and Proper criteria for directors. A new company is not mandatory, but many promoters incorporate a fresh entity to ensure a clean compliance history.',
      },
      {
        order: 4,
        question: 'Is a separate RBI approval required for each type of NBFC activity?',
        answer:
          'Yes. Each NBFC category — such as NBFC-ICC, NBFC-MFI, NBFC-AA, NBFC-P2P or NBFC-Factor — has distinct eligibility criteria, net owned fund thresholds, and regulatory requirements. A company must obtain registration specific to its intended activity. Undertaking activities outside the registered category without prior approval is a regulatory violation.',
      },
      {
        order: 5,
        question: 'What happens if an NBFC fails to maintain the minimum NOF after registration?',
        answer:
          'RBI requires NBFCs to maintain the prescribed NOF on an ongoing basis. Failure to meet the NOF threshold can lead to directions restricting business activities, cancellation of the Certificate of Registration, or other regulatory actions. NBFCs must immediately report any shortfall to RBI and submit a credible plan to restore the required NOF.',
      },
    ],
  },

  // ── 2. Payment Aggregator License ─────────────────────────────────────────
  {
    id: 'blog_002',
    title: 'Payment Aggregator License in India: RBI Compliance Framework and Application Guide 2026',
    slug: 'payment-aggregator-license-india-rbi-guide-2026',
    summary:
      'RBI\'s Payment Aggregator (PA) framework distinguishes aggregators from gateways and imposes strict eligibility, net worth and data-security requirements. This guide explains the full application process, timelines and compliance obligations for 2026.',
    featuredImage: {
      url: '/images/blog/payment-aggregator-license-rbi-cover.jpg',
      alt: 'Payment Aggregator License India — RBI Compliance 2026',
      caption: 'RBI Payment Aggregator authorisation framework',
    },
    images: [],
    category: cat('cat_payment'),
    tags: ['Payment Aggregator', 'RBI', 'PA License', 'Fintech', 'Online Payments', 'PA-PG Guidelines'],
    author: estabizzTeam,
    status: 'published',
    featured: true,
    isUserSubmitted: false,
    focusKeyword: 'Payment Aggregator License India',
    seoTitle: 'Payment Aggregator License in India: RBI Application Guide 2026 | Estabizz',
    metaDescription:
      'Complete guide to RBI Payment Aggregator authorisation. Covers PA vs PG distinction, net worth requirements, application stages, documents, in-principle approval and compliance timeline.',
    readingTime: 8,
    views: 3640,
    likeCount: 98,
    publishedAt: '2026-04-18T08:00:00.000Z',
    createdAt: '2026-04-12T10:00:00.000Z',
    updatedAt: '2026-05-05T09:00:00.000Z',
    ctaText: 'Speak to Our Payment Regulatory Experts',
    disclaimer: complianceDisclaimer,
    content: `
<h2>Payment Aggregator vs Payment Gateway: The Critical Distinction</h2>
<p>Under RBI's Guidelines on Regulation of Payment Aggregators and Payment Gateways (March 2020 and subsequent amendments), the two roles are clearly separated:</p>
<ul>
  <li>A <strong>Payment Aggregator (PA)</strong> facilitates e-commerce merchants in accepting payments from customers. It receives customer funds, holds them in a nodal/escrow account and settles them to merchants. Because PAs handle funds, they require RBI authorisation.</li>
  <li>A <strong>Payment Gateway (PG)</strong> provides the technical infrastructure for payment processing but never takes custody of funds. PGs are not required to obtain a separate RBI authorisation under the PA-PG framework but must comply with RBI's data-localisation and security requirements.</li>
</ul>
<p>Any entity operating as a PA without authorisation is in violation of the Payment and Settlement Systems Act, 2007 (PSS Act) and liable to regulatory action.</p>

<h2>Who Needs a Payment Aggregator Authorisation?</h2>
<p>An entity needs RBI PA authorisation if it:</p>
<ul>
  <li>Provides payment facilitation services to multiple merchants on a single platform</li>
  <li>Receives funds from customers on behalf of merchants</li>
  <li>Settles funds to merchants, net of charges</li>
</ul>
<p>Existing PA operators (those operating as of January 2020) were required to apply for in-principle authorisation by specified RBI deadlines. New entrants must obtain authorisation before commencing PA activities.</p>

<h2>Eligibility Criteria</h2>
<p>Key conditions that must be satisfied before applying:</p>
<ul>
  <li><strong>Net Worth for new applicants:</strong> Minimum ₹25 crore at the time of application, increasing to ₹25 crore by March 31 of the year following authorisation.</li>
  <li><strong>Net Worth for existing PAs:</strong> ₹25 crore by March 31, 2023 (as per RBI directions).</li>
  <li>Entity must be incorporated as a company in India under the Companies Act.</li>
  <li>No regulatory action, wilful default or adverse credit history against the company or its promoters.</li>
  <li>Promoters and key management must satisfy Fit and Proper criteria including background and antecedent checks.</li>
  <li>Must demonstrate adequate technical infrastructure, security protocols and a robust grievance redressal mechanism.</li>
</ul>

<h2>Application Process</h2>
<p>RBI's PA authorisation follows a two-stage process:</p>
<ol>
  <li><strong>In-Principle Approval (IPA):</strong> The applicant submits the application with all required documents to the Department of Payment and Settlement Systems (DPSS), RBI. RBI reviews eligibility, net worth, background of promoters and the technology/security framework. An IPA letter is issued if the application is found in order.</li>
  <li><strong>Final Authorisation:</strong> Within 6 months of the IPA, the entity must complete any conditions specified and demonstrate operational readiness. Upon satisfying all conditions, RBI grants the Certificate of Authorisation (CoA).</li>
</ol>

<h2>Key Documents</h2>
<ul>
  <li>Certificate of Incorporation and MoA/AoA</li>
  <li>Audited financials for the last 2–3 years</li>
  <li>CA Certificate certifying Net Worth</li>
  <li>Board Resolution authorising the PA application</li>
  <li>KYC, antecedent verification and CIBIL check for all directors and significant shareholders</li>
  <li>IS Audit Report from a CERT-In empanelled auditor (for existing operators)</li>
  <li>Business Plan detailing merchant onboarding, risk framework and grievance mechanism</li>
  <li>Technology and security framework document</li>
  <li>Escrow/nodal account arrangement with a scheduled commercial bank</li>
</ul>

<h2>Merchant Onboarding and Compliance Obligations</h2>
<p>PAs must conduct thorough merchant due diligence before onboarding. Key obligations post-authorisation include:</p>
<ul>
  <li>Maintaining a nodal/escrow account with a scheduled commercial bank for funds settlement</li>
  <li>Implementing KYC-based merchant onboarding with background verification</li>
  <li>Adhering to merchant settlement timelines prescribed by RBI</li>
  <li>Implementing data-security standards (PCI-DSS compliance)</li>
  <li>Prohibiting storage of customer card credentials (data localisation)</li>
  <li>Filing periodic returns with RBI's DPSS</li>
  <li>Conducting annual IS audits</li>
</ul>

<h2>Timeline</h2>
<p>From submission of a complete application, the IPA process typically takes <strong>3 to 6 months</strong>. Final authorisation is granted within a further <strong>6 months</strong> of meeting the IPA conditions, subject to no additional queries. The total end-to-end timeline is therefore typically 9 to 12 months for well-prepared applicants.</p>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'What is the difference between a Payment Aggregator and a Payment Gateway in India?',
        answer:
          'A Payment Aggregator (PA) receives customer funds on behalf of merchants and settles them after deducting charges — it handles money and requires RBI authorisation. A Payment Gateway (PG) only provides the technical infrastructure (APIs, checkout pages) for payment routing but never takes custody of funds. PGs are not required to obtain a separate RBI authorisation under the PA framework.',
      },
      {
        order: 2,
        question: 'What is the minimum net worth required to apply for a Payment Aggregator authorisation?',
        answer:
          'New PA applicants must demonstrate a minimum net worth of ₹25 crore at the time of application and maintain this level throughout the authorisation period. Net worth is calculated as paid-up equity capital plus free reserves minus accumulated losses, deferred revenue expenditure and intangibles, and must be certified by a Chartered Accountant.',
      },
      {
        order: 3,
        question: 'Can a foreign-owned company obtain a Payment Aggregator license in India?',
        answer:
          'A company incorporated in India under the Companies Act may apply even if it has foreign investment, provided it complies with applicable FDI policy for the payment sector and meets all RBI eligibility criteria. The key requirement is Indian incorporation — a foreign company cannot directly hold a PA authorisation. All significant beneficial owners and key management personnel must satisfy the Fit and Proper criteria.',
      },
      {
        order: 4,
        question: 'What is a nodal or escrow account and why is it mandatory for PAs?',
        answer:
          'A nodal/escrow account is a designated bank account maintained by the PA with a scheduled commercial bank. Customer payments received by the PA are held in this account before being settled to merchants. It is mandatory to ensure that customer funds are protected, are not co-mingled with the PA\'s own funds, and are available for timely settlement. RBI specifies detailed conditions on how these accounts are to be operated.',
      },
    ],
  },

  // ── 3. SEBI AIF Registration ──────────────────────────────────────────────
  {
    id: 'blog_003',
    title: 'SEBI AIF Registration: Complete Guide to Alternate Investment Fund Setup in India 2026',
    slug: 'sebi-aif-registration-alternate-investment-fund-india-2026',
    summary:
      'SEBI\'s Alternative Investment Fund framework covers Category I, II and III funds with distinct eligibility, minimum corpus and investor requirements. This guide covers the full registration process, key conditions and compliance obligations for fund managers in 2026.',
    featuredImage: {
      url: '/images/blog/sebi-aif-registration-india-cover.jpg',
      alt: 'SEBI AIF Registration — Alternate Investment Fund India Guide',
      caption: 'Setting up an AIF under SEBI AIF Regulations 2012',
    },
    images: [],
    category: cat('cat_aif'),
    tags: ['SEBI', 'AIF', 'Alternative Investment Fund', 'Category I AIF', 'Category II AIF', 'Category III AIF', 'Fund Registration'],
    author: estabizzTeam,
    status: 'published',
    featured: false,
    isUserSubmitted: false,
    focusKeyword: 'SEBI AIF Registration',
    seoTitle: 'SEBI AIF Registration: Alternate Investment Fund Setup Guide 2026 | Estabizz',
    metaDescription:
      'Complete guide to SEBI AIF registration. Covers Category I, II and III distinctions, minimum corpus, eligible investors, PPM requirements and the SEBI application process for 2026.',
    readingTime: 10,
    views: 2890,
    likeCount: 74,
    publishedAt: '2026-04-25T08:00:00.000Z',
    createdAt: '2026-04-18T10:00:00.000Z',
    updatedAt: '2026-05-08T09:00:00.000Z',
    ctaText: 'Consult Estabizz for AIF Registration',
    disclaimer: complianceDisclaimer,
    content: `
<h2>What Is an Alternative Investment Fund (AIF)?</h2>
<p>An Alternative Investment Fund (AIF) is any fund established or incorporated in India as a trust, company, limited liability partnership or body corporate that pools capital from sophisticated investors for investing in accordance with a defined investment policy. AIFs are regulated under the SEBI (Alternative Investment Funds) Regulations, 2012 and must obtain registration from SEBI before accepting any commitments from investors.</p>
<p>AIFs are designed for sophisticated investors — each investor must commit a minimum of ₹1 crore (₹25 lakh for employees and directors of the AIF or its manager). The framework is the primary regulatory vehicle for private equity funds, venture capital funds, hedge funds, real estate funds, social impact funds and debt funds in India.</p>

<h2>Three Categories of AIFs</h2>
<h3>Category I AIF</h3>
<p>Category I AIFs include funds that invest in start-ups, early-stage ventures, social ventures, SMEs, infrastructure or other sectors which the government or regulators consider as socially or economically desirable. Sub-categories include:</p>
<ul>
  <li>Venture Capital Fund (VCF)</li>
  <li>Social Venture Fund (SVF)</li>
  <li>Infrastructure Fund</li>
  <li>Angel Fund (minimum investment per investor ₹25 lakh; minimum corpus ₹10 crore)</li>
</ul>
<p>Category I AIFs are eligible for certain government incentives. They cannot engage in leverage or borrowing except for meeting temporary funding requirements.</p>

<h3>Category II AIF</h3>
<p>Category II is a catch-all for funds that do not fall under Category I or III and do not engage in leverage or borrowing other than for meeting day-to-day operational requirements. This category covers:</p>
<ul>
  <li>Private Equity Funds</li>
  <li>Real Estate Funds</li>
  <li>Debt Funds</li>
  <li>Fund of Funds</li>
</ul>
<p>Minimum corpus: ₹20 crore for each scheme. Minimum investor commitment: ₹1 crore.</p>

<h3>Category III AIF</h3>
<p>Category III AIFs employ diverse or complex trading strategies and may engage in leverage including through investment in listed or unlisted derivatives. This category covers hedge funds and PIPE (Private Investment in Public Equity) funds. Category III AIFs face enhanced disclosure and risk-management requirements. Minimum corpus: ₹20 crore.</p>

<h2>Eligibility and Key Structural Requirements</h2>
<ul>
  <li><strong>Legal structure:</strong> Trust (most common), company, LLP or body corporate incorporated in India.</li>
  <li><strong>Manager / Sponsor:</strong> The Manager must have at least one Key Management Person (KMP) with relevant experience in fund management, advisory or related financial services.</li>
  <li><strong>Minimum Corpus:</strong> ₹20 crore for Cat I (except Angel Funds: ₹10 crore) and Cat II/III.</li>
  <li><strong>Minimum investment per investor:</strong> ₹1 crore (₹25 lakh for employees/directors of the fund or manager).</li>
  <li><strong>Maximum number of investors per scheme:</strong> 1,000 (100 for Angel Funds).</li>
  <li><strong>Tenure:</strong> Close-ended funds must have a minimum tenure of 3 years for Category I and II. Open-ended funds are permitted only for Category III.</li>
</ul>

<h2>Application Process</h2>
<ol>
  <li><strong>Structuring and legal setup</strong> — Incorporate the fund vehicle (typically a Trust) and the Manager entity. Draft the Trust Deed and investment management agreement.</li>
  <li><strong>Prepare the application</strong> — Compile the SEBI application form, draft the Private Placement Memorandum (PPM), and prepare all supporting documents.</li>
  <li><strong>Submit via SEBI IPEF portal</strong> — The application, PPM and documents are submitted electronically with the applicable fee.</li>
  <li><strong>SEBI review</strong> — SEBI may seek clarifications or additional documents. This stage typically takes 4–8 weeks.</li>
  <li><strong>Registration certificate</strong> — Upon satisfying SEBI's requirements, the Registration Certificate is issued.</li>
  <li><strong>First close</strong> — The fund can proceed to raise commitments from investors and conduct a first close of the scheme.</li>
</ol>

<h2>Private Placement Memorandum (PPM)</h2>
<p>Every AIF must issue a PPM before launching a scheme. The PPM must contain the fund's investment objective, strategy, risk factors, fee structure, carry structure, key personnel, conflicts of interest, exit mechanism and governance framework. SEBI requires the PPM to be filed with SEBI at least 30 days prior to launch of the scheme.</p>

<h2>Ongoing Compliance</h2>
<p>Registered AIFs must comply with periodic reporting to SEBI (quarterly and annual reports via the SEBI data portal), valuation of investments by an independent valuer, disclosure to investors on a defined schedule, compliance with SEBI's master circulars on AIFs and adherence to the investment conditions specified in the registration certificate.</p>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'What is the minimum corpus required to register an AIF with SEBI?',
        answer:
          'The minimum corpus for each scheme is ₹20 crore for Category I (other than Angel Funds), Category II and Category III AIFs. For Angel Funds (a sub-category of Category I), the minimum corpus is ₹10 crore. The corpus must be raised through private placement and no public offering is permitted.',
      },
      {
        order: 2,
        question: 'What is the minimum investment amount for an AIF investor?',
        answer:
          'The minimum investment per investor in an AIF is ₹1 crore. The only exception is for employees and directors of the AIF or its Manager / Sponsor — they may invest a minimum of ₹25 lakh. These thresholds apply across all three categories of AIFs.',
      },
      {
        order: 3,
        question: 'Can an AIF be set up as an LLP instead of a Trust?',
        answer:
          'Yes. SEBI\'s AIF Regulations permit the fund to be established as a trust, company, limited liability partnership (LLP) or body corporate incorporated in India. However, a trust structure (typically an irrevocable private trust) is the most commonly used form due to its tax transparency benefits and established market practice.',
      },
      {
        order: 4,
        question: 'Is a foreign fund manager eligible to manage an Indian AIF?',
        answer:
          'The AIF entity itself must be incorporated in India. However, a foreign fund manager may provide advisory or sub-advisory services to the Indian Manager, subject to applicable SEBI regulations and FEMA guidelines on outward investment. The Indian Manager retains accountability for compliance with SEBI AIF Regulations and bears regulatory responsibility.',
      },
    ],
  },

  // ── 4. IRDAI Insurance Broker ─────────────────────────────────────────────
  {
    id: 'blog_004',
    title: 'IRDAI Insurance Broker Registration: Eligibility, Net Worth and Licensing Process 2026',
    slug: 'irdai-insurance-broker-registration-eligibility-process-2026',
    summary:
      'Obtaining an IRDAI Insurance Broker licence requires meeting specific net worth, infrastructure and training criteria. This guide covers the three broker categories — direct, reinsurance and composite — and the full application process for 2026.',
    featuredImage: {
      url: '/images/blog/irdai-insurance-broker-registration-cover.jpg',
      alt: 'IRDAI Insurance Broker Registration — Licensing Process 2026',
      caption: 'IRDAI insurance broker licence categories and requirements',
    },
    images: [],
    category: cat('cat_insurance'),
    tags: ['IRDAI', 'Insurance Broker', 'Direct Broker', 'Composite Broker', 'Reinsurance Broker', 'Insurance License India'],
    author: estabizzTeam,
    status: 'published',
    featured: false,
    isUserSubmitted: false,
    focusKeyword: 'IRDAI Insurance Broker Registration',
    seoTitle: 'IRDAI Insurance Broker Registration: Eligibility & Process 2026 | Estabizz',
    metaDescription:
      'Step-by-step guide to IRDAI insurance broker registration. Covers direct, reinsurance and composite broker categories, net worth requirements, infrastructure, training and application process.',
    readingTime: 8,
    views: 2150,
    likeCount: 61,
    publishedAt: '2026-05-02T08:00:00.000Z',
    createdAt: '2026-04-25T10:00:00.000Z',
    updatedAt: '2026-05-10T09:00:00.000Z',
    ctaText: 'Get Help with Your Insurance Broker Application',
    disclaimer: complianceDisclaimer,
    content: `
<h2>What Is an Insurance Broker?</h2>
<p>An Insurance Broker is an intermediary that represents the interests of the policyholder — not the insurer — in procuring insurance cover. Brokers are regulated by the Insurance Regulatory and Development Authority of India (IRDAI) under the IRDAI (Insurance Brokers) Regulations, 2018. Any person or entity soliciting or procuring insurance business for a fee or commission must hold a valid IRDAI licence. Operating without a licence is a criminal offence under the Insurance Act, 1938.</p>

<h2>Categories of Insurance Brokers</h2>
<h3>Direct Broker</h3>
<p>A Direct Broker procures insurance business for clients from life and/or general insurance companies operating in India. Sub-types include Life Only, General Only, and Life &amp; General (combined). Net worth requirement: <strong>₹75 lakh</strong>.</p>

<h3>Reinsurance Broker</h3>
<p>A Reinsurance Broker arranges reinsurance on behalf of Indian insurance companies or reinsurers. This category requires deep market expertise and strong relationships with global reinsurance markets. Net worth requirement: <strong>₹4 crore</strong>.</p>

<h3>Composite Broker</h3>
<p>A Composite Broker is licensed to operate as both a Direct Broker and a Reinsurance Broker — providing end-to-end brokerage services for policyholders and insurers. Net worth requirement: <strong>₹4 crore</strong>.</p>

<h2>Eligibility Criteria</h2>
<p>Applicants must satisfy the following conditions before applying to IRDAI:</p>
<ul>
  <li><strong>Legal structure:</strong> Incorporated as a company under the Companies Act, 2013. Partnership firms and LLPs are not eligible.</li>
  <li><strong>Net Worth:</strong> As specified per broker category above, maintained throughout the licence period.</li>
  <li><strong>Principal Officer (PO):</strong> The designated PO must hold the IRDAI prescribed qualification — typically a post-graduate degree in insurance or a related field, and must have cleared the Insurance Brokers Qualifying Examination (IBQE).</li>
  <li><strong>Trained Persons:</strong> Minimum number of trained persons as required per IRDAI norms (varies by broker category).</li>
  <li><strong>Infrastructure:</strong> Adequate office infrastructure, IT systems, professional indemnity insurance and a Board-approved compliance framework.</li>
  <li><strong>No adverse history:</strong> No conviction, disqualification or regulatory action against the company or its promoters/directors.</li>
</ul>

<h2>Application Process</h2>
<ol>
  <li><strong>Company Incorporation</strong> — Incorporate the broking entity with MoA/AoA specifying insurance broking as the principal activity.</li>
  <li><strong>Appointment of Principal Officer</strong> — Appoint and train the PO. Ensure the PO clears the IBQE if not already qualified.</li>
  <li><strong>Preparation of Application</strong> — Compile all documents, prepare the compliance plan, and procure professional indemnity insurance.</li>
  <li><strong>Submission to IRDAI</strong> — Submit the application online through the IRDAI Bima Bharosa portal along with all annexures and the prescribed fee.</li>
  <li><strong>IRDAI Review</strong> — IRDAI verifies the application, may call for additional documents or conduct an interview of the PO.</li>
  <li><strong>Grant of Licence</strong> — A 3-year licence is issued upon satisfying all requirements. It is renewable every 3 years.</li>
</ol>

<h2>Key Documents Required</h2>
<ul>
  <li>Certificate of Incorporation and MoA/AoA</li>
  <li>Board Resolution for the application</li>
  <li>Audited financials and CA certificate for net worth</li>
  <li>PO appointment letter, qualification certificates and IBQE certificate</li>
  <li>Professional indemnity insurance policy</li>
  <li>Infrastructure details — office, IT, compliance procedures</li>
  <li>KYC and background documents for promoters, directors and the PO</li>
  <li>Compliance manual and business plan</li>
</ul>

<h2>Post-Licence Obligations</h2>
<p>Licensed brokers must adhere to IRDAI's Code of Conduct, maintain records of all insurance placements, file annual returns with IRDAI, ensure all broker-qualified persons maintain their competency, renew professional indemnity insurance annually, and comply with IRDAI circulars and master guidelines applicable to brokers.</p>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'What is the difference between a Direct Broker and a Composite Broker under IRDAI?',
        answer:
          'A Direct Broker procures primary insurance on behalf of clients (policyholders) from insurance companies. A Composite Broker is licensed to undertake both direct broking and reinsurance broking, enabling it to serve both corporate clients seeking insurance cover and insurance companies seeking reinsurance. Composite broking requires a higher net worth of ₹4 crore versus ₹75 lakh for a Direct Broker.',
      },
      {
        order: 2,
        question: 'Can a company without any insurance sector experience obtain an IRDAI broker licence?',
        answer:
          'Yes, prior insurance sector experience is not a mandatory criterion for the company itself, but the Principal Officer (PO) must hold the prescribed qualification and pass the Insurance Brokers Qualifying Examination (IBQE). In practice, IRDAI expects the management team to demonstrate adequate knowledge of insurance products, regulations and the broking business through the application and any interaction with IRDAI.',
      },
      {
        order: 3,
        question: 'For how long is the IRDAI Insurance Broker licence valid?',
        answer:
          'An IRDAI Insurance Broker licence is initially granted for 3 years. It must be renewed before expiry for a further 3-year period. IRDAI expects brokers to maintain all prescribed conditions — net worth, qualified personnel, professional indemnity insurance and compliance obligations — throughout the licence period and at the time of renewal.',
      },
      {
        order: 4,
        question: 'Is a physical office in India mandatory to obtain an IRDAI broker licence?',
        answer:
          'Yes. IRDAI requires the applicant to have adequate physical office infrastructure to carry out broking operations professionally. The office should be equipped with IT systems for policy management, communication facilities and a suitable environment to meet clients and regulators. A registered office address that is merely a mail-drop or virtual office is generally not considered adequate.',
      },
    ],
  },

  // ── 5. IFSCA Finance Company GIFT IFSC ────────────────────────────────────
  {
    id: 'blog_005',
    title: 'Finance Company Registration in GIFT IFSC: IFSCA Framework and Setup Requirements 2026',
    slug: 'finance-company-registration-gift-ifsc-ifsca-guide-2026',
    summary:
      'GIFT IFSC offers global businesses a unique opportunity to set up India-based international financial operations under the IFSCA regulatory framework. This guide covers the types of finance companies, eligibility, tax benefits and the IFSCA registration process for 2026.',
    featuredImage: {
      url: '/images/blog/ifsca-gift-ifsc-finance-company-cover.jpg',
      alt: 'Finance Company Registration GIFT IFSC — IFSCA Guide 2026',
      caption: 'Setting up a Finance Company in GIFT IFSC under IFSCA',
    },
    images: [],
    category: cat('cat_ifsca'),
    tags: ['IFSCA', 'GIFT City', 'GIFT IFSC', 'Finance Company', 'IFSC Registration', 'NBFC-IFC'],
    author: estabizzTeam,
    status: 'published',
    featured: false,
    isUserSubmitted: false,
    focusKeyword: 'Finance Company Registration GIFT IFSC',
    seoTitle: 'Finance Company Registration in GIFT IFSC: IFSCA Guide 2026 | Estabizz',
    metaDescription:
      'Comprehensive guide to setting up a Finance Company in GIFT IFSC. Covers IFSCA Finance Company framework, Finance Unit, GRCTC, eligibility, tax benefits and registration process for 2026.',
    readingTime: 9,
    views: 1870,
    likeCount: 53,
    publishedAt: '2026-05-08T08:00:00.000Z',
    createdAt: '2026-04-28T10:00:00.000Z',
    updatedAt: '2026-05-12T09:00:00.000Z',
    ctaText: 'Explore GIFT IFSC Setup with Estabizz',
    disclaimer: complianceDisclaimer,
    content: `
<h2>What Is GIFT IFSC?</h2>
<p>Gujarat International Finance Tec-City (GIFT City) is India's first operational International Financial Services Centre (IFSC). Located in Gandhinagar, Gujarat, GIFT IFSC provides a globally competitive regulatory and tax environment for financial services businesses that conduct transactions in foreign currencies. It is regulated by the International Financial Services Centres Authority (IFSCA), established under the IFSCA Act, 2019.</p>
<p>GIFT IFSC is positioned as India's answer to global IFSCs such as Singapore's MAS jurisdiction, Dubai's DIFC and London's financial district — offering businesses the ability to operate under a single, unified regulator with a progressive and responsive regulatory approach.</p>

<h2>Finance Company Framework under IFSCA</h2>
<p>IFSCA has issued the IFSCA (Finance Company) Regulations, 2021 which govern the registration and operation of Finance Companies in GIFT IFSC. Three main sub-types are relevant:</p>

<h3>Finance Unit</h3>
<p>A Finance Unit is the most commonly registered entity. It is established in GIFT IFSC to undertake lending, investing, or related financial activities denominated in foreign currencies. It can be a branch of a foreign company or an Indian company. Minimum Net Owned Fund: <strong>USD 0.5 million</strong>.</p>

<h3>Finance Company</h3>
<p>A standalone Finance Company is a company incorporated in GIFT IFSC (under the Companies Act with registered office in the SEZ). It can undertake lending, investment, leasing and related services. Minimum Net Owned Fund: <strong>USD 0.5 million</strong>.</p>

<h3>Global or Regional Corporate Treasury Centre (GRCTC)</h3>
<p>A GRCTC is set up by multinational groups to centralise treasury operations — including inter-company lending, forex hedging, cash pooling and liquidity management — for the group's entities across geographies. Minimum Net Owned Fund: <strong>USD 0.5 million</strong>.</p>

<h2>Key Benefits of Operating from GIFT IFSC</h2>
<ul>
  <li><strong>Tax incentives:</strong> 100% income tax exemption for 10 consecutive years (out of a 15-year block) under Section 80LA of the Income Tax Act.</li>
  <li><strong>No GST:</strong> Services rendered within the IFSC are exempt from GST.</li>
  <li><strong>No STT/CTT/stamp duty:</strong> Securities transaction tax, commodities transaction tax and stamp duty exemptions are available on most financial transactions.</li>
  <li><strong>Foreign currency operations:</strong> All business is conducted in freely convertible foreign currencies (USD, EUR, GBP, etc.), eliminating INR exposure for international transactions.</li>
  <li><strong>FEMA liberalisation:</strong> Special exemptions from certain FEMA regulations that apply to domestic entities.</li>
  <li><strong>Progressive regulation:</strong> IFSCA operates as a single, unified regulator, reducing regulatory complexity compared to the domestic multi-regulator environment.</li>
</ul>

<h2>Eligibility</h2>
<ul>
  <li>Applicant must be an entity incorporated in India (including GIFT IFSC), a branch of a foreign company, or an entity controlled by an Indian group.</li>
  <li>Net Owned Fund of minimum USD 0.5 million must be maintained at all times.</li>
  <li>Board and KMP must meet IFSCA's Fit and Proper criteria.</li>
  <li>Must have a physical presence and sufficient staff in GIFT IFSC (IFSCA substance requirements apply).</li>
  <li>Business plan must demonstrate genuine financial activity and not be a shell arrangement.</li>
</ul>

<h2>Registration Process</h2>
<ol>
  <li><strong>Corporate structuring</strong> — Decide the entity type (Finance Unit/Finance Company/GRCTC), source of capital and operational model.</li>
  <li><strong>IFSCA application</strong> — Submit the prescribed application form with Business Plan, KYC documents, net worth evidence and fee through the IFSCA e-filing system.</li>
  <li><strong>IFSCA review</strong> — IFSCA reviews the application and may call for a presentation or additional documentation.</li>
  <li><strong>In-Principle Approval</strong> — Upon a satisfactory review, IFSCA grants In-Principle Approval with conditions.</li>
  <li><strong>Final registration</strong> — The entity satisfies the conditions (physical setup, net worth), and IFSCA issues the Certificate of Registration.</li>
  <li><strong>Commencement of operations</strong> — The entity can commence foreign currency financial activities.</li>
</ol>

<h2>Substance and Governance Requirements</h2>
<p>IFSCA requires entities to maintain genuine economic substance in GIFT IFSC. This means adequate office space, management personnel physically present in GIFT IFSC, decision-making conducted in IFSC, and a credible workforce proportionate to the scale of operations. These requirements align with international BEPS standards and are essential for the entity to benefit from the tax advantages GIFT IFSC offers.</p>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'What is the minimum capital requirement to set up a Finance Company in GIFT IFSC?',
        answer:
          'The minimum Net Owned Fund required for a Finance Unit, Finance Company or GRCTC in GIFT IFSC is USD 0.5 million (or equivalent in another freely convertible foreign currency). This must be maintained at all times and is to be evidenced by an auditor\'s certificate. Higher-risk or larger-scale activities may attract additional capital requirements as specified by IFSCA.',
      },
      {
        order: 2,
        question: 'Can an Indian company establish a Finance Unit in GIFT IFSC?',
        answer:
          'Yes. An Indian company can establish a Finance Unit in GIFT IFSC as a branch, subsidiary or a separately incorporated entity within the SEZ. Transactions with domestic Indian entities (outside the IFSC) are treated as cross-border transactions and are subject to FEMA regulations. Capital for GIFT IFSC operations is typically brought in as foreign currency inward remittances or external commercial borrowings.',
      },
      {
        order: 3,
        question: 'What are the ongoing compliance requirements for a Finance Company in GIFT IFSC?',
        answer:
          'IFSCA-registered Finance Companies must file periodic returns with IFSCA (monthly, quarterly and annual), maintain audited financial statements in foreign currency, comply with IFSCA\'s risk management guidelines, adhere to Fit and Proper conditions for KMP changes, and maintain substance in GIFT IFSC. Entities that benefit from income tax exemptions must also file returns with the Income Tax department and comply with Section 80LA conditions.',
      },
    ],
  },

  // ── 6. FIU-IND Registration & PMLA ───────────────────────────────────────
  {
    id: 'blog_006',
    title: 'FIU-IND Registration and PMLA Compliance: Obligations for Fintech Businesses in India 2026',
    slug: 'fiu-ind-registration-pmla-compliance-fintech-india-2026',
    summary:
      'Under the Prevention of Money Laundering Act, fintech companies and financial intermediaries must register with FIU-IND and maintain a robust AML compliance programme. This guide covers who must register, reporting obligations, KYC requirements and the consequences of non-compliance in 2026.',
    featuredImage: {
      url: '/images/blog/fiu-ind-pmla-compliance-fintech-cover.jpg',
      alt: 'FIU-IND Registration and PMLA Compliance for Fintech India 2026',
      caption: 'AML and PMLA compliance obligations for reporting entities',
    },
    images: [],
    category: cat('cat_fiu'),
    tags: ['FIU-IND', 'PMLA', 'AML', 'Anti-Money Laundering', 'Reporting Entity', 'Fintech Compliance', 'KYC'],
    author: estabizzTeam,
    status: 'published',
    featured: false,
    isUserSubmitted: false,
    focusKeyword: 'FIU-IND Registration PMLA Compliance',
    seoTitle: 'FIU-IND Registration & PMLA Compliance for Fintechs in India 2026 | Estabizz',
    metaDescription:
      'Complete guide to FIU-IND registration and PMLA compliance for fintech businesses. Covers reporting entity obligations, STR/CTR filing, KYC, record-keeping and penalties for non-compliance in 2026.',
    readingTime: 8,
    views: 1540,
    likeCount: 44,
    publishedAt: '2026-05-14T08:00:00.000Z',
    createdAt: '2026-05-06T10:00:00.000Z',
    updatedAt: '2026-05-16T09:00:00.000Z',
    ctaText: 'Get Your AML Compliance Programme Assessed',
    disclaimer: complianceDisclaimer,
    content: `
<h2>What Is FIU-IND?</h2>
<p>The Financial Intelligence Unit – India (FIU-IND) is the central national agency responsible for receiving, processing, analysing and disseminating information relating to suspect financial transactions. It operates under the Department of Revenue, Ministry of Finance and is the nodal agency for anti-money laundering (AML) and counter-financing of terrorism (CFT) compliance in India.</p>
<p>FIU-IND works in coordination with enforcement agencies such as the Enforcement Directorate (ED), Central Bureau of Investigation (CBI) and Intelligence Bureau, as well as with financial regulators including RBI, SEBI and IRDAI.</p>

<h2>The PMLA Framework</h2>
<p>The Prevention of Money Laundering Act, 2002 (PMLA) is the primary legislation governing AML compliance in India. It requires prescribed "Reporting Entities" to maintain records of transactions, verify identities of clients and report suspicious or large cash transactions to FIU-IND. PMLA was significantly strengthened by the 2012 and 2019 amendments, extending its reach to a broader range of financial intermediaries and introducing stricter obligations.</p>

<h2>Who Must Register with FIU-IND?</h2>
<p>The following entities are Reporting Entities under PMLA and must register with FIU-IND:</p>
<ul>
  <li>Banking companies and co-operative banks</li>
  <li>Financial institutions (including NBFCs, housing finance companies, insurance companies)</li>
  <li>Payment system operators (including Payment Aggregators, PPI issuers, money transfer operators)</li>
  <li>Capital market intermediaries (brokers, mutual funds, portfolio managers, depositories)</li>
  <li>Insurance intermediaries (brokers, corporate agents)</li>
  <li>Real estate agents (for transactions above the PMLA threshold)</li>
  <li>Casinos and virtual digital asset service providers (VDASPs)</li>
</ul>
<p>For the fintech sector specifically, any entity that is a Reporting Entity by virtue of its activity (e.g. an NBFC, PA, PPI issuer or insurance broker) must register with FIU-IND and maintain an AML compliance programme.</p>

<h2>Key Obligations under PMLA</h2>
<h3>1. Customer Due Diligence (CDD) and KYC</h3>
<p>Reporting Entities must verify the identity of clients before establishing a business relationship or conducting a transaction. CDD includes:</p>
<ul>
  <li>Identity verification using officially valid documents (OVDs)</li>
  <li>Beneficial ownership identification for corporate clients</li>
  <li>Enhanced Due Diligence (EDD) for Politically Exposed Persons (PEPs), high-risk clients and high-value transactions</li>
  <li>Risk-based approach to client profiling</li>
</ul>

<h3>2. Transaction Monitoring and Record Keeping</h3>
<p>Entities must maintain records of all transactions for a minimum of <strong>5 years</strong> from the date of the transaction. Records must be retrievable and available to authorities on demand.</p>

<h3>3. Reporting to FIU-IND</h3>
<p>Three primary report types must be submitted through the FIU-IND reporting portal:</p>
<ul>
  <li><strong>Suspicious Transaction Report (STR):</strong> Filed when a transaction is reasonably suspected to involve proceeds of crime or is structurally designed to evade reporting requirements. No minimum threshold — suspicion-based.</li>
  <li><strong>Cash Transaction Report (CTR):</strong> Filed for cash transactions of ₹10 lakh or more (or a series of connected transactions within a month aggregating to this amount).</li>
  <li><strong>Cross Border Wire Transfer Report (CBWTR):</strong> Filed for cross-border wire transfers of USD 25,000 or more.</li>
</ul>

<h3>4. Designated Director and Principal Officer</h3>
<p>Every Reporting Entity must designate a Director as the Designated Director (accountable to the Board for PMLA compliance) and appoint a Principal Officer responsible for filing reports with FIU-IND and day-to-day AML programme management.</p>

<h2>FIU-IND Registration Process</h2>
<p>Registration is done online through the FINet portal at www.fiuindia.gov.in. The process involves:</p>
<ol>
  <li>Creating an entity account on the FINet portal</li>
  <li>Filling in the registration form with entity details, regulatory licence information and Principal Officer details</li>
  <li>Submitting supporting documents (CIN, regulatory registration, PO appointment)</li>
  <li>FIU-IND verification and issuance of registration number</li>
</ol>
<p>There is no registration fee. Once registered, the entity receives a FIU-IND registration number that must be used for all future report submissions.</p>

<h2>Penalties for Non-Compliance</h2>
<p>Non-compliance with PMLA obligations can result in severe consequences:</p>
<ul>
  <li>Monetary penalty of up to ₹1 lakh per day for each day of default for failure to maintain records or report transactions</li>
  <li>Prosecution under PMLA with imprisonment of up to 7 years (or up to 10 years for certain scheduled offences)</li>
  <li>Attachment and confiscation of proceeds of crime</li>
  <li>Regulatory action by the sectoral regulator (RBI, SEBI, IRDAI) including suspension or cancellation of licence</li>
  <li>Reputational damage and exclusion from the financial system</li>
</ul>
    `.trim(),
    faqs: [
      {
        order: 1,
        question: 'Which fintech companies are required to register with FIU-IND?',
        answer:
          'Any fintech company that qualifies as a Reporting Entity under the PMLA must register with FIU-IND. This includes NBFCs (all categories), Payment Aggregators and PPI issuers authorised by RBI, insurance brokers and corporate agents licensed by IRDAI, SEBI-registered intermediaries, and virtual digital asset service providers. The determination is based on the regulatory licence held, not the company\'s technology focus.',
      },
      {
        order: 2,
        question: 'What is a Suspicious Transaction Report (STR) and when must it be filed?',
        answer:
          'An STR must be filed with FIU-IND whenever a Reporting Entity has reason to believe that a transaction involves proceeds of crime, is structured to avoid reporting requirements, or is otherwise suspicious regardless of the amount. There is no minimum transaction value threshold for STRs. Entities are expected to have transaction monitoring systems capable of detecting suspicious patterns. The STR must typically be filed within 7 days of the transaction being identified as suspicious.',
      },
      {
        order: 3,
        question: 'What records must a Reporting Entity maintain under PMLA?',
        answer:
          'Reporting Entities must maintain records of all client identity documents, account files, business correspondence, and transaction documents for a minimum of 5 years from the date of the transaction or the date of cessation of the business relationship, whichever is later. Records must be maintained in a manner that allows them to be produced promptly to competent authorities and must be sufficient to reconstruct individual transactions.',
      },
      {
        order: 4,
        question: 'Is FIU-IND registration separate from the regulatory licence (RBI/SEBI/IRDAI)?',
        answer:
          'Yes. FIU-IND registration is a separate and additional requirement. Obtaining a regulatory licence from RBI, SEBI or IRDAI does not automatically complete FIU-IND registration. Entities must separately register on the FINet portal after receiving their sectoral licence. Failure to register with FIU-IND is itself a PMLA violation, independent of the sectoral regulatory status.',
      },
    ],
  },
];
