// ─────────────────────────────────────────────────────────────────────────────
// /solutions route map.
//
// Solutions is the PRACTICE-AREA hierarchy (IPR, Legal, Compliance Calendar,
// CFO), as opposed to /regulatory which is the LICENCE hierarchy (RBI, SEBI,
// IRDAI, IFSCA). It mirrors the Solutions dropdown in components/layout/
// Navbar.tsx; both read the category list from here so a category cannot exist
// in one and not the other.
//
// Each category owns the long-form pages under /solutions/<category>/<slug>.
// A category may also point at pages that still live at their original URL --
// `externalServices` -- so the hub can list everything it is responsible for
// without those pages having to move first. Moving them is a separate,
// redirect-backed migration; see docs for the proposed map.
// ─────────────────────────────────────────────────────────────────────────────
import type { ServicePageContent } from "@/lib/content/services/types";
import { copyrightWebsite } from "@/lib/content/services/ipr/copyrightWebsite";
import { copyrightRegistration } from "@/lib/content/services/ipr/copyrightRegistration";
import { designRegistration } from "@/lib/content/services/ipr/designRegistration";
import { patentRegistration } from "@/lib/content/services/ipr/patentRegistration";
import { trademarkRegistration } from "@/lib/content/services/ipr/trademarkRegistration";
import { trademarkAssignment } from "@/lib/content/services/ipr/trademarkAssignment";
import { trademarkClasses } from "@/lib/content/services/ipr/trademarkClasses";
import { trademarkObjection } from "@/lib/content/services/ipr/trademarkObjection";
import { trademarkOpposition } from "@/lib/content/services/ipr/trademarkOpposition";

export interface ExternalService {
  title: string;
  description: string;
  href: string;
}

/**
 * A need-based grouping inside one category.
 *
 * Legal carries 58 services. An alphabetical wall of 58 cards is a list you
 * scroll past, not one you choose from: a visitor arrives knowing their
 * problem ("my cheque bounced", "I want a mutual divorce"), not the name we
 * filed it under. Topics let the hub page lead with the problem.
 *
 * `services` holds TITLES, matched against both `pages[].hero.heading` and
 * `externalServices[].title`. Anything a topic does not claim still renders --
 * see groupCategoryByTopic -- so adding a service without touching this list
 * degrades to "also in this category" rather than hiding the page.
 */
export interface CategoryTopic {
  heading: string;
  /** One line telling a visitor whether this is their situation. */
  blurb: string;
  services: string[];
}

