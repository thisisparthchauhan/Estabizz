import { NextResponse } from "next/server";

import { createJobsQueue, getJobsQueueConfig } from "@/lib/jobs/queue";
import { recordJobsAuditEvent } from "@/lib/jobs/recruitmentOps/auditRepository";
import {
  cleanupTemporaryUploads,
  getTemporaryUploadCleanupDependencies,
} from "@/lib/jobs/temporaryUploadCleanup";

/**
 * Reaps unconfirmed temporary uploads.
 *
 * Scheduled through QStash (a QStash Schedule pointing here), so it reuses the
 * queue's existing signature verification rather than introducing a second
 * authentication scheme. It is never callable anonymously.
 *
 * The sweep lists keys and timestamps only -- it never reads, downloads or logs
 * document content, and never produces a presigned URL.
 */
export const maxDuration = 300;

export async function POST(request: Request) {
  const config = getJobsQueueConfig();
  const rawBody = await request.text();

  let queue: ReturnType<typeof createJobsQueue>;

  try {
    queue = createJobsQueue(config);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Queue is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const verification = await queue.verifySignature({
    signature: request.headers.get("upstash-signature"),
    body: rawBody,
    url: request.url,
    upstashRegion: request.headers.get("upstash-region"),
  });

  if (!verification.ok) {
    return NextResponse.json({ ok: false, error: "Invalid queue signature." }, { status: 401 });
  }

  try {
    const dependencies = getTemporaryUploadCleanupDependencies();
    const result = await cleanupTemporaryUploads(dependencies);

    // Counts and configuration only -- no object keys, no candidate ids.
    await recordJobsAuditEvent({
      entityType: "storage",
      entityId: STORAGE_MAINTENANCE_ENTITY_ID,
      action: "storage.temporary_upload_cleanup",
      actorType: "system",
      metadata: {
        environment: dependencies.config.environment,
        dryRun: result.dryRun,
        scanned: result.scanned,
        deleted: result.deleted,
        skippedTooYoung: result.skipped.too_young,
        skippedReferenced: result.skipped.referenced_by_resume_version,
        skippedUncertain: result.skipped.reference_check_failed,
        truncated: result.truncated,
        errors: result.errors,
        durationMs: result.durationMs,
        minimumAgeMinutes: dependencies.config.minimumAgeMinutes,
      },
    });

    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error(
      "[queue/temp-upload-cleanup] sweep failed —",
      error instanceof Error ? error.message.slice(0, 200) : "unknown error",
    );

    return NextResponse.json(
      { ok: false, error: "Temporary upload cleanup failed." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

/**
 * AuditEvent.entity_id is a uuid column and this maintenance job has no natural
 * entity, so it uses one stable synthetic id rather than a schema change.
 */
const STORAGE_MAINTENANCE_ENTITY_ID = "00000000-0000-4000-8000-0000000c1ea4";
