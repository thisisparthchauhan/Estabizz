"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "use-of-website", title: "2. Use of Website" },
        { id: "service-information", title: "3. Service Information" },
        { id: "consultation", title: "4. Consultation and Engagement" },
        { id: "payments", title: "5. Payments and Commercials" },
        { id: "user-responsibility", title: "6. User Responsibility" },
        { id: "intellectual-property", title: "7. Intellectual Property" },
        { id: "limitations", title: "8. Limitations" },
        { id: "third-party-links", title: "9. Third-Party Links" },
        { id: "governing-law", title: "10. Governing Law" },
        { id: "contact", title: "11. Contact Details" },
        { id: "faq", title: "12. FAQs" }
    ];

    const quickFacts = [
        { label: "Company", value: "Estabizz Fintech Private Limited" },
        { label: "Policy Type", value: "Website Terms and Conditions" },
        { label: "Last Updated", value: "2026" },
        { label: "Jurisdiction", value: "India" },
    ];

    const faqs = [
        { q: "What do these Terms and Conditions cover?", a: "These terms govern use of the Estabizz website, information pages, consultation requests, digital forms and website-linked communication channels." },
        { q: "Does website content guarantee regulatory approval?", a: "No. Website content is informational. Any licence, registration or approval remains subject to the concerned regulator, authority and applicable eligibility." },
        { q: "When does a client engagement start?", a: "A client engagement starts only after scope, commercials, required documents and engagement terms are confirmed between the client and Estabizz." },
        { q: "Can website content be copied?", a: "No. Website content, layouts, service descriptions and resources are protected and should not be copied or reused without permission." },
        { q: "How can I contact Estabizz about these terms?", a: "You may contact Estabizz at info@estabizz.com or +91 98256 00907 for website or service-related queries." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "📜", label: "Legal" }, { emoji: "⚖️", label: "Website Terms" }, { emoji: "✅", label: "Transparent Use" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Terms and Conditions" }]}
            title="Terms and Conditions"
            readTime="8 min read"
            focusKeyword="Terms and Conditions"
            sections={sections}
            ctaTitle="Need Assistance?"
            ctaDescription="Contact Estabizz for website, service scope or engagement-related queries."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/legal/privacy-policy", category: "Legal", title: "Privacy Policy", description: "How Estabizz handles website and user information." },
                { href: "/legal/refund-policy", category: "Legal", title: "Refund Policy", description: "Refund-related terms for professional services." },
                { href: "/contact", category: "Contact", title: "Contact Estabizz", description: "Speak to the Estabizz team." }
            ]}
            finalCtaTitle="Speak to Estabizz"
            finalCtaDescription="For service scope, consultation, proposal or website-related questions, contact Estabizz through the official contact details."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Terms and Conditions of Estabizz Fintech Private Limited govern the use of this website, its service pages, resources, forms, consultation links and digital communication channels. By accessing or using this website, users agree to read these terms carefully and use the website only for lawful and appropriate purposes.</p>
            <p>Estabizz operates as an independent regulatory advisory and compliance support organisation. We do not represent any government authority, regulator, exchange or statutory body.</p>

            <h2 id="use-of-website">Use of Website</h2>
            <ul>
                <li>Users may access the website for information, enquiry and service evaluation purposes.</li>
                <li>Users must not misuse the website, submit false information, attempt unauthorised access or interfere with website functionality.</li>
                <li>Website content should not be treated as a substitute for professional advice based on specific facts.</li>
            </ul>

            <h2 id="service-information">Service Information</h2>
            <p>Service pages are prepared for general informational and client education purposes. Regulatory requirements, fee schedules, timelines, forms, portal processes and eligibility conditions may change from time to time. Users should verify current requirements before taking any business or compliance decision.</p>
            <div className="info-box"><p>Nothing on this website should be interpreted as guaranteed approval, assured licence grant, fixed regulator timeline or official regulator communication.</p></div>

            <h2 id="consultation">Consultation and Engagement</h2>
            <p>Submitting an enquiry, using a WhatsApp link or booking a consultation does not automatically create a professional engagement. Scope of work, commercials, timelines, responsibilities and document requirements are confirmed separately through proposal, email, invoice, engagement note or mutually agreed communication.</p>

            <h2 id="payments">Payments and Commercials</h2>
            <p>Professional fees, government fees, regulatory fees, filing fees, third-party charges and taxes may be different depending on the service. Statutory or regulator fees are generally payable separately by the client unless expressly agreed otherwise.</p>

            <h2 id="user-responsibility">User Responsibility</h2>
            <ul>
                <li>Provide accurate, complete and lawful information.</li>
                <li>Share authentic documents and disclose relevant facts.</li>
                <li>Review service scope, timelines, assumptions and limitations before payment.</li>
                <li>Respond to document and clarification requests within reasonable time.</li>
            </ul>

            <h2 id="intellectual-property">Intellectual Property</h2>
            <p>All website content, design elements, service structures, text, graphics, resources and downloadable material belong to Estabizz or are used with appropriate rights. Users may not copy, reproduce, republish or commercially exploit website content without written permission.</p>

            <h2 id="limitations">Limitations</h2>
            <p>Regulatory outcomes depend on eligibility, documentation quality, regulator review, query rounds, legal position and business facts. Estabizz provides advisory and documentation support but does not control decisions of any regulator, authority, bank, exchange, portal or third-party institution.</p>

            <h2 id="third-party-links">Third-Party Links</h2>
            <p>The website may contain links to regulator websites, portals, payment gateways, social media platforms or third-party resources. Estabizz is not responsible for third-party website content, availability, security or privacy practices.</p>

            <h2 id="governing-law">Governing Law</h2>
            <p>These terms are governed by applicable laws of India. Any dispute will be handled as per applicable legal procedure and agreed engagement terms, where any professional engagement exists.</p>

            <h2 id="contact">Contact Details</h2>
            <div className="info-box">
                <p><strong>Estabizz Fintech Private Limited</strong></p>
                <p>15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421</p>
                <p><strong>Phone:</strong> +91 98256 00907</p>
                <p><strong>Email:</strong> info@estabizz.com</p>
            </div>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-3 my-6">
                {faqs.map((item, i) => (
                    <details key={i} className="faq-accordion border border-gray-100 rounded-xl overflow-hidden">
                        <summary className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-blue-50/30 transition-colors font-semibold text-[#0a1628] text-[15px]">
                            <span>{item.q}</span>
                            <span className="text-[#0096D6] transition-transform group-open:rotate-180 shrink-0 ml-4">▼</span>
                        </summary>
                        <div className="p-5 border-t border-gray-100 bg-white text-[14px] text-[#374151] leading-relaxed">{item.a}</div>
                    </details>
                ))}
            </div>
        </ServicePageLayout>
    );
}
