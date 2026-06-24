// ─────────────────────────────────────────────────────────────────────────────
// Homepage Hero default content — SINGLE SOURCE OF TRUTH (plain data, no JSX).
// Shared by the public HeroSection component and the CMS defaults registry.
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroContent {
  welcomeLabel: string;
  headingPrefix: string;
  /** Rotating words after the heading prefix */
  rotatingWords: string[];
  subheading: string;
  supportLine: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  /** Trust stat chips, e.g. "500+ Licences Obtained" */
  trustStats: string[];
  /** Scrolling service pills */
  servicePills: string[];
}

export const HERO_DEFAULTS: HeroContent = {
  welcomeLabel: 'Welcome to Estabizz',
  headingPrefix: 'Your Trusted Partner for',
  rotatingWords: [
    'RBI Licensing',
    'SEBI Registration',
    'IRDAI Compliance',
    'IFSCA GIFT City',
    'AML & FIU Advisory',
    'Global Market Entry',
  ],
  subheading:
    'Expert regulatory guidance for RBI, SEBI, IRDAI, IFSCA and allied government licences. Estabizz manages licensing, documentation and compliance readiness so founders and compliance teams can move with clarity.',
  supportLine: 'We support India-first businesses expanding into global markets.',
  primaryBtnText: 'Schedule a Consultation',
  primaryBtnLink: '/contact',
  secondaryBtnText: 'Explore Services',
  secondaryBtnLink: '/regulatory',
  trustStats: [
    '500+ Licences Obtained',
    '1000+ Businesses Served',
    '100+ Associate Professionals',
    'India + Global Market Desk',
  ],
  servicePills: [
    'NBFC', 'Payment Aggregator', 'AIF', 'PMS', 'RIA',
    'Stock Broker', 'Insurance Broker', 'FME', 'ITFS', 'FIU-IND',
  ],
};
