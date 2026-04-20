"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-cra", title: "What is a Credit Rating Agency" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs CRA Registration" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "sebi-evaluation", title: "How SEBI Evaluates" },
        { id: "operational-requirements", title: "Operational Requirements" },
        { id: "internal-policies", title: "Internal Policies Required" },
        { id: "fees", title: "Fees Structure" },
        { id: "timeline", title: "Timeline" },
        { id: "cra-vs-others", title: "CRA vs Other SEBI Intermediaries" },
        { id: "compliance", title: "Post-Registration Compliance" },
        { id: "penalties", title: "Penalties & Regulatory Actions" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is SEBI Credit Rating Agency Registration?",
            a: "It is a mandatory approval from SEBI allowing a company to operate as a credit rating agency in India and assign ratings to financial instruments such as bonds, debentures, and structured products."
        },
        {
            q: "Is SEBI registration compulsory for credit rating agencies?",
            a: "Yes, it is mandatory. No entity can legally provide credit rating services in India without SEBI registration under the SEBI (Credit Rating Agencies) Regulations, 1999."
        },
        {
            q: "What is the minimum net worth required for CRA registration?",
            a: "Minimum ₹5 crore is required as per SEBI regulations. This must be maintained continuously after registration."
        },
        {
            q: "Can an LLP apply for SEBI CRA registration?",
            a: "No. Only companies incorporated under the Companies Act are eligible. LLPs are not permitted to apply."
        },
        {
            q: "Can a foreign company apply for CRA registration in India?",
            a: "Yes, subject to SEBI conditions and compliance with Indian laws including FDI norms."
        },
        {
            q: "What is rating independence and why is it critical?",
            a: "Rating independence means ratings must be unbiased and free from external influence — particularly issuer influence. SEBI treats independence as a core approval and compliance criterion."
        },
        {
            q: "What qualifications should Key Managerial Personnel have?",
            a: "KMP must have relevant experience in finance, risk analysis, and credit evaluation. Experienced professionals in credit risk are critical for SEBI approval."
        },
        {
            q: "Can a credit rating agency rate instruments of its group companies?",
            a: "Restricted due to conflict of interest. CRAs must avoid rating instruments where there is a business relationship that can impair rating objectivity."
        },
        {
            q: "What internal policies are mandatory before applying?",
            a: "Mandatory policies include: Conflict of Interest Policy, Rating Methodology Framework, Analyst Independence Policy, Code of Conduct, Disclosure Policy, and Data Confidentiality Policy."
        },
        {
            q: "How long does SEBI CRA registration take?",
            a: "Documentation preparation takes 2–4 weeks. SEBI review typically takes 2–4 months. Complex cases may extend beyond 6 months due to multiple query rounds."
        },
        {
            q: "Is CRA registration permanent?",
            a: "It continues as long as all regulatory compliance requirements are met. SEBI may suspend or cancel registration for violations."
        },
        {
            q: "What is surveillance rating?",
            a: "It is the periodic review of a previously assigned rating to reflect updated credit risk conditions of the issuer or instrument."
        },
        {
            q: "Can a startup apply for CRA registration?",
            a: "Yes, if it meets all financial (₹5 Cr net worth), governance, and infrastructure requirements. SEBI does not restrict startups but applies the same rigorous standards."
        },
        {
            q: "What are the highest risk areas for CRA compliance?",
            a: "The most critical risk area is rating independence — when business revenue from issuers creates a conflict. Other high-risk areas include weak internal controls, poor documentation of rating methodology, and lack of experienced credit analysts."
        },
        {
            q: "What happens if a CRA operates without SEBI registration?",
            a: "It is illegal and attracts penalties and enforcement action under SEBI regulations, including monetary penalties, suspension, and public disclosure of violations."
        },
        {
            q: "What is the revenue model of credit rating agencies?",
            a: "CRAs typically earn through: rating fees from issuers, surveillance and periodic review charges, and structured product analysis fees. This issuer-pays model creates inherent conflict risk — hence SEBI's strict independence norms."
        },
        {
            q: "Can CRAs provide consultancy services?",
            a: "Only within permitted limits and strictly without conflict of interest. SEBI scrutinises advisory activities that may compromise rating objectivity."
        },
        {
            q: "What is the difference between CRA registration and Research Analyst registration?",
            a: "A Credit Rating Agency focuses on credit risk assessment of debt instruments. A Research Analyst provides investment recommendations. CRAs face much higher conflict sensitivity and governance scrutiny."
        },
        {
            q: "Are periodic reports mandatory post-registration?",
            a: "Yes. Post-registration, CRAs must submit rating reports, financial disclosures, compliance certificates, and internal audit findings to SEBI as per applicable guidelines."
        },
        {
            q: "Can registration be rejected even if all documents are submitted?",
            a: "Yes. SEBI uses discretionary judgment. Applications are often delayed or rejected due to weak governance frameworks rather than documentation gaps. Promoter background, independence, and institutional credibility are assessed qualitatively."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📈", label: "SEBI" },
                { emoji: "🏦", label: "Credit Rating Agency" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "SEBI Services", href: "/sebi" },
                { label: "Credit Rating Agency", href: "/sebi/credit-rating-agency" },
            ]}
            title="SEBI Credit Rating Agency Registration – Complete 2026 Guide with Key Requirements & Process"
            readTime="18 min read"
            focusKeyword="SEBI Credit Rating Agency Registration"
            sections={sections}
            ctaTitle="Credit Rating Agency Registration"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for SEBI Credit Rating Agency Registration — from eligibility assessment to application filing and post-registration compliance."
            quickFacts={[
                { label: "Regulator", value: "SEBI" },
                { label: "Regulation", value: "CRA Regulations, 1999" },
                { label: "Entity Type", value: "Company Only" },
                { label: "Min Net Worth", value: "₹5 Crore" },
                { label: "SEBI Review", value: "2–4 months" },
                { label: "Independence", value: "Mandatory" },
                { label: "Annual Fee", value: "As prescribed" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "Mutual Fund Registration", href: "/sebi/mutual-fund-registration", category: "SEBI", description: "SEBI registration for mutual fund houses in India." },
                { title: "Underwriter Registration", href: "/sebi/underwriter-registration", category: "SEBI", description: "SEBI underwriter registration guide." },
                { title: "Depository Participant Registration", href: "/sebi/depository-participant-sebi-registration", category: "SEBI", description: "DP registration under SEBI and NSDL/CDSL." },
                { title: "NBFC Account Aggregator License", href: "/rbi/nbfc-account-aggregator-license", category: "RBI", description: "Account Aggregator license under RBI regulations." },
            ]}
            finalCtaTitle="Ready to Apply for SEBI Credit Rating Agency Registration?"
            finalCtaDescription="Get expert guidance on eligibility, documentation, governance framework, and SEBI application — we handle every step."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    <strong>SEBI Credit Rating Agency Registration</strong> is a critical regulatory approval required for entities intending to provide credit rating services in India. In a market where investor confidence and financial transparency are paramount, credit rating agencies (CRAs) play a vital role in assessing the creditworthiness of issuers and financial instruments.
                </p>
                <p>
                    From a compliance perspective, obtaining SEBI registration is not merely procedural — it reflects the entity&apos;s capability, governance strength, and adherence to strict regulatory standards. SEBI treats CRA registration as a <strong>high-responsibility licence</strong> that demands financial strength, governance maturity, and regulatory discipline.
                </p>
                <div className="info-box">
                    <strong>📌 Key Regulation:</strong> SEBI (Credit Rating Agencies) Regulations, 1999 — as amended by SEBI circulars and master circulars issued periodically. No entity can issue credit ratings in India without prior SEBI registration under these regulations.
                </div>
            </section>

            {/* What is CRA */}
            <section id="what-is-cra">
                <h2>What is a Credit Rating Agency</h2>
                <p>
                    A Credit Rating Agency (CRA) is an entity that evaluates and assigns credit ratings to financial instruments issued by corporations, governments, or financial institutions — helping investors assess the credit risk of those instruments.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>In simple terms</strong></td>
                            <td>SEBI CRA Registration allows a company to evaluate and assign ratings to financial instruments such as bonds, debentures, and structured products.</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance perspective</strong></td>
                            <td>Ensures ratings are unbiased and independent; investors receive reliable credit risk assessments; market transparency is maintained.</td>
                        </tr>
                        <tr>
                            <td><strong>Legal requirement</strong></td>
                            <td>No entity can issue credit ratings without prior SEBI approval under the CRA Regulations, 1999.</td>
                        </tr>
                        <tr>
                            <td><strong>Instruments covered</strong></td>
                            <td>Bonds and debentures, structured finance products, debt securities, commercial papers, fixed deposits of NBFCs</td>
                        </tr>
                        <tr>
                            <td><strong>Revenue model</strong></td>
                            <td>Rating fees from issuers, surveillance charges, structured product analysis fees (issuer-pays model creates inherent conflict — hence SEBI&apos;s strict independence norms)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Regulatory Framework */}
            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Primary Regulation</td>
                            <td>SEBI (Credit Rating Agencies) Regulations, 1999</td>
                        </tr>
                        <tr>
                            <td>Governing Authority</td>
                            <td>Securities and Exchange Board of India (SEBI)</td>
                        </tr>
                        <tr>
                            <td>Supporting Framework</td>
                            <td>SEBI circulars and master circulars on CRA operations, disclosure norms, and independence requirements</td>
                        </tr>
                        <tr>
                            <td>Listing Obligations</td>
                            <td>Listing Obligations and Disclosure Requirements (LODR) — CRA-rated instruments must comply with disclosure requirements</td>
                        </tr>
                        <tr>
                            <td>Global Alignment</td>
                            <td>IOSCO Code of Conduct Fundamentals for CRAs; SEBI framework aligned with SEC (USA), ESMA (Europe), and FCA (UK) principles on transparency, independence, and investor protection</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Who Needs */}
            <section id="who-needs">
                <h2>Who Needs SEBI CRA Registration</h2>
                <p>SEBI CRA Registration is required by:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Debt Rating Companies</strong></td>
                            <td>Companies planning to rate bonds, debentures, NCDs, and fixed-income instruments</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Analytics Firms</strong></td>
                            <td>Entities entering the credit assessment and risk analytics business</td>
                        </tr>
                        <tr>
                            <td><strong>Structured Finance Raters</strong></td>
                            <td>Institutions evaluating ABS, MBS, CDOs and structured finance products</td>
                        </tr>
                        <tr>
                            <td><strong>Investor Risk Assessment Entities</strong></td>
                            <td>Entities providing formal creditworthiness assessments to investors</td>
                        </tr>
                        <tr>
                            <td><strong>International CRAs entering India</strong></td>
                            <td>Foreign CRAs or their Indian subsidiaries/JVs seeking SEBI authorisation to operate in India</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>⚠️ Important:</strong> Even without formal rating activities, any entity that purports to provide creditworthiness assessments or credit risk opinions for financial instruments falls under SEBI&apos;s CRA regulatory perimeter. Operating without registration is illegal.
                </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility Criteria</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                            <th>Practical Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Legal Structure</strong></td>
                            <td>Company under Companies Act, 2013</td>
                            <td>LLP, partnership, or individual — not allowed</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum Net Worth</strong></td>
                            <td>₹5 Crore</td>
                            <td>Must be maintained continuously — not just at registration time</td>
                        </tr>
                        <tr>
                            <td><strong>Professional Expertise</strong></td>
                            <td>Adequate experience in finance and credit analysis</td>
                            <td>Key Managerial Personnel with credit risk background are critical</td>
                        </tr>
                        <tr>
                            <td><strong>Infrastructure</strong></td>
                            <td>Adequate systems, IT infrastructure, and rating models</td>
                            <td>Includes data analytics, rating models, and secure IT systems</td>
                        </tr>
                        <tr>
                            <td><strong>Independence</strong></td>
                            <td>No conflict of interest — ratings must be unbiased</td>
                            <td>Strict scrutiny by SEBI — even structural conflicts are flagged</td>
                        </tr>
                        <tr>
                            <td><strong>Promoter Background</strong></td>
                            <td>Clean regulatory and financial history</td>
                            <td>Past violations, defaults, or legal proceedings are red flags</td>
                        </tr>
                        <tr>
                            <td><strong>Business Plan</strong></td>
                            <td>Long-term, credible plan for rating operations</td>
                            <td>SEBI evaluates sustainability and seriousness of intent</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Documents */}
            <section id="documents">
                <h2>Documents Required</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                            <th>Mandatory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Certificate of Incorporation</td>
                            <td>Legal existence proof</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Memorandum & Articles of Association</td>
                            <td>Business object clause verification</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Audited Financial Statements</td>
                            <td>Net worth validation (₹5 Cr minimum)</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>KMP Details & CVs</td>
                            <td>Experience and qualification assessment</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Business Plan</td>
                            <td>Operational clarity, revenue model, and sustainability</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Internal Policies</td>
                            <td>Governance, independence, and compliance frameworks</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Rating Methodology Framework</td>
                            <td>Evidence of scientific and consistent rating approach</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Board Resolution</td>
                            <td>Authorisation for SEBI application</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Promoter / Shareholder Declarations</td>
                            <td>Fit and proper confirmation; no regulatory violations</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>IT Infrastructure Details</td>
                            <td>Data security and analytics capability assessment</td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Registration Process */}
            <section id="process">
                <h2>Step-by-Step Registration Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Incorporate a Company</h4>
                            <p>Incorporate a company under the Companies Act, 2013 with appropriate object clause covering credit rating services. Ensure net worth of ₹5 Crore is in place.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Build Compliance Infrastructure</h4>
                            <p>Set up rating methodology framework, IT systems, KMP with required qualifications, and all mandatory internal policies (conflict of interest, independence, disclosure, code of conduct).</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Prepare Business Plan & Documentation</h4>
                            <p>Prepare detailed business plan covering proposed activities, governance framework, risk management, sector-wise rating methodology, and long-term sustainability projections.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>File Application with SEBI</h4>
                            <p>Submit application in SEBI&apos;s prescribed format with all supporting documents and application fee. Ensure MOA, financial statements, KMP profiles, and policies are complete.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Respond to SEBI Queries</h4>
                            <p>SEBI typically raises queries on governance structure, independence framework, KMP experience, and rating methodology. Multiple query rounds are common. Timely and precise responses are critical.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Obtain Certificate of Registration</h4>
                            <p>Upon SEBI&apos;s satisfaction with all regulatory requirements, the Certificate of Registration is issued. Operations must not commence before this certificate is received.</p>
                        </div>
                    </div>
                </div>
                <div className="warning-box">
                    <strong>⚠️ Reality Check:</strong> Even if all documents are in place, applications are often delayed or rejected due to weak governance frameworks rather than eligibility gaps. SEBI uses discretionary judgment — approval is not purely checklist-based.
                </div>
            </section>

            {/* SEBI Evaluation */}
            <section id="sebi-evaluation">
                <h2>How SEBI Evaluates a CRA Application</h2>
                <p>Beyond documentation, SEBI assesses CRA applications qualitatively across multiple dimensions:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Evaluation Area</th>
                            <th>What SEBI Checks</th>
                            <th>Practical Expectation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Promoter Background</strong></td>
                            <td>Financial credibility and track record</td>
                            <td>Clean regulatory history — no defaults or violations</td>
                        </tr>
                        <tr>
                            <td><strong>Management Team</strong></td>
                            <td>Experience in finance and risk analysis</td>
                            <td>Strong domain expertise — credit risk specialists preferred</td>
                        </tr>
                        <tr>
                            <td><strong>Rating Methodology</strong></td>
                            <td>Scientific and consistent approach</td>
                            <td>Documented, sector-wise models — not generic templates</td>
                        </tr>
                        <tr>
                            <td><strong>Independence Framework</strong></td>
                            <td>No external influence on ratings</td>
                            <td>Clear conflict of interest policy and enforcement mechanism</td>
                        </tr>
                        <tr>
                            <td><strong>IT Systems</strong></td>
                            <td>Data handling, analytics capability, security</td>
                            <td>Secure, scalable technology infrastructure</td>
                        </tr>
                        <tr>
                            <td><strong>Governance Structure</strong></td>
                            <td>Board oversight, independent committees</td>
                            <td>Independent Rating Committee with no business-line conflicts</td>
                        </tr>
                        <tr>
                            <td><strong>Business Sustainability</strong></td>
                            <td>Long-term viability of the business model</td>
                            <td>Credible revenue projections and sector focus</td>
                        </tr>
                    </tbody>
                </table>
                <blockquote className="expert-quote">
                    <p>&ldquo;Credit rating is not just an analytical exercise — it is a responsibility towards market integrity. Regulators expect not only financial strength but also uncompromised governance and independence.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            {/* Operational Requirements */}
            <section id="operational-requirements">
                <h2>Operational Requirements for Credit Rating Agencies</h2>
                <p>Once registered, a CRA must build and maintain strong operational infrastructure:</p>

                <h3>Rating Framework</h3>
                <ul>
                    <li>Defined rating models for each instrument/sector category</li>
                    <li>Sector-wise rating methodologies (corporate, structured finance, banks, etc.)</li>
                    <li>Internal review and oversight mechanisms for rating decisions</li>
                    <li>Surveillance framework for ongoing monitoring of rated instruments</li>
                </ul>

                <h3>Governance Structure</h3>
                <ul>
                    <li>Independent Rating Committee — members free from business/commercial conflicts</li>
                    <li>Board-level oversight of rating policy and independence</li>
                    <li>Internal audit systems with periodic compliance review</li>
                    <li>Separate reporting lines for analysts and business development teams</li>
                </ul>

                <h3>Disclosure Practices</h3>
                <ul>
                    <li>Public disclosure of all ratings and rating rationale</li>
                    <li>Periodic updates — particularly on rating changes and outlook revisions</li>
                    <li>Disclosure of rating methodology on website</li>
                    <li>Transparency in assumptions and key credit factors</li>
                </ul>

                <h3>Key Regulatory Red Flags (High Rejection / Enforcement Risk)</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Red Flag</th>
                            <th>Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Promoters with past regulatory violations or defaults</td>
                            <td>Very High</td>
                        </tr>
                        <tr>
                            <td>Inadequate independence in rating decision-making</td>
                            <td>Very High</td>
                        </tr>
                        <tr>
                            <td>Lack of experienced credit analysts in KMP</td>
                            <td>High</td>
                        </tr>
                        <tr>
                            <td>Weak or absent internal audit mechanism</td>
                            <td>High</td>
                        </tr>
                        <tr>
                            <td>Overlapping business activities creating conflicts</td>
                            <td>High</td>
                        </tr>
                        <tr>
                            <td>Generic or template-based rating methodology</td>
                            <td>Medium-High</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Internal Policies */}
            <section id="internal-policies">
                <h2>Internal Policies Required Before Application</h2>
                <p>Before filing the SEBI application, the following policies must be fully drafted and Board-approved:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Policy</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Conflict of Interest Policy</strong></td>
                            <td>Identify, disclose, and manage situations where business interests may influence rating decisions</td>
                        </tr>
                        <tr>
                            <td><strong>Rating Methodology Framework</strong></td>
                            <td>Documented, sector-wise framework for assigning and reviewing ratings</td>
                        </tr>
                        <tr>
                            <td><strong>Analyst Independence Policy</strong></td>
                            <td>Ensure analysts are free from commercial pressure, business targets, and issuer relationships</td>
                        </tr>
                        <tr>
                            <td><strong>Code of Conduct</strong></td>
                            <td>Ethical standards for employees, analysts, and management</td>
                        </tr>
                        <tr>
                            <td><strong>Disclosure Policy</strong></td>
                            <td>Govern what is publicly disclosed, when, and in what format</td>
                        </tr>
                        <tr>
                            <td><strong>Data Confidentiality Policy</strong></td>
                            <td>Protect issuer information received during the rating process</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Manual</strong></td>
                            <td>Comprehensive compliance procedures covering SEBI regulatory obligations</td>
                        </tr>
                        <tr>
                            <td><strong>Data Protection Policy</strong></td>
                            <td>IT security and data handling standards for rating-related information</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Fees Structure</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>As prescribed by SEBI</td>
                            <td>Non-refundable; payable at the time of application</td>
                        </tr>
                        <tr>
                            <td><strong>Registration Fee</strong></td>
                            <td>Payable upon approval</td>
                            <td>As prescribed in SEBI (CRA) Regulations, 1999</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Fee</strong></td>
                            <td>As prescribed</td>
                            <td>Applicable for continued registration — non-payment may lead to suspension</td>
                        </tr>
                        <tr>
                            <td><strong>Professional/Advisory Fees</strong></td>
                            <td>Variable</td>
                            <td>Separate from SEBI fees; depends on scope of advisory services</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Infrastructure Cost</strong></td>
                            <td>Variable</td>
                            <td>One-time setup cost for IT, rating systems, and internal policies</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> CRA registration is typically more expensive in total setup cost than most other SEBI registrations — due to infrastructure requirements (rating systems, IT infrastructure), qualified KMP (experienced credit analysts), and policy development costs.
                </div>
            </section>

            {/* Timeline */}
            <section id="timeline">
                <h2>Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Estimated Duration</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Infrastructure Setup & Policy Drafting</td>
                            <td>4–8 weeks</td>
                            <td>Rating models, IT systems, internal policies</td>
                        </tr>
                        <tr>
                            <td>Documentation Preparation</td>
                            <td>2–4 weeks</td>
                            <td>Business plan, financials, KMP profiles</td>
                        </tr>
                        <tr>
                            <td>SEBI Application Review</td>
                            <td>2–4 months</td>
                            <td>May involve multiple rounds of queries</td>
                        </tr>
                        <tr>
                            <td>Complex / Query-Heavy Cases</td>
                            <td>6–12 months</td>
                            <td>Governance concerns or incomplete answers extend timelines</td>
                        </tr>
                        <tr>
                            <td><strong>Total Estimated Timeline</strong></td>
                            <td><strong>4–8 months</strong></td>
                            <td>From company incorporation to registration certificate</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>📌 Note:</strong> SEBI does not provide a fixed timeline commitment. There is no official fast-track route. Approval quality and documentation completeness are the primary determinants of timeline.
                </div>
            </section>

            {/* CRA vs Others */}
            <section id="cra-vs-others">
                <h2>CRA vs Other SEBI Intermediaries</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Credit Rating Agency</th>
                            <th>Merchant Banker</th>
                            <th>Research Analyst</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Core Function</strong></td>
                            <td>Creditworthiness assessment of debt instruments</td>
                            <td>Issue management and capital raising</td>
                            <td>Investment research and recommendations</td>
                        </tr>
                        <tr>
                            <td><strong>Regulatory Focus</strong></td>
                            <td>Independence and methodology</td>
                            <td>Capital raising compliance</td>
                            <td>Disclosure and conflict</td>
                        </tr>
                        <tr>
                            <td><strong>Revenue Model</strong></td>
                            <td>Rating fees from issuers</td>
                            <td>Transaction / issue fees</td>
                            <td>Subscription or advisory fees</td>
                        </tr>
                        <tr>
                            <td><strong>Conflict Sensitivity</strong></td>
                            <td>Extremely high — issuer pays model</td>
                            <td>Moderate</td>
                            <td>Moderate</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth Requirement</strong></td>
                            <td>₹5 Crore</td>
                            <td>₹5 Crore (Category I)</td>
                            <td>₹1 Crore (body corporate)</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI Scrutiny Level</strong></td>
                            <td>Very High</td>
                            <td>High</td>
                            <td>Moderate</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Post-Registration Compliance */}
            <section id="compliance">
                <h2>Post-Registration Compliance</h2>
                <p>After obtaining SEBI CRA Registration, entities must maintain ongoing compliance:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Rating Independence</strong></td>
                            <td>Maintain unbiased rating processes; avoid issuer influence at all times</td>
                        </tr>
                        <tr>
                            <td><strong>Disclosure Norms</strong></td>
                            <td>Public disclosure of all ratings, rating changes, and rating rationale on website and SEBI portal</td>
                        </tr>
                        <tr>
                            <td><strong>Periodic Reporting</strong></td>
                            <td>Submit rating reports, financial disclosures, and compliance certificates to SEBI as per guidelines</td>
                        </tr>
                        <tr>
                            <td><strong>Methodology Transparency</strong></td>
                            <td>Rating methodology must be publicly disclosed and consistently applied</td>
                        </tr>
                        <tr>
                            <td><strong>Internal Audit</strong></td>
                            <td>Periodic compliance audits with findings reported to Board and SEBI</td>
                        </tr>
                        <tr>
                            <td><strong>Net Worth Maintenance</strong></td>
                            <td>₹5 Crore net worth must be maintained continuously</td>
                        </tr>
                        <tr>
                            <td><strong>SEBI Inspections</strong></td>
                            <td>Subject to periodic inspections, off-site monitoring, and compliance reviews</td>
                        </tr>
                        <tr>
                            <td><strong>Material Change Reporting</strong></td>
                            <td>Any change in management, ownership, or business model must be reported to SEBI immediately</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Penalties */}
            <section id="penalties">
                <h2>Penalties & Regulatory Actions</h2>
                <div className="warning-box">
                    <strong>⚠️ Enforcement:</strong> SEBI has strong enforcement powers over CRAs. Non-compliance may lead to monetary penalties, suspension of operations, cancellation of registration, and public disclosure of violations.
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Violation</th>
                            <th>Consequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Operating without SEBI registration</td>
                            <td>Illegal — penalties and enforcement action under SEBI Act</td>
                        </tr>
                        <tr>
                            <td>Conflict of interest in rating</td>
                            <td>Monetary penalty, suspension, public disclosure</td>
                        </tr>
                        <tr>
                            <td>Net worth falls below ₹5 Crore</td>
                            <td>Regulatory action; possible cancellation</td>
                        </tr>
                        <tr>
                            <td>Late periodic reporting</td>
                            <td>Monetary penalty per instance of delay</td>
                        </tr>
                        <tr>
                            <td>Failure to disclose rating changes</td>
                            <td>Show-cause notice and penalties</td>
                        </tr>
                        <tr>
                            <td>Repeated / serious violations</td>
                            <td>Cancellation of registration and public order</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* FAQs */}
            <section id="faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-accordion">
                    {faqs.map((faq, i) => (
                        <details key={i} className="faq-item">
                            <summary>{faq.q}</summary>
                            <p>{faq.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </ServicePageLayout>
    );
}
