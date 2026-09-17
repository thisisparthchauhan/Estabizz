# Estabizz — Site Link Inventory (Phase 7B)

Companion to `docs/30-WHOLE-SITE-NAVIGATION-AUDIT.md`. That document explains
*why*; this one is the evidence table — every navbar `linkMap` entry, every
footer link, and the live HTTP status of every unique destination crawled
against deployed staging.

**Scale note:** the navbar's `linkMap` deliberately maps 244 search-synonym
labels onto a much smaller set of ~100 real destination pages (e.g. eleven
different phrasings of "Stock Broker License" all correctly resolve to the
one canonical `/sebi/stock-broker-registration-in-india` page — this is
intentional SEO/search coverage, not duplication). Listing all 244 rows would
bury the ~10 that actually needed a decision under ~230 that didn't. This
document therefore gives: (1) full detail on every row this phase changed or
flagged, (2) the complete footer table, (3) the full live-crawl status table,
and (4) exact per-section counts for everything else, all VALID.

---

## 1. Navbar `linkMap` — rows requiring action (10 of 244)

| Label | Destination before | HTTP (before) | Semantic status | Priority | Action taken |
|---|---|---|---|---|---|
| TPA License | `/irdai/isnp-registration` | 200 | WRONG DESTINATION | P2 | Fixed → `/irdai` |
| TPA Licence | `/irdai/isnp-registration` | 200 | WRONG DESTINATION | P2 | Fixed → `/irdai` |
| Insurance Surveyor | `/irdai/insurance-repository-registration` | 200 | WRONG DESTINATION | P2 | Fixed → `/irdai` |
| Micro Insurance | `/irdai/ifsca-insurance-intermediary` | 200 | WRONG DESTINATION | P2 | Fixed → `/irdai` |
| Web Aggregator | `/irdai/insurance-marketing-firm-license` | 200 | WRONG DESTINATION | P2 | Fixed → `/irdai` |
| AD Category II | `/rbi/full-fledged-money-changers` | 200 | WRONG DESTINATION | P2 | Fixed → `/rbi` |
| Credit Information Company | `/rbi/lendtech-services` | 200 | WRONG DESTINATION | P2 | Fixed → `/rbi` |
| FAQs | `/services` | 200 | WRONG DESTINATION | P2 | Fixed → `/resources/faqs` |
| Case Highlights | `/` | 200 | GENERIC FALLBACK (dead-end, no anchor) | P2 | Fixed → `/#case-highlights` |
| NHB Registration | `/services/enterprise-services` | 200 | GENERIC FALLBACK (content gap) | P3 | Reported only — no correct page exists |
| CERSAI Registration | `/services/enterprise-services` | 200 | GENERIC FALLBACK (content gap) | P3 | Reported only — no correct page exists |

**Checked and confirmed VALID despite looking suspicious at first pass** (see
`docs/30` §7 for the full reasoning): "MCA / ROC Compliance", "Company
Incorporation", "Annual ROC Compliance", "Corporate Governance" →
`/services/enterprise-services` (live CMS-fallback content genuinely covers
all four topics); "Merchant Banker" → `/sebi` hub (correct fallback, no
dedicated page needed); "Document Vault" / "Policy Library" → `/login`
(correct — these are auth-gated portal features, not content pages).

## 2. Legacy alias redirects — all 17, fixed 307→308

