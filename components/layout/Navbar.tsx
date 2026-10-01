"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NAVBAR_DEFAULTS, type NavbarContent } from "@/lib/content/navbarDefaults";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { JOBS_MENU_ITEMS, HIRE_TALENT_ITEM, getCandidateUserMenuItems } from "@/lib/jobs/navigation/jobsMenu";
import { JOBS_SEARCH_ENTRIES } from "@/lib/jobs/navigation/searchEntries";

interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

// Jobs / Candidate / Recruitment navigation content (JOBS_MENU_ITEMS,
// HIRE_TALENT_ITEM, the candidate account menu, and JOBS_SEARCH_ENTRIES) lives
// in lib/jobs/navigation/ — see those files for the reasoning. Kept out of
// this component so it is plain data, testable without rendering JSX, and
// shared with nothing else that would otherwise drift out of sync.
const CANDIDATE_USER_MENU_ITEMS = getCandidateUserMenuItems();

interface MenuGroup { heading: string; items: string[]; }
interface MenuCategory {
    label: string;
    icon: string;
    items: string[];
    groups?: MenuGroup[];
    /**
     * Labels (a subset of `items`) to surface in the desktop dropdown when the
     * full list is too long for a panel.
     *
     * The dropdown is `fixed` and the page behind it does not scroll while it
     * is open, so a category that renders taller than the viewport puts its
     * last rows permanently out of reach -- which is exactly what 58 Legal
     * services did. `featured` shows the handful people actually arrive for
     * and sends the rest to the category hub, where they are grouped by
     * situation and filterable.
     *
     * `items` still holds everything: searchItems reads it to label the global
     * search index, so a label dropped from the dropdown stays findable.
     */
    featured?: string[];
    viewAll: string;
    viewAllLabel: string;
}
interface MegaMenu { categories: MenuCategory[]; viewAll: string; viewAllLabel: string; }

