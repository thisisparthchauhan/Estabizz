'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const sections = [{"id": "introduction", "title": "Introduction"}, {"id": "what-is", "title": "What is Legal Due Diligence?"}, {"id": "regulatory-framework", "title": "Regulatory Framework"}, {"id": "who-needs", "title": "Who Needs Legal Due Diligence Services in India"}, {"id": "eligibility", "title": "Eligibility for Conducting Legal Due Diligence"}, {"id": "documents", "title": "Documents Required for Legal Due Diligence"}, {"id": "process", "title": "Step-by-Step Legal Due Diligence Process"}, {"id": "fees", "title": "Fees for Legal Due Diligence Services in India"}, {"id": "timeline", "title": "Timeline for Legal Due Diligence"}, {"id": "post-diligence-compliance", "title": "Post-Due Diligence Compliance"}, {"id": "common-mistakes", "title": "Common Mistakes in Legal Due Diligence"}, {"id": "key-takeaways", "title": "Key Takeaways on Legal Due Diligence Services in India"}, {"id": "why-professional-support", "title": "Why Professional Support Matters"}, {"id": "advanced-scope", "title": "Advanced Scope of Legal Due Diligence Services in India"}, {"id": "types", "title": "Types of Legal Due Diligence in India"}, {"id": "risk-areas", "title": "Key Risk Areas and Red Flags"}, {"id": "report", "title": "The Legal Due Diligence Report"}, {"id": "business-impact", "title": "Why It Matters for Investors and Businesses"}, {"id": "transaction-specific", "title": "Transaction-Specific Legal Due Diligence"}, {"id": "checklists", "title": "Working Checklists"}, {"id": "deal-impact", "title": "Impact on Deal Structuring, Negotiation and Valuation"}, {"id": "regulatory-expectations", "title": "Regulatory Expectations During Due Diligence"}, {"id": "advanced-compliance-insights", "title": "Advanced Compliance Insights"}, {"id": "deal-breakers", "title": "When Legal Due Diligence Becomes a Deal Breaker"}, {"id": "when-to-opt", "title": "When Should You Opt for Legal Due Diligence?"}, {"id": "integration", "title": "Integration with Other Due Diligence Types"}, {"id": "vs-legal-audit", "title": "Legal Due Diligence vs Legal Audit"}, {"id": "industry-application", "title": "Industry-Specific Application"}, {"id": "startup-ecosystem", "title": "Legal Due Diligence in the Startup Ecosystem"}, {"id": "risk-classification", "title": "Legal Risk Classification Model"}, {"id": "how-investors-use", "title": "How Investors Use Legal Due Diligence Reports"}, {"id": "client-perspective", "title": "What You Get"}, {"id": "estabizz-approach", "title": "Why the Estabizz Approach Is Different"}, {"id": "expert-insight", "title": "Expert Insight"}, {"id": "final-takeaway", "title": "Final Takeaway"}, {"id": "faqs", "title": "Frequently Asked Questions"}, {"id": "disclaimer", "title": "Disclaimer"}];

