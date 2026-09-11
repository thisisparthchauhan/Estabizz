# Estabizz Jobs — Phase 6: Production Readiness and Launch Hardening

Date: 2026-09-11 · Branch: `staging` · Baseline: `f6ec397`

Staging only. No production resource was created, no production migration applied, no DNS change, no merge to `main`.

---

## 1. Temporary upload orphan cleanup

**The problem, proven in Phase 5.** A presigned PUT lands in private storage *before* `confirm` creates the `ResumeVersion`. When confirm never happens — the candidate closes the tab, or dispatch fails — the object has no database row and nothing removes it. One real orphan was found and had to be deleted by hand. `JOBS_DOCUMENT_TEMP_TTL_MINUTES` existed but was **dead config**: parsed, never read.

**Why provider-native lifecycle cannot solve it.** Backblaze lifecycle rules act on a name prefix with **whole-day** granularity (minimum 1 day) against a 60-minute retention target. Worse, confirmed resumes also live under `tmp/` — there is no promotion step — so a prefix rule would delete real candidate documents. A prefix rule cannot distinguish confirmed from unconfirmed.

**Implemented:** an application-level reaper (`lib/jobs/temporaryUploadCleanup/`) that lists the temporary prefix, checks every key against `ResumeVersion.file_storage_key`, and deletes only what nothing references.

| Requirement | How it is met |
|---|---|
| Only the temporary prefix | Adapter throws if asked to list outside `tmp/`; service re-checks each key |
| Never delete a referenced object | Batched DB lookup; referenced keys skipped |
| Race-safe | **30-minute hard floor**, independent of config — comfortably beyond the 600 s presigned window |
| Uncertainty is safe | A failed lookup skips the whole batch and deletes nothing |
| Dry-run | Default. `JOBS_DOCUMENT_CLEANUP_ENABLED=true` is required to delete |
| Bounded | `maxDeletions` (200) and `maxScanned` (2000) per run; truncation reported |
| Idempotent | Re-running over a clean prefix is a no-op |
| Auditable | One `storage.temporary_upload_cleanup` AuditEvent with counts only |
| No content exposure | Lists keys and timestamps; never downloads, never logs a key or URL |

Scheduled via a QStash Schedule hitting `POST /api/jobs/queue/temp-upload-cleanup`, reusing the queue's existing signature verification rather than inventing a second auth scheme.

**Verified:** 18 synthetic tests, plus a live dry-run against the staging bucket — 6 scanned, 5 protected as referenced, 1 too young, **0 deleted**.

---

## 2. Malware scanning

**Structural validation is not antivirus.** `lib/jobs/fileSecurity` proves a file *is* a PDF or DOCX. It says nothing about whether that PDF is malicious.

**Chosen architecture: self-hosted ClamAV behind a provider-neutral interface.**

Why this over the alternatives:

| Option | Verdict |
|---|---|
| **Self-hosted ClamAV (chosen)** | Document never leaves our infrastructure; open source, so no purchasing decision; runs on Render, already in the stack; testable with the EICAR probe |
| Commercial scanning API (VirusTotal, Cloudmersive, Scanii) | Sends private candidate documents to a third party — rejected on privacy grounds |
| Cloud-native (AWS GuardDuty for S3, Cloudflare) | Storage is Backblaze B2, not S3 or R2 — not applicable |

**Implemented** (`lib/jobs/malwareScanning/`): the `ResumeMalwareScanner` interface, a ClamAV HTTP adapter, an `UnconfiguredMalwareScanner` that can never return `clean`, config with validation, and the verdict gate.

**Fail-closed by construction.** The only verdict that permits processing is `clean` from a scanner that actually inspected the bytes. No scanner, unreachable, timeout, or malformed response all block.

```
production, flag says "false", no scanner  ->  required=true   PROCESS=false
staging,   scanning required, no scanner   ->  required=true   PROCESS=false
staging,   not required,      no scanner   ->  required=false  PROCESS=true   (verdict still recorded as not_configured)
```

**Production cannot switch scanning off.** `resolveRequired` ignores the environment variable when `APP_ENV=production` — a stray value must not be able to disable antivirus for real candidates. `infected` blocks even when scanning is not required.

Placement in the worker: **structural validation → malware scan → AI**. A malicious file cannot reach the AI service.