export interface SolutionCategory {
  /** URL segment: /solutions/<slug>. */
  slug: string;
  label: string;
  icon: string;
  tagline: string;
  /** Optional page heading. `label` stays short for breadcrumbs and navigation;
   *  this is what the category page shows as its H1. */
  h1?: string;
  /** Long-form pages served from this repo at /solutions/<slug>/<page slug>. */
  pages: ServicePageContent[];
  /** Related pages that still live at their original URL. */
  externalServices: ExternalService[];
  /** Optional need-based sections for the hub page. Long categories only. */
  topics?: CategoryTopic[];
}

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    slug: "startups",
    label: "Startups & New Businesses",
    icon: "🚀",
    tagline: "Company formation, tax enquiries, brand protection and business licensing support.",
    pages: [],
    externalServices: [
      { title: "Company Incorporation", description: "Explore company registration, documentation and the incorporation process.", href: "/mca-roc/company-registration-in-india" },
      { title: "GST Registration Enquiry", description: "Discuss your GST registration requirements with the team.", href: "/contact?service=GST%20Registration" },
      { title: "Trademark Search", description: "Check trademark availability before filing.", href: "/services/trademark-search" },
      { title: "FSSAI Licence", description: "Registration and licensing support for food businesses.", href: "/gov-lic/fssai-licence" },
    ],
  },
  {
    slug: "ipr",
    label: "IPR",
    icon: "⚖️",
    tagline:
      "Copyright, design, patent and trademark protection for content, code, inventions, product appearance and brand assets.",
    pages: [
      copyrightWebsite,
      copyrightRegistration,
      designRegistration,
      patentRegistration,
      trademarkRegistration,
      trademarkClasses,
      trademarkObjection,
      trademarkOpposition,
      trademarkAssignment,
    ],
    externalServices: [
      {
        title: "Trademark Search",
        description: "Pre-filing trademark availability search and class identification.",
        href: "/services/trademark-search",
      },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    h1: "Legal Services in India",
    icon: "📜",
    tagline:
      "Litigation support, corporate legal advisory, property documentation, recovery matters, succession, regulatory defence and transaction due diligence across India.",
    pages: [],
    externalServices: [
      {
        title: "Adulteration of Drugs",
        description:
          "CDSCO and State Drug Control notices, drug sample failure, seizure, recall strategy, licence risk and prosecution defence.",
        href: "/solutions/legal/adulteration-of-drugs-legal-services",
      },
      {
        title: "Appeal Before High Court",
        description:
          "Conviction and acquittal appeals, sentence matters, suspension of sentence and bail pending appeal under BNS, BNSS and BSA.",
        href: "/solutions/legal/appeal-before-high-court",
      },
      {
        title: "Appeal Before ITAT",
        description:
          "Income-tax appeals before the Tribunal — appealability, limitation, the correct appeal form, stay of demand and paper book preparation.",
        href: "/solutions/legal/appeal-before-itat",
      },
      {
        title: "NCLT Legal Services",
        description:
          "Company petitions, struck-off company restoration, oppression and mismanagement, IBC applications, schemes and NCLAT appeals.",
        href: "/solutions/legal/appeal-before-nclt",
      },
      {
        title: "Cheque Bounce in India",
        description:
          "Section 138 notice and complaint deadlines, company and director liability, interim compensation, settlement and civil recovery.",
        href: "/solutions/legal/cheque-bounce-in-india",
      },
      {
        title: "Caveat Filing",
        description:
          "Preventive filing under Section 148A CPC to seek prior notice where an application is expected, reducing the risk of an interim order being made without notice.",
        href: "/solutions/legal/caveat-filing",
      },
      {
        title: "Complaints Before Consumer Court",
        description:
          "Consumer Protection Act, 2019 complaints — correct Commission, limitation, evidence, relief calculation and e-Jagriti filing support.",
        href: "/solutions/legal/complaints-before-consumer-court",
      },
      {
        title: "Court Proceedings",
        description:
          "Forum, limitation, pleadings, interim relief, evidence, hearings, orders, appeal routes and execution across civil, criminal and tribunal matters.",
        href: "/solutions/legal/court-proceedings",
      },
      {
        title: "Cyber Crime Complaint",
        description:
          "Online fraud reporting through 1930 and the cyber portal, digital evidence preservation, bank liability, account freeze support and FIR strategy.",
        href: "/solutions/legal/cyber-crime-complaint",
      },
      {
        title: "Cyber Security Advisory",
        description:
          "IT Act and SPDI compliance, CERT-In six-hour incident reporting and log retention, DPDP readiness ahead of 2027, VAPT coordination and vendor risk.",
        href: "/solutions/legal/cyber-security-advisory",
      },
      {
        title: "Defamation Notice",
        description:
          "Pre-litigation notice for false allegations, posts and fake reviews — takedown, apology, retraction, compensation and platform escalation.",
        href: "/solutions/legal/defamation-notice",
      },
      {
        title: "Demerger",
        description:
          "Scheme of arrangement under Sections 230 to 232, the NCLT process, tax neutrality under Section 2(19AA), valuation, SEBI, CCI and FEMA review.",
        href: "/solutions/legal/demerger",
      },
      {
        title: "Directors Disqualification",
        description:
          "Section 164(2) defaults, the Section 167 proviso and which directorships vacate, DIN versus disqualification, DIR-10 timing and struck-off company revival.",
        href: "/solutions/legal/directors-disqualification",
      },
      {
        title: "Faulty Product Notice",
        description:
          "Legal notice for defective goods and warranty denial, product liability under Sections 82 to 87, e-commerce escalation and the two-year limitation.",
        href: "/solutions/legal/faulty-product-notice",
      },
      {
        title: "Food Adulteration",
        description:
          "FSSAI notices, unsafe and sub-standard food allegations, sampling and the referral laboratory right, licence risk and the revised Jan Vishwas penalties.",
        href: "/solutions/legal/food-adulteration-legal-services",
      },
      {
        title: "General Legal Notice",
        description:
          "Where a notice is legally mandatory and with what period, the anatomy of a notice that works, service and proof, limitation and replying to one.",
        href: "/solutions/legal/general-legal-notice",
      },
      {
        title: "Gift Deed Registration",
        description:
          "Transfer of Property Act Sections 122 to 129, registration and two witnesses, acceptance, revocation limits, stamp duty, Section 56(2)(x) tax and mutation.",
        href: "/solutions/legal/gift-deed-registration",
      },
      {
        title: "TRAI & TDSAT Legal Support",
        description:
          "TRAI Act and the Telecommunications Act, 2023, tariff and interconnection, quality of service, UCC compliance, regulatory notices and TDSAT coordination.",
        href: "/solutions/legal/lawyer-for-trai-matters",
      },
      {
        title: "Lease Agreement Drafting",
        description:
          "Residential and commercial leases — registration threshold, Section 106 notice periods, lock-in, security deposit, repairs, rent control and termination.",
        href: "/solutions/legal/lease-agreement-drafting",
      },
      {
        title: "Loan Recovery Notice",
        description:
          "Limitation on money lent and how an acknowledgement restarts it, route selection across civil, summary suit, cheque, SARFAESI, DRT and IBC, and guarantor liability.",
        href: "/solutions/legal/loan-recovery-notice",
      },
      {
        title: "Mergers and Acquisitions",
        description:
          "Structure comparison, legal due diligence, the NCLT scheme route, the CCI deal value threshold, SEBI takeover code, FEMA, closing and post-closing compliance.",
        href: "/solutions/legal/mergers-and-acquisitions",
      },
      {
        title: "Motor Accident Claims Tribunal",
        description:
          "MACT compensation claims — Section 166 fault claims and Section 164 fixed compensation, the six-month limitation position, DAR, computation and award execution.",
        href: "/solutions/legal/motor-accident-claims-tribunal",
      },
      {
        title: "Non Payment of Salary",
        description:
          "Unpaid salary and F&F under the Code on Wages — the two-working-day exit rule, three-year limitation, compensation up to ten times the dues and lawful deductions.",
        href: "/solutions/legal/non-payment-of-salary",
      },
      {
        title: "Probate Service",
        description:
          "Probate after Section 213 was omitted in December 2025 — when a grant is still worth obtaining, letters of administration, caveats, witness proof and court fees.",
        href: "/solutions/legal/probate-service",
      },
      {
        title: "Property Registration",
        description:
          "Compulsory registration under Section 17, the four-month window, why a deed operates from execution, stamp duty and circle rate, and TDS now under Section 393 with Form 141.",
        href: "/solutions/legal/property-registration",
      },
      {
        title: "Property Valuation",
        description:
          "Which registration a valuer needs for which purpose, the Section 78 stamp duty value rule and its 110 per cent tolerance, valuation methods and report review.",
        href: "/solutions/legal/property-valuation",
      },
      {
        title: "Property Verification",
        description:
          "Title chain and link documents, what an encumbrance certificate misses, lis pendens, GPA sale risk, RERA versus title, succession claims and a risk-rated report before you pay.",
        href: "/solutions/legal/property-verification",
      },
      {
        title: "Public Interest Litigation",
        description:
          "Article 32 and Article 226 routes, the Balwant Singh Chaufal credential checks, the NGT forum question, RTI groundwork, respondent mapping and relief a court can grant.",
        href: "/solutions/legal/public-interest-litigation",
      },
      {
        title: "Recovery From Debtors",
        description:
          "Forum selection for business receivables — the MSMED 45-day rule and punitive interest, Section 12A mediation, summary suits, the one crore IBC threshold and execution.",
        href: "/solutions/legal/recovery-from-debtors",
      },
      {
        title: "Recovery Notice of Dues",
        description:
          "Computing the claim net of credits and TDS, stating the interest basis, acknowledgement and limitation, service and proof, and how a careless notice creates a dispute.",
        href: "/solutions/legal/recovery-notice-of-dues",
      },
      {
        title: "Refund of Security Deposit Notice",
        description:
          "Why forfeiture needs proof of loss under Section 74, wear and tear versus damage, Model Tenancy deposit caps, and why a landlord claim is usually not a consumer complaint.",
        href: "/solutions/legal/refund-of-security-deposit-notice",
      },
      {
        title: "Relinquishment Deed",
        description:
          "Inherited and co-owned property share release, legal-heir mapping, State-specific stamp duty, registration, NRI execution and mutation support.",
        href: "/solutions/legal/relinquishment-deed",
      },
      {
        title: "Revival of Struck-Off Companies",
        description:
          "Section 252 NCLT restoration, STK-7 and limitation review, evidence preparation, ROC implementation and post-revival compliance.",
        href: "/solutions/legal/revival-of-struck-off-companies",
      },
      {
        title: "Sexual Harassment at Workplace Compliance",
        description:
          "POSH policy, Internal Committee formation, training, complaint procedures, annual reporting and confidential compliance documentation.",
        href: "/solutions/legal/sexual-harassment-at-workplace-compliance",
      },
      {
        title: "Special Leave Petition",
        description:
          "Article 136 Supreme Court challenge support, limitation review, questions of law, interim relief, paper-book readiness and AOR coordination.",
        href: "/solutions/legal/special-leave-petition",
      },
      {
        title: "Succession Certificate",
        description:
          "Court-backed claims for bank balances, fixed deposits, shares and securities, with heir mapping, asset schedules and petition support.",
        href: "/solutions/legal/succession-certificate",
      },
      {
        title: "Tenant Eviction Notice",
        description:
          "Lease review, rent-default and termination grounds, Section 106 notice, arrears, lawful service and possession-recovery strategy.",
        href: "/solutions/legal/tenant-eviction-notice",
      },
      {
        title: "Weights and Measures Offences",
        description:
          "Legal Metrology notices, the improvement notice route for first-time lapses, packaged commodity and e-commerce declarations, compounding and appeals.",
        href: "/solutions/legal/weights-and-measures-offences",
      },
      {
        title: "Will Registration",
        description:
          "Will drafting and registration, asset schedules, beneficiaries, executors, witnesses, nomination alignment and succession planning.",
        href: "/solutions/legal/will-registration",
      },
      {
        title: "Winding Up of Companies",
        description:
          "Section 271 Tribunal winding up, IBC voluntary liquidation, strike-off assessment, creditor and liquidator coordination, and dissolution.",
        href: "/solutions/legal/winding-up-of-companies",
      },
      {
        title: "Writ Petition",
        description:
          "Article 32, 226 and 227 remedies, maintainability, jurisdiction, authority inaction, illegal orders and interim-relief strategy.",
        href: "/solutions/legal/writ-petition",
      },
      {
        title: "Legal Due Diligence",
        description:
          "Comprehensive legal due diligence for mergers, acquisitions and investment transactions.",
        href: "/services/legal-due-diligence",
      },
      {
        title: "Legal Process Outsourcing",
        description:
          "Cost-effective legal process outsourcing for law firms and corporate legal departments.",
        href: "/services/legal-process-outsourcing",
      },
    ],
    topics: [
      {
        heading: "Courts, Appeals & Petitions",
        blurb: "Carrying a matter up to the Tribunal, High Court or Supreme Court, or guarding against an ex-parte order.",
        services: [
          "Court Proceedings",
          "Appeal Before High Court",
          "NCLT Legal Services",
          "Appeal Before ITAT",
          "Special Leave Petition",
          "Writ Petition",
          "Public Interest Litigation",
          "Caveat Filing",
        ],
      },
      {
        heading: "Property, Rent & Deeds",
        blurb: "Buying, verifying, gifting, releasing, letting or recovering immovable property.",
        services: [
          "Property Registration",
          "Property Verification",
          "Property Valuation",
          "Gift Deed Registration",
          "Relinquishment Deed",
          "Lease Agreement Drafting",
          "Tenant Eviction Notice",
          "Refund of Security Deposit Notice",
        ],
      },
      {
        heading: "Money Recovery & Legal Notices",
        blurb: "Somebody owes you money, or a dispute needs a notice before it reaches a court.",
        services: [
          "Cheque Bounce in India",
          "Loan Recovery Notice",
          "Recovery From Debtors",
          "Recovery Notice of Dues",
          "General Legal Notice",
          "Defamation Notice",
          "Faulty Product Notice",
        ],
      },
      {
        heading: "Wills, Probate & Succession",
        blurb: "Passing on assets, or establishing your right to assets left behind.",
        services: ["Will Registration", "Probate Service", "Succession Certificate"],
      },
      {
        heading: "Company, M&A & Corporate Legal",
        blurb: "Restructuring, closing, reviving or diligencing a company, and director liability.",
        services: [
          "Mergers and Acquisitions",
          "Demerger",
          "Directors Disqualification",
          "Revival of Struck-Off Companies",
          "Winding Up of Companies",
          "Legal Due Diligence",
          "Legal Process Outsourcing",
        ],
      },
      {
        heading: "Employment & Workplace",
        blurb: "Dues withheld on exit, and the committee and policy stack an employer must hold.",
        services: ["Non Payment of Salary", "Sexual Harassment at Workplace Compliance"],
      },
      {
        heading: "Consumer, Cyber & Regulatory Action",
        blurb: "A regulator, a platform or a seller is on the other side of the dispute.",
        services: [
          "Complaints Before Consumer Court",
          "Cyber Crime Complaint",
          "Cyber Security Advisory",
          "Motor Accident Claims Tribunal",
          "Food Adulteration",
          "Adulteration of Drugs",
          "Weights and Measures Offences",
          "TRAI & TDSAT Legal Support",
        ],
      },
    ],
  },
  {
    slug: "compliance-calendar",
    label: "Compliance Calendar",
    icon: "📅",
    tagline: "Due-date tracking, regulatory updates and circular explainers in one place.",
    pages: [],
    externalServices: [
      { title: "Compliance Calendar", description: "Statutory due dates tracked by entity and licence.", href: "/resources/compliance-calendar" },
      { title: "Regulatory Updates",  description: "Notifications, circulars and amendments as they are issued.", href: "/resources/regulatory-updates" },
      { title: "Circular Explainers", description: "Plain-language breakdowns of what a circular changes.", href: "/resources/circular-explainers" },
      { title: "Compliance FAQs",     description: "Answers to recurring compliance questions.", href: "/resources/faqs" },
    ],
  },
  {
    slug: "cfo",
    label: "CFO Service",
    icon: "💼",
    tagline: "Finance, accounting, transfer pricing and corporate governance support.",
    pages: [],
    externalServices: [
      { title: "Finance & Accounting Outsourcing", description: "Outsourced finance and accounting for businesses of all sizes.", href: "/services/finance-accounting-outsourcing" },
      { title: "Transfer Pricing",     description: "Transfer pricing study, documentation and compliance.", href: "/services/transfer-pricing" },
      { title: "Annual ROC Compliance", description: "Annual filings, registers and secretarial compliance.", href: "/services/enterprise-services" },
      { title: "Corporate Governance", description: "Board process, policy stack and governance documentation.", href: "/services/enterprise-services" },
    ],
  },
];