const linkMap: Record<string, string> = {
    // IFSCA (existing)
    "Finance Company GIFT IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Finance Company Registration": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Finance Unit Registration": "/ifsca/finance-company-in-gift-ifsc",
    "Finance Company in GIFT IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "GIFT IFSC Finance Company": "/ifsca/finance-company-in-gift-ifsc",
    "Finance Unit in IFSC": "/ifsca/finance-company-in-gift-ifsc",
    "GRCTC": "/ifsca/finance-company-in-gift-ifsc",
    "Global Regional Corporate Treasury Centre": "/ifsca/finance-company-in-gift-ifsc",
    "IFSCA Factoring License": "/regulatory/ifsca-factoring-license-gift-city",
    "PSP License IFSCA": "/ifsca/psp-license-ifsca",
    "PSP License – IFSCA": "/ifsca/psp-license-ifsca",
    "Payment Service Provider IFSCA": "/ifsca/psp-license-ifsca",
    "IFSCA Payment Services Regulations 2024": "/ifsca/psp-license-ifsca",
    "PSP Authorisation in IFSC": "/ifsca/psp-license-ifsca",
    "Payment Service Provider Authorisation in IFSC": "/ifsca/psp-license-ifsca",
    "IFSCA PSP Registration": "/ifsca/psp-license-ifsca",
    "PSP License GIFT City": "/ifsca/psp-license-ifsca",
    "Payment Services in IFSC": "/ifsca/psp-license-ifsca",
    "E-Money Issuance IFSC": "/ifsca/psp-license-ifsca",
    "Account Issuance Service IFSC": "/ifsca/psp-license-ifsca",
    "Cross-Border Money Transfer IFSC": "/ifsca/psp-license-ifsca",
    "Merchant Acquisition Service IFSC": "/ifsca/psp-license-ifsca",
    "Escrow Service IFSC": "/ifsca/psp-license-ifsca",
    "Significant PSP": "/ifsca/psp-license-ifsca",
    // RBI / NBFC
    "NBFC Registration": "/rbi/nbfc-registration-in-india",
    "NBFC Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "Account Aggregator": "/rbi/nbfc-account-aggregator-license",
    "ARC Registration": "/rbi/arc-registration-in-india",
    "Asset Reconstruction Company": "/rbi/arc-registration-in-india",
    "NBFC SRO Registration": "/rbi/nbfc-sro-registration",
    "SRO for NBFCs": "/rbi/nbfc-sro-registration",
    "NBFC Business Plan": "/rbi/nbfc-business-plan",
    "NBFC Compliance": "/rbi/nbfc-legal-support",
    "NBFC-P2P License": "/rbi",
    "NBFC-MFI License": "/rbi",
    "NBFC Annual Return Filing": "/rbi/rbi-services",
    "Payment Aggregator": "/rbi/payment-aggregator-license-in-india",
    "Payment Aggregator License": "/rbi/payment-aggregator-license-in-india",
    // Phase 7B: was "/rbi/full-fledged-money-changers". FFMC and AD Category II
    // are related RBI forex licenses (an FFMC can upgrade to AD Cat II), but
    // the FFMC page never mentions "AD Category" and a visitor searching for
    // one would see no confirmation they're in the right place. Routed to the
    // RBI hub rather than a page that doesn't acknowledge the term at all.
    "AD Category II": "/rbi",
    // Phase 7B: was "/rbi/lendtech-services" -- a Credit Information Company
    // (CIBIL, Experian, Equifax...) is licensed under the Credit Information
    // Companies (Regulation) Act 2005, an entirely different RBI regime from
    // digital-lending "LendTech" compliance. Verified: the LendTech page never
    // mentions Credit Information Companies, and no dedicated page exists for
    // this topic -- routed to the RBI hub rather than an unrelated specific
    // page. See docs/30-WHOLE-SITE-NAVIGATION-AUDIT.md §8.
    "Credit Information Company": "/rbi",
    "NBFC License": "/rbi/nbfc-registration-in-india",
    "Prepaid Instrument": "/rbi/ppi-registration-in-india",
    "PPI Registration": "/rbi/ppi-registration-in-india",
    "Prepaid Payment Instrument": "/rbi/ppi-registration-in-india",
    // SEBI
    "Stock Broker License": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Licence": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Registration in India": "/sebi/stock-broker-registration-in-india",
    "SEBI Stock Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Licence India": "/sebi/stock-broker-registration-in-india",
    "Trading Member Registration": "/sebi/stock-broker-registration-in-india",
    "NSE Broker Registration": "/sebi/stock-broker-registration-in-india",
    "BSE Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Stock Broker Membership": "/sebi/stock-broker-registration-in-india",
    "SEBI Stock Brokers Regulations": "/sebi/stock-broker-registration-in-india",
    "Discount Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Full-Service Broker Registration": "/sebi/stock-broker-registration-in-india",
    "Trading and Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Self-Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Professional Clearing Member": "/sebi/stock-broker-registration-in-india",
    "Margin Funding Stock Broker": "/sebi/stock-broker-registration-in-india",
    "Algorithmic Trading Broker Approval": "/sebi/stock-broker-registration-in-india",
    "Merchant Banker": "/sebi",
    "Portfolio Manager": "/sebi/pms-registration-in-india",
    "PMS Registration in India": "/sebi/pms-registration-in-india",
    "SEBI PMS Registration": "/sebi/pms-registration-in-india",
    "Portfolio Manager Registration": "/sebi/pms-registration-in-india",
    "Portfolio Management Services Registration": "/sebi/pms-registration-in-india",
    "SEBI Portfolio Manager License": "/sebi/pms-registration-in-india",
    "PMS License India": "/sebi/pms-registration-in-india",
    "Discretionary PMS Registration": "/sebi/pms-registration-in-india",
    "Non-Discretionary PMS Registration": "/sebi/pms-registration-in-india",
    "Advisory Portfolio Manager": "/sebi/pms-registration-in-india",
    "SEBI Portfolio Managers Regulations 2020": "/sebi/pms-registration-in-india",
    "Investment Adviser": "/sebi/ria-registration-in-india",
    "RIA Registration in India": "/sebi/ria-registration-in-india",
    "SEBI RIA Registration": "/sebi/ria-registration-in-india",
    "Investment Adviser Registration": "/sebi/ria-registration-in-india",
    "Registered Investment Adviser": "/sebi/ria-registration-in-india",
    "SEBI Investment Adviser License": "/sebi/ria-registration-in-india",
    "SEBI Investment Adviser Regulations 2013": "/sebi/ria-registration-in-india",
    "Financial Planner SEBI Registration": "/sebi/ria-registration-in-india",
    "Investment Advisory License": "/sebi/ria-registration-in-india",
    "Paid Investment Advice SEBI Registration": "/sebi/ria-registration-in-india",
    "Stock Advisory SEBI Registration": "/sebi/ria-registration-in-india",
    "Mutual Fund Advisory SEBI Registration": "/sebi/ria-registration-in-india",
    "Research Analyst": "/sebi/research-analyst-registration-in-india",
    "Research Analyst Registration in India": "/sebi/research-analyst-registration-in-india",
    "SEBI Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Research Analyst License": "/sebi/research-analyst-registration-in-india",
    "Research Analyst Licence India": "/sebi/research-analyst-registration-in-india",
    "SEBI RA Registration": "/sebi/research-analyst-registration-in-india",
    "SEBI Research Analyst Regulations 2014": "/sebi/research-analyst-registration-in-india",
    "Stock Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Equity Research Analyst Registration": "/sebi/research-analyst-registration-in-india",
    "Research Entity Registration": "/sebi/research-analyst-registration-in-india",
    "Investment Research Platform Registration": "/sebi/research-analyst-registration-in-india",
    "YouTube Stock Recommendation SEBI Registration": "/sebi/research-analyst-registration-in-india",
    "Telegram Stock Tips SEBI Registration": "/sebi/research-analyst-registration-in-india",
    "AIF Registration": "/sebi/aif-registration-in-india",
    "AIF Registration in India": "/sebi/aif-registration-in-india",
    "SEBI AIF Registration": "/sebi/aif-registration-in-india",
    "Alternative Investment Fund Registration": "/sebi/aif-registration-in-india",
    "Alternative Investment Fund License": "/sebi/aif-registration-in-india",
    "Category I AIF": "/sebi/aif-registration-in-india",
    "Category II AIF": "/sebi/aif-registration-in-india",
    "Category III AIF": "/sebi/aif-registration-in-india",
    "Angel Fund Registration": "/sebi/aif-registration-in-india",
    "Venture Capital Fund Registration": "/sebi/aif-registration-in-india",
    "Private Equity Fund Registration": "/sebi/aif-registration-in-india",
    "Hedge Fund Registration": "/sebi/aif-registration-in-india",
    "AIF PPM Filing": "/sebi/aif-registration-in-india",
    "SEBI Alternative Investment Fund": "/sebi/aif-registration-in-india",
    "Fund Management Entity": "/ifsca",
    // IRDAI
    "Insurance Broker": "/irdai/insurance-broker-registration-in-india",
    "Corporate Agent": "/irdai/corporate-agent-registration-in-india",
    // Phase 7B: four confirmed wrong-destination mismatches below, all in the
    // IRDAI cluster. Each destination page was read in full: none mentions the
    // labelled concept, and no dedicated page exists for any of them. Routed
    // to the IRDAI hub instead of an unrelated specific page. See
    // docs/30-WHOLE-SITE-NAVIGATION-AUDIT.md §8 for the full evidence table.
    //   "Web Aggregator"    was /irdai/insurance-marketing-firm-license
    //   "Insurance Surveyor" was /irdai/insurance-repository-registration
    //     (surveyors assess claims; a repository holds policies electronically
    //      -- unrelated functions under unrelated regulations)
    //   "TPA License/Licence" was /irdai/isnp-registration
    //     (a Third Party Administrator processes claims; ISNP is an
    //      e-commerce platform permission -- unrelated)
    //   "Micro Insurance"   was /irdai/ifsca-insurance-intermediary
    //     (a domestic low-income insurance product category, not a GIFT City
    //      international intermediary licence)
    "Web Aggregator": "/irdai",
    "Insurance Surveyor": "/irdai",
    "TPA License": "/regulatory/insurance/tpa-license-india",
    "TPA Licence": "/regulatory/insurance/tpa-license-india",
    "Insurance Guides": "/regulatory/insurance",
    "Insurance Repository": "/regulatory/insurance/insurance-repository-registration-in-india",
    "Micro Insurance": "/irdai",
    // Fintech
    "Prepaid Instrument License": "/rbi/ppi-registration-in-india",
    "Prepaid Instrument Licence": "/rbi/ppi-registration-in-india",
    "BBPS Agent Registration": "/rbi/lendtech-services",
    "UPI Third Party App": "/rbi/rbi-services",
    "Digital Lending Compliance": "/rbi/lendtech-services",
    // Compliance
    "RBI Compliance": "/rbi/rbi-services",
    "SEBI Compliance": "/sebi/aif-compliance-test-report",
    "Compliance Test Report for AIF": "/sebi/aif-compliance-test-report",
    "GST Appeal Services": "/services/gst-appeal-services",
    "IRDAI Compliance": "/irdai/insurance-broker-registration-in-india",
    "IFSCA Compliance": "/ifsca",
    "Aircraft Leasing IFSC": "/ifsca/aircraft-leasing-registration-in-ifsc",
    "IFSCA Aircraft Leasing": "/ifsca/aircraft-leasing-registration-in-ifsc",
    "BATF Services IFSC": "/ifsca/batf-services-registration-in-gift-ifsc",
    "BATF Services Registration": "/ifsca/batf-services-registration-in-gift-ifsc",
    "IFSCA BATF Services Registration": "/ifsca/batf-services-registration-in-gift-ifsc",
    "Book-keeping Accounting Taxation Financial Crime Compliance": "/ifsca/batf-services-registration-in-gift-ifsc",
    "IFSCA FinTech": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Entity": "/ifsca/ifsca-fintech-startup-incentives",
    "FinTech Entity IFSC": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Authorization": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA Limited Use Authorization": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Sandbox": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA Startup Incentives": "/ifsca/ifsca-fintech-startup-incentives",
    "IFSCA FinTech Incentive Scheme": "/ifsca/ifsca-fintech-startup-incentives",
    "FinTech Startup Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Proof of Concept Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Green FinTech Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "Accelerator Grant": "/ifsca/ifsca-fintech-startup-incentives",
    "TechFin IFSC": "/ifsca/techfin",
    "ITFS Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA ITFS": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA ITFS Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Platform in IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "ITFS Operator Registration": "/ifsca/itfs-registration-in-gift-ifsc",
    "International Trade Finance Services Platform": "/ifsca/itfs-registration-in-gift-ifsc",
    "Trade Finance Platform GIFT IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Supply Chain Finance IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Factoring Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "Forfaiting Platform IFSC": "/ifsca/itfs-registration-in-gift-ifsc",
    "IFSCA BATF Services": "/ifsca/batf-services-registration-in-gift-ifsc",
    // Enterprise / Solutions
    "FEMA Compliance": "/fema/compliance-under-fema",
    "Transfer Pricing": "/services/transfer-pricing",
    "Copyright Website": "/solutions/ipr/copyright-website",
    "Copyright Registration": "/solutions/ipr/copyright-registration",
    "Design Registration": "/solutions/ipr/design-registration",
    "Patent Registration": "/solutions/ipr/patent-registration",
    "Trademark Assignment": "/solutions/ipr/trademark-assignment",
    "Trademark Registration": "/solutions/ipr/trademark-registration",
    "Trademark Classes": "/solutions/ipr/trademark-classes",
    "Trademark Objection Reply": "/solutions/ipr/trademark-objection",
    "Trademark Opposition": "/solutions/ipr/trademark-opposition",
    "Legal Services": "/solutions/legal",
    "Adulteration of Drugs": "/solutions/legal/adulteration-of-drugs-legal-services",
    "Appeal Before High Court": "/solutions/legal/appeal-before-high-court",
    "Appeal Before ITAT": "/solutions/legal/appeal-before-itat",
    "Appeal Before NCLT": "/solutions/legal/appeal-before-nclt",
    "Bail Application": "/solutions/legal/bail-application",
    "Cheque Bounce": "/solutions/legal/cheque-bounce-in-india",
    "Caveat Filing": "/solutions/legal/caveat-filing",
    "Consumer Court Complaints": "/solutions/legal/complaints-before-consumer-court",
    "Contested Divorce": "/solutions/legal/contested-divorce",
    "Court Marriage": "/solutions/legal/court-marriage",
    "Court Proceedings": "/solutions/legal/court-proceedings",
    "Criminal Misappropriation of Property": "/solutions/legal/criminal-misappropriation-of-property",
    "Cyber Crime Complaint": "/solutions/legal/cyber-crime-complaint",
    "Cyber Security Advisory": "/solutions/legal/cyber-security-advisory",
    "Defamation": "/solutions/legal/defamation-legal-services",
    "Defamation Notice": "/solutions/legal/defamation-notice",
    "Demerger": "/solutions/legal/demerger",
    "Directors Disqualification": "/solutions/legal/directors-disqualification",
    "Divorce and Marriage Consulting": "/solutions/legal/divorce-marriage-consulting",
    "Divorce Notice": "/solutions/legal/divorce-notice",
    "Divorce Settlement Agreements": "/solutions/legal/divorce-settlement-agreements",
    "Domestic Violence": "/solutions/legal/domestic-violence-legal-services",
    "Faulty Product Notice": "/solutions/legal/faulty-product-notice",
    "First Information Report": "/solutions/legal/first-information-report",
    "Food Adulteration": "/solutions/legal/food-adulteration-legal-services",
    "General Legal Notice": "/solutions/legal/general-legal-notice",
    "Gift Deed Registration": "/solutions/legal/gift-deed-registration",
    "Judicial Separation": "/solutions/legal/judicial-separation",
    "Lawyer for TRAI Matters": "/solutions/legal/lawyer-for-trai-matters",
    "Lease Agreement Drafting": "/solutions/legal/lease-agreement-drafting",
    "Loan Recovery Notice": "/solutions/legal/loan-recovery-notice",
    "Marriage Registration": "/solutions/legal/marriage-registration",
    "Mergers and Acquisitions": "/solutions/legal/mergers-and-acquisitions",
    "Motor Accident Claims Tribunal": "/solutions/legal/motor-accident-claims-tribunal",
    "Mutual Divorce": "/solutions/legal/mutual-divorce",
    "Non Payment of Salary": "/solutions/legal/non-payment-of-salary",
    "Probate Service": "/solutions/legal/probate-service",
    "Property Registration": "/solutions/legal/property-registration",
    "Property Valuation": "/solutions/legal/property-valuation",
    "Property Verification": "/solutions/legal/property-verification",
    "Public Interest Litigation": "/solutions/legal/public-interest-litigation",
    "Quashing of FIR and Complaint": "/solutions/legal/quashing-of-fir-and-complaint",
    "Recovery From Debtors": "/solutions/legal/recovery-from-debtors",
    "Recovery Notice of Dues": "/solutions/legal/recovery-notice-of-dues",
    "Refund of Security Deposit Notice": "/solutions/legal/refund-of-security-deposit-notice",
    "Relinquishment Deed": "/solutions/legal/relinquishment-deed",
    "Revival of Struck-Off Companies": "/solutions/legal/revival-of-struck-off-companies",
    "Sexual Harassment at Workplace Compliance": "/solutions/legal/sexual-harassment-at-workplace-compliance",
    "Special Leave Petition": "/solutions/legal/special-leave-petition",
    "Succession Certificate": "/solutions/legal/succession-certificate",
    "Suspension of Sentence": "/solutions/legal/suspension-of-sentence",
    "Tenant Eviction Notice": "/solutions/legal/tenant-eviction-notice",
    "Weights and Measures Offences": "/solutions/legal/weights-and-measures-offences",
    "Will Registration": "/solutions/legal/will-registration",
    "Winding Up of Companies": "/solutions/legal/winding-up-of-companies",
    "Writ Petition": "/solutions/legal/writ-petition",
    "Legal Due Diligence": "/services/legal-due-diligence",
    "Legal Process Outsourcing": "/services/legal-process-outsourcing",
    "Finance & Accounting Outsourcing": "/services/finance-accounting-outsourcing",
    "ESG Compliance": "/services/esg-consulting",
    // Startup
    "GST Registration Enquiry": "/contact?service=GST%20Registration",
    "Trademark Search": "/services/trademark-search",
    "Tax & Audit": "/services/finance-accounting-outsourcing",
    "Document Vault": "/login",
    "Policy Library": "/login",
    // Other regulators
    "PFRDA Registration": "/gov-lic/pfrda-registration",
    "NHB Registration": "/services/enterprise-services",
    "CERSAI Registration": "/services/enterprise-services",
    "DGFT IE Code": "/fema/fema-registration",
    "FIU-IND Registration": "/fiu-ind-aml/fiu-ind-registration",
    "PMLA Compliance Advisory": "/fiu-ind-aml/pmla-compliance-advisory",
    "AML Policy Drafting": "/fiu-ind-aml/aml-policy-drafting",
    "AML Risk Assessment": "/fiu-ind-aml/aml-risk-assessment",
    "CKYC Registration & Reporting": "/fiu-ind-aml/ckyc-registration-reporting",
    "MCA / ROC Compliance": "/services/enterprise-services",
    "Company Incorporation": "/mca-roc/company-registration-in-india",
    "Annual ROC Compliance": "/services/enterprise-services",
    "Corporate Governance": "/services/enterprise-services",
    "Post-Registration Compliance": "/services",
    "Sectoral Licences": "/gov-lic",
    "FSSAI Licence": "/gov-lic/fssai-licence",
    "APEDA Registration": "/gov-lic/apeda-registration",
    "AYUSH Licence": "/gov-lic/ayush-licence",
    "Factory Licence": "/gov-lic/factory-licence",
    "Drug Licence": "/gov-lic/drug-licence",
    "BIS Certification": "/gov-lic/bis-certification",
    "Compliance Calendar": "/resources/compliance-calendar",
    "Regulatory Updates": "/resources/regulatory-updates",
    "Circular Tracker": "/resources/circular-explainers",
    "Circular Explainers": "/resources/circular-explainers",
    "FAQ Engine": "/resources/faqs",
    "Compliance FAQs": "/resources/faqs",
    "Guides & Insights": "/resources",
    // Phase 7B fixes:
    //   "Case Highlights" was "/" -- a dead-end to the homepage top, not the
    //     Case Studies section (which had no id to land on; now #case-highlights).
    //   "FAQs" was "/services" -- the generic services hub, while "Compliance
    //     FAQs" and "FAQ Engine" two lines above already correctly point to
    //     the real FAQ page. Same label, wrong destination, no reason for it
    //     to differ from its synonyms.
    "Case Highlights": "/#case-highlights",
    "FAQs": "/resources/faqs",
    "Blogs": "/blogs",
    "Regulatory Insights": "/blogs",
    // Hidden pages — now accessible
    "Mutual Fund Registration": "/sebi/mutual-fund-registration",
    "Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "Social Stock Exchange License": "/sebi/social-stock-exchange-license-india",
    "Social Stock Exchange License in India": "/sebi/social-stock-exchange-license-india",
    "SEBI Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "SSE Registration": "/sebi/social-stock-exchange-license-india",
    "NPO Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "FPE Social Stock Exchange": "/sebi/social-stock-exchange-license-india",
    "Zero Coupon Zero Principal Instruments": "/sebi/social-stock-exchange-license-india",
    "ZCZP Instruments": "/sebi/social-stock-exchange-license-india",
    "Underwriter Registration": "/sebi/underwriter-registration",
    // SEBI – additional pages
    "AMFI Registration": "/sebi/amfi-registration",
    "REIT Registration": "/sebi/reit-registration",
    "Credit Rating Agency": "/sebi/credit-rating-agency",
    "Depository Participant": "/sebi/depository-participant-sebi-registration",
    "RTA Registration": "/sebi/rta-registration-in-india",
    "Collective Investment Schemes": "/sebi/collective-investment-schemes",
    // RBI – additional pages
    "LendTech Services": "/rbi/lendtech-services",
    // IRDAI – additional pages
    "Reinsurance Broker": "/irdai/reinsurance-broker-registration-in-india",
    "Composite Insurance Broker": "/irdai/composite-insurance-broker-registration-in-india",
    "Insurance Marketing Firm": "/regulatory/insurance/insurance-marketing-firm-license-in-india",
    "IRDAI Regulatory Sandbox": "/irdai/irdai-regulatory-sandbox",
    // IFSCA – additional pages
    "TechFin Entity IFSC": "/ifsca/techfin",
    // FEMA
    "FEMA Registration": "/fema/fema-registration",
    // MCA / ROC — 19 corporate service pages (canonical: /mca-roc/[slug])
    "Company Registration in India": "/mca-roc/company-registration-in-india",
    "Public Limited Company": "/mca-roc/public-limited-company-registration-in-india",
    "Indian Subsidiary": "/mca-roc/indian-subsidiary-registration",
    "One Person Company (OPC)": "/mca-roc/one-person-company-registration-india",
    "LLP Registration": "/mca-roc/llp-registration-india",
    "Nidhi Company": "/mca-roc/nidhi-company-registration",
    "NGO Registration": "/mca-roc/ngo-registration-in-india",
    "Change Company Name": "/mca-roc/change-company-name",
    "Increase Authorised Capital": "/mca-roc/increase-authorised-capital",
    "Registered Office Change": "/mca-roc/registered-office-change",
    "OPC to Pvt Ltd Conversion": "/mca-roc/opc-to-private-limited-conversion",
    "Appointment of Directors": "/mca-roc/appointment-of-directors",
    "Removal of Director": "/mca-roc/removal-of-director",
    "Directors DIN e-KYC": "/mca-roc/directors-din-ekyc-update",
    "MOA – Private Ltd": "/mca-roc/moa-amendment-private-limited-company",
    "MOA – Public Ltd": "/mca-roc/moa-amendment-public-limited-company",
    "MOA – Section 8": "/mca-roc/moa-amendment-section-8-company",
    "Private Ltd Winding Up": "/mca-roc/private-limited-company-winding-up",
    "LLP Winding Up & Closure": "/mca-roc/llp-winding-up-closure",
    // FIU-IND & AML hub
    "FIU-IND & AML Hub": "/fiu-ind-aml",
    // Government Licences hub
    "Gov Licences Hub": "/gov-lic",
};

