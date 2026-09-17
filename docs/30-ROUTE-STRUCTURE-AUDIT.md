# Route structure audit & /solutions migration proposal

Date: 2026-09-18 · Scope: public routes only (admin and API excluded).
Everything below was measured against the running site, not inferred from
file names.

---

## 1. What was built in this pass

New practice-area hierarchy, live and pre-rendered:

```
/solutions                                  hub, 4 category cards
/solutions/ipr                              category index
/solutions/ipr/copyright-website            full guide  (36 sections, 25 tables, 27 FAQs)
/solutions/ipr/copyright-registration       full guide  (35 sections, 24 tables, 27 FAQs)
/solutions/legal                            category index
/solutions/compliance-calendar              category index
/solutions/cfo                              category index
```

The two guides are generated from the team's Word documents by parsing
`word/document.xml` directly, and verified unit-for-unit: **every text unit in
both source documents appears in the rendered HTML, with nothing added.** The
only source lines that are not visible copy are the two structural labels
`SEO Elements` and `Hero Section`, which become page metadata and the hero
block. Re-run the check any time the content changes.

Adding a service page is now: one generated content file + one registry entry
in `lib/content/services/registry.ts`. The route, sitemap entry, breadcrumb,
JSON-LD (Service + FAQPage + BreadcrumbList), TOC and layout all follow.

---

## 2. Audit findings — the important correction

The raw route list looks alarming. **It is mostly fine.** Measured results:

### 2.1 The 21 "duplicate" URLs are deliberate SEO aliases — NOT a defect

Nine topics are served at more than one URL with byte-identical content:

| Topic | URLs | Content overlap | Canonical |
|---|---|---|---|
| SEBI · Investment Adviser / RIA | 4 | 100% | → `/sebi/ria-registration-in-india` |
| SEBI · Stock Broker | 4 | 100% | → `/sebi/stock-broker-registration-in-india` |
| SEBI · Research Analyst | 2 | 100% | → one of the pair |
| SEBI · Social Stock Exchange | 2 | 100% | → one of the pair |
| SEBI · PMS | 2 | 100% | → one of the pair |
| IFSCA · Finance Company | 3 | 100% | → `/ifsca/finance-company-in-gift-ifsc` |
| IFSCA · PSP | 3 | 100% | → `/ifsca/psp-license-ifsca` |
| IFSCA · Aircraft Leasing | 2 | 100% | → one of the pair |
| IFSCA · BATF | 2 | 100% | → one of the pair |
| IFSCA · ITFS | 2 | 100% | → one of the pair |

Every alias carries `rel=canonical` to a single chosen URL, and the sitemap
lists **only** the canonical. That is the correct way to hold several search
phrasings without splitting ranking signals. **No action needed.** Do not
"clean these up" by deleting them — that would drop the alternate phrasings
for no gain.

### 2.2 Pages with distinct content all self-canonicalise correctly

Five pages sit near a similar topic but carry substantially different content
(30–41% vocabulary overlap). All five self-canonicalise, so their content can
rank on its own. **No action needed.**

`/regulatory/finance-company-gift-ifsc` · `/regulatory/ifsca-factoring-license-gift-city` ·
`/irdai/irda-insurance-broker-license` · `/irdai/insurance-marketing-firm-license` ·
`/rbi/nbfc-aa-license-guide`

### 2.3 Legacy `/19-5` already redirects correctly

`/19-5` → 308 → `/mca-roc`, and `/19-5/:slug` → 308 → `/mca-roc/:slug`, via
`next.config.js`. **Working as intended.**

### 2.4 Internal/ops pages are already unreachable

`/resources/content-rebuild-command`, `/resources/regulatory-update-email-template`,
`/resources/service-page-content-framework` and `/proposal-template` all return
**404** in a normal environment and appear in no sitemap. **No exposure.**

---

## 3. What is genuinely worth changing

Four items, all small, none urgent, none SEO-critical.

| # | Issue | Proposal | Risk |
|---|---|---|---|
| 1 | `app/19-5/page.tsx` and `app/19-5/[slug]/page.tsx` still exist but are unreachable — the redirect intercepts every request | Delete both files. The redirect in `next.config.js` stays. | None — dead code |
| 2 | `/regulatory` is a hub but also holds 3 service pages (`finance-company-gift-ifsc`, `ifsca-factoring-license-gift-city`, `psp-license-ifsca`), mixing two levels in one segment | Move the 3 under `/ifsca/…`, add 301s from the old paths. `psp-license-ifsca` is already a 100% alias of `/ifsca/psp-license-ifsca`, so that one is a pure redirect | Low — needs 3 redirects |
| 3 | `/services` is now a grab-bag: it holds IPR, Legal and CFO pages that belong to the new Solutions categories, plus unrelated ones (ESG, India entry, data storage policy) | Move the 6 category-owned pages under `/solutions/…` with 301s; leave the rest at `/services`. Listed below | Low–medium — 6 redirects, needs care with internal links |
| 4 | Naming is inconsistent across regulators — `psp-license` vs `psp-license-ifsca`, `finance-company` vs `finance-company-in-gift-ifsc` | Cosmetic only, and the canonicals already resolve it. **Recommend leaving alone** | n/a |

### Proposed moves for item 3

```
/services/trademark-search              → /solutions/ipr/trademark-search
/services/legal-due-diligence           → /solutions/legal/due-diligence
/services/legal-process-outsourcing     → /solutions/legal/process-outsourcing
/services/finance-accounting-outsourcing→ /solutions/cfo/finance-accounting-outsourcing
/services/transfer-pricing              → /solutions/cfo/transfer-pricing
/services/gst-appeal-services           → stays (not owned by a Solutions category)
/services/esg-consulting                → stays
/services/india-entry-strategy          → stays
/services/enterprise-services           → stays
```

Each move needs: the page file relocated, a `permanent: true` redirect added to
`next.config.js` next to the existing `/19-5` entries, the `linkMap` entry in
`components/layout/Navbar.tsx` updated, and the sitemap re-checked.

Until that happens, those pages are already reachable from their Solutions
category index via `externalServices` in the registry — the hub lists them at
their current URLs, so nothing is orphaned in the meantime.

---

## 4. Recommendation

Do item 1 (delete dead files) any time. Do items 2 and 3 as one small
redirect-backed change when there is appetite. **Leave the alias URLs and the
naming alone** — they are already handled correctly and changing them costs
ranking for no benefit.