| Source (never linked from nav — old external/bookmark URL only) | Canonical target | HTTP before | HTTP after |
|---|---|---|---|
| `/regulatory/psp-license-ifsca` | `/ifsca/psp-license-ifsca` | 307 | 308 |
| `/ifsca/psp-license` | `/ifsca/psp-license-ifsca` | 307 | 308 |
| `/ifsca/fintech-entity` | `/ifsca/ifsca-fintech-startup-incentives` | 307 | 308 |
| `/ifsca/batf-services` | `/ifsca/batf-services-registration-in-gift-ifsc` | 307 | 308 |
| `/ifsca/aircraft-leasing` | `/ifsca/aircraft-leasing-registration-in-ifsc` | 307 | 308 |
| `/ifsca/itfs-platform` | `/ifsca/itfs-registration-in-gift-ifsc` | 307 | 308 |
| `/ifsca/finance-company` | `/ifsca/finance-company-in-gift-ifsc` | 307 | 308 |
| `/ifsca/finance-company-registration-in-ifsc` | `/ifsca/finance-company-in-gift-ifsc` | 307 | 308 |
| `/sebi/investment-adviser-registration` | `/sebi/ria-registration-in-india` | 307 | 308 |
| `/sebi/investment-adviser-registration-in-india` | `/sebi/ria-registration-in-india` | 307 | 308 |
| `/sebi/sebi-ria-registration` | `/sebi/ria-registration-in-india` | 307 | 308 |
| `/sebi/research-analyst-registration` | `/sebi/research-analyst-registration-in-india` | 307 | 308 |
| `/sebi/social-stock-exchange-license` | `/sebi/social-stock-exchange-license-india` | 307 | 308 |
| `/sebi/portfolio-manager-registration` | `/sebi/pms-registration-in-india` | 307 | 308 |
| `/sebi/stock-broker-license-india` | `/sebi/stock-broker-registration-in-india` | 307 | 308 |
| `/sebi/stock-broker-registration` | `/sebi/stock-broker-registration-in-india` | 307 | 308 |
| `/sebi/sebi-stock-broker-registration` | `/sebi/stock-broker-registration-in-india` | 307 | 308 |

## 3. Dead code — reported, not deleted

| Route | HTTP | Semantic status | Action |
|---|---|---|---|
| `/19-5` | 308 → `/mca-roc` | LEGACY, unreachable dead code behind an existing permanent redirect | Removed from `sitemap.ts` only; component files kept (no deletion without explicit necessity) |
| `/19-5/[slug]` (19 pages) | 308 → `/mca-roc/[slug]` | Same | Same |

## 4. Footer — full link table

