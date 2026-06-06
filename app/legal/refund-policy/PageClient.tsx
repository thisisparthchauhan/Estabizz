"use client";
import ServicePageLayout from "@/components/templates/ServicePageLayout";

export default function PageClient() {
    const sections = [
        { id: "introduction", title: "1. Introduction" },
        { id: "professional-services", title: "2. Professional Service Nature" },
        { id: "non-refundable", title: "3. Non-Refundable Items" },
        { id: "eligible-refunds", title: "4. Possible Refund Situations" },
        { id: "request-process", title: "5. Refund Request Process" },
        { id: "timelines", title: "6. Review Timelines" },
        { id: "client-responsibility", title: "7. Client Responsibility" },
        { id: "regulatory-outcomes", title: "8. Regulatory Outcomes" },
        { id: "contact", title: "9. Contact Details" },
        { id: "faq", title: "10. FAQs" }
    ];

    const quickFacts = [
        { label: "Company", value: "Estabizz Fintech Private Limited" },
        { label: "Policy Type", value: "Professional Service Refund Policy" },
        { label: "Last Updated", value: "2026" },
        { label: "Contact Email", value: "info@estabizz.com" },
    ];

    const faqs = [
        { q: "Is refund automatic if regulator approval is not granted?", a: "No. Regulatory approval is outside Estabizz's control. Refund eligibility depends on agreed scope, work completed and the reason for closure." },
        { q: "Are government or regulator fees refundable?", a: "No. Government, regulator, portal, filing, payment gateway and third-party fees are governed by the respective authority or vendor and are generally non-refundable." },
        { q: "Can duplicate payment be refunded?", a: "Yes. Duplicate payments may be reviewed and refunded after verification of transaction records." },
        { q: "How can a refund request be submitted?", a: "A refund request should be sent to info@estabizz.com with payment details, service name, invoice reference and reason for request." },
        { q: "Can service scope be adjusted instead of refund?", a: "In suitable cases, Estabizz may consider scope adjustment or service credit, subject to internal review and mutual agreement." },
    ];

    return (
        <ServicePageLayout
            tags={[{ emoji: "💰", label: "Refund" }, { emoji: "⚖️", label: "Service Terms" }, { emoji: "✅", label: "Transparent Policy" }]}
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Refund Policy" }]}
            title="Refund Policy"
            readTime="7 min read"
            focusKeyword="Refund Policy"
            sections={sections}
            ctaTitle="Refund or Billing Query?"
            ctaDescription="Contact Estabizz with invoice details and service reference for review."
            quickFacts={quickFacts}
            relatedArticles={[
                { href: "/legal/terms-conditions", category: "Legal", title: "Terms and Conditions", description: "Website and engagement-related terms." },
                { href: "/legal/privacy-policy", category: "Legal", title: "Privacy Policy", description: "Website data handling and user privacy policy." },
                { href: "/contact", category: "Contact", title: "Contact Estabizz", description: "Reach the Estabizz team for billing or service queries." }
            ]}
            finalCtaTitle="Need Help with a Billing Query?"
            finalCtaDescription="Please contact Estabizz with your payment reference, service name and concern so the team can review the matter."
        >
            <h2 id="introduction">Introduction</h2>
            <p>Refund Policy of Estabizz Fintech Private Limited explains how refund requests are reviewed for professional advisory, documentation, compliance and regulatory support services. Because most Estabizz services involve expert time, document review, drafting, coordination and professional effort, refund eligibility depends on the stage of work and agreed scope.</p>
            <p>This policy is intended to create transparency before payment. It does not guarantee refund in every case and does not override specific written engagement terms agreed with a client.</p>

            <h2 id="professional-services">Professional Service Nature</h2>
            <p>Estabizz provides professional services that may include consultation, regulatory applicability review, documentation, drafting, filing support, compliance planning, policy preparation and query support. These services are effort-based and may begin immediately after confirmation, payment, document sharing or team allocation.</p>

            <h2 id="non-refundable">Non-Refundable Items</h2>
            <ul>
                <li>Consultation fees once consultation has been delivered or scheduled with professional allocation.</li>
                <li>Drafting, review, research, document preparation or advisory work already performed.</li>
                <li>Government, regulator, portal, filing, payment gateway, stamp, certification or third-party fees.</li>
                <li>Fees for work delayed due to incomplete, incorrect or delayed client documents.</li>
                <li>Matters where regulator, bank, portal or authority review is pending or adverse due to facts outside Estabizz control.</li>
            </ul>

            <h2 id="eligible-refunds">Possible Refund Situations</h2>
            <div className="overflow-x-auto my-6">
                <table className="data-table">
                    <thead><tr><th>Situation</th><th>Possible Position</th><th>Review Note</th></tr></thead>
                    <tbody>
                        <tr><td>Duplicate payment</td><td>May be refundable</td><td>Subject to payment verification</td></tr>
                        <tr><td>Service not started</td><td>May be reviewed</td><td>Professional allocation and preparatory work will be checked</td></tr>
                        <tr><td>Wrong service selected</td><td>May be adjusted</td><td>Service credit or revised scope may be considered</td></tr>
                        <tr><td>Client cancels after work starts</td><td>Generally not refundable for completed effort</td><td>Balance, if any, depends on internal review</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="request-process">Refund Request Process</h2>
            <ol>
                <li>Email the request to info@estabizz.com.</li>
                <li>Provide name, phone number, invoice / payment reference, service name and reason.</li>
                <li>Estabizz will review scope, work status, team allocation, documents shared and payment records.</li>
                <li>Decision will be communicated through email or other recorded communication.</li>
            </ol>

            <h2 id="timelines">Review Timelines</h2>
            <p>Refund requests are generally reviewed within a reasonable time after complete information is received. Bank, payment gateway or accounting processing timelines may apply separately where any refund is approved.</p>

            <h2 id="client-responsibility">Client Responsibility</h2>
            <p>Clients are expected to review service scope, proposal, invoice, assumptions, document requirements and timelines before payment. Delay or failure to provide documents, approvals or clarifications may affect timelines and refund eligibility.</p>

            <h2 id="regulatory-outcomes">Regulatory Outcomes</h2>
            <div className="info-box">
                <p>Regulatory approval, registration, licence grant, query outcome or authority decision is outside Estabizz's control. Fees are charged for professional advisory and documentation support, not for guaranteed approval.</p>
            </div>

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
