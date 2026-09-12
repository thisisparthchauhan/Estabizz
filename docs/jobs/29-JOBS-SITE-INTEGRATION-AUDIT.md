# Estabizz Jobs — Site Integration Audit (Phase 7A)

Scope: navigation, discoverability and linking from the global navbar through
the footer, for Jobs / Candidate / Recruitment entry points only. Not a
visual redesign — the design language, palette, CMS and auth architecture are
unchanged. No paid infrastructure, no schema change, no security change.

Everything below was verified against the actual staging code and, where
noted, the live deployed site and database — not assumed from documentation.

---

## 1. BEFORE architecture

```
Global navbar
  Regulatory ▾   Solutions ▾   Global Markets   Jobs   Blogs   [Search pages...]   Login   Get Started
                                                  ↑
                                        flat link to /jobs, nothing else

User dropdown (logged in)
  Admin Dashboard / New Blog / Pending Review / Media   (isAdmin only)
  My Submissions
  Submit an Article
  Logout
                                        ↑ nothing about the Jobs candidate account, for anyone

/jobs
  "Careers at Estabizz" · "Build India's Regulatory Future"
  "We're hiring regulatory advisors, compliance strategists..."
  [job list with working search/location/department/experience filters]
  empty state  → mailto:info@estabizz.com  "Send Your CV"
  footer CTA   → mailto:info@estabizz.com  "Get in Touch"

Footer
  About | Regulatory Expertise | Corporate & Sectoral Services |
  Compliance Portal [hidden] | Knowledge & Resources |
  Legal & Transparency | Company & Network [hidden, contains "Careers" → /contact]
                                        ↑ no visible Jobs presence anywhere

Global search ("Search pages...")
  0 of 30 static entries relate to Jobs, candidates, applications or recruitment
```

---

## 2. Problems found

| # | Problem | Confirmed by |
|---|---|---|
| 1 | No candidate account entry point in global nav or user dropdown | Read `components/layout/Navbar.tsx` in full |
| 2 | Global search has zero Jobs-related entries | Read `staticSearchLinks` in `Navbar.tsx` |
| 3 | `/jobs` reads as an internal careers page, not a marketplace | Read `app/jobs/PublicJobsClient.tsx`, `app/jobs/page.tsx` |
| 4 | Two mailto "Send Your CV" / "Get in Touch" CTAs bypass the candidate profile/ATS system | Same files |
| 5 | Footer has no visible Jobs presence at all | Read `Footer.tsx` + `footerDefaults.ts`; confirmed the one "Careers" link lives in a column `Footer.tsx` excludes from rendering |
| 6 | The visible "Careers" link (before exclusion) pointed at `/contact`, not Jobs | Same |
| 7 | `/contact`'s mandatory service dropdown has no recruitment/hiring category | Read `app/contact/ContactClient.tsx`, all 5 `SERVICES_GROUPED` entries |
| 8 | No employer/"Hire Talent" entry point anywhere on the site | Repo-wide grep |
| 9 | No "Join Estabizz" / talent-network entry point | Repo-wide grep |
| 10 | Homepage has zero Jobs/Careers/recruitment mentions | Read `app/page.tsx` — no matching section, no CTA |
| 11 | The Jobs job-search placeholder didn't mention "skill", and skill search wasn't wired even though the data exists per job | Read `PublicJobsClient.tsx` filter logic vs. `PublicJobDetail.structured_requirements.skills_list` |
| 12 | Mobile nav has none of the above either — worse, since the desktop user dropdown at least had admin shortcuts | Read the mobile `<details>`/`quickLinks` block |

None of these were security issues. All were discoverability/IA gaps.

---

## 3. Route inventory (Jobs / Candidate / Recruitment)

