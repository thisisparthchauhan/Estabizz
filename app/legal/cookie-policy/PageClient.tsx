import LegalPolicyLayout from "@/components/templates/LegalPolicyLayout";

export default function PageClient() {
    return (
        <LegalPolicyLayout
            title="Cookie Policy"
            description="This Cookie Policy explains how Estabizz Fintech Private Limited may use cookies, analytics tools and similar technologies on its website to support security, performance, user experience and communication features."
            sections={[
                {
                    id: "what-are-cookies",
                    title: "1. What Are Cookies?",
                    content: (
                        <p>Cookies are small files or similar technologies stored on a user's browser or device when a website is accessed. They help websites remember preferences, support functionality, analyse usage and improve performance.</p>
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
                    id: "use",
                    title: "3. How Estabizz Uses Cookies",
                    content: (
                        <ul>
                            <li>To keep the website functional, secure and stable.</li>
                            <li>To understand how users navigate service pages, blogs, resources and contact forms.</li>
                            <li>To improve page speed, layout, usability and user experience.</li>
                            <li>To support analytics, search, form performance and website security.</li>
                            <li>To remember limited preferences where technically required.</li>
                        </ul>
                    ),
                },
                {
                    id: "types",
                    title: "4. Types of Cookies and Similar Tools",
                    content: (
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr><th>Type</th><th>Purpose</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Essential Cookies</td><td>Required for basic website operation, routing, forms and security.</td></tr>
                                    <tr><td>Analytics Cookies</td><td>Help us understand website traffic, page performance and user behaviour in aggregate.</td></tr>
                                    <tr><td>Functional Cookies</td><td>Support user preferences, forms, search and interface behaviour.</td></tr>
                                    <tr><td>Communication Tools</td><td>May support contact, WhatsApp, enquiry or consultation-related features.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    ),
                },
                {
                    id: "third-party",
                    title: "5. Third-Party Tools",
                    content: (
                        <p>Our website may use third-party tools for analytics, hosting, security, media, forms, communication or performance monitoring. These tools may set cookies or collect technical information based on their own policies. Estabizz does not control third-party cookie practices.</p>
                    ),
                },
                {
                    id: "lead-forms",
                    title: "6. Lead Forms and Communication Data",
                    content: (
                        <p>Cookies and technical tools may help us understand whether users accessed contact forms, consultation buttons, WhatsApp links, blog pages or service pages. Information submitted through forms is governed by our <a href="/legal/privacy-policy">Privacy Policy</a>.</p>
                    ),
                },
                {
                    id: "manage",
                    title: "7. Managing Cookies",
                    content: (
                        <p>Users can manage, block or delete cookies through browser settings. Disabling cookies may affect website functionality, page experience, forms, analytics or security-related features.</p>
                    ),
                },
                {
                    id: "consent",
                    title: "8. Consent",
                    content: (
                        <p>By continuing to use the website, users acknowledge that cookies and similar technologies may be used as described in this policy, subject to applicable law and browser settings.</p>
                    ),
                },
                {
                    id: "updates",
                    title: "9. Updates to this Policy",
                    content: (
                        <p>Estabizz may update this Cookie Policy from time to time to reflect changes in website tools, technology practices, legal requirements or internal processes.</p>
                    ),
                },
                {
                    id: "law-contact",
                    title: "10. Governing Law and Contact",
                    content: (
                        <>
                            <p>This Cookie Policy shall be governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of courts and authorities in Gujarat, India.</p>
                            <p>For cookie, website or privacy-related queries, contact: <a href="mailto:info@estabizz.com">info@estabizz.com</a>.</p>
                        </>
                    ),
                },
            ]}
        />
    );
}
