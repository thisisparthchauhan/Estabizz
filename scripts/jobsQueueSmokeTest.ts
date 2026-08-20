import { randomUUID } from "crypto";
import { config as loadEnv } from "dotenv";

import {
  createJobsQueue,
  createJobsQueueIdempotencyKey,
  getJobsQueueConfig,
  validateJobsQueueConfig,
  type JobsQueueEnvelope,
} from "../lib/jobs/queue";

loadEnv({ path: ".env.local", quiet: true });

async function main() {
  const config = getJobsQueueConfig();
  const validation = validateJobsQueueConfig(config);

  if (config.environment === "production") {
    throw new Error("Queue smoke test refused to run because APP_ENV is production.");
  }

  if (!config.smokeTestEnabled) {
    throw new Error("Queue smoke test refused to run because JOBS_QUEUE_SMOKE_TEST_ENABLED is not true.");
  }

  if (!validation.ok) {
    throw new Error(`Queue smoke test refused to run: ${validation.errors.join(" ")}`);
  }

  const correlationId = randomUUID();
  const jobId = randomUUID();
  const envelope: JobsQueueEnvelope = {
    jobType: "QUEUE_SMOKE_TEST",
    jobId,
    entityId: "queue-smoke-test",
    idempotencyKey: createJobsQueueIdempotencyKey({
      jobType: "QUEUE_SMOKE_TEST",
      entityId: "queue-smoke-test",
      correlationId,
    }),
    attempt: {
      attempt: 0,
      maxAttempts: config.defaultRetries + 1,
    },
    requestedBy: {
      type: "system",
      id: "queue-smoke-test",
    },
    createdAt: new Date().toISOString(),
    payload: {
      smokeTest: true,
    },
    correlationId,
    environment: config.environment,
  };
  const queue = createJobsQueue(config);
  const result = await queue.dispatch(envelope, {
    destinationPath: "/api/jobs/queue/smoke-test",
    flowControlKey: "queue-smoke-test",
    maxParallelism: 1,
    ratePerSecond: 1,
  });

  console.log(
    JSON.stringify(
      {
        environment: config.environment,
        queued: result.status === "queued",
        status: result.status,
        provider: result.provider,
        messageIdPresent: Boolean(result.messageId),
      },
      null,
      2,
    ),
  );

  if (result.status !== "queued") {
    throw new Error("Queue smoke test was not queued successfully.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Jobs queue smoke test failed.");
  process.exit(1);
});
