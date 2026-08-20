# Estabizz Jobs - Migration 001

> Phase: 1A - PostgreSQL + Prisma Foundation  
> Migration: `20260820124028_init_jobs_schema`  
> Database: `estabizz_jobs_staging`  
> Environment: non-production / staging  
> Production touched: No

## 1. Boundary

Migration 001 creates the frozen Jobs V1 PostgreSQL schema only.

No MongoDB data was modified. No Jobs UI, ATS UI, Candidate UI, AI resume parsing, FastAPI service, email, QStash, object storage, or resume upload work was started.

The full `DATABASE_URL` and password are intentionally not documented.

## 2. Migration Path

```text
prisma/migrations/20260820124028_init_jobs_schema/migration.sql
```

Generated create-only first, manually reviewed, then applied to `estabizz_jobs_staging`.

## 3. Objects Created

- Physical Jobs tables: 45
- PostgreSQL enum types: 50
- Foreign key constraints: 108
- Total indexes created by the migration SQL: 56
- CHECK constraints: 39
- Destructive SQL: none found

Prisma introspection after apply confirmed 45 Jobs models/tables in the staging database.

## 4. Extensions Installed

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

## 5. Manual SQL Additions

The generated Prisma migration was extended with PostgreSQL-specific SQL required by the frozen ERD and architecture freeze.

### Partial Unique Indexes

```sql
CREATE UNIQUE INDEX "resume_versions_one_current_per_candidate_uidx"
    ON "resume_versions"("candidate_id")
    WHERE "is_current" = true;

CREATE UNIQUE INDEX "job_assignments_active_recruiter_uidx"
    ON "job_assignments"("job_id", "recruiter_ref_id")
    WHERE "removed_at" IS NULL;

CREATE UNIQUE INDEX "applications_active_candidate_job_uidx"
    ON "applications"("job_id", "candidate_id")
    WHERE "deleted_at" IS NULL;

CREATE UNIQUE INDEX "ai_scores_current_candidate_job_uidx"
    ON "ai_scores"("job_id", "candidate_id")
    WHERE "is_current" = true;
```

The broad placeholder Prisma indexes for `job_assignments`, `applications`, and `ai_scores` were removed from `prisma/schema.prisma` so Migration 001 does not over-index those same key pairs.

### Search Indexes

Created:

- `jobs_structured_requirements_gin_idx`
- `candidates_first_name_trgm_idx`
- `candidates_last_name_trgm_idx`
- `candidates_current_title_trgm_idx`
- `candidates_current_employer_trgm_idx`
- `jobs_title_trgm_idx`
- `candidates_pref_job_types_gin_idx`
- `candidates_pref_countries_gin_idx`
- `candidates_pref_cities_gin_idx`
- `candidates_target_industries_gin_idx`
- `candidates_target_seniority_gin_idx`
- `skills_aliases_gin_idx`

No HNSW index was created yet. See deferred items.

### CHECK Constraints

Created CHECK constraints for:

- candidate profile completeness percentage
- candidate experience, notice period, salary, expected salary, and internal rating ranges
- candidate employment salary
- candidate skill/domain experience years
- resume/document file sizes
- commercial fee percentages, amounts, days, and effective date order
- job experience ranges, salary ranges, position counts, and `positions_filled <= positions_count`
- job domain minimum years
- interview round, duration, and feedback ratings
- placement salary, credit split, guarantee days, fee percentages, GST rate, and invoice/payment amounts
- communication duration
- AI processing usage counts
- AI extraction confidence score
- AI score values and rank
- entity embedding dimension positivity

These constraints enforce numeric/range rules without hard-coding an embedding dimension.

## 6. Deferred Items

### Entity Embedding HNSW Index

Deferred intentionally.

`EntityEmbedding.embedding` uses a dimensionless `vector` column so the schema does not hard-code an embedding dimension. The HNSW index should be added after the embedding model and vector dimension are selected.

Recommended later migration shape:

```sql
-- Example only. Do not apply until the embedding dimension is approved.
-- CREATE INDEX entity_embeddings_embedding_hnsw_idx
--   ON entity_embeddings
--   USING hnsw ((embedding::vector(<approved_dimension>)) vector_cosine_ops);
```

## 7. Commands Executed

Create-only generation:

```bash
npx prisma migrate dev --name init_jobs_schema --create-only
```

Apply to staging:

```bash
npx prisma migrate deploy
```

Validation:

```bash
npx prisma format
npx prisma validate
npx prisma generate
npx prisma migrate status
npm run type-check
```

Read-only staging verification:

```bash
npx prisma db pull --print
```

## 8. Validation Results

- `npx prisma format`: passed
- `npx prisma validate`: passed
- `npx prisma generate`: passed
- `npx prisma migrate status`: database schema is up to date
- `npm run type-check`: passed
- Staging introspection: 45 Jobs models/tables found

## 9. Rollback And Recovery Notes

This migration has been applied only to staging.

For staging recovery before real data is introduced:

1. Confirm no owner-approved staging Jobs data needs preservation.
2. Prefer restoring the staging database from the provider snapshot if available.
3. If the staging database is disposable, use a staging-only reset/recreate path and re-run approved migrations.
4. Do not run destructive reset commands against production.

For future production:

- inspect Migration 001 SQL again before production use;
- confirm `vector` and `pg_trgm` availability on the production provider;
- apply database migration and application deployment as separate reviewed steps.
