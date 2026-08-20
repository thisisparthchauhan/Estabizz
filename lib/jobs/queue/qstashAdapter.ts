import { Client, Receiver } from "@upstash/qstash";
import type { FlowControl, PublishToUrlResponse } from "@upstash/qstash";

import {
  buildJobsQueueUrl,
  getJobsQueueConfig,
  validateJobsQueueConfig,
} from "./config";
import {
  assertJobsQueueEnvironmentSafe,
  assertJobsQueuePayloadSafe,
  normalizeJobsQueueDispatchOptions,
} from "./policy";
import type {
  JobQueue,
  JobsQueueConfig,
  JobsQueueDispatchOptions,
  JobsQueueDispatchResult,
  JobsQueueEnvelope,
  JobsQueueFailureRecord,
  JobsQueueSignatureVerificationRequest,
  JobsQueueSignatureVerificationResult,
} from "./types";

export class QStashJobsQueue implements JobQueue {
  private readonly client: Client;
  private readonly receiver: Receiver;

  constructor(private readonly config: JobsQueueConfig = getJobsQueueConfig()) {
    const validation = validateJobsQueueConfig(config);

    if (!validation.ok || !config.configured || config.provider !== "qstash") {
      throw new Error(`Jobs queue is not configured: ${validation.errors.join(" ")}`);
    }

    assertJobsQueueEnvironmentSafe(config);

    this.client = new Client({
      token: config.qstashToken,
    });
    this.receiver = new Receiver({
      currentSigningKey: config.currentSigningKey,
      nextSigningKey: config.nextSigningKey,
      devMode: false,
    });
  }

  async dispatch<TPayload extends Record<string, unknown>>(
    envelope: JobsQueueEnvelope<TPayload>,
    options: JobsQueueDispatchOptions,
  ): Promise<JobsQueueDispatchResult> {
    try {
      assertJobsQueuePayloadSafe(envelope, this.config);
      const normalizedOptions = normalizeJobsQueueDispatchOptions(options, this.config);
      const response = await this.client.publishJSON({
        url: buildJobsQueueUrl(this.config, normalizedOptions.destinationPath),
        body: envelope,
        retries: normalizedOptions.retries,
        retryDelay: normalizedOptions.retryDelayExpression,
        deduplicationId: envelope.idempotencyKey,
        delay: normalizedOptions.delaySeconds,
        notBefore: normalizedOptions.scheduledAt
          ? Math.floor(normalizedOptions.scheduledAt.getTime() / 1000)
          : undefined,
        failureCallback: normalizedOptions.failureCallbackPath
          ? buildJobsQueueUrl(this.config, normalizedOptions.failureCallbackPath)
          : undefined,
        flowControl: buildFlowControl(normalizedOptions),
        label: ["estabizz-jobs", envelope.jobType.toLowerCase(), this.config.environment],
        headers: {
          "X-Estabizz-Jobs-Job-Type": envelope.jobType,
          "X-Estabizz-Jobs-Correlation-Id": envelope.correlationId,
        },
        redact: {
          body: true,
          header: ["Authorization", "Upstash-Authorization"],
        },
      });

      return {
        status: "queued",
        provider: this.config.provider,
        messageId: readPublishMessageId(response),
        jobId: envelope.jobId,
      };
    } catch (error) {
      return {
        status: "failed",
        provider: this.config.provider,
        jobId: envelope.jobId,
        errorMessage: error instanceof Error ? error.message : "Jobs queue dispatch failed.",
      };
    }
  }

  async retry(messageId: string): Promise<void> {
    await this.client.dlq.retry(messageId);
  }

  async deadLetter(messageId: string, reason: string): Promise<JobsQueueFailureRecord> {
    return {
      messageId,
      reason,
      recordedAt: new Date().toISOString(),
    };
  }

  async verifySignature(
    request: JobsQueueSignatureVerificationRequest,
  ): Promise<JobsQueueSignatureVerificationResult> {
    if (!request.signature) {
      return {
        ok: false,
        errorMessage: "Missing QStash signature.",
      };
    }

    try {
      const ok = await this.receiver.verify({
        signature: request.signature,
        body: request.body,
        url: request.url,
        upstashRegion: request.upstashRegion || undefined,
        clockTolerance: 30,
      });

      return { ok };
    } catch (error) {
      return {
        ok: false,
        errorMessage: error instanceof Error ? error.message : "QStash signature verification failed.",
      };
    }
  }
}

export function createJobsQueue(config: JobsQueueConfig = getJobsQueueConfig()): JobQueue {
  return new QStashJobsQueue(config);
}

function buildFlowControl(options: JobsQueueDispatchOptions): FlowControl | undefined {
  if (!options.flowControlKey) {
    return undefined;
  }

  if (typeof options.maxParallelism === "number") {
    return {
      key: options.flowControlKey,
      parallelism: options.maxParallelism,
      ...(typeof options.ratePerSecond === "number" ? { rate: options.ratePerSecond } : {}),
    };
  }

  if (typeof options.ratePerSecond === "number") {
    return {
      key: options.flowControlKey,
      ratePerSecond: options.ratePerSecond,
    };
  }

  return undefined;
}

function readPublishMessageId(response: unknown): string | undefined {
  const maybeResponse = response as Partial<PublishToUrlResponse>;
  return typeof maybeResponse.messageId === "string" ? maybeResponse.messageId : undefined;
}
