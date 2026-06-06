import LegalPolicyLayout from "@/components/templates/LegalPolicyLayout";

export default function PageClient() {
    return (
        <LegalPolicyLayout
            title="Disclaimer"
            description="This Disclaimer explains the limitations of website content, regulatory information, service descriptions, resources and communications published by Estabizz Fintech Private Limited."
            sections={[
                {
                    id: "general",
                    title: "1. General Information Only",
                    content: (
                        <p>The content on this website is provided for general informational and educational purposes relating to regulatory advisory, licensing, compliance, governance, documentation and allied professional services. It should not be treated as legal, regulatory, tax, investment, financial, accounting or professional advice for any specific person or business.</p>
                    ),
                },
                {
                    id: "company-details",
                    title: "2. Company Details",
                    content: (
                        <>
                            <p><strong>Company:</strong> Estabizz Fintech Private Limited</p>
                            <p><strong>CIN:</strong> U74999GJ2021PTC123384</p>
                            <p><strong>Registered Office:</strong> 15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421</p>
                            <p><strong>Email:</strong> <a href="mailto:info@estabizz.com">info@estabizz.com</a></p>
                        </>
                    ),
                },
                {
                    id: "independent",
                    title: "3. Independent Advisory Firm",
                    content: (
                        <p>Estabizz Fintech Private Limited is an independent regulatory advisory and compliance support organisation. We do not represent, act for, speak on behalf of, or claim affiliation with any government authority, ministry, regulator, exchange, statutory body or public institution.</p>
                    ),
                },
                {
                    id: "no-approval-guarantee",
                    title: "4. No Regulatory Approval Guarantee",
                    content: (
                        <p>No website content, consultation, proposal, checklist, document draft, application support or communication from Estabizz should be understood as a guarantee of licence, registration, approval, renewal, funding, regulatory clearance, favourable order or defined timeline. Regulatory outcomes are subject to applicable eligibility, documentation quality, regulator review and regulatory scrutiny.</p>
                    ),
                },
                {
                    id: "accuracy",
                    title: "5. Accuracy and Regulatory Changes",
                    content: (
                        <p>We make reasonable efforts to keep website content useful and current. However, laws, regulations, circulars, fees, thresholds, forms, regulator practices and compliance expectations may change from time to time. Users should verify the latest official position before making business, filing or investment decisions.</p>
                    ),
                },
                {
                    id: "no-client-relationship",
                    title: "6. No Client Relationship from Website Use",
                    content: (
                        <p>Use of this website, downloading resources, reading blogs, submitting a form or contacting Estabizz does not automatically create a professional engagement or client relationship. A professional relationship is formed only when scope, commercials and engagement terms are agreed in writing.</p>
                    ),
                },
                {
                    id: "user-responsibility",
                    title: "7. User Responsibility",
                    content: (
                        <p>Users are responsible for the accuracy of information, facts, documents and representations submitted to Estabizz. Business decisions should be taken after considering the user's own facts, latest law, professional advice and regulator-specific requirements.</p>
                    ),
                },
                {
                    id: "third-party",
                    title: "8. Third-Party Links and Tools",
                    content: (
                        <p>The website may refer to third-party websites, regulator portals, payment gateways, social media pages, WhatsApp, analytics tools or external resources. Estabizz is not responsible for third-party content, security, availability, privacy practices, terms or technical performance.</p>
                    ),
                },
                {
                    id: "liability",
                    title: "9. Limitation of Liability",
                    content: (
                        <p>To the fullest extent permitted by law, Estabizz shall not be liable for losses arising from reliance on general website content, errors or omissions, regulatory changes, technical interruptions, third-party links, user-submitted inaccuracies, delayed decisions, regulator queries or outcomes outside Estabizz's control.</p>
                    ),
                },
                {
                    id: "law-contact",
                    title: "10. Governing Law and Contact",
                    content: (
                        <>
                            <p>This Disclaimer shall be governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of courts and authorities in Gujarat, India.</p>
                            <p>For disclaimer, website or grievance-related queries, contact: <a href="mailto:info@estabizz.com">info@estabizz.com</a>.</p>
                        </>
                    ),
                },
            ]}
        />
    );
}
