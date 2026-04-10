"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What Is" },
        { id: "regulatory-framework", title: "3. Regulatory Framework" },
        { id: "who-needs", title: "4. Who Needs" },
        { id: "eligibility", title: "5. Eligibility Criteria" },
        { id: "documents", title: "6. Documents Required" },
        { id: "process", title: "7. Step-by-Step Process" },
        { id: "methodologies", title: "8. Valuation Methodologies" },
        { id: "fees", title: "9. Fees Structure" },
        { id: "timeline", title: "10. Timeline" },
        { id: "compliance", title: "11. Post-Registration / Ongoing Compliance" },
        { id: "mistakes", title: "12. Common Mistakes to Avoid" },
        { id: "why-professional", title: "13. Why Professional Support Matters" },
        { id: "asset-wise", title: "14. Asset-Wise Valuation Approach" },
        { id: "valuation-frequency", title: "15. Valuation Frequency" },
        { id: "key-principles", title: "16. Key Valuation Principles" },
        { id: "risk-areas", title: "17. Risk Areas" },
        { id: "valuation-vs-accounting", title: "18. Valuation vs Accounting" },
        { id: "practical-challenges", title: "19. Common Practical Challenges" },
        { id: "compliance-checklist", title: "20. Compliance Checklist" },
        { id: "fund-lifecycle", title: "21. Valuation in Fund Lifecycle" },
        { id: "regulatory-trend", title: "22. Regulatory Trend" },
        { id: "valuation-policy", title: "23. Key Components of Valuation Policy" },
        { id: "audit-due-diligence", title: "24. Audit & Due Diligence" },
        { id: "investor-reporting", title: "25. Investor Reporting" },
        { id: "tax-legal", title: "26. Tax & Legal Implications" },
        { id: "advanced-techniques", title: "27. Advanced Valuation Techniques" },
        { id: "faq", title: "28. FAQs" },
    ];

    const quickFacts = [
        { label: "Regulator", value: "SEBI" },
        { label: "Type", value: "Portfolio Valuation" },
        { label: "Timeline", value: "10-20 days" },
        { label: "Updated", value: "2026" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "Q1. What is Alternative Asset Portfolio Valuation?", a: "It is the process of determining the fair value of non-listed or illiquid investments. It uses recognised valuation methods and regulatory guidelines." },
        { q: "Q2. What are alternative assets?", a: "Alternative assets include: Private equity, Venture capital, Real estate, Structured debt, Hedge funds" },
        { q: "Q3. Why is valuation required for alternative assets?", a: "It is required to ensure accurate reporting, investor transparency, and regulatory compliance under applicable frameworks." },
        { q: "Q4. Is valuation mandatory in India?", a: "Yes, for regulated entities like AIFs and NBFCs, valuation is mandatory as per applicable regulations." },
        { q: "Q5. What is fair value in valuation?", a: "Fair value is the price at which an asset can be exchanged between willing parties under normal conditions." },
        { q: "Q6. Who performs asset valuation?", a: "Valuation is done by: Registered valuers, Independent professionals, SEBI-approved entities" },
        { q: "Q7. What is NAV in alternative assets?", a: "NAV (Net Asset Value) represents the total value of assets minus liabilities." },
        { q: "Q8. How is valuation different from pricing?", a: "Valuation is estimated value, whereas pricing is the actual transaction value." },
        { q: "Q9. What is illiquid asset valuation?", a: "It is valuation of assets without active market prices using financial models and assumptions." },
        { q: "Q10. Why are alternative assets difficult to value?", a: "Due to lack of market data, high subjectivity, and dependence on projections." },
        { q: "Q11. Who needs Alternative Asset Portfolio Valuation?", a: "Entities include: AIFs, NBFCs, Portfolio managers, Family offices" },
        { q: "Q12. Is valuation required for startups?", a: "Yes, especially during fundraising, ESOP issuance, and compliance reporting." },
        { q: "Q13. Do AIFs require valuation?", a: "Yes, as per SEBI AIF Regulations, periodic valuation is mandatory." },
        { q: "Q14. Are NBFCs required to value portfolios?", a: "Yes, as per RBI guidelines for financial reporting and risk assessment." },
        { q: "Q15. Is valuation needed for unlisted shares?", a: "Yes, for tax, compliance, and investment purposes." },
        { q: "Q16. Can individuals require valuation?", a: "Yes, especially HNIs and family offices managing alternative assets." },
        { q: "Q17. Is valuation required for ESOP?", a: "Yes, for pricing and accounting purposes under Companies Act and accounting standards." },
        { q: "Q18. Do IFSC entities require valuation?", a: "Yes, under IFSCA regulations for fund management entities." },
        { q: "Q19. Is valuation required during fundraising?", a: "Yes, it determines entry price and investor shareholding." },
        { q: "Q20. Is valuation needed for mergers?", a: "Yes, under Companies Act provisions." },
        { q: "Q21. What is the process of portfolio valuation?", a: "Key steps include: Asset identification, Data collection, Method selection, Valuation calculation." },
        { q: "Q22. Is appointment of valuer mandatory?", a: "Yes, in many cases independent valuation is required as per regulations." },
        { q: "Q23. How to select valuation method?", a: "Based on asset type, data availability, and regulatory guidance." },
        { q: "Q24. What documents are reviewed in valuation?", a: "Financials, agreements, projections, and market data." },
        { q: "Q25. How is DCF method applied?", a: "Future cash flows are estimated and discounted to present value." },
        { q: "Q26. What is comparable method?", a: "Valuation based on similar companies or transactions." },
        { q: "Q27. What is NAV method?", a: "It calculates value based on assets minus liabilities." },
        { q: "Q28. Can multiple methods be used?", a: "Yes, triangulation is often used for accuracy." },
        { q: "Q29. Is management involved in valuation?", a: "Yes, but independent validation is required." },
        { q: "Q30. Is valuation report mandatory?", a: "Yes, documentation is required for audit and compliance." },
        { q: "Q31. What documents are required for valuation?", a: "Key documents include: Financial statements, Shareholding structure, Agreements" },
        { q: "Q32. Are projections required?", a: "Yes, especially for DCF-based valuation." },
        { q: "Q33. Is audited financial data required?", a: "Yes, for accuracy and credibility." },
        { q: "Q34. What legal documents are needed?", a: "Shareholder agreements, contracts, and term sheets." },
        { q: "Q35. Is market data required?", a: "Yes, for benchmarking and comparables." },
        { q: "Q36. What is the cost of valuation in India?", a: "It ranges from Rs.50,000 to Rs.10,00,000+ depending on complexity." },
        { q: "Q37. What factors affect valuation cost?", a: "Asset complexity, Data availability, Scope of work" },
        { q: "Q38. Is independent valuer expensive?", a: "Yes, but necessary for compliance and credibility." },
        { q: "Q39. Can valuation be done internally to save cost?", a: "Allowed in limited cases, but independent valuation is preferred." },
        { q: "Q40. How long does valuation take?", a: "Typically 10–20 days depending on data availability." },
        { q: "Q41. Can valuation be done urgently?", a: "Yes, with complete data, timelines can be reduced." },
        { q: "Q42. What delays valuation?", a: "Incomplete data, Complex assets, Multiple stakeholders" },
        { q: "Q43. Is periodic valuation required?", a: "Yes, as per regulatory guidelines." },
        { q: "Q44. What is valuation frequency for AIF?", a: "Quarterly or annually depending on category." },
        { q: "Q45. Is disclosure to investors mandatory?", a: "Yes, NAV and valuation details must be shared." },
        { q: "Q46. Is valuation audited?", a: "Yes, during statutory audits or regulatory checks." },
        { q: "Q47. What happens if valuation is incorrect?", a: "It may lead to: Regulatory penalties, Investor disputes, Audit qualification" },
        { q: "Q48. Can SEBI penalise incorrect valuation?", a: "Yes, under applicable provisions." },
        { q: "Q49. What is the risk of overvaluation?", a: "Misleading investors and regulatory scrutiny." },
        { q: "Q50. What happens if startup valuation drops?", a: "Valuation must be revised downward based on updated data." },
        { q: "Q51. Can valuation change without transaction?", a: "Yes, based on financial performance or market conditions." },
        { q: "Q52. What is portfolio valuation in simple terms?", a: "It is the process of calculating the total value of all investments held in a portfolio using appropriate valuation methods." },
        { q: "Q53. What is mark-to-market valuation?", a: "It means valuing assets based on current market prices. It is applicable mainly for listed or liquid assets." },
        { q: "Q54. What is mark-to-model valuation?", a: "It is valuation based on financial models like DCF when no market price is available." },
        { q: "Q55. What is intrinsic value?", a: "It is the true economic value of an asset based on its fundamentals and future earnings potential." },
        { q: "Q56. What is book value vs fair value?", a: "Book value: Value as per accounting records. Fair value: Current market-based estimate" },
        { q: "Q57. Is valuation subjective?", a: "Yes, it involves assumptions and estimates, especially for illiquid assets." },
        { q: "Q58. What is valuation report?", a: "It is a formal document detailing methodology, assumptions, and final value." },
        { q: "Q59. What is valuation policy?", a: "It is an internal framework defining how valuation is conducted and reviewed." },
        { q: "Q60. What is enterprise value?", a: "Total value of business including debt and equity." },
        { q: "Q61. What is equity value?", a: "Value attributable to shareholders after deducting liabilities." },
        { q: "Q62. Is valuation required for foreign investments?", a: "Yes, especially under FEMA and transfer pricing regulations." },
        { q: "Q63. Do LLPs require valuation?", a: "Yes, for partner admission, exit, or restructuring." },
        { q: "Q64. Is valuation required for convertible instruments?", a: "Yes, particularly for CCPS, CCD, and hybrid securities." },
        { q: "Q65. Is valuation needed for buyback of shares?", a: "Yes, as per Companies Act and SEBI regulations." },
        { q: "Q66. Do mutual funds require valuation?", a: "Yes, daily NAV calculation is mandatory." },
        { q: "Q67. Is valuation needed for debt funds?", a: "Yes, based on yield and credit risk." },
        { q: "Q68. Do foreign funds require valuation in India?", a: "Yes, if they invest in Indian assets." },
        { q: "Q69. Is valuation required for restructuring?", a: "Yes, for fair allocation and compliance." },
        { q: "Q70. Do family offices need valuation?", a: "Yes, for wealth reporting and decision-making." },
        { q: "Q71. Is valuation required for insolvency cases?", a: "Yes, under IBC regulations." },
        { q: "Q72. Do startups need periodic valuation?", a: "Yes, especially for investor reporting." },
        { q: "Q73. Is valuation required for ESOP exercise?", a: "Yes, to determine exercise price." },
        { q: "Q74. Can valuation be avoided?", a: "No, if regulatory or transaction-driven requirement exists." },
        { q: "Q75. Is valuation required for gift transactions?", a: "Yes, under Income Tax rules." },
        { q: "Q76. Do trusts require valuation?", a: "Yes, for asset reporting and compliance." },
        { q: "Q77. What is first step in valuation process?", a: "Identification of asset class and purpose of valuation." },
        { q: "Q78. How is data collected for valuation?", a: "Through financial records, agreements, and market research." },
        { q: "Q79. What is role of assumptions in valuation?", a: "They form the base for projections and impact final value." },
        { q: "Q80. What is sensitivity analysis?", a: "It checks how changes in assumptions affect valuation." },
        { q: "Q81. What is scenario analysis?", a: "It evaluates multiple business outcomes like best and worst cases." },
        { q: "Q82. Is valuation a one-time process?", a: "No, it is periodic and event-driven." },
        { q: "Q83. Can valuation be automated?", a: "Partially, but expert judgment is still required." },
        { q: "Q84. What is valuation committee?", a: "Internal body overseeing valuation decisions and governance." },
        { q: "Q85. Is board approval required for valuation?", a: "In certain cases like mergers or share issuance, yes." },
        { q: "Q86. What is role of auditors in valuation?", a: "They review valuation assumptions and compliance." },
        { q: "Q87. Can valuation be revised?", a: "Yes, based on updated financials or market conditions." },
        { q: "Q88. What is valuation checkpoint?", a: "Periodic review of valuation assumptions." },
        { q: "Q89. What is benchmarking in valuation?", a: "Comparing with similar companies or assets." },
        { q: "Q90. Is valuation required before fundraising?", a: "Yes, to determine investor entry price." },
        { q: "Q91. Can valuation differ between methods?", a: "Yes, hence multiple methods are often used." },
        { q: "Q92. Are projections mandatory for valuation?", a: "Yes, especially for DCF method." },
        { q: "Q93. What financial data is required?", a: "Revenue, EBITDA, Cash flows" },
        { q: "Q94. Are agreements important in valuation?", a: "Yes, they define rights and obligations affecting value." },
        { q: "Q95. What is importance of cap table?", a: "It shows ownership structure." },
        { q: "Q96. Are legal compliances reviewed?", a: "Yes, for risk assessment." },
        { q: "Q97. What is role of due diligence?", a: "It validates data before valuation." },
        { q: "Q98. Is industry analysis required?", a: "Yes, for benchmarking." },
        { q: "Q99. Are historical financials important?", a: "Yes, for trend analysis." },
        { q: "Q100. Is market research needed?", a: "Yes, to support valuation assumptions." },
        { q: "Q101. What is importance of audit trail?", a: "It ensures transparency and compliance." },
        { q: "Q102. Is valuation documentation mandatory?", a: "Yes, for audit and regulatory review." },
        { q: "Q103. Can incomplete documents affect valuation?", a: "Yes, it may lead to inaccurate results." },
        { q: "Q104. Is confidentiality required in valuation?", a: "Yes, sensitive financial data is involved." },
        { q: "Q105. Are third-party reports used?", a: "Yes, for additional validation." },
        { q: "Q106. What determines valuation fees?", a: "Complexity, Asset size, Scope" },
        { q: "Q107. Are fees fixed or variable?", a: "Mostly variable based on project." },
        { q: "Q108. Is high valuation cost justified?", a: "Yes, for compliance and accuracy." },
        { q: "Q109. Can startups negotiate valuation fees?", a: "Yes, depending on scope." },
        { q: "Q110. Is valuation cost tax deductible?", a: "In some cases, yes as business expense." },
        { q: "Q111. Are recurring valuation costs high?", a: "Yes, due to periodic compliance." },
        { q: "Q112. What is cost for AIF valuation?", a: "Typically higher due to complexity." },
        { q: "Q113. Is independent valuer mandatory cost?", a: "Yes, in many regulated cases." },
        { q: "Q114. Are advisory fees separate?", a: "Yes, valuation and advisory are different." },
        { q: "Q115. Can internal team reduce cost?", a: "Yes, but independent validation is still needed." },
        { q: "Q116. What is ideal timeline for valuation?", a: "10–20 working days." },
        { q: "Q117. Can valuation be delayed?", a: "Yes, due to data or complexity issues." },
        { q: "Q118. What speeds up valuation?", a: "Complete documentation and clarity." },
        { q: "Q119. Is approval required from regulator?", a: "Not always, but compliance must be ensured." },
        { q: "Q120. Can valuation be done monthly?", a: "Yes, for high-frequency portfolios." },
        { q: "Q121. Is real-time valuation possible?", a: "Limited, mostly for liquid assets." },
        { q: "Q122. What is turnaround time for urgent valuation?", a: "3–7 days with complete data." },
        { q: "Q123. Is revaluation time-consuming?", a: "Depends on scope and changes." },
        { q: "Q124. Can valuation be done parallel for multiple assets?", a: "Yes, with structured process." },
        { q: "Q125. What delays valuation approval?", a: "Incomplete data or audit queries." },
        { q: "Q126. Is valuation policy mandatory?", a: "Yes, for regulated entities." },
        { q: "Q127. What is compliance requirement after valuation?", a: "Disclosure, Record maintenance, Audit support" },
        { q: "Q128. Is NAV disclosure mandatory?", a: "Yes, for AIFs and funds." },
        { q: "Q129. Is valuation reviewed by regulators?", a: "Yes, during inspections." },
        { q: "Q130. Is periodic reporting required?", a: "Yes, as per regulatory norms." },
        { q: "Q131. Is valuation part of audit?", a: "Yes, financial audits include valuation checks." },
        { q: "Q132. Can valuation affect investor trust?", a: "Yes, significantly." },
        { q: "Q133. Is compliance documentation required?", a: "Yes, for regulatory review." },
        { q: "Q134. What is role of compliance officer?", a: "Ensures adherence to valuation norms." },
        { q: "Q135. Is valuation linked to governance?", a: "Yes, it reflects transparency." },
        { q: "Q136. Can valuation impact fundraising?", a: "Yes, it affects investor decisions." },
        { q: "Q137. Is valuation disclosed publicly?", a: "Depends on structure and regulation." },
        { q: "Q138. What is audit trail in valuation?", a: "Record of assumptions and decisions." },
        { q: "Q139. Is valuation monitored continuously?", a: "Yes, in active portfolios." },
        { q: "Q140. Is regulator scrutiny increasing?", a: "Yes, significantly in recent years." },
        { q: "Q141. What happens if valuation is manipulated?", a: "It may lead to penalties, legal action, and reputational damage." },
        { q: "Q142. Can incorrect valuation attract penalty?", a: "Yes, under SEBI, RBI, or Companies Act provisions." },
        { q: "Q143. What is risk of undervaluation?", a: "Loss to investors and unfair transactions." },
        { q: "Q144. What is risk of overvaluation?", a: "Misleading investors and regulatory action." },
        { q: "Q145. Can valuation errors lead to audit qualification?", a: "Yes, auditors may flag inconsistencies." },
        { q: "Q146. What happens if valuation is not documented?", a: "It may fail audit and regulatory review." },
        { q: "Q147. Is non-compliance penalised?", a: "Yes, under applicable regulatory guidelines." },
        { q: "Q148. Can valuation lead to litigation?", a: "Yes, especially in investor disputes." },
        { q: "Q149. What is biggest valuation risk?", a: "Lack of transparency and documentation." },
        { q: "Q150. How to avoid valuation risks?", a: "Use proper methodology, Maintain documentation, Ensure independent review" },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "\ud83d\udcc8", label: "SEBI" }, { emoji: "\ud83d\udccb", label: "Complete Guide" }, { emoji: "\u2705", label: "Expert Reviewed" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "SEBI Services", href: "/sebi" }, { label: "Alternative Asset Portfolio Valuation" }]}
            title="Alternative Asset Portfolio Valuation – 15 Powerful & Essential Insights for Accurate Compliance"
            readTime="25 min read"
            focusKeyword="Alternative Asset Portfolio Valuation"
            sections={sections}
            ctaTitle="Need Expert Help with Alternative Asset Portfolio Valuation?"
            ctaDescription="Our regulatory compliance experts provide end-to-end guidance for Alternative Asset Portfolio Valuation."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for NBFC-AA." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services provider license guide." },
                { href: "/regulatory/finance-company-gift-ifsc", category: "IFSCA", title: "Finance Company GIFT IFSC", description: "Setting up a Finance Company in GIFT City." }
            ]}
            finalCtaTitle="Ready to Get Started with Alternative Asset Portfolio Valuation?"
            finalCtaDescription="Book a free consultation with our regulatory experts. We guide you through every step of the process."
        >
            {/* At-a-Glance Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, #0096D6 0%, #0077ab 100%)" }}>
                    <div className="text-3xl font-bold text-white">SEBI</div>
                    <div className="text-sm text-blue-100 mt-1">Regulator</div>
                </div>
                <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
                    <div className="text-3xl font-bold text-white">10-20</div>
                    <div className="text-sm text-green-100 mt-1">Days Timeline</div>
                </div>
                <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>
                    <div className="text-3xl font-bold text-white">6</div>
                    <div className="text-sm text-purple-100 mt-1">Methods</div>
                </div>
                <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
                    <div className="text-3xl font-bold text-white">150+</div>
                    <div className="text-sm text-yellow-100 mt-1">FAQs</div>
                </div>
            </div>

            {/* 1. Introduction */}
            <h2 id="introduction">1. Introduction</h2>
            <p>Alternative Asset Portfolio Valuation is a structured process of determining the fair value of non-traditional investments such as private equity, venture capital, real estate, debt instruments, and structured products, in accordance with applicable regulatory and accounting standards.</p>

            {/* 2. What Is */}
            <h2 id="what-is">2. What Is Alternative Asset Portfolio Valuation</h2>
            <p>In simple terms, Alternative Asset Portfolio Valuation refers to assessing the real worth of assets that do not have a readily available market price.</p>
            <p>From a compliance perspective, it ensures that financial statements, investor reporting, and fund disclosures reflect true and fair value.</p>
            <p>Legally speaking, valuation must align with regulatory frameworks such as SEBI (AIF) Regulations, Companies Act, and applicable accounting standards (Ind AS / IFRS).</p>

            {/* 3. Regulatory Framework */}
            <h2 id="regulatory-framework">3. Regulatory Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/50 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{"\ud83c\udfe6"}</div>
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">SEBI (AIF Regulations, 2012)</h4>
                    <p className="text-sm text-gray-600 !mb-0">Mandatory periodic valuation for Category I, II, and III AIFs. Independent valuer required for certain categories.</p>
                </div>
                <div className="border border-green-200 rounded-xl p-5 bg-green-50/50 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{"\ud83c\udfdb\ufe0f"}</div>
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">RBI Guidelines</h4>
                    <p className="text-sm text-gray-600 !mb-0">Applicable for NBFCs and banks holding structured or alternative assets.</p>
                </div>
                <div className="border border-purple-200 rounded-xl p-5 bg-purple-50/50 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{"\ud83d\udcdc"}</div>
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">Companies Act, 2013</h4>
                    <p className="text-sm text-gray-600 !mb-0">Valuation by Registered Valuer (Section 247).</p>
                </div>
                <div className="border border-orange-200 rounded-xl p-5 bg-orange-50/50 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{"\ud83d\udcca"}</div>
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">Ind AS / IFRS Standards</h4>
                    <p className="text-sm text-gray-600 !mb-0">Fair value measurement under Ind AS 113.</p>
                </div>
                <div className="border border-teal-200 rounded-xl p-5 bg-teal-50/50 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{"\ud83c\udf10"}</div>
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">IFSCA (for GIFT IFSC entities)</h4>
                    <p className="text-sm text-gray-600 !mb-0">Valuation norms for fund management entities.</p>
                </div>
            </div>
            <p className="text-sm text-gray-500 italic">As per applicable regulatory guidelines, valuation must be transparent, justifiable, and auditable.</p>

            {/* 4. Who Needs */}
            <h2 id="who-needs">4. Who Needs Alternative Asset Portfolio Valuation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                {[
                    { icon: "\ud83d\udcbc", label: "Alternative Investment Funds (AIFs)" },
                    { icon: "\ud83d\ude80", label: "Venture Capital Funds" },
                    { icon: "\ud83d\udcb0", label: "Private Equity Funds" },
                    { icon: "\ud83c\udfe2", label: "NBFCs holding structured assets" },
                    { icon: "\ud83d\udcc8", label: "Portfolio Managers" },
                    { icon: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66", label: "Family Offices and HNIs" },
                    { icon: "\ud83c\udfe0", label: "Real Estate Investment Structures" },
                    { icon: "\ud83c\udf10", label: "IFSC-based Fund Management Entities" },
                ].map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow bg-white">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-sm font-semibold text-[#0a1628]">{item.label}</div>
                    </div>
                ))}
            </div>

            {/* 5. Eligibility Criteria */}
            <h2 id="eligibility">5. Eligibility Criteria</h2>
            <div className="space-y-3 my-6">
                {[
                    { criteria: "Qualification", value: "Registered Valuer / Qualified professional" },
                    { criteria: "Registration", value: "Registered under Companies Act / SEBI norms" },
                    { criteria: "Independence", value: "Must be independent from fund/entity" },
                    { criteria: "Experience", value: "Relevant domain experience in valuation" },
                    { criteria: "Compliance", value: "Adherence to valuation standards" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 bg-white">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0096D6] text-white text-sm font-bold shrink-0">{"\u2713"}</span>
                        <div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white mr-2" style={{ backgroundColor: "#0a1628" }}>{item.criteria}</span>
                            <span className="text-sm text-gray-700">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 6. Documents Required */}
            <h2 id="documents">6. Documents Required</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                <div className="rounded-xl p-5 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-bold text-blue-800 text-sm mb-2">{"\ud83d\udcc4"} Investment Details</h4>
                    <p className="text-sm text-blue-700 !mb-0">Term sheets, agreements, shareholding structure</p>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-bold text-green-800 text-sm mb-2">{"\ud83d\udcca"} Financial Data</h4>
                    <p className="text-sm text-green-700 !mb-0">Audited financial statements</p>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-bold text-purple-800 text-sm mb-2">{"\u2696\ufe0f"} Legal Documents</h4>
                    <p className="text-sm text-purple-700 !mb-0">Shareholder agreements, covenants</p>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-bold text-orange-800 text-sm mb-2">{"\ud83c\udfe2"} Asset Information</h4>
                    <p className="text-sm text-orange-700 !mb-0">Details of underlying assets</p>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-teal-500 bg-teal-50">
                    <h4 className="font-bold text-teal-800 text-sm mb-2">{"\ud83d\udcc8"} Market Inputs</h4>
                    <p className="text-sm text-teal-700 !mb-0">Comparable data, industry benchmarks</p>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-indigo-500 bg-indigo-50">
                    <h4 className="font-bold text-indigo-800 text-sm mb-2">{"\ud83d\uddd2\ufe0f"} Valuation Reports</h4>
                    <p className="text-sm text-indigo-700 !mb-0">Previous valuation reports</p>
                </div>
            </div>

            {/* 7. Step-by-Step Process */}
            <h2 id="process">7. Step-by-Step Process</h2>
            <div className="relative my-8 pl-8">
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[#0096D6]"></div>
                {[
                    { step: 1, text: "Identify asset class and valuation requirement" },
                    { step: 2, text: "Appoint independent valuer (if required)" },
                    { step: 3, text: "Collect financial and legal documents" },
                    { step: 4, text: "Select appropriate valuation methodology" },
                    { step: 5, text: "Perform valuation analysis" },
                    { step: 6, text: "Prepare valuation report" },
                    { step: 7, text: "Disclose to stakeholders / regulator" },
                ].map((item, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                        <div className="absolute -left-8 w-8 h-8 rounded-full bg-[#0096D6] text-white flex items-center justify-center text-sm font-bold">{item.step}</div>
                        <div className="ml-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
                            <span className="text-xs font-bold text-[#0096D6] uppercase">Step {item.step}</span>
                            <p className="text-sm text-[#0a1628] font-medium mt-1 !mb-0">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 8. Valuation Methodologies */}
            <h2 id="methodologies">8. Valuation Methodologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {[
                    { title: "Discounted Cash Flow (DCF)", desc: "Projects future cash flows and discounts them to present value using an appropriate discount rate." },
                    { title: "Comparable Company Analysis", desc: "Values assets based on multiples derived from similar publicly traded companies." },
                    { title: "Net Asset Value (NAV)", desc: "Calculates the value of total assets minus total liabilities." },
                    { title: "Recent Transaction Value", desc: "Uses price from the most recent arm\u2019s length transaction involving the asset." },
                    { title: "Market Multiples", desc: "Applies industry-standard multiples (P/E, EV/EBITDA) to financial metrics." },
                    { title: "Yield-based Valuation", desc: "For debt assets – values instruments based on expected yield and credit risk." },
                ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5 border border-gray-200 bg-white hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-lg bg-[#0096D6]/10 flex items-center justify-center text-[#0096D6] font-bold text-lg mb-3">{i + 1}</div>
                        <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 !mb-0">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* 9. Fees Structure */}
            <h2 id="fees">9. Fees Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <div className="rounded-xl p-5 border border-gray-200 bg-white text-center">
                    <div className="text-xs font-bold text-[#0096D6] uppercase mb-2">Basic Valuation</div>
                    <div className="text-xl font-bold text-[#0a1628]">Rs.50,000 – Rs.2,00,000</div>
                </div>
                <div className="rounded-xl p-5 border border-gray-200 bg-white text-center">
                    <div className="text-xs font-bold text-[#0096D6] uppercase mb-2">Complex Portfolio</div>
                    <div className="text-xl font-bold text-[#0a1628]">Rs.2,00,000 – Rs.10,00,000+</div>
                </div>
                <div className="rounded-xl p-5 border border-gray-200 bg-white text-center">
                    <div className="text-xs font-bold text-[#0096D6] uppercase mb-2">Independent Valuer Fee</div>
                    <div className="text-xl font-bold text-[#0a1628]">Case-based</div>
                </div>
                <div className="rounded-xl p-5 border border-gray-200 bg-white text-center">
                    <div className="text-xs font-bold text-[#0096D6] uppercase mb-2">Advisory Support</div>
                    <div className="text-xl font-bold text-[#0a1628]">Additional</div>
                </div>
            </div>

            {/* 10. Timeline */}
            <h2 id="timeline">10. Timeline</h2>
            <div className="my-6 p-6 rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col md:flex-row items-stretch gap-0">
                    <div className="flex-1 text-center p-4">
                        <div className="text-xs font-bold text-[#0096D6] uppercase">Data Collection</div>
                        <div className="text-2xl font-bold text-[#0a1628] mt-1">3–7 days</div>
                    </div>
                    <div className="hidden md:flex items-center text-gray-300 text-2xl">{"\u2192"}</div>
                    <div className="flex-1 text-center p-4">
                        <div className="text-xs font-bold text-[#0096D6] uppercase">Valuation Analysis</div>
                        <div className="text-2xl font-bold text-[#0a1628] mt-1">5–10 days</div>
                    </div>
                    <div className="hidden md:flex items-center text-gray-300 text-2xl">{"\u2192"}</div>
                    <div className="flex-1 text-center p-4">
                        <div className="text-xs font-bold text-[#0096D6] uppercase">Report Preparation</div>
                        <div className="text-2xl font-bold text-[#0a1628] mt-1">3–5 days</div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <div className="inline-block px-6 py-3 rounded-full text-white font-bold" style={{ backgroundColor: "#0096D6" }}>Total Timeline: 10–20 days</div>
                </div>
            </div>

            {/* 11. Post-Registration / Ongoing Compliance */}
            <h2 id="compliance">11. Post-Registration / Ongoing Compliance</h2>
            <ul className="my-4 space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">{"\u2713"}</span> Periodic valuation (quarterly / annually)</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">{"\u2713"}</span> Disclosure to investors</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">{"\u2713"}</span> Audit verification</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">{"\u2713"}</span> Maintaining valuation documentation</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">{"\u2713"}</span> Regulatory reporting</li>
            </ul>

            {/* 12. Common Mistakes to Avoid */}
            <h2 id="mistakes">12. Common Mistakes to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {[
                    "Ignoring independent valuation requirements",
                    "Using outdated financial data",
                    "Applying incorrect valuation methodology",
                    "Lack of documentation support",
                    "Conflict of interest in valuation",
                    "Non-compliance with SEBI / RBI norms",
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50/50">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white text-sm font-bold shrink-0">{"\u26a0"}</span>
                        <span className="text-sm font-medium text-red-900">{item}</span>
                    </div>
                ))}
            </div>

            {/* 13. Why Professional Support Matters */}
            <h2 id="why-professional">13. Why Professional Support Matters</h2>
            <ul className="my-4 space-y-2">
                <li className="flex items-start gap-2"><span className="text-[#0096D6] mt-0.5">{"\u2713"}</span> Ensures regulatory compliance</li>
                <li className="flex items-start gap-2"><span className="text-[#0096D6] mt-0.5">{"\u2713"}</span> Avoids valuation disputes</li>
                <li className="flex items-start gap-2"><span className="text-[#0096D6] mt-0.5">{"\u2713"}</span> Improves investor confidence</li>
                <li className="flex items-start gap-2"><span className="text-[#0096D6] mt-0.5">{"\u2713"}</span> Aligns with audit expectations</li>
                <li className="flex items-start gap-2"><span className="text-[#0096D6] mt-0.5">{"\u2713"}</span> Reduces legal risk</li>
            </ul>
            <blockquote className="my-6 p-5 border-l-4 border-[#0096D6] bg-blue-50 rounded-r-xl italic text-gray-700">
                &ldquo;From a compliance perspective... Valuation is not just a technical exercise, it is closely linked with regulatory reporting, investor protection, taxation, and audit scrutiny.&rdquo;
            </blockquote>

            {/* 14. Asset-Wise Valuation Approach */}
            <h2 id="asset-wise">14. Asset-Wise Valuation Approach</h2>
            <div className="space-y-4 my-6">
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3">1. Private Equity / Unlisted Shares</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} DCF</li>
                        <li>{"\u2022"} Comparable Company Multiples</li>
                        <li>{"\u2022"} Recent funding round valuation</li>
                        <li>{"\u2022"} Adjustment for control premium / minority discount</li>
                    </ul>
                </div>
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3">2. Venture Capital Investments</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Scenario-based valuation</li>
                        <li>{"\u2022"} Probability-weighted return models</li>
                        <li>{"\u2022"} Stage-based valuation (Seed / Series A / Growth)</li>
                    </ul>
                </div>
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3">3. Real Estate Assets</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Income Capitalisation Method</li>
                        <li>{"\u2022"} Comparable Sales Method</li>
                        <li>{"\u2022"} Replacement Cost Method</li>
                    </ul>
                </div>
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3">4. Structured Debt / NBFC Portfolios</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Yield-based valuation</li>
                        <li>{"\u2022"} Discounted future cash flows</li>
                        <li>{"\u2022"} Credit risk-adjusted valuation</li>
                    </ul>
                </div>
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3">5. Distressed Assets</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Liquidation value</li>
                        <li>{"\u2022"} Recovery-based estimation</li>
                        <li>{"\u2022"} Legal enforceability factors</li>
                    </ul>
                </div>
            </div>

            {/* 15. Valuation Frequency */}
            <h2 id="valuation-frequency">15. Valuation Frequency</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table w-full">
                    <thead><tr><th className="text-left p-3 bg-[#0a1628] text-white">Entity Type</th><th className="text-left p-3 bg-[#0a1628] text-white">Frequency</th></tr></thead>
                    <tbody>
                        <tr className="border-b border-gray-100"><td className="p-3">Category I &amp; II AIF</td><td className="p-3">At least annually (often half-yearly)</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3">Category III AIF</td><td className="p-3">Quarterly</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3">NBFCs</td><td className="p-3">As per RBI / internal policy</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3">IFSC Funds</td><td className="p-3">As per IFSCA norms</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3">Portfolio Managers</td><td className="p-3">Periodic (client reporting basis)</td></tr>
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-gray-500 italic">According to governing regulations, frequency increases where liquidity risk or volatility is higher.</p>

            {/* 16. Key Valuation Principles */}
            <h2 id="key-principles">16. Key Valuation Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {[
                    { icon: "\u2696\ufe0f", title: "Fair Value Principle", desc: "True economic value" },
                    { icon: "\ud83d\udd04", title: "Consistency Principle", desc: "Same method over time" },
                    { icon: "\ud83d\udd0d", title: "Transparency Principle", desc: "Clear assumptions" },
                    { icon: "\ud83d\udee1\ufe0f", title: "Independence Principle", desc: "No conflict of interest" },
                    { icon: "\ud83c\udfaf", title: "Materiality Principle", desc: "Focus on significant assets" },
                ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5 border border-gray-200 bg-white text-center hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h4 className="font-bold text-[#0a1628] text-[15px] mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 !mb-0">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* 17. Risk Areas */}
            <h2 id="risk-areas">17. Risk Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="rounded-xl p-5 border-l-4 border-red-500 bg-red-50/50">
                    <h4 className="font-bold text-red-800 text-sm mb-3">Regulatory Risks</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                        <li>{"\u2022"} Non-compliance with SEBI AIF valuation norms</li>
                        <li>{"\u2022"} Incorrect disclosures to investors</li>
                        <li>{"\u2022"} Failure to appoint independent valuer</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-orange-500 bg-orange-50/50">
                    <h4 className="font-bold text-orange-800 text-sm mb-3">Financial Risks</h4>
                    <ul className="space-y-1 text-sm text-orange-700">
                        <li>{"\u2022"} Overvaluation leading to investor misrepresentation</li>
                        <li>{"\u2022"} Undervaluation affecting fundraising</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-yellow-500 bg-yellow-50/50">
                    <h4 className="font-bold text-yellow-800 text-sm mb-3">Audit Risks</h4>
                    <ul className="space-y-1 text-sm text-yellow-700">
                        <li>{"\u2022"} Qualification in audit report</li>
                        <li>{"\u2022"} Rejection of valuation assumptions</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border-l-4 border-red-400 bg-red-50/30">
                    <h4 className="font-bold text-red-700 text-sm mb-3">Litigation Risks</h4>
                    <ul className="space-y-1 text-sm text-red-600">
                        <li>{"\u2022"} Investor disputes</li>
                        <li>{"\u2022"} Exit pricing conflicts</li>
                    </ul>
                </div>
            </div>

            {/* 18. Valuation vs Accounting */}
            <h2 id="valuation-vs-accounting">18. Valuation vs Accounting</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-3 bg-[#0a1628] text-white">Particulars</th>
                            <th className="text-left p-3 bg-[#0096D6] text-white">Valuation</th>
                            <th className="text-left p-3 bg-[#10b981] text-white">Accounting</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">Objective</td><td className="p-3">Determine fair value</td><td className="p-3">Record financial transactions</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3 font-medium">Frequency</td><td className="p-3">Periodic</td><td className="p-3">Continuous</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">Flexibility</td><td className="p-3">Based on assumptions</td><td className="p-3">Based on standards</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3 font-medium">Regulator Focus</td><td className="p-3">High</td><td className="p-3">High</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">Subjectivity</td><td className="p-3">High</td><td className="p-3">Moderate</td></tr>
                    </tbody>
                </table>
            </div>

            {/* 19. Common Practical Challenges */}
            <h2 id="practical-challenges">19. Common Practical Challenges</h2>
            <ul className="my-4 space-y-2">
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">{"\u26a0"}</span> Lack of comparable market data</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">{"\u26a0"}</span> Subjectivity in projections</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">{"\u26a0"}</span> Dependency on management inputs</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">{"\u26a0"}</span> Illiquidity of assets</li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">{"\u26a0"}</span> Frequent regulatory updates</li>
            </ul>

            {/* 20. Compliance Checklist */}
            <h2 id="compliance-checklist">20. Compliance Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="rounded-xl p-5 border border-blue-200 bg-blue-50/50">
                    <h4 className="font-bold text-blue-800 text-sm mb-3">Before Valuation</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Identify applicable regulation</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Classify asset type</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Check independence requirement</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-purple-200 bg-purple-50/50">
                    <h4 className="font-bold text-purple-800 text-sm mb-3">During Valuation</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Select appropriate methodology</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Validate financial projections</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Document assumptions</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-green-200 bg-green-50/50">
                    <h4 className="font-bold text-green-800 text-sm mb-3">After Valuation</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Prepare detailed report</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Disclose to stakeholders</li>
                        <li className="flex items-start gap-2"><span className="text-green-500">{"\u2705"}</span> Maintain records for audit</li>
                    </ul>
                </div>
            </div>

            {/* 21. Valuation in Fund Lifecycle */}
            <h2 id="fund-lifecycle">21. Valuation in Fund Lifecycle</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                {[
                    { stage: "Entry", purpose: "Investment pricing" },
                    { stage: "Holding", purpose: "NAV reporting" },
                    { stage: "Exit", purpose: "Return calculation" },
                    { stage: "Fund Closure", purpose: "Final distribution" },
                ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5 border border-gray-200 bg-white text-center hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-[#0096D6] text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">{i + 1}</div>
                        <h4 className="font-bold text-[#0a1628] text-[15px] mb-1">{item.stage}</h4>
                        <p className="text-sm text-gray-600 !mb-0">{item.purpose}</p>
                    </div>
                ))}
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-gray-700 my-4">
                <strong>Note:</strong> Valuation = Estimated worth, Pricing = Actual transaction value. Both may differ depending on negotiation and market conditions.
            </div>

            {/* 22. Regulatory Trend */}
            <h2 id="regulatory-trend">22. Regulatory Trend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="rounded-xl p-5 border border-blue-200 bg-blue-50/50">
                    <h4 className="font-bold text-[#0a1628] text-sm mb-3">Current Direction in India</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-[#0096D6]">{"\u2192"}</span> Increased focus on independent valuation</li>
                        <li className="flex items-start gap-2"><span className="text-[#0096D6]">{"\u2192"}</span> Stricter disclosure norms</li>
                        <li className="flex items-start gap-2"><span className="text-[#0096D6]">{"\u2192"}</span> Greater audit scrutiny</li>
                        <li className="flex items-start gap-2"><span className="text-[#0096D6]">{"\u2192"}</span> Alignment with global standards (IFRS / Ind AS)</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-purple-200 bg-purple-50/50">
                    <h4 className="font-bold text-[#0a1628] text-sm mb-3">Future Outlook</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-purple-500">{"\u2192"}</span> AI-driven valuation models</li>
                        <li className="flex items-start gap-2"><span className="text-purple-500">{"\u2192"}</span> Real-time portfolio valuation</li>
                        <li className="flex items-start gap-2"><span className="text-purple-500">{"\u2192"}</span> Increased regulator intervention</li>
                        <li className="flex items-start gap-2"><span className="text-purple-500">{"\u2192"}</span> Standardisation across funds</li>
                    </ul>
                </div>
            </div>

            {/* 23. Key Components of Valuation Policy */}
            <h2 id="valuation-policy">23. Key Components of Valuation Policy</h2>
            <div className="space-y-6 my-6">
                {/* 23.1 Objective of Policy */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">1</span>Objective of Policy</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Ensure fair and transparent valuation</li>
                        <li>{"\u2022"} Align with regulatory requirements</li>
                        <li>{"\u2022"} Maintain consistency across reporting periods</li>
                    </ul>
                </div>

                {/* 23.2 Scope of Assets Covered */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">2</span>Scope of Assets Covered</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Equity investments</li>
                        <li>{"\u2022"} Debt instruments</li>
                        <li>{"\u2022"} Structured products</li>
                        <li>{"\u2022"} Real estate/infrastructure</li>
                        <li>{"\u2022"} Derivatives and hybrid instruments</li>
                    </ul>
                </div>

                {/* 23.3 Methodology Selection Framework */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">3</span>Methodology Selection Framework</h4>
                    <div className="overflow-x-auto mt-3">
                        <table className="data-table w-full text-sm">
                            <thead><tr><th className="text-left p-2 bg-[#0a1628] text-white">Asset Type</th><th className="text-left p-2 bg-[#0a1628] text-white">Methodology</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-100"><td className="p-2">Unlisted Equity</td><td className="p-2">DCF / Comparable Multiples</td></tr>
                                <tr className="border-b border-gray-100 bg-gray-50"><td className="p-2">Debt</td><td className="p-2">Yield-based / DCF</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-2">Real Estate</td><td className="p-2">Market / Income Approach</td></tr>
                                <tr className="border-b border-gray-100 bg-gray-50"><td className="p-2">Startups</td><td className="p-2">Scenario-based / VC method</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 23.4 Governance Structure */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">4</span>Governance Structure</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Valuation Committee</li>
                        <li>{"\u2022"} Role of Fund Manager/CFO</li>
                        <li>{"\u2022"} Independent Valuer involvement</li>
                        <li>{"\u2022"} Audit oversight</li>
                    </ul>
                </div>

                {/* 23.5 Frequency & Triggers */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">5</span>Frequency &amp; Triggers</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Scheduled (Quarterly/Annual)</li>
                        <li>{"\u2022"} Event-based (Fundraising, Exit transaction, Significant financial change)</li>
                    </ul>
                </div>

                {/* 23.6 Documentation Standards */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">6</span>Documentation Standards</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Assumptions note</li>
                        <li>{"\u2022"} Financial projections</li>
                        <li>{"\u2022"} Methodology justification</li>
                        <li>{"\u2022"} Sensitivity analysis</li>
                    </ul>
                </div>

                {/* 23.7 Conflict of Interest Policy */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0096D6] text-white text-xs font-bold mr-2">7</span>Conflict of Interest Policy</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Separation between investment team and valuation team</li>
                        <li>{"\u2022"} Mandatory disclosure of conflicts</li>
                        <li>{"\u2022"} Independent review mechanism</li>
                    </ul>
                </div>
            </div>

            {/* 24. Audit & Due Diligence */}
            <h2 id="audit-due-diligence">24. Audit &amp; Due Diligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="rounded-xl p-5 border border-green-200 bg-green-50/50">
                    <h4 className="font-bold text-green-800 text-sm mb-3">What Auditors Check</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Consistency in methodology</li>
                        <li>{"\u2022"} Justification of assumptions</li>
                        <li>{"\u2022"} Accuracy of financial inputs</li>
                        <li>{"\u2022"} Supporting documentation</li>
                        <li>{"\u2022"} Compliance with Ind AS / SEBI norms</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-red-200 bg-red-50/50">
                    <h4 className="font-bold text-red-800 text-sm mb-3">Audit Red Flags</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Sudden valuation spikes without justification</li>
                        <li>{"\u2022"} Inconsistent valuation approach</li>
                        <li>{"\u2022"} Missing documentation</li>
                        <li>{"\u2022"} Over-reliance on management projections</li>
                    </ul>
                </div>
            </div>

            {/* 25. Investor Reporting */}
            <h2 id="investor-reporting">25. Investor Reporting</h2>
            <p>Investors today expect:</p>
            <ul className="my-2 space-y-1">
                <li>{"\u2022"} Transparent valuation methodology</li>
                <li>{"\u2022"} Periodic NAV disclosures</li>
                <li>{"\u2022"} Risk explanation</li>
                <li>{"\u2022"} Sensitivity analysis</li>
            </ul>
            <div className="overflow-x-auto my-6">
                <table className="data-table w-full">
                    <thead><tr><th className="text-left p-3 bg-[#0a1628] text-white">Disclosure Item</th><th className="text-left p-3 bg-[#0a1628] text-white">Details</th></tr></thead>
                    <tbody>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">NAV</td><td className="p-3">Net Asset Value</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3 font-medium">Methodology</td><td className="p-3">Valuation approach used</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">Assumptions</td><td className="p-3">Key inputs</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="p-3 font-medium">Risk Factors</td><td className="p-3">Market/liquidity risks</td></tr>
                        <tr className="border-b border-gray-100"><td className="p-3 font-medium">Changes</td><td className="p-3">Variation from previous valuation</td></tr>
                    </tbody>
                </table>
            </div>

            {/* 26. Tax & Legal Implications */}
            <h2 id="tax-legal">26. Tax &amp; Legal Implications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="rounded-xl p-5 border border-blue-200 bg-blue-50/50">
                    <h4 className="font-bold text-blue-800 text-sm mb-3">Income Tax</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Section 56 (Angel Tax implications)</li>
                        <li>{"\u2022"} Transfer pricing for cross-border investments</li>
                        <li>{"\u2022"} Fair Market Value (FMV) compliance</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-purple-200 bg-purple-50/50">
                    <h4 className="font-bold text-purple-800 text-sm mb-3">Companies Act</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} Issue of shares (preferential/rights)</li>
                        <li>{"\u2022"} Mergers &amp; amalgamations</li>
                        <li>{"\u2022"} ESOP valuation</li>
                    </ul>
                </div>
                <div className="rounded-xl p-5 border border-orange-200 bg-orange-50/50">
                    <h4 className="font-bold text-orange-800 text-sm mb-3">Regulatory</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>{"\u2022"} SEBI scrutiny in AIFs</li>
                        <li>{"\u2022"} RBI supervision for NBFC portfolios</li>
                        <li>{"\u2022"} IFSCA compliance for offshore funds</li>
                    </ul>
                </div>
            </div>

            {/* 27. Advanced Valuation Techniques */}
            <h2 id="advanced-techniques">27. Advanced Valuation Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="rounded-xl p-5 border border-gray-200 bg-white hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">Scenario-Based Valuation</h4>
                    <p className="text-sm text-gray-600 !mb-0">Best case, base case, worst case + weighted probability approach</p>
                </div>
                <div className="rounded-xl p-5 border border-gray-200 bg-white hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">Monte Carlo Simulation</h4>
                    <p className="text-sm text-gray-600 !mb-0">Used for high uncertainty assets + advanced statistical modelling</p>
                </div>
                <div className="rounded-xl p-5 border border-gray-200 bg-white hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-[#0a1628] text-[15px] mb-2">Option Pricing Models</h4>
                    <p className="text-sm text-gray-600 !mb-0">For convertible instruments + ESOP and hybrid securities</p>
                </div>
            </div>

            {/* Expert Quote */}
            <blockquote className="my-8 p-6 border-l-4 border-[#0096D6] bg-blue-50 rounded-r-xl">
                <p className="text-gray-700 italic text-[15px] leading-relaxed">&ldquo;Valuation is not merely a number\u2014it is a reflection of governance, transparency, and credibility. Regulators today expect a defensible and well-documented approach, especially in alternative assets where subjectivity is high.&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-[#0a1628]">&mdash; CS Devyani Khambhati, Compliance Expert</footer>
            </blockquote>

            {/* Final Paragraph */}
            <p className="my-6">Alternative Asset Portfolio Valuation plays a crucial role in today&apos;s evolving investment ecosystem. With increasing regulatory scrutiny and investor expectations, adopting a structured, compliant, and transparent valuation approach is no longer optional\u2014it is a necessity. A well-executed valuation framework not only ensures compliance but also builds long-term trust with stakeholders and regulators alike.</p>

            {/* 28. FAQs */}
            <h2 id="faq">28. Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span>
                            <span className="text-[#0096D6] transition-transform shrink-0 ml-4">{"\u25bc"}</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
