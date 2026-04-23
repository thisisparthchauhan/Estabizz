"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What is NBFC for Sale" },
        { id: "regulatory-framework", title: "3. Regulatory Framework" },
        { id: "who-should-buy", title: "4. Who Should Buy" },
        { id: "eligibility", title: "5. Eligibility Criteria" },
        { id: "documents", title: "6. Documents Required" },
        { id: "process", title: "7. Step-by-Step Process" },
        { id: "fees", title: "8. Fees Structure" },
        { id: "timeline", title: "9. Timeline" },
        { id: "post-compliance", title: "10. Post-Acquisition Compliance" },
        { id: "common-mistakes", title: "11. Common Mistakes" },
        { id: "due-diligence", title: "12. Advanced Due Diligence" },
        { id: "nbfc-types", title: "13. Types of NBFC for Sale" },
        { id: "comparison", title: "14. NBFC for Sale vs Fresh Registration" },
        { id: "rbi-red-flags", title: "15. RBI Red Flags" },
        { id: "strategic-uses", title: "16. Strategic Use Cases" },
        { id: "decision-framework", title: "17. Decision Framework" },
        { id: "deal-structuring", title: "18. Deal Structuring Models" },
        { id: "roadmap", title: "19. Post-Acquisition Roadmap" },
        { id: "expert-quote", title: "20. Expert Insight" },
        { id: "conclusion", title: "21. Conclusion" },
        { id: "faq", title: "22. FAQs (150 Questions)" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "Reserve Bank of India" },
        { label: "Approval Type", value: "Change in Control" },
        { label: "Timeline", value: "3–6 months" },
        { label: "Min Capital", value: "₹10 Crore NOF" },
        { label: "Expert Review", value: "✓ Verified" },
    ];

    const tags = [
        { emoji: "🏦", label: "NBFC" },
        { emoji: "💰", label: "Fintech" },
        { emoji: "⚖️", label: "RBI Regulated" },
        { emoji: "📋", label: "Due Diligence" },
        { emoji: "🔄", label: "Share Acquisition" },
    ];

    const relatedArticles = [
        { href: "/rbi/nbfc-registration", category: "RBI", title: "NBFC Registration in India", description: "Complete guide to obtain RBI Certificate of Registration for your NBFC." },
        { href: "/rbi/nbfc-financial-modeling", category: "RBI", title: "NBFC Financial Modelling", description: "Build RBI-ready financial models for your NBFC with compliance and risk planning." },
        { href: "/rbi/nbfc-business-plan", category: "RBI", title: "NBFC Business Plan", description: "Draft a regulator-ready NBFC business plan for RBI approval." },
        { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Apply for RBI Account Aggregator licence under the AA framework." },
    ];

    return (
        <ServicePageLayout
            tags={tags}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "RBI", href: "/rbi" }, { label: "NBFC for Sale" }]}
            title="NBFC for Sale in India: 2026 Ultimate Guide to Buy NBFC Safely &amp; Legally"
            focusKeyword="NBFC for Sale in India"
            sections={sections}
            ctaTitle="Need Expert Help Buying an NBFC?"
            ctaDescription="NBFC for Sale in India – Learn how to buy NBFC legally with RBI approval, cost, process, compliance, risks &amp; expert insights. Our consultants provide end-to-end acquisition support."
            quickFacts={quickFacts}
            relatedArticles={relatedArticles}
            finalCtaTitle="Ready to Buy an NBFC?"
            finalCtaDescription="Connect with our expert consultants for end-to-end NBFC acquisition support, due diligence, RBI approvals, and post-acquisition compliance."
        >
            <section id="introduction">
                <h2>NBFC for Sale in India</h2>
                <div className="article-content">
                    <p><strong>NBFC for Sale in India is increasingly becoming a preferred route for businesses looking to enter the financial services sector quickly without going through the lengthy RBI registration process.</strong></p>
                    <p>In today&apos;s regulatory environment, acquiring an existing NBFC can significantly reduce time-to-market, provided the transaction is structured in compliance with RBI norms.</p>
                </div>
            </section>

            <section id="what-is">
                <h2>What is NBFC for Sale in India</h2>
                <div className="article-content">
                    <p><strong>In simple terms…</strong><br />NBFC for Sale in India means purchasing an already operational or dormant NBFC company with an existing RBI registration.</p>
                    <p><strong>From a compliance perspective…</strong><br />It involves transfer of ownership and control, which triggers regulatory approval under RBI guidelines.</p>
                    <p><strong>Legally speaking…</strong><br />It is governed under Section 45-IA of the RBI Act, along with RBI Master Directions on NBFCs and change in control provisions.</p>
                </div>
            </section>

            <section id="regulatory-framework">
                <h2>Regulatory Framework Governing NBFC Acquisition</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Particulars</th><th>Details</th></tr></thead>
                        <tbody>
                            <tr><td>Governing Law</td><td>RBI Act, 1934</td></tr>
                            <tr><td>Regulator</td><td>Reserve Bank of India (RBI)</td></tr>
                            <tr><td>Key Guidelines</td><td>Change in Control &amp; Management Directions</td></tr>
                            <tr><td>Applicable Provisions</td><td>Section 45-IA, RBI Master Directions</td></tr>
                            <tr><td>Approval Requirement</td><td>Mandatory RBI approval</td></tr>
                        </tbody>
                    </table>
                    <p><strong>As per applicable regulatory guidelines</strong>, any takeover involving:</p>
                    <ul>
                        <li>Change in shareholding beyond 26%</li>
                        <li>Change in directors or management</li>
                        <li>Transfer of control</li>
                    </ul>
                    <p>requires prior RBI approval.</p>
                </div>
            </section>

            <section id="who-should-buy">
                <h2>Who Should Consider Buying an NBFC</h2>
                <div className="article-content">
                    <ul>
                        <li>✔ Fintech startups entering lending space</li>
                        <li>✔ Existing financial institutions expanding operations</li>
                        <li>✔ Investors looking for ready financial infrastructure</li>
                        <li>✔ Foreign entities (through compliant structure)</li>
                        <li>✔ Businesses planning digital lending platforms</li>
                    </ul>
                </div>
            </section>

            <section id="eligibility">
                <h2>Eligibility Criteria for Acquiring NBFC</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Criteria</th><th>Requirement</th><th>Practical Insight</th></tr></thead>
                        <tbody>
                            <tr><td>Financial Strength</td><td>Net worth &amp; funding capacity</td><td>RBI evaluates promoter capability</td></tr>
                            <tr><td>Clean Background</td><td>No criminal/financial fraud record</td><td>KYC of directors is critical</td></tr>
                            <tr><td>Experience</td><td>Financial sector exposure preferred</td><td>Not mandatory but beneficial</td></tr>
                            <tr><td>Business Plan</td><td>Clear lending/business model</td><td>Required for RBI approval</td></tr>
                            <tr><td>Compliance Track Record</td><td>Target NBFC must be compliant</td><td>Non-compliant NBFC = high risk</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="documents">
                <h2>Documents Required for NBFC Acquisition</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Document</th><th>Purpose</th><th>Mandatory</th></tr></thead>
                        <tbody>
                            <tr><td>Share Purchase Agreement (SPA)</td><td>Defines transaction terms</td><td>Yes</td></tr>
                            <tr><td>Net Worth Proof</td><td>Financial capability of buyer</td><td>Yes</td></tr>
                            <tr><td>KYC of Directors</td><td>Identity verification</td><td>Yes</td></tr>
                            <tr><td>Board Resolution</td><td>Approval for acquisition</td><td>Yes</td></tr>
                            <tr><td>Business Plan</td><td>Future operations</td><td>Yes</td></tr>
                            <tr><td>Due Diligence Report</td><td>Risk evaluation</td><td>Strongly recommended</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="process">
                <h2>Step-by-Step Process to Buy NBFC in India</h2>
                <div className="article-content">
                    <div className="step-timeline">
                        <div className="step"><strong>Step 1:</strong> Identify a suitable NBFC (active or dormant)</div>
                        <div className="step"><strong>Step 2:</strong> Conduct detailed legal and financial due diligence</div>
                        <div className="step"><strong>Step 3:</strong> Finalise valuation and execute Share Purchase Agreement</div>
                        <div className="step"><strong>Step 4:</strong> Apply to RBI for approval of change in control</div>
                        <div className="step"><strong>Step 5:</strong> RBI reviews promoter background and compliance</div>
                        <div className="step"><strong>Step 6:</strong> Post approval, transfer shares and appoint new directors</div>
                        <div className="step"><strong>Step 7:</strong> File post-acquisition compliance with ROC &amp; RBI</div>
                    </div>
                </div>
            </section>

            <section id="fees">
                <h2>Fees Structure for NBFC Acquisition</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Component</th><th>Cost Range</th></tr></thead>
                        <tbody>
                            <tr><td>NBFC Purchase Cost</td><td>₹50 lakh to ₹5 crore+ (varies widely)</td></tr>
                            <tr><td>RBI Application Fees</td><td>Nil (but professional costs apply)</td></tr>
                            <tr><td>Legal &amp; Due Diligence</td><td>₹2 lakh – ₹10 lakh</td></tr>
                            <tr><td>Professional Fees</td><td>₹3 lakh – ₹15 lakh</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="timeline">
                <h2>Timeline for NBFC Acquisition</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Stage</th><th>Timeline</th><th>Remarks</th></tr></thead>
                        <tbody>
                            <tr><td>Due Diligence</td><td>2–4 weeks</td><td>Critical stage</td></tr>
                            <tr><td>Documentation</td><td>2–3 weeks</td><td>SPA &amp; filings</td></tr>
                            <tr><td>RBI Approval</td><td>2–4 months</td><td>Depends on case</td></tr>
                            <tr><td>Post Transfer Compliance</td><td>2–3 weeks</td><td>ROC + RBI filings</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="post-compliance">
                <h2>Post-Acquisition Compliance Requirements</h2>
                <div className="article-content">
                    <ul>
                        <li>✔ Filing intimation with RBI</li>
                        <li>✔ Updating directors in ROC</li>
                        <li>✔ Compliance with RBI returns (NBS returns)</li>
                        <li>✔ KYC/AML adherence</li>
                        <li>✔ Statutory audit &amp; reporting</li>
                    </ul>
                    <p><strong>Under governing regulations</strong>, NBFC must continue:</p>
                    <ul>
                        <li>Prudential norms compliance</li>
                        <li>Capital adequacy requirements</li>
                        <li>Fair practices code</li>
                    </ul>
                </div>
            </section>

            <section id="common-mistakes">
                <h2>⚠️ Common Mistakes While Buying NBFC</h2>
                <div className="article-content">
                    <ul>
                        <li>❌ Ignoring past non-compliance of NBFC</li>
                        <li>❌ Not checking pending RBI notices</li>
                        <li>❌ Buying shell NBFC without activity history</li>
                        <li>❌ Weak documentation for RBI approval</li>
                        <li>❌ Lack of proper business plan</li>
                    </ul>
                    <h3>Practical Compliance Risks (Expert Insight)</h3>
                    <ul>
                        <li>✔ RBI may reject application if promoters lack credibility</li>
                        <li>✔ Hidden liabilities may exist in acquired NBFC</li>
                        <li>✔ Non-compliant NBFC can lead to license cancellation</li>
                        <li>✔ Delay in RBI approval due to incomplete documentation</li>
                    </ul>
                    <h3>Why Professional Support Matters</h3>
                    <ul>
                        <li>✔ Ensures RBI approval readiness</li>
                        <li>✔ Conducts deep due diligence</li>
                        <li>✔ Structures transaction legally</li>
                        <li>✔ Avoids regulatory rejection</li>
                        <li>✔ Saves time and cost</li>
                    </ul>
                </div>
            </section>

            <section id="due-diligence">
                <h2>🔍 Advanced Due Diligence Checklist for NBFC Acquisition</h2>
                <div className="article-content">
                    <p>Before proceeding with any NBFC for Sale in India, a <strong>multi-layer due diligence</strong> must be conducted.</p>
                    <h3>1. Regulatory Due Diligence</h3>
                    <ul>
                        <li>✔ Verify RBI Certificate of Registration (CoR) validity</li>
                        <li>✔ Check whether NBFC is <strong>active, dormant, or under scrutiny</strong></li>
                        <li>✔ Review RBI inspection reports (if any)</li>
                        <li>✔ Identify pending regulatory filings</li>
                    </ul>
                    <h3>2. Financial Due Diligence</h3>
                    <ul>
                        <li>✔ Review last 3–5 years audited financials</li>
                        <li>✔ Analyse loan book quality (if active NBFC)</li>
                        <li>✔ Check NPAs and provisioning status</li>
                        <li>✔ Verify capital adequacy ratio (CRAR)</li>
                    </ul>
                    <h3>3. Legal Due Diligence</h3>
                    <ul>
                        <li>✔ Check pending litigations or notices</li>
                        <li>✔ Verify shareholding structure</li>
                        <li>✔ Confirm no hidden liabilities</li>
                        <li>✔ Validate contracts and agreements</li>
                    </ul>
                    <h3>4. Compliance Due Diligence</h3>
                    <ul>
                        <li>✔ Ensure all RBI returns (NBS forms) are filed</li>
                        <li>✔ Check KYC/AML compliance framework</li>
                        <li>✔ Verify statutory audit completion</li>
                        <li>✔ Review board meeting and governance records</li>
                    </ul>
                    <h3>5. Business Due Diligence</h3>
                    <ul>
                        <li>✔ Understand past business model</li>
                        <li>✔ Evaluate scalability of NBFC</li>
                        <li>✔ Check existing client portfolio</li>
                        <li>✔ Assess technology infrastructure</li>
                    </ul>
                </div>
            </section>

            <section id="nbfc-types">
                <h2>⚖️ Types of NBFC Available for Sale in India</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Type of NBFC</th><th>Description</th><th>Suitability</th></tr></thead>
                        <tbody>
                            <tr><td>Investment &amp; Credit Company (ICC)</td><td>Lending + investment activities</td><td>Most common</td></tr>
                            <tr><td>Microfinance NBFC (NBFC-MFI)</td><td>Small-ticket loans to low-income groups</td><td>Regulated niche</td></tr>
                            <tr><td>Infrastructure Finance Company</td><td>Large-scale infrastructure funding</td><td>High capital requirement</td></tr>
                            <tr><td>Core Investment Company (CIC)</td><td>Group holding structure</td><td>Corporate groups</td></tr>
                            <tr><td>Non-Operative Financial Holding Company (NOFHC)</td><td>Banking group structure</td><td>Rare</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="comparison">
                <h2>📊 NBFC for Sale vs Fresh NBFC Registration</h2>
                <div className="article-content">
                    <table className="data-table">
                        <thead><tr><th>Particulars</th><th>NBFC for Sale</th><th>Fresh NBFC Registration</th></tr></thead>
                        <tbody>
                            <tr><td>Time</td><td>2–4 months</td><td>6–12 months</td></tr>
                            <tr><td>RBI Scrutiny</td><td>Moderate</td><td>High</td></tr>
                            <tr><td>Cost</td><td>Higher upfront</td><td>Lower initial</td></tr>
                            <tr><td>Risk</td><td>Depends on past compliance</td><td>Cleaner structure</td></tr>
                            <tr><td>Flexibility</td><td>Limited (existing structure)</td><td>Fully customizable</td></tr>
                        </tbody>
                    </table>
                    <div className="info-box">
                        <p><strong>Practical Insight:</strong> If speed is critical, acquisition is preferred. If long-term structure matters, fresh registration may be better.</p>
                    </div>
                </div>
            </section>

            <section id="rbi-red-flags">
                <h2>🚨 RBI Red Flags That Can Lead to Rejection</h2>
                <div className="article-content">
                    <p><strong>According to governing regulations</strong>, RBI closely evaluates promoter credibility.</p>
                    <p><strong>Common rejection triggers:</strong></p>
                    <ul>
                        <li>❌ Unexplained source of funds</li>
                        <li>❌ Weak financial profile of promoters</li>
                        <li>❌ Negative CIBIL / banking history</li>
                        <li>❌ Lack of relevant experience</li>
                        <li>❌ Poor compliance history of NBFC</li>
                    </ul>
                </div>
            </section>

            <section id="strategic-uses">
                <h2>📈 Strategic Use Cases of Buying NBFC</h2>
                <div className="article-content">
                    <ul>
                        <li>✔ Launching digital lending platforms</li>
                        <li>✔ Entering fintech / BNPL space</li>
                        <li>✔ Building loan marketplace</li>
                        <li>✔ Structured lending to MSMEs</li>
                        <li>✔ Asset-backed financing models</li>
                    </ul>
                    <h3>💡 Taxation &amp; Accounting Considerations</h3>
                    <p><strong>From a practical perspective…</strong></p>
                    <ul>
                        <li>✔ Share purchase is treated as capital transaction</li>
                        <li>✔ Stamp duty applicable on share transfer</li>
                        <li>✔ Goodwill valuation may arise</li>
                        <li>✔ Accounting treatment depends on deal structure</li>
                    </ul>
                    <h3>🌐 Foreign Investment in NBFC Acquisition</h3>
                    <p><strong>Legally speaking…</strong></p>
                    <p>Foreign investment is permitted under <strong>automatic route</strong>, subject to:</p>
                    <ul>
                        <li>✔ Compliance with FEMA regulations</li>
                        <li>✔ Minimum capitalisation norms</li>
                        <li>✔ Sectoral caps (if applicable)</li>
                        <li>✔ KYC of foreign investors</li>
                    </ul>
                    <h3>📌 Key Clauses in NBFC Share Purchase Agreement (SPA)</h3>
                    <ul>
                        <li>✔ Purchase consideration &amp; payment terms</li>
                        <li>✔ Representations &amp; warranties</li>
                        <li>✔ Indemnity clause</li>
                        <li>✔ Regulatory approval condition</li>
                        <li>✔ Non-compete clause</li>
                    </ul>
                    <h3>🔄 Post-Acquisition Business Setup Strategy</h3>
                    <p>After acquiring NBFC:</p>
                    <ul>
                        <li>✔ Redesign business model (if needed)</li>
                        <li>✔ Build lending technology platform</li>
                        <li>✔ Establish risk &amp; credit policy</li>
                        <li>✔ Hire compliance and operations team</li>
                        <li>✔ Start pilot lending</li>
                    </ul>
                    <h3>⚠️ Hidden Risks You Must Evaluate</h3>
                    <ul>
                        <li>✔ Dummy NBFCs with no operations</li>
                        <li>✔ NBFCs with non-performing assets</li>
                        <li>✔ Regulatory non-compliance history</li>
                        <li>✔ Pending RBI penalties</li>
                        <li>✔ Weak governance framework</li>
                    </ul>
                    <h3>📊 Real-World Example (Understanding Scenario)</h3>
                    <div className="info-box">
                        <p><strong>Case Insight:</strong></p>
                        <p>A fintech startup planning to launch a lending app:</p>
                        <ul>
                            <li>Instead of waiting 9 months for NBFC registration</li>
                            <li>They acquired a compliant NBFC</li>
                            <li>Completed RBI approval in 3 months</li>
                            <li>Started operations within 120 days</li>
                        </ul>
                        <p><strong>Outcome:</strong> Faster market entry + competitive advantage</p>
                    </div>
                    <h3>🧭 Why This Route is Gaining Popularity</h3>
                    <ul>
                        <li>✔ Time efficiency</li>
                        <li>✔ Ready regulatory framework</li>
                        <li>✔ Faster funding opportunities</li>
                        <li>✔ Immediate operational capability</li>
                    </ul>
                </div>
            </section>

            <section id="decision-framework">
                <h2>🧠 NBFC Acquisition Decision Framework (Should You Buy or Not?)</h2>
                <div className="article-content">
                    <p>Before proceeding with an <strong>NBFC for Sale in India</strong>, a promoter must take a structured decision.</p>
                    <p><strong>Ask Yourself These 5 Critical Questions:</strong></p>
                    <ul>
                        <li>✔ Do you need <strong>quick market entry</strong> (within 3–4 months)?</li>
                        <li>✔ Do you have <strong>strong funding + governance capability</strong>?</li>
                        <li>✔ Can you handle <strong>ongoing RBI compliance rigor</strong>?</li>
                        <li>✔ Is the target NBFC <strong>clean and compliant</strong>?</li>
                        <li>✔ Do you have a <strong>clear business model (lending / fintech / structured finance)?</strong></li>
                    </ul>
                    <h3>📊 Decision Matrix</h3>
                    <table className="data-table">
                        <thead><tr><th>Scenario</th><th>Recommendation</th></tr></thead>
                        <tbody>
                            <tr><td>Urgent business launch</td><td>Buy NBFC</td></tr>
                            <tr><td>Long-term structured plan</td><td>Fresh NBFC</td></tr>
                            <tr><td>Limited budget</td><td>Fresh NBFC</td></tr>
                            <tr><td>Strong investor backing</td><td>Buy NBFC</td></tr>
                            <tr><td>Fintech launch</td><td>Buy NBFC</td></tr>
                        </tbody>
                    </table>
                    <h3>🔍 NBFC Categories – Strategic Selection Guide</h3>
                    <table className="data-table">
                        <thead><tr><th>Business Goal</th><th>Recommended NBFC Type</th></tr></thead>
                        <tbody>
                            <tr><td>Digital lending app</td><td>NBFC-ICC</td></tr>
                            <tr><td>Micro lending</td><td>NBFC-MFI</td></tr>
                            <tr><td>Group holding structure</td><td>CIC</td></tr>
                            <tr><td>Infrastructure finance</td><td>IFC</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="deal-structuring">
                <h2>🏗️ Deal Structuring Models for NBFC Acquisition</h2>
                <div className="article-content">
                    <p>From a practical compliance perspective, NBFC acquisition can be structured in multiple ways:</p>
                    <h3>1. 100% Share Acquisition</h3>
                    <ul>
                        <li>✔ Complete control transfer</li>
                        <li>✔ Most common structure</li>
                        <li>✔ Requires RBI approval</li>
                    </ul>
                    <h3>2. Majority Stake Acquisition (&gt;51%)</h3>
                    <ul>
                        <li>✔ Control with partial ownership</li>
                        <li>✔ Useful for joint ventures</li>
                        <li>✔ RBI approval required</li>
                    </ul>
                    <h3>3. Phased Acquisition</h3>
                    <ul>
                        <li>✔ Initial minority stake → later control</li>
                        <li>✔ Used to reduce risk</li>
                        <li>✔ Structuring must be carefully planned</li>
                    </ul>
                    <h3>4. Strategic Investment with Management Control</h3>
                    <ul>
                        <li>✔ Investor controls board</li>
                        <li>✔ Promoter retains shares</li>
                        <li>✔ Complex RBI evaluation</li>
                    </ul>
                    <h3>⚖️ Key Legal Triggers in NBFC Acquisition</h3>
                    <p><strong>Under relevant provisions</strong>, the following trigger RBI approval:</p>
                    <ul>
                        <li>✔ Change in shareholding &gt; 26%</li>
                        <li>✔ Change in directors</li>
                        <li>✔ Change in management control</li>
                        <li>✔ Merger or restructuring</li>
                    </ul>
                    <h3>🔐 Corporate Governance Expectations from RBI</h3>
                    <p>RBI does not only approve — it evaluates <strong>intent and governance strength</strong>.</p>
                    <p><strong>Expected Standards:</strong></p>
                    <ul>
                        <li>✔ Independent directors (in certain cases)</li>
                        <li>✔ Strong internal audit system</li>
                        <li>✔ Risk management framework</li>
                        <li>✔ Fair lending practices</li>
                        <li>✔ Board-level oversight</li>
                    </ul>
                    <h3>📉 What Happens If NBFC is Non-Compliant</h3>
                    <div className="warning-box">
                        <p>⚠️ <strong>Serious Consequences:</strong></p>
                        <ul>
                            <li>❌ RBI may reject acquisition</li>
                            <li>❌ License may be cancelled</li>
                            <li>❌ Financial penalties may apply</li>
                            <li>❌ Business operations may be restricted</li>
                        </ul>
                    </div>
                    <h3>📊 Financial Indicators You MUST Evaluate</h3>
                    <p>Before buying NBFC:</p>
                    <ul>
                        <li>✔ Net Owned Funds (NOF)</li>
                        <li>✔ Capital Adequacy Ratio (CRAR)</li>
                        <li>✔ Asset Quality (NPA %)</li>
                        <li>✔ Profitability trends</li>
                        <li>✔ Borrowing profile</li>
                    </ul>
                    <h3>📈 Future Trends in NBFC Acquisition (India)</h3>
                    <ul>
                        <li>✔ Rise in fintech-led acquisitions</li>
                        <li>✔ RBI tightening governance norms</li>
                        <li>✔ Increased scrutiny on digital lending</li>
                        <li>✔ Shift towards compliance-heavy operations</li>
                    </ul>
                </div>
            </section>

            <section id="roadmap">
                <h2>💼 Post-Acquisition Operational Roadmap (First 90 Days)</h2>
                <div className="article-content">
                    <h3>Phase 1: Regulatory Alignment (0–30 Days)</h3>
                    <ul>
                        <li>✔ Complete RBI filings</li>
                        <li>✔ Update board &amp; KYC</li>
                        <li>✔ Define business strategy</li>
                    </ul>
                    <h3>Phase 2: System Setup (30–60 Days)</h3>
                    <ul>
                        <li>✔ Lending platform setup</li>
                        <li>✔ Compliance system</li>
                        <li>✔ Policy framework</li>
                    </ul>
                    <h3>Phase 3: Go-Live (60–90 Days)</h3>
                    <ul>
                        <li>✔ Pilot lending</li>
                        <li>✔ Risk monitoring</li>
                        <li>✔ Scale operations</li>
                    </ul>
                    <h3>📌 Client-Level Practical Concerns (Real Queries We See)</h3>
                    <ul>
                        <li>✔ &ldquo;Can I start lending immediately?&rdquo;</li>
                        <li>✔ &ldquo;Will RBI question my funding source?&rdquo;</li>
                        <li>✔ &ldquo;Is NBFC acquisition safer than fresh license?&rdquo;</li>
                        <li>✔ &ldquo;What if previous owner has done non-compliance?&rdquo;</li>
                    </ul>
                    <p>👉 These are not theoretical — these are <strong>actual deal-breaking concerns</strong>.</p>
                </div>
            </section>

            <section id="expert-quote">
                <h2>💬 Expert Insight</h2>
                <div className="article-content">
                    <div className="expert-quote">
                        <blockquote>&ldquo;Acquiring an NBFC is not merely a commercial transaction—it is a regulatory transition. The Reserve Bank evaluates not just the entity, but the intent, governance capability, and long-term commitment of the incoming promoters.&rdquo;</blockquote>
                        <cite>— CS Devyani Khambhati, Compliance Expert</cite>
                    </div>
                </div>
            </section>

            <section id="conclusion">
                <h2>Conclusion</h2>
                <div className="article-content">
                    <p>NBFC for Sale in India offers a strategic shortcut to enter the regulated financial ecosystem. However, this route demands careful planning, strict compliance, and strong regulatory understanding.</p>
                    <p>With proper due diligence and professional structuring, it can become a powerful entry point into India&apos;s growing lending and fintech sector.</p>
                </div>
            </section>

            <section id="faq">
                <h2>FAQs on NBFC for Sale in India</h2>
                <div className="article-content">
                    <h3>Section 1: Basic Understanding</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q1. What does &ldquo;NBFC for sale&rdquo; mean in India?</summary><p>It means purchasing an existing RBI-registered NBFC instead of applying for a new licence. This is typically done through share acquisition or takeover.</p></details>
                        <details className="faq-item"><summary>Q2. Why do businesses prefer buying an NBFC instead of registering a new one?</summary><p>Buying an NBFC saves time and regulatory effort. Key benefits include: Immediate operational readiness, Avoiding long RBI approval timelines, Existing compliance structure.</p></details>
                        <details className="faq-item"><summary>Q3. Is purchasing an NBFC legal in India?</summary><p>Yes, it is legal, provided RBI approval is obtained for change in control and shareholding, as per regulatory guidelines.</p></details>
                        <details className="faq-item"><summary>Q4. What is a &ldquo;ready-made NBFC&rdquo;?</summary><p>A ready-made NBFC is an already incorporated and RBI-registered entity available for takeover with no or minimal operations.</p></details>
                        <details className="faq-item"><summary>Q5. Who regulates NBFC sales in India?</summary><p>The Reserve Bank of India (RBI) regulates all NBFC ownership changes under its Master Directions and approval framework.</p></details>
                        <details className="faq-item"><summary>Q6. Can a startup buy an NBFC?</summary><p>Yes, startups can acquire NBFCs if they meet fit and proper criteria and obtain RBI approval.</p></details>
                        <details className="faq-item"><summary>Q7. What types of NBFCs are available for sale?</summary><p>Common types include: NBFC-ICC (Investment &amp; Credit Company), NBFC-MFI, NBFC-Factor, Core Investment Company.</p></details>
                        <details className="faq-item"><summary>Q8. Does buying an NBFC mean automatic RBI approval?</summary><p>No, RBI approval is mandatory before completing the transaction.</p></details>
                        <details className="faq-item"><summary>Q9. What is the minimum capital requirement for an NBFC?</summary><p>As per current regulations, the minimum Net Owned Fund (NOF) is ₹10 crore.</p></details>
                        <details className="faq-item"><summary>Q10. Can I operate immediately after buying an NBFC?</summary><p>Only after RBI approval and completion of share transfer and compliance formalities.</p></details>
                        <details className="faq-item"><summary>Q11. What is change in control in NBFC acquisition?</summary><p>It refers to transfer of ownership or management requiring prior RBI approval.</p></details>
                        <details className="faq-item"><summary>Q12. Is NBFC acquisition faster than new registration?</summary><p>Yes, acquisition is significantly faster compared to fresh licensing.</p></details>
                        <details className="faq-item"><summary>Q13. Can foreign investors buy an NBFC in India?</summary><p>Yes, subject to FEMA and RBI regulations.</p></details>
                        <details className="faq-item"><summary>Q14. Is due diligence required before buying an NBFC?</summary><p>Absolutely. Financial, legal, and regulatory due diligence is critical.</p></details>
                        <details className="faq-item"><summary>Q15. What is the main advantage of buying a dormant NBFC?</summary><p>Lower compliance risk and clean track record.</p></details>
                    </div>
                    <h3>Section 2: Eligibility &amp; Applicability</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q16. Who can buy an NBFC in India?</summary><p>Individuals, companies, or investors meeting RBI fit and proper criteria.</p></details>
                        <details className="faq-item"><summary>Q17. What is the &ldquo;fit and proper&rdquo; criteria?</summary><p>It includes: Clean financial track record, No criminal background, Relevant experience.</p></details>
                        <details className="faq-item"><summary>Q18. Can a foreign company acquire an NBFC?</summary><p>Yes, subject to FDI norms and RBI approval.</p></details>
                        <details className="faq-item"><summary>Q19. Is prior experience in finance required?</summary><p>Not mandatory but preferred for RBI approval.</p></details>
                        <details className="faq-item"><summary>Q20. Can a partnership firm acquire an NBFC?</summary><p>No, NBFC must be held by a company structure.</p></details>
                        <details className="faq-item"><summary>Q21. Can directors be changed after acquisition?</summary><p>Yes, but RBI approval is required.</p></details>
                        <details className="faq-item"><summary>Q22. Can a fintech startup acquire an NBFC?</summary><p>Yes, many fintechs use this route for lending operations.</p></details>
                        <details className="faq-item"><summary>Q23. Is there any net worth requirement for buyers?</summary><p>Yes, buyers must demonstrate financial strength.</p></details>
                        <details className="faq-item"><summary>Q24. Can multiple investors jointly acquire an NBFC?</summary><p>Yes, subject to approval and shareholding structure.</p></details>
                        <details className="faq-item"><summary>Q25. Can I buy an NBFC without RBI approval?</summary><p>No, it is strictly prohibited.</p></details>
                        <details className="faq-item"><summary>Q26. Is there any restriction on shareholding percentage?</summary><p>Yes, significant changes trigger RBI approval.</p></details>
                        <details className="faq-item"><summary>Q27. Can an existing NBFC merge with another company?</summary><p>Yes, subject to RBI and NCLT approval.</p></details>
                        <details className="faq-item"><summary>Q28. Can NRIs invest in NBFC acquisition?</summary><p>Yes, under FEMA guidelines.</p></details>
                        <details className="faq-item"><summary>Q29. Is PAN and KYC mandatory for buyers?</summary><p>Yes, as per regulatory requirements.</p></details>
                        <details className="faq-item"><summary>Q30. Can an NBFC be acquired for digital lending?</summary><p>Yes, widely used for fintech lending models.</p></details>
                    </div>
                    <h3>Section 3: Registration Process</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q31. What is the process to buy an NBFC?</summary><p>The process includes: Due diligence, Share purchase agreement, RBI approval, Transfer of control.</p></details>
                        <details className="faq-item"><summary>Q32. Is RBI approval required before share transfer?</summary><p>Yes, prior approval is mandatory.</p></details>
                        <details className="faq-item"><summary>Q33. What documents are submitted to RBI?</summary><p>Includes: Shareholding details, Director profiles, Financial statements.</p></details>
                        <details className="faq-item"><summary>Q34. What is the role of CA/CS in NBFC acquisition?</summary><p>They handle compliance, documentation, and regulatory filings.</p></details>
                        <details className="faq-item"><summary>Q35. Can the process be done online?</summary><p>Partially; RBI filings are digital but documentation is extensive.</p></details>
                        <details className="faq-item"><summary>Q36. What is a Share Purchase Agreement (SPA)?</summary><p>Legal document for transfer of ownership.</p></details>
                        <details className="faq-item"><summary>Q37. Is public notice required?</summary><p>Yes, in newspapers before ownership change.</p></details>
                        <details className="faq-item"><summary>Q38. How many approvals are required?</summary><p>Mainly RBI approval, plus ROC updates.</p></details>
                        <details className="faq-item"><summary>Q39. Can NBFC name be changed after acquisition?</summary><p>Yes, with ROC approval.</p></details>
                        <details className="faq-item"><summary>Q40. What is post-acquisition compliance?</summary><p>Includes updating RBI, KYC, and regulatory filings.</p></details>
                    </div>
                    <h3>Section 4: Documents &amp; Requirements</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q41. What documents are needed for NBFC purchase?</summary><p>Key documents include: KYC of directors, Financial statements, Business plan.</p></details>
                        <details className="faq-item"><summary>Q42. Is a business plan required?</summary><p>Yes, RBI evaluates future operations.</p></details>
                        <details className="faq-item"><summary>Q43. Are audited financials mandatory?</summary><p>Yes, for due diligence.</p></details>
                        <details className="faq-item"><summary>Q44. Is bank statement required?</summary><p>Yes, to assess financial capability.</p></details>
                        <details className="faq-item"><summary>Q45. Is board resolution needed?</summary><p>Yes, for approving acquisition.</p></details>
                        <details className="faq-item"><summary>Q46. Is a net worth certificate required?</summary><p>Yes, certified by a CA.</p></details>
                        <details className="faq-item"><summary>Q47. Are director DIN and DSC required?</summary><p>Yes, mandatory for filings.</p></details>
                        <details className="faq-item"><summary>Q48. Is legal due diligence report required?</summary><p>Yes, highly recommended.</p></details>
                        <details className="faq-item"><summary>Q49. Are past RBI filings reviewed?</summary><p>Yes, to ensure compliance history.</p></details>
                        <details className="faq-item"><summary>Q50. Is GST registration required?</summary><p>Depends on business operations.</p></details>
                    </div>
                    <h3>Section 5: Fees &amp; Cost</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q51. What is the cost of buying an NBFC?</summary><p>It ranges from ₹50 lakh to ₹2 crore depending on type and compliance.</p></details>
                        <details className="faq-item"><summary>Q52. Why are NBFCs expensive?</summary><p>Due to regulatory approvals and capital requirements.</p></details>
                        <details className="faq-item"><summary>Q53. Are there professional fees involved?</summary><p>Yes: Legal fees, CA/CS fees, Advisory charges.</p></details>
                        <details className="faq-item"><summary>Q54. Is stamp duty applicable?</summary><p>Yes, on share transfer.</p></details>
                        <details className="faq-item"><summary>Q55. Are RBI fees applicable?</summary><p>No direct fee, but compliance cost exists.</p></details>
                        <details className="faq-item"><summary>Q56. Is GST applicable on NBFC sale?</summary><p>Generally not on share transfer.</p></details>
                        <details className="faq-item"><summary>Q57. What affects NBFC pricing?</summary><p>Factors include: Clean compliance record, Capital base, Operational status.</p></details>
                        <details className="faq-item"><summary>Q58. Is dormant NBFC cheaper?</summary><p>Yes, comparatively.</p></details>
                        <details className="faq-item"><summary>Q59. Are hidden costs involved?</summary><p>Yes, including compliance and restructuring costs.</p></details>
                        <details className="faq-item"><summary>Q60. Can price be negotiated?</summary><p>Yes, based on due diligence findings.</p></details>
                    </div>
                    <h3>Section 6: Timeline &amp; Approval</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q61. How long does NBFC acquisition take?</summary><p>Typically 3–6 months.</p></details>
                        <details className="faq-item"><summary>Q62. What delays RBI approval?</summary><p>Common reasons: Incomplete documents, Weak financials.</p></details>
                        <details className="faq-item"><summary>Q63. Can the process be fast-tracked?</summary><p>Not officially; depends on compliance readiness.</p></details>
                        <details className="faq-item"><summary>Q64. When can operations begin?</summary><p>After RBI approval and ownership transfer.</p></details>
                        <details className="faq-item"><summary>Q65. Is there a validity period for approval?</summary><p>Yes, as per RBI communication.</p></details>
                    </div>
                    <h3>Section 7: Compliance &amp; Post-Registration</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q66. What compliance is required after acquisition?</summary><p>Includes: RBI returns, KYC norms, Audit compliance.</p></details>
                        <details className="faq-item"><summary>Q67. Is statutory audit mandatory?</summary><p>Yes, annually.</p></details>
                        <details className="faq-item"><summary>Q68. Are RBI returns compulsory?</summary><p>Yes, periodic filings are mandatory.</p></details>
                        <details className="faq-item"><summary>Q69. Can business model be changed?</summary><p>Yes, with RBI intimation/approval.</p></details>
                        <details className="faq-item"><summary>Q70. Is AML compliance required?</summary><p>Yes, under PMLA guidelines.</p></details>
                        <details className="faq-item"><summary>Q81. Is it mandatory to appoint a compliance officer in an NBFC?</summary><p>Yes, as per regulatory expectations, NBFCs must ensure compliance oversight. Typically includes: Compliance officer or designated official, Internal control systems.</p></details>
                        <details className="faq-item"><summary>Q82. Are KYC norms mandatory for NBFC operations?</summary><p>Yes, strict KYC and customer due diligence is required under PMLA guidelines.</p></details>
                        <details className="faq-item"><summary>Q83. Is internal audit required for NBFCs?</summary><p>Yes, internal audit helps ensure ongoing regulatory compliance and risk management.</p></details>
                        <details className="faq-item"><summary>Q84. What are RBI reporting requirements after acquisition?</summary><p>NBFCs must file: NBS returns, Statutory filings, Annual compliance reports.</p></details>
                        <details className="faq-item"><summary>Q85. Can NBFC outsource operations after acquisition?</summary><p>Yes, but outsourcing must comply with RBI outsourcing guidelines.</p></details>
                        <details className="faq-item"><summary>Q86. Is data protection compliance required for NBFCs?</summary><p>Yes, especially for digital lending, data privacy and security norms must be followed.</p></details>
                        <details className="faq-item"><summary>Q87. Are board meetings mandatory post-acquisition?</summary><p>Yes, as per Companies Act and governance norms.</p></details>
                        <details className="faq-item"><summary>Q88. Can NBFC change its registered office after acquisition?</summary><p>Yes, with ROC filing and RBI intimation.</p></details>
                        <details className="faq-item"><summary>Q89. Is credit policy mandatory for NBFCs?</summary><p>Yes, NBFC must define lending and risk policies.</p></details>
                        <details className="faq-item"><summary>Q90. Can NBFC engage in multiple financial activities?</summary><p>Yes, within the scope of its registration and RBI guidelines.</p></details>
                    </div>
                    <h3>Section 8: Penalties &amp; Risks</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q71. What happens if NBFC operates without RBI approval?</summary><p>It is illegal and may lead to heavy penalties.</p></details>
                        <details className="faq-item"><summary>Q72. What are risks in buying NBFC?</summary><p>Key risks include: Hidden liabilities, Non-compliance.</p></details>
                        <details className="faq-item"><summary>Q73. Can RBI cancel NBFC licence?</summary><p>Yes, for violations.</p></details>
                        <details className="faq-item"><summary>Q74. Is due diligence mandatory?</summary><p>Not legally mandatory but critical.</p></details>
                        <details className="faq-item"><summary>Q91. What happens if RBI approval is not obtained before acquisition?</summary><p>The transaction becomes invalid and may attract regulatory penalties.</p></details>
                        <details className="faq-item"><summary>Q92. Can directors be penalised for non-compliance?</summary><p>Yes, directors may face: Monetary penalties, Disqualification risks.</p></details>
                        <details className="faq-item"><summary>Q93. What are the risks of buying a non-compliant NBFC?</summary><p>Major risks include: Licence cancellation, Legal liabilities.</p></details>
                        <details className="faq-item"><summary>Q94. What happens if NBFC fails to meet capital requirements?</summary><p>RBI may impose restrictions or cancel registration.</p></details>
                        <details className="faq-item"><summary>Q95. Is there a penalty for non-filing of RBI returns?</summary><p>Yes, penalties and compliance actions may be imposed.</p></details>
                        <details className="faq-item"><summary>Q96. Can RBI inspect NBFC after acquisition?</summary><p>Yes, RBI can conduct inspections at any time.</p></details>
                        <details className="faq-item"><summary>Q97. What happens if NBFC violates KYC norms?</summary><p>It may attract penalties under PMLA and RBI regulations.</p></details>
                        <details className="faq-item"><summary>Q98. Can NBFC be blacklisted?</summary><p>Yes, in severe cases of non-compliance.</p></details>
                        <details className="faq-item"><summary>Q99. What are risks in undervaluing NBFC during acquisition?</summary><p>It may raise tax and regulatory scrutiny.</p></details>
                        <details className="faq-item"><summary>Q100. Is it risky to buy NBFC without legal verification?</summary><p>Yes, it may expose buyers to hidden liabilities and compliance breaches.</p></details>
                    </div>
                    <h3>Section 9: Practical Scenarios</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q75. Can I use NBFC for fintech lending?</summary><p>Yes, widely used model.</p></details>
                        <details className="faq-item"><summary>Q76. Can NBFC lend without physical branch?</summary><p>Yes, digital lending is allowed.</p></details>
                        <details className="faq-item"><summary>Q77. Can NBFC accept deposits?</summary><p>Only if specifically licensed.</p></details>
                        <details className="faq-item"><summary>Q101. Can I buy an NBFC and later change its business model?</summary><p>Yes, but RBI intimation or approval may be required depending on changes.</p></details>
                        <details className="faq-item"><summary>Q102. Can NBFC be used for personal lending business?</summary><p>Yes, subject to RBI lending norms and policies.</p></details>
                        <details className="faq-item"><summary>Q103. Can NBFC operate fully digitally?</summary><p>Yes, digital lending is permitted under RBI guidelines.</p></details>
                        <details className="faq-item"><summary>Q104. Can NBFC issue loans without collateral?</summary><p>Yes, unsecured lending is allowed based on risk assessment.</p></details>
                        <details className="faq-item"><summary>Q105. Can NBFC partner with fintech companies?</summary><p>Yes, through co-lending or digital partnerships.</p></details>
                        <details className="faq-item"><summary>Q106. Can NBFC acquire another NBFC?</summary><p>Yes, subject to RBI approval.</p></details>
                        <details className="faq-item"><summary>Q107. Can NBFC operate across India?</summary><p>Yes, NBFCs can operate nationwide.</p></details>
                        <details className="faq-item"><summary>Q108. Can NBFC provide business loans to MSMEs?</summary><p>Yes, it is one of the primary activities.</p></details>
                        <details className="faq-item"><summary>Q109. Can NBFC finance vehicle loans?</summary><p>Yes, vehicle financing is a common NBFC activity.</p></details>
                        <details className="faq-item"><summary>Q110. Can NBFC provide EMI-based consumer loans?</summary><p>Yes, subject to compliance with lending guidelines.</p></details>
                        <details className="faq-item"><summary>Q111. Can NBFC work with e-commerce platforms?</summary><p>Yes, for consumer financing and BNPL models.</p></details>
                        <details className="faq-item"><summary>Q112. Can NBFC issue credit cards?</summary><p>Only with RBI approval and partnership with banks.</p></details>
                        <details className="faq-item"><summary>Q113. Can NBFC raise funds from banks?</summary><p>Yes, through borrowing or credit lines.</p></details>
                        <details className="faq-item"><summary>Q114. Can NBFC lend to group companies?</summary><p>Yes, within exposure norms.</p></details>
                        <details className="faq-item"><summary>Q115. Can NBFC be used for startup funding?</summary><p>Yes, through structured lending models.</p></details>
                    </div>
                    <h3>Section 10: Advanced / Expert-Level Questions</h3>
                    <div className="faq-accordion">
                        <details className="faq-item"><summary>Q78. Can NBFC be converted into bank?</summary><p>Yes, subject to RBI approval and strict conditions.</p></details>
                        <details className="faq-item"><summary>Q79. Can NBFC raise foreign funding?</summary><p>Yes, under FEMA norms.</p></details>
                        <details className="faq-item"><summary>Q80. Can NBFC do co-lending?</summary><p>Yes, with banks/NBFCs under RBI guidelines.</p></details>
                        <details className="faq-item"><summary>Q116. What is the RBI approval threshold for change in shareholding?</summary><p>Any substantial change in ownership or control requires prior RBI approval.</p></details>
                        <details className="faq-item"><summary>Q117. Can NBFC be converted into a Core Investment Company (CIC)?</summary><p>Yes, subject to RBI conditions and business restructuring.</p></details>
                        <details className="faq-item"><summary>Q118. What is the role of NOF in NBFC acquisition?</summary><p>Net Owned Fund ensures financial strength and regulatory eligibility.</p></details>
                        <details className="faq-item"><summary>Q119. Can NBFC undertake cross-border lending?</summary><p>Yes, subject to FEMA and RBI guidelines.</p></details>
                        <details className="faq-item"><summary>Q120. Can NBFC issue debentures after acquisition?</summary><p>Yes, through compliant issuance structures.</p></details>
                        <details className="faq-item"><summary>Q121. Is it mandatory to maintain capital adequacy ratio?</summary><p>Yes, NBFCs must comply with CRAR norms.</p></details>
                        <details className="faq-item"><summary>Q122. Can NBFC securitise its loan portfolio?</summary><p>Yes, as per RBI securitisation guidelines.</p></details>
                        <details className="faq-item"><summary>Q123. What are prudential norms applicable to NBFCs?</summary><p>Includes: Income recognition, Asset classification, Provisioning norms.</p></details>
                        <details className="faq-item"><summary>Q124. Can NBFC engage in co-lending with banks?</summary><p>Yes, under RBI co-lending framework.</p></details>
                        <details className="faq-item"><summary>Q125. Can NBFC undertake factoring business?</summary><p>Yes, with proper registration.</p></details>
                        <details className="faq-item"><summary>Q126. What is leverage ratio in NBFC context?</summary><p>It defines borrowing limits based on capital.</p></details>
                        <details className="faq-item"><summary>Q127. Can NBFC issue commercial papers?</summary><p>Yes, subject to eligibility.</p></details>
                        <details className="faq-item"><summary>Q128. Can NBFC convert into Small Finance Bank?</summary><p>Yes, subject to RBI licensing norms.</p></details>
                        <details className="faq-item"><summary>Q129. What are corporate governance requirements for NBFCs?</summary><p>Includes: Independent directors, Audit committees.</p></details>
                        <details className="faq-item"><summary>Q130. Can NBFC accept public deposits after acquisition?</summary><p>Only if it holds deposit-taking licence.</p></details>
                        <details className="faq-item"><summary>Q131. Can NBFC list on stock exchange?</summary><p>Yes, subject to SEBI and RBI norms.</p></details>
                        <details className="faq-item"><summary>Q132. Can NBFC be wound up voluntarily?</summary><p>Yes, with RBI and NCLT procedures.</p></details>
                        <details className="faq-item"><summary>Q133. What is risk-based supervision in NBFCs?</summary><p>RBI monitors NBFCs based on risk profile.</p></details>
                        <details className="faq-item"><summary>Q134. Can NBFC use FLDG model in fintech?</summary><p>Yes, subject to RBI digital lending guidelines.</p></details>
                        <details className="faq-item"><summary>Q135. Can NBFC outsource loan recovery?</summary><p>Yes, but must follow RBI fair practices code.</p></details>
                        <details className="faq-item"><summary>Q136. What is Fair Practices Code for NBFCs?</summary><p>It ensures ethical lending and transparency.</p></details>
                        <details className="faq-item"><summary>Q137. Can NBFC use AI for credit assessment?</summary><p>Yes, provided data privacy norms are followed.</p></details>
                        <details className="faq-item"><summary>Q138. What is regulatory reporting frequency for NBFCs?</summary><p>Monthly, quarterly, and annual filings.</p></details>
                        <details className="faq-item"><summary>Q139. Can NBFC provide gold loans?</summary><p>Yes, under secured lending norms.</p></details>
                        <details className="faq-item"><summary>Q140. Can NBFC operate internationally?</summary><p>Limited, subject to FEMA compliance.</p></details>
                        <details className="faq-item"><summary>Q141. Can NBFC merge with a bank?</summary><p>Yes, subject to regulatory approvals.</p></details>
                        <details className="faq-item"><summary>Q142. What is stress testing in NBFCs?</summary><p>It assesses financial resilience.</p></details>
                        <details className="faq-item"><summary>Q143. Can NBFC invest in AIFs?</summary><p>Yes, subject to RBI exposure norms.</p></details>
                        <details className="faq-item"><summary>Q144. Can NBFC undertake leasing business?</summary><p>Yes, leasing is permitted activity.</p></details>
                        <details className="faq-item"><summary>Q145. What is liquidity risk management in NBFCs?</summary><p>It ensures adequate cash flow management.</p></details>
                        <details className="faq-item"><summary>Q146. Can NBFC issue prepaid instruments?</summary><p>Only with RBI authorisation.</p></details>
                        <details className="faq-item"><summary>Q147. What is scale-based regulation for NBFCs?</summary><p>RBI classifies NBFCs based on size and risk.</p></details>
                        <details className="faq-item"><summary>Q148. Can NBFC act as payment aggregator?</summary><p>Only with separate RBI licence.</p></details>
                        <details className="faq-item"><summary>Q149. What is ICAAP for NBFCs?</summary><p>Internal Capital Adequacy Assessment Process for risk evaluation.</p></details>
                        <details className="faq-item"><summary>Q150. Can NBFC be used for structured finance deals?</summary><p>Yes, NBFCs are widely used for structured lending and financial engineering.</p></details>
                    </div>
                </div>
            </section>
        </ServicePageLayout>
    );
}
