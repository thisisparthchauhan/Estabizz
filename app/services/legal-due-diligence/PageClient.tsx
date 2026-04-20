"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-legal-dd", title: "What is Legal Due Diligence" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "who-needs", title: "Who Needs Legal Due Diligence" },
        { id: "types-of-dd", title: "Types of Legal Due Diligence" },
        { id: "key-areas-reviewed", title: "Key Areas Reviewed" },
        { id: "process", title: "Due Diligence Process" },
        { id: "red-flags", title: "Red Flags &amp; Common Risks" },
        { id: "dd-report-structure", title: "Due Diligence Report Structure" },
        { id: "transaction-specific-dd", title: "Transaction-Specific Due Diligence" },
        { id: "dd-checklist", title: "Due Diligence Checklist" },
        { id: "fees", title: "Fees &amp; Costs" },
        { id: "timeline", title: "Timeline" },
        { id: "dd-vs-legal-audit", title: "Due Diligence vs Legal Audit" },
        { id: "post-dd-compliance", title: "Post-Due Diligence Compliance" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is Legal Due Diligence?",
            a: "Legal Due Diligence (Legal DD) is a comprehensive investigation of the legal, regulatory, and contractual status of a company or asset before a transaction such as an investment, acquisition, or merger. It identifies legal risks, compliance gaps, and potential liabilities that could affect the deal or future operations."
        },
        {
            q: "Is Legal Due Diligence mandatory in India?",
            a: "Legal DD is not mandated by statute for all transactions, but it is effectively required for regulated transactions. SEBI regulations require due diligence for listed company acquisitions, RBI guidelines mandate it for NBFC transfers, and FEMA requires compliance verification for foreign investment. Practically, any prudent investor or acquirer will insist on Legal DD before committing capital."
        },
        {
            q: "Who performs Legal Due Diligence?",
            a: "Legal DD is typically performed by a multidisciplinary team comprising a Company Secretary (CS) for corporate and secretarial matters, a Chartered Accountant (CA) for financial-linked legal review, and a lawyer for contractual and litigation analysis. For regulatory matters involving SEBI, RBI, FEMA, or IFSCA, specialists in those domains are also engaged."
        },
        {
            q: "What does Legal Due Diligence cover?",
            a: "Legal DD covers six broad areas: corporate due diligence (incorporation, shareholding, board compliance), regulatory &amp; statutory compliance (ROC filings, FEMA, sector licenses), contractual due diligence (SHA, vendor and employment agreements), litigation due diligence (pending cases, regulatory notices), IP due diligence (trademarks, patents, licensing), and financial-linked legal review (debt obligations, charge filings, security interests)."
        },
        {
            q: "What is the difference between Legal Due Diligence and a Legal Audit?",
            a: "Legal DD is transaction-specific — conducted before an investment, M&amp;A, or asset purchase to identify risks affecting the deal. A Legal Audit is an internal compliance verification exercise conducted periodically to ensure the company meets regulatory and statutory obligations. DD produces a risk-classified DD Report; a Legal Audit produces an audit report with compliance gaps."
        },
        {
            q: "When should Legal Due Diligence be initiated?",
            a: "Legal DD should be initiated after signing a term sheet or Letter of Intent (LoI), but before executing definitive agreements. This ensures that identified risks can be addressed through deal structuring — indemnity clauses, escrow arrangements, valuation adjustments, or conditions precedent — without delaying the transaction unnecessarily."
        },
        {
            q: "What is a data room in the context of Legal DD?",
            a: "A data room is a secure repository — physical or virtual — where the target company organises and shares all documents required for due diligence. A virtual data room (VDR) is the modern standard, providing controlled access to incorporation documents, contracts, licenses, financial records, litigation files, and IP registrations for review by the DD team."
        },
        {
            q: "What are red flags in Legal Due Diligence?",
            a: "Red flags are material risks or irregularities that could jeopardise the transaction or expose the acquirer to liability. Common red flags include MCA non-compliance or backdated filings, disqualified directors under Section 164, improper FEMA or share valuation, missing board and shareholder approvals, unregistered key agreements, invalid IP ownership, and disputed shareholding patterns."
        },
        {
            q: "What is Vendor Due Diligence?",
            a: "Vendor Due Diligence (VDD) is due diligence commissioned by the seller rather than the buyer. The seller prepares a comprehensive DD report on its own company in advance of the sale process. This accelerates the transaction timeline, reassures potential buyers, and allows the seller to address issues before they affect negotiations or valuation."
        },
        {
            q: "What is risk classification in a DD Report?",
            a: "Risk classification categorises identified issues by their potential impact on the transaction or business. High Risk issues can block the deal or create significant liability — examples include pending criminal proceedings, regulatory cancellations, or fundamental title defects. Medium Risk issues require remediation or contractual protection. Low Risk issues are minor non-compliances with straightforward solutions."
        },
        {
            q: "How does Legal Due Diligence affect valuation?",
            a: "Legal DD findings directly affect deal valuation and structure. High-risk findings — unresolved litigation, regulatory non-compliance, or weak IP ownership — can lead to valuation adjustments (reduction in purchase price), demands for escrow arrangements, indemnity obligations on the seller, or conditions precedent to closing. A clean DD report supports the asking valuation."
        },
        {
            q: "What does a Legal Due Diligence Report contain?",
            a: "A DD Report typically contains: an executive summary of key findings, the scope and methodology of the review, detailed observations on each due diligence area, identified risks with supporting evidence, compliance gaps with applicable law, recommendations for remediation, and a risk matrix classifying findings as High, Medium, or Low."
        },
        {
            q: "What are common mistakes in Legal Due Diligence?",
            a: "Common mistakes include conducting DD too late (after deal terms are fixed), relying solely on self-declarations without independent verification, failing to review all corporate registers (not just the latest), overlooking contingent liabilities and off-balance-sheet obligations, ignoring FEMA compliance for foreign investors, and not engaging specialists for regulated sectors (NBFC, SEBI-registered entities)."
        },
        {
            q: "Why is IP important in Legal Due Diligence?",
            a: "Intellectual Property (IP) often constitutes a significant part of a company&apos;s value — particularly for technology startups, pharmaceutical companies, and media businesses. IP DD verifies that trademarks, patents, and copyrights are properly registered in the target company&apos;s name, that there are no infringement claims or third-party licensing encumbrances, and that IP is not owned by founders in their personal capacity rather than the company."
        },
        {
            q: "What is startup-specific Legal Due Diligence?",
            a: "Startup DD focuses on areas particularly relevant to early-stage companies: founder agreements (vesting, IP assignment, non-compete), cap table accuracy and ESOP compliance, DPIIT recognition and startup tax exemption eligibility, IP ownership (especially technology IP), FEMA compliance for foreign investors and convertible instruments, and the status of prior funding rounds and investor rights."
        },
        {
            q: "What is the role of FEMA in Legal Due Diligence?",
            a: "FEMA compliance is critical in any transaction involving foreign investment or cross-border elements. DD must verify that all foreign investment was received at RBI-compliant valuations, that FC-GPR, FC-TRS, and other FEMA filings were filed with the RBI on time, that the investee company is in a permissible sector under FDI policy, and that downstream investment and ODI structuring (for outbound investment) comply with FEMA regulations."
        },
        {
            q: "What is NBFC-specific Legal Due Diligence?",
            a: "NBFC DD involves specialised review of RBI licensing and classification (NBFC-ICC, NBFC-MFI, NBFC-HFC), CoR (Certificate of Registration) validity, compliance with RBI prudential norms (capital adequacy, asset classification, provisioning), KYC/AML policy implementation, Fair Practices Code adoption, IT and cybersecurity framework compliance, and any outstanding RBI inspection findings or regulatory show-cause notices."
        },
        {
            q: "How does Legal DD affect deal structuring?",
            a: "Legal DD findings shape how a deal is structured. Identified risks lead to negotiated protections — indemnity clauses requiring the seller to bear future liability for pre-closing non-compliances, escrow arrangements retaining part of the purchase price until representations are verified, conditions precedent requiring remediation before closing, and representations &amp; warranties addressing specific risk areas."
        },
        {
            q: "What happens if issues are found during Legal Due Diligence?",
            a: "Finding issues during DD is normal and does not necessarily kill a transaction. The response depends on severity: High Risk findings may require remediation before closing or result in deal restructuring. Medium Risk findings are typically addressed through contractual indemnities or price adjustments. Low Risk findings are documented for post-closing remediation. A skilled DD team provides practical remediation paths, not just a list of problems."
        },
        {
            q: "Why engage a professional for Legal Due Diligence?",
            a: "Legal DD requires expertise across corporate law, contract law, FEMA, sector-specific regulations, and litigation assessment — simultaneously. Professionals bring structured methodologies, sector knowledge, and experience recognising non-obvious risks. A well-executed DD protects investors from acquiring hidden liabilities, supports accurate valuation, strengthens deal documentation, and provides legal protection if disputes arise post-transaction."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🔍", label: "Legal Due Diligence" },
                { emoji: "🤝", label: "M&A Due Diligence" },
                { emoji: "✅", label: "Corporate Compliance" },
                { emoji: "⚖️", label: "India Legal" },
                { emoji: "📋", label: "CS Services" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Legal Due Diligence", href: "/services/legal-due-diligence" },
            ]}
            title="Legal Due Diligence Services in India"
            readTime="18 min read"
            focusKeyword="Legal Due Diligence India"
            sections={sections}
            ctaTitle="Get Expert Legal Due Diligence"
            ctaDescription="Our CS-led team delivers comprehensive legal due diligence reports for M&amp;A, investments, NBFCs, and cross-border transactions — with risk classification and remediation roadmaps."
            quickFacts={[
                { label: "Typical Duration", value: "2–4 weeks" },
                { label: "Performed by", value: "CS / Lawyer / CA" },
                { label: "Startup Cost", value: "₹50K–₹2L" },
                { label: "Large Deal Cost", value: "₹5L+" },
                { label: "Report Contains", value: "Risk Matrix" },
                { label: "Risk Levels", value: "High / Medium / Low" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "Complete guide to Foreign Exchange Management Act compliance obligations." },
                { title: "Enterprise Services", href: "/services/enterprise-services", category: "Services", description: "End-to-end enterprise compliance and regulatory setup for businesses in India." },
                { title: "Legal Process Outsourcing", href: "/services/legal-process-outsourcing", category: "Services", description: "Outsource legal drafting, research, and compliance functions to qualified professionals." },
                { title: "AMFI Registration", href: "/sebi/amfi-registration", category: "SEBI", description: "AMFI registration process for mutual fund distributors and financial advisors." },
            ]}
            finalCtaTitle="Protect Your Transaction with Expert Legal Due Diligence"
            finalCtaDescription="Whether you are an investor, acquirer, or startup raising funds, a thorough Legal DD report safeguards your interests and ensures your transaction is built on a sound legal foundation."
        >
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    Legal Due Diligence (Legal DD) is the cornerstone of any significant business transaction in India. Before an investor commits capital, before an acquirer signs definitive agreements, and before a business changes hands, Legal DD provides an authoritative, structured assessment of the target&apos;s legal standing, regulatory compliance, contractual obligations, and litigation exposure.
                </p>
                <p>
                    In India&apos;s complex regulatory environment — governed by the Companies Act 2013, FEMA, RBI guidelines, SEBI regulations, and sector-specific licensing frameworks — Legal DD is not a formality. It is a governance checkpoint that determines whether the transaction proceeds on solid legal ground or exposes parties to hidden vulnerabilities that could unravel the deal or generate post-closing liability.
                </p>
                <div className="info-box">
                    <strong>Why Legal DD matters in India:</strong> India&apos;s multi-regulator environment (MCA, RBI, SEBI, FEMA, IRDAI, IFSCA) means that a target company may appear commercially sound while carrying material regulatory non-compliance, unregistered share transfers, or FEMA violations that create serious legal exposure for the incoming investor or acquirer.
                </div>
                <p>
                    Estabizz provides end-to-end Legal Due Diligence services led by qualified Company Secretaries, with specialist support for FEMA, SEBI, RBI, and cross-border transaction requirements. Our reports are structured, risk-classified, and designed to support both deal-room negotiations and post-transaction remediation planning.
                </p>
            </section>

            <section id="what-is-legal-dd">
                <h2>What is Legal Due Diligence</h2>
                <p>
                    Legal Due Diligence is a systematic examination of the legal, regulatory, and contractual affairs of a company, business, or asset — conducted by independent professionals on behalf of a prospective investor, acquirer, lender, or partner. The process involves reviewing all material legal documents, verifying statutory compliance, identifying pending or potential litigation, assessing contractual risk, and producing a written report of findings with risk classification.
                </p>
                <p>
                    The term &ldquo;due diligence&rdquo; originates from the legal principle that parties entering a transaction are expected to exercise reasonable care and investigation before committing. In practice, Legal DD has evolved into a structured, multi-disciplinary process covering corporate law, contract law, regulatory compliance, intellectual property, and financial-linked legal obligations.
                </p>
                <p>
                    In the Indian context, Legal DD must address not just domestic company law under the Companies Act 2013, but also sector-specific regulatory frameworks, FEMA compliance for foreign investment, RBI/SEBI licensing requirements, and the increasingly important data protection and cybersecurity compliance landscape.
                </p>
                <blockquote className="expert-quote">
                    <p>&ldquo;Legal Due Diligence is not merely a verification exercise — it is a governance checkpoint that determines whether a transaction stands on a strong legal foundation or hidden vulnerabilities.&rdquo;</p>
                    <footer>— <strong>CS Devyani Khambhati</strong>, Compliance Expert</footer>
                </blockquote>
            </section>

            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <p>
                    Legal Due Diligence in India is informed by a layered regulatory framework. The scope of any DD exercise must account for all applicable statutes and regulations based on the nature of the target company, its sector, and the transaction structure.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Law / Regulation</th>
                            <th>Relevance to Legal DD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Companies Act, 2013</td>
                            <td>Incorporation, share capital, board composition, ROC filings, director compliance, shareholder approvals</td>
                        </tr>
                        <tr>
                            <td>SEBI Regulations</td>
                            <td>Listed company acquisitions (SAST), intermediary registration, market compliance</td>
                        </tr>
                        <tr>
                            <td>RBI Guidelines</td>
                            <td>NBFC licensing, prudential norms, KYC/AML, payment system operator compliance</td>
                        </tr>
                        <tr>
                            <td>FEMA, 1999</td>
                            <td>Foreign investment valuation, FC-GPR/FC-TRS filings, ODI structure, repatriation</td>
                        </tr>
                        <tr>
                            <td>Indian Contract Act, 1872</td>
                            <td>Validity and enforceability of contracts, restrictive clauses, change-of-control provisions</td>
                        </tr>
                        <tr>
                            <td>Insolvency &amp; Bankruptcy Code (IBC)</td>
                            <td>Identification of insolvency proceedings, personal guarantees, asset encumbrances</td>
                        </tr>
                        <tr>
                            <td>Income Tax Act, 1961</td>
                            <td>Tax demand notices, pending assessments, deferred tax liabilities, transfer pricing</td>
                        </tr>
                        <tr>
                            <td>IPR Laws (Trade Marks Act, Patents Act, Copyright Act)</td>
                            <td>IP ownership verification, registration status, infringement claims</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Sector-specific regulations — including IRDAI (insurance), IFSCA (GIFT City entities), DPIIT (startup recognition), and competition law under the Competition Act — add further layers depending on the target company&apos;s activities. A comprehensive Legal DD must identify and review all applicable regulatory frameworks, not just company law.
                </p>
            </section>

            <section id="who-needs">
                <h2>Who Needs Legal Due Diligence</h2>
                <p>
                    Legal Due Diligence is relevant to any party entering into a significant transaction involving a company or business. The following categories of persons routinely commission Legal DD in India:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Reason for Legal DD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Private Equity &amp; Venture Capital Investors</td>
                            <td>Verify corporate governance, cap table, FEMA compliance, and regulatory standing before investing</td>
                        </tr>
                        <tr>
                            <td>M&amp;A Transaction Parties</td>
                            <td>Assess target company&apos;s legal risk profile before share purchase or business acquisition</td>
                        </tr>
                        <tr>
                            <td>NBFCs &amp; Financial Institutions</td>
                            <td>Evaluate borrower entities or acquisition targets for regulatory compliance and asset quality</td>
                        </tr>
                        <tr>
                            <td>Startups Raising Funding</td>
                            <td>Prepare for investor DD (vendor DD), identify and remediate issues before funding round</td>
                        </tr>
                        <tr>
                            <td>Buyers of Business Assets or Shares</td>
                            <td>Verify clean title, absence of encumbrances, and regulatory approvals for the acquisition</td>
                        </tr>
                        <tr>
                            <td>Foreign Investors Entering India</td>
                            <td>FEMA/FDI compliance, sectoral caps, valuation compliance, and structural requirements</td>
                        </tr>
                        <tr>
                            <td>Lenders &amp; Debt Investors</td>
                            <td>Verify security interest, charge creation, and enforceability of loan documentation</td>
                        </tr>
                        <tr>
                            <td>Joint Venture Parties</td>
                            <td>Review governance arrangements, exit rights, and regulatory approvals for the JV structure</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Note for Sellers:</strong> Sellers and target companies benefit from commissioning Vendor Due Diligence — a self-initiated DD — before the sale process. This allows issues to be identified and remediated before they surface in a buyer&apos;s DD and affect valuation or deal momentum.
                </div>
            </section>

            <section id="types-of-dd">
                <h2>Types of Legal Due Diligence</h2>
                <p>
                    Legal Due Diligence is not a single, standardised exercise. Different transaction contexts and objectives require different types of DD, each with a distinct focus and methodology.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Type of DD</th>
                            <th>Description &amp; Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transactional Due Diligence</td>
                            <td>Conducted in the context of M&amp;A, investments, or business acquisitions. The most common form — assesses all legal risks of the target company relevant to the deal.</td>
                        </tr>
                        <tr>
                            <td>Vendor Due Diligence (VDD)</td>
                            <td>Commissioned by the seller. The seller prepares a DD report on its own company to reassure buyers and accelerate the transaction process.</td>
                        </tr>
                        <tr>
                            <td>Investor Due Diligence</td>
                            <td>Conducted by investors (PE/VC/angel) on a startup or growth-stage company before committing capital. Focus on cap table, FEMA, IP, and founder agreements.</td>
                        </tr>
                        <tr>
                            <td>Compliance Due Diligence</td>
                            <td>An internal audit-style exercise to assess the company&apos;s own regulatory and statutory compliance. Conducted periodically or before regulatory inspections.</td>
                        </tr>
                        <tr>
                            <td>Asset Due Diligence</td>
                            <td>Focused on a specific asset (real estate, IP portfolio, machinery) rather than the entire company. Verifies title, encumbrances, and legal ownership.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="key-areas-reviewed">
                <h2>Key Areas Reviewed</h2>
                <p>
                    A comprehensive Legal Due Diligence covers six core areas. Each area carries distinct risks and requires specialist expertise for thorough assessment.
                </p>

                <h2>Corporate Due Diligence</h2>
                <p>
                    Corporate DD examines the fundamental legal constitution of the company: its Certificate of Incorporation, Memorandum and Articles of Association, share capital structure, current shareholding pattern, board composition, and compliance with the Companies Act 2013. Key issues include irregularities in share allotment, unauthorized share transfers, non-filing of annual returns or financial statements, and violations of board and shareholder approval requirements.
                </p>

                <h2>Regulatory &amp; Statutory Compliance</h2>
                <p>
                    This area covers all regulatory filings and licenses: ROC compliance history, FEMA filings for foreign investment (FC-GPR, FC-TRS, FCTRS), RBI/SEBI/IRDAI/IFSCA licensing requirements based on the company&apos;s activities, and industry-specific registrations. Non-compliance with regulatory filings is one of the most commonly identified issues in Indian DD exercises, particularly for companies that have undergone rapid growth without dedicated compliance teams.
                </p>

                <h2>Contractual Due Diligence</h2>
                <p>
                    Contract DD reviews all material agreements: Shareholders&apos; Agreements (SHA), share subscription agreements, vendor and supplier contracts, customer agreements, lease and property agreements, and employment contracts with key personnel. Special attention is paid to restrictive clauses, change-of-control provisions (which may require third-party consent for the transaction), anti-assignment clauses, and termination rights.
                </p>

                <h2>Litigation Due Diligence</h2>
                <p>
                    Litigation DD involves a comprehensive review of all pending and past litigation across civil, criminal, and regulatory forums. This includes court cases, arbitration proceedings, regulatory show-cause notices and orders, tax demands and assessments, and labour disputes. Contingent liabilities identified in litigation DD often have a direct impact on deal valuation and structure.
                </p>

                <h2>IP Due Diligence</h2>
                <p>
                    IP DD verifies ownership of all intellectual property assets relevant to the business: trademark registrations (in the company&apos;s name), patents and patent applications, copyright ownership, software licensing agreements, and domain name registrations. A critical issue in startup DD is whether IP — particularly technology IP — is owned by the company or remains with founders in their personal capacity.
                </p>

                <h2>Financial-Linked Legal Review</h2>
                <p>
                    This area examines legal aspects of the company&apos;s financial obligations: existing debt instruments and loan agreements, charges registered with the ROC (CHG-1 filings), security interests over assets, pledge of shares, and guarantees provided by the company or its directors. Undisclosed encumbrances or unregistered charges are a significant risk in asset and share purchase transactions.
                </p>
            </section>

            <section id="process">
                <h2>Due Diligence Process</h2>
                <p>
                    Our Legal Due Diligence process follows a structured six-step methodology designed to ensure comprehensive coverage, efficient document review, and a clear, actionable report.
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Understand Transaction Scope</strong>
                        <p>We begin by understanding the nature of the transaction — M&amp;A, investment, asset purchase, or cross-border — the deal structure, the applicable regulatory framework, and the client&apos;s specific risk concerns. This scope-setting determines the depth and focus of the DD exercise.</p>
                    </li>
                    <li>
                        <strong>Step 2: Collect Documents &amp; Set Up Data Room</strong>
                        <p>We issue a comprehensive document request list to the target company, covering all six key areas. Documents are organised in a structured virtual data room. We review document completeness and flag any missing or incomplete records before commencing substantive review.</p>
                    </li>
                    <li>
                        <strong>Step 3: Review Corporate &amp; Regulatory Records</strong>
                        <p>We review the company&apos;s corporate records — MCA filings, board and shareholder meeting minutes, statutory registers, ROC correspondence — against applicable legal requirements. We also verify all regulatory filings, licenses, and approvals with the relevant authorities.</p>
                    </li>
                    <li>
                        <strong>Step 4: Contractual &amp; Financial Risk Analysis</strong>
                        <p>Material contracts are reviewed for restrictive clauses, change-of-control triggers, assignment restrictions, and transaction-relevant obligations. Financial-linked legal review covers charge filings, loan agreements, security documents, and off-balance-sheet obligations.</p>
                    </li>
                    <li>
                        <strong>Step 5: Identify Red Flags</strong>
                        <p>Based on the review, we identify and classify all material legal risks — non-compliances, contractual exposure, litigation risk, IP vulnerability — by severity (High, Medium, Low). Each finding is supported by documentary evidence and cross-referenced to the applicable legal provision.</p>
                    </li>
                    <li>
                        <strong>Step 6: Prepare DD Report</strong>
                        <p>We prepare a structured Due Diligence Report with executive summary, detailed observations, risk classification, compliance gap analysis, and remediation recommendations. The report is designed to support both deal negotiations and post-transaction compliance planning.</p>
                    </li>
                </ol>
            </section>

            <section id="red-flags">
                <h2>Red Flags &amp; Common Risks</h2>
                <p>
                    Certain findings in Legal DD are considered &ldquo;red flags&rdquo; — material issues that directly affect the transaction, the target company&apos;s legal standing, or the acquiring party&apos;s future liability. Identifying red flags is the primary purpose of a thorough DD exercise.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Red Flag</th>
                            <th>Risk Implication</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MCA non-compliance or backdated filings</td>
                            <td>Potential penalties, regulatory scrutiny, and invalidity of corporate actions taken without proper filings</td>
                        </tr>
                        <tr>
                            <td>Director disqualification under Section 164</td>
                            <td>Disqualified directors&apos; decisions may be void; company may itself be struck off; acquirer inherits governance risk</td>
                        </tr>
                        <tr>
                            <td>Improper FEMA compliance or non-compliant share valuation</td>
                            <td>FEMA contraventions carry compounding penalties; prior foreign investment rounds may be void</td>
                        </tr>
                        <tr>
                            <td>Missing board or shareholder approvals for past transactions</td>
                            <td>Past transactions (share allotments, asset transfers) may be challengeable as unauthorized</td>
                        </tr>
                        <tr>
                            <td>Unregistered key agreements</td>
                            <td>Agreements requiring registration (property, certain charges) may be unenforceable without registration</td>
                        </tr>
                        <tr>
                            <td>Invalid or disputed IP ownership</td>
                            <td>IP registered in founder&apos;s name rather than company; risk of post-investment IP disputes</td>
                        </tr>
                        <tr>
                            <td>Disputed shareholding pattern</td>
                            <td>Inconsistencies between share registers, MOA, and regulatory filings create ownership uncertainty</td>
                        </tr>
                        <tr>
                            <td>Unresolved tax or regulatory notices</td>
                            <td>Contingent tax liabilities may crystallise post-acquisition; regulatory penalties may follow the company</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>High-Impact Risk:</strong> Director disqualification under Section 164 of the Companies Act is particularly damaging — it affects all companies in which the disqualified individual is a director, may result in the company being struck off, and significantly limits the company&apos;s ability to transact during the disqualification period. This is one of the most commonly discovered and most impactful red flags in Indian DD exercises.
                </div>
            </section>

            <section id="dd-report-structure">
                <h2>Due Diligence Report Structure</h2>
                <p>
                    A well-structured DD Report is the primary deliverable of the legal due diligence process. It serves as the factual and legal basis for deal negotiations, representations and warranties, indemnity provisions, and post-closing remediation plans.
                </p>
                <p>A standard Legal DD Report contains the following sections:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Executive Summary</td>
                            <td>High-level overview of key findings, critical risks, and overall assessment — designed for decision-makers</td>
                        </tr>
                        <tr>
                            <td>Scope of Review</td>
                            <td>Transaction context, documents reviewed, limitations of the DD exercise, methodology employed</td>
                        </tr>
                        <tr>
                            <td>Key Observations</td>
                            <td>Detailed findings organised by due diligence area (Corporate, Regulatory, Contractual, Litigation, IP, Financial)</td>
                        </tr>
                        <tr>
                            <td>Identified Risks</td>
                            <td>Specific risks with supporting documentary evidence and reference to applicable law or regulation</td>
                        </tr>
                        <tr>
                            <td>Compliance Gaps</td>
                            <td>Non-compliances with applicable statutes and regulations, with severity assessment</td>
                        </tr>
                        <tr>
                            <td>Recommendations</td>
                            <td>Practical remediation steps for each identified risk — both pre-closing and post-closing actions</td>
                        </tr>
                        <tr>
                            <td>Risk Classification Matrix</td>
                            <td>All findings classified as High, Medium, or Low risk — enabling prioritised decision-making</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Risk Classification:</strong> High Risk — material issues that may affect deal viability or create post-closing liability. Medium Risk — issues requiring contractual protection or remediation. Low Risk — minor non-compliances with straightforward solutions. This classification directly informs deal structuring and negotiation.
                </div>
            </section>

            <section id="transaction-specific-dd">
                <h2>Transaction-Specific Due Diligence</h2>
                <p>
                    Different transaction types require tailored DD approaches. The following summarises the critical focus areas for the most common transaction types in India.
                </p>

                <h2>M&amp;A Due Diligence</h2>
                <p>
                    M&amp;A DD focuses on shareholding structure and control provisions, impact of pending litigation on deal valuation, change-of-control clauses in material contracts, regulatory approvals required for the acquisition (Competition Commission, sectoral regulators), and the legal structure of the proposed transaction (share purchase vs. business transfer).
                </p>

                <h2>PE/VC Investment Due Diligence</h2>
                <p>
                    PE/VC DD prioritises cap table accuracy and ESOP plan compliance, FEMA compliance for existing foreign investors and incoming investment, founder agreement terms (vesting, IP assignment, non-compete), anti-dilution and liquidation preference provisions in existing investment agreements, and DPIIT startup recognition status for tax benefits.
                </p>

                <h2>NBFC &amp; Financial Institution DD</h2>
                <p>
                    NBFC DD requires specialist review of RBI licensing classification and CoR validity, compliance with RBI prudential norms and fair practices code, KYC/AML policy implementation, IT and cybersecurity framework compliance, and any outstanding RBI inspection findings or enforcement actions.
                </p>

                <h2>Startup Due Diligence</h2>
                <p>
                    Startup DD focuses on founder agreements (particularly IP assignment to the company), technology IP ownership, DPIIT recognition and applicable exemptions, ESOPs and phantom equity arrangements, historical funding round compliance, and convertible instrument documentation (CCDs, CCPs, SAFEs, and their FEMA implications).
                </p>

                <h2>Cross-Border Transaction DD</h2>
                <p>
                    Cross-border DD is the most complex — requiring verification of FEMA/FDI compliance for all prior foreign investment, ODI structure compliance for outbound investments, applicable tax treaty positions, transfer pricing documentation, and structural approvals from RBI or the Government for sectoral compliance.
                </p>
            </section>

            <section id="dd-checklist">
                <h2>Due Diligence Checklist</h2>
                <p>
                    The following checklist represents the standard document request for a comprehensive Legal DD exercise. Actual requirements may vary based on the transaction type and the target company&apos;s sector.
                </p>

                <h2>Corporate &amp; Secretarial Documents</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Certificate of Incorporation (COI)</td><td>Verify legal existence and CIN</td></tr>
                        <tr><td>Memorandum &amp; Articles of Association (MOA/AOA)</td><td>Review objects, authorised capital, governance provisions</td></tr>
                        <tr><td>Board Meeting Minutes (last 5 years)</td><td>Verify approvals for material transactions</td></tr>
                        <tr><td>Shareholder Meeting Minutes (last 5 years)</td><td>Verify special resolution compliance</td></tr>
                        <tr><td>Shareholding Pattern / Cap Table</td><td>Verify ownership and dilution history</td></tr>
                        <tr><td>Share Certificates</td><td>Physical verification of issued shares</td></tr>
                        <tr><td>Register of Members</td><td>Verify current and historical ownership</td></tr>
                    </tbody>
                </table>

                <h2>Regulatory Compliance Documents</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>ROC filing history (MCA portal extract)</td><td>Identify non-compliance and late filings</td></tr>
                        <tr><td>FEMA filings (FC-GPR, FC-TRS, FCTRS)</td><td>Verify foreign investment compliance</td></tr>
                        <tr><td>Industry licenses and registrations</td><td>Confirm validity and renewal status</td></tr>
                        <tr><td>GST, PAN, TAN registrations</td><td>Verify tax registration compliance</td></tr>
                        <tr><td>DPIIT recognition certificate (if applicable)</td><td>Confirm startup tax exemption eligibility</td></tr>
                    </tbody>
                </table>

                <h2>Contractual Documents</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Shareholders&apos; Agreement (SHA)</td><td>Review governance, exit rights, anti-dilution, change-of-control</td></tr>
                        <tr><td>Vendor and supplier agreements</td><td>Identify restrictive clauses and assignment restrictions</td></tr>
                        <tr><td>Lease and property agreements</td><td>Verify tenure, renewal terms, and registration status</td></tr>
                        <tr><td>Key employment agreements</td><td>Review non-compete, non-solicit, and IP assignment clauses</td></tr>
                        <tr><td>Customer contracts (key accounts)</td><td>Identify change-of-control provisions and termination rights</td></tr>
                    </tbody>
                </table>

                <h2>Financial &amp; Charge Documents</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Loan agreements and sanction letters</td><td>Identify debt obligations and restrictive covenants</td></tr>
                        <tr><td>CHG-1 filings (charge registrations)</td><td>Verify all encumbrances on company assets</td></tr>
                        <tr><td>Bank statements (12 months)</td><td>Identify undisclosed payments, related-party transactions</td></tr>
                        <tr><td>Personal guarantees provided</td><td>Assess contingent liability exposure</td></tr>
                    </tbody>
                </table>

                <h2>Litigation &amp; IP Documents</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Litigation register (civil, criminal, regulatory)</td><td>Assess contingent liabilities from pending disputes</td></tr>
                        <tr><td>Tax demand notices and assessment orders</td><td>Identify disputed tax liabilities</td></tr>
                        <tr><td>Trademark registration certificates</td><td>Verify IP ownership in company name</td></tr>
                        <tr><td>Patent and copyright registrations</td><td>Assess IP portfolio and ownership status</td></tr>
                        <tr><td>IP licensing agreements</td><td>Identify encumbrances and third-party rights over IP</td></tr>
                    </tbody>
                </table>
            </section>

            <section id="fees">
                <h2>Fees &amp; Costs</h2>
                <p>
                    Legal Due Diligence fees in India vary significantly based on the complexity and scale of the transaction, the size and regulatory complexity of the target company, the number of entities in the group structure, and the timeline requirements.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Entity / Transaction Type</th>
                            <th>Typical Fee Range</th>
                            <th>Scope Included</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Startup / Early-Stage Company</td>
                            <td>₹50,000 – ₹2,00,000</td>
                            <td>Corporate, regulatory, IP, contracts, limited litigation</td>
                        </tr>
                        <tr>
                            <td>SME / Growth-Stage Company</td>
                            <td>₹2,00,000 – ₹5,00,000</td>
                            <td>Full scope — all six areas including financial-linked legal review</td>
                        </tr>
                        <tr>
                            <td>Large / Listed Company</td>
                            <td>₹5,00,000 and above</td>
                            <td>Comprehensive multi-entity DD with FEMA, SEBI, and sector-specific review</td>
                        </tr>
                        <tr>
                            <td>Cross-Border Transaction</td>
                            <td>Priced separately</td>
                            <td>FEMA/FDI audit, ODI structure review, international coordination</td>
                        </tr>
                        <tr>
                            <td>Vendor Due Diligence</td>
                            <td>Similar to buyer DD</td>
                            <td>Same scope as transactional DD; commissioned by seller</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Cost Perspective:</strong> Legal DD fees represent a small fraction of transaction value but protect against potentially company-threatening liabilities. A ₹2,00,000 DD exercise on a ₹5 crore investment that reveals a material FEMA violation or disputed IP ownership can save multiples of its cost in avoided loss, liability, and deal renegotiation expense.
                </div>
            </section>

            <section id="timeline">
                <h2>Timeline</h2>
                <p>
                    The timeline for Legal Due Diligence depends on document availability, the complexity of the target company, and the urgency of the transaction. A well-organised data room significantly accelerates the process.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Duration</th>
                            <th>Key Activities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Document Collection &amp; Data Room Setup</td>
                            <td>3–7 days</td>
                            <td>Issue document request list; target populates data room; review completeness</td>
                        </tr>
                        <tr>
                            <td>Substantive Review</td>
                            <td>7–20 days</td>
                            <td>Corporate, regulatory, contractual, litigation, IP, and financial-linked review</td>
                        </tr>
                        <tr>
                            <td>Queries &amp; Clarifications</td>
                            <td>Within review period</td>
                            <td>Issue queries to target on gaps or unclear items; receive supplementary documents</td>
                        </tr>
                        <tr>
                            <td>Draft Report &amp; Review</td>
                            <td>3–5 days</td>
                            <td>Prepare draft DD report; internal review; client discussion on key findings</td>
                        </tr>
                        <tr>
                            <td>Final Report Delivery</td>
                            <td>1–2 days</td>
                            <td>Incorporate client comments; deliver final risk-classified DD report</td>
                        </tr>
                        <tr>
                            <td><strong>Total Timeline</strong></td>
                            <td><strong>2–4 weeks</strong></td>
                            <td>For standard transactions; complex multi-entity or cross-border DD may take longer</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Accelerating DD:</strong> The single most effective way to reduce DD timeline is to have a well-organised, complete data room ready before the process begins. Companies that have maintained their secretarial and compliance records systematically can often complete DD in 10–14 days.
                </div>
            </section>

            <section id="dd-vs-legal-audit">
                <h2>Due Diligence vs Legal Audit</h2>
                <p>
                    Legal Due Diligence and Legal Audits are sometimes confused, but they serve distinct purposes, are conducted at different points in time, and produce different outputs.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Basis</th>
                            <th>Legal Due Diligence</th>
                            <th>Legal Audit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Purpose</td>
                            <td>Transaction-specific risk identification before investment or acquisition</td>
                            <td>Internal compliance verification to ensure ongoing regulatory adherence</td>
                        </tr>
                        <tr>
                            <td>Timing</td>
                            <td>Before executing a transaction — after term sheet, before definitive agreements</td>
                            <td>Periodic — annually or as triggered by regulatory requirements</td>
                        </tr>
                        <tr>
                            <td>Commissioned by</td>
                            <td>Investor, acquirer, or seller (for VDD)</td>
                            <td>The company itself or its board</td>
                        </tr>
                        <tr>
                            <td>Scope</td>
                            <td>Broad risk identification across all legal areas relevant to the transaction</td>
                            <td>Focused compliance verification against specific regulatory requirements</td>
                        </tr>
                        <tr>
                            <td>Outcome</td>
                            <td>DD Report with risk classification — used for deal negotiation and structuring</td>
                            <td>Audit Report with compliance findings — used for remediation planning</td>
                        </tr>
                        <tr>
                            <td>Impact on Deal</td>
                            <td>Directly affects valuation, deal structure, and conditions precedent</td>
                            <td>No direct transaction impact; used for internal governance</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="post-dd-compliance">
                <h2>Post-Due Diligence Compliance</h2>
                <p>
                    Legal DD is not the end of the compliance journey — it is the beginning of a structured remediation and governance programme. Issues identified in DD must be addressed either before closing (pre-conditions) or within agreed timelines post-closing.
                </p>

                <h2>Rectification of Non-Compliances</h2>
                <p>
                    MCA non-compliances, missed ROC filings, and corporate governance gaps should be rectified through compounding applications or voluntary rectification as applicable. Many historical non-compliances can be regularised through the MCA&apos;s Condonation of Delay scheme or through compounding under the Companies Act.
                </p>

                <h2>Updating Statutory Records</h2>
                <p>
                    Shareholding registers, charge registers, and statutory books should be updated to reflect the current legal position. Any discrepancies between physical registers, ROC filings, and the company&apos;s actual records must be reconciled before or shortly after the transaction closes.
                </p>

                <h2>Renegotiating Contracts</h2>
                <p>
                    Change-of-control issues identified in DD may require renegotiating key contracts with third-party consent or restructuring the transaction to avoid triggering change-of-control provisions. Assignment restrictions in critical vendor or customer agreements may need to be addressed as a condition precedent to closing.
                </p>

                <h2>Addressing Litigation Risks</h2>
                <p>
                    High-risk litigation identified in DD is typically addressed through indemnity provisions in the transaction documents, escrow arrangements retaining a portion of the purchase price, and representations &amp; warranties insurance where available. The seller remains liable for pre-closing litigation under well-drafted indemnity provisions.
                </p>

                <h2>Impact on Deal Structuring</h2>
                <p>
                    DD findings shape final deal documentation in several ways: valuation adjustments reduce the purchase price for identified risks, escrow arrangements protect the buyer for a defined post-closing period, conditions precedent require the seller to rectify specified issues before closing, and indemnity obligations shift defined liabilities to the seller. A skilled DD team helps translate DD findings into effective deal protections.
                </p>
            </section>

            <section id="faqs">
                <h2>FAQs</h2>
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
