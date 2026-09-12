# Estabizz Jobs - Migration Safety

> **Filename note.** This document was requested as `12-MIGRATION-SAFETY.md`, but
> `docs/jobs/12-QUEUE-FOUNDATION.md` already owns the `12-` prefix. It is filed as `24-`
> to continue the existing sequence instead of creating a duplicate prefix.

## 1. Boundary

This document covers the review process for **every** Prisma migration in the Jobs
subsystem. It exists because Prisma Migrate cannot see part of the Jobs database
schema and will actively propose destroying it.

It contains no credentials. Connection strings live in local/Vercel environment
configuration only.

## 2. The Raw-Index Drift Trap

> **Status: RESOLVED 2026-09-10.** All 12 indexes below are now declared in
> `prisma/schema.prisma` and `migrate dev --create-only` generates an empty
> migration. See [§7](#7-permanent-fix-resolved-2026-09-10). This section is kept
> because §3 and §4 still govern every migration, and because the trap returns the
> moment one of those declarations is deleted.

Migration 001 (`prisma/migrations/20260820124028_init_jobs_schema/migration.sql`)
creates PostgreSQL indexes through hand-written SQL. This was originally believed to
be because Prisma's schema language could not express GIN or `pg_trgm` index types;
that is **not** correct for Prisma 7 — see §7. See
[08-MIGRATION-001.md](08-MIGRATION-001.md) §5 and
[07-POSTGRES-PRISMA-FOUNDATION.md](07-POSTGRES-PRISMA-FOUNDATION.md) §6.

While these indexes were absent from `prisma/schema.prisma`, Prisma compared the
schema against the live database, concluded the indexes were **drift**, and emitted
`DROP INDEX` statements for all of them.

**This is not hypothetical.** On 2026-09-10, generating the Phase 4B performance
index migration with `npx prisma migrate dev --create-only` produced a migration
whose first 12 statements were `DROP INDEX` for every protected search index. They
were removed by hand before the migration was applied. That hand-stripping step is
no longer required as of the fix in §7, but §4 step 4 remains mandatory.

### Why it matters

Four of the protected indexes back the case-insensitive `contains` search filters on
the recruitment admin screens:

| Index | Backs |
|---|---|
| `candidates_first_name_trgm_idx` | Candidate Master search — `lib/jobs/candidateManagement/repository.ts` |
| `candidates_last_name_trgm_idx` | Candidate Master search, Applications search, Interviews search |
| `candidates_current_title_trgm_idx` | Candidate search by job title |
| `jobs_title_trgm_idx` | Applications search, Interviews search — `lib/jobs/applicationManagement/repository.ts`, `lib/jobs/recruitmentOps/interviewsRepository.ts` |

Dropping them causes **no error and no test failure**. Search keeps returning correct
results and silently degrades to sequential scans. The damage is invisible until the
tables grow.

## 3. Protected Indexes — Never Drop Without Explicit Approval

### 3.1 Search indexes (GIN / pg_trgm) — 12 protected

These are the indexes Prisma was observed proposing to drop before the §7 fix.
They are now declared in `prisma/schema.prisma`; **do not delete those
`@@index(..., type: Gin)` lines** — removing one reintroduces its `DROP INDEX`:

1. `jobs_structured_requirements_gin_idx`
2. `candidates_first_name_trgm_idx`
3. `candidates_last_name_trgm_idx`
4. `candidates_current_title_trgm_idx`
5. `candidates_current_employer_trgm_idx`
6. `jobs_title_trgm_idx`
7. `candidates_pref_job_types_gin_idx`
8. `candidates_pref_countries_gin_idx`
9. `candidates_pref_cities_gin_idx`
10. `candidates_target_industries_gin_idx`
11. `candidates_target_seniority_gin_idx`
12. `skills_aliases_gin_idx`

### 3.2 Partial unique indexes — 4, also raw SQL

Prisma cannot express partial unique indexes either. These were **not** proposed for
dropping in the Phase 4B run, but they are raw-SQL-managed and carry the same risk.
They enforce real business rules, so dropping one is a **data-integrity** change, not
a performance change:

1. `resume_versions_one_current_per_candidate_uidx` — `UNIQUE (candidate_id) WHERE is_current = true`
2. `job_assignments_active_recruiter_uidx` — `UNIQUE (job_id, recruiter_ref_id) WHERE removed_at IS NULL`
3. `applications_active_candidate_job_uidx` — `UNIQUE (job_id, candidate_id) WHERE deleted_at IS NULL`
4. `ai_scores_current_candidate_job_uidx` — `UNIQUE (job_id, candidate_id) WHERE is_current = true`

The Jobs CHECK constraints from Migration 001 §5 are likewise raw SQL. Treat any
generated `ALTER TABLE ... DROP CONSTRAINT` with the same suspicion.

## 4. Required Migration Workflow

Every Jobs migration follows these steps. Do not skip step 4.

1. **Confirm the branch.** `git branch --show-current` must print `staging`.
   Never generate or apply Jobs migrations from `main`.
2. **Confirm the target database.** It must be `estabizz_jobs_staging`.
   `npx prisma migrate status` prints the resolved database name and host — read it.
3. **Generate the migration without applying it:**
   `npx prisma migrate dev --name <descriptive_name> --create-only`
4. **Inspect `migration.sql` by hand.** Open the generated file and read every
   statement. This step is mandatory, not advisory.
5. **Scan for destructive statements:**
   ```bash
   grep -nE "DROP INDEX|DROP TABLE|DROP COLUMN|DROP CONSTRAINT|ALTER COLUMN|TRUNCATE|CREATE UNIQUE" \
     prisma/migrations/<migration>/migration.sql
   ```
   Cross-check every hit against the protected lists in §3.
6. **Remove or reject anything unexpected.** Delete auto-generated statements that
   were not intended by the change. If the migration cannot be made safe by editing,
   discard it and rethink the schema change. Record what was removed in a comment at
   the top of the migration file.
7. **Apply to staging.** Use `npx prisma migrate deploy`, which applies the file
   exactly as written. Do **not** re-run `migrate dev` after hand-editing — it
   re-diffs and reintroduces the same destructive statements.
8. **Verify indexes survived**, querying the live catalog:
   ```sql
   SELECT tablename, indexname FROM pg_indexes
   WHERE schemaname = 'public'
     AND (indexname LIKE '%trgm_idx' OR indexname LIKE '%gin_idx' OR indexname LIKE '%_uidx')
   ORDER BY tablename, indexname;
   ```
   Confirm all 12 search indexes and all 4 partial unique indexes are present.
9. **Run the build gates:** `npx prisma generate`, then `npx tsc --noEmit`, then
   `npm run build`. All three must pass before the change is considered done.

## 5. Production Migrations

Applying a Jobs migration to production is a **separate action requiring its own
explicit owner approval.** Approval to apply a migration to staging never carries
over to production.

Before any production apply:

- re-read the migration SQL in full against §3;
- confirm `vector` and `pg_trgm` extensions exist on the production database;
- apply the database migration and the application deployment as two separately
  reviewed steps;
- never run reset, drop, or force commands against production.

## 6. Environment Gotchas

Two traps encountered while running the Phase 4B migration:

- **`DATABASE_URL` lives in `.env.local`, not `.env`.** `prisma.config.ts` uses
  `import "dotenv/config"`, which loads `.env` only. The Prisma CLI therefore does
  **not** pick up `.env.local` automatically; supply the variable explicitly when
  running Prisma commands. Next.js does load `.env.local` on its own.
- **`.env.local` sets `NODE_ENV=development`.** If a helper script exports that
  file wholesale into the environment and then runs `npm run build`, the production
  build fails while prerendering `/_global-error` with
  `TypeError: Cannot read properties of null (reading 'useContext')`. This is a
  tooling artifact, not a code defect. Run `npm run build` without injecting
  `.env.local` into the process environment.

## 7. Permanent Fix (Resolved 2026-09-10)

The drift is fixed. All 12 raw GIN / `pg_trgm` indexes are now declared in
`prisma/schema.prisma` on `Candidate`, `Job` and `Skill`, each mapped to its existing
index name so Migrate reads them as already present rather than as new:

```prisma
@@index([first_name(ops: raw("gin_trgm_ops"))], type: Gin, map: "candidates_first_name_trgm_idx")
@@index([pref_job_types(ops: ArrayOps)],        type: Gin, map: "candidates_pref_job_types_gin_idx")
@@index([structured_requirements(ops: JsonbOps)], type: Gin, map: "jobs_structured_requirements_gin_idx")
```

Operator classes used: `raw("gin_trgm_ops")` for the five `String` trgm indexes,
`ArrayOps` (= `array_ops`) for the six `String[]` indexes, and `JsonbOps`
(= `jsonb_ops`) for `jobs.structured_requirements`.

### Two corrections to earlier assumptions

- **Prisma 7 *can* express GIN and `pg_trgm` indexes.** Index type configuration
  (`type: Gin`, `ops:`) is stable — not a preview feature. The original premise in §2
  was wrong.
- **The `postgresqlExtensions` preview feature is not required and was deliberately
  not enabled.** It governs `CREATE EXTENSION` management, not operator classes;
  `ops: raw("gin_trgm_ops")` emits the opclass regardless. `pg_trgm` is already
  created by Migration 001 (`CREATE EXTENSION IF NOT EXISTS pg_trgm`). Enabling it
  was tested against the live schema and also produced an empty diff, so it is
  harmless — but it is unnecessary surface, so it stays off.

### Verification performed

Against `estabizz_jobs_staging`, before and after:

| Check | Before | After |
|---|---|---|
| `migrate diff --from-config-datasource --to-schema` | 12 × `DROP INDEX` | empty |
| `migrate dev --create-only` | 12 × `DROP INDEX` | `-- This is an empty migration.` |
| GIN / trgm indexes in `pg_indexes` | 12 | 12 (unchanged) |
| Partial unique `%_uidx` indexes | 4 | 4 (unchanged) |
| `migrate status` | up to date | up to date, 4 migrations |

`prisma generate`, `tsc --noEmit` and `npm run build` all pass. No index was dropped
or recreated; the change is schema-declaration-only and a no-op against the database.
The throwaway verification migration was deleted and never applied.

### Re-verified at commit time (2026-09-12)

The declarations sat uncommitted in the working tree until 2026-09-12 — the
committed `schema.prisma` had none of them, while §5 of the Phase 6 readiness
document already told operators they were there. Re-verified against
`estabizz_jobs_staging` immediately before committing:

| Check | Result |
|---|---|
| All 12 indexes matched individually (name, table, column, method, opclass) | **12 / 12** |
| GIN indexes in `public` | 12 — no extras, none missing |
| Partial unique `%_uidx` indexes | 4 — unchanged |
| `pg_extension` | `pg_trgm`, `vector` present |
| Applied migrations | 4, all applied |
| `migrate diff --from-config-datasource --to-schema prisma/schema.prisma` | **empty** (exit 0) |
| Same diff against the *committed* schema, as a control | **12 × `DROP INDEX`** (exit 2) |

The control diff is the point: the only difference between an empty diff and 12
drops is these declarations.

`migrate dev --create-only` was **not** re-run — it writes a migration file, and
generating one was explicitly out of scope. `migrate diff` against the live
datasource is the read-only equivalent and is what was used.

### Still not represented

The 4 partial unique indexes in §3.2 remain undeclared. Prisma cannot express partial
indexes, and — unlike the GIN indexes — it does not see them at all, so it does not
propose dropping them. They are safe from Migrate but invisible to it: §3.2 and §4
step 8 remain the only guard.
