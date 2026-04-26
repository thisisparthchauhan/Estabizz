"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "regulatory-authority", title: "Regulatory Authority" },
        { id: "what-is", title: "What is CIB Registration?" },
        { id: "categories", title: "Categories of Brokers" },
        { id: "who-should-apply", title: "Who Should Apply" },
        { id: "who-cannot-apply", title: "Who Cannot Apply" },
        { id: "capital", title: "Capital Requirement" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "fit-and-proper", title: "Fit & Proper" },
        { id: "business-plan", title: "Business Plan" },
        { id: "infrastructure", title: "Infrastructure" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "timeline", title: "Timeline" },
        { id: "fees", title: "Government Fees" },
        { id: "certificate", title: "Registration Certificate" },
        { id: "pi-insurance", title: "Professional Indemnity" },
        { id: "commission", title: "Commission Framework" },
        { id: "post-compliance", title: "Post-Registration Compliance" },
        { id: "compliance-calendar", title: "Compliance Calendar" },
        { id: "inspection", title: "Inspection Powers" },
        { id: "suspension", title: "Suspension & Cancellation" },
        { id: "penalties", title: "Penalties" },
        { id: "common-mistakes", title: "Common Mistakes" },
        { id: "comparison", title: "Direct vs Composite" },
        { id: "advanced-comparison", title: "Advanced Comparison" },
        { id: "principal-officer", title: "Principal Officer" },
        { id: "branch-expansion", title: "Branch Expansion" },
        { id: "operational-structure", title: "Operational Structure" },
        { id: "risk-areas", title: "Risk Areas" },
        { id: "financial-planning", title: "Financial Planning" },
        { id: "governance-advisory", title: "Governance Advisory" },
        { id: "conclusion", title: "Conclusion" },
        { id: "faqs", title: "FAQs (200+)" },
    ];

    // ============ FAQ DATA — grouped verbatim from source doc ============
    const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
        {
            title: "1. General Overview",
            items: [
                { q: "1. What is Composite Insurance Broker Registration in India?", a: "Composite Insurance Broker Registration in India is a licence granted by IRDAI that allows a company to carry on life insurance broking, general insurance broking, and reinsurance broking activities under one approval." },
                { q: "2. Who grants Composite Insurance Broker Registration in India?", a: "The registration is granted by the Insurance Regulatory and Development Authority of India (IRDAI), which regulates insurance intermediaries in India." },
                { q: "3. What activities can a Composite Insurance Broker undertake?", a: "A composite broker can solicit and arrange life insurance policies, general insurance policies, and reinsurance placements, along with risk advisory and claims assistance services." },
                { q: "4. Is Composite Insurance Broker Registration mandatory to act as a broker?", a: "Yes. No entity can act as an insurance broker in India without valid registration from IRDAI." },
                { q: "5. What is the difference between Direct Broker and Composite Broker?", a: "A direct broker operates either in life or general insurance, whereas a composite broker is authorised to operate across life, general, and reinsurance segments." },
                { q: "6. Is reinsurance activity allowed under Composite Insurance Broker Registration?", a: "Yes. Composite brokers are permitted to carry out reinsurance broking in addition to direct broking." },
                { q: "7. Can an unregistered entity solicit insurance business?", a: "No. Soliciting or arranging insurance business without registration is prohibited." },
                { q: "8. Is the registration valid permanently?", a: "No. Registration is valid for a prescribed period and must be renewed before expiry." },
                { q: "9. Can a company hold more than one category of broker registration?", a: "No. A company is registered under one specific category. Composite category covers all segments." },
                { q: "10. Is the registration transferable to another entity?", a: "No. Registration is entity-specific and cannot be transferred." },
            ]
        },
        {
            title: "2. Eligibility & Applicability",
            items: [
                { q: "11. Who can apply for Composite Insurance Broker Registration in India?", a: "Only a company incorporated under the Companies Act can apply." },
                { q: "12. Can an LLP apply for Composite Insurance Broker Registration?", a: "No. Only a company structure is permitted." },
                { q: "13. Can an individual apply for Composite Broker licence?", a: "No. Individuals cannot apply." },
                { q: "14. Can a foreign-owned company apply?", a: "Yes, subject to compliance with applicable FDI norms and IRDAI approval requirements." },
                { q: "15. Is there any restriction on promoters?", a: "Promoters must satisfy fit and proper criteria regarding integrity, financial soundness, and reputation." },
                { q: "16. Can an existing Direct Broker upgrade to Composite category?", a: "Yes, subject to meeting enhanced capital and compliance requirements and obtaining approval." },
                { q: "17. Is insurance experience mandatory for promoters?", a: "The Principal Officer must meet qualification and training requirements, and management must demonstrate competence." },
                { q: "18. Can a company engaged in other financial activities apply?", a: "Yes, provided insurance broking is a main object and there is no conflict of interest." },
                { q: "19. Is a minimum number of directors required?", a: "The company must comply with Companies Act requirements and IRDAI governance expectations." },
                { q: "20. Are disqualified directors allowed?", a: "No. Persons disqualified under law cannot hold key positions." },
            ]
        },
        {
            title: "3. Legal & Regulatory Framework",
            items: [
                { q: "21. Under which law is Composite Insurance Broker Registration governed?", a: "It is governed by the Insurance Act, IRDAI Act, and IRDAI (Insurance Brokers) Regulations, 2018." },
                { q: "22. Does IRDAI issue circulars applicable to brokers?", a: "Yes. Brokers must comply with all circulars and guidelines issued from time to time." },
                { q: "23. Are brokers bound by a Code of Conduct?", a: "Yes. Brokers must follow conduct requirements prescribed by IRDAI." },
                { q: "24. Can IRDAI inspect a composite broker?", a: "Yes. IRDAI has inspection and supervisory powers." },
                { q: "25. Is maintenance of books mandatory?", a: "Yes. Brokers must maintain prescribed books and records." },
                { q: "26. Is there a regulatory reporting requirement?", a: "Yes. Periodic filings are required." },
                { q: "27. Is professional indemnity insurance mandatory?", a: "Yes. It must be maintained continuously." },
                { q: "28. Is capital maintenance monitored by IRDAI?", a: "Yes. Net worth must be maintained at all times." },
                { q: "29. Can IRDAI impose conditions while granting licence?", a: "Yes. Registration may be granted with conditions." },
                { q: "30. Can IRDAI suspend registration?", a: "Yes, for regulatory breaches." },
            ]
        },
        {
            title: "4. Registration / Application Process",
            items: [
                { q: "31. How do I apply for Composite Insurance Broker Registration in India?", a: "Application must be filed in the prescribed form along with required documents and fee." },
                { q: "32. Is application filed online?", a: "Yes, through the regulatory portal as prescribed." },
                { q: "33. What is the first step before applying?", a: "Incorporate a company with appropriate object clause and infuse required capital." },
                { q: "34. Is Principal Officer appointment required before filing?", a: "Yes. The Principal Officer must meet qualification and training norms before approval." },
                { q: "35. Does IRDAI conduct scrutiny of application?", a: "Yes. The Authority reviews documents and may seek clarifications." },
                { q: "36. Can IRDAI reject an incomplete application?", a: "Yes. Incomplete or deficient applications may not be processed." },
                { q: "37. Is personal hearing possible during review?", a: "Yes, if required by IRDAI." },
                { q: "38. What happens after in-principle approval?", a: "Registration fee must be paid before certificate issuance." },
                { q: "39. Is physical verification conducted?", a: "IRDAI may verify infrastructure and compliance readiness." },
                { q: "40. When is registration certificate issued?", a: "After satisfaction of all conditions and payment of fees." },
            ]
        },
        {
            title: "5. Capital, Net Worth & Infrastructure",
            items: [
                { q: "41. What is the minimum capital required for Composite Insurance Broker Registration?", a: "₹5 Crore paid-up equity capital." },
                { q: "42. Must capital be fully paid-up?", a: "Yes." },
                { q: "43. Is net worth equal to minimum capital?", a: "Yes. Net worth must not fall below ₹5 Crore." },
                { q: "44. Is there a deposit requirement?", a: "Yes. A specified percentage of capital must be kept as deposit with a scheduled bank." },
                { q: "45. Can capital be reduced after registration?", a: "Not below regulatory minimum." },
                { q: "46. Is professional indemnity cover required?", a: "Yes, minimum ₹5 Crore." },
                { q: "47. Is office space mandatory?", a: "Yes. Adequate infrastructure must be available." },
                { q: "48. Is IT system required?", a: "Yes. Proper systems for record maintenance are expected." },
                { q: "49. Is grievance redressal mechanism compulsory?", a: "Yes." },
                { q: "50. Is separate client account required?", a: "Yes, where client money is handled." },
            ]
        },
        {
            title: "6. Documentation & Declarations",
            items: [
                { q: "51. What documents are required for Composite Insurance Broker Registration?", a: "Corporate documents, capital certificates, net worth certificate, Principal Officer qualification proof, declarations, and business plan." },
                { q: "52. Is a 3-year business plan mandatory?", a: "Yes. Projections must be submitted." },
                { q: "53. Is a CA certificate required?", a: "Yes, for capital and net worth confirmation." },
                { q: "54. Is director KYC required?", a: "Yes." },
                { q: "55. Is a fit and proper declaration required?", a: "Yes, from directors and key persons." },
                { q: "56. Is board resolution required?", a: "Yes." },
                { q: "57. Is office proof required?", a: "Yes." },
                { q: "58. Is bank certificate required for deposit?", a: "Yes." },
                { q: "59. Is auditor appointment mandatory before application?", a: "Yes, as part of corporate compliance." },
                { q: "60. Is shareholding pattern disclosure required?", a: "Yes." },
            ]
        },
        {
            title: "7. Timelines & Fees",
            items: [
                { q: "61. How long does it take to get Composite Insurance Broker Registration?", a: "Processing time depends on documentation and regulatory review." },
                { q: "62. Is application fee refundable?", a: "No." },
                { q: "63. Is registration fee separate from application fee?", a: "Yes." },
                { q: "64. Is renewal fee payable?", a: "Yes, before expiry." },
                { q: "65. What happens if renewal fee is delayed?", a: "Registration may lapse or attract regulatory action." },
                { q: "66. Is late filing penalised?", a: "Yes, regulatory action may follow." },
                { q: "67. Is there a validity period for registration?", a: "Yes, as prescribed by regulations." },
                { q: "68. Can application be withdrawn?", a: "Yes, but fees are non-refundable." },
                { q: "69. Is fee structure prescribed in schedule?", a: "Yes." },
                { q: "70. Can fee amount change?", a: "Yes, if regulations are amended." },
            ]
        },
        {
            title: "8. Post-Registration Compliance",
            items: [
                { q: "71. Is annual return filing mandatory?", a: "Yes." },
                { q: "72. Is net worth certification required annually?", a: "Yes." },
                { q: "73. Must PI insurance be renewed continuously?", a: "Yes." },
                { q: "74. Is internal audit required?", a: "Regulatory and financial audits are required." },
                { q: "75. Is board oversight required?", a: "Yes, governance is expected." },
                { q: "76. Is complaint register mandatory?", a: "Yes." },
                { q: "77. Is commission reporting required?", a: "Yes." },
                { q: "78. Must client funds be segregated?", a: "Yes." },
                { q: "79. Are regulatory inspections routine?", a: "They may occur as per supervisory mechanism." },
                { q: "80. Can IRDAI call for information anytime?", a: "Yes." },
            ]
        },
        {
            title: "9. Operational Restrictions & Permissions",
            items: [
                { q: "81. Can composite broker represent multiple insurers?", a: "Yes." },
                { q: "82. Can broker underwrite risk?", a: "No, brokers cannot act as insurers." },
                { q: "83. Can broker give risk management advice?", a: "Yes." },
                { q: "84. Can broker collect premium?", a: "Yes, subject to client money handling rules." },
                { q: "85. Is rebating allowed?", a: "No." },
                { q: "86. Can broker outsource core functions?", a: "Only within regulatory limits." },
                { q: "87. Is advertising regulated?", a: "Yes, must comply with IRDAI norms." },
                { q: "88. Can broker appoint sub-brokers?", a: "Only as permitted by regulation." },
                { q: "89. Is data confidentiality mandatory?", a: "Yes." },
                { q: "90. Can broker operate across India?", a: "Yes, subject to compliance." },
            ]
        },
        {
            title: "10. Penalties, Cancellation & Regulatory Action",
            items: [
                { q: "91. What happens if capital falls below minimum?", a: "Regulatory action including suspension may follow." },
                { q: "92. Can licence be cancelled for misrepresentation?", a: "Yes." },
                { q: "93. Is failure to maintain PI insurance a violation?", a: "Yes." },
                { q: "94. Can repeated non-compliance lead to cancellation?", a: "Yes." },
                { q: "95. Can monetary penalty be imposed?", a: "Yes." },
                { q: "96. Is there opportunity of hearing before cancellation?", a: "Yes, as per regulatory procedure." },
                { q: "97. Can broker voluntarily surrender licence?", a: "Yes, with approval." },
                { q: "98. What happens to pending policies on cancellation?", a: "Regulatory directions must be followed." },
                { q: "99. Can suspended broker continue operations?", a: "No." },
                { q: "100. Can cancelled broker reapply?", a: "Only subject to regulatory permission and satisfaction of conditions." },
            ]
        },
        {
            title: "11. Practical & Scenario-Based Questions",
            items: [
                { q: "101. Can a startup with ₹5 Crore capital apply for Composite Insurance Broker Registration?", a: "Yes, if all eligibility and compliance conditions are met." },
                { q: "102. Is experience mandatory for directors?", a: "They must satisfy fit and proper and competence expectations." },
                { q: "103. Can net worth fluctuate temporarily?", a: "It must not fall below minimum at any time." },
                { q: "104. Can IRDAI seek additional documents during review?", a: "Yes." },
                { q: "105. Is renewal automatic if compliant?", a: "Renewal is subject to regulatory satisfaction." },
                { q: "106. Can a composite broker downgrade category?", a: "Only with regulatory approval." },
                { q: "107. Is reporting required if Principal Officer changes?", a: "Yes." },
                { q: "108. Is merger of broker entities permitted?", a: "Subject to regulatory approval." },
                { q: "109. Can capital be infused in phases?", a: "Minimum required capital must be in place before approval." },
                { q: "110. Is regulatory compliance a one-time requirement?", a: "No. It is continuous throughout the life of registration." },
                { q: "111. What happens if the net worth of a composite broker falls below ₹5 Crore due to accumulated losses?", a: "If net worth falls below the prescribed minimum, the broker must immediately take corrective steps such as capital infusion. Continued deficiency may attract regulatory scrutiny and possible suspension." },
                { q: "112. Can a composite broker infuse preference share capital to meet capital requirement?", a: "The regulations require minimum paid-up equity capital. The capital structure must satisfy regulatory conditions, and only qualifying capital will be considered." },
                { q: "113. If a director resigns, is prior approval from IRDAI required?", a: "The broker must promptly intimate IRDAI about change in directors. Regulatory reporting is mandatory." },
                { q: "114. Can a composite broker operate from a co-working space?", a: "The broker must maintain adequate infrastructure. The premises must support regulatory inspection and secure record maintenance." },
                { q: "115. Is it permissible to engage in lending activity along with broking?", a: "Any additional financial activity must not conflict with insurance broking and must comply with applicable laws." },
                { q: "116. What if the Professional Indemnity policy expires for a few days unintentionally?", a: "Continuous coverage is mandatory. Even a short gap may be treated as non-compliance." },
                { q: "117. Can a composite broker receive premium in its own bank account?", a: "Client money handling must follow segregation rules. Premium collection is regulated and must comply with prescribed norms." },
                { q: "118. What if client funds are temporarily used for operational expenses?", a: "Client funds must not be mixed with broker's own funds. Misuse may invite severe regulatory action." },
                { q: "119. Can a composite broker share commission with another intermediary?", a: "Commission sharing must comply strictly with regulatory framework and limits." },
                { q: "120. Is prior IRDAI approval required before changing shareholding pattern?", a: "Significant changes in shareholding generally require regulatory approval or intimation, depending on thresholds." },
                { q: "121. Can the Principal Officer also act as Director?", a: "Yes, provided qualification and regulatory requirements are satisfied." },
                { q: "122. What if the Principal Officer leaves the company unexpectedly?", a: "The broker must appoint a qualified replacement and intimate IRDAI without delay." },
                { q: "123. Can a composite broker appoint untrained sales staff?", a: "Employees involved in solicitation must comply with prescribed training and certification norms." },
                { q: "124. Is outsourcing claims handling permitted?", a: "Core broking functions must remain within regulatory control. Outsourcing must comply with guidelines." },
                { q: "125. What if audited financial statements show capital impairment?", a: "Immediate corrective action and regulatory reporting may be required." },
                { q: "126. Can a broker advertise guaranteed returns on insurance products?", a: "Advertising must be fair and compliant. Misleading claims are prohibited." },
                { q: "127. Is there a limit on brokerage income?", a: "Brokerage must be within limits notified by IRDAI." },
                { q: "128. Can a composite broker operate internationally?", a: "Cross-border operations must comply with Indian regulations and applicable foreign laws." },
                { q: "129. What if a complaint remains unresolved beyond internal timeline?", a: "Grievance redressal must follow regulatory norms and reporting obligations." },
                { q: "130. Can the deposit maintained with bank be withdrawn for liquidity needs?", a: "The statutory deposit cannot be withdrawn without regulatory compliance." },
                { q: "131. Is internal audit mandatory even if not specified separately?", a: "Governance standards require systematic compliance monitoring." },
                { q: "132. Can a composite broker change its registered office without informing IRDAI?", a: "No. Address changes must be promptly reported." },
                { q: "133. What if a director has pending financial litigation?", a: "Fit and proper assessment may consider integrity and financial standing." },
                { q: "134. Can a composite broker provide consultancy unrelated to insurance?", a: "Activities must not dilute primary broking function or conflict with regulations." },
                { q: "135. Is annual net worth certificate required even if financials are audited?", a: "Yes, specific certification confirming minimum net worth is required." },
                { q: "136. Can commission be passed on to client as rebate?", a: "Rebating is prohibited." },
                { q: "137. What if regulatory return is filed late due to system error?", a: "Delay may attract scrutiny. Documentation of cause may be necessary." },
                { q: "138. Can a composite broker invest its capital in high-risk assets?", a: "Investment must not impair capital adequacy." },
                { q: "139. What if IRDAI issues a show cause notice?", a: "The broker must respond within prescribed timeline with proper explanation." },
                { q: "140. Can a composite broker merge with another broker?", a: "Merger requires regulatory approval." },
                { q: "141. Is board approval required before applying for renewal?", a: "Corporate governance practice requires formal board approval." },
                { q: "142. What if a shareholder becomes insolvent?", a: "Regulatory impact depends on shareholding influence and fit and proper evaluation." },
                { q: "143. Can a composite broker operate without full-time compliance officer?", a: "Regulations expect designated compliance oversight." },
                { q: "144. What if the broker fails to renew PI insurance on time?", a: "Regulatory action may follow for non-maintenance of mandatory cover." },
                { q: "145. Can brokers pay incentives beyond brokerage cap?", a: "Remuneration must comply with regulatory caps." },
                { q: "146. Is data retention period specified?", a: "Records must be maintained as per regulatory requirements." },
                { q: "147. What if capital infusion is funded through borrowed money?", a: "Capital must reflect genuine paid-up equity." },
                { q: "148. Can a composite broker accept foreign currency premium directly?", a: "Subject to regulatory and FEMA compliance." },
                { q: "149. Is whistleblower mechanism required?", a: "Governance best practice supports structured reporting channels." },
                { q: "150. What if IRDAI conducts surprise inspection?", a: "All records and compliance documentation must be readily available." },
                { q: "151. Can a composite broker appoint a non-resident as director?", a: "Permissible subject to corporate and regulatory norms." },
                { q: "152. Is there a cooling-off period after cancellation?", a: "Reapplication depends on regulatory satisfaction." },
                { q: "153. What if commission exceeds prescribed limit accidentally?", a: "Corrective action and regulatory compliance are required." },
                { q: "154. Can broker maintain multiple branch offices?", a: "Yes, subject to compliance and intimation." },
                { q: "155. What if branch operates without qualified staff?", a: "This may be treated as non-compliance." },
                { q: "156. Is separate compliance reporting required for reinsurance activity?", a: "Reinsurance operations must comply with regulatory norms." },
                { q: "157. Can broker appoint corporate agent simultaneously?", a: "Holding multiple intermediary roles may conflict with regulatory structure." },
                { q: "158. What if capital is infused after application but before approval?", a: "Capital must be available before registration grant." },
                { q: "159. Is it mandatory to maintain client-wise policy records?", a: "Yes." },
                { q: "160. Can IRDAI impose additional conditions during renewal?", a: "Yes, renewal is subject to regulatory satisfaction." },
                { q: "161. What if board does not meet regularly?", a: "Weak governance may affect regulatory perception." },
                { q: "162. Can promoter withdraw capital after approval?", a: "Capital cannot fall below prescribed minimum." },
                { q: "163. Is reporting required for legal proceedings against broker?", a: "Material events may require regulatory disclosure." },
                { q: "164. Can a composite broker issue its own insurance policy?", a: "No. Brokers cannot underwrite risk." },
                { q: "165. What if IT systems fail and records are lost?", a: "Data protection and backup mechanisms are expected." },
                { q: "166. Can a broker guarantee claim settlement?", a: "Claims depend on insurer's underwriting decision." },
                { q: "167. Is it mandatory to appoint statutory auditor?", a: "Yes, under Companies Act and regulatory compliance." },
                { q: "168. What if shareholder acquires controlling stake?", a: "Regulatory approval may be required." },
                { q: "169. Can broker engage in digital-only model?", a: "Yes, provided infrastructure and compliance requirements are met." },
                { q: "170. Is commission disclosure to client mandatory?", a: "Transparency obligations apply." },
                { q: "171. What if broker faces insolvency proceedings?", a: "Regulatory implications may arise." },
                { q: "172. Can broker sponsor insurance product?", a: "Broker cannot assume insurer role." },
                { q: "173. What if employee misconduct causes financial loss?", a: "PI insurance may respond, subject to policy terms." },
                { q: "174. Is client KYC mandatory?", a: "Compliance with applicable legal requirements is expected." },
                { q: "175. Can broker handle government insurance schemes?", a: "Yes, subject to regulatory framework." },
                { q: "176. What if net worth is temporarily restored after shortfall?", a: "Regulatory reporting may still be required." },
                { q: "177. Can broker distribute mutual funds simultaneously?", a: "Multiple regulated activities must comply with respective laws." },
                { q: "178. Is physical record keeping mandatory in digital era?", a: "Records must be maintained in compliant form, physical or electronic as permitted." },
                { q: "179. What if broker fails to submit renewal application before expiry?", a: "Licence may lapse." },
                { q: "180. Can broker appoint independent directors?", a: "Corporate governance norms may encourage it." },
                { q: "181. What if IRDAI directs corrective action plan?", a: "Broker must implement within specified time." },
                { q: "182. Can broker challenge regulatory order?", a: "Legal remedies are available as per law." },
                { q: "183. What if there is conflict of interest with insurer?", a: "Broker must maintain independence." },
                { q: "184. Is internal policy manual required?", a: "Governance standards require documented processes." },
                { q: "185. Can broker provide actuarial advice?", a: "Only within scope permitted by law." },
                { q: "186. What if regulatory fee is underpaid?", a: "Payment deficiency must be rectified." },
                { q: "187. Is cyber security compliance required?", a: "Data protection obligations apply." },
                { q: "188. Can broker appoint nominee director of investor?", a: "Yes, subject to fit and proper compliance." },
                { q: "189. What if branch fails inspection?", a: "Corrective action may be required." },
                { q: "190. Can broker accept advance commission?", a: "Commission structure must comply with regulations." },
                { q: "191. Is ESG reporting required?", a: "Only if applicable under corporate law and regulatory instructions." },
                { q: "192. What if company changes its name?", a: "Regulatory intimation and approval may be required." },
                { q: "193. Can broker appoint franchise model?", a: "Structure must comply with regulatory framework." },
                { q: "194. What if employee qualification lapses?", a: "Renewal or compliance must be ensured." },
                { q: "195. Is it mandatory to maintain separate grievance officer?", a: "Yes, grievance mechanism is required." },
                { q: "196. Can broker solicit business through telemarketing?", a: "Solicitation must comply with regulatory norms." },
                { q: "197. What if insurer delays commission payment?", a: "Commercial matter subject to contractual terms." },
                { q: "198. Is capital infusion from related party permitted?", a: "Yes, if compliant with corporate and regulatory requirements." },
                { q: "199. What if inspection reveals minor non-compliance?", a: "Regulator may issue advisory or direction." },
                { q: "200. Is Composite Insurance Broker Registration suitable for small startups?", a: "It is suitable only where capital, infrastructure and compliance capacity meet regulatory expectations." },
            ]
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🛡️", label: "IRDAI" },
                { emoji: "📜", label: "Composite Broker" },
                { emoji: "🏢", label: "Insurance Broking" },
                { emoji: "🔁", label: "Reinsurance" },
                { emoji: "💼", label: "Life + General" },
                { emoji: "⚖️", label: "IRDAI Regulations 2018" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IRDAI Services", href: "/irdai" },
                { label: "Composite Insurance Broker Registration" },
            ]}
            title="Composite Insurance Broker Registration in India"
            readTime="25 min read"
            focusKeyword="Composite Insurance Broker Registration in India"
            sections={sections}
            ctaTitle="Get Expert Help with Your Composite Broker Licence"
            ctaDescription="Composite Insurance Broker Registration is a regulatory approval process — not a filing exercise. Our compliance experts guide you through capital planning, governance structuring, documentation precision and business plan design to maximise approval probability."
            quickFacts={[
                { label: "Regulator", value: "IRDAI" },
                { label: "Min Paid-up Capital", value: "₹5 Crore" },
                { label: "Net Worth", value: "₹5 Crore" },
                { label: "Bank Deposit", value: "10% of capital" },
                { label: "PI Insurance", value: "₹5 Crore" },
                { label: "Application Fee", value: "₹1,00,000" },
                { label: "Registration Fee", value: "₹2,50,000" },
                { label: "Timeline", value: "4–8 months" },
                { label: "Legal Form", value: "Company only" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "IRDA Insurance Broker License", href: "/irdai/irda-insurance-broker-license", category: "IRDAI", description: "Complete guide to obtaining an IRDAI insurance broker licence in India." },
                { title: "IRDAI Regulatory Sandbox", href: "/irdai/irdai-regulatory-sandbox", category: "IRDAI", description: "Framework and process for participating in IRDAI's regulatory sandbox." },
                { title: "Insurance Marketing Firm License", href: "/irdai/insurance-marketing-firm-license", category: "IRDAI", description: "IRDAI registration guide for insurance marketing firms." },
                { title: "ISNP Registration", href: "/irdai/isnp-registration", category: "IRDAI", description: "Complete guide to Insurance Self-Network Platform registration." },
            ]}
            finalCtaTitle="Start Your Composite Insurance Broker Registration"
            finalCtaDescription="Building a full-scale life + general + reinsurance broking house demands precision in capital planning, governance and documentation. Our team handles the entire journey — from entity structuring to final IRDAI certificate."
        >
            {/* ==================== INTRODUCTION ==================== */}
            <section id="introduction">
                <h2>Composite Insurance Broker Registration in India</h2>
                <p>
                    Composite Insurance Broker Registration in India is the highest category of insurance broking licence
                    granted by the Insurance Regulatory and Development Authority of India (IRDAI), enabling an entity to
                    operate across life insurance, general insurance and reinsurance segments under one unified regulatory
                    approval.
                </p>
                <p>
                    For promoters who wish to build a full-scale insurance distribution and advisory platform, Composite
                    Insurance Broker Registration in India provides the widest operational scope. However, it also carries
                    the most stringent capital, governance and compliance requirements under the IRDAI (Insurance Brokers)
                    Regulations, 2018.
                </p>
                <p>This guide explains the entire regulatory structure in a practical, promoter-friendly manner.</p>
            </section>

            {/* ==================== REGULATORY AUTHORITY ==================== */}
            <section id="regulatory-authority">
                <h2>Regulatory Authority Governing Composite Insurance Broker Registration in India</h2>
                <p>Composite Insurance Broker Registration in India is governed by:</p>
                <ul>
                    <li>Insurance Act, 1938</li>
                    <li>IRDAI Act, 1999</li>
                    <li>IRDAI (Insurance Brokers) Regulations, 2018</li>
                    <li>Subsequent circulars and clarifications issued by IRDAI</li>
                </ul>
                <p>The licensing authority is:</p>
                <div className="info-box">
                    <strong>Insurance Regulatory and Development Authority of India (IRDAI)</strong>
                </div>
                <p>
                    IRDAI regulates entry, capital adequacy, conduct, reporting, audit and cancellation provisions
                    applicable to Composite Insurance Broker Registration in India.
                </p>
            </section>

            {/* ==================== WHAT IS ==================== */}
            <section id="what-is">
                <h2>What is Composite Insurance Broker Registration in India?</h2>
                <p>Composite Insurance Broker Registration in India permits a company to:</p>
                <ul>
                    <li>Solicit and arrange life insurance policies</li>
                    <li>Solicit and arrange general insurance policies</li>
                    <li>Undertake reinsurance broking activities</li>
                    <li>Provide risk management advisory services</li>
                    <li>Assist in claims facilitation</li>
                    <li>Structure complex insurance programmes</li>
                </ul>
                <p>
                    Unlike direct broker or reinsurance broker categories, Composite Insurance Broker Registration in India
                    allows an integrated business model across segments.
                </p>
            </section>

            {/* ==================== CATEGORIES ==================== */}
            <section id="categories">
                <h2>Categories of Insurance Brokers under Regulations</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Scope of Operations</th>
                            <th>Capital Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Direct Broker</td><td>Life or General</td><td>Lower than composite</td></tr>
                        <tr><td>Reinsurance Broker</td><td>Reinsurance only</td><td>Higher than direct</td></tr>
                        <tr><td>Composite Broker</td><td>Life + General + Reinsurance</td><td>Highest capital requirement</td></tr>
                    </tbody>
                </table>
                <p>Composite Insurance Broker Registration in India combines all three capabilities.</p>
            </section>

            {/* ==================== WHO SHOULD APPLY ==================== */}
            <section id="who-should-apply">
                <h2>Who Should Apply for Composite Insurance Broker Registration in India?</h2>
                <p>Composite Insurance Broker Registration in India is suitable for:</p>
                <ul>
                    <li>Large insurance distribution groups</li>
                    <li>Risk advisory firms</li>
                    <li>Corporate broking houses</li>
                    <li>International insurance intermediaries entering India</li>
                    <li>Promoters planning pan-India insurance operations</li>
                </ul>
                <div className="warning-box">
                    <strong>Note:</strong> It is not meant for small, single-line distribution entities.
                </div>
            </section>

            {/* ==================== WHO CANNOT APPLY ==================== */}
            <section id="who-cannot-apply">
                <h2>Who Cannot Apply?</h2>
                <p>Composite Insurance Broker Registration in India cannot be granted to:</p>
                <ul>
                    <li>Individuals</li>
                    <li>Partnership firms</li>
                    <li>LLPs</li>
                    <li>Entities engaged in conflicting financial activities without regulatory approval</li>
                    <li>Entities failing fit and proper criteria</li>
                </ul>
                <p><strong>Only a company registered under the Companies Act can apply.</strong></p>
            </section>

            {/* ==================== CAPITAL ==================== */}
            <section id="capital">
                <h2>Capital Requirement for Composite Insurance Broker Registration in India</h2>

                <h3>Minimum Paid-up Capital</h3>
                <p>
                    As prescribed in the Regulations, the minimum capital requirement for Composite Insurance Broker
                    Registration in India is:
                </p>
                <div className="success-box">
                    <strong>₹5 Crore (Five Crore Rupees)</strong>
                </div>
                <p>This capital must be:</p>
                <ul>
                    <li>Fully paid-up equity capital</li>
                    <li>Brought in through legitimate banking channels</li>
                    <li>Maintained at all times</li>
                </ul>

                <h3>Net Worth Maintenance Requirement</h3>
                <p>
                    Composite Insurance Broker Registration in India requires maintenance of minimum net worth equivalent
                    to 100% of the minimum capital requirement.
                </p>
                <table className="data-table">
                    <thead>
                        <tr><th>Particular</th><th>Requirement</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Minimum Capital</td><td>₹5 Crore</td></tr>
                        <tr><td>Minimum Net Worth</td><td>₹5 Crore</td></tr>
                        <tr><td>Continuous Maintenance</td><td>Mandatory</td></tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Failure to maintain net worth can trigger suspension.</strong>
                </div>

                <h3>Deposit Requirement</h3>
                <p>
                    Composite Insurance Broker Registration in India mandates deposit placement with a scheduled bank.
                </p>
                <table className="data-table">
                    <thead>
                        <tr><th>Deposit Percentage</th><th>Applicable On</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>10%</td><td>Of minimum capital</td></tr>
                    </tbody>
                </table>
                <p>This deposit remains under regulatory lien.</p>

                <div className="info-box">
                    <strong>Capital Requirement Structure:</strong>
                    <br />
                    Equity Capital → Net Worth Maintenance → Bank Deposit → Ongoing Compliance
                </div>
            </section>

            {/* ==================== ELIGIBILITY ==================== */}
            <section id="eligibility">
                <h2>Eligibility Criteria for Composite Insurance Broker Registration in India</h2>
                <table className="data-table">
                    <thead>
                        <tr><th>Eligibility Parameter</th><th>Regulatory Expectation</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Legal Form</td><td>Company under Companies Act</td></tr>
                        <tr><td>Object Clause</td><td>Insurance broking must be primary object</td></tr>
                        <tr><td>Capital</td><td>₹5 Crore</td></tr>
                        <tr><td>Net Worth</td><td>Equal to capital</td></tr>
                        <tr><td>Principal Officer</td><td>Qualified &amp; certified</td></tr>
                        <tr><td>Directors</td><td>Fit &amp; Proper</td></tr>
                        <tr><td>Infrastructure</td><td>Adequate office &amp; IT systems</td></tr>
                        <tr><td>Business Plan</td><td>3-year projection required</td></tr>
                    </tbody>
                </table>
                <p>
                    Composite Insurance Broker Registration in India requires a robust governance framework.
                </p>
            </section>

            {/* ==================== FIT AND PROPER ==================== */}
            <section id="fit-and-proper">
                <h2>Fit and Proper Criteria</h2>
                <p>Directors, Principal Officer and key managerial personnel must:</p>
                <ul>
                    <li>Have integrity and reputation</li>
                    <li>Have no economic offence record</li>
                    <li>Not be declared insolvent</li>
                    <li>Not be disqualified under Companies Act</li>
                    <li>Have relevant insurance or financial services background</li>
                </ul>
                <p>
                    IRDAI evaluates promoter credibility carefully before granting Composite Insurance Broker Registration
                    in India.
                </p>
            </section>

            {/* ==================== BUSINESS PLAN ==================== */}
            <section id="business-plan">
                <h2>Business Plan Requirement (3-Year Projection)</h2>
                <p>Composite Insurance Broker Registration in India requires submission of:</p>
                <ul>
                    <li>Revenue projections</li>
                    <li>Expense forecast</li>
                    <li>Break-even analysis</li>
                    <li>Branch expansion plan</li>
                    <li>Human resource structure</li>
                    <li>Product line strategy</li>
                </ul>
                <div className="info-box">
                    <strong>3-Year Business Projection Structure:</strong>
                    <ul>
                        <li><strong>Year 1</strong> – Setup &amp; Compliance Stabilisation</li>
                        <li><strong>Year 2</strong> – Revenue Scaling</li>
                        <li><strong>Year 3</strong> – Profit Optimisation</li>
                    </ul>
                </div>
                <p>A professionally structured business plan significantly improves approval probability.</p>
            </section>

            {/* ==================== INFRASTRUCTURE ==================== */}
            <section id="infrastructure">
                <h2>Infrastructure Requirements</h2>
                <p>Composite Insurance Broker Registration in India requires:</p>
                <ul>
                    <li>Dedicated office premises</li>
                    <li>Trained manpower</li>
                    <li>IT systems with data security</li>
                    <li>Client record maintenance system</li>
                    <li>Grievance redressal mechanism</li>
                    <li>Compliance officer framework</li>
                </ul>
            </section>

            {/* ==================== DOCUMENTS ==================== */}
            <section id="documents">
                <h2>Documents Required for Composite Insurance Broker Registration in India</h2>
                <table className="data-table">
                    <thead>
                        <tr><th>Document Category</th><th>Key Documents</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Corporate</td><td>MOA, AOA, Certificate of Incorporation</td></tr>
                        <tr><td>Financial</td><td>CA certificate of capital, Net worth certificate</td></tr>
                        <tr><td>Promoter</td><td>KYC, background declaration</td></tr>
                        <tr><td>Principal Officer</td><td>Qualification proof, training certificate</td></tr>
                        <tr><td>Infrastructure</td><td>Office proof, IT details</td></tr>
                        <tr><td>Business Plan</td><td>3-year projection</td></tr>
                        <tr><td>Declarations</td><td>Fit &amp; Proper forms</td></tr>
                    </tbody>
                </table>
                <p>Documentation must be precise and aligned with the application form.</p>
            </section>

            {/* ==================== PROCESS ==================== */}
            <section id="process">
                <h2>Registration Process – Step-by-Step</h2>
                <div className="step-timeline">
                    {[
                        { label: "Step 1", title: "Company Incorporation" },
                        { label: "Step 2", title: "Capital Infusion" },
                        { label: "Step 3", title: "Principal Officer Qualification" },
                        { label: "Step 4", title: "Documentation Compilation" },
                        { label: "Step 5", title: "Online Application Filing" },
                        { label: "Step 6", title: "IRDAI Scrutiny" },
                        { label: "Step 7", title: "Clarification / Query Response" },
                        { label: "Step 8", title: "In-Principle Approval" },
                        { label: "Step 9", title: "Final Registration Certificate" },
                    ].map((step, i) => (
                        <div key={i} className="step-item">
                            <div className="step-dot" />
                            <div className="step-card">
                                <div className="step-label">{step.label}</div>
                                <div style={{ fontWeight: 600, color: "#0a1628" }}>{step.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==================== TIMELINE ==================== */}
            <section id="timeline">
                <h2>Timeline for Approval</h2>
                <p>Composite Insurance Broker Registration in India generally takes:</p>
                <ul>
                    <li>4 to 8 months depending on documentation quality</li>
                    <li>Delay may occur if queries are not properly addressed</li>
                </ul>
                <p>Professional structuring reduces processing time.</p>
            </section>

            {/* ==================== FEES ==================== */}
            <section id="fees">
                <h2>Government Fees for Composite Insurance Broker Registration in India</h2>

                <h3>Application Fee</h3>
                <p>Non-refundable application fee as prescribed under regulations.</p>

                <h3>Registration Fee</h3>
                <p>Higher than direct broker category.</p>

                <h3>Renewal Fee</h3>
                <p>Payable before expiry of licence period.</p>

                <table className="data-table">
                    <thead>
                        <tr><th>Fee Type</th><th>Applicable Stage</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Application Fee</td><td>At filing</td></tr>
                        <tr><td>Registration Fee</td><td>Before certificate issuance</td></tr>
                        <tr><td>Renewal Fee</td><td>Before expiry</td></tr>
                    </tbody>
                </table>
                <p>Exact fee amounts must be aligned with current regulatory schedule at the time of filing.</p>

                <h3>Schedule-Based Fee Structure</h3>
                <p>
                    Under the IRDAI (Insurance Brokers) Regulations, 2018, fees applicable to Composite Insurance Broker
                    Registration in India are structured as follows:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount (₹)</th>
                            <th>Stage of Payment</th>
                            <th>Refundable</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Application Fee</td><td>1,00,000</td><td>At the time of filing application</td><td>No</td></tr>
                        <tr><td>Registration Fee</td><td>2,50,000</td><td>Before issuance of certificate</td><td>No</td></tr>
                        <tr><td>Renewal Fee</td><td>2,50,000</td><td>Before expiry of registration</td><td>No</td></tr>
                    </tbody>
                </table>
                <p>
                    These fees are prescribed in the Schedule of the Regulations and must be paid through approved banking
                    channels.
                </p>
                <div className="warning-box">
                    <strong>Non-payment or delayed renewal fee may lead to lapse or suspension of Composite Insurance Broker Registration in India.</strong>
                </div>
            </section>

            {/* ==================== CERTIFICATE ==================== */}
            <section id="certificate">
                <h2>Certificate Granted After Approval</h2>
                <p>Upon successful Composite Insurance Broker Registration in India, IRDAI issues:</p>
                <ul>
                    <li>Registration Certificate</li>
                    <li>Unique Broker Code</li>
                    <li>Category Mentioned as &ldquo;Composite Broker&rdquo;</li>
                </ul>
                <p>This enables nationwide insurance broking operations.</p>
            </section>

            {/* ==================== PI INSURANCE ==================== */}
            <section id="pi-insurance">
                <h2>Professional Indemnity Insurance Requirement</h2>
                <p>
                    Professional Indemnity (PI) Insurance is mandatory for Composite Insurance Broker Registration in
                    India.
                </p>

                <h3>Minimum Cover Requirement</h3>
                <table className="data-table">
                    <thead>
                        <tr><th>Category</th><th>Minimum Limit of Indemnity</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Composite Broker</td><td>₹5 Crore</td></tr>
                    </tbody>
                </table>

                <p>Additional conditions:</p>
                <ul>
                    <li>Policy must be maintained continuously</li>
                    <li>Cover must extend to errors, omissions, negligence and employee misconduct</li>
                    <li>Any break in coverage is a regulatory violation</li>
                </ul>
                <div className="warning-box">
                    <strong>Failure to maintain PI insurance can result in regulatory action.</strong>
                </div>
            </section>

            {/* ==================== COMMISSION ==================== */}
            <section id="commission">
                <h2>Remuneration &amp; Commission Framework</h2>
                <p>
                    Composite Insurance Broker Registration in India permits earning brokerage as per limits prescribed by
                    IRDAI.
                </p>
                <p>Brokers must:</p>
                <ul>
                    <li>Adhere to commission caps notified by IRDAI</li>
                    <li>Avoid rebating</li>
                    <li>Maintain transparency in client disclosure</li>
                    <li>Ensure fair market conduct</li>
                </ul>
                <p>Improper commission structuring is a common inspection trigger.</p>
            </section>

            {/* ==================== POST COMPLIANCE ==================== */}
            <section id="post-compliance">
                <h2>Post-Registration Compliance Framework</h2>
                <p>Composite Insurance Broker Registration in India involves continuous obligations.</p>

                <h3>Annual Compliance</h3>
                <table className="data-table">
                    <thead>
                        <tr><th>Compliance</th><th>Frequency</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Annual Return Filing</td><td>Annual</td></tr>
                        <tr><td>Auditor Certificate</td><td>Annual</td></tr>
                        <tr><td>Net Worth Certificate</td><td>Annual</td></tr>
                        <tr><td>Professional Indemnity Insurance</td><td>Continuous</td></tr>
                    </tbody>
                </table>

                <h3>Ongoing Compliance</h3>
                <ul>
                    <li>Maintenance of books</li>
                    <li>Client money segregation</li>
                    <li>Code of conduct adherence</li>
                    <li>Record retention</li>
                    <li>Grievance reporting</li>
                </ul>

                <div className="info-box">
                    <strong>Post-Registration Compliance Cycle:</strong>
                    <br />
                    Quarterly Review → Annual Filing → Net Worth Certification → Internal Audit → Repeat
                </div>
            </section>

            {/* ==================== COMPLIANCE CALENDAR ==================== */}
            <section id="compliance-calendar">
                <h2>📅 Compliance Calendar – Composite Insurance Broker Registration in India</h2>

                <h3>🟦 A. Annual Compliances</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Compliance Requirement</th>
                            <th>Due Timeline</th>
                            <th>Reference Basis</th>
                            <th>Responsibility</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Filing of Annual Return with IRDAI</td><td>Within prescribed timeline after FY end</td><td>IRDAI Regulations</td><td>Compliance Officer</td><td>Includes business data &amp; financial disclosures</td></tr>
                        <tr><td>2</td><td>Submission of Audited Financial Statements</td><td>Annually</td><td>Regulatory reporting requirement</td><td>Statutory Auditor / CFO</td><td>Balance Sheet, P&amp;L, Schedules</td></tr>
                        <tr><td>3</td><td>Net Worth Certificate</td><td>Annually</td><td>Capital maintenance requirement</td><td>Chartered Accountant</td><td>Must confirm ₹5 Crore minimum</td></tr>
                        <tr><td>4</td><td>Professional Indemnity Insurance Renewal</td><td>Before policy expiry</td><td>Mandatory under Regulations</td><td>Management</td><td>Minimum ₹5 Crore cover</td></tr>
                        <tr><td>5</td><td>Renewal of Registration</td><td>Before expiry of licence period</td><td>Registration validity clause</td><td>Board / Compliance</td><td>Fee payable to IRDAI</td></tr>
                        <tr><td>6</td><td>Board Review of Compliance Status</td><td>At least annually</td><td>Governance best practice</td><td>Board of Directors</td><td>Recommended documented review</td></tr>
                    </tbody>
                </table>

                <h3>🟦 B. Quarterly Compliances</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Compliance Requirement</th>
                            <th>Frequency</th>
                            <th>Responsibility</th>
                            <th>Key Focus Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Internal Compliance Review</td><td>Quarterly</td><td>Compliance Officer</td><td>Capital, net worth, deposit status</td></tr>
                        <tr><td>2</td><td>Client Money Reconciliation</td><td>Quarterly</td><td>Finance Team</td><td>Separate client account verification</td></tr>
                        <tr><td>3</td><td>Grievance Status Review</td><td>Quarterly</td><td>Principal Officer</td><td>Pending complaints &amp; resolution timeline</td></tr>
                        <tr><td>4</td><td>Commission Structure Review</td><td>Quarterly</td><td>Management</td><td>Ensure within IRDAI limits</td></tr>
                        <tr><td>5</td><td>PI Insurance Adequacy Review</td><td>Quarterly</td><td>Compliance</td><td>Ensure coverage is adequate</td></tr>
                    </tbody>
                </table>

                <h3>🟦 C. Monthly Monitoring Items</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Monitoring Area</th>
                            <th>Frequency</th>
                            <th>Responsible Person</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Net Worth Monitoring</td><td>Monthly</td><td>CFO</td><td>Prevent capital erosion</td></tr>
                        <tr><td>2</td><td>Bank Deposit Confirmation (10% Capital)</td><td>Monthly</td><td>Finance Head</td><td>Must remain lien-marked</td></tr>
                        <tr><td>3</td><td>Client Segregated Account Check</td><td>Monthly</td><td>Accounts Team</td><td>No intermixing allowed</td></tr>
                        <tr><td>4</td><td>Business Premium Data Compilation</td><td>Monthly</td><td>Operations</td><td>Required for annual filing</td></tr>
                        <tr><td>5</td><td>Regulatory Circular Review</td><td>Monthly</td><td>Compliance Officer</td><td>Track IRDAI updates</td></tr>
                    </tbody>
                </table>

                <h3>🟦 D. Event-Based Compliances</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Event Trigger</th>
                            <th>Compliance Action</th>
                            <th>Timeline</th>
                            <th>Authority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Change in Director</td><td>Intimation to IRDAI</td><td>Promptly after change</td><td>IRDAI</td></tr>
                        <tr><td>Change in Principal Officer</td><td>Approval / Intimation</td><td>Before / Immediately after appointment</td><td>IRDAI</td></tr>
                        <tr><td>Change in Shareholding Pattern</td><td>Prior approval if required</td><td>Before implementation</td><td>IRDAI</td></tr>
                        <tr><td>Branch Opening</td><td>Intimation to IRDAI</td><td>Before / After opening as prescribed</td><td>IRDAI</td></tr>
                        <tr><td>Capital Increase / Reduction</td><td>Regulatory compliance</td><td>Before effect</td><td>IRDAI</td></tr>
                        <tr><td>PI Insurance Change</td><td>Intimation</td><td>Immediately</td><td>IRDAI</td></tr>
                        <tr><td>Office Address Change</td><td>Intimation</td><td>Promptly</td><td>IRDAI</td></tr>
                    </tbody>
                </table>

                <h3>🟦 E. Ongoing Continuous Obligations</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance Area</th>
                            <th>Requirement</th>
                            <th>Risk if Ignored</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Maintain ₹5 Crore Net Worth</td><td>Continuous</td><td>Suspension risk</td></tr>
                        <tr><td>Maintain 10% Deposit</td><td>Continuous</td><td>Regulatory violation</td></tr>
                        <tr><td>Maintain PI Insurance</td><td>Continuous</td><td>Licence action</td></tr>
                        <tr><td>Maintain Books of Accounts</td><td>Continuous</td><td>Inspection risk</td></tr>
                        <tr><td>Follow Code of Conduct</td><td>Continuous</td><td>Penalty</td></tr>
                        <tr><td>Maintain Grievance Mechanism</td><td>Continuous</td><td>Supervisory action</td></tr>
                    </tbody>
                </table>

                <h3>🟦 F. Inspection Readiness Checklist</h3>
                <table className="data-table">
                    <thead>
                        <tr><th>Area</th><th>Internal Check</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Capital &amp; Net Worth</td><td>Verified monthly</td></tr>
                        <tr><td>Deposit Certificate</td><td>Available</td></tr>
                        <tr><td>PI Policy</td><td>Valid copy on record</td></tr>
                        <tr><td>Client Money Records</td><td>Segregated accounts</td></tr>
                        <tr><td>Commission Records</td><td>Within limits</td></tr>
                        <tr><td>Complaint Register</td><td>Updated</td></tr>
                        <tr><td>Board Minutes</td><td>Compliance review noted</td></tr>
                        <tr><td>Regulatory Correspondence</td><td>Properly archived</td></tr>
                    </tbody>
                </table>
            </section>

            {/* ==================== INSPECTION ==================== */}
            <section id="inspection">
                <h2>Inspection &amp; Supervisory Powers of IRDAI</h2>
                <p>IRDAI may:</p>
                <ul>
                    <li>Conduct onsite inspection</li>
                    <li>Seek books and records</li>
                    <li>Examine commission structures</li>
                    <li>Review grievance records</li>
                    <li>Investigate compliance breaches</li>
                </ul>
                <p>
                    Composite Insurance Broker Registration in India remains under active supervisory review at all times.
                </p>
            </section>

            {/* ==================== SUSPENSION ==================== */}
            <section id="suspension">
                <h2>Grounds for Suspension or Cancellation</h2>
                <p>Composite Insurance Broker Registration in India may be suspended for:</p>
                <ul>
                    <li>Capital erosion</li>
                    <li>Misrepresentation</li>
                    <li>Code of conduct violation</li>
                    <li>Non-maintenance of deposit</li>
                    <li>Failure to submit returns</li>
                </ul>
                <p>Regulatory discipline is strictly enforced.</p>

                <h3>Detailed Suspension &amp; Cancellation Triggers</h3>
                <table className="data-table">
                    <thead>
                        <tr><th>Trigger</th><th>Regulatory Consequence</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Capital erosion</td><td>Suspension notice</td></tr>
                        <tr><td>False information</td><td>Cancellation</td></tr>
                        <tr><td>PI Insurance lapse</td><td>Immediate violation</td></tr>
                        <tr><td>Code of Conduct breach</td><td>Monetary penalty</td></tr>
                        <tr><td>Repeated non-compliance</td><td>Registration cancellation</td></tr>
                    </tbody>
                </table>
                <p>
                    Composite Insurance Broker Registration in India requires disciplined governance culture.
                </p>
            </section>

            {/* ==================== PENALTIES ==================== */}
            <section id="penalties">
                <h2>Penalties for Non-Compliance</h2>
                <p>Penalties may include:</p>
                <ul>
                    <li>Monetary penalty</li>
                    <li>Suspension of licence</li>
                    <li>Cancellation</li>
                    <li>Debarment of Principal Officer</li>
                </ul>
                <p>Proper governance reduces regulatory exposure.</p>
            </section>

            {/* ==================== COMMON MISTAKES ==================== */}
            <section id="common-mistakes">
                <h2>Common Mistakes in Composite Insurance Broker Registration in India</h2>
                <ul>
                    <li>Weak business plan</li>
                    <li>Improper object clause drafting</li>
                    <li>Inadequate capital structuring</li>
                    <li>Non-qualified Principal Officer</li>
                    <li>Incomplete documentation</li>
                    <li>Poor response to IRDAI queries</li>
                </ul>
                <p>Strategic regulatory structuring improves approval certainty.</p>

                <h3>Why Professional Structuring Matters</h3>
                <p>
                    Composite Insurance Broker Registration in India is not a mere filing exercise. It is a regulatory
                    approval process requiring:
                </p>
                <ul>
                    <li>Capital planning</li>
                    <li>Governance structuring</li>
                    <li>Documentation precision</li>
                    <li>Risk framework design</li>
                </ul>
                <p>As rightly stated:</p>
                <div className="expert-quote">
                    <blockquote>
                        &ldquo;Regulatory approval is never about paperwork alone. It reflects the regulator&apos;s confidence
                        in the governance culture of the applicant.&rdquo;
                    </blockquote>
                    <cite>— CS Devyani Khambhati, Compliance Expert</cite>
                </div>
            </section>

            {/* ==================== COMPARISON ==================== */}
            <section id="comparison">
                <h2>Comparison – Direct vs Composite Broker</h2>
                <table className="data-table">
                    <thead>
                        <tr><th>Parameter</th><th>Direct Broker</th><th>Composite Broker</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Capital</td><td>Lower</td><td>₹5 Crore</td></tr>
                        <tr><td>Scope</td><td>Single line</td><td>Multi-line</td></tr>
                        <tr><td>Reinsurance</td><td>Not permitted</td><td>Permitted</td></tr>
                        <tr><td>Business Complexity</td><td>Moderate</td><td>High</td></tr>
                        <tr><td>Compliance Burden</td><td>Medium</td><td>High</td></tr>
                    </tbody>
                </table>
                <p>Composite Insurance Broker Registration in India is suitable only for serious long-term promoters.</p>
            </section>

            {/* ==================== ADVANCED COMPARISON ==================== */}
            <section id="advanced-comparison">
                <h2>Advanced Comparison – Direct vs Reinsurance vs Composite</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Direct</th>
                            <th>Reinsurance</th>
                            <th>Composite</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Capital</td><td>Lower</td><td>Higher</td><td>₹5 Crore</td></tr>
                        <tr><td>Net Worth</td><td>Equal to capital</td><td>Equal</td><td>Equal</td></tr>
                        <tr><td>PI Cover</td><td>₹50 Lakh</td><td>₹2.5 Crore</td><td>₹5 Crore</td></tr>
                        <tr><td>Operational Scope</td><td>Limited</td><td>Reinsurance only</td><td>Full spectrum</td></tr>
                        <tr><td>Compliance Intensity</td><td>Moderate</td><td>High</td><td>Very High</td></tr>
                    </tbody>
                </table>
                <p>Composite Insurance Broker Registration in India is the most comprehensive category.</p>
            </section>

            {/* ==================== PRINCIPAL OFFICER ==================== */}
            <section id="principal-officer">
                <h2>Principal Officer – Qualification &amp; Responsibility</h2>
                <p>
                    Composite Insurance Broker Registration in India mandates appointment of a Principal Officer who:
                </p>
                <ul>
                    <li>Holds prescribed insurance qualifications</li>
                    <li>Has completed IRDAI-approved training</li>
                    <li>Has cleared broker examination</li>
                    <li>Is responsible for compliance and supervision</li>
                </ul>
                <div className="warning-box">
                    <strong>The Principal Officer is personally accountable for regulatory adherence.</strong>
                </div>
            </section>

            {/* ==================== BRANCH EXPANSION ==================== */}
            <section id="branch-expansion">
                <h2>Branch Expansion After Composite Insurance Broker Registration in India</h2>
                <p>Expansion into additional branches requires:</p>
                <ul>
                    <li>Board approval</li>
                    <li>Intimation to IRDAI</li>
                    <li>Compliance with infrastructure norms</li>
                    <li>Adequate staffing</li>
                </ul>
                <p>
                    Composite Insurance Broker Registration in India supports nationwide operations subject to regulatory
                    reporting.
                </p>
            </section>

            {/* ==================== OPERATIONAL STRUCTURE ==================== */}
            <section id="operational-structure">
                <h2>Operational Structure for Composite Insurance Broker Registration in India</h2>
                <div className="info-box">
                    <strong>Operational Model:</strong>
                    <br />
                    Promoter Capital → Governance Board → Principal Officer → Broking Team → Compliance Unit → Audit →
                    Client Advisory → Insurer Interface
                </div>
                <p>Strong internal segregation improves regulatory comfort.</p>
            </section>

            {/* ==================== RISK AREAS ==================== */}
            <section id="risk-areas">
                <h2>Risk Areas Promoters Often Underestimate</h2>
                <ul>
                    <li>Continuous net worth monitoring</li>
                    <li>Commission transparency</li>
                    <li>Employee training compliance</li>
                    <li>Data privacy management</li>
                    <li>Internal audit documentation</li>
                </ul>
                <div className="warning-box">
                    <strong>
                        Composite Insurance Broker Registration in India is compliance-intensive and requires systems, not
                        shortcuts.
                    </strong>
                </div>
            </section>

            {/* ==================== FINANCIAL PLANNING ==================== */}
            <section id="financial-planning">
                <h2>Financial Planning Model for Composite Insurance Broker Registration in India</h2>

                <h3>3-Year Financial Projection Template Structure</h3>

                <h4>Revenue Assumptions</h4>
                <ul>
                    <li>Life segment premium mobilisation</li>
                    <li>General insurance portfolio</li>
                    <li>Reinsurance placement income</li>
                    <li>Advisory fees</li>
                </ul>

                <h4>Expense Heads</h4>
                <ul>
                    <li>Salary &amp; manpower</li>
                    <li>Technology &amp; CRM</li>
                    <li>Regulatory compliance</li>
                    <li>PI insurance premium</li>
                    <li>Marketing cost</li>
                </ul>

                <h4>Capital Buffer Planning</h4>
                <p>Maintain net worth cushion beyond ₹5 Crore to avoid erosion risk.</p>
            </section>

            {/* ==================== GOVERNANCE ADVISORY ==================== */}
            <section id="governance-advisory">
                <h2>Advanced Governance Advisory</h2>
                <p>Promoters should establish:</p>
                <ul>
                    <li>Risk management committee</li>
                    <li>Internal compliance monitoring framework</li>
                    <li>Quarterly board compliance review</li>
                    <li>Regulatory reporting dashboard</li>
                </ul>
                <p>A structured compliance culture strengthens licence sustainability.</p>
            </section>

            {/* ==================== CONCLUSION ==================== */}
            <section id="conclusion">
                <h2>Conclusion</h2>
                <p>
                    Composite Insurance Broker Registration in India is the most comprehensive insurance intermediary
                    licence under Indian regulatory framework. It allows life, general and reinsurance operations under one
                    umbrella but demands strong capital backing, governance integrity and ongoing compliance discipline.
                </p>
                <p>
                    Promoters must approach Composite Insurance Broker Registration in India with long-term strategic
                    intent rather than short-term revenue expectations. A properly structured application, backed by
                    realistic financial projection and governance clarity, significantly enhances regulatory comfort.
                </p>
                <p>
                    If you are planning to build a full-scale insurance broking house, Composite Insurance Broker
                    Registration in India is the correct regulatory foundation — provided it is executed with precision.
                </p>
            </section>

            {/* ==================== FAQS ==================== */}
            <section id="faqs">
                <h2>Frequently Asked Questions</h2>
                <p>
                    A comprehensive set of 200 questions covering every aspect of Composite Insurance Broker Registration
                    in India — from general overview to advanced practical scenarios.
                </p>

                {faqGroups.map((group, gi) => (
                    <div key={gi}>
                        <h3>{group.title}</h3>
                        <div className="faq-accordion">
                            {group.items.map((faq, fi) => (
                                <details key={fi} className="faq-item">
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
