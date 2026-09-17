# Estabizz Jobs — Final Launch Readiness

**Canonical status document.** Everything else under `docs/jobs/` is history or
detail; this is the single page that says what is done, what is waiting, and
what must not be skipped.

Last verified against `staging` on **2026-09-12**.

| Status | Meaning |
|---|---|
| ✅ **COMPLETE** | Built, tested, verified. Nothing outstanding. |
| ⏸️ **DEFERRED UNTIL PAID HOST** | Finished in code; waiting on a payment method. Not a failure. |
| 🛑 **PRODUCTION BLOCKER** | Must be resolved before real candidates use the system. |
| 💡 **OPTIONAL POST-LAUNCH** | Worth doing. Not a launch gate. |

---

## 1. Verdict

| Question | Answer |
|---|---|
| **Can internal/management users use staging now?** | **YES** — for jobs, applications, ATS, candidates and recruitment operations. |
| **Is the system ready for production?** | **NO** — 2 blockers and 2 paid dependencies remain. |
| Does anything block internal staging use? | No. |

---

## 2. ✅ COMPLETE

### Platform
- Public jobs list, job detail, application flow, application success.
- Candidate account: profile, applications, saved jobs, alerts, privacy.
- Admin: jobs CRUD, dashboard, applications, candidates, interviews, tasks.
- ATS stages seeded and in use; recruitment operations (notes, tasks, interviews).
- Audit trail across the resume lifecycle; pagination; rate limiting; performance indexes.

### Security
- **Authentication gating verified on deployed staging.** Every candidate and admin page redirects to `/login`; every admin API returns `401`; every mutating candidate API returns `401`; queue callbacks reject unsigned requests. No route returned data without a session.
- Structural file validation (PDF/DOCX signature + container checks; executables, archives and scripts blocked) — 41 tests.
- Resume upload references encrypted with AES-256-GCM; the private storage key never reaches the browser.
- Fail-closed malware gate — 24 tests, mutation-tested.
- Fail-closed rate limiting, confirmed configured on deployed staging.
- Candidate account deletion including cross-system erasure, with re-authentication — 21 tests.

### Launch preparation completed in this phase
- **`JobPosting` structured data** on `/jobs/[slug]` — Google Jobs eligible markup, emitted only when valid, never carrying the internal UUID or any salary (§6.1), and **not escapable**. 17 tests.
- **Preview/staging deployments are no longer crawlable** (`lib/seo/crawlPolicy.ts`) — 6 tests. Verified live: staging now serves `Disallow: /`.
- `/jobs` and every open listing in `sitemap.ts` (fail-soft); canonical on `/jobs/[slug]`.
- Temporary-upload orphan reaper, dry-run by default, with a 30-minute floor no config can lower.

### Test and build status
| Check | Result |
|---|---|
| `tsc --noEmit` | PASS |
| `next build` | PASS — 286 static pages, 0 errors |
| `eslint` | **0 errors**, 176 pre-existing warnings (marketing/CMS pages; stylistic + TS type-signature false positives) |
| Jobs Node suites (12) | **PASS** |
| `jobs-ai` pytest | **56 passed** |
| `jobs-clamav` pytest | **25 passed** |

---

## 3. 🛑 PRODUCTION BLOCKERS

### 3.1 ~~The Prisma GIN drift guard is not committed~~ — **CLOSED 2026-09-12**

Resolved. The 12 `@@index(..., type: Gin, map: "...")` declarations are now
committed in `prisma/schema.prisma`, so the runbook in
`27-PHASE6-PRODUCTION-READINESS.md` §5 is accurate and its step 6 will pass from
a clean clone.

Verified against the live `estabizz_jobs_staging` database before committing:
all **12 / 12** indexes matched individually on name, table, column, access
method and operator class; `migrate diff` against the live datasource returned
an **empty migration (exit 0)**; the same diff against the pre-fix committed
schema returned **12 × `DROP INDEX` (exit 2)**, confirming the declarations are
exactly what closes the gap.

No migration was created and no database change was made — 4 migrations before
and after, 12 GIN indexes before and after. Detail in
[24-MIGRATION-SAFETY.md](24-MIGRATION-SAFETY.md) §7.

**Still unrepresented:** the 4 partial unique `%_uidx` indexes. Prisma cannot
express partial indexes and does not see them at all, so it does not propose
dropping them — safe from Migrate, but invisible to it.

### 3.2 Hosted malware scanner
No production resume may be processed without one. See §4.1. Production forces
`required = true` and ignores every environment variable, so this cannot be
worked around — by design.

