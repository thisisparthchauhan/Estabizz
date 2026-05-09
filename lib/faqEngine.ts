import type { FAQItem } from "@/components/FAQAccordion";

export const faqCategories = [
    "General Overview",
    "Eligibility & Applicability",
    "Legal & Regulatory Framework",
    "Registration / Application Process",
    "Capital, Net Worth & Infrastructure",
    "Documentation & Declarations",
    "Timelines & Fees",
    "Post-Registration Compliance",
    "Operational Restrictions & Permissions",
    "Penalties, Cancellation & Regulatory Action",
    "Practical & Scenario-Based Questions",
    "Advanced / Expert-Level Questions"
];

export const priorityFaqPages = [
    "NBFC Registration",
    "Account Aggregator Registration",
    "Payment Aggregator Licence",
    "PPI Registration",
    "Asset Reconstruction Company Registration",
    "NBFC Compliance",
    "AIF Registration",
    "PMS Registration",
    "RIA Registration",
    "Research Analyst Registration",
    "Stock Broker Registration",
    "Merchant Banker Registration",
    "RTA Registration",
    "Social Stock Exchange License",
    "Insurance Broker Registration",
    "Composite Broker Registration",
    "Reinsurance Broker Registration",
    "Corporate Agent Registration",
    "Insurance Marketing Firm Registration",
    "ISNP Registration",
    "Fund Management Entity",
    "Finance Company",
    "PSP",
    "ITFS",
    "BATF",
    "TechFin",
    "Aircraft Leasing"
];

export const complianceFaqs: FAQItem[] = [
    {
        section: "General Overview",
        question: "What is a regulatory licence in India?",
        answer: "A regulatory licence is permission from a competent regulator to carry out a controlled activity. The requirement depends on the business model, products, clients, capital structure and applicable law."
    },
    {
        section: "General Overview",
        question: "Why does Estabizz create detailed FAQs for licence pages?",
        answer: "Detailed FAQs help promoters understand eligibility, process, documents, fees and post-registration compliance before they begin. They also reduce avoidable documentation gaps during regulatory preparation."
    },
    {
        section: "Eligibility & Applicability",
        question: "How do I know which licence applies to my business?",
        answer: "The correct licence depends on the actual activity, revenue model, customer relationship and regulator. A lending activity, advisory activity, broking activity and payment activity may require different approvals."
    },
    {
        section: "Eligibility & Applicability",
        question: "Can a company apply if it already does another regulated activity?",
        answer: "Yes, but the activity must be evaluated for conflict, segregation, net worth, governance and fit-and-proper conditions. Some regulators may require separate entities or additional approvals."
    },
    {
        section: "Registration / Application Process",
        question: "How do I apply for a financial sector licence?",
        answer: "The process usually starts with applicability review, entity structuring, eligibility checks, document preparation, application filing, regulator queries and post-approval setup."
    },
    {
        section: "Documentation & Declarations",
        question: "What documents are commonly required for licence applications?",
        answer: "Common documents include constitutional records, financial statements, net worth certificate, business plan, policies, declarations, KYC records, experience proofs and compliance officer details."
    },
    {
        section: "Timelines & Fees",
        question: "How long does a regulatory licence take in India?",
        answer: "Timelines are indicative and depend on regulator review, documentation quality, eligibility, query cycles and readiness. Applicants should avoid relying on fixed timelines unless the regulator prescribes one."
    },
    {
        section: "Post-Registration Compliance",
        question: "What happens after a licence is granted?",
        answer: "Post-registration compliance begins immediately. The entity may need policies, returns, audits, board reporting, grievance systems, record keeping and ongoing regulatory filings."
    },
    {
        section: "Penalties, Cancellation & Regulatory Action",
        question: "What happens if a business operates without required registration?",
        answer: "Operating without required registration can lead to penalties, regulatory directions, cancellation risk, market restrictions, customer claims and reputational damage."
    },
    {
        section: "Practical & Scenario-Based Questions",
        question: "What should I do if the regulator raises a query?",
        answer: "The query should be answered with clear documents, revised disclosures and supporting explanations. Delayed or incomplete replies can extend the review period."
    },
    {
        section: "Advanced / Expert-Level Questions",
        question: "Can a regulatory licence be transferred?",
        answer: "Most licences are not freely transferable. Change in control, merger, transfer of business or restructuring usually requires prior approval or intimation as applicable."
    },
    {
        section: "Advanced / Expert-Level Questions",
        question: "What if net worth falls below the required limit?",
        answer: "The entity should restore net worth within the prescribed period, maintain evidence and inform the regulator where required. Continued shortfall can create enforcement or suspension risk."
    }
];

export function faqSchemaFromItems(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    };
}
