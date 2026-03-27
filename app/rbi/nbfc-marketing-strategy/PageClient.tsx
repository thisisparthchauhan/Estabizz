"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "overview", title: "Overview of NBFC Marketing" },
        { id: "importance", title: "Importance of Marketing Strategy for NBFCs" },
        { id: "target-segments", title: "Identifying Target Customer Segments" },
        { id: "digital-marketing", title: "Digital Marketing for NBFCs" },
        { id: "dsa-network", title: "Direct Selling Agent (DSA) Network" },
        { id: "co-lending", title: "Co-Lending and Partnership Models" },
        { id: "branch-expansion", title: "Branch Expansion and Geographical Reach" },
        { id: "product-positioning", title: "Product Positioning and Differentiation" },
        { id: "customer-retention", title: "Customer Retention and Loyalty" },
        { id: "fintech-partnerships", title: "Fintech Partnerships and API Integration" },
        { id: "regulatory-marketing", title: "Regulatory Compliance in NBFC Marketing" },
        { id: "data-analytics", title: "Data Analytics and Credit Intelligence" },
        { id: "brand-building", title: "Brand Building for NBFCs" },
        { id: "faq", title: "Frequently Asked Questions" },
    ];

    const quickFacts = [
        { label: "Industry Size", value: "₹35+ Lakh Crore AUM" },
        { label: "No. of NBFCs (RBI)", value: "9,000+ registered" },
        { label: "Digital Lending Share", value: "~30% of disbursals" },
        { label: "DSA Contribution", value: "40–60% of sourcing" },
        { label: "Key Marketing Channel", value: "Digital + DSA" },
        { label: "RBI Digital Lending Guidelines", value: "2022" },
    ];

    return (
        <ServicePageLayout
            tags={[
                { emoji: "📊", label: "Marketing Strategy" },
                { emoji: "🏦", label: "NBFC" },
                { emoji: "🚀", label: "Growth" },
                { emoji: "🇮🇳", label: "India" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "RBI Services", href: "/rbi" },
                { label: "NBFC Marketing Strategy" },
            ]}
            title="NBFC Marketing Strategy in India – Digital, B2B and Growth Playbook"
            readTime="15 min read"
            focusKeyword="NBFC Marketing Strategy India"
            sections={sections}
            ctaTitle="Scale Your NBFC Business"
            ctaDescription="Get expert marketing strategy consulting to accelerate your NBFC's growth through compliant and effective customer acquisition."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/rbi/nbfc-account-aggregator-license", category: "RBI Services", title: "NBFC Account Aggregator License", description: "Complete RBI registration guide for Account Aggregator framework." },
                { href: "/regulatory/psp-license-ifsca", category: "IFSCA", title: "PSP License IFSCA", description: "Payment services license guide under IFSCA framework." },
                { href: "/rbi/lendtech-services", category: "RBI Services", title: "LendTech Services", description: "RBI guidelines for lending technology companies." },
            ]}
            finalCtaTitle="Ready to Accelerate Your NBFC's Growth?"
            finalCtaDescription="Our NBFC marketing consultants help you design and execute a compliant, data-driven marketing strategy to scale your business across India."
        >
            <h2 id="overview">Overview of NBFC Marketing</h2>
            <p>Non-Banking Financial Companies (NBFCs) in India operate in a highly competitive market with over 9,000 registered NBFCs vying for customers across lending, investment, and financial services segments. In this competitive landscape, a well-crafted marketing strategy is not just a growth driver but a survival imperative.</p>
            <p>NBFC marketing differs significantly from conventional product marketing due to the regulatory constraints on advertising, the trust-sensitive nature of financial services, the diverse customer segments served, and the need to balance growth with sound credit practices. An effective NBFC marketing strategy must navigate these unique challenges while maximising customer acquisition, retention, and lifetime value.</p>
            <div className="info-box">
                <p className="!mb-0"><strong>Market Context:</strong> India's NBFC sector manages assets under management (AUM) of over ₹35 lakh crore, accounting for approximately 25% of the total credit in the Indian financial system. The sector's growth rate consistently outpaces that of scheduled commercial banks, creating significant opportunities for well-positioned NBFCs with effective marketing strategies.</p>
            </div>

            <h2 id="importance">Importance of Marketing Strategy for NBFCs</h2>
            <p>A structured marketing strategy is essential for NBFCs for several interconnected reasons:</p>

            <h3>Business Growth and Market Share</h3>
            <ul>
                <li>Differentiation from competitors in a crowded market</li>
                <li>Systematic customer acquisition at optimal cost</li>
                <li>Geographic expansion into underserved markets</li>
                <li>Product portfolio diversification and cross-selling</li>
            </ul>

            <h3>Brand Trust and Reputation</h3>
            <ul>
                <li>Building brand recognition in a sector where trust is paramount</li>
                <li>Communicating regulatory compliance credentials to customers</li>
                <li>Managing reputation during regulatory or credit events</li>
                <li>Positioning as a preferred financial partner for target segments</li>
            </ul>

            <h3>Cost Efficiency</h3>
            <ul>
                <li>Reducing Customer Acquisition Cost (CAC) through digital channels</li>
                <li>Improving conversion rates through targeted marketing</li>
                <li>Maximising return on marketing investment (ROMI)</li>
                <li>Leveraging data analytics for precise targeting</li>
            </ul>

            <h2 id="target-segments">Identifying Target Customer Segments</h2>
            <p>Precise target segment identification is the foundation of any effective NBFC marketing strategy. Different NBFC types serve distinct customer segments with specific needs and characteristics.</p>

            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>NBFC Category</th>
                            <th>Primary Target Segment</th>
                            <th>Key Customer Need</th>
                            <th>Marketing Approach</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Retail Lending NBFC</td>
                            <td>Salaried / Self-employed individuals</td>
                            <td>Personal, vehicle, home loans</td>
                            <td>Digital + DSA network</td>
                        </tr>
                        <tr>
                            <td>MSME Lending NBFC</td>
                            <td>Small business owners</td>
                            <td>Working capital, business loans</td>
                            <td>Branch + fintech partnerships</td>
                        </tr>
                        <tr>
                            <td>Microfinance NBFC (MFI)</td>
                            <td>Low-income women entrepreneurs</td>
                            <td>Small credit for livelihood</td>
                            <td>Field agents + SHG network</td>
                        </tr>
                        <tr>
                            <td>Gold Loan NBFC</td>
                            <td>Rural and semi-urban borrowers</td>
                            <td>Quick liquidity against gold</td>
                            <td>Branch network + door-to-door</td>
                        </tr>
                        <tr>
                            <td>Vehicle Finance NBFC</td>
                            <td>CV owners, farmers, retail buyers</td>
                            <td>New/used vehicle financing</td>
                            <td>OEM tie-ups + dealer channel</td>
                        </tr>
                        <tr>
                            <td>Housing Finance NBFC</td>
                            <td>First-time home buyers, Tier 2/3</td>
                            <td>Affordable home loans</td>
                            <td>Developer tie-ups + digital</td>
                        </tr>
                        <tr>
                            <td>Digital Lending NBFC</td>
                            <td>Young urban borrowers</td>
                            <td>Instant credit, buy-now-pay-later</td>
                            <td>Mobile apps + fintech ecosystem</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="digital-marketing">Digital Marketing for NBFCs</h2>
            <p>Digital marketing has emerged as the most cost-effective and scalable customer acquisition channel for NBFCs in India. With over 800 million internet users and rising smartphone penetration, digital channels offer unprecedented reach to NBFC target segments.</p>

            <h3>Search Engine Marketing (SEM) and SEO</h3>
            <ul>
                <li><strong>Google Search Ads:</strong> Targeted campaigns for high-intent searches like "personal loan", "MSME loan", "instant business loan"</li>
                <li><strong>SEO Strategy:</strong> Content marketing around loan products, eligibility calculators, and comparison guides to capture organic traffic</li>
                <li><strong>Local SEO:</strong> Optimizing for location-based searches especially for branch-based NBFCs</li>
                <li><strong>Display Advertising:</strong> Retargeting campaigns for website visitors who did not convert</li>
            </ul>

            <h3>Social Media Marketing</h3>
            <ul>
                <li><strong>Facebook and Instagram:</strong> Awareness and lead generation campaigns targeting specific income groups and geographies</li>
                <li><strong>LinkedIn:</strong> B2B marketing for MSME and corporate lending products</li>
                <li><strong>YouTube:</strong> Financial literacy content and product explainer videos</li>
                <li><strong>WhatsApp Business:</strong> Customer communication, loan status updates, and re-engagement campaigns</li>
            </ul>

            <h3>Content Marketing and Financial Education</h3>
            <p>Content marketing builds brand authority and generates organic leads at low cost. Effective content formats for NBFCs include:</p>
            <ul>
                <li>Blog articles on financial literacy, loan eligibility tips, and credit score improvement</li>
                <li>EMI calculators, loan eligibility tools, and comparison widgets</li>
                <li>Video testimonials and case studies from existing customers</li>
                <li>Regional language content to reach non-English speaking markets</li>
                <li>Infographics on RBI regulations, loan documentation, and NBFC benefits</li>
            </ul>

            <h3>Performance Marketing and Lead Generation</h3>
            <ul>
                <li>Affiliate marketing through financial comparison platforms (BankBazaar, PaisaBazaar, etc.)</li>
                <li>Co-registration lead generation with complementary financial service providers</li>
                <li>Email and SMS marketing for loan renewals and cross-selling</li>
                <li>App-based marketing using push notifications and in-app messaging</li>
            </ul>

            <h2 id="dsa-network">Direct Selling Agent (DSA) Network</h2>
            <p>The DSA (Direct Selling Agent) channel remains the backbone of NBFC loan disbursement in India, contributing 40–60% of total loan sourcing for most NBFCs. Building an effective DSA network is critical for geographic expansion and volume growth.</p>

            <h3>Building a Strong DSA Network</h3>
            <div className="step-timeline">
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 1</div>
                        <h4>DSA Identification and Empanelment</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Identify and empanel DSAs — individuals or firms with existing client bases in the target segment. Conduct thorough background verification and obtain necessary documentation.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 2</div>
                        <h4>DSA Training and Certification</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Provide comprehensive product training, compliance orientation (especially digital lending guidelines), and certification to all DSAs. Ensure DSAs understand the NBFC's Fair Practices Code.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 3</div>
                        <h4>Commission Structure and Incentives</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Design a competitive commission structure with upfront payout, trail commissions for portfolio quality, and performance-linked bonuses to attract and retain top-performing DSAs.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 4</div>
                        <h4>DSA Management System</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Implement a dedicated DSA management portal for lead submission, status tracking, commission calculation, and performance monitoring. Mobile-first DSA apps improve productivity significantly.</p>
                    </div>
                </div>
                <div className="step-item">
                    <div className="step-dot"></div>
                    <div className="step-card">
                        <div className="step-label">Step 5</div>
                        <h4>Performance Monitoring and Support</h4>
                        <p className="text-[13px] text-[#64748b] !mb-0">Regularly monitor DSA performance on lead quality, conversion rate, and portfolio quality. Provide ongoing support through dedicated relationship managers and marketing collateral.</p>
                    </div>
                </div>
            </div>

            <div className="warning-box">
                <p className="!mb-0"><strong>RBI Digital Lending Compliance:</strong> Under RBI's Digital Lending Guidelines, 2022, all DSAs and lending service providers (LSPs) must be disclosed on the NBFC's website, included in the loan agreement, and must comply with data privacy norms. NBFCs are responsible for the conduct of their DSAs and LSPs.</p>
            </div>

            <h2 id="co-lending">Co-Lending and Partnership Models</h2>
            <p>Co-lending arrangements between NBFCs and banks have emerged as a powerful growth lever under the RBI's Co-Lending Model (CLM) guidelines. The co-lending model allows NBFCs to leverage bank funding at lower cost while contributing their last-mile reach and credit assessment expertise.</p>

            <h3>Benefits of Co-Lending for NBFC Growth</h3>
            <ul>
                <li>Access to lower-cost bank funding, reducing overall cost of funds</li>
                <li>Scale-up of loan disbursements without proportionate capital consumption</li>
                <li>Improved asset quality through shared credit risk with banks</li>
                <li>Enhanced customer trust through association with reputed banking partners</li>
                <li>Regulatory priority sector lending (PSL) classification for co-lent assets</li>
            </ul>

            <h3>Key Co-Lending Partners for NBFCs</h3>
            <ul>
                <li>Public sector banks with PSL targets (SBI, PNB, Bank of Baroda, etc.)</li>
                <li>Private sector banks with retail credit expansion ambitions</li>
                <li>Small Finance Banks targeting similar MSME and retail segments</li>
                <li>Foreign banks seeking India retail market exposure through NBFC partnerships</li>
            </ul>

            <h2 id="branch-expansion">Branch Expansion and Geographical Reach</h2>
            <p>Physical branch presence remains essential for many NBFC product categories, particularly gold loans, microfinance, and MSME lending in semi-urban and rural markets. A phased branch expansion strategy balances market penetration with operational efficiency.</p>

            <h3>Branch Expansion Strategy Framework</h3>
            <ul>
                <li><strong>Tier 1 Markets:</strong> Consolidation and share maximisation in existing metros through digital channels</li>
                <li><strong>Tier 2/3 Markets:</strong> Phased branch rollout in high-potential districts with experienced branch managers</li>
                <li><strong>Rural Markets:</strong> Business correspondent (BC) and field agent model for microfinance and agricultural lending</li>
                <li><strong>Hub-and-Spoke Model:</strong> Hub branches in district headquarters with spoke points in smaller towns</li>
            </ul>

            <h2 id="product-positioning">Product Positioning and Differentiation</h2>
            <p>In a market with numerous competing lenders, clear product positioning is essential. NBFCs that differentiate through speed, convenience, flexible credit assessment, and customer service command premium positioning and loyalty.</p>

            <h3>Key Differentiation Dimensions for NBFCs</h3>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Dimension</th>
                            <th>NBFC Advantage</th>
                            <th>Marketing Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Speed</td>
                            <td>Faster approval and disbursal (hours vs days)</td>
                            <td>"Loan approved in 30 minutes"</td>
                        </tr>
                        <tr>
                            <td>Flexibility</td>
                            <td>Flexible credit assessment beyond CIBIL score</td>
                            <td>"Loans for thin-file customers"</td>
                        </tr>
                        <tr>
                            <td>Convenience</td>
                            <td>Digital application, minimal documentation</td>
                            <td>"Zero branch visits, 100% digital"</td>
                        </tr>
                        <tr>
                            <td>Customer Service</td>
                            <td>Personalised relationship management</td>
                            <td>"Your financial partner for life"</td>
                        </tr>
                        <tr>
                            <td>Specialisation</td>
                            <td>Deep expertise in specific segments (MSME, agriculture)</td>
                            <td>"MSME lending specialists"</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="customer-retention">Customer Retention and Loyalty</h2>
            <p>Acquiring a new NBFC customer costs 5–7 times more than retaining an existing one. A robust customer retention strategy maximises lifetime value and generates referral business.</p>

            <h3>Customer Retention Strategies</h3>
            <ul>
                <li><strong>Loyalty Programs:</strong> Preferential interest rates, top-up loans, and priority processing for loyal customers with good repayment records</li>
                <li><strong>Cross-selling:</strong> Proactively offering complementary products — insurance, co-branded cards, investment products — to the existing customer base</li>
                <li><strong>Relationship Management:</strong> Dedicated relationship managers for high-value customers with periodic check-ins and financial advisory</li>
                <li><strong>Digital Engagement:</strong> Regular financial literacy content, loan anniversary notifications, and personalised loan offers through the customer app</li>
                <li><strong>Grievance Redressal:</strong> Fast, transparent, and empathetic resolution of customer complaints to prevent attrition</li>
                <li><strong>Referral Programs:</strong> Incentivising satisfied customers to refer friends and family with referral bonuses and preferential rates</li>
            </ul>

            <h2 id="fintech-partnerships">Fintech Partnerships and API Integration</h2>
            <p>Fintech partnerships are transforming how NBFCs reach customers and underwrite credit. By integrating with fintech ecosystems, NBFCs can dramatically expand their customer reach while leveraging advanced technology for credit assessment.</p>

            <h3>Types of Fintech Partnerships</h3>
            <ul>
                <li><strong>Lending Service Providers (LSPs):</strong> Digital platforms that source loan applications and provide digital customer interface, governed by RBI's Digital Lending Guidelines</li>
                <li><strong>Account Aggregator (AA) Framework:</strong> Leveraging the AA ecosystem for customer-consented financial data sharing to enable faster and better credit decisions</li>
                <li><strong>Buy Now Pay Later (BNPL) Partners:</strong> Embedding NBFC credit products in e-commerce and consumer platforms</li>
                <li><strong>Open Banking API Integrations:</strong> Real-time bank statement analysis, UPI payments, and digital KYC through API partnerships</li>
                <li><strong>Credit Bureau API Integrations:</strong> Real-time credit score checks and bureau-enriched applicant data</li>
            </ul>

            <h2 id="regulatory-marketing">Regulatory Compliance in NBFC Marketing</h2>
            <p>NBFC marketing must comply with applicable RBI guidelines, ASCI (Advertising Standards Council of India) codes, and other applicable regulations. Key compliance requirements for NBFC marketing include:</p>

            <h3>Key Compliance Requirements</h3>
            <ul>
                <li><strong>Interest Rate Disclosure:</strong> All advertisements must prominently disclose the applicable interest rate, processing fees, and other charges</li>
                <li><strong>Annual Percentage Rate (APR):</strong> Digital lending advertisements must prominently display the Annual Percentage Rate (APR) under RBI's Digital Lending Guidelines, 2022</li>
                <li><strong>Fair Practices Code:</strong> Marketing materials must align with the NBFC's RBI-approved Fair Practices Code</li>
                <li><strong>No Misleading Advertisements:</strong> NBFC advertisements must not contain false or misleading claims about loan eligibility, interest rates, or approval timelines</li>
                <li><strong>TRAI Regulations:</strong> SMS and telemarketing must comply with TRAI's Unsolicited Commercial Communications (UCC) regulations</li>
                <li><strong>Data Privacy:</strong> Collection and use of customer data for marketing must comply with the Digital Personal Data Protection Act, 2023 and applicable RBI data privacy guidelines</li>
            </ul>

            <h2 id="data-analytics">Data Analytics and Credit Intelligence</h2>
            <p>Data analytics is transforming NBFC marketing from broadcast to precision targeting. NBFCs that harness data effectively achieve superior customer acquisition efficiency and portfolio quality.</p>

            <h3>Data-Driven Marketing Applications</h3>
            <ul>
                <li><strong>Propensity Modelling:</strong> Identifying potential customers most likely to apply for and repay loans based on behavioural and demographic data</li>
                <li><strong>Credit Bureau Analytics:</strong> Leveraging bureau data for targeted marketing to pre-approved customer segments</li>
                <li><strong>Alternative Data Scoring:</strong> Using mobile, utility, and transactional data for marketing to thin-file customer segments</li>
                <li><strong>Churn Prediction:</strong> Identifying customers at risk of loan pre-closure or inactivity and proactively engaging them</li>
                <li><strong>Campaign Attribution:</strong> Multi-touch attribution modelling to understand the true ROI of each marketing channel</li>
                <li><strong>Geographic Analytics:</strong> Market potential analysis at district/PIN code level to prioritise expansion</li>
            </ul>

            <h2 id="brand-building">Brand Building for NBFCs</h2>
            <p>In financial services, brand trust is a significant competitive advantage. Customers prefer to borrow from NBFCs they recognise and trust. Building a strong brand requires consistent messaging, visible market presence, and demonstrated commitment to customer welfare.</p>

            <h3>Brand Building Strategies for NBFCs</h3>
            <ul>
                <li><strong>Purpose-Led Marketing:</strong> Positioning the NBFC as an enabler of financial inclusion and economic empowerment</li>
                <li><strong>Awards and Recognition:</strong> Leveraging industry awards, regulatory commendations, and media rankings to build credibility</li>
                <li><strong>CSR and Community Engagement:</strong> Financial literacy programs, community development initiatives, and local partnerships that build brand goodwill</li>
                <li><strong>Thought Leadership:</strong> Publishing industry research, participating in regulatory forums, and media interviews by senior management</li>
                <li><strong>Consistent Visual Identity:</strong> Uniform brand identity across all touchpoints — branches, digital platforms, marketing materials, and employee communications</li>
            </ul>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What are the most cost-effective marketing channels for a new NBFC?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        For a new NBFC, the most cost-effective marketing channels are DSA/connector networks (leveraging existing relationship networks), Google Search advertising for high-intent loan queries, and referral programs from existing customers. Financial aggregator platforms like PaisaBazaar and BankBazaar offer pay-per-lead models that ensure marketing spend is tied directly to customer acquisition.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What are the RBI regulations on NBFC advertising?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Under RBI's Fair Practices Code and Digital Lending Guidelines, NBFC advertisements must prominently disclose the Annual Percentage Rate (APR), all fees and charges, and must not be misleading. The NBFC's name, CoR number, and the fact that it is "Regulated by RBI" should be displayed. Advertisements must also comply with ASCI guidelines for financial services.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>How does the RBI's co-lending model benefit NBFC marketing?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The RBI's co-lending model allows NBFCs to offer competitive interest rates (closer to bank rates) by accessing lower-cost bank funding. This makes the NBFC's loan products more attractive in the market. Co-lending also enhances brand credibility — association with reputed banks signals stability and trustworthiness to customers, facilitating easier customer acquisition.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>How should an NBFC approach marketing in rural and semi-urban markets?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        Rural and semi-urban NBFC marketing requires a ground-level approach: empanelling local DSAs with community relationships (village-level entrepreneurs, kirana store owners), conducting financial literacy camps in collaboration with gram panchayats, leveraging regional language content, partnering with self-help groups (SHGs) for microfinance customers, and using business correspondents (BCs) for last-mile reach.
                    </div>
                </details>
                <details className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                        <span>What is the role of the Account Aggregator framework in NBFC marketing?</span>
                        <span className="text-[#0096D6] shrink-0 ml-4">▼</span>
                    </summary>
                    <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151]">
                        The Account Aggregator (AA) framework enables NBFCs to access customer-consented financial data (bank statements, GST returns, MF holdings, etc.) with the customer's permission. This facilitates faster credit appraisal with less documentation burden on the customer — a significant marketing advantage. NBFCs can offer pre-approved loan amounts to customers based on AA data, creating a seamless, friction-free lending experience.
                    </div>
                </details>
            </div>
        </ServicePageLayout>
    );
}
