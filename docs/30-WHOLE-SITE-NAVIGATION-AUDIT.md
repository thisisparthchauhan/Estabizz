# Estabizz — Whole-Site Navigation, Link Integrity & IA Audit (Phase 7B)

Branch: `staging`. Starting HEAD verified as `e376433` before any change. Not a
visual redesign — an information-architecture, link-integrity, CTA and
discoverability pass across the entire public site, from the global navbar
through the footer. Jobs (Phase 7A) was regression-checked only, not rebuilt.

Methodology: every finding below was verified against actual source files,
the live database (read-only), or a live crawl of deployed staging — not
assumed from a label, a filename, or documentation. Where a check produced a
false lead, that is recorded too (§7, §8), because it demonstrates the same
discipline the audit itself depends on.

---

## 1. Executive summary

138 public/account page routes, 244 navbar mega-menu label→destination
mappings, and a footer with ~45 links were inventoried and cross-checked.
Nine confirmed wrong-destination links were found and fixed (all routed to
the correct parent regulator hub, never to an invented specific page). 17
legacy URL aliases were silently issuing temporary (307) redirects for what
are permanent one-way consolidations — fixed to 308. Three entire dynamic
content sections (MCA/ROC — 19 pages, FIU-IND/AML, Government Licences) and
19 static regulator pages had **zero sitemap coverage** despite being live,
linked and indexable — fixed. A confirmed dead code path (`/19-5/*`, silently
308-redirected at the config layer since before this phase) was found,
verified unreachable, and removed from the sitemap (component files left in
place — see §16, this project does not delete routes speculatively).
Keyboard accessibility on the three hover mega-menus was fixed consistently
across Regulatory, Solutions and Jobs, not Jobs alone. Two legal-content gaps
(Disclaimer, Cookie Policy) were found and are reported, not fabricated.

## 2. Current information architecture

```
Estabizz
├── Regulatory (mega-menu)          — RBI · SEBI · IRDAI · IFSCA · FEMA ·
│                                      FIU-IND & AML · MCA/ROC · Gov. Licences
├── Solutions (mega-menu)           — 8 business-stage categories, all
│                                      resolving into the same Regulatory pages
├── Jobs (dropdown, Phase 7A)       — Find Jobs · Candidate Account ·
│                                      Join Estabizz · Hire Talent
├── Global Markets (flat link)      — country directory
├── Blogs (flat link)
├── Search (client-side, label/href/group index)
├── Sign In / user dropdown
└── Get Started (CTA)

Footer: About · Regulatory Expertise · Corporate & Sectoral Services ·
        Knowledge & Resources · Jobs & Careers (Phase 7A) · Legal & Transparency
        [+ two hidden columns: Compliance Portal, Company & Network]
```

This structure is sound and was **not** changed. The problems found were
almost entirely at the leaf level — a mega-menu label resolving to the wrong
page, or a real page never being told to a crawler — not at the category
level.

## 3. Navbar audit

See §5 (destination-accuracy table) for the full 244-entry cross-reference.
Structurally: the mega-menu framework (`menus` object, `linkMap` lookup,
`staticSearchLinks`, the Phase 7A `JOBS_MENU_ITEMS`) is coherent and was left
as-is. The `linkMap` itself — 244 label→href pairs feeding both the
mega-menu category lists and the search index — was the actual surface with
defects, all catalogued in §5/§8.

## 4. Mega-menu destination audit

Every category (RBI, SEBI, IRDAI, IFSCA, FEMA, FIU-IND & AML, MCA/ROC,
Government Licences) was checked against real content. All eight belong
where they are. The one worth calling out: **Solutions** categories
(Startups, NBFCs, Fintech, Insurance, Capital Markets, SMEs, GIFT City,
Compliance Teams) do not have their own pages — every item resolves into the
same `linkMap` used by Regulatory. This is intentional (Solutions is a
business-framing lens over the same regulatory content, not a second content
tree) and was left alone; flagged here only so it reads as a deliberate
choice rather than an unaudited one.

## 5. Global search audit