**Remaining external dependency:** a running ClamAV service. Until one is configured, **production resume processing is blocked** — by design, and verified above.

---

## 3. Production environment matrix

Format and behaviour only. No values.

### Application
| Variable | Prod? | Secret | Expected form | Scope | Missing → |
|---|---|---|---|---|---|
| `APP_ENV` | Yes | No | `production` | per-env | Environment guards misjudge; queue envelopes mismatch |
| `NEXT_PUBLIC_APP_ENV` | Yes | No | `production` | per-env | Client-side env checks wrong |
| `NEXT_PUBLIC_SITE_URL` | Yes | No | `https://www.estabizz.com` | per-env | Canonicals, sitemap and robots point at the wrong host |
| `JWT_SECRET` | Yes | **Yes** | ≥32-char random | **prod-only** | Sessions unverifiable — total auth failure |
| `JOBS_RESUME_UPLOAD_TOKEN_SECRET` | Yes | **Yes** | ≥32-char random | **prod-only** | Falls back to `JWT_SECRET`; upload refs share the session key |
| `MONGODB_URI` | Yes | **Yes** | `mongodb+srv://…` | **prod-only** | Website auth and CMS down |
| `DATABASE_URL` | Yes | **Yes** | `postgresql://…?sslmode=verify-full` | **prod-only** | Entire Jobs platform down |

### Storage (Backblaze B2)
| Variable | Prod? | Secret | Expected form | Missing → |
|---|---|---|---|---|
| `JOBS_OBJECT_STORAGE_PROVIDER` | Yes | No | `s3-compatible` | Storage unconfigured → uploads 500 |
| `JOBS_OBJECT_STORAGE_ENDPOINT` | Yes | No | `https://s3.<region>.backblazeb2.com` | Storage unconfigured |
| `JOBS_OBJECT_STORAGE_BUCKET` | Yes | No | `estabizz-jobs-production-private` | Storage unconfigured |
| `JOBS_OBJECT_STORAGE_REGION` | Yes | No | e.g. `ca-east-006` | Signing fails |
| `JOBS_OBJECT_STORAGE_ACCESS_KEY_ID` | Yes | **Yes** | B2 key id | Storage unconfigured |
| `JOBS_OBJECT_STORAGE_SECRET_ACCESS_KEY` | Yes | **Yes** | B2 app key | Storage unconfigured |
| `JOBS_OBJECT_STORAGE_FORCE_PATH_STYLE` | Yes | No | `true` | Endpoint addressing breaks |
| `JOBS_DOCUMENT_MAX_UPLOAD_MB` | No | No | `10` | Defaults to 10 |
| `JOBS_DOCUMENT_PRESIGNED_UPLOAD_TTL_SECONDS` | No | No | ≤`600` | Defaults 600 |
| `JOBS_DOCUMENT_PRESIGNED_DOWNLOAD_TTL_SECONDS` | No | No | ≤`300` | Defaults 300 |
| `JOBS_DOCUMENT_TEMP_TTL_MINUTES` | No | No | `60` | Reaper uses the 30-min floor |
| `JOBS_DOCUMENT_CLEANUP_ENABLED` | Yes | No | `true` to delete | Reaper stays dry-run; orphans accumulate |
| `JOBS_DOCUMENT_MALWARE_SCAN_REQUIRED` | — | No | ignored in production | Production forces `true` |
| `JOBS_MALWARE_SCANNER_PROVIDER` | **Yes** | No | `clamav` | **Resume processing blocked** |
| `JOBS_MALWARE_SCANNER_URL` | **Yes** | No | `https://…` (not localhost) | Blocked |
| `JOBS_MALWARE_SCANNER_SECRET` | **Yes** | **Yes** | ≥32-char random | Blocked |