export function getCategory(slug: string): SolutionCategory | undefined {
  return SOLUTION_CATEGORIES.find((c) => c.slug === slug);
}

export function getServicePage(categorySlug: string, pageSlug: string): ServicePageContent | undefined {
  return getCategory(categorySlug)?.pages.find((p) => p.slug === pageSlug);
}

/** One service as the hub page renders it, whatever its source. */
export interface CategoryEntry {
  title: string;
  description: string;
  href: string;
  /** A long-form guide in this repo, versus a service page at its own URL. */
  kind: "guide" | "service";
  /** Sections + FAQs, shown only for guides. */
  meta?: string;
}

/** Flatten a category's pages and external services into one list. */
export function categoryEntries(category: SolutionCategory): CategoryEntry[] {
  return [
    ...category.pages.map((page): CategoryEntry => ({
      title: page.hero.heading,
      description: page.seo.description,
      href: `/solutions/${category.slug}/${page.slug}`,
      kind: "guide",
      meta: `${page.sections.length} sections · ${page.faqs.length} FAQs`,
    })),
    ...category.externalServices.map((svc): CategoryEntry => ({
      title: svc.title,
      description: svc.description,
      href: svc.href,
      kind: "service",
    })),
  ];
}

export interface CategoryTopicGroup {
  heading: string;
  blurb: string;
  entries: CategoryEntry[];
}