const staticSearchLinks = [
    { label: "Home", href: "/", group: "Site" },
    { label: "All Services", href: "/services", group: "Site" },
    { label: "Regulatory Services", href: "/regulatory", group: "Site" },
    { label: "Compliance Services", href: "/regulatory/compliance", group: "Regulatory" },
    { label: "Insurance Guides", href: "/regulatory/insurance", group: "Regulatory" },
    { label: "FIU-IND & AML", href: "/fiu-ind-aml", group: "Regulatory" },
    { label: "MCA / ROC Services", href: "/mca-roc", group: "Regulatory" },
    { label: "Government Licences", href: "/gov-lic", group: "Regulatory" },
    { label: "Startups & New Businesses", href: "/solutions/startups", group: "Solutions" },
    { label: "Resources", href: "/resources", group: "Site" },
    { label: "Regulatory Updates", href: "/resources/regulatory-updates", group: "Resources" },
    { label: "Circular Explainers", href: "/resources/circular-explainers", group: "Resources" },
    { label: "Compliance Calendar", href: "/resources/compliance-calendar", group: "Resources" },
    { label: "Regulatory Insights", href: "/blogs", group: "Resources" },
    { label: "Compliance FAQs", href: "/resources/faqs", group: "Resources" },
    { label: "RBI Services", href: "/rbi", group: "RBI" },
    { label: "SEBI Services", href: "/sebi", group: "SEBI" },
    { label: "IRDAI Services", href: "/irdai", group: "IRDAI" },
    { label: "IFSCA Services", href: "/ifsca", group: "IFSCA" },
    { label: "FEMA Services", href: "/fema", group: "FEMA" },
    { label: "Solutions", href: "/solutions", group: "Solutions" },
    { label: "IPR Services", href: "/solutions/ipr", group: "Solutions" },
    { label: "Legal Services", href: "/solutions/legal", group: "Solutions" },
    { label: "CFO Services", href: "/solutions/cfo", group: "Solutions" },
    { label: "Contact Estabizz", href: "/contact", group: "Site" },
    { label: "Book Consultation", href: "/contact", group: "Site" },
    { label: "Get Started", href: "/get-started", group: "Site" },
    { label: "Login", href: "/login", group: "Site" },
    // Jobs / Candidate / Recruitment — see lib/jobs/navigation/searchEntries.ts.
    // Route discovery only: no candidate data ever enters this list.
    ...JOBS_SEARCH_ENTRIES,
];

