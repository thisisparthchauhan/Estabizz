import type { BlogCategory } from './types';

/**
 * Master list of blog categories.
 * When moving to a real backend, this array becomes the seed data for the
 * categories collection / table.  The `id` values are stable slugs so they
 * can be used as foreign keys in any database schema.
 */
export const blogCategories: BlogCategory[] = [
  {
    id: 'cat_rbi',
    name: 'RBI Regulatory Updates',
    slug: 'rbi-regulatory-updates',
    description:
      'Licensing, compliance and regulatory updates from the Reserve Bank of India covering NBFCs, payment systems, forex and banking regulation.',
    icon: '🏦',
    color: '#0096D6',
  },
  {
    id: 'cat_sebi',
    name: 'SEBI Compliance',
    slug: 'sebi-compliance',
    description:
      'SEBI registration, compliance obligations and regulatory framework for capital market intermediaries, funds and investment advisers.',
    icon: '📈',
    color: '#0077B6',
  },
  {
    id: 'cat_irdai',
    name: 'IRDAI Licensing',
    slug: 'irdai-licensing',
    description:
      'Insurance regulatory compliance, intermediary licensing and IRDAI framework for brokers, corporate agents and web aggregators.',
    icon: '🛡️',
    color: '#0096D6',
  },
  {
    id: 'cat_ifsca',
    name: 'IFSCA & GIFT City',
    slug: 'ifsca-gift-city',
    description:
      'GIFT IFSC entity setup, IFSCA licensing, finance company registration and GIFT City regulatory framework for global businesses.',
    icon: '🌐',
    color: '#0077B6',
  },
  {
    id: 'cat_nbfc',
    name: 'NBFC Registration',
    slug: 'nbfc-registration',
    description:
      'NBFC licensing, registration requirements and ongoing RBI compliance for non-banking finance companies of all categories.',
    icon: '🏛️',
    color: '#0096D6',
  },
  {
    id: 'cat_payment',
    name: 'Payment Aggregator & Fintech',
    slug: 'payment-aggregator-fintech',
    description:
      'Payment aggregator licenses, PPI registration, digital lending compliance and fintech regulatory guidance from RBI.',
    icon: '💳',
    color: '#0077B6',
  },
  {
    id: 'cat_insurance',
    name: 'Insurance Broker Licensing',
    slug: 'insurance-broker-licensing',
    description:
      'IRDAI direct broker, reinsurance broker, composite broker and corporate agent registration processes and compliance.',
    icon: '📋',
    color: '#0096D6',
  },
  {
    id: 'cat_aif',
    name: 'AIF, PMS & RIA',
    slug: 'aif-pms-ria',
    description:
      'SEBI registration for alternative investment funds, portfolio management services, registered investment advisers and research analysts.',
    icon: '📊',
    color: '#0077B6',
  },
  {
    id: 'cat_fiu',
    name: 'FIU-IND & PMLA',
    slug: 'fiu-ind-pmla',
    description:
      'Anti-money laundering compliance, FIU-IND registration, PMLA reporting obligations and AML policy framework for regulated entities.',
    icon: '🔍',
    color: '#0096D6',
  },
  {
    id: 'cat_mca',
    name: 'MCA & ROC Compliance',
    slug: 'mca-roc-compliance',
    description:
      'Company incorporation, annual MCA filings, ROC compliance, board governance and corporate legal obligations.',
    icon: '⚖️',
    color: '#0077B6',
  },
  {
    id: 'cat_global',
    name: 'Global Business Setup',
    slug: 'global-business-setup',
    description:
      'Cross-border entity setup, FEMA compliance, India entry strategy and international market regulatory guidance.',
    icon: '🌏',
    color: '#0096D6',
  },
  {
    id: 'cat_govt',
    name: 'Government Licences',
    slug: 'government-licences',
    description:
      'FSSAI, BIS, APEDA, AYUSH, drug licence and other central and state government licences and registrations.',
    icon: '🏅',
    color: '#0077B6',
  },
];

/** Quick lookup by slug — O(1) after first call */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