### 3.3 Production infrastructure does not exist
Neon project, B2 bucket, Upstash database, QStash keys, Resend domain, Vercel
production environment. Specified in 27 §4; none provisioned.

---

## 4. ⏸️ DEFERRED UNTIL PAID HOST

### 4.1 Hosted ClamAV scanner
Built, tested, validated against a real clamd with a real signature database
(EICAR detected through the full chain). Render Private Services have no free
tier. Disabled in place in `render.yaml`; one `sed` restores it.
Provider-neutral deployment in
[28-PHASE6.3-DEPLOYMENT-CONTINGENCY.md](28-PHASE6.3-DEPLOYMENT-CONTINGENCY.md).

### 4.2 Paid, always-on `jobs-ai`
**Measured on deployed staging on 2026-09-12: a cold `GET /health` took
32.75 s** against a 45 s caller timeout. That is the free-tier behaviour
previously recorded as 33–63 s, still present. Degrades safely (retryable,
QStash re-delivers, the atomic claim makes retries safe) but is not acceptable
for a real candidate's first upload.

### 4.3 Container image build
Never built — Docker is not installed on the development machine. Blocked by
tooling, not payment. Note the image is **amd64 only**; see 28 §2.

---

## 5. 📋 Decision checklists

### 5.1 Privacy policy — 4 decisions required, blocked on nobody

| # | Decision | Why it cannot be defaulted |
|---|---|---|
| 1 | **Resume / candidate data retention period** | Determines when the reaper and any retention job delete real candidate data. Picking a number silently is a privacy commitment made on the business's behalf. |
| 2 | **Backup residue window** | Deletion is honoured in the live systems immediately, but PITR and Atlas backups still contain the data until they age out. The published policy must state that window truthfully. |
| 3 | **`Lead` erasure path** | Candidate deletion covers the Jobs and website records. Leads captured through marketing forms are a separate store with no erasure path today. |
| 4 | **Admin-initiated deletion process** | Candidates can delete themselves. There is no admin route for a deletion request arriving by email, which most privacy regimes require a process for. |

### 5.2 Production environment variables

Full matrix with formats and failure modes: **27 §3**. Checklist form:

- [ ] `APP_ENV` / `NEXT_PUBLIC_APP_ENV` = `production`
- [ ] `NEXT_PUBLIC_SITE_URL` = production origin
- [ ] `JWT_SECRET`, `JOBS_RESUME_UPLOAD_TOKEN_SECRET` — new, production-only, ≥32 chars
- [ ] `MONGODB_URI`, `DATABASE_URL` — production stores, `sslmode=verify-full`
- [ ] Backblaze: provider, endpoint, bucket, region, key id, secret, path-style
- [ ] `JOBS_DOCUMENT_CLEANUP_ENABLED=true` (otherwise the reaper stays dry-run)
- [ ] Upstash Redis URL + token — **launch-critical, rate limiting is fail-closed**
- [ ] QStash token + both signing keys + `JOBS_QUEUE_BASE_URL` on the production domain
- [ ] `JOBS_AI_SERVICE_URL`, `AI_SERVICE_SECRET` — production AI service
- [ ] `JOBS_MALWARE_SCANNER_PROVIDER=clamav`
- [ ] Resend: verified domain, `JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED=true`, staging-mode variables **absent**
- [ ] Confirm `DATABASE_URL` is **absent** from the AI service

### 5.3 Final launch checklist

**Order matters — each step assumes the one above.**

1. [x] ~~Commit the Prisma drift guard (§3.1)~~ — **done 2026-09-12**
2. [ ] Provision production infrastructure (27 §4)
3. [ ] Set every production environment variable (§5.2)
4. [ ] Host a malware scanner (§4.1) and a paid `jobs-ai` (§4.2)
5. [ ] Run the migration runbook (27 §5) — step 6 `migrate diff` **must be empty**
6. [ ] Production smoke tests: **clean synthetic resume processes**, **EICAR is blocked**
7. [ ] Restore drill on the production database (§5.4)
8. [ ] Publish the privacy policy reflecting §5.1
9. [ ] Confirm production `robots.txt` allows crawling and canonicals point at the production domain
10. [ ] Enable resume upload for real candidates — **last**, and only after step 6 passes

### 5.4 Backup and restore runbook

Targets and mechanisms: **27 §9**. Procedure:

**Before any migration or risky change**
1. Note the current Neon PITR timestamp and take a named branch/snapshot.
2. Confirm MongoDB Atlas continuous backup is on and note the restore point.
3. Confirm B2 versioning is enabled on the production bucket.

