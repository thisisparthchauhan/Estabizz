import LegalPolicyLayout from "@/components/templates/LegalPolicyLayout";

export default function PageClient() {
    return (
        <LegalPolicyLayout
            title="Refund & Cancellation Policy"
            description="This Refund & Cancellation Policy explains how Estabizz Fintech Private Limited reviews cancellations, professional fee refunds, government fee exclusions and billing-related requests for advisory, documentation and compliance support services."
            sections={[
                {
                    id: "purpose",
                    title: "1. Purpose",
                    content: (
                        <p>This policy applies to payments made to Estabizz Fintech Private Limited for regulatory advisory, licensing support, registration assistance, documentation, compliance review, blog/resource related paid services, proposal-based work and allied professional support services.</p>
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
                    id: "professional-services",
                    title: "3. Nature of Professional Services",
                    content: (
                        <>
                            <p>Estabizz services generally involve expert time, business model review, document examination, research, drafting, coordination, regulatory interpretation, application preparation and professional communication.</p>
                            <p>Accordingly, refund eligibility depends on the agreed scope, stage of work, professional time already spent, documents reviewed, deliverables prepared and reasons for cancellation.</p>
                        </>
                    ),
                },
                {
                    id: "cancellation",
                    title: "4. Cancellation Before Work Starts",
                    content: (
                        <p>If a client requests cancellation before any professional work, review, drafting, consultation, coordination or document processing has started, Estabizz may review the request and consider refund of professional fees after deducting payment gateway charges, administrative costs or other applicable deductions.</p>
                    ),
                },
                {
                    id: "non-refundable",
                    title: "5. Non-Refundable Items",
                    content: (
                        <ul>
                            <li>Government fees, regulator fees, statutory charges, exchange fees, portal fees, stamp duty and taxes already paid.</li>
                            <li>Professional fees for work already completed or substantially performed.</li>
                            <li>Fees for consultation, document review, business model assessment, policy drafting, application preparation or query response already delivered.</li>
                            <li>Third-party charges such as certification, audit, payment gateway, courier, translation, professional associate or technology costs.</li>
                            <li>Cases where delay or closure is caused by incomplete, inaccurate or delayed information from the client.</li>
                        </ul>
                    ),
                },
                {
                    id: "possible-refunds",
                    title: "6. Possible Refund Situations",
                    content: (
                        <p>Refunds may be considered in limited situations such as duplicate payment, payment made for the wrong service, cancellation before work starts, or where Estabizz is unable to take up the agreed scope for internal reasons. Each request is reviewed on its own facts.</p>
                    ),
                },
                {
                    id: "regulatory-outcome",
                    title: "7. No Refund Based on Regulatory Outcome",
                    content: (
                        <p>Regulatory approvals, licences, registrations, renewals and permissions are subject to regulator review, eligibility, documentation quality, query rounds, statutory conditions and regulatory scrutiny. Refunds are not automatic merely because an application is delayed, queried, returned, rejected, withdrawn or not approved by a regulator.</p>
                    ),
                },
                {
                    id: "refund-process",
                    title: "8. Refund Request Process",
                    content: (
                        <>
                            <p>Refund or cancellation requests must be sent to <a href="mailto:info@estabizz.com">info@estabizz.com</a> with the client name, invoice details, payment proof, service name, reason for request and relevant communication records.</p>
                            <p>Estabizz may seek further information before deciding the request. Approved refunds, if any, will be processed through the original payment mode or another lawful payment method, subject to banking and payment gateway timelines.</p>
                        </>
                    ),
                },
                {
                    id: "service-credit",
                    title: "9. Service Credit or Scope Adjustment",
                    content: (
                        <p>In some cases, Estabizz may offer service credit, revised scope, alternate service support or adjusted deliverables instead of a cash refund, depending on the facts and mutual understanding with the client.</p>
                    ),
                },
                {
                    id: "taxes",
                    title: "10. Taxes and Invoices",
                    content: (
                        <p>GST, TDS, invoice adjustments, accounting entries and tax treatment shall be handled as per applicable law. Any refund may be adjusted for taxes, statutory deductions, payment gateway deductions or accounting requirements.</p>
                    ),
                },
                {
                    id: "law-contact",
                    title: "11. Governing Law and Contact",
                    content: (
                        <>
                            <p>This policy shall be governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of courts and authorities in Gujarat, India.</p>
                            <p>For billing, cancellation or refund-related queries, contact: <a href="mailto:info@estabizz.com">info@estabizz.com</a>.</p>
                        </>
                    ),
                },
            ]}
        />
    );
}
