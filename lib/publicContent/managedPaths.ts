export const PUBLIC_CONTENT_MANAGED_PATHS = [
  '/rbi/nbfc-registration-in-india',
  '/rbi/payment-aggregator-license-in-india',
  '/rbi/ppi-registration-in-india',
  '/rbi/arc-registration-in-india',
  '/rbi/nbfc-sro-registration',
  '/rbi/lendtech-services',
  '/rbi/nbfc-aa-license-guide',
  '/rbi/nbfc-account-aggregator-license',
  // Phase 4N additions
  '/rbi/full-fledged-money-changers',
  '/rbi/nbfc-financial-modeling',
  '/rbi/nbfc-for-sale',
  '/rbi/nbfc-legal-support',
  '/rbi/nbfc-marketing-strategy',
  '/rbi/nbfc-takeover',
  '/rbi/rbi-services',
  // Phase 4O additions
  '/sebi/aif-registration-in-india',
  '/sebi/pms-registration-in-india',
  '/sebi/mutual-fund-registration',
  '/sebi/ria-registration-in-india',
  '/sebi/stock-broker-registration-in-india',
] as const;

export type PublicContentManagedPath = (typeof PUBLIC_CONTENT_MANAGED_PATHS)[number];

export const PUBLIC_CONTENT_MANAGED_PATH_SET: ReadonlySet<string> = new Set(PUBLIC_CONTENT_MANAGED_PATHS);

export const PUBLIC_CONTENT_EDITOR_SLUGS: Record<PublicContentManagedPath, string> = {
  '/rbi/nbfc-registration-in-india': 'nbfc-registration-in-india',
  '/rbi/payment-aggregator-license-in-india': 'payment-aggregator-license-in-india',
  '/rbi/ppi-registration-in-india': 'ppi-registration-in-india',
  '/rbi/arc-registration-in-india': 'arc-registration-in-india',
  '/rbi/nbfc-sro-registration': 'nbfc-sro-registration',
  '/rbi/lendtech-services': 'lendtech-services',
  '/rbi/nbfc-aa-license-guide': 'nbfc-aa-license-guide',
  '/rbi/nbfc-account-aggregator-license': 'nbfc-account-aggregator-license',
  '/rbi/full-fledged-money-changers': 'full-fledged-money-changers',
  '/rbi/nbfc-financial-modeling': 'nbfc-financial-modeling',
  '/rbi/nbfc-for-sale': 'nbfc-for-sale',
  '/rbi/nbfc-legal-support': 'nbfc-legal-support',
  '/rbi/nbfc-marketing-strategy': 'nbfc-marketing-strategy',
  '/rbi/nbfc-takeover': 'nbfc-takeover',
  '/rbi/rbi-services': 'rbi-services',
  '/sebi/aif-registration-in-india': 'aif-registration-in-india',
  '/sebi/pms-registration-in-india': 'pms-registration-in-india',
  '/sebi/mutual-fund-registration': 'mutual-fund-registration',
  '/sebi/ria-registration-in-india': 'ria-registration-in-india',
  '/sebi/stock-broker-registration-in-india': 'stock-broker-registration-in-india',
};

const PATH_BY_EDITOR_SLUG = Object.fromEntries(
  PUBLIC_CONTENT_MANAGED_PATHS.map((fullPath) => [PUBLIC_CONTENT_EDITOR_SLUGS[fullPath], fullPath])
) as Record<string, PublicContentManagedPath>;

export function isManagedPublicContentPath(fullPath: string): fullPath is PublicContentManagedPath {
  return PUBLIC_CONTENT_MANAGED_PATH_SET.has(fullPath);
}

export function editorSlugForPublicContentPath(fullPath: string): string {
  return isManagedPublicContentPath(fullPath) ? PUBLIC_CONTENT_EDITOR_SLUGS[fullPath] : '';
}

export function publicContentPathForEditorSlug(slug: string): PublicContentManagedPath | null {
  return PATH_BY_EDITOR_SLUG[slug] ?? null;
}
