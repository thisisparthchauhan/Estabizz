"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What Are GST Appeal Services" },
        { id: "appellate-hierarchy", title: "3. GST Appellate Hierarchy" },
        { id: "who-can-appeal", title: "4. Who Can File a GST Appeal" },
        { id: "time-limits", title: "5. Time Limits for GST Appeals" },
        { id: "pre-deposit", title: "6. Pre-Deposit Requirements" },
        { id: "grounds", title: "7. Common Grounds for GST Appeal" },
        { id: "forms", title: "8. GST Appeal Forms" },
        { id: "process", title: "9. Step-by-Step Appeal Filing Process" },
        { id: "documents", title: "10. Documents Required" },
        { id: "fees", title: "11. Fees &amp; Professional Charges" },
        { id: "timeline", title: "12. GST Appeal Timeline" },
        { id: "common-mistakes", title: "13. Common Mistakes to Avoid" },
        { id: "appeal-vs-revision", title: "14. GST Appeal vs GST Revision" },
        { id: "post-appeal", title: "15. Post-Appeal Compliance" },
        { id: "faq", title: "16. Frequently Asked Questions" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "What is a GST appeal and when should I file one?", a: "A GST appeal is the statutory legal remedy available under the CGST Act 2017 to challenge an order passed by a GST adjudicating authority. You should file an appeal when you disagree with a tax demand, penalty, interest charge, refund rejection, or registration cancellation order. The appeal must be filed within 3 months of receiving the order." },
        { q: "What is the pre-deposit requirement for a GST appeal?", a: "To file an appeal before the Appellate Authority (Commissioner Appeals), you must deposit 10% of the disputed tax amount as pre-deposit. For appeals to the GST Appellate Tribunal (GSTAT), pre-deposit is 20% of the disputed tax (in addition to the Appellate Authority's pre-deposit). The pre-deposit is adjusted against the final order — refunded if you win, adjusted if you lose." },
        { q: "Can I get a stay on a GST demand during the appeal?", a: "Yes. On filing an appeal and paying the mandatory pre-deposit, the recovery of the remaining disputed amount is stayed automatically until the appeal is decided. The appellate authority may also grant a stay on specific grounds. However, the pre-deposit amount cannot be stayed — it must be paid upfront before filing." },
        { q: "What is Form GST APL-01 and who files it?", a: "Form GST APL-01 is filed by a taxpayer (aggrieved person) to appeal against an order passed by the adjudicating authority to the Appellate Authority (Commissioner Appeals) under Section 107 of the CGST Act. It must be filed online through the GST portal. After filing, Form GST APL-02 is the Acknowledgement issued by the Appellate Authority." },
        { q: "What happens if I miss the 3-month appeal deadline?", a: "If you miss the 3-month limit, you can still file an appeal with a condonation of delay application under Section 107(4) of CGST Act. The Appellate Authority can condone delay up to 1 month (total 4 months) if sufficient cause is shown. Beyond 4 months, no appeal can be filed before the Appellate Authority — however, you may explore a writ petition before the High Court in exceptional circumstances." },
        { q: "Can the GST Department also file an appeal?", a: "Yes. The GST Department can file a departmental appeal against orders it considers erroneous or favourable to the taxpayer. The Proper Officer files the appeal within 6 months of the order using Form GST APL-03. Departmental appeals can be filed at any appellate level including the GST Appellate Tribunal, High Court, and Supreme Court." },
        { q: "What is the GST Appellate Tribunal (GSTAT) and is it operational?", a: "GSTAT is the second tier of GST appeal established under Section 109 of the CGST Act. It handles appeals against orders of the Appellate Authority (Commissioner Appeals). As of 2026, GSTAT is in the process of being constituted following the GST (Amendment) Act 2023. Principal Bench is at New Delhi and State Benches are being established. Until GSTAT is operational, petitions against AA orders are being heard by High Courts through writ jurisdiction." },
        { q: "Can I file a GST appeal for an ITC (Input Tax Credit) disallowance?", a: "Yes. ITC disallowance is one of the most common grounds for GST appeals. Grounds include: ITC denied due to GSTR-2A / 2B mismatch, ITC availed on exempt supplies, ITC reversal demands under Rule 42/43, ITC denied due to supplier non-compliance, and ITC blocked under Section 17(5). The appeal process is identical to any other tax demand — APL-01, pre-deposit 10%, and submission of supporting invoices and reconciliation data." },
        { q: "What is the difference between a GST Show Cause Notice (SCN), Adjudication Order, and Appeal Order?", a: "SCN (Show Cause Notice) is the starting point — the department alleges a violation and gives the taxpayer an opportunity to respond. The Adjudication Order is the order passed after hearing the taxpayer's reply to the SCN. If the taxpayer disagrees with the Adjudication Order, they file an Appeal, which results in an Appeal Order. Each stage must be exhausted in sequence before moving to the next level." },
        { q: "Can I settle a GST dispute without going through the full appeal process?", a: "Yes. The GST Amnesty Scheme and GST Settlement provisions under the CGST Act allow settlement in certain cases. Section 54 provides for refunds, and the Finance Act 2024 introduced the Vivad Se Vishwas-II scheme for settling pending GST demands by paying the principal demand with reduced interest and waiver of penalties. Consult a GST professional to evaluate settlement vs. appeal based on the merits of your case." },
        { q: "How do I prepare grounds of appeal for a GST case?", a: "Grounds of appeal must clearly state: (1) the specific error in the order being challenged — factual or legal, (2) applicable provisions of CGST Act / Rules being misapplied, (3) precedents / judicial decisions supporting your position, (4) specific relief sought. Grounds should be drafted with precision — vague or generic grounds are not entertained. Professional assistance from a GST lawyer or CS is strongly recommended." },
        { q: "What documents are most important for a GST appeal?", a: "Critical documents include: copy of the impugned order, SCN and reply filed, GSTR-1, GSTR-3B, and GSTR-2A/2B reconciliation for the period, all invoices and purchase records, e-way bills, payment challans, bank statements showing payment of tax, any prior communications with the GST department, and legal brief with grounds of appeal. Missing documents can significantly weaken your appeal." },
        { q: "Is GST appeal different from GST revision?", a: "Yes. GST Appeal (Section 107) is filed by a taxpayer or the department against an order of the adjudicating authority to the Appellate Authority. GST Revision (Section 108) is invoked by the Revisional Authority (Commissioner or Principal Commissioner) suo motu or on application, to revise any order which is erroneous and prejudicial to the interests of revenue. Revision can be invoked even when no appeal is pending." },
        { q: "What is the monetary threshold for departmental appeals at different levels?", a: "The GST Council has prescribed monetary thresholds below which the department should NOT file appeals: ₹20 lakh for Appellate Authority; ₹1 crore for GSTAT; ₹2 crore for High Court; ₹2 crore for Supreme Court. These thresholds are to reduce frivolous departmental appeals but do not apply to taxpayer-initiated appeals, which can be filed for any amount." },
        { q: "Can a GST appeal be filed for a refund rejection?", a: "Yes. Refund rejection orders under Section 54 of the CGST Act are appealable. The taxpayer files Form GST APL-01 against the rejection order within 3 months. Pre-deposit is not required for refund appeals since there is no tax demand. Common grounds include: wrong rejection of zero-rated supply refunds, ITC refund rejections, excess tax payment refunds, and export refund rejections." },
        { q: "What is the difference between an ex-parte order and a contested order in GST?", a: "An ex-parte order is passed without the taxpayer appearing or responding to the SCN. A contested order is passed after the taxpayer has participated in the hearing. Both are appealable. For ex-parte orders, the taxpayer can also file a recall application to the same adjudicating authority if they can show sufficient cause for non-appearance, which may be faster than going through the full appeal process." },
        { q: "How much does professional GST appeal assistance cost?", a: "Professional fees for GST appeal services range widely: for simple appeals below ₹5 lakh disputed amount: ₹10,000–₹25,000; for complex matters from ₹5 lakh to ₹50 lakh: ₹25,000–₹1,00,000; for large disputes above ₹50 lakh: ₹1,00,000–₹5,00,000+. Representation before GSTAT or High Court by a lawyer involves significantly higher retainer fees. Choose professionals with a track record in GST appellate proceedings." },
        { q: "Can I appeal against a GST registration cancellation order?", a: "Yes. Cancellation of GST registration is an appealable order. File Form GST APL-01 within 3 months before the Appellate Authority. You can also apply for revocation of cancellation under Section 30 of CGST Act within 90 days if the cancellation was on account of non-filing of returns (which is a separate and faster route than appeal). Both options should be evaluated based on the grounds for cancellation." },
        { q: "What is the role of a GST consultant or CS in an appeal?", a: "A GST consultant or Company Secretary (CS) plays a critical role: (1) analysing the impugned order and identifying appealable errors, (2) drafting grounds of appeal with legal precision and supporting case laws, (3) collecting and organising documentary evidence, (4) representing the taxpayer before the Appellate Authority (authorised representatives can appear), (5) monitoring appeal status on GST portal, and (6) advising on pre-deposit strategy and recovery stay." },
        { q: "Is interest on delayed tax payment waived if I win a GST appeal?", a: "If you win the appeal fully and the demand is set aside, the pre-deposit is refunded with interest at 6% per annum under Section 115 of the CGST Act if not refunded within 90 days of the appeal order. If the demand is partially upheld, interest is payable only on the confirmed demand amount. Interest waiver on the entire demand applies if the demand itself is set aside." },
        { q: "What is the penalty relief available in GST appeals?", a: "Under Section 74A inserted by Finance Act 2024 (effective FY 2024-25 onwards), penalties are capped at 10% of the tax for cases not involving fraud, suppression, or wilful misstatement. The Demand Limitation Period is also restructured. For pre-GST periods, the Vivad Se Vishwas scheme offers penalty waiver on settlement of principal demand. In appeal proceedings, authorities have discretion to reduce penalties on merits — penalty reduction is a common relief sought in GST appeals." },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "⚖️", label: "GST Appeal Services" },
                { emoji: "📋", label: "CGST Act 2017" },
                { emoji: "🏛️", label: "Appellate Authority" },
                { emoji: "🔍", label: "ITC Disputes" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "GST Appeal Services" },
            ]}
            title="GST Appeal Services India: Complete Guide to Filing GST Appeals, Pre-Deposit &amp; Winning Tax Disputes"
            readTime="18 min read"
            focusKeyword="GST Appeal Services India"
            sections={sections}
            ctaTitle="Fight Your GST Dispute with Expert Representation"
            ctaDescription="Our GST compliance team and legal experts have successfully handled 200+ GST appeals across Appellate Authority, High Court, and amnesty scheme settlements. From ITC disallowance to refund rejection to demand notices — we build strong, evidence-backed cases."
            quickFacts={[
                { label: "Governing Act", value: "CGST Act 2017 — Section 107" },
                { label: "Appellate Authority", value: "Commissioner (Appeals)" },
                { label: "Appeal Deadline", value: "3 months from order" },
                { label: "Pre-Deposit (AA)", value: "10% of disputed tax" },
                { label: "Pre-Deposit (GSTAT)", value: "20% of disputed tax" },
                { label: "Filing Form", value: "GST APL-01 (online)" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "Enterprise Services", href: "/services/enterprise-services", category: "Services", description: "End-to-end enterprise compliance including GST registration, ROC filings, and regulatory setup." },
                { title: "Legal Due Diligence", href: "/services/legal-due-diligence", category: "Services", description: "Comprehensive legal due diligence for transactions and regulatory compliance assessments." },
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "Complete guide to FEMA compliance for businesses dealing with foreign exchange." },
                { title: "Legal Process Outsourcing", href: "/services/legal-process-outsourcing", category: "Services", description: "Outsource legal drafting, compliance support, and document review to qualified professionals." },
            ]}
            finalCtaTitle="Don&apos;t Let a GST Order Go Unchallenged — Act Within 3 Months"
            finalCtaDescription="GST appeal deadlines are strict and pre-deposits are non-negotiable. Our team will evaluate your case, build your grounds of appeal, file within the deadline, and represent you before the Appellate Authority. Every rupee of wrongful demand deserves a proper legal challenge."
        >
            <section id="introduction">
                <h2>Introduction to GST Appeal Services</h2>
                <p>
                    GST (Goods and Services Tax), governed by the Central Goods and Services Tax Act 2017, is one of India&apos;s most complex tax regimes — spanning multiple transaction types, input tax credit conditions, reverse charge mechanisms, and cross-jurisdictional issues. When the GST department issues a demand notice, denies input tax credit, rejects a refund, or cancels a registration, businesses have a statutory right to challenge these orders through the GST appellate mechanism.
                </p>
                <p>
                    GST Appeal Services involve professional assistance in challenging GST orders before the appropriate appellate authority — preparing grounds of appeal, collecting evidence, computing pre-deposit obligations, filing the appeal form online, and representing the business before adjudicating and appellate authorities.
                </p>
                <div className="info-box">
                    <strong>Key Statistic:</strong> According to the GST Council data, over ₹1.6 lakh crore of GST demand is currently under litigation at various appellate levels. Approximately 65–70% of first-level appeals at the Appellate Authority level result in full or partial relief to taxpayers — making a well-prepared appeal one of the most effective tools for dispute resolution.
                </div>
                <p>
                    This guide covers the complete GST appellate framework — from understanding the hierarchy of appeals to filing timelines, pre-deposit requirements, and post-appeal compliance.
                </p>
            </section>

            <section id="what-is">
                <h2>What Are GST Appeal Services?</h2>
                <p>
                    GST Appeal Services refer to the end-to-end professional assistance provided to businesses and individuals who want to challenge orders passed under the CGST Act, SGST Act, IGST Act, or UTGST Act. These services cover:
                </p>
                <ul>
                    <li><strong>Order analysis:</strong> Reviewing the impugned order to identify factual errors, legal mistakes, and procedural irregularities</li>
                    <li><strong>Grounds drafting:</strong> Preparing precise, legally sound grounds of appeal supported by relevant case law and CGST provisions</li>
                    <li><strong>Pre-deposit calculation:</strong> Computing the mandatory pre-deposit amount and advising on payment strategy</li>
                    <li><strong>Online filing:</strong> Filing Form GST APL-01 through the GST portal within the prescribed 3-month deadline</li>
                    <li><strong>Documentary evidence:</strong> Compiling GSTR reconciliations, invoices, e-way bills, and payment records</li>
                    <li><strong>Representation:</strong> Appearing before the Appellate Authority on scheduled hearing dates</li>
                    <li><strong>Post-appeal compliance:</strong> Implementing appeal order, refund applications, and compliance setup</li>
                </ul>
            </section>

            <section id="appellate-hierarchy">
                <h2>GST Appellate Hierarchy</h2>
                <p>
                    The GST appellate structure is a multi-tiered quasi-judicial system. Each level must generally be exhausted before moving to the next:
                </p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Level 1</div>
                            <h4>Adjudicating Authority (Original Order)</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">The original GST officer — Deputy / Assistant / Joint Commissioner — who passes the demand order, penalty order, or refund rejection. This is not an appellate level but the starting point of the dispute.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Level 2</div>
                            <h4>Appellate Authority — Commissioner (Appeals) [Section 107]</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">First appellate forum. Form GST APL-01. Deadline: 3 months (extendable by 1 month). Pre-deposit: 10% of disputed tax. Decision timeline: ideally 1 year.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Level 3</div>
                            <h4>GST Appellate Tribunal (GSTAT) [Section 112]</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Second appellate forum for both factual and legal questions. Form GST APL-05. Pre-deposit: 20% of disputed tax (capped at ₹50 crore for CGST + ₹50 crore for SGST). Currently being constituted — HC writ petitions available in interim.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Level 4</div>
                            <h4>High Court [Section 117]</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Only on a substantial question of law (not pure factual disputes). No pre-deposit for HC appeals. Government has threshold of ₹2 crore for departmental appeals to HC.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Level 5</div>
                            <h4>Supreme Court [Section 118]</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Ultimate appellate authority for GST matters involving substantial questions of law. Government threshold for departmental SLP: ₹2 crore.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="who-can-appeal">
                <h2>Who Can File a GST Appeal?</h2>
                <p>The following parties can file a GST appeal under the CGST Act:</p>
                <ul>
                    <li><strong>Registered Taxpayers</strong> — Any GST-registered person aggrieved by an order of the adjudicating authority</li>
                    <li><strong>Unregistered Persons</strong> — Persons not required to be registered but impacted by a GST demand can also appeal</li>
                    <li><strong>Composition Scheme Dealers</strong> — Eligible to appeal against any order affecting their tax liability</li>
                    <li><strong>GST Department (Revenue)</strong> — Can file departmental appeals against orders it considers erroneous or revenue-unfavourable</li>
                    <li><strong>E-Commerce Operators</strong> — For TCS-related or supply-related orders</li>
                    <li><strong>Input Service Distributors (ISD)</strong> — Against ITC distribution orders</li>
                </ul>
                <div className="info-box">
                    <strong>Authorised Representatives:</strong> Taxpayers need not appear personally. An authorised representative — a GST practitioner, Chartered Accountant, Company Secretary, Cost Accountant, Advocate, or employee of the taxpayer — can appear and argue the appeal on behalf of the taxpayer.
                </div>
            </section>

            <section id="time-limits">
                <h2>Time Limits for Filing GST Appeals</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Appellate Level</th>
                            <th>Taxpayer Deadline</th>
                            <th>Department Deadline</th>
                            <th>Condonation Possible?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Appellate Authority (Commissioner Appeals)</td>
                            <td>3 months from order date</td>
                            <td>6 months from order date</td>
                            <td>Yes — up to 1 additional month</td>
                        </tr>
                        <tr>
                            <td>GST Appellate Tribunal (GSTAT)</td>
                            <td>3 months from AA order</td>
                            <td>6 months from AA order</td>
                            <td>Yes — at Tribunal&apos;s discretion</td>
                        </tr>
                        <tr>
                            <td>High Court</td>
                            <td>180 days from GSTAT order</td>
                            <td>180 days from GSTAT order</td>
                            <td>Yes — under Limitation Act</td>
                        </tr>
                        <tr>
                            <td>Supreme Court (SLP)</td>
                            <td>90 days from HC order</td>
                            <td>90 days from HC order</td>
                            <td>Yes — at SC&apos;s discretion</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Critical Warning:</strong> Missing the 3-month appeal deadline (or 4-month maximum with condonation) at the Appellate Authority level means you permanently lose the right to appeal that order through the statutory route. Once time-barred, the only option is a writ petition before the High Court, which is more difficult and expensive. Always file the appeal well within the deadline.
                </div>
            </section>

            <section id="pre-deposit">
                <h2>Pre-Deposit Requirements</h2>
                <p>
                    Under Section 107(6) and 112(8) of the CGST Act, a mandatory pre-deposit must be paid before an appeal can be entertained:
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Appellate Level</th>
                            <th>Pre-Deposit Required</th>
                            <th>Cap</th>
                            <th>Recovery Stay on Balance?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Appellate Authority (AA)</td>
                            <td>10% of disputed tax (CGST + SGST / IGST)</td>
                            <td>₹25 crore CGST + ₹25 crore SGST</td>
                            <td>Yes — balance stayed during appeal</td>
                        </tr>
                        <tr>
                            <td>GST Appellate Tribunal (GSTAT)</td>
                            <td>20% of disputed tax (in addition to AA&apos;s)</td>
                            <td>₹50 crore CGST + ₹50 crore SGST</td>
                            <td>Yes — balance stayed during appeal</td>
                        </tr>
                        <tr>
                            <td>High Court</td>
                            <td>No mandatory pre-deposit</td>
                            <td>—</td>
                            <td>At HC discretion (interim stay)</td>
                        </tr>
                        <tr>
                            <td>Supreme Court</td>
                            <td>No mandatory pre-deposit</td>
                            <td>—</td>
                            <td>At SC discretion</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Pre-deposit is paid using Form GST DRC-03 on the GST portal. If the appeal is decided in the taxpayer&apos;s favour, the pre-deposit is refunded with interest at 6% p.a. under Section 115 if not refunded within 90 days of the appeal order.
                </p>
            </section>

            <section id="grounds">
                <h2>Common Grounds for GST Appeal</h2>
                <p>Well-drafted grounds of appeal are the backbone of a successful GST case. Common legally valid grounds include:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Common Grounds</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ITC Disputes</td>
                            <td>ITC denied solely on GSTR-2A/2B mismatch without examining supplier compliance; ITC wrongly blocked under Section 17(5); ITC reversal under Rule 42/43 incorrectly computed</td>
                        </tr>
                        <tr>
                            <td>Classification &amp; Rate</td>
                            <td>Wrong HSN classification leading to higher tax rate; misclassification of exempt supply as taxable supply; wrong determination of place of supply</td>
                        </tr>
                        <tr>
                            <td>Demand &amp; Penalty</td>
                            <td>Demand without SCN or with defective SCN; penalty imposed without finding of fraud, suppression, or wilful misstatement; limitation period for raising demand violated</td>
                        </tr>
                        <tr>
                            <td>Refund Rejection</td>
                            <td>Wrongful rejection of zero-rated supply refund; export refund rejected due to technical GSTR-1 errors; IGST refund on imports rejected without valid reason</td>
                        </tr>
                        <tr>
                            <td>Procedural</td>
                            <td>Order passed without adequate hearing opportunity (natural justice); ex-parte order without valid service of SCN; rejection of written submissions without reasons</td>
                        </tr>
                        <tr>
                            <td>Interest</td>
                            <td>Interest charged on gross tax liability instead of net (post-ITC) — Supreme Court in Refex Industries; interest computed from wrong date</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="forms">
                <h2>GST Appeal Forms</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Form</th>
                            <th>Filed By</th>
                            <th>Purpose</th>
                            <th>Authority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GST APL-01</td>
                            <td>Taxpayer</td>
                            <td>Appeal against order to Appellate Authority</td>
                            <td>Commissioner (Appeals)</td>
                        </tr>
                        <tr>
                            <td>GST APL-02</td>
                            <td>Appellate Authority</td>
                            <td>Acknowledgement of appeal receipt</td>
                            <td>Commissioner (Appeals)</td>
                        </tr>
                        <tr>
                            <td>GST APL-03</td>
                            <td>Department / Tax Officer</td>
                            <td>Departmental appeal against favourable order</td>
                            <td>Commissioner (Appeals)</td>
                        </tr>
                        <tr>
                            <td>GST APL-04</td>
                            <td>Appellate Authority</td>
                            <td>Summary of appeal order</td>
                            <td>Commissioner (Appeals)</td>
                        </tr>
                        <tr>
                            <td>GST APL-05</td>
                            <td>Taxpayer / Department</td>
                            <td>Appeal to GST Appellate Tribunal</td>
                            <td>GSTAT</td>
                        </tr>
                        <tr>
                            <td>GST DRC-03</td>
                            <td>Taxpayer</td>
                            <td>Payment of pre-deposit / voluntary tax payment</td>
                            <td>GST Portal</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="process">
                <h2>Step-by-Step GST Appeal Filing Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 1</div>
                            <h4>Receive &amp; Analyse the Impugned Order</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Obtain a certified copy of the GST demand / penalty / refund rejection order. Carefully analyse the order to identify factual errors, legal mistakes, and procedural lapses. Note the order date — the 3-month clock starts from this date.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 2</div>
                            <h4>Evaluate Merits &amp; Prepare Grounds</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Engage a GST consultant or CS to evaluate merits. Prepare precise grounds of appeal — citing specific CGST sections, rules, and supporting case laws (AAR / AAAR / HC / SC precedents).</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 3</div>
                            <h4>Compute &amp; Pay Pre-Deposit (DRC-03)</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Calculate 10% of the admitted disputed tax. Pay using Form GST DRC-03 on the GST portal against the specific demand. Save the DRC-03 ARN number — required for attaching proof with APL-01.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 4</div>
                            <h4>File Form GST APL-01 Online</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Log in to GST portal → Services → User Services → Appeal to Appellate Authority. Fill APL-01 with: order details, grounds of appeal, relief sought, pre-deposit details, and attach supporting documents. Submit within 3 months of order date.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 5</div>
                            <h4>Acknowledgement &amp; Hearing Notice</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Appellate Authority issues GST APL-02 acknowledging the appeal. A personal hearing notice will be issued — appear on the scheduled date with all documents. Additional submissions can be made in writing.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 6</div>
                            <h4>Hearing &amp; Arguments</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Present arguments supported by documents, reconciliation data, and case laws. Respond to department&apos;s counter-arguments. The authority may ask for additional information or conduct multiple hearings.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 7</div>
                            <h4>Appeal Order &amp; Implementation</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">The AA passes the appeal order — fully allowing, partially allowing, or dismissing the appeal. If allowed, pre-deposit is refunded. If dismissed, evaluate GSTAT / HC options. GST APL-04 is issued as summary of order.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="documents">
                <h2>Documents Required for GST Appeal</h2>
                <ul>
                    <li>Certified copy of the impugned GST order</li>
                    <li>Original Show Cause Notice (SCN) and the taxpayer&apos;s reply filed</li>
                    <li>GSTR-1, GSTR-3B, and GSTR-9 for the relevant tax period</li>
                    <li>GSTR-2A / GSTR-2B reconciliation with purchase register</li>
                    <li>All tax invoices, purchase orders, and e-way bills in dispute</li>
                    <li>Import/export documentation (for IGST / zero-rated supply disputes)</li>
                    <li>Bank statements showing tax payments and DRC-03 payment challans</li>
                    <li>Books of accounts (ledger / purchase register / sales register)</li>
                    <li>Form GST DRC-03 ARN for pre-deposit payment</li>
                    <li>Authorisation letter / power of attorney for representative</li>
                    <li>Written grounds of appeal (legal brief with case laws)</li>
                    <li>Previous hearing correspondence / written submissions filed earlier</li>
                </ul>
            </section>

            <section id="fees">
                <h2>Fees &amp; Professional Charges</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Government Fee</th>
                            <th>Professional Advisory Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Filing APL-01 (Appellate Authority)</td>
                            <td>₹1,000 (disputes up to ₹10L) / ₹2,000 (above ₹10L)</td>
                            <td>₹10,000–₹50,000 (simple cases)</td>
                        </tr>
                        <tr>
                            <td>Filing APL-05 (GSTAT)</td>
                            <td>₹2,000 (disputes up to ₹10L) / ₹5,000 (above ₹10L)</td>
                            <td>₹50,000–₹2,00,000</td>
                        </tr>
                        <tr>
                            <td>Representation per hearing (AA)</td>
                            <td>Nil</td>
                            <td>₹5,000–₹25,000 per hearing</td>
                        </tr>
                        <tr>
                            <td>High Court Writ / Appeal</td>
                            <td>Court fees (state-specific)</td>
                            <td>₹1,00,000–₹10,00,000+ (advocate retainer)</td>
                        </tr>
                        <tr>
                            <td>Pre-deposit (10% of disputed tax)</td>
                            <td>Mandatory — credited to government</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>Comprehensive appeal management</td>
                            <td>—</td>
                            <td>₹25,000–₹5,00,000 (dispute-size dependent)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="timeline">
                <h2>GST Appeal Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Statutory Timeline</th>
                            <th>Practical Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>File APL-01</td>
                            <td>Within 3 months of order</td>
                            <td>3–7 days after retaining professional</td>
                        </tr>
                        <tr>
                            <td>APL-02 Acknowledgement</td>
                            <td>Immediate (online)</td>
                            <td>Same day</td>
                        </tr>
                        <tr>
                            <td>First Hearing Notice</td>
                            <td>No fixed period</td>
                            <td>2–8 weeks</td>
                        </tr>
                        <tr>
                            <td>Final Order — AA</td>
                            <td>1 year (Section 107)</td>
                            <td>6 months–2 years (practical)</td>
                        </tr>
                        <tr>
                            <td>GSTAT Decision</td>
                            <td>3 months (Section 112)</td>
                            <td>6 months–3 years (practical)</td>
                        </tr>
                        <tr>
                            <td>High Court</td>
                            <td>No fixed statutory limit</td>
                            <td>1–5 years</td>
                        </tr>
                        <tr>
                            <td>Pre-deposit refund (if appeal won)</td>
                            <td>Within 90 days of appeal order</td>
                            <td>2–6 months practical</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="common-mistakes">
                <h2>Common Mistakes to Avoid in GST Appeals</h2>
                <ul>
                    <li><strong>Missing the 3-month deadline</strong> — The most common and most damaging mistake; once time-barred, the appeal cannot be filed without HC intervention</li>
                    <li><strong>Insufficient pre-deposit</strong> — Paying less than 10% of the full disputed amount causes the appeal to be rejected at the threshold; compute the exact figure carefully</li>
                    <li><strong>Vague grounds of appeal</strong> — Generic statements like &quot;demand is wrong&quot; without specific legal grounds are rejected; each ground must cite the specific CGST section violated</li>
                    <li><strong>Missing documents</strong> — GSTR-2A/2B reconciliation data, e-way bills, and invoices not submitted weaken ITC-related appeals significantly</li>
                    <li><strong>Not attending hearings</strong> — Ex-parte hearing orders from the Appellate Authority are common when taxpayers don&apos;t appear; always confirm and attend scheduled dates</li>
                    <li><strong>Ignoring interest computation errors</strong> — Many demands include wrongly computed interest (charged on gross tax vs. net-of-ITC basis); raise this specifically as a ground</li>
                    <li><strong>Not tracking the appeal status</strong> — Portal-based appeals require regular monitoring; missed hearing dates can result in ex-parte orders against the taxpayer</li>
                    <li><strong>Settling too early without evaluating merits</strong> — Paying under the GST amnesty scheme is appropriate only when the demand has merit; for clearly wrong demands, full appeal is more cost-effective</li>
                </ul>
            </section>

            <section id="appeal-vs-revision">
                <h2>GST Appeal vs GST Revision</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>GST Appeal (Section 107)</th>
                            <th>GST Revision (Section 108)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Initiated by</td>
                            <td>Taxpayer or Department</td>
                            <td>Revisional Authority (suo motu or on application)</td>
                        </tr>
                        <tr>
                            <td>Authority</td>
                            <td>Commissioner (Appeals)</td>
                            <td>Commissioner / Principal Commissioner</td>
                        </tr>
                        <tr>
                            <td>Pre-deposit</td>
                            <td>10% of disputed tax mandatory</td>
                            <td>Not applicable</td>
                        </tr>
                        <tr>
                            <td>Scope</td>
                            <td>Challenge to any order</td>
                            <td>Revise orders erroneous &amp; prejudicial to revenue</td>
                        </tr>
                        <tr>
                            <td>Time limit</td>
                            <td>3 months (taxpayer)</td>
                            <td>3 years from order date</td>
                        </tr>
                        <tr>
                            <td>When used</td>
                            <td>Taxpayer disagrees with demand/order</td>
                            <td>Department finds own officer&apos;s order was too favourable to taxpayer</td>
                        </tr>
                    </tbody>
                </table>
                <div className="expert-quote">
                    <blockquote>
                        &ldquo;A well-prepared GST appeal is not just a legal document — it is a financial instrument. The difference between a correctly argued appeal and a poorly drafted one can be crores of rupees in saved tax liability. Every business deserves expert representation when challenging a GST demand.&rdquo;
                    </blockquote>
                    <cite>— CS Devyani Khambhati, Founder, Estabizz Fintech Consultants</cite>
                </div>
            </section>

            <section id="post-appeal">
                <h2>Post-Appeal Compliance Obligations</h2>
                <p>After the Appellate Authority passes its order, several follow-up actions are required:</p>
                <ul>
                    <li><strong>If appeal is fully allowed:</strong> Apply for pre-deposit refund through Form GST RFD-01 / Form GST DRC-03 credit; update books of accounts to reverse the demand provision; obtain refund within 90 days (interest payable on delay)</li>
                    <li><strong>If appeal is partially allowed:</strong> Pay the confirmed demand portion with interest; apply for refund of excess pre-deposit; evaluate further appeal to GSTAT on the upheld portion</li>
                    <li><strong>If appeal is dismissed:</strong> Decide on GSTAT appeal (pre-deposit 20%); assess merits of going to High Court; consider Vivad Se Vishwas settlement if demand is large and merits are weak</li>
                    <li><strong>Internal compliance fix:</strong> Regardless of outcome, review and fix the underlying compliance process that gave rise to the dispute — reconcile GSTR-1 and GSTR-3B monthly, match GSTR-2B before claiming ITC, maintain proper e-way bills</li>
                    <li><strong>Document retention:</strong> Retain all appeal records, hearing transcripts, and correspondence for at least 7 years — further proceedings at GSTAT or HC may require this history</li>
                </ul>
            </section>

            <section id="faq">
                <h2>Frequently Asked Questions (FAQs)</h2>
                <div className="faq-accordion">
                    {faqs.map((item, i) => (
                        <details key={i} className="faq-item">
                            <summary>{item.q}</summary>
                            <div>{item.a}</div>
                        </details>
                    ))}
                </div>
            </section>
        </ServicePageLayout>
    );
}