`staticSearchLinks` (30 entries) plus the full 244-entry `linkMap` feed the
"Search pages..." box, matched by substring against `label + href + group`.
Tested every query in the brief (NBFC, NBFC registration, ARC, Payment
Aggregator, PPI, Insurance Broker, Corporate Agent, AIF, PMS, RIA, Research
Analyst, IFSCA, GIFT City, FEMA, FIU, AML, CKYC, Company registration, GST,
Trademark, Compliance, Jobs, Candidate, Hire Talent, Contact) — every one
returns a real, correct destination page. **No candidate data, admin route,
internal API, or private CMS route is reachable through it** — the index is
a static array of label/href/group triples with no database query behind it;
this was verified by reading `searchItems`'s construction in
`Navbar.tsx`, not assumed.

The two `linkMap` mismatches that also happened to be `staticSearchLinks`
adjacent ("Case Highlights", "FAQs" — see §8) are fixed at the source, so
search now returns the same corrected destinations.

## 6. Homepage CTA audit

Walked every homepage section (Hero, Stats, Global Markets, Solutions,
Why Estabizz, Regulatory Services, Process, Content Framework, Resources,
Case Studies, Final CTA). All CTAs resolve to real pages
(`/contact`, `/regulatory`, `/services`) with no generic dead ends, **except**
the Case Studies section, which had a bare `id`-less `<section>` — the
footer and navbar-search "Case Highlights" link pointed at `/` with nothing
to land on. Fixed (§8). No homepage Jobs/Careers section was added: the
existing "Jobs" navbar dropdown and the "Careers" footer link (Phase 7A) are
the deliberate discoverability path; inserting a homepage section as well
would be additive scope beyond what this audit's evidence calls for.

## 7. Regulatory/service navigation findings

The single biggest false lead of this audit, worth recording precisely: SEBI
and IFSCA directory listings show what looks like duplicate content —
`investment-adviser-registration`, `investment-adviser-registration-in-india`,
`sebi-ria-registration` and `ria-registration-in-india` all appearing as
sibling directories, similarly for stock-broker and social-stock-exchange
naming. **These are not duplicate content.** Every one of the 17
non-canonical directories is a five-line `permanentRedirect()` shim to the
one real canonical page (verified by reading all 17 files in full — see the
exact 17-entry table in §9). This is correct legacy-URL preservation, not a
defect — the only defect was the redirect's status code (§9).

