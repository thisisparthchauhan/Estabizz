"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "scope", title: "2. Scope of this Policy" },
        { id: "information-collected", title: "3. Information We Collect" },
        { id: "use-of-information", title: "4. How We Use Information" },
        { id: "cookies", title: "5. Cookies and Analytics" },
        { id: "sharing", title: "6. Disclosure and Sharing" },
        { id: "security", title: "7. Data Storage and Security" },
        { id: "rights", title: "8. User Rights and Choices" },
        { id: "retention", title: "9. Data Retention" },
        { id: "updates", title: "10. Policy Updates" },
        { id: "contact", title: "11. Contact Details" },
        { id: "faq", title: "12. FAQs" }
    ];

    const quickFacts = [
        { label: "Company", value: "Estabizz Fintech Private Limited" },
        { label: "Policy Type", value: "Website Privacy Policy" },
        { label: "Last Updated", value: "2026" },
        { label: "Contact Email", value: "info@estabizz.com" },
    ];

    const faqs = [
        { q: "What is the purpose of this Privacy Policy?", a: "This Privacy Policy explains how Estabizz collects, uses, stores and protects information received through its website, forms, calls, emails and client communication channels." },
        { q: "Does Estabizz collect personal information?", a: "Yes. Estabizz may collect information such as name, email address, phone number, company name, service interest and documents voluntarily shared for advisory or compliance support." },
        { q: "Does Estabizz sell user data?", a: "No. Estabizz does not sell personal information. Information may be shared only where required for service delivery, legal compliance, professional review or regulatory documentation support." },
        { q: "Can a user request correction of personal details?", a: "Yes. Users may contact Estabizz at info@estabizz.com to request correction or update of their submitted information, subject to verification." },
        { q: "Is this Privacy Policy legal advice?", a: "No. This policy is for website transparency and user information. It should not be treated as legal, regulatory, tax, investment or financial advice." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "🔒", label: "Privacy" }, { emoji: "⚖️", label: "Legal Policy" }, { emoji: "✅", label: "Website Transparency" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Privacy Policy" }]}
            title="Privacy Policy"
            readTime="8 min read"
            focusKeyword="Privacy Policy"
            sections={sections}
            ctaTitle="Questions About Your Data?"
            ctaDescription="Contact Estabizz for privacy, website data or communication-related queries."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/legal/terms-conditions", category: "Legal", title: "Terms and Conditions", description: "Website terms governing use of Estabizz digital properties." },
                { href: "/legal/refund-policy", category: "Legal", title: "Refund Policy", description: "Professional service fee and refund-related policy information." },
                { href: "/contact", category: "Contact", title: "Contact Estabizz", description: "Reach the Estabizz team for service or privacy-related queries." }
            ]}
            finalCtaTitle="Need to Contact Estabizz?"
            finalCtaDescription="For privacy, service, documentation or regulatory advisory queries, please contact Estabizz through the official contact details provided on this page."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Privacy Policy of Estabizz Fintech Private Limited explains how we collect, use, protect and manage information shared by visitors, clients, prospective clients and users of our website. We respect the confidentiality of business and personal information shared with us for regulatory advisory, licensing, documentation and compliance support.</p>
            <p>This policy is intended to provide clear information about our data handling practices. It does not create any guarantee of service outcome, regulatory approval or legal opinion.</p>

            <h2 id="scope">Scope of this Policy</h2>
            <p>This Privacy Policy applies to information collected through the Estabizz website, contact forms, consultation requests, WhatsApp links, email communication, blog submission forms, proposal requests and other digital communication channels operated by Estabizz Fintech Private Limited.</p>
            <div className="info-box">
                <p>This policy does not apply to third-party websites, payment gateways, external platforms or regulator portals that may be linked from the Estabizz website. Users should review the privacy terms of such third-party platforms separately.</p>
            </div>

            <h2 id="information-collected">Information We Collect</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Information Category</th><th>Examples</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td>Contact Information</td><td>Name, email, phone number, company name</td><td>Responding to enquiries and consultation requests</td></tr>
                        <tr><td>Service Information</td><td>Licence type, business model, regulator category, project details</td><td>Understanding advisory scope and applicability</td></tr>
                        <tr><td>Documents Shared Voluntarily</td><td>Incorporation documents, KYC, drafts, business notes</td><td>Professional review, documentation support and service execution</td></tr>
                        <tr><td>Website Usage Data</td><td>IP address, device type, browser, pages visited</td><td>Website security, analytics and user experience improvement</td></tr>
                        <tr><td>Communication Data</td><td>Email correspondence, call notes, WhatsApp messages</td><td>Client coordination, query tracking and service records</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="use-of-information">How We Use Information</h2>
            <ul>
                <li>To respond to enquiries, consultation requests and service interest forms.</li>
                <li>To evaluate regulatory applicability, documentation requirements and advisory scope.</li>
                <li>To prepare proposals, checklists, client notes, regulatory documents and compliance support records.</li>
                <li>To communicate updates, reminders, service information and regulatory insights where appropriate.</li>
                <li>To improve website functionality, security, analytics and user experience.</li>
                <li>To comply with applicable legal, contractual, professional or regulatory requirements.</li>
            </ul>

            <h2 id="cookies">Cookies and Analytics</h2>
            <p>The Estabizz website may use cookies, analytics tools or similar technologies to understand page usage, improve website performance and maintain security. Users may control cookies through browser settings, but disabling cookies may affect certain website functions.</p>

            <h2 id="sharing">Disclosure and Sharing</h2>
            <p>Estabizz may share information with internal team members, associate professionals, technology vendors, payment processors, legal or compliance consultants and other service providers only where required for service delivery, operational support, legal compliance or user-requested communication.</p>
            <div className="info-box">
                <p>Estabizz does not sell personal information. Information may be disclosed if required by law, court order, regulator direction, government authority or for protection of legitimate legal rights.</p>
            </div>

            <h2 id="security">Data Storage and Security</h2>
            <p>We take reasonable administrative, technical and organisational measures to protect information shared with us. However, no website, digital platform or internet transmission can be guaranteed to be completely secure. Users should avoid sharing unnecessary sensitive information through unsecured channels.</p>

            <h2 id="rights">User Rights and Choices</h2>
            <p>Users may contact Estabizz to request correction, update or review of personal information submitted to us. Requests may be subject to identity verification, legal retention requirements and ongoing service obligations.</p>

            <h2 id="retention">Data Retention</h2>
            <p>Information may be retained for as long as reasonably required for enquiry handling, client service records, legal documentation, compliance evidence, dispute resolution, audit, accounting or statutory purposes. Retention periods may vary depending on the nature of the service and applicable law.</p>

            <h2 id="updates">Policy Updates</h2>
            <p>Estabizz may update this Privacy Policy from time to time to reflect changes in legal requirements, website features, service processes or internal data handling practices. The updated policy will be made available on this page.</p>

            <h2 id="contact">Contact Details</h2>
            <div className="info-box">
                <p><strong>Estabizz Fintech Private Limited</strong></p>
                <p>15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421</p>
                <p><strong>Phone:</strong> +91 98256 00907</p>
                <p><strong>Email:</strong> info@estabizz.com</p>
            </div>

            <h2 id="disclaimer">Legal Disclaimer</h2>
            <p>This Privacy Policy is for general website transparency and informational purposes only. It should not be treated as legal, regulatory, tax, investment or financial advice. Data protection requirements may change from time to time, and users should obtain professional advice for their own website or business-specific privacy documentation.</p>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span>
                            <span className="text-[#0096D6] transition-transform group-open:rotate-180 shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