### Queue, cache, AI, email
| Variable | Prod? | Secret | Expected form | Missing → |
|---|---|---|---|---|
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Yes | url no / token **yes** | `https://…upstash.io` / token | Rate limiting **fail-closed** → resume + auth endpoints 503 |
| `JOBS_QUEUE_PROVIDER` | Yes | No | `qstash` | Dispatch "blocked"; resumes never process |
| `JOBS_QUEUE_BASE_URL` | Yes | No | `https://www.estabizz.com` | Callbacks unroutable |
| `QSTASH_TOKEN` | Yes | **Yes** | `eyJ…` | Publish fails → confirm 503 |
| `QSTASH_CURRENT_SIGNING_KEY` / `NEXT` | Yes | **Yes** | `sig_…` | Callback rejects every delivery |
| `QSTASH_URL` | No | No | unset, or `https://qstash.upstash.io` | SDK default; a wrong value breaks publish |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Only if protection on | **Yes** | Vercel-generated | Callbacks blocked by deployment protection |
| `JOBS_AI_SERVICE_URL` | Yes | No | `https://…onrender.com` | AI stage fails, retryable |
| `AI_SERVICE_SECRET` | Yes | **Yes** | ≥32-char random, identical on Render | Render returns 401 |
| `JOBS_AI_PROVIDER` / `JOBS_AI_MODEL` | Yes | No | `openai` / `gpt-5.6-luna` | `provider_not_configured` |
| `JOBS_AI_HEALTH_TIMEOUT_MS` | No | No | `10000` | Defaults |
| `JOBS_AI_TEXT_EXTRACTION_TIMEOUT_MS` | No | No | `45000` | Defaults |
| `JOBS_AI_STRUCTURED_EXTRACTION_TIMEOUT_MS` | No | No | `75000` | Defaults |
| `OPENAI_API_KEY` | Yes (Render) | **Yes** | `sk-…`, production project | AI stage fails |
| `RESEND_API_KEY` | Yes | **Yes** | `re_…` | Email disabled |
| `JOBS_EMAIL_PROVIDER` | Yes | No | `resend` | Email disabled |
| `JOBS_EMAIL_FROM` / `_REPLY_TO` | Yes | No | address on a verified domain | Send rejected |
| `JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED` | Yes | No | `true` | **Production email blocked** (deliberate) |
| `JOBS_EMAIL_STAGING_MODE` / `_ALLOWLIST` / `_REDIRECT_TO` | No | No | staging only | Must be **absent** in production |

---

## 4. Production infrastructure specification

**Neon** — separate production project, no staging data. PITR enabled (7-day minimum). Pooled connection string for serverless; `sslmode=verify-full`. Serverless keeps connections short-lived; the Prisma adapter is already pooled per-instance.

**Backblaze B2** — new private bucket `estabizz-jobs-production-private`, type `allPrivate`. CORS: `s3_put` for the production origin **only** — no wildcard, no staging origin, no preview URLs. Separate application key scoped to that bucket; staging credentials must not grant access. Server-side encryption enabled.

**Upstash Redis** — separate production database and credentials. Rate limiting is fail-closed, so this is launch-critical.

**QStash** — production callback base URL on the production domain. Same token/signing keys pair as the production project. Retries 3 with exponential backoff (current default). DLQ monitored.

**Render** — separate production AI service. **Paid, always-on** instance: free-tier cold starts measured at 33–63 s against a 45 s caller timeout. Singapore. `AI_SERVICE_SECRET` distinct from staging. Health check `/health`. `DATABASE_URL` deliberately **absent** — the service has no database driver and never connects. `max_retries=0` already in code.

**OpenAI** — separate production project and key, scoped to the model in use. Usage limits and budget alerts configured.

**Resend** — verified production sending domain with SPF/DKIM. `JOBS_EMAIL_PRODUCTION_DELIVERY_ENABLED=true`. Staging-mode variables must be absent.

**Vercel** — Production environment variables set independently of Preview. Production domain attached. Preview keeps staging values.

---

## 5. Database migration runbook

Four migrations, reviewed in order:

| Migration | Lines | Destructive | Notes |
|---|---|---|---|
| `20260820124028_init_jobs_schema` | 1658 | 0 | Creates `pg_trgm` and `vector` extensions; 12 raw GIN indexes; 30 unique constraints |
| `20260909000001_jobs_add_department_location` | 3 | 0 | Additive columns |
| `20260909000002_seed_application_stages` | 11 | 0 | 1 seed INSERT |
| `20260910060109_jobs_phase4b_performance_indexes` | 51 | 0 | Index additions |

**No destructive operations anywhere.** No `DROP`, no `TRUNCATE`, no column removal.

**Two risks to manage:**

