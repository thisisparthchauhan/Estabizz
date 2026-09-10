-- Jobs Phase 4B: performance indexes (indexes only, no model/behaviour changes).
--
-- NOTE: `prisma migrate dev` also proposed dropping the GIN / pg_trgm indexes
-- created by raw SQL in 20260820124028_init_jobs_schema. Those are invisible to
-- the Prisma schema (Prisma cannot declare GIN/trgm index types), so Migrate
-- reads them as drift. They are intentional and back the `contains` +
-- `mode: "insensitive"` search filters on the candidates / applications /
-- interviews admin lists, so the generated DROP INDEX statements were removed.

-- CreateIndex
-- Application detail: stage_histories ordered by changed_at asc, scoped to one application.
CREATE INDEX "application_stage_histories_application_id_changed_at_idx" ON "application_stage_histories"("application_id", "changed_at");

-- CreateIndex
-- Admin applications list, unfiltered: ORDER BY created_at DESC + pagination.
CREATE INDEX "applications_created_at_idx" ON "applications"("created_at");

-- CreateIndex
-- Admin applications list filtered by stage, and dashboard per-stage counts.
CREATE INDEX "applications_current_stage_id_created_at_idx" ON "applications"("current_stage_id", "created_at");

-- CreateIndex
-- Candidate list/detail/portal: nested applications ordered by created_at DESC;
-- also serves the job+candidate duplicate-application guard on apply.
CREATE INDEX "applications_candidate_id_created_at_idx" ON "applications"("candidate_id", "created_at");

-- CreateIndex
-- Candidate Master, unfiltered: ORDER BY created_at DESC + pagination.
CREATE INDEX "candidates_created_at_idx" ON "candidates"("created_at");

-- CreateIndex
-- Candidate Master filtered by current_city (equality) ordered by created_at DESC;
-- also serves the DISTINCT current_city dropdown query.
CREATE INDEX "candidates_current_city_created_at_idx" ON "candidates"("current_city", "created_at");

-- CreateIndex
-- Interview history for one application, ordered by scheduled_at DESC.
CREATE INDEX "interviews_application_id_scheduled_at_idx" ON "interviews"("application_id", "scheduled_at");

-- CreateIndex
-- Interviews list filtered by status, and dashboard "interviews today" count.
CREATE INDEX "interviews_status_scheduled_at_idx" ON "interviews"("status", "scheduled_at");

-- CreateIndex
-- Interviews list with status = "all": global ORDER BY scheduled_at DESC.
CREATE INDEX "interviews_scheduled_at_idx" ON "interviews"("scheduled_at");

-- CreateIndex
-- Tasks page: overdue / today / upcoming groups filter status = open and
-- range-filter + order by due_at.
CREATE INDEX "tasks_status_due_at_idx" ON "tasks"("status", "due_at");
