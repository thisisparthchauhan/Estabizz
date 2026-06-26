export const PUBLIC_CONTENT_MANAGED_PATHS = [
  '/rbi/nbfc-registration-in-india',
  '/rbi/payment-aggregator-license-in-india',
  '/rbi/ppi-registration-in-india',
] as const;

export type PublicContentManagedPath = (typeof PUBLIC_CONTENT_MANAGED_PATHS)[number];

export const PUBLIC_CONTENT_MANAGED_PATH_SET: ReadonlySet<string> = new Set(PUBLIC_CONTENT_MANAGED_PATHS);

export const PUBLIC_CONTENT_EDITOR_SLUGS: Record<PublicContentManagedPath, string> = {
  '/rbi/nbfc-registration-in-india': 'nbfc-registration-in-india',
  '/rbi/payment-aggregator-license-in-india': 'payment-aggregator-license-in-india',
  '/rbi/ppi-registration-in-india': 'ppi-registration-in-india',
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