A second false lead, also recorded because it's instructive: four `linkMap`
labels ("MCA / ROC Compliance", "Company Incorporation", "Annual ROC
Compliance", "Corporate Governance") route to `/services/enterprise-services`
— a page with no visible mention of MCA/ROC in its static source, next to a
whole dedicated `/mca-roc` hub with 19 real pages on exactly these topics.
**A static-file check alone would have called this a wrong-destination
mismatch.** It isn't: `/services/enterprise-services` is one of the 46
CMS-managed public content pages, and its live rendered content (fetched from
deployed staging, not assumed) genuinely discusses MCA, ROC, incorporation
and corporate governance. Left unchanged. Two labels sharing that same
destination — "NHB Registration" and "CERSAI Registration" — do **not** find
matching content on that live page (verified the same way); no dedicated page
exists for either topic anywhere in the repo, so these are reported as a
content gap (§8), not fixed.

## 8. Wrong-destination links (confirmed, fixed)

Every row below was confirmed by reading the destination page's actual
content (not the title alone) and finding no dedicated page exists for the
correct topic. All were re-routed to the correct **parent regulator hub**
(`/rbi` or `/irdai`), never to an invented or unrelated specific page.

| Label | Old destination | Why wrong | New destination |
|---|---|---|---|
| TPA License / Licence | `/irdai/isnp-registration` | ISNP = e-commerce platform permission; TPA = claims-processing entity. Zero shared content. No dedicated TPA page exists. | `/irdai` |
| Insurance Surveyor | `/irdai/insurance-repository-registration` | A Surveyor assesses claims; a Repository holds policies electronically. Unrelated functions, unrelated regulations. | `/irdai` |
| Micro Insurance | `/irdai/ifsca-insurance-intermediary` | Micro Insurance is a domestic low-income product category; the destination is a GIFT City international-intermediary licence. | `/irdai` |
| Web Aggregator | `/irdai/insurance-marketing-firm-license` | Regulatorily related (Web Aggregators were absorbed into IMF regulation), but the destination page never once says "aggregator" — a visitor gets no confirmation they're in the right place. | `/irdai` |
| AD Category II | `/rbi/full-fledged-money-changers` | Related RBI forex licences (an FFMC can upgrade to AD Cat II), but the FFMC page never mentions "AD Category" at all. | `/rbi` |
| Credit Information Company | `/rbi/lendtech-services` | A CIC (CIBIL, Experian...) is licensed under the Credit Information Companies Act 2005 — an entirely different RBI regime from digital-lending compliance. No dedicated page exists. | `/rbi` |
| FAQs | `/services` | The generic services hub, while "Compliance FAQs" and "FAQ Engine" two lines above it in the same file already correctly point to the real FAQ page. Same label concept, no reason to differ. | `/resources/faqs` |
| Case Highlights (navbar search + footer) | `/` | The Case Studies homepage section had no `id` to land on — a dead-end click to the homepage top, not a broken link. | `/#case-highlights` |
| Pricing (footer, hidden column) | `/contact` | A dedicated, sitemap-listed `/pricing` page exists. | `/pricing` |

## 9. Broken links

**Zero.** The full 121-URL crawl against deployed staging (§31) returned no
unexpected 404s and no 5xx. The one 404 the crawler recorded
(`/global/global`) was the audit's own fabricated sanity-check entry, never a
real extracted link — confirmed absent from every source file before being
excluded from this count.

**17 redirect-status defects, fixed** — not broken, but wrong: every
single-purpose legacy-alias page (`app/{sebi,ifsca}/*/page.tsx`,
`app/regulatory/psp-license-ifsca/page.tsx`) called `redirect()`
(Next.js's temporary, 307) for what is, by construction, a permanent one-way
URL consolidation (the alias directory has existed as a pure redirect since
before this phase, is linked from nowhere in the app, and its target has been
stable). Verified live before fixing: `curl` against each returned
`HTTP/2 307`. All 17 switched to `permanentRedirect()` (308) — the change
is mechanical (one import, one function name) and every target was reverified
to still exist and not chain into a second redirect.

| Alias route | Canonical target |
|---|---|
| `/regulatory/psp-license-ifsca` | `/ifsca/psp-license-ifsca` |
| `/ifsca/psp-license` | `/ifsca/psp-license-ifsca` |
| `/ifsca/fintech-entity` | `/ifsca/ifsca-fintech-startup-incentives` |
| `/ifsca/batf-services` | `/ifsca/batf-services-registration-in-gift-ifsc` |
| `/ifsca/aircraft-leasing` | `/ifsca/aircraft-leasing-registration-in-ifsc` |
| `/ifsca/itfs-platform` | `/ifsca/itfs-registration-in-gift-ifsc` |
| `/ifsca/finance-company` | `/ifsca/finance-company-in-gift-ifsc` |
| `/ifsca/finance-company-registration-in-ifsc` | `/ifsca/finance-company-in-gift-ifsc` |
| `/sebi/investment-adviser-registration` (+ `-in-india`, `/sebi-ria-registration`) | `/sebi/ria-registration-in-india` |
| `/sebi/research-analyst-registration` | `/sebi/research-analyst-registration-in-india` |
| `/sebi/social-stock-exchange-license` | `/sebi/social-stock-exchange-license-india` |
| `/sebi/portfolio-manager-registration` | `/sebi/pms-registration-in-india` |
| `/sebi/stock-broker-license-india` (+ `/stock-broker-registration`, `/sebi-stock-broker-registration`) | `/sebi/stock-broker-registration-in-india` |

## 10. Generic-fallback links (reported, not fixed)

No clearly-better existing destination was found for these, so they were left
as-is and are reported rather than "fixed" toward something equally weak:

- **"NHB Registration" / "CERSAI Registration"** → `/services/enterprise-services`. No page anywhere in the repo covers either topic. Content gap.
- **"Tax & Audit"** → `/services/finance-accounting-outsourcing`. Plausibly related, not exact; no dedicated Tax & Audit page exists.
- **"Merchant Banker"** → `/sebi` (hub). No dedicated page; already correctly falls back to the category hub rather than a wrong specific page.
- **"Document Vault" / "Policy Library"** → `/login`. Confirmed correct on inspection — these are internal portal features gated behind authentication, not content pages; routing to login is the right behaviour, not a fallback.

## 11. Contact / Get Started audit

`/contact`'s mandatory service picker (5 groups, Phase 7A added a 6th —
Recruitment & Talent Acquisition) and its `?service=` deep-link support
(Phase 7A/7B) were regression-tested and remain correct — see §32. While
verifying the Hire Talent → Contact deep-link live in a browser, the picker's
own in-form search was found to match only each item's literal text, not its
group name: typing "recruit" returned "No service found" because the new
item's text doesn't contain the word "recruitment", only its group name does.
Fixed to also match the group name — a general improvement, not a
Recruitment-only patch, since it makes every pre-existing group (RBI, SEBI,
IRDAI…) reliably searchable by category name too.

`/get-started` has an equivalent service dropdown with **no** query-param
deep-link support, unlike `/contact`. This is a capability asymmetry, not an
active bug: zero links anywhere in the codebase currently try to pass a
service context to `/get-started` (verified by grep), so nothing is being
lost today. Reported as a deferred enhancement (§23) rather than built
speculatively — the brief's own instruction is to improve context
preservation only "where already supported," and building it for `/get-started`
would be adding a new capability, not fixing a broken journey.

## 12. Login / account audit

`getSafeInternalReturnPath` / `buildLoginHref` / `buildSignupHref`
(`lib/jobs/candidateIdentity/redirects.ts`) were re-verified, not
re-implemented: still validate every return path against an internal-only
origin check before it round-trips through signup → login → destination.
Admin shortcuts in the user dropdown remain gated behind `authUser.isAdmin`
— untouched. The Phase 7A "Estabizz Jobs" section in the same dropdown
(Candidate Dashboard, Profile, Applications, Saved Jobs, Job Alerts) is
present and unchanged. No client/candidate dashboard was invented anywhere in
this phase.

## 13. Blog / resource audit

`/blogs`, `/resources`, FAQs, circular explainers and the compliance calendar
all resolve correctly and are sitemap-listed. Three internal tooling routes
(`/resources/content-rebuild-command`,
`/resources/regulatory-update-email-template`,
`/resources/service-page-content-framework`) call `notFound()`
unconditionally — confirmed by reading all three (5 lines each): they are
deliberately retired, not broken, and correctly always 404 regardless of who
requests them. `robots.ts` also disallows all three by path, so this is
belt-and-suspenders, not a gap.

## 14. Footer before → after

| Link | Before | After | Why |
|---|---|---|---|
| Pricing (hidden column) | `/contact` | `/pricing` | Dedicated, sitemap-listed page exists |
| Case Highlights | `/` | `/#case-highlights` | Section now has a landable anchor |
| Careers (hidden column) | *(already fixed Phase 7A: `/jobs`)* | unchanged | Regression-checked, still correct |
| Jobs & Careers column (Phase 7A, 7 links) | — | unchanged | Regression-checked, still correct |
| Disclaimer | `/legal/privacy-policy` | **unchanged** | No dedicated Disclaimer page exists anywhere in the repo. Reported, not fabricated (§24). |
| Cookie Policy | `/legal/privacy-policy` | **unchanged** | Same — no dedicated page exists. Reported (§24). |

Every other footer link (About, Regulatory Expertise column, RBI/SEBI/IRDAI/
IFSCA regulator badges, Knowledge & Resources, Legal & Transparency's
Terms/Refund links) was checked against a real page and found correct.

## 15. CMS override audit

Checked the live `estabizz_staging` MongoDB directly (read-only):

| Collection | Published documents | Meaning |
|---|---|---|
| `content_blocks` (navbar, footer, homepage sections, SEO blocks) | **0** | Every global content area on staging is currently served entirely from its code-level defaults file. Editing a defaults file changes staging immediately — there is no published override anywhere to fight against. |
| `public_content_pages` (the 46 "CMS-managed" service pages, e.g. `/services/enterprise-services`) | **0** | Same conclusion — these pages are rendering their own component-level default content (`PageClient.tsx`), not a database record. This is why the enterprise-services page's rich MCA/ROC content (§7) is real and live despite zero DB documents: it's the component's own default, exactly the same fail-safe pattern `getContent()`/`FOOTER_DEFAULTS`/`NAVBAR_DEFAULTS` use elsewhere in this codebase. |

**This session did not end with "code fixed, deployment still shows old
content."** Every fix in this phase (Navbar.tsx, footerDefaults.ts,
CaseStudies.tsx, sitemap.ts, the 17 redirect shims) lives in a code path with
zero database override in front of it on staging, confirmed above before any
fix was made, and re-verified live after push (§31).

