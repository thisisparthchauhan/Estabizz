// ─────────────────────────────────────────────────────────────────────────────
// Footer default content — SINGLE SOURCE OF TRUTH.
//
// Plain data (no JSX, no "use client", no server imports) so it can be imported
// by BOTH:
//   • the public Footer component (client) — as the built-in fallback, and
//   • lib/content/defaults.ts (server)      — what getContent() serves until an
//     admin edits the block.
//
// Edit links here to change the hardcoded defaults; once an admin saves footer
// content in the CMS, the live values from the database take over.
// ─────────────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  description: string;
  address: string;
  phone: string;
  email: string;
  cin: string;
  instagramUrl: string;
  linkedinUrl: string;
  copyright: string;
  columns: FooterColumn[];
  regulators: FooterLink[];
}

export const FOOTER_DEFAULTS: FooterContent = {
  description:
    'Structured regulatory advisory and compliance infrastructure partner for Indian and global businesses.',
  address:
    '15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421',
  phone: '+91 98256 00907',
  email: 'info@estabizz.com',
  cin: 'U74999GJ2021PTC123384',
  instagramUrl: 'https://www.instagram.com/estabizzlegal/',
  linkedinUrl: 'https://www.linkedin.com/company/estabizz-fintech/',
  copyright: '© 2026 Estabizz Fintech Private Limited. All rights reserved.',

  columns: [
    {
      title: 'About',
      links: [
        { label: 'Our Services', href: '/services' },
        { label: 'Regulatory Insights', href: '/blogs' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Regulatory Expertise',
      links: [
        { label: 'RBI Licensing & Compliance', href: '/rbi' },
        { label: 'SEBI Registrations', href: '/sebi' },
        { label: 'IRDAI Licensing', href: '/irdai' },
        { label: 'IFSCA & GIFT City', href: '/ifsca' },
        { label: 'FIU & AML Frameworks', href: '/fiu-ind-aml' },
        { label: 'Compliance Services', href: '/regulatory/compliance' },
        { label: 'NBFC Compliance', href: '/rbi/nbfc-legal-support' },
        { label: 'AIF Compliance', href: '/sebi/aif-compliance-test-report' },
      ],
    },
    {
      title: 'Corporate & Sectoral Services',
      links: [
        { label: 'Company Incorporation', href: '/mca-roc/company-registration-in-india' },
        { label: 'Annual ROC Compliance', href: '/services/enterprise-services' },
        { label: 'Tax & Audit', href: '/services/finance-accounting-outsourcing' },
        { label: 'Sectoral Licences', href: '/gov-lic' },
        { label: 'IPR & Trademark', href: '/solutions/ipr' },
      ],
    },
    {
      title: 'Compliance Portal',
      links: [
        { label: 'Estabizz Compliance Hub', href: '/login' },
        { label: 'Regulatory Dashboard', href: '/login' },
        { label: 'Licence Tracker', href: '/login' },
        { label: 'Document Vault', href: '/login' },
        { label: 'Policy Library', href: '/login' },
        { label: 'Compliance Calendar', href: '/login' },
      ],
    },
    {
      title: 'Knowledge & Resources',
      links: [
        { label: 'Regulatory Updates', href: '/resources/regulatory-updates' },
        // Phase 7B: was href '/' -- a dead-end click to the homepage top
        // rather than the Case Studies section, which has no id to land on.
        { label: 'Case Highlights', href: '/#case-highlights' },
        { label: 'FAQs', href: '/resources/faqs' },
        { label: 'Guides & Insights', href: '/resources' },
      ],
    },
    {
      // Phase 7A: Jobs previously had no public footer presence at all — the
      // only "Careers" link in this file lived in the excluded "Company &
      // Network" column above and pointed at /contact, not the Jobs system.
      title: 'Jobs & Careers',
      links: [
        { label: 'Find Jobs', href: '/jobs' },
        { label: 'Candidate Account', href: '/jobs/account' },
        { label: 'My Profile', href: '/jobs/account/profile' },
        { label: 'My Applications', href: '/jobs/account/applications' },
        { label: 'Job Alerts', href: '/jobs/account/alerts' },
        { label: 'Join Estabizz', href: '/jobs/join' },
        { label: 'Hire Talent', href: '/jobs/hire-talent' },
      ],
    },
    {
      title: 'Legal & Transparency',
      links: [
        { label: 'Privacy Policy', href: '/legal/privacy-policy' },
        { label: 'Terms & Conditions', href: '/legal/terms-conditions' },
        { label: 'Refund Policy', href: '/legal/refund-policy' },
        { label: 'Disclaimer', href: '/legal/privacy-policy' },
        { label: 'Cookie Policy', href: '/legal/privacy-policy' },
      ],
    },
    {
      title: 'Company & Network',
      links: [
        { label: 'Associate Professional Partner', href: '/contact' },
        { label: 'Careers', href: '/jobs' },
        { label: 'Team Estabizz', href: '/contact' },
        // Phase 7B: was '/contact' -- a dedicated /pricing page exists and is
        // already in sitemap.ts; corrected even though this column is hidden
        // (EXCLUDED_COL_TITLES in Footer.tsx), same reasoning as the Phase 7A
        // "Careers" fix in this same column.
        { label: 'Pricing', href: '/pricing' },
        { label: 'Estabizz Compliance Network', href: '/contact' },
      ],
    },
  ],

  regulators: [
    { label: 'RBI', href: '/rbi' },
    { label: 'SEBI', href: '/sebi' },
    { label: 'IRDAI', href: '/irdai' },
    { label: 'IFSCA', href: '/ifsca' },
    { label: 'MCA', href: '/mca-roc' },
    { label: 'FIU-IND', href: '/fiu-ind-aml' },
    { label: 'PMLA', href: '/fiu-ind-aml/pmla-compliance-advisory' },
    { label: 'ROC', href: '/mca-roc' },
  ],
};