| Route | Before | After |
|---|---|---|
| `/jobs` | public, internal-careers framing | public, marketplace framing, skill search |
| `/jobs/[slug]` | public | public, metadata wording fixed |
| `/jobs/[slug]/apply` | gated, safe login redirect (already correct) | unchanged |
| `/jobs/[slug]/apply/success` | gated-adjacent | metadata wording fixed |
| `/jobs/account*` (6 routes) | gated, safe login redirect (already correct) | unchanged functionally; now reachable from global nav |
| `/jobs/join` | **did not exist** | new — talent-network entry point |
| `/jobs/hire-talent` | **did not exist** | new — employer entry point |
| `/contact` | no recruitment category | + "Recruitment & Talent Acquisition" service group, `?service=` deep-link |
| `/careers` | did not exist | **still does not exist** — see §7 for why |

---

## 4. Broken / useless buttons found

| Source | Label | Old destination | Problem | Fix |
|---|---|---|---|---|
| `app/jobs/PublicJobsClient.tsx` (empty state) | "Send Your CV" | `mailto:info@estabizz.com?subject=Career%20Enquiry` | Bypassed the candidate profile/resume/ATS system entirely | → `/jobs/join` (primary); email kept as a secondary line, not removed |
| `app/jobs/PublicJobsClient.tsx` (footer CTA) | "Get in Touch" | `mailto:...?subject=Career%20Enquiry%20-%20Estabizz` | Same | → `/jobs/join` (primary); same secondary fallback |
| `lib/content/footerDefaults.ts` (`Company & Network`, hidden column) | "Careers" | `/contact` | Wrong destination, and the column is hidden anyway so it was never visible | → `/jobs` (data corrected even though currently unrendered) |

No `href="#"` placeholders, no dead-looking-but-clickable controls, and no
disabled-but-clickable controls were found in the Jobs area. Saved Jobs and
Job Alerts (`/jobs/account/saved`, `/jobs/account/alerts`) are honestly
labelled V1 stubs from a prior phase — their "Save" button is genuinely
`disabled` both functionally and visually, with copy explaining persistence
isn't connected yet. That is correct, not a bug, and was left as-is.

---

## 5. Legacy Jobs links found

None. There is no old vacancy page, no duplicate Jobs route, no hardcoded
vacancy list and no pre-existing `/careers` anywhere in the repository —
confirmed by a repo-wide grep for "Careers", "Find Candidates", "Join Us",
"Work With Us" and `mailto:` career/CV patterns. The only stale content was
the footer's `/contact`-pointing "Careers" link (§4), and the internal-careers
copy on `/jobs` itself (§6 below).

---

## 6. Candidate discoverability issues

- **A candidate IS a logged-in website user.** `requireCandidateAccountSessionForPage()`
  authenticates against the exact same `auth_token` cookie `/api/auth/me`
  reads for the navbar's own auth check. There is no separate "candidate"
  role in the system, and none was invented here — the fix exposes existing
  routes to the existing session, nothing more.
- The user dropdown showed admin shortcuts and blog tools ("My Submissions",
  "Submit an Article") to every logged-in user, but nothing about their Jobs
  candidate account, even though visiting `/jobs` and applying to a role uses
  that same login.
- Clicking a candidate-account link while logged out already redirected
  safely through `/login?redirect=...` with a validated internal-only return
  path (`lib/jobs/candidateIdentity/redirects.ts`, `getSafeInternalReturnPath`)
  — this was correct before this phase and is unchanged.

---

## 7. Client/employer entry issues

**Job.organization_id cannot distinguish an Estabizz-internal vacancy from a
client's.** This was checked against the live database, not assumed:

```
5 jobs in estabizz_jobs_staging, organization_id = NULL for all 5
0 rows in the organizations table
organization_id is never read or written anywhere in app/admin/jobs or
app/api/admin/jobs — grep returned zero matches
```

The field exists in `prisma/schema.prisma` for exactly this purpose, but has
no admin UI to set it and no data populating it. NULL cannot mean "this is
Estabizz's own vacancy" when it is also the value every job has by default,
client and internal alike, purely because there's no way to set it otherwise.

