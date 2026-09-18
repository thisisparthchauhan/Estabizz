'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

const sections = [{"id": "introduction", "title": "Introduction"}, {"id": "what-is-fema-compliance-in-india", "title": "What is FEMA Compliance in India?"}, {"id": "regulatory-framework", "title": "Regulatory Framework"}, {"id": "who-needs-fema-compliance", "title": "Who Needs FEMA Compliance?"}, {"id": "eligibility-criteria", "title": "Eligibility Criteria"}, {"id": "documents-required", "title": "Documents Required"}, {"id": "step-by-step-fema-compliance-process", "title": "Step-by-Step FEMA Compliance Process"}, {"id": "fees-structure", "title": "Fees Structure"}, {"id": "timeline", "title": "Timeline"}, {"id": "post-registration-compliance", "title": "Post-Registration Compliance"}, {"id": "practical-compliance-risks", "title": "Practical Compliance Risks"}, {"id": "why-professional-support-matters", "title": "Why Professional Support Matters"}, {"id": "advanced-fema-compliance-risks-regulatory-red-flags", "title": "Advanced FEMA Compliance Risks & Regulatory Red Flags"}, {"id": "fema-compliance-checklist-practical-view", "title": "FEMA Compliance Checklist (Practical View)"}, {"id": "practical-interpretation-of-fema-real-world-view", "title": "Practical Interpretation of FEMA (Real-World View)"}, {"id": "common-fema-mistakes-made-by-founders-cfos", "title": "Common FEMA Mistakes Made by Founders & CFOs"}, {"id": "why-fema-compliance-is-strategically-important", "title": "Why FEMA Compliance is Strategically Important"}, {"id": "fema-forms-explained-practical-understanding", "title": "FEMA Forms Explained (Practical Understanding)"}, {"id": "fema-lifecycle-end-to-end-transaction-flow", "title": "FEMA Lifecycle – End-to-End Transaction Flow"}, {"id": "fema-compliance-for-startups-funded-companies", "title": "FEMA Compliance for Startups & Funded Companies"}, {"id": "fema-vs-fera-practical-distinction", "title": "FEMA vs FERA – Practical Distinction"}, {"id": "compounding-of-fema-offences", "title": "Compounding of FEMA Offences"}, {"id": "fema-penalties-detailed-understanding", "title": "FEMA Penalties – Detailed Understanding"}, {"id": "fema-compliance-impact-on-fundraising-due-diligence", "title": "FEMA Compliance Impact on Fundraising & Due Diligence"}, {"id": "fema-compliance-for-nris-special-section", "title": "FEMA Compliance for NRIs (Special Section)"}, {"id": "advanced-compliance-insight-expert-level-understanding", "title": "Advanced Compliance Insight (Expert-Level Understanding)"}, {"id": "fema-due-diligence-checklist-investor-view", "title": "FEMA Due Diligence Checklist (Investor View)"}, {"id": "fema-compliance-risk-mitigation-strategy", "title": "FEMA Compliance Risk Mitigation Strategy"}, {"id": "conversion-section-client-oriented", "title": "Conversion Section (Client-Oriented)"}, {"id": "expert-insight", "title": "Expert Insight"}, {"id": "faqs", "title": "Frequently Asked Questions"}, {"id": "disclaimer", "title": "Disclaimer"}];

