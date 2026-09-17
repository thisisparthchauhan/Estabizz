import { NextResponse } from "next/server";

import {
  createJobsQueue,
  getJobsQueueConfig,
  type JobsQueueEnvelope,
} from "@/lib/jobs/queue";
import {
  validateResumeParseEnvelope,
  type ResumeParseJobEnvelope,
} from "@/lib/jobs/resumeParsing";
import { processResumeParseJob } from "@/lib/jobs/resumeParsing/worker";

/**
 * Worst-case budget for one delivery: 45s text extraction + 75s structured
 * extraction (lib/jobs/ai/config.ts) plus storage and database time. The
 * platform default would abort the call mid-AI-request and QStash would retry
 * work that had in fact started.
 *
 * Requires a Vercel plan permitting 300s functions.
 */
export const maxDuration = 300;

export async function POST(request: Request) {
  const config = getJobsQueueConfig();
  const rawBody = await request.text();
  const queue = createJobsQueue(config);
  const verification = await queue.verifySignature({
    signature: request.headers.get("upstash-signature"),
    body: rawBody,
    url: request.url,
    upstashRegion: request.headers.get("upstash-region"),
  });

  if (!verification.ok) {
    return NextResponse.json({ ok: false, error: "Invalid queue signature." }, { status: 401 });
  }

  let envelope: JobsQueueEnvelope;

  try {
    envelope = JSON.parse(rawBody) as JobsQueueEnvelope;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid queue message." }, { status: 400 });
  }

  const validation = validateResumeParseEnvelope(envelope, config.environment);

  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.errorMessage }, { status: 400 });
  }

  const result = await processResumeParseJob(envelope as unknown as ResumeParseJobEnvelope);

  if (!result.ok && result.retryable) {
    return NextResponse.json(
      { ok: false, status: result.status, error: result.errorMessage },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    retryable: result.retryable,
    error: result.errorMessage,
  });
}