## 16. Legacy / duplicate routes

**`/19-5` and `/19-5/[slug]` — confirmed dead code, not live duplicate
content.** `next.config.js` already permanently (308) redirects the entire
`/19-5/*` prefix to `/mca-roc/*` — verified live (`curl` returns 308,
`location: /mca-roc/...`), not assumed from the source. The
`app/19-5/page.tsx` and `app/19-5/[slug]/page.tsx` components — which render
the identical `lib/landing` registry as `/mca-roc/[slug]` and would have been
a genuine duplicate-content problem if reachable — are **unreachable**: the
redirect intercepts every request before Next.js routing reaches them.

Classification: **DELETE CANDIDATE**, not deleted this phase. The redirect
already fully neutralises any duplicate-content risk; removing the dead
component files is a safe future cleanup with zero behavioural effect, but
this phase's mandate is "do not delete pages... without explicit necessity,"
and there is none here — only removed the stale `/19-5` sitemap entry, which
pointed crawlers through an avoidable redirect hop (§18).

The 17 redirect-shim files (§9) are correctly classified **KEEP** — they are
live, necessary, and now fixed rather than removed.

## 17. Orphan routes

`/19-5` and its 19 children are the clearest orphan cluster found: unreachable
by any live request, referenced from nowhere except their own now-dead
breadcrumb component. Classification: **LEGACY** (see §16).

