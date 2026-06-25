// Page-wise SEO content (single source of truth). Used to build real page
// metadata via lib/seo/pageMetadata.ts. Reusable for any page (not blog-only).

export interface SeoContent {
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  /** Display-only for the homepage; the homepage route MUST stay "/". */
  slug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaType: string;
}

export const SEO_HOMEPAGE_DEFAULTS: SeoContent = {
  seoTitle: "Estabizz Fintech Private Limited | India's Fintech Compliance Platform",
  metaDescription:
    "Premium regulatory advisory and compliance support for RBI, SEBI, IRDAI, IFSCA, FIU-IND, MCA and sectoral licences. Licensing, documentation, compliance portal and post-registration support.",
  focusKeyword: "fintech compliance India",
  slug: "/",
  canonicalUrl: "/",
  ogTitle: "Estabizz Fintech | India's Fintech Compliance Platform",
  ogDescription:
    "We Secure Your Licence. You Secure Your Future. Regulatory advisory for RBI, SEBI, IRDAI, IFSCA and allied frameworks.",
  ogImage: "",
  twitterTitle: "Estabizz Fintech | India's Fintech Compliance Platform",
  twitterDescription:
    "Regulatory advisory and compliance support for RBI, SEBI, IRDAI, IFSCA and allied frameworks.",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebSite",
};
