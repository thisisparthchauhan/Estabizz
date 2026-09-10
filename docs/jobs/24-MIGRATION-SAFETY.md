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

Migration 001 (`prisma/migrations/20260820124028_init_jobs_schema/migration.sql`)
creates PostgreSQL indexes through hand-written SQL because **Prisma's schema
language cannot express GIN or `pg_trgm` index types**. See
[08-MIGRATION-001.md](08-MIGRATION-001.md) §5 and
[07-POSTGRES-PRISMA-FOUNDATION.md](07-POSTGRES-PRISMA-FOUNDATION.md) §6.

Because these indexes are absent from `prisma/schema.prisma`, Prisma compares the
schema against the live database, concludes the indexes are **drift**, and emits
`DROP INDEX` statements for all of them.

**This is not hypothetical.** On 2026-09-10, generating the Phase 4B performance
index migration with `npx prisma migrate dev --create-only` produced a migration
whose first 12 statements were `DROP INDEX` for every protected search index. They
were removed by hand before the migration was applied. **The same thing will happen
on every future migration until the drift is resolved.**

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

These are the indexes Prisma has been observed proposing to drop:

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

## 7. Permanent Fix (Open)

The drift is a standing hazard rather than a one-off. The durable fix is to make the
raw indexes visible to Prisma — enabling the `postgresqlExtensions` preview feature,
declaring `pg_trgm`, and adding `@@index(..., type: Gin)` declarations mapped to the
existing index names — so that `prisma migrate dev --create-only` generates an
**empty** migration.

Until that lands, §4 step 4 is the only thing preventing the search indexes from
being dropped.