const faqGroups = [
  {
    "title": "Section 1: Basic Understanding",
    "items": [
      {
        "number": 1,
        "q": "What is FEMA compliance in India?",
        "a": "FEMA compliance refers to adherence to foreign exchange regulations. It includes:",
        "points": [
          "Cross-border transactions",
          "Foreign investments",
          "Reporting to RBI"
        ]
      },
      {
        "number": 2,
        "q": "What is FEMA and why is it important?",
        "a": "FEMA is a law regulating foreign exchange transactions. It ensures:",
        "points": [
          "External trade stability",
          "Proper foreign currency management"
        ]
      },
      {
        "number": 3,
        "q": "Who regulates FEMA compliance in India?",
        "a": "FEMA is regulated by the Reserve Bank of India (RBI). The Government of India also issues rules and notifications.",
        "points": []
      },
      {
        "number": 4,
        "q": "What types of transactions are covered under FEMA?",
        "a": "FEMA covers all cross-border transactions. Key areas include:",
        "points": [
          "Imports and exports",
          "Foreign investments",
          "Remittances"
        ]
      },
      {
        "number": 5,
        "q": "Is FEMA applicable to individuals or only companies?",
        "a": "FEMA applies to both individuals and entities. This includes residents, NRIs, companies, and LLPs.",
        "points": []
      },
      {
        "number": 6,
        "q": "What is the difference between FEMA and FERA?",
        "a": "FEMA is a management-based law, while FERA was restrictive. FEMA focuses on ease of business and compliance.",
        "points": []
      },
      {
        "number": 7,
        "q": "What is a current account transaction under FEMA?",
        "a": "It refers to routine transactions like payments for trade and services. These are generally permitted.",
        "points": []
      },
      {
        "number": 8,
        "q": "What is a capital account transaction under FEMA?",
        "a": "It involves changes in assets or liabilities across borders. Examples include investments and loans.",
        "points": []
      },
      {
        "number": 9,
        "q": "What is the objective of FEMA?",
        "a": "FEMA aims to facilitate external trade and maintain forex stability. It also ensures orderly foreign exchange markets.",
        "points": []
      },
      {
        "number": 10,
        "q": "What is an authorised dealer under FEMA?",
        "a": "An authorised dealer is a bank approved by RBI. It facilitates foreign exchange transactions.",
        "points": []
      },
      {
        "number": 11,
        "q": "What is meant by resident under FEMA?",
        "a": "A resident is a person staying in India for more than 182 days. Determination depends on intention and duration.",
        "points": []
      },
      {
        "number": 12,
        "q": "What is an NRI under FEMA?",
        "a": "A Non-Resident Indian is a citizen residing outside India. FEMA rules differ for NRIs.",
        "points": []
      },
      {
        "number": 13,
        "q": "What is ODI under FEMA?",
        "a": "ODI means Overseas Direct Investment. It allows Indian entities to invest abroad under RBI guidelines.",
        "points": []
      },
      {
        "number": 14,
        "q": "What is FDI under FEMA?",
        "a": "FDI refers to foreign investment into India. It is governed by sectoral caps and entry routes.",
        "points": []
      },
      {
        "number": 15,
        "q": "What is ECB under FEMA?",
        "a": "ECB stands for External Commercial Borrowing. It allows companies to borrow from foreign lenders.",
        "points": []
      },
      {
        "number": 16,
        "q": "Is FEMA applicable to startups?",
        "a": "Yes, startups receiving foreign investment must comply with FEMA. This includes reporting and pricing norms.",
        "points": []
      },
      {
        "number": 17,
        "q": "What is the role of RBI in FEMA compliance?",
        "a": "RBI issues directions, approvals, and monitors compliance. It also imposes penalties.",
        "points": []
      },
      {
        "number": 18,
        "q": "What is the difference between automatic and approval route?",
        "a": "Automatic route requires no prior approval, while approval route needs government consent.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 2: Eligibility & Applicability",
    "items": [
      {
        "number": 19,
        "q": "Who needs to comply with FEMA regulations?",
        "a": "Any person dealing in foreign exchange must comply. This includes:",
        "points": [
          "Individuals",
          "Companies",
          "NRIs"
        ]
      },
      {
        "number": 20,
        "q": "Is FEMA compliance mandatory for foreign investors?",
        "a": "Yes, foreign investors must comply with FEMA rules. Reporting and sectoral restrictions apply.",
        "points": []
      },
      {
        "number": 21,
        "q": "Can an Indian resident invest abroad?",
        "a": "Yes, under Liberalised Remittance Scheme (LRS). Limits and conditions apply.",
        "points": []
      },
      {
        "number": 22,
        "q": "Can NRIs invest in Indian companies?",
        "a": "Yes, NRIs can invest subject to FEMA guidelines. Sectoral caps may apply.",
        "points": []
      },
      {
        "number": 23,
        "q": "Is FEMA applicable to LLPs?",
        "a": "Yes, LLPs receiving foreign investment must comply. Conditions differ from companies.",
        "points": []
      },
      {
        "number": 24,
        "q": "Can foreign companies open offices in India?",
        "a": "Yes, through Liaison, Branch, or Project Office. RBI approval is required.",
        "points": []
      },
      {
        "number": 25,
        "q": "Is FEMA applicable to freelancers receiving foreign income?",
        "a": "Yes, foreign receipts must be routed through authorised channels. Proper documentation is required.",
        "points": []
      },
      {
        "number": 26,
        "q": "Can a startup raise foreign funding without FEMA compliance?",
        "a": "No, FEMA compliance is mandatory for foreign funding. Non-compliance leads to penalties.",
        "points": []
      },
      {
        "number": 27,
        "q": "Are NGOs covered under FEMA?",
        "a": "Yes, NGOs receiving foreign funds must comply with FEMA and FCRA.",
        "points": []
      },
      {
        "number": 28,
        "q": "Can Indian companies acquire foreign companies?",
        "a": "Yes, under ODI guidelines issued by RBI.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 3: Registration Process",
    "items": [
      {
        "number": 29,
        "q": "Is there a separate FEMA registration required?",
        "a": "No, FEMA does not require a separate license. Compliance is transaction-based.",
        "points": []
      },
      {
        "number": 30,
        "q": "What is the first step in FEMA compliance?",
        "a": "Identify the nature of transaction (FDI, ODI, ECB). Then follow applicable rules.",
        "points": []
      },
      {
        "number": 31,
        "q": "How is FDI reported under FEMA?",
        "a": "Through RBI FIRMS portal. Key forms include:",
        "points": [
          "FC-GPR",
          "FC-TRS"
        ]
      },
      {
        "number": 32,
        "q": "What is FC-GPR form?",
        "a": "It is used for reporting allotment of shares to foreign investors.",
        "points": []
      },
      {
        "number": 33,
        "q": "What is FC-TRS form?",
        "a": "It is used for transfer of shares between resident and non-resident.",
        "points": []
      },
      {
        "number": 34,
        "q": "Is RBI approval required for all FEMA transactions?",
        "a": "No, only for approval route transactions.",
        "points": []
      },
      {
        "number": 35,
        "q": "What is FIRMS portal?",
        "a": "It is RBI’s online reporting system for foreign investment.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 4: Documents & Requirements",
    "items": [
      {
        "number": 36,
        "q": "What documents are required for FEMA compliance?",
        "a": "Common documents include:",
        "points": [
          "KYC of investor",
          "Board resolution",
          "Valuation report"
        ]
      },
      {
        "number": 37,
        "q": "Is valuation mandatory under FEMA?",
        "a": "Yes, valuation is required for share issuance and transfer.",
        "points": []
      },
      {
        "number": 38,
        "q": "Who can issue valuation certificate?",
        "a": "A Chartered Accountant or SEBI-registered Merchant Banker.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 5: Fees & Cost",
    "items": [
      {
        "number": 39,
        "q": "What is the cost of FEMA compliance?",
        "a": "Costs vary based on transaction complexity. Professional fees may apply.",
        "points": []
      },
      {
        "number": 40,
        "q": "Are there government fees under FEMA?",
        "a": "Generally, no direct fees. However, penalties apply for non-compliance.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 6: Timeline & Approval",
    "items": [
      {
        "number": 41,
        "q": "What is the timeline for FC-GPR filing?",
        "a": "Within 30 days of allotment of shares.",
        "points": []
      },
      {
        "number": 42,
        "q": "What is the timeline for FC-TRS filing?",
        "a": "Within 60 days of transfer of shares.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 7: Compliance & Post-Registration",
    "items": [
      {
        "number": 43,
        "q": "What are post-investment FEMA compliances?",
        "a": "Key compliances include:",
        "points": [
          "Annual return on foreign liabilities (FLA)",
          "Reporting of changes"
        ]
      },
      {
        "number": 44,
        "q": "What is FLA return?",
        "a": "It is an annual return filed with RBI.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 8: Penalties & Risks",
    "items": [
      {
        "number": 45,
        "q": "What happens if FEMA compliance is not followed?",
        "a": "Penalties can be imposed under FEMA. This includes monetary fines.",
        "points": []
      },
      {
        "number": 46,
        "q": "Can FEMA violations be compounded?",
        "a": "Yes, RBI allows compounding of offences.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 9: Practical Scenarios",
    "items": [
      {
        "number": 47,
        "q": "Can shares be issued to foreign investors without valuation?",
        "a": "No, valuation is mandatory as per regulatory guidelines.",
        "points": []
      },
      {
        "number": 48,
        "q": "Can funds be received before company incorporation?",
        "a": "No, funds must be received post incorporation.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 10: Advanced / Expert-Level Questions",
    "items": [
      {
        "number": 49,
        "q": "What is downstream investment under FEMA?",
        "a": "Investment by an Indian entity having foreign investment into another Indian entity.",
        "points": []
      },
      {
        "number": 50,
        "q": "What are pricing guidelines under FEMA?",
        "a": "Shares must be issued at fair value. Undervaluation is not permitted.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 2: Eligibility & Applicability (Continued)",
    "items": [
      {
        "number": 51,
        "q": "Can a foreign national become a director in an Indian company under FEMA?",
        "a": "Yes, subject to sectoral conditions and visa norms. FEMA compliance applies for remuneration and shareholding.",
        "points": []
      },
      {
        "number": 52,
        "q": "Is FEMA applicable to partnership firms?",
        "a": "Yes, but foreign investment in partnership firms requires approval. Conditions are stricter compared to companies.",
        "points": []
      },
      {
        "number": 53,
        "q": "Can foreign investment be made in agriculture sector?",
        "a": "Generally, no under automatic route. Certain activities like horticulture are permitted.",
        "points": []
      },
      {
        "number": 54,
        "q": "Can Indian residents hold foreign bank accounts?",
        "a": "Yes, under LRS or permitted transactions. Compliance with RBI guidelines is mandatory.",
        "points": []
      },
      {
        "number": 55,
        "q": "Are ESOPs covered under FEMA?",
        "a": "Yes, ESOPs issued to non-residents must comply with FEMA. Reporting and pricing norms apply.",
        "points": []
      },
      {
        "number": 56,
        "q": "Can foreign investors invest in debt instruments?",
        "a": "Yes, subject to FEMA and RBI debt regulations. Limits and eligibility apply.",
        "points": []
      },
      {
        "number": 57,
        "q": "Is FEMA applicable to cryptocurrency transactions?",
        "a": "Currently, it depends on transaction nature. Cross-border crypto may attract FEMA scrutiny.",
        "points": []
      },
      {
        "number": 58,
        "q": "Can Indian companies receive foreign donations?",
        "a": "Yes, but subject to FEMA and FCRA compliance.",
        "points": []
      },
      {
        "number": 59,
        "q": "Are export proceeds governed under FEMA?",
        "a": "Yes, export proceeds must be realised within prescribed timelines.",
        "points": []
      },
      {
        "number": 60,
        "q": "Can NRIs purchase property in India?",
        "a": "Yes, except agricultural land, plantation property, and farmhouses.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 3: Registration Process (Continued)",
    "items": [
      {
        "number": 61,
        "q": "What is Entity Master Form under FEMA?",
        "a": "It is a mandatory registration for entities receiving foreign investment. Filed on FIRMS portal.",
        "points": []
      },
      {
        "number": 62,
        "q": "Is UBO disclosure required under FEMA?",
        "a": "Yes, ultimate beneficial ownership details must be disclosed.",
        "points": []
      },
      {
        "number": 63,
        "q": "Can FEMA reporting be done without AD Bank?",
        "a": "No, authorised dealer bank involvement is mandatory.",
        "points": []
      },
      {
        "number": 64,
        "q": "What is ARF filing under FEMA?",
        "a": "The Advance Reporting Form was discontinued with effect from 1 September 2018. Inward FDI remittance and share allotment are now reported together in Form FC-GPR under the Single Master Form on the RBI FIRMS portal, within 30 days of allotment.",
        "points": []
      },
      {
        "number": 65,
        "q": "What happens after foreign funds are received?",
        "a": "Shares must be allotted within 60 days of receipt of the consideration, and Form FC-GPR must then be filed within 30 days of allotment. If shares are not allotted in time, the funds must be refunded within 15 days.",
        "points": []
      },
      {
        "number": 66,
        "q": "Can delayed filings be regularised?",
        "a": "Yes, through Late Submission Fees (LSF).",
        "points": []
      },
      {
        "number": 67,
        "q": "What is LSF under FEMA?",
        "a": "It is a penalty for delayed filings. Calculated based on delay period.",
        "points": []
      },
      {
        "number": 68,
        "q": "Can FEMA filings be revised?",
        "a": "Yes, with RBI approval and proper justification.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 4: Documents & Requirements (Continued)",
    "items": [
      {
        "number": 69,
        "q": "Is KYC of foreign investor mandatory?",
        "a": "Yes, KYC from overseas bank is required.",
        "points": []
      },
      {
        "number": 70,
        "q": "Is FIRC required for FEMA compliance?",
        "a": "Yes, Foreign Inward Remittance Certificate is mandatory proof.",
        "points": []
      },
      {
        "number": 71,
        "q": "Is board approval required for FDI?",
        "a": "Yes, board resolution approving allotment is required.",
        "points": []
      },
      {
        "number": 72,
        "q": "Is shareholders’ approval required?",
        "a": "Yes, in case of preferential allotment or private placement.",
        "points": []
      },
      {
        "number": 73,
        "q": "Are share certificates required for FEMA filings?",
        "a": "Yes, proof of allotment is necessary.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 5: Fees & Cost (Continued)",
    "items": [
      {
        "number": 74,
        "q": "What is Late Submission Fee (LSF) amount?",
        "a": "It depends on delay and transaction value. RBI provides a calculation matrix.",
        "points": []
      },
      {
        "number": 75,
        "q": "Is compounding fee applicable under FEMA?",
        "a": "Yes, for violations, compounding fees are payable.",
        "points": []
      },
      {
        "number": 76,
        "q": "What is professional cost for FEMA advisory?",
        "a": "It varies based on transaction complexity. Typically ranges from Rs.25,000 onwards.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 6: Timeline & Approval (Continued)",
    "items": [
      {
        "number": 77,
        "q": "What is the timeline for reporting inward FDI?",
        "a": "Form FC-GPR is filed within 30 days of allotment of shares. The separate Advance Reporting Form stage no longer applies, having been subsumed into the Single Master Form in 2018.",
        "points": []
      },
      {
        "number": 78,
        "q": "What is time limit for share allotment?",
        "a": "Within 60 days from receipt of funds.",
        "points": []
      },
      {
        "number": 79,
        "q": "What happens if shares are not allotted within 60 days?",
        "a": "Funds must be refunded within 15 days.",
        "points": []
      },
      {
        "number": 80,
        "q": "How long does RBI approval take?",
        "a": "Typically 4–8 weeks, depending on case complexity.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 7: Compliance & Post-Registration (Continued)",
    "items": [
      {
        "number": 81,
        "q": "Is annual reporting mandatory under FEMA?",
        "a": "Yes, FLA return must be filed annually.",
        "points": []
      },
      {
        "number": 82,
        "q": "What is APR under FEMA?",
        "a": "Annual Performance Report for overseas investments.",
        "points": []
      },
      {
        "number": 83,
        "q": "Is ECB reporting required monthly?",
        "a": "Yes, ECB-2 return must be filed monthly.",
        "points": []
      },
      {
        "number": 84,
        "q": "What is downstream reporting timeline?",
        "a": "Within 30 days of investment.",
        "points": []
      },
      {
        "number": 85,
        "q": "Can FEMA compliance be outsourced?",
        "a": "Yes, professionals like CS/CA firms can handle it.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 8: Penalties & Risks (Continued)",
    "items": [
      {
        "number": 86,
        "q": "What is penalty for FEMA violation?",
        "a": "Under Section 13(1), up to three times the sum involved where that amount is quantifiable, or up to ₹2 lakh where it is not. Section 13(1A) adds up to ₹5,000 per day for a continuing contravention.",
        "points": []
      },
      {
        "number": 87,
        "q": "Can directors be held liable under FEMA?",
        "a": "Yes, responsible officers may face penalties.",
        "points": []
      },
      {
        "number": 88,
        "q": "What happens if FLA return is not filed?",
        "a": "Penalty and compliance notices from RBI may arise.",
        "points": []
      },
      {
        "number": 89,
        "q": "Can bank accounts be frozen for FEMA violations?",
        "a": "Yes, in serious cases. Enforcement actions may be taken.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 9: Practical Scenarios (Continued)",
    "items": [
      {
        "number": 90,
        "q": "Can startup issue shares at face value to foreign investor?",
        "a": "No, pricing guidelines must be followed.",
        "points": []
      },
      {
        "number": 91,
        "q": "Can foreign funds be used before reporting?",
        "a": "Yes, but reporting timelines must be strictly followed.",
        "points": []
      },
      {
        "number": 92,
        "q": "Can shares be transferred without FEMA filing?",
        "a": "No, FC-TRS filing is mandatory.",
        "points": []
      },
      {
        "number": 93,
        "q": "Can investment come in personal account?",
        "a": "No, it must come into company bank account.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 10: Advanced / Expert-Level Questions (Continued)",
    "items": [
      {
        "number": 94,
        "q": "What is round tripping under FEMA?",
        "a": "It refers to routing Indian funds abroad and reinvesting back. Generally restricted.",
        "points": []
      },
      {
        "number": 95,
        "q": "What is sectoral cap under FEMA?",
        "a": "Maximum foreign investment allowed in a sector.",
        "points": []
      },
      {
        "number": 96,
        "q": "Can convertible notes be issued to foreign investors?",
        "a": "Yes, by startups under FEMA guidelines.",
        "points": []
      },
      {
        "number": 97,
        "q": "What is swap transaction under FEMA?",
        "a": "Share exchange between Indian and foreign entities. Requires valuation.",
        "points": []
      },
      {
        "number": 98,
        "q": "What is ODI restructuring compliance?",
        "a": "Changes in overseas investment must be reported to RBI.",
        "points": []
      },
      {
        "number": 99,
        "q": "Can guarantees be issued to foreign entities?",
        "a": "Yes, under ODI rules with conditions.",
        "points": []
      },
      {
        "number": 100,
        "q": "What is compounding process under FEMA?",
        "a": "It is a settlement mechanism for violations. RBI reviews and imposes penalty.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 1: Basic Understanding (Additional Depth)",
    "items": [
      {
        "number": 101,
        "q": "What happens if a transaction is not classified correctly under FEMA?",
        "a": "Misclassification can lead to non-compliance and penalties. It may result in:",
        "points": [
          "Wrong reporting",
          "Regulatory scrutiny"
        ]
      },
      {
        "number": 102,
        "q": "Is FEMA applicable to digital services exports?",
        "a": "Yes, export of services is covered under FEMA. Export proceeds must be realised as per guidelines.",
        "points": []
      },
      {
        "number": 103,
        "q": "Can foreign currency be held in India?",
        "a": "Yes, but only under permitted limits and accounts. As per RBI guidelines, holding beyond limits is restricted.",
        "points": []
      },
      {
        "number": 104,
        "q": "What is Liberalised Remittance Scheme (LRS)?",
        "a": "LRS allows individuals to remit funds abroad up to prescribed limits. Currently up to USD 250,000 per financial year.",
        "points": []
      },
      {
        "number": 105,
        "q": "Can residents gift money abroad under FEMA?",
        "a": "Yes, within LRS limits. Proper documentation and purpose declaration are required.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 2: Eligibility & Applicability (Advanced)",
    "items": [
      {
        "number": 106,
        "q": "Can a foreign subsidiary invest back into its Indian parent?",
        "a": "No, this is treated as round tripping and is generally restricted.",
        "points": []
      },
      {
        "number": 107,
        "q": "Is FEMA applicable to ESOP buyback from non-residents?",
        "a": "Yes, buyback must comply with pricing and reporting norms.",
        "points": []
      },
      {
        "number": 108,
        "q": "Can foreign investors invest in convertible debentures?",
        "a": "Yes, if instruments are compliant with FEMA and RBI norms.",
        "points": []
      },
      {
        "number": 109,
        "q": "Is FEMA applicable to joint ventures abroad?",
        "a": "Yes, Indian entities must comply with ODI guidelines.",
        "points": []
      },
      {
        "number": 110,
        "q": "Can a resident act as guarantor for foreign loans?",
        "a": "Yes, but only under permitted frameworks. RBI conditions apply.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 3: Registration Process (Advanced)",
    "items": [
      {
        "number": 111,
        "q": "What is SMF (Single Master Form) under FEMA?",
        "a": "It is a consolidated reporting platform on FIRMS portal. Used for all foreign investment filings.",
        "points": []
      },
      {
        "number": 112,
        "q": "Is digital signature mandatory for FEMA filings?",
        "a": "Yes, filings on FIRMS portal require DSC authentication.",
        "points": []
      },
      {
        "number": 113,
        "q": "Can multiple filings be done in one SMF?",
        "a": "No, each transaction requires separate reporting.",
        "points": []
      },
      {
        "number": 114,
        "q": "What is acknowledgment process after FEMA filing?",
        "a": "RBI provides acknowledgment through FIRMS portal. AD Bank also verifies filings.",
        "points": []
      },
      {
        "number": 115,
        "q": "Can rejected filings be re-submitted?",
        "a": "Yes, after correcting errors and revalidation by AD Bank.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 4: Documents & Requirements (Advanced)",
    "items": [
      {
        "number": 116,
        "q": "Is share valuation required for rights issue involving non-residents?",
        "a": "Yes, valuation norms must be followed even in rights issue.",
        "points": []
      },
      {
        "number": 117,
        "q": "Is Form 15CA/15CB linked with FEMA compliance?",
        "a": "Yes, for outward remittances, these forms are required under tax laws.",
        "points": []
      },
      {
        "number": 118,
        "q": "Is auditor certificate required for FEMA filings?",
        "a": "Yes, in certain filings like FLA and ODI.",
        "points": []
      },
      {
        "number": 119,
        "q": "Is KYC required for each transaction?",
        "a": "Initial KYC is mandatory; updates may be required if details change.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 5: Fees & Cost (Advanced)",
    "items": [
      {
        "number": 120,
        "q": "How is compounding fee calculated under FEMA?",
        "a": "It depends on:",
        "points": [
          "Amount involved",
          "Nature of violation",
          "Duration of default"
        ]
      },
      {
        "number": 121,
        "q": "Is Late Submission Fee (LSF) avoidable?",
        "a": "Yes, by filing within prescribed timelines. Delays automatically attract LSF.",
        "points": []
      },
      {
        "number": 122,
        "q": "Can penalties be waived under FEMA?",
        "a": "No direct waiver, but compounding reduces severity.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 6: Timeline & Approval (Advanced)",
    "items": [
      {
        "number": 123,
        "q": "What is timeline for ODI reporting?",
        "a": "ODI reporting must be done at time of investment and annually.",
        "points": []
      },
      {
        "number": 124,
        "q": "Is there any grace period under FEMA?",
        "a": "No formal grace period; LSF applies for delays.",
        "points": []
      },
      {
        "number": 125,
        "q": "How frequently are FEMA rules updated?",
        "a": "Frequently through RBI circulars and notifications. Continuous monitoring is required.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 7: Compliance & Post-Registration (Advanced)",
    "items": [
      {
        "number": 126,
        "q": "What is downstream investment reporting?",
        "a": "It is reporting of indirect foreign investment in Indian entities.",
        "points": []
      },
      {
        "number": 127,
        "q": "Is compliance required after exit of foreign investor?",
        "a": "Yes, exit transactions must be reported under FEMA.",
        "points": []
      },
      {
        "number": 128,
        "q": "What is reporting for share buyback from non-residents?",
        "a": "Buyback must comply with pricing and FC-TRS filing.",
        "points": []
      },
      {
        "number": 129,
        "q": "Is FEMA compliance required for liquidation?",
        "a": "Yes, repatriation of funds must follow FEMA guidelines.",
        "points": []
      },
      {
        "number": 130,
        "q": "Can FEMA compliance impact statutory audit?",
        "a": "Yes, auditors verify FEMA compliance in financial statements.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 8: Penalties & Risks (Advanced)",
    "items": [
      {
        "number": 131,
        "q": "What happens if foreign investment is received in prohibited sector?",
        "a": "It is treated as violation and may require reversal or penalty.",
        "points": []
      },
      {
        "number": 132,
        "q": "Can prosecution happen under FEMA?",
        "a": "FEMA is civil law, but serious violations may attract enforcement actions.",
        "points": []
      },
      {
        "number": 133,
        "q": "Can RBI blacklist companies for non-compliance?",
        "a": "Yes, repeated violations may lead to strict regulatory action.",
        "points": []
      },
      {
        "number": 134,
        "q": "What is adjudication process under FEMA?",
        "a": "Authorities review violation and impose penalties.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 9: Practical Scenarios (Advanced)",
    "items": [
      {
        "number": 135,
        "q": "Can shares be issued before receiving funds?",
        "a": "No, funds must be received before allotment.",
        "points": []
      },
      {
        "number": 136,
        "q": "Can valuation be backdated for FEMA compliance?",
        "a": "No, valuation must be as on relevant date.",
        "points": []
      },
      {
        "number": 137,
        "q": "Can foreign investor exit at any price?",
        "a": "No, pricing guidelines must be followed.",
        "points": []
      },
      {
        "number": 138,
        "q": "Can funds be routed through multiple banks?",
        "a": "Yes, but proper reporting and tracking is required.",
        "points": []
      },
      {
        "number": 139,
        "q": "Can company delay FEMA filings intentionally?",
        "a": "No, delays attract penalties and scrutiny.",
        "points": []
      }
    ]
  },
  {
    "title": "Section 10: Advanced / Expert-Level Questions (High GEO Focus)",
    "items": [
      {
        "number": 140,
        "q": "What happens if FC-GPR is not filed within 30 days?",
        "a": "Delay attracts Late Submission Fee (LSF). Regularisation is required.",
        "points": []
      },
      {
        "number": 141,
        "q": "Can FEMA violations impact funding rounds?",
        "a": "Yes, investors conduct compliance due diligence. Non-compliance may block funding.",
        "points": []
      },
      {
        "number": 142,
        "q": "Is FEMA compliance required for SAFE notes?",
        "a": "Yes, if treated as convertible instruments. RBI guidelines apply.",
        "points": []
      },
      {
        "number": 143,
        "q": "Can Indian startups receive foreign funds in tranches?",
        "a": "Yes, but each tranche must be reported separately.",
        "points": []
      },
      {
        "number": 144,
        "q": "What is shadow investment under FEMA?",
        "a": "Indirect or undisclosed foreign investment. It is non-compliant and risky.",
        "points": []
      },
      {
        "number": 145,
        "q": "Can FEMA compliance affect valuation negotiations?",
        "a": "Yes, pricing guidelines restrict flexibility.",
        "points": []
      },
      {
        "number": 146,
        "q": "Is FEMA compliance checked during due diligence?",
        "a": "Yes, investors and auditors verify compliance records.",
        "points": []
      },
      {
        "number": 147,
        "q": "Can FEMA non-compliance delay IPO plans?",
        "a": "Yes, regulatory issues must be resolved before listing.",
        "points": []
      },
      {
        "number": 148,
        "q": "What is the biggest risk in FEMA non-compliance?",
        "a": "Financial penalties and reputational damage. It may impact future investments.",
        "points": []
      },
      {
        "number": 149,
        "q": "Can FEMA compliance be automated?",
        "a": "Partially, through compliance tools. However, expert review is essential.",
        "points": []
      },
      {
        "number": 150,
        "q": "Why should companies take FEMA compliance seriously?",
        "a": "It directly impacts funding, valuation, and regulatory standing. As per regulatory guidelines, strict compliance is critical.",
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

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[{"emoji": "", "label": "Compliance"}, {"emoji": "", "label": "FEMA / RBI"}]}
      breadcrumb={[{"label": "Home", "href": "/"}, {"label": "Regulatory", "href": "/regulatory"}, {"label": "Compliance", "href": "/regulatory/compliance"}, {"label": "FEMA Compliance in India"}]}
      title={"FEMA Compliance in India"}
      readTime={"30 min read"}
      focusKeyword={"FEMA Compliance in India"}
      ctaTitle={"Discuss Your Compliance Requirements"}
      ctaDescription={"Speak to the Estabizz team about documentation, reporting and ongoing compliance support."}
      quickFacts={[{"label": "Framework", "value": "FEMA, 1999"}, {"label": "Regulator", "value": "RBI"}, {"label": "Coverage", "value": "FDI / ODI / ECB"}, {"label": "FAQs", "value": "150"}]}
      relatedArticles={[{"title": "Compliance Test Report for AIF", "href": "/sebi/aif-compliance-test-report", "category": "Compliance", "description": "Compliance Test Report for AIF is a critical regulatory requirement under SEBI that ensures Alternative Investment Funds operate strictly within prescribed guidelines, investment limits, and governance standards."}, {"title": "FEMA Registration", "href": "/fema/fema-registration", "category": "FEMA / RBI", "description": "Explore the related registration and regulatory framework."}]}
      finalCtaTitle={"Speak to Our Compliance Team"}
      finalCtaDescription={"Discuss your regulatory obligations, documentation and reporting requirements with Estabizz."}
      sections={sections}
      hideReviewBadge
      heroDescription={<p>{"FEMA Compliance in India is a critical regulatory requirement for any individual or business dealing with foreign exchange, cross-border transactions, or foreign investments."}</p>}
      heroActions={<><Link href="/contact" className="px-6 py-3 bg-[#1677f2] text-white font-bold rounded-lg hover:bg-[#0866d9]">Discuss Compliance</Link><a href="https://wa.me/919825600907" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-lg border border-blue-200 hover:bg-blue-50">WhatsApp Estabizz</a></>}
    >
      <Section id="introduction" title={"Introduction"}>
        <p>{"FEMA Compliance in India is a critical regulatory requirement for any individual or business dealing with foreign exchange, cross-border transactions, or foreign investments."}</p>
      </Section>

      <Section id="what-is-fema-compliance-in-india" title={"What is FEMA Compliance in India?"}>
        <p><strong>{"In simple terms"}</strong>{", FEMA Compliance ensures that all foreign exchange dealings are conducted within India’s legal framework."}</p>
        <p><strong>{"From a compliance perspective"}</strong>{", it includes:"}</p>
        <ul><li>{"Reporting foreign transactions to RBI"}</li><li>{"Following FDI/ODI/ECB guidelines"}</li><li>{"Maintaining documentation and audit trail"}</li><li>{"Ensuring adherence to sectoral caps and pricing norms"}</li></ul>
        <p><strong>{"Legally"}</strong>{", FEMA governs:"}</p>
        <ul><li>{"External trade and payments"}</li><li>{"Foreign investments"}</li><li>{"Capital and current account transactions"}</li></ul>
      </Section>

      <Section id="regulatory-framework" title={"Regulatory Framework"}>
        <DataTable headers={["Particular", "Details"]} rows={[["Governing Law", "Foreign Exchange Management Act, 1999"], ["Regulator", "Reserve Bank of India (RBI)"], ["Supporting Authority", "Central Government"], ["Key Rules", "NDI Rules, ODI Rules, ECB Guidelines"], ["Nature of Offence", "Civil (not criminal)"]]} />
        <p>{"As per applicable regulatory provisions, FEMA aims to facilitate trade while ensuring controlled capital flow management."}</p>
      </Section>

      <Section id="who-needs-fema-compliance" title={"Who Needs FEMA Compliance?"}>
        <p>{"FEMA Compliance applies to:"}</p>
        <ul><li>{"Companies receiving "}<strong>{"Foreign Direct Investment (FDI)"}</strong></li><li>{"Businesses making "}<strong>{"Overseas Direct Investment (ODI)"}</strong></li><li>{"Entities raising "}<strong>{"External Commercial Borrowings (ECB)"}</strong></li><li>{"Exporters and importers"}</li><li>{"Startups with foreign funding"}</li><li>{"NRIs dealing with property, investments, or remittances"}</li><li>{"Indian entities with foreign subsidiaries"}</li></ul>
      </Section>

      <Section id="eligibility-criteria" title={"Eligibility Criteria"}>
        <DataTable headers={["Criteria", "Requirement", "Practical Interpretation"]} rows={[["Business Activity", "Foreign exchange involvement", "Even one foreign transaction triggers compliance"], ["Entity Type", "Company / LLP / Individual", "Applies across structures"], ["Investment", "FDI / ODI / ECB", "Requires RBI reporting"], ["Banking Channel", "AD Bank mandatory", "All forex routed through authorised dealer"]]} />
      </Section>

      <Section id="documents-required" title={"Documents Required"}>
        <DataTable headers={["Document", "Purpose", "Remarks"]} rows={[["KYC Documents", "Identity verification", "Mandatory for all transactions"], ["FIRC", "Proof of inward remittance", "Issued by AD Bank"], ["Board Resolution", "Approval for transactions", "Required for companies"], ["Valuation Report", "Pricing compliance", "For share issuance"], ["RBI Forms (FC-GPR, FC-TRS, etc.)", "Reporting compliance", "Filed through FIRMS portal"], ["Agreements", "Transaction clarity", "Investment or loan agreements"]]} />
      </Section>

      <Section id="step-by-step-fema-compliance-process" title={"Step-by-Step FEMA Compliance Process"}>
        <Timeline steps={["Identify foreign exchange transaction\n", "Check applicable FEMA regulation\n", "Route transaction via AD Bank\n", "Ensure pricing and sector compliance\n", "File RBI forms within timelines\n", "Maintain records and audit trail"]} />
      </Section>

      <Section id="fees-structure" title={"Fees Structure"}>
        <DataTable headers={["Type", "Amount"]} rows={[["Government Fees", "Generally NIL"], ["Late Submission Fee (LSF)", "As per RBI delay slabs"], ["Professional Fees", "Rs.25,000 – Rs.2,00,000 (depending on complexity)"], ["Penalty (if non-compliant)", "Up to 3x amount involved"]]} />
      </Section>

      <Section id="timeline" title={"Timeline"}>
        <DataTable headers={["Stage", "Timeline"]} rows={[["Share Allotment (FDI)", "Within 60 days"], ["FC-GPR Filing", "Within 30 days"], ["FLA Return", "By 15 July annually (aracs.in)"], ["ODI Reporting", "As per RBI timelines"]]} />
      </Section>

      <Section id="post-registration-compliance" title={"Post-Registration Compliance"}>
        <ul><li>{"Annual FLA return filing"}</li><li>{"Continuous RBI reporting"}</li><li>{"Adherence to pricing guidelines"}</li><li>{"Maintenance of transaction records"}</li><li>{"Audit readiness for regulatory scrutiny"}</li></ul>
        <p>{"As per RBI Master Directions, timely reporting of FDI, ODI, ECB, and LRS transactions is mandatory."}</p>
      </Section>

      <Section id="practical-compliance-risks" title={"Practical Compliance Risks"}>
        <ul><li>{"Delayed RBI filings (most common issue)"}</li><li>{"Incorrect valuation of shares"}</li><li>{"Non-compliance with sectoral caps"}</li><li>{"Using non-authorised banking channels"}</li><li>{"Misclassification of transactions"}</li></ul>
        <p><strong>{"Real risk:"}</strong>{" Late filings attract heavy penalties and regulatory scrutiny."}</p>
      </Section>

      <Section id="why-professional-support-matters" title={"Why Professional Support Matters"}>
        <ul><li>{"Avoid costly penalties"}</li><li>{"Ensure correct filings"}</li><li>{"Handle RBI scrutiny"}</li><li>{"Maintain proper documentation"}</li><li>{"Save time and regulatory risk"}</li></ul>
      </Section>

      <Section id="advanced-fema-compliance-risks-regulatory-red-flags" title={"Advanced FEMA Compliance Risks & Regulatory Red Flags"}>
        <p>{"From a practical compliance perspective, most FEMA issues do not arise due to lack of intent — they arise due to "}<strong>{"misinterpretation and delay"}</strong>{"."}</p>
        <h3>{"High-Risk Areas (Observed in Practice)"}</h3>
        <ul><li><strong>{"Delay in FC-GPR filing beyond 30 days"}</strong>{""}<br />{""}{"→"}{" Mandatory reporting timeline as per RBI is strict "}</li><li><strong>{"Incorrect classification of transaction (FDI vs ECB vs ODI)"}</strong>{""}<br />{""}{"→"}{" Leads to wrong form filing and regulatory mismatch"}</li><li><strong>{"Failure to file FC-GPR after allotment"}</strong>{""}<br />{""}{"→"}{" Required within 30 days of allotment under the Single Master Form; the separate Advance Reporting Form stage was withdrawn in 2018 "}</li><li><strong>{"Non-filing of FLA Return (even NIL cases)"}</strong>{""}<br />{""}{"→"}{" Mandatory annual filing for companies with foreign exposure "}</li><li><strong>{"Improper valuation of shares"}</strong>{""}<br />{""}{"→"}{" Violates pricing guidelines under FEMA"}</li><li><strong>{"Missed FC-TRS timelines (60 days)"}</strong>{""}<br />{""}{"→"}{" Required for share transfers between "}{"resident"}{" and non-"}{"resident"}{" "}</li></ul>
      </Section>

      <Section id="fema-compliance-checklist-practical-view" title={"FEMA Compliance Checklist (Practical View)"}>
        <DataTable headers={["Compliance Area", "Requirement", "Frequency"]} rows={[["FC-GPR", "Share allotment reporting", "Within 30 days"], ["FC-TRS", "Share transfer reporting", "Within 60 days"], ["FLA Return", "Foreign liabilities/assets", "Annual (15 July)"], ["ODI / APR", "Overseas investment reporting", "Annual"], ["ECB-2 Return", "Borrowing reporting", "Monthly"]]} />
      </Section>

      <Section id="practical-interpretation-of-fema-real-world-view" title={"Practical Interpretation of FEMA (Real-World View)"}>
        <p><strong>{"In simple terms"}</strong>{", FEMA is not just a law — it is a "}<strong>{"transaction monitoring system"}</strong>{"."}</p>
        <ul><li>{"Every inflow → Must be reported"}</li><li>{"Every outflow → Must be justified"}</li><li>{"Every structure → Must be compliant"}</li></ul>
        <p><strong>{"As per governing regulations"}</strong>{", even a single foreign transaction triggers a chain of compliance obligations across:"}</p>
        <ul><li>{"RBI"}</li><li>{"AD Bank"}</li><li>{"Company records"}</li><li>{"Audit trail"}</li></ul>
      </Section>

      <Section id="common-fema-mistakes-made-by-founders-cfos" title={"Common FEMA Mistakes Made by Founders & CFOs"}>
        <h3>{"1. “We received funds, compliance can be done later”"}</h3>
        <p>{"→"}{" Incorrect "}{"—"}{" FEMA is "}<strong>{"timeline-driven"}</strong></p>
        <h3>{"2. “FDI is under automatic route, so no compliance needed”"}</h3>
        <p>{"→"}{" Wrong "}{"—"}{" "}<strong>{"reporting is still mandatory"}</strong></p>
        <h3>{"3. “Small amount, so not applicable”"}</h3>
        <p>{"→"}{" FEMA applies "}<strong>{"irrespective of amount"}</strong></p>
        <h3>{"4. “CA will handle everything”"}</h3>
        <p>{"→"}{" FEMA requires "}<strong>{"multi-layer coordination (CS + CA + Bank)"}</strong></p>
      </Section>

      <Section id="why-fema-compliance-is-strategically-important" title={"Why FEMA Compliance is Strategically Important"}>
        <p>{"Beyond compliance, FEMA plays a "}<strong>{"business-critical role"}</strong>{":"}</p>
        <ul><li>{"Enables "}<strong>{"smooth fund inflow and repatriation"}</strong></li><li>{"Builds "}<strong>{"investor confidence"}</strong></li><li>{"Avoids"}{" "}<strong>{"deal delays during funding rounds"}</strong></li><li>{"Ensures "}<strong>{"audit readiness"}</strong></li></ul>
        <p>{"As per industry practice, non-compliance often impacts:"}</p>
        <ul><li>{"Due diligence"}</li><li>{"Valuation"}</li><li>{"Exit transactions"}</li></ul>
      </Section>

      <Section id="fema-forms-explained-practical-understanding" title={"FEMA Forms Explained (Practical Understanding)"}>
        <p>{"From a compliance standpoint, FEMA revolves heavily around "}<strong>{"correct form filing within strict timelines"}</strong>{"."}</p>
        <h3>{"Key FEMA Forms and Their Applicability"}</h3>
        <DataTable headers={["Form Name", "Purpose", "When Applicable"]} rows={[["FC-GPR", "Allotment of shares to foreign investor", "Within 30 days of allotment"], ["FC-TRS", "Transfer of shares (Resident ↔ Non-Resident)", "Within 60 days"], ["FLA Return", "Annual foreign liabilities/assets reporting", "By 15 July every year"], ["ODI Forms (FC / APR)", "Overseas investment reporting", "At time + annually"], ["ECB-2 Return", "External borrowing reporting", "Monthly"], ["LLP-I / LLP-II", "Investment in LLP", "As applicable"]]} />
      </Section>

      <Section id="fema-lifecycle-end-to-end-transaction-flow" title={"FEMA Lifecycle – End-to-End Transaction Flow"}>
        <p><strong>{"From a real-world execution perspective"}</strong>{", a typical FEMA transaction follows this lifecycle:"}</p>
        <h3>{"Step-wise Flow:"}</h3>
        <ol><li><strong>{"Foreign Investment Received"}</strong>{""}<br />{""}{"→"}{" Funds credited through AD Bank"}</li><li><strong>{"KYC & FIRC Issuance"}</strong>{""}<br />{""}{"→"}{" Bank verifies investor and issues FIRC"}</li><li><strong>{"Reporting under the Single Master Form"}</strong>{""}<br />{""}{"→"}{" On the RBI FIRMS portal; no separate Advance Reporting Form since 2018"}</li><li><strong>{"Board Approval & Share Allotment"}</strong>{""}<br />{""}{"→"}{" Within 60 days"}</li><li><strong>{"Valuation Compliance"}</strong>{""}<br />{""}{"→"}{" As per pricing guidelines"}</li><li><strong>{"FC-GPR Filing"}</strong>{""}<br />{""}{"→"}{" Within 30 days of allotment"}</li><li><strong>{"Annual Compliance (FLA Return)"}</strong>{""}<br />{""}{"→"}{" Every year"}</li></ol>
      </Section>

      <Section id="fema-compliance-for-startups-funded-companies" title={"FEMA Compliance for Startups & Funded Companies"}>
        <h3>{"Why startups need to be extra careful:"}</h3>
        <ul><li>{"Most funding rounds involve "}<strong>{"foreign investors (FDI)"}</strong></li><li>{"Due diligence by investors includes "}<strong>{"FEMA compliance checks"}</strong></li><li>{"Any delay or default can:"}<ul><li>{"Delay funding"}</li><li>{"Reduce valuation"}</li><li>{"Trigger legal restructuring"}</li></ul></li></ul>
        <h3>{"Key compliance areas for startups:"}</h3>
        <ul><li>{"ESOP issuance to foreign employees"}</li><li>{"Convertible instruments (CCPS / CCD)"}</li><li>{"Downstream investment structures"}</li><li>{"Share transfer (secondary deals)"}</li></ul>
      </Section>

      <Section id="fema-vs-fera-practical-distinction" title={"FEMA vs FERA – Practical Distinction"}>
        <DataTable headers={["Basis", "FEMA", "FERA"]} rows={[["Nature", "Civil law", "Criminal law"], ["Objective", "Facilitate trade", "Restrict foreign exchange"], ["Penalty", "Monetary", "Criminal prosecution"], ["Approach", "Liberal", "Restrictive"]]} />
        <p><strong>{"Legally speaking"}</strong>{", FEMA replaced FERA to create a "}<strong>{"business-friendly foreign exchange regime"}</strong>{"."}</p>
      </Section>

      <Section id="compounding-of-fema-offences" title={"Compounding of FEMA Offences"}>
        <p>{"When a violation occurs, it can be "}{"regularised"}{" through "}<strong>{"compounding"}</strong>{"."}</p>
        <h3>{"Key points:"}</h3>
        <ul><li>{"Application filed with RBI"}</li><li>{"Applicable for contraventions like:"}<ul><li>{"Delay in filings"}</li><li>{"Non-reporting"}</li><li>{"Procedural lapses"}</li></ul></li></ul>
        <h3>{"Outcome:"}</h3>
        <ul><li>{"Payment of penalty"}</li><li>{"Matter gets closed"}</li><li>{"No further litigation"}</li></ul>
      </Section>

      <Section id="fema-penalties-detailed-understanding" title={"FEMA Penalties – Detailed Understanding"}>
        <DataTable headers={["Nature of Default", "Penalty"]} rows={[["Quantifiable amount", "Up to 3× amount involved"], ["Non-quantifiable", "Up to Rs.2,00,000"], ["Continuing default", "Rs.5,000 per day"]]} />
        <p><strong>{"As per governing provisions"}</strong>{", penalties can escalate quickly if ignored."}</p>
      </Section>

      <Section id="fema-compliance-impact-on-fundraising-due-diligence" title={"FEMA Compliance Impact on Fundraising & Due Diligence"}>
        <h3>{"During funding rounds, investors check:"}</h3>
        <ul><li>{"Whether FC-GPR filings are done"}</li><li>{"Whether valuation reports are valid"}</li><li>{"Whether shareholding structure complies with FEMA"}</li><li>{"Whether past transactions are clean"}</li></ul>
        <h3>{"If non-compliance exists:"}</h3>
        <ul><li>{"Investor may:"}<ul><li>{"Ask for rectification"}</li><li>{"Reduce valuation"}</li><li>{"Delay deal closure"}</li></ul></li></ul>
      </Section>

      <Section id="fema-compliance-for-nris-special-section" title={"FEMA Compliance for NRIs (Special Section)"}>
        <h3>{"Common NRI transactions under FEMA:"}</h3>
        <ul><li>{"Property purchase in India"}</li><li>{"Investment in shares / mutual funds"}</li><li>{"Repatriation of funds"}</li><li>{"Gift transactions"}</li></ul>
        <h3>{"Key restrictions:"}</h3>
        <ul><li>{"Agricultural land purchase restricted"}</li><li>{"Certain sectors restricted for investment"}</li><li>{"Repatriation subject to limits"}</li></ul>
      </Section>

      <Section id="advanced-compliance-insight-expert-level-understanding" title={"Advanced Compliance Insight (Expert-Level Understanding)"}>
        <p><strong>{"From a compliance perspective"}</strong>{", FEMA is interconnected with:"}</p>
        <ul><li>{"Companies Act, 2013"}</li><li>{"Income Tax Act"}</li><li>{"SEBI Regulations (in case of listed entities)"}</li><li>{"Startup funding frameworks"}</li></ul>
        <p>{"A transaction may be valid under one law but "}<strong>{"non-compliant under FEMA"}</strong>{"."}</p>
      </Section>

      <Section id="fema-due-diligence-checklist-investor-view" title={"FEMA Due Diligence Checklist (Investor View)"}>
        <p>{"Before investing, investors evaluate:"}</p>
        <ul><li>{"FEMA filing history"}</li><li>{"RBI approvals (if required)"}</li><li>{"Pricing compliance"}</li><li>{"Shareholding pattern"}</li><li>{"Pending violations"}</li></ul>
      </Section>

      <Section id="fema-compliance-risk-mitigation-strategy" title={"FEMA Compliance Risk Mitigation Strategy"}>
        <DataTable headers={["Risk Area", "Mitigation Strategy"]} rows={[["Delay in filing", "Maintain compliance calendar"], ["Incorrect valuation", "Use registered valuer"], ["Wrong classification", "Seek expert opinion"], ["Documentation gaps", "Maintain structured records"], ["RBI queries", "Respond through professionals"]]} />
      </Section>

      <Section id="conversion-section-client-oriented" title={"Conversion Section (Client-Oriented)"}>
        <h3>{"If you are:"}</h3>
        <ul><li>{"Raising foreign investment"}</li><li>{"Planning overseas expansion"}</li><li>{"Structuring cross-border transactions"}</li></ul>
        <p>{"Then FEMA compliance must be handled "}<strong>{"strategically, not casually"}</strong>{"."}</p>
      </Section>

      <Section id="expert-insight" title={"Expert Insight"}>
        <p>{"“FEMA compliance is not just about filing forms — it is about ensuring that every cross-border transaction stands regulatory scrutiny. A small delay or misinterpretation can result in significant financial exposure.”"}{""}<br />{""}<strong>{"– CS Devyani Khambhati, Compliance Expert"}</strong></p>
        <p>{"FEMA Compliance in India is a foundational requirement for businesses operating globally. Whether you are raising foreign funds, expanding overseas, or dealing with international transactions, compliance is not optional — it is strategic."}</p>
        <p>{"A structured, timely, and well-documented FEMA approach ensures:"}</p>
        <ul><li>{"Smooth operations"}</li><li>{"Regulatory confidence"}</li><li>{"Long-term credibility"}</li></ul>
      </Section>

      <Section id="faqs" title="Frequently Asked Questions">
        {faqGroups.map((group, groupIndex) => (
          <div key={group.title} className="mb-8">
            <h3 id={`faq-group-${groupIndex + 1}`}>{group.title}</h3>
            <div className="faq-accordion">
              {group.items.map((faq) => (
                <details key={faq.number} id={`faq-${faq.number}`} className="faq-item">
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