| Column | Label | Destination | HTTP | Status | Action |
|---|---|---|---|---|---|
| About | About Estabizz | `/services` | 200 | VALID | — |
| About | Regulatory Insights | `/blogs` | 200 | VALID | — |
| About | Contact Us | `/contact` | 200 | VALID | — |
| Regulatory Expertise | RBI Licensing & Compliance | `/rbi` | 200 | VALID | — |
| Regulatory Expertise | SEBI Registrations | `/sebi` | 200 | VALID | — |
| Regulatory Expertise | IRDAI Licensing | `/irdai` | 200 | VALID | — |
| Regulatory Expertise | IFSCA & GIFT City | `/ifsca` | 200 | VALID | — |
| Regulatory Expertise | FIU & AML Frameworks | `/fema` | 200 | VALID | — |
| Regulatory Expertise | NBFC Compliance | `/rbi/nbfc-legal-support` | 200 | VALID | — |
| Regulatory Expertise | AIF & PMS Compliance | `/sebi/aif-compliance-test-report` | 200 | VALID | — |
| Corporate & Sectoral | Company Incorporation | `/services/enterprise-services` | 200 | VALID (§30 §7) | — |
| Corporate & Sectoral | Annual ROC Compliance | `/services/enterprise-services` | 200 | VALID (§30 §7) | — |
| Corporate & Sectoral | Tax & Audit | `/services/enterprise-services` | 200 | GENERIC FALLBACK | Reported (§10 of audit) |
| Corporate & Sectoral | Sectoral Licences | `/services` | 200 | VALID | — |
| Corporate & Sectoral | IPR & Trademark | `/services/trademark-search` | 200 | VALID | — |
| Knowledge & Resources | Regulatory Updates | `/resources/regulatory-updates` | 200 | VALID | — |
| Knowledge & Resources | **Case Highlights** | `/` → **`/#case-highlights`** | 200 | was DEAD-END | **Fixed** |
| Knowledge & Resources | FAQs | `/resources/faqs` | 200 | VALID | — |
| Knowledge & Resources | Guides & Insights | `/resources` | 200 | VALID | — |
| Jobs & Careers (Phase 7A) | Find Jobs | `/jobs` | 200 | VALID | Regression-checked |
| Jobs & Careers | Candidate Account | `/jobs/account` | 307→login | VALID (auth-gated) | Regression-checked |
| Jobs & Careers | My Profile | `/jobs/account/profile` | 307→login | VALID | Regression-checked |
| Jobs & Careers | My Applications | `/jobs/account/applications` | 307→login | VALID | Regression-checked |
| Jobs & Careers | Job Alerts | `/jobs/account/alerts` | 307→login | VALID | Regression-checked |
| Jobs & Careers | Join Estabizz | `/jobs/join` | 200 | VALID | Regression-checked |
| Jobs & Careers | Hire Talent | `/jobs/hire-talent` | 200 | VALID | Regression-checked |
| Legal & Transparency | Privacy Policy | `/legal/privacy-policy` | 200 | VALID | — |
| Legal & Transparency | Terms & Conditions | `/legal/terms-conditions` | 200 | VALID | — |
| Legal & Transparency | Refund Policy | `/legal/refund-policy` | 200 | VALID | — |
| Legal & Transparency | Disclaimer | `/legal/privacy-policy` | 200 | **CONTENT GAP** | Reported, not fabricated |
| Legal & Transparency | Cookie Policy | `/legal/privacy-policy` | 200 | **CONTENT GAP** | Reported, not fabricated |
| Company & Network *(hidden column)* | Careers | `/jobs` | 200 | VALID | Fixed Phase 7A |
| Company & Network *(hidden)* | **Pricing** | `/contact` → **`/pricing`** | 200 | was WRONG DESTINATION | **Fixed** |
| Company & Network *(hidden)* | Associate Professional Partner / Team Estabizz / Estabizz Compliance Network | `/contact` | 200 | VALID (genuinely no dedicated page; contact is correct) | — |

## 5. Live staging crawl — full status breakdown

121 unique destinations crawled (union of every `linkMap` href, footer href,
`staticSearchLinks` href, and the explicit Part 31 route list), GET only, no
forms submitted, no destructive actions.

| Status | Count | Meaning |
|---|---|---|
| 200 | 116 | Valid |
| 307 | 4 | `/jobs/account*` correctly redirecting an unauthenticated request to `/login?redirect=...` |
| 404 | 1 | `/global/global` — the audit's own fabricated sanity-check URL, confirmed absent from every real source file; not a genuine finding |

**0 unexpected 404s, 0 5xx, 0 redirect loops, 0 `href="#"`, 0
`javascript:void(0)`, 0 empty primary hrefs** — targets from Part 9 all met.

## 6. Everything else — counts by section, all VALID

| Section | `linkMap` entries resolving into it | Status |
|---|---|---|
| SEBI | 87 | All VALID (many synonym labels → ~24 real pages) |
| IFSCA | 56 | All VALID |
| RBI | 27 | All VALID |
| MCA/ROC | 19 | All VALID (now sitemap-covered, §30 §18) |
| Services (general) | 14 | All VALID |
| IRDAI | 12 | All VALID (post-fix; 5 were wrong pre-fix, see §1) |
| Government Licences | 8 | All VALID |
| Resources | 7 | All VALID |
| FIU-IND & AML | 6 | All VALID (now sitemap-covered) |
| FEMA | 3 | All VALID |
| Site (home, login) | 2 | All VALID |

Raw machine-readable data (linkMap extraction, per-route metadata, full crawl
JSON) generated during this audit is available on request — not committed to
the repository, to avoid checking in a large generated artifact that would
immediately drift from the live site.