const faqGroups = [
  {
    "title": "Section 1: Basic Understanding",
    "items": [
      {
        "number": 1,
        "q": "What are Legal Due Diligence Services in India?",
        "a": "Legal Due Diligence Services in India involve reviewing a company’s legal, regulatory, and contractual records to identify risks before a transaction.",
        "points": []
      },
      {
        "number": 2,
        "q": "Why is legal due diligence important?",
        "a": "It helps identify hidden liabilities, compliance gaps, and legal risks before investment or acquisition decisions.",
        "points": []
      },
      {
        "number": 3,
        "q": "Is legal due diligence mandatory in India?",
        "a": "No, it is not legally mandatory, but it is strongly recommended as per governance best practices.",
        "points": []
      },
      {
        "number": 4,
        "q": "Who performs legal due diligence?",
        "a": "Company Secretaries, lawyers, and compliance professionals typically conduct legal due diligence.",
        "points": []
      },
      {
        "number": 5,
        "q": "What is the objective of legal due diligence?",
        "a": "The objective is to assess legal risks, ensure compliance, and support informed decision-making.",
        "points": []
      },
      {
        "number": 6,
        "q": "What does legal due diligence cover?",
        "a": "It covers:",
        "points": [
          "Corporate records",
          "Compliance filings",
          "Contracts",
          "Litigation",
          "IP rights"
        ]
      },
      {
        "number": 7,
        "q": "What is a due diligence report?",
        "a": "It is a structured report highlighting risks, compliance gaps, and recommendations.",
        "points": []
      },
      {
        "number": 8,
        "q": "Is due diligence required for startups?",
        "a": "Yes, especially during funding rounds and investor onboarding.",
        "points": []
      },
      {
        "number": 9,
        "q": "What is a data room in due diligence?",
        "a": "A secure digital space where company documents are shared for review.",
        "points": []
      },
      {
        "number": 10,
        "q": "What is the difference between audit and due diligence?",
        "a": "Audit is periodic; due diligence is transaction-specific.",
        "points": []
      },
      {
        "number": 11,
        "q": "Can due diligence prevent business risk?",
        "a": "It reduces risk significantly but cannot eliminate all uncertainties.",
        "points": []
      },
      {
        "number": 12,
        "q": "What is vendor due diligence?",
        "a": "It is conducted by the seller to present compliance status to buyers.",
        "points": []
      },
      {
        "number": 13,
        "q": "What is investor due diligence?",
        "a": "It is conducted by investors before funding or acquisition.",
        "points": []
      },
      {
        "number": 14,
        "q": "What are red flags in due diligence?",
        "a": "Common red flags include:",
        "points": [
          "Non-compliance",
          "Litigation",
          "Hidden liabilities"
        ]
      },
      {
        "number": 15,
        "q": "What industries require due diligence?",
        "a": "All industries, especially regulated sectors like finance, insurance, and fintech.",
        "points": []
      },
      {
        "number": 16,
        "q": "What is legal risk in due diligence?",
        "a": "Legal risk refers to exposure arising from non-compliance or contractual issues.",
        "points": []
      },
      {
        "number": 17,
        "q": "What is materiality in due diligence?",
        "a": "It refers to the significance of a risk impacting a transaction.",
        "points": []
      },
      {
        "number": 18,
        "q": "What is legal due diligence checklist?",
        "a": "A structured list of documents and compliance areas reviewed during the process.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 2: Eligibility & Applicability",
    "items": [
      {
        "number": 19,
        "q": "Who needs Legal Due Diligence Services in India?",
        "a": "Investors, startups, companies undergoing M&A, and financial institutions require it.",
        "points": []
      },
      {
        "number": 20,
        "q": "Is due diligence required for NBFC transactions?",
        "a": "Yes, as per RBI expectations, due diligence is critical.",
        "points": []
      },
      {
        "number": 21,
        "q": "Do foreign investors require due diligence?",
        "a": "Yes, especially for FEMA and FDI compliance.",
        "points": []
      },
      {
        "number": 22,
        "q": "Is due diligence required for LLPs?",
        "a": "Yes, particularly during investment or restructuring.",
        "points": []
      },
      {
        "number": 23,
        "q": "Can small businesses opt for due diligence?",
        "a": "Yes, it helps identify compliance gaps and risks early.",
        "points": []
      },
      {
        "number": 24,
        "q": "Is due diligence required before share transfer?",
        "a": "Recommended for large or strategic transactions.",
        "points": []
      },
      {
        "number": 25,
        "q": "Can anyone conduct due diligence?",
        "a": "It should be conducted by a qualified professional \u2014 typically a Company Secretary, lawyer or Chartered Accountant. The point is qualification and independence, not whether the reviewer is an individual or a firm.",
        "points": []
      },
      {
        "number": 26,
        "q": "Is due diligence required for asset purchase?",
        "a": "Yes, to verify ownership and legal validity.",
        "points": []
      },
      {
        "number": 27,
        "q": "Do startups need due diligence before funding?",
        "a": "Yes, investors typically insist on it.",
        "points": []
      },
      {
        "number": 28,
        "q": "Is due diligence required for partnerships?",
        "a": "Yes, especially for high-value agreements.",
        "points": []
      },
      {
        "number": 29,
        "q": "Is due diligence applicable for listed companies?",
        "a": "Yes, along with SEBI compliance requirements.",
        "points": []
      },
      {
        "number": 30,
        "q": "Is due diligence required for mergers?",
        "a": "Yes, it is a standard requirement.",
        "points": []
      },
      {
        "number": 31,
        "q": "Who approves due diligence reports?",
        "a": "Stakeholders like investors or boards review them.",
        "points": []
      },
      {
        "number": 32,
        "q": "Can due diligence be skipped?",
        "a": "It is risky to skip, especially in major transactions.",
        "points": []
      },
      {
        "number": 33,
        "q": "Is due diligence required for joint ventures?",
        "a": "Yes, to assess partner credibility and compliance.",
        "points": []
      },
      {
        "number": 34,
        "q": "Can banks require due diligence?",
        "a": "Yes, lenders often conduct due diligence.",
        "points": []
      },
      {
        "number": 35,
        "q": "Is due diligence needed for restructuring?",
        "a": "Yes, to assess legal implications.",
        "points": []
      },
      {
        "number": 36,
        "q": "Is due diligence applicable to private companies?",
        "a": "Yes, regardless of company type.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 3: Due Diligence Process",
    "items": [
      {
        "number": 37,
        "q": "What is the process of legal due diligence?",
        "a": "It includes:",
        "points": [
          "Scope definition",
          "Document collection",
          "Review",
          "Reporting"
        ]
      },
      {
        "number": 38,
        "q": "What is the first step in due diligence?",
        "a": "Understanding the transaction scope.",
        "points": []
      },
      {
        "number": 39,
        "q": "How are documents collected?",
        "a": "Through a data room or direct sharing.",
        "points": []
      },
      {
        "number": 40,
        "q": "What happens after document review?",
        "a": "Risks and observations are identified.",
        "points": []
      },
      {
        "number": 41,
        "q": "How is the report prepared?",
        "a": "Based on findings and risk classification.",
        "points": []
      },
      {
        "number": 42,
        "q": "Can due diligence be done online?",
        "a": "Yes, via virtual data rooms.",
        "points": []
      },
      {
        "number": 43,
        "q": "What is risk classification?",
        "a": "Categorisation into high, medium, and low risks.",
        "points": []
      },
      {
        "number": 44,
        "q": "Who prepares the final report?",
        "a": "Compliance professionals or legal experts.",
        "points": []
      },
      {
        "number": 45,
        "q": "What is transaction due diligence?",
        "a": "Due diligence conducted before investment or acquisition.",
        "points": []
      },
      {
        "number": 46,
        "q": "Can due diligence be phased?",
        "a": "Yes, based on complexity.",
        "points": []
      },
      {
        "number": 47,
        "q": "What is preliminary due diligence?",
        "a": "Initial screening before detailed review.",
        "points": []
      },
      {
        "number": 48,
        "q": "Can due diligence be customised?",
        "a": "Yes, depending on transaction needs.",
        "points": []
      },
      {
        "number": 49,
        "q": "What is scope limitation?",
        "a": "Restrictions in document access or review.",
        "points": []
      },
      {
        "number": 50,
        "q": "What is diligence checklist?",
        "a": "A structured review framework.",
        "points": []
      },
      {
        "number": 51,
        "q": "Is site visit required?",
        "a": "Not always; depends on transaction.",
        "points": []
      },
      {
        "number": 52,
        "q": "What is final closure in due diligence?",
        "a": "Submission of final report.",
        "points": []
      },
      {
        "number": 53,
        "q": "Can due diligence be expedited?",
        "a": "Yes, with complete documentation.",
        "points": []
      },
      {
        "number": 54,
        "q": "What happens after report submission?",
        "a": "Stakeholders take investment decisions.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 4: Documents & Requirements",
    "items": [
      {
        "number": 55,
        "q": "What documents are required for due diligence?",
        "a": "Key documents include:",
        "points": [
          "MOA & AOA",
          "Financials",
          "Agreements",
          "Compliance filings"
        ]
      },
      {
        "number": 56,
        "q": "Are board resolutions required?",
        "a": "Yes, for verifying corporate actions.",
        "points": []
      },
      {
        "number": 57,
        "q": "Are financial statements required?",
        "a": "Yes, for linked legal analysis.",
        "points": []
      },
      {
        "number": 58,
        "q": "Are contracts mandatory for review?",
        "a": "Yes, all key agreements must be reviewed.",
        "points": []
      },
      {
        "number": 59,
        "q": "Is litigation data required?",
        "a": "Yes, to assess legal exposure.",
        "points": []
      },
      {
        "number": 60,
        "q": "Are IP documents required?",
        "a": "Yes, for ownership validation.",
        "points": []
      },
      {
        "number": 61,
        "q": "Are ROC filings required?",
        "a": "Yes, for compliance verification.",
        "points": []
      },
      {
        "number": 62,
        "q": "Are statutory registers required?",
        "a": "Yes, as per Companies Act.",
        "points": []
      },
      {
        "number": 63,
        "q": "Is KYC documentation required?",
        "a": "Yes, especially for financial entities.",
        "points": []
      },
      {
        "number": 64,
        "q": "Are loan agreements required?",
        "a": "Yes, to review obligations.",
        "points": []
      },
      {
        "number": 65,
        "q": "Is shareholding data required?",
        "a": "Yes, to verify ownership structure.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 5: Fees & Cost",
    "items": [
      {
        "number": 66,
        "q": "What is the cost of legal due diligence in India?",
        "a": "It varies with scope — broadly ₹50,000–₹2,00,000 for startup due diligence, ₹2,00,000–₹5,00,000 for SME transactions and ₹5,00,000 upwards for large transactions. Figures are indicative only.",
        "points": []
      },
      {
        "number": 67,
        "q": "Who pays for due diligence?",
        "a": "Usually the investor or buyer.",
        "points": []
      },
      {
        "number": 68,
        "q": "Can cost vary based on complexity?",
        "a": "Yes, higher complexity increases cost.",
        "points": []
      },
      {
        "number": 69,
        "q": "Is fixed pricing available?",
        "a": "Sometimes, but mostly scope-based.",
        "points": []
      },
      {
        "number": 70,
        "q": "Are additional charges applicable?",
        "a": "Yes, for extended scope or urgent work.",
        "points": []
      },
      {
        "number": 71,
        "q": "Is due diligence expensive?",
        "a": "It is a cost-saving investment in risk mitigation.",
        "points": []
      },
      {
        "number": 72,
        "q": "Can startups afford due diligence?",
        "a": "Yes, scaled-down versions are available.",
        "points": []
      },
      {
        "number": 73,
        "q": "Are government fees involved?",
        "a": "There is no government fee for the exercise itself. Out-of-pocket charges normally arise and are passed through \u2014 MCA document downloads, ROC and index searches, litigation and IP record searches.",
        "points": []
      },
      {
        "number": 74,
        "q": "Can cost be negotiated?",
        "a": "Yes, depending on scope.",
        "points": []
      },
      {
        "number": 75,
        "q": "Is payment milestone-based?",
        "a": "Often structured in phases.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 6: Timeline & Approval",
    "items": [
      {
        "number": 76,
        "q": "How long does due diligence take?",
        "a": "Typically 2–4 weeks.",
        "points": []
      },
      {
        "number": 77,
        "q": "Can it be completed faster?",
        "a": "Yes, with complete documentation.",
        "points": []
      },
      {
        "number": 78,
        "q": "What affects timeline?",
        "a": "Factors include:",
        "points": [
          "Document availability",
          "Complexity",
          "Scope"
        ]
      },
      {
        "number": 79,
        "q": "Is there regulatory approval required?",
        "a": "No, but compliance alignment is expected.",
        "points": []
      },
      {
        "number": 80,
        "q": "Can delays happen?",
        "a": "Yes, due to incomplete data.",
        "points": []
      },
      {
        "number": 81,
        "q": "What is report turnaround time?",
        "a": "3–5 days after review.",
        "points": []
      },
      {
        "number": 82,
        "q": "Is timeline fixed?",
        "a": "No, it varies case-to-case.",
        "points": []
      },
      {
        "number": 83,
        "q": "Can multiple teams work simultaneously?",
        "a": "Yes, for faster completion.",
        "points": []
      },
      {
        "number": 84,
        "q": "Is due diligence ongoing?",
        "a": "It is typically one-time per transaction.",
        "points": []
      },
      {
        "number": 85,
        "q": "Can timeline impact deal closure?",
        "a": "Yes, delays can postpone transactions.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 7: Compliance & Post-Diligence",
    "items": [
      {
        "number": 86,
        "q": "What happens after due diligence?",
        "a": "Compliance gaps are rectified.",
        "points": []
      },
      {
        "number": 87,
        "q": "Is rectification mandatory?",
        "a": "Yes, for smooth transaction closure.",
        "points": []
      },
      {
        "number": 88,
        "q": "Can non-compliance be corrected?",
        "a": "Yes, through regularisation.",
        "points": []
      },
      {
        "number": 89,
        "q": "Is report shared with regulators?",
        "a": "Usually internal unless required.",
        "points": []
      },
      {
        "number": 90,
        "q": "What is compliance alignment?",
        "a": "Ensuring business meets regulatory norms.",
        "points": []
      },
      {
        "number": 91,
        "q": "Can due diligence improve governance?",
        "a": "Yes, significantly.",
        "points": []
      },
      {
        "number": 92,
        "q": "Is continuous monitoring required?",
        "a": "Recommended for regulated entities.",
        "points": []
      },
      {
        "number": 93,
        "q": "Can due diligence trigger restructuring?",
        "a": "Yes, if major risks are identified.",
        "points": []
      },
      {
        "number": 94,
        "q": "Is documentation updated post diligence?",
        "a": "Yes, to correct gaps.",
        "points": []
      },
      {
        "number": 95,
        "q": "Can due diligence help audits?",
        "a": "Yes, improves audit readiness.",
        "points": []
      },
      {
        "number": 96,
        "q": "Are contracts renegotiated?",
        "a": "Yes, if risks are found.",
        "points": []
      },
      {
        "number": 97,
        "q": "Is legal compliance mandatory post diligence?",
        "a": "Yes, as per applicable regulations.",
        "points": []
      },
      {
        "number": 98,
        "q": "Can due diligence reduce future disputes?",
        "a": "Yes, by identifying risks early.",
        "points": []
      },
      {
        "number": 99,
        "q": "Is board approval required post diligence?",
        "a": "Sometimes, for major changes.",
        "points": []
      },
      {
        "number": 100,
        "q": "Can due diligence impact operations?",
        "a": "Yes, through compliance corrections.",
        "points": []
      },
      {
        "number": 101,
        "q": "Is investor reporting required?",
        "a": "Yes, in funding scenarios.",
        "points": []
      },
      {
        "number": 102,
        "q": "Can due diligence improve valuation?",
        "a": "Yes, if compliance is strong.",
        "points": []
      },
      {
        "number": 103,
        "q": "Are disclosures mandatory?",
        "a": "Yes, under governing provisions.",
        "points": []
      },
      {
        "number": 104,
        "q": "Can due diligence lead to deal restructuring?",
        "a": "Yes, if risks are high.",
        "points": []
      },
      {
        "number": 105,
        "q": "Is legal advice required post diligence?",
        "a": "Yes, for implementation.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 8: Penalties & Risks",
    "items": [
      {
        "number": 106,
        "q": "What happens if due diligence is not done?",
        "a": "High risk of hidden liabilities and losses.",
        "points": []
      },
      {
        "number": 107,
        "q": "Can non-compliance lead to penalties?",
        "a": "Yes, as per applicable laws.",
        "points": []
      },
      {
        "number": 108,
        "q": "What are major risks identified?",
        "a": "Non-compliance, litigation, and fraud.",
        "points": []
      },
      {
        "number": 109,
        "q": "Can deals fail due to due diligence?",
        "a": "Yes, if risks are significant.",
        "points": []
      },
      {
        "number": 110,
        "q": "Is fraud detectable in due diligence?",
        "a": "Yes, through inconsistencies.",
        "points": []
      },
      {
        "number": 111,
        "q": "Can penalties be avoided?",
        "a": "Yes, with proper compliance.",
        "points": []
      },
      {
        "number": 112,
        "q": "Is director liability checked?",
        "a": "Yes, including disqualification.",
        "points": []
      },
      {
        "number": 113,
        "q": "What are contingent liabilities?",
        "a": "Potential future obligations.",
        "points": []
      },
      {
        "number": 114,
        "q": "Can regulatory action arise?",
        "a": "Yes, if violations exist.",
        "points": []
      },
      {
        "number": 115,
        "q": "Is risk classification important?",
        "a": "Yes, for decision-making.",
        "points": []
      },
      {
        "number": 116,
        "q": "Can due diligence identify tax risks?",
        "a": "Yes, indirectly.",
        "points": []
      },
      {
        "number": 117,
        "q": "What if documents are missing?",
        "a": "It creates high-risk flags.",
        "points": []
      },
      {
        "number": 118,
        "q": "Can non-compliance reduce valuation?",
        "a": "Yes, significantly.",
        "points": []
      },
      {
        "number": 119,
        "q": "Are penalties negotiable?",
        "a": "No, but can be mitigated.",
        "points": []
      },
      {
        "number": 120,
        "q": "Is legal exposure disclosed?",
        "a": "Yes, as per regulatory expectations.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 9: Practical Scenarios",
    "items": [
      {
        "number": 121,
        "q": "Can I operate without due diligence?",
        "a": "Yes, but it is highly risky.",
        "points": []
      },
      {
        "number": 122,
        "q": "What happens if investor asks suddenly?",
        "a": "Immediate due diligence may be required.",
        "points": []
      },
      {
        "number": 123,
        "q": "Can I fix issues before due diligence?",
        "a": "Yes, through compliance cleanup.",
        "points": []
      },
      {
        "number": 124,
        "q": "Can due diligence be done after funding?",
        "a": "Usually done before.",
        "points": []
      },
      {
        "number": 125,
        "q": "What if agreements are not signed?",
        "a": "It creates legal risk.",
        "points": []
      },
      {
        "number": 126,
        "q": "Can verbal agreements be valid?",
        "a": "Not reliable legally.",
        "points": []
      },
      {
        "number": 127,
        "q": "Can I hide information?",
        "a": "No, disclosure is mandatory.",
        "points": []
      },
      {
        "number": 128,
        "q": "What if litigation is ongoing?",
        "a": "It must be disclosed.",
        "points": []
      },
      {
        "number": 129,
        "q": "Can due diligence delay funding?",
        "a": "Yes, if issues arise.",
        "points": []
      },
      {
        "number": 130,
        "q": "What if IP is not registered?",
        "a": "Ownership risk arises.",
        "points": []
      },
      {
        "number": 131,
        "q": "Can I proceed with risk?",
        "a": "Yes, but with caution.",
        "points": []
      },
      {
        "number": 132,
        "q": "What if documents are outdated?",
        "a": "They must be updated.",
        "points": []
      },
      {
        "number": 133,
        "q": "Can due diligence be partial?",
        "a": "Yes, based on scope.",
        "points": []
      },
      {
        "number": 134,
        "q": "What if shareholding is unclear?",
        "a": "It becomes a major red flag.",
        "points": []
      },
      {
        "number": 135,
        "q": "Can due diligence improve credibility?",
        "a": "Yes, significantly.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 10: Advanced / Expert-Level",
    "items": [
      {
        "number": 136,
        "q": "How does due diligence affect indemnity clauses?",
        "a": "Risks identified lead to indemnity protections.",
        "points": []
      },
      {
        "number": 137,
        "q": "What is escrow in transactions?",
        "a": "Funds held to mitigate risks.",
        "points": []
      },
      {
        "number": 138,
        "q": "How does due diligence impact valuation?",
        "a": "Directly influences pricing.",
        "points": []
      },
      {
        "number": 139,
        "q": "Can due diligence influence deal structure?",
        "a": "Yes, significantly.",
        "points": []
      },
      {
        "number": 140,
        "q": "What is change-of-control clause?",
        "a": "Clause triggered on ownership change.",
        "points": []
      },
      {
        "number": 141,
        "q": "Can due diligence impact exit rights?",
        "a": "Yes, for investors.",
        "points": []
      },
      {
        "number": 142,
        "q": "What is representation & warranty?",
        "a": "Legal assurances in agreements.",
        "points": []
      },
      {
        "number": 143,
        "q": "Can due diligence be relied legally?",
        "a": "Yes, as a reference document.",
        "points": []
      },
      {
        "number": 144,
        "q": "What is limitation in due diligence?",
        "a": "Scope restriction.",
        "points": []
      },
      {
        "number": 145,
        "q": "Can due diligence identify governance issues?",
        "a": "Yes, clearly.",
        "points": []
      },
      {
        "number": 146,
        "q": "What is regulatory exposure?",
        "a": "Risk of penalties.",
        "points": []
      },
      {
        "number": 147,
        "q": "Can due diligence support IPO?",
        "a": "Yes, in preparation stage.",
        "points": []
      },
      {
        "number": 148,
        "q": "Is due diligence required for ESOPs?",
        "a": "Yes, for compliance.",
        "points": []
      },
      {
        "number": 149,
        "q": "Can due diligence identify structuring issues?",
        "a": "Yes, especially in funding.",
        "points": []
      },
      {
        "number": 150,
        "q": "What is the ultimate benefit of due diligence?",
        "a": "Risk-free, informed decision-making.",
        "points": []
      }
    ]
  }
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id} className="visible">{title}</h2>{children}</section>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto my-6 rounded-lg border border-blue-100"><table className="data-table my-0 min-w-[640px]"><thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Timeline({ steps }: { steps: string[] }) {
  return <div className="step-timeline">{steps.map((step, index) => <div className="step-item" key={step}><div className="step-dot" /><div className="step-card"><div className="step-label">Step {index + 1}</div><p>{step}</p></div></div>)}</div>;
}

function CheckList({ items }: { items: string[] }) {
  return <ul className="clean-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{"emoji": "", "label": "Compliance"}, {"emoji": "", "label": "Transactions"}]}
      breadcrumb={[{"label": "Home", "href": "/"}, {"label": "Regulatory", "href": "/regulatory"}, {"label": "Compliance", "href": "/regulatory/compliance"}, {"label": "Legal Due Diligence Services in India"}]}
      title={"Legal Due Diligence Services in India"}
      readTime={"35 min read"}
      focusKeyword={"Legal Due Diligence Services in India"}
      ctaTitle={"Discuss Your Compliance Requirements"}
      ctaDescription={"Speak to the Estabizz team about transaction scope, data room readiness and due diligence reporting."}
      quickFacts={[{"label": "Framework", "value": "Companies Act, 2013"}, {"label": "Typical timeline", "value": "2–4 weeks"}, {"label": "Conducted by", "value": "CS, lawyer or CA"}, {"label": "FAQs", "value": "150"}]}
      relatedArticles={[{"title": "Legal Process Outsourcing Services in India", "href": "/services/legal-process-outsourcing", "category": "Compliance", "description": "Outsourced legal drafting, research, document review and compliance support for law firms and corporates."}, {"title": "Compliance Under FEMA", "href": "/fema/compliance-under-fema", "category": "Compliance", "description": "Cross-border transactions, foreign investment reporting and ongoing FEMA compliance obligations."}, {"title": "NBFC Registration in India", "href": "/rbi/nbfc-registration-in-india", "category": "RBI", "description": "RBI licensing, capital requirements and compliance for non-banking financial companies."}]}
      finalCtaTitle={"Speak to Our Compliance Team"}
      finalCtaDescription={"Discuss your transaction, data room readiness and due diligence reporting requirements with Estabizz."}
      hideReviewBadge
      sections={sections}
      heroDescription={<p>{"Legal Due Diligence Services in India explained with process, documents, risks, and compliance checks to ensure secure and informed business decisions."}</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Discuss Compliance</Link><a href="https://wa.me/919825600907" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="introduction" title={"Introduction"}>
        <p>{"Legal Due Diligence Services in India play a critical role in evaluating the legal health, compliance status, and risk exposure of a business before any investment, acquisition, or strategic transaction. From a regulatory and governance perspective, due diligence ensures that decisions are taken with full visibility of legal obligations, liabilities, and potential risks."}</p>
      </Section>

      <Section id="what-is" title={"What is Legal Due Diligence?"}>
        <p><strong>{"In simple terms…"}</strong>{" Legal Due Diligence is a detailed legal audit of a business."}</p>
        <p><strong>{"From a compliance standpoint…"}</strong>{" it involves reviewing:"}</p>
        <ul><li>{"Corporate records"}</li><li>{"Regulatory filings"}</li><li>{"Contracts and agreements"}</li><li>{"Litigation history"}</li><li>{"Intellectual property rights"}</li></ul>
        <p><strong>{"Legally speaking…"}</strong>{" it helps identify hidden liabilities and ensures that the entity complies with applicable laws and regulations."}</p>
      </Section>

      <Section id="regulatory-framework" title={"Regulatory Framework"}>
        <p>{"Legal Due Diligence in India is not governed by a single law but derives its importance from multiple regulatory frameworks:"}</p>
        <DataTable headers={["Framework", "Relevance to Legal Due Diligence"]} rows={[["Companies Act, 2013", "Corporate records, filings and statutory registers"], ["SEBI Regulations", "Listed entities and registered intermediaries"], ["RBI Guidelines", "NBFCs and financial transactions"], ["FEMA Regulations", "Cross-border investments"], ["Indian Contract Act, 1872", "Validity and enforceability of agreements"], ["Insolvency and Bankruptcy Code", "Distress, insolvency and creditor exposure"], ["Digital Personal Data Protection Act, 2023", "Personal data held by the target and shared through the data room"]]} />
        <p>{"As per applicable regulatory provisions, due diligence is considered a key governance and risk management practice, especially in investment and acquisition scenarios."}</p>
      </Section>

      <Section id="who-needs" title={"Who Needs Legal Due Diligence Services in India"}>
        <p>{"Legal Due Diligence is essential for:"}</p>
        <CheckList items={["Investors (private equity and venture capital)", "Companies planning mergers or acquisitions", "NBFCs and financial institutions", "Startups raising funding", "Buyers of business assets or shares", "Foreign investors entering India"]} />
        <p>{"In line with regulatory expectations, financial stakeholders rely heavily on due diligence before committing capital."}</p>
      </Section>

      <Section id="eligibility" title={"Eligibility for Conducting Legal Due Diligence"}>
        <DataTable headers={["Particulars", "Requirement"]} rows={[["Professional Qualification", "Company Secretary, lawyer or Chartered Accountant"], ["Expertise", "Knowledge of corporate, regulatory and contractual laws"], ["Experience", "Practical exposure to transactions and compliance"], ["Documentation Access", "Full access to company records"]]} />
      </Section>

      <Section id="documents" title={"Documents Required for Legal Due Diligence"}>
        <DataTable headers={["Category", "Documents"]} rows={[["Corporate", "MOA, AOA, Certificate of Incorporation"], ["Financial", "Financial statements, audit reports"], ["Compliance", "ROC filings, statutory registers"], ["Contracts", "Shareholder agreements, vendor contracts"], ["Litigation", "Ongoing and past legal cases"], ["Intellectual Property", "Trademarks, copyrights, patents"]]} />
      </Section>

      <Section id="process" title={"Step-by-Step Legal Due Diligence Process"}>
        <Timeline steps={["Understanding transaction scope", "Collection of documents and data room access", "Review of corporate and regulatory records", "Contractual and financial risk analysis", "Identification of red flags", "Preparation of the Due Diligence Report"]} />
      </Section>

      <Section id="fees" title={"Fees for Legal Due Diligence Services in India"}>
        <DataTable headers={["Type of Transaction", "Estimated Fees"]} rows={[["Startup due diligence", "₹50,000 – ₹2,00,000"], ["SME transaction", "₹2,00,000 – ₹5,00,000"], ["Large transactions", "₹5,00,000 onwards"]]} />
        <p>{"Fees vary depending on scope, complexity, and size of the business, and the figures above are indicative only."}</p>
      </Section>

      <Section id="timeline" title={"Timeline for Legal Due Diligence"}>
        <DataTable headers={["Stage", "Timeline"]} rows={[["Document collection", "3–7 days"], ["Review process", "7–20 days"], ["Final report", "3–5 days"]]} />
      </Section>

      <Section id="post-diligence-compliance" title={"Post-Due Diligence Compliance"}>
        <p>{"After completion, businesses may need to:"}</p>
        <CheckList items={["Rectify non-compliances", "Update statutory records", "Renegotiate contracts", "Address litigation risks", "Align with regulatory requirements"]} />
        <p>{"According to governing regulations, timely rectification ensures smoother transaction closure."}</p>
      </Section>

      <Section id="common-mistakes" title={"Common Mistakes in Legal Due Diligence"}>
        <ul><li>{"Incomplete document sharing"}</li><li>{"Ignoring historical non-compliance"}</li><li>{"Overlooking contingent liabilities"}</li><li>{"Not verifying contracts properly"}</li><li>{"Assuming verbal agreements are valid"}</li></ul>
      </Section>

      <Section id="key-takeaways" title={"Key Takeaways on Legal Due Diligence Services in India"}>
        <CheckList items={["It is a risk-identification tool, not just a formality", "It helps in valuation and negotiation", "It protects investors from hidden liabilities", "It is essential for regulatory confidence", "It strengthens the governance framework", "It identifies risks before financial commitment", "It strengthens the negotiating position"]} />
      </Section>

      <Section id="why-professional-support" title={"Why Professional Support Matters"}>
        <p>{"Legal Due Diligence requires interpretation of laws, risk assessment, documentation review and regulatory alignment. A professional ensures:"}</p>
        <CheckList items={["No compliance gaps", "Accurate risk reporting", "Transaction readiness"]} />
      </Section>

      <Section id="advanced-scope" title={"Advanced Scope of Legal Due Diligence Services in India"}>
        <p>{"From a compliance perspective, Legal Due Diligence extends far beyond basic document verification. It is a layered exercise covering multiple legal dimensions."}</p>
        <h3>{"1. Corporate Due Diligence"}</h3>
        <ul><li>{"Verification of incorporation records"}</li><li>{"Review of shareholding pattern and capital structure"}</li><li>{"Analysis of board composition and governance practices"}</li><li>{"Checking compliance with the Companies Act, 2013"}</li></ul>
        <h3>{"2. Regulatory and Statutory Due Diligence"}</h3>
        <ul><li>{"ROC filings and annual compliance"}</li><li>{"FEMA compliance in case of foreign investment"}</li><li>{"RBI, SEBI, IRDAI and IFSCA applicability for regulated entities"}</li><li>{"Industry-specific licensing compliance"}</li></ul>
        <p>{"As per applicable regulatory guidelines, non-compliance in this area can directly impact transaction viability."}</p>
        <h3>{"3. Contractual Due Diligence"}</h3>
        <ul><li>{"Review of shareholders’ agreements, vendor agreements and employment contracts"}</li><li>{"Identification of restrictive clauses"}</li><li>{"Change-of-control implications"}</li></ul>
        <h3>{"4. Litigation Due Diligence"}</h3>
        <ul><li>{"Ongoing litigation"}</li><li>{"Past disputes"}</li><li>{"Regulatory notices"}</li><li>{"Contingent liabilities"}</li></ul>
        <h3>{"5. Intellectual Property Due Diligence"}</h3>
        <ul><li>{"Trademark ownership"}</li><li>{"Copyright and patents"}</li><li>{"Licensing agreements"}</li><li>{"IP infringement risks"}</li></ul>
        <h3>{"6. Financial-Linked Legal Review"}</h3>
        <ul><li>{"Debt obligations"}</li><li>{"Charge filings with the ROC"}</li><li>{"Security interests"}</li><li>{"Loan agreements"}</li></ul>
      </Section>

      <Section id="types" title={"Types of Legal Due Diligence in India"}>
        <DataTable headers={["Type", "Purpose"]} rows={[["Transactional Due Diligence", "For mergers, acquisitions and investments"], ["Vendor Due Diligence", "Conducted by the seller before a deal"], ["Investor Due Diligence", "Conducted by investors"], ["Compliance Due Diligence", "Internal audit of legal compliance"], ["Asset Due Diligence", "For asset purchase transactions"]]} />
      </Section>

      <Section id="risk-areas" title={"Key Risk Areas and Red Flags"}>
        <p>{"Legally, the following risks are commonly uncovered:"}</p>
        <ul><li>{"Undisclosed liabilities"}</li><li>{"Non-compliance with statutory filings"}</li><li>{"Improper share allotments"}</li><li>{"Invalid contracts"}</li><li>{"Pending litigations"}</li><li>{"Regulatory penalties"}</li></ul>
        <h3>{"Practical Compliance Risks (Real-World Insight)"}</h3>
        <p>{"In actual transactions, some frequently observed risks include:"}</p>
        <ul><li>{"Backdated filings not regularised with the ROC"}</li><li>{"Improper valuation during share issuance"}</li><li>{"Non-compliance with FEMA in foreign investments"}</li><li>{"Missing board or shareholder approvals"}</li><li>{"Unregistered agreements or oral arrangements"}</li></ul>
        <p>{"These risks often become deal-breakers or negotiation points."}</p>
        <h3>{"Red Flags That Investors Look For"}</h3>
        <ul><li>{"Multiple non-compliances in MCA filings"}</li><li>{"Director disqualification issues"}</li><li>{"Unresolved tax or regulatory notices"}</li><li>{"Weak corporate governance"}</li><li>{"Inconsistent financial disclosures"}</li></ul>
      </Section>

      <Section id="report" title={"The Legal Due Diligence Report"}>
        <p>{"A professional Legal Due Diligence Report typically includes:"}</p>
        <ul><li>{"Executive summary"}</li><li>{"Scope of review"}</li><li>{"Key observations"}</li><li>{"Identified risks"}</li><li>{"Compliance gaps"}</li><li>{"Recommendations"}</li><li>{"Risk classification (high, medium or low)"}</li></ul>
        <h3>{"Sample Report Structure (Professional Standard)"}</h3>
        <ul><li>{"Executive Summary"}</li><li>{"Scope and Limitations"}</li><li>{"Corporate Overview"}</li><li>{"Key Findings"}</li><li>{"Risk Matrix"}</li><li>{"Compliance Gaps"}</li><li>{"Recommendations"}</li><li>{"Annexures"}</li></ul>
      </Section>

      <Section id="business-impact" title={"Why It Matters for Investors and Businesses"}>
        <h3>{"Why Legal Due Diligence Is Critical for Investors"}</h3>
        <CheckList items={["Ensures transparency", "Reduces post-transaction disputes", "Strengthens legal protection", "Supports valuation accuracy", "Builds confidence in business decisions"]} />
        <h3>{"Strategic Advantage for Businesses"}</h3>
        <p>{"Businesses that undergo proper due diligence:"}</p>
        <ul><li>{"Attract better investors"}</li><li>{"Close deals faster"}</li><li>{"Avoid legal complications"}</li><li>{"Improve compliance culture"}</li></ul>
        <h3>{"How It Adds Business Value"}</h3>
        <ul><li>{"Enhances credibility"}</li><li>{"Builds investor trust"}</li><li>{"Reduces future disputes"}</li><li>{"Improves governance standards"}</li><li>{"Enables faster deal closure"}</li></ul>
      </Section>

      <Section id="transaction-specific" title={"Transaction-Specific Legal Due Diligence"}>
        <p>{"From a transaction standpoint, Legal Due Diligence Services in India vary depending on the nature of the deal."}</p>
        <h3>{"1. Mergers and Acquisitions"}</h3>
        <ul><li>{"Shareholding and control structure"}</li><li>{"Past corporate actions and approvals"}</li><li>{"Pending litigations impacting valuation"}</li><li>{"Contractual obligations and termination risks"}</li></ul>
        <p>{"In line with regulatory expectations, any defect in title or compliance may directly affect deal structuring."}</p>
        <h3>{"2. Private Equity and Venture Capital"}</h3>
        <ul><li>{"Cap table verification"}</li><li>{"ESOP structure validation"}</li><li>{"Investor rights and dilution clauses"}</li><li>{"FEMA compliance for foreign investors"}</li></ul>
        <h3>{"3. NBFC and Financial Entity"}</h3>
        <ul><li>{"RBI compliance status"}</li><li>{"Capital adequacy"}</li><li>{"Lending practices and documentation"}</li><li>{"KYC and AML compliance"}</li></ul>
        <h3>{"4. Startup Due Diligence"}</h3>
        <ul><li>{"Founder agreements"}</li><li>{"IP ownership, which is critical"}</li><li>{"Compliance with Startup India and DPIIT norms"}</li><li>{"Data protection and user policies"}</li></ul>
        <h3>{"5. Cross-Border Due Diligence"}</h3>
        <ul><li>{"FEMA and FDI compliance"}</li><li>{"Overseas investment and inbound investment structure"}</li><li>{"Tax treaty implications"}</li><li>{"Global contractual enforceability"}</li></ul>
      </Section>

      <Section id="checklists" title={"Working Checklists"}>
        <p>{"Below is a real-world working checklist used during Legal Due Diligence Services in India."}</p>
        <h3>{"Corporate and Secretarial"}</h3>
        <ul><li>{"Certificate of Incorporation"}</li><li>{"MOA and AOA"}</li><li>{"Board minutes and resolutions"}</li><li>{"Shareholding records"}</li></ul>
        <h3>{"Regulatory Compliance"}</h3>
        <ul><li>{"ROC filings"}</li><li>{"Licences and approvals"}</li><li>{"Industry-specific permissions"}</li></ul>
        <h3>{"Contracts and Agreements"}</h3>
        <ul><li>{"Shareholder agreements"}</li><li>{"Vendor contracts"}</li><li>{"Lease agreements"}</li><li>{"Employment contracts"}</li></ul>
        <h3>{"Financial and Charges"}</h3>
        <ul><li>{"Loan agreements"}</li><li>{"Charge registration (CHG-1)"}</li><li>{"Bank statements"}</li></ul>
        <h3>{"Litigation"}</h3>
        <ul><li>{"Civil and criminal cases"}</li><li>{"Regulatory notices"}</li><li>{"Arbitration matters"}</li></ul>
        <h3>{"Intellectual Property"}</h3>
        <ul><li>{"Trademark registration"}</li><li>{"Patent filings"}</li><li>{"Licensing agreements"}</li></ul>
        <h3>{"Pre-Due Diligence Preparation for Companies"}</h3>
        <p>{"From a compliance readiness perspective, companies should prepare:"}</p>
        <ul><li>{"Updated statutory registers"}</li><li>{"Clean ROC filing status"}</li><li>{"Proper documentation of contracts"}</li><li>{"Clear shareholding structure"}</li><li>{"Digitised records for data room readiness"}</li></ul>
        <h3>{"Checklist Before Investor Due Diligence"}</h3>
        <CheckList items={["All ROC filings updated", "Share certificates issued properly", "Agreements signed and stamped", "Statutory registers maintained", "Litigation disclosures ready"]} />
      </Section>

      <Section id="deal-impact" title={"Impact on Deal Structuring, Negotiation and Valuation"}>
        <p>{"Legal Due Diligence Services in India directly influence:"}</p>
        <ul><li>{"Valuation adjustments"}</li><li>{"Indemnity clauses"}</li><li>{"Escrow arrangements"}</li><li>{"Conditions precedent"}</li><li>{"Deal closure timelines"}</li></ul>
        <h3>{"How It Supports Negotiation"}</h3>
        <ul><li>{"Identifies leverage points"}</li><li>{"Highlights compliance gaps"}</li><li>{"Helps in price renegotiation"}</li><li>{"Strengthens the investor position"}</li></ul>
        <h3>{"How It Impacts Business Valuation"}</h3>
        <p>{"Legally, valuation is not just financial — it is also compliance-driven."}</p>
        <p><strong>{"Positive impact:"}</strong></p>
        <ul><li>{"Clean compliance leads to higher valuation"}</li><li>{"Proper documentation leads to a faster deal"}</li><li>{"No litigation builds investor confidence"}</li></ul>
        <p><strong>{"Negative impact:"}</strong></p>
        <ul><li>{"Non-compliance leads to a valuation discount"}</li><li>{"Litigation reduces the risk premium"}</li><li>{"Missing approvals force deal restructuring"}</li></ul>
      </Section>

      <Section id="regulatory-expectations" title={"Regulatory Expectations During Due Diligence"}>
        <p>{"According to governing regulations, authorities expect:"}</p>
        <ul><li>{"Full disclosure of material facts"}</li><li>{"Accurate statutory filings"}</li><li>{"Transparent ownership structure"}</li><li>{"Compliance with sectoral laws"}</li></ul>
        <p>{"Failure to meet these may lead to transaction delays, regulatory penalties or investment rejection."}</p>
      </Section>

      <Section id="advanced-compliance-insights" title={"Advanced Compliance Insights"}>
        <h3>{"1. MCA Non-Compliance Risks"}</h3>
        <ul><li>{"Late filings leading to penalties"}</li><li>{"Director disqualification under Section 164"}</li></ul>
        <h3>{"2. FEMA Violations"}</h3>
        <ul><li>{"Improper share issuance to foreign investors"}</li><li>{"Non-reporting of FDI, including FC-GPR delays"}</li></ul>
        <h3>{"3. SEBI-Linked Risks"}</h3>
        <ul><li>{"Non-disclosure of material events"}</li><li>{"Improper investor agreements"}</li></ul>
        <h3>{"4. RBI Risks for NBFCs and Fintechs"}</h3>
        <ul><li>{"Non-compliance with lending norms"}</li><li>{"KYC and AML gaps"}</li></ul>
      </Section>

      <Section id="deal-breakers" title={"When Legal Due Diligence Becomes a Deal Breaker"}>
        <p>{"Certain situations where transactions may fail:"}</p>
        <ul><li>{"Major litigation exposure"}</li><li>{"Fraud indicators"}</li><li>{"Invalid ownership of assets or IP"}</li><li>{"Regulatory non-compliance"}</li><li>{"Disputed shareholding"}</li></ul>
      </Section>

      <Section id="when-to-opt" title={"When Should You Opt for Legal Due Diligence?"}>
        <p>{"From a practical business standpoint, you should initiate Legal Due Diligence when:"}</p>
        <CheckList items={["You are raising funding (seed, Series A, PE or VC)", "You are planning a merger or acquisition", "You are onboarding a strategic investor or partner", "You are buying or selling business assets or shares", "You are restructuring your company", "You are entering into cross-border transactions"]} />
        <h3>{"Early Warning Signs That You Need Legal Due Diligence"}</h3>
        <ul><li>{"Unclear shareholding structure"}</li><li>{"Missing agreements or unsigned contracts"}</li><li>{"Delays in ROC filings"}</li><li>{"Verbal arrangements instead of written contracts"}</li><li>{"An investor asking for documentation suddenly"}</li></ul>
      </Section>

      <Section id="integration" title={"Integration with Other Due Diligence Types"}>
        <p>{"Legal Due Diligence Services in India are usually conducted alongside:"}</p>
        <DataTable headers={["Type", "Focus"]} rows={[["Financial Due Diligence", "Financial health"], ["Tax Due Diligence", "Tax exposure"], ["Commercial Due Diligence", "Business model"], ["Technical Due Diligence", "Technology risks"]]} />
      </Section>

      <Section id="vs-legal-audit" title={"Legal Due Diligence vs Legal Audit"}>
        <DataTable headers={["Basis", "Legal Due Diligence", "Legal Audit"]} rows={[["Purpose", "Transaction-specific", "Internal compliance review"], ["Timing", "Before investment", "Periodic"], ["Scope", "Risk identification", "Compliance verification"], ["Outcome", "Due diligence report", "Audit report"]]} />
      </Section>

      <Section id="industry-application" title={"Industry-Specific Application"}>
        <h3>{"Fintech and NBFCs"}</h3>
        <ul><li>{"RBI compliance"}</li><li>{"Digital lending guidelines"}</li><li>{"Data protection checks"}</li></ul>
        <h3>{"Insurance Sector"}</h3>
        <ul><li>{"IRDAI compliance"}</li><li>{"Policy documentation"}</li><li>{"Licensing status"}</li></ul>
        <h3>{"Capital Markets"}</h3>
        <ul><li>{"Intermediary registration"}</li><li>{"Investor agreements"}</li><li>{"Disclosure compliance"}</li></ul>
        <h3>{"IFSC Entities"}</h3>
        <ul><li>{"Regulatory approvals"}</li><li>{"Cross-border structuring"}</li><li>{"Sandbox participation"}</li></ul>
      </Section>

      <Section id="startup-ecosystem" title={"Legal Due Diligence in the Startup Ecosystem"}>
        <p>{"From a startup perspective, this is where maximum issues arise."}</p>
        <h3>{"Key Areas"}</h3>
        <ul><li>{"Founder equity split"}</li><li>{"ESOP pool structuring"}</li><li>{"IP ownership, which is often ignored"}</li><li>{"Convertible instruments such as CCPS and CCD"}</li><li>{"SAFE and shareholders’ agreements"}</li></ul>
        <h3>{"Common Startup Mistakes"}</h3>
        <ul><li>{"No proper founder agreement"}</li><li>{"IP registered in a founder’s name rather than the company’s"}</li><li>{"Informal funding without documentation"}</li><li>{"Improper valuation compliance"}</li></ul>
      </Section>

      <Section id="risk-classification" title={"Legal Risk Classification Model"}>
        <DataTable headers={["Risk Level", "Meaning"]} rows={[["High risk", "Deal impact or regulatory violation"], ["Medium risk", "Needs rectification"], ["Low risk", "Minor observation"]]} />
      </Section>

      <Section id="how-investors-use" title={"How Investors Use Legal Due Diligence Reports"}>
        <ul><li>{"To decide whether to invest"}</li><li>{"To negotiate valuation adjustments"}</li><li>{"To draft investment agreements"}</li><li>{"To insert indemnity clauses"}</li><li>{"To structure exit rights"}</li></ul>
      </Section>

      <Section id="client-perspective" title={"What You Get"}>
        <h3>{"If You Are an Investor"}</h3>
        <CheckList items={["Risk clarity", "Legal protection", "Better negotiation power"]} />
        <h3>{"If You Are a Business Owner"}</h3>
        <CheckList items={["Improved valuation", "Faster deal execution", "Strong compliance positioning"]} />
      </Section>

      <Section id="estabizz-approach" title={"Why the Estabizz Approach Is Different"}>
        <p>{"At Estabizz, Legal Due Diligence Services in India are handled with:"}</p>
        <CheckList items={["A regulatory-first approach", "Multi-regulator expertise across RBI, SEBI, IRDAI and IFSCA", "A structured documentation review system", "Client-focused advisory insights"]} />
        <p>{"We assist with end-to-end legal due diligence, regulatory compliance review, risk identification and reporting, and transaction advisory. "}<Link href="/contact">{"Speak to our compliance expert"}</Link>{" for a customised due diligence plan."}</p>
      </Section>

      <Section id="expert-insight" title={"Expert Insight"}>
        <p>{"“Legal Due Diligence is not merely a verification exercise — it is a governance checkpoint that determines whether a transaction stands on a strong legal foundation or hidden vulnerabilities.”"}<br />{"— "}<strong>{"CS Devyani Khambhati, Compliance Expert"}</strong></p>
      </Section>

      <Section id="final-takeaway" title={"Final Takeaway"}>
        <p>{"Legal Due Diligence Services in India are indispensable for any business decision involving investment, acquisition, or strategic collaboration. It provides clarity, reduces risk, and ensures that stakeholders move forward with confidence and regulatory compliance."}</p>
      </Section>

      <Section id="faqs" title="Frequently Asked Questions">
        {faqGroups.map((group, groupIndex) => (
          <div key={group.title} className="mb-8">
            <h3 id={`faq-group-${groupIndex + 1}`}>{group.title}</h3>
            <div className="faq-accordion">
              {group.items.map((faq) => (
                <details className="faq-item" key={faq.number} id={`faq-${faq.number}`}>
                  <summary>{faq.number}. {faq.q}</summary>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                    {faq.points.length > 0 && <ul>{faq.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <Section id="disclaimer" title="Disclaimer">
        <p>This guide is general information, not transaction-specific legal advice. Requirements depend on the applicable regulations, current circulars and the facts of each case, and parts of this guide are still undergoing professional review. Confirm the current position with the relevant authority and your professional adviser before acting or relying on any figure, deadline or threshold stated here.</p>
      </Section>
    </ServicePageLayout>
  );
}