const menus: Record<string, MegaMenu> = {
    Regulatory: {
        categories: [
            { label: "RBI", icon: "🏦", items: ["NBFC Registration", "Payment Aggregator", "Prepaid Instrument", "NBFC Account Aggregator", "Asset Reconstruction Company", "AD Category II", "LendTech Services", "NBFC SRO Registration", "NBFC Business Plan"], viewAll: "/rbi", viewAllLabel: "View All RBI Services →" },
            { label: "SEBI", icon: "📈", items: ["Stock Broker Licence", "AIF Registration", "Portfolio Manager", "Investment Adviser", "Research Analyst", "Social Stock Exchange", "Mutual Fund Registration", "AMFI Registration", "REIT Registration", "Credit Rating Agency", "Depository Participant", "RTA Registration", "Underwriter Registration", "Collective Investment Schemes"], viewAll: "/sebi", viewAllLabel: "View All SEBI Services →" },
            { label: "IRDAI", icon: "🛡️", items: ["Insurance Broker", "Reinsurance Broker", "Corporate Agent", "Composite Insurance Broker", "Web Aggregator", "Insurance Marketing Firm", "Insurance Surveyor", "TPA Licence", "Insurance Repository", "Insurance Guides", "IRDAI Regulatory Sandbox"], viewAll: "/irdai", viewAllLabel: "View All IRDAI Services →" },
            { label: "IFSCA", icon: "🌐", items: ["Finance Company GIFT IFSC", "PSP License IFSCA", "ITFS Platform IFSC", "BATF Services IFSC", "IFSCA Aircraft Leasing", "FinTech Entity IFSC", "TechFin Entity IFSC", "IFSCA Factoring License"], viewAll: "/ifsca", viewAllLabel: "View All IFSCA Services →" },
            { label: "FEMA", icon: "📋", items: ["FEMA Compliance", "FEMA Registration", "DGFT IE Code"], viewAll: "/fema", viewAllLabel: "View All FEMA Services →" },
            { label: "Compliance", icon: "📋", items: ["Compliance Test Report for AIF", "FEMA Compliance", "Finance & Accounting Outsourcing", "GST Appeal Services", "Legal Process Outsourcing", "Legal Due Diligence"], viewAll: "/regulatory/compliance", viewAllLabel: "View Compliance Services →" },
            { label: "FIU-IND & AML", icon: "🔍", items: ["FIU-IND Registration", "PMLA Compliance Advisory", "AML Policy Drafting", "AML Risk Assessment", "CKYC Registration & Reporting"], viewAll: "/fiu-ind-aml", viewAllLabel: "View All FIU & AML Services →" },
            { label: "MCA / ROC", icon: "🏛️", items: [],
              viewAll: "/mca-roc", viewAllLabel: "View All MCA / ROC Services →",
              groups: [
                { heading: "Company & Entity Registration", items: ["Company Registration in India", "Public Limited Company", "Indian Subsidiary", "One Person Company (OPC)", "LLP Registration", "Nidhi Company", "NGO Registration", "Company Incorporation"] },
                { heading: "Company Changes & Capital", items: ["Change Company Name", "Increase Authorised Capital", "Registered Office Change", "OPC to Pvt Ltd Conversion", "MCA / ROC Compliance", "Annual ROC Compliance"] },
                { heading: "Event Based Compliance", items: ["Appointment of Directors", "Removal of Director", "Directors DIN e-KYC", "Corporate Governance", "MOA – Private Ltd", "MOA – Public Ltd", "MOA – Section 8", "Private Ltd Winding Up", "LLP Winding Up & Closure"] },
              ]},
            { label: "Government Licences", icon: "⚖️", items: ["FSSAI Licence", "APEDA Registration", "AYUSH Licence", "Factory Licence", "Drug Licence", "BIS Certification", "PFRDA Registration"], viewAll: "/gov-lic", viewAllLabel: "View All Government Licences →" },
        ],
        viewAll: "/regulatory", viewAllLabel: "View All Regulatory →"
    },
    // Solutions is the PRACTICE-AREA menu; Regulatory is the LICENCE menu.
    //
    // It used to carry six regulated-vertical categories -- NBFCs & Lending,
    // Fintech Platforms, Insurance Intermediaries, Capital Market
    // Intermediaries, Foreign / GIFT City Entities -- whose items were the
    // same labels, pointing at the same pages, as the RBI / SEBI / IRDAI /
    // IFSCA categories one menu across. Two routes to one page in two
    // dropdowns is not more discoverable, it is just a second place to keep
    // in sync. Those verticals now live only under Regulatory, and Solutions
    // holds what Regulatory has no home for: the non-licence advisory work.
    //
    // Nothing was orphaned by the removal: every dropped label is still in
    // linkMap, and searchItems builds the global search index from linkMap
    // (falling back to the group name "Service" when no category claims a
    // label), so all of them remain findable in "Search pages...".
    Solutions: {
        categories: [
            { label: "Startups & New Businesses", icon: "🚀", items: ["Company Incorporation", "GST Registration Enquiry", "Trademark Search", "FSSAI Licence"], viewAll: "/solutions/startups", viewAllLabel: "View All Startup Services →" },
            // Grouped rather than a flat list: at ten entries IPR is the
            // largest category in this menu, and "Trademark Objection Reply"
            // next to "Design Registration" in one undifferentiated column
            // makes the reader do the sorting. Groups render as headed columns
            // on desktop and nested disclosures on mobile, exactly as MCA / ROC
            // does under Regulatory. Grouped items are still indexed by the
            // global search -- searchItems checks category.groups as well as
            // category.items.
            { label: "IPR", icon: "⚖️", items: [],
              viewAll: "/solutions/ipr", viewAllLabel: "View All IPR Services →",
              groups: [
                { heading: "Trademark", items: ["Trademark Registration", "Trademark Classes", "Trademark Objection Reply", "Trademark Opposition", "Trademark Assignment", "Trademark Search"] },
                { heading: "Copyright", items: ["Copyright Registration", "Copyright Website"] },
                { heading: "Design & Patent", items: ["Design Registration", "Patent Registration"] },
              ]},
            { label: "Legal", icon: "📜", items: ["Adulteration of Drugs", "Appeal Before High Court", "Appeal Before ITAT", "Appeal Before NCLT", "Bail Application", "Cheque Bounce", "Caveat Filing", "Consumer Court Complaints", "Contested Divorce", "Court Marriage", "Court Proceedings", "Criminal Misappropriation of Property", "Cyber Crime Complaint", "Cyber Security Advisory", "Defamation", "Defamation Notice", "Demerger", "Directors Disqualification", "Divorce and Marriage Consulting", "Divorce Notice", "Divorce Settlement Agreements", "Domestic Violence", "Faulty Product Notice", "First Information Report", "Food Adulteration", "General Legal Notice", "Gift Deed Registration", "Judicial Separation", "Lawyer for TRAI Matters", "Lease Agreement Drafting", "Loan Recovery Notice", "Marriage Registration", "Mergers and Acquisitions", "Motor Accident Claims Tribunal", "Mutual Divorce", "Non Payment of Salary", "Probate Service", "Property Registration", "Property Valuation", "Property Verification", "Public Interest Litigation", "Quashing of FIR and Complaint", "Recovery From Debtors", "Recovery Notice of Dues", "Refund of Security Deposit Notice", "Relinquishment Deed", "Revival of Struck-Off Companies", "Sexual Harassment at Workplace Compliance", "Special Leave Petition", "Succession Certificate", "Suspension of Sentence", "Tenant Eviction Notice", "Weights and Measures Offences", "Will Registration", "Winding Up of Companies", "Writ Petition", "Legal Due Diligence", "Legal Process Outsourcing"],
              // 58 services is a hub page, not a dropdown. These nine are the
              // high-intent entry points; everything else is one click away on
              // /solutions/legal, grouped by situation.
              featured: ["General Legal Notice", "Cheque Bounce", "Mutual Divorce", "Bail Application", "First Information Report", "Property Registration", "Consumer Court Complaints", "Will Registration", "Mergers and Acquisitions"],
              viewAll: "/solutions/legal", viewAllLabel: "Browse all 58 Legal services by situation →" },
            { label: "Compliance Calendar", icon: "📅", items: ["Compliance Calendar", "Regulatory Updates", "Circular Explainers", "Compliance FAQs"],
              viewAll: "/solutions/compliance-calendar", viewAllLabel: "View All Compliance Tools →" },
            { label: "CFO Service", icon: "💼", items: ["Finance & Accounting Outsourcing", "Transfer Pricing", "Annual ROC Compliance", "Corporate Governance"],
              viewAll: "/solutions/cfo", viewAllLabel: "View All CFO Services →" },
        ],
        viewAll: "/solutions", viewAllLabel: "Explore All Solutions →"
    },
};

