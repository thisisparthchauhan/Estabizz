"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "what-is-nbfc-aa", title: "What is NBFC-AA" },
        { id: "regulatory-framework", title: "Regulatory Framework" },
        { id: "aa-ecosystem-participants", title: "AA Ecosystem Participants" },
        { id: "who-needs", title: "Who Needs This License" },
        { id: "eligibility", title: "Eligibility Criteria" },
        { id: "documents", title: "Documents Required" },
        { id: "process", title: "Registration Process" },
        { id: "consent-architecture", title: "Consent Architecture" },
        { id: "technology-architecture", title: "Technology Architecture" },
        { id: "it-governance-cybersecurity", title: "IT Governance &amp; Cybersecurity" },
        { id: "nbfc-aa-vs-traditional-nbfc", title: "NBFC-AA vs Traditional NBFC" },
        { id: "revenue-model", title: "Revenue Model" },
        { id: "fees", title: "Fees &amp; Costs" },
        { id: "timeline", title: "Timeline" },
        { id: "post-registration-compliance", title: "Post-Registration Compliance" },
        { id: "faqs", title: "FAQs" },
    ];

    const faqs: { q: string; a: string }[] = [
        {
            q: "What is an NBFC Account Aggregator?",
            a: "An NBFC Account Aggregator (NBFC-AA) is a class of Non-Banking Financial Company registered with the Reserve Bank of India that facilitates the secure, consent-based sharing of financial data between Financial Information Providers (FIPs) and Financial Information Users (FIUs). It acts purely as a data conduit — not a financial intermediary.",
        },
        {
            q: "Can an Account Aggregator store customer financial data?",
            a: "No. An NBFC-AA is strictly prohibited from storing customer financial data. It operates as a transient, encrypted data pipe — data passes through the AA system only during the transmission process and is never retained or warehoused.",
        },
        {
            q: "What is a Financial Information Provider (FIP)?",
            a: "A Financial Information Provider (FIP) is an entity that holds customer financial data and is registered to share it via the AA framework. Examples include banks, NBFCs, mutual fund depositories, insurance companies, and pension fund managers.",
        },
        {
            q: "What is a Financial Information User (FIU)?",
            a: "A Financial Information User (FIU) is an entity that consumes customer financial data (with consent) through the AA ecosystem. Examples include lending platforms, wealth management applications, and fintech companies that use financial data for credit assessment or advisory services.",
        },
        {
            q: "What is consent architecture in the AA framework?",
            a: "Consent architecture refers to the technical and operational framework through which a customer explicitly authorises the sharing of their financial data. The consent must be time-bound, purpose-specific, revocable at any time, and fully auditable. A robust consent management system is central to RBI&apos;s evaluation of an AA application.",
        },
        {
            q: "What is the minimum capital requirement for an NBFC-AA?",
            a: "The minimum Net Owned Fund (NOF) required for an NBFC-AA registration is ₹2 crore. This must be maintained on a continuous basis. NOF is computed as paid-up equity capital plus free reserves minus accumulated losses and intangible assets.",
        },
        {
            q: "Can an Account Aggregator lend money?",
            a: "No. An NBFC-AA is a restricted category of NBFC that can only facilitate data sharing. It cannot undertake lending, accept deposits, or engage in any other financial intermediation activity. Its sole business is consented data facilitation.",
        },
        {
            q: "What is the difference between an NBFC-AA and a traditional NBFC?",
            a: "A traditional NBFC engages in financial intermediation — lending, leasing, investments — and earns interest income. An NBFC-AA only facilitates encrypted, consent-based data sharing between FIPs and FIUs. It cannot lend or store data, faces no direct credit risk, and is evaluated by RBI primarily on technology and consent architecture rather than capital adequacy.",
        },
        {
            q: "What technology is required to operate as an NBFC-AA?",
            a: "An NBFC-AA must have an API-based integration system, end-to-end encryption for all data in transit, a customer-facing consent dashboard, real-time authentication mechanisms, and comprehensive audit logs. RBI evaluates the architecture design itself — not just policy documents.",
        },
        {
            q: "How does the revenue model of an NBFC-AA work?",
            a: "An NBFC-AA earns revenue through service-based fees: API usage charges billed to FIUs per data request, subscription fees from financial institutions, and per-transaction data access charges. Importantly, an AA cannot monetise customer data directly — all income must be service-based.",
        },
        {
            q: "What activities are prohibited for an NBFC-AA?",
            a: "An NBFC-AA is prohibited from: storing customer financial data, using data for analytics without explicit consent, selling or monetising data, conducting lending or deposit-taking activities, performing unsolicited data requests, and undertaking any NBFC activity other than data facilitation.",
        },
        {
            q: "How long does RBI approval for an NBFC-AA license take?",
            a: "The overall timeline is approximately 4 to 9 months: 3 to 6 weeks for preparation (including technology setup), 3 to 6 months for RBI review and scrutiny of documents and IT architecture, and 1 to 2 months for final approval after compliance confirmation.",
        },
        {
            q: "What is the COSMOS portal?",
            a: "COSMOS (Company Submission Portal) is the RBI&apos;s online portal through which NBFC license applications, including NBFC-AA registrations, are submitted. Applicants must upload all required documents and the complete application package through this portal.",
        },
        {
            q: "What is the consent flow in the AA ecosystem?",
            a: "The consent flow is: (1) Customer initiates a consent request on the AA platform, (2) AA routes the consent request to the relevant FIP, (3) FIP shares the requested data only after consent is confirmed, (4) AA routes the encrypted data to the FIU, (5) Customer can revoke consent at any point, and (6) all steps are fully logged and auditable.",
        },
        {
            q: "Can a fintech company become an AA or simply tie up with one?",
            a: "A fintech company can either apply for its own NBFC-AA registration (if it meets all RBI eligibility criteria including ₹2 crore NOF and a robust technology framework) or partner with an existing licensed AA to access data-sharing services. The tie-up route is faster and avoids the licensing overhead for most fintechs.",
        },
        {
            q: "What is the purpose of the FLA return for an NBFC-AA?",
            a: "The Foreign Liabilities and Assets (FLA) return must be filed by NBFC-AAs that have received foreign direct investment or hold foreign assets. It is filed annually with the RBI through the FLAIR portal and is a statutory compliance requirement under FEMA.",
        },
        {
            q: "What are the data breach obligations for an NBFC-AA?",
            a: "In the event of a cybersecurity incident or data breach, an NBFC-AA must report the incident to both CERT-In (within the prescribed timeline under CERT-In directions) and to the RBI. The entity must also have a documented incident response framework in place as part of its IT governance policy.",
        },
        {
            q: "Can an NBFC-AA carry out other NBFC activities?",
            a: "No. An NBFC-AA is a restricted category and cannot engage in any other NBFC activity such as lending, hire-purchase, leasing, or asset finance. Its Certificate of Registration from RBI restricts it solely to account aggregation and data facilitation services.",
        },
        {
            q: "What is the practical use of the AA framework in digital lending?",
            a: "In digital lending, the AA framework enables lenders (FIUs) to access a borrower&apos;s verified financial data — bank statements, GST returns, investment portfolios — with the borrower&apos;s explicit consent, in real time. This replaces manual document submission, accelerates credit underwriting, and significantly reduces fraud risk.",
        },
        {
            q: "Why should I engage a professional for the NBFC-AA license application?",
            a: "The NBFC-AA license involves a complex blend of regulatory compliance, technology architecture evaluation, and document preparation. RBI scrutinises not only the documents but the actual IT system design. A compliance professional helps align your application with RBI&apos;s expectations, avoid common rejection reasons, and significantly improve the probability and speed of approval.",
        },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "🏦", label: "RBI" },
                { emoji: "🏢", label: "NBFC" },
                { emoji: "🔗", label: "Account Aggregator" },
                { emoji: "📜", label: "AA License" },
                { emoji: "📊", label: "Data Sharing" },
                { emoji: "💡", label: "Fintech" },
                { emoji: "🌐", label: "Open Banking" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "RBI Services", href: "/rbi" },
                { label: "NBFC Account Aggregator License" },
            ]}
            title="NBFC Account Aggregator License: Complete RBI Registration Guide"
            readTime="18 min read"
            focusKeyword="NBFC Account Aggregator License"
            sections={sections}
            ctaTitle="Get Expert Help with Your NBFC-AA License"
            ctaDescription="The RBI scrutinises your technology architecture as closely as your documents. Our compliance experts help you build the right foundation — from consent management systems to the complete registration package — so your application stands on solid ground."
            quickFacts={[
                { label: "Regulator", value: "RBI" },
                { label: "Min Net Owned Fund", value: "₹2 Crore" },
                { label: "Application Fee", value: "NIL" },
                { label: "Approval Timeline", value: "4–9 months" },
                { label: "Core Principle", value: "Consent-based data only" },
                { label: "Data Storage", value: "Prohibited" },
                { label: "Expert Review", value: "✓ Verified" },
            ]}
            relatedArticles={[
                { title: "LendTech Services", href: "/rbi/lendtech-services", category: "RBI", description: "Comprehensive guide to building RBI-compliant digital lending platforms in India." },
                { title: "FEMA Compliance", href: "/fema/compliance-under-fema", category: "FEMA", description: "Complete guide to Foreign Exchange Management Act compliance obligations." },
                { title: "Data Storage Policy", href: "/services/data-storage-policy", category: "Services", description: "Regulatory data localisation and storage obligations for fintech companies." },
                { title: "Depository Participant Registration", href: "/sebi/depository-participant-sebi-registration", category: "SEBI", description: "How to become a SEBI-registered Depository Participant with NSDL or CDSL." },
            ]}
            finalCtaTitle="Start Your NBFC-AA Registration Journey"
            finalCtaDescription="The Account Aggregator framework is reshaping India&apos;s financial data landscape. Whether you are building a new AA platform or integrating with the ecosystem, our team provides end-to-end support — from technology architecture review to RBI application submission."
        >
            <section id="introduction">
                <h2>Introduction to NBFC Account Aggregator License</h2>
                <p>
                    The NBFC Account Aggregator (NBFC-AA) is a specialised category of Non-Banking Financial Company
                    registered with the Reserve Bank of India. An NBFC-AA is authorised to collect and share the
                    financial data of customers securely, and exclusively on the basis of their explicit consent. It
                    does not deal with money — only with the secure, structured flow of financial information.
                </p>
                <p>
                    The AA framework is built on a <strong>data fiduciary model</strong>. The Account Aggregator acts
                    only as a conduit — a regulated data pipe — between financial institutions that hold data and those
                    that need it. It is not a data warehouse. It does not retain, analyse, or monetise customer data
                    independently.
                </p>
                <div className="info-box">
                    <strong>Critical Regulatory Principle:</strong> An NBFC-AA acts ONLY as a transient data conduit,
                    never as a data warehouse. Data passes through the AA system in encrypted form and is never stored.
                    This is the foundational principle of the entire framework.
                </div>
                <p>
                    The growing importance of this framework cannot be overstated. The AA ecosystem is the backbone of
                    open banking in India, enabling instant digital lending decisions, personal finance management (PFM)
                    applications, insurance underwriting based on verified financial data, and wealth management
                    platforms that require a holistic view of a customer&apos;s finances — all with the customer in
                    full control of their data.
                </p>
            </section>

            <section id="what-is-nbfc-aa">
                <h2>What is an NBFC Account Aggregator</h2>
                <p>
                    In simple terms, an NBFC-AA is a bridge between financial institutions and their customers. It
                    securely transfers a customer&apos;s financial data from institutions that hold it to institutions
                    that the customer wishes to share it with — based entirely on the customer&apos;s explicit,
                    time-bound, and revocable consent.
                </p>
                <p>
                    From a compliance perspective, an NBFC-AA is a restricted category of NBFC registered under the
                    Reserve Bank of India Act. Its activities are strictly limited to data facilitation — it cannot
                    lend, accept deposits, or engage in any other form of financial intermediation.
                </p>
                <p>
                    Legally, the framework operates under the{" "}
                    <strong>RBI Master Directions &ndash; NBFC Account Aggregator</strong>, the IT Act 2000, and the
                    data privacy and consent frameworks including the Digital Personal Data Protection (DPDP) Act.
                </p>
                <div className="warning-box">
                    <strong>What an NBFC-AA CANNOT do:</strong>
                    <ul>
                        <li>Store customer financial data at any point</li>
                        <li>Use financial data for analytics or profiling without explicit, purpose-specific consent</li>
                        <li>Sell, monetise, or transfer customer data to any third party independently</li>
                        <li>Engage in lending, investments, or any other NBFC activity</li>
                    </ul>
                </div>
            </section>

            <section id="regulatory-framework">
                <h2>Regulatory Framework</h2>
                <p>
                    The NBFC-AA framework is governed by a layered regulatory structure combining RBI directions, IT
                    law, and evolving data privacy legislation.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Regulatory Dimension</th>
                            <th>Governing Authority / Instrument</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Primary Regulator</td>
                            <td>Reserve Bank of India (RBI)</td>
                        </tr>
                        <tr>
                            <td>Governing Law</td>
                            <td>RBI Act 1934 &amp; FEMA (where applicable)</td>
                        </tr>
                        <tr>
                            <td>Master Direction</td>
                            <td>NBFC &ndash; Account Aggregator Directions (RBI)</td>
                        </tr>
                        <tr>
                            <td>Ecosystem Participants</td>
                            <td>Financial Information Providers (FIPs), Financial Information Users (FIUs), Account Aggregators (AAs)</td>
                        </tr>
                        <tr>
                            <td>IT Framework</td>
                            <td>RBI IT Framework for NBFCs &amp; CERT-In Directions</td>
                        </tr>
                        <tr>
                            <td>Data Privacy</td>
                            <td>IT Act 2000 &amp; Digital Personal Data Protection (DPDP) Act — consent framework</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="aa-ecosystem-participants">
                <h2>AA Ecosystem Participants</h2>
                <p>
                    The Account Aggregator ecosystem comprises four distinct participants, each with a defined role.
                    Understanding this structure is essential before applying for an NBFC-AA registration.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Participant</th>
                            <th>Role</th>
                            <th>Examples</th>
                            <th>Position in Ecosystem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>FIP</strong> (Financial Information Provider)
                            </td>
                            <td>Data Provider</td>
                            <td>Banks, NBFCs, Mutual Funds, Insurance Companies</td>
                            <td>Holds customer financial data</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>FIU</strong> (Financial Information User)
                            </td>
                            <td>Data User</td>
                            <td>Lenders, fintech lending apps, wealth management platforms</td>
                            <td>Consumes customer financial data</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>AA</strong> (Account Aggregator)
                            </td>
                            <td>Data Facilitator</td>
                            <td>Licensed NBFC-AA entities</td>
                            <td>Routes data from FIP to FIU with consent</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Customer</strong>
                            </td>
                            <td>Data Owner</td>
                            <td>Individual / Business</td>
                            <td>Gives or revokes consent; controls all data sharing</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="who-needs">
                <h2>Who Needs an NBFC-AA License</h2>
                <p>
                    Any entity that intends to operate as a data aggregation intermediary within India&apos;s
                    regulated financial ecosystem needs an NBFC-AA registration from the RBI. This includes:
                </p>
                <ul>
                    <li>
                        <strong>Fintech companies</strong> offering financial data aggregation as a core service to
                        banks, NBFCs, or other financial institutions
                    </li>
                    <li>
                        <strong>Digital lending platforms</strong> that intend to use customer financial data for
                        credit assessment in a structured, regulated manner
                    </li>
                    <li>
                        <strong>Wealth management platforms</strong> that need a holistic view of a
                        customer&apos;s financial profile across multiple institutions
                    </li>
                    <li>
                        <strong>Digital banks and neo-banks</strong> seeking to build open banking capabilities
                        on a regulated data infrastructure
                    </li>
                    <li>
                        <strong>Personal Finance Management (PFM) applications</strong> that aggregate account
                        data across institutions to provide financial insights to users
                    </li>
                </ul>
                <div className="info-box">
                    Entities that do not wish to operate independently as an AA can instead partner with a
                    licensed NBFC-AA. The tie-up route is commercially faster and avoids full licensing overhead
                    for most fintechs.
                </div>
            </section>

            <section id="eligibility">
                <h2>Eligibility Criteria</h2>
                <p>
                    RBI has prescribed specific eligibility criteria for entities seeking to register as
                    NBFC-AAs. Meeting these criteria is a prerequisite before submitting the application.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Requirement</th>
                            <th>Practical Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Entity Type</td>
                            <td>Company incorporated under the Companies Act</td>
                            <td>Mandatory — LLPs and individuals are not eligible</td>
                        </tr>
                        <tr>
                            <td>Net Owned Fund (NOF)</td>
                            <td>Minimum ₹2 crore</td>
                            <td>
                                Must be maintained continuously; NOF = paid-up equity capital + free reserves &minus;
                                accumulated losses &minus; intangible assets
                            </td>
                        </tr>
                        <tr>
                            <td>Promoter Fit &amp; Proper</td>
                            <td>Clean track record</td>
                            <td>RBI evaluates credibility, background, and financial integrity of all promoters and directors</td>
                        </tr>
                        <tr>
                            <td>IT Infrastructure</td>
                            <td>Secure, scalable, API-ready system</td>
                            <td>
                                Critical for approval — RBI evaluates the actual architecture design, not just policy
                                documents
                            </td>
                        </tr>
                        <tr>
                            <td>Data Security Framework</td>
                            <td>End-to-end encryption, consent management, audit logs</td>
                            <td>RBI&apos;s primary focus area; ISO-level standards are expected</td>
                        </tr>
                        <tr>
                            <td>Business Model</td>
                            <td>Pure data facilitation — no lending, no data storage</td>
                            <td>An NBFC-AA cannot conduct any other NBFC activity</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="documents">
                <h2>Documents Required</h2>
                <p>
                    A complete and well-prepared document package is critical for a successful NBFC-AA application.
                    The following documents are required:
                </p>
                <ul>
                    <li>
                        <strong>Certificate of Incorporation (COI)</strong> — issued by the Ministry of Corporate
                        Affairs
                    </li>
                    <li>
                        <strong>MOA &amp; AOA</strong> — the Memorandum and Articles of Association must explicitly
                        include Account Aggregator activity in the objects clause
                    </li>
                    <li>
                        <strong>Net Worth Certificate</strong> — CA-certified certificate clearly demonstrating
                        minimum ₹2 crore Net Owned Fund
                    </li>
                    <li>
                        <strong>Detailed Business Plan</strong> — comprehensive plan explaining how the AA will
                        operate, including proposed FIP and FIU partnerships and revenue model
                    </li>
                    <li>
                        <strong>IT Policy &amp; Architecture Document</strong> — system design documentation
                        including API framework, security architecture, and data flow diagrams
                    </li>
                    <li>
                        <strong>Data Privacy Policy</strong> — documenting the consent management system, customer
                        rights framework, and data flow procedures
                    </li>
                    <li>
                        <strong>Director KYC</strong> — PAN, Aadhaar, and background verification for all directors
                        and key management personnel
                    </li>
                    <li>
                        <strong>Board Resolution</strong> — authorising the company to apply for NBFC-AA registration
                        with the RBI
                    </li>
                </ul>
                <div className="warning-box">
                    The IT Policy and Architecture Document is not a formality — RBI actively scrutinises the
                    technical design. Weak or generic IT documentation is one of the most common reasons for
                    application delays or rejection.
                </div>
            </section>

            <section id="process">
                <h2>Registration Process</h2>
                <p>
                    The NBFC-AA registration process involves six key steps. Each step must be completed
                    thoroughly before proceeding to the next.
                </p>
                <ol className="step-timeline">
                    <li>
                        <strong>Step 1: Incorporate the Company</strong>
                        <p>
                            Incorporate a company under the Companies Act 2013. Ensure that the Memorandum of
                            Association explicitly includes Account Aggregator activity — data facilitation and
                            consent-based financial data sharing — in the objects clause. This is a mandatory
                            prerequisite for the RBI application.
                        </p>
                    </li>
                    <li>
                        <strong>Step 2: Achieve Minimum Net Owned Fund</strong>
                        <p>
                            Ensure the company has a minimum Net Owned Fund of ₹2 crore at the time of
                            application. Obtain a CA-certified Net Worth Certificate confirming this. The NOF
                            must be maintained on a continuous basis even after registration.
                        </p>
                    </li>
                    <li>
                        <strong>Step 3: Build the IT and Data Security Framework</strong>
                        <p>
                            This is the most critical and time-intensive step. Develop a robust, API-based
                            integration system with end-to-end encryption, a customer-facing consent management
                            dashboard, real-time authentication, and comprehensive audit logging. The architecture
                            must meet RBI&apos;s IT framework requirements and ISO-level security standards.
                        </p>
                    </li>
                    <li>
                        <strong>Step 4: Prepare the Complete Application Package</strong>
                        <p>
                            Compile all required documents — including the business plan, IT architecture
                            documentation, data privacy policy, director KYC, Net Worth Certificate, and board
                            resolutions. Each document must be accurate, complete, and consistent with the others.
                        </p>
                    </li>
                    <li>
                        <strong>Step 5: Submit Application via RBI COSMOS Portal</strong>
                        <p>
                            Submit the complete NBFC-AA registration application through the RBI&apos;s COSMOS
                            (Company Submission) portal. All documents must be uploaded in the prescribed format.
                            Incomplete submissions result in automatic delays.
                        </p>
                    </li>
                    <li>
                        <strong>Step 6: RBI Scrutiny and Certificate of Registration</strong>
                        <p>
                            RBI conducts a detailed review of the application, including scrutiny of the IT
                            architecture and the consent management framework. The RBI may request clarifications
                            or additional information. Upon satisfactory compliance, the Certificate of
                            Registration as an NBFC-AA is granted.
                        </p>
                    </li>
                </ol>
            </section>

            <section id="consent-architecture">
                <h2>Consent Architecture</h2>
                <p>
                    The consent architecture is the heart of the NBFC-AA framework. The entire regulatory model
                    is built on the principle that customer financial data can only be shared with{" "}
                    <strong>explicit, revocable, and granular consent</strong>. Without a strong consent
                    management system, RBI approval is not achievable.
                </p>
                <p>The four defining characteristics of AA consent are:</p>
                <ul>
                    <li>
                        <strong>Time-bound access</strong> — consent is not permanent; it is granted for a
                        defined period and expires automatically
                    </li>
                    <li>
                        <strong>Purpose-specific sharing</strong> — data can only be shared for the stated
                        purpose at the time of consent; it cannot be repurposed
                    </li>
                    <li>
                        <strong>Revocable at any time</strong> — the customer can withdraw consent at any
                        point, immediately stopping further data sharing
                    </li>
                    <li>
                        <strong>Fully auditable</strong> — every consent action (grant, use, revocation) must
                        be logged and traceable
                    </li>
                </ul>
                <div className="info-box">
                    <strong>Consent Flow:</strong>
                    <ol>
                        <li>Customer initiates a consent request on the AA platform</li>
                        <li>AA routes the consent request to the relevant FIP</li>
                        <li>FIP shares the requested data only after consent is confirmed</li>
                        <li>AA routes the encrypted data to the FIU</li>
                        <li>Customer can revoke consent at any point during or after the process</li>
                        <li>All actions are logged with complete audit trails</li>
                    </ol>
                </div>
            </section>

            <section id="technology-architecture">
                <h2>Technology Architecture</h2>
                <p>
                    The NBFC-AA is one of the most technology-intensive licenses issued by the RBI. Unlike most
                    other NBFC categories where the primary regulatory focus is on capital adequacy and credit
                    norms, the RBI evaluates the actual technology architecture of an AA applicant — not merely
                    its policy documents.
                </p>
                <p>The following technology components are mandatory for an operational NBFC-AA:</p>
                <ul>
                    <li>
                        <strong>API-based integration system</strong> — all data exchange between the AA, FIPs,
                        and FIUs must occur through secure, standardised APIs; no manual data transfer is
                        permissible
                    </li>
                    <li>
                        <strong>End-to-end encryption</strong> — data must never exist in plaintext at any
                        point during transmission; encryption must cover data at rest and in transit
                    </li>
                    <li>
                        <strong>Consent management dashboard</strong> — a customer-facing interface through
                        which users can view, manage, and revoke their consent in real time
                    </li>
                    <li>
                        <strong>Real-time authentication system</strong> — robust multi-factor authentication
                        for all customer interactions
                    </li>
                    <li>
                        <strong>Audit logs &amp; monitoring tools</strong> — comprehensive logging of all
                        system events, data access requests, and consent transactions
                    </li>
                </ul>
                <div className="warning-box">
                    RBI evaluates the architecture design itself — not just documentation. Applicants who
                    submit generic IT policy documents without a credible technical implementation are likely
                    to face delays or rejection.
                </div>
            </section>

            <section id="it-governance-cybersecurity">
                <h2>IT Governance &amp; Cybersecurity</h2>
                <p>
                    Given that an NBFC-AA handles sensitive financial data of customers across multiple
                    institutions, RBI imposes a high standard of IT governance and cybersecurity. The following
                    requirements are expected:
                </p>
                <ul>
                    <li>
                        <strong>ISO-level security standards</strong> — ISO 27001 certification is strongly
                        recommended and signals credibility to RBI evaluators
                    </li>
                    <li>
                        <strong>Regular VAPT</strong> — Vulnerability Assessment and Penetration Testing must
                        be conducted periodically to identify and remediate security weaknesses
                    </li>
                    <li>
                        <strong>Data encryption at all stages</strong> — encryption must apply to data both at
                        rest (if any temporary buffering occurs) and in transit at all times
                    </li>
                    <li>
                        <strong>Incident response framework</strong> — a documented, tested framework for
                        detecting, responding to, and reporting cybersecurity incidents
                    </li>
                    <li>
                        <strong>No data retention</strong> — the system must be designed for temporary
                        encrypted transmission only; no financial data may be stored beyond the transmission
                        lifecycle
                    </li>
                </ul>
                <div className="info-box">
                    Cybersecurity incidents must be reported to both CERT-In (within the mandated timeline
                    under CERT-In directions) and to the RBI. An incident response framework is not merely
                    best practice — it is a regulatory expectation.
                </div>
            </section>

            <section id="nbfc-aa-vs-traditional-nbfc">
                <h2>NBFC-AA vs Traditional NBFC</h2>
                <p>
                    The NBFC-AA is a fundamentally different entity from a traditional NBFC. Understanding
                    these differences is important for promoters deciding which regulatory path to pursue.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>NBFC-AA</th>
                            <th>Traditional NBFC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Core Activity</td>
                            <td>Data sharing &amp; facilitation (consent-based)</td>
                            <td>Lending, deposits, financial intermediation</td>
                        </tr>
                        <tr>
                            <td>Revenue Source</td>
                            <td>API usage charges, subscription fees</td>
                            <td>Interest income, processing fees</td>
                        </tr>
                        <tr>
                            <td>Financial Risk</td>
                            <td>Low — no lending exposure or credit risk</td>
                            <td>High — direct credit risk on loan book</td>
                        </tr>
                        <tr>
                            <td>Data Handling</td>
                            <td>Cannot store customer financial data</td>
                            <td>Not applicable — deals in money, not data</td>
                        </tr>
                        <tr>
                            <td>RBI Scrutiny Focus</td>
                            <td>Technology architecture &amp; consent framework</td>
                            <td>Capital adequacy, credit norms, NPA management</td>
                        </tr>
                        <tr>
                            <td>Minimum NOF</td>
                            <td>₹2 crore</td>
                            <td>Varies by category (₹2 crore+ for most)</td>
                        </tr>
                        <tr>
                            <td>Can it lend?</td>
                            <td>
                                <strong>NO</strong>
                            </td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="revenue-model">
                <h2>Revenue Model</h2>
                <p>
                    The revenue model of an NBFC-AA is service-based, not data-based. An AA is strictly
                    prohibited from monetising customer data directly. All permissible income must come from
                    services rendered to ecosystem participants.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Revenue Source</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>API Usage Charges</td>
                            <td>Fees charged to FIUs per data request processed through the AA platform</td>
                        </tr>
                        <tr>
                            <td>Subscription Model</td>
                            <td>Annual or monthly subscription fees from financial institutions (FIPs and FIUs) for platform access</td>
                        </tr>
                        <tr>
                            <td>Data Access Fees</td>
                            <td>Per-transaction charges for each data retrieval and sharing event</td>
                        </tr>
                    </tbody>
                </table>
                <div className="warning-box">
                    <strong>Important:</strong> An NBFC-AA cannot sell, share, or monetise customer data
                    independently under any circumstances. All revenue must be earned through legitimate
                    service-based charges to ecosystem participants.
                </div>
                <blockquote className="expert-quote">
                    <p>
                        &ldquo;The NBFC Account Aggregator model is a paradigm shift in financial data governance
                        — from institution-controlled data to customer-controlled consent. The technical
                        robustness of your consent architecture is what RBI scrutinises most closely. A strong
                        technology foundation is not optional; it is the license.&rdquo;
                    </p>
                    <footer>
                        — <strong>CS Devyani Khambhati</strong>, Compliance Expert
                    </footer>
                </blockquote>
            </section>

            <section id="fees">
                <h2>Fees &amp; Costs</h2>
                <p>
                    The cost of obtaining an NBFC-AA registration is primarily driven by technology
                    infrastructure investment rather than regulatory fees. The RBI does not charge an
                    application fee.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Cost Component</th>
                            <th>Amount / Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RBI Application Fee</td>
                            <td>NIL</td>
                        </tr>
                        <tr>
                            <td>Professional Fees (legal &amp; compliance)</td>
                            <td>Variable — depends on scope of engagement and complexity of application</td>
                        </tr>
                        <tr>
                            <td>Technology Infrastructure</td>
                            <td>HIGH — this is the most significant cost component; API systems, encryption, consent platform, security testing</td>
                        </tr>
                        <tr>
                            <td>CA Net Worth Certificate</td>
                            <td>Approximately ₹10,000 &ndash; ₹25,000</td>
                        </tr>
                    </tbody>
                </table>
                <div className="info-box">
                    Technology infrastructure is the dominant cost for any NBFC-AA applicant. Entities that
                    underinvest in their technical foundation risk rejection at the RBI scrutiny stage —
                    making the investment essential, not optional.
                </div>
            </section>

            <section id="timeline">
                <h2>Timeline</h2>
                <p>
                    The total timeline from commencement of preparation to receipt of the Certificate of
                    Registration is typically 4 to 9 months, depending on the readiness of the applicant&apos;s
                    technology infrastructure and the completeness of the application.
                </p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Duration</th>
                            <th>Key Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Preparation</td>
                            <td>3 &ndash; 6 weeks</td>
                            <td>Company incorporation, NOF structuring, IT framework development (technology setup is the critical path)</td>
                        </tr>
                        <tr>
                            <td>RBI Review</td>
                            <td>3 &ndash; 6 months</td>
                            <td>Application scrutiny, IT architecture inspection, compliance framework evaluation (timeline is case-based)</td>
                        </tr>
                        <tr>
                            <td>Approval</td>
                            <td>1 &ndash; 2 months</td>
                            <td>Post-scrutiny compliance confirmation and issuance of Certificate of Registration</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="post-registration-compliance">
                <h2>Post-Registration Compliance</h2>
                <p>
                    Registration as an NBFC-AA is the beginning, not the end, of the compliance journey. RBI
                    expects ongoing adherence to strict operational and reporting standards.
                </p>
                <ul>
                    <li>
                        <strong>Consent-based data sharing only</strong> — no unsolicited data requests; every
                        data access event must be backed by a valid, active consent artefact
                    </li>
                    <li>
                        <strong>Strict no-data-storage policy</strong> — the AA must operate only as a
                        transient, encrypted data conduit at all times
                    </li>
                    <li>
                        <strong>Strong encryption protocols</strong> — end-to-end encryption for all data in
                        transmission must be maintained without exception
                    </li>
                    <li>
                        <strong>Periodic audit and reporting to RBI</strong> — regular statutory returns and
                        compliance reports must be filed with the Reserve Bank
                    </li>
                    <li>
                        <strong>Regular IT system audits</strong> — periodic Vulnerability Assessment and
                        Penetration Testing (VAPT) must be conducted and results documented
                    </li>
                    <li>
                        <strong>Cybersecurity incident reporting</strong> — all incidents must be reported to
                        CERT-In within the prescribed timeline and to the RBI
                    </li>
                    <li>
                        <strong>Maintain audit logs</strong> — comprehensive logs of all consent transactions,
                        data access events, and system activities must be maintained and available for
                        regulatory inspection
                    </li>
                </ul>
            </section>

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
