import LegalPolicyLayout from "@/components/templates/LegalPolicyLayout";

export default function PageClient() {
    return (
        <LegalPolicyLayout
            title="Terms of Use"
            description="These Terms of Use govern access to and use of the Estabizz Fintech Private Limited website, service information, resources, forms, consultation links, blog features and digital communication channels."
            sections={[
                {
                    id: "acceptance",
                    title: "1. Acceptance of Terms",
                    content: (
                        <>
                            <p>By accessing or using this website, submitting any form, requesting a consultation, using website resources, submitting a blog or communicating with Estabizz through this website, you agree to these Terms of Use.</p>
                            <p>If you do not agree with these terms, you should not use this website or submit information through it.</p>
                        </>
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
                    id: "website-use",
                    title: "3. Scope of Website Use",
                    content: (
                        <>
                            <p>The Estabizz website provides information relating to regulatory advisory, licensing, registration, documentation, compliance, governance, blog resources and related professional support services.</p>
                            <p>The content on this website is for general informational purposes only. It does not constitute legal, regulatory, tax, investment, financial or professional advice for any specific person or business unless a separate written engagement is executed.</p>
                        </>
                    ),
                },
                {
                    id: "service-enquiries",
                    title: "4. Service Enquiries and Engagement",
                    content: (
                        <>
                            <p>Submission of a form, call request, WhatsApp message, email or document does not automatically create a client relationship. A professional engagement begins only after scope, commercials and terms are agreed in writing or through an accepted proposal.</p>
                            <p>Any advice, documentation or application support is subject to the facts shared by the client, applicable eligibility, regulatory requirements, document quality and regulator review.</p>
                        </>
                    ),
                },
                {
                    id: "user-obligations",
                    title: "5. User Obligations",
                    content: (
                        <ul>
                            <li>Users must provide accurate, complete and lawful information.</li>
                            <li>Users must not submit misleading, false, infringing, defamatory or unlawful content.</li>
                            <li>Users must not misuse website forms, admin routes, blog submission features or communication channels.</li>
                            <li>Users remain responsible for verifying business facts, eligibility, documents and regulatory position before taking any action.</li>
                        </ul>
                    ),
                },
                {
                    id: "payments",
                    title: "6. Payments, Fees and Third-Party Charges",
                    content: (
                        <>
                            <p>Professional fees, payment milestones, scope and exclusions shall be governed by the accepted proposal, invoice, engagement note or written communication issued by Estabizz.</p>
                            <p>Government fees, statutory fees, regulator fees, exchange fees, portal charges, payment gateway charges, stamp duty, taxes and third-party professional charges may be payable separately unless expressly included in writing.</p>
                        </>
                    ),
                },
                {
                    id: "no-guarantee",
                    title: "7. No Regulatory Approval Guarantee",
                    content: (
                        <p>Estabizz is an independent regulatory advisory and compliance support organisation. We do not represent or act on behalf of any government authority, regulator, exchange, ministry or statutory body. No content, proposal, consultation, application support or engagement should be understood as a guarantee of licence, registration, approval, renewal, funding, clearance or defined timeline.</p>
                    ),
                },
                {
                    id: "intellectual-property",
                    title: "8. Intellectual Property",
                    content: (
                        <p>All website content, layouts, service pages, blog content, templates, graphics, designs, documents, text and branding are owned by or licensed to Estabizz, unless stated otherwise. Users must not copy, reproduce, republish, scrape, distribute or commercially exploit website content without prior written permission.</p>
                    ),
                },
                {
                    id: "third-party-links",
                    title: "9. Third-Party Links and Platforms",
                    content: (
                        <p>The website may contain links to regulator portals, payment gateways, social media platforms, WhatsApp, third-party tools or external websites. Estabizz is not responsible for the content, availability, security, privacy practices or terms of such third-party platforms.</p>
                    ),
                },
                {
                    id: "limitation",
                    title: "10. Limitation of Liability",
                    content: (
                        <p>To the fullest extent permitted by law, Estabizz shall not be liable for indirect, incidental, consequential, punitive, special or business losses arising from website use, reliance on general content, third-party links, technical interruptions, user-submitted inaccuracies, regulatory changes or outcomes outside Estabizz's control.</p>
                    ),
                },
                {
                    id: "indemnity",
                    title: "11. Indemnity",
                    content: (
                        <p>Users agree to indemnify and hold Estabizz harmless from claims, losses, liabilities, damages, costs or expenses arising from misuse of the website, inaccurate information submitted by the user, breach of these terms, infringement of third-party rights or unlawful conduct.</p>
                    ),
                },
                {
                    id: "law-contact",
                    title: "12. Governing Law, Jurisdiction and Contact",
                    content: (
                        <>
                            <p>These Terms of Use shall be governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of courts and authorities in Gujarat, India.</p>
                            <p>For website, terms, grievance or service-related queries, contact: <a href="mailto:info@estabizz.com">info@estabizz.com</a>.</p>
                        </>
                    ),
                },
                {
                    id: "updates",
                    title: "13. Changes to Terms",
                    content: (
                        <p>Estabizz may update these Terms of Use from time to time. Continued use of the website after updates are published shall be treated as acceptance of the revised terms.</p>
                    ),
                },
            ]}
        />
    );
}