function countryHref(name: string): string {
    if (name === 'India') return '/';
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `/global/${slug}`;
}

const globalMarketRegions = [
    {
        region: "India & South Asia",
        countries: ["India", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives", "Pakistan", "Afghanistan"],
    },
    {
        region: "GCC & Middle East",
        countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "Israel", "Jordan", "Turkey", "Lebanon", "Iraq", "Egypt"],
    },
    {
        region: "Asia Pacific",
        countries: ["Singapore", "Hong Kong", "Australia", "New Zealand", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Japan", "South Korea", "China", "Taiwan", "Cambodia", "Laos", "Myanmar", "Brunei", "Mongolia"],
    },
    {
        region: "Europe & UK",
        countries: ["United Kingdom", "Ireland", "Germany", "France", "Netherlands", "Luxembourg", "Switzerland", "Italy", "Spain", "Portugal", "Sweden", "Norway", "Denmark", "Finland", "Austria", "Belgium", "Poland", "Czech Republic", "Estonia", "Lithuania", "Latvia", "Greece", "Cyprus", "Malta", "Romania", "Bulgaria", "Croatia", "Slovenia", "Slovakia", "Hungary", "Iceland", "Liechtenstein", "Monaco", "Andorra", "San Marino"],
    },
    {
        region: "North America",
        countries: ["United States", "Canada", "Mexico", "Bahamas", "Barbados", "Jamaica", "Trinidad and Tobago", "Dominican Republic"],
    },
    {
        region: "Africa & Indian Ocean",
        countries: ["Mauritius", "South Africa", "Kenya", "Nigeria", "Ghana", "Rwanda", "Egypt", "Morocco", "Tanzania", "Uganda", "Seychelles", "Ethiopia", "Zambia", "Botswana", "Namibia", "Senegal", "Ivory Coast", "Tunisia", "Algeria", "Madagascar"],
    },
    {
        region: "LATAM",
        countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru", "Uruguay", "Panama", "Costa Rica", "Ecuador", "Paraguay", "Bolivia", "Guatemala", "El Salvador", "Honduras", "Nicaragua"],
    },
];

export default function Navbar({ content }: { content?: Partial<NavbarContent> }) {
    // Editable navbar content (quick links + CTA) from the CMS, with fallback.
    const nav: NavbarContent = { ...NAVBAR_DEFAULTS, ...content };
    const baseLinks = nav.quickLinks?.length ? nav.quickLinks : NAVBAR_DEFAULTS.quickLinks;
    // Jobs is its own dropdown now (JOBS_MENU_ITEMS below), not a flat quickLink.
    // Filter defensively rather than assuming: a CMS edit made before this
    // change could still have a plain "/jobs" quickLink saved, which would
    // otherwise render Jobs twice.
    const quickLinks = baseLinks.filter((l) => l.href !== '/jobs');
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const [countryOpen, setCountryOpen] = useState(false);
    const desktopCountryRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const compactCountryRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    // Fetch current auth state on mount
    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((data) => setAuthUser(data.user ?? null))
            .catch(() => setAuthUser(null));
    }, []);

    // Close user menu on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = useCallback(async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setAuthUser(null);
        setUserMenuOpen(false);
        // Full reload so Navbar re-mounts cleanly after logout
        window.location.href = "/";
    }, [router]);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
            const target = event.target as Node;
            const insideDesktopCountry = desktopCountryRef.current?.contains(target);
            const insideCompactCountry = compactCountryRef.current?.contains(target);
            if (!insideDesktopCountry && !insideCompactCountry) {
                setCountryOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, []);

    const searchItems = useMemo(() => {
        const groupedItems = new Map<string, { label: string; href: string; group: string; keywords: string }>();

        Object.entries(linkMap).forEach(([label, href]) => {
            const groups = Object.entries(menus)
                .flatMap(([menuName, menu]) =>
                    menu.categories
                        .filter((category) =>
                            category.items.includes(label) ||
                            category.groups?.some((g) => g.items.includes(label))
                        )
                        .map((category) => `${menuName} ${category.label}`)
                );
            const key = `${label}-${href}`;

            groupedItems.set(key, {
                label,
                href,
                group: groups[0] || "Service",
                keywords: `${label} ${href} ${groups.join(" ")}`.toLowerCase(),
            });
        });

        staticSearchLinks.forEach((item) => {
            groupedItems.set(`${item.label}-${item.href}`, {
                ...item,
                keywords: `${item.label} ${item.href} ${item.group}`.toLowerCase(),
            });
        });

        return Array.from(groupedItems.values()).sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return searchItems.slice(0, 7);
        }

        return searchItems
            .filter((item) => item.keywords.includes(query))
            .sort((a, b) => {
                const aStarts = a.label.toLowerCase().startsWith(query) ? 0 : 1;
                const bStarts = b.label.toLowerCase().startsWith(query) ? 0 : 1;
                return aStarts - bStarts || a.label.localeCompare(b.label);
            })
            .slice(0, 8);
    }, [searchItems, searchQuery]);

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchQuery("");
    };

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            closeSearch();
            return;
        }

        if (event.key === "Enter" && searchResults[0]) {
            event.preventDefault();
            const nextHref = searchResults[0].href;
            closeSearch();
            setMobileOpen(false);
            router.push(nextHref);
        }
    };

    const openMenu = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSearchOpen(false);
        setCountryOpen(false);
        setActiveMenu(menu);
        setActiveCategory(0);
    };
    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
    };
    const keepOpen = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    // Phase 7B: the Regulatory/Solutions/Jobs dropdown triggers are plain
    // <div>s with hover handlers -- unreachable by keyboard at all before this.
    // Converting them to real <button> elements is a bigger change (resets
    // existing layout/styling, needs a click-to-toggle model since hover
    // doesn't apply on keyboard) than fits a low-risk fix, so this instead
    // makes the existing divs keyboard-operable in place: tabIndex + role
    // already added in JSX below, this handles Enter/Space to toggle and
    // Escape to close, matching the behaviour a <button> would have given.
    const handleMenuTriggerKeyDown = (menu: string) => (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            keepOpen();
            setActiveMenu((current) => (current === menu ? null : menu));
            setActiveCategory(0);
        } else if (event.key === "Escape" && activeMenu === menu) {
            setActiveMenu(null);
        }
    };

    const currentMenu = activeMenu ? menus[activeMenu] : null;
    const currentCategory = currentMenu?.categories[activeCategory];

    // What the open category actually renders in the dropdown. A category with
    // a `featured` list shows only those; `hiddenCount` is how many it is
    // holding back, which the panel states outright rather than silently
    // truncating. Filtering against `items` keeps the two in step: a label
    // renamed in `items` and not in `featured` drops out instead of rendering
    // a dead "#" link.
    const visibleItems = currentCategory
        ? (currentCategory.featured?.length
            ? currentCategory.featured.filter((label) => currentCategory.items.includes(label))
            : currentCategory.items)
        : [];
    const hiddenCount = currentCategory ? currentCategory.items.length - visibleItems.length : 0;

    const CountrySelector = ({ compact = false, selectorRef }: { compact?: boolean; selectorRef: React.MutableRefObject<HTMLDivElement | null> }) => (
        <div ref={(node) => { selectorRef.current = node; }} className="relative">
            <button
                type="button"
                onClick={() => {
                    setActiveMenu(null);
                    setSearchOpen(false);
                    setCountryOpen((open) => !open);
                }}
                className={`${compact ? "h-10 px-3" : "h-10 px-4"} inline-flex items-center gap-2 rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] text-[13px] font-black text-[#0a1628] dark:text-[#fafafa] shadow-sm transition-all hover:border-[#1677f2]/40 hover:text-[#1677f2] dark:hover:text-[#60a5fa]`}
                aria-expanded={countryOpen}
                aria-label="Open country and global market selector"
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eaf6ff] text-[11px] dark:bg-[#1c1c20]">IN</span>
                <span className={compact ? "hidden sm:inline" : ""}>
                    <span className="hidden 2xl:inline">Country: </span>India
                </span>
                <svg className={`h-3.5 w-3.5 transition-transform ${countryOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {countryOpen && (
                <div className={`${compact ? "right-[-54px] sm:right-0" : "right-0"} absolute top-[48px] w-[min(92vw,720px)] overflow-hidden rounded-[26px] border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] shadow-[0_30px_90px_rgba(0,60,110,0.18)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.50)]`}>
                    <div className="relative overflow-hidden border-b border-blue-100 dark:border-[#27272b] bg-gradient-to-br from-[#071426] via-[#0a2947] to-[#006da8] p-5 text-white">
                        <div className="absolute right-[-40px] top-[-60px] h-40 w-40 rounded-full bg-[#1677f2]/25 blur-3xl" />
                        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8edcff]">Global Market Desk</div>
                                <div className="mt-1 text-[22px] font-black tracking-tight">India base. Global expansion support.</div>
                                <p className="mt-2 max-w-[480px] text-[13px] font-medium leading-relaxed text-white/78">
                                    Select a market to discuss entity setup, licensing, fintech compliance, tax readiness and regulator-facing documentation.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                onClick={() => setCountryOpen(false)}
                                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2 text-[12px] font-black text-[#0077B6] transition-transform hover:-translate-y-0.5 dark:bg-[#141417] dark:text-[#4f9dfb]"
                            >
                                Plan Expansion
                            </Link>
                        </div>
                    </div>
                    <div className="max-h-[470px] overflow-y-auto p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            {globalMarketRegions.map((group) => (
                                <div key={group.region} className="rounded-2xl border border-blue-100 dark:border-[#27272b] bg-[#f8fbff] dark:bg-[#1c1c20] p-4">
                                    <h3 className="text-[12px] font-black uppercase tracking-[0.16em] text-[#1677f2] dark:text-[#4f9dfb]">{group.region}</h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {group.countries.map((country) => (
                                            <Link
                                                key={country}
                                                href={countryHref(country)}
                                                onClick={() => setCountryOpen(false)}
                                                className="rounded-full border border-white dark:border-[#3f3f46] bg-white dark:bg-[#141417] px-3 py-1.5 text-[11.5px] font-bold text-[#334155] dark:text-[#a1a1aa] shadow-sm transition-all hover:border-[#1677f2]/40 hover:text-[#1677f2] dark:hover:text-[#60a5fa]"
                                            >
                                                {country}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 px-4 py-3 text-[12px] font-semibold leading-relaxed text-[#7a5200] dark:text-amber-200">
                            Country-specific regulatory requirements may change from time to time. Estabizz reviews applicability, eligibility and documentation before any filing or market-entry action.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <nav className={`fixed top-0 w-full z-[1000] border-b border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#0f0f11] transition-all duration-300 ${scrolled ? "shadow-[0_14px_42px_rgba(15,23,42,0.10)] dark:shadow-[0_14px_42px_rgba(0,0,0,0.35)]" : "shadow-[0_6px_22px_rgba(15,23,42,0.06)] dark:shadow-[0_6px_22px_rgba(0,0,0,0.25)]"}`} style={{ height: "64px" }}>
                <div className="max-w-[1480px] mx-auto px-5 2xl:px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="shrink-0 group">
                        {/* Standard logo shown in light mode */}
                        <Image src="/estabizz-logo.png" alt="Estabizz" width={747} height={314} priority className="block dark:hidden h-12 w-auto transition-transform group-hover:scale-[1.03]" />
                        {/* Light logo shown in dark mode (same asset as Footer) */}
                        <Image src="/estabizz-logo-light.png" alt="Estabizz" width={747} height={314} priority className="hidden dark:block h-12 w-auto transition-transform group-hover:scale-[1.03]" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
                        {Object.keys(menus).map((item) => (
                            <div key={item} onMouseEnter={() => openMenu(item)} onMouseLeave={closeMenu}
                                onKeyDown={handleMenuTriggerKeyDown(item)}
                                role="button" tabIndex={0} aria-haspopup="true" aria-expanded={activeMenu === item}
                                className={`relative cursor-pointer flex items-center gap-1 text-[13px] 2xl:text-[13.5px] font-semibold px-2.5 2xl:px-3 py-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1677f2] focus-visible:outline-offset-[-2px] ${activeMenu === item ? "text-[#1677f2] dark:text-[#4f9dfb]" : "text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa]"}`}>
                                {item} <svg className={`w-3 h-3 transition-transform ${activeMenu === item ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        ))}

                        {/* Jobs dropdown — deliberately its own compact panel, not the
                            full-width mega menu used for Regulatory/Solutions. Reuses
                            the same activeMenu/openMenu/closeMenu state machine so hover
                            behaviour (single menu open at a time, delayed close) matches
                            the rest of the nav for free. */}
                        <div onMouseEnter={() => openMenu("Jobs")} onMouseLeave={closeMenu}
                            className="relative flex items-center">
                            <div onKeyDown={handleMenuTriggerKeyDown("Jobs")}
                                role="button" tabIndex={0} aria-haspopup="true" aria-expanded={activeMenu === "Jobs"}
                                className={`cursor-pointer flex items-center gap-1 text-[13px] 2xl:text-[13.5px] font-semibold px-2.5 2xl:px-3 py-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1677f2] focus-visible:outline-offset-[-2px] ${activeMenu === "Jobs" ? "text-[#1677f2] dark:text-[#4f9dfb]" : "text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa]"}`}>
                                Jobs <svg className={`w-3 h-3 transition-transform ${activeMenu === "Jobs" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                            {activeMenu === "Jobs" && (
                                <div className="absolute left-0 top-[52px] w-72 overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] py-2 shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.40)] z-[1100] animate-[fadeIn_0.15s_ease]">
                                    {JOBS_MENU_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2.5 transition-colors hover:bg-[#f5fbff] dark:hover:bg-[#12223a] dark:bg-[#141417]"
                                        >
                                            <span className="block text-[13.5px] font-bold text-[#0a1628] dark:text-[#fafafa]">{item.label}</span>
                                            <span className="block text-[11.5px] font-medium text-[#64748b] dark:text-[#a1a1aa]">{item.description}</span>
                                        </Link>
                                    ))}
                                    <div className="my-2 border-t border-gray-100 dark:border-[#27272b]" />
                                    <Link
                                        href={HIRE_TALENT_ITEM.href}
                                        className="block px-4 py-2.5 transition-colors hover:bg-[#f5fbff] dark:hover:bg-[#12223a] dark:bg-[#141417]"
                                    >
                                        <span className="block text-[13.5px] font-bold text-[#1677f2] dark:text-[#4f9dfb]">{HIRE_TALENT_ITEM.label}</span>
                                        <span className="block text-[11.5px] font-medium text-[#64748b] dark:text-[#a1a1aa]">{HIRE_TALENT_ITEM.description}</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {quickLinks.map((link) =>
                            link.newTab ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[13px] 2xl:text-[13.5px] font-semibold px-2.5 2xl:px-3 py-5 text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors cursor-pointer"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-[13px] 2xl:text-[13.5px] font-semibold px-2.5 2xl:px-3 py-5 text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Right */}
                    <div className="hidden xl:flex items-center gap-2 2xl:gap-3">
                        <div className="hidden min-[1440px]:block">
                            {/* Desktop search — inlined to avoid remount-on-rerender focus bug */}
                            <div ref={searchRef} className="relative w-[200px] 2xl:w-[240px]">
                                <label className="sr-only" htmlFor="desktop-page-search">Search pages</label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8] dark:text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                                    </svg>
                                    <input
                                        id="desktop-page-search"
                                        type="search"
                                        value={searchQuery}
                                        onChange={(event) => { setSearchQuery(event.target.value); setSearchOpen(true); }}
                                        onFocus={() => { setActiveMenu(null); setSearchOpen(true); }}
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder="Search pages..."
                                        className="w-full rounded-lg border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] pl-9 pr-3 text-[13.5px] font-medium text-[#0a1628] dark:text-[#fafafa] outline-none transition-all placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b] focus:border-[#1677f2] focus:ring-4 focus:ring-[#1677f2]/10 h-10"
                                        aria-expanded={searchOpen}
                                        aria-controls="desktop-page-search-results"
                                    />
                                </div>
                                {searchOpen && (
                                    <div id="desktop-page-search-results" className="absolute right-0 top-[46px] w-[360px] overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.40)]">
                                        <div className="border-b border-gray-100 dark:border-[#27272b] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a1a1aa]">
                                            {searchQuery.trim() ? "Search Results" : "Popular Pages"}
                                        </div>
                                        {searchResults.length > 0 ? (
                                            <div className="max-h-[330px] overflow-y-auto py-1">
                                                {searchResults.map((item) => (
                                                    <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => { closeSearch(); setMobileOpen(false); }} className="flex items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-[#f5fbff] dark:hover:bg-[#12223a] dark:bg-[#141417]">
                                                        <span>
                                                            <span className="block text-[13.5px] font-bold text-[#0a1628] dark:text-[#fafafa]">{item.label}</span>
                                                            <span className="mt-0.5 block text-[11.5px] font-medium text-[#64748b] dark:text-[#a1a1aa]">{item.group}</span>
                                                        </span>
                                                        <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#1677f2] dark:text-[#4f9dfb]">Open</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="px-4 py-5 text-[13px] font-medium text-[#64748b] dark:text-[#a1a1aa]">No page found. Try RBI, IFSCA, NBFC, payment, insurance or SEBI.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Auth: logged-in user OR Login link */}
                        {authUser ? (
                            <div ref={userMenuRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((o) => !o)}
                                    className="flex items-center gap-2 rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] px-3 py-2 text-[13.5px] font-semibold text-[#0a1628] dark:text-[#fafafa] hover:border-[#1677f2]/40 hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-all shadow-sm"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0077B6] text-[11px] font-black text-white uppercase">
                                        {authUser.firstName[0]}{authUser.lastName?.[0] ?? ""}
                                    </span>
                                    <span className="hidden 2xl:inline">{authUser.firstName}</span>
                                    <svg className={`h-3 w-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 top-[48px] w-56 rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.40)] py-1 z-[1100]">
                                        {/* User info header */}
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-[#27272b]">
                                            <p className="text-[13px] font-bold text-[#0a1628] dark:text-[#fafafa]">{authUser.firstName} {authUser.lastName}</p>
                                            <p className="text-[11px] text-[#64748b] dark:text-[#a1a1aa] truncate">{authUser.email}</p>
                                            {authUser.isAdmin && (
                                                <span className="mt-1 inline-block rounded-full bg-[#1677f2]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#1677f2]">
                                                    Admin Access
                                                </span>
                                            )}
                                        </div>

                                        {/* Admin quick links */}
                                        {authUser.isAdmin && (
                                            <div className="border-b border-gray-100 dark:border-[#27272b] py-1">
                                                {[
                                                    { label: "Dashboard",       href: "/admin" },
                                                    { label: "New Blog",        href: "/admin/blogs/new" },
                                                    { label: "Pending Review",  href: "/admin/blogs/pending" },
                                                    { label: "Media",           href: "/admin/media" },
                                                ].map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:bg-[#f5fbff] dark:hover:bg-[#12223a] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors dark:bg-[#141417]"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Candidate / Jobs account (all logged-in users — a candidate is
                                            just a logged-in user who has an Estabizz Jobs profile; see
                                            CANDIDATE_USER_MENU_ITEMS above). */}
                                        <div className="border-b border-gray-100 dark:border-[#27272b] py-1">
                                            <p className="px-4 pb-1 pt-1.5 text-[10.5px] font-black uppercase tracking-[0.14em] text-[#94a3b8] dark:text-[#71717a]">
                                                Estabizz Jobs
                                            </p>
                                            {CANDIDATE_USER_MENU_ITEMS.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:bg-[#f5fbff] dark:hover:bg-[#12223a] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors dark:bg-[#141417]"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* My submissions (all logged-in users) */}
                                        <div className="border-b border-gray-100 dark:border-[#27272b] py-1">
                                            <Link
                                                href="/my-blogs"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:bg-[#f5fbff] dark:hover:bg-[#12223a] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors dark:bg-[#141417]"
                                            >
                                                My Submissions
                                            </Link>
                                            <Link
                                                href="/submit-blog"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:bg-[#f5fbff] dark:hover:bg-[#12223a] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors dark:bg-[#141417]"
                                            >
                                                Submit an Article
                                            </Link>
                                        </div>

                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors dark:bg-[#2a1618] dark:text-[#fca5a5]"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="text-[13.5px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa] transition-colors px-3 py-2">
                                Sign In
                            </Link>
                        )}

                        <ThemeToggle variant="icon-only" />
                        <CountrySelector selectorRef={desktopCountryRef} />
                        {!authUser && (
                            <Link href={nav.ctaHref} className="whitespace-nowrap text-[13px] 2xl:text-[13.5px] font-bold bg-[#1677f2] text-white rounded-xl px-4 2xl:px-6 py-2.5 hover:-translate-y-0.5 hover:bg-[#0866d9] transition-all shadow-[0_12px_28px_rgba(22,119,242,0.28)]">
                                {nav.ctaLabel}
                            </Link>
                        )}
                    </div>

                    <div className="xl:hidden flex items-center gap-2">
                        <CountrySelector compact selectorRef={compactCountryRef} />
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Open navigation menu">
                            <span className={`block w-6 h-0.5 bg-[#0a1628] dark:bg-[#fafafa] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#0a1628] dark:bg-[#fafafa] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#0a1628] dark:bg-[#fafafa] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mega Menu Dropdown */}
            {activeMenu && currentMenu && (
                <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}
                    /* max-h + overflow is the backstop, not the fix: the per-category
                       caps below keep every list short enough to read, but the panel is
                       `fixed` and the page behind it cannot be scrolled while it is open,
                       so without this a category that outgrows the viewport would again
                       put its last rows out of reach entirely. */
                    className="fixed left-0 top-[64px] z-[999] w-full max-h-[calc(100vh-64px)] overflow-y-auto border-b border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] shadow-[0_30px_90px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.50)] animate-[fadeIn_0.15s_ease]">
                    <div className="mx-auto flex max-w-[1480px] bg-white dark:bg-[#141417]">
                        {/* Left Categories */}
                        <div className="w-[240px] shrink-0 border-r border-blue-100 dark:border-[#27272b] py-4 bg-[#f8fbff] dark:bg-[#0f0f11]">
                            {currentMenu.categories.map((cat, i) => (
                                <Link key={i} href={cat.viewAll} onMouseEnter={() => setActiveCategory(i)} onFocus={() => setActiveCategory(i)} onClick={() => setActiveMenu(null)}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left text-[14px] transition-colors ${activeCategory === i ? "text-[#1677f2] font-bold bg-blue-50/50 dark:bg-[#1677f2]/10 border-l-[3px] border-[#1677f2] pl-[17px]" : "text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa] hover:bg-gray-50 dark:hover:bg-[#12223a] border-l-[3px] border-transparent pl-[17px] dark:bg-[#141417]"}`}>
                                    <span className="text-[16px]">{cat.icon}</span> {cat.label}
                                </Link>
                            ))}
                        </div>
                        {/* Right Content */}
                        <div className="flex-1 bg-white dark:bg-[#141417] p-6">
                            <h3 className="text-[18px] font-bold text-[#0a1628] dark:text-[#fafafa] mb-5">{currentMenu.categories[activeCategory]?.label}</h3>
                            {currentMenu.categories[activeCategory]?.groups ? (
                                <div className="space-y-4 overflow-y-auto max-h-[420px] pr-1">
                                    {currentMenu.categories[activeCategory].groups!.map((group, gi) => (
                                        <div key={gi}>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#64748b] dark:text-[#a1a1aa] mb-2 pb-1 border-b border-gray-100 dark:border-[#27272b]">{group.heading}</h4>
                                            <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                                                {group.items.map((item, j) => {
                                                    const isLive = !!linkMap[item];
                                                    return (
                                                        <Link key={j} href={linkMap[item] || "#"}
                                                            className={`flex items-center gap-2 text-[13.5px] transition-colors py-1 ${isLive ? 'text-[#1677f2] font-medium hover:text-[#0077B6] dark:text-[#4f9dfb]' : 'text-[#94a3b8] hover:text-[#64748b] dark:text-[#71717a]'}`}>
                                                            <span className={`${isLive ? 'text-[#1677f2] dark:text-[#4f9dfb]' : 'text-[#cbd5e1] dark:text-[#71717a]'} text-[8px] shrink-0`}>›</span>
                                                            {item}
                                                            {isLive && (
                                                                <span className="ml-1 px-1.5 py-0.5 rounded-[4px] bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold tracking-wider uppercase">Live</span>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : visibleItems.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-3 gap-x-8 gap-y-3 overflow-y-auto max-h-[420px] pr-1">
                                        {visibleItems.map((item, j) => {
                                            const isLive = !!linkMap[item];
                                            return (
                                                <Link
                                                    key={j}
                                                    href={linkMap[item] || "#"}
                                                    className={`flex items-center gap-2 text-[13.5px] transition-colors py-1 ${isLive ? 'text-[#1677f2] font-medium hover:text-[#0077B6] dark:text-[#4f9dfb]' : 'text-[#94a3b8] hover:text-[#64748b] dark:text-[#71717a]'}`}
                                                >
                                                    <span className={`${isLive ? 'text-[#1677f2] dark:text-[#4f9dfb]' : 'text-[#cbd5e1] dark:text-[#71717a]'} text-[8px]`}>›</span>
                                                    {item}
                                                    {isLive && (
                                                        <span className="ml-1 px-1.5 py-0.5 rounded-[4px] bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold tracking-wider uppercase">Live</span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    {hiddenCount > 0 && (
                                        <Link
                                            href={currentCategory?.viewAll ?? currentMenu.viewAll}
                                            onClick={() => setActiveMenu(null)}
                                            className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-blue-100 dark:border-[#27272b] bg-[#f5fbff] dark:bg-[#1c1c20] px-5 py-3.5 transition-colors hover:border-[#1677f2]/40"
                                        >
                                            <span className="text-[13.5px] font-bold text-[#0a1628] dark:text-[#fafafa]">
                                                +{hiddenCount} more {currentCategory?.label.toLowerCase()} services
                                                <span className="ml-2 font-medium text-[#64748b] dark:text-[#a1a1aa]">grouped by your situation</span>
                                            </span>
                                            <span className="shrink-0 text-[13px] font-bold text-[#1677f2] dark:text-[#4f9dfb]">Browse all →</span>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <p className="text-[14px] text-[#94a3b8] dark:text-[#71717a]">Upcoming content...</p>
                            )}
                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-[#27272b]">
                                <Link href={currentMenu.categories[activeCategory]?.viewAll ?? currentMenu.viewAll} className="text-[14px] font-bold text-[#1677f2] hover:underline dark:text-[#4f9dfb]">
                                    {currentMenu.categories[activeCategory]?.viewAllLabel ?? currentMenu.viewAllLabel}
                                </Link>
                                <span className="text-[13px] text-[#94a3b8] dark:text-[#a1a1aa]">Need help? <Link href="/contact" className="text-[#1677f2] underline dark:text-[#4f9dfb]">Talk to an expert</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white dark:bg-[#09090b] z-[98] overflow-y-auto xl:hidden">
                    <div className="p-6 space-y-4">
                        {/* Mobile search — inlined to avoid remount-on-rerender focus bug */}
                        <div ref={searchRef} className="relative w-full">
                            <label className="sr-only" htmlFor="mobile-page-search">Search pages</label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8] dark:text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                                </svg>
                                <input
                                    id="mobile-page-search"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => { setSearchQuery(event.target.value); setSearchOpen(true); }}
                                    onFocus={() => { setActiveMenu(null); setSearchOpen(true); }}
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Search pages..."
                                    className="w-full rounded-lg border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] pl-9 pr-3 text-[13.5px] font-medium text-[#0a1628] dark:text-[#fafafa] outline-none transition-all placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b] focus:border-[#1677f2] focus:ring-4 focus:ring-[#1677f2]/10 h-11"
                                    aria-expanded={searchOpen}
                                    aria-controls="mobile-page-search-results"
                                />
                            </div>
                            {searchOpen && (
                                <div id="mobile-page-search-results" className="mt-2 w-full overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-white dark:bg-[#141417] shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.40)]">
                                    <div className="border-b border-gray-100 dark:border-[#27272b] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#64748b] dark:text-[#a1a1aa]">
                                        {searchQuery.trim() ? "Search Results" : "Popular Pages"}
                                    </div>
                                    {searchResults.length > 0 ? (
                                        <div className="max-h-[330px] overflow-y-auto py-1">
                                            {searchResults.map((item) => (
                                                <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => { closeSearch(); setMobileOpen(false); }} className="flex items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-[#f5fbff] dark:hover:bg-[#12223a] dark:bg-[#141417]">
                                                    <span>
                                                        <span className="block text-[13.5px] font-bold text-[#0a1628] dark:text-[#fafafa]">{item.label}</span>
                                                        <span className="mt-0.5 block text-[11.5px] font-medium text-[#64748b] dark:text-[#a1a1aa]">{item.group}</span>
                                                    </span>
                                                    <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#1677f2] dark:text-[#4f9dfb]">Open</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-5 text-[13px] font-medium text-[#64748b] dark:text-[#a1a1aa]">No page found. Try RBI, IFSCA, NBFC, payment, insurance or SEBI.</div>
                                    )}
                                </div>
                            )}
                        </div>
                        {Object.entries(menus).map(([name, menu]) => (
                            <details key={name} className="rounded-xl border border-gray-100 dark:border-[#27272b] bg-[#f8faff] dark:bg-[#141417] px-4 py-2">
                                <summary className="text-[15px] font-bold text-[#0a1628] dark:text-[#fafafa] cursor-pointer py-2">{name}</summary>
                                <div className="mt-2 space-y-4 pb-2">
                                    {menu.categories.map((cat, i) => (
                                        <div key={i}>
                                            <h4 className="text-[12px] font-black text-[#1677f2] uppercase tracking-wide mb-2 dark:text-[#4f9dfb]">{cat.icon} {cat.label}</h4>
                                            {cat.groups ? (
                                                <div className="space-y-2">
                                                    {cat.groups.map((group, gi) => (
                                                        <details key={gi} className="rounded-lg border border-gray-100 dark:border-[#27272b] bg-white dark:bg-[#1c1c20]">
                                                            {/* No aria-expanded here (Phase 7B fix): <details>/<summary>
                                                                already expose their open/closed state natively to
                                                                assistive tech via the `open` attribute. The removed
                                                                value was hardcoded to "false" always, so it told a
                                                                screen reader the group was still collapsed even after
                                                                a sighted user had opened it -- actively wrong, not
                                                                just redundant. */}
                                                            <summary className="cursor-pointer px-3 py-2 text-[12px] font-bold text-[#334155] dark:text-[#a1a1aa]">
                                                                {group.heading}
                                                            </summary>
                                                            <div className="px-3 pb-2 space-y-1">
                                                                {group.items.map((item, j) => {
                                                                    const isLive = !!linkMap[item];
                                                                    return (
                                                                        <Link key={j} href={linkMap[item] || "/get-started"}
                                                                            onClick={() => setMobileOpen(false)}
                                                                            className={`block py-1.5 text-[12.5px] ${isLive ? 'text-[#1677f2] font-medium dark:text-[#4f9dfb]' : 'text-[#64748b] dark:text-[#a1a1aa]'}`}>
                                                                            › {item}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </details>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 gap-1">
                                                    {/* Prefer `featured` over the head of `items`: the
                                                        latter is alphabetical, so Legal's first four were
                                                        "Adulteration of Drugs" through "Appeal Before
                                                        NCLT" -- four niche pages standing in for 58. The
                                                        viewAll link below carries the rest. */}
                                                    {(cat.featured?.length ? cat.featured : cat.items).slice(0, 6).map((item, j) => {
                                                        const isLive = !!linkMap[item];
                                                        return (
                                                            <Link key={j} href={linkMap[item] || "/get-started"}
                                                                onClick={() => setMobileOpen(false)}
                                                                className={`block rounded-lg px-3 py-2 text-[13px] ${isLive ? 'text-[#0a1628] dark:text-[#fafafa] bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-[#27272b]' : 'text-[#64748b] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa]'}`}>
                                                                {item}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            <Link
                                                href={cat.viewAll}
                                                onClick={() => setMobileOpen(false)}
                                                className="mt-2 inline-flex min-h-10 items-center px-3 text-[12.5px] font-bold text-[#1677f2] dark:text-[#4f9dfb]"
                                            >
                                                {cat.viewAllLabel}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))}

                        {/* Jobs — mobile equivalent of the desktop Jobs dropdown. Flat list,
                            same four links, always shown regardless of auth state (candidate
                            account pages redirect through login safely on their own). */}
                        <details className="rounded-xl border border-gray-100 dark:border-[#27272b] bg-[#f8faff] dark:bg-[#141417] px-4 py-2">
                            <summary className="text-[15px] font-bold text-[#0a1628] dark:text-[#fafafa] cursor-pointer py-2">Jobs</summary>
                            <div className="mt-1 space-y-1 pb-2">
                                {[...JOBS_MENU_ITEMS, HIRE_TALENT_ITEM].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-[13.5px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:bg-white dark:hover:bg-[#12223a] hover:text-[#1677f2] dark:hover:text-[#60a5fa] dark:bg-[#141417]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </details>

                        {quickLinks.map((link, i) =>
                            link.newTab ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${i === 0 ? "" : "mt-2 "}flex items-center gap-2 rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-[#f0f9ff] dark:bg-[#141417] px-4 py-3 text-[14px] font-bold text-[#1677f2] cursor-pointer dark:text-[#4f9dfb]`}
                                >
                                    {link.icon} {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`${i === 0 ? "" : "mt-2 "}flex items-center gap-2 rounded-xl border border-[#dbe7f3] dark:border-[#27272b] bg-[#f0f9ff] dark:bg-[#141417] px-4 py-3 text-[14px] font-bold text-[#1677f2] dark:text-[#4f9dfb]`}
                                >
                                    {link.icon} {link.label}
                                </Link>
                            )
                        )}
                        <div className="border-t border-gray-100 dark:border-[#27272b] pt-4 mt-4">
                            {authUser ? (
                                <div className="mb-2">
                                    <div className="flex items-center gap-3 py-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1677f2] to-[#0077B6] text-[12px] font-black text-white uppercase">
                                            {authUser.firstName[0]}{authUser.lastName?.[0] ?? ""}
                                        </span>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#0a1628] dark:text-[#fafafa]">{authUser.firstName} {authUser.lastName}</p>
                                            <p className="text-[11px] text-[#64748b] dark:text-[#a1a1aa]">{authUser.email}</p>
                                        </div>
                                    </div>
                                    {/* Candidate account — mobile equivalent of the desktop user
                                        dropdown's Estabizz Jobs section. No functionality may be
                                        desktop-only. */}
                                    <div className="mb-2 mt-1 rounded-lg border border-gray-100 dark:border-[#27272b] py-1">
                                        <p className="px-1 pb-1 pt-1 text-[10.5px] font-black uppercase tracking-[0.14em] text-[#94a3b8] dark:text-[#71717a]">
                                            Estabizz Jobs
                                        </p>
                                        {CANDIDATE_USER_MENU_ITEMS.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="block px-1 py-2 text-[13.5px] font-semibold text-[#334155] dark:text-[#a1a1aa] hover:text-[#1677f2] dark:hover:text-[#60a5fa]"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="block w-full text-left text-[14px] font-semibold text-red-600 dark:text-red-400 py-2">
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-[15px] font-bold text-[#0a1628] dark:text-[#fafafa] py-2">Sign In</Link>
                            )}
                            <div className="flex items-center justify-between py-2">
                                <span className="text-[13px] font-semibold text-[#64748b] dark:text-[#a1a1aa]">Theme</span>
                                <ThemeToggle variant="compact" />
                            </div>
                            <details className="rounded-xl border border-blue-100 dark:border-[#27272b] bg-[#f8fbff] dark:bg-[#141417] px-4 py-2">
                                <summary className="cursor-pointer py-2 text-[15px] font-bold text-[#0a1628] dark:text-[#fafafa]">Country / Global Markets</summary>
                                <div className="mt-3 space-y-3 pb-2">
                                    {globalMarketRegions.map((group) => (
                                        <div key={group.region}>
                                            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1677f2] dark:text-[#4f9dfb]">{group.region}</h4>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {group.countries.map((country) => (
                                                    <Link
                                                        key={country}
                                                        href={countryHref(country)}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="rounded-full border border-blue-100 dark:border-[#3f3f46] bg-white dark:bg-[#1c1c20] px-3 py-1.5 text-[11.5px] font-bold text-[#334155] dark:text-[#a1a1aa]"
                                                    >
                                                        {country}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>
                        {!authUser && (
                            <Link href={nav.ctaHref} onClick={() => setMobileOpen(false)} className="block w-full text-center bg-[#1677f2] dark:bg-[#1677f2] text-white font-bold text-[14px] rounded-lg py-3 mt-4">{nav.ctaLabel}</Link>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </>
    );
}
