import { NextResponse } from "next/server";

import {
  createJobsQueue,
  getJobsQueueConfig,
  type JobsQueueEnvelope,
} from "@/lib/jobs/queue";

export async function POST(request: Request) {
  const config = getJobsQueueConfig();

  if (config.environment === "production" || !config.smokeTestEnabled) {
    return NextResponse.json({ ok: false, error: "Queue smoke test is disabled." }, { status: 403 });
  }

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

  const envelope = JSON.parse(rawBody) as JobsQueueEnvelope;

  if (envelope.jobType !== "QUEUE_SMOKE_TEST" || envelope.environment !== config.environment) {
    return NextResponse.json({ ok: false, error: "Unsupported queue smoke-test job." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    jobType: envelope.jobType,
    jobId: envelope.jobId,
    correlationId: envelope.correlationId,
    receivedAt: new Date().toISOString(),
  });
}