1. **Extensions.** `pg_trgm` and `vector` must be creatable on the production role. Neon supports both, but the role needs the privilege — verify before `migrate deploy`.
2. **The GIN drift trap.** 12 GIN/pg_trgm indexes are created in raw SQL. They are declared in `schema.prisma` as `@@index(..., type: Gin)` so Migrate sees them as present. **Do not remove those declarations** — doing so makes Prisma propose `DROP INDEX` on all 12, silently degrading candidate/application search to sequential scans.

None of the index creation uses `CONCURRENTLY`, so index builds take locks. On an **empty** production database this is irrelevant. It matters only if migrations are ever replayed against a populated table.

**Runbook:**
1. Confirm the target is the production database and take a pre-migration snapshot/PITR marker.
2. `npx prisma migrate status` — expect 4 pending, none applied.
3. `npx prisma migrate deploy`.
4. `npx prisma migrate status` — expect all applied, no drift.
5. Verify: `SELECT extname FROM pg_extension` contains `pg_trgm` and `vector`; `SELECT count(*) FROM pg_indexes WHERE indexdef ILIKE '%gin%'` returns 12; `application_stages` seeded.
6. `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma` — must be **empty**.
7. Rollback: these are additive, so forward-fix is preferred. Restore from the pre-migration PITR marker only if the schema is unusable.

---

## 6. Privacy, retention and deletion

| Data | Retention today | Note |
|---|---|---|
| Resume objects | Indefinite | No expiry policy yet — define one |
| Unconfirmed temp uploads | **Now reaped** | Phase 6 reaper |
| Superseded `ResumeVersion` | Indefinite | Version history preserved by design |
| `AIExtraction` proposals | Indefinite | Superseded rows retained |
| `AIProcessingRun` | Indefinite | Metadata only; no resume text |
| `CandidateActivity` | Indefinite | Generic descriptions, no PII |
| `AuditEvent` | Indefinite | Proposal events record before/after field values |

**Verified:** raw resume text is **not persisted** anywhere. `sourceEvidence` is stripped by `normalizeProvenance`. The longest stored string observed was 298 characters — an `EmploymentHistoryItem.description`, a declared structured field the candidate reviews.

### Candidate deletion (implemented, Phase 6.1)

`POST /api/jobs/account/delete` — candidate self-service. The candidate id comes from the server-resolved session and is never read from the request body, so there is no addressable way to erase someone else. Rate limited 3/hour, fail-closed. The session cookie is cleared on success.

**Ordering is the safety property.** Storage objects are deleted **first**, while the rows naming their keys still exist. If any object fails to delete, the whole operation aborts *before* touching the database — so a retry can still find it. Deleting rows first would strand bytes nobody can locate, which is exactly the orphan failure Phase 5 found.

| Treatment | Data |
|---|---|
| **Hard delete** | Resume + document objects in B2; `ResumeVersion`; `AIExtraction`; `AIProcessingRun` for those resumes; `AIScore`; `CandidateContact`; `CandidateEmployment`; `CandidateEducation`; `CandidateCertification`; `CandidateSkill`; `CandidateDomainExperience`; `CandidateDocument`; `CandidateTag`; `CandidateActivity` |
| **Anonymise in place** | `Candidate` (name → tombstone; DOB, gender, nationality, location, title, employer, salary, preferences → null; identity unlinked; `portal_registered` false; status `archived`; `deleted_at` stamped). `ApplicationSnapshot` (name → tombstone, `profile_data` → `{}`). `ApplicationAnswer.answer_text` → null. `CandidateConsent` IP and user-agent → null |
| **Retained, PII minimised** | `AuditEvent` — action, actor and timestamp survive; `new_values`/`previous_values` replaced with `{redacted: "candidate_deleted"}`, `changed_fields` emptied |
| **Retained unchanged** | `Application`, `Placement` — business and commercial records |

**Why the Candidate row is anonymised, not deleted.** `Application`, `Placement` and `AIScore` carry recruitment and commercial history Estabizz has a legitimate basis to retain, and every one of those relations is `onDelete: NoAction`. Deleting the row would either be blocked outright or destroy that history. Anonymising removes the person and keeps the record.

**Why consent records survive.** A consent event is the proof of lawful basis. The event, type and timestamp are kept; the IP address and user agent — which are not needed for that proof — are nulled.

