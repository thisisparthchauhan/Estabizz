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

export interface SolutionCategory {
  /** URL segment: /solutions/<slug>. */
  slug: string;
  label: string;
  icon: string;
  tagline: string;
  /** Long-form pages served from this repo at /solutions/<slug>/<page slug>. */
  pages: ServicePageContent[];
  /** Related pages that still live at their original URL. */
  externalServices: ExternalService[];
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
    icon: "📜",
    tagline: "Transaction diligence, legal process support and contractual documentation.",
    pages: [],
    externalServices: [
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

/** Every long-form page, for generateStaticParams and the sitemap. */
export function allServicePages(): Array<{ category: string; page: ServicePageContent }> {
  return SOLUTION_CATEGORIES.flatMap((c) => c.pages.map((page) => ({ category: c.slug, page })));
}