The 19 static regulator pages backfilled into the sitemap in this phase
(§18) were **SEO LANDING — KEEP, now correctly linked**: they were never
truly orphaned from *navigation* (several are direct `linkMap` targets, e.g.
`/rbi/nbfc-business-plan`), only from the *sitemap*. No other public page was
found reachable by direct URL but absent from every nav surface, search
index and sitemap simultaneously.

## 18. SEO / sitemap / robots / canonical audit

Two structural gaps found and fixed, both purely additive (no content or
behaviour change, only telling crawlers about pages that already exist and
are already indexable):

1. **Zero sitemap coverage for three entire sections.** `/mca-roc` (hub + 19
   `generateStaticParams()` pages), `/fiu-ind-aml`, and `/gov-lic` (each hub +
   their own dynamic-slug children) had no sitemap entries at all — confirmed
   by grep against `app/sitemap.ts`. Fixed by importing each section's own
   `getAllXSlugs()` helper (the same function each `[slug]/page.tsx` already
   uses for `generateStaticParams`), so the sitemap and the actual buildable
   routes can never drift apart.
2. **19 static (non-CMS) regulator pages missing from
   `PUBLIC_CONTENT_MANAGED_PATHS`.** These predate that list and were never
   backfilled into it — confirmed none are marked `noindex`, confirmed each
   has real, page-specific content (not a stub), then added as a fourth
   static array in `sitemap.ts` alongside the existing hub-page pattern.
3. **`/19-5` removed from the sitemap** (§16) — a permanently-redirecting URL
   has no reason to be crawled when its target is already listed under its
   real name.

`robots.ts`'s staging/preview `Disallow: /` guard (built Phase 6.4) and the
`next.config.js` `X-Robots-Tag: noindex` headers on `/admin`, `/login`,
`/signup`, `/api/*` were re-verified present and untouched — production
indexing behaviour was not touched, per the explicit constraint.

## 19. Mobile audit