**Consequence for this phase:** no "Estabizz Careers" filter was built on
`/jobs`, and no `/careers` page was created reading the same source — a
`/careers` page would render byte-identical content to `/jobs` with nothing
of its own to show, which the task's own instructions call out as a reason
not to build it ("if creating `/careers` adds unnecessary duplication, do not
create it"). Positioning was fixed with copy instead (§9).

There was also no employer/"Hire Talent" entry point at all — `/contact`'s
mandatory service dropdown had no recruitment category, so an employer's only
option was "Other / Not Listed".

---

## 8. Fixes made

### Navbar (`components/layout/Navbar.tsx`)
- "Jobs" is now its own compact dropdown, not a flat quicklink: **Find Jobs →
  Candidate Account → Join Estabizz**, divider, **Hire Talent** (styled
  distinctly, in blue, as the one employer-facing item). Uses the same
  hover/`activeMenu` state machine as Regulatory/Solutions, so behaviour is
  consistent, but renders its own compact panel rather than the full-width
  mega-menu.
- The logged-in user dropdown gains an "Estabizz Jobs" section: Candidate
  Dashboard, My Profile, My Applications, Saved Jobs, Job Alerts — sourced
  from `lib/jobs/candidateAccount/navigation.ts` (the same list the in-account
  tab bar uses), filtered to drop Privacy and relabel Dashboard. The two menus
  cannot drift apart because they read the same array.
- Admin shortcuts and "My Submissions"/"Submit an Article" are untouched —
  nothing existing was removed.
- Privacy is deliberately excluded from both menus; it stays reachable only
  from the in-account tab bar.
- Mobile carries an equivalent `<details>` block for the four primary Jobs
  links, and the candidate-account section inside the logged-in mobile panel
  — verified (and test-asserted) to spread the exact same
  `JOBS_MENU_ITEMS`/`HIRE_TALENT_ITEM`/`CANDIDATE_USER_MENU_ITEMS` arrays as
  desktop, not a hand-duplicated list that could drift.
- "Login" renamed "Sign In" in both desktop and mobile.
- Navigation data moved to `lib/jobs/navigation/{jobsMenu,searchEntries}.ts` —
  plain data, importable by both the client Navbar component and a Node test,
  matching the existing `lib/jobs/candidateAccount/navigation.ts` pattern.

### Global search
8 new entries in `lib/jobs/navigation/searchEntries.ts`: Find Jobs, Candidate
Account, My Profile, My Applications, Saved Jobs, Job Alerts, Join Estabizz,
Hire Talent. Route discovery only — every entry is a static label/href/group
triple, identical for every visitor; no candidate name, resume content or
application status is ever read into this list (there is no code path that
could — the list is a hardcoded array, not a query).

### `/jobs`
- Hero and metadata repositioned from an internal careers page to "Find
  opportunities across regulated financial services, fintech, technology and
  growing businesses... roles managed by the Estabizz recruitment team",
  matching the target positioning exactly.
- Added a "Join Estabizz's talent network" link near the open-positions count,
  distinguishing Find Jobs from Join Estabizz as separate actions.
- Search placeholder now reads "Search by title, skill, department or
  location…", and skill search actually works: `listPublicJobs()` now selects
  `structured_requirements` and returns a narrowed `skills_list: string[]`
  per listing (not the full requirements/qualification prose), and the
  client-side filter checks it. No new backend or index — the data was
  already on the row, just not selected for the list query.
- Both mailto CV CTAs replaced with the candidate-profile flow (Join
  Estabizz) as primary; the recruitment email survives as an explicit,
  smaller secondary line ("Prefer not to create a profile? Email our
  recruitment team"), per the instruction not to remove it as a fallback.

### `/jobs/join` (new)
Talent-network landing. Uses only the existing candidate signup/profile
system — no new form, no duplicate job records. `getAuthSession()` (a
non-enforcing peek, not `requireCandidateAccountSessionForPage`, which would
incorrectly gate a page meant to stay public) decides the CTA: an
already-logged-in visitor goes straight to `/jobs/account/profile`; a
logged-out one goes through `/signup?redirect=%2Fjobs%2Faccount%2Fprofile`.

### `/jobs/hire-talent` (new)
Employer landing describing the managed-recruitment flow (Employer
Requirement → Estabizz Recruitment Team → vacancy created → candidates
sourced/applied → ATS → interview/placement). Routes into `/contact` via a
new "Recruitment & Talent Acquisition" service option. No client dashboard is
claimed anywhere on the page — none exists.

### `/contact`
- New service group: "Recruitment & Talent Acquisition" → "Hire Talent /
  Submit a Hiring Requirement".
- `?service=<value>` deep-link support, validated against the known service
  list (`ALL_SERVICE_ITEMS.has(requested)`) before being reflected into form
  state — an arbitrary query string cannot inject text into the form or the
  eventual Formspree subject line.
- **Found live while testing the deep-link:** the form's own in-picker search
  matched only each item's literal text, not its group name. Typing
  "recruit" returned "No service found" because the new item is named "Hire
  Talent / Submit a Hiring Requirement" — it doesn't contain the word
  "recruitment" anywhere. Fixed to also match the group name, which
  incidentally makes every pre-existing group (RBI, SEBI, IRDAI...)
  correctly searchable by its category name too, not just by coincidence of
  item wording.

### Footer
New "Jobs & Careers" column: Find Jobs, Candidate Account, My Profile, My
Applications, Job Alerts, Join Estabizz, Hire Talent. Grid widened from
`xl:grid-cols-5` to `xl:grid-cols-6` so six visible columns sit evenly rather
than wrapping. The stale `Company & Network` → "Careers" → `/contact` link
corrected to `/jobs`, even though that column stays hidden — so the source
data itself is no longer wrong, whether or not it's ever un-hidden.

### Sitemap
`/jobs/join` and `/jobs/hire-talent` added (both public, both indexable).

---

## 9. AFTER architecture

```
Visitor
 ├─ Find Jobs               → /jobs (marketplace positioning, skill search)
 ├─ Candidate Account       → /jobs/account
 │   ├─ Profile             → /jobs/account/profile
 │   ├─ Applications        → /jobs/account/applications
 │   ├─ Saved Jobs          → /jobs/account/saved
 │   └─ Alerts              → /jobs/account/alerts
 │       (Privacy stays inside the account tab bar, not global nav)
 ├─ Join Estabizz           → /jobs/join (talent network, existing signup/profile flow)
 └─ Hire Talent             → /jobs/hire-talent → /contact?service=... (existing pipeline)

Global navbar:  Regulatory ▾  Solutions ▾  Jobs ▾  Global Markets  Blogs  [Search]  Sign In
User dropdown (logged in):  [Admin — unchanged]  Estabizz Jobs (5 items)  My Submissions / Submit an Article  Logout
Footer:  ... Knowledge & Resources  Jobs & Careers (7 links)  Legal & Transparency
Global search: 8 new Jobs/candidate/recruitment destinations, route discovery only
```

---

## 10. Remaining issues

| Issue | Why not fixed here |
|---|---|
| No reliable "Estabizz internal vacancy" filter | Data model has no way to express it (§7) — reported, not invented |
| Homepage has no Jobs/recruitment mention | Explicitly out of scope ("do not start a whole-site redesign yet"); homepage sections are CMS content, not touched this phase |
| Hover-only Jobs/Regulatory/Solutions dropdowns lack `aria-haspopup`/`aria-expanded` | Pre-existing pattern shared with Regulatory/Solutions, not introduced here; fixing it well means touching all three consistently, which is a bigger, separate change |
| Job location data is city-only text, no structured country | `JobLocation.country/state/city` exists but is never populated (also noted in Phase 6.4's `JobPosting` work) — a data-entry gap, not a code gap |
| Jobs product pages (list, detail, account) have no dark-mode styling | Pre-existing across the entire Jobs product area (verified: 0 `dark:` classes in any of them before this phase); the two new pages match that existing convention rather than introducing dark mode unilaterally in an otherwise-light product surface |

None of the above block Monday's internal review.