**To restore PostgreSQL**
1. Stop writes: disable QStash delivery and put the application in maintenance.
2. Restore the Neon branch to the marked timestamp; do not overwrite the live branch until verified.
3. Point `DATABASE_URL` at the restored branch and run `prisma migrate status` — expect all applied, no drift.
4. Verify: `pg_extension` contains `pg_trgm` and `vector`; 12 GIN indexes present; `application_stages` seeded.
5. Resume writes.

**To restore MongoDB** — restore the Atlas snapshot to a new cluster, verify a
known user document, then repoint `MONGODB_URI`.

**Resume objects** — B2 versioning restores an overwritten object in place.
Objects hard-deleted by an erasure request are gone by design and must not be
restored; restoring them would undo a privacy deletion.

**Rollback preference:** application rollback is instant and safe (Vercel/Render).
Database rollback is not — migrations are additive, so **forward-fix beats
restore** in every case short of an unusable schema.

**Do one full restore drill before launch.** An untested backup is not a backup.

---

## 6. 💡 OPTIONAL POST-LAUNCH

### 6.1 Salary is stored without a unit — found in this phase

`jobs.salary_min` / `salary_max` are bare numbers with **no unit column**, and
the job detail page hard-codes the suffix **"LPA"** when rendering them. A
stored `8` therefore means 8 lakh per annum, not 8 rupees.

Observed on deployed staging: a listing storing `8`–`16` with `currency = INR`
renders as "8–16 INR LPA". The first version of the `JobPosting` markup emitted
that as `{ minValue: 8, currency: "INR", unitText: "YEAR" }` — a public,
machine-readable claim that the job pays **eight rupees a year**.

`baseSalary` is now **not published at all**. Scaling by 100,000 for INR was
rejected: it bakes a presentation assumption into a data layer and is already
meaningless for any other currency. `baseSalary` is *recommended*, not required,
so omitting it costs no Google Jobs eligibility.

**To publish salary later**, the model needs an unambiguous amount — either
absolute units, or an explicit unit column beside the figure. The rendered page
is not affected; it still shows the range with its "LPA" label.

| Item | Note |
|---|---|
| **Store salary with an explicit unit** | Prerequisite for publishing `baseSalary` in structured data (§6.1). The rendered page is unaffected either way. |
| **Populate `JobLocation`** | The model already has structured `country` / `state` / `city` columns and is **never written to**. Until it is, `JobPosting` markup carries `addressLocality` only — Google wants `addressCountry` for full Google Jobs eligibility. Free-text `location_text` on staging is city-only ("Mumbai", "Surat"), so no country can honestly be derived. This is a data-entry change, not a code change. |
| `/careers` route | **Decision: not building it.** It appears only in planning docs (01, 02, 04, 05) from before `/jobs` was chosen. There are zero code references — no links, no redirects, nothing broken. The planning docs are kept as a record; no route is needed. |
| `applicantLocationRequirements` for remote roles | Depends on the same structured country data. |
| Admin deletion UI | Related to §5.1 #4; the policy decision comes first. |
| ESLint warning cleanup | 176 warnings, 0 errors, all outside the Jobs platform. |

---

## 7. Notes on what was *not* verified, and why

Honest scope limits on the staging regression:

- **Authenticated UI walkthroughs were not performed by the assistant.** Creating
  accounts and entering passwords is prohibited, and minting a staging session
  locally is not possible (staging uses a different secret). Authenticated
  surfaces were verified by gating behaviour, build, and unit/contract tests.
  A short manual script for a human is in §8.
- **A full candidate resume upload was not re-run in this phase.** It requires a
  candidate session. Nothing in this phase touches the resume pipeline; the
  deployed end-to-end run recorded in Phase 5 (56.3 s, 17 proposals, zero
  fabrication) remains the evidence.
- **The ClamAV container was never built or booted.** No Docker locally.

## 8. Manual staging verification script (for a human, ~10 minutes)

Sign in to staging, then confirm each:

1. **Admin → Jobs** — create a job, save, edit it, confirm it appears on `/jobs`.
2. **Admin → Applications** — open an application, move it between ATS stages, confirm the stage sticks after reload.
3. **Admin → Candidates** — open a candidate, add a note, confirm it persists.
4. **Admin → Interviews / Tasks** — create one of each, confirm both list correctly.
5. **Candidate account** — apply to a job, then check it under `/jobs/account/applications`.
6. **Saved jobs and alerts** — save a job and create an alert; confirm both list.
7. **Privacy page** — open `/jobs/account/privacy` and confirm the deletion flow explains itself and asks for the password. **Do not complete a deletion on an account you want to keep.**

Anything that 500s or shows an error boundary is a regression worth reporting.
