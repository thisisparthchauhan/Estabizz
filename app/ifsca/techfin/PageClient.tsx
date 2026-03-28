"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "fintech-vs-techfin", title: "FinTech vs TechFin" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "techfin-activities", title: "TechFin Permissible Activities" },
        { id: "eligibility", title: "Eligibility Conditions" },
        { id: "direct-entry", title: "Authorization — Direct Entry" },
        { id: "application-process", title: "Application Process" },
        { id: "sandbox-overview", title: "Sandbox Entry Overview" },
        { id: "regulatory-sandbox", title: "IFSCA Regulatory Sandbox" },
        { id: "innovation-sandbox", title: "IFSCA Innovation Sandbox" },
        { id: "iors", title: "Inter-Operable Regulatory Sandbox (IoRS)" },
        { id: "overseas-referral", title: "Overseas Regulatory Referral" },
        { id: "compliance", title: "Compliance & Reporting" },
        { id: "fees", title: "Fees Structure" },
        { id: "currency", title: "Currency & Office Setup" },
        { id: "incentive-scheme", title: "TechFin Incentive Scheme" },
        { id: "advantages", title: "Key Advantages" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is TechFin under IFSCA?",
            a: "TechFin refers to advanced or emerging technology solutions in allied areas that aid and assist activities in relation to financial products, financial services and financial institutions. Under the IFSCA FE Framework 2022, TechFin is a permissible activity category distinct from core FinTech, covering technologies like AI/ML, Blockchain, RegTech, AgriTech, Cyber Security, and more."
        },
        {
            q: "What is the difference between FinTech and TechFin under IFSCA?",
            a: "FinTech entities provide financial technology solutions that directly result in new business models or products in financial services regulated by IFSCA (e.g., digital lending, payments, InsurTech). TechFin entities provide advanced technology solutions in allied areas that support financial institutions — such as AI/ML tools, blockchain infrastructure, RegTech, Cyber Security, and Core Banking solutions."
        },
        {
            q: "Can a TechFin company get Direct Entry Authorization?",
            a: "Yes. TechFin entities can apply for Direct Entry Authorization under Chapter I of the FE Framework 2022, provided they have: a deployable solution/working product, revenue earning track record in at least one of the last three financial years, and use technology in their core product or service."
        },
        {
            q: "Who is eligible to apply for TechFin Authorization?",
            a: "Indian applicants include: DPIIT-registered FinTech startups, companies or LLPs incorporated in India, branches of Indian company/LLP in IFSC, and entities working in ecosystems regulated by RBI/SEBI/IRDAI/PFRDA. Foreign applicants must be from FATF-compliant jurisdictions."
        },
        {
            q: "What are the permissible TechFin activities?",
            a: "Permissible TechFin activities include: AgriTech, Accelerators, Climate/Green/Sustainable Tech, Defence Tech, RegTech, Space Tech, Supervisory Tech, Core Banking technology, Trade Finance technology, and BFSI solutions using AI/ML, Big Data, Biometrics, Chatbots, Cyber Security, Digital Identity/KYC/AML, Distributed Ledger Technology, Fraud Detection, IoT, Longevity Finance, Metaverse/AR/VR, Quantum Tech, and Web 3.0."
        },
        {
            q: "Is physical office setup at GIFT City mandatory for TechFin Sandbox applicants?",
            a: "No. For Sandbox (Limited Use Authorization), there is no requirement to set up an office at GIFT IFSC, unless a bank account is required to be opened in IFSC."
        },
        {
            q: "What is the Direct Entry Authorization fee for TechFin?",
            a: "Application Fee: USD 500. Annual Authorization Fee: USD 1,500."
        },
        {
            q: "What is the Sandbox fee for foreign TechFin applicants?",
            a: "Application Fee: USD 100. Limited Use Authorization Fee: USD 500. Extension Fee (post 12 months): USD 500."
        },
        {
            q: "What sandbox options are available for TechFin entities?",
            a: "Four sandbox options are available: (1) IFSCA FinTech Regulatory Sandbox — live testing with real customers; (2) IFSCA FinTech Innovation Sandbox — testing in isolation from live market; (3) Inter-Operable Regulatory Sandbox (IoRS) — for hybrid products falling under multiple regulators; (4) Overseas Regulatory Referral Mechanism — for foreign TechFins entering India."
        },
        {
            q: "What currency must TechFin operations be conducted in?",
            a: "TechFin entities must transact in freely convertible foreign currency only. However, they may defray administrative expenses in INR by maintaining an SNRR (Special Non-Resident Rupee) account."
        },
        {
            q: "Are there grants available for TechFin companies?",
            a: "Yes. Under the IFSCA FinTech Incentive Scheme 2022, TechFin entities can apply for grants including: FinTech Start-up Grant (INR 1.5M), Proof of Concept Grant (INR 5M), Sandbox Grant (INR 3M), Green FinTech Grant for sustainable tech (INR 7.5M), Accelerator Grant (INR 1M per cohort), and Listing Support Grant (INR 1.5M)."
        },
        {
            q: "What regulatory relaxations are available in IFSCA Sandbox for TechFin?",
            a: "IFSCA may relax requirements such as net worth, track record, registration fees, technology risk management guidelines, financial soundness criteria, and board composition. Requirements that cannot be relaxed include: customer data confidentiality, fit and proper criteria, prevention of money laundering, and KYC principles."
        },
        {
            q: "What is the timeline for Sandbox evaluation?",
            a: "The applicant shall be informed of potential suitability for sandbox within 30 working days from submission of a complete application."
        },
        {
            q: "Can a foreign TechFin company apply directly without setting up in India?",
            a: "Yes. Foreign entities from FATF-compliant jurisdictions can apply. For Sandbox entry, no office setup in IFSC is required. For Direct Entry Authorization, the entity must incorporate separately or establish a branch/subsidiary in IFSC."
        },
        {
            q: "What is IoRS and how does it benefit TechFin companies?",
            a: "IoRS (Inter-Operable Regulatory Sandbox) is a testing environment for innovative hybrid financial products/services falling within the regulatory ambit of more than one domestic financial sector regulator (RBI, SEBI, IRDAI, PFRDA and IFSCA). It allows TechFin companies whose solutions span multiple regulatory domains to test under a unified framework with IFSCA as Principal Regulator."
        },
        {
            q: "What reports must TechFin entities submit to IFSCA?",
            a: "TechFin entities must furnish: (1) Duly certified copy of audited annual financial statements within 30 days of finalization; (2) Details of regulatory action within 15 days of receiving notice. All financial information must be submitted in US Dollars unless otherwise specified."
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🌐", label: "IFSCA" },
                { emoji: "💻", label: "TechFin" },
                { emoji: "✅", label: "Expert Reviewed" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "IFSCA Services", href: "/ifsca" },
                { label: "TechFin Authorization", href: "/ifsca/techfin" },
            ]}
            title="TechFin Authorization IFSCA: Technology Solutions for Financial Institutions in GIFT IFSC"
            readTime="20 min read"
            focusKeyword="TechFin IFSCA"
            sections={sections}
            ctaTitle="TechFin Authorization"
            ctaDescription="Our regulatory experts provide end-to-end guidance for TechFin authorization under the IFSCA FE Framework 2022 — from eligibility assessment to sandbox entry and incentive grants."
            quickFacts={[
                { label: "Regulator", value: "IFSCA" },
                { label: "Framework", value: "FE Framework, April 2022" },
                { label: "Location", value: "GIFT IFSC, Gujarat" },
                { label: "Application Fee", value: "USD 500" },
                { label: "Annual Auth. Fee", value: "USD 1,500" },
                { label: "Sandbox Fee", value: "USD 500 (Foreign)" },
                { label: "Max Grant", value: "INR 75 Lakhs (Green Tech)" },
                { label: "Sandbox Timeline", value: "30 working days" },
            ]}
            relatedArticles={[
                { title: "FinTech Entity & Incentive Scheme", href: "/ifsca/fintech-entity", category: "IFSCA", description: "FinTech Entity authorization, sandbox programs and incentive grants in GIFT IFSC." },
                { title: "PSP License IFSCA", href: "/ifsca/psp-license", category: "IFSCA", description: "Payment Service Provider authorisation under IFSCA Payment Services Regulations 2024." },
                { title: "IFSCA BATF Services", href: "/ifsca/batf-services", category: "IFSCA", description: "Book-keeping, Accounting, Taxation and Financial Crime Compliance Services in GIFT IFSC." },
                { title: "Finance Company GIFT IFSC", href: "/ifsca/finance-company", category: "IFSCA", description: "Finance Company and Finance Unit registration in GIFT IFSC." },
            ]}
            finalCtaTitle="Ready to Set Up Your TechFin Entity in GIFT IFSC?"
            finalCtaDescription="Get expert assistance with IFSCA TechFin authorization — from application to sandbox entry, incentive grants and ongoing compliance."
        >
            {/* Introduction */}
            <section id="introduction">
                <h2>Introduction</h2>
                <p>
                    The IFSCA FinTech Entity (FE) Framework, issued vide Circular F.No. 521/IFSCA/FinTech/FE Framework/2022-23 on <strong>April 27, 2022</strong>, establishes a unique regulatory framework for both FinTech and <strong>TechFin</strong> entities operating from India's International Financial Services Centre (IFSC) at GIFT City.
                </p>
                <p>
                    <strong>TechFin</strong> refers to technology companies that provide advanced or emerging technology solutions in allied areas which aid and assist activities in relation to financial products, financial services and financial institutions — as distinguished from FinTech companies that directly deliver regulated financial services.
                </p>
                <div className="info-box">
                    <strong>📌 Regulatory Reference:</strong> IFSCA Circular F.No. 521/IFSCA/FinTech/FE Framework/2022-23, dated April 27, 2022 — Framework for FinTech Entity in the International Financial Services Centres (IFSCs).
                </div>
                <p>
                    GIFT IFSC has emerged as India's preferred global FinTech and TechFin hub, ranked at the top amongst 15 global financial centers likely to become more significant in the near future (Global Financial Centers Index, London, September 2021).
                </p>
            </section>

            {/* FinTech vs TechFin */}
            <section id="fintech-vs-techfin">
                <h2>FinTech vs TechFin — The Distinction</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>FinTech</th>
                            <th>TechFin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Nature</strong></td>
                            <td>Technology-driven financial services directly regulated by IFSCA</td>
                            <td>Advanced technology solutions that aid and assist financial institutions and services</td>
                        </tr>
                        <tr>
                            <td><strong>Examples</strong></td>
                            <td>Digital lending, payments, InsurTech, WealthTech, Neo Banking</td>
                            <td>AI/ML tools, Blockchain infrastructure, RegTech, AgriTech, Cyber Security, Core Banking</td>
                        </tr>
                        <tr>
                            <td><strong>Primary Customers</strong></td>
                            <td>End users — retail and institutional financial service consumers</td>
                            <td>Financial institutions, banks, insurers, capital market entities</td>
                        </tr>
                        <tr>
                            <td><strong>Regulation Focus</strong></td>
                            <td>Directly regulated as financial service provider</td>
                            <td>Regulated as supporting technology entity under FE Framework</td>
                        </tr>
                        <tr>
                            <td><strong>Framework</strong></td>
                            <td>IFSCA FE Framework 2022 — Chapter I (a)</td>
                            <td>IFSCA FE Framework 2022 — Chapter I (b)</td>
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
                            <td><strong>Primary Legislation</strong></td>
                            <td>International Financial Services Centres Authority Act, 2019</td>
                        </tr>
                        <tr>
                            <td><strong>Governing Framework</strong></td>
                            <td>IFSCA Framework for FinTech Entity in the IFSCs (FE Framework), April 27, 2022</td>
                        </tr>
                        <tr>
                            <td><strong>Circular Reference</strong></td>
                            <td>F.No. 521/IFSCA/FinTech/FE Framework/2022-23</td>
                        </tr>
                        <tr>
                            <td><strong>Regulator</strong></td>
                            <td>International Financial Services Centres Authority (IFSCA) — unified regulator with powers of RBI, SEBI, IRDAI and PFRDA in IFSC</td>
                        </tr>
                        <tr>
                            <td><strong>TechFin Definition</strong></td>
                            <td>Advanced/innovative technology solutions which aid and assist activities in relation to financial products, financial services and financial institutions</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* TechFin Permissible Activities */}
            <section id="techfin-activities">
                <h2>TechFin Permissible Activities (Annexure I, Part B)</h2>
                <p>An illustrative list of allied areas/activities aiding and assisting financial institutions (TechFin) includes:</p>

                <h3>Core TechFin Domains</h3>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>AgriTech</h4>
                            <p>Technology solutions supporting agricultural finance, crop insurance data platforms, rural lending infrastructure and supply chain financing for agricultural sector.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Climate / Green / Sustainable Tech</h4>
                            <p>Technology platforms supporting green finance, ESG data analytics, carbon credit tracking, sustainable investment infrastructure and climate risk assessment tools for financial institutions.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>RegTech</h4>
                            <p>Regulatory Technology solutions helping financial institutions automate compliance, reporting, risk management, KYC/AML processes and regulatory data management.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Supervisory Tech (SupTech)</h4>
                            <p>Technology tools supporting regulatory supervisory functions including real-time data collection, automated reporting analysis and systemic risk monitoring for financial regulators.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Defence Tech</h4>
                            <p>Advanced technology solutions supporting defense-related financial infrastructure, procurement finance systems and related financial services for defense sector.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Space Tech</h4>
                            <p>Technology solutions at the intersection of space technology and financial services — satellite-based data for insurance underwriting, remote sensing for agricultural finance, and related applications.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">7</div>
                        <div className="step-card">
                            <h4>Accelerators</h4>
                            <p>Business accelerator programs, incubators and cohorts supporting early-stage, growth-driven FinTech and TechFin companies through education, mentorship and funding.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">8</div>
                        <div className="step-card">
                            <h4>Core Banking Technology</h4>
                            <p>Technology solutions supporting digital banking infrastructure including Core Banking Systems, payment gateways, digital onboarding platforms and banking-as-a-service APIs.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">9</div>
                        <div className="step-card">
                            <h4>Trade Finance Technology</h4>
                            <p>Technology solutions aiding trade finance operations — document digitization, supply chain visibility platforms, blockchain-based LC processing, ITFS support tools and cross-border payment infrastructure.</p>
                        </div>
                    </div>
                </div>

                <h3>BFSI Technology Solutions (Annexure I-B)</h3>
                <p>Technology solutions/services for the BFSI domain leveraging:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Technology</th>
                            <th>Applications in BFSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Artificial Intelligence / Machine Learning</strong></td>
                            <td>Credit scoring, fraud detection, robo-advisory, underwriting automation, risk modeling</td>
                        </tr>
                        <tr>
                            <td><strong>Big Data</strong></td>
                            <td>Customer analytics, market intelligence, regulatory reporting, risk analytics platforms</td>
                        </tr>
                        <tr>
                            <td><strong>Biometrics</strong></td>
                            <td>Digital identity verification, eKYC, fraud prevention, authentication systems</td>
                        </tr>
                        <tr>
                            <td><strong>Chatbots</strong></td>
                            <td>Customer service automation, financial advisory chatbots, compliance query systems</td>
                        </tr>
                        <tr>
                            <td><strong>Cyber Security</strong></td>
                            <td>Data protection, threat intelligence, penetration testing, VAPT services for financial institutions</td>
                        </tr>
                        <tr>
                            <td><strong>Digital Identity / KYC / AML / CFT</strong></td>
                            <td>Identity management platforms, AML transaction monitoring, CFT screening tools</td>
                        </tr>
                        <tr>
                            <td><strong>Distributed Ledger Technology (Blockchain)</strong></td>
                            <td>Smart contracts, tokenization platforms, cross-border settlement, trade finance blockchain</td>
                        </tr>
                        <tr>
                            <td><strong>Fraud Detection / Prevention</strong></td>
                            <td>Real-time transaction monitoring, behavioral analytics, anomaly detection systems</td>
                        </tr>
                        <tr>
                            <td><strong>Internet of Things (IoT)</strong></td>
                            <td>Connected device data for insurance underwriting, asset tracking for trade finance, smart contracts</td>
                        </tr>
                        <tr>
                            <td><strong>Longevity Finance</strong></td>
                            <td>Technology platforms for pension planning, retirement products, longevity risk modeling</td>
                        </tr>
                        <tr>
                            <td><strong>Metaverse / AR / VR</strong></td>
                            <td>Virtual banking environments, immersive financial advisory, digital asset trading platforms</td>
                        </tr>
                        <tr>
                            <td><strong>Quantum Tech</strong></td>
                            <td>Quantum computing for cryptography, portfolio optimization, risk calculation and encryption</td>
                        </tr>
                        <tr>
                            <td><strong>Web 3.0</strong></td>
                            <td>Decentralized finance infrastructure, tokenized assets, Web3 wallet integrations, NFT platforms</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
                <h2>Eligibility Conditions</h2>
                <h3>Indian Applicants</h3>
                <ul>
                    <li>An entity <strong>registered with DPIIT</strong> as a start-up related to FinTech/TechFin</li>
                    <li>A <strong>company or LLP</strong> incorporated in India under Companies Act 2013 or LLP Act 2008</li>
                    <li>A <strong>branch of an Indian company/LLP</strong> in IFSC</li>
                    <li>An entity working <strong>directly or indirectly</strong> in the ecosystem regulated by RBI / SEBI / IRDAI / PFRDA</li>
                </ul>
                <h3>Foreign Applicants</h3>
                <ul>
                    <li>An entity from a <strong>FATF-compliant jurisdiction</strong></li>
                </ul>

                <h3>Mandatory Technical Requirements</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Direct Entry</th>
                            <th>Sandbox Entry</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Technology use in core product/service</td>
                            <td>✅ Mandatory</td>
                            <td>✅ Mandatory</td>
                        </tr>
                        <tr>
                            <td>Deployable solution/working product</td>
                            <td>✅ Mandatory</td>
                            <td>❌ Not required</td>
                        </tr>
                        <tr>
                            <td>Revenue track record (1 of last 3 years)</td>
                            <td>✅ Mandatory</td>
                            <td>❌ Not required</td>
                        </tr>
                        <tr>
                            <td>Office setup at GIFT IFSC</td>
                            <td>✅ Required post-authorization</td>
                            <td>❌ Not required (unless bank account needed)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Direct Entry */}
            <section id="direct-entry">
                <h2>Authorization — Direct Entry (Chapter I)</h2>
                <p>
                    Direct Entry Authorization is for <strong>mature TechFin firms</strong> with deployable solutions and revenue track record. Upon authorization, the entity must:
                </p>
                <ul>
                    <li>Separately incorporate an entity in IFSC, <strong>OR</strong></li>
                    <li>Establish a branch or subsidiary of an Indian or foreign incorporated entity in IFSC</li>
                </ul>
                <div className="info-box">
                    <strong>30-Day Deficiency Window:</strong> If the Authority cannot grant authorization, it communicates deficiencies to the Applicant giving 30 days to rectify. Failure to rectify within the specified time may result in refusal.
                </div>
            </section>

            {/* Application Process */}
            <section id="application-process">
                <h2>Application Process</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Prepare Application</h4>
                            <p>Complete the prescribed application form (Annexure II for Direct Entry / Annexure III for Sandbox). Signed by an Authorized person of the Applicant.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Submit via Email</h4>
                            <p>Submit complete application to <strong>fe-sandbox@ifsca.gov.in</strong> through electronic mail along with all required documents.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Evaluation Committee Review</h4>
                            <p>Application is subject to evaluation by IFSCA's Evaluation Committee. For Sandbox: applicant informed of suitability within 30 working days from submission of complete application.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Grant of Authorization</h4>
                            <p>IFSCA grants Authorization as FinTech Entity (TechFin) subject to entity setting up in IFSC. Authorization fee: USD 1,500 per year.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>IFSC Entity Setup</h4>
                            <p>Incorporate a new company/LLP in IFSC or establish a branch/subsidiary of parent entity in GIFT City.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Operations Commence</h4>
                            <p>Begin TechFin operations from GIFT IFSC in specified foreign currency. Appoint authorized representative for regulatory compliance.</p>
                        </div>
                    </div>
                </div>

                <h3>Required Documents</h3>
                <ul>
                    <li>Certified copy of incorporation certification/registration of Applicant or Parent/Promoter</li>
                    <li>Certified copy of Constitutional documents (MoA, AoA, LLP Agreement)</li>
                    <li>Certified copy of last 3 years audited consolidated financial statements</li>
                    <li>Shareholding pattern</li>
                    <li>Details of Directors/Key Managerial Personnel</li>
                    <li>Declaration from Authorized Signatory on company letterhead</li>
                </ul>
            </section>

            {/* Sandbox Overview */}
            <section id="sandbox-overview">
                <h2>Sandbox Entry Overview (Chapter II)</h2>
                <p>TechFin entities at an early stage — without a deployable product or revenue track record — can enter through Sandbox (Limited Use Authorization). Four sandbox pathways are available:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sandbox Type</th>
                            <th>Testing Environment</th>
                            <th>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>IFSCA Regulatory Sandbox (FRS)</strong></td>
                            <td>Live environment with real customers/investors</td>
                            <td>TechFins with near-ready solutions needing real-world validation</td>
                        </tr>
                        <tr>
                            <td><strong>IFSCA Innovation Sandbox (FIS)</strong></td>
                            <td>Isolated from live market — uses market data from institutions</td>
                            <td>Early-stage TechFins developing and testing ideas</td>
                        </tr>
                        <tr>
                            <td><strong>Inter-Operable Sandbox (IoRS)</strong></td>
                            <td>Multi-regulator sandbox (RBI + SEBI + IRDAI + PFRDA + IFSCA)</td>
                            <td>Hybrid products spanning multiple regulatory domains</td>
                        </tr>
                        <tr>
                            <td><strong>Overseas Referral Mechanism</strong></td>
                            <td>Cross-border testing via IFSCA MoUs with foreign regulators</td>
                            <td>Foreign TechFins seeking India entry via FinTech bridges</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Regulatory Sandbox */}
            <section id="regulatory-sandbox">
                <h2>IFSCA FinTech Regulatory Sandbox (FRS)</h2>
                <p>The Regulatory Sandbox allows TechFin applicants to <strong>test their ideas or solutions in a live environment with real customers/investors</strong> under a Limited Use Authorization.</p>

                <h3>Solution Eligibility Criteria</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criterion</th>
                            <th>Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Genuineness of Innovation</strong></td>
                            <td>Solution must be innovative enough to add significant value to existing IFSCA-regulated financial services or products</td>
                        </tr>
                        <tr>
                            <td><strong>Genuine Need to Test</strong></td>
                            <td>Must demonstrate need for live testing; show solution cannot be developed without relaxing certain regulatory requirements</td>
                        </tr>
                        <tr>
                            <td><strong>Limited Prior Testing</strong></td>
                            <td>Limited offline testing of the solution must have been carried out before applying</td>
                        </tr>
                        <tr>
                            <td><strong>Direct Benefits to Users</strong></td>
                            <td>Solution must offer identifiable benefits (direct or indirect) to customers, investors or the BFSI sector at large</td>
                        </tr>
                        <tr>
                            <td><strong>No Systemic Risk</strong></td>
                            <td>Must have proper risk management strategy with appropriate safeguards and failure containment plan</td>
                        </tr>
                        <tr>
                            <td><strong>Testing Readiness</strong></td>
                            <td>Must demonstrate necessary resources, well-developed testing plans/scenarios, KPIs and expected outcomes</td>
                        </tr>
                        <tr>
                            <td><strong>Deployment Post-Testing</strong></td>
                            <td>Must demonstrate intention and ability to deploy solution on a broader scale with a sandbox exit strategy</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Innovation Sandbox */}
            <section id="innovation-sandbox">
                <h2>IFSCA FinTech Innovation Sandbox (FIS)</h2>
                <p>
                    The Innovation Sandbox allows TechFin entities to <strong>develop and test their ideas or solutions in isolation from the live market</strong>. Market-related data is made available by Financial Institutions operating in IFSC for testing purposes.
                </p>
                <div className="info-box">
                    <strong>Key Advantage:</strong> Applicants who participated in IFSCA-supported Cohorts or Special Programmes may receive relaxation from certain stages of the application screening process, provided they fulfil the eligibility criteria.
                </div>
            </section>

            {/* IoRS */}
            <section id="iors">
                <h2>Inter-Operable Regulatory Sandbox (IoRS)</h2>
                <p>
                    The IoRS is a testing environment for <strong>innovative hybrid TechFin products/services falling within the regulatory ambit of more than one domestic financial sector regulator</strong>. It combines sandbox facilities of RBI, SEBI, IRDAI, PFRDA and IFSCA, with IFSCA as Principal Regulator.
                </p>
                <div className="info-box">
                    <strong>Who Should Use IoRS:</strong> TechFin companies whose solutions simultaneously touch banking (RBI), capital markets (SEBI), insurance (IRDAI) and pension (PFRDA) domains — for example, a unified financial data platform or a cross-sector AI compliance tool.
                </div>
            </section>

            {/* Overseas Referral */}
            <section id="overseas-referral">
                <h2>Overseas Regulatory Referral Mechanism</h2>
                <p>
                    Foreign TechFins seeking entry to India shall be considered for the Overseas Regulatory Referral Mechanism (also called FinTech Bridges) with <strong>IFSCA as Principal Regulator</strong>.
                </p>
                <p>
                    An applicant seeking to access this mechanism shall be governed as per the provisions of the MoU or collaboration or special arrangement between IFSCA and the corresponding overseas financial sector regulator(s).
                </p>
            </section>

            {/* Compliance */}
            <section id="compliance">
                <h2>Compliance & Reporting Requirements</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Audited Financial Statements</strong></td>
                            <td>Duly certified copy within 30 days of finalization, annually</td>
                        </tr>
                        <tr>
                            <td><strong>Regulatory Action Disclosure</strong></td>
                            <td>Details of any regulatory action within 15 days of receipt of notice</td>
                        </tr>
                        <tr>
                            <td><strong>Financial Reporting Currency</strong></td>
                            <td>All financial information submitted in US Dollars, unless otherwise specified by IFSCA</td>
                        </tr>
                        <tr>
                            <td><strong>Books of Accounts</strong></td>
                            <td>Maintained in freely convertible foreign currency (other than INR) as declared at application stage</td>
                        </tr>
                        <tr>
                            <td><strong>Authorized Representative</strong></td>
                            <td>Entity must appoint an Authorized Person for representing before IFSCA and ensuring compliance</td>
                        </tr>
                        <tr>
                            <td><strong>Material Change Notification</strong></td>
                            <td>Any material change in application information must be immediately notified to IFSCA</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Fees */}
            <section id="fees">
                <h2>Fees Structure</h2>
                <h3>Direct Entry Authorization</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>USD 500</td>
                        </tr>
                        <tr>
                            <td><strong>Authorization Fee</strong></td>
                            <td>USD 1,500 (Annual)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Sandbox (Limited Use Authorization) — Foreign Applicants</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Application Fee</strong></td>
                            <td>USD 100</td>
                        </tr>
                        <tr>
                            <td><strong>Limited Use Authorization Fee</strong></td>
                            <td>USD 500</td>
                        </tr>
                        <tr>
                            <td><strong>Extension Fee (post 12 months)</strong></td>
                            <td>USD 500</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Currency & Office */}
            <section id="currency">
                <h2>Currency & Office Setup</h2>
                <ul>
                    <li>TechFin entities must <strong>transact in freely convertible foreign currency only</strong></li>
                    <li>Administrative expenses may be defrayed in INR via an <strong>SNRR (Special Non-Resident Rupee) account</strong></li>
                    <li>Books of accounts must be maintained in the foreign currency declared at application stage</li>
                    <li>Financial reporting to IFSCA must be in <strong>US Dollars</strong></li>
                    <li>For Direct Entry: entity must set up office at GIFT IFSC post-authorization</li>
                    <li>For Sandbox: <strong>no office setup required</strong> unless a bank account is needed in IFSC</li>
                </ul>
            </section>

            {/* Incentive Scheme */}
            <section id="incentive-scheme">
                <h2>TechFin Incentive Scheme (IFSCA FinTech Incentive Scheme 2022)</h2>
                <p>TechFin entities at GIFT IFSC are eligible for the IFSCA FinTech Incentive Scheme 2022 grants:</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Grant Category</th>
                            <th>Description</th>
                            <th>Max Grant (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>FinTech / TechFin Start-up Grant</strong></td>
                            <td>For early-stage start-up at an idea stage</td>
                            <td>INR 15 Lakhs</td>
                        </tr>
                        <tr>
                            <td><strong>Proof of Concept Grant</strong></td>
                            <td>For conducting a PoC in GIFT IFSC or globally</td>
                            <td>INR 50 Lakhs</td>
                        </tr>
                        <tr>
                            <td><strong>Sandbox Grant</strong></td>
                            <td>For TechFin entities selected for IFSCA Sandbox (Limited-Use Authorization)</td>
                            <td>INR 30 Lakhs</td>
                        </tr>
                        <tr>
                            <td><strong>Green FinTech Grant</strong></td>
                            <td>For TechFin focused on Sustainable/Green Finance technology</td>
                            <td>INR 75 Lakhs</td>
                        </tr>
                        <tr>
                            <td><strong>Accelerator Grant</strong></td>
                            <td>To support accelerators/cohorts at GIFT IFSC</td>
                            <td>INR 10 Lakhs per Cohort</td>
                        </tr>
                        <tr>
                            <td><strong>Listing Support at IFSC</strong></td>
                            <td>To support IFSC-registered TechFin aspiring to go global</td>
                            <td>INR 15 Lakhs</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    <strong>Green TechFin Advantage:</strong> TechFin companies focused on Climate Tech, Green Finance, Sustainable Tech and ESG-related technology are eligible for the highest grant of <strong>INR 75 Lakhs</strong> under the Green FinTech Grant category.
                </div>
            </section>

            {/* Key Advantages */}
            <section id="advantages">
                <h2>Key Advantages for TechFin Entities at GIFT IFSC</h2>
                <div className="step-timeline">
                    <div className="step-item">
                        <div className="step-dot">1</div>
                        <div className="step-card">
                            <h4>Unified Regulatory Window</h4>
                            <p>IFSCA acts as a single unified regulator combining powers of RBI, SEBI, IRDAI and PFRDA — one authorization covers the entire financial services ecosystem in IFSC.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">2</div>
                        <div className="step-card">
                            <h4>Low-Cost Market Entry via Sandbox</h4>
                            <p>TechFin companies can test solutions with minimal requirements — no office, no deployable product, no revenue track record — at just USD 100 application fee.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">3</div>
                        <div className="step-card">
                            <h4>Access to Global Financial Institutions</h4>
                            <p>GIFT IFSC is home to IBUs, insurance companies, capital market intermediaries, NBFCs and asset management firms — all potential customers for TechFin solutions.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">4</div>
                        <div className="step-card">
                            <h4>Competitive Tax Regime</h4>
                            <p>Tax holiday on business income for 10 out of 15 years. Zero GST, MAT exemption, and other competitive tax benefits for entities operating in GIFT IFSC.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">5</div>
                        <div className="step-card">
                            <h4>Financial Incentive Grants</h4>
                            <p>Up to INR 75 Lakhs in grants for Green/Sustainable TechFin solutions, plus grants for PoC, Sandbox, Startup and Listing support.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">6</div>
                        <div className="step-card">
                            <h4>Global FinTech Hub Recognition</h4>
                            <p>GIFT IFSC ranked top globally among financial centers likely to become more significant — providing TechFin companies with international credibility and market access.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-dot">7</div>
                        <div className="step-card">
                            <h4>Overseas Regulatory Bridges</h4>
                            <p>IFSCA's FinTech Bridge MoUs with overseas regulators allow TechFin companies to simultaneously access international markets while operating from GIFT IFSC.</p>
                        </div>
                    </div>
                </div>
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
