export interface FAQItem { q: string; a: string; }
export interface FAQGroup { title: string; items: FAQItem[]; }

export const faqGroups: FAQGroup[] = [
    {
        title: "General Overview", items: [
            { q: "What is a Finance Company in GIFT IFSC?", a: "A Finance Company in GIFT IFSC is an entity registered with the International Financial Services Centres Authority (IFSCA) under the Finance Company Regulations, 2021. It is permitted to undertake specified financial activities such as treasury management, lending arrangements, liquidity management, investment in financial instruments, and financial advisory for group entities operating across jurisdictions." },
            { q: "What is the purpose of establishing a Finance Company in IFSC?", a: "The framework allows multinational groups and financial institutions to centralise treasury operations, manage cross-border financing, and undertake international financial transactions within a regulated global financial centre." },
            { q: "What regulator supervises Finance Companies in GIFT IFSC?", a: "Finance Companies operating in IFSC are regulated by the International Financial Services Centres Authority (IFSCA), which is established under the IFSCA Act, 2019." },
            { q: "Is a Finance Company in IFSC the same as an NBFC?", a: "No. A Finance Company in IFSC operates under IFSCA regulations and primarily undertakes international financial services, while NBFCs in India are regulated by the Reserve Bank of India and operate mainly in the domestic market." },
            { q: "Can a Finance Company in IFSC act as a global treasury centre?", a: "Yes. The regulations specifically allow finance companies to operate as Global or Regional Corporate Treasury Centres for their group entities." },
            { q: "What kind of activities can a Finance Company in IFSC undertake?", a: "Permissible activities include capital raising, borrowing, credit arrangements, derivative transactions, foreign exchange transactions, liquidity management, financial advisory services, and investment in financial instruments." },
            { q: "Can a Finance Company in IFSC provide services to group companies only?", a: "Generally, the activities are undertaken for group entities or service recipients related to the parent organisation." },
            { q: "Can Indian companies establish a Finance Company in IFSC?", a: "Yes. Both Indian companies and foreign entities can establish a finance company or a branch in IFSC subject to regulatory approval." },
            { q: "Why do multinational companies set up treasury centres in IFSC?", a: "They benefit from a globally aligned regulatory framework, efficient cross-border financial structuring, and access to international capital markets." },
            { q: "Is the Finance Company structure used only by large corporate groups?", a: "Typically, it is adopted by corporate groups with international operations that require centralised financial management." },
        ]
    },
    {
        title: "Eligibility & Applicability", items: [
            { q: "Who can apply for registration as a Finance Company in IFSC?", a: "Entities incorporated in India or outside India may apply, either by setting up a company in IFSC or establishing a branch within IFSC." },
            { q: "Can a foreign company open a branch in IFSC to operate as a Finance Unit?", a: "Yes. Foreign companies can establish a branch structure known as a Finance Unit to undertake permissible activities." },
            { q: "Can individuals apply for a Finance Company registration in IFSC?", a: "No. The applicant must be a corporate entity." },
            { q: "Is prior experience in financial services required?", a: "The applicant must demonstrate capability to undertake the proposed financial activities and satisfy the regulator regarding infrastructure and expertise." },
            { q: "Do promoters need to satisfy a fit and proper requirement?", a: "Yes. Promoters, directors, and key managerial personnel must meet the fit and proper criteria prescribed by the regulator." },
            { q: "Can entities from any jurisdiction establish a Finance Company in IFSC?", a: "The parent entity must not be located in a jurisdiction identified by the Financial Action Task Force (FATF) as high risk." },
            { q: "Is local presence in IFSC mandatory?", a: "Yes. The entity must establish infrastructure and maintain an operational presence within IFSC." },
            { q: "Are employees required to be based in IFSC?", a: "Yes. The regulations require a minimum number of qualified personnel to be located in IFSC." },
            { q: "Can a group establish multiple Finance Companies in IFSC?", a: "This may be permitted subject to regulatory approval and justification of the business model." },
            { q: "Is approval required from any other authority besides IFSCA?", a: "The entity must also maintain a valid Letter of Approval under the Special Economic Zones framework." },
        ]
    },
    {
        title: "Legal & Regulatory Framework", items: [
            { q: "Which law governs Finance Companies in IFSC?", a: "The International Financial Services Centres Authority (Finance Company) Regulations, 2021 govern such entities." },
            { q: "Which Act established the IFSCA regulator?", a: "The International Financial Services Centres Authority Act, 2019 established the regulator." },
            { q: "Are AML and KYC regulations applicable to Finance Companies in IFSC?", a: "Yes. Finance companies must comply with AML, counter-terrorist financing, and KYC guidelines issued by IFSCA." },
            { q: "Are finance companies allowed to operate in foreign currencies?", a: "Yes. Most transactions within IFSC are conducted in specified foreign currencies." },
            { q: "Does FEMA apply to Finance Companies in IFSC?", a: "Where transactions involve Indian residents or cross-border financial flows, FEMA provisions may apply." },
            { q: "Are finance companies subject to corporate governance requirements?", a: "Yes. They must adopt board-approved governance policies and risk management frameworks." },
            { q: "Can the regulator inspect Finance Companies in IFSC?", a: "IFSCA has powers to supervise, inspect, and seek information from regulated entities." },
            { q: "Can regulations change over time?", a: "Yes. IFSCA may issue circulars, guidelines, or amendments to refine the regulatory framework." },
            { q: "Is registration perpetual once granted?", a: "The registration remains valid unless suspended, cancelled, or surrendered." },
            { q: "Can the regulator impose additional conditions on registration?", a: "Yes. IFSCA may impose conditions based on the applicant\u2019s business model." },
        ]
    },
    {
        title: "Registration / Application Process", items: [
            { q: "How does an entity apply for registration?", a: "Applications are submitted through the Single Window IT System (SWIT) portal of IFSCA." },
            { q: "What information must be included in the application?", a: "The applicant must provide details of its business model, financial capability, governance structure, and proposed activities." },
            { q: "Is a business plan required?", a: "Yes. The regulator expects applicants to demonstrate the viability and compliance of their business model." },
            { q: "Does the regulator review the promoters during application?", a: "Yes. The regulator evaluates promoters under fit and proper criteria." },
            { q: "What happens after submitting the application?", a: "IFSCA reviews the application and may request additional clarifications or documents." },
            { q: "Is provisional approval granted before final registration?", a: "Yes. The authority may issue provisional registration if the application meets initial criteria." },
            { q: "Can the regulator refuse registration?", a: "Yes. If the applicant does not meet regulatory requirements, the application may be rejected." },
            { q: "Can applicants withdraw their application?", a: "Yes. The applicant may withdraw the application before registration is granted." },
            { q: "When can the company start operations?", a: "Operations can begin only after the Certificate of Registration is issued." },
            { q: "Is the Certificate of Registration required before starting activities?", a: "Yes. Financial activities cannot commence before registration is granted." },
        ]
    },
    {
        title: "Capital, Net Worth & Infrastructure", items: [
            { q: "What is the minimum capital requirement for a Finance Company in IFSC?", a: "The minimum owned fund requirement is USD 200,000 for treasury centre activities." },
            { q: "What constitutes owned funds?", a: "Owned funds include paid-up capital, free reserves, and share premium balances." },
            { q: "Are intangible assets excluded from capital calculation?", a: "Yes. Certain deductions such as intangible assets and accumulated losses are excluded." },
            { q: "Must the capital be maintained continuously?", a: "Yes. The minimum capital must be maintained at all times." },
            { q: "Can capital be maintained at parent level for branches?", a: "In certain cases, capital may be maintained at the parent level." },
            { q: "Is physical office space required?", a: "Yes. The entity must maintain office infrastructure within IFSC." },
            { q: "Are IT systems required for treasury operations?", a: "Yes. Adequate operational and communication infrastructure is expected." },
            { q: "Is appointment of a compliance officer mandatory?", a: "Yes. A compliance officer must be appointed before operations commence." },
            { q: "Is there a requirement for risk management systems?", a: "Yes. Finance companies must maintain board-approved risk management frameworks." },
            { q: "Can infrastructure be outsourced?", a: "Operational arrangements may involve vendors but regulatory accountability remains with the entity." },
        ]
    },
    {
        title: "Documentation & Declarations", items: [
            { q: "What declarations must promoters provide during registration?", a: "Promoters must submit fit and proper declarations confirming integrity and financial credibility." },
            { q: "Must promoters disclose past regulatory actions?", a: "Yes. Any past regulatory enforcement actions must be disclosed." },
            { q: "Are legal proceedings required to be disclosed?", a: "Yes. Any ongoing investigations or legal proceedings must be disclosed." },
            { q: "Must directors disclose insolvency history?", a: "Yes. Insolvency declarations are part of fit and proper assessment." },
            { q: "Are declarations regarding financial integrity required?", a: "Yes. Promoters must confirm financial soundness." },
            { q: "Is disclosure of shareholding structure required?", a: "Yes. Ownership and control details must be provided." },
            { q: "Must service recipients be disclosed during application?", a: "Yes. The applicant must provide a list of intended service recipients." },
            { q: "Can additional service recipients be added later?", a: "Yes. The list may be updated during operations." },
            { q: "Are governance policies required during application?", a: "Yes. Draft governance and risk management policies are typically required." },
            { q: "Are financial statements required during application?", a: "Yes. Financial information of the applicant or parent entity is generally required." },
        ]
    },
    {
        title: "Timelines & Fees", items: [
            { q: "Is there an application fee for Finance Company registration?", a: "Yes. An application fee is payable to IFSCA." },
            { q: "Is a registration fee payable after approval?", a: "Yes. A registration fee must be paid before issuance of the certificate." },
            { q: "Are annual fees applicable?", a: "Yes. Finance companies must pay recurring annual regulatory fees." },
            { q: "How long does the registration process usually take?", a: "Timelines depend on regulatory review and completeness of the application." },
            { q: "Can the regulator seek additional information during review?", a: "Yes. IFSCA may request clarifications during the review process." },
            { q: "Can the application timeline extend due to queries?", a: "Yes. Additional queries may extend the review period." },
            { q: "Is the fee refundable if registration is refused?", a: "Fees are generally non-refundable unless otherwise specified." },
            { q: "Are fees subject to revision by the regulator?", a: "Yes. IFSCA may revise fee structures through circulars." },
            { q: "Must fees be paid before final approval?", a: "Yes. Payment of prescribed fees is required before issuance of the certificate." },
            { q: "Are there recurring regulatory costs after registration?", a: "Yes. Entities must maintain regulatory compliance and annual fee payments." },
        ]
    },
    {
        title: "Post-Registration Compliance", items: [
            { q: "What compliance obligations apply after registration?", a: "Finance companies must comply with corporate governance, AML, and reporting requirements." },
            { q: "Must the entity maintain records of financial transactions?", a: "Yes. Detailed records and audit trails must be maintained." },
            { q: "Is internal audit required?", a: "Internal audit mechanisms are expected as part of governance." },
            { q: "Must the company submit regulatory reports?", a: "Yes. Periodic reporting to IFSCA may be required." },
            { q: "Are board meetings required?", a: "Yes. Governance policies generally require regular board oversight." },
            { q: "Must risk management policies be reviewed periodically?", a: "Yes. Board-approved policies must be reviewed periodically." },
            { q: "Are financial audits mandatory?", a: "Yes. Financial statements must be audited." },
            { q: "Must the company maintain compliance with AML regulations?", a: "Yes. AML and KYC compliance is mandatory." },
            { q: "Must significant changes in management be reported?", a: "Yes. Changes in ownership or management must be reported to the regulator." },
            { q: "Is prior approval required for change in control?", a: "Yes. Change in control may require prior regulatory approval." },
        ]
    },
    {
        title: "Operational Restrictions & Permissions", items: [
            { q: "Can finance companies lend to unrelated third parties?", a: "Activities are generally limited to group entities unless permitted otherwise." },
            { q: "Can finance companies trade derivatives?", a: "Yes. Derivatives may be used for hedging and financial risk management." },
            { q: "Can finance companies invest in global securities?", a: "Yes. Investments in financial instruments within or outside IFSC are permitted." },
            { q: "Can they provide advisory services?", a: "Yes. Advisory services related to financial management and risk management are permitted." },
            { q: "Can they act as holding companies?", a: "Yes. Finance companies may hold investments in group entities." },
            { q: "Can they conduct foreign exchange transactions?", a: "Yes. Foreign exchange transactions in specified currencies are permitted." },
            { q: "Can they manage liquidity for group companies?", a: "Yes. Liquidity management is one of the core activities." },
            { q: "Can they undertake factoring activities?", a: "Factoring requires additional registration under relevant regulations." },
            { q: "Can they raise funds internationally?", a: "Yes. Borrowing and capital raising are permitted." },
            { q: "Can they manage payment obligations for group entities?", a: "Yes. Treasury centres often manage financial obligations within the group." },
        ]
    },
    {
        title: "Penalties, Cancellation & Regulatory Action", items: [
            { q: "Can IFSCA suspend registration of a Finance Company?", a: "Yes. The regulator may suspend registration if regulatory conditions are breached." },
            { q: "Can the regulator cancel registration permanently?", a: "Yes. Registration may be withdrawn or cancelled after due process." },
            { q: "Will the entity be given an opportunity to respond before cancellation?", a: "Yes. The entity is generally provided an opportunity to present its explanation." },
            { q: "Can registration be surrendered voluntarily?", a: "Yes. A finance company may surrender its registration." },
            { q: "What happens if the company fails to comply with regulations?", a: "Regulatory action may include penalties, suspension, or cancellation." },
        ]
    },
    {
        title: "Practical & Scenario-Based Questions", items: [
            { q: "Can a multinational group centralise global treasury operations in IFSC?", a: "Yes. The regulatory framework specifically supports such treasury structures." },
            { q: "Can a finance company manage investments for group entities worldwide?", a: "Yes. Investment management and treasury advisory activities are permitted." },
            { q: "Can a company establish a finance company solely for treasury operations?", a: "Yes. Treasury centre structures are recognised under the framework." },
            { q: "Can a finance company manage foreign currency exposures for its group?", a: "Yes. Risk management including foreign exchange hedging is permitted." },
            { q: "Can a finance company coordinate financial relationships with banks and lenders?", a: "Yes. Maintaining relationships with financial counterparties is a recognised treasury activity." },
            { q: "Can a finance company assist group entities in managing pension or insurance obligations?", a: "Yes. Management of such financial commitments may form part of treasury support functions." },
            { q: "Can finance companies advise group entities on capital structure decisions?", a: "Yes. Advisory relating to funding and capital market strategies is permitted." },
        ]
    },
    {
        title: "Extended FAQs", items: [
            { q: "Can a Finance Company in GIFT IFSC provide services to Indian companies?", a: "Yes. Services may be provided to Indian entities that are part of the corporate group, subject to compliance with FEMA regulations." },
            { q: "Is a Finance Company in GIFT IFSC allowed to undertake derivatives trading?", a: "Yes. Both OTC derivatives and exchange-traded derivatives may be undertaken for risk management or investment purposes." },
            { q: "Can Finance Company in GIFT IFSC act as a holding company?", a: "Yes. The regulations permit finance companies to act as holding companies and manage investments in group entities." },
            { q: "Can Finance Company in GIFT IFSC undertake factoring activities?", a: "Factoring activities may be undertaken, but the company must obtain separate registration under the relevant factoring regulations." },
            { q: "Can the company raise funds internationally?", a: "Yes. A Finance Company in GIFT IFSC may raise funds through various global financing structures including debt instruments and borrowing arrangements." },
            { q: "Is foreign ownership permitted?", a: "Yes. Foreign ownership is permitted subject to regulatory approval and compliance with applicable guidelines." },
            { q: "What happens if the finance company fails to comply with regulations?", a: "The Authority may suspend, withdraw or cancel the registration if the entity fails to comply with regulatory requirements." },
            { q: "Can the finance company serve external clients?", a: "Generally, services are provided to group entities, although certain activities may involve financial counterparties such as banks or investors." },
            { q: "Is local employment mandatory?", a: "Yes. The regulations require at least five qualified personnel to be based in IFSC before operations commence." },
            { q: "Is the Certificate of Registration permanent?", a: "The registration remains valid unless suspended, cancelled or surrendered by the entity." },
        ]
    },
];
