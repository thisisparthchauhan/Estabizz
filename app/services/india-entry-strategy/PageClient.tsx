"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "what-is", title: "2. What Is India Entry Strategy" },
        { id: "regulatory-framework", title: "3. Regulatory Framework" },
        { id: "entry-modes", title: "4. Entry Modes for Foreign Companies" },
        { id: "fdi-routes", title: "5. FDI Routes: Automatic vs Approval" },
        { id: "sector-caps", title: "6. Sector-Specific FDI Caps" },
        { id: "prohibited-sectors", title: "7. Prohibited Sectors for FDI" },
        { id: "incorporation-process", title: "8. Company Incorporation Process" },
        { id: "office-types", title: "9. Liaison / Branch / Project Office" },
        { id: "documents", title: "10. Documents Required" },
        { id: "fees", title: "11. Fees & Government Charges" },
        { id: "timeline", title: "12. India Entry Timeline" },
        { id: "common-mistakes", title: "13. Common Mistakes to Avoid" },
        { id: "post-entry-compliance", title: "14. Post-Entry Compliance" },
        { id: "comparison", title: "15. WOS vs JV vs Branch Office" },
        { id: "faq", title: "16. Frequently Asked Questions" },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: "What is the best entry mode for a foreign company entering India?", a: "The best entry mode depends on your business purpose. For full control over operations, a Wholly Owned Subsidiary (WOS) under the automatic FDI route is ideal. For businesses wanting a local partner, a Joint Venture works well. If you want a presence without commercial activity, a Liaison Office is appropriate. A Branch Office suits foreign companies with specific projects or trading activities." },
        { q: "What is the automatic route under FDI in India?", a: "Under the automatic route, foreign investors and Indian companies do not need prior government approval for FDI. Investment is permitted up to prescribed sectoral caps without approval from DPIIT or RBI. The investor only needs to file Form FC-GPR with the AD Category I Bank after receiving funds." },
        { q: "Which sectors require government approval for FDI?", a: "Sectors requiring government (DPIIT/FIPB) approval include: defence (beyond 74%), broadcasting content services, print media (up to 26%), satellites (beyond 74%), banking (public sector beyond 20%), tobacco products, and multi-brand retail trading (subject to state government approval). Approval is granted through the competent authority." },
        { q: "Can a foreign company own 100% in India?", a: "Yes, 100% foreign ownership is allowed in most sectors under the automatic route including IT/ITES, manufacturing, infrastructure, e-commerce (marketplace model), NBFC (subject to RBI requirements), and many others. Sectors like insurance (74%), banking private (74%), defence (74%), and multi-brand retail (51%) have caps." },
        { q: "What is the minimum capital requirement to incorporate a company in India?", a: "There is no minimum paid-up capital requirement for incorporating a Private Limited Company under Companies Act 2013. However, regulated sectors have their own capital requirements — for example, NBFCs require ₹10 crore Net Owned Fund, insurance companies require ₹100 crore, and payment aggregators require ₹25 crore." },
        { q: "How long does it take to incorporate a company in India?", a: "Company incorporation through the SPICe+ form on the MCA portal typically takes 5–10 working days if all documents are in order. Getting the DIN for foreign directors, apostille of foreign documents, and obtaining sector-specific licences adds additional time ranging from 30 days to several months." },
        { q: "What is Form FC-GPR and when must it be filed?", a: "FC-GPR (Foreign Currency — Gross Provisional Return) is filed with the AD Category I Bank within 30 days of allotment of shares to a foreign investor. It reports the receipt of FDI and the corresponding equity allotment. Failure to file FC-GPR on time is a FEMA violation subject to compounding." },
        { q: "Can a foreign company open a Liaison Office in India?", a: "Yes. A Liaison Office (LO) can be opened in India with prior RBI approval for a maximum of 3 years (renewable). An LO can only carry out liaison activities — collecting information, promoting exports/imports, and facilitating technical/financial collaboration. It CANNOT earn income in India or engage in commercial activity." },
        { q: "What is the difference between a Branch Office and Liaison Office?", a: "A Branch Office (BO) can carry out commercial activities including export/import of goods, rendering professional services, and conducting research. It can remit profits to its parent after paying applicable taxes. A Liaison Office cannot earn any income or conduct commercial activity — it is purely a communication and coordination hub." },
        { q: "Is FEMA compliance mandatory for foreign entities investing in India?", a: "Yes, FEMA (Foreign Exchange Management Act 1999) governs all cross-border investment and transactions. Key obligations include filing FC-GPR after share allotment, annual FLA return (by 15 July), FC-TRS for secondary share transfers, and ODI filings for Indian companies investing abroad. Violations are subject to civil penalties up to 3x the contravention amount." },
        { q: "What is the FLA Return and who must file it?", a: "The Foreign Liabilities and Assets (FLA) Return must be filed annually by 15th July with RBI by all Indian companies that have received FDI or made overseas investment. It reports the stock of foreign liabilities (FDI received) and assets (ODI made). Non-filing is a FEMA violation." },
        { q: "Do foreign directors need a DIN to incorporate a company in India?", a: "Yes, every director of an Indian company must have a Director Identification Number (DIN) issued by MCA. For foreign nationals, documents must be apostilled/notarised as per the Convention Abolishing the Requirement of Legalisation for Foreign Public Documents. Foreign directors can apply for DIN through the SPICe+ form during incorporation." },
        { q: "Can a foreign national be a director in an Indian company?", a: "Yes, a foreign national can be a director. However, at least one director must be resident in India (i.e., stayed for at least 182 days in the previous calendar year). The foreign director must obtain DIN, and their appointment must comply with the Companies Act 2013 and the company&apos;s Articles of Association." },
        { q: "What taxes does a foreign subsidiary pay in India?", a: "A foreign subsidiary (WOS) incorporated in India is taxed as a domestic company. The base corporate tax rate is 22% (under the new regime under Section 115BAA) plus surcharge and cess, effectively ~25.17%. Manufacturing companies set up after 1 October 2019 can opt for 15% (effective ~17.01%) under Section 115BAB. Minimum Alternate Tax (MAT) applies at 15% of book profits if regular tax is lower." },
        { q: "What is a Project Office and how is it different from a Branch Office?", a: "A Project Office is established by a foreign company specifically to execute a project contracted with an Indian party. It is a temporary presence tied to the project duration and is automatically wound up on completion. A Branch Office is a more permanent structure tied to the foreign parent&apos;s ongoing activities in India, requiring periodic RBI renewals and can engage in broader commercial activities." },
        { q: "What SEBI and RBI approvals are needed for fintech companies entering India?", a: "Fintech companies need approvals depending on their activities: Payment Aggregators (PA) and Payment Gateways need RBI authorisation; NBFCs need RBI registration (₹10 crore NOF); Investment Advisers and Research Analysts need SEBI registration; Account Aggregators need RBI NBFC-AA licence; P2P lending platforms need NBFC-P2P licence; Insurance-related fintechs need IRDAI approvals." },
        { q: "What is the role of DPIIT in foreign investment in India?", a: "DPIIT (Department for Promotion of Industry and Internal Trade) under the Ministry of Commerce administers India&apos;s FDI policy. It issues the Consolidated FDI Policy, processes government route approvals through the Foreign Investment Facilitation Portal (FIFP), and liaises with RBI, SEBI, IRDAI, and other regulators for sector-specific FDI permissions." },
        { q: "Can a foreign entity invest in an Indian LLP?", a: "Yes, foreign investment in Limited Liability Partnerships (LLPs) is allowed under the automatic route for sectors where 100% FDI is permitted without FDI-linked conditions. Investment through LLP is not permitted in sectors with caps (like insurance, defence) or where FDI-linked performance conditions apply. FDI in LLPs is reported through Form FDI LLP-I with AD Bank." },
        { q: "What is an India Entry Strategy Advisory service?", a: "India Entry Strategy Advisory involves end-to-end guidance for foreign entities planning to enter India — covering structure selection (WOS, JV, LO, BO), regulatory mapping (FEMA, RBI, SEBI, Companies Act, sector regulators), tax optimisation, incorporation, FDI compliance filings, and ongoing post-entry compliance management." },
        { q: "How much does setting up a foreign subsidiary in India cost?", a: "Total costs include: Government fees for incorporation (₹500–₹15,000 depending on authorised capital), DIN for foreign directors (₹500), apostille/notarisation fees (country-dependent), professional advisory fees for incorporation and FEMA compliance (₹50,000–₹5,00,000 depending on complexity), registered office setup, and sector licence fees if applicable." },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🌏", label: "India Entry Strategy" },
                { emoji: "🏢", label: "FDI & Foreign Investment" },
                { emoji: "📜", label: "FEMA / Companies Act" },
                { emoji: "🏦", label: "RBI / DPIIT" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "India Entry Strategy" },
            ]}
            title="India Entry Strategy: Complete Guide for Foreign Companies Entering India — FDI, Incorporation &amp; FEMA Compliance"
            readTime="20 min read"
            focusKeyword="India Entry Strategy"
            sections={sections}
            ctaTitle="Plan Your India Entry with Expert Support"
            ctaDescription="Our regulatory experts guide foreign companies through every step — from selecting the right entry structure to FEMA compliance, RBI filings, company incorporation, and sector licence approvals. We have helped 100+ foreign entities establish operations in India."
            quickFacts={[
                { label: "Primary Laws", value: "FEMA 1999 / Companies Act 2013" },
                { label: "FDI Regulator", value: "RBI + DPIIT" },
                { label: "Incorporation Time", value: "5–10 working days" },
                { label: "Automatic Route", value: "No prior approval" },
                { label: "Key Filing", value: "FC-GPR (30 days)" },
                { label: "FLA Return", value: "15 July annually" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "Complete guide to FEMA compliance — FDI, ODI, ECB, FC-GPR, FLA return obligations." },
                { title: "Enterprise Services", href: "/services/enterprise-services", category: "Services", description: "End-to-end enterprise compliance and regulatory setup for businesses in India." },
                { title: "Legal Due Diligence", href: "/services/legal-due-diligence", category: "Services", description: "Comprehensive legal due diligence for M&A, investments, and corporate transactions." },
                { title: "NBFC Account Aggregator License", href: "/rbi/nbfc-account-aggregator-license", category: "RBI", description: "Obtain RBI authorisation to operate as a data aggregator under the AA framework." },
            ]}
            finalCtaTitle="Enter India the Right Way — With Full Regulatory Compliance"
            finalCtaDescription="Entering India without proper regulatory planning can lead to FEMA violations, RBI penalties, and business disruption. Our team ensures your India entry is structured correctly from day one — right structure, right filings, right compliance framework."
        >
            <section id="introduction">
                <h2>Introduction to India Entry Strategy</h2>
                <p>
                    India is one of the world&apos;s most attractive investment destinations — a $3.7 trillion economy with a 1.4 billion-person consumer market, a rapidly growing digital economy, and a government committed to ease of doing business. For foreign companies, however, entering India requires careful navigation of a complex regulatory framework spanning the Foreign Exchange Management Act (FEMA), Companies Act 2013, RBI guidelines, sectoral regulations from SEBI, IRDAI, RBI, and DPIIT&apos;s consolidated FDI policy.
                </p>
                <p>
                    An India Entry Strategy is the structured legal, financial, and regulatory plan that determines how a foreign entity will establish its presence in India — the right legal structure, the right FDI route, the right sector approvals, and the right ongoing compliance framework.
                </p>
                <div className="info-box">
                    <strong>Why India Entry Planning Matters:</strong> Choosing the wrong structure — for example, a Liaison Office when commercial activity is intended — or failing to file FC-GPR within 30 days of share allotment can trigger FEMA violations carrying penalties of up to 3× the contravention amount. Getting the structure right from day one saves time, money, and regulatory exposure.
                </div>
                <p>
                    This guide covers every dimension of India entry for foreign companies and investors — entry modes, FDI routes, sector caps, incorporation process, FEMA compliance, and post-entry obligations.
                </p>
            </section>

            <section id="what-is">
                <h2>What Is India Entry Strategy?</h2>
                <p>
                    India Entry Strategy refers to the complete framework a foreign entity adopts to establish legal, commercial, or investment presence in India. It involves:
                </p>
                <ul>
                    <li>Choosing the right legal form — Wholly Owned Subsidiary, Joint Venture, Liaison Office, Branch Office, or Project Office</li>
                    <li>Determining the applicable FDI route — Automatic Route (no prior approval) or Government Route (DPIIT approval required)</li>
                    <li>Identifying sector-specific regulations — SEBI, RBI, IRDAI, IFSCA, DPIIT norms</li>
                    <li>Planning the incorporation or establishment process</li>
                    <li>Building the FEMA compliance framework — FC-GPR, FLA Return, FC-TRS filings</li>
                    <li>Structuring tax-efficient capital flows between the parent and Indian entity</li>
                    <li>Setting up ongoing corporate and regulatory compliance</li>
                </ul>
                <div className="info-box">
                    <strong>India&apos;s FDI Performance:</strong> India received USD 70.97 billion in FDI in FY 2023-24. Top sectors receiving FDI include services, computer software &amp; hardware, trading, telecom, construction, and automobile. Key investing countries include Singapore, Mauritius, USA, Netherlands, and Japan.
                </div>
            </section>

            <section id="regulatory-framework">
                <h2>Regulatory Framework Governing India Entry</h2>
                <p>India entry for foreign entities is governed by multiple laws and regulations. The primary framework is:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Law / Regulation</th>
                            <th>Authority</th>
                            <th>What It Governs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Foreign Exchange Management Act (FEMA) 1999</td>
                            <td>RBI</td>
                            <td>All cross-border capital flows, FDI, ODI, ECB, remittances</td>
                        </tr>
                        <tr>
                            <td>FEMA (Non-Debt Instruments) Rules 2019</td>
                            <td>Ministry of Finance / RBI</td>
                            <td>FDI caps, sector conditions, reporting requirements</td>
                        </tr>
                        <tr>
                            <td>Consolidated FDI Policy 2020</td>
                            <td>DPIIT</td>
                            <td>Sector-wise FDI caps and conditions</td>
                        </tr>
                        <tr>
                            <td>Companies Act 2013</td>
                            <td>MCA</td>
                            <td>Incorporation, governance, compliance of Indian companies</td>
                        </tr>
                        <tr>
                            <td>Income Tax Act 1961</td>
                            <td>CBDT</td>
                            <td>Taxation of foreign entities and subsidiaries in India</td>
                        </tr>
                        <tr>
                            <td>Sector-Specific Regulations</td>
                            <td>RBI, SEBI, IRDAI, IFSCA</td>
                            <td>Licensing requirements for financial services, insurance, capital markets</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Key Point:</strong> FDI in India is primarily regulated by RBI (through FEMA) and DPIIT (through the FDI Policy). For financial sector entities, the relevant sectoral regulator (SEBI, RBI, IRDAI, IFSCA) imposes additional licensing requirements above and beyond FDI compliance.
                </div>
            </section>

            <section id="entry-modes">
                <h2>Entry Modes for Foreign Companies</h2>
                <p>Foreign entities can establish a presence in India through five primary modes:</p>

                <h3>1. Wholly Owned Subsidiary (WOS)</h3>
                <p>
                    An Indian Private Limited or Public Limited Company in which the foreign parent holds 100% equity. Incorporated under the Companies Act 2013 through MCA. The WOS is a separate legal entity from its parent, can enter contracts, own assets, hire employees, and is subject to full Indian tax and compliance obligations.
                </p>
                <div className="info-box">
                    <strong>Best for:</strong> Technology companies, fintech, e-commerce, manufacturing, consulting — any business wanting full operational control and direct India presence.
                </div>

                <h3>2. Joint Venture (JV)</h3>
                <p>
                    An Indian company in which the foreign entity holds equity alongside Indian partners. Allows access to local market knowledge, distribution networks, and partner relationships. FDI caps apply — the foreign partner&apos;s stake cannot exceed the prescribed sectoral cap.
                </p>
                <div className="info-box">
                    <strong>Best for:</strong> Sectors with FDI caps (insurance, banking, defence), businesses needing local market partnerships, and regulated sectors requiring Indian-resident management.
                </div>

                <h3>3. Liaison Office (LO)</h3>
                <p>
                    A representative office approved by RBI that can only carry out liaison and coordination activities — no commercial operations or revenue generation in India. Valid for 3 years (renewable). Permitted activities include collecting information, promoting parent company&apos;s products, and facilitating technical or financial collaboration.
                </p>
                <div className="warning-box">
                    <strong>Important:</strong> A Liaison Office CANNOT earn any income, sign commercial contracts, or engage in any trading or manufacturing activity. All expenses must be funded through inward remittances from the foreign parent.
                </div>

                <h3>4. Branch Office (BO)</h3>
                <p>
                    A direct extension of the foreign company in India, approved by RBI. Can engage in commercial activities specified by RBI — export/import of goods, rendering professional/consulting services, research, technical support, conducting business on behalf of parent. Profits can be remitted after tax. Not suitable for manufacturing.
                </p>

                <h3>5. Project Office (PO)</h3>
                <p>
                    A temporary presence established by a foreign company to execute a specific project contracted with an Indian party. Automatically wound up on project completion. No RBI prior approval needed if the project is funded by inward remittance or by the project contract proceeds.
                </p>
            </section>

            <section id="fdi-routes">
                <h2>FDI Routes: Automatic Route vs Government/Approval Route</h2>
                <p>FDI into India comes through two routes:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Automatic Route</th>
                            <th>Government / Approval Route</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Prior Approval Required</td>
                            <td>No</td>
                            <td>Yes — DPIIT / Competent Authority</td>
                        </tr>
                        <tr>
                            <td>Processing Time</td>
                            <td>No wait — invest directly</td>
                            <td>4–12 weeks depending on ministry</td>
                        </tr>
                        <tr>
                            <td>Filing Required</td>
                            <td>FC-GPR within 30 days of allotment</td>
                            <td>Prior application + FC-GPR post-approval</td>
                        </tr>
                        <tr>
                            <td>Common Sectors</td>
                            <td>IT, manufacturing, NBFC, e-commerce, infrastructure</td>
                            <td>Defence, multi-brand retail, print media, broadcasting</td>
                        </tr>
                        <tr>
                            <td>Portal</td>
                            <td>Not applicable</td>
                            <td>Foreign Investment Facilitation Portal (FIFP)</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Note:</strong> Even under the Automatic Route, sector-specific regulators (RBI, SEBI, IRDAI) may require their own licences and approvals before the entity can begin operations. FDI compliance (FEMA filings) is separate from the sectoral licensing process.
                </div>
            </section>

            <section id="sector-caps">
                <h2>Sector-Specific FDI Caps</h2>
                <p>Key sectors with FDI caps as per the Consolidated FDI Policy:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sector</th>
                            <th>FDI Cap</th>
                            <th>Route</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Private Sector Banking</td>
                            <td>74%</td>
                            <td>Up to 49% Automatic; beyond 49% Government</td>
                        </tr>
                        <tr>
                            <td>Insurance</td>
                            <td>74%</td>
                            <td>Up to 74% Automatic (IRDAI conditions apply)</td>
                        </tr>
                        <tr>
                            <td>Defence</td>
                            <td>74%</td>
                            <td>Up to 74% Automatic; beyond Government</td>
                        </tr>
                        <tr>
                            <td>NBFC</td>
                            <td>100%</td>
                            <td>Automatic (RBI registration required)</td>
                        </tr>
                        <tr>
                            <td>Telecom Services</td>
                            <td>100%</td>
                            <td>Up to 49% Automatic; beyond Government</td>
                        </tr>
                        <tr>
                            <td>Multi-Brand Retail</td>
                            <td>51%</td>
                            <td>Government (State Govt permission required)</td>
                        </tr>
                        <tr>
                            <td>Single-Brand Retail</td>
                            <td>100%</td>
                            <td>Up to 49% Automatic; beyond Government</td>
                        </tr>
                        <tr>
                            <td>E-Commerce (Marketplace)</td>
                            <td>100%</td>
                            <td>Automatic</td>
                        </tr>
                        <tr>
                            <td>IT / ITES / Software</td>
                            <td>100%</td>
                            <td>Automatic</td>
                        </tr>
                        <tr>
                            <td>Manufacturing</td>
                            <td>100%</td>
                            <td>Automatic</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="prohibited-sectors">
                <h2>Prohibited Sectors for FDI</h2>
                <p>FDI is <strong>prohibited</strong> in the following sectors under the Consolidated FDI Policy:</p>
                <ul>
                    <li>Lottery Business (government / private / online)</li>
                    <li>Gambling and Betting (including casinos)</li>
                    <li>Chit Funds</li>
                    <li>Nidhi Companies</li>
                    <li>Trading in Transferable Development Rights (TDRs)</li>
                    <li>Real Estate Business (except development of townships, housing, commercial premises under FEMA conditions)</li>
                    <li>Manufacturing of Tobacco, Cigarettes, and Cigars</li>
                    <li>Atomic Energy (except as permitted under the Atomic Energy Act)</li>
                    <li>Railway Operations (except as permitted under FDI policy)</li>
                </ul>
                <div className="warning-box">
                    <strong>Critical Warning:</strong> Any FDI received in a prohibited sector is a FEMA violation. The invested capital must be repatriated and the entity is subject to penalties. Always obtain legal advice before accepting foreign investment to verify sector eligibility.
                </div>
            </section>

            <section id="incorporation-process">
                <h2>Company Incorporation Process for Foreign Entities</h2>
                <p>Setting up a Wholly Owned Subsidiary or Joint Venture in India involves the following steps:</p>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 1</div>
                            <h4>Structure Selection &amp; FEMA Mapping</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Determine entry mode (WOS/JV), FDI route, sector eligibility, and FEMA compliance requirements. Obtain government route approval if required.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 2</div>
                            <h4>DIN for Foreign Directors</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Foreign national directors must obtain DIN. Documents (passport, address proof) must be apostilled / notarised per the Hague Convention and attested by the Indian Embassy/Consulate.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 3</div>
                            <h4>Name Reservation (RUN / SPICe+)</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Apply for company name reservation through MCA&apos;s RUN portal. Names must be unique, not identical or similar to existing registered names or trademarks.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 4</div>
                            <h4>SPICe+ Form Filing</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">File SPICe+ form with MCA along with MOA, AOA, identity/address proofs for all directors and subscribers. PAN, TAN, EPFO, ESIC, GST, and bank account applied simultaneously through INC-35 (AGILE-PRO).</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 5</div>
                            <h4>Certificate of Incorporation</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">MCA issues the Certificate of Incorporation (CoI) with CIN. The company is now a legal entity. Open a bank account, receive FDI funds, and file FC-GPR within 30 days of share allotment.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot"></div>
                        <div className="step-card">
                            <div className="step-label">Step 6</div>
                            <h4>Sector Licence Applications</h4>
                            <p className="text-[13px] text-[#64748b] !mb-0">Apply to relevant sectoral regulator (RBI, SEBI, IRDAI, DPIIT) for any business-specific licences required to commence regulated operations.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="office-types">
                <h2>Liaison / Branch / Project Office Setup</h2>
                <p>For foreign companies not wishing to incorporate an Indian subsidiary, RBI-approved offices are available:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Liaison Office</th>
                            <th>Branch Office</th>
                            <th>Project Office</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RBI Approval</td>
                            <td>Required</td>
                            <td>Required</td>
                            <td>Not required (if self-financed)</td>
                        </tr>
                        <tr>
                            <td>Commercial Activity</td>
                            <td>Not permitted</td>
                            <td>Permitted (specified)</td>
                            <td>Only for specific project</td>
                        </tr>
                        <tr>
                            <td>Income in India</td>
                            <td>Not permitted</td>
                            <td>Permitted</td>
                            <td>From project contract only</td>
                        </tr>
                        <tr>
                            <td>Duration</td>
                            <td>3 years (renewable)</td>
                            <td>No fixed term (renewable)</td>
                            <td>Till project completion</td>
                        </tr>
                        <tr>
                            <td>Tax Status</td>
                            <td>Not taxable (no income)</td>
                            <td>Branch profits taxable at 40%+</td>
                            <td>Project income taxable</td>
                        </tr>
                        <tr>
                            <td>Annual Reporting</td>
                            <td>Annual Activity Certificate to RBI</td>
                            <td>Annual Activity Certificate to RBI</td>
                            <td>Annual Activity Certificate to RBI</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="documents">
                <h2>Documents Required for India Entry</h2>
                <p>Documentation requirements vary by entry mode. Common documents across all modes:</p>
                <h3>For Company Incorporation (WOS / JV)</h3>
                <ul>
                    <li>Certificate of Incorporation of foreign parent (apostilled)</li>
                    <li>Memorandum &amp; Articles of Association of foreign parent (apostilled)</li>
                    <li>Board Resolution authorising India entry and appointing authorised representative</li>
                    <li>Passport and address proof of all proposed directors (apostilled)</li>
                    <li>Latest audited financial statements of foreign parent</li>
                    <li>Proof of registered office address in India</li>
                    <li>Business plan / feasibility report (for regulated sectors)</li>
                    <li>Net Worth Certificate (CA certified, for regulated sectors)</li>
                </ul>
                <h3>For Liaison / Branch Office (RBI Application)</h3>
                <ul>
                    <li>All of the above, plus:</li>
                    <li>Form FNC — Application to RBI&apos;s Foreign Exchange Department</li>
                    <li>Banker&apos;s report from the foreign company&apos;s bank</li>
                    <li>Letter of comfort / support from parent company</li>
                    <li>Activity plan for the office</li>
                </ul>
            </section>

            <section id="fees">
                <h2>Fees &amp; Government Charges</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Government Fee</th>
                            <th>Professional Advisory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Company Incorporation (up to ₹10L capital)</td>
                            <td>₹0 (no stamp duty on MOA/AOA up to ₹10L)</td>
                            <td>₹25,000–₹75,000</td>
                        </tr>
                        <tr>
                            <td>DIN for Foreign Director</td>
                            <td>₹500 per DIN</td>
                            <td>₹5,000–₹15,000 (incl. apostille assistance)</td>
                        </tr>
                        <tr>
                            <td>FC-GPR Filing</td>
                            <td>Nil</td>
                            <td>₹10,000–₹25,000</td>
                        </tr>
                        <tr>
                            <td>FLA Return</td>
                            <td>Nil</td>
                            <td>₹5,000–₹15,000</td>
                        </tr>
                        <tr>
                            <td>Liaison / Branch Office (RBI)</td>
                            <td>Nil (application-based)</td>
                            <td>₹50,000–₹2,00,000</td>
                        </tr>
                        <tr>
                            <td>Government Route (DPIIT)</td>
                            <td>Nil</td>
                            <td>₹1,00,000–₹5,00,000 (depending on sector)</td>
                        </tr>
                        <tr>
                            <td>Annual Compliance (MCA + FEMA + Tax)</td>
                            <td>₹5,000–₹50,000 (ROC fees)</td>
                            <td>₹75,000–₹3,00,000 p.a.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="timeline">
                <h2>India Entry Timeline</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Estimated Time</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Structure selection &amp; FEMA advisory</td>
                            <td>3–7 days</td>
                            <td>Depends on sector complexity</td>
                        </tr>
                        <tr>
                            <td>Document apostille / notarisation (overseas)</td>
                            <td>5–20 days</td>
                            <td>Country-specific; USA/UK faster than others</td>
                        </tr>
                        <tr>
                            <td>Government Route approval (if needed)</td>
                            <td>4–12 weeks</td>
                            <td>Ministry-specific timelines</td>
                        </tr>
                        <tr>
                            <td>Company name reservation (RUN)</td>
                            <td>1–3 days</td>
                            <td>MCA portal</td>
                        </tr>
                        <tr>
                            <td>SPICe+ incorporation filing</td>
                            <td>5–10 working days</td>
                            <td>After all documents ready</td>
                        </tr>
                        <tr>
                            <td>FC-GPR filing (after receiving FDI)</td>
                            <td>Within 30 days of allotment</td>
                            <td>Mandatory FEMA obligation</td>
                        </tr>
                        <tr>
                            <td>Sector licence (RBI / SEBI / IRDAI)</td>
                            <td>2–12 months</td>
                            <td>Sector-specific; NBFC 3–6 months, PA 6–12 months</td>
                        </tr>
                        <tr>
                            <td>Liaison / Branch Office RBI approval</td>
                            <td>4–8 weeks</td>
                            <td>Subject to RBI scrutiny</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="common-mistakes">
                <h2>Common Mistakes to Avoid in India Entry</h2>
                <ul>
                    <li><strong>Using the wrong entry structure</strong> — Setting up a Liaison Office when commercial activity is planned violates RBI conditions and may trigger forced closure and penalties</li>
                    <li><strong>Missing FC-GPR deadline</strong> — Not filing FC-GPR within 30 days of share allotment is a FEMA violation; compounding fees apply</li>
                    <li><strong>Ignoring FLA Return</strong> — Annual FLA Return is a mandatory FEMA obligation; non-filing invites RBI notices</li>
                    <li><strong>Exceeding FDI caps</strong> — Receiving foreign investment beyond the prescribed sectoral cap without government approval is illegal; the excess must be repatriated</li>
                    <li><strong>Not appointing a resident director</strong> — Companies Act 2013 requires at least one director who has stayed in India for ≥182 days; non-compliance attracts MCA penalties</li>
                    <li><strong>Skipping sector licence due diligence</strong> — FDI compliance does not substitute for sector-specific RBI/SEBI/IRDAI licensing; both are independently required</li>
                    <li><strong>Pricing FDI shares below fair value</strong> — FDI must be received at or above the fair value of shares (determined by DCF / NAV method). Receiving FDI below fair value is a FEMA violation</li>
                    <li><strong>Not planning tax treaty benefits</strong> — Structuring through a jurisdiction without an India DTAA can result in higher withholding tax on dividends, interest, and royalties</li>
                </ul>
            </section>

            <section id="post-entry-compliance">
                <h2>Post-Entry Compliance Obligations</h2>
                <p>Once the Indian entity is established, the following compliance obligations apply on an ongoing basis:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compliance</th>
                            <th>Frequency</th>
                            <th>Authority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FC-GPR Filing</td>
                            <td>Within 30 days of share allotment</td>
                            <td>RBI (via AD Bank)</td>
                        </tr>
                        <tr>
                            <td>FLA Return</td>
                            <td>Annual — 15th July</td>
                            <td>RBI</td>
                        </tr>
                        <tr>
                            <td>Annual Return (MGT-7)</td>
                            <td>Annual — 60 days from AGM</td>
                            <td>MCA / ROC</td>
                        </tr>
                        <tr>
                            <td>Financial Statements (AOC-4)</td>
                            <td>Annual — 30 days from AGM</td>
                            <td>MCA / ROC</td>
                        </tr>
                        <tr>
                            <td>Income Tax Return</td>
                            <td>Annual — 31 October (audit cases)</td>
                            <td>CBDT</td>
                        </tr>
                        <tr>
                            <td>GST Returns (GSTR-1, GSTR-3B)</td>
                            <td>Monthly / Quarterly</td>
                            <td>GSTN</td>
                        </tr>
                        <tr>
                            <td>Annual Activity Certificate (LO/BO)</td>
                            <td>Annual — by 30 September</td>
                            <td>RBI (via AD Bank)</td>
                        </tr>
                        <tr>
                            <td>Sector Licence Compliance</td>
                            <td>As prescribed by regulator</td>
                            <td>RBI / SEBI / IRDAI</td>
                        </tr>
                    </tbody>
                </table>
                <div className="expert-quote">
                    <blockquote>
                        &ldquo;India entry is not a one-time event — it is the beginning of an ongoing compliance journey. Entities that invest in proper regulatory planning from the start save significantly on remediation costs and regulatory risk down the line.&rdquo;
                    </blockquote>
                    <cite>— CS Devyani Khambhati, Founder, Estabizz Fintech Consultants</cite>
                </div>
            </section>

            <section id="comparison">
                <h2>WOS vs JV vs Branch Office — Which is Right for You?</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Factor</th>
                            <th>WOS</th>
                            <th>Joint Venture</th>
                            <th>Branch Office</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Control</td>
                            <td>Full (100%)</td>
                            <td>Shared with Indian partner</td>
                            <td>Full (extension of parent)</td>
                        </tr>
                        <tr>
                            <td>FDI Cap Applicable</td>
                            <td>Yes (sectoral)</td>
                            <td>Yes (sectoral)</td>
                            <td>No (not equity investment)</td>
                        </tr>
                        <tr>
                            <td>Tax Rate</td>
                            <td>22% + surcharge (domestic company)</td>
                            <td>22% + surcharge (domestic company)</td>
                            <td>40% + surcharge (foreign company)</td>
                        </tr>
                        <tr>
                            <td>Liability</td>
                            <td>Limited to equity</td>
                            <td>Limited to equity</td>
                            <td>Unlimited (parent liable)</td>
                        </tr>
                        <tr>
                            <td>Setup Time</td>
                            <td>5–10 working days</td>
                            <td>5–10 working days</td>
                            <td>4–8 weeks (RBI approval)</td>
                        </tr>
                        <tr>
                            <td>Profit Repatriation</td>
                            <td>Dividends (after DDT/WHT)</td>
                            <td>Dividends (after DDT/WHT)</td>
                            <td>After-tax profits</td>
                        </tr>
                        <tr>
                            <td>Best For</td>
                            <td>Full operational presence</td>
                            <td>Capped sectors, local partnerships</td>
                            <td>Export/import, short-term projects</td>
                        </tr>
                    </tbody>
                </table>
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