Tested 375×812 (mobile) and 1440×900 (desktop) in a live browser session
against the local build carrying every fix in this phase. The mobile "Jobs"
`<details>` block and the desktop dropdown render from the identical
`JOBS_MENU_ITEMS`/`HIRE_TALENT_ITEM` arrays (asserted by test, not just
visually spot-checked). No horizontal overflow, no cut-off menus, no
unreachable controls found at either width. Not independently re-tested at
390/430/768/1024/1280 this phase — those are interpolations of the two
verified breakpoints in a fluid Tailwind layout, not a separately-behaving
code path, and are lower-priority given the phase's time budget; flagged as
a deferred spot-check (§23), not asserted as verified.

## 20. Accessibility audit

**Fixed consistently, not Jobs-alone** (the explicit instruction): the three
hover-driven dropdown triggers (Regulatory, Solutions, Jobs) were plain
`<div>`s with mouse-only handlers — unreachable by keyboard entirely before
this phase. Added `role="button"`, `tabIndex={0}`, `aria-haspopup="true"`,
`aria-expanded={activeMenu === X}`, a visible `focus-visible` outline, and an
`onKeyDown` handler (Enter/Space toggles, Escape closes) to all three
identically. Verified live: Tab reaches "Regulatory", a visible focus ring
appears, Enter opens the panel.

Also fixed: a mobile `<details>/<summary>` element carried a hardcoded
`aria-expanded="false"` that never updated — actively wrong once a sighted
user opened it (told a screen reader it was still collapsed), not just
redundant. Removed; `<details>` already exposes open/closed state natively.

**Not converted to real `<button>` elements this phase** — that changes the
interaction model (click-to-toggle vs. hover) and touches existing CSS/layout
in ways beyond a low-risk fix. Reported as a deferred follow-up (§23), with
the keyboard operability gap it would otherwise leave now closed via the
`role`/`tabIndex`/`onKeyDown` addition above.

## 21. Design consistency

Not independently audited beyond what surfaced incidentally (footer grid,
button styling, dropdown panel styling) — all found consistent with the
existing design system where touched. No fragmentation serious enough to
report was found in the areas this phase's evidence actually covers; a
full design-consistency pass across ~140 pages was out of this phase's time
budget and is not claimed as verified.

## 22. Dark mode regression

Navbar and Footer (the two components edited this phase) retain full
`dark:` variant coverage — every new class added carries a matching `dark:`
class, verified by grep count before/after. The Jobs product surface
(`/jobs/*`) has **zero** dark-mode classes anywhere, confirmed in Phase 7A —
this is a pre-existing, sitewide characteristic of that product area, not a
regression from this phase, and remains **NOT IMPLEMENTED** there (not
"broken" — it never had it). Not independently re-verified page-by-page
across the ~120 regulatory/service pages this phase touched only via
redirect-status changes (no visual change occurred on those pages).

## 23. Content label consistency

Observed, not corrected (explicitly out of scope — "goal is UI consistency,
not regulatory copy rewriting", and none of these rise to a navigation
defect): "Licence"/"License" spelling varies across labels (both are valid
English variants and mixed throughout Indian regulatory writing); "IRDAI"
vs "IRDA" appears in both forms (the regulator renamed IRDA → IRDAI in 2014,
so some legacy-authored strings use the old initialism); "Jobs" vs "Careers"
is now intentionally dual-purpose per Phase 7A (Jobs = the product area,
Careers = the footer's discoverability label pointing into it). None of
these cause a navigation failure; a copy-consistency pass is a separate,
lower-priority task.

## 24. Legal-content gaps (reported, not fabricated)

**Disclaimer** and **Cookie Policy** footer links both point at
`/legal/privacy-policy` because no dedicated page exists for either — this
project does not fabricate legal policy text. This is an explicit
instruction boundary ("if a finding touches... REGULATORY/LEGAL CLAIMS,
REPORT IT. Do not casually modify it") and is flagged for the owner/legal
team to draft real content; the current fallback is the closest existing
real document, which is better than a 404 but is not a substitute for
either policy.

## 25. Monday readiness

Every change in this phase is additive or corrective at the navigation/
metadata layer: no content was rewritten, no page was deleted, no schema
changed, no auth path touched, and every fix was verified against either a
live database read, a live crawl, or a live browser session before being
called done. See §30 (Final response) for the explicit
ready/not-ready determination.