/**
 * Split a category into its topics.
 *
 * Deliberately total: every entry lands in exactly one group, and anything no
 * topic claims is swept into a trailing "More in this category" group rather
 * than dropped. A service added to the registry without being assigned a topic
 * therefore still reaches the page -- the failure mode is an untidy heading,
 * not an orphaned page nobody can navigate to.
 */
export function groupCategoryByTopic(category: SolutionCategory): CategoryTopicGroup[] {
  const entries = categoryEntries(category);
  if (!category.topics?.length) {
    return [{ heading: category.label, blurb: category.tagline, entries }];
  }

  const byTitle = new Map(entries.map((e) => [e.title, e]));
  const claimed = new Set<string>();

  const groups = category.topics.map((topic) => ({
    heading: topic.heading,
    blurb: topic.blurb,
    entries: topic.services.flatMap((title) => {
      const entry = byTitle.get(title);
      if (!entry || claimed.has(title)) return [];
      claimed.add(title);
      return [entry];
    }),
  })).filter((g) => g.entries.length > 0);

  const leftovers = entries.filter((e) => !claimed.has(e.title));
  if (leftovers.length > 0) {
    groups.push({
      heading: "More in this category",
      blurb: `Further ${category.label.toLowerCase()} services.`,
      entries: leftovers,
    });
  }

  return groups;
}

/** Every long-form page, for generateStaticParams and the sitemap. */
export function allServicePages(): Array<{ category: string; page: ServicePageContent }> {
  return SOLUTION_CATEGORIES.flatMap((c) => c.pages.map((page) => ({ category: c.slug, page })));
}
