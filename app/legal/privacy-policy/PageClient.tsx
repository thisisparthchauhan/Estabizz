import LegalPolicyLayout from "@/components/templates/LegalPolicyLayout";

export default function PageClient() {
    return (
        <LegalPolicyLayout
            title="Privacy Policy"
            description="This Privacy Policy explains how Estabizz Fintech Private Limited collects, uses, stores, shares and protects information received through its website, contact forms, WhatsApp links, blog submissions, consultation requests and client communication channels."
            sections={[
                {
                    id: "introduction",
                    title: "1. Introduction",
                    content: (
                        <>
                            <p><strong>Estabizz Fintech Private Limited</strong> respects the confidentiality of information shared by visitors, prospective clients, clients, blog contributors and users of this website. This Privacy Policy is drafted for our website and digital communication channels and explains our broad data handling practices.</p>
                            <p>By using this website, submitting a form, requesting a consultation, sending documents, contacting us by WhatsApp, email or phone, or otherwise interacting with Estabizz, you acknowledge that your information may be handled as described in this policy.</p>
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
                            <p><strong>Phone:</strong> <a href="tel:+919825600907">+91 98256 00907</a></p>
                        </>
                    ),
                },
                {
                    id: "scope",
                    title: "3. Scope of this Policy",
                    content: (
                        <>
                            <p>This Privacy Policy applies to information collected through the Estabizz website, contact forms, lead forms, blog submission forms, consultation booking flows, WhatsApp links, email communication, proposal requests and other digital channels operated by or on behalf of Estabizz Fintech Private Limited.</p>
                            <p>This policy does not apply to third-party websites, regulator portals, payment gateways, social media platforms, external tools or partner websites that may be linked from our website. Such platforms are governed by their own privacy policies.</p>
                        </>
                    ),
                },
                {
                    id: "information-collected",
                    title: "4. Information We Collect",
                    content: (
                        <>
                            <div className="overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr><th>Information Category</th><th>Examples</th><th>Purpose</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Identity and Contact Details</td><td>Name, email address, phone number, designation and company name</td><td>Responding to enquiries, consultations and service requests</td></tr>
                                        <tr><td>Lead Form Data</td><td>Service interest, licence category, regulator, business model and project notes</td><td>Understanding applicability, scope and next steps</td></tr>
                                        <tr><td>Documents Shared Voluntarily</td><td>Incorporation documents, KYC records, business plans, financial details or drafts</td><td>Professional review, documentation and advisory support</td></tr>
                                        <tr><td>Communication Data</td><td>Emails, WhatsApp messages, call notes and meeting details</td><td>Client coordination, query tracking and service records</td></tr>
                                        <tr><td>Website and Technical Data</td><td>IP address, browser, device details, pages visited and cookies</td><td>Security, analytics, performance and user experience improvement</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>Users should avoid sharing documents or information that is not relevant to their enquiry or engagement.</p>
                        </>
                    ),
                },
                {
                    id: "use",
                    title: "5. How We Use Information",
                    content: (
                        <ul>
                            <li>To respond to enquiries, consultation requests and service interest forms.</li>
                            <li>To assess regulatory applicability, eligibility, documentation requirements and advisory scope.</li>
                            <li>To prepare proposals, checklists, service notes, policy drafts, application documents and compliance records.</li>
                            <li>To communicate through phone, email, WhatsApp, meetings or other channels requested by the user.</li>
                            <li>To process blog submissions, resource requests, newsletter preferences and knowledge updates.</li>
                            <li>To improve website performance, security, analytics and user experience.</li>
                            <li>To comply with legal, contractual, accounting, audit, regulatory or dispute-resolution requirements.</li>
                        </ul>
                    ),
                },
                {
                    id: "whatsapp-consent",
                    title: "6. Lead Forms, WhatsApp and Contact Consent",
                    content: (
                        <>
                            <p>When a user submits a lead form, consultation request, blog submission, resource form or contacts Estabizz through WhatsApp, phone or email, the user consents to being contacted by Estabizz for the relevant enquiry, service discussion, proposal, documentation, follow-up or regulatory update.</p>
                            <p>Users may request that we stop non-essential communications by writing to <a href="mailto:info@estabizz.com">info@estabizz.com</a>. Transactional, engagement-related or legal communications may continue where necessary.</p>
                        </>
                    ),
                },
                {
                    id: "sharing",
                    title: "7. Disclosure and Sharing",
                    content: (
                        <>
                            <p>Estabizz does not sell personal information. Information may be shared with internal team members, associate professionals, consultants, technology providers, payment processors, auditors, legal advisers or other service providers where required for service delivery, operational support, documentation, compliance or user-requested communication.</p>
                            <p>Information may also be disclosed where required by law, court order, regulator direction, government authority, contractual obligation or to protect legitimate legal rights.</p>
                        </>
                    ),
                },
                {
                    id: "security-retention",
                    title: "8. Data Storage, Security and Retention",
                    content: (
                        <>
                            <p>We take reasonable administrative, technical and organisational measures to protect information shared with us. However, no website, server, email, messaging platform or internet transmission can be guaranteed to be completely secure.</p>
                            <p>Information may be retained for as long as reasonably required for enquiry handling, client service records, legal documentation, compliance evidence, accounting, audit, dispute resolution or statutory purposes.</p>
                        </>
                    ),
                },
                {
                    id: "cookies",
                    title: "9. Cookies and Analytics",
                    content: (
                        <>
                            <p>The website may use cookies, analytics tools or similar technologies to understand page usage, improve website performance, manage security and support user experience. Users may control cookies through browser settings, although disabling cookies may affect certain website functions.</p>
                            <p>Please read our <a href="/legal/cookie-policy">Cookie Policy</a> for more details.</p>
                        </>
                    ),
                },
                {
                    id: "rights",
                    title: "10. User Rights and Requests",
                    content: (
                        <p>Users may write to Estabizz to request correction, update, review or deletion of personal information submitted to us. Such requests may be subject to identity verification, legal retention requirements, ongoing service obligations and legitimate business records.</p>
                    ),
                },
                {
                    id: "no-guarantee",
                    title: "11. No Regulatory Approval Guarantee",
                    content: (
                        <p>Sharing information with Estabizz, requesting a consultation or engaging our services does not create any guarantee of licence, registration, approval, renewal, funding, regulatory clearance or defined timeline. All regulatory outcomes remain subject to applicable eligibility, documentation quality, regulator review and regulatory scrutiny.</p>
                    ),
                },
                {
                    id: "law-contact",
                    title: "12. Governing Law and Grievance Contact",
                    content: (
                        <>
                            <p>This Privacy Policy shall be governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of courts and authorities in Gujarat, India.</p>
                            <p>For privacy, data, website or grievance-related queries, contact: <a href="mailto:info@estabizz.com">info@estabizz.com</a>.</p>
                        </>
                    ),
                },
                {
                    id: "updates",
                    title: "13. Updates to this Policy",
                    content: (
                        <p>Estabizz may update this Privacy Policy from time to time to reflect changes in law, website features, service processes or internal data handling practices. The updated policy will be made available on this page.</p>
                    ),
                },
            ]}
        />
    );
}
