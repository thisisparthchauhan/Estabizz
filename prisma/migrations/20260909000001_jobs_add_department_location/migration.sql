-- AlterTable: add department and location_text columns to jobs
ALTER TABLE "jobs" ADD COLUMN "department" VARCHAR(100);
ALTER TABLE "jobs" ADD COLUMN "location_text" VARCHAR(300);
