export type RiskRating = "Low" | "Moderate" | "High";

export type RegulatoryUpdate = {
    slug: string;
    regulator: "RBI" | "SEBI" | "IRDAI" | "IFSCA" | "FIU / AML" | "MCA / ROC" | "Government Licences";
    title: string;
    subtitle: string;
    date: string;
    circularNumber: string;
    regulation: string;
    effectiveFrom: string;
    affectedEntities: string[];
    riskRating: RiskRating;
    lastReviewed: string;
    summary: string;
    changes: { area: string; earlier: string; revised: string; impact: string }[];
    actionChecklist: { action: string; responsibility: string; timeline: string }[];
};

export const regulatoryUpdates: RegulatoryUpdate[] = [
    {
        slug: "sebi-master-circular-update-for-rtas",
        regulator: "SEBI",
        title: "SEBI Master Circular Update for RTAs",
        subtitle: "Investor service, grievance and record-retention expectations require stronger operational readiness.",
        date: "2026-04-18",
        circularNumber: "Illustrative compliance update",
        regulation: "SEBI RTA framework and related circulars",
        effectiveFrom: "As specified in the circular",
        affectedEntities: ["RTAs", "Listed entities", "Capital market intermediaries"],
        riskRating: "High",
        lastReviewed: "2026-05-09",
        summary: "The circular strengthens expectations around investor service portals, grievance timelines, cyber resilience and record retention.",
        changes: [
            { area: "Investor service", earlier: "Existing service standards continued", revised: "Higher focus on portal readiness and turnaround evidence", impact: "RTAs should review SOPs, escalation records and service evidence." },
            { area: "Grievance handling", earlier: "Not specifically provided / existing framework continued", revised: "Stronger governance around timelines and closure records", impact: "Compliance teams should map complaint workflows and audit trails." },
            { area: "Records", earlier: "Record keeping required", revised: "Greater inspection focus on retrievability", impact: "Document retention and retrieval controls should be tested." }
        ],
        actionChecklist: [
            { action: "Review circular applicability", responsibility: "Compliance Officer", timeline: "Day 1" },
            { action: "Update investor grievance SOP", responsibility: "Operations / Compliance", timeline: "Day 7" },
            { action: "Place note before Compliance Committee", responsibility: "Company Secretary", timeline: "Day 15" },
            { action: "Maintain implementation evidence", responsibility: "Compliance Team", timeline: "Ongoing" }
        ]
    },
    {
        slug: "rbi-digital-lending-compliance-review",
        regulator: "RBI",
        title: "RBI Digital Lending Compliance Review",
        subtitle: "Digital lending arrangements should be reviewed for disclosure, data and outsourcing controls.",
        date: "2026-03-28",
        circularNumber: "Illustrative compliance update",
        regulation: "RBI Digital Lending and outsourcing framework",
        effectiveFrom: "As applicable",
        affectedEntities: ["NBFCs", "Banks", "Digital lending platforms", "LSPs"],
        riskRating: "High",
        lastReviewed: "2026-05-09",
        summary: "Digital lending entities should review KFS delivery, fund-flow controls, consent architecture, outsourcing contracts and customer grievance mechanisms.",
        changes: [
            { area: "Customer disclosure", earlier: "Existing disclosure framework continued", revised: "Greater emphasis on traceable digital disclosures", impact: "KFS and consent records should be verifiable." },
            { area: "Outsourcing", earlier: "Outsourcing controls required", revised: "Closer scrutiny of LSP arrangements", impact: "NBFCs should update contracts and monitoring records." }
        ],
        actionChecklist: [
            { action: "Review digital lending journey", responsibility: "Product / Compliance", timeline: "Day 7" },
            { action: "Update LSP monitoring checklist", responsibility: "Compliance Officer", timeline: "Day 15" },
            { action: "Test KFS and consent evidence", responsibility: "Operations", timeline: "Day 30" }
        ]
    },
    {
        slug: "ifsca-entity-compliance-calendar-readiness",
        regulator: "IFSCA",
        title: "IFSCA Entity Compliance Calendar Readiness",
        subtitle: "IFSC entities should map recurring regulatory, governance and reporting timelines early.",
        date: "2026-02-12",
        circularNumber: "Illustrative compliance update",
        regulation: "IFSCA entity-specific regulations and circulars",
        effectiveFrom: "Ongoing",
        affectedEntities: ["Finance Companies", "PSPs", "FMEs", "ITFS operators", "BATF service providers"],
        riskRating: "Moderate",
        lastReviewed: "2026-05-09",
        summary: "Entities operating in GIFT City should maintain a board-approved compliance calendar and evidence of filings, audits and policy reviews.",
        changes: [
            { area: "Compliance calendar", earlier: "Entity-specific requirements continued", revised: "Practical need for consolidated tracking", impact: "Create one calendar for filings, audits and board matters." }
        ],
        actionChecklist: [
            { action: "Map entity-specific filings", responsibility: "Compliance Team", timeline: "Day 7" },
            { action: "Create board reporting tracker", responsibility: "Company Secretary", timeline: "Day 15" },
            { action: "Review evidence folder", responsibility: "Operations", timeline: "Monthly" }
        ]
    }
];

export const regulators = ["All Updates", "RBI", "SEBI", "IRDAI", "IFSCA", "FIU / AML", "MCA / ROC", "Government Licences"];