**Idempotent.** A repeat request returns `already_deleted` and re-runs only the storage sweep, so any object left by an earlier partial failure is still collected.

**Staff safety.** Deletion resolves a `Candidate` by id. Staff and admin identities are not candidates and cannot be reached by this path. A candidate may only target themselves; admin-initiated deletion is a separate, permission-checked reason code.

**Verified:** 15 synthetic tests plus a 22-check integration run against the real staging database and bucket — object removed, rows deleted, records anonymised, audit minimised, repeat run a no-op, zero orphans left.

**Out of scope / still manual:** the MongoDB website `User` record is a separate system and is not removed by this workflow; deleting it is a separate step in the account-closure runbook.

---

## 7. AI safety

Verified against the deployed pipeline: AI only **proposes**; the canonical Candidate changes only after explicit candidate confirmation; absent information stays absent (five omitted fields correctly not fabricated); the system prompt forbids inferring protected attributes and forbids scoring; resume text is treated as untrusted and cannot override extraction rules; no tools, browsing or retrieval; strict `json_schema` enforcement with `reviewStatus` pinned to `ai_proposed` at schema level.

**Production OpenAI data flow:** resume bytes → Render (text extraction) → extracted text → OpenAI (structured extraction) → structured JSON → proposals. Raw text is never persisted and never logged. Documents pass through OpenAI, so the production project must have data-retention and training settings reviewed before real candidates are processed.

---

## 8. Observability

Structured logging exists at the boundaries that previously went dark: queue dispatch failures (Phase 5.2) and the cleanup sweep (Phase 6). Audit events cover the resume lifecycle end to end.

Monitor: confirm 503 rate (dispatch failures), QStash DLQ depth, `resume.processing_failed` rate by reason, Render `/health` and cold-start latency, OpenAI timeout/rate-limit counts, orphan count from cleanup runs, rate-limit 503s (fail-closed store outage), email delivery failures.

Logs must never contain resume text, presigned URLs, storage keys, tokens, API keys or authorization headers — enforced by `sanitizeResumeProcessingMessage` on every logged failure path and asserted in tests.

---

## 9. Backup and disaster recovery

| Asset | Mechanism | Target |
|---|---|---|
| PostgreSQL | Neon PITR | RPO ≤5 min, RTO ≤1 h |
| MongoDB | Atlas continuous backup | RPO ≤1 h, RTO ≤2 h |
| Resume objects | B2 versioning / lifecycle | RPO ~0, RTO ≤1 h |
| Secrets | Vercel + Render env, recorded in a password manager | Re-enter manually |
| Deployment | Vercel instant rollback; Render previous deploy | RTO ≤10 min |

Application rollback is safe and fast. **Database rollback is not** — migrations are additive, so forward-fix beats restore. Perform one restore drill on the production database before launch.

---

## 10. Performance and cost

- **Render must be paid/always-on.** Free-tier cold starts measured at 33–63 s against a 45 s caller timeout.
- Timeout chain is consistent: text 45 s caller / 30 s service; structured 75 s caller / 60 s service; callback `maxDuration` 300 s.
- `max_retries=0` prevents one queue delivery costing up to three OpenAI calls.
- Observed successful runs: 56–78 s end to end, ~2.2k input / ~3.8k output tokens per resume.
- Large documents are the known weak point: an 839 KB PDF exhausted the 60 s budget on free-tier compute. Paid compute plus a document-size guard is the mitigation.
- Serverless Postgres connections should use the Neon pooled endpoint.

---

## 11. Public routes and SEO

All `/jobs/account/*` pages carry `robots: { index: false }` — correct, they are private. `/jobs` and `/jobs/[slug]` are indexable.

**Fixed in this phase:** `/jobs` and every open public listing are now in `sitemap.ts` (fail-soft, so a Jobs database outage cannot break the marketing sitemap), and `/jobs/[slug]` now emits a canonical URL.

**Not addressed, recommended for later:** `JobPosting` structured data on `/jobs/[slug]` would make listings eligible for Google Jobs — meaningful for a recruitment product, but it is a feature, not a readiness gap. `/careers` does not exist; if it is meant to be a public entry point it needs creating or the reference dropped.
